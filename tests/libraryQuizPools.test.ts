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

function addCharacter(name: string, image: string | null): number {
  return Number(
    db.prepare(`INSERT INTO character (name, image_path) VALUES (?, ?)`).run(name, image)
      .lastInsertRowid
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
  language = 'Japanese'
): number {
  return Number(
    db
      .prepare(
        `INSERT INTO credit (media_id, person_id, character_id, role, language) VALUES (?, ?, ?, 'voice_actor', ?)`
      )
      .run(mediaId, personId, characterId, language).lastInsertRowid
  )
}

function addTag(mediaId: number, name: string): void {
  const tagId = Number(db.prepare(`INSERT INTO tag (name) VALUES (?)`).run(name).lastInsertRowid)
  db.prepare(`INSERT INTO media_tag (media_id, tag_id) VALUES (?, ?)`).run(mediaId, tagId)
}

describe('quizRepo.characterPool', () => {
  it('returns imaged characters paired with their title, deduped per character', () => {
    const a = addMedia('Frieren')
    const b = addMedia('Frieren S2', { status: 'Watching' })
    const ch = addCharacter('Fern', 'char/fern.webp')
    addCharacter('NoImage', null) // excluded — no portrait

    // First link wins even though the second one sorts later.
    linkCharacter(a, ch)
    linkCharacter(b, ch)

    // Imaged but on a coverless title — the options grid needs covers.
    const noCover = addMedia('Bare', { cover: null })
    const bareCh = addCharacter('Bare', 'char/bare.webp')
    linkCharacter(noCover, bareCh)

    const pool = quizRepo.characterPool()
    expect(pool).toHaveLength(1)
    expect(pool[0]).toMatchObject({
      characterId: ch,
      name: 'Fern',
      mediaTitle: 'Frieren',
      imagePath: 'char/fern.webp'
    })
    expect(pool[0].year).toBeNull()
    expect(pool[0].genres).toEqual([])
  })

  it('filters by watch status and carries year/genre affinity fields', () => {
    const watched = addMedia('Old', {
      status: 'Completed',
      releaseDate: '1998-04-01'
    })
    addTag(watched, 'Adventure')
    const planned = addMedia('New', { status: 'Planning', metadata: '{"seasonYear":2024}' })

    const ch1 = addCharacter('Heiter', 'char/h.webp')
    linkCharacter(watched, ch1)
    const ch2 = addCharacter('Stark', 'char/s.webp')
    linkCharacter(planned, ch2)

    expect(quizRepo.characterPool({ statuses: ['Completed'] }).map((c) => c.name)).toEqual([
      'Heiter'
    ])
    const all = quizRepo.characterPool()
    expect(all).toHaveLength(2)
    expect(all.find((c) => c.name === 'Heiter')).toMatchObject({ year: 1998, genres: ['Adventure'] })
    expect(all.find((c) => c.name === 'Stark')).toMatchObject({ year: 2024 })
  })
})

describe('quizRepo.vaPool', () => {
  it('keeps Japanese voice credits with imaged characters, deduped per character', () => {
    const m = addMedia('Frieren')
    const fern = addCharacter('Fern', 'char/fern.webp')
    const bare = addCharacter('Bare', null)

    const jp = Number(
      db.prepare(`INSERT INTO person (name, photo_path) VALUES ('Kana Ichinose', 'p/kana.webp')`)
        .run().lastInsertRowid
    )
    const en = Number(
      db.prepare(`INSERT INTO person (name) VALUES ('English Actor')`).run().lastInsertRowid
    )

    addCredit(m, jp, fern)
    addCredit(m, en, fern, 'English') // dub — excluded, "who voices X" must be unambiguous
    addCredit(m, jp, bare) // character has no portrait — unusable

    const pool = quizRepo.vaPool()
    expect(pool).toHaveLength(1)
    expect(pool[0]).toMatchObject({
      personId: jp,
      personName: 'Kana Ichinose',
      photoPath: 'p/kana.webp',
      characterName: 'Fern',
      characterImagePath: 'char/fern.webp',
      mediaTitle: 'Frieren'
    })
  })

  it('dedupes a character to its FIRST credit and filters by status', () => {
    const m1 = addMedia('Show One', { status: 'Completed' })
    const m2 = addMedia('Show Two', { status: 'Watching' })
    const ch = addCharacter('Vivy', 'char/vivy.webp')
    const p1 = Number(db.prepare(`INSERT INTO person (name) VALUES ('Asami Tano')`).run().lastInsertRowid)
    const p2 = Number(db.prepare(`INSERT INTO person (name) VALUES ('Someone Else')`).run().lastInsertRowid)
    addCredit(m1, p1, ch)
    addCredit(m2, p2, ch)

    expect(quizRepo.vaPool()).toHaveLength(1)
    expect(quizRepo.vaPool()[0].personName).toBe('Asami Tano') // lowest credit id wins
    // A status filter narrows the candidate rows FIRST, so the character is
    // then credited via its first matching-status appearance.
    expect(quizRepo.vaPool({ statuses: ['Watching'] })).toMatchObject([
      { personName: 'Someone Else' }
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
      genres: ['Action']
    })
  })
})
