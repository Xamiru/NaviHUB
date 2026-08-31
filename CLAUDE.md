# NaviHUB

Personal, single-user, local-only Electron media hub: anime, manga, visual novels, games, movies/TV, books (MyAnimeList + Letterboxd style tracking with cross-linked voice actors/studios/characters), plus standalone sections for Japanese learning, English learning, a programming learn section, a local manga/book reader, linked local videos that open in the system player, a wrestling wiki, a gacha tracker, a song quiz, and a local music library. No server, no accounts — everything lives in `~/.config/navihub/`.

**This file is the contract.** It holds the rules, the conventions, and the things that break if you get them wrong. The per-subsystem "how and why" narrative lives in [`docs/architecture/`](docs/architecture/00-index.md) — read the one file for the area you are touching. Do not append feature write-ups here; that is what grew this file to 135 KB before it was split.

## Agent interoperability

- `CLAUDE.md` and `AGENTS.md` are byte-for-byte mirrors. Treat both as the same contract and apply every change to both files in the same edit. Legacy references to `CLAUDE.md` in this contract or a skill mean both files.
- Read `HANDOFF.md` when a session starts. Do not update it unless the user explicitly asks; durable rules stay in the mirrored contract and subsystem details stay in `docs/architecture/`.
- Work from the local checkout only. Normal model context processing is allowed, but do not use Codex cloud execution, hosted artifacts, or repository publishing. The existing Claude-account restriction below remains in force.

## Standing user directives

Rules the user has stated and had to re-state. Treat these as settled — do not relitigate them, and do not need to be told twice.

- **No emoji and no decorative glyphs, anywhere.** (2026-07-12, re-stated 08-01 and 08-06 — three rounds.) The user counts decorative unicode as emoji. Functional glyphs are fine: reader HUDs, `✕` close, ✓/○ state marks, ★ score/rarity, `←` back, ▸/▾/› disclosure. Like/favorite controls use the shared SVG `FavoriteButton`; player transport uses SVG from `components/PlayerIcons.tsx` — unicode hearts and ⏮/⏭ render inconsistently across platforms.
- **Git belongs to the user.** (2026-07-01: *"leave git to me from now on"*.) Never commit, push, branch, stage or revert. Read-only `status`/`log`/`diff` is fine.
- **No Indian movies or TV in bulk/top lists.** (2026-07-03, re-asked 08-12 after 40 days.) `EXCLUDED_ORIGINAL_LANGS` in `src/main/tmdb.ts` filters hi/ta/te/ml/kn/bn/mr/pa/gu out of every TMDB bulk list. Individual dialog imports are unaffected.
- **No anime or daily filler in TV bulk lists.** (2026-08-13.) TV bulk lists drop anime (Animation genre + `ja` original language — anime lives in the Anime section via AniList) and talk/news/soap shows (`without_genres` 10763/10766/10767, `TV_EXCLUDED_GENRE_IDS` in `src/main/tmdb.ts`). Movies and individual dialog imports unaffected.
- **Bulk previews contain only NEW titles.** (2026-08-13.) A top-100 preview is 100 titles not in the library — owned rows are skipped without consuming slots and the crawl tops up (`makeKeep` in `src/main/bulkImport.ts`). Don't reintroduce in-library rows into previews.
- **The Japanese section must work fully offline and be the user's only learning source.** (2026-07-27, re-stated 08-01.) No feature there may depend on a live network call at study time.
- **The Data Science and Engineering programming course must be self-contained and sufficient as the user's only learning source.** (2026-08-30.) It may name optional tools, but it must teach every required Python/SQL/math prerequisite, include guided practice with worked solutions, and carry the learner from first principles through production data science, engineering, operations and capstones without sending them to external study material.
- **The DevOps Engineering programming course must be self-contained and sufficient as the user's only learning source.** (2026-08-30.) It may name implementation tools, but it must teach the underlying Linux, networking, delivery, cloud, infrastructure, Kubernetes, observability, reliability, security and platform-engineering concepts, include guided practice with worked solutions, and carry the learner from first principles through production capstones without requiring external lessons.
- **The Cybersecurity, Full-Stack Web, Backend and Distributed Systems, Computer Systems and C, Database Engineering, and AI and LLM Engineering programming courses must be self-contained and sufficient as the user's only learning sources.** (2026-08-30.) Every path must work fully offline, teach its prerequisites and engineering judgment from first principles, include guided practice, worked solutions, mastery standards and assessed capstones, and require no external course, account, documentation or live service at study time.
- **`npm run dist:win` is the user's job**, on their own machine. (2026-07-12.)
- **Never launch the GUI on the VPS.** (2026-07-25.) See the machine table below.
- **Home's cover-wall hero stays.** (2026-08-16, unprompted: *"keep that background that have mixed media pictures in it. i like it"*.) The tilted wall of the user's own covers behind the brand is Home's identity, NOT a widget — it is pinned above the configurable widgets and is deliberately absent from the Customise dialog.
- **Nothing from this repo goes to the Claude account.** (2026-08-15.) No Artifact publishing, no Claude Design / DesignSync, no upload of code, mockups, docs or data to claude.ai hosting. UI previews are local files (`previews/`, gitignored — the `ui-preview` skill) that the user opens themselves. Local tools and the user's own git remote are the only places repo content may go.
- **UI previews and HANDOFF updates happen only when the user asks.** (2026-08-24.) Do not invoke the `ui-preview` workflow proactively, even for a large renderer change, and do not update `HANDOFF.md` at milestones or session end unless explicitly requested.

## How to work here

The user's own words, from a handoff prompt they wrote (2026-08-01), because it describes the loop they want better than a paraphrase would:

> Ask questions early (scope, sidebar shape, density preferences); don't drip-feed twenty tiny questions, and don't relitigate what CLAUDE.md records as decided… Write the plan, get my approval, then implement in shippable slices — typecheck after each, full tests + build at the end. Update CLAUDE.md's conventions for anything you add or change.

