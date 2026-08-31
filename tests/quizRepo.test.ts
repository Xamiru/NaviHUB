import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import * as quizRepo from '../src/main/repos/quizRepo'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

beforeEach(() => {
  db = createTestDb()
})

function addAnime(title: string, status: string | null = null): number {
  return Number(
    db
      .prepare(`INSERT INTO media_item (media_type, title, status) VALUES ('anime', ?, ?)`)
      .run(title, status).lastInsertRowid
  )
}

function addTheme(
  mediaId: number,
  opts: { type?: string; audioUrl?: string | null; audioPath?: string | null; title?: string } = {}
): number {
  return Number(
    db
      .prepare(
        `INSERT INTO theme_song (media_id, type, title, audio_url, audio_path)
         VALUES (?, ?, ?, ?, ?)`
      )
      .run(
        mediaId,
        opts.type ?? 'OP',
        opts.title ?? 'Song',
        opts.audioUrl ?? null,
        opts.audioPath ?? null
      ).lastInsertRowid
  )
}

describe('quizRepo.songPool', () => {
  it('only returns themes with playable audio, from anime', () => {
    const a = addAnime('A')
    addTheme(a, { audioUrl: 'https://x/a.ogg' })
    addTheme(a, {}) // no audio — excluded
    const movie = Number(
      db
        .prepare(`INSERT INTO media_item (media_type, title) VALUES ('movie', 'M')`)
        .run().lastInsertRowid
    )
    addTheme(movie, { audioUrl: 'https://x/m.ogg' }) // not anime — excluded

    const pool = quizRepo.songPool()
    expect(pool).toHaveLength(1)
    expect(pool[0].animeTitle).toBe('A')
  })

  it('filters by song type and watch statuses', () => {
    const a = addAnime('A', 'Completed')
    const b = addAnime('B', 'Watching')
    addTheme(a, { type: 'OP', audioPath: 'audio/a.ogg' })
    addTheme(a, { type: 'ED', audioPath: 'audio/a2.ogg' })
    addTheme(b, { type: 'OP', audioPath: 'audio/b.ogg' })

    expect(quizRepo.songPool({ songType: 'OP' })).toHaveLength(2)
    expect(quizRepo.songPool({ statuses: ['Completed'] })).toHaveLength(2)
    expect(quizRepo.songPool({ songType: 'ED', statuses: ['Watching'] })).toHaveLength(0)
  })

  it('filters by era, using metadata.seasonYear then release_date', () => {
    // release-date year only
    const old = Number(
      db
        .prepare(
          `INSERT INTO media_item (media_type, title, release_date) VALUES ('anime', 'Old', '1997-04-01')`
        )
        .run().lastInsertRowid
    )
    // canonical seasonYear (2021) overrides a misleading release_date (1999)
    const modern = Number(
      db
        .prepare(
          `INSERT INTO media_item (media_type, title, release_date, metadata)
           VALUES ('anime', 'Modern', '1999-01-01', '{"seasonYear":2021}')`
        )
        .run().lastInsertRowid
    )
    // no year anywhere — excluded once an era filter is active
    const undated = addAnime('Undated')
    addTheme(old, { audioPath: 'audio/o.ogg' })
    addTheme(modern, { audioPath: 'audio/m.ogg' })
    addTheme(undated, { audioPath: 'audio/u.ogg' })

    expect(quizRepo.songPool({ eras: ['90s'] }).map((s) => s.animeTitle)).toEqual(['Old'])
    expect(quizRepo.songPool({ eras: ['2020s'] }).map((s) => s.animeTitle)).toEqual(['Modern'])
    expect(
      quizRepo
        .songPool({ eras: ['90s', '2020s'] })
        .map((s) => s.animeTitle)
        .sort()
    ).toEqual(['Modern', 'Old'])
    expect(quizRepo.songPool({ eras: ['2000s'] })).toHaveLength(0)
    // empty/omitted era list leaves the pool unfiltered (undated included)
    expect(quizRepo.songPool({ eras: [] })).toHaveLength(3)
  })

  it('does not throw on malformed metadata JSON during era filtering', () => {
    const a = Number(
      db
        .prepare(
          `INSERT INTO media_item (media_type, title, release_date, metadata)
           VALUES ('anime', 'Bad', '2015-01-01', '{not json')`
        )
        .run().lastInsertRowid
    )
    addTheme(a, { audioPath: 'audio/a.ogg' })
    // json_valid guard falls through to the release_date year (2015 -> 2010s).
    expect(quizRepo.songPool({ eras: ['2010s'] }).map((s) => s.animeTitle)).toEqual(['Bad'])
  })

  it('groups multiple artists onto one song', () => {
    const a = addAnime('A')
    const themeId = addTheme(a, { audioUrl: 'https://x/a.ogg' })
    const p1 = Number(db.prepare(`INSERT INTO person (name) VALUES ('Yoko')`).run().lastInsertRowid)
    const p2 = Number(db.prepare(`INSERT INTO person (name) VALUES ('Kanno')`).run().lastInsertRowid)
    db.prepare(
      'INSERT INTO theme_artist (theme_song_id, person_id, sort_order) VALUES (?, ?, ?)'
    ).run(themeId, p1, 0)
    db.prepare(
      'INSERT INTO theme_artist (theme_song_id, person_id, sort_order) VALUES (?, ?, ?)'
    ).run(themeId, p2, 1)

    const pool = quizRepo.songPool()
    expect(pool).toHaveLength(1)
    expect(pool[0].artists).toEqual(['Yoko', 'Kanno'])
  })

  it('returns the release year and tag genres for distractor affinity', () => {
    const id = Number(
      db
        .prepare(
          `INSERT INTO media_item (media_type, title, release_date, metadata)
           VALUES ('anime', 'A', '2011-04-01', '{"seasonYear":2011}')`
        )
        .run().lastInsertRowid
    )
    for (const name of ['Action', 'Comedy']) {
      const tagId = Number(
        db.prepare(`INSERT INTO tag (name) VALUES (?)`).run(name).lastInsertRowid
      )
      db.prepare(`INSERT INTO media_tag (media_id, tag_id) VALUES (?, ?)`).run(id, tagId)
    }
    addTheme(id, { audioPath: 'audio/a.ogg' })

    const [song] = quizRepo.songPool()
    expect(song.year).toBe(2011)
    expect([...song.genres].sort()).toEqual(['Action', 'Comedy'])
    // an untagged anime just gets an empty list, never null
    const b = addAnime('B')
    addTheme(b, { audioPath: 'audio/b.ogg' })
    expect(quizRepo.songPool().find((s) => s.animeTitle === 'B')?.genres).toEqual([])
  })
})

