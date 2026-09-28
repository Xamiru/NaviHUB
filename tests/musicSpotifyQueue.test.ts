import { beforeEach, describe, expect, it, vi } from 'vitest'
import { EventEmitter } from 'node:events'
import { writeFileSync, readFileSync } from 'node:fs'
import { PassThrough } from 'node:stream'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
let spawned: ReturnType<typeof fakeProcess>[] = []

function fakeProcess() {
  return Object.assign(new EventEmitter(), {
    stdout: new PassThrough(),
    stderr: new PassThrough(),
    exitCode: null as number | null,
    kill: vi.fn(() => true)
  })
}

function recordFakeProcess() {
  const proc = fakeProcess()
  spawned.push(proc)
  return proc
}

vi.mock('electron', () => ({ app: { getPath: () => '/tmp/navihub-test' } }))
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('../src/main/repos/settingsRepo', () => ({ get: (key: string) => key === 'music.dir' ? '/tmp/music' : null }))
vi.mock('../src/main/files', () => ({
  downloadImages: vi.fn(),
  musicRootDir: () => '/tmp/music'
}))
vi.mock('../src/main/http', () => ({
  MAX_API_RESPONSE_BYTES: 32 * 1024 * 1024,
  fetchWithRetry: vi.fn()
}))
vi.mock('../src/main/music', () => ({ startScan: vi.fn(async () => undefined), indexMusicFiles: vi.fn(async () => undefined) }))
vi.mock('../src/main/spotifyWeb', () => ({
  searchAlbums: vi.fn(async () => []),
  searchTracks: vi.fn(async () => []),
  readAlbum: vi.fn(async () => []),
  readPlaylist: vi.fn(),
  saveSongs: vi.fn(async () => [])
}))
vi.mock('../src/main/youtubeMusic', () => ({ searchYouTubeMusic: vi.fn(async () => []) }))
vi.mock('node:child_process', async (importOriginal) => {
  const actual = await importOriginal<typeof import('node:child_process')>()
  return {
    ...actual,
    spawn: vi.fn(() => recordFakeProcess()),
    execFile: vi.fn((bin: string, _args: string[], _options: unknown, callback: Function) => {
      callback(null, _args.includes('--help') ? '--preload --yt-dlp-args --save-file' : bin === 'ffmpeg' ? 'ffmpeg version 7' : bin === 'deno' ? 'deno 2.0.0' : 'spotDL 4.5.2', '')
    })
  }
})

import * as spotifyRepo from '../src/main/repos/musicSpotifyRepo'
import * as spotify from '../src/main/musicSpotify'
import * as toolSetup from '../src/main/musicToolSetup'
import { validateSpotdlPayload } from '../src/main/musicSpotifyCore'
import * as tasks from '../src/main/tasks'
import { musicMaintenanceOwner } from '../src/main/musicMaintenance'
import { fetchWithRetry } from '../src/main/http'
import { spawn, execFile } from 'node:child_process'
import * as spotifyWeb from '../src/main/spotifyWeb'
import { searchYouTubeMusic } from '../src/main/youtubeMusic'
import { musicAccessKey } from '../src/main/musicTools'

beforeEach(() => {
  db = createTestDb()
  spawned = []
  vi.mocked(fetchWithRetry).mockReset()
  vi.mocked(spawn).mockClear()
  vi.mocked(spawn).mockImplementation(() => recordFakeProcess() as never)
  vi.mocked(spotifyWeb.searchTracks).mockReset().mockResolvedValue([])
  vi.mocked(spotifyWeb.readAlbum).mockReset().mockResolvedValue([])
  vi.mocked(spotifyWeb.searchAlbums).mockReset().mockResolvedValue([])
  vi.mocked(spotifyWeb.saveSongs).mockReset().mockResolvedValue([])
  vi.mocked(searchYouTubeMusic).mockReset().mockResolvedValue([])
  spotify.killActive()
})

/** yt-dlp stand-in: `--dump-json` inspection answers from `inspect`; downloads stay open for the test to settle. */
function ytdlpProcess(inspect: (url: string) => Record<string, unknown>) {
  return (_command: unknown, args: readonly string[]) => {
    const proc = recordFakeProcess()
    const argv = args as string[]
    if (argv.includes('--dump-json')) {
      queueMicrotask(() => {
        for (const url of argv.slice(argv.indexOf('--') + 1)) {
          proc.stdout.write(JSON.stringify({ id: new URL(url).searchParams.get('v'), webpage_url: url, formats: [{ vcodec: 'none', acodec: 'opus', ext: 'webm', abr: 130 }], ...inspect(url) }) + '\n')
        }
        proc.exitCode = 0
        proc.emit('close', 0)
      })
    }
    return proc as never
  }
}

const ytm = (n: number) => ({
  url: `https://www.youtube.com/watch?v=abcdefghij${n}`, videoId: `abcdefghij${n}`,
  title: n ? `Song ${n}` : 'Missing song', artists: ['Artist'], album: 'Missing album', duration: 200 + n
})
const isDownload = (call: unknown[]) => (call[1] as string[]).includes('--load-info-json')

it('requires yt-dlp and ffmpeg for downloads but no Spotify tool', async () => {
  const answer = (failing: string | null) => ((bin: string, _args: string[], _options: unknown, callback: Function) => {
    if (bin === failing) callback(new Error('ENOENT'), '', '')
    else callback(null, bin === 'ffmpeg' ? 'ffmpeg version 7' : '2026.08.19', '')
  }) as typeof execFile
  try {
    vi.mocked(execFile).mockImplementation(answer(null))
    expect(await toolSetup.detectMusicTools()).toMatchObject({ ok: true, ytdlpVersion: '2026.08.19', ffmpeg: true, error: null })
    vi.mocked(execFile).mockImplementation(answer('yt-dlp'))
    expect((await toolSetup.detectMusicTools()).error).toContain('Install yt-dlp')
    vi.mocked(execFile).mockImplementation(answer('ffmpeg'))
    expect((await toolSetup.detectMusicTools()).error).toContain('ffmpeg was not found')
  } finally {
    vi.mocked(execFile).mockImplementation(answer(null))
  }
})

