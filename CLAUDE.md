# NaviHUB

Personal, single-user, local-only Electron media hub: anime, manga, visual novels, games, movies/TV, books (MyAnimeList + Letterboxd style tracking with cross-linked voice actors/studios/characters), plus standalone sections for Japanese learning, English learning, a programming learn section, a local manga/book reader, a local video player, a wrestling wiki, a gacha tracker, a song quiz, and a local music library. No server, no accounts — everything lives in `~/.config/navihub/`.

**This file is the contract.** It holds the rules, the conventions, and the things that break if you get them wrong. The per-subsystem "how and why" narrative lives in [`docs/architecture/`](docs/architecture/00-index.md) — read the one file for the area you are touching. Do not append feature write-ups here; that is what grew this file to 135 KB before it was split.

## Standing user directives

Rules the user has stated and had to re-state. Treat these as settled — do not relitigate them, and do not need to be told twice.

- **No emoji and no decorative glyphs, anywhere.** (2026-07-12, re-stated 08-01 and 08-06 — three rounds.) The user counts decorative unicode as emoji. Functional glyphs are fine: reader HUDs, `✕` close, ✓/○ state marks, ★ score/rarity, ♥ like toggles, `←` back, ▸/▾/› disclosure. Player transport must be SVG (`components/PlayerIcons.tsx`) — ⏮/⏭ render as blue Segoe UI Emoji pictures on Windows.
- **Git belongs to the user.** (2026-07-01: *"leave git to me from now on"*.) Never commit, push, branch, stage or revert. Read-only `status`/`log`/`diff` is fine.
- **No Indian movies or TV in bulk/top lists.** (2026-07-03, re-asked 08-12 after 40 days.) `EXCLUDED_ORIGINAL_LANGS` in `src/main/tmdb.ts` filters hi/ta/te/ml/kn/bn/mr/pa/gu out of every TMDB bulk list. Individual dialog imports are unaffected.
- **No anime or daily filler in TV bulk lists.** (2026-08-13.) TV bulk lists drop anime (Animation genre + `ja` original language — anime lives in the Anime section via AniList) and talk/news/soap shows (`without_genres` 10763/10766/10767, `TV_EXCLUDED_GENRE_IDS` in `src/main/tmdb.ts`). Movies and individual dialog imports unaffected.
- **Bulk previews contain only NEW titles.** (2026-08-13.) A top-100 preview is 100 titles not in the library — owned rows are skipped without consuming slots and the crawl tops up (`makeKeep` in `src/main/bulkImport.ts`). Don't reintroduce in-library rows into previews.
- **The Japanese section must work fully offline and be the user's only learning source.** (2026-07-27, re-stated 08-01.) No feature there may depend on a live network call at study time.
- **`npm run dist:win` is the user's job**, on their own machine. (2026-07-12.)
- **Never launch the GUI on the VPS.** (2026-07-25.) See the machine table below.

## How to work here

The user's own words, from a handoff prompt they wrote (2026-08-01), because it describes the loop they want better than a paraphrase would:

> Ask questions early (scope, sidebar shape, density preferences); don't drip-feed twenty tiny questions, and don't relitigate what CLAUDE.md records as decided… Write the plan, get my approval, then implement in shippable slices — typecheck after each, full tests + build at the end. Update CLAUDE.md's conventions for anything you add or change.

They grant broad design autonomy ("the floor is yours", "as you see fit") and send short continuations ("continue", "go ahead", "do the plan"). Long autonomous runs are expected and wanted; stopping early to ask a question that the code or this file already answers is the failure mode.

### Definition of done

`npm run typecheck` + `npm run test` green is **necessary, not sufficient**. Across 48 sessions, 13 opened with a defect the user found by using the app — blank screens, unclickable buttons, swapped labels, a back button that returned to the reader — none of which a unit test could see. There are no renderer tests at all (`vitest.config.ts` does not even match `.tsx`), so:

- **Backend-only change** — typecheck + tests is done.
- **Anything touching `src/renderer/`** — typecheck + tests, **and then either** drive the built app with the `verify` skill (laptop only) **or** say plainly, in the completion message, that the change is unverified in the UI and name what the user should click. Do not report a renderer change as working on the strength of a green test run.
- **Anything touching the schema or a migration** — see the `db-change` skill. Tests build from the *current* `init.sql`, so they structurally cannot catch a migration that breaks a pre-existing database. That class of bug has shipped and left the app unable to start.

## Machines

Two machines, different capabilities. Mixing them up has already produced a whole debugging session chasing a fix that existed only in the other working tree.

| | VPS — `/home/xamir/NaviHUB` | Laptop/PC — `/home/xamir/Desktop/NaviHUB` |
|---|---|---|
| Purpose | code changes only | running the app, all data work |
| Display | none (headless) | yes |
| Live DB `~/.config/navihub/` | no | **yes — the only copy** |
| yt-dlp / ffmpeg / docker | no | yes |
| Verification available | `npm run typecheck`, `npm run test` | those plus the real app |
| `verify` / `dist:win` / bulk imports | **never** | yes |

