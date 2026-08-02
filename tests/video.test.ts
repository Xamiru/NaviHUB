import { mkdirSync, mkdtempSync, rmSync, utimesSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import os from 'node:os'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
let root: string
const showOpenDialog = vi.fn()
const settings = new Map<string, string>()

vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))
vi.mock('electron', () => ({
  dialog: { showOpenDialog: (...args: unknown[]) => showOpenDialog(...args) }
}))
// The scanner reads/writes video.dir through settingsRepo and resolves the
// library root through files.ts — both replaced so the module runs under plain
// Node against a temp dir, with no ffprobe anywhere.
vi.mock('../src/main/repos/settingsRepo', () => ({
  get: (k: string) => settings.get(k) ?? null,
  set: (k: string, v: string) => {
    settings.set(k, v)
  }
}))
vi.mock('../src/main/files', () => ({
  videoRootDir: () => root
}))

import * as scan from '../src/main/video/scan'

beforeEach(() => {
  db = createTestDb()
  root = mkdtempSync(join(os.tmpdir(), 'navihub-video-'))
  settings.clear()
  showOpenDialog.mockReset()
  scan.setProber(async () => null)
})

afterEach(() => {
  rmSync(root, { recursive: true, force: true })
})

function makeMedia(title = 'Frieren', mediaType = 'anime'): number {
  const info = db
    .prepare(`INSERT INTO media_item (media_type, title) VALUES (?, ?)`)
    .run(mediaType, title)
  return Number(info.lastInsertRowid)
}

function makeSeries(name: string, files: string[]): string {
  const dir = join(root, name)
  mkdirSync(dir, { recursive: true })
  for (const f of files) {
    const abs = join(dir, f)
    mkdirSync(join(abs, '..'), { recursive: true })
    writeFileSync(abs, 'x')
  }
  return dir
}

async function attach(mediaId: number, dir: string): Promise<ReturnType<typeof scan.attachFolder>> {
  showOpenDialog.mockResolvedValue({ canceled: false, filePaths: [dir] })
  return scan.attachFolder(mediaId)
}

describe('scanSeriesDir', () => {
  it('finds videos, orders them by episode and ignores non-video files', () => {
    const dir = makeSeries('Frieren', [
      '[Group] Frieren - 03 [1080p].mkv',
      '[Group] Frieren - 01 [1080p].mkv',
      '[Group] Frieren - 02 [1080p].mkv',
      'cover.jpg',
      '[Group] Frieren - 01 [1080p].ja.ass'
    ])
    return scan.scanSeriesDir(dir).then((found) => {
      expect(found.map((f) => f.number)).toEqual([1, 2, 3])
      expect(found[0].title).toBe('Episode 01')
      expect(found.every((f) => f.filePath.endsWith('.mkv'))).toBe(true)
    })
  })

  it('descends into season folders but never into a Subs sidecar folder', async () => {
    const dir = makeSeries('Show', [
      'Season 1/Show.S01E01.mkv',
      'Season 2/Show.S02E01.mkv',
      'Subs/Show.S01E01/2_Japanese.ass',
      'Subs/decoy.mkv'
    ])
    const found = await scan.scanSeriesDir(dir)
    expect(found.map((f) => f.filePath)).toEqual([
      'Season 1/Show.S01E01.mkv',
      'Season 2/Show.S02E01.mkv'
    ])
    expect(found.map((f) => f.season)).toEqual([1, 2])
  })

  it('skips sample files', async () => {
    const dir = makeSeries('Film', ['Film.mkv', 'Film-sample.mkv'])
    const found = await scan.scanSeriesDir(dir)
    expect(found.map((f) => f.filePath)).toEqual(['Film.mkv'])
  })
})

