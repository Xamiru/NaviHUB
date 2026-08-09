import { describe, expect, it } from 'vitest'
import {
  EASY_DAYS,
  GRADUATING_DAYS,
  LEARNING_STEPS_MIN,
  MAX_INTERVAL_DAYS,
  MIN_EASE,
  RELEARN_STEPS_MIN,
  START_EASE,
  formatDueIn,
  gradeCard,
  overdueDays,
  newCardState,
  previewIntervals,
  type SrsState
} from '../src/shared/srs'

function reviewCard(overrides: Partial<SrsState> = {}): SrsState {
  return {
    status: 'review',
    learningStep: 0,
    intervalDays: 10,
    ease: START_EASE,
    reps: 5,
    lapses: 0,
    ...overrides
  }
}

describe('gradeCard — learning', () => {
  it('walks the learning steps: Good advances, then graduates at 1 day', () => {
    const step0 = gradeCard(newCardState(), 'good')
    expect(step0.status).toBe('learning')
    expect(step0.learningStep).toBe(1)
    expect(step0.dueInMinutes).toBe(LEARNING_STEPS_MIN[1])

    const graduated = gradeCard(step0, 'good')
    expect(graduated.status).toBe('review')
    expect(graduated.intervalDays).toBe(GRADUATING_DAYS)
    expect(graduated.dueInMinutes).toBe(GRADUATING_DAYS * 1440)
  })

  it('Again resets to step 0, Hard repeats the current step', () => {
    const step1 = gradeCard(newCardState(), 'good')
    const again = gradeCard(step1, 'again')
    expect(again.learningStep).toBe(0)
    expect(again.dueInMinutes).toBe(LEARNING_STEPS_MIN[0])

    const hard = gradeCard(step1, 'hard')
    expect(hard.learningStep).toBe(1)
    expect(hard.dueInMinutes).toBe(LEARNING_STEPS_MIN[1])
  })

  it('Easy graduates immediately at 4 days', () => {
    const easy = gradeCard(newCardState(), 'easy')
    expect(easy.status).toBe('review')
    expect(easy.intervalDays).toBe(EASY_DAYS)
  })

  it('leaves ease untouched while learning and counts reps on every grade', () => {
    const g = gradeCard(newCardState(), 'again')
    expect(g.ease).toBe(START_EASE)
    expect(g.reps).toBe(1)
  })
})

// Intervals are fuzzed +/-5% by design, so every exact-value assertion pins
// the rng at its midpoint (which multiplies by exactly 1). The fuzz itself is
// tested separately below.
const NOFUZZ = { rng: () => 0.5 }

describe('gradeCard — review', () => {
  it('Good multiplies the interval by ease', () => {
    const r = gradeCard(reviewCard({ intervalDays: 10 }), 'good', NOFUZZ)
    expect(r.intervalDays).toBe(25) // 10 * 2.5
    expect(r.ease).toBe(START_EASE)
    expect(r.dueInMinutes).toBe(25 * 1440)
  })

  it('Hard grows by 1.2 and drops ease by 0.15', () => {
    const r = gradeCard(reviewCard({ intervalDays: 10 }), 'hard', NOFUZZ)
    expect(r.intervalDays).toBe(12)
    expect(r.ease).toBeCloseTo(START_EASE - 0.15)
  })

  it('Easy applies the bonus and raises ease', () => {
    const r = gradeCard(reviewCard({ intervalDays: 10 }), 'easy', NOFUZZ)
    expect(r.ease).toBeCloseTo(2.65)
    expect(r.intervalDays).toBe(Math.round(10 * 2.65 * 1.3))
  })

  it('intervals always grow by at least one day', () => {
    // 1 * 1.2 rounds back to 1 — the max(interval + 1, …) floor must win.
    const r = gradeCard(reviewCard({ intervalDays: 1 }), 'hard', NOFUZZ)
    expect(r.intervalDays).toBe(2)
  })

  it('caps intervals at MAX_INTERVAL_DAYS', () => {
    const r = gradeCard(reviewCard({ intervalDays: 300 }), 'good', NOFUZZ)
    expect(r.intervalDays).toBe(MAX_INTERVAL_DAYS)
  })

  it('Again lapses: relearning step, ease penalty with floor, softened interval', () => {
    const r = gradeCard(reviewCard({ intervalDays: 40, ease: 1.4, lapses: 2 }), 'again', NOFUZZ)
    expect(r.status).toBe('learning')
    expect(r.lapses).toBe(3)
    expect(r.ease).toBe(MIN_EASE) // 1.4 - 0.2 clamped up to 1.3
    // Keeps LAPSE_NEW_INTERVAL of the old interval. Dropping a 40-day card to
    // 1 day (Anki's default) costs ~10 clean reviews to undo one miss.
    expect(r.intervalDays).toBe(16)
    expect(r.dueInMinutes).toBe(RELEARN_STEPS_MIN[0])
  })

  it('never lets the softened lapse interval fall below a day', () => {
    expect(gradeCard(reviewCard({ intervalDays: 1 }), 'again', NOFUZZ).intervalDays).toBe(1)
    expect(gradeCard(reviewCard({ intervalDays: 2 }), 'again', NOFUZZ).intervalDays).toBe(1)
  })

  it('a lapsed card graduates back to review after its relearn step', () => {
    const lapsed = gradeCard(reviewCard({ intervalDays: 40 }), 'again', NOFUZZ)
    const back = gradeCard(lapsed, 'good', NOFUZZ)
    expect(back.status).toBe('review')
    expect(back.intervalDays).toBe(16) // resumes the interval the lapse left
  })

  it('relearning Easy beats relearning Good instead of tying it', () => {
    const lapsed = gradeCard(reviewCard({ intervalDays: 40 }), 'again', NOFUZZ)
    const good = gradeCard(lapsed, 'good', NOFUZZ)
    const easy = gradeCard(lapsed, 'easy', NOFUZZ)
    // Both used to call graduate(s, s.intervalDays), making Easy a no-op.
    expect(easy.intervalDays).toBeGreaterThan(good.intervalDays)
    expect(easy.status).toBe('review')
  })
})

