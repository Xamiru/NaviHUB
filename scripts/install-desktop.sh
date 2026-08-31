#!/usr/bin/env bash
# Registers NaviHUB with the Linux desktop, so supported files offer
# "Open with NaviHUB" in the file manager's context menu.
#
# Usage:
#   bash scripts/install-desktop.sh                  # auto-detect what to launch
#   bash scripts/install-desktop.sh ~/Apps/NaviHUB.AppImage
#   bash scripts/install-desktop.sh /path/to/launch.sh
#
# Why a script rather than electron-builder: the fileAssociations in
# electron-builder.yml are baked into the AppImage's OWN .desktop, which never
# reaches the system unless the AppImage is desktop-integrated (appimaged /
# AppImageLauncher). This writes a real entry either way.
#
# Deliberately does NOT make NaviHUB the DEFAULT handler for anything. It only
# adds NaviHUB to the "Open with" list.
set -euo pipefail

REPO="$(cd "$(dirname "$(readlink -f "$0")")/.." && pwd)"
APPS_DIR="${XDG_DATA_HOME:-$HOME/.local/share}/applications"
ICONS_DIR="${XDG_DATA_HOME:-$HOME/.local/share}/icons/hicolor/512x512/apps"
ENTRY="$APPS_DIR/navihub.desktop"

# Keep in step with src/main/openFile.ts:classifyPath and the fileAssociations
# block in electron-builder.yml. tests/openFile.test.ts asserts the code and the
# electron-builder list agree; this list is the desktop-side mirror.
#
# Note what is NOT here: application/zip. NaviHUB can open a .zip of images, but
# claiming the generic zip type would put it in the "Open with" menu of every
# archive on the system, which is hostile. Explicitly picking NaviHUB still works.
MIMES=(
  application/epub+zip
  application/vnd.comicbook+zip application/x-cbz
  audio/mpeg audio/flac audio/x-flac audio/mp4 audio/aac
  audio/ogg audio/opus audio/x-wav audio/wav
)

# ---------------------------------------------------------------------------
# What should the entry launch?
# ---------------------------------------------------------------------------
TARGET="${1:-}"

if [ -z "$TARGET" ]; then
  # An installed AppImage wins over the dev checkout: it is the build that can
  # self-update, so it's the one in day-to-day use. People keep it anywhere, so
  # check the usual spots and then sweep $HOME shallowly rather than giving up
  # and silently falling back to the dev build.
  for dir in "$HOME/Applications" "$HOME/.local/bin" "$HOME/Apps" "$HOME/bin" \
             "$HOME/Downloads" "$HOME/Desktop" "$HOME/Documents" "/opt"; do
    [ -d "$dir" ] || continue
    found="$(find "$dir" -maxdepth 1 -iname '*navihub*.AppImage' -type f 2>/dev/null | sort | tail -1)"
    if [ -n "$found" ]; then TARGET="$found"; break; fi
  done
fi

if [ -z "$TARGET" ]; then
  # Bounded sweep: deep enough to find it in a subfolder, shallow enough not to
  # crawl a whole media library. -prune skips dotdirs (caches, trash, Steam).
  found="$(find "$HOME" -maxdepth 3 \( -name '.*' -prune \) -o \
           -iname '*navihub*.AppImage' -type f -print 2>/dev/null | sort | tail -1)"
  [ -n "$found" ] && TARGET="$found"
fi

if [ -z "$TARGET" ] && [ -f "$REPO/launch.sh" ]; then
  TARGET="$REPO/launch.sh"
  echo
  echo "WARNING: no AppImage found — falling back to the DEV launcher"
  echo "  $TARGET"
  echo "  That runs whatever is in $REPO/out, which is only as fresh as the last"
  echo "  'npm run build', and it CANNOT self-update (Settings → Updates is"
  echo "  disabled for unpackaged builds). If you normally run an AppImage, stop"
  echo "  and re-run with its path:"
  echo "      bash scripts/install-desktop.sh /path/to/NaviHUB.AppImage"
  echo
  read -r -p "Use the dev launcher anyway? [y/N] " reply
  [[ "$reply" =~ ^[Yy]$ ]] || exit 1
