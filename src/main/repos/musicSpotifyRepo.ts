import { getSqlite } from '../db/connection'
import type {
  MusicTrack,
  MusicSpotifyDownloadCandidate,
  MusicSpotifyPlaylistEntry,
  SpotifyDownloadQueueAddResult,
  SpotifyDownloadQueueCard,
  SpotifyDownloadQueueCardState,
  SpotifyDownloadQueueSelection,
  SpotifyDownloadQueueSnapshot
} from '@shared/types'

export interface SpotdlSong {
  spotifyTrackId: string
  title: string
  artists: string[]
  primaryArtist: string
  albumArtist: string | null
  albumTitle: string
  duration: number | null
  coverUrl: string | null
  spotifyUrl: string
  discNo: number | null
  trackNo: number | null
  year: number | null
  rawJson: string
  spotifyAlbumId: string | null
  spotifyArtistId: string | null
  spotifyArtistIds: string[]
  albumType: 'album' | 'single' | 'compilation' | null
  listPosition?: number | null
}

export interface LocalMatchCandidate {
  id: number
  albumId?: number
  artistId?: number
  title: string
  folderArtist: string
  tagArtist: string | null
  albumTitle: string
  duration: number | null
}

export interface DownloadCandidateRow {
  localTrackId: number
  provider: 'youtube-music' | 'youtube' | 'piped' | 'bandcamp' | 'soundcloud' | 'manual'
  sourceUrl: string | null
}

export function downloadCandidate(
  sourceKind: 'playlistItem' | 'entityTrack',
  sourceId: number
): DownloadCandidateRow | null {
  const column = sourceKind === 'playlistItem' ? 'playlist_item_id' : 'entity_track_id'
  const row = getSqlite().prepare(
    `SELECT local_track_id, provider, source_url
     FROM music_spotify_download_candidate WHERE ${column}=?`
  ).get(sourceId) as Record<string, unknown> | undefined
  if (!row) return null
  return {
    localTrackId: row.local_track_id as number,
    provider: row.provider as DownloadCandidateRow['provider'],
    sourceUrl: (row.source_url as string) ?? null
  }
}

export function downloadCandidateView(
  sourceKind: 'playlistItem' | 'entityTrack',
  sourceId: number
): MusicSpotifyDownloadCandidate | null {
  const candidate = downloadCandidate(sourceKind, sourceId)
  if (!candidate) return null
  const row = getSqlite().prepare(
    `SELECT t.id, t.album_id, t.artist_id, t.file_path, t.title, t.track_no, t.disc_no,
            t.duration, t.tag_artist, t.liked_at, t.play_count, t.last_played_at,
            al.title AS album_title, al.cover_path, ar.name AS artist_name
     FROM music_track t
     JOIN music_album al ON al.id=t.album_id
     JOIN music_artist ar ON ar.id=t.artist_id WHERE t.id=?`
  ).get(candidate.localTrackId) as Record<string, unknown> | undefined
  if (!row) return null
  return {
    provider: candidate.provider,
    sourceUrl: candidate.sourceUrl,
    localTrack: {
      id: row.id as number,
      albumId: row.album_id as number,
      albumTitle: row.album_title as string,
      artistId: row.artist_id as number,
      artistName: row.artist_name as string,
      tagArtist: (row.tag_artist as string) ?? null,
      filePath: row.file_path as string,
      title: row.title as string,
      trackNo: (row.track_no as number) ?? null,
      discNo: (row.disc_no as number) ?? null,
      duration: (row.duration as number) ?? null,
      likedAt: (row.liked_at as string) ?? null,
      playCount: (row.play_count as number) ?? 0,
      lastPlayedAt: (row.last_played_at as string) ?? null,
      coverPath: (row.cover_path as string) ?? null
    }
  }
}

export function hasDownloadCandidate(sourceKind: 'playlistItem' | 'entityTrack', sourceId: number): boolean {
  return downloadCandidate(sourceKind, sourceId) != null
}

export function setDownloadCandidate(input: {
  sourceKind: 'playlistItem' | 'entityTrack'
  sourceId: number
  localTrackId: number
  provider: DownloadCandidateRow['provider']
  sourceUrl?: string | null
}): void {
  const db = getSqlite()
  db.prepare('UPDATE music_track SET spotify_review_required=1 WHERE id=?').run(input.localTrackId)
  const column = input.sourceKind === 'playlistItem' ? 'playlist_item_id' : 'entity_track_id'
  db.prepare(
    `INSERT INTO music_spotify_download_candidate
       (${column}, local_track_id, provider, source_url)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(${column}) DO UPDATE SET
       local_track_id=excluded.local_track_id,
       provider=excluded.provider,
       source_url=excluded.source_url,
       created_at=datetime('now')`
  ).run(input.sourceId, input.localTrackId, input.provider, input.sourceUrl ?? null)
}

export function clearDownloadCandidate(
  sourceKind: 'playlistItem' | 'entityTrack',
  sourceId: number
): void {
  const column = sourceKind === 'playlistItem' ? 'playlist_item_id' : 'entity_track_id'
  getSqlite().prepare(`DELETE FROM music_spotify_download_candidate WHERE ${column}=?`).run(sourceId)
}

export function confirmDownloadCandidate(input: {
  sourceKind: 'playlistItem' | 'entityTrack'
  trackId: number
}): void {
  const db = getSqlite()
  const candidate = downloadCandidate(input.sourceKind, input.trackId)
  if (!candidate) {
    throw new Error('That downloaded candidate is no longer available')
  }
  const table = input.sourceKind === 'playlistItem'
    ? 'music_spotify_playlist_item'
    : 'music_spotify_entity_track'
  const source = db.prepare(`SELECT spotify_track_id FROM ${table} WHERE id=?`)
    .get(input.trackId) as { spotify_track_id: string | null } | undefined
  if (!source) throw new Error('That saved Spotify track no longer exists')
  if (source.spotify_track_id) {
    rememberSpotifyTrackChoice(source.spotify_track_id, candidate.localTrackId)
    return
  }
  // Apple-indexed entity rows receive Spotify identity later in resolution.
  // Until then the approval remains valid for this row without pretending it
  // can safely identify other songs.
  db.transaction(() => {
    db.prepare(`UPDATE ${table} SET matched_track_id=?, match_confirmed=1, download_error=NULL WHERE id=?`)
      .run(candidate.localTrackId, input.trackId)
    db.prepare('UPDATE music_track SET spotify_review_required=0 WHERE id=?')
      .run(candidate.localTrackId)
    clearDownloadCandidate(input.sourceKind, input.trackId)
  })()
}

export function rejectDownloadCandidate(
  sourceKind: 'playlistItem' | 'entityTrack',
  sourceId: number
): void {
  clearDownloadCandidate(sourceKind, sourceId)
}

function savedSpotifyTrackChoices(): Map<string, number> {
  return new Map((getSqlite().prepare(
    `SELECT c.spotify_track_id, c.local_track_id
     FROM music_spotify_track_choice c
     JOIN music_track t ON t.id=c.local_track_id`
  ).all() as { spotify_track_id: string; local_track_id: number }[])
    .map((row) => [row.spotify_track_id, row.local_track_id]))
}

/** Record one explicit decision and apply it to every occurrence of the same
 * Spotify track. This is the control that prevents another playlist or entity
 * import from downloading a recording the user already resolved. */
export function rememberSpotifyTrackChoice(spotifyTrackId: string, localTrackId: number): void {
  const db = getSqlite()
  const local = db.prepare('SELECT id FROM music_track WHERE id=?').get(localTrackId)
  if (!local) throw new Error('That local track no longer exists')
  db.transaction(() => {
    db.prepare(
      `INSERT INTO music_spotify_track_choice (spotify_track_id, local_track_id)
       VALUES (?, ?) ON CONFLICT(spotify_track_id) DO UPDATE SET
         local_track_id=excluded.local_track_id, chosen_at=datetime('now')`
    ).run(spotifyTrackId, localTrackId)
    db.prepare(
      `UPDATE music_spotify_playlist_item SET matched_track_id=?, match_confirmed=1,
         download_skipped=0, download_error=NULL WHERE spotify_track_id=?`
    ).run(localTrackId, spotifyTrackId)
    db.prepare(
      `UPDATE music_spotify_entity_track SET matched_track_id=?, match_confirmed=1,
         download_error=NULL WHERE spotify_track_id=?`
    ).run(localTrackId, spotifyTrackId)
    db.prepare(
      `DELETE FROM music_spotify_download_candidate WHERE playlist_item_id IN
       (SELECT id FROM music_spotify_playlist_item WHERE spotify_track_id=?)`
    ).run(spotifyTrackId)
    db.prepare(
      `DELETE FROM music_spotify_download_candidate WHERE entity_track_id IN
       (SELECT id FROM music_spotify_entity_track WHERE spotify_track_id=?)`
    ).run(spotifyTrackId)
    db.prepare(
      `DELETE FROM music_spotify_download_queue_selection WHERE playlist_item_id IN
       (SELECT id FROM music_spotify_playlist_item WHERE spotify_track_id=?)`
    ).run(spotifyTrackId)
    db.prepare(
      `UPDATE music_playlist SET updated_at=datetime('now') WHERE id IN
       (SELECT playlist_id FROM music_spotify_playlist_item WHERE spotify_track_id=?)`
    ).run(spotifyTrackId)
    db.prepare('UPDATE music_track SET spotify_review_required=0 WHERE id=?').run(localTrackId)
    pruneEmptyDownloadQueueCards()
  })()
}

export function linkProvenanceTracks(input: {
  sourceKind: 'playlistItem' | 'entityTrack'
  sourceId: number
  spotifyTrackId: string
  marker: string
  manual: boolean
  provider: DownloadCandidateRow['provider']
  sourceUrl: string | null
}[]): number {
  if (!input.length) return 0
  const db = getSqlite()
  let linked = 0
  db.transaction(() => {
    for (const row of input) {
      const table = row.sourceKind === 'playlistItem'
        ? 'music_spotify_playlist_item'
        : 'music_spotify_entity_track'
      const source = db.prepare(
        `SELECT title, primary_artist, album_title, duration, disc_no, track_no,
                matched_track_id, audio_source_url, resolved_audio_url
         FROM ${table} WHERE id=?`
      ).get(row.sourceId) as Record<string, unknown> | undefined
      if (!source || source.matched_track_id != null) continue
      const local = db.prepare(
        `SELECT t.id, t.title, ar.name AS folder_artist, t.tag_artist,
                al.title AS album_title, t.duration, t.disc_no, t.track_no, t.file_path
         FROM music_track t
         JOIN music_artist ar ON ar.id=t.artist_id
         JOIN music_album al ON al.id=t.album_id
         WHERE t.file_path LIKE ?`
      ).all(`%[navihub-${row.spotifyTrackId}]%`) as Record<string, unknown>[]
      if (local.length !== 1) continue
      setDownloadCandidate({
        sourceKind: row.sourceKind,
        sourceId: row.sourceId,
        localTrackId: Number(local[0].id),
        provider: row.provider,
        sourceUrl: row.sourceUrl ?? (source.resolved_audio_url as string) ?? null
      })
      db.prepare(`UPDATE ${table} SET download_error=? WHERE id=?`)
        .run('Downloaded; compare and listen before confirming', row.sourceId)
      linked += 1
    }
  })()
  return linked
}

