import { getSqlite } from '../db/connection'
import { gradeCard } from '@shared/srs'
import type { SrsGrade, SrsStatus } from '@shared/types'
import type {
  EnReviewOutcome,
  EnReviewQueue,
  EnSrsStats,
  EnWord,
  EnWordInput,
  EnWritingEntry,
  EnWritingFeedback
} from '@shared/types'

// Saved English words (/english). Since 2026-08 the saved list IS the SRS
// deck for /english/review: every save (dictionary page, video mining, vocab
// quiz misses) enters as a 'new' card; submitReview owns the SRS columns.

function mapRow(r: Record<string, unknown>): EnWord {
  return {
    id: r.id as number,
    word: r.word as string,
    phonetic: (r.phonetic as string) ?? null,
    pos: (r.pos as string) ?? null,
    meaning: r.meaning as string,
    example: (r.example as string) ?? null,
    createdAt: r.created_at as string,
    status: (r.status as SrsStatus) ?? 'new',
    learningStep: (r.learning_step as number) ?? 0,
    dueAt: (r.due_at as string) ?? null,
    intervalDays: (r.interval_days as number) ?? 0,
    ease: (r.ease as number) ?? 2.5,
    reps: (r.reps as number) ?? 0,
    lapses: (r.lapses as number) ?? 0,
    lastReviewedAt: (r.last_reviewed_at as string) ?? null
  }
}

// Saving the same (word, meaning) twice returns the existing row instead of
// duplicating — the page's Save button is idempotent.
export function saveWord(input: EnWordInput): number {
  const db = getSqlite()
  const word = input.word.trim()
  const meaning = input.meaning.trim()
  if (!word || !meaning) throw new Error('A saved word needs both a word and a meaning')
  const existing = db
    .prepare('SELECT id FROM en_word WHERE word = ? AND meaning = ?')
    .get(word, meaning) as { id: number } | undefined
  if (existing) return existing.id
  const res = db
    .prepare(
      `INSERT INTO en_word (word, phonetic, pos, meaning, example)
       VALUES (?, ?, ?, ?, ?)`
    )
    .run(word, input.phonetic ?? null, input.pos ?? null, meaning, input.example ?? null)
  return Number(res.lastInsertRowid)
}

// Batch save in one transaction — the vocab quiz's "misses feed the deck"
// channel. Returns how many rows are NEW (idempotent duplicates not counted).
export function saveWords(inputs: EnWordInput[]): number {
  const db = getSqlite()
  const tx = db.transaction((): number => {
    let added = 0
    for (const input of inputs) {
      const word = input.word.trim()
      const meaning = input.meaning.trim()
      if (!word || !meaning) continue
      const existing = db
        .prepare('SELECT id FROM en_word WHERE word = ? AND meaning = ?')
        .get(word, meaning)
      if (existing) continue
      saveWord(input)
      added++
    }
    return added
  })
  return tx()
}

export function listWords(search?: string): EnWord[] {
  const db = getSqlite()
  const q = search?.trim()
  const rows = (
    q
      ? db
          .prepare(
            `SELECT * FROM en_word WHERE word LIKE ? OR meaning LIKE ?
             ORDER BY created_at DESC, id DESC`
          )
          .all(`%${q}%`, `%${q}%`)
      : db.prepare('SELECT * FROM en_word ORDER BY created_at DESC, id DESC').all()
  ) as Record<string, unknown>[]
  return rows.map(mapRow)
}

export function removeWord(id: number): void {
  getSqlite().prepare('DELETE FROM en_word WHERE id = ?').run(id)
}

// ---- SRS (/english/review) ----

export function reviewQueue(newLimit: number): EnReviewQueue {
  const db = getSqlite()
  const due = (
    db
      .prepare(
        `SELECT * FROM en_word
         WHERE status != 'new' AND due_at <= datetime('now')
         ORDER BY due_at ASC, id ASC`
      )
      .all() as Record<string, unknown>[]
  ).map(mapRow)
  // Fresh cards drain oldest-save-first: saving a word is opting it in.
  const fresh = (
    db
      .prepare(
        `SELECT * FROM en_word WHERE status = 'new'
         ORDER BY created_at ASC, id ASC LIMIT ?`
      )
      .all(Math.max(0, newLimit)) as Record<string, unknown>[]
  ).map(mapRow)
  return { due, fresh }
}

