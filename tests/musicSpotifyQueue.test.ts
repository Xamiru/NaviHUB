import { beforeEach, describe, expect, it, vi } from 'vitest'
import { EventEmitter } from 'node:events'
import { writeFileSync } from 'node:fs'
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
vi.mock('../src/main/http', () => ({ fetchWithRetry: vi.fn() }))
vi.mock('../src/main/music', () => ({ startScan: vi.fn(async () => undefined) }))
vi.mock('node:child_process', async (importOriginal) => {
  const actual = await importOriginal<typeof import('node:child_process')>()
  return {
    ...actual,
    spawn: vi.fn(() => recordFakeProcess()),
    execFile: vi.fn((bin: string, _args: string[], _options: unknown, callback: Function) => {
      callback(null, bin === 'ffmpeg' ? 'ffmpeg version 7' : bin === 'deno' ? 'deno 2.0.0' : 'spotDL 4.5.2', '')
    })
  }
})

import * as spotifyRepo from '../src/main/repos/musicSpotifyRepo'
import * as spotify from '../src/main/musicSpotify'
import * as tasks from '../src/main/tasks'
import { musicMaintenanceOwner } from '../src/main/musicMaintenance'
import { fetchWithRetry } from '../src/main/http'
import { spawn } from 'node:child_process'

beforeEach(() => {
  db = createTestDb()
  spawned = []
  vi.mocked(fetchWithRetry).mockReset()
  vi.mocked(spawn).mockClear()
  vi.mocked(spawn).mockImplementation(() => recordFakeProcess() as never)
  spotify.killActive()
})

function seedQueuedRelease(): { jobId: number; artistId: number } {
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
    jobId: spotify.addEntityDownloadQueue({ snapshotId, releaseIds: [releaseId] }).jobId!,
    artistId: 1
  }
}

