import { getSqlite } from '../db/connection'
import { mapMedia, mapTag, mapPerson, mapCompany, mapCharacter } from './mappers'
import type {
  MediaItem,
  MediaItemInput,
  MediaListFilter,
  MediaDetail,
  CastEntry,
  MediaCharacterEntry,
  ThemeSong,
  CreditRole,
  MediaCompanyRole
} from '@shared/types'

// Columns that map 1:1 from MediaItemInput -> media_item (excluding tags).
const COL = {
  mediaType: 'media_type',
  title: 'title',
  titleOriginal: 'title_original',
  synopsis: 'synopsis',
  coverPath: 'cover_path',
  releaseDate: 'release_date',
  totalUnits: 'total_units',
  status: 'status',
  score: 'score',
  progress: 'progress',
  startedAt: 'started_at',
  finishedAt: 'finished_at',
  rewatchCount: 'rewatch_count',
  notes: 'notes',
  favorite: 'favorite',
  metadata: 'metadata'
} as const

function normalize(key: string, value: unknown): unknown {
  if (key === 'favorite') return value ? 1 : 0
  if (key === 'metadata') return value == null ? null : JSON.stringify(value)
  return value === undefined ? null : value
}

export function list(filter: MediaListFilter): MediaItem[] {
  const db = getSqlite()
  const where: string[] = ['m.media_type = ?']
  const params: unknown[] = [filter.mediaType]

  if (filter.status) {
    where.push('m.status = ?')
    params.push(filter.status)
  }
  if (filter.search) {
    where.push('(m.title LIKE ? OR m.title_original LIKE ?)')
    const q = `%${filter.search}%`
    params.push(q, q)
  }
  if (filter.tagId) {
    where.push('EXISTS (SELECT 1 FROM media_tag mt WHERE mt.media_id = m.id AND mt.tag_id = ?)')
    params.push(filter.tagId)
  }
  if (filter.favorite) {
    where.push('m.favorite = 1')
  }

  const sortCol =
    filter.sort === 'score'
      ? 'm.score'
      : filter.sort === 'release'
        ? 'm.release_date'
        : filter.sort === 'title'
          ? 'm.title'
          : 'm.updated_at'
  const dir = filter.sortDir === 'asc' ? 'ASC' : 'DESC'
  // NULLs always sort last regardless of direction.
  const nullsLast = `(${sortCol} IS NULL)`

  const rows = db
    .prepare(
      `SELECT m.* FROM media_item m
       WHERE ${where.join(' AND ')}
       ORDER BY ${nullsLast} ASC, ${sortCol} ${dir}, m.title ASC`
    )
    .all(...params)
  return rows.map(mapMedia)
}

export function statusCounts(mediaType: string): Record<string, number> {
  const db = getSqlite()
  const rows = db
    .prepare(
      `SELECT status, COUNT(*) AS n FROM media_item
       WHERE media_type = ? GROUP BY status`
    )
    .all(mediaType) as { status: string | null; n: number }[]
  const out: Record<string, number> = {}
  for (const r of rows) if (r.status) out[r.status] = r.n
  return out
}