There is no sync channel between them (the LAN sync server was scrapped — see [`docs/architecture/removed.md`](docs/architecture/removed.md)), so two live DBs would diverge with no merge path. Delivery is: user commits and pushes → laptop pulls → `npm install` if the lockfile changed → `npm run build`.

Because there is no visual check on the VPS, **write or extend tests for anything you change there**, and say explicitly when something needs the user to eyeball it.

## Commands

```bash
npm run dev          # electron-vite dev — laptop only; DO NOT run from VS Code's integrated terminal
npm run test         # vitest via ELECTRON_RUN_AS_NODE=1 electron — NEVER `npx vitest` (better-sqlite3 is built for Electron's ABI)
npm run typecheck    # tsc for both tsconfig.node.json and tsconfig.web.json — NEVER `npx tsc`
npm run build        # production build to out/
npm run db:query     # read the live/any sqlite DB — THE way to inspect data (laptop; see scripts/db.cjs)
npm run db:generate  # drizzle-kit (rarely needed; runtime schema comes from init.sql)
npm run pack:linux   # electron-builder packaged build to dist/linux-unpacked (packaged-mode smoke test)
npm run dist:win     # Windows NSIS installer + portable exe — the USER runs this, not you
npm run export:library  # sanitized shareable library bundle (see scripts/export-library.cjs)
npm run install:desktop # register the .desktop entry + file associations (laptop)
```

`npm run test` takes ~80 s for 137 files / ~1,825 tests. Run the whole suite — it is short enough that filtering is rarely worth the risk of missing a regression.

**Terminal gotcha:** VS Code's integrated terminal sets `ELECTRON_RUN_AS_NODE=1`, which makes `npm run dev` silently run Electron as plain Node (no window). Launch the GUI from a normal terminal or the desktop shortcut, or `unset ELECTRON_RUN_AS_NODE` first.

## Architecture

electron-vite three-way split; path aliases `@shared` → `src/shared` (everywhere), `@` → `src/renderer/src` (renderer only).

- `src/main/` — all DB and filesystem work. Entry `index.ts` (window, `navimg://` protocol handler, before-quit hooks). Importers as one module per source (`anilist.ts`, `tmdb.ts`, `vndb.ts`, `rawg.ts`, `igdb.ts`, `steam.ts`, `themes.ts`, `hltb.ts`). Feature modules (`manga.ts`, `music.ts`, `musicDownload.ts`, `musicArt.ts`, `mokuro.ts`, `jisho.ts`, `tokenizer.ts`). Queries in `repos/*.ts`.
- `src/preload/index.ts` — implements the `NaviApi` interface by forwarding every method to `ipcRenderer.invoke('domain:action', …)`.
- `src/renderer/src/` — React 18 + react-router v6 (HashRouter) + TanStack Query v5 + Tailwind (dark theme).
- `src/shared/` — `api.ts` (the typed `NaviApi` contract both preload and renderer import), `types.ts` (all IPC payload types), `mediaUrl.ts`, `srs.ts`.

`src/main/repos/` holds 23 repos. The four that implement the cross-linking graph — the app's defining feature — are `peopleRepo.ts`, `characterRepo.ts`, `companyRepo.ts` and `linkRepo.ts`; `searchRepo.ts` is the sole backend for Ctrl+K and `/search`; `mappers.ts` is the shared row→object layer every other repo uses.

### The IPC contract (follow this chain for ANY new backend capability)

1. Payload types in `src/shared/types.ts`.
2. Method signatures in the `NaviApi` group in `src/shared/api.ts`.
3. Thin `ipcMain.handle('domain:action', (_e, …) => repo.fn(…))` one-liners in `src/main/ipc.ts` (grouped by `// ---- domain ----` comments).
4. Mirror in `src/preload/index.ts`.
5. Renderer consumes via `api` (`lib/api.ts` = `window.api`) inside TanStack Query, keys from `lib/queryKeys.ts`.

Typecheck enforces preload/api agreement — if it passes, the contract is aligned.

**Push events are frozen at exactly two channels** — `player:cmd` (main → main window: thumbbar/widget transport commands) and `player:state` (main → widget window: now-playing mirror), both owned by `src/main/playerBridge.ts`/`widget.ts` and locked by `tests/pushBridge.test.ts`, which fails on any new `webContents.send`/`ipcRenderer.on` channel. They exist because a remote pause button can't wait out a poll interval; nothing else qualifies. **Everything else polls.** Long-running main-process work (scans, downloads, art fetch) exposes a module-level status object behind a `domain:xStatus` invoke channel; the renderer polls it with `refetchInterval` while the operation's promise is pending. Keep this pattern. For **imports** specifically there's a shared global slot: `src/main/progress.ts` (`withActivity` wraps the import handlers in ipc.ts; `downloadImages` auto-reports per-image progress; importers mark `phase:'writing'` before their transaction) → polled via `activity:status` → `useActivity()`/`ActivityIndicator.tsx` (Topbar pill + ImportDialog bar). Instrument new importers the same way.

