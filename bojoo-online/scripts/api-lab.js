// API Lab 客户端 - 调用 Vercel Serverless Functions
(function() {
  'use strict';

  // Tab 切换
  document.querySelectorAll('.api-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.api-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.api-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('panel-' + tab.dataset.tab).classList.add('active');
    });
  });

  // 温度滑块同步
  const tempSlider = document.getElementById('chat-temp');
  const tempVal = document.getElementById('chat-temp-val');
  if (tempSlider) {
    tempSlider.addEventListener('input', e => tempVal.textContent = e.target.value);
  }

  // 通用工具
  function setResult(id, html) {
    const el = document.getElementById(id);
    el.innerHTML = html;
  }

  function fmtTime(ms) { return ms.toFixed(0) + 'ms'; }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  // ========== 1. 文本生成 ==========
  document.getElementById('chat-btn')?.addEventListener('click', async () => {
    const prompt = document.getElementById('chat-prompt').value.trim();
    if (!prompt) return alert('请输入提示词');
    const model = document.getElementById('chat-model').value;
    const temperature = parseFloat(document.getElementById('chat-temp').value);
    setResult('chat-result', '<div class="api-loading">⏳ 正在生成...</div>');
    const t0 = performance.now();
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }],
          model,
          temperature
        })
      });
      const data = await res.json();
      const dt = fmtTime(performance.now() - t0);
      if (!res.ok) {
        setResult('chat-result', `<div class="api-error">❌ ${res.status}: ${escapeHtml(JSON.stringify(data))}</div>`);
        return;
      }
      const c = data.choices?.[0]?.message?.content || '(空)';
      const u = data.usage || {};
      setResult('chat-result', `
        <div class="api-meta">模型: ${escapeHtml(data.model)} · 耗时: ${dt} · tokens: ${u.total_tokens || '?'} (输入 ${u.prompt_tokens || 0} + 输出 ${u.completion_tokens || 0})</div>
        <div class="api-output">${escapeHtml(c)}</div>
      `);
    } catch (e) {
      setResult('chat-result', `<div class="api-error">❌ 网络错误: ${escapeHtml(e.message)}</div>`);
    }
  });

  // ========== 2. 深度思考 ==========
  document.getElementById('thinking-btn')?.addEventListener('click', async () => {
    const prompt = document.getElementById('thinking-prompt').value.trim();
    if (!prompt) return alert('请输入提示词');
    setResult('thinking-result', '<div class="api-loading">🧠 思考中...</div>');
    const t0 = performance.now();
    try {
      const res = await fetch('/api/thinking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 4000
        })
      });
      const data = await res.json();
      const dt = fmtTime(performance.now() - t0);
      if (!res.ok) {
        setResult('thinking-result', `<div class="api-error">❌ ${res.status}: ${escapeHtml(JSON.stringify(data))}</div>`);
        return;
      }
      const reasoning = data.reasoning_content || '(无思考过程)';
      const content = data.content || '(无回答)';
      const reasoningTokens = data.usage?.completion_tokens_details?.reasoning_tokens || 0;
      setResult('thinking-result', `
        <div class="api-meta">模型: ${escapeHtml(data.model)} · 耗时: ${dt} · 思考 tokens: ${reasoningTokens}</div>
        <details class="api-thinking" open>
          <summary>🧠 思考过程</summary>
          <pre>${escapeHtml(reasoning)}</pre>
        </details>
        <div class="api-output-title">💡 最终答案</div>
        <div class="api-output">${escapeHtml(content)}</div>
      `);
    } catch (e) {
      setResult('thinking-result', `<div class="api-error">❌ ${escapeHtml(e.message)}</div>`);
    }
  });

  // ========== 3. 视觉理解 ==========
  document.getElementById('vision-btn')?.addEventListener('click', async () => {
    const url = document.getElementById('vision-url').value.trim();
    const prompt = document.getElementById('vision-prompt').value.trim();
    if (!url) return alert('请输入图片 URL');
    setResult('vision-result', '<div class="api-loading">👁️ 识别中...</div>');
    try {
      const res = await fetch('/api/vision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: [
              { type: 'text', text: prompt || '描述这张图片' },
              { type: 'image_url', image_url: { url } }
            ]
          }],
          model: 'qwen-vl-max'
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setResult('vision-result', `<div class="api-error">❌ ${res.status}: ${escapeHtml(JSON.stringify(data, null, 2))}</div>`);
        return;
      }
      setResult('vision-result', `<div class="api-output">${escapeHtml(JSON.stringify(data, null, 2))}</div>`);
    } catch (e) {
      setResult('vision-result', `<div class="api-error">❌ ${escapeHtml(e.message)}</div>`);
    }
  });

  // ========== 4. Anthropic 协议 ==========
  document.getElementById('anthro-btn')?.addEventListener('click', async () => {
    const system = document.getElementById('anthro-system').value.trim();
    const prompt = document.getElementById('anthro-prompt').value.trim();
    if (!prompt) return alert('请输入用户消息');
    setResult('anthro-result', '<div class="api-loading">🔌 调用 Anthropic 协议...</div>');
    const t0 = performance.now();
    try {
      const res = await fetch('/api/anthropic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: system || undefined,
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 1500
        })
      });
      const data = await res.json();
      const dt = fmtTime(performance.now() - t0);
      if (!res.ok) {
        setResult('anthro-result', `<div class="api-error">❌ ${res.status}: ${escapeHtml(JSON.stringify(data))}</div>`);
        return;
      }
      const text = data.content?.[0]?.text || '(空)';
      setResult('anthro-result', `
        <div class="api-meta">模型: ${escapeHtml(data.model)} · 耗时: ${dt} · tokens: ${data.usage?.output_tokens || '?'}</div>
        <div class="api-output">${escapeHtml(text)}</div>
      `);
    } catch (e) {
      setResult('anthro-result', `<div class="api-error">❌ ${escapeHtml(e.message)}</div>`);
    }
  });
})();
