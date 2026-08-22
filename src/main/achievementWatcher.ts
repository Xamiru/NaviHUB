import * as achievementRepo from './repos/achievementRepo'
import { exeDirOf, nodeFileIO, scanUnlocks, windowsEnv } from './emuScan'
import type { EmuFileIO } from './emuScan'
import type { EmuEnv } from './achievementsCore'
import { getSqlite } from './db/connection'
import * as retroAchievements from './retroAchievements'
import * as achPopup from './achPopup'
import { ACH_POPUP_BURST_AT } from '@shared/achievements'
import type {
  AchievementRow,
  AchievementUnlockEvent,
  AchievementWatchStatus,
  AchievementProvider,
  MediaType
} from '@shared/types'

// Live achievement detection while a game runs. This is the app's ONE
// main-side interval, and it exists because the alternative cannot work: the
// user is in a fullscreen game, so the renderer is occluded (its timers are
// throttled to seconds-to-minutes) and cannot raise anything the user would
// see anyway.
//
// Popups go through achPopup.ts — a click-through always-on-top overlay that
// floats over the game, because OS notifications are suppressed during
// fullscreen apps on Windows. The overlay polls getWatchStatus() itself; this
// module only guarantees the glass is up. When the overlay cannot be raised
// (no display, hardened profile), the old OS-notification path takes over.
//
// Lifetime is bounded by the play session: startWatch on spawn, stopWatch on
// exit, and stopAchievementWatcher() in the before-quit registry — where it
// runs BEFORE closeDatabase(), because the final sweep writes unlock rows.

const STEAM_POLL_MS = 5_000
// RA is a network call against someone else's server; 30 s is responsive
// enough for a popup and nowhere near their rate limits.
const RA_POLL_MS = 30_000
const RECENT_KEPT = 20

type Watch = {
  mediaId: number
  provider: AchievementProvider
  providerGameId: string
  exeDir: string | null
  startedAtMs: number
  // Skips the parse entirely while no emulator file has been rewritten.
  lastMtimeMs: number | null
}

let timer: NodeJS.Timeout | null = null
let watch: Watch | null = null
let seq = 0
let recent: AchievementUnlockEvent[] = []
let message: string | null = null
// Set once by stopAchievementWatcher(); see the check in pollOnce's RA branch.
let quitting = false

export function getWatchStatus(): AchievementWatchStatus | null {
  if (!watch && !recent.length) return null
  return {
    running: !!watch,
    mediaId: watch?.mediaId ?? null,
    provider: watch?.provider ?? null,
    seq,
    recent: [...recent],
    message
  }
}

function mediaOf(mediaId: number): { title: string; mediaType: MediaType } {
  const row = getSqlite()
    .prepare('SELECT title, media_type FROM media_item WHERE id = ?')
    .get(mediaId) as { title: string; media_type: string } | undefined
  // VNs track achievements too, so the type has to ride along — every link out
  // of an unlock resolves its detail route from it.
  return { title: row?.title ?? 'Game', mediaType: (row?.media_type ?? 'game') as MediaType }
}

// The user is fullscreen in a game — this popup is the whole point of the
// feature, so a failure to raise it must never take the session down: the
// overlay is tried first, and its OS-notification fallback (inside achPopup)
// covers environments where no window can exist.
function notify(event: AchievementUnlockEvent): void {
  if (!achPopup.showUnlock()) achPopup.fallbackNotify(event)
}

// The batch form. Above ACH_POPUP_BURST_AT, one popup per unlock becomes a
// stack nobody can read — the overlay page collapses its own poll batches the
// same way, so this only governs how many raise() calls (and fallback
// notifications) fire.
function notifySummary(count: number, mediaTitle: string): void {
  if (!achPopup.showBurst()) achPopup.fallbackNotifySummary(count, mediaTitle)
}