**All of that is now ALSO surfaced in one place** by the task registry (`src/main/tasks.ts` → `tasks:list` → `lib/useTasks.ts` → the Topbar pill + `/tasks`). It is a read-side **projection**: each subsystem keeps writing only its own status object and registers a pure `project()` that reads it — never a second push. Adding a long-running job means one `tasks.create({ kind, label, route, controls, project })` call (or `tasks.runTask()` for the awaited `{ running: boolean }` shape) beside the status object you already have, plus a `TaskKind` entry (guarded by `tests/taskKindSync.test.ts`). **`project()` returns `null` ONLY when a newer run has taken the module's slot** — that settles the row `cancelled: superseded by a newer run`; returning it for a run that is still going leaves an immortal `running` row that `prune()`/`clearFinished()` can never evict and that pins `useTasks` at its 700 ms poll. Do NOT migrate a feature's own `*Status` channel or panel into it — see [`docs/architecture/tasks-logs.md`](docs/architecture/tasks-logs.md) for why.

## Database

better-sqlite3 at `userData/navihub.db`. There are **three schema surfaces**, not one:

| Surface | DDL | Mirror / lifecycle | Guard |
|---|---|---|---|
| Main app DB | `src/main/db/init.sql` (60 tables) | `src/main/db/schema.ts` (Drizzle, types only) + `runMigrations()` in `db/connection.ts` | `tests/initLegacyDb.test.ts`, `tests/sanitizeCoverage.test.ts` |
| Dictionaries | `src/main/dict/init.sql` (29 tables) | `src/main/dict/dictDb.ts` DROP list + `sweepOrphans()` | `tests/dictSchemaSync.test.ts` |
| Games catalog | `src/main/gamesCatalogSchema.ts` | `gamesCatalogDb.ts`; script keeps its own copy | `tests/gamesCatalog.test.ts` |

- `src/main/db/init.sql` — authoritative DDL, `CREATE TABLE IF NOT EXISTS`, runs on every startup.
- `src/main/db/schema.ts` — Drizzle mirror (types/drizzle-kit only; repos do NOT use the Drizzle query builder).

Repos use **raw prepared SQL** via `getSqlite()` from `db/connection.ts`. Columns added to an *existing* table also need an idempotent `ensureColumn` call in `runMigrations()` (connection.ts) — the live DB predates them; brand-new tables need nothing beyond init.sql. **And any INDEX touching an ensureColumn'd column goes in runMigrations too, never init.sql** — init.sql runs first, so on a live pre-migration DB the index references a column that doesn't exist yet and the app dies at startup (the English-SRS release shipped exactly this; tests/initLegacyDb.test.ts replays it and drift-guards every index). No FKs can be added by ALTER, so some link tables are deliberately FK-less (e.g. `list_item`, `jp_card.source_media_id`) — reads LEFT JOIN and tolerate deletion, and entity `remove()` fns clean up manually.

All media types share one `media_item` table keyed by a `media_type` text column. The cross-linking graph: `credit` (person ↔ media ↔ character), `media_company`, `media_character`, `tag`/`media_tag`, `media_relation`. Standalone sections have isolated tables (`jp_*`, `music_*`, `manga_chapter`, `list`/`list_item`, `theme_song`/`theme_artist`).

## Local files & images

Custom privileged `navimg://` protocol serves everything (images, audio, manga pages incl. streamed CBZ entries, EPUB spine XHTML/images, video). DB stores **relative paths with virtual prefixes**; only `src/main/files.ts:absoluteMediaPath()` maps prefix → real dir (and blocks `..`). This table is the whole list — keep it complete when a root is added:

| Prefix | Resolves to |
|---|---|
| `media/…` | `userData/media` — downloaded covers, content-addressed `dl-<sha1(url)>` via `downloadImage` |
| `audio/…` | `audio.dir` setting — anime theme songs |
| `manga/…` | `manga.dir` setting |
| `books/…` | `books.dir` setting — local EPUBs (reuse the manga machinery) |
| `music/…` | `music.dir` setting |
| `pictures/…` | `pictures.dir` setting — wallpapers/fan art, human-readable layout, deliberately NOT content-addressed |
| `video/…` | `video.dir` setting — local episodes/films |
| `wrestling/…` | `wrestling.dir` setting — local PPV rips |
| `jpaudio/…` | always `userData` — mining clips, minimal pairs, Tatoeba audio |
| `videocache/…` | always `userData/videocache` — converted playback copies + extracted subtitle tracks |
| `open/<token>` | the ONE stateful branch — a process-lifetime `Map<token, absPath>` for "open any file" |

Renderer builds URLs synchronously with `mediaUrl(relPath)` (no per-image IPC); `<img>` onError handles missing files (`CoverImage.tsx`). Settings are rows in the `settings` table (`settingsRepo.get/set`), surfaced in `SettingsPage.tsx`.

## Adding features: three flavors

