import { mkdtempSync, readFileSync, rmSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { gzipSync } from 'zlib'
import Database from 'better-sqlite3'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CATALOG_DDL } from '../src/main/gamesCatalogSchema'

const env = vi.hoisted(() => ({ root: '', fetch: vi.fn(), progress: vi.fn() }))

vi.mock('electron', () => ({ app: { getPath: () => env.root } }))
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => null }))
vi.mock('../src/main/progress', () => ({ updateActivity: env.progress }))
vi.mock('../src/main/http', () => ({
  MAX_API_RESPONSE_BYTES: 32 * 1024 * 1024,
  fetchWithRetry: (...args: unknown[]) => env.fetch(...args)
}))
vi.mock('../src/main/files', () => ({ downloadImages: vi.fn() }))
vi.mock('../src/main/hltb', () => ({ fetchPlaytimes: vi.fn(), hltbLengthHours: vi.fn() }))

import { install, status } from '../src/main/gamesCatalog'
import { catalogPath, closeCatalogDb } from '../src/main/gamesCatalogDb'

function catalogArchive(): Buffer {
  const source = join(env.root, 'source.db')
  const db = new Database(source)
  db.exec(CATALOG_DDL)
  db.prepare(
    `INSERT INTO catalog_game
     (id, name, name_original, released, image_url, rating, ratings_count, added,
      metacritic, playtime, platforms, developers, publishers, genres, description)
     VALUES (1, 'Game', NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL)`
  ).run()
  db.prepare(`INSERT INTO catalog_meta (key, value) VALUES ('snapshot', '2026-06-27')`).run()
  db.close()
  return gzipSync(readFileSync(source))
}

function mockDownload(archive: Buffer): void {
  env.fetch
    .mockResolvedValueOnce(
      Response.json({
        assets: [
          {
            name: 'rawg-catalog.db.gz',
            browser_download_url:
              'https://github.com/Xamiru/NaviHUB/releases/download/games-catalog-1/rawg-catalog.db.gz'
          }
        ]
      })
    )
    .mockResolvedValueOnce(
      new Response(archive, { headers: { 'content-length': String(archive.length) } })
    )
}

beforeEach(() => {
  closeCatalogDb()
  env.root = mkdtempSync(join(tmpdir(), 'navihub-catalog-install-'))
  env.fetch.mockReset()
  env.progress.mockReset()
})

afterEach(() => {
  closeCatalogDb()
  rmSync(env.root, { recursive: true, force: true })
})

describe('games catalog streamed install', () => {
  it('streams, expands, validates and publishes a usable catalog', async () => {
    mockDownload(catalogArchive())

    await expect(install()).resolves.toEqual({
      installed: true,
      gameCount: 1,
      snapshot: '2026-06-27'
    })
    expect(status().installed).toBe(true)
    expect(readFileSync(catalogPath()).subarray(0, 16).toString()).toBe('SQLite format 3\u0000')
    expect(env.progress).toHaveBeenCalledWith(expect.objectContaining({ phase: 'writing' }))
    expect(env.fetch).toHaveBeenNthCalledWith(
      1,
      'https://api.github.com/repos/Xamiru/NaviHUB/releases/tags/games-catalog-1',
      expect.objectContaining({ headers: { 'user-agent': 'NaviHUB', accept: 'application/vnd.github+json' } })
    )
    expect(env.fetch).toHaveBeenNthCalledWith(
      2,
      'https://github.com/Xamiru/NaviHUB/releases/download/games-catalog-1/rawg-catalog.db.gz',
      expect.objectContaining({ headers: { 'user-agent': 'NaviHUB' } })
    )
  })

  it('keeps the installed catalog when a replacement fails staged validation', async () => {
    mockDownload(catalogArchive())
    await install()
    const before = readFileSync(catalogPath())

    mockDownload(gzipSync(Buffer.from('not a sqlite database')))
    await expect(install()).rejects.toThrow()

    expect(readFileSync(catalogPath())).toEqual(before)
    expect(status()).toEqual({ installed: true, gameCount: 1, snapshot: '2026-06-27' })
  })
})
