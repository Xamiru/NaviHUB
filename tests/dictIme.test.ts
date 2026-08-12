import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createDictTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/dict/dictDb', () => ({
  getDictDb: () => db,
  closeDictDb: () => {}
}))

import { readingCandidates } from '../src/main/dict/imeCandidates'

function seedDict(title: string, priority: number): number {
  const r = db
    .prepare(
      `INSERT INTO dict (title, revision, format, priority, term_count)
       VALUES (?, 'r1', 3, ?, 0)`
    )
    .run(title, priority)
  return Number(r.lastInsertRowid)
}

function seedTerm(
  dictId: number,
  expression: string,
  reading: string,
  opts: { score?: number; termTags?: string; gloss?: string } = {}
): void {
  db.prepare(
    `INSERT INTO term (dict_id, expression, reading, score, glossary, term_tags)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run(
    dictId,
    expression,
    reading,
    opts.score ?? 0,
    JSON.stringify([opts.gloss ?? 'meaning']),
    opts.termTags ?? null
  )
}

function seedFreq(dictId: number, expression: string, rank: number): void {
  db.prepare(`INSERT INTO freq (dict_id, expression, reading, rank) VALUES (?, ?, '', ?)`).run(
    dictId,
    expression,
    rank
  )
}

describe('readingCandidates', () => {
  let jmdict: number
  let freqDict: number

  beforeEach(() => {
    db = createDictTestDb()
    jmdict = seedDict('JMdict', 0)
    freqDict = seedDict('Freq', 0)
  })

  it('returns exact reading matches ordered by frequency rank', () => {
    seedTerm(jmdict, '京', 'きょう', { gloss: 'capital' })
    seedTerm(jmdict, '今日', 'きょう', { gloss: 'today' })
    seedFreq(freqDict, '今日', 100)
    seedFreq(freqDict, '京', 4000)
    const out = readingCandidates('きょう')
    expect(out.map((c) => c.text)).toEqual(['今日', '京'])
    expect(out[0]).toMatchObject({ reading: 'きょう', gloss: 'today', kind: 'exact' })
  })

  it('matches katakana readings from a hiragana buffer', () => {
    // 珈琲 carries a katakana reading — the buffer is always hiragana.
    seedTerm(jmdict, '珈琲', 'コーヒー', { gloss: 'coffee' })
    // The pure-katakana spelling is the renderer's script chip — never repeated here.
    seedTerm(jmdict, 'コーヒー', 'コーヒー', { gloss: 'coffee' })
    const out = readingCandidates('こーひー')
    expect(out.map((c) => c.text)).toEqual(['珈琲'])
    expect(out[0].reading).toBe('こーひー')
  })

  it("matches reading='' kana-only expressions but skips the script forms themselves", () => {
    seedTerm(jmdict, 'する', '', { gloss: 'to do' })
    seedTerm(jmdict, '為る', 'する', { gloss: 'to do' })
    const out = readingCandidates('する')
    // する = the hiragana chip the renderer already shows; 為る is a real candidate
    expect(out.map((c) => c.text)).toEqual(['為る'])
  })

  it('excludes negative-priority dictionaries (JMnedict)', () => {
    const names = seedDict('JMnedict Names', -10)
    seedTerm(names, '恭', 'きょう', { gloss: 'given name' })
    seedTerm(jmdict, '今日', 'きょう', { gloss: 'today' })
    const out = readingCandidates('きょう')
    expect(out.map((c) => c.text)).toEqual(['今日'])
  })

  it('common-tagged terms beat untagged ones when neither has a rank', () => {
    seedTerm(jmdict, '兇', 'きょう', { gloss: 'villain' })
    seedTerm(jmdict, '今日', 'きょう', { gloss: 'today', termTags: 'P news1' })
    const out = readingCandidates('きょう')
    expect(out[0].text).toBe('今日')
  })

  it('appends freq-gated prefix predictions after exacts', () => {
    seedTerm(jmdict, '今日', 'きょう', { gloss: 'today' })
    seedTerm(jmdict, '教室', 'きょうしつ', { gloss: 'classroom' })
    seedTerm(jmdict, '恐竜', 'きょうりゅう', { gloss: 'dinosaur' })
    seedTerm(jmdict, 'matsu-nashi', 'きょうがい', { gloss: 'no freq row — gated out' })
    seedFreq(freqDict, '今日', 100)
    seedFreq(freqDict, '教室', 900)
    seedFreq(freqDict, '恐竜', 5000)
    const out = readingCandidates('きょう')
    expect(out.map((c) => c.text)).toEqual(['今日', '教室', '恐竜'])
    expect(out[1].kind).toBe('prediction')
    expect(out.map((c) => c.text)).not.toContain('matsu-nashi')
  })

  it('never predicts from a single kana', () => {
    seedTerm(jmdict, '教室', 'きょうしつ', { gloss: 'classroom' })
    seedFreq(freqDict, '教室', 900)
    expect(readingCandidates('き')).toEqual([])
  })

  it('caps the total and dedupes expressions across dictionaries', () => {
    const second = seedDict('JMdict fork', 1)
    seedTerm(jmdict, '今日', 'きょう', { gloss: 'today' })
    seedTerm(second, '今日', 'きょう', { gloss: 'today (fork)' })
    for (let i = 0; i < 20; i++) {
      seedTerm(jmdict, `教${i}`, `きょう${i}`, { gloss: `word ${i}` })
      seedFreq(freqDict, `教${i}`, 100 + i)
    }
    const out = readingCandidates('きょう')
    expect(out.length).toBeLessThanOrEqual(16)
    expect(out.filter((c) => c.text === '今日')).toHaveLength(1)
    // the higher-priority dictionary's row won the dedupe
    expect(out.find((c) => c.text === '今日')?.gloss).toBe('today (fork)')
  })

  it('returns [] on blank input and on an empty database', () => {
    expect(readingCandidates('')).toEqual([])
    expect(readingCandidates('  ')).toEqual([])
    expect(readingCandidates('きょう')).toEqual([])
  })
})
