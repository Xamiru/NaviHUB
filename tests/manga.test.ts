import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import os from 'node:os'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import AdmZip from 'adm-zip'
import { createTestDb } from './helpers'

let db: Database.Database
let root: string
const showOpenDialog = vi.fn()

vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))
// manga.ts pulls dialog from electron and the library root from files.ts —
// both replaced so the module runs under plain Node against a temp dir.
vi.mock('electron', () => ({
  dialog: { showOpenDialog: (...args: unknown[]) => showOpenDialog(...args) }
}))
vi.mock('../src/main/files', () => ({
  mangaRootDir: () => root
}))

import * as manga from '../src/main/manga'

beforeEach(() => {
  db = createTestDb()
  root = mkdtempSync(join(os.tmpdir(), 'navihub-manga-'))
  showOpenDialog.mockReset()
})

afterEach(() => {
  rmSync(root, { recursive: true, force: true })
})

function makeSeries(name: string, chapters: Record<string, number>): string {
  const dir = join(root, name)
  mkdirSync(dir, { recursive: true })
  for (const [ch, pages] of Object.entries(chapters)) {
    const chDir = ch === '' ? dir : join(dir, ch)
    mkdirSync(chDir, { recursive: true })
    for (let i = 1; i <= pages; i++) {
      writeFileSync(join(chDir, `p${String(i).padStart(3, '0')}.png`), 'x')
    }
  }
  return dir
}

function makeCbz(absPath: string, entries: Record<string, string>): void {
  const zip = new AdmZip()
  for (const [entry, content] of Object.entries(entries)) {
    zip.addFile(entry, Buffer.from(content))
  }
  zip.writeZip(absPath)
}

function makeMedia(title = 'Berserk', progress = 0): number {
  const info = db
    .prepare(`INSERT INTO media_item (media_type, title, progress) VALUES ('manga', ?, ?)`)
    .run(title, progress)
  return Number(info.lastInsertRowid)
}

function attachViaDialog(mediaId: number, absDir: string) {
  showOpenDialog.mockResolvedValueOnce({ canceled: false, filePaths: [absDir] })
  return manga.attachFolder(mediaId)
}

describe('parseChapterNumber', () => {
  it.each([
    ['ch. 12', 12],
    ['Chapter 012.5', 12.5],
    ['第12話', 12],
    ['012', 12],
    ['Vol.3 Ch.25', 25],
    ['Vol 3', null],
    ['第3巻', null],
    ['Extras', null],
    ['Berserk 041', 41]
  ])('%s → %s', (name, expected) => {
    expect(manga.parseChapterNumber(name)).toBe(expected)
  })
})

describe('listChapterPages', () => {
  it('natural-sorts pages and ignores non-images', async () => {
    const dir = join(root, 'flat')
    mkdirSync(dir)
    for (const f of ['2.png', '10.png', '1.png', 'notes.txt', '.hidden.png']) {
      writeFileSync(join(dir, f), 'x')
    }
    expect(await manga.listChapterPages(dir)).toEqual(['1.png', '2.png', '10.png'])
  })

  it('returns [] for a missing directory', async () => {
    expect(await manga.listChapterPages(join(root, 'nope'))).toEqual([])
  })
})

