import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import { getState, revert, setManual } from '../src/main/repos/imageOverrideRepo'

// Hand-picked images survive re-imports through the restore triggers in
// init.sql, not through per-importer SQL — so these tests write the columns
// the way importers do (plain UPDATEs) and assert the pick comes back.

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))

const cover = (id: number) =>
  (db.prepare('SELECT cover_path FROM media_item WHERE id = ?').get(id) as { cover_path: string | null })
    .cover_path

function importedMedia(coverPath: string | null = 'media/dl-provider.jpg'): number {
  return Number(
    db
      .prepare(
        `INSERT INTO media_item (media_type, title, cover_path, external_source, external_id)
         VALUES ('anime', 'Serial Experiments Lain', ?, 'anilist', '339')`
      )
      .run(coverPath).lastInsertRowid
  )
}

beforeEach(() => {
  db = createTestDb()
})

describe('image overrides', () => {
  it('holds a manual cover through an import write and records what the import offered', () => {
    const id = importedMedia()
    setManual('media', id, 'media/mine.jpg')
    expect(cover(id)).toBe('media/mine.jpg')

    db.prepare('UPDATE media_item SET title = ?, cover_path = COALESCE(?, cover_path) WHERE id = ?').run(
      'Lain',
      'media/dl-newer.jpg',
      id
    )

    expect(cover(id)).toBe('media/mine.jpg')
    expect(getState('media', id)).toEqual({ manual: true, providerPath: 'media/dl-newer.jpg' })
    expect(db.prepare('SELECT title FROM media_item WHERE id = ?').get(id)).toEqual({ title: 'Lain' })
  })

  it('reverts to the newest imported image and releases the lock', () => {
    const id = importedMedia()
    setManual('media', id, 'media/mine.jpg')
    db.prepare('UPDATE media_item SET cover_path = ? WHERE id = ?').run('media/dl-newer.jpg', id)

    expect(revert('media', id)).toBe('media/dl-newer.jpg')
    expect(cover(id)).toBe('media/dl-newer.jpg')
    expect(getState('media', id).manual).toBe(false)

    db.prepare('UPDATE media_item SET cover_path = ? WHERE id = ?').run('media/dl-later.jpg', id)
    expect(cover(id)).toBe('media/dl-later.jpg')
  })

  it('keeps the first imported image as the revert target across several picks', () => {
    const id = importedMedia()
    setManual('media', id, 'media/one.jpg')
    setManual('media', id, 'media/two.jpg')
    expect(cover(id)).toBe('media/two.jpg')
    expect(revert('media', id)).toBe('media/dl-provider.jpg')
  })

  it('holds a deliberately removed image', () => {
    const id = importedMedia()
    setManual('media', id, null)
    db.prepare('UPDATE media_item SET cover_path = ? WHERE id = ?').run('media/dl-newer.jpg', id)
    expect(cover(id)).toBeNull()
  })

  it('gives hand-made entities the new image without a lock', () => {
    const id = Number(
      db.prepare("INSERT INTO media_item (media_type, title) VALUES ('anime', 'Mine')").run()
        .lastInsertRowid
    )
    setManual('media', id, 'media/mine.jpg')
    expect(cover(id)).toBe('media/mine.jpg')
    expect(getState('media', id).manual).toBe(false)
  })

  it('protects person photos and character images the same way', () => {
    const personId = Number(
      db
        .prepare(
          "INSERT INTO person (name, photo_path, external_source, external_id) VALUES ('Kaori Shimizu', 'media/p.jpg', 'anilist', '1')"
        )
        .run().lastInsertRowid
    )
    const characterId = Number(
      db
        .prepare(
          "INSERT INTO character (name, image_path, external_source, external_id) VALUES ('Lain', 'media/c.jpg', 'vndb', 'c1')"
        )
        .run().lastInsertRowid
    )
    setManual('person', personId, 'media/my-p.jpg')
    setManual('character', characterId, 'media/my-c.jpg')

    db.prepare('UPDATE person SET photo_path = ? WHERE id = ?').run('media/p2.jpg', personId)
    db.prepare('UPDATE character SET image_path = ? WHERE id = ?').run('media/c2.jpg', characterId)

    expect(db.prepare('SELECT photo_path FROM person').get()).toEqual({ photo_path: 'media/my-p.jpg' })
    expect(db.prepare('SELECT image_path FROM character').get()).toEqual({ image_path: 'media/my-c.jpg' })
    expect(revert('character', characterId)).toBe('media/c2.jpg')
  })

  it('holds a music album cover through the scanner upsert and records the folder art', () => {
    const artistId = Number(
      db.prepare("INSERT INTO music_artist (name, dir_path) VALUES ('Radiohead', 'Radiohead')").run()
        .lastInsertRowid
    )
    const albumId = Number(
      db
        .prepare(
          "INSERT INTO music_album (artist_id, title, dir_path, cover_path) VALUES (?, 'OK Computer', 'Radiohead/OK Computer', 'media/dl-found.jpg')"
        )
        .run(artistId).lastInsertRowid
    )
    setManual('music_album', albumId, 'media/mine.jpg')
    setManual('music_artist', artistId, 'media/me.jpg')

    // The scanner's own statement: local art wins on conflict.
    db.prepare(
      `INSERT INTO music_album (artist_id, title, dir_path, cover_path) VALUES (?, 'OK Computer', 'Radiohead/OK Computer', ?)
       ON CONFLICT(dir_path) DO UPDATE SET cover_path = COALESCE(excluded.cover_path, music_album.cover_path)`
    ).run(artistId, 'music/Radiohead/OK Computer/cover.jpg')
    db.prepare("UPDATE music_artist SET cover_path = 'media/dl-artist.jpg' WHERE id = ?").run(artistId)

    expect(db.prepare('SELECT cover_path FROM music_album').get()).toEqual({ cover_path: 'media/mine.jpg' })
    expect(db.prepare('SELECT cover_path FROM music_artist').get()).toEqual({ cover_path: 'media/me.jpg' })
    expect(revert('music_album', albumId)).toBe('music/Radiohead/OK Computer/cover.jpg')

    db.prepare('DELETE FROM music_artist WHERE id = ?').run(artistId)
    expect(db.prepare('SELECT COUNT(*) AS n FROM image_override').get()).toEqual({ n: 0 })
  })

  it('drops the lock with its entity', () => {
    const id = importedMedia()
    setManual('media', id, 'media/mine.jpg')
    db.prepare('DELETE FROM media_item WHERE id = ?').run(id)
    expect(db.prepare('SELECT COUNT(*) AS n FROM image_override').get()).toEqual({ n: 0 })
  })

  it('refuses an entity that does not exist', () => {
    expect(() => setManual('person', 999, 'media/x.jpg')).toThrow(/No person/)
  })
})

