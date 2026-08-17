import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import os from 'node:os'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import AdmZip from 'adm-zip'
import { createTestDb } from './helpers'

let db: Database.Database
let root: string
let booksRoot: string
const showOpenDialog = vi.fn()

vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))
// manga.ts pulls dialog from electron and the library roots from files.ts —
// both replaced so the module runs under plain Node against temp dirs.
vi.mock('electron', () => ({
  dialog: { showOpenDialog: (...args: unknown[]) => showOpenDialog(...args) }
}))
vi.mock('../src/main/files', () => ({
  mangaRootDir: () => root,
  booksRootDir: () => booksRoot
}))

import * as manga from '../src/main/manga'
// Imported to check the OTHER half of what ipc.ts does on a first read: the
// checklist credit, which deliberately does not touch media_item.progress.
import * as checklistRepo from '../src/main/repos/checklistRepo'

beforeEach(() => {
  db = createTestDb()
  root = mkdtempSync(join(os.tmpdir(), 'navihub-manga-'))
  booksRoot = mkdtempSync(join(os.tmpdir(), 'navihub-books-'))
  showOpenDialog.mockReset()
})

afterEach(() => {
  rmSync(root, { recursive: true, force: true })
  rmSync(booksRoot, { recursive: true, force: true })
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
    expect(scanned).toEqual([
      { dirPath: '', title: 'One Shot', number: null, pageCount: 5, coverPage: 'p001.png' }
    ])
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

  it('reaching the last page completes the chapter, raises progress and reports a first read', async () => {
    const { mediaId, chapters } = await setup()
    expect(manga.markProgress(chapters[0].id, 0)?.firstTime).toBe(false)
    expect(manga.chapters(mediaId).chapters[0].readAt).toBeNull()
    expect(mediaProgress(mediaId)).toBe(0)

    const res = manga.markProgress(chapters[0].id, 1) // last page of a 2-page chapter
    const ch = manga.chapters(mediaId).chapters[0]
    expect(ch.readAt).not.toBeNull()
    expect(ch.lastReadPage).toBe(1)
    // firstTime is ONLY a checklist signal; the progress write is the sync's.
    expect(res).toEqual({ mediaId, firstTime: true })
    expect(mediaProgress(mediaId)).toBe(1)

    // Re-reading the same chapter is not a new read.
    expect(manga.markProgress(chapters[0].id, 1)?.firstTime).toBe(false)
  })

  // The bug this ordering exists to prevent. checklistRepo.logProgress means
  // "one more unit" and WRAPS a finished title into a fresh pass; the manga
  // reader fires automatically on the last page, so routing it through
  // logProgress reset a completed 150-chapter series to 1 just for opening it.
  it('reading a chapter of a COMPLETED series never resets its progress', async () => {
    const { mediaId, chapters } = await setup()
    db.prepare(`UPDATE media_item SET progress = 150, total_units = 150, status = 'Completed',
                rewatch_count = 1 WHERE id = ?`).run(mediaId)

    manga.markProgress(chapters[0].id, 1)
    const row = db
      .prepare('SELECT progress, status, rewatch_count FROM media_item WHERE id = ?')
      .get(mediaId)
    expect(row).toEqual({ progress: 150, status: 'Completed', rewatch_count: 1 })
  })

  // Ticking one chapter says "I have read up to here", not "+1".
  it('ticking a mid-series chapter floors progress at that chapter number', async () => {
    const mediaId = makeMedia('Long', 0)
    const dir = makeSeries('Long', { 'Ch 001': 2, 'Ch 060': 2 })
    await attachViaDialog(mediaId, dir)
    const chs = manga.chapters(mediaId).chapters
    const ch60 = chs.find((c) => c.title.includes('060'))!
    expect(manga.markChapterRead(ch60.id, true)?.firstTime).toBe(true)
    expect(mediaProgress(mediaId)).toBe(60)
  })

  // The sync only ever raises, so the round trip is idempotent — the old
  // +1 path counted the re-tick as a second chapter.
  it('un-ticking then re-ticking a chapter does not double-count', async () => {
    const { mediaId, chapters } = await setup()
    manga.markChapterRead(chapters[1].id, true) // Ch 002
    expect(mediaProgress(mediaId)).toBe(2)
    manga.markChapterRead(chapters[1].id, false)
    manga.markChapterRead(chapters[1].id, true)
    expect(mediaProgress(mediaId)).toBe(2)
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
    for (const ch of chs) manga.markChapterRead(ch.id, true)
    expect(mediaProgress(mediaId)).toBe(2)
  })

  // Reading credits the board without moving progress — the two are separate
  // concerns, which is what lets a completed series be re-read safely.
  it('a first read credits the checklist without a progress write of its own', async () => {
    const { mediaId, chapters } = await setup()
    db.prepare(`INSERT INTO checklist_task (task_key, cadence) VALUES ('manga-chapter', 'daily')`).run()
    const res = manga.markChapterRead(chapters[0].id, true)
    expect(res?.firstTime).toBe(true)
    const logId = checklistRepo.creditMediaLog(mediaId, '2026-08-08')
    expect(logId).not.toBeNull()

    const logs = db.prepare('SELECT payload FROM checklist_log').all() as { payload: string }[]
    expect(logs).toHaveLength(1)
    // No `prior`: undoing the credit must not rewrite progress it never set.
    expect(JSON.parse(logs[0].payload).prior).toBeUndefined()
    checklistRepo.undoLog(logId!)
    expect(mediaProgress(mediaId)).toBe(1) // the sync's number, untouched by undo
  })

  it('never lowers progress — imported counts and reading done elsewhere survive', async () => {
    const { mediaId, chapters } = await setup()
    db.prepare('UPDATE media_item SET progress = 50 WHERE id = ?').run(mediaId)
    manga.markChapterRead(chapters[1].id, true) // Ch 002: 2 < 50, no change
    expect(mediaProgress(mediaId)).toBe(50)
    manga.markChapterRead(chapters[1].id, false)
    expect(mediaProgress(mediaId)).toBe(50)
  })
})

