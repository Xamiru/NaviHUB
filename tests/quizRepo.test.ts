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

  it('reports an empty history cleanly', () => {
    expect(quizRepo.history('song')).toEqual({
      recent: [],
      best: null,
      bestStreak: 0,
      totalSessions: 0
    })
  })
})