export function submitReview(wordId: number, grade: SrsGrade): EnReviewOutcome {
  const db = getSqlite()
  const tx = db.transaction((): EnReviewOutcome => {
    const row = db.prepare('SELECT * FROM en_word WHERE id = ?').get(wordId) as
      | Record<string, unknown>
      | undefined
    if (!row) throw new Error(`Word ${wordId} not found`)
    const card = mapRow(row)
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
      `UPDATE en_word
       SET status = ?, learning_step = ?, interval_days = ?, ease = ?, reps = ?, lapses = ?,
           due_at = datetime('now', '+' || ? || ' minutes'),
           last_reviewed_at = datetime('now')
       WHERE id = ?`
    ).run(
      next.status,
      next.learningStep,
      next.intervalDays,
      next.ease,
      next.reps,
      next.lapses,
      next.dueInMinutes,
      wordId
    )
    db.prepare(
      'INSERT INTO en_review_log (word_id, grade, interval_days, ease) VALUES (?, ?, ?, ?)'
    ).run(wordId, grade, next.intervalDays, next.ease)
    const dueAt = (
      db.prepare('SELECT due_at FROM en_word WHERE id = ?').get(wordId) as { due_at: string }
    ).due_at
    return { wordId, status: next.status, intervalDays: next.intervalDays, dueAt }
  })
  return tx()
}

export function srsStats(): EnSrsStats {
  const db = getSqlite()
  const one = (sql: string): number => (db.prepare(sql).get() as { n: number }).n
  return {
    dueCount: one(
      `SELECT COUNT(*) AS n FROM en_word WHERE status != 'new' AND due_at <= datetime('now')`
    ),
    newCount: one(`SELECT COUNT(*) AS n FROM en_word WHERE status = 'new'`),
    totalCount: one('SELECT COUNT(*) AS n FROM en_word'),
    reviewedToday: one(
      `SELECT COUNT(DISTINCT word_id) AS n FROM en_review_log
       WHERE date(reviewed_at, 'localtime') = date('now', 'localtime')`
    )
  }
}

// ---- Writing history (/english/writing) ----

function mapWriting(r: Record<string, unknown>): EnWritingEntry {
  let feedback: EnWritingFeedback
  try {
    feedback = JSON.parse(r.feedback as string) as EnWritingFeedback
  } catch {
    feedback = {
      scores: { grammar: 0, vocabulary: 0, coherence: 0, register: 0 },
      corrections: [],
      modelRewrite: '',
      overall: ''
    }
  }
  return {
    id: r.id as number,
    promptKey: r.prompt_key as string,
    promptTitle: r.prompt_title as string,
    submission: r.submission as string,
    feedback,
    score: (r.score as number) ?? null,
    createdAt: r.created_at as string
  }
}

export function saveWriting(input: {
  promptKey: string
  promptTitle: string
  submission: string
  feedback: EnWritingFeedback
  score: number | null
}): EnWritingEntry {
  const db = getSqlite()
  const res = db
    .prepare(
      `INSERT INTO en_writing (prompt_key, prompt_title, submission, feedback, score)
       VALUES (?, ?, ?, ?, ?)`
    )
    .run(
      input.promptKey,
      input.promptTitle,
      input.submission,
      JSON.stringify(input.feedback),
      input.score
    )
  const row = db
    .prepare('SELECT * FROM en_writing WHERE id = ?')
    .get(Number(res.lastInsertRowid)) as Record<string, unknown>
  return mapWriting(row)
}

export function listWritings(limit = 50): EnWritingEntry[] {
  const rows = getSqlite()
    .prepare('SELECT * FROM en_writing ORDER BY created_at DESC, id DESC LIMIT ?')
    .all(limit) as Record<string, unknown>[]
  return rows.map(mapWriting)
}

export function removeWriting(id: number): void {
  getSqlite().prepare('DELETE FROM en_writing WHERE id = ?').run(id)
}
