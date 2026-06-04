# 宝珠 Bojoo Online — UI 技术设计规范文档

> **版本**: v1.0.0  
> **更新日期**: 2026-06-04  
> **适用范围**: 所有 Bojoo Online 子域名站点及内嵌页面  
> **设计来源**: Figma Cards-chart-layout-01-dark + 品牌视觉规范

---

## 目录

- [1. 设计体系概述](#1-设计体系概述)
- [2. 色系定义](#2-色系定义)
- [3. 排版规范](#3-排版规范)
- [4. 布局与间距](#4-布局与间距)
- [5. 背景样式规范](#5-背景样式规范)
- [6. 组件设计规范](#6-组件设计规范)
- [7. 主页设计规范](#7-主页设计规范)
- [8. 内嵌页面编写规则](#8-内嵌页面编写规则)
- [9. 特效实现方案](#9-特效实现方案)
- [10. 响应式断点](#10-响应式断点)
- [11. 模块化引用指南](#11-模块化引用指南)

---

## 1. 设计体系概述

### 1.1 设计理念

Bojoo Online 采用 **深色玻璃拟态（Dark Glassmorphism）** 设计语言，以暖色品牌色 `#D4A574` 为核心视觉锚点，结合微妙的径向渐变背景、毛玻璃效果和流畅的过渡动画，营造专业、温暖且富有科技感的视觉体验。

### 1.2 技术栈

| 技术 | 用途 |
|------|------|
| 11ty (Eleventy) | 静态站点生成器 |
| Nunjucks (.njk) | 模板引擎 |
| 原生 CSS (CSS Variables) | 样式系统 |
| 原生 JavaScript (ES6) | 交互逻辑 |
| Vercel Serverless | 后端 API 部署 |

### 1.3 文件结构

```
bojoo-online/
├── _includes/
│   ├── header.njk          # 全局头部模板（导航栏）
│   └── footer.njk          # 全局底部模板
├── css/
│   ├── style.css           # 基础样式（浅色主题基线）
│   ├── figma-enhanced.css  # 深色主题增强样式（核心设计系统）
│   ├── enhanced.css        # 浅色主题增强样式（备用）
│   ├── api-lab.css         # API 实验室页面专用样式
│   └── rd-page.css         # 新品研发系统页面专用样式
├── scripts/
│   ├── main.js             # 基础交互（移动端导航）
│   ├── enhanced.js         # 增强交互（滚动动画、卡片入场）
│   └── api-lab.js          # API 实验室页面交互逻辑
├── api/                    # Vercel Serverless Functions
│   ├── index.js            # API 状态端点
│   ├── chat.js             # 文本生成（OpenAI 协议）
│   ├── thinking.js         # 深度思考模式
│   ├── vision.js           # 视觉理解
│   └── anthropic.js        # Anthropic 协议兼容
├── index.njk               # 主页
├── rd.njk                  # 新品研发系统介绍页
├── api-demo.njk            # API 实验室页面
├── bi-demo.njk             # 财务 BI 演示页
├── cost.njk                # 成本管控页
├── review.njk              # 差评收集页
├── social.njk              # 小红书运营页
├── opencloud.njk           # OpenClaw 页
├── zhuguang.njk            # 珠光计划页
└── vercel.json             # Vercel 路由配置
```

---

## 2. 色系定义

### 2.1 主色（Brand Primary）

| 变量名 | 色值 | 用途 |
|--------|------|------|
| `--color-primary` | `#D4A574` | 品牌主色，用于按钮、链接、图标、渐变 |
| `--color-primary-dark` | `#B8864E` | 主色深色，用于标题、hover 状态 |
| `--color-primary-light` | `#F5E6D3` | 主色浅色，用于背景装饰、渐变终点 |
| `--color-primary-glow` | `rgba(212, 165, 116, 0.3)` | 主色发光效果 |

### 2.2 深色主题背景色

| 变量名 | 色值 | 用途 |
|--------|------|------|
| `--dark-bg-primary` | `#0f1117` | 页面主背景 |
| `--dark-bg-secondary` | `#1a1d24` | 次级背景、渐变过渡 |
| `--dark-bg-card` | `#1e2128` | 卡片背景 |
| `--dark-bg-hover` | `#252830` | 卡片 hover 背景 |
| `--dark-border` | `#2a2d35` | 边框色 |
| `--dark-border-light` | `#353840` | 亮边框色（hover 状态） |

### 2.3 文字颜色

| 变量名 | 色值 | 用途 |
|--------|------|------|
| `--text-primary` | `#ffffff` | 主文字色 |
| `--text-secondary` | `#b0b3b8` | 次要文字色（描述、标签） |
| `--text-muted` | `#6b6e73` | 弱化文字色（占位符、提示） |

### 2.4 功能色（Status Colors）

| 变量名 | 色值 | 用途 |
|--------|------|------|
| `--color-success` | `#34d399` | 成功状态（运行中、已上线） |
| `--color-success-bg` | `rgba(52, 211, 153, 0.1)` | 成功状态背景 |
| `--color-warning` | `#fbbf24` | 警告状态（规划中、演示版） |
| `--color-warning-bg` | `rgba(251, 191, 36, 0.1)` | 警告状态背景 |
| `--color-danger` | `#f87171` | 错误状态 |
| `--color-danger-bg` | `rgba(248, 113, 113, 0.1)` | 错误状态背景 |
| `--color-info` | `#60a5fa` | 信息状态（AI 洞察、提示） |
| `--color-info-bg` | `rgba(96, 165, 250, 0.1)` | 信息状态背景 |

### 2.5 中性色

| 变量名 | 色值 | 用途 |
|--------|------|------|
| `--color-border` | `#e8e0d4` | 浅色主题边框 |
| `--color-bg` | `#fff` | 浅色主题背景 |
| `--color-bg-light` | `#FAF7F2` | 浅色主题次级背景 |
| `--color-text` | `#333` | 浅色主题文字 |
| `--color-text-light` | `#666` | 浅色主题次要文字 |

---

## 3. 排版规范

### 3.1 字体栈

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
  "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
```

### 3.2 字号层级

| 层级 | 字号 | 字重 | 用途 |
|------|------|------|------|
| H1 | 3.5rem (56px) | 800 | 主页大标题 |
| H2 | 2.2rem (35px) | 700 | 页面标题 |
| H3 | 1.3rem (21px) | 700 | 卡片标题 |
| Body | 0.95rem (15px) | 400 | 正文 |
| Small | 0.85rem (14px) | 500 | 标签、元数据 |
| Micro | 0.75rem (12px) | 500 | 徽章、提示 |

### 3.3 行高

- 正文: `1.6`
- 描述文字: `1.7`
- 标题: `1.2`

### 3.4 字间距

- 标题: `letter-spacing: -1px`
- 徽章: `letter-spacing: 0.3px`
- 大写标签: `letter-spacing: 1px`

---

## 4. 布局与间距

### 4.1 容器

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
```

### 4.2 间距系统

| 用途 | 间距值 |
|------|--------|
| 卡片间距 | `24px` |
| 模块间距 | `40px` |
| 区块内边距 | `28px` |
| 表单元素间距 | `12px` |
| 导航链接间距 | `28px` |

### 4.3 圆角系统

| 变量名 | 值 | 用途 |
|--------|-----|------|
| `--radius-sm` | `6px` | 小按钮、输入框 |
| `--radius-md` | `12px` | 卡片、对话框 |
| `--radius-lg` | `16px` | 大卡片、面板 |
| `--radius-xl` | `24px` | 特殊容器 |

### 4.4 阴影系统

| 变量名 | 值 | 用途 |
|--------|-----|------|
| `--shadow-card` | `0 4px 24px rgba(0, 0, 0, 0.3)` | 卡片默认阴影 |
| `--shadow-card-hover` | `0 8px 40px rgba(0, 0, 0, 0.4)` | 卡片 hover 阴影 |
| `--shadow-glow` | `0 0 30px rgba(212, 165, 116, 0.15)` | 品牌色发光 |

---

## 5. 背景样式规范

### 5.1 页面主背景

```css
body {
  background: var(--dark-bg-primary);
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(212, 165, 116, 0.03) 0%, transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(96, 165, 250, 0.02) 0%, transparent 40%);
}
```

**设计要点**:
- 使用两个径向渐变叠加，营造微妙的色彩层次
- 主色（暖色）在左上角，信息色（蓝色）在右下角
- 透明度极低（2%-3%），不干扰内容阅读

### 5.2 Hero 区域背景

```css
.online-hero {
  background: linear-gradient(180deg, var(--dark-bg-primary) 0%, var(--dark-bg-secondary) 100%);
}

.online-hero::before {
  background: 
    radial-gradient(circle at 30% 40%, rgba(212, 165, 116, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 70% 60%, rgba(96, 165, 250, 0.05) 0%, transparent 40%);
  animation: gradientShift 20s ease-in-out infinite alternate;
}
```

**设计要点**:
- 垂直渐变 + 径向渐变叠加
- 添加 `gradientShift` 动画，20 秒循环，营造呼吸感

### 5.3 卡片背景

```css
.hub-card {
  background: var(--dark-bg-card);
  border: 1px solid var(--dark-border);
}

.hub-card:hover {
  background: var(--dark-bg-hover);
  border-color: var(--dark-border-light);
}
```

### 5.4 毛玻璃效果

```css
.site-header {
  backdrop-filter: blur(20px);
  background: rgba(15, 17, 23, 0.9);
}
```

**适用场景**: 导航栏、浮动面板、对话框

---

## 6. 组件设计规范

### 6.1 导航栏（Header）

**HTML 结构**:
```html
<header class="site-header">
  <nav class="container">
    <a href="/" class="logo">宝珠 Bojoo Online</a>
    <ul class="nav-links">
      <li><a href="/">首页</a></li>
      <li><a href="/rd/">新品研发</a></li>
      <!-- 更多导航项 -->
    </ul>
    <button class="nav-toggle" aria-label="Toggle navigation">
      <span></span><span></span><span></span>
    </button>
  </nav>
</header>
```

**关键样式**:
- `position: sticky; top: 0` 固定顶部
- `backdrop-filter: blur(20px)` 毛玻璃效果
- Logo 使用渐变色文字 + emoji 前缀
- 导航链接 hover 时底部出现渐变下划线

### 6.2 卡片（Hub Card）

**HTML 结构**:
```html
<div class="hub-card">
  <div class="hub-icon">🧪</div>
  <h3>新品研发系统</h3>
  <span class="status-badge status-active">运行中</span>
  <p>SOP 智能解析 · 市场雷达 · 创意实验室</p>
  <a href="/rd" class="hub-link" data-subdomain="rd">进入系统</a>
</div>
```

**关键样式**:
- 顶部渐变条 hover 时展开（`transform: scaleX(1)`）
- hover 时上浮 8px + 缩放 1.02
- 图标区域圆形背景 + hover 旋转 5 度
- 按钮带光泽扫过动画（`::before` 伪元素）

### 6.3 状态徽章（Status Badge）

```html
<span class="status-badge status-active">运行中</span>
<span class="status-badge status-coming">规划中</span>
```

| 类名 | 背景色 | 文字色 | 圆点色 |
|------|--------|--------|--------|
| `status-active` | `rgba(52, 211, 153, 0.1)` | `#34d399` | `#34d399` |
| `status-coming` | `rgba(251, 191, 36, 0.1)` | `#fbbf24` | `#fbbf24` |

### 6.4 按钮（Button）

```html
<a href="/rd" class="hub-link">进入系统</a>
<button class="api-btn">🚀 发送</button>
```

**关键样式**:
- 渐变背景: `linear-gradient(135deg, #B8864E, #D4A574)`
- hover 时上浮 2px + 阴影增强
- 光泽扫过动画（`::before` 从左到右）
- 箭头图标 hover 时右移 4px

### 6.5 KPI 卡片

```html
<div class="kpi-card">
  <div class="kpi-value">¥128万</div>
  <div class="kpi-label">本月营收</div>
  <span class="kpi-trend up">↑ 12.5%</span>
</div>
```

**关键样式**:
- 顶部 3px 渐变条
- 数值使用渐变色文字
- 趋势标签带圆角背景

### 6.6 图表容器

```html
<div class="chart-box">
  <h3>门店营收排行</h3>
  <div class="bar-chart">...</div>
</div>
```

### 6.7 AI 洞察框

```html
<div class="ai-insight">
  <h3><span class="ai-tag">AI</span> 智能分析</h3>
  <p>分析内容...</p>
</div>
```

**关键样式**:
- 信息色背景 + 径向渐变装饰
- `aiPulse` 动画（5 秒循环缩放）

---

## 7. 主页设计规范

### 7.1 页面结构

```
┌─────────────────────────────────────┐
│           Header (sticky)           │
├─────────────────────────────────────┤
│                                     │
│         Online Hero Section         │
│    (渐变背景 + 浮动装饰元素)         │
│                                     │
├─────────────────────────────────────┤
│                                     │
│         Hub Card Grid               │
│    (响应式网格，自动换行)            │
│                                     │
├─────────────────────────────────────┤
│           Footer                    │
└─────────────────────────────────────┘
```

### 7.2 Hero 区域规范

- **内边距**: `120px 0 80px`
- **标题**: 3.5rem, 渐变色文字, 800 字重, `letter-spacing: -1px`
- **副标题**: 1.2rem, `--text-secondary`, 最大宽度 600px
- **装饰元素**: 3 个 emoji, 绝对定位, 浮动动画（8 秒循环）

### 7.3 卡片网格规范

- **布局**: `grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))`
- **间距**: `gap: 24px`
- **内边距**: `padding: 60px 0`
- **入场动画**: IntersectionObserver 控制，依次延迟 100ms

### 7.4 卡片排序规则

1. 财务 BI（演示版）
2. 新品研发系统（运行中）
3. 成本管控（运行中）
4. 差评收集（运行中）
5. 小红书运营（文档待做）
6. OpenClaw（推进中）
7. 成本管控文档（已上线）
8. 差评系统文档（已上线）
9. 珠光计划（规划中）
10. 宝珠官网（在线）

---

## 8. 内嵌页面编写规则

### 8.1 模板继承

所有页面使用 Nunjucks 模板系统，通过 `{% include %}` 引入公共组件：

```njk
---
title: "页面标题 — Bojoo Online"
meta_description: "页面描述"
layout: null
eleventyExcludeFromCollections: true
---
{% include "header.njk" %}

<!-- 页面内容 -->

{% include "footer.njk" %}
```

### 8.2 页面头部（Front Matter）

每个 `.njk` 文件必须包含 YAML front matter：

```yaml
---
title: "页面标题 — Bojoo Online"
meta_description: "SEO 描述，不超过 160 字符"
layout: null
eleventyExcludeFromCollections: true
---
```

### 8.3 CSS 引用顺序

```html
<link rel="stylesheet" href="/css/style.css">
<link rel="stylesheet" href="/css/figma-enhanced.css">
<link rel="stylesheet" href="/css/页面专用.css">
```

**引用规则**:
1. `style.css` — 基础样式（必须）
2. `figma-enhanced.css` — 深色主题增强（必须）
3. 页面专用 CSS — 按需引入

### 8.4 JavaScript 引用顺序

```html
<script src="/scripts/main.js"></script>
<script src="/scripts/enhanced.js"></script>
<script src="/scripts/页面专用.js"></script>
```

### 8.5 子域名切换脚本

页面底部必须包含子域名智能切换脚本：

```html
<script>
  document.addEventListener("DOMContentLoaded", function () {
    var SUBDOMAIN_MAP = {
      "rd": "rd.bojoo.online",
      "cost": "cost.bojoo.online",
      "review": "review.bojoo.online"
    };
    var currentHost = window.location.hostname;
    var isSubdomainDeploy = /^(rd|cost|review)\.bojoo\.online$/.test(currentHost);
    document.querySelectorAll("a[data-subdomain]").forEach(function (a) {
      var sub = a.getAttribute("data-subdomain");
      var target = SUBDOMAIN_MAP[sub];
      if (target && (isSubdomainDeploy || currentHost.indexOf("bojoo.online") === -1)) {
        a.href = "https://" + target + "/";
        a.setAttribute("target", "_blank");
      }
    });
  });
</script>
```

### 8.6 页面类型模板

#### 类型 A: 信息展示页（如 rd.njk）

```njk
<section class="online-hero">
  <div class="online-hero-ornament">🧪</div>
  <div class="online-hero-ornament">🔬</div>
  <div class="online-hero-ornament">✨</div>
  <div class="container">
    <h1>页面标题</h1>
    <p>页面描述</p>
  </div>
</section>

<section class="container">
  <!-- 页面内容 -->
</section>
```

#### 类型 B: 功能演示页（如 bi-demo.njk）

```njk
<section class="bi-demo">
  <div class="bi-header">
    <h1>功能名称</h1>
    <p>功能描述</p>
    <span class="demo-badge">⚡ 演示版</span>
  </div>
  
  <div class="kpi-row">
    <!-- KPI 卡片 -->
  </div>
  
  <div class="ai-insight">
    <!-- AI 分析 -->
  </div>
  
  <div class="chart-section">
    <!-- 图表区域 -->
  </div>
</section>
```

#### 类型 C: 交互工具页（如 api-demo.njk）

```njk
<section class="online-hero">
  <!-- Hero 区域 -->
</section>

<section class="container">
  <div class="api-tabs" role="tablist">
    <!-- Tab 按钮 -->
  </div>
  
  <div class="api-panel active" id="panel-xxx">
    <!-- 输入表单 -->
    <!-- 结果展示 -->
  </div>
</section>
```

---

## 9. 特效实现方案

### 9.1 渐变文字

```css
.gradient-text {
  background: linear-gradient(135deg, #fff 0%, var(--color-primary) 50%, var(--color-primary-light) 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shine 5s linear infinite;
}

@keyframes shine {
  to { background-position: 200% center; }
}
```

**使用场景**: 主页标题、KPI 数值、Logo

### 9.2 卡片顶部渐变条

```css
.hub-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-primary-light));
  transform: scaleX(0);
  transition: transform var(--transition-normal);
}

.hub-card:hover::before {
  transform: scaleX(1);
}
```

### 9.3 光泽扫过动画

```css
.hub-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left var(--transition-slow);
}

.hub-link:hover::before {
  left: 100%;
}
```

### 9.4 浮动装饰元素

```css
.online-hero-ornament {
  position: absolute;
  font-size: 4rem;
  opacity: 0.08;
  animation: float 8s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-25px) rotate(8deg); }
}
```

### 9.5 背景渐变呼吸动画

```css
@keyframes gradientShift {
  0% { opacity: 0.6; transform: scale(1); }
  100% { opacity: 1; transform: scale(1.05); }
}

.online-hero::before {
  animation: gradientShift 20s ease-in-out infinite alternate;
}
```

### 9.6 状态徽章脉冲动画

```css
.status-badge::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.3); }
}
```

### 9.7 AI 洞察框脉冲动画

```css
.ai-insight::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(96, 165, 250, 0.1) 0%, transparent 70%);
  animation: aiPulse 5s ease-in-out infinite;
}

@keyframes aiPulse {
  0%, 100% { transform: scale(1); opacity: 0.4; }
  50% { transform: scale(1.3); opacity: 0.7; }
}
```

### 9.8 柱状图光泽效果

```css
.bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 30%;
  background: linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%);
}
```

### 9.9 卡片入场动画（JavaScript）

```javascript
const observer = new IntersectionObserver(function(entries) {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

cards.forEach(card => observer.observe(card));
```

**CSS 配合**:
```css
.hub-card {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.hub-card.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### 9.10 导航链接下划线动画

```css
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-primary-light));
  transition: width var(--transition-normal);
}

.nav-links a:hover::after {
  width: 100%;
}
```

### 9.11 汉堡菜单动画

```css
.nav-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.nav-toggle.active span:nth-child(2) {
  opacity: 0;
}

.nav-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}
```

### 9.12 加载状态脉冲

```css
.api-loading {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
```

---

## 10. 响应式断点

| 断点 | 宽度 | 调整内容 |
|------|------|----------|
| Desktop | > 1024px | 完整布局 |
| Tablet | 768px - 1024px | KPI 2 列、图表单列、底部网格单列 |
| Mobile | < 768px | 导航折叠、Hero 标题缩小、卡片单列 |
| Small Mobile | < 480px | 研发模块单列 |

### 10.1 移动端导航

```css
@media (max-width: 768px) {
  .nav-links {
    display: none;
    position: absolute;
    top: var(--header-height);
    left: 0;
    right: 0;
    background: var(--color-bg);
    flex-direction: column;
    padding: 20px;
    gap: 16px;
    border-bottom: 1px solid var(--color-border);
  }

  .nav-links.active {
    display: flex;
  }

  .nav-toggle {
    display: flex;
  }
}
```

### 10.2 响应式网格

```css
/* 主页卡片 */
.hub-grid {
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}

/* KPI 行 */
.kpi-row {
  grid-template-columns: repeat(4, 1fr);
}
@media (max-width: 1024px) {
  .kpi-row { grid-template-columns: repeat(2, 1fr); }
}

/* 研发模块 */
.rd-modules {
  grid-template-columns: repeat(3, 1fr);
}
@media (max-width: 768px) {
  .rd-modules { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .rd-modules { grid-template-columns: 1fr; }
}
```

---

## 11. 模块化引用指南

### 11.1 快速开始

在新项目中复刻 Bojoo Online UI 风格，按以下步骤操作：

#### 步骤 1: 复制核心文件

```
从 bojoo-online/ 复制以下文件到项目:
├── css/
│   ├── style.css           # 基础样式
│   └── figma-enhanced.css  # 深色主题（核心）
├── scripts/
│   ├── main.js             # 基础交互
│   └── enhanced.js         # 增强交互
└── _includes/
    ├── header.njk          # 导航模板
    └── footer.njk          # 底部模板
```

#### 步骤 2: 在 HTML 中引用

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>项目名称</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/figma-enhanced.css">
</head>
<body>
  <!-- 使用 header.njk 模板或复制其 HTML 结构 -->
  
  <main>
    <!-- 页面内容 -->
  </main>
  
  <!-- 使用 footer.njk 模板或复制其 HTML 结构 -->
  
  <script src="scripts/main.js"></script>
  <script src="scripts/enhanced.js"></script>
</body>
</html>
```

#### 步骤 3: 使用组件

参考 [第 6 节 组件设计规范](#6-组件设计规范) 中的 HTML 结构和类名，直接使用：

- `.hub-card` — 卡片组件
- `.status-badge` — 状态徽章
- `.hub-link` — 按钮链接
- `.kpi-card` — KPI 指标卡
- `.ai-insight` — AI 洞察框
- `.chart-box` — 图表容器

### 11.2 自定义品牌色

如需更换品牌色，只需修改 `figma-enhanced.css` 中的 CSS 变量：

```css
:root {
  --color-primary: #你的主色;
  --color-primary-dark: #你的主色深色;
  --color-primary-light: #你的主色浅色;
  --color-primary-glow: rgba(你的主色, 0.3);
}
```

所有使用该变量的组件会自动更新。

### 11.3 添加新页面

1. 创建 `.njk` 文件，添加 front matter
2. `{% include "header.njk" %}` 引入头部
3. 使用 `.online-hero` 或 `.bi-demo` 等现有布局
4. `{% include "footer.njk" %}` 引入底部
5. 在 `vercel.json` 中添加路由规则

### 11.4 部署到子域名

1. 在 `vercel.json` 中添加子域名重写规则
2. 在 `index.njk` 的 `SUBDOMAIN_MAP` 中添加映射
3. 更新 `isSubdomainDeploy` 正则表达式
4. 在 Vercel 控制台绑定子域名
