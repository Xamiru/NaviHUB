import { mkdtempSync, mkdirSync, writeFileSync, rmSync, utimesSync } from 'node:fs'
import { join } from 'node:path'
import os from 'node:os'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// mokuro.ts only touches the DB in its chapterId-facing wrappers, which these
// tests don't exercise — but the module (and its manga.ts import) must still
// load under plain Node.
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => null }))
vi.mock('electron', () => ({ dialog: {} }))
vi.mock('../src/main/files', () => ({ mangaRootDir: () => '/nowhere' }))

import {
  parseMokuroVolume,
  parsePageJson,
  matchPages,
  findSidecar,
  getChapterOcr
} from '../src/main/mokuro'

const BLOCK = {
  box: [100, 200, 300, 600],
  vertical: true,
  font_size: 24,
  lines: ['また', '食べていた']
}

function volumeJson(pages: unknown[]): string {
  return JSON.stringify({ version: '0.2.1', title: 'T', volume: 'Vol 1', pages })
}

const page = (imgPath: string, blocks: unknown[] = [BLOCK]) => ({
  img_path: imgPath,
  img_width: 1600,
  img_height: 2400,
  blocks
})

describe('parseMokuroVolume', () => {
  it('maps pages and blocks', () => {
    const vol = parseMokuroVolume(volumeJson([page('001.jpg'), page('002.jpg')]))!
    expect(vol).toHaveLength(2)
    expect(vol[0].imgPath).toBe('001.jpg')
    expect(vol[0].ocr.imgWidth).toBe(1600)
    expect(vol[0].ocr.blocks[0]).toEqual({
      box: [100, 200, 300, 600],
      vertical: true,
      fontSize: 24,
      lines: ['また', '食べていた']
    })
  })

  it('tolerates missing font_size and drops malformed/empty blocks', () => {
    const vol = parseMokuroVolume(
      volumeJson([
        page('001.jpg', [
          { box: [0, 0, 10, 10], lines: ['あ'] }, // no font_size, no vertical
          { box: [0, 0, 10, 10], lines: [] }, // empty lines → dropped
          { box: [0, 0, 10], lines: ['あ'] }, // bad box → dropped
          'garbage'
        ])
      ])
    )!
    expect(vol[0].ocr.blocks).toEqual([
      { box: [0, 0, 10, 10], vertical: false, fontSize: null, lines: ['あ'] }
    ])
  })

  it.each([
    ['not json', 'nope{'],
    ['non-object', '42'],
    ['missing pages', '{"title":"x"}'],
    ['empty pages', volumeJson([])]
  ])('returns null for %s', (_label, raw) => {
    expect(parseMokuroVolume(raw)).toBeNull()
  })
})

describe('parsePageJson (legacy _ocr)', () => {
  it('parses a per-page file', () => {
    const ocr = parsePageJson(JSON.stringify(page('ignored.jpg')))!
    expect(ocr.imgHeight).toBe(2400)
    expect(ocr.blocks).toHaveLength(1)
  })
  it('returns null for malformed input', () => {
    expect(parsePageJson('{')).toBeNull()
    expect(parsePageJson('{"img_width": "wide"}')).toBeNull()
  })
})

describe('matchPages', () => {
  const vol = parseMokuroVolume(volumeJson([page('001.png'), page('003.png')]))!

  it('matches by basename without extension (extension-agnostic, case-insensitive)', () => {
    const matched = matchPages(vol, ['001.JPG', '002.jpg', '003.webp'])
    expect(matched[0]).not.toBeNull()
    expect(matched[1]).toBeNull() // no OCR for this page
    expect(matched[2]).not.toBeNull()
  })

  it('falls back to order when nothing matches but counts are equal', () => {
    const matched = matchPages(vol, ['renamed_a.jpg', 'renamed_b.jpg'])
    expect(matched.every((m) => m !== null)).toBe(true)
  })

  it('gives up (all null) when nothing matches and counts differ', () => {
    const matched = matchPages(vol, ['a.jpg', 'b.jpg', 'c.jpg'])
    expect(matched.every((m) => m === null)).toBe(true)
  })
})

