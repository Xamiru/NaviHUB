import { describe, expect, it } from 'vitest'
import { furiganaProblems, parseFurigana, stripFurigana } from '../src/shared/japanese/furigana'

describe('parseFurigana', () => {
  it('attaches a reading to the maximal preceding kanji run', () => {
    expect(parseFurigana('東京駅[とうきょうえき]で')).toEqual([
      { text: '東京駅', ruby: 'とうきょうえき' },
      { text: 'で', ruby: null }
    ])
  })

  it('splits okurigana off the kanji run', () => {
    expect(parseFurigana('食[た]べる')).toEqual([
      { text: '食', ruby: 'た' },
      { text: 'べる', ruby: null }
    ])
  })

  it('handles several runs, leading kana and trailing text', () => {
    expect(parseFurigana('わたしは学校[がっこう]に行[い]きます。')).toEqual([
      { text: 'わたしは', ruby: null },
      { text: '学校', ruby: 'がっこう' },
      { text: 'に', ruby: null },
      { text: '行', ruby: 'い' },
      { text: 'きます。', ruby: null }
    ])
  })

  it('leaves text without brackets alone', () => {
    expect(parseFurigana('ひらがなだけ')).toEqual([{ text: 'ひらがなだけ', ruby: null }])
    expect(parseFurigana('')).toEqual([])
  })

  it('stripFurigana returns the plain sentence', () => {
    expect(stripFurigana('私[わたし]は本[ほん]を読[よ]む。')).toBe('私は本を読む。')
  })
})

describe('furiganaProblems', () => {
  it('accepts a fully annotated passage', () => {
    expect(furiganaProblems('私[わたし]は学校[がっこう]に行[い]きます。')).toEqual([])
    expect(furiganaProblems('ひらがなだけのぶん。')).toEqual([])
  })

  it('flags unbalanced brackets', () => {
    expect(furiganaProblems('私[わたし')[0]).toMatch(/unclosed/)
    expect(furiganaProblems('私わたし]')[0]).toMatch(/without an opening/)
  })

  it('flags an empty or non-kana reading', () => {
    expect(furiganaProblems('私[]は').some((p) => /empty/.test(p))).toBe(true)
    expect(furiganaProblems('私[watashi]は').some((p) => /not kana/.test(p))).toBe(true)
  })

  it('flags a reading that does not follow a kanji, and a kanji run with no reading', () => {
    expect(furiganaProblems('わたし[わたし]は').some((p) => /does not follow/.test(p))).toBe(true)
    expect(furiganaProblems('私[わたし]は学校に行[い]く。').some((p) => /without a reading: 学校/.test(p))).toBe(
      true
    )
  })
})