**A) New media type** (fits `media_item`): add to the `MediaType` union in shared/types.ts; create a `MediaConfig` in `src/renderer/src/lib/mediaConfig.ts` and append to `MEDIA_CONFIGS`; add the 4 routes in `App.tsx` pointing at the shared `MediaListPage`/`MediaDetailPage`/`MediaFormPage` with `cfg={…}`. `MediaDetailPage` is TABBED (2026-07-28): Overview / `castSectionTitle` / an optional media tab named by `cfg.mediaTabLabel` (Theme Songs / Chapters / Playtime — absent = no tab, movies/TV) / Art; `?tab=` deep-links a tab (the Comprehension page passes `?tab=media`); the action column has ONE `btn-primary` — log progress, or **Play** for a game/VN with a linked exe (`GameLaunchButton`, which also owns launching; `GameLaunchSection` on the Playtime tab has no Play of its own), in which case the log button drops to ghost — and Delete lives in the `ActionMenu`. Status/score/favorite are editable in place there too (`QuickEdit`), so `MediaFormPage` is the full editor rather than the only way in. Sidebar renders automatically from `MEDIA_CONFIGS`. Config flags drive everything: `castLayout`, `hasCrew`, `listTabs`, `hideFromSidebar`, `importSource`, `hasThemes`, `hasLocalReader`, etc. Optional importer: copy `rawg.ts` (smallest complete example — API key from settings, `fetchWithRetry` from `http.ts`, two-phase import).

**B) Standalone section** (Japanese/Music/Lists style): full vertical slice — tables (init.sql + schema.ts), repo, IPC block, api.ts group, preload mirror, pages + routes in App.tsx, hardcoded sidebar NavLink, `qk.<feature>` query keys, tests. `music_*` (2026-07) is the newest complete reference.

**C) Curated overlay** (Franchises, 2026-08): hardcoded content in a `src/shared/<feature>/` module (frozen id strings, one file per unit + an index catalog — the `wrestling.ts`/`programming/` pattern), matched client-side against an existing media type's list; no new tables, user state rides existing ones. `src/shared/franchises/` + [media-types.md](docs/architecture/media-types.md) "Franchises" is the reference — including the curated-remote-art cache (`franchiseArt.ts`) and the `media_image` kind `'background'` (franchise pages only, NOT the Art tab).

## Import conventions

- **Two-phase atomic**: ALL network work first (API calls + `downloadImages` batch prefetch), then ALL DB writes inside ONE `db.transaction()`. Upsert helpers are synchronous and take pre-downloaded image paths.
- Dedup by `(external_source, external_id)`. **Re-import is authoritative**: refreshes canonical fields, prunes removed children, but preserves personal tracking (status/score/progress) via COALESCE.
- **Re-import to apply**: changes to import logic/ordering only affect existing titles after the user re-imports them — always say so.
- `fetchWithRetry` (http.ts) handles 429/5xx **and applies a per-attempt timeout** (default 30s, `timeoutMs` option) so a stalled host can't hang an import + the activity pill. 429 waits are bounded by `MAX_RATE_LIMIT_WAITS` only and must NOT consume the 5xx/network retry budget (tests/http.test.ts). Callers pass `timeoutMs`, never a fixed `signal: AbortSignal.timeout(…)` — a caller signal wins over the per-attempt timeout and one deadline then spans every retry. `downloadImage`/`downloadAudio` route through it; `downloadImages` runs a 5-worker pool (keep per-image `imageProgress` reporting intact). AnimeThemes needs a User-Agent header (403 otherwise); MusicBrainz-style 1 rps sources get their own throttle.
- yt-dlp args must keep the `--` before the user URL (option-injection guard, enforced by tests/musicDownload.test.ts). ffmpeg has no `--`, so it uses `assertSafeArgPath` **and** a `file:` prefix on every path.
- **Copy `steam.ts`** as the importer template (smallest complete current example — keyless, two-phase, HLTB length) or `openlibrary.ts` (string ids, best-effort endpoints). **Not `rawg.ts`** — that API is dead; the file survives only so RAWG-era rows stay re-importable.

## Renderer conventions

