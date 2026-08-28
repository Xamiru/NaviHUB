// 'localtime' SQL grouping otherwise depends on the machine's timezone —
// must run before anything touches sqlite.
process.env.TZ = 'UTC'

import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database

vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

import * as musicRepo from '../src/main/repos/musicRepo'
import * as spotifyRepo from '../src/main/repos/musicSpotifyRepo'

beforeEach(() => {
  db = createTestDb()
})

// Seeds one artist/album/track chain directly (the scanner is tested in
// music.test.ts; the repo only reads/writes what's already there).
function seedTrack(opts: {
  artist?: string
  album?: string
  title?: string
  trackNo?: number | null
  discNo?: number | null
  path?: string
  year?: number | null
}): number {
  const artist = opts.artist ?? 'Radiohead'
  const album = opts.album ?? 'OK Computer'
  const albumDir = `${artist}/${album}`
  db.prepare(`INSERT OR IGNORE INTO music_artist (name, dir_path) VALUES (?, ?)`).run(
    artist,
    artist
  )
  const artistId = (
    db.prepare('SELECT id FROM music_artist WHERE dir_path = ?').get(artist) as { id: number }
  ).id
  db.prepare(
    `INSERT OR IGNORE INTO music_album (artist_id, title, dir_path, year) VALUES (?, ?, ?, ?)`
  ).run(artistId, album, albumDir, opts.year ?? null)
  const albumId = (
    db.prepare('SELECT id FROM music_album WHERE dir_path = ?').get(albumDir) as { id: number }
  ).id
  const title = opts.title ?? 'Airbag'
  const info = db
    .prepare(
      `INSERT INTO music_track (album_id, artist_id, file_path, title, track_no, disc_no, duration)
       VALUES (?, ?, ?, ?, ?, ?, 200)`
    )
    .run(
      albumId,
      artistId,
      opts.path ?? `${albumDir}/${title}.mp3`,
      title,
      opts.trackNo ?? null,
      opts.discNo ?? null
    )
  return Number(info.lastInsertRowid)
}

