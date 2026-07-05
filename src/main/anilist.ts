import { getSqlite } from './db/connection'
import { downloadImages } from './files'
import { updateActivity } from './progress'
import { fetchWithRetry } from './http'
import type { AniListSearchResult, AniListImportSummary } from '@shared/types'

// AniList public GraphQL API — no auth needed for reads.
const ENDPOINT = 'https://graphql.anilist.co'
const SOURCE = 'anilist'
// Manga characters are namespaced separately from anime characters: AniList
// gives a character the SAME id whether it appears in an anime or its manga, so
// importing both with one source would merge them into a single row. Tagging
// manga characters with a distinct source keeps them as separate entities (and
// keeps each importer's authoritative prune scoped to its own media type).
const MANGA_CHAR_SOURCE = 'anilist-manga'

/* eslint-disable @typescript-eslint/no-explicit-any */
async function gql(query: string, variables: Record<string, unknown>): Promise<any> {
  const res = await fetchWithRetry(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ query, variables })
  })
  if (!res.ok) {
    throw new Error(`AniList request failed (${res.status})`)
  }
  const json = await res.json()
  if (json.errors?.length) throw new Error(json.errors[0].message ?? 'AniList error')
  return json.data
}

function pickTitle(t: any): { title: string; native: string | null } {
  return {
    title: t?.english || t?.romaji || t?.native || 'Untitled',
    native: t?.native ?? null
  }
}

