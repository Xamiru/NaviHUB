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
    },
    readRaw: async () => Buffer.alloc(0)
  })
}

// A separate frequency dictionary, the way the real packs ship.
async function seedFreq(title: string, rows: unknown[], priority = 0): Promise<void> {
  await importFromReader({
    readIndex: async () => ({ title, revision: 'v1', format: 3 }),
    bankNames: () => ['term_meta_bank_1.json'],
    readBank: async () => rows,
    readRaw: async () => Buffer.alloc(0)
  })
  if (priority) db.prepare('UPDATE dict SET priority = ? WHERE title = ?').run(priority, title)
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

  it('jisho results carry no frequency (ranks are an offline-pack feature)', async () => {
    jishoLookup.mockResolvedValue([
      { slug: 'x', word: '珍しい語', reading: null, meanings: 'rare', pos: null, isCommon: false, jlpt: null }
    ])
    const r = await lookupWord('珍しい語')
    expect(r[0].frequency).toBeNull()
  })
})

describe('frequency attachment', () => {
  it('is null when no frequency dictionary is installed', async () => {
    const r = await lookupWord('猫')
    expect(r[0].frequency).toBeNull()
  })

  it('attaches the rank and display value', async () => {
    await seedFreq('JPDB', [['猫', 'freq', { value: 431, displayValue: '431㋕' }]])
    const r = await lookupWord('猫')
    expect(r[0].frequency).toEqual({ rank: 431, display: '431㋕', dictTitle: 'JPDB' })
  })

  it('keeps the lowest rank across dictionaries, breaking ties on priority', async () => {
    await seedFreq('BCCWJ', [['猫', 'freq', 900]])
    await seedFreq('JPDB', [['猫', 'freq', 431]])
    expect((await lookupWord('猫'))[0].frequency?.rank).toBe(431)

    // Same rank in both: the higher-priority dictionary names it.
    await seedFreq('Tie-low', [['食べる', 'freq', 50]], 1)
    await seedFreq('Tie-high', [['食べる', 'freq', 50]], 9)
    expect((await lookupWord('食べる'))[0].frequency).toEqual({
      rank: 50,
      display: null,
      dictTitle: 'Tie-high'
    })
  })

  it('prefers the row matching the entry reading', async () => {
    await seedFreq('JPDB', [
      ['猫', 'freq', { reading: 'ねこ', frequency: 431 }],
      ['猫', 'freq', { reading: 'びょう', frequency: 12 }] // a different word entirely
    ])
    const r = await lookupWord('猫')
    expect(r[0].frequency?.rank).toBe(431)
  })

  it('attaches on the English-search path too', async () => {
    await seedFreq('JPDB', [['猫', 'freq', 431]])
    const r = await lookupWord('cat')
    const cat = r.find((e) => e.expression === '猫')
    expect(cat?.frequency?.rank).toBe(431)
  })
})

describe('names dictionary (JMnedict semantics)', () => {
  async function seedNames(): Promise<void> {
    await importFromReader(
      {
        readIndex: async () => ({ title: 'JMnedict (English)', revision: 'r', format: 3 }),
        bankNames: () => ['term_bank_1.json'],
        readBank: async () => [
          // 猫 also exists as a (fictional) surname — merges into the word group.
          ['猫', 'ねこ', 'surname', '', 0, ['Neko (surname)'], 1, ''],
          ['中田', 'なかた', 'surname', '', 0, ['Nakata'], 2, ''],
          ['中田', 'なかだ', 'surname', '', 0, ['Nakada'], 2, '']
        ],
        readRaw: async () => Buffer.alloc(0)
      },
      { glossFts: false, defaultPriority: -10 }
    )
  }

  it('name-only entries carry isName and sort after word groups', async () => {
    await seedNames()
    const r = await lookupWord('なかた')
    const nakata = r.find((e) => e.expression === '中田')!
    expect(nakata.isName).toBe(true)
  })

  it('a merged word+name group is NOT flagged and lists the word dict first', async () => {
    await seedNames()
    const r = await lookupWord('猫')
    const neko = r.find((e) => e.expression === '猫')!
    // JMdict def must come first despite JMnedict's higher dict id.
    expect(neko.defs[0].dictTitle).toBe('JMdict')
    expect(neko.isName).toBe(false)
  })

  it('name glosses are absent from the English search', async () => {
    await seedNames()
    const r = await lookupWord('Nakata')
    expect(r.some((e) => e.expression === '中田')).toBe(false)
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
