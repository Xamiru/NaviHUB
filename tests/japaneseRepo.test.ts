import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import * as jp from '../src/main/repos/japaneseRepo'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

beforeEach(() => {
  db = createTestDb()
})

function seedCourseWithLesson(learned = false): { courseId: number; lessonId: number } {
  const courseId = jp.createCourse({ title: 'N5' })
  const lessonId = jp.createLesson({
    courseId,
    kind: 'vocab',
    title: 'Greetings',
    cards: [
      { front: 'こんにちは', reading: 'こんにちは', back: 'hello', pos: 'expression' },
      { front: '犬', reading: 'いぬ', back: 'dog', pos: 'noun' },
      { front: '猫', reading: 'ねこ', back: 'cat', pos: 'noun' }
    ]
  })
  if (learned) jp.setLessonLearned(lessonId, true)
  return { courseId, lessonId }
}

describe('japaneseRepo — courses & lessons', () => {
  it('creates a course with lessons and counts them in summaries', () => {
    const { courseId, lessonId } = seedCourseWithLesson(true)
    jp.createLesson({ courseId, kind: 'grammar', title: 'は topic', body: 'The topic particle…' })

    const [summary] = jp.listCourses()
    expect(summary.id).toBe(courseId)
    expect(summary.lessonCount).toBe(2)
    expect(summary.learnedLessonCount).toBe(1)
    expect(summary.cardCount).toBe(3)

    const detail = jp.getCourse(courseId)!
    expect(detail.lessons.map((l) => l.title)).toEqual(['Greetings', 'は topic'])
    expect(detail.lessons[0].cardCount).toBe(3)
    expect(detail.lessons[0].learned).toBe(true)

    const lesson = jp.getLesson(lessonId)!
    expect(lesson.courseTitle).toBe('N5')
    expect(lesson.cards.map((c) => c.back)).toEqual(['hello', 'dog', 'cat'])
    expect(lesson.cards[0].status).toBe('new')
  })

  it('deleting a course cascades lessons, cards and review logs', () => {
    const { courseId, lessonId } = seedCourseWithLesson(true)
    const card = jp.getLesson(lessonId)!.cards[0]
    jp.submitReview(card.id, 'good')

    jp.removeCourse(courseId)
    expect(jp.getCourse(courseId)).toBeNull()
    expect(db.prepare('SELECT COUNT(*) AS n FROM jp_lesson').get()).toEqual({ n: 0 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM jp_card').get()).toEqual({ n: 0 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM jp_review_log').get()).toEqual({ n: 0 })
  })

  it('card CRUD appends in order and patches content fields only', () => {
    const { lessonId } = seedCourseWithLesson()
    const newId = jp.createCard(lessonId, { front: '鳥', reading: 'とり', back: 'bird' })
    let cards = jp.getLesson(lessonId)!.cards
    expect(cards.at(-1)!.id).toBe(newId)
    expect(cards.at(-1)!.sortOrder).toBe(3)

    jp.updateCard(newId, { back: 'bird 🐦', notes: 'also chicken in some contexts' })
    cards = jp.getLesson(lessonId)!.cards
    expect(cards.at(-1)!.back).toBe('bird 🐦')

    jp.removeCard(newId)
    expect(jp.getLesson(lessonId)!.cards).toHaveLength(3)
  })
})

