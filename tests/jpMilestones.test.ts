import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))

import { jpMilestones } from '../src/main/repos/mediaRepo'

beforeEach(() => {
  db = createTestDb()
})

function addMedia(type: string, title: string, status: string | null): number {
  const info = db
    .prepare('INSERT INTO media_item (media_type, title, status) VALUES (?, ?, ?)')
    .run(type, title, status)
  return info.lastInsertRowid as number
}

function addChapter(mediaId: number, dirPath: string): void {
  db.prepare(
    'INSERT INTO manga_chapter (media_id, dir_path, title, page_count, sort_order) VALUES (?, ?, ?, 1, 0)'
  ).run(mediaId, dirPath, 'ch')
}

describe('jpMilestones', () => {
  it('counts completed anime and splits novels (EPUB-backed) from manga', () => {
    addMedia('anime', 'A1', 'Completed')
    addMedia('anime', 'A2', 'Completed')
    addMedia('anime', 'A3', 'Watching') // default in-progress, not counted
    addMedia('anime', 'A4', null) // NULL status never counts

    const novel = addMedia('manga', 'LN', 'Completed')
    addChapter(novel, 'manga/ln/book.epub')
    const comic = addMedia('manga', 'M1', 'Completed')
    addChapter(comic, 'manga/m1/ch1')
    addMedia('manga', 'M2', 'Completed') // completed, no local chapters -> manga
    addMedia('manga', 'M3', 'Reading')

    expect(jpMilestones()).toEqual({
      animeCompleted: 2,
      mangaCompleted: 2,
      novelsCompleted: 1
    })
  })

  it('resolves RENAMED statuses positionally (index 1 = completed)', () => {
    db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run(
      'anime.statuses',
      JSON.stringify(['grinding', 'conquered', 'dropped', 'someday'])
    )
    addMedia('anime', 'A1', 'conquered')
    addMedia('anime', 'A2', 'Completed') // the default name no longer counts
    expect(jpMilestones().animeCompleted).toBe(1)
  })

  it('EPUB detection is case-insensitive on the extension', () => {
    db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run(
      'manga.statuses',
      JSON.stringify(['reading', 'finished'])
    )
    const novel = addMedia('manga', 'LN', 'finished')
    addChapter(novel, 'manga/ln/Book.EPUB')
    expect(jpMilestones()).toMatchObject({ novelsCompleted: 1, mangaCompleted: 0 })
  })
})
