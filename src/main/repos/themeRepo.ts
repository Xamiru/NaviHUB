import { getSqlite } from '../db/connection'
import { buildWhere, buildOrder } from './mediaRepo'
import type { ThemeSongEntry, ThemeSongFilter } from '@shared/types'

// The theme-song library behind /anime/songs: every anime OP/ED in the library,
// flattened with the anime it belongs to. The anime side is narrowed by the very
// same MediaListFilter the anime list page builds — mediaRepo.buildWhere/
// buildOrder are reused verbatim, so "completed 2010s anime scored 8+" means
// exactly the same thing on both pages. Only the song-level clauses (OP/ED,
// hearts, playability, text) live here.
//
// Like songPool(), this returns the WHOLE matching set: the renderer queues it,
// hearts rows in place and batches the render, and a personal library's theme
// table is small (thousands of rows at most).

export function list(filter: ThemeSongFilter): ThemeSongEntry[] {
  const db = getSqlite()
  // mediaType is forced: this table only ever hangs off anime, and it keeps a
  // hand-built filter from widening the query to another type's rows.
  const { where, params } = buildWhere({ ...filter.media, mediaType: 'anime' })

  if (filter.playableOnly !== false) {
    where.push('(ts.audio_url IS NOT NULL OR ts.audio_path IS NOT NULL)')
  }
  if (filter.songType === 'OP' || filter.songType === 'ED') {
    where.push('ts.type = ?')
    params.push(filter.songType)
  }
  if (filter.favoriteOnly) where.push('ts.favorite = 1')

  // The page's own search box: song title, performer or anime title. Wider than
  // the media filter's title-only search on purpose — on a songs page, typing a
  // singer's name should find their songs.
  const q = filter.search?.trim()
  if (q) {
    where.push(
      `(ts.title LIKE ? OR ts.slug LIKE ? OR m.title LIKE ? OR m.title_original LIKE ?
        OR EXISTS (SELECT 1 FROM theme_artist ta2
                   JOIN person p2 ON p2.id = ta2.person_id
                   WHERE ta2.theme_song_id = ts.id AND p2.name LIKE ?))`
    )
    const like = `%${q}%`
    params.push(like, like, like, like, like)
  }

  // Songs stay grouped under their anime in AnimeThemes order (OP1, OP2, ED1),
  // with the anime themselves in whatever order the shared sort asks for. A
  // 'random' sort hashes the SONG id instead, so shuffling deals songs.
  const order = buildOrder(filter.media, params, 'ts.id')
  const songOrder =
    filter.media.sort === 'random' ? '' : ', COALESCE(ts.sort_order, 1000) ASC, ts.id ASC'

  // One row per (song, artist); artists are grouped in JS below, mirroring the
  // theme block in mediaRepo.get().
  const rows = db
    .prepare(
      `SELECT ts.id AS ts_id, ts.slug, ts.type, ts.title,
              ts.audio_url, ts.audio_path, ts.favorite,
              m.id AS media_id, m.title AS anime_title, m.cover_path, m.status,
              p.id AS artist_id, p.name AS artist_name
       FROM theme_song ts
       JOIN media_item m ON m.id = ts.media_id
       LEFT JOIN theme_artist ta ON ta.theme_song_id = ts.id
       LEFT JOIN person p ON p.id = ta.person_id
       WHERE ${where.join(' AND ')}
       ORDER BY ${order}${songOrder}, COALESCE(ta.sort_order, 0) ASC`
    )
    .all(...params) as Record<string, unknown>[]

  const byId = new Map<number, ThemeSongEntry>()
  for (const r of rows) {
    const tid = r.ts_id as number
    let s = byId.get(tid)
    if (!s) {
      s = {
        themeId: tid,
        slug: (r.slug as string) ?? null,
        type: (r.type as string) ?? null,
        title: (r.title as string) ?? null,
        audioUrl: (r.audio_url as string) ?? null,
        audioPath: (r.audio_path as string) ?? null,
        favorite: !!r.favorite,
        mediaId: r.media_id as number,
        animeTitle: r.anime_title as string,
        coverPath: (r.cover_path as string) ?? null,
        status: (r.status as string) ?? null,
        artists: []
      }
      byId.set(tid, s)
    }
    if (r.artist_id != null) {
      s.artists.push({ id: r.artist_id as number, name: r.artist_name as string })
    }
  }
  return [...byId.values()]
}

export function setFavorite(themeId: number, favorite: boolean): void {
  getSqlite()
    .prepare('UPDATE theme_song SET favorite = ? WHERE id = ?')
    .run(favorite ? 1 : 0, themeId)
}

// Header counts for the Songs page: how much of the library it can play at all,
// and how much of that is hearted. Deliberately unfiltered — like mediaRepo's
// facets, these are the "of N" denominators the active filters narrow.
export function counts(): { total: number; playable: number; favorites: number } {
  const row = getSqlite()
    .prepare(
      `SELECT COUNT(*) AS total,
              SUM(CASE WHEN ts.audio_url IS NOT NULL OR ts.audio_path IS NOT NULL
                       THEN 1 ELSE 0 END) AS playable,
              SUM(CASE WHEN ts.favorite = 1 THEN 1 ELSE 0 END) AS favorites
       FROM theme_song ts
       JOIN media_item m ON m.id = ts.media_id
       WHERE m.media_type = 'anime'`
    )
    .get() as { total: number; playable: number | null; favorites: number | null }
  return {
    total: row.total,
    playable: row.playable ?? 0,
    favorites: row.favorites ?? 0
  }
}
