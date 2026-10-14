#!/usr/bin/env bash
set -euo pipefail
SITE_DIR="${1:-exampleSite}"
cd "$(dirname "$0")/.."
hugo -s "$SITE_DIR" --minify
if command -v pagefind >/dev/null 2>&1; then
  pagefind --site "$SITE_DIR/public"
elif command -v npx >/dev/null 2>&1; then
  npx --yes pagefind --site "$SITE_DIR/public"
else
  echo "Install pagefind: npm i -g pagefind  (or use npx)" >&2
  exit 1
fi
echo "OK: $SITE_DIR/public (with Pagefind index)"
