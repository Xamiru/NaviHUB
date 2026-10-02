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

const fsFault = vi.hoisted(() => ({ read: '', remove: '', stat: '' }))
vi.mock('fs/promises', async (importOriginal) => {
  const actual = await importOriginal<typeof import('fs/promises')>()
  return {
    ...actual,
    readdir: (...args: Parameters<typeof actual.readdir>) => {
      if (String(args[0]) === fsFault.read) throw new Error('directory unreadable')
      return actual.readdir(...args)
    },
    stat: (...args: Parameters<typeof actual.stat>) => {
      if (String(args[0]) === fsFault.stat) throw new Error('file unreadable')
      return actual.stat(...args)
    },
    rm: (...args: Parameters<typeof actual.rm>) => {
      if (String(args[0]) === fsFault.remove) throw new Error('disk failure')
      return actual.rm(...args)
    }
  }
})

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
  mediaRoot: () => join(userData, 'media'),
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
  indexMusicFiles,
  deleteTracks,
  deleteAlbum,
  deleteArtist,
  splitGenres,
  tagYear,
  type ParsedTrack,
  type TagReader,
  type ScannedFile
} from '../src/main/music'

import { listAlbums, listDecades, listGenres, listTrackPage, playbackQueue } from '../src/main/repos/musicRepo'
type TagFixture = Partial<Omit<ParsedTrack, keyof ScannedFile>>

