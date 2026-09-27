// Pure Spotify URL, payload and release-matching decisions. No process, file,
// network or database side effects, so tests cover them without the queue runtime.
import * as spotifyRepo from './repos/musicSpotifyRepo'
import * as spotifyMatch from './musicSpotifyMatch'
import type { SpotifyEntityKind } from '@shared/types'

export interface ParsedSpotifyUrl {
  kind: 'playlist' | SpotifyEntityKind
  spotifyId: string
  canonicalUrl: string
}

export interface SpotdlValidation {
  songs: spotifyRepo.SpotdlSong[]
  duplicates: number
  skipped: number
  title: string
}

export function parseSpotifyUrl(value: string): ParsedSpotifyUrl | null {
  let url: URL
  try {
    url = new URL(value.trim())
  } catch {
    return null
  }
  if (!['open.spotify.com', 'www.open.spotify.com'].includes(url.hostname.toLowerCase())) return null
  const match = url.pathname.match(/^\/(?:intl-[a-z-]+\/)?(playlist|artist|album)\/([A-Za-z0-9]{10,64})\/?$/i)
  if (!match) return null
  return {
    kind: match[1].toLowerCase() as ParsedSpotifyUrl['kind'],
    spotifyId: match[2],
    canonicalUrl: `https://open.spotify.com/${match[1].toLowerCase()}/${match[2]}`
  }
}

export function parseSpotifyPlaylistUrl(value: string): ParsedSpotifyUrl | null {
  const parsed = parseSpotifyUrl(value)
  return parsed?.kind === 'playlist' ? parsed : null
}

export function validateSpotdlPayload(payload: unknown): SpotdlValidation {
  if (!Array.isArray(payload)) throw new Error('Spotify returned an invalid playlist')
  const seen = new Set<string>()
  const songs: spotifyRepo.SpotdlSong[] = []
  let duplicates = 0
  let skipped = 0
  let title = 'Spotify playlist'
  const orderedPayload = payload.map((raw, index) => ({
    raw,
    index,
    position: raw && typeof raw === 'object' &&
      typeof (raw as Record<string, unknown>).list_position === 'number'
      ? (raw as Record<string, unknown>).list_position as number
      : null
  }))
  if (orderedPayload.filter((entry) => entry.position != null).length > 1) {
    orderedPayload.sort((a, b) => {
      if (a.position == null) return b.position == null ? a.index - b.index : 1
      if (b.position == null) return -1
      return a.position - b.position || a.index - b.index
    })
  }
  for (const { raw } of orderedPayload) {
    if (!raw || typeof raw !== 'object') {
      skipped += 1
      continue
    }
    const row = raw as Record<string, unknown>
    const songUrl = typeof row.url === 'string' ? row.url : ''
    const idFromUrl = songUrl.match(/\/track\/([A-Za-z0-9]+)/)?.[1]
    const id = typeof row.song_id === 'string' ? row.song_id : idFromUrl
    const artists = Array.isArray(row.artists)
      ? row.artists.filter((artist): artist is string => typeof artist === 'string' && !!artist.trim())
      : typeof row.artist === 'string'
        ? [row.artist]
        : []
    const name = typeof row.name === 'string' ? row.name.trim() : ''
    const album = typeof row.album_name === 'string' ? row.album_name.trim() : ''
    const unavailable = row.is_unavailable === true || row.available === false
    const local = row.is_local === true || songUrl.startsWith('spotify:local:')
    const podcast = row.type === 'episode' || songUrl.includes('/episode/')
    if (!id || !name || !album || artists.length === 0 || unavailable || local || podcast) {
      skipped += 1
      continue
    }
    if (seen.has(id)) {
      duplicates += 1
      continue
    }
    seen.add(id)
    if (typeof row.list_name === 'string' && row.list_name.trim()) title = row.list_name.trim()
    const number = (value: unknown): number | null =>
      typeof value === 'number' && Number.isFinite(value) ? value : null
    songs.push({
      spotifyTrackId: id,
      title: name,
      artists,
      primaryArtist: artists[0],
      albumArtist:
        typeof row.album_artist === 'string' && row.album_artist.trim()
          ? row.album_artist.trim()
          : null,
      albumTitle: album,
      duration: number(row.duration),
      coverUrl: typeof row.cover_url === 'string' ? row.cover_url : null,
      spotifyUrl: songUrl || `https://open.spotify.com/track/${id}`,
      discNo: number(row.disc_number),
      trackNo: number(row.track_number),
      year: number(row.year),
      rawJson: JSON.stringify(row),
      spotifyAlbumId: typeof row.album_id === 'string' ? row.album_id : null,
      spotifyArtistId: typeof row.artist_id === 'string'
        ? row.artist_id
        : Array.isArray(row.artist_ids) && typeof row.artist_ids[0] === 'string'
          ? row.artist_ids[0]
          : null,
      spotifyArtistIds: Array.isArray(row.artist_ids)
        ? row.artist_ids.filter((id): id is string => typeof id === 'string')
        : typeof row.artist_id === 'string' ? [row.artist_id] : [],
      albumType: ['album', 'single', 'compilation'].includes(String(row.album_type))
        ? (row.album_type as 'album' | 'single' | 'compilation')
        : null,
      listPosition: number(row.list_position)
    })
  }
  return { songs, duplicates, skipped, title }
}

