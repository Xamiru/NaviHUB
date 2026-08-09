import { beforeEach, describe, expect, it, vi } from 'vitest'
import DatabaseCtor from 'better-sqlite3'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
// seriesText pulls in the manga/epub stack transitively; the repo never calls it
// beyond isLearnableWord, which is pure.
vi.mock('../src/main/files', () => ({ mangaRootDir: () => '/nowhere' }))
vi.mock('../src/main/tokenizer', () => ({ tokenize: async () => [] }))
// The frequency list lives in dictionaries.db. A tiny in-memory stand-in with
// the real freq/dict shape lets the baseline be driven without the pack.
let dictDb: Database.Database
vi.mock('../src/main/dict/dictDb', () => ({ getDictDb: () => dictDb }))

import * as coverageRepo from '../src/main/repos/coverageRepo'
import * as jp from '../src/main/repos/japaneseRepo'

beforeEach(() => {
  db = createTestDb()
  dictDb = new DatabaseCtor(':memory:')
  dictDb.exec(`
    CREATE TABLE dict (id INTEGER PRIMARY KEY, priority INTEGER NOT NULL DEFAULT 0);
    CREATE TABLE freq (dict_id INTEGER NOT NULL, expression TEXT NOT NULL, rank INTEGER NOT NULL);
    INSERT INTO dict (id, priority) VALUES (1, 0);
  `)
})

// Ranked 1..n in the given order.
function seedFreq(words: string[]): void {
  const ins = dictDb.prepare('INSERT INTO freq (dict_id, expression, rank) VALUES (1, ?, ?)')
  words.forEach((w, i) => ins.run(w, i + 1))
}

function setBaseline(n: number): void {
  db.prepare("INSERT INTO settings (key, value) VALUES ('jp.knownBaseline', ?) " +
    'ON CONFLICT(key) DO UPDATE SET value = excluded.value').run(String(n))
}

function insertMedia(title: string): number {
  const info = db.prepare("INSERT INTO media_item (media_type, title) VALUES ('manga', ?)").run(title)
  return info.lastInsertRowid as number
}

// A lesson whose cards start as 'new'; drive them with the real SRS to graduate.
function lesson(opts: {
  courseTitle: string
  learned: boolean
  cards: { front: string; back: string }[]
}): number {
  const courseId = jp.createCourse({
    title: opts.courseTitle,
    description: null,
    level: null,
    difficulty: null
  })
  const lessonId = jp.createLesson({
    courseId,
    kind: 'vocab',
    title: `${opts.courseTitle} lesson`,
    cards: opts.cards.map((c) => ({ front: c.front, back: c.back }))
  })
  if (opts.learned) jp.setLessonLearned(lessonId, true)
  return lessonId
}

function graduate(front: string): void {
  const card = db.prepare('SELECT id FROM jp_card WHERE front = ?').get(front) as { id: number }
  // new -> learning -> ... -> review: 'easy' graduates in one step.
  jp.submitReview(card.id, 'easy')
}

const SCAN = {
  counts: new Map([
    ['魔法', 30],
    ['剣', 12],
    ['冒険', 5],
    ['竜', 3],
    ['は', 500] // particle: filtered out of the word rows
  ]),
  tokenCount: 550,
  chaptersScanned: 4
}