describe('japaneseRepo — learned gating', () => {
  it('unlearned lessons feed neither the review queue nor the quiz pool', () => {
    seedCourseWithLesson(false)
    expect(jp.reviewQueue(10)).toEqual({ due: [], fresh: [] })
    expect(jp.quizPool()).toHaveLength(0)
  })

  it('marking learned exposes cards; un-learning parks them with SRS state intact', () => {
    const { lessonId } = seedCourseWithLesson(true)
    expect(jp.reviewQueue(10).fresh).toHaveLength(3)
    expect(jp.quizPool()).toHaveLength(3)

    const card = jp.reviewQueue(10).fresh[0]
    jp.submitReview(card.id, 'good')

    jp.setLessonLearned(lessonId, false)
    expect(jp.reviewQueue(10)).toEqual({ due: [], fresh: [] })
    expect(jp.quizPool()).toHaveLength(0)

    jp.setLessonLearned(lessonId, true)
    const restored = jp.getLesson(lessonId)!.cards.find((c) => c.id === card.id)!
    expect(restored.status).toBe('learning')
    expect(restored.reps).toBe(1)
  })

  it('quizPool filters by course and lesson kind', () => {
    const { courseId } = seedCourseWithLesson(true)
    const grammarId = jp.createLesson({
      courseId,
      kind: 'grammar',
      title: 'は',
      body: '…',
      cards: [{ front: '私は学生です。', reading: 'わたしはがくせいです。', back: 'I am a student.' }]
    })
    jp.setLessonLearned(grammarId, true)

    expect(jp.quizPool()).toHaveLength(4)
    expect(jp.quizPool({ kind: 'grammar' })).toHaveLength(1)
    expect(jp.quizPool({ kind: 'vocab' })).toHaveLength(3)
    expect(jp.quizPool({ courseId: courseId + 999 })).toHaveLength(0)
    expect(jp.quizPool({ kind: 'grammar' })[0].lessonTitle).toBe('は')
  })
})

