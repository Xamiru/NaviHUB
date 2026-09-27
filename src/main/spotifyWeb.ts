import { fetchWithRetry, MAX_API_RESPONSE_BYTES } from './http'
import { logInfo } from './logBus'
import {
  DEFAULT_QUERY_HASHES,
  PATHFINDER_URL,
  QUERY_ROUTE_CHUNKS,
  extractQueryHashes,
  extractWebPlayerBundle,
  parseAlbumPage,
  parseArtistReleases,
  parseEmbedSession,
  parsePlaylistPage,
  parseSearchAlbums,
  parseSearchTopTrack,
  pathfinderErrorMessage,
  routeChunkUrls,
  type EmbedSession,
  type SpotdlRawSong,
  type SpotifyAlbumHit
} from './spotifyWebCore'

const BROWSER_UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'
// A permanent Spotify editorial playlist; any public embed page issues the same anonymous session.
const DEFAULT_EMBED = 'playlist/37i9dQZF1DXcBWIGoYBM5M'
const PAGE_LIMIT = 100
const ALBUM_PAGE_LIMIT = 50
const LOOKUP_WORKERS = 4

let session: EmbedSession | null = null
const hashes = new Map(Object.entries(DEFAULT_QUERY_HASHES))

async function text(url: string): Promise<string> {
  const response = await fetchWithRetry(url, { headers: { 'user-agent': BROWSER_UA }, timeoutMs: 30_000, maxResponseBytes: MAX_API_RESPONSE_BYTES })
  if (!response.ok) throw new Error(`Spotify returned HTTP ${response.status}`)
  return response.text()
}

async function accessToken(embed = DEFAULT_EMBED): Promise<string> {
  if (session && session.expiresAt > Date.now()) return session.accessToken
  session = parseEmbedSession(await text(`https://open.spotify.com/embed/${embed}`))
  return session.accessToken
}

/** Refresh persisted-query hashes from the live web player after Spotify rotates one. */
async function rediscoverHash(operation: string): Promise<void> {
  const bundleUrl = extractWebPlayerBundle(await text('https://open.spotify.com/'))
  if (!bundleUrl) throw new Error('Spotify changed its web player; NaviHUB could not locate it')
  const bundle = await text(bundleUrl)
  for (const [name, hash] of extractQueryHashes(bundle)) hashes.set(name, hash)
  const route = QUERY_ROUTE_CHUNKS[operation]
  if (route && !extractQueryHashes(bundle).has(operation)) {
    for (const url of routeChunkUrls(bundle, bundleUrl, route)) {
      const response = await fetchWithRetry(url, { timeoutMs: 30_000, maxResponseBytes: MAX_API_RESPONSE_BYTES }, 1)
      if (!response.ok) continue
      for (const [name, hash] of extractQueryHashes(await response.text())) hashes.set(name, hash)
      break
    }
  }
  logInfo('http', `Spotify web player queries refreshed (${operation})`)
}

