# 宝珠 Bojoo — UI 设计规范文档

> **版本**: v2.0.0  
> **更新日期**: 2026-06-04  
> **适用范围**: 宝珠所有前端项目（bojoo-online 静态站 + bao-zhu-v3 Next.js 应用）  
> **设计来源**: Figma Cards-chart-layout + 品牌视觉规范

---

## 目录

- [1. 设计体系概述](#1-设计体系概述)
- [2. 色系定义](#2-色系定义)
- [3. 排版规范](#3-排版规范)
- [4. 布局与间距](#4-布局与间距)
- [5. 背景样式规范](#5-背景样式规范)
- [6. 组件设计规范](#6-组件设计规范)
- [7. 主页设计规范](#7-主页设计规范)
- [8. 页面编写规则](#8-页面编写规则)
- [9. 特效实现方案](#9-特效实现方案)
- [10. 响应式断点](#10-响应式断点)
- [11. 多项目适配指南](#11-多项目适配指南)

---

## 1. 设计体系概述

### 1.1 设计理念

宝珠采用 **暖色极简（Warm Minimalist）** 设计语言，以琥珀色品牌色 `#D4A574` 为核心视觉锚点，结合暖白背景 `#FAF7F2`、精致的卡片边框和流畅的过渡动画，营造专业、温暖且易于阅读的视觉体验。

> **设计原则**: 内容优先、克制装饰、一致的品牌色、清晰的层级关系。

### 1.2 技术栈

宝珠前端包含两个独立项目，共享同一套设计规范：

| 项目 | 技术栈 | 用途 |
|------|--------|------|
| **bojoo-online** | 11ty + Nunjucks + 原生 CSS | 静态导航站、子域名站点 |
| **bao-zhu-v3** | Next.js 16 + React + Tailwind CSS + shadcn/ui | AI 研发平台（主应用） |

### 1.3 项目文件结构

#### bao-zhu-v3（Next.js 应用）

```
bao-zhu-v3/
├── app/
│   ├── (landing)/page.tsx        # 首页（Landing Page）
│   ├── (auth)/login/page.tsx     # 登录页
│   ├── dashboard/                # 仪表盘
│   ├── idea-lab/                 # 创意实验室
│   ├── market-radar/             # 市场雷达
│   ├── marketing-plan/           # 营销策略官
│   ├── pricing-sim/              # 定价模拟器
│   ├── visual-studio/            # AI 视觉实验室
│   ├── products/                 # 产品库
│   ├── admin/                    # 后台管理
│   ├── api/                      # API 路由
│   ├── globals.css               # 全局样式 + CSS 变量
│   └── layout.tsx                # 根布局
├── components/
│   └── ui/                       # shadcn/ui 组件
├── lib/
│   ├── db.ts                     # 数据库连接
│   ├── theme-config.ts           # 主题配置
│   └── utils.ts                  # 工具函数
├── db/
│   └── schema.ts                 # Drizzle ORM 表结构
├── tailwind.config.ts            # Tailwind 配置
├── components.json               # shadcn/ui 配置
└── .env.local                    # 环境变量
```

#### bojoo-online（静态站）

```
bojoo-online/
├── _includes/
│   ├── header.njk                # 全局头部
│   └── footer.njk                # 全局底部
├── css/
│   ├── style.css                 # 基础样式（浅色主题基线）
│   ├── figma-enhanced.css        # 深色主题增强样式
│   └── enhanced.css              # 浅色主题增强样式
├── scripts/
│   ├── main.js                   # 基础交互
│   └── enhanced.js               # 增强交互
├── index.njk                     # 主页
└── vercel.json                   # Vercel 路由配置
```

---

## 2. 色系定义

### 2.1 品牌主色（Brand Primary）

| 变量名 | 色值 | 用途 | Tailwind 用法 |
|--------|------|------|---------------|
| `--color-primary` | `#D4A574` | 品牌主色，用于按钮、链接、图标 | `text-[#D4A574]` |
| `--color-primary-dark` | `#B8864E` | 主色深色，用于标题、hover 状态 | `text-[#B8864E]`、`bg-[#B8864E]` |
| `--color-primary-light` | `#F5E6D3` | 主色浅色，用于背景装饰、图标背景 | `bg-[#F5E6D3]` |
| `--color-primary-glow` | `rgba(212, 165, 116, 0.3)` | 主色发光效果 | — |

### 2.2 浅色主题（Light Theme）— bao-zhu-v3 默认

| 变量名 | 色值 | 用途 | Tailwind 用法 |
|--------|------|------|---------------|
| `--color-bg` | `#fff` | 页面/卡片背景 | `bg-white` |
| `--color-bg-light` | `#FAF7F2` | 次级背景、页面底色 | `bg-[#FAF7F2]` |
| `--color-border` | `#e8e0d4` | 边框色 | `border-[#e8e0d4]` |
| `--color-text` | `#333` | 正文文字 | `text-[#333]` |
| `--color-text-light` | `#666` | 次要文字 | `text-[#666]` |
| `--color-text-muted` | `#999` | 弱化文字 | `text-[#999]` |

### 2.3 深色主题（Dark Theme）— bojoo-online 可选

| 变量名 | 色值 | 用途 |
|--------|------|------|
| `--dark-bg-primary` | `#0f1117` | 页面主背景 |
| `--dark-bg-secondary` | `#1a1d24` | 次级背景 |
| `--dark-bg-card` | `#1e2128` | 卡片背景 |
| `--dark-bg-hover` | `#252830` | 卡片 hover 背景 |
| `--dark-border` | `#2a2d35` | 边框色 |
| `--dark-border-light` | `#353840` | 亮边框色 |
| `--text-primary` | `#ffffff` | 主文字色 |
| `--text-secondary` | `#b0b3b8` | 次要文字色 |
| `--text-muted` | `#6b6e73` | 弱化文字色 |

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

### 2.5 bao-zhu-v3 CSS 变量映射

在 `app/globals.css` 中定义，与 Tailwind 配置同步：

```css
:root {
  --background: #FFFFFF;
  --foreground: #111827;
  --card: #FFFFFF;
  --card-foreground: #111827;
  --primary: #16A34A;       /* 可被主题配置覆盖 */
  --primary-foreground: #FFFFFF;
  --secondary: #F0FDF4;
  --muted: #F9FAFB;
  --muted-foreground: #6B7280;
  --border: #E5E7EB;
  --ring: #16A34A;
  --radius: 0.75rem;
}
```

> **注意**: bao-zhu-v3 支持动态主题切换（`lib/theme-config.ts`），用户可在 `/admin/theme` 页面切换不同主题预设。

---

## 3. 排版规范

### 3.1 字体栈

```css
/* 原生 CSS (bojoo-online) */
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
  "Hiragino Sans GB", "Microsoft YaHei", sans-serif;

/* Tailwind (bao-zhu-v3) — 在 tailwind.config.ts 中配置 */
fontFamily: {
  sans: ["PingFang SC", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
}
```

### 3.2 字号层级

| 层级 | 字号 | 字重 | Tailwind 类 | 用途 |
|------|------|------|-------------|------|
| H1 | 3rem (48px) | 700 | `text-4xl md:text-5xl font-bold` | 主页大标题 |
| H2 | 1.875rem (30px) | 700 | `text-3xl font-bold` | 页面/区块标题 |
| H3 | 1.125rem (18px) | 700 | `text-lg font-bold` | 卡片标题 |
| Body | 1rem (16px) | 400 | `text-base` | 正文 |
| Small | 0.875rem (14px) | 500 | `text-sm font-medium` | 标签、元数据 |
| Micro | 0.75rem (12px) | 500 | `text-xs` | 徽章、提示 |

### 3.3 行高

| 场景 | 值 | Tailwind 类 |
|------|-----|-------------|
| 正文 | `1.6` | `leading-relaxed` |
| 描述文字 | `1.7` | `leading-relaxed` |
| 标题 | `1.2` | `leading-tight` |

### 3.4 字间距

| 场景 | 值 | Tailwind 类 |
|------|-----|-------------|
| 标题 | `normal` | — |
| 大写英文标签 | `0.1em` | `tracking-wider` |
| 品牌副标题 | `0.25em` | `tracking-widest` |

---

## 4. 布局与间距

### 4.1 容器

```css
/* 原生 CSS */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Tailwind */
<div className="max-w-[1200px] mx-auto px-5">
```

### 4.2 间距系统

| 用途 | 间距值 | Tailwind 类 |
|------|--------|-------------|
| 卡片间距 | `24px` | `gap-6` |
| 模块间距 | `40px` | `gap-10` |
| 区块内边距 | `28px` | `p-7` |
| 表单元素间距 | `12px` | `gap-3` |
| 导航链接间距 | `24px` | `gap-6` |
| 区块垂直间距 | `64px` | `py-16` |

### 4.3 圆角系统

| 变量名 | 值 | Tailwind 类 | 用途 |
|--------|-----|-------------|------|
| `--radius-sm` | `6px` | `rounded-md` | 小按钮、输入框 |
| `--radius-md` | `12px` | `rounded-lg` | 卡片、对话框 |
| `--radius-lg` | `16px` | `rounded-xl` | 大卡片、面板 |
| `--radius-xl` | `24px` | `rounded-2xl` | 特殊容器 |

### 4.4 阴影系统

| 变量名 | 值 | Tailwind 类 | 用途 |
|--------|-----|-------------|------|
| `--shadow-sm` | `0 2px 8px rgba(0,0,0,0.06)` | `shadow-sm` | 轻微阴影 |
| `--shadow-md` | `0 4px 20px rgba(0,0,0,0.08)` | `shadow-md` | 卡片默认 |
| `--shadow-lg` | `0 8px 40px rgba(0,0,0,0.12)` | `shadow-lg` | 卡片 hover |

---

## 5. 背景样式规范

### 5.1 浅色主题页面背景（bao-zhu-v3 默认）

```css
/* 原生 CSS */
body {
  background: linear-gradient(180deg, #FAF7F2 0%, #fff 100px);
}

/* Tailwind */
<main className="min-h-screen bg-[#FAF7F2]">
<section className="bg-gradient-to-b from-[#FAF7F2] to-white">
```

**设计要点**:
- 顶部暖白渐变，向下过渡到纯白
- 保持内容区域干净，不干扰阅读

### 5.2 深色主题页面背景（bojoo-online 可选）

```css
body {
  background: var(--dark-bg-primary);
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(212, 165, 116, 0.03) 0%, transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(96, 165, 250, 0.02) 0%, transparent 40%);
}
```

### 5.3 卡片背景

```css
/* 浅色主题 */
.card {
  background: #fff;
  border: 1px solid #e8e0d4;
}
.card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

/* Tailwind */
<div className="bg-white border border-[#e8e0d4] rounded-xl hover:shadow-md transition-shadow">
```

### 5.4 毛玻璃效果

```css
/* 导航栏 */
nav {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid rgba(232, 224, 212, 0.5);
}

/* Tailwind */
<nav className="sticky top-0 z-100 bg-white/90 backdrop-blur-md border-b border-[#e8e0d4]">
```

**适用场景**: 导航栏、浮动面板、对话框

---

## 6. 组件设计规范

### 6.1 导航栏（Header）

**bao-zhu-v3（React + Tailwind）**:
```tsx
<nav className="sticky top-0 z-100 bg-white/90 backdrop-blur-md border-b border-[#e8e0d4]">
  <div className="max-w-[1200px] mx-auto px-5 h-16 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <span className="text-xl font-bold text-[#B8864E]">宝珠</span>
    </div>
    <div className="flex items-center gap-6">
      <Link href="/" className="text-sm text-[#333] hover:text-[#B8864E] transition-colors">首页</Link>
      <Link href="/login" className="bg-[#B8864E] hover:bg-[#D4A574] text-white px-5 py-2 rounded-md text-sm font-medium transition-colors">
        开始使用
      </Link>
    </div>
  </div>
</nav>
```

**bojoo-online（HTML + CSS）**:
```html
<header class="site-header">
  <nav class="container">
    <a href="/" class="logo">宝珠 Bojoo Online</a>
    <ul class="nav-links">
      <li><a href="/">首页</a></li>
    </ul>
  </nav>
</header>
```

**关键样式**:
- `position: sticky; top: 0` 固定顶部
- `backdrop-filter: blur(20px)` 毛玻璃效果
- 导航链接 hover 时颜色变为主色深色 `#B8864E`
- CTA 按钮使用主色深色背景 + 白色文字

### 6.2 卡片（Module Card）

**bao-zhu-v3（React + Tailwind）**:
```tsx
<Link href="/market-radar" className="block group">
  <div className="bg-white border border-[#e8e0d4] rounded-xl p-6 hover:shadow-md transition-shadow h-full">
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 rounded-lg bg-[#F5E6D3] flex items-center justify-center text-2xl">
        📡
      </div>
      <div className="text-right">
        <div className="text-xl font-bold text-[#B8864E]">500+</div>
        <div className="text-xs text-[#999]">趋势数据</div>
      </div>
    </div>
    <h3 className="text-lg font-bold text-[#333]">市场雷达</h3>
    <p className="text-sm text-[#666] leading-relaxed mb-4">实时追踪市场趋势...</p>
    <div className="flex items-center gap-2 text-[#B8864E] text-sm font-medium group-hover:gap-3 transition-all">
      <span>进入模块</span><span>→</span>
    </div>
  </div>
</Link>
```

**关键样式**:
- 纯白背景 + 细边框
- hover 时阴影增强
- 图标区域使用主色浅色背景 `#F5E6D3`
- 箭头 hover 时右移（`group-hover:gap-3`）

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

| 类型 | 背景色 | 文字色 | 用途 |
|------|--------|--------|------|
| Primary | `#B8864E` | `#fff` | CTA、主要操作 |
| Primary Hover | `#D4A574` | `#fff` | Primary hover 状态 |
| Outline | `transparent` + `border-[#e8e0d4]` | `#333` | 次要操作 |
| Outline Hover | `#F5E6D3` | `#B8864E` | Outline hover 状态 |

**关键样式**:
- hover 时背景色变浅
- `transition-colors` 平滑过渡
- 圆角 `rounded-md`（6px）

### 6.5 输入框（Input）

```tsx
<input
  type="email"
  className="w-full px-3 py-2 border border-[#e8e0d4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A574] focus:border-transparent"
/>
```

**关键样式**:
- 边框色 `#e8e0d4`
- focus 时显示主色浅色光环 `ring-[#D4A574]`
- 圆角 `rounded-md`

### 6.6 KPI 卡片

```html
<div class="kpi-card">
  <div class="kpi-value">¥128万</div>
  <div class="kpi-label">本月营收</div>
  <span class="kpi-trend up">↑ 12.5%</span>
</div>
```

**关键样式**:
- 数值使用主色深色文字
- 趋势标签带圆角背景

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
│         Hero Section                │
│    (暖白渐变背景 + 统计数据)         │
│                                     │
├─────────────────────────────────────┤
│                                     │
│         Module Card Grid            │
│    (响应式网格，3 列 → 2 列 → 1 列) │
│                                     │
├─────────────────────────────────────┤
│                                     │
│         About Section               │
│    (双栏布局：文字 + 图标)           │
│                                     │
├─────────────────────────────────────┤
│           Footer                    │
└─────────────────────────────────────┘
```

### 7.2 Hero 区域规范

- **内边距**: `py-20 px-5`（80px 垂直 + 20px 水平）
- **标题**: `text-4xl md:text-5xl font-bold text-[#B8864E]`
- **副标题**: `text-xl text-[#666]`，最大宽度 600px
- **CTA 按钮**: `bg-[#B8864E] hover:bg-[#D4A574] text-white px-8 py-3 rounded-md`
- **统计数据**: 3 列网格，数值 `text-2xl font-bold text-[#B8864E]`

### 7.3 模块卡片网格规范

- **布局**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- **内边距**: `py-16 px-5`
- **卡片**: 纯白背景 + 细边框 + hover 阴影

### 7.4 模块排序规则（bao-zhu-v3）

1. 市场雷达
2. 概念验证器（Idea Lab）
3. 智能研发
4. 定价模拟器
5. AI 视觉实验室
6. 营销策略官

---

## 8. 页面编写规则

### 8.1 bao-zhu-v3（Next.js App Router）

#### 页面文件结构

```tsx
// app/example/page.tsx
export const metadata: Metadata = {
  title: "页面标题 | 宝珠",
  description: "页面描述",
};

export default function ExamplePage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* 页面头部 */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-[#e8e0d4]">
        <div className="max-w-[1200px] mx-auto px-4 py-3">
          <a href="/" className="text-[#999] hover:text-[#B8864E] transition-colors text-sm">← 返回</a>
          <h1 className="text-xl font-semibold text-[#333]">页面标题</h1>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        {/* 内容 */}
      </div>
    </div>
  );
}
```

#### 编写规则

1. **必须使用 `"use client"` 标记**（如需交互）
2. **页面背景**: `bg-[#FAF7F2]`（浅色主题默认）
3. **导航栏**: sticky + 毛玻璃 + `border-[#e8e0d4]`
4. **按钮**: 主色 `bg-[#B8864E]`，hover `bg-[#D4A574]`
5. **链接**: hover 颜色 `hover:text-[#B8864E]`
6. **卡片**: `bg-white border border-[#e8e0d4] rounded-xl`
7. **内部导航**: 使用 `next/link` 的 `<Link>` 组件，不使用 `<a>` 标签

### 8.2 bojoo-online（11ty + Nunjucks）

#### 页面文件结构

```njk
---
title: "页面标题 — Bojoo Online"
meta_description: "SEO 描述，不超过 160 字符"
layout: null
eleventyExcludeFromCollections: true
---
{% include "header.njk" %}

<section class="online-hero">
  <div class="container">
    <h1>页面标题</h1>
    <p>页面描述</p>
  </div>
</section>

<section class="container">
  <!-- 页面内容 -->
</section>

{% include "footer.njk" %}
```

#### CSS/JS 引用顺序

```html
<link rel="stylesheet" href="/css/style.css">
<link rel="stylesheet" href="/css/figma-enhanced.css">
<link rel="stylesheet" href="/css/页面专用.css">

<script src="/scripts/main.js"></script>
<script src="/scripts/enhanced.js"></script>
<script src="/scripts/页面专用.js"></script>
```

### 8.3 子域名切换脚本

页面底部必须包含子域名智能切换脚本：

```html
<script>
  document.addEventListener("DOMContentLoaded", function () {
    var SUBDOMAIN_MAP = {
      "cost": "cost.bojoo.online",
      "review": "review.bojoo.online"
    };
    var currentHost = window.location.hostname;
    var isSubdomainDeploy = /^(cost|review)\.bojoo\.online$/.test(currentHost);
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

### 9.7 卡片入场动画（JavaScript）

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

### 9.8 导航链接下划线动画

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

### 9.9 汉堡菜单动画

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

---

## 10. 响应式断点

### 10.1 断点定义

| 断点 | 宽度 | Tailwind 前缀 | 调整内容 |
|------|------|---------------|----------|
| Desktop | > 1024px | `lg:` | 完整布局 |
| Tablet | 768px - 1024px | `md:` | 卡片 2 列、导航完整 |
| Mobile | < 768px | `sm:` | 导航折叠、卡片单列 |
| Small Mobile | < 640px | — | 标题缩小、隐藏次要导航 |

### 10.2 响应式网格

```html
<!-- 主页模块卡片 -->
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<!-- KPI 行 -->
<div className="grid grid-cols-3 md:grid-cols-4 gap-4">

<!-- 关于我们双栏 -->
<div className="grid md:grid-cols-2 gap-10 items-center">
```

### 10.3 移动端导航

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

### 10.4 隐藏/显示策略

| 元素 | Desktop | Mobile | Tailwind 类 |
|------|---------|--------|-------------|
| 产品库链接 | 显示 | 隐藏 | `hidden sm:inline` |
| 市场雷达链接 | 显示 | 隐藏 | `hidden sm:inline` |
| 创意实验室链接 | 显示 | 隐藏 | `hidden sm:inline` |
| 导入 CSV 按钮 | 显示 | 隐藏 | `hidden md:flex` |
| AI 搜索文字 | 完整 | 缩写 | `hidden sm:inline` / `sm:hidden` |

---

## 11. 多项目适配指南

### 11.1 设计规范统一性

两个项目共享以下设计参数：

| 参数 | 值 | 说明 |
|------|-----|------|
| 品牌主色 | `#D4A574` | 所有项目一致 |
| 主色深色 | `#B8864E` | 按钮、标题 |
| 主色浅色 | `#F5E6D3` | 图标背景、装饰 |
| 边框色 | `#e8e0d4` | 卡片、分割线 |
| 页面背景 | `#FAF7F2` | 浅色主题默认 |
| 正文字色 | `#333` | 主要文字 |
| 次要文字 | `#666` | 描述性文字 |
| 弱化文字 | `#999` | 元数据、提示 |
| 字体栈 | PingFang SC + system-ui | 中英文一致 |

### 11.2 快速开始 — 新项目

#### 步骤 1: 选择技术栈

- 如果是 **静态展示页** → 使用 bojoo-online（11ty）
- 如果是 **交互式应用** → 使用 bao-zhu-v3（Next.js）

#### 步骤 2: 应用设计规范

**bao-zhu-v3（Next.js + Tailwind）**:
```tsx
<main className="min-h-screen bg-[#FAF7F2] text-[#333] font-sans">
  <nav className="sticky top-0 z-100 bg-white/90 backdrop-blur-md border-b border-[#e8e0d4]">
    {/* 导航内容 */}
  </nav>
  <section className="py-16 px-5">
    <div className="max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 卡片内容 */}
      </div>
    </div>
  </section>
</main>
```

**bojoo-online（11ty + CSS）**:
```html
<main>
  <header class="site-header">
    <nav class="container">
      <a href="/" class="logo">宝珠</a>
    </nav>
  </header>
  <section class="container">
    <div class="hub-grid">
      <!-- 卡片内容 -->
    </div>
  </section>
</main>
```

### 11.3 自定义品牌色

如需更换品牌色，只需修改对应项目的配置：

**bao-zhu-v3** — 修改 `app/globals.css` 和 `tailwind.config.ts`：
```css
:root {
  --primary: #你的主色;
}
```

**bojoo-online** — 修改 `css/figma-enhanced.css`：
```css
:root {
  --color-primary: #你的主色;
  --color-primary-dark: #你的主色深色;
  --color-primary-light: #你的主色浅色;
}
```

### 11.4 术语表

| 术语 | 定义 |
|------|------|
| 宝珠 | 品牌名称，全称"宝珠奶酪" |
| Bojoo | 品牌英文名 |
| bao-zhu-v3 | Next.js 主应用项目 |
| bojoo-online | 11ty 静态导航站项目 |
| 主色 | `#D4A574`（琥珀色） |
| 主色深色 | `#B8864E` |
| 主色浅色 | `#F5E6D3` |
| 暖白背景 | `#FAF7F2` |
| 毛玻璃 | `backdrop-filter: blur()` 效果 |