describe('attachFolder', () => {
  it('bootstraps video.dir from the picked folder and stores relative paths', async () => {
    const mediaId = makeMedia()
    const dir = makeSeries('Frieren', ['ep - 01.mkv', 'ep - 02.mkv'])
    const res = await attach(mediaId, dir)
    expect(res).toEqual({ ok: true, fileCount: 2 })
    expect(settings.get('video.dir')).toBe(root)

    const lib = scan.files(mediaId)
    expect(lib.localDir).toBe('Frieren')
    expect(lib.files.map((f) => f.filePath)).toEqual(['Frieren/ep - 01.mkv', 'Frieren/ep - 02.mkv'])
  })

  it('refuses a folder outside the established library root', async () => {
    const mediaId = makeMedia()
    await attach(mediaId, makeSeries('Frieren', ['a - 01.mkv']))

    const outside = mkdtempSync(join(os.tmpdir(), 'navihub-elsewhere-'))
    try {
      const other = makeMedia('Bocchi')
      showOpenDialog.mockResolvedValue({ canceled: false, filePaths: [outside] })
      const res = await scan.attachFolder(other)
      expect(res.ok).toBe(false)
      expect(res.error).toMatch(/inside the video library root/)
    } finally {
      rmSync(outside, { recursive: true, force: true })
    }
  })

  it('reports a cancelled picker without an error', async () => {
    showOpenDialog.mockResolvedValue({ canceled: true, filePaths: [] })
    expect(await scan.attachFolder(makeMedia())).toEqual({ ok: false })
  })
})

describe('rescan', () => {
  it('refreshes canonical fields while preserving resume position and watched state', async () => {
    const mediaId = makeMedia()
    const dir = makeSeries('Frieren', ['Frieren - 01.mkv', 'Frieren - 02.mkv'])
    await attach(mediaId, dir)

    const before = scan.files(mediaId).files
    scan.markProgress(before[0].id, 723.5)
    scan.markWatched(before[1].id, true)

    // A rename changes the parsed title; the rescan must adopt it without
    // touching either user-state column.
    rmSync(join(dir, 'Frieren - 02.mkv'))
    writeFileSync(join(dir, 'Frieren - 02v2.mkv'), 'x')
    writeFileSync(join(dir, 'Frieren - 03.mkv'), 'x')
    const res = await scan.rescan(mediaId)
    expect(res.ok).toBe(true)

    const after = scan.files(mediaId).files
    expect(after.map((f) => f.number)).toEqual([1, 2, 3])
    expect(after[0].resumeSeconds).toBe(723.5)
    // The v2 rename produced a NEW path, so its history is gone — but ep 1,
    // whose path is unchanged, kept everything.
    expect(after.find((f) => f.filePath.endsWith('01.mkv'))?.resumeSeconds).toBe(723.5)
  })

  it('preserves user state across a rescan when paths are unchanged', async () => {
    const mediaId = makeMedia()
    const dir = makeSeries('Frieren', ['Frieren - 01.mkv', 'Frieren - 02.mkv'])
    await attach(mediaId, dir)
    const before = scan.files(mediaId).files
    scan.markProgress(before[0].id, 300)
    scan.markWatched(before[1].id, true)

    await scan.rescan(mediaId)

    const after = scan.files(mediaId).files
    expect(after[0].resumeSeconds).toBe(300)
    expect(after[1].watchedAt).not.toBeNull()
  })

  it('prunes files that vanished from disk', async () => {
    const mediaId = makeMedia()
    const dir = makeSeries('Frieren', ['Frieren - 01.mkv', 'Frieren - 02.mkv'])
    await attach(mediaId, dir)
    rmSync(join(dir, 'Frieren - 02.mkv'))
    await scan.rescan(mediaId)
    expect(scan.files(mediaId).files.map((f) => f.number)).toEqual([1])
  })

  it('REFUSES a zero-file walk while rows exist, instead of wiping them', async () => {
    // The unmounted-drive case: the mountpoint still exists but is empty.
    // Pruning here would silently destroy every resume position and watched
    // flag in the series (music.ts:startScan learned this the hard way).
    const mediaId = makeMedia()
    const dir = makeSeries('Frieren', ['Frieren - 01.mkv', 'Frieren - 02.mkv'])
    await attach(mediaId, dir)
    scan.markWatched(scan.files(mediaId).files[0].id, true)

    rmSync(join(dir, 'Frieren - 01.mkv'))
    rmSync(join(dir, 'Frieren - 02.mkv'))

    const res = await scan.rescan(mediaId)
    expect(res.ok).toBe(false)
    expect(res.error).toMatch(/refusing to clear/i)
    expect(scan.files(mediaId).files).toHaveLength(2)
    expect(scan.files(mediaId).files[0].watchedAt).not.toBeNull()
  })

  it('allows a genuinely empty first scan', async () => {
    const mediaId = makeMedia()
    const res = await attach(mediaId, makeSeries('Empty', []))
    expect(res).toEqual({ ok: false, error: 'No video files found in that folder' })
  })
})