describe('browse', () => {
  it('lists artists with album/track counts and supports search', () => {
    seedTrack({ artist: 'Radiohead', album: 'OK Computer', title: 'Airbag' })
    seedTrack({ artist: 'Radiohead', album: 'Kid A', title: 'Idioteque' })
    seedTrack({ artist: 'Aimer', album: 'Sleepless Nights', title: 'Re:pray' })

    const all = musicRepo.listArtists()
    expect(all.map((a) => a.name)).toEqual(['Aimer', 'Radiohead'])
    expect(all[1]).toMatchObject({ albumCount: 2, trackCount: 2 })
    expect(musicRepo.listArtists('radio').map((a) => a.name)).toEqual(['Radiohead'])
  })

  it('returns album detail ordered by disc then track number', () => {
    const id = seedTrack({ title: 'D2T1', discNo: 2, trackNo: 1 })
    seedTrack({ title: 'D1T2', discNo: 1, trackNo: 2, path: 'x/1' })
    seedTrack({ title: 'D1T1', discNo: 1, trackNo: 1, path: 'x/2' })
    const albumId = (
      db.prepare('SELECT album_id FROM music_track WHERE id = ?').get(id) as { album_id: number }
    ).album_id
    const album = musicRepo.getAlbum(albumId)!
    expect(album.tracks.map((t) => t.title)).toEqual(['D1T1', 'D1T2', 'D2T1'])
    expect(album.tracks[0]).toMatchObject({ artistName: 'Radiohead', albumTitle: 'OK Computer' })
  })

  it('getArtist returns albums (year desc) and most-played top tracks', () => {
    const played = seedTrack({ album: 'Kid A', title: 'Idioteque', year: 2000 })
    seedTrack({ album: 'OK Computer', title: 'Airbag', year: 1997 })
    db.prepare(`UPDATE music_track SET play_count = 3, last_played_at = datetime('now') WHERE id = ?`).run(
      played
    )
    const artistId = (
      db.prepare('SELECT artist_id FROM music_track WHERE id = ?').get(played) as {
        artist_id: number
      }
    ).artist_id
    const artist = musicRepo.getArtist(artistId)!
    expect(artist.albums.map((a) => a.title)).toEqual(['Kid A', 'OK Computer'])
    expect(artist.topTracks.map((t) => t.title)).toEqual(['Idioteque'])
    expect(artist.trackCount).toBe(2)
  })

  it('remembers unique Spotify sources, exposes canonical links, and forgets them', () => {
    const trackId = seedTrack({})
    const row = db.prepare('SELECT artist_id, album_id FROM music_track WHERE id = ?').get(trackId) as {
      artist_id: number
      album_id: number
    }
    spotifyRepo.rememberEntitySource('artist', row.artist_id, 'artist-source')
    spotifyRepo.rememberEntitySource('album', row.album_id, 'album-source')
    expect(musicRepo.getArtist(row.artist_id)).toMatchObject({
      spotifyId: 'artist-source',
      spotifyUrl: 'https://open.spotify.com/artist/artist-source'
    })
    expect(musicRepo.getAlbum(row.album_id)).toMatchObject({
      spotifyId: 'album-source',
      spotifyUrl: 'https://open.spotify.com/album/album-source'
    })
    spotifyRepo.forgetEntitySource('album', row.album_id)
    expect(musicRepo.getAlbum(row.album_id)?.spotifyId).toBeNull()

    seedTrack({ artist: 'Other', album: 'Other', path: 'other/song.mp3' })
    const otherArtist = db.prepare(`SELECT id FROM music_artist WHERE name = 'Other'`).get() as { id: number }
    expect(() => spotifyRepo.rememberEntitySource('artist', otherArtist.id, 'artist-source')).toThrow()
  })

  it('provides representative local tracks for automatic Spotify discovery', () => {
    const trackId = seedTrack({ artist: 'Radiohead', album: '(1997) OK Computer', title: 'Airbag' })
    const row = db.prepare('SELECT artist_id, album_id FROM music_track WHERE id = ?').get(trackId) as {
      artist_id: number
      album_id: number
    }
    expect(spotifyRepo.getEntity('artist', row.artist_id)?.sampleTracks[0]).toEqual({
      title: 'Airbag',
      artist: 'Radiohead',
      album: '(1997) OK Computer',
      duration: 200
    })
    expect(spotifyRepo.getEntity('album', row.album_id)).toMatchObject({
      name: '(1997) OK Computer',
      artistName: 'Radiohead'
    })
  })

  it('refuses ambiguous automatic source linkage and links after resolution is unique', () => {
    const first = seedTrack({ artist: 'Artist', album: 'Album', title: 'Song', path: 'one.mp3' })
    const duplicate = seedTrack({ artist: 'Artist', album: 'Album', title: 'Song', path: 'two.mp3' })
    const song: spotifyRepo.SpotdlSong = {
      spotifyTrackId: 'spotify-track', title: 'Song', artists: ['Artist'], primaryArtist: 'Artist',
      albumArtist: 'Artist', albumTitle: 'Album', duration: 200, coverUrl: null,
      spotifyUrl: 'https://open.spotify.com/track/spotify-track', discNo: 1, trackNo: 1,
      year: 2024, rawJson: '{}', spotifyAlbumId: 'spotify-album',
      spotifyArtistId: 'spotify-artist', spotifyArtistIds: ['spotify-artist'], albumType: 'album'
    }
    spotifyRepo.linkUnambiguousSources('spotify-artist', [{ spotifyAlbumId: 'spotify-album', songs: [song] }])
    expect(db.prepare('SELECT spotify_id FROM music_album').get()).toEqual({ spotify_id: null })
    db.prepare('DELETE FROM music_track WHERE id = ?').run(duplicate)
    spotifyRepo.linkUnambiguousSources('spotify-artist', [{ spotifyAlbumId: 'spotify-album', songs: [song] }])
    const linked = db.prepare(
      `SELECT al.spotify_id AS album_source, ar.spotify_id AS artist_source
       FROM music_track t JOIN music_album al ON al.id=t.album_id
       JOIN music_artist ar ON ar.id=t.artist_id WHERE t.id=?`
    ).get(first)
    expect(linked).toEqual({ album_source: 'spotify-album', artist_source: 'spotify-artist' })
  })

  it('searchAll matches artists, albums and tracks independently', () => {
    seedTrack({ artist: 'Radiohead', album: 'OK Computer', title: 'Karma Police' })
    const res = musicRepo.searchAll('karma')
    expect(res.tracks.map((t) => t.title)).toEqual(['Karma Police'])
    expect(res.artists).toHaveLength(0)
    expect(musicRepo.searchAll('ok comp').albums.map((a) => a.title)).toEqual(['OK Computer'])
    expect(musicRepo.searchAll('radiohead').artists).toHaveLength(1)
    expect(musicRepo.searchAll('')).toEqual({ artists: [], albums: [], tracks: [] })
  })

  it('stats sums the library', () => {
    seedTrack({ title: 'One', path: 'p1' })
    seedTrack({ title: 'Two', path: 'p2' })
    expect(musicRepo.stats()).toEqual({
      artists: 1,
      albums: 1,
      tracks: 2,
      totalDuration: 400
    })
  })
})

