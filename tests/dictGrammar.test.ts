import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createDictTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/dict/dictDb', () => ({
  getDictDb: () => db,
  closeDictDb: () => {}
}))

import {
  getGrammarBankInfo,
  getGrammarPoint,
  importGrammarData,
  listGrammar,
  parseGrammarEntries,
  randomGrammar,
  removeGrammarBank
} from '../src/main/dict/grammar'

beforeEach(() => {
  db = createDictTestDb()
})

// Shaped like the real hanabira files (verified live 2026-08).
const N5_RAW = [
  {
    title: '～てしまう (te shimau)',
    short_explanation: "Completion or regret; 'end up doing'.",
    long_explanation: 'Expresses completion of an action, often with regret.',
    formation: 'Verb-て form + しまう',
    examples: [
      {
        jp: '全部食べてしまうよ。',
        romaji: 'Zenbu tabete shimau yo.',
        en: "I'll end up eating everything.",
        grammar_audio: '/audio/x.mp3'
      },
      { jp: '宿題を忘れてしまった。', romaji: 'x', en: 'I forgot my homework.' }
    ],
    p_tag: 'JLPT_N5',
    s_tag: '12'
  },
  {
    title: 'Topics with は',
    short_explanation: 'Marks the topic.',
    long_explanation: null,
    formation: 'Noun + は',
    examples: [{ jp: '猫はかわいい。', romaji: 'x', en: 'Cats are cute.' }]
  },
  { title: '', short_explanation: 'junk — skipped' },
  { title: 'no meaning — skipped' }
]
const N3_RAW = [
  {
    title: '～ながら (nagara)',
    short_explanation: 'While doing.',
    formation: 'Verb-stem + ながら',
    examples: [{ jp: '歩きながら話す。', romaji: 'x', en: 'Talk while walking.' }],
    s_tag: '3'
  }
]

describe('parseGrammarEntries', () => {
  it('parses entries, tolerating missing fields and skipping junk', () => {
    const parsed = parseGrammarEntries('N5', N5_RAW)
    expect(parsed).toHaveLength(2)
    expect(parsed[0].sort).toBe(12)
    expect(parsed[0].examples).toHaveLength(2)
  })

  it('pre-computes cloze fields where the point appears verbatim', () => {
    const parsed = parseGrammarEntries('N5', N5_RAW)
    const [shimau] = parsed
    // First example contains てしまう verbatim → clozeable.
    expect(shimau.examples[0].clozeJp).toBe('全部食べ＿＿よ。')
    expect(shimau.examples[0].clozeAnswer).toBe('てしまう')
    // Second is conjugated (てしまった) → honestly not clozeable.
    expect(shimau.examples[1].clozeJp).toBeNull()
    // A single-kana point (は) yields no candidates → no cloze.
    expect(parsed[1].examples[0].clozeJp).toBeNull()
  })

  it('throws on a drifted format', () => {
    expect(() => parseGrammarEntries('N5', { nope: 1 })).toThrow(/format drifted/)
  })
})

describe('importGrammarData', () => {
  it('imports all levels and writes the registry last', async () => {
    const summary = await importGrammarData([
      parseGrammarEntries('N5', N5_RAW),
      parseGrammarEntries('N3', N3_RAW)
    ])
    expect(summary.pointCount).toBe(3)
    expect(getGrammarBankInfo()!.pointCount).toBe(3)
  })

  it('throws on zero points without touching the registry', async () => {
    await expect(importGrammarData([[]])).rejects.toThrow(/No grammar points/)
    expect(getGrammarBankInfo()).toBeNull()
  })

  it('re-import replaces', async () => {
    await importGrammarData([parseGrammarEntries('N5', N5_RAW)])
    await importGrammarData([parseGrammarEntries('N3', N3_RAW)])
    expect(getGrammarBankInfo()!.pointCount).toBe(1)
    expect((db.prepare('SELECT COUNT(*) AS n FROM grammar_bank').get() as { n: number }).n).toBe(1)
    expect(listGrammar()).toHaveLength(1)
  })
})

describe('queries', () => {
  beforeEach(async () => {
    await importGrammarData([
      parseGrammarEntries('N5', N5_RAW),
      parseGrammarEntries('N3', N3_RAW)
    ])
  })

  it('listGrammar orders by level then sort', () => {
    const list = listGrammar()
    expect(list.map((p) => p.level)).toEqual(['N5', 'N5', 'N3'])
    // は has no s_tag → index fallback (1), sorting before てしまう's s_tag 12.
    expect(list[0].title).toBe('Topics with は')
    expect(list[1].title).toContain('てしまう')
  })

  it('getGrammarPoint returns full examples', () => {
    const summary = listGrammar().find((p) => p.title.includes('てしまう'))!
    const point = getGrammarPoint(summary.id)!
    expect(point.formation).toBe('Verb-て form + しまう')
    expect(point.examples[0].clozeAnswer).toBe('てしまう')
    expect(getGrammarPoint(99999)).toBeNull()
  })

  it('randomGrammar returns only clozeable points, honoring levels', () => {
    const all = randomGrammar(10)
    expect(all.every((p) => p.examples.some((e) => e.clozeJp))).toBe(true)
    // The は point has no clozeable example → excluded.
    expect(all.map((p) => p.title)).not.toContain('Topics with は')
    const n3 = randomGrammar(10, ['N3'])
    expect(n3).toHaveLength(1)
    expect(n3[0].level).toBe('N3')
  })

  it('remove clears rows and info', () => {
    removeGrammarBank()
    expect(getGrammarBankInfo()).toBeNull()
    expect(listGrammar()).toEqual([])
    expect(randomGrammar(5)).toEqual([])
  })
})
