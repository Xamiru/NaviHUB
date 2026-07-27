import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createDictTestDb, createTestDb } from './helpers'

let db: Database.Database
let dictDb: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('../src/main/dict/dictDb', () => ({ getDictDb: () => dictDb, closeDictDb: () => {} }))
vi.mock('../src/main/files', () => ({ mangaRootDir: () => '/nowhere' }))
vi.mock('../src/main/tokenizer', () => ({
  // Only the sentence importer uses this; one token per space-separated word.
  tokenize: async (text: string) =>
    text
      .split(/\s+/)
      .filter(Boolean)
      .map((surface) => ({ surface, base: surface, reading: '', pos: '名詞', wordLike: true }))
}))

import { buildCoreDeck } from '../src/main/coreDeck'
import { importFromReader } from '../src/main/dict/importer'
import { importSentenceText } from '../src/main/dict/sentences'
import * as jp from '../src/main/repos/japaneseRepo'

beforeEach(() => {
  db = createTestDb()
  dictDb = createDictTestDb()
})

const WORDS: [string, string, string][] = [
  ['猫', 'ねこ', 'cat'],
  ['犬', 'いぬ', 'dog'],
  ['鳥', 'とり', 'bird'],
  ['魚', 'さかな', 'fish'],
  ['虫', 'むし', 'insect']
]

async function seedDict(): Promise<void> {
  await importFromReader({
    readIndex: async () => ({ title: 'JMdict', revision: 'r', format: 3 }),
    bankNames: () => ['term_bank_1.json'],
    readBank: async () => WORDS.map(([e, r, g], i) => [e, r, 'n', '', 10, [g], i + 1, '']),
    readRaw: async () => Buffer.alloc(0)
  })
}

// Ranks deliberately NOT in insertion order, so ordering must come from `rank`.
async function seedFreq(ranks: [string, number][] = [
  ['虫', 1],
  ['魚', 2],
  ['鳥', 3],
  ['犬', 4],
  ['猫', 5],
  ['は', 6], // particle: filtered by isLearnableWord
  ['幻', 7] // not in JMdict: unglossable, skipped
]): Promise<void> {
  await importFromReader({
    readIndex: async () => ({ title: 'JPDB', revision: 'v1', format: 3 }),
    bankNames: () => ['term_meta_bank_1.json'],
    readBank: async () => ranks.map(([e, r]) => [e, 'freq', r]),
    readRaw: async () => Buffer.alloc(0)
  })
}

function cardFronts(courseId: number): string[] {
  return (
    db
      .prepare(
        `SELECT c.front FROM jp_card c JOIN jp_lesson l ON l.id = c.lesson_id
         WHERE l.course_id = ? ORDER BY l.sort_order, l.id, c.sort_order, c.id`
      )
      .all(courseId) as { front: string }[]
  ).map((r) => r.front)
}

