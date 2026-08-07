import { spawn } from 'child_process'
import { dirname } from 'path'
import { existsSync } from 'fs'
import { dialog } from 'electron'
import * as gameSessionRepo from './repos/gameSessionRepo'
import { assertLaunchableExe, shouldRecord, MIN_SESSION_SEC } from './gameLaunchCore'
import type { GameLaunchStatus } from '@shared/types'

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
let active: { id: string; mediaId: number; startedAtMs: number } | null = null
let status: GameLaunchStatus | null = null

export function getLaunchStatus(): GameLaunchStatus | null {
  if (!status) return null
  const copy = { ...status }
  if (copy.state === 'running' && active?.id === copy.id) {
    copy.elapsedSec = Math.max(0, Math.round((Date.now() - active.startedAtMs) / 1000))
  }
  return copy
}

function endSession(id: string, endedAtMs: number, errMsg: string | null): void {
  const session = active
  if (session?.id !== id) return
  active = null
  if (!status || status.id !== id) return

  const elapsedSec = Math.max(0, Math.round((endedAtMs - session.startedAtMs) / 1000))
  status.elapsedSec = elapsedSec

  if (errMsg != null) {
    status.state = 'error'
    status.message = `Could not launch — ${errMsg}`
    return
  }
  if (!shouldRecord(elapsedSec)) {
    // Not an error: a mis-click, or a launcher stub that handed off and exited.
    status.state = 'ended'
    status.durationSec = elapsedSec
    status.discarded = true
    status.message = `Under ${MIN_SESSION_SEC} s — not recorded. If this game starts through a launcher, link the real executable instead.`
    return
  }
  try {
    const res = gameSessionRepo.recordSession(
      session.mediaId,
      Math.round(session.startedAtMs / 1000),
      Math.round(endedAtMs / 1000),
      elapsedSec
    )
    status.state = 'ended'
    status.durationSec = elapsedSec
    status.progressDelta = res.progressDelta
  } catch (e) {
    status.state = 'error'
    status.message = `Session not saved — ${e instanceof Error ? e.message : String(e)}`
  }
}

// Fire-and-poll: returns as soon as the exe is spawned. Throws synchronously
// for anything the user can fix (the startOcr posture).
export function startSession(mediaId: number): { id: string } {
  if (process.platform !== 'win32') {
    throw new Error('Game launching only works on Windows.')
  }
  if (active) throw new Error('A game session is already being tracked.')
  const info = gameSessionRepo.launchInfo(mediaId)
  if (!info) throw new Error('Media item not found')
  const exe = info.exePath?.trim()
  if (!exe) throw new Error('No executable linked — use "Link executable" first.')
  assertLaunchableExe(exe)
  if (!existsSync(exe)) {
    throw new Error(`Executable not found: ${exe} — relink it if the game moved.`)
  }

  counter += 1
  const id = `game-${process.pid}-${counter}`
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
    message: null
  }

  // detached + ignored stdio + unref: the game owns its own lifetime and the
  // app's event loop never waits on it — but exit/error events still arrive
  // while the app lives, which is all the tracking needs.
  const proc = spawn(exe, [], { cwd: dirname(exe), detached: true, stdio: 'ignore' })
  proc.unref()
  active = { id, mediaId, startedAtMs }

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
    endSession(active.id, Date.now(), null)
  } catch {
    // A failed finalize must never block shutdown.
  }
}
