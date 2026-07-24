import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

// Offline Atlas Academy catalog import against the real schema: servant/CE rows
// seeded owned=0 with prettified class + face art, convergence on pre-seeded
// rows (personal fields preserved), manual-row adoption, and atomicity.

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))

// Face download: returns a media/ path per URL, except a marker for a failed
// download (null) and — in the atomicity test — an unbindable value.
let imageResult: (url: string) => unknown = (u) =>
  u.includes('417') ? null : `media/dl-${u.split('/').pop()}`
vi.mock('../src/main/files', () => ({
  downloadImages: async (urls: (string | null | undefined)[]) =>
    new Map(urls.filter(Boolean).map((u) => [u as string, imageResult(u as string)]))
}))

let servantsFixture: unknown[]
let equipsFixture: unknown[]
vi.mock('../src/main/http', () => ({
  fetchWithRetry: async (url: string) => ({
    ok: true,
    status: 200,
    json: async () => (url.includes('basic_servant') ? servantsFixture : equipsFixture)
  })
}))

import { importCatalog, prettifyFgoClass } from '../src/main/atlas'
import * as gachaRepo from '../src/main/repos/gachaRepo'

function defaultServants(): unknown[] {
  return [
    { collectionNo: 2, name: 'Altria Pendragon', className: 'saber', rarity: 5, face: 'https://f/2.png' },
    { collectionNo: 316, name: 'Oberon', className: 'pretender', rarity: 5, face: 'https://f/316.png' },
    { collectionNo: 418, name: 'Mysterious Executor C.I.E.L', className: 'moonCancer', rarity: 5, face: 'https://f/418.png' },
    // face fails to download (image marker '417')
    { collectionNo: 417, name: 'Space Ereshkigal', className: 'beastEresh', rarity: 5, face: 'https://f/417.png' }
  ]
}
function defaultEquips(): unknown[] {
  return [
    { collectionNo: 2100, name: 'Flames of Ovation', rarity: 5, face: 'https://f/ce2100.png' },
    { collectionNo: 18, name: "Dragon's Meridian", rarity: 3, face: 'https://f/ce18.png' }
  ]
}

beforeEach(() => {
  db = createTestDb()
  servantsFixture = defaultServants()
  equipsFixture = defaultEquips()
  imageResult = (u) => (u.includes('417') ? null : `media/dl-${u.split('/').pop()}`)
})

describe('prettifyFgoClass', () => {
  it('maps known classes, beast variants, and unknown camelCase', () => {
    expect(prettifyFgoClass('saber')).toBe('Saber')
    expect(prettifyFgoClass('moonCancer')).toBe('Moon Cancer')
    expect(prettifyFgoClass('alterEgo')).toBe('Alter Ego')
    expect(prettifyFgoClass('beastEresh')).toBe('Beast')
    expect(prettifyFgoClass('someNewClass')).toBe('Some New Class')
  })
})

