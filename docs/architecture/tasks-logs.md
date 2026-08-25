# Tasks and logs

*Added 2026-08-14.* Two related subsystems: a registry that makes every long-running
main-process job visible, pausable and stoppable in one place, and the app's first real logger.

## The problem this solved

Before this, progress reporting was three unrelated shapes:

- **One global activity slot** (`src/main/progress.ts`) shared by all 17 `withActivity` importers.
  A second import silently took the slot over, so two overlapping imports showed as one.
- **~18 bespoke `*Status` invoke channels**, each with its own object shape, its own renderer hook
  and its own panel. Seven of them had **no cancel at all**; none could pause.
- Nothing tied them together, so "what is the app doing right now" had no answer.

And there was **no logging whatsoever** — zero `console.*` in `src/main`, no logger dependency, no
file. Child-process output from yt-dlp, ffmpeg and mokuro was captured and then thrown away except
for a 20-line tail kept for one error message.

## The registry projects; it does not replace

**Every existing `*Status` channel is untouched, and no existing per-feature progress UI was
rewritten.** `src/main/tasks.ts` is a read-side projection: each subsystem keeps writing only its
own status object and registers a pure `project()` that READS it.

```ts
tasks.create({
  kind: 'musicDownload',
  label: `Download: ${artist} — ${album}`,
  route: '/music',
  controls: downloadControls(id),
  project: () => (status?.id === id ? { state: DOWNLOAD_STATE[status.status], … } : null)
})
```

Three reasons it pulls rather than being pushed to:

1. **There are zero renderer tests and the dev machine is headless.** Migrating `useBulkRun`,
   `useOcrRun`, `useUpdateStatus`, `MusicDownloadDialog`, `PreparePanel`, `BulkImportPage` and the
   rest is ~18 UI surfaces whose only verification is clicking them.
2. **The generic row cannot carry the specific fields** — `speed`/`etaSec`, `itemIndex/itemCount`,
   `imported/skipped/failed`, `volumeTitle`. Collapsing them deletes working UI; making the row a
   union of all 18 payloads just relocates the problem.
3. **A mirror would be two sources of truth**, and a drift bug per subsystem. With a projection,
   a bug can only produce a wrong row on the Tasks page — it structurally cannot break a panel.

Returning `null` from `project()` **settles the row** `cancelled: superseded by a newer run`: that
is the same `status.id !== id` staleness guard every subsystem already keeps for its own writes, so
null means "a newer run took the module's slot" and never "still going, nothing to report". It has
to settle rather than merely stop projecting — a row left `running` is not terminal, so `prune()`
and `clearFinished()` both skip it for the rest of the session, `tasks` grows unbounded, and
`useTasks` pins its poll at the 700 ms active interval. (`jackett.startSearch` replaces its job
with no already-running guard, so this was reachable by typing a second search.) A projection that
returns a terminal state **auto-settles** the task, so most subsystems never call `settle()` at
all. Each `project()` call is individually try/caught — one throwing projection degrades its own
row and nothing else.

A subsystem that brackets itself with `beginActivity`/`endActivity` (bulkImport, wrestling) must
pass the handle `beginActivity` returned back to `endActivity(err, own)`. The activity slot is a
single global: a dialog import started mid-run takes it, and settling "whatever is in the slot now"
would mark that still-running import `done` and blank the progress bar it is using.

`list()` **is** the tick: it pulls every projection and prunes finished rows. There is deliberately
no timer — `achievementWatcher.ts` owns the app's one main-side interval.

Retention: live forever; finished for 30 minutes capped at the newest 40; `ephemeral` rows
(torrent searches, which fire constantly) for 60 seconds and only the newest per kind.

### How each subsystem joined

| Shape | Modules | How |
|---|---|---|
| `withActivity` | all 17 importers + achievements + catalog install | free, via the `progress.ts` adapter — **no call-site edits at all** |
| `let status` + own id | musicDownload, mokuroRun, video/session, updater, bulkImport, wrestlingImport, jackett | a `project()` beside the existing status object |
| `const state = { running }` | music scan, musicArt, dictImport, prepDeck, coreDeck, coverage, video scan | wrapped in `tasks.runTask()` |
| nothing at all | manga rescan | registry-sourced via `handle.progress()` — this scan used to be completely dark |

`beginActivity(label, { attachTo })` exists for the two modules that bracket themselves
(`bulkImport.ts`, `wrestling/importRun.ts`): they pass their own handle so the Topbar pill still
arms without each title minting a row. They settle their own task in the `finally`, because a
nested import releasing the shared slot must not close theirs.