describe('quizRepo availability', () => {
  it('honors completed-status scope and reports format readiness counts', () => {
    const completed = addAnime('Completed', 'Completed')
    const watching = addAnime('Watching', 'Watching')
    addTheme(completed, { audioPath: 'audio/c.ogg' })
    addTheme(watching, { audioPath: 'audio/w.ogg' })
    db.prepare(`UPDATE media_item SET cover_path='media/c.jpg', release_date='2020-01-01' WHERE id=?`).run(completed)
    db.prepare(`UPDATE media_item SET cover_path='media/w.jpg', release_date='2021-01-01' WHERE id=?`).run(watching)
    const completedMovie = Number(
      db
        .prepare(`INSERT INTO media_item (media_type, title, status, cover_path) VALUES ('movie', 'Film', 'Completed', 'media/f.jpg')`)
        .run().lastInsertRowid
    )
    const watchingTv = Number(
      db
        .prepare(`INSERT INTO media_item (media_type, title, status, cover_path) VALUES ('tv', 'Show', 'Watching', 'media/t.jpg')`)
        .run().lastInsertRowid
    )
    const actor = Number(
      db.prepare(`INSERT INTO person (name, photo_path) VALUES ('Actor', 'media/a.jpg')`).run()
        .lastInsertRowid
    )
    db.prepare(`INSERT INTO credit (media_id, person_id, role, importance) VALUES (?, ?, 'actor', 0)`).run(completedMovie, actor)
    db.prepare(`INSERT INTO credit (media_id, person_id, role, importance) VALUES (?, ?, 'actor', 25)`).run(watchingTv, actor)

    const readingManga = Number(
      db
        .prepare(
          `INSERT INTO media_item (media_type, title, status, cover_path)
           VALUES ('manga', 'Reading Manga', 'Reading', 'media/m.jpg')`
        )
        .run().lastInsertRowid
    )
    db.prepare(
      `INSERT INTO manga_chapter
       (media_id, dir_path, title, page_count, last_read_page)
       VALUES (?, 'Reading Manga/c1', 'Chapter 1', 10, 4)`
    ).run(readingManga)

    const sharedVa = Number(
      db.prepare(`INSERT INTO person (name) VALUES ('Shared VA')`).run().lastInsertRowid
    )
    const matchingAnime = addAnime('Completed Match', 'Completed')
    const decoyMedia = [
      addAnime('Completed Decoy A', 'Completed'),
      addAnime('Completed Decoy B', 'Completed'),
      addAnime('Completed Decoy C', 'Completed')
    ]
    for (const [index, mediaId] of [completed, matchingAnime, watching, ...decoyMedia].entries()) {
      const characterId = Number(
        db
          .prepare(`INSERT INTO character (name, gender, image_path) VALUES (?, 'female', ?)`)
          .run(`Character ${index}`, `media/ch-${index}.jpg`).lastInsertRowid
      )
      const personId = index < 3
        ? sharedVa
        : Number(
            db.prepare(`INSERT INTO person (name) VALUES (?)`).run(`Decoy VA ${index}`)
              .lastInsertRowid
          )
      db.prepare(
        `INSERT INTO credit
           (media_id, person_id, character_id, role, language, importance)
         VALUES (?, ?, ?, 'voice_actor', 'Japanese', 1)`
      ).run(mediaId, personId, characterId)
    }

    const safe = quizRepo.availability({ scope: 'consumed', statuses: ['Completed'] })
    const all = quizRepo.availability({ scope: 'all' })
    expect(safe.song).toBe(1)
    expect(all.song).toBe(2)
    expect(safe.cast).toBe(1)
    expect(all.cast).toBe(2)
    expect(safe.va).toBe(2)
    expect(all.va).toBe(3)
    expect(safe.mangaPanel).toBe(1)
    expect(safe.imageReveal).toBe(1)
    expect(all.higherLower).toBe(2)
  })

  it('counts Guess the Track identities by source, excludes incomplete metadata, and honors consumed themes', () => {
    const completed = addAnime('Completed', 'Completed')
    const watching = addAnime('Watching', 'Watching')
    const completedTheme = addTheme(completed, {
      title: 'Same Song',
      audioPath: 'audio/completed.ogg'
    })
    const watchingTheme = addTheme(watching, {
      title: 'Same Song',
      audioPath: 'audio/watching.ogg'
    })
    addTheme(completed, { title: '', audioPath: 'audio/no-title.ogg' })
    addTheme(completed, { title: 'No performer', audioPath: 'audio/no-performer.ogg' })
    const performer = Number(
      db.prepare(`INSERT INTO person (name) VALUES ('Performer')`).run().lastInsertRowid
    )
    for (const themeId of [completedTheme, watchingTheme]) {
      db.prepare(
        `INSERT INTO theme_artist (theme_song_id, person_id, sort_order) VALUES (?, ?, 0)`
      ).run(themeId, performer)
    }

    const artist = Number(
      db.prepare(`INSERT INTO music_artist (name, dir_path) VALUES ('Artist', 'Artist')`).run()
        .lastInsertRowid
    )
    const albumA = Number(
      db.prepare(
        `INSERT INTO music_album (artist_id, title, dir_path) VALUES (?, 'Album A', 'Artist/Album A')`
      ).run(artist).lastInsertRowid
    )
    const albumB = Number(
      db.prepare(
        `INSERT INTO music_album (artist_id, title, dir_path) VALUES (?, 'Album B', 'Artist/Album B')`
      ).run(artist).lastInsertRowid
    )
    db.prepare(
      `INSERT INTO music_track (album_id, artist_id, file_path, title, tag_artist)
       VALUES (?, ?, 'Artist/Album A/song.mp3', 'Duplicate', 'Artist'),
              (?, ?, 'Artist/Album B/song.mp3', 'Duplicate', 'Artist'),
              (?, ?, 'Artist/Album B/other.mp3', 'Other', 'Artist')`
    ).run(albumA, artist, albumB, artist, albumB, artist)

    const safe = quizRepo.availability({ statuses: ['Completed'] })
    const all = quizRepo.availability({ scope: 'all' })
    expect(safe.guessTrackOptions).toEqual({ themes: 1, music: 2 })
    expect(all.guessTrackOptions).toEqual({ themes: 1, music: 2 })
    expect(safe.guessTrack).toBe(2)
  })
})

