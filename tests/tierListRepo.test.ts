import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import * as tierListRepo from '../src/main/repos/tierListRepo'

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

describe('tierListRepo', () => {
  it('creates a board seeded with S–F rows', () => {
    const id = tierListRepo.create({ title: 'Anime tiers', kind: 'media' })
    const board = tierListRepo.get(id)!
    expect(board.title).toBe('Anime tiers')
    expect(board.rows.map((r) => r.row.label)).toEqual(['S', 'A', 'B', 'C', 'D', 'F'])
    expect(board.rows[0].row.color).toMatch(/^#[0-9a-fA-F]{6}$/)
    expect(board.pool).toEqual([])
  })

  it('addItem lands in the pool in append order; removeItem drops it', () => {
    const id = tierListRepo.create({ title: 'T', kind: 'media' })
    const [a, b] = [addMedia('A'), addMedia('B')]
    tierListRepo.addItem(id, a)
    tierListRepo.addItem(id, b)

    let board = tierListRepo.get(id)!
    expect(board.pool.map((p) => p.name)).toEqual(['A', 'B'])
    expect(board.rows.every((g) => g.items.length === 0)).toBe(true)

    tierListRepo.removeItem(board.pool[0].itemId)
    board = tierListRepo.get(id)!
    expect(board.pool.map((p) => p.name)).toEqual(['B'])
  })

  it('addItem is idempotent per (list, entity)', () => {
    const id = tierListRepo.create({ title: 'T', kind: 'media' })
    const a = addMedia('A')
    const first = tierListRepo.addItem(id, a)
    const again = tierListRepo.addItem(id, a)
    expect(again).toBe(first)
    expect(tierListRepo.get(id)!.pool).toHaveLength(1)
  })

  it('persistBoard moves items between rows and orders them within each container', () => {
    const id = tierListRepo.create({ title: 'T', kind: 'media' })
    const ids = ['A', 'B', 'C'].map(addMedia)
    const itemIds = ids.map((eid) => tierListRepo.addItem(id, eid))
    const board = tierListRepo.get(id)!
    const sRowId = board.rows[0].row.id

    tierListRepo.persistBoard(id, [
      { rowId: sRowId, itemIds: [itemIds[2], itemIds[0]] },
      { rowId: null, itemIds: [itemIds[1]] }
    ])

    const after = tierListRepo.get(id)!
    expect(after.rows[0].items.map((i) => i.name)).toEqual(['C', 'A'])
    expect(after.pool.map((i) => i.name)).toEqual(['B'])
    // untouched row stays empty
    expect(after.rows[2].items).toHaveLength(0)
  })

  it('setRows replaces all rows; deleting a row returns its items to the pool', () => {
    const id = tierListRepo.create({ title: 'T', kind: 'media' })
    const a = addMedia('A')
    tierListRepo.addItem(id, a)
    const board = tierListRepo.get(id)!
    const sRowId = board.rows[0].row.id
    tierListRepo.persistBoard(id, [{ rowId: sRowId, itemIds: [board.pool[0].itemId] }])
    expect(tierListRepo.get(id)!.rows[0].items).toHaveLength(1)

    tierListRepo.setRows(id, [
      { label: 'God', color: '#FFAA00' },
      { label: 'Meh', color: 'not-a-color' } // sanitized to the fallback
    ])

    const after = tierListRepo.get(id)!
    expect(after.rows.map((r) => r.row.label)).toEqual(['God', 'Meh'])
    expect(after.rows[0].row.color).toBe('#FFAA00')
    expect(after.rows[1].row.color).toBe('#7F7F7F')
    // the old S row is gone, so its item fell back to the pool
    expect(after.pool.map((p) => p.name)).toEqual(['A'])
    expect(after.rows.every((g) => g.items.length === 0)).toBe(true)
  })

  it('list() reports counts (pool included) and previews ranked-first', () => {
    const t1 = tierListRepo.create({ title: 'One', kind: 'media' })
    const a = addMedia('A')
    const coverd = Number(
      db
        .prepare(`INSERT INTO media_item (media_type, title, cover_path) VALUES ('anime', 'Covered', ?)`)
        .run('media/cover.png').lastInsertRowid
    )
    tierListRepo.addItem(t1, a)
    tierListRepo.addItem(t1, coverd)
    // rank only the covered one so the preview must prefer ranked items
    const board = tierListRepo.get(t1)!
    tierListRepo.persistBoard(t1, [
      { rowId: board.rows[0].row.id, itemIds: [board.pool[1].itemId] },
      { rowId: null, itemIds: [board.pool[0].itemId] }
    ])
    const empty = tierListRepo.create({ title: 'Empty', kind: 'person' })

    const all = tierListRepo.list()
    expect(all.find((l) => l.id === t1)!.itemCount).toBe(2)
    expect(all.find((l) => l.id === empty)!.itemCount).toBe(0)
    expect(all.find((l) => l.id === t1)!.previewImages[0]).toBe('media/cover.png')
  })

  it('items pointing at a deleted entity vanish from get()', () => {
    const id = tierListRepo.create({ title: 'T', kind: 'media' })
    const a = addMedia('A')
    tierListRepo.addItem(id, a)
    expect(tierListRepo.get(id)!.pool).toHaveLength(1)

    tierListRepo.removeEntityFromTierLists('media', a)
    const board = tierListRepo.get(id)!
    expect(board.pool).toHaveLength(0)
    expect(board.rows.every((g) => g.items.length === 0)).toBe(true)
  })

  it('remove() cascades rows and items', () => {
    const id = tierListRepo.create({ title: 'T', kind: 'media' })
    tierListRepo.addItem(id, addMedia('A'))
    tierListRepo.remove(id)
    expect(db.prepare('SELECT COUNT(*) AS n FROM tier_row').get()).toEqual({ n: 0 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM tier_item').get()).toEqual({ n: 0 })
  })

  it('update changes meta but never the seeded kind', () => {
    const id = tierListRepo.create({ title: 'Old', description: 'x', kind: 'media' })
    tierListRepo.update(id, { title: 'New', description: null })
    const board = tierListRepo.get(id)!
    expect(board!.title).toBe('New')
    expect(board!.description).toBeNull()
    expect(board!.kind).toBe('media')
  })
})
