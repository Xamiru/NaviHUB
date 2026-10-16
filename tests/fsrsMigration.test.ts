import { beforeEach, describe, expect, it } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import { migrateToFsrs, replayMemory } from '../src/main/db/fsrsMigration'

let db: Database.Database

beforeEach(() => {
  db = createTestDb()
  db.exec(`INSERT INTO jp_course (id, title) VALUES (1, 'C');
    INSERT INTO jp_lesson (id, course_id, kind, title, learned) VALUES (1, 1, 'vocab', 'L', 1);`)
})

const log = (cardId: number, grade: string, at: string) =>
  db.prepare('INSERT INTO jp_review_log (card_id, grade, reviewed_at, interval_days, ease) VALUES (?, ?, ?, 1, 2.5)').run(cardId, grade, at)

describe('migrateToFsrs', () => {
  it('derives memory state from the log, leaving the schedule as it was', () => {
    db.exec(`INSERT INTO jp_card (id, lesson_id, front, back, status, reps, interval_days, due_at)
      VALUES (1, 1, 'a', 'b', 'review', 3, 9, '2026-11-01 00:00:00')`)
    log(1, 'good', '2026-10-01 10:00:00')
    log(1, 'good', '2026-10-01 10:10:00')
    log(1, 'good', '2026-10-04 10:00:00')
    migrateToFsrs(db)
    const row = db.prepare('SELECT stability, fsrs_difficulty, status, interval_days, due_at FROM jp_card WHERE id = 1').get() as Record<string, unknown>
    const expected = replayMemory([
      { grade: 'good', reviewed_at: '2026-10-01 10:00:00' },
      { grade: 'good', reviewed_at: '2026-10-01 10:10:00' },
      { grade: 'good', reviewed_at: '2026-10-04 10:00:00' }
    ])!
    expect(row.stability).toBeCloseTo(expected.stability, 6)
    expect(row.fsrs_difficulty).toBeCloseTo(expected.difficulty, 6)
    expect(row).toMatchObject({ status: 'review', interval_days: 9, due_at: '2026-11-01 00:00:00' })
  })

  it('replays only the run since the last reset', () => {
    db.exec(`INSERT INTO jp_card (id, lesson_id, front, back, status, reps, interval_days) VALUES (2, 1, 'a', 'b', 'review', 1, 1)`)
    log(2, 'again', '2026-09-01 10:00:00') // before a reset: not this run
    log(2, 'again', '2026-09-02 10:00:00')
    log(2, 'easy', '2026-10-01 10:00:00')
    migrateToFsrs(db)
    const row = db.prepare('SELECT stability FROM jp_card WHERE id = 2').get() as { stability: number }
    expect(row.stability).toBeCloseTo(replayMemory([{ grade: 'easy', reviewed_at: '2026-10-01 10:00:00' }])!.stability, 6)
  })

  it('falls back to interval and ease for a card with state but no log, and skips new cards', () => {
    db.exec(`INSERT INTO jp_card (id, lesson_id, front, back, status, reps, interval_days, ease)
        VALUES (3, 1, 'known', 'b', 'review', 1, 36500, 2.5);
      INSERT INTO jp_card (id, lesson_id, front, back) VALUES (4, 1, 'fresh', 'b');`)
    migrateToFsrs(db)
    expect(db.prepare('SELECT stability, fsrs_difficulty FROM jp_card WHERE id = 3').get()).toEqual({
      stability: 36500,
      fsrs_difficulty: 5
    })
    expect(db.prepare('SELECT stability FROM jp_card WHERE id = 4').get()).toEqual({ stability: null })
  })

  it('runs once per deck and covers English words', () => {
    db.exec(`INSERT INTO en_word (id, word, meaning, status, reps, interval_days) VALUES (1, 'w', 'm', 'review', 1, 4)`)
    db.prepare("INSERT INTO en_review_log (word_id, grade, reviewed_at, interval_days, ease) VALUES (1, 'good', '2026-10-01 00:00:00', 4, 2.5)").run()
    migrateToFsrs(db)
    const first = db.prepare('SELECT stability FROM en_word WHERE id = 1').get() as { stability: number }
    expect(first.stability).toBeGreaterThan(0)
    db.prepare('UPDATE en_word SET stability = NULL').run()
    migrateToFsrs(db) // flagged: no second pass
    expect(db.prepare('SELECT stability FROM en_word WHERE id = 1').get()).toEqual({ stability: null })
  })
})
