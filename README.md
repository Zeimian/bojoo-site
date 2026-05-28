# Bojoo Site — 宝珠奶酪企业门户

> bojoo.cn 官网 + bojoo.online 内部聚合导航站

## 项目结构

```
bojoo-site/
├── .eleventy.js              # 11ty 配置
├── package.json
├── vercel.json               # Vercel host-based rewrite (bojoo.online)
├── _includes/
│   ├── header.njk            # 公共导航栏
│   └── footer.njk            # 公共底部
├── css/
│   └── style.css             # 公共样式
├── scripts/
│   ├── deploy.sh             # 一键部署到百度云
│   └── main.js               # 客户端 JS
├── index.njk                 # bojoo.cn 首页
├── about.njk                 # 关于我们
├── franchise.njk             # 招商加盟
├── products.njk              # 产品介绍
├── contact.njk               # 联系我们
├── online-index.njk          # bojoo.online 聚合导航首页
├── online-cost.njk           # cost.bojoo.online
├── online-review.njk         # review.bojoo.online
├── online-social.njk         # social.bojoo.online
├── online-bi.njk             # bi.bojoo.online
├── docs/                     # PRD / SPEC / Plan 文档
└── dist/                     # 编译输出（git 忽略）
```

## 快速开始

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 编译
npm run build
```

## 部署

### bojoo.cn — 百度智能云

```bash
export BAIDU_IP=your_server_ip
export BAIDU_USER=root
npm run deploy
```

### bojoo.online — Vercel (MVP)

1. 连接 GitHub 仓库到 Vercel
2. DNS 泛解析 `*.bojoo.online` → `cname.vercel-dns.com`
3. `vercel.json` 自动配置 host-based rewrite

## 文档

- [Plan 1 — 总体规划](docs/plan1-enterprise-portal.md)
- [PRD — 产品需求](docs/prd-plan1-enterprise-portal.md)
- [SPEC — 技术规格](docs/spec-plan1-enterprise-portal.md)
- [子域名架构规划](docs/子域名架构规划.md)

## 技术栈

- **Eleventy (11ty)** — 静态站点生成器
- **Nunjucks** — 模板引擎
- **纯 CSS3 + Vanilla JS** — 无框架依赖
- **Vercel** — bojoo.online MVP 部署
- **Nginx + rsync** — bojoo.cn 生产部署