describe('playlists', () => {
  it('creates, adds without duplicates, reorders and removes', () => {
    const t1 = seedTrack({ title: 'One', path: 'p1' })
    const t2 = seedTrack({ title: 'Two', path: 'p2' })
    const t3 = seedTrack({ title: 'Three', path: 'p3' })

    const id = musicRepo.createPlaylist({ title: 'Mix' })
    musicRepo.addPlaylistTracks(id, [t1, t2])
    musicRepo.addPlaylistTracks(id, [t2, t3]) // t2 is a dupe -> ignored

    let detail = musicRepo.getPlaylist(id)!
    expect(detail.items.map((i) => i.track.title)).toEqual(['One', 'Two', 'Three'])

    musicRepo.reorderPlaylist(id, [detail.items[2].itemId, detail.items[0].itemId, detail.items[1].itemId])
    detail = musicRepo.getPlaylist(id)!
    expect(detail.items.map((i) => i.track.title)).toEqual(['Three', 'One', 'Two'])

    musicRepo.removePlaylistTrackByTrack(id, t1)
    detail = musicRepo.getPlaylist(id)!
    expect(detail.items.map((i) => i.track.title)).toEqual(['Three', 'Two'])

    const summaries = musicRepo.listPlaylists()
    expect(summaries[0]).toMatchObject({ title: 'Mix', trackCount: 2 })

    musicRepo.removePlaylist(id)
    expect(musicRepo.getPlaylist(id)).toBeNull()
    expect(db.prepare('SELECT COUNT(*) AS n FROM music_playlist_track').get()).toEqual({ n: 0 })
  })

  it('playlistsForTrack reports containment for the toggle menu', () => {
    const t1 = seedTrack({ title: 'One', path: 'p1' })
    const a = musicRepo.createPlaylist({ title: 'A' })
    musicRepo.createPlaylist({ title: 'B' })
    musicRepo.addPlaylistTracks(a, [t1])
    const rows = musicRepo.playlistsForTrack(t1)
    expect(rows.find((r) => r.id === a)?.contains).toBe(true)
    expect(rows.filter((r) => r.contains)).toHaveLength(1)
  })

  it('deleting a track cascades out of playlists', () => {
    const t1 = seedTrack({ title: 'One', path: 'p1' })
    const id = musicRepo.createPlaylist({ title: 'Mix' })
    musicRepo.addPlaylistTracks(id, [t1])
    db.prepare('DELETE FROM music_track WHERE id = ?').run(t1)
    expect(musicRepo.getPlaylist(id)!.items).toHaveLength(0)
  })

  it('keeps Spotify source order, counts missing rows, and appends manual tracks', () => {
    const matched = seedTrack({ artist: 'Artist', album: 'Album', title: 'Matched', path: 'p1' })
    const manual = seedTrack({ artist: 'Other', album: 'Manual', title: 'Manual', path: 'p2' })
    const playlistId = musicRepo.createPlaylist({ title: 'Imported mix' })
    db.prepare(
      `INSERT INTO music_spotify_playlist (playlist_id, spotify_id, source_url)
       VALUES (?, 'spotify-list', 'https://open.spotify.com/playlist/spotify-list')`
    ).run(playlistId)
    const insert = db.prepare(
      `INSERT INTO music_spotify_playlist_item
       (playlist_id, spotify_track_id, position, title, artists_json, primary_artist,
        album_title, duration, spotify_url, raw_json, matched_track_id, cover_path)
       VALUES (?, ?, ?, ?, '["Artist"]', 'Artist', 'Album', 200, ?, '{}', ?, ?)`
    )
    insert.run(playlistId, 'first-track', 0, 'Matched', 'https://open.spotify.com/track/first', matched, 'media/first.jpg')
    insert.run(playlistId, 'second-track', 1, 'Missing', 'https://open.spotify.com/track/second', null, 'media/second.jpg')
    musicRepo.addPlaylistTracks(playlistId, [manual])

    const detail = musicRepo.getPlaylist(playlistId)!
    expect(detail.source?.spotifyId).toBe('spotify-list')
    expect(detail.items.map((item) => item.kind)).toEqual(['spotify', 'spotify', 'local'])
    expect(detail.items.map((item) => item.position)).toEqual([0, 1, 2])
    expect(detail.playableCount).toBe(2)
    expect(detail.missingCount).toBe(1)
    expect(musicRepo.listPlaylists()[0]).toMatchObject({
      source: 'spotify',
      trackCount: 3,
      playableCount: 2,
      missingCount: 1,
      previewCovers: ['media/first.jpg', 'media/second.jpg', null]
    })
  })

  it('turns a deleted matched track grey and resolves it again after a rescan', () => {
    const trackId = seedTrack({ artist: 'Artist', album: 'Album', title: 'Song', path: 'p1' })
    const playlistId = musicRepo.createPlaylist({ title: 'Imported mix' })
    db.prepare(
      `INSERT INTO music_spotify_playlist (playlist_id, spotify_id, source_url)
       VALUES (?, 'source-id', 'https://open.spotify.com/playlist/source-id')`
    ).run(playlistId)
    db.prepare(
      `INSERT INTO music_spotify_playlist_item
       (playlist_id, spotify_track_id, position, title, artists_json, primary_artist,
        album_title, duration, spotify_url, raw_json, matched_track_id)
       VALUES (?, 'song-id', 0, 'Song', '["Artist"]', 'Artist', 'Album', 200,
               'https://open.spotify.com/track/song-id', '{}', ?)`
    ).run(playlistId, trackId)

    db.prepare('DELETE FROM music_track WHERE id = ?').run(trackId)
    expect(musicRepo.getPlaylist(playlistId)!.missingCount).toBe(1)
    seedTrack({ artist: 'Artist', album: 'Album', title: 'Song', path: 'p-restored' })
    expect(spotifyRepo.resolveAllSpotifyItems()).toBe(1)
    expect(musicRepo.getPlaylist(playlistId)!.missingCount).toBe(0)
  })

  it('finds an existing Spotify playlist and removes only its source item', () => {
    const playlistId = musicRepo.createPlaylist({ title: 'Imported mix' })
    db.prepare(
      `INSERT INTO music_spotify_playlist (playlist_id, spotify_id, source_url)
       VALUES (?, 'repeat-id', 'https://open.spotify.com/playlist/repeat-id')`
    ).run(playlistId)
    db.prepare(
      `INSERT INTO music_spotify_playlist_item
       (playlist_id, spotify_track_id, position, title, artists_json, primary_artist,
        album_title, spotify_url, raw_json)
       VALUES (?, 'song-id', 0, 'Song', '["Artist"]', 'Artist', 'Album',
               'https://open.spotify.com/track/song-id', '{}')`
    ).run(playlistId)
    expect(spotifyRepo.findPlaylistBySpotifyId('repeat-id')).toBe(playlistId)
    const itemId = (db.prepare('SELECT id FROM music_spotify_playlist_item').get() as { id: number }).id
    spotifyRepo.removeSpotifyItem(itemId)
    expect(musicRepo.getPlaylist(playlistId)!.items).toEqual([])
    expect(musicRepo.getPlaylist(playlistId)).not.toBeNull()
  })
})

