import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
// URL-substring -> JSON fixture, set per test (the rawgImport.test.ts shape).
let responses: Record<string, unknown> = {}
const downloadImage = vi.fn(async (url: string | null) => (url ? 'media/dl-fake.jpg' : null))

vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))
vi.mock('../src/main/files', () => ({
  downloadImage: (url: string | null) => downloadImage(url)
}))
vi.mock('../src/main/http', () => ({
  MAX_API_RESPONSE_BYTES: 32 * 1024 * 1024,
  fetchWithRetry: async (url: string) => {
    const hit = Object.entries(responses).find(([k]) => url.includes(k))
    if (hit?.[1] instanceof Error) throw hit[1]
    return {
      ok: hit != null,
      status: hit != null ? 200 : 404,
      json: async () => hit?.[1] ?? {}
    }
  }
}))

import {
  normalizeForMatch,
  escapeMusicBrainzQueryValue,
  musicBrainzCreditName,
  pickBestAlbumMatch,
  pickBestArtistMatch,
  pickMusicBrainzReleaseGroup,
  fetchAlbumArt,
  fetchArtistImage,
  clearAlbumArt,
  fetchMissingArt
} from '../src/main/musicArt'
import { stripAlbumYearPrefix } from '../src/main/repos/musicSpotifyRepo'

beforeEach(() => {
  db = createTestDb()
  responses = {
    'musicbrainz.org/ws/2/release-group': { 'release-groups': [] },
    'en.wikipedia.org/w/api.php': { query: { pages: {} } }
  }
  downloadImage.mockClear()
})

function seedAlbum(artist = 'Radiohead', album = 'OK Computer'): number {
  db.prepare(`INSERT OR IGNORE INTO music_artist (name, dir_path) VALUES (?, ?)`).run(
    artist,
    artist
  )
  const artistId = (
    db.prepare('SELECT id FROM music_artist WHERE dir_path = ?').get(artist) as { id: number }
  ).id
  const info = db
    .prepare(`INSERT INTO music_album (artist_id, title, dir_path) VALUES (?, ?, ?)`)
    .run(artistId, album, `${artist}/${album}`)
  return Number(info.lastInsertRowid)
}

describe('normalizeForMatch', () => {
  it('casefolds and strips diacritics/punctuation without erasing edition identity', () => {
    expect(normalizeForMatch('OK Computer (Deluxe Edition)')).toBe(
      'ok computer deluxe edition'
    )
    expect(normalizeForMatch('Amnesiac [2001 Remaster]')).toBe('amnesiac 2001 remaster')
    expect(normalizeForMatch('Sigur Rós')).toBe('sigur ros')
    expect(normalizeForMatch("What's Going On?")).toBe('what s going on')
  })

  it('removes only a leading folder year while preserving edition markers', () => {
    expect(stripAlbumYearPrefix('(1997) OK Computer')).toBe('OK Computer')
    expect(stripAlbumYearPrefix('[2001] Amnesiac')).toBe('Amnesiac')
    expect(stripAlbumYearPrefix('2007 - In Rainbows')).toBe('In Rainbows')
    expect(stripAlbumYearPrefix('OK Computer (1997 Remaster)')).toBe('OK Computer (1997 Remaster)')
  })
})

describe('MusicBrainz query helpers', () => {
  it('escapes Lucene syntax inside literal artist and album values', () => {
    expect(escapeMusicBrainzQueryValue('AC/DC + "Live" && More')).toBe(
      'AC\\/DC \\+ \\"Live\\" \\&& More'
    )
  })

  it('reconstructs the full credited artist including join phrases', () => {
    expect(
      musicBrainzCreditName([
        { name: 'Jay-Z', joinphrase: ' & ' },
        { artist: { name: 'Kanye West' } }
      ])
    ).toBe('Jay-Z & Kanye West')
  })
})

