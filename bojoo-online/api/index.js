module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();

  return res.status(200).json({
    service: 'bojoo-llm-gateway',
    version: '1.0.0',
    provider: '阿里云百炼 (DashScope)',
    endpoints: {
      chat: 'POST /api/chat - 文本生成（OpenAI 协议）',
      thinking: 'POST /api/thinking - 深度思考模式',
      vision: 'POST /api/vision - 视觉理解（需 dashscope 标准端点）',
      anthropic: 'POST /api/anthropic - Anthropic 协议兼容'
    },
    models: {
      text: 'qwen3.6-plus',
      vision: 'qwen-vl-max（需标准端点）',
      legacy: 'qwen-max, qwen-plus, qwen-turbo'
    },
    docs: 'https://bailian.console.aliyun.com/'
  });
};