describe('gradeCard — overdue and fuzz', () => {
  it('credits a late answer with the gap it actually survived', () => {
    const onTime = gradeCard(reviewCard({ intervalDays: 10 }), 'good', NOFUZZ)
    const late = gradeCard(reviewCard({ intervalDays: 10 }), 'good', {
      ...NOFUZZ,
      elapsedDays: 40
    })
    expect(onTime.intervalDays).toBe(25) // 10 * 2.5
    expect(late.intervalDays).toBe(100) // 40 * 2.5 — the gap it earned
  })

  it('an early or on-time answer is unaffected by elapsedDays', () => {
    const base = gradeCard(reviewCard({ intervalDays: 10 }), 'good', NOFUZZ)
    for (const elapsedDays of [0, -5, 3, 9]) {
      expect(gradeCard(reviewCard({ intervalDays: 10 }), 'good', { ...NOFUZZ, elapsedDays }))
        .toEqual(base)
    }
  })

  it('Hard does NOT take the overdue bonus', () => {
    const late = gradeCard(reviewCard({ intervalDays: 10 }), 'hard', {
      ...NOFUZZ,
      elapsedDays: 90
    })
    expect(late.intervalDays).toBe(12) // as if answered on time
  })

  it('fuzz stays within +/-5% and never touches sub-2-day intervals', () => {
    for (const r of [0, 0.25, 0.5, 0.75, 1]) {
      const out = gradeCard(reviewCard({ intervalDays: 100 }), 'good', { rng: () => r })
      // 100 * 2.5 = 250, fuzzed by at most 5%
      expect(out.intervalDays).toBeGreaterThanOrEqual(237)
      expect(out.intervalDays).toBeLessThanOrEqual(263)
      // A 1-day learning step must stay exactly 1 day.
      expect(gradeCard(newCardState(), 'good', { rng: () => r }).dueInMinutes).toBe(10)
    }
  })

  it('a cohort introduced together does not stay a cohort', () => {
    let rolls = 0
    const rng = () => [0.05, 0.95, 0.3, 0.7, 0.5][rolls++ % 5]
    const out = new Set(
      Array.from({ length: 5 }, () =>
        gradeCard(reviewCard({ intervalDays: 100 }), 'good', { rng }).intervalDays
      )
    )
    expect(out.size).toBeGreaterThan(1)
  })
})

describe('previews and formatting', () => {
  it('formatDueIn picks sensible units', () => {
    expect(formatDueIn(1)).toBe('1m')
    expect(formatDueIn(10)).toBe('10m')
    expect(formatDueIn(120)).toBe('2h')
    expect(formatDueIn(1440)).toBe('1d')
    expect(formatDueIn(25 * 1440)).toBe('25d')
    expect(formatDueIn(90 * 1440)).toBe('3mo')
    expect(formatDueIn(400 * 1440)).toBe('1.1y')
  })

  it('previewIntervals labels all four grades for a new card', () => {
    expect(previewIntervals(newCardState())).toEqual({
      again: '1m',
      hard: '1m',
      good: '10m',
      easy: '4d'
    })
  })

  it('previewIntervals matches gradeCard for a review card', () => {
    const p = previewIntervals(reviewCard({ intervalDays: 10 }))
    expect(p.good).toBe('25d')
    expect(p.again).toBe('10m')
  })
})

// The review buttons and the scheduler must agree. They diverged once: main
// started passing the overdue gap into gradeCard while the renderer previewed
// with the default 0, so a backlog card advertised a quarter of what it got.
describe('overdueDays and preview alignment', () => {
  const NOW = Date.parse('2026-08-08T12:00:00Z')

  it('parses the stored UTC format and floors at zero', () => {
    expect(overdueDays('2026-07-29 12:00:00', NOW)).toBe(10)
    expect(overdueDays('2026-08-08 00:00:00', NOW)).toBe(0)
    expect(overdueDays('2026-09-01 12:00:00', NOW)).toBe(0) // not yet due
    expect(overdueDays(null, NOW)).toBe(0)
    expect(overdueDays('not a date', NOW)).toBe(0)
  })

  it('previews what gradeCard will actually persist for a late card', () => {
    const card = reviewCard({ intervalDays: 10 })
    const dueAt = '2026-06-29 12:00:00' // 40 days overdue
    const elapsed = overdueDays(dueAt, NOW)
    expect(elapsed).toBe(40)

    const previewed = previewIntervals(card, elapsed).good
    const persisted = gradeCard(card, 'good', { elapsedDays: elapsed, rng: () => 0.5 })
    expect(formatDueIn(persisted.dueInMinutes)).toBe(previewed)
    // And it is materially different from the elapsedDays-less preview.
    expect(previewIntervals(card).good).not.toBe(previewed)
  })
})