export function updateProvenanceTrackPaths(renames: { from: string; to: string }[]): void {
  const db = getSqlite()
  const update = db.prepare('UPDATE music_track SET file_path=? WHERE file_path=?')
  const tx = db.transaction(() => { for (const rename of renames) update.run(rename.to, rename.from) })
  tx()
}

export interface IndexedEntityTrack {
  providerTrackId: string
  title: string
  artists: string[]
  primaryArtist: string
  albumTitle: string
  duration: number | null
  discNo: number | null
  trackNo: number | null
}

export interface IndexedEntityRelease {
  expectedTracks?: number | null
  tracksLoaded?: boolean
  providerReleaseId: string
  title: string
  albumArtist: string
  year: number | null
  albumType: 'album' | 'single'
  tracks: IndexedEntityTrack[]
}

export interface EntitySnapshotRow {
  id: number
  kind: 'artist' | 'album'
  entityId: number
  provider: 'itunes' | 'spotdl'
  providerEntityId: string
  sourceName: string
  catalogueCountry?: string
  catalogueState: 'complete' | 'partial'
  refreshedAt: string
  spotifyId: string | null
  releases: Array<{
    id: number
    providerReleaseId: string
    spotifyAlbumId: string | null
    title: string
    albumArtist: string
    year: number | null
    albumType: 'album' | 'single' | null
    tracksLoaded: boolean
    expectedTracks: number | null
    metadataState: 'indexed' | 'resolved' | 'error'
    resolutionError: string | null
    tracks: Array<IndexedEntityTrack & {
      id: number
      spotifyTrackId: string | null
      spotifyUrl: string | null
      rawJson: string | null
      audioSourceUrl: string | null
      allowUnverified: boolean
      downloadError: string | null
      matchedTrackId: number | null
    }>
  }>
}

// Free YouTube Music audio is normally 128 kbps. Preserve its native Opus
// stream instead of inflating it through a second lossy MP3 encode.
const DOWNLOAD_BYTES_PER_SECOND = 16_000
const UNKNOWN_TRACK_BYTES = 4 * 1024 * 1024

function estimatedBytes(duration: number | null): number {
  return Math.ceil((duration == null ? UNKNOWN_TRACK_BYTES : duration * DOWNLOAD_BYTES_PER_SECOND) * 1.05)
}

function pruneEmptyDownloadQueueCards(): void {
  getSqlite().prepare(
    `DELETE FROM music_spotify_download_queue
     WHERE NOT EXISTS (
       SELECT 1 FROM music_spotify_download_queue_selection s WHERE s.queue_id = music_spotify_download_queue.id
     )`
  ).run()
}

function reopenCompletedDownloadQueueCards(): number {
  return getSqlite().prepare(
    `UPDATE music_spotify_download_queue
     SET state='queued', completed_at=NULL, last_error=NULL, continue_after=0,
         updated_at=datetime('now')
     WHERE state='completed' AND (
       EXISTS (
         SELECT 1
         FROM music_spotify_download_queue_selection qs
         JOIN music_spotify_entity_track t ON t.release_id=qs.release_id
         WHERE qs.queue_id=music_spotify_download_queue.id
           AND t.matched_track_id IS NULL
           AND NOT EXISTS (
             SELECT 1 FROM music_spotify_download_candidate c WHERE c.entity_track_id=t.id
           )
       )
       OR EXISTS (
         SELECT 1
         FROM music_spotify_download_queue_selection qs
         JOIN music_spotify_playlist_item i ON i.id=qs.playlist_item_id
         WHERE qs.queue_id=music_spotify_download_queue.id
           AND i.matched_track_id IS NULL AND i.download_skipped=0
           AND NOT EXISTS (
             SELECT 1 FROM music_spotify_download_candidate c WHERE c.playlist_item_id=i.id
           )
       )
     )`
  ).run().changes
}

export function normalizeInterruptedDownloadQueue(): number {
  return getSqlite().prepare(
    `UPDATE music_spotify_download_queue
     SET state='paused', last_error=COALESCE(last_error, 'Paused when NaviHUB closed'),
         updated_at=datetime('now')
     WHERE state='running'`
  ).run().changes
}

function queuePosition(): number {
  const row = getSqlite().prepare(
    'SELECT COALESCE(MAX(position), -1) + 1 AS position FROM music_spotify_download_queue'
  ).get() as { position: number }
  return row.position
}

function queueCardForSource(
  source: 'entity' | 'playlist',
  sourceId: number
): {
  id: number
  state: SpotifyDownloadQueueCardState
  allow_mismatch: number
  continue_after: number
} | null {
  const column = source === 'entity' ? 'snapshot_id' : 'playlist_id'
  return (getSqlite().prepare(
    `SELECT id, state, allow_mismatch, continue_after
     FROM music_spotify_download_queue WHERE ${column}=?`
  ).get(sourceId) as {
    id: number
    state: SpotifyDownloadQueueCardState
    allow_mismatch: number
    continue_after: number
  } | undefined) ?? null
}

function prepareQueueCard(
  source: 'entity' | 'playlist',
  sourceId: number,
  allowMismatch = false
): { id: number; state: SpotifyDownloadQueueCardState } {
  const db = getSqlite()
  const existing = queueCardForSource(source, sourceId)
  if (existing) {
    if (existing.state === 'running') {
      throw new Error('That source is downloading now. Add more after it finishes or pause it first.')
    }
    const nextState = existing.state === 'paused' ? 'paused' : 'queued'
    db.prepare(
      `UPDATE music_spotify_download_queue
       SET state=?, allow_mismatch=?, continue_after=0, last_error=NULL,
           completed_at=NULL, updated_at=datetime('now') WHERE id=?`
    ).run(
      nextState,
      Number(Boolean(existing.allow_mismatch || allowMismatch)),
      existing.id
    )
    if (nextState === 'paused' && existing.continue_after) {
      db.prepare(
        `UPDATE music_spotify_download_queue SET continue_after=1 WHERE id=?`
      ).run(existing.id)
    }
    return { id: existing.id, state: nextState }
  }
  const snapshotId = source === 'entity' ? sourceId : null
  const playlistId = source === 'playlist' ? sourceId : null
  const id = Number(db.prepare(
    `INSERT INTO music_spotify_download_queue
     (source_kind, snapshot_id, playlist_id, position, allow_mismatch)
     VALUES (?, ?, ?, ?, ?)`
  ).run(source, snapshotId, playlistId, queuePosition(), Number(allowMismatch)).lastInsertRowid)
  return { id, state: 'queued' }
}

export function addEntityToDownloadQueue(input: {
  snapshotId: number
  releaseIds: number[]
  allowMismatch?: boolean
}): SpotifyDownloadQueueAddResult {
  const db = getSqlite()
  const snapshot = getEntitySnapshotById(input.snapshotId)
  if (!snapshot) throw new Error('This saved catalogue no longer exists. Refresh it and try again.')
  const requested = [...new Set(input.releaseIds.filter(Number.isInteger))]
  if (!requested.length || requested.some((id) => !snapshot.releases.some((release) => release.id === id))) {
    throw new Error('Select at least one release from this catalogue')
  }
  if (snapshot.kind === 'album' && requested.length !== 1) {
    throw new Error('An album queue card must target one release')
  }
  const missing = snapshot.releases
    .filter((release) => requested.includes(release.id))
    .map((release) => ({
      id: release.id,
      missing: release.tracks.filter((track) =>
        track.matchedTrackId == null && !hasDownloadCandidate('entityTrack', track.id)
      ).length
    }))
    .filter((release) => release.missing > 0)
  if (!missing.length) return { jobId: null, addedSelections: 0, missingCount: 0 }
  let jobId = 0
  let addedSelections = 0
  db.transaction(() => {
    jobId = prepareQueueCard('entity', input.snapshotId, input.allowMismatch)
      .id
    const next = db.prepare(
      `SELECT COALESCE(MAX(position), -1) + 1 AS position
       FROM music_spotify_download_queue_selection WHERE queue_id=?`
    )
    const insert = db.prepare(
      `INSERT OR IGNORE INTO music_spotify_download_queue_selection
       (queue_id, release_id, position) VALUES (?, ?, ?)`
    )
    for (const release of missing) {
      const position = (next.get(jobId) as { position: number }).position
      addedSelections += insert.run(jobId, release.id, position).changes
    }
  })()
  return {
    jobId,
    addedSelections,
    missingCount: missing.reduce((sum, release) => sum + release.missing, 0)
  }
}

export function addPlaylistToDownloadQueue(input: {
  playlistId: number
  itemIds?: number[]
}): SpotifyDownloadQueueAddResult {
  const db = getSqlite()
  if (!spotifySource(input.playlistId)) throw new Error('That imported Spotify playlist no longer exists')
  const pending = pendingSpotifyItems(input.playlistId, input.itemIds)
  if (!pending.length) return { jobId: null, addedSelections: 0, missingCount: 0 }
  let jobId = 0
  let addedSelections = 0
  db.transaction(() => {
    jobId = prepareQueueCard('playlist', input.playlistId).id
    const next = db.prepare(
      `SELECT COALESCE(MAX(position), -1) + 1 AS position
       FROM music_spotify_download_queue_selection WHERE queue_id=?`
    )
    const insert = db.prepare(
      `INSERT OR IGNORE INTO music_spotify_download_queue_selection
       (queue_id, playlist_item_id, position) VALUES (?, ?, ?)`
    )
    for (const item of pending) {
      const position = (next.get(jobId) as { position: number }).position
      addedSelections += insert.run(jobId, item.id as number, position).changes
    }
  })()
  return { jobId, addedSelections, missingCount: pending.length }
}