export function chunkSpotifyItems<T>(items: T[], size = 100): T[][] {
  if (!Number.isInteger(size) || size < 1) throw new Error('Chunk size must be positive')
  const chunks: T[][] = []
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size))
  return chunks
}

export function estimateSpotifyDownloadBytes(
  items: { duration: number | null }[],
  fallbackBytes = 4 * 1024 * 1024
): number {
  return Math.ceil(
    items.reduce(
      (total, item) => total + (item.duration == null ? fallbackBytes : item.duration * 16_000),
      0
    ) * 1.05
  )
}

export function buildSpotifyDiscoveryQuery(artist: string, title: string): string {
  return `${artist.trim()} - ${title.trim()}`
}

export function stripCatalogReleaseTypeSuffix(albumTitle: string): string {
  const trimmed = albumTitle.trim()
  const stripped = trimmed.replace(/\s+[-–—]\s+(?:single|ep)$/i, '').trim()
  return stripped || trimmed
}

export function spotifyReleaseTitlesMatch(indexedTitle: string, spotifyTitle: string): boolean {
  const same = spotifyMatch.normalizeSpotifyMatch
  return same(indexedTitle) === same(spotifyTitle) ||
    same(stripCatalogReleaseTypeSuffix(indexedTitle)) ===
      same(stripCatalogReleaseTypeSuffix(spotifyTitle))
}

export function completeResolvedReleaseSongs(
  release: Pick<spotifyRepo.IndexedEntityRelease, 'title' | 'albumArtist' | 'tracks'>,
  candidates: spotifyRepo.SpotdlSong[]
): { songs: spotifyRepo.SpotdlSong[]; missing: spotifyRepo.IndexedEntityTrack[] } {
  const same = spotifyMatch.normalizeSpotifyMatch
  const unused = [...candidates]
  const songs: spotifyRepo.SpotdlSong[] = []
  const missing: spotifyRepo.IndexedEntityTrack[] = []
  for (const track of release.tracks) {
    const matches = unused
      .map((song, index) => ({ song, index }))
      .filter(({ song }) =>
        same(song.title) === same(track.title) &&
        same(song.albumArtist ?? song.primaryArtist) === same(release.albumArtist) &&
        spotifyReleaseTitlesMatch(release.title, song.albumTitle) &&
        (track.duration == null || song.duration == null || Math.abs(track.duration - song.duration) <= 3)
      )
      .sort((a, b) => {
        const aPosition = Number(a.song.discNo === track.discNo && a.song.trackNo === track.trackNo)
        const bPosition = Number(b.song.discNo === track.discNo && b.song.trackNo === track.trackNo)
        return bPosition - aPosition
      })
    if (!matches.length) {
      missing.push(track)
      continue
    }
    songs.push(matches[0].song)
    unused.splice(matches[0].index, 1)
  }
  return { songs, missing }
}

