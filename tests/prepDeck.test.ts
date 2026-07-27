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

import { fuseWithGlobalRank, glossFor, rankCandidates, writePrepCourse } from '../src/main/prepDeck'
import { stripXhtml } from '../src/main/seriesText'
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

describe('fuseWithGlobalRank', () => {
  // In series-frequency order, as rankCandidates returns them.
  const candidates = [
    { word: '魔法', count: 30 },
    { word: '剣', count: 28 },
    { word: '冒険', count: 26 },
    { word: '町', count: 24 }
  ]
  const words = (list: { word: string }[]): string[] => list.map((c) => c.word)

  it('is the identity when no frequency dictionary is installed', () => {
    expect(fuseWithGlobalRank(candidates, new Map())).toEqual(candidates)
  })

  it('keeps series order when the global ranks agree with it', () => {
    const global = new Map([
      ['魔法', 1],
      ['剣', 2],
      ['冒険', 3],
      ['町', 4]
    ])
    expect(fuseWithGlobalRank(candidates, global)).toEqual(candidates)
  })

  it('lifts an everyday word over a series-specific one it trails', () => {
    // 町 is last in this series but the most common word in the language;
    // 冒険 is series-frequent yet globally rare. The fusion swaps them.
    const global = new Map([
      ['町', 40],
      ['魔法', 3000],
      ['剣', 5000],
      ['冒険', 90_000]
    ])
    expect(words(fuseWithGlobalRank(candidates, global))).toEqual(['魔法', '剣', '町', '冒険'])
  })

  it('keeps the series rank dominant — a global #1 does not jump the whole list', () => {
    const global = new Map([['町', 1]])
    // 町 rises, but the series' most frequent word still leads the deck.
    expect(words(fuseWithGlobalRank(candidates, global))[0]).toBe('魔法')
  })

  it('pushes words the frequency dictionary has never seen down the list', () => {
    const global = new Map([
      ['剣', 50],
      ['冒険', 60],
      ['町', 70]
    ])
    // 魔法 leads the series but is globally unranked, so a known word passes it.
    expect(words(fuseWithGlobalRank(candidates, global))).toEqual(['剣', '魔法', '冒険', '町'])
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
