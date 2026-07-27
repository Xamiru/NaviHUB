import { getSqlite } from '../db/connection'
import { gradeCard, LEECH_LAPSES, newCardState } from '@shared/srs'
import { computeStreaks } from './musicRepo'
import type {
  JpCard,
  JpCardInput,
  JpCourse,
  JpCourseDetail,
  JpCourseInput,
  JpCourseSummary,
  JpLeech,
  JpLesson,
  JpLessonDetail,
  JpLessonInput,
  JpLessonKind,
  JpLessonQuizPool,
  JpMiningInbox,
  JpQuizItem,
  JpQuizScope,
  JpReviewCard,
  JpReviewOutcome,
  JpReviewQueue,
  JpRoadmap,
  JpStats,
  JpStatsDetail,
  MediaType,
  SrsGrade,
  SrsStatus
} from '@shared/types'

// Joined onto every card read so mined cards can show the manga/VN they came
// from. source_media_id has no FK — a deleted title just resolves to nulls.
const SOURCE_JOIN = `LEFT JOIN media_item m ON m.id = k.source_media_id`
const SOURCE_COLS = `m.title AS source_title, m.media_type AS source_media_type,
       m.cover_path AS source_cover_path`

function mapCourse(r: Record<string, unknown>): JpCourse {
  return {
    id: r.id as number,
    title: r.title as string,
    description: (r.description as string) ?? null,
    level: (r.level as string) ?? null,
    difficulty: (r.difficulty as number) ?? null,
    sortOrder: r.sort_order as number,
    createdAt: r.created_at as string,
    updatedAt: r.updated_at as string
  }
}

function mapLesson(r: Record<string, unknown>): JpLesson {
  return {
    id: r.id as number,
    courseId: r.course_id as number,
    kind: r.kind as JpLessonKind,
    title: r.title as string,
    body: (r.body as string) ?? null,
    sortOrder: r.sort_order as number,
    learned: !!r.learned,
    learnedAt: (r.learned_at as string) ?? null
  }
}

function mapCard(r: Record<string, unknown>): JpCard {
  return {
    id: r.id as number,
    lessonId: r.lesson_id as number,
    sortOrder: r.sort_order as number,
    front: r.front as string,
    reading: (r.reading as string) ?? null,
    back: r.back as string,
    pos: (r.pos as string) ?? null,
    notes: (r.notes as string) ?? null,
    exampleJp: (r.example_jp as string) ?? null,
    exampleReading: (r.example_reading as string) ?? null,
    exampleEn: (r.example_en as string) ?? null,
    onyomi: (r.onyomi as string) ?? null,
    kunyomi: (r.kunyomi as string) ?? null,
    sourceMediaId: (r.source_media_id as number) ?? null,
    sourceTitle: (r.source_title as string) ?? null,
    sourceMediaType: (r.source_media_type as MediaType) ?? null,
    sourceCoverPath: (r.source_cover_path as string) ?? null,
    status: r.status as SrsStatus,
    learningStep: r.learning_step as number,
    dueAt: (r.due_at as string) ?? null,
    intervalDays: r.interval_days as number,
    ease: r.ease as number,
    reps: r.reps as number,
    lapses: r.lapses as number,
    lastReviewedAt: (r.last_reviewed_at as string) ?? null
  }
}

// ---- Courses ----

export function listCourses(): JpCourseSummary[] {
  const rows = getSqlite()
    .prepare(
      `SELECT c.*,
              (SELECT COUNT(*) FROM jp_lesson l WHERE l.course_id = c.id) AS lesson_count,
              (SELECT COUNT(*) FROM jp_lesson l WHERE l.course_id = c.id AND l.learned = 1) AS learned_count,
              (SELECT COUNT(*) FROM jp_card k JOIN jp_lesson l ON l.id = k.lesson_id
               WHERE l.course_id = c.id) AS card_count
       FROM jp_course c
       ORDER BY (c.difficulty IS NULL) ASC, c.difficulty ASC, c.sort_order ASC, c.id ASC`
    )
    .all() as Record<string, unknown>[]
  return rows.map((r) => ({
    ...mapCourse(r),
    lessonCount: r.lesson_count as number,
    learnedLessonCount: r.learned_count as number,
    cardCount: r.card_count as number
  }))
}

