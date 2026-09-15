#!/usr/bin/env bash
# Build the Windows installer + portable exe from Linux (npm run dist:win).
#
# NSIS uninstaller generation runs the stub installer under WINE, so
#    electron-builder executes inside its official wine docker image
#    (electronuserland/builder:wine). The portable target doesn't need wine,
#    but building both in one place keeps this simple.
# better-sqlite3 13 bundles N-API binaries for both linux-x64 and win32-x64;
# electron-builder packages build/Release first, so expose the Windows binary
# there only for the duration of the container build.
set -euo pipefail
cd "$(dirname "$0")/.."

npm run build

# Cache mounts avoid re-downloading the Electron win32 zip + NSIS tools each
# run; the trailing chown hands root-created files back to the invoking user.
mkdir -p "$HOME/.cache/electron" "$HOME/.cache/electron-builder"
docker run --rm \
  -v "$PWD:/project" \
  -v "$HOME/.cache/electron:/root/.cache/electron" \
  -v "$HOME/.cache/electron-builder:/root/.cache/electron-builder" \
  electronuserland/builder:wine \
  bash -c '
    set -euo pipefail
    cd /project
    native=node_modules/better-sqlite3/build/Release/better_sqlite3.node
    windows_native=node_modules/better-sqlite3/prebuilds/win32-x64.node
    backup=/tmp/navihub-better_sqlite3-linux.node
    cp "$native" "$backup"
    restore_native() {
      cp "$backup" "$native"
      rm -f "$backup"
    }
    trap restore_native EXIT INT TERM
    cp "$windows_native" "$native"
    npx electron-builder --win
    restore_native
    trap - EXIT INT TERM
    chown -R '"$(id -u):$(id -g)"' /project/dist /root/.cache/electron /root/.cache/electron-builder
  '
