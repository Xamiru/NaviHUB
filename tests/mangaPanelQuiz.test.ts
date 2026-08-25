import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import os from 'node:os'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
let root: string

vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))
// manga.ts pulls dialog from electron and the library roots from files.ts.
vi.mock('electron', () => ({ dialog: { showOpenDialog: vi.fn() } }))
vi.mock('../src/main/files', () => ({
  mangaRootDir: () => root,
  booksRootDir: () => join(root, '_books'),
  absoluteMediaPath: vi.fn()
}))

import * as manga from '../src/main/manga'

beforeEach(() => {
  db = createTestDb()
  root = mkdtempSync(join(os.tmpdir(), 'navihub-panelquiz-'))
})

afterEach(() => {
  rmSync(root, { recursive: true, force: true })
})

function makeSeries(name: string, chapters: Record<string, number>): void {
  const dir = join(root, name)
  mkdirSync(dir, { recursive: true })
  for (const [ch, pages] of Object.entries(chapters)) {
    const chDir = ch === '' ? dir : join(dir, ch)
    mkdirSync(chDir, { recursive: true })
    for (let i = 1; i <= pages; i++) {
      writeFileSync(join(chDir, `p${String(i).padStart(3, '0')}.png`), 'x')
    }
  }
}

function linkSeries(
  title: string,
  chapters: string[],
  status: string | null = 'Reading',
  cover: string | null = 'media/cover.webp',
  consumed = true
): number {
  const id = Number(
    db
      .prepare(
        `INSERT INTO media_item (media_type, title, status, cover_path) VALUES ('manga', ?, ?, ?)`
      )
      .run(title, status, cover).lastInsertRowid
  )
  for (const dirPath of chapters) {
    db.prepare(
      `INSERT INTO manga_chapter (media_id, dir_path, title, page_count, last_read_page, read_at)
       VALUES (?, ?, ?, 3, ?, ?)`
    ).run(
      id,
      dirPath,
      dirPath,
      consumed ? 2 : null,
      consumed ? '2026-01-01 00:00:00' : null
    )
  }
  return id
}

describe('pickPanelSeeds', () => {
  const cand = (mediaId: number, chapters: string[][]) => ({
    mediaId,
    title: `S${mediaId}`,
    coverPath: null,
    year: null,
    genres: [],
    chapters: chapters.map((files, i) => ({
      dirPath: `S${mediaId}/c${i}`,
      files,
      lastReadPage: files.length - 1,
      readAt: '2026-01-01 00:00:00'
    }))
  })

  it('returns at most count seeds, one per series', () => {
    const candidates = [cand(1, [['a.png']]), cand(2, [['b.png']]), cand(3, [['c.png']])]
    expect(manga.pickPanelSeeds(candidates, 2)).toHaveLength(2)
    expect(manga.pickPanelSeeds(candidates, 10)).toHaveLength(3)
    const ids = manga.pickPanelSeeds(candidates, 10).map((s) => s.mediaId)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('skips series whose chapters all have no usable pages', () => {
    const candidates = [cand(1, [[]]), cand(2, [['b.png']])]
    const seeds = manga.pickPanelSeeds(candidates, 10)
    expect(seeds.map((s) => s.mediaId)).toEqual([2])
  })

  it('always draws the page from the chosen series and prefixes manga/', () => {
    const candidates = [cand(7, [['a1.png', 'a2.png'], ['b1.png']])]
    for (let run = 0; run < 30; run++) {
      const [seed] = manga.pickPanelSeeds(candidates, 1)
      expect(seed.pageRelPath).toMatch(/^manga\/S7\/(c0\/a[12]\.png|c1\/b1\.png)$/)
    }
  })

  it('is deterministic under an injected rng', () => {
    const candidates = [cand(1, [['a.png', 'b.png', 'c.png']]), cand(2, [['d.png']])]
    // Same rng stream → identical output; and whatever it picks stays within
    // the chosen series' own pages.
    const run = () => manga.pickPanelSeeds(candidates, 1, () => 0)
    expect(run()).toEqual(run())
    const seed = run()
    expect(seed[0].pageRelPath).toMatch(/^manga\/S[12]\/c\d\/[abcd]\.png$/)
  })

  it('never crosses partial-read progress and excludes long-chapter edge pages', () => {
    const files = Array.from({ length: 10 }, (_, i) => `p${i}.png`)
    const partial = cand(1, [files])
    partial.chapters[0].lastReadPage = 4
    partial.chapters[0].readAt = null
    for (const rng of [() => 0, () => 0.999]) {
      const [seed] = manga.pickPanelSeeds([partial], 1, rng)
      expect(['p2.png', 'p3.png', 'p4.png'].some((page) => seed.pageRelPath.endsWith(page))).toBe(true)
      expect(seed.pageRelPath).not.toMatch(/p[5-9]\.png$/)
    }

    const completed = cand(2, [files])
    const draws = Array.from({ length: 20 }, (_, i) => manga.pickPanelSeeds([completed], 1, () => i / 20)[0].pageRelPath)
    expect(draws.every((path) => !path.endsWith('p0.png') && !path.endsWith('p1.png') && !path.endsWith('p9.png'))).toBe(true)
  })

  it('samples the flattened eligible pages rather than choosing a chapter first', () => {
    const candidate = cand(3, [['only.png'], ...[Array.from({ length: 9 }, (_, i) => `many-${i}.png`)]])
    const [seed] = manga.pickPanelSeeds([candidate], 1, () => 0.7)
    expect(seed.pageRelPath).toContain('many-')
  })
})

describe('manga.panelPool', () => {
  it('serves random pages from locally-linked manga only', async () => {
    makeSeries('Berserk', { 'ch 01': 2 })
    makeSeries('Vagabond', { 'v01': 2 })
    linkSeries('Berserk', ['Berserk/ch 01'])
    linkSeries('Vagabond', ['Vagabond/v01'])
    // Not linked — no chapter rows, so never eligible despite the status.
    linkSeries('Unlinked', [])

    const pool = await manga.panelPool({ statuses: ['Reading'] }, 10)
    expect(pool).toHaveLength(2)
    expect(new Set(pool.map((p) => p.mediaId)).size).toBe(2)
    for (const seed of pool) {
      expect(seed.pageRelPath).toMatch(/^manga\/(Berserk\/ch 01|Vagabond\/v01)\/p00[12]\.png$/)
      expect(seed.title).toBeTruthy()
    }
  })

  it('excludes EPUB chapters and honours the status filter and cap', async () => {
    makeSeries('Img Series', { c1: 2 })
    makeSeries('Planned Series', { c1: 2 })
    linkSeries('Img Series', ['Img Series/c1', 'Img Series/Vol 1.epub'])
    linkSeries('Planned Series', ['Planned Series/c1'], 'Plan to Read')

    const pool = await manga.panelPool({ statuses: ['Reading'] }, 10)
    expect(pool.map((p) => p.title)).toEqual(['Img Series'])
    expect(pool[0].pageRelPath).not.toContain('.epub')

    // The cap limits questions, not eligibility.
    const capped = await manga.panelPool({ scope: 'all' }, 1)
    expect(capped).toHaveLength(1)

    // No filter = every linked series is in play.
    expect(await manga.panelPool({ scope: 'all' }, 10)).toHaveLength(2)
  })

  it('skips series whose folders vanished without failing the round', async () => {
    linkSeries('Ghost', ['Ghost/missing']) // no files on disk
    makeSeries('Real', { c1: 1 })
    linkSeries('Real', ['Real/c1'])

    const pool = await manga.panelPool({}, 5)
    expect(pool.map((p) => p.title)).toEqual(['Real'])
  })
})