export function getCourse(id: number): JpCourseDetail | null {
  const db = getSqlite()
  const row = db.prepare('SELECT * FROM jp_course WHERE id = ?').get(id) as
    | Record<string, unknown>
    | undefined
  if (!row) return null
  const lessons = (
    db
      .prepare(
        `SELECT l.*, (SELECT COUNT(*) FROM jp_card k WHERE k.lesson_id = l.id) AS card_count
         FROM jp_lesson l WHERE l.course_id = ?
         ORDER BY l.sort_order ASC, l.id ASC`
      )
      .all(id) as Record<string, unknown>[]
  ).map((r) => ({ ...mapLesson(r), cardCount: r.card_count as number }))
  return { ...mapCourse(row), lessons }
}

export function createCourse(input: JpCourseInput): number {
  const db = getSqlite()
  const next = (
    db.prepare('SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM jp_course').get() as {
      next: number
    }
  ).next
  const info = db
    .prepare(
      'INSERT INTO jp_course (title, description, level, difficulty, sort_order) VALUES (?, ?, ?, ?, ?)'
    )
    .run(input.title, input.description ?? null, input.level ?? null, input.difficulty ?? null, next)
  return Number(info.lastInsertRowid)
}

export function updateCourse(id: number, input: Partial<JpCourseInput>): void {
  const sets: string[] = []
  const values: unknown[] = []
  if (input.title !== undefined) {
    sets.push('title = ?')
    values.push(input.title)
  }
  if (input.description !== undefined) {
    sets.push('description = ?')
    values.push(input.description ?? null)
  }
  if (input.level !== undefined) {
    sets.push('level = ?')
    values.push(input.level ?? null)
  }
  if (input.difficulty !== undefined) {
    sets.push('difficulty = ?')
    values.push(input.difficulty ?? null)
  }
  if (!sets.length) return
  sets.push(`updated_at = datetime('now')`)
  getSqlite()
    .prepare(`UPDATE jp_course SET ${sets.join(', ')} WHERE id = ?`)
    .run(...values, id)
}

export function removeCourse(id: number): void {
  getSqlite().prepare('DELETE FROM jp_course WHERE id = ?').run(id)
}

// ---- Lessons ----

export function getLesson(id: number): JpLessonDetail | null {
  const db = getSqlite()
  const row = db
    .prepare(
      `SELECT l.*, c.title AS course_title FROM jp_lesson l
       JOIN jp_course c ON c.id = l.course_id WHERE l.id = ?`
    )
    .get(id) as Record<string, unknown> | undefined
  if (!row) return null
  const cards = (
    db
      .prepare(
        `SELECT k.*, ${SOURCE_COLS} FROM jp_card k ${SOURCE_JOIN}
         WHERE k.lesson_id = ? ORDER BY k.sort_order ASC, k.id ASC`
      )
      .all(id) as Record<string, unknown>[]
  ).map(mapCard)
  return { ...mapLesson(row), courseTitle: row.course_title as string, cards }
}

export function createLesson(input: JpLessonInput): number {
  const db = getSqlite()
  const tx = db.transaction((): number => {
    const next = (
      db
        .prepare(
          'SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM jp_lesson WHERE course_id = ?'
        )
        .get(input.courseId) as { next: number }
    ).next
    const info = db
      .prepare('INSERT INTO jp_lesson (course_id, kind, title, body, sort_order) VALUES (?, ?, ?, ?, ?)')
      .run(input.courseId, input.kind, input.title, input.body ?? null, next)
    const lessonId = Number(info.lastInsertRowid)
    insertCards(lessonId, input.cards ?? [], 0)
    return lessonId
  })
  return tx()
}

