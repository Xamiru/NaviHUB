import { describe, expect, it } from 'vitest'
import { weightedOrder } from '../src/shared/english/weightedDeck'

const lcg = (seed: number): (() => number) => {
  let s = seed >>> 0
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0
    return s / 0x100000000
  }
}

describe('weightedOrder', () => {
  it('returns every item exactly once', () => {
    const items = Array.from({ length: 40 }, (_, i) => i)
    const out = weightedOrder(items, (i) => (i % 3 === 0 ? 5 : 0), lcg(3))
    expect([...out].sort((a, b) => a - b)).toEqual(items)
  })

  it('with no weights it is a plain shuffle (still a permutation)', () => {
    const items = ['a', 'b', 'c', 'd']
    const out = weightedOrder(items, () => 0, lcg(9))
    expect([...out].sort()).toEqual(items)
  })

  it('heavier items sort earlier on average', () => {
    const items = Array.from({ length: 20 }, (_, i) => i) // 0-9 heavy, 10-19 light
    const rng = lcg(11)
    let heavyPos = 0
    let lightPos = 0
    const trials = 400
    for (let t = 0; t < trials; t++) {
      const out = weightedOrder(items, (i) => (i < 10 ? 8 : 0), rng)
      out.forEach((i, pos) => (i < 10 ? (heavyPos += pos) : (lightPos += pos)))
    }
    expect(heavyPos / (trials * 10)).toBeLessThan(lightPos / (trials * 10))
  })
})
