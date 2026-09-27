/**
 * Pure half of the keyless Spotify reader (IO lives in spotifyWeb.ts).
 *
 * Spotify's February/March 2026 Web API changes removed other users' playlist
 * contents from development-mode apps, which broke spotDL's shared-client
 * metadata path. The public embed page still carries an anonymous web-player
 * token, and that token reads the same persisted GraphQL ("pathfinder")
 * queries the web player uses. Everything here maps those payloads onto the
 * spotDL song objects the rest of the music pipeline already stores.
 */

export type SpotdlRawSong = Record<string, unknown>

export interface EmbedSession {
  accessToken: string
  expiresAt: number
}

export const PATHFINDER_URL = 'https://api-partner.spotify.com/pathfinder/v2/query'

/** Known persisted-query hashes; spotifyWeb.ts rediscovers them when Spotify rotates one. */
export const DEFAULT_QUERY_HASHES: Record<string, string> = {
  fetchPlaylist: '243c0ba2736f16da721e3a227004bbcdb8df6c846f198bd478172e00aa1faf42',
  getAlbum: '6a74b456cd1735c9193d9e8ec8cc5184cad7ce13572210315229db3975964361',
  searchSuggestions: 'b50ebd72524415b132ddaca04158fd7aca529da28be322c9924643c0633df5bd',
  queryArtistDiscographyAll: '5e07d323febb57b4a56a42abbf781490e58764aa45feb6e3dc0591564fc56599'
}

/** Operations that live in a lazily loaded web-player route chunk. */
export const QUERY_ROUTE_CHUNKS: Record<string, string> = {
  queryArtistDiscographyAll: 'xpui-routes-artist'
}

export function parseEmbedSession(html: string, now = Date.now()): EmbedSession {
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/)
  if (!match) throw new Error('Spotify changed its public player page; NaviHUB could not read it')
  let session: { accessToken?: unknown; accessTokenExpirationTimestampMs?: unknown } | undefined
  try {
    session = JSON.parse(match[1])?.props?.pageProps?.state?.settings?.session
  } catch {
    throw new Error('Spotify returned an unreadable public player page')
  }
  if (typeof session?.accessToken !== 'string' || !session.accessToken) {
    throw new Error('Spotify did not issue an anonymous player session')
  }
  const expires = Number(session.accessTokenExpirationTimestampMs)
  return {
    accessToken: session.accessToken,
    // Refresh a minute early so a long paged read never uses a token that expires mid-request.
    expiresAt: (Number.isFinite(expires) && expires > now ? expires : now + 30 * 60_000) - 60_000
  }
}

export function extractQueryHashes(js: string): Map<string, string> {
  const hashes = new Map<string, string>()
  for (const match of js.matchAll(/"([A-Za-z][\w]*)","query","([0-9a-f]{64})"/g)) hashes.set(match[1], match[2])
  return hashes
}

export function extractWebPlayerBundle(html: string): string | null {
  return html.match(/https:\/\/open\.spotifycdn\.com\/cdn\/build\/web-player\/web-player\.[0-9a-f]+\.js/)?.[0] ?? null
}

/** Candidate URLs of one route chunk: webpack maps its id to a name and to one or more content hashes. */
export function routeChunkUrls(bundle: string, bundleUrl: string, route: string): string[] {
  const escaped = route.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
  const id = bundle.match(new RegExp(`(\\d+):"${escaped}"`))?.[1]
  if (!id) return []
  const base = bundleUrl.slice(0, bundleUrl.lastIndexOf('/') + 1)
  return [...new Set([...bundle.matchAll(new RegExp(`(?:^|[^\\d])${id}:"([0-9a-f]{8})"`, 'g'))].map((m) => m[1]))]
    .map((hash) => `${base}${route}.${hash}.js`)
}

export function pathfinderErrorMessage(body: unknown): string | null {
  const errors = (body as { errors?: { message?: unknown }[] } | null)?.errors
  if (!Array.isArray(errors) || !errors.length) return null
  return errors.map((error) => String(error?.message ?? 'Unknown error')).join('; ')
}

type Json = Record<string, any>

