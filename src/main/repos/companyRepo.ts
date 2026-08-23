import { getSqlite } from '../db/connection'
import { mapCompany, mapMedia } from './mappers'
import * as listRepo from './listRepo'
import * as tierListRepo from './tierListRepo'
import type { Company, MediaItem, MediaType } from '@shared/types'

// Sorted by how many distinct works they're linked to (most prolific first).
// `mediaType` scopes the list to companies linked to works of that type (e.g.
// the Studios browse is anime-only) by INNER JOINing media_item; omit for all.
export function list(search?: string, mediaType?: MediaType | MediaType[]): Company[] {
  const db = getSqlite()
  const types = mediaType ? (Array.isArray(mediaType) ? mediaType : [mediaType]) : []
  const join = types.length
    ? `JOIN media_company mc ON mc.company_id = c.id
       JOIN media_item m ON m.id = mc.media_id AND m.media_type IN (${types.map(() => '?').join(', ')})`
    : 'LEFT JOIN media_company mc ON mc.company_id = c.id'
  const conds: string[] = []
  const params: unknown[] = [...types]
  if (search) {
    conds.push('(c.name LIKE ? OR c.name_native LIKE ?)')
    params.push(`%${search}%`, `%${search}%`)
  }
  const where = conds.length ? `WHERE ${conds.join(' AND ')}` : ''
  return db
    .prepare(
      `SELECT c.* FROM company c
       ${join}
       ${where}
       GROUP BY c.id
       ORDER BY COUNT(DISTINCT mc.media_id) DESC, c.name ASC`
    )
    .all(...params)
    .map(mapCompany)
}

export function get(id: number): Company | null {
  const row = getSqlite().prepare('SELECT * FROM company WHERE id = ?').get(id)
  return row ? mapCompany(row) : null
}

// All works linked to a company (powers the studio page).
export function media(id: number): MediaItem[] {
  return getSqlite()
    .prepare(
      `SELECT m.* FROM media_item m
       JOIN media_company mc ON mc.media_id = m.id
       WHERE mc.company_id = ?
       ORDER BY m.title ASC`
    )
    .all(id)
    .map(mapMedia)
}

export function upsert(input: Partial<Company> & { name: string }): number {
  const db = getSqlite()
  if (input.id) {
    db.prepare(
      `UPDATE company SET name = ?, name_native = ?, type = ?, logo_path = ? WHERE id = ?`
    ).run(
      input.name,
      input.nameNative ?? null,
      input.type ?? 'studio',
      input.logoPath ?? null,
      input.id
    )
    return input.id
  }
  const info = db
    .prepare(`INSERT INTO company (name, name_native, type, logo_path) VALUES (?, ?, ?, ?)`)
    .run(input.name, input.nameNative ?? null, input.type ?? 'studio', input.logoPath ?? null)
  return Number(info.lastInsertRowid)
}

export function remove(id: number): void {
  listRepo.removeEntityFromLists('company', id)
  tierListRepo.removeEntityFromTierLists('company', id)
  getSqlite().prepare('DELETE FROM company WHERE id = ?').run(id)
}
