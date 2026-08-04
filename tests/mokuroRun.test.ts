import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import os from 'node:os'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
let root: string

// mokuroRun's import graph reaches manga.ts (electron dialog) and files.ts —
// replaced so the module runs under plain Node against a temp dir. settingsRepo
// is NOT mocked: mokuroBin() runs its real SQL against the test db.
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('electron', () => ({ dialog: {} }))
vi.mock('../src/main/files', () => ({ mangaRootDir: () => root }))

import {
  buildMokuroArgs,
  mokuroBin,
  ocrOverview,
  parseMokuroLine,
  selectOcrTargets
} from '../src/main/mokuroRun'

beforeEach(() => {
  db = createTestDb()
  root = mkdtempSync(join(os.tmpdir(), 'navihub-mokurorun-'))
})

afterEach(() => {
  rmSync(root, { recursive: true, force: true })
})

describe('mokuroBin', () => {
  it('defaults to mokuro from PATH', () => {
    expect(mokuroBin()).toBe('mokuro')
  })

  it('honors the mokuro.path setting', () => {
    db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run(
      'mokuro.path',
      '/opt/venv/bin/mokuro'
    )
    expect(mokuroBin()).toBe('/opt/venv/bin/mokuro')
  })
})

describe('buildMokuroArgs', () => {
  it('puts the fixed flags first and every volume path after', () => {
    const args = buildMokuroArgs(['/m/Series/Vol 1', '/m/Series/Vol 2.cbz'])
    expect(args).toEqual([
      '--disable_confirmation',
      '--ignore_errors',
      '--disable_html',
      '/m/Series/Vol 1',
      '/m/Series/Vol 2.cbz'
    ])
  })

  it('refuses unsafe paths', () => {
    expect(() => buildMokuroArgs(['relative/vol'])).toThrow(/absolute/)
    expect(() => buildMokuroArgs(['--force_cpu'])).toThrow(/option-like/)
    expect(() => buildMokuroArgs(['/m/vol\u0000x'])).toThrow(/NUL/)
  })
})

describe('parseMokuroLine', () => {
  it.each<[string, ReturnType<typeof parseMokuroLine>]>([
    [
      // loguru's default prefix (timestamp | LEVEL | location - message).
      '2026-08-04 12:00:00.123 | INFO     | mokuro.run:run:114 - Processing 2/5: /manga/Series/Vol 2',
      { kind: 'volume', index: 2, count: 5, title: 'Vol 2' }
    ],
    ['Processing 1/3: /m/S/Vol 1.cbz', { kind: 'volume', index: 1, count: 3, title: 'Vol 1.cbz' }],
    [
      ' 45%|████▌     | 82/180 [00:12<00:15,  6.30it/s]',
      { kind: 'page', percent: 45, done: 82, total: 180 }
    ],
    // The model-download tqdm bars carry unit suffixes ("450M/450M") and must
    // NOT read as page progress.
    ['100%|██████████| 450M/450M [00:30<00:00, 15.2MB/s]', null],
    [
      '2026-08-04 12:40:11.000 | INFO     | mokuro.run:run:130 - Processed successfully: 4/5',
      { kind: 'summary', ok: 4, total: 5 }
    ],
    ['Found 5 volumes:', null],
    ['', null]
  ])('%s', (line, expected) => {
    expect(parseMokuroLine(line)).toEqual(expected)
  })
})

describe('selectOcrTargets', () => {
  it('keeps image chapters without sidecars, skips EPUBs and covered ones', () => {
    const withSidecar = new Set(['/m/S/Vol 1'])
    const out = selectOcrTargets(
      ['/m/S/Vol 1', '/m/S/Vol 2', '/m/S/Vol 3.cbz', '/m/S/Book.epub'],
      (p) => withSidecar.has(p)
    )
    expect(out).toEqual(['/m/S/Vol 2', '/m/S/Vol 3.cbz'])
  })

  it('is empty when everything is covered', () => {
    expect(selectOcrTargets(['/m/S/Vol 1'], () => true)).toEqual([])
  })
})

describe('ocrOverview', () => {
  it('reports real sidecar presence and EPUB ineligibility per chapter', () => {
    const mediaId = Number(
      db
        .prepare("INSERT INTO media_item (media_type, title, local_dir) VALUES ('manga', 'S', 'S')")
        .run().lastInsertRowid
    )
    const addChapter = db.prepare(
      'INSERT INTO manga_chapter (media_id, dir_path, title, sort_order) VALUES (?, ?, ?, ?)'
    )
    const v1 = Number(addChapter.run(mediaId, 'S/Vol 1', 'Vol 1', 0).lastInsertRowid)
    const v2 = Number(addChapter.run(mediaId, 'S/Vol 2', 'Vol 2', 1).lastInsertRowid)
    const book = Number(addChapter.run(mediaId, 'S/Book.epub', 'Book', 2).lastInsertRowid)

    // Real fs: Vol 1 has a sibling sidecar (the mokuro output layout), Vol 2
    // has none, Book.epub is a file.
    mkdirSync(join(root, 'S/Vol 1'), { recursive: true })
    mkdirSync(join(root, 'S/Vol 2'), { recursive: true })
    writeFileSync(join(root, 'S/Vol 1.mokuro'), '{}')
    writeFileSync(join(root, 'S/Book.epub'), '')

    expect(ocrOverview(mediaId)).toEqual([
      { chapterId: v1, hasSidecar: true, ocrEligible: true },
      { chapterId: v2, hasSidecar: false, ocrEligible: true },
      { chapterId: book, hasSidecar: false, ocrEligible: false }
    ])
  })

  it('returns [] for a series with no chapters', () => {
    expect(ocrOverview(999)).toEqual([])
  })
})