// Minimal-but-valid EPUB: container → OPF → two spine documents + nav TOC.
function makeEpub(absPath: string): void {
    const zip = new AdmZip()
    zip.addFile('mimetype', Buffer.from('application/epub+zip'))
    zip.addFile(
      'META-INF/container.xml',
      Buffer.from(
        `<container><rootfiles><rootfile full-path="OEBPS/content.opf"/></rootfiles></container>`
      )
    )
    zip.addFile(
      'OEBPS/content.opf',
      Buffer.from(`<package>
        <metadata xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:title>LN</dc:title></metadata>
        <manifest>
          <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
          <item id="c1" href="ch1.xhtml" media-type="application/xhtml+xml"/>
          <item id="c2" href="ch2.xhtml" media-type="application/xhtml+xml"/>
        </manifest>
        <spine><itemref idref="c1"/><itemref idref="c2"/></spine>
      </package>`)
    )
    zip.addFile(
      'OEBPS/nav.xhtml',
      Buffer.from(
        `<html xmlns:epub="x"><body><nav epub:type="toc"><ol>
           <li><a href="ch1.xhtml">第一章</a></li><li><a href="ch2.xhtml">第二章</a></li>
         </ol></nav></body></html>`
      )
    )
    zip.addFile('OEBPS/ch1.xhtml', Buffer.from('<html><body><p>一</p></body></html>'))
    zip.addFile('OEBPS/ch2.xhtml', Buffer.from('<html><body><p>二</p></body></html>'))
    zip.writeZip(absPath)
}

