import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createDictTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/dict/dictDb', () => ({
  getDictDb: () => db,
  closeDictDb: () => {}
}))
// The import path only touches these for the network half, which this test
// bypasses by driving importEnFreqText directly (the importWordNetText idiom).
vi.mock('electron', () => ({ app: { getPath: () => '/tmp' } }))

import {
  getEnFreqInfo,
  hasEnFreq,
  importEnFreqText,
  parseFreqLines,
  removeEnFreq
} from '../src/main/dict/enFreq'

beforeEach(() => {
  db = createDictTestDb()
})

describe('parseFreqLines', () => {
  it('keeps plain word tokens, lowercased, ranked in file order after filtering', () => {
    const rows = parseFreqLines(
      ['you 100', 'The 90', '123 80', "'s 70", 'ok. 60', 'well-known 50', "goin' 40", 'zeal 30'].join(
        '\n'
      )
    )
    expect(rows).toEqual([
      { word: 'you', rank: 1 },
      { word: 'the', rank: 2 },
      { word: 'well-known', rank: 3 },
      { word: 'zeal', rank: 4 }
    ])
  })

  it('dedupes keep-first (case-folded duplicates share one rank)', () => {
    const rows = parseFreqLines('Word 10\nword 9\nother 8')
    expect(rows).toEqual([
      { word: 'word', rank: 1 },
      { word: 'other', rank: 2 }
    ])
  })
})

describe('importEnFreqText', () => {
  it('imports rows and writes the registry row last, with counts', async () => {
    const info = await importEnFreqText('alpha 3\nbeta 2\ngamma 1')
    expect(info.source).toBe('opensubtitles')
    expect(info.wordCount).toBe(3)
    expect(hasEnFreq()).toBe(true)
    const ranks = db
      .prepare('SELECT word, rank FROM en_freq ORDER BY rank')
      .all() as { word: string; rank: number }[]
    expect(ranks).toEqual([
      { word: 'alpha', rank: 1 },
      { word: 'beta', rank: 2 },
      { word: 'gamma', rank: 3 }
    ])
  })

  it('re-import replaces the previous bank without orphans', async () => {
    await importEnFreqText('alpha 3\nbeta 2')
    await importEnFreqText('delta 5')
    expect((getEnFreqInfo() ?? { wordCount: 0 }).wordCount).toBe(1)
    const all = db.prepare('SELECT word FROM en_freq').all() as { word: string }[]
    expect(all.map((r) => r.word)).toEqual(['delta'])
    expect((db.prepare('SELECT COUNT(*) AS n FROM en_freq_set').get() as { n: number }).n).toBe(1)
  })

  it('throws on an empty file and leaves nothing behind', async () => {
    await expect(importEnFreqText('123 9\n!!! 8')).rejects.toThrow(/No frequency rows/)
    expect(hasEnFreq()).toBe(false)
    expect((db.prepare('SELECT COUNT(*) AS n FROM en_freq').get() as { n: number }).n).toBe(0)
  })

  it('removeEnFreq clears both tables', async () => {
    await importEnFreqText('alpha 3\nbeta 2')
    removeEnFreq()
    expect(hasEnFreq()).toBe(false)
    expect((db.prepare('SELECT COUNT(*) AS n FROM en_freq').get() as { n: number }).n).toBe(0)
  })
})
