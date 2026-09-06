import { getSqlite } from './db/connection'
import { downloadImages, downloadAudio } from './files'
import { fetchWithRetry } from './http'
import { updateActivity } from './progress'
import type { ThemeImportSummary } from '@shared/types'

// AnimeThemes.moe — opening/ending songs (+ audio) for anime, keyed off the same
// AniList ids the library already imports. Public REST API; it 403s without a
// User-Agent. Artists are stored as person rows so they reuse the people pages.
const AT_BASE = 'https://api.animethemes.moe'
const AT_UA = 'NaviHUB/0.1 (personal media tracker)'
const AT_SOURCE = 'animethemes'

/* eslint-disable @typescript-eslint/no-explicit-any */
// fetchWithRetry supplies the 5xx/network retries, capped 429 waits, and a
// request timeout (the old hand-rolled 429 loop here could recurse forever).
async function atGet(pathAndQuery: string): Promise<any> {
  const res = await fetchWithRetry(`${AT_BASE}${pathAndQuery}`, {
    headers: { Accept: 'application/json', 'User-Agent': AT_UA }
  })
  if (!res.ok) throw new Error(`AnimeThemes request failed (${res.status})`)
  return res.json()
}

export interface NormalizedArtist {
  externalId: string
  name: string
  imageUrl: string | null
}
export interface NormalizedTheme {
  externalId: string
  slug: string | null
  type: string | null
  sequence: number | null
  title: string | null
  audioUrl: string | null
  artists: NormalizedArtist[]
}

export interface ThemeImportOptions {
  withAudio?: boolean
  // Bulk repair keeps healthy local files and downloads only new/missing ones.
  onlyMissingAudio?: boolean
  // A caller that already compared the upstream set can pass it through so
  // refresh never performs the AnimeThemes request twice.
  themes?: NormalizedTheme[]
}

// Readable audio filename base, e.g. "Berserk OP1 - Tell Me Why". Leads with the
// anime so songs group by show in a file browser; song title is appended when
// known. (downloadAudio sanitizes illegal characters.)
export function themeFileBase(
  anime: string,
  slug: string | null,
  title: string | null
): string {
  const head = [anime, slug].filter(Boolean).join(' ')
  return title ? `${head} - ${title}` : head
}

// Pick an artist's display image (prefer the larger cover).
function artistImage(artist: any): string | null {
  const imgs = artist?.images ?? []
  const large = imgs.find((i: any) => /large/i.test(i.facet ?? ''))
  return (large ?? imgs[0])?.link ?? null
}

// Look up an anime's AnimeThemes slug via one external-site resource mapping
// (site is AnimeThemes' name, e.g. 'AniList' or 'MyAnimeList'). Null when that
// site has no mapping for the id.
async function resolveSlug(site: string, externalId: number): Promise<string | null> {
  const resData = await atGet(
    `/resource?filter[site]=${site}&filter[external_id]=${externalId}&include=anime`
  )
  return resData?.resources?.[0]?.anime?.[0]?.slug ?? null
}

// AniList exposes each anime's MyAnimeList id as `idMal`; used as a fallback
// key when AnimeThemes has an anime mapped by MAL but not by AniList. Public
// GraphQL, no key. Returns null on any miss so the caller just gives up cleanly.
async function fetchMalId(anilistId: number): Promise<number | null> {
  try {
    const res = await fetchWithRetry('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        query: 'query ($id: Int) { Media(id: $id, type: ANIME) { idMal } }',
        variables: { id: anilistId }
      })
    })
    if (!res.ok) return null
    const json = await res.json()
    const idMal = json?.data?.Media?.idMal
    return typeof idMal === 'number' && idMal > 0 ? idMal : null
  } catch {
    return null
  }
}

// Resolve an AniList anime id to its AnimeThemes slug, then fetch its themes.
// Falls back to the anime's MyAnimeList id when AnimeThemes has no AniList
// mapping (some entries carry only the MAL link — e.g. Hellsing Ultimate).
export async function fetchAnimeThemes(anilistId: number): Promise<NormalizedTheme[]> {
  let slug = await resolveSlug('AniList', anilistId)
  if (!slug) {
    const malId = await fetchMalId(anilistId)
    if (malId) slug = await resolveSlug('MyAnimeList', malId)
  }
  if (!slug) return [] // not catalogued on AnimeThemes under either id

  const inc = encodeURIComponent(
    'animethemes.song.artists.images,animethemes.animethemeentries.videos.audio'
  )
  const data = await atGet(`/anime/${slug}?include=${inc}`)
  const themes = data?.anime?.animethemes ?? []

  const out: NormalizedTheme[] = []
  for (const t of themes) {
    const entries = t.animethemeentries ?? []
    // Prefer a non-spoiler entry; the audio track is the song regardless.
    const entry = entries.find((e: any) => !e.spoiler) ?? entries[0]
    const audioUrl = entry?.videos?.[0]?.audio?.link ?? null
    out.push({
      externalId: String(t.id),
      slug: t.slug ?? null,
      type: t.type ?? null,
      sequence: typeof t.sequence === 'number' ? t.sequence : null,
      title: t.song?.title ?? null,
      audioUrl,
      artists: (t.song?.artists ?? []).map((a: any) => ({
        externalId: String(a.id),
        name: a.name ?? 'Unknown',
        imageUrl: artistImage(a)
      }))
    })
  }
  return out
}