describe('pickBestAlbumMatch', () => {
  const want = { artist: 'Radiohead', album: 'OK Computer' }
  it('accepts exact normalized identity but rejects a different edition', () => {
    expect(
      pickBestAlbumMatch(
        [{ artist: 'radiohead', album: 'OK Computer!', coverUrl: 'u1' }],
        want.artist,
        want.album
      )
    ).toEqual({ coverUrl: 'u1' })
    expect(
      pickBestAlbumMatch(
        [{ artist: 'Radiohead', album: 'OK Computer (Deluxe)', coverUrl: 'u1' }],
        want.artist,
        want.album
      )
    ).toBeNull()
  })
  it('rejects a different artist even when the album matches', () => {
    expect(
      pickBestAlbumMatch(
        [{ artist: 'Someone Else', album: 'OK Computer', coverUrl: 'u1' }],
        want.artist,
        want.album
      )
    ).toBeNull()
  })
  it('rejects artist substrings and ambiguous exact results', () => {
    expect(
      pickBestAlbumMatch(
        [{ artist: 'Queens of the Stone Age', album: 'Hits', coverUrl: 'wrong' }],
        'Queen',
        'Hits'
      )
    ).toBeNull()
    expect(
      pickBestAlbumMatch(
        [
          { artist: 'Radiohead', album: 'OK Computer', coverUrl: 'u1' },
          { artist: 'radiohead', album: 'OK Computer!', coverUrl: 'u2' }
        ],
        want.artist,
        want.album
      )
    ).toBeNull()
  })
  it('skips candidates without a cover url', () => {
    expect(
      pickBestAlbumMatch(
        [
          { artist: 'Radiohead', album: 'OK Computer', coverUrl: null },
          { artist: 'Radiohead', album: 'OK Computer', coverUrl: 'u2' }
        ],
        want.artist,
        want.album
      )
    ).toEqual({ coverUrl: 'u2' })
  })
})

describe('pickBestArtistMatch', () => {
  it('requires normalized name equality', () => {
    expect(
      pickBestArtistMatch([{ name: 'Radiohead Tribute Band', pictureUrl: 'u' }], 'Radiohead')
    ).toBeNull()
    expect(pickBestArtistMatch([{ name: 'radiohead', pictureUrl: 'u' }], 'Radiohead')).toEqual({
      pictureUrl: 'u'
    })
  })
})

describe('pickMusicBrainzReleaseGroup', () => {
  const candidates = [
    { id: 'original', artist: 'Radiohead', album: 'OK Computer', score: 100, year: 1997 },
    { id: 'later', artist: 'Radiohead', album: 'OK Computer', score: 100, year: 2009 }
  ]

  it('uses a known year to resolve otherwise ambiguous exact release groups', () => {
    expect(pickMusicBrainzReleaseGroup(candidates, 'Radiohead', 'OK Computer', 1997)?.id).toBe(
      'original'
    )
  })

  it('rejects ambiguity, partial names, and lower-scored matches', () => {
    expect(pickMusicBrainzReleaseGroup(candidates, 'Radiohead', 'OK Computer', null)).toBeNull()
    expect(
      pickMusicBrainzReleaseGroup(
        [{ id: 'wrong', artist: 'Radiohead Tribute', album: 'OK Computer', score: 100, year: 1997 }],
        'Radiohead',
        'OK Computer',
        1997
      )
    ).toBeNull()
    expect(
      pickMusicBrainzReleaseGroup(
        [{ id: 'weak', artist: 'Radiohead', album: 'OK Computer', score: 99, year: 1997 }],
        'Radiohead',
        'OK Computer',
        1997
      )
    ).toBeNull()
  })
})

