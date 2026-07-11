import { getSqlite } from '../db/connection'
import type {
  QuizHistory,
  QuizKind,
  QuizSession,
  QuizSessionInput,
  QuizSong,
  QuizSongFilter
} from '@shared/types'

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

  // One row per (theme, artist); artists are grouped in JS below, mirroring the
  // theme-loading block in mediaRepo.get().
  const rows = db
    .prepare(
      `SELECT ts.id AS ts_id, ts.slug, ts.type, ts.title,
              ts.audio_url, ts.audio_path, ts.sort_order,
              mi.id AS media_id, mi.title AS anime_title,
              mi.cover_path, mi.status,
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
        artists: []
      }
      byId.set(tid, s)
    }
    if (r.artist_name) s.artists.push(r.artist_name as string)
  }
  return [...byId.values()]
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

// Recent rounds + the personal best. "Best" is the highest accuracy among
// rounds of at least 5 questions (a lucky 1/1 endless round is not a record);
// ties go to the longer round, then the newer one.
export function history(kind: QuizKind, limit = 15): QuizHistory {
  const db = getSqlite()
  const recent = (
    db
      .prepare(`SELECT * FROM quiz_session WHERE kind = ? ORDER BY played_at DESC, id DESC LIMIT ?`)
      .all(kind, limit) as Record<string, unknown>[]
  ).map(mapSession)
  const bestRow = db
    .prepare(
      `SELECT * FROM quiz_session
       WHERE kind = ? AND total >= 5
       ORDER BY CAST(score AS REAL) / total DESC, total DESC, played_at DESC, id DESC
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
