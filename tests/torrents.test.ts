import { describe, expect, it } from 'vitest'
import {
  applyTorrentFilters,
  EMPTY_TORRENT_FILTER,
  formatBytes,
  indexersForCategories,
  queryTokens,
  relevanceFilter,
  sizeToBytes,
  titleMatchesQuery,
  torrentFilterActiveCount,
  torznabCategoriesFor,
  TORRENT_CATEGORY_OPTIONS
} from '../src/shared/torrents'
import type { MediaType, TorrentFilter, TorrentSearchResult } from '../src/shared/types'

// Shared torrent vocabulary: media-type -> Torznab category mapping and the
// byte formatter used by the results table.

describe('torznabCategoriesFor', () => {
  const ALL: MediaType[] = ['anime', 'manga', 'visual_novel', 'game', 'movie', 'tv']

  it('returns a non-empty category list for every media type', () => {
    for (const t of ALL) expect(torznabCategoriesFor(t).length).toBeGreaterThan(0)
  })

  it('maps types to standard Torznab numbers', () => {
    expect(torznabCategoriesFor('anime')).toEqual([5070])
    expect(torznabCategoriesFor('manga')).toContain(7030)
    expect(torznabCategoriesFor('manga')).toContain(5070)
    expect(torznabCategoriesFor('movie')).toEqual([2000])
    expect(torznabCategoriesFor('tv')).toEqual([5000])
    expect(torznabCategoriesFor('game')).toEqual([4050])
    expect(torznabCategoriesFor('visual_novel')).toEqual([4050])
  })
})

describe('TORRENT_CATEGORY_OPTIONS', () => {
  it('leads with an "everything" option (empty cats = omit the param)', () => {
    expect(TORRENT_CATEGORY_OPTIONS[0].cats).toEqual([])
  })
})

describe('formatBytes', () => {
  it('renders an em dash for missing/nonsense sizes', () => {
    expect(formatBytes(null)).toBe('—')
    expect(formatBytes(0)).toBe('—')
    expect(formatBytes(-5)).toBe('—')
    expect(formatBytes(NaN)).toBe('—')
  })

  it('picks binary units with one decimal', () => {
    expect(formatBytes(512)).toBe('512 B')
    expect(formatBytes(1024)).toBe('1.0 KiB')
    expect(formatBytes(1536)).toBe('1.5 KiB')
    expect(formatBytes(123456789)).toBe('117.7 MiB')
    expect(formatBytes(4 * 1024 ** 3)).toBe('4.0 GiB')
    expect(formatBytes(2.5 * 1024 ** 4)).toBe('2.5 TiB')
  })
})

describe('sizeToBytes', () => {
  it('converts typed sizes, treating blank/garbage as unconstrained', () => {
    expect(sizeToBytes('1.5', 'GiB')).toBe(Math.round(1.5 * 1024 ** 3))
    expect(sizeToBytes('700', 'MiB')).toBe(700 * 1024 ** 2)
    expect(sizeToBytes('1,5', 'GiB')).toBe(Math.round(1.5 * 1024 ** 3)) // comma decimal
    expect(sizeToBytes('', 'GiB')).toBeNull()
    expect(sizeToBytes('  ', 'GiB')).toBeNull()
    expect(sizeToBytes('abc', 'GiB')).toBeNull()
    expect(sizeToBytes('-5', 'GiB')).toBeNull()
  })
})

describe('applyTorrentFilters', () => {
  const row = (over: Partial<TorrentSearchResult>): TorrentSearchResult => ({
    id: String(Math.random()),
    title: 'Some Release 1080p',
    tracker: 'Nyaa.si',
    category: 'TV/Anime',
    sizeBytes: 1024 ** 3,
    seeders: 10,
    peers: 2,
    grabs: 0,
    publishDate: '2026-07-01T00:00:00Z',
    magnetUri: 'magnet:?x',
    link: null,
    detailsUrl: null,
    ...over
  })
  const filter = (over: Partial<TorrentFilter>): TorrentFilter => ({
    ...EMPTY_TORRENT_FILTER,
    ...over
  })

  it('passes everything through an empty filter', () => {
    const rows = [row({}), row({})]
    expect(applyTorrentFilters(rows, EMPTY_TORRENT_FILTER)).toHaveLength(2)
  })

  it('requires every word of the text filter, case-insensitively', () => {
    const rows = [
      row({ title: 'Frieren S01 1080p BluRay' }),
      row({ title: 'Frieren S01 720p WEB' }),
      row({ title: 'Bocchi the Rock 1080p' })
    ]
    expect(applyTorrentFilters(rows, filter({ text: 'frieren 1080p' })).map((r) => r.title)).toEqual([
      'Frieren S01 1080p BluRay'
    ])
  })

  it('drops rows containing any excluded word', () => {
    const rows = [row({ title: 'Show 1080p' }), row({ title: 'Show 1080p HEVC x265' })]
    expect(applyTorrentFilters(rows, filter({ exclude: 'x265' }))).toHaveLength(1)
  })

  it('filters by min seeders, treating unknown as zero', () => {
    const rows = [row({ seeders: 50 }), row({ seeders: 1 }), row({ seeders: null })]
    expect(applyTorrentFilters(rows, filter({ minSeeders: 5 }))).toHaveLength(1)
  })

  it('filters by a size range but keeps rows of unknown size', () => {
    const rows = [
      row({ title: 'small', sizeBytes: 500 * 1024 ** 2 }),
      row({ title: 'mid', sizeBytes: 5 * 1024 ** 3 }),
      row({ title: 'huge', sizeBytes: 60 * 1024 ** 3 }),
      row({ title: 'unknown', sizeBytes: null })
    ]
    const out = applyTorrentFilters(
      rows,
      filter({ minBytes: 1024 ** 3, maxBytes: 20 * 1024 ** 3 })
    ).map((r) => r.title)
    // An unknown size is "unknown", not "zero" — it must not be silently dropped.
    expect(out).toEqual(['mid', 'unknown'])
  })

  it('restricts to the selected trackers', () => {
    const rows = [row({ tracker: 'Nyaa.si' }), row({ tracker: 'AnimeTosho' }), row({ tracker: '1337x' })]
    expect(
      applyTorrentFilters(rows, filter({ trackers: ['Nyaa.si', '1337x'] })).map((r) => r.tracker)
    ).toEqual(['Nyaa.si', '1337x'])
  })

  it('combines every constraint', () => {
    const rows = [
      row({ title: 'Frieren 1080p', tracker: 'Nyaa.si', seeders: 100, sizeBytes: 8 * 1024 ** 3 }),
      row({ title: 'Frieren 1080p', tracker: 'Other', seeders: 100, sizeBytes: 8 * 1024 ** 3 }),
      row({ title: 'Frieren 480p', tracker: 'Nyaa.si', seeders: 100, sizeBytes: 8 * 1024 ** 3 })
    ]
    const out = applyTorrentFilters(
      rows,
      filter({ text: 'frieren 1080p', trackers: ['Nyaa.si'], minSeeders: 10, minBytes: 1024 ** 3 })
    )
    expect(out).toHaveLength(1)
    expect(out[0].tracker).toBe('Nyaa.si')
  })
})

