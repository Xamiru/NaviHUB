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

describe('gradeCard — review', () => {
  it('Good multiplies the interval by ease', () => {
    const r = gradeCard(reviewCard({ intervalDays: 10 }), 'good')
    expect(r.intervalDays).toBe(25) // 10 * 2.5
    expect(r.ease).toBe(START_EASE)
    expect(r.dueInMinutes).toBe(25 * 1440)
  })

  it('Hard grows by 1.2 and drops ease by 0.15', () => {
    const r = gradeCard(reviewCard({ intervalDays: 10 }), 'hard')
    expect(r.intervalDays).toBe(12)
    expect(r.ease).toBeCloseTo(START_EASE - 0.15)
  })

  it('Easy applies the bonus and raises ease', () => {
    const r = gradeCard(reviewCard({ intervalDays: 10 }), 'easy')
    expect(r.ease).toBeCloseTo(2.65)
    expect(r.intervalDays).toBe(Math.round(10 * 2.65 * 1.3))
  })

  it('intervals always grow by at least one day', () => {
    // 1 * 1.2 rounds back to 1 — the max(interval + 1, …) floor must win.
    const r = gradeCard(reviewCard({ intervalDays: 1 }), 'hard')
    expect(r.intervalDays).toBe(2)
  })

  it('caps intervals at MAX_INTERVAL_DAYS', () => {
    const r = gradeCard(reviewCard({ intervalDays: 300 }), 'good')
    expect(r.intervalDays).toBe(MAX_INTERVAL_DAYS)
  })

  it('Again lapses: relearning step, ease penalty with floor, interval reset', () => {
    const r = gradeCard(reviewCard({ intervalDays: 40, ease: 1.4, lapses: 2 }), 'again')
    expect(r.status).toBe('learning')
    expect(r.lapses).toBe(3)
    expect(r.ease).toBe(MIN_EASE) // 1.4 - 0.2 clamped up to 1.3
    expect(r.intervalDays).toBe(1)
    expect(r.dueInMinutes).toBe(RELEARN_STEPS_MIN[0])
  })

  it('a lapsed card graduates back to review after its relearn step', () => {
    const lapsed = gradeCard(reviewCard({ intervalDays: 40 }), 'again')
    const back = gradeCard(lapsed, 'good')
    expect(back.status).toBe('review')
    expect(back.intervalDays).toBe(1) // resumes the reset interval
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
