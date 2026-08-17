import { describe, expect, it } from 'vitest'
import { EN_CLOZE } from '../src/shared/english/cloze'
import { EN_WORD_FORMATION } from '../src/shared/english/wordFormation'
import { EN_TRANSFORMATIONS } from '../src/shared/english/transformations'
import {
  EN_CLOZE_FOCUS,
  EN_TRANSFORM_FOCUS,
  EN_WORDFORM_TARGETS
} from '../src/shared/english/types'
import { matchesAnswer, normalizeAnswer, wordCount } from '../src/shared/english/answers'

// The Use-of-English content: shape, volume, and — the one that matters —
// every listed answer round-trips through the matcher the page uses.

const oneGap = (s: string): boolean => s.split('___').length === 2

describe('open cloze', () => {
  it('has ≥ 40 items, unique keys, one gap, single lowercase function-word answers, focus coverage', () => {
    expect(EN_CLOZE.length).toBeGreaterThanOrEqual(40)
    const keys = EN_CLOZE.map((i) => i.key)
    expect(new Set(keys).size).toBe(keys.length)
    for (const i of EN_CLOZE) {
      expect(i.key).toMatch(/^cloze-\d{2,3}$/)
      expect(oneGap(i.text), `${i.key}: one ___`).toBe(true)
      expect(i.answers.length, i.key).toBeGreaterThan(0)
      for (const a of i.answers) {
        expect(a, `${i.key}: single lowercase word`).toMatch(/^[a-z]+$/)
        expect(matchesAnswer(a, i.answers), `${i.key}: ${a} round-trips`).toBe(true)
      }
      expect(new Set(i.answers.map(normalizeAnswer)).size).toBe(i.answers.length)
      expect(EN_CLOZE_FOCUS).toContain(i.focus)
      expect(i.explain.length).toBeGreaterThan(15)
    }
    for (const f of EN_CLOZE_FOCUS) {
      if (f === 'other') continue
      expect(EN_CLOZE.filter((i) => i.focus === f).length, f).toBeGreaterThanOrEqual(2)
    }
  })
})

describe('word formation', () => {
  it('has ≥ 50 items; the stem is UPPER, answers differ from the stem, negatives carry a prefix', () => {
    expect(EN_WORD_FORMATION.length).toBeGreaterThanOrEqual(50)
    const keys = EN_WORD_FORMATION.map((i) => i.key)
    expect(new Set(keys).size).toBe(keys.length)
    for (const i of EN_WORD_FORMATION) {
      expect(i.key).toMatch(/^wf-\d{2,3}$/)
      expect(oneGap(i.text), `${i.key}: one ___`).toBe(true)
      expect(i.stem, i.key).toMatch(/^[A-Z][A-Z-]+$/)
      expect(i.answers.length).toBeGreaterThan(0)
      for (const a of i.answers) {
        expect(a, `${i.key}: lowercase word`).toMatch(/^[a-z][a-z-]*$/)
        expect(a, `${i.key}: answer must differ from the stem`).not.toBe(i.stem.toLowerCase())
        expect(matchesAnswer(a, i.answers)).toBe(true)
      }
      if (i.negative) {
        expect(i.answers[0], `${i.key}: negative prefix`).toMatch(/^(un|in|im|il|ir|dis|mis|non|de|anti)/)
      }
      expect(EN_WORDFORM_TARGETS).toContain(i.target)
      expect(i.explain.length).toBeGreaterThan(15)
    }
    for (const t of EN_WORDFORM_TARGETS) {
      expect(EN_WORD_FORMATION.filter((i) => i.target === t).length, t).toBeGreaterThanOrEqual(6)
    }
    expect(EN_WORD_FORMATION.filter((i) => i.negative).length).toBeGreaterThanOrEqual(8)
  })
})

describe('key-word transformations', () => {
  it('has ≥ 50 items; keyword UPPER and present in every answer; 3-6 words; focus coverage', () => {
    expect(EN_TRANSFORMATIONS.length).toBeGreaterThanOrEqual(50)
    const keys = EN_TRANSFORMATIONS.map((i) => i.key)
    expect(new Set(keys).size).toBe(keys.length)
    for (const i of EN_TRANSFORMATIONS) {
      expect(i.key).toMatch(/^tr-\d{2,3}$/)
      expect(oneGap(i.gapped), `${i.key}: one ___`).toBe(true)
      expect(i.keyword).toMatch(/^[A-Z][A-Z' ]*$/)
      expect(i.original.trim()).not.toBe(i.gapped.trim())
      expect(i.answers.length).toBeGreaterThan(0)
      const kw = i.keyword.toLowerCase()
      for (const a of i.answers) {
        const n = wordCount(a)
        expect(n, `${i.key}: "${a}" is ${n} words`).toBeGreaterThanOrEqual(3)
        expect(n, `${i.key}: "${a}" is ${n} words`).toBeLessThanOrEqual(6)
        expect(
          new RegExp(`(^|\\s)${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\s|$)`).test(normalizeAnswer(a)),
          `${i.key}: keyword ${i.keyword} missing from "${a}"`
        ).toBe(true)
        expect(matchesAnswer(a, i.answers)).toBe(true)
      }
      expect(EN_TRANSFORM_FOCUS).toContain(i.focus)
      expect(i.explain.length).toBeGreaterThan(15)
    }
    for (const f of EN_TRANSFORM_FOCUS) {
      expect(EN_TRANSFORMATIONS.filter((i) => i.focus === f).length, f).toBeGreaterThanOrEqual(2)
    }
  })
})