describe('scanSeriesDir', () => {
  it('treats a flat series as one chapter', async () => {
    const dir = makeSeries('OneShot', { '': 5 })
    const scanned = await manga.scanSeriesDir(dir, 'One Shot')
    expect(scanned).toEqual([{ dirPath: '', title: 'One Shot', number: null, pageCount: 5 }])
  })

  it('finds chapter subfolders in natural order (ch2 before ch10)', async () => {
    const dir = makeSeries('Serial', { 'ch 2': 3, 'ch 10': 3, 'ch 1': 3 })
    const scanned = await manga.scanSeriesDir(dir, 'Serial')
    expect(scanned.map((c) => c.title)).toEqual(['ch 1', 'ch 2', 'ch 10'])
    expect(scanned.map((c) => c.number)).toEqual([1, 2, 10])
  })

  it('tolerates mixed layouts (loose pages + chapter dirs + nesting)', async () => {
    const dir = makeSeries('Mixed', { '': 2, 'Ch 001': 3 })
    mkdirSync(join(dir, 'Vol 01', 'Ch 002'), { recursive: true })
    writeFileSync(join(dir, 'Vol 01', 'Ch 002', 'p1.png'), 'x')
    const scanned = await manga.scanSeriesDir(dir, 'Mixed')
    expect(scanned.map((c) => c.dirPath).sort()).toEqual(['', 'Ch 001', 'Vol 01/Ch 002'])
    // unnumbered root chapter sorts last
    expect(scanned[scanned.length - 1].dirPath).toBe('')
  })

  it('skips _ocr directories (mokuro output is not pages)', async () => {
    const dir = makeSeries('Raw', { 'Ch 001': 2 })
    mkdirSync(join(dir, '_ocr', 'Ch 001'), { recursive: true })
    writeFileSync(join(dir, '_ocr', 'Ch 001', 'p001.png'), 'x')
    expect((await manga.scanSeriesDir(dir, 'Raw')).map((c) => c.dirPath)).toEqual(['Ch 001'])
  })

  it('treats .cbz/.zip archives as chapters, mixed with folder chapters', async () => {
    const dir = makeSeries('Zipped', { 'Ch 001': 2 })
    makeCbz(join(dir, 'Ch 002.cbz'), { '0001.png': 'a', '0002.png': 'b', 'info.txt': 'x' })
    makeCbz(join(dir, 'empty.cbz'), { 'readme.txt': 'no pages' })
    const scanned = await manga.scanSeriesDir(dir, 'Zipped')
    expect(scanned.map((c) => [c.dirPath, c.number, c.pageCount])).toEqual([
      ['Ch 001', 1, 2],
      ['Ch 002.cbz', 2, 2] // empty.cbz skipped: no page images inside
    ])
  })
})

describe('attach / rescan / detach', () => {
  it('attaches a series, stores root-relative chapters, and lists pages', async () => {
    const mediaId = makeMedia()
    const dir = makeSeries('Berserk', { 'Ch 001': 3, 'Ch 002': 4 })

    const res = await attachViaDialog(mediaId, dir)
    expect(res).toEqual({ ok: true, chapterCount: 2 })

    const lib = manga.chapters(mediaId)
    expect(lib.localDir).toBe('Berserk')
    expect(lib.chapters.map((c) => c.dirPath)).toEqual(['Berserk/Ch 001', 'Berserk/Ch 002'])
    expect(lib.chapters[0].pageCount).toBe(3)

    const doc = (await manga.pages(lib.chapters[1].id))!
    expect(doc.pages).toHaveLength(4)
    expect(doc.pages[0].relPath).toBe('manga/Berserk/Ch 002/p001.png')
    expect(doc.pages[0].url).toContain('navimg://')
  })

  it('rescan picks up new/removed chapters but preserves reading state', async () => {
    const mediaId = makeMedia()
    const dir = makeSeries('Serial', { 'Ch 001': 3, 'Ch 002': 3 })
    await attachViaDialog(mediaId, dir)

    const before = manga.chapters(mediaId).chapters
    manga.markProgress(before[0].id, 1)

    // disk changes: Ch 002 vanishes, Ch 003 appears
    rmSync(join(dir, 'Ch 002'), { recursive: true })
    mkdirSync(join(dir, 'Ch 003'))
    writeFileSync(join(dir, 'Ch 003', 'p1.png'), 'x')

    expect((await manga.rescan(mediaId)).ok).toBe(true)
    const after = manga.chapters(mediaId).chapters
    expect(after.map((c) => c.dirPath)).toEqual(['Serial/Ch 001', 'Serial/Ch 003'])
    expect(after[0].id).toBe(before[0].id)
    expect(after[0].lastReadPage).toBe(1)
  })

  it('detach removes chapters and clears local_dir', async () => {
    const mediaId = makeMedia()
    await attachViaDialog(mediaId, makeSeries('Gone', { 'Ch 001': 2 }))
    manga.detach(mediaId)
    const lib = manga.chapters(mediaId)
    expect(lib.localDir).toBeNull()
    expect(lib.chapters).toEqual([])
  })

  it('serves cbz chapter pages as archive-entry URLs', async () => {
    const mediaId = makeMedia('Zipped')
    const dir = join(root, 'Zipped')
    mkdirSync(dir)
    makeCbz(join(dir, 'Vol 1.cbz'), { 'Vol 1/0002.png': 'b', 'Vol 1/0001.png': 'a' })
    const res = await attachViaDialog(mediaId, dir)
    expect(res).toEqual({ ok: true, chapterCount: 1 })

    const ch = manga.chapters(mediaId).chapters[0]
    expect(ch.dirPath).toBe('Zipped/Vol 1.cbz')
    const doc = (await manga.pages(ch.id))!
    expect(doc.pages.map((p) => p.relPath)).toEqual([
      'manga/Zipped/Vol 1.cbz/Vol 1/0001.png',
      'manga/Zipped/Vol 1.cbz/Vol 1/0002.png'
    ])
    expect(doc.pages[0].url).toContain('navimg://')
  })

  it('rejects a folder outside the library root', async () => {
    // First attach bootstraps manga.dir to the picked folder's parent.
    const mediaId = makeMedia()
    await attachViaDialog(mediaId, makeSeries('Inside', { '': 1 }))
    const outside = mkdtempSync(join(os.tmpdir(), 'navihub-outside-'))
    try {
      mkdirSync(join(outside, 'Elsewhere'))
      writeFileSync(join(outside, 'Elsewhere', 'p1.png'), 'x')
      const res = await attachViaDialog(makeMedia('Other'), join(outside, 'Elsewhere'))
      expect(res.ok).toBe(false)
      expect(res.error).toMatch(/library root/)
    } finally {
      rmSync(outside, { recursive: true, force: true })
    }
  })
})

