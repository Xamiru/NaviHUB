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

  it('lessonQuizPool serves unlearned lessons and same-course distractors only', () => {
    // NOT learned — the self-check runs before marking learned.
    const { courseId, lessonId } = seedCourseWithLesson(false)
    const otherId = jp.createLesson({
      courseId,
      kind: 'vocab',
      title: 'Food',
      cards: [
        { front: 'ご飯', reading: 'ごはん', back: 'rice / meal' },
        { front: '水', reading: 'みず', back: 'water' }
      ]
    })
    // A different course must NOT contribute distractors.
    const otherCourse = jp.createCourse({ title: 'Other' })
    jp.createLesson({
      courseId: otherCourse,
      kind: 'vocab',
      title: 'Elsewhere',
      cards: [{ front: '別', reading: 'べつ', back: 'separate' }]
    })

    const pool = jp.lessonQuizPool(lessonId)
    expect(pool.items.map((c) => c.front)).toEqual(['こんにちは', '犬', '猫'])
    expect(pool.distractors.map((c) => c.front).sort()).toEqual(['ご飯', '水'])

    // The other lesson's pool mirrors it.
    const otherPool = jp.lessonQuizPool(otherId)
    expect(otherPool.items).toHaveLength(2)
    expect(otherPool.distractors).toHaveLength(3)
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
      reviewsToday: 0,
      introducedToday: 0
    })

    const card = jp.getLesson(lessonId)!.cards[0]
    jp.submitReview(card.id, 'again')
    db.prepare(`UPDATE jp_card SET due_at = datetime('now', '-1 minute') WHERE id = ?`).run(card.id)

    s = jp.stats()
    expect(s.dueCount).toBe(1)
    expect(s.newAvailableCount).toBe(2)
    expect(s.reviewsToday).toBe(1)
    expect(s.introducedToday).toBe(1)

    // A second review of the same card is not a second introduction.
    jp.submitReview(card.id, 'good')
    expect(jp.stats().introducedToday).toBe(1)

    // A card first reviewed on an earlier day doesn't count today, even if
    // reviewed again today (its FIRST log row is what decides).
    db.prepare(`UPDATE jp_review_log SET reviewed_at = datetime('now', '-2 days')`).run()
    expect(jp.stats().introducedToday).toBe(0)
    jp.submitReview(card.id, 'good')
    expect(jp.stats().introducedToday).toBe(0)
  })
})

