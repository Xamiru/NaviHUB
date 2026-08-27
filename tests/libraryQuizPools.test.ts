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

function addMedia(
  title: string,
  opts: {
    type?: string
    status?: string | null
    cover?: string | null
    releaseDate?: string | null
    metadata?: string | null
    synopsis?: string | null
  } = {}
): number {
  return Number(
    db
      .prepare(
        `INSERT INTO media_item (media_type, title, status, cover_path, release_date, metadata, synopsis)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        opts.type ?? 'anime',
        title,
        opts.status ?? null,
        // undefined = default cover; explicit null expresses a coverless title
        opts.cover === undefined ? 'media/cover.webp' : opts.cover,
        opts.releaseDate ?? null,
        opts.metadata ?? null,
        opts.synopsis ?? null
      ).lastInsertRowid
  )
}

function addCharacter(name: string, image: string | null, gender: string | null = null): number {
  return Number(
    db.prepare(`INSERT INTO character (name, image_path, gender) VALUES (?, ?, ?)`).run(name, image, gender)
      .lastInsertRowid
  )
}

function addPerson(name: string, photo: string | null): number {
  return Number(
    db.prepare(`INSERT INTO person (name, photo_path) VALUES (?, ?)`).run(name, photo).lastInsertRowid
  )
}

function addActorCredit(mediaId: number, personId: number, billingOrder: number | null): number {
  return Number(
    db
      .prepare(`INSERT INTO credit (media_id, person_id, role, importance) VALUES (?, ?, 'actor', ?)`)
      .run(mediaId, personId, billingOrder).lastInsertRowid
  )
}

function linkCharacter(mediaId: number, characterId: number): number {
  return Number(
    db
      .prepare(`INSERT INTO media_character (media_id, character_id) VALUES (?, ?)`)
      .run(mediaId, characterId).lastInsertRowid
  )
}

function addCredit(
  mediaId: number,
  personId: number,
  characterId: number,
  language = 'Japanese',
  importance: number | null = null
): number {
  return Number(
    db
      .prepare(
        `INSERT INTO credit
           (media_id, person_id, character_id, role, language, importance)
         VALUES (?, ?, ?, 'voice_actor', ?, ?)`
      )
      .run(mediaId, personId, characterId, language, importance).lastInsertRowid
  )
}

function addTag(mediaId: number, name: string): void {
  const tagId = Number(db.prepare(`INSERT INTO tag (name) VALUES (?)`).run(name).lastInsertRowid)
  db.prepare(`INSERT INTO media_tag (media_id, tag_id) VALUES (?, ?)`).run(mediaId, tagId)
}

describe('quizRepo.castPool', () => {
  it('uses top-ten movie billing, uncapped TV cast, and retains all appearances', () => {
    const movieLead = addMedia('Movie Lead', { type: 'movie' })
    const movieExtra = addMedia('Movie Extra', { type: 'movie' })
    const show = addMedia('Long-running Show', { type: 'tv' })
    const anime = addMedia('Anime', { type: 'anime' })
    const actor = addPerson('Working Actor', 'people/actor.webp')
    const noPhoto = addPerson('No Photo', null)

    addActorCredit(movieLead, actor, 9)
    addActorCredit(movieExtra, actor, 10)
    addActorCredit(show, actor, 45)
    addActorCredit(anime, actor, 0)
    addActorCredit(movieLead, noPhoto, 0)

    const pool = quizRepo.castPool()
    expect(pool.map((item) => item.mediaTitle)).toEqual(['Movie Lead', 'Long-running Show'])
    expect(pool[0]).toMatchObject({
      personName: 'Working Actor',
      photoPath: 'people/actor.webp',
      mediaType: 'movie',
      billingOrder: 9
    })
    expect(pool[0].validMediaIds).toEqual([movieLead, movieExtra, show])
  })

  it('filters by completed status and carries title affinity fields', () => {
    const watched = addMedia('Old Movie', {
      type: 'movie',
      status: 'Completed',
      releaseDate: '1998-04-01'
    })
    addTag(watched, 'Adventure')
    const planned = addMedia('New Show', {
      type: 'tv',
      status: 'Planning',
      metadata: '{"seasonYear":2024}'
    })
    const actor = addPerson('Lead', 'people/lead.webp')
    addActorCredit(watched, actor, 0)
    addActorCredit(planned, actor, 0)

    expect(quizRepo.castPool({ statuses: ['Completed'] })).toMatchObject([
      { mediaTitle: 'Old Movie', year: 1998, genres: ['Adventure'], validMediaIds: [watched] }
    ])
    expect(quizRepo.castPool()).toMatchObject([
      { mediaTitle: 'Old Movie', validMediaIds: [watched, planned] },
      { mediaTitle: 'New Show', year: 2024, validMediaIds: [watched, planned] }
    ])
  })
})

describe('quizRepo.vaPool', () => {
  it('groups every Japanese VA onto one imaged anime character appearance', () => {
    const m = addMedia('Frieren', { releaseDate: '2023-09-29' })
    const fern = addCharacter('Fern', 'char/fern.webp', 'female')
    const bare = addCharacter('Bare', null)

    const jp = Number(
      db.prepare(`INSERT INTO person (name, photo_path) VALUES ('Kana Ichinose', 'p/kana.webp')`)
        .run().lastInsertRowid
    )
    const jpAlternate = Number(
      db.prepare(`INSERT INTO person (name) VALUES ('Alternate Japanese VA')`).run().lastInsertRowid
    )
    const en = Number(
      db.prepare(`INSERT INTO person (name) VALUES ('English Actor')`).run().lastInsertRowid
    )

    addCredit(m, jp, fern, 'Japanese', 1)
    addCredit(m, jpAlternate, fern, 'Japanese', 1)
    addCredit(m, en, fern, 'English') // dub credit — excluded from the Japanese connection graph
    addCredit(m, jp, bare) // character has no portrait — unusable

    const pool = quizRepo.vaPool()
    expect(pool).toHaveLength(1)
    expect(pool[0]).toMatchObject({
      characterName: 'Fern',
      characterImagePath: 'char/fern.webp',
      gender: 'female',
      mediaTitle: 'Frieren',
      year: 2023,
      importance: 1,
      personIds: [jp, jpAlternate],
      personNames: ['Kana Ichinose', 'Alternate Japanese VA']
    })
  })

  it('is anime-only, preserves title appearances, and filters by status', () => {
    const m1 = addMedia('Show One', { status: 'Completed' })
    const m2 = addMedia('Show Two', { status: 'Watching' })
    const movie = addMedia('Animated Movie', { type: 'movie', status: 'Completed' })
    const ch = addCharacter('Vivy', 'char/vivy.webp')
    const p1 = Number(db.prepare(`INSERT INTO person (name) VALUES ('Asami Tano')`).run().lastInsertRowid)
    const p2 = Number(db.prepare(`INSERT INTO person (name) VALUES ('Someone Else')`).run().lastInsertRowid)
    addCredit(m1, p1, ch)
    addCredit(m2, p2, ch)
    addCredit(movie, p1, ch)

    expect(quizRepo.vaPool()).toHaveLength(2)
    expect(quizRepo.vaPool().map((r) => r.personNames)).toEqual([['Asami Tano'], ['Someone Else']])
    expect(quizRepo.vaPool({ statuses: ['Watching'] })).toMatchObject([
      { mediaTitle: 'Show Two', personNames: ['Someone Else'] }
    ])
  })
})

describe('quizRepo.synopsisPool', () => {
  it('requires a synopsis of usable length and a cover', () => {
    addMedia('Long enough', { synopsis: 'x'.repeat(120), type: 'movie' })
    addMedia('Too short', { synopsis: 'x'.repeat(119), type: 'movie' })
    addMedia('No text', { type: 'movie' })
    addMedia('No cover', { synopsis: 'y'.repeat(150), cover: null, type: 'movie' })

    expect(quizRepo.synopsisPool().map((s) => s.title)).toEqual(['Long enough'])
  })

  it('filters by media type and status, returning affinity fields', () => {
    const anime = addMedia('Anime One', {
      type: 'anime',
      status: 'Completed',
      releaseDate: '2013-04-01',
      synopsis: 'a'.repeat(200)
    })
    addTag(anime, 'Action')
    addMedia('Movie One', { type: 'movie', status: 'Completed', synopsis: 'b'.repeat(200) })
    addMedia('Game One', { type: 'game', status: 'Playing', synopsis: 'c'.repeat(200) })

    const byType = quizRepo.synopsisPool({ mediaTypes: ['movie'] })
    expect(byType.map((s) => s.title)).toEqual(['Movie One'])

    const watched = quizRepo.synopsisPool({ statuses: ['Completed'] })
    expect(watched.map((s) => s.title).sort()).toEqual(['Anime One', 'Movie One'])

    const everything = quizRepo.synopsisPool()
    expect(everything).toHaveLength(3)
    expect(everything.find((s) => s.title === 'Anime One')).toMatchObject({
      year: 2013,
      genres: ['Action'],
      status: 'Completed',
      relationAliases: [],
      characterNames: [],
      hasEarlierRelation: false
    })
  })

  it('includes unfinished first entries but excludes unfinished sequels', () => {
    addMedia('Completed Sequel Season 2', {
      status: 'Completed',
      synopsis: 'a'.repeat(150)
    })
    addMedia('Planned First Story', {
      status: 'Planning',
      synopsis: 'b'.repeat(150)
    })
    addMedia('Planned Story Season 2', {
      status: 'Planning',
      synopsis: 'c'.repeat(150)
    })
    const relatedSequel = addMedia('Planned Unnumbered Follow-up', {
      status: 'Planning',
      synopsis: 'd'.repeat(150)
    })
    db.prepare(
      `INSERT INTO media_relation
       (media_id, relation_type, related_source, related_external_id, related_title)
       VALUES (?, 'PREQUEL', 'anilist', 'old-1', 'Original Story')`
    ).run(relatedSequel)

    const safe = quizRepo.synopsisPool({
      completedStatuses: ['Completed'],
      includeSafeUnseen: true
    })
    expect(safe.map((item) => item.title)).toEqual([
      'Completed Sequel Season 2',
      'Planned First Story'
    ])
  })

  it('returns relation and character aliases for redaction and can include coverless text seeds', () => {
    const mediaId = addMedia('Code Geass R2', {
      status: 'Completed',
      synopsis: 'x'.repeat(150),
      cover: null
    })
    db.prepare(
      `INSERT INTO media_relation
       (media_id, relation_type, related_source, related_external_id, related_title)
       VALUES (?, 'PREQUEL', 'anilist', '1', 'Code Geass: Lelouch of the Rebellion')`
    ).run(mediaId)
    const characterId = addCharacter('Lelouch Lamperouge', null)
    db.prepare(`UPDATE character SET name_native='ルルーシュ' WHERE id=?`).run(characterId)
    linkCharacter(mediaId, characterId)

    expect(quizRepo.synopsisPool({ requireCover: false })).toMatchObject([
      {
        title: 'Code Geass R2',
        relationAliases: ['Code Geass: Lelouch of the Rebellion'],
        characterNames: ['Lelouch Lamperouge', 'ルルーシュ'],
        hasEarlierRelation: true
      }
    ])
  })
})