They grant broad design autonomy ("the floor is yours", "as you see fit") and send short continuations ("continue", "go ahead", "do the plan"). Long autonomous runs are expected and wanted; stopping early to ask a question that the code or this file already answers is the failure mode.

### Definition of done

`npm run typecheck` + `npm run test` green is **necessary, not sufficient**. Across 48 sessions, 13 opened with a defect the user found by using the app — blank screens, unclickable buttons, swapped labels, a back button that returned to the reader — none of which a unit test could see. There are no renderer tests at all (`vitest.config.ts` does not even match `.tsx`), so:

- **Backend-only change** — typecheck + tests is done.
- **Anything touching `src/renderer/`** — typecheck + tests, **and then either** drive the built app with the `verify` skill (laptop only) **or** say plainly, in the completion message, that the change is unverified in the UI and name what the user should click. Do not report a renderer change as working on the strength of a green test run. Use `ui-preview` only when the user explicitly requests it; a preview is design sign-off, not verification.
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

**Heavy IPC implementations stay lazy.** Channel registration itself remains synchronous, but handlers for large offline content modules load their implementation with cached `import()` on first use. In particular, `ipc.ts` and `sqlSandbox.ts` must not statically import `repos/programmingRepo` (it pulls the full course catalog into launch), `ipc.ts` must not statically import `englishWriting`, and both `ipc.ts` and `achievementWatcher.ts` defer `retroAchievements` until an RA action/session actually needs it. `tests/performanceBoundaries.test.ts` guards these seams. Startup-owned status/task modules, recovery initializers and before-quit dependencies remain eager.

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
| `football/…` | `football.dir` setting — local clips, highlights, full matches, interviews and documentaries |
| `jpaudio/…` | always `userData` — mining clips, minimal pairs, Tatoeba audio |
| `videocache/…` | always `userData/videocache` — extracted subtitle tracks + legacy converted copies |
| `thumb/<w>/…` | generated cover thumbnails (`userData/thumbs`, `src/main/thumbs.ts`) — disk-cached downscaled JPEG of a stored image, built on first request; small cover slots use `CoverImage thumbWidth` so grids don't decode full-resolution sources. Missing/undecodable source 404s and the `<img>` falls back to the original |
| `open/<token>` | the ONE stateful branch — a process-lifetime `Map<token, absPath>` for "open any file" |

`slideshow.dir` (default `<pictures.dir>/Slideshow`) is deliberately **absent from that table**: it holds flat COPIES of Art-tab images for the Windows desktop slideshow and nothing in the app ever displays them, so it needs no prefix and no `absoluteMediaPath` branch.

Renderer builds URLs synchronously with `mediaUrl(relPath)` (no per-image IPC); `<img>` onError handles missing files (`CoverImage.tsx`). Settings are rows in the `settings` table (`settingsRepo.get/set`), surfaced in `SettingsPage.tsx`.

## Adding features: three flavors

**A) New media type** (fits `media_item`): add to the `MediaType` union in shared/types.ts; create a `MediaConfig` in `src/renderer/src/lib/mediaConfig.ts` and append to `MEDIA_CONFIGS`; add the 4 routes in `App.tsx` pointing at the shared `MediaListPage`/`MediaDetailPage`/`MediaFormPage` with `cfg={…}`. `MediaDetailPage` is TABBED (2026-07-28): Overview / `castSectionTitle` / an optional media tab named by `cfg.mediaTabLabel` (Theme Songs / Chapters / Volumes / Playtime / **Seasons** — absent = no tab, movies) / Art; `?tab=` deep-links a tab (the Comprehension page passes `?tab=media`); the action column has ONE `btn-primary` — log progress, or **Play** for a game/VN with a linked exe (`GameLaunchButton`, which also owns launching; `GameLaunchSection` on the Playtime tab has no Play of its own), in which case the log button drops to ghost — and Delete lives in the `ActionMenu`. Status/score/favorite are editable in place there too (`QuickEdit`), so `MediaFormPage` is the full editor rather than the only way in. The HEADER is art-led where `cfg.detailHero` says so (2026-08-15, `components/MediaHero.tsx`): `'banner'` hangs the cover off a 220px strip of wide art (anime, VNs), `'backdrop'` puts title + actions on a 420px still when configured, absent = the plain two-column header (manga/books/games/movies/TV, whose detail page is carried by a data tab where appropriate). Hero art is `MediaDetail.heroPath`, resolved in `mediaRepo.get`: `media_item.banner_path` (AniList `bannerImage` / TMDB backdrop, populated only by a RE-IMPORT) → the first Art-tab image, fan art before wallpapers → null, at which point the hero blurs the cover. Do not re-derive that order in the renderer. The Archive Broadcast library drawer reads `MEDIA_CONFIGS` through `lib/adaptiveNav.ts`; add any special contextual tab there too. Config flags drive everything: `castLayout`, `hasCrew`, `listTabs`, `hideFromSidebar`, `importSource`, `hasThemes`, `hasLocalReader`, etc. Optional importer: copy `rawg.ts` (smallest complete example — API key from settings, `fetchWithRetry` from `http.ts`, two-phase import).

**B) Standalone section** (Japanese/Music/Lists style): full vertical slice — tables (init.sql + schema.ts), repo, IPC block, api.ts group, preload mirror, pages + routes in App.tsx, drawer + contextual entries in `lib/adaptiveNav.ts`, `qk.<feature>` query keys, tests. `music_*` (2026-07) is the newest complete reference.

**C) Curated overlay** (Franchises, 2026-08): hardcoded content in a `src/shared/<feature>/` module (frozen id strings, one file per unit + an index catalog — the `wrestling.ts`/`programming/` pattern), matched client-side against an existing media type's list; no new tables, user state rides existing ones (a settings row per franchise for the user's background). `src/shared/franchises/` + [media-types.md](docs/architecture/media-types.md) "Franchises" is the reference — including the curated-remote-art cache (`franchiseArt.ts`), the viewport-pinned page background (`FranchiseBackground.tsx`, `background-attachment: fixed`) and the FLIP re-sort hook (`lib/useFlip.ts`). Per-entry `bgUrl` is still RESERVED (unused). The per-media background SHIPPED 2026-08-17: `media_image.is_background` → `MediaDetail.backgroundPath`, painted by that same `FranchiseBackground.tsx` on EVERY detail page, set by right-clicking an Art-tab image — see [media-types.md](docs/architecture/media-types.md) "Right-click on an Art-tab tile".