async function seedQueuedRelease(): Promise<{ jobId: number; artistId: number }> {
  db.prepare(`INSERT INTO music_artist (id, name, dir_path) VALUES (1, 'Artist', 'Artist')`).run()
  db.prepare(
    `INSERT INTO music_album (id, artist_id, title, dir_path) VALUES (1, 1, 'Local', 'Artist/Local')`
  ).run()
  db.prepare(
    `INSERT INTO music_track (album_id, artist_id, file_path, title, duration)
     VALUES (1, 1, 'Artist/Local/local.mp3', 'Local song', 180)`
  ).run()
  const snapshotId = spotifyRepo.saveEntitySnapshot({
    kind: 'artist',
    entityId: 1,
    provider: 'itunes',
    providerEntityId: 'itunes-artist',
    sourceName: 'Artist',
    releases: [{
      providerReleaseId: 'itunes-release',
      title: 'Missing album',
      albumArtist: 'Artist',
      year: 2026,
      albumType: 'album',
      tracks: [{
        providerTrackId: 'itunes-track',
        title: 'Missing song',
        artists: ['Artist'],
        primaryArtist: 'Artist',
        albumTitle: 'Missing album',
        duration: 200,
        discNo: 1,
        trackNo: 1
      }]
    }]
  })
  const releaseId = spotifyRepo.getEntitySnapshotById(snapshotId)!.releases[0].id
  return {
    jobId: (await spotify.addEntityDownloadQueue({ snapshotId, releaseIds: [releaseId] })).jobId!,
    artistId: 1
  }
}

