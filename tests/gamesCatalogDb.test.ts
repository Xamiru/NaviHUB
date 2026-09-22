import { mkdtempSync, rmSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import Database from 'better-sqlite3'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { CATALOG_DDL } from '../src/main/gamesCatalogSchema'

vi.mock('electron', () => ({ app: { getPath: () => tmpdir() } }))

import { inspectCatalogFile } from '../src/main/gamesCatalogDb'

const roots: string[] = []

function root(): string {
  const path = mkdtempSync(join(tmpdir(), 'navihub-catalog-db-'))
  roots.push(path)
  return path
}

afterEach(() => {
  for (const path of roots.splice(0)) rmSync(path, { recursive: true, force: true })
})

describe('inspectCatalogFile', () => {
  it('accepts an intact staged catalog and returns its bounded status projection', () => {
    const path = join(root(), 'catalog.db')
    const db = new Database(path)
    db.exec(CATALOG_DDL)
    db.prepare(
      `INSERT INTO catalog_game
       (id, name, name_original, released, image_url, rating, ratings_count, added,
        metacritic, playtime, platforms, developers, publishers, genres, description)
       VALUES (1, 'Game', NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL)`
    ).run()
    db.prepare(`INSERT INTO catalog_meta (key, value) VALUES ('snapshot', '2026-06-27')`).run()
    db.close()

    expect(inspectCatalogFile(path)).toEqual({ gameCount: 1, snapshot: '2026-06-27' })
  })

  it('rejects an empty or malformed staged database before it can replace the live catalog', () => {
    const empty = join(root(), 'empty.db')
    const db = new Database(empty)
    db.exec(CATALOG_DDL)
    db.close()
    expect(() => inspectCatalogFile(empty)).toThrow(/contains no games/)

    const malformed = join(root(), 'malformed.db')
    writeFileSync(malformed, 'not sqlite')
    expect(() => inspectCatalogFile(malformed)).toThrow()
  })
})
