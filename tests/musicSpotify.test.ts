import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { EventEmitter } from 'node:events'
import { PassThrough } from 'node:stream'
import { musicMaintenanceOwner } from '../src/main/musicMaintenance'
import { runWithActivitySignal } from '../src/main/activityContext'
import { get as getSetting } from '../src/main/repos/settingsRepo'

vi.mock('electron', () => ({ app: { getPath: () => '/tmp/navihub-test' } }))
vi.mock('../src/main/files', () => ({
  downloadImages: vi.fn(),
  musicRootDir: () => '/tmp/music'
}))
vi.mock('../src/main/music', () => ({ startScan: vi.fn() }))
vi.mock('../src/main/db/connection', () => ({ getSqlite: vi.fn() }))
vi.mock('../src/main/repos/settingsRepo', () => ({ get: vi.fn() }))

import {
  recoverSpotifyOutputs,
  discardStagedOutputs,
  assertPlaylistSnapshotComplete,
  groupResolvedReleases,
  groupEntityReleases,
  payloadWithAudioSource,
  mismatchFor,
  killActive,
  runMusicProcess,
  settleSpotifyBatch
} from '../src/main/musicSpotify'
import {
  adaptRecoveredReleaseSongs,
  buildSpotifyDiscoveryQuery,
  chunkSpotifyItems,
  completeResolvedReleaseSongs,
  estimateSpotifyDownloadBytes,
  parseSpotifyPlaylistUrl,
  parseSpotifyUrl,
  pickDiscoveredEntity,
  pickConsensusDiscoveredEntity,
  rankSpotifyReleaseDiscoveryTracks,
  releaseTrackNumberingIsIncomplete,
  spotifyAlbumIdFromTrackLookup,
  spotifyReleaseTitlesMatch,
  stripCatalogReleaseTypeSuffix,
  validateSpotdlPayload
} from '../src/main/musicSpotifyCore'
import { itunesRelease } from '../src/main/musicCatalogue'
import { youtubeAccessBlocksDownload } from '../src/main/musicToolSetup'
import {
  compatibleSpotifyDurationTolerance,
  matchSpotifyPlaylistSong,
  matchSpotifySong,
  normalizeSpotifyMatch,
  normalizeSpotifyRecordingTitle,
  singleRecordingDownloads,
  spotifyPlaylistMatchAlternatives
} from '../src/main/musicSpotifyMatch'
import type { LocalMatchCandidate, SpotdlSong } from '../src/main/repos/musicSpotifyRepo'

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

  it('rejects mismatched entity names', () => {
    expect(mismatchFor(
      { kind: 'artist', entityId: 1 },
      { id: 1, name: 'Local Artist', artistName: null, spotifyId: null },
      'Different Artist',
      []
    )).toMatch(/Different Artist/)
    expect(mismatchFor(
      { kind: 'album', entityId: 1 },
      { id: 1, name: '(1997) OK Computer', artistName: 'Radiohead', spotifyId: null },
      'Radiohead',
      [{ title: 'OK Computer', albumArtist: 'Radiohead' } as never]
    )).toBeNull()
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
    expect(releases).toHaveLength(1)
  })

  it('settles a missing tool process and releases its maintenance owner', async () => {
    const proc = Object.assign(new EventEmitter(), {
      stdout: new PassThrough(),
      stderr: new PassThrough(),
      kill: vi.fn()
    })
    const pending = runMusicProcess([], 'missing-spotdl-fixture', undefined, undefined, () => proc as never)
    queueMicrotask(() => proc.emit('error', new Error('ENOENT')))
    await expect(pending).rejects.toThrow(/install yt-dlp or set its path/)
    expect(musicMaintenanceOwner()).toBeNull()
  })

  it('kills an injected active tool child and releases maintenance on shutdown', async () => {
    const proc = Object.assign(new EventEmitter(), {
      stdout: new PassThrough(),
      stderr: new PassThrough(),
      exitCode: null,
      kill: vi.fn(() => true)
    })
    const pending = runMusicProcess([], 'cancelled-spotdl-fixture', undefined, 'fixture-job', () => proc as never)
    killActive()
    expect(proc.kill).toHaveBeenNthCalledWith(1, 'SIGCONT')
    expect(proc.kill).toHaveBeenNthCalledWith(2, 'SIGTERM')
    expect(musicMaintenanceOwner()).toBeNull()
    proc.exitCode = 1
    proc.emit('close', 1)
    await expect(pending).resolves.toBe(1)
    expect(musicMaintenanceOwner()).toBeNull()
  })

  it('cancels every owned process when URL workers are active together', async () => {
    const children = Array.from({ length: 4 }, () => Object.assign(new EventEmitter(), {
      stdout: new PassThrough(), stderr: new PassThrough(), exitCode: null as number | null, kill: vi.fn(() => true)
    }))
    const pending = children.map((proc) => runMusicProcess([], 'parallel-url-fixture', undefined, 'parallel-url-job', () => proc as never))
    killActive()
    for (const proc of children) {
      expect(proc.kill).toHaveBeenNthCalledWith(1, 'SIGCONT')
      expect(proc.kill).toHaveBeenNthCalledWith(2, 'SIGTERM')
      proc.exitCode = 1
      proc.emit('close', 1)
    }
    expect(await Promise.all(pending)).toEqual([1, 1, 1, 1])
    expect(musicMaintenanceOwner()).toBeNull()
  })

  it('stops an active tool process when its task context is cancelled', async () => {
    const proc = Object.assign(new EventEmitter(), {
      stdout: new PassThrough(),
      stderr: new PassThrough(),
      exitCode: null,
      kill: vi.fn(() => true)
    })
    const controller = new AbortController()
    const pending = runWithActivitySignal(controller.signal, () =>
      runMusicProcess([], 'activity-spotdl-fixture', undefined, 'activity-job', () => proc as never)
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

  it('restores playlist source order after parallel spotDL metadata workers finish', () => {
    const row = (id: string, position: number) => ({
      song_id: id,
      name: `Song ${position}`,
      artists: ['Artist'],
      album_name: 'Album',
      duration: 180,
      url: `https://open.spotify.com/track/${id}`,
      list_name: 'Ordered list',
      list_position: position
    })
    const result = validateSpotdlPayload([
      row('track-three', 3),
      row('track-one', 1),
      row('track-two', 2)
    ])
    expect(result.songs.map((song) => song.title)).toEqual(['Song 1', 'Song 2', 'Song 3'])
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

  it('reuses one local copy of the same recording, preferring the named album', () => {
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
    // Two releases within three seconds are one recording: the oldest copy is reused.
    expect(
      matchSpotifySong(
        { title: 'Song', primaryArtist: 'Artist', albumTitle: 'Missing', duration: 200 },
        candidates
      )
    ).toBe(1)
  })

  it('reuses the original-album recording for a greatest-hits playlist row without merging live', () => {
    const candidates: LocalMatchCandidate[] = [
      {
        id: 1,
        title: 'All My Life',
        folderArtist: 'Foo Fighters',
        tagArtist: null,
        albumTitle: 'One by One',
        duration: 268
      },
      {
        id: 2,
        title: 'All My Life',
        folderArtist: 'Foo Fighters',
        tagArtist: null,
        albumTitle: 'Live at Wembley',
        duration: 265
      }
    ]
    const source = {
      title: 'All My Life',
      primaryArtist: 'Foo Fighters',
      albumTitle: 'Greatest Hits',
      duration: 263
    }
    expect(compatibleSpotifyDurationTolerance(263)).toBeCloseTo(7.89)
    // Both matchers reject the live recording. Only the playlist tier permits
    // the five-second difference for the studio recording on another release.
    expect(matchSpotifySong(source, candidates)).toBeNull()
    expect(matchSpotifyPlaylistSong(source, candidates)).toBe(1)
    expect(spotifyPlaylistMatchAlternatives(source, candidates).map((track) => track.id)).toEqual([1])
  })

  it('leaves multiple compatible release recordings for explicit local selection', () => {
    const candidates: LocalMatchCandidate[] = ['Album (Deluxe)', 'Greatest Hits'].map(
      (albumTitle, index) => ({
        id: index + 1,
        title: 'Song',
        folderArtist: 'Artist',
        tagArtist: null,
        albumTitle,
        duration: 205 + index
      })
    )
    const source = { title: 'Song', primaryArtist: 'Artist', albumTitle: 'Album', duration: 200 }
    expect(matchSpotifyPlaylistSong(source, candidates)).toBeNull()
    expect(spotifyPlaylistMatchAlternatives(source, candidates).map((track) => track.id)).toEqual([1, 2])
  })

  it('compares catalogue release titles without Apple presentation suffixes', () => {
    expect(stripCatalogReleaseTypeSuffix('Release Name — EP')).toBe('Release Name')
    expect(spotifyReleaseTitlesMatch('Sue Me (A Cappella) - Single', 'Sue Me (A Cappella)')).toBe(true)
    expect(spotifyReleaseTitlesMatch('Album (Deluxe)', 'Album')).toBe(false)
  })

  it('pins an explicit audio source onto the stored song payload', () => {
    expect(payloadWithAudioSource('{"name":"Song","download_url":null}', 'https://youtu.be/abc'))
      .toEqual({ name: 'Song', download_url: 'https://youtu.be/abc' })
  })

  it('does not block a batch when only the fixed probe video is unavailable', () => {
    expect(youtubeAccessBlocksDownload({
      ok: false, state: 'unavailable', authenticated: false,
      message: 'The probe video is unavailable', testedAt: Date.now(), codec: null, bitrate: null
    })).toBe(false)
    expect(youtubeAccessBlocksDownload({
      ok: false, state: 'botCheck', authenticated: false,
      message: 'Sign in to confirm you are not a bot', testedAt: Date.now(), codec: null, bitrate: null
    })).toBe(true)
  })

  it('discovers a deluxe album from a release-unique track instead of a shared lead track', () => {
    const standard = {
      tracks: [
        { title: 'Taste', duration: 157 },
        { title: 'Juno', duration: 223 }
      ]
    }
    const deluxe = {
      title: "Short n' Sweet (Deluxe)",
      albumArtist: 'Sabrina Carpenter',
      tracks: [
        { title: 'Taste', duration: 157 },
        { title: 'Juno', duration: 223 },
        { title: 'Bad Reviews', duration: 141 }
      ]
    }
    expect(rankSpotifyReleaseDiscoveryTracks([standard, deluxe], deluxe).map((track) => track.title))
      .toEqual(['Bad Reviews', 'Juno', 'Taste'])

    const song = {
      spotifyTrackId: 'track-id', title: 'Bad Reviews', artists: ['Sabrina Carpenter'],
      primaryArtist: 'Sabrina Carpenter', albumArtist: 'Sabrina Carpenter',
      albumTitle: "Short n' Sweet (Deluxe)", duration: 141, coverUrl: null,
      spotifyUrl: 'https://open.spotify.com/track/track-id', discNo: 1, trackNo: 17,
      year: 2025, rawJson: '{}', spotifyAlbumId: '3WzBIQmn2hrulLeTY9smkk',
      spotifyArtistId: 'artist-id', spotifyArtistIds: ['artist-id'], albumType: 'album'
    } satisfies SpotdlSong
    expect(spotifyAlbumIdFromTrackLookup(deluxe, deluxe.tracks[2], [song])).toBe(
      '3WzBIQmn2hrulLeTY9smkk'
    )
    expect(spotifyAlbumIdFromTrackLookup(deluxe, deluxe.tracks[0], [{
      ...song,
      title: 'Taste',
      duration: 157,
      albumTitle: "Short n' Sweet",
      spotifyAlbumId: 'standard-id'
    }])).toBeNull()
  })

  it('rejects partial album metadata and identifies missing numbered tracks', () => {
    const indexed = {
      title: 'Album',
      albumArtist: 'Artist',
      tracks: [1, 2, 3].map((trackNo) => ({
        providerTrackId: `itunes-${trackNo}`,
        title: `Song ${trackNo}`,
        artists: ['Artist'],
        primaryArtist: 'Artist',
        albumTitle: 'Album',
        duration: 180 + trackNo,
        discNo: 1,
        trackNo
      }))
    }
    const songs = [1, 3].map((trackNo) => ({
      spotifyTrackId: `spotify-${trackNo}`,
      title: `Song ${trackNo}`,
      artists: ['Artist'],
      primaryArtist: 'Artist',
      albumArtist: 'Artist',
      albumTitle: 'Album',
      duration: 180 + trackNo,
      coverUrl: null,
      spotifyUrl: `https://open.spotify.com/track/spotify-${trackNo}`,
      discNo: 1,
      trackNo,
      year: 2026,
      rawJson: '{}',
      spotifyAlbumId: 'album-id',
      spotifyArtistId: 'artist-id',
      spotifyArtistIds: ['artist-id'],
      albumType: 'album' as const
    }))
    expect(completeResolvedReleaseSongs(indexed, songs)).toMatchObject({
      songs: [{ title: 'Song 1' }, { title: 'Song 3' }],
      missing: [{ title: 'Song 2' }]
    })
    expect(releaseTrackNumberingIsIncomplete(songs)).toBe(true)
    expect(releaseTrackNumberingIsIncomplete(indexed.tracks)).toBe(false)

    const adapted = adaptRecoveredReleaseSongs(
      indexed,
      [indexed.tracks[1]],
      [{ ...songs[0], spotifyTrackId: 'standard-track', title: 'Song 2', duration: 182,
        albumTitle: 'Album (Standard)', spotifyAlbumId: 'standard-album', trackNo: 2 }],
      'deluxe-album'
    )
    expect(adapted[0]).toMatchObject({
      spotifyTrackId: 'standard-track',
      spotifyAlbumId: 'deluxe-album',
      albumTitle: 'Album',
      trackNo: 2
    })
    expect(JSON.parse(adapted[0].rawJson)).toMatchObject({
      album_id: 'deluxe-album',
      album_name: 'Album'
    })
  })

  it('terminates and rejects a tool process that stops producing output', async () => {
    vi.useFakeTimers()
    const proc = Object.assign(new EventEmitter(), {
      stdout: new PassThrough(),
      stderr: new PassThrough(),
      exitCode: null as number | null,
      kill: vi.fn(() => true)
    })
    try {
      const pending = runMusicProcess(
        [],
        'stalled-spotdl-fixture',
        undefined,
        'stalled-job',
        () => proc as never,
        5_000
      )
      await vi.advanceTimersByTimeAsync(5_000)
      expect(proc.kill).toHaveBeenCalledWith('SIGTERM')
      proc.exitCode = 1
      proc.emit('close', 1)
      await expect(pending).rejects.toThrow(/stopped responding/i)
    } finally {
      vi.useRealTimers()
    }
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

  it('uses representative-track consensus and rejects a tied Spotify identity', () => {
    const current = {
      id: 1,
      name: 'Radiohead',
      artistName: null,
      spotifyId: null,
      sampleTracks: [
        { title: 'Airbag', artist: 'Radiohead', album: 'OK Computer', duration: 200 },
        { title: 'Paranoid Android', artist: 'Radiohead', album: 'OK Computer', duration: 201 },
        { title: 'Karma Police', artist: 'Radiohead', album: 'OK Computer', duration: 202 }
      ]
    }
    const song = (title: string, duration: number, artistId: string): SpotdlSong => ({
      spotifyTrackId: title, title, artists: ['Radiohead'], primaryArtist: 'Radiohead',
      albumArtist: 'Radiohead', albumTitle: 'OK Computer', duration, coverUrl: null,
      spotifyUrl: '', discNo: 1, trackNo: 1, year: 1997, rawJson: '{}',
      spotifyAlbumId: 'album-id', spotifyArtistId: artistId,
      spotifyArtistIds: [artistId], albumType: 'album'
    })
    expect(pickConsensusDiscoveredEntity('artist', current, [
      song('Airbag', 200, 'artist-a'),
      song('Paranoid Android', 201, 'artist-a'),
      song('Karma Police', 202, 'artist-b')
    ])).toMatchObject({ spotifyId: 'artist-a' })
    expect(pickConsensusDiscoveredEntity('artist', { ...current, sampleTracks: current.sampleTracks.slice(0, 2) }, [
      song('Airbag', 200, 'artist-a'),
      song('Paranoid Android', 201, 'artist-b')
    ])).toBeNull()
  })

  it('chunks hundreds of tracks and estimates unknown durations conservatively', () => {
    expect(chunkSpotifyItems(Array.from({ length: 205 }, (_, i) => i)).map((c) => c.length)).toEqual([
      100,
      100,
      5
    ])
    expect(estimateSpotifyDownloadBytes([{ duration: 100 }, { duration: null }])).toBe(
      Math.ceil((1_600_000 + 4 * 1024 * 1024) * 1.05)
    )
  })

})

describe('Spotify completeness and batching', () => {
  it('rejects short successful playlist results before any snapshot replacement', () => {
    expect(() => assertPlaylistSnapshotComplete([{}], 2)).toThrow(/incomplete playlist/)
    expect(() => assertPlaylistSnapshotComplete([{}, {}], 2)).not.toThrow()
  })
  it('detects missing final album tracks even when numbering has no gaps', () => {
    expect(() => itunesRelease({ collectionId: 1, collectionName: 'Album', artistName: 'Artist', trackCount: 2 }, [
      { wrapperType: 'track', kind: 'song', collectionId: 1, trackId: 1, trackName: 'First', trackNumber: 1 }
    ])).toThrow(/1\/2/)
  })
  it('batches resolved singles without crossing unresolved or 100-track boundaries', () => {
    const one = { metadataState: 'resolved', tracks: [1] }
    const pending = { metadataState: 'indexed', tracks: [2] }
    expect(groupResolvedReleases([one, one, pending, one]).map((group) => group.length)).toEqual([2, 1, 1])
    expect(groupResolvedReleases(Array.from({ length: 101 }, () => one)).map((group) => group.length)).toEqual([100, 1])
  })
})

describe('Spotify staged file recovery', () => {
  it('recovers the dot-preserving spotDL directory', () => {
    const root = mkdtempSync(join(tmpdir(), 'spotify-staging-'))
    try {
      const current = join(root, '.spotdl', 'navihub-downloads', 'Artist', 'Album')
      mkdirSync(current, { recursive: true })
      const filename = 'song [navirun-new] [navihub-abc123].opus'
      writeFileSync(join(current, filename), 'new')
      const paths = recoverSpotifyOutputs(root)
      expect(paths).toEqual([`Artist/Album/${filename}`])
      expect(existsSync(join(current, filename))).toBe(false)
      expect(recoverSpotifyOutputs(root)).toEqual(paths)
    } finally { rmSync(root, { recursive: true, force: true }) }
  })

  it('keeps existing audio, ignores partial files, and remembers moved files until indexing succeeds', () => {
    const root = mkdtempSync(join(tmpdir(), 'spotify-staging-'))
    try {
      const stage = join(root, '.navihub-downloads', 'Artist', 'Album')
      mkdirSync(stage, { recursive: true })
      mkdirSync(join(root, 'Artist', 'Album'), { recursive: true })
      writeFileSync(join(root, 'Artist', 'Album', 'song.opus'), 'original')
      writeFileSync(join(stage, 'song.opus'), 'downloaded')
      writeFileSync(join(stage, 'unfinished.opus.part'), 'partial')
      writeFileSync(join(stage, 'tagging.temp.opus'), 'partial')
      const paths = recoverSpotifyOutputs(root)
      expect(paths).toHaveLength(1)
      expect(readFileSync(join(root, paths[0]), 'utf8')).toBe('downloaded')
      expect(readFileSync(join(root, 'Artist', 'Album', 'song.opus'), 'utf8')).toBe('original')
      expect(existsSync(join(stage, 'unfinished.opus.part'))).toBe(true)
      expect(existsSync(join(stage, 'tagging.temp.opus'))).toBe(true)
      expect(recoverSpotifyOutputs(root)).toEqual(paths)
    } finally { rmSync(root, { recursive: true, force: true }) }
  })

  it('discards every file an unfinished run staged for one track', () => {
    const root = mkdtempSync(join(tmpdir(), 'spotify-staging-'))
    try {
      const stage = join(root, '.spotdl', 'navihub-downloads', 'Artist', 'Album')
      mkdirSync(stage, { recursive: true })
      const base = join(stage, '1-01 - Song [navirun-r1] [navihub-abc]')
      for (const suffix of ['.opus', '.webm', '.temp.opus', '.webp']) writeFileSync(base + suffix, 'partial')
      writeFileSync(join(stage, '1-02 - Other [navirun-r1] [navihub-def].opus'), 'complete')
      discardStagedOutputs(base)
      expect(readdirSync(stage)).toEqual(['1-02 - Other [navirun-r1] [navihub-def].opus'])
      discardStagedOutputs(join(root, 'missing', 'x'))
    } finally { rmSync(root, { recursive: true, force: true }) }
  })
})


describe('one recording across remastered releases', () => {
  const original = { title: 'Hey Jude', primaryArtist: 'The Beatles', albumTitle: 'Hey Jude', duration: 431 }
  const local: LocalMatchCandidate = { id: 1, title: 'Hey Jude', folderArtist: 'The Beatles', tagArtist: null, albumTitle: 'Hey Jude', duration: 431 }

  it.each(['Hey Jude Remaster 2005', 'Hey Jude - 2005 Remastered', 'Hey Jude (Remastered in 2005)', 'Hey Jude - Digitally Remastered 2005 Version'])(
    'reuses the original local recording for %s', (title) => {
      expect(normalizeSpotifyRecordingTitle(title)).toBe('hey jude')
      expect(matchSpotifySong({ ...original, title }, [local])).toBe(1)
      expect(matchSpotifyPlaylistSong({ ...original, title }, [local])).toBe(1)
      expect(matchSpotifyPlaylistSong(original, [{ ...local, title }])).toBe(1)
    }
  )

  it('keeps one stable copy when several remastered editions are local', () => {
    const copies = [
      { ...local, id: 8, title: 'Hey Jude - 2009 Remaster', albumTitle: 'Compilation' },
      { ...local, id: 2, title: 'Hey Jude - 2005 Remastered', albumTitle: 'Collection' }
    ]
    expect(matchSpotifyPlaylistSong(original, copies)).toBe(2)
    expect(matchSpotifySong({ ...original, title: 'Hey Jude Remaster 2005' }, copies)).toBe(2)
  })

  it('matches the library copies real Spotify catalogue titles failed to find', () => {
    const track = (title: string, albumTitle: string, duration: number, folderArtist = 'Artist', tagArtist: string | null = null): LocalMatchCandidate =>
      ({ id: 1, title, folderArtist, tagArtist, albumTitle, duration })
    const song = (title: string, albumTitle: string, duration: number, primaryArtist = 'Artist') =>
      ({ title, albumTitle, duration, primaryArtist })
    // Featuring credits, "2017 Master" wording and a joined folder artist.
    expect(matchSpotifyPlaylistSong(song('Under Pressure (feat. David Bowie)', 'Hot Space', 248, 'Queen'),
      [track('Under Pressure (Remastered 2011)', 'Singles', 245, 'Queen', 'Queen & David Bowie')])).toBe(1)
    expect(matchSpotifyPlaylistSong(song('Rubber Ring - 2017 Master', 'The Queen Is Dead', 234),
      [track('Rubber Ring - 2011 Remaster', 'Louder Than Bombs', 228)])).toBe(1)
    expect(matchSpotifyPlaylistSong(song('Easy Lover', 'Chinese Wall', 306, 'Philip Bailey'),
      [track('Easy Lover', 'Essentials', 306, 'Philip Bailey, Phil Collins')])).toBe(1)
    // "Live" inside the main title is not a live recording, so remaster reuse still applies.
    expect(matchSpotifyPlaylistSong(song('Who Wants To Live Forever', 'Greatest Hits II', 297),
      [{ ...track('Who Wants To Live Forever (Remastered 2011)', 'Singles', 295), id: 4 },
        { ...track('Who Wants To Live Forever', 'A Kind Of Magic', 295), id: 7 }])).toBe(4)
    // Duplicate rips on one album, and a local subtitle on the same album and duration.
    expect(matchSpotifyPlaylistSong(song('Shine On You Crazy Diamond (Pts. 1-5)', 'Wish You Were Here', 813),
      [{ ...track('Shine On You Crazy Diamond (Pts. 1-5)', 'Wish You Were Here', 811), id: 3 },
        { ...track('Shine On You Crazy Diamond (Pts. 1-5)', 'Wish You Were Here', 813), id: 9 }])).toBe(9)
    expect(matchSpotifyPlaylistSong(song('2 + 2 = 5', 'Hail To the Thief', 199),
      [track('2 + 2 = 5 (The Lukewarm.)', '(2003) Hail to the Thief', 199)])).toBe(1)
    expect(matchSpotifyPlaylistSong(song('I Want It All - Single Version', 'The Miracle', 242),
      [track('I Want It All (Remastered 2011)', 'Singles', 241)])).toBe(1)
    expect(matchSpotifyPlaylistSong(song('I Want It All - Single Version', 'The Miracle', 242),
      [track('I Want It All', 'The Miracle', 280)])).toBeNull()
    // Look-alikes that are different recordings stay unmatched.
    expect(matchSpotifyPlaylistSong(song('Mine (Taylor\'s Version)', 'Speak Now (Taylor\'s Version)', 232),
      [track('Mine', 'Speak Now', 232)])).toBeNull()
    expect(matchSpotifyPlaylistSong(song('Radio Ga Ga - Live Aid', 'Bohemian Rhapsody', 246),
      [track('Radio Ga Ga', 'The Works', 246)])).toBeNull()
    expect(matchSpotifyPlaylistSong(song('2 + 2 = 5', 'Com Lag', 199),
      [track('2 + 2 = 5 (Live at Earls Court)', 'Com Lag', 199)])).toBeNull()
    expect(matchSpotifyPlaylistSong(song('Son of Man', 'Tarzan', 164),
      [track('Son Of Man (Tarzan)', 'Son Of Man Single', 166)])).toBeNull()
  })

  it('preserves unrelated years and rejects different recordings or unsafe durations', () => {
    expect(normalizeSpotifyRecordingTitle('1999')).toBe('1999')
    expect(normalizeSpotifyRecordingTitle('Summer 2005')).toBe('summer 2005')
    for (const suffix of ['Live', 'Acoustic', 'Remix', 'Demo', 'Instrumental']) {
      expect(matchSpotifyPlaylistSong(original, [{ ...local, title: `Hey Jude - ${suffix} - 2005 Remaster` }])).toBeNull()
    }
    expect(matchSpotifyPlaylistSong(original, [{ ...local, title: 'Hey Jude Remaster 2005', duration: 500 }])).toBeNull()
  })

  it('downloads one original/remaster copy per batch while retaining explicit sources and other recordings', () => {
    const rows = [
      { ...original, manual: false },
      { ...original, title: 'Hey Jude Remaster 2005', manual: false },
      { ...original, title: 'Hey Jude - 2009 Remastered', manual: false },
      { ...original, title: 'Hey Jude - Live', manual: false },
      { ...original, title: 'Hey Jude Remaster 2005', manual: true },
      { ...original, albumTitle: 'Live at Wembley Remastered', manual: false },
      { ...original, albumTitle: 'Live in Paris Remastered', manual: false }
    ]
    expect(singleRecordingDownloads(rows, (row) => row)).toEqual([rows[0], rows[3], rows[4], rows[5], rows[6]])
  })
})
