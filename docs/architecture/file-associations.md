# "Open with NaviHUB" — file associations

> Reference detail. The rules an agent must not break live in
> [CLAUDE.md](../../CLAUDE.md#hard-invariants) — this file is the "how and why" narrative.

**Covers** — the single-instance lock, argv intake, desktop registration, and ad-hoc book/manga/audio open tokens.

**Key files** — `src/main/openFile.ts`, `src/main/index.ts`, `electron-builder.yml:fileAssociations`, `scripts/install-desktop.sh`, `src/main/archive.ts`

**Tests** — `openFile`, `openToken`

---

## Supported formats

"Open with NaviHUB" accepts EPUB books, CBZ or explicitly supplied ZIP comic archives, and supported audio files. Video associations were removed with the internal video player on 2026-08-30. Video files should remain associated with VLC or another system player.

`application/zip` is deliberately unregistered because claiming it would put NaviHUB in every archive's context menu. A ZIP of images still opens when supplied explicitly. `tests/openFile.test.ts` pins that asymmetry and checks that every extension in `electron-builder.yml` is handled by `classifyPath`.

## OS delivery and the single instance

`app.requestSingleInstanceLock()` is a data-integrity requirement: the app owns one better-sqlite3 WAL connection plus process-lifetime handles and tokens. The losing process hands its argv to the existing instance and exits before database initialization.

Startup argv, `second-instance`, and macOS `open-file` all funnel into `queueOpen`. `parseArgvFiles` skips argv zero and every option-like argument, resolves relative paths against the launching process's working directory, and accepts only classified extensions.

`electron-builder.yml:fileAssociations` registers packaged builds. On Linux, `scripts/install-desktop.sh` writes the actual desktop entry with `%F`, the MIME list, and matching `StartupWMClass`. It is re-runnable and never calls `xdg-mime default`; NaviHUB is offered as an option without hijacking existing defaults.

The install script prefers a versionless `NaviHUB.AppImage` path because electron-updater can replace that path in place. A versioned AppImage filename may move on update and leave a desktop entry pointing at a deleted file.

## App-side queue and tokens

`classifyPath` returns `book | manga | audio`. `openTargetFor` registers an existing file under the process-lifetime `open/<token>` map and returns its route. The token keeps the original extension because archive discovery needs to identify the CBZ/EPUB segment.

There is no new push channel. `app:pendingOpen` returns and clears the queue, while `OpenFileHandler` polls on mount, focus, and a two-second backstop. Book and manga targets use the chromeless ad-hoc reader routes. Audio is handed to the global player with a `file-` track namespace so it cannot be logged as a music-library play. Nothing opened this way is scanned, attached, or persisted.
