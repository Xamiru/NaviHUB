import { getSqlite } from '../db/connection'
import { mapMedia, mapTag, mapPerson, mapCompany, mapCharacter } from './mappers'
import * as listRepo from './listRepo'
import * as settingsRepo from './settingsRepo'
import type {
  MediaItem,
  MediaItemInput,
  MediaListFilter,
  MediaListFacets,
  MediaDetail,
  CastEntry,
  MediaCharacterEntry,
  ThemeSong,
  CreditRole,
  MediaCompanyRole,
  MediaRelation,
  MediaType,
  LibraryTimeStats,
  TimeStatsItem,
  TimeStatsByType,
  JpMilestones,
  ResumePoint,
  ActivityHeatmap,
  ActivitySourceKey
} from '@shared/types'
import { parseStatuses } from '@shared/mediaProgress'

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

// ---- Derived SQL expressions shared by list filters, sorts and facets -------
// Every external source stores its rating under its own metadata key on its own
// scale; COALESCE folds them into ONE 0-100 "community score" so a single
// slider/sort works across anime, games, VNs and film. IMDb is 0-10 → ×10.
const COMMUNITY_SQL = `COALESCE(
  json_extract(m.metadata, '$.averageScore'),
  json_extract(m.metadata, '$.metacritic'),
  json_extract(m.metadata, '$.vndbRating'),
  json_extract(m.metadata, '$.olRating'),
  json_extract(m.metadata, '$.imdbRating') * 10
)`

// Release year: the date's year, falling back to AniList's canonical seasonYear
// for titles imported without a date.
const YEAR_SQL = `COALESCE(
  CAST(substr(m.release_date, 1, 4) AS INTEGER),
  CAST(json_extract(m.metadata, '$.seasonYear') AS INTEGER)
)`

// Airing season — mirrors seasonForItem() in @shared/season.ts: canonical
// metadata wins (AniList puts late-December premieres in the NEXT winter),
// month quarters are the fallback. Keep the two in step.
const SEASON_SQL = `CASE
  WHEN lower(json_extract(m.metadata, '$.season')) IN ('winter','spring','summer','fall')
    THEN lower(json_extract(m.metadata, '$.season'))
  WHEN m.release_date IS NULL THEN NULL
  WHEN CAST(substr(m.release_date, 6, 2) AS INTEGER) BETWEEN 1 AND 3 THEN 'winter'
  WHEN CAST(substr(m.release_date, 6, 2) AS INTEGER) BETWEEN 4 AND 6 THEN 'spring'
  WHEN CAST(substr(m.release_date, 6, 2) AS INTEGER) BETWEEN 7 AND 9 THEN 'summer'
  WHEN CAST(substr(m.release_date, 6, 2) AS INTEGER) BETWEEN 10 AND 12 THEN 'fall'
  ELSE NULL
END`

const SEASON_KEYS = new Set(['winter', 'spring', 'summer', 'fall'])

// Sort key -> column/expression. A whitelist on purpose: the value reaches SQL
// by interpolation, so it must never come from the filter object directly.
const SORT_SQL: Record<NonNullable<MediaListFilter['sort']>, string> = {
  title: 'm.title',
  score: 'm.score',
  communityScore: COMMUNITY_SQL,
  updated: 'm.updated_at',
  added: 'm.created_at',
  release: 'm.release_date',
  progress: 'm.progress',
  units: 'm.total_units',
  timesConsumed: 'm.rewatch_count',
  random: 'RANDOM()'
}

function finite(v: unknown): number | null {
  return typeof v === 'number' && Number.isFinite(v) ? v : null
}

