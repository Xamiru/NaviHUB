import { getSqlite } from '../db/connection'
import type { TvEpisode, TvSeason } from '@shared/types'

// The TV episode catalogue (tv_episode) — TMDB's list of what exists, which the
// detail page's Seasons tab ticks off. video_file stays the index of what you
// have on disk; the two are joined here on (season, number) so an episode you
// own can offer Play without the renderer running a second query.
//
// Progress rule: this repo NEVER writes media_item.progress. Ticking an episode
// returns `firstTime`, and ipc.ts routes that through checklistRepo.logProgress
// exactly as video:markWatched does — one "I watched another one" write in the
// app, which owns status promotion, the rewatch wrap and checklist credit.

interface EpisodeRow {
  id: number
  season: number
  number: number
  absolute: number | null
  title: string | null
  overview: string | null
  air_date: string | null
  runtime: number | null
  watched_at: string | null
  file_id: number | null
}

function mapEpisode(r: EpisodeRow): TvEpisode {
  return {
    id: r.id,
    season: r.season,
    number: r.number,
    absolute: r.absolute ?? null,
    title: r.title ?? null,
    overview: r.overview ?? null,
    airDate: r.air_date ?? null,
    runtime: r.runtime ?? null,
    watchedAt: r.watched_at ?? null,
    fileId: r.file_id ?? null
  }
}

// An episode counts as unaired when it has a date in the future. A missing date
// is treated as aired: TMDB leaves it blank on plenty of old shows, and greying
// those out would be worse than the occasional early tick.
function isUnaired(airDate: string | null, today: string): boolean {
  return !!airDate && airDate > today
}

export function listSeasons(mediaId: number, today: string): TvSeason[] {
  const db = getSqlite()
  const rows = db
    .prepare(
      `SELECT e.id, e.season, e.number, e.absolute, e.title, e.overview,
              e.air_date, e.runtime, e.watched_at,
              (SELECT vf.id FROM video_file vf
                WHERE vf.media_id = e.media_id
                  AND vf.season = e.season
                  AND vf.number = e.number
                ORDER BY vf.id LIMIT 1) AS file_id
         FROM tv_episode e
        WHERE e.media_id = ?
        ORDER BY e.season, e.number`
    )
    .all(mediaId) as EpisodeRow[]

  const seasons = new Map<number, TvSeason>()
  for (const r of rows) {
    let s = seasons.get(r.season)
    if (!s) {
      s = { season: r.season, episodes: [], watched: 0, unaired: 0 }
      seasons.set(r.season, s)
    }
    const ep = mapEpisode(r)
    s.episodes.push(ep)
    if (ep.watchedAt) s.watched++
    if (isUnaired(ep.airDate, today)) s.unaired++
  }
  return [...seasons.values()]
}

// Mirrors video/scan.ts:markWatchedIn — same COALESCE so re-ticking an already
// watched episode keeps the original date, same `firstTime` signal for the caller.
export function setWatched(
  episodeId: number,
  watched: boolean
): { mediaId: number; firstTime: boolean } | null {
  const db = getSqlite()
  const row = db
    .prepare('SELECT media_id, watched_at FROM tv_episode WHERE id = ?')
    .get(episodeId) as { media_id: number; watched_at: string | null } | undefined
  if (!row) return null
  if (watched) {
    db.prepare(
      `UPDATE tv_episode SET watched_at = COALESCE(watched_at, datetime('now')) WHERE id = ?`
    ).run(episodeId)
  } else {
    db.prepare('UPDATE tv_episode SET watched_at = NULL WHERE id = ?').run(episodeId)
  }
  return { mediaId: row.media_id, firstTime: watched && !row.watched_at }
}

