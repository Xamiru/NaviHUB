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
  fetchWithRetry: async (url: string) => {
    const hit = Object.entries(responses).find(([k]) => url.includes(k))
    return {
      ok: hit != null,
      json: async () => hit?.[1] ?? {}
    }
  }
}))

import {
  normalizeForMatch,
  pickBestAlbumMatch,
  pickBestArtistMatch,
  fetchAlbumArt,
  fetchArtistImage,
  clearAlbumArt,
  fetchMissingArt
} from '../src/main/musicArt'

beforeEach(() => {
  db = createTestDb()
  responses = {}
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
  it('casefolds, strips diacritics/punctuation and edition suffixes', () => {
    expect(normalizeForMatch('OK Computer (Deluxe Edition)')).toBe('ok computer')
    expect(normalizeForMatch('Amnesiac [2001 Remaster]')).toBe('amnesiac')
    expect(normalizeForMatch('Sigur Rós')).toBe('sigur ros')
    expect(normalizeForMatch("What's Going On?")).toBe('what s going on')
  })
})

describe('pickBestAlbumMatch', () => {
  const want = { artist: 'Radiohead', album: 'OK Computer' }
  it('accepts an exact match and deluxe variants', () => {
    expect(
      pickBestAlbumMatch(
        [{ artist: 'Radiohead', album: 'OK Computer (Deluxe)', coverUrl: 'u1' }],
        want.artist,
        want.album
      )
    ).toEqual({ coverUrl: 'u1' })
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

describe('fetchAlbumArt', () => {
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

  it('fetchMissingArt skips already-checked rows and counts updates', async () => {
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
    // one unchecked album + one unchecked artist; the checked album is skipped
    expect(status).toMatchObject({ running: false, done: 2, total: 2, updated: 2 })
    const cover = db.prepare('SELECT cover_path FROM music_album WHERE id = ?').get(a) as {
      cover_path: string | null
    }
    expect(cover.cover_path).toBe('media/dl-fake.jpg')
    const artist = db.prepare('SELECT cover_path FROM music_artist LIMIT 1').get() as {
      cover_path: string | null
    }
    expect(artist.cover_path).toBe('media/dl-fake.jpg')
  })
})

describe('fetchArtistImage', () => {
  it('stores an exact-match Deezer artist photo', async () => {
    seedAlbum()
    const artistId = (db.prepare('SELECT id FROM music_artist LIMIT 1').get() as { id: number }).id
    responses['api.deezer.com/search/artist'] = {
      data: [{ name: 'Radiohead', picture_xl: 'https://deezer/artist.jpg' }]
    }
    const res = await fetchArtistImage(artistId)
    expect(res).toMatchObject({ updated: true, reason: 'ok' })
  })
})
