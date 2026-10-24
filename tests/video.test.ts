import { mkdirSync, mkdtempSync, rmSync, utimesSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import os from 'node:os'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
let root: string
const showOpenDialog = vi.fn()
const openPath = vi.fn()
const settings = new Map<string, string>()

vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))
vi.mock('electron', () => ({
  dialog: { showOpenDialog: (...args: unknown[]) => showOpenDialog(...args) },
  shell: { openPath: (...args: unknown[]) => openPath(...args) }
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
  videoRootDir: () => root,
  movieVideoRootDir: () => settings.get('video.movieDir') ?? root,
  tvVideoRootDir: () => settings.get('video.tvDir') ?? root,
  // The scanner is shared with the wrestling collection (video/scope.ts), so
  // both roots have to exist even though these tests only use the media one.
  wrestlingRootDir: () => root,
  absoluteMediaPath: (relPath: string) => join(root, relPath.replace(/^[^/]+\//, ''))
}))

import * as scan from '../src/main/video/scan'
import * as video from '../src/main/video'
import { VIDEO_SCOPES } from '../src/main/video/scope'

beforeEach(() => {
  db = createTestDb()
  root = mkdtempSync(join(os.tmpdir(), 'navihub-video-'))
  settings.clear()
  showOpenDialog.mockReset()
  openPath.mockReset()
  openPath.mockResolvedValue('')
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

describe('scanSeriesDir — seasons from folders and media types', () => {
  it('takes the season from a season folder and plays specials last', async () => {
    const dir = makeSeries('Show', [
      'Season 2/03 - Title.mkv',
      'Season 1/03 - Title.mkv',
      'Season 1/01 - Title.mkv',
      'Specials/01 - Title.mkv'
    ])
    const found = await scan.scanSeriesDir(dir)
    expect(found.map((f) => [f.season, f.number])).toEqual([
      [1, 1],
      [1, 3],
      [2, 3],
      [0, 1]
    ])
    expect(found[3].title).toBe('Special 01')
  })

  it('lets the file name beat its folder', async () => {
    const found = await scan.scanSeriesDir(makeSeries('Show', ['Season 1/Show.S03E02.mkv']))
    expect(found[0].season).toBe(3)
  })

  it('numbers an unseasoned TV file as season 1, matching TMDB', async () => {
    const dir = makeSeries('Show', ['Show - 01.mkv'])
    expect((await scan.scanSeriesDir(dir, 'tv'))[0].season).toBe(1)
    expect((await scan.scanSeriesDir(dir, 'anime'))[0].season).toBeNull()
  })

  it('never reads a movie file as an episode', async () => {
    const found = await scan.scanSeriesDir(makeSeries('Oceans', ["Ocean's 11 (2001) 1080p.mkv"]), 'movie')
    expect(found[0]).toMatchObject({ number: null, season: null, title: "Ocean's 11" })
  })

  it('drops a number that every file in the folder shares', async () => {
    const dir = makeSeries('Show', ['Show 01 [Disc 3].mkv', 'Show 02 [Disc 3].mkv'])
    expect((await scan.scanSeriesDir(dir)).map((f) => f.number)).toEqual([1, 2])
  })
})

describe('attachFile', () => {
  async function attachOne(mediaId: number, file: string): Promise<ReturnType<typeof scan.attachFile>> {
    showOpenDialog.mockResolvedValue({ canceled: false, filePaths: [file] })
    return scan.attachFile(mediaId)
  }

  it('links one movie file, bootstrapping the movie root above its folder', async () => {
    const mediaId = makeMedia('Heat', 'movie')
    makeSeries('Movies/Heat (1995)', ['Heat.mkv', 'Heat-trailer.mkv'])
    makeSeries('Movies', ['Collateral.mkv'])
    const res = await attachOne(mediaId, join(root, 'Movies/Heat (1995)/Heat.mkv'))
    expect(res).toEqual({ ok: true, fileCount: 1 })
    expect(settings.get('video.movieDir')).toBe(join(root, 'Movies'))
    expect(settings.get('video.dir')).toBeUndefined()

    const lib = scan.files(mediaId)
    expect(lib).toMatchObject({ localDir: 'Heat (1995)/Heat.mkv', linkKind: 'file' })
    expect(lib.files.map((f) => [f.filePath, f.title, f.number, f.container])).toEqual([
      ['Heat (1995)/Heat.mkv', 'Heat', null, '.mkv']
    ])

    // A rescan reads the one file again, never its neighbours.
    expect(await scan.rescan(mediaId)).toEqual({ ok: true, fileCount: 1 })
    expect(scan.files(mediaId).files).toHaveLength(1)
  })

  it('takes a flat movies folder as the root when other films share it', async () => {
    const mediaId = makeMedia('Heat', 'movie')
    makeSeries('Movies', ['Heat.mkv', 'Collateral.mkv'])
    expect((await attachOne(mediaId, join(root, 'Movies/Heat.mkv'))).ok).toBe(true)
    expect(settings.get('video.movieDir')).toBe(join(root, 'Movies'))
    expect(scan.files(mediaId)).toMatchObject({ localDir: 'Heat.mkv', linkKind: 'file' })
  })

  it('refuses a file that is not a video', async () => {
    const mediaId = makeMedia('Heat', 'movie')
    makeSeries('Movies', ['notes.txt'])
    const res = await attachOne(mediaId, join(root, 'Movies/notes.txt'))
    expect(res.ok).toBe(false)
    expect(res.error).toMatch(/not a video file/)
  })

  it('keeps a linked file\'s rows when the file has gone, instead of clearing them', async () => {
    const mediaId = makeMedia('Heat', 'movie')
    makeSeries('Movies/Heat', ['Heat.mkv'])
    await attachOne(mediaId, join(root, 'Movies/Heat/Heat.mkv'))
    rmSync(join(root, 'Movies/Heat/Heat.mkv'))
    const res = await scan.rescan(mediaId)
    expect(res.ok).toBe(false)
    expect(scan.files(mediaId).files).toHaveLength(1)
  })

  it('keeps movies on video.dir while movies are still linked under it', async () => {
    settings.set('video.dir', root)
    const old = makeMedia('Heat', 'movie')
    db.prepare(`UPDATE media_item SET local_dir = 'Heat' WHERE id = ?`).run(old)
    const mediaId = makeMedia('Collateral', 'movie')
    makeSeries('Collateral', ['Collateral.mkv'])
    const res = await attachOne(mediaId, join(root, 'Collateral/Collateral.mkv'))
    expect(res.ok).toBe(true)
    expect(settings.get('video.movieDir')).toBeUndefined()
    expect(scan.files(mediaId).localDir).toBe('Collateral/Collateral.mkv')
  })
  it('keeps movies on the default root when video.dir is blank and movies are linked', async () => {
    // Blank video.dir: the fallback is the default folder (root in this mock).
    const old = makeMedia('Heat', 'movie')
    db.prepare(`UPDATE media_item SET local_dir = 'Heat' WHERE id = ?`).run(old)
    const mediaId = makeMedia('Collateral', 'movie')
    makeSeries('Collateral', ['Collateral.mkv'])
    const res = await attachOne(mediaId, join(root, 'Collateral/Collateral.mkv'))
    expect(res.ok).toBe(true)
    expect(settings.get('video.movieDir')).toBeUndefined()
    expect(scan.files(mediaId).localDir).toBe('Collateral/Collateral.mkv')
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
    db.prepare('UPDATE video_file SET resume_seconds = ? WHERE id = ?').run(723.5, before[0].id)
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
    db.prepare('UPDATE video_file SET resume_seconds = ? WHERE id = ?').run(300, before[0].id)
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

describe('external playback', () => {
  it('opens the tracked absolute path with the operating system', async () => {
    const mediaId = makeMedia()
    const dir = makeSeries('Frieren', ['Frieren - 01.mkv'])
    await attach(mediaId, dir)
    const file = scan.files(mediaId).files[0]

    await video.openExternal({ kind: 'file', fileId: file.id })

    expect(openPath).toHaveBeenCalledWith(join(dir, 'Frieren - 01.mkv'))
  })

  it('surfaces a system-player launch failure', async () => {
    const mediaId = makeMedia()
    await attach(mediaId, makeSeries('Frieren', ['Frieren - 01.mkv']))
    const file = scan.files(mediaId).files[0]
    openPath.mockResolvedValue('No application is associated with this file')

    await expect(video.openExternal({ kind: 'file', fileId: file.id })).rejects.toThrow(
      /No application is associated/
    )
  })

  it('opens a wrestling row from the wrestling root', async () => {
    const eventId = Number(
      db
        .prepare(
          `INSERT INTO wrestling_event (promotion, name, wiki_title)
           VALUES ('wwe', 'WrestleMania', 'WrestleMania')`
        )
        .run().lastInsertRowid
    )
    mkdirSync(join(root, 'WM17'), { recursive: true })
    writeFileSync(join(root, 'WM17', 'main.mkv'), 'x')
    const fileId = Number(
      db
        .prepare(
          `INSERT INTO wrestling_video (event_id, file_path, title, sort_order)
           VALUES (?, 'WM17/main.mkv', 'Main event', 0)`
        )
        .run(eventId).lastInsertRowid
    )

    await video.openExternal({ kind: 'wrestling', fileId })

    expect(openPath).toHaveBeenCalledWith(join(root, 'WM17', 'main.mkv'))
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

  it('clears a legacy resume position when un-watched, and re-arms the first flag', async () => {
    const mediaId = makeMedia()
    await attach(mediaId, makeSeries('Frieren', ['F - 01.mkv']))
    const id = scan.files(mediaId).files[0].id
    db.prepare('UPDATE video_file SET resume_seconds = 500 WHERE id = ?').run(id)
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

describe('linkedTitles', () => {
  it('lists linked titles of one type with progress and the file to play next', async () => {
    const anime = makeMedia('Frieren')
    await attach(anime, makeSeries('Frieren', ['Frieren - 01.mkv', 'Frieren - 02.mkv', 'Frieren - 03.mkv']))
    const rows = scan.rowsFor(VIDEO_SCOPES.video, anime) as { id: number }[]
    scan.markWatched(rows[0].id, true)
    scan.markProgressIn(VIDEO_SCOPES.video, rows[1].id, 300)

    // Not linked, another type, and a manga whose local_dir is its own folder.
    makeMedia('Unlinked')
    const movie = makeMedia('Paprika', 'movie')
    await attach(movie, makeSeries('Paprika', ['Paprika.mkv']))
    const manga = makeMedia('Berserk', 'manga')
    db.prepare('UPDATE media_item SET local_dir = ? WHERE id = ?').run('Berserk', manga)

    const linked = video.linkedTitles('anime')
    expect(linked.map((t) => t.title)).toEqual(['Frieren'])
    expect(linked[0]).toMatchObject({
      mediaId: anime,
      linkKind: 'folder',
      fileCount: 3,
      watchedCount: 1,
      nextFile: { id: rows[1].id, resumeSeconds: 300 }
    })
    expect(linked[0].lastActivityAt).not.toBeNull()
    expect(video.linkedTitles('manga')).toEqual([])
    expect(video.linkedTitles('movie').map((t) => t.title)).toEqual(['Paprika'])
  })

  it('reports a file link and restarts a finished title from its first file', async () => {
    const movie = makeMedia('Akira', 'movie')
    makeSeries('Films', ['Akira.mkv', 'Other.mkv'])
    showOpenDialog.mockResolvedValue({ canceled: false, filePaths: [join(root, 'Films', 'Akira.mkv')] })
    await scan.attachFile(movie)
    const [file] = scan.rowsFor(VIDEO_SCOPES.video, movie) as { id: number }[]
    scan.markWatched(file.id, true)

    const [t] = video.linkedTitles('movie')
    expect(t).toMatchObject({ linkKind: 'file', fileCount: 1, watchedCount: 1, nextFile: { id: file.id } })
  })

  it('does not count a rescan as watch activity', async () => {
    const anime = makeMedia('Frieren')
    await attach(anime, makeSeries('Frieren', ['Frieren - 01.mkv', 'Frieren - 02.mkv']))
    const rows = scan.rowsFor(VIDEO_SCOPES.video, anime) as { id: number }[]
    scan.markProgressIn(VIDEO_SCOPES.video, rows[0].id, 300)
    db.prepare(`UPDATE video_file SET updated_at = '2020-01-01 00:00:00' WHERE media_id = ?`).run(anime)
    expect(await scan.rescan(anime)).toMatchObject({ ok: true })
    expect(video.linkedTitles('anime')[0].lastActivityAt).toBe('2020-01-01 00:00:00')
  })

  it('keeps a linked folder with no files, with nothing to play', () => {
    const anime = makeMedia('Empty')
    db.prepare('UPDATE media_item SET local_dir = ? WHERE id = ?').run('Empty', anime)
    expect(video.linkedTitles('anime')).toMatchObject([
      { title: 'Empty', fileCount: 0, watchedCount: 0, nextFile: null, lastActivityAt: null }
    ])
  })
})
