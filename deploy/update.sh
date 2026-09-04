#!/usr/bin/env bash
#
# Pull latest code and restart the production service.
# Runs as the "bernardo" user (called by GitHub Actions over SSH):
#   bash deploy/update.sh
#
# Requires the sudoers rule that allows passwordless restart:
#   bernardo ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart portfolio
set -euo pipefail

APP_DIR="/srv/apps/portfolio/bernardofernandezz"
SERVICE_NAME="portfolio"
HEALTH_URL="http://127.0.0.1:3000"

cd "${APP_DIR}"

echo "==> Pulling latest code"
git pull --ff-only

echo "==> Installing dependencies"
/home/bernardo/.bun/bin/bun install

echo "==> Building production bundle"
/home/bernardo/.bun/bin/bun run build

echo "==> Restarting service"
sudo -n systemctl restart "${SERVICE_NAME}"

echo "==> Health check"
for attempt in 1 2 3 4 5; do
  sleep 2
  if curl -sf --max-time 5 "${HEALTH_URL}" > /dev/null; then
    echo "OK: site is up after deploy."
    exit 0
  fi
done

echo "FAILED: service did not come back after deploy. Recent logs:"
journalctl -u "${SERVICE_NAME}" -n 30 --no-pager || true
exit 1
