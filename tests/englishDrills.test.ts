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

import {
  EN_BANDS,
  buildVocabPool,
  quizzableCandidate,
  spellingPool,
  vocabQuizPool,
  type EnCandidate
} from '../src/main/englishDrills'
import { saveWord } from '../src/main/repos/englishRepo'

beforeEach(() => {
  db = createTestDb()
  dictDb = createDictTestDb()
})

// Deterministic rng for the pure assembler.
const seededRng = (): (() => number) => {
  let s = 42
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648
    return s / 2147483648
  }
}

// ---- dict seeding: 12 quizzable words inside the 'advanced' band ----

const WORDS = [
  'ubiquitous', 'ephemeral', 'lucid', 'tenacious', 'austere', 'candor',
  'zealot', 'placid', 'brevity', 'opaque', 'frugal', 'stoic'
]

function seedDict(): void {
  dictDb.prepare("INSERT INTO en_freq_set (id, source, word_count) VALUES (1, 'opensubtitles', ?)")
    .run(WORDS.length)
  dictDb.prepare("INSERT INTO en_dict (source, version) VALUES ('wordnet', '3.0')").run()
  const [lo] = EN_BANDS.advanced
  const insFreq = dictDb.prepare('INSERT INTO en_freq (bank_id, word, rank) VALUES (1, ?, ?)')
  const insLemma = dictDb.prepare(
    "INSERT INTO en_lemma (bank_id, lemma, pos, offsets) VALUES (1, ?, 'a', ?)"
  )
  const insSyn = dictDb.prepare(
    "INSERT INTO en_synset (bank_id, pos, offset, def, examples, words) VALUES (1, 'a', ?, ?, '[]', ?)"
  )
  const insPron = dictDb.prepare('INSERT INTO en_pron (bank_id, word, ipa) VALUES (1, ?, ?)')
  WORDS.forEach((w, i) => {
    insFreq.run(w, lo + 10 + i)
    insLemma.run(w, JSON.stringify([100 + i]))
    insSyn.run(100 + i, `definition of ${w}`, JSON.stringify([w, `${w}like`]))
    insPron.run(w, `${w}IPA`)
  })
}

describe('quizzableCandidate', () => {
  it('rejects multiword, short and proper-noun lemmas; accepts hyphens', () => {
    expect(quizzableCandidate('ad hoc', ['ad hoc'])).toBe(false)
    expect(quizzableCandidate('ox', ['ox'])).toBe(false)
    // en_lemma is lowercased at import — the casing signal lives in the synset words.
    expect(quizzableCandidate('london', ['London'])).toBe(false)
    expect(quizzableCandidate('well-known', ['well-known'])).toBe(true)
    expect(quizzableCandidate('lucid', ['lucid', 'crystalline'])).toBe(true)
  })
})

describe('buildVocabPool (pure)', () => {
  const candidates: EnCandidate[] = WORDS.map((w, i) => ({
    word: w,
    pos: 'adjective',
    def: `definition of ${w}`,
    ipa: null,
    rank: 10000 + i * 100,
    synonyms: [`${w}like`]
  }))

  it('word2def: 3 distinct distractor defs, none equal to the answer', () => {
    const pool = buildVocabPool(candidates, 'word2def', 5, seededRng())
    expect(pool).toHaveLength(5)
    for (const q of pool) {
      expect(q.prompt).toBe(q.word)
      expect(q.answer).toBe(q.def)
      expect(q.distractors).toHaveLength(3)
      expect(new Set(q.distractors).size).toBe(3)
      expect(q.distractors).not.toContain(q.answer)
    }
  })

  it('def2word: answer is the word, distractors are other words', () => {
    const pool = buildVocabPool(candidates, 'def2word', 5, seededRng())
    for (const q of pool) {
      expect(q.prompt).toBe(q.def)
      expect(q.answer).toBe(q.word)
      expect(q.distractors).not.toContain(q.word)
    }
  })

  it('synonyms: answer comes from the synset, distractors never do', () => {
    const pool = buildVocabPool(candidates, 'synonyms', 5, seededRng())
    for (const q of pool) {
      expect(q.answer).toBe(`${q.word}like`)
      expect(q.distractors).not.toContain(q.answer)
    }
  })

  it('returns [] below 8 usable candidates', () => {
    expect(buildVocabPool(candidates.slice(0, 7), 'word2def', 5, seededRng())).toEqual([])
  })

  it('dedupes candidates that arrive once per POS row', () => {
    const doubled = [...candidates, ...candidates]
    const pool = buildVocabPool(doubled, 'word2def', 50, seededRng())
    const words = pool.map((q) => q.word)
    expect(new Set(words).size).toBe(words.length)
  })
})

describe('pools against the real SQL', () => {
  it('band source joins freq, lemma, synset and IPA', () => {
    seedDict()
    const pool = vocabQuizPool({
      mode: 'word2def',
      source: { kind: 'band', band: 'advanced' },
      limit: 6
    })
    expect(pool.length).toBe(6)
    const [lo, hi] = EN_BANDS.advanced
    for (const q of pool) {
      expect(q.rank).toBeGreaterThanOrEqual(lo)
      expect(q.rank).toBeLessThanOrEqual(hi)
      expect(q.ipa).toMatch(/^\/.*\/$/)
      expect(q.def).toContain('definition of')
    }
  })

  it('band source returns [] when no frequency pack is installed', () => {
    expect(
      vocabQuizPool({ mode: 'word2def', source: { kind: 'band', band: 'advanced' }, limit: 6 })
    ).toEqual([])
  })

  it('myWords needs 8 saved words, and never offers synonyms mode', () => {
    for (let i = 0; i < 7; i++) saveWord({ word: `word${i}`, meaning: `meaning ${i}` })
    expect(vocabQuizPool({ mode: 'word2def', source: { kind: 'myWords' }, limit: 5 })).toEqual([])
    saveWord({ word: 'word7', meaning: 'meaning 7' })
    const pool = vocabQuizPool({ mode: 'word2def', source: { kind: 'myWords' }, limit: 5 })
    expect(pool.length).toBeGreaterThan(0)
    expect(pool[0].rank).toBeNull()
    expect(vocabQuizPool({ mode: 'synonyms', source: { kind: 'myWords' }, limit: 5 })).toEqual([])
  })

  it('spellingPool returns unique words with defs', () => {
    seedDict()
    const pool = spellingPool({ source: { kind: 'band', band: 'advanced' }, limit: 8 })
    expect(pool.length).toBe(8)
    expect(new Set(pool.map((p) => p.word)).size).toBe(8)
    for (const p of pool) expect(p.def).toBeTruthy()
  })
})
