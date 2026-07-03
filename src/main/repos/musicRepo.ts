import { getSqlite } from '../db/connection'
import type {
  MusicAlbumDetail,
  MusicAlbumSummary,
  MusicArtist,
  MusicArtistDetail,
  MusicLibraryStats,
  MusicPlaylistDetail,
  MusicPlaylistSummary,
  MusicSearchResults,
  MusicStatsDetail,
  MusicTrack
} from '@shared/types'

// Queries for the standalone music library. Rows come from the scanner
// (src/main/music.ts); this repo owns the user-state writes (likes, plays,
// playlists) the scanner must never touch.

// Every track is returned with its album/artist names + album cover joined in,
// so the renderer can build a player Track with zero extra queries. Split so
// stats queries can reuse the column list with their own FROM clause.
const TRACK_COLS = `t.id, t.album_id, t.artist_id, t.file_path, t.title, t.track_no, t.disc_no,
         t.duration, t.tag_artist, t.liked_at, t.play_count, t.last_played_at,
         al.title AS album_title, al.cover_path AS cover_path, ar.name AS artist_name`
const TRACK_JOINS = `
  FROM music_track t
  JOIN music_album al ON al.id = t.album_id
  JOIN music_artist ar ON ar.id = t.artist_id`
const TRACK_SELECT = `SELECT ${TRACK_COLS} ${TRACK_JOINS}`

function mapTrack(r: Record<string, unknown>): MusicTrack {
  return {
    id: r.id as number,
    albumId: r.album_id as number,
    albumTitle: r.album_title as string,
    artistId: r.artist_id as number,
    artistName: r.artist_name as string,
    tagArtist: (r.tag_artist as string) ?? null,
    filePath: r.file_path as string,
    title: r.title as string,
    trackNo: (r.track_no as number) ?? null,
    discNo: (r.disc_no as number) ?? null,
    duration: (r.duration as number) ?? null,
    likedAt: (r.liked_at as string) ?? null,
    playCount: r.play_count as number,
    lastPlayedAt: (r.last_played_at as string) ?? null,
    coverPath: (r.cover_path as string) ?? null
  }
}

function mapAlbumSummary(r: Record<string, unknown>): MusicAlbumSummary {
  return {
    id: r.id as number,
    artistId: r.artist_id as number,
    artistName: r.artist_name as string,
    title: r.title as string,
    year: (r.year as number) ?? null,
    coverPath: (r.cover_path as string) ?? null,
    trackCount: (r.track_count as number) ?? 0
  }
}

// ---- browse ----

export function listArtists(search?: string | null): MusicArtist[] {
  const where = search?.trim() ? 'WHERE a.name LIKE ?' : ''
  const params = search?.trim() ? [`%${search.trim()}%`] : []
  const rows = getSqlite()
    .prepare(
      `SELECT a.id, a.name, a.cover_path,
              COUNT(DISTINCT al.id) AS album_count, COUNT(t.id) AS track_count
       FROM music_artist a
       LEFT JOIN music_album al ON al.artist_id = a.id
       LEFT JOIN music_track t ON t.album_id = al.id
       ${where}
       GROUP BY a.id
       ORDER BY a.name COLLATE NOCASE ASC`
    )
    .all(...params) as Record<string, unknown>[]
  return rows.map((r) => ({
    id: r.id as number,
    name: r.name as string,
    coverPath: (r.cover_path as string) ?? null,
    albumCount: r.album_count as number,
    trackCount: r.track_count as number
  }))
}

