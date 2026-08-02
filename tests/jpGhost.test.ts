import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import { GHOST_STEPS } from '../src/shared/srs'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))

import * as jp from '../src/main/repos/japaneseRepo'

beforeEach(() => {
  db = createTestDb()
})

function ghostCount(): number {
  return (db.prepare('SELECT COUNT(*) AS n FROM jp_ghost').get() as { n: number }).n
}
function logCount(): number {
  return (db.prepare('SELECT COUNT(*) AS n FROM jp_review_log').get() as { n: number }).n
}

// A learned lesson with one card, promoted into review state (the lapse test
// only fires for status='review').
function seedReviewCard(): number {
  const courseId = jp.createCourse({ title: 'C', description: null, level: null, difficulty: null })
  const lessonId = jp.createLesson({ courseId, kind: 'vocab', title: 'L', body: null })
  const cardId = jp.createCard(lessonId, { front: '開ける', reading: 'あける', back: 'to open' })
  jp.setLessonLearned(lessonId, true)
  db.prepare(
    `UPDATE jp_card SET status = 'review', interval_days = 10, due_at = datetime('now', '-1 hour')
     WHERE id = ?`
  ).run(cardId)
  return cardId
}

describe('ghost spawning', () => {
  it('spawns on a review-state Again only', () => {
    const cardId = seedReviewCard()
    jp.submitReview(cardId, 'again')
    expect(ghostCount()).toBe(1)
    const row = db.prepare('SELECT remaining FROM jp_ghost WHERE card_id = ?').get(cardId) as {
      remaining: number
    }
    expect(row.remaining).toBe(GHOST_STEPS)
  })

  it('a learning-step miss spawns nothing (not a lapse)', () => {
    const courseId = jp.createCourse({ title: 'C', description: null, level: null, difficulty: null })
    const lessonId = jp.createLesson({ courseId, kind: 'vocab', title: 'L', body: null })
    const cardId = jp.createCard(lessonId, { front: '猫', reading: 'ねこ', back: 'cat' })
    jp.setLessonLearned(lessonId, true)
    jp.submitReview(cardId, 'again') // still new/learning
    expect(ghostCount()).toBe(0)
  })

  it('a re-lapse resets an existing ghost to full steps', () => {
    const cardId = seedReviewCard()
    jp.submitReview(cardId, 'again')
    jp.ghostAnswer(cardId, true) // remaining 2
    // Re-promote and lapse again.
    db.prepare(
      `UPDATE jp_card SET status = 'review', interval_days = 10, due_at = datetime('now', '-1 hour')
       WHERE id = ?`
    ).run(cardId)
    jp.submitReview(cardId, 'again')
    const row = db.prepare('SELECT remaining FROM jp_ghost WHERE card_id = ?').get(cardId) as {
      remaining: number
    }
    expect(row.remaining).toBe(GHOST_STEPS)
  })
})

describe('ghostAnswer', () => {
  it('decrements, dissolves at zero, resets on a miss — and never logs', () => {
    const cardId = seedReviewCard()
    jp.submitReview(cardId, 'again')
    const logsBefore = logCount()

    expect(jp.ghostAnswer(cardId, true)).toEqual({ remaining: GHOST_STEPS - 1, dissolved: false })
    expect(jp.ghostAnswer(cardId, false)).toEqual({ remaining: GHOST_STEPS, dissolved: false })
    expect(jp.ghostAnswer(cardId, true)).toEqual({ remaining: GHOST_STEPS - 1, dissolved: false })
    expect(jp.ghostAnswer(cardId, true)).toEqual({ remaining: GHOST_STEPS - 2, dissolved: false })
    expect(jp.ghostAnswer(cardId, true)).toEqual({ remaining: 0, dissolved: true })
    expect(ghostCount()).toBe(0)
    // Ghost answers write NOTHING to the review log (stats purity).
    expect(logCount()).toBe(logsBefore)
  })

  it('answering a nonexistent ghost is a no-op dissolve', () => {
    expect(jp.ghostAnswer(999, true)).toEqual({ remaining: 0, dissolved: true })
  })
})

