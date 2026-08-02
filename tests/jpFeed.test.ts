import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createDictTestDb, createTestDb } from './helpers'
import type { JpToken } from '../src/shared/types'

let db: Database.Database
let dictDb: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('../src/main/dict/dictDb', () => ({ getDictDb: () => dictDb, closeDictDb: () => {} }))
vi.mock('../src/main/files', () => ({ mangaRootDir: () => '/nowhere', jpAudioDir: () => '/tmp/x' }))

const TOKENS: Record<string, JpToken[]> = {}
const tok = (surface: string, base: string, pos = '名詞'): JpToken => ({
  surface,
  base,
  reading: null,
  pos,
  wordLike: pos !== '助詞' && pos !== '記号'
})
vi.mock('../src/main/tokenizer', () => ({
  tokenize: async (text: string) => TOKENS[text] ?? []
}))

import { buildFeed, classifySentence, coarseUnknowns, getFeed, type FeedDeps } from '../src/main/jpFeed'
import * as jp from '../src/main/repos/japaneseRepo'

beforeEach(() => {
  db = createTestDb()
  dictDb = createDictTestDb()
  for (const key of Object.keys(TOKENS)) delete TOKENS[key]
})

describe('coarseUnknowns', () => {
  it('counts distinct learnable misses; particles never count', () => {
    const known = new Set(['猫'])
    expect(coarseUnknowns('猫 が 好き 好き', known)).toBe(1) // 好き once, が unlearnable
    expect(coarseUnknowns('猫', known)).toBe(0)
  })
})

describe('classifySentence', () => {
  it('a token is known via base OR surface', () => {
    const known = new Set(['食べる'])
    const tokens = [tok('食べた', '食べる', '動詞'), tok('パン', 'パン')]
    const { unknowns, surfaces } = classifySentence(tokens, known)
    expect(unknowns).toEqual(['パン'])
    expect(surfaces.get('パン')).toBe('パン')
  })

  it('ignores non-wordlike and unlearnable tokens', () => {
    const tokens = [tok('が', 'が', '助詞'), tok('。', '。', '記号'), tok('X1', 'X1')]
    expect(classifySentence(tokens, new Set()).unknowns).toEqual([])
  })
})

// ---- buildFeed with injected deps (the correctness core) ----

function makeDeps(overrides: Partial<FeedDeps> = {}): FeedDeps {
  return {
    loadSentences: () => [],
    tokenize: async (text) => TOKENS[text] ?? [],
    known: new Set(),
    tiersFor: () => new Map(),
    freqRanks: () => new Map(),
    audioFor: () => new Map(),
    ...overrides
  }
}

const row = (id: number, jp: string, keywords: string, en = 'en') => ({
  id,
  jp,
  en,
  attribution: null,
  keywords
})