describe('quizRepo higher/lower availability', () => {
  it('reports playable counts by media category and metric', () => {
    db.prepare(
      `INSERT INTO media_item
       (media_type, title, status, cover_path, release_date, total_units, score)
       VALUES
       ('anime', 'Old', 'Completed', 'media/old.jpg', '1998-04-03', 26, 8),
       ('anime', 'New', 'Completed', 'media/new.jpg', '2024-01-01', 12, 9),
       ('anime', 'Same year', 'Completed', 'media/same.jpg', '2024-09-01', 12, 9),
       ('anime', 'No cover', 'Completed', NULL, '1980-01-01', 50, 10),
       ('movie', 'Film', 'Completed', 'media/film.jpg', '2001-01-01', 120, 7)`
    ).run()

    const result = quizRepo.availability({ statuses: ['Completed'] })
    const anime = result.higherLowerOptions.find((option) => option.mediaType === 'anime')!
    const movie = result.higherLowerOptions.find((option) => option.mediaType === 'movie')!
    expect(anime).toEqual({
      mediaType: 'anime',
      releaseDate: 3,
      totalUnits: 3,
      personalScore: 3
    })
    expect(movie).toEqual({
      mediaType: 'movie',
      releaseDate: 0,
      totalUnits: 0,
      personalScore: 0
    })
    expect(result.higherLower).toBe(3)
  })

  it('filters the dealt pool to the requested category', () => {
    db.prepare(
      `INSERT INTO media_item
       (media_type, title, cover_path, release_date)
       VALUES
       ('anime', 'Anime A', 'media/a.jpg', '2000-01-01'),
       ('anime', 'Anime B', 'media/b.jpg', '2010-01-01'),
       ('movie', 'Movie A', 'media/c.jpg', '1990-01-01'),
       ('movie', 'Movie B', 'media/d.jpg', '2020-01-01')`
    ).run()
    const [question] = quizRepo.challengePool({
      kind: 'higherLower',
      seed: 4,
      length: 1,
      options: { higherLowerMediaType: 'movie', higherLowerMetric: 'releaseDate' }
    })
    expect(question.kind).toBe('higherLower')
    if (question.kind !== 'higherLower') return
    expect(question.mediaType).toBe('movie')
    expect([question.reference.label, question.challenger.label].sort()).toEqual([
      'Movie A',
      'Movie B'
    ])
  })
})

