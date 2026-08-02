import { describe, expect, it } from 'vitest'
import {
  OVERRIDE_SCORE,
  SIMILAR_OVERRIDES,
  SIMILAR_THRESHOLD,
  rankSimilar,
  scoreSimilarity,
  type KanjiFeatures
} from '../src/shared/similarKanji'

const feat = (
  character: string,
  components: string[],
  strokes: number | null = null,
  onyomi: string[] = []
): KanjiFeatures => ({
  character,
  components: new Set(components),
  strokes,
  onyomi: new Set(onyomi)
})

// Feature sets mirroring real kradfile data.
const SUE = feat('末', ['木', '一'], 5)
const MI = feat('未', ['木', '一'], 5)
const NEKO = feat('猫', ['犭', '艹', '田'], 11)
const INU = feat('犬', ['犬'], 4)
const SEI = feat('清', ['氵', '青', '土', '月'], 11, ['セイ'])
const HARE = feat('晴', ['日', '青', '土', '月'], 12, ['セイ'])

describe('scoreSimilarity', () => {
  it('identical component sets + equal strokes score 0.85', () => {
    expect(scoreSimilarity(SUE, MI)).toBeCloseTo(0.55 + 0.3, 5)
  })

  it('zero shared components is structurally excluded (score 0)', () => {
    expect(scoreSimilarity(NEKO, INU)).toBe(0)
  })

  it('shared on-reading adds the bonus', () => {
    const score = scoreSimilarity(SEI, HARE)
    // jaccard 3/5, strokeProx 1-1/6, onyomi 1
    expect(score).toBeCloseTo(0.55 * 0.6 + 0.3 * (5 / 6) + 0.15, 5)
    expect(score).toBeGreaterThan(SIMILAR_THRESHOLD)
  })

  it('unknown strokes fall back to neutral 0.5 proximity', () => {
    const a = feat('甲', ['田'], null)
    const b = feat('由', ['田'], null)
    expect(scoreSimilarity(a, b)).toBeCloseTo(0.55 + 0.3 * 0.5, 5)
  })
})

describe('rankSimilar', () => {
  it('末/未 find each other as #1', () => {
    const forSue = rankSimilar(SUE, [MI, NEKO, SEI], { threshold: SIMILAR_THRESHOLD })
    expect(forSue[0]?.character).toBe('未')
    const forMi = rankSimilar(MI, [SUE, NEKO, SEI], { threshold: SIMILAR_THRESHOLD })
    expect(forMi[0]?.character).toBe('末')
  })

  it('猫 never matches 犬 at any threshold', () => {
    expect(rankSimilar(NEKO, [INU]).map((r) => r.character)).not.toContain('犬')
  })

  it('closer stroke count wins on equal component overlap', () => {
    const target = feat('待', ['彳', '寺'], 9)
    const close = feat('侍', ['亻', '寺'], 8)
    const far = feat('時', ['日', '寺'], 10)
    // Equal jaccard (1 of 3); strokes 8 vs 10 → |Δ|=1 beats |Δ|=1... use 7 vs 12
    const far2 = feat('詩', ['言', '寺'], 13)
    const ranked = rankSimilar(target, [far2, close])
    expect(ranked[0].character).toBe('侍')
  })

  it('overrides surface both directions at the override score', () => {
    const hito = feat('人', ['人'], 2)
    const iri = feat('入', ['入'], 2)
    const r1 = rankSimilar(hito, [iri], { threshold: SIMILAR_THRESHOLD })
    expect(r1[0]).toMatchObject({ character: '入', score: OVERRIDE_SCORE })
    const r2 = rankSimilar(iri, [hito], { threshold: SIMILAR_THRESHOLD })
    expect(r2[0]?.character).toBe('人')
  })

  it('an override missing from the candidate set still surfaces', () => {
    const hito = feat('人', ['人'], 2)
    const r = rankSimilar(hito, [], { threshold: SIMILAR_THRESHOLD })
    expect(r.map((x) => x.character)).toContain('入')
  })

  it('tie-breaks are deterministic (codepoint last)', () => {
    const target = feat('x', ['a'], 5)
    const c1 = feat('乙', ['a'], 5)
    const c2 = feat('一', ['a'], 5)
    const ranked = rankSimilar(target, [c1, c2])
    expect(ranked.map((r) => r.character)).toEqual(['一', '乙']) // U+4E00 < U+4E59
  })

  it('threshold and limit apply', () => {
    const target = feat('t', ['a', 'b', 'c', 'd'], 5)
    const strong = feat('s', ['a', 'b', 'c', 'd'], 5)
    const weak = feat('w', ['a'], 20)
    const chips = rankSimilar(target, [strong, weak], { threshold: SIMILAR_THRESHOLD, limit: 8 })
    expect(chips.map((r) => r.character)).toEqual(['s'])
  })
})

describe('SIMILAR_OVERRIDES hygiene', () => {
  it('has no self-pairs or duplicates', () => {
    const seen = new Set<string>()
    for (const [a, b] of SIMILAR_OVERRIDES) {
      expect(a).not.toBe(b)
      const key = [a, b].sort().join('|')
      expect(seen.has(key), `duplicate override ${key}`).toBe(false)
      seen.add(key)
    }
  })
})
