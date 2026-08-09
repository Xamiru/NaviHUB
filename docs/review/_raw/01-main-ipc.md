# Main process & IPC contract — recon findings

Scope: `src/main/**`, `src/preload/index.ts`, `src/shared/api.ts`. Read-only recon; all
findings are grounded in the actual code, not `CLAUDE.md`'s summary of it.

---

### Global activity slot has no stale-run guard — concurrent imports corrupt each other's status
`high` | `verified` | `src/main/progress.ts:13-42`
`withActivity`/`beginActivity`/`endActivity` share ONE module-level `state` object with **no run id**, unlike every other polled singleton in this codebase (`video/session.ts`, `musicDownload.ts`, `mokuroRun.ts`, `updater.ts`, `dict/importer.ts`'s `runImport`, `coreDeck.ts`, `prepDeck.ts`, `coverage.ts` — all of which either carry a `status.id`/`active.id` stale-run check or synchronously throw when a second run starts while one is active). Here a second `beginActivity()` simply overwrites `state` (comment at line 6 even says so: "a second begin simply takes over the slot"), and the FIRST run's `finally { endActivity() }` (line 39-41) unconditionally sets `active:false` on whatever is in the slot — even if a second, unrelated activity is now running there. 16 call sites in `ipc.ts` route through `withActivity` (every AniList/TMDB/VNDB/RAWG/OpenLibrary/AnimeThemes importer + the FGO catalog import), and nothing in the renderer prevents starting a second one while the first's image-download phase is still in flight (`ImportDialog.tsx` only disables the button inside its OWN dialog instance; closing the dialog does not cancel the in-flight `client.import(id)` promise). Concretely: start an AniList import, close the dialog before the image-download phase finishes, open a TMDB import and start it, then the AniList import's `finally` fires and wipes the TMDB run's `active:true`/progress out from under it — `updateActivity`/`imageProgress` guard on `if (state.active)` (progress.ts:20,26), so once wiped, the TMDB run's own progress updates silently stop applying too.
Fix: give the activity slot a run id (like every other singleton here) and have `endActivity` no-op unless it owns the current run.

### `video:markWatched` composes two non-transactional writes — a partial failure leaves inconsistent state
`med` | `verified` | `src/main/ipc.ts:378-381`
```js
ipcMain.handle('video:markWatched', (_e, fileId, watched) => {
  const res = video.markWatched(fileId, watched)
  if (res?.firstTime) checklistRepo.logProgress(res.mediaId, todayLocal())
})
```
`video.markWatched` (`src/main/video/scan.ts:413-431`) commits its own `UPDATE video_file` immediately. `checklistRepo.logProgress` (`src/main/repos/checklistRepo.ts:126-183`) is a SEPARATE `db.transaction(...)` that can throw (e.g. `Media ${mediaId} not found`, or a checklist-def lookup failure). If it throws, the handler throws, the renderer's `api.video.markWatched()` call rejects — but `video_file.watched_at` is already committed. The player UI sees an error (and won't optimistically flip its "watched" state or credit the checklist), yet a reload will show the episode as watched with no checklist credit and no progress advance: a silent, hard-to-reproduce desync between what the user was told happened and what's in the DB.
Fix: wrap both writes in one transaction, or catch/report the logProgress failure separately from the watched-flag write.

### `musicDownload.ts`'s `close` handler mutates shared `active` without an id check
`med` | `verified` | `src/main/musicDownload.ts:192-194`
```js
proc.on('close', (code) => {
  const wasCancelled = active?.cancelled ?? false
  active = null
  ...
```
Every sibling singleton guards this exact spot: `video/session.ts:106-107` (`const wasCancelled = active?.id === id && active.cancelled; if (active?.id === id) active = null`) and `mokuroRun.ts:176-177` do the identical thing WITH an id check before touching `active`. Here there is none. If this process's `spawn` triggers `proc.on('error', ...)` first (which already nulls `active` at line 190) and a NEW download is started before this SAME process later also fires `close` (Node can emit both for some failure modes), the stale `close` handler reads `active?.cancelled` off the NEW download's `active` object and then unconditionally nulls it out — corrupting the new download's tracking (its `cancelDownload` would silently no-op, and the "already running" guard in `startDownload` would incorrectly allow a THIRD concurrent yt-dlp process). The file's own comment at line 112-115 notes this runner is "verified manually, not unit tested," so nothing catches it.
Fix: capture `id` in the closure (already done) and guard both lines on `active?.id === id`, matching `video/session.ts`.

