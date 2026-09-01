import { getSqlite } from '../db/connection'
import type {
  MusicTrack,
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
       )
       OR EXISTS (
         SELECT 1
         FROM music_spotify_download_queue_selection qs
         JOIN music_spotify_playlist_item i ON i.id=qs.playlist_item_id
         WHERE qs.queue_id=music_spotify_download_queue.id
           AND i.matched_track_id IS NULL
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
      missing: release.tracks.filter((track) => track.matchedTrackId == null).length
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
            COALESCE(SUM(t.matched_track_id IS NULL), 0) AS missing_count,
            COALESCE(SUM(t.duration), 0) AS duration,
            COALESCE(SUM(CASE WHEN t.matched_track_id IS NULL THEN
              CASE WHEN t.duration IS NULL THEN ? ELSE t.duration * ? END ELSE 0 END), 0) AS missing_bytes
     FROM music_spotify_download_queue_selection qs
     JOIN music_spotify_entity_release r ON r.id=qs.release_id
     LEFT JOIN music_spotify_entity_track t ON t.release_id=r.id
     WHERE qs.queue_id=? AND qs.release_id IS NOT NULL
     GROUP BY qs.id, r.id
     ORDER BY qs.position, qs.id`
  ).all(UNKNOWN_TRACK_BYTES, DOWNLOAD_BYTES_PER_SECOND, queueId) as Record<string, unknown>[]
  const playlistRows = db.prepare(
    `SELECT qs.id, i.id AS source_id, i.title, i.primary_artist, i.duration,
            i.spotify_url, i.audio_source_url, i.allow_unverified, i.download_error,
            i.matched_track_id
     FROM music_spotify_download_queue_selection qs
     JOIN music_spotify_playlist_item i ON i.id=qs.playlist_item_id
     WHERE qs.queue_id=? AND qs.playlist_item_id IS NOT NULL
     ORDER BY qs.position, qs.id`
  ).all(queueId) as Record<string, unknown>[]
  const releaseTracks = db.prepare(
    `SELECT t.id, t.title, t.primary_artist, t.spotify_url, t.matched_track_id,
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
      tracks: (releaseTracks.all(row.source_id) as Record<string, unknown>[]).map((track) => ({
        id: track.id as number,
        sourceKind: 'entityTrack' as const,
        title: track.title as string,
        artist: track.primary_artist as string,
        spotifyUrl: (track.spotify_url as string) ?? null,
        missing: track.matched_track_id == null,
        audioSourceUrl: (track.audio_source_url as string) ?? null,
        allowUnverified: Boolean(track.allow_unverified),
        error: (track.download_error as string) ?? null
      }))
    })),
    ...playlistRows.map((row): SpotifyDownloadQueueSelection => {
      const duration = (row.duration as number) ?? null
      const missing = row.matched_track_id == null
      return {
        id: row.id as number,
        kind: 'playlistItem',
        sourceId: row.source_id as number,
        title: row.title as string,
        subtitle: (row.primary_artist as string) ?? null,
        trackCount: 1,
        missingCount: missing ? 1 : 0,
        duration: duration ?? 0,
        missingEstimatedBytes: missing ? estimatedBytes(duration) : 0,
        metadataState: null,
        error: (row.download_error as string) ?? null,
        tracks: [{
          id: row.source_id as number,
          sourceKind: 'playlistItem',
          title: row.title as string,
          artist: row.primary_artist as string,
          spotifyUrl: (row.spotify_url as string) ?? null,
          missing,
          audioSourceUrl: (row.audio_source_url as string) ?? null,
          allowUnverified: Boolean(row.allow_unverified),
          error: (row.download_error as string) ?? null
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
    const localArtists = new Set([
      normalizeSpotifyMatch(candidate.folderArtist),
      ...artistComponents(candidate.tagArtist ?? '')
    ])
    return localArtists.has(artist)
  })
  if (matches.length === 1) return matches[0].id
  if (matches.length > 1) {
    const album = normalizeSpotifyMatch(song.albumTitle)
    matches = matches.filter((candidate) => normalizeSpotifyMatch(candidate.albumTitle) === album)
    if (matches.length === 1) return matches[0].id
  }
  return null
}

function allCandidates(): LocalMatchCandidate[] {
  return (
    getSqlite()
      .prepare(
        `SELECT t.id, t.album_id, t.artist_id, t.title, ar.name AS folder_artist, t.tag_artist,
                al.title AS album_title, t.duration
         FROM music_track t
         JOIN music_artist ar ON ar.id = t.artist_id
         JOIN music_album al ON al.id = t.album_id`
      )
      .all() as Record<string, unknown>[]
  ).map(rowCandidate)
}

function indexCandidates(candidates: LocalMatchCandidate[]): Map<string, LocalMatchCandidate[]> {
  const index = new Map<string, LocalMatchCandidate[]>()
  for (const candidate of candidates) {
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
  return matchSpotifySong(song, candidates)
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
      if (!keep.has(row.provider_release_id)) {
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
        // A provider can return a partial album while still exiting successfully. Preserve
        // authoritative payloads only when they cover at least the refreshed catalogue count;
        // otherwise Refresh must restore the complete indexed tracklist for another resolution.
        if (previous.metadata_state === 'resolved' && previous.track_count >= release.tracks.length) return
        db.prepare('DELETE FROM music_spotify_entity_track WHERE release_id=?').run(releaseId)
        db.prepare(
          `UPDATE music_spotify_entity_release
           SET metadata_state='indexed', resolution_error=NULL WHERE id=?`
        ).run(releaseId)
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
    releases: releaseRows.map((release) => ({
      id: release.id as number,
      providerReleaseId: release.provider_release_id as string,
      spotifyAlbumId: (release.spotify_album_id as string) ?? null,
      title: release.title as string,
      albumArtist: release.album_artist as string,
      year: (release.year as number) ?? null,
      albumType: (release.album_type as 'album' | 'single') ?? null,
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
  const release = db.prepare(
    `SELECT r.id, r.snapshot_id, s.artist_id, s.album_id
     FROM music_spotify_entity_release r
     JOIN music_spotify_entity_snapshot s ON s.id=r.snapshot_id WHERE r.id=?`
  ).get(releaseId) as Record<string, unknown> | undefined
  if (!release) throw new Error('That saved release no longer exists')
  const matches = matchDetails(songs)
  db.transaction(() => {
    db.prepare(
      `UPDATE music_spotify_entity_release
       SET spotify_album_id=?, metadata_state='resolved', resolution_error=NULL WHERE id=?`
    ).run(songs[0].spotifyAlbumId, releaseId)
    db.prepare('DELETE FROM music_spotify_entity_track WHERE release_id=?').run(releaseId)
    const insert = db.prepare(
      `INSERT INTO music_spotify_entity_track
       (release_id, provider_track_id, spotify_track_id, position, title, artists_json,
        primary_artist, album_title, duration, disc_no, track_no, spotify_url, raw_json,
        matched_track_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    songs.forEach((song, index) => insert.run(
      releaseId,
      song.spotifyTrackId,
      song.spotifyTrackId,
      index,
      song.title,
      JSON.stringify(song.artists),
      song.primaryArtist,
      song.albumTitle,
      song.duration,
      song.discNo,
      song.trackNo,
      song.spotifyUrl,
      song.rawJson,
      matches.get(song.spotifyTrackId)?.id ?? null
    ))
  })()
}

export function restoreIndexedEntityRelease(
  releaseId: number,
  release: IndexedEntityRelease
): void {
  const db = getSqlite()
  const owner = db.prepare(
    'SELECT id FROM music_spotify_entity_release WHERE id=?'
  ).get(releaseId)
  if (!owner) throw new Error('That saved release no longer exists')
  const old = db.prepare(
    `SELECT * FROM music_spotify_entity_track WHERE release_id=? ORDER BY position, id`
  ).all(releaseId) as Record<string, unknown>[]
  const same = normalizeSpotifyMatch
  const candidates = allCandidates()
  const byTitle = indexCandidates(candidates)
  db.transaction(() => {
    db.prepare(
      `UPDATE music_spotify_entity_release
       SET title=?, album_artist=?, year=?, album_type=?, metadata_state='indexed',
           resolution_error=NULL WHERE id=?`
    ).run(release.title, release.albumArtist, release.year, release.albumType, releaseId)
    db.prepare('DELETE FROM music_spotify_entity_track WHERE release_id=?').run(releaseId)
    const insert = db.prepare(
      `INSERT INTO music_spotify_entity_track
       (release_id, provider_track_id, spotify_track_id, position, title, artists_json,
        primary_artist, album_title, duration, disc_no, track_no, spotify_url, raw_json,
        audio_source_url, allow_unverified, download_error, matched_track_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    release.tracks.forEach((track, index) => {
      const previous = old.filter((row) =>
        same(row.title as string) === same(track.title) &&
        same(row.primary_artist as string) === same(track.primaryArtist) &&
        (row.duration == null || track.duration == null ||
          Math.abs(Number(row.duration) - track.duration) <= 3)
      )
      const retained = previous.length === 1 ? previous[0] : null
      const matchInput = retained?.raw_json
        ? {
            title: retained.title as string,
            primaryArtist: retained.primary_artist as string,
            albumTitle: retained.album_title as string,
            duration: (retained.duration as number) ?? null
          }
        : track
      const matched = matchSpotifySong(
        matchInput,
        byTitle.get(normalizeSpotifyMatch(matchInput.title)) ?? []
      )
      insert.run(
        releaseId,
        track.providerTrackId,
        retained?.spotify_track_id ?? null,
        index,
        track.title,
        JSON.stringify(track.artists),
        track.primaryArtist,
        track.albumTitle,
        track.duration,
        track.discNo,
        track.trackNo,
        retained?.spotify_url ?? null,
        retained?.raw_json ?? null,
        retained?.audio_source_url ?? null,
        retained?.allow_unverified ?? 0,
        retained?.download_error ?? null,
        matched
      )
    })
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

export function resolveAllSpotifyItems(): number {
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
  const items = db
    .prepare(
      `SELECT id, title, primary_artist, album_title, duration
       FROM music_spotify_playlist_item`
    )
    .all() as Record<string, unknown>[]
  const update = db.prepare(
    'UPDATE music_spotify_playlist_item SET matched_track_id = ?, download_error = CASE WHEN ? IS NOT NULL THEN NULL ELSE download_error END WHERE id = ?'
  )
  const entityItems = db
    .prepare(
      `SELECT id, title, primary_artist, album_title, duration
       FROM music_spotify_entity_track`
    )
    .all() as Record<string, unknown>[]
  const updateEntity = db.prepare(
    'UPDATE music_spotify_entity_track SET matched_track_id = ?, download_error = CASE WHEN ? IS NOT NULL THEN NULL ELSE download_error END WHERE id = ?'
  )
  let resolved = 0
  const tx = db.transaction(() => {
    for (const row of items) {
      const match = matchSpotifySong(
        {
          title: row.title as string,
          primaryArtist: row.primary_artist as string,
          albumTitle: row.album_title as string,
          duration: (row.duration as number) ?? null
        },
        byTitle.get(normalizeSpotifyMatch(row.title as string)) ?? []
      )
      update.run(match, match, row.id)
      if (match != null) resolved += 1
    }
    for (const row of entityItems) {
      const match = matchSpotifySong(
        {
          title: row.title as string,
          primaryArtist: row.primary_artist as string,
          albumTitle: row.album_title as string,
          duration: (row.duration as number) ?? null
        },
        byTitle.get(normalizeSpotifyMatch(row.title as string)) ?? []
      )
      updateEntity.run(match, match, row.id)
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
  db.transaction(() => {
    playlistId = Number(
      db.prepare('INSERT INTO music_playlist (title) VALUES (?)').run(input.title).lastInsertRowid
    )
    db.prepare(
      `INSERT INTO music_spotify_playlist (playlist_id, spotify_id, source_url)
       VALUES (?, ?, ?)`
    ).run(playlistId, input.spotifyId, input.sourceUrl)
    const insert = db.prepare(
      `INSERT INTO music_spotify_playlist_item
       (playlist_id, spotify_track_id, position, title, artists_json, primary_artist,
        album_artist, album_title, duration, cover_path, spotify_url, disc_no, track_no,
        year, raw_json, matched_track_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    input.songs.forEach((song, position) => {
      const match = findMatch(song, byTitle.get(normalizeSpotifyMatch(song.title)) ?? [])
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
        match
      )
    })
  })()
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
  const where = ids.length ? `AND id IN (${ids.map(() => '?').join(', ')})` : ''
  return getSqlite()
    .prepare(
      `SELECT * FROM music_spotify_playlist_item
       WHERE playlist_id = ? AND matched_track_id IS NULL ${where}
       ORDER BY position ASC, id ASC`
    )
    .all(playlistId, ...ids) as Record<string, unknown>[]
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
  const sets: string[] = ['download_error=NULL']
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
    matchedTrack: track
  }
}
