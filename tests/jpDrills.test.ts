import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createDictTestDb, createTestDb } from './helpers'

let db: Database.Database
let dictDb: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('../src/main/dict/dictDb', () => ({ getDictDb: () => dictDb, closeDictDb: () => {} }))
vi.mock('../src/main/tokenizer', () => ({ tokenize: async () => [] }))

import { componentQuizPool, pitchQuizPool, shiritoriNext } from '../src/main/jpDrills'
import { importKanjiumText } from '../src/main/dict/kanjium'
import { importKradData } from '../src/main/dict/krad'
import { importFromReader } from '../src/main/dict/importer'
import * as jp from '../src/main/repos/japaneseRepo'

beforeEach(() => {
  db = createTestDb()
  dictDb = createDictTestDb()
})

// The user's cards: one learned lesson with two words, one unlearned.
function seedCards(): void {
  const courseId = jp.createCourse({ title: 'C', description: null, level: null, difficulty: null })
  const learned = jp.createLesson({ courseId, kind: 'vocab', title: 'L1', body: null })
  jp.createCard(learned, { front: '会う', reading: 'あう', back: 'to meet' })
  jp.createCard(learned, { front: '人', reading: 'ひと', back: 'person' })
  jp.setLessonLearned(learned, true)
  const unlearned = jp.createLesson({ courseId, kind: 'vocab', title: 'L2', body: null })
  jp.createCard(unlearned, { front: 'お手前', reading: 'おてまえ', back: 'etiquette' })
}

const KANJIUM = ['人\tひと\t0,2', '会う\tあう\t1', 'かなた\t\t1'].join('\n')

describe('pitchQuizPool', () => {
  it('joins learned cards against pitch data (unlearned lessons excluded)', async () => {
    seedCards()
    await importKanjiumText(KANJIUM)
    const pool = pitchQuizPool({ source: 'cards', limit: 50 })
    expect(pool.map((p) => p.term).sort()).toEqual(['人', '会う'])
    const hito = pool.find((p) => p.term === '人')!
    expect(hito.reading).toBe('ひと')
    expect(hito.positions).toEqual([0, 2])
    expect(hito.fromCards).toBe(true)
  })

  it('tops up from frequency rows when asked', async () => {
    await importKanjiumText(KANJIUM)
    // A frequency dictionary whose ranks cover the kanjium terms.
    await importFromReader({
      readIndex: async () => ({ title: 'Freq', revision: 'r', format: 3 }),
      bankNames: () => ['term_meta_bank_1.json'],
      readBank: async () => [
        ['人', 'freq', { value: 1 }],
        ['会う', 'freq', { value: 2 }]
      ],
      readRaw: async () => Buffer.alloc(0)
    })
    const pool = pitchQuizPool({ source: 'frequency', limit: 10 })
    expect(pool.length).toBe(2)
    expect(pool.every((p) => !p.fromCards)).toBe(true)
  })

  it('returns [] when no pitch data exists', () => {
    seedCards()
    expect(pitchQuizPool({ source: 'both', limit: 10 })).toEqual([])
  })
})

describe('componentQuizPool', () => {
  const KRAD = [
    { literal: '娃', components: ['女', '土'] },
    { literal: '壊', components: ['土', '罒', '衣'] }
  ]
  const COMPONENTS = [
    { component: '女', strokeCount: 3 },
    { component: '土', strokeCount: 3 },
    { component: '罒', strokeCount: 5 },
    { component: '衣', strokeCount: 6 },
    { component: '一', strokeCount: 1 },
    { component: '口', strokeCount: 3 },
    { component: '丶', strokeCount: 1 },
    { component: 'ノ', strokeCount: 1 },
    { component: '乙', strokeCount: 1 },
    { component: '亅', strokeCount: 1 }
  ]

  it('builds questions from kanji-kind cards with decoys excluding real parts', async () => {
    await importKradData(KRAD, COMPONENTS)
    const courseId = jp.createCourse({ title: 'K', description: null, level: null, difficulty: null })
    const lesson = jp.createLesson({ courseId, kind: 'kanji', title: 'Kanji 1', body: null })
    jp.createCard(lesson, { front: '娃', reading: null, back: 'beauty' })
    jp.createCard(lesson, { front: 'あ', reading: null, back: 'not a kanji' })
    const pool = componentQuizPool({ source: { kind: 'cards' }, limit: 10 })
    expect(pool).toHaveLength(1)
    const q = pool[0]
    expect(q.kanji).toBe('娃')
    expect(q.components.map((c) => c.char).sort()).toEqual(['土', '女'])
    const real = new Set(q.components.map((c) => c.char))
    expect(q.decoys.length).toBeGreaterThanOrEqual(5)
    expect(q.decoys.every((d) => !real.has(d.char))).toBe(true)
  })

  it('level source falls back to random decomposable kanji without KANJIDIC', async () => {
    await importKradData(KRAD, COMPONENTS)
    const pool = componentQuizPool({ source: { kind: 'level', level: 'N5' }, limit: 10 })
    expect(pool.length).toBeGreaterThan(0)
  })

  it('returns [] when kradfile is absent', () => {
    expect(componentQuizPool({ source: { kind: 'cards' }, limit: 5 })).toEqual([])
  })
})

describe('shiritoriNext', () => {
  async function seedDict(): Promise<void> {
    await importFromReader({
      readIndex: async () => ({ title: 'JMdict', revision: 'r', format: 3 }),
      bankNames: () => ['term_bank_1.json'],
      readBank: async () => [
        ['林檎', 'りんご', 'n', '', 0, ['apple'], 1, ''],
        ['りんごん', 'りんごん', 'n', '', 0, ['fake bell noun'], 2, ''], // ends ん — never a reply
        ['立派', 'りっぱ', 'adj-na', '', 0, ['splendid'], 3, ''], // not a noun tag
        ['旅', 'たび', 'n', '', 0, ['journey'], 4, '']
      ],
      readRaw: async () => Buffer.alloc(0)
    })
  }

  it('replies with a noun starting with the kana, never a ん-ender', async () => {
    await seedDict()
    const w = shiritoriNext({ kana: 'り', exclude: [] })
    expect(w).not.toBeNull()
    expect(w!.expression).toBe('林檎')
    expect(w!.gloss).toContain('apple')
  })

  it('honors the exclude list and runs out of words', async () => {
    await seedDict()
    const w = shiritoriNext({ kana: 'り', exclude: ['りんご'] })
    expect(w).toBeNull() // りんごん ends ん, 立派 isn't a noun
  })

  it('returns null when nothing is installed', () => {
    expect(shiritoriNext({ kana: 'り', exclude: [] })).toBeNull()
  })
})