export async function pathfinder(operation: string, variables: Record<string, unknown>, embed?: string): Promise<unknown> {
  let rediscovered = false
  let refreshed = false
  while (true) {
    const hash = hashes.get(operation)
    if (!hash) {
      if (rediscovered) throw new Error(`Spotify changed its web player; the ${operation} query is unavailable`)
      rediscovered = true
      await rediscoverHash(operation)
      continue
    }
    const response = await fetchWithRetry(PATHFINDER_URL, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${await accessToken(embed)}`,
        'content-type': 'application/json',
        'app-platform': 'WebPlayer',
        'user-agent': BROWSER_UA
      },
      body: JSON.stringify({ variables, operationName: operation, extensions: { persistedQuery: { version: 1, sha256Hash: hash } } }),
      timeoutMs: 30_000,
      maxResponseBytes: MAX_API_RESPONSE_BYTES
    })
    if (response.status === 401 && !refreshed) {
      refreshed = true
      session = null
      continue
    }
    const body = await response.json().catch(() => null)
    const persistedMiss = response.status === 412 || /persisted ?query/i.test(pathfinderErrorMessage(body) ?? '')
    if (persistedMiss && !rediscovered) {
      rediscovered = true
      hashes.delete(operation)
      await rediscoverHash(operation)
      continue
    }
    if (!response.ok) throw new Error(`Spotify returned HTTP ${response.status} for ${operation}`)
    const error = pathfinderErrorMessage(body)
    if (error && !(body as { data?: unknown })?.data) throw new Error(`Spotify could not answer ${operation}: ${error}`)
    return body
  }
}

export interface SpotifyReadProgress {
  (done: number, total: number): void
}

export async function readPlaylist(playlistId: string, onProgress?: SpotifyReadProgress): Promise<{ title: string; songs: SpotdlRawSong[]; total: number }> {
  const uri = `spotify:playlist:${playlistId}`
  const songs: SpotdlRawSong[] = []
  let title: string | undefined
  let total: number | null = null
  while (total == null || songs.length < total) {
    const body = await pathfinder('fetchPlaylist', { uri, offset: songs.length, limit: PAGE_LIMIT, enableWatchFeedEntrypoint: false }, `playlist/${playlistId}`)
    const page = parsePlaylistPage(body, playlistId, songs.length, title)
    if (total != null && page.total !== total) throw new Error('The playlist changed while NaviHUB was reading it; try again')
    title = page.title
    total = page.total
    if (page.received === 0 && songs.length < total) throw new Error('Spotify stopped returning playlist tracks before the end')
    songs.push(...page.songs)
    onProgress?.(Math.min(songs.length, total), total)
  }
  return { title: title ?? 'Spotify playlist', songs: songs.slice(0, total ?? 0), total: total ?? 0 }
}

export async function readAlbum(albumId: string): Promise<SpotdlRawSong[]> {
  const uri = `spotify:album:${albumId}`
  const songs: SpotdlRawSong[] = []
  let total: number | null = null
  // Items without track data are dropped, so page by what Spotify returned, not by what was kept.
  let read = 0
  while (total == null || read < total) {
    const page = parseAlbumPage(await pathfinder('getAlbum', { uri, locale: '', offset: read, limit: ALBUM_PAGE_LIMIT }, `album/${albumId}`))
    total = page.total
    if (page.received === 0 && read < total) throw new Error('Spotify stopped returning album tracks before the end')
    read += page.received
    songs.push(...page.songs)
  }
  return songs
}

async function pool<T, R>(items: T[], run: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length)
  let next = 0
  await Promise.all(Array.from({ length: Math.min(LOOKUP_WORKERS, items.length) }, async () => {
    while (next < items.length) {
      const index = next++
      results[index] = await run(items[index])
    }
  }))
  return results
}

export async function readArtist(artistId: string, onProgress?: SpotifyReadProgress): Promise<SpotdlRawSong[]> {
  const uri = `spotify:artist:${artistId}`
  const releases: { id: string }[] = []
  let total: number | null = null
  while (total == null || releases.length < total) {
    const page = parseArtistReleases(await pathfinder('queryArtistDiscographyAll', { uri, offset: releases.length, limit: 50, order: 'DATE_DESC' }, `artist/${artistId}`))
    total = page.total
    if (!page.releases.length) break
    releases.push(...page.releases)
  }
  let done = 0
  const albums = await pool(releases, async (release) => {
    const songs = await readAlbum(release.id)
    onProgress?.(++done, releases.length)
    return songs
  })
  return albums.flat()
}

const SEARCH_VARIABLES = {
  limit: 10, numberOfTopResults: 10, offset: 0, includeAuthors: false,
  includeEpisodeContentRatingsV2: false, includeAudiobooks: false, includePreReleases: false
}

export async function searchAlbums(query: string): Promise<SpotifyAlbumHit[]> {
  return parseSearchAlbums(await pathfinder('searchSuggestions', { query, ...SEARCH_VARIABLES }))
}

/** Best track per free-text query; queries without a result are dropped, as `spotdl save` did. */
export async function searchTracks(queries: string[]): Promise<SpotdlRawSong[]> {
  const found = await pool(queries, async (query) =>
    parseSearchTopTrack(await pathfinder('searchSuggestions', { query, ...SEARCH_VARIABLES })))
  return found.filter((song): song is SpotdlRawSong => song != null)
}

/**
 * In-process replacement for `spotdl save <targets…>`: Spotify album/artist/playlist
 * links expand to their tracks and any other target is a track search query.
 */
export async function saveSongs(targets: string[], onProgress?: SpotifyReadProgress): Promise<SpotdlRawSong[]> {
  const songs: SpotdlRawSong[] = []
  const queries: string[] = []
  for (const target of targets) {
    const link = target.match(/^https:\/\/open\.spotify\.com\/(playlist|album|artist)\/([A-Za-z0-9]+)$/)
    if (!link) { queries.push(target); continue }
    if (link[1] === 'album') songs.push(...await readAlbum(link[2]))
    else if (link[1] === 'artist') songs.push(...await readArtist(link[2], onProgress))
    else songs.push(...(await readPlaylist(link[2], onProgress)).songs)
  }
  if (queries.length) songs.push(...await searchTracks(queries))
  return songs
}

export function resetSpotifyWebSession(): void {
  session = null
}
