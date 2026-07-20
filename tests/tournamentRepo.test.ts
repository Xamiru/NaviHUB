import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import * as tournamentRepo from '../src/main/repos/tournamentRepo'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

beforeEach(() => {
  db = createTestDb()
})

// ---- fixtures ----

function addArtist(name: string): number {
  return Number(
    db
      .prepare(`INSERT INTO music_artist (name, dir_path) VALUES (?, ?)`)
      .run(name, name).lastInsertRowid
  )
}

function addAlbum(artistId: number, title: string, coverPath: string | null = null): number {
  return Number(
    db
      .prepare(`INSERT INTO music_album (artist_id, title, dir_path, cover_path) VALUES (?, ?, ?, ?)`)
      .run(artistId, title, `dir/${title}`, coverPath).lastInsertRowid
  )
}

function addTrack(
  albumId: number,
  artistId: number,
  title: string,
  opts: { tagArtist?: string | null; liked?: boolean } = {}
): number {
  return Number(
    db
      .prepare(
        `INSERT INTO music_track (album_id, artist_id, file_path, title, tag_artist, liked_at)
         VALUES (?, ?, ?, ?, ?, ?)`
      )
      .run(
        albumId,
        artistId,
        `dir/${title}.mp3`,
        title,
        opts.tagArtist ?? null,
        opts.liked ? '2026-01-01 00:00:00' : null
      ).lastInsertRowid
  )
}

function addMedia(
  title: string,
  opts: { mediaType?: string; status?: string | null; releaseDate?: string | null } = {}
): number {
  return Number(
    db
      .prepare(
        `INSERT INTO media_item (media_type, title, status, release_date) VALUES (?, ?, ?, ?)`
      )
      .run(opts.mediaType ?? 'anime', title, opts.status ?? null, opts.releaseDate ?? null)
      .lastInsertRowid
  )
}

function addCharacter(
  name: string,
  opts: { nameNative?: string | null; imagePath?: string | null } = {}
): number {
  return Number(
    db
      .prepare(`INSERT INTO character (name, name_native, image_path) VALUES (?, ?, ?)`)
      .run(name, opts.nameNative ?? null, opts.imagePath ?? null).lastInsertRowid
  )
}

function linkCharacter(mediaId: number, characterId: number, sortOrder: number | null = null): void {
  db.prepare(`INSERT INTO media_character (media_id, character_id, sort_order) VALUES (?, ?, ?)`).run(
    mediaId,
    characterId,
    sortOrder
  )
}

function addPerson(name: string): number {
  return Number(db.prepare(`INSERT INTO person (name) VALUES (?)`).run(name).lastInsertRowid)
}

// ---- tests ----

