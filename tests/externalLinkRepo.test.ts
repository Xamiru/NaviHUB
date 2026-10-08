import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
import * as links from '../src/main/repos/externalLinkRepo'

let game: number
beforeEach(() => {
  db = createTestDb()
  game = Number(
    db
      .prepare(
        `INSERT INTO media_item (media_type, title, external_source, external_id) VALUES ('game', 'Ocarina', 'rawg', '25')`
      )
      .run().lastInsertRowid
  )
})

describe('media_external_link', () => {
  it('records links and finds rows back through them', () => {
    expect(links.set(game, 'launchbox', '901', 'xref')).toBe(true)
    expect(links.linkedId(game, 'launchbox')).toBe('901')
    expect(links.mediaIdsFor('launchbox', '901')).toEqual([game])
    expect(links.list(game)).toEqual([
      expect.objectContaining({ source: 'launchbox', externalId: '901', method: 'xref' })
    ])
  })

  it('never lets an automatic pass replace a manual link', () => {
    links.set(game, 'bangumi', '111', 'manual')
    expect(links.set(game, 'bangumi', '222', 'exact')).toBe(false)
    expect(links.linkedId(game, 'bangumi')).toBe('111')
    expect(links.set(game, 'bangumi', '333', 'manual')).toBe(true)
    expect(links.linkedId(game, 'bangumi')).toBe('333')
  })

  it('keeps a manual unlink against automatic passes until reset', () => {
    links.set(game, 'bangumi', '111', 'wikidata')
    links.unlinkManually(game, 'bangumi')
    expect(links.linkedId(game, 'bangumi')).toBeNull()
    expect(links.list(game)).toEqual([])
    expect(links.set(game, 'bangumi', '111', 'wikidata')).toBe(false)
    links.reset(game, 'bangumi')
    expect(links.set(game, 'bangumi', '111', 'wikidata')).toBe(true)
  })

  it('goes with the title it belongs to', () => {
    links.set(game, 'launchbox', '901', 'xref')
    db.prepare('DELETE FROM media_item WHERE id=?').run(game)
    expect(links.mediaIdsFor('launchbox', '901')).toEqual([])
  })

  it('seeks the reverse lookup through its index', () => {
    const plan = db
      .prepare('EXPLAIN QUERY PLAN SELECT media_id FROM media_external_link WHERE source = ? AND external_id = ?')
      .all('launchbox', '1') as { detail: string }[]
    expect(plan.map((p) => p.detail).join(' ')).toContain('idx_media_external_link_ext')
  })
})