- Query keys ONLY from `lib/queryKeys.ts` (`qk`) — invalidation matches by key prefix, so each group's `all` key must remain a prefix of every key in the group.
- Mutations are plain `await api.…` in event handlers (NOT useMutation); errors surface via the global `unhandledrejection` → toast net in main.tsx. Query errors toast via `QueryCache.onError`.
- Page state that should survive Back: `usePersistedState(name, initial)` from `lib/navState.ts` (never plain useState for filters/search/tabs).
- Big lists: `useIncrementalList` (batch 96) + sentinel div. Search boxes: `useDebouncedValue` before driving queries.
- Tailwind component classes in `styles.css`: `.btn`, `.btn-primary`, `.btn-ghost`, `.btn-danger`, `.chip`, `.card`, `.input`, `.label`, `.pill`/`.pill-active` (single-select/nav pills — THE active-pill look), `.chip-toggle`/`.chip-toggle-active` (square multi-select grids: kana rows, dojo forms), `.card-glow` (accent gradient card). NOTE: a class that `@apply`s `bg-accent` must set `color: rgb(var(--base-900))` itself — the global inverse-video selector only matches literal markup classes (`.pill-active` does this). Grid: `grid-cols-[repeat(auto-fill,minmax(150px,1fr))]`. Keyboard focus comes from ONE global `:focus-visible` accent-ring rule in styles.css — don't add per-component focus styles. `text-gray-600` is reserved for decorative/inactive markers; readable secondary copy uses `gray-400`+.
- Modals use `useDialog(onClose)` from `lib/hooks.ts` (Escape closes, focus in/out) + `role="dialog" aria-modal="true" tabIndex={-1}` on the panel; popovers just add an Escape case to their document-listener effect. Dialog conventions (unified 2026-08-01): overlay `z-50`, backdrop dismiss via `onMouseDown={(e) => e.target === e.currentTarget && onClose()}` on the overlay (never stopPropagation on the panel), close button is `✕` with `aria-label="Close"`. Icon-only glyph buttons carry `aria-label` mirroring their `title`.
- Command palette (`components/CommandPalette.tsx`): Ctrl/Cmd+K anywhere, `/` outside inputs; mounted ONLY in App's shell branch so the chromeless manga reader never sees it. Reuses `qk.search(q)` (shared cache with SearchPage).
- Audio: one global `<audio>` in `lib/player.tsx` (`usePlayer()`); track id namespaces are load-bearing (`theme-<id>`, `quiz-<id>`, `music-<id>`). **Every OS-facing metadata surface goes through `displayMeta()` in `lib/playerMeta.ts`** — mediaSession/SMTC, the `PlayerSnapshot` push, the thumbbar — which masks `quiz-` tracks ("Song Quiz", no artist/cover) so the OS overlay can never spoil an answer. The pop-out widget window (`#/widget`, `src/main/widget.ts`) renders `PlayerWidgetPage` ALONE via a `main.tsx` hash branch: no router, no query client, no second `AudioPlayerProvider`. Music tracks must keep `mediaId: null` (NowPlayingBar links mediaId → anime detail). Repeat modes (`off/all/one`): wrap logic must keep `queue.length > 1` guards so the quiz's single-track queue can't be skipped by OS media keys. Queue edits (`removeFromQueue`/`moveInQueue`) are only exposed on "Next up" rows — the playing index never shifts — and `originalOrderRef` is pruned by object identity (ids can repeat in a queue). Volume/repeat/shuffle persist in localStorage `player.prefs`; `stop()` deliberately does not persist its shuffle reset.
- Music mutations invalidate the broad `qk.music.all` prefix ON PURPOSE — liked/cover state is denormalized into every track-returning query, and invalidation only refetches *mounted* queries, so narrowing buys ~nothing and risks stale UI.
- Quiz pages (song + Japanese): 1-4 answer / Enter advance keydown effects; one `endGame()` funnel per page logs a `quiz_session` row (guarded by a `loggedRef`) and decides "new personal best" BEFORE invalidating `qk.quiz.history(kind)`.
- HomePage resolves per-type statuses positionally from settings via `statusesFrom` (lib/hooks.ts) — first = in-progress, second = completed, last = planned — so renamed statuses keep the Home strips working. Don't reintroduce `defaultStatuses[i]` lookups.
- Stats-page anchors must NOT use `href="#…"` (HashRouter eats them) — scroll imperatively (`scrollIntoView`).
- **After a save or delete, navigate with `replace: true`** so the mutated form/detail route leaves the history stack. Four separate bug reports came from this: Back returning to the edit page after saving, Back landing in the manga reader, Back needing two clicks, Back going to the wrong list after a delete.
- Shared UI primitives, the Lain theme and the dialog conventions are catalogued in [`docs/architecture/ui-conventions.md`](docs/architecture/ui-conventions.md) — **reuse before writing new ones**.

## Tests

`tests/*.test.ts`, run with `npm run test`. 137 files, ~1,825 `it()` blocks, ~80 s.

`tests/*.test.ts`, run with `npm run test`. Pattern: `createTestDb()` (tests/helpers.ts) builds an in-memory DB from the REAL init.sql; each file does `vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))` so repos run their actual SQL. Modules touching electron/fs mock `electron` and `../src/main/files` (see manga.test.ts, music.test.ts). Importer tests mock `http`/`files` with URL-keyed fixtures (rawgImport.test.ts). Design main-process logic with pure exported functions + injectable IO (e.g. the scanner's `TagReader`, yt-dlp's arg-builder) so tests never need real binaries/files. Test the real query, not a hand-written stand-in.

Conventions beyond that recipe:

- **Design for testability by splitting pure decisions from IO.** The established pairs are `updaterCore.ts`/`updater.ts`, `coachTools.ts`/`gachaCoach.ts`, `gameLaunchCore.ts`/`gameLaunch.ts`, and `video/playability.ts`/`video/ffmpeg.ts`. The pure half is tested exhaustively with no SDK, binary or electron import; the IO half is thin enough to read. Follow this for any new module that shells out or calls a network.
- **`.tsx` is not matched by `vitest.config.ts`** — there are no renderer tests at all. That is a deliberate current state, not an oversight to fix in passing, and it is why the definition of done above treats renderer changes differently.
- **Text-level cross-file guards are house style** when a contract is string-matched rather than typed: `dictSchemaSync`, `ipcContractSync`, `sanitizeCoverage`, `docsDrift`, `gamesCatalog`. Each reads two files as text and asserts their lists agree. Reach for this whenever you add a list that must mirror another.
- `tests/initLegacyDb.test.ts` replays a real pre-migration DB shape. Any migration work extends it.