function stripHtml(s: string | null | undefined): string | null {
  if (!s) return null
  return s
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function fmtDate(d: any): string | null {
  if (!d?.year) return null
  const mm = String(d.month ?? 1).padStart(2, '0')
  const dd = String(d.day ?? 1).padStart(2, '0')
  return `${d.year}-${mm}-${dd}`
}

// AniList character role -> importance rank used to sort the cast.
function rankFromRole(role: string | null): number {
  switch ((role ?? '').toUpperCase()) {
    case 'MAIN':
      return 0
    case 'SUPPORTING':
      return 1
    case 'BACKGROUND':
      return 2
    default:
      return 3
  }
}

function mapStaffRole(role: string | null): string {
  const r = (role ?? '').toLowerCase()
  if (r.includes('director') && !r.includes('art') && !r.includes('sound')) return 'director'
  if (r.includes('composition') || r.includes('script') || r.includes('screenplay')) return 'writer'
  if (r.includes('music')) return 'composer'
  return 'staff'
}

// Manga staff are almost all the author/artist ("Story & Art", "Story", "Art",
// "Original Creator") — surface those as the work's mangaka; anything else (e.g.
// an assistant or editor credit) falls back to generic staff.
function mapMangaStaffRole(role: string | null): string {
  const r = (role ?? '').toLowerCase()
  if (r.includes('story') || r.includes('art') || r.includes('creator') || r.includes('mangaka'))
    return 'mangaka'
  return 'staff'
}

/* ---------------- shared upsert helpers (dedup by external id) ----------------
 * Synchronous on purpose: images are pre-downloaded (files.downloadImages), so
 * these can run inside the import transaction. `photo`/`img` is the stored
 * relative path for the entity's image, or null. */
function upsertCompany(db: any, node: any): number {
  const ext = String(node.id)
  const row = db
    .prepare('SELECT id FROM company WHERE external_source=? AND external_id=?')
    .get(SOURCE, ext) as { id: number } | undefined
  if (row) return row.id
  const info = db
    .prepare('INSERT INTO company (name, type, external_source, external_id) VALUES (?, ?, ?, ?)')
    .run(node.name, 'studio', SOURCE, ext)
  return Number(info.lastInsertRowid)
}

function upsertPerson(db: any, node: any, photo: string | null): number {
  const ext = String(node.id)
  const row = db
    .prepare('SELECT id, photo_path FROM person WHERE external_source=? AND external_id=?')
    .get(SOURCE, ext) as { id: number; photo_path: string | null } | undefined
  const name = node.name?.full ?? 'Unknown'
  const nativeName = node.name?.native ?? null
  if (row) {
    if (!row.photo_path && photo) {
      db.prepare('UPDATE person SET photo_path=? WHERE id=?').run(photo, row.id)
    }
    return row.id
  }
  const info = db
    .prepare(
      'INSERT INTO person (name, name_native, photo_path, external_source, external_id) VALUES (?, ?, ?, ?, ?)'
    )
    .run(name, nativeName, photo, SOURCE, ext)
  return Number(info.lastInsertRowid)
}

// `charSource` namespaces the character so anime and manga characters that share
// an AniList id stay distinct (see MANGA_CHAR_SOURCE above).
function upsertCharacter(db: any, node: any, charSource: string, img: string | null): number {
  const ext = String(node.id)
  const row = db
    .prepare('SELECT id, image_path FROM character WHERE external_source=? AND external_id=?')
    .get(charSource, ext) as { id: number; image_path: string | null } | undefined
  const name = node.name?.full ?? 'Unknown'
  const nativeName = node.name?.native ?? null
  if (row) {
    if (!row.image_path && img) {
      db.prepare('UPDATE character SET image_path=? WHERE id=?').run(img, row.id)
    }
    return row.id
  }
  const info = db
    .prepare(
      'INSERT INTO character (name, name_native, image_path, external_source, external_id) VALUES (?, ?, ?, ?, ?)'
    )
    .run(name, nativeName, img, charSource, ext)
  return Number(info.lastInsertRowid)
}

// Authoritative prune: drop this media's source-owned characters that weren't in
// the latest import, then sweep characters left linked to nothing. Scoped to one
// character source so the anime and manga passes never touch each other's rows.
function pruneCharacters(db: any, mediaId: number, charSource: string, keptIds: Set<number>): void {
  const linked = db
    .prepare(
      `SELECT mc.character_id AS cid FROM media_character mc
       JOIN character ch ON ch.id = mc.character_id
       WHERE mc.media_id = ? AND ch.external_source = ?`
    )
    .all(mediaId, charSource) as { cid: number }[]
  for (const { cid } of linked) {
    if (!keptIds.has(cid)) {
      db.prepare('DELETE FROM credit WHERE media_id = ? AND character_id = ?').run(mediaId, cid)
      db.prepare('DELETE FROM media_character WHERE media_id = ? AND character_id = ?').run(
        mediaId,
        cid
      )
    }
  }
  // Characters about to be swept may sit on user lists (list_item has no FK to
  // enforce this — repos clean up on manual delete, so imports must too).
  db.prepare(
    `DELETE FROM list_item
     WHERE list_id IN (SELECT id FROM list WHERE entity_kind = 'character')
     AND entity_id IN (SELECT id FROM character WHERE external_source = ?
                       AND id NOT IN (SELECT character_id FROM media_character))`
  ).run(charSource)
  db.prepare(
    `DELETE FROM character WHERE external_source = ?
     AND id NOT IN (SELECT character_id FROM media_character)`
  ).run(charSource)
}

// Genre name -> tag id, linked to the media.
function linkGenre(db: any, mediaId: number, name: string): void {
  const existingTag = db.prepare('SELECT id FROM tag WHERE name=?').get(name) as
    | { id: number }
    | undefined
  const tagId = existingTag
    ? existingTag.id
    : Number(db.prepare('INSERT INTO tag (name, category) VALUES (?, ?)').run(name, 'genre').lastInsertRowid)
  db.prepare('INSERT OR IGNORE INTO media_tag (media_id, tag_id) VALUES (?, ?)').run(mediaId, tagId)
}

// Merge numeric extras (community average score 0-100, per-episode duration in
// minutes) into the metadata JSON without clobbering other keys, so they can be
// shown beside the user's own data and feed the /stats time estimates. Only
// applies entries that are positive numbers.
function mergeMetadata(db: any, mediaId: number, patch: Record<string, unknown>): void {
  const metaRow = db.prepare('SELECT metadata FROM media_item WHERE id=?').get(mediaId) as
    | { metadata: string | null }
    | undefined
  let metaObj: Record<string, unknown> = {}
  if (metaRow?.metadata) {
    try {
      metaObj = JSON.parse(metaRow.metadata) || {}
    } catch {
      metaObj = {}
    }
  }
  for (const [k, v] of Object.entries(patch)) {
    if (typeof v === 'number' && v > 0) metaObj[k] = v
  }
  db.prepare('UPDATE media_item SET metadata=? WHERE id=?').run(
    Object.keys(metaObj).length ? JSON.stringify(metaObj) : null,
    mediaId
  )
}

// ---------------- Search (anime) ----------------
const SEARCH_QUERY = `
query ($search: String) {
  Page(perPage: 12) {
    media(search: $search, type: ANIME, sort: SEARCH_MATCH) {
      id
      title { romaji english native }
      startDate { year }
      format
      episodes
      coverImage { medium large }
    }
  }
}`

export async function search(query: string): Promise<AniListSearchResult[]> {
  if (!query.trim()) return []
  const data = await gql(SEARCH_QUERY, { search: query })
  return (data?.Page?.media ?? []).map((m: any) => {
    const { title, native } = pickTitle(m.title)
    return {
      id: m.id,
      title,
      native,
      year: m.startDate?.year ?? null,
      format: m.format ?? null,
      episodes: m.episodes ?? null,
      coverUrl: m.coverImage?.large || m.coverImage?.medium || null
    }
  })
}

// ---------------- Search (manga) ----------------
const SEARCH_QUERY_MANGA = `
query ($search: String) {
  Page(perPage: 12) {
    media(search: $search, type: MANGA, sort: SEARCH_MATCH) {
      id
      title { romaji english native }
      startDate { year }
      format
      chapters
      coverImage { medium large }
    }
  }
}`

export async function searchManga(query: string): Promise<AniListSearchResult[]> {
  if (!query.trim()) return []
  const data = await gql(SEARCH_QUERY_MANGA, { search: query })
  return (data?.Page?.media ?? []).map((m: any) => {
    const { title, native } = pickTitle(m.title)
    return {
      id: m.id,
      title,
      native,
      year: m.startDate?.year ?? null,
      format: m.format ?? null,
      // episodes is the dialog's "ep" line — leave null for manga so chapter
      // counts aren't mislabelled as episodes.
      episodes: null,
      coverUrl: m.coverImage?.large || m.coverImage?.medium || null
    }
  })
}

// AniList relation types we surface on the detail page: the season chain plus
// the manga/novel a title was adapted from (SOURCE) or that adapts it
// (ADAPTATION). The rest (CHARACTER, SUMMARY, OTHER…) are noise for a seasons
// view, so they're skipped.
const RELATION_TYPES = new Set([
  'PREQUEL',
  'SEQUEL',
  'PARENT',
  'SIDE_STORY',
  'ALTERNATIVE',
  'SPIN_OFF',
  'SOURCE',
  'ADAPTATION'
])

// Authoritatively replaces a title's stored relations from AniList's edges.
// Stored by the RELATED work's AniList id (SOURCE, i.e. 'anilist' — both anime
// and manga media_items use it, and AniList ids are unique across both) so the
// link resolves regardless of which title is imported first; related_title/type
// keep enough to render a relation whose target isn't in the library yet.
function replaceRelations(db: any, mediaId: number, relations: any): void {
  db.prepare('DELETE FROM media_relation WHERE media_id = ?').run(mediaId)
  const ins = db.prepare(
    `INSERT OR IGNORE INTO media_relation
       (media_id, relation_type, related_source, related_external_id, related_type, related_title, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  )
  let order = 0
  for (const edge of relations?.edges ?? []) {
    if (!RELATION_TYPES.has(edge?.relationType)) continue
    const node = edge.node
    if (!node?.id) continue
    const { title } = pickTitle(node.title)
    const type = node.type ? String(node.type).toLowerCase() : null
    ins.run(mediaId, edge.relationType, SOURCE, String(node.id), type, title, order++)
  }
}

// ---------------- Import (anime) ----------------
const DETAIL_QUERY = `
query ($id: Int) {
  Media(id: $id, type: ANIME) {
    id
    title { romaji english native }
    description(asHtml: false)
    episodes
    duration
    averageScore
    startDate { year month day }
    coverImage { large extraLarge }
    genres
    studios { edges { isMain node { id name } } }
    relations {
      edges {
        relationType
        node { id type title { romaji english native } }
      }
    }
    characters(sort: [ROLE, FAVOURITES_DESC], page: 1, perPage: 25) {
      pageInfo { hasNextPage }
      edges {
        role
        node { id name { full native } image { large } }
        voiceActors(language: JAPANESE) { id name { full native } image { large } }
      }
    }
    staff(perPage: 8, sort: RELEVANCE) {
      edges { role node { id name { full native } image { large } } }
    }
  }
}`

// Fetches one further page of a media's characters (perPage max is 25).
const CHARS_QUERY = `
query ($id: Int, $page: Int) {
  Media(id: $id, type: ANIME) {
    characters(sort: [ROLE, FAVOURITES_DESC], page: $page, perPage: 25) {
      pageInfo { hasNextPage }
      edges {
        role
        node { id name { full native } image { large } }
        voiceActors(language: JAPANESE) { id name { full native } image { large } }
      }
    }
  }
}`

// Imports an AniList anime into the local DB, deduping every entity by
// (external_source, external_id). Returns a summary for the UI.
// Two phases: all network work first (GraphQL pages + every image), then every
// DB write inside one transaction — a failure mid-import can't leave half a
// title behind, and re-import stays authoritative or doesn't happen at all.
export async function importAnime(anilistId: number): Promise<AniListImportSummary> {
  const data = await gql(DETAIL_QUERY, { id: anilistId })
  const m = data?.Media
  if (!m) throw new Error('Anime not found on AniList')

  // ---- characters + voice actors (Japanese) ----
  // Pull characters in AniList's own order (ROLE then relevance), across pages,
  // up to the first 125 — keep VA-less characters too so the list matches the site.
  const MAX_CHARACTERS = 125 // 5 pages of 25
  const charEdges: any[] = [...(m.characters?.edges ?? [])]
  let hasNext = !!m.characters?.pageInfo?.hasNextPage
  let page = 1
  while (hasNext && charEdges.length < MAX_CHARACTERS) {
    page++
    const more = await gql(CHARS_QUERY, { id: anilistId, page })
    const conn = more?.Media?.characters
    charEdges.push(...(conn?.edges ?? []))
    hasNext = !!conn?.pageInfo?.hasNextPage
  }
  const limited = charEdges.slice(0, MAX_CHARACTERS)

  const coverUrl = m.coverImage?.extraLarge || m.coverImage?.large
  const images = await downloadImages([
    coverUrl,
    ...limited.flatMap((edge: any) => [
      edge.node?.image?.large,
      ...(edge.voiceActors ?? []).map((va: any) => va.image?.large)
    ]),
    ...(m.staff?.edges ?? []).map((edge: any) => edge.node?.image?.large)
  ])
  const img = (url: string | null | undefined): string | null =>
    url ? (images.get(url) ?? null) : null

  const db = getSqlite()
  updateActivity({ phase: 'writing' })
  return db.transaction((): AniListImportSummary => {
    const { title, native } = pickTitle(m.title)
    const coverPath = img(coverUrl)

    // ---- media (preserve personal tracking on re-import) ----
    const existing = db
      .prepare('SELECT id FROM media_item WHERE external_source = ? AND external_id = ?')
      .get(SOURCE, String(m.id)) as { id: number } | undefined

    let mediaId: number
    const created = !existing
    if (existing) {
      mediaId = existing.id
      db.prepare(
        `UPDATE media_item SET title=?, title_original=?, synopsis=?, cover_path=COALESCE(?, cover_path),
         total_units=?, release_date=?, updated_at=datetime('now') WHERE id=?`
      ).run(
        title,
        native,
        stripHtml(m.description),
        coverPath,
        m.episodes ?? null,
        fmtDate(m.startDate),
        mediaId
      )
    } else {
      const info = db
        .prepare(
          `INSERT INTO media_item
           (media_type, title, title_original, synopsis, cover_path, total_units, release_date,
            external_source, external_id)
           VALUES ('anime', ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .run(
          title,
          native,
          stripHtml(m.description),
          coverPath,
          m.episodes ?? null,
          fmtDate(m.startDate),
          SOURCE,
          String(m.id)
        )
      mediaId = Number(info.lastInsertRowid)
    }

    mergeMetadata(db, mediaId, { averageScore: m.averageScore, epDuration: m.duration })

    // ---- studios: only the main animation studio(s), not producers/licensors ----
    let studios = 0
    for (const edge of m.studios?.edges ?? []) {
      if (!edge.isMain) continue
      const companyId = upsertCompany(db, edge.node)
      db.prepare(
        'INSERT OR IGNORE INTO media_company (media_id, company_id, role) VALUES (?, ?, ?)'
      ).run(mediaId, companyId, 'animation_studio')
      studios++
    }

    // ---- genres -> tags ----
    for (const g of m.genres ?? []) linkGenre(db, mediaId, g)

    let cast = 0
    let order = 0
    const keptCharacterIds = new Set<number>()
    for (const edge of limited) {
      const characterId = upsertCharacter(db, edge.node, SOURCE, img(edge.node?.image?.large))
      keptCharacterIds.add(characterId)
      const sortOrder = order++
      const importance = rankFromRole(edge.role)
      // Upsert the link, recording the source ordering (updates on re-import).
      db.prepare(
        `INSERT INTO media_character (media_id, character_id, sort_order) VALUES (?, ?, ?)
         ON CONFLICT(media_id, character_id) DO UPDATE SET sort_order = excluded.sort_order`
      ).run(mediaId, characterId, sortOrder)
      for (const va of edge.voiceActors ?? []) {
        const personId = upsertPerson(db, va, img(va.image?.large))
        const dup = db
          .prepare(
            'SELECT id FROM credit WHERE media_id=? AND person_id=? AND character_id IS ? AND role=?'
          )
          .get(mediaId, personId, characterId, 'voice_actor') as { id: number } | undefined
        if (dup) {
          db.prepare('UPDATE credit SET importance=? WHERE id=?').run(importance, dup.id)
        } else {
          db.prepare(
            'INSERT INTO credit (media_id, person_id, character_id, role, language, importance) VALUES (?, ?, ?, ?, ?, ?)'
          ).run(mediaId, personId, characterId, 'voice_actor', 'Japanese', importance)
        }
        cast++
      }
    }

    pruneCharacters(db, mediaId, SOURCE, keptCharacterIds)

    // ---- staff ----
    let staff = 0
    for (const edge of m.staff?.edges ?? []) {
      const personId = upsertPerson(db, edge.node, img(edge.node?.image?.large))
      const role = mapStaffRole(edge.role)
      const dup = db
        .prepare('SELECT id FROM credit WHERE media_id=? AND person_id=? AND role=? AND character_id IS NULL')
        .get(mediaId, personId, role)
      if (!dup) {
        db.prepare('INSERT INTO credit (media_id, person_id, role) VALUES (?, ?, ?)').run(
          mediaId,
          personId,
          role
        )
      }
      staff++
    }

    // ---- related titles (seasons + manga source) ----
    replaceRelations(db, mediaId, m.relations)

    return { mediaId, title, studios, cast, staff, created }
  })()
}