describe('liked + play history', () => {
  it('setLiked toggles and listTracks({likedOnly}) returns newest-liked first', () => {
    const t1 = seedTrack({ title: 'One', path: 'p1' })
    const t2 = seedTrack({ title: 'Two', path: 'p2' })
    musicRepo.setLiked(t1, true)
    musicRepo.setLiked(t2, true)
    // force a deterministic order (datetime('now') is second-resolution)
    db.prepare(`UPDATE music_track SET liked_at = '2026-01-02' WHERE id = ?`).run(t2)
    db.prepare(`UPDATE music_track SET liked_at = '2026-01-01' WHERE id = ?`).run(t1)

    expect(musicRepo.listTracks({ likedOnly: true }).map((t) => t.title)).toEqual(['Two', 'One'])
    musicRepo.setLiked(t2, false)
    expect(musicRepo.listTracks({ likedOnly: true }).map((t) => t.title)).toEqual(['One'])
  })

  it('logPlay feeds recentlyPlayed and mostPlayed', () => {
    const t1 = seedTrack({ title: 'One', path: 'p1' })
    const t2 = seedTrack({ title: 'Two', path: 'p2' })
    musicRepo.logPlay(t1)
    musicRepo.logPlay(t1)
    musicRepo.logPlay(t2)
    db.prepare(`UPDATE music_track SET last_played_at = '2026-01-01' WHERE id = ?`).run(t1)
    db.prepare(`UPDATE music_track SET last_played_at = '2026-01-02' WHERE id = ?`).run(t2)

    expect(musicRepo.recentlyPlayed().map((t) => t.title)).toEqual(['Two', 'One'])
    expect(musicRepo.mostPlayed().map((t) => t.title)).toEqual(['One', 'Two'])
    expect(musicRepo.mostPlayed()[0].playCount).toBe(2)
  })
})

