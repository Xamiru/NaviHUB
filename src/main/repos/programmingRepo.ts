import { getSqlite } from '../db/connection'
import { progLesson } from '@shared/programming/courses'
import type { ProgLessonProgress } from '@shared/types'

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
