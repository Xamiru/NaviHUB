import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  anilistBannerResults,
  danbooruPostsUrl,
  parseDanbooru,
  parseFanartTv,
  parseSteamGridDb,
  parseVndbScreenshots,
  pickDanbooruTag,
  searchDanbooru,
  steamArtResults
} from '../src/main/artSources'

// Every Art-tab source is SFW-only, the Wallhaven purity=100 invariant: each
// parser must drop a provider's non-safe items even if the request's own
// filter stopped working.

const http = vi.hoisted(() => ({
  MAX_API_RESPONSE_BYTES: 32 * 1024 * 1024,
  fetchWithRetry: vi.fn()
}))
vi.mock('../src/main/http', () => http)
vi.mock('../src/main/repos/settingsRepo', () => ({ get: () => null }))

const ok = (body: unknown) => ({ ok: true, status: 200, json: async () => body })

beforeEach(() => vi.clearAllMocks())

describe('Danbooru', () => {
  it('always asks for the general rating', () => {
    const url = new URL(danbooruPostsUrl('steins;gate', 2))
    expect(url.searchParams.get('tags')).toBe('steins;gate rating:g order:score')
    expect(url.searchParams.get('page')).toBe('2')
  })

  it('keeps only general-rated still images', () => {
    const post = (over: Record<string, unknown>) => ({
      id: 1,
      rating: 'g',
      file_ext: 'jpg',
      file_url: 'https://cdn.donmai.us/original/a.jpg',
      image_width: 1600,
      image_height: 900,
      media_asset: { variants: [{ type: '360x360', url: 'https://cdn.donmai.us/360x360/a.jpg' }] },
      ...over
    })
    const results = parseDanbooru([
      post({}),
      post({ id: 2, rating: 's' }),
      post({ id: 3, rating: 'e' }),
      post({ id: 4, file_ext: 'mp4' }),
      post({ id: 5, file_url: undefined }),
      post({ id: 6, is_banned: true })
    ])
    expect(results).toEqual([
      {
        source: 'danbooru',
        id: '1',
        thumbUrl: 'https://cdn.donmai.us/360x360/a.jpg',
        fullUrl: 'https://cdn.donmai.us/original/a.jpg',
        width: 1600,
        height: 900
      }
    ])
  })

  it('resolves text to a copyright or character tag only', () => {
    expect(
      pickDanbooruTag([
        { value: 'long_hair', category: 0 },
        { value: 'nhk_ni_youkoso!', category: 3 }
      ])
    ).toBe('nhk_ni_youkoso!')
    expect(pickDanbooruTag([{ value: 'some_artist', category: 1 }])).toBeNull()
  })

  it('searches the resolved tag and reports it', async () => {
    http.fetchWithRetry
      .mockResolvedValueOnce(ok([{ value: 'makise_kurisu', category: 4 }]))
      .mockResolvedValueOnce(ok([]))
    const page = await searchDanbooru('Kurisu Makise', 1)
    expect(page.resolved).toBe('makise_kurisu')
    const postsUrl = new URL(http.fetchWithRetry.mock.calls[1][0])
    expect(postsUrl.searchParams.get('tags')).toBe('makise_kurisu rating:g order:score')
  })

  it('hands thumbnails over inline, since the CDN refuses cross-site <img> requests', async () => {
    const post = {
      id: 7,
      rating: 'g',
      file_ext: 'png',
      file_url: 'https://cdn.donmai.us/original/b.png',
      media_asset: { variants: [{ type: '360x360', url: 'https://cdn.donmai.us/360x360/b.jpg' }] }
    }
    http.fetchWithRetry
      .mockResolvedValueOnce(ok([{ value: 'steins;gate', category: 3 }]))
      .mockResolvedValueOnce(ok([post]))
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'image/jpeg' }),
        arrayBuffer: async () => new TextEncoder().encode('jpg').buffer
      })
    const page = await searchDanbooru('Steins;Gate', 1)
    expect(page.results[0].thumbUrl).toBe(`data:image/jpeg;base64,${btoa('jpg')}`)
    expect(page.results[0].fullUrl).toBe('https://cdn.donmai.us/original/b.png')
    expect(http.fetchWithRetry.mock.calls[2][1].headers['User-Agent']).toMatch(/^NaviHUB/)
  })

  it('explains an unknown title instead of searching everything', async () => {
    http.fetchWithRetry.mockResolvedValueOnce(ok([]))
    await expect(searchDanbooru('Nothing Like This', 1)).rejects.toThrow(/No Danbooru tag/)
    expect(http.fetchWithRetry).toHaveBeenCalledTimes(1)
  })
})

