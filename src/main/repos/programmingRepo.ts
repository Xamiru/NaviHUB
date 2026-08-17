import { getSqlite } from '../db/connection'
import { progLesson } from '@shared/programming/courses'
import { practicePool } from '@shared/programming/cheatsheets'
import { regexGolfPuzzle } from '@shared/programming/regexGolf'
import { sqlExercise } from '@shared/programming/sqlExercises'
import type {
  ProgAttempt,
  ProgCliMiss,
  ProgCliRoundInput,
  ProgLessonProgress,
  ProgSolve,
  ProgSolveInput,
  ProgSolveKind
} from '@shared/types'

// Programming learn section: completion state only. The courses/lessons
// themselves are code (src/shared/programming/courses.ts) keyed by FROZEN
// '<courseKey>/<lessonKey>' strings; rows for keys that no longer exist in the
// catalog are harmless (ignored by the renderer) and keep history if a lesson
// ever comes back.

export function progress(): ProgLessonProgress[] {
  const rows = getSqlite()
    .prepare('SELECT lesson_key, completed_at FROM prog_progress ORDER BY completed_at ASC, id ASC')
    .all() as { lesson_key: string; completed_at: string }[]
  return rows.map((r) => ({ lessonKey: r.lesson_key, completedAt: r.completed_at }))
}

export function complete(lessonKey: string): void {
  if (!progLesson(lessonKey)) throw new Error(`Unknown lesson: ${lessonKey}`)
  getSqlite()
    .prepare('INSERT OR IGNORE INTO prog_progress (lesson_key) VALUES (?)')
    .run(lessonKey)
}

export function uncomplete(lessonKey: string): void {
  getSqlite().prepare('DELETE FROM prog_progress WHERE lesson_key = ?').run(lessonKey)
}

// ---- Lesson self-check attempts ----
// One row per finished check (every question answered). Append-only history;
// the renderer folds it into best/latest via @shared/programming/attempts.

export function recordAttempt(input: { lessonKey: string; score: number; total: number }): void {
  if (!progLesson(input.lessonKey)) throw new Error(`Unknown lesson: ${input.lessonKey}`)
  const total = Math.max(0, Math.floor(input.total))
  const score = Math.min(total, Math.max(0, Math.floor(input.score)))
  getSqlite()
    .prepare('INSERT INTO prog_attempt (lesson_key, score, total) VALUES (?, ?, ?)')
    .run(input.lessonKey, score, total)
}

export function attempts(): ProgAttempt[] {
  const rows = getSqlite()
    .prepare('SELECT lesson_key, score, total, at FROM prog_attempt ORDER BY at ASC, id ASC')
    .all() as { lesson_key: string; score: number; total: number; at: string }[]
  return rows.map((r) => ({ lessonKey: r.lesson_key, score: r.score, total: r.total, at: r.at }))
}

// ---- CLI drill weak commands ----
// A miss bumps the counter, a first-try hit walks it back down; rows at zero
// are removed so "weak commands" is exactly the non-empty set. Keys are
// validated against the live cheatsheet pool so stale keys never accumulate.

export function recordCliRound(input: ProgCliRoundInput): void {
  const valid = new Set(practicePool(null).map((i) => i.key))
  const missed = [...new Set(input.missed)].filter((k) => valid.has(k))
  const correct = [...new Set(input.correct)].filter((k) => valid.has(k) && !missed.includes(k))
  const db = getSqlite()
  const up = db.prepare(
    `INSERT INTO prog_cli_miss (cmd_key, misses, last_at) VALUES (?, 1, datetime('now'))
     ON CONFLICT(cmd_key) DO UPDATE SET misses = misses + 1, last_at = datetime('now')`
  )
  const down = db.prepare(
    `UPDATE prog_cli_miss SET misses = MAX(0, misses - 1), last_at = datetime('now') WHERE cmd_key = ?`
  )
  const sweep = db.prepare('DELETE FROM prog_cli_miss WHERE misses <= 0')
  db.transaction(() => {
    for (const k of missed) up.run(k)
    for (const k of correct) down.run(k)
    sweep.run()
  })()
}

export function cliMisses(): ProgCliMiss[] {
  const rows = getSqlite()
    .prepare('SELECT cmd_key, misses, last_at FROM prog_cli_miss ORDER BY misses DESC, last_at DESC')
    .all() as { cmd_key: string; misses: number; last_at: string }[]
  return rows.map((r) => ({ cmdKey: r.cmd_key, misses: r.misses, lastAt: r.last_at }))
}

// ---- Sandbox / golf solves ----

function solveKeyExists(kind: ProgSolveKind, key: string): boolean {
  if (kind === 'sql') return sqlExercise(key) !== undefined
  if (kind === 'regex') return regexGolfPuzzle(key) !== undefined
  return false
}

export function recordSolve(input: ProgSolveInput): void {
  if (!solveKeyExists(input.kind, input.key)) {
    throw new Error(`Unknown ${input.kind} solve key: ${input.key}`)
  }
  const best = input.best == null ? null : Math.floor(input.best)
  const answer = input.answer ?? null
  const db = getSqlite()
  if (input.kind === 'regex') {
    // A lower `best` (shorter pattern) replaces the record and its pattern.
    db.prepare(
      `INSERT INTO prog_solve (kind, key, best, answer) VALUES (?, ?, ?, ?)
       ON CONFLICT(kind, key) DO UPDATE SET
         answer = CASE WHEN excluded.best IS NOT NULL AND (best IS NULL OR excluded.best < best)
                       THEN excluded.answer ELSE answer END,
         best = CASE WHEN excluded.best IS NOT NULL AND (best IS NULL OR excluded.best < best)
                     THEN excluded.best ELSE best END`
    ).run(input.kind, input.key, best, answer)
  } else {
    db.prepare(
      'INSERT OR IGNORE INTO prog_solve (kind, key, best, answer) VALUES (?, ?, ?, ?)'
    ).run(input.kind, input.key, best, answer)
  }
}

export function solves(): ProgSolve[] {
  const rows = getSqlite()
    .prepare('SELECT kind, key, best, answer, solved_at FROM prog_solve ORDER BY solved_at ASC, id ASC')
    .all() as { kind: ProgSolveKind; key: string; best: number | null; answer: string | null; solved_at: string }[]
  return rows.map((r) => ({
    kind: r.kind,
    key: r.key,
    best: r.best,
    answer: r.answer,
    solvedAt: r.solved_at
  }))
}
