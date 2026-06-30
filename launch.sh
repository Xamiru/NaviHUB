#!/usr/bin/env bash
# Launches the built NaviHUB desktop app (no dev server needed).
# Used by the desktop shortcut. Builds once if the output is missing.
set -e
cd "$(dirname "$(readlink -f "$0")")"

# VS Code / Electron-based parents export this and force Electron into Node mode;
# clear it so the GUI actually opens when launched from such a context.
unset ELECTRON_RUN_AS_NODE ELECTRON_NO_ATTACH_CONSOLE

# First run (or after `rm -rf out`): produce the production bundle.
if [ ! -f out/main/index.js ]; then
  npm run build
fi

exec ./node_modules/.bin/electron . --no-sandbox "$@"