// ---------------------------------------------------------------------------
// Stats (music_play_log + statsDetail)
// ---------------------------------------------------------------------------

function seedPlay(trackId: number, playedAt: string, duration = 200): void {
  db.prepare(
    'INSERT INTO music_play_log (track_id, played_at, duration) VALUES (?, ?, ?)'
  ).run(trackId, playedAt, duration)
}

// Timestamps relative to now — the SQL windows compare against date('now').
const daysAgo = (n: number, time = '12:00:00'): string =>
  new Date(Date.now() - n * 86_400_000).toISOString().slice(0, 10) + ' ' + time
const dayOf = (ts: string): string => ts.slice(0, 10)

describe('play log', () => {
  it('logPlay bumps counters AND appends a log row with a duration snapshot', () => {
    const t1 = seedTrack({ title: 'One', path: 'p1' })
    musicRepo.logPlay(t1)
    const track = db.prepare('SELECT play_count, last_played_at FROM music_track WHERE id = ?').get(t1) as Record<string, unknown>
    expect(track.play_count).toBe(1)
    expect(track.last_played_at).not.toBeNull()
    const log = db.prepare('SELECT track_id, duration FROM music_play_log').all()
    expect(log).toEqual([{ track_id: t1, duration: 200 }])
  })

  it('logPlay for a vanished track id is a silent no-op', () => {
    expect(() => musicRepo.logPlay(999)).not.toThrow()
    expect(db.prepare('SELECT COUNT(*) AS n FROM music_play_log').get()).toEqual({ n: 0 })
  })

  it('deleting a track cascades its log rows away', () => {
    const t1 = seedTrack({ title: 'One', path: 'p1' })
    musicRepo.logPlay(t1)
    db.prepare('DELETE FROM music_track WHERE id = ?').run(t1)
    expect(db.prepare('SELECT COUNT(*) AS n FROM music_play_log').get()).toEqual({ n: 0 })
  })
})

