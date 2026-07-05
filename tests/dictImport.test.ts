import { mkdtempSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import os from 'node:os'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import AdmZip from 'adm-zip'
import type Database from 'better-sqlite3'
import { createDictTestDb } from './helpers'
import type { BankReader, YomitanIndex } from '../src/main/dict/importer'

let db: Database.Database
vi.mock('../src/main/dict/dictDb', () => ({
  getDictDb: () => db,
  closeDictDb: () => {}
}))

import {
  importFromReader,
  listDictionaries,
  openZipReader,
  removeDictionary
} from '../src/main/dict/importer'

beforeEach(() => {
  db = createDictTestDb()
})

function makeReader(index: YomitanIndex, banks: Record<string, unknown[]>): BankReader {
  return {
    readIndex: async () => index,
    bankNames: () => Object.keys(banks),
    readBank: async (name) => banks[name]
  }
}

const INDEX: YomitanIndex = { title: 'Test JMdict', revision: 'rev1', format: 3 }

function countTerms(): number {
  return (db.prepare('SELECT COUNT(*) AS n FROM term').get() as { n: number }).n
}

describe('importFromReader', () => {
  it('imports term / kanji / pitch / tag rows and populates the gloss FTS', async () => {
    const summary = await importFromReader(
      makeReader(INDEX, {
        'term_bank_1.json': [
          ['食べる', 'たべる', 'v1 vt', 'v1', 100, ['to eat'], 1, 'ichi1'],
          ['猫', 'ねこ', 'n', '', 90, ['cat'], 2, 'ichi1 news1']
        ],
        'kanji_bank_1.json': [['猫', 'ビョウ', 'ねこ', 'jouyou', ['cat'], { strokes: '11', grade: '8' }]],
        'term_meta_bank_1.json': [
          ['猫', 'pitch', { reading: 'ねこ', pitches: [{ position: 1 }] }],
          ['猫', 'freq', { value: 1234 }] // must be skipped
        ],
        'tag_bank_1.json': [['v1', 'partOfSpeech', 0, 'ichidan verb', 0]]
      })
    )

    expect(summary).toEqual({ title: 'Test JMdict', termCount: 2, kanjiCount: 1, pitchCount: 1 })
    expect(countTerms()).toBe(2)
    expect((db.prepare('SELECT COUNT(*) AS n FROM pitch').get() as { n: number }).n).toBe(1)
    expect((db.prepare('SELECT COUNT(*) AS n FROM kanji').get() as { n: number }).n).toBe(1)

    // FTS holds the flattened gloss so English search can find it.
    const fts = db
      .prepare(`SELECT term_id FROM gloss_fts WHERE gloss_fts MATCH 'eat'`)
      .all() as { term_id: number }[]
    expect(fts.length).toBe(1)

    const dicts = listDictionaries()
    expect(dicts).toHaveLength(1)
    expect(dicts[0]).toMatchObject({ title: 'Test JMdict', termCount: 2, kanjiCount: 1 })
  })

  it('normalizes a legacy format-1 glossary (strings spread from index 5)', async () => {
    await importFromReader(
      makeReader(
        { title: 'Legacy', format: 1 },
        { 'term_bank_1.json': [['行く', 'いく', 'v5', 'v5', 0, 'to go', 'to proceed']] }
      )
    )
    const row = db.prepare('SELECT glossary FROM term WHERE expression = ?').get('行く') as {
      glossary: string
    }
    expect(JSON.parse(row.glossary)).toEqual(['to go', 'to proceed'])
  })

  it('re-importing the same title replaces its rows and keeps the priority', async () => {
    await importFromReader(makeReader(INDEX, { 'term_bank_1.json': [['A', 'A', '', '', 0, ['old'], 1, '']] }))
    // User bumps the priority.
    db.prepare('UPDATE dict SET priority = 7 WHERE title = ?').run('Test JMdict')

    await importFromReader(
      makeReader(INDEX, {
        'term_bank_1.json': [
          ['B', 'B', '', '', 0, ['new one'], 1, ''],
          ['C', 'C', '', '', 0, ['new two'], 2, '']
        ]
      })
    )

    const dicts = listDictionaries()
    expect(dicts).toHaveLength(1)
    expect(dicts[0].priority).toBe(7) // inherited
    expect(dicts[0].termCount).toBe(2)
    // Old row gone, no dangling gloss_fts rows.
    expect(db.prepare('SELECT COUNT(*) AS n FROM term').get()).toEqual({ n: 2 })
    const orphanFts = db
      .prepare('SELECT COUNT(*) AS n FROM gloss_fts WHERE dict_id NOT IN (SELECT id FROM dict)')
      .get() as { n: number }
    expect(orphanFts.n).toBe(0)
  })

  it('a failure mid-import leaves the existing dictionary intact', async () => {
    await importFromReader(makeReader(INDEX, { 'term_bank_1.json': [['keep', 'keep', '', '', 0, ['stay'], 1, '']] }))

    const boom: BankReader = {
      readIndex: async () => INDEX,
      bankNames: () => ['term_bank_1.json'],
      readBank: async () => {
        throw new Error('corrupt bank')
      }
    }
    await expect(importFromReader(boom)).rejects.toThrow('corrupt bank')

    // The original import survives; no staged orphan rows remain.
    expect(listDictionaries()).toHaveLength(1)
    expect(db.prepare('SELECT expression FROM term').all()).toEqual([{ expression: 'keep' }])
    const orphans = db
      .prepare('SELECT COUNT(*) AS n FROM term WHERE dict_id NOT IN (SELECT id FROM dict)')
      .get() as { n: number }
    expect(orphans.n).toBe(0)
  })

  it('removeDictionary deletes a dictionary and all its rows', async () => {
    await importFromReader(
      makeReader(INDEX, {
        'term_bank_1.json': [['x', 'x', '', '', 0, ['y'], 1, '']],
        'kanji_bank_1.json': [['猫', '', 'ねこ', '', ['cat'], {}]]
      })
    )
    const id = listDictionaries()[0].id
    await removeDictionary(id)
    expect(listDictionaries()).toHaveLength(0)
    expect(countTerms()).toBe(0)
    expect((db.prepare('SELECT COUNT(*) AS n FROM kanji').get() as { n: number }).n).toBe(0)
  })
})

describe('openZipReader (yauzl end-to-end)', () => {
  let root: string
  beforeEach(() => {
    root = mkdtempSync(join(os.tmpdir(), 'navihub-dict-'))
  })
  afterEach(() => {
    rmSync(root, { recursive: true, force: true })
  })

  it('reads a real Yomitan zip and imports it', async () => {
    const zip = new AdmZip()
    zip.addFile('index.json', Buffer.from(JSON.stringify({ title: 'Zipped', format: 3 })))
    zip.addFile(
      'term_bank_1.json',
      Buffer.from(JSON.stringify([['水', 'みず', 'n', '', 0, ['water'], 1, '']]))
    )
    const zipPath = join(root, 'dict.zip')
    zip.writeZip(zipPath)

    const reader = await openZipReader(zipPath)
    try {
      const summary = await importFromReader(reader)
      expect(summary.title).toBe('Zipped')
      expect(summary.termCount).toBe(1)
    } finally {
      reader.close()
    }
    expect(db.prepare('SELECT expression FROM term').all()).toEqual([{ expression: '水' }])
  })
})
