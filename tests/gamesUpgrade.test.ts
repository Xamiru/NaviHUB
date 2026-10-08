import { beforeEach, describe, expect, it, vi } from 'vitest'
import Database from 'better-sqlite3'
import { createTestDb } from './helpers'

// The games upgrade: which work each library game belongs to (id chain,
// unique exact title, or the user's pick), the dry run, and a resumable run
// that shares the library job slot.

let db: Database.Database
let catalog: Database.Database | null
const enriched: number[] = []

vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('../src/main/launchboxCatalogDb', () => ({
  getLaunchboxDb: () => catalog,
  closeLaunchboxDb: () => {},
  launchboxCatalogPath: () => ':memory:',
  inspectLaunchboxCatalog: () => ({ workCount: 1, snapshot: null })
}))
vi.mock('../src/main/files', () => ({
  downloadScaledImages: async (urls: string[]) => new Map(urls.map((u) => [u, `media/${u.split('/').pop()}`]))
}))
vi.mock('../src/main/http', () => ({ MAX_API_RESPONSE_BYTES: 1, fetchWithRetry: async () => ({ ok: false }), sleep: async () => {} }))
vi.mock('../src/main/hltb', () => ({ fetchPlaytimes: async () => null, hltbLengthHours: () => null }))
vi.mock('../src/main/bangumi', () => ({ subjectCover: async () => null }))
vi.mock('../src/main/gameCast', () => ({
  enrichGame: async (id: number) => {
    enriched.push(id)
    return { linked: true, cast: 0, staff: 0, relations: 0 }
  }
}))

import { LAUNCHBOX_CATALOG_DDL } from '../src/main/launchboxCatalogSchema'
import { getStatus, plan, start, upgradeOne } from '../src/main/gamesUpgrade'
import { claimLibraryJob, __resetLibraryJobLock } from '../src/main/libraryJobLock'
import * as links from '../src/main/repos/externalLinkRepo'

function work(id: number, name: string, released: string, extra: { ja?: string; xref?: [string, string, string][] } = {}) {
  catalog!
    .prepare(`INSERT INTO lb_work (id, name, name_ja, released, platforms, popularity) VALUES (?, ?, ?, ?, '["Nintendo 64"]', 1)`)
    .run(id, name, extra.ja ?? null, released)
  catalog!.prepare(`INSERT INTO lb_fts (rowid, name, alt) VALUES (?, ?, ?)`).run(id, name, extra.ja ?? '')
  catalog!.prepare(`INSERT INTO lb_image (work_id, kind, region, platform, file, rank) VALUES (?, 'box', 'Japan', 'Nintendo 64', ?, 0)`).run(id, `${id}.jpg`)
  for (const [source, ext, method] of extra.xref ?? [])
    catalog!.prepare('INSERT INTO lb_xref (work_id, source, external_id, method) VALUES (?, ?, ?, ?)').run(id, source, ext, method)
}

function game(title: string, source: string | null, ext: string | null, released: string | null = null, metadata: string | null = null): number {
  return Number(
    db
      .prepare(
        `INSERT INTO media_item (media_type, title, release_date, external_source, external_id, metadata) VALUES ('game', ?, ?, ?, ?, ?)`
      )
      .run(title, released, source, ext, metadata).lastInsertRowid
  )
}

let ids: Record<string, number>

beforeEach(() => {
  db = createTestDb()
  catalog = new Database(':memory:')
  catalog.exec(LAUNCHBOX_CATALOG_DDL)
  catalog.prepare(`INSERT INTO lb_meta (key, value) VALUES ('snapshot', '2026-10-08')`).run()
  work(161, 'The Legend of Zelda: Ocarina of Time', '1998-11-21', { xref: [['rawg', '25097', 'exact'], ['bangumi', '2113', 'wikidata']] })
  work(179069, 'Persona 5 Royal', '2020-03-31', { xref: [['steam', '1687950', 'xref']] })
  work(196, 'Metal Gear Solid', '1998-09-03')
  work(300, 'Doom', '1993-12-10')
  work(301, 'Doom', '1994-06-01')
  enriched.length = 0
  __resetLibraryJobLock()
  ids = {
    rawg: game('Zelda: Ocarina', 'rawg', '25097', '1998-11-23'),
    steam: game('Persona 5 Royal', 'steam', '1687950'),
    title: game('Metal Gear Solid', 'rawg', '999', '1998-10-21'),
    ambiguous: game('DOOM', 'rawg', '998', '1993-12-10'),
    unknown: game('Some Indie', 'rawg', '997'),
    unlinked: game('Metal Gear Solid', null, null, '1998-09-03')
  }
  links.unlinkManually(ids.unlinked, 'launchbox')
})