describe('japaneseRepo — review flow', () => {
  it('submitReview persists SRS state, logs the review, and schedules due_at', () => {
    seedCourseWithLesson(true)
    const card = jp.reviewQueue(10).fresh[0]

    const outcome = jp.submitReview(card.id, 'good')
    expect(outcome.status).toBe('learning')

    const row = db.prepare('SELECT * FROM jp_card WHERE id = ?').get(card.id) as Record<
      string,
      unknown
    >
    expect(row.status).toBe('learning')
    expect(row.learning_step).toBe(1)
    expect(row.reps).toBe(1)
    expect(row.due_at).toBe(outcome.dueAt)
    expect(row.last_reviewed_at).not.toBeNull()

    const logs = db.prepare('SELECT * FROM jp_review_log WHERE card_id = ?').all(card.id)
    expect(logs).toHaveLength(1)
    expect((logs[0] as Record<string, unknown>).grade).toBe('good')
  })

  it('cards graded into the future leave the due queue; overdue cards enter it', () => {
    seedCourseWithLesson(true)
    const card = jp.reviewQueue(10).fresh[0]
    jp.submitReview(card.id, 'easy') // graduates 4 days out
    expect(jp.reviewQueue(10).due).toHaveLength(0)

    // Pull the card back into the past — it must surface as due.
    db.prepare(`UPDATE jp_card SET due_at = datetime('now', '-1 hour') WHERE id = ?`).run(card.id)
    const due = jp.reviewQueue(10).due
    expect(due.map((c) => c.id)).toEqual([card.id])
  })

  it('reviewQueue caps fresh cards at newLimit, in lesson order', () => {
    seedCourseWithLesson(true)
    const queue = jp.reviewQueue(2)
    expect(queue.fresh).toHaveLength(2)
    expect(queue.fresh.map((c) => c.front)).toEqual(['こんにちは', '犬'])
    expect(jp.reviewQueue(0).fresh).toHaveLength(0)
  })

  it('kanji lessons: on/kun round-trip and quizPool kind filter', () => {
    const { courseId } = seedCourseWithLesson(true)
    const kanjiId = jp.createLesson({
      courseId,
      kind: 'kanji',
      title: 'Numbers',
      cards: [
        {
          front: '一',
          reading: 'いち',
          back: 'one',
          onyomi: 'イチ',
          kunyomi: 'ひと(つ)',
          exampleJp: '一つ',
          exampleReading: 'ひとつ',
          exampleEn: 'one (thing)'
        }
      ]
    })
    jp.setLessonLearned(kanjiId, true)

    const card = jp.getLesson(kanjiId)!.cards[0]
    expect(card.onyomi).toBe('イチ')
    expect(card.kunyomi).toBe('ひと(つ)')

    jp.updateCard(card.id, { kunyomi: 'ひと(つ), ひい' })
    expect(jp.getLesson(kanjiId)!.cards[0].kunyomi).toBe('ひと(つ), ひい')

    expect(jp.quizPool({ kind: 'kanji' })).toHaveLength(1)
    expect(jp.quizPool({ kind: 'vocab' })).toHaveLength(3)
  })

  it('mined cards resolve their source title and tolerate media deletion', () => {
    const { lessonId } = seedCourseWithLesson(true)
    const mediaId = Number(
      db
        .prepare(`INSERT INTO media_item (media_type, title, cover_path) VALUES ('manga', 'Yotsuba&!', 'x.jpg')`)
        .run().lastInsertRowid
    )
    const cardId = jp.createCard(lessonId, {
      front: 'よつば',
      back: 'Yotsuba (name)',
      sourceMediaId: mediaId
    })

    let card = jp.getLesson(lessonId)!.cards.find((c) => c.id === cardId)!
    expect(card.sourceTitle).toBe('Yotsuba&!')
    expect(card.sourceMediaType).toBe('manga')
    expect(card.sourceCoverPath).toBe('x.jpg')
    expect(jp.quizPool().find((c) => c.id === cardId)!.sourceTitle).toBe('Yotsuba&!')
    expect(jp.reviewQueue(10).fresh.find((c) => c.id === cardId)!.sourceTitle).toBe('Yotsuba&!')

    // No FK by design — deleting the media item leaves the card readable with
    // the source resolved to nulls.
    db.prepare('DELETE FROM media_item WHERE id = ?').run(mediaId)
    card = jp.getLesson(lessonId)!.cards.find((c) => c.id === cardId)!
    expect(card.sourceMediaId).toBe(mediaId)
    expect(card.sourceTitle).toBeNull()
  })

  it('ensureMiningInbox is idempotent and its cards enter review immediately', () => {
    const first = jp.ensureMiningInbox()
    const again = jp.ensureMiningInbox()
    expect(again).toEqual(first)

    const lesson = jp.getLesson(first.lessonId)!
    expect(lesson.kind).toBe('vocab')
    expect(lesson.learned).toBe(true)

    const cardId = jp.createCard(first.lessonId, { front: '沼', reading: 'ぬま', back: 'swamp' })
    expect(jp.reviewQueue(10).fresh.map((c) => c.id)).toContain(cardId)

    // Deleting the inbox regenerates a fresh one on the next call.
    jp.removeCourse(first.courseId)
    const rebuilt = jp.ensureMiningInbox()
    expect(rebuilt.courseId).not.toBe(first.courseId)
    expect(jp.getLesson(rebuilt.lessonId)!.learned).toBe(true)
  })

  it('stats reflects due/new counts, lesson progress and today’s reviews', () => {
    const { lessonId } = seedCourseWithLesson(true)
    jp.createLesson({ courseId: jp.listCourses()[0].id, kind: 'grammar', title: 'x', body: 'y' })

    let s = jp.stats()
    expect(s).toMatchObject({
      dueCount: 0,
      newAvailableCount: 3,
      learnedLessons: 1,
      totalLessons: 2,
      totalCards: 3,
      reviewsToday: 0
    })

    const card = jp.getLesson(lessonId)!.cards[0]
    jp.submitReview(card.id, 'again')
    db.prepare(`UPDATE jp_card SET due_at = datetime('now', '-1 minute') WHERE id = ?`).run(card.id)

    s = jp.stats()
    expect(s.dueCount).toBe(1)
    expect(s.newAvailableCount).toBe(2)
    expect(s.reviewsToday).toBe(1)
  })
})
