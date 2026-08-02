import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createDictTestDb, createTestDb } from './helpers'
import type { JpToken } from '../src/shared/types'

let db: Database.Database
let dictDb: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('../src/main/dict/dictDb', () => ({ getDictDb: () => dictDb, closeDictDb: () => {} }))
vi.mock('../src/main/jisho', () => ({ lookup: async () => [] }))

// Deterministic fixture tokenizer keyed by exact sentence text.
const TOKENS: Record<string, JpToken[]> = {}
const tok = (surface: string, base: string, reading: string | null, pos: string): JpToken => ({
  surface,
  base,
  reading,
  pos,
  wordLike: pos !== '助詞' && pos !== '記号'
})
vi.mock('../src/main/tokenizer', () => ({
  tokenize: async (text: string) => TOKENS[text] ?? []
}))

import {
  buildTransitivityQuestion,
  componentQuizPool,
  homophonePool,
  loanwordSample,
  lookalikePool
} from '../src/main/jpDrills'
import { rankFor, similarKanji } from '../src/main/dict/similarKanji'
import { importKradData } from '../src/main/dict/krad'
import { importFromReader } from '../src/main/dict/importer'
import { importSentenceText } from '../src/main/dict/sentences'
import { TRANSITIVITY_PAIRS } from '../src/shared/transitivity'

beforeEach(() => {
  db = createTestDb()
  dictDb = createDictTestDb()
  for (const key of Object.keys(TOKENS)) delete TOKENS[key]
})

// ---- fixtures ----

const KRAD = [
  { literal: '娃', components: ['女', '土'] },
  { literal: '妵', components: ['女', '土'] },
  { literal: '姓', components: ['女', '生'] },
  { literal: '埋', components: ['土', '里'] },
  { literal: '街', components: ['行', '土'] },
  { literal: '壊', components: ['土', '罒', '衣'] }
]
const COMPONENTS = [
  { component: '女', strokeCount: 3 },
  { component: '土', strokeCount: 3 },
  { component: '生', strokeCount: 5 },
  { component: '里', strokeCount: 7 },
  { component: '行', strokeCount: 6 },
  { component: '罒', strokeCount: 5 },
  { component: '衣', strokeCount: 6 },
  { component: '一', strokeCount: 1 },
  { component: '口', strokeCount: 3 },
  { component: '丶', strokeCount: 1 }
]

async function seedKanjidic(): Promise<void> {
  await importFromReader({
    readIndex: async () => ({ title: 'KANJIDIC', revision: 'r', format: 3 }),
    bankNames: () => ['kanji_bank_1.json'],
    readBank: async () => [
      ['娃', 'ア', 'うつく.しい', '', ['beautiful'], { strokes: '9', jlpt_new: '1' }],
      ['妵', 'シュ', '', '', ['lovely'], { strokes: '8', jlpt_new: '1' }],
      ['姓', 'セイ', '', '', ['surname'], { strokes: '8', jlpt_new: '1' }],
      ['埋', 'マイ', 'う.める', '', ['bury'], { strokes: '10', jlpt_new: '1' }],
      ['街', 'ガイ', 'まち', '', ['street'], { strokes: '12', jlpt_new: '1' }],
      ['壊', 'カイ', 'こわ.す', '', ['break'], { strokes: '16', jlpt_new: '1' }]
    ],
    readRaw: async () => Buffer.alloc(0)
  })
}

async function seedTerms(): Promise<void> {
  await importFromReader({
    readIndex: async () => ({ title: 'JMdict', revision: 'r', format: 3 }),
    bankNames: () => ['term_bank_1.json', 'term_meta_bank_1.json'],
    readBank: async (name) => {
      if (name === 'term_bank_1.json')
        return [
          ['帰る', 'かえる', 'n', 'v5', 0, ['to return home'], 1, ''],
          ['変える', 'かえる', 'n', 'v1', 0, ['to change'], 2, ''],
          ['換える', 'かえる', 'n', 'v1', 0, ['to change; to exchange'], 3, ''],
          ['買える', 'かえる', 'n', 'v1', 0, ['to be able to buy'], 4, ''],
          ['ミシン', '', 'n', '', 0, ['sewing machine'], 5, ''],
          ['コーヒー', '', 'n', '', 0, ['coffee'], 6, 'gai1'],
          ['ア', '', 'n', '', 0, ['a (single mora)'], 7, ''],
          ['缶コーヒー', 'かんコーヒー', 'n', '', 0, ['canned coffee'], 8, '']
        ]
      // frequency rows keyed to the same expressions
      return [
        ['帰る', 'freq', { value: 100 }],
        ['変える', 'freq', { value: 200 }],
        ['換える', 'freq', { value: 8000 }],
        ['買える', 'freq', { value: 500 }],
        ['ミシン', 'freq', { value: 5000 }],
        ['ア', 'freq', { value: 1 }]
      ]
    },
    readRaw: async () => Buffer.alloc(0)
  })
}

