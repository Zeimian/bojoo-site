# SPEC：企业门户 — bojoo.cn 官网 + bojoo.online 聚合站

> 版本：v1.1 ｜ 日期：2026-05-19

---

## 1. 系统架构

```
┌───────────────────────────────────┐     ┌───────────────────────────────────────┐
│  bojoo.cn                         │     │  bojoo.online                         │
│  (百度智能云 Nginx)                 │     │  阶段1: Vercel (MVP 1-2周)             │
│                                   │     │  阶段2: 百度云 Nginx (备案完成后迁移)    │
│  Nginx 虚拟主机                     │     │                                       │
│  ├─ index.html  ← 11ty 编译输出    │     │  阶段1 (Vercel):                       │
│  ├─ about.html  ← 11ty 编译输出    │     │  vercel.json host-based rewrite        │
│  ├─ franchise.html                │     │  ├─ cost.bojoo.online → cost.html      │
│  ├─ products.html                 │     │  ├─ review.bojoo.online → review.html  │
│  ├─ contact.html                  │     │  ├─ social.bojoo.online → social.html  │
│  └─ css/style.css                 │     │  └─ bi.bojoo.online → bi.html          │
│                                   │     │                                       │
│  图片 → CDN/OSS 外链               │     │  阶段2 (百度云):                       │
│                                   │     │  Nginx 虚拟主机，同 bojoo.cn 模式       │
└───────────────────────────────────┘     └───────────────────────────────────────┘
         │                                         │
    备案: bojoo.cn                              泛解析: *.bojoo.online
    (已有主体)                                  → cname.vercel-dns.com
```

---

## 2. 技术选型

### bojoo.cn
| 技术 | 说明 |
|------|------|
| **Eleventy (11ty)** | 轻量级静态站点生成器，抽离公共组件（header/footer/nav），编译输出纯 HTML |
| CSS3 + Vanilla JS | 无框架，响应式设计 |
| SEO | meta description, Open Graph, JSON-LD |
| 部署 | Nginx（宝塔面板），`deploy.sh` 一键 rsync 上传 |
| 图片资源 | CDN/对象存储（BOS/七牛云/又拍云），HTML 外链引用 |
| 小程序跳转 | **微信 URL Scheme / URL Link**（后台生成永久短链），`<a href>` 直链，无需 JS-SDK 签名 |

### bojoo.online
| 技术 | 说明 |
|------|------|
| 阶段1 (MVP): **Vercel** | 快速部署验证，host-based rewrite 配置子域名路由 |
| 阶段2 (正式): **百度云 Nginx** | 备案完成后迁移，规避跨洋网络风险 |
| 纯 HTML + CSS + JS | 11ty 编译输出，与 bojoo.cn 共享组件 |
| DNS | 泛解析 `*.bojoo.online` → `cname.vercel-dns.com` |

---

## 3. 数据结构

### bojoo.cn 页面数据（硬编码在 HTML 中）
- 品牌信息（名称、Slogan、故事）
- 产品信息（名称、描述、图片）
- 加盟信息（流程步骤、政策）
- 联系方式（地址、电话、邮箱、地图坐标）

### bojoo.online 导航数据

```javascript
// index.html 中的 links 数组（硬编码在 JS 中）
const links = [
  {
    name: "成本管控",
    url: "https://cost.bojoo.online",
    icon: "💰",
    description: "成本机器人使用指南和数据分析",
    status: "active"
  },
  {
    name: "差评收集",
    url: "https://review.bojoo.online",
    icon: "⭐",
    description: "三平台差评自动采集与分析",
    status: "active"
  },
  {
    name: "小红书运营",
    url: "https://social.bojoo.online",
    icon: "📕",
    description: "小红书关键词监控与博主管理",
    status: "coming-soon"
  },
  {
    name: "财务 BI",
    url: "https://bi.bojoo.online",
    icon: "📊",
    description: "门店经营数据看板与 AI 分析",
    status: "coming-soon"
  }
];
```

---

## 4. 接口设计

### 小程序跳转方案（关键变更）

**不使用微信 JS-SDK**（纯静态页面无法生成签名），改用微信官方 URL Scheme / URL Link：

