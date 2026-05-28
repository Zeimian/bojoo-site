#!/bin/bash
# ============================================
# Bojoo Site — One-click deploy to Baidu Cloud
# ============================================
# Usage: bash scripts/deploy.sh
#
# Prerequisites:
#   1. SSH key configured for Baidu Cloud server
#   2. BAIDU_IP and BAIDU_USER env vars set
#   3. 11ty build completed (dist/ exists)
# ============================================

set -e

# ---- Configuration ----
BAIDU_IP="${BAIDU_IP:-YOUR_BAIDU_CLOUD_IP}"
BAIDU_USER="${BAIDU_USER:-root}"
REMOTE_DIR="/var/www/bojoo.cn"
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LOCAL_DIR="$PROJECT_DIR/dist"

# ---- Pre-flight checks ----
if [ "$BAIDU_IP" = "YOUR_BAIDU_CLOUD_IP" ]; then
  echo "ERROR: Please set BAIDU_IP environment variable"
  echo "  export BAIDU_IP=your_baidu_cloud_server_ip"
  exit 1
fi

if [ ! -d "$LOCAL_DIR" ]; then
  echo "ERROR: dist/ directory not found."
  echo "  Run: npm run build"
  exit 1
fi

# ---- Deploy ----
echo "Deploying to ${BAIDU_USER}@${BAIDU_IP}:${REMOTE_DIR}"
echo "Local:  $LOCAL_DIR"
echo ""

rsync -avz --delete \
  -e "ssh -o StrictHostKeyChecking=no" \
  "$LOCAL_DIR/" \
  "${BAIDU_USER}@${BAIDU_IP}:${REMOTE_DIR}/"

echo ""
echo "Deploy complete!"
echo "Visit: https://bojoo.cn"
