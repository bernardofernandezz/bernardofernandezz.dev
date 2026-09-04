#!/usr/bin/env bash
#
# Pull latest code and restart the production service (run with sudo):
#   sudo bash deploy/update.sh
set -euo pipefail

APP_DIR="/srv/apps/portfolio/bernardofernandezz"
SERVICE_NAME="portfolio"

if [[ $EUID -ne 0 ]]; then
  echo "Run with sudo: sudo bash deploy/update.sh"
  exit 1
fi

cd "${APP_DIR}"
sudo -u bernardo git pull
sudo -u bernardo /home/bernardo/.bun/bin/bun install
sudo -u bernardo /home/bernardo/.bun/bin/bun run build
systemctl restart "${SERVICE_NAME}"
sleep 2
systemctl --no-pager status "${SERVICE_NAME}" | head -4
