import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createDictTestDb } from './helpers'
import type { JpToken } from '../src/shared/types'

let dictDb: Database.Database
vi.mock('../src/main/dict/dictDb', () => ({
  getDictDb: () => dictDb,
  closeDictDb: () => {}
}))
vi.mock('electron', () => ({ app: { getPath: () => '/tmp' } }))

// kuromoji stand-in: a fixture map from sentence text to tokens (the pure
// helpers are tested with hand-authored tokens in jpSentenceGames.test.ts;
// here what matters is the pool plumbing over the real dict schema).
const T = (
  surface: string,
  pos: string,
  posDetail: string | null = null,
  reading: string | null = null,
  base = surface
): JpToken => ({ surface, base, reading, pos, posDetail, wordLike: pos !== '助詞' && pos !== '記号' })

const FIXTURE: Record<string, JpToken[]> = {
  '私は学校に行きます。': [
    T('私', '名詞', '代名詞', 'わたし'),
    T('は', '助詞', '係助詞'),
    T('学校', '名詞', '一般', 'がっこう'),
    T('に', '助詞', '格助詞'),
    T('行き', '動詞', '自立', 'いき', '行く'),
    T('ます', '助動詞'),
    T('。', '記号', '句点')
  ],
  '猫が魚を食べた。': [
    T('猫', '名詞', '一般', 'ねこ'),
    T('が', '助詞', '格助詞'),
    T('魚', '名詞', '一般', 'さかな'),
    T('を', '助詞', '格助詞'),
    T('食べ', '動詞', '自立', 'たべ', '食べる'),
    T('た', '助動詞'),
    T('。', '記号', '句点')
  ],
  '本当？': [T('本当', '名詞', '一般', 'ほんとう'), T('？', '記号')]
}
vi.mock('../src/main/tokenizer', () => ({
  tokenize: async (text: string) => FIXTURE[text] ?? []
}))

import { importSentenceText } from '../src/main/dict/sentences'
import { importFromReader } from '../src/main/dict/importer'
import { contextReadingPool, particlePool, scramblePool } from '../src/main/jpSentenceGames'
import { BLANK } from '../src/shared/cloze'

beforeEach(async () => {
  dictDb = createDictTestDb()
})

async function seedBank(): Promise<void> {
  await importSentenceText(
    [
      'I go to school.\t私は学校に行きます。',
      'The cat ate a fish.\t猫が魚を食べた。',
      'Really?\t本当？'
    ].join('\n')
  )
}

async function seedJmdict(): Promise<void> {
  await importFromReader({
    readIndex: async () => ({ title: 'JMdict', revision: 'r', format: 3 }),
    bankNames: () => ['term_bank_1.json'],
    readBank: async () => [
      ['学校', 'がっこう', 'n', '', 0, ['school'], 1, ''],
      ['猫', 'ねこ', 'n', '', 0, ['cat'], 2, ''],
      ['魚', 'さかな', 'n', '', 0, ['fish'], 3, ''],
      ['魚', 'うお', 'n', '', 0, ['fish (alt reading)'], 4, ''],
      // 私 deliberately absent → never a reading target
      ['本当', 'ほんとう', 'n', '', 0, ['truth'], 5, '']
    ],
    readRaw: async () => Buffer.alloc(0)
  })
}

describe('sentence-game pools', () => {
  it('return [] without a sentence bank', async () => {
    expect(await particlePool({ limit: 5 })).toEqual([])
    expect(await scramblePool({ limit: 5 })).toEqual([])
    expect(await contextReadingPool({ limit: 5 })).toEqual([])
  })

  it('particlePool blanks one eligible particle per sentence with four options and never a conflict partner', async () => {
    await seedBank()
    const pool = await particlePool({ limit: 10 })
    expect(pool.length).toBe(2) // 本当？ has no particle
    for (const q of pool) {
      expect(q.blanked).toContain(BLANK)
      expect(q.blanked.replace(BLANK, q.answer)).toBe(q.jp)
      expect(q.options).toHaveLength(4)
      expect(q.options).toContain(q.answer)
      if (q.answer === 'は') expect(q.options).not.toContain('が')
      if (q.answer === 'が') expect(q.options).not.toContain('は')
      expect(q.en.length).toBeGreaterThan(0)
    }
  })

  it('scramblePool keeps sentences with 3-6 distinct chunks and strips the final punctuation', async () => {
    await seedBank()
    const pool = await scramblePool({ limit: 10 })
    expect(pool.map((p) => p.jp).sort()).toEqual(['猫が魚を食べた。', '私は学校に行きます。'])
    const s = pool.find((p) => p.jp === '私は学校に行きます。')!
    expect(s.chunks).toEqual(['私は', '学校に', '行きます'])
    expect(s.punct).toBe('。')
  })

  it('contextReadingPool only targets words whose kuromoji reading JMdict attests, and lists the alternates', async () => {
    await seedBank()
    expect(await contextReadingPool({ limit: 10 })).toEqual([]) // no JMdict → nothing verified
    await seedJmdict()
    const pool = await contextReadingPool({ limit: 10 })
    expect(pool.length).toBe(2) // 本当？ is under the 6-char sampling floor
    for (const item of pool) {
      expect(item.jp.slice(item.target.start, item.target.end)).toBe(item.target.surface)
      expect(item.readings[0].length).toBeGreaterThan(0)
      expect(item.target.surface).not.toBe('私')
    }
    const fish = pool.find((p) => p.target.surface === '魚')
    if (fish) {
      expect(fish.readings[0]).toBe('さかな')
      expect(fish.readings).toContain('うお')
      expect(fish.gloss).toBe('fish')
    }
  })
})
