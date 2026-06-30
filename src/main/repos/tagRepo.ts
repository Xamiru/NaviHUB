import { getSqlite } from '../db/connection'
import { mapTag } from './mappers'
import type { Tag } from '@shared/types'

export function list(): Tag[] {
  return getSqlite().prepare('SELECT * FROM tag ORDER BY name').all().map(mapTag)
}

export function upsert(input: { name: string; category?: string | null }): number {
  const db = getSqlite()
  const existing = db.prepare('SELECT id FROM tag WHERE name = ?').get(input.name) as
    | { id: number }
    | undefined
  if (existing) {
    if (input.category !== undefined) {
      db.prepare('UPDATE tag SET category = ? WHERE id = ?').run(
        input.category ?? null,
        existing.id
      )
    }
    return existing.id
  }
  const info = db
    .prepare('INSERT INTO tag (name, category) VALUES (?, ?)')
    .run(input.name, input.category ?? null)
  return Number(info.lastInsertRowid)
}

export function remove(id: number): void {
  getSqlite().prepare('DELETE FROM tag WHERE id = ?').run(id)
}
