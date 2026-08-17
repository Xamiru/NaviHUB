import { describe, expect, it } from 'vitest'
import { EN_IDIOMS } from '../src/shared/english/idioms'
import { buildIdiomPool } from '../src/shared/english/idiomPool'

const seeded = (): (() => number) => {
  let s = 7
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648
    return s / 2147483648
  }
}

describe('idioms & phrasal verbs bank', () => {
  it('has ≥ 150 entries (≥ 60 per kind), unique keys matching kind, distinct phrases and meanings', () => {
    expect(EN_IDIOMS.length).toBeGreaterThanOrEqual(150)
    const keys = EN_IDIOMS.map((i) => i.key)
    expect(new Set(keys).size).toBe(keys.length)
    for (const i of EN_IDIOMS) {
      expect(i.key, i.key).toMatch(new RegExp(`^${i.kind}-\\d{3}$`))
      expect(i.phrase.trim().length).toBeGreaterThan(2)
      expect(i.meaning.trim().length).toBeGreaterThan(8)
      expect(i.example.length, `${i.key}: example`).toBeGreaterThan(20)
      if (i.register) expect(['informal', 'neutral', 'formal']).toContain(i.register)
    }
    expect(EN_IDIOMS.filter((i) => i.kind === 'idiom').length).toBeGreaterThanOrEqual(60)
    expect(EN_IDIOMS.filter((i) => i.kind === 'phrasal').length).toBeGreaterThanOrEqual(60)
    const norm = (s: string): string => s.trim().toLowerCase()
    expect(new Set(EN_IDIOMS.map((i) => norm(i.phrase))).size).toBe(EN_IDIOMS.length)
    // Duplicate meanings make ambiguous MCQs.
    expect(new Set(EN_IDIOMS.map((i) => norm(i.meaning))).size).toBe(EN_IDIOMS.length)
  })

  it('buildIdiomPool makes 3 distinct same-kind distractors, respects the limit, and both modes', () => {
    const w2d = buildIdiomPool(EN_IDIOMS, 'word2def', 20, seeded())
    expect(w2d.length).toBe(Math.min(20, EN_IDIOMS.length))
    for (const q of w2d) {
      expect(q.distractors.length).toBe(3)
      expect(new Set(q.distractors).size).toBe(3)
      expect(q.distractors).not.toContain(q.answer)
      expect(q.prompt).toBe(q.word)
      expect(q.answer).toBe(q.def)
      const src = EN_IDIOMS.find((i) => i.phrase === q.word)!
      for (const d of q.distractors) {
        const o = EN_IDIOMS.find((i) => i.meaning === d)!
        expect(o.kind, 'same-kind distractor').toBe(src.kind)
      }
      expect(['idiom', 'phrasal verb']).toContain(q.pos)
    }
    const d2w = buildIdiomPool(EN_IDIOMS, 'def2word', 5, seeded())
    for (const q of d2w) {
      expect(q.prompt).toBe(q.def)
      expect(q.answer).toBe(q.word)
    }
  })
})
