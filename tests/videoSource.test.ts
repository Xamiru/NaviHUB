import { existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import os from 'node:os'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import type { MediaProbe } from '../src/main/video/probeParse'

// The in-app player's source resolver. ffprobe is mocked so the decode verdict
// never depends on which binaries the test machine has.

let db: Database.Database
let root: string
let probe: MediaProbe | null = null
let ffmpegPresent = false
// Simulates ffmpeg: writes the output it was asked for, then reports `result`.
let ffmpegRun: (args: string[]) => string | null = () => 'no ffmpeg'

vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('electron', () => ({
  dialog: { showOpenDialog: vi.fn() },
  shell: { openPath: vi.fn() },
  BrowserWindow: { getFocusedWindow: () => null }
}))
vi.mock('../src/main/repos/settingsRepo', () => ({ get: () => null, set: () => {} }))
vi.mock('../src/main/files', () => ({
  videoRootDir: () => join(root, 'video'),
  wrestlingRootDir: () => join(root, 'wrestling'),
  mediaRoot: () => join(root, 'media'),
  jpAudioDir: () => join(root, 'jpaudio'),
  videoCacheDir: () => join(root, 'videocache'),
  absoluteMediaPath: (relPath: string) => {
    if (relPath.split('/').includes('..')) throw new Error('blocked')
    return join(root, relPath)
  }
}))
vi.mock('../src/main/football/media', () => ({
  resolveLocal: (localPath: string) => ({
    relPath: `football/${localPath}`,
    absPath: join(root, 'football', localPath)
  })
}))
vi.mock('../src/main/video/ffmpeg', () => ({
  probeFile: async () => probe,
  hasFfmpeg: async () => ffmpegPresent,
  runFfmpegOnce: async (args: string[]) => ffmpegRun(args)
}))

import * as video from '../src/main/video'

function touch(rel: string): void {
  const abs = join(root, rel)
  mkdirSync(join(abs, '..'), { recursive: true })
  writeFileSync(abs, 'x')
}

function makeMedia(title = 'Frieren'): number {
  return Number(
    db.prepare(`INSERT INTO media_item (media_type, title, progress) VALUES ('anime', ?, 3)`).run(title)
      .lastInsertRowid
  )
}

function addEpisode(
  mediaId: number,
  filePath: string,
  sortOrder: number,
  codecs: { v?: string | null; a?: string | null } = { v: 'h264', a: 'aac' }
): number {
  touch(`video/${filePath}`)
  return Number(
    db
      .prepare(
        `INSERT INTO video_file (media_id, file_path, title, sort_order, video_codec, audio_codec)
         VALUES (?, ?, ?, ?, ?, ?)`
      )
      .run(mediaId, filePath, `Episode ${sortOrder}`, sortOrder, codecs.v ?? null, codecs.a ?? null)
      .lastInsertRowid
  )
}

beforeEach(() => {
  db = createTestDb()
  root = mkdtempSync(join(os.tmpdir(), 'navihub-vsrc-'))
  probe = null
  ffmpegPresent = false
  ffmpegRun = () => 'no ffmpeg'
})

afterEach(() => {
  rmSync(root, { recursive: true, force: true })
})

describe('video source', () => {
  it('serves a library episode directly with its owner, neighbours and stored codecs', async () => {
    const mediaId = makeMedia()
    const first = addEpisode(mediaId, 'Frieren/01.mkv', 1)
    const second = addEpisode(mediaId, 'Frieren/02.mkv', 2)
    addEpisode(mediaId, 'Frieren/03.mkv', 3)

    const src = await video.source({ kind: 'file', fileId: second })
    expect(src.url).toBe('navimg://video/Frieren/02.mkv')
    expect(src.seriesTitle).toBe('Frieren')
    expect(src.mediaId).toBe(mediaId)
    expect(src.mediaType).toBe('anime')
    expect(src.decode.verdict).toBe('ok')
    expect(src.prev).toEqual({ fileId: first, title: 'Episode 1' })
    expect(src.next?.title).toBe('Episode 3')
  })

  it('refuses an undecodable episode before any <video> mounts', async () => {
    const mediaId = makeMedia()
    const id = addEpisode(mediaId, 'Show/01.mkv', 1, { v: 'h264', a: 'dts' })
    const src = await video.source({ kind: 'file', fileId: id })
    expect(src.decode).toEqual({
      verdict: 'unsupported',
      reason: 'DTS audio cannot be decoded inside NaviHUB.'
    })
  })

  it('prefers live probe data and lists embedded subtitle tracks without extracting', async () => {
    const mediaId = makeMedia()
    const id = addEpisode(mediaId, 'Show/01.mkv', 1, { v: null, a: null })
    probe = {
      durationSec: 1440,
      startTimeSec: 0,
      formatName: 'matroska,webm',
      sizeBytes: 1,
      streams: [
        stream(0, 0, 'video', 'h264'),
        stream(1, 0, 'audio', 'flac', 'jpn'),
        stream(2, 0, 'subtitle', 'ass', 'jpn')
      ]
    }
    const src = await video.source({ kind: 'file', fileId: id })
    expect(src.decode.verdict).toBe('ok')
    expect(src.hasAudio).toBe(true)
    expect(src.durationSeconds).toBe(1440)
    expect(src.audioTracks).toHaveLength(1)
    expect(src.subtitles).toEqual([
      expect.objectContaining({ id: 'embedded:0', lang: 'ja', url: null, textual: true })
    ])
  })

  it('rejects with a sentence when the file is gone from disk', async () => {
    const mediaId = makeMedia()
    const id = addEpisode(mediaId, 'Show/01.mkv', 1)
    rmSync(join(root, 'video/Show/01.mkv'))
    await expect(video.source({ kind: 'file', fileId: id })).rejects.toThrow(/not found on disk/)
  })

  it('opens a wrestling clip from the wrestling root and links back to the shelf', async () => {
    touch('wrestling/clips/promo.mp4')
    const clipId = Number(
      db
        .prepare(`INSERT INTO wrestling_clip (title, kind, local_path) VALUES ('Promo', 'promo', ?)`)
        .run('clips/promo.mp4').lastInsertRowid
    )
    const src = await video.source({ kind: 'clip', clipId })
    expect(src.url).toBe('navimg://wrestling/clips/promo.mp4')
    expect(src.backPath).toBe('/wrestling/clips')
    expect(src.prev).toBeNull()
    // No probe data: decodable is unknown, so the renderer's watchdog decides.
    expect(src.decode.verdict).toBe('uncertain')
  })

  it('opens a Football media item through the Football root', async () => {
    touch('football/2005/final.mp4')
    const id = Number(
      db
        .prepare(`INSERT INTO football_media (title, kind, local_path) VALUES ('Final', 'fullMatch', ?)`)
        .run('2005/final.mp4').lastInsertRowid
    )
    const src = await video.source({ kind: 'football', mediaId: id })
    expect(src.url).toBe('navimg://football/2005/final.mp4')
    expect(src.backPath).toBe('/football/media')
  })

  it('opens clips and Football files externally through the same resolver as the player', async () => {
    const { shell } = await import('electron')
    const openPath = shell.openPath as unknown as ReturnType<typeof vi.fn>
    openPath.mockResolvedValue('')
    touch('wrestling/clips/promo.mp4')
    const clipId = Number(
      db
        .prepare(`INSERT INTO wrestling_clip (title, kind, local_path) VALUES ('Promo', 'promo', ?)`)
        .run('clips/promo.mp4').lastInsertRowid
    )
    await video.openExternal({ kind: 'clip', clipId })
    expect(openPath).toHaveBeenLastCalledWith(join(root, 'wrestling/clips/promo.mp4'))

    touch('football/2005/final.mp4')
    const footballId = Number(
      db
        .prepare(`INSERT INTO football_media (title, kind, local_path) VALUES ('Final', 'fullMatch', ?)`)
        .run('2005/final.mp4').lastInsertRowid
    )
    await video.openExternal({ kind: 'football', mediaId: footballId })
    expect(openPath).toHaveBeenLastCalledWith(join(root, 'football/2005/final.mp4'))

    // A gone file gets the player's sentence, not a system-player launch.
    rmSync(join(root, 'wrestling/clips/promo.mp4'))
    await expect(video.openExternal({ kind: 'clip', clipId })).rejects.toThrow(/Local file is unavailable/)
    await expect(video.openExternal({ kind: 'clip', clipId: clipId + 99 })).rejects.toThrow(
      /no longer exists/
    )
  })
})

describe('resume position', () => {
  it('writes resume_seconds only and never touches media progress', async () => {
    const mediaId = makeMedia()
    const id = addEpisode(mediaId, 'Show/01.mkv', 1)
    video.markProgressIn(video.scopeOfFile({ kind: 'file', fileId: id }), id, 312.4)
    const row = db.prepare('SELECT resume_seconds, watched_at FROM video_file WHERE id = ?').get(id)
    expect(row).toEqual({ resume_seconds: 312.4, watched_at: null })
    const media = db.prepare('SELECT progress FROM media_item WHERE id = ?').get(mediaId)
    expect(media).toEqual({ progress: 3 })
    expect((await video.source({ kind: 'file', fileId: id })).resumeSeconds).toBe(312.4)
  })

  it('clears the position with null and ignores a near-zero one', () => {
    const mediaId = makeMedia()
    const id = addEpisode(mediaId, 'Show/01.mkv', 1)
    const scope = video.scopeOfFile({ kind: 'file', fileId: id })
    video.markProgressIn(scope, id, 500)
    video.markProgressIn(scope, id, null)
    expect(db.prepare('SELECT resume_seconds FROM video_file WHERE id = ?').get(id)).toEqual({
      resume_seconds: null
    })
    video.markProgressIn(scope, id, 0.4)
    expect(db.prepare('SELECT resume_seconds FROM video_file WHERE id = ?').get(id)).toEqual({
      resume_seconds: null
    })
  })

  it('writes a wrestling position against wrestling_video, never media_item', () => {
    const mediaId = makeMedia()
    const eventId = Number(
      db.prepare(`INSERT INTO wrestling_event (promotion, name) VALUES ('wwe', 'WrestleMania X')`).run().lastInsertRowid
    )
    touch('wrestling/wm10.mkv')
    const fileId = Number(
      db
        .prepare(
          `INSERT INTO wrestling_video (event_id, file_path, title, sort_order) VALUES (?, 'wm10.mkv', 'WM10', 1)`
        )
        .run(eventId).lastInsertRowid
    )
    video.markProgressIn(video.scopeOfFile({ kind: 'wrestling', fileId }), fileId, 90)
    expect(db.prepare('SELECT resume_seconds FROM wrestling_video WHERE id = ?').get(fileId)).toEqual({
      resume_seconds: 90
    })
    expect(db.prepare('SELECT progress FROM media_item WHERE id = ?').get(mediaId)).toEqual({
      progress: 3
    })
  })
})

describe('embedded subtitle extraction', () => {
  function withEmbeddedTrack(): number {
    const id = addEpisode(makeMedia(), 'Show/01.mkv', 1)
    probe = {
      durationSec: 1440,
      startTimeSec: 0,
      formatName: 'matroska,webm',
      sizeBytes: 1,
      streams: [stream(0, 0, 'video', 'h264'), stream(1, 0, 'subtitle', 'ass', 'jpn')]
    }
    ffmpegPresent = true
    return id
  }
  const outputOf = (args: string[]): string => args[args.length - 1].replace(/^file:/, '')

  it('extracts a track on demand and serves it from videocache', async () => {
    const id = withEmbeddedTrack()
    ffmpegRun = (args) => {
      writeFileSync(outputOf(args), '[Script Info]')
      return null
    }
    const track = await video.subtitleTrack({ kind: 'file', fileId: id }, 'embedded:0')
    expect(track?.url).toMatch(/^navimg:\/\/videocache\/subs\/.+-s0\.ass$/)
  })

  it('removes a truncated output when ffmpeg fails, so it is never served later', async () => {
    const id = withEmbeddedTrack()
    let written = ''
    ffmpegRun = (args) => {
      written = outputOf(args)
      writeFileSync(written, 'partial')
      return 'killed after timeout'
    }
    const first = await video.subtitleTrack({ kind: 'file', fileId: id }, 'embedded:0')
    expect(first?.url).toBeNull()
    expect(existsSync(written)).toBe(false)
    // The retry runs ffmpeg again instead of trusting a leftover file.
    let ran = false
    ffmpegRun = (args) => {
      ran = true
      writeFileSync(outputOf(args), '[Script Info]')
      return null
    }
    const second = await video.subtitleTrack({ kind: 'file', fileId: id }, 'embedded:0')
    expect(ran).toBe(true)
    expect(second?.url).not.toBeNull()
  })
})

describe('attached subtitle fonts', () => {
  function withFonts(file = 'Show/01.mkv'): number {
    const id = addEpisode(makeMedia(), file, 1)
    probe = {
      durationSec: 1440,
      startTimeSec: 0,
      formatName: 'matroska,webm',
      sizeBytes: 1,
      streams: [stream(0, 0, 'video', 'h264'), stream(1, 0, 'subtitle', 'ass', 'jpn')],
      attachments: [
        { index: 2, filename: 'Gothic.ttf', mimetype: 'application/x-truetype-font' },
        { index: 3, filename: 'poster.jpg', mimetype: 'image/jpeg' }
      ]
    }
    ffmpegPresent = true
    return id
  }
  const dumpTargets = (args: string[]): string[] =>
    args.filter((_a, i) => args[i - 1]?.startsWith('-dump_attachment:')).map((a) => a.replace(/^file:/, ''))
  const fontFiles = (): string[] => readdirSync(join(root, 'videocache', 'fonts')).sort()

  it('extracts fonts once and serves them from videocache', async () => {
    const id = withFonts()
    let runs = 0
    ffmpegRun = (args) => {
      runs++
      for (const out of dumpTargets(args)) writeFileSync(out, 'font-bytes')
      return 'At least one output file must be specified'
    }
    const ref = { kind: 'file', fileId: id } as const
    const first = await video.subtitleFonts(ref)
    expect(first).toHaveLength(1)
    expect(first[0]).toMatch(/^navimg:\/\/videocache\/fonts\/[0-9a-f]{40}\.ttf$/)
    expect(await video.subtitleFonts(ref)).toEqual(first)
    expect(runs).toBe(1)
  })

  it('runs one dump for concurrent requests and shares fonts across episodes', async () => {
    const first = withFonts('Show/01.mkv')
    const second = addEpisode(makeMedia('Other'), 'Show/02.mkv', 2)
    let runs = 0
    ffmpegRun = (args) => {
      runs++
      for (const out of dumpTargets(args)) writeFileSync(out, 'same-font')
      return 'At least one output file must be specified'
    }
    const [a, b] = await Promise.all([
      video.subtitleFonts({ kind: 'file', fileId: first }),
      video.subtitleFonts({ kind: 'file', fileId: first })
    ])
    expect(runs).toBe(1)
    expect(b).toEqual(a)
    expect(await video.subtitleFonts({ kind: 'file', fileId: second })).toEqual(a)
    expect(fontFiles().filter((f) => f.endsWith('.ttf'))).toHaveLength(1)
    expect(fontFiles().some((f) => f.endsWith('.partial'))).toBe(false)
  })

  it('discards a partial dump so a later open retries', async () => {
    const id = withFonts()
    let written: string[] = []
    ffmpegRun = (args) => {
      written = dumpTargets(args)
      for (const out of written) writeFileSync(out, 'trunc')
      return 'killed after timeout'
    }
    expect(await video.subtitleFonts({ kind: 'file', fileId: id })).toEqual([])
    expect(written.every((f) => !existsSync(f))).toBe(true)
    expect(fontFiles()).toEqual([])
    let runs = 0
    ffmpegRun = (args) => {
      runs++
      for (const out of dumpTargets(args)) writeFileSync(out, 'font-bytes')
      return null
    }
    expect(await video.subtitleFonts({ kind: 'file', fileId: id })).toHaveLength(1)
    expect(runs).toBe(1)
  })

  it('returns nothing without ffmpeg or attachments', async () => {
    const id = withFonts()
    ffmpegPresent = false
    expect(await video.subtitleFonts({ kind: 'file', fileId: id })).toEqual([])
    probe = null
    ffmpegPresent = true
    expect(await video.subtitleFonts({ kind: 'file', fileId: id })).toEqual([])
  })
})

describe('sentence audio', () => {
  it('returns null without ffmpeg instead of failing the mining flow', async () => {
    const mediaId = makeMedia()
    const id = addEpisode(mediaId, 'Show/01.mkv', 1)
    await expect(
      video.clipAudio({ ref: { kind: 'file', fileId: id }, startSec: 10, endSec: 12 })
    ).resolves.toBeNull()
  })
})

function stream(
  index: number,
  typeIndex: number,
  type: 'video' | 'audio' | 'subtitle',
  codec: string,
  language: string | null = null
): MediaProbe['streams'][number] {
  return {
    index,
    typeIndex,
    type,
    codec,
    language,
    title: null,
    width: type === 'video' ? 1920 : null,
    height: type === 'video' ? 1080 : null,
    channels: type === 'audio' ? 2 : null,
    pixFmt: null,
    colorTransfer: null,
    isDefault: false,
    isForced: false,
    isAttachedPic: false
  }
}
