import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createDictTestDb } from './helpers'

let dictDb: Database.Database
vi.mock('../src/main/dict/dictDb', () => ({
  getDictDb: () => dictDb,
  closeDictDb: () => {}
}))
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => dictDb }))
vi.mock('electron', () => ({ app: { getPath: () => '/tmp' } }))
// The sentence bank importer tokenizes; the JLPT reading section only needs
// the rows to exist.
vi.mock('../src/main/tokenizer', () => ({ tokenize: async () => [] }))

import { importGrammarData, parseGrammarEntries } from '../src/main/dict/grammar'
import { importFromReader } from '../src/main/dict/importer'
import { importSentenceText } from '../src/main/dict/sentences'
import { jlptTestPool, rebalanceSizes, JLPT_RANK_WINDOWS } from '../src/main/jpJlpt'

beforeEach(() => {
  dictDb = createDictTestDb()
})

// Kana-only frames, because clozeGrammarExample only blanks a kana run from
// the title/formation that really occurs in the example.
const FRAMES = [
  'てしまう', 'ながら', 'たがる', 'そうだ', 'らしい', 'ばかり',
  'つもり', 'とおり', 'かもしれない', 'なければ', 'ようだ', 'ところ',
  'はず', 'まま', 'ため', 'のに'
]

const grammarRaw = (n: number, level: string) =>
  Array.from({ length: n }, (_, i) => {
    const f = FRAMES[i % FRAMES.length]
    return {
      title: `～${f}`,
      short_explanation: `meaning ${i}`,
      long_explanation: null,
      formation: `Verb + ${f}`,
      examples: [{ jp: `毎日${f}と思います。`, romaji: 'x', en: `Sentence ${i}.` }],
      p_tag: `JLPT_${level}`
    }
  })

async function seedGrammar(level: 'N5' | 'N4' = 'N5', n = 12): Promise<void> {
  await importGrammarData([parseGrammarEntries(level, grammarRaw(n, level))])
}

// A frequency dictionary + JMdict entries inside the N5 window, all kanji.
async function seedWords(count = 30): Promise<void> {
  // Glosses must differ in their FIRST token: the pool dedupes distractors by
  // it, so "meaning 1"/"meaning 2" would collapse to one option.
  const HEADS = [
    'river', 'mountain', 'promise', 'silence', 'harvest', 'bridge', 'lantern', 'ferry',
    'orchard', 'kettle', 'ribbon', 'compass', 'meadow', 'anchor', 'cavern', 'trellis',
    'quarry', 'saddle', 'thicket', 'furnace', 'pebble', 'marsh', 'ledger', 'satchel',
    'cistern', 'gable', 'kiln', 'moat', 'palisade', 'rampart', 'sluice', 'turret',
    'vestry', 'wharf', 'yardarm', 'zenith', 'alcove', 'bellows', 'cornice', 'dovecote',
    'ember', 'fresco', 'granary', 'hearth', 'inkwell', 'jetty', 'keystone', 'lintel',
    'mullion', 'niche', 'obelisk', 'parapet', 'quiver', 'reliquary', 'spindle', 'tannery',
    'undercroft', 'vault', 'weathervane', 'yoke'
  ]
  const kana = ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ']
  const words = Array.from({ length: count }, (_, i) => ({
    expr: `語${String.fromCharCode(0x4e00 + i)}`,
    // Readings vary in mora count so the ±1-mora distractor rule can fill four.
    reading: `${kana[i % kana.length]}${kana[(i + 3) % kana.length]}${i % 3 === 0 ? kana[(i + 5) % kana.length] : ''}`,
    gloss: `${HEADS[i % HEADS.length]} ${i}`
  }))
  await importFromReader({
    readIndex: async () => ({ title: 'JMdict', revision: 'r', format: 3 }),
    bankNames: () => ['term_bank_1.json'],
    readBank: async () => words.map((w, i) => [w.expr, w.reading, 'n', '', 0, [w.gloss], i + 1, '']),
    readRaw: async () => Buffer.alloc(0)
  })
  await importFromReader({
    readIndex: async () => ({ title: 'Freq', revision: 'r', format: 3 }),
    bankNames: () => ['term_meta_bank_1.json'],
    readBank: async () => words.map((w, i) => [w.expr, 'freq', { value: i + 1 }]),
    readRaw: async () => Buffer.alloc(0)
  })
}