describe('torrentFilterActiveCount', () => {
  it('counts only the constraints actually set', () => {
    expect(torrentFilterActiveCount(EMPTY_TORRENT_FILTER)).toBe(0)
    expect(
      torrentFilterActiveCount({ ...EMPTY_TORRENT_FILTER, text: 'x', minSeeders: 1, trackers: ['a'] })
    ).toBe(3)
    // Whitespace-only text is not a constraint.
    expect(torrentFilterActiveCount({ ...EMPTY_TORRENT_FILTER, text: '   ' })).toBe(0)
  })
})

describe('queryTokens', () => {
  it('lowercases, splits on punctuation, and drops sub-2-char tokens', () => {
    expect(queryTokens('Akagi')).toEqual(['akagi'])
    expect(queryTokens('Mushishi: Zoku Shou')).toEqual(['mushishi', 'zoku', 'shou'])
    expect(queryTokens('K-On! S2')).toEqual(['on', 's2']) // "k" dropped (1 char)
    expect(queryTokens('   ')).toEqual([])
    expect(queryTokens('!!!')).toEqual([])
  })
})

describe('titleMatchesQuery', () => {
  it('matches whole words, not substrings — the akagi/wakagimi fix', () => {
    expect(titleMatchesQuery('Akagi 01 [1080p]', 'akagi')).toBe(true)
    expect(titleMatchesQuery('Nige Jouzu no Wakagimi S2 - 01', 'akagi')).toBe(false)
    expect(titleMatchesQuery('The Elusive Samurai S02E01', 'akagi')).toBe(false)
  })

  it('requires every query word, case-insensitively', () => {
    expect(titleMatchesQuery('Frieren S01 1080p BluRay', 'frieren 1080p')).toBe(true)
    expect(titleMatchesQuery('Frieren S01 720p WEB', 'frieren 1080p')).toBe(false)
  })

  it('is a no-op when the query has no usable tokens (never blanks a page)', () => {
    expect(titleMatchesQuery('anything at all', '')).toBe(true)
    expect(titleMatchesQuery('anything at all', 'a !')).toBe(true)
  })
})

describe('relevanceFilter', () => {
  const row = (title: string): TorrentSearchResult => ({
    id: title,
    title,
    tracker: 'T',
    category: null,
    sizeBytes: null,
    seeders: null,
    peers: null,
    grabs: null,
    publishDate: null,
    magnetUri: 'magnet:?x',
    link: null,
    detailsUrl: null
  })

  it('keeps only whole-word matches', () => {
    const rows = [row('Akagi 01'), row('Nige Jouzu no Wakagimi 01'), row('Akagi The Genius')]
    expect(relevanceFilter(rows, 'akagi').map((r) => r.title)).toEqual(['Akagi 01', 'Akagi The Genius'])
  })

  it('passes everything through for an empty query', () => {
    const rows = [row('a'), row('b')]
    expect(relevanceFilter(rows, '')).toHaveLength(2)
  })
})

describe('indexersForCategories', () => {
  const ix = (id: string, categories: number[]) => ({ id, name: id, categories })
  const anime = ix('nyaasi', [5000, 5070])
  const audio = ix('audiobookbay', [3000])
  const movie = ix('somemovies', [2000])
  const custom = ix('weird', [140679]) // only an indexer-internal id
  const all = [anime, audio, movie, custom]

  it('scopes an anime search to 5xxx indexers (skips audio/movie)', () => {
    const out = indexersForCategories(all, [5070]).map((i) => i.id)
    expect(out).toContain('nyaasi')
    expect(out).not.toContain('audiobookbay')
    expect(out).not.toContain('somemovies')
  })

  it('keeps indexers that advertise no standard categories (unknown coverage)', () => {
    expect(indexersForCategories(all, [5070]).map((i) => i.id)).toContain('weird')
  })

  it('returns everyone when no category is requested (All categories)', () => {
    expect(indexersForCategories(all, [])).toHaveLength(4)
  })

  it('falls back to all indexers when scoping would select nobody', () => {
    // Audio-only pool, but a movie search matches none -> don't search zero.
    expect(indexersForCategories([audio], [2000])).toEqual([audio])
  })
})
