import { mkdtempSync, mkdirSync, writeFileSync, rmSync, existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import os from 'node:os'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
let root: string
let userData: string
const showOpenDialog = vi.fn()

vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))
// music.ts pulls dialog/app from electron and the library root from files.ts —
// all replaced so the scanner runs under plain Node against temp dirs.
vi.mock('electron', () => ({
  app: { getPath: () => userData },
  dialog: { showOpenDialog: (...args: unknown[]) => showOpenDialog(...args) }
}))
vi.mock('../src/main/files', () => ({
  musicRootDir: () => root,
  // Mirror the real prefix mapping so the delete helpers resolve temp files.
  absoluteMediaPath: (rel: string) => {
    const norm = rel.split('\\').join('/')
    if (norm.split('/').includes('..')) throw new Error(`escape: ${rel}`)
    if (norm.startsWith('music/')) return join(root, norm.slice('music/'.length))
    return join(userData, norm)
  }
}))

import {
  walkMusicRoot,
  parseTrackFileName,
  findCoverFile,
  startScan,
  deleteTracks,
  deleteAlbum,
  deleteArtist,
  type ParsedTrack,
  type TagReader,
  type ScannedFile
} from '../src/main/music'

type TagFixture = Partial<Omit<ParsedTrack, keyof ScannedFile>>

beforeEach(() => {
  db = createTestDb()
  root = mkdtempSync(join(os.tmpdir(), 'navihub-music-'))
  userData = mkdtempSync(join(os.tmpdir(), 'navihub-userdata-'))
  showOpenDialog.mockReset()
})

afterEach(() => {
  rmSync(root, { recursive: true, force: true })
  rmSync(userData, { recursive: true, force: true })
})

function makeFiles(paths: string[]): void {
  for (const p of paths) {
    const abs = join(root, p)
    mkdirSync(join(abs, '..'), { recursive: true })
    writeFileSync(abs, 'x')
  }
}

// A tag reader that never touches music-metadata: returns per-path fixtures.
function fakeReader(tags: Record<string, TagFixture> = {}): TagReader & { calls: ScannedFile[] } {
  const calls: ScannedFile[] = []
  const reader = (async (file: ScannedFile) => {
    calls.push(file)
    return tags[file.relPath] ?? {}
  }) as TagReader & { calls: ScannedFile[] }
  reader.calls = calls
  return reader
}

describe('parseTrackFileName', () => {
  it.each([
    ['01 - Airbag.mp3', 1, 'Airbag'],
    ['07. Paranoid Android.flac', 7, 'Paranoid Android'],
    ['12 Karma Police.ogg', 12, 'Karma Police'],
    ['2-07 Beyond the Time.m4a', 7, 'Beyond the Time'],
    ['Airbag.mp3', null, 'Airbag'],
    ['1999.mp3', null, '1999'] // a bare number is a title, not a track number
  ])('%s -> #%s "%s"', (name, trackNo, title) => {
    expect(parseTrackFileName(name)).toEqual({ trackNo, title })
  })
})

describe('findCoverFile', () => {
  it('prefers cover over folder over front, case-insensitively', () => {
    expect(findCoverFile(['Folder.jpg', 'COVER.JPG', 'front.png'])).toBe('COVER.JPG')
    expect(findCoverFile(['front.png', 'folder.jpeg'])).toBe('folder.jpeg')
    expect(findCoverFile(['front.png'])).toBe('front.png')
    expect(findCoverFile(['art.png', '01.mp3'])).toBeNull()
  })
})

