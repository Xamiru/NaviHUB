import { describe, expect, it } from 'vitest'
import { isKanaOnly } from '../src/shared/kana'
import {
  KEIGO_IRREGULAR,
  KEIGO_REGULAR_VERBS,
  honorificRegular,
  humbleRegular,
  keigoAnswersIrregular,
  keigoAnswersRegular,
  masuStem,
  politeRegular
} from '../src/shared/keigo'

describe('KEIGO_IRREGULAR structure', () => {
  it('keys unique, kana fields kana-only, arrays aligned, at least one register', () => {
    const keys = new Set<string>()
    for (const e of KEIGO_IRREGULAR) {
      expect(keys.has(e.key), `dup key ${e.key}`).toBe(false)
      keys.add(e.key)
      expect(isKanaOnly(e.plainKana), e.key).toBe(true)
      expect(e.honorific.length, e.key).toBe(e.honorificKana.length)
      expect(e.humble.length, e.key).toBe(e.humbleKana.length)
      expect(e.honorific.length + e.humble.length, e.key).toBeGreaterThan(0)
      for (const k of [...e.honorificKana, ...e.humbleKana]) {
        expect(isKanaOnly(k), `${e.key}: ${k}`).toBe(true)
      }
    }
  })

  it('covers the canonical suppletives', () => {
    const plains = KEIGO_IRREGULAR.map((e) => e.plain)
    for (const must of ['いる', '行く', '来る', '食べる', 'する', '言う', '見る', '知る']) {
      expect(plains).toContain(must)
    }
  })
})

describe('regular pattern generators (textbook outputs pinned)', () => {
  // Every godan ending row + ichidan.
  const cases: [string, 'v1' | 'v5', string, string, string][] = [
    // kana, cls, honorific, humble, polite
    ['かく', 'v5', 'おかきになる', 'おかきする', 'かきます'],
    ['まつ', 'v5', 'おまちになる', 'おまちする', 'まちます'],
    ['はなす', 'v5', 'おはなしになる', 'おはなしする', 'はなします'],
    ['よむ', 'v5', 'およみになる', 'およみする', 'よみます'],
    ['しぬ', 'v5', 'おしにになる', 'おしにする', 'しにます'],
    ['あそぶ', 'v5', 'おあそびになる', 'おあそびする', 'あそびます'],
    ['かう', 'v5', 'おかいになる', 'おかいする', 'かいます'],
    ['およぐ', 'v5', 'およぎになる…placeholder', '…', '…'], // replaced below
    ['かえる', 'v5', 'おかえりになる', 'おかえりする', 'かえります'],
    ['みせる', 'v1', 'おみせになる', 'おみせする', 'みせます']
  ]
  it('produces the お+stem+になる / お+stem+する / masu forms', () => {
    for (const [kana, cls, hon, hum, pol] of cases) {
      if (hon.includes('placeholder')) continue
      expect(honorificRegular(kana, cls), kana).toBe(hon)
      expect(humbleRegular(kana, cls), kana).toBe(hum)
      expect(politeRegular(kana, cls), kana).toBe(pol)
    }
    // ぐ row spelled out (泳ぐ → お泳ぎになる in kana):
    expect(honorificRegular('およぐ', 'v5')).toBe('おおよぎになる')
    expect(humbleRegular('およぐ', 'v5')).toBe('おおよぎする')
  })

  it('masuStem slices ます', () => {
    expect(masuStem('たべる', 'v1')).toBe('たべ')
    expect(masuStem('かく', 'v5')).toBe('かき')
  })
})

describe('keigoAnswersIrregular', () => {
  const taberu = KEIGO_IRREGULAR.find((e) => e.key === 'taberu')!

  it('honorific/humble accept both scripts', () => {
    const hon = keigoAnswersIrregular(taberu, 'honorific')!
    expect(hon.accepted).toContain('召し上がる')
    expect(hon.accepted).toContain('めしあがる')
    expect(hon.display).toBe('召し上がる')
    const hum = keigoAnswersIrregular(taberu, 'humble')!
    expect(hum.accepted).toContain('いただく')
  })

  it('polite derives ます over the plain verb with the kanji stem kept', () => {
    const iku = KEIGO_IRREGULAR.find((e) => e.key === 'iku')!
    const pol = keigoAnswersIrregular(iku, 'polite')!
    expect(pol.accepted).toContain('行きます')
    expect(pol.accepted).toContain('いきます')
  })

  it('returns null for a missing register', () => {
    const kureru = KEIGO_IRREGULAR.find((e) => e.key === 'kureru')!
    expect(keigoAnswersIrregular(kureru, 'humble')).toBeNull()
  })
})

describe('keigoAnswersRegular', () => {
  it('builds kanji + kana accepted forms', () => {
    const kaku = KEIGO_REGULAR_VERBS.find((v) => v.kanji === '書く')!
    const hon = keigoAnswersRegular(kaku, 'honorific')!
    expect(hon.accepted).toContain('お書きになる')
    expect(hon.accepted).toContain('おかきになる')
    expect(hon.display).toBe('お書きになる')
    const pol = keigoAnswersRegular(kaku, 'polite')!
    expect(pol.accepted).toContain('書きます')
    expect(pol.accepted).toContain('かきます')
  })

  it('every listed verb conjugates cleanly in all three registers', () => {
    for (const v of KEIGO_REGULAR_VERBS) {
      for (const register of ['honorific', 'humble', 'polite'] as const) {
        const a = keigoAnswersRegular(v, register)
        expect(a, `${v.kanji} ${register}`).not.toBeNull()
        expect(a!.accepted.length).toBeGreaterThan(0)
      }
    }
  })

  it('regular verb list never contains a suppletive plain form', () => {
    const suppletive = new Set(KEIGO_IRREGULAR.map((e) => e.plain))
    for (const v of KEIGO_REGULAR_VERBS) {
      expect(suppletive.has(v.kanji), v.kanji).toBe(false)
    }
  })
})
