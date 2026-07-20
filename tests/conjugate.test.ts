import { describe, expect, it } from 'vitest'
import { conjugate, FORMS_FOR } from '../src/shared/conjugate'

describe('conjugate — godan (v5)', () => {
  it('covers the standard forms of 飲む', () => {
    expect(conjugate('のむ', 'v5', 'masu')).toBe('のみます')
    expect(conjugate('のむ', 'v5', 'negative')).toBe('のまない')
    expect(conjugate('のむ', 'v5', 'past')).toBe('のんだ')
    expect(conjugate('のむ', 'v5', 'te')).toBe('のんで')
    expect(conjugate('のむ', 'v5', 'potential')).toBe('のめる')
    expect(conjugate('のむ', 'v5', 'passive')).toBe('のまれる')
    expect(conjugate('のむ', 'v5', 'causative')).toBe('のませる')
    expect(conjugate('のむ', 'v5', 'volitional')).toBe('のもう')
    expect(conjugate('のむ', 'v5', 'ba')).toBe('のめば')
    expect(conjugate('のむ', 'v5', 'imperative')).toBe('のめ')
    expect(conjugate('のむ', 'v5', 'tai')).toBe('のみたい')
  })

  it('euphonic variety: 書く・泳ぐ・話す・待つ・買う', () => {
    expect(conjugate('かく', 'v5', 'past')).toBe('かいた')
    expect(conjugate('およぐ', 'v5', 'te')).toBe('およいで')
    expect(conjugate('はなす', 'v5', 'past')).toBe('はなした')
    expect(conjugate('まつ', 'v5', 'te')).toBe('まって')
    expect(conjugate('かう', 'v5', 'negative')).toBe('かわない') // う → わ
  })

  it('行く is euphonically irregular', () => {
    expect(conjugate('いく', 'v5', 'past')).toBe('いった')
    expect(conjugate('いく', 'v5', 'te')).toBe('いって')
    expect(conjugate('いく', 'v5', 'masu')).toBe('いきます') // regular elsewhere
  })
})

describe('conjugate — ichidan (v1)', () => {
  it('covers 食べる', () => {
    expect(conjugate('たべる', 'v1', 'masu')).toBe('たべます')
    expect(conjugate('たべる', 'v1', 'negative')).toBe('たべない')
    expect(conjugate('たべる', 'v1', 'past')).toBe('たべた')
    expect(conjugate('たべる', 'v1', 'te')).toBe('たべて')
    expect(conjugate('たべる', 'v1', 'potential')).toBe('たべられる')
    expect(conjugate('たべる', 'v1', 'volitional')).toBe('たべよう')
    expect(conjugate('たべる', 'v1', 'ba')).toBe('たべれば')
    expect(conjugate('たべる', 'v1', 'imperative')).toBe('たべろ')
  })
})

describe('conjugate — する / くる', () => {
  it('covers する and compound する-verbs', () => {
    expect(conjugate('する', 'vs', 'past')).toBe('した')
    expect(conjugate('べんきょうする', 'vs', 'negative')).toBe('べんきょうしない')
    expect(conjugate('べんきょうする', 'vs', 'potential')).toBe('べんきょうできる')
    expect(conjugate('する', 'vs', 'volitional')).toBe('しよう')
  })

  it('covers くる', () => {
    expect(conjugate('くる', 'vk', 'negative')).toBe('こない')
    expect(conjugate('くる', 'vk', 'past')).toBe('きた')
    expect(conjugate('くる', 'vk', 'masu')).toBe('きます')
    expect(conjugate('くる', 'vk', 'imperative')).toBe('こい')
    expect(conjugate('くる', 'vk', 'ba')).toBe('くれば')
  })
})

describe('conjugate — i-adjectives', () => {
  it('covers 高い', () => {
    expect(conjugate('たかい', 'adj-i', 'negative')).toBe('たかくない')
    expect(conjugate('たかい', 'adj-i', 'past')).toBe('たかかった')
    expect(conjugate('たかい', 'adj-i', 'te')).toBe('たかくて')
    expect(conjugate('たかい', 'adj-i', 'ba')).toBe('たかければ')
    expect(conjugate('たかい', 'adj-i', 'adverbial')).toBe('たかく')
  })

  it('いい conjugates on the よい stem', () => {
    expect(conjugate('いい', 'adj-i', 'past')).toBe('よかった')
    expect(conjugate('いい', 'adj-i', 'negative')).toBe('よくない')
  })
})

describe('form applicability', () => {
  it('rejects forms that do not apply to a class', () => {
    expect(conjugate('たかい', 'adj-i', 'masu')).toBeNull()
    expect(conjugate('くる', 'vk', 'passive')).toBeNull()
  })

  it('every advertised form produces output for its class', () => {
    const samples: Record<string, string> = {
      v1: 'みる',
      v5: 'よむ',
      vs: 'する',
      vk: 'くる',
      'adj-i': 'ながい'
    }
    for (const [cls, kana] of Object.entries(samples)) {
      for (const form of FORMS_FOR[cls as keyof typeof FORMS_FOR]) {
        expect(
          conjugate(kana, cls as keyof typeof FORMS_FOR, form),
          `${cls} ${form}`
        ).toBeTruthy()
      }
    }
  })
})
