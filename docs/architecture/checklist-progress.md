# Checklist and app-wide progress logging

> Reference detail. The rules an agent must not break live in
> [CLAUDE.md](../../CLAUDE.md#hard-invariants) — this file is the "how and why" narrative.

**Covers** — the daily/weekly board, its four item kinds, custom items, rule history, schedules, skips and past-day edits, and the single pure definition of "I watched/read another one".

**Key files** — `@shared/checklist.ts`, `@shared/mediaProgress.ts`, `src/main/repos/checklistRepo.ts`, `src/renderer/src/pages/ChecklistPage.tsx`, `src/renderer/src/components/checklist/` (rows, dialogs, `useChecklistActions`, Home's `ChecklistQuickCard`)

**Tests** — `checklist`, `checklistRules` (pure states/streaks/masks), `checklistLegacy` (a pre-revamp board through startup), `checklistSeed`, `mediaProgress`, renderer `ChecklistPage`

---

## Checklist

**Checklist (2026-07-25, reworked 2026-07-27, revamped 2026-10-12)** — `/checklist` (`ChecklistPage`, sidebar link directly under Home, plus the interactive Routine card in Home's Today band): a daily + weekly recurring board. Built-in items are CODE (`src/shared/checklist.ts`, `CHECKLIST_DEFS`, each with a `group` for the add dialog and an optional `unit`); the user's own items are rows in `checklist_custom`, keyed on the board as `custom-<id>`. Built-in `key` strings and the custom form are FROZEN (stored in `checklist_task.task_key`/`checklist_log.task_key`).

Four item kinds:

- **mediaLog** — the checklist performs the tracking write through `logProgress` (anime/manga/TV episodes, films).
- **mediaSession** (books, visual novels) — pick what you read today. `startSession` in `@shared/mediaProgress` lifts an untracked or planned title to in-progress and nothing else: it never counts a unit, completes or wraps (books track pages). The log payload's `prior` holds status only, and that is all undo restores. Never route these through `advanceProgress`.
- **detected** — completion is READ from tables the app already writes (`DETECT` in the repo: SRS reviews, lessons, quiz rounds split into Japanese drills by `JP_QUIZ_KINDS` and English drills by the `english…` kind prefix, game sessions and whole minutes played, tutor days, English writing, first solves in `prog_solve`). Clicking the row goes where the activity happens. **Every detected item also takes hand-made credits** with an amount (`checklist:credit`, un-clamped, one log row each, individually undoable): `progress = detected + SUM(amount)`. v1 had no override and the user hit exactly the dead end it creates. Manga was detected from `manga_chapter.read_at` and is mediaLog for the same reason.
- **manual** — every custom item: a checkbox at target 1 (`tick`/`untick`, clamped at the target), a counter otherwise (`credit` with an amount).

**Rule history (`checklist_rule`).** v1 judged every past day against the CURRENT board, so removing an item or changing a target rewrote history. Now every board change goes through `changeTask`, which upserts a rule (target, weekday mask, active) for the current period (the day, or the week's Saturday). A period is judged by the item's latest rule with `from_day <= period`. A task with no rule rows falls back to its own `created_at`/`target`/`days`. The first change writes that baseline before the new rule, so no backfill migration exists. `removeTask` is a SOFT delete (`removed_at` plus an inactive rule), and re-adding revives the same row, id and history (`UNIQUE(task_key, cadence)`). The streak and heatmap pass includes removed rows, because their rules still judge the periods they were on the board for. Only `deleteCustom` hard-deletes, permanently, with its logs, skips and rules (behind `confirmDialog`).

**Schedules, skips and states.** A daily item may carry a weekday mask (`days`, bit = `getUTCDay()`, null = every day; `normalizeDays`). `checklist_skip` holds skipped periods (`task_id 0` = a whole rest day; a weekly item's skip covers its week). They are unlimited and drawn as outlined cells on the heatmap. The pure `itemPeriodState`/`dayState`/`checklistStreak` give every period one of done / missed / skipped / off / pending / future. A day is done when every DUE, unskipped daily item is done. Skipped and off periods bridge a streak without counting, and a pending today breaks nothing. The same function drives the overall streak, per-item streaks (days or weeks), the 30-day/13-week completion rate and the 7-dot strips. `musicRepo.computeStreaks` is untouched; it cannot express a neutral day.

## Tables, weeks and dates

Five tables: `checklist_task` (the board: nullable `target` override, `days`, `removed_at`), `checklist_rule`, `checklist_custom`, `checklist_skip` and `checklist_log` (events, with `amount`). There is NO FK between them and none on `media_id`: reads LEFT JOIN and fall back to the cached title (the jp_card.source_media_id precedent). `target` shipped one build after the board; `days`, `removed_at` and `amount` arrived with the revamp. All four are `ensureColumn`'d. All five tables are personal and wiped on export.

**Weeks run SATURDAY→FRIDAY** (`WEEK_START = 6`; SQL groups a week with `date(d,'-6 days','weekday 6')`). `period_key` is the local day for daily rows and the week's Saturday for weekly.

**Every date is computed in MAIN as a LOCAL day** and passed into the repo. `ipc.ts`'s `todayLocal()` sits at the top of `registerIpc`, shared by the checklist and the TV air-date cutoff. The renderer only formats main's date strings and may send one back as the `day` to view or edit. Main validates it (a real day, not after today, within 364 days): reads fall back to today, writes throw. A past-day media log credits that day but moves the title now. Detection reads are bounded below by a window start computed from `today`, never SQL `date('now')`.

**One read channel.** `checklist:status(day?)` returns:

- the viewed day's boards (per item: state, detected/credited, streak, rate, strip, entries and up to three one-click `suggestions`);
- the week strip, the summary, the rest-day flag, the overall streak;
- a 52-week history with skipped days.

The board **seeds itself on first launch** (`seedChecklist` in connection.ts, `CHECKLIST_SEED`, gated by the `checklist.seeded` setting). The setting is wiped on export alongside the tables, or a recipient's board never seeds.

**Renderer.**

- Queries use `qk.checklist.status(day)` (null = today; `qk.checklist.all` is the prefix every write invalidates) with `staleTime: 0`. The page adds a 60s interval, so returning from `/japanese/review` re-detects and an idle page rolls over at midnight.
- Every write goes through `useChecklistActions`, shared with Home. Media writes also invalidate `qk.media.all`.
- The page shows a hero with a Saturday-first week strip (previous/next week steps back through the editable window; the viewed day lives in `usePersistedState`), Today and This week boards (items off their schedule fold into a `<details>`), and the heatmap.
- Rows have one primary action per kind (checkbox, +1/Add amount, one-click titles plus Log…). Skip, Edit and Remove sit in an `ActionMenu`.
- Reorder mode uses `SortableList`/`useOptimisticReorder`. Memoise the mapped rows: its re-sync effect keys on array identity.
- `ChecklistAddDialog`'s cadence is CONTROLLED by the page (`adding` IS the cadence). v1's local `useState(cadence)` copy is what made daily and weekly appear swapped.
- The media picker reuses `api.media.list({mediaType, search})` (NOT `UniversalPicker`, whose global search caps at 20 rows across all types), floats in-progress/planned titles to the top and marks finished ones "Again" (never for a session).
- All three dialogs use `Dialog.tsx` + `Field`.
- Home's `ChecklistQuickCard` is a non-link card (buttons cannot nest in `DoorCard`'s link) with the next three open items.

Tests: mediaProgress.test.ts (pure rules incl. rewatch arithmetic and `startSession`), checklistRules.test.ts, checklist.test.ts (`process.env.TZ='UTC'`, anchored on Sat 2026-07-25). Board rows created in a test carry the real `created_at`, which postdates the pinned dates; `backdateTasks` before judging history.

## Progress logging is app-wide, not a checklist silo

**Progress logging is app-wide, not a checklist silo.** `@shared/mediaProgress.ts` is the single pure definition of "I watched/read another one": `advanceProgress(state, statuses, unitProgress)` does status promotion (null/planned → in-progress, last unit → completed) and, on an already-finished title, **wraps into a fresh pass** — `progress` back to 1, `rewatch_count = max(count,1)+1` (that column is *times consumed*, which is how `mediaRepo.timeStats` reads it), flagged by `startedRewatch` so callers announce it instead of silently resetting. It also owns `STATUS_FALLBACKS`/`parseStatuses` (main can't import mediaConfig.ts) and `UNIT_PROGRESS_TYPES` (mirrors `MediaConfig.unitProgress` — keep in step). `checklistRepo.logProgress(mediaId, today, task?)` is the ONE write path: with a task (checklist Log button) or without (every media detail page's log button, `media:logProgress`, labelled from `MediaConfig.logUnitLabel`), in which case it credits whatever mediaLog item covers that type — a daily one due today, then a weekly one, then a daily one off its schedule — or none. `payload.prior` snapshots progress/status/rewatchCount so undo restores a rewatch too.