describe('coverageRepo tiers', () => {
  it('splits known / learning / unstarted / unknown by unique words and tokens', () => {
    const id = insertMedia('Frieren')
    lesson({ courseTitle: 'Learned', learned: true, cards: [{ front: '魔法', back: 'magic' }, { front: '剣', back: 'sword' }] })
    lesson({ courseTitle: 'Unlearned', learned: false, cards: [{ front: '冒険', back: 'adventure' }] })
    graduate('魔法') // 剣 stays in learning

    coverageRepo.saveScan(id, SCAN)
    const cov = coverageRepo.coverageForMedia(id)!

    expect(cov.tiers.known).toEqual({ uniqueCount: 1, tokenCount: 30 })
    expect(cov.tiers.learning).toEqual({ uniqueCount: 1, tokenCount: 12 })
    expect(cov.tiers.unstarted).toEqual({ uniqueCount: 1, tokenCount: 5 })
    expect(cov.tiers.unknown).toEqual({ uniqueCount: 1, tokenCount: 3 })
    expect(cov.topUnknown).toEqual([{ word: '竜', count: 3 }])
    // Totals cover the SAME learnable-word set the tiers do, so a displayed
    // "62% of N unique words" has 62% and N over one denominator (は is noise).
    expect(cov.tokenCount).toBe(50) // 30 + 12 + 5 + 3, not the 550 with particles
    expect(cov.uniqueWords).toBe(4)
    expect(cov.chaptersScanned).toBe(4)
  })

  it('a prep deck of unlearned cards does not count as known', () => {
    const id = insertMedia('Prep')
    lesson({
      courseTitle: 'Reading prep: Prep',
      learned: false,
      cards: [
        { front: '魔法', back: 'magic' },
        { front: '剣', back: 'sword' },
        { front: '冒険', back: 'adventure' },
        { front: '竜', back: 'dragon' }
      ]
    })
    coverageRepo.saveScan(id, SCAN)
    const cov = coverageRepo.coverageForMedia(id)!
    expect(cov.tiers.known.tokenCount).toBe(0)
    expect(cov.tiers.unstarted.uniqueCount).toBe(4)
  })

  it('recomputes without a rescan as the user learns', () => {
    const id = insertMedia('Frieren')
    const unlearned = lesson({
      courseTitle: 'Later',
      learned: false,
      cards: [{ front: '冒険', back: 'adventure' }]
    })
    coverageRepo.saveScan(id, SCAN)
    expect(coverageRepo.coverageForMedia(id)!.tiers.known.uniqueCount).toBe(0)

    // Learn the lesson and graduate the card — no second scan anywhere.
    jp.setLessonLearned(unlearned, true)
    graduate('冒険')

    const after = coverageRepo.coverageForMedia(id)!
    expect(after.tiers.known).toEqual({ uniqueCount: 1, tokenCount: 5 })
    expect(after.tiers.unstarted.uniqueCount).toBe(0)
    expect(after.scannedAt).toBe(coverageRepo.coverageForMedia(id)!.scannedAt) // untouched
  })

  it('a duplicated front takes its best tier', () => {
    const id = insertMedia('Dup')
    lesson({ courseTitle: 'Known', learned: true, cards: [{ front: '魔法', back: 'magic' }] })
    lesson({ courseTitle: 'Draft', learned: false, cards: [{ front: '魔法', back: 'magic dup' }] })
    graduate('魔法')

    coverageRepo.saveScan(id, SCAN)
    const cov = coverageRepo.coverageForMedia(id)!
    expect(cov.tiers.known).toEqual({ uniqueCount: 1, tokenCount: 30 })
    expect(cov.tiers.unstarted.uniqueCount).toBe(0)
  })

  it('returns null for an unscanned series', () => {
    expect(coverageRepo.coverageForMedia(insertMedia('Never scanned'))).toBeNull()
  })
})

describe('saveScan', () => {
  it('replaces the previous word set and refreshes scanned_at', () => {
    const id = insertMedia('Frieren')
    coverageRepo.saveScan(id, SCAN)
    db.prepare("UPDATE jp_coverage SET scanned_at = '2020-01-01 00:00:00' WHERE media_id = ?").run(id)

    coverageRepo.saveScan(id, {
      counts: new Map([['新しい', 7]]),
      tokenCount: 7,
      chaptersScanned: 1
    })
    const words = db
      .prepare('SELECT word FROM jp_coverage_word WHERE media_id = ? ORDER BY word')
      .all(id) as { word: string }[]
    expect(words.map((w) => w.word)).toEqual(['新しい'])
    expect(coverageRepo.coverageForMedia(id)!.scannedAt).not.toBe('2020-01-01 00:00:00')
    expect(coverageRepo.coverageForMedia(id)!.chaptersScanned).toBe(1)
  })

  it('drops particles and Latin noise from the stored word rows', () => {
    const id = insertMedia('Noise')
    coverageRepo.saveScan(id, {
      counts: new Map([
        ['魔法', 3],
        ['は', 90],
        ['abc', 5],
        ['12', 4]
      ]),
      tokenCount: 102,
      chaptersScanned: 1
    })
    const words = db.prepare('SELECT word FROM jp_coverage_word WHERE media_id = ?').all(id) as {
      word: string
    }[]
    expect(words.map((w) => w.word)).toEqual(['魔法'])
  })
})

