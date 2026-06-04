module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { messages, model = 'qwen3.6-plus', temperature = 0.7, max_tokens = 4000, thinking_budget = 2048 } = req.body || {};

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    const apiKey = process.env.DASHSCOPE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'DASHSCOPE_API_KEY not configured' });
    }

    // qwen3.6-plus 默认开启深度思考，reasoning_content 字段会返回思考过程
    // 也可以显式传 enable_thinking 参数（部分模型支持）
    const response = await fetch('https://coding.dashscope.aliyuncs.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens,
        // 显式启用 thinking（如果模型支持）
        ...(model.includes('qwen3') ? { enable_thinking: true, thinking_budget } : {})
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: 'upstream_error', detail: errText });
    }

    const data = await response.json();
    const msg = data.choices?.[0]?.message || {};

    return res.status(200).json({
      model: data.model,
      reasoning_content: msg.reasoning_content || null,
      content: msg.content,
      usage: data.usage
    });
  } catch (err) {
    return res.status(500).json({ error: 'internal_error', message: err.message });
  }
};