## Import conventions

- **Two-phase atomic**: ALL network work first (API calls + `downloadImages` batch prefetch), then ALL DB writes inside ONE `db.transaction()`. Upsert helpers are synchronous and take pre-downloaded image paths.
- Dedup by `(external_source, external_id)`. **Re-import is authoritative**: refreshes canonical fields, prunes removed children, but preserves personal tracking (status/score/progress) via COALESCE.
- **Re-import to apply**: changes to import logic/ordering only affect existing titles after the user re-imports them — always say so.
- `fetchWithRetry` (http.ts) handles 429/5xx **and applies a per-attempt timeout** (default 30s, `timeoutMs` option) so a stalled host can't hang an import + the activity pill. 429 waits are bounded by `MAX_RATE_LIMIT_WAITS` only and must NOT consume the 5xx/network retry budget (tests/http.test.ts). Callers pass `timeoutMs`, never a fixed `signal: AbortSignal.timeout(…)`; task cancellation is the internal `taskSignal`, composed with a fresh timeout on every attempt and inherited from `withActivity` through `AsyncLocalStorage`. `downloadImage`/`downloadAudio` route through it; `downloadImages` runs a 5-worker pool (keep per-image `imageProgress` reporting intact). AnimeThemes needs a User-Agent header (403 otherwise); MusicBrainz-style 1 rps sources get their own throttle.
- yt-dlp args must keep the `--` before the user URL (option-injection guard, enforced by tests/musicDownload.test.ts). ffmpeg has no `--`, so it uses `assertSafeArgPath` **and** a `file:` prefix on every path.
- **Copy `steam.ts`** as the importer template (smallest complete current example — keyless, two-phase, HLTB length) or `openlibrary.ts` (string ids, best-effort endpoints). **Not `rawg.ts`** — that API is dead; the file survives only so RAWG-era rows stay re-importable.

## Renderer conventions

