#!/usr/bin/env bash

set -euo pipefail

if command -v portless >/dev/null 2>&1; then
  exec portless "$@"
fi

NPM_ROOT="$(npm root -g 2>/dev/null || true)"
CANDIDATE="${NPM_ROOT}/portless/dist/cli.js"

if [ -f "$CANDIDATE" ]; then
  exec node "$CANDIDATE" "$@"
fi

echo "portless not found. Install it globally with: npm install -g portless" >&2
exit 1
