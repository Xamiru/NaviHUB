import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import type { VnReadingNodeInput } from '../src/shared/types'
// @ts-expect-error plain maintenance module
import { sanitizeDb } from '../scripts/sanitizeSql.cjs'
let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
import * as repo from '../src/main/repos/vnReadingRepo'
const node = (title: string, parentId: number | null = null): VnReadingNodeInput => ({
  title,
  parentId,
  kind: 'route',
  status: 'planned',
  rating: null,
  notes: '',
  completedOn: null
})
beforeEach(() => {
  db = createTestDb()
  db.exec(
    "INSERT INTO media_item(id,media_type,title,progress,status) VALUES(1,'visual_novel','One',45,'Playing'),(2,'visual_novel','Two',0,NULL),(3,'anime','Anime',0,NULL)"
  )
})
afterEach(() => db.close())
describe('VN personal reading workspace', () => {
  it('retains notebook and resume when a route is removed, without changing title progress', () => {
    const parent = repo.saveNode(1, null, node('Route'))
    const child = repo.saveNode(1, null, {
      ...node('Ending', parent),
      kind: 'ending',
      status: 'completed',
      completedOn: '2026-09-23'
    })
    repo.saveResume(1, { nodeId: parent, saveSlot: '12', recap: 'At the station' })
    repo.saveNote(1, null, {
      nodeId: parent,
      entryDate: '2026-09-23',
      category: 'theory',
      body: 'A question',
      imageData: null
    })
    repo.removeNode(1, parent)
    expect(repo.overview(1)).toMatchObject({
      nodes: [{ id: child, parentId: null }],
      resume: { nodeId: null, saveSlot: '12', recap: 'At the station' }
    })
    expect(repo.notes(1).notes[0]).toMatchObject({ nodeId: null, body: 'A question' })
    expect(db.prepare('SELECT progress,status FROM media_item WHERE id=1').get()).toEqual({
      progress: 45,
      status: 'Playing'
    })
  })
  it('rejects foreign parents, notes, invalid dates, cycles and incomplete reorders atomically', () => {
    const a = repo.saveNode(1, null, node('A'))
    const b = repo.saveNode(1, null, node('B', a))
    const foreign = repo.saveNode(2, null, node('Foreign'))
    expect(() => repo.saveNode(1, a, node('Cycle', b))).toThrow(/itself/)
    expect(() => repo.saveNode(1, null, node('Foreign parent', foreign))).toThrow(/belong/)
    expect(() => repo.saveResume(1, { nodeId: foreign, saveSlot: '', recap: '' })).toThrow(/belong/)
    expect(() => repo.saveNode(3, null, node('Wrong type'))).toThrow(/not found/)
    expect(() =>
      repo.saveNode(1, a, { ...node('Bad date'), status: 'completed', completedOn: '2026-02-30' })
    ).toThrow(/date/)
    expect(() => repo.reorder(1, [b, b])).toThrow(/order/)
    expect(repo.overview(1).nodes.map((n) => n.title)).toEqual(['A', 'B'])
    repo.reorder(1, [b, a])
    expect(repo.overview(1).nodes.map((n) => n.id)).toEqual([b, a])
  })
  it('paginates dated notes and wipes all personal state including inline image attachments on export', () => {
    const id = repo.saveNode(1, null, node('Private route'))
    repo.saveResume(1, { nodeId: id, saveSlot: 'Private slot', recap: 'Private recap' })
    for (let i = 0; i < 22; i++)
      repo.saveNote(1, null, {
        nodeId: id,
        entryDate: '2026-09-23',
        category: 'quote',
        body: `Quote ${i}`,
        imageData: 'data:image/png;base64,aGVsbG8='
      })
    expect(repo.notes(1, 2)).toMatchObject({
      total: 22,
      notes: [{ body: 'Quote 1' }, { body: 'Quote 0' }]
    })
    sanitizeDb(db)
    for (const table of ['vn_reading_node', 'vn_reading_resume', 'vn_notebook'])
      expect(db.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get()).toEqual({ n: 0 })
    expect(db.prepare('SELECT title FROM media_item WHERE id=1').get()).toEqual({ title: 'One' })
  })
})