export function get(id: number): MediaDetail | null {
  const db = getSqlite()
  const row = db.prepare('SELECT * FROM media_item WHERE id = ?').get(id)
  if (!row) return null
  const base = mapMedia(row)

  const tags = db
    .prepare(
      `SELECT t.* FROM tag t JOIN media_tag mt ON mt.tag_id = t.id
       WHERE mt.media_id = ? ORDER BY t.name`
    )
    .all(id)
    .map(mapTag)

  const companies = (
    db
      .prepare(
        `SELECT mc.id AS mc_id, mc.role AS mc_role,
                c.id, c.name, c.name_native, c.type, c.logo_path,
                c.external_source, c.external_id
         FROM media_company mc
         JOIN company c ON c.id = mc.company_id
         WHERE mc.media_id = ? ORDER BY c.name`
      )
      .all(id) as Record<string, unknown>[]
  ).map((r) => ({
    id: r.mc_id as number,
    role: r.mc_role as MediaCompanyRole,
    company: mapCompany(r)
  }))

  const cast: CastEntry[] = (
    db
      .prepare(
        `SELECT cr.id AS credit_id, cr.role AS credit_role, cr.language AS credit_language,
                p.id AS p_id, p.name AS p_name, p.name_native AS p_name_native,
                p.photo_path AS p_photo_path, p.bio AS p_bio, p.birthday AS p_birthday,
                p.external_source AS p_external_source, p.external_id AS p_external_id,
                ch.id AS ch_id, ch.name AS ch_name, ch.name_native AS ch_name_native,
                ch.image_path AS ch_image_path, ch.description AS ch_description
         FROM credit cr
         JOIN person p ON p.id = cr.person_id
         LEFT JOIN character ch ON ch.id = cr.character_id
         WHERE cr.media_id = ?
         ORDER BY COALESCE(cr.importance, 100) ASC, cr.id ASC`
      )
      .all(id) as Record<string, unknown>[]
  ).map((r) => ({
    creditId: r.credit_id as number,
    role: r.credit_role as CreditRole,
    language: (r.credit_language as string) ?? null,
    person: mapPerson({
      id: r.p_id,
      name: r.p_name,
      name_native: r.p_name_native,
      photo_path: r.p_photo_path,
      bio: r.p_bio,
      birthday: r.p_birthday,
      external_source: r.p_external_source,
      external_id: r.p_external_id
    }),
    character:
      r.ch_id == null
        ? null
        : mapCharacter({
            id: r.ch_id,
            name: r.ch_name,
            name_native: r.ch_name_native,
            image_path: r.ch_image_path,
            description: r.ch_description
          })
  }))

  // Character-centric list: every linked character in source order, each with
  // all of its voice actors (so a char with multiple VAs appears once).
  const charRows = db
    .prepare(
      `SELECT mc.sort_order AS sort_order,
              ch.id AS ch_id, ch.name AS ch_name, ch.name_native AS ch_name_native,
              ch.image_path AS ch_image_path, ch.description AS ch_description,
              cr.id AS credit_id, cr.language AS credit_language,
              p.id AS p_id, p.name AS p_name, p.name_native AS p_name_native,
              p.photo_path AS p_photo_path, p.bio AS p_bio, p.birthday AS p_birthday,
              p.external_source AS p_external_source, p.external_id AS p_external_id
       FROM media_character mc
       JOIN character ch ON ch.id = mc.character_id
       LEFT JOIN credit cr
         ON cr.media_id = mc.media_id AND cr.character_id = mc.character_id
            AND cr.role IN ('voice_actor', 'actor')
       LEFT JOIN person p ON p.id = cr.person_id
       WHERE mc.media_id = ?
       ORDER BY COALESCE(mc.sort_order, 1000000) ASC, ch.name ASC, cr.id ASC`
    )
    .all(id) as Record<string, unknown>[]

  const charMap = new Map<number, MediaCharacterEntry>()
  for (const r of charRows) {
    const chId = r.ch_id as number
    let entry = charMap.get(chId)
    if (!entry) {
      entry = {
        character: mapCharacter({
          id: r.ch_id,
          name: r.ch_name,
          name_native: r.ch_name_native,
          image_path: r.ch_image_path,
          description: r.ch_description
        }),
        voices: []
      }
      charMap.set(chId, entry)
    }
    if (r.credit_id != null) {
      entry.voices.push({
        creditId: r.credit_id as number,
        language: (r.credit_language as string) ?? null,
        person: mapPerson({
          id: r.p_id,
          name: r.p_name,
          name_native: r.p_name_native,
          photo_path: r.p_photo_path,
          bio: r.p_bio,
          birthday: r.p_birthday,
          external_source: r.p_external_source,
          external_id: r.p_external_id
        })
      })
    }
  }
  const characters = [...charMap.values()]

  // Theme songs (anime OP/ED), each with its performing artist(s), in source order.
  const themeRows = db
    .prepare(
      `SELECT ts.id AS ts_id, ts.slug, ts.type, ts.sequence, ts.title,
              ts.audio_url, ts.audio_path, ts.sort_order,
              p.id AS p_id, p.name AS p_name, p.name_native AS p_name_native,
              p.photo_path AS p_photo_path, p.bio AS p_bio, p.birthday AS p_birthday,
              p.external_source AS p_external_source, p.external_id AS p_external_id,
              ta.sort_order AS ta_order
       FROM theme_song ts
       LEFT JOIN theme_artist ta ON ta.theme_song_id = ts.id
       LEFT JOIN person p ON p.id = ta.person_id
       WHERE ts.media_id = ?
       ORDER BY COALESCE(ts.sort_order, 1000) ASC, ts.id ASC, COALESCE(ta.sort_order, 0) ASC`
    )
    .all(id) as Record<string, unknown>[]

  const themeMap = new Map<number, ThemeSong>()
  for (const r of themeRows) {
    const tid = r.ts_id as number
    let t = themeMap.get(tid)
    if (!t) {
      t = {
        id: tid,
        slug: (r.slug as string) ?? null,
        type: (r.type as string) ?? null,
        sequence: (r.sequence as number) ?? null,
        title: (r.title as string) ?? null,
        audioUrl: (r.audio_url as string) ?? null,
        audioPath: (r.audio_path as string) ?? null,
        artists: []
      }
      themeMap.set(tid, t)
    }
    if (r.p_id != null) {
      t.artists.push(
        mapPerson({
          id: r.p_id,
          name: r.p_name,
          name_native: r.p_name_native,
          photo_path: r.p_photo_path,
          bio: r.p_bio,
          birthday: r.p_birthday,
          external_source: r.p_external_source,
          external_id: r.p_external_id
        })
      )
    }
  }
  const themes = [...themeMap.values()]

  return { ...base, tags, companies, cast, characters, themes }
}

