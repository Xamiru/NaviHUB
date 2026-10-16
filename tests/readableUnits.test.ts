import { describe, expect, it } from 'vitest'
import { buildReadableUnits } from '../src/shared/japanese/readableUnits'

const tok = (surface: string, base: string, tier = 'known') => ({ surface, base, tier })

describe('buildReadableUnits', () => {
  it('cuts a paragraph into words with their readings intact', () => {
    const units = buildReadableUnits('雨[あめ]が降[ふ]った。', [
      tok('雨', '雨'),
      tok('が', 'が', 'nonword'),
      tok('降っ', '降る', 'unknown'),
      tok('た', 'た', 'nonword'),
      tok('。', '。', 'nonword')
    ])!
    expect(units.map((u) => u.surface)).toEqual(['雨', 'が', '降っ', 'た', '。'])
    expect(units[0].segments).toEqual([{ text: '雨', ruby: 'あめ' }])
    expect(units[2]).toMatchObject({ base: '降る', tier: 'unknown' })
    expect(units[2].segments).toEqual([{ text: '降', ruby: 'ふ' }, { text: 'っ', ruby: null }])
    expect(units[1].base).toBeNull()
  })

  it('merges tokens a reading spans, so the ruby is never split', () => {
    const units = buildReadableUnits('東京駅[とうきょうえき]へ', [tok('東京', '東京'), tok('駅', '駅'), tok('へ', 'へ', 'nonword')])!
    expect(units.map((u) => u.surface)).toEqual(['東京駅', 'へ'])
    expect(units[0]).toMatchObject({ base: '東京駅', segments: [{ text: '東京駅', ruby: 'とうきょうえき' }] })
  })

  it('gives up when the tokens do not line up with the text', () => {
    expect(buildReadableUnits('雨[あめ]', [tok('雪', '雪')])).toBeNull()
  })
})
