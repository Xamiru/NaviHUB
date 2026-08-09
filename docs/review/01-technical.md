# Technical review

Baseline, measured: `npm run typecheck` passes clean; `npm run test` passes — **103 files / 1272
tests, 0 failures, 65 s**. Nothing here is a broken build.

Severities are mine, not the recon agents'. Where I demoted something I say so and why. Everything
marked `verified` I read (or re-ran) myself; `suspected` means the mechanism is real but I could not
confirm the trigger fires in practice.

---

## Architecture

### The contract chain is intact — mechanically checked

334 `ipcMain.handle` channels, 334 preload methods, **zero orphans in either direction** and zero
arity mismatches. The `shared/api.ts` ↔ `ipc.ts` ↔ `preload/index.ts` discipline holds.

What does not hold is the *renderer* side of it: **9 channels are wired end-to-end and called by
nothing.**

| Channel | `api.ts` | What its absence means |
| --- | --- | --- |
| `tags.remove` | `:264` | There is **no way to delete a tag in the app**. Imported tags accumulate forever. |
| `gacha.createGoal` / `gacha.updateGoal` | `:810-811` | Goals can only be created by asking the LLM coach — i.e. the "no LLM call" comment on that api group is wrong, and manual goal entry costs a model call. |
| `gacha.coachThreads` | `:803` | Every "New thread" click orphans the previous conversation; the rows survive in `gacha_chat_thread`, nothing reads them back. |
| `video.scanStatus` | `:664` | Its own doc comment says "poll while attachFolder/rescan is pending"; `VideoEpisodesSection.tsx:43-55` just awaits with a disabled button, so a big video-folder scan is a silent freeze while manga/music/OCR scans all show progress. |
| `characters.cast` | `:237` | No `/characters` index page exists (`CharacterDetailPage.tsx:55` says so). |
| `credits.add`, `mediaCompanies.add` | `:243`, `:253` | Only the `remove` halves are used — a credit or studio link can be deleted by hand but only created by an importer. |
| `settings.get` | `:867` | The renderer only ever uses `settings.all()`. |

`med` | `verified` — I re-ran the sweep myself. Note for anyone repeating it: a naive grep also flags
the 10 importer channels plus `english.saveWords` and `music.logPlay`; those are **false positives**
(importers are reached via `api[source.key]` in `ImportDialog.tsx:24`, the other two are called on a
chained line). The real list is exactly the nine above.
Decide per row: build the UI or delete the channel + preload + api entry. `tags.remove` and
`gacha.coachThreads` are the two where the missing UI is a genuine user-facing gap.

### Shutdown runs twice, and the second run re-opens the database it just closed
`med` | `verified` | `src/main/index.ts:242-269`, `src/main/db/connection.ts:188-203`

`window-all-closed` (`:242`) calls `closeDatabase()` + `closeDictDb()` and *then* `app.quit()`, which
emits `before-quit` (`:250`), which calls the whole teardown list again — including
`finalizeActiveGameSession()` (`:266`), whose comment says it "must run before `closeDatabase()`".
By then `closeDatabase()` has already run. It works only because `closeDatabase` nulls `_sqlite`
(`connection.ts:201-203`) and `getSqlite()` lazily calls `initDatabase()` (`:188-191`) — so closing
the window with a game session in flight **re-opens the DB and re-runs `init.sql` + `runMigrations` +
`seedJapanese` + `seedChecklist`** to insert one row, then closes it again at `:267`.

No data is lost today. The problem is that a documented ordering requirement is satisfied by an
undocumented lazy reopen: the day `getSqlite()` throws instead of reopening, every normal quit
silently drops the final play session.
Fix: delete `closeDatabase()`/`closeDictDb()` from `window-all-closed` and let `before-quit` own
teardown.

### The renderer is one 2.4 MB chunk containing every course, passage and cheatsheet
`low` | `verified` | `src/renderer/src/App.tsx:11-93`

All 79 pages are static imports, so `out/renderer/assets/index-*.js` is 2,385,314 bytes and includes
`goCourse.ts` (1685 LOC), `shellCourse.ts` (838), `sqlCourse.ts` (768), `gitCourse.ts` (735),
`dockerCourse.ts` (712), `regexCourse.ts` (636), `cheatsheets.ts` (1026), `english/passages.ts`
(1292), `english/mechanics.ts` (1233) — all parsed on every cold start before Home paints.
Fix: `React.lazy` the three learn verticals, gacha and the readers. They are already route-isolated.

### 18 MB of font ships in every build; about half of it can never load
`low` | `verified` | `src/renderer/src/pages/BookReaderPage.tsx:21-22`

`@fontsource/noto-serif-jp/400.css` + `600.css` emit **496 files / 18 MB** into
`out/renderer/assets` (measured). Total renderer output is 21 MB — the font is 86% of it. Chromium
always picks woff2, so every `.woff` is dead weight in the AppImage and the NSIS payload, and every
`electron-updater` download carries it.
Fix: import the `japanese-400.css`/`japanese-600.css` subset entry points, or vendor one subsetted
woff2.

### LLM SDKs load on every launch
`low` | `verified` | `src/main/llm.ts:9-11`

`@google/genai`, `@anthropic-ai/sdk` and `@anthropic-ai/vertex-sdk` are value imports; `llm.ts` is
imported by `gachaCoach.ts` and `englishWriting.ts`, both imported unconditionally by `ipc.ts:62,20`,
which `index.ts` loads before `whenReady`. Every launch initializes three SDKs the user may never
touch. Contrast `music-metadata` (lazy `await import()` for exactly this reason) and every external
binary (`ytdlp.path`, `ffmpeg.path`, `mokuro.path`), which are all lazy.
Fix: `await import(...)` inside `makeGemini`/`makeAnthropic`.

