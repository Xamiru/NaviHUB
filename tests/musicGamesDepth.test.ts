import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import type { GameRunInput } from '../src/shared/types'
import { DEFAULT_SMART_RULES } from '../src/shared/musicPersonal'
// @ts-expect-error maintenance JS
import { sanitizeDb } from '../scripts/sanitizeSql.cjs'
let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
import * as runs from '../src/main/repos/playthroughRepo'
import * as sessions from '../src/main/repos/gameSessionRepo'
import * as journal from '../src/main/repos/musicJournalRepo'
import * as smart from '../src/main/repos/musicSmartRepo'
import * as music from '../src/main/repos/musicRepo'
const input: GameRunInput = {
  title: 'First run',
  kind: 'first',
  state: 'active',
  difficulty: 'Hard',
  build: 'Mage',
  objective: 'Find the key',
  stoppedAt: 'Library',
  notes: ''
}
beforeEach(() => {
  db = createTestDb()
  db.exec(`INSERT INTO media_item(id,media_type,title,progress) VALUES(1,'game','Game',20),(2,'game','Other',0),(3,'anime','Anime',0);
    INSERT INTO music_artist(id,name,dir_path) VALUES(1,'Artist','Artist');
    INSERT INTO music_album(id,artist_id,title,dir_path) VALUES(1,1,'Album','Artist/Album'),(2,1,'Other album','Artist/Other');
    INSERT INTO music_track(id,album_id,artist_id,file_path,title,play_count,liked_at,last_played_at) VALUES
      (1,1,1,'a.mp3','A',0,NULL,NULL),
      (2,1,1,'b.mp3','B',4,'2020-01-01','2020-01-01'),
      (3,2,1,'c.mp3','C',2,NULL,datetime('now'));
    INSERT INTO music_playlist(id,title) VALUES(1,'Manual mix');
    INSERT INTO music_playlist_track(playlist_id,track_id) VALUES(1,3);`)
})
afterEach(() => db.close())
describe('game playthroughs', () => {
  it('keeps exactly one active run and rejects edits for another game atomically', () => {
    const first = runs.save(1, null, input)
    const second = runs.save(1, null, { ...input, title: 'Replay', kind: 'replay' })
    expect(runs.activeId(1)).toBe(second)
    expect(runs.list(1).find((r) => r.id === first)?.state).toBe('paused')
    expect(() => runs.save(2, second, input)).toThrow(/not found/)
    expect(() => runs.save(1, first, { ...input, title: '' })).toThrow()
    expect(runs.activeId(1)).toBe(second)
    expect(() => runs.save(3, null, input)).toThrow('Game not found')
  })
  it('attaches to the captured run even if another run becomes active before exit', () => {
    const first = runs.save(1, null, input)
    const captured = runs.activeId(1)
    const second = runs.save(1, null, { ...input, title: 'New Game Plus', kind: 'newGamePlus' })
    sessions.recordSession(1, 1000, 4600, 3600, captured)
    expect(runs.list(1).find((r) => r.id === first)?.totalSeconds).toBe(3600)
    expect(runs.list(1).find((r) => r.id === second)?.totalSeconds).toBe(0)
    expect(db.prepare('SELECT progress FROM media_item WHERE id=1').get()).toEqual({ progress: 21 })
  })
  it('retains session totals when a run is deleted and allows explicit reassignment', () => {
    const id = runs.save(1, null, input)
    sessions.recordSession(1, 1000, 4600, 3600, id)
    runs.saveNote(1, id, null, { entryDate: '2026-09-23', body: 'Found key' })
    runs.remove(1, id)
    sessions.recordSession(1, 5000, 8600, 3600, id)
    expect(sessions.overview(1)).toMatchObject({ totalSeconds: 7200, sessionCount: 2 })
    expect(runs.history(1, null, 0)).toMatchObject({ sessionTotal: 2, noteTotal: 0 })
    const replacement = runs.save(1, null, input)
    const session = runs.history(1, null, 0).sessions[0]
    runs.assignSession(1, session.id, replacement)
    expect(runs.history(1, replacement, 0).sessionTotal).toBe(1)
    expect(() => runs.assignSession(2, session.id, replacement)).toThrow()
    runs.assignSession(1, session.id, null)
    expect(runs.history(1, replacement, 0).sessionTotal).toBe(0)
    expect(sessions.overview(1).totalSeconds).toBe(7200)
  })
  it('edits dated journal entries with ownership and calendar validation', () => {
    const id = runs.save(1, null, input)
    const other = runs.save(2, null, input)
    const note = runs.saveNote(1, id, null, { entryDate: '2026-09-23', body: 'Reached town' })
    expect(() => runs.saveNote(1, id, null, { entryDate: '2026-02-30', body: 'x' })).toThrow()
    expect(() => runs.saveNote(2, other, note, { entryDate: '2026-09-23', body: 'x' })).toThrow()
    runs.saveNote(1, id, note, { entryDate: '2026-09-22', body: 'Corrected' })
    expect(runs.history(1, id, 0).notes[0].body).toBe('Corrected')
    runs.removeNote(1, id, note)
    expect(runs.history(1, id, 0).notes).toEqual([])
  })
  it('pages all old sessions without inventing a run or losing history', () => {
    for (let i = 0; i < 55; i++) sessions.recordSession(1, 1000 + i * 100, 1060 + i * 100, 60)
    expect(runs.list(1)).toEqual([])
    expect(runs.history(1, null, 0).sessions).toHaveLength(50)
    expect(runs.history(1, null, 1).sessions).toHaveLength(5)
    expect(runs.history(1, null, 1).sessionTotal).toBe(55)
  })
})
describe('personal track tags', () => {
  it('persists normalized tags and standout tracks per album', () => {
    journal.saveTrack({ trackId: 1, standout: true, tags: [' Calm ', 'STUDY', 'calm'] })
    journal.saveTrack({ trackId: 2, standout: false, tags: ['instrumental'] })
    expect(journal.track(1)).toEqual({ trackId: 1, standout: true, tags: ['calm', 'study'] })
    expect(journal.tags()).toEqual(['calm', 'instrumental', 'study'])
    expect(journal.standouts(1)).toEqual([1])
    expect(() => journal.saveTrack({ trackId: 1, standout: true, tags: ['a,b'] })).toThrow()
    expect(() => journal.saveTrack({ trackId: 99, tags: [], standout: false })).toThrow()
    expect(journal.track(1).tags).toEqual(['calm', 'study'])
  })
})
describe('live smart playlists', () => {
  it('combines track tags with all/any semantics', () => {
    journal.saveTrack({ trackId: 1, standout: true, tags: ['calm', 'study'] })
    journal.saveTrack({ trackId: 2, standout: false, tags: ['study'] })
    expect(
      smart.preview({ ...DEFAULT_SMART_RULES, tags: ['study', 'calm'] }).items.map((t) => t.id)
    ).toEqual([1])
    expect(
      smart
        .preview({ ...DEFAULT_SMART_RULES, tags: ['study', 'calm'], tagMode: 'any' })
        .items.map((t) => t.id)
    ).toEqual([1, 2])
    expect(smart.preview({ ...DEFAULT_SMART_RULES, tags: ['unknown'] }).total).toBe(0)
  })
  it('reevaluates membership after likes and plays, without altering manual playlists', () => {
    const id = smart.save(null, {
      title: 'Unheard favorites',
      description: '',
      rules: { ...DEFAULT_SMART_RULES, liked: 'liked', playState: 'unplayed' }
    })
    expect(smart.queue(id)).toEqual([])
    music.setLiked(1, true)
    expect(smart.queue(id).map((t) => t.id)).toEqual([1])
    music.logPlay(1)
    expect(smart.queue(id)).toEqual([])
    expect(db.prepare('SELECT track_id FROM music_playlist_track').all()).toEqual([{ track_id: 3 }])
  })
  it('includes never-played songs in the days rule and excludes recent plays', () => {
    expect(
      smart.preview({ ...DEFAULT_SMART_RULES, notPlayedDays: 90 }).items.map((t) => t.id)
    ).toEqual([1, 2])
    expect(
      smart.preview({ ...DEFAULT_SMART_RULES, minPlays: 1, maxPlays: 3 }).items.map((t) => t.id)
    ).toEqual([3])
  })
  it('uses explicit album/track soundtrack links', () => {
    db.exec(
      'INSERT INTO soundtrack_link(album_id,media_id) VALUES(1,1); INSERT INTO soundtrack_link(track_id,media_id) VALUES(3,2)'
    )
    expect(smart.preview({ ...DEFAULT_SMART_RULES, soundtrack: 'linked' }).total).toBe(3)
    expect(
      smart
        .preview({
          ...DEFAULT_SMART_RULES,
          soundtrack: 'linked',
          playState: 'unplayed'
        })
        .items.map((t) => t.id)
    ).toEqual([1])
    db.exec('DELETE FROM soundtrack_link WHERE track_id=3')
    expect(
      smart.preview({ ...DEFAULT_SMART_RULES, soundtrack: 'unlinked' }).items.map((t) => t.id)
    ).toEqual([3])
  })
  it('limits, sorts and pages deterministically, with uncapped match counts', () => {
    for (let i = 4; i <= 60; i++)
      db.prepare(
        'INSERT INTO music_track(id,album_id,artist_id,file_path,title) VALUES(?,1,1,?,?)'
      ).run(i, `${i}.mp3`, `Track ${i}`)
    const rules = { ...DEFAULT_SMART_RULES, maxTracks: 53 }
    expect(smart.preview(rules)).toMatchObject({ total: 53, matching: 60 })
    expect(smart.preview(rules).items).toHaveLength(50)
    expect(smart.preview(rules, 1).items).toHaveLength(3)
    expect(smart.preview(rules, 2).items).toEqual([])
    expect(smart.preview({ ...rules, order: 'recent' }).items[0].id).toBe(3)
    const id = smart.save(null, { title: 'Bounded', description: '', rules })
    expect(smart.queue(id)).toHaveLength(53)
  })
  it('validates rules and uses literal artist/tag parameters', () => {
    expect(smart.preview({ ...DEFAULT_SMART_RULES, artist: "' OR 1=1 --" }).total).toBe(0)
    expect(() => smart.preview({ ...DEFAULT_SMART_RULES, minPlays: 4, maxPlays: 2 })).toThrow()
    expect(() => smart.preview({ ...DEFAULT_SMART_RULES, maxTracks: 2001 })).toThrow()
    expect(() => smart.preview({ ...DEFAULT_SMART_RULES, notPlayedDays: -1 })).toThrow()
    const id = smart.save(null, { title: 'Mix', description: '', rules: DEFAULT_SMART_RULES })
    smart.remove(id)
    expect(() => smart.queue(id)).toThrow('Smart playlist not found')
  })
})
describe('personal data lifecycle', () => {
  it('sanitizes every personal game and music table', () => {
    const id = runs.save(1, null, input)
    sessions.recordSession(1, 1000, 4600, 3600, id)
    runs.saveNote(1, id, null, { entryDate: '2026-09-23', body: 'Private' })
    journal.saveTrack({ trackId: 1, standout: true, tags: ['private'] })
    smart.save(null, { title: 'Private mix', description: '', rules: DEFAULT_SMART_RULES })
    sanitizeDb(db)
    for (const table of [
      'game_playthrough',
      'game_playthrough_session',
      'game_playthrough_note',
      'music_track_personal',
      'music_smart_playlist'
    ])
      expect(db.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get()).toEqual({ n: 0 })
    expect(db.prepare('SELECT title FROM media_item WHERE id=1').get()).toEqual({ title: 'Game' })
    expect(db.pragma('foreign_key_check')).toEqual([])
  })
})
