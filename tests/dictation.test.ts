import { describe, expect, it } from 'vitest'
import { diffChars, normalizeDictation, readingsKey } from '../src/shared/dictation'
import type { JpToken } from '../src/shared/types'

describe('normalizeDictation', () => {
  it('strips punctuation and whitespace', () => {
    expect(normalizeDictation('猫が 好き です。')).toBe('猫が好きです')
    expect(normalizeDictation('「はい、そうです！」')).toBe('はいそうです')
  })

  it('keeps the prolonged-sound mark', () => {
    expect(normalizeDictation('コーヒーを飲む。')).toBe('コーヒーを飲む')
  })

  it('keeps the script as typed', () => {
    expect(normalizeDictation('タベル')).toBe('タベル')
  })
})

describe('diffChars', () => {
  it('marks identical strings as all same', () => {
    expect(diffChars('ねこ', 'ねこ')).toEqual([
      { ch: 'ね', state: 'same' },
      { ch: 'こ', state: 'same' }
    ])
  })

  it('marks a missing character as add', () => {
    const d = diffChars('ねこすき', 'ねこがすき')
    expect(d).toEqual([
      { ch: 'ね', state: 'same' },
      { ch: 'こ', state: 'same' },
      { ch: 'が', state: 'add' },
      { ch: 'す', state: 'same' },
      { ch: 'き', state: 'same' }
    ])
  })

  it('marks an extra character as del', () => {
    const d = diffChars('ねこおすき', 'ねこすき')
    expect(d.filter((c) => c.state === 'del')).toEqual([{ ch: 'お', state: 'del' }])
  })

  it('handles a replacement as del+add', () => {
    const d = diffChars('ねき', 'ねこ')
    const states = d.map((c) => c.state)
    expect(states.filter((s) => s !== 'same').length).toBe(2)
  })

  it('handles empty sides', () => {
    expect(diffChars('', 'あ')).toEqual([{ ch: 'あ', state: 'add' }])
    expect(diffChars('あ', '')).toEqual([{ ch: 'あ', state: 'del' }])
  })
})

describe('readingsKey', () => {
  const tok = (surface: string, reading: string | null, pos = '名詞'): JpToken => ({
    surface,
    base: surface,
    reading,
    pos,
    wordLike: pos !== '記号'
  })

  it('joins hiragana readings and skips punctuation tokens', () => {
    const tokens = [tok('猫', 'ねこ'), tok('が', 'が', '助詞'), tok('。', null, '記号')]
    expect(readingsKey(tokens)).toBe('ねこが')
  })

  it('normalizes katakana readings (kuromoji returns them for some tokens)', () => {
    expect(readingsKey([tok('食べる', 'タベル', '動詞')])).toBe('たべる')
  })

  it('falls back to the surface when no reading exists', () => {
    expect(readingsKey([tok('すき', null)])).toBe('すき')
  })

  it('equal readings from kanji and kana writing compare equal', () => {
    const a = readingsKey([tok('食べた', 'たべた', '動詞')])
    const b = readingsKey([tok('たべた', 'たべた', '動詞')])
    expect(a).toBe(b)
  })
})
