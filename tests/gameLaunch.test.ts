import { describe, expect, it } from 'vitest'
import {
  MIN_SESSION_SEC,
  assertLaunchableExe,
  foldedProgress,
  shouldRecord,
  unitSecondsFor
} from '../src/main/gameLaunchCore'

// The launcher's pure decisions (gameLaunchCore.ts): the tracked-seconds →
// progress fold, the minimum-session gate, and exe-path validation. No spawn,
// no fs — the repo-level integration lives in tests/gameSessionRepo.test.ts.

describe('unitSecondsFor', () => {
  it('games fold to hours, VNs (and anything else) to minutes', () => {
    expect(unitSecondsFor('game')).toBe(3600)
    expect(unitSecondsFor('visual_novel')).toBe(60)
  })
})

describe('shouldRecord', () => {
  it('gates on the minimum session length', () => {
    expect(shouldRecord(MIN_SESSION_SEC - 1)).toBe(false)
    expect(shouldRecord(MIN_SESSION_SEC)).toBe(true)
    expect(shouldRecord(MIN_SESSION_SEC + 1)).toBe(true)
  })
})

describe('foldedProgress', () => {
  // Simulate consecutive sessions the way recordSession calls the fold: prior
  // = sum before the new row, newTotal = prior + this session's seconds.
  function run(progress0: number, sessionsSec: number[], unitSec: number): number {
    let progress = progress0
    let tracked = 0
    for (const s of sessionsSec) {
      progress = foldedProgress(progress, tracked, tracked + s, unitSec)
      tracked += s
    }
    return progress
  }

  it('accumulates short game sessions with zero rounding drift', () => {
    // Ten 20-minute sessions = 200 min ≈ 3 h. Naive per-session rounding
    // (round(1200/3600) = 0 each time) would add nothing.
    expect(run(0, Array(10).fill(1200), 3600)).toBe(3)
  })

  it('preserves a hand-entered pre-tracking baseline', () => {
    // 30 h entered by hand, then a 2 h session → 32, never recomputed to 2.
    expect(run(30, [7200], 3600)).toBe(32)
  })

  it('a manual mid-tracking edit becomes the new baseline', () => {
    // Two 1 h sessions → 2; user corrects progress to 50 by hand; another 1 h
    // session moves the delta only.
    let progress = run(0, [3600, 3600], 3600)
    expect(progress).toBe(2)
    progress = 50 // manual edit through the normal media form
    expect(foldedProgress(progress, 7200, 10800, 3600)).toBe(51)
  })

  it('a reset-to-zero never resurrects previously tracked hours', () => {
    // 5 h tracked, user zeroes progress; a new 30 min session rounds to +1 at
    // most — the old 5 h stay gone.
    const after = foldedProgress(0, 18000, 18000 + 1800, 3600)
    expect(after).toBeLessThanOrEqual(1)
    expect(after).toBeGreaterThanOrEqual(0)
  })

  it('never returns a negative progress', () => {
    // Pathological: rounding the cumulative DOWN across the boundary while
    // progress sits at 0.
    expect(foldedProgress(0, 1900, 1900 + 100, 3600)).toBe(0)
  })

  it('VN minutes fold per minute', () => {
    // 605 s ≈ 10 min, then 65 s more crosses to 11 total.
    expect(run(0, [605, 65], 60)).toBe(11)
    // Baseline preserved for VNs too.
    expect(run(120, [605], 60)).toBe(130)
  })
})

describe('assertLaunchableExe', () => {
  it('accepts absolute Windows and POSIX paths', () => {
    expect(() => assertLaunchableExe('C:\\Games\\P5R\\P5R.exe')).not.toThrow()
    expect(() => assertLaunchableExe('C:\\Program Files (x86)\\VN\\vn.exe')).not.toThrow()
    expect(() => assertLaunchableExe('/opt/games/game')).not.toThrow()
  })

  it('rejects empty, option-like, relative and NUL-bearing paths', () => {
    expect(() => assertLaunchableExe('')).toThrow()
    expect(() => assertLaunchableExe('  ')).toThrow()
    expect(() => assertLaunchableExe('--version')).toThrow()
    expect(() => assertLaunchableExe('Games\\P5R.exe')).toThrow()
    expect(() => assertLaunchableExe('C:\\Games\\a\u0000b.exe')).toThrow()
  })
})