### What's actually good here

- The **pure-core / IO-seam split is real and pays for itself**: `video/playability.ts`,
  `probeParse.ts`, `progressParse.ts`, `names.ts`, `updaterCore.ts`, `gameLaunchCore.ts`,
  `coachTools.ts`, `@shared/subtitles.ts` are all tested with no binary, no electron and no network.
  That is why a 91k-LOC Electron app has 1272 tests that run in 65 seconds.
- **The polled-status singleton is a genuine convention**, not a coincidence: `video/session.ts:106`,
  `mokuroRun.ts:176`, `gameLaunch.ts:33-37`, `updater.ts:64` all carry the same `status.id !== id`
  stale-run guard and all reject a concurrent start synchronously rather than taking over the slot.
- **`open/<token>` is bounded**: 32-entry LRU with delete-then-set touch (`files.ts:97-113`), and the
  pending-open queue is capped the same way (`openFile.ts:102`). `app:pendingOpen` really does
  read-and-clear (`openFile.ts:109-113`) and the poller guards against a stale in-flight request.

---

## Correctness

### The global activity slot has no run id, so a second import silently kills the first's progress
`med` | `verified` | `src/main/progress.ts:7,29-41` — **demoted from the recon's `high`**

`withActivity` shares one module-level `state` with no run id, unlike every other singleton in the
codebase. The comment (`:6`) acknowledges "a second begin simply takes over the slot" but not the
consequence: the *first* run's `finally { endActivity() }` (`:39-41`) unconditionally sets
`active: false`, and `updateActivity`/`imageProgress` both no-op on `if (state.active)`
(`:20,26`) — so after the first import finishes, the second one's pill goes dark and its progress
stops updating for the rest of its life. 16 handlers route through this (`ipc.ts`, every importer).
Reproduction: start an AniList import, close the dialog (which does not cancel the in-flight promise),
start a TMDB import, wait for the first to land.

Demoted because nothing is corrupted — both imports complete correctly and atomically; only the
progress display lies.
Fix: give the slot a run id and make `endActivity` a no-op unless it owns the current run.

### `video:markWatched` composes two writes outside a transaction
`low` | `verified` | `src/main/ipc.ts:378-381` — **demoted from `med`**

`video.markWatched` commits `UPDATE video_file` (`video/scan.ts:413-431`); `checklistRepo.logProgress`
is a separate transaction that can throw. If it does, the renderer sees a rejection while
`watched_at` is already committed — the episode reads as watched with no checklist credit and no
progress advance. Demoted because `logProgress`'s throw paths need a `media_id` that no longer
resolves, and the id comes from the `video_file` row itself, so the window is narrow.
Fix: one transaction around both, or catch and report the second failure separately.

### `musicDownload`'s close handler nulls `active` without an id guard
`low` | `verified` | `src/main/musicDownload.ts:190,193-194` — **demoted from `med`**

Both `proc.on('error')` (`:190`) and `proc.on('close')` (`:194`) set `active = null`
unconditionally, while the `status` writes right beside them *are* guarded by `status.id !== id`
(`:186`, `:195`). Every sibling module guards both (`video/session.ts:106-107`,
`mokuroRun.ts:176-177`). A stale `close` from a dead process could clear a newer download's `active`,
which would make `cancelDownload` a no-op and let a second yt-dlp start. Demoted to low because
`error` and `close` for the same child fire within the same tick region — a user would have to start
a new download inside that window.
Fix: guard both lines on `active?.id === id`, matching `video/session.ts`.

### `usePitchRecorder`'s documented safety timer is an empty function
`low` | `verified` | `src/renderer/src/lib/usePitchRecorder.ts:159-165`

The effect sets a `MAX_TAKE_SECONDS * 1000 + 500` timeout whose body is a comment. The real cap lives
in the caller (`SpeakDrill.tsx:158-164`), so it is harmless today — but the comment promises a
backstop that does not exist, and the next caller of this hook will believe it.
Fix: delete the effect and the comment, or implement it.

### What's actually good here

- **`@shared/mediaProgress.ts` as the single definition of "one more unit"** is the right call and it
  is honoured: `checklistRepo.logProgress` is the one write path, used by both the checklist and every
  detail page's log button, and `video:markWatched` routes through it on the `firstTime` transition
  (`ipc.ts:374-381`).
- **Date handling is consistent and correct**: due comparisons in UTC (`japaneseRepo.ts:375,467,517`),
  day-grouping via `date(col,'localtime')` (`:759,781,820`), and `todayLocal()` computed once in main
  (`ipc.ts:86-89`) and passed into every repo that needs a day. The renderer never derives a date for
  a period key.
- **The in-session review queue is right**: a card still in a learning step is re-appended
  (`JapaneseReviewPage.tsx:135-140`), a missed ghost re-appends and must end on a success (`:159-164`).

---

## Security & robustness

Calibrated to the real threat model: one local user, no listeners, no accounts. "Someone with a shell
on the box" is not a finding. What matters is hostile *content* (a downloaded CBZ, a subtitle, a JSON
backup), hostile *remote responses*, argument injection into spawned binaries, and secrets leaking
into exports.

### Production ships `'unsafe-eval'` and a `connect-src` that allows any localhost service
`med` | `verified` | `src/renderer/index.html:7-9`

I confirmed the shipped policy is byte-identical in `out/renderer/index.html`:

```
script-src 'self' 'unsafe-eval'; connect-src 'self' navimg: ws: http://localhost:*
```

