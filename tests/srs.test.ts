import { describe, expect, it } from 'vitest'
import {
  calendarDaysBetween,
  daysSince,
  reviewLogValues,
  FSRS_WEIGHTS,
  formatDueIn,
  gradeCard,
  intervalForStability,
  LEARNING_STEPS_MIN,
  MAX_INTERVAL_DAYS,
  newCardState,
  nextMemory,
  overdueDays,
  previewIntervals,
  RELEARN_STEPS_MIN,
  retrievability,
  type SrsState
} from '../src/shared/srs'
import { difficultyFromEase, replayMemory } from '../src/main/db/fsrsMigration'

const mid = { rng: () => 0.5 } // pins fuzz to its midpoint (no change)

function review(stability: number, difficulty = 5, intervalDays = Math.round(stability)): SrsState {
  return {
    status: 'review',
    learningStep: 0,
    intervalDays,
    ease: 2.5,
    reps: 5,
    lapses: 0,
    stability,
    difficulty
  }
}

describe('FSRS memory model', () => {
  it('recall at the stability is 90%, by construction', () => {
    expect(retrievability(10, 10)).toBeCloseTo(0.9, 10)
    expect(retrievability(0, 10)).toBe(1)
    expect(retrievability(30, 10)).toBeLessThan(0.9)
  })

  it('at 90% retention the interval equals the stability; higher retention shortens it', () => {
    expect(intervalForStability(20, 0.9)).toBe(20)
    expect(intervalForStability(20, 0.95)).toBeLessThan(20)
    expect(intervalForStability(20, 0.85)).toBeGreaterThan(20)
    expect(intervalForStability(0.2, 0.9)).toBe(1)
    expect(intervalForStability(1e6, 0.9)).toBe(MAX_INTERVAL_DAYS)
  })

  it('a first answer takes the default initial stability for its grade', () => {
    for (const [i, g] of (['again', 'hard', 'good', 'easy'] as const).entries()) {
      expect(nextMemory({ stability: null, difficulty: null }, g, 0).stability).toBeCloseTo(FSRS_WEIGHTS[i], 6)
    }
    const easy = nextMemory({ stability: null, difficulty: null }, 'easy', 0).difficulty
    const again = nextMemory({ stability: null, difficulty: null }, 'again', 0).difficulty
    expect(again).toBeGreaterThan(easy)
  })

  it('a successful review grows stability more the longer the card survived', () => {
    const onTime = nextMemory({ stability: 10, difficulty: 5 }, 'good', 10).stability
    const late = nextMemory({ stability: 10, difficulty: 5 }, 'good', 30).stability
    const early = nextMemory({ stability: 10, difficulty: 5 }, 'good', 3).stability
    expect(onTime).toBeGreaterThan(10)
    expect(late).toBeGreaterThan(onTime)
    expect(early).toBeLessThan(onTime)
  })

  it('a lapse never raises stability, and Again makes the card harder', () => {
    const after = nextMemory({ stability: 40, difficulty: 5 }, 'again', 40)
    expect(after.stability).toBeLessThan(40)
    expect(after.difficulty).toBeGreaterThan(5)
    const easy = nextMemory({ stability: 40, difficulty: 5 }, 'easy', 40)
    expect(easy.difficulty).toBeLessThan(5)
  })

  it('a lapse plus a same-day relearning Good never ends more stable than before', () => {
    for (const [s, d] of [
      [1, 1],
      [5, 3],
      [40, 8],
      [300, 5]
    ]) {
      const lapsed = nextMemory({ stability: s, difficulty: d }, 'again', s * 3)
      const relearned = nextMemory(lapsed, 'good', 0)
      expect(relearned.stability).toBeLessThanOrEqual(s + 1e-9)
    }
  })

  it('keeps difficulty within 1..10', () => {
    let m: { stability: number | null; difficulty: number | null } = { stability: null, difficulty: null }
    for (let i = 0; i < 40; i++) m = nextMemory(m, 'again', 1)
    expect(m.difficulty).toBeLessThanOrEqual(10)
    for (let i = 0; i < 40; i++) m = nextMemory(m, 'easy', 1)
    expect(m.difficulty).toBeGreaterThanOrEqual(1)
  })
})

