import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

// Chaldea userdata.json import: parse (trust boundary) + apply ownership onto
// pre-seeded Atlas catalog rows. The picker is mocked to feed a fixture.

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))

let pickResult: { name: string; content: string } | null = null
vi.mock('../src/main/files', () => ({
  pickTextFile: async () => pickResult
}))

import { parseChaldeaBackup, importBackup } from '../src/main/chaldea'
import * as gachaRepo from '../src/main/repos/gachaRepo'

// Seed a small Atlas catalog the backup can match against.
function seedCatalog(): void {
  gachaRepo.upsertCatalogUnits('fgo', 'atlas', [
    { kind: 'servant', externalId: '2', name: 'Altria Pendragon', rarity: 5, element: 'Saber', imagePath: 'media/a.png' },
    { kind: 'servant', externalId: '316', name: 'Oberon', rarity: 5, element: 'Pretender', imagePath: 'media/o.png' },
    { kind: 'craftEssence', externalId: '2100', name: 'Flames of Ovation', rarity: 5, element: null, imagePath: 'media/f.png' },
    { kind: 'craftEssence', externalId: '18', name: "Dragon's Meridian", rarity: 3, element: null, imagePath: 'media/d.png' }
  ])
}

function backup(over: Record<string, unknown> = {}): string {
  return JSON.stringify({
    curUserKey: 0,
    users: [
      {
        servants: {
          '2': {
            bond: 5,
            cur: { favorite: true, _npLv: 2, ascension: 4, skills: [10, 9, 8], appendSkills: [1, 0, 0], grail: 0, fouHp: 20, fouAtk: 30 }
          },
          '316': { cur: { favorite: false, _npLv: 1 } } // not owned → skipped
        },
        craftEssences: {
          '2100': { status: 2, lv: 20, limitCount: 4 }, // owned
          '18': { status: 1, lv: 1, limitCount: 0 } // met, not owned → skipped
        }
      },
      ...(over.users as unknown[] ?? [])
    ],
    ...over
  })
}

beforeEach(() => {
  db = createTestDb()
  pickResult = null
})

describe('parseChaldeaBackup', () => {
  it('maps owned servants and CEs, skipping unowned', () => {
    const patches = parseChaldeaBackup(backup())
    expect(patches).toHaveLength(2)
    const svt = patches.find((p) => p.kind === 'servant')!
    expect(svt.externalId).toBe('2')
    expect(svt.dupes).toBe(1) // NP2 → dupes 1
    expect(svt.dataMerge).toMatchObject({ ascension: 4, skills: [10, 9, 8], bond: 5, fouAtk: 30 })
    const ce = patches.find((p) => p.kind === 'craftEssence')!
    expect(ce.externalId).toBe('2100')
    expect(ce.dupes).toBe(4)
    expect(ce.level).toBe(20)
  })

  it('throws on non-JSON and on a file without users', () => {
    expect(() => parseChaldeaBackup('not json {')).toThrow()
    expect(() => parseChaldeaBackup('{"foo":1}')).toThrow()
  })

  it('skips malformed individual entries without aborting', () => {
    const content = JSON.stringify({
      curUserKey: 0,
      users: [
        {
          servants: {
            '2': { cur: { favorite: true, _npLv: 3 } },
            abc: { cur: { favorite: true } }, // non-numeric key skipped
            '99': { cur: 'oops' } // malformed cur skipped
          }
        }
      ]
    })
    const patches = parseChaldeaBackup(content)
    expect(patches).toHaveLength(1)
    expect(patches[0].dupes).toBe(2)
  })
})

describe('importBackup', () => {
  it('marks catalog rows owned with NP/level/data, non-destructively', async () => {
    seedCatalog()
    // Pre-own Oberon (absent from the backup) — must stay owned.
    const oberon = db.prepare("SELECT id FROM gacha_unit WHERE external_id='316'").get() as { id: number }
    db.prepare('UPDATE gacha_unit SET owned=1, data=? WHERE id=?').run('{"keep":1}', oberon.id)

    // Pre-set data on Altria to prove the merge preserves existing keys.
    db.prepare("UPDATE gacha_unit SET data='{\"old\":7}' WHERE external_id='2'").run()

    pickResult = { name: 'userdata.json', content: backup() }
    const res = await importBackup('fgo')
    expect(res).toEqual({ servants: 1, craftEssences: 1, unmatched: 0 })

    const altria = db.prepare("SELECT * FROM gacha_unit WHERE external_id='2'").get() as Record<string, unknown>
    expect(altria.owned).toBe(1)
    expect(altria.dupes).toBe(1)
    expect(JSON.parse(altria.data as string)).toMatchObject({ old: 7, ascension: 4, bond: 5 })

    const ce = db.prepare("SELECT * FROM gacha_unit WHERE external_id='2100'").get() as Record<string, unknown>
    expect(ce.owned).toBe(1)
    expect(ce.dupes).toBe(4)
    expect(ce.level).toBe(20)

    // Oberon untouched.
    const ob = db.prepare('SELECT * FROM gacha_unit WHERE id=?').get(oberon.id) as Record<string, unknown>
    expect(ob.owned).toBe(1)
    expect(ob.data).toBe('{"keep":1}')

    // Dragon's Meridian (status 1) never owned.
    const dm = db.prepare("SELECT owned FROM gacha_unit WHERE external_id='18'").get() as { owned: number }
    expect(dm.owned).toBe(0)
  })

  it('counts unmatched entries with no catalog row', async () => {
    seedCatalog()
    const content = JSON.stringify({
      curUserKey: 0,
      users: [{ servants: { '9999': { cur: { favorite: true, _npLv: 1 } } } }]
    })
    pickResult = { name: 'u.json', content }
    const res = await importBackup('fgo')
    expect(res).toEqual({ servants: 1, craftEssences: 0, unmatched: 1 })
  })

  it('throws a clear error when no catalog has been imported yet', async () => {
    pickResult = { name: 'u.json', content: backup() }
    await expect(importBackup('fgo')).rejects.toThrow(/catalog/i)
  })

  it('returns null when the picker is canceled (DB untouched)', async () => {
    seedCatalog()
    pickResult = null
    const res = await importBackup('fgo')
    expect(res).toBeNull()
    const owned = db.prepare("SELECT COUNT(*) AS n FROM gacha_unit WHERE owned=1").get() as { n: number }
    expect(owned.n).toBe(0)
  })
})
