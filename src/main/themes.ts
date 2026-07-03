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

// Resolve an AniList anime id to its AnimeThemes slug, then fetch its themes.
export async function fetchAnimeThemes(anilistId: number): Promise<NormalizedTheme[]> {
  const resData = await atGet(
    `/resource?filter[site]=AniList&filter[external_id]=${anilistId}&include=anime`
  )
  const slug = resData?.resources?.[0]?.anime?.[0]?.slug
  if (!slug) return [] // not catalogued on AnimeThemes

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
// downloads each .ogg locally (otherwise only the streaming URL is stored).
export async function importThemes(
  mediaId: number,
  opts: { withAudio?: boolean } = {}
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

  const themes = await fetchAnimeThemes(Number(media.external_id))

  // Phase 1 — all network work: every audio file and artist image is on disk
  // before a single row changes, so the clean replace below can run in one
  // synchronous transaction (same two-phase shape as the other importers).
  updateActivity({ phase: 'audio', done: 0, total: themes.length })
  const audioPaths = new Map<string, string | null>()
  let audioDone = 0
  for (const t of themes) {
    audioPaths.set(
      t.externalId,
      withAudio && t.audioUrl
        ? await downloadAudio(t.audioUrl, themeFileBase(media.title, t.slug, t.title))
        : null
    )
    updateActivity({ phase: 'audio', done: ++audioDone, total: themes.length })
  }
  const artistImages = await downloadImages(
    themes.flatMap((t) => t.artists.map((a) => a.imageUrl))
  )

  // Phase 2 — one transaction: clean replace. Drop prior themes (cascades
  // theme_artist) and artist credits, reinsert from the fresh fetch. A crash
  // can no longer leave the anime with its themes deleted but not replaced.
  updateActivity({ phase: 'writing' })
  return db.transaction((): ThemeImportSummary => {
    db.prepare('DELETE FROM theme_song WHERE media_id=?').run(mediaId)
    db.prepare("DELETE FROM credit WHERE media_id=? AND role='artist'").run(mediaId)

    let songs = 0
    let audioDownloaded = 0
    const artistIds = new Set<number>()
    let order = 0

    for (const t of themes) {
      const audioPath = audioPaths.get(t.externalId) ?? null
      if (audioPath) audioDownloaded++
      const info = db
        .prepare(
          `INSERT INTO theme_song
           (media_id, slug, type, sequence, title, audio_url, audio_path, sort_order, external_source, external_id)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
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
