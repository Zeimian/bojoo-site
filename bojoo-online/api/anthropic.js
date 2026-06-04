module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key, anthropic-version, Authorization');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { messages, model = 'qwen3.6-plus', max_tokens = 2000, system, temperature = 0.7 } = req.body || {};

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    const apiKey = process.env.DASHSCOPE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'DASHSCOPE_API_KEY not configured' });
    }

    // Anthropic 协议：system 参数放在顶级（OpenAI 放在 messages[0]）
    const anthropicBody = {
      model,
      max_tokens,
      temperature,
      messages: system
        ? messages.map(m => ({ ...m, content: m.content }))
        : messages
    };
    if (system) anthropicBody.system = system;

    const response = await fetch('https://coding.dashscope.aliyuncs.com/apps/anthropic/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(anthropicBody)
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: 'upstream_error', detail: errText });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'internal_error', message: err.message });
  }
};