A grep for `eval`/`new Function`/`dangerouslySetInnerHTML` across the renderer returns nothing — the
app is disciplined about this — so `'unsafe-eval'` is an un-pruned dev leftover. `ws:` and
`http://localhost:*` likewise have no corresponding renderer call. No active hole; the cost is that
the day a renderer injection point appears, `'unsafe-eval'` makes it weaponizable and the open
`connect-src` lets it reach the user's own Jackett/qBittorrent WebUI — which the app's own code notes
may be running with auth-bypass-for-localhost.
Fix: `script-src 'self'; connect-src 'self' navimg:` for the production build; keep the wider policy
behind the dev-only path if HMR needs it.

### Archive entries decompress into memory with no cap
`med` | `verified` | `src/main/archive.ts:197-214` — **demoted from `high`**

`readArchiveEntry` does `chunks.push(c)` / `Buffer.concat(chunks)` with no reference to
`entry.uncompressedSize` and no running byte ceiling; the dict importer's zip reader repeats the
pattern. A crafted `.cbz` page — or, far more likely in practice, one legitimately enormous entry or a
corrupt archive — exhausts the heap the moment the reader opens that page. Demoted from high because
the consequence is an app crash with no persistence, no data loss and no escalation; the app's own
torrent search makes a hostile archive *reachable*, but zip bombs are not how manga releases fail.
Still worth fixing: it is the difference between "this file is broken" and "the app died".
Fix: check `entry.uncompressedSize` and abort past a per-entry cap while streaming.

### Remote bodies are buffered whole, unbounded
`low` | `verified` | `src/main/files.ts:216,277,312`, `src/main/atlas.ts:51`, `src/main/jackett.ts:148`