describe('gradeCard — learning steps', () => {
  it('walks the learning steps, then graduates from the FSRS stability', () => {
    let s: SrsState = newCardState()
    const a = gradeCard(s, 'good', mid)
    expect(a).toMatchObject({ status: 'learning', learningStep: 1, dueInMinutes: LEARNING_STEPS_MIN[1] })
    expect(a.stability).not.toBeNull()
    s = a
    const b = gradeCard(s, 'good', { ...mid, elapsedDays: 10 / 1440 })
    expect(b.status).toBe('review')
    expect(b.intervalDays).toBeGreaterThanOrEqual(1)
    expect(b.dueInMinutes).toBe(b.intervalDays * 1440)
  })

  it('Again resets to step 0, Hard repeats the current step', () => {
    const s = gradeCard(newCardState(), 'good', mid)
    expect(gradeCard(s, 'again', mid)).toMatchObject({ status: 'learning', learningStep: 0, dueInMinutes: 1 })
    expect(gradeCard(s, 'hard', mid)).toMatchObject({ status: 'learning', learningStep: 1, dueInMinutes: 10 })
  })

  it('Easy graduates a new card at once, beyond a Good graduation', () => {
    const easy = gradeCard(newCardState(), 'easy', mid)
    expect(easy.status).toBe('review')
    expect(easy.intervalDays).toBeGreaterThanOrEqual(2)
  })

  it('counts reps on every grade and leaves the legacy ease alone', () => {
    const s = gradeCard(gradeCard(newCardState(), 'again', mid), 'good', mid)
    expect(s.reps).toBe(2)
    expect(s.ease).toBe(2.5)
  })
})

describe('gradeCard — reviews', () => {
  it('orders the buttons Hard ≤ Good < Easy', () => {
    for (const stability of [0.5, 3, 20, 200]) {
      const c = review(stability)
      const hard = gradeCard(c, 'hard', { ...mid, elapsedDays: stability }).intervalDays
      const good = gradeCard(c, 'good', { ...mid, elapsedDays: stability }).intervalDays
      const easy = gradeCard(c, 'easy', { ...mid, elapsedDays: stability }).intervalDays
      expect(hard).toBeLessThanOrEqual(good)
      expect(good).toBeLessThan(easy)
    }
  })

  it('a card answered on time at 90% gets a longer interval than it had', () => {
    const next = gradeCard(review(20), 'good', { ...mid, elapsedDays: 20 })
    expect(next.intervalDays).toBeGreaterThan(20)
    expect(next.stability!).toBeGreaterThan(20)
  })

  it('Again lapses into one relearning step and keeps the forgetting-model interval', () => {
    const next = gradeCard(review(60), 'again', { ...mid, elapsedDays: 60 })
    expect(next).toMatchObject({ status: 'learning', learningStep: 0, lapses: 1, dueInMinutes: RELEARN_STEPS_MIN[0] })
    expect(next.intervalDays).toBeGreaterThanOrEqual(1)
    expect(next.intervalDays).toBeLessThan(60)
    // Good on the relearning step returns it to review.
    const back = gradeCard(next, 'good', { ...mid, elapsedDays: 10 / 1440 })
    expect(back.status).toBe('review')
  })

  it('higher desired retention schedules sooner', () => {
    const c = review(30)
    const at85 = gradeCard(c, 'good', { ...mid, elapsedDays: 30, retention: 0.85 }).intervalDays
    const at95 = gradeCard(c, 'good', { ...mid, elapsedDays: 30, retention: 0.95 }).intervalDays
    expect(at95).toBeLessThan(at85)
  })

  it('fuzz stays within ±5% and spreads a cohort', () => {
    const c = review(50)
    const lo = gradeCard(c, 'good', { elapsedDays: 50, rng: () => 0 }).intervalDays
    const hi = gradeCard(c, 'good', { elapsedDays: 50, rng: () => 0.999 }).intervalDays
    const base = gradeCard(c, 'good', { ...mid, elapsedDays: 50 }).intervalDays
    expect(lo).toBeLessThan(hi)
    expect(lo).toBeGreaterThanOrEqual(Math.floor(base * 0.95))
    expect(hi).toBeLessThanOrEqual(Math.ceil(base * 1.05))
  })
})

