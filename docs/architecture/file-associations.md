# "Open with NaviHUB" — file associations

> Reference detail. The rules an agent must not break live in
> [CLAUDE.md](../../CLAUDE.md#hard-invariants) — this file is the "how and why" narrative.

**Covers** — the single-instance lock, the three argv intake points, desktop registration on two build types, the versioned-AppImage trap, and the ad-hoc open-token routes.

**Key files** — `src/main/openFile.ts`, `src/main/index.ts`, `electron-builder.yml:fileAssociations`, `scripts/install-desktop.sh`, `src/main/archive.ts`

**Tests** — `openFile`, `openToken`

---

## Overview

**"Open with NaviHUB" / file associations (2026-08-02)** — double-clicking a supported file (video, `.epub`, `.cbz`/`.zip`, audio) opens it in the running app. Two halves.

## The OS half

**The OS half.** `app.requestSingleInstanceLock()` in index.ts is the prerequisite, not politeness: the app is one better-sqlite3 WAL connection plus process-lifetime state (the video prepare session, the dict handle, the token map), and associations mean the OS relaunches the binary for *every* double-click. The loser hands its argv to the winner through `second-instance` and quits before `initDatabase()`. `mainWindow` is now a module-level ref so `receiveOpen` can restore/focus it. Three intake points, all funnelling into `queueOpen`: startup `process.argv` (cold start from a double-click), `second-instance` (`argv` + the launcher's `workingDirectory`, which is what makes a relative path resolvable), and macOS `open-file` (which can fire before `whenReady` — harmless, since queueing never touches the window). `parseArgvFiles` is pure and tested: argv[0] and every `-`-leading Chromium switch must never be read as a filename.

## Registration is in two places for two different builds

**Registration is in two places for two different builds.** `electron-builder.yml:fileAssociations` covers the packaged apps — but on Linux that only becomes `MimeType=` in the AppImage's OWN generated `.desktop`, which never reaches the system unless the AppImage is desktop-integrated (appimaged/AppImageLauncher). So `scripts/install-desktop.sh` (`npm run install:desktop`) writes a real entry: `Exec="<target>" %F` (**%F**, plural — a file manager can hand over a multi-selection), `StartupWMClass=navihub` to match `desktopName`, the MimeType list, the themed icon, `update-desktop-database`. It auto-detects an installed `*navihub*.AppImage` (the usual dirs, then a `-maxdepth 3` sweep of `$HOME` — preferred, because that's the build that can self-update) or takes the path as `$1`; falling back to the repo's `launch.sh` is possible but PROMPTS first, since that runs a possibly-stale `out/` and can't self-update, and silently choosing it looks exactly like the app downgrading itself. Re-runnable, backs up an existing entry, and deliberately does NOT `xdg-mime default` anything — it adds NaviHUB to "Open with", it doesn't hijack your video player.

## The versioned-AppImage trap

**The versioned-AppImage trap** (verified in `node_modules/electron-updater/out/AppImageUpdater.js`): `doInstall` overwrites `$APPIMAGE` in place ONLY when the existing basename has no `\d+\.\d+\.\d+` in it; otherwise it `mv`s the new version's filename alongside and unlinks the old one. Our `appImage.artifactName` is `${productName}-${version}.${ext}`, so an AppImage kept under its download name **moves on every update** and any `.desktop` hardcoding that path breaks each time. The install script detects this and offers to rename it to a version-less `NaviHUB.AppImage` once, after which updates overwrite in place forever. Renaming does NOT affect the updater's version check (that reads the embedded `app-update.yml` + `latest-linux.yml`, never the filename).

## application/zip is deliberately unregistered

**`application/zip` is deliberately unregistered** (claiming it would put NaviHUB in every archive's context menu) even though `.zip` opens fine when picked explicitly — `tests/openFile.test.ts` pins exactly that asymmetry, and also asserts every extension in electron-builder.yml is one `classifyPath` handles, so the two lists can't drift.

## The app half

**The app half.** `src/main/openFile.ts`: `classifyPath` (pure, extension-only) → `'video' | 'book' | 'manga' | 'audio'`, then `openTargetFor` mints a token and returns the route. **There is still no push channel** — the target is parked in a module-level queue and `app:pendingOpen` **returns AND clears** it (a peek-without-clear would reopen the same file every poll). `OpenFileHandler` is a headless component mounted in BOTH App branches (a file opened while you're inside a reader still has to land somewhere) that polls on mount, on `focus` — the real signal, since main raises the window first — and on a 2s backstop interval.

## Tokens keep the original extension

`registerOpenedVideo`/`videoopen/` generalized to **`registerOpenedFile`/`open/`**, and the token now **keeps the original extension** (`open/<hex>.cbz`). That is load-bearing, not cosmetic: `archive.ts:splitArchivePath` finds a container by scanning segments for a ziplike extension, so a bare hex token would make an ad-hoc CBZ/EPUB unstreamable. The navimg handler's archive branch is correspondingly widened from `manga/` to `manga/` or `open/`. Per format: video already had `/watch/adhoc/:token`; `manga.ts:adhocPages(token)` is `pages()` with the DB read swapped out (everything below it was already path-only) and feeds two new chromeless routes `/read/manga/:token` and `/read/book/:token`; audio needs no page at all — the handler builds a `Track` with a **pre-resolved `src`** (the SongQuizPage pattern, since there's no `music_track` row to resolve from) under a **`file-` id namespace deliberately NOT `music-`**, so `MusicPlayLogger` ignores it instead of logging a play against a random track id. Both readers now take their content from `lib/readerSource.ts:useReaderSource()`, which returns `chapterId`/`mediaId` 0 and a synthetic empty library for an ad-hoc file; progress saves guard on `chapterId > 0` and Back goes to `/` instead of a series page. Nothing about an opened file is scanned, attached or persisted.

