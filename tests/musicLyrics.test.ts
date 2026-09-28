import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import os from 'node:os'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
let root: string
// URL-substring -> { status, body } fixture, or an Error to throw (network failure).
let responses: Record<string, { status: number; body?: unknown } | Error> = {}
const requested: string[] = []

vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('../src/main/files', () => ({
  absoluteMediaPath: (rel: string) => join(root, rel.replace(/^music\//, ''))
}))
vi.mock('../src/main/http', () => ({
  MAX_API_RESPONSE_BYTES: 32 * 1024 * 1024,
  fetchWithRetry: async (url: string) => {
    requested.push(url)
    const hit = Object.entries(responses).find(([key]) => url.includes(key))?.[1]
    if (hit instanceof Error) throw hit
    const status = hit?.status ?? 404
    return { ok: status < 400, status, json: async () => hit?.body ?? {} }
  }
}))

import { activeLyricIndex, formatLrc, parseLrc } from '../src/shared/lyrics'
import { fetchLyrics, fetchMissingLyrics, getLyrics, lyricsFromEmbedded, pickLrclibResult } from '../src/main/musicLyrics'

const noEmbedded = async () => undefined

beforeEach(() => {
  db = createTestDb()
  root = mkdtempSync(join(os.tmpdir(), 'navihub-lyrics-'))
  responses = {}
  requested.length = 0
  db.exec(`INSERT INTO music_artist(id,name,dir_path) VALUES(1,'Radiohead','Radiohead');
    INSERT INTO music_album(id,artist_id,title,dir_path) VALUES(1,1,'(1997) OK Computer','Radiohead/(1997) OK Computer');
    INSERT INTO music_track(id,album_id,artist_id,file_path,title,duration)
      VALUES(1,1,1,'Radiohead/(1997) OK Computer/01 Airbag.mp3','Airbag',284.2)`)
  mkdirSync(join(root, 'Radiohead/(1997) OK Computer'), { recursive: true })
})
afterEach(() => rmSync(root, { recursive: true, force: true }))

describe('LRC parsing', () => {
  it('reads repeated time tags and offsets, skips metadata, and finds the active line', () => {
    const lines = parseLrc('[ar:Radiohead]\n[offset:+500]\n[00:10.50][01:00.00]Chorus\r\n[00:05]Verse\n[00:20.123]\nplain text')
    expect(lines).toEqual([
      { time: 4.5, text: 'Verse' },
      { time: 10, text: 'Chorus' },
      { time: 19.623, text: '' },
      { time: 59.5, text: 'Chorus' }
    ])
    expect(activeLyricIndex(lines, 0)).toBe(-1)
    expect(activeLyricIndex(lines, 10)).toBe(1)
    expect(activeLyricIndex(lines, 500)).toBe(3)
    expect(parseLrc(formatLrc([{ time: 65.25, text: 'Line' }]))).toEqual([{ time: 65.25, text: 'Line' }])
  })

  it('turns embedded SYLT milliseconds into LRC and treats LRC-shaped USLT as synced', () => {
    expect(lyricsFromEmbedded([{ syncText: [{ text: 'One', timestamp: 1500 }] }]))
      .toEqual({ state: 'found', synced: '[00:01.50]One', plain: null, source: 'embedded' })
    expect(lyricsFromEmbedded([{ text: '[00:02.00]Two' }])).toMatchObject({ synced: '[00:02.00]Two', plain: null })
    expect(lyricsFromEmbedded([{ text: 'Just words' }])).toMatchObject({ synced: null, plain: 'Just words' })
    expect(lyricsFromEmbedded([{ text: '  ' }])).toBeNull()
  })

  it('only accepts LRCLIB search hits whose length matches the file, preferring synced lyrics', () => {
    const rows = [
      { duration: 400, syncedLyrics: '[00:01]Wrong edit' },
      { duration: 283, plainLyrics: 'Plain' },
      { duration: 286, syncedLyrics: '[00:01]Synced' }
    ]
    expect(pickLrclibResult(rows, 284)).toBe(rows[2])
    expect(pickLrclibResult([{ duration: 284 }], 284)).toBeNull()
  })
})

describe('lyrics lookup', () => {
  it('reports unchecked, then stores an exact LRCLIB hit for offline use without the album year', async () => {
    expect(getLyrics(1)).toMatchObject({ state: 'unchecked', source: null })
    responses['/api/get'] = { status: 200, body: { syncedLyrics: '[00:01.00]In the next world war', plainLyrics: 'In the next world war' } }
    expect(await fetchLyrics(1, noEmbedded)).toMatchObject({ state: 'found', source: 'lrclib', synced: '[00:01.00]In the next world war' })
    expect(requested[0]).toContain('album_name=OK+Computer')
    expect(requested[0]).toContain('duration=284')
    responses = {}
    expect(getLyrics(1)).toMatchObject({ state: 'found', source: 'lrclib' })
  })

  it('falls back to search, then stores "missing" so opening the panel again does not re-query', async () => {
    responses['/api/search'] = { status: 200, body: [{ duration: 500, plainLyrics: 'Different edit' }] }
    expect(await fetchLyrics(1, noEmbedded)).toMatchObject({ state: 'missing', source: 'lrclib' })
    expect(requested.map((url) => url.split('?')[0])).toEqual(['https://lrclib.net/api/get', 'https://lrclib.net/api/search'])
    expect(getLyrics(1).state).toBe('missing')
  })

  it('does not store anything when the service fails, so the next open retries', async () => {
    responses['/api/get'] = { status: 503 }
    await expect(fetchLyrics(1, noEmbedded)).rejects.toThrow(/unavailable right now/)
    responses['/api/get'] = new Error('offline')
    await expect(fetchLyrics(1, noEmbedded)).rejects.toThrow('offline')
    expect(getLyrics(1).state).toBe('unchecked')
  })

  it('prefers embedded lyrics over the network, and a sidecar .lrc over everything', async () => {
    const embedded = await fetchLyrics(1, async () => [{ text: 'From the tags' }])
    expect(embedded).toMatchObject({ state: 'found', source: 'embedded', plain: 'From the tags' })
    expect(requested).toEqual([])
    writeFileSync(join(root, 'Radiohead/(1997) OK Computer/01 Airbag.lrc'), '[00:03.00]From the sidecar')
    expect(getLyrics(1)).toMatchObject({ source: 'file', synced: '[00:03.00]From the sidecar' })
  })

  it('drops stored lyrics with the track', async () => {
    await fetchLyrics(1, async () => [{ text: 'Words' }])
    db.prepare('DELETE FROM music_track WHERE id = 1').run()
    expect(db.prepare('SELECT COUNT(*) AS n FROM music_track_lyrics').get()).toEqual({ n: 0 })
  })

  it('sweeps only unchecked tracks, keeps failures unchecked, and stops when the service is unreachable', async () => {
    db.exec(`INSERT INTO music_track(id,album_id,artist_id,file_path,title,duration) VALUES
      (2,1,1,'Radiohead/(1997) OK Computer/02 Paranoid Android.mp3','Paranoid Android',383),
      (3,1,1,'Radiohead/(1997) OK Computer/03 Subterranean.mp3','Subterranean',268),
      (4,1,1,'Radiohead/(1997) OK Computer/04 Exit Music.mp3','Exit Music',264)`)
    db.prepare("INSERT INTO music_track_lyrics(track_id,state,source) VALUES(4,'missing','lrclib')").run()
    responses['Airbag'] = { status: 200, body: { plainLyrics: 'In the next world war' } }
    responses['Paranoid'] = { status: 200, body: { instrumental: true } }
    expect(await fetchMissingLyrics(noEmbedded)).toMatchObject({ total: 3, done: 3, found: 2, missing: 1, failed: 0 })
    expect(requested.some((url) => url.includes('Exit'))).toBe(false)
    expect(getLyrics(3).state).toBe('missing')

    db.exec(`DELETE FROM music_track_lyrics;
      INSERT INTO music_track(id,album_id,artist_id,file_path,title,duration) VALUES
      (5,1,1,'Radiohead/(1997) OK Computer/05 Let Down.mp3','Let Down',299)`)
    responses = { '/api/': new Error('offline') }
    await expect(fetchMissingLyrics(noEmbedded)).rejects.toThrow('Lyrics download stopped: offline')
    expect([1, 2, 3, 4, 5].map((id) => getLyrics(id).state)).toEqual(['unchecked', 'unchecked', 'unchecked', 'unchecked', 'unchecked'])
    expect(requested.filter((url) => url.includes('Let+Down'))).toEqual([])
  })
})