describe('probe seam', () => {
  it('probes only files whose mtime or size changed', async () => {
    const seen: string[] = []
    scan.setProber(async (abs) => {
      seen.push(abs)
      return {
        duration: 1440,
        width: 1920,
        height: 1080,
        videoCodec: 'h264',
        audioCodec: 'aac',
        playability: 'remux'
      }
    })
    const mediaId = makeMedia()
    const dir = makeSeries('Frieren', ['Frieren - 01.mkv', 'Frieren - 02.mkv'])
    await attach(mediaId, dir)
    expect(seen).toHaveLength(2)
    expect(scan.files(mediaId).files[0]).toMatchObject({
      duration: 1440,
      height: 1080,
      videoCodec: 'h264',
      playability: 'remux'
    })

    // Nothing changed → the mtime fast path skips every file.
    seen.length = 0
    await scan.rescan(mediaId)
    expect(seen).toEqual([])

    // Touch one file: only that one is re-probed.
    const touched = join(dir, 'Frieren - 02.mkv')
    writeFileSync(touched, 'xx')
    const future = new Date(Date.now() + 60_000)
    utimesSync(touched, future, future)
    await scan.rescan(mediaId)
    expect(seen).toEqual([touched])
  })

  it('still produces rows when probing fails or ffprobe is absent', async () => {
    scan.setProber(async () => {
      throw new Error('ffprobe not found')
    })
    const mediaId = makeMedia()
    await attach(mediaId, makeSeries('Frieren', ['Frieren - 01.mkv']))
    const row = scan.files(mediaId).files[0]
    expect(row.playability).toBeNull()
    expect(row.duration).toBeNull()
    expect(row.container).toBe('.mkv')
  })
})

describe('markWatched', () => {
  it('reports only the FIRST transition, so an episode is logged once', async () => {
    const mediaId = makeMedia()
    await attach(mediaId, makeSeries('Frieren', ['F - 01.mkv']))
    const id = scan.files(mediaId).files[0].id
    expect(scan.markWatched(id, true)).toEqual({ mediaId, firstTime: true })
    expect(scan.markWatched(id, true)).toEqual({ mediaId, firstTime: false })
    expect(scan.files(mediaId).files[0].watchedAt).not.toBeNull()
  })

  it('clears the resume position when un-watched, and re-arms the first flag', async () => {
    const mediaId = makeMedia()
    await attach(mediaId, makeSeries('Frieren', ['F - 01.mkv']))
    const id = scan.files(mediaId).files[0].id
    scan.markProgress(id, 500)
    scan.markWatched(id, true)
    scan.markWatched(id, false)
    expect(scan.files(mediaId).files[0]).toMatchObject({ resumeSeconds: null, watchedAt: null })
    expect(scan.markWatched(id, true).firstTime).toBe(true)
  })

  it('never writes media_item.progress itself', async () => {
    // checklistRepo.logProgress owns progress — a second writer here would slam
    // a rewatch (progress → 1) straight back up to the episode count.
    const mediaId = makeMedia()
    await attach(mediaId, makeSeries('Frieren', ['F - 01.mkv', 'F - 02.mkv']))
    db.prepare('UPDATE media_item SET progress = 1 WHERE id = ?').run(mediaId)
    scan.markWatched(scan.files(mediaId).files[1].id, true)
    const { progress } = db
      .prepare('SELECT progress FROM media_item WHERE id = ?')
      .get(mediaId) as { progress: number }
    expect(progress).toBe(1)
  })

  it('returns null for a file that does not exist', () => {
    expect(scan.markWatched(9999, true)).toBeNull()
  })
})

describe('neighbours', () => {
  it('walks the attached folder order for the player prev/next', async () => {
    const mediaId = makeMedia()
    await attach(mediaId, makeSeries('Frieren', ['F - 01.mkv', 'F - 02.mkv', 'F - 03.mkv']))
    const [a, b, c] = scan.files(mediaId).files
    expect(scan.neighbours(a.id)).toEqual({ prev: null, next: { fileId: b.id, title: b.title } })
    expect(scan.neighbours(b.id)).toEqual({
      prev: { fileId: a.id, title: a.title },
      next: { fileId: c.id, title: c.title }
    })
    expect(scan.neighbours(c.id).next).toBeNull()
  })
})

describe('detach', () => {
  it('drops the rows and clears local_dir', async () => {
    const mediaId = makeMedia()
    await attach(mediaId, makeSeries('Frieren', ['F - 01.mkv']))
    scan.detach(mediaId)
    const lib = scan.files(mediaId)
    expect(lib.files).toEqual([])
    expect(lib.localDir).toBeNull()
  })
})
