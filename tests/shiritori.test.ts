import { describe, expect, it } from 'vitest'
import { chainKana, startsWithKana, validNext } from '../src/shared/shiritori'

describe('chainKana', () => {
  it('takes the last kana', () => {
    expect(chainKana('しりとり')).toBe('り')
    expect(chainKana('ねこ')).toBe('こ')
  })

  it('ends the game on ん', () => {
    expect(chainKana('ごはん')).toBeNull()
    expect(chainKana('みかん')).toBeNull()
  })

  it('resolves small kana to their full form', () => {
    expect(chainKana('でんしゃ')).toBe('や')
    expect(chainKana('いっしょ')).toBe('よ')
    expect(chainKana('ちきゅう')).toBe('う')
  })

  it('resolves a trailing ー to the preceding vowel', () => {
    expect(chainKana('コーヒー')).toBe('い')
    expect(chainKana('ミラー')).toBe('あ')
    expect(chainKana('メニュー')).toBe('う')
  })

  it('normalizes katakana', () => {
    expect(chainKana('ネコ')).toBe('こ')
    expect(chainKana('パン')).toBeNull()
  })

  it('handles empty and degenerate input', () => {
    expect(chainKana('')).toBeNull()
    expect(chainKana('ー')).toBeNull()
    expect(chainKana('ん')).toBeNull()
  })
})

describe('startsWithKana', () => {
  it('compares the first character in hiragana', () => {
    expect(startsWithKana('り', 'りんご')).toBe(true)
    expect(startsWithKana('り', 'リンゴ')).toBe(true)
    expect(startsWithKana('り', 'ごりら')).toBe(false)
  })

  it('digraph starts count as their first kana', () => {
    expect(startsWithKana('し', 'しゃしん')).toBe(true)
  })

  it('accepts a katakana required kana', () => {
    expect(startsWithKana('リ', 'りんご')).toBe(true)
  })
})

describe('validNext', () => {
  it('chains through normal words', () => {
    expect(validNext('しりとり', 'りんご')).toBe(true)
    expect(validNext('りんご', 'ごりら')).toBe(true)
    expect(validNext('ごりら', 'らくだ')).toBe(true)
    expect(validNext('らくだ', 'だちょう')).toBe(true)
  })

  it('rejects a wrong start', () => {
    expect(validNext('しりとり', 'ねこ')).toBe(false)
  })

  it('rejects chaining off a game-ending word', () => {
    expect(validNext('ごはん', 'んなこと')).toBe(false)
  })

  it('chains off small-kana and ー endings', () => {
    expect(validNext('でんしゃ', 'やま')).toBe(true)
    expect(validNext('コーヒー', 'いぬ')).toBe(true)
  })
})