describe('walkMusicRoot', () => {
  it('walks Artist/Album folders and ignores non-audio litter', async () => {
    makeFiles([
      'Radiohead/OK Computer/01 Airbag.mp3',
      'Radiohead/OK Computer/02 Paranoid Android.mp3',
      'Radiohead/OK Computer/cover.jpg',
      'Radiohead/OK Computer/03 Half-done.mp3.part', // yt-dlp litter
      'Radiohead/OK Computer/notes.txt'
    ])
    const { albums, skippedRootFiles } = await walkMusicRoot(root)
    expect(skippedRootFiles).toBe(0)
    expect(albums).toHaveLength(1)
    const a = albums[0]
    expect(a.artistName).toBe('Radiohead')
    expect(a.albumTitle).toBe('OK Computer')
    expect(a.coverFile).toBe('Radiohead/OK Computer/cover.jpg')
    expect(a.files.map((f) => f.fileName)).toEqual(['01 Airbag.mp3', '02 Paranoid Android.mp3'])
  })

  it('turns loose artist-level tracks into a synthetic Singles album', async () => {
    makeFiles(['Aimer/Brave Shine.mp3', 'Aimer/Deep Album/01 One.mp3'])
    const { albums } = await walkMusicRoot(root)
    expect(albums.map((a) => a.albumTitle).sort()).toEqual(['Deep Album', 'Singles'])
    const singles = albums.find((a) => a.albumTitle === 'Singles')!
    expect(singles.albumDir).toBe('Aimer') // stable across rescans
    expect(singles.files[0].relPath).toBe('Aimer/Brave Shine.mp3')
  })

  it('captures CD1/CD2 subfolders into the album and counts skipped root files', async () => {
    makeFiles([
      'loose.mp3',
      'Utada Hikaru/Singles Collection/CD1/01 First Love.flac',
      'Utada Hikaru/Singles Collection/CD2/01 Automatic.flac'
    ])
    const { albums, skippedRootFiles } = await walkMusicRoot(root)
    expect(skippedRootFiles).toBe(1)
    expect(albums).toHaveLength(1)
    expect(albums[0].files).toHaveLength(2)
    expect(albums[0].albumDir).toBe('Utada Hikaru/Singles Collection')
  })

  it('does not swallow cancellation at a filesystem checkpoint', async () => {
    makeFiles(['Radiohead/OK Computer/01 Airbag.mp3'])
    await expect(walkMusicRoot(root, () => true)).rejects.toMatchObject({
      name: 'TaskCancelledError'
    })
  })
})

