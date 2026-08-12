import { describe, expect, it } from 'vitest'
import {
  acceptedRomaji,
  kanaToRomaji,
  readingMatches,
  romajiToHiragana,
  splitReadings
} from '../src/shared/romaji'

describe('acceptedRomaji', () => {
  it('returns Hepburn plus kunrei variants', () => {
    expect(acceptedRomaji('し')).toEqual(['shi', 'si'])
    expect(acceptedRomaji('つ')).toEqual(['tsu', 'tu'])
    expect(acceptedRomaji('か')).toEqual(['ka'])
  })

  it('handles digraphs and katakana', () => {
    expect(acceptedRomaji('きょ')).toEqual(['kyo'])
    expect(acceptedRomaji('シャ')).toContain('sha')
    expect(acceptedRomaji('ジ')).toContain('ji')
  })

  it('unknown input yields []', () => {
    expect(acceptedRomaji('漢')).toEqual([])
  })

  it('covers standalone small kana and extended combos', () => {
    expect(acceptedRomaji('っ')).toContain('xtu')
    expect(acceptedRomaji('ゃ')).toContain('lya')
    expect(acceptedRomaji('ふぁ')).toEqual(['fa'])
    expect(acceptedRomaji('ティ')).toEqual(['thi'])
    expect(acceptedRomaji('ゔ')).toEqual(['vu'])
  })
})

describe('kanaToRomaji', () => {
  it('converts plain words', () => {
    expect(kanaToRomaji('ねこ')).toBe('neko')
    expect(kanaToRomaji('きょう')).toBe('kyou')
  })

  it('handles っ doubling and っち → tchi', () => {
    expect(kanaToRomaji('がっこう')).toBe('gakkou')
    expect(kanaToRomaji('まっちゃ')).toBe('matcha')
  })

  it('handles ー long vowels and katakana', () => {
    expect(kanaToRomaji('コーヒー')).toBe('koohii')
  })

  it("writes n' before vowels", () => {
    expect(kanaToRomaji('きんえん')).toBe("kin'en")
    expect(kanaToRomaji('ほん')).toBe('hon')
  })
})

describe('romajiToHiragana', () => {
  it('converts basic and digraph spellings', () => {
    expect(romajiToHiragana('neko')).toBe('ねこ')
    expect(romajiToHiragana('kyou')).toBe('きょう')
    expect(romajiToHiragana('sha')).toBe('しゃ')
    expect(romajiToHiragana('sya')).toBe('しゃ')
  })

  it('handles doubled consonants and tch', () => {
    expect(romajiToHiragana('gakkou')).toBe('がっこう')
    expect(romajiToHiragana('matcha')).toBe('まっちゃ')
  })

  it('handles the n family', () => {
    expect(romajiToHiragana('hon')).toBe('ほん')
    expect(romajiToHiragana('honn')).toBe('ほん')
    expect(romajiToHiragana("kin'en")).toBe('きんえん')
    expect(romajiToHiragana('nani')).toBe('なに') // n + vowel = な row
  })

  it('handles x/l small kana', () => {
    expect(romajiToHiragana('xtu')).toBe('っ')
    expect(romajiToHiragana('ltsu')).toBe('っ')
    expect(romajiToHiragana('xya')).toBe('ゃ')
    expect(romajiToHiragana('la')).toBe('ぁ')
    expect(romajiToHiragana('kya')).toBe('きゃ') // full digraphs never shadowed by x/l entries
  })

  it('handles extended combos', () => {
    expect(romajiToHiragana('faito')).toBe('ふぁいと')
    expect(romajiToHiragana('thi')).toBe('てぃ')
    expect(romajiToHiragana('dhi')).toBe('でぃ')
    expect(romajiToHiragana('twu')).toBe('とぅ')
    expect(romajiToHiragana('wisukii')).toBe('うぃすきい')
    expect(romajiToHiragana('she')).toBe('しぇ')
    expect(romajiToHiragana('che')).toBe('ちぇ')
    expect(romajiToHiragana('je')).toBe('じぇ')
    expect(romajiToHiragana('vu')).toBe('ゔ')
    expect(romajiToHiragana('va')).toBe('ゔぁ')
    expect(romajiToHiragana('ffa')).toBe('っふぁ') // sokuon composes with extended units
  })
})

describe('readingMatches', () => {
  it('matches romaji input against kana readings', () => {
    expect(readingMatches('neko', ['ねこ'])).toBe(true)
    expect(readingMatches('inu', ['ねこ'])).toBe(false)
  })

  it('matches kana input in either script', () => {
    expect(readingMatches('ねこ', ['ねこ'])).toBe(true)
    expect(readingMatches('ネコ', ['ねこ'])).toBe(true)
  })

  it('matches any reading in a KANJIDIC-style list, ignoring okurigana dots', () => {
    expect(readingMatches('a', ['ア アク'])).toBe(true)
    expect(readingMatches('tsugu', ['つ.ぐ'])).toBe(true)
    expect(readingMatches('byou', ['ビョウ'])).toBe(true)
    expect(readingMatches('biyou', ['ビョウ'])).toBe(false) // びよう ≠ びょう
  })

  it('rejects blank input', () => {
    expect(readingMatches('  ', ['ねこ'])).toBe(false)
  })
})

describe('splitReadings', () => {
  it('splits on spaces, commas, and interpuncts; strips dots', () => {
    expect(splitReadings('ア アク')).toEqual(['ア', 'アク'])
    expect(splitReadings('つ.ぐ、うつ.す')).toEqual(['つぐ', 'うつす'])
    expect(splitReadings('にんべん')).toEqual(['にんべん'])
  })
})