fi

if [ -z "$TARGET" ] || [ ! -e "$TARGET" ]; then
  echo "Could not find a NaviHUB to launch." >&2
  echo "Pass it explicitly:  bash scripts/install-desktop.sh /path/to/NaviHUB.AppImage" >&2
  exit 1
fi

TARGET="$(readlink -f "$TARGET")"
chmod +x "$TARGET" 2>/dev/null || true
echo "Launcher: $TARGET"

# ---------------------------------------------------------------------------
# The versioned-filename trap
# ---------------------------------------------------------------------------
# electron-updater's AppImageUpdater only overwrites the AppImage in place when
# its filename has NO version in it; otherwise it writes the new version's
# filename alongside and unlinks the old one. Our artifactName is
# "NaviHUB-${version}.AppImage", so a downloaded-as-is AppImage moves on EVERY
# update — and this .desktop, which hardcodes the path, would break each time.
BASE="$(basename "$TARGET")"
if [[ "$BASE" == *.AppImage ]] && [[ "$BASE" =~ [0-9]+\.[0-9]+\.[0-9]+ ]]; then
  STABLE="$(dirname "$TARGET")/NaviHUB.AppImage"
  echo
  echo "WARNING: '$BASE' has a version in its filename."
  echo "  electron-updater will write the NEXT version under a different name and"
  echo "  delete this one, so this desktop entry would stop working after the very"
  echo "  next update. Rename it once to a version-less name and updates will"
  echo "  overwrite it in place forever:"
  echo
  echo "      mv '$TARGET' '$STABLE'"
  echo "      bash scripts/install-desktop.sh '$STABLE'"
  echo
  read -r -p "Rename it for you now? [y/N] " reply
  if [[ "$reply" =~ ^[Yy]$ ]]; then
    mv -f "$TARGET" "$STABLE"
    TARGET="$STABLE"
    echo "Renamed → $TARGET"
    echo "NOTE: this entry is updated automatically, but any OTHER launcher you"
    echo "      have (a dock pin, a panel shortcut, a second .desktop) still"
    echo "      points at the old filename and must be repointed by hand."
  else
    echo "Left as-is — re-run this script after any update."
  fi
  echo
fi

# ---------------------------------------------------------------------------
# Write the entry
# ---------------------------------------------------------------------------
mkdir -p "$APPS_DIR" "$ICONS_DIR"

if [ -f "$REPO/assets/icon.png" ]; then
  cp -f "$REPO/assets/icon.png" "$ICONS_DIR/navihub.png"
fi

if [ -f "$ENTRY" ]; then
  cp -f "$ENTRY" "$ENTRY.bak"
  echo "Backed up existing entry → $ENTRY.bak"
fi

# %F (not %f): the file manager can hand over a multi-selection, and main queues
# every file it is given. StartupWMClass matches package.json `desktopName` +
# linux.syncDesktopName, so the running window groups under this launcher.
cat > "$ENTRY" <<EOF
[Desktop Entry]
Type=Application
Name=NaviHUB
Comment=Personal media hub — anime, manga, books, music and language learning
Exec="$TARGET" %F
Icon=navihub
Terminal=false
Categories=AudioVideo;Player;
StartupWMClass=navihub
MimeType=$(IFS=';'; echo "${MIMES[*]};")
EOF

chmod +x "$ENTRY"

command -v update-desktop-database >/dev/null 2>&1 && \
  update-desktop-database "$APPS_DIR" || true
command -v gtk-update-icon-cache >/dev/null 2>&1 && \
  gtk-update-icon-cache -f -t "${XDG_DATA_HOME:-$HOME/.local/share}/icons/hicolor" >/dev/null 2>&1 || true

echo "Installed $ENTRY"
echo "NaviHUB now appears under 'Open with' for EPUB, CBZ and audio files."
echo
echo "To make it the DEFAULT for a type (optional), e.g.:"
echo "  xdg-mime default navihub.desktop application/epub+zip"