// ---------------- Import (manga) ----------------
// Mirrors importAnime, minus the things manga doesn't have: no studios and no
// voice actors. Characters use MANGA_CHAR_SOURCE so they never merge with the
// anime adaptation's cast, and staff are surfaced as mangaka.
const DETAIL_QUERY_MANGA = `
query ($id: Int) {
  Media(id: $id, type: MANGA) {
    id
    title { romaji english native }
    description(asHtml: false)
    chapters
    averageScore
    startDate { year month day }
    coverImage { large extraLarge }
    genres
    relations {
      edges {
        relationType
        node { id type title { romaji english native } }
      }
    }
    characters(sort: [ROLE, FAVOURITES_DESC], page: 1, perPage: 25) {
      pageInfo { hasNextPage }
      edges { role node { id name { full native } image { large } } }
    }
    staff(perPage: 8, sort: RELEVANCE) {
      edges { role node { id name { full native } image { large } } }
    }
  }
}`

const CHARS_QUERY_MANGA = `
query ($id: Int, $page: Int) {
  Media(id: $id, type: MANGA) {
    characters(sort: [ROLE, FAVOURITES_DESC], page: $page, perPage: 25) {
      pageInfo { hasNextPage }
      edges { role node { id name { full native } image { large } } }
    }
  }
}`