- Query keys ONLY from `lib/queryKeys.ts` (`qk`) — invalidation matches by key prefix, so each group's `all` key must remain a prefix of every key in the group.
- Mutations are plain `await api.…` in event handlers (NOT useMutation); errors surface via the global `unhandledrejection` → toast net in main.tsx. Query errors toast via `QueryCache.onError`.
- Page state that should survive Back: `usePersistedState(name, initial)` from `lib/navState.ts` (never plain useState for filters/search/tabs). It is scoped to the history entry, so it resets on a fresh visit — a choice that should outlive the visit is a **localStorage pref** instead (`keyboardPrefs.ts` and `lib/listSortPrefs.ts`, which remembers the library sort + direction per media type; seed the `usePersistedState` initial from the pref inside a `useState` initializer so the first render already issues the right query).
- Big lists: `useIncrementalList` (batch 96) + sentinel div. Search boxes: `useDebouncedValue` before driving queries.
- Launch boundary: `main.tsx` lazily selects `MainAppRoot`, `PlayerWidgetPage` or `AchPopupPage`, so satellite windows never parse the application shell. Inside `App.tsx`, only Home and shared chrome are eager; every secondary route is a `lazy()` import behind the shared Suspense fallback. Never import a page module from another page to share a constant — move shared values to `lib/` or it silently collapses the route split. `tests/performanceBoundaries.test.ts` guards the core boundary.
- Tailwind component classes in `styles.css`: `.btn`, `.btn-primary`, `.btn-ghost`, `.btn-danger`, `.chip`, `.card`, `.input`, `.label`, `.pill`/`.pill-active` (single-select/nav pills — THE active-pill look), `.chip-toggle`/`.chip-toggle-active` (square multi-select grids: kana rows, dojo forms), `.card-glow` (accent gradient card). NOTE: a class that `@apply`s `bg-accent` must set `color: rgb(var(--base-900))` itself — the global inverse-video selector only matches literal markup classes (`.pill-active` does this). Grid: `grid-cols-[repeat(auto-fill,minmax(150px,1fr))]`. Keyboard focus comes from ONE global `:focus-visible` accent-ring rule in styles.css — don't add per-component focus styles. `text-gray-600` is reserved for decorative/inactive markers; readable secondary copy uses `gray-400`+.
- Archive Broadcast chrome is data-driven: `lib/adaptiveNav.ts` owns rail-area classification, drawer destinations and contextual Topbar tabs. Do not hardcode route models separately in `Sidebar.tsx` or `Topbar.tsx`; update `tests/adaptiveNav.test.ts` with the model. `sidebar.hidden` filters both chrome surfaces but never kills routes. System is the single footer rail for Tasks, Logs, Bulk Import, Torrents and Settings; the Topbar owns their shared contextual navigation. Optional context sidecars disappear below `lg`; `StudySessionFrame` evidence rails are the exception because they may contain instructions, so they collapse into a `<details>` disclosure instead. Immersive study/transcript panels cap at `44vw`, and Home's pinned cover wall always leads with a real resume point before its configurable widgets.
- App themes are persisted by `ui.theme`: `src/shared/appTheme.ts` owns the frozen `lain` / `metal-gear` values and launch fills, while `renderer/lib/theme.ts` mirrors the value to localStorage only for a flash-free pre-React stamp. Lain remains the default; Metal Gear is an original tactical interpretation, never copied logos, characters or game screens. Both themes consume the semantic Tailwind roles (`surface-*`, `ink-*`, `line-*`, `signal-live/link/affirmative/caution/anomaly`); theme palette changes belong in `styles.css`, not component literals.
- Surface intensity is route-driven through the pure `lib/surfaceMood.ts` classifier (`cinematic | standard | quiet | immersive`). Lain additionally has the persisted `ui.signalClarity` choice (`clean | broadcast | deep`); it does not affect other themes. Atmosphere stays in shell background layers, never overlays above text, dialogs or media art, and quiet routes suppress it. Selection-driven context panels pass a real entity identity through `ContextPanel` to `SignalResolve`; its CSS-only transition never delays data or navigation and always honors reduced motion.
- Modals use `useDialog(onClose)` from `lib/hooks.ts` (Escape closes, focus in/out) + `role="dialog" aria-modal="true" tabIndex={-1}` on the panel; popovers just add an Escape case to their document-listener effect. Dialog conventions (unified 2026-08-01): overlay `z-50`, backdrop dismiss via `onMouseDown={(e) => e.target === e.currentTarget && onClose()}` on the overlay (never stopPropagation on the panel), close button is `✕` with `aria-label="Close"`. Icon-only glyph buttons carry `aria-label` mirroring their `title`.
- Command palette (`components/CommandPalette.tsx`): Ctrl/Cmd+K anywhere, `/` outside inputs; mounted ONLY in App's shell branch so the chromeless manga reader never sees it. Reuses `qk.search(q)` (shared cache with SearchPage).
- Audio: one global `<audio>` in `lib/player.tsx` (`usePlayer()`); track id namespaces are load-bearing (`theme-<id>`, `quiz-<id>`, `music-<id>`). **Every OS-facing metadata surface goes through `displayMeta()` in `lib/playerMeta.ts`** — mediaSession/SMTC, the `PlayerSnapshot` push, the thumbbar — which masks `quiz-` tracks ("Song Quiz", no artist/cover) so the OS overlay can never spoil an answer. The pop-out widget window (`#/widget`, `src/main/widget.ts`) renders `PlayerWidgetPage` ALONE via a `main.tsx` hash branch: no router, no query client, no second `AudioPlayerProvider`; its fixed `480×60` geometry comes from `widgetCore.ts`. Music tracks must keep `mediaId: null` (NowPlayingBar links mediaId → anime detail). Repeat modes (`off/all/one`): wrap logic must keep `queue.length > 1` guards so the quiz's single-track queue can't be skipped by OS media keys. Queue edits (`removeFromQueue`/`moveInQueue`) are only exposed on "Next up" rows — the playing index never shifts — and `originalOrderRef` is pruned by object identity (ids can repeat in a queue). Volume/repeat/shuffle persist in localStorage `player.prefs`; `stop()` deliberately does not persist its shuffle reset.
- Music mutations invalidate the broad `qk.music.all` prefix ON PURPOSE — liked/cover state is denormalized into every track-returning query, and invalidation only refetches *mounted* queries, so narrowing buys ~nothing and risks stale UI. Recent-track query keys include the requested limit because Home, Sonic Archive, and Listening Stats intentionally request different windows.
- Spotify playlist imports are **public, one-time snapshots** through the user-installed `spotDL` (`spotdl.path`; spotDL resolves downloads through YouTube Music). `music_spotify_playlist_item.matched_track_id` stays nullable with `ON DELETE SET NULL`: a vanished local file greys the source row instead of deleting its metadata/order/retry state. Matching is deliberately strict — exact normalized title + exact primary artist component + both durations within 3 seconds; album breaks one unique tie, and missing duration/ambiguity stays unmatched. Downloads are MP3 320k in 100-track/four-worker chunks with a scan+resolve after every chunk; cancellation keeps finished files and Retry selects the unresolved remainder. spotDL, yt-dlp, and music scans share the one-at-a-time music-maintenance gate. A Spotify batch holds one unique, re-entrant gate owner across every child and rescan; never release the batch reservation between chunks.
- Artist and album Spotify downloads use a **persistent release catalogue**, not a process-memory inspection. First open searches Apple's public iTunes metadata catalogue, batches release tracklists four at a time inside a 25-second fast-path budget, and persists albums/singles only in `music_spotify_entity_snapshot` / `_release` / `_track`; repeat opens do no network work until Refresh or Forget. A parallel six-second spotDL lookup checks up to three representative tracks only for a non-tied Spotify identity; it never expands the artist and cannot delay an otherwise-ready preview beyond that bound. Ambiguity is an in-app candidate choice and manual Spotify URLs live under Advanced replacement. Fast-provider failure automatically falls back to spotDL with eight metadata workers, visible elapsed/found progress and cancellation. Do not pass `--use-cache-file`: current spotDL explicitly switches that flag to its official Spotify Web API path, whose day-long application rate limit makes the app appear frozen. Multi-minute provider waits are tree-killed and reported immediately. Downloads resolve only selected releases, validate artist/title/track overlap, preserve authoritative payloads across same-provider-release refreshes, then run strict matching and the 320 kbps chunked pipeline. Restartable Pause kills the complete spotDL process tree on every platform, scans completed files and resumes unmatched work while holding one re-entrant maintenance owner; Cancel and app quit must release it and clear transient state. A confirmed mismatch is one-shot only, and source IDs auto-link only when all relevant tracks resolve to one unambiguous local entity.
- Spotify artist/album releases and imported-playlist rows enter the **persistent Music Downloads queue** before acquisition. `music_spotify_download_queue` groups one saved source and `_selection` stores exact release/item IDs; duplicate adds merge, source deletion cascades, and exports wipe both tables. Adding never starts work automatically. `/music/downloads` starts all or one card, preserves user order, retains failures for Retry and completed cards until Clear, and dynamically rechecks strict local matches before every card. One `musicDownload` task owns the re-entrant maintenance gate across the mixed run. Pause tree-kills the active spotDL process, scans and persists the card as paused; interrupted `running` rows normalize to paused on startup and never auto-resume. Cancel returns unfinished work to queued without deleting completed audio. Arbitrary yt-dlp links remain immediate and outside this queue.
- Time-attack quiz kinds (the arcade races) go in `quizRepo.SCORE_RANKED_KINDS` and log score = correct / total = attempted: their record is the most correct inside the fixed clock, and the default accuracy ranking would reward slow, careful play.
- Quiz pages (song + Japanese): 1-4 answer / Enter advance keydown effects; one `endGame()` funnel per page logs a `quiz_session` row (guarded by a `loggedRef`) and decides "new personal best" BEFORE invalidating `qk.quiz.history(kind)`.
- Guess the Track (`/quiz/guess-track`) deals five normalized recording identities from either anime themes or the local music library. `@shared/guessTrack.ts` owns the seeded artist/anime-balanced deal, duplicate valid-answer groups, autocomplete ranking, 1/2/4/7/11/16-second ladder, attempt transitions, hints, and 6-to-1 scoring. Every intro extension autoplays from zero; reveal restarts the full recording under `quiz-guess-track-`, and missing local audio uses an unscored spare. Theme and music sessions stay separate as `guessTrackTheme` / `guessTrackMusic` points records.
- Central library quizzes default to `QuizConsumptionScope='consumed'`: entity/fact/audio/image pools use completed positional statuses, while manga additionally caps pages at `last_read_page`. The `all` override must carry the spoiler warning. New consolidated formats go through the single discriminated `quiz:challengePool` contract and pure injected-RNG builders in `@shared/quizChallenges.ts`.
- Higher or Lower always compares covered titles within one explicit `MediaType`. Its fact is named in setup and rendered with category-specific language: older/newer release year, more/fewer discrete units, longer/shorter runtime or length, or higher/lower personal rating. Solo requests one deterministic comparison at a time so correct answers carry the challenger forward, misses preserve the reference, and the three-life run has no artificial length ceiling; Party deals fixed independent pairs.
- Connections is movie/TV-only and mixes actors with directors in one answer pool so the option type cannot reveal the answer. Actors use TMDB billing positions 0-9; directors are uncapped. Lower-billed actors and other credit roles never enter displayed answers or distractors, but lower actor credits remain hidden factual exclusions so a real appearance is not marked wrong. Every shared eligible person is valid, while one is displayed, and reveals preserve each title's character/director role.
- Library Grid is a solo movie/TV 3x3 intersection game. Its actor clues use billing positions 0-9 for both movies and TV; directors are uncapped, and company labels stay neutral because imported studios/networks share one role. Every cell needs two valid titles and the whole board needs a nine-title perfect matching before it is dealt. Titles are searchable by canonical and original-title aliases, cannot repeat across cells, and hints contain exactly one valid choice.
- Movie Chain is a solo movie/TV graph over the same top-ten actors plus uncapped directors. Easy/Normal/Hard endpoints have exact shortest distances 2/3/4 and move caps 4/5/6; accepted detours remain charged after Undo, and hints reveal one shortest-route next title without adding it. Its three difficulty-specific QuizKinds are points-ranked and deliberately accept one-route sessions as personal records.
- Libraryle, Mystery Career, and Link Wall are solo movie/TV deduction games over the same completed-by-default candidate projection. Libraryle hides one covered title and returns exact/partial attribute feedback for up to eight searchable guesses. Mystery Career reveals one of six eligible credits after every miss and accepts actors billed 0-9 plus uncapped directors. Link Wall deals sixteen covered titles only after proving a unique four-by-four partition across at least three actor/director/company/franchise/genre/decade families. All three are points-ranked, accept one-board sessions as records, and remain outside Party mode.
- Chronology requires covered titles from four distinct release years. Exhaust resolved franchise components before same-type shared-company and shared-person fallbacks; generate unique four-title sets, balance connector/title reuse, and reveal both the relationship and years. Solo and Party use the shared direct-position/arrow-key control, with 30-second owner turns.
- Synopsis Quiz deliberately extends consumed safety to unfinished/planned first entries: completed titles always qualify, while non-completed titles require no PREQUEL relation and no obvious sequel marker. Its four choices must share one media type, and title/original/relation aliases plus linked character names are redacted through `@shared/synopsisQuiz.ts`/`quizText.ts`; Solo and Party use the same seeded builder.
- Manga Panel consumed safety follows chapter/page progress, not the manga's overall library status. Long chapters expose only pages from index 2 through `last_read_page` and exclude the final page once it is eligible. The saved seed must drive backend panel selection and `@shared/mangaPanelQuiz.ts` options; image loading pauses timers, and broken panels use unscored replacements.
- Image Reveal must mount a fresh keyed image already obscured for every question; never transition the reused answer image from clear to Stage 1, which leaks the next cover. Its four stages are equal four-second steps from `@shared/imageRevealQuiz.ts`; image loading gates timers and answers, and Party title choices never show their covers.
- Silhouette is anime-only and uses the opaque-image-safe `SILHOUETTE_STYLE` from `@shared/silhouetteQuiz.ts`, never `brightness(0)` (opaque portraits become blank rectangles). Solo and Party gate on portrait load and use replacements; character options have unique names and prefer known-gender matches from other anime, while anime-title options exclude every alternate valid appearance.
- Cast Quiz seeds movie questions only from billing positions 0–9, leaves TV cast uncapped, and excludes every real in-scope screen credit from distractors; generation lives in `@shared/castQuiz.ts`.
- Voice Actor Quiz is anime-only and connects different-title, different-character roles through Japanese VA ids. Known-gender answers require same-gender distractors before role/era affinity; every other real shared-VA role is excluded. Generation lives in `@shared/vaQuiz.ts`; `character.gender` fills from AniList on re-import.
- Central quiz sessions keep `correct`, `attempted`, `scorePolicy`, `playMode`, and `seed` in `quiz_session.settings`. Missing/malformed legacy metadata is solo. Party/tournament rows never enter personal-best calculations; use the shared comparator in `@shared/quizCore.ts`, not a page-local approximation.
- Tournament resume state is structurally validated version 3. Group qualifiers retain `groupId` + `place` and cross-seed adjacent groups; the bracket tree reveals only contenders that have reached the current or a completed real matchup. Preserve the undo stack, original field size, explicit Save and exit / confirmed Abandon flow, synchronous interaction lock, and final champion confirmation.
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
| a Japanese `QuizKind` literal | `JP_QUIZ_KINDS` in `repos/japaneseRepo.ts` | otherwise the stats page's Journey count silently skips it — guarded by `tests/jpQuizKindsSync.test.ts` |
| a `TaskKind` literal passed to `tasks.create` | the `TaskKind` union in `shared/types.ts` | string-matched, **both directions** — guarded by `tests/taskKindSync.test.ts` |
| anything in `src/main/**` | it must not call `console.*` | there is no console in a packaged build; use `logInfo/logWarn/logError` from `logBus.ts`. Guarded by `tests/noConsole.test.ts` |

