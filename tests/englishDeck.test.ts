import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createDictTestDb, createTestDb } from './helpers'

let db: Database.Database
let dictDb: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('../src/main/dict/dictDb', () => ({
  getDictDb: () => dictDb,
  closeDictDb: () => {}
}))
vi.mock('electron', () => ({ app: { getPath: () => '/tmp' } }))

import { attachRanks, deckOverview } from '../src/main/englishDeck'
import { saveWord } from '../src/main/repos/englishRepo'
import type { EnWord } from '../src/shared/types'

// The deck overview joins navihub.db (en_word) with dictionaries.db (en_freq)
// in JS. Real SQL on both sides; no network, no pack files.

beforeEach(() => {
  db = createTestDb()
  dictDb = createDictTestDb()
})

function seedFreq(words: [string, number][]): void {
  dictDb
    .prepare("INSERT INTO en_freq_set (id, source, word_count) VALUES (1, 'opensubtitles', ?)")
    .run(words.length)
  const ins = dictDb.prepare('INSERT INTO en_freq (bank_id, word, rank) VALUES (1, ?, ?)')
  for (const [w, r] of words) ins.run(w, r)
}

const fake = (word: string): EnWord =>
  ({
    id: 1,
    word,
    phonetic: null,
    pos: null,
    meaning: 'm',
    example: null,
    createdAt: 'x',
    status: 'new',
    learningStep: 0,
    dueAt: null,
    intervalDays: 0,
    ease: 2.5,
    reps: 0,
    lapses: 0,
    lastReviewedAt: null
  }) as EnWord

describe('attachRanks (pure)', () => {
  it('matches case-insensitively on the trimmed word and leaves misses null', () => {
    const ranks = new Map([
      ['ubiquitous', 12000],
      ['tart', 30000]
    ])
    const out = attachRanks([fake('Ubiquitous '), fake('tart'), fake('run the gauntlet')], ranks)
    expect(out.map((w) => w.rank)).toEqual([12000, 30000, null])
  })
})

describe('deckOverview against the real SQL', () => {
  it('attaches OpenSubtitles ranks to saved words; phrases and unlisted words are unranked', () => {
    seedFreq([
      ['ubiquitous', 12000],
      ['tart', 30000],
      ['the', 1]
    ])
    saveWord({ word: 'ubiquitous', meaning: 'Present everywhere.' })
    saveWord({ word: 'Tart', meaning: 'Sharp in taste.' })
    saveWord({ word: 'run the gauntlet', meaning: 'Endure criticism.' })
    const deck = deckOverview()
    const byWord = new Map(deck.map((w) => [w.word, w.rank]))
    expect(byWord.get('ubiquitous')).toBe(12000)
    expect(byWord.get('Tart')).toBe(30000)
    expect(byWord.get('run the gauntlet')).toBeNull()
    expect(deck).toHaveLength(3)
  })

  it('every rank is null when the frequency pack is not installed', () => {
    saveWord({ word: 'ubiquitous', meaning: 'Present everywhere.' })
    expect(deckOverview().map((w) => w.rank)).toEqual([null])
  })

  it('handles a deck larger than one IN() chunk', () => {
    const words: [string, number][] = []
    for (let i = 0; i < 1200; i++) words.push([`w${i}`, i + 1])
    seedFreq(words)
    db.transaction(() => {
      for (let i = 0; i < 1200; i++) saveWord({ word: `w${i}`, meaning: `m${i}` })
    })()
    const deck = deckOverview()
    expect(deck).toHaveLength(1200)
    expect(deck.every((w) => w.rank != null)).toBe(true)
  })
})
