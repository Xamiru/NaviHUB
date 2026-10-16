import { spawn } from 'child_process'
import { dialog } from 'electron'
import * as playthroughRepo from './repos/playthroughRepo'
import * as gameSessionRepo from './repos/gameSessionRepo'
import * as achievementWatcher from './achievementWatcher'
import { logWarn } from './logBus'
import * as emulation from './emulation'
import * as pictures from './pictures'
import { assertLaunchableExe, shouldRecord, MIN_SESSION_SEC } from './gameLaunchCore'
import type { GameLaunchChoice, GameLaunchStatus } from '@shared/types'

// Launch a game/VN's linked executable and track the session while it runs.
// The mokuroRun singleton (status + games:sessionStatus poll, stale-run guard)
// with ONE deliberate deviation from every other child in this app: the game
// is spawned detached+unref'd and is NEVER killed — not by a cancel channel
// (there is none: killing someone's unsaved run is worse than any stuck
// status) and not at quit, where finalizeActiveGameSession() records the
// session and lets the game outlive the app. Elapsed time is wall clock
// computed at poll time, so there is no ticking timer to leak. An app CRASH
// mid-session loses that one session — accepted; the insert-at-start +
// orphan-sweep alternative isn't worth its complexity here.

let counter = 0
let active: {
  id: string
  mediaId: number
  startedAtMs: number
  runId: number | null
  via: string
  platform: string | null
  emulatorId: number | null
} | null = null
let status: GameLaunchStatus | null = null
// Screenshots the last emulated session produced, kept in main so importing
// them never takes a path from the renderer.
let lastShots: { sessionId: string; mediaId: number; paths: string[] } | null = null

export function getLaunchStatus(): GameLaunchStatus | null {
  if (!status) return null
  const copy = { ...status }
  if (copy.state === 'running' && active?.id === copy.id) {
    copy.elapsedSec = Math.max(0, Math.round((Date.now() - active.startedAtMs) / 1000))
  }
  return copy
}

// Reads the emulator's screenshot folder after the session, off the exit
// path. The poll keeps running while shotsPending, so the count arrives.
function sweepShots(id: string, mediaId: number, emulatorId: number, startedAtMs: number, endedAtMs: number): void {
  if (!status || status.id !== id) return
  status.shotsPending = true
  const settle = (paths: string[]): void => {
    if (!status || status.id !== id) return
    status.shotsPending = false
    status.screenshotCount = paths.length
    lastShots = paths.length > 0 ? { sessionId: id, mediaId, paths } : null
  }
  // Wait out the grace in which emulators flush their last screenshot, and
  // never let a hung folder (a dropped network share) keep the poll alive.
  setTimeout(() => {
    const limit = new Promise<string[]>((resolve) => setTimeout(() => resolve([]), SHOT_SWEEP_LIMIT_MS).unref?.())
    Promise.race([emulation.findSessionShots(emulatorId, startedAtMs, endedAtMs), limit])
      .then(settle)
      .catch((e) => {
        logWarn('app', `screenshot sweep failed: ${e instanceof Error ? e.message : String(e)}`)
        settle([])
      })
  }, emulation.SHOT_GRACE_MS + 500).unref?.()
}

const SHOT_SWEEP_LIMIT_MS = 15_000

// Copies the last session's screenshots into the game's Art tab, a few at a
// time so a large batch never blocks the main process in one go.
export async function importSessionShots(sessionId: string): Promise<{ added: number; skipped: number }> {
  if (!lastShots || lastShots.sessionId !== sessionId) throw new Error('Those screenshots are no longer available.')
  const { mediaId, paths } = lastShots
  lastShots = null
  if (status?.id === sessionId) status.screenshotCount = 0
  let added = 0
  let skipped = 0
  for (let i = 0; i < paths.length; i += SHOT_IMPORT_BATCH) {
    const res = pictures.addFromPaths(mediaId, 'fanart', paths.slice(i, i + SHOT_IMPORT_BATCH))
    added += res.added.length
    skipped += res.skipped
    await new Promise((resolve) => setImmediate(resolve))
  }
  return { added, skipped }
}

const SHOT_IMPORT_BATCH = 8

