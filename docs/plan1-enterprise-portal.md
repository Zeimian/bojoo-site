# Plan 1：企业门户 — bojoo.cn 官网 + bojoo.online 聚合站

> 创建时间：2026-05-19 ｜ 版本：v1.1

## Context

用户有两个域名：
- **bojoo.cn** — 挂在国内百度云服务器，作为公司官方网站。用途：品牌介绍、招商政策介绍、引导用户链接到小程序。
- **bojoo.online** — 聚合导航站（类似 163 导航站）。用途：聚合公司内部各应用/Agent 的入口，通过子域名形式挂载。

**部署策略（双轨并行，关键变更）**：
- bojoo.cn：直接部署在百度智能云，需完成备案
- bojoo.online：**先用 Vercel 跑通 MVP**（1-2 周临时方案），备案完成后迁移到百度智能云，彻底规避 Vercel 国内访问不稳定（DNS 污染/IP 连坐）的风险

**技术方案升级**：
- 引入 **Eleventy (11ty)** 轻量级静态站点生成器，抽离公共组件（header/footer/nav），编译输出纯 HTML
- 图片使用 CDN/对象存储外链，减轻百度云服务器带宽压力
- 小程序跳转使用**微信 URL Scheme / URL Link**（永久短链），放弃 JS-SDK（纯静态页面无法生成签名）
- `deploy.sh` 一键 rsync 上传，替代手动 SCP

**现有资产**：
- `子域名架构规划.md` — Domain 2 的 Vercel 子域名架构方案
- `portal/index.html` — 内部知识门户首页（参考用，不复用）
- `cost-robot-ppt.html` — 12 页交互式 HTML PPT
- `agent-documentation.html` — OpenClaw 多 Agent 系统文档
- Trae CN 编辑器已安装

---

## Part A：bojoo.cn 官方网站

### 目标

建立一个品牌官网，核心功能：
1. **品牌介绍** — 宝珠奶酪品牌故事、产品线、门店信息
2. **招商政策** — 加盟流程、扶持政策、联系方式
3. **小程序引流** — 通过微信 URL Scheme 短链直接拉起小程序

### 技术方案

**技术选型**：Eleventy (11ty) + 纯静态 HTML 输出（已确认）
- 11ty 抽离公共组件，避免 5 个页面逐一修改导航/footer 的维护地狱
- 编译输出纯 HTML，满足百度云服务器"纯静态"部署要求
- SEO 优化：语义化标签、meta 描述、Open Graph、JSON-LD 结构化数据
- 响应式设计：移动端优先
- 图片资源：上传到 CDN/对象存储（BOS/七牛云/又拍云），HTML 外链引用

### 页面结构（11ty 源码）

```
bojoo-site/
├── .eleventy.js           # 11ty 配置
├── package.json
├── _includes/
│   ├── header.njk         # 公共导航栏
│   ├── footer.njk         # 公共底部（备案号、联系方式）
│   └── nav.njk            # 导航菜单
├── css/
│   └── style.css          # 公共样式
├── index.njk              # 首页
├── about.njk              # 关于我们
├── franchise.njk          # 招商加盟
├── products.njk           # 产品介绍
├── contact.njk            # 联系我们
├── deploy.sh              # 一键部署脚本
└── dist/                  # 编译输出（纯 HTML，上传到百度云）
```

### 首页设计要点

1. **Hero 区**：品牌大图/Slogan + "了解品牌"和"立即加盟"两个 CTA
2. **品牌亮点**：3-4 个卡片（产品特色、门店数量、品牌理念等）
3. **产品展示**：主打产品缩略图
4. **招商引导**：加盟流程简述 + CTA
5. **小程序入口**：微信 URL Scheme 短链按钮（`<a href="weixin://dl/business/?t=XXXXXXX">`）
6. **底部**：联系方式、社交媒体链接、备案信息

### Step 1：11ty 项目初始化
- 在 `/vol1/@apphome/trim.openclaw/data/workspace/bojoo-site/` 创建项目
- 安装 11ty，编写 `.eleventy.js` 配置
- 创建 `_includes/` 公共组件
- 编写 `deploy.sh`（`rsync -avz --delete dist/ user@BAIDU_IP:/var/www/bojoo.cn/`）

### Step 2：页面模板开发
- 编写首页 + 4 个子页面模板（继承 header/footer）
- 编写公共 CSS
- 编译输出 `dist/`，验证 5 个 HTML 文件

