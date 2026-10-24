# NaviHUB

Personal, single-user, local-only Electron media hub: anime, manga, visual novels, games, movies/TV, books (MyAnimeList + Letterboxd style tracking with cross-linked voice actors/studios/characters), plus standalone sections for Japanese learning, English learning, a programming learn section, a local manga/book reader, linked local videos with an in-app player (the system player is the fallback), a wrestling wiki, a world-history wiki (History), a quote book (Quotes), a song quiz, and a local music library. No server, no accounts — everything lives in `~/.config/navihub/`.

**This file is the contract.** It holds the rules, the conventions, and the things that break if you get them wrong. The per-subsystem "how and why" narrative lives in [`docs/architecture/`](docs/architecture/00-index.md) — read the one file for the area you are touching. Do not append feature write-ups here; that is what grew this file to 135 KB before it was split.

## Agent interoperability

- `CLAUDE.md` and `AGENTS.md` are byte-for-byte mirrors. Treat both as the same contract and apply every change to both files in the same edit. Legacy references to `CLAUDE.md` in this contract or a skill mean both files.
- Work from the local checkout only. Normal model context processing is allowed, but do not use Codex cloud execution, hosted artifacts, or repository publishing. The existing Claude-account restriction below remains in force.

## Subagent delegation

For substantial tasks, proactively delegate only when there are at least two independent workstreams or a broad repository investigation. Use the least expensive capable model and lowest reliable reasoning effort — Haiku in Claude Code (`gpt-5.6-luna` in Codex) for searches, test investigation and other straightforward work; Sonnet only when a delegated subtask needs judgment; never Fable. Give each subagent a narrow objective, explicit scope and a concise output request. Do not delegate single-file edits, tightly coupled changes, architectural decisions, integrated implementation or final verification. Stop delegation when results are sufficient, duplicated or no longer save time. Subagents run only focused tests for the area they touch; the primary agent owns synthesis, edits, the final full-suite gate and the report.

## Context and usage efficiency

- Load the smallest sufficient context: search with `rg` first, read targeted ranges, and open only the architecture file for the subsystem being changed. Do not paste whole files or unfiltered logs when a focused excerpt will do.
- Stop searching once the available evidence answers the task. Avoid repeating repository exploration or verification that has not been invalidated by a change.
- When model controls are available, use low reasoning for lookup, documentation and routine edits; medium for normal implementation; high or above only for ambiguous architecture, cross-layer failures, migrations or other work that demonstrably needs it.
- Keep plans, progress updates, subagent reports and final answers concise. These efficiency rules never weaken the definition of done or any safety, data-integrity or verification requirement below.

## Standing user directives

Rules the user has stated and had to re-state. Treat these as settled — do not relitigate them, and do not need to be told twice.