describe('importCatalog', () => {
  it('seeds every entry as owned=0 with kind, externals, class and image', async () => {
    const res = await importCatalog('fgo')
    expect(res).toEqual({ total: 6, created: 6, updated: 0, imagesFailed: 1 })

    const rows = db
      .prepare("SELECT * FROM gacha_unit WHERE game='fgo' ORDER BY kind, CAST(external_id AS INTEGER)")
      .all() as Record<string, unknown>[]
    expect(rows).toHaveLength(6)
    for (const r of rows) {
      expect(r.owned).toBe(0)
      expect(r.external_source).toBe('atlas')
    }
    const altria = rows.find((r) => r.external_id === '2')!
    expect(altria.kind).toBe('servant')
    expect(altria.element).toBe('Saber')
    expect(altria.image_path).toBe('media/dl-2.png')

    const ciel = rows.find((r) => r.external_id === '418')!
    expect(ciel.element).toBe('Moon Cancer')

    const eresh = rows.find((r) => r.external_id === '417')!
    expect(eresh.element).toBe('Beast')
    expect(eresh.image_path).toBeNull() // download failed

    const ce = rows.find((r) => r.kind === 'craftEssence' && r.external_id === '2100')!
    expect(ce.element).toBeNull()
    expect(ce.rarity).toBe(5)
  })

  it('converges on pre-seeded rows without duplicating or disturbing personal fields', async () => {
    // Mimic one of the live pre-seeded rows: owned, favorited, NP2, with notes,
    // data, and an existing image.
    const info = db
      .prepare(
        `INSERT INTO gacha_unit
           (game, kind, name, rarity, element, image_path, owned, favorite, level, dupes, notes, data, external_source, external_id)
         VALUES ('fgo','servant','Altria Pendragon',5,'Saber','media/old-altria.png',1,1,90,1,'my note','{"x":1}','atlas','2')`
      )
      .run()
    const seededId = Number(info.lastInsertRowid)

    const res = await importCatalog('fgo')
    expect(res.total).toBe(6)
    expect(res.created).toBe(5) // Altria was already known
    expect(res.updated).toBe(1)

    expect(db.prepare("SELECT COUNT(*) AS n FROM gacha_unit WHERE game='fgo'").get()).toEqual({ n: 6 })
    const altria = db.prepare('SELECT * FROM gacha_unit WHERE id=?').get(seededId) as Record<string, unknown>
    expect(altria.owned).toBe(1)
    expect(altria.favorite).toBe(1)
    expect(altria.dupes).toBe(1)
    expect(altria.level).toBe(90)
    expect(altria.notes).toBe('my note')
    expect(altria.data).toBe('{"x":1}')
    expect(altria.image_path).toBe('media/dl-2.png') // canonical image refreshed
  })

  it('re-import preserves personal fields and keeps the old image when a face fails', async () => {
    await importCatalog('fgo')
    // Own Eresh (whose face failed → image_path is null) and give it a manual image.
    const eresh = db.prepare("SELECT id FROM gacha_unit WHERE external_id='417'").get() as { id: number }
    db.prepare(
      "UPDATE gacha_unit SET owned=1, favorite=1, level=80, dupes=0, image_path='media/manual-eresh.png' WHERE id=?"
    ).run(eresh.id)

    const res = await importCatalog('fgo')
    expect(res.updated).toBe(6)
    const row = db.prepare('SELECT * FROM gacha_unit WHERE id=?').get(eresh.id) as Record<string, unknown>
    expect(row.owned).toBe(1)
    expect(row.favorite).toBe(1)
    expect(row.level).toBe(80)
    expect(row.image_path).toBe('media/manual-eresh.png') // COALESCE kept it
  })

  it('adopts a manual (NULL-external) row with a matching name instead of duplicating', async () => {
    const manualId = gachaRepo.createUnit({
      game: 'fgo',
      kind: 'servant',
      name: 'Oberon',
      owned: true,
      favorite: true,
      level: 60
    })

    const res = await importCatalog('fgo')
    expect(res.created).toBe(5) // Oberon adopted, not created
    expect(res.updated).toBe(1)

    const oberons = db
      .prepare("SELECT * FROM gacha_unit WHERE game='fgo' AND name='Oberon'")
      .all() as Record<string, unknown>[]
    expect(oberons).toHaveLength(1)
    expect(oberons[0].id).toBe(manualId)
    expect(oberons[0].external_source).toBe('atlas')
    expect(oberons[0].external_id).toBe('316')
    expect(oberons[0].owned).toBe(1) // ownership preserved
    expect(oberons[0].favorite).toBe(1)
    expect(oberons[0].image_path).toBe('media/dl-316.png')
  })

  it('rolls back the whole import if a write fails mid-transaction (atomicity)', async () => {
    // An unbindable image value for one CE fails the bind inside the upsert
    // transaction, after earlier rows were inserted — all must roll back.
    imageResult = (u) => (u.includes('ce18') ? ({} as unknown) : `media/dl-${u.split('/').pop()}`)
    await expect(importCatalog('fgo')).rejects.toThrow()
    expect(db.prepare("SELECT COUNT(*) AS n FROM gacha_unit WHERE game='fgo'").get()).toEqual({ n: 0 })
  })

  it('rejects games without an Atlas catalog config', async () => {
    await expect(importCatalog('hsr')).rejects.toThrow()
  })
})
