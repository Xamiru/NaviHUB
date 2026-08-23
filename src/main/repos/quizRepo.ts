import { getSqlite } from '../db/connection'
import { ERAS } from '@shared/era'
import type {
  QuizCharacterItem,
  QuizHistory,
  QuizKind,
  QuizLibFilter,
  QuizSession,
  QuizSessionInput,
  QuizSong,
  QuizSongFilter,
  QuizSynopsisItem,
  QuizVaItem
} from '@shared/types'

// An anime's year for era filtering: canonical AniList seasonYear from the
// metadata JSON when present (json_valid guards malformed blobs from throwing),
// else the release-date year — the same precedence as @shared/season.ts.
// Exported because every library quiz pool (manga panels included) needs the
// same two affinity expressions over a media_item aliased `mi`.
export const YEAR_EXPR = `CAST(COALESCE(
  CASE WHEN json_valid(mi.metadata) THEN json_extract(mi.metadata, '$.seasonYear') END,
  substr(mi.release_date, 1, 4)
) AS INTEGER)`

// Comma-joined tag names for the media aliased `mi` — distractor affinity.
export const GENRE_CSV_EXPR = `(SELECT GROUP_CONCAT(DISTINCT t.name) FROM media_tag mt
   JOIN tag t ON t.id = mt.tag_id WHERE mt.media_id = mi.id)`

function statusClause(filter: QuizLibFilter, where: string[], params: unknown[]): void {
  const statuses = filter.statuses?.filter((s) => s)
  if (statuses && statuses.length > 0) {
    where.push(`mi.status IN (${statuses.map(() => '?').join(', ')})`)
    params.push(...statuses)
  }
}

function typeClause(filter: QuizLibFilter, where: string[], params: unknown[]): void {
  const types = filter.mediaTypes?.filter((t) => t)
  if (types && types.length > 0) {
    where.push(`mi.media_type IN (${types.map(() => '?').join(', ')})`)
    params.push(...types)
  }
}

// The song quiz pool: every anime theme that has playable audio (a local file or
// a remote stream), flattened with the anime it belongs to and its performers.
// Filtering happens here; the renderer does the shuffling, option-picking and
// scoring, so we return the whole matching set (a personal library is small).
export function songPool(filter: QuizSongFilter = {}): QuizSong[] {
  const db = getSqlite()

  const where: string[] = [
    `mi.media_type = 'anime'`,
    `(ts.audio_url IS NOT NULL OR ts.audio_path IS NOT NULL)`
  ]
  const params: unknown[] = []

  if (filter.songType) {
    where.push('ts.type = ?')
    params.push(filter.songType)
  }
  const statuses = filter.statuses?.filter((s) => s)
  if (statuses && statuses.length > 0) {
    where.push(`mi.status IN (${statuses.map(() => '?').join(', ')})`)
    params.push(...statuses)
  }

  // Era filter: OR together a year-range clause per selected decade. A NULL
  // year (unknown release) matches no range, so those anime drop out while a
  // filter is active — same as the Seasonal page's Unknown handling.
  const eras = filter.eras?.filter((k) => k)
  if (eras && eras.length > 0) {
    const clauses: string[] = []
    for (const key of eras) {
      const era = ERAS.find((e) => e.key === key)
      if (!era) continue
      const parts: string[] = []
      if (era.minYear != null) {
        parts.push(`${YEAR_EXPR} >= ?`)
        params.push(era.minYear)
      }
      if (era.maxYear != null) {
        parts.push(`${YEAR_EXPR} <= ?`)
        params.push(era.maxYear)
      }
      if (parts.length > 0) clauses.push(`(${parts.join(' AND ')})`)
    }
    if (clauses.length > 0) where.push(`(${clauses.join(' OR ')})`)
  }

  // One row per (theme, artist); artists are grouped in JS below, mirroring the
  // theme-loading block in mediaRepo.get(). year + genre_csv ride along so the
  // renderer can pick plausible distractors (@shared/quizDistractors).
  const rows = db
    .prepare(
      `SELECT ts.id AS ts_id, ts.slug, ts.type, ts.title,
              ts.audio_url, ts.audio_path, ts.sort_order,
              mi.id AS media_id, mi.title AS anime_title,
              mi.cover_path, mi.status,
              ${YEAR_EXPR} AS year,
              ${GENRE_CSV_EXPR} AS genre_csv,
              p.name AS artist_name, ta.sort_order AS ta_order
       FROM theme_song ts
       JOIN media_item mi ON mi.id = ts.media_id
       LEFT JOIN theme_artist ta ON ta.theme_song_id = ts.id
       LEFT JOIN person p ON p.id = ta.person_id
       WHERE ${where.join(' AND ')}
       ORDER BY mi.id ASC, COALESCE(ts.sort_order, 1000) ASC, ts.id ASC,
                COALESCE(ta.sort_order, 0) ASC`
    )
    .all(...params) as Record<string, unknown>[]

  const byId = new Map<number, QuizSong>()
  for (const r of rows) {
    const tid = r.ts_id as number
    let s = byId.get(tid)
    if (!s) {
      s = {
        themeId: tid,
        slug: (r.slug as string) ?? null,
        type: (r.type as string) ?? null,
        title: (r.title as string) ?? null,
        audioUrl: (r.audio_url as string) ?? null,
        audioPath: (r.audio_path as string) ?? null,
        mediaId: r.media_id as number,
        animeTitle: r.anime_title as string,
        coverPath: (r.cover_path as string) ?? null,
        status: (r.status as string) ?? null,
        artists: [],
        year: (r.year as number | null) ?? null,
        genres: r.genre_csv ? String(r.genre_csv).split(',') : []
      }
      byId.set(tid, s)
    }
    if (r.artist_name) s.artists.push(r.artist_name as string)
  }
  return [...byId.values()]
}