describe('japaneseRepo — statsDetail', () => {
  // submitReview always stamps now; backdate log rows directly to shape
  // history. Stored UTC (like production writes) — the repo applies
  // 'localtime' when grouping into days.
  function backdateLast(daysAgo: number): void {
    db.prepare(
      `UPDATE jp_review_log
       SET reviewed_at = datetime('now', ?)
       WHERE id = (SELECT MAX(id) FROM jp_review_log)`
    ).run(`-${daysAgo} days`)
  }

  it('is empty-safe before any reviews', () => {
    seedCourseWithLesson(true)
    const d = jp.statsDetail()
    expect(d.totalReviews).toBe(0)
    expect(d.firstReviewAt).toBeNull()
    expect(d.reviewsPerDay).toEqual([])
    expect(d.streak).toEqual({ current: 0, longest: 0 })
    expect(d.gradeCounts).toEqual({ again: 0, hard: 0, good: 0, easy: 0 })
  })

  it('groups reviews per local day, counts grades, and computes streaks', () => {
    const { lessonId } = seedCourseWithLesson(true)
    const cards = jp.getLesson(lessonId)!.cards

    jp.submitReview(cards[0].id, 'good')
    backdateLast(1)
    jp.submitReview(cards[1].id, 'again')
    backdateLast(1)
    jp.submitReview(cards[2].id, 'easy') // today

    const d = jp.statsDetail()
    expect(d.totalReviews).toBe(3)
    expect(d.gradeCounts).toEqual({ again: 1, hard: 0, good: 1, easy: 1 })
    expect(d.reviewsPerDay).toHaveLength(2)
    expect(d.reviewsPerDay[0].count).toBe(2) // yesterday
    expect(d.reviewsPerDay[1].count).toBe(1) // today
    expect(d.streak).toEqual({ current: 2, longest: 2 })
  })

  it('excludes reviews older than 365 days from the heatmap but keeps totals', () => {
    const { lessonId } = seedCourseWithLesson(true)
    const cards = jp.getLesson(lessonId)!.cards
    jp.submitReview(cards[0].id, 'good')
    backdateLast(400)
    jp.submitReview(cards[1].id, 'good') // today

    const d = jp.statsDetail()
    expect(d.reviewsPerDay).toHaveLength(1)
    expect(d.totalReviews).toBe(2)
    expect(d.firstReviewAt).not.toBeNull()
  })

  it('forecasts due cards over 14 days, folding overdue into today', () => {
    const { lessonId } = seedCourseWithLesson(true)
    const cards = jp.getLesson(lessonId)!.cards
    // Move all three out of 'new' (graded once), then reshape their due dates.
    for (const c of cards) jp.submitReview(c.id, 'good')
    db.prepare(`UPDATE jp_card SET due_at = datetime('now', '-2 days') WHERE id = ?`).run(cards[0].id)
    db.prepare(`UPDATE jp_card SET due_at = datetime('now', '+3 days') WHERE id = ?`).run(cards[1].id)
    db.prepare(`UPDATE jp_card SET due_at = datetime('now', '+30 days') WHERE id = ?`).run(cards[2].id)

    const d = jp.statsDetail()
    const total = d.dueForecast.reduce((a, b) => a + b.due, 0)
    expect(total).toBe(2) // 30-days-out card excluded from the window
    const today = (db.prepare(`SELECT date('now','localtime') AS d`).get() as { d: string }).d
    expect(d.dueForecast.find((f) => f.day === today)?.due).toBe(1) // overdue → today
  })

  it('excludes new cards and unlearned lessons from the forecast', () => {
    const { lessonId } = seedCourseWithLesson(true)
    const cards = jp.getLesson(lessonId)!.cards
    // cards are 'new' → no forecast rows even though due_at is set at creation
    expect(jp.statsDetail().dueForecast).toEqual([])

    jp.submitReview(cards[0].id, 'good')
    db.prepare(`UPDATE jp_card SET due_at = datetime('now', '+1 day') WHERE id = ?`).run(cards[0].id)
    jp.setLessonLearned(lessonId, false)
    expect(jp.statsDetail().dueForecast).toEqual([]) // unlearned lesson filtered
  })
})

describe('japaneseRepo — review queue lesson context', () => {
  it('carries the lesson kind and title on every queued card', () => {
    const courseId = jp.createCourse({ title: 'N4' })
    const lessonId = jp.createLesson({
      courseId,
      kind: 'grammar',
      title: 'Explanatory ～んです / ～んだ',
      cards: [{ front: '雨が降ってるんです。', reading: 'あめがふってるんです。', back: "It's raining." }]
    })
    jp.setLessonLearned(lessonId, true)

    const fresh = jp.reviewQueue(10).fresh
    expect(fresh[0].lessonKind).toBe('grammar')
    expect(fresh[0].lessonTitle).toBe('Explanatory ～んです / ～んだ')

    jp.submitReview(fresh[0].id, 'again')
    db.prepare(`UPDATE jp_card SET due_at = datetime('now','-1 minute') WHERE id = ?`).run(fresh[0].id)
    const due = jp.reviewQueue(0).due
    expect(due[0].lessonKind).toBe('grammar')
    expect(due[0].lessonTitle).toBe('Explanatory ～んです / ～んだ')
  })
})