### `gacha.createGoal` / `gacha.updateGoal` are unreachable from the renderer
`med` | `verified` | `src/shared/api.ts:810-811`
Both are fully wired (ipc.ts:572-573, preload:387-388), but no page or component calls `api.gacha.createGoal`/`updateGoal` — `CoachRail.tsx` only calls `goals`, `completeGoal`, `dropGoal` (confirmed via `grep -rn "createGoal\|updateGoal" src/renderer/src` → zero hits). The only real caller is the LLM coach's own `add_goal`/`update_goal` tools (`src/main/coachTools.ts:495,526`), which call `coachRepo.createGoal`/`updateGoal` **directly in-process**, bypassing IPC entirely. So despite the api.ts doc comment "goals & recurring tasks (reminders — **no LLM call**)" implying user-facing CRUD, a user cannot add or edit a goal by hand — only by asking the coach to do it (which does spend an LLM call, the opposite of what the comment promises).
Fix: either build the manual add/edit UI these channels were clearly meant for, or delete them and update the doc comment to say goals are LLM-only.

### `gacha.coachThreads` is unreachable — past chat threads are invisible in the UI
`med` | `verified` | `src/shared/api.ts:803`
`coachRepo.listThreads` and the `gacha:coachThreads` channel exist end-to-end (ipc.ts:567, preload:382), and `qk.gacha.coachThreads` even has a query-key factory (`queryKeys.ts:262`) — but nothing calls it. `GachaCoachPage.tsx` only fetches the single active thread (`coachThread`) and can start a new one (`coachNewThread`, line 123), with no way to browse or switch back to a previous thread. Every "New thread" click permanently orphans the previous conversation in the UI (the data survives in `gacha_chat_thread`, just nothing reads it back).
Fix: add a thread list/switcher to `GachaCoachPage`, or drop the dead channel + query key if thread history was deliberately cut.

### `video.scanStatus` is fully wired but never polled — video folder scans show no progress
`low` | `verified` | `src/shared/api.ts:664`, `src/main/video/index.ts` (`getScanStatus`)
The doc comment says "Long-running; poll while attachFolder/rescan is pending," and the channel/preload/type (`VideoScanStatus`) all exist, mirroring `music:scanStatus` which IS polled by `MusicLibraryPage.tsx`. But `VideoEpisodesSection.tsx` (the only caller of `video.attachFolder`/`rescan`) just does a plain `await` with a `busy` boolean and a toast at the end (lines 43-55) — it never calls `api.video.scanStatus()`. For a large video library this is a silent multi-second freeze in the UI with only a disabled button, unlike the manga/music/OCR scans which all show live progress.
Fix: either wire `VideoEpisodesSection` to poll `scanStatus` like `MusicLibraryPage` does, or remove the unused status plumbing.

### LLM SDKs are loaded eagerly on every app start, not just when a coach/writing feature is used
`low` | `verified` | `src/main/llm.ts:9-11`
```ts
import { GoogleGenAI } from '@google/genai'
import Anthropic from '@anthropic-ai/sdk'
import { AnthropicVertex } from '@anthropic-ai/vertex-sdk'
```
These are VALUE imports (not `import type`), and `llm.ts` is imported by both `gachaCoach.ts` (`from './llm'`, line 14-21) and `englishWriting.ts` (line 1) — both of which `ipc.ts` imports unconditionally at module scope (`ipc.ts:62,20`), and `ipc.ts` is loaded by `index.ts` before `whenReady`. So every NaviHUB launch requires and initializes all three LLM SDKs, even for users who never open the FGO Coach or English Writing pages — the one part of the app CLAUDE.md calls out as needing to stay optional/lazy in spirit (`ytdlp.path`/`ffmpeg.path`/`mokuro.path` are all lazy, and `music-metadata` is explicitly lazy-imported for exactly this reason). Contrast with `dict/importer.ts:566` and `mokuroRun.ts` which lazy-`import('electron')` only when actually needed.
Fix: lazy-import (`await import(...)`) the three SDK constructors inside `makeGemini`/`makeAnthropic` in `llm.ts` instead of at module top level.