### The before-quit registry

`src/main/index.ts` — **fourteen calls, and the order is load-bearing**:

```
settleAllTasksOnQuit
→ cancelActiveFootballSync
→ killActiveMusicDownload → abortActiveCoachTurn → killActiveUpdate
→ killActiveOcr → cancelActiveLibraryExport → killSqlSandbox → stopAchievementWatcher → finalizeActiveGameSession
→ closeDatabase → closeCatalogDb → closeDictDb
→ stopFileSink
```

`settleAllTasksOnQuit()` is **first**: it stamps every live task "cancelled (app quit)" before the killers below produce SIGKILL exit codes that the subsystems' own status objects would report as errors the user never caused. `stopFileSink()` is **last** and synchronous: every step above can log, and this is the flush that gets those lines onto disk.

`cancelActiveFootballSync()` is immediately after settlement and before every database close: each Football importer commits only complete source slices, and shutdown aborts its active fetch without allowing a late write into a closed database.

`cancelActiveLibraryExport()` precedes every database close: an in-app export owns a live SQLite backup and temporary sibling output, so shutdown aborts the task and removes partial files before teardown.

`killSqlSandbox()` drops the SQL sandbox's utility process (`src/main/sqlSandbox.ts` — the ONE `utilityProcess.fork` in the app, spawned lazily so a runaway user query can be killed; nothing durable lives in it). `stopAchievementWatcher()` and `finalizeActiveGameSession()` **must precede** `closeDatabase()` — the first writes unlock rows (its final sweep of the emulator save file), the second writes the session row. `closeCatalogDb()`/`closeDictDb()` come **after**. Any new long-running main-process singleton adds its killer here. The game child is the one process deliberately *not* killed (spawned detached so the game outlives the app).

