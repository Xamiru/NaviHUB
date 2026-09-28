import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../src/main/http', () => ({
  MAX_API_RESPONSE_BYTES: 32 * 1024 * 1024,
  fetchWithRetry: vi.fn()
}))

import { fetchWithRetry } from '../src/main/http'
import { validateSpotdlPayload } from '../src/main/musicSpotifyCore'
import {
  extractQueryHashes,
  parseAlbumPage,
  parseEmbedSession,
  parsePlaylistPage,
  parseSearchArtists,
  parseSearchTopTrack,
  routeChunkUrls
} from '../src/main/spotifyWebCore'
import { readAlbum, readPlaylist, resetSpotifyWebSession, saveSongs } from '../src/main/spotifyWeb'

const embed = (token: string) =>
  `<script id="__NEXT_DATA__" type="application/json">${JSON.stringify({
    props: { pageProps: { state: { settings: { session: { accessToken: token, accessTokenExpirationTimestampMs: Date.now() + 3_600_000 } } } } }
  })}</script>`

const track = (n: number) => ({
  __typename: 'Track',
  uri: `spotify:track:track${n}`,
  name: `Song ${n}`,
  artists: { items: [{ profile: { name: 'Artist' }, uri: 'spotify:artist:artist1' }, { profile: { name: 'Guest' }, uri: 'spotify:artist:artist2' }] },
  albumOfTrack: {
    uri: 'spotify:album:album1',
    name: 'Album',
    artists: { items: [{ profile: { name: 'Artist' }, uri: 'spotify:artist:artist1' }] },
    coverArt: { sources: [{ url: 'small.jpg', width: 64 }, { url: 'large.jpg', width: 640 }] },
    date: { isoString: '2001-05-04T00:00:00Z', precision: 'DAY' }
  },
  trackDuration: { totalMilliseconds: 200_500 },
  discNumber: 1,
  trackNumber: n,
  contentRating: { label: 'NONE' }
})

const playlistPage = (offset: number, total: number, count: number) => ({
  data: {
    playlistV2: {
      __typename: 'Playlist',
      name: 'Road Trip',
      content: {
        totalCount: total,
        items: Array.from({ length: count }, (_, index) => ({ itemV2: { data: track(offset + index + 1) } }))
      }
    }
  }
})

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })

describe('Spotify web payload mapping', () => {
  it('reads the anonymous player session and persisted query hashes', () => {
    expect(parseEmbedSession(embed('token-a')).accessToken).toBe('token-a')
    expect(() => parseEmbedSession('<html></html>')).toThrow(/changed its public player page/)
    const bundle = 'x,"fetchPlaylist","query","' + 'a'.repeat(64) + '",y,7161:"xpui-routes-artist",7161:"2d9406e0"'
    expect(extractQueryHashes(bundle).get('fetchPlaylist')).toBe('a'.repeat(64))
    expect(routeChunkUrls(bundle, 'https://cdn/web-player/web-player.1.js', 'xpui-routes-artist'))
      .toEqual(['https://cdn/web-player/xpui-routes-artist.2d9406e0.js'])
  })

  it('maps playlist tracks to the stored song shape and keeps unimportable positions', () => {
    const body = playlistPage(0, 3, 2)
    body.data.playlistV2.content.items.push({ itemV2: { data: { __typename: 'LocalTrack' } } } as never)
    const page = parsePlaylistPage(body, 'list1', 0)
    expect(page).toMatchObject({ title: 'Road Trip', total: 3, received: 3 })
    expect(page.songs[0]).toMatchObject({
      name: 'Song 1', artists: ['Artist', 'Guest'], artist_ids: ['artist1', 'artist2'], album_name: 'Album',
      album_artist: 'Artist', album_id: 'album1', duration: 200.5, year: 2001, date: '2001-05-04',
      disc_number: 1, track_number: 1, song_id: 'track1', cover_url: 'large.jpg',
      list_name: 'Road Trip', list_position: 1, list_length: 3
    })
    const validated = validateSpotdlPayload(page.songs)
    expect(validated.songs.map((song) => song.spotifyTrackId)).toEqual(['track1', 'track2'])
    expect(validated.skipped).toBe(1)
    expect(() => parsePlaylistPage({ data: { playlistV2: { __typename: 'NotFound' } } }, 'x', 0)).toThrow(/private, deleted/)
  })

  it('maps album pages and search hits', () => {
    const album = parseAlbumPage({ data: { albumUnion: {
      __typename: 'Album', uri: 'spotify:album:album1', name: 'Album', type: 'EP',
      artists: { items: [{ profile: { name: 'Artist' }, uri: 'spotify:artist:artist1' }] },
      date: { isoString: '2001-01-01T00:00:00Z', precision: 'YEAR' },
      tracksV2: { totalCount: 1, items: [{ track: { ...track(1), albumOfTrack: undefined, trackDuration: undefined, duration: { totalMilliseconds: 1000 } } }] }
    } } })
    expect(album.songs[0]).toMatchObject({ album_type: 'single', album_name: 'Album', date: '2001', duration: 1 })
    const hit = parseSearchTopTrack({ data: { searchV2: { topResultsV2: { itemsV2: [
      { item: { __typename: 'SearchAutoCompleteEntity', data: {} } },
      { item: { __typename: 'TrackResponseWrapper', data: track(7) } }
    ] } } } })
    expect(hit).toMatchObject({ name: 'Song 7', song_id: 'track7' })
    expect(parseSearchArtists({ data: { searchV2: { topResultsV2: { itemsV2: [
      { item: { __typename: 'TrackResponseWrapper', data: track(7) } },
      { item: { __typename: 'ArtistResponseWrapper', data: {
        uri: 'spotify:artist:rh', profile: { name: 'Radiohead' },
        visuals: { avatarImage: { sources: [{ url: 'a640.jpg', width: 640 }, { url: 'a160.jpg', width: 160 }] } }
      } } },
      { item: { __typename: 'ArtistResponseWrapper', data: { uri: 'spotify:artist:bare', profile: { name: 'Bare' } } } }
    ] } } } })).toEqual([
      { id: 'rh', name: 'Radiohead', imageUrl: 'a640.jpg' },
      { id: 'bare', name: 'Bare', imageUrl: null }
    ])
  })
})

