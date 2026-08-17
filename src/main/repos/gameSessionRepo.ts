import { getSqlite } from '../db/connection'
import { foldedProgress, unitSecondsFor } from '../gameLaunchCore'
import type { GameSessionRow } from '@shared/types'

// Play sessions of games/VNs launched from the app (gameLaunch.ts) plus the
// per-title executable link. game_session is the source of truth for TRACKED
// time; media_item.progress (hours for games, minutes for VNs) moves by the
// delta of the rounded cumulative on each insert, so hand-entered progress
// from before tracking — or edited mid-tracking — is never clobbered.

/* eslint-disable @typescript-eslint/no-explicit-any */

function mapSession(r: any): GameSessionRow {
  return {
    id: r.id,
    mediaId: r.media_id,
    startedAt: r.started_at,
    endedAt: r.ended_at,
    durationSec: r.duration
  }
}

// Written only here (and read by gameLaunch.ts) — deliberately absent from
// mediaRepo's column map, the local_dir posture.
export function setExePath(mediaId: number, exePath: string | null): void {
  getSqlite()
    .prepare(`UPDATE media_item SET exe_path = ?, updated_at = datetime('now') WHERE id = ?`)
    .run(exePath, mediaId)
}

export function launchInfo(
  mediaId: number
): { title: string; mediaType: string; exePath: string | null } | null {
  const r = getSqlite()
    .prepare('SELECT title, media_type, exe_path FROM media_item WHERE id = ?')
    .get(mediaId) as { title: string; media_type: string; exe_path: string | null } | undefined
  return r ? { title: r.title, mediaType: r.media_type, exePath: r.exe_path } : null
}

// One transaction (the musicRepo.logPlay shape): insert the session row AND
// fold its seconds into media_item.progress atomically. Timestamps arrive as
// epoch seconds and are stored as UTC datetime('now') format.
export function recordSession(
  mediaId: number,
  startedAtEpochSec: number,
  endedAtEpochSec: number,
  durationSec: number
): { progressDelta: number; progressAfter: number } {
  const db = getSqlite()
  return db.transaction(() => {
    const media = db
      .prepare('SELECT media_type, progress FROM media_item WHERE id = ?')
      .get(mediaId) as { media_type: string; progress: number } | undefined
    if (!media) throw new Error('Media item not found')

    const prior = (
      db
        .prepare('SELECT COALESCE(SUM(duration), 0) AS s FROM game_session WHERE media_id = ?')
        .get(mediaId) as { s: number }
    ).s

    db.prepare(
      `INSERT INTO game_session (media_id, started_at, ended_at, duration)
       VALUES (?, datetime(?, 'unixepoch'), datetime(?, 'unixepoch'), ?)`
    ).run(mediaId, startedAtEpochSec, endedAtEpochSec, durationSec)

    const after = foldedProgress(
      media.progress,
      prior,
      prior + durationSec,
      unitSecondsFor(media.media_type)
    )
    db.prepare(
      `UPDATE media_item SET progress = ?, updated_at = datetime('now') WHERE id = ?`
    ).run(after, mediaId)

    return { progressDelta: after - media.progress, progressAfter: after }
  })()
}

// The Playtime tab's launcher panel in one read: linked exe, tracked totals,
// recent sessions (newest first, capped — the panel is a summary, not a log
// browser).
// Weekly tracked time for the Playtime tab's chart. Weeks are Monday-based and
// bucketed in UTC (started_at is UTC, like every timestamp here): a session is
// credited to the week it STARTED, so an all-nighter counts once, where it began.
// Empty weeks are filled in by the caller-facing loop below so the chart shows
// the gaps — "played nothing for three weeks" is the shape worth seeing.
export function playtimeWeeks(mediaId: number, weeks = 12): { weekStart: string; seconds: number }[] {
  const db = getSqlite()
  const rows = db
    .prepare(
      `SELECT date(started_at, 'weekday 0', '-6 days') AS week_start,
              COALESCE(SUM(duration), 0) AS seconds
         FROM game_session
        WHERE media_id = ?
          AND date(started_at) >= date('now', ?)
        GROUP BY week_start`
    )
    .all(mediaId, `-${weeks * 7} days`) as { week_start: string; seconds: number }[]
  const bySeconds = new Map(rows.map((r) => [r.week_start, r.seconds]))

  // This week's Monday, then back one week at a time, oldest first.
  const thisMonday = db
    .prepare(`SELECT date('now', 'weekday 0', '-6 days') AS d`)
    .get() as { d: string }
  const out: { weekStart: string; seconds: number }[] = []
  for (let i = weeks - 1; i >= 0; i--) {
    const { d } = db
      .prepare(`SELECT date(?, ?) AS d`)
      .get(thisMonday.d, `-${i * 7} days`) as { d: string }
    out.push({ weekStart: d, seconds: bySeconds.get(d) ?? 0 })
  }
  return out
}

export function overview(mediaId: number): {
  exePath: string | null
  totalSeconds: number
  sessionCount: number
  sessions: GameSessionRow[]
  weeks: { weekStart: string; seconds: number }[]
} {
  const db = getSqlite()
  const media = db.prepare('SELECT exe_path FROM media_item WHERE id = ?').get(mediaId) as
    | { exe_path: string | null }
    | undefined
  const agg = db
    .prepare(
      'SELECT COUNT(*) AS n, COALESCE(SUM(duration), 0) AS s FROM game_session WHERE media_id = ?'
    )
    .get(mediaId) as { n: number; s: number }
  const sessions = db
    .prepare(
      'SELECT * FROM game_session WHERE media_id = ? ORDER BY started_at DESC, id DESC LIMIT 20'
    )
    .all(mediaId)
    .map(mapSession)
  return {
    exePath: media?.exe_path ?? null,
    totalSeconds: agg.s,
    sessionCount: agg.n,
    sessions,
    weeks: playtimeWeeks(mediaId)
  }
}