describe('quizRepo screen puzzle pools', () => {
  it('reports a Grid only when one media selection can fill nine distinct intersections', () => {
    const actor = Number(db.prepare(`INSERT INTO person (name) VALUES ('Grid Actor')`).run().lastInsertRowid)
    const director = Number(db.prepare(`INSERT INTO person (name) VALUES ('Grid Director')`).run().lastInsertRowid)
    const company = Number(db.prepare(`INSERT INTO company (name) VALUES ('Grid Company')`).run().lastInsertRowid)
    const tags = ['Drama', 'Thriller', 'Science Fiction'].map((name) =>
      Number(db.prepare(`INSERT INTO tag (name, category) VALUES (?, 'genre')`).run(name).lastInsertRowid)
    )
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        for (let copy = 0; copy < 2; copy++) {
          const mediaType = copy === 0 ? 'movie' : 'tv'
          const title = `Grid ${row}-${column}-${copy}`
          const mediaId = Number(db.prepare(
            `INSERT INTO media_item
             (media_type, title, title_original, status, cover_path, release_date)
             VALUES (?, ?, ?, 'Completed', ?, ?)`
          ).run(
            mediaType,
            title,
            row === 0 && column === 0 && copy === 0 ? 'Grid Alias' : null,
            `media/${title}.jpg`,
            `${1992 + column * 10}-01-01`
          ).lastInsertRowid)
          db.prepare(`INSERT INTO media_tag (media_id, tag_id) VALUES (?, ?)`).run(mediaId, tags[column])
          if (row === 0) {
            db.prepare(`INSERT INTO credit (media_id, person_id, role, importance) VALUES (?, ?, 'actor', 0)`).run(mediaId, actor)
          } else if (row === 1) {
            db.prepare(`INSERT INTO credit (media_id, person_id, role, importance) VALUES (?, ?, 'director', 50)`).run(mediaId, director)
          } else {
            db.prepare(`INSERT INTO media_company (media_id, company_id, role) VALUES (?, ?, 'production_studio')`).run(mediaId, company)
          }
        }
      }
    }

    const availability = quizRepo.availability({ statuses: ['Completed'] })
    expect(availability.screenGameOptions.find((option) => option.mediaMode === 'both')?.libraryGrid).toBe(9)
    expect(availability.screenGameOptions.find((option) => option.mediaMode === 'movie')?.libraryGrid).toBe(0)
    expect(availability.libraryGrid).toBe(9)

    const [question] = quizRepo.challengePool({
      kind: 'libraryGrid',
      seed: 18,
      statuses: ['Completed'],
      length: 1,
      options: { screenMediaMode: 'both' }
    })
    expect(question.kind).toBe('libraryGrid')
    if (question.kind !== 'libraryGrid') return
    expect(question.cells).toHaveLength(9)
    expect(question.titles.find((title) => title.label === 'Grid 0-0-0')?.aliases).toContain('Grid Alias')
  })

  it('uses consumed filters and excludes billing position 10 from Chain edges', () => {
    const mediaIds: number[] = []
    for (let index = 0; index < 5; index++) {
      mediaIds.push(Number(db.prepare(
        `INSERT INTO media_item
         (media_type, title, status, cover_path, release_date)
         VALUES ('movie', ?, ?, ?, ?)`
      ).run(
        `Chain ${index + 1}`,
        index === 4 ? 'Watching' : 'Completed',
        `media/chain-${index + 1}.jpg`,
        `${2000 + index}-01-01`
      ).lastInsertRowid))
    }
    for (let index = 0; index < 4; index++) {
      const person = Number(db.prepare(`INSERT INTO person (name) VALUES (?)`).run(`Link ${index + 1}`).lastInsertRowid)
      const role = index % 2 === 0 ? 'actor' : 'director'
      const importance = role === 'actor' ? 0 : 50
      for (const mediaId of [mediaIds[index], mediaIds[index + 1]]) {
        db.prepare(`INSERT INTO credit (media_id, person_id, role, importance) VALUES (?, ?, ?, ?)`).run(mediaId, person, role, importance)
      }
    }
    const extra = Number(db.prepare(`INSERT INTO person (name) VALUES ('Position Ten')`).run().lastInsertRowid)
    for (const mediaId of [mediaIds[0], mediaIds[4]]) {
      db.prepare(`INSERT INTO credit (media_id, person_id, role, importance) VALUES (?, ?, 'actor', 10)`).run(mediaId, extra)
    }

    const safe = quizRepo.availability({ statuses: ['Completed'] })
    const all = quizRepo.availability({ scope: 'all' })
    expect(safe.screenGameOptions.find((option) => option.mediaMode === 'movie')?.movieChain.hard).toBe(0)
    expect(all.screenGameOptions.find((option) => option.mediaMode === 'movie')?.movieChain.hard).toBe(1)

    const [question] = quizRepo.challengePool({
      kind: 'movieChain',
      seed: 4,
      length: 1,
      options: { screenMediaMode: 'movie', movieChainDifficulty: 'hard' }
    })
    expect(question.kind).toBe('movieChain')
    if (question.kind !== 'movieChain') return
    expect(question.optimalDistance).toBe(4)
    expect(question.edges.flatMap((edge) => edge.connectors).some((person) => person.name === 'Position Ten')).toBe(false)
  })
})

