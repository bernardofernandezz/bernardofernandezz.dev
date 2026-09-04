#!/usr/bin/env bash
#
# Server setup for the portfolio (run with sudo):
#   sudo bash deploy/setup-server.sh
#
# Idempotent: safe to run again after changing configs.
set -euo pipefail

APP_DIR="/srv/apps/portfolio/bernardofernandezz"
DOMAIN="bernardofernandezz.dev"
EMAIL="suporte@bernardofernandezz.dev"
SERVICE_NAME="portfolio"

if [[ $EUID -ne 0 ]]; then
  echo "Run with sudo: sudo bash deploy/setup-server.sh"
  exit 1
fi

echo "==> Installing nginx and certbot"
apt-get update -y
apt-get install -y nginx certbot python3-certbot-nginx

echo "==> Configuring nginx site for ${DOMAIN}"
cp "${APP_DIR}/deploy/nginx.conf" "/etc/nginx/sites-available/${DOMAIN}"
ln -sf "/etc/nginx/sites-available/${DOMAIN}" "/etc/nginx/sites-enabled/${DOMAIN}"
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl enable --now nginx
systemctl reload nginx

echo "==> Installing systemd service (${SERVICE_NAME})"
cp "${APP_DIR}/deploy/portfolio.service" "/etc/systemd/system/${SERVICE_NAME}.service"
systemctl daemon-reload
systemctl enable --now "${SERVICE_NAME}"

echo "==> Building production bundle"
sudo -u bernardo bash -c "cd ${APP_DIR} && /home/bernardo/.bun/bin/bun run build"

systemctl restart "${SERVICE_NAME}"
sleep 3
systemctl --no-pager status "${SERVICE_NAME}" | head -5

if command -v ufw > /dev/null && ufw status | grep -q "Status: active"; then
  echo "==> Opening firewall for HTTP/HTTPS"
  ufw allow 80/tcp
  ufw allow 443/tcp
fi

echo "==> Checking DNS for ${DOMAIN}"
SERVER_IP=$(curl -4 -s --max-time 10 ifconfig.me || true)
DOMAIN_IPS=$(getent ahostsv4 "${DOMAIN}" | awk '{print $1}' | sort -u | tr '\n' ' ')

if getent ahostsv4 "${DOMAIN}" | awk '{print $1}' | sort -u | grep -qx "${SERVER_IP}"; then
  echo "==> DNS OK — issuing Let's Encrypt certificate"
  certbot --nginx -d "${DOMAIN}" -d "www.${DOMAIN}" \
    --non-interactive --agree-tos -m "${EMAIL}" --redirect
  echo "==> Done: https://${DOMAIN}"
else
  echo ""
  echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
  echo "DNS for ${DOMAIN} points to ${DOMAIN_IPS:-nothing}, not this server (${SERVER_IP})."
  echo "Fix the A record at your registrar, then run:"
  echo "  sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} --redirect"
  echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
fi