describe('Spotify web reader', () => {
  beforeEach(() => {
    resetSpotifyWebSession()
    vi.mocked(fetchWithRetry).mockReset()
  })

  it('pages a large playlist, refreshes an expired token and rediscovers a rotated query', async () => {
    let tokens = 0
    let hashChecks = 0
    const hash = 'b'.repeat(64)
    vi.mocked(fetchWithRetry).mockImplementation(async (url, init) => {
      const target = String(url)
      if (target.includes('/embed/')) return new Response(embed(`token-${++tokens}`))
      if (target === 'https://open.spotify.com/') return new Response('<script src="https://open.spotifycdn.com/cdn/build/web-player/web-player.abc123.js">')
      if (target.endsWith('web-player.abc123.js')) return new Response(`"fetchPlaylist","query","${hash}"`)
      const body = JSON.parse(String(init?.body))
      const auth = (init?.headers as Record<string, string>).authorization
      if (body.extensions.persistedQuery.sha256Hash !== hash) { hashChecks++; return json('Invalid query hash', 412) }
      if (auth === 'Bearer token-1') return json({ error: 'expired' }, 401)
      const offset = body.variables.offset
      return json(playlistPage(offset, 150, offset === 0 ? 100 : 50))
    })
    const progress: number[] = []
    const result = await readPlaylist('list1', (done) => progress.push(done))
    expect(result.total).toBe(150)
    expect(result.songs).toHaveLength(150)
    expect(result.songs.at(-1)).toMatchObject({ list_position: 150, song_id: 'track150' })
    expect(progress).toEqual([100, 150])
    expect(tokens).toBe(2)
    expect(hashChecks).toBe(1)
  })

  it('refuses a playlist that changes size while it is being read', async () => {
    let calls = 0
    vi.mocked(fetchWithRetry).mockImplementation(async (url) => {
      if (String(url).includes('/embed/')) return new Response(embed('token'))
      calls++
      return json(playlistPage(calls === 1 ? 0 : 100, calls === 1 ? 150 : 151, calls === 1 ? 100 : 51))
    })
    await expect(readPlaylist('list1')).rejects.toThrow(/changed while NaviHUB was reading it/)
  })

  it('pages an album by returned items when some have no track data', async () => {
    const offsets: number[] = []
    vi.mocked(fetchWithRetry).mockImplementation(async (url, init) => {
      if (String(url).includes('/embed/')) return new Response(embed('token'))
      const { offset } = JSON.parse(String(init?.body)).variables
      offsets.push(offset)
      const items = Array.from({ length: Math.min(50, 60 - offset) }, (_, index) => {
        const n = offset + index + 1
        return n === 50 || n === 60 ? {} : { track: track(n) }
      })
      return json({ data: { albumUnion: {
        __typename: 'Album', uri: 'spotify:album:album1', name: 'Album', type: 'ALBUM',
        artists: { items: [{ profile: { name: 'Artist' }, uri: 'spotify:artist:artist1' }] },
        date: { isoString: '2001-01-01T00:00:00Z', precision: 'YEAR' },
        tracksV2: { totalCount: 60, items }
      } } })
    })
    const songs = await readAlbum('album1')
    expect(offsets).toEqual([0, 50])
    expect(songs).toHaveLength(58)
    expect(new Set(songs.map((song) => song.song_id)).size).toBe(58)
  })

  it('treats non-link targets as track searches and drops queries without a hit', async () => {
    vi.mocked(fetchWithRetry).mockImplementation(async (url, init) => {
      if (String(url).includes('/embed/')) return new Response(embed('token'))
      const query = JSON.parse(String(init?.body)).variables.query
      const items = query === 'Artist - Song 3' ? [{ item: { __typename: 'TrackResponseWrapper', data: track(3) } }] : []
      return json({ data: { searchV2: { topResultsV2: { itemsV2: items } } } })
    })
    const songs = await saveSongs(['Artist - Song 3', 'Nobody - Nothing'])
    expect(songs.map((song) => song.song_id)).toEqual(['track3'])
  })
})
