import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createDictTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/dict/dictDb', () => ({
  getDictDb: () => db,
  closeDictDb: () => {}
}))

import {
  KANJIUM_TITLE,
  importKanjiumText,
  parseAccentLines,
  pitchForWords
} from '../src/main/dict/kanjium'
import { loadPitches, matchPitches } from '../src/main/dict/lookup'
import { listDictionaries, removeDictionary } from '../src/main/dict/importer'

beforeEach(() => {
  db = createDictTestDb()
})

// Lines copied verbatim from the real accents.txt (2026-08, pinned sha).
const SAMPLE = [
  '人\tひと\t0,2',
  '会う\tあう\t1',
  '２つ\tふたつ\t(副)0,(名)3',
  'お手前\tおてまえ\t(名)2,(代)2,0',
  'かさかさ\t\t(副)1,(形動)0',
  'コーヒー\tコーヒー\t3',
  'malformed line without tabs',
  '空欄\t\t', // no accents -> skipped
  '\t\t1' // no term -> skipped
].join('\n')

describe('parseAccentLines', () => {
  it('parses plain and multi-variant rows', () => {
    const rows = parseAccentLines(SAMPLE)
    const hito = rows.find((r) => r.expression === '人')!
    expect(hito.reading).toBe('ひと')
    expect(hito.positions).toEqual([0, 2])
    expect(rows.find((r) => r.expression === '会う')!.positions).toEqual([1])
  })

  it('strips POS annotations and dedupes positions', () => {
    const rows = parseAccentLines(SAMPLE)
    expect(rows.find((r) => r.expression === '２つ')!.positions).toEqual([0, 3])
    // (名)2,(代)2,0 -> [2, 0], deduped
    expect(rows.find((r) => r.expression === 'お手前')!.positions).toEqual([2, 0])
  })

  it('normalizes empty and self-equal readings to the pitch-table convention', () => {
    const rows = parseAccentLines(SAMPLE)
    expect(rows.find((r) => r.expression === 'かさかさ')!.reading).toBe('')
    expect(rows.find((r) => r.expression === 'コーヒー')!.reading).toBe('')
  })

  it('skips malformed lines', () => {
    const rows = parseAccentLines(SAMPLE)
    expect(rows.map((r) => r.expression)).not.toContain('malformed line without tabs')
    expect(rows.map((r) => r.expression)).not.toContain('空欄')
    expect(rows).toHaveLength(6)
  })
})

describe('importKanjiumText', () => {
  it('imports rows and writes the registry row last with pitch counts', async () => {
    const summary = await importKanjiumText(SAMPLE)
    expect(summary.pitchCount).toBe(6)
    const dicts = listDictionaries()
    const row = dicts.find((d) => d.title === KANJIUM_TITLE)!
    expect(row.pitchCount).toBe(6)
    expect(row.termCount).toBe(0)
    expect(row.revision).toBe('8a0cdaa')
  })

  it('throws on an empty file without touching the registry', async () => {
    await expect(importKanjiumText('')).rejects.toThrow(/No pitch-accent rows/)
    expect(listDictionaries()).toHaveLength(0)
  })

  it('re-import replaces the previous rows and keeps the priority', async () => {
    await importKanjiumText(SAMPLE)
    db.prepare('UPDATE dict SET priority = 7 WHERE title = ?').run(KANJIUM_TITLE)
    await importKanjiumText('人\tひと\t0')
    const dicts = listDictionaries().filter((d) => d.title === KANJIUM_TITLE)
    expect(dicts).toHaveLength(1)
    expect(dicts[0].pitchCount).toBe(1)
    expect(dicts[0].priority).toBe(7)
    expect((db.prepare('SELECT COUNT(*) AS n FROM pitch').get() as { n: number }).n).toBe(1)
  })

  it('removal via the shared removeDictionary path clears the pitch rows', async () => {
    await importKanjiumText(SAMPLE)
    const row = listDictionaries().find((d) => d.title === KANJIUM_TITLE)!
    await removeDictionary(row.id)
    expect((db.prepare('SELECT COUNT(*) AS n FROM pitch').get() as { n: number }).n).toBe(0)
    expect(listDictionaries()).toHaveLength(0)
  })

  it('feeds the existing lookup pitch pipeline (loadPitches/matchPitches)', async () => {
    await importKanjiumText(SAMPLE)
    const map = loadPitches(db, ['人'])
    const matched = matchPitches(map.get('人') ?? [], 'ひと', '人')
    expect(matched.map((p) => p.position).sort()).toEqual([0, 2])
    expect(matched[0].reading).toBe('ひと')
  })
})

describe('pitchForWords', () => {
  it('aggregates positions per (expression, reading) and dedupes', async () => {
    await importKanjiumText(SAMPLE)
    const entries = pitchForWords(['人', '会う', '会う', 'そんな単語ない'])
    expect(entries).toHaveLength(2)
    expect(entries.find((e) => e.expression === '人')!.positions).toEqual([0, 2])
  })

  it('batches inputs beyond the 500-word chunk', async () => {
    await importKanjiumText(SAMPLE)
    const words = Array.from({ length: 600 }, (_, i) => `w${i}`)
    words.push('会う')
    const entries = pitchForWords(words)
    expect(entries.map((e) => e.expression)).toContain('会う')
  })

  it('returns [] for empty input', () => {
    expect(pitchForWords([])).toEqual([])
  })
})