export function updateLesson(
  id: number,
  patch: { title?: string; body?: string | null }
): void {
  const sets: string[] = []
  const values: unknown[] = []
  if (patch.title !== undefined) {
    sets.push('title = ?')
    values.push(patch.title)
  }
  if (patch.body !== undefined) {
    sets.push('body = ?')
    values.push(patch.body ?? null)
  }
  if (!sets.length) return
  sets.push(`updated_at = datetime('now')`)
  getSqlite()
    .prepare(`UPDATE jp_lesson SET ${sets.join(', ')} WHERE id = ?`)
    .run(...values, id)
}

export function removeLesson(id: number): void {
  getSqlite().prepare('DELETE FROM jp_lesson WHERE id = ?').run(id)
}

// Flips availability only — SRS state on the lesson's cards is left intact, so
// un-learning parks cards mid-schedule and re-learning restores them.
export function setLessonLearned(id: number, learned: boolean): void {
  getSqlite()
    .prepare(
      `UPDATE jp_lesson
       SET learned = ?, learned_at = CASE WHEN ? THEN datetime('now') ELSE learned_at END,
           updated_at = datetime('now')
       WHERE id = ?`
    )
    .run(learned ? 1 : 0, learned ? 1 : 0, id)
}

// ---- Cards (content fields only; SRS fields belong to submitReview) ----