// The triggers only see UPDATEs. REPLACE is a DELETE + INSERT: it would skip the
// restore trigger and fire the cleanup one, silently dropping the user's pick.
describe('image override guard', () => {
  const root = join(__dirname, '..')

  function sources(dir: string): string[] {
    return readdirSync(join(root, dir), { recursive: true, withFileTypes: true })
      .filter((e) => e.isFile() && /\.(ts|cjs)$/.test(e.name))
      .map((e) => join(e.parentPath, e.name))
  }

  it('init.sql defines a restore trigger for each image column', () => {
    const sql = readFileSync(join(root, 'src/main/db/init.sql'), 'utf8')
    for (const [table, column] of [
      ['media_item', 'cover_path'],
      ['person', 'photo_path'],
      ['character', 'image_path'],
      ['music_album', 'cover_path'],
      ['music_artist', 'cover_path']
    ]) {
      expect(sql).toMatch(new RegExp(`AFTER UPDATE OF ${column} ON ${table}\\b`))
      expect(sql).toMatch(new RegExp(`AFTER DELETE ON ${table} BEGIN\\s+DELETE FROM image_override`))
    }
  })

  it('nothing REPLACEs a row that can carry a manual image', () => {
    const offenders = [...sources('src/main'), ...sources('scripts')].filter((file) =>
      /(INSERT OR )?REPLACE INTO (media_item|person|character|music_album|music_artist)\b/i.test(readFileSync(file, 'utf8'))
    )
    expect(offenders).toEqual([])
  })
})