function publish(mediaId: number, rows: AchievementRow[]): void {
  if (!rows.length) return
  const { title: mediaTitle, mediaType } = mediaOf(mediaId)
  const burst = rows.length > ACH_POPUP_BURST_AT
  for (const row of rows) {
    seq += 1
    const event: AchievementUnlockEvent = {
      seq,
      achievementId: row.id,
      mediaId,
      mediaTitle,
      mediaType,
      name: row.name,
      description: row.description,
      iconPath: row.iconPath,
      rarity: row.rarity,
      points: row.points,
      unlockedAt: row.unlockedAt ?? new Date().toISOString()
    }
    recent = [...recent, event].slice(-RECENT_KEPT)
    if (!burst) notify(event)
  }
  // The in-app list still gets every event above; only the OS popups collapse.
  if (burst) notifySummary(rows.length, mediaTitle)
}

export type WatchDeps = {
  io?: EmuFileIO
  env?: EmuEnv
  now?: () => number
  raRecent?: (minutes: number) => Promise<
    { raGameId: string; apiName: string; unlockedAtMs: number | null }[]
  >
}

// One tick. Exported and fully injectable so tests drive the whole detection
// path — read, diff, write, publish — with no timer, no emulator and no games.
// `target` defaults to the live watch; stopWatch passes its own so a session
// ending while another starts still sweeps the game that actually exited.
export async function pollOnce(
  deps: WatchDeps = {},
  target: Watch | null = watch
): Promise<AchievementRow[]> {
  const w = target
  if (!w) return []
  const now = deps.now ?? Date.now

  if (w.provider === 'ra') {
    const fetchRecent = deps.raRecent ?? retroAchievements.recentUnlocks
    // Only what could have happened during this session, plus a minute of slack
    // for clock skew between here and RA.
    const minutes = Math.ceil((now() - w.startedAtMs) / 60_000) + 1
    let rows: { raGameId: string; apiName: string; unlockedAtMs: number | null }[]
    try {
      rows = await fetchRecent(minutes)
    } catch (e) {
      // Offline mid-session, or credentials rotated: keep the session going and
      // say so rather than killing the watch.
      message = `RetroAchievements poll failed — ${e instanceof Error ? e.message : String(e)}`
      return []
    }
    message = null
    // The await above can outlive the app: an RA fetch has a 20 s per-attempt
    // timeout, endSession fires stopWatch() fire-and-forget, and before-quit
    // runs closeDatabase() right after stopAchievementWatcher(). Writing here
    // would make getSqlite() REOPEN the database during shutdown — re-running
    // init.sql, migrations and seeds — and leave it open with no checkpoint.
    if (quitting) return []
    const mine = rows
      .filter((r) => r.raGameId === w.providerGameId)
      .map((r) => ({ apiName: r.apiName, unlockedAtMs: r.unlockedAtMs }))
    const fresh = achievementRepo.insertUnlocks(w.mediaId, mine, 'ra', now())
    publish(w.mediaId, fresh)
    return fresh
  }

  const io = deps.io ?? nodeFileIO
  const env = deps.env ?? windowsEnv()
  const scan = scanUnlocks(w.providerGameId, w.exeDir, io, env)
  // Nothing has been rewritten since the last look — the common case, and the
  // reason a 5 s interval costs nothing.
  if (scan.newestMtimeMs != null && scan.newestMtimeMs === w.lastMtimeMs) return []

  const fresh = achievementRepo.insertUnlocks(
    w.mediaId,
    scan.unlocks,
    'emu',
    scan.newestMtimeMs ?? now()
  )
  // AFTER the write, never before: a throw here (SQLITE_BUSY against a
  // concurrent import transaction) is swallowed by tick(), and an already-moved
  // watermark would make every later tick — and stopWatch's final sweep — take
  // the early return above, losing those unlocks for the rest of the session.
  w.lastMtimeMs = scan.newestMtimeMs
  publish(w.mediaId, fresh)
  return fresh
}

function tick(): void {
  void pollOnce().catch(() => {
    // pollOnce already absorbs provider errors; this is the last line so an
    // unexpected throw can't become an unhandled rejection in main.
  })
}

