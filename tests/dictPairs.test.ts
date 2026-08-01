import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createDictTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/dict/dictDb', () => ({
  getDictDb: () => db,
  closeDictDb: () => {}
}))
// files.ts pulls in electron; the import seam only needs jpAudioDir for the
// zip-level wrapper, which these tests never touch.
vi.mock('../src/main/files', () => ({ jpAudioDir: () => '/tmp/test-jpaudio' }))

import {
  getPairSetInfo,
  importPairsData,
  listMinimalPairs,
  parsePairFile,
  parsePairsIndexJs,
  removePairSet,
  sniffAudioExt
} from '../src/main/dict/minimalPairs'

beforeEach(() => {
  db = createDictTestDb()
})

// Real magic bytes: ADTS AAC (what the pack actually ships), MP3, Ogg.
const AAC = Buffer.from([0xff, 0xf9, 0x58, 0x60, 0x02, 0xe0])
const MP3 = Buffer.from([0xff, 0xfb, 0x90, 0x00])
const OGG = Buffer.from('OggS\0\0\0\0')

const pairJson = (kana: string, positions: number[]): unknown => ({
  kana,
  pairs: positions.map((p) => ({
    accentedMora: p,
    moraCount: 3,
    pitchAccent: p,
    rawPronunciation: kana.toUpperCase(),
    silencedMoras: [],
    soundData: AAC.toString('base64')
  }))
})

describe('parsePairsIndexJs', () => {
  it('parses the export-const-prefixed JSON (real format)', () => {
    const idx = parsePairsIndexJs('export const pairs_index = {"pitch0": ["0", "1a"], "devoiced": ["1a"]}')
    expect(idx.pitch0).toEqual(['0', '1a'])
    expect(idx.devoiced).toEqual(['1a'])
  })

  it('throws helpfully on drift', () => {
    expect(() => parsePairsIndexJs('nothing here')).toThrow(/format drifted/)
    expect(() => parsePairsIndexJs('export const x = {broken}')).toThrow(/not valid JSON/)
    expect(() => parsePairsIndexJs('export const x = {"a": "not-an-array"}')).toThrow(/no buckets/)
  })
})

describe('sniffAudioExt / parsePairFile', () => {
  it('sniffs containers from magic bytes, never from names', () => {
    expect(sniffAudioExt(AAC)).toBe('.aac')
    expect(sniffAudioExt(MP3)).toBe('.mp3')
    expect(sniffAudioExt(OGG)).toBe('.ogg')
    expect(sniffAudioExt(Buffer.from('ID3\x04junk'))).toBe('.mp3')
    expect(sniffAudioExt(Buffer.from([1, 2, 3]))).toBe('.mp3')
  })

  it('parses the verified data-file shape and decodes base64', () => {
    const parsed = parsePairFile(pairJson('とっか', [1, 0]))!
    expect(parsed.kana).toBe('とっか')
    expect(parsed.clips).toHaveLength(2)
    expect(parsed.clips[0].position).toBe(1)
    expect(parsed.clips[0].bytes.equals(AAC)).toBe(true)
    expect(parsed.clips[0].ext).toBe('.aac')
  })

  it('rejects malformed or single-recording files', () => {
    expect(parsePairFile(null)).toBeNull()
    expect(parsePairFile({ kana: 'x' })).toBeNull()
    expect(parsePairFile(pairJson('とっか', [1]))).toBeNull() // needs >= 2
  })
})

describe('importPairsData', () => {
  const buckets = new Map<string, string[]>([
    ['0', ['pitch0', 'pitch1']],
    ['1a', ['pitch1']],
    ['broken', ['pitch2']]
  ])
  const files: Record<string, unknown> = {
    '0': pairJson('とっか', [1, 0]),
    '1a': pairJson('はし', [1, 2]),
    broken: { nope: true }
  }

  it('imports pairs, writes clips, registry last; broken files are skipped', async () => {
    const written: string[] = []
    const summary = await importPairsData(
      buckets,
      async (id) => files[id] ?? null,
      (rel) => written.push(rel)
    )
    expect(summary.pairCount).toBe(2)
    expect(summary.clipCount).toBe(4)
    expect(written).toContain('pairs/0/0.aac')
    expect(getPairSetInfo()!.pairCount).toBe(2)

    const rows = listMinimalPairs()
    expect(rows).toHaveLength(2)
    const first = rows.find((r) => r.pairId === '0')!
    expect(first.buckets).toEqual(['pitch0', 'pitch1'])
    expect(first.items[0].audioPath).toBe('jpaudio/pairs/0/0.aac')
  })

  it('throws when nothing usable parses, leaving no registry row', async () => {
    await expect(
      importPairsData(new Map([['broken', ['pitch0']]]), async () => ({ nope: 1 }), () => {})
    ).rejects.toThrow(/No usable pairs/)
    expect(getPairSetInfo()).toBeNull()
    expect(
      (db.prepare('SELECT COUNT(*) AS n FROM minimal_pair').get() as { n: number }).n
    ).toBe(0)
  })

  it('re-import replaces; remove clears rows', async () => {
    await importPairsData(buckets, async (id) => files[id] ?? null, () => {})
    await importPairsData(
      new Map([['1a', ['pitch1']]]),
      async (id) => files[id] ?? null,
      () => {}
    )
    expect(getPairSetInfo()!.pairCount).toBe(1)
    expect(listMinimalPairs()).toHaveLength(1)
    removePairSet()
    expect(getPairSetInfo()).toBeNull()
    expect(listMinimalPairs()).toEqual([])
  })
})