// ---- library MCQ pools (character / VA / synopsis quizzes) ----
//
// Like songPool these return the WHOLE matching set — a personal library is
// small, and the renderer owns shuffling, option-picking and scoring. Each
// pool dedupes in JS (ordered walk, first row per identity) rather than with
// GROUP BY tricks, mirroring how songPool groups its artist rows.

// Imaged characters paired with their FIRST linked title that matches the
// filter (lowest media_character id among matching rows), for "which anime is
// this character from?".
export function characterPool(filter: QuizLibFilter = {}): QuizCharacterItem[] {
  const db = getSqlite()
  const where: string[] = [`ch.image_path IS NOT NULL`, 'mi.cover_path IS NOT NULL']
  const params: unknown[] = []
  statusClause(filter, where, params)

  const rows = db
    .prepare(
      `SELECT ch.id AS character_id, ch.name, ch.name_native, ch.image_path,
              mc.id AS mc_id, mi.id AS media_id, mi.title AS media_title,
              mi.cover_path, ${YEAR_EXPR} AS year,
              ${GENRE_CSV_EXPR} AS genre_csv
       FROM media_character mc
       JOIN character ch ON ch.id = mc.character_id
       JOIN media_item mi ON mi.id = mc.media_id
       WHERE ${where.join(' AND ')}
       ORDER BY ch.id ASC, mc.id ASC`
    )
    .all(...params) as Record<string, unknown>[]

  const seen = new Set<number>()
  const out: QuizCharacterItem[] = []
  for (const r of rows) {
    const id = r.character_id as number
    if (seen.has(id)) continue
    seen.add(id)
    out.push({
      characterId: id,
      name: r.name as string,
      nameNative: (r.name_native as string) ?? null,
      imagePath: (r.image_path as string) ?? null,
      mediaId: r.media_id as number,
      mediaTitle: r.media_title as string,
      coverPath: (r.cover_path as string) ?? null,
      year: (r.year as number | null) ?? null,
      genres: r.genre_csv ? String(r.genre_csv).split(',') : []
    })
  }
  return out
}

// Japanese-role voice credits with an imaged character, one per character
// (first credit by id): seeds both VA directions. The Japanese restriction is
// what makes "who voices X?" have exactly one right answer per seed — the
// AniList importer only ever writes this exact literal.
export function vaPool(filter: QuizLibFilter = {}): QuizVaItem[] {
  const db = getSqlite()
  const where: string[] = [
    `c.role = 'voice_actor'`,
    `c.language = 'Japanese'`,
    'ch.image_path IS NOT NULL'
  ]
  const params: unknown[] = []
  statusClause(filter, where, params)

  const rows = db
    .prepare(
      `SELECT c.id AS credit_id, p.id AS person_id, p.name AS person_name, p.photo_path,
              ch.id AS character_id, ch.name AS character_name, ch.image_path AS char_image,
              mi.id AS media_id, mi.title AS media_title
       FROM credit c
       JOIN person p ON p.id = c.person_id
       JOIN character ch ON ch.id = c.character_id
       JOIN media_item mi ON mi.id = c.media_id
       WHERE ${where.join(' AND ')}
       ORDER BY ch.id ASC, c.id ASC`
    )
    .all(...params) as Record<string, unknown>[]

  const seen = new Set<number>()
  const out: QuizVaItem[] = []
  for (const r of rows) {
    const id = r.character_id as number
    if (seen.has(id)) continue
    seen.add(id)
    out.push({
      personId: r.person_id as number,
      personName: r.person_name as string,
      photoPath: (r.photo_path as string) ?? null,
      characterId: id,
      characterName: r.character_name as string,
      characterImagePath: (r.char_image as string) ?? null,
      mediaId: r.media_id as number,
      mediaTitle: r.media_title as string
    })
  }
  return out
}

