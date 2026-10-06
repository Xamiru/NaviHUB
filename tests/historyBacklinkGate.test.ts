import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import lock from '../src/shared/history/content/ids.lock.json'

// Media detail pages ask for History backlinks on every visit; the gate keeps
// titles with no curated media file and no personal link from loading the
// content catalog at all.

let db: Database.Database

vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))

import { mayHaveBacklinks } from '../src/main/history/historyBacklinkGate'
import * as repo from '../src/main/repos/historyRepo'

beforeEach(() => {
  db = createTestDb()
})

function addMedia(id: number, source: string | null, externalId: string | null): void {
  db.prepare(
    "INSERT INTO media_item (id, media_type, title, external_source, external_id) VALUES (?, 'movie', 'A film', ?, ?)"
  ).run(id, source, externalId)
}

describe('History backlink gate', () => {
  it('passes a title with a curated media file', () => {
    const curated = lock.ids.find((id) => id.startsWith('media:tmdb-movie-'))!
    addMedia(1, 'tmdb', curated.slice('media:tmdb-movie-'.length))
    expect(mayHaveBacklinks(1)).toBe(true)
  })

  it('stops a title with neither a curated file nor a personal link', () => {
    addMedia(2, 'tmdb', '999999999')
    addMedia(3, null, null)
    expect(mayHaveBacklinks(2)).toBe(false)
    expect(mayHaveBacklinks(3)).toBe(false)
    expect(mayHaveBacklinks(404)).toBe(false)
  })

  it('passes a title the user linked by hand', () => {
    addMedia(4, null, null)
    repo.addPersonalLink('event:x', 4, 'set-during')
    expect(mayHaveBacklinks(4)).toBe(true)
  })
})