export function listAlbums(search?: string | null): MusicAlbumSummary[] {
  const where = search?.trim() ? 'WHERE al.title LIKE ? OR ar.name LIKE ?' : ''
  const q = `%${search?.trim()}%`
  const params = search?.trim() ? [q, q] : []
  const rows = getSqlite()
    .prepare(
      `SELECT al.id, al.artist_id, al.title, al.year, al.cover_path,
              ar.name AS artist_name, COUNT(t.id) AS track_count
       FROM music_album al
       JOIN music_artist ar ON ar.id = al.artist_id
       LEFT JOIN music_track t ON t.album_id = al.id
       ${where}
       GROUP BY al.id
       ORDER BY ar.name COLLATE NOCASE ASC, al.year ASC, al.title COLLATE NOCASE ASC`
    )
    .all(...params) as Record<string, unknown>[]
  return rows.map(mapAlbumSummary)
}

export function getArtist(id: number): MusicArtistDetail | null {
  const db = getSqlite()
  const row = db.prepare('SELECT * FROM music_artist WHERE id = ?').get(id) as
    | Record<string, unknown>
    | undefined
  if (!row) return null
  const albums = (
    db
      .prepare(
        `SELECT al.id, al.artist_id, al.title, al.year, al.cover_path,
                ar.name AS artist_name, COUNT(t.id) AS track_count
         FROM music_album al
         JOIN music_artist ar ON ar.id = al.artist_id
         LEFT JOIN music_track t ON t.album_id = al.id
         WHERE al.artist_id = ?
         GROUP BY al.id
         ORDER BY al.year DESC, al.title COLLATE NOCASE ASC`
      )
      .all(id) as Record<string, unknown>[]
  ).map(mapAlbumSummary)
  const topTracks = (
    db
      .prepare(`${TRACK_SELECT} WHERE t.artist_id = ? AND t.play_count > 0
                ORDER BY t.play_count DESC, t.last_played_at DESC LIMIT 5`)
      .all(id) as Record<string, unknown>[]
  ).map(mapTrack)
  const total = db
    .prepare('SELECT COUNT(*) AS n FROM music_track WHERE artist_id = ?')
    .get(id) as { n: number }
  return {
    id: row.id as number,
    name: row.name as string,
    coverPath: (row.cover_path as string) ?? null,
    trackCount: total.n,
    albums,
    topTracks
  }
}

export function getAlbum(id: number): MusicAlbumDetail | null {
  const db = getSqlite()
  const row = db
    .prepare(
      `SELECT al.*, ar.name AS artist_name FROM music_album al
       JOIN music_artist ar ON ar.id = al.artist_id WHERE al.id = ?`
    )
    .get(id) as Record<string, unknown> | undefined
  if (!row) return null
  const tracks = (
    db
      .prepare(`${TRACK_SELECT} WHERE t.album_id = ?
                ORDER BY COALESCE(t.disc_no, 1) ASC, COALESCE(t.track_no, 9999) ASC, t.title COLLATE NOCASE ASC`)
      .all(id) as Record<string, unknown>[]
  ).map(mapTrack)
  return {
    id: row.id as number,
    artistId: row.artist_id as number,
    artistName: row.artist_name as string,
    title: row.title as string,
    year: (row.year as number) ?? null,
    coverPath: (row.cover_path as string) ?? null,
    tracks
  }
}

export function listTracks(filter: { search?: string; likedOnly?: boolean } = {}): MusicTrack[] {
  const wheres: string[] = []
  const params: unknown[] = []
  if (filter.search?.trim()) {
    wheres.push('(t.title LIKE ? OR ar.name LIKE ? OR al.title LIKE ?)')
    const q = `%${filter.search.trim()}%`
    params.push(q, q, q)
  }
  if (filter.likedOnly) wheres.push('t.liked_at IS NOT NULL')
  const where = wheres.length ? `WHERE ${wheres.join(' AND ')}` : ''
  const order = filter.likedOnly
    ? 'ORDER BY t.liked_at DESC'
    : `ORDER BY ar.name COLLATE NOCASE ASC, al.year ASC, al.title COLLATE NOCASE ASC,
       COALESCE(t.disc_no, 1) ASC, COALESCE(t.track_no, 9999) ASC, t.title COLLATE NOCASE ASC`
  const rows = getSqlite()
    .prepare(`${TRACK_SELECT} ${where} ${order}`)
    .all(...params) as Record<string, unknown>[]
  return rows.map(mapTrack)
}