// Titles with enough synopsis to be recognizable but not trivially short.
export function synopsisPool(filter: QuizLibFilter = {}): QuizSynopsisItem[] {
  const db = getSqlite()
  const where: string[] = [
    `mi.synopsis IS NOT NULL AND LENGTH(mi.synopsis) >= 120`,
    'mi.cover_path IS NOT NULL'
  ]
  const params: unknown[] = []
  statusClause(filter, where, params)
  typeClause(filter, where, params)

  const rows = db
    .prepare(
      `SELECT mi.id AS media_id, mi.media_type, mi.title, mi.cover_path, mi.synopsis,
              ${YEAR_EXPR} AS year,
              ${GENRE_CSV_EXPR} AS genre_csv
       FROM media_item mi
       WHERE ${where.join(' AND ')}`
    )
    .all(...params) as Record<string, unknown>[]

  return rows.map((r) => ({
    mediaId: r.media_id as number,
    mediaType: r.media_type as QuizSynopsisItem['mediaType'],
    title: r.title as string,
    coverPath: (r.cover_path as string) ?? null,
    synopsis: r.synopsis as string,
    year: (r.year as number | null) ?? null,
    genres: r.genre_csv ? String(r.genre_csv).split(',') : []
  }))
}

// ---- finished-round history (song + Japanese quizzes) ----

export function logSession(input: QuizSessionInput): number {
  const db = getSqlite()
  const res = db
    .prepare(
      `INSERT INTO quiz_session (kind, score, total, best_streak, settings)
       VALUES (?, ?, ?, ?, ?)`
    )
    .run(
      input.kind,
      input.score,
      input.total,
      input.bestStreak,
      input.settings ? JSON.stringify(input.settings) : null
    )
  return Number(res.lastInsertRowid)
}

function mapSession(r: Record<string, unknown>): QuizSession {
  let settings: Record<string, unknown> | null = null
  try {
    settings = r.settings ? JSON.parse(r.settings as string) : null
  } catch {
    settings = null
  }
  return {
    id: r.id as number,
    kind: r.kind as QuizKind,
    score: r.score as number,
    total: r.total as number,
    bestStreak: r.best_streak as number,
    settings,
    playedAt: r.played_at as string
  }
}

// Time-attack / points kinds: the record is the best SCORE, not the best
// accuracy — ranking those by ratio would reward slow, careful play (arcade
// speed points) or be meaningless (shiritori's score IS its chain length,
// which used to fake this by logging score = total; now it just ranks here).
export const SCORE_RANKED_KINDS: ReadonlySet<QuizKind> = new Set<QuizKind>([
  'kanaRace',
  'readingRace',
  'conjRace',
  'songArcade',
  'shiritori'
])

// Recent rounds + the personal best. "Best" is the highest accuracy among
// rounds of at least 5 questions (a lucky 1/1 endless round is not a record);
// ties go to the longer round, then the newer one. Score-ranked kinds order
// by score first (then accuracy).
export function history(kind: QuizKind, limit = 15): QuizHistory {
  const db = getSqlite()
  const recent = (
    db
      .prepare(`SELECT * FROM quiz_session WHERE kind = ? ORDER BY played_at DESC, id DESC LIMIT ?`)
      .all(kind, Math.max(1, Math.min(500, Math.floor(limit)))) as Record<string, unknown>[]
  ).map(mapSession)
  const order = SCORE_RANKED_KINDS.has(kind)
    ? 'score DESC, CAST(score AS REAL) / total DESC, played_at DESC, id DESC'
    : 'CAST(score AS REAL) / total DESC, total DESC, played_at DESC, id DESC'
  const bestRow = db
    .prepare(
      `SELECT * FROM quiz_session
       WHERE kind = ? AND total >= 5
       ORDER BY ${order}
       LIMIT 1`
    )
    .get(kind) as Record<string, unknown> | undefined
  const agg = db
    .prepare(
      `SELECT COUNT(*) AS n, COALESCE(MAX(best_streak), 0) AS streak
       FROM quiz_session WHERE kind = ?`
    )
    .get(kind) as { n: number; streak: number }
  return {
    recent,
    best: bestRow ? mapSession(bestRow) : null,
    bestStreak: agg.streak,
    totalSessions: agg.n
  }
}