describe('fetchAlbumArt', () => {
  it('prefers a 1200px Cover Art Archive front image from an exact release group', async () => {
    const id = seedAlbum()
    responses['musicbrainz.org/ws/2/release-group'] = {
      'release-groups': [
        {
          id: 'mb-release-group',
          title: 'OK Computer',
          score: 100,
          'first-release-date': '1997-05-21',
          'artist-credit': [{ artist: { name: 'Radiohead' } }]
        }
      ]
    }
    responses['coverartarchive.org/release-group/mb-release-group'] = {
      images: [
        {
          front: true,
          image: 'https://archive/original.jpg',
          thumbnails: { '1200': 'https://archive/1200.jpg' }
        }
      ]
    }
    const res = await fetchAlbumArt(id)
    expect(res).toMatchObject({ updated: true, sourceUrl: 'https://archive/1200.jpg' })
    expect(downloadImage).toHaveBeenCalledWith('https://archive/1200.jpg')
  })

  it('uses the remembered Spotify album image before fuzzy provider fallbacks', async () => {
    const id = seedAlbum()
    db.prepare(`UPDATE music_album SET spotify_id = 'spotify-album' WHERE id = ?`).run(id)
    responses['open.spotify.com/oembed'] = { thumbnail_url: 'https://spotify/album.jpg' }
    responses['api.deezer.com/search/album'] = {
      data: [{ title: 'OK Computer', cover_xl: 'https://deezer/img.jpg', artist: { name: 'Radiohead' } }]
    }
    const res = await fetchAlbumArt(id)
    expect(res.sourceUrl).toBe('https://spotify/album.jpg')
  })

  it('stores the Deezer cover with provenance and a checked stamp', async () => {
    const id = seedAlbum()
    responses['api.deezer.com/search/album'] = {
      data: [{ title: 'OK Computer', cover_xl: 'https://deezer/img.jpg', artist: { name: 'Radiohead' } }]
    }
    const res = await fetchAlbumArt(id)
    expect(res).toMatchObject({ updated: true, path: 'media/dl-fake.jpg', reason: 'ok' })
    const row = db.prepare('SELECT * FROM music_album WHERE id = ?').get(id) as Record<
      string,
      unknown
    >
    expect(row.cover_path).toBe('media/dl-fake.jpg')
    expect(row.art_source_url).toBe('https://deezer/img.jpg')
    expect(row.art_checked_at).not.toBeNull()
  })

  it('falls back to iTunes (with the 600x600 upscale) when Deezer misses', async () => {
    const id = seedAlbum()
    responses['api.deezer.com'] = { data: [] }
    responses['itunes.apple.com'] = {
      results: [
        {
          artistName: 'Radiohead',
          collectionName: 'OK Computer',
          artworkUrl100: 'https://itunes/img/100x100bb.jpg'
        }
      ]
    }
    const res = await fetchAlbumArt(id)
    expect(res.updated).toBe(true)
    expect(res.sourceUrl).toBe('https://itunes/img/600x600bb.jpg')
  })

  it('matches canonical provider titles when the album folder starts with a year', async () => {
    const id = seedAlbum('Radiohead', '(1997) OK Computer')
    responses['itunes.apple.com'] = {
      results: [{
        artistName: 'Radiohead',
        collectionName: 'OK Computer',
        artworkUrl100: 'https://itunes/img/100x100bb.jpg'
      }]
    }
    const res = await fetchAlbumArt(id)
    expect(res).toMatchObject({ updated: true, sourceUrl: 'https://itunes/img/600x600bb.jpg' })
  })

  it('records not_found once (checked stamp, no cover) instead of wrong art', async () => {
    const id = seedAlbum('Doujin Circle', 'Ultra Obscure EP')
    responses['api.deezer.com'] = { data: [] }
    responses['itunes.apple.com'] = { results: [] }
    const res = await fetchAlbumArt(id)
    expect(res).toMatchObject({ updated: false, reason: 'not_found' })
    const row = db.prepare('SELECT cover_path, art_checked_at FROM music_album WHERE id = ?').get(id) as Record<
      string,
      unknown
    >
    expect(row.cover_path).toBeNull()
    expect(row.art_checked_at).not.toBeNull()
  })

  it('does not stamp checked when the image download itself fails (retry later)', async () => {
    const id = seedAlbum()
    responses['api.deezer.com/search/album'] = {
      data: [{ title: 'OK Computer', cover_xl: 'https://deezer/img.jpg', artist: { name: 'Radiohead' } }]
    }
    downloadImage.mockResolvedValueOnce(null)
    const res = await fetchAlbumArt(id)
    expect(res.reason).toBe('download_failed')
    const row = db.prepare('SELECT art_checked_at FROM music_album WHERE id = ?').get(id) as Record<
      string,
      unknown
    >
    expect(row.art_checked_at).toBeNull()
  })

  it('does not cache a total provider outage as a permanent miss', async () => {
    const id = seedAlbum()
    responses = {
      'musicbrainz.org': new Error('offline'),
      'api.deezer.com': new Error('offline'),
      'itunes.apple.com': new Error('offline')
    }
    const res = await fetchAlbumArt(id)
    expect(res.reason).toBe('download_failed')
    expect(db.prepare('SELECT art_checked_at FROM music_album WHERE id = ?').get(id)).toEqual({
      art_checked_at: null
    })
  })
})

