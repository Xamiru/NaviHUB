import { describe, expect, it } from 'vitest'
import {
  distractorScore,
  pickDistractors
} from '../src/shared/quizDistractors'
import type { DistractorCandidate } from '../src/shared/quizDistractors'
import { seededRng } from '../src/shared/quizCore'

function cand(mediaId: number, year: number | null = null, genres: string[] = []): DistractorCandidate {
  return { mediaId, year, genres }
}

describe('distractorScore', () => {
  it('scores shared decades and genres, capping the genre bonus', () => {
    const answer = cand(1, 2013, ['Action', 'Comedy', 'Drama', 'Romance'])
    expect(distractorScore(answer, cand(2, 2015, ['Action', 'Comedy', 'Drama', 'Sports']))).toBe(5) // 2 + capped 3
    expect(distractorScore(answer, cand(3, 1990, ['Action']))).toBe(1)
    expect(distractorScore(answer, cand(4, null, []))).toBe(0)
    // unknown years on either side never earn the decade bonus
    expect(distractorScore(cand(5, null, []), answer)).toBe(0)
  })

  it('matches genres case-insensitively', () => {
    const answer = cand(1, 2000, ['Sci-Fi'])
    expect(distractorScore(answer, cand(2, 2000, ['sci-fi']))).toBe(3)
  })
})

describe('pickDistractors', () => {
  it('excludes the answer, dedupes media and respects the count', () => {
    const pool = [
      cand(1, 2013, ['Action']),
      cand(2, 2013, ['Action']),
      cand(2, 2014, ['Action']), // duplicate media — dropped
      cand(3, 2013, ['Action']),
      cand(5, 2016, []), // same decade only
      cand(4, 2020, ['Slice of Life']) // nothing shared — lowest tier
    ]
    for (let run = 0; run < 20; run++) {
      const picked = pickDistractors(pool, pool[0], 3)
      expect(picked).toHaveLength(3)
      expect(picked.every((p) => p.mediaId !== 1)).toBe(true)
      expect(new Set(picked.map((p) => p.mediaId)).size).toBe(3)
      expect(picked.some((p) => p.mediaId === 4)).toBe(false) // lowest tier loses
    }
  })

  it('returns fewer than asked only when the pool runs dry', () => {
    const pool = [cand(1), cand(2)]
    expect(pickDistractors(pool, pool[0], 3)).toHaveLength(1)
    expect(pickDistractors([cand(1)], cand(1), 3)).toHaveLength(0)
  })

  it('always takes a strictly better tier over a weaker one', () => {
    // Exactly three perfect matches: they must be the pick every time.
    const strong = [cand(2, 2013, ['A', 'B']), cand(3, 2014, ['A', 'B']), cand(4, 2019, ['A', 'B'])]
    const weak = Array.from({ length: 10 }, (_, i) => cand(100 + i, 1970, ['Z']))
    const pool = [cand(1, 2013, ['A', 'B']), ...strong, ...weak]
    for (let run = 0; run < 20; run++) {
      const ids = pickDistractors(pool, pool[0], 3).map((p) => p.mediaId).sort()
      expect(ids).toEqual([2, 3, 4])
    }
  })

  it('varies the pick when a whole tier ties', () => {
    const tied = Array.from({ length: 12 }, (_, i) => cand(10 + i, 2013, ['A']))
    const pool = [cand(1, 2013, ['A']), ...tied]
    const seen = new Set<number>()
    for (let run = 0; run < 60; run++) {
      for (const p of pickDistractors(pool, pool[0], 3)) seen.add(p.mediaId)
    }
    expect(seen.size).toBeGreaterThan(3) // shuffling rotates candidates through
  })

  it('reproduces tied distractors when an injected RNG is used', () => {
    const pool = [cand(1, 2013, ['A']), ...Array.from({ length: 8 }, (_, i) => cand(10 + i, 2013, ['A']))]
    const a = pickDistractors(pool, pool[0], 3, [], seededRng(42)).map((value) => value.mediaId)
    const b = pickDistractors(pool, pool[0], 3, [], seededRng(42)).map((value) => value.mediaId)
    expect(a).toEqual(b)
  })
})
