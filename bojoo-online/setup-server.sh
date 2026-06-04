#!/bin/bash
###############################################################################
# Bojoo Online — 服务器初始化 + SSL 证书签发
# 在服务器上执行：sudo ./setup-server.sh
###############################################################################

set -e

DOMAIN="bojoo.online"
WEB_DIR="/var/www/bojoo"

echo "🚀 [1/5] 更新系统..."
apt update && apt upgrade -y

echo "📦 [2/5] 安装 Nginx + Certbot..."
apt install -y nginx certbot python3-certbot-nginx curl rsync

echo "📁 [3/5] 创建网站目录结构..."
mkdir -p ${WEB_DIR}/{main,bi,cost,review,xhs,claw,docs-cost,docs-review,docs-social,zhuguang}
chown -R www-data:www-data ${WEB_DIR}
chmod -R 755 ${WEB_DIR}

echo "🔥 [4/5] 配置防火墙..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo "🔐 [5/5] 申请通配符 SSL 证书..."
echo "⚠️  接下来会要求你在 DNSPod 添加 TXT 记录，请按提示操作"
certbot certonly --manual --preferred-challenges dns \
  -d "${DOMAIN}" \
  -d "*.${DOMAIN}" \
  --email "your@email.com" \
  --agree-tos \
  --no-eff-email

# 设置自动续签
echo "0 3 1 * * certbot renew --quiet && systemctl reload nginx" >> /etc/crontab

echo "✅ 服务器初始化完成！"
echo ""
echo "📌 下一步："
echo "  1. 在本地执行 ./deploy.sh <服务器IP>"
echo "  2. 访问 https://bojoo.online 验证"
