import { getSqlite } from '../db/connection'
import { recordingText, recordingVariantSignature } from '@shared/musicSourceMatch'
import { normalizeSpotifyMatch, stripAlbumYearPrefix } from '../musicSpotifyMatch'
import { TRACK_COLS, TRACK_JOINS, mapAlbumSummary, mapTrack } from './musicRepo'
import type {
  MediaType,
  MusicAlbumSummary,
  MusicLink,
  MusicLinkCandidates,
  MusicLinkCreate,
  MusicLinkKind,
  MusicLinkOwner,
  MusicLinkUpdate,
  MusicTrack,
  SoundtrackOwner
} from '@shared/types'

// Links from local music (an album or one track) to a library title or a
// wrestler, with a free-text label. The table is media_music_link — never
// soundtrack_link, which a startup migration drops. Music rows are recreated
// when a file moves, so album_id/track_id are SET NULL and every link keeps a
// snapshot of what it pointed at; reattachOrphans() runs after each scan.

const MAX_LABEL = 80
const SEARCH_ALBUMS = 30
const SEARCH_TRACKS = 60
// Second-tier re-attach (album renamed): same artist + title, within this many seconds.
const DURATION_TOLERANCE = 3

interface LinkRow {
  id: number
  media_id: number | null
  wrestler_id: number | null
  kind: MusicLinkKind
  album_id: number | null
  track_id: number | null
  theme_external_id: string | null
  theme_song_id: number | null
  label: string
  sort_order: number
  snap_artist: string
  snap_album: string
  snap_title: string | null
  snap_duration: number | null
}

const LINK_SELECT = `SELECT l.*, ts.id AS theme_song_id FROM media_music_link l
  LEFT JOIN theme_song ts ON ts.media_id = l.media_id AND ts.external_id = l.theme_external_id`
const LINK_ORDER = 'ORDER BY l.sort_order ASC, l.id ASC'

function ownerColumn(owner: MusicLinkOwner): { column: 'media_id' | 'wrestler_id'; id: number } {
  if ('mediaId' in owner) return { column: 'media_id', id: owner.mediaId }
  return { column: 'wrestler_id', id: owner.wrestlerId }
}

function cleanLabel(label: string): string {
  return label.replace(/\s+/g, ' ').trim().slice(0, MAX_LABEL)
}

// Resolve link rows into albums and tracks with two batched reads.
function hydrate(rows: LinkRow[]): MusicLink[] {
  if (rows.length === 0) return []
  const db = getSqlite()
  const trackIds = rows.filter((r) => r.kind === 'track' && r.track_id != null).map((r) => r.track_id)
  const albumIds = [...new Set(rows.filter((r) => r.kind === 'album' && r.album_id != null).map((r) => r.album_id))]
  const tracks = new Map<number, MusicTrack>()
  if (trackIds.length) {
    const found = db
      .prepare(`SELECT ${TRACK_COLS} ${TRACK_JOINS} WHERE t.id IN (SELECT value FROM json_each(?))`)
      .all(JSON.stringify(trackIds)) as Record<string, unknown>[]
    for (const r of found) tracks.set(r.id as number, mapTrack(r))
  }
  const albums = new Map<number, MusicAlbumSummary>()
  const albumTracks = new Map<number, MusicTrack[]>()
  if (albumIds.length) {
    const ids = JSON.stringify(albumIds)
    const found = db
      .prepare(
        `SELECT al.id, al.artist_id, al.title, al.year, al.cover_path,
                ar.name AS artist_name, COUNT(t.id) AS track_count
         FROM music_album al
         JOIN music_artist ar ON ar.id = al.artist_id
         LEFT JOIN music_track t ON t.album_id = al.id
         WHERE al.id IN (SELECT value FROM json_each(?))
         GROUP BY al.id`
      )
      .all(ids) as Record<string, unknown>[]
    for (const r of found) albums.set(r.id as number, mapAlbumSummary(r))
    const listed = db
      .prepare(
        `SELECT ${TRACK_COLS} ${TRACK_JOINS} WHERE t.album_id IN (SELECT value FROM json_each(?))
         ORDER BY t.album_id, COALESCE(t.disc_no, 1) ASC, COALESCE(t.track_no, 9999) ASC,
                  t.title COLLATE NOCASE ASC`
      )
      .all(ids) as Record<string, unknown>[]
    for (const r of listed) {
      const track = mapTrack(r)
      const list = albumTracks.get(track.albumId) ?? []
      list.push(track)
      albumTracks.set(track.albumId, list)
    }
  }
  return rows.map((r) => {
    const track = r.kind === 'track' && r.track_id != null ? tracks.get(r.track_id) ?? null : null
    const album = r.kind === 'album' && r.album_id != null ? albums.get(r.album_id) ?? null : null
    return {
      id: r.id,
      mediaId: r.media_id,
      wrestlerId: r.wrestler_id,
      kind: r.kind,
      label: r.label,
      sortOrder: r.sort_order,
      missing: r.kind === 'track' ? !track : !album,
      snapshot: { artist: r.snap_artist, album: r.snap_album, title: r.snap_title },
      album,
      tracks: track ? [track] : album ? albumTracks.get(album.id) ?? [] : [],
      themeSongId: r.theme_song_id ?? null
    }
  })
}