function queueSelections(queueId: number): SpotifyDownloadQueueSelection[] {
  const db = getSqlite()
  const releaseRows = db.prepare(
    `SELECT qs.id, r.id AS source_id, r.title, r.album_artist, r.metadata_state,
            r.resolution_error,
            COUNT(t.id) AS track_count,
            COALESCE(SUM(t.matched_track_id IS NULL AND dc.id IS NULL), 0) AS missing_count,
            COALESCE(SUM(t.duration), 0) AS duration,
            COALESCE(SUM(CASE WHEN t.matched_track_id IS NULL AND dc.id IS NULL THEN
              CASE WHEN t.duration IS NULL THEN ? ELSE t.duration * ? END ELSE 0 END), 0) AS missing_bytes
     FROM music_spotify_download_queue_selection qs
     JOIN music_spotify_entity_release r ON r.id=qs.release_id
    LEFT JOIN music_spotify_entity_track t ON t.release_id=r.id
     LEFT JOIN music_spotify_download_candidate dc ON dc.entity_track_id=t.id
     WHERE qs.queue_id=? AND qs.release_id IS NOT NULL
     GROUP BY qs.id, r.id
     ORDER BY qs.position, qs.id`
  ).all(UNKNOWN_TRACK_BYTES, DOWNLOAD_BYTES_PER_SECOND, queueId) as Record<string, unknown>[]
  const playlistRows = db.prepare(
    `SELECT qs.id, i.id AS source_id, i.title, i.primary_artist, i.duration,
            i.spotify_url, i.audio_source_url, i.allow_unverified, i.download_error,
            i.matched_track_id, dc.id AS candidate_id
     FROM music_spotify_download_queue_selection qs
     JOIN music_spotify_playlist_item i ON i.id=qs.playlist_item_id
     LEFT JOIN music_spotify_download_candidate dc ON dc.playlist_item_id=i.id
     WHERE qs.queue_id=? AND qs.playlist_item_id IS NOT NULL
     ORDER BY qs.position, qs.id`
  ).all(queueId) as Record<string, unknown>[]
  const releaseTracks = db.prepare(
    `SELECT t.id, t.title, t.primary_artist, t.duration, t.spotify_url, t.matched_track_id,
            t.audio_source_url, t.allow_unverified, t.download_error
     FROM music_spotify_entity_track t
     WHERE t.release_id=? ORDER BY t.position, t.id`
  )
  return [
    ...releaseRows.map((row): SpotifyDownloadQueueSelection => ({
      id: row.id as number,
      kind: 'release',
      sourceId: row.source_id as number,
      title: row.title as string,
      subtitle: (row.album_artist as string) ?? null,
      trackCount: Number(row.track_count),
      missingCount: Number(row.missing_count),
      duration: Number(row.duration),
      missingEstimatedBytes: Math.ceil(Number(row.missing_bytes) * 1.05),
      metadataState: row.metadata_state as 'indexed' | 'resolved' | 'error',
      error: (row.resolution_error as string) ?? null,
      tracks: (releaseTracks.all(row.source_id) as Record<string, unknown>[]).map((track) => {
        const candidate = downloadCandidateView('entityTrack', track.id as number)
        const missing = track.matched_track_id == null && candidate == null
        return {
          id: track.id as number,
          sourceKind: 'entityTrack' as const,
          duration: (track.duration as number) ?? null,
          title: track.title as string,
          artist: track.primary_artist as string,
          spotifyUrl: (track.spotify_url as string) ?? null,
          missing,
          audioSourceUrl: (track.audio_source_url as string) ?? null,
          allowUnverified: Boolean(track.allow_unverified),
          error: (track.download_error as string) ?? null,
          candidate
        }
      })
    })),
    ...playlistRows.map((row): SpotifyDownloadQueueSelection => {
      const duration = (row.duration as number) ?? null
      const candidate = downloadCandidateView('playlistItem', row.source_id as number)
      const missing = row.matched_track_id == null && candidate == null
      const downloadable = missing
      return {
        id: row.id as number,
        kind: 'playlistItem',
        sourceId: row.source_id as number,
        title: row.title as string,
        subtitle: (row.primary_artist as string) ?? null,
        trackCount: 1,
        missingCount: downloadable ? 1 : 0,
        duration: duration ?? 0,
        missingEstimatedBytes: missing ? estimatedBytes(duration) : 0,
        metadataState: null,
        error: (row.download_error as string) ?? null,
        tracks: [{
          id: row.source_id as number,
          sourceKind: 'playlistItem',
          duration,
          title: row.title as string,
          artist: row.primary_artist as string,
          spotifyUrl: (row.spotify_url as string) ?? null,
          missing,
          audioSourceUrl: (row.audio_source_url as string) ?? null,
          allowUnverified: Boolean(row.allow_unverified),
          error: (row.download_error as string) ?? null,
          candidate
        }]
      }
    })
  ]
}

export function listDownloadQueue(): SpotifyDownloadQueueSnapshot {
  pruneEmptyDownloadQueueCards()
  reopenCompletedDownloadQueueCards()
  const rows = getSqlite().prepare(
    `SELECT q.*, s.artist_id, s.album_id, s.source_name,
            ar.name AS artist_name, ar.spotify_id AS artist_spotify_id,
            al.title AS album_title, al.spotify_id AS album_spotify_id,
            aar.name AS album_artist_name,
            p.title AS playlist_title, sp.source_url AS playlist_source_url
     FROM music_spotify_download_queue q
     LEFT JOIN music_spotify_entity_snapshot s ON s.id=q.snapshot_id
     LEFT JOIN music_artist ar ON ar.id=s.artist_id
     LEFT JOIN music_album al ON al.id=s.album_id
     LEFT JOIN music_artist aar ON aar.id=al.artist_id
     LEFT JOIN music_playlist p ON p.id=q.playlist_id
     LEFT JOIN music_spotify_playlist sp ON sp.playlist_id=q.playlist_id
     ORDER BY q.position, q.id`
  ).all() as Record<string, unknown>[]
  const cards = rows.map((row): SpotifyDownloadQueueCard => {
    const sourceKind = row.source_kind as 'entity' | 'playlist'
    const entityKind = sourceKind === 'entity'
      ? row.artist_id != null ? 'artist' : 'album'
      : null
    const entityId = entityKind === 'artist'
      ? row.artist_id as number
      : entityKind === 'album' ? row.album_id as number : null
    const playlistId = sourceKind === 'playlist' ? row.playlist_id as number : null
    const selections = queueSelections(row.id as number)
    const spotifyId = entityKind === 'artist'
      ? row.artist_spotify_id as string | null
      : entityKind === 'album' ? row.album_spotify_id as string | null : null
    return {
      id: row.id as number,
      sourceKind,
      entityKind,
      entityId,
      playlistId,
      title: sourceKind === 'playlist'
        ? row.playlist_title as string
        : entityKind === 'artist' ? row.artist_name as string : row.album_title as string,
      subtitle: sourceKind === 'playlist'
        ? 'Imported Spotify playlist'
        : entityKind === 'artist' ? 'Artist catalogue' : `${row.album_artist_name as string} · Album`,
      route: sourceKind === 'playlist'
        ? `/music/playlists/${playlistId}`
        : `/music/${entityKind === 'artist' ? 'artists' : 'albums'}/${entityId}`,
      sourceUrl: sourceKind === 'playlist'
        ? row.playlist_source_url as string
        : spotifyId ? `https://open.spotify.com/${entityKind}/${spotifyId}` : null,
      state: row.state as SpotifyDownloadQueueCardState,
      allowMismatch: Boolean(row.allow_mismatch),
      continueAfter: Boolean(row.continue_after),
      error: (row.last_error as string) ?? null,
      createdAt: row.created_at as string,
      updatedAt: row.updated_at as string,
      completedAt: (row.completed_at as string) ?? null,
      trackCount: selections.reduce((sum, selection) => sum + selection.trackCount, 0),
      missingCount: selections.reduce((sum, selection) => sum + selection.missingCount, 0),
      missingEstimatedBytes: selections.reduce(
        (sum, selection) => sum + selection.missingEstimatedBytes,
        0
      ),
      selections
    }
  })
  const pending = cards.filter((card) => card.state !== 'completed')
  const completed = cards
    .filter((card) => card.state === 'completed')
    .sort((a, b) => (b.completedAt ?? '').localeCompare(a.completedAt ?? ''))
  return {
    pending,
    completed,
    pendingSources: pending.length,
    pendingTracks: pending.reduce((sum, card) => sum + card.missingCount, 0),
    pendingEstimatedBytes: pending.reduce((sum, card) => sum + card.missingEstimatedBytes, 0),
    activeCardId: cards.find((card) => card.state === 'running')?.id ?? null
  }
}

export function getDownloadQueueCard(id: number): SpotifyDownloadQueueCard | null {
  const snapshot = listDownloadQueue()
  return [...snapshot.pending, ...snapshot.completed].find((card) => card.id === id) ?? null
}

export function setDownloadQueueCardState(
  id: number,
  state: SpotifyDownloadQueueCardState,
  error: string | null = null,
  continueAfter?: boolean
): void {
  getSqlite().prepare(
    `UPDATE music_spotify_download_queue
     SET state=?, last_error=?, continue_after=COALESCE(?, continue_after),
         completed_at=CASE WHEN ?='completed' THEN datetime('now') ELSE NULL END,
         updated_at=datetime('now') WHERE id=?`
  ).run(state, error, continueAfter == null ? null : Number(continueAfter), state, id)
}

export function prioritizeDownloadQueueCard(id: number): void {
  const db = getSqlite()
  db.transaction(() => {
    db.prepare('UPDATE music_spotify_download_queue SET position=position+1 WHERE state <> ?').run('running')
    db.prepare(
      `UPDATE music_spotify_download_queue SET position=0, updated_at=datetime('now')
       WHERE id=? AND state <> 'running'`
    ).run(id)
  })()
}

export function reorderDownloadQueue(ids: number[]): void {
  const unique = [...new Set(ids.filter(Number.isInteger))]
  const db = getSqlite()
  const allowed = new Set((db.prepare(
    `SELECT id FROM music_spotify_download_queue WHERE state NOT IN ('running','completed')`
  ).all() as { id: number }[]).map((row) => row.id))
  if (unique.length !== allowed.size || unique.some((id) => !allowed.has(id))) {
    throw new Error('The download queue changed; reload it before reordering')
  }
  db.transaction(() => {
    const update = db.prepare(
      `UPDATE music_spotify_download_queue SET position=?, updated_at=datetime('now') WHERE id=?`
    )
    unique.forEach((id, position) => update.run(position, id))
  })()
}

