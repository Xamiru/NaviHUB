import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createDictTestDb, createTestDb } from './helpers'

let db: Database.Database
let dictDb: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))
vi.mock('../src/main/dict/dictDb', () => ({
  getDictDb: () => dictDb,
  closeDictDb: () => {}
}))
// prepDeck imports these transitively; none are exercised by the pure fns.
vi.mock('../src/main/files', () => ({ mangaRootDir: () => '/nowhere' }))
vi.mock('../src/main/tokenizer', () => ({ tokenize: async () => [] }))

import { glossFor, rankCandidates, stripXhtml, writePrepCourse } from '../src/main/prepDeck'
import { importFromReader } from '../src/main/dict/importer'
import * as jp from '../src/main/repos/japaneseRepo'

beforeEach(() => {
  db = createTestDb()
  dictDb = createDictTestDb()
})

describe('rankCandidates', () => {
  it('ranks by frequency, drops known words and non-Japanese noise', () => {
    const counts = new Map([
      ['剣', 12],
      ['魔法', 30],
      ['known', 99],
      ['冒険', 5],
      ['abc', 40], // latin noise
      ['は', 100] // single kana
    ])
    const ranked = rankCandidates(counts, new Set(['known']))
    expect(ranked.map((r) => r.word)).toEqual(['魔法', '剣', '冒険'])
  })

  it('keeps single-kanji words', () => {
    const ranked = rankCandidates(new Map([['剣', 3]]), new Set())
    expect(ranked).toEqual([{ word: '剣', count: 3 }])
  })
})

describe('glossFor', () => {
  beforeEach(async () => {
    await importFromReader({
      readIndex: async () => ({ title: 'JMdict', format: 3 }),
      bankNames: () => ['term_bank_1.json'],
      readBank: async () => [
        ['魔法', 'まほう', 'n', '', 50, ['magic'], 1, ''],
        ['つるぎ', '', 'n', '', 10, ['sword (archaic)'], 2, '']
      ]
    })
  })

  it('exact expression match with reading and flattened gloss', () => {
    expect(glossFor(dictDb, '魔法')).toEqual({ reading: 'まほう', gloss: 'magic' })
  })

  it('falls back to a reading match, and null for unknown words', () => {
    expect(glossFor(dictDb, 'つるぎ')?.gloss).toBe('sword (archaic)')
    expect(glossFor(dictDb, '存在しない単語')).toBeNull()
  })
})

describe('writePrepCourse', () => {
  it('writes a course with lessons of 25 and source-linked cards', () => {
    const words = Array.from({ length: 30 }, (_, i) => ({
      word: `語${i}`,
      count: 30 - i,
      reading: `ご${i}`,
      gloss: `meaning ${i}`
    }))
    const courseId = writePrepCourse(42, 'Spice and Wolf', words)

    const course = jp.getCourse(courseId)!
    expect(course.title).toBe('Reading prep: Spice and Wolf')
    expect(course.difficulty).toBeNull() // sorts after the numbered path
    expect(course.lessons).toHaveLength(2) // 25 + 5
    expect(course.lessons[0].title).toBe('Most frequent 1–25')
    expect(course.lessons[1].title).toBe('Most frequent 26–30')

    const lesson = jp.getLesson(course.lessons[0].id)!
    expect(lesson.cards).toHaveLength(25)
    expect(lesson.cards[0].front).toBe('語0')
    expect(lesson.cards[0].sourceMediaId).toBe(42)
    expect(lesson.cards[0].notes).toContain('30×')
    // Not learned by default — the user opts lessons into the SRS.
    expect(course.lessons.every((l) => !l.learned)).toBe(true)
  })
})

describe('stripXhtml', () => {
  it('strips tags, entities, and furigana rt elements', () => {
    const xml = '<p>猫が<ruby>走<rt>はし</rt></ruby>る&nbsp;<b>速い</b></p><style>p{}</style>'
    const text = stripXhtml(xml)
    expect(text).toContain('猫が')
    expect(text).toContain('走')
    expect(text).toContain('速い')
    expect(text).not.toContain('はし') // rt dropped — no double-counting readings
    expect(text).not.toContain('<')
    expect(text).not.toContain('&nbsp;')
  })
})