export function listForOwner(owner: MusicLinkOwner): MusicLink[] {
  const { column, id } = ownerColumn(owner)
  const rows = getSqlite()
    .prepare(`${LINK_SELECT} WHERE l.${column} = ? ${LINK_ORDER}`)
    .all(id) as LinkRow[]
  return hydrate(rows)
}

// Franchise pages: the links of every matched entry, in one read. The id list
// is bounded by the franchise's entries, never the library.
export function listForMediaIds(mediaIds: number[]): MusicLink[] {
  const ids = [...new Set(mediaIds.filter((id) => Number.isInteger(id)))]
  if (ids.length === 0) return []
  const rows = getSqlite()
    .prepare(`${LINK_SELECT} WHERE l.media_id IN (SELECT value FROM json_each(?)) ${LINK_ORDER}`)
    .all(JSON.stringify(ids)) as LinkRow[]
  return hydrate(rows)
}

export function labels(): string[] {
  return (
    getSqlite()
      .prepare(
        `SELECT label FROM media_music_link WHERE label <> ''
         GROUP BY label ORDER BY COUNT(*) DESC, label COLLATE NOCASE ASC LIMIT 200`
      )
      .all() as { label: string }[]
  ).map((r) => r.label)
}

// The link dialog's search: albums and tracks by title or artist name.
export function searchCandidates(query: string): MusicLinkCandidates {
  const q = query.trim()
  if (!q) return { albums: [], tracks: [] }
  const like = `%${q}%`
  const db = getSqlite()
  const albums = (
    db
      .prepare(
        `SELECT al.id, al.artist_id, al.title, al.year, al.cover_path,
                ar.name AS artist_name,
                (SELECT COUNT(*) FROM music_track t WHERE t.album_id = al.id) AS track_count
         FROM music_album al
         JOIN music_artist ar ON ar.id = al.artist_id
         WHERE al.title LIKE ? OR ar.name LIKE ?
         ORDER BY (al.title LIKE ?) DESC, al.title COLLATE NOCASE ASC
         LIMIT ${SEARCH_ALBUMS}`
      )
      .all(like, like, like) as Record<string, unknown>[]
  ).map(mapAlbumSummary)
  const tracks = (
    db
      .prepare(
        `SELECT ${TRACK_COLS} ${TRACK_JOINS}
         WHERE t.title LIKE ? OR ar.name LIKE ? OR al.title LIKE ?
         ORDER BY (t.title LIKE ?) DESC, al.title COLLATE NOCASE ASC,
                  COALESCE(t.disc_no, 1) ASC, COALESCE(t.track_no, 9999) ASC, t.id ASC
         LIMIT ${SEARCH_TRACKS}`
      )
      .all(like, like, like, like) as Record<string, unknown>[]
  ).map(mapTrack)
  return { albums, tracks }
}

interface MusicSnapshot {
  artist: string
  album: string
  title: string | null
  duration: number | null
}