describe('statsDetail', () => {
  it('window filtering: 7-day window includes today and 6 days back, not day 8', () => {
    const t1 = seedTrack({ title: 'One', path: 'p1' })
    seedPlay(t1, daysAgo(0))
    seedPlay(t1, daysAgo(6))
    seedPlay(t1, daysAgo(8))
    expect(musicRepo.statsDetail(7).tiles.plays).toBe(2)
    expect(musicRepo.statsDetail(28).tiles.plays).toBe(3)
    expect(musicRepo.statsDetail(7).tiles.seconds).toBe(400)
  })

  it('groups plays per local day and per hour', () => {
    const t1 = seedTrack({ title: 'One', path: 'p1' })
    seedPlay(t1, daysAgo(1, '03:00:00'))
    seedPlay(t1, daysAgo(1, '15:00:00'))
    seedPlay(t1, daysAgo(0, '15:30:00'))
    const s = musicRepo.statsDetail(7)
    expect(s.playsPerDay).toEqual([
      { day: dayOf(daysAgo(1)), plays: 2, seconds: 400 },
      { day: dayOf(daysAgo(0)), plays: 1, seconds: 200 }
    ])
    expect(s.playsByHour).toEqual([
      { hour: 3, plays: 1 },
      { hour: 15, plays: 2 }
    ])
  })

  it('period top lists rank by log plays and exclude out-of-window plays', () => {
    const t1 = seedTrack({ artist: 'A', album: 'AA', title: 'One', path: 'p1' })
    const t2 = seedTrack({ artist: 'A', album: 'AA', title: 'Two', path: 'p2' })
    const t3 = seedTrack({ artist: 'B', album: 'BB', title: 'Three', path: 'p3' })
    seedPlay(t1, daysAgo(1))
    seedPlay(t1, daysAgo(2))
    seedPlay(t2, daysAgo(1))
    seedPlay(t3, daysAgo(30)) // outside the 7-day window
    const s = musicRepo.statsDetail(7)
    expect(s.topTracks.map((t) => [t.track.title, t.plays])).toEqual([
      ['One', 2],
      ['Two', 1]
    ])
    expect(s.topArtists.map((a) => [a.name, a.plays])).toEqual([['A', 3]])
    expect(s.topAlbums.map((a) => [a.title, a.plays])).toEqual([['AA', 3]])
  })

  it('all-time falls back to play_count with an empty log (pre-log history)', () => {
    const t1 = seedTrack({ title: 'One', path: 'p1' })
    db.prepare('UPDATE music_track SET play_count = 5 WHERE id = ?').run(t1)
    const s = musicRepo.statsDetail(null)
    expect(s.logStartedAt).toBeNull()
    expect(s.tiles).toEqual({ plays: 5, seconds: 1000, distinctTracks: 1, distinctArtists: 1 })
    expect(s.topTracks.map((t) => [t.track.title, t.plays])).toEqual([['One', 5]])
    expect(s.topArtists[0]).toMatchObject({ name: 'Radiohead', plays: 5, seconds: 1000 })
    expect(s.playsPerDay).toEqual([])
    expect(s.newArtists).toEqual([])
  })

  it('discoveries: only artists whose FIRST logged play is inside the window', () => {
    const t1 = seedTrack({ artist: 'Old Favorite', album: 'X', title: 'One', path: 'p1' })
    const t2 = seedTrack({ artist: 'Fresh Find', album: 'Y', title: 'Two', path: 'p2' })
    seedPlay(t1, daysAgo(30))
    seedPlay(t1, daysAgo(2)) // played again recently, but not NEW
    seedPlay(t2, daysAgo(2))
    const s = musicRepo.statsDetail(7)
    expect(s.newArtists.map((a) => a.name)).toEqual(['Fresh Find'])
  })

  it('returns a fully-zeroed shape on an empty database (day-one page path)', () => {
    for (const days of [7, null] as const) {
      const s = musicRepo.statsDetail(days)
      expect(s.tiles).toEqual({ plays: 0, seconds: 0, distinctTracks: 0, distinctArtists: 0 })
      expect(s.streak).toEqual({ current: 0, longest: 0 })
      expect(s.playsPerDay).toEqual([])
      expect(s.topTracks).toEqual([])
      expect(s.logStartedAt).toBeNull()
      expect(s.library.tracks).toBe(0)
      expect(s.library.likedSeconds).toBe(0)
    }
  })

  it('library facts: decades, liked share, deepest artists', () => {
    const t1 = seedTrack({ artist: 'A', album: 'Nineties', title: 'One', path: 'p1', year: 1997 })
    seedTrack({ artist: 'A', album: 'Nineties', title: 'Two', path: 'p2', year: 1997 })
    seedTrack({ artist: 'B', album: 'Aughts', title: 'Three', path: 'p3', year: 2004 })
    musicRepo.setLiked(t1, true)
    const lib = musicRepo.statsDetail(null).library
    expect(lib.decades).toEqual([
      { decade: 1990, albums: 1, tracks: 2 },
      { decade: 2000, albums: 1, tracks: 1 }
    ])
    expect(lib.likedTracks).toBe(1)
    expect(lib.likedSeconds).toBe(200)
    expect(lib.avgTrackSeconds).toBe(200)
    expect(lib.deepestArtists.map((a) => [a.name, a.tracks])).toEqual([
      ['A', 2],
      ['B', 1]
    ])
  })
})

