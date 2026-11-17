import { mkdtempSync, rmSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Database from 'better-sqlite3'
import type BetterSqlite3 from 'better-sqlite3'
import { createTestDb } from './helpers'
import { planVocab, vocabContext, vocabKey, vocabKind } from '../src/main/kindle/kindleVocabCore'
import { readVocabFile, type KoVocabRow } from '../src/main/kindle/kindleScan'

let db: BetterSqlite3.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))

import * as kindleRepo from '../src/main/repos/kindleRepo'

// Rows as they are on the user's Kindle (2026-11-17).
const LURCH: KoVocabRow = {
  word: 'lurch',
  highlight: 'lurched',
  prev: 'ack door, and, dancing from side to side, he ',
  next: ' across the yard, kicked off his boots at the back door. Then he went to bed.',
  title: 'Animal Farm',
  createdAt: 1793001329
}
const RECLUSE: KoVocabRow = {
  word: 'recluse',
  highlight: null,
  prev: "and shut-in. It's called hikikomori. That's me. A ",
  next: '.\nThey say that there are now a million of us.',
  title: 'Welcome to the NHK!',
  createdAt: 1793151169
}

describe('vocabulary rules', () => {
  it('tells English from Japanese and skips the rest', () => {
    expect(vocabKind('lurch')).toBe('en')
    expect(vocabKind("o'clock")).toBe('en')
    expect(vocabKind('well-being')).toBe('en')
    expect(vocabKind('食べる')).toBe('jp')
    expect(vocabKind('カタカナ')).toBe('jp')
    expect(vocabKind('漢字')).toBe('jp')
    expect(vocabKind('2026')).toBeNull()
    expect(vocabKind('naïve!?')).toBeNull()
    expect(vocabKey('en', 'Lurch')).toBe('en:lurch')
    expect(vocabKey('jp', '食べる')).toBe('jp:食べる')
  })

  it("treats a curly apostrophe as a straight one", () => {
    expect(vocabKind('don’t')).toBe('en')
    expect(vocabKey('en', 'Don’t')).toBe(vocabKey('en', "don't"))
  })

  it('keeps the word in a long context, trimming around it', () => {
    const ctx = vocabContext({ word: 'serene', highlight: null, prev: 'a'.repeat(350) + ' ', next: ' b'.repeat(200) })!
    expect(ctx.length).toBeLessThanOrEqual(300)
    expect(ctx).toContain(' serene ')
    expect(ctx.startsWith('…')).toBe(true)
    expect(ctx.endsWith('…')).toBe(true)
  })

  it('rebuilds the sentence the word was read in, as tapped', () => {
    expect(vocabContext(LURCH)).toBe('ack door, and, dancing from side to side, he lurched across the yard, kicked off his boots at the back door.')
    expect(vocabContext(RECLUSE)).toBe('A recluse.')
    expect(vocabContext({ word: 'x', highlight: null, prev: null, next: null })).toBeNull()
    const long = vocabContext({ word: 'w', highlight: null, prev: 'a '.repeat(400), next: '' })!
    expect(long.length).toBeLessThanOrEqual(300)
  })

  it('offers each new word once, with its meaning, and lists undefined ones as not importable', () => {
    const plan = planVocab(
      [RECLUSE, LURCH, { ...LURCH, createdAt: 1793999999 }, { ...RECLUSE, word: 'Recluse' }, { ...LURCH, word: '2026' }],
      new Set(['en:recluse']),
      new Map([['en:lurch', { meaning: 'move suddenly and unsteadily', pos: 'verb' }]])
    )
    expect(plan).toEqual([
      {
        key: 'en:lurch',
        kind: 'en',
        word: 'lurch',
        reading: null,
        meaning: 'move suddenly and unsteadily',
        pos: 'verb',
        context: vocabContext(LURCH),
        book: 'Animal Farm',
        importable: true
      }
    ])
    const none = planVocab([RECLUSE], new Set(), new Map())
    expect(none[0]).toMatchObject({ key: 'en:recluse', meaning: null, importable: false })
  })
})

