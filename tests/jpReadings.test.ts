import { describe, expect, it } from 'vitest'
import { JP_PASSAGES } from '../src/shared/japanese/readings'
import { furiganaProblems, stripFurigana } from '../src/shared/japanese/furigana'
import type { JpReadingLevel } from '../src/shared/japanese/types'

// Graded reading content. The load-bearing rule is furigana solvability: every
// kanji run in the passage, its title and any Japanese prompt/option must
// carry a reading, or the reader renders a run the learner cannot read with
// the toggle on.

const LEVELS: JpReadingLevel[] = ['N5', 'N4', 'N3', 'N2']
const BANDS: Record<JpReadingLevel, [number, number]> = {
  N5: [80, 130],
  N4: [110, 170],
  N3: [150, 220],
  N2: [180, 250]
}
const KINDS = ['detail', 'main-idea', 'inference', 'vocab']

describe('graded reading passages', () => {
  it('has 6 per level with unique level-prefixed keys', () => {
    expect(JP_PASSAGES.length).toBeGreaterThanOrEqual(24)
    const keys = JP_PASSAGES.map((p) => p.key)
    expect(new Set(keys).size).toBe(keys.length)
    for (const l of LEVELS) {
      const at = JP_PASSAGES.filter((p) => p.level === l)
      expect(at.length, l).toBeGreaterThanOrEqual(6)
      for (const p of at) expect(p.key, p.key).toMatch(new RegExp(`^${l.toLowerCase()}-\\d{2}-[a-z0-9-]+$`))
    }
  })

  it.each(JP_PASSAGES.map((p) => p.key))('%s is well-formed', (key) => {
    const p = JP_PASSAGES.find((x) => x.key === key)!
    const plain = stripFurigana(p.text)
    const [lo, hi] = BANDS[p.level]
    expect(plain.replace(/\s/g, '').length, `${key} length`).toBeGreaterThanOrEqual(lo)
    expect(plain.replace(/\s/g, '').length, `${key} length`).toBeLessThanOrEqual(hi)
    expect(furiganaProblems(p.text), `${key} text`).toEqual([])
    expect(furiganaProblems(p.title), `${key} title`).toEqual([])
    expect(p.topic.trim().length).toBeGreaterThan(1)
    expect(p.text).not.toMatch(/[#*`]/) // no Markdown — the page renders plain text

    expect(p.questions.length, `${key} questions`).toBe(4)
    for (const q of p.questions) {
      expect(KINDS).toContain(q.kind)
      expect(q.options).toHaveLength(4)
      expect(new Set(q.options).size).toBe(4)
      expect(q.correct).toBeGreaterThanOrEqual(0)
      expect(q.correct).toBeLessThan(4)
      expect(q.explain.trim().length, `${key} explain`).toBeGreaterThan(15)
      expect(furiganaProblems(q.prompt), `${key} prompt`).toEqual([])
      for (const o of q.options) expect(furiganaProblems(o), `${key} option`).toEqual([])
      // Prompt language: English at N5/N4, Japanese from N3 up.
      const jp = /[ぁ-んァ-ヶ一-鿿]/.test(q.prompt)
      if (p.level === 'N5' || p.level === 'N4') expect(jp, `${key}: prompt should be English`).toBe(false)
      else expect(jp, `${key}: prompt should be Japanese`).toBe(true)
    }
    const kinds = new Set(p.questions.map((q) => q.kind))
    expect(kinds.size, `${key}: vary the question kinds`).toBeGreaterThanOrEqual(2)

    expect(p.glossary.length, `${key} glossary`).toBeGreaterThanOrEqual(3)
    expect(p.glossary.length, `${key} glossary`).toBeLessThanOrEqual(6)
    for (const g of p.glossary) {
      expect(plain, `${key}: glossary word ${g.word} not in the passage`).toContain(g.word)
      expect(g.reading).toMatch(/^[ぁ-んァ-ヶー・]+$/)
      expect(g.gloss.trim().length).toBeGreaterThan(1)
    }
  })

  it('answers are spread across the four positions and not guessable by length', () => {
    const pos = [0, 0, 0, 0]
    let longest = 0
    for (const p of JP_PASSAGES) {
      for (const q of p.questions) {
        pos[q.correct]++
        const lens = q.options.map((o) => stripFurigana(o).length)
        const max = Math.max(...lens)
        if (lens[q.correct] === max && lens.filter((l) => l === max).length === 1) longest++
      }
    }
    const total = pos.reduce((a, b) => a + b, 0)
    for (const n of pos) expect(n / total).toBeLessThanOrEqual(0.4)
    expect(longest / total, 'correct option is the strict longest too often').toBeLessThanOrEqual(0.45)
  })
})
