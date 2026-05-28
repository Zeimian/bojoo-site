# Bojoo Site — 宝珠奶酪企业门户

> bojoo.cn 官网 + bojoo.online 内部聚合导航站

## 项目结构

```
bojoo-site/
├── bojoo-cn/                    # 对外官网（bojoo.cn）
│   ├── .eleventy.js
│   ├── package.json
│   ├── _includes/               # header.njk, footer.njk
│   ├── css/                     # style.css
│   ├── scripts/                 # main.js, deploy.sh
│   ├── index.njk                # 首页
│   ├── about.njk                # 关于我们
│   ├── franchise.njk            # 招商加盟
│   ├── products.njk             # 产品介绍
│   └── contact.njk              # 联系我们
├── bojoo-online/                # 内部导航（bojoo.online）
│   ├── .eleventy.js
│   ├── package.json
│   ├── vercel.json              # Vercel host-based rewrite
│   ├── _includes/
│   ├── css/
│   ├── scripts/
│   ├── index.njk                # 聚合导航首页
│   ├── cost.njk                 # cost.bojoo.online
│   ├── review.njk               # review.bojoo.online
│   ├── social.njk               # social.bojoo.online
│   └── bi.njk                   # bi.bojoo.online
├── docs/                        # PRD / SPEC / Plan / 旧站分析
└── README.md
```

## 快速开始

### bojoo.cn — 对外官网

```bash
cd bojoo-cn
npm install
npm run dev      # 本地开发
npm run build    # 编译输出到 dist/
npm run deploy   # 一键部署到百度云
```

### bojoo.online — 内部导航

```bash
cd bojoo-online
npm install
npm run dev      # 本地开发
npm run build    # 编译输出到 dist/
```

## 部署

### bojoo.cn — 百度智能云

```bash
export BAIDU_IP=your_server_ip
export BAIDU_USER=root
cd bojoo-cn && npm run deploy
```

### bojoo.online — Vercel (MVP)

1. 连接 GitHub 仓库到 Vercel（项目根目录设为 `bojoo-online/`）
2. DNS 泛解析 `*.bojoo.online` → `cname.vercel-dns.com`
3. `vercel.json` 自动配置 host-based rewrite

## 技术栈

- **Eleventy (11ty)** — 静态站点生成器
- **Nunjucks** — 模板引擎
- **纯 CSS3 + Vanilla JS** — 无框架依赖
- **Vercel** — bojoo.online MVP 部署
- **Nginx + rsync** — bojoo.cn 生产部署

## 文档

- [Plan 1 — 总体规划](docs/plan1-enterprise-portal.md)
- [PRD — 产品需求](docs/prd-plan1-enterprise-portal.md)
- [SPEC — 技术规格](docs/spec-plan1-enterprise-portal.md)
- [子域名架构规划](docs/子域名架构规划.md)
- [旧站分析](docs/reference-old-site/旧站分析.md)