describe('buildCoreDeck', () => {
  it('writes the most frequent unglossed words in rank order', async () => {
    await seedDict()
    await seedFreq()

    const summary = await buildCoreDeck(10)
    expect(summary.courseTitle).toBe('Core frequency deck #1')
    expect(summary.words).toBe(5)
    expect(cardFronts(summary.courseId)).toEqual(['虫', '魚', '鳥', '犬', '猫'])

    const notes = db.prepare('SELECT notes FROM jp_card WHERE front = ?').get('虫') as { notes: string }
    expect(notes.notes).toBe('global frequency rank #1')
  })

  it('respects the requested size', async () => {
    await seedDict()
    await seedFreq()
    const summary = await buildCoreDeck(2)
    expect(cardFronts(summary.courseId)).toEqual(['虫', '魚'])
  })

  it('splits into lessons of 25', async () => {
    await seedDict()
    await importFromReader({
      readIndex: async () => ({ title: 'Big', revision: 'r', format: 3 }),
      bankNames: () => ['term_bank_1.json'],
      readBank: async () =>
        Array.from({ length: 30 }, (_, i) => [`語${i}`, `ご${i}`, 'n', '', 10, [`word ${i}`], i, '']),
      readRaw: async () => Buffer.alloc(0)
    })
    await seedFreq(Array.from({ length: 30 }, (_, i) => [`語${i}`, i + 1] as [string, number]))

    const summary = await buildCoreDeck(30)
    const lessons = db
      .prepare('SELECT title FROM jp_lesson WHERE course_id = ? ORDER BY sort_order, id')
      .all(summary.courseId) as { title: string }[]
    expect(lessons.map((l) => l.title)).toEqual(['Most frequent 1–25', 'Most frequent 26–30'])
  })

  it('skips words already in a deck, and deck #2 continues where #1 stopped', async () => {
    await seedDict()
    await seedFreq()

    const first = await buildCoreDeck(2)
    expect(cardFronts(first.courseId)).toEqual(['虫', '魚'])

    const second = await buildCoreDeck(2)
    expect(second.courseTitle).toBe('Core frequency deck #2')
    expect(cardFronts(second.courseId)).toEqual(['鳥', '犬'])
    expect(second.skippedKnown).toBeGreaterThanOrEqual(2)
  })

  it('skips a word the user already mined by hand', async () => {
    await seedDict()
    await seedFreq()
    const courseId = jp.createCourse({ title: 'Mined', description: null, level: null, difficulty: null })
    jp.createLesson({ courseId, kind: 'vocab', title: 'Mined words', cards: [{ front: '虫', back: 'bug' }] })

    const summary = await buildCoreDeck(2)
    expect(cardFronts(summary.courseId)).toEqual(['魚', '鳥'])
  })

  it('attaches an example sentence when the bank is installed', async () => {
    await seedDict()
    await seedFreq()
    await importSentenceText('The cat sleeps.\t猫 が 寝る\tattr-1')

    const summary = await buildCoreDeck(10)
    const card = db.prepare('SELECT example_jp, example_en FROM jp_card WHERE front = ?').get('猫') as {
      example_jp: string | null
      example_en: string | null
    }
    expect(card.example_jp).toBe('猫 が 寝る')
    expect(card.example_en).toBe('The cat sleeps.')
    // A word with no sentence still gets a card, just without an example.
    const bug = db.prepare('SELECT example_jp FROM jp_card WHERE front = ?').get('虫') as {
      example_jp: string | null
    }
    expect(bug.example_jp).toBeNull()
    expect(summary.words).toBe(5)
  })

  it('explains itself when freq rows are staged but not yet registered', async () => {
    await seedDict()
    // A frequency import in flight: rows exist, the dict registry row does not
    // (it is written LAST, by design). This must be the friendly message, not a
    // TypeError from dereferencing a missing JOIN row.
    dictDb
      .prepare('INSERT INTO freq (dict_id, expression, reading, rank) VALUES (999, ?, ?, ?)')
      .run('猫', '', 1)
    await expect(buildCoreDeck(10)).rejects.toThrow(/no frequency dictionary/i)
  })

  it('explains itself when a required pack is missing', async () => {
    await expect(buildCoreDeck(10)).rejects.toThrow(/no frequency dictionary/i)

    await seedFreq()
    await expect(buildCoreDeck(10)).rejects.toThrow(/no offline dictionary/i)
  })

  it('errors when every frequent word is already known', async () => {
    await seedDict()
    await seedFreq([['猫', 1]])
    const courseId = jp.createCourse({ title: 'Known', description: null, level: null, difficulty: null })
    jp.createLesson({ courseId, kind: 'vocab', title: 'All', cards: [{ front: '猫', back: 'cat' }] })

    await expect(buildCoreDeck(10)).rejects.toThrow(/nothing new/i)
  })

  it('leaves the generated course unscheduled so the roadmap keeps its shape', async () => {
    await seedDict()
    await seedFreq()
    const summary = await buildCoreDeck(2)
    const course = db.prepare('SELECT difficulty, level FROM jp_course WHERE id = ?').get(summary.courseId) as {
      difficulty: number | null
      level: string | null
    }
    expect(course.difficulty).toBeNull()
    expect(course.level).toBeNull()
  })
})
