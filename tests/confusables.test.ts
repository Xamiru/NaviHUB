import { describe, expect, it } from 'vitest'
import {
  confusableTier,
  isLoanwordCandidate,
  kanjiChars,
  type ConfusablePoolItem
} from '../src/shared/confusables'

const item = (id: number, front: string, reading: string | null): ConfusablePoolItem => ({
  id,
  front,
  reading
})

describe('confusableTier', () => {
  const target = item(1, '開ける', 'あける')
  const partner = item(2, '開く', 'あく') // transitivity partner of 開ける
  const homophone = item(3, '明ける', 'あける') // same reading, different word
  const sharedKanji = item(4, '開始', 'かいし') // shares 開
  const unrelated = item(5, '猫', 'ねこ')
  const pool = [target, partner, homophone, sharedKanji, unrelated]

  it('en2jp: partner > homophone > shared kanji, unrelated excluded', () => {
    const tier = confusableTier(pool, target, 'en2jp')
    expect(tier.map((i) => i.id)).toEqual([2, 3, 4])
  })

  it('cloze behaves like en2jp', () => {
    expect(confusableTier(pool, target, 'cloze').map((i) => i.id)).toEqual([2, 3, 4])
  })

  it('jp2reading: shared-kanji only (homophones have identical answers)', () => {
    const tier = confusableTier(pool, target, 'jp2reading')
    expect(tier.map((i) => i.id)).toEqual([2, 4]) // partner still tier-topped
    expect(tier.map((i) => i.id)).not.toContain(3)
  })

  it('jp2en: transitivity partner ONLY', () => {
    expect(confusableTier(pool, target, 'jp2en').map((i) => i.id)).toEqual([2])
  })

  it('never returns the target or same-front items', () => {
    const dupFront = item(9, '開ける', null)
    const tier = confusableTier([...pool, dupFront], target, 'en2jp')
    expect(tier.map((i) => i.id)).not.toContain(1)
    expect(tier.map((i) => i.id)).not.toContain(9)
  })

  it('tolerates null readings and katakana normalization', () => {
    const t = item(1, 'カワ', 'カワ')
    const homo = item(2, '川', 'かわ')
    const noReading = item(3, '河口', null)
    const tier = confusableTier([t, homo, noReading], t, 'en2jp')
    expect(tier.map((i) => i.id)).toEqual([2]) // katakana reading matches hiragana
  })

  it('returns empty for an unrelated pool', () => {
    expect(confusableTier([item(2, '猫', 'ねこ')], item(1, '犬', 'いぬ'), 'en2jp')).toEqual([])
  })
})

describe('kanjiChars', () => {
  it('extracts only CJK ideographs', () => {
    expect(kanjiChars('開ける')).toEqual(['開'])
    expect(kanjiChars('カタカナ')).toEqual([])
    expect(kanjiChars('日本語abc')).toEqual(['日', '本', '語'])
  })
})

describe('isLoanwordCandidate', () => {
  it('accepts common all-katakana words', () => {
    expect(isLoanwordCandidate('ミシン', [], 5000)).toBe(true)
    expect(isLoanwordCandidate('コーヒー', ['gai1'], null)).toBe(true)
  })

  it('rejects hiragana, kanji-bearing and mixed strings', () => {
    expect(isLoanwordCandidate('みしん', [], 100)).toBe(false)
    expect(isLoanwordCandidate('缶コーヒー', ['gai1'], 100)).toBe(false)
    expect(isLoanwordCandidate('', [], 100)).toBe(false)
  })

  it('rejects single-mora and rare uncommon words', () => {
    expect(isLoanwordCandidate('ア', ['gai1'], 1)).toBe(false)
    expect(isLoanwordCandidate('ゾンビランドサガ', [], null)).toBe(false)
    expect(isLoanwordCandidate('ゾンビ', [], 50000)).toBe(false)
  })
})