function setTags(mediaId: number, tagIds: number[]): void {
  const db = getSqlite()
  db.prepare('DELETE FROM media_tag WHERE media_id = ?').run(mediaId)
  const ins = db.prepare(
    'INSERT OR IGNORE INTO media_tag (media_id, tag_id) VALUES (?, ?)'
  )
  for (const t of tagIds) ins.run(mediaId, t)
}

export function create(input: MediaItemInput): number {
  const db = getSqlite()
  const cols: string[] = []
  const placeholders: string[] = []
  const values: unknown[] = []
  for (const [key, col] of Object.entries(COL)) {
    if (key in input) {
      cols.push(col)
      placeholders.push('?')
      values.push(normalize(key, (input as unknown as Record<string, unknown>)[key]))
    }
  }
  const tx = db.transaction(() => {
    const info = db
      .prepare(`INSERT INTO media_item (${cols.join(',')}) VALUES (${placeholders.join(',')})`)
      .run(...values)
    const id = Number(info.lastInsertRowid)
    if (input.tagIds) setTags(id, input.tagIds)
    return id
  })
  return tx()
}

export function update(id: number, input: Partial<MediaItemInput>): void {
  const db = getSqlite()
  const sets: string[] = []
  const values: unknown[] = []
  for (const [key, col] of Object.entries(COL)) {
    if (key in input) {
      sets.push(`${col} = ?`)
      values.push(normalize(key, (input as unknown as Record<string, unknown>)[key]))
    }
  }
  const tx = db.transaction(() => {
    if (sets.length) {
      sets.push(`updated_at = datetime('now')`)
      db.prepare(`UPDATE media_item SET ${sets.join(', ')} WHERE id = ?`).run(...values, id)
    }
    if (input.tagIds) setTags(id, input.tagIds)
  })
  tx()
}

export function remove(id: number): void {
  getSqlite().prepare('DELETE FROM media_item WHERE id = ?').run(id)
}
