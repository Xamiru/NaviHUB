import { getSqlite } from '../db/connection'
import type { EnWord, EnWordInput } from '@shared/types'

// Saved English words (/english). A flat personal word list — deliberately not
// part of the jp_* SRS.

function mapRow(r: Record<string, unknown>): EnWord {
  return {
    id: r.id as number,
    word: r.word as string,
    phonetic: (r.phonetic as string) ?? null,
    pos: (r.pos as string) ?? null,
    meaning: r.meaning as string,
    example: (r.example as string) ?? null,
    createdAt: r.created_at as string
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
