import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import * as tagRepo from '../src/main/repos/tagRepo'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

beforeEach(() => {
  db = createTestDb()
})

function addMedia(type: string, title: string): number {
  return Number(
    db
      .prepare(`INSERT INTO media_item (media_type, title) VALUES (?, ?)`)
      .run(type, title).lastInsertRowid
  )
}

function tagMedia(tagId: number, mediaId: number): void {
  db.prepare(`INSERT INTO media_tag (media_id, tag_id) VALUES (?, ?)`).run(mediaId, tagId)
}

describe('tagRepo browse queries', () => {
  it('get returns the tag or null', () => {
    const id = tagRepo.upsert({ name: 'Space', category: 'genre' })
    expect(tagRepo.get(id)).toEqual({ id, name: 'Space', category: 'genre' })
    expect(tagRepo.get(9999)).toBeNull()
  })

  it('listWithCounts groups counts per media type and keeps unused tags at 0', () => {
    const space = tagRepo.upsert({ name: 'Space' })
    const unused = tagRepo.upsert({ name: 'Unused' })
    tagMedia(space, addMedia('anime', 'Bebop'))
    tagMedia(space, addMedia('anime', 'Trigun'))
    tagMedia(space, addMedia('movie', 'Interstellar'))

    const tags = tagRepo.listWithCounts()
    const s = tags.find((t) => t.id === space)!
    expect(s.total).toBe(3)
    expect(new Map(s.counts.map((c) => [c.mediaType, c.count]))).toEqual(
      new Map([
        ['anime', 2],
        ['movie', 1]
      ])
    )
    const u = tags.find((t) => t.id === unused)!
    expect(u.total).toBe(0)
    expect(u.counts).toEqual([])
  })

  it('media returns cross-type items ordered by type then title', () => {
    const space = tagRepo.upsert({ name: 'Space' })
    const other = tagRepo.upsert({ name: 'Other' })
    tagMedia(space, addMedia('movie', 'Interstellar'))
    tagMedia(space, addMedia('anime', 'Trigun'))
    tagMedia(space, addMedia('anime', 'Bebop'))
    tagMedia(other, addMedia('anime', 'Untagged-for-space'))

    const items = tagRepo.media(space)
    expect(items.map((m) => m.title)).toEqual(['Bebop', 'Trigun', 'Interstellar'])
  })

  it('deleting a media item cascades its media_tag rows out of the counts', () => {
    const space = tagRepo.upsert({ name: 'Space' })
    const id = addMedia('anime', 'Bebop')
    tagMedia(space, id)
    db.prepare('DELETE FROM media_item WHERE id = ?').run(id)
    expect(tagRepo.listWithCounts().find((t) => t.id === space)!.total).toBe(0)
    expect(tagRepo.media(space)).toEqual([])
  })
})