// Play-all for an artist page: album order, then track order.
export function artistTracks(artistId: number): MusicTrack[] {
  const rows = getSqlite()
    .prepare(`${TRACK_SELECT} WHERE t.artist_id = ?
              ORDER BY al.year ASC, al.title COLLATE NOCASE ASC,
              COALESCE(t.disc_no, 1) ASC, COALESCE(t.track_no, 9999) ASC, t.title COLLATE NOCASE ASC`)
    .all(artistId) as Record<string, unknown>[]
  return rows.map(mapTrack)
}

export function searchAll(query: string): MusicSearchResults {
  const q = query.trim()
  if (!q) return { artists: [], albums: [], tracks: [] }
  const like = `%${q}%`
  const db = getSqlite()
  const artists = (
    db
      .prepare(
        `SELECT a.id, a.name, a.cover_path,
                COUNT(DISTINCT al.id) AS album_count, COUNT(t.id) AS track_count
         FROM music_artist a
         LEFT JOIN music_album al ON al.artist_id = a.id
         LEFT JOIN music_track t ON t.album_id = al.id
         WHERE a.name LIKE ?
         GROUP BY a.id ORDER BY a.name COLLATE NOCASE ASC LIMIT 20`
      )
      .all(like) as Record<string, unknown>[]
  ).map((r) => ({
    id: r.id as number,
    name: r.name as string,
    coverPath: (r.cover_path as string) ?? null,
    albumCount: r.album_count as number,
    trackCount: r.track_count as number
  }))
  const albums = (
    db
      .prepare(
        `SELECT al.id, al.artist_id, al.title, al.year, al.cover_path,
                ar.name AS artist_name, COUNT(t.id) AS track_count
         FROM music_album al
         JOIN music_artist ar ON ar.id = al.artist_id
         LEFT JOIN music_track t ON t.album_id = al.id
         WHERE al.title LIKE ?
         GROUP BY al.id ORDER BY al.title COLLATE NOCASE ASC LIMIT 20`
      )
      .all(like) as Record<string, unknown>[]
  ).map(mapAlbumSummary)
  const tracks = (
    db
      .prepare(`${TRACK_SELECT} WHERE t.title LIKE ?
                ORDER BY t.title COLLATE NOCASE ASC LIMIT 40`)
      .all(like) as Record<string, unknown>[]
  ).map(mapTrack)
  return { artists, albums, tracks }
}

export function stats(): MusicLibraryStats {
  const db = getSqlite()
  const r = db
    .prepare(
      `SELECT (SELECT COUNT(*) FROM music_artist) AS artists,
              (SELECT COUNT(*) FROM music_album) AS albums,
              COUNT(*) AS tracks, COALESCE(SUM(duration), 0) AS total_duration
       FROM music_track`
    )
    .get() as { artists: number; albums: number; tracks: number; total_duration: number }
  return {
    artists: r.artists,
    albums: r.albums,
    tracks: r.tracks,
    totalDuration: r.total_duration
  }
}

// ---- playlists ----

function bump(playlistId: number): void {
  getSqlite()
    .prepare(`UPDATE music_playlist SET updated_at = datetime('now') WHERE id = ?`)
    .run(playlistId)
}

