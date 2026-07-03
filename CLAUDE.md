# NaviHUB

Personal, single-user, local-only Electron media hub: anime, manga, visual novels, games, movies/TV (MyAnimeList + Letterboxd style tracking with cross-linked voice actors/studios/characters), plus standalone sections for Japanese learning, a local manga reader, a song quiz, and a local music library. No server, no accounts — everything lives in `~/.config/navihub/`.

## Commands

```bash
npm run dev          # electron-vite dev — DO NOT run from VS Code's integrated terminal (see below)
npm run test         # vitest via ELECTRON_RUN_AS_NODE=1 electron (better-sqlite3 is built for Electron's ABI; plain `npx vitest` fails)
npm run typecheck    # tsc for both tsconfig.node.json and tsconfig.web.json
npm run build        # production build to out/ (the user's desktop shortcut runs this output — rebuild after changes they should see)
npm run db:generate  # drizzle-kit (rarely needed; runtime schema comes from init.sql)
npm run pack:linux   # electron-builder packaged build to dist/linux-unpacked (packaged-mode smoke test)
npm run dist:win     # Windows NSIS installer + portable exe to dist/ (see scripts/dist-win.sh)
npm run export:library  # sanitized shareable library bundle (see scripts/export-library.cjs)
```

**Packaging (2026-07):** electron-builder config in `electron-builder.yml`. Windows cross-builds have two traps, both handled by `scripts/dist-win.sh`: NSIS uninstaller generation needs wine (so electron-builder runs inside the `electronuserland/builder:wine` docker image), and `@electron/rebuild` can't cross-fetch native modules for another OS — it silently keeps the Linux `better_sqlite3.node` (so the script swaps in the win32-x64 prebuild first; `npmRebuild` is off in the yml). After any Windows build, verify with `file dist/win-unpacked/resources/app.asar.unpacked/node_modules/better-sqlite3/build/Release/better_sqlite3.node` → must say PE32+, not ELF. Two paths are asar-aware and must stay so: the kuromoji dict (tokenizer.ts, asarUnpack + `.replace('app.asar','app.asar.unpacked')`) and the window icon (index.ts, `process.resourcesPath` when packaged). `productName` lives ONLY in electron-builder.yml — adding it to package.json would change the userData folder name.

**Library export:** `scripts/export-library.cjs` snapshots the live DB, strips personal data via `scripts/sanitizeSql.cjs` (shared with tests/exportSanitize.test.ts — edit them together when tables gain personal columns), and stages `navihub.db` + `media/` + theme audio + README into `~/navihub-export/navihub-bundle`. New personal/tracking columns or tables MUST be added to sanitizeSql.cjs or they leak into exports.

**Terminal gotcha:** VS Code's integrated terminal sets `ELECTRON_RUN_AS_NODE=1`, which makes `npm run dev` silently run Electron as plain Node (no window). Launch the GUI from a normal terminal or the desktop shortcut, or `unset ELECTRON_RUN_AS_NODE` first.

**Git:** the user commits and pushes themselves. Never run git mutations; read-only status/log is fine.

## Architecture

electron-vite three-way split; path aliases `@shared` → `src/shared` (everywhere), `@` → `src/renderer/src` (renderer only).

- `src/main/` — all DB and filesystem work. Entry `index.ts` (window, `navimg://` protocol handler, before-quit hooks). Importers as one module per source (`anilist.ts`, `tmdb.ts`, `vndb.ts`, `rawg.ts`, `themes.ts`, `hltb.ts`). Feature modules (`manga.ts`, `music.ts`, `musicDownload.ts`, `musicArt.ts`, `mokuro.ts`, `jisho.ts`, `tokenizer.ts`). Queries in `repos/*.ts`.
- `src/preload/index.ts` — implements the `NaviApi` interface by forwarding every method to `ipcRenderer.invoke('domain:action', …)`.
- `src/renderer/src/` — React 18 + react-router v6 (HashRouter) + TanStack Query v5 + Tailwind (dark theme).
- `src/shared/` — `api.ts` (the typed `NaviApi` contract both preload and renderer import), `types.ts` (all IPC payload types), `mediaUrl.ts`, `srs.ts`.

### The IPC contract (follow this chain for ANY new backend capability)