- **No emoji and no decorative glyphs, anywhere.** (2026-07-12, re-stated 08-01 and 08-06 — three rounds.) The user counts decorative unicode as emoji. Functional glyphs are fine: reader HUDs, `✕` close, ✓/○ state marks, ★ score/rarity, `←` back, ▸/▾/› disclosure. Like/favorite controls use the shared SVG `FavoriteButton`; player transport uses SVG from `components/PlayerIcons.tsx` — unicode hearts and ⏮/⏭ render inconsistently across platforms.
- **VN reading, discovery, franchise pages and wrestling journeys show story information directly.** (2026-09-23; the cross-media guides merged into Franchises 2026-10-05.) Do not add spoiler reveal controls to these features. Quiz answer masking remains unchanged.
- **Git belongs to the user.** (2026-07-01: *"leave git to me from now on"*.) Never commit, push, branch, stage or revert. Read-only `status`/`log`/`diff` is fine.
- **Music keeps one recording across original and remastered releases.** Remaster labels and their years are interchangeable for local matching and download reuse; live, acoustic, remix and other recording variants remain separate. Preserve explicit manual source choices.
- **Music source approval is exact and durable.** Use this version approves one permanent source with independent observed metadata; validated audio links once without asking again. Never reinterpret an old saved URL as approval or substitute a different source. Spotify and direct URL jobs share the persistent queue; launch never starts downloads automatically. Spotify output tags are not proof of recording identity.
- **No Indian movies or TV in bulk/top lists.** (2026-07-03, re-asked 08-12 after 40 days.) `EXCLUDED_ORIGINAL_LANGS` in `src/main/tmdb.ts` filters hi/ta/te/ml/kn/bn/mr/pa/gu out of every TMDB bulk list. Individual dialog imports are unaffected.
- **History content is verbatim quotes only.** (2026-10-05.) Every sentence a reader sees in the History section is a word-for-word quote from a named, cited source with a locator; no agent-written prose, summaries or machine translations anywhere, and an English translation appears only when a published one exists. Wikipedia and Wikidata are finding aids only, never cited (Commons may host credited images). Interpretations record every notable view, labelled, with fringe and revisionist views carrying quoted reception. A government's or ruler's statement is a claim, never an official narrative (2026-10-09): state outlets such as khamenei.ir are never cited for facts or narration, and each government claim carries a quoted independent assessment. A non-English title of an event, period or state is a cited source's title, never our translation (2026-10-13). The validator enforces it; the `history-era` skill is the research ritual: decades, eras, and single-subject dossiers for pages the user requests from Ctrl+K or the Corrections page's Requests tab (2026-10-18).
- **Voice roles do not count in the screen quizzes.** (2026-10-14: the user does not follow voice casting, and animated titles crowded the actor-based quizzes.) An actor credit on a title with the Animation genre is a voice role (`@shared/voiceRoles.ts`): it never links titles or seeds a question in Connections, Cast, Movie Chain, Library Grid, Link Wall, Mystery Career or Libraryle's cast clue, and the availability counts skip it. Directors of animated titles still count, animated titles stay in every non-cast quiz, and multiple-choice builders keep voiced titles in their factual guards so a true answer is never offered as wrong. The anime Voice Actor quiz is unaffected.
- **No anime or daily filler in TV bulk lists.** (2026-08-13.) TV bulk lists drop anime (Animation genre + `ja` original language — anime lives in the Anime section via AniList) and talk/news/soap shows (`without_genres` 10763/10766/10767, `TV_EXCLUDED_GENRE_IDS` in `src/main/tmdb.ts`). Movies and individual dialog imports unaffected.
- **Bulk previews contain only NEW titles.** (2026-08-13.) A top-100 preview is 100 titles not in the library — owned rows are skipped without consuming slots and the crawl tops up (`makeKeep` in `src/main/bulkImport.ts`). Don't reintroduce in-library rows into previews.
- **The Japanese section must work fully offline and be the user's only learning source.** (2026-07-27, re-stated 08-01.) No feature there may depend on a live network call at study time.
- **Every programming course must be self-contained and sufficient as the user's only learning source.** (2026-08-30.) This covers Data Science and Engineering, DevOps Engineering, Cybersecurity, Full-Stack Web, Backend and Distributed Systems, Computer Systems and C, Database Engineering, and AI and LLM Engineering. Each path works fully offline; may name tools but teaches the underlying concepts and every prerequisite from first principles (Python/SQL/math for data science; Linux, networking, delivery, cloud, infrastructure, Kubernetes, observability, reliability, security and platform engineering for DevOps); includes guided practice, worked solutions, mastery standards and assessed capstones through production-level work; and requires no external course, account, documentation or live service at study time.
- **`npm run dist:win` may run on the VPS** for local release artifact builds; GUI verification and live-data work remain laptop-only. (2026-09-15.)
- **Never launch the GUI on the VPS.** (2026-07-25.) See the machine table below.
- **Football looks official: real crests, logos and portraits everywhere.** (2026-09-28: *"it should feel official and everything should be added in terms of logo, pics"*.) Infobox crests, competition logos and portraits are taken whatever their license (personal local archive), with TheSportsDB and API-Football media as fallbacks; the generated two-colour crest is only the last resort. The Football section should be sufficient for anything the user wants to look up.
- **Home's cover-wall hero stays.** (2026-08-16, unprompted: *"keep that background that have mixed media pictures in it. i like it"*.) The tilted wall of the user's own covers behind the brand is Home's identity, NOT a widget — it is pinned above the configurable widgets and is deliberately absent from the Customise dialog.
- **Nothing from this repo goes to the Claude account.** (2026-08-15.) No Artifact publishing, no Claude Design / DesignSync, no upload of code, mockups, docs or data to claude.ai hosting. UI previews are local files (`previews/`, gitignored — the `ui-preview` skill) that the user opens themselves. Local tools and the user's own git remote are the only places repo content may go.
- **UI previews happen only when the user asks.** (2026-08-24.) Do not invoke the `ui-preview` workflow proactively, even for a large renderer change.
- **The PC holds the library; the laptop is for code and tests.** (2026-10-16, after being re-stated four times.) On the laptop, never propose installing, downloading or importing library data (Football, music, achievements, catalogs) to test a feature. Verify with tests or a scratch copy and name what the user should check on the PC; if real data is needed, ask for a read-only copy of the PC's `navihub.db`.
- **Network lookups start on a user action.** (2026-09-27 Art Browse, 2026-10-12 Spotify recovery.) A search in a dialog, tab or picker runs when the user presses Search, never on open.
- **Self-review risky work before reporting done.** (2026-10-16.) A change that writes outside `userData`, deletes or prunes rows, or swaps files gets `/code-review --max-findings all` on its own diff in the same session, and confirmed findings are fixed before the completion report.
- **Images taken from the web are checked for subject and size** (2026-09-28 wrong Log Lady portrait, 2026-09-30 low-resolution idle screens): the right person or scene, and at least 1280 px wide for full-screen use, before they ship.

## How to work here

Ask scope and design questions early when the answer is not already in this contract or the code. Typecheck after each code slice, run focused tests for the changed area during development, and run the full suite once at the end of the cohesive task. Build when the task requires it. Update both mirrored contracts for new conventions.

They grant broad design autonomy ("the floor is yours", "as you see fit") and send short continuations ("continue", "go ahead", "do the plan"). Long autonomous runs are expected and wanted; stopping early to ask a question that the code or this file already answers is the failure mode.

For substantial work with unresolved design choices, present one plan, get approval once, then implement in shippable slices. An explicit continuation approves the existing scope; do not ask again at each slice. Proceed directly on small, clear or already-approved work.