export function listPlaylists(): MusicPlaylistSummary[] {
  const db = getSqlite()
  const lists = db
    .prepare('SELECT * FROM music_playlist ORDER BY updated_at DESC, id DESC')
    .all() as Record<string, unknown>[]
  if (lists.length === 0) return []
  const ids = lists.map((l) => l.id as number)
  const holes = ids.map(() => '?').join(', ')
  const countMap = new Map<number, number>()
  for (const c of db
    .prepare(
      `SELECT playlist_id, COUNT(*) AS n FROM music_playlist_track
       WHERE playlist_id IN (${holes}) GROUP BY playlist_id`
    )
    .all(...ids) as { playlist_id: number; n: number }[]) {
    countMap.set(c.playlist_id, c.n)
  }
  // First 4 album covers per playlist for the collage, in playlist order
  // (one windowed query for all playlists — the listRepo preview pattern).
  const previewMap = new Map<number, (string | null)[]>()
  for (const p of db
    .prepare(
      `SELECT playlist_id, image FROM (
         SELECT pt.playlist_id AS playlist_id, al.cover_path AS image,
                ROW_NUMBER() OVER (PARTITION BY pt.playlist_id ORDER BY pt.position ASC, pt.id ASC) AS rn
         FROM music_playlist_track pt
         JOIN music_track t ON t.id = pt.track_id
         JOIN music_album al ON al.id = t.album_id
         WHERE pt.playlist_id IN (${holes})
       ) WHERE rn <= 4
       ORDER BY playlist_id ASC, rn ASC`
    )
    .all(...ids) as { playlist_id: number; image: string | null }[]) {
    const arr = previewMap.get(p.playlist_id) ?? []
    arr.push(p.image ?? null)
    previewMap.set(p.playlist_id, arr)
  }
  return lists.map((l) => ({
    id: l.id as number,
    title: l.title as string,
    description: (l.description as string) ?? null,
    trackCount: countMap.get(l.id as number) ?? 0,
    previewCovers: previewMap.get(l.id as number) ?? [],
    updatedAt: l.updated_at as string
  }))
}

export function getPlaylist(id: number): MusicPlaylistDetail | null {
  const db = getSqlite()
  const row = db.prepare('SELECT * FROM music_playlist WHERE id = ?').get(id) as
    | Record<string, unknown>
    | undefined
  if (!row) return null
  const items = (
    db
      .prepare(
        `SELECT pt.id AS item_id, pt.position,
                t.id, t.album_id, t.artist_id, t.file_path, t.title, t.track_no, t.disc_no,
                t.duration, t.tag_artist, t.liked_at, t.play_count, t.last_played_at,
                al.title AS album_title, al.cover_path AS cover_path, ar.name AS artist_name
         FROM music_playlist_track pt
         JOIN music_track t ON t.id = pt.track_id
         JOIN music_album al ON al.id = t.album_id
         JOIN music_artist ar ON ar.id = t.artist_id
         WHERE pt.playlist_id = ?
         ORDER BY pt.position ASC, pt.id ASC`
      )
      .all(id) as Record<string, unknown>[]
  ).map((r) => ({
    itemId: r.item_id as number,
    position: r.position as number,
    track: mapTrack(r)
  }))
  return {
    id: row.id as number,
    title: row.title as string,
    description: (row.description as string) ?? null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
    items
  }
}

export function createPlaylist(input: { title: string; description?: string | null }): number {
  const info = getSqlite()
    .prepare('INSERT INTO music_playlist (title, description) VALUES (?, ?)')
    .run(input.title, input.description ?? null)
  return Number(info.lastInsertRowid)
}

export function updatePlaylist(
  id: number,
  patch: { title?: string; description?: string | null }
): void {
  const sets: string[] = []
  const values: unknown[] = []
  if (patch.title !== undefined) {
    sets.push('title = ?')
    values.push(patch.title)
  }
  if (patch.description !== undefined) {
    sets.push('description = ?')
    values.push(patch.description ?? null)
  }
  if (!sets.length) return
  sets.push(`updated_at = datetime('now')`)
  getSqlite()
    .prepare(`UPDATE music_playlist SET ${sets.join(', ')} WHERE id = ?`)
    .run(...values, id)
}

export function removePlaylist(id: number): void {
  getSqlite().prepare('DELETE FROM music_playlist WHERE id = ?').run(id)
}