1. Payload types in `src/shared/types.ts`.
2. Method signatures in the `NaviApi` group in `src/shared/api.ts`.
3. Thin `ipcMain.handle('domain:action', (_e, …) => repo.fn(…))` one-liners in `src/main/ipc.ts` (grouped by `// ---- domain ----` comments).
4. Mirror in `src/preload/index.ts`.
5. Renderer consumes via `api` (`lib/api.ts` = `window.api`) inside TanStack Query, keys from `lib/queryKeys.ts`.

Typecheck enforces preload/api agreement — if it passes, the contract is aligned.

**No push events exist** (no `ipcRenderer.on` bridge). Long-running main-process work (scans, downloads, art fetch) exposes a module-level status object behind a `domain:xStatus` invoke channel; the renderer polls it with `refetchInterval` while the operation's promise is pending. Keep this pattern. For **imports** specifically there's a shared global slot: `src/main/progress.ts` (`withActivity` wraps the import handlers in ipc.ts; `downloadImages` auto-reports per-image progress; importers mark `phase:'writing'` before their transaction) → polled via `activity:status` → `useActivity()`/`ActivityIndicator.tsx` (Topbar pill + ImportDialog bar). Instrument new importers the same way.

## Database

better-sqlite3 at `userData/navihub.db`. **Two schema files must be edited together:**

- `src/main/db/init.sql` — authoritative DDL, `CREATE TABLE IF NOT EXISTS`, runs on every startup.
- `src/main/db/schema.ts` — Drizzle mirror (types/drizzle-kit only; repos do NOT use the Drizzle query builder).

Repos use **raw prepared SQL** via `getSqlite()` from `db/connection.ts`. Columns added to an *existing* table also need an idempotent `ensureColumn` call in `runMigrations()` (connection.ts) — the live DB predates them; brand-new tables need nothing beyond init.sql. No FKs can be added by ALTER, so some link tables are deliberately FK-less (e.g. `list_item`, `jp_card.source_media_id`) — reads LEFT JOIN and tolerate deletion, and entity `remove()` fns clean up manually.

All media types share one `media_item` table keyed by a `media_type` text column. The cross-linking graph: `credit` (person ↔ media ↔ character), `media_company`, `media_character`, `tag`/`media_tag`, `media_relation`. Standalone sections have isolated tables (`jp_*`, `music_*`, `manga_chapter`, `list`/`list_item`, `theme_song`/`theme_artist`).

## Local files & images

Custom privileged `navimg://` protocol serves everything (images, audio, manga pages incl. streamed CBZ entries). DB stores **relative paths with virtual prefixes**; only `src/main/files.ts:absoluteMediaPath()` maps prefix → real dir (and blocks `..`):

- `media/…` → `userData/media` (downloaded covers, content-addressed `dl-<sha1(url)>` via `downloadImage`)
- `audio/…` → `audio.dir` setting (anime theme songs)
- `manga/…` → `manga.dir` setting
- `music/…` → `music.dir` setting

Renderer builds URLs synchronously with `mediaUrl(relPath)` (no per-image IPC); `<img>` onError handles missing files (`CoverImage.tsx`). Settings are rows in the `settings` table (`settingsRepo.get/set`), surfaced in `SettingsPage.tsx`.

## Adding features: two flavors

**A) New media type** (fits `media_item`): add to the `MediaType` union in shared/types.ts; create a `MediaConfig` in `src/renderer/src/lib/mediaConfig.ts` and append to `MEDIA_CONFIGS`; add the 4 routes in `App.tsx` pointing at the shared `MediaListPage`/`MediaDetailPage`/`MediaFormPage` with `cfg={…}`. Sidebar renders automatically from `MEDIA_CONFIGS`. Config flags drive everything: `castLayout`, `hasCrew`, `listTabs`, `hideFromSidebar`, `importSource`, `hasThemes`, `hasLocalReader`, etc. Optional importer: copy `rawg.ts` (smallest complete example — API key from settings, `fetchWithRetry` from `http.ts`, two-phase import).

**B) Standalone section** (Japanese/Music/Lists style): full vertical slice — tables (init.sql + schema.ts), repo, IPC block, api.ts group, preload mirror, pages + routes in App.tsx, hardcoded sidebar NavLink, `qk.<feature>` query keys, tests. `music_*` (2026-07) is the newest complete reference.

## Import conventions