function insertCards(lessonId: number, cards: JpCardInput[], startOrder: number): void {
  const stmt = getSqlite().prepare(
    `INSERT INTO jp_card (lesson_id, sort_order, front, reading, back, pos, notes,
                          example_jp, example_reading, example_en,
                          onyomi, kunyomi, source_media_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
  cards.forEach((c, i) => {
    stmt.run(
      lessonId,
      startOrder + i,
      c.front,
      c.reading ?? null,
      c.back,
      c.pos ?? null,
      c.notes ?? null,
      c.exampleJp ?? null,
      c.exampleReading ?? null,
      c.exampleEn ?? null,
      c.onyomi ?? null,
      c.kunyomi ?? null,
      c.sourceMediaId ?? null
    )
  })
}

export function createCard(lessonId: number, input: JpCardInput): number {
  const db = getSqlite()
  const next = (
    db
      .prepare('SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM jp_card WHERE lesson_id = ?')
      .get(lessonId) as { next: number }
  ).next
  insertCards(lessonId, [input], next)
  return Number(
    (db.prepare('SELECT MAX(id) AS id FROM jp_card WHERE lesson_id = ?').get(lessonId) as {
      id: number
    }).id
  )
}

const CARD_COLS: Record<keyof JpCardInput, string> = {
  front: 'front',
  reading: 'reading',
  back: 'back',
  pos: 'pos',
  notes: 'notes',
  exampleJp: 'example_jp',
  exampleReading: 'example_reading',
  exampleEn: 'example_en',
  onyomi: 'onyomi',
  kunyomi: 'kunyomi',
  sourceMediaId: 'source_media_id'
}

export function updateCard(id: number, patch: Partial<JpCardInput>): void {
  const sets: string[] = []
  const values: unknown[] = []
  for (const [key, col] of Object.entries(CARD_COLS) as [keyof JpCardInput, string][]) {
    if (patch[key] !== undefined) {
      sets.push(`${col} = ?`)
      values.push(patch[key] ?? null)
    }
  }
  if (!sets.length) return
  sets.push(`updated_at = datetime('now')`)
  getSqlite()
    .prepare(`UPDATE jp_card SET ${sets.join(', ')} WHERE id = ?`)
    .run(...values, id)
}

export function removeCard(id: number): void {
  getSqlite().prepare('DELETE FROM jp_card WHERE id = ?').run(id)
}

// ---- Review (SRS) ----

// Cards already in rotation that are due now, plus up to `newLimit` unseen
// cards — both gated to learned lessons.
// Review cards carry their lesson's kind and title so the renderer can build a
// typed cloze prompt without a second round trip per card (the grammar target
// is derived from the lesson title — see @shared/cloze).
function mapReviewCard(r: Record<string, unknown>): JpReviewCard {
  return {
    ...mapCard(r),
    lessonKind: r.lesson_kind as JpLessonKind,
    lessonTitle: (r.lesson_title as string) ?? ''
  }
}

const LESSON_COLS = 'l.kind AS lesson_kind, l.title AS lesson_title'

export function reviewQueue(newLimit: number): JpReviewQueue {
  const db = getSqlite()
  const due = (
    db
      .prepare(
        `SELECT k.*, ${SOURCE_COLS}, ${LESSON_COLS} FROM jp_card k ${SOURCE_JOIN}
         JOIN jp_lesson l ON l.id = k.lesson_id
         WHERE l.learned = 1 AND k.status != 'new' AND k.due_at <= datetime('now')
         ORDER BY k.due_at ASC, k.id ASC`
      )
      .all() as Record<string, unknown>[]
  ).map(mapReviewCard)
  const fresh = (
    db
      .prepare(
        `SELECT k.*, ${SOURCE_COLS}, ${LESSON_COLS} FROM jp_card k ${SOURCE_JOIN}
         JOIN jp_lesson l ON l.id = k.lesson_id
         JOIN jp_course c ON c.id = l.course_id
         WHERE l.learned = 1 AND k.status = 'new'
         ORDER BY c.sort_order ASC, c.id ASC, l.sort_order ASC, l.id ASC,
                  k.sort_order ASC, k.id ASC
         LIMIT ?`
      )
      .all(Math.max(0, newLimit)) as Record<string, unknown>[]
  ).map(mapReviewCard)
  return { due, fresh }
}

// ---- Leeches ----
// Cards that keep lapsing. No new table: jp_card.lapses/ease already carry the
// signal and jp_review_log keeps the history, so leech-ness is a read-time
// predicate and a reset is just an SRS-state UPDATE.

export function listLeeches(): JpLeech[] {
  const rows = getSqlite()
    .prepare(
      `SELECT k.id, k.front, k.reading, k.back, k.lapses, k.ease, k.status, k.interval_days,
              l.id AS lesson_id, l.title AS lesson_title, c.id AS course_id, c.title AS course_title
       FROM jp_card k
       JOIN jp_lesson l ON l.id = k.lesson_id
       JOIN jp_course c ON c.id = l.course_id
       WHERE k.lapses >= ?
       ORDER BY k.lapses DESC, k.ease ASC, k.id ASC
       LIMIT 100`
    )
    .all(LEECH_LAPSES) as Record<string, unknown>[]
  return rows.map((r) => ({
    id: r.id as number,
    front: r.front as string,
    reading: (r.reading as string) ?? null,
    back: r.back as string,
    lapses: r.lapses as number,
    ease: r.ease as number,
    status: r.status as SrsStatus,
    intervalDays: r.interval_days as number,
    lessonId: r.lesson_id as number,
    lessonTitle: r.lesson_title as string,
    courseId: r.course_id as number,
    courseTitle: r.course_title as string
  }))
}

// Puts a card back to square one. The review log is deliberately untouched —
// the history of how badly it went is worth keeping even after a fresh start.
export function resetCard(id: number): void {
  const fresh = newCardState()
  getSqlite()
    .prepare(
      `UPDATE jp_card
       SET status = ?, learning_step = ?, interval_days = ?, ease = ?, reps = ?, lapses = ?,
           due_at = NULL, updated_at = datetime('now')
       WHERE id = ?`
    )
    .run(
      fresh.status,
      fresh.learningStep,
      fresh.intervalDays,
      fresh.ease,
      fresh.reps,
      fresh.lapses,
      id
    )
}

// ---- Roadmap ----
// The section's spine: seeded courses carry a study-order step (difficulty),
// user/prep/core decks carry none and list separately.

export function roadmap(): JpRoadmap {
  const rows = getSqlite()
    .prepare(
      `SELECT c.*,
              (SELECT COUNT(*) FROM jp_lesson l WHERE l.course_id = c.id) AS lesson_count,
              (SELECT COUNT(*) FROM jp_lesson l WHERE l.course_id = c.id AND l.learned = 1) AS learned_count,
              (SELECT COUNT(*) FROM jp_card k JOIN jp_lesson l ON l.id = k.lesson_id
               WHERE l.course_id = c.id) AS card_count,
              (SELECT COUNT(*) FROM jp_card k JOIN jp_lesson l ON l.id = k.lesson_id
               WHERE l.course_id = c.id AND k.status != 'new') AS seen_count,
              (SELECT COUNT(*) FROM jp_card k JOIN jp_lesson l ON l.id = k.lesson_id
               WHERE l.course_id = c.id AND l.learned = 1 AND k.status != 'new'
                 AND k.due_at <= datetime('now')) AS due_count
       FROM jp_course c
       ORDER BY (c.difficulty IS NULL), c.difficulty ASC, c.sort_order ASC, c.id ASC`
    )
    .all() as Record<string, unknown>[]

  const courses = rows.map((r) => ({
    ...mapCourse(r),
    lessonCount: r.lesson_count as number,
    learnedLessonCount: r.learned_count as number,
    cardCount: r.card_count as number,
    seenCardCount: r.seen_count as number,
    dueCardCount: r.due_count as number
  }))

  const steps = courses.filter((c) => c.difficulty !== null)
  const unscheduled = courses.filter((c) => c.difficulty === null)

  // "You are here": the first step course with lessons still unlearned.
  const frontier = steps.find((c) => c.lessonCount > 0 && c.learnedLessonCount < c.lessonCount) ?? null

  let nextLesson: JpRoadmap['nextLesson'] = null
  if (frontier) {
    const row = getSqlite()
      .prepare(
        `SELECT l.id, l.title, l.kind FROM jp_lesson l
         WHERE l.course_id = ? AND l.learned = 0
         ORDER BY l.sort_order ASC, l.id ASC LIMIT 1`
      )
      .get(frontier.id) as { id: number; title: string; kind: JpLessonKind } | undefined
    if (row) {
      nextLesson = {
        id: row.id,
        title: row.title,
        kind: row.kind,
        courseId: frontier.id,
        courseTitle: frontier.title
      }
    }
  }

  return { steps, unscheduled, frontierCourseId: frontier?.id ?? null, nextLesson }
}

export function submitReview(cardId: number, grade: SrsGrade): JpReviewOutcome {
  const db = getSqlite()
  const tx = db.transaction((): JpReviewOutcome => {
    const row = db.prepare('SELECT * FROM jp_card WHERE id = ?').get(cardId) as
      | Record<string, unknown>
      | undefined
    if (!row) throw new Error(`Card ${cardId} not found`)
    const card = mapCard(row)
    const next = gradeCard(
      {
        status: card.status,
        learningStep: card.learningStep,
        intervalDays: card.intervalDays,
        ease: card.ease,
        reps: card.reps,
        lapses: card.lapses
      },
      grade
    )
    db.prepare(
      `UPDATE jp_card
       SET status = ?, learning_step = ?, interval_days = ?, ease = ?, reps = ?, lapses = ?,
           due_at = datetime('now', '+' || ? || ' minutes'),
           last_reviewed_at = datetime('now'), updated_at = datetime('now')
       WHERE id = ?`
    ).run(
      next.status,
      next.learningStep,
      next.intervalDays,
      next.ease,
      next.reps,
      next.lapses,
      next.dueInMinutes,
      cardId
    )
    db.prepare(
      'INSERT INTO jp_review_log (card_id, grade, interval_days, ease) VALUES (?, ?, ?, ?)'
    ).run(cardId, grade, next.intervalDays, next.ease)
    const dueAt = (
      db.prepare('SELECT due_at FROM jp_card WHERE id = ?').get(cardId) as { due_at: string }
    ).due_at
    return { cardId, status: next.status, intervalDays: next.intervalDays, dueAt }
  })
  return tx()
}

// ---- Vocab mining ----

const INBOX_COURSE = 'Mining inbox'
const INBOX_LESSON = 'Mined words'

// Find-or-create the capture target for mined words. Looked up by title (not a
// flag) so deleting the inbox just regenerates a fresh one on the next mine.
// The lesson is created already learned: words mined while reading should
// enter the SRS immediately, not wait for a "mark as learned" step.
export function ensureMiningInbox(): JpMiningInbox {
  const db = getSqlite()
  const tx = db.transaction((): JpMiningInbox => {
    let course = db
      .prepare('SELECT id FROM jp_course WHERE title = ? ORDER BY id ASC')
      .get(INBOX_COURSE) as { id: number } | undefined
    if (!course) {
      const next = (
        db.prepare('SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM jp_course').get() as {
          next: number
        }
      ).next
      const info = db
        .prepare('INSERT INTO jp_course (title, description, sort_order) VALUES (?, ?, ?)')
        .run(INBOX_COURSE, 'Words captured while reading manga and visual novels.', next)
      course = { id: Number(info.lastInsertRowid) }
    }
    let lesson = db
      .prepare('SELECT id FROM jp_lesson WHERE course_id = ? AND title = ? ORDER BY id ASC')
      .get(course.id, INBOX_LESSON) as { id: number } | undefined
    if (!lesson) {
      const info = db
        .prepare(
          `INSERT INTO jp_lesson (course_id, kind, title, sort_order, learned, learned_at)
           VALUES (?, 'vocab', ?, 0, 1, datetime('now'))`
        )
        .run(course.id, INBOX_LESSON)
      lesson = { id: Number(info.lastInsertRowid) }
    }
    return { courseId: course.id, lessonId: lesson.id }
  })
  return tx()
}

// Which of the given fronts already exist as cards — the manga reader marks
// them as already-mined. Deliberately global (any lesson, any source): "I
// already have this card somewhere" is the useful signal.
export function minedFronts(fronts: string[]): string[] {
  const unique = [...new Set(fronts.filter((f) => f && f.trim()))].slice(0, 100)
  if (unique.length === 0) return []
  const rows = getSqlite()
    .prepare(
      `SELECT DISTINCT front FROM jp_card WHERE front IN (${unique.map(() => '?').join(', ')})`
    )
    .all(...unique) as { front: string }[]
  return rows.map((r) => r.front)
}

// ---- Quiz + stats ----

export function quizPool(scope: JpQuizScope = {}): JpQuizItem[] {
  const wheres = ['l.learned = 1']
  const values: unknown[] = []
  if (scope.courseId != null) {
    wheres.push('l.course_id = ?')
    values.push(scope.courseId)
  }
  if (scope.kind != null) {
    wheres.push('l.kind = ?')
    values.push(scope.kind)
  }
  const rows = getSqlite()
    .prepare(
      `SELECT k.*, l.kind AS lesson_kind, l.title AS lesson_title, ${SOURCE_COLS}
       FROM jp_card k ${SOURCE_JOIN}
       JOIN jp_lesson l ON l.id = k.lesson_id
       WHERE ${wheres.join(' AND ')}
       ORDER BY k.id ASC`
    )
    .all(...values) as Record<string, unknown>[]
  return rows.map((r) => ({
    ...mapCard(r),
    lessonKind: r.lesson_kind as JpLessonKind,
    lessonTitle: r.lesson_title as string
  }))
}

// Pool for the end-of-lesson self-check: the lesson's own cards plus up to 40
// random same-course cards as distractor material. Deliberately NOT gated on
// learned — the check runs on the lesson page BEFORE it is marked learned.
export function lessonQuizPool(lessonId: number): JpLessonQuizPool {
  const db = getSqlite()
  const select = `SELECT k.*, l.kind AS lesson_kind, l.title AS lesson_title, ${SOURCE_COLS}
     FROM jp_card k ${SOURCE_JOIN}
     JOIN jp_lesson l ON l.id = k.lesson_id`
  const toItems = (rows: Record<string, unknown>[]): JpQuizItem[] =>
    rows.map((r) => ({
      ...mapCard(r),
      lessonKind: r.lesson_kind as JpLessonKind,
      lessonTitle: r.lesson_title as string
    }))
  const items = db
    .prepare(`${select} WHERE k.lesson_id = ? ORDER BY k.sort_order ASC, k.id ASC`)
    .all(lessonId) as Record<string, unknown>[]
  const distractors = db
    .prepare(
      `${select}
       WHERE l.course_id = (SELECT course_id FROM jp_lesson WHERE id = ?)
         AND k.lesson_id != ?
       ORDER BY RANDOM() LIMIT 40`
    )
    .all(lessonId, lessonId) as Record<string, unknown>[]
  return { items: toItems(items), distractors: toItems(distractors) }
}

export function stats(): JpStats {
  const db = getSqlite()
  const one = (sql: string): number => (db.prepare(sql).get() as { n: number }).n
  return {
    dueCount: one(
      `SELECT COUNT(*) AS n FROM jp_card k JOIN jp_lesson l ON l.id = k.lesson_id
       WHERE l.learned = 1 AND k.status != 'new' AND k.due_at <= datetime('now')`
    ),
    newAvailableCount: one(
      `SELECT COUNT(*) AS n FROM jp_card k JOIN jp_lesson l ON l.id = k.lesson_id
       WHERE l.learned = 1 AND k.status = 'new'`
    ),
    learnedLessons: one('SELECT COUNT(*) AS n FROM jp_lesson WHERE learned = 1'),
    totalLessons: one('SELECT COUNT(*) AS n FROM jp_lesson'),
    totalCards: one('SELECT COUNT(*) AS n FROM jp_card'),
    reviewsToday: one(
      `SELECT COUNT(*) AS n FROM jp_review_log
       WHERE date(reviewed_at, 'localtime') = date('now', 'localtime')`
    )
  }
}

// Everything the Japanese stats page needs, in one invoke (mirrors
// musicRepo.statsDetail). Timestamps are stored UTC; every user-facing
// grouping applies 'localtime' so days land on the user's calendar.
export function statsDetail(): JpStatsDetail {
  const db = getSqlite()

  const reviewsPerDay = db
    .prepare(
      `SELECT date(reviewed_at, 'localtime') AS day, COUNT(*) AS count
       FROM jp_review_log
       WHERE date(reviewed_at, 'localtime') >= date('now', 'localtime', '-364 days')
       GROUP BY day ORDER BY day ASC`
    )
    .all() as { day: string; count: number }[]

  // Streaks read ALL distinct review days (not just the heatmap window) so a
  // longest-streak record from further back survives.
  const allDaysDesc = (
    db
      .prepare(
        `SELECT DISTINCT date(reviewed_at, 'localtime') AS day
         FROM jp_review_log ORDER BY day DESC`
      )
      .all() as { day: string }[]
  ).map((r) => r.day)
  const today = (
    db.prepare(`SELECT date('now', 'localtime') AS d`).get() as { d: string }
  ).d
  const streak = computeStreaks(allDaysDesc, today)

  const gradeCounts: Record<SrsGrade, number> = { again: 0, hard: 0, good: 0, easy: 0 }
  for (const r of db
    .prepare(`SELECT grade, COUNT(*) AS n FROM jp_review_log GROUP BY grade`)
    .all() as { grade: string; n: number }[]) {
    if (r.grade in gradeCounts) gradeCounts[r.grade as SrsGrade] = r.n
  }

  const agg = db
    .prepare(`SELECT COUNT(*) AS n, MIN(reviewed_at) AS first FROM jp_review_log`)
    .get() as { n: number; first: string | null }

  // Due forecast over the next 14 local days, same due-card definition as
  // stats()/reviewQueue (learned lesson, not 'new'); anything overdue counts
  // toward today so the first bar reads "what a review session clears now".
  const dueForecast = db
    .prepare(
      `SELECT CASE WHEN k.due_at <= datetime('now') THEN date('now', 'localtime')
                   ELSE date(k.due_at, 'localtime') END AS day,
              COUNT(*) AS due
       FROM jp_card k JOIN jp_lesson l ON l.id = k.lesson_id
       WHERE l.learned = 1 AND k.status != 'new' AND k.due_at IS NOT NULL
         AND date(k.due_at, 'localtime') <= date('now', 'localtime', '+13 days')
       GROUP BY day ORDER BY day ASC`
    )
    .all() as { day: string; due: number }[]

  return {
    reviewsPerDay,
    streak,
    gradeCounts,
    totalReviews: agg.n,
    firstReviewAt: agg.first,
    dueForecast
  }
}