describe('reading progress', () => {
  async function setup() {
    const mediaId = makeMedia('Serial', 0)
    const dir = makeSeries('Serial', { 'Ch 001': 2, 'Ch 002': 2, Extras: 2 })
    await attachViaDialog(mediaId, dir)
    return { mediaId, chapters: manga.chapters(mediaId).chapters }
  }
  const mediaProgress = (id: number) =>
    (db.prepare('SELECT progress FROM media_item WHERE id = ?').get(id) as { progress: number })
      .progress

  it('reaching the last page completes the chapter and raises media progress', async () => {
    const { mediaId, chapters } = await setup()
    manga.markProgress(chapters[0].id, 0)
    expect(manga.chapters(mediaId).chapters[0].readAt).toBeNull()
    expect(mediaProgress(mediaId)).toBe(0)

    manga.markProgress(chapters[0].id, 1) // last page of a 2-page chapter
    const ch = manga.chapters(mediaId).chapters[0]
    expect(ch.readAt).not.toBeNull()
    expect(ch.lastReadPage).toBe(1)
    expect(mediaProgress(mediaId)).toBe(1) // max read chapter number
  })

  it('uses the highest read chapter number, and never lowers progress', async () => {
    const { mediaId, chapters } = await setup()
    db.prepare('UPDATE media_item SET progress = 50 WHERE id = ?').run(mediaId)

    manga.markChapterRead(chapters[1].id, true) // Ch 002
    expect(mediaProgress(mediaId)).toBe(50) // 2 < 50 → untouched

    manga.markChapterRead(chapters[1].id, false)
    expect(mediaProgress(mediaId)).toBe(50) // unmarking never lowers

    const unread = manga.chapters(mediaId).chapters[1]
    expect(unread.readAt).toBeNull()
    expect(unread.lastReadPage).toBeNull()
  })

  it('counts read chapters when no chapter numbers were parsed', async () => {
    const mediaId = makeMedia('Oneshots', 0)
    const dir = makeSeries('Oneshots', { Prologue: 2, Epilogue: 2 })
    await attachViaDialog(mediaId, dir)
    const chs = manga.chapters(mediaId).chapters
    manga.markChapterRead(chs[0].id, true)
    manga.markChapterRead(chs[1].id, true)
    expect(mediaProgress(mediaId)).toBe(2)
  })
})
