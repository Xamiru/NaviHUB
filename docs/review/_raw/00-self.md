# Self-verified findings (reviewer's own reading, not a subagent's)

Everything in this file was read and confirmed in source by the reviewer directly.

---

### Shutdown closes the DB, then reopens it to write the game session
`med` | `verified` | `src/main/index.ts:242-269`
`window-all-closed` calls `closeDatabase()` + `closeDictDb()` and *then* `app.quit()`, which emits
`before-quit`, which calls `finalizeActiveGameSession()` (`src/main/index.ts:266`) — a DB write
(`gameLaunch.ts:56` → `gameSessionRepo.recordSession`). `closeDatabase()` nulls `_sqlite`/`_db`
(`src/main/db/connection.ts:201-203`) and `getSqlite()` lazily calls `initDatabase()`
(`connection.ts:188-191`), so quitting by closing the window with a game session in flight
**re-opens the database and re-runs `initSql` + `runMigrations` + `seedJapanese` + `seedChecklist`**
(`connection.ts:159-181`) just to insert one row, then closes it again at `index.ts:267`. The session
is recorded, so this is a slow/pointless-work bug, not data loss — but the same lazy reopen means any
future before-quit hook that reads the DB silently resurrects a full init on the shutdown path.
Fix: delete `closeDatabase()`/`closeDictDb()` from the `window-all-closed` handler and leave shutdown
entirely to `before-quit` (which already calls both, in the right order).