describe('reading the vocabulary file', () => {
  let dir: string
  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'navihub-kvocab-'))
  })
  afterEach(() => rmSync(dir, { recursive: true, force: true }))

  it("reads KOReader's schema with the book titles", () => {
    const path = join(dir, 'vocabulary_builder.sqlite3')
    const v = new Database(path)
    v.exec(`CREATE TABLE vocabulary (word TEXT NOT NULL UNIQUE, title_id INTEGER, create_time INTEGER NOT NULL,
        review_time INTEGER, due_time INTEGER NOT NULL, review_count INTEGER NOT NULL DEFAULT 0,
        prev_context TEXT, next_context TEXT, streak_count INTEGER NOT NULL DEFAULT 0, highlight TEXT,
        PRIMARY KEY(word));
      CREATE TABLE title (id INTEGER NOT NULL UNIQUE, name TEXT UNIQUE, filter INTEGER NOT NULL DEFAULT 1,
        PRIMARY KEY(id));`)
    v.prepare(`INSERT INTO title (id, name) VALUES (1, 'Animal Farm')`).run()
    v.prepare(
      `INSERT INTO vocabulary (word, title_id, create_time, due_time, prev_context, next_context, highlight)
       VALUES ('lurch', 1, 1793001329, 0, 'he ', ' across', 'lurched'), ('scullery', 1, 1793001459, 0, 'the ', ',', NULL)`
    ).run()
    v.close()
    expect(readVocabFile(path)).toEqual({
      rows: [
        { word: 'lurch', highlight: 'lurched', prev: 'he ', next: ' across', title: 'Animal Farm', createdAt: 1793001329 },
        { word: 'scullery', highlight: null, prev: 'the ', next: ',', title: 'Animal Farm', createdAt: 1793001459 }
      ],
      capped: false
    })
  })

  it('reads an older schema without highlight, contexts or titles', () => {
    const path = join(dir, 'old.sqlite3')
    const v = new Database(path)
    v.exec(`CREATE TABLE vocabulary (word TEXT NOT NULL UNIQUE, create_time INTEGER NOT NULL)`)
    v.prepare(`INSERT INTO vocabulary (word, create_time) VALUES ('serene', 5)`).run()
    v.close()
    expect(readVocabFile(path).rows).toEqual([
      { word: 'serene', highlight: null, prev: null, next: null, title: null, createdAt: 5 }
    ])
  })

  it('refuses a damaged copy rather than reading garbage', () => {
    const path = join(dir, 'broken.sqlite3')
    writeFileSync(path, Buffer.alloc(4096, 0x41))
    expect(() => readVocabFile(path)).toThrow()
  })
})