export function adaptRecoveredReleaseSongs(
  release: Pick<spotifyRepo.IndexedEntityRelease, 'title' | 'albumArtist'>,
  missing: spotifyRepo.IndexedEntityTrack[],
  candidates: spotifyRepo.SpotdlSong[],
  spotifyAlbumId: string
): spotifyRepo.SpotdlSong[] {
  const same = spotifyMatch.normalizeSpotifyMatch
  const used = new Set<string>()
  return missing.flatMap((track): spotifyRepo.SpotdlSong[] => {
    const matches = candidates.filter((song) =>
      !used.has(song.spotifyTrackId) &&
      same(song.title) === same(track.title) &&
      same(song.albumArtist ?? song.primaryArtist) === same(release.albumArtist) &&
      (track.duration == null || song.duration == null || Math.abs(track.duration - song.duration) <= 3)
    )
    const preferred = matches.filter((song) => song.spotifyAlbumId === spotifyAlbumId)
    const source = preferred.length === 1
      ? preferred[0]
      : matches.length === 1 ? matches[0] : null
    if (!source) return []
    used.add(source.spotifyTrackId)
    let raw: Record<string, unknown>
    try {
      raw = JSON.parse(source.rawJson) as Record<string, unknown>
    } catch {
      raw = {}
    }
    Object.assign(raw, {
      name: track.title,
      album_name: release.title,
      album_artist: release.albumArtist,
      album_id: spotifyAlbumId,
      disc_number: track.discNo,
      track_number: track.trackNo
    })
    return [{
      ...source,
      title: track.title,
      albumArtist: release.albumArtist,
      albumTitle: release.title,
      duration: track.duration ?? source.duration,
      discNo: track.discNo,
      trackNo: track.trackNo,
      rawJson: JSON.stringify(raw),
      spotifyAlbumId
    }]
  })
}

export function releaseTrackNumberingIsIncomplete(
  tracks: Array<{ discNo: number | null; trackNo: number | null }>
): boolean {
  if (!tracks.length || tracks.some((track) => track.trackNo == null)) return false
  const discs = new Map<number, number[]>()
  for (const track of tracks) {
    const disc = track.discNo ?? 1
    const numbers = discs.get(disc) ?? []
    numbers.push(track.trackNo!)
    discs.set(disc, numbers)
  }
  return [...discs.values()].some((numbers) => {
    const unique = [...new Set(numbers)].sort((a, b) => a - b)
    return unique[0] !== 1 || unique.some((value, index) => value !== index + 1)
  })
}

interface ReleaseDiscoveryTrack {
  title: string
  duration: number | null
}

interface ReleaseDiscoverySource {
  tracks: ReleaseDiscoveryTrack[]
}

export function rankSpotifyReleaseDiscoveryTracks<T extends ReleaseDiscoveryTrack>(
  releases: ReleaseDiscoverySource[],
  target: { tracks: T[] }
): T[] {
  const releaseCounts = new Map<string, number>()
  for (const release of releases) {
    const titles = new Set(release.tracks.map((track) => spotifyMatch.normalizeSpotifyMatch(track.title)))
    for (const title of titles) releaseCounts.set(title, (releaseCounts.get(title) ?? 0) + 1)
  }
  return target.tracks
    .map((track, index) => ({
      track,
      index,
      releaseCount: releaseCounts.get(spotifyMatch.normalizeSpotifyMatch(track.title)) ?? 0
    }))
    .sort((a, b) => a.releaseCount - b.releaseCount || b.index - a.index)
    .map(({ track }) => track)
}

