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

    const safe = quizRepo.availability({ scope: 'consumed', statuses: ['Completed'] })
    const all = quizRepo.availability({ scope: 'all' })
    expect(safe.song).toBe(1)
    expect(all.song).toBe(2)
    expect(safe.imageReveal).toBe(1)
    expect(all.higherLower).toBe(2)
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
        'higherLower',
        'imageReveal',
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
