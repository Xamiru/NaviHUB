import { getSqlite } from '../db/connection'
import { mapPerson, mapMedia, mapCharacter } from './mappers'
import * as listRepo from './listRepo'
import * as tierListRepo from './tierListRepo'
import type { Person, PersonCredit, CreditRole, MediaType } from '@shared/types'

// Sorted by how many works they're credited in (most prolific first).
// `role` (e.g. 'voice_actor', 'actor', 'director') limits the list to people
// with that kind of credit, and `mediaType` further scopes those credits to one
// media type — together they power the Voice Actors / Actors / Directors browse
// pages (e.g. movie Directors must not include anime directors). The pickers
// omit both so any person can still be assigned.
export function list(
  search?: string,
  role?: CreditRole,
  mediaType?: MediaType | MediaType[]
): Person[] {
  const db = getSqlite()
  // Actors are shared across Movies + TV, so mediaType may be a list.
  const types = mediaType ? (Array.isArray(mediaType) ? mediaType : [mediaType]) : []
  const conds: string[] = []
  const params: string[] = []
  if (search) {
    conds.push('(p.name LIKE ? OR p.name_native LIKE ?)')
    params.push(`%${search}%`, `%${search}%`)
  }
  const where = conds.length ? `WHERE ${conds.join(' AND ')}` : ''

  // When filtering, INNER JOIN the matching credits so they both narrow the list
  // and feed the COUNT ranking; scoping by media type joins media_item too.
  const joinParams: string[] = []
  let join: string
  if (role || types.length) {
    const onConds = ['cr.person_id = p.id']
    if (role) {
      onConds.push('cr.role = ?')
      joinParams.push(role)
    }
    let mediaJoin = ''
    if (types.length) {
      const placeholders = types.map(() => '?').join(', ')
      mediaJoin = ` JOIN media_item mi ON mi.id = cr.media_id AND mi.media_type IN (${placeholders})`
      joinParams.push(...types)
    }
    join = `JOIN credit cr ON ${onConds.join(' AND ')}${mediaJoin}`
  } else {
    join = 'LEFT JOIN credit cr ON cr.person_id = p.id'
  }

  // Rank by total imported roles, then number of distinct works, then name —
  // all derived purely from what's in the local library.
  return db
    .prepare(
      `SELECT p.* FROM person p
       ${join}
       ${where}
       GROUP BY p.id
       ORDER BY COUNT(cr.id) DESC, COUNT(DISTINCT cr.media_id) DESC, p.name ASC`
    )
    .all(...joinParams, ...params)
    .map(mapPerson)
}

export function get(id: number): Person | null {
  const row = getSqlite().prepare('SELECT * FROM person WHERE id = ?').get(id)
  return row ? mapPerson(row) : null
}

// The headline query: every work a person is credited in, with character + role.
export function credits(id: number): PersonCredit[] {
  const db = getSqlite()
  const rows = db
    .prepare(
      `SELECT cr.id AS credit_id, cr.role AS credit_role, cr.language AS credit_language,
              m.*,
              ch.id AS ch_id, ch.name AS ch_name, ch.name_native AS ch_name_native,
              ch.gender AS ch_gender, ch.image_path AS ch_image_path,
              ch.description AS ch_description
       FROM credit cr
       JOIN media_item m ON m.id = cr.media_id
       LEFT JOIN character ch ON ch.id = cr.character_id
       LEFT JOIN media_character mc
         ON mc.media_id = cr.media_id AND mc.character_id = cr.character_id
       WHERE cr.person_id = ?
       ORDER BY COALESCE(cr.importance, 100) ASC,
                COALESCE(mc.sort_order, 1000000) ASC,
                m.title ASC`
    )
    .all(id) as Record<string, unknown>[]

  return rows.map((r) => ({
    creditId: r.credit_id as number,
    role: r.credit_role as CreditRole,
    language: (r.credit_language as string) ?? null,
    media: mapMedia(r),
    character:
      r.ch_id == null
        ? null
        : mapCharacter({
            id: r.ch_id,
            name: r.ch_name,
            name_native: r.ch_name_native,
            gender: r.ch_gender,
            image_path: r.ch_image_path,
            description: r.ch_description
          })
  }))
}

export function upsert(input: Partial<Person> & { name: string }): number {
  const db = getSqlite()
  if (input.id) {
    db.prepare(
      `UPDATE person SET name = ?, name_native = ?, photo_path = ?, bio = ?, birthday = ?
       WHERE id = ?`
    ).run(
      input.name,
      input.nameNative ?? null,
      input.photoPath ?? null,
      input.bio ?? null,
      input.birthday ?? null,
      input.id
    )
    return input.id
  }
  const info = db
    .prepare(
      `INSERT INTO person (name, name_native, photo_path, bio, birthday)
       VALUES (?, ?, ?, ?, ?)`
    )
    .run(
      input.name,
      input.nameNative ?? null,
      input.photoPath ?? null,
      input.bio ?? null,
      input.birthday ?? null
    )
  return Number(info.lastInsertRowid)
}

export function remove(id: number): void {
  listRepo.removeEntityFromLists('person', id)
  tierListRepo.removeEntityFromTierLists('person', id)
  getSqlite().prepare('DELETE FROM person WHERE id = ?').run(id)
}
