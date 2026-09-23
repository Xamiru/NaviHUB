import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import type { SoundtrackInput } from '../src/shared/types'
// @ts-expect-error maintenance JS
import { sanitizeDb } from '../scripts/sanitizeSql.cjs'
let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
import * as repo from '../src/main/repos/soundtrackRepo'
beforeEach(() => {
  db = createTestDb()
  db.exec(`
  INSERT INTO media_item(id,media_type,title) VALUES(1,'visual_novel','VN'),(2,'anime','Anime');
  INSERT INTO music_artist(id,name,dir_path) VALUES(1,'Artist','Artist');
  INSERT INTO music_album(id,artist_id,title,dir_path) VALUES(1,1,'Album','Artist/Album');
  INSERT INTO music_track(id,album_id,artist_id,file_path,title) VALUES(1,1,1,'Artist/Album/a.mp3','Song'),(2,1,1,'Artist/Album/b.mp3','Other');
  INSERT INTO wrestling_wrestler(id,name) VALUES(1,'Wrestler');
`)
})
afterEach(() => db.close())
const input: SoundtrackInput = {
  music: { kind: 'album', id: 1 },
  target: { kind: 'media', id: 1 },
  label: 'OST',
  notes: 'Personal connection'
}
describe('explicit soundtrack links', () => {
  it('links in both directions and limits a track link to its own recording', () => {
    const album = repo.save(null, input)
    const track = repo.save(null, {
      ...input,
      music: { kind: 'track', id: 1 },
      target: { kind: 'wrestler', id: 1 },
      label: 'Entrance theme'
    })
    expect(repo.list({ kind: 'album', id: 1 }).map((l) => l.id)).toEqual([album, track])
    expect(repo.list({ kind: 'media', id: 1 })[0]).toMatchObject({
      musicTitle: 'Album',
      targetTitle: 'VN'
    })
    expect(repo.list({ kind: 'wrestler', id: 1 })[0]).toMatchObject({ musicTitle: 'Song' })
    expect(repo.tracks(album).map((t) => t.id)).toEqual([1, 2])
    expect(repo.tracks(track).map((t) => t.id)).toEqual([1])
    expect(() => repo.save(null, input)).toThrow(/already linked/)
    expect(() => repo.save(null, { ...input, target: { kind: 'media', id: 999 } })).toThrow(
      /no longer/
    )
  })
  it('cascades associations on entity deletion and wipes personal links without deleting canonical media', () => {
    repo.save(null, input)
    repo.save(null, { ...input, music: { kind: 'track', id: 1 }, target: { kind: 'media', id: 2 } })
    db.exec('DELETE FROM music_track WHERE id=1')
    expect(repo.list({ kind: 'media', id: 2 })).toEqual([])
    expect(repo.list({ kind: 'media', id: 1 })).toHaveLength(1)
    sanitizeDb(db)
    expect(repo.list({ kind: 'media', id: 1 })).toEqual([])
    expect(db.prepare('SELECT title FROM media_item WHERE id=1').get()).toEqual({ title: 'VN' })
  })
  it('enforces one source and target even for direct SQL writes', () => {
    expect(() =>
      db.exec('INSERT INTO soundtrack_link(album_id,track_id,media_id) VALUES(1,1,1)')
    ).toThrow(/CHECK/)
    expect(() => db.exec('INSERT INTO soundtrack_link(album_id) VALUES(1)')).toThrow(/CHECK/)
  })
})