### Four IPC channels have no reachable caller in the renderer
`low` | `verified` | `src/shared/api.ts:237,243,253,264,867`
- `characters.cast` (api.ts:237) — `characterRepo.cast` is wired end-to-end but nothing calls it (there is no `/characters` index page — confirmed by the comment at `CharacterDetailPage.tsx:55`: "No /characters index exists").
- `credits.add` (api.ts:243) — only `credits.remove` is used (`MediaDetailPage.tsx:920`); there is no "add cast member" UI anywhere, so a credit can only be attached via an importer.
- `mediaCompanies.add` (api.ts:253) — same story; only `mediaCompanies.remove` is used (`MediaDetailPage.tsx:400`).
- `tags.remove` (api.ts:264) — `TagsIndexPage.tsx` has no delete button; tags can only be created (`MediaFormPage.tsx`) or browsed, never removed, so unused imported tags accumulate forever with no UI path to prune them.
- `settings.get` (api.ts:867) — the renderer only ever calls `settings.all()` (`lib/hooks.ts:11`) and `settings.set()` (`SettingsPage.tsx:59`); the single-key getter is never used.
Fix: either these are intentionally-unfinished CRUD surfaces (fine, but worth tracking) or dead code to delete — worth a decision either way since they inflate the "what does the UI actually support" surface silently.

### `before-quit` DB-write ordering only works because of an undocumented lazy-reopen in `getSqlite()`
`low` | `verified` | `src/main/index.ts:242-269`, `src/main/db/connection.ts:183-203`
On Linux/Windows, closing the last window fires `window-all-closed` FIRST (`index.ts:242-248`), which calls `closeDatabase()` (sets `_sqlite = null; _db = null`) and then `app.quit()`. That asynchronously triggers `before-quit` (`index.ts:250-269`), whose comment says `finalizeActiveGameSession()` "must run before `closeDatabase()`" — but by the time `before-quit` runs, `closeDatabase()` has ALREADY run once (in `window-all-closed`). This only doesn't lose the in-flight game session's DB write because `getSqlite()` (`connection.ts:188-191`) silently calls `initDatabase()` again when `_sqlite` is null, reopening a brand-new connection (replaying `init.sql` + `runMigrations` + both seed functions) just to write one row before `closeDatabase()` closes it again seconds later. This is the ordinary quit path for every non-macOS user, not an edge case — it currently self-heals, but relies on behavior nobody documented as load-bearing; a future change to `getSqlite()` (e.g. throwing instead of lazily reopening once closed) would silently start dropping the final game session on every normal quit.
Fix: either call the before-quit teardown list from `window-all-closed` before `closeDatabase()` runs (and skip the duplicate call in `before-quit`), or add a comment on `getSqlite()`'s lazy-reopen documenting that `before-quit` depends on it.

---

## What's good here

- **Contract integrity is solid.** A full mechanical diff of every `ipcMain.handle('x', ...)` channel against every `ipcRenderer.invoke('x', ...)` call in `src/preload/index.ts` found zero orphans in either direction (334 channels, exact match), and a parameter-count/name diff across every handler found zero arity or positional-name mismatches — the preload/ipc.ts pairing in this codebase is disciplined.
- **The video/mokuro/game/update singletons all get the stale-run guard right.** `video/session.ts:106-107`, `mokuroRun.ts:176-177`, `gameLaunch.ts:33-37`, and `updater.ts:64-69` (`apply()`) all check the run id before mutating shared state or writing to `status`, and all correctly reject a concurrent start rather than silently overwriting (`video/session.ts:41`, `mokuroRun.ts:112`, `gameLaunch.ts:77`, `musicArt.ts:232`, `dict/importer.ts:545`, `coreDeck.ts:28`, `prepDeck.ts:205`, `coverage.ts:27`) — `progress.ts` is the one clear outlier (see above).
- **`open/<token>` map is properly bounded and LRU-evicted.** `src/main/files.ts:97-113` caps at 32 entries with delete-then-set LRU touch semantics, and `openFile.ts:102` caps the pending-open queue at 32 too — no unbounded growth from repeated file-open events.
- **`app:pendingOpen`'s read-and-clear contract is honored correctly on both ends.** `openFile.ts:109-113` (`takePending`) truly clears, and `OpenFileHandler.tsx` polls on mount/focus/visibilitychange/interval with a `cancelled` guard against a stale in-flight request — no double-delivery or lost-update risk found.
- **`dict/importer.ts`'s single-flight gate is the right pattern**, and every other bulk-job module in main (`musicArt.ts`, `coreDeck.ts`, `prepDeck.ts`, `coverage.ts`) copies it consistently — synchronous throw on a concurrent start, not a silent takeover.