export function removeDownloadQueueSelection(id: number): void {
  const db = getSqlite()
  db.transaction(() => {
    db.prepare('DELETE FROM music_spotify_download_queue_selection WHERE id=?').run(id)
    pruneEmptyDownloadQueueCards()
  })()
}

export function removeDownloadQueueCard(id: number): void {
  getSqlite().prepare(
    `DELETE FROM music_spotify_download_queue WHERE id=? AND state <> 'running'`
  ).run(id)
}

export function clearCompletedDownloadQueue(): number {
  return getSqlite().prepare(
    `DELETE FROM music_spotify_download_queue WHERE state='completed'`
  ).run().changes
}

export function normalizeSpotifyMatch(value: string): string {
  return value
    .normalize('NFKC')
    .toLocaleLowerCase()
    .replace(/[\p{P}\p{S}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function stripAlbumYearPrefix(value: string): string {
  return value
    .replace(/^\s*[([](?:19|20)\d{2}[)\]]\s*(?:[-–—:]\s*)?/, '')
    .replace(/^\s*(?:19|20)\d{2}\s*[-–—:]\s*/, '')
    .trim() || value.trim()
}

export function artistComponents(value: string): string[] {
  return value
    .split(/\s*(?:,|&|\/|;|\bfeat\.?\b|\bft\.?\b|\bwith\b|\bx\b)\s*/i)
    .map(normalizeSpotifyMatch)
    .filter(Boolean)
}

export function matchSpotifySong(
  song: Pick<SpotdlSong, 'title' | 'primaryArtist' | 'albumTitle' | 'duration'>,
  candidates: LocalMatchCandidate[]
): number | null {
  if (song.duration == null) return null
  const title = normalizeSpotifyMatch(song.title)
  const artist = normalizeSpotifyMatch(song.primaryArtist)
  let matches = candidates.filter((candidate) => {
    if (candidate.duration == null || Math.abs(candidate.duration - song.duration!) > 3) return false
    if (normalizeSpotifyMatch(candidate.title) !== title) return false
    if (recordingVariantSignature(candidate.title, candidate.albumTitle) !==
        recordingVariantSignature(song.title, song.albumTitle)) return false
    const localArtists = new Set([
      normalizeSpotifyMatch(candidate.folderArtist),
      ...artistComponents(candidate.tagArtist ?? '')
    ])
    return localArtists.has(artist)
  })
  matches = collapseEquivalentLocalTracks(matches)
  if (matches.length === 1) return matches[0].id
  if (matches.length > 1) {
    const album = normalizeSpotifyMatch(song.albumTitle)
    matches = matches.filter((candidate) => normalizeSpotifyMatch(candidate.albumTitle) === album)
    matches = collapseEquivalentLocalTracks(matches)
    if (matches.length === 1) return matches[0].id
  }
  return null
}

const RECORDING_VARIANT_MARKERS: [string, RegExp][] = [
  ['live', /\blive\b/],
  ['acoustic', /\b(?:acoustic|unplugged)\b/],
  ['remix', /\b(?:remix|club mix|dance mix)\b/],
  ['instrumental', /\binstrumental\b/],
  ['demo', /\bdemo\b/],
  ['karaoke', /\bkaraoke\b/],
  ['radio-edit', /\bradio edit\b/],
  ['sped-up', /\bsped up\b/],
  ['slowed', /\bslowed\b/],
  ['rerecorded', /\b(?:re recorded|rerecorded)\b/],
  ['remaster', /\bremaster(?:ed)?\b/]
]

function recordingVariantSignature(title: string, albumTitle: string): string {
  const value = normalizeSpotifyMatch(`${title} ${albumTitle}`)
  return RECORDING_VARIANT_MARKERS
    .filter(([, pattern]) => pattern.test(value))
    .map(([key]) => key)
    .join('|')
}

function spotifyArtistMatches(primaryArtist: string, candidate: LocalMatchCandidate): boolean {
  const artist = normalizeSpotifyMatch(primaryArtist)
  return new Set([
    normalizeSpotifyMatch(candidate.folderArtist),
    ...artistComponents(candidate.tagArtist ?? '')
  ]).has(artist)
}

function samePlaylistRecordingIdentity(
  song: Pick<SpotdlSong, 'title' | 'primaryArtist' | 'albumTitle'>,
  candidate: LocalMatchCandidate
): boolean {
  return normalizeSpotifyMatch(candidate.title) === normalizeSpotifyMatch(song.title) &&
    spotifyArtistMatches(song.primaryArtist, candidate) &&
    recordingVariantSignature(candidate.title, candidate.albumTitle) ===
      recordingVariantSignature(song.title, song.albumTitle)
}

export function compatibleSpotifyDurationTolerance(duration: number): number {
  return Math.max(3, Math.min(8, duration * 0.03))
}

/** Keep one stable representative when the scanner contains byte-distinct files
 * with the same recording metadata. The oldest row wins, which normally keeps
 * the user's original file ahead of later downloader-created copies. */
export function collapseEquivalentLocalTracks(
  candidates: LocalMatchCandidate[]
): LocalMatchCandidate[] {
  const seen = new Set<string>()
  return [...candidates].sort((a, b) => a.id - b.id).filter((candidate) => {
    const artists = [
      normalizeSpotifyMatch(candidate.folderArtist),
      ...artistComponents(candidate.tagArtist ?? '')
    ].sort().join('|')
    const duration = candidate.duration == null ? '?' : String(Math.round(candidate.duration))
    const key = [
      normalizeSpotifyMatch(candidate.title),
      artists,
      normalizeSpotifyMatch(candidate.albumTitle),
      recordingVariantSignature(candidate.title, candidate.albumTitle),
      duration
    ].join('\n')
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

/** Playlist-only second tier for the same recording on another release. */
export function matchSpotifyPlaylistSong(
  song: Pick<SpotdlSong, 'title' | 'primaryArtist' | 'albumTitle' | 'duration'>,
  candidates: LocalMatchCandidate[]
): number | null {
  const identityCandidates = candidates.filter((candidate) =>
    samePlaylistRecordingIdentity(song, candidate)
  )
  const strict = matchSpotifySong(song, identityCandidates)
  if (strict != null || song.duration == null) return strict
  const tolerance = compatibleSpotifyDurationTolerance(song.duration)
  let matches = collapseEquivalentLocalTracks(identityCandidates.filter((candidate) =>
    candidate.duration != null &&
    Math.abs(candidate.duration - song.duration!) <= tolerance
  ))
  if (matches.length === 1) return matches[0].id
  if (matches.length > 1) {
    const album = normalizeSpotifyMatch(song.albumTitle)
    matches = collapseEquivalentLocalTracks(matches.filter(
      (candidate) => normalizeSpotifyMatch(candidate.albumTitle) === album
    ))
    if (matches.length === 1) return matches[0].id
  }
  return null
}

/** Conservative choices for the user's explicit "Use local version" action. */
export function spotifyPlaylistMatchAlternatives(
  song: Pick<SpotdlSong, 'title' | 'primaryArtist' | 'albumTitle' | 'duration'>,
  candidates: LocalMatchCandidate[]
): LocalMatchCandidate[] {
  const album = normalizeSpotifyMatch(song.albumTitle)
  return collapseEquivalentLocalTracks(candidates
    .filter((candidate) => {
      if (!samePlaylistRecordingIdentity(song, candidate)) return false
      if (song.duration == null || candidate.duration == null) return true
      return Math.abs(candidate.duration - song.duration) <= 15
    }))
    .sort((a, b) => {
      const aAlbum = normalizeSpotifyMatch(a.albumTitle) === album ? 0 : 1
      const bAlbum = normalizeSpotifyMatch(b.albumTitle) === album ? 0 : 1
      if (aAlbum !== bAlbum) return aAlbum - bAlbum
      const aDelta = song.duration == null || a.duration == null
        ? Number.POSITIVE_INFINITY
        : Math.abs(a.duration - song.duration)
      const bDelta = song.duration == null || b.duration == null
        ? Number.POSITIVE_INFINITY
        : Math.abs(b.duration - song.duration)
      return aDelta - bDelta || a.id - b.id
    })
}

// SQLite's change counters invalidate conservatively for every write, including
// writes outside music and rollbacks. External connections have their own version.
// Cache only matching metadata; visible likes, artwork and paths are read fresh.
const candidateCache = new WeakMap<ReturnType<typeof getSqlite>, {
  changes: number
  version: number
  rows: LocalMatchCandidate[]
  byTitle: Map<string, LocalMatchCandidate[]>
}>()

function localCandidateIndex(): Map<string, LocalMatchCandidate[]> {
  const db = getSqlite()
  const { changes } = db.prepare('SELECT total_changes() AS changes').get() as { changes: number }
  const version = db.pragma('data_version', { simple: true }) as number
  const cached = candidateCache.get(db)
  if (cached?.changes === changes && cached.version === version) return cached.byTitle
  const rows = (db.prepare(
    `SELECT t.id, t.album_id, t.artist_id, t.title, ar.name AS folder_artist, t.tag_artist,
            al.title AS album_title, t.duration
     FROM music_track t
     JOIN music_artist ar ON ar.id = t.artist_id
     JOIN music_album al ON al.id = t.album_id`
  ).all() as Record<string, unknown>[]).map(rowCandidate)
  const byTitle = new Map<string, LocalMatchCandidate[]>()
  for (const row of rows) {
    const title = normalizeSpotifyMatch(row.title)
    const group = byTitle.get(title) ?? []
    group.push(row)
    byTitle.set(title, group)
  }
  candidateCache.set(db, { changes, version, rows, byTitle })
  return byTitle
}

function allCandidates(): LocalMatchCandidate[] {
  localCandidateIndex()
  return candidateCache.get(getSqlite())!.rows
}

export function playlistLocalAlternativeIds(
  songs: Pick<SpotdlSong, 'title' | 'primaryArtist' | 'albumTitle' | 'duration'>[]
): number[][] {
  const byTitle = localCandidateIndex()
  const review = reviewRequiredTrackIds()
  return songs.map((song) => spotifyPlaylistMatchAlternatives(
    song,
    (byTitle.get(normalizeSpotifyMatch(song.title)) ?? []).filter((track) => !review.has(track.id))
  ).map((track) => track.id))
}

function indexCandidates(candidates: LocalMatchCandidate[]): Map<string, LocalMatchCandidate[]> {
  const index = new Map<string, LocalMatchCandidate[]>()
  const review = reviewRequiredTrackIds()
  for (const candidate of candidates) {
    if (review.has(candidate.id)) continue
    const key = normalizeSpotifyMatch(candidate.title)
    const rows = index.get(key) ?? []
    rows.push(candidate)
    index.set(key, rows)
  }
  return index
}

function rowCandidate(row: Record<string, unknown>): LocalMatchCandidate {
  return {
    id: row.id as number,
    albumId: (row.album_id as number) ?? undefined,
    artistId: (row.artist_id as number) ?? undefined,
    title: row.title as string,
    folderArtist: row.folder_artist as string,
    tagArtist: (row.tag_artist as string) ?? null,
    albumTitle: row.album_title as string,
    duration: (row.duration as number) ?? null
  }
}

export function findMatch(song: SpotdlSong, candidates = allCandidates()): number | null {
  return matchSpotifyPlaylistSong(song, candidates)
}

export function matchDetails(songs: SpotdlSong[]): Map<string, LocalMatchCandidate> {
  const candidates = allCandidates()
  const byTitle = indexCandidates(candidates)
  const byId = new Map(candidates.map((candidate) => [candidate.id, candidate]))
  const result = new Map<string, LocalMatchCandidate>()
  for (const song of songs) {
    const id = matchSpotifySong(song, byTitle.get(normalizeSpotifyMatch(song.title)) ?? [])
    const candidate = id == null ? null : byId.get(id)
    if (candidate) result.set(song.spotifyTrackId, candidate)
  }
  return result
}

export function getEntity(kind: 'artist' | 'album', id: number): {
  id: number
  name: string
  artistName: string | null
  spotifyId: string | null
  sampleTracks: { title: string; artist: string; album: string; duration: number | null }[]
} | null {
  const db = getSqlite()
  const row = kind === 'artist'
    ? (db.prepare('SELECT id, name, spotify_id FROM music_artist WHERE id = ?').get(id) as Record<string, unknown> | undefined)
    : (db.prepare(
        `SELECT al.id, al.title AS name, al.spotify_id, ar.name AS artist_name
         FROM music_album al JOIN music_artist ar ON ar.id = al.artist_id WHERE al.id = ?`
      ).get(id) as Record<string, unknown> | undefined)
  if (!row) return null
  const tracks = db.prepare(
    `SELECT t.title, ar.name AS artist,
            al.title AS album, t.duration
     FROM music_track t
     JOIN music_artist ar ON ar.id = t.artist_id
     JOIN music_album al ON al.id = t.album_id
     WHERE ${kind === 'artist' ? 't.artist_id' : 't.album_id'} = ?
     ORDER BY t.duration IS NULL, t.play_count DESC, t.disc_no, t.track_no, t.id
     LIMIT 5`
  ).all(id) as { title: string; artist: string; album: string; duration: number | null }[]
  return {
        id: row.id as number,
        name: row.name as string,
        artistName: (row.artist_name as string) ?? null,
        spotifyId: (row.spotify_id as string) ?? null,
        sampleTracks: tracks
      }
}

export function rememberEntitySource(kind: 'artist' | 'album', id: number, spotifyId: string): void {
  const table = kind === 'artist' ? 'music_artist' : 'music_album'
  const db = getSqlite()
  const owner = db.prepare(`SELECT id FROM ${table} WHERE spotify_id = ? AND id <> ?`).get(spotifyId, id)
  if (owner) throw new Error(`That Spotify ${kind} is already linked to another local ${kind}`)
  db.prepare(`UPDATE ${table} SET spotify_id = ?, updated_at = datetime('now') WHERE id = ?`).run(spotifyId, id)
}

export function forgetEntitySource(kind: 'artist' | 'album', id: number): void {
  const table = kind === 'artist' ? 'music_artist' : 'music_album'
  const db = getSqlite()
  db.transaction(() => {
    db.prepare(`DELETE FROM music_spotify_entity_snapshot WHERE ${kind}_id = ?`).run(id)
    db.prepare(`UPDATE ${table} SET spotify_id = NULL, updated_at = datetime('now') WHERE id = ?`).run(id)
  })()
}

export function saveEntitySnapshot(input: {
  kind: 'artist' | 'album'
  entityId: number
  provider: 'itunes' | 'spotdl'
  providerEntityId: string
  sourceName: string
  catalogueCountry?: string
  catalogueState?: 'complete' | 'partial'
  releases: IndexedEntityRelease[]
}): number {
  const db = getSqlite()
  let snapshotId = 0
  db.transaction(() => {
    const idColumn = `${input.kind}_id`
    const otherColumn = input.kind === 'artist' ? 'album_id' : 'artist_id'
    const existing = db.prepare(
      `SELECT id FROM music_spotify_entity_snapshot WHERE ${idColumn} = ?`
    ).get(input.entityId) as { id: number } | undefined
    if (existing) {
      snapshotId = existing.id
      db.prepare(
        `UPDATE music_spotify_entity_snapshot
         SET provider=?, provider_entity_id=?, source_name=?, catalogue_state=?, refreshed_at=datetime('now')
         WHERE id=?`
      ).run(
        input.provider,
        input.providerEntityId,
        input.sourceName,
        input.catalogueState ?? 'complete',
        snapshotId
      )
    } else {
      snapshotId = Number(db.prepare(
        `INSERT INTO music_spotify_entity_snapshot
         (${idColumn}, ${otherColumn}, provider, provider_entity_id, source_name, catalogue_state)
         VALUES (?, NULL, ?, ?, ?, ?)`
      ).run(
        input.entityId,
        input.provider,
        input.providerEntityId,
        input.sourceName,
        input.catalogueState ?? 'complete'
      ).lastInsertRowid)
    }

    db.prepare('UPDATE music_spotify_entity_snapshot SET catalogue_country=? WHERE id=?').run(input.catalogueCountry ?? 'US', snapshotId)
    const keep = new Set(input.releases.map((release) => release.providerReleaseId))
    const old = db.prepare(
      `SELECT r.id, r.provider_release_id, r.metadata_state,
              (SELECT COUNT(*) FROM music_spotify_entity_track t WHERE t.release_id=r.id) AS track_count
       FROM music_spotify_entity_release r WHERE r.snapshot_id=?`
    ).all(snapshotId) as {
      id: number
      provider_release_id: string
      metadata_state: string
      track_count: number
    }[]
    const oldByProvider = new Map(old.map((row) => [row.provider_release_id, row]))
    for (const row of old) {
      if (input.catalogueState !== 'partial' && !keep.has(row.provider_release_id)) {
        db.prepare('DELETE FROM music_spotify_entity_release WHERE id=?').run(row.id)
      }
    }

    const insertRelease = db.prepare(
      `INSERT INTO music_spotify_entity_release
       (snapshot_id, provider_release_id, position, title, album_artist, year, album_type)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    const updateRelease = db.prepare(
      `UPDATE music_spotify_entity_release
       SET position=?, title=?, album_artist=?, year=?, album_type=? WHERE id=?`
    )
    const insertTrack = db.prepare(
      `INSERT INTO music_spotify_entity_track
       (release_id, provider_track_id, position, title, artists_json, primary_artist,
        album_title, duration, disc_no, track_no, matched_track_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    const candidates = allCandidates()
    const byTitle = indexCandidates(candidates)
    input.releases.forEach((release, releaseIndex) => {
      const previous = oldByProvider.get(release.providerReleaseId)
      let releaseId: number
      if (previous) {
        releaseId = previous.id
        updateRelease.run(
          releaseIndex,
          release.title,
          release.albumArtist,
          release.year,
          release.albumType,
          releaseId
        )
        if (release.tracksLoaded === false) return
        // A provider can return a partial album while still exiting successfully. Preserve
        // authoritative payloads only when they cover at least the refreshed catalogue count;
        // otherwise Refresh must restore the complete indexed tracklist for another resolution.
        if (previous.metadata_state === 'resolved' && previous.track_count >= release.tracks.length) return
        restoreIndexedEntityRelease(releaseId, release)
        db.prepare('UPDATE music_spotify_entity_release SET expected_tracks=?, tracks_loaded=1 WHERE id=?')
          .run(release.expectedTracks ?? release.tracks.length, releaseId)
        return
      } else {
        releaseId = Number(insertRelease.run(
          snapshotId,
          release.providerReleaseId,
          releaseIndex,
          release.title,
          release.albumArtist,
          release.year,
          release.albumType
        ).lastInsertRowid)
      }
      db.prepare('UPDATE music_spotify_entity_release SET expected_tracks=?, tracks_loaded=? WHERE id=?')
        .run(release.expectedTracks ?? release.tracks.length, release.tracksLoaded === false ? 0 : 1, releaseId)
      release.tracks.forEach((track, trackIndex) => {
        const matched = matchSpotifySong(
          {
            title: track.title,
            primaryArtist: track.primaryArtist,
            albumTitle: track.albumTitle,
            duration: track.duration
          },
          byTitle.get(normalizeSpotifyMatch(track.title)) ?? []
        )
        insertTrack.run(
          releaseId,
          track.providerTrackId,
          trackIndex,
          track.title,
          JSON.stringify(track.artists),
          track.primaryArtist,
          track.albumTitle,
          track.duration,
          track.discNo,
          track.trackNo,
          matched
        )
      })
    })
  })()
  pruneEmptyDownloadQueueCards()
  return snapshotId
}

export function getEntitySnapshot(kind: 'artist' | 'album', entityId: number): EntitySnapshotRow | null {
  const db = getSqlite()
  const snapshot = db.prepare(
    `SELECT s.*, ${kind === 'artist' ? 'ar.spotify_id' : 'al.spotify_id'} AS spotify_id
     FROM music_spotify_entity_snapshot s
     ${kind === 'artist' ? 'JOIN music_artist ar ON ar.id=s.artist_id' : 'JOIN music_album al ON al.id=s.album_id'}
     WHERE s.${kind}_id=?`
  ).get(entityId) as Record<string, unknown> | undefined
  if (!snapshot) return null
  const releaseRows = db.prepare(
    'SELECT * FROM music_spotify_entity_release WHERE snapshot_id=? ORDER BY position, id'
  ).all(snapshot.id) as Record<string, unknown>[]
  const trackStmt = db.prepare(
    'SELECT * FROM music_spotify_entity_track WHERE release_id=? ORDER BY position, id'
  )
  return {
    id: snapshot.id as number,
    kind,
    entityId,
    provider: snapshot.provider as 'itunes' | 'spotdl',
    providerEntityId: snapshot.provider_entity_id as string,
    sourceName: snapshot.source_name as string,
    catalogueState: snapshot.catalogue_state as 'complete' | 'partial',
    refreshedAt: snapshot.refreshed_at as string,
    spotifyId: (snapshot.spotify_id as string) ?? null,
    catalogueCountry: String(snapshot.catalogue_country ?? 'US'),
    releases: releaseRows.map((release) => ({
      id: release.id as number,
      providerReleaseId: release.provider_release_id as string,
      spotifyAlbumId: (release.spotify_album_id as string) ?? null,
      title: release.title as string,
      albumArtist: release.album_artist as string,
      year: (release.year as number) ?? null,
      albumType: (release.album_type as 'album' | 'single') ?? null,
      tracksLoaded: Boolean(release.tracks_loaded),
      expectedTracks: (release.expected_tracks as number) ?? null,
      metadataState: release.metadata_state as 'indexed' | 'resolved' | 'error',
      resolutionError: (release.resolution_error as string) ?? null,
      tracks: (trackStmt.all(release.id) as Record<string, unknown>[]).map((track) => ({
        id: track.id as number,
        providerTrackId: track.provider_track_id as string,
        spotifyTrackId: (track.spotify_track_id as string) ?? null,
        title: track.title as string,
        artists: JSON.parse(track.artists_json as string) as string[],
        primaryArtist: track.primary_artist as string,
        albumTitle: track.album_title as string,
        duration: (track.duration as number) ?? null,
        discNo: (track.disc_no as number) ?? null,
        trackNo: (track.track_no as number) ?? null,
        spotifyUrl: (track.spotify_url as string) ?? null,
        rawJson: (track.raw_json as string) ?? null,
        audioSourceUrl: (track.audio_source_url as string) ?? null,
        allowUnverified: Boolean(track.allow_unverified),
        downloadError: (track.download_error as string) ?? null,
        matchedTrackId: (track.matched_track_id as number) ?? null
      }))
    }))
  }
}

export function getEntitySnapshotById(snapshotId: number): EntitySnapshotRow | null {
  const row = getSqlite().prepare(
    'SELECT artist_id, album_id FROM music_spotify_entity_snapshot WHERE id=?'
  ).get(snapshotId) as { artist_id: number | null; album_id: number | null } | undefined
  if (!row) return null
  return row.artist_id != null
    ? getEntitySnapshot('artist', row.artist_id)
    : row.album_id != null
      ? getEntitySnapshot('album', row.album_id)
      : null
}

export function resolveEntityRelease(releaseId: number, songs: SpotdlSong[]): void {
  const db = getSqlite()
  if (!songs.length) throw new Error('No Spotify tracks were resolved for that release')
  const owner = db.prepare('SELECT * FROM music_spotify_entity_release WHERE id=?').get(releaseId) as Record<string, unknown> | undefined
  if (!owner) throw new Error('That saved release no longer exists')
  db.transaction(() => {
    restoreIndexedEntityRelease(releaseId, {
      providerReleaseId: String(owner.provider_release_id), title: String(owner.title),
      albumArtist: String(owner.album_artist), year: owner.year as number | null,
      albumType: owner.album_type as 'album' | 'single',
      tracks: songs.map((song) => ({ ...song, providerTrackId: song.spotifyTrackId }))
    })
    db.prepare(`UPDATE music_spotify_entity_release SET spotify_album_id=?, metadata_state='resolved',
      tracks_loaded=1, expected_tracks=?, resolution_error=NULL WHERE id=?`)
      .run(songs[0].spotifyAlbumId, songs.length, releaseId)
    for (const song of songs) db.prepare(`UPDATE music_spotify_entity_track SET spotify_track_id=?,
      spotify_url=?, raw_json=? WHERE release_id=? AND provider_track_id=?`)
      .run(song.spotifyTrackId, song.spotifyUrl, song.rawJson, releaseId, song.spotifyTrackId)
  })()
}

export function rememberEntityReleaseSpotifyAlbum(releaseId: number, spotifyAlbumId: string): void {
  getSqlite().prepare(
    `UPDATE music_spotify_entity_release
     SET spotify_album_id=?, resolution_error=NULL WHERE id=?`
  ).run(spotifyAlbumId, releaseId)
}

export function restoreIndexedEntityRelease(releaseId: number, release: IndexedEntityRelease): void {
  const db = getSqlite()
  if (!db.prepare('SELECT id FROM music_spotify_entity_release WHERE id=?').get(releaseId)) {
    throw new Error('That saved release no longer exists')
  }
  const old = db.prepare('SELECT * FROM music_spotify_entity_track WHERE release_id=? ORDER BY position, id')
    .all(releaseId) as Record<string, unknown>[]
  const byTitle = indexCandidates(allCandidates())
  const kept = new Set<number>()
  db.transaction(() => {
    db.prepare(`UPDATE music_spotify_entity_release
      SET title=?, album_artist=?, year=?, album_type=?, metadata_state='indexed', resolution_error=NULL
      WHERE id=?`).run(release.title, release.albumArtist, release.year, release.albumType, releaseId)
    release.tracks.forEach((track, index) => {
      const exact = old.filter((row) => row.provider_track_id === track.providerTrackId)
      const similar = old.filter((row) =>
        normalizeSpotifyMatch(row.title as string) === normalizeSpotifyMatch(track.title) &&
        normalizeSpotifyMatch(row.primary_artist as string) === normalizeSpotifyMatch(track.primaryArtist) &&
        (row.duration == null || track.duration == null || Math.abs(Number(row.duration) - track.duration) <= 3))
      const retained = exact.length === 1 ? exact[0] : similar.length === 1 ? similar[0] : null
      if (retained && !kept.has(Number(retained.id))) {
        // Keep row identity: candidates, explicit approvals and queued selections refer to it.
        kept.add(Number(retained.id))
        db.prepare(`UPDATE music_spotify_entity_track SET provider_track_id=?, position=?,
          title=?, artists_json=?, primary_artist=?, album_title=?, duration=?, disc_no=?, track_no=? WHERE id=?`)
          .run(track.providerTrackId, index, track.title, JSON.stringify(track.artists), track.primaryArtist,
            track.albumTitle, track.duration, track.discNo, track.trackNo, retained.id)
      } else {
        const matched = matchSpotifySong(track, byTitle.get(normalizeSpotifyMatch(track.title)) ?? [])
        db.prepare(`INSERT INTO music_spotify_entity_track
          (release_id, provider_track_id, position, title, artists_json, primary_artist,
           album_title, duration, disc_no, track_no, matched_track_id)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
          .run(releaseId, track.providerTrackId, index, track.title, JSON.stringify(track.artists),
            track.primaryArtist, track.albumTitle, track.duration, track.discNo, track.trackNo, matched)
      }
    })
    for (const row of old) if (!kept.has(Number(row.id))) {
      db.prepare('DELETE FROM music_spotify_entity_track WHERE id=?').run(row.id)
    }
  })()
}

export function markEntityReleaseError(releaseId: number, message: string): void {
  getSqlite().prepare(
    `UPDATE music_spotify_entity_release
     SET metadata_state='error', resolution_error=? WHERE id=?`
  ).run(message, releaseId)
}

export function linkUnambiguousSources(
  sourceArtistId: string | null,
  releases: { spotifyAlbumId: string; songs: SpotdlSong[] }[]
): void {
  const db = getSqlite()
  for (const release of releases) {
    const matches = matchDetails(release.songs)
    if (matches.size !== release.songs.length) continue
    const albumIds = new Set([...matches.values()].map((match) => match.albumId).filter(Number.isInteger))
    if (albumIds.size === 1) {
      const albumId = [...albumIds][0] as number
      db.prepare(
        `UPDATE music_album SET spotify_id = ?, updated_at = datetime('now')
         WHERE id = ? AND (spotify_id IS NULL OR spotify_id = ?)
           AND NOT EXISTS (SELECT 1 FROM music_album other WHERE other.spotify_id = ? AND other.id <> ?)`
      ).run(release.spotifyAlbumId, albumId, release.spotifyAlbumId, release.spotifyAlbumId, albumId)
    }
  }
  if (!sourceArtistId) return
  const sourceSongs = releases.flatMap((release) => release.songs).filter((song) => song.spotifyArtistIds.includes(sourceArtistId))
  const matches = matchDetails(sourceSongs)
  if (sourceSongs.length === 0 || matches.size !== sourceSongs.length) return
  const artistIds = new Set([...matches.values()].map((match) => match.artistId).filter(Number.isInteger))
  if (artistIds.size === 1) {
    const artistId = [...artistIds][0] as number
    db.prepare(
      `UPDATE music_artist SET spotify_id = ?, updated_at = datetime('now')
       WHERE id = ? AND (spotify_id IS NULL OR spotify_id = ?)
         AND NOT EXISTS (SELECT 1 FROM music_artist other WHERE other.spotify_id = ? AND other.id <> ?)`
    ).run(sourceArtistId, artistId, sourceArtistId, sourceArtistId, artistId)
  }
}

export function resolveAllSpotifyItems(changedTitles?: string[]): number {
  const review = reviewRequiredTrackIds()
  const choices = savedSpotifyTrackChoices()
  const changed = changedTitles ? new Set(changedTitles.map(normalizeSpotifyMatch)) : null
  const db = getSqlite()
  const candidates = (db
    .prepare(
      `SELECT t.id, t.title, ar.name AS folder_artist, t.tag_artist,
              al.title AS album_title, t.duration
       FROM music_track t
       JOIN music_artist ar ON ar.id = t.artist_id
       JOIN music_album al ON al.id = t.album_id`
    )
    .all() as Record<string, unknown>[]).map(rowCandidate)
  const byTitle = indexCandidates(candidates)
  const byId = new Map(candidates.map((candidate) => [candidate.id, candidate]))
  const items = db
    .prepare(
      `SELECT id, spotify_track_id, title, primary_artist, album_title, duration, matched_track_id, match_confirmed, allow_unverified, audio_source_url
       FROM music_spotify_playlist_item`
    )
    .all() as Record<string, unknown>[]
  const update = db.prepare(
    'UPDATE music_spotify_playlist_item SET matched_track_id = ?, download_error = CASE WHEN ? IS NOT NULL THEN NULL ELSE download_error END WHERE id = ?'
  )
  const entityItems = db
    .prepare(
      `SELECT id, spotify_track_id, title, primary_artist, album_title, duration, matched_track_id, match_confirmed, allow_unverified, audio_source_url
       FROM music_spotify_entity_track`
    )
    .all() as Record<string, unknown>[]
  const updateEntity = db.prepare(
    'UPDATE music_spotify_entity_track SET matched_track_id = ?, download_error = CASE WHEN ? IS NOT NULL THEN NULL ELSE download_error END WHERE id = ?'
  )
  let resolved = 0
  const tx = db.transaction(() => {
    const flag = db.prepare('UPDATE music_track SET spotify_review_required=1 WHERE id=? AND spotify_review_required=0')
    for (const id of review) flag.run(id)
    for (const row of items) {
      if (changed && !changed.has(normalizeSpotifyMatch(row.title as string))) continue
      const song = {
        title: row.title as string,
        primaryArtist: row.primary_artist as string,
        albumTitle: row.album_title as string,
        duration: (row.duration as number) ?? null
      }
      const titleCandidates = byTitle.get(normalizeSpotifyMatch(song.title)) ?? []
      const existing = row.matched_track_id == null
        ? null
        : byId.get(row.matched_track_id as number) ?? null
      const chosen = choices.get(String(row.spotify_track_id))
      const match = chosen != null
        ? chosen
        : row.match_confirmed && existing
        ? existing.id
        : row.allow_unverified || row.audio_source_url ? null
        : existing && !review.has(existing.id) && spotifyPlaylistMatchAlternatives(song, [existing]).length === 1
        ? existing.id
        : matchSpotifyPlaylistSong(song, titleCandidates)
      update.run(match, match, row.id)
      if (match != null) db.prepare(
        'DELETE FROM music_spotify_download_candidate WHERE playlist_item_id=?'
      ).run(row.id)
      if (match != null) resolved += 1
    }
    for (const row of entityItems) {
      if (changed && !changed.has(normalizeSpotifyMatch(row.title as string))) continue
      const existing = byId.get(row.matched_track_id as number)
      const chosen = choices.get(String(row.spotify_track_id))
      const match = chosen != null ? chosen
        : row.match_confirmed && existing ? existing.id
        : row.allow_unverified || row.audio_source_url ? null : matchSpotifySong(
        {
          title: row.title as string,
          primaryArtist: row.primary_artist as string,
          albumTitle: row.album_title as string,
          duration: (row.duration as number) ?? null
        },
        byTitle.get(normalizeSpotifyMatch(row.title as string)) ?? []
      )
      updateEntity.run(match, match, row.id)
      if (match != null) db.prepare(
        'DELETE FROM music_spotify_download_candidate WHERE entity_track_id=?'
      ).run(row.id)
      if (match != null) resolved += 1
    }
  })
  tx()
  return resolved
}

export function findPlaylistBySpotifyId(spotifyId: string): number | null {
  const row = getSqlite()
    .prepare('SELECT playlist_id FROM music_spotify_playlist WHERE spotify_id = ?')
    .get(spotifyId) as { playlist_id: number } | undefined
  return row?.playlist_id ?? null
}

export function spotifyPlaylistCounts(playlistId: number): {
  title: string
  total: number
  matched: number
} {
  const row = getSqlite()
    .prepare(
      `SELECT p.title, COUNT(si.id) AS total,
              COALESCE(SUM(si.matched_track_id IS NOT NULL), 0) AS matched
       FROM music_playlist p
       LEFT JOIN music_spotify_playlist_item si ON si.playlist_id = p.id
       WHERE p.id = ? GROUP BY p.id`
    )
    .get(playlistId) as { title: string; total: number; matched: number } | undefined
  return row ?? { title: 'Spotify playlist', total: 0, matched: 0 }
}

export function createSpotifyPlaylist(input: {
  playlistId?: number
  complete?: boolean
  spotifyId: string
  sourceUrl: string
  title: string
  songs: (SpotdlSong & { coverPath: string | null })[]
}): { playlistId: number; matched: number } {
  const db = getSqlite()
  let playlistId = 0
  let matched = 0
  const candidates = allCandidates()
  const byTitle = indexCandidates(candidates)
  const choices = savedSpotifyTrackChoices()
  db.transaction(() => {
    playlistId = input.playlistId ?? Number(
      db.prepare('INSERT INTO music_playlist (title) VALUES (?)').run(input.title).lastInsertRowid
    )
    db.prepare(
      `INSERT INTO music_spotify_playlist (playlist_id, spotify_id, source_url)
       VALUES (?, ?, ?) ON CONFLICT(playlist_id) DO UPDATE SET imported_at=datetime('now')`
    ).run(playlistId, input.spotifyId, input.sourceUrl)
    if (input.playlistId && input.complete) {
      const keep = new Set(input.songs.map((song) => song.spotifyTrackId))
      const old = db.prepare('SELECT id, spotify_track_id FROM music_spotify_playlist_item WHERE playlist_id=?')
        .all(playlistId) as { id: number; spotify_track_id: string }[]
      for (const row of old) if (!keep.has(row.spotify_track_id)) {
        db.prepare('DELETE FROM music_spotify_playlist_item WHERE id=?').run(row.id)
      }
    }
    const insert = db.prepare(
      `INSERT INTO music_spotify_playlist_item
       (playlist_id, spotify_track_id, position, title, artists_json, primary_artist,
        album_artist, album_title, duration, cover_path, spotify_url, disc_no, track_no,
        year, raw_json, matched_track_id, match_confirmed)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(playlist_id, spotify_track_id) DO UPDATE SET
         position=excluded.position, title=excluded.title, artists_json=excluded.artists_json,
         primary_artist=excluded.primary_artist, album_artist=excluded.album_artist,
         album_title=excluded.album_title, duration=excluded.duration,
         cover_path=COALESCE(excluded.cover_path, music_spotify_playlist_item.cover_path),
         disc_no=excluded.disc_no, track_no=excluded.track_no, year=excluded.year,
         raw_json=excluded.raw_json`
    )
    input.songs.forEach((song, position) => {
      const match = choices.get(song.spotifyTrackId) ??
        findMatch(song, byTitle.get(normalizeSpotifyMatch(song.title)) ?? [])
      if (match != null) matched += 1
      insert.run(
        playlistId,
        song.spotifyTrackId,
        position,
        song.title,
        JSON.stringify(song.artists),
        song.primaryArtist,
        song.albumArtist,
        song.albumTitle,
        song.duration,
        song.coverPath,
        song.spotifyUrl,
        song.discNo,
        song.trackNo,
        song.year,
        song.rawJson,
        match,
        choices.has(song.spotifyTrackId) ? 1 : 0
      )
    })
  })()
  matched = (db.prepare('SELECT COUNT(*) AS n FROM music_spotify_playlist_item WHERE playlist_id=? AND matched_track_id IS NOT NULL')
    .get(playlistId) as { n: number }).n
  return { playlistId, matched }
}

export function removeSpotifyItem(itemId: number): void {
  const db = getSqlite()
  const row = db
    .prepare('SELECT playlist_id FROM music_spotify_playlist_item WHERE id = ?')
    .get(itemId) as { playlist_id: number } | undefined
  if (!row) return
  db.prepare('DELETE FROM music_spotify_playlist_item WHERE id = ?').run(itemId)
  pruneEmptyDownloadQueueCards()
  db.prepare(`UPDATE music_playlist SET updated_at = datetime('now') WHERE id = ?`).run(
    row.playlist_id
  )
}

export function pendingSpotifyItems(playlistId: number, itemIds?: number[]): Record<string, unknown>[] {
  const ids = itemIds?.filter(Number.isInteger) ?? []
  if (itemIds !== undefined && ids.length === 0) return []
  const where = ids.length ? `AND id IN (${ids.map(() => '?').join(', ')})` : ''
  const rows = getSqlite()
    .prepare(
      `SELECT * FROM music_spotify_playlist_item
       WHERE playlist_id = ? AND matched_track_id IS NULL AND download_skipped=0
         AND NOT EXISTS (
           SELECT 1 FROM music_spotify_download_candidate c
           WHERE c.playlist_item_id=music_spotify_playlist_item.id
         ) ${where}
       ORDER BY position ASC, id ASC`
    )
    .all(playlistId, ...ids) as Record<string, unknown>[]
  if (!rows.length) return rows
  const byTitle = indexCandidates(allCandidates())
  // A conservative local candidate must be reviewed, never downloaded over.
  // This backend guard also covers stale UI and persisted queue cards.
  return rows.filter((row) => spotifyPlaylistMatchAlternatives({
    title: String(row.title),
    primaryArtist: String(row.primary_artist),
    albumTitle: String(row.album_title),
    duration: (row.duration as number) ?? null
  }, byTitle.get(normalizeSpotifyMatch(String(row.title))) ?? []).length === 0)
}

export function setTrackDownloadOptions(input: {
  sourceKind: 'entityTrack' | 'playlistItem'
  trackId: number
  audioSourceUrl?: string | null
  allowUnverified?: boolean
}): void {
  const db = getSqlite()
  const table = input.sourceKind === 'entityTrack'
    ? 'music_spotify_entity_track'
    : 'music_spotify_playlist_item'
  const sets: string[] = ['download_error=NULL', 'resolved_audio_url=NULL']
  const values: unknown[] = []
  if (input.audioSourceUrl !== undefined) {
    sets.push('audio_source_url=?')
    values.push(input.audioSourceUrl)
  }
  if (input.allowUnverified !== undefined) {
    sets.push('allow_unverified=?')
    values.push(input.allowUnverified ? 1 : 0)
  }
  const result = db.prepare(`UPDATE ${table} SET ${sets.join(', ')} WHERE id=?`)
    .run(...values, input.trackId)
  if (!result.changes) throw new Error('That saved Spotify track no longer exists')
  clearDownloadCandidate(input.sourceKind, input.trackId)
  const card = db.prepare(
    input.sourceKind === 'entityTrack'
      ? `SELECT q.id FROM music_spotify_download_queue q
         JOIN music_spotify_download_queue_selection qs ON qs.queue_id=q.id
         JOIN music_spotify_entity_track t ON t.release_id=qs.release_id
         WHERE t.id=? LIMIT 1`
      : `SELECT q.id FROM music_spotify_download_queue q
         JOIN music_spotify_download_queue_selection qs ON qs.queue_id=q.id
         WHERE qs.playlist_item_id=? LIMIT 1`
  ).get(input.trackId) as { id: number } | undefined
  if (card) {
    db.prepare(
      `UPDATE music_spotify_download_queue
       SET state='queued', last_error=NULL, completed_at=NULL, updated_at=datetime('now')
       WHERE id=? AND state!='running'`
    ).run(card.id)
  }
}

export function clearTrackDownloadErrors(
  sourceKind: 'entityTrack' | 'playlistItem',
  trackIds: number[]
): void {
  if (!trackIds.length) return
  const table = sourceKind === 'entityTrack'
    ? 'music_spotify_entity_track'
    : 'music_spotify_playlist_item'
  getSqlite().prepare(
    `UPDATE ${table} SET download_error=NULL WHERE id IN (${trackIds.map(() => '?').join(',')})`
  ).run(...trackIds)
}

export function setTrackDownloadErrors(
  sourceKind: 'entityTrack' | 'playlistItem',
  errors: Map<number, string>
): void {
  if (!errors.size) return
  const table = sourceKind === 'entityTrack'
    ? 'music_spotify_entity_track'
    : 'music_spotify_playlist_item'
  const update = getSqlite().prepare(`UPDATE ${table} SET download_error=? WHERE id=?`)
  getSqlite().transaction(() => {
    for (const [id, message] of errors) update.run(message, id)
  })()
}

export function spotifySource(playlistId: number): {
  spotifyId: string
  sourceUrl: string
  importedAt: string
} | null {
  const row = getSqlite()
    .prepare(
      `SELECT spotify_id, source_url, imported_at FROM music_spotify_playlist
       WHERE playlist_id = ?`
    )
    .get(playlistId) as Record<string, unknown> | undefined
  return row
    ? {
        spotifyId: row.spotify_id as string,
        sourceUrl: row.source_url as string,
        importedAt: row.imported_at as string
      }
    : null
}

export function mapSpotifyItem(row: Record<string, unknown>, track: MusicTrack | null): MusicSpotifyPlaylistEntry {
  let artists: string[] = []
  try {
    const parsed = JSON.parse(row.artists_json as string)
    if (Array.isArray(parsed)) artists = parsed.filter((value): value is string => typeof value === 'string')
  } catch {
    artists = [row.primary_artist as string]
  }
  return {
    kind: 'spotify',
    downloadSkipped: Boolean(row.download_skipped),
    matchConfirmed: Boolean(row.match_confirmed),
    itemId: row.item_id as number,
    position: row.position as number,
    spotifyTrackId: row.spotify_track_id as string,
    title: row.spotify_title as string,
    artists,
    primaryArtist: row.primary_artist as string,
    albumArtist: (row.album_artist as string) ?? null,
    albumTitle: row.spotify_album_title as string,
    duration: (row.spotify_duration as number) ?? null,
    coverPath: (row.spotify_cover_path as string) ?? null,
    spotifyUrl: row.spotify_url as string,
    trackNo: (row.spotify_track_no as number) ?? null,
    discNo: (row.spotify_disc_no as number) ?? null,
    year: (row.spotify_year as number) ?? null,
    audioSourceUrl: (row.audio_source_url as string) ?? null,
    allowUnverified: Boolean(row.allow_unverified),
    downloadError: (row.download_error as string) ?? null,
    downloadCandidate: mapDownloadCandidate(row),
    matchedTrack: track,
    localAlternatives: []
  }
}

function mapDownloadCandidate(row: Record<string, unknown>): MusicSpotifyDownloadCandidate | null {
  if (row.candidate_id == null || row.candidate_track_id == null) return null
  return {
    provider: row.candidate_provider as MusicSpotifyDownloadCandidate['provider'],
    sourceUrl: (row.candidate_source_url as string) ?? null,
    localTrack: {
      id: row.candidate_track_id as number,
      albumId: row.candidate_album_id as number,
      albumTitle: row.candidate_album_title as string,
      artistId: row.candidate_artist_id as number,
      artistName: row.candidate_artist_name as string,
      tagArtist: (row.candidate_tag_artist as string) ?? null,
      filePath: row.candidate_file_path as string,
      title: row.candidate_title as string,
      trackNo: (row.candidate_track_no as number) ?? null,
      discNo: (row.candidate_disc_no as number) ?? null,
      duration: (row.candidate_duration as number) ?? null,
      likedAt: (row.candidate_liked_at as string) ?? null,
      playCount: (row.candidate_play_count as number) ?? 0,
      lastPlayedAt: (row.candidate_last_played_at as string) ?? null,
      coverPath: (row.candidate_cover_path as string) ?? null
    }
  }
}

export function matchPlaylistItemToLocalTrack(input: { itemId: number; trackId: number; confirm?: boolean }): void {
  const db = getSqlite()
  const source = db.prepare(
    `SELECT id, spotify_track_id, title, primary_artist, album_title, duration
     FROM music_spotify_playlist_item WHERE id=?`
  ).get(input.itemId) as Record<string, unknown> | undefined
  if (!source) throw new Error('That Spotify playlist song no longer exists')
  const track = db.prepare(
    `SELECT t.id, t.album_id, t.artist_id, t.title, ar.name AS folder_artist,
            t.tag_artist, al.title AS album_title, t.duration
     FROM music_track t
     JOIN music_artist ar ON ar.id=t.artist_id
     JOIN music_album al ON al.id=t.album_id
     WHERE t.id=?`
  ).get(input.trackId) as Record<string, unknown> | undefined
  if (!track) throw new Error('That local track no longer exists')
  const song = {
    title: source.title as string,
    primaryArtist: source.primary_artist as string,
    albumTitle: source.album_title as string,
    duration: (source.duration as number) ?? null
  }
  const candidate = rowCandidate(track)
  if (!input.confirm && spotifyPlaylistMatchAlternatives(song, [candidate]).length !== 1) {
    throw new Error('That local track is not a compatible version of this playlist song')
  }
  rememberSpotifyTrackChoice(String(source.spotify_track_id), input.trackId)
}

export function provenanceFilePaths(ids: string[]): string[] {
  const rows = getSqlite().prepare("SELECT file_path FROM music_track WHERE file_path LIKE '%[navihub-%'").all() as { file_path: string }[]
  const allowed = new Set(ids)
  return rows.filter((row) => {
    const match = row.file_path.match(/\[navihub-([A-Za-z0-9]+)\]/)
    return match && allowed.has(match[1])
  }).map((row) => row.file_path)
}

export function skipPlaylistDownload(itemId: number, skipped: boolean): void {
  const db = getSqlite()
  db.transaction(() => {
    db.prepare('UPDATE music_spotify_playlist_item SET download_skipped=? WHERE id=?').run(skipped ? 1 : 0, itemId)
    if (skipped) db.prepare('DELETE FROM music_spotify_download_queue_selection WHERE playlist_item_id=?').run(itemId)
    pruneEmptyDownloadQueueCards()
  })()
}

export function hydrateIndexedRelease(snapshot: EntitySnapshotRow, releaseId: number, indexed: IndexedEntityRelease): void {
  const release = snapshot.releases.find((row) => row.id === releaseId)
  if (!release) throw new Error('That release no longer exists')
  const db = getSqlite()
  db.transaction(() => {
    restoreIndexedEntityRelease(releaseId, indexed)
    db.prepare('UPDATE music_spotify_entity_release SET expected_tracks=?, tracks_loaded=1 WHERE id=?')
      .run(indexed.expectedTracks ?? indexed.tracks.length, releaseId)
  })()
}

export function retainResolvedAudioUrls(payload: unknown): void {
  if (!Array.isArray(payload)) return
  const db = getSqlite()
  db.transaction(() => {
    for (const song of payload) {
      if (!song || typeof song.song_id !== 'string' || typeof song.download_url !== 'string') continue
      if (!song.download_url.startsWith('https://')) continue
      for (const table of ['music_spotify_playlist_item', 'music_spotify_entity_track']) {
        db.prepare(`UPDATE ${table} SET resolved_audio_url=? WHERE spotify_track_id=? AND matched_track_id IS NULL`)
          .run(song.download_url, song.song_id)
      }
    }
  })()
}

export function pendingProvenanceSources(sourceKind: 'playlistItem' | 'entityTrack'): {
  id: number; spotifyTrackId: string; audioSourceUrl: string | null
}[] {
  const db = getSqlite()
  const markers = db.prepare("SELECT file_path FROM music_track WHERE file_path LIKE '%[navihub-%'").all() as { file_path: string }[]
  const ids = new Set(markers.flatMap((row) => row.file_path.match(/\[navihub-([A-Za-z0-9]+)\]/)?.[1] ?? []))
  const table = sourceKind === 'playlistItem' ? 'music_spotify_playlist_item' : 'music_spotify_entity_track'
  const query = db.prepare(`SELECT id, spotify_track_id, audio_source_url FROM ${table} WHERE spotify_track_id=? AND matched_track_id IS NULL`)
  return [...ids].flatMap((id) => (query.all(id) as Record<string, unknown>[]).map((row) => ({
    id: Number(row.id), spotifyTrackId: String(row.spotify_track_id), audioSourceUrl: row.audio_source_url as string | null
  })))
}

function reviewRequiredTrackIds(): Set<number> {
  const db = getSqlite()
  const required = new Set((db.prepare('SELECT local_track_id FROM music_spotify_download_candidate').all() as { local_track_id: number }[]).map((row) => row.local_track_id))
  for (const row of db.prepare('SELECT id FROM music_track WHERE spotify_review_required=1').all() as { id: number }[]) required.add(row.id)
  const sources = new Set((db.prepare(`SELECT spotify_track_id FROM music_spotify_playlist_item WHERE (allow_unverified=1 OR audio_source_url IS NOT NULL) AND match_confirmed=0
    UNION SELECT spotify_track_id FROM music_spotify_entity_track WHERE (allow_unverified=1 OR audio_source_url IS NOT NULL) AND match_confirmed=0`).all() as { spotify_track_id: string }[]).map((row) => row.spotify_track_id))
  for (const row of db.prepare("SELECT id, file_path FROM music_track WHERE file_path LIKE '%[navihub-%'").all() as { id: number; file_path: string }[]) {
    const source = row.file_path.match(/\[navihub-([A-Za-z0-9]+)\]/)?.[1]
    if (source && sources.has(source)) required.add(row.id)
  }
  return required
}

export function unverifiedPlaylistItemCount(playlistId: number, itemIds: number[]): number {
  if (!itemIds.length) return 0
  return (getSqlite().prepare(`SELECT COUNT(*) AS n FROM music_spotify_playlist_item
    WHERE playlist_id=? AND matched_track_id IS NULL AND download_skipped=0
      AND id IN (${itemIds.map(() => '?').join(',')})`).get(playlistId, ...itemIds) as { n: number }).n
}
