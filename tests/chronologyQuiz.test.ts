import { describe, expect, it } from 'vitest'
import { moveChronologyItem } from '../src/shared/chronologyQuiz'

describe('chronology ordering controls', () => {
  it('moves directly to a selected position while shifting the other entries', () => {
    expect(moveChronologyItem(['a', 'b', 'c', 'd'], 3, 1)).toEqual(['a', 'd', 'b', 'c'])
    expect(moveChronologyItem(['a', 'b', 'c', 'd'], 0, 3)).toEqual(['b', 'c', 'd', 'a'])
  })

  it('leaves the original order untouched for no-op or invalid moves', () => {
    const order = ['a', 'b', 'c', 'd']
    expect(moveChronologyItem(order, 2, 2)).toBe(order)
    expect(moveChronologyItem(order, -1, 2)).toBe(order)
    expect(moveChronologyItem(order, 1, 9)).toBe(order)
  })
})
