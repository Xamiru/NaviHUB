import { describe, expect, it } from 'vitest'
import { mapEntry } from '../src/main/jisho'

const OMOSHIROI = {
  slug: '面白い',
  is_common: true,
  jlpt: ['jlpt-n5'],
  japanese: [{ word: '面白い', reading: 'おもしろい' }],
  senses: [
    { english_definitions: ['interesting', 'fascinating'], parts_of_speech: ['I-adjective'] },
    { english_definitions: ['amusing', 'funny'], parts_of_speech: ['I-adjective'] },
    { english_definitions: ['enjoyable'], parts_of_speech: ['I-adjective'] }
  ]
}

describe('jisho mapEntry', () => {
  it('maps word, reading, joined meanings (first two senses), pos and badges', () => {
    const r = mapEntry(OMOSHIROI)!
    expect(r.word).toBe('面白い')
    expect(r.reading).toBe('おもしろい')
    expect(r.meanings).toBe('interesting, fascinating; amusing, funny')
    expect(r.pos).toBe('I-adjective')
    expect(r.isCommon).toBe(true)
    expect(r.jlpt).toBe('jlpt-n5')
  })

  it('falls back to the kana reading when there is no kanji form', () => {
    const r = mapEntry({
      slug: 'こんにちは',
      japanese: [{ reading: 'こんにちは' }],
      senses: [{ english_definitions: ['hello'], parts_of_speech: [] }]
    })!
    expect(r.word).toBe('こんにちは')
    expect(r.pos).toBeNull()
  })

  it('drops entries without a Japanese form or without meanings', () => {
    expect(mapEntry({ senses: [{ english_definitions: ['x'] }] })).toBeNull()
    expect(mapEntry({ japanese: [{ word: '謎' }], senses: [] })).toBeNull()
    expect(mapEntry(null)).toBeNull()
  })
})
