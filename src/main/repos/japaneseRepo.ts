import { getSqlite } from '../db/connection'
import { GHOST_STEPS, gradeCard, LEECH_LAPSES, newCardState } from '@shared/srs'
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
  GrammarDeckResult,
  JpGhostCard,
  JpGhostOutcome,
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
    audioPath: (r.audio_path as string) ?? null,
    imagePath: (r.image_path as string) ?? null,
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
  const db = getSqlite()
  db.prepare('DELETE FROM jp_course WHERE id = ?').run(id)
  // Card rows cascaded away silently — sweep their ghosts.
  db.prepare('DELETE FROM jp_ghost WHERE card_id NOT IN (SELECT id FROM jp_card)').run()
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
  const db = getSqlite()
  db.prepare('DELETE FROM jp_lesson WHERE id = ?').run(id)
  // Card rows cascaded away silently — sweep their ghosts.
  db.prepare('DELETE FROM jp_ghost WHERE card_id NOT IN (SELECT id FROM jp_card)').run()
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
                          onyomi, kunyomi, source_media_id, audio_path, image_path)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
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
      c.sourceMediaId ?? null,
      c.audioPath ?? null,
      c.imagePath ?? null
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
  sourceMediaId: 'source_media_id',
  audioPath: 'audio_path',
  imagePath: 'image_path'
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
  const db = getSqlite()
  db.prepare('DELETE FROM jp_ghost WHERE card_id = ?').run(id)
  db.prepare('DELETE FROM jp_card WHERE id = ?').run(id)
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
         WHERE l.learned = 1 AND k.status IN ('learning','review') AND k.due_at <= datetime('now')
         ORDER BY k.due_at ASC, k.id ASC`
      )
      .all() as Record<string, unknown>[]
  ).map(mapReviewCard)
  // Mined words come FIRST, ahead of curriculum order. `ensureMiningInbox`
  // creates its course at MAX(sort_order)+1 — dead last — so ordering purely by
  // course would park a word you captured tonight behind the new cards of every
  // lesson you have already marked learned: days of waiting, which defeats the
  // point of mining. Matched by title, the same way the inbox is found there.
  const fresh = (
    db
      .prepare(
        `SELECT k.*, ${SOURCE_COLS}, ${LESSON_COLS} FROM jp_card k ${SOURCE_JOIN}
         JOIN jp_lesson l ON l.id = k.lesson_id
         JOIN jp_course c ON c.id = l.course_id
         WHERE l.learned = 1 AND k.status = 'new'
         ORDER BY (c.title = ?) DESC, c.sort_order ASC, c.id ASC, l.sort_order ASC, l.id ASC,
                  k.sort_order ASC, k.id ASC
         LIMIT ?`
      )
      .all(INBOX_COURSE, Math.max(0, newLimit)) as Record<string, unknown>[]
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
// A fresh start also dissolves any ghost (the echo belongs to the old run).
export function resetCard(id: number): void {
  const fresh = newCardState()
  const db = getSqlite()
  db.prepare('DELETE FROM jp_ghost WHERE card_id = ?').run(id)
  db.prepare(
    `UPDATE jp_card
       SET status = ?, learning_step = ?, interval_days = ?, ease = ?, reps = ?, lapses = ?,
           due_at = NULL, updated_at = datetime('now')
       WHERE id = ?`
  ).run(
    fresh.status,
    fresh.learningStep,
    fresh.intervalDays,
    fresh.ease,
    fresh.reps,
    fresh.lapses,
    id
  )
}

// ---- Ghost reviews (Bunpro-style echoes of lapsed cards) ----

// Ghosts due for serving: never a card that's ALSO in the real due list (it
// would appear twice), only learned lessons, oldest echo first. The jp_card
// JOIN doubles as orphan protection — a row whose card vanished never serves.
export function ghostQueue(limit: number): JpGhostCard[] {
  const db = getSqlite()
  const rows = db
    .prepare(
      `SELECT k.*, ${SOURCE_COLS}, ${LESSON_COLS}, g.remaining AS ghost_remaining
       FROM jp_ghost g JOIN jp_card k ON k.id = g.card_id
       ${SOURCE_JOIN}
       JOIN jp_lesson l ON l.id = k.lesson_id
       WHERE l.learned = 1
         AND NOT (k.status IN ('learning','review') AND k.due_at IS NOT NULL AND k.due_at <= datetime('now'))
       ORDER BY g.created_at ASC, g.card_id ASC LIMIT ?`
    )
    .all(Math.max(0, limit)) as Record<string, unknown>[]
  return rows.map((r) => ({
    ...mapReviewCard(r),
    ghostRemaining: r.ghost_remaining as number
  }))
}

// One ghost answer. Correct decrements toward dissolution; a miss resets the
// counter to GHOST_STEPS. Writes NOTHING to jp_review_log — the log is the
// SM-2 history feeding retention/accuracy/heatmap/streaks, and ghost reps are
// extra-schedule practice (flagged rows would force every aggregate to
// filter; if ghost work should ever count, add a flagged column then).
export function ghostAnswer(cardId: number, correct: boolean): JpGhostOutcome {
  const db = getSqlite()
  const row = db.prepare('SELECT remaining FROM jp_ghost WHERE card_id = ?').get(cardId) as
    | { remaining: number }
    | undefined
  if (!row) return { remaining: 0, dissolved: true }
  if (!correct) {
    db.prepare('UPDATE jp_ghost SET remaining = ? WHERE card_id = ?').run(GHOST_STEPS, cardId)
    return { remaining: GHOST_STEPS, dissolved: false }
  }
  const remaining = row.remaining - 1
  if (remaining <= 0) {
    db.prepare('DELETE FROM jp_ghost WHERE card_id = ?').run(cardId)
    return { remaining: 0, dissolved: true }
  }
  db.prepare('UPDATE jp_ghost SET remaining = ? WHERE card_id = ?').run(remaining, cardId)
  return { remaining, dissolved: false }
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
               WHERE l.course_id = c.id AND k.status IN ('learning','review')) AS seen_count,
              (SELECT COUNT(*) FROM jp_card k JOIN jp_lesson l ON l.id = k.lesson_id
               WHERE l.course_id = c.id AND l.learned = 1 AND k.status IN ('learning','review')
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
    // overdue_days rides along so gradeCard can credit a late answer with the
    // gap it actually survived; NULL (a card that was never scheduled) is 0.
    const row = db
      .prepare(
        `SELECT *, MAX(0, julianday('now') - julianday(due_at)) AS overdue_days
         FROM jp_card WHERE id = ?`
      )
      .get(cardId) as Record<string, unknown> | undefined
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
      grade,
      { elapsedDays: Number(row.overdue_days ?? 0) }
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
    // A LAPSE (review-state card graded Again — a miss during learning steps
    // isn't one, matching gradeCard semantics) spawns a ghost: the card must
    // be answered correctly GHOST_STEPS more times in future sessions,
    // independent of its real SM-2 state. Spawned unconditionally — the
    // review page's toggle governs SERVING, so turning it on later works
    // retroactively.
    if (card.status === 'review' && grade === 'again') {
      db.prepare(
        `INSERT INTO jp_ghost (card_id, remaining) VALUES (?, ?)
         ON CONFLICT(card_id) DO UPDATE SET remaining = excluded.remaining,
                                            created_at = datetime('now')`
      ).run(cardId, GHOST_STEPS)
    }
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
// Words the user says they already know, kept apart from mined words so the
// two lists stay honest about where a card came from. The interval is a stand-in
// for "never due again" that still reads as a real SRS state.
const KNOWN_LESSON = 'Already known'
const KNOWN_INTERVAL_DAYS = 36500

// Every Japanese-section QuizKind — the journey's "quiz rounds" count.
const JP_QUIZ_KINDS = [
  'japanese', 'kana', 'kanji', 'conjugation', 'writing', 'jlpt',
  'pitch', 'pairs', 'components', 'grammar', 'names', 'numbers',
  'dictation', 'shiritori', 'lookalike', 'transitivity', 'homophone',
  'loanword', 'keigo', 'leech', 'speak'
]

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
          // learned = 1 (cards must reach the queue and the tier CTE) but
          // learned_at deliberately NULL: checklistRepo detects the weekly
          // "Learn a Japanese lesson" item from learned_at, and a container
          // the app created for you is not a lesson you studied.
          `INSERT INTO jp_lesson (course_id, kind, title, sort_order, learned)
           VALUES (?, 'vocab', ?, 0, 1)`
        )
        .run(course.id, INBOX_LESSON)
      lesson = { id: Number(info.lastInsertRowid) }
    }
    return { courseId: course.id, lessonId: lesson.id }
  })
  return tx()
}

// Files grammar cards into one lesson per JLPT level inside a shared course,
// creating both on demand. Cards enter as ordinary 'new' rows in a LEARNED
// lesson, so they join the existing review queue rather than needing a second
// scheduler. Idempotent by card front: re-running "add all N5" after the bank
// grows adds only what is missing.
export function addGrammarCards(
  courseTitle: string,
  points: { level: string; title: string; cards: { front: string; back: string; notes: string | null }[] }[]
): GrammarDeckResult {
  const db = getSqlite()
  const tx = db.transaction((): GrammarDeckResult => {
    let course = db
      .prepare('SELECT id FROM jp_course WHERE title = ? ORDER BY id ASC')
      .get(courseTitle) as { id: number } | undefined
    if (!course) {
      const next = (
        db.prepare('SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM jp_course').get() as {
          next: number
        }
      ).next
      const info = db
        .prepare('INSERT INTO jp_course (title, description, sort_order) VALUES (?, ?, ?)')
        .run(courseTitle, 'Grammar points added from the grammar library.', next)
      course = { id: Number(info.lastInsertRowid) }
    }
    const exists = db.prepare('SELECT 1 FROM jp_card WHERE lesson_id = ? AND front = ? LIMIT 1')
    let added = 0
    let skipped = 0
    let lastLessonId = 0
    for (const point of points) {
      // Nothing clozeable in this point: skip BEFORE creating anything, or a
      // level whose examples carry no cloze leaves a permanent empty lesson
      // marked learned, and every re-run reports success against it.
      if (point.cards.length === 0) {
        skipped++
        continue
      }
      let lesson = db
        .prepare('SELECT id FROM jp_lesson WHERE course_id = ? AND title = ? ORDER BY id ASC')
        .get(course.id, point.level) as { id: number } | undefined
      if (!lesson) {
        const next = (
          db
            .prepare(
              'SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM jp_lesson WHERE course_id = ?'
            )
            .get(course.id) as { next: number }
        ).next
        const info = db
          .prepare(
            `INSERT INTO jp_lesson (course_id, kind, title, sort_order, learned)
             VALUES (?, 'grammar', ?, ?, 1)`
          )
          .run(course.id, point.level, next)
        lesson = { id: Number(info.lastInsertRowid) }
      }
      lastLessonId = lesson.id
      const fresh = point.cards.filter((c) => !exists.get(lesson!.id, c.front))
      if (fresh.length === 0) {
        skipped++
        continue
      }
      const next = (
        db
          .prepare('SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM jp_card WHERE lesson_id = ?')
          .get(lesson.id) as { next: number }
      ).next
      insertCards(
        lesson.id,
        fresh.map((c) => ({ front: c.front, back: c.back, notes: c.notes })),
        next
      )
      added += fresh.length
    }
    return { lessonId: lastLessonId, added, skipped }
  })
  return tx()
}

// "I already know this" — the manual half of the frequency baseline. Writes a
// card straight at status='review' in a pre-learned lesson, so the word counts
// as known everywhere the tier CTE is read (comprehension, the i+1 feed,
// coverage) without ever entering the review queue as something to study.
// Returns how many rows were NEW; re-marking a word is a no-op, and a word that
// already has a card anywhere is left alone rather than duplicated.
export function markWordsKnown(words: { front: string; reading?: string | null }[]): number {
  const db = getSqlite()
  const tx = db.transaction((): number => {
    const { courseId } = ensureMiningInbox()
    let lesson = db
      .prepare('SELECT id FROM jp_lesson WHERE course_id = ? AND title = ? ORDER BY id ASC')
      .get(courseId, KNOWN_LESSON) as { id: number } | undefined
    if (!lesson) {
      const info = db
        .prepare(
          `INSERT INTO jp_lesson (course_id, kind, title, sort_order, learned)
           VALUES (?, 'vocab', ?, 1, 1)`
        )
        .run(courseId, KNOWN_LESSON)
      lesson = { id: Number(info.lastInsertRowid) }
    }
    const exists = db.prepare('SELECT 1 FROM jp_card WHERE front = ? LIMIT 1')
    // due_at is effectively never, NOT +1 day: reviewQueue's due clause is
    // `learned = 1 AND status IN ('learning','review') AND due_at <= now`, so a
    // near date made every word the user declared they already knew come back
    // tomorrow as an unanswerable card — the exact opposite of this function's
    // contract. The far date also keeps them out of stats().dueCount and the
    // 30-day forecast, while status='review' still scores them tier 3 known.
    const ins = db.prepare(
      `INSERT INTO jp_card (lesson_id, sort_order, front, reading, back, status, interval_days,
                            reps, due_at, last_reviewed_at)
       VALUES (?, ?, ?, ?, 'Known before this deck', 'review', ${KNOWN_INTERVAL_DAYS}, 1,
               datetime('now', '+${KNOWN_INTERVAL_DAYS} days'), datetime('now'))`
    )
    let added = 0
    let next = (
      db
        .prepare('SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM jp_card WHERE lesson_id = ?')
        .get(lesson.id) as { next: number }
    ).next
    for (const w of words) {
      const front = w.front.trim()
      if (!front || exists.get(front)) continue
      ins.run(lesson.id, next++, front, w.reading?.trim() || null)
      added++
    }
    return added
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
       WHERE l.learned = 1 AND k.status IN ('learning','review') AND k.due_at <= datetime('now')`
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
    ),
    // newLimit is a per-SESSION renderer pref, so nothing else notices a second
    // session dealing another batch — this count is the pacing guardrail.
    introducedToday: one(
      `SELECT COUNT(*) AS n FROM (
         SELECT card_id FROM jp_review_log
         GROUP BY card_id
         HAVING date(MIN(reviewed_at), 'localtime') = date('now', 'localtime')
       )`
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

  // Due forecast over the next 30 local days (the page offers 7/14/30 views),
  // same due-card definition as stats()/reviewQueue (learned lesson, not
  // 'new'); anything overdue counts toward today so the first bar reads "what
  // a review session clears now".
  const dueForecast = db
    .prepare(
      `SELECT CASE WHEN k.due_at <= datetime('now') THEN date('now', 'localtime')
                   ELSE date(k.due_at, 'localtime') END AS day,
              COUNT(*) AS due
       FROM jp_card k JOIN jp_lesson l ON l.id = k.lesson_id
       WHERE l.learned = 1 AND k.status IN ('learning','review') AND k.due_at IS NOT NULL
         AND date(k.due_at, 'localtime') <= date('now', 'localtime', '+29 days')
       GROUP BY day ORDER BY day ASC`
    )
    .all() as { day: string; due: number }[]

  // True retention, overall and last-30-days. Lenient counts Hard as a pass
  // (Anki's default framing); strict is Good/Easy only. Mature-only retention
  // is NOT computable honestly — the log doesn't record the card's pre-review
  // status (upgrade path: a flagged column via ensureColumn, not taken now).
  const retentionRows = db
    .prepare(
      `SELECT CASE WHEN reviewed_at >= datetime('now', '-30 days') THEN 1 ELSE 0 END AS recent,
              grade, COUNT(*) AS n
       FROM jp_review_log GROUP BY recent, grade`
    )
    .all() as { recent: number; grade: string; n: number }[]
  const retentionOf = (rows: { grade: string; n: number }[]): {
    strict: number | null
    lenient: number | null
  } => {
    const total = rows.reduce((s, r) => s + r.n, 0)
    if (total === 0) return { strict: null, lenient: null }
    const of = (grades: string[]): number =>
      rows.filter((r) => grades.includes(r.grade)).reduce((s, r) => s + r.n, 0) / total
    return { strict: of(['good', 'easy']), lenient: of(['hard', 'good', 'easy']) }
  }
  const overall = retentionOf(retentionRows)
  const last30 = retentionOf(retentionRows.filter((r) => r.recent === 1))

  // The passive "N hours of Japanese" retrospective — every number derived
  // from what the app already records, never hand-logged (the AJATT lesson).
  const journey = {
    distinctCardsReviewed: (
      db.prepare('SELECT COUNT(DISTINCT card_id) AS n FROM jp_review_log').get() as { n: number }
    ).n,
    // Mined = captured from reading: a source media link OR living in the
    // mining inbox (single COUNT with OR — no double counting).
    wordsMined: (
      db
        .prepare(
          `SELECT COUNT(*) AS n FROM jp_card c
           WHERE c.source_media_id IS NOT NULL
              OR c.lesson_id IN (
                SELECT l.id FROM jp_lesson l JOIN jp_course co ON co.id = l.course_id
                WHERE co.title = ?)`
        )
        .get(INBOX_COURSE) as { n: number }
    ).n,
    lessonsLearned: (
      db.prepare('SELECT COUNT(*) AS n FROM jp_lesson WHERE learned = 1').get() as { n: number }
    ).n,
    chaptersRead: (
      db.prepare('SELECT COUNT(*) AS n FROM manga_chapter WHERE read_at IS NOT NULL').get() as {
        n: number
      }
    ).n,
    quizRounds: (
      db
        .prepare(
          `SELECT COUNT(*) AS n FROM quiz_session WHERE kind IN (${JP_QUIZ_KINDS.map(() => '?').join(',')})`
        )
        .get(...JP_QUIZ_KINDS) as { n: number }
    ).n
  }

  // Where the mined cards actually came from. jp_card.source_media_id has been
  // written since mining shipped and nothing ever grouped by it, so "is my
  // immersion producing cards" had no answer. LEFT JOIN by the house rule: the
  // column has no FK, so a deleted title must still list (as "Unknown").
  const miningSources = (
    db
      .prepare(
        `SELECT c.source_media_id AS media_id, m.title AS title, m.media_type AS media_type,
                COUNT(*) AS n
         FROM jp_card c LEFT JOIN media_item m ON m.id = c.source_media_id
         WHERE c.source_media_id IS NOT NULL
         GROUP BY c.source_media_id
         -- NULLs sort first in SQLite, which would float a deleted source above
         -- real titles on the same count; push it to the end of its group.
         ORDER BY n DESC, (m.title IS NULL) ASC, m.title ASC`
      )
      .all() as { media_id: number; title: string | null; media_type: string | null; n: number }[]
  ).map((r) => ({
    mediaId: r.media_id,
    title: r.title ?? 'Unknown',
    mediaType: (r.media_type as MediaType) ?? null,
    count: r.n
  }))

  return {
    reviewsPerDay,
    streak,
    gradeCounts,
    miningSources,
    totalReviews: agg.n,
    firstReviewAt: agg.first,
    dueForecast,
    retention: {
      strict: overall.strict,
      lenient: overall.lenient,
      strict30: last30.strict,
      lenient30: last30.lenient
    },
    journey
  }
}