- **Two-phase atomic**: ALL network work first (API calls + `downloadImages` batch prefetch), then ALL DB writes inside ONE `db.transaction()`. Upsert helpers are synchronous and take pre-downloaded image paths.
- Dedup by `(external_source, external_id)`. **Re-import is authoritative**: refreshes canonical fields, prunes removed children, but preserves personal tracking (status/score/progress) via COALESCE.
- **Re-import to apply**: changes to import logic/ordering only affect existing titles after the user re-imports them — always say so.
- `fetchWithRetry` (http.ts) handles 429/5xx **and applies a per-attempt timeout** (default 30s, `timeoutMs` option) so a stalled host can't hang an import + the activity pill. `downloadImage`/`downloadAudio` route through it; `downloadImages` runs a 5-worker pool (keep per-image `imageProgress` reporting intact). AnimeThemes needs a User-Agent header (403 otherwise); MusicBrainz-style 1 rps sources get their own throttle.
- yt-dlp args must keep the `--` before the user URL (option-injection guard, enforced by tests/musicDownload.test.ts).

## Renderer conventions

- Query keys ONLY from `lib/queryKeys.ts` (`qk`) — invalidation matches by key prefix, so each group's `all` key must remain a prefix of every key in the group.
- Mutations are plain `await api.…` in event handlers (NOT useMutation); errors surface via the global `unhandledrejection` → toast net in main.tsx. Query errors toast via `QueryCache.onError`.
- Page state that should survive Back: `usePersistedState(name, initial)` from `lib/navState.ts` (never plain useState for filters/search/tabs).
- Big lists: `useIncrementalList` (batch 96) + sentinel div. Search boxes: `useDebouncedValue` before driving queries.
- Tailwind component classes in `styles.css`: `.btn`, `.btn-primary`, `.btn-ghost`, `.btn-danger`, `.chip`, `.card`, `.input`, `.label`. Grid: `grid-cols-[repeat(auto-fill,minmax(150px,1fr))]`. Keyboard focus comes from ONE global `:focus-visible` accent-ring rule in styles.css — don't add per-component focus styles. `text-gray-600` is reserved for decorative/inactive markers; readable secondary copy uses `gray-400`+.
- Shared UI primitives (2026-07-04) — reuse before writing new ones: `Section` (uppercase-headed section, `subtitle`/`className` props), `StatTile`, `PageStatus` (page-level loading/not-found), `BackButton` (history-back, all music sub-pages), `SortableList`/`SortableRow`/`useOptimisticReorder` (drag-reorder w/ rollback — playlists + lists), `MusicEntityHeader` (album/artist hero), `playTracks()` in `lib/musicTracks.ts` (every music Play/Shuffle button). Icons are text glyphs (⌂ ♪ ⇄ ☰ ♫ あ ⚙), not emoji.
- Audio: one global `<audio>` in `lib/player.tsx` (`usePlayer()`); track id namespaces are load-bearing (`theme-<id>`, `quiz-<id>`, `music-<id>`). Music tracks must keep `mediaId: null` (NowPlayingBar links mediaId → anime detail).
- Music mutations invalidate the broad `qk.music.all` prefix ON PURPOSE — liked/cover state is denormalized into every track-returning query, and invalidation only refetches *mounted* queries, so narrowing buys ~nothing and risks stale UI.

## Tests

`tests/*.test.ts`, run with `npm run test`. Pattern: `createTestDb()` (tests/helpers.ts) builds an in-memory DB from the REAL init.sql; each file does `vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))` so repos run their actual SQL. Modules touching electron/fs mock `electron` and `../src/main/files` (see manga.test.ts, music.test.ts). Importer tests mock `http`/`files` with URL-keyed fixtures (rawgImport.test.ts). Design main-process logic with pure exported functions + injectable IO (e.g. the scanner's `TagReader`, yt-dlp's arg-builder) so tests never need real binaries/files. Test the real query, not a hand-written stand-in.

## Misc gotchas

- Right-click cut/copy/paste is a native menu built in `createWindow` (main/index.ts `context-menu` listener) — renderer has no context-menu code.

- `music-metadata` is ESM-only while the main bundle is CJS — it's loaded via lazy `await import()` in music.ts; don't convert to a top-level import.
- yt-dlp/ffmpeg are user-installed external binaries (settings `ytdlp.path`), never bundled.
- `scripts/bulk-import.cjs` duplicates the import pipeline (known debt) — changes to importers may need mirroring there.
- No ESLint config exists; eslint-disable comments are inert.
