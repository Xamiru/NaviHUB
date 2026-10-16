import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))

import * as jp from '../src/main/repos/japaneseRepo'
import { buildDirectionPrompt } from '../src/shared/cloze'
import { eligibleDirections } from '../src/shared/japanese/reviewDirections'

beforeEach(() => {
  db = createTestDb()
  db.exec(`INSERT INTO jp_course (id, title) VALUES (1, 'C');
    INSERT INTO jp_lesson (id, course_id, kind, title, learned) VALUES (1, 1, 'vocab', 'Words', 1);
    INSERT INTO jp_lesson (id, course_id, kind, title, learned) VALUES (2, 1, 'grammar', 'Grammar', 1);
    INSERT INTO jp_card (id, lesson_id, front, reading, back) VALUES (1, 1, '猫', 'ねこ', 'cat');
    INSERT INTO jp_card (id, lesson_id, front, reading, back) VALUES (2, 1, 'ありがとう', NULL, 'thanks');
    INSERT INTO jp_card (id, lesson_id, front, reading, back) VALUES (3, 2, '行く。', 'いく。', 'Go.');`)
})

// A card already in review at `interval` days, last answered that long ago.
function mature(id: number, interval = 5): void {
  db.prepare(
    `UPDATE jp_card SET status = 'review', reps = 3, interval_days = ?, stability = ?, fsrs_difficulty = 5,
       last_reviewed_at = datetime('now', ?), due_at = datetime('now', '-1 minutes') WHERE id = ?`
  ).run(interval, interval, `-${interval} days`, id)
}

const directions = (cardId: number) =>
  (db.prepare('SELECT direction FROM jp_card_review WHERE card_id = ? ORDER BY direction').all(cardId) as {
    direction: string
  }[]).map((r) => r.direction)

