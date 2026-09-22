import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

// Offline AnimeThemes import against the real schema. The one thing worth
// locking down here: importThemes does a CLEAN REPLACE (delete + reinsert), so
// the Songs page's `favorite` hearts must be carried across by AnimeThemes id —
// otherwise "↻ Refresh from AnimeThemes" would silently empty them.

let db: Database.Database
const fileMocks = vi.hoisted(() => ({ audioCalls: [] as string[] }))
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

vi.mock('../src/main/files', () => ({
  downloadImages: async (urls: (string | null | undefined)[]) =>
    new Map(urls.filter(Boolean).map((u) => [u as string, null])),
  downloadAudio: async (url: string) => {
    fileMocks.audioCalls.push(url)
    return `audio/${fileMocks.audioCalls.length}`
  }
}))

vi.mock('../src/main/progress', () => ({ updateActivity: () => {} }))

// URL-keyed fixtures: the resource lookup resolves the slug, /anime/<slug>
// returns the themes.
let themes: Record<string, unknown>[] = []
vi.mock('../src/main/http', () => ({
  MAX_API_RESPONSE_BYTES: 32 * 1024 * 1024,
  fetchWithRetry: async (url: string) => ({
    ok: true,
    status: 200,
    json: async () =>
      url.includes('/resource')
        ? { resources: [{ anime: [{ slug: 'bebop' }] }] }
        : { anime: { animethemes: themes } }
  })
}))

import { fetchAnimeThemes, importThemes, themeSetNeedsRefresh } from '../src/main/themes'

function theme(id: number, slug: string, title: string, artist?: string) {
  return {
    id,
    slug,
    type: slug.startsWith('OP') ? 'OP' : 'ED',
    sequence: 1,
    song: {
      title,
      artists: artist ? [{ id: 900 + id, name: artist, images: [] }] : []
    },
    animethemeentries: [{ spoiler: false, videos: [{ audio: { link: `https://x/${id}.ogg` } }] }]
  }
}

let mediaId: number

beforeEach(() => {
  db = createTestDb()
  fileMocks.audioCalls.length = 0
  mediaId = Number(
    db
      .prepare(
        `INSERT INTO media_item (media_type, title, external_source, external_id)
         VALUES ('anime', 'Cowboy Bebop', 'anilist', '1')`
      )
      .run().lastInsertRowid
  )
  themes = [theme(1, 'OP1', 'Tank!', 'The Seatbelts'), theme(2, 'ED1', 'The Real Folk Blues')]
})

const songs = (): { external_id: string; title: string; favorite: number }[] =>
  db
    .prepare('SELECT external_id, title, favorite FROM theme_song ORDER BY sort_order')
    .all() as { external_id: string; title: string; favorite: number }[]

describe('importThemes', () => {
  it('imports songs with their artists, unfavorited', async () => {
    const summary = await importThemes(mediaId)
    expect(summary).toMatchObject({ mediaId, songs: 2, artists: 1 })
    expect(songs().map((s) => s.title)).toEqual(['Tank!', 'The Real Folk Blues'])
    expect(songs().every((s) => s.favorite === 0)).toBe(true)
  })

  it('keeps favorites across a re-import, and drops those of songs that vanish', async () => {
    await importThemes(mediaId)
    db.prepare(`UPDATE theme_song SET favorite=1 WHERE title='Tank!'`).run()

    // Refresh: the ED is gone upstream, a new OP2 appears, the title changed.
    themes = [theme(1, 'OP1', 'TANK! (remaster)', 'The Seatbelts'), theme(3, 'OP2', 'Rush')]
    await importThemes(mediaId)

    const rows = songs()
    expect(rows.map((s) => s.title)).toEqual(['TANK! (remaster)', 'Rush'])
    // Same AnimeThemes id -> still hearted, even though the row is brand new and
    // its canonical title was refreshed.
    expect(rows.find((s) => s.external_id === '1')?.favorite).toBe(1)
    expect(rows.find((s) => s.external_id === '3')?.favorite).toBe(0)
  })

  it('preserves retained audio and downloads only new songs or missing audio', async () => {
    await importThemes(mediaId)
    expect(fileMocks.audioCalls).toHaveLength(2)

    // Simulate one retained row whose file is missing from the DB record.
    db.prepare("UPDATE theme_song SET audio_path=NULL WHERE external_id='1'").run()
    fileMocks.audioCalls.length = 0
    await importThemes(mediaId, { onlyMissingAudio: true })

    expect(fileMocks.audioCalls).toHaveLength(1)
    expect(fileMocks.audioCalls[0]).toBe('https://x/1.ogg')
    expect(
      (db.prepare("SELECT audio_path FROM theme_song WHERE external_id='2'").get() as { audio_path: string }).audio_path
    ).toBe('audio/2')
  })

  it('detects same-count replacements and treats identical complete sets as current', async () => {
    await importThemes(mediaId)
    const current = await fetchAnimeThemes(1)
    expect(themeSetNeedsRefresh(db, mediaId, current)).toBe(false)

    const replacement = [
      { ...current[0] },
      { ...current[1], externalId: '3', title: 'Rush' }
    ]
    expect(themeSetNeedsRefresh(db, mediaId, replacement)).toBe(true)
  })

  it('mirrors an empty upstream catalogue by removing the local song set', async () => {
    await importThemes(mediaId)
    themes = []
    await importThemes(mediaId)
    expect(songs()).toEqual([])
  })
})