describe('similarKanji (cross-pack)', () => {
  it('ranks component neighbors and excludes strangers', async () => {
    await importKradData(KRAD, COMPONENTS)
    await seedKanjidic()
    const similar = similarKanji('娃')
    // Chips are thresholded: only the identical-component neighbor clears 0.5.
    expect(similar.map((s) => s.character)).toEqual(['妵'])
    // The drill path (unthresholded) sees the partial-overlap neighbors too.
    const ranked = rankFor('娃', { limit: 10 }).map((r) => r.character)
    expect(ranked).toContain('姓') // shares 女
    expect(ranked).toContain('埋') // shares 土
    expect(ranked).not.toContain('娃')
  })

  it('returns only overrides when the krad pack is absent', () => {
    expect(similarKanji('娃')).toEqual([])
  })
})

describe('lookalikePool', () => {
  it('builds questions with three fair decoys from kanji cards', async () => {
    await importKradData(KRAD, COMPONENTS)
    await seedKanjidic()
    const jp = await import('../src/main/repos/japaneseRepo')
    const courseId = jp.createCourse({ title: 'K', description: null, level: null, difficulty: null })
    const lesson = jp.createLesson({ courseId, kind: 'kanji', title: 'Kanji', body: null })
    jp.createCard(lesson, { front: '娃', reading: null, back: 'beauty' })
    const pool = lookalikePool({ source: { kind: 'cards' }, limit: 10 })
    expect(pool).toHaveLength(1)
    const q = pool[0]
    expect(q.kanji).toBe('娃')
    expect(q.meaning).toContain('beautiful')
    expect(q.decoys).toHaveLength(3)
    expect(q.decoys).not.toContain('娃')
  })

  it('drops kanji that cannot field three decoys', async () => {
    await importKradData([{ literal: '壊', components: ['罒'] }], COMPONENTS.slice(0, 3))
    await seedKanjidic()
    const pool = lookalikePool({ source: { kind: 'level', level: 'N1' }, limit: 10 })
    expect(pool).toEqual([]) // no neighbors share 罒
  })
})

describe('componentQuizPool meaner decoys', () => {
  it('prefers components of look-alike kanji as decoys', async () => {
    await importKradData(KRAD, COMPONENTS)
    await seedKanjidic()
    const pool = componentQuizPool({ source: { kind: 'level', level: 'N1' }, limit: 10 })
    const q = pool.find((item) => item.kanji === '娃')
    expect(q).toBeDefined()
    // 娃's look-alikes (姓/埋/街 via 女/土) contribute 生/里/行 as decoys.
    const decoyChars = q!.decoys.map((d) => d.char)
    expect(decoyChars.some((c) => ['生', '里', '行'].includes(c))).toBe(true)
    // Never a real component.
    expect(decoyChars).not.toContain('女')
    expect(decoyChars).not.toContain('土')
  })
})