## Hard invariants

Break one of these and something silently corrupts, leaks, or fails to start. They were previously scattered one-per-feature-story across 112 KB; this is the whole list.

### Files that must move together

| When you change… | You must also change… | Why |
|---|---|---|
| `src/main/db/init.sql` | `src/main/db/schema.ts` | Drizzle mirror; types drift otherwise |
| a column on an **existing** table | `ensureColumn(...)` in `runMigrations()` (`db/connection.ts`) | the live DB predates it. Brand-new tables need nothing |
| an index touching an `ensureColumn`'d column | put it in `runMigrations()`, **never `init.sql`** | init.sql runs first, so on a live pre-migration DB the index names a column that does not exist yet **and the app dies at startup**. This shipped once (the English-SRS release); `tests/initLegacyDb.test.ts` replays it |
| a table/column holding **personal data** | `scripts/sanitizeSql.cjs` (+ `tests/exportSanitize.test.ts`) | it leaks into shared exports otherwise. `tests/sanitizeCoverage.test.ts` now forces the decision |
| `src/shared/api.ts` | `src/preload/index.ts` | typecheck catches this pair |
| `ipcMain.handle` channel strings | the matching `invoke` string | **not** typechecked — string-matched. `tests/ipcContractSync.test.ts` guards it |
| `MediaConfig.unitProgress` | `UNIT_PROGRESS_TYPES` in `@shared/mediaProgress.ts` | main cannot import mediaConfig.ts |
| `SEASON_SQL` (`mediaRepo`) | `@shared/season.ts:seasonForItem` | two implementations of one rule |
| a new importer's rating key | `COMMUNITY_SQL` (`mediaRepo`) | otherwise the score never reaches the 0-100 scale |
| `src/main/dict/init.sql` | `dictDb.ts` DROP list **and** `sweepOrphans()` | guarded by `tests/dictSchemaSync.test.ts` |
| `src/main/gamesCatalogSchema.ts` | the embedded copy in `scripts/build-games-catalog.cjs` | guarded by `tests/gamesCatalog.test.ts` |
| `electron-builder.yml:fileAssociations` | `classifyPath` in `src/main/openFile.ts` | guarded by `tests/openFile.test.ts` |
| a `webContents.send` / `ipcRenderer.on` channel | `ALLOWED` in `tests/pushBridge.test.ts` | the push surface is deliberately frozen at `player:cmd` + `player:state`; everything else polls |
| an importer's logic or ordering | consider `scripts/bulk-import.cjs` | it duplicates the import pipeline (known debt) |
| a `TaskKind` literal passed to `tasks.create` | the `TaskKind` union in `shared/types.ts` | string-matched, **both directions** — guarded by `tests/taskKindSync.test.ts` |
| anything in `src/main/**` | it must not call `console.*` | there is no console in a packaged build; use `logInfo/logWarn/logError` from `logBus.ts`. Guarded by `tests/noConsole.test.ts` |

### The before-quit registry

`src/main/index.ts` — **twelve calls, and the order is load-bearing**:

```
settleAllTasksOnQuit
→ killActiveMusicDownload → abortActiveCoachTurn → killActiveUpdate → killActivePrepare
→ killActiveOcr → stopAchievementWatcher → finalizeActiveGameSession
→ closeDatabase → closeCatalogDb → closeDictDb
→ stopFileSink
```

`settleAllTasksOnQuit()` is **first**: it stamps every live task "cancelled (app quit)" before the killers below produce SIGKILL exit codes that the subsystems' own status objects would report as errors the user never caused. `stopFileSink()` is **last** and synchronous: every step above can log, and this is the flush that gets those lines onto disk.

`stopAchievementWatcher()` and `finalizeActiveGameSession()` **must precede** `closeDatabase()` — the first writes unlock rows (its final sweep of the emulator save file), the second writes the session row. `closeCatalogDb()`/`closeDictDb()` come **after**. Any new long-running main-process singleton adds its killer here. The game child is the one process deliberately *not* killed (spawned detached so the game outlives the app).

**`achievementWatcher.ts` owns the app's ONE main-side `setInterval`**, and it is bounded by a play session (started by `gameLaunch.startSession`, cleared by `endSession` + the quit killer above, `unref`'d so it can't hold the app open). It exists because the renderer cannot do this job: during a fullscreen game the renderer is occluded and its timers throttle, and it could not raise anything visible anyway. The OS notification comes from main via `new Notification(...)`, which is **not** `webContents.send` — the frozen push surface is untouched, and the renderer still polls `achievements:watchStatus` for its in-app toast. Do not take this as licence for a second interval; anything not tied to a live session still polls.