describe('quizRepo deduction and grouping pools', () => {
  it('filters Libraryle and Mystery Career by consumed status and top-ten billing', () => {
    const genre = Number(db.prepare(`INSERT INTO tag (name, category) VALUES ('Drama', 'genre')`).run().lastInsertRowid)
    const target = Number(db.prepare(`INSERT INTO person (name) VALUES ('Career Target')`).run().lastInsertRowid)
    const lowBilled = Number(db.prepare(`INSERT INTO person (name) VALUES ('Background Career')`).run().lastInsertRowid)
    const fillers = Array.from({ length: 8 }, (_, index) =>
      Number(db.prepare(`INSERT INTO person (name) VALUES (?)`).run(`Career Guess ${index}`).lastInsertRowid)
    )
    const ids: number[] = []
    for (let index = 0; index < 10; index++) {
      const mediaId = Number(db.prepare(
        `INSERT INTO media_item (media_type, title, status, cover_path, release_date)
         VALUES (?, ?, ?, ?, ?)`
      ).run(
        index % 2 ? 'tv' : 'movie',
        `Career Film ${index}`,
        index === 9 ? 'Watching' : 'Completed',
        `media/career-${index}.jpg`,
        `${2000 + index}-01-01`
      ).lastInsertRowid)
      ids.push(mediaId)
      db.prepare(`INSERT INTO media_tag (media_id, tag_id) VALUES (?, ?)`).run(mediaId, genre)
      const filler = fillers[index % fillers.length]
      db.prepare(`INSERT INTO credit (media_id, person_id, role, importance) VALUES (?, ?, 'director', 99)`).run(mediaId, filler)
      db.prepare(`INSERT INTO credit (media_id, person_id, role, importance) VALUES (?, ?, 'director', 99)`).run(mediaId, fillers[(index + 1) % fillers.length])
      if (index < 6) {
        db.prepare(`INSERT INTO credit (media_id, person_id, role, importance) VALUES (?, ?, 'actor', 0)`).run(mediaId, target)
        db.prepare(`INSERT INTO credit (media_id, person_id, role, importance) VALUES (?, ?, 'actor', 10)`).run(mediaId, lowBilled)
      }
    }

    const consumed = quizRepo.availability({ statuses: ['Completed'] })
    const all = quizRepo.availability({ scope: 'all' })
    expect(consumed.screenGameOptions.find((option) => option.mediaMode === 'both')?.libraryle).toBe(9)
    expect(all.screenGameOptions.find((option) => option.mediaMode === 'both')?.libraryle).toBe(10)
    expect(consumed.screenGameOptions.find((option) => option.mediaMode === 'both')?.mysteryCareer).toBe(1)

    const [career] = quizRepo.challengePool({
      kind: 'mysteryCareer',
      seed: 3,
      statuses: ['Completed'],
      length: 1,
      options: { screenMediaMode: 'both' }
    })
    expect(career.kind).toBe('mysteryCareer')
    if (career.kind !== 'mysteryCareer') return
    expect(career.people.find((person) => person.label === 'Background Career')).toBeUndefined()
    expect(career.credits).toHaveLength(6)
  })

  it('reports and returns only a provably solvable Link Wall', () => {
    const actor = Number(db.prepare(`INSERT INTO person (name) VALUES ('Wall Actor')`).run().lastInsertRowid)
    const director = Number(db.prepare(`INSERT INTO person (name) VALUES ('Wall Director')`).run().lastInsertRowid)
    const company = Number(db.prepare(`INSERT INTO company (name) VALUES ('Wall Company')`).run().lastInsertRowid)
    const groupGenre = Number(db.prepare(`INSERT INTO tag (name, category) VALUES ('Wall Mystery', 'genre')`).run().lastInsertRowid)
    for (let index = 0; index < 16; index++) {
      const group = Math.floor(index / 4)
      const mediaId = Number(db.prepare(
        `INSERT INTO media_item (media_type, title, status, cover_path, release_date)
         VALUES (?, ?, 'Completed', ?, ?)`
      ).run(
        index % 2 ? 'tv' : 'movie',
        `Wall ${index + 1}`,
        `media/wall-${index + 1}.jpg`,
        `${1800 + index * 10}-01-01`
      ).lastInsertRowid)
      if (group === 0) {
        db.prepare(`INSERT INTO credit (media_id, person_id, role, importance) VALUES (?, ?, 'actor', 0)`).run(mediaId, actor)
      } else if (group === 1) {
        db.prepare(`INSERT INTO credit (media_id, person_id, role, importance) VALUES (?, ?, 'director', 99)`).run(mediaId, director)
      } else if (group === 2) {
        db.prepare(`INSERT INTO media_company (media_id, company_id, role) VALUES (?, ?, 'production_studio')`).run(mediaId, company)
      } else {
        db.prepare(`INSERT INTO media_tag (media_id, tag_id) VALUES (?, ?)`).run(mediaId, groupGenre)
      }
    }

    const availability = quizRepo.availability({ statuses: ['Completed'] })
    expect(availability.screenGameOptions.find((option) => option.mediaMode === 'both')?.linkWall).toBe(16)
    const [wall] = quizRepo.challengePool({
      kind: 'linkWall',
      seed: 8,
      statuses: ['Completed'],
      length: 1,
      options: { screenMediaMode: 'both' }
    })
    expect(wall.kind).toBe('linkWall')
    if (wall.kind !== 'linkWall') return
    expect(wall.titles).toHaveLength(16)
    expect(wall.groups).toHaveLength(4)
  })
})