async function seedSentences(n = 12): Promise<void> {
  const lines = Array.from(
    { length: n },
    (_, i) => `This is sentence number ${i} about something.\tこれは${i}番目の文です。よろしく`
  )
  await importSentenceText(lines.join('\n'))
}

describe('rebalanceSizes (pure)', () => {
  it('keeps the full length when everything is available', () => {
    const s = rebalanceSizes({ grammar: true, vocab: true, kanji: true, reading: true })
    expect(s).toEqual({ grammar: 8, vocab: 8, kanji: 8, reading: 6 })
    expect(Object.values(s).reduce((a, b) => a + b, 0)).toBe(30)
  })

  it('hands a missing section round-robin to the rest, keeping the total', () => {
    const s = rebalanceSizes({ grammar: true, vocab: true, kanji: false, reading: false })
    expect(s.kanji).toBe(0)
    expect(s.reading).toBe(0)
    expect(s.grammar + s.vocab).toBe(30)
    const one = rebalanceSizes({ grammar: true, vocab: false, kanji: false, reading: false })
    expect(one.grammar).toBe(30)
    expect(rebalanceSizes({ grammar: false, vocab: false, kanji: false, reading: false })).toEqual({
      grammar: 0,
      vocab: 0,
      kanji: 0,
      reading: 0
    })
  })
})

describe('jlptTestPool', () => {
  it('returns null with no packs at all', () => {
    expect(jlptTestPool({ level: 'N5' })).toBeNull()
  })

  it('builds sections from what is installed and flags the frequency proxy', async () => {
    await seedGrammar()
    await seedWords()
    await seedSentences()
    const test = jlptTestPool({ level: 'N5' })
    expect(test).not.toBeNull()
    expect(test!.level).toBe('N5')
    expect(test!.source).toBe('packs')
    const keys = test!.sections.map((s) => s.key)
    expect(keys).toContain('grammar')
    expect(keys).toContain('vocab')
    const vocab = test!.sections.find((s) => s.key === 'vocab')!
    expect(vocab.note).toMatch(/frequency/)
    const total = test!.sections.reduce((n, s) => n + s.questions.length, 0)
    expect(total).toBeGreaterThanOrEqual(8)
    for (const s of test!.sections) {
      for (const q of s.questions) {
        expect(q.options).toHaveLength(4)
        expect(new Set(q.options).size).toBe(4)
        expect(q.correct).toBeGreaterThanOrEqual(0)
        expect(q.correct).toBeLessThan(4)
        expect(q.prompt.length).toBeGreaterThan(0)
        expect(q.section).toBe(s.key)
      }
    }
  })

  it('vocabulary questions come from the level rank window', async () => {
    await seedGrammar()
    await seedWords(60)
    const test = jlptTestPool({ level: 'N5' })!
    const vocab = test.sections.find((s) => s.key === 'vocab')!
    const [lo, hi] = JLPT_RANK_WINDOWS.N5
    for (const q of vocab.questions) {
      const rank = (
        dictDb.prepare('SELECT rank FROM freq WHERE expression = ?').get(q.prompt) as { rank: number }
      ).rank
      expect(rank).toBeGreaterThanOrEqual(lo)
      expect(rank).toBeLessThanOrEqual(hi)
    }
  })

  it('marks the kanji section unlevelled when KANJIDIC is absent, and never invents an answer', async () => {
    await seedGrammar()
    await seedWords(60)
    const test = jlptTestPool({ level: 'N5' })!
    const kanji = test.sections.find((s) => s.key === 'kanji')
    if (kanji) {
      expect(kanji.note).toMatch(/unlevelled/)
      for (const q of kanji.questions) {
        const reading = (
          dictDb.prepare('SELECT reading FROM term WHERE expression = ? LIMIT 1').get(q.prompt) as {
            reading: string
          }
        ).reading
        expect(q.options[q.correct]).toBe(reading)
      }
    }
  })

  it('reading questions use real translations as the answer and distinct distractors', async () => {
    await seedGrammar()
    await seedWords()
    await seedSentences(20)
    const test = jlptTestPool({ level: 'N5' })!
    const reading = test.sections.find((s) => s.key === 'reading')
    if (reading) {
      for (const q of reading.questions) {
        const en = (
          dictDb.prepare('SELECT en FROM sentence WHERE jp = ? LIMIT 1').get(q.prompt) as { en: string }
        ).en
        expect(q.options[q.correct]).toBe(en)
        expect(q.options.filter((o) => o === en)).toHaveLength(1)
      }
    }
  })
})