### `MAX_INTERVAL_DAYS` reviews ignore how overdue a card was — CLAUDE.md claims otherwise
`med` | `verified` | `src/shared/srs.ts:65`, `src/main/repos/japaneseRepo.ts:561-585`
`gradeCard(state, grade)` takes only the stored SRS state; `submitReview` passes
status/learningStep/intervalDays/ease/reps/lapses and **never** the due date or elapsed days
(`japaneseRepo.ts:569-579`), so a card 30 days overdue answered `good` gets
`round(intervalDays * ease)` off its *scheduled* interval, exactly as if answered on time. CLAUDE.md's
backlog-cap note ("SM-2 handles lateness natively — NO postponement writes") is false for this
implementation; real SM-2/Anki adds an overdue bonus. Consequence for a user who skips a week: the
whole backlog is scheduled as if it were never late, so intervals systematically under-grow.
Fix: pass elapsed days into `gradeCard` and use `max(intervalDays, elapsedDays)` as the multiplier
base for `good`/`easy` (Anki's `lateBonus`), or drop the claim from CLAUDE.md.

### 18 MB of fonts ship in every build; roughly half can never be loaded
`low` | `verified` | `src/renderer/src/pages/BookReaderPage.tsx:21-22`
`@fontsource/noto-serif-jp/400.css` + `600.css` emit 496 files / **18 MB** into
`out/renderer/assets` (measured: `du -ch out/renderer/assets/noto-serif-jp*`) — 124 unicode-range
subsets × 2 weights × {woff2, woff}. Chromium 126 always picks woff2, so every `.woff` (~half the
bytes) is dead weight in the AppImage/NSIS payload, and the CJK subsets beyond the ones the user's
books actually contain are never fetched either. Total renderer output is 21 MB, of which 18 MB is
this one font. It also inflates every self-update download.
Fix: import `@fontsource/noto-serif-jp/japanese-400.css`+`japanese-600.css` (subset-scoped entry
points) instead of the full `400.css`/`600.css`, or vendor a single subsetted woff2.

### Renderer is one 2.4 MB chunk — no route-level code splitting
`low` | `verified` | `src/renderer/src/App.tsx:11-93`
All 79 pages are static imports at the top of `App.tsx`, so `out/renderer/assets/index-*.js` is a
single 2,385,314-byte bundle containing every English passage (`shared/english/passages.ts`, 1292 LOC),
every programming course (`goCourse.ts` 1685, `shellCourse.ts` 838, `sqlCourse.ts` 768, `gitCourse.ts`
735, `dockerCourse.ts` 712, `regexCourse.ts` 636, `cheatsheets.ts` 1026) and all content data, parsed
on every cold start before Home paints.
Fix: `React.lazy` the three learn verticals + gacha + the readers (they are already route-isolated),
which is where the content-as-code weight sits.

### Home's "Import" chip doesn't import — it goes to the list page
`med` | `verified` | `src/renderer/src/pages/HomePage.tsx:631-635`
`GlanceCard` renders an `Import` chip whose `to` is `cfg.basePath` — the exact same destination as
the card's title link right above it. The import dialog is local state on the list page
(`MediaListPage.tsx:122-124` renders the button, `:137` gates `showImport`), with no URL entry point,
so "Import" costs a navigation and then a second click on a differently-labelled button.
Fix: read `?import=1` in MediaListPage (`useSearchParams`, the `?tab=` idiom already used by
MediaDetailPage/SettingsPage) and point the chip at `${cfg.basePath}?import=1`.

### The video player's landing page has no sidebar entry
`low` | `verified` | `src/renderer/src/components/Sidebar.tsx:106-215`, `App.tsx:309`
`/watch` (`WatchLandingPage`) is routed and has a CommandPalette entry
(`CommandPalette.tsx:36`) but appears nowhere in the sidebar, so the only ways to reach the local
video player are Ctrl+K, a media detail page's Playtime/episodes tab, or double-clicking a file in
the OS. For a feature this large that is close to invisible.
Fix: either a `Watch` link next to Torrents in the sidebar footer, or drop the standalone landing
page and let the file-open path be the only entry (it is the one that actually gets used).

### English's four test pages are absent from the command palette
`low` | `verified` | `src/renderer/src/components/CommandPalette.tsx:69-72`
The palette lists 22 Japanese destinations but only 4 English ones (`/english`,
`/english/dictionary`, `/english/review`, `/english/writing`). `/english/vocab`, `/english/spelling`,
`/english/reading` and `/english/mechanics` — i.e. the tests the vertical was built around — are
reachable only by first landing on the English hub.
Fix: four more `NAV` rows; they are pure data.

### Every list query is unbounded and ships synopsis + metadata for every row
`med` | `verified` | `src/main/repos/mediaRepo.ts:213-226`
`mediaRepo.list` is `SELECT m.* … ORDER BY …` with no LIMIT/OFFSET, and `MediaItem`
(`src/shared/types.ts:28-51`) carries `synopsis`, `notes` and the `metadata` JSON blob. HomePage runs
**seven** of these at once (`HomePage.tsx:46-51`, one per `MEDIA_CONFIGS` entry) and derives all its
sections in JS. At a few hundred titles this is the deliberate "it's a local DB, pulling the full
list is cheap" trade the comment claims; at 10k titles with AniList/TMDB synopses (1-3 KB each) it is
tens of MB structured-cloned across IPC on every Home mount, plus a full re-sort of the array in
`useMemo` (`HomePage.tsx:58-79`).
Fix: a `columns: 'card'` flag on `MediaListFilter` that selects the ~10 fields the cards actually
render, used by HomePage and MediaListPage; detail pages keep `SELECT *`.

## Educational (reviewer's own reading)

### "Comprehension" is deck coverage, and reads ~0% for anyone with prior knowledge
`high` | `verified` | `src/main/repos/coverageRepo.ts:28-37`
`TIER_CTE` derives every knowledge tier exclusively from `jp_card` × `jp_lesson` — a word counts as
`known` only if a card exists for that exact front AND its lesson is `learned = 1` AND the card
reached `status = 'review'`. There is no notion of "words I already knew before this app existed".
So the number surfaced as comprehension (`JpCoverageDetail.tiers.known`) is really *the share of the
text covered by my SRS deck*. A learner who can already read N5 vocabulary but has 40 cards will be
told they understand 3% of a series they can mostly follow, and the "what can I read next" ordering
in `coverageList()` (`:243`) inherits the same bias.
Fix: add a fourth known source — a settings-backed "assume the top N frequency words known" baseline
(the `freq` table is already in `dictionaries.db`) unioned into `TIER_CTE`/`knownWordSet`, plus an
explicit "I already know this" mark that writes a card at `status='review'` in a pre-learned lesson.

### The i+1 feed is structurally empty until the deck is large
`high` | `verified` | `src/main/jpFeed.ts:87-119`, `src/main/jpFeed.ts:213`
`known` comes from `knownWordSet(2|3)` — again, cards only. The exact pass keeps a sentence only when
`unknowns.length === 1` (`:113`). With a small deck almost every Tatoeba sentence has 3-8 unknown
learnable words, so the eligible set is limited to sentences containing exactly one content word. The
flagship "comprehensible input on tap" page therefore does nothing for the first several months of
study and comes alive only once the deck passes roughly a thousand known words — the exact inverse of
when a learner needs it.
Fix: same baseline as above (seed `known` from frequency rank ≤ N), and/or expose the `unknowns`
control as 1|2|3 so a beginner can run an i+2 feed instead of an empty i+1 one.

### The feed rebuilds (~2-3 s, 110k-row scan) after every single review
`med` | `verified` | `src/main/jpFeed.ts:184-192`
`knowledgeFingerprint()` includes `MAX(jp_card.updated_at)`, and `submitReview` writes
`updated_at = datetime('now')` on every grade (`src/main/repos/japaneseRepo.ts:584`). So one review
invalidates the whole feed cache, and the next `/japanese/feed` visit re-loads every row of
`sentence_fts` (`jpFeed.ts:198-210`) and re-tokenizes up to 4000 sentences. Reviewing is the single
most frequent action in the app.
Fix: fingerprint on the things that change the *known set* — `COUNT(*)`, `COUNT(*) FILTER (status =
'review')` and the learned-lesson count — not on `updated_at`.

### The "JLPT checkpoint test" measures the app's own seed deck, not the level
`med` | `verified` | `src/renderer/src/pages/JapaneseTestPage.tsx:11-17`
30 multiple-choice items drawn from the seeded courses whose level chip matches, scored "≥80% = you
own this level". Real JLPT is vocabulary + grammar + reading + listening under time pressure; this is
vocabulary recognition over a fixed local list the user is simultaneously SRS-ing, so a high score
mostly confirms the deck was studied. The framing ("it measures the level, not your study progress")
is the opposite of what the code does.
Fix: keep the drill, rename it to what it is (e.g. "N4 deck check") and drop the "you own this level"
verdict, or add grammar items from `grammar_point` (already levelled N5-N1) and a reading item from
the sentence bank so the mix at least resembles the exam.

## Glyph audit (reviewer's own sweep)

### `MediaConfig.icon` is a required field, filled with 20 glyphs, rendered nowhere
`med` | `verified` | `src/renderer/src/lib/mediaConfig.ts:10`, `:35`
`icon: string` is declared **required** on both `MediaConfig` (`:10`) and the child-link type (`:35`),
and is populated 20 times (`▶ ▤ ✦ ❖ ⬚ ▦ ▣ ❆ ♫ ☻ ♪ ⌂ ✎ ✪`). A repo-wide grep for `.icon` outside
mediaConfig.ts returns **nothing** — the sidebar renders `cfg.sidebarLabel ?? cfg.plural`
(`Sidebar.tsx:99`) and children render `c.label` (`Sidebar.tsx:86`). So the type still forces a
decorative glyph on every new media type and every new child link, in a codebase whose stated rule is
that none of them may ever be shown. CLAUDE.md says "`MediaConfig.icon` is no longer rendered
anywhere" — true, but it is still *required*, which is the part worth fixing.
Fix: delete `icon` from both interfaces and the 20 literals.

### Decorative glyph prefixes survive on error/status text
`low` | `verified` | `src/renderer/src/components/ImportDialog.tsx:106`,
`src/renderer/src/components/ImageBrowseDialog.tsx:157`, `src/renderer/src/pages/SettingsPage.tsx:703`,
`src/renderer/src/components/MusicDownloadDialog.tsx:53`
Four places still prefix a message with a picture: `⚠ {error}` (three sites) and
`⬇ {percent}%`. These are exactly the "button-label prefixes" the 2026-08-01 purge claims to have
removed; the text is already red / already in a download dialog, so the glyph carries no information.
Fix: drop the four characters.

### CORRECTED — reader/player icon buttons are NOT missing accessible names
`low` | `verified` | `src/renderer/src/components/reader/BarButton.tsx:14-25`
I initially suspected `BarButton label="⛏"` and the `☰` queue toggle were unlabelled. They are not:
`BarButton` sets `aria-label={title}` **and** `aria-pressed={active}` (`BarButton.tsx:19-20`), and
`NowPlayingBar.tsx:184` carries its own `aria-label="Queue"`. A separate sweep of every icon-only
button in the renderer found zero missing labels. The remaining objection to `⛏` is purely visual:
every sibling button in the same two toolbars uses a text label (`+`, `−`, `?`, `Single`/`Double`/
`Scroll`, `Aa`), so the pickaxe is the only picture in a text HUD.
Fix: `label="Mine"`.

## Dead things (reviewer's own sweep)

### `theme` is still seeded into every DB although the theme switcher is gone
`low` | `verified` | `src/main/db/connection.ts:34`
`DEFAULT_SETTINGS` seeds `theme: 'dark'`. The switchable theme (and `lib/theme.ts`) was removed on
2026-07-12; a repo-wide grep for a read of the `'theme'` settings key returns only unrelated hits
(`BookSettingsPopover`'s own localStorage pref, `TournamentEntryKind`, an SQL-course code sample).
Fix: delete the line — `INSERT OR IGNORE` means existing DBs keep a harmless orphan row, or add a
one-line `DELETE FROM settings WHERE key='theme'` to `runMigrations`.

### OMDB is an undocumented fifth movie/TV data source
`low` | `verified` | `src/main/tmdb.ts:70-78`, `:431`
`fetchOmdb` reads `omdb.api_key` and calls `omdbapi.com` during the TMDB import to enrich ratings,
with its own Settings card (`SettingsPage.tsx:379-388`) and its own sanitize entry
(`sanitizeSql.cjs`). CLAUDE.md's importer list ("`anilist.ts`, `tmdb.ts`, `vndb.ts`, `rawg.ts`,
`themes.ts`, `hltb.ts`") never mentions it, and neither does the movie/TV section — so the one place
that documents which APIs the app talks to is missing one.
Fix: documentation only.

### A malformed score field is silently graded 0 instead of erroring
`med` | `verified` | `src/main/englishWriting.ts:42-45`, `:106`
`clampScore` maps anything non-numeric — including the string `"8"` a model may well emit — to **0**,
and the stored `en_writing.score` is the mean of the four clamped values (`:106`). So a reply that is
structurally fine but types one score as a string is persisted as a 0-2 grade with no error anywhere.
`parseFeedback` is otherwise strict enough to throw on unreadable output, which makes this the one
silent-corruption path in the module.
Fix: `Number(v)` before the finite check, and throw (like the unreadable-reply branch) when a score
key is absent entirely rather than defaulting to 0.

### Corrections are rendered without checking they quote the actual submission
`med` | `verified` | `src/main/englishWriting.ts:62-70`
`parseFeedback` keeps any correction whose `before`/`after` are strings; nothing checks that `before`
occurs in the submission. The page renders these as before/after rows, so a hallucinated or
paraphrased `before` is shown to the learner as *their own sentence*, with a rule attached — the worst
possible failure mode for a tool whose whole job is telling someone what they wrote wrong.
Fix: `.filter((c) => submission.includes(c.before))` (pass `submission` into `parseFeedback`), and
surface dropped ones as a count rather than silently.

### The submission length is never bounded before it goes to the model
`low` | `verified` | `src/main/englishWriting.ts:92-100`
`getWritingFeedback` checks only `text.trim()` non-empty, then sends it with `maxTokens: 2048`. The
prompts cap at 300 words (`shared/english/writingPrompts.ts:16`), but nothing enforces that: a pasted
2000-word text produces a reply whose `modelRewrite` alone exceeds the token budget, gets truncated
mid-JSON, and dies in `parseFeedback` as "unreadable reply" — a confusing failure for what is
actually a length problem.
Fix: reject over `maxWords * 1.5` with the real reason before spending the call.

## Programming content (reviewer's own spot-check)

### `docker images ls` is accepted as a correct answer and is not a real command
`med` | `verified` | `src/shared/programming/cheatsheets.ts:624`
`answers: ['docker images', 'docker image ls', 'docker images ls']`. The first two are correct; the
third is not a form of the command — `docker images ls` parses `ls` as a repository-name filter, so it
lists images *named* `ls` (i.e. nothing) and exits 0, which is exactly the kind of wrong-but-quiet
command a drill should never reinforce. The CLI practice drill accepts it as correct
(`pages/CliPracticePage.tsx` compares against the `answers` array).
Fix: delete the third entry.

### No interval fuzz — cards introduced together stay clumped forever
`med` | `verified` | `src/shared/srs.ts:104-123`, `:50-52`
Every review-state branch returns a deterministic `intervalDays` (`round(interval × ease)` etc.), and
`capDays` only clamps — there is no randomization anywhere in the module. Anki adds ±5-25% fuzz for
exactly one reason: without it, a batch of cards first seen on the same day is rescheduled to the same
day at every subsequent step, so the daily load oscillates between nothing and an avalanche instead of
levelling out. This app introduces cards in batches by design (`buildCoreDeck`, `buildPrepDeck`,
`setLessonLearned` flips a whole lesson at once), which is the worst case for the missing fuzz.
The `dueCap` backlog pill (`JapaneseReviewPage.tsx:64`) is treating the symptom.
Fix: multiply the computed `intervalDays` by `1 + (rng() - 0.5) * 0.1` for intervals ≥ 2 days, with
the rng injected so `previewIntervals` and `tests/srs.test.ts` stay deterministic.

### A lapse drops a mature card to a 1-day interval with no partial credit
`low` | `verified` | `src/shared/srs.ts:94-103`
`again` on a review card sets `intervalDays: 1` unconditionally, so a card at a 200-day interval that
is missed once restarts from one day and needs ~10 successful reviews to climb back. This matches
Anki's *default* (new interval 0%), but that default is widely considered the single worst thing about
SM-2 and is exactly what FSRS/modern schedulers changed — for a learner with a mature deck it converts
one bad day into weeks of re-drilling material they mostly know.
Fix: `intervalDays: max(1, round(s.intervalDays * 0.4))`, i.e. Anki's "new interval 40%".

### Music listening is tracked with real durations but excluded from "days of your life"
`low` | `verified` | `src/main/repos/mediaRepo.ts:347-364`, `src/main/db/init.sql:515-520`
`timeStats()` reads only `media_item` rows whose `media_type IN (STAT_TYPES)`, so the Home headline
("~N days of your life", `HomePage.tsx:441`) and the whole Stats page exclude music entirely — even
though `music_play_log` stores a real per-play `duration` in seconds, making it the app's *only*
non-estimated time source besides `game_session.duration`. Every other number on that page is an
estimate from a settings constant.
Fix: add a `music` bucket to `LibraryTimeStats` fed by `SUM(music_play_log.duration)`, flagged
`estimated: false`.

## The biggest daily-friction finding (reviewer's own)

### Status, score and favorite can only be changed through the full edit form
`high` | `verified` | `src/renderer/src/pages/MediaDetailPage.tsx:154-170`, `src/renderer/src/pages/MediaFormPage.tsx:144`
`api.media.update` has **exactly one caller in the whole renderer** — `MediaFormPage.tsx:144`. On a
detail page, Status (`:155`), My Score (`:156`) and the favorite star (`:146-150`) are all read-only
`StatInline`/display markup; there is no toggle, no picker, no inline edit. So rating a title you just
finished is: detail page → Edit → a 13-field form (`MediaFormPage.tsx:210-383`) → change one field →
scroll to the bottom → Save → land back. `MediaListPage`/`MediaCard` offer nothing either (the only
`favorite` reference there is the *filter*, `MediaListPage.tsx:77`).
The app is a tracker whose two most frequent tracking actions cost a form. Contrast: a theme song gets
a one-click heart (`MediaDetailPage.tsx:804-810`), a track gets one, a chapter gets one — a *title*
doesn't. And `logProgress` proves the one-click write path already exists.
Fix: on the detail page make Status a `PillGroup` row, Score a 1-10 pill row (or a small stepper) and
the star a toggle, each calling `api.media.update` + invalidating `qk.media.detail`/`qk.media.all` —
the `ThemeRow` heart at `:755-763` is the exact pattern to copy. Add a heart overlay to `MediaCard`
for the list/Home grids.

## Phase-2 verification notes (reviewer re-ran the query plans)

I re-ran `EXPLAIN QUERY PLAN` against a fresh in-memory DB built from the real `init.sql`
(`ELECTRON_RUN_AS_NODE=1 npx electron`). The recon claims hold, with more precise outcomes:

| Query | Plan today | With the fix |
| --- | --- | --- |
| `jp_card … status != 'new' AND due_at <= …` (`japaneseRepo.ts:375`) | `SCAN k USING INDEX idx_jp_card_due` — full index scan | `SEARCH k USING INDEX idx_jp_card_due (status=? AND due_at<?)` |
| `en_word … status != 'new' AND due_at <= …` (`englishRepo.ts:108`) | `SCAN en_word` — **full table scan, no index at all** | `SEARCH en_word USING INDEX idx_en_word_due (…)` |
| `jp_review_log … date(reviewed_at,'localtime') BETWEEN ?` (`checklistRepo.ts:323`) | `SCAN jp_review_log USING INDEX idx_jp_review_log_card` | `SEARCH … USING INDEX idx_jp_review_log_time (reviewed_at>? AND <?)` |
| `checklist_log WHERE cadence='daily'` (`checklistRepo.ts:452`) | `SCAN checklist_log` | needs an index or a `task_key` predicate |

Calibration: these are **medium**, not high. `refetchOnWindowFocus` is off and `staleTime` is 5 s
(`main.tsx:20`), so `checklist:status` runs per navigation to Home/Checklist plus the page's 60 s
interval — at a year of daily use (`jp_review_log` ≈ 30-40k rows) each scan is single-digit
milliseconds. They are worth fixing because the fix is a one-line predicate rewrite, not because the
app is slow today.

### The checklist heatmap aggregates ALL history on every status call, unlike its own sibling
`med` | `verified` | `src/main/repos/checklistRepo.ts:325-352` vs `src/main/repos/japaneseRepo.ts:781-783`
Every `DETECT_SQL[...].perDay` query is `SELECT date(col,'localtime') AS day, COUNT(...) … GROUP BY day`
with **no date lower bound**, run once per detected source on every `checklist:status`. The equivalent
heatmap query in `japaneseRepo.statsDetail` bounds itself with
`WHERE date(reviewed_at,'localtime') >= date('now','localtime','-364 days')` — the checklist, which
only renders a 52-week grid, does not. So the cost grows forever while the rendered output does not.
Fix: add the same `-364 days` bound to all five `perDay` queries.

### Reading a manga chapter in-app never credits the checklist — and crediting it double-counts
`high` | `verified` | `src/main/manga.ts:406-424`, `src/main/ipc.ts:378-381`, `src/shared/mediaProgress.ts:97`
Two problems from one design change, both on the daily loop.

(a) **The in-app reader does not credit the checklist.** `manga.markChapterRead` and `markProgress`
call `syncMediaProgress` (`manga.ts:423,403`) and nothing else — `manga.ts` never imports
`checklistRepo`. The video player's equivalent *does*: `ipc.ts:378-381` routes `markWatched`'s
`firstTime` transition through `checklistRepo.logProgress`. So finishing an episode in the app ticks
the checklist and the streak; finishing a chapter in the app does not.

(b) **Ticking it by hand then double-counts.** Manga is a `mediaLog` checklist item, so the user is
*expected* to press Log. `syncMediaProgress` has already set `media_item.progress` to the chapter
number (`manga.ts:383-387`, monotonic); `logProgress` → `advanceProgress` then does
`progress = cur.progress + 1` (`mediaProgress.ts:97`). Read chapter 5 in the reader, credit the
checklist, and the library says you are on chapter 6.

This is the direct cost of the documented detected→mediaLog switch for manga. The stated reason for
that switch (chapter rows only exist for locally-scanned series, so detection could never cover manga
read elsewhere) is sound — but the fix chosen removed the automatic credit for the one case the app
*can* see.
Fix: call `checklistRepo.logProgress(mediaId, todayLocal())` from the `manga:markChapterRead` /
`manga:markProgress` handlers on the first `read_at` transition (the `video:markWatched` shape), and
have `syncMediaProgress` skip its write when the caller is that same transition — or simpler, let
`logProgress` own the progress write for manga and reduce `syncMediaProgress` to chapter bookkeeping.
Keep the manual Log button for chapters read outside the app.

### Two multiple-choice drills have a measurably biased correct-answer position
`high` | `verified — I measured it` | `src/renderer/src/pages/JapaneseLoanwordsPage.tsx:55`,
`src/renderer/src/components/japanese/LookalikeDrill.tsx:47-48`

Both build their option array with the correct answer **first** and then shuffle with
`[...arr].sort(() => Math.random() - 0.5)`. A random comparator does not produce a uniform
permutation — V8's TimSort has a strong positional bias. Measured over 200,000 trials in this repo's
own Node:

| n | index 0 | index 1 | index 2 | index 3 |
| --- | --- | --- | --- | --- |
| 4 | **35.8%** | 17.1% | 15.8% | **31.3%** |
| 3 | **43.9%** | 18.8% | 37.3% | — |
| 2 | 50.2% | 49.8% | — | — |

So in a 4-option round the correct answer sits in slot 1 **more than twice as often** as in slot 3.
That is a free giveaway a learner will absorb without noticing, in two drills whose whole purpose is
discrimination. (`tests/englishContent.test.ts` validates answer-position distribution for the
*authored* English content — these runtime shuffles have no equivalent guard.)

Six other sites use the same biased sort but only to shuffle a *pool*, where the effect is uneven
sampling rather than a positional tell: `JapaneseLoanwordsPage.tsx:46`,
`JapaneseLeechDrillPage.tsx:57`, `MinimalPairsDrill.tsx:142` (its `playedIndex` is a separate uniform
coin flip, so the answer stays fair), `SpeakDrill.tsx:80`, `KeigoDrill.tsx:75`, and
`TransitivityDrill.tsx:49` (n=2, measured unbiased).

Fix: use the Fisher-Yates `shuffle` that already exists 21 times over in this codebase — promote the
rng-injectable one at `src/shared/bracket.ts:35` to `@shared/` and replace all 8 biased call sites.
