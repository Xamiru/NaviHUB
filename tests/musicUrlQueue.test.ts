import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
import * as urls from '../src/main/repos/musicUrlRepo'
import * as spotify from '../src/main/repos/musicSpotifyRepo'
beforeEach(() => { db = createTestDb() })
const input = { url: 'https://youtube.com/playlist?list=example', artist: 'Artist', album: 'Album', format: 'source' as const }
describe('persistent URL queue', () => {
  it('keeps a URL card without Spotify selections and merges repeated additions', () => {
    const id = urls.addUrlJob(input)
    expect(urls.addUrlJob(input)).toBe(id)
    const card = spotify.listDownloadQueue().pending[0]
    expect(card).toMatchObject({ id, sourceKind: 'url', title: 'Album', enumerationComplete: false })
    expect(card.missingCount).toBe(1)
  })
  it('retains incomplete enumeration and checkpoints across pause/retry', () => {
    const id = urls.addUrlJob(input)
    urls.saveEnumeration(id, [{ url: 'https://youtu.be/abcdefghijk', title: 'Song' }], false)
    const item = urls.urlItems(id)[0]
    urls.updateUrlItem(item.id, 'indexing', null, 'Artist/Album/song.opus')
    spotify.setDownloadQueueCardState(id, 'running', null, true)
    spotify.normalizeInterruptedDownloadQueue()
    urls.saveEnumeration(id, [{ url: 'https://youtu.be/abcdefghijk', title: 'Song' }], true)
    expect(urls.urlItems(id)).toHaveLength(1)
    expect(urls.urlItems(id)[0]).toMatchObject({ id: item.id, phase: 'indexing', outputPath: 'Artist/Album/song.opus' })
    expect(spotify.listDownloadQueue().pending[0].state).toBe('paused')
    spotify.removeDownloadQueueCard(id)
    expect(urls.urlItems(id)).toEqual([])
  })
})