export function spotifyAlbumIdFromTrackLookup(
  release: { title: string; albumArtist: string },
  track: ReleaseDiscoveryTrack,
  songs: spotifyRepo.SpotdlSong[]
): string | null {
  const same = spotifyMatch.normalizeSpotifyMatch
  const ids = new Set(songs.flatMap((song) => {
    if (same(song.title) !== same(track.title)) return []
    if (track.duration == null || song.duration == null || Math.abs(track.duration - song.duration) > 3) {
      return []
    }
    if (same(song.albumArtist ?? song.primaryArtist) !== same(release.albumArtist)) return []
    if (!spotifyReleaseTitlesMatch(release.title, song.albumTitle)) return []
    return song.spotifyAlbumId ? [song.spotifyAlbumId] : []
  }))
  return ids.size === 1 ? [...ids][0] : null
}

export function pickDiscoveredEntity(
  kind: SpotifyEntityKind,
  current: NonNullable<ReturnType<typeof spotifyRepo.getEntity>>,
  songs: spotifyRepo.SpotdlSong[]
): ParsedSpotifyUrl | null {
  const same = spotifyMatch.normalizeSpotifyMatch
  const targetArtist = same(kind === 'artist' ? current.name : current.artistName ?? '')
  const targetAlbum = same(spotifyMatch.stripAlbumYearPrefix(current.name))
  for (const sample of current.sampleTracks) {
    const song = songs.find((candidate) => {
      if (same(candidate.title) !== same(sample.title)) return false
      if (sample.duration == null || candidate.duration == null ||
          Math.abs(sample.duration - candidate.duration) > 3) return false
      const artists = candidate.artists.map(same)
      if (!artists.includes(targetArtist)) return false
      return kind === 'artist' || same(spotifyMatch.stripAlbumYearPrefix(candidate.albumTitle)) === targetAlbum
    })
    if (!song) continue
    if (kind === 'album' && song.spotifyAlbumId) {
      return {
        kind,
        spotifyId: song.spotifyAlbumId,
        canonicalUrl: `https://open.spotify.com/album/${song.spotifyAlbumId}`
      }
    }
    const artistIndex = song.artists.findIndex((artist) => same(artist) === targetArtist)
    const spotifyId = artistIndex >= 0 ? song.spotifyArtistIds[artistIndex] : null
    if (kind === 'artist' && spotifyId) {
      return {
        kind,
        spotifyId,
        canonicalUrl: `https://open.spotify.com/artist/${spotifyId}`
      }
    }
  }
  return null
}

export function pickConsensusDiscoveredEntity(
  kind: SpotifyEntityKind,
  current: NonNullable<ReturnType<typeof spotifyRepo.getEntity>>,
  songs: spotifyRepo.SpotdlSong[]
): ParsedSpotifyUrl | null {
  const votes = new Map<string, { parsed: ParsedSpotifyUrl; count: number }>()
  for (const sample of current.sampleTracks.slice(0, 3)) {
    const parsed = pickDiscoveredEntity(kind, { ...current, sampleTracks: [sample] }, songs)
    if (!parsed) continue
    const vote = votes.get(parsed.spotifyId) ?? { parsed, count: 0 }
    vote.count += 1
    votes.set(parsed.spotifyId, vote)
  }
  const ranked = [...votes.values()].sort((a, b) => b.count - a.count)
  if (!ranked.length || (ranked[1] && ranked[1].count === ranked[0].count)) return null
  return ranked[0].parsed
}

/** Remove NaviHUB's temporary Spotify-id filename marker after a download.
 * If a clean target already exists, keep the marked file so the scanner can
 * expose it as a candidate instead of silently replacing the user's audio.
 */
// Kept at the historical spotDL location so interrupted older runs are still recovered.
