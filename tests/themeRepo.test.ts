import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

import * as themeRepo from '../src/main/repos/themeRepo'
import type { MediaListFilter } from '../src/shared/types'

beforeEach(() => {
  db = createTestDb()
})

const anime = (base: Partial<MediaListFilter> = {}): MediaListFilter => ({
  mediaType: 'anime',
  ...base
})

function addAnime(
  title: string,
  opts: {
    status?: string | null
    score?: number | null
    favorite?: boolean
    releaseDate?: string | null
    metadata?: string | null
  } = {}
): number {
  return Number(
    db
      .prepare(
        `INSERT INTO media_item (media_type, title, status, score, favorite, release_date, metadata)
         VALUES ('anime', ?, ?, ?, ?, ?, ?)`
      )
      .run(
        title,
        opts.status ?? null,
        opts.score ?? null,
        opts.favorite ? 1 : 0,
        opts.releaseDate ?? null,
        opts.metadata ?? null
      ).lastInsertRowid
  )
}

function addTheme(
  mediaId: number,
  opts: {
    slug?: string
    type?: string
    title?: string
    audioUrl?: string | null
    audioPath?: string | null
    favorite?: boolean
    sortOrder?: number
  } = {}
): number {
  return Number(
    db
      .prepare(
        `INSERT INTO theme_song (media_id, slug, type, title, audio_url, audio_path, favorite, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        mediaId,
        opts.slug ?? 'OP1',
        opts.type ?? 'OP',
        opts.title ?? 'Song',
        // `??` would swallow an explicit null — the unplayable-song cases pass one.
        'audioUrl' in opts ? opts.audioUrl : 'https://x/a.ogg',
        opts.audioPath ?? null,
        opts.favorite ? 1 : 0,
        opts.sortOrder ?? 0
      ).lastInsertRowid
  )
}

function addArtist(themeSongId: number, name: string): number {
  const personId = Number(
    db.prepare('INSERT INTO person (name) VALUES (?)').run(name).lastInsertRowid
  )
  db.prepare('INSERT INTO theme_artist (theme_song_id, person_id, sort_order) VALUES (?, ?, 0)').run(
    themeSongId,
    personId
  )
  return personId
}

describe('themeRepo.list', () => {
  it('only returns playable anime themes, with their artists', () => {
    const a = addAnime('Bebop')
    const t = addTheme(a, { title: 'Tank!' })
    addArtist(t, 'The Seatbelts')
    addTheme(a, { title: 'No audio', audioUrl: null, audioPath: null }) // excluded
    const movie = Number(
      db.prepare(`INSERT INTO media_item (media_type, title) VALUES ('movie', 'M')`).run()
        .lastInsertRowid
    )
    addTheme(movie, { title: 'Not anime' }) // excluded: wrong media type

    const songs = themeRepo.list({ media: anime() })
    expect(songs).toHaveLength(1)
    expect(songs[0].title).toBe('Tank!')
    expect(songs[0].animeTitle).toBe('Bebop')
    expect(songs[0].artists.map((x) => x.name)).toEqual(['The Seatbelts'])
  })

  it('keeps unplayable songs when playableOnly is switched off', () => {
    const a = addAnime('Bebop')
    addTheme(a, { title: 'No audio', audioUrl: null, audioPath: null })
    expect(themeRepo.list({ media: anime(), playableOnly: false })).toHaveLength(1)
  })

  it('narrows the anime side with the media list filter (statuses, favorite, score, year)', () => {
    const watching = addAnime('Watching', {
      status: 'watching',
      score: 9,
      favorite: true,
      releaseDate: '2015-04-01'
    })
    const planned = addAnime('Planned', { status: 'planned', score: 4, releaseDate: '1998-04-03' })
    addTheme(watching, { title: 'A' })
    addTheme(planned, { title: 'B' })

    const titles = (f: MediaListFilter): string[] =>
      themeRepo.list({ media: f }).map((s) => s.title as string)

    expect(titles(anime({ statuses: ['watching'] }))).toEqual(['A'])
    expect(titles(anime({ favorite: true }))).toEqual(['A'])
    expect(titles(anime({ scoreMin: 8 }))).toEqual(['A'])
    expect(titles(anime({ yearMax: 2000 }))).toEqual(['B'])
    expect(titles(anime({ unrated: true }))).toEqual([])
    expect(titles(anime()).sort()).toEqual(['A', 'B'])
  })

  it('filters by tag through the shared media filter', () => {
    const a = addAnime('Tagged')
    const b = addAnime('Untagged')
    addTheme(a, { title: 'A' })
    addTheme(b, { title: 'B' })
    const tagId = Number(db.prepare(`INSERT INTO tag (name) VALUES ('Space')`).run().lastInsertRowid)
    db.prepare('INSERT INTO media_tag (media_id, tag_id) VALUES (?, ?)').run(a, tagId)

    expect(themeRepo.list({ media: anime({ tagIds: [tagId] }) }).map((s) => s.title)).toEqual(['A'])
  })

  it('filters by song type and favorites', () => {
    const a = addAnime('Bebop')
    addTheme(a, { title: 'Opening', type: 'OP', favorite: true })
    addTheme(a, { title: 'Ending', type: 'ED', sortOrder: 1 })

    expect(themeRepo.list({ media: anime(), songType: 'OP' }).map((s) => s.title)).toEqual([
      'Opening'
    ])
    expect(themeRepo.list({ media: anime(), songType: 'ED' }).map((s) => s.title)).toEqual([
      'Ending'
    ])
    expect(themeRepo.list({ media: anime(), favoriteOnly: true }).map((s) => s.title)).toEqual([
      'Opening'
    ])
  })

  it('searches song titles, slugs, artists and anime titles', () => {
    const a = addAnime('Cowboy Bebop')
    const b = addAnime('Frieren')
    const t = addTheme(a, { title: 'Tank!', slug: 'OP1' })
    addArtist(t, 'The Seatbelts')
    addTheme(b, { title: 'Braver', slug: 'ED2' })

    const found = (q: string): string[] =>
      themeRepo.list({ media: anime(), search: q }).map((s) => s.title as string)

    expect(found('tank')).toEqual(['Tank!'])
    expect(found('seatbelt')).toEqual(['Tank!'])
    expect(found('frieren')).toEqual(['Braver'])
    expect(found('ED2')).toEqual(['Braver'])
    expect(found('nothing here')).toEqual([])
  })

  it('groups songs under their anime in source order, and shuffles songs (not anime) on random', () => {
    const a = addAnime('A', { score: 5 })
    const b = addAnime('B', { score: 9 })
    addTheme(a, { title: 'A-OP', sortOrder: 0 })
    addTheme(a, { title: 'A-ED', sortOrder: 1 })
    addTheme(b, { title: 'B-OP', sortOrder: 0 })

    // Anime by score desc, songs in their own order within each anime.
    expect(themeRepo.list({ media: anime({ sort: 'score', sortDir: 'desc' }) }).map((s) => s.title))
      .toEqual(['B-OP', 'A-OP', 'A-ED'])

    // A seeded random is stable across calls but reorders across seeds — and it
    // must be able to split one anime's songs (i.e. it hashes the SONG id).
    const one = themeRepo.list({ media: anime({ sort: 'random', seed: 7 }) }).map((s) => s.title)
    expect(themeRepo.list({ media: anime({ sort: 'random', seed: 7 }) }).map((s) => s.title)).toEqual(
      one
    )
    expect(one).toHaveLength(3)
    const seeds = [1, 2, 3, 4, 5, 6, 7, 8].map((seed) =>
      themeRepo
        .list({ media: anime({ sort: 'random', seed }) })
        .map((s) => s.title)
        .join(',')
    )
    expect(new Set(seeds).size).toBeGreaterThan(1)
  })

  it('always scopes to anime even if the filter says otherwise', () => {
    const movie = Number(
      db.prepare(`INSERT INTO media_item (media_type, title) VALUES ('movie', 'M')`).run()
        .lastInsertRowid
    )
    addTheme(movie, { title: 'Not anime' })
    expect(themeRepo.list({ media: { mediaType: 'movie' } })).toEqual([])
  })
})

describe('themeRepo favorites', () => {
  it('toggles a song favorite', () => {
    const a = addAnime('Bebop')
    const t = addTheme(a, { title: 'Tank!' })

    themeRepo.setFavorite(t, true)
    expect(themeRepo.list({ media: anime() })[0].favorite).toBe(true)
    themeRepo.setFavorite(t, false)
    expect(themeRepo.list({ media: anime() })[0].favorite).toBe(false)
  })

  it('counts the library unfiltered', () => {
    const a = addAnime('Bebop')
    addTheme(a, { title: 'Playable', favorite: true })
    addTheme(a, { title: 'Silent', audioUrl: null, audioPath: null, sortOrder: 1 })
    expect(themeRepo.counts()).toEqual({ total: 2, playable: 1, favorites: 1 })
  })

  it('counts zero on an empty library', () => {
    expect(themeRepo.counts()).toEqual({ total: 0, playable: 0, favorites: 0 })
  })
})