- **Edit content and data files with the Edit tool,** never ad-hoc Python/sed rewrite scripts (franchise pages, History content, catalogs, seed files). Scripts broke them repeatedly: trailing commas, mangled arrays, id collisions. If a bulk script is unavoidable, run the matching content test right after (`tests/franchises.test.ts`, `tests/historyContent.test.ts`) and check for duplicate ids before going on.
- **AniList, TMDB and Fandom are often DNS-blocked on this network.** On a DNS or connection error, retry once. If it still fails, list the blocked items, continue with the rest, and report them at the end; do not stall the task.
- **Do not assume the user's build, machine or data.** Before blaming an old AppImage, a stale build or missing data, check it (version, `out/` timestamp, the DB) or ask how they launched the app.

### Definition of done

`npm run typecheck` + `npm run test` green is **necessary, not sufficient**. Across 48 sessions, 13 opened with a defect the user found by using the app — blank screens, unclickable buttons, swapped labels, a back button that returned to the reader — none of which a unit test could see. Renderer tests cover shared interaction and accessibility contracts, but they do not replace a real GUI check, so:

- **Backend-only change** — typecheck + tests is done.
- **Anything touching `src/renderer/`** — typecheck + tests, **and then either** drive the built app with the `verify` skill (laptop only) **or** say plainly, in the completion message, that the change is unverified in the UI and name what the user should click. Do not report a renderer change as working on the strength of a green test run. Use `ui-preview` only when the user explicitly requests it; a preview is design sign-off, not verification.
- **Anything touching the schema or a migration** — see the `db-change` skill. Tests build from the *current* `init.sql`, so they structurally cannot catch a migration that breaks a pre-existing database. That class of bug has shipped and left the app unable to start.

## Machines

Three machines, different capabilities. Mixing them up has already produced a whole debugging session chasing a fix that existed only in the other working tree.

| | VPS — `/home/xamir/NaviHUB` | Laptop — `/media/xamir/Anglo/NaviHUB` (host `Navi`) |
|---|---|---|
| Purpose | code changes and release artifact builds | running the app, GUI verification, data work on its own library |
| Display | none (headless) | yes |
| Live DB `~/.config/navihub/` | no | yes — a smaller, secondary library |
| yt-dlp / ffmpeg / docker | docker only, for release builds | yes |
| Verification available | `npm run typecheck`, `npm run test` | those plus the real app |
| `verify` / `dist:win` / bulk imports | `dist:win` only | `verify` / bulk imports |

**The user's PC holds the main, larger library** (2026-10-05). Laptop sessions cannot reach it, so treat performance and data measurements taken on the laptop as a lower bound: library-wide features such as the quizzes default to completed titles, and the laptop library has few of them (about 200 of 3,625 titles on 2026-10-05). Check scaling against scratch copies with duplicated titles or a read-only copy of the PC's `navihub.db`, never by writing to a live DB.

There is no sync channel between the machines (the LAN sync server was scrapped — see [`docs/architecture/removed.md`](docs/architecture/removed.md)), so the laptop and PC libraries are separate live DBs with no merge path: data changed in one never reaches the other. Delivery is: user commits and pushes → laptop pulls → `npm install` if the lockfile changed → `npm run build`.

Because there is no visual check on the VPS, **write or extend tests for anything you change there**, and say explicitly when something needs the user to eyeball it.

The laptop is memory-constrained (2026-10-13): run focused typechecks and tests during development and the full gate once at the end.

## Commands

```bash
npm run dev          # electron-vite dev — laptop only; DO NOT run from VS Code's integrated terminal
npm run test         # native smoke, main Vitest in Electron, then renderer Vitest in Node + jsdom — NEVER `npx vitest`
npm run typecheck    # tsc for both tsconfig.node.json and tsconfig.web.json — NEVER `npx tsc`
npm run build        # production build to out/
npm run db:query     # read the live/any sqlite DB — THE way to inspect data (laptop; see scripts/db.cjs)
npm run db:generate  # drizzle-kit (rarely needed; runtime schema comes from init.sql)
npm run pack:linux   # electron-builder packaged build to dist/linux-unpacked (packaged-mode smoke test)
npm run dist:win     # Windows NSIS installer + portable exe — VPS release build; GUI verification remains laptop-only
npm run export:library  # sanitized shareable library bundle (see scripts/export-library.cjs)
npm run install:desktop # register the .desktop entry + file associations (laptop)
```

During code changes, run the relevant test files or suite with `npm run test:main -- <test-file>` or `npm run test:renderer -- <test-file>`. Run `npm run typecheck` after each code slice. At the end of a cohesive task, run `npm run test` once for the native smoke and both suites; do not repeat it after every small edit. Documentation-only changes need no code test run. The full suite takes about 3 minutes for ~345 main files / ~4,350 tests plus ~100 renderer files.

**Heavy commands queue machine-wide** (2026-10-23: parallel sessions ran the laptop out of RAM). Every `typecheck:*` project and both Vitest suites run through `scripts/with-heavy-lock.cjs`, so only one runs at a time across all sessions and checkouts; a queued run prints `with-heavy-lock: waiting for pid …`. When other sessions are active, give these commands a long Bash timeout (up to 600000 ms) or run them in the background, because the wait counts against the timeout. Both suites cap Vitest at 3 workers (`vitest.workers.ts`). `NAVIHUB_TEST_WORKERS=<n>` raises the cap, `NAVIHUB_HEAVY_SLOTS=<n>` allows n heavy commands at once, and `NAVIHUB_HEAVY_LOCK=skip` bypasses the lock. A lock whose owner pid is gone is reclaimed automatically.

