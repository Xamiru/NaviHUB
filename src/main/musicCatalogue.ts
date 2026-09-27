// Apple's public iTunes catalogue: the fast, keyless first read of an artist's or
// album's releases. Spotify is the fallback when it fails (see musicSpotify.ts).
import * as spotifyRepo from './repos/musicSpotifyRepo'
import * as spotifyMatch from './musicSpotifyMatch'
import { get as getSetting } from './repos/settingsRepo'
import { fetchWithRetry, MAX_API_RESPONSE_BYTES } from './http'
import type {
  SpotifyEntityCandidate,
  SpotifyEntityInspectInput,
  SpotifyEntityKind,
  SpotifyEntityRef
} from '@shared/types'

interface ItunesResult {
  wrapperType?: string
  kind?: string
  artistId?: number
  artistName?: string
  primaryGenreName?: string
  collectionId?: number
  collectionName?: string
  collectionType?: string
  releaseDate?: string
  trackCount?: number
  trackId?: number
  trackName?: string
  trackTimeMillis?: number
  discNumber?: number
  trackNumber?: number
}

export function catalogueCountry(): string {
  const country = getSetting('spotdl.catalogueCountry')?.trim().toUpperCase() ?? 'US'
  return /^[A-Z]{2}$/.test(country) ? country : 'US'
}

export async function itunesResults(url: string, deadline?: number, country = catalogueCountry()): Promise<ItunesResult[]> {
  const remaining = deadline == null ? 8_000 : deadline - Date.now()
  if (remaining <= 0) throw new Error('Fast music catalogue exceeded its 25-second budget')
  const response = await fetchWithRetry(
    `${url}&country=${country}`,
    {
      timeoutMs: Math.max(250, Math.min(8_000, remaining)),
      rateLimitWaits: 0,
      maxResponseBytes: MAX_API_RESPONSE_BYTES
    },
    1
  )
  if (!response.ok) throw new Error(`Fast music catalogue returned HTTP ${response.status}`)
  const payload = await response.json() as { results?: unknown }
  if (!Array.isArray(payload.results)) throw new Error('Fast music catalogue returned invalid data')
  return payload.results.filter((row): row is ItunesResult => !!row && typeof row === 'object')
}

function candidateId(key: string, expected: SpotifyEntityKind): number {
  const match = key.match(new RegExp(`^itunes:${expected}:(\\d+)$`))
  if (!match) throw new Error('That catalogue candidate expired; search again')
  return Number(match[1])
}

export async function findEntityCandidates(
  input: SpotifyEntityRef & { query?: string }
): Promise<SpotifyEntityCandidate[]> {
  const current = spotifyRepo.getEntity(input.kind, input.entityId)
  if (!current) throw new Error(`That local ${input.kind} no longer exists`)
  const query = input.query?.trim() || (input.kind === 'artist'
    ? current.name
    : `${current.artistName ?? ''} ${spotifyMatch.stripAlbumYearPrefix(current.name)}`)
  const entity = input.kind === 'artist' ? 'musicArtist' : 'album'
  const rows = await itunesResults(
    `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=${entity}&limit=12`
  )
  const targetName = spotifyMatch.normalizeSpotifyMatch(
    input.kind === 'album' ? spotifyMatch.stripAlbumYearPrefix(current.name) : current.name
  )
  const targetArtist = spotifyMatch.normalizeSpotifyMatch(current.artistName ?? current.name)
  const seen = new Set<number>()
  return rows.flatMap((row): SpotifyEntityCandidate[] => {
    const id = input.kind === 'artist' ? row.artistId : row.collectionId
    const name = input.kind === 'artist' ? row.artistName : row.collectionName
    if (!Number.isInteger(id) || !name || seen.has(id!)) return []
    seen.add(id!)
    const artist = row.artistName ?? ''
    const exact = input.kind === 'artist'
      ? spotifyMatch.normalizeSpotifyMatch(name) === targetName
      : spotifyMatch.normalizeSpotifyMatch(name) === targetName &&
        spotifyMatch.normalizeSpotifyMatch(artist) === targetArtist
    return [{
      candidateKey: `itunes:${input.kind}:${id}`,
      name,
      secondary: input.kind === 'artist' ? row.primaryGenreName ?? null : artist || null,
      year: row.releaseDate ? Number(row.releaseDate.slice(0, 4)) || null : null,
      exact
    }]
  }).sort((a, b) => Number(b.exact) - Number(a.exact) || (b.year ?? 0) - (a.year ?? 0))
}