describe('tournamentPool: music', () => {
  it('covers all/liked scopes and normalizes tracks', () => {
    const artist = addArtist('Radiohead')
    const album = addAlbum(artist, 'OK Computer', 'media/cover-1')
    addTrack(album, artist, 'Airbag', { liked: true })
    addTrack(album, artist, 'Karma Police', { tagArtist: 'Radiohead feat. X' })

    const all = tournamentRepo.tournamentPool({ kind: 'music', scope: 'all' })
    expect(all).toHaveLength(2)
    const airbag = all.find((e) => e.name === 'Airbag')!
    expect(airbag.key).toMatch(/^music-\d+$/)
    expect(airbag.entryKind).toBe('music')
    expect(airbag.subtitle).toBe('Radiohead')
    expect(airbag.imagePath).toBe('media/cover-1')
    expect(airbag.audioPath).toBe('music/dir/Airbag.mp3')
    expect(airbag.audioUrl).toBeNull()
    // raw tag artist wins over the folder artist when present
    expect(all.find((e) => e.name === 'Karma Police')!.subtitle).toBe('Radiohead feat. X')

    const liked = tournamentRepo.tournamentPool({ kind: 'music', scope: 'liked' })
    expect(liked.map((e) => e.name)).toEqual(['Airbag'])
  })

  it('scopes to a playlist, artist or album', () => {
    const a1 = addArtist('A1')
    const a2 = addArtist('A2')
    const al1 = addAlbum(a1, 'Album1')
    const al2 = addAlbum(a2, 'Album2')
    const t1 = addTrack(al1, a1, 'Song1')
    addTrack(al1, a1, 'Song2')
    const t3 = addTrack(al2, a2, 'Song3')

    const pl = Number(
      db.prepare(`INSERT INTO music_playlist (title) VALUES ('Mix')`).run().lastInsertRowid
    )
    db.prepare(
      `INSERT INTO music_playlist_track (playlist_id, track_id, position) VALUES (?, ?, ?)`
    ).run(pl, t3, 0)
    db.prepare(
      `INSERT INTO music_playlist_track (playlist_id, track_id, position) VALUES (?, ?, ?)`
    ).run(pl, t1, 1)

    expect(
      tournamentRepo.tournamentPool({ kind: 'music', scope: 'playlist', id: pl }).map((e) => e.name)
    ).toEqual(['Song3', 'Song1'])
    expect(
      tournamentRepo.tournamentPool({ kind: 'music', scope: 'artist', id: a1 }).map((e) => e.name)
    ).toEqual(['Song1', 'Song2'])
    expect(
      tournamentRepo.tournamentPool({ kind: 'music', scope: 'album', id: al2 }).map((e) => e.name)
    ).toEqual(['Song3'])
    // missing playlist/album ids resolve to empty pools, not throws
    expect(tournamentRepo.tournamentPool({ kind: 'music', scope: 'playlist', id: 999 })).toEqual([])
    expect(tournamentRepo.tournamentPool({ kind: 'music', scope: 'album', id: 999 })).toEqual([])
  })
})

describe('tournamentPool: themes', () => {
  it('delegates to the song-quiz pool (playable audio only) and keeps both audio fields', () => {
    const anime = addMedia('Bebop')
    db.prepare(
      `INSERT INTO theme_song (media_id, type, title, audio_url, audio_path) VALUES (?, 'OP', 'Tank!', 'https://x/t.ogg', 'audio/t.ogg')`
    ).run(anime)
    db.prepare(
      `INSERT INTO theme_song (media_id, type, title) VALUES (?, 'ED', 'Silent')`
    ).run(anime) // no audio — excluded

    const pool = tournamentRepo.tournamentPool({ kind: 'themes' })
    expect(pool).toHaveLength(1)
    expect(pool[0]).toMatchObject({
      entryKind: 'theme',
      name: 'Tank!',
      audioPath: 'audio/t.ogg',
      audioUrl: 'https://x/t.ogg'
    })
    expect(pool[0].key).toMatch(/^theme-\d+$/)
    expect(pool[0].subtitle).toContain('Bebop')

    // the QuizSongFilter passes through
    expect(tournamentRepo.tournamentPool({ kind: 'themes', filter: { songType: 'ED' } })).toEqual([])
  })
})

describe('tournamentPool: characters', () => {
  it('lists every character with a linked media title as subtitle, native name fallback', () => {
    const anime = addMedia('Frieren')
    const linked = addCharacter('Fern', { imagePath: 'media/fern' })
    linkCharacter(anime, linked)
    addCharacter('Nobody', { nameNative: 'ダレモ' }) // no media link

    const pool = tournamentRepo.tournamentPool({ kind: 'characters' })
    expect(pool.map((e) => e.name)).toEqual(['Fern', 'Nobody'])
    expect(pool[0]).toMatchObject({
      key: `character-${linked}`,
      entryKind: 'character',
      subtitle: 'Frieren',
      imagePath: 'media/fern'
    })
    expect(pool[1].subtitle).toBe('ダレモ')
  })

  it('scopes to one media title in roster order', () => {
    const a = addMedia('Show A')
    const b = addMedia('Show B')
    const c1 = addCharacter('Main')
    const c2 = addCharacter('Side')
    const c3 = addCharacter('Other-show')
    linkCharacter(a, c2, 1)
    linkCharacter(a, c1, 0)
    linkCharacter(b, c3)

    const pool = tournamentRepo.tournamentPool({ kind: 'characters', mediaId: a })
    expect(pool.map((e) => e.name)).toEqual(['Main', 'Side'])
  })
})