describe('computeStreaks', () => {
  const today = '2026-07-03'
  it('counts a run ending today', () => {
    expect(
      musicRepo.computeStreaks(['2026-07-03', '2026-07-02', '2026-07-01'], today)
    ).toEqual({ current: 3, longest: 3 })
  })
  it('yesterday-grace: no plays yet today keeps the streak alive', () => {
    expect(musicRepo.computeStreaks(['2026-07-02', '2026-07-01'], today)).toEqual({
      current: 2,
      longest: 2
    })
  })
  it('a two-day gap breaks the current streak but longest survives', () => {
    expect(
      musicRepo.computeStreaks(
        ['2026-06-30', '2026-06-29', '2026-06-28', '2026-06-27', '2026-06-26'],
        today
      )
    ).toEqual({ current: 0, longest: 5 })
  })
  it('an old long run beats a live short one for longest', () => {
    expect(
      musicRepo.computeStreaks(
        ['2026-07-03', '2026-07-02', '2026-06-20', '2026-06-19', '2026-06-18'],
        today
      )
    ).toEqual({ current: 2, longest: 3 })
  })
  it('handles month boundaries and empty input', () => {
    expect(musicRepo.computeStreaks(['2026-07-01', '2026-06-30'], '2026-07-01')).toEqual({
      current: 2,
      longest: 2
    })
    expect(musicRepo.computeStreaks([], today)).toEqual({ current: 0, longest: 0 })
  })
})