describe('japaneseRepo — leeches', () => {
  function cardWithLapses(front: string, lapses: number): number {
    const courseId = jp.createCourse({ title: `c-${front}` })
    const lessonId = jp.createLesson({
      courseId,
      kind: 'vocab',
      title: `l-${front}`,
      cards: [{ front, reading: null, back: 'meaning' }]
    })
    jp.setLessonLearned(lessonId, true)
    const id = (db.prepare('SELECT id FROM jp_card WHERE front = ?').get(front) as { id: number }).id
    db.prepare('UPDATE jp_card SET lapses = ?, ease = 1.8, status = ? WHERE id = ?').run(
      lapses,
      'review',
      id
    )
    return id
  }

  it('lists cards at or past the threshold, worst first', () => {
    cardWithLapses('楽', 5) // below threshold (LEECH_LAPSES = 6)
    cardWithLapses('難', 6)
    cardWithLapses('罠', 9)

    const leeches = jp.listLeeches()
    expect(leeches.map((l) => l.front)).toEqual(['罠', '難'])
    expect(leeches[0].lapses).toBe(9)
    expect(leeches[0].lessonTitle).toBe('l-罠')
    expect(leeches[0].courseTitle).toBe('c-罠')
  })

  it('is empty when nothing has lapsed', () => {
    seedCourseWithLesson(true)
    expect(jp.listLeeches()).toEqual([])
  })

  it('resetCard restores a fresh SRS state and keeps the review history', () => {
    const id = cardWithLapses('罠', 9)
    jp.submitReview(id, 'good') // leaves a log row
    const logsBefore = (
      db.prepare('SELECT COUNT(*) AS n FROM jp_review_log WHERE card_id = ?').get(id) as { n: number }
    ).n
    expect(logsBefore).toBeGreaterThan(0)

    jp.resetCard(id)
    const card = db.prepare('SELECT * FROM jp_card WHERE id = ?').get(id) as Record<string, unknown>
    expect(card.status).toBe('new')
    expect(card.lapses).toBe(0)
    expect(card.reps).toBe(0)
    expect(card.interval_days).toBe(0)
    expect(card.ease).toBe(2.5)
    expect(card.due_at).toBeNull()
    expect(jp.listLeeches()).toEqual([])

    // History survives, and the card comes back around as a new card.
    expect(
      (db.prepare('SELECT COUNT(*) AS n FROM jp_review_log WHERE card_id = ?').get(id) as { n: number })
        .n
    ).toBe(logsBefore)
    expect(jp.reviewQueue(10).fresh.map((c) => c.id)).toContain(id)
  })
})

describe('japaneseRepo — roadmap', () => {
  function stepCourse(title: string, difficulty: number | null, lessons: number, learned: number): number {
    const courseId = jp.createCourse({ title, difficulty, level: 'N5' })
    for (let i = 0; i < lessons; i++) {
      const lessonId = jp.createLesson({
        courseId,
        kind: 'vocab',
        title: `${title} lesson ${i + 1}`,
        cards: [{ front: `${title}-${i}`, reading: null, back: 'x' }]
      })
      if (i < learned) jp.setLessonLearned(lessonId, true)
    }
    return courseId
  }

  it('orders steps by difficulty and buckets unscheduled courses separately', () => {
    stepCourse('Step two', 2, 1, 1)
    stepCourse('Step one', 1, 1, 1)
    stepCourse('Mining inbox', null, 1, 1)

    const rm = jp.roadmap()
    expect(rm.steps.map((c) => c.title)).toEqual(['Step one', 'Step two'])
    expect(rm.unscheduled.map((c) => c.title)).toEqual(['Mining inbox'])
  })

  it('points at the first incomplete step and its next unlearned lesson', () => {
    stepCourse('Done', 1, 2, 2)
    const frontier = stepCourse('In progress', 2, 3, 1)
    stepCourse('Later', 3, 2, 0)

    const rm = jp.roadmap()
    expect(rm.frontierCourseId).toBe(frontier)
    expect(rm.nextLesson).toMatchObject({
      courseId: frontier,
      courseTitle: 'In progress',
      title: 'In progress lesson 2', // respects lesson order
      kind: 'vocab'
    })
  })

  it('has no frontier once every step is learned', () => {
    stepCourse('Done', 1, 2, 2)
    const rm = jp.roadmap()
    expect(rm.frontierCourseId).toBeNull()
    expect(rm.nextLesson).toBeNull()
  })

  it('skips empty courses when choosing the frontier', () => {
    stepCourse('Empty', 1, 0, 0)
    const real = stepCourse('Real', 2, 1, 0)
    expect(jp.roadmap().frontierCourseId).toBe(real)
  })

  it('counts seen and due cards per course', () => {
    const courseId = jp.createCourse({ title: 'Counting', difficulty: 1 })
    const lessonId = jp.createLesson({
      courseId,
      kind: 'vocab',
      title: 'L',
      cards: [
        { front: 'a', reading: null, back: 'x' },
        { front: 'b', reading: null, back: 'y' }
      ]
    })
    jp.setLessonLearned(lessonId, true)
    const cards = jp.getLesson(lessonId)!.cards

    expect(jp.roadmap().steps[0].seenCardCount).toBe(0)

    jp.submitReview(cards[0].id, 'good')
    expect(jp.roadmap().steps[0].seenCardCount).toBe(1)
    expect(jp.roadmap().steps[0].dueCardCount).toBe(0) // scheduled into the future

    db.prepare(`UPDATE jp_card SET due_at = datetime('now','-1 minute') WHERE id = ?`).run(cards[0].id)
    expect(jp.roadmap().steps[0].dueCardCount).toBe(1)
  })
})