export function addPlaylistTracks(playlistId: number, trackIds: number[]): void {
  if (trackIds.length === 0) return
  const db = getSqlite()
  const tx = db.transaction(() => {
    let next = (
      db
        .prepare(
          'SELECT COALESCE(MAX(position), -1) + 1 AS next FROM music_playlist_track WHERE playlist_id = ?'
        )
        .get(playlistId) as { next: number }
    ).next
    const ins = db.prepare(
      'INSERT OR IGNORE INTO music_playlist_track (playlist_id, track_id, position) VALUES (?, ?, ?)'
    )
    for (const trackId of trackIds) {
      if (ins.run(playlistId, trackId, next).changes > 0) next += 1
    }
    bump(playlistId)
  })
  tx()
}

export function removePlaylistTrack(itemId: number): void {
  const db = getSqlite()
  const row = db.prepare('SELECT playlist_id FROM music_playlist_track WHERE id = ?').get(itemId) as
    | { playlist_id: number }
    | undefined
  if (!row) return
  db.prepare('DELETE FROM music_playlist_track WHERE id = ?').run(itemId)
  bump(row.playlist_id)
}

// Remove by (playlist, track) — used by the Add-to-playlist menu, which only
// knows the track it's toggling.
export function removePlaylistTrackByTrack(playlistId: number, trackId: number): void {
  getSqlite()
    .prepare('DELETE FROM music_playlist_track WHERE playlist_id = ? AND track_id = ?')
    .run(playlistId, trackId)
  bump(playlistId)
}

export function reorderPlaylist(playlistId: number, orderedItemIds: number[]): void {
  const db = getSqlite()
  const stmt = db.prepare(
    'UPDATE music_playlist_track SET position = ? WHERE id = ? AND playlist_id = ?'
  )
  const tx = db.transaction((ids: number[]) => {
    ids.forEach((itemId, i) => stmt.run(i, itemId, playlistId))
    bump(playlistId)
  })
  tx(orderedItemIds)
}

export function playlistsForTrack(
  trackId: number
): { id: number; title: string; contains: boolean }[] {
  return (
    getSqlite()
      .prepare(
        `SELECT p.id, p.title,
                EXISTS(SELECT 1 FROM music_playlist_track pt
                       WHERE pt.playlist_id = p.id AND pt.track_id = ?) AS contains
         FROM music_playlist p ORDER BY p.updated_at DESC, p.id DESC`
      )
      .all(trackId) as { id: number; title: string; contains: number }[]
  ).map((r) => ({ id: r.id, title: r.title, contains: !!r.contains }))
}

// ---- liked + play logging ----

export function setLiked(trackId: number, liked: boolean): void {
  getSqlite()
    .prepare(
      `UPDATE music_track SET liked_at = ${liked ? `datetime('now')` : 'NULL'},
       updated_at = datetime('now') WHERE id = ?`
    )
    .run(trackId)
}

export function logPlay(trackId: number): void {
  const db = getSqlite()
  const tx = db.transaction(() => {
    db.prepare(
      `UPDATE music_track SET play_count = play_count + 1,
       last_played_at = datetime('now') WHERE id = ?`
    ).run(trackId)
    // INSERT…SELECT: silently no-ops for a vanished track id, like the UPDATE.
    db.prepare(
      `INSERT INTO music_play_log (track_id, duration)
       SELECT id, duration FROM music_track WHERE id = ?`
    ).run(trackId)
  })
  tx()
}

export function recentlyPlayed(limit = 50): MusicTrack[] {
  const rows = getSqlite()
    .prepare(`${TRACK_SELECT} WHERE t.last_played_at IS NOT NULL
              ORDER BY t.last_played_at DESC LIMIT ?`)
    .all(limit) as Record<string, unknown>[]
  return rows.map(mapTrack)
}

