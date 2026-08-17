import { describe, expect, it } from 'vitest'
import {
  expandContractions,
  matchesAnswer,
  normalizeAnswer,
  wordCount
} from '../src/shared/english/answers'

describe('normalizeAnswer', () => {
  it('lowercases, trims, collapses whitespace, strips edge punctuation, unifies apostrophes', () => {
    expect(normalizeAnswer('  Would   Rather ')).toBe('would rather')
    expect(normalizeAnswer('in spite of.')).toBe('in spite of')
    expect(normalizeAnswer('"despite"')).toBe('despite')
    expect(normalizeAnswer('don’t')).toBe("don't")
    expect(normalizeAnswer('café')).toBe('café')
    expect(normalizeAnswer('   ')).toBe('')
  })
})

describe('expandContractions', () => {
  it('expands the unambiguous ones only', () => {
    expect(expandContractions("won't")).toBe('will not')
    expect(expandContractions("don't")).toBe('do not')
    expect(expandContractions("i'll")).toBe('i will')
    expect(expandContractions("they're")).toBe('they are')
    expect(expandContractions("we've")).toBe('we have')
    expect(expandContractions("i'm")).toBe('i am')
    expect(expandContractions("he'd")).toBe("he'd")
    expect(expandContractions("it's")).toBe("it's")
  })
})

describe('matchesAnswer', () => {
  const answers = ["wouldn't have gone", 'would not have gone']
  it('accepts any listed variant regardless of case, spacing and edge punctuation', () => {
    expect(matchesAnswer("Wouldn't have gone.", answers)).toBe(true)
    expect(matchesAnswer('would   not have gone', answers)).toBe(true)
  })
  it('accepts contraction equivalence in both directions', () => {
    expect(matchesAnswer('would not have gone', ["wouldn't have gone"])).toBe(true)
    expect(matchesAnswer("wouldn't have gone", ['would not have gone'])).toBe(true)
    expect(matchesAnswer('will not', ["won't"])).toBe(true)
  })
  it('does not accept a different word or the ambiguous contractions', () => {
    expect(matchesAnswer('would not have went', answers)).toBe(false)
    expect(matchesAnswer('he had gone', ["he'd gone"])).toBe(false)
    expect(matchesAnswer('', answers)).toBe(false)
  })
})

describe('wordCount', () => {
  it('counts normalized words', () => {
    expect(wordCount('  in  spite of ')).toBe(3)
    expect(wordCount("wouldn't have")).toBe(2)
    expect(wordCount('')).toBe(0)
  })
})
