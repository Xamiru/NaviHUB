import { describe, expect, it } from 'vitest'
import { ACH_POPUP_LIFE_MS } from '../../src/shared/achievements'
import {
  advancePopupQueue,
  visiblePopups,
  type TimedPopup
} from '../../src/renderer/src/lib/achievementPopupQueue'

type Entry = TimedPopup & { id: number }

describe('achievement popup FIFO queue', () => {
  it('ages only visible cards and reveals queued cards in arrival order', () => {
    const queued: Entry[] = [1, 2, 3, 4, 5].map((id) => ({ id, shownAt: null }))
    const first = advancePopupQueue(queued, 1_000)

    expect(visiblePopups(first).map((entry) => entry.id)).toEqual([1, 2, 3])
    expect(first.slice(3).every((entry) => entry.shownAt === null)).toBe(true)

    const second = advancePopupQueue(first, 1_000 + ACH_POPUP_LIFE_MS)
    expect(visiblePopups(second).map((entry) => entry.id)).toEqual([4, 5])
    expect(second.every((entry) => entry.shownAt === 1_000 + ACH_POPUP_LIFE_MS)).toBe(true)
  })

  it('does not expire a queued card before it has been displayed', () => {
    const entries: Entry[] = [
      { id: 1, shownAt: 5_000 },
      { id: 2, shownAt: 5_000 },
      { id: 3, shownAt: 5_000 },
      { id: 4, shownAt: null }
    ]

    const advanced = advancePopupQueue(entries, 5_000 + ACH_POPUP_LIFE_MS - 1)
    expect(advanced.find((entry) => entry.id === 4)?.shownAt).toBeNull()
  })
})