export function mostPlayed(limit = 50): MusicTrack[] {
  const rows = getSqlite()
    .prepare(`${TRACK_SELECT} WHERE t.play_count > 0
              ORDER BY t.play_count DESC, t.last_played_at DESC LIMIT ?`)
    .all(limit) as Record<string, unknown>[]
  return rows.map(mapTrack)
}

// ---- stats page ----

// Current + longest streak from the DISTINCT play days (local calendar,
// descending). Pure and exported for tests. Date.UTC day-arithmetic on the
// date strings — never `new Date('YYYY-MM-DD')`, whose parsing is UTC-midnight
// while `today` is a local date. The current streak survives a day without
// plays *so far*: last play yesterday still counts as a live streak.
export function computeStreaks(
  daysDesc: string[],
  today: string
): { current: number; longest: number } {
  if (daysDesc.length === 0) return { current: 0, longest: 0 }
  const DAY = 86_400_000
  const toUtc = (d: string): number =>
    Date.UTC(Number(d.slice(0, 4)), Number(d.slice(5, 7)) - 1, Number(d.slice(8, 10)))
  let longest = 0
  let current = 0
  let run = 0
  let prev: number | null = null
  for (let i = 0; i < daysDesc.length; i++) {
    const t = toUtc(daysDesc[i])
    run = prev !== null && prev - t === DAY ? run + 1 : 1
    prev = t
    if (run > longest) longest = run
    if (i === run - 1) current = run // still inside the run that starts at daysDesc[0]
  }
  if (toUtc(today) - toUtc(daysDesc[0]) > DAY) current = 0 // streak already broken
  return { current, longest }
}