beforeEach(() => {
  db = createTestDb()
  root = mkdtempSync(join(os.tmpdir(), 'navihub-music-'))
  userData = mkdtempSync(join(os.tmpdir(), 'navihub-userdata-'))
  showOpenDialog.mockReset()
  fsFault.read = fsFault.remove = fsFault.stat = ''
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

  it('stores every genre per track, keeps them on unchanged rescans, and re-reads pre-genre rows once', async () => {
    makeFiles(['Artist/Album/01 Song.mp3', 'Artist/Other/01 Tune.mp3'])
    await startScan(fakeReader({
      'Artist/Album/01 Song.mp3': { genres: ['Rock', 'Alternative'] },
      'Artist/Other/01 Tune.mp3': { genres: ['rock'] }
    }))
    const genres = () => db.prepare('SELECT genre FROM music_track_genre ORDER BY track_id, genre').all()
    expect(genres()).toEqual([{ genre: 'Alternative' }, { genre: 'Rock' }, { genre: 'rock' }])
    expect(listGenres()).toEqual([
      { name: 'Rock', trackCount: 2, albumCount: 2 },
      { name: 'Alternative', trackCount: 1, albumCount: 1 }
    ])
    expect(listAlbums('', { genre: 'Alternative' }).map((album) => album.title)).toEqual(['Album'])
    expect(listTrackPage({ sort: 'title', filter: 'all', genre: 'ROCK', offset: 0, limit: 48 }))
      .toMatchObject({ total: 2 })
    expect(playbackQueue(true, { genre: 'Alternative' })).toMatchObject({ total: 1, truncated: false })
    expect(playbackQueue(false, { genre: 'Alternative' }).items.map((track) => track.title)).toEqual(['Song'])
    expect(playbackQueue(false).total).toBe(2)

    const unchanged = fakeReader()
    await startScan(unchanged)
    expect(unchanged.calls).toHaveLength(0)
    expect(genres()).toHaveLength(3)

    // Rows indexed before genres existed carry genres_scanned = 0 from the migration.
    db.prepare("UPDATE music_track SET genres_scanned = 0 WHERE file_path = 'Artist/Album/01 Song.mp3'").run()
    const backfill = fakeReader({ 'Artist/Album/01 Song.mp3': { genres: ['Jazz'] } })
    await startScan(backfill)
    expect(backfill.calls.map((file) => file.relPath)).toEqual(['Artist/Album/01 Song.mp3'])
    expect(genres()).toEqual([{ genre: 'Jazz' }, { genre: 'rock' }])
    expect(db.prepare('SELECT MIN(genres_scanned) AS n FROM music_track').get()).toEqual({ n: 1 })
  })

  it('browses and plays by decade, with yearless albums as their own group', async () => {
    makeFiles(['A/Nineties/01 One.mp3', 'A/Nineties/02 Two.mp3', 'A/Noughties/01 Three.mp3', 'A/Undated/01 Four.mp3'])
    await startScan(fakeReader({
      'A/Nineties/01 One.mp3': { year: 1997, genres: ['Rock'] },
      'A/Noughties/01 Three.mp3': { year: 2004, genres: ['Rock'] }
    }))
    expect(listDecades()).toEqual([
      { decade: 2000, albumCount: 1, trackCount: 1 },
      { decade: 1990, albumCount: 1, trackCount: 2 },
      { decade: null, albumCount: 1, trackCount: 1 }
    ])
    expect(listAlbums('', { decade: 1990 }).map((album) => album.title)).toEqual(['Nineties'])
    expect(listAlbums('', { decade: 'unknown' }).map((album) => album.title)).toEqual(['Undated'])
    expect(listTrackPage({ sort: 'title', filter: 'all', decade: 1990, genre: 'Rock', offset: 0, limit: 48 })
      .items.map((track) => track.title)).toEqual(['One'])
    expect(playbackQueue(false, { decade: 2000 }).items.map((track) => track.title)).toEqual(['Three'])
    expect(playbackQueue(false, { decade: 1990 })).toMatchObject({ total: 2, truncated: false })
  })

  it('keeps only plausible tag years and reads a whole date as its year', () => {
    expect(tagYear(1997)).toBe(1997)
    expect(tagYear(20140530)).toBe(2014)
    expect(tagYear(0)).toBeNull()
    expect(tagYear(undefined)).toBeNull()
    expect(tagYear(123456)).toBeNull()
  })

  it('splits multi-genre tags on separators but keeps commas inside a name', () => {
    expect(splitGenres(['Rock; Alternative', 'Hip-Hop/Rap', 'rock', '  ', 'Folk, World, & Country']))
      .toEqual(['Rock', 'Alternative', 'Hip-Hop', 'Rap', 'Folk, World, & Country'])
    expect(splitGenres(undefined)).toEqual([])
  })

  it('preserves personal track tags across a same-path rescan', async () => {
    makeFiles(['Artist/Album/song.mp3'])
    await startScan(fakeReader())
    const track = db.prepare('SELECT id,album_id FROM music_track').get() as { id: number; album_id: number }
    db.prepare("INSERT INTO music_track_personal(track_id,standout,tags_json) VALUES(?,1,?)").run(track.id, JSON.stringify(['calm']))
    await startScan(fakeReader())
    expect(db.prepare('SELECT standout FROM music_track_personal').get()).toEqual({ standout: 1 })
    expect(db.pragma('foreign_key_check')).toEqual([])
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
    mkdirSync(join(userData, 'media'), { recursive: true })
    writeFileSync(join(userData, 'media/dl-online.jpg'), 'cover')
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

    const ids = db.prepare('SELECT album_id, artist_id FROM music_track').get() as {
      album_id: number
      artist_id: number
    }

    const res = await deleteTracks([id])
    // The emptied album and artist rows go too, so their pages can leave instead of showing nothing.
    expect(res).toEqual({ tracks: 1, albumIds: [ids.album_id], artistIds: [ids.artist_id] })
    expect(db.prepare('SELECT COUNT(*) AS n FROM music_album').get()).toEqual({ n: 0 })
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
    expect(res.tracks).toBe(1)
    expect(db.prepare('SELECT COUNT(*) AS n FROM music_track').get()).toEqual({ n: 0 })
  })

  it('deleteAlbum on a synthetic Singles album removes only the loose file, never the sibling album', async () => {
    // Aimer: a loose single (-> Singles album, dir_path == "Aimer") AND a real album.
    makeFiles(['Aimer/Brave Shine.mp3', 'Aimer/Real Album/01 One.mp3'])
    await startScan(fakeReader())
    const singles = db
      .prepare("SELECT id FROM music_album WHERE title = 'Singles'")
      .get() as { id: number }

    const res = await deleteAlbum(singles.id)
    // The artist keeps its real album, so only the album is reported gone.
    expect(res).toMatchObject({ albumIds: [singles.id], artistIds: [] })

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

describe('targeted download indexing', () => {
  it('indexes only supplied files and never prunes unrelated library rows', async () => {
    makeFiles(['Artist/Old/old.mp3', 'Artist/New/new.opus'])
    await startScan(fakeReader())
    const old = db.prepare("SELECT id FROM music_track WHERE file_path='Artist/Old/old.mp3'").get()
    rmSync(join(root, 'Artist/Old/old.mp3'))
    const reader = vi.fn(async () => ({ title: 'Updated download', duration: 201 }))
    await indexMusicFiles(['Artist/New/new.opus'], 'test targeted', reader)
    expect(reader).toHaveBeenCalledTimes(1)
    expect(db.prepare("SELECT id FROM music_track WHERE file_path='Artist/Old/old.mp3'").get()).toEqual(old)
    expect(db.prepare("SELECT title FROM music_track WHERE file_path='Artist/New/new.opus'").get()).toEqual({ title: 'Updated download' })
    await indexMusicFiles([], 'test targeted', reader)
    expect(db.prepare('SELECT COUNT(*) AS n FROM music_track').get()).toEqual({ n: 2 })
  })

  it('rejects paths escaping the music root without touching rows', async () => {
    await expect(indexMusicFiles(['../outside.mp3'], 'test targeted', fakeReader())).rejects.toThrow()
    expect(db.prepare('SELECT COUNT(*) AS n FROM music_track').get()).toEqual({ n: 0 })
  })
})


describe('music filesystem failure recovery', () => {
  it.each(['B', 'B/Album', 'B/Album/CD1'])('preserves the whole library when %s cannot be read', async (directory) => {
    makeFiles(['A/Album/one.mp3', 'B/Album/CD1/two.mp3'])
    await startScan(fakeReader())
    const track = db.prepare("SELECT id FROM music_track WHERE file_path LIKE 'B/%'").get() as { id: number }
    db.prepare("UPDATE music_track SET liked_at='2026-01-01', play_count=3 WHERE id=?").run(track.id)
    db.prepare("INSERT INTO music_playlist(title) VALUES('Mix')").run()
    db.prepare('INSERT INTO music_playlist_track(playlist_id,track_id,position) VALUES(1,?,0)').run(track.id)
    db.prepare('INSERT INTO music_play_log(track_id,duration) VALUES(?,200)').run(track.id)
    fsFault.read = join(root, directory)
    await expect(startScan(fakeReader())).rejects.toThrow('directory unreadable')
    expect(db.prepare('SELECT COUNT(*) AS n FROM music_track').get()).toEqual({ n: 2 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM music_playlist_track').get()).toEqual({ n: 1 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM music_play_log').get()).toEqual({ n: 1 })
    expect(db.prepare('SELECT play_count FROM music_track WHERE id=?').get(track.id)).toEqual({ play_count: 3 })
  })

  it('preserves tracks if an individual file cannot be inspected', async () => {
    makeFiles(['A/Album/one.mp3', 'A/Album/two.mp3'])
    await startScan(fakeReader())
    fsFault.stat = join(root, 'A/Album/one.mp3')
    await expect(startScan(fakeReader())).rejects.toThrow('file unreadable')
    expect(db.prepare('SELECT COUNT(*) AS n FROM music_track').get()).toEqual({ n: 2 })
  })

  it('keeps artist tracking and playlist rows if disk removal fails', async () => {
    makeFiles(['A/Album/one.mp3'])
    await startScan(fakeReader())
    db.prepare("UPDATE music_track SET liked_at='2026-01-01', play_count=3").run()
    db.prepare("INSERT INTO music_playlist(title) VALUES('Mix')").run()
    db.prepare('INSERT INTO music_playlist_track(playlist_id,track_id,position) VALUES(1,1,0)').run()
    fsFault.remove = join(root, 'A')
    await expect(deleteArtist(1)).rejects.toThrow('disk failure')
    expect(db.prepare('SELECT COUNT(*) AS n FROM music_artist').get()).toEqual({ n: 1 })
    expect(db.prepare('SELECT play_count FROM music_track').get()).toEqual({ play_count: 3 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM music_playlist_track').get()).toEqual({ n: 1 })
  })

  it('recovers a deleted folder cover from unchanged audio embedded art', async () => {
    makeFiles(['A/Album/one.mp3', 'A/Album/cover.jpg'])
    await startScan(fakeReader())
    rmSync(join(root, 'A/Album/cover.jpg'))
    const reader = fakeReader({ 'A/Album/one.mp3': { picture: { format: 'image/jpeg', data: Buffer.from('art') } } })
    await startScan(reader)
    expect(reader.calls).toHaveLength(1)
    const { cover_path } = db.prepare('SELECT cover_path FROM music_album').get() as { cover_path: string }
    expect(cover_path).toMatch(/^media\/music-covers\//)
    expect(existsSync(join(userData, cover_path))).toBe(true)
  })

  it('clears a missing stored cover when no replacement exists', async () => {
    makeFiles(['A/Album/one.mp3'])
    await startScan(fakeReader())
    db.prepare("UPDATE music_album SET cover_path='media/missing.jpg'").run()
    await startScan(fakeReader())
    expect(db.prepare('SELECT cover_path FROM music_album').get()).toEqual({ cover_path: null })
  })
})
