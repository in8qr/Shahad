#!/usr/bin/env bash
# Deploy static site on Linux (nginx). Run on your server after cloning the repo.
set -euo pipefail

SITE_DIR="${SITE_DIR:-/var/www/for-shahad}"
REPO_DIR="$(cd "$(dirname "$0")" && pwd)"

sudo mkdir -p "$SITE_DIR"
sudo cp -r "$REPO_DIR"/index.html "$REPO_DIR"/styles.css "$REPO_DIR"/fonts.css "$REPO_DIR"/script.js "$SITE_DIR"/
sudo cp -r "$REPO_DIR"/fonts "$SITE_DIR"/
sudo chown -R www-data:www-data "$SITE_DIR" 2>/dev/null || sudo chown -R nginx:nginx "$SITE_DIR" 2>/dev/null || true

echo "Files copied to $SITE_DIR"
echo "Point nginx root to $SITE_DIR (see README.md)."
