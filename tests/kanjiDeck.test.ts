import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createDictTestDb, createTestDb } from './helpers'

let db: Database.Database
let dictDb: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('../src/main/dict/dictDb', () => ({ getDictDb: () => dictDb, closeDictDb: () => {} }))
vi.mock('../src/main/files', () => ({ mangaRootDir: () => '/nowhere' }))

import { buildKanjiDeck, formatKunyomi, primaryReading } from '../src/main/kanjiDeck'
import { importFromReader } from '../src/main/dict/importer'
import * as jp from '../src/main/repos/japaneseRepo'

beforeEach(() => {
  db = createTestDb()
  dictDb = createDictTestDb()
})

// character, on, kun, meanings, freq, grade
const KANJI: [string, string, string, string[], number, number][] = [
  ['山', 'サン', 'やま', ['mountain'], 131, 1],
  ['川', 'セン', 'かわ', ['river'], 181, 1],
  ['海', 'カイ', 'うみ', ['sea', 'ocean'], 200, 2],
  ['森', 'シン', 'もり', ['forest'], 609, 1],
  ['猫', 'ビョウ', 'ねこ', ['cat'], 1702, 8],
  ['鬱', 'ウツ', 'ふさ.ぐ', ['gloom'], 0, 0] // neither jōyō-graded nor frequent: skipped
]

async function seedKanjidic(): Promise<void> {
  await importFromReader({
    readIndex: async () => ({ title: 'KANJIDIC', revision: 'r', format: 3 }),
    bankNames: () => ['kanji_bank_1.json'],
    readBank: async () =>
      KANJI.map(([c, on, kun, meanings, freq, grade]) => [
        c,
        on,
        kun,
        '',
        meanings,
        freq ? { freq: String(freq), grade: String(grade) } : {}
      ]),
    readRaw: async () => Buffer.alloc(0)
  })
}

async function seedWords(): Promise<void> {
  await importFromReader({
    readIndex: async () => ({ title: 'JMdict', revision: 'r', format: 3 }),
    bankNames: () => ['term_bank_1.json'],
    readBank: async () => [
      ['海外', 'かいがい', 'n', '', 10, ['overseas'], 1, ''],
      ['森林', 'しんりん', 'n', '', 10, ['forest, woods'], 2, '']
    ],
    readRaw: async () => Buffer.alloc(0)
  })
  await importFromReader({
    readIndex: async () => ({ title: 'JPDB', revision: 'v1', format: 3 }),
    bankNames: () => ['term_meta_bank_1.json'],
    readBank: async () => [
      ['海外', 'freq', 1],
      ['森林', 'freq', 2]
    ],
    readRaw: async () => Buffer.alloc(0)
  })
}

function cards(courseId: number) {
  return db
    .prepare(
      `SELECT c.front, c.reading, c.back, c.onyomi, c.kunyomi, c.example_jp AS exampleJp,
              c.example_reading AS exampleReading
       FROM jp_card c JOIN jp_lesson l ON l.id = c.lesson_id
       WHERE l.course_id = ? ORDER BY l.sort_order, l.id, c.sort_order, c.id`
    )
    .all(courseId) as Record<string, string | null>[]
}

describe('kanji deck helpers', () => {
  it('writes KANJIDIC okurigana in brackets, like the curated cards', () => {
    expect(formatKunyomi('ひと ひと.つ ひと.つ')).toEqual(['ひと', 'ひと(つ)'])
  })
  it('takes the first on reading as the primary reading, else the kun stem', () => {
    expect(primaryReading({ onyomi: ['サン'], kunyomi: ['やま'] })).toBe('さん')
    expect(primaryReading({ onyomi: [], kunyomi: ['ふさ(ぐ)'] })).toBe('ふさ')
    expect(primaryReading({ onyomi: [], kunyomi: ['-こ(む)', 'こ(む)'] })).toBe('こ')
    expect(primaryReading({ onyomi: [], kunyomi: ['-こ(み)'] })).toBe('こ')
  })
})

describe('buildKanjiDeck', () => {
  it('refuses without KANJIDIC', async () => {
    await expect(buildKanjiDeck(10)).rejects.toThrow(/KANJIDIC/)
  })

  it('puts the kanji of your own words first, then the most frequent, skipping covered ones', async () => {
    await seedKanjidic()
    await seedWords()
    const courseId = jp.createCourse({ title: 'Mine', description: null, level: null, difficulty: null })
    jp.createLesson({ courseId, kind: 'vocab', title: 'Words', cards: [{ front: '子猫', reading: 'こねこ', back: 'kitten' }] })
    jp.createLesson({ courseId, kind: 'kanji', title: 'Known', cards: [{ front: '川', back: 'river' }] })

    const summary = await buildKanjiDeck(10)
    expect(summary.courseTitle).toBe('Kanji deck #1')
    const rows = cards(summary.courseId)
    // 猫 is in the learner's word; 川 already has a card; 鬱 is neither graded nor frequent.
    expect(rows.map((r) => r.front)).toEqual(['猫', '山', '海', '森'])
    expect(rows[0]).toMatchObject({ reading: 'びょう', back: 'cat', exampleJp: '子猫', exampleReading: 'こねこ' })
    // No word of the learner's: the most frequent dictionary word that uses it.
    expect(rows[2]).toMatchObject({ front: '海', back: 'sea, ocean', exampleJp: '海外', onyomi: 'カイ', kunyomi: 'うみ' })
    expect(rows[3]).toMatchObject({ front: '森', exampleJp: '森林' })
  })

  it('continues where the last deck stopped, and the roadmap counts it on the kanji track', async () => {
    await seedKanjidic()
    const first = await buildKanjiDeck(2)
    expect(cards(first.courseId).map((r) => r.front)).toEqual(['山', '川'])
    const second = await buildKanjiDeck(2)
    expect(second.courseTitle).toBe('Kanji deck #2')
    expect(cards(second.courseId).map((r) => r.front)).toEqual(['海', '森'])

    const track = jp.roadmap().tracks.kanji
    expect(track.built).toBe(4)
    expect(track.decks).toBe(2)
    expect(track.nextLesson?.courseTitle).toBe('Kanji deck #1')
  })
})
