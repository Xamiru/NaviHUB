import { describe, expect, it } from 'vitest'
import { matchState } from '../src/shared/typing'

describe('matchState', () => {
  it('matches a complete romaji answer', () => {
    expect(matchState('sanbon', ['さんぼん'])).toBe('match')
    expect(matchState('ippon', ['いっぽん'])).toBe('match')
    expect(matchState('juppon', ['じゅっぽん', 'じっぽん'])).toBe('match')
    expect(matchState('jippon', ['じゅっぽん', 'じっぽん'])).toBe('match')
  })

  it('treats partial romaji as prefix', () => {
    expect(matchState('sanb', ['さんぼん'])).toBe('prefix')
    expect(matchState('sanbo', ['さんぼん'])).toBe('prefix')
    expect(matchState('i', ['いっぽん'])).toBe('prefix')
    expect(matchState('ip', ['いっぽん'])).toBe('prefix')
    expect(matchState('ipp', ['いっぽん'])).toBe('prefix')
    expect(matchState('ippo', ['いっぽん'])).toBe('prefix')
  })

  it('flags a dead-end as wrong', () => {
    expect(matchState('sanp', ['さんぼん'])).toBe('wrong')
    expect(matchState('x', ['さんぼん'])).toBe('wrong')
    expect(matchState('sa n', ['さんぼん'])).toBe('wrong')
  })

  it('never marks the ん ambiguity wrong', () => {
    // "san" could be さん (prefix of さんぼん) …
    expect(matchState('san', ['さんぼん'])).toBe('prefix')
    // … or the start of さの-like continuations.
    expect(matchState('san', ['さの'])).toBe('prefix')
    expect(matchState('sano', ['さの'])).toBe('match')
  })

  it('keeps a lone trailing n alive but ends on nn', () => {
    expect(matchState('hon', ['ほん'])).toBe('match')
    expect(matchState('honn', ['ほん'])).toBe('match')
    expect(matchState("hon'", ['ほん'])).toBe('match')
  })

  it('accepts direct kana input', () => {
    expect(matchState('さんぼん', ['さんぼん'])).toBe('match')
    expect(matchState('さんぼ', ['さんぼん'])).toBe('prefix')
    expect(matchState('さんび', ['さんぼん'])).toBe('wrong')
    expect(matchState('サンボン', ['さんぼん'])).toBe('match')
  })

  it('accepts mixed kana followed by a romaji tail', () => {
    expect(matchState('さんb', ['さんぼん'])).toBe('prefix')
    expect(matchState('さんbo', ['さんぼん'])).toBe('prefix')
    expect(matchState('さんp', ['さんぼん'])).toBe('wrong')
  })

  it('empty input is a prefix', () => {
    expect(matchState('', ['さんぼん'])).toBe('prefix')
    expect(matchState('  ', ['さんぼん'])).toBe('prefix')
  })

  it('checks against every accepted answer', () => {
    expect(matchState('hachihon', ['はっぽん', 'はちほん'])).toBe('match')
    expect(matchState('happ', ['はっぽん', 'はちほん'])).toBe('prefix')
    expect(matchState('hac', ['はっぽん', 'はちほん'])).toBe('prefix')
  })

  it('handles kunrei spellings', () => {
    expect(matchState('zyuppon', ['じゅっぽん'])).toBe('match')
    expect(matchState('sitizi', ['しちじ'])).toBe('match')
  })

  it('handles long vowels and digraphs', () => {
    expect(matchState('kyuuhon', ['きゅうほん'])).toBe('match')
    expect(matchState('kyu', ['きゅうほん'])).toBe('prefix')
    expect(matchState('juuyokka', ['じゅうよっか'])).toBe('match')
  })

  it('handles readings with とお style vowel runs', () => {
    expect(matchState('too', ['とお'])).toBe('match')
    expect(matchState('to', ['とお'])).toBe('prefix')
  })
})
