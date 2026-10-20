import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import * as episodeFavoriteRepo from '../src/main/repos/episodeFavoriteRepo'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

beforeEach(() => {
  db = createTestDb()
})

function addAnime(title: string): number {
  return Number(
    db
      .prepare(`INSERT INTO media_item (media_type, title, progress) VALUES ('anime', ?, 3)`)
      .run(title).lastInsertRowid
  )
}

describe('episodeFavoriteRepo', () => {
  it('hearts and un-hearts episodes per title, ascending and idempotent', () => {
    const a = addAnime('Cowboy Bebop')
    const b = addAnime('Trigun')
    episodeFavoriteRepo.set(a, 5, true)
    episodeFavoriteRepo.set(a, 1, true)
    episodeFavoriteRepo.set(a, 5, true)
    episodeFavoriteRepo.set(b, 2, true)
    expect(episodeFavoriteRepo.list(a)).toEqual([1, 5])
    expect(episodeFavoriteRepo.list(b)).toEqual([2])

    episodeFavoriteRepo.set(a, 5, false)
    episodeFavoriteRepo.set(a, 9, false)
    expect(episodeFavoriteRepo.list(a)).toEqual([1])
  })

  it('needs no linked folder and survives the video rows going away', () => {
    const a = addAnime('Cowboy Bebop')
    db.prepare(
      `INSERT INTO video_file (media_id, file_path, title, number) VALUES (?, 'ep05.mkv', 'Ep 5', 5)`
    ).run(a)
    episodeFavoriteRepo.set(a, 5, true)
    db.prepare('DELETE FROM video_file WHERE media_id = ?').run(a)
    expect(episodeFavoriteRepo.list(a)).toEqual([5])
  })

  it('is a mark only: progress and status stay untouched', () => {
    const a = addAnime('Cowboy Bebop')
    episodeFavoriteRepo.set(a, 7, true)
    expect(db.prepare('SELECT progress, status FROM media_item WHERE id = ?').get(a)).toEqual({
      progress: 3,
      status: null
    })
  })

  it('goes with the title when it is deleted', () => {
    const a = addAnime('Cowboy Bebop')
    episodeFavoriteRepo.set(a, 1, true)
    db.prepare('DELETE FROM media_item WHERE id = ?').run(a)
    expect(db.prepare('SELECT COUNT(*) AS n FROM media_episode_favorite').get()).toEqual({ n: 0 })
  })

  it('rejects numbers that are not a positive whole episode', () => {
    const a = addAnime('Cowboy Bebop')
    expect(() => episodeFavoriteRepo.set(a, 0, true)).toThrow()
    expect(() => episodeFavoriteRepo.set(a, 1.5, true)).toThrow()
    expect(() => episodeFavoriteRepo.set(a, -2, true)).toThrow()
    expect(episodeFavoriteRepo.list(a)).toEqual([])
  })
})