describe('coverageList', () => {
  it('ranks by token-weighted known share and survives media deletion', () => {
    const easy = insertMedia('Easy series')
    const hard = insertMedia('Hard series')
    lesson({ courseTitle: 'Known', learned: true, cards: [{ front: '魔法', back: 'magic' }] })
    graduate('魔法')

    coverageRepo.saveScan(easy, { counts: new Map([['魔法', 90], ['竜', 10]]), tokenCount: 100, chaptersScanned: 1 })
    coverageRepo.saveScan(hard, { counts: new Map([['魔法', 10], ['竜', 90]]), tokenCount: 100, chaptersScanned: 1 })

    const list = coverageRepo.coverageList()
    expect(list.map((r) => r.title)).toEqual(['Easy series', 'Hard series'])
    expect(list[0].tiers.known.tokenCount).toBe(90)

    db.prepare('DELETE FROM media_item WHERE id = ?').run(hard)
    const after = coverageRepo.coverageList()
    expect(after).toHaveLength(2)
    expect(after.find((r) => r.mediaId === hard)!.title).toBe('(deleted)')
  })

  it('is empty before any scan', () => {
    expect(coverageRepo.coverageList()).toEqual([])
  })
})

describe('removeScan / tiersForWords', () => {
  it('removeScan clears both tables', () => {
    const id = insertMedia('Gone')
    coverageRepo.saveScan(id, SCAN)
    coverageRepo.removeScan(id)
    expect(coverageRepo.coverageForMedia(id)).toBeNull()
    expect(
      (db.prepare('SELECT COUNT(*) AS n FROM jp_coverage_word WHERE media_id = ?').get(id) as {
        n: number
      }).n
    ).toBe(0)
  })

  it('tiersForWords tiers a batch and omits words with no card', () => {
    lesson({ courseTitle: 'Known', learned: true, cards: [{ front: '魔法', back: 'magic' }] })
    lesson({ courseTitle: 'Draft', learned: false, cards: [{ front: '冒険', back: 'adventure' }] })
    graduate('魔法')

    const tiers = coverageRepo.tiersForWords(['魔法', '冒険', '竜'])
    expect(tiers.get('魔法')).toBe('known')
    expect(tiers.get('冒険')).toBe('unstarted')
    expect(tiers.has('竜')).toBe(false)
    expect(coverageRepo.tiersForWords([]).size).toBe(0)
  })
})

describe('projection (jpdb-style "what learning buys you")', () => {
  it('cumulates not-yet-known words by count, same denominator as tiers', () => {
    const mediaId = insertMedia('Berserk')
    lesson({ courseTitle: 'C', learned: true, cards: [{ front: '魔法', back: 'magic' }] })
    graduate('魔法') // known: 30 of 50 learnable tokens
    coverageRepo.saveScan(mediaId, SCAN)

    const detail = coverageRepo.coverageForMedia(mediaId)!
    const totalTokens =
      detail.tiers.known.tokenCount +
      detail.tiers.learning.tokenCount +
      detail.tiers.unstarted.tokenCount +
      detail.tiers.unknown.tokenCount
    expect(totalTokens).toBe(50)
    // 3 not-known words (剣 12, 冒険 5, 竜 3) -> one step covering all of them.
    expect(detail.projection).toHaveLength(1)
    expect(detail.projection[0]).toEqual({ learnWords: 3, share: 1 })
  })

  it('projection shares are monotonic and bounded by 1', () => {
    const mediaId = insertMedia('Vinland')
    const counts = new Map<string, number>()
    for (let i = 0; i < 30; i++) counts.set(`言葉${i}`, 30 - i)
    coverageRepo.saveScan(mediaId, {
      counts,
      tokenCount: [...counts.values()].reduce((a, b) => a + b, 0),
      chaptersScanned: 1
    })
    const detail = coverageRepo.coverageForMedia(mediaId)!
    expect(detail.projection.length).toBeGreaterThan(1)
    let prev = 0
    for (const step of detail.projection) {
      expect(step.share).toBeGreaterThanOrEqual(prev)
      expect(step.share).toBeLessThanOrEqual(1)
      prev = step.share
    }
    // First step = top 10 words by count.
    expect(detail.projection[0].learnWords).toBe(10)
  })
})

describe('knownWordSet', () => {
  it('honors the tier floor', () => {
    lesson({
      courseTitle: 'K',
      learned: true,
      cards: [
        { front: '魔法', back: 'magic' },
        { front: '剣', back: 'sword' }
      ]
    })
    graduate('魔法') // known(3); 剣 stays learning-tier(2)
    expect(coverageRepo.knownWordSet(3)).toEqual(new Set(['魔法']))
    expect(coverageRepo.knownWordSet(2)).toEqual(new Set(['魔法', '剣']))
  })
})

