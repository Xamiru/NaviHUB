import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import * as listRepo from '../src/main/repos/listRepo'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

beforeEach(() => {
  db = createTestDb()
})

function addMedia(title: string): number {
  return Number(
    db
      .prepare(`INSERT INTO media_item (media_type, title) VALUES ('anime', ?)`)
      .run(title).lastInsertRowid
  )
}

describe('listRepo', () => {
  it('creates a list and appends items in order', () => {
    const listId = listRepo.create({ title: 'Top anime', kind: 'media', ranked: true })
    const [a, b, c] = [addMedia('A'), addMedia('B'), addMedia('C')]
    listRepo.addItem(listId, a)
    listRepo.addItem(listId, b)
    listRepo.addItem(listId, c, 'a note')

    const detail = listRepo.get(listId)!
    expect(detail.ranked).toBe(true)
    expect(detail.items.map((i) => i.name)).toEqual(['A', 'B', 'C'])
    expect(detail.items[2].note).toBe('a note')
  })

  it('addItem is idempotent per (list, entity)', () => {
    const listId = listRepo.create({ title: 'L', kind: 'media' })
    const a = addMedia('A')
    const first = listRepo.addItem(listId, a)
    const again = listRepo.addItem(listId, a)
    expect(again).toBe(first)
    expect(listRepo.get(listId)!.items).toHaveLength(1)
  })

  it('reorder persists the new order atomically', () => {
    const listId = listRepo.create({ title: 'L', kind: 'media' })
    ;['A', 'B', 'C'].forEach((t) => listRepo.addItem(listId, addMedia(t)))
    const items = listRepo.get(listId)!.items
    listRepo.reorder(listId, [items[2].itemId, items[0].itemId, items[1].itemId])
    expect(listRepo.get(listId)!.items.map((i) => i.name)).toEqual(['C', 'A', 'B'])
  })

  it('list() reports item counts and preview images per kind', () => {
    const mediaList = listRepo.create({ title: 'Media', kind: 'media' })
    listRepo.addItem(mediaList, addMedia('A'))
    listRepo.addItem(mediaList, addMedia('B'))
    const emptyList = listRepo.create({ title: 'Empty', kind: 'person' })

    const all = listRepo.list()
    const media = all.find((l) => l.id === mediaList)!
    const empty = all.find((l) => l.id === emptyList)!
    expect(media.itemCount).toBe(2)
    expect(empty.itemCount).toBe(0)
  })

  it('items pointing at a deleted entity vanish from get() and forEntity reflects membership', () => {
    const listId = listRepo.create({ title: 'L', kind: 'media' })
    const a = addMedia('A')
    listRepo.addItem(listId, a)

    expect(listRepo.forEntity('media', a)[0].contains).toBe(true)

    listRepo.removeEntityFromLists('media', a)
    expect(listRepo.get(listId)!.items).toHaveLength(0)
    expect(listRepo.forEntity('media', a)[0].contains).toBe(false)
  })

  it('removeItemByEntity removes exactly that entity from that list', () => {
    const l1 = listRepo.create({ title: 'One', kind: 'media' })
    const l2 = listRepo.create({ title: 'Two', kind: 'media' })
    const a = addMedia('A')
    listRepo.addItem(l1, a)
    listRepo.addItem(l2, a)
    listRepo.removeItemByEntity(l1, a)
    expect(listRepo.get(l1)!.items).toHaveLength(0)
    expect(listRepo.get(l2)!.items).toHaveLength(1)
  })
})
