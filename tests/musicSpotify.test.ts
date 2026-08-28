import { beforeEach, describe, expect, it, vi } from 'vitest'
import { EventEmitter } from 'node:events'
import { PassThrough } from 'node:stream'
import { musicMaintenanceOwner } from '../src/main/musicMaintenance'
import { runWithActivitySignal } from '../src/main/activityContext'

vi.mock('electron', () => ({ app: { getPath: () => '/tmp/navihub-test' } }))
vi.mock('../src/main/files', () => ({
  downloadImages: vi.fn(),
  musicRootDir: () => '/tmp/music'
}))
vi.mock('../src/main/music', () => ({ startScan: vi.fn() }))
vi.mock('../src/main/db/connection', () => ({ getSqlite: vi.fn() }))
vi.mock('../src/main/repos/settingsRepo', () => ({ get: vi.fn() }))

import {
  buildSpotdlDownloadArgs,
  buildSpotdlSaveArgs,
  buildSpotifyDiscoveryQuery,
  chunkSpotifyItems,
  estimateSpotifyDownloadBytes,
  groupEntityReleases,
  parseSpotifyPlaylistUrl,
  parseSpotifyUrl,
  parseSpotdlLine,
  parseSpotdlInspectionLine,
  pickDiscoveredEntity,
  mismatchFor,
  killActive,
  runSpotdl,
  selectInspectionSongs,
  settleSpotifyBatch,
  SpotifyInspectionCache,
  validateSpotdlPayload
} from '../src/main/musicSpotify'
import {
  matchSpotifySong,
  normalizeSpotifyMatch,
  type LocalMatchCandidate,
  type SpotdlSong
} from '../src/main/repos/musicSpotifyRepo'