const waitDone = async (): Promise<void> => {
  for (let i = 0; i < 100 && getStatus().state === 'running'; i++) await new Promise((r) => setTimeout(r, 5))
}

describe('plan', () => {
  it('decides by id chain, then unique exact title, and lists the rest for review', async () => {
    const p = await plan()
    expect(p).toMatchObject({ snapshot: '2026-10-08', total: 6, linked: 0, autoLinks: 3, unmatched: 2, toUpgrade: 3 })
    expect(p.review).toEqual([
      {
        mediaId: ids.ambiguous,
        title: 'DOOM',
        year: 1993,
        candidates: [expect.objectContaining({ workId: 300, year: 1993 }), expect.objectContaining({ workId: 301, year: 1994 })]
      }
    ])
  })
})

describe('upgradeOne', () => {
  it('links and enriches a RAWG-era row in place, then reads its cast', async () => {
    await upgradeOne({ id: ids.rawg, external_source: 'rawg' }, 161, 'exact')
    expect(db.prepare('SELECT external_source, external_id, cover_path FROM media_item WHERE id = ?').get(ids.rawg)).toEqual({
      external_source: 'rawg',
      external_id: '25097',
      cover_path: 'media/161.jpg'
    })
    expect(links.get(ids.rawg, 'launchbox')).toMatchObject({ externalId: '161', method: 'exact' })
    expect(links.linkedId(ids.rawg, 'bangumi')).toBe('2113')
    expect(enriched).toEqual([ids.rawg])
  })
})

describe('start', () => {
  it('upgrades every decided game, stamps it, and resumes past finished ones', async () => {
    const seen: number[] = []
    await start({ run: async (row) => void seen.push(row.id) })
    await waitDone()
    expect(getStatus()).toMatchObject({ state: 'done', total: 3, upgraded: 3, failed: 0 })
    expect(seen.sort()).toEqual([ids.rawg, ids.steam, ids.title].sort())
    expect(JSON.parse((db.prepare('SELECT metadata FROM media_item WHERE id = ?').get(ids.rawg) as { metadata: string }).metadata)).toEqual({
      catalogUpgraded: '2026-10-08'
    })
    expect((await plan()).toUpgrade).toBe(0)
    await expect(start({ run: async () => {} })).rejects.toThrow(/already up to date/)
  })

  it('records a failing game and carries on', async () => {
    await start({
      run: async (row) => {
        if (row.id === ids.steam) throw new Error('boom')
      }
    })
    await waitDone()
    expect(getStatus()).toMatchObject({ state: 'done', upgraded: 2, failed: 1, failures: [{ id: ids.steam, error: 'boom' }] })
    expect((await plan()).toUpgrade).toBe(1)
  })

  it('waits for a bulk import or refresh to finish', async () => {
    const release = claimLibraryJob('bulk')
    await expect(start({ run: async () => {} })).rejects.toThrow(/bulk import is running/)
    release()
  })
})

describe('at library scale', () => {
  it('plans 6,000 games against 2,000 works in seconds', async () => {
    const insWork = catalog!.prepare(`INSERT INTO lb_work (id, name, released, platforms, popularity) VALUES (?, ?, '2001-01-01', '[]', 1)`)
    const insFts = catalog!.prepare(`INSERT INTO lb_fts (rowid, name, alt) VALUES (?, ?, '')`)
    const insXref = catalog!.prepare(`INSERT INTO lb_xref (work_id, source, external_id, method) VALUES (?, 'rawg', ?, 'exact')`)
    catalog!.transaction(() => {
      for (let i = 0; i < 2000; i++) {
        insWork.run(10_000 + i, `Scale Game ${i}`)
        insFts.run(10_000 + i, `Scale Game ${i}`)
        insXref.run(10_000 + i, String(50_000 + i))
      }
    })()
    const insRow = db.prepare(
      `INSERT INTO media_item (media_type, title, release_date, external_source, external_id) VALUES ('game', ?, '2001-05-01', 'rawg', ?)`
    )
    db.transaction(() => {
      // Half reach their work by RAWG id; half fall through to the title search.
      for (let i = 0; i < 6000; i++) insRow.run(`Scale Game ${i % 2000}`, String(i < 3000 ? 50_000 + (i % 2000) : 90_000 + i))
    })()
    const started = Date.now()
    const p = await plan()
    expect(p.total).toBe(6006)
    expect(p.autoLinks).toBe(6003)
    expect(Date.now() - started).toBeLessThan(8000)
  })
})
