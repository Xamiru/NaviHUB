import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import * as quizRepo from '../src/main/repos/quizRepo'
import { runQuizPoolRequest } from '../src/main/quizPoolsCore'
import type { VaQuizQuestionSeed } from '../src/shared/vaQuiz'

let db: Database.Database
vi.mock('../src/main/db/sqliteHandle', () => ({
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
      .prepare(`INSERT INTO media_character (media_id, character_id, sort_order) VALUES (?, ?, 0)`)
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

function addTag(mediaId: number, name: string, category: string | null = null): void {
  const tagId = Number(db.prepare(`INSERT INTO tag (name, category) VALUES (?, ?)`).run(name, category).lastInsertRowid)
  db.prepare(`INSERT INTO media_tag (media_id, tag_id) VALUES (?, ?)`).run(mediaId, tagId)
}

describe('quizRepo.castPool', () => {
  it('asks only about the first five billed, movies and TV alike, and retains all appearances', () => {
    const movieLead = addMedia('Movie Lead', { type: 'movie' })
    const movieSixth = addMedia('Movie Sixth', { type: 'movie' })
    const showRegular = addMedia('Show Regular', { type: 'tv' })
    const showGuest = addMedia('Show Guest', { type: 'tv' })
    const anime = addMedia('Anime', { type: 'anime' })
    const actor = addPerson('Working Actor', 'people/actor.webp')
    const noPhoto = addPerson('No Photo', null)

    addActorCredit(movieLead, actor, 4)
    addActorCredit(movieSixth, actor, 5)
    addActorCredit(showRegular, actor, 1)
    // TV credits run 30 deep into one-off guests; those never seed a question.
    addActorCredit(showGuest, actor, 22)
    addActorCredit(anime, actor, 0)
    addActorCredit(movieLead, noPhoto, 0)

    const pool = quizRepo.castPool()
    expect(pool.map((item) => item.mediaTitle)).toEqual(['Movie Lead', 'Show Regular'])
    expect(pool[0]).toMatchObject({
      personName: 'Working Actor',
      photoPath: 'people/actor.webp',
      mediaType: 'movie',
      billingOrder: 4
    })
    // Every screen credit still guards the wrong options.
    expect(pool[0].validMediaIds).toEqual([movieLead, movieSixth, showRegular, showGuest])
  })

  it('never asks about a voice role but keeps the voiced title as a valid answer', () => {
    const film = addMedia('Live Film', { type: 'movie' })
    const cartoon = addMedia('Cartoon', { type: 'movie' })
    addTag(cartoon, 'Animation', 'genre')
    const actor = addPerson('Star', 'people/star.webp')
    addActorCredit(film, actor, 0)
    addActorCredit(cartoon, actor, 0)

    const pool = quizRepo.castPool()
    expect(pool.map((item) => item.mediaTitle)).toEqual(['Live Film'])
    // The cartoon can never be offered as a wrong answer for this actor.
    expect(pool[0].validMediaIds).toEqual([film, cartoon])
  })

  it('treats only the Animation genre as animated, not a stray tag of that name', () => {
    const film = addMedia('Behind the Scenes', { type: 'movie' })
    addTag(film, 'Animation')
    const actor = addPerson('Host', 'people/host.webp')
    addActorCredit(film, actor, 0)

    expect(quizRepo.castPool().map((item) => item.mediaTitle)).toEqual(['Behind the Scenes'])
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

describe('quiz pool process requests', () => {
  function addVoicedRole(index: number, personId: number): void {
    const mediaId = addMedia(`Anime ${index}`)
    const characterId = addCharacter(`Character ${index}`, `characters/${index}.webp`, 'female')
    // Linked with a cast rank, so the character counts as well known.
    linkCharacter(mediaId, characterId)
    addCredit(mediaId, personId, characterId)
  }

  it('deals VA rounds from a pool kept until the library changes', () => {
    const people = [addPerson('VA One', null), addPerson('VA Two', null), addPerson('VA Three', null)]
    for (let i = 0; i < 6; i++) addVoicedRole(i, people[i % 3])
    const deal = (count: number) =>
      runQuizPoolRequest('vaQuestions', [{ statuses: null }, count, 7]) as VaQuizQuestionSeed[]

    expect(deal(3)).toHaveLength(3)
    expect(deal(3)).toEqual(deal(3))
    expect(deal(8)).toHaveLength(6)
    const extra = addPerson('VA Four', null)
    addVoicedRole(6, extra)
    addVoicedRole(7, extra)
    expect(deal(8)).toHaveLength(8)
  })

  it('answers the same reads as the repo and refuses anything else', () => {
    addMedia('Film', { type: 'movie', status: 'Completed' })
    expect(runQuizPoolRequest('availability', [{}])).toEqual(quizRepo.availability({}))
    expect(runQuizPoolRequest('castPool', [{}])).toEqual(quizRepo.castPool({}))
    expect(() => runQuizPoolRequest('logSession', [{ kind: 'cast', score: 1, total: 1 }])).toThrow(
      'Unknown quiz request'
    )
    expect(() => runQuizPoolRequest('toString', [])).toThrow('Unknown quiz request')
  })
})

describe('quiz pool creditTime (/stats people and studios)', () => {
  const cfg = {
    animeEp: 24,
    tvEp: 40,
    mangaCh: 5,
    bookPage: 1.5,
    completed: { anime: 'Completed', movie: 'Watched', manga: 'Completed' }
  }

  function title(
    name: string,
    type: string,
    fields: { status?: string; total?: number; progress?: number } = {}
  ): number {
    return Number(
      db
        .prepare(
          `INSERT INTO media_item (media_type, title, status, total_units, progress)
           VALUES (?, ?, ?, ?, ?)`
        )
        .run(type, name, fields.status ?? null, fields.total ?? null, fields.progress ?? 0)
        .lastInsertRowid
    )
  }
  const person = (name: string) =>
    Number(db.prepare('INSERT INTO person (name) VALUES (?)').run(name).lastInsertRowid)
  const credit = (mediaId: number, personId: number, role: string) =>
    db
      .prepare('INSERT INTO credit (media_id, person_id, role) VALUES (?, ?, ?)')
      .run(mediaId, personId, role)
  const groups = () =>
    runQuizPoolRequest('creditTime', [cfg]) as {
      key: string
      entries: { name: string; titleCount: number; coverPaths: string[] }[]
    }[]

  it('ranks people by consumed titles, not their length, one count per title', () => {
    const long = title('Long show', 'anime', { status: 'Completed', total: 500 })
    const shortA = title('Short A', 'anime', { progress: 5 })
    const shortB = title('Short B', 'anime', { status: 'Completed', total: 12 })
    const planned = title('Planned', 'anime', { status: 'Plan to Watch', total: 100 })
    const kana = person('Kana')
    const rie = person('Rie')
    // Three roles in one show still count that show once.
    credit(long, kana, 'voice_actor')
    credit(long, kana, 'voice_actor')
    credit(long, kana, 'voice_actor')
    credit(shortA, rie, 'voice_actor')
    credit(shortB, rie, 'voice_actor')
    credit(planned, kana, 'voice_actor')
    const voice = groups().find((g) => g.key === 'voice')!
    expect(voice.entries).toEqual([
      expect.objectContaining({ name: 'Rie', titleCount: 2, coverPaths: [] }),
      expect.objectContaining({ name: 'Kana', titleCount: 1 })
    ])
    expect(voice.entries[0]).not.toHaveProperty('minutes')
  })

  it('groups writers with mangaka and gives studios their best-scored covers', () => {
    const manga = title('Manga', 'manga', { status: 'Completed', total: 20 })
    const film = title('Film', 'movie', { status: 'Watched', total: 100 })
    credit(manga, person('Author'), 'mangaka')
    credit(film, person('Screenwriter'), 'writer')
    credit(film, person('Director'), 'director')
    const studio = Number(
      db.prepare("INSERT INTO company (name) VALUES ('Studio A')").run().lastInsertRowid
    )
    const link = db.prepare(
      "INSERT INTO media_company (media_id, company_id, role) VALUES (?, ?, 'production_studio')"
    )
    const setCover = db.prepare('UPDATE media_item SET cover_path = ?, score = ? WHERE id = ?')
    setCover.run('covers/film.jpg', 6, film)
    link.run(film, studio)
    for (const [i, score] of [8, null, 9, 7].entries()) {
      const id = title(`Show ${i}`, 'anime', { progress: 1 })
      setCover.run(`covers/${i}.jpg`, score, id)
      link.run(id, studio)
    }
    const nocover = title('No cover', 'anime', { progress: 1 })
    link.run(nocover, studio)
    const result = groups()
    // One title each; the earlier person wins the tie.
    expect(result.find((g) => g.key === 'writer')!.entries.map((e) => e.name)).toEqual([
      'Author',
      'Screenwriter'
    ])
    expect(result.find((g) => g.key === 'director')!.entries[0].titleCount).toBe(1)
    expect(result.find((g) => g.key === 'studio')!.entries[0]).toMatchObject({
      name: 'Studio A',
      titleCount: 6,
      coverPaths: ['covers/2.jpg', 'covers/0.jpg', 'covers/3.jpg']
    })
    // Empty groups are left out.
    expect(result.some((g) => g.key === 'actor')).toBe(false)
  })

  it('recomputes after the library changes', () => {
    const seen = title('Seen', 'anime', { progress: 2 })
    const later = title('Later', 'anime', { status: 'Plan to Watch' })
    const va = person('VA')
    credit(seen, va, 'voice_actor')
    credit(later, va, 'voice_actor')
    expect(groups()[0].entries[0].titleCount).toBe(1)
    db.prepare('UPDATE media_item SET progress = 1 WHERE id = ?').run(later)
    expect(groups()[0].entries[0].titleCount).toBe(2)
  })
})