// Everything the /music/stats page needs, in one invoke. `days` scopes the
// play-based stats to the last N local calendar days (null = all time).
// Period stats read music_play_log; the all-time branch falls back to the
// play_count counters so the page works on day one, before the log has data.
// All timestamps are stored UTC — every user-facing grouping applies
// 'localtime' at query time so days/hours land on the user's calendar.
export function statsDetail(days: number | null): MusicStatsDetail {
  const db = getSqlite()
  const cutoff = days != null ? `-${days - 1} days` : null // today + N-1 previous days
  const DAY_FILTER = `date(l.played_at, 'localtime') >= date('now', 'localtime', ?)`
  const logWhere = cutoff ? `WHERE ${DAY_FILTER}` : ''
  const logParams = cutoff ? [cutoff] : []

  // -- tiles --
  let tiles: MusicStatsDetail['tiles']
  if (cutoff) {
    const r = db
      .prepare(
        `SELECT COUNT(*) AS plays, COALESCE(SUM(l.duration), 0) AS seconds,
                COUNT(DISTINCT l.track_id) AS distinct_tracks,
                COUNT(DISTINCT t.artist_id) AS distinct_artists
         FROM music_play_log l
         JOIN music_track t ON t.id = l.track_id
         WHERE ${DAY_FILTER}`
      )
      .get(cutoff) as Record<string, number>
    tiles = {
      plays: r.plays,
      seconds: r.seconds,
      distinctTracks: r.distinct_tracks,
      distinctArtists: r.distinct_artists
    }
  } else {
    const r = db
      .prepare(
        `SELECT COALESCE(SUM(play_count), 0) AS plays,
                COALESCE(SUM(play_count * COALESCE(duration, 0)), 0) AS seconds,
                COALESCE(SUM(play_count > 0), 0) AS distinct_tracks,
                COUNT(DISTINCT CASE WHEN play_count > 0 THEN artist_id END) AS distinct_artists
         FROM music_track`
      )
      .get() as Record<string, number>
    tiles = {
      plays: r.plays,
      seconds: r.seconds,
      distinctTracks: r.distinct_tracks,
      distinctArtists: r.distinct_artists
    }
  }

  // -- time-of-play distributions (always from the log; sparse) --
  const playsPerDay = (
    db
      .prepare(
        `SELECT date(l.played_at, 'localtime') AS day, COUNT(*) AS plays,
                COALESCE(SUM(l.duration), 0) AS seconds
         FROM music_play_log l ${logWhere} GROUP BY day ORDER BY day ASC`
      )
      .all(...logParams) as { day: string; plays: number; seconds: number }[]
  ).map((r) => ({ day: r.day, plays: r.plays, seconds: r.seconds }))
  const playsByHour = db
    .prepare(
      `SELECT CAST(strftime('%H', l.played_at, 'localtime') AS INTEGER) AS hour, COUNT(*) AS plays
       FROM music_play_log l ${logWhere} GROUP BY hour ORDER BY hour ASC`
    )
    .all(...logParams) as { hour: number; plays: number }[]
  const playsByWeekday = db
    .prepare(
      `SELECT CAST(strftime('%w', l.played_at, 'localtime') AS INTEGER) AS weekday, COUNT(*) AS plays
       FROM music_play_log l ${logWhere} GROUP BY weekday ORDER BY weekday ASC`
    )
    .all(...logParams) as { weekday: number; plays: number }[]

  // -- top lists --
  let topTracks: MusicStatsDetail['topTracks']
  let topArtists: MusicStatsDetail['topArtists']
  let topAlbums: MusicStatsDetail['topAlbums']
  if (cutoff) {
    topTracks = (
      db
        .prepare(
          `SELECT ${TRACK_COLS}, COUNT(l.id) AS period_plays
           FROM music_play_log l
           JOIN music_track t ON t.id = l.track_id
           JOIN music_album al ON al.id = t.album_id
           JOIN music_artist ar ON ar.id = t.artist_id
           WHERE ${DAY_FILTER}
           GROUP BY t.id ORDER BY period_plays DESC, MAX(l.played_at) DESC LIMIT 20`
        )
        .all(cutoff) as Record<string, unknown>[]
    ).map((r) => ({ track: mapTrack(r), plays: r.period_plays as number }))
    topArtists = db
      .prepare(
        `SELECT ar.id, ar.name, ar.cover_path AS coverPath,
                COUNT(l.id) AS plays, COALESCE(SUM(l.duration), 0) AS seconds
         FROM music_play_log l
         JOIN music_track t ON t.id = l.track_id
         JOIN music_artist ar ON ar.id = t.artist_id
         WHERE ${DAY_FILTER}
         GROUP BY ar.id ORDER BY plays DESC, seconds DESC LIMIT 10`
      )
      .all(cutoff) as MusicStatsDetail['topArtists']
    topAlbums = db
      .prepare(
        `SELECT al.id, al.artist_id AS artistId, ar.name AS artistName, al.title, al.year,
                al.cover_path AS coverPath, COUNT(l.id) AS plays
         FROM music_play_log l
         JOIN music_track t ON t.id = l.track_id
         JOIN music_album al ON al.id = t.album_id
         JOIN music_artist ar ON ar.id = al.artist_id
         WHERE ${DAY_FILTER}
         GROUP BY al.id ORDER BY plays DESC LIMIT 12`
      )
      .all(cutoff) as MusicStatsDetail['topAlbums']
  } else {
    topTracks = mostPlayed(20).map((t) => ({ track: t, plays: t.playCount }))
    topArtists = db
      .prepare(
        `SELECT ar.id, ar.name, ar.cover_path AS coverPath,
                SUM(t.play_count) AS plays,
                COALESCE(SUM(t.play_count * COALESCE(t.duration, 0)), 0) AS seconds
         FROM music_track t
         JOIN music_artist ar ON ar.id = t.artist_id
         GROUP BY ar.id HAVING plays > 0 ORDER BY plays DESC, seconds DESC LIMIT 10`
      )
      .all() as MusicStatsDetail['topArtists']
    topAlbums = db
      .prepare(
        `SELECT al.id, al.artist_id AS artistId, ar.name AS artistName, al.title, al.year,
                al.cover_path AS coverPath, SUM(t.play_count) AS plays
         FROM music_track t
         JOIN music_album al ON al.id = t.album_id
         JOIN music_artist ar ON ar.id = al.artist_id
         GROUP BY al.id HAVING plays > 0 ORDER BY plays DESC LIMIT 12`
      )
      .all() as MusicStatsDetail['topAlbums']
  }

  // -- discoveries: artists whose first-ever logged play falls in the window --
  const newArtists = cutoff
    ? (db
        .prepare(
          `SELECT ar.id, ar.name, ar.cover_path AS coverPath, MIN(l.played_at) AS firstPlayedAt
           FROM music_play_log l
           JOIN music_track t ON t.id = l.track_id
           JOIN music_artist ar ON ar.id = t.artist_id
           GROUP BY ar.id
           HAVING date(MIN(l.played_at), 'localtime') >= date('now', 'localtime', ?)
           ORDER BY firstPlayedAt DESC LIMIT 12`
        )
        .all(cutoff) as MusicStatsDetail['newArtists'])
    : []

  // -- streak (whole log, period-independent) --
  const streakDays = (
    db
      .prepare(
        `SELECT DISTINCT date(played_at, 'localtime') AS day
         FROM music_play_log ORDER BY day DESC`
      )
      .all() as { day: string }[]
  ).map((r) => r.day)
  const today = (db.prepare(`SELECT date('now', 'localtime') AS d`).get() as { d: string }).d
  const streak = computeStreaks(streakDays, today)

  const logStartedAt =
    (db.prepare('SELECT MIN(played_at) AS first FROM music_play_log').get() as {
      first: string | null
    }).first ?? null

  // -- library composition (period-independent) --
  const counts = db
    .prepare(
      `SELECT (SELECT COUNT(*) FROM music_artist) AS artists,
              (SELECT COUNT(*) FROM music_album) AS albums,
              COUNT(*) AS tracks,
              COALESCE(SUM(duration), 0) AS total_seconds,
              AVG(duration) AS avg_seconds,
              COALESCE(SUM(liked_at IS NOT NULL), 0) AS liked_tracks,
              COALESCE(SUM(CASE WHEN liked_at IS NOT NULL THEN duration END), 0) AS liked_seconds
       FROM music_track`
    )
    .get() as Record<string, number | null>
  const decades = db
    .prepare(
      `SELECT (al.year / 10) * 10 AS decade,
              COUNT(DISTINCT al.id) AS albums, COUNT(t.id) AS tracks
       FROM music_album al
       LEFT JOIN music_track t ON t.album_id = al.id
       WHERE al.year IS NOT NULL
       GROUP BY decade ORDER BY decade ASC`
    )
    .all() as { decade: number; albums: number; tracks: number }[]
  const deepestArtists = db
    .prepare(
      `SELECT ar.id, ar.name, ar.cover_path AS coverPath, COUNT(t.id) AS tracks
       FROM music_artist ar
       JOIN music_track t ON t.artist_id = ar.id
       GROUP BY ar.id ORDER BY tracks DESC LIMIT 5`
    )
    .all() as { id: number; name: string; coverPath: string | null; tracks: number }[]

  return {
    days,
    logStartedAt,
    tiles,
    streak,
    playsPerDay,
    playsByHour,
    playsByWeekday,
    topTracks,
    topArtists,
    topAlbums,
    newArtists,
    library: {
      artists: counts.artists as number,
      albums: counts.albums as number,
      tracks: counts.tracks as number,
      totalSeconds: counts.total_seconds as number,
      avgTrackSeconds: (counts.avg_seconds as number) ?? null,
      likedTracks: counts.liked_tracks as number,
      likedSeconds: counts.liked_seconds as number,
      decades,
      deepestArtists
    }
  }
}