**`achievementWatcher.ts` owns the app's ONE main-side `setInterval`**, and it is bounded by a play session (started by `gameLaunch.startSession`, cleared by `endSession` + the quit killer above, `unref`'d so it can't hold the app open). It exists because the renderer cannot do this job: during a fullscreen game the renderer is occluded and its timers throttle, and it could not raise anything visible anyway. Unlocks surface through the **in-game overlay** (`src/main/achPopup.ts`, a click-through always-on-top window at `#/achpop` that polls `achievements:watchStatus` — OS notifications are suppressed during fullscreen apps on Windows, and the overlay replaces them, with `fallbackNotify` kept for environments where no window can exist). It is a sanctioned child-window owner beside `widget.ts`; no new push channel — everything still polls. Do not take this as licence for a second interval; anything not tied to a live session still polls.

### Never do these

- **`window.confirm` / `alert` / `prompt`** — Electron renders them as native OS modals that steal keyboard focus, and on Linux the page often never gets it back. This is what the month-long "sometimes I can't type in the app" report was. Use `confirmDialog()` from `lib/confirm.ts`.
- **`dangerouslySetInnerHTML`** — markdown and EPUB content go through the parsers in `@shared/markdown.ts` / `BookContent`, which whitelist tags.
- **Emoji or decorative glyphs** — see Standing user directives.
- **`href="#…"`** — HashRouter eats it; scroll imperatively with `scrollIntoView`.
- **`.sort(() => Math.random() - 0.5)`** — a biased shuffle (slot 1 gets index 0 36% of the time). Use `shuffle()` from `src/shared/shuffle.ts`; `tests/shuffle.test.ts` fails on the comparator anywhere under `src/`.
- **`npx vitest` / `npx tsc`** — better-sqlite3 is built for Electron's ABI. Use `npm run test` / `npm run typecheck`.
- **Query keys built inline** — only from `lib/queryKeys.ts` (`qk`), and each group's `all` key must stay a prefix of every key in that group or invalidation silently misses.
- **A caller-supplied `signal` on `fetchWithRetry`** — it wins over the per-attempt timeout, making one deadline span every retry. Pass `timeoutMs`.
- **`console.*` anywhere in `src/main`** — invisible in a packaged build, and it bypasses the log file the user can actually read. Use `logInfo`/`logWarn`/`logError` from `logBus.ts`; `tests/noConsole.test.ts` enforces it.
- **Importing electron from `logCore.ts` / `logBus.ts` / `tasks.ts` / `taskControls.ts` / `childLines.ts`** — `http.ts` and `db/connection.ts` log through `logBus`, and their tests run with no electron mock. One electron import there reddens a large share of the suite. `logFile.ts` is the deliberate exception.
- **`proc.kill('SIGSTOP')` without a platform gate** — Node has no signals on Windows, where that call IGNORES the name and **terminates the process**. Go through `processControls()` in `taskControls.ts`, which sends SIGCONT before SIGTERM on signalling platforms and uses `taskkill /T /F` for the complete process tree on Windows.
- **`productName` in `package.json`** — it lives ONLY in `electron-builder.yml`; adding it changes the userData folder name and orphans the user's library.

### Process spawn safety