describe('previews and time helpers', () => {
  it('formatDueIn picks sensible units', () => {
    expect(formatDueIn(1)).toBe('1m')
    expect(formatDueIn(10)).toBe('10m')
    expect(formatDueIn(120)).toBe('2h')
    expect(formatDueIn(1440 * 4)).toBe('4d')
    expect(formatDueIn(1440 * 60)).toBe('2mo')
    expect(formatDueIn(1440 * 730)).toBe('2.0y')
  })

  it('previewIntervals matches what gradeCard persists, given the same inputs', () => {
    const c = review(12)
    const p = previewIntervals(c, 15, 0.9)
    expect(p.good).toBe(formatDueIn(gradeCard(c, 'good', { ...mid, elapsedDays: 15, retention: 0.9 }).dueInMinutes))
    expect(previewIntervals(newCardState())).toEqual({ again: '1m', hard: '1m', good: '10m', easy: expect.any(String) })
  })

  it('counts whole local calendar days, so overnight is one day', () => {
    const evening = new Date(2026, 9, 15, 23, 0).getTime()
    const morning = new Date(2026, 9, 16, 8, 0).getTime()
    expect(calendarDaysBetween(evening, morning)).toBe(1)
    expect(calendarDaysBetween(morning, morning + 3_600_000)).toBe(0)
    expect(calendarDaysBetween(morning, new Date(2026, 9, 26, 7, 0).getTime())).toBe(10)
  })

  it('labels review-log rows for an optimizer', () => {
    expect(reviewLogValues(newCardState(), 0)).toEqual(['new', null, 0])
    expect(reviewLogValues(review(10), 12)).toEqual(['review', 12, 10])
    const relearning: SrsState = { ...review(3), status: 'learning', intervalDays: 3 }
    expect(reviewLogValues(relearning, 0)).toEqual(['relearning', 0, 0])
  })

  it('daysSince and overdueDays parse the stored UTC format and floor at zero', () => {
    const now = Date.parse('2026-10-16T12:00:00Z')
    expect(daysSince('2026-10-14 12:00:00', now)).toBeCloseTo(2, 6)
    expect(daysSince('2026-10-20 12:00:00', now)).toBe(0)
    expect(daysSince(null, now)).toBe(0)
    expect(overdueDays('2026-10-13 18:00:00', now)).toBe(2)
  })
})

describe('SM-2 → FSRS log replay', () => {
  it('replays a card’s grades with their real gaps', () => {
    const m = replayMemory([
      { grade: 'good', reviewed_at: '2026-01-01 10:00:00' },
      { grade: 'good', reviewed_at: '2026-01-01 10:10:00' },
      { grade: 'good', reviewed_at: '2026-01-04 10:00:00' },
      { grade: 'again', reviewed_at: '2026-01-20 10:00:00' }
    ])!
    // Gaps in whole calendar days: same day, 3 days, 16 days.
    let expected = nextMemory({ stability: null, difficulty: null }, 'good', 0)
    expected = nextMemory(expected, 'good', 0)
    expected = nextMemory(expected, 'good', 3)
    expected = nextMemory(expected, 'again', 16)
    expect(m.stability).toBeCloseTo(expected.stability, 6)
    expect(m.difficulty).toBeCloseTo(expected.difficulty, 6)
  })

  it('returns null for an empty or unusable log', () => {
    expect(replayMemory([])).toBeNull()
    expect(replayMemory([{ grade: 'ghost', reviewed_at: '2026-01-01 00:00:00' }])).toBeNull()
  })

  it('maps SM-2 ease onto FSRS difficulty', () => {
    expect(difficultyFromEase(2.5)).toBeCloseTo(5)
    expect(difficultyFromEase(1.3)).toBe(10)
    expect(difficultyFromEase(3.5)).toBe(1)
  })
})
