import { getSqlite } from '../db/connection'
import type { MusicTrack, MusicSpotifyPlaylistEntry } from '@shared/types'

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

export function normalizeSpotifyMatch(value: string): string {
  return value
    .normalize('NFKC')
    .toLocaleLowerCase()
    .replace(/[\p{P}\p{S}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
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
} | null {
  const db = getSqlite()
  const row = kind === 'artist'
    ? (db.prepare('SELECT id, name, spotify_id FROM music_artist WHERE id = ?').get(id) as Record<string, unknown> | undefined)
    : (db.prepare(
        `SELECT al.id, al.title AS name, al.spotify_id, ar.name AS artist_name
         FROM music_album al JOIN music_artist ar ON ar.id = al.artist_id WHERE al.id = ?`
      ).get(id) as Record<string, unknown> | undefined)
  return row
    ? {
        id: row.id as number,
        name: row.name as string,
        artistName: (row.artist_name as string) ?? null,
        spotifyId: (row.spotify_id as string) ?? null
      }
    : null
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
  getSqlite().prepare(`UPDATE ${table} SET spotify_id = NULL, updated_at = datetime('now') WHERE id = ?`).run(id)
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
    'UPDATE music_spotify_playlist_item SET matched_track_id = ? WHERE id = ?'
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
      update.run(match, row.id)
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
    matchedTrack: track
  }
}