describe('Spotify playlist import core', () => {
  it('accepts canonical playlist URLs and rejects other Spotify content', () => {
    expect(
      parseSpotifyPlaylistUrl('https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M?si=test')
    ).toEqual({
      kind: 'playlist',
      spotifyId: '37i9dQZF1DXcBWIGoYBM5M',
      canonicalUrl: 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M'
    })
    expect(parseSpotifyPlaylistUrl('https://open.spotify.com/album/abc')).toBeNull()
    expect(parseSpotifyPlaylistUrl('--help')).toBeNull()
  })

  it('parses artist and album links with locale prefixes and rejects entity confusion', () => {
    expect(parseSpotifyUrl('https://open.spotify.com/intl-ja/artist/1234567890ab?si=x')).toEqual({
      kind: 'artist',
      spotifyId: '1234567890ab',
      canonicalUrl: 'https://open.spotify.com/artist/1234567890ab'
    })
    expect(parseSpotifyUrl('https://open.spotify.com/album/abcdefghij')).toMatchObject({ kind: 'album' })
    expect(parseSpotifyPlaylistUrl('https://open.spotify.com/artist/1234567890ab')).toBeNull()
  })

  it('expires inspection tokens lazily and evicts the oldest beyond eight', () => {
    let now = 0
    const cache = new SpotifyInspectionCache(() => now, 8, 100)
    const inspection = (inspectionId: string) => ({
      inspection: { inspectionId } as never,
      songs: []
    })
    for (let index = 1; index <= 9; index++) cache.set(inspection(String(index)))
    expect(cache.get('1')).toBeNull()
    expect(cache.get('9')).not.toBeNull()
    now = 101
    expect(cache.get('9')).toBeNull()
  })

  it('rejects mismatched entity names and invalid release selections', () => {
    expect(mismatchFor(
      { kind: 'artist', entityId: 1 },
      { id: 1, name: 'Local Artist', artistName: null, spotifyId: null },
      'Different Artist',
      []
    )).toMatch(/Different Artist/)
    const entry = {
      inspection: {
        kind: 'album',
        releases: [{ spotifyAlbumId: 'album-one' }]
      },
      songs: [{ spotifyAlbumId: 'album-one' }]
    } as never
    expect(() => selectInspectionSongs(entry, [])).toThrow(/Select at least one/)
    expect(() => selectInspectionSongs(entry, ['album-one', 'album-two'])).toThrow()
    expect(selectInspectionSongs(entry, ['album-one'])).toHaveLength(1)
  })

  it('groups stable albums, preselects primary releases, and estimates only missing audio', () => {
    const song = (id: string, albumId: string, albumType: SpotdlSong['albumType']): SpotdlSong => ({
      spotifyTrackId: id,
      title: id,
      artists: ['Artist'],
      primaryArtist: 'Artist',
      albumArtist: albumType === 'compilation' ? 'Various Artists' : 'Artist',
      albumTitle: albumId,
      duration: 100,
      coverUrl: null,
      spotifyUrl: `https://open.spotify.com/track/${id}`,
      discNo: 1,
      trackNo: 1,
      year: 2024,
      rawJson: '{}',
      spotifyAlbumId: albumId,
      spotifyArtistId: 'artist-id',
      spotifyArtistIds: ['artist-id'],
      albumType
    })
    const songs = [song('local', 'album-a', 'album'), song('missing', 'album-a', 'album'), song('feature', 'album-b', 'compilation')]
    const matches = new Map([['local', { id: 1 } as LocalMatchCandidate]])
    const releases = groupEntityReleases(songs, 'Artist', 'artist', matches)
    expect(releases[0]).toMatchObject({
      spotifyAlbumId: 'album-a',
      localCount: 1,
      missingCount: 1,
      preselected: true,
      missingDuration: 100
    })
    expect(releases[0].missingEstimatedBytes).toBeLessThan(releases[0].estimatedBytes)
    expect(releases[1]).toMatchObject({ spotifyAlbumId: 'album-b', preselected: false })
  })

  it('settles a missing spotDL process and releases its maintenance owner', async () => {
    const proc = Object.assign(new EventEmitter(), {
      stdout: new PassThrough(),
      stderr: new PassThrough(),
      kill: vi.fn()
    })
    const pending = runSpotdl([], 'missing-spotdl-fixture', undefined, undefined, () => proc as never)
    queueMicrotask(() => proc.emit('error', new Error('ENOENT')))
    await expect(pending).rejects.toThrow(/install spotDL or set its path/)
    expect(musicMaintenanceOwner()).toBeNull()
  })

  it('kills an injected active spotDL child and releases maintenance on shutdown', async () => {
    const proc = Object.assign(new EventEmitter(), {
      stdout: new PassThrough(),
      stderr: new PassThrough(),
      kill: vi.fn()
    })
    const pending = runSpotdl([], 'cancelled-spotdl-fixture', undefined, 'fixture-job', () => proc as never)
    killActive()
    expect(proc.kill).toHaveBeenCalledWith('SIGKILL')
    expect(musicMaintenanceOwner()).toBeNull()
    proc.emit('close', 1)
    await expect(pending).resolves.toBe(1)
    expect(musicMaintenanceOwner()).toBeNull()
  })

  it('stops an active spotDL inspection when its task context is cancelled', async () => {
    const proc = Object.assign(new EventEmitter(), {
      stdout: new PassThrough(),
      stderr: new PassThrough(),
      exitCode: null,
      kill: vi.fn(() => true)
    })
    const controller = new AbortController()
    const pending = runWithActivitySignal(controller.signal, () =>
      runSpotdl([], 'activity-spotdl-fixture', undefined, 'activity-job', () => proc as never)
    )
    controller.abort()
    expect(proc.kill).toHaveBeenNthCalledWith(1, 'SIGCONT')
    expect(proc.kill).toHaveBeenNthCalledWith(2, 'SIGTERM')
    proc.exitCode = 1
    proc.emit('close', 1)
    await expect(pending).resolves.toBe(1)
    expect(musicMaintenanceOwner()).toBeNull()
  })

  it('settles cancellation, partial recovery, and total failure distinctly', () => {
    expect(settleSpotifyBatch({ cancelled: true, resolved: 2, total: 5 })).toMatchObject({
      status: 'cancelled', resolvedCount: 2, failedCount: 3
    })
    expect(settleSpotifyBatch({ cancelled: false, resolved: 2, total: 5 })).toMatchObject({
      status: 'done', resolvedCount: 2, failedCount: 3, message: expect.stringMatching(/retry/)
    })
    expect(settleSpotifyBatch({ cancelled: false, resolved: 0, total: 5 })).toMatchObject({
      status: 'error', failedCount: 5
    })
  })

  it('validates, deduplicates and skips unsupported spotDL rows', () => {
    const valid = {
      song_id: 'track123456',
      name: 'Song',
      artists: ['Artist'],
      album_name: 'Album',
      duration: 180,
      url: 'https://open.spotify.com/track/track123456',
      list_name: 'My list'
    }
    const result = validateSpotdlPayload([
      valid,
      { ...valid },
      { ...valid, song_id: 'local123456', is_local: true },
      { ...valid, song_id: 'episode123', type: 'episode' },
      { broken: true }
    ])
    expect(result.title).toBe('My list')
    expect(result.songs).toHaveLength(1)
    expect(result.duplicates).toBe(1)
    expect(result.skipped).toBe(3)
  })

  it('normalizes punctuation without erasing version words', () => {
    expect(normalizeSpotifyMatch('Ａ Song: Live (2024 Remaster)')).toBe(
      'a song live 2024 remaster'
    )
  })

  it('matches only exact title, primary artist and close duration', () => {
    const candidates: LocalMatchCandidate[] = [
      {
        id: 1,
        title: 'Song - Live',
        folderArtist: 'Artist',
        tagArtist: null,
        albumTitle: 'First',
        duration: 180
      },
      {
        id: 2,
        title: 'Song',
        folderArtist: 'Other',
        tagArtist: 'Artist feat. Guest',
        albumTitle: 'Album',
        duration: 182.9
      }
    ]
    expect(
      matchSpotifySong(
        { title: 'Song', primaryArtist: 'Artist', albumTitle: 'Album', duration: 180 },
        candidates
      )
    ).toBe(2)
    expect(
      matchSpotifySong(
        { title: 'Song', primaryArtist: 'Artist', albumTitle: 'Album', duration: null },
        candidates
      )
    ).toBeNull()
  })

  it('uses album only to break a tie and leaves ambiguity unmatched', () => {
    const candidates: LocalMatchCandidate[] = [1, 2].map((id) => ({
      id,
      title: 'Song',
      folderArtist: 'Artist',
      tagArtist: null,
      albumTitle: id === 1 ? 'Album' : 'Other',
      duration: 200
    }))
    expect(
      matchSpotifySong(
        { title: 'Song', primaryArtist: 'Artist', albumTitle: 'Album', duration: 200 },
        candidates
      )
    ).toBe(1)
    expect(
      matchSpotifySong(
        { title: 'Song', primaryArtist: 'Artist', albumTitle: 'Missing', duration: 200 },
        candidates
      )
    ).toBeNull()
  })

  it('builds fixed safe spotDL arguments and a nested album layout', () => {
    expect(buildSpotdlSaveArgs('https://open.spotify.com/playlist/abc', '/tmp/list.spotdl')).toEqual([
      'save',
      'https://open.spotify.com/playlist/abc',
      '--threads',
      '4',
      '--save-file',
      '/tmp/list.spotdl'
    ])
    const args = buildSpotdlDownloadArgs('/tmp/in.spotdl', '/music', '/tmp/errors.spotdl')
    expect(args).toContain('320k')
    expect(args).toContain('4')
    expect(args.at(-1)).toContain('{album-artist}/{album}/{disc-number}-{track-number} - {title}')
  })

  it('discovers artist and album ids from an exact representative local track', () => {
    const current = {
      id: 1,
      name: 'Radiohead',
      artistName: null,
      spotifyId: null,
      sampleTracks: [{ title: 'Airbag', artist: 'Radiohead', album: '(1997) OK Computer', duration: 287 }]
    }
    const song = {
      spotifyTrackId: 'track-id', title: 'Airbag', artists: ['Radiohead'],
      primaryArtist: 'Radiohead', albumArtist: 'Radiohead', albumTitle: 'OK Computer',
      duration: 287, coverUrl: null, spotifyUrl: '', discNo: 1, trackNo: 1, year: 1997,
      rawJson: '{}', spotifyAlbumId: 'album-id', spotifyArtistId: 'artist-id',
      spotifyArtistIds: ['artist-id'], albumType: 'album'
    } satisfies SpotdlSong
    expect(buildSpotifyDiscoveryQuery('Radiohead', 'Airbag')).toBe('Radiohead - Airbag')
    expect(pickDiscoveredEntity('artist', current, [song])).toMatchObject({
      kind: 'artist', spotifyId: 'artist-id'
    })
    expect(pickDiscoveredEntity('album', {
      ...current, name: '(1997) OK Computer', artistName: 'Radiohead'
    }, [song])).toMatchObject({ kind: 'album', spotifyId: 'album-id' })
    expect(pickDiscoveredEntity('artist', current, [{ ...song, duration: 300 }])).toBeNull()
    expect(pickDiscoveredEntity('artist', {
      ...current, sampleTracks: [{ ...current.sampleTracks[0], duration: null }]
    }, [song])).toBeNull()
  })

  it('chunks hundreds of tracks and estimates unknown durations conservatively', () => {
    expect(chunkSpotifyItems(Array.from({ length: 205 }, (_, i) => i)).map((c) => c.length)).toEqual([
      100,
      100,
      5
    ])
    expect(estimateSpotifyDownloadBytes([{ duration: 100 }, { duration: null }])).toBe(
      Math.ceil((4_000_000 + 10 * 1024 * 1024) * 1.05)
    )
  })

  it('parses simple-TUI progress, titles and failures', () => {
    expect(parseSpotdlLine('Artist - Song: Downloading')).toEqual({
      kind: 'item',
      title: 'Artist - Song'
    })
    expect(parseSpotdlLine('12/100 complete')).toEqual({ kind: 'progress', done: 12, total: 100 })
    expect(parseSpotdlLine('Failed: no match')).toEqual({ kind: 'error', message: 'no match' })
    expect(parseSpotdlInspectionLine('Found 109 songs in Gracie Abrams (Artist)')).toEqual({
      foundCount: 109,
      message: 'Found 109 tracks; preparing the preview'
    })
  })
})
