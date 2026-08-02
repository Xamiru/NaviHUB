import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))

import {
  listWords,
  reviewQueue,
  saveWord,
  saveWords,
  srsStats,
  submitReview
} from '../src/main/repos/englishRepo'

beforeEach(() => {
  db = createTestDb()
})

describe('en_word as the SRS deck', () => {
  it('a saved word starts as a new card', () => {
    const id = saveWord({ word: 'ubiquitous', meaning: 'Present everywhere.' })
    const w = listWords()[0]
    expect(w.id).toBe(id)
    expect(w.status).toBe('new')
    expect(w.dueAt).toBeNull()
    expect(w.ease).toBe(2.5)
  })

  it('submitReview writes SRS state, due_at and a log row', () => {
    const id = saveWord({ word: 'ephemeral', meaning: 'Lasting a short time.' })
    const outcome = submitReview(id, 'good')
    expect(outcome.wordId).toBe(id)
    expect(outcome.status).toBe('learning')
    const row = db.prepare('SELECT * FROM en_word WHERE id = ?').get(id) as Record<string, unknown>
    expect(row.status).toBe('learning')
    expect(row.reps).toBe(1)
    expect(row.due_at).toBeTruthy()
    expect(row.last_reviewed_at).toBeTruthy()
    const logs = db.prepare('SELECT * FROM en_review_log WHERE word_id = ?').all(id)
    expect(logs).toHaveLength(1)
  })

  it('easy on a new card graduates it straight to review', () => {
    const id = saveWord({ word: 'lucid', meaning: 'Clear.' })
    const outcome = submitReview(id, 'easy')
    expect(outcome.status).toBe('review')
    expect(outcome.intervalDays).toBeGreaterThanOrEqual(4)
  })

  it('reviewQueue: due cards ordered by due_at, fresh FIFO by save order', () => {
    const a = saveWord({ word: 'alpha', meaning: 'First.' })
    const b = saveWord({ word: 'beta', meaning: 'Second.' })
    saveWord({ word: 'gamma', meaning: 'Third.' })
    // Make a and b due in the past, a later than b.
    db.prepare(
      "UPDATE en_word SET status = 'review', due_at = datetime('now', ?) WHERE id = ?"
    ).run('-1 hours', a)
    db.prepare(
      "UPDATE en_word SET status = 'learning', due_at = datetime('now', ?) WHERE id = ?"
    ).run('-2 hours', b)
    const q = reviewQueue(10)
    expect(q.due.map((w) => w.word)).toEqual(['beta', 'alpha'])
    expect(q.fresh.map((w) => w.word)).toEqual(['gamma'])
  })

  it('a future-due card stays out of the queue', () => {
    const id = saveWord({ word: 'delta', meaning: 'Fourth.' })
    submitReview(id, 'easy') // review, due in 4 days
    const q = reviewQueue(10)
    expect(q.due).toHaveLength(0)
    expect(q.fresh).toHaveLength(0)
  })

  it('srsStats counts due/new/total and todays distinct reviews', () => {
    const a = saveWord({ word: 'alpha', meaning: 'First.' })
    saveWord({ word: 'beta', meaning: 'Second.' })
    submitReview(a, 'good')
    submitReview(a, 'good')
    db.prepare("UPDATE en_word SET due_at = datetime('now', '-1 hours') WHERE id = ?").run(a)
    const s = srsStats()
    expect(s.totalCount).toBe(2)
    expect(s.newCount).toBe(1)
    expect(s.dueCount).toBe(1)
    expect(s.reviewedToday).toBe(1) // distinct words, not review count
  })

  it('saveWords batches idempotently and reports only new rows', () => {
    saveWord({ word: 'alpha', meaning: 'First.' })
    const added = saveWords([
      { word: 'alpha', meaning: 'First.' }, // duplicate
      { word: 'beta', meaning: 'Second.' },
      { word: '  ', meaning: 'blank' } // invalid, skipped
    ])
    expect(added).toBe(1)
    expect(listWords()).toHaveLength(2)
  })
})
