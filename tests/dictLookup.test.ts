import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createDictTestDb } from './helpers'
import type { JishoResult } from '../src/shared/types'

let db: Database.Database
vi.mock('../src/main/dict/dictDb', () => ({
  getDictDb: () => db,
  closeDictDb: () => {}
}))
// Keep tokenizer out of lookup tests (kuromoji is slow and non-deterministic);
// the rule-based deinflector + kana normalization carry the candidate set.
vi.mock('../src/main/tokenizer', () => ({ tokenize: async () => [] }))
const jishoLookup = vi.fn<[string], Promise<JishoResult[]>>()
vi.mock('../src/main/jisho', () => ({ lookup: (t: string) => jishoLookup(t) }))

import { lookupWord, lookupKanji } from '../src/main/dict/lookup'
import { importFromReader } from '../src/main/dict/importer'

async function seed(): Promise<void> {
  await importFromReader({
    readIndex: async () => ({ title: 'JMdict', revision: 'r', format: 3 }),
    bankNames: () => ['term_bank_1.json', 'kanji_bank_1.json', 'term_meta_bank_1.json'],
    readBank: async (name) => {
      if (name === 'term_bank_1.json')
        return [
          ['食べる', 'たべる', 'v1 vt', 'v1', 100, ['to eat'], 1, 'ichi1'],
          ['猫', 'ねこ', 'n', '', 90, ['cat', 'feline'], 2, 'ichi1 news1'],
          ['コーヒー', '', 'n', '', 50, ['coffee'], 3, 'gai1']
        ]
      if (name === 'kanji_bank_1.json')
        return [['猫', 'ビョウ', 'ねこ', 'jouyou', ['cat'], { strokes: '11', grade: '8' }]]
      if (name === 'term_meta_bank_1.json')
        return [['猫', 'pitch', { reading: 'ねこ', pitches: [{ position: 1 }] }]]
      return []
    }
  })
}

beforeEach(async () => {
  db = createDictTestDb()
  jishoLookup.mockReset()
  jishoLookup.mockResolvedValue([])
  await seed()
})

describe('lookupWord (Japanese)', () => {
  it('exact expression match', async () => {
    const r = await lookupWord('猫')
    expect(r[0].expression).toBe('猫')
    expect(r[0].reading).toBe('ねこ')
    expect(r[0].source).toBe('offline')
  })

  it('reading match (kana query → kanji headword)', async () => {
    const r = await lookupWord('たべる')
    expect(r.some((e) => e.expression === '食べる')).toBe(true)
  })

  it('katakana query matches a hiragana reading', async () => {
    const r = await lookupWord('ネコ')
    expect(r.some((e) => e.expression === '猫')).toBe(true)
  })

  it('deinflects a conjugated verb', async () => {
    const r = await lookupWord('食べた')
    expect(r.some((e) => e.expression === '食べる')).toBe(true)
  })

  it('attaches pitch-accent data to the entry', async () => {
    const r = await lookupWord('猫')
    expect(r[0].pitches).toEqual([{ reading: 'ねこ', position: 1, devoice: undefined, nasal: undefined }])
  })

  it('marks common words from their term tags', async () => {
    const r = await lookupWord('猫')
    expect(r[0].isCommon).toBe(true)
  })

  it('groups a headword with per-dictionary definitions', async () => {
    const r = await lookupWord('猫')
    expect(r[0].defs).toHaveLength(1)
    expect(r[0].defs[0].dictTitle).toBe('JMdict')
  })
})

describe('lookupWord (English gloss search)', () => {
  it('finds a word by its English meaning', async () => {
    const r = await lookupWord('coffee')
    expect(r.some((e) => e.expression === 'コーヒー')).toBe(true)
  })

  it('matches on multiple gloss words (AND semantics)', async () => {
    const r = await lookupWord('cat feline')
    expect(r.some((e) => e.expression === '猫')).toBe(true)
  })

  it('quotes FTS tokens so stray punctuation cannot throw a MATCH syntax error', async () => {
    // A bare quote / operator would be an FTS syntax error if not quoted — this
    // must return safely (empty is fine), never throw.
    const r = await lookupWord('cat" OR (feline')
    expect(Array.isArray(r)).toBe(true)
  })
})

describe('lookupWord (jisho fallback)', () => {
  it('falls back to jisho.org when nothing is found offline', async () => {
    jishoLookup.mockResolvedValue([
      { slug: 'x', word: '珍しい語', reading: 'めずらしいご', meanings: 'rare word', pos: 'n', isCommon: false, jlpt: null }
    ])
    const r = await lookupWord('珍しい語')
    expect(jishoLookup).toHaveBeenCalled()
    expect(r[0].source).toBe('jisho')
    expect(r[0].expression).toBe('珍しい語')
  })

  it('returns [] for a blank query without calling jisho', async () => {
    expect(await lookupWord('   ')).toEqual([])
    expect(jishoLookup).not.toHaveBeenCalled()
  })
})

describe('lookupKanji', () => {
  it('returns kanji breakdowns for the CJK characters in the text', () => {
    const k = lookupKanji('猫')
    expect(k).toHaveLength(1)
    expect(k[0]).toMatchObject({
      character: '猫',
      onyomi: ['ビョウ'],
      kunyomi: ['ねこ'],
      meanings: ['cat']
    })
    expect(k[0].stats.strokes).toBe('11')
  })

  it('ignores non-kanji input', () => {
    expect(lookupKanji('たべる')).toEqual([])
  })
})
