import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createDictTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/dict/dictDb', () => ({
  getDictDb: () => db,
  closeDictDb: () => {}
}))
vi.mock('../src/main/files', () => ({ jpAudioDir: () => '/tmp/test-jpaudio' }))

import {
  getAudioBankInfo,
  importAudioData,
  parseAudioListTsv,
  parseJpnSentencesTsv,
  planClips,
  removeAudioBank,
  sampleAudioSentences,
  type AudioImportDeps,
  type PlannedClip
} from '../src/main/dict/tatoebaAudio'

beforeEach(() => {
  db = createDictTestDb()
})

// Lines shaped exactly like the live export (verified 2026-08-01).
const LIST = [
  '4704\t1682\tyomi\tCC BY-NC 4.0\t',
  '4739\t750950\tlowteq\t\t', // EMPTY license -> must be skipped
  '4751\t1685\tyomi\tCC BY-NC 4.0\thttps://example.com/yomi',
  'garbage line',
  '4751\t1685\tyomi\tCC BY-NC 4.0\t' // duplicate audio id -> deduped in planning
].join('\n')

const SENTENCES = ['4704\tjpn\t何かしてみましょう。', '4751\tjpn\t私は眠らなければなりません。', '9999\tjpn\t関係ない文。'].join(
  '\n'
)

describe('parseAudioListTsv', () => {
  it('parses rows and skips unlicensed clips', () => {
    const { rows, skippedUnlicensed } = parseAudioListTsv(LIST)
    expect(rows).toHaveLength(3) // dup still present at parse stage
    expect(skippedUnlicensed).toBe(1)
    expect(rows[0]).toMatchObject({ sentenceId: 4704, audioId: 1682, license: 'CC BY-NC 4.0' })
    expect(rows[1].attribution).toBe('https://example.com/yomi')
  })

  it('throws when nothing usable parses (format drift)', () => {
    expect(() => parseAudioListTsv('junk\nmore junk')).toThrow(/format may have drifted/)
  })
})

describe('parseJpnSentencesTsv / planClips', () => {
  it('keeps only wanted ids and joins by exact text against the installed bank', () => {
    const { rows } = parseAudioListTsv(LIST)
    const idToText = parseJpnSentencesTsv(SENTENCES, new Set(rows.map((r) => r.sentenceId)))
    expect(idToText.size).toBe(2) // 9999 not wanted

    const installed = new Set(['何かしてみましょう。']) // only one matches the bank
    const { clips, skippedUnmatched } = planClips(rows, idToText, installed)
    expect(clips).toHaveLength(1)
    expect(clips[0]).toMatchObject({ audioId: 1682, jp: '何かしてみましょう。' })
    expect(clips[0].attribution).toBe('yomi')
    expect(skippedUnmatched).toBe(1) // 1685's text isn't installed (dedup ate the double)
  })
})

// ---- import with injected IO ----

const CLIP = (id: number, jp: string): PlannedClip => ({
  audioId: id,
  tatoebaId: id * 10,
  jp,
  license: 'CC BY 4.0',
  attribution: 'someone'
})

function seedSentenceBank(rows: { jp: string; en: string }[]): void {
  db.prepare('INSERT INTO sentence_bank (id, source, sentence_count) VALUES (1, ?, ?)').run(
    'tatoeba',
    rows.length
  )
  const ins = db.prepare('INSERT INTO sentence (bank_id, jp, en) VALUES (1, ?, ?)')
  for (const r of rows) ins.run(r.jp, r.en)
}

function deps(overrides: Partial<AudioImportDeps> = {}): AudioImportDeps & {
  fetched: number[]
  written: string[]
} {
  const fetched: number[] = []
  const written: string[] = []
  return {
    fetched,
    written,
    fetchClip: async (id) => {
      fetched.push(id)
      return Buffer.from(`audio-${id}`)
    },
    fileExists: () => false,
    writeClip: (rel) => {
      written.push(rel)
    },
    throttle: async () => {},
    ...overrides
  }
}

describe('importAudioData', () => {
  it('downloads, writes and stages rows, registry last', async () => {
    const d = deps()
    const summary = await importAudioData([CLIP(1, 'あ'), CLIP(2, 'い')], 3, 4, d)
    expect(summary).toMatchObject({ clipCount: 2, skippedUnlicensed: 3, skippedUnmatched: 4, failed: 0 })
    expect(d.written).toEqual(['tatoeba/1.mp3', 'tatoeba/2.mp3'])
    expect(getAudioBankInfo()!.clipCount).toBe(2)
    const row = db.prepare('SELECT path FROM sentence_audio WHERE audio_id = 1').get() as {
      path: string
    }
    expect(row.path).toBe('jpaudio/tatoeba/1.mp3')
  })

  it('resume: files already on disk are neither fetched nor throttled but still get rows', async () => {
    const d = deps({ fileExists: (rel) => rel === 'tatoeba/1.mp3' })
    const summary = await importAudioData([CLIP(1, 'あ'), CLIP(2, 'い')], 0, 0, d)
    expect(d.fetched).toEqual([2])
    expect(summary.clipCount).toBe(2)
  })

  it('counts per-clip failures but keeps going', async () => {
    const d = deps({
      fetchClip: async (id) => (id === 1 ? null : Buffer.from('x'))
    })
    const summary = await importAudioData([CLIP(1, 'あ'), CLIP(2, 'い')], 0, 0, d)
    expect(summary.failed).toBe(1)
    expect(summary.clipCount).toBe(1)
  })

  it('aborts after consecutive failures without writing a registry row', async () => {
    const clips = Array.from({ length: 25 }, (_, i) => CLIP(i + 1, `s${i}`))
    const d = deps({ fetchClip: async () => null })
    await expect(importAudioData(clips, 0, 0, d)).rejects.toThrow(/consecutive download failures/)
    expect(getAudioBankInfo()).toBeNull()
    expect(
      (db.prepare('SELECT COUNT(*) AS n FROM sentence_audio').get() as { n: number }).n
    ).toBe(0)
  })

  it('throws on an empty plan', async () => {
    await expect(importAudioData([], 0, 0, deps())).rejects.toThrow(/No clips match/)
  })

  it('re-import replaces; remove clears', async () => {
    await importAudioData([CLIP(1, 'あ')], 0, 0, deps())
    await importAudioData([CLIP(2, 'い')], 0, 0, deps())
    expect(getAudioBankInfo()!.clipCount).toBe(1)
    expect(
      (db.prepare('SELECT COUNT(*) AS n FROM sentence_audio').get() as { n: number }).n
    ).toBe(1)
    removeAudioBank()
    expect(getAudioBankInfo()).toBeNull()
  })
})

describe('sampleAudioSentences', () => {
  it('joins EN from the sentence bank by exact text and respects maxChars', async () => {
    seedSentenceBank([
      { jp: '何かしてみましょう。', en: "Let's try something." },
      { jp: 'これはとてもとてもとてもとてもとてもとてもとてもとても長い文です。', en: 'Long.' }
    ])
    await importAudioData(
      [CLIP(1, '何かしてみましょう。'), CLIP(2, 'これはとてもとてもとてもとてもとてもとてもとてもとても長い文です。'), CLIP(3, '銀行に無い文。')],
      0,
      0,
      deps()
    )
    const sample = sampleAudioSentences({ limit: 10, maxChars: 20 })
    expect(sample).toHaveLength(1)
    expect(sample[0]).toMatchObject({
      jp: '何かしてみましょう。',
      en: "Let's try something.",
      audioPath: 'jpaudio/tatoeba/1.mp3'
    })
    expect(sample[0].attribution).toContain('someone')
  })
})