// WHERE clauses for everything except the media type. facets() deliberately
// ignores the active filters, so it doesn't share this. Exported for themeRepo:
// the Songs page narrows the anime library with the very same filter object, so
// it must produce byte-identical clauses (alias the media_item table as `m`).
export function buildWhere(filter: MediaListFilter): { where: string[]; params: unknown[] } {
  const where: string[] = ['m.media_type = ?']
  const params: unknown[] = [filter.mediaType]

  const statuses = (filter.statuses ?? []).filter((s) => typeof s === 'string' && s !== '')
  if (statuses.length) {
    where.push(`m.status IN (${statuses.map(() => '?').join(',')})`)
    params.push(...statuses)
  } else if (filter.status) {
    where.push('m.status = ?')
    params.push(filter.status)
  }

  if (filter.search) {
    where.push('(m.title LIKE ? OR m.title_original LIKE ?)')
    const q = `%${filter.search}%`
    params.push(q, q)
  }

  const tagIds = (filter.tagIds ?? []).filter((id) => Number.isInteger(id))
  const tags = tagIds.length ? tagIds : filter.tagId ? [filter.tagId] : []
  if (tags.length) {
    if (filter.tagMode === 'all') {
      // Every tag must be present — one EXISTS per tag.
      for (const id of tags) {
        where.push('EXISTS (SELECT 1 FROM media_tag mt WHERE mt.media_id = m.id AND mt.tag_id = ?)')
        params.push(id)
      }
    } else {
      where.push(
        `EXISTS (SELECT 1 FROM media_tag mt WHERE mt.media_id = m.id
                 AND mt.tag_id IN (${tags.map(() => '?').join(',')}))`
      )
      params.push(...tags)
    }
  }

  if (filter.favorite) where.push('m.favorite = 1')

  if (filter.unrated) {
    where.push('m.score IS NULL')
  } else {
    const scoreMin = finite(filter.scoreMin)
    const scoreMax = finite(filter.scoreMax)
    if (scoreMin != null) {
      where.push('m.score >= ?')
      params.push(scoreMin)
    }
    if (scoreMax != null) {
      where.push('m.score <= ?')
      params.push(scoreMax)
    }
  }

  const bounded = (expr: string, min: unknown, max: unknown): void => {
    const lo = finite(min)
    const hi = finite(max)
    if (lo != null) {
      where.push(`${expr} >= ?`)
      params.push(lo)
    }
    if (hi != null) {
      where.push(`${expr} <= ?`)
      params.push(hi)
    }
  }
  bounded(COMMUNITY_SQL, filter.communityMin, filter.communityMax)
  bounded(YEAR_SQL, filter.yearMin, filter.yearMax)
  bounded('m.total_units', filter.unitsMin, filter.unitsMax)

  const seasons = (filter.seasons ?? []).filter((s) => SEASON_KEYS.has(s))
  if (seasons.length) {
    where.push(`${SEASON_SQL} IN (${seasons.map(() => '?').join(',')})`)
    params.push(...seasons)
  }

  return { where, params }
}

// ORDER BY for a filtered media query. Appends the seed to `params` when the
// sort is 'random', so callers must pass the same array their WHERE params are
// in. `randomIdExpr` is the row id the shuffle hashes — themeRepo passes the
// SONG id so a random Songs page shuffles songs, not whole anime.
export function buildOrder(
  filter: MediaListFilter,
  params: unknown[],
  randomIdExpr = 'm.id'
): string {
  const sortCol = SORT_SQL[filter.sort as keyof typeof SORT_SQL] ?? SORT_SQL.updated
  const dir = filter.sortDir === 'asc' ? 'ASC' : 'DESC'
  // NULLs always sort last regardless of direction. 'random' is instead a
  // SEEDED hash of the row id: same seed -> same order, so a refetch (or the
  // renderer's scroll-fed batching) doesn't reshuffle under the user; the
  // renderer bumps the seed to deal a new hand.
  if (filter.sort === 'random') {
    // Multiplicative hash mod a prime. The MULTIPLIER carries the seed (an
    // additive seed would only rotate the same order) and is folded in JS so
    // `id * mult` can never overflow SQLite's 64-bit integers.
    const seed = Math.abs(Math.trunc(finite(filter.seed) ?? 0))
    const mult = ((seed * 2 + 1) * 2654435761) % 2147483647
    params.push(mult)
    return `((${randomIdExpr} * ?) % 2147483647) ASC`
  }
  return `(${sortCol} IS NULL) ASC, ${sortCol} ${dir}, m.title ASC`
}