// Same two-phase shape as importAnime: fetch everything, then write atomically.
export async function importManga(anilistId: number): Promise<AniListImportSummary> {
  const data = await gql(DETAIL_QUERY_MANGA, { id: anilistId })
  const m = data?.Media
  if (!m) throw new Error('Manga not found on AniList')

  // ---- characters (no voice actors for manga) ----
  const MAX_CHARACTERS = 125
  const charEdges: any[] = [...(m.characters?.edges ?? [])]
  let hasNext = !!m.characters?.pageInfo?.hasNextPage
  let page = 1
  while (hasNext && charEdges.length < MAX_CHARACTERS) {
    page++
    const more = await gql(CHARS_QUERY_MANGA, { id: anilistId, page })
    const conn = more?.Media?.characters
    charEdges.push(...(conn?.edges ?? []))
    hasNext = !!conn?.pageInfo?.hasNextPage
  }
  const limited = charEdges.slice(0, MAX_CHARACTERS)

  const coverUrl = m.coverImage?.extraLarge || m.coverImage?.large
  const images = await downloadImages([
    coverUrl,
    ...limited.map((edge: any) => edge.node?.image?.large),
    ...(m.staff?.edges ?? []).map((edge: any) => edge.node?.image?.large)
  ])
  const img = (url: string | null | undefined): string | null =>
    url ? (images.get(url) ?? null) : null

  const db = getSqlite()
  updateActivity({ phase: 'writing' })
  return db.transaction((): AniListImportSummary => {
    const { title, native } = pickTitle(m.title)
    const coverPath = img(coverUrl)

    const existing = db
      .prepare('SELECT id FROM media_item WHERE external_source = ? AND external_id = ?')
      .get(SOURCE, String(m.id)) as { id: number } | undefined

    let mediaId: number
    const created = !existing
    if (existing) {
      mediaId = existing.id
      db.prepare(
        `UPDATE media_item SET title=?, title_original=?, synopsis=?, cover_path=COALESCE(?, cover_path),
         total_units=?, release_date=?, updated_at=datetime('now') WHERE id=?`
      ).run(
        title,
        native,
        stripHtml(m.description),
        coverPath,
        m.chapters ?? null,
        fmtDate(m.startDate),
        mediaId
      )
    } else {
      const info = db
        .prepare(
          `INSERT INTO media_item
           (media_type, title, title_original, synopsis, cover_path, total_units, release_date,
            external_source, external_id)
           VALUES ('manga', ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .run(
          title,
          native,
          stripHtml(m.description),
          coverPath,
          m.chapters ?? null,
          fmtDate(m.startDate),
          SOURCE,
          String(m.id)
        )
      mediaId = Number(info.lastInsertRowid)
    }

    mergeMetadata(db, mediaId, { averageScore: m.averageScore })

    for (const g of m.genres ?? []) linkGenre(db, mediaId, g)

    let order = 0
    const keptCharacterIds = new Set<number>()
    for (const edge of limited) {
      const characterId = upsertCharacter(
        db,
        edge.node,
        MANGA_CHAR_SOURCE,
        img(edge.node?.image?.large)
      )
      keptCharacterIds.add(characterId)
      const sortOrder = order++
      db.prepare(
        `INSERT INTO media_character (media_id, character_id, sort_order) VALUES (?, ?, ?)
         ON CONFLICT(media_id, character_id) DO UPDATE SET sort_order = excluded.sort_order`
      ).run(mediaId, characterId, sortOrder)
    }
    pruneCharacters(db, mediaId, MANGA_CHAR_SOURCE, keptCharacterIds)

    // ---- mangaka / staff ----
    let staff = 0
    for (const edge of m.staff?.edges ?? []) {
      const personId = upsertPerson(db, edge.node, img(edge.node?.image?.large))
      const role = mapMangaStaffRole(edge.role)
      const dup = db
        .prepare('SELECT id FROM credit WHERE media_id=? AND person_id=? AND role=? AND character_id IS NULL')
        .get(mediaId, personId, role)
      if (!dup) {
        db.prepare('INSERT INTO credit (media_id, person_id, role) VALUES (?, ?, ?)').run(
          mediaId,
          personId,
          role
        )
      }
      staff++
    }

    // ---- related titles (other volumes/parts + anime adaptation) ----
    replaceRelations(db, mediaId, m.relations)

    // cast count reports linked characters (manga has no per-character credits).
    return { mediaId, title, studios: 0, cast: keptCharacterIds.size, staff, created }
  })()
}