describe('persistent Spotify download queue process', () => {
  it('keeps a YouTube Music lookup failure on the track instead of claiming no recording was found', async () => {
    const payload = validateSpotdlPayload([{ song_id: 'song', name: 'Song', artists: ['Artist'], album_name: 'Album', duration: 200 }])
    const playlist = spotifyRepo.createSpotifyPlaylist({ spotifyId: 'playlist', sourceUrl: 'https://open.spotify.com/playlist/playlist', title: 'Playlist', songs: payload.songs.map((song) => ({ ...song, coverPath: null })) })
    const { jobId } = spotify.addPlaylistDownloadQueue({ playlistId: playlist.playlistId })
    vi.mocked(searchYouTubeMusic).mockRejectedValue(new Error('YouTube Music search failed (HTTP 503)'))
    spotify.startDownloadQueue({ jobId: jobId! })
    await vi.waitFor(() => expect(spotify.getStatus()?.status).toBe('error'))
    const row = db.prepare('SELECT download_error FROM music_spotify_playlist_item').get() as { download_error: string }
    expect(row.download_error).toContain('Lookup (YouTube Music search)')
    expect(row.download_error).toContain('HTTP 503')
    expect(row.download_error).not.toContain('No source found')
    expect(spawned).toHaveLength(0)
  })

  it("runs only the song whose Download was pressed, leaving the playlist's other queued songs queued", async () => {
    const payload = validateSpotdlPayload([
      { song_id: 'first', name: 'First', artists: ['Artist'], album_name: 'Album', duration: 200 },
      { song_id: 'second', name: 'Second', artists: ['Artist'], album_name: 'Album', duration: 210 }
    ])
    const playlist = spotifyRepo.createSpotifyPlaylist({ spotifyId: 'playlist', sourceUrl: 'https://open.spotify.com/playlist/playlist', title: 'Playlist', songs: payload.songs.map((song) => ({ ...song, coverPath: null })) })
    const [first, second] = (db.prepare('SELECT id FROM music_spotify_playlist_item ORDER BY position')
      .all() as { id: number }[]).map((row) => row.id)
    spotify.addPlaylistDownloadQueue({ playlistId: playlist.playlistId })
    const { jobId } = spotify.addPlaylistDownloadQueue({ playlistId: playlist.playlistId, itemIds: [second] })
    vi.mocked(searchYouTubeMusic).mockRejectedValue(new Error('YouTube Music search failed (HTTP 503)'))
    spotify.startDownloadQueue({ jobId: jobId!, itemIds: [second], prioritize: true })
    await vi.waitFor(() => expect(spotify.getStatus()?.status).toBe('error'))
    expect(spotify.getStatus()?.queueItemIds).toEqual([second])
    const error = (id: number) => (db.prepare('SELECT download_error FROM music_spotify_playlist_item WHERE id=?')
      .get(id) as { download_error: string | null }).download_error
    expect(error(second)).toContain('HTTP 503')
    expect(error(first)).toBeNull()
    expect(spotifyRepo.getDownloadQueueCard(jobId!)?.state).toBe('queued')
  })

  it('downloads a strong YouTube Music match although yt-dlp reports only the translated title', async () => {
    const payload = validateSpotdlPayload([{ song_id: 'gurenge', name: '紅蓮華', artists: ['LiSA'], album_name: 'LEO-NiNE', duration: 238 }])
    const playlist = spotifyRepo.createSpotifyPlaylist({ spotifyId: 'jp', sourceUrl: 'https://open.spotify.com/playlist/jp', title: 'JP', songs: payload.songs.map((song) => ({ ...song, coverPath: null })) })
    const catalogue = { ...ytm(0), artists: ['LiSA'], album: 'LEO-NiNE', duration: 238 }
    vi.mocked(searchYouTubeMusic).mockImplementation(async (_query, _kind, locale) =>
      [{ ...catalogue, title: locale === 'ja' ? '紅蓮華' : '紅蓮華 - Gurenge' }])
    const inspect = (duration: number) => ytdlpProcess(() => ({ title: 'Gurenge', artist: 'LiSA', uploader: 'LiSA Official YouTube', duration }))
    vi.mocked(spawn).mockImplementation(inspect(238))
    const { jobId } = spotify.addPlaylistDownloadQueue({ playlistId: playlist.playlistId })
    spotify.startDownloadQueue({ jobId: jobId! })
    await vi.waitFor(() => expect(vi.mocked(spawn).mock.calls.some(isDownload)).toBe(true))
    const download = spawned[vi.mocked(spawn).mock.calls.findIndex(isDownload)]
    download.exitCode = 1
    download.emit('close', 1)
    await vi.waitFor(() => expect(spotify.getStatus()?.status).toBe('error'))

    // A retry reuses the validated video without searching and still downloads it.
    vi.mocked(searchYouTubeMusic).mockClear()
    vi.mocked(spawn).mockClear()
    spawned = []
    spotify.startDownloadQueue({ jobId: jobId! })
    await vi.waitFor(() => expect(vi.mocked(spawn).mock.calls.some(isDownload)).toBe(true))
    expect(searchYouTubeMusic).not.toHaveBeenCalled()
    const retry = spawned[vi.mocked(spawn).mock.calls.findIndex(isDownload)]
    retry.exitCode = 1
    retry.emit('close', 1)
    await vi.waitFor(() => expect(spotify.getStatus()?.status).toBe('error'))

    // yt-dlp must still confirm the length: a different cut stays in review.
    vi.mocked(spawn).mockClear()
    vi.mocked(spawn).mockImplementation(inspect(290))
    db.prepare('DELETE FROM music_source_evidence').run()
    spotify.startDownloadQueue({ jobId: jobId! })
    await vi.waitFor(() => expect(spotify.getStatus()?.status).toBe('error'))
    expect(vi.mocked(spawn).mock.calls.some(isDownload)).toBe(false)
    expect((db.prepare('SELECT download_error FROM music_spotify_playlist_item').get() as { download_error: string }).download_error)
      .toMatch(/^Needs review:/)
  })

  it('keeps a near miss for review when a later catalogue language fails', async () => {
    const payload = validateSpotdlPayload([{ song_id: 'gurenge', name: '紅蓮華', artists: ['LiSA'], album_name: 'LEO-NiNE', duration: 238 }])
    const playlist = spotifyRepo.createSpotifyPlaylist({ spotifyId: 'jp', sourceUrl: 'https://open.spotify.com/playlist/jp', title: 'JP', songs: payload.songs.map((song) => ({ ...song, coverPath: null })) })
    vi.mocked(searchYouTubeMusic).mockImplementation(async (_query, _kind, locale) => {
      if (locale !== 'en') throw new Error('YouTube Music returned a search page NaviHUB cannot read')
      return [{ ...ytm(0), title: '紅蓮華', artists: ['LiSA'], album: 'LEO-NiNE', duration: 290 }]
    })
    vi.mocked(spawn).mockImplementation(ytdlpProcess(() => ({ title: 'Gurenge', artist: 'LiSA', uploader: 'LiSA', duration: 290 })))
    const { jobId } = spotify.addPlaylistDownloadQueue({ playlistId: playlist.playlistId })
    spotify.startDownloadQueue({ jobId: jobId! })
    await vi.waitFor(() => expect(spotify.getStatus()?.status).toBe('error'))
    expect(vi.mocked(searchYouTubeMusic).mock.calls.some(([, , locale]) => locale === 'ja')).toBe(true)
    expect((db.prepare('SELECT download_error FROM music_spotify_playlist_item').get() as { download_error: string }).download_error)
      .toMatch(/^Needs review:/)
  })

  it('searches again instead of reusing a pick that failed review', async () => {
    const payload = validateSpotdlPayload([{ song_id: 'song', name: 'Song', artists: ['Artist'], album_name: 'Album', duration: 200 }])
    const playlist = spotifyRepo.createSpotifyPlaylist({ spotifyId: 'playlist', sourceUrl: 'https://open.spotify.com/playlist/playlist', title: 'Playlist', songs: payload.songs.map((song) => ({ ...song, coverPath: null })) })
    const itemId = (db.prepare('SELECT id FROM music_spotify_playlist_item').get() as { id: number }).id
    spotifyRepo.saveSourceEvidence('playlistItem', itemId, { url: 'https://www.youtube.com/watch?v=zzzzzzzzzzz', title: 'Other song', artist: 'Artist', channel: 'Artist', duration: 200, format: 'opus', observedAt: Date.now(), accessKey: musicAccessKey() }, false, false)
    vi.mocked(searchYouTubeMusic).mockRejectedValue(new Error('YouTube Music search failed (HTTP 503)'))
    const { jobId } = spotify.addPlaylistDownloadQueue({ playlistId: playlist.playlistId })
    spotify.startDownloadQueue({ jobId: jobId! })
    await vi.waitFor(() => expect(spotify.getStatus()?.status).toBe('error'))
    expect(searchYouTubeMusic).toHaveBeenCalled()
    expect(spawned).toHaveLength(0)
  })

  it('builds a first artist catalogue without requiring a representative local track', async () => {
    db.prepare(`INSERT INTO music_artist (id, name, dir_path) VALUES (1, 'Sabrina Carpenter', 'Sabrina Carpenter')`).run()
    vi.mocked(fetchWithRetry).mockImplementation(async (url) => {
      const rows = String(url).includes('id=123')
        ? [
            { wrapperType: 'artist', artistId: 123, artistName: 'Sabrina Carpenter' },
            {
              wrapperType: 'collection', collectionId: 456, collectionName: "Short n' Sweet",
              artistName: 'Sabrina Carpenter', releaseDate: '2024-08-23T00:00:00Z', trackCount: 1
            }
          ]
        : [
            {
              wrapperType: 'collection', collectionId: 456, collectionName: "Short n' Sweet",
              artistName: 'Sabrina Carpenter', releaseDate: '2024-08-23T00:00:00Z', trackCount: 1
            },
            {
              wrapperType: 'track', kind: 'song', collectionId: 456, trackId: 789,
              trackName: 'Espresso', artistName: 'Sabrina Carpenter', trackTimeMillis: 175_000,
              discNumber: 1, trackNumber: 1
            }
          ]
      return new Response(JSON.stringify({ results: rows }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      })
    })

    const inspection = await spotify.inspectEntity({
      kind: 'artist',
      entityId: 1,
      candidateKey: 'itunes:artist:123'
    })

    expect(inspection).toMatchObject({
      sourceName: 'Sabrina Carpenter',
      releases: [{ title: "Short n' Sweet", trackCount: 1, missingCount: 1 }]
    })
    expect(spawned).toHaveLength(0)
  })

  it('refuses to start the queue while a catalogue inspection is rewriting snapshots', async () => {
    const { jobId } = await seedQueuedRelease()
    let answer: (response: Response) => void = () => undefined
    vi.mocked(fetchWithRetry).mockImplementation(() => new Promise<Response>((resolve) => { answer = resolve }))
    const inspection = spotify.inspectEntity({ kind: 'artist', entityId: 1, refresh: true, candidateKey: 'itunes:artist:123' })
      .catch(() => null)
    await vi.waitFor(() => expect(fetchWithRetry).toHaveBeenCalled())

    expect(() => spotify.startDownloadQueue({ jobId })).toThrow(/busy with artist inspection/)
    answer(new Response(JSON.stringify({ results: [] }), { status: 200, headers: { 'content-type': 'application/json' } }))
    await inspection
    expect(spawned).toHaveLength(0)
  })

  it('accepts an explicit artist link when the local artist has no tracks', async () => {
    db.prepare(`INSERT INTO music_artist (id, name, dir_path) VALUES (1, 'Sabrina Carpenter', 'Sabrina Carpenter')`).run()
    vi.mocked(spotifyWeb.saveSongs).mockResolvedValue([{
      song_id: '2qSkIjg1o9h3YT9RAgYN75',
      name: 'Espresso',
      artists: ['Sabrina Carpenter'],
      album_artist: 'Sabrina Carpenter',
      artist_ids: ['74KM79TiuVKeVCqs8QtB0B'],
      album_name: "Short n' Sweet",
      album_id: '3iPSVi54hsacKKl1xIR2eH',
      album_type: 'album',
      duration: 175,
      url: 'https://open.spotify.com/track/2qSkIjg1o9h3YT9RAgYN75'
    }])

    const inspection = await spotify.inspectEntity({
      kind: 'artist',
      entityId: 1,
      url: 'https://open.spotify.com/artist/74KM79TiuVKeVCqs8QtB0B'
    })

    expect(inspection).toMatchObject({
      sourceId: '74KM79TiuVKeVCqs8QtB0B',
      sourceName: 'Sabrina Carpenter',
      matchesCurrentEntity: true,
      releases: [{ title: "Short n' Sweet", missingCount: 1 }]
    })
    expect(spotifyWeb.saveSongs).toHaveBeenCalledWith(['https://open.spotify.com/artist/74KM79TiuVKeVCqs8QtB0B'], expect.any(Function))
    expect(spawned).toHaveLength(0)
  })

  it('rechecks local matches and completes without launching a downloader', async () => {
    const { jobId } = await seedQueuedRelease()
    db.prepare(
      `INSERT INTO music_album (id, artist_id, title, dir_path) VALUES (2, 1, 'Missing album', 'Artist/Missing album')`
    ).run()
    db.prepare(
      `INSERT INTO music_track (album_id, artist_id, file_path, title, duration)
       VALUES (2, 1, 'Artist/Missing album/song.mp3', 'Missing song', 200)`
    ).run()
    spotifyRepo.resolveAllSpotifyItems()

    expect(spotify.startDownloadQueue({ jobId }).id).toMatch(/^spotify-queue-/)
    await vi.waitFor(() => expect(spotify.getStatus()?.status).toBe('done'))
    expect(spawned).toHaveLength(0)
    expect(spotifyRepo.getDownloadQueueCard(jobId)?.state).toBe('completed')
    expect(musicMaintenanceOwner()).toBeNull()
  })

  it('persists a broader retry and exact audio source on one queued track', async () => {
    const { jobId } = await seedQueuedRelease()
    const track = db.prepare(
      `SELECT t.id FROM music_spotify_entity_track t
       JOIN music_spotify_download_queue_selection qs ON qs.release_id=t.release_id
       WHERE qs.queue_id=? AND t.matched_track_id IS NULL`
    ).get(jobId) as { id: number }
    spotifyRepo.setTrackDownloadOptions({
      sourceKind: 'entityTrack',
      trackId: track.id,
      allowUnverified: true,
      audioSourceUrl: 'https://youtu.be/exact-source'
    })
    const queuedTrack = spotifyRepo.getDownloadQueueCard(jobId)!.selections[0].tracks[0]
    expect(queuedTrack).toMatchObject({
      id: track.id,
      sourceKind: 'entityTrack',
      missing: true,
      allowUnverified: true,
      audioSourceUrl: 'https://youtu.be/exact-source',
      error: null
    })
  })

  it('discovers the album from a track, downloads natively tagged audio, and Pause kills the transfer', async () => {
    const { jobId } = await seedQueuedRelease()
    const payload = [{
      song_id: 'spotify-track',
      name: 'Missing song',
      artists: ['Artist'],
      album_artist: 'Artist',
      artist_ids: ['artist-id'],
      album_name: 'Missing album',
      album_id: 'spotify-album',
      album_type: 'album',
      duration: 200,
      disc_number: 1,
      track_number: 1,
      url: 'https://open.spotify.com/track/spotify-track'
    }]
    vi.mocked(spotifyWeb.searchTracks).mockResolvedValue(payload)
    vi.mocked(spotifyWeb.readAlbum).mockResolvedValue(payload)
    vi.mocked(searchYouTubeMusic).mockResolvedValue([ytm(0)])
    vi.mocked(spawn).mockImplementation(ytdlpProcess(() => ({ title: 'Missing song', artist: 'Artist', uploader: 'Artist', duration: 200 })))

    const run = spotify.startDownloadQueue({ jobId })
    await vi.waitFor(() => expect(vi.mocked(spawn).mock.calls.some(isDownload)).toBe(true))
    expect(spotifyWeb.searchTracks).toHaveBeenCalledWith(['Artist - Missing song'])
    expect(spotifyWeb.readAlbum).toHaveBeenCalledWith('spotify-album')
    const downloadIndex = vi.mocked(spawn).mock.calls.findIndex(isDownload)
    const downloadArgs = vi.mocked(spawn).mock.calls[downloadIndex][1] as string[]
    expect(downloadArgs.slice(downloadArgs.indexOf('--format'), downloadArgs.indexOf('--format') + 2)).toEqual(['--format', 'bestaudio[acodec=opus]'])
    expect(downloadArgs).toContain('--embed-metadata')
    expect(downloadArgs[downloadArgs.indexOf('--output') + 1]).toMatch(/Artist[\\/]Missing album[\\/]1-01 - Missing song \[navirun-[\w-]+\] \[navihub-spotify-track\]\.%\(ext\)s$/)

    const status = spotify.getStatus()!
    tasks.pause(status.taskId!)
    expect(spawned[downloadIndex].kill).toHaveBeenNthCalledWith(1, 'SIGCONT')
    expect(spawned[downloadIndex].kill).toHaveBeenNthCalledWith(2, 'SIGTERM')
    spawned[downloadIndex].exitCode = 1
    spawned[downloadIndex].emit('close', 1)
    await vi.waitFor(() => expect(spotify.getStatus()?.status).toBe('paused'))
    expect(spotifyRepo.getDownloadQueueCard(jobId)?.state).toBe('paused')
    expect(musicMaintenanceOwner()).toBeNull()
    // The paused run still downloads from this catalogue, so a refresh must wait.
    await expect(spotify.inspectEntity({ kind: 'artist', entityId: 1, refresh: true, candidateKey: 'itunes:artist:1' }))
      .rejects.toThrow(/queue is paused/)

    spotify.cancelDownload(run.id!)
    await vi.waitFor(() => expect(spotify.getStatus()?.status).toBe('cancelled'))
    expect(spotifyRepo.getDownloadQueueCard(jobId)?.state).toBe('queued')
    expect(musicMaintenanceOwner()).toBeNull()
  })

  it('repairs a truncated resolved album and fills missing metadata before download', async () => {
    const { jobId } = await seedQueuedRelease()
    const releaseId = spotifyRepo.getDownloadQueueCard(jobId)!.selections[0].sourceId
    const indexed = {
      providerReleaseId: '456',
      title: 'Missing album',
      albumArtist: 'Artist',
      year: 2026,
      albumType: 'album' as const,
      tracks: [1, 2, 3].map((trackNo) => ({
        providerTrackId: `itunes-${trackNo}`,
        title: `Song ${trackNo}`,
        artists: ['Artist'],
        primaryArtist: 'Artist',
        albumTitle: 'Missing album',
        duration: 200 + trackNo,
        discNo: 1,
        trackNo
      }))
    }
    db.prepare(
      'UPDATE music_spotify_entity_release SET provider_release_id=? WHERE id=?'
    ).run('456', releaseId)
    spotifyRepo.restoreIndexedEntityRelease(releaseId, indexed)
    const payload = (trackNo: number) => ({
      song_id: `spotify-${trackNo}`,
      name: `Song ${trackNo}`,
      artists: ['Artist'],
      album_artist: 'Artist',
      artist_ids: ['artist-id'],
      album_name: 'Missing album',
      album_id: 'spotify-album',
      album_type: 'album',
      duration: 200 + trackNo,
      disc_number: 1,
      track_number: trackNo,
      url: `https://open.spotify.com/track/spotify-${trackNo}`
    })
    spotifyRepo.resolveEntityRelease(
      releaseId,
      [1, 3].map((trackNo) => validateSpotdlPayload([payload(trackNo)]).songs[0])
    )
    vi.mocked(fetchWithRetry).mockResolvedValue(new Response(JSON.stringify({
      results: [
        {
          wrapperType: 'collection', collectionId: 456, collectionName: 'Missing album',
          artistName: 'Artist', releaseDate: '2026-01-01T00:00:00Z', trackCount: 3
        },
        ...[1, 2, 3].map((trackNo) => ({
          wrapperType: 'track', kind: 'song', collectionId: 456, trackId: 100 + trackNo,
          trackName: `Song ${trackNo}`, artistName: 'Artist', trackTimeMillis: (200 + trackNo) * 1000,
          discNumber: 1, trackNumber: trackNo
        }))
      ]
    }), { status: 200, headers: { 'content-type': 'application/json' } }))
    vi.mocked(spotifyWeb.readAlbum).mockResolvedValue([payload(1), payload(3)])
    vi.mocked(spotifyWeb.searchTracks).mockImplementation(async (queries) =>
      queries.includes('Artist - Song 2') ? [payload(2)] : [payload(1), payload(3)])
    vi.mocked(searchYouTubeMusic).mockImplementation(async (query) => [ytm(Number(query.match(/\d$/)?.[0] ?? 0))])
    vi.mocked(spawn).mockImplementation(ytdlpProcess((url) => {
      const n = Number(url.at(-1))
      return { title: `Song ${n}`, artist: 'Artist', uploader: 'Artist', duration: 200 + n }
    }))

    const run = spotify.startDownloadQueue({ jobId })
    await vi.waitFor(() => expect(vi.mocked(spawn).mock.calls.some(isDownload)).toBe(true))
    const repaired = spotifyRepo.getEntitySnapshot('artist', 1)!.releases[0]
    expect(repaired.metadataState).toBe('resolved')
    expect(repaired.tracks.map((track) => track.title)).toEqual(['Song 1', 'Song 2', 'Song 3'])
    const downloadIndex = vi.mocked(spawn).mock.calls.findIndex(isDownload)

    await vi.waitFor(() => expect(vi.mocked(spawn).mock.calls.filter(isDownload)).toHaveLength(3))
    tasks.pause(spotify.getStatus()!.taskId!)
    vi.mocked(spawn).mock.calls.forEach((call, index) => {
      if (!isDownload(call)) return
      expect(spawned[index].kill).toHaveBeenCalledWith('SIGTERM')
      spawned[index].exitCode = 1
      spawned[index].emit('close', 1)
    })
    expect(downloadIndex).toBeGreaterThanOrEqual(0)
    await vi.waitFor(() => expect(spotify.getStatus()?.status).toBe('paused'))
    spotify.cancelDownload(run.id!)
    await vi.waitFor(() => expect(spotify.getStatus()?.status).toBe('cancelled'))
  })

  it('reads a release from Spotify when Apple lists no tracks, without letting an unreadable release block the rest', async () => {
    db.prepare(`INSERT INTO music_artist (id, name, dir_path) VALUES (1, 'Artist', 'Artist')`).run()
    const snapshotId = spotifyRepo.saveEntitySnapshot({
      kind: 'artist', entityId: 1, provider: 'itunes', providerEntityId: 'itunes-artist', sourceName: 'Artist',
      releases: ['Single - Single', 'Gone'].map((title, index) => ({
        providerReleaseId: String(100 + index), title, albumArtist: 'Artist', year: 2019,
        albumType: 'single' as const, expectedTracks: 1, tracksLoaded: false, tracks: []
      }))
    })
    // Apple advertises one track but lists none (not sold in this country), and the second lookup fails.
    vi.mocked(fetchWithRetry).mockImplementation(async (url) => String(url).includes('id=100')
      ? new Response(JSON.stringify({ results: [{ wrapperType: 'collection', collectionId: 100, collectionName: 'Single - Single', artistName: 'Artist', trackCount: 1 }] }), { status: 200 })
      : new Response('{}', { status: 503 }))
    vi.mocked(spotifyWeb.searchAlbums).mockImplementation(async (query) => query.includes('Single')
      ? [{ id: 'other', name: 'Different', artists: ['Artist'], type: 'single' }, { id: 'spotify-single', name: 'Single', artists: ['Artist'], type: 'single' }]
      : [])
    vi.mocked(spotifyWeb.readAlbum).mockResolvedValue([{ song_id: 'track1', name: 'Single', artists: ['Artist'], album_artist: 'Artist',
      album_name: 'Single', album_id: 'spotify-single', album_type: 'single', duration: 200, disc_number: 1, track_number: 1 }])
    const [first, second] = spotifyRepo.getEntitySnapshotById(snapshotId)!.releases

    const result = await spotify.addEntityDownloadQueue({ snapshotId, releaseIds: [first.id, second.id] })

    expect(result).toMatchObject({ addedSelections: 1, missingCount: 1, unreadable: ['Gone'] })
    expect(spotifyWeb.readAlbum).toHaveBeenCalledWith('spotify-single')
    const loaded = spotifyRepo.getEntitySnapshotById(snapshotId)!.releases.find((release) => release.id === first.id)!
    expect(loaded).toMatchObject({ tracksLoaded: true, spotifyAlbumId: 'spotify-single' })
    expect(loaded.tracks.map((track) => track.title)).toEqual(['Single'])
  })

  it.each([true, false])('accepts another song from a playlist that is downloading and runs it in the same session (start now: %s)', async (startNow) => {
    const payload = validateSpotdlPayload(['A', 'B'].map((name) => ({
      song_id: `song${name}`, name: `Song ${name}`, artists: ['Artist'], album_name: 'Album', duration: 200
    })))
    const playlist = spotifyRepo.createSpotifyPlaylist({ spotifyId: 'running', sourceUrl: 'https://open.spotify.com/playlist/running', title: 'Running', songs: payload.songs.map((song) => ({ ...song, coverPath: null })) })
    const [first, second] = db.prepare('SELECT id FROM music_spotify_playlist_item WHERE playlist_id=? ORDER BY id').all(playlist.playlistId) as { id: number }[]
    vi.mocked(searchYouTubeMusic).mockImplementation(async (query) => [{ ...ytm(0), title: query.endsWith('A') ? 'Song A' : 'Song B',
      url: `https://www.youtube.com/watch?v=abcdefghij${query.endsWith('A') ? 1 : 2}`, videoId: `abcdefghij${query.endsWith('A') ? 1 : 2}`, duration: 200 }])
    vi.mocked(spawn).mockImplementation(ytdlpProcess((url) => ({ title: url.endsWith('1') ? 'Song A' : 'Song B', artist: 'Artist', uploader: 'Artist', duration: 200 })))
    const { jobId } = spotify.addPlaylistDownloadQueue({ playlistId: playlist.playlistId, itemIds: [first.id] })
    spotify.startDownloadQueue({ jobId: jobId! })
    await vi.waitFor(() => expect(vi.mocked(spawn).mock.calls.filter(isDownload)).toHaveLength(1))

    // The running card takes the second song instead of refusing it.
    expect(spotify.addPlaylistDownloadQueue({ playlistId: playlist.playlistId, itemIds: [second.id] }).jobId).toBe(jobId)
    if (startNow) expect(spotify.startDownloadQueue({ jobId: jobId!, prioritize: true }).id).toBe(spotify.getStatus()!.id)
    const firstDownload = vi.mocked(spawn).mock.calls.findIndex(isDownload)
    spawned[firstDownload].exitCode = 0
    spawned[firstDownload].emit('close', 0)

    await vi.waitFor(() => expect(vi.mocked(spawn).mock.calls.filter(isDownload).some((call) =>
      (call[1] as string[]).some((arg) => arg.includes('[navihub-songB]')))).toBe(true))
    tasks.cancel(spotify.getStatus()!.taskId!)
    vi.mocked(spawn).mock.calls.forEach((call, index) => {
      if (spawned[index].exitCode == null) { spawned[index].exitCode = 1; spawned[index].emit('close', 1) }
    })
    await vi.waitFor(() => expect(musicMaintenanceOwner()).toBeNull())
  })

  it('pins a preview-approved recording and reports an embedded downloader failure without losing approval', async () => {
    const { jobId } = await seedQueuedRelease()
    const releaseId = spotifyRepo.getDownloadQueueCard(jobId)!.selections[0].sourceId
    const raw = { song_id: 'manualsong', name: 'Missing song', artists: ['Artist'], album_artist: 'Artist', album_name: 'Missing album', album_id: 'spotifyalbum', duration: 200, url: 'https://open.spotify.com/track/manualsong' }
    spotifyRepo.resolveEntityRelease(releaseId, validateSpotdlPayload([raw]).songs)
    const track = spotifyRepo.getEntitySnapshot('artist', 1)!.releases[0].tracks[0]
    const url = 'https://www.youtube.com/watch?v=abcdefghijk'
    spotifyRepo.setTrackDownloadOptions({ sourceKind: 'entityTrack', trackId: track.id, audioSourceUrl: url })
    spotifyRepo.saveSourceEvidence('entityTrack', track.id, { url, title: 'My chosen recording', artist: 'Artist', channel: 'Artist', duration: 200, format: 'opus', observedAt: Date.now(), accessKey: musicAccessKey() }, true)
    vi.mocked(spawn).mockImplementation((_command, args) => {
      const argv = args as string[]
      if (argv.includes('--dump-json')) {
        return ytdlpProcess(() => ({ title: 'My chosen recording', artist: 'Artist', uploader: 'Artist', duration: 200 }))(_command, argv)
      }
      const proc = recordFakeProcess()
      queueMicrotask(() => { proc.stderr.write('ERROR: Requested format is not available\n'); proc.exitCode = 1; proc.emit('close', 1) })
      return proc as never
    })
    spotify.startDownloadQueue({ jobId })
    await vi.waitFor(() => expect(spotify.getStatus()?.status).toBe('error'))
    const saved = spotifyRepo.getEntitySnapshot('artist', 1)!.releases[0].tracks[0]
    expect(saved.audioSourceUrl).toBe(url)
    expect(saved.downloadError).toContain('Transfer / processing (yt-dlp)')
    expect(saved.downloadError).toContain('requested audio format is unavailable')
    expect(spotifyRepo.sourceEvidence('entityTrack', track.id)?.approved).toBe(true)
    expect(searchYouTubeMusic).not.toHaveBeenCalled()
    expect(vi.mocked(spawn).mock.calls.filter(isDownload)).toHaveLength(1) // no second search or multiplied retries
  })

  it('fails every song sharing a source when that one download fails', async () => {
    const url = 'https://www.youtube.com/watch?v=abcdefghijk'
    const song = (n: number) => ({
      spotifyTrackId: `shared-${n}`, title: `Shared song ${n}`, artists: ['Artist'], primaryArtist: 'Artist',
      albumArtist: 'Artist', albumTitle: 'Shared album', duration: 200, coverUrl: null, coverPath: null,
      spotifyUrl: `https://open.spotify.com/track/shared-${n}`, discNo: 1, trackNo: n, year: 2026,
      rawJson: JSON.stringify({ song_id: `shared-${n}`, name: `Shared song ${n}`, artists: ['Artist'], album_name: 'Shared album', duration: 200 }),
      spotifyAlbumId: 'shared-album', spotifyArtistId: 'artist-id', spotifyArtistIds: ['artist-id'], albumType: 'album'
    })
    const playlist = spotifyRepo.createSpotifyPlaylist({
      spotifyId: 'shared-playlist', sourceUrl: 'https://open.spotify.com/playlist/shared-playlist',
      title: 'Shared', songs: [song(1), song(2)]
    })
    const itemIds = (db.prepare('SELECT id FROM music_spotify_playlist_item WHERE playlist_id=? ORDER BY id')
      .all(playlist.playlistId) as { id: number }[]).map((row) => row.id)
    for (const trackId of itemIds) {
      spotifyRepo.setTrackDownloadOptions({ sourceKind: 'playlistItem', trackId, audioSourceUrl: url })
      spotifyRepo.saveSourceEvidence('playlistItem', trackId, { url, title: 'One recording', artist: 'Artist', channel: 'Artist', duration: 200, format: 'opus', observedAt: Date.now(), accessKey: musicAccessKey() }, true)
    }
    vi.mocked(spawn).mockImplementation((_command, args) => {
      const argv = args as string[]
      if (argv.includes('--dump-json')) {
        return ytdlpProcess(() => ({ title: 'One recording', artist: 'Artist', uploader: 'Artist', duration: 200 }))(_command, argv)
      }
      const proc = recordFakeProcess()
      setTimeout(() => { proc.stderr.write('ERROR: Requested format is not available\n'); proc.exitCode = 1; proc.emit('close', 1) }, 20)
      return proc as never
    })
    spotify.addPlaylistDownloadQueue({ playlistId: playlist.playlistId, itemIds })
    spotify.startDownloadQueue()
    await vi.waitFor(() => expect(spotify.getStatus()?.status).toBe('error'))
    expect(vi.mocked(spawn).mock.calls.filter(isDownload)).toHaveLength(1)
    expect(db.prepare('SELECT download_error AS error FROM music_spotify_playlist_item WHERE playlist_id=? ORDER BY id')
      .all(playlist.playlistId)).toEqual([
      { error: expect.stringContaining('Transfer / processing (yt-dlp)') },
      { error: expect.stringContaining('Transfer / processing (yt-dlp)') }
    ])
  })

  it('retains a failed card and continues to later queue work', async () => {
    const first = await seedQueuedRelease()
    const playlist = spotifyRepo.createSpotifyPlaylist({
      spotifyId: 'playlist-id',
      sourceUrl: 'https://open.spotify.com/playlist/playlist-id',
      title: 'Later playlist',
      songs: [{
        spotifyTrackId: 'playlist-track',
        title: 'Playlist song',
        artists: ['Artist'],
        primaryArtist: 'Artist',
        albumArtist: 'Artist',
        albumTitle: 'Playlist album',
        duration: 210,
        coverUrl: null,
        coverPath: null,
        spotifyUrl: 'https://open.spotify.com/track/playlist-track',
        discNo: 1,
        trackNo: 1,
        year: 2026,
        rawJson: '{"song_id":"playlist-track"}',
        spotifyAlbumId: 'playlist-album',
        spotifyArtistId: 'artist-id',
        spotifyArtistIds: ['artist-id'],
        albumType: 'album'
      }]
    })
    const itemId = (db.prepare(
      'SELECT id FROM music_spotify_playlist_item WHERE playlist_id=?'
    ).get(playlist.playlistId) as { id: number }).id
    const secondJobId = spotify.addPlaylistDownloadQueue({
      playlistId: playlist.playlistId,
      itemIds: [itemId]
    }).jobId!
    db.prepare(
      `INSERT INTO music_album (id, artist_id, title, dir_path) VALUES (2, 1, 'Playlist album', 'Artist/Playlist album')`
    ).run()
    db.prepare(
      `INSERT INTO music_track (album_id, artist_id, file_path, title, duration)
       VALUES (2, 1, 'Artist/Playlist album/song.mp3', 'Playlist song', 210)`
    ).run()
    spotifyRepo.resolveAllSpotifyItems()

    spotify.startDownloadQueue()
    await vi.waitFor(() => expect(spotify.getStatus()?.status).toBe('done'))

    expect(spotifyRepo.getDownloadQueueCard(first.jobId)?.state).toBe('failed')
    expect(spotifyRepo.getDownloadQueueCard(secondJobId)?.state).toBe('completed')
    expect(spotify.getStatus()?.message).toMatch(/remain available to retry/)
    expect(musicMaintenanceOwner()).toBeNull()
  })
})

