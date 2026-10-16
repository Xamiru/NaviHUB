import { describe, expect, it } from 'vitest'
import { normalizeCasualText, restoreSurfaces } from '../src/main/tokenizerCasual'
import type { JpToken } from '../src/shared/types'

const tok = (surface: string, base = surface, pos = '名詞'): JpToken => ({
  surface,
  base,
  reading: null,
  pos,
  posDetail: null,
  wordLike: true
})

describe('casual-speech normalization', () => {
  it('rewrites sound-changed adjectives to same-length standard forms', () => {
    expect(normalizeCasualText('すげえな')).toBe('すごいな')
    expect(normalizeCasualText('うるせぇ！')).toBe('うるさい！')
    expect(normalizeCasualText('やべー')).toBe('やばい')
    expect(normalizeCasualText('だりー')).toBe('だるい')
    expect(normalizeCasualText('こええ')).toBe('こわい')
    expect(normalizeCasualText('つまんねえ')).toBe('つまらない')
    for (const s of ['すげえな', 'うるせぇ！', 'つまんねえ話']) {
      expect(normalizeCasualText(s)).toHaveLength(s.length)
    }
  })

  it('turns the verb negative ねえ into ない only after a verb stem', () => {
    expect(normalizeCasualText('知らねーよ')).toBe('知らないよ')
    expect(normalizeCasualText('行かねえ')).toBe('行かない')
    // "hey" and 姉さん stay as written.
    expect(normalizeCasualText('ねえ、聞いて')).toBe('ねえ、聞いて')
    expect(normalizeCasualText('おねえさん')).toBe('おねえさん')
  })

  it('leaves standard text untouched', () => {
    expect(normalizeCasualText('窓の外では雨が降り続いていた。')).toBe('窓の外では雨が降り続いていた。')
  })

  it('gives tokens of the normalized text the original characters back', () => {
    const original = 'すげえな'
    const normalized = normalizeCasualText(original)
    const restored = restoreSurfaces([tok('すごい', 'すごい', '形容詞'), tok('な', 'な', '助詞')], normalized, original)!
    expect(restored.map((t) => [t.surface, t.base, t.reading])).toEqual([
      ['すげえ', 'すごい', 'すげえ'],
      ['な', 'な', null]
    ])
  })

  it('refuses tokens that do not cover the text, so the caller falls back', () => {
    expect(restoreSurfaces([tok('すご')], 'すごい', 'すげえ')).toBeNull()
    expect(restoreSurfaces([tok('すごい')], 'すごい', 'すげ')).toBeNull()
  })
})
