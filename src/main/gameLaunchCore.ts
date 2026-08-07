// Pure decisions for the game/VN launcher (gameLaunch.ts): session-length
// gate, the tracked-seconds → progress fold, and exe-path validation. No
// electron, no child_process, no fs — the updaterCore.ts seam, so
// tests/gameLaunch.test.ts drives the whole matrix without spawning anything.

import { posix, win32 } from 'path'

// A session shorter than this is discarded, never recorded: it's almost
// always a mis-click or a launcher stub that spawned the real game and exited
// (the known v1 limitation — link the real executable instead).
export const MIN_SESSION_SEC = 60

export function shouldRecord(elapsedSec: number): boolean {
  return elapsedSec >= MIN_SESSION_SEC
}

// media_item.progress units: games track whole hours, VNs whole minutes
// (mirrors mediaRepo.rowMinutes — keep in step).
export function unitSecondsFor(mediaType: string): number {
  return mediaType === 'game' ? 3600 : 60
}

// The fold: progress moves by the DELTA of the rounded cumulative tracked
// time, so remainders carry across sessions with zero drift (ten 20-minute
// game sessions add 3 h, not 0) and a hand-entered pre-tracking baseline is
// preserved — we add to progress, never recompute it from absolute totals,
// which also means a manual mid-tracking edit simply becomes the new baseline.
// The clamp only matters if the user zeroed progress below the tracked floor.
export function foldedProgress(
  progressBefore: number,
  priorTrackedSec: number,
  newTotalTrackedSec: number,
  unitSec: number
): number {
  return Math.max(
    0,
    progressBefore +
      Math.round(newTotalTrackedSec / unitSec) -
      Math.round(priorTrackedSec / unitSec)
  )
}

// Path-shape safety for the spawn (the assertSafeArgPath posture, with
// launcher-appropriate messages). Absolute under EITHER path flavor: the exe
// is a Windows path, but tests validate on Linux.
export function assertLaunchableExe(p: string): void {
  if (!p.trim()) throw new Error('No executable linked.')
  if (p.startsWith('-')) throw new Error(`Refusing an option-like path: ${p}`)
  if (p.includes('\u0000')) throw new Error('Path contains a NUL byte')
  if (!win32.isAbsolute(p) && !posix.isAbsolute(p)) {
    throw new Error(`Executable path must be absolute: ${p}`)
  }
}