describe('YouTube access retry cache', () => {
  it('retests failures immediately and expires successful probes after five minutes', async () => {
    const now = vi.spyOn(Date, 'now').mockReturnValue(1000000)
    try {
      vi.mocked(execFile).mockImplementationOnce(((_bin: string, _args: string[], _options: unknown, callback: Function) => {
        callback(new Error('blocked'), '', 'Sign in to confirm you are not a bot')
      }) as typeof execFile)
      expect((await toolSetup.testYoutubeAccess(true)).ok).toBe(false)
      const failedCalls = vi.mocked(execFile).mock.calls.length
      expect((await toolSetup.testYoutubeAccess()).ok).toBe(true)
      expect(vi.mocked(execFile).mock.calls.length).toBe(failedCalls + 1)
      await toolSetup.testYoutubeAccess()
      expect(vi.mocked(execFile).mock.calls.length).toBe(failedCalls + 1)
      now.mockReturnValue(1300001)
      await toolSetup.testYoutubeAccess()
      expect(vi.mocked(execFile).mock.calls.length).toBe(failedCalls + 2)
    } finally { now.mockRestore() }
  })
})


it('normalizes interrupted queue state at startup without a library-wide rematch', () => {
  const resolve = vi.spyOn(spotifyRepo, 'resolveAllSpotifyItems')
  spotify.initializeDownloadQueue()
  expect(resolve).not.toHaveBeenCalled()
  resolve.mockRestore()
})