describe('persistent Spotify download queue process', () => {
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

  it('accepts an explicit artist link when the local artist has no tracks', async () => {
    db.prepare(`INSERT INTO music_artist (id, name, dir_path) VALUES (1, 'Sabrina Carpenter', 'Sabrina Carpenter')`).run()
    vi.mocked(spawn).mockImplementation((_command, args) => {
      const proc = recordFakeProcess()
      const argv = args as string[]
      const saveFile = argv[argv.indexOf('--save-file') + 1]
      writeFileSync(saveFile, JSON.stringify([{
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
      }]))
      queueMicrotask(() => {
        proc.exitCode = 0
        proc.emit('close', 0)
      })
      return proc as never
    })

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
  })

  it('rechecks local matches and completes without launching spotDL', async () => {
    const { jobId } = seedQueuedRelease()
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

  it('persists a broader retry and exact audio source on one queued track', () => {
    const { jobId } = seedQueuedRelease()
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

  it('kills metadata resolution on Pause, persists paused state, and Cancel returns it to the queue', async () => {
    const { jobId } = seedQueuedRelease()
    const run = spotify.startDownloadQueue({ jobId })
    await vi.waitFor(() => expect(spawned).toHaveLength(1))
    expect(vi.mocked(spawn).mock.calls.at(-1)?.[1]).toContain('Artist - Missing song')
    const status = spotify.getStatus()!
    expect(status.taskId).toBeTruthy()

    tasks.pause(status.taskId!)
    expect(spawned[0].kill).toHaveBeenNthCalledWith(1, 'SIGCONT')
    expect(spawned[0].kill).toHaveBeenNthCalledWith(2, 'SIGTERM')
    spawned[0].exitCode = 1
    spawned[0].emit('close', 1)
    await vi.waitFor(() => expect(spotify.getStatus()?.status).toBe('paused'))
    expect(spotifyRepo.getDownloadQueueCard(jobId)?.state).toBe('paused')

    spotify.cancelDownload(run.id!)
    await vi.waitFor(() => expect(spotify.getStatus()?.status).toBe('cancelled'))
    expect(spotifyRepo.getDownloadQueueCard(jobId)?.state).toBe('queued')
    expect(musicMaintenanceOwner()).toBeNull()
  })

  it('discovers an album id from a track before expanding the canonical album URL', async () => {
    const { jobId } = seedQueuedRelease()
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
      url: 'https://open.spotify.com/track/spotify-track'
    }]
    vi.mocked(spawn).mockImplementation((_command, args) => {
      const proc = recordFakeProcess()
      const argv = args as string[]
      if (argv[0] === 'save') {
        const saveFile = argv[argv.indexOf('--save-file') + 1]
        writeFileSync(saveFile, JSON.stringify(payload))
        queueMicrotask(() => {
          proc.exitCode = 0
          proc.emit('close', 0)
        })
      }
      return proc as never
    })

    const run = spotify.startDownloadQueue({ jobId })
    await vi.waitFor(() => expect(spawned).toHaveLength(3))
    expect(vi.mocked(spawn).mock.calls[0][1]).toContain('Artist - Missing song')
    expect(vi.mocked(spawn).mock.calls[1][1]).toContain(
      'https://open.spotify.com/album/spotify-album'
    )
    expect((vi.mocked(spawn).mock.calls[2][1] as string[])[0]).toBe('download')

    const taskId = spotify.getStatus()!.taskId!
    tasks.pause(taskId)
    spawned[2].exitCode = 1
    spawned[2].emit('close', 1)
    await vi.waitFor(() => expect(spotify.getStatus()?.status).toBe('paused'))
    spotify.cancelDownload(run.id!)
    await vi.waitFor(() => expect(spotify.getStatus()?.status).toBe('cancelled'))
    expect(musicMaintenanceOwner()).toBeNull()
  })

  it('repairs a truncated resolved album and fills missing metadata before download', async () => {
    const { jobId } = seedQueuedRelease()
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
      [1, 3].map((trackNo) => spotify.validateSpotdlPayload([payload(trackNo)]).songs[0])
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
    vi.mocked(spawn).mockImplementation((_command, args) => {
      const proc = recordFakeProcess()
      const argv = args as string[]
      if (argv[0] === 'save') {
        const saveFile = argv[argv.indexOf('--save-file') + 1]
        const rows = argv.includes('Artist - Song 2') ? [payload(2)] : [payload(1), payload(3)]
        writeFileSync(saveFile, JSON.stringify(rows))
        queueMicrotask(() => {
          proc.exitCode = 0
          proc.emit('close', 0)
        })
      }
      return proc as never
    })

    const run = spotify.startDownloadQueue({ jobId })
    await vi.waitFor(() => expect(spawned).toHaveLength(3))
    const repaired = spotifyRepo.getEntitySnapshot('artist', 1)!.releases[0]
    expect(repaired.metadataState).toBe('resolved')
    expect(repaired.tracks.map((track) => track.title)).toEqual(['Song 1', 'Song 2', 'Song 3'])
    expect((vi.mocked(spawn).mock.calls[2][1] as string[])[0]).toBe('download')

    const taskId = spotify.getStatus()!.taskId!
    tasks.pause(taskId)
    spawned[2].exitCode = 1
    spawned[2].emit('close', 1)
    await vi.waitFor(() => expect(spotify.getStatus()?.status).toBe('paused'))
    spotify.cancelDownload(run.id!)
    await vi.waitFor(() => expect(spotify.getStatus()?.status).toBe('cancelled'))
  })

  it('retains a failed card and continues to later queue work', async () => {
    const first = seedQueuedRelease()
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
    await vi.waitFor(() => expect(spawned).toHaveLength(1))
    spawned[0].exitCode = 1
    spawned[0].emit('close', 1)
    await vi.waitFor(() => expect(spotify.getStatus()?.status).toBe('done'))

    expect(spotifyRepo.getDownloadQueueCard(first.jobId)?.state).toBe('failed')
    expect(spotifyRepo.getDownloadQueueCard(secondJobId)?.state).toBe('completed')
    expect(spotify.getStatus()?.message).toMatch(/remain available to retry/)
    expect(musicMaintenanceOwner()).toBeNull()
  })
})
