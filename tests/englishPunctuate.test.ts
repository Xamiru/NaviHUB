import { describe, expect, it } from 'vitest'
import {
  answerState,
  apostropheVariants,
  cycleApostrophe,
  cycleMark,
  grade,
  render,
  strip,
  tokenize
} from '../src/shared/english/punctuate'
import { EN_PUNCTUATE } from '../src/shared/english/punctuateItems'
import { EN_PUNCTUATE_FOCUS } from '../src/shared/english/types'

// The Punctuate-it model (pure) + the authored items. The load-bearing content
// invariant: every apostrophe word in every answer must be reachable through
// apostropheVariants(bare) — otherwise the item is unsolvable.

describe('punctuate — model', () => {
  it('tokenizes marks, optional commas, spaced dashes and terminals', () => {
    const t = tokenize("Wait — it's late, isn't it? Yes[,] and we're leaving.")
    expect(t.map((x) => x.word)).toEqual(['Wait', "it's", 'late', "isn't", 'it', 'Yes', 'and', "we're", 'leaving'])
    expect(t.map((x) => x.mark)).toEqual(['—', '', ',', '', '', ',', '', '', ''])
    expect(t.map((x) => x.optional)).toEqual([false, false, false, false, false, true, false, false, false])
    expect(t.map((x) => x.terminal)).toEqual(['', '', '', '', '?', '', '', '', '.'])
    expect(t.map((x) => x.bare)).toEqual(['Wait', 'its', 'late', 'isnt', 'it', 'Yes', 'and', 'were', 'leaving'])
  })

  it('strip removes marks and apostrophes; render round-trips the answer state', () => {
    const answer = "The team's plan failed; nobody, however, was surprised."
    const t = tokenize(answer)
    expect(render(t, strip(t))).toBe('The teams plan failed nobody however was surprised.')
    expect(render(t, answerState(t))).toBe(answer)
    const dash = tokenize('One thing — the truth.')
    expect(render(dash, answerState(dash))).toBe('One thing — the truth.')
  })

  it('apostropheVariants covers auxiliaries, pronoun contractions, possessives, and specials', () => {
    expect(apostropheVariants('dont')).toEqual(['dont', "don't"])
    expect(apostropheVariants('Ill')).toContain("I'll")
    expect(apostropheVariants('its')).toContain("it's")
    expect(apostropheVariants('students')).toEqual(['students', "student's", "students'"])
    expect(apostropheVariants('oclock')).toContain("o'clock")
    expect(apostropheVariants('couldve')).toContain("could've")
    // no spurious variants
    expect(apostropheVariants('want')).toEqual(['want'])
    expect(apostropheVariants('walked')).toEqual(['walked'])
    expect(apostropheVariants('the')).toEqual(['the'])
  })

  it('cycles marks and apostrophes in a closed loop', () => {
    expect(cycleMark('')).toBe(',')
    expect(cycleMark('—')).toBe('')
    expect(cycleApostrophe('dont', 'dont')).toBe("don't")
    expect(cycleApostrophe('dont', "don't")).toBe('dont')
  })

  it('grades hits, misses, extras and optional slots', () => {
    const t = tokenize("Yes[,] the boys' room isn't ready; wait here.")
    const empty = grade(t, strip(t))
    expect(empty.targets).toBe(3) // boys' + isn't apostrophes, and the semicolon
    expect(empty.hits).toBe(0)
    expect(empty.allCorrect).toBe(false)
    const perfect = grade(t, answerState(t))
    expect(perfect.allCorrect).toBe(true)
    expect(perfect.pct).toBe(1)
    // optional comma left out is still perfect
    const st = answerState(t)
    st.marks[0] = ''
    expect(grade(t, st).allCorrect).toBe(true)
    // an extra comma somewhere costs
    st.marks[2] = ','
    const g = grade(t, st)
    expect(g.extras).toBe(1)
    expect(g.allCorrect).toBe(false)
    expect(g.pct).toBeLessThan(1)
    // wrong mark on the target slot
    const st2 = answerState(t)
    st2.marks[5] = ','
    const g2 = grade(t, st2)
    expect(g2.hits).toBe(g2.targets - 1)
  })
})

describe('punctuate — items', () => {
  it('has ≥ 40 items with unique keys, ≥ 5 per focus', () => {
    expect(EN_PUNCTUATE.length).toBeGreaterThanOrEqual(40)
    const keys = EN_PUNCTUATE.map((i) => i.key)
    expect(new Set(keys).size).toBe(keys.length)
    for (const k of keys) expect(k).toMatch(/^punct-\d{2,3}$/)
    for (const f of EN_PUNCTUATE_FOCUS) {
      expect(EN_PUNCTUATE.filter((i) => i.focus === f).length, f).toBeGreaterThanOrEqual(5)
    }
  })

  it.each(EN_PUNCTUATE.map((i) => i.key))('%s is well-formed and solvable', (key) => {
    const item = EN_PUNCTUATE.find((i) => i.key === key)!
    const a = item.answer
    expect(a).not.toMatch(/["“”()]/)
    expect(a).not.toMatch(/\[(?!,\])/) // only [,] brackets
    expect(a).not.toMatch(/\b\w+\.\w/) // no e.g. / U.S. style abbreviations
    expect(a).not.toMatch(/-{2}|–/) // dashes are the spaced em dash only
    const words = a.replace(/\[,\]/g, '').split(/\s+/).filter((w) => w !== '—')
    expect(words.length, 'word count').toBeGreaterThanOrEqual(12)
    expect(words.length, 'word count').toBeLessThanOrEqual(50)
    const tokens = tokenize(a)
    // round trip
    expect(render(tokens, answerState(tokens))).toBe(a.replace(/\[,\]/g, ','))
    // at least two graded targets so the item is a real exercise
    const g = grade(tokens, strip(tokens))
    expect(g.targets, 'targets').toBeGreaterThanOrEqual(2)
    // solvability: every apostrophe word reachable from its bare form
    for (const t of tokens) {
      if (t.word !== t.bare) {
        expect(apostropheVariants(t.bare), `${t.word} unreachable`).toContain(t.word.replace(/’/g, "'"))
      }
    }
    expect(item.note.length).toBeGreaterThan(15)
  })
})
