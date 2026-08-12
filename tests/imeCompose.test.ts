import { describe, expect, it } from 'vitest'
import {
  ComposeState,
  EMPTY_COMPOSE,
  backspace,
  commitText,
  displayText,
  isEmpty,
  transformLast,
  typeKana,
  typeRomaji
} from '../src/shared/imeCompose'

function typeAll(input: string, from: ComposeState = EMPTY_COMPOSE): ComposeState {
  let s = from
  for (const ch of input) s = typeRomaji(s, ch)
  return s
}

describe('typeRomaji', () => {
  it('composes digraphs live: r-y-o-u', () => {
    let s = typeRomaji(EMPTY_COMPOSE, 'r')
    expect(displayText(s)).toBe('r')
    s = typeRomaji(s, 'y')
    expect(s).toEqual({ kana: '', pending: 'ry' })
    s = typeRomaji(s, 'o')
    expect(s).toEqual({ kana: 'りょ', pending: '' })
    s = typeRomaji(s, 'u')
    expect(s).toEqual({ kana: 'りょう', pending: '' })
  })

  it('composes kyou', () => {
    expect(typeAll('kyou')).toEqual({ kana: 'きょう', pending: '' })
  })

  it('holds a lone trailing n pending, resolves it by context', () => {
    let s = typeAll('hon')
    expect(s).toEqual({ kana: 'ほ', pending: 'n' })
    expect(commitText(s)).toBe('ほん')
    // n + vowel = な row
    expect(typeAll('nani')).toEqual({ kana: 'なに', pending: '' })
    // nn commits ん and the third n holds again
    expect(typeAll('nnn')).toEqual({ kana: 'ん', pending: 'n' })
    expect(commitText(typeAll('nnn'))).toBe('んん')
    // keystroke-by-keystroke matches full-string conversion
    expect(typeAll('nna')).toEqual({ kana: 'んあ', pending: '' })
    expect(typeAll('nnna')).toEqual({ kana: 'んな', pending: '' })
    s = typeAll("kin'en")
    expect(commitText(s)).toBe('きんえん')
  })

  it('handles doubled consonants and tch across keystrokes', () => {
    expect(typeAll('gakkou')).toEqual({ kana: 'がっこう', pending: '' })
    expect(typeAll('matcha')).toEqual({ kana: 'まっちゃ', pending: '' })
    expect(typeAll('tt')).toEqual({ kana: 'っ', pending: 't' })
  })

  it('resolves - to ー immediately', () => {
    expect(typeAll('ko-hi-')).toEqual({ kana: 'こーひー', pending: '' })
  })

  it('handles extended combos and x/l small kana', () => {
    expect(typeAll('faito')).toEqual({ kana: 'ふぁいと', pending: '' })
    expect(typeAll('xtu')).toEqual({ kana: 'っ', pending: '' })
    expect(typeAll('ffa')).toEqual({ kana: 'っふぁ', pending: '' })
  })

  it('lets unresolvable letters pass through visibly', () => {
    const s = typeAll('qa')
    expect(displayText(s)).toBe('qあ')
    expect(commitText(s)).toBe('qあ')
  })
})

describe('typeKana', () => {
  it('appends directly', () => {
    expect(typeKana(EMPTY_COMPOSE, 'か')).toEqual({ kana: 'か', pending: '' })
  })

  it('flushes dangling romaji first', () => {
    const s = typeKana({ kana: 'ほ', pending: 'n' }, 'か')
    expect(s).toEqual({ kana: 'ほんか', pending: '' })
  })
})

describe('backspace', () => {
  it('removes pending letters before buffer kana', () => {
    let s = typeAll('kyon') // きょ + pending n
    s = backspace(s)
    expect(s).toEqual({ kana: 'きょ', pending: '' })
    s = backspace(s)
    expect(s).toEqual({ kana: 'き', pending: '' })
    s = backspace(s)
    expect(isEmpty(s)).toBe(true)
    expect(backspace(s)).toBe(s) // no-op on empty returns same object
  })
})

describe('transformLast', () => {
  it('applies the explicit toggles both ways', () => {
    expect(transformLast({ kana: 'か', pending: '' }, 'dakuten').kana).toBe('が')
    expect(transformLast({ kana: 'が', pending: '' }, 'dakuten').kana).toBe('か')
    expect(transformLast({ kana: 'は', pending: '' }, 'handakuten').kana).toBe('ぱ')
    expect(transformLast({ kana: 'つ', pending: '' }, 'small').kana).toBe('っ')
  })

  it('cycles the phone convention', () => {
    let s: ComposeState = { kana: 'あは', pending: '' }
    s = transformLast(s, 'cycle')
    expect(s.kana).toBe('あば')
    s = transformLast(s, 'cycle')
    expect(s.kana).toBe('あぱ')
    s = transformLast(s, 'cycle')
    expect(s.kana).toBe('あは')
  })

  it('no-ops (same object) on empty, pending romaji, or transformless kana', () => {
    const empty = EMPTY_COMPOSE
    expect(transformLast(empty, 'cycle')).toBe(empty)
    const withPending: ComposeState = { kana: 'か', pending: 'k' }
    expect(transformLast(withPending, 'dakuten')).toBe(withPending)
    const noForm: ComposeState = { kana: 'ん', pending: '' }
    expect(transformLast(noForm, 'cycle')).toBe(noForm)
    expect(transformLast({ kana: 'か', pending: '' }, 'handakuten')).toEqual({
      kana: 'か',
      pending: ''
    })
  })
})

describe('display vs commit', () => {
  it('displayText shows the latin tail, commitText flushes it', () => {
    const s = typeAll('shimbun'.replace('m', 'n')) // しんぶん typed naturally
    expect(commitText(s)).toBe('しんぶん')
    const mid = typeAll('ky')
    expect(displayText(mid)).toBe('ky')
    expect(commitText(mid)).toBe('ky') // passthrough — never silently dropped
  })
})