function trackSnapshot(trackId: number): MusicSnapshot | null {
  const row = getSqlite()
    .prepare(
      `SELECT ar.name AS artist, al.title AS album, t.title, t.duration FROM music_track t
       JOIN music_album al ON al.id = t.album_id JOIN music_artist ar ON ar.id = t.artist_id
       WHERE t.id = ?`
    )
    .get(trackId) as MusicSnapshot | undefined
  return row ?? null
}

function albumSnapshot(albumId: number): MusicSnapshot | null {
  const row = getSqlite()
    .prepare(
      `SELECT ar.name AS artist, al.title AS album FROM music_album al
       JOIN music_artist ar ON ar.id = al.artist_id WHERE al.id = ?`
    )
    .get(albumId) as { artist: string; album: string } | undefined
  return row ? { ...row, title: null, duration: null } : null
}

// A theme may have one full version; the external id is what survives a theme refresh.
function themeExternalId(mediaId: number, themeSongId: number): string {
  const row = getSqlite()
    .prepare(
      `SELECT ts.external_id, m.media_type FROM theme_song ts
       JOIN media_item m ON m.id = ts.media_id WHERE ts.id = ? AND ts.media_id = ?`
    )
    .get(themeSongId, mediaId) as { external_id: string | null; media_type: string } | undefined
  if (!row || row.media_type !== 'anime') throw new Error('That theme song does not belong to this anime')
  if (!row.external_id) throw new Error('That theme song has no stable id to link to')
  return row.external_id
}

function assignTheme(linkId: number, mediaId: number, externalId: string | null): void {
  const db = getSqlite()
  if (externalId) {
    db.prepare(
      'UPDATE media_music_link SET theme_external_id = NULL WHERE media_id = ? AND theme_external_id = ? AND id <> ?'
    ).run(mediaId, externalId, linkId)
  }
  db.prepare('UPDATE media_music_link SET theme_external_id = ? WHERE id = ?').run(externalId, linkId)
}

function isIdentityConflict(err: unknown): boolean {
  const e = err as { code?: string; message?: string } | null
  return (
    e?.code === 'SQLITE_CONSTRAINT_UNIQUE' &&
    typeof e.message === 'string' &&
    e.message.includes('idx_media_music_link_identity')
  )
}