describe('extra review directions', () => {
  it('decides eligibility from the lesson and the word', () => {
    expect(eligibleDirections({ front: '猫', reading: 'ねこ' }, 'vocab')).toEqual(['production', 'reading'])
    expect(eligibleDirections({ front: 'ありがとう', reading: null }, 'vocab')).toEqual(['production'])
    expect(eligibleDirections({ front: '行く。', reading: 'いく。' }, 'grammar')).toEqual([])
  })

  it('spawns once recognition reaches the threshold, and only for eligible cards', () => {
    jp.submitReview(1, 'good') // new card: still learning, nothing spawned
    expect(directions(1)).toEqual([])
    mature(1)
    mature(2)
    mature(3)
    jp.submitReview(1, 'good')
    jp.submitReview(2, 'good')
    jp.submitReview(3, 'good')
    expect(directions(1)).toEqual(['production', 'reading'])
    expect(directions(2)).toEqual(['production'])
    expect(directions(3)).toEqual([])
  })

  it('never spawns for words marked already known', () => {
    jp.markWordsKnown([{ front: '犬', reading: 'いぬ' }])
    const known = db.prepare("SELECT id FROM jp_card WHERE front = '犬'").get() as { id: number }
    db.prepare("UPDATE jp_card SET due_at = datetime('now', '-1 minutes') WHERE id = ?").run(known.id)
    jp.submitReview(known.id, 'good')
    expect(directions(known.id)).toEqual([])
  })

  it('serves new directions within the new-card budget and due ones with the due list', () => {
    mature(1)
    jp.submitReview(1, 'good')
    const q = jp.reviewQueue(4)
    // One schedule per word per session: 猫 brings only its first direction.
    expect(q.fresh.map((c) => `${c.id}:${c.direction}`)).toEqual(['2:recognition', '3:recognition', '1:production'])
    expect(jp.stats()).toMatchObject({ newAvailableCount: 2, newDirectionCount: 2 })
    const production = q.fresh.find((c) => c.direction === 'production')!
    expect(production.status).toBe('new')
    expect(production.front).toBe('猫')

    db.exec(`UPDATE jp_card_review SET status = 'review', interval_days = 4, stability = 4,
      due_at = datetime('now', '-1 minutes'), last_reviewed_at = datetime('now', '-4 days') WHERE direction = 'reading'`)
    expect(jp.reviewQueue(0).due.map((c) => c.direction)).toEqual(['reading'])
    expect(jp.stats().dueCount).toBe(1)
  })

  it('answers a direction on its own schedule, logged with the direction, with no ghost', () => {
    mature(1)
    jp.submitReview(1, 'good')
    const cardBefore = db.prepare('SELECT status, interval_days, reps FROM jp_card WHERE id = 1').get()
    const out = jp.submitReview(1, 'again', 'production')
    expect(out.state.status).toBe('learning')
    expect(db.prepare('SELECT status, interval_days, reps FROM jp_card WHERE id = 1').get()).toEqual(cardBefore)
    expect(db.prepare("SELECT reps, status FROM jp_card_review WHERE card_id = 1 AND direction = 'production'").get()).toEqual({
      reps: 1,
      status: 'learning'
    })
    expect(
      db.prepare("SELECT direction FROM jp_review_log ORDER BY id DESC LIMIT 1").get()
    ).toEqual({ direction: 'production' })
    expect(db.prepare('SELECT COUNT(*) AS n FROM jp_ghost').get()).toEqual({ n: 0 })
    // Each direction is its own introduction today.
    expect(jp.stats().introducedToday).toBe(2)
  })

  it('a disabled direction neither spawns nor shows, and keeps its progress', () => {
    db.prepare("INSERT INTO settings (key, value) VALUES ('japanese.direction.reading', '0')").run()
    mature(1)
    jp.submitReview(1, 'good')
    expect(directions(1)).toEqual(['production'])
    db.prepare("INSERT OR IGNORE INTO jp_card_review (card_id, direction) VALUES (1, 'reading')").run()
    expect(jp.reviewQueue(10).fresh.some((c) => c.direction === 'reading')).toBe(false)
    expect(directions(1)).toEqual(['production', 'reading'])
  })

  it('a reset card loses its directions; leeches read recognition answers only', () => {
    mature(1)
    jp.submitReview(1, 'good')
    for (let i = 0; i < 9; i++) jp.submitReview(1, 'again', 'production')
    expect(jp.listLeeches().map((l) => l.id)).toEqual([])
    jp.resetCard(1)
    expect(directions(1)).toEqual([])
  })

  it('never deals two schedules of one word in a session, recognition first', () => {
    mature(1)
    jp.submitReview(1, 'good')
    db.exec(`UPDATE jp_card SET due_at = datetime('now', '-1 minutes') WHERE id = 1;
      UPDATE jp_card_review SET status = 'review', interval_days = 4, stability = 4,
        due_at = datetime('now', '-2 minutes'), last_reviewed_at = datetime('now', '-4 days');`)
    const q = jp.reviewQueue(10)
    expect([...q.due, ...q.fresh].filter((c) => c.id === 1).map((c) => c.direction)).toEqual(['recognition'])
  })

  it('gives a budget of one to a new word, not a direction', () => {
    mature(1)
    jp.submitReview(1, 'good')
    expect(jp.reviewQueue(1).fresh.map((c) => c.direction)).toEqual(['recognition'])
  })

  it('pauses spawning while the new-direction backlog is full', () => {
    const values = Array.from({ length: jp.DIRECTION_BACKLOG_CAP }, (_, i) => `(${100 + i}, 1, 'w${i}', 'b')`).join(',')
    db.exec(`INSERT INTO jp_card (id, lesson_id, front, back) VALUES ${values}`)
    db.exec(
      `INSERT INTO jp_card_review (card_id, direction)
       SELECT id, 'production' FROM jp_card WHERE id >= 100`
    )
    mature(1)
    jp.submitReview(1, 'good')
    expect(directions(1)).toEqual([])
  })

  it('drops a direction a card edit made impossible', () => {
    mature(1)
    jp.submitReview(1, 'good')
    jp.updateCard(1, { reading: null })
    expect(directions(1)).toEqual(['production'])
  })

  it('keeps retention to recognition answers', () => {
    mature(1)
    jp.submitReview(1, 'good')
    for (let i = 0; i < 3; i++) jp.submitReview(1, 'again', 'production')
    expect(jp.statsDetail().retention.strict).toBe(1)
  })

  it('builds direction prompts', () => {
    const production = buildDirectionPrompt({ front: '猫', reading: 'ねこ', back: 'cat', pos: 'noun' }, 'production')!
    expect(production.display).toBe('cat')
    expect(production.accept('猫')).toBe(true)
    expect(production.accept('neko')).toBe(true)
    expect(production.accept('いぬ')).toBe(false)
    const reading = buildDirectionPrompt({ front: '猫', reading: 'ねこ', back: 'cat', pos: null }, 'reading')!
    expect(reading.display).toBe('猫')
    expect(reading.accept('ねこ')).toBe(true)
    expect(buildDirectionPrompt({ front: 'ねこ', reading: null, back: 'cat', pos: null }, 'reading')).toBeNull()
  })
})
