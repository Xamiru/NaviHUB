import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
// seriesText pulls in the manga/epub stack transitively; the repo never calls it
// beyond isLearnableWord, which is pure.
vi.mock('../src/main/files', () => ({ mangaRootDir: () => '/nowhere' }))
vi.mock('../src/main/tokenizer', () => ({ tokenize: async () => [] }))

import * as coverageRepo from '../src/main/repos/coverageRepo'
import * as jp from '../src/main/repos/japaneseRepo'

beforeEach(() => {
  db = createTestDb()
})

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
