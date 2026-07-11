import { getSqlite } from '../db/connection'
import { mapMedia, mapTag } from './mappers'
import type { MediaItem, MediaType, Tag, TagWithCounts } from '@shared/types'

export function list(): Tag[] {
  return getSqlite().prepare('SELECT * FROM tag ORDER BY name').all().map(mapTag)
}

export function get(id: number): Tag | null {
  const row = getSqlite().prepare('SELECT * FROM tag WHERE id = ?').get(id)
  return row ? mapTag(row) : null
}

// All tags with per-type usage counts (LEFT JOINs so unused tags appear at 0).
// One grouped query; rows are folded per tag in JS like quizRepo groups artists.
export function listWithCounts(): TagWithCounts[] {
  const rows = getSqlite()
    .prepare(
      `SELECT t.id, t.name, t.category, mi.media_type, COUNT(mi.id) AS count
       FROM tag t
       LEFT JOIN media_tag mt ON mt.tag_id = t.id
       LEFT JOIN media_item mi ON mi.id = mt.media_id
       GROUP BY t.id, mi.media_type
       ORDER BY t.name ASC`
    )
    .all() as {
    id: number
    name: string
    category: string | null
    media_type: string | null
    count: number
  }[]

  const byId = new Map<number, TagWithCounts>()
  for (const r of rows) {
    let t = byId.get(r.id)
    if (!t) {
      t = { id: r.id, name: r.name, category: r.category, counts: [], total: 0 }
      byId.set(r.id, t)
    }
    if (r.media_type) {
      t.counts.push({ mediaType: r.media_type as MediaType, count: r.count })
      t.total += r.count
    }
  }
  return [...byId.values()]
}

// Everything tagged with this tag, across media types (the /tags/:id page
// groups by type in the renderer).
export function media(tagId: number): MediaItem[] {
  return getSqlite()
    .prepare(
      `SELECT m.* FROM media_item m
       JOIN media_tag mt ON mt.media_id = m.id
       WHERE mt.tag_id = ?
       ORDER BY m.media_type ASC, m.title ASC`
    )
    .all(tagId)
    .map(mapMedia)
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