// Called from gameLaunch.startSession once the child is spawned. A game with
// no tracking set up is a no-op — no timer, no cost.
export function startWatch(mediaId: number, nowMs: number = Date.now()): void {
  stopWatchTimer()
  // Clear FIRST: launching an untracked game must not leave the previous
  // game's watch standing, or getWatchStatus() would report the wrong title as
  // running and a later sweep would read the wrong save files.
  watch = null
  // Cleared BEFORE the tracking guard, not after: launching an untracked game
  // must not leave the previous game's unlocks and error message standing, or
  // getWatchStatus() keeps returning them (it is non-null whenever `recent` is)
  // and the renderer attributes them to the game now running.
  message = null
  recent = []
  const tracking = achievementRepo.getTracking(mediaId)
  if (!tracking) return

  const row = getSqlite().prepare('SELECT exe_path FROM media_item WHERE id = ?').get(mediaId) as
    | { exe_path: string | null }
    | undefined

  watch = {
    mediaId,
    provider: tracking.provider,
    providerGameId: tracking.providerGameId,
    exeDir: exeDirOf(row?.exe_path ?? null),
    startedAtMs: nowMs,
    // Deliberately null rather than the current mtime: the first tick reads
    // whatever is already there, so an unlock earned between the last sweep and
    // this launch is caught instead of skipped.
    lastMtimeMs: null
  }
  // Preload the overlay so its page is polling before the first unlock — a
  // window created on demand at publish time would seed past the unlock that
  // triggered it.
  achPopup.sessionStarted()
  timer = setInterval(tick, tracking.provider === 'ra' ? RA_POLL_MS : STEAM_POLL_MS)
  // Never hold the app open for this.
  timer.unref?.()
}

function stopWatchTimer(): void {
  if (timer) clearInterval(timer)
  timer = null
}

// Called from gameLaunch.endSession. The final sweep matters: emulators
// commonly flush their save file as the game exits, so the last few unlocks of
// a session only exist on disk AFTER the process is gone.
export async function stopWatch(deps: WatchDeps = {}): Promise<void> {
  stopWatchTimer()
  const mine = watch
  if (!mine) return
  try {
    await pollOnce(deps, mine)
  } catch {
    // A failed final sweep loses a popup, not data — the next sweep or a
    // manual "Import from emulator files" picks it up.
  }
  // Only retire the watch this call started with. The RA sweep above awaits a
  // network call, and gameLaunch clears `active` BEFORE calling this, so the
  // user can start a new session inside that window — nulling unconditionally
  // would silently kill the new session's detection for its whole duration.
  // sessionEnded rides the same guard: closing the overlay under a NEW session
  // would leave its first unlocks seeding into a dead window.
  if (watch === mine) {
    watch = null
    achPopup.sessionEnded()
  }
}

// before-quit registry (index.ts), ahead of closeDatabase() because the final
// sweep writes rows. Synchronous by necessity: quit does not await. The Steam
// path is entirely synchronous IO, so its sweep completes inline; an RA poll
// would need the network and is skipped.
export function stopAchievementWatcher(): void {
  stopWatchTimer()
  // Latches for the rest of the process: an RA sweep already awaiting the
  // network cannot be cancelled, so pollOnce checks this after its await and
  // drops the write rather than resurrecting a closed database.
  quitting = true
  if (!watch) return
  if (watch.provider === 'steam') {
    try {
      const scan = scanUnlocks(watch.providerGameId, watch.exeDir, nodeFileIO, windowsEnv())
      achievementRepo.insertUnlocks(
        watch.mediaId,
        scan.unlocks,
        'emu',
        scan.newestMtimeMs ?? Date.now()
      )
    } catch {
      // Shutdown must not be blocked by a save-file read.
    }
  }
  watch = null
}

// Tests only: the module-level singleton has to be resettable between cases.
export function __resetForTests(): void {
  stopWatchTimer()
  watch = null
  recent = []
  message = null
  seq = 0
  quitting = false
}