### Never do these

- **`window.confirm` / `alert` / `prompt`** — Electron renders them as native OS modals that steal keyboard focus, and on Linux the page often never gets it back. This is what the month-long "sometimes I can't type in the app" report was. Use `confirmDialog()` from `lib/confirm.ts`.
- **`dangerouslySetInnerHTML`** — markdown and EPUB content go through the parsers in `@shared/markdown.ts` / `BookContent`, which whitelist tags.
- **Emoji or decorative glyphs** — see Standing user directives.
- **`href="#…"`** — HashRouter eats it; scroll imperatively with `scrollIntoView`.
- **`npx vitest` / `npx tsc`** — better-sqlite3 is built for Electron's ABI. Use `npm run test` / `npm run typecheck`.
- **Query keys built inline** — only from `lib/queryKeys.ts` (`qk`), and each group's `all` key must stay a prefix of every key in that group or invalidation silently misses.
- **A caller-supplied `signal` on `fetchWithRetry`** — it wins over the per-attempt timeout, making one deadline span every retry. Pass `timeoutMs`.
- **`console.*` anywhere in `src/main`** — invisible in a packaged build, and it bypasses the log file the user can actually read. Use `logInfo`/`logWarn`/`logError` from `logBus.ts`; `tests/noConsole.test.ts` enforces it.
- **Importing electron from `logCore.ts` / `logBus.ts` / `tasks.ts` / `taskControls.ts` / `childLines.ts`** — `http.ts` and `db/connection.ts` log through `logBus`, and their tests run with no electron mock. One electron import there reddens a large share of the suite. `logFile.ts` is the deliberate exception.
- **`proc.kill('SIGSTOP')` without a platform gate** — Node has no signals on Windows, where that call IGNORES the name and **terminates the process**. Go through `processControls()` in `taskControls.ts`, which also sends SIGCONT before SIGTERM (a stopped process does not act on SIGTERM until continued).
- **`productName` in `package.json`** — it lives ONLY in `electron-builder.yml`; adding it changes the userData folder name and orphans the user's library.

### Process spawn safety