`withActivity` settles the task **it** created, not whatever holds the slot. That distinction is
load-bearing: two overlapping imports would otherwise close each other's task and leave one
running forever.

## Pause

`src/main/taskControls.ts`. Two constructors, two traps that each cost a test.

**`processControls(getProc, opts)`** — SIGSTOP/SIGCONT for yt-dlp, ffmpeg and mokuro.

- **Windows has no signals.** `proc.kill('SIGSTOP')` there **ignores the name and terminates the
  process**. Un-gated, Pause would destroy an in-flight download on the one machine the app
  actually runs on. `canSignalPause()` gates it; on win32 the constructor returns cancel only,
  with a `pauseNote` the disabled button shows as its tooltip.
- **SIGTERM is queued for a stopped process.** So `cancel()` sends **SIGCONT first**, then the
  module's cancelled flag, then SIGTERM, then SIGKILL after 5s. Without that, cancelling a paused
  job appears to hang for five seconds. The three pre-existing `cancelDownload`/`cancelOcr`/
  `cancelPrepare` functions now route through this, so the ordering exists in one place.

Pausing a task must **never** pause our stdout/stderr readers: a stopped child that fills the
64 KB pipe buffer blocks in `write()`, and SIGCONT would not free it until we resumed reading.
The line splitters run unconditionally for the child's whole life.

Pause is **best-effort by design**: `kill()` signals the direct child only, so pausing during
yt-dlp's `[ExtractAudio]` stops yt-dlp but not the ffmpeg it spawned. Process groups would change
the quit semantics of three existing killers — a separate, riskier change.

