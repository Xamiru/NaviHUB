import { describe, expect, it } from 'vitest'
import { buildListeningPool, type ListeningRow } from '../src/main/jpListening'
import type { JpToken } from '../src/shared/types'

const tok = (surface: string, base = surface, pos = '名詞'): JpToken => ({
  surface,
  base,
  reading: null,
  pos,
  posDetail: null,
  wordLike: pos !== '助詞' && pos !== '記号'
})
const row = (jp: string, keywords: string): ListeningRow => ({
  jp,
  en: `${jp} en`,
  keywords,
  audioPath: `jpaudio/${jp}.mp3`,
  attribution: null
})

describe('buildListeningPool', () => {
  const rows = [row('猫がいる。', '猫 が いる'), row('犬がいる。', '犬 が いる')]
  const tokens: Record<string, JpToken[]> = {
    '猫がいる。': [tok('猫'), tok('が', 'が', '助詞'), tok('いる', 'いる', '動詞')],
    '犬がいる。': [tok('犬'), tok('が', 'が', '助詞'), tok('いる', 'いる', '動詞')]
  }
  const deps = { known: new Set(['猫', 'いる']), tokenize: async (text: string) => tokens[text] ?? [] }

  it('keeps only all-known recordings in known mode', async () => {
    const out = await buildListeningPool({ mode: 'known', includeLearning: false, limit: 5 }, rows, deps)
    expect(out.map((x) => x.jp)).toEqual(['猫がいる。'])
    expect(out[0].unknownWord).toBeNull()
  })

  it('keeps exactly one unknown and exposes its surface', async () => {
    const out = await buildListeningPool({ mode: 'one', includeLearning: false, limit: 5 }, rows, deps)
    expect(out.map((x) => x.jp)).toEqual(['犬がいる。'])
    expect(out[0].unknownWord).toBe('犬')
    expect(out[0].unknownSurface).toBe('犬')
  })
})