// The deck is not the whole of what the user knows. Everything downstream —
// comprehension, the coverage list and jpFeed's known set — reads these tiers.
describe('known-word baseline', () => {
  it('is off by default, so no number changes silently', () => {
    seedFreq(['の', 'に', '魔法'])
    lesson({ courseTitle: 'K', learned: true, cards: [{ front: '剣', back: 'sword' }] })
    graduate('剣')
    expect(coverageRepo.baselineSize()).toBe(0)
    expect(coverageRepo.knownWordSet(3)).toEqual(new Set(['剣']))
  })

  it('counts the top N frequency words as known', () => {
    seedFreq(['の', 'に', '魔法', '希少'])
    setBaseline(3)
    expect(coverageRepo.knownWordSet(3)).toEqual(new Set(['の', 'に', '魔法']))
    // Past the cutoff stays unknown.
    expect(coverageRepo.knownWordSet(3).has('希少')).toBe(false)
  })

  it('can only raise a word, never lower one', () => {
    seedFreq(['魔法'])
    setBaseline(1)
    // 魔法 also has a card in an UNLEARNED lesson (tier 1, the prep-deck case).
    lesson({ courseTitle: 'Prep', learned: false, cards: [{ front: '魔法', back: 'magic' }] })
    expect(coverageRepo.knownWordSet(3)).toEqual(new Set(['魔法']))
  })

  it('rebuilds when the setting changes', () => {
    seedFreq(['の', 'に', '魔法'])
    setBaseline(1)
    expect(coverageRepo.knownWordSet(3)).toEqual(new Set(['の']))
    setBaseline(3)
    expect(coverageRepo.knownWordSet(3)).toEqual(new Set(['の', 'に', '魔法']))
    setBaseline(0)
    expect(coverageRepo.knownWordSet(3)).toEqual(new Set())
  })

  it('moves a series comprehension score', () => {
    const mediaId = insertMedia('Berserk')
    coverageRepo.saveScan(mediaId, {
      counts: new Map([['魔法', 5], ['剣', 5]]),
      tokenCount: 10,
      chaptersScanned: 1
    })
    expect(coverageRepo.coverageForMedia(mediaId)!.tiers.known.tokenCount).toBe(0)
    seedFreq(['魔法'])
    setBaseline(1)
    expect(coverageRepo.coverageForMedia(mediaId)!.tiers.known.tokenCount).toBe(5)
  })
})

describe('markWordsKnown', () => {
  it('files words as review cards that count as known immediately', () => {
    expect(jp.markWordsKnown([{ front: '希少' }, { front: '幽霊' }])).toBe(2)
    expect(coverageRepo.knownWordSet(3)).toEqual(new Set(['希少', '幽霊']))
  })

  it('never duplicates a word that already has a card anywhere', () => {
    lesson({ courseTitle: 'K', learned: true, cards: [{ front: '剣', back: 'sword' }] })
    expect(jp.markWordsKnown([{ front: '剣' }, { front: '剣' }, { front: '  ' }])).toBe(0)
    expect(db.prepare("SELECT COUNT(*) AS n FROM jp_card WHERE front = '剣'").get()).toEqual({ n: 1 })
  })

  it('does not queue them for study — not today, not ever', () => {
    jp.markWordsKnown([{ front: '希少' }])
    expect(jp.reviewQueue(10)).toEqual({ due: [], fresh: [] })
    // The original bug: due_at was now+1day, so the word came back tomorrow as
    // an unanswerable card. Drive the clock forward instead of trusting t=0.
    for (const offset of ['+2 days', '+1 year', '+50 years']) {
      const due = db
        .prepare(
          `SELECT COUNT(*) AS n FROM jp_card k JOIN jp_lesson l ON l.id = k.lesson_id
           WHERE l.learned = 1 AND k.status IN ('learning','review')
             AND k.due_at <= datetime('now', ?)`
        )
        .get(offset) as { n: number }
      expect(due.n, `due at ${offset}`).toBe(0)
    }
  })

  it('gives them a readable back, so the lesson list is not a wall of blanks', () => {
    jp.markWordsKnown([{ front: '希少' }])
    const back = db.prepare("SELECT back FROM jp_card WHERE front = '希少'").get() as {
      back: string
    }
    expect(back.back.length).toBeGreaterThan(0)
  })

  it('does not credit the checklist\'s "learn a lesson" item', () => {
    jp.markWordsKnown([{ front: '希少' }])
    const learned = db
      .prepare('SELECT COUNT(*) AS n FROM jp_lesson WHERE learned = 1 AND learned_at IS NOT NULL')
      .get() as { n: number }
    expect(learned.n).toBe(0)
  })
})