const idFromUri = (uri: unknown): string | null =>
  typeof uri === 'string' ? uri.split(':').at(-1) || null : null

function names(items: unknown): { name: string; id: string | null }[] {
  if (!Array.isArray(items)) return []
  return items.flatMap((item: Json) => {
    const name = item?.profile?.name ?? item?.name
    return typeof name === 'string' && name.trim() ? [{ name: name.trim(), id: idFromUri(item.uri) ?? item.id ?? null }] : []
  })
}

function largestImage(sources: unknown): string | null {
  if (!Array.isArray(sources)) return null
  const sorted = sources
    .filter((source: Json) => typeof source?.url === 'string')
    .sort((a: Json, b: Json) => Number(b.width ?? b.maxWidth ?? 0) - Number(a.width ?? a.maxWidth ?? 0))
  return sorted[0]?.url ?? null
}

function albumType(value: unknown): 'album' | 'single' | 'compilation' | null {
  const type = String(value ?? '').toLowerCase()
  if (type === 'album' || type === 'compilation') return type
  // The Web API reports EPs as singles; keep that vocabulary for stored snapshots.
  return type === 'single' || type === 'ep' ? 'single' : null
}

interface AlbumContext {
  name: string
  id: string | null
  artists: { name: string; id: string | null }[]
  type: 'album' | 'single' | 'compilation' | null
  date: string | null
  coverUrl: string | null
  trackCount: number | null
}

function albumContext(album: Json | null | undefined): AlbumContext {
  const iso = typeof album?.date?.isoString === 'string' ? album.date.isoString : null
  const precision = String(album?.date?.precision ?? 'DAY')
  const date = iso
    ? precision === 'YEAR' ? iso.slice(0, 4) : precision === 'MONTH' ? iso.slice(0, 7) : iso.slice(0, 10)
    : null
  return {
    name: typeof album?.name === 'string' ? album.name.trim() : '',
    id: idFromUri(album?.uri) ?? (typeof album?.id === 'string' ? album.id : null),
    artists: names(album?.artists?.items),
    type: albumType(album?.type),
    date,
    coverUrl: largestImage(album?.coverArt?.sources),
    trackCount: typeof album?.tracksV2?.totalCount === 'number' ? album.tracksV2.totalCount : null
  }
}

/** One spotDL-compatible song object, the shape `raw_json` has always stored. */
export function spotdlSong(track: Json, album: AlbumContext, list?: { name: string; url: string; position: number; length: number }): SpotdlRawSong {
  const id = idFromUri(track.uri)
  const artists = names(track.artists?.items)
  const milliseconds = Number(track.trackDuration?.totalMilliseconds ?? track.duration?.totalMilliseconds)
  const year = album.date ? Number(album.date.slice(0, 4)) : null
  return {
    name: typeof track.name === 'string' ? track.name.trim() : '',
    artists: artists.map((artist) => artist.name),
    artist: artists[0]?.name ?? '',
    artist_id: artists[0]?.id ?? null,
    artist_ids: artists.map((artist) => artist.id),
    album_name: album.name,
    album_artist: album.artists[0]?.name ?? null,
    album_id: album.id,
    album_type: album.type,
    duration: Number.isFinite(milliseconds) && milliseconds > 0 ? milliseconds / 1000 : null,
    year: Number.isFinite(year) ? year : null,
    date: album.date,
    disc_number: typeof track.discNumber === 'number' ? track.discNumber : null,
    track_number: typeof track.trackNumber === 'number' ? track.trackNumber : null,
    tracks_count: album.trackCount,
    song_id: id,
    url: id ? `https://open.spotify.com/track/${id}` : '',
    cover_url: album.coverUrl,
    explicit: track.contentRating?.label === 'EXPLICIT',
    ...(list ? { list_name: list.name, list_url: list.url, list_position: list.position, list_length: list.length } : {})
  }
}

export interface PlaylistPage {
  title: string
  total: number
  songs: SpotdlRawSong[]
  /** Items the page carried, including local files and episodes that map to unavailable rows. */
  received: number
}