describe('quizRepo silhouette challenge pool', () => {
  it('uses imported anime character portraits and excludes movie roles', () => {
    for (let index = 0; index < 4; index++) {
      const mediaId = addAnime(`Anime ${index + 1}`, 'Completed')
      const characterId = Number(
        db
          .prepare(`INSERT INTO character (name, gender, image_path) VALUES (?, 'female', ?) `)
          .run(`Heroine ${index + 1}`, `media/heroine-${index + 1}.jpg`).lastInsertRowid
      )
      db.prepare(`INSERT INTO media_character (media_id, character_id) VALUES (?, ?)`).run(
        mediaId,
        characterId
      )
    }
    const movieId = Number(
      db
        .prepare(`INSERT INTO media_item (media_type, title, status) VALUES ('movie', 'Film', 'Completed')`)
        .run().lastInsertRowid
    )
    const movieCharacter = Number(
      db
        .prepare(`INSERT INTO character (name, gender, image_path) VALUES ('Movie Role', 'female', 'media/movie.jpg')`)
        .run().lastInsertRowid
    )
    db.prepare(`INSERT INTO media_character (media_id, character_id) VALUES (?, ?)`).run(
      movieId,
      movieCharacter
    )

    const questions = quizRepo.challengePool({
      kind: 'silhouette',
      seed: 4,
      statuses: ['Completed'],
      length: 10,
      options: { silhouetteMode: 'character' }
    })
    expect(questions).toHaveLength(4)
    expect(questions.every((question) => !question.reveal.includes('Movie Role'))).toBe(true)
  })
})

describe('quizRepo Connections challenge pool', () => {
  it('uses only top-ten billed movie and TV actors and reports actual playable pairs', () => {
    const addScreenTitle = (mediaType: 'movie' | 'tv' | 'anime', title: string): number => Number(
      db.prepare(
        `INSERT INTO media_item (media_type, title, status, cover_path)
         VALUES (?, ?, 'Completed', ?)`
      ).run(mediaType, title, `media/${title}.jpg`).lastInsertRowid
    )
    const addActor = (name: string): number => Number(
      db.prepare(`INSERT INTO person (name) VALUES (?)`).run(name).lastInsertRowid
    )
    const addRole = (mediaId: number, personId: number, characterName: string, order: number): void => {
      const characterId = Number(
        db.prepare(`INSERT INTO character (name) VALUES (?)`).run(characterName).lastInsertRowid
      )
      db.prepare(
        `INSERT INTO media_character (media_id, character_id, sort_order) VALUES (?, ?, ?)`
      ).run(mediaId, characterId, order)
      db.prepare(
        `INSERT INTO credit (media_id, person_id, character_id, role, importance)
         VALUES (?, ?, ?, 'actor', ?)`
      ).run(mediaId, personId, characterId, order)
    }

    const film = addScreenTitle('movie', 'Film')
    const show = addScreenTitle('tv', 'Show')
    const decoyTitles = [
      addScreenTitle('movie', 'Decoy A'),
      addScreenTitle('tv', 'Decoy B'),
      addScreenTitle('movie', 'Decoy C')
    ]
    const anime = addScreenTitle('anime', 'Anime')
    const shared = addActor('Shared Actor')
    addRole(film, shared, 'Film Lead', 0)
    addRole(show, shared, 'Show Lead', 9)
    addRole(anime, shared, 'Anime Role', 0)

    const lowerBilled = addActor('Background Actor')
    addRole(film, lowerBilled, 'Film Extra', 0)
    addRole(show, lowerBilled, 'Show Extra', 10)

    const director = addActor('Shared Director')
    db.prepare(`INSERT INTO credit (media_id, person_id, role) VALUES (?, ?, 'director')`).run(
      film,
      director
    )
    db.prepare(`INSERT INTO credit (media_id, person_id, role) VALUES (?, ?, 'director')`).run(
      show,
      director
    )

    decoyTitles.forEach((mediaId, index) => {
      addRole(mediaId, addActor(`Decoy Actor ${index + 1}`), `Decoy Role ${index + 1}`, index)
    })

    const questions = quizRepo.challengePool({
      kind: 'connections',
      seed: 12,
      statuses: ['Completed'],
      length: 10
    })
    expect(questions).toHaveLength(1)
    const [question] = questions
    expect(question.kind).toBe('connections')
    if (question.kind !== 'connections') return
    expect([question.titleA.label, question.titleB.label].sort()).toEqual(['Film', 'Show'])
    expect(new Set(question.validKeys)).toEqual(new Set([String(shared), String(director)]))
    expect(question.choices).toHaveLength(4)
    expect(question.choices.map((choice) => choice.key)).not.toContain(String(lowerBilled))
    expect(question.reveal).toContain('Film: Film Lead')
    expect(question.reveal).toContain('Show: Show Lead')
    expect(question.reveal).toContain('Shared Director — Film: director; Show: director')
    expect(question.reveal).not.toContain('Anime Role')
    expect(quizRepo.availability({ statuses: ['Completed'] }).connections).toBe(1)
  })
})