describe('buildTransitivityQuestion', () => {
  const aku = TRANSITIVITY_PAIRS.find((p) => p.key === '開く-開ける')!

  it('falls back to the authored example with no sentence bank', async () => {
    const q = await buildTransitivityQuestion(aku, 'trans')
    expect(q.source).toBe('authored')
    expect(q.jp).toContain(q.surface)
    expect(q.pairKey).toBe('開く-開ける')
  })

  it('uses a bank sentence when exactly one member verb is present', async () => {
    TOKENS['ドアを開けた。'] = [
      tok('ドア', 'ドア', 'ドア', '名詞'),
      tok('を', 'を', 'ヲ', '助詞'),
      tok('開けた', '開ける', 'アケタ', '動詞'),
      tok('。', '。', null, '記号')
    ]
    await importSentenceText('I opened the door.\tドアを開けた。\tcc')
    const q = await buildTransitivityQuestion(aku, 'trans')
    expect(q.source).toBe('tatoeba')
    expect(q.jp).toBe('ドアを開けた。')
    expect(q.surface).toBe('開けた')
  })

  it('rejects a sentence containing BOTH members (ambiguous)', async () => {
    TOKENS['開けたら開いた。'] = [
      tok('開けたら', '開ける', 'アケタラ', '動詞'),
      tok('開いた', '開く', 'アイタ', '動詞'),
      tok('。', '。', null, '記号')
    ]
    await importSentenceText('When I opened it, it opened.\t開けたら開いた。\tcc')
    const q = await buildTransitivityQuestion(aku, 'trans')
    expect(q.source).toBe('authored')
  })
})

describe('homophonePool', () => {
  it('groups same-reading kanji words, excludes near-synonym spellings from options', async () => {
    await seedTerms()
    const pool = await homophonePool({ source: 'frequency', limit: 10 })
    expect(pool.length).toBeGreaterThan(0)
    const q = pool.find((item) => item.reading === 'かえる')!
    expect(q).toBeDefined()
    expect(new Set(q.group.map((m) => m.expression))).toEqual(
      new Set(['帰る', '変える', '換える', '買える'])
    )
    // 換える shares 変える's first gloss token ('to change') — never BOTH as options.
    const optionExprs = q.options.map((o) => o.expression)
    expect(optionExprs).toContain(q.target)
    if (optionExprs.includes('変える') && q.target !== '変える') {
      expect(optionExprs).not.toContain('換える')
    }
  })

  it('renders sentence mode with the target swapped for kana', async () => {
    await seedTerms()
    TOKENS['家に帰った。'] = [
      tok('家', '家', 'イエ', '名詞'),
      tok('に', 'に', 'ニ', '助詞'),
      tok('帰った', '帰る', 'カエッタ', '動詞'),
      tok('。', '。', null, '記号')
    ]
    await importSentenceText('I went home.\t家に帰った。\tcc')
    // Run a few times: the target member is random; when 帰る is the target
    // the sentence must appear in kana form.
    let sawSentenceMode = false
    for (let i = 0; i < 20 && !sawSentenceMode; i++) {
      const pool = await homophonePool({ source: 'frequency', limit: 10 })
      const q = pool.find((item) => item.reading === 'かえる')
      if (q && q.target === '帰る') {
        expect(q.mode).toBe('sentence')
        expect(q.jp).toBe('家にかえった。')
        expect(q.jp).not.toContain('帰')
        sawSentenceMode = true
      }
    }
    expect(sawSentenceMode).toBe(true)
  })

  it('cards mode keeps only groups matching learned-card readings', async () => {
    await seedTerms()
    const jp = await import('../src/main/repos/japaneseRepo')
    const courseId = jp.createCourse({ title: 'C', description: null, level: null, difficulty: null })
    const lesson = jp.createLesson({ courseId, kind: 'vocab', title: 'L', body: null })
    jp.createCard(lesson, { front: '帰る', reading: 'かえる', back: 'return' })
    jp.setLessonLearned(lesson, true)
    const pool = await homophonePool({ source: 'cards', limit: 10 })
    expect(pool.every((q) => q.reading === 'かえる')).toBe(true)
    expect(pool.length).toBe(1)
  })

  it('returns [] without a frequency dictionary', async () => {
    const pool = await homophonePool({ source: 'frequency', limit: 10 })
    expect(pool).toEqual([])
  })
})

describe('loanwordSample', () => {
  it('keeps common katakana words, drops mixed/single-mora/uncommon', async () => {
    await seedTerms()
    const sample = loanwordSample({ limit: 50 })
    const words = sample.map((s) => s.word)
    expect(words).toContain('ミシン') // rank 5000
    expect(words).toContain('コーヒー') // gai1 tag
    expect(words).not.toContain('ア') // single mora
    expect(words).not.toContain('缶コーヒー') // kanji-bearing
    const mishin = sample.find((s) => s.word === 'ミシン')!
    expect(mishin.gloss).toContain('sewing machine')
  })

  it('returns [] with nothing installed', () => {
    expect(loanwordSample({ limit: 10 })).toEqual([])
  })
})