export function parsePlaylistPage(body: unknown, playlistId: string, offset: number, knownTitle?: string): PlaylistPage {
  const playlist = (body as Json)?.data?.playlistV2
  if (!playlist || playlist.__typename !== 'Playlist') {
    throw new Error('That playlist is private, deleted or unavailable in your region')
  }
  const content = playlist.content
  const total = Number(content?.totalCount)
  if (!Array.isArray(content?.items) || !Number.isInteger(total)) {
    throw new Error('Spotify returned an incomplete playlist page')
  }
  const title = knownTitle ?? (typeof playlist.name === 'string' && playlist.name.trim() ? playlist.name.trim() : 'Spotify playlist')
  const url = `https://open.spotify.com/playlist/${playlistId}`
  const songs = content.items.map((item: Json, index: number): SpotdlRawSong => {
    const list = { name: title, url, position: offset + index + 1, length: total }
    const data = item?.itemV2?.data
    if (data?.__typename !== 'Track') {
      // Local files, podcast episodes and removed tracks keep their position but are not importable.
      return { is_unavailable: true, is_local: data?.__typename === 'LocalTrack', type: data?.__typename === 'Episode' ? 'episode' : undefined,
        list_name: title, list_url: url, list_position: list.position, list_length: total }
    }
    return spotdlSong(data, albumContext(data.albumOfTrack), list)
  })
  return { title, total, songs, received: content.items.length }
}

export interface AlbumPage {
  title: string
  total: number
  songs: SpotdlRawSong[]
  received: number
}

export function parseAlbumPage(body: unknown): AlbumPage {
  const album = (body as Json)?.data?.albumUnion
  if (!album || album.__typename !== 'Album') throw new Error('That album is unavailable')
  const context = albumContext(album)
  const tracks = album.tracksV2
  if (!Array.isArray(tracks?.items) || !Number.isInteger(tracks.totalCount)) {
    throw new Error('Spotify returned an incomplete album page')
  }
  const songs = tracks.items.flatMap((item: Json) => item?.track ? [spotdlSong(item.track, context)] : [])
  return { title: context.name, total: tracks.totalCount, songs, received: tracks.items.length }
}

/** The best track hit for a free-text query, mirroring `spotdl save "<query>"`'s single result. */
export function parseSearchTopTrack(body: unknown): SpotdlRawSong | null {
  const hits = (body as Json)?.data?.searchV2?.topResultsV2?.itemsV2
  if (!Array.isArray(hits)) return null
  for (const hit of hits) {
    if (hit?.item?.__typename !== 'TrackResponseWrapper') continue
    const track = hit.item.data
    if (track?.__typename !== 'Track') continue
    return spotdlSong(track, albumContext(track.albumOfTrack))
  }
  return null
}

export interface ArtistRelease {
  id: string
  name: string
  type: 'album' | 'single' | 'compilation' | null
}

export function parseArtistReleases(body: unknown): { total: number; releases: ArtistRelease[] } {
  const all = (body as Json)?.data?.artistUnion?.discography?.all
  if (!all || !Array.isArray(all.items)) throw new Error('That artist is unavailable')
  const releases = all.items.flatMap((group: Json) => (group?.releases?.items ?? []).flatMap((release: Json) =>
    typeof release?.id === 'string' ? [{ id: release.id, name: String(release.name ?? ''), type: albumType(release.type) }] : []))
  return { total: Number(all.totalCount) || releases.length, releases }
}

export interface SpotifyAlbumHit {
  id: string
  name: string
  artists: string[]
  type: 'album' | 'single' | 'compilation' | null
}

export function parseSearchAlbums(body: unknown): SpotifyAlbumHit[] {
  const hits = (body as Json)?.data?.searchV2?.topResultsV2?.itemsV2
  if (!Array.isArray(hits)) return []
  return hits.flatMap((hit: Json): SpotifyAlbumHit[] => {
    const album = hit?.item?.data
    const id = idFromUri(album?.uri)
    if (hit?.item?.__typename !== 'AlbumResponseWrapper' || !id || typeof album.name !== 'string') return []
    return [{ id, name: album.name, artists: names(album.artists?.items).map((artist) => artist.name), type: albumType(album.type) }]
  })
}