Every spawn uses an argv array. yt-dlp keeps `--` before the user URL. **ffmpeg has no `--` terminator**, so it uses `assertSafeArgPath` (absolute, not `-`-leading) *and* a `file:` prefix on every path — the latter is what `--` would not have fixed, since ffmpeg reads `foo:bar` as protocol `foo` (`re:zero 01.mkv`, any Windows `C:\`).

### Data-integrity rules that are easy to miss

- **`video:markWatched`'s `logProgress` call is guarded on `scope.id === 'video'`.** A wrestling row's owner is an EVENT id; logging it would silently advance whatever `media_item` shares that number.
- **`syncMediaProgress` returns early for `book` media** — books track pages, so finishing an EPUB volume must never slam `progress` down to a volume count.
- **`syncMediaProgress` is deliberately absent from the video path** — it floors progress at the highest watched episode number, which would undo a rewatch wrap the moment `logProgress` started one.
- **Scanners that prune by "not seen" need a zero-file guard** — `music.startScan` and `manga.rescan` refuse a zero-file walk when rows exist, so an unmounted drive cannot wipe playlists, likes and play history.
- **Music tracks keep `mediaId: null`** (NowPlayingBar links mediaId → anime detail), and player **track-id namespaces are load-bearing**: `theme-`, `quiz-`, `music-`, `tourney-`, `file-`. Source-aware current-track actions are shared by the persistent bar and full Now Playing view: music gets Like plus Add to playlist, themes get Favorite, and other namespaces get neither.
- **Every consumer of `qk.media.home(type)` must keep its query byte-identical `{ mediaType }`** — Seasonal, Franchises and the Japanese roadmap share those cache entries. Home itself uses the bounded `media:homeOverview` projection and must not regress to per-type full-library reads.
- **Wallhaven searches hardcode `purity=100` (SFW)** — regression-tested; do not parameterise it.
- **Re-import is authoritative**: it refreshes canonical fields and prunes removed children, but preserves personal tracking via COALESCE. Changes to import logic only affect existing titles after a re-import — **always tell the user that**.
- **A partial refresh (`only` on any importer) must run NO DELETE.** `@shared/refresh.ts` selects which media_item columns get written; every child block — characters, credits, companies, genres, staff, relations — is skipped WHOLE, prune included. This is not tidiness: `pruneCharacters` (anilist, vndb) and TMDB's inlined copy derive their keep-set from the payload, and their last two statements sweep orphaned `character`/`list_item` rows for the whole SOURCE rather than for one media id, so a thin payload through the normal path would delete cast across the library. `replaceRelations` is worse still — an unconditional `DELETE FROM media_relation WHERE media_id=?` before it knows whether the payload has edges. `tests/anilistImport.test.ts` and `tests/tmdbImport.test.ts` assert every child count is unchanged after a `only:['cover']` pass.
- **`tvRepo` never writes `media_item.progress`.** Ticking an episode returns `firstTime` and `ipc.ts` routes THAT through `checklistRepo.logProgress`, exactly as `video:markWatched` does — the app keeps ONE "I watched another one" write, which owns status promotion, the rewatch wrap and checklist credit. A season toggle logs once per newly-watched episode, but passes **`{ noRewatch: true }`**: bulk-marking back-fills a catalogue, so it credits the board while holding an already-finished show exactly where it is. Ticking ONE episode by hand still wraps — that is a deliberate "I just watched this". (Without it, the Seasons tab arriving empty on long-finished shows made the natural first click knock them back to Watching with `rewatch_count` bumped, none of which unmarking restores.) Marking a season skips unaired episodes; unmarking clears every one. The UI's "season complete" test must therefore count **aired** episodes (`total - unaired`), or the button never offers the undo.
- **`replaceEpisodes` prunes only inside the seasons it was actually given.** `EpisodeCatalogue` carries `seasons` alongside `episodes` because a season TMDB failed to serve is indistinguishable from one that lost all its episodes — and a show-wide prune against a partial keep-list deletes that season's rows *and their `watched_at`*, which no later re-import restores. A partial run also publishes `absolute: null` rather than numbers it knows are short; the upsert COALESCEs so an earlier complete run's numbering survives.
- **A watermark is committed AFTER its write, never before** — `achievementWatcher.pollOnce` moves `lastMtimeMs` only once `insertUnlocks` returns, or a swallowed `SQLITE_BUSY` makes every later tick (and the final sweep) take the "nothing changed" short-circuit and lose those unlocks for the session.
- **Football missing children are coverage, not empty facts.** A missing scorer line, lineup response, or partial/cancelled slice must stay `not_supplied`/`partial`; it never deletes the last complete slice and never enters a quiz deal. API-Football credentials stay in the `x-apisports-key` header, provider artwork is ignored, and FotMob remains a validated user-pasted deep link only — no scrape, cache, embed or unsupported endpoint.
- **`beginActivity`/`endActivity` callers pass their handle back** (`endActivity(err, own)`) — the activity slot is one global, and a dialog import started mid-run takes it. Settling "whatever is in the slot" marks a still-running import `done`.
- **A credential that is not a recognisable param name needs its own `redact()` rule** in `logCore.ts` — `http.ts` logs full URLs, and the log file is outside the export sanitizer. RetroAchievements' `z=`/`y=` is the host-scoped precedent.
- **Deleting a media item goes through `media:remove`, which calls `pictures.forgetSlideshowForMedia(id)` BEFORE `mediaRepo.remove(id)`** — `slideshow_item` rows cascade with the images, but their copies in `slideshow.dir` do not, and Windows would keep cycling wallpapers for a title the user deleted.
- **Anything feeding a POSITIONAL file reads the provider's order** — `achievementRepo.listInProviderOrder`, not `listForMedia` (which sorts unlocked-first for the UI). The Goldberg config is a positional JSON array; UI order remaps every index and reshuffles on each new unlock.

### Frozen key strings

Stored in the DB, so renaming one orphans data: checklist `task_key`, gacha unit-kind and currency `key`s, programming course/lesson/sheet keys (+ SQL exercise / regex golf puzzle / snippet keys, `prog_solve.kind` `sql`/`regex`, `prog_cli_miss.cmd_key` = `<sheetKey>/<answers[0]>`), every `src/shared/english/` content key (passage, mechanics, cloze/wf/tr, punct, spot, match, idiom — they ride `quiz_session.settings`), bulk-import sort keys, Home widget keys (`HOME_WIDGETS` in `lib/homeWidgets.ts` — they ride the `home.widgets` settings row), `GachaGameCfg.catalog.source`, `tournament.saved` (the autosaved unfinished bracket), wrestling promotion ids, the nine `FootballCompetitionKey` values and four Football `ListKind` values, `achievement_game.provider` (`steam`/`ra`) and `achievement_unlock.source` (`emu`/`ra`/`manual`), and every `external_source` value.

## Known open issues

Written down because a vague report ("sometimes I can't type in the app") once sat undiagnosed for 33 days. Add to this list rather than letting a symptom live only in a chat log.

- **Native file/folder pickers may steal keyboard focus.** `dialog.showOpenDialog` in main is the same class of native modal as the `window.confirm` bug that was fixed on 2026-08-12, and none of the call sites passes the main window as a parent. **Unreproducible on the VPS** (no display) — if the user reports the typing bug again after 0.18.x, this is the first suspect.
- ~~Biased shuffles~~ — fixed 2026-08-15: ONE Fisher-Yates in `src/shared/shuffle.ts`; `tests/shuffle.test.ts` text-guards `src/` against the `.sort(() => Math.random() - 0.5)` comparator.
- ~~Programming quiz answer-length tell~~ — 47% → ≤ 30% on 2026-08-15; `tests/programmingBias.test.ts` now caps strict-longest AND strict-shortest at 30% per course/deck and forbids a strict-longest correct option wider than 1.5× the runner-up.
- ~~Search used unescaped `LIKE '%q%'`~~ — fixed 2026-08-31: three-character substring searches use the trigger-maintained `global_search_fts` trigram projection; shorter queries use escaped LIKE so `%` and `_` are literal.

Fuller detail, with measurements, is in [`docs/review/`](docs/review/) — see [`docs/review/STATUS.md`](docs/review/STATUS.md) for what has already shipped.

## Misc gotchas

- Right-click cut/copy/paste is a native menu built in `createWindow` (main/index.ts `context-menu` listener) — renderer has no context-menu code.
- Destructive sync guards: `music.startScan` refuses a zero-file walk when `music_track` has rows (unmounted drive whose mountpoint still exists would otherwise wipe playlists/likes/play history — tests/music.test.ts regression); `manga.rescan` has the equivalent guard. Any new scanner that prunes by "not seen" needs the same check.
- `music-metadata` is ESM-only while the main bundle is CJS — it's loaded via lazy `await import()` in music.ts; don't convert to a top-level import.
- yt-dlp/spotDL/ffmpeg are user-installed external binaries (settings `ytdlp.path` / `spotdl.path`), never bundled.
- `scripts/bulk-import.cjs` duplicates the import pipeline (known debt) — changes to importers may need mirroring there.
- **No Prettier config exists either** — `npx prettier --write` therefore applies Prettier's DEFAULTS (semicolons, double quotes) and silently rewrites the file against house style (no semicolons, single quotes, width 100, no trailing commas). This bit once, 2026-08-16. If you must run it: `npx prettier --write --no-semi --single-quote --print-width 100 --trailing-comma none --arrow-parens always`.
- No ESLint config exists; eslint-disable comments are inert.
- The menu bar, Ctrl+wheel zoom and the `ui.scale` setting are described in [`docs/architecture/ui-conventions.md`](docs/architecture/ui-conventions.md).

## Reference index

Per-subsystem narrative lives in [`docs/architecture/`](docs/architecture/00-index.md). Read the one file for the area you are touching.

| Working on… | Read |
|---|---|
| A media type, wallpapers/fan art, books, game launch + playtime, achievements, seasonal, list filters | [media-types.md](docs/architecture/media-types.md) |
| A games importer (RAWG → IGDB → Steam history, offline catalog) | [importers.md](docs/architecture/importers.md) |
| Manga scanner, EPUB books, the readers, mokuro OCR | [readers.md](docs/architecture/readers.md) |
| Linked local videos, external playback, metadata and subtitle corpus | [video.md](docs/architecture/video.md) |
| "Open with NaviHUB", double-click handling, desktop registration | [file-associations.md](docs/architecture/file-associations.md) |
| Japanese — packs, drills, SRS, ghosts, i+1 feed, kana keyboard | [japanese.md](docs/architecture/japanese.md) |
| English — dictionaries, SRS, drills, writing feedback | [english.md](docs/architecture/english.md) |
| Programming — courses, cheatsheets, CLI drill | [programming.md](docs/architecture/programming.md) |
| Gacha, or the FGO Coach (the app's LLM feature) | [gacha-fgo.md](docs/architecture/gacha-fgo.md) |
| Wrestling — the Wikipedia importer, matches, local collection | [wrestling.md](docs/architecture/wrestling.md) |
| Football — history/current sources, journal, media, quizzes | [football.md](docs/architecture/football.md) |
| Torrent search, or the bulk importer | [torrents-bulk.md](docs/architecture/torrents-bulk.md) |
| Theme songs, music, the tournament bracket | [music-quiz.md](docs/architecture/music-quiz.md) |
| The checklist, streaks, progress logging | [checklist-progress.md](docs/architecture/checklist-progress.md) |
| The task registry, pause/cancel, the structured log, the Tools menu | [tasks-logs.md](docs/architecture/tasks-logs.md) |
| Shared UI components, the Lain theme, dialogs, menu bar, zoom | [ui-conventions.md](docs/architecture/ui-conventions.md) |
| Packaging, releases, in-app updates, library export | [packaging-ci-updates.md](docs/architecture/packaging-ci-updates.md) |
| Something that sounds like a feature request | [removed.md](docs/architecture/removed.md) — check it was not deliberately taken out |

**Skills** (`.claude/skills/`) encode the multi-step rituals: `add-ipc` (the 5-file contract chain), `db-change` (schema + migration + sanitize + tests), `verify` (drive the built app — laptop only), `ui-preview` (show a screen as a local, gitignored HTML mockup built from the app's real Tailwind classes BEFORE coding it — design sign-off, works on the VPS, never uploaded, is not verification), `local-release` (ship a release by hand when Actions cannot run), `wrap` (end-of-session chores + a handoff prompt).