Every spawn uses an argv array. yt-dlp keeps `--` before the user URL. **ffmpeg has no `--` terminator**, so it uses `assertSafeArgPath` (absolute, not `-`-leading) *and* a `file:` prefix on every path — the latter is what `--` would not have fixed, since ffmpeg reads `foo:bar` as protocol `foo` (`re:zero 01.mkv`, any Windows `C:\`).

### Data-integrity rules that are easy to miss

- **`video:markWatched`'s `logProgress` call is guarded on `scope.id === 'video'`.** A wrestling row's owner is an EVENT id; logging it would silently advance whatever `media_item` shares that number.
- **`syncMediaProgress` returns early for `book` media** — books track pages, so finishing an EPUB volume must never slam `progress` down to a volume count.
- **`syncMediaProgress` is deliberately absent from the video path** — it floors progress at the highest watched episode number, which would undo a rewatch wrap the moment `logProgress` started one.
- **Scanners that prune by "not seen" need a zero-file guard** — `music.startScan` and `manga.rescan` refuse a zero-file walk when rows exist, so an unmounted drive cannot wipe playlists, likes and play history.
- **Music tracks keep `mediaId: null`** (NowPlayingBar links mediaId → anime detail), and player **track-id namespaces are load-bearing**: `theme-`, `quiz-`, `music-`, `tourney-`, `file-`.
- **HomePage/Seasonal media queries must stay byte-identical `{ mediaType }`** — they share one `qk.media.home` cache entry.
- **Wallhaven searches hardcode `purity=100` (SFW)** — regression-tested; do not parameterise it.
- **Re-import is authoritative**: it refreshes canonical fields and prunes removed children, but preserves personal tracking via COALESCE. Changes to import logic only affect existing titles after a re-import — **always tell the user that**.
- **A watermark is committed AFTER its write, never before** — `achievementWatcher.pollOnce` moves `lastMtimeMs` only once `insertUnlocks` returns, or a swallowed `SQLITE_BUSY` makes every later tick (and the final sweep) take the "nothing changed" short-circuit and lose those unlocks for the session.
- **`beginActivity`/`endActivity` callers pass their handle back** (`endActivity(err, own)`) — the activity slot is one global, and a dialog import started mid-run takes it. Settling "whatever is in the slot" marks a still-running import `done`.
- **A credential that is not a recognisable param name needs its own `redact()` rule** in `logCore.ts` — `http.ts` logs full URLs, and the log file is outside the export sanitizer. RetroAchievements' `z=`/`y=` is the host-scoped precedent.
- **Anything feeding a POSITIONAL file reads the provider's order** — `achievementRepo.listInProviderOrder`, not `listForMedia` (which sorts unlocked-first for the UI). The Goldberg config is a positional JSON array; UI order remaps every index and reshuffles on each new unlock.

### Frozen key strings

Stored in the DB, so renaming one orphans data: checklist `task_key`, gacha unit-kind and currency `key`s, programming course/lesson/sheet keys, bulk-import sort keys, `GachaGameCfg.catalog.source`, wrestling promotion ids, `achievement_game.provider` (`steam`/`ra`) and `achievement_unlock.source` (`emu`/`ra`/`manual`), and every `external_source` value.

## Known open issues

Written down because a vague report ("sometimes I can't type in the app") once sat undiagnosed for 33 days. Add to this list rather than letting a symptom live only in a chat log.

- **Native file/folder pickers may steal keyboard focus.** `dialog.showOpenDialog` in main is the same class of native modal as the `window.confirm` bug that was fixed on 2026-08-12, and none of the call sites passes the main window as a parent. **Unreproducible on the VPS** (no display) — if the user reports the typing bug again after 0.18.x, this is the first suspect.
- **Biased shuffles.** `.sort(() => Math.random() - 0.5)` with the answer at index 0 before shuffling; measured over 200k trials the correct option lands in slot 1 **35.8%** of the time and slot 3 **15.8%**. Still present at ~7 sites under `src/renderer/src/`.
- **Programming quiz answer-length tell** — the correct option is the strict longest of four in **169 of 219** questions (77%).
- **Search uses unescaped `LIKE '%q%'`** in `repos/searchRepo.ts` (4 queries) — `%` and `_` in a query are wildcards.

Fuller detail, with measurements, is in [`docs/review/`](docs/review/) — see [`docs/review/STATUS.md`](docs/review/STATUS.md) for what has already shipped.

## Misc gotchas

- Right-click cut/copy/paste is a native menu built in `createWindow` (main/index.ts `context-menu` listener) — renderer has no context-menu code.
- Destructive sync guards: `music.startScan` refuses a zero-file walk when `music_track` has rows (unmounted drive whose mountpoint still exists would otherwise wipe playlists/likes/play history — tests/music.test.ts regression); `manga.rescan` has the equivalent guard. Any new scanner that prunes by "not seen" needs the same check.
- `music-metadata` is ESM-only while the main bundle is CJS — it's loaded via lazy `await import()` in music.ts; don't convert to a top-level import.
- yt-dlp/ffmpeg are user-installed external binaries (settings `ytdlp.path`), never bundled.
- `scripts/bulk-import.cjs` duplicates the import pipeline (known debt) — changes to importers may need mirroring there.
- No ESLint config exists; eslint-disable comments are inert.
- The menu bar, Ctrl+wheel zoom and the `ui.scale` setting are described in [`docs/architecture/ui-conventions.md`](docs/architecture/ui-conventions.md).

## Reference index

Per-subsystem narrative lives in [`docs/architecture/`](docs/architecture/00-index.md). Read the one file for the area you are touching.

| Working on… | Read |
|---|---|
| A media type, wallpapers/fan art, books, game launch + playtime, achievements, seasonal, list filters | [media-types.md](docs/architecture/media-types.md) |
| A games importer (RAWG → IGDB → Steam history, offline catalog) | [importers.md](docs/architecture/importers.md) |
| Manga scanner, EPUB books, the readers, mokuro OCR | [readers.md](docs/architecture/readers.md) |
| The video player, ffmpeg, subtitles, subtitle mining | [video.md](docs/architecture/video.md) |
| "Open with NaviHUB", double-click handling, desktop registration | [file-associations.md](docs/architecture/file-associations.md) |
| Japanese — packs, drills, SRS, ghosts, i+1 feed, kana keyboard | [japanese.md](docs/architecture/japanese.md) |
| English — dictionaries, SRS, drills, writing feedback | [english.md](docs/architecture/english.md) |
| Programming — courses, cheatsheets, CLI drill | [programming.md](docs/architecture/programming.md) |
| Gacha, or the FGO Coach (the app's LLM feature) | [gacha-fgo.md](docs/architecture/gacha-fgo.md) |
| Wrestling — the Wikipedia importer, matches, local collection | [wrestling.md](docs/architecture/wrestling.md) |
| Torrent search, or the bulk importer | [torrents-bulk.md](docs/architecture/torrents-bulk.md) |
| Theme songs, music, the tournament bracket | [music-quiz.md](docs/architecture/music-quiz.md) |
| The checklist, streaks, progress logging | [checklist-progress.md](docs/architecture/checklist-progress.md) |
| The task registry, pause/cancel, the structured log, the Tools menu | [tasks-logs.md](docs/architecture/tasks-logs.md) |
| Shared UI components, the Lain theme, dialogs, menu bar, zoom | [ui-conventions.md](docs/architecture/ui-conventions.md) |
| Packaging, releases, in-app updates, library export | [packaging-ci-updates.md](docs/architecture/packaging-ci-updates.md) |
| Something that sounds like a feature request | [removed.md](docs/architecture/removed.md) — check it was not deliberately taken out |

**Skills** (`.claude/skills/`) encode the multi-step rituals: `add-ipc` (the 5-file contract chain), `db-change` (schema + migration + sanitize + tests), `verify` (drive the built app — laptop only), `local-release` (ship a release by hand when Actions cannot run), `wrap` (end-of-session chores + a handoff prompt).