// Upsert an artist as a person row (dedup by AnimeThemes id), refreshing the
// photo if missing. Synchronous — the photo is pre-downloaded so this can run
// inside the import transaction.
function upsertArtist(db: any, artist: NormalizedArtist, photo: string | null): number {
  const ext = artist.externalId
  const row = db
    .prepare('SELECT id, photo_path FROM person WHERE external_source=? AND external_id=?')
    .get(AT_SOURCE, ext) as { id: number; photo_path: string | null } | undefined
  if (row) {
    if (!row.photo_path && photo) {
      db.prepare('UPDATE person SET photo_path=? WHERE id=?').run(photo, row.id)
    }
    return row.id
  }
  const info = db
    .prepare(
      'INSERT INTO person (name, photo_path, external_source, external_id) VALUES (?, ?, ?, ?)'
    )
    .run(artist.name, photo, AT_SOURCE, ext)
  return Number(info.lastInsertRowid)
}

// Imports (or refreshes) the OP/ED songs for one anime. Replaces any previously
// imported themes for this media so re-import stays authoritative. `withAudio`
// downloads .ogg files locally (otherwise only streaming URLs are stored), and
// `onlyMissingAudio` retains healthy files during bulk repair.
export async function importThemes(
  mediaId: number,
  opts: ThemeImportOptions = {}
): Promise<ThemeImportSummary> {
  const withAudio = opts.withAudio !== false
  const db = getSqlite()

  const media = db
    .prepare('SELECT external_source, external_id, media_type, title FROM media_item WHERE id=?')
    .get(mediaId) as
    | {
        external_source: string | null
        external_id: string | null
        media_type: string
        title: string
      }
    | undefined
  if (!media) throw new Error('Media not found')
  if (media.media_type !== 'anime')
    throw new Error('Theme songs are only available for anime')
  if (media.external_source !== 'anilist' || !media.external_id)
    throw new Error('This anime has no AniList id to match against AnimeThemes')

  const themes = opts.themes ?? (await fetchAnimeThemes(Number(media.external_id)))

  // Phase 1 — all network work: required audio files and artist images are on
  // disk before a single row changes, so the clean replace below can run in one
  // synchronous transaction (same two-phase shape as the other importers).
  updateActivity({ phase: 'audio', done: 0, total: themes.length })
  const audioPaths = new Map<string, string | null>()
  const existingAudio = new Map(
    (
      db
        .prepare('SELECT external_id, audio_path FROM theme_song WHERE media_id=?')
        .all(mediaId) as { external_id: string | null; audio_path: string | null }[]
    )
      .filter((row): row is { external_id: string; audio_path: string | null } => !!row.external_id)
      .map((row) => [row.external_id, row.audio_path] as const)
  )
  let audioDone = 0
  for (const t of themes) {
    const retained = opts.onlyMissingAudio ? existingAudio.get(t.externalId) : undefined
    audioPaths.set(
      t.externalId,
      retained || !withAudio || !t.audioUrl
        ? retained ?? null
        : await downloadAudio(t.audioUrl, themeFileBase(media.title, t.slug, t.title))
    )
    updateActivity({ phase: 'audio', done: ++audioDone, total: themes.length })
  }
  const artistImages = await downloadImages(
    themes.flatMap((t) => (t.artists ?? []).map((a) => a.imageUrl))
  )

  // Phase 2 — one transaction: clean replace. Drop prior themes (cascades
  // theme_artist) and artist credits, reinsert from the fresh fetch. A crash
  // can no longer leave the anime with its themes deleted but not replaced.
  updateActivity({ phase: 'writing' })
  return db.transaction((): ThemeImportSummary => {
    // `favorite` is the one personal column on theme_song, and this is a clean
    // replace — carry the hearts across by AnimeThemes id (the rows' dedup key)
    // so a refresh can't silently empty the Songs page's favorites.
    const favorited = new Set(
      (
        db
          .prepare('SELECT external_id FROM theme_song WHERE media_id=? AND favorite=1')
          .all(mediaId) as { external_id: string | null }[]
      )
        .map((r) => r.external_id)
        .filter((id): id is string => !!id)
    )
    db.prepare('DELETE FROM theme_song WHERE media_id=?').run(mediaId)
    db.prepare("DELETE FROM credit WHERE media_id=? AND role='artist'").run(mediaId)

    let songs = 0
    let audioDownloaded = 0
    const artistIds = new Set<number>()
    let order = 0

    for (const t of themes) {
      const audioPath = audioPaths.get(t.externalId) ?? null
      if (audioPath && !(opts.onlyMissingAudio && existingAudio.get(t.externalId))) audioDownloaded++
      const info = db
        .prepare(
          `INSERT INTO theme_song
           (media_id, slug, type, sequence, title, audio_url, audio_path, sort_order, favorite, external_source, external_id)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .run(
          mediaId,
          t.slug,
          t.type,
          t.sequence,
          t.title,
          t.audioUrl,
          audioPath,
          order++,
          favorited.has(t.externalId) ? 1 : 0,
          AT_SOURCE,
          t.externalId
        )
      const themeSongId = Number(info.lastInsertRowid)
      songs++

      let aOrder = 0
      for (const a of t.artists) {
        const photo = a.imageUrl ? (artistImages.get(a.imageUrl) ?? null) : null
        const personId = upsertArtist(db, a, photo)
        artistIds.add(personId)
        db.prepare(
          'INSERT OR IGNORE INTO theme_artist (theme_song_id, person_id, sort_order) VALUES (?, ?, ?)'
        ).run(themeSongId, personId, aOrder++)
        // Person -> media credit so artists show up in the Artists browse page and
        // their own detail page, exactly like voice actors.
        db.prepare(
          "INSERT INTO credit (media_id, person_id, role) SELECT ?, ?, 'artist' WHERE NOT EXISTS " +
            "(SELECT 1 FROM credit WHERE media_id=? AND person_id=? AND role='artist' AND character_id IS NULL)"
        ).run(mediaId, personId, mediaId, personId)
      }
    }

    // Sweep AnimeThemes artists no longer linked to any theme — clearing their
    // list memberships first (list_item has no FK; imports must clean up the
    // same way manual deletes do).
    db.prepare(
      `DELETE FROM list_item
       WHERE list_id IN (SELECT id FROM list WHERE entity_kind = 'person')
       AND entity_id IN (SELECT id FROM person WHERE external_source = ?
                         AND id NOT IN (SELECT person_id FROM theme_artist))`
    ).run(AT_SOURCE)
    db.prepare(
      `DELETE FROM person WHERE external_source=? AND id NOT IN (SELECT person_id FROM theme_artist)`
    ).run(AT_SOURCE)

    return { mediaId, songs, artists: artistIds.size, audioDownloaded }
  })()
}

// Compare a fetched AnimeThemes payload with the local set. IDs are the
// authoritative identity; the audio check also repairs rows that have a
// source clip but no local download. This is deliberately pure apart from the
// supplied database handle so the refresh runner can test it without HTTP.
export function themeSetNeedsRefresh(
  db: any,
  mediaId: number,
  themes: NormalizedTheme[]
): boolean {
  const rows = db.prepare('SELECT external_id, audio_url, audio_path FROM theme_song WHERE media_id=?').all(mediaId) as {
    external_id: string | null
    audio_url: string | null
    audio_path: string | null
  }[]
  if (rows.length !== themes.length) return true
  const local = new Map(rows.map((row) => [row.external_id, row]))
  for (const theme of themes) {
    const row = local.get(theme.externalId)
    if (!row || (theme.audioUrl && !row.audio_path)) return true
  }
  return local.size !== themes.length
}

// One AnimeThemes request followed by an ID/audio comparison. Returns false
// when the title is already complete, allowing bulk refresh to count it as a
// skip without rewriting rows or downloading anything.
export async function refreshThemes(mediaId: number): Promise<boolean> {
  const media = getSqlite()
    .prepare('SELECT external_source, external_id, media_type FROM media_item WHERE id=?')
    .get(mediaId) as { external_source: string | null; external_id: string | null; media_type: string } | undefined
  if (!media) throw new Error('Media not found')
  if (media.media_type !== 'anime') throw new Error('Theme songs are only available for anime')
  if (media.external_source !== 'anilist' || !media.external_id) {
    throw new Error('This anime has no AniList id to match against AnimeThemes')
  }
  const fetched = await fetchAnimeThemes(Number(media.external_id))
  if (!themeSetNeedsRefresh(getSqlite(), mediaId, fetched)) return false
  await importThemes(mediaId, { themes: fetched, onlyMissingAudio: true })
  return true
}
