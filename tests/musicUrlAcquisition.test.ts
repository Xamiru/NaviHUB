import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mkdtempSync, writeFileSync, rmSync } from 'fs'
import { join, dirname } from 'path'
import { tmpdir } from 'os'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
let db: Database.Database
let root: string
vi.mock('electron', () => ({ app: { getPath: () => '/tmp' }, BrowserWindow: {}, dialog: {} }))
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('../src/main/files', () => ({ musicRootDir: () => root }))
vi.mock('../src/main/music', () => ({ indexMusicFiles: vi.fn() }))
import { processUrlJob } from '../src/main/musicUrlQueue'
import { addUrlJob, urlItems, urlJob } from '../src/main/repos/musicUrlRepo'
import { indexMusicFiles } from '../src/main/music'
beforeEach(() => {
  db = createTestDb()
  root = mkdtempSync(join(tmpdir(), 'navi-url-test-'))
  vi.mocked(indexMusicFiles).mockReset()
  db.exec(`INSERT INTO music_artist(id,name,dir_path) VALUES(1,'Artist','Artist'); INSERT INTO music_album(id,artist_id,title,dir_path) VALUES(1,1,'Album','Artist/Album')`)
})
afterEach(() => { db.close(); rmSync(root, { recursive: true, force: true }) })
const input = { url: 'https://youtu.be/abcdefghijk', artist: 'Artist', album: 'Album', format: 'source' as const }
describe('URL acquisition recovery', () => {
  it('identifies a transfer refusal before the first downloaded byte', async () => {
    const id = addUrlJob(input)
    const runner = vi.fn(async (args: string[], line: (value: string) => void) => {
      if (args.includes('--dump-single-json')) { line(JSON.stringify({ id: 'abcdefghijk', title: 'Song' })); return 0 }
      expect(args).toContain('before_dl:NAVIPHASE transfer')
      expect(args).toContain('post_process:NAVIPHASE processing')
      expect(args).toContain('--no-simulate')
      line('NAVIPHASE transfer')
      line('ERROR: unable to download video data: HTTP Error 403: Forbidden')
      return 1
    })
    await processUrlJob(id, 'test', runner, () => true, () => {})
    expect(urlItems(id)[0]).toMatchObject({ phase: 'failed', outputPath: null, localTrackId: null })
    expect(urlItems(id)[0].error).toContain('transfer (standalone yt-dlp)')
    expect(urlItems(id)[0].error).toContain('403: Forbidden')
  })

  it('retries indexing a completed file without repeating extraction or download', async () => {
    const id = addUrlJob(input)
    const runner = vi.fn(async (args: string[], line: (value: string) => void) => {
      if (args.includes('--dump-single-json')) line(JSON.stringify({ id: 'abcdefghijk', title: 'Song' }))
      else {
        const path = join(dirname(args[args.indexOf('-o') + 1]), 'abcdefghijk.opus')
        writeFileSync(path, 'completed audio fixture')
        writeFileSync(args[args.indexOf('--print-to-file') + 2], JSON.stringify(path))
      }
      return 0
    })
    vi.mocked(indexMusicFiles).mockRejectedValueOnce(new Error('database temporarily busy'))
    const first = await processUrlJob(id, 'test', runner, () => true, () => {})
    expect(first.resolved).toBe(0)
    expect(urlItems(id)[0]).toMatchObject({ phase: 'failed', outputPath: expect.stringContaining('Artist/Album/') })
    expect(runner).toHaveBeenCalledTimes(2)
    vi.mocked(indexMusicFiles).mockImplementationOnce(async (paths) => {
      db.prepare('INSERT INTO music_track(album_id,artist_id,file_path,title,duration) VALUES(1,1,?,?,200)').run(paths[0], 'Song')
    })
    const second = await processUrlJob(id, 'test', runner, () => true, () => {})
    expect(second).toMatchObject({ total: 1, resolved: 1, error: null })
    expect(runner).toHaveBeenCalledTimes(2)
    expect(urlItems(id)[0].phase).toBe('ready')
  })
  it('persists partial enumeration without declaring it complete or starting audio', async () => {
    const id = addUrlJob(input)
    const runner = vi.fn(async (_args: string[], line: (value: string) => void) => {
      line(JSON.stringify({ playlist_count: 2, entries: [{ id: 'abcdefghijk', title: 'Song' }, null] }))
      return 0
    })
    await expect(processUrlJob(id, 'test', runner, () => true, () => {})).rejects.toThrow('incomplete')
    expect(urlJob(id).complete).toBe(false)
    expect(urlItems(id)).toHaveLength(1)
    expect(runner).toHaveBeenCalledTimes(1)
  })
  it('benchmarks 200 repeated occurrences: one transfer and one index, reusable after queue history is cleared', async () => {
    const id = addUrlJob(input)
    const runner = vi.fn(async (args: string[], line: (value: string) => void) => {
      if (args.includes('--dump-single-json')) line(JSON.stringify({ playlist_count: 200, entries: Array.from({ length: 200 }, () => ({ id: 'abcdefghijk', title: 'Song' })) }))
      else {
        const path = join(dirname(args[args.indexOf('-o') + 1]), 'abcdefghijk.opus')
        writeFileSync(path, 'completed audio fixture')
        writeFileSync(args[args.indexOf('--print-to-file') + 2], JSON.stringify(path))
      }
      return 0
    })
    vi.mocked(indexMusicFiles).mockImplementation(async (paths) => {
      db.prepare('INSERT INTO music_track(album_id,artist_id,file_path,title,duration) VALUES(1,1,?,?,200)').run(paths[0], 'Song')
    })
    expect(await processUrlJob(id, 'test', runner, () => true, () => {})).toMatchObject({ total: 200, resolved: 200, error: null })
    expect(urlItems(id)).toHaveLength(200)
    expect(runner).toHaveBeenCalledTimes(2) // one enumeration + one acquisition
    expect(indexMusicFiles).toHaveBeenCalledTimes(1)
    db.prepare('DELETE FROM music_spotify_download_queue WHERE id=?').run(id)
    const next = addUrlJob(input)
    expect(await processUrlJob(next, 'test', runner, () => true, () => {})).toMatchObject({ total: 200, resolved: 200 })
    expect(runner).toHaveBeenCalledTimes(3) // only enumeration on the new job
    expect(indexMusicFiles).toHaveBeenCalledTimes(1)
  })

  it('bounds independent URL workers at four while cancellation prevents later items', async () => {
    const id = addUrlJob(input)
    let running = true
    let active = 0, peak = 0
    const releases: (() => void)[] = []
    const runner = vi.fn(async (args: string[], line: (value: string) => void) => {
      if (args.includes('--dump-single-json')) {
        line(JSON.stringify({ playlist_count: 12, entries: Array.from({ length: 12 }, (_, n) => ({ id: `abcdefgh${String(n).padStart(3, '0')}`, title: `Song ${n}` })) }))
        return 0
      }
      active++; peak = Math.max(peak, active)
      await new Promise<void>((resolve) => releases.push(resolve))
      active--
      return 1
    })
    const pending = processUrlJob(id, 'test', runner, () => running, () => {})
    await vi.waitFor(() => expect(releases).toHaveLength(4))
    running = false
    releases.forEach((release) => release())
    await pending
    expect(peak).toBe(4)
    expect(runner).toHaveBeenCalledTimes(5) // enumeration plus only the active worker window
  })

})