describe('ghostQueue', () => {
  it('serves learned, not-currently-due cards; excludes due ones', () => {
    const cardId = seedReviewCard()
    jp.submitReview(cardId, 'again')
    // After the lapse the card is back in learning with a near due date —
    // force two variants: one still-due card must be excluded.
    db.prepare(`UPDATE jp_card SET status = 'review', due_at = datetime('now', '+5 days') WHERE id = ?`).run(cardId)
    let queue = jp.ghostQueue(5)
    expect(queue.map((g) => g.id)).toEqual([cardId])
    expect(queue[0].ghostRemaining).toBe(GHOST_STEPS)
    expect(queue[0].lessonTitle).toBe('L')

    db.prepare(`UPDATE jp_card SET due_at = datetime('now', '-1 hour') WHERE id = ?`).run(cardId)
    queue = jp.ghostQueue(5)
    expect(queue).toEqual([]) // it's in the real due list now
  })

  it('excludes unlearned lessons and orphans', () => {
    const cardId = seedReviewCard()
    jp.submitReview(cardId, 'again')
    db.prepare(`UPDATE jp_card SET due_at = datetime('now', '+5 days') WHERE id = ?`).run(cardId)
    // Unlearn the lesson → ghost hidden.
    const lessonId = (db.prepare('SELECT lesson_id FROM jp_card WHERE id = ?').get(cardId) as { lesson_id: number }).lesson_id
    jp.setLessonLearned(lessonId, false)
    expect(jp.ghostQueue(5)).toEqual([])
    // Orphan (card gone entirely, row left behind manually) never serves.
    db.prepare('DELETE FROM jp_card WHERE id = ?').run(cardId)
    expect(jp.ghostQueue(5)).toEqual([])
  })
})

describe('cleanup', () => {
  it('removeCard and resetCard dissolve the ghost', () => {
    const a = seedReviewCard()
    jp.submitReview(a, 'again')
    expect(ghostCount()).toBe(1)
    jp.resetCard(a)
    expect(ghostCount()).toBe(0)

    const b = seedReviewCard()
    jp.submitReview(b, 'again')
    jp.removeCard(b)
    expect(ghostCount()).toBe(0)
  })

  it('removeLesson/removeCourse sweep orphaned ghosts', () => {
    const cardId = seedReviewCard()
    jp.submitReview(cardId, 'again')
    const row = db
      .prepare(
        `SELECT l.id AS lesson_id, l.course_id FROM jp_card k JOIN jp_lesson l ON l.id = k.lesson_id WHERE k.id = ?`
      )
      .get(cardId) as { lesson_id: number; course_id: number }
    jp.removeLesson(row.lesson_id)
    expect(ghostCount()).toBe(0)
  })
})

describe('statsDetail purity', () => {
  it('ghost answers change no stats', () => {
    const cardId = seedReviewCard()
    jp.submitReview(cardId, 'again')
    const before = jp.statsDetail()
    jp.ghostAnswer(cardId, true)
    jp.ghostAnswer(cardId, false)
    const after = jp.statsDetail()
    expect(after.totalReviews).toBe(before.totalReviews)
    expect(after.gradeCounts).toEqual(before.gradeCounts)
    expect(after.retention).toEqual(before.retention)
  })
})

describe('statsDetail retention + journey', () => {
  it('computes strict vs lenient retention and journey counts', () => {
    const cardId = seedReviewCard()
    // 4 reviews: good, hard, again, easy -> lenient 3/4, strict 2/4.
    for (const grade of ['good', 'hard', 'again', 'easy'] as const) {
      db.prepare(
        `UPDATE jp_card SET status = 'review', interval_days = 10, due_at = datetime('now','-1 hour') WHERE id = ?`
      ).run(cardId)
      jp.submitReview(cardId, grade)
    }
    const detail = jp.statsDetail()
    expect(detail.retention.lenient).toBeCloseTo(3 / 4, 5)
    expect(detail.retention.strict).toBeCloseTo(2 / 4, 5)
    // Everything happened just now -> the 30d window matches.
    expect(detail.retention.strict30).toBeCloseTo(2 / 4, 5)
    expect(detail.journey.distinctCardsReviewed).toBe(1)
    expect(detail.journey.lessonsLearned).toBe(1)
    expect(detail.journey.wordsMined).toBe(0)
  })

  it('retention is null with no reviews; mined words count once via OR', () => {
    const empty = jp.statsDetail()
    expect(empty.retention.strict).toBeNull()

    // A card in the mining inbox AND carrying a source id counts ONCE.
    const inbox = jp.ensureMiningInbox()
    jp.createCard(inbox.lessonId, { front: '剣', back: 'sword', sourceMediaId: 42 })
    jp.createCard(inbox.lessonId, { front: '竜', back: 'dragon' })
    const detail = jp.statsDetail()
    expect(detail.journey.wordsMined).toBe(2)
  })
})