1. 登录 [微信小程序管理后台](https://mp.weixin.qq.com/)
2. 工具 → 生成 URL Scheme（或 URL Link）
3. 选择目标小程序页面，生成**永久有效**的短链
4. 在 HTML 中直接使用：
   ```html
   <a href="weixin://dl/business/?t=XXXXXXX" class="btn-primary">进入小程序</a>
   ```
5. 用户在手机浏览器或微信内点击即可直接拉起小程序

### 子域名跳转
- 直接 `<a href>` 链接
- Vercel vercel.json 配置 host-based rewrite（见部署方案）

---

## 5. 部署方案

### bojoo.cn 部署流程
```
1. 在 /vol1/@apphome/trim.openclaw/data/workspace/bojoo-cn/ 创建 11ty 项目
2. 编写页面模板 (.njk) + 公共组件 (_includes/header.njk, footer.njk)
3. 运行 `npx @11ty/eleventy --output=/vol1/.../workspace/bojoo-cn/dist/`
4. 通过 deploy.sh 一键上传到百度云服务器：
   rsync -avz --delete dist/ user@BAIDU_IP:/var/www/bojoo.cn/
5. Nginx 配置虚拟主机指向该目录
6. 域名解析 bojoo.cn → 百度云 IP（需完成备案）
7. 配置 HTTPS 证书
```

### bojoo.online 阶段1 — Vercel MVP（1-2 周）
```
1. 创建 GitHub 仓库，push 11ty 编译后的 dist/ 目录
   （或直接手动上传 dist/ 文件到 Vercel）
2. Vercel 创建项目，绑定 bojoo.online
3. DNS 配置泛解析：
   - CNAME * → cname.vercel-dns.com
4. vercel.json 配置 host-based rewrite：
   {
     "rewrites": [
       { "source": "/(.*)", "has": [{ "type": "host", "value": "cost.bojoo.online" }], "destination": "/cost.html" },
       { "source": "/(.*)", "has": [{ "type": "host", "value": "review.bojoo.online" }], "destination": "/review.html" },
       { "source": "/(.*)", "has": [{ "type": "host", "value": "social.bojoo.online" }], "destination": "/social.html" },
       { "source": "/(.*)", "has": [{ "type": "host", "value": "bi.bojoo.online" }], "destination": "/bi.html" },
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
5. Vercel Settings → Domains → 添加各子域名（cost/review/social/bi）
6. 自动 HTTPS 证书生成，验证各子域名可访问
```

### bojoo.online 阶段2 — 迁移到百度云（备案完成后）
```
1. 在百度云 Nginx 新增虚拟主机，监听 bojoo.online + *.bojoo.online
2. 将 dist/ 文件上传到百度云
3. DNS 解析从 Vercel 切换到百度云 IP
4. 验证访问正常后，Vercel 项目可保留作为备份
```

---

## 6. 开发步骤

### Phase 0：项目初始化（bojoo.cn + bojoo.online 共用 11ty 项目）
1. 创建 11ty 项目：`/vol1/@apphome/trim.openclaw/data/workspace/bojoo-site/`
2. 编写 `package.json` + `.eleventy.js`
3. 创建 `_includes/` 公共组件（header.njk、footer.njk、nav.njk）
4. 编写 `deploy.sh`（一键 rsync 上传到百度云）

### Phase 1：bojoo.online 聚合页（1-2 天）
1. 编写聚合导航首页模板（`index.njk`）
2. 编写各子域名页面模板（cost.njk、review.njk、social.njk、bi.njk）
3. 编译输出 `dist/`
4. 部署到 Vercel（MVP）
5. 配置 DNS 泛解析 + vercel.json host-based rewrite
6. 测试各子域名跳转

### Phase 2：bojoo.cn 框架（2-3 天）
1. 编写首页模板（Hero + 亮点 + CTA）
2. 编写子页面模板（about、franchise、products、contact）
3. 生成小程序 URL Scheme / URL Link
4. 编译输出 `dist/`
5. 用户通过 Trae CN 编辑生成的 HTML 内容

### Phase 3：内容填充与上线（待用户提供素材）
1. 填充品牌文案、产品图片
2. 上传图片到 CDN/OSS
3. SEO 优化（meta、JSON-LD）
4. deploy.sh 上传到百度云
5. Nginx 配置 + 域名解析 + HTTPS
6. 备案流程（bojoo.online 新增域名备案）

---

## 7. 测试方案

| 测试项 | 方法 | 预期结果 |
|--------|------|---------|
| 页面加载 | 浏览器打开 | < 2s，无 404 |
| 响应式 | 手机/平板/桌面浏览器 | 布局正常适配 |
| 子域名跳转 | 点击所有卡片 | 跳转到正确子域名页面 |
| 小程序跳转 | 手机微信/浏览器点击 | 成功拉起小程序 |
| Vercel host-based rewrite | 访问 cost.bojoo.online | 显示 cost.html，非首页 |
| SEO | 百度搜索品牌名 | 收录并显示正确描述 |
| HTTPS | https:// 访问 | 证书有效，无警告 |
| 11ty 编译 | `npx @11ty/eleventy` | 无错误，dist/ 包含所有 HTML |
| deploy.sh | 执行一键部署 | 文件同步到百度云，访问正常 |

---

## 8. 已知问题/TODO

- [ ] 确认百度云服务器 IP 和 Nginx 状态
- [ ] 确认 Vercel 账号和域名 DNS 权限
- [ ] 获取品牌文案和图片素材
- [ ] 获取微信小程序 URL Scheme（永久短链）
- [ ] 提交 bojoo.online 备案（已有主体新增域名）
- [ ] 确定 bojoo.online 的视觉风格偏好
- [ ] 图片 CDN/OSS 选型（BOS/七牛云/又拍云）
- [ ] 备案完成后将 bojoo.online 从 Vercel 迁移到百度云
