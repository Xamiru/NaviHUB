import { getSqlite } from '../db/connection'
import { mapCompany, mapMedia, mapPerson } from './mappers'
import * as listRepo from './listRepo'
import * as tierListRepo from './tierListRepo'
import type { Company, CompanyCollaborator, MediaItem, MediaType } from '@shared/types'

// Sorted by how many distinct works they're linked to (most prolific first).
// `mediaType` scopes the list to companies linked to works of that type (e.g.
// the Studios browse is anime-only) by INNER JOINing media_item; omit for all.
export function list(search?: string, mediaType?: MediaType | MediaType[], limit?: number): Company[] {
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
       ORDER BY COUNT(DISTINCT mc.media_id) DESC, c.name ASC
       ${limit == null ? '' : 'LIMIT ?'}`
    )
    .all(...params, ...(limit == null ? [] : [Math.max(0, Math.trunc(limit))]))
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

// Frequent collaborators: crew (credits without a character) on two or more of
// this company's works. (person, title, role) triples are de-duplicated first,
// then the top people get their role labels, most frequent first. Labels match
// crewRoleLabel (source text, else the role with spaces). `pairs` is
// MATERIALIZED because both `counted` and `labels` read it. Seeks
// idx_mc_company then idx_credit_media.
export function collaborators(id: number, limit = 12): CompanyCollaborator[] {
  const rows = getSqlite()
    .prepare(
      `WITH works AS (SELECT media_id FROM media_company WHERE company_id = @id),
       pairs AS MATERIALIZED (
         SELECT DISTINCT c.person_id, c.media_id, COALESCE(c.role_note, REPLACE(c.role, '_', ' ')) AS label
         FROM works JOIN credit c ON c.media_id = works.media_id
         WHERE c.character_id IS NULL
       ),
       counted AS (
         SELECT person_id, COUNT(DISTINCT media_id) AS shared FROM pairs
         GROUP BY person_id HAVING shared >= 2
         ORDER BY shared DESC, person_id ASC LIMIT @limit
       ),
       labels AS (
         SELECT pairs.person_id, pairs.label, COUNT(*) AS n
         FROM pairs JOIN counted ON counted.person_id = pairs.person_id
         GROUP BY pairs.person_id, pairs.label
       )
       SELECT p.*, counted.shared AS shared, labels.label AS label
       FROM counted
       JOIN person p ON p.id = counted.person_id
       JOIN labels ON labels.person_id = counted.person_id
       ORDER BY counted.shared DESC, p.name ASC, labels.n DESC, labels.label ASC`
    )
    .all({ id, limit }) as Record<string, unknown>[]
  const byPerson = new Map<number, CompanyCollaborator>()
  for (const r of rows) {
    const personId = r.id as number
    const seen = byPerson.get(personId)
    if (seen) seen.roles.push(r.label as string)
    else
      byPerson.set(personId, {
        person: mapPerson(r),
        shared: r.shared as number,
        roles: [r.label as string]
      })
  }
  return [...byPerson.values()]
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