**Terminal gotcha:** VS Code's integrated terminal sets `ELECTRON_RUN_AS_NODE=1`, which makes `npm run dev` silently run Electron as plain Node (no window). Launch the GUI from a normal terminal or the desktop shortcut, or `unset ELECTRON_RUN_AS_NODE` first.

## Architecture

electron-vite three-way split; path aliases `@shared` → `src/shared` (everywhere), `@` → `src/renderer/src` (renderer only).

- `src/main/` — all DB and filesystem work. Entry `index.ts` (window, `navimg://` protocol handler, before-quit hooks). Importers as one module per source (`anilist.ts`, `tmdb.ts`, `vndb.ts`, `rawg.ts`, `igdb.ts`, `steam.ts`, `themes.ts`, `hltb.ts`). Feature modules (`manga.ts`, `music.ts`, `musicSpotify.ts`, `musicArt.ts`, `mokuro.ts`, `tokenizer.ts`). Queries in `repos/*.ts`.
- `src/preload/index.ts` — implements the `NaviApi` interface by forwarding every method to `ipcRenderer.invoke('domain:action', …)`.
- `src/renderer/src/` — React 18 + react-router v6 (one low-level `<Router>` fed by the active browser tab's history, `components/TabbedRouter.tsx`) + TanStack Query v5 + Tailwind (dark theme).
- `src/shared/` — `api.ts` (the typed `NaviApi` contract both preload and renderer import), `types.ts` (all IPC payload types), `mediaUrl.ts`, `srs.ts`.

`src/main/repos/` holds 36 repos. The four that implement the cross-linking graph — the app's defining feature — are `peopleRepo.ts`, `characterRepo.ts`, `companyRepo.ts` and `linkRepo.ts`; `searchRepo.ts` is the sole backend for Ctrl+K and `/search`; `mappers.ts` is the shared row→object layer every other repo uses.

### The IPC contract (follow this chain for ANY new backend capability)

1. Payload types in `src/shared/types.ts`.
2. Method signatures in the `NaviApi` group in `src/shared/api.ts`.
3. Thin `ipcMain.handle('domain:action', (_e, …) => repo.fn(…))` one-liners in `src/main/ipc.ts` (grouped by `// ---- domain ----` comments).
4. Mirror in `src/preload/index.ts`.
5. Renderer consumes via `api` (`lib/api.ts` = `window.api`) inside TanStack Query, keys from `lib/queryKeys.ts`.

Typecheck enforces preload/api agreement — if it passes, the contract is aligned.

**Main-process boundaries** — lazy heavy IPC modules, library-wide quiz reads off main, and the task registry — are in [main-process.md](docs/architecture/main-process.md). Two of them hold for every change: **push events are frozen at `player:cmd` and `player:state`; everything else polls** (`tests/pushBridge.test.ts`), and **no whole-library work runs in a synchronous main handler**.

## Database

better-sqlite3 at `userData/navihub.db`. There are **three schema surfaces**, not one:

| Surface | DDL | Mirror / lifecycle | Guard |
|---|---|---|---|
| Main app DB | `src/main/db/init.sql` (147 tables) | `src/main/db/schema.ts` (Drizzle, types only) + `runMigrations()` in `db/connection.ts` | `tests/initLegacyDb.test.ts`, `tests/sanitizeCoverage.test.ts` |
| Dictionaries | `src/main/dict/init.sql` (29 tables) | `src/main/dict/dictDb.ts` DROP list + `ORPHAN_SWEEPS` (read by `sweepOrphans()`) | `tests/dictSchemaSync.test.ts` |
| Games catalog | `src/main/gamesCatalogSchema.ts` | `gamesCatalogDb.ts`; script keeps its own copy | `tests/gamesCatalog.test.ts` |

- `src/main/db/init.sql` — authoritative DDL, `CREATE TABLE IF NOT EXISTS`, runs on every startup.
- `src/main/db/schema.ts` — Drizzle mirror (types/drizzle-kit only; repos do NOT use the Drizzle query builder).

Repos use **raw prepared SQL** via `getSqlite()` from `db/connection.ts`. The exception is `repos/quizRepo.ts`, which also runs in the quiz pool process and so reads through `db/sqliteHandle.ts`; `connection.ts` installs the main connection there, and its tests mock `../src/main/db/sqliteHandle` instead. Columns added to an *existing* table also need an idempotent `ensureColumn` call in `runMigrations()` (connection.ts) — the live DB predates them; brand-new tables need nothing beyond init.sql. **And any INDEX touching an ensureColumn'd column goes in runMigrations too, never init.sql** — init.sql runs first, so on a live pre-migration DB the index references a column that doesn't exist yet and the app dies at startup (the English-SRS release shipped exactly this; tests/initLegacyDb.test.ts replays it and drift-guards every index). No FKs can be added by ALTER, so some link tables are deliberately FK-less (e.g. `list_item`, `jp_card.source_media_id`) — reads LEFT JOIN and tolerate deletion, and entity `remove()` fns clean up manually.

All media types share one `media_item` table keyed by a `media_type` text column. The cross-linking graph: `credit` (person ↔ media ↔ character), `media_company`, `media_character`, `tag`/`media_tag`, `media_relation`. Standalone sections have isolated tables (`jp_*`, `music_*`, `manga_chapter`, `list`/`list_item`, `theme_song`/`theme_artist`).

## Local files & images

A privileged `navimg://` protocol serves every local file. The DB stores relative paths with virtual prefixes, and only `src/main/files.ts:absoluteMediaPath()` maps a prefix to a real folder. The prefix table, thumbnails and provider-secret storage are in [data-integrity.md](docs/architecture/data-integrity.md); keep that table complete when a root is added.

## Adding features and importers

New media types, standalone sections, curated overlays and the import conventions (two-phase atomic, dedup, `fetchWithRetry` budgets, Wikimedia/AniList throttles, the importer template): read [adding-features.md](docs/architecture/adding-features.md) before adding a feature or touching an importer.

## Renderer conventions

Before any change under `src/renderer/`, read [renderer.md](docs/architecture/renderer.md): query keys, mutations, navState and prefs, dialogs, fields, browser tabs, themes, the player, Back navigation after save/delete, and the Tailwind component classes.

## Performance rules

Every slow screen found on 2026-10-05 was code that was fast on a small library. The laptop library understates the PC's (see Machines), so follow these whatever a local timing shows. Why, the measurements and the scaling recipe: [performance.md](docs/architecture/performance.md).

- **No whole-library work in a synchronous main-process handler.** better-sqlite3 blocks, so one slow handler stalls every IPC call and every `navimg://` image. Library-wide quiz reads run in the quiz pool process; new work of that size gets the same treatment. `src/main/ipcTiming.ts` logs `slow handler <channel>` for any handler that blocks main 100 ms or more; check the log after a change that reads a large table.
- **Builders and deals scale with the round, not the pool.** Never scan or shuffle the whole pool once per pool item: build only what the deal reaches (`balancedBuiltDeal`, `drawUntil`) and count eligibility against a precomputed Set. `tests/quizScale.test.ts` budgets the builders that were quadratic; add a case when a builder deals from a large pool.
- **No library-sized `IN (...)` lists, per-row correlated subqueries or full-table scans on a hot path.** Read a small table whole and filter in JS, join, or seek an index, and check `EXPLAIN QUERY PLAN` for new queries over `credit`, `character`, `media_character`, `media_relation` or the dictionary tables.
- **Small image slots load thumbnails** (`thumbUrl`, `CoverImage thumbWidth`); never decode full-size artwork into a card.
- **Measure at scale before calling anything fast:** a duplicated-title scratch copy (about 4× the laptop library), never the live DB.

## Tests

`npm run test` first executes a real better-sqlite3 write/reopen/integrity smoke inside Electron, then runs two suites. `tests/*.test.ts` uses `vitest.config.ts` through Electron-as-Node so main-process behavior and native modules run under the shipped Node runtime. `tests/renderer/**/*.test.tsx` uses `vitest.renderer.config.ts` through Node + jsdom, Testing Library, user-event and axe-core. `npm run typecheck` includes both production projects and the renderer-test project.

Main-suite pattern: `createTestDb()` (tests/helpers.ts) builds an in-memory DB from the REAL init.sql; each file does `vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))` so repos run their actual SQL. Modules touching electron/fs mock `electron` and `../src/main/files` (see manga.test.ts, music.test.ts). Importer tests mock `http`/`files` with URL-keyed fixtures (rawgImport.test.ts). Design main-process logic with pure exported functions + injectable IO (e.g. the scanner's `TagReader`, yt-dlp's arg-builder) so tests never need real binaries/files. Test the real query, not a hand-written stand-in.

Conventions beyond that recipe:

- **Design for testability by splitting pure decisions from IO.** The established pairs are `updaterCore.ts`/`updater.ts`, `gameLaunchCore.ts`/`gameLaunch.ts`, and `video/playability.ts`/`video/ffmpeg.ts`. The pure half is tested exhaustively with no SDK, binary or electron import; the IO half is thin enough to read. Follow this for any new module that shells out or calls a network.
- **Renderer tests stay in their own config/runtime.** Never add `.tsx` to `vitest.config.ts`: the main suite must keep the shipped Electron/Node runtime and native smoke boundary, while `vitest.renderer.config.ts` deliberately uses Node + jsdom. Put shared setup and axe helpers under `tests/renderer/`; test behavior through accessible roles/names and real keyboard input. A green jsdom test still does not replace laptop GUI verification.
- **Text-level cross-file guards are house style** when a contract is string-matched rather than typed: `dictSchemaSync`, `ipcContractSync`, `sanitizeCoverage`, `docsDrift`, `gamesCatalog`. Each reads two files as text and asserts their lists agree. Reach for this whenever you add a list that must mirror another.
- `tests/initLegacyDb.test.ts` replays a real pre-migration DB shape. Any migration work extends it.

## Hard invariants

Break one of these and something silently corrupts, leaks, or fails to start. They were previously scattered one-per-feature-story across 112 KB; this section plus [data-integrity.md](docs/architecture/data-integrity.md) is the whole list.

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
| a new importer's rating key | `COMMUNITY_SCORE_SOURCES` in `@shared/communityScore.ts` (key + multiplier to 0-100) | otherwise the score never reaches the 0-100 scale; the SQL reader (`repos/communityScore.ts`, used by mediaRepo and the quiz pools) and the franchise pages both derive from that list |
| `src/main/dict/init.sql` | `dictDb.ts` DROP list **and** `ORPHAN_SWEEPS` — a child table's parent id must lead an index or its WITHOUT ROWID key, and an FTS table pairs with the content table it is written beside | the sweep runs on every open and only seeks; guarded by `tests/dictSchemaSync.test.ts`, which fails on a scanning child |
| `src/main/gamesCatalogSchema.ts` | the embedded copy in `scripts/build-games-catalog.cjs` | guarded by `tests/gamesCatalog.test.ts` |
| `electron-builder.yml:fileAssociations` | `classifyPath` in `src/main/openFile.ts` | guarded by `tests/openFile.test.ts` |
| a `webContents.send` / `ipcRenderer.on` channel | `ALLOWED` in `tests/pushBridge.test.ts` | the push surface is deliberately frozen at `player:cmd` + `player:state`; everything else polls |
| an importer's logic or ordering | consider `scripts/bulk-import.cjs` | it duplicates the import pipeline (known debt) |
| `src/main/launchboxCatalogSchema.ts`, `titleKey` or the Bangumi reading parser | their copies in `scripts/build-games-catalog2.cjs` | the games catalog v2 is built by that script; guarded by `tests/launchboxCatalog.test.ts` |
| `repos/personMatch.ts` (romaji folding, `adoptForAniList`) | the port in `scripts/bulk-import.cjs` | the headless AniList importer must adopt VN/game voice actors too; guarded by `tests/personMatch.test.ts` |
| built-in Japanese course content (`src/main/db/japaneseSeed*.ts`) | `SEED_VERSION` in `japaneseSeedVersion.ts` (the test prints the new value) and `japaneseSeedKeys.lock.json` (append new keys; a corrected card front sets `key: '<old front>'`). A course's step is its position in `PACK_ORDER`; never write a `difficulty` literal | the startup content sync runs only when the version changes and matches library rows by those frozen keys; a vanished key orphans the rows already in libraries. Guarded by `tests/japaneseSeedSync.test.ts` |
| a History content file (new or renamed) | `src/shared/history/content/ids.lock.json` (append; a rename adds a redirect) | slugs are frozen: personal marks, notes, links and archive rows key on them. `tests/historyContent.test.ts` fails on an unlocked or vanished slug |
| a History label-table key in `src/shared/history/schema.ts` | never rename it; relabel instead | keys are stored in content files and personal entities, and the validator checks membership |
| a Japanese `QuizKind` literal | `JP_QUIZ_KINDS` in `repos/japaneseRepo.ts` | otherwise the stats page's Journey count silently skips it — guarded by `tests/jpQuizKindsSync.test.ts` |
| a `TaskKind` literal passed to `tasks.create` | the `TaskKind` union in `shared/types.ts` | string-matched, **both directions** — guarded by `tests/taskKindSync.test.ts` |
| a field on `QuizAvailability`/`QuizFootballAvailability`, or a table a quiz availability count newly reads | `FORMAT_VERSION` in `src/main/quizAvailabilityCacheCore.ts`; `AVAILABILITY_TABLES` in `repos/quizRepo.ts` | the persisted availability cache is served before the session's rebuild and its app-version stamp does not move on a `git pull` build, so an old-shaped file reaches new renderer code; the fingerprint sees only the listed tables |
| anything in `src/main/**` | it must not call `console.*` | there is no console in a packaged build; use `logInfo/logWarn/logError` from `logBus.ts`. Guarded by `tests/noConsole.test.ts` |
| a setting key that holds a machine path, tool location or local service URL | `MACHINE_LOCAL_SETTING_KEYS` in `src/main/libraryBackupCore.ts` | a restore would otherwise carry another machine's folders over; guarded by `tests/libraryBackup.test.ts` |
| a Settings card (a `SettingCard`/`TextSetting`/`QuietWorkspace` title under `pages/settings/`) | its entry in `lib/settingsCatalog.ts` | it is otherwise unsearchable and has no anchor; guarded by `tests/settingsCatalog.test.ts` |
| a provider credential setting | `SECRET_SETTING_KEYS`, the Settings input, and `scripts/sanitizeSql.cjs` | otherwise plaintext can reach the renderer/export or a secret may bypass migration; guarded by `tests/secretStorage.test.ts` |

### The before-quit registry

`src/main/index.ts` — **twenty-two calls, and the order is load-bearing**:

```
settleAllTasksOnQuit
→ cancelActiveFootballSync → cancelHistoryJobs → cancelModJobs → cancelRomScan
→ killActiveMusicDownload → killActiveUpdate
→ killActiveOcr → cancelActiveLibraryExport → cancelActiveLibraryBackup → cancelActiveStorageMove → cancelSlideshowSync → killSqlSandbox → stopActiveTts → stopQuizPools → stopAchievementWatcher → finalizeActiveGameSession
→ closeDatabase → closeCatalogDb → closeLaunchboxDb → closeDictDb
→ stopFileSink
```

`settleAllTasksOnQuit()` is **first**: it stamps every live task "cancelled (app quit)" before the killers below produce SIGKILL exit codes that the subsystems' own status objects would report as errors the user never caused. `stopFileSink()` is **last** and synchronous: every step above can log, and this is the flush that gets those lines onto disk.

Why each step sits where it does, the startup counterpart (`runStartupMaintenance()`) and the achievement watcher's one `setInterval`: [main-process.md](docs/architecture/main-process.md) "Before-quit registry". **Any new long-running main-process singleton adds its killer here.**

### Never do these

- **`window.confirm` / `alert` / `prompt`** — Electron renders them as native OS modals that steal keyboard focus, and on Linux the page often never gets it back. This is what the month-long "sometimes I can't type in the app" report was. Use `confirmDialog()` from `lib/confirm.ts`.
- **Reading or writing a protected setting with direct SQL** — it bypasses decryption or writes plaintext. Main-process consumers use `settingsRepo.get`; renderer writes go through `settings:set`; headless maintenance scripts accept an explicit environment value.
- **`dangerouslySetInnerHTML`** — markdown and EPUB content go through the parsers in `@shared/markdown.ts` / `BookContent`, which whitelist tags.
- **Emoji or decorative glyphs** — see Standing user directives.
- **`href="#…"`** — in-app links are `#/…` hrefs owned by the tab router, so an anchor hash breaks navigation; scroll imperatively with `scrollIntoView`.
- **`window.location.hash = …`** — nothing listens for `hashchange`; the active tab would not move. Navigate with `useNavigate()`; `tests/browserTabs.test.ts` fails on any hash assignment.
- **`.sort(() => Math.random() - 0.5)`** — a biased shuffle (slot 1 gets index 0 36% of the time). Use `shuffle()` from `src/shared/shuffle.ts`; `tests/shuffle.test.ts` fails on the comparator anywhere under `src/`.
- **`npx vitest` / `npx tsc`** — these bypass the repository's Electron native smoke, split test configs and project typechecks. Use `npm run test` / `npm run typecheck`.
- **Query keys built inline** — only from `lib/queryKeys.ts` (`qk`), and each group's `all` key must stay a prefix of every key in that group or invalidation silently misses.
- **A caller-supplied `signal` on `fetchWithRetry`** — it wins over the per-attempt timeout, making one deadline span every retry. Pass `timeoutMs`.
- **`console.*` anywhere in `src/main`** — invisible in a packaged build, and it bypasses the log file the user can actually read. Use `logInfo`/`logWarn`/`logError` from `logBus.ts`; `tests/noConsole.test.ts` enforces it.
- **Importing electron from `logCore.ts` / `logBus.ts` / `tasks.ts` / `taskControls.ts` / `childLines.ts`** — `http.ts` and `db/connection.ts` log through `logBus`, and their tests run with no electron mock. One electron import there reddens a large share of the suite. `logFile.ts` is the deliberate exception.
- **`proc.kill('SIGSTOP')` without a platform gate** — Node has no signals on Windows, where that call IGNORES the name and **terminates the process**. Go through `processControls()` in `taskControls.ts`, which sends SIGCONT before SIGTERM on signalling platforms and uses `taskkill /T /F` for the complete process tree on Windows.
- **`productName` in `package.json`** — it lives ONLY in `electron-builder.yml`; adding it changes the userData folder name and orphans the user's library.

### Process spawn safety

Every spawn uses an argv array. yt-dlp keeps `--` before the user URL. **ffmpeg has no `--` terminator**, so it uses `assertSafeArgPath` (absolute, not `-`-leading) *and* a `file:` prefix on every path — the latter is what `--` would not have fixed, since ffmpeg reads `foo:bar` as protocol `foo` (`re:zero 01.mkv`, any Windows `C:\`).

### Data-integrity rules, personal state and frozen keys

**Read [data-integrity.md](docs/architecture/data-integrity.md) before any delete, prune, partial refresh, re-import, scanner, progress write, image override, folder move or stored key change.** It holds the rules that stop silent data loss (for example: a partial refresh runs NO DELETE; scanners refuse a zero-file walk; every `qk.media.home(type)` consumer keeps `{ mediaType }` byte-identical), personal hobby state, learning evidence, and every frozen key string.

## Known open issues

Written down because a vague report ("sometimes I can't type in the app") once sat undiagnosed for 33 days. Add to this list rather than letting a symptom live only in a chat log.

- **Native file/folder pickers may steal keyboard focus.** `dialog.showOpenDialog` in main is the same class of native modal as the `window.confirm` bug that was fixed on 2026-08-12, and none of the call sites passes the main window as a parent. **Unreproducible on the VPS** (no display) — if the user reports the typing bug again after 0.18.x, this is the first suspect.

- **Electron 44 segfaults at launch under Wayland on the laptop** (2026-09-26). `electron .` exits with SIGSEGV right after a GTK `font-antialiasing` schema warning, before any app code runs; `--ozone-platform=x11` starts normally. Not caused by app code. If the desktop shortcut or a dev launch dies silently, this is the first suspect.

Fuller detail, with measurements, is in [`docs/review/`](docs/review/) — see [`docs/review/STATUS.md`](docs/review/STATUS.md) for what has already shipped.

## Misc gotchas

- Right-click: text keeps the native cut/copy/paste menu built in `createWindow` (main/index.ts `context-menu` listener); everything else is the renderer-drawn `ContextMenu`. A component with its own menu claims the event with `preventDefault()`; otherwise `GlobalContextMenu` (shell branch only, window bubble phase) gives any in-app link Open / Open in new tab / Open in new tab and switch, plus the palette's title actions (`lib/mediaQuickActions.ts`) for a title link. It skips editable targets, selected text and open modals. Open menus at `contextMenuPoint(e)` so the Menu key and Shift+F10 work.
- `music-metadata` is ESM-only while the main bundle is CJS — it's loaded via lazy `await import()` in music.ts; don't convert to a top-level import.
- **No Prettier config exists either** — `npx prettier --write` therefore applies Prettier's DEFAULTS (semicolons, double quotes) and silently rewrites the file against house style (no semicolons, single quotes, width 100, no trailing commas). This bit once, 2026-08-16. If you must run it: `npx prettier --write --no-semi --single-quote --print-width 100 --trailing-comma none --arrow-parens always`.
- No ESLint config exists; eslint-disable comments are inert.

## Reference index

Per-subsystem detail lives in [`docs/architecture/`](docs/architecture/00-index.md). Read only the file for the area you are touching. Its current subsystem contracts must be preserved unless the user's task explicitly changes them; unrelated architecture files stay unloaded. Four of them load automatically: `src/main/`, `src/renderer/` and `src/shared/` each hold a mirrored `CLAUDE.md`/`AGENTS.md` pair that imports `main-process.md`, `data-integrity.md` and `adding-features.md` (main), `renderer.md` (renderer) or `data-integrity.md` (shared) when an agent works there. Edit the architecture file, never the nested pair.

| Working on… | Read |
|---|---|
| Any delete, prune, partial refresh, re-import, scanner, progress write, image override, folder move or stored key | [data-integrity.md](docs/architecture/data-integrity.md) |
| Anything under `src/renderer/` | [renderer.md](docs/architecture/renderer.md) |
| A new media type, section, overlay or importer | [adding-features.md](docs/architecture/adding-features.md) |
| IPC handlers, utility processes, long-running jobs, shutdown order | [main-process.md](docs/architecture/main-process.md) |
| A media type, wallpapers/fan art and the Gallery (formerly Pictures), books, game launch + playtime, achievements, seasonal, list filters | [media-types.md](docs/architecture/media-types.md) |
| A games importer (RAWG → IGDB → Steam history, the games catalog v2, Bangumi cast, the games upgrade) | [importers.md](docs/architecture/importers.md) |
| Emulators, linked game files, the game-folder scan, native ports, session screenshots, GameBanana mods and the install ledger | [emulation.md](docs/architecture/emulation.md) |
| Manga scanner, EPUB books, the readers, mokuro OCR | [readers.md](docs/architecture/readers.md) |
| Linked local videos, the in-app player and its decode gate, external playback, metadata, subtitles and mining | [video.md](docs/architecture/video.md) |
| "Open with NaviHUB", double-click handling, desktop registration | [file-associations.md](docs/architecture/file-associations.md) |
| Japanese — packs, drills, SRS, ghosts, i+1 feed, kana keyboard | [japanese.md](docs/architecture/japanese.md) |
| English — dictionaries, SRS, drills, writing feedback | [english.md](docs/architecture/english.md) |
| Programming — courses, cheatsheets, CLI drill | [programming.md](docs/architecture/programming.md) |
| Wrestling — the Wikipedia importer, matches, local collection | [wrestling.md](docs/architecture/wrestling.md) |
| Football — history/current sources, journal, media, quizzes | [football.md](docs/architecture/football.md) |
| History — content rule, schema and validator, the lazy catalog, timeline and articles, personal layer, archive, research sessions | [history.md](docs/architecture/history.md) |
| Torrent search, or the bulk importer | [torrents-bulk.md](docs/architecture/torrents-bulk.md) |
| Theme songs, music, the tournament bracket | [music-quiz.md](docs/architecture/music-quiz.md) |
| Quotes — the quote book, capture from the book reader and video player, furigana | [quotes.md](docs/architecture/quotes.md) |
| The checklist, streaks, progress logging | [checklist-progress.md](docs/architecture/checklist-progress.md) |
| The task registry, pause/cancel, the structured log, the Tools menu | [tasks-logs.md](docs/architecture/tasks-logs.md) |
| Shared UI components, the Lain theme, dialogs, menu bar, zoom | [ui-conventions.md](docs/architecture/ui-conventions.md) |
| Packaging, releases, in-app updates, library export | [packaging-ci-updates.md](docs/architecture/packaging-ci-updates.md) |
| Anything that reads the whole library, a deal builder, a hot query, or an image grid | [performance.md](docs/architecture/performance.md) |
| Something that sounds like a feature request | [removed.md](docs/architecture/removed.md) — check it was not deliberately taken out |

**Skills** (`.claude/skills/`) encode multi-step rituals: `add-ipc`, `db-change`, `verify`, `ui-preview`, `local-release`, `history-era` and `wrap`. Follow a matching skill when triggered. `ui-preview` remains explicit-user-request only.