describe('VNDB screenshots', () => {
  it('keeps only screenshots VNDB rates safe', () => {
    const shot = (url: string, sexual: number) => ({
      url,
      thumbnail: `${url}.t`,
      dims: [1280, 720],
      sexual
    })
    const results = parseVndbScreenshots({
      results: [
        {
          screenshots: [
            shot('https://t.vndb.org/sf/23/8523.jpg', 0),
            shot('https://t.vndb.org/sf/24/8524.jpg', 0.6),
            shot('https://t.vndb.org/sf/25/8525.jpg', 2)
          ]
        }
      ]
    })
    expect(results.map((r) => r.id)).toEqual(['8523'])
    expect(results[0]).toMatchObject({ width: 1280, height: 720 })
  })
})

describe('AniList banner', () => {
  it('skips adult entries and missing banners', () => {
    expect(anilistBannerResults('1', { bannerImage: 'https://s4.anilist.co/b.jpg' })).toHaveLength(1)
    expect(anilistBannerResults('1', { bannerImage: 'https://s4.anilist.co/b.jpg', isAdult: true })).toEqual([])
    expect(anilistBannerResults('1', { bannerImage: null })).toEqual([])
  })
})

describe('Steam art', () => {
  const details = (over: Record<string, unknown> = {}) => ({
    // appdetails can answer under an edition's key, not the requested id.
    '2855530': {
      success: true,
      data: {
        steam_appid: 1245620,
        background_raw: 'https://cdn/bg.jpg',
        screenshots: [{ id: 0, path_thumbnail: 'https://cdn/ss.600x338.jpg', path_full: 'https://cdn/ss.1920x1080.jpg?t=1' }],
        ...over
      }
    }
  })

  it('reads the single entry and returns hero, background and screenshots', () => {
    const results = steamArtResults(1245620, details())
    expect(results.map((r) => r.id)).toEqual(['1245620-hero', '1245620-background', '1245620-ss-0'])
    expect(results[2]).toMatchObject({ width: 1920, height: 1080 })
  })

  it('refuses games Steam marks as sexual content', () => {
    expect(() => steamArtResults(1245620, details({ content_descriptors: { ids: [2, 5] } }))).not.toThrow()
    expect(() => steamArtResults(1245620, details({ content_descriptors: { ids: [3] } }))).toThrow(/adult/)
    expect(() => steamArtResults(1245620, details({ content_descriptors: { ids: [4] } }))).toThrow(/adult/)
  })
})

describe('keyed sources', () => {
  it('fanart.tv returns backgrounds and thumbs with preview thumbnails', () => {
    const results = parseFanartTv(
      {
        moviebackground: [{ id: '9', url: 'https://assets.fanart.tv/fanart/movies/550/moviebackground/a.jpg' }],
        moviethumb: [{ id: '10', url: 'https://assets.fanart.tv/fanart/movies/550/moviethumb/b.jpg' }],
        movieposter: [{ id: '11', url: 'https://assets.fanart.tv/fanart/movies/550/movieposter/c.jpg' }]
      },
      'movie'
    )
    expect(results.map((r) => r.id)).toEqual(['9', '10'])
    expect(results[0].thumbUrl).toBe('https://assets.fanart.tv/preview/movies/550/moviebackground/a.jpg')
  })

  it('SteamGridDB drops anything flagged nsfw', () => {
    const results = parseSteamGridDb({
      data: [
        { id: 1, url: 'https://cdn/h1.png', thumb: 'https://cdn/t1.png', width: 1920, height: 620, nsfw: false },
        { id: 2, url: 'https://cdn/h2.png', nsfw: true },
        { id: 3, url: 'https://cdn/h3.png' }
      ]
    })
    expect(results.map((r) => r.id)).toEqual(['1'])
  })
})
