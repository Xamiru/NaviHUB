import { describe, expect, it } from 'vitest'
import { isKanaOnly, isMostlyLatin, splitMora, toHiragana, toKatakana } from '../src/shared/kana'

describe('kana conversions', () => {
  it('katakana → hiragana, leaving other scripts alone', () => {
    expect(toHiragana('タベル')).toBe('たべる')
    expect(toHiragana('コーヒー')).toBe('こーひー') // ー is preserved
    expect(toHiragana('食べル')).toBe('食べる') // kanji untouched
    expect(toHiragana('cafe')).toBe('cafe')
  })

  it('hiragana → katakana', () => {
    expect(toKatakana('たべる')).toBe('タベル')
    expect(toKatakana('こーひー')).toBe('コーヒー')
  })

  it('isKanaOnly', () => {
    expect(isKanaOnly('たべる')).toBe(true)
    expect(isKanaOnly('コーヒー')).toBe(true)
    expect(isKanaOnly('食べる')).toBe(false)
    expect(isKanaOnly('')).toBe(false)
    expect(isKanaOnly('abc')).toBe(false)
  })

  it('isMostlyLatin routes English queries to gloss search', () => {
    expect(isMostlyLatin('sunset')).toBe(true)
    expect(isMostlyLatin('to eat')).toBe(true)
    expect(isMostlyLatin('食べる')).toBe(false)
    expect(isMostlyLatin('たべる')).toBe(false)
    expect(isMostlyLatin('')).toBe(false)
  })
})

describe('splitMora', () => {
  it('merges small kana onto the preceding mora', () => {
    expect(splitMora('きょう')).toEqual(['きょ', 'う'])
    expect(splitMora('がっこう')).toEqual(['が', 'っ', 'こ', 'う'])
    expect(splitMora('しゃしん')).toEqual(['しゃ', 'し', 'ん'])
  })

  it('keeps っ / ー / ん as their own morae', () => {
    expect(splitMora('コーヒー')).toEqual(['コ', 'ー', 'ヒ', 'ー'])
    expect(splitMora('ほん')).toEqual(['ほ', 'ん'])
  })

  it('handles the empty string', () => {
    expect(splitMora('')).toEqual([])
  })
})
