import { getSqlite } from '../db/connection'
import { mapPerson, mapMedia, mapCharacter } from './mappers'
import * as listRepo from './listRepo'
import * as tierListRepo from './tierListRepo'
import type {
  Person,
  PersonCredit,
  PersonCostar,
  CreditRole,
  MediaType,
  PersonDirectoryEntry,
  PersonDirectoryQuery,
  PersonDirectoryWork
} from '@shared/types'

// Sorted by how many works they're credited in (most prolific first).
// `role` (e.g. 'voice_actor', 'actor', 'director') limits the list to people
// with that kind of credit, and `mediaType` further scopes those credits to one
// media type — together they power the Voice Actors / Actors / Directors browse
// pages (e.g. movie Directors must not include anime directors). The pickers
// omit both so any person can still be assigned.
export function list(
  search?: string,
  role?: CreditRole,
  mediaType?: MediaType | MediaType[],
  limit?: number
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
       ORDER BY COUNT(cr.id) DESC, COUNT(DISTINCT cr.media_id) DESC, p.name ASC
       ${limit == null ? '' : 'LIMIT ?'}`
    )
    .all(...joinParams, ...params, ...(limit == null ? [] : [Math.max(0, Math.trunc(limit))]))
    .map(mapPerson)
}

// A role-scoped creator directory (the Mangaka page). One indexed pass from
// the type's titles to their crew credits; grouping, counts and the cover pick
// happen in JS so no per-person subquery runs. Sorted by works by default;
// the renderer re-sorts and filters the returned list.
export function directory(query: PersonDirectoryQuery): PersonDirectoryEntry[] {
  const statuses = query.readStatuses.length ? query.readStatuses : ['']
  const placeholders = statuses.map(() => '?').join(', ')
  const rows = getSqlite()
    .prepare(
      `SELECT DISTINCT cr.person_id AS person_id, m.id AS media_id, m.title AS media_title,
              m.cover_path AS media_cover, m.score AS media_score,
              (m.status IN (${placeholders}) OR m.progress > 0 OR m.rewatch_count > 0) AS media_read,
              p.*
       FROM media_item m
       -- CROSS JOIN pins the order: seek the type's titles, then their credits
       -- by idx_credit_media. Left free, SQLite walks every crew credit in the
       -- library through idx_credit_character instead.
       CROSS JOIN credit cr ON cr.media_id = m.id AND cr.role = ? AND cr.character_id IS NULL
       JOIN person p ON p.id = cr.person_id
       WHERE m.media_type = ?`
    )
    .all(...statuses, query.role, query.mediaType) as Record<string, unknown>[]

  const byPerson = new Map<
    number,
    { person: Person; works: (PersonDirectoryWork & { score: number | null })[] }
  >()
  for (const r of rows) {
    const id = r.person_id as number
    let entry = byPerson.get(id)
    if (!entry) {
      entry = { person: mapPerson(r), works: [] }
      byPerson.set(id, entry)
    }
    entry.works.push({
      id: r.media_id as number,
      title: r.media_title as string,
      coverPath: (r.media_cover as string | null) ?? null,
      read: !!r.media_read,
      score: (r.media_score as number | null) ?? null
    })
  }

  return [...byPerson.values()]
    .map(({ person, works }) => {
      const scored = works.filter((w) => w.score != null)
      const covers = [...works]
        .sort(
          (a, b) =>
            Number(b.read) - Number(a.read) ||
            (b.score ?? -1) - (a.score ?? -1) ||
            a.title.localeCompare(b.title)
        )
        .slice(0, 3)
        .map(({ id, title, coverPath, read }) => ({ id, title, coverPath, read }))
      return {
        person,
        works: works.length,
        readWorks: works.filter((w) => w.read).length,
        meanScore: scored.length
          ? scored.reduce((sum, w) => sum + (w.score as number), 0) / scored.length
          : null,
        covers
      }
    })
    .sort((a, b) => b.works - a.works || a.person.name.localeCompare(b.person.name))
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
              cr.role_note AS credit_role_note,
              m.*,
              ch.id AS ch_id, ch.name AS ch_name, ch.name_native AS ch_name_native,
              ch.gender AS ch_gender, ch.image_path AS ch_image_path,
              ch.description AS ch_description,
              mc.sort_order AS cast_position,
              COALESCE(cs.n, 0) AS cast_size
       FROM credit cr
       JOIN media_item m ON m.id = cr.media_id
       LEFT JOIN (
         SELECT x.media_id, COUNT(*) AS n FROM media_character x
         WHERE x.media_id IN (SELECT media_id FROM credit WHERE person_id = ?)
         GROUP BY x.media_id
       ) cs ON cs.media_id = cr.media_id
       LEFT JOIN character ch ON ch.id = cr.character_id
       LEFT JOIN media_character mc
         ON mc.media_id = cr.media_id AND mc.character_id = cr.character_id
       WHERE cr.person_id = ?
       ORDER BY COALESCE(cr.importance, 100) ASC,
                COALESCE(mc.sort_order, 1000000) ASC,
                m.title ASC`
    )
    .all(id, id) as Record<string, unknown>[]

  return rows.map((r) => ({
    creditId: r.credit_id as number,
    role: r.credit_role as CreditRole,
    language: (r.credit_language as string) ?? null,
    roleNote: (r.credit_role_note as string | null) ?? null,
    castPosition: (r.cast_position as number | null) ?? null,
    castSize: (r.cast_size as number) ?? 0,
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

// Co-stars: people credited with the same role and dub language on the same
// titles as this person's character-bearing credits (so a seiyuu's co-stars are
// other Japanese voices, not the English dub or the staff). Titles and
// (person, title) pairs are de-duplicated before the self-join's rows multiply:
// a prolific voice actor's raw join is ~10k rows, and counting DISTINCT over it
// cost ten times as much. Both legs seek idx_credit_person / idx_credit_media.
export function costars(id: number, limit = 12): PersonCostar[] {
  const rows = getSqlite()
    .prepare(
      `WITH mine AS (
         SELECT DISTINCT media_id, role, COALESCE(language, '') AS lang
         FROM credit WHERE person_id = @id AND character_id IS NOT NULL
       ), pairs AS (
         SELECT DISTINCT other.person_id, other.media_id
         FROM mine
         JOIN credit other
           ON other.media_id = mine.media_id
          AND other.role = mine.role
          AND COALESCE(other.language, '') = mine.lang
          AND other.character_id IS NOT NULL
         WHERE other.person_id != @id
       ), counted AS (
         SELECT person_id, COUNT(*) AS shared FROM pairs
         GROUP BY person_id HAVING shared >= 2
       )
       SELECT p.*, counted.shared AS shared
       FROM counted JOIN person p ON p.id = counted.person_id
       ORDER BY counted.shared DESC, p.name ASC
       LIMIT @limit`
    )
    .all({ id, limit }) as Record<string, unknown>[]
  return rows.map((r) => ({ person: mapPerson(r), shared: r.shared as number }))
}

export function upsert(input: Partial<Person> & { name: string }): number {
  const db = getSqlite()
  if (input.id) {
    // The person page has no birthday field; an omitted one keeps the imported date.
    db.prepare(
      `UPDATE person SET name = ?, name_native = ?, photo_path = ?, bio = ?,
         birthday = CASE WHEN ? THEN ? ELSE birthday END
       WHERE id = ?`
    ).run(
      input.name,
      input.nameNative ?? null,
      input.photoPath ?? null,
      input.bio ?? null,
      input.birthday === undefined ? 0 : 1,
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
