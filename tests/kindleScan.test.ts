import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import Database from 'better-sqlite3'
import { mkdtempSync, mkdirSync, readdirSync, rmSync, statSync, symlinkSync, writeFileSync, existsSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { detectDevices, FilesystemDevice } from '../src/main/kindle/kindleDevice'
import { readDevice } from '../src/main/kindle/kindleScan'
import { partialMd5 } from '../src/main/kindle/kindleCore'
import { TaskCancelledError } from '../src/main/tasks'

// A Kindle storage root as the gvfs mount shows it, built on disk.
let base: string
let root: string

function put(rel: string, content: string | Buffer): void {
  const abs = join(root, ...rel.split('/'))
  mkdirSync(join(abs, '..'), { recursive: true })
  writeFileSync(abs, content)
}

function listAll(dir: string): string[] {
  const out: string[] = []
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name)
    if (statSync(abs).isDirectory()) out.push(...listAll(abs).map((n) => `${name}/${n}`))
    else out.push(name)
  }
  return out.sort()
}

function statsDb(md5: string): void {
  const abs = join(root, 'koreader', 'settings', 'statistics.sqlite3')
  mkdirSync(join(abs, '..'), { recursive: true })
  const db = new Database(abs)
  db.exec(`
    CREATE TABLE book (id integer PRIMARY KEY autoincrement, title text, authors text, notes integer,
      last_open integer, highlights integer, pages integer, series text, language text, md5 text,
      total_read_time integer, total_read_pages integer);
    CREATE TABLE page_stat_data (id_book integer, page integer NOT NULL DEFAULT 0,
      start_time integer NOT NULL DEFAULT 0, duration integer NOT NULL DEFAULT 0,
      total_pages integer NOT NULL DEFAULT 0, UNIQUE (id_book, page, start_time));`)
  db.prepare(`INSERT INTO book (id, title, authors, md5, pages) VALUES (1, 'Dune', 'Frank Herbert', ?, 300)`).run(md5)
  db.prepare(`INSERT INTO book (id, title, md5) VALUES (2, 'Gone', ?)`).run('f'.repeat(32))
  const ins = db.prepare(`INSERT INTO page_stat_data (id_book, page, start_time, duration, total_pages) VALUES (?, ?, ?, ?, 300)`)
  ins.run(1, 10, 1_761_000_000, 120)
  ins.run(2, 1, 1_761_000_000, 60)
  db.close()
}

beforeEach(() => {
  base = mkdtempSync(join(tmpdir(), 'navihub-kindle-'))
  root = join(base, 'Internal Storage')
  mkdirSync(root)
})

afterEach(() => {
  rmSync(base, { recursive: true, force: true })
})