### Step 3：内容填充（待用户提供素材）
- 品牌文案（品牌故事、产品介绍、招商政策）
- 图片素材上传到 CDN/OSS
- 生成小程序 URL Scheme（永久短链）
- 用户通过 Trae CN 编辑 HTML 内容

### Step 4：部署到百度智能云
- 执行 `deploy.sh` 一键上传
- Nginx 配置虚拟主机（已有宝塔面板可直接添加站点）
- 域名解析：bojoo.cn → 百度云 IP（需完成备案）
- HTTPS 证书配置

---

## Part B：bojoo.online 聚合网站

### 目标

一个聚合导航站，类似 163 首页风格：
- 全新设计（不复用 portal/index.html）
- 通过子域名挂载内部 Agent/应用入口
- 先 Vercel MVP 验证，备案完成后迁移到百度云

### 技术方案

**阶段1 (MVP)**：Vercel 快速部署
- 使用 11ty 编译输出（与 bojoo.cn 共享组件库）
- vercel.json host-based rewrite 配置子域名路由
- DNS 泛解析 `*.bojoo.online` → `cname.vercel-dns.com`

**阶段2 (正式)**：百度智能云 Nginx
- 备案完成后迁移
- Nginx 虚拟主机，同 bojoo.cn 模式
- 彻底规避跨洋网络被墙风险

### vercel.json 路由配置（关键）

```json
{
  "rewrites": [
    { "source": "/(.*)", "has": [{ "type": "host", "value": "cost.bojoo.online" }], "destination": "/cost.html" },
    { "source": "/(.*)", "has": [{ "type": "host", "value": "review.bojoo.online" }], "destination": "/review.html" },
    { "source": "/(.*)", "has": [{ "type": "host", "value": "social.bojoo.online" }], "destination": "/social.html" },
    { "source": "/(.*)", "has": [{ "type": "host", "value": "bi.bojoo.online" }], "destination": "/bi.html" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 子域名规划（4 个已确认）

| # | 子域名 | 用途 | 状态 |
|---|--------|------|------|
| 1 | `cost.bojoo.online` | 成本管控 Agent | ✅ 已有 HTML |
| 2 | `review.bojoo.online` | 差评收集 Agent | ✅ 已有 HTML |
| 3 | `social.bojoo.online` | 小红书运营 Agent | ⏳ 待建 |
| 4 | `bi.bojoo.online` | 财务 BI 看板 | ⏳ 待建 |
| 5-10 | 待定 | 预留扩展 | ❌ 待规划 |

### Step 1：全新设计聚合导航首页
- 卡片式/网格布局，展示 4 个已确认的子域名入口
- 预留扩展位（5-10 个）

### Step 2：Vercel MVP 部署
- 编译输出 `dist/` → push 到 GitHub 或手动上传 Vercel
- 配置 DNS 泛解析 `*.bojoo.online` → `cname.vercel-dns.com`
- Vercel Settings → Domains → 添加各子域名
- 验证各子域名可正常访问

### Step 3：备案完成后迁移到百度云
- Nginx 新增虚拟主机
- 上传 dist/ 文件
- DNS 从 Vercel 切换到百度云 IP

---

## 执行顺序

1. **11ty 项目初始化**（bojoo.cn + bojoo.online 共用一个 11ty 项目）
2. **bojoo.online 聚合页**（MVP 先上 Vercel）— 设计 → 编译 → 部署
3. **bojoo.cn 官网** — 模板开发 → 用户提供内容 → deploy.sh 上传
4. **备案流程** — bojoo.online 新增域名备案（已有主体，1-2 周）
5. **bojoo.online 迁移到百度云**（备案完成后）

## 待确认

1. bojoo.cn 的品牌文案（品牌故事、产品介绍、招商政策）
2. 图片素材（Logo、产品图、门店图）
3. 百度云服务器的 IP 和 Nginx 配置现状
4. Vercel 项目是否已为 bojoo.online 创建
5. bojoo.online 的 5-10 号子域名预留名称
6. 微信小程序 URL Scheme（需从小程序后台生成永久短链）
7. 图片 CDN/OSS 选型（BOS/七牛云/又拍云）
8. bojoo.online 备案流程是否可立即启动

## 验证

1. 11ty 编译无错误，dist/ 包含所有 HTML 文件
2. deploy.sh 一键上传到百度云成功
3. bojoo.online Vercel MVP 可访问，各子域名跳转正确
4. 小程序 URL Scheme 短链可正常拉起小程序
5. bojoo.cn 部署后可通过域名访问
