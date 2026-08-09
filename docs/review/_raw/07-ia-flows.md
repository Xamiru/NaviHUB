# Information architecture & daily flows

Scope: every `<Route>` in `src/renderer/src/App.tsx` (94 routes, 8 chromeless reader/player routes), every entry in `src/renderer/src/components/Sidebar.tsx`, every row in `src/renderer/src/components/CommandPalette.tsx` (`NAV_ITEMS`, 46 static rows), `src/renderer/src/pages/HomePage.tsx`, and the per-type flags in `src/renderer/src/lib/mediaConfig.ts`. Read-only recon; every claim below traces an actual `<Link to=`/`navigate(` call site, not a guess from the route table.

Method: a route counts as "discoverable" if it's reachable from the sidebar, the command palette, **or** a link on a page a user doing normal things (browsing a hub, a detail page, a list) would plausibly land on. Dynamic-id routes reached only via a row/card click from their own index page (e.g. `/people/:id` from a cast card) are not flagged — that's how every browse-to-detail flow in the app works.

---

## Undiscoverable routes

| Route | Reachable from | Verdict |
| --- | --- | --- |
| `/now-playing` | `components/NowPlayingBar.tsx:68` (cover-art link, only when `isMusic`) and `:187` (the `⤢` button) — **both only render while `track` is truthy** (`NowPlayingBar.tsx:41`, `if (!track) return null`) | **Undiscoverable while nothing is playing.** Not in `Sidebar.tsx`, not in `CommandPalette.tsx`'s `NAV_ITEMS` (checked — no `nav-now-playing` row), not linked from `MusicLibraryPage.tsx`, `MusicStatsPage.tsx`, `NowPlayingPage.tsx` itself, or anywhere else (`grep -rn "now-playing"` across `src/renderer/src` returns only the two `NowPlayingBar.tsx` links and comments). There is no way to open the full-page player view except by first starting playback. |

Everything else routes to a genuine entry point once you follow the actual `<Link>`/`navigate()` graph — including routes that looked orphaned from the sidebar/palette alone:

- `/tv` — hidden from the sidebar tree (`mediaConfig.ts:396`, `hideFromSidebar: true`) but present in the command palette (`MEDIA_CONFIGS.map` in `CommandPalette.tsx:23-28` includes TV, label "TV Shows") and reachable via the "TV Shows" tab on `/movies` (`MediaListPage.tsx:101-110`, driven by `MOVIE.listTabs`).
- `/english/vocab`, `/english/spelling`, `/english/reading`, `/english/mechanics` — absent from `Sidebar.tsx`'s English children (only Dictionary/Review/Writing) **and** absent from `CommandPalette.tsx`'s `NAV_ITEMS` (no `nav-english-vocab`/`-spelling`/`-reading`/`-mechanics` rows exist) but all four are one click from `/english` via `EnglishHomePage.tsx:59-78`'s "Tests" grid and again from `QuizLandingPage.tsx:47-64`.
- `/japanese/leeches/drill` — not in the sidebar, palette, or `JapaneseHomePage.tsx`; the only entry points are `JapaneseStatsPage.tsx:163-179` ("Drill these") and `:210-213` ("Drill pair"), both passing router `state`. Counts as discoverable (Stats is a plausible page to be on), but see **Dead ends** below for what happens without that `state`.
- `/gacha/:game/coach` — not in sidebar/palette; reachable only via the per-game `GachaGamePage.tsx:117` "Coach" pill, and only rendered when `cfg.coach` is set (FGO only, per `shared/gacha.ts`).
- `/japanese/courses/:id/edit`, `/japanese/lessons/:id/edit`, `/lists/:id/edit` — each reachable only via an "Edit" button on their own detail page (`JapaneseCoursePage.tsx:63`, `JapaneseLessonPage.tsx:82`, `ListDetailPage.tsx:86`). Normal detail→edit pattern, not flagged.

**Count: 1 undiscoverable route** (`/now-playing`), plus one route (`/japanese/leeches/drill`) that is discoverable but fragile — see Dead ends.