describe('clear + bulk fetch', () => {
  it('clearAlbumArt resets art columns so the bulk job can retry', async () => {
    const id = seedAlbum()
    db.prepare(
      `UPDATE music_album SET cover_path = 'x', art_source_url = 'y', art_checked_at = 'z' WHERE id = ?`
    ).run(id)
    clearAlbumArt(id)
    const row = db.prepare('SELECT cover_path, art_source_url, art_checked_at FROM music_album WHERE id = ?').get(id)
    expect(row).toEqual({ cover_path: null, art_source_url: null, art_checked_at: null })
  })

  it('fetchMissingArt revisits old misses with upgraded providers and counts updates', async () => {
    const a = seedAlbum('Radiohead', 'OK Computer')
    const b = seedAlbum('Radiohead', 'Kid A')
    db.prepare(`UPDATE music_album SET art_checked_at = datetime('now') WHERE id = ?`).run(b)
    // the artist row also gets a photo attempt — give it a match too
    responses['api.deezer.com/search/album'] = {
      data: [
        { title: 'OK Computer', cover_xl: 'https://deezer/ok.jpg', artist: { name: 'Radiohead' } },
        { title: 'Kid A', cover_xl: 'https://deezer/kid.jpg', artist: { name: 'Radiohead' } }
      ]
    }
    responses['api.deezer.com/search/artist'] = {
      data: [{ name: 'Radiohead', picture_xl: 'https://deezer/artist.jpg' }]
    }
    const status = await fetchMissingArt()
    // Both albums plus the artist are retried; rows with actual art remain excluded.
    expect(status).toMatchObject({
      running: false,
      cancelled: false,
      done: 3,
      total: 3,
      updated: 3,
      missing: 0,
      failed: 0
    })
    const cover = db.prepare('SELECT cover_path FROM music_album WHERE id = ?').get(a) as {
      cover_path: string | null
    }
    expect(cover.cover_path).toBe('media/dl-fake.jpg')
    const artist = db.prepare('SELECT cover_path FROM music_artist LIMIT 1').get() as {
      cover_path: string | null
    }
    expect(artist.cover_path).toBe('media/dl-fake.jpg')
  })

  it('reports confident misses separately from provider failures', async () => {
    seedAlbum('Unknown Artist', 'Unknown Album')
    responses['api.deezer.com'] = { data: [] }
    responses['itunes.apple.com'] = { results: [] }
    let status = await fetchMissingArt()
    expect(status).toMatchObject({ updated: 0, missing: 2, failed: 0 })

    db.prepare(`UPDATE music_album SET art_checked_at = NULL`).run()
    db.prepare(`UPDATE music_artist SET art_checked_at = NULL`).run()
    responses = {
      'musicbrainz.org': new Error('offline'),
      'api.deezer.com': new Error('offline'),
      'itunes.apple.com': new Error('offline')
    }
    status = await fetchMissingArt()
    expect(status).toMatchObject({ updated: 0, missing: 0, failed: 2 })
  })
})

describe('fetchArtistImage', () => {
  it('prefers the exact remembered Spotify artist image', async () => {
    seedAlbum()
    const artistId = (db.prepare('SELECT id FROM music_artist LIMIT 1').get() as { id: number }).id
    db.prepare(`UPDATE music_artist SET spotify_id = 'spotify-artist' WHERE id = ?`).run(artistId)
    responses['open.spotify.com/oembed'] = { thumbnail_url: 'https://spotify/artist.jpg' }
    responses['api.deezer.com/search/artist'] = {
      data: [{ name: 'Radiohead', picture_xl: 'https://deezer/artist.jpg' }]
    }
    const res = await fetchArtistImage(artistId)
    expect(res.sourceUrl).toBe('https://spotify/artist.jpg')
  })

  it('stores an exact-match Deezer artist photo', async () => {
    seedAlbum()
    const artistId = (db.prepare('SELECT id FROM music_artist LIMIT 1').get() as { id: number }).id
    responses['api.deezer.com/search/artist'] = {
      data: [{ name: 'Radiohead', picture_xl: 'https://deezer/artist.jpg' }]
    }
    const res = await fetchArtistImage(artistId)
    expect(res).toMatchObject({ updated: true, reason: 'ok' })
  })

  it('uses an exact non-disambiguation Wikipedia portrait before Deezer', async () => {
    seedAlbum('Adam Levine', 'Singles')
    const artistId = (db.prepare('SELECT id FROM music_artist LIMIT 1').get() as { id: number }).id
    responses['en.wikipedia.org/w/api.php'] = {
      query: {
        pages: {
          '1': { title: 'Adam Levine', original: { source: 'https://wikipedia/adam.jpg' } }
        }
      }
    }
    responses['api.deezer.com/search/artist'] = new Error('offline')
    const res = await fetchArtistImage(artistId)
    expect(res).toMatchObject({ updated: true, sourceUrl: 'https://wikipedia/adam.jpg' })
  })
})
