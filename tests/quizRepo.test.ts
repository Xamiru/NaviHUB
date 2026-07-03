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