---

## Flow A — Home → Checklist → Japanese review → mine a word → read → log progress

1. Launch → lands on `/` (`App.tsx:170`).
2. Home → Checklist: either the sidebar's "Checklist" link (`Sidebar.tsx:122-124`) or the `ChecklistCard` DoorCard (`HomePage.tsx:309-339`, `to="/checklist"`). One click either way.
3. On `/checklist`, the "Japanese reviews" row is a `detected` item whose label is a `Link` to `task.route` (`ChecklistTaskRow.tsx:34-37`), which for `jp-reviews` is `/japanese/review` (`shared/checklist.ts:59-67`). One click into the review session.
4. `JapaneseReviewPage.tsx`: click "Start review" (`:321`) → flips `phase` in place (no navigation) → grade cards with 1-4/Space → queue drains → `phase = 'done'` (`:173-178`).
   - `- src/renderer/src/pages/JapaneseReviewPage.tsx:346 — the "Done" button on the session-complete screen is a hard Link to /japanese (the section hub), not history-back → a review started from the Checklist (step 3) does not return the user to the Checklist; they land on the Japanese hub instead and must re-open the sidebar to get back to their routine board.` This is the app's one documented back-navigation convention (`BackButton` = `navigate(-1)`, used on every other detail/sub-page per `CLAUDE.md`) not applied here, and it's the exact page most often entered from a non-hub context (the Checklist row link, the Home `JapaneseCard` DoorCard).
