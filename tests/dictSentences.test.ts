import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createDictTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/dict/dictDb', () => ({
  getDictDb: () => db,
  closeDictDb: () => {}
}))

// Deterministic stand-in for kuromoji: splits on spaces the fixtures embed, and
// maps the inflected forms the tests care about back to their dictionary form.
// (The real tokenizer is exercised by tokenizer.test.ts; what matters here is
// that BASE forms are what lands in the FTS index.)
const BASES: Record<string, string> = {
  食べた: '食べる',
  食べる: '食べる',
  読んだ: '読む',
  猫: '猫',
  本: '本',
  寿司: '寿司'
}
vi.mock('../src/main/tokenizer', () => ({
  tokenize: async (text: string) =>
    text
      .split(/[\s、。]+/)
      .filter(Boolean)
      .map((surface) => ({
        surface,
        base: BASES[surface] ?? surface,
        reading: '',
        pos: '名詞',
        wordLike: true
      }))
}))

import {
  getSentenceBankInfo,
  importSentenceText,
  parseSentenceLines,
  querySentences,
  removeSentenceBank
} from '../src/main/dict/sentences'

beforeEach(() => {
  db = createDictTestDb()
})

describe('parseSentenceLines', () => {
  it('reads 3-column and 2-column lines and skips malformed ones', () => {
    const rows = parseSentenceLines(
      [
        'I ate sushi.\t寿司 を 食べた\tCC-BY 2.0 (France) Attribution: tatoeba.org #1 (alice)',
        'I read a book.\t本 を 読んだ',
        'no tab here',
        '',
        '\t寿司', // empty english
        'orphan\t' // empty japanese
      ].join('\n')
    )
    expect(rows).toEqual([
      {
        en: 'I ate sushi.',
        jp: '寿司 を 食べた',
        attribution: 'CC-BY 2.0 (France) Attribution: tatoeba.org #1 (alice)'
      },
      { en: 'I read a book.', jp: '本 を 読んだ', attribution: null }
    ])
  })
})

describe('importSentenceText + querySentences', () => {
  const TSV = [
    'I ate sushi.\t寿司 を 食べた\tattr-1',
    'The cat eats.\t猫 が 食べる\tattr-2',
    'I read a book yesterday and it was very long indeed.\t本 を 読んだ\tattr-3'
  ].join('\n')

  it('finds an inflected sentence by its dictionary form', async () => {
    const summary = await importSentenceText(TSV)
    expect(summary.sentenceCount).toBe(3)

    // 食べた is indexed under 食べる — the whole reason for tokenizing at import.
    const hits = querySentences('食べる')
    expect(hits.map((h) => h.jp).sort()).toEqual(['寿司 を 食べた', '猫 が 食べる'])
    expect(hits[0].attribution).toBeTruthy()
  })

  it('prefers an exact surface match, then the shortest sentence', async () => {
    await importSentenceText(TSV)
    // Both sentences match 食べる; 猫 が 食べる contains the surface literally.
    expect(querySentences('食べる')[0].jp).toBe('猫 が 食べる')
  })

  it('returns [] for an unknown term and never throws on FTS syntax', async () => {
    await importSentenceText(TSV)
    expect(querySentences('存在しない')).toEqual([])
    expect(querySentences('"')).toEqual([])
    expect(querySentences('')).toEqual([])
  })

  it('registers the bank last, so a crashed import leaves only sweepable orphans', async () => {
    await importSentenceText(TSV)
    const info = getSentenceBankInfo()
    expect(info?.sentenceCount).toBe(3)
    const bankIds = db.prepare('SELECT DISTINCT bank_id AS id FROM sentence').all() as { id: number }[]
    expect(bankIds).toHaveLength(1)
    expect(
      (db.prepare('SELECT COUNT(*) AS n FROM sentence_bank WHERE id = ?').get(bankIds[0].id) as {
        n: number
      }).n
    ).toBe(1)
  })

  it('re-import replaces the bank and remove clears everything', async () => {
    await importSentenceText(TSV)
    await importSentenceText('A cat.\t猫\tattr-x')
    expect(getSentenceBankInfo()?.sentenceCount).toBe(1)
    expect((db.prepare('SELECT COUNT(*) AS n FROM sentence').get() as { n: number }).n).toBe(1)

    await removeSentenceBank()
    expect(getSentenceBankInfo()).toBeNull()
    expect((db.prepare('SELECT COUNT(*) AS n FROM sentence').get() as { n: number }).n).toBe(0)
    expect((db.prepare('SELECT COUNT(*) AS n FROM sentence_fts').get() as { n: number }).n).toBe(0)
  })

  it('rejects a file with no usable pairs', async () => {
    await expect(importSentenceText('garbage without tabs')).rejects.toThrow(/no sentence pairs/i)
  })

  it('reports no bank before any import', () => {
    expect(getSentenceBankInfo()).toBeNull()
    expect(querySentences('猫')).toEqual([])
  })
})