describe('quizRepo Chronology challenge pool', () => {
  it('uses resolved franchise components and keeps availability aligned with buildable sets', () => {
    const ids = Array.from({ length: 5 }, (_, index) => Number(
      db.prepare(
        `INSERT INTO media_item
           (media_type, title, status, cover_path, release_date, external_source, external_id)
         VALUES ('movie', ?, 'Completed', ?, ?, 'test', ?)`
      ).run(
        `Series ${index + 1}`,
        `media/series-${index + 1}.jpg`,
        `${2000 + index}-06-01`,
        String(index + 1)
      ).lastInsertRowid
    ))
    for (let index = 0; index < ids.length - 1; index++) {
      db.prepare(
        `INSERT INTO media_relation
           (media_id, relation_type, related_source, related_external_id)
         VALUES (?, 'SEQUEL', 'test', ?)`
      ).run(ids[index], String(index + 2))
    }

    const request = {
      kind: 'chronology' as const,
      seed: 9,
      statuses: ['Completed'],
      length: 5
    }
    const questions = quizRepo.challengePool(request)
    expect(questions).toHaveLength(5)
    expect(questions.every((question) =>
      question.kind === 'chronology' && question.connectionLabel === 'Same franchise'
    )).toBe(true)
    expect(quizRepo.availability({ statuses: ['Completed'] }).chronology).toBe(5)
  })
})

