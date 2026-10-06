// The History section's window onto this machine's library: which linked
// titles are owned (by importer external id), the user's own links, and the
// cast that portrays a historical person. Every query is bounded by the small
// set of titles one page links, and seeks idx_media_external / credit indexes.

import { getSqlite } from '../db/connection'
import type { MediaType } from '@shared/types'
import { externalKey, type CastRow, type LibraryItem, type LibraryPort } from './historyViews'

interface ItemRow {
  id: number
  title: string
  media_type: MediaType
  release_date: string | null
  cover_path: string | null
  status: string | null
  external_source: string | null
  external_id: string | null
}

const COLS = 'id, title, media_type, release_date, cover_path, status, external_source, external_id'

function toItem(r: ItemRow): LibraryItem {
  const y = r.release_date ? Number(r.release_date.slice(0, 4)) : NaN
  return {
    id: r.id,
    title: r.title,
    mediaType: r.media_type,
    year: Number.isFinite(y) ? y : null,
    cover: r.cover_path,
    status: r.status,
    source: r.external_source,
    externalId: r.external_id
  }
}

export const library: LibraryPort = {
  byExternal(keys) {
    const out = new Map<string, LibraryItem>()
    if (keys.length === 0) return out
    const stmt = getSqlite().prepare(
      `SELECT ${COLS} FROM media_item WHERE external_source = ? AND external_id = ? AND media_type = ? LIMIT 1`
    )
    for (const k of keys) {
      const key = externalKey(k)
      if (out.has(key)) continue
      const row = stmt.get(k.source, k.externalId, k.mediaType) as ItemRow | undefined
      if (row) out.set(key, toItem(row))
    }
    return out
  },

  byIds(ids) {
    const out = new Map<number, LibraryItem>()
    if (ids.length === 0) return out
    const stmt = getSqlite().prepare(`SELECT ${COLS} FROM media_item WHERE id = ?`)
    for (const id of new Set(ids)) {
      const row = stmt.get(id) as ItemRow | undefined
      if (row) out.set(id, toItem(row))
    }
    return out
  },

  cast(mediaIds) {
    const out = new Map<number, CastRow[]>()
    if (mediaIds.length === 0) return out
    // Credits name the actor; media_character alone (anime and game casts
    // without a credited voice) still yields the character for matching.
    const credited = getSqlite().prepare(
      `SELECT cr.character_id AS characterId, c.name AS characterName, p.id AS personId,
              p.name AS personName, p.photo_path AS photo
       FROM credit cr
       JOIN person p ON p.id = cr.person_id
       LEFT JOIN character c ON c.id = cr.character_id
       WHERE cr.media_id = ?`
    )
    for (const id of new Set(mediaIds)) out.set(id, credited.all(id) as CastRow[])
    return out
  }
}

export function libraryItem(id: number): LibraryItem | null {
  const row = getSqlite().prepare(`SELECT ${COLS} FROM media_item WHERE id = ?`).get(id) as ItemRow | undefined
  return row ? toItem(row) : null
}
