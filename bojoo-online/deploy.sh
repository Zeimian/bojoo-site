#!/bin/bash
###############################################################################
# Bojoo Online — 一键部署到腾讯云轻量服务器
# 用法：./deploy.sh [server_ip] [ssh_user]
# 示例：./deploy.sh 1.2.3.4 root
###############################################################################

set -e

# ========== 配置区（按需修改）==========
SERVER_IP="${1:-your.server.ip}"
SSH_USER="${2:-root}"
REMOTE_DIR="/var/www/bojoo"
SSH_PORT="22"
DOMAIN="bojoo.online"

# 子域名映射（与 Nginx 配置保持一致）
declare -A SUBDOMAINS=(
  ["main"]="bojoo.online"
  ["bi"]="bi.bojoo.online"
  ["cost"]="cost.bojoo.online"
  ["review"]="review.bojoo.online"
  ["xhs"]="xhs.bojoo.online"
  ["claw"]="claw.bojoo.online"
  ["docs-cost"]="docs-cost.bojoo.online"
  ["docs-review"]="docs-review.bojoo.online"
  ["docs-social"]="docs-social.bojoo.online"
  ["zhuguang"]="zhuguang.bojoo.online"
)

# ========== 颜色输出 ==========
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

info() { echo -e "${GREEN}[INFO]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }

# ========== 1. 本地构建 ==========
info "🔨 [1/4] 本地构建 11ty 站点..."
if [ ! -d "node_modules" ]; then
  info "首次运行：安装依赖"
  npm install
fi
npm run build || error "构建失败"
[ -d "dist" ] || error "构建产物 dist/ 不存在"
info "✅ 构建完成，产物大小：$(du -sh dist | cut -f1)"

# ========== 2. 上传到服务器 ==========
info "📤 [2/4] 上传 dist/ 到服务器 ${SSH_USER}@${SERVER_IP}..."

# 确认 SSH 连接
ssh -p ${SSH_PORT} -o BatchMode=yes -o ConnectTimeout=10 ${SSH_USER}@${SERVER_IP} "echo '✅ SSH 连接正常'" \
  || error "无法连接服务器，请检查 IP/端口/SSH 密钥"

# 创建远程目录
ssh -p ${SSH_PORT} ${SSH_USER}@${SERVER_IP} "mkdir -p ${REMOTE_DIR}/{main,bi,cost,review,xhs,claw,docs-cost,docs-review,docs-social,zhuguang}"

# 使用 rsync 增量上传（推荐）
info "使用 rsync 增量同步..."
rsync -avz --delete \
  -e "ssh -p ${SSH_PORT}" \
  --exclude='.git' \
  --exclude='node_modules' \
  ./dist/ ${SSH_USER}@${SERVER_IP}:${REMOTE_DIR}/main/

# 复制 dist 各子目录到对应远程目录
for sub in bi cost review xhs claw docs-cost docs-review docs-social zhuguang; do
  if [ -d "dist/${sub}" ]; then
    rsync -avz --delete \
      -e "ssh -p ${SSH_PORT}" \
      ./dist/${sub}/ ${SSH_USER}@${SERVER_IP}:${REMOTE_DIR}/${sub}/
  fi
done

info "✅ 上传完成"

# ========== 3. 服务器端配置 ==========
info "⚙️  [3/4] 配置服务器 Nginx..."

# 上传 Nginx 配置（前提：本地有 nginx.conf 文件）
if [ -f "nginx.conf" ]; then
  rsync -avz -e "ssh -p ${SSH_PORT}" \
    ./nginx.conf ${SSH_USER}@${SERVER_IP}:/tmp/bojoo-nginx.conf
  ssh -p ${SSH_PORT} ${SSH_USER}@${SERVER_IP} << 'EOF'
sudo cp /tmp/bojoo-nginx.conf /etc/nginx/sites-available/bojoo
sudo ln -sf /etc/nginx/sites-available/bojoo /etc/nginx/sites-enabled/bojoo
sudo nginx -t && sudo systemctl reload nginx
EOF
  info "✅ Nginx 配置已更新"
else
  warn "未找到 nginx.conf，跳过 Nginx 配置"
fi

# ========== 4. 验证部署 ==========
info "🔍 [4/4] 验证部署..."
sleep 2

for sub in main bi cost review xhs claw; do
  if [ "${sub}" = "main" ]; then
    URL="https://${DOMAIN}/"
  else
    URL="https://${sub}.${DOMAIN}/"
  fi
  CODE=$(curl -sk -o /dev/null -w "%{http_code}" -m 10 ${URL} 2>/dev/null || echo "000")
  if [ "$CODE" = "200" ]; then
    echo -e "  ${GREEN}✅${NC} ${URL} → ${CODE}"
  else
    echo -e "  ${RED}❌${NC} ${URL} → ${CODE}"
  fi
done

info "🎉 部署完成！"
info "📌 下一步：登录服务器执行 ./setup-ssl.sh 申请 SSL 证书"