export function itunesRelease(
  collection: ItunesResult,
  tracks: ItunesResult[]
): spotifyRepo.IndexedEntityRelease | null {
  if (!collection.collectionId || !collection.collectionName || !collection.artistName) return null
  const songs = tracks.filter((track) =>
    track.wrapperType === 'track' && track.kind === 'song' &&
    track.collectionId === collection.collectionId && track.trackId && track.trackName
  )
  if (!songs.length) return null
  if (typeof collection.trackCount === 'number' && songs.length !== collection.trackCount) {
    throw new Error(`Incomplete catalogue for ${collection.collectionName}: ${songs.length}/${collection.trackCount} tracks`)
  }
  return {
    expectedTracks: collection.trackCount ?? songs.length,
    tracksLoaded: true,
    providerReleaseId: String(collection.collectionId),
    title: collection.collectionName,
    albumArtist: collection.artistName,
    year: collection.releaseDate ? Number(collection.releaseDate.slice(0, 4)) || null : null,
    albumType: (collection.trackCount ?? songs.length) <= 3 ? 'single' : 'album',
    tracks: songs.map((track) => ({
      providerTrackId: String(track.trackId),
      title: track.trackName!,
      artists: [track.artistName ?? collection.artistName!],
      primaryArtist: track.artistName ?? collection.artistName!,
      albumTitle: collection.collectionName!,
      duration: typeof track.trackTimeMillis === 'number' ? track.trackTimeMillis / 1000 : null,
      discNo: track.discNumber ?? null,
      trackNo: track.trackNumber ?? null
    }))
  }
}

export async function fetchItunesSnapshot(
  input: SpotifyEntityInspectInput,
  current: NonNullable<ReturnType<typeof spotifyRepo.getEntity>>,
  candidateKey: string
): Promise<{ providerEntityId: string; sourceName: string; releases: spotifyRepo.IndexedEntityRelease[] }> {
  const deadline = Date.now() + 25_000
  const id = candidateId(candidateKey, input.kind)
  if (input.kind === 'album') {
    const rows = await itunesResults(
      `https://itunes.apple.com/lookup?id=${id}&entity=song&limit=200`,
      deadline
    )
    const collection = rows.find((row) => row.wrapperType === 'collection' && row.collectionId === id)
    const release = collection ? itunesRelease(collection, rows) : null
    if (!release) throw new Error('The fast catalogue did not return tracks for that album')
    return { providerEntityId: String(id), sourceName: collection!.artistName ?? current.artistName ?? current.name, releases: [release] }
  }

  const rows = await itunesResults(
    `https://itunes.apple.com/lookup?id=${id}&entity=album&limit=200`,
    deadline
  )
  const artist = rows.find((row) => row.wrapperType === 'artist' && row.artistId === id)
  const same = spotifyMatch.normalizeSpotifyMatch
  const collections = rows.filter((row) =>
    row.wrapperType === 'collection' && row.collectionId && row.collectionName &&
    same(row.artistName ?? '') === same(artist?.artistName ?? current.name)
  )
  if (!collections.length) throw new Error('The fast catalogue did not return albums for that artist')
  // Show release headers immediately. Tracklists are fetched only when selected or opened.
  const releases: spotifyRepo.IndexedEntityRelease[] = collections.map((collection) => ({
    providerReleaseId: String(collection.collectionId), title: collection.collectionName!,
    albumArtist: collection.artistName!, year: Number(collection.releaseDate?.slice(0, 4)) || null,
    albumType: (collection.trackCount ?? 0) <= 3 ? 'single' : 'album',
    expectedTracks: collection.trackCount ?? null, tracksLoaded: false, tracks: []
  }))
  if (!releases.length) throw new Error('The fast catalogue did not return usable album tracks')
  const unique = new Map<string, spotifyRepo.IndexedEntityRelease>()
  for (const release of releases) {
    const key = `${spotifyMatch.normalizeSpotifyMatch(release.title)}:${release.year ?? ''}:${release.tracks.length}`
    if (!unique.has(key)) unique.set(key, release)
  }
  return {
    providerEntityId: String(id),
    sourceName: artist?.artistName ?? current.name,
    releases: [...unique.values()].sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || a.title.localeCompare(b.title))
  }
}