function endSession(id: string, endedAtMs: number, errMsg: string | null, quitting = false): void {
  const session = active
  if (session?.id !== id) return
  active = null
  // Stop watching before the status settles, and let the final sweep run: an
  // emulator usually flushes its save file AS the game exits, so a session's
  // last unlocks only reach disk here.
  void achievementWatcher.stopWatch()
  if (!status || status.id !== id) return

  const elapsedSec = Math.max(0, Math.round((endedAtMs - session.startedAtMs) / 1000))
  status.elapsedSec = elapsedSec

  if (errMsg != null) {
    status.state = 'error'
    status.message = `Could not launch — ${errMsg}`
    return
  }
  if (session.emulatorId != null && !quitting) {
    sweepShots(id, session.mediaId, session.emulatorId, session.startedAtMs, endedAtMs)
  }
  if (!shouldRecord(elapsedSec)) {
    // Not an error: a mis-click, or a launcher stub that handed off and exited.
    status.state = 'ended'
    status.durationSec = elapsedSec
    status.discarded = true
    status.message = session.via.startsWith('emu:')
      ? `Under ${MIN_SESSION_SEC} s — not recorded. If the emulator closed on its own, check its arguments on the Emulators page.`
      : `Under ${MIN_SESSION_SEC} s — not recorded. If this game starts through a launcher, link the real executable instead.`
    return
  }
  try {
    const res = gameSessionRepo.recordSession(
      session.mediaId,
      Math.round(session.startedAtMs / 1000),
      Math.round(endedAtMs / 1000),
      elapsedSec,
      session.runId,
      { via: session.via, platform: session.platform }
    )
    status.state = 'ended'
    status.durationSec = elapsedSec
    status.progressDelta = res.progressDelta
  } catch (e) {
    status.state = 'error'
    status.message = `Session not saved — ${e instanceof Error ? e.message : String(e)}`
  }
}

// Fire-and-poll: returns as soon as the program is spawned. Throws
// synchronously for anything the user can fix (the startOcr posture). The
// choice picks the linked executable or one linked game file; without one the
// preferred way to play is used (emulation.chooseLaunch).
export function startSession(mediaId: number, choice: GameLaunchChoice | null = null): { id: string } {
  if (process.platform !== 'win32') {
    throw new Error('Game launching only works on Windows.')
  }
  if (active) throw new Error('A game session is already being tracked.')
  const info = gameSessionRepo.launchInfo(mediaId)
  if (!info) throw new Error('Media item not found')
  const spec = emulation.launchSpec(mediaId, choice)

  counter += 1
  const id = `game-${process.pid}-${counter}`
  const runId = playthroughRepo.activeId(mediaId)
  const startedAtMs = Date.now()
  status = {
    id,
    state: 'running',
    mediaId,
    mediaType: info.mediaType,
    title: info.title,
    startedAt: new Date(startedAtMs).toISOString(),
    elapsedSec: 0,
    durationSec: null,
    discarded: false,
    progressDelta: null,
    message: null,
    shotsPending: false,
    screenshotCount: 0
  }

  // detached + ignored stdio + unref: the game owns its own lifetime and the
  // app's event loop never waits on it — but exit/error events still arrive
  // while the app lives, which is all the tracking needs.
  const proc = spawn(spec.program, spec.args, { cwd: spec.cwd, detached: true, stdio: 'ignore' })
  proc.unref()
  active = {
    id,
    mediaId,
    startedAtMs,
    runId,
    via: spec.via,
    platform: spec.platform,
    emulatorId: spec.emulatorId
  }
  lastShots = null

  let settled = false
  proc.on('error', (err) => {
    if (settled) return
    settled = true
    endSession(id, Date.now(), err.message)
  })
  proc.on('exit', () => {
    if (settled) return
    settled = true
    endSession(id, Date.now(), null)
  })

  // AFTER the listeners, and never fatal: startWatch does real DB work, and a
  // throw here once the child is already spawned would leave `active` set with
  // no exit listener attached — every later launch rejected with "a game
  // session is already being tracked", and a subsequent 'error' event on a
  // listener-less emitter thrown as an uncaught exception in main.
  // No-op unless this title has achievement tracking set up.
  try {
    // An emulated session cannot write a Steam-emulator save; only a
    // RetroAchievements set is watched there.
    achievementWatcher.startWatch(mediaId, startedAtMs, { emulated: !spec.native })
  } catch (err) {
    logWarn(
      'app',
      `achievement watch failed to start: ${err instanceof Error ? err.message : String(err)}`
    )
  }

  return { id }
}

// Main-side picker (the manga.attachFolder posture: the dialog, the persist
// and the result all live in main; the renderer never round-trips a raw path).
export async function pickExeFor(mediaId: number): Promise<string | null> {
  const res = await dialog.showOpenDialog({
    title: 'Link game executable',
    properties: ['openFile'],
    filters: [
      { name: 'Programs', extensions: ['exe'] },
      { name: 'All files', extensions: ['*'] }
    ]
  })
  if (res.canceled || res.filePaths.length === 0) return null
  const path = res.filePaths[0]
  assertLaunchableExe(path)
  gameSessionRepo.setExePath(mediaId, path)
  return path
}

export function clearExe(mediaId: number): void {
  gameSessionRepo.setExePath(mediaId, null)
}

// before-quit (index.ts): record the in-flight session, do NOT kill the game.
// After this, a late exit event is stale by the endSession guard and can't
// double-record.
export function finalizeActiveGameSession(): void {
  if (!active) return
  try {
    endSession(active.id, Date.now(), null, true)
  } catch {
    // A failed finalize must never block shutdown.
  }
}