describe('findSidecar / getChapterOcr', () => {
  let root: string
  beforeEach(() => {
    root = mkdtempSync(join(os.tmpdir(), 'navihub-mokuro-'))
  })
  afterEach(() => {
    rmSync(root, { recursive: true, force: true })
  })

  function makeChapter(name: string): string {
    const dir = join(root, name)
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, '001.jpg'), 'x')
    writeFileSync(join(dir, '002.jpg'), 'x')
    return dir
  }

  it('prefers the sibling <name>.mokuro over a legacy _ocr dir', () => {
    const dir = makeChapter('Vol 1')
    mkdirSync(join(root, '_ocr', 'Vol 1'), { recursive: true })
    writeFileSync(join(root, 'Vol 1.mokuro'), volumeJson([page('001.jpg')]))
    expect(findSidecar(dir)).toEqual({ kind: 'volume', path: join(root, 'Vol 1.mokuro') })
  })

  it('finds a sole .mokuro inside the chapter dir', () => {
    const dir = makeChapter('Vol 2')
    writeFileSync(join(dir, 'whatever.mokuro'), volumeJson([page('001.jpg')]))
    expect(findSidecar(dir)).toEqual({ kind: 'volume', path: join(dir, 'whatever.mokuro') })
  })

  it('falls back to the legacy _ocr dir, loading per-page JSONs', () => {
    const dir = makeChapter('Vol 3')
    const ocrDir = join(root, '_ocr', 'Vol 3')
    mkdirSync(ocrDir, { recursive: true })
    writeFileSync(join(ocrDir, '001.json'), JSON.stringify(page('001.jpg')))
    expect(findSidecar(dir)).toEqual({ kind: 'ocrDir', path: ocrDir })

    const ocr = getChapterOcr(dir, ['001.jpg', '002.jpg'])!
    expect(ocr.matchedPages).toBe(1)
    expect(ocr.totalPages).toBe(2)
    expect(ocr.pages[0]!.blocks).toHaveLength(1)
    expect(ocr.pages[1]).toBeNull()
  })

  it('returns null when there is no sidecar at all', () => {
    expect(getChapterOcr(makeChapter('Raw'), ['001.jpg'])).toBeNull()
  })

  it('matches a .cbz chapter to its stem-named sidecar', () => {
    // The chapter "is" an archive file; mokuro ran on the folder pre-zipping,
    // so "Vol 5.mokuro" sits beside "Vol 5.cbz".
    const cbz = join(root, 'Vol 5.cbz')
    writeFileSync(cbz, 'fake-zip-bytes')
    writeFileSync(join(root, 'Vol 5.mokuro'), volumeJson([page('001.jpg')]))
    expect(findSidecar(cbz)).toEqual({ kind: 'volume', path: join(root, 'Vol 5.mokuro') })

    const ocr = getChapterOcr(cbz, ['001.jpg', '002.jpg'])!
    expect(ocr.matchedPages).toBe(1)
  })

  it('falls back to _ocr/<stem>/ for a .cbz chapter', () => {
    const cbz = join(root, 'Vol 6.cbz')
    writeFileSync(cbz, 'fake-zip-bytes')
    const ocrDir = join(root, '_ocr', 'Vol 6')
    mkdirSync(ocrDir, { recursive: true })
    writeFileSync(join(ocrDir, '001.json'), JSON.stringify(page('001.jpg')))
    expect(findSidecar(cbz)).toEqual({ kind: 'ocrDir', path: ocrDir })
  })

  it('re-reads the sidecar when it changes on disk (cache invalidation)', () => {
    const dir = makeChapter('Vol 4')
    const sidecar = join(root, 'Vol 4.mokuro')
    writeFileSync(sidecar, volumeJson([page('001.jpg')]))
    expect(getChapterOcr(dir, ['001.jpg', '002.jpg'])!.matchedPages).toBe(1)

    writeFileSync(sidecar, volumeJson([page('001.jpg'), page('002.jpg')]))
    // bump mtime beyond fs timestamp granularity
    const later = new Date(Date.now() + 2000)
    utimesSync(sidecar, later, later)
    expect(getChapterOcr(dir, ['001.jpg', '002.jpg'])!.matchedPages).toBe(2)
  })

  it('re-reads the sidecar mapping when the chapter page list changes', () => {
    const dir = makeChapter('Vol 7')
    const sidecar = join(root, 'Vol 7.mokuro')
    writeFileSync(sidecar, volumeJson([page('001.jpg')]))
    expect(getChapterOcr(dir, ['001.jpg', '002.jpg'])!.matchedPages).toBe(1)

    // Same sidecar mtime, different page list: returning the old cached
    // mapping would incorrectly show OCR on the new page.
    expect(getChapterOcr(dir, ['002.jpg', '003.jpg'])).toBeNull()
  })
})
