import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
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
  recoverSpotifyOutputs,
  assertPlaylistSnapshotComplete,
  itunesRelease,
  groupResolvedReleases,
  adaptRecoveredReleaseSongs,
  buildSpotdlDownloadArgs,
  buildSpotdlSaveArgs,
  buildSpotifyDiscoveryQuery,
  chunkSpotifyItems,
  completeSpotdlPlaylistSnapshot,
  completeResolvedReleaseSongs,
  estimateSpotifyDownloadBytes,
  friendlySpotifyDownloadError,
  groupEntityReleases,
  parseSpotifyPlaylistUrl,
  parseSpotifyUrl,
  parseSpotdlRateLimitWait,
  parseSpotdlLine,
  parseSpotdlVersion,
  payloadWithAudioSource,
  parseSpotdlInspectionLine,
  SPOTDL_PLAYLIST_METADATA_STALL_MS,
  SPOTDL_PLAYLIST_METADATA_MAX_STALL_MS,
  spotifyPlaylistMetadataStallMs,
  pickDiscoveredEntity,
  pickConsensusDiscoveredEntity,
  rankSpotifyReleaseDiscoveryTracks,
  releaseTrackNumberingIsIncomplete,
  mismatchFor,
  killActive,
  runSpotdl,
  settleSpotifyBatch,
  spotifyAlbumIdFromTrackLookup,
  spotifyReleaseTitlesMatch,
  stripCatalogReleaseTypeSuffix,
  youtubeAccessBlocksDownload,
  validateSpotdlPayload
} from '../src/main/musicSpotify'
import {
  compatibleSpotifyDurationTolerance,
  matchSpotifyPlaylistSong,
  matchSpotifySong,
  normalizeSpotifyMatch,
  normalizeSpotifyRecordingTitle,
  singleRecordingDownloads,
  spotifyPlaylistMatchAlternatives,
  type LocalMatchCandidate,
  type SpotdlSong
} from '../src/main/repos/musicSpotifyRepo'