// Whole-season toggle. Unaired episodes are skipped when marking watched (you
// cannot have seen them) but ARE cleared when unmarking, so the action is a
// reliable undo. Returns how many episodes became watched for the first time —
// ipc.ts logs that many progress events, so a season tick credits the checklist
// the same as ticking each episode by hand.
export function setSeasonWatched(
  mediaId: number,
  season: number,
  watched: boolean,
  today: string
): { firstTime: number } {
  const db = getSqlite()
  const tx = db.transaction((): { firstTime: number } => {
    const rows = db
      .prepare('SELECT id, air_date, watched_at FROM tv_episode WHERE media_id = ? AND season = ?')
      .all(mediaId, season) as {
      id: number
      air_date: string | null
      watched_at: string | null
    }[]
    let firstTime = 0
    for (const r of rows) {
      if (watched) {
        if (r.watched_at || isUnaired(r.air_date, today)) continue
        db.prepare(`UPDATE tv_episode SET watched_at = datetime('now') WHERE id = ?`).run(r.id)
        firstTime++
      } else if (r.watched_at) {
        db.prepare('UPDATE tv_episode SET watched_at = NULL WHERE id = ?').run(r.id)
      }
    }
    return { firstTime }
  })
  return tx()
}

export interface ImportedEpisode {
  season: number
  number: number
  absolute: number | null
  title: string | null
  overview: string | null
  airDate: string | null
  runtime: number | null
}

// What one import run actually learned: the episodes it fetched, and the
// seasons it fetched them FROM. The second half is load-bearing — a season TMDB
// failed to serve is simply absent from `episodes`, indistinguishable from a
// season that lost all its episodes, and only the caller knows which it was.
export interface EpisodeCatalogue {
  episodes: ImportedEpisode[]
  seasons: number[] // season numbers whose catalogue actually came back
}

// Re-import is authoritative: canonical fields refresh, episodes TMDB no longer
// lists are pruned, and watched_at survives (it is never in the UPDATE). Called
// inside the importer's single transaction — it opens none of its own.
export function replaceEpisodes(mediaId: number, catalogue: EpisodeCatalogue): void {
  const db = getSqlite()
  const { episodes, seasons } = catalogue
  const upsert = db.prepare(
    `INSERT INTO tv_episode (media_id, season, number, absolute, title, overview, air_date, runtime)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(media_id, season, number) DO UPDATE SET
       -- COALESCE: a partial run sends absolute = null rather than a number it
       -- knows is short, so an earlier complete run's numbering survives.
       absolute = COALESCE(excluded.absolute, tv_episode.absolute),
       title    = excluded.title,
       overview = excluded.overview,
       air_date = excluded.air_date,
       runtime  = excluded.runtime`
  )
  for (const e of episodes) {
    upsert.run(mediaId, e.season, e.number, e.absolute, e.title, e.overview, e.airDate, e.runtime)
  }
  // Prune with an explicit keep-list rather than "delete all, reinsert": the
  // latter would drop watched_at on every re-import. The list is inlined because
  // a row-value IN cannot be parameterised; every element is forced through
  // Number() first so nothing but a numeric literal can reach the SQL.
  //
  // Scoped to the seasons actually fetched. Pruning show-wide against a partial
  // keep-list would delete every row of a season whose request failed — and
  // watched_at with it, which no later re-import can bring back.
  const scope = seasons.map((s) => Number(s)).filter((s) => Number.isInteger(s))
  if (scope.length === 0) return
  const inScope = `season IN (${scope.join(',')})`
  const keep = episodes
    .map((e) => [Number(e.season), Number(e.number)])
    .filter(([s, n]) => Number.isInteger(s) && Number.isInteger(n))
    .map(([s, n]) => `(${s},${n})`)
    .join(',')
  db.prepare(
    keep
      ? `DELETE FROM tv_episode
          WHERE media_id = ? AND ${inScope} AND (season, number) NOT IN (VALUES ${keep})`
      : `DELETE FROM tv_episode WHERE media_id = ? AND ${inScope}`
  ).run(mediaId)
}