describe('buildFeed', () => {
  it('keeps exactly-one-unknown sentences; 0 and 2 drop', async () => {
    TOKENS['猫が好き。'] = [tok('猫', '猫'), tok('が', 'が', '助詞'), tok('好き', '好き'), tok('。', '。', '記号')]
    TOKENS['猫がいる。'] = [tok('猫', '猫'), tok('が', 'が', '助詞'), tok('いる', 'いる', '動詞')]
    TOKENS['犬と鳥が好き。'] = [tok('犬', '犬'), tok('鳥', '鳥'), tok('好き', '好き')]
    const deps = makeDeps({
      known: new Set(['猫', 'いる', '好き']),
      loadSentences: () => [
        row(1, '猫が好き。', '猫 が 好き'), // 0 unknowns
        row(2, '猫がいる。', '猫 が いる'), // 0 unknowns
        row(3, '犬と鳥が好き。', '犬 鳥 好き') // 2 unknowns
      ]
    })
    const feed = await buildFeed({ includeLearning: false, unknowns: 1 }, deps)
    expect(feed.items).toEqual([])

    TOKENS['犬が好き。'] = [tok('犬', '犬'), tok('好き', '好き')]
    const deps2 = makeDeps({
      known: new Set(['好き']),
      loadSentences: () => [row(4, '犬が好き。', '犬 が 好き')]
    })
    const feed2 = await buildFeed({ includeLearning: false, unknowns: 1 }, deps2)
    expect(feed2.items).toHaveLength(1)
    expect(feed2.items[0].unknownWord).toBe('犬')
    expect(feed2.items[0].unknownSurface).toBe('犬')
  })

  it('REGRESSION: base/surface conflation must not fake an unknown', async () => {
    // keywords carry BOTH 食べる (base, known) and 食べた (surface, not in the
    // set) — a naive keyword count reads 1 phantom unknown. The exact pass
    // must classify the sentence as fully known (flood-eligible).
    TOKENS['パンを食べた。'] = [
      tok('パン', 'パン'),
      tok('を', 'を', '助詞'),
      tok('食べた', '食べる', '動詞'),
      tok('。', '。', '記号')
    ]
    const deps = makeDeps({
      known: new Set(['パン', '食べる']),
      loadSentences: () => [row(1, 'パンを食べた。', 'パン を 食べる 食べた')]
    })
    const flood = await buildFeed({ includeLearning: false, unknowns: 0 }, deps)
    expect(flood.items).toHaveLength(1)
    const onePlus = await buildFeed({ includeLearning: false, unknowns: 1 }, deps)
    expect(onePlus.items).toHaveLength(0)
  })

  it('ranks by unknown frequency and caps sentences per word', async () => {
    const known = new Set(['好き'])
    const sentences = [
      row(1, '龍が好き。', '龍 好き'),
      row(2, '龍も好き。', '龍 好き'),
      row(3, '龍は好き。', '龍 好き'),
      row(4, '龍を好き。', '龍 好き'),
      row(5, '犬が好き。', '犬 好き')
    ]
    TOKENS['龍が好き。'] = [tok('龍', '龍'), tok('好き', '好き')]
    TOKENS['龍も好き。'] = [tok('龍', '龍'), tok('好き', '好き')]
    TOKENS['龍は好き。'] = [tok('龍', '龍'), tok('好き', '好き')]
    TOKENS['龍を好き。'] = [tok('龍', '龍'), tok('好き', '好き')]
    TOKENS['犬が好き。'] = [tok('犬', '犬'), tok('好き', '好き')]
    const deps = makeDeps({
      known,
      loadSentences: () => sentences,
      freqRanks: () => new Map([['犬', 50], ['龍', 9000]])
    })
    const feed = await buildFeed({ includeLearning: false, unknowns: 1 }, deps)
    // 犬 (common) first; 龍 capped at 3 sentences.
    expect(feed.items[0].unknownWord).toBe('犬')
    expect(feed.items.filter((i) => i.unknownWord === '龍')).toHaveLength(3)
    expect(feed.items[0].unknownRank).toBe(50)
  })

  it('attaches tier and audio to final items', async () => {
    TOKENS['犬が好き。'] = [tok('犬', '犬'), tok('好き', '好き')]
    const deps = makeDeps({
      known: new Set(['好き']),
      loadSentences: () => [row(1, '犬が好き。', '犬 好き')],
      tiersFor: () => new Map([['犬', 'unstarted' as const]]),
      audioFor: () => new Map([['犬が好き。', 'jpaudio/tatoeba/9.mp3']])
    })
    const feed = await buildFeed({ includeLearning: false, unknowns: 1 }, deps)
    expect(feed.items[0].unknownTier).toBe('unstarted')
    expect(feed.items[0].audioPath).toBe('jpaudio/tatoeba/9.mp3')
  })

  it('tokenizer failure skips the sentence (empty, never wrong)', async () => {
    const deps = makeDeps({
      known: new Set(['好き']),
      loadSentences: () => [row(1, '謎の文。', '謎 文')] // no TOKENS entry
    })
    const feed = await buildFeed({ includeLearning: false, unknowns: 1 }, deps)
    expect(feed.items).toEqual([])
    expect(feed.scanned).toBe(1)
  })
})

describe('getFeed cache + fingerprint (real DBs)', () => {
  function seedBankSentence(): void {
    dictDb.prepare("INSERT INTO sentence_bank (id, source, sentence_count) VALUES (1, 'tatoeba', 1)").run()
    dictDb
      .prepare("INSERT INTO sentence (id, bank_id, jp, en) VALUES (1, 1, '犬が好き。', 'I like dogs.')")
      .run()
    dictDb
      .prepare("INSERT INTO sentence_fts (keywords, sentence_id, bank_id) VALUES ('犬 好き', 1, 1)")
      .run()
    TOKENS['犬が好き。'] = [tok('犬', '犬'), tok('好き', '好き')]
  }

  it('serves the cache until the knowledge fingerprint moves', async () => {
    seedBankSentence()
    // 好き known via a learned+graduated card.
    const courseId = jp.createCourse({ title: 'C', description: null, level: null, difficulty: null })
    const lessonId = jp.createLesson({ courseId, kind: 'vocab', title: 'L', body: null })
    const cardId = jp.createCard(lessonId, { front: '好き', back: 'like' })
    jp.setLessonLearned(lessonId, true)
    jp.submitReview(cardId, 'easy')

    const first = await getFeed({ includeLearning: false, unknowns: 1 })
    expect(first.fromCache).toBe(false)
    expect(first.items).toHaveLength(1)
    const second = await getFeed({ includeLearning: false, unknowns: 1 })
    expect(second.fromCache).toBe(true)

    // Mining 犬 changes the fingerprint → rebuild; 犬 is now unstarted-tier
    // but STILL the one unknown (strict known-set counts only tier 3).
    jp.createCard(lessonId, { front: '犬', back: 'dog' })
    const third = await getFeed({ includeLearning: false, unknowns: 1 })
    expect(third.fromCache).toBe(false)
  })
})