describe('Spotify playlist import core', () => {
  it('allows long silent playlist metadata resolution without the five-minute false timeout', () => {
    expect(SPOTDL_PLAYLIST_METADATA_STALL_MS).toBe(30 * 60_000)
    expect(SPOTDL_PLAYLIST_METADATA_STALL_MS).toBeGreaterThan(5 * 60_000)
    expect(spotifyPlaylistMetadataStallMs(100)).toBe(30 * 60_000)
    expect(spotifyPlaylistMetadataStallMs(800)).toBe(4 * 60 * 60_000)
    expect(spotifyPlaylistMetadataStallMs(10_000)).toBe(SPOTDL_PLAYLIST_METADATA_MAX_STALL_MS)
    expect(parseSpotdlInspectionLine('Found 100 songs in RYM Top 100 Songs (Playlist)')).toEqual({
      foundCount: 100,
      message: 'Found 100 tracks; resolving Spotify metadata with 8 workers. spotDL may be quiet for up to 30 minutes.'
    })
    expect(parseSpotdlInspectionLine('Found 800 songs in Big Playlist (Playlist)')).toEqual({
      foundCount: 800,
      message: 'Found 800 tracks; resolving Spotify metadata with 8 workers. spotDL may be quiet for up to 4 hours.'
    })
  })

  it('recovers only a complete spotDL playlist snapshot after an abnormal exit', () => {
    expect(completeSpotdlPlaylistSnapshot(Array.from({ length: 800 }), 800)).toBe(true)
    expect(completeSpotdlPlaylistSnapshot(Array.from({ length: 799 }), 800)).toBe(false)
    expect(completeSpotdlPlaylistSnapshot(Array.from({ length: 800 }), null)).toBe(false)
    expect(completeSpotdlPlaylistSnapshot({}, 800)).toBe(false)
  })

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
      exitCode: null,
      kill: vi.fn(() => true)
    })
    const pending = runSpotdl([], 'cancelled-spotdl-fixture', undefined, 'fixture-job', () => proc as never)
    killActive()
    expect(proc.kill).toHaveBeenNthCalledWith(1, 'SIGCONT')
    expect(proc.kill).toHaveBeenNthCalledWith(2, 'SIGTERM')
    expect(musicMaintenanceOwner()).toBeNull()
    proc.exitCode = 1
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

  it('builds fixed safe spotDL arguments and a nested album layout', () => {
    expect(stripCatalogReleaseTypeSuffix('Release Name — EP')).toBe('Release Name')
    expect(spotifyReleaseTitlesMatch('Sue Me (A Cappella) - Single', 'Sue Me (A Cappella)')).toBe(true)
    expect(spotifyReleaseTitlesMatch('Album (Deluxe)', 'Album')).toBe(false)
    expect(buildSpotdlSaveArgs('https://open.spotify.com/playlist/abc', '/tmp/list.spotdl')).toEqual([
      'save',
      'https://open.spotify.com/playlist/abc',
      '--audio',
      'youtube',
      '--threads',
      '8',
      '--save-file',
      '/tmp/list.spotdl'
    ])
    const args = buildSpotdlDownloadArgs('/tmp/in.spotdl', '/music', '/tmp/errors.spotdl')
    expect(args.slice(args.indexOf('--format'), args.indexOf('--format') + 2)).toEqual([
      '--format',
      'opus'
    ])
    expect(args.slice(args.indexOf('--bitrate'), args.indexOf('--bitrate') + 2)).toEqual([
      '--bitrate',
      'disable'
    ])
    expect(args).toContain('4')
    expect(args).not.toContain('--only-verified-results')
    expect(args).not.toContain('--dont-filter-results')
    expect(args).toContain('--print-errors')
    expect(args[args.indexOf('--save-file') + 1]).toBe('/tmp/errors.spotdl.result.spotdl')
    const windows = buildSpotdlDownloadArgs('C:/Temp/input.spotdl', 'D:/Music', 'C:/Temp/save errors.txt')
    expect(windows[windows.indexOf('--save-file') + 1]).toBe('C:/Temp/save errors.txt.result.spotdl')
    expect(args.slice(args.indexOf('--audio'), args.indexOf('--audio') + 3)).toEqual([
      '--audio', 'youtube-music', 'youtube'
    ])
    expect(args[args.indexOf('--lyrics') + 1]).toBe('--format')
    expect(args.slice(args.indexOf('--overwrite'), args.indexOf('--overwrite') + 2)).toEqual([
      '--overwrite',
      'skip'
    ])
    expect(args.at(-1)).toContain('{album-artist}/{album}/{disc-number}-{track-number} - {title}')
    const provenance = buildSpotdlDownloadArgs('/tmp/in.spotdl', '/music', '/tmp/errors.spotdl', 'skip', {
      provenance: true
    })
    expect(provenance.at(-1)).toContain('[navihub-{track-id}]')
    const direct = buildSpotdlDownloadArgs(
      'https://open.spotify.com/album/3WzBIQmn2hrulLeTY9smkk',
      '/music',
      '/tmp/direct-errors.spotdl'
    )
    expect(direct.slice(0, 2)).toEqual([
      'download',
      'https://open.spotify.com/album/3WzBIQmn2hrulLeTY9smkk'
    ])
    expect(
      buildSpotdlDownloadArgs('/tmp/in.spotdl', '/music', '/tmp/errors.spotdl', 'force')
    ).toContain('force')
    const broader = buildSpotdlDownloadArgs('/tmp/in.spotdl', '/music', '/tmp/errors.spotdl', 'skip', {
      allowUnverified: true,
      cookieFile: '/tmp/cookies.txt'
    })
    expect(broader).not.toContain('--only-verified-results')
    expect(broader).toContain('--dont-filter-results')
    expect(broader.slice(broader.indexOf('--format'), broader.indexOf('--format') + 2)).toEqual([
      '--format', 'm4a'
    ])
    expect(broader.slice(broader.indexOf('--cookie-file'), broader.indexOf('--cookie-file') + 2))
      .toEqual(['--cookie-file', '/tmp/cookies.txt'])
  })

  it('parses spotDL readiness and exact per-track errors safely', () => {
    expect(parseSpotdlVersion('spotdl 4.5.2')).toEqual({ version: '4.5.2', supported: true })
    expect(parseSpotdlVersion('4.5.1')).toEqual({ version: '4.5.1', supported: false })
    expect(parseSpotdlLine(
      'https://open.spotify.com/track/abc123 - AudioProviderError: YT-DLP download error'
    )).toEqual({
      kind: 'error',
      spotifyTrackId: 'abc123',
      message: 'AudioProviderError: YT-DLP download error'
    })
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

  it('turns provider failures into actionable per-track messages', () => {
    expect(friendlySpotifyDownloadError('AudioProviderError: YT-DLP download error'))
      .toContain('No usable YouTube audio result')
    expect(friendlySpotifyDownloadError('Sign in to confirm you are not a bot'))
      .toContain('fresh cookies')
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

  it('terminates and rejects a spotDL process that stops producing output', async () => {
    vi.useFakeTimers()
    const proc = Object.assign(new EventEmitter(), {
      stdout: new PassThrough(),
      stderr: new PassThrough(),
      exitCode: null as number | null,
      kill: vi.fn(() => true)
    })
    try {
      const pending = runSpotdl(
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

  it('rearms a playlist watchdog from its reported track count', async () => {
    vi.useFakeTimers()
    const proc = Object.assign(new EventEmitter(), {
      stdout: new PassThrough(),
      stderr: new PassThrough(),
      exitCode: null as number | null,
      kill: vi.fn(() => true)
    })
    try {
      const pending = runSpotdl(
        [],
        'large-playlist-spotdl-fixture',
        undefined,
        'large-playlist-job',
        () => proc as never,
        SPOTDL_PLAYLIST_METADATA_STALL_MS,
        (line) => {
          const event = parseSpotdlInspectionLine(line)
          return event ? spotifyPlaylistMetadataStallMs(event.foundCount) : null
        }
      )
      proc.stdout.write('Found 800 songs in Big Playlist (Playlist)\n')
      await vi.advanceTimersByTimeAsync(SPOTDL_PLAYLIST_METADATA_STALL_MS)
      expect(proc.kill).not.toHaveBeenCalled()
      await vi.advanceTimersByTimeAsync(
        spotifyPlaylistMetadataStallMs(800) - SPOTDL_PLAYLIST_METADATA_STALL_MS
      )
      expect(proc.kill).toHaveBeenCalledWith('SIGTERM')
      proc.exitCode = 1
      proc.emit('close', 1)
      await expect(pending).rejects.toThrow(/stopped responding/i)
    } finally {
      vi.useRealTimers()
    }
  })

  it('parses provider waits and stops day-long spotDL rate limits immediately', async () => {
    expect(parseSpotdlRateLimitWait(
      'Your application has reached a rate/request limit. Retry will occur after: 86400 s'
    )).toBe(86400)
    expect(parseSpotdlRateLimitWait('Downloading track')).toBeNull()

    const proc = Object.assign(new EventEmitter(), {
      stdout: new PassThrough(),
      stderr: new PassThrough(),
      exitCode: null as number | null,
      kill: vi.fn(() => true)
    })
    const pending = runSpotdl(
      [],
      'rate-limited-spotdl-fixture',
      undefined,
      'rate-limited-job',
      () => proc as never
    )
    proc.stderr.write('Your application has reached a rate/request limit. Retry will occur after: 86400 s\n')
    await vi.waitFor(() => expect(proc.kill).toHaveBeenCalledWith('SIGTERM'))
    proc.exitCode = 1
    proc.emit('close', 1)
    await expect(pending).rejects.toThrow(/rate-limited for about 24 hours/i)
    expect(musicMaintenanceOwner()).toBeNull()
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

  it('parses simple-TUI progress, titles and failures', () => {
    expect(parseSpotdlLine('Artist - Song: Downloading')).toEqual({
      kind: 'item',
      title: 'Artist - Song'
    })
    expect(parseSpotdlLine('12/100 complete')).toEqual({ kind: 'progress', done: 12, total: 100 })
    expect(parseSpotdlLine('Failed: no match')).toEqual({
      kind: 'error', message: 'no match', spotifyTrackId: null
    })
    expect(parseSpotdlInspectionLine('Found 109 songs in Gracie Abrams (Artist)')).toEqual({
      foundCount: 109,
      message: 'Found 109 tracks; resolving Spotify metadata with 8 workers. spotDL may be quiet for up to 1 hour.'
    })
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
  it('keeps existing audio, ignores partial files, and remembers moved files until indexing succeeds', () => {
    const root = mkdtempSync(join(tmpdir(), 'spotify-staging-'))
    try {
      const stage = join(root, '.navihub-downloads', 'Artist', 'Album')
      mkdirSync(stage, { recursive: true })
      mkdirSync(join(root, 'Artist', 'Album'), { recursive: true })
      writeFileSync(join(root, 'Artist', 'Album', 'song.opus'), 'original')
      writeFileSync(join(stage, 'song.opus'), 'downloaded')
      writeFileSync(join(stage, 'unfinished.opus.part'), 'partial')
      const paths = recoverSpotifyOutputs(root)
      expect(paths).toHaveLength(1)
      expect(readFileSync(join(root, paths[0]), 'utf8')).toBe('downloaded')
      expect(readFileSync(join(root, 'Artist', 'Album', 'song.opus'), 'utf8')).toBe('original')
      expect(existsSync(join(stage, 'unfinished.opus.part'))).toBe(true)
      expect(recoverSpotifyOutputs(root)).toEqual(paths)
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