describe('importing words', () => {
  beforeEach(() => {
    db = createTestDb()
  })

  const select = (words: string[]) => ({ scanId: 'x', progress: [], status: [], quotes: [], reading: [], words })

  it('adds English words to the deck with their sentence, once, and Undo removes only unreviewed ones', () => {
    const plan = planVocab(
      [LURCH, RECLUSE],
      kindleRepo.vocabSkipKeys([]),
      new Map([
        ['en:lurch', { meaning: 'move suddenly and unsteadily', pos: 'verb' }],
        ['en:recluse', { meaning: 'one who lives alone', pos: 'noun' }]
      ])
    )
    const r = kindleRepo.apply([], select(['en:lurch', 'en:recluse']), '2026-11-17', plan)
    expect(r.wordsAdded).toBe(2)
    const rows = db.prepare(`SELECT word, meaning, pos, example FROM en_word ORDER BY word`).all()
    expect(rows).toEqual([
      { word: 'lurch', meaning: 'move suddenly and unsteadily', pos: 'verb', example: vocabContext(LURCH) },
      { word: 'recluse', meaning: 'one who lives alone', pos: 'noun', example: 'A recluse.' }
    ])
    // Never offered again: imported, and in the deck.
    expect(kindleRepo.vocabSkipKeys([{ key: 'en:lurch', kind: 'en', word: 'lurch' }]).has('en:lurch')).toBe(true)
    // A second apply of the same plan adds nothing.
    expect(kindleRepo.apply([], select(['en:lurch']), '2026-11-17', plan).wordsAdded).toBe(0)

    // The user reviews one word; Undo of the first import keeps it.
    db.prepare(`UPDATE en_word SET reps = 1 WHERE word = 'recluse'`).run()
    db.prepare(`DELETE FROM kindle_import WHERE id = (SELECT MAX(id) FROM kindle_import)`).run()
    const undo = kindleRepo.undoLast()
    expect(undo).toEqual({ restored: 1, kept: 1 })
    expect(db.prepare(`SELECT word FROM en_word`).all()).toEqual([{ word: 'recluse' }])
    expect(kindleRepo.importedVocabKeys()).toEqual(new Set(['en:recluse']))
  })

  it('puts Japanese words in the mining inbox, and skips words already in a deck', () => {
    const word: KoVocabRow = { word: '漢字', highlight: null, prev: 'この', next: 'は難しい。', title: 'Monster', createdAt: 1 }
    const plan = planVocab([word], new Set(), new Map([['jp:漢字', { meaning: 'kanji; Chinese characters', reading: 'かんじ' }]]))
    expect(kindleRepo.apply([], select(['jp:漢字']), '2026-11-17', plan).wordsAdded).toBe(1)
    const card = db
      .prepare(
        `SELECT c.front, c.reading, c.back, c.example_jp AS ex, c.notes, co.title AS course
         FROM jp_card c JOIN jp_lesson l ON l.id = c.lesson_id JOIN jp_course co ON co.id = l.course_id`
      )
      .get()
    expect(card).toMatchObject({
      front: '漢字',
      reading: 'かんじ',
      back: 'kanji; Chinese characters',
      ex: 'この漢字は難しい。',
      notes: 'Looked up on the Kindle in Monster'
    })
    // A word whose front is already a card is left out of the next preview.
    expect(kindleRepo.vocabSkipKeys([{ key: 'jp:別', kind: 'jp', word: '漢字' }]).has('jp:別')).toBe(true)
  })

  it('Undo keeps a word the user edited, or reviewed in another direction', () => {
    const plan = planVocab(
      [LURCH, RECLUSE],
      new Set(),
      new Map([
        ['en:lurch', { meaning: 'move suddenly', pos: 'verb' }],
        ['en:recluse', { meaning: 'one who lives alone', pos: 'noun' }]
      ])
    )
    kindleRepo.apply([], select(['en:lurch', 'en:recluse']), '2026-11-17', plan)
    db.prepare(`UPDATE en_word SET meaning = 'my own words' WHERE word = 'lurch'`).run()
    expect(kindleRepo.undoLast()).toEqual({ restored: 1, kept: 1 })
    expect(db.prepare(`SELECT word, meaning FROM en_word`).all()).toEqual([{ word: 'lurch', meaning: 'my own words' }])

    const jp = planVocab(
      [{ word: '漢字', highlight: null, prev: null, next: null, title: null, createdAt: 1 }],
      new Set(),
      new Map([['jp:漢字', { meaning: 'kanji', reading: 'かんじ' }]])
    )
    kindleRepo.apply([], select(['jp:漢字']), '2026-11-17', jp)
    const card = db.prepare(`SELECT id FROM jp_card WHERE front = '漢字'`).get() as { id: number }
    db.prepare(`INSERT INTO jp_card_review (card_id, direction, reps) VALUES (?, 'production', 2)`).run(card.id)
    expect(kindleRepo.undoLast()).toEqual({ restored: 0, kept: 1 })
    expect(db.prepare(`SELECT COUNT(*) AS n FROM jp_card WHERE front = '漢字'`).get()).toEqual({ n: 1 })
  })

  it('never imports a word without a meaning, even if selected', () => {
    const plan = planVocab([RECLUSE], new Set(), new Map())
    expect(kindleRepo.apply([], select(['en:recluse']), '2026-11-17', plan).wordsAdded).toBe(0)
    expect(db.prepare(`SELECT COUNT(*) AS n FROM en_word`).get()).toEqual({ n: 0 })
  })
})
