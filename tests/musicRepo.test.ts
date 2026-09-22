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
  it('pages and sorts the track catalogue in SQL', () => {
    for (let i = 0; i < 60; i++) {
      const id = seedTrack({ title: `Track ${String(i).padStart(2, '0')}`, path: `track/${i}` })
      db.prepare('UPDATE music_track SET play_count = ? WHERE id = ?').run(i, id)
    }

    const first = musicRepo.listTrackPage({ sort: 'most', filter: 'all', offset: 0, limit: 48 })
    const second = musicRepo.listTrackPage({ sort: 'most', filter: 'all', offset: 48, limit: 48 })
    expect(first).toMatchObject({ total: 60, offset: 0, hasMore: true })
    expect(first.items[0].title).toBe('Track 59')
    expect(second.items).toHaveLength(12)
    expect(second.hasMore).toBe(false)
  })

  it('bounds whole-library playback queues and samples shuffle queues in SQL', () => {
    for (let i = 0; i < musicRepo.MAX_PLAYBACK_QUEUE_TRACKS + 1; i++) {
      seedTrack({ title: `Queue ${i}`, path: `queue/${i}` })
    }

    const catalog = musicRepo.playbackQueue(false)
    const shuffled = musicRepo.playbackQueue(true)
    expect(catalog).toMatchObject({
      total: musicRepo.MAX_PLAYBACK_QUEUE_TRACKS + 1,
      truncated: true
    })
    expect(catalog.items).toHaveLength(musicRepo.MAX_PLAYBACK_QUEUE_TRACKS)
    expect(shuffled.items).toHaveLength(musicRepo.MAX_PLAYBACK_QUEUE_TRACKS)
    expect(new Set(shuffled.items.map((track) => track.id)).size).toBe(
      musicRepo.MAX_PLAYBACK_QUEUE_TRACKS
    )
  })

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

  it('collapses exact duplicate files to the oldest row for automatic source linkage', () => {
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
    const linked = db.prepare(
      `SELECT al.spotify_id AS album_source, ar.spotify_id AS artist_source
       FROM music_track t JOIN music_album al ON al.id=t.album_id
       JOIN music_artist ar ON ar.id=t.artist_id WHERE t.id=?`
    ).get(first)
    expect(linked).toEqual({ album_source: 'spotify-album', artist_source: 'spotify-artist' })
    expect(duplicate).toBeGreaterThan(first)
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

  it('keeps an unverified downloaded file out of missing counts until confirmed', () => {
    const local = seedTrack({ artist: 'Artist', album: 'Deluxe', title: 'Song', path: 'deluxe/song.mp3' })
    const playlistId = musicRepo.createPlaylist({ title: 'Verified later' })
    db.prepare(
      `INSERT INTO music_spotify_playlist (playlist_id, spotify_id, source_url)
       VALUES (?, 'candidate-source', 'https://open.spotify.com/playlist/candidate-source')`
    ).run(playlistId)
    const info = db.prepare(
      `INSERT INTO music_spotify_playlist_item
       (playlist_id, spotify_track_id, position, title, artists_json, primary_artist,
        album_title, duration, spotify_url, raw_json)
       VALUES (?, 'candidate-song', 0, 'Song', '["Artist"]', 'Artist', 'Album', 200,
               'https://open.spotify.com/track/candidate-song', '{}')`
    ).run(playlistId)
    const itemId = Number(info.lastInsertRowid)
    db.prepare(
      `INSERT INTO music_spotify_download_candidate
       (playlist_item_id, local_track_id, provider, source_url)
       VALUES (?, ?, 'youtube-music', NULL)`
    ).run(itemId, local)

    const detail = musicRepo.getPlaylist(playlistId)!
    expect(detail.missingCount).toBe(0)
    expect(detail.verificationCount).toBe(1)
    expect(detail.items[0]).toMatchObject({
      kind: 'spotify',
      matchedTrack: null,
      downloadCandidate: { localTrack: { id: local, title: 'Song' } }
    })
    spotifyRepo.confirmDownloadCandidate({ sourceKind: 'playlistItem', trackId: itemId })
    expect(musicRepo.getPlaylist(playlistId)!.playableCount).toBe(1)
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

  it('reuses a unique deluxe recording and preserves an explicit local-version choice', () => {
    const deluxe = seedTrack({ artist: 'Artist', album: 'Album (Deluxe)', title: 'Song', path: 'deluxe.mp3' })
    db.prepare('UPDATE music_track SET duration=205 WHERE id=?').run(deluxe)
    const playlistId = musicRepo.createPlaylist({ title: 'Imported mix' })
    db.prepare(
      `INSERT INTO music_spotify_playlist (playlist_id, spotify_id, source_url)
       VALUES (?, 'compatible-source', 'https://open.spotify.com/playlist/compatible-source')`
    ).run(playlistId)
    db.prepare(
      `INSERT INTO music_spotify_playlist_item
       (playlist_id, spotify_track_id, position, title, artists_json, primary_artist,
        album_title, duration, spotify_url, raw_json)
       VALUES (?, 'song-id', 0, 'Song', '["Artist"]', 'Artist', 'Album', 200,
               'https://open.spotify.com/track/song-id', '{}')`
    ).run(playlistId)

    expect(spotifyRepo.resolveAllSpotifyItems()).toBe(1)
    expect(musicRepo.getPlaylist(playlistId)!.items[0]).toMatchObject({
      kind: 'spotify',
      matchedTrack: { id: deluxe, albumTitle: 'Album (Deluxe)' }
    })

    const hits = seedTrack({ artist: 'Artist', album: 'Greatest Hits', title: 'Song', path: 'hits.mp3' })
    db.prepare('UPDATE music_track SET duration=211 WHERE id=?').run(hits)
    db.prepare('UPDATE music_track SET duration=210 WHERE id=?').run(deluxe)
    db.prepare('UPDATE music_spotify_playlist_item SET matched_track_id=NULL WHERE playlist_id=?').run(playlistId)
    spotifyRepo.resolveAllSpotifyItems()
    const unresolved = musicRepo.getPlaylist(playlistId)!.items[0]
    expect(unresolved).toMatchObject({ kind: 'spotify', matchedTrack: null })
    if (unresolved.kind !== 'spotify') throw new Error('Expected Spotify item')
    expect(unresolved.localAlternatives.map((track) => track.id)).toEqual([deluxe, hits])

    const queued = spotifyRepo.addPlaylistToDownloadQueue({
      playlistId,
      itemIds: [unresolved.itemId]
    })
    expect(queued.jobId).toBeNull()
    spotifyRepo.matchPlaylistItemToLocalTrack({ itemId: unresolved.itemId, trackId: hits })
    spotifyRepo.resolveAllSpotifyItems()
    expect(musicRepo.getPlaylist(playlistId)!.items[0]).toMatchObject({
      kind: 'spotify',
      matchedTrack: { id: hits, albumTitle: 'Greatest Hits' },
      localAlternatives: [{ id: deluxe, albumTitle: 'Album (Deluxe)' }]
    })
  })

  it('does not download over conservative local alternatives', () => {
    const first = seedTrack({ artist: 'Artist', album: 'Album (Deluxe)', title: 'Song', path: 'deluxe.mp3' })
    const second = seedTrack({ artist: 'Artist', album: 'Greatest Hits', title: 'Song', path: 'hits.mp3' })
    db.prepare('UPDATE music_track SET duration=205 WHERE id IN (?, ?)').run(first, second)
    const playlistId = musicRepo.createPlaylist({ title: 'Imported mix' })
    db.prepare(`INSERT INTO music_spotify_playlist (playlist_id, spotify_id, source_url)
      VALUES (?, 'review-source', 'https://open.spotify.com/playlist/review-source')`).run(playlistId)
    const itemId = Number(db.prepare(`INSERT INTO music_spotify_playlist_item
      (playlist_id, spotify_track_id, position, title, artists_json, primary_artist,
       album_title, duration, spotify_url, raw_json)
      VALUES (?, 'review-song', 0, 'Song', '["Artist"]', 'Artist', 'Album', 200,
              'https://open.spotify.com/track/review-song', '{}')`).run(playlistId).lastInsertRowid)

    expect(spotifyRepo.resolveAllSpotifyItems()).toBe(0)
    expect(spotifyRepo.pendingSpotifyItems(playlistId, [itemId])).toEqual([])
    expect(musicRepo.getPlaylist(playlistId)!.items[0]).toMatchObject({
      localAlternatives: [{ id: first }, { id: second }]
    })
  })

  it('automatically links an exact duplicate group to its oldest local file', () => {
    const oldest = seedTrack({ artist: 'Artist', album: 'Album', title: 'Song', path: 'original.mp3' })
    seedTrack({ artist: 'Artist', album: 'Album', title: 'Song', path: 'later-copy.mp3' })
    const playlistId = musicRepo.createPlaylist({ title: 'Imported mix' })
    db.prepare(`INSERT INTO music_spotify_playlist (playlist_id, spotify_id, source_url)
      VALUES (?, 'duplicate-source', 'https://open.spotify.com/playlist/duplicate-source')`).run(playlistId)
    db.prepare(`INSERT INTO music_spotify_playlist_item
      (playlist_id, spotify_track_id, position, title, artists_json, primary_artist,
       album_title, duration, spotify_url, raw_json)
      VALUES (?, 'duplicate-song', 0, 'Song', '["Artist"]', 'Artist', 'Album', 200,
              'https://open.spotify.com/track/duplicate-song', '{}')`).run(playlistId)

    expect(spotifyRepo.resolveAllSpotifyItems()).toBe(1)
    expect(musicRepo.getPlaylist(playlistId)!.items[0]).toMatchObject({
      matchedTrack: { id: oldest },
      localAlternatives: []
    })
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

function resolvedSong(): spotifyRepo.SpotdlSong {
  return {
    spotifyTrackId: 'spotify-track-1',
    title: 'Airbag',
    artists: ['Radiohead'],
    primaryArtist: 'Radiohead',
    albumArtist: 'Radiohead',
    albumTitle: 'OK Computer',
    duration: 200,
    coverUrl: null,
    spotifyUrl: 'https://open.spotify.com/track/spotify-track-1',
    discNo: 1,
    trackNo: 1,
    year: 1997,
    rawJson: '{"song_id":"spotify-track-1"}',
    spotifyAlbumId: 'spotify-album-1',
    spotifyArtistId: 'spotify-artist-1',
    spotifyArtistIds: ['spotify-artist-1'],
    albumType: 'album'
  }
}

describe('persistent Spotify entity catalogue', () => {
  function indexedRelease(title = 'Airbag'): spotifyRepo.IndexedEntityRelease {
    return {
      providerReleaseId: 'itunes-album-1',
      title: 'OK Computer',
      albumArtist: 'Radiohead',
      year: 1997,
      albumType: 'album',
      tracks: [{
        providerTrackId: 'itunes-track-1',
        title,
        artists: ['Radiohead'],
        primaryArtist: 'Radiohead',
        albumTitle: 'OK Computer',
        duration: 200,
        discNo: 1,
        trackNo: 1
      }]
    }
  }

  it('persists indexed releases, matches locally, and returns the saved snapshot on repeat reads', () => {
    const trackId = seedTrack({ title: 'Airbag' })
    const artistId = (db.prepare('SELECT artist_id FROM music_track WHERE id=?').get(trackId) as { artist_id: number }).artist_id
    const snapshotId = spotifyRepo.saveEntitySnapshot({
      kind: 'artist',
      entityId: artistId,
      provider: 'itunes',
      providerEntityId: 'itunes-artist-1',
      sourceName: 'Radiohead',
      releases: [indexedRelease()]
    })

    const first = spotifyRepo.getEntitySnapshot('artist', artistId)!
    const repeat = spotifyRepo.getEntitySnapshotById(snapshotId)!
    expect(first.releases[0].tracks[0].matchedTrackId).toBe(trackId)
    expect(repeat).toEqual(first)
  })

  it('preserves authoritative spotDL payloads across catalogue refreshes with the same release identity', () => {
    const trackId = seedTrack({ title: 'Airbag' })
    const artistId = (db.prepare('SELECT artist_id FROM music_track WHERE id=?').get(trackId) as { artist_id: number }).artist_id
    spotifyRepo.saveEntitySnapshot({
      kind: 'artist', entityId: artistId, provider: 'itunes', providerEntityId: 'itunes-artist-1',
      sourceName: 'Radiohead', releases: [indexedRelease()]
    })
    const releaseId = spotifyRepo.getEntitySnapshot('artist', artistId)!.releases[0].id
    spotifyRepo.resolveEntityRelease(releaseId, [resolvedSong()])
    spotifyRepo.saveEntitySnapshot({
      kind: 'artist', entityId: artistId, provider: 'itunes', providerEntityId: 'itunes-artist-1',
      sourceName: 'Radiohead', releases: [indexedRelease('Provider renamed this track')]
    })

    expect(spotifyRepo.getEntitySnapshot('artist', artistId)!.releases[0]).toMatchObject({
      metadataState: 'resolved',
      spotifyAlbumId: 'spotify-album-1',
      tracks: [{ title: 'Airbag', rawJson: '{"song_id":"spotify-track-1"}' }]
    })
  })

  it('restores a complete indexed tracklist when a previous Spotify resolution was truncated', () => {
    const trackId = seedTrack({ title: 'Different local song' })
    const artistId = (db.prepare('SELECT artist_id FROM music_track WHERE id=?').get(trackId) as { artist_id: number }).artist_id
    const release = indexedRelease('Song 1')
    release.tracks = [1, 2, 3].map((trackNo) => ({
      providerTrackId: `itunes-${trackNo}`,
      title: `Song ${trackNo}`,
      artists: ['Radiohead'],
      primaryArtist: 'Radiohead',
      albumTitle: 'OK Computer',
      duration: 200 + trackNo,
      discNo: 1,
      trackNo
    }))
    spotifyRepo.saveEntitySnapshot({
      kind: 'artist', entityId: artistId, provider: 'itunes', providerEntityId: 'itunes-artist-1',
      sourceName: 'Radiohead', releases: [release]
    })
    const releaseId = spotifyRepo.getEntitySnapshot('artist', artistId)!.releases[0].id
    spotifyRepo.resolveEntityRelease(releaseId, [1, 3].map((trackNo) => ({
      ...resolvedSong(),
      spotifyTrackId: `spotify-${trackNo}`,
      title: `Song ${trackNo}`,
      duration: 200 + trackNo,
      trackNo,
      rawJson: JSON.stringify({ song_id: `spotify-${trackNo}` })
    })))

    spotifyRepo.saveEntitySnapshot({
      kind: 'artist', entityId: artistId, provider: 'itunes', providerEntityId: 'itunes-artist-1',
      sourceName: 'Radiohead', releases: [release]
    })

    const restored = spotifyRepo.getEntitySnapshot('artist', artistId)!.releases[0]
    expect(restored.metadataState).toBe('indexed')
    expect(restored.tracks).toHaveLength(3)
    expect(restored.tracks.map((track) => track.title)).toEqual(['Song 1', 'Song 2', 'Song 3'])
    expect(restored.tracks.map((track) => track.rawJson != null)).toEqual([true, false, true])
  })

  it('turns deleted matches grey, resolves replacements after a scan, and cascades with the artist', () => {
    const trackId = seedTrack({ title: 'Airbag' })
    const artistId = (db.prepare('SELECT artist_id FROM music_track WHERE id=?').get(trackId) as { artist_id: number }).artist_id
    spotifyRepo.saveEntitySnapshot({
      kind: 'artist', entityId: artistId, provider: 'itunes', providerEntityId: 'itunes-artist-1',
      sourceName: 'Radiohead', releases: [indexedRelease()]
    })
    db.prepare('DELETE FROM music_track WHERE id=?').run(trackId)
    expect(spotifyRepo.getEntitySnapshot('artist', artistId)!.releases[0].tracks[0].matchedTrackId).toBeNull()

    const replacement = seedTrack({ title: 'Airbag', path: 'Radiohead/OK Computer/replacement.mp3' })
    spotifyRepo.resolveAllSpotifyItems()
    expect(spotifyRepo.getEntitySnapshot('artist', artistId)!.releases[0].tracks[0].matchedTrackId).toBe(replacement)

    db.prepare('DELETE FROM music_artist WHERE id=?').run(artistId)
    expect(db.prepare('SELECT COUNT(*) AS n FROM music_spotify_entity_snapshot').get()).toEqual({ n: 0 })
  })

  it('merges duplicate release selections and preserves their order through catalogue refreshes', () => {
    const trackId = seedTrack({ title: 'Different local song' })
    const artistId = (db.prepare('SELECT artist_id FROM music_track WHERE id=?').get(trackId) as { artist_id: number }).artist_id
    const snapshotId = spotifyRepo.saveEntitySnapshot({
      kind: 'artist', entityId: artistId, provider: 'itunes', providerEntityId: 'itunes-artist-1',
      sourceName: 'Radiohead', releases: [indexedRelease('Missing song')]
    })
    const releaseId = spotifyRepo.getEntitySnapshotById(snapshotId)!.releases[0].id

    expect(spotifyRepo.addEntityToDownloadQueue({ snapshotId, releaseIds: [releaseId] })).toMatchObject({
      addedSelections: 1,
      missingCount: 1
    })
    expect(spotifyRepo.addEntityToDownloadQueue({ snapshotId, releaseIds: [releaseId] })).toMatchObject({
      addedSelections: 0,
      missingCount: 1
    })
    expect(spotifyRepo.listDownloadQueue().pending).toHaveLength(1)
    expect(spotifyRepo.listDownloadQueue().pending[0].selections).toHaveLength(1)

    spotifyRepo.saveEntitySnapshot({
      kind: 'artist', entityId: artistId, provider: 'itunes', providerEntityId: 'itunes-artist-1',
      sourceName: 'Radiohead', releases: [indexedRelease('Missing song')]
    })
    expect(spotifyRepo.listDownloadQueue().pending[0].selections[0].sourceId).toBe(releaseId)
  })

  it('keeps completed cards until cleared and normalizes interrupted work to paused', () => {
    const trackId = seedTrack({ title: 'Different local song' })
    const artistId = (db.prepare('SELECT artist_id FROM music_track WHERE id=?').get(trackId) as { artist_id: number }).artist_id
    const snapshotId = spotifyRepo.saveEntitySnapshot({
      kind: 'artist', entityId: artistId, provider: 'itunes', providerEntityId: 'itunes-artist-1',
      sourceName: 'Radiohead', releases: [indexedRelease('Missing song')]
    })
    const releaseId = spotifyRepo.getEntitySnapshotById(snapshotId)!.releases[0].id
    const jobId = spotifyRepo.addEntityToDownloadQueue({ snapshotId, releaseIds: [releaseId] }).jobId!

    spotifyRepo.setDownloadQueueCardState(jobId, 'running', null, true)
    expect(spotifyRepo.normalizeInterruptedDownloadQueue()).toBe(1)
    expect(spotifyRepo.getDownloadQueueCard(jobId)).toMatchObject({ state: 'paused', continueAfter: true })
    spotifyRepo.addEntityToDownloadQueue({ snapshotId, releaseIds: [releaseId] })
    expect(spotifyRepo.getDownloadQueueCard(jobId)).toMatchObject({ state: 'paused', continueAfter: true })

    const downloadedTrackId = seedTrack({
      title: 'Missing song',
      path: 'Radiohead/OK Computer/downloaded.mp3'
    })
    spotifyRepo.resolveAllSpotifyItems()
    spotifyRepo.setDownloadQueueCardState(jobId, 'completed')
    expect(spotifyRepo.listDownloadQueue().completed).toHaveLength(1)

    db.prepare('DELETE FROM music_track WHERE id=?').run(downloadedTrackId)
    expect(spotifyRepo.listDownloadQueue().pending[0]).toMatchObject({
      id: jobId,
      state: 'queued',
      missingCount: 1
    })
    spotifyRepo.resolveAllSpotifyItems()
    spotifyRepo.setDownloadQueueCardState(jobId, 'completed')
    expect(spotifyRepo.clearCompletedDownloadQueue()).toBe(1)
    expect(spotifyRepo.listDownloadQueue().completed).toHaveLength(0)
  })

  it('queues imported playlist rows and prunes queue cards when their sources disappear', () => {
    const created = spotifyRepo.createSpotifyPlaylist({
      spotifyId: 'playlist-source',
      sourceUrl: 'https://open.spotify.com/playlist/playlist-source',
      title: 'Imported mix',
      songs: [{ ...resolvedSong(), spotifyTrackId: 'playlist-track', title: 'Missing playlist song', coverPath: null }]
    })
    const itemId = (db.prepare(
      'SELECT id FROM music_spotify_playlist_item WHERE playlist_id=?'
    ).get(created.playlistId) as { id: number }).id
    const added = spotifyRepo.addPlaylistToDownloadQueue({
      playlistId: created.playlistId,
      itemIds: [itemId]
    })
    expect(added).toMatchObject({ addedSelections: 1, missingCount: 1 })
    expect(spotifyRepo.listDownloadQueue().pending[0]).toMatchObject({
      sourceKind: 'playlist',
      playlistId: created.playlistId,
      missingCount: 1
    })

    spotifyRepo.removeSpotifyItem(itemId)
    expect(spotifyRepo.listDownloadQueue().pending).toHaveLength(0)
  })
})

describe('Spotify recovery decisions', () => {
  function fixture() {
    const local = seedTrack({ artist: 'Artist', album: 'Album', title: 'Song', path: 'Artist/Album/1 - Song [navihub-id].opus' })
    db.prepare('UPDATE music_track SET duration=230 WHERE id=?').run(local)
    const playlist = musicRepo.createPlaylist({ title: 'Mix' })
    db.prepare("INSERT INTO music_spotify_playlist (playlist_id,spotify_id,source_url) VALUES (?,'source','https://open.spotify.com/playlist/source')").run(playlist)
    const item = Number(db.prepare(`INSERT INTO music_spotify_playlist_item
      (playlist_id,spotify_track_id,position,title,artists_json,primary_artist,album_title,duration,spotify_url,raw_json,allow_unverified)
      VALUES (?,'id',0,'Song','["Artist"]','Artist','Album',200,'https://open.spotify.com/track/id','{}',1)`).run(playlist).lastInsertRowid)
    return { local, playlist, item }
  }

  it('keeps an explicit playlist recording through later scans, including large duration differences', () => {
    const { local, item } = fixture()
    spotifyRepo.matchPlaylistItemToLocalTrack({ itemId: item, trackId: local, confirm: true })
    spotifyRepo.resolveAllSpotifyItems()
    expect(db.prepare('SELECT matched_track_id, match_confirmed FROM music_spotify_playlist_item WHERE id=?').get(item))
      .toEqual({ matched_track_id: local, match_confirmed: 1 })
    db.prepare('DELETE FROM music_track WHERE id=?').run(local)
    spotifyRepo.resolveAllSpotifyItems()
    expect(db.prepare('SELECT matched_track_id FROM music_spotify_playlist_item WHERE id=?').get(item)).toEqual({ matched_track_id: null })
  })

  it('never auto-accepts a broader result even when written tags and duration match', () => {
    const { local, item } = fixture()
    db.prepare('UPDATE music_track SET duration=200 WHERE id=?').run(local)
    spotifyRepo.resolveAllSpotifyItems()
    expect(db.prepare('SELECT matched_track_id FROM music_spotify_playlist_item WHERE id=?').get(item)).toEqual({ matched_track_id: null })
    expect(db.prepare('SELECT spotify_review_required FROM music_track WHERE id=?').get(local)).toEqual({ spotify_review_required: 1 })
    spotifyRepo.linkProvenanceTracks([{ sourceKind: 'playlistItem', sourceId: item, spotifyTrackId: 'id', marker: '[navihub-id]', manual: false, provider: 'youtube', sourceUrl: 'https://www.youtube.com/watch?v=abcdefghijk' }])
    expect(spotifyRepo.downloadCandidate('playlistItem', item)?.localTrackId).toBe(local)
    spotifyRepo.resolveAllSpotifyItems()
    expect(spotifyRepo.downloadCandidate('playlistItem', item)).not.toBeNull()
    spotifyRepo.confirmDownloadCandidate({ sourceKind: 'playlistItem', trackId: item })
    spotifyRepo.resolveAllSpotifyItems()
    expect(spotifyRepo.downloadCandidate('playlistItem', item)).toBeNull()
  })

  it('retains an explicitly confirmed entity candidate through strict rescans', () => {
    const { local } = fixture()
    const artist = (db.prepare('SELECT artist_id FROM music_track WHERE id=?').get(local) as { artist_id: number }).artist_id
    const snapshot = spotifyRepo.saveEntitySnapshot({ kind: 'artist', entityId: artist, provider: 'itunes', providerEntityId: 'a', sourceName: 'Artist', releases: [{ providerReleaseId: 'r', title: 'Album', albumArtist: 'Artist', year: null, albumType: 'album', tracks: [{ providerTrackId: 't', title: 'Song', artists: ['Artist'], primaryArtist: 'Artist', albumTitle: 'Album', duration: 200, discNo: 1, trackNo: 1 }] }] })
    const trackId = spotifyRepo.getEntitySnapshotById(snapshot)!.releases[0].tracks[0].id
    spotifyRepo.setDownloadCandidate({ sourceKind: 'entityTrack', sourceId: trackId, localTrackId: local, provider: 'youtube' })
    spotifyRepo.confirmDownloadCandidate({ sourceKind: 'entityTrack', trackId })
    spotifyRepo.resolveAllSpotifyItems()
    expect(spotifyRepo.getEntitySnapshotById(snapshot)!.releases[0].tracks[0].matchedTrackId).toBe(local)
    db.prepare("UPDATE music_spotify_entity_track SET spotify_track_id='chosen-song' WHERE id=?").run(trackId)
    spotifyRepo.rememberSpotifyTrackChoice('chosen-song', local)
    db.prepare('UPDATE music_spotify_entity_track SET matched_track_id=NULL, match_confirmed=0 WHERE id=?').run(trackId)
    spotifyRepo.resolveAllSpotifyItems()
    expect(spotifyRepo.getEntitySnapshotById(snapshot)!.releases[0].tracks[0].matchedTrackId).toBe(local)
  })

  it('refreshes source metadata without erasing manual playlist decisions', () => {
    const { local, item, playlist } = fixture()
    spotifyRepo.matchPlaylistItemToLocalTrack({ itemId: item, trackId: local, confirm: true })
    const refreshed = spotifyRepo.createSpotifyPlaylist({ playlistId: playlist, complete: true,
      spotifyId: 'source', sourceUrl: 'https://open.spotify.com/playlist/source', title: 'Renamed remotely',
      songs: [{ ...resolvedSong(), spotifyTrackId: 'id', title: 'Corrected title', coverPath: null }] })
    expect(refreshed.matched).toBe(1)
    expect(db.prepare('SELECT id, title, matched_track_id, match_confirmed FROM music_spotify_playlist_item WHERE playlist_id=?').get(playlist))
      .toEqual({ id: item, title: 'Corrected title', matched_track_id: local, match_confirmed: 1 })
    expect(db.prepare('SELECT title FROM music_playlist WHERE id=?').get(playlist)).toEqual({ title: 'Mix' })
  })

  it('reuses one explicit choice across playlists and future imports', () => {
    const { local, item } = fixture()
    const secondPlaylist = musicRepo.createPlaylist({ title: 'Other mix' })
    db.prepare("INSERT INTO music_spotify_playlist (playlist_id,spotify_id,source_url) VALUES (?,'other','https://open.spotify.com/playlist/other')").run(secondPlaylist)
    const secondItem = Number(db.prepare(`INSERT INTO music_spotify_playlist_item
      (playlist_id,spotify_track_id,position,title,artists_json,primary_artist,album_title,duration,spotify_url,raw_json)
      VALUES (?,'id',0,'Song','["Artist"]','Artist','Album',200,'https://open.spotify.com/track/id','{}')`).run(secondPlaylist).lastInsertRowid)

    spotifyRepo.matchPlaylistItemToLocalTrack({ itemId: item, trackId: local, confirm: true })
    expect(db.prepare('SELECT matched_track_id, match_confirmed FROM music_spotify_playlist_item WHERE id=?').get(secondItem))
      .toEqual({ matched_track_id: local, match_confirmed: 1 })
    expect(db.prepare('SELECT local_track_id FROM music_spotify_track_choice WHERE spotify_track_id=?').get('id'))
      .toEqual({ local_track_id: local })

    const future = spotifyRepo.createSpotifyPlaylist({
      spotifyId: 'future', sourceUrl: 'https://open.spotify.com/playlist/future', title: 'Future mix',
      songs: [{ ...resolvedSong(), spotifyTrackId: 'id', title: 'Different provider title', coverPath: null }]
    })
    expect(musicRepo.getPlaylist(future.playlistId)!.items[0]).toMatchObject({ matchedTrack: { id: local } })
    // Exercise the resolver independently of existing row-level confirmation.
    db.prepare('UPDATE music_spotify_playlist_item SET matched_track_id=NULL, match_confirmed=0 WHERE playlist_id=?').run(future.playlistId)
    spotifyRepo.resolveAllSpotifyItems()
    expect(musicRepo.getPlaylist(future.playlistId)!.items[0]).toMatchObject({ matchedTrack: { id: local } })

  })

  it('treats an explicit empty download selection as no work', () => {
    const { playlist } = fixture()
    expect(spotifyRepo.pendingSpotifyItems(playlist, [])).toEqual([])
    expect(spotifyRepo.pendingSpotifyItems(playlist)).toHaveLength(1)
  })

  it('excludes skipped tracks from bulk download and restores them explicitly', () => {
    const { item, playlist } = fixture()
    spotifyRepo.skipPlaylistDownload(item, true)
    expect(spotifyRepo.pendingSpotifyItems(playlist)).toHaveLength(0)
    spotifyRepo.skipPlaylistDownload(item, false)
    expect(spotifyRepo.pendingSpotifyItems(playlist)).toHaveLength(1)
  })
})


describe('music audit regressions', () => {
  function playlistWith(trackId: number): { playlistId: number; itemId: number } {
    const playlistId = musicRepo.createPlaylist({ title: 'Source' })
    db.prepare("INSERT INTO music_spotify_playlist(playlist_id,spotify_id,source_url) VALUES(?,'source','url')").run(playlistId)
    const itemId = Number(db.prepare(`INSERT INTO music_spotify_playlist_item
      (playlist_id,spotify_track_id,position,title,artists_json,primary_artist,album_title,duration,spotify_url,raw_json,matched_track_id)
      VALUES(?,'song',0,'Airbag','["Radiohead"]','Radiohead','OK Computer',200,'url','{}',?)`).run(playlistId, trackId).lastInsertRowid)
    return { playlistId, itemId }
  }

  it('uses source membership for add/remove toggles and prevents double additions', () => {
    const local = seedTrack({})
    const { playlistId } = playlistWith(local)
    expect(musicRepo.playlistsForTrack(local)).toContainEqual(expect.objectContaining({ id: playlistId, contains: true }))
    musicRepo.addPlaylistTracks(playlistId, [local])
    expect(musicRepo.getPlaylist(playlistId)!.items).toHaveLength(1)
    musicRepo.removePlaylistTrackByTrack(playlistId, local)
    expect(musicRepo.getPlaylist(playlistId)!.items).toHaveLength(0)
    expect(musicRepo.playlistsForTrack(local)[0].contains).toBe(false)
  })

  it('excludes rejected candidates from local alternatives while permitting retry', () => {
    const local = seedTrack({})
    const { playlistId, itemId } = playlistWith(local)
    db.prepare('UPDATE music_spotify_playlist_item SET matched_track_id=NULL').run()
    expect(musicRepo.getPlaylist(playlistId)!.items[0].localAlternatives).toHaveLength(1)
    spotifyRepo.setDownloadCandidate({ sourceKind: 'playlistItem', sourceId: itemId, localTrackId: local, provider: 'youtube' })
    spotifyRepo.rejectDownloadCandidate('playlistItem', itemId)
    expect(musicRepo.getPlaylist(playlistId)!.items[0].localAlternatives).toHaveLength(0)
    expect(spotifyRepo.pendingSpotifyItems(playlistId)).toHaveLength(1)
  })

  it('refreshes cached alternatives after metadata changes and reads likes fresh', () => {
    const local = seedTrack({})
    const { playlistId } = playlistWith(local)
    db.prepare('UPDATE music_spotify_playlist_item SET matched_track_id=NULL').run()
    expect(musicRepo.getPlaylist(playlistId)!.items[0].localAlternatives).toHaveLength(1)
    musicRepo.setLiked(local, true)
    expect(musicRepo.getPlaylist(playlistId)!.items[0].localAlternatives[0].likedAt).not.toBeNull()
    db.prepare("UPDATE music_track SET title='Different'").run()
    expect(musicRepo.getPlaylist(playlistId)!.items[0].localAlternatives).toHaveLength(0)
  })

  it('rejects different recordings in strict entity matching', () => {
    const song = { title: 'Song', primaryArtist: 'Artist', albumTitle: 'Studio Album', duration: 200 }
    for (const albumTitle of ['Live at the Arena', 'Album Acoustic', 'Album Remix']) {
      expect(spotifyRepo.matchSpotifySong(song, [{ id: 1, title: 'Song', folderArtist: 'Artist', tagArtist: null, albumTitle, duration: 200 }])).toBeNull()
    }
  })
})


it('links remaster titles through import, targeted indexing and the download guard', () => {
  const source = spotifyRepo.createSpotifyPlaylist({
    spotifyId: 'remaster-list', sourceUrl: 'url', title: 'Remasters',
    songs: [{ ...resolvedSong(), spotifyTrackId: 'hey-jude', title: 'Hey Jude Remaster 2005',
      artists: ['The Beatles'], primaryArtist: 'The Beatles', albumTitle: 'Collection', duration: 431, coverPath: null }]
  })
  expect(source.matched).toBe(0)
  const local = seedTrack({ title: 'Hey Jude', artist: 'The Beatles', album: 'Hey Jude' })
  db.prepare('UPDATE music_track SET duration=431 WHERE id=?').run(local)
  // A newly indexed original title must also visit remaster-named source rows.
  spotifyRepo.resolveAllSpotifyItems(['Hey Jude'])
  expect(musicRepo.getPlaylist(source.playlistId)!.items[0]).toMatchObject({ matchedTrack: { id: local } })
  expect(spotifyRepo.pendingSpotifyItems(source.playlistId)).toEqual([])
  const future = spotifyRepo.createSpotifyPlaylist({ spotifyId: 'future-remaster', sourceUrl: 'future-url', title: 'Future',
    songs: [{ ...resolvedSong(), spotifyTrackId: 'other-edition', title: 'Hey Jude - 2009 Remastered',
      artists: ['The Beatles'], primaryArtist: 'The Beatles', albumTitle: 'Compilation', duration: 431, coverPath: null }] })
  expect(future.matched).toBe(1)
})

describe('approved source provenance', () => {
  it('links an approved artifact once, but never approves an old staged file using new evidence', () => {
    const local = seedTrack({ artist: 'Artist', album: 'Album', title: 'Song', path: 'Artist/Album/Song [navirun-old] [navihub-abc123].opus' })
    db.prepare('UPDATE music_track SET duration=200 WHERE id=?').run(local)
    const playlist = musicRepo.createPlaylist({ title: 'New import' })
    db.prepare("INSERT INTO music_spotify_playlist(playlist_id,spotify_id,source_url) VALUES(?,'new','https://open.spotify.com/playlist/new')").run(playlist)
    const id = Number(db.prepare(`INSERT INTO music_spotify_playlist_item(playlist_id,spotify_track_id,position,title,artists_json,primary_artist,album_title,duration,spotify_url,raw_json,audio_source_url)
      VALUES(?,'abc123',0,'Song','["Artist"]','Artist','Album',200,'https://open.spotify.com/track/abc123','{}','https://www.youtube.com/watch?v=abcdefghijk')`).run(playlist).lastInsertRowid)
    const proof = { url: 'https://www.youtube.com/watch?v=abcdefghijk', title: 'Song', artist: 'Artist', channel: 'Artist', duration: 200, format: 'opus' as const, observedAt: Date.now() }
    spotifyRepo.saveSourceEvidence('playlistItem', id, proof, true, true)
    spotifyRepo.stampSourceArtifact('playlistItem', id, 'new')
    const refs = [{ sourceKind: 'playlistItem' as const, sourceId: id, spotifyTrackId: 'abc123', marker: '[navihub-abc123]', manual: true, provider: 'manual' as const, sourceUrl: proof.url }]
    spotifyRepo.linkProvenanceTracks(refs)
    expect(db.prepare('SELECT matched_track_id FROM music_spotify_playlist_item WHERE id=?').get(id)).toEqual({ matched_track_id: null })
    const current = seedTrack({ artist: 'Artist', album: 'Album', title: 'Song', path: 'Artist/Album/Song [navirun-new] [navihub-abc123].opus' })
    db.prepare('UPDATE music_track SET duration=200 WHERE id=?').run(current)
    spotifyRepo.linkProvenanceTracks(refs)
    expect(db.prepare('SELECT matched_track_id,match_confirmed FROM music_spotify_playlist_item WHERE id=?').get(id)).toEqual({ matched_track_id: current, match_confirmed: 1 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM music_spotify_download_candidate').get()).toEqual({ n: 0 })
    expect(spotifyRepo.provenanceFilePaths(['abc123'])).toEqual(['Artist/Album/Song [navirun-new] [navihub-abc123].opus'])
    expect(spotifyRepo.archivedAudioSource(proof.url).map((row) => row.id)).toEqual([current])
    expect(spotifyRepo.pendingSpotifyItems(playlist)).toEqual([])
    spotifyRepo.linkProvenanceTracks(refs)
    expect(spotifyRepo.archivedAudioSource(proof.url)).toHaveLength(1)
  })

  it('preserves unresolved duplicate markers for later source recovery', () => {
    seedTrack({ path: 'Artist/Album/Song [navirun-old] [navihub-abc123].opus' })
    seedTrack({ path: 'Artist/Album/Song [navirun-new] [navihub-abc123].opus' })
    expect(spotifyRepo.provenanceFilePaths(['abc123'])).toEqual([])
  })
})

it('retains occurrences across playlists while preserving a conflicting explicit source', () => {
  const first = seedTrack({ title: 'First', path: 'Artist/Album/first.opus' })
  const other = seedTrack({ title: 'Other', path: 'Artist/Album/other.opus' })
  const playlistFor = (n: number) => {
    const id = musicRepo.createPlaylist({ title: `Repeated recording ${n}` })
    db.prepare('INSERT INTO music_spotify_playlist(playlist_id,spotify_id,source_url) VALUES(?,?,?)').run(id, `duplicates-${n}`, `https://open.spotify.com/playlist/duplicates-${n}`)
    return id
  }
  const insert = db.prepare(`INSERT INTO music_spotify_playlist_item(playlist_id,spotify_track_id,position,title,artists_json,primary_artist,album_title,spotify_url,raw_json,audio_source_url,matched_track_id)
    VALUES(?,'same',?,'Song','["Artist"]','Artist','Album','https://open.spotify.com/track/same','{}',?,?)`)
  for (let n = 0; n < 200; n++) insert.run(playlistFor(n), n, null, null)
  insert.run(playlistFor(200), 200, 'https://www.youtube.com/watch?v=otherchoice', other)
  spotifyRepo.linkVerifiedSource('same', first, 'https://www.youtube.com/watch?v=abcdefghijk')
  expect(db.prepare('SELECT COUNT(*) AS n FROM music_spotify_playlist_item WHERE matched_track_id=?').get(first)).toEqual({ n: 200 })
  expect(db.prepare('SELECT matched_track_id FROM music_spotify_playlist_item WHERE position=200').get()).toEqual({ matched_track_id: other })
  spotifyRepo.rememberSpotifyTrackChoice('same', first)
  expect(db.prepare('SELECT matched_track_id FROM music_spotify_playlist_item WHERE position=200').get()).toEqual({ matched_track_id: other })
})
