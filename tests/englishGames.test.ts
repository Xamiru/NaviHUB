import { describe, expect, it } from 'vitest'
import { EN_SPOT_ERRORS } from '../src/shared/english/spotErrors'
import { EN_MATCH_SETS } from '../src/shared/english/collocations'
import { EN_MATCH_THEMES, EN_MECHANICS_CATEGORIES } from '../src/shared/english/types'

describe('spot-the-error items', () => {
  it('has ≥ 60 items with unique keys, ≥ 6 no-error, ≥ 6 per category', () => {
    expect(EN_SPOT_ERRORS.length).toBeGreaterThanOrEqual(60)
    const keys = EN_SPOT_ERRORS.map((i) => i.key)
    expect(new Set(keys).size).toBe(keys.length)
    for (const k of keys) expect(k).toMatch(/^spot-\d{2,3}$/)
    expect(EN_SPOT_ERRORS.filter((i) => i.wrongIndex === null).length).toBeGreaterThanOrEqual(6)
    for (const c of EN_MECHANICS_CATEGORIES) {
      expect(EN_SPOT_ERRORS.filter((i) => i.category === c).length, c).toBeGreaterThanOrEqual(6)
    }
  })

  it('every item is well-formed: 6-22 tokens, index/fix consistent, fix differs, category valid', () => {
    const positions = new Map<number, number>()
    for (const i of EN_SPOT_ERRORS) {
      expect(i.tokens.length, i.key).toBeGreaterThanOrEqual(6)
      expect(i.tokens.length, i.key).toBeLessThanOrEqual(22)
      for (const t of i.tokens) expect(t, `${i.key}: empty token`).not.toMatch(/^\s*$|\s/)
      expect(EN_MECHANICS_CATEGORIES).toContain(i.category)
      expect(i.explain.length, i.key).toBeGreaterThan(15)
      if (i.wrongIndex === null) {
        expect(i.fix, `${i.key}: no-error items have fix null`).toBeNull()
      } else {
        expect(i.wrongIndex).toBeGreaterThanOrEqual(0)
        expect(i.wrongIndex).toBeLessThan(i.tokens.length)
        expect(i.fix, `${i.key}: fix required`).toBeTruthy()
        expect(i.fix, `${i.key}: fix must differ`).not.toBe(i.tokens[i.wrongIndex])
        const bucket = Math.floor((i.wrongIndex / i.tokens.length) * 4)
        positions.set(bucket, (positions.get(bucket) ?? 0) + 1)
      }
    }
    // The wrong token is spread across the sentence (no quarter above 45%).
    const withError = EN_SPOT_ERRORS.filter((i) => i.wrongIndex !== null).length
    for (const n of positions.values()) expect(n / withError).toBeLessThanOrEqual(0.45)
  })
})

describe('collocation match sets', () => {
  it('has ≥ 30 sets, unique keys, ≥ 7 per theme, exactly 6 pairs each', () => {
    expect(EN_MATCH_SETS.length).toBeGreaterThanOrEqual(30)
    const keys = EN_MATCH_SETS.map((s) => s.key)
    expect(new Set(keys).size).toBe(keys.length)
    for (const k of keys) expect(k).toMatch(/^match-\d{2,3}$/)
    for (const t of EN_MATCH_THEMES) {
      expect(EN_MATCH_SETS.filter((s) => s.theme === t).length, t).toBeGreaterThanOrEqual(7)
    }
    for (const s of EN_MATCH_SETS) {
      expect(s.pairs.length, s.key).toBe(6)
      expect(EN_MATCH_THEMES).toContain(s.theme)
      expect(s.title.length).toBeGreaterThan(3)
    }
  })

  it('within a set lefts are distinct, rights are distinct, no string appears on both sides; no pair reused across sets', () => {
    const seenPairs = new Set<string>()
    const norm = (s: string): string => s.trim().toLowerCase()
    for (const s of EN_MATCH_SETS) {
      const lefts = s.pairs.map((p) => norm(p.left))
      const rights = s.pairs.map((p) => norm(p.right))
      expect(new Set(lefts).size, `${s.key}: duplicate left`).toBe(6)
      expect(new Set(rights).size, `${s.key}: duplicate right`).toBe(6)
      for (const l of lefts) expect(rights, `${s.key}: ${l} on both sides`).not.toContain(l)
      for (const p of s.pairs) {
        const k = `${norm(p.left)}|${norm(p.right)}`
        expect(seenPairs.has(k), `${s.key}: pair reused ${k}`).toBe(false)
        seenPairs.add(k)
      }
    }
  })
})
