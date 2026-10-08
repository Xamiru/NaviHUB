import { mkdtempSync, readFileSync, rmSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { gzipSync } from 'zlib'
import Database from 'better-sqlite3'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { LAUNCHBOX_CATALOG_DDL } from '../src/main/launchboxCatalogSchema'

// The v2 pack goes through the same stage-validate-swap installer as the RAWG
// pack (catalogRelease.ts); this pins its own release names and validation.
const env = vi.hoisted(() => ({ root: '', fetch: vi.fn() }))

vi.mock('electron', () => ({ app: { getPath: () => env.root } }))
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => null }))
vi.mock('../src/main/progress', () => ({ updateActivity: () => {} }))
vi.mock('../src/main/http', () => ({
  MAX_API_RESPONSE_BYTES: 32 * 1024 * 1024,
  fetchWithRetry: (...args: unknown[]) => env.fetch(...args)
}))
vi.mock('../src/main/files', () => ({ downloadScaledImages: vi.fn() }))
vi.mock('../src/main/hltb', () => ({ fetchPlaytimes: vi.fn(), hltbLengthHours: vi.fn() }))

import { install, status } from '../src/main/launchboxCatalog'
import { closeLaunchboxDb, launchboxCatalogPath } from '../src/main/launchboxCatalogDb'

function pack(works: number): Buffer {
  const source = join(env.root, `source-${works}.db`)
  const db = new Database(source)
  db.exec(LAUNCHBOX_CATALOG_DDL)
  for (let i = 1; i <= works; i++) db.prepare(`INSERT INTO lb_work (id, name) VALUES (?, 'Game')`).run(i)
  db.prepare(`INSERT INTO lb_meta (key, value) VALUES ('snapshot', '2026-10-08')`).run()
  db.close()
  return gzipSync(readFileSync(source))
}

function serve(archive: Buffer): void {
  env.fetch
    .mockResolvedValueOnce(
      Response.json({
        assets: [
          {
            name: 'games-catalog.db.gz',
            browser_download_url: 'https://github.com/Xamiru/NaviHUB/releases/download/games-catalog-2/games-catalog.db.gz'
          }
        ]
      })
    )
    .mockResolvedValueOnce(new Response(archive, { headers: { 'content-length': String(archive.length) } }))
}

beforeEach(() => {
  closeLaunchboxDb()
  env.root = mkdtempSync(join(tmpdir(), 'navihub-lb-install-'))
  env.fetch.mockReset()
})

afterEach(() => {
  closeLaunchboxDb()
  rmSync(env.root, { recursive: true, force: true })
})

describe('games catalog v2 install', () => {
  it('installs the games-catalog-2 asset', async () => {
    serve(pack(2))
    await expect(install()).resolves.toEqual({ installed: true, gameCount: 2, snapshot: '2026-10-08' })
    expect(String(env.fetch.mock.calls[0][0])).toContain('/releases/tags/games-catalog-2')
    expect(readFileSync(launchboxCatalogPath()).subarray(0, 15).toString()).toBe('SQLite format 3')
  })

  it('keeps the installed pack when a replacement has no games', async () => {
    serve(pack(2))
    await install()
    closeLaunchboxDb()
    serve(pack(0))
    await expect(install()).rejects.toThrow(/no games/)
    expect(status()).toMatchObject({ installed: true, gameCount: 2 })
  })
})
