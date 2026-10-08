import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

// Library Refresh for games once the games catalog v2 is installed: linked
// games refresh from their catalog work whatever their own key, a Steam pass
// never takes the cover back from the box art, and a RAWG-era row nothing can
// serve is skipped rather than failed.

let db: Database.Database
const calls = vi.hoisted(() => ({
  importWork: vi.fn(async () => ({})),
  steamImport: vi.fn(async () => ({})),
  rawgImport: vi.fn(async () => ({})),
  enrich: vi.fn(async () => ({})),
  clearCast: vi.fn(),
  xrefs: vi.fn((): { source: string; externalId: string; method: string }[] => [])
}))
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('electron', () => ({ app: { getPath: () => '/tmp' } }))
vi.mock('../src/main/launchboxCatalogDb', () => ({ getLaunchboxDb: () => ({}) }))
vi.mock('../src/main/gamesCatalogDb', () => ({ getCatalogDb: () => null }))
vi.mock('../src/main/launchboxCatalog', () => ({ importWork: calls.importWork, xrefs: calls.xrefs }))
vi.mock('../src/main/steam', () => ({ importGame: calls.steamImport }))
vi.mock('../src/main/gamesCatalog', () => ({ importGame: calls.rawgImport }))
vi.mock('../src/main/gameCast', () => ({ enrichGame: calls.enrich, clearGameCast: calls.clearCast }))

import { refreshOne, selectRows } from '../src/main/libraryRefresh'
import { unlinkWork } from '../src/main/gameLinks'
import * as links from '../src/main/repos/externalLinkRepo'

function game(source: string, ext: string): { id: number; title: string; media_type: 'game'; external_source: string; external_id: string } {
  const id = Number(
    db.prepare(`INSERT INTO media_item (media_type, title, external_source, external_id) VALUES ('game', 'G', ?, ?)`).run(source, ext)
      .lastInsertRowid
  )
  return { id, title: 'G', media_type: 'game', external_source: source, external_id: ext }
}

beforeEach(() => {
  db = createTestDb()
  for (const f of Object.values(calls)) f.mockClear()
})

describe('games and the catalog v2', () => {
  it('lets the catalog own a linked Steam game\'s cover', async () => {
    const row = game('steam', '1687950')
    links.set(row.id, 'launchbox', '179069', 'xref')
    await refreshOne(row, ['cover', 'text'])
    expect(calls.steamImport).toHaveBeenCalledWith(1687950, { only: ['text'] })
    expect(calls.importWork).toHaveBeenCalledWith(179069, { mediaId: row.id, linkMethod: 'xref', only: ['cover'] })
  })

  it('runs the full catalog enrichment and the cast on a full re-import', async () => {
    const row = game('steam', '1687950')
    links.set(row.id, 'launchbox', '179069', 'xref')
    links.set(row.id, 'bangumi', '278949', 'exact')
    await refreshOne(row, ['full'])
    expect(calls.steamImport).toHaveBeenCalledWith(1687950)
    expect(calls.importWork).toHaveBeenCalledWith(179069, { mediaId: row.id, linkMethod: 'xref' })
    expect(calls.enrich).toHaveBeenCalledWith(row.id)
  })

  it('refreshes a linked RAWG-era row from its work and skips an unlinked one', async () => {
    const linked = game('rawg', '25097')
    links.set(linked.id, 'launchbox', '161', 'exact')
    await refreshOne(linked, ['text'])
    expect(calls.importWork).toHaveBeenCalledWith(161, { mediaId: linked.id, linkMethod: 'exact', only: ['text'] })

    const unlinked = game('rawg', '1')
    expect(await refreshOne(unlinked, ['cover'])).toBe(false)
    expect(calls.rawgImport).not.toHaveBeenCalled()
  })

  it('serves launchbox rows by their own key', async () => {
    const row = game('launchbox', '161')
    await refreshOne(row, ['cover'])
    expect(calls.importWork).toHaveBeenCalledWith(161, { only: ['cover'] })
    expect(selectRows({ types: ['game'], aspects: ['cover'], onlyMissing: false }).map((r) => r.id)).toContain(row.id)
  })

  it('keeps a full refresh of a linked game when Bangumi is down', async () => {
    const row = game('launchbox', '161')
    links.set(row.id, 'bangumi', '278949', 'xref')
    calls.enrich.mockRejectedValueOnce(new Error('HTTP 503'))
    await expect(refreshOne(row, ['full'])).resolves.not.toBe(false)
    expect(calls.importWork).toHaveBeenCalledWith(161, {})
  })
})

describe('unlinking a wrong catalog work', () => {
  it('drops the automatic links and cast the work brought, keeping manual ones', () => {
    const row = game('steam', '1687950')
    links.set(row.id, 'launchbox', '179069', 'xref')
    links.set(row.id, 'bangumi', '278949', 'xref')
    links.set(row.id, 'wikidata', 'Q1', 'manual')
    calls.xrefs.mockReturnValueOnce([
      { source: 'bangumi', externalId: '278949', method: 'xref' },
      { source: 'wikidata', externalId: 'Q1', method: 'xref' }
    ])
    unlinkWork(row.id)
    expect(links.linkedId(row.id, 'launchbox')).toBeNull()
    expect(links.get(row.id, 'launchbox')?.method).toBe('manual')
    expect(links.get(row.id, 'bangumi')).toBeNull()
    expect(links.linkedId(row.id, 'wikidata')).toBe('Q1')
    expect(calls.clearCast).toHaveBeenCalledWith(row.id)
  })
})