describe('readDevice', () => {
  it('reads sidecars from all three locations, the statistics and the book files, read-only', async () => {
    const book = Buffer.alloc(5000, 7)
    put('documents/Downloads/Dune.epub', book)
    put('documents/Downloads/Dune.sdr/metadata.epub.lua', 'return { ["doc_props"] = { ["title"] = "Dune" }, ["percent_finished"] = 0.3 }')
    put('documents/Downloads/Dune.sdr/metadata.epub.lua.old', 'not lua at all {{{')
    put('documents/Unopened.cbz', 'x')
    put('documents/Stock.sdr/Stock.azw3f', 'stock reader data')
    put('documents/dictionaries/Oxford.sdr/metadata.azw.lua', 'return { ["doc_props"] = { ["title"] = "Oxford" } }')
    put('documents/.cache/kf8/x.epub', 'x')
    put('koreader/docsettings/mnt/us/documents/B.sdr/metadata.pdf.lua', 'return { ["partial_md5_checksum"] = "' + '1'.repeat(32) + '" }')
    put('koreader/hashdocsettings/22/' + '2'.repeat(32) + '.sdr/metadata.epub.lua',
      'return { ["doc_path"] = "/mnt/us/documents/C.epub", ["partial_md5_checksum"] = "' + '2'.repeat(32) + '" }')
    put('koreader/settings/vocabulary_builder.sqlite3', 'vocab')
    put('documents/Broken.sdr/metadata.epub.lua', 'return { oops')
    const expectedMd5 = await partialMd5(async (o, l) => book.subarray(o, o + l))
    statsDb(expectedMd5)
    const before = listAll(root)

    const device = new FilesystemDevice(root, 'Kindle')
    const snapshotDir = join(base, 'snap')
    const snap = await readDevice(device, { snapshotDir, workDir: join(base, 'work') })

    expect(listAll(root)).toEqual(before) // nothing on the device changed
    expect(snap.hasKoReader).toBe(true)
    const byPath = new Map(snap.sidecars.map((s) => [s.bookPath, s]))
    expect([...byPath.keys()].sort()).toEqual(['documents/B.pdf', 'documents/C.epub', 'documents/Downloads/Dune.epub'])
    // The missing checksum is computed from the book file, as KOReader does.
    expect(byPath.get('documents/Downloads/Dune.epub')?.partialMd5).toBe(expectedMd5)
    expect(snap.files.map((f) => f.path).sort()).toEqual(['documents/Downloads/Dune.epub', 'documents/Unopened.cbz'])
    expect(snap.statsBooks.map((b) => b.title).sort()).toEqual(['Dune', 'Gone'])
    // The furthest page and the page count, for comics whose sidecar has no position.
    expect(snap.statsBooks.find((b) => b.title === 'Dune')).toMatchObject({ pages: 300, maxPage: 10 })
    expect(snap.statsBooks.find((b) => b.title === 'Gone')).toMatchObject({ pages: null, maxPage: 1 })
    // Summed per book and local day inside SQLite.
    expect(snap.statDays.map((d) => [d.md5, d.seconds, d.pages]).sort()).toEqual(
      [
        [expectedMd5, 120, 1],
        ['f'.repeat(32), 60, 1]
      ].sort()
    )
    expect(snap.warnings.some((w) => w.includes('Broken.sdr'))).toBe(true)

    const saved = listAll(snapshotDir)
    expect(saved).toContain('documents/Downloads/Dune.sdr/metadata.epub.lua')
    expect(saved).toContain('koreader/settings/statistics.sqlite3')
    expect(saved).toContain('koreader/settings/vocabulary_builder.sqlite3')
    expect(existsSync(join(base, 'work'))).toBe(true)
    expect(readdirSync(join(base, 'work'))).toEqual([]) // the working copy is gone
  })

  it('prefers the sidecar in the location KOReader is set to use', async () => {
    const md5 = '3'.repeat(32)
    put('documents/X.epub', 'x')
    put('documents/X.sdr/metadata.epub.lua', `return { ["partial_md5_checksum"] = "${md5}", ["percent_finished"] = 0.1 }`)
    put('koreader/docsettings/mnt/us/documents/X.sdr/metadata.epub.lua',
      `return { ["partial_md5_checksum"] = "${md5}", ["percent_finished"] = 0.9 }`)
    put('koreader/settings.reader.lua', 'return { ["document_metadata_folder"] = "dir" }')
    const snap = await readDevice(new FilesystemDevice(root, 'Kindle'), { snapshotDir: null, workDir: join(base, 'work') })
    expect(snap.sidecars[0].percent).toBe(0.9)
  })

  it('stops when the walk exceeds its entry budget', async () => {
    for (let i = 0; i < 5; i++) put(`documents/${i}.epub`, 'x')
    const device = new FilesystemDevice(root, 'Kindle')
    await expect(
      readDevice(device, { snapshotDir: null, workDir: join(base, 'work'), limits: { maxEntries: 3, maxDepth: 5 } })
    ).rejects.toThrow(/more than 3 files/)
  })

  it('skips symlinks and unsafe names instead of failing the check', async () => {
    put('documents/Good.epub', 'x')
    put('documents/bad\\name.epub', 'x')
    symlinkSync(join(root, 'documents'), join(root, 'documents', 'loop'))
    const device = new FilesystemDevice(root, 'Kindle')
    const snap = await readDevice(device, { snapshotDir: null, workDir: join(base, 'work') })
    expect(snap.files.map((f) => f.path)).toEqual(['documents/Good.epub'])
  })

  it('stops with a cancellation, not an error', async () => {
    put('documents/a.epub', 'x')
    const device = new FilesystemDevice(root, 'Kindle')
    await expect(
      readDevice(device, { snapshotDir: null, workDir: join(base, 'work'), shouldStop: () => true })
    ).rejects.toBeInstanceOf(TaskCancelledError)
  })

  it('refuses paths that leave the device root', async () => {
    const device = new FilesystemDevice(root, 'Kindle')
    await expect(device.readText('../secret', 10)).rejects.toThrow(/Unsafe/)
    await expect(device.list('documents/../..')).rejects.toThrow(/Unsafe/)
  })

  it('never overwrites a local file when copying off the device', async () => {
    put('documents/a.epub', 'device')
    const target = join(base, 'local.epub')
    writeFileSync(target, 'keep me')
    const device = new FilesystemDevice(root, 'Kindle')
    await expect(device.copyToLocal('documents/a.epub', target)).rejects.toThrow()
    expect(await device.copyToLocal('documents/missing.epub', join(base, 'x.epub'))).toBe(false)
    expect(existsSync(join(base, 'x.epub'))).toBe(false)
  })
})

describe('detectDevices', () => {
  it('finds a gvfs MTP Kindle and the copied folder, device first', async () => {
    const dirs: Record<string, string[]> = {
      '/run/user/1000/gvfs': ['mtp:host=Amazon_Kindle_Paperwhite_G000XXXXXXXXXXXX', 'smb-share:server=x'],
      '/run/user/1000/gvfs/mtp:host=Amazon_Kindle_Paperwhite_G000XXXXXXXXXXXX': ['Internal Storage']
    }
    const isDirs = new Set([
      '/run/user/1000/gvfs/mtp:host=Amazon_Kindle_Paperwhite_G000XXXXXXXXXXXX/Internal Storage/documents',
      '/copy/koreader'
    ])
    const found = await detectDevices({
      platform: 'linux',
      uid: 1000,
      user: 'me',
      folderSetting: '/copy',
      readdir: async (p) => dirs[p] ?? [],
      isDir: async (p) => isDirs.has(p)
    })
    expect(found.map((d) => [d.label, d.root])).toEqual([
      ['Amazon Kindle Paperwhite', '/run/user/1000/gvfs/mtp:host=Amazon_Kindle_Paperwhite_G000XXXXXXXXXXXX/Internal Storage'],
      ['Kindle folder', '/copy']
    ])
  })

  it('finds nothing on Windows without a folder (the shell bridge is a later slice)', async () => {
    expect(await detectDevices({ platform: 'win32', uid: null, user: null, folderSetting: null })).toEqual([])
  })
})
