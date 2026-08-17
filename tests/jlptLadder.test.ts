import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import {
  PASSED_INTERVAL_DAYS,
  currentLevel,
  levelComplete,
  parseJlptLevel,
  type JlptLevelProgress
} from '../src/shared/jlptLevels'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))

import * as japaneseRepo from '../src/main/repos/japaneseRepo'

beforeEach(() => {
  db = createTestDb()
})

// A course at `level`, one lesson, and `cards` cards — `passedCount` of which
// have earned a real interval and `seenExtra` of which have been reviewed
// without getting there yet.
function seedCourse(
  level: string | null,
  cards: number,
  passedCount = 0,
  seenExtra = 0
): void {
  const courseId = Number(
    db
      .prepare('INSERT INTO jp_course (title, level, sort_order) VALUES (?, ?, 0)')
      .run(`Course ${level ?? 'none'}`, level).lastInsertRowid
  )
  const lessonId = Number(
    db
      .prepare("INSERT INTO jp_lesson (course_id, kind, title, sort_order) VALUES (?, 'vocab', ?, 0)")
      .run(courseId, 'L1').lastInsertRowid
  )
  for (let i = 0; i < cards; i++) {
    const passed = i < passedCount
    const seen = passed || i < passedCount + seenExtra
    db.prepare(
      `INSERT INTO jp_card (lesson_id, front, back, status, interval_days, reps)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).run(
      lessonId,
      `front${i}`,
      `back${i}`,
      passed ? 'review' : seen ? 'learning' : 'new',
      passed ? PASSED_INTERVAL_DAYS : 0,
      seen ? 3 : 0
    )
  }
}

const level = (ladder: { levels: JlptLevelProgress[] }, l: string): JlptLevelProgress =>
  ladder.levels.find((x) => x.level === l)!

describe('parseJlptLevel', () => {
  it('takes the first tier a label names', () => {
    expect(parseJlptLevel('N5')).toBe('N5')
    expect(parseJlptLevel('N5+')).toBe('N5')
    expect(parseJlptLevel('N4–N3')).toBe('N4')
    expect(parseJlptLevel('N3–N2')).toBe('N3')
    expect(parseJlptLevel('n1')).toBe('N1')
  })

  it('is null for a label with no tier in it', () => {
    for (const l of [null, undefined, '', 'Mixed', 'Kanji', 'N6', 'Nx']) {
      expect(parseJlptLevel(l)).toBeNull()
    }
  })
})

describe('levelComplete', () => {
  it('clears at 90%, so one stubborn card cannot stall a level', () => {
    expect(levelComplete(9, 10)).toBe(true)
    expect(levelComplete(89, 100)).toBe(false)
    expect(levelComplete(90, 100)).toBe(true)
  })

  it('an empty level is never complete', () => {
    expect(levelComplete(0, 0)).toBe(false)
  })
})

describe('currentLevel', () => {
  const mk = (l: string, cards: number, complete: boolean): JlptLevelProgress => ({
    level: l as JlptLevelProgress['level'],
    cards,
    passed: complete ? cards : 0,
    inProgress: 0,
    untouched: 0,
    pct: complete ? 100 : 0,
    complete
  })

  it('is the easiest level not yet cleared', () => {
    expect(currentLevel([mk('N5', 10, true), mk('N4', 10, false), mk('N3', 10, false)])).toBe('N4')
  })

  it('skips empty levels rather than parking on them', () => {
    // A library that starts at N3 must not read as "you are on N5 forever".
    expect(currentLevel([mk('N5', 0, false), mk('N4', 0, false), mk('N3', 20, false)])).toBe('N3')
  })

  it('settles on the hardest level with cards once everything is cleared', () => {
    expect(currentLevel([mk('N5', 5, true), mk('N4', 5, true)])).toBe('N4')
  })

  it('is null when nothing carries a level', () => {
    expect(currentLevel([mk('N5', 0, false)])).toBeNull()
  })
})

describe('japaneseRepo.jlptLadder', () => {
  it('always returns all five levels, hardest last', () => {
    const ladder = japaneseRepo.jlptLadder()
    expect(ladder.levels.map((l) => l.level)).toEqual(['N5', 'N4', 'N3', 'N2', 'N1'])
    expect(ladder.cards).toBe(0)
    expect(ladder.current).toBeNull()
  })

  it('buckets cards by the tier their course label names', () => {
    seedCourse('N5', 10, 9)
    seedCourse('N5+', 10, 0, 4) // same tier, different label
    seedCourse('N4–N3', 20, 2)

    const ladder = japaneseRepo.jlptLadder()
    expect(level(ladder, 'N5').cards).toBe(20)
    expect(level(ladder, 'N5').passed).toBe(9)
    expect(level(ladder, 'N5').inProgress).toBe(4)
    expect(level(ladder, 'N5').untouched).toBe(7)
    expect(level(ladder, 'N4').cards).toBe(20)
    expect(level(ladder, 'N3').cards).toBe(0) // the range's upper end is not its tier
  })

  it('counts a card as passed only at a real interval', () => {
    seedCourse('N5', 3, 1)
    // A card mid-learning with a long interval field is still not passed.
    db.prepare(`UPDATE jp_card SET status='learning', interval_days=99 WHERE front='front1'`).run()
    expect(level(japaneseRepo.jlptLadder(), 'N5').passed).toBe(1)
  })

  it('reports the current level and the totals across levels', () => {
    seedCourse('N5', 10, 10) // cleared
    seedCourse('N4', 10, 3)
    const ladder = japaneseRepo.jlptLadder()
    expect(level(ladder, 'N5').complete).toBe(true)
    expect(ladder.current).toBe('N4')
    expect(ladder.passed).toBe(13)
    expect(ladder.cards).toBe(20)
  })

  it('counts cards whose course names no tier separately instead of dropping them', () => {
    seedCourse('N5', 5, 5)
    seedCourse('Mixed', 7)
    seedCourse(null, 3)
    const ladder = japaneseRepo.jlptLadder()
    expect(ladder.unlevelled).toBe(10)
    expect(ladder.cards).toBe(5) // levelled totals stay honest
  })
})
