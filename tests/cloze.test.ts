import { describe, expect, it } from 'vitest'
import {
  BLANK,
  buildTypedPrompt,
  clozeGrammarExample,
  grammarCandidates,
  grammarPointCandidates
} from '../src/shared/cloze'
import type { JpCard } from '../src/shared/types'

type CardBits = Pick<JpCard, 'front' | 'reading' | 'back' | 'exampleJp'>

const card = (bits: Partial<CardBits>): CardBits => ({
  front: '',
  reading: null,
  back: '',
  exampleJp: null,
  ...bits
})

describe('grammarCandidates', () => {
  // Titles taken verbatim from the seeded grammar packs.
  it('pulls kana grammar points out of real lesson titles, longest first', () => {
    expect(grammarCandidates('Explanatory ～んです / ～んだ')).toEqual(['んです', 'んだ'])
    expect(grammarCandidates('Conditionals I: ～たら')).toEqual(['たら'])
    expect(grammarCandidates('～ば～ほど — the more, the more')).toEqual(['ほど'])
    expect(grammarCandidates('てる / でる — the ている contraction')).toEqual(['ている', 'てる', 'でる'])
  })

  it('ignores kanji-bearing segments and single characters', () => {
    // 間 / 間に carry kanji — vocabulary, not a frame worth blanking — and a
    // lone は is too ambiguous to blank, so both titles yield nothing typed.
    expect(grammarCandidates('～間・～間に — during')).toEqual([])
    expect(grammarCandidates('Topics with は')).toEqual([])
    expect(grammarCandidates('People & family')).toEqual([])
  })
})

describe('buildTypedPrompt — grammar', () => {
  it('blanks the grammar point out of the sentence and accepts kana or romaji', () => {
    const p = buildTypedPrompt(
      card({ front: '雨が降ってるんです。', reading: 'あめがふってるんです。', back: "It's raining, you see." }),
      'grammar',
      'Explanatory ～んです / ～んだ'
    )!
    expect(p.display).toBe(`雨が降ってる${BLANK}。`)
    expect(p.reveal).toBe('んです')
    expect(p.hint).toBe("It's raining, you see.")
    expect(p.accept('んです')).toBe(true)
    expect(p.accept('ndesu')).toBe(true)
    expect(p.accept(' んです ')).toBe(true)
    expect(p.accept('んだ')).toBe(false)
    expect(p.accept('')).toBe(false)
  })

  it('falls back to a flip when the title has no usable kana point', () => {
    expect(
      buildTypedPrompt(card({ front: '猫は かわいい。', back: 'Cats are cute.' }), 'grammar', 'Topics with は')
    ).toBeNull()
  })

  it('falls back to a flip when the point never appears in the sentence', () => {
    expect(
      buildTypedPrompt(
        card({ front: '雨が降っている。', back: "It's raining." }),
        'grammar',
        'Conditionals I: ～たら'
      )
    ).toBeNull()
  })
})

describe('buildTypedPrompt — vocab', () => {
  it('clozes the word out of its example sentence', () => {
    const p = buildTypedPrompt(
      card({ front: '冒険', reading: 'ぼうけん', back: 'adventure', exampleJp: '冒険に出かけよう。' }),
      'vocab',
      'Everyday nouns'
    )!
    expect(p.display).toBe(`${BLANK}に出かけよう。`)
    expect(p.reveal).toBe('冒険')
    expect(p.accept('冒険')).toBe(true)
    expect(p.accept('ぼうけん')).toBe(true) // the reading counts too
    expect(p.accept('bouken')).toBe(true)
    expect(p.accept('剣')).toBe(false)
  })

  it('asks for the reading when there is no usable example', () => {
    const p = buildTypedPrompt(
      card({ front: '冒険', reading: 'ぼうけん', back: 'adventure' }),
      'vocab',
      'Everyday nouns'
    )!
    expect(p.display).toBe('冒険')
    expect(p.reveal).toBe('ぼうけん')
    expect(p.accept('ぼうけん')).toBe(true)
    expect(p.accept('bouken')).toBe(true)
    expect(p.accept('けん')).toBe(false)
  })

  it('ignores an example that is just the word itself', () => {
    const p = buildTypedPrompt(
      card({ front: '冒険', reading: 'ぼうけん', back: 'adventure', exampleJp: '冒険' }),
      'vocab',
      'Nouns'
    )!
    expect(p.display).toBe('冒険') // fell through to type-the-reading
    expect(p.reveal).toBe('ぼうけん')
  })

  it('falls back to a flip for a card with neither example nor reading', () => {
    expect(buildTypedPrompt(card({ front: 'ネコ', back: 'cat' }), 'vocab', 'Nouns')).toBeNull()
  })
})

describe('grammarPointCandidates / clozeGrammarExample', () => {
  it('unions title and formation candidates, longest first', () => {
    // Shapes matching the hanabira grammar pack (title + formation string).
    expect(grammarPointCandidates('～てしまう', 'Verb-て form + しまう')).toEqual([
      'てしまう',
      'しまう'
    ])
    expect(grammarPointCandidates('～たら', null)).toEqual(['たら'])
  })

  it('drops kanji-bearing and single-character segments from formations', () => {
    // 意向形 carries kanji, と is a single char; する survives as a kana run.
    expect(grammarPointCandidates('Volitional', '意向形 + と + する')).toEqual(['する'])
    expect(grammarPointCandidates('Volitional', '意向形 + と')).toEqual([])
  })

  it('blanks the first candidate found in the example', () => {
    const c = clozeGrammarExample(['てしまう', 'しまう'], '宿題を忘れてしまった。')
    // てしまう is conjugated in the sentence (てしまった) so the raw form does
    // not appear — the helper is honest about that and skips to nothing.
    expect(c).toBeNull()
    const c2 = clozeGrammarExample(['てしまう', 'しまう'], '食べてしまうかもしれない。')
    expect(c2).toEqual({ clozeJp: `食べ${BLANK}かもしれない。`, answer: 'てしまう' })
  })

  it('returns null when no candidate appears', () => {
    expect(clozeGrammarExample(['たら'], '雨が降っている。')).toBeNull()
    expect(clozeGrammarExample([], '雨が降ったら帰る。')).toBeNull()
  })

  it('blanks only the first occurrence', () => {
    const c = clozeGrammarExample(['ながら'], '歩きながら話しながら食べる。')
    expect(c!.clozeJp).toBe(`歩き${BLANK}話しながら食べる。`)
  })
})

describe('buildTypedPrompt — kanji', () => {
  it('always flips (the kana page already drills kanji readings)', () => {
    expect(
      buildTypedPrompt(
        card({ front: '猫', reading: 'ねこ', back: 'cat', exampleJp: '猫がいる。' }),
        'kanji',
        'Animals'
      )
    ).toBeNull()
  })
})