describe('EPUB books in the manga section', () => {
  it('scanner discovers .epub volumes alongside image chapters, pageCount = spine length', async () => {
    const dir = makeSeries('Mixed', { 'Ch 001': 2 })
    makeEpub(join(dir, 'Vol 2.epub'))
    const scanned = await manga.scanSeriesDir(dir, 'Mixed')
    expect(scanned.map((c) => c.dirPath).sort()).toEqual(['Ch 001', 'Vol 2.epub'])
    const book = scanned.find((c) => c.dirPath === 'Vol 2.epub')!
    // number stays null by design: "Vol N" is a volume marker, not a chapter
    // number (media progress then counts read volumes instead).
    expect(book).toMatchObject({ title: 'Vol 2', number: null, pageCount: 2 })
  })

  it('an epub-only folder attaches (novels without any image chapters)', async () => {
    const mediaId = makeMedia('Novel', 0)
    const dir = join(root, 'Novel')
    mkdirSync(dir)
    makeEpub(join(dir, 'Vol 1.epub'))
    const res = await attachViaDialog(mediaId, dir)
    expect(res).toMatchObject({ ok: true, chapterCount: 1 })
  })

  it('a broken .epub is skipped, not fatal', async () => {
    const dir = makeSeries('Broken', { 'Ch 001': 1 })
    writeFileSync(join(dir, 'garbage.epub'), 'not a zip')
    const scanned = await manga.scanSeriesDir(dir, 'Broken')
    expect(scanned.map((c) => c.dirPath)).toEqual(['Ch 001'])
  })

  it('pages() serves spine documents as navimg URLs with the TOC riding along', async () => {
    const mediaId = makeMedia('Novel', 0)
    const dir = join(root, 'Novel')
    mkdirSync(dir)
    makeEpub(join(dir, 'Vol 1.epub'))
    await attachViaDialog(mediaId, dir)
    const ch = manga.chapters(mediaId).chapters[0]

    const pages = await manga.pages(ch.id)
    expect(pages).not.toBeNull()
    expect(pages!.isBook).toBe(true)
    expect(pages!.pages.map((p) => p.relPath)).toEqual([
      'manga/Novel/Vol 1.epub/OEBPS/ch1.xhtml',
      'manga/Novel/Vol 1.epub/OEBPS/ch2.xhtml'
    ])
    expect(pages!.pages[0].url).toMatch(/^navimg:\/\//)
    expect(pages!.toc).toEqual([
      { label: '第一章', page: 0 },
      { label: '第二章', page: 1 }
    ])

    // Reading progress uses the same rows/flow as image chapters.
    manga.markProgress(ch.id, 1) // last section → chapter completes
    const after = manga.chapters(mediaId).chapters[0]
    expect(after.readAt).not.toBeNull()
  })

  it('image pages() responses are not marked as books', async () => {
    const mediaId = makeMedia('Berserk', 0)
    const dir = makeSeries('Berserk', { 'Ch 001': 2 })
    await attachViaDialog(mediaId, dir)
    const ch = manga.chapters(mediaId).chapters[0]
    const pages = await manga.pages(ch.id)
    expect(pages!.isBook).toBeUndefined()
    expect(pages!.toc).toBeUndefined()
  })
})

describe('book-type media (the Books section reusing the chapter machinery)', () => {
  function makeBookMedia(title = 'The Hobbit', progress = 0): number {
    const info = db
      .prepare(`INSERT INTO media_item (media_type, title, progress) VALUES ('book', ?, ?)`)
      .run(title, progress)
    return Number(info.lastInsertRowid)
  }
  const mediaProgress = (id: number) =>
    (db.prepare('SELECT progress FROM media_item WHERE id = ?').get(id) as { progress: number })
      .progress

  it('attaches under the books root and serves pages with the books/ prefix', async () => {
    const mediaId = makeBookMedia()
    const dir = join(booksRoot, 'The Hobbit')
    mkdirSync(dir)
    makeEpub(join(dir, 'Vol 1.epub'))

    const res = await attachViaDialog(mediaId, dir)
    expect(res).toMatchObject({ ok: true, chapterCount: 1 })
    // First attach bootstraps books.dir (not manga.dir).
    expect(db.prepare(`SELECT value FROM settings WHERE key='books.dir'`).get()).toEqual({
      value: booksRoot
    })
    expect(db.prepare(`SELECT value FROM settings WHERE key='manga.dir'`).get()).toBeUndefined()

    const ch = manga.chapters(mediaId).chapters[0]
    const doc = (await manga.pages(ch.id))!
    expect(doc.isBook).toBe(true)
    expect(doc.pages.map((p) => p.relPath)).toEqual([
      'books/The Hobbit/Vol 1.epub/OEBPS/ch1.xhtml',
      'books/The Hobbit/Vol 1.epub/OEBPS/ch2.xhtml'
    ])
  })

  it('rescan resolves against the books root', async () => {
    const mediaId = makeBookMedia()
    const dir = join(booksRoot, 'Series')
    mkdirSync(dir)
    makeEpub(join(dir, 'Vol 1.epub'))
    await attachViaDialog(mediaId, dir)

    makeEpub(join(dir, 'Vol 2.epub'))
    expect((await manga.rescan(mediaId)).ok).toBe(true)
    expect(manga.chapters(mediaId).chapters.map((c) => c.dirPath)).toEqual([
      'Series/Vol 1.epub',
      'Series/Vol 2.epub'
    ])
  })

  it('finishing a volume marks it read but NEVER touches page-based media progress', async () => {
    const mediaId = makeBookMedia('The Hobbit', 120) // 120 pages in
    const dir = join(booksRoot, 'The Hobbit')
    mkdirSync(dir)
    makeEpub(join(dir, 'Vol 1.epub'))
    await attachViaDialog(mediaId, dir)
    const ch = manga.chapters(mediaId).chapters[0]

    manga.markProgress(ch.id, 1) // last spine section → volume completes
    const after = manga.chapters(mediaId).chapters[0]
    expect(after.readAt).not.toBeNull()
    expect(after.lastReadPage).toBe(1)
    // syncMediaProgress would have slammed 120 down to 1 without the guard.
    expect(mediaProgress(mediaId)).toBe(120)

    // And a book NEVER reports a creditable read: book is not a unit-progress
    // type, so advanceProgress would mark the whole multi-volume book completed
    // on finishing volume one.
    expect(manga.markChapterRead(ch.id, true)?.firstTime).toBe(false)
    expect(mediaProgress(mediaId)).toBe(120)
  })

  it('manga rows are unaffected by the book root derivation (regression)', async () => {
    const mediaId = makeMedia('Berserk', 0)
    const dir = makeSeries('Berserk', { 'Ch 001': 2 })
    await attachViaDialog(mediaId, dir)
    const ch = manga.chapters(mediaId).chapters[0]
    const doc = (await manga.pages(ch.id))!
    expect(doc.pages[0].relPath).toBe('manga/Berserk/Ch 001/p001.png')
    // Manga IS creditable, unlike the book row above, and its progress syncs.
    const res = manga.markChapterRead(ch.id, true)
    expect(res?.firstTime).toBe(true)
    expect(mediaProgress(mediaId)).toBe(1)
  })
})

describe('chapter thumbnails', () => {
  // The Volumes grid needs a page to show. The scanner records the FIRST page
  // (naturally sorted, so it matches what the reader opens), and syncChapters
  // stores it as a virtual path.
  it('records the first page of a folder chapter, natural-sorted', async () => {
    const dir = join(root, 'Natural')
    mkdirSync(join(dir, 'ch 1'), { recursive: true })
    for (const n of ['10.png', '2.png', '1.png']) {
      writeFileSync(join(dir, 'ch 1', n), 'x')
    }
    const scanned = await manga.scanSeriesDir(dir, 'Natural')
    expect(scanned[0].coverPage).toBe('1.png')
  })

  it('stores it as a prefixed virtual path on attach', async () => {
    const mediaId = makeMedia('Thumbs')
    const dir = makeSeries('Thumbs', { 'ch 1': 2 })
    await attachViaDialog(mediaId, dir)
    const ch = manga.chapters(mediaId).chapters[0]
    expect(ch.coverPath).toBe('manga/Thumbs/ch 1/p001.png')
  })

  it('keeps the stored thumbnail when a rescan cannot produce one', async () => {
    const mediaId = makeMedia('Keeps')
    const dir = makeSeries('Keeps', { 'ch 1': 2 })
    await attachViaDialog(mediaId, dir)
    const before = manga.chapters(mediaId).chapters[0].coverPath
    expect(before).not.toBeNull()

    // A rescan that reports the same chapter with no cover must not blank it.
    await manga.rescan(mediaId)
    expect(manga.chapters(mediaId).chapters[0].coverPath).toBe(before)
  })
})