describe('quizRepo session history', () => {
  it('filters history by kind and orders recent newest-first', () => {
    quizRepo.logSession({ kind: 'song', score: 3, total: 5, bestStreak: 2 })
    quizRepo.logSession({ kind: 'japanese', score: 9, total: 10, bestStreak: 6 })
    const second = quizRepo.logSession({ kind: 'song', score: 4, total: 5, bestStreak: 3 })

    const h = quizRepo.history('song')
    expect(h.totalSessions).toBe(2)
    expect(h.recent.map((s) => s.id)[0]).toBe(second) // newest first
    expect(h.recent.every((s) => s.kind === 'song')).toBe(true)
    expect(quizRepo.history('japanese').totalSessions).toBe(1)
  })

  it('respects the recent limit', () => {
    for (let i = 0; i < 20; i++) {
      quizRepo.logSession({ kind: 'song', score: i, total: 20, bestStreak: 1 })
    }
    expect(quizRepo.history('song').recent).toHaveLength(15)
    expect(quizRepo.history('song').totalSessions).toBe(20)
  })

  it('ignores rounds under 5 questions for the personal best', () => {
    quizRepo.logSession({ kind: 'song', score: 1, total: 1, bestStreak: 1 }) // lucky 1/1
    const real = quizRepo.logSession({ kind: 'song', score: 8, total: 10, bestStreak: 4 })
    const h = quizRepo.history('song')
    expect(h.best?.id).toBe(real)
    expect(h.best?.score).toBe(8)
  })

  it('allows one-route Movie Chain sessions to set difficulty-specific records', () => {
    const easy = quizRepo.logSession({
      kind: 'movieChainEasy',
      score: 900,
      total: 1,
      bestStreak: 0,
      settings: { correct: 1, attempted: 1, playMode: 'solo', scorePolicy: 'points' }
    })
    const hard = quizRepo.logSession({
      kind: 'movieChainHard',
      score: 700,
      total: 1,
      bestStreak: 0,
      settings: { correct: 1, attempted: 1, playMode: 'solo', scorePolicy: 'points' }
    })
    expect(quizRepo.history('movieChainEasy').best?.id).toBe(easy)
    expect(quizRepo.history('movieChainHard').best?.id).toBe(hard)
    expect(quizRepo.history('movieChainNormal').best).toBeNull()
  })

  it('breaks accuracy ties by longer round, and tracks the max streak overall', () => {
    quizRepo.logSession({ kind: 'song', score: 4, total: 5, bestStreak: 9 })
    const longer = quizRepo.logSession({ kind: 'song', score: 8, total: 10, bestStreak: 2 })
    const h = quizRepo.history('song')
    expect(h.best?.id).toBe(longer) // same 80%, longer round wins
    expect(h.bestStreak).toBe(9) // streak record survives from the other round
  })

  it('round-trips the settings snapshot and nulls malformed JSON', () => {
    const id = quizRepo.logSession({
      kind: 'song',
      score: 5,
      total: 5,
      bestStreak: 5,
      settings: { songType: 'OP', length: 5 }
    })
    db.prepare(`UPDATE quiz_session SET settings = 'not-json' WHERE id != ?`).run(id)
    const h = quizRepo.history('song')
    expect(h.recent[0].settings).toEqual({ songType: 'OP', length: 5 })

    quizRepo.logSession({ kind: 'song', score: 1, total: 5, bestStreak: 1 })
    db.prepare(`UPDATE quiz_session SET settings = '{bad'`).run()
    expect(quizRepo.history('song').recent[0].settings).toBeNull()
  })

  it('keeps tournament sessions isolated and round-trips the bracket settings', () => {
    quizRepo.logSession({ kind: 'song', score: 3, total: 5, bestStreak: 2 })
    quizRepo.logSession({
      kind: 'tournament',
      score: 16,
      total: 16,
      bestStreak: 0,
      settings: {
        sourceLabel: 'Characters · Frieren',
        poolSize: 16,
        champion: { key: 'character-3', name: 'Fern', imagePath: null },
        runnerUp: { key: 'character-7', name: 'Stark' }
      }
    })

    const h = quizRepo.history('tournament')
    expect(h.totalSessions).toBe(1)
    expect(h.recent[0].settings?.champion).toEqual({
      key: 'character-3',
      name: 'Fern',
      imagePath: null
    })
    expect(h.recent[0].settings?.sourceLabel).toBe('Characters · Frieren')
    expect(quizRepo.history('song').totalSessions).toBe(1)
  })

  it('reports an empty history cleanly', () => {
    expect(quizRepo.history('song')).toEqual({
      recent: [],
      best: null,
      bestStreak: 0,
      totalSessions: 0
    })
  })

  it('keeps party sessions out of solo records and treats legacy rows as solo', () => {
    const legacy = quizRepo.logSession({ kind: 'song', score: 4, total: 5, bestStreak: 4 })
    const party = quizRepo.logSession({
      kind: 'song',
      score: 8,
      total: 10,
      bestStreak: 0,
      settings: { playMode: 'party', correct: 8 }
    })
    expect(quizRepo.history('song').recent.map((s) => s.id)).toEqual([legacy])
    const partyHistory = quizRepo.history('song', 15, 'party')
    expect(partyHistory.recent.map((s) => s.id)).toEqual([party])
    expect(partyHistory.best).toBeNull()
  })

  it('ranks score-ranked kinds (arcade, shiritori, races) by score first', () => {
    expect([...quizRepo.SCORE_RANKED_KINDS].sort()).toEqual(
      [
        'conjRace',
        'footballPlayerGrid',
        'higherLower',
        'imageReveal',
        'libraryGrid',
        'libraryle',
        'linkWall',
        'movieChainEasy',
        'movieChainHard',
        'movieChainNormal',
        'mysteryCareer',
        'guessTrackMusic',
        'guessTrackTheme',
        'kanaRace',
        'readingRace',
        'shiritori',
        'songArcade'
      ].sort()
    )
    // 2000 points at 60% accuracy must beat 3000 points at 50% — and the
    // reverse of that must NOT win on ratio.
    quizRepo.logSession({ kind: 'songArcade', score: 2000, total: 12, bestStreak: 6 })
    const big = quizRepo.logSession({ kind: 'songArcade', score: 3000, total: 24, bestStreak: 7 })
    expect(quizRepo.history('songArcade').best?.id).toBe(big)
    // accuracy kinds still rank by ratio: 3/5 beats 4/10
    quizRepo.logSession({ kind: 'songReverse', score: 4, total: 10, bestStreak: 2 })
    const sharper = quizRepo.logSession({ kind: 'songReverse', score: 3, total: 5, bestStreak: 3 })
    expect(quizRepo.history('songReverse').best?.id).toBe(sharper)
  })
})
