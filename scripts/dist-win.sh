#!/usr/bin/env bash
# Build the Windows installer + portable exe from Linux (npm run dist:win).
#
# Two cross-build wrinkles, both handled here:
#  - NSIS uninstaller generation runs the stub installer under WINE, so
#    electron-builder executes inside its official wine docker image
#    (electronuserland/builder:wine). The portable target doesn't need wine,
#    but building both in one place keeps this simple.
#  - @electron/rebuild can't cross-fetch native modules for another OS (it
#    silently keeps the Linux .node — the packaged app would crash on
#    Windows), so the better-sqlite3 win32-x64 prebuild is swapped in
#    explicitly first (npmRebuild is off in electron-builder.yml) and the
#    Linux build is restored afterwards, pass or fail.
set -euo pipefail
cd "$(dirname "$0")/.."

npm run build

ELECTRON_VERSION=$(node -p "require('electron/package.json').version")
echo "Swapping in better-sqlite3 win32-x64 prebuild (electron ${ELECTRON_VERSION})..."
(cd node_modules/better-sqlite3 &&
  npx prebuild-install -r electron -t "${ELECTRON_VERSION}" --platform=win32 --arch=x64)

restore() {
  echo "Restoring Linux better-sqlite3 build..."
  npm run rebuild
}
trap restore EXIT

# Cache mounts avoid re-downloading the Electron win32 zip + NSIS tools each
# run; the trailing chown hands root-created files back to the invoking user.
mkdir -p "$HOME/.cache/electron" "$HOME/.cache/electron-builder"
docker run --rm \
  -v "$PWD:/project" \
  -v "$HOME/.cache/electron:/root/.cache/electron" \
  -v "$HOME/.cache/electron-builder:/root/.cache/electron-builder" \
  electronuserland/builder:wine \
  bash -c "cd /project && npx electron-builder --win && \
           chown -R $(id -u):$(id -g) /project/dist /root/.cache/electron /root/.cache/electron-builder"