5. Mining a word: from the Japanese hub, "Mine words" (`JapaneseHomePage.tsx:195`) → `/japanese/mine`. Look up, fill the draft, "+ Add card" (`JapaneseMinePage.tsx:190-192`) saves and clears the form in place (`onSaved` callback, `JapaneseMinePage.tsx:33-38`) — no dead end, but also no forward link; the user must manually navigate to what they actually came to mine while reading.
6. "Go read/watch something": navigate to a manga/anime detail page (search, Continue strip, or browse), open its media tab, click a chapter/episode. For manga: `MangaChaptersSection.tsx:121` → `readerPath(basePath, m.id, ch)` → chromeless reader. For anime: `VideoEpisodesSection.tsx:69` → `/watch/file/:id`.
7. Log progress — **this is where anime and manga diverge, and the divergence is invisible to the user**:
   - Anime/TV: finishing an episode in the in-app player calls `video.markWatched`, and on the *first* time it becomes watched, `ipc.ts:378-381` calls `checklistRepo.logProgress(res.mediaId, todayLocal())` automatically — the checklist's "Watch an anime episode" `mediaLog` item is credited with zero extra clicks.
   - Manga: `- src/main/manga.ts:403 and :406-424 — finishing a chapter (page-progress autosave) or toggling "mark read" both call only syncMediaProgress(), which advances media_item.progress but never calls checklistRepo.logProgress → reading a manga chapter in the in-app reader raises the title's progress bar but does NOT tick the Checklist's "Read a manga chapter" item, unlike the anime/TV path.` To get checklist credit, the user must go back to the Checklist and use the picker (`ChecklistMediaPickerDialog`, opened via the row's "Log" button, `ChecklistTaskRow.tsx:84-88`) or open the title's detail page and click "+1 chapter" (`MediaDetailPage.tsx`'s `LogProgressButton`, :259-298) — extra work for something they just did. `shared/checklist.ts:88-97`'s own comment documents this was previously auto-detected from `manga_chapter.read_at` and was deliberately changed to `mediaLog`, but the reader-side UI gives no hint that reading no longer counts toward the streak.

**Where the user has to go back to a hub they just came from:** step 4 (Review → hub, not → Checklist). **Where an action leaves them on a dead page:** nowhere outright — but step 7 leaves the user believing they've kept their streak when, for manga, they haven't (silent, not a page-level dead end).

---

## Flow B — Import a title → set status/score → attach a local folder/exe → find it again a week later

1. `/anime` (or any media list) → "Import from AniList" (`MediaListPage.tsx:122-126`) opens `ImportDialog` in place (not a navigation).
2. Type a query, hit Enter/Search, click "Import" on a result (`ImportDialog.tsx:132-138`).
3. `doImport` succeeds → after a 700 ms confirmation pause, `onImported(summary.mediaId)` fires (`ImportDialog.tsx:53`) → `MediaListPage.tsx:141-144` calls `navigate(`${cfg.basePath}/${mediaId}`)` — **pure navigation**, no click, straight to the detail page.
4. Status and score are read-only on the detail page (`StatInline` at `MediaDetailPage.tsx:155-156`) — the only way to change them is "Edit" (`MediaDetailPage.tsx:129-131`), a **pure-navigation click** to `/anime/:id/edit`, a full separate route, just to flip a dropdown and type a number.
5. Set Status + Score on the form, click Save (`MediaFormPage.tsx`) → since editing, `navigate(-1)` (`MediaFormPage.tsx:157`) — **another pure-navigation hop**, back to the detail page.
6. Click the type-specific media tab (e.g. "Chapters"/"Episodes"/"Playtime" — `MediaDetailPage.tsx:59-63` tab set) — an in-page tab switch, not a route change.
7. Click "Link local folder" / "Link video folder" / "Link executable" (`MangaChaptersSection.tsx:130-132`, `VideoEpisodesSection.tsx:78-79`, `GameLaunchSection.tsx:91-93`) → native OS folder/file picker (outside the app's own navigation).
8. A week later, find it again: Topbar search (`Topbar.tsx:20-24`, `/search?q=`), Command Palette (Ctrl/Cmd+K, one keystroke + typing + Enter — the fastest path since results link straight to the detail page, `CommandPalette.tsx:139-143`), or browse the sidebar → list → click the card.

**Click tally for steps 1-7: ~7 clicks**, of which **2 are pure navigation that exist only because status/score can't be edited inline on the detail page** (step 4's "Edit" and step 5's implicit return-nav after Save) — the same round-trip the confirmed Home "Import" chip bug (below) creates for the import entry point itself.

---

## Flow C — Launch a game (Windows-only) → playtime accumulates → reflected in stats/checklist

1. `/games/:id` → "Playtime" tab (`cfg.mediaTabLabel`, `MediaDetailPage.tsx:222-232`) → `GameLaunchSection`.
2. If unlinked: "Link executable" → `api.games.pickExe` (native picker) → `GameLaunchSection.tsx:47-57`.
3. "Play" (`GameLaunchSection.tsx:71-78`) → `api.games.launch` + `session.kick()`, which forces `useGameSession`'s query active (`useGameSession.ts:39`, `refetchInterval` self-gates on `state.data.state === 'running'`).
4. While running, the only visible sign is the chip "Playing · <elapsed> — closes when the game exits" (`GameLaunchSection.tsx:109-113`) on that exact tab of that exact title's detail page.
   - `- src/renderer/src/components/GameLaunchSection.tsx:26-28 — useGameSession() is mounted ONLY inside GameLaunchSection (grep confirms no other page imports it), unlike imports/scans which get a persistent Topbar pill via ActivityIndicator (Topbar.tsx:42-44) → navigating away from that one Playtime tab (Home, another title, Japanese review, anywhere) hides that a session is being tracked at all, and the settled toast ("Session saved — Xh · +Y h", useGameSession.ts:51-58) only fires the next time some instance of the hook happens to remount.` The underlying data is safe (`gameLaunch.ts` records the session server-side on process exit, independent of any renderer being mounted, and `qk.checklist.status`/`qk.media.timeStats` are `staleTime: 0` so a fresh visit to Checklist/Stats always reads correct numbers) — but the user gets no proactive confirmation their play counted unless they happen to revisit that tab.
5. Reflected in Stats: `mediaRepo.ts:312-317` (`rowMinutes`, `case 'game'`) folds `progress` (hours) directly into `TimeStatsCard` (`HomePage.tsx:428-467`) and `StatsPage.tsx`'s leaderboards — correct, no extra click needed once the session has settled.
6. Reflected in Checklist: the "Play a game" `detected` item (`shared/checklist.ts:121-133`) ticks automatically once `game_session` gets a row (`checklistRepo.ts:347-350`).
   - `- src/shared/checklist.ts:130 — the checklist row's label links to route: '/games' (the generic games list, MediaListPage), not the specific title played or a session-history view → clicking "Play a game" on the Checklist to see what counted lands on the full games list, and the user has to remember and re-find the title themselves.`

---

## Flow D — Open a file from the OS ("Open with NaviHUB") → read/watch it → what's possible, what dead-ends

1. Double-click a supported file → OS relaunches/focuses NaviHUB → `OpenFileHandler.tsx` polls `app:pendingOpen` on mount/focus/visibility (`:69-79`) and, for a routed target, calls `navigate(last.route)` directly (`:65`) — **the user never sees `/watch` or any picker page**, they land straight in the chromeless reader/player.
2. Audio has no page at all: it's handed straight to the global player queue under a `file-` id namespace (`OpenFileHandler.tsx:42-55`), deliberately excluded from `MusicPlayLogger`. There is nothing to "do" with it beyond play/pause/skip via the `NowPlayingBar`/`QueuePanel` — consistent with the feature's own framing ("Nothing is saved for one-off files," see below), not a bug.
3. Video/manga/book: the reader mounts with `mediaId`/`chapterId` forced to `0` and an empty sibling library (`lib/readerSource.ts:16,49-53`), so there is no prev/next chapter, no resume position, and (guarded on `chapterId > 0`/`fileId`) **no progress is ever saved** for that file.
   - `- src/renderer/src/components/OpenFileHandler.tsx:59-66 — an OS-opened file is routed straight into the reader/player, bypassing WatchLandingPage.tsx entirely, so the user never sees WatchLandingPage.tsx:26's "Nothing is saved for one-off files — attach a folder... if you want resume positions" warning → the only way to discover that a double-clicked video/manga/book won't remember where you left off is to close it and reopen the same file later and find it starts over. The warning exists in the codebase; it's just wired to the wrong entry point for this flow.`
4. Exit behavior is asymmetric by design: an ad-hoc video with no `mediaId` exits to `/watch` (`VideoPlayerPage.tsx:418-423`, still a video-relevant landing page with its own "Choose a video file…" action), but an ad-hoc manga/book file with no history to pop exits to `/` — Home (`MangaReaderPage.tsx:266-270`, `BookReaderPage.tsx:175-179`, `navigate(adhoc ? '/' : ...)`). Both are deliberate (documented in `CLAUDE.md`) and not wrong, but the inconsistency means "Back" from an opened video is more useful than "Back" from an opened book/manga file.

---

## Home

`HomePage.tsx` sections, in order: Hero (library-wallpaper + streak chip) → "Today" band (`ChecklistCard`, `JapaneseCard`, `EnglishCard`, `PlayCard`) → Continue (in-progress, capped 12) → Spotlight (day-stable backlog pick) + right rail (`TimeStatsCard`, `MusicCard`) → `TopPeople` (top VAs/studios) → Recently added (capped 10) → Favorites (capped 12) → `LibraryGlance` ("Browse & add").

**What it surfaces well:** Japanese/English SRS due-counts, today's checklist completion + streak, an always-fresh "continue this" strip, and a daily-seeded backlog pick that doesn't require deciding anything.

**What it doesn't surface that a daily user would want:**
- `- src/renderer/src/pages/HomePage.tsx:309-339 — ChecklistCard only reads data.daily (line 315); ChecklistStatus.weekly is never touched → Home shows "3 of 5 done today" but gives zero visibility into open WEEKLY items until the user opens /checklist itself, even though the same query (qk.checklist.status) already carries them.`
- No indicator of an in-progress, currently-tracked game session (Flow C, finding 4) — if a session is running and the user is on Home, there is nothing on the page hinting at it, even though a `game-session` checklist row exists.
- Programming (`prog_progress`, a whole Learn vertical with its own progress tracking) has zero presence on Home — no DoorCard, no strip, not even in `LibraryGlance` (which only lists `MEDIA_CONFIGS`). Reasonable if Programming isn't meant to be a daily habit like the SRS decks, but it's a silent omission worth naming since Japanese/English both got dedicated cards.

**What earns space but arguably shouldn't, on a page meant to be opened multiple times a day:**
- `LibraryGlance` (`HomePage.tsx:595-642`) re-lists all 7 media types with counts and Import/Add chips at the very bottom of the page — functionally a duplicate of the always-visible sidebar tree, and its "Import" chip carries the two-navigation bug documented below. For a page whose upper two-thirds is about "what to do right now," a static full-catalog browse grid at the bottom is the section least likely to get used after the first few visits.
- `TopPeople` (`HomePage.tsx:511-566`) is a nice one-time "your taste" curiosity but is effectively static day to day (rankings barely move) and takes a full-width card plus a horizontal-scroll rail every single visit.

---

## Sidebar

`Sidebar.tsx` top cluster (Home/Checklist/Stats) is correctly minimal and all three are genuinely daily-use.

**LIBRARY:** 6 visible `MediaSection`s (TV correctly folded into Movies via `hideFromSidebar` + `listTabs`) + Music + Lists + Tags. All earn their slot — these are the app's core inventory.

**LEARN is where sidebar coverage falls furthest behind route count, and the gap tracks inversely with how often the underlying feature is used:**

- **Japanese: 5 sidebar children (Roadmap/Review/Dictionary/Drills/Guide) vs. ~30 routes.** The gap is fully closed by `JapaneseHomePage.tsx`'s hub grid (every route is one click from there), so nothing is *undiscoverable* — but `Guide` (`Sidebar.tsx:175`, a reference page you'd read once) occupies a sidebar slot while `/japanese/mine` — the action described as happening constantly *while reading* throughout the codebase's own commentary — is not in the sidebar at all and requires either the hub or the command palette every time. Swapping `Guide` for `Mine` in the sidebar's children list would better match actual usage frequency without growing the tree.
- **English: 3 sidebar children (Dictionary/Review/Writing) vs. 8 routes.** The four Tests (`/english/vocab`, `/spelling`, `/reading`, `/mechanics`) — the section's explicitly test-first raison d'être per its own `EnglishHomePage.tsx` subtitle ("Look words up, save them, then let the tests and reviews make them stick") — have no sidebar presence and no command-palette rows, only the `/english` hub. Given the section exists specifically *because* the user wanted tests over courses, at least one test route (e.g. the frequency-band vocab quiz, the most "start here" of the four) earning a sidebar slot would match the section's own stated purpose better than `Writing` (an occasional, higher-effort activity) taking a slot alongside Dictionary/Review.
- **Programming: 2 sidebar children (Cheatsheets/CLI practice) vs. 5 routes.** Reasonable as-is — the missing routes are per-course pages, which don't enumerate cleanly into a flat sidebar list (unlike Gacha's per-game children, which the config supports because there are only 4 games).

**PLAY:** Quiz (flat link into a hub that itself lists every quiz type) and Gacha (per-game children) both earn their slots as designed.

**Footer:** Torrents + Settings — both low-frequency-but-findable, correctly demoted below the fold.

---

## Two navigations for one intent

- `src/renderer/src/pages/HomePage.tsx:631-635` — the "Import" chip on every media type's `GlanceCard` is `<Link to={cfg.basePath}>Import</Link>` → it only navigates to the list page; the user must then find and click "Import from {source}" at `src/renderer/src/pages/MediaListPage.tsx:122-126` to actually open the dialog the first click promised. This repeats for all 6 visible media types (every `MEDIA_CONFIGS` entry with `importSource` set), so it's not a one-off — it's the Home page's standard "Import" affordance across the whole library. Compare with the correctly-direct "Add {singular}" chip right next to it (`HomePage.tsx:636-638`), which links straight to `${cfg.basePath}/new`, the actual form.
- `src/renderer/src/pages/HomePage.tsx:409-416` (`PlayCard`) — when gacha tasks are due, the card reads "N game task(s) waiting… Dailies and goals your coach is tracking" and links to `/gacha`, the hub grid of game cards. To actually see what's due, the user must (a) spot the small red due-badge on the one game card that has `cfg.coach` set (`GachaHomePage.tsx:76-83`, FGO only today), (b) click into that game, then (c) click the "Coach" pill (`GachaGamePage.tsx:117`) to reach `/gacha/fgo/coach`, where the reminders actually live in the chat thread. Three navigations to fulfill a card whose label implies the tasks are one click away.
- `src/renderer/src/pages/MediaListPage.tsx:304-308` — half of a two-nav-for-one-intent pattern in the other direction: the "Nothing matches these filters" `EmptyState` tells the user to "clear a chip," but if the empty result came from a plain title search with **no** active filter chips (`nFilters` doesn't count `debouncedSearch`, see the gate at `:82` and `:232`), the "Clear all" control at `:288-297` never renders at all (it's inside `{nFilters > 0 && (...)}`) — the guidance references a control that isn't on screen, and the only way out is to notice and manually clear the search box.

---

## Dead ends

- `src/renderer/src/pages/JapaneseReviewPage.tsx:346` — session-complete "Done" hard-navigates to `/japanese` instead of history-back, discarding the entry context (Checklist row, Home DoorCard, hub Continue button) every time — see Flow A.
- `src/renderer/src/components/OpenFileHandler.tsx:59-66` combined with `lib/readerSource.ts:16,49-53` — an OS-opened video/manga/book plays/reads with no progress persistence and no in-context warning that it won't be remembered (the warning text exists but lives on a page — `WatchLandingPage.tsx:26` — this flow never visits). Not a page-level dead end, but a silent one: the user only discovers it by losing their place.
- `src/renderer/src/pages/JapaneseStatsPage.tsx:163-179` → `/japanese/leeches/drill` — the route depends on router `state.items` passed from Stats; `JapaneseLeechDrillPage.tsx:32-41` does fall back to `api.japanese.listLeeches()` when `state` is absent, so a direct/refreshed visit degrades gracefully rather than breaking — flagged here only because it's the one route in the app whose primary designed entry point is a `navigate(..., { state })` call rather than a plain `Link`, making it invisible to anyone reading the sidebar/palette/hub graph (see Undiscoverable routes).
- `src/renderer/src/components/MediaCard.tsx` — the one card component used for every strip/grid in the app (Continue, Recently added, Favorites, list pages) is a single `<Link>` with no inline quick actions (no "+1 episode," no status change) — consistent and not a bug, but it means every "Continue watching X" click is a full page load just to find the log button, reinforcing why Flow A/B's extra clicks land where they do.

---

## The five changes that would most reduce daily friction

1. Make finishing a manga chapter in the in-app reader credit the Checklist's "Read a manga chapter" item the same way finishing an anime episode already does (`manga.ts:403/406-424` vs. `ipc.ts:378-381`) — right now reading manga silently doesn't count toward the streak the user visibly tracks.
2. Make the Home "Import" chip open the import dialog directly instead of landing on the list page and requiring a second, differently-labeled click (`HomePage.tsx:631-635` → `MediaListPage.tsx:122-126`), across all 6 media types it appears on.
3. Return `JapaneseReviewPage`'s "Done" button to wherever the session was entered from (history-back, like every other sub-page's `BackButton`) instead of hard-coding a jump to `/japanese` (`JapaneseReviewPage.tsx:346`).
4. Surface a persistent indicator for a running/tracked game session — mirroring the Topbar's `ActivityIndicator` for imports — so leaving the one Playtime tab that mounts `useGameSession` doesn't hide that a session (and its playtime) is being tracked (`GameLaunchSection.tsx:26-28`).
5. Route "Open with NaviHUB" video/manga/book files through (or at least surface) the same "progress won't be saved" warning `WatchLandingPage.tsx:26` already has, instead of silently discarding position on every ad-hoc-opened file (`OpenFileHandler.tsx:59-66`).
