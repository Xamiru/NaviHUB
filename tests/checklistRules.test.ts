import { describe, expect, it } from 'vitest'
import {
  ALL_DAYS_MASK,
  CHECKLIST_DEFS,
  checklistStreak,
  customIdOf,
  customKey,
  dayState,
  describeDays,
  isDueOn,
  isValidDay,
  itemPeriodState,
  normalizeDays,
  weekDays,
  type PeriodFacts
} from '../src/shared/checklist'
import { startSession } from '../src/shared/mediaProgress'

// 2026-07-25 is a Saturday, the week start.
const SAT = '2026-07-25'

const facts = (over: Partial<PeriodFacts> = {}): PeriodFacts => ({
  active: true,
  due: true,
  skipped: false,
  progress: 0,
  target: 1,
  current: false,
  future: false,
  ...over
})

describe('catalog', () => {
  it('has unique keys, a group and a sensible target on every item', () => {
    const keys = CHECKLIST_DEFS.map((d) => d.key)
    expect(new Set(keys).size).toBe(keys.length)
    for (const d of CHECKLIST_DEFS) {
      expect(d.target).toBeGreaterThan(0)
      expect(['watch', 'study', 'play']).toContain(d.group)
      if (d.kind === 'detected') expect(d.source && d.route).toBeTruthy()
      if (d.kind === 'mediaLog' || d.kind === 'mediaSession') expect(d.mediaType).toBeTruthy()
      expect(d.key.startsWith('custom-')).toBe(false)
    }
  })
})

describe('days', () => {
  it('accepts only real calendar days', () => {
    expect(isValidDay(SAT)).toBe(true)
    expect(isValidDay('2026-02-30')).toBe(false)
    expect(isValidDay('2026-7-25')).toBe(false)
    expect(isValidDay(20260725)).toBe(false)
    expect(isValidDay(null)).toBe(false)
  })

  it('lists the Saturday-to-Friday week a day falls in', () => {
    expect(weekDays('2026-07-29')).toEqual([
      '2026-07-25', '2026-07-26', '2026-07-27', '2026-07-28', '2026-07-29', '2026-07-30', '2026-07-31'
    ])
  })
})

describe('custom keys', () => {
  it('round-trips the row id and rejects anything else', () => {
    expect(customKey(12)).toBe('custom-12')
    expect(customIdOf('custom-12')).toBe(12)
    expect(customIdOf('custom-0')).toBeNull()
    expect(customIdOf('custom-x')).toBeNull()
    expect(customIdOf('anime-episode')).toBeNull()
  })
})

describe('weekday masks', () => {
  const MON_WED = (1 << 1) | (1 << 3)

  it('normalises empty and full masks to every day', () => {
    expect(normalizeDays(0)).toBeNull()
    expect(normalizeDays(ALL_DAYS_MASK)).toBeNull()
    expect(normalizeDays(null)).toBeNull()
    expect(normalizeDays(1.5)).toBeNull()
    expect(normalizeDays(MON_WED | 0b10000000)).toBe(MON_WED)
  })

  it('is due only on the chosen weekdays', () => {
    expect(isDueOn(null, SAT)).toBe(true)
    expect(isDueOn(MON_WED, SAT)).toBe(false)
    expect(isDueOn(MON_WED, '2026-07-27')).toBe(true) // Monday
  })

  it('describes a mask in Saturday-first order', () => {
    expect(describeDays(null)).toBe('Every day')
    expect(describeDays(MON_WED | (1 << 6))).toBe('Sat, Mon, Wed')
  })
})

describe('itemPeriodState', () => {
  it('reads the facts in priority order', () => {
    expect(itemPeriodState(facts({ future: true, progress: 5 }))).toBe('future')
    expect(itemPeriodState(facts({ progress: 1 }))).toBe('done')
    expect(itemPeriodState(facts({ due: false, progress: 1 }))).toBe('done') // a bonus still counts
    expect(itemPeriodState(facts({ active: false, progress: 1 }))).toBe('off')
    expect(itemPeriodState(facts({ due: false }))).toBe('off')
    expect(itemPeriodState(facts({ skipped: true }))).toBe('skipped')
    expect(itemPeriodState(facts({ current: true }))).toBe('pending')
    expect(itemPeriodState(facts())).toBe('missed')
  })
})

describe('dayState', () => {
  const day = { restDay: false, current: false, future: false }

  it('is done only when every due item is done', () => {
    expect(dayState(['done', 'done', 'off'], day)).toBe('done')
    expect(dayState(['done', 'missed'], day)).toBe('missed')
    expect(dayState(['done', 'pending'], { ...day, current: true })).toBe('pending')
  })

  it('leaves skipped and off items out of the verdict', () => {
    expect(dayState(['done', 'skipped'], day)).toBe('done')
    expect(dayState(['skipped', 'off'], day)).toBe('skipped')
    expect(dayState(['off'], day)).toBe('off')
    expect(dayState([], day)).toBe('off')
  })

  it('treats a rest day as skipped and the future as future', () => {
    expect(dayState(['missed'], { ...day, restDay: true })).toBe('skipped')
    expect(dayState(['missed'], { ...day, future: true })).toBe('future')
  })
})

describe('checklistStreak', () => {
  it('bridges skipped and off periods without counting them', () => {
    expect(checklistStreak(['done', 'skipped', 'off', 'done'])).toEqual({ current: 2, longest: 2 })
  })

  it('breaks on a miss and keeps the longest run', () => {
    expect(checklistStreak(['done', 'done', 'done', 'missed', 'done'])).toEqual({
      current: 1,
      longest: 3
    })
  })

  it('does not break on a pending current period', () => {
    expect(checklistStreak(['done', 'done', 'pending'])).toEqual({ current: 2, longest: 2 })
    expect(checklistStreak(['done', 'missed', 'pending'])).toEqual({ current: 0, longest: 1 })
  })

  it('is zero for nothing', () => {
    expect(checklistStreak([])).toEqual({ current: 0, longest: 0 })
    expect(checklistStreak(['off', 'skipped'])).toEqual({ current: 0, longest: 0 })
  })
})

describe('startSession', () => {
  const statuses = ['Reading', 'Completed', 'On Hold', 'Dropped', 'Plan to Read']

  it('lifts an untracked or planned title to in progress', () => {
    expect(startSession(null, statuses)).toBe('Reading')
    expect(startSession('Plan to Read', statuses)).toBe('Reading')
  })

  it('never finishes, wraps or otherwise moves a title', () => {
    expect(startSession('Reading', statuses)).toBe('Reading')
    expect(startSession('Completed', statuses)).toBe('Completed')
    expect(startSession('On Hold', statuses)).toBe('On Hold')
  })
})
