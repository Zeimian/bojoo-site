module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { messages, model = 'qwen-vl-max', max_tokens = 1000 } = req.body || {};

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    const apiKey = process.env.DASHSCOPE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'DASHSCOPE_API_KEY not configured' });
    }

    // ⚠️ 注意：coding.dashscope.aliyuncs.com 端点不支持视觉模型
    // 如需使用视觉能力，需要切换到 dashscope.aliyuncs.com 端点
    // 这里先尝试 coding 端点，如果失败再提示用户切换
    const endpoints = [
      { url: 'https://coding.dashscope.aliyuncs.com/v1/chat/completions', note: 'coding' },
      { url: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation', note: 'standard-multimodal' }
    ];

    let lastError = null;
    for (const ep of endpoints) {
      try {
        let body, headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` };

        if (ep.note === 'coding') {
          body = JSON.stringify({ model, messages, max_tokens });
        } else {
          // 标准 dashscope 端点使用 input.messages 格式
          body = JSON.stringify({
            model,
            input: { messages },
            parameters: { max_tokens }
          });
        }

        const response = await fetch(ep.url, { method: 'POST', headers, body });

        if (response.ok) {
          const data = await response.json();
          return res.status(200).json({ endpoint: ep.note, data });
        }
        lastError = await response.text();
      } catch (e) {
        lastError = e.message;
      }
    }

    return res.status(502).json({
      error: 'vision_endpoint_unavailable',
      message: 'coding.dashscope.aliyuncs.com 端点不支持视觉模型。请在阿里云百炼控制台开通 qwen-vl 系列模型，并使用标准 dashscope.aliyuncs.com 端点。',
      last_error: lastError
    });
  } catch (err) {
    return res.status(500).json({ error: 'internal_error', message: err.message });
  }
};