`downloadImage`/`downloadImageTo`/`downloadAudio` all `Buffer.from(await res.arrayBuffer())` with no
`content-length` pre-check; `atlas.ts` and `jackett.ts` do `await res.json()` on responses whose size
is set by a third party (Jackett relays whatever the user's indexers return). Same failure class as
above, one HTTP hop away.
Fix: a byte ceiling inside `fetchWithRetry` for the download paths.

### `sandbox: false` with no explanation
`low` | `verified` | `src/main/index.ts:88-92`

`contextIsolation: true` and no `nodeIntegration` bound the exposure to `window.api`, so this is not
independently exploitable. It stands out only because this codebase documents every other
security-relevant deviation inline.
Fix: try `sandbox: true`; if a preload dependency needs it off, say so in a comment.

### What's actually good here — and it is genuinely good

- **`absoluteMediaPath`'s traversal guard is correct** (`files.ts:179-200`): the protocol handler
  decodes once (`index.ts:169`) *before* the check, so `%2e%2e` is already `..` when
  `norm.split('/').includes('..')` runs; backslashes are normalized first; and it uses `path.join`
  (which does not reset on an absolute segment) rather than `path.resolve`. The `open/` branch never
  accepts a path at all — only a hex token validated by regex (`files.ts:118`) against a
  process-lifetime map.
- **Zip-slip is structurally impossible**: entries are looked up by exact key in a `Map` built from
  the real central directory (`archive.ts:200`), never written to disk by name, so even a
  traversal-shaped `resolveEpubHref` result just 404s.
- **Every spawn uses an argv array, never a shell, and every one has an `error` handler** —
  `video/ffmpeg.ts:126,171`, `musicDownload.ts:184`, `mokuroRun.ts:171`, `gameLaunch.ts:112`.
  `assertSafeArgPath` plus `file:`-prefixing (`video/playability.ts:220-232`) closes both the
  leading-dash and the `protocol:`-ambiguity injection classes — and the `file:` half is the one a
  bare `--` would not have fixed.
- **No secrets reach a log**: there are zero `console.*` calls in `src/main/`. Every key/token/password
  setting is in `sanitizeSql.cjs`'s wipe list, cross-checked against every `getSetting` call site, and
  auth material travels in headers (`updater.ts:208`), not in URLs that could end up in a toasted error.
- **SQL is parameterized throughout** despite heavy template-literal query building: the interpolated
  parts are always a fixed column allowlist or a `?`-placeholder count, never an external string.

---

## Performance

### Every browse query is unbounded and ships `synopsis` + `metadata` per row
`high` | `verified` | `src/main/repos/mediaRepo.ts:213-226`

`list()` is `SELECT m.* … ORDER BY …` with no `LIMIT`/`OFFSET`; `ipc.ts:92` is a bare passthrough;
`MediaListPage.tsx:85-88` fetches the whole filtered set and paginates client-side with
`useIncrementalList` (batch 96). Every row carries `synopsis` (1-3 KB from AniList/TMDB), `notes` and
a parsed `metadata` JSON blob (`mappers.ts:34`) that `MediaCard` never reads. **HomePage runs seven of
these at once** (`HomePage.tsx:46-51`, one per media type) and derives all its sections in JS.

The same shape recurs in `peopleRepo.credits` (`:74` — a prolific seiyuu has hundreds),
`characterRepo.roles` (`:48`), `companyRepo.media` (`:44`), `tagRepo.media` (`:54`) and
`musicRepo.listTracks` (`:173-191`). `useIncrementalList` bounds what is *painted*, not what is
fetched, serialized over IPC and held in memory.

This is the one performance finding I would actually act on: it is the difference between a Home page
that stays instant at 10k titles and one that does not.
Fix: a `columns: 'card'` mode on `MediaListFilter` selecting the ~10 fields the cards render, plus a
SQL `LIMIT`/`OFFSET` (or keyset) on the list endpoints. Detail pages keep `SELECT *`.

### The global player context re-renders every consumer ~4×/s while audio plays
`med` | `verified` | `src/renderer/src/lib/player.tsx:122,493-533` — **demoted from `high`**

`currentTime` is React state (`:122`) updated on `<audio onTimeUpdate>` (`:526`), and the
`PlayerContext.Provider` value is a fresh object literal every render (`:494-521`) — so all 22
`usePlayer()` consumers re-render on every tick, whether or not they read the clock. The ones that
matter are per-row and unmemoized: `MusicTrackRow.tsx:51-52` (not wrapped in `memo`, one per visible
track) and `ThemeSongsPage.tsx:376-378`'s `SongRow`. `QueuePanel.tsx:31-33` documents the tradeoff and
memoizes around it — it is the only place that does.

Demoted to med because it only bites while music is playing *and* a long track list is on screen —
but that is the Music page, which is exactly when it happens.
Fix: split the context into a high-frequency slice (`currentTime`/`duration`) and a low-frequency one
(`track`/`isPlaying`/`queue`), or pass `isCurrent` down as a prop from one subscribing parent.

### The transcript panel defeats the three-clock design it sits inside
`med` | `verified` | `src/renderer/src/pages/VideoPlayerPage.tsx:799-808`,
`src/renderer/src/components/video/TranscriptPanel.tsx:61,138-151` — **demoted from `high`**

`VideoPlayerPage.tsx:72-77` explains the three clocks specifically so that "a single
currentTime-in-state would [not] repaint a 1500-row transcript 4×/s". But `uiTime` *is* state on the
component that renders `<TranscriptPanel>`, `TranscriptPanel` is not memoized (`:61`), and the props
it receives are inline closures created fresh every render (`VideoPlayerPage.tsx:799,803,804`). The
inner `Row` *is* memoized (`TranscriptPanel.tsx:17`) but receives those same unstable references
(`:148-149`), so its comparison fails for every visible row on every tick. With dual subs on, each row
also re-runs `cuesAt(secondary, …)` inline (`:144-147`).

The two clocks that were hard to get right (`timeRef` via `requestVideoFrameCallback`,
`activeCues` gated on an id-set change) are correct — this is the one place the guarantee leaks.
Fix: `memo(TranscriptPanel)` and hoist the three handlers into `useCallback`s, the way `seekTo` and
`openMining` already are.

### SRS due-queue predicates defeat their own indexes
`med` | `verified` | `japaneseRepo.ts:375,467,514,516,748,824`, `englishRepo.ts:108,176` —
**demoted from `high`; I re-ran the plans myself**

`status != 'new'` cannot seek a `(status, due_at)` index. Measured against a fresh DB built from the
real `init.sql`:

| Query | Today | With `status IN ('learning','review')` |
| --- | --- | --- |
| JP due queue (`japaneseRepo.ts:375`) | `SCAN k USING INDEX idx_jp_card_due` | `SEARCH k USING INDEX idx_jp_card_due (status=? AND due_at<?)` |
| EN due queue (`englishRepo.ts:108`) | **`SCAN en_word`** — no index at all | `SEARCH en_word USING INDEX idx_en_word_due (…)` |

`SrsStatus` is a closed three-value enum, so the rewrite is safe and mechanical. Demoted because at a
few thousand cards a full scan is sub-millisecond; it is worth doing because it costs one line each.

### Checklist detection scans, and its heatmap aggregates all history forever
`med` | `verified` | `src/main/repos/checklistRepo.ts:321-353,452`

Two separate issues, both confirmed by `EXPLAIN QUERY PLAN`:

1. `date(col,'localtime') BETWEEN ? AND ?` prevents any index use — `SCAN jp_review_log USING INDEX
   idx_jp_review_log_card` instead of `SEARCH … idx_jp_review_log_time (reviewed_at>? AND <?)`. Same
   for `en_review_log`, `quiz_session`, `game_session`. And `checklist_log WHERE cadence = 'daily'`
   (`:452`) is a plain `SCAN` because `cadence` is the *second* column of its index.
2. **More interesting**: every `DETECT_SQL[...].perDay` query (`:325-352`) is a `GROUP BY day` over
   the entire table with **no date bound**, run once per detected source on every `checklist:status`.
   The equivalent heatmap query in `japaneseRepo.statsDetail` (`:781-783`) *does* bound itself with
   `>= date('now','localtime','-364 days')`. The checklist renders 52 weeks and reads all of history
   to do it, so the cost grows forever while the output does not.

Calibration: `refetchOnWindowFocus` is off and `staleTime` is 5 s (`main.tsx:20`), so this runs per
navigation to Home/Checklist plus the page's 60 s interval. At a year of daily use it is single-digit
milliseconds. Fix it because both fixes are one line, not because the app is slow.

### `CoverageSection` polls a status channel once a second, forever
`low` | `verified` | `src/renderer/src/components/japanese/CoverageSection.tsx:32-36`

No `enabled`, `refetchInterval: 1000` unconditional, while its sibling on the same tab
(`MangaChaptersSection.tsx:30-35`) self-gates on `buildingDeck` and polls the identical key. The
comment explains it was a workaround for a start-race. Cheap, but it is the one deviation from the
self-gating convention that the rest of the app follows exactly.
Fix: lift `buildingDeck` to the shared parent, or copy `ActivityIndicator`'s lazy-idle/tight-active split.

### Torrent results re-filter and re-sort the whole accumulated array every 400 ms
`low` | `verified` | `src/renderer/src/lib/useTorrentSearch.ts:44-46`,
`components/TorrentResultsPanel.tsx:32-38`, `components/TorrentResultsTable.tsx:27-49`

`setResults((prev) => [...prev, ...s.results])` mints a new array every poll, so `relevanceFilter`,
the tracker dedup, `applyTorrentFilters` and the sort all recompute over every row already processed —
40-75 times over one 17-30 s fan-out search. Each pass is cheap; the waste is the point.
Fix: throttle the `results` reference, or merge-filter only the newly arrived rows.

### `navState.ts`'s store never evicts
`low` | `verified` | `src/renderer/src/lib/navState.ts:9,15-32`

Keyed by `${location.key}:${name}`, and React Router mints a new `location.key` per push. Entries are
small, but nothing removes them within a session, and this app is plausibly left open for days.
Fix: LRU-cap the map.

### What's actually good here

- **Query-key hygiene is clean.** Every group's `all` key is a genuine array prefix of every key in
  the group, so prefix invalidation really does reach everything. The three documented
  byte-identical shared-cache pairs (`qk.media.home` across HomePage / SeasonalAnimePage /
  `RoadmapDailyLoop`) have not diverged.
- **The three poll hooks are the right pattern**: `useUpdateStatus`/`useOcrRun`/`useGameSession`
  derive `refetchInterval` from the *polled data* rather than local state, so an operation keeps
  reporting after you navigate away and back, and the poll truly stops when idle.
- **Two of the video player's three clocks are exactly as advertised**: `timeRef` is a plain ref
  updated per `requestVideoFrameCallback` with zero renders (`VideoPlayerPage.tsx:80,135`), and
  `activeCues` only calls `setState` when the active id-set actually changes (`:85-86,140-141`).
- **`MediaCard` is properly memoized** (`MediaCard.tsx:12`) and fed stable references from the query
  cache, so typing in a search box before the debounce settles does not repaint the grid.
- **`addEventListener` pairing is solid** across the renderer — a per-file balance check found exactly
  one intentional exception (`main.tsx`'s app-lifetime `unhandledrejection` net).

---

## Data integrity

**No corruption-class defect exists.** I want to state that plainly before the list, because the list
is long and the schema discipline here is the strongest part of the codebase.

### `mediaRepo.remove()` leaves zero-credit people, characters and companies behind
`med` | `verified` | `src/main/repos/mediaRepo.ts:685-688`

FK cascades remove the *link* rows, but the `person`/`character`/`company` rows survive with no
remaining credits anywhere. The only pruning that exists is each importer's own step
(`anilist.ts:150-179`, `tmdb.ts:341-366`, `vndb.ts:194-220`, `themes.ts:267-278`) — scoped to that
importer's `external_source` and triggered only by re-importing that same title. There is no company
prune anywhere. `peopleRepo.remove`/`characterRepo.remove`/`companyRepo.remove` all exist and do the
right thing; `mediaRepo.remove` just never calls them. Over a long-lived library the People,
Characters and Studios browse pages fill with ghosts.
Fix: after the cascade, sweep rows with zero remaining `credit`/`media_character`/`media_company`
references.

### Mined sentence audio and video frames are orphaned on card deletion
`med` | `verified` | `src/main/repos/japaneseRepo.ts:178-183,248-253,345-349`

`removeCourse`/`removeLesson`/`removeCard` cascade the `jp_card` rows (and correctly sweep `jp_ghost`)
but never unlink the files at `audio_path`/`image_path`. Those columns exist precisely because
"captured media nobody sees is worse than none" — and the delete path turns them into exactly that,
silently, on disk.
Fix: collect the paths before the delete and unlink them, mirroring `music.ts`'s `unlinkTrackFile`.

### `exportSanitize` doesn't test two of the tables it wipes
`med` | `verified` | `tests/exportSanitize.test.ts` vs `scripts/sanitizeSql.cjs:54-55`

`sanitizeSql.cjs` correctly deletes `video_file` and `video_cache`, but the test never seeds either
table and never asserts on them; the same gap applies to the settings keys `video.dir`,
`ffmpeg.path`, `ffprobe.path`, `mokuro.path`, `vertex.region`, the three `sync.*` leftovers and
`checklist.seeded`. The code is right today. This is a coverage hole in the one file whose entire
purpose is to catch a future regression in that list — and the list has grown twice since the test
was last extended.
Fix: seed the two tables and the eight keys, and add them to the assertion loop.

### Two-statement repo writes that aren't wrapped, where a sibling in the same file is
`low` | `verified`

Nothing here can corrupt data — the operations are idempotent or self-healing — but it is a repeated
inconsistency, and in four files the *same shape* is wrapped correctly a few functions away:

- `mediaRepo.ts:685-688`, `peopleRepo.ts:138-141`, `characterRepo.ts:108-111`, `companyRepo.ts:73-76`
  — list-cleanup DELETE + entity DELETE.
- `listRepo.ts:186-231` (`addItem`/`removeItem`/`removeItemByEntity`/`updateItem`) — write + `bump()`,
  while `reorder()` at `:236-241` wraps the identical shape.
- `musicRepo.ts:412-420,424-429` — DELETE + `bump()`, while `addPlaylistTracks`/`reorderPlaylist` wrap it.
- `coachRepo.ts:57-69` (`newThread`: archive-old + insert-new — a failure between leaves the game with
  zero active threads), `:129-148` (`appendMessage` + `touchThread`).
- `japaneseRepo.ts:178-183,248-253,345-349,433-451` — entity write + `jp_ghost` sweep.

### `coachRepo` over-fetches blob columns it discards
`low` | `verified` | `src/main/repos/coachRepo.ts:108-114,333-339`

`listMessages` does `SELECT *`, pulling `api_blocks` — "the VERBATIM content-block array", which can
carry base64 image data — for every message, and `mapMessage` (`:94-106`) never returns it.
`historyWindow` (`:153-164`) gets this right, selecting only `role, api_blocks`. `listDocs` has the
same shape with the full imported-chat `content`.

### `schema.ts` declares an index that must never be created that way
`low` | `verified` | `src/main/db/schema.ts:1104`

`idx_en_word_due` appears as a table-level index on `enWord`, but that index must live *only* in
`runMigrations` (`connection.ts:140`), after the 8 SRS columns are ensured — creating it with the
table is exactly what crashed live pre-SRS databases on the English-SRS release. Inert today: no
`./drizzle` output directory exists in the repo or its history and no `migrate()` call exists in
`src/main`, so drizzle-kit output is never applied. Worth fixing anyway, since `db:generate` is
documented as occasionally used.

### `media_image.created_at` has no default in the mirror
`low` | `verified` | `src/main/db/schema.ts:308` vs `src/main/db/init.sql:210`

init.sql has `DEFAULT (datetime('now'))`; the Drizzle mirror does not. Every other table's timestamp
column carries the matching default. No runtime effect.

### Content-addressed `media/` files are never garbage-collected
`low` | `verified`

Deleting a person/character/company/gacha unit never unlinks its `photo_path`/`image_path`/`logo_path`
under `media/`. Unlike `pictures/`, these paths are content-addressed (`dl-<sha1(url)>`) precisely so
several rows can share one file, so per-delete unlinking would be *wrong*. Leaving the file is the
correct conservative choice absent a reference-counting sweep — but no such sweep exists, so this
grows without bound.
Fix (only if it ever matters): a periodic pass that unlinks `media/dl-*` files referenced by no
`cover_path`/`photo_path`/`image_path`/`logo_path`/`audio_path` column in any table.

### What's actually good here

- **All 51 tables match between `init.sql` and `schema.ts`**, in both directions, with exactly two
  column-level drifts (both listed above, both inert). `jp_coverage_word`'s `WITHOUT ROWID` has no
  Drizzle representation at all in this version — not a defect.
- **The `ensureColumn` audit is clean**: every column added to a pre-existing table has a matching
  `ensureColumn`, and every `ensureColumn` targets a column that still exists. Zero dead migrations.
- **The index/migration ordering rule holds with zero violations** across all 59 `CREATE INDEX`
  statements, and `tests/initLegacyDb.test.ts:61-84` actively enforces it by regex-diffing both files
  — it is a real test, not a placeholder.
- **All 8 importers follow "all network first, then one synchronous transaction"** — read in full,
  zero `await` inside any transaction callback. A crash mid-import cannot leave half a title.
- **`sanitizeSql.cjs` covers every secret and machine path the app actually uses**, cross-checked
  against every `settingsRepo.get/set` call site and every literal key in `SettingsPage.tsx`, while
  correctly leaving harmless preferences (`score.max`, `*.statuses`, `ui.scale`) alone.
- **`dict/dictDb.ts`'s orphan sweep and version-bump DROP list are exhaustively guarded** by
  `tests/dictSchemaSync.test.ts`, which diffs them against the real `CREATE TABLE` list.

---

## Tests

The suite is good and it is not padded. A deliberately adversarial read of 54 test files turned up
**one** weak assertion. Tests consistently pin *named* regressions with real SQL against a real
in-memory schema built from the actual `init.sql` — the `en_word` startup-crash replay in
`initLegacyDb.test.ts`, the substring-bleed case in `torrents.test.ts`, the
`out_time_ms`-is-microseconds gotcha in `videoProgress.test.ts`. So this section is about coverage
holes, not test quality.

### Untested and load-bearing, ranked by blast radius

| Module | What breaks silently | Severity |
| --- | --- | --- |
| `src/main/repos/mappers.ts:18-79` | `mapPerson`/`mapCompany`/`mapCharacter` back every media detail page's cast/crew/studio/character sections via `mediaRepo.detail()` — and **no test ever calls `detail()`** (`mediaRepo.test.ts` covers list/facets/create/get/update/timeStats only). The mappers take `any` (`:6` has an eslint-disable), so `r.cover_path` → `r.coverpath` compiles and silently nulls that field everywhere. The user reads it as "this actor has no photo". | **High** |
| `src/main/tmdb.ts`, `src/main/vndb.ts` | Two complete importers with no import test, while AniList/RAWG/OpenLibrary/Atlas/Chaldea all have one. Unverified in tmdb: two-phase atomicity (`:221-230`), the re-import UPDATE never touching personal columns (`:242-245`), child pruning (`:341-366`), credit dedup (`:328-337`), and the **undocumented OMDB merge** (`:268-287`) whose regression would silently wipe stored `hltb`/`vndbRating` keys on every re-import. Unverified in vndb: `upsertSharedPerson` (`:156-189`), the AniList↔VNDB voice-actor reconciliation that CLAUDE.md itself says was only checked by hand ("13/14 Steins;Gate VAs matched") — a regression there doesn't error, it fragments the cross-linking graph. | **High** |
| `src/main/video/cache.ts` | Zero tests. All three invariants CLAUDE.md calls load-bearing are correct in code today — `cacheKey` (`:25-39`), stage-then-swap rename-before-insert (`:128-151`), `evictToCap`'s protect-key + 30-minute guard (`:170-196`) — and nothing pins any of them. If the rename/insert order regressed a `.part` could be served as complete; if the protect guard were dropped the active playback file could be deleted mid-session. | **High** (scoped to non-native formats) |
| `src/main/repos/searchRepo.ts:6-40` | The sole backend for Ctrl+K and `/search`. Four independent `LIKE '%q%'` queries, no `ESCAPE`. A dropped `OR` clause fails silently — wrong results, no error, misread as "not in my library". (Also: leading-wildcard `LIKE` can't use `idx_person_name` et al., so it's a full scan per keystroke.) | **Med** |
| `characterRepo` / `peopleRepo` / `companyRepo` / `linkRepo` | The cross-linking graph CLAUDE.md calls the app's distinguishing feature. `characterRepo.ts:44-84` merges multi-VA appearances through a `Map` keyed by media id; `peopleRepo.ts:12-61` hand-assembles two parameter arrays concatenated at `:59`; `linkRepo.ts:71` re-queries for a row id on an `OR IGNORE` no-op. All three failure modes are silent. | **Med** |

### The one test that asserts trivia
`low` | `verified` | `tests/mediaProgress.test.ts:150-154`

It checks only that each `STATUS_FALLBACKS[type]` array has length > 2 — never its content. But
`advanceProgress` reads those arrays **positionally** (index 0 = in-progress, 1 = completed, last =
planned). And for `game`, `visual_novel`, `tv` and `book` no other test in the suite ever drives
`advanceProgress`/`parseStatuses` with those types' real strings. Swap the first two entries of
`STATUS_FALLBACKS.game` and this test still passes while completion silently breaks for four of the
seven media types.

### Duplication worth collapsing (and what to leave alone)

**Collapse — `shuffle()`, 24 independent copies.** 21 hand-rolled Fisher-Yates
(`HomePage.tsx:137`, `SongQuizPage.tsx:30`, `JapaneseQuizPage.tsx:25`, `JapaneseTestPage.tsx:37`,
`jpFeed.ts:167`, `jpDrills.ts:28`, `englishDrills.ts:33`, … ) plus **8 that use the statistically
biased `.sort(() => Math.random() - 0.5)`**. It has already drifted, and two of the biased sites are a
real quiz-fairness bug — see `03-educational.md` for the measured distribution. A canonical
rng-injectable implementation already exists at `src/shared/bracket.ts:35`, used by one page.

**Collapse — the two yauzl wrappers.** `archive.ts:123-137,197-214` and
`dict/importer.ts:106-120,126-137` independently implement the same lazy-entries iteration,
directory-suffix filtering and stream-to-buffer logic (~25 lines). This is parallel evolution, not a
tracked port — and it means the missing size cap has to be fixed twice.

**Leave alone** — the SRS repo plumbing between `japaneseRepo` and `englishRepo` (the actual SM-2
engine *is* shared in `@shared/srs.ts`; only the SQL scaffolding is copied, and the two table shapes
genuinely differ), the polled-status singletons (each has real IO differences and each copy site
documents the port in-file), and the hand-rolled parsers (different formats, sharing would add
indirection). The poll hooks (`useUpdateStatus`/`useOcrRun`/`useGameSession`, ~140 duplicated lines)
are the weakest case for leaving alone — the differences really are just data — but they are
self-documented ports, so it is a preference, not a defect.

Correction worth noting: `musicArt.ts` is **not** part of the polled-status family despite being
grouped with it in places — it uses a plain `{running: boolean}` with a sequential await loop, no id,
no stale guard, no subprocess.

### `scripts/bulk-import.cjs` has drifted in four ways that produce visibly different data

This is the sharpest finding in this section, because it means bulk-imported and UI-imported titles
of the same type quietly behave differently.

1. **No transaction anywhere.** `grep -c "\.transaction(\|BEGIN"` on the file returns **0**. Every
   real importer wraps its writes (`anilist.ts:414,611`, `tmdb.ts:230`, `rawg.ts:82`,
   `themes.ts:204`); the script interleaves image downloads with individual un-transacted `.run()`
   calls under a per-title try/catch that logs "✗ failed" and continues. A Ctrl-C or an OOM on a long
   run leaves permanently-committed partial rows — a title with a cover and no relations or tags,
   indistinguishable from a normal row, never retried. This is exactly the scenario a bulk run is most
   exposed to.
2. **`downloadImage` is not content-addressed.** The real one hashes the URL and skips an existing
   file (`files.ts:266-283`); the script's (`:136-151`) always fetches and names it
   `dl-<pid>-<counter>.ext`, *before* checking whether the title already exists. The COALESCE'd UPDATE
   then overwrites `cover_path` and orphans the old file forever. `tmdb-top`/`rawg-top` have no
   `--only-missing`, so every re-run touches every already-imported title.
3. **RAWG game lengths are wrong.** `rawg.ts:74-78` makes HLTB authoritative with RAWG's crowd-average
   `playtime` as fallback. The script fetches HLTB, stores it under `metadata.hltb` (`:1582`), and
   writes `total_units` unconditionally from `g.playtime` (`:1566,1573`) — there is no
   `hltbLengthHours` equivalent in the file. Its own `--help` (`:64-66`) claims "same as the in-app
   importer". Every bulk-imported game shows a wrong "Length (hours)" until re-fetched per title.
4. **`epDuration` is never written** for AniList anime or TMDB TV (`AL_DETAIL_QUERY` at `:389-421`
   never requests `duration`; `tmdbImportTv` never reads `episode_run_time`). `mediaRepo.ts:359`
   falls back to the flat 24/40-minute defaults, so every bulk-imported OVA, short and hour-long drama
   skews `/stats`.
5. Minor: the shared `pruneCharacters` (`:219-237`) skips the `list_item` cleanup that
   `anilist.ts:169-174` and `tmdb.ts:355-362` do, so a character you'd added to a custom List can
   leave a dangling row.

Verified *not* drifted: AnimeThemes favourite preservation (`:1778-1785,1803`), season/seasonYear
metadata mirroring, tag caps, the character/cast limits, and dedup keys.

### Dead exports

Zero callers anywhere, verified: `shared/subtitles.ts:541` (`listStyles`),
`shared/programming/cheatsheets.ts:984` (`cheatSheet` — every caller inlines its own `.find()`),
`main/openFile.ts:115` (`hasPending`), `main/repos/coachRepo.ts:357` (`isGachaGame`),
`main/dict/sentences.ts:158` (`importSentenceFile` — its own comment calls it an escape hatch, and no
IPC handler was ever wired to it), `main/video/playability.ts:377` (`buildFrameArgs` — an ffmpeg
frame-grab fallback for a tainted-canvas case that the navimg CORS header made unnecessary),
`main/video/session.ts:25` (`isBusy`).

Query-key factories with no user: `japanese.quizPool`, `japanese.lessonQuizPool`,
`english.reviewQueue` (all three are plain-awaited, deliberately — `LessonCheck.tsx:87` explains why),
`quiz.all`, `pictures.all`, `update.all`, `music.statsDetailAll` (its comment says "prefix, for
invalidation", and no invalidation uses it), `gacha.coachThreads`, and the `.list` members inherited
by `qk.people`/`qk.companies`/`qk.characters` (the real caller goes through the generic
`qk.entity(ns).list(...)` path instead).

Settings keys and tables are **clean** — every key has a real read and write path, and all 78 tables
across both databases have a live SQL reference. (Process note for anyone re-running this:
`video/cache.ts` and `dict/lookup.ts` contain stray non-UTF8 bytes, so `file(1)` calls them binary and
a plain `grep -rl` silently skips them — use `grep -a` or you will falsely conclude `video_cache` is
unused.)

---

## Where the code has drifted from CLAUDE.md

You asked for every place. The document is unusually accurate for its size — roughly forty
"deliberately / never / must / always" assertions were checked and nearly all hold exactly, including
both high-risk "did this creep back" checks: **phone sync and the theme switcher are genuinely,
completely gone** (zero residual `sync.ts`/`syncOps.ts`/`sync:*` IPC/`ThemeProvider`/`ui.theme`), with
the two documented deliberate leftovers (`sync_batch`, the `sync.*` keys in sanitizeSql.cjs) present
exactly as described.

Six real divergences:

| CLAUDE.md says | Code | Reality |
| --- | --- | --- |
| "SM-2 handles lateness natively — NO postponement writes" (backlog-cap note) | `src/shared/srs.ts:65`, `japaneseRepo.ts:569-579` | **False.** `gradeCard` never receives a due date or elapsed days. An 8-day-late and an 80-day-late card schedule identically. The same wrong model is repeated in the code comment at `JapaneseReviewPage.tsx:61-63`. |
| "the action column has ONE `btn-primary` (log progress)"; "One `btn-primary` per screen is enforced" | `MediaDetailPage.tsx:286` | **Regressed to zero.** The log button is `btn-ghost w-full mt-2`; `grep -c btn-primary MediaDetailPage.tsx` → 0. Five identical ghost buttons on the app's most-visited page. |
| The importer list (`anilist`, `tmdb`, `vndb`, `rawg`, `themes`, `hltb`) | `src/main/tmdb.ts:70-78,431` | **OMDB is missing from it.** `fetchOmdb` reads `omdb.api_key`, calls omdbapi.com during every movie/TV import, has its own Settings card (`SettingsPage.tsx:379-388`) and its own sanitize entry. The one document that records which APIs this app talks to omits one. |
| "`MediaConfig.icon` is no longer rendered anywhere" | `lib/mediaConfig.ts:10,35` | **True but incomplete.** It is still a *required* field on two interfaces, populated 20 times with glyphs. Every new media type must still invent one. |
| "`SYNC_PROTOCOL_VERSION` … must never be auto-bumped" (CI/CD paragraph) | repo-wide grep → zero hits | **Stale.** The constant was deleted with phone sync on 2026-08-01; the CI paragraph predates the removal and warns about a symbol that no longer exists. |
| The `navimg://` prefix table (`media/ audio/ manga/ music/ pictures/ video/ videocache/ open/`) | `files.ts:186,193` | **Incomplete.** `books/` and `jpaudio/` are also handled. Both are documented in their own later paragraphs; the summary table was never backfilled. |

Everything else specifically checked and confirmed accurate: package.json script parity;
`electron-builder.yml` (`npmRebuild:false`, `productName` absent from package.json, the publish block);
`dist-win.sh`'s wine + prebuild swap; `.github/workflows/release.yml` (fetch-depth 0, the
`BASE_COMMITS`/`BASE_MINOR` version formula against a deliberately stale committed `0.2.0`, native
Windows build, no reinstall after `npm ci`); the updater's stale guard, fire-and-forget download and
three `UpdateEnvironment` values; "no push events exist" (zero `ipcRenderer.on` in `src/`); the
FK-less link-table claims; Wallhaven purity and TMDB-backdrop scoping; `.epub` excluded from
`ARCHIVE_EXTS`; zero `dangerouslySetInnerHTML`; mokuro's `--disable_html` and `\r`-split progress
parsing; the entire `video/` pure/IO split and the extension-not-`format_name` container rule;
`@shared/subtitles.ts`'s Shift-JIS fallback, `\p1` stripping and `Comment:` skipping; the
deliberately-absent `syncMediaProgress` on the video-watched path; the whole file-associations chain;
`hltb.ts`'s formula at both write sites; `themeRepo` genuinely reusing `mediaRepo.buildWhere/buildOrder`;
qBittorrent's re-login-once rule; Jackett's `t=indexers&configured=true`; the checklist's
`WEEK_START = 6`; `en_word`'s 8 ensureColumns mirroring `jp_card`; `fetchWithRetry`'s per-attempt
timeout and independently-bounded 429 retries; the yt-dlp `--` guard; and the `backgroundColor` /
`--base-900` hex match.