describe('tournamentPool: media', () => {
  it('filters by type and status, subtitle = release year', () => {
    addMedia('Bebop', { status: 'Completed', releaseDate: '1998-04-03' })
    addMedia('Lain', { status: 'Watching' })
    addMedia('Blade Runner', { mediaType: 'movie', status: 'Completed' })

    const anime = tournamentRepo.tournamentPool({ kind: 'media', mediaType: 'anime' })
    expect(anime.map((e) => e.name).sort()).toEqual(['Bebop', 'Lain'])
    expect(anime.find((e) => e.name === 'Bebop')).toMatchObject({
      entryKind: 'media',
      subtitle: '1998'
    })
    expect(anime.find((e) => e.name === 'Lain')!.subtitle).toBeNull()

    const completed = tournamentRepo.tournamentPool({
      kind: 'media',
      mediaType: 'anime',
      status: 'Completed'
    })
    expect(completed.map((e) => e.name)).toEqual(['Bebop'])
  })
})

describe('tournamentPool: people', () => {
  it('respects the credit-role filter', () => {
    const anime = addMedia('Bebop')
    const va = addPerson('Megumi Hayashibara')
    const director = addPerson('Shinichiro Watanabe')
    db.prepare(`INSERT INTO credit (media_id, person_id, role) VALUES (?, ?, 'voice_actor')`).run(
      anime,
      va
    )
    db.prepare(`INSERT INTO credit (media_id, person_id, role) VALUES (?, ?, 'director')`).run(
      anime,
      director
    )

    const everyone = tournamentRepo.tournamentPool({ kind: 'people' })
    expect(everyone.map((e) => e.name).sort()).toEqual([
      'Megumi Hayashibara',
      'Shinichiro Watanabe'
    ])
    expect(everyone[0].key).toMatch(/^person-\d+$/)

    const vas = tournamentRepo.tournamentPool({ kind: 'people', role: 'voice_actor' })
    expect(vas.map((e) => e.name)).toEqual(['Megumi Hayashibara'])
  })
})

describe('tournamentPool: list', () => {
  it('resolves media and character lists to correctly-prefixed entries', () => {
    const m = addMedia('Bebop')
    const c = addCharacter('Fern')
    const mediaList = Number(
      db
        .prepare(`INSERT INTO list (title, entity_kind) VALUES ('Faves', 'media')`)
        .run().lastInsertRowid
    )
    const charList = Number(
      db
        .prepare(`INSERT INTO list (title, entity_kind) VALUES ('Best girls', 'character')`)
        .run().lastInsertRowid
    )
    db.prepare(`INSERT INTO list_item (list_id, entity_id) VALUES (?, ?)`).run(mediaList, m)
    db.prepare(`INSERT INTO list_item (list_id, entity_id) VALUES (?, ?)`).run(charList, c)

    const mediaPool = tournamentRepo.tournamentPool({ kind: 'list', listId: mediaList })
    expect(mediaPool).toHaveLength(1)
    expect(mediaPool[0]).toMatchObject({ key: `media-${m}`, entryKind: 'media', name: 'Bebop' })

    const charPool = tournamentRepo.tournamentPool({ kind: 'list', listId: charList })
    expect(charPool[0]).toMatchObject({
      key: `character-${c}`,
      entryKind: 'character',
      name: 'Fern'
    })
  })

  it('returns an empty pool for a missing list', () => {
    expect(tournamentRepo.tournamentPool({ kind: 'list', listId: 999 })).toEqual([])
  })
})
