import Database from 'better-sqlite3'
import { existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync, statSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const root = vi.hoisted(() => ({ dir: '' }))
const pool = vi.hoisted(() => ({ rows: ['ok'] as string[] }))

vi.mock('electron', () => ({ app: { getPath: () => root.dir } }))
vi.mock('../src/main/db/connection', () => ({ getDbPath: () => join(root.dir, 'navihub.db') }))
vi.mock('../src/main/dict/dictDb', () => ({ getDictDbPath: () => join(root.dir, 'dictionaries.db') }))
vi.mock('../src/main/gamesCatalogDb', () => ({ catalogPath: () => join(root.dir, 'rawg-catalog.db') }))
vi.mock('../src/main/launchboxCatalogDb', () => ({
  launchboxCatalogPath: () => join(root.dir, 'games-catalog.db')
}))
vi.mock('../src/main/files', () => ({
  mediaRoot: () => join(root.dir, 'media'),
  picturesDir: () => join(root.dir, 'pictures'),
  historyRootDir: () => join(root.dir, 'history'),
  videoCacheDir: () => join(root.dir, 'videocache')
}))
vi.mock('../src/main/thumbs', () => ({ thumbsDir: () => join(root.dir, 'thumbs') }))
vi.mock('../src/main/logFile', () => ({ logDir: () => join(root.dir, 'logs') }))
vi.mock('../src/main/quizPools', () => ({ callQuizPools: async () => pool.rows }))

import { checkDatabase, clearCache, usage } from '../src/main/storageUsage'
import {
  compactPending,
  requestCompact,
  runStartupMaintenance,
  takeStartupNotices
} from '../src/main/startupMaintenance'

function put(rel: string, bytes: number): void {
  const path = join(root.dir, rel)
  mkdirSync(join(path, '..'), { recursive: true })
  writeFileSync(path, Buffer.alloc(bytes))
}

beforeEach(() => {
  root.dir = mkdtempSync(join(tmpdir(), 'navihub-storage-'))
  pool.rows = ['ok']
  takeStartupNotices()
})
afterEach(() => rmSync(root.dir, { recursive: true, force: true }))

describe('storage usage', () => {
  it('sums each part, including nested folders, and tolerates missing ones', async () => {
    put('navihub.db', 1000)
    put('navihub.db-wal', 24)
    put('media/a.jpg', 300)
    put('media/picked/b.png', 200)
    put('thumbs/320/c.jpg', 50)
    const report = await usage()
    const by = Object.fromEntries(report.entries.map((e) => [e.key, e]))
    expect(by.database).toMatchObject({ bytes: 1024, files: 2, clearable: false })
    expect(by.media).toMatchObject({ bytes: 500, files: 2 })
    expect(by.thumbnails).toMatchObject({ bytes: 50, files: 1, clearable: true })
    expect(by.pictures).toMatchObject({ bytes: 0, files: 0 })
    expect(report.dataFolder).toBe(root.dir)
  })

  it('clears only the regenerated caches, keeping the folders', async () => {
    put('thumbs/320/c.jpg', 50)
    put('thumbs/d.png', 50)
    put('videocache/subs/x.srt', 10)
    put('videocache/legacy.mkv', 10)
    expect(await clearCache('thumbnails')).toEqual({ ok: true, message: 'Cleared 2 files.' })
    expect(readdirSync(join(root.dir, 'thumbs'))).toEqual([])
    await clearCache('subtitles')
    expect(existsSync(join(root.dir, 'videocache/legacy.mkv'))).toBe(true)
    await expect(clearCache('media' as never)).rejects.toThrow('not a clearable cache')
  })

  it('reports the integrity check from the pool process', async () => {
    expect((await checkDatabase()).ok).toBe(true)
    pool.rows = ['row 3 missing from index', 'page 9 is never used']
    expect(await checkDatabase()).toMatchObject({ ok: false })
    expect((await checkDatabase()).message).toContain('2 problems')
  })
})

describe('compact on next launch', () => {
  it('runs VACUUM before the database opens, once, and leaves a notice', () => {
    const dbPath = join(root.dir, 'navihub.db')
    const db = new Database(dbPath)
    db.exec('CREATE TABLE t (x BLOB)')
    const insert = db.prepare('INSERT INTO t VALUES (?)')
    for (let i = 0; i < 200; i++) insert.run(Buffer.alloc(4096))
    db.exec('DELETE FROM t')
    db.close()
    const before = statSync(dbPath).size

    requestCompact(root.dir)
    expect(compactPending(root.dir)).toBe(true)
    runStartupMaintenance(root.dir, dbPath)

    expect(statSync(dbPath).size).toBeLessThan(before)
    expect(compactPending(root.dir)).toBe(false)
    const notices = takeStartupNotices()
    expect(notices).toHaveLength(1)
    expect(notices[0]).toMatchObject({ ok: true })
    expect(takeStartupNotices()).toEqual([])
  })

  it('does nothing without the marker', () => {
    runStartupMaintenance(root.dir, join(root.dir, 'navihub.db'))
    expect(takeStartupNotices()).toEqual([])
  })
})
