import { describe, expect, it } from 'vitest'
import { EN_PASSAGES } from '../src/shared/english/passages'
import { EN_MECHANICS } from '../src/shared/english/mechanics'
import { EN_WRITING_PROMPTS } from '../src/shared/english/writingPrompts'
import { EN_MECHANICS_CATEGORIES } from '../src/shared/english/types'
import { parseMarkdown } from '../src/shared/markdown'

// Validates the authored English test catalogs (the programming.test.ts
// idiom): frozen keys stay well-formed, every MCQ is renderable, and
// cross-references resolve.

const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/

describe('reading passages', () => {
  it('has unique kebab-case keys and non-empty metadata', () => {
    const keys = EN_PASSAGES.map((p) => p.key)
    expect(new Set(keys).size).toBe(keys.length)
    for (const p of EN_PASSAGES) {
      expect(p.key, p.key).toMatch(KEBAB)
      expect(p.title.trim(), p.key).not.toBe('')
      expect(p.topic.trim(), p.key).not.toBe('')
      expect(['C1', 'C2']).toContain(p.level)
    }
  })

  it('passage texts are substantial and parse through the real Markdown parser', () => {
    for (const p of EN_PASSAGES) {
      const words = p.text.split(/\s+/).filter(Boolean).length
      expect(words, `${p.key}: ${words} words`).toBeGreaterThanOrEqual(180)
      const blocks = parseMarkdown(p.text)
      expect(blocks.length, p.key).toBeGreaterThan(0)
    }
  })

  it('every question has 4 distinct options, an in-range answer and an explanation', () => {
    for (const p of EN_PASSAGES) {
      expect(p.questions.length, p.key).toBeGreaterThanOrEqual(4)
      for (const q of p.questions) {
        const id = `${p.key}: ${q.prompt.slice(0, 40)}`
        expect(q.options.length, id).toBe(4)
        expect(new Set(q.options).size, `${id}: duplicate options`).toBe(4)
        expect(q.correct, id).toBeGreaterThanOrEqual(0)
        expect(q.correct, id).toBeLessThan(4)
        expect(q.explain.trim(), id).not.toBe('')
      }
    }
  })

  it('answer positions are not clustered on one index', () => {
    const counts = [0, 0, 0, 0]
    for (const p of EN_PASSAGES) for (const q of p.questions) counts[q.correct]++
    const total = counts.reduce((a, b) => a + b, 0)
    for (const c of counts) expect(c, `distribution ${counts.join('/')}`).toBeLessThan(total * 0.55)
  })
})

describe('content volume after set 2 (2026-08-15)', () => {
  it('has ≥ 24 passages, ≥ 20 questions of every kind, ≥ 30 mechanics items per category, no duplicate mechanics prompts', () => {
    expect(EN_PASSAGES.length).toBeGreaterThanOrEqual(24)
    const kinds = new Map<string, number>()
    for (const p of EN_PASSAGES) for (const q of p.questions) kinds.set(q.kind, (kinds.get(q.kind) ?? 0) + 1)
    for (const k of ['main-idea', 'inference', 'vocab-in-context', 'tone', 'detail']) {
      expect(kinds.get(k) ?? 0, k).toBeGreaterThanOrEqual(20)
    }
    for (const c of EN_MECHANICS_CATEGORIES) {
      expect(EN_MECHANICS.filter((m) => m.category === c).length, c).toBeGreaterThanOrEqual(30)
    }
    // Generic prompts ("Which spelling is correct?") legitimately repeat with
    // different options; a duplicate ITEM is prompt + options.
    const items = EN_MECHANICS.map((m) =>
      JSON.stringify([m.prompt.trim().toLowerCase(), [...m.options].map((o) => o.trim().toLowerCase()).sort()])
    )
    expect(new Set(items).size, 'duplicate mechanics items').toBe(items.length)
    // Answer positions across mechanics stay spread (no index above 40%).
    const pos = [0, 0, 0, 0]
    for (const m of EN_MECHANICS) pos[m.correct]++
    for (const n of pos) expect(n / EN_MECHANICS.length).toBeLessThanOrEqual(0.4)
  })
})

describe('mechanics items', () => {
  it('has unique <category>-<nn> keys matching their category', () => {
    const keys = EN_MECHANICS.map((m) => m.key)
    expect(new Set(keys).size).toBe(keys.length)
    for (const m of EN_MECHANICS) {
      expect(m.key, m.key).toMatch(new RegExp(`^${m.category}-\\d{2}$`))
    }
  })

  it('covers every category with a real batch of items', () => {
    const byCat = new Map<string, number>()
    for (const m of EN_MECHANICS) byCat.set(m.category, (byCat.get(m.category) ?? 0) + 1)
    for (const cat of ['articles', 'punctuation', 'boundaries', 'confusables', 'register', 'spelling']) {
      expect(byCat.get(cat) ?? 0, cat).toBeGreaterThanOrEqual(10)
    }
    expect(EN_MECHANICS.length).toBeGreaterThanOrEqual(90)
  })

  it('every item has 4 distinct options, an in-range answer and a rule', () => {
    for (const m of EN_MECHANICS) {
      expect(m.options.length, m.key).toBe(4)
      expect(new Set(m.options).size, `${m.key}: duplicate options`).toBe(4)
      expect(m.correct, m.key).toBeGreaterThanOrEqual(0)
      expect(m.correct, m.key).toBeLessThan(4)
      expect(m.explain.trim(), m.key).not.toBe('')
    }
  })
})

describe('writing prompts', () => {
  it('has unique keys, sane word bounds, and at least two prompts per kind', () => {
    const keys = EN_WRITING_PROMPTS.map((p) => p.key)
    expect(new Set(keys).size).toBe(keys.length)
    const byKind = new Map<string, number>()
    for (const p of EN_WRITING_PROMPTS) {
      expect(p.key, p.key).toMatch(KEBAB)
      expect(p.instructions.trim(), p.key).not.toBe('')
      byKind.set(p.kind, (byKind.get(p.kind) ?? 0) + 1)
      if (p.minWords != null && p.maxWords != null) {
        expect(p.minWords, p.key).toBeLessThan(p.maxWords)
        expect(p.minWords, p.key).toBeGreaterThan(0)
      }
    }
    for (const kind of ['opinion', 'summary', 'formal-rewrite', 'email', 'report']) {
      expect(byKind.get(kind) ?? 0, kind).toBeGreaterThanOrEqual(2)
    }
  })

  it('summary prompts reference real passages', () => {
    const passageKeys = new Set(EN_PASSAGES.map((p) => p.key))
    for (const p of EN_WRITING_PROMPTS) {
      if (p.kind === 'summary') {
        expect(p.passageKey, p.key).toBeTruthy()
      }
      if (p.passageKey) {
        expect(passageKeys.has(p.passageKey), `${p.key} -> ${p.passageKey}`).toBe(true)
      }
    }
  })
})
