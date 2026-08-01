import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createDictTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/dict/dictDb', () => ({
  getDictDb: () => db,
  closeDictDb: () => {}
}))

import { nameSample, namesInstalled } from '../src/main/dict/names'
import { importFromReader } from '../src/main/dict/importer'

beforeEach(async () => {
  db = createDictTestDb()
  await importFromReader(
    {
      readIndex: async () => ({ title: 'JMnedict (English)', revision: 'r', format: 3 }),
      bankNames: () => ['term_bank_1.json'],
      readBank: async () => [
        ['中田', 'なかた', 'surname', '', 0, ['Nakata'], 1, ''],
        ['中田', 'なかだ', 'surname', '', 0, ['Nakada'], 1, ''],
        ['花子', 'はなこ', 'fem given', '', 0, ['Hanako'], 2, ''],
        ['太郎', 'たろう', 'masc', '', 0, ['Tarou'], 3, ''],
        ['トヨタ', 'とよた', 'company', '', 0, ['Toyota'], 4, ''],
        // Kana-only "name" — nothing to quiz, must be skipped.
        ['さくら', 'さくら', 'fem', '', 0, ['Sakura'], 5, '']
      ],
      readRaw: async () => Buffer.alloc(0)
    },
    { glossFts: false, defaultPriority: -10 }
  )
})

describe('nameSample', () => {
  it('aggregates every reading per expression', () => {
    const items = nameSample({ kind: 'surname', limit: 10 })
    expect(items).toHaveLength(1)
    expect(items[0].expression).toBe('中田')
    expect(items[0].readings.sort()).toEqual(['なかた', 'なかだ'])
    expect(items[0].kind).toBe('surname')
  })

  it('given names cover fem/masc/given tags and skip kana-only entries', () => {
    const items = nameSample({ kind: 'given', limit: 10 })
    expect(items.map((i) => i.expression).sort()).toEqual(['太郎', '花子'])
  })

  it('both mixes kinds and excludes non-person tags', () => {
    const items = nameSample({ kind: 'both', limit: 10 })
    const exprs = items.map((i) => i.expression)
    expect(exprs).toContain('中田')
    expect(exprs).not.toContain('トヨタ')
  })

  it('returns [] when JMnedict is not installed', () => {
    db = createDictTestDb()
    expect(namesInstalled()).toBe(false)
    expect(nameSample({ kind: 'both', limit: 5 })).toEqual([])
  })
})