**`cooperativeGate()`** — for loop jobs (bulk import, wrestling import, art fetch). Pause means
*"stop starting new work"*: the item in flight finishes first, which for an import can be a whole
`fetchWithRetry` timeout plus 429 waits. Hence the two-phase state — `pausing` (requested) →
`paused` (the gate is really blocking, reported by the gate's own callback). A child process goes
straight to `paused`, since SIGSTOP is instant.

`cancel()` on the gate **must** release a paused waiter, or the loop deadlocks forever and
`settleAllOnQuit()` can never finish it.

The gate awaits are **guarded** (`if (gate.paused) await gate.wait()`), never unconditional:
awaiting an already-resolved promise still defers a microtask, which would delay every item by a
tick and shift when a cancel is observed relative to the item in flight.

## Cancel

Every kind is cancellable except the two folder walks (`mangaRescan`, `videoScan`), which finish in
seconds and report `canCancel: false` honestly.

The importers were the interesting case: 20 modules, no cancel, and `fetchWithRetry` must never be
given a caller `signal` (it would win over the per-attempt timeout, making one deadline span every
retry). The answer needed **no importer edits at all**: `updateActivity()` and `imageProgress()`
throw `TaskCancelledError` when their task has been cancelled. Every importer already calls those,
and `downloadImages`' worker pool calls `imageProgress` after every image — the long phase of an
import — so a stop lands within one image.

`TaskCancelledError` **rejects** rather than resolving `undefined`: callers like `ImportDialog` do
`const item = await api.anilist.import(…)` and then read `item.id`. Its message is written for a
human because the renderer's global `unhandledrejection` net toasts it, and after clicking Stop
"Cancelled: Importing from AniList" is the right feedback. A task that stops this way settles
**`cancelled`, never `error`** — a deliberate stop must not be painted red.

## The logger

Three files, split so **no producer of log lines ever pulls in electron**. This is not aesthetic:
`tests/http.test.ts` imports `src/main/http` with no electron mock, and `logBus` is imported by
`http.ts` and `db/connection.ts`. `tests/noConsole.test.ts` locks the property.

| File | Role |
|---|---|
| `logCore.ts` | **Pure, zero runtime imports.** `redact`, `formatLine`, `rotationPlan`, `Ring`, `makeProcLineFilter` |
| `logBus.ts` | The singleton. Ring + sinks + the cursor read. Imports only `logCore` |
| `logFile.ts` | The only one touching electron/fs |

- **`redact()` runs at ingest**, so the ring and the file are both clean — redacting at read time
  would leave plaintext keys on disk. Covers `?api_key=`-style params, `Authorization: Bearer`, and
  GitHub PATs, plus a **host-scoped** rule for RetroAchievements, whose credentials are the
  single-letter params `z=<username>&y=<apiKey>` that no name-based rule can match without eating
  unrelated query strings. `http.ts` logs the full URL on every retry and every `>=400`, and this
  file is outside the export sanitizer — **any new source whose credential is not a recognisable
  param name needs its own rule here**, with a case in `tests/logCore.test.ts`.
- **`makeProcLineFilter()` is a correctness requirement, not an optimization.** ffmpeg's stdout is
  the `-progress` protocol and is never routed to the bus at all; its stderr drops per-frame status
  lines; yt-dlp percentages survive only on 10% boundaries, mokuro's tqdm on 25%. Without this one
  conversion evicts the whole 3000-entry ring in under a minute.
- **`seq` is monotonic and never reused.** The renderer holds it as a cursor; an index-based id
  would silently rewind every time the ring wrapped.
- **File sink**: `userData/logs/navihub.log`, rotating at 2 MB keeping 3. `openSync` + `writeSync`
  with a debounced **unref'd one-shot** flush — deliberately not a `WriteStream`, because
  `stream.end()` is async and `before-quit` does not await, so the tail of every session would be
  lost. Degrades to a no-op if `userData` is unwritable.
- **Cursor read**: omit `afterSeq` to seed, and main answers with the *newest* entries rather than
  the oldest, so a freshly-opened viewer is instantly current. `nextSeq` tracks the last **scanned**
  seq, not the last returned one — otherwise a level filter would rescan the same run forever.

`uncaughtException` is deliberately **not** handled: registering a handler suppresses Electron's
default fatal behaviour, and logging-then-still-crashing means rethrowing inside the handler. That
is a change to crash semantics that wants a real eyeball first.

**Log files are outside the export sanitizer.** They hold library paths, search queries and URLs;
`scripts/sanitizeSql.cjs` covers the DB only.

## The renderer

Task Canvas navigation has one owner: the System drawer reaches Tasks, Logs, Bulk Import,
Torrents and Settings, and the adaptive Topbar switches between them. There is no permanent Tasks
rail button and no second in-page tab row.

- `lib/useTasks.ts` — the `useBulkRun` idiom with one deliberate difference: idle is a **5s
  heartbeat**, not `false`. It is the app-wide discovery surface (mounted by the Topbar pill on
  every page), so a job started from the native menu must still appear. 700ms while anything is
  live. Two observers share one cache entry.
- The **settled toast** is the likeliest defect here. Six existing hooks already toast, so
  `useTasks` keeps an `OWNED` set of kinds it stays silent for, and the dedupe set is
  **module-level** — the pill and the page mount the hook simultaneously, so a per-instance guard
  would fire twice.
- `lib/useLogTail.ts` — cursor in a ref, rows in component state (the `useTorrentSearch` idiom).
  Keying the query by cursor would mint a cache entry every second. Memory is capped in three
  independent places: main's ring, the 500-row page limit, and a 5000-row client slice.
- **Logs render newest-first**, and Follow pins to the top, auto-disarming once you scroll down to
  read history. `useIncrementalList` is a top-anchored reveal, so bottom-following would need a
  scroll-anchoring idiom that exists nowhere else and would fight the reveal on every append. This
  way Follow is `scrollTo({top: 0})` and the sentinel means "load older". Copy re-reverses to
  chronological.
- The Topbar `<header>` carries **`relative z-30`**, which is load-bearing: `backdrop-blur` creates
  a stacking context, so without it the dropdown renders behind any card it overlaps.
- `.log-row` is a component class rather than Tailwind's `font-mono`, because `tailwind.config.js`
  extends colors and radii only — its `font-mono` resolves to the system stack, not the bundled
  IBM Plex Mono.

## The Tools menu

`src/main/appMenu.ts` **appends** to `Menu.getApplicationMenu()` rather than authoring a template.
The default menu is what provides Ctrl+R, F11, Ctrl+Shift+I and the zoom accelerators while the bar
is hidden; rebuilding it by hand risks silently dropping one. The bar stays opt-in
(Settings → General) — this only adds a submenu to it.

Menu items **cannot push to the renderer** (the push surface is frozen at `player:cmd` /
`player:state`). Tasks and Logs park a route in `appMenu.takePendingRoute()`, drained by the poll
`OpenFileHandler` already runs on focus/visibility/backstop — zero new timers. No accelerators on
purpose: a hidden menu keeps its accelerators, and one here would fire inside the manga reader and
the video player, which own their keyboards.
