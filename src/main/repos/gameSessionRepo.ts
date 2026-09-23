import { getSqlite } from '../db/connection'
import { foldedProgress, unitSecondsFor } from '../gameLaunchCore'

// Play sessions of games/VNs launched from the app (gameLaunch.ts) plus the
// per-title executable link. game_session is the source of truth for TRACKED
// time; media_item.progress (hours for games, minutes for VNs) moves by the
// delta of the rounded cumulative on each insert, so hand-entered progress
// from before tracking — or edited mid-tracking — is never clobbered.

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
  durationSec: number,
  runId: number | null = null
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

    const inserted = db.prepare(
      `INSERT INTO game_session (media_id, started_at, ended_at, duration)
       VALUES (?, datetime(?, 'unixepoch'), datetime(?, 'unixepoch'), ?)`
    ).run(mediaId, startedAtEpochSec, endedAtEpochSec, durationSec)

    // A run may have been removed while the game was running. Keep the session
    // and time even then; never attach it to whichever run became active later.
    if (runId != null && db.prepare('SELECT 1 FROM game_playthrough WHERE id=? AND media_id=?').get(runId, mediaId)) {
      db.prepare('INSERT INTO game_playthrough_session(session_id,run_id) VALUES(?,?)')
        .run(inserted.lastInsertRowid, runId)
    }

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

// The detail page needs only the executable and aggregate tracked time.
// Installed games reads its own bounded collection projection.
export function overview(mediaId: number): {
  exePath: string | null
  totalSeconds: number
  sessionCount: number
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
  return {
    exePath: media?.exe_path ?? null,
    totalSeconds: agg.s,
    sessionCount: agg.n
  }
}