export function list(filter: MediaListFilter): MediaItem[] {
  const db = getSqlite()
  const { where, params } = buildWhere(filter)
  const order = buildOrder(filter, params)

  const rows = db
    .prepare(
      `SELECT m.* FROM media_item m
       WHERE ${where.join(' AND ')}
       ORDER BY ${order}`
    )
    .all(...params)
  return rows.map(mapMedia)
}

// Slider bounds for the list page's filter panel. Deliberately ignores the
// active filters: the sliders must not collapse around the current selection.
export function facets(mediaType: string): MediaListFacets {
  const row = getSqlite()
    .prepare(
      `SELECT MIN(${YEAR_SQL}) AS year_min,
              MAX(${YEAR_SQL}) AS year_max,
              MAX(m.total_units) AS units_max,
              COUNT(*) AS total
       FROM media_item m WHERE m.media_type = ?`
    )
    .get(mediaType) as {
    year_min: number | null
    year_max: number | null
    units_max: number | null
    total: number
  }
  return {
    yearMin: row.year_min ?? null,
    yearMax: row.year_max ?? null,
    unitsMax: row.units_max ?? null,
    total: row.total
  }
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

// ---- Library time stats (the /stats page) ----------------------------------
// Aggregate "time consumed" across every media type, normalized to MINUTES.
// Model: fetch the consumed rows once, do all per-type math in JS (the rules
// branch on type / completed-status / metadata / settings, which reads far
// clearer here than in a SQL CASE). Mirrors musicRepo.statsDetail's shape.

const STAT_TYPES: MediaType[] = ['anime', 'manga', 'visual_novel', 'game', 'movie', 'tv', 'book']
const ESTIMATED_TYPES = new Set<MediaType>(['anime', 'manga', 'tv', 'book'])

// Must stay in sync with isCompletedStatus() in renderer/src/lib/mediaConfig.ts —
// main can't import renderer code, so the rule is duplicated (and mirrored in SQL
// via the WHERE clause below). Covers every default 'Completed'/'Watched' preset.
function isCompleted(status: string | null): boolean {
  return !!status && /^(completed|watched)$/i.test(status.trim())
}

function num(key: string, fallback: number): number {
  const v = Number(settingsRepo.get(key))
  return Number.isFinite(v) && v > 0 ? v : fallback
}

interface StatRow {
  id: number
  media_type: MediaType
  title: string
  cover_path: string | null
  total_units: number | null
  status: string | null
  progress: number
  rewatch_count: number
  ep_duration: number | null
}

// Returns { minutes, estimated } for one consumed row. Estimated = the value
// leans on a per-unit assumption (anime/tv/manga always; game/vn only when we
// fall back to average length because no playtime was logged).
function rowMinutes(
  r: StatRow,
  animeEp: number,
  tvEp: number,
  mangaCh: number,
  bookPage: number
): { minutes: number; estimated: boolean } {
  const passes = Math.max(r.rewatch_count, 1)
  const completed = isCompleted(r.status)
  switch (r.media_type) {
    case 'game': {
      // progress = hours played (replays already folded in — never × passes)
      if (r.progress > 0) return { minutes: r.progress * 60, estimated: false }
      if (completed && r.total_units) return { minutes: r.total_units * 60, estimated: true }
      return { minutes: 0, estimated: false }
    }
    case 'visual_novel': {
      // progress = minutes played (replays already folded in — never × passes)
      if (r.progress > 0) return { minutes: r.progress, estimated: false }
      if (completed && r.total_units) return { minutes: r.total_units, estimated: true }
      return { minutes: 0, estimated: false }
    }
    case 'movie': {
      // total_units = runtime minutes; count every viewing
      return { minutes: (r.total_units ?? 0) * passes, estimated: false }
    }
    case 'anime':
    case 'tv': {
      const episodes = completed && r.total_units != null ? r.total_units : r.progress
      const perEp = r.ep_duration && r.ep_duration > 0 ? r.ep_duration : r.media_type === 'tv' ? tvEp : animeEp
      return { minutes: episodes * perEp * passes, estimated: true }
    }
    case 'manga': {
      const chapters = completed && r.total_units != null ? r.total_units : r.progress
      return { minutes: chapters * mangaCh * passes, estimated: true }
    }
    case 'book': {
      // progress = current page; total_units = page count
      const pages = completed && r.total_units != null ? r.total_units : r.progress
      return { minutes: pages * bookPage * passes, estimated: true }
    }
    default:
      return { minutes: 0, estimated: false }
  }
}

export function timeStats(): LibraryTimeStats {
  const db = getSqlite()
  const animeEp = num('stats.animeEpMinutes', 24)
  const tvEp = num('stats.tvEpMinutes', 40)
  const mangaCh = num('stats.mangaChapterMinutes', 5)
  const bookPage = num('stats.bookPageMinutes', 1.5)

  const placeholders = STAT_TYPES.map(() => '?').join(',')
  const rows = db
    .prepare(
      `SELECT id, media_type, title, cover_path, total_units, status, progress, rewatch_count,
              CAST(json_extract(metadata, '$.epDuration') AS REAL) AS ep_duration
       FROM media_item
       WHERE media_type IN (${placeholders})
         AND (progress > 0 OR rewatch_count > 0
              OR LOWER(TRIM(COALESCE(status, ''))) IN ('completed', 'watched'))`
    )
    .all(...STAT_TYPES) as StatRow[]

  const libraryCount = (
    db
      .prepare(`SELECT COUNT(*) AS n FROM media_item WHERE media_type IN (${placeholders})`)
      .get(...STAT_TYPES) as { n: number }
  ).n

  const byTypeMap = new Map<MediaType, { minutes: number; itemCount: number; items: TimeStatsItem[]; estimated: boolean }>()
  for (const t of STAT_TYPES) byTypeMap.set(t, { minutes: 0, itemCount: 0, items: [], estimated: ESTIMATED_TYPES.has(t) })

  let totalMinutes = 0
  let consumedCount = 0
  let longest: TimeStatsItem | null = null
  let mostRevisited: (TimeStatsItem & { times: number }) | null = null

  for (const r of rows) {
    const { minutes, estimated } = rowMinutes(r, animeEp, tvEp, mangaCh, bookPage)
    const item: TimeStatsItem = {
      id: r.id,
      mediaType: r.media_type,
      title: r.title,
      coverPath: r.cover_path,
      minutes,
      progress: r.progress,
      totalUnits: r.total_units,
      rewatchCount: r.rewatch_count
    }
    const bucket = byTypeMap.get(r.media_type)!
    bucket.minutes += minutes
    bucket.itemCount += 1
    bucket.items.push(item)
    if (estimated) bucket.estimated = true
    totalMinutes += minutes
    consumedCount += 1
    if (minutes > 0 && (!longest || minutes > longest.minutes)) longest = item
    if (r.rewatch_count >= 2 && (!mostRevisited || r.rewatch_count > mostRevisited.times)) {
      mostRevisited = { ...item, times: r.rewatch_count }
    }
  }

  const byType: TimeStatsByType[] = STAT_TYPES.map((t) => {
    const b = byTypeMap.get(t)!
    return {
      mediaType: t,
      minutes: b.minutes,
      estimated: b.estimated,
      itemCount: b.itemCount,
      topItems: [...b.items].sort((a, c) => c.minutes - a.minutes).slice(0, 5)
    }
  })

  return { totalMinutes, consumedCount, libraryCount, byType, longest, mostRevisited }
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
              ts.audio_url, ts.audio_path, ts.sort_order, ts.favorite,
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
        favorite: !!r.favorite,
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

  // Related titles (seasons + manga/novel source). Each stored relation is
  // resolved to a local media_item by the related work's AniList id; a LEFT JOIN
  // means un-imported relations still come back (media null) so the UI can show
  // them greyed. m2.* is the local row when present — mapMedia ignores the extra
  // mr.* columns; related_type/related_title differ in name so there's no clash.
  const relations: MediaRelation[] = (
    db
      .prepare(
        `SELECT mr.relation_type, mr.related_type, mr.related_title, m2.*
         FROM media_relation mr
         LEFT JOIN media_item m2
           ON m2.external_source = mr.related_source
          AND m2.external_id = mr.related_external_id
         WHERE mr.media_id = ?
         ORDER BY COALESCE(mr.sort_order, 1000000) ASC`
      )
      .all(id) as Record<string, unknown>[]
  ).map((r) => {
    const local = r.id != null ? mapMedia(r) : null
    return {
      relationType: r.relation_type as string,
      media: local,
      title: (local?.title as string) ?? (r.related_title as string) ?? 'Untitled',
      mediaType: (local?.mediaType ?? (r.related_type as MediaType) ?? null) as MediaType | null
    }
  })

  return { ...base, tags, companies, cast, characters, themes, relations }
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
  listRepo.removeEntityFromLists('media', id)
  getSqlite().prepare('DELETE FROM media_item WHERE id = ?').run(id)
}

// Japanese-roadmap immersion milestones (TheMoeWay targets). "Completed" is the
// POSITIONAL second status per type — parseStatuses is the checklist's proven
// path for resolving user-renamed statuses in main. Novels = manga-type items
// backed by an EPUB chapter (light novels read in the book reader); AniList
// light novels without a local EPUB honestly count as manga.
export function jpMilestones(): JpMilestones {
  const db = getSqlite()
  const completedOf = (type: MediaType): string =>
    parseStatuses(settingsRepo.get(`${type}.statuses`), type)[1] ?? 'completed'

  const animeCompleted = (
    db
      .prepare(`SELECT COUNT(*) AS n FROM media_item WHERE media_type = 'anime' AND status = ?`)
      .get(completedOf('anime')) as { n: number }
  ).n

  const mangaDone = completedOf('manga')
  const novelsCompleted = (
    db
      .prepare(
        `SELECT COUNT(*) AS n FROM media_item m
         WHERE m.media_type = 'manga' AND m.status = ?
           AND EXISTS (SELECT 1 FROM manga_chapter c
                       WHERE c.media_id = m.id AND lower(c.dir_path) LIKE '%.epub')`
      )
      .get(mangaDone) as { n: number }
  ).n
  const mangaCompleted =
    (
      db
        .prepare(`SELECT COUNT(*) AS n FROM media_item WHERE media_type = 'manga' AND status = ?`)
        .get(mangaDone) as { n: number }
    ).n - novelsCompleted

  return { animeCompleted, mangaCompleted, novelsCompleted }
}

// "Pick up where you left off" — the four resume positions the app already
// stores, in one list. This is NOT the Continue strip: Continue is "in progress
// by status", this is "you were literally on page 143", so it links straight
// into the reader/player instead of the detail page.
//
// A chapter/file counts as in-flight when it has a saved position and has NOT
// been finished. dir_path rides along so the renderer can pick the image reader
// or the book reader through readerPath() — the one place that decision lives.
export function resumePoints(limit = 8): ResumePoint[] {
  const db = getSqlite()
  const rows = db
    .prepare(
      `SELECT * FROM (
         SELECT 'chapter' AS kind, c.id AS ref_id, c.media_id, c.dir_path, c.title AS part_title,
                c.last_read_page AS position, c.page_count AS total, c.updated_at AS at
         FROM manga_chapter c
         WHERE c.last_read_page IS NOT NULL AND c.last_read_page > 0 AND c.read_at IS NULL
         UNION ALL
         SELECT 'video', f.id, f.media_id, f.file_path, f.title,
                CAST(f.resume_seconds AS INTEGER), CAST(f.duration AS INTEGER), f.updated_at
         FROM video_file f
         WHERE f.resume_seconds IS NOT NULL AND f.resume_seconds > 0 AND f.watched_at IS NULL
       )
       ORDER BY at DESC LIMIT ?`
    )
    .all(limit) as {
    kind: 'chapter' | 'video'
    ref_id: number
    media_id: number
    dir_path: string
    part_title: string
    position: number
    total: number | null
    at: string
  }[]
  if (rows.length === 0) return []
  // One extra query rather than a join per row; the media rows are the same
  // shape every card in the app renders.
  const byId = new Map<number, MediaItem>()
  const ids = [...new Set(rows.map((r) => r.media_id))]
  for (const row of db
    .prepare(`SELECT * FROM media_item WHERE id IN (${ids.map(() => '?').join(',')})`)
    .all(...ids) as Record<string, unknown>[]) {
    const item = mapMedia(row)
    byId.set(item.id, item)
  }
  return rows.flatMap((r) => {
    const media = byId.get(r.media_id)
    if (!media) return []
    return [
      {
        kind: r.kind,
        refId: r.ref_id,
        media,
        dirPath: r.dir_path,
        partTitle: r.part_title,
        position: r.position,
        total: r.total,
        updatedAt: r.at
      }
    ]
  })
}

// One "what did I actually do" grid over every dated log the app keeps. Five
// separate histories existed and /stats rendered a calendar for none of them.
//
// Every query is bounded to the rendered window: the grid draws 52 weeks either
// way, so an unbounded GROUP BY would read all of history and grow forever
// while the output did not (the same bound checklistRepo's perDay set uses).
// Compared against the RAW column, never date(col,'localtime'): wrapping the
// column in a function makes idx_jp_review_log_time, idx_en_review_log_time,
// idx_music_play_log_played and idx_game_session_started unusable, so all six
// queries degraded to full scans of the largest tables in the database. The
// bound is generous (UTC vs local, plus the grid's first column can reach 369
// days back) — bucketing still happens in local time in the SELECT.
const ACTIVITY_WINDOW = `>= datetime('now', '-371 days')`

const ACTIVITY_SOURCES: { key: ActivitySourceKey; label: string; sql: string }[] = [
  { key: 'jpReviews', label: 'Japanese reviews', sql: activitySql('jp_review_log', 'reviewed_at') },
  { key: 'enReviews', label: 'English reviews', sql: activitySql('en_review_log', 'reviewed_at') },
  { key: 'progress', label: 'Progress logged', sql: activitySql('checklist_log', 'created_at') },
  { key: 'music', label: 'Tracks played', sql: activitySql('music_play_log', 'played_at') },
  { key: 'quiz', label: 'Quiz rounds', sql: activitySql('quiz_session', 'played_at') },
  { key: 'games', label: 'Play sessions', sql: activitySql('game_session', 'started_at') }
]

function activitySql(table: string, column: string): string {
  return `SELECT date(${column}, 'localtime') AS day, COUNT(*) AS n FROM ${table}
          WHERE ${column} ${ACTIVITY_WINDOW} GROUP BY day`
}

export function activityHeatmap(): ActivityHeatmap {
  const db = getSqlite()
  const totals = new Map<string, number>()
  const sources = ACTIVITY_SOURCES.map((src) => {
    const days = db.prepare(src.sql).all() as { day: string; count?: number; n: number }[]
    const mapped = days.map((d) => ({ day: d.day, count: d.n }))
    for (const d of mapped) totals.set(d.day, (totals.get(d.day) ?? 0) + d.count)
    return { key: src.key, label: src.label, days: mapped }
  })
  return {
    combined: [...totals.entries()]
      .map(([day, count]) => ({ day, count }))
      .sort((a, b) => a.day.localeCompare(b.day)),
    sources
  }
}
