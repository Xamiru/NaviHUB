import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createDictTestDb, createTestDb } from './helpers'

let db: Database.Database
let dictDb: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('../src/main/dict/dictDb', () => ({ getDictDb: () => dictDb, closeDictDb: () => {} }))
vi.mock('../src/main/files', () => ({ mangaRootDir: () => '/nowhere' }))

// Deterministic tokenizer: space-separated fixture text, with particles marked
// not-wordLike the way kuromoji marks 助詞.
const PARTICLES = new Set(['は', 'を', 'が', 'の', '。'])
const BASES: Record<string, string> = { 食べた: '食べる', 読んだ: '読む' }
vi.mock('../src/main/tokenizer', () => ({
  tokenize: async (text: string) =>
    text
      .split(/\s+/)
      .filter(Boolean)
      .map((surface) => ({
        surface,
        base: BASES[surface] ?? surface,
        reading: '',
        pos: PARTICLES.has(surface) ? '助詞' : '名詞',
        wordLike: !PARTICLES.has(surface)
      }))
}))

import { analyzeText } from '../src/main/analyzeText'
import { importFromReader } from '../src/main/dict/importer'
import * as jp from '../src/main/repos/japaneseRepo'

beforeEach(() => {
  db = createTestDb()
  dictDb = createDictTestDb()
})

function learnedCard(front: string, graduate: boolean): void {
  const courseId = jp.createCourse({ title: `c-${front}`, description: null, level: null, difficulty: null })
  const lessonId = jp.createLesson({
    courseId,
    kind: 'vocab',
    title: `l-${front}`,
    cards: [{ front, back: 'meaning' }]
  })
  jp.setLessonLearned(lessonId, true)
  if (graduate) {
    const card = db.prepare('SELECT id FROM jp_card WHERE front = ?').get(front) as { id: number }
    jp.submitReview(card.id, 'easy')
  }
}

async function seedDict(): Promise<void> {
  await importFromReader({
    readIndex: async () => ({ title: 'JMdict', revision: 'r', format: 3 }),
    bankNames: () => ['term_bank_1.json'],
    readBank: async () => [['竜', 'りゅう', 'n', '', 10, ['dragon'], 1, '']],
    readRaw: async () => Buffer.alloc(0)
  })
}

describe('analyzeText', () => {
  const TEXT = '魔法 を 食べた\n竜 が 竜 を 読んだ'

  it('tiers every token and marks particles as nonword', async () => {
    learnedCard('魔法', true)
    learnedCard('食べる', false) // learned lesson, card still new

    const res = await analyzeText(TEXT)
    expect(res.paragraphs).toHaveLength(2)
    const first = res.paragraphs[0]
    expect(first.map((t) => [t.surface, t.tier])).toEqual([
      ['魔法', 'known'],
      ['を', 'nonword'],
      ['食べた', 'learning']
    ])
    // Base form drives the tier, not the surface.
    expect(first[2].base).toBe('食べる')
  })

  it('counts unique words and tokens per tier', async () => {
    learnedCard('魔法', true)
    const res = await analyzeText(TEXT)
    expect(res.stats.tokenCount).toBe(5) // 魔法 食べた 竜 竜 読んだ
    expect(res.stats.uniqueWords).toBe(4)
    expect(res.stats.tiers.known).toEqual({ uniqueCount: 1, tokenCount: 1 })
    expect(res.stats.tiers.unknown.uniqueCount).toBe(3)
    expect(res.stats.tiers.unknown.tokenCount).toBe(4) // 竜 twice
  })

  it('lists unknown words by in-text frequency', async () => {
    const res = await analyzeText(TEXT)
    expect(res.unknown[0]).toMatchObject({ word: '竜', count: 2 })
    expect(res.unknown.map((u) => u.word)).toContain('読む')
  })

  it('fills reading and gloss from the dictionary, null without one', async () => {
    const withoutDict = await analyzeText('竜')
    expect(withoutDict.unknown[0]).toMatchObject({ word: '竜', reading: null, gloss: null })

    await seedDict()
    const withDict = await analyzeText('竜')
    expect(withDict.unknown[0]).toMatchObject({ word: '竜', reading: 'りゅう', gloss: 'dragon' })
  })

  it('returns an empty analysis for blank input', async () => {
    const res = await analyzeText('   \n  ')
    expect(res.paragraphs).toEqual([])
    expect(res.stats.tokenCount).toBe(0)
    expect(res.unknown).toEqual([])
  })

  it('refuses a paste beyond the character cap', async () => {
    await expect(analyzeText('あ'.repeat(200_001))).rejects.toThrow(/too long/i)
  })
})