export function create(input: MusicLinkCreate): number {
  const db = getSqlite()
  const { column, id } = ownerColumn(input.owner)
  const label = cleanLabel(input.label)
  const snapshot =
    input.kind === 'track'
      ? input.trackId != null
        ? trackSnapshot(input.trackId)
        : null
      : input.albumId != null
        ? albumSnapshot(input.albumId)
        : null
  if (!snapshot) throw new Error(input.kind === 'track' ? 'Track not found' : 'Album not found')
  const theme =
    input.themeSongId != null
      ? (() => {
          if (input.kind !== 'track' || column !== 'media_id') {
            throw new Error('Only a track linked to an anime can be a theme song’s full version')
          }
          return themeExternalId(id, input.themeSongId)
        })()
      : null
  return db.transaction(() => {
    const next = (
      db
        .prepare(`SELECT COALESCE(MAX(sort_order), -1) + 1 AS n FROM media_music_link WHERE ${column} = ?`)
        .get(id) as { n: number }
    ).n
    let result: { lastInsertRowid: number | bigint }
    try {
      result = db
        .prepare(
          `INSERT INTO media_music_link
             (${column}, kind, album_id, track_id, label, sort_order,
              snap_artist, snap_album, snap_title, snap_duration)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .run(
          id,
          input.kind,
          input.kind === 'album' ? input.albumId : null,
          input.kind === 'track' ? input.trackId : null,
          label,
          next,
          snapshot.artist,
          snapshot.album,
          input.kind === 'track' ? snapshot.title : null,
          input.kind === 'track' ? snapshot.duration : null
        )
    } catch (err) {
      // idx_media_music_link_identity: the same target under the same label.
      if (isIdentityConflict(err)) {
        throw new Error(
          `This ${input.kind} is already linked here${label ? ` as “${label}”` : ''}. Use a different label to link it again.`
        )
      }
      throw err
    }
    const linkId = Number(result.lastInsertRowid)
    if (theme && column === 'media_id') assignTheme(linkId, id, theme)
    return linkId
  })()
}

export function update(id: number, patch: MusicLinkUpdate): void {
  const db = getSqlite()
  const row = db.prepare('SELECT media_id, kind FROM media_music_link WHERE id = ?').get(id) as
    | { media_id: number | null; kind: MusicLinkKind }
    | undefined
  if (!row) throw new Error('Link not found')
  db.transaction(() => {
    if (patch.label !== undefined) {
      db.prepare('UPDATE media_music_link SET label = ? WHERE id = ?').run(cleanLabel(patch.label), id)
    }
    if (patch.themeSongId !== undefined) {
      if (patch.themeSongId === null) {
        db.prepare('UPDATE media_music_link SET theme_external_id = NULL WHERE id = ?').run(id)
      } else {
        if (row.kind !== 'track' || row.media_id == null) {
          throw new Error('Only a track linked to an anime can be a theme song’s full version')
        }
        assignTheme(id, row.media_id, themeExternalId(row.media_id, patch.themeSongId))
      }
    }
  })()
}

// The renderer sends the owner's links in their new order.
export function reorder(owner: MusicLinkOwner, orderedIds: number[]): void {
  const db = getSqlite()
  const { column, id } = ownerColumn(owner)
  const stmt = db.prepare(`UPDATE media_music_link SET sort_order = ? WHERE id = ? AND ${column} = ?`)
  db.transaction(() => orderedIds.forEach((linkId, i) => stmt.run(i, linkId, id)))()
}

export function remove(id: number): void {
  getSqlite().prepare('DELETE FROM media_music_link WHERE id = ?').run(id)
}

// Every title and wrestler with at least one link. Bounded by the link table.
export function browse(): SoundtrackOwner[] {
  const rows = getSqlite()
    .prepare(
      `SELECT l.media_id, l.wrestler_id,
              COALESCE(m.title, w.name) AS title, m.media_type,
              COALESCE(m.cover_path, w.photo_path) AS cover_path,
              COUNT(*) AS link_count,
              SUM(CASE WHEN l.kind = 'track' THEN (l.track_id IS NOT NULL)
                       ELSE (SELECT COUNT(*) FROM music_track t WHERE t.album_id = l.album_id) END) AS track_count,
              SUM(CASE WHEN l.kind = 'track' THEN (l.track_id IS NULL) ELSE (l.album_id IS NULL) END) AS missing_count,
              json_group_array(l.label) AS labels
       FROM media_music_link l
       LEFT JOIN media_item m ON m.id = l.media_id
       LEFT JOIN wrestling_wrestler w ON w.id = l.wrestler_id
       GROUP BY l.media_id, l.wrestler_id
       ORDER BY COALESCE(m.title, w.name) COLLATE NOCASE ASC`
    )
    .all() as Record<string, unknown>[]
  return rows.map((r) => ({
    mediaId: (r.media_id as number) ?? null,
    wrestlerId: (r.wrestler_id as number) ?? null,
    mediaType: (r.media_type as MediaType) ?? null,
    title: (r.title as string) ?? '',
    coverPath: (r.cover_path as string) ?? null,
    linkCount: r.link_count as number,
    trackCount: (r.track_count as number) ?? 0,
    missingCount: (r.missing_count as number) ?? 0,
    labels: [...new Set((JSON.parse(r.labels as string) as string[]).filter(Boolean))]
  }))
}

// ---- after a music scan ----

// Keep each live link's snapshot current, so a later move re-attaches by the
// file's latest tags rather than the ones it had when it was linked.
export function refreshSnapshots(): void {
  getSqlite().exec(`
    UPDATE media_music_link SET
      snap_artist = (SELECT ar.name FROM music_track t JOIN music_artist ar ON ar.id = t.artist_id WHERE t.id = track_id),
      snap_album = (SELECT al.title FROM music_track t JOIN music_album al ON al.id = t.album_id WHERE t.id = track_id),
      snap_title = (SELECT t.title FROM music_track t WHERE t.id = track_id),
      snap_duration = (SELECT t.duration FROM music_track t WHERE t.id = track_id)
    WHERE kind = 'track' AND track_id IS NOT NULL;
    UPDATE media_music_link SET
      snap_artist = (SELECT ar.name FROM music_album al JOIN music_artist ar ON ar.id = al.artist_id WHERE al.id = album_id),
      snap_album = (SELECT al.title FROM music_album al WHERE al.id = album_id)
    WHERE kind = 'album' AND album_id IS NOT NULL;
  `)
}

const albumKey = (title: string): string => recordingText(stripAlbumYearPrefix(title))
const titleKey = (title: string): string => recordingText(title)

interface Candidate {
  id: number
  title: string
  album_title: string
  duration: number | null
}

function uniqueId(list: { id: number }[]): number | null {
  const ids = new Set(list.map((c) => c.id))
  return ids.size === 1 ? [...ids][0] : null
}

/** Pure decision: which candidate track a missing link moves to, or null. */
export function pickTrack(snap: MusicSnapshot, candidates: Candidate[]): number | null {
  if (!snap.title) return null
  const title = titleKey(snap.title)
  const variant = recordingVariantSignature(snap.title, snap.album)
  const sameRecording = candidates.filter(
    (c) => titleKey(c.title) === title && recordingVariantSignature(c.title, c.album_title) === variant
  )
  const album = albumKey(snap.album)
  const sameAlbum = sameRecording.filter((c) => albumKey(c.album_title) === album)
  if (sameAlbum.length) return uniqueId(sameAlbum)
  // The album folder was renamed: the same recording at the same length, if only one.
  if (snap.duration == null) return null
  return uniqueId(
    sameRecording.filter((c) => c.duration != null && Math.abs(c.duration - snap.duration!) <= DURATION_TOLERANCE)
  )
}

/** Move links whose music row vanished to a uniquely matching new row. Runs
 * only when orphans exist, and reads only the matching artists' rows. */
export function reattachOrphans(): number {
  const db = getSqlite()
  const orphans = db
    .prepare(
      `SELECT id, kind, snap_artist, snap_album, snap_title, snap_duration FROM media_music_link
       WHERE (kind = 'track' AND track_id IS NULL) OR (kind = 'album' AND album_id IS NULL)`
    )
    .all() as {
    id: number
    kind: MusicLinkKind
    snap_artist: string
    snap_album: string
    snap_title: string | null
    snap_duration: number | null
  }[]
  if (orphans.length === 0) return 0
  const artistIds = new Map<string, number[]>()
  for (const a of db.prepare('SELECT id, name FROM music_artist').all() as { id: number; name: string }[]) {
    const key = normalizeSpotifyMatch(a.name)
    artistIds.set(key, [...(artistIds.get(key) ?? []), a.id])
  }
  const albumsOf = db.prepare('SELECT id, title FROM music_album WHERE artist_id = ?')
  const tracksOf = db.prepare(
    `SELECT t.id, t.title, t.duration, al.title AS album_title FROM music_track t
     JOIN music_album al ON al.id = t.album_id WHERE t.artist_id = ?`
  )
  const setTrack = db.prepare('UPDATE media_music_link SET track_id = ? WHERE id = ?')
  const setAlbum = db.prepare('UPDATE media_music_link SET album_id = ? WHERE id = ?')
  const drop = db.prepare('DELETE FROM media_music_link WHERE id = ?')
  let moved = 0
  db.transaction(() => {
    for (const o of orphans) {
      const ids = artistIds.get(normalizeSpotifyMatch(o.snap_artist)) ?? []
      if (ids.length === 0) continue
      let target: number | null
      if (o.kind === 'album') {
        const key = albumKey(o.snap_album)
        const found = ids.flatMap((id) => albumsOf.all(id) as { id: number; title: string }[])
        target = uniqueId(found.filter((a) => albumKey(a.title) === key))
      } else {
        const found = ids.flatMap((id) => tracksOf.all(id) as Candidate[])
        target = pickTrack(
          { artist: o.snap_artist, album: o.snap_album, title: o.snap_title, duration: o.snap_duration },
          found
        )
      }
      if (target == null) continue
      try {
        ;(o.kind === 'album' ? setAlbum : setTrack).run(target, o.id)
        moved++
      } catch (e) {
        // The user already linked the new row the same way: the orphan is a duplicate.
        if ((e as { code?: string }).code === 'SQLITE_CONSTRAINT_UNIQUE') drop.run(o.id)
        else throw e
      }
    }
  })()
  return moved
}
