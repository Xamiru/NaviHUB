import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import * as searchRepo from '../src/main/repos/searchRepo'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))

beforeEach(() => {
  db = createTestDb()
})

describe('global search index', () => {
  it('finds title and native-name substrings through the trigram index', () => {
    db.prepare(`INSERT INTO media_item (media_type, title) VALUES ('anime', 'Serial Experiments Lain')`).run()
    db.prepare(`INSERT INTO person (name, name_native) VALUES ('Kana Hanazawa', '花澤香菜')`).run()

    expect(searchRepo.global('periments').media.map((item) => item.title)).toEqual([
      'Serial Experiments Lain'
    ])
    expect(searchRepo.global('澤香菜').people.map((person) => person.name)).toEqual([
      'Kana Hanazawa'
    ])
  })

  it('keeps the index current after updates and deletes', () => {
    const id = Number(
      db.prepare(`INSERT INTO company (name, type) VALUES ('Old Studio', 'studio')`).run()
        .lastInsertRowid
    )
    db.prepare(`UPDATE company SET name = 'New Studio' WHERE id = ?`).run(id)
    expect(searchRepo.global('Old Studio').companies).toHaveLength(0)
    expect(searchRepo.global('New Studio').companies).toHaveLength(1)
    db.prepare('DELETE FROM company WHERE id = ?').run(id)
    expect(searchRepo.global('New Studio').companies).toHaveLength(0)
  })

  it('treats LIKE wildcards literally in short queries', () => {
    db.prepare(`INSERT INTO character (name) VALUES ('100% Hero'), ('1000 Hero')`).run()
    expect(searchRepo.global('%').characters.map((character) => character.name)).toEqual([
      '100% Hero'
    ])
  })
})