describe('startScan', () => {
  it('imports tags into artists/albums/tracks (filename fallback when tags missing)', async () => {
    makeFiles(['Radiohead/OK Computer/01 Airbag.mp3', 'Radiohead/OK Computer/02 Untitled.mp3'])
    const reader = fakeReader({
      'Radiohead/OK Computer/01 Airbag.mp3': {
        title: 'Airbag',
        trackNo: 1,
        duration: 284.2,
        tagArtist: 'Radiohead',
        year: 1997
      }
      // 02 has no tags -> falls back to "Untitled" #2 from the filename
    })
    const summary = await startScan(reader)
    expect(summary).toMatchObject({ artists: 1, albums: 1, tracks: 2, added: 2, removed: 0 })

    const album = db.prepare('SELECT * FROM music_album').get() as Record<string, unknown>
    expect(album.title).toBe('OK Computer')
    expect(album.year).toBe(1997)
    const tracks = db
      .prepare('SELECT * FROM music_track ORDER BY file_path')
      .all() as Record<string, unknown>[]
    expect(tracks[0]).toMatchObject({ title: 'Airbag', track_no: 1, duration: 284.2 })
    // tag artist equal to the folder artist is dropped as noise
    expect(tracks[0].tag_artist).toBeNull()
    expect(tracks[1]).toMatchObject({ title: 'Untitled', track_no: 2 })
  })

  it('skips unchanged files on rescan (mtime fast path) and preserves user state', async () => {
    makeFiles(['Radiohead/OK Computer/01 Airbag.mp3'])
    const first = fakeReader()
    await startScan(first)
    expect(first.calls).toHaveLength(1)

    db.prepare(
      `UPDATE music_track SET liked_at = datetime('now'), play_count = 5 WHERE 1=1`
    ).run()
    db.prepare(`UPDATE music_artist SET spotify_id = 'artist-source'`).run()
    db.prepare(`UPDATE music_album SET spotify_id = 'album-source'`).run()

    const second = fakeReader()
    await startScan(second)
    expect(second.calls).toHaveLength(0) // nothing re-parsed
    const row = db.prepare('SELECT liked_at, play_count FROM music_track').get() as Record<
      string,
      unknown
    >
    expect(row.liked_at).not.toBeNull()
    expect(row.play_count).toBe(5)
    expect(db.prepare('SELECT spotify_id FROM music_artist').get()).toEqual({ spotify_id: 'artist-source' })
    expect(db.prepare('SELECT spotify_id FROM music_album').get()).toEqual({ spotify_id: 'album-source' })
  })

  it('prunes vanished tracks, empty albums/artists, and cascades playlist rows', async () => {
    makeFiles(['A/One/01 a.mp3', 'B/Two/01 b.mp3'])
    await startScan(fakeReader())
    const trackId = (
      db.prepare(`SELECT id FROM music_track WHERE file_path LIKE 'B/%'`).get() as { id: number }
    ).id
    db.prepare(`INSERT INTO music_playlist (title) VALUES ('Mix')`).run()
    db.prepare(
      `INSERT INTO music_playlist_track (playlist_id, track_id, position) VALUES (1, ?, 0)`
    ).run(trackId)

    rmSync(join(root, 'B'), { recursive: true })
    const summary = await startScan(fakeReader())
    expect(summary).toMatchObject({ artists: 1, albums: 1, tracks: 1, removed: 1 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM music_playlist_track').get()).toEqual({ n: 0 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM music_playlist').get()).toEqual({ n: 1 })
  })

  it('uses folder cover art when present, else extracts the embedded picture once', async () => {
    makeFiles(['A/WithCover/01 a.mp3', 'A/WithCover/folder.jpg', 'A/Embedded/01 b.mp3'])
    const reader = fakeReader({
      'A/Embedded/01 b.mp3': {
        picture: { data: new Uint8Array([1, 2, 3]), format: 'image/jpeg' }
      }
    })
    await startScan(reader)
    const covers = new Map(
      (
        db.prepare('SELECT title, cover_path FROM music_album').all() as {
          title: string
          cover_path: string | null
        }[]
      ).map((r) => [r.title, r.cover_path])
    )
    expect(covers.get('WithCover')).toBe('music/A/WithCover/folder.jpg')
    expect(covers.get('Embedded')).toMatch(/^media\/music-covers\/.+\.jpg$/)
    const coversDir = join(userData, 'media', 'music-covers')
    expect(existsSync(coversDir)).toBe(true)
    expect(readdirSync(coversDir)).toHaveLength(1)
  })

  it('keeps online-fetched art when the scan finds no local art (COALESCE path)', async () => {
    makeFiles(['A/One/01 a.mp3'])
    await startScan(fakeReader())
    db.prepare(`UPDATE music_album SET cover_path = 'media/dl-online.jpg'`).run()
    await startScan(fakeReader())
    expect((db.prepare('SELECT cover_path FROM music_album').get() as { cover_path: string }).cover_path).toBe(
      'media/dl-online.jpg'
    )
  })

  it('fails with a clear error when the root folder does not exist', async () => {
    rmSync(root, { recursive: true, force: true })
    await expect(startScan(fakeReader())).rejects.toThrow(/Music folder not found/)
  })

  it('refuses to wipe a populated library when the scan finds zero files', async () => {
    makeFiles(['A/One/01 a.mp3', 'B/Two/01 b.mp3'])
    await startScan(fakeReader())
    const trackId = (
      db.prepare(`SELECT id FROM music_track WHERE file_path LIKE 'B/%'`).get() as { id: number }
    ).id
    db.prepare(`INSERT INTO music_playlist (title) VALUES ('Mix')`).run()
    db.prepare(
      `INSERT INTO music_playlist_track (playlist_id, track_id, position) VALUES (1, ?, 0)`
    ).run(trackId)
    db.prepare(`UPDATE music_track SET liked_at = datetime('now') WHERE id = ?`).run(trackId)

    // Empty the root's contents but keep the root dir itself (unmounted-drive shape).
    rmSync(join(root, 'A'), { recursive: true })
    rmSync(join(root, 'B'), { recursive: true })
    await expect(startScan(fakeReader())).rejects.toThrow(/No audio files found/)

    expect(db.prepare('SELECT COUNT(*) AS n FROM music_track').get()).toEqual({ n: 2 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM music_playlist_track').get()).toEqual({ n: 1 })
    const liked = db.prepare('SELECT liked_at FROM music_track WHERE id = ?').get(trackId) as {
      liked_at: string | null
    }
    expect(liked.liked_at).not.toBeNull()
  })

  it('still completes a first scan of a genuinely empty library', async () => {
    const summary = await startScan(fakeReader())
    expect(summary).toMatchObject({ tracks: 0, added: 0, removed: 0 })
  })
})

describe('delete (files + rows)', () => {
  it('deleteTracks unlinks the file, drops the row, and prunes the empty album/artist folders', async () => {
    makeFiles(['Radiohead/OK Computer/01 Airbag.mp3'])
    await startScan(fakeReader())
    const id = (db.prepare('SELECT id FROM music_track').get() as { id: number }).id

    const res = await deleteTracks([id])
    expect(res).toEqual({ tracks: 1 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM music_track').get()).toEqual({ n: 0 })
    expect(existsSync(join(root, 'Radiohead/OK Computer/01 Airbag.mp3'))).toBe(false)
    // last file gone -> album folder and its now-empty artist folder are pruned
    expect(existsSync(join(root, 'Radiohead/OK Computer'))).toBe(false)
    expect(existsSync(join(root, 'Radiohead'))).toBe(false)
  })

  it('deleteTracks tolerates an already-missing file and still removes the row', async () => {
    makeFiles(['A/One/01 a.mp3'])
    await startScan(fakeReader())
    const id = (db.prepare('SELECT id FROM music_track').get() as { id: number }).id
    rmSync(join(root, 'A/One/01 a.mp3'))
    const res = await deleteTracks([id])
    expect(res).toEqual({ tracks: 1 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM music_track').get()).toEqual({ n: 0 })
  })

  it('deleteAlbum on a synthetic Singles album removes only the loose file, never the sibling album', async () => {
    // Aimer: a loose single (-> Singles album, dir_path == "Aimer") AND a real album.
    makeFiles(['Aimer/Brave Shine.mp3', 'Aimer/Real Album/01 One.mp3'])
    await startScan(fakeReader())
    const singles = db
      .prepare("SELECT id FROM music_album WHERE title = 'Singles'")
      .get() as { id: number }

    await deleteAlbum(singles.id)

    // Loose single + its row gone…
    expect(existsSync(join(root, 'Aimer/Brave Shine.mp3'))).toBe(false)
    expect(db.prepare("SELECT COUNT(*) AS n FROM music_album WHERE title='Singles'").get()).toEqual(
      { n: 0 }
    )
    // …but the real album's file, row, and the artist folder all survive.
    expect(existsSync(join(root, 'Aimer/Real Album/01 One.mp3'))).toBe(true)
    expect(existsSync(join(root, 'Aimer'))).toBe(true)
    expect(db.prepare('SELECT COUNT(*) AS n FROM music_track').get()).toEqual({ n: 1 })
  })

  it('deleteArtist recursively removes the whole artist folder (incl. cover art) and cascades rows', async () => {
    makeFiles([
      'Queen/A Night at the Opera/01 Death on Two Legs.mp3',
      'Queen/A Night at the Opera/cover.jpg',
      'Queen/Loose Hit.mp3',
      'ABBA/Gold/01 Dancing Queen.mp3'
    ])
    await startScan(fakeReader())
    const queen = db
      .prepare("SELECT id FROM music_artist WHERE name = 'Queen'")
      .get() as { id: number }

    const res = await deleteArtist(queen.id)
    expect(res.tracks).toBe(2) // the album track + the loose single

    // Entire Queen folder (cover art included) is gone; ABBA is untouched.
    expect(existsSync(join(root, 'Queen'))).toBe(false)
    expect(existsSync(join(root, 'ABBA/Gold/01 Dancing Queen.mp3'))).toBe(true)
    // Rows cascaded away: no Queen artist/albums/tracks remain.
    expect(db.prepare("SELECT COUNT(*) AS n FROM music_artist WHERE name='Queen'").get()).toEqual({
      n: 0
    })
    expect(
      db.prepare('SELECT COUNT(*) AS n FROM music_album WHERE artist_id = ?').get(queen.id)
    ).toEqual({ n: 0 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM music_track').get()).toEqual({ n: 1 }) // only ABBA
  })
})
