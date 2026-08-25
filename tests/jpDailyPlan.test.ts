import { describe, expect, it } from 'vitest'
import { jpDailyPacing } from '../src/shared/japanese/dailyPlan'

describe('jpDailyPacing', () => {
  it('treats the new-card target as a daily budget across sessions', () => {
    expect(jpDailyPacing(10, 6, 20)).toEqual({
      dailyTarget: 10,
      introducedToday: 6,
      remainingToday: 4,
      newAvailable: 20,
      newThisSession: 4,
      holdNextLesson: true
    })
    expect(jpDailyPacing(10, 10, 20).newThisSession).toBe(0)
  })

  it('never requests more new cards than exist and clamps bad counters', () => {
    expect(jpDailyPacing(10, 2, 3).newThisSession).toBe(3)
    expect(jpDailyPacing(-5, -2, -1).remainingToday).toBe(0)
  })
})
