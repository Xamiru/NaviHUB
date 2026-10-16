import { describe, expect, it } from 'vitest'
import { alignFurigana, furiganaProblems, furiganaReading, parseFurigana, stripFurigana } from '../src/shared/japanese/furigana'

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

describe('alignFurigana', () => {
  const show = (word: string, reading: string | null) =>
    alignFurigana(word, reading).map((s) => (s.ruby ? `${s.text}[${s.ruby}]` : s.text)).join('')

  it('puts the reading over each kanji run, anchored on the kana between them', () => {
    expect(show('食べ物', 'たべもの')).toBe('食[た]べ物[もの]')
    expect(show('東京', 'とうきょう')).toBe('東京[とうきょう]')
    expect(show('お茶', 'おちゃ')).toBe('お茶[ちゃ]')
    expect(show('引き出し', 'ひきだし')).toBe('引[ひ]き出[だ]し')
  })

  it('matches katakana in the word against a hiragana reading', () => {
    expect(show('ガス代', 'がすだい')).toBe('ガス代[だい]')
  })

  it('leaves kana-only words and missing readings as plain text', () => {
    expect(alignFurigana('ありがとう', 'ありがとう')).toEqual([{ text: 'ありがとう', ruby: null }])
    expect(alignFurigana('猫', null)).toEqual([{ text: '猫', ruby: null }])
    expect(alignFurigana('猫', 'neko')).toEqual([{ text: '猫', ruby: null }])
  })

  it('aligns grammar-card sentences and leaves unalignable ones plain', () => {
    expect(show('私は学生です。', 'わたしはがくせいです。')).toBe('私[わたし]は学[がくせい]です。'.replace('学[がくせい]', '学生[がくせい]'))
    // は read as わ: no ruby over the whole sentence, the caller shows the reading instead.
    expect(alignFurigana('今日は', 'きょうわ')).toEqual([{ text: '今日は', ruby: null }])
    // An all-kanji word still carries an irregular reading whole.
    expect(alignFurigana('大人', 'おとな')).toEqual([{ text: '大人', ruby: 'おとな' }])
  })

  it('aligns a full sentence over each kanji run', () => {
    expect(show('日本に来て初めて、四季の美しさを知った。', 'にほんにきてはじめて、しきのうつくしさをしった。')).toBe(
      '日本[にほん]に来[き]て初[はじ]めて、四季[しき]の美[うつく]しさを知[し]った。'
    )
  })

  it('refuses a split the kana anchors leave ambiguous', () => {
    // は could close 母 (はは|は) or open 料理 (は|はりょうり); the text cannot say which.
    expect(alignFurigana('母は料理が上手です。', 'はははりょうりがじょうずです。')).toEqual([
      { text: '母は料理が上手です。', ruby: null }
    ])
    expect(show('見る見る', 'みるみる')).toBe('見[み]る見[み]る')
  })
})

describe('furiganaReading', () => {
  it('replaces each annotated kanji run with its reading', () => {
    expect(furiganaReading('今日[きょう]は雨[あめ]が降[ふ]る。')).toBe('きょうはあめがふる。')
  })
})
