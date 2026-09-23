import { getSqlite } from './db/connection'
import type { RefreshAspect } from '@shared/refresh'
import { downloadImages } from './files'
import { updateActivity } from './progress'
import { fetchWithRetry, MAX_API_RESPONSE_BYTES, sleep } from './http'
import type {
  BulkListParams,
  BulkPreviewItem,
  ImportSearchResult,
  ImportSummary
} from '@shared/types'

// VNDB "Kana" HTTP API — public, no token needed for reads.
// Docs: https://api.vndb.org/kana . It's a POST-per-endpoint query API: the body
// carries { filters, fields, sort, results, page }.
const ENDPOINT = 'https://api.vndb.org/kana'
const SOURCE = 'vndb'
// VN characters get their own source namespace (like anime vs manga) so a
// character that also appears in an anime/manga stays a distinct row. Only the
// PERSON — the voice actor — is deliberately shared across sources (see
// upsertSharedPerson).
const VN_CHAR_SOURCE = 'vndb'

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function vndbPost(endpoint: string, body: any): Promise<any> {
  const res = await fetchWithRetry(`${ENDPOINT}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // VNDB asks API clients to identify themselves.
      'User-Agent': 'NaviHUB/1.0 (personal media hub)'
    },
    body: JSON.stringify(body),
    maxResponseBytes: MAX_API_RESPONSE_BYTES
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`VNDB request failed (${res.status})${detail ? `: ${detail.slice(0, 200)}` : ''}`)
  }
  return res.json()
}

// VNDB entity ids are strings: "v17" (VN), "c24" (character), "s9" (staff),
// "p42" (producer). The generic import dialog passes a NUMBER, so a VN crosses
// that boundary as the digits after the "v"; character/staff/producer ids stay
// full strings (they never leave this module).
const vidToNum = (id: string): number => Number(id.replace(/^v/, ''))
const numToVid = (n: number): string => `v${n}`

// VNDB descriptions use BBCode ([b], [url=…], [spoiler], …), not HTML.
function stripBBCode(s: string | null | undefined): string | null {
  if (!s) return null
  const out = s
    .replace(/\[\/?[^\]]+\]/g, '')
    .replace(/\r/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
  return out || null
}

// `released` is usually "YYYY-MM-DD" but can be "YYYY", "YYYY-MM", "TBA", etc.
function fmtReleased(r: string | null | undefined): string | null {
  return r && /^\d{4}-\d{2}-\d{2}$/.test(r) ? r : null
}
function yearOf(r: string | null | undefined): number | null {
  const m = r ? /^(\d{4})/.exec(r) : null
  return m ? Number(m[1]) : null
}

// Kanji names are compared with all whitespace removed: VNDB writes seiyuu names
// surname-first WITH a space ("宮野 真守"), while AniList stores them unspaced
// ("宮野真守"), so only a space-normalized comparison reunites the two. Verified
// against the live library: 13/14 Steins;Gate VAs matched this way vs 1/14 exact.
const stripSpaces = (s: string | null | undefined): string => (s ?? '').replace(/[\s　]/g, '')

// VN character role (for THIS vn) -> the same importance ranks the anime cast uses.
function rankFromVnRole(role: string | null): number {
  switch ((role ?? '').toLowerCase()) {
    case 'main':
      return 0
    case 'primary':
      return 1
    case 'side':
      return 2
    default:
      return 3
  }
}

// VNDB staff role -> our CreditRole. Only creative credits map; the rest (editor,
// qa, translator, generic "staff") are localization noise — a VN can list 200+ —
// so they're skipped. Mirrors anime's writer / director / composer crew.
function mapVnStaffRole(role: string | null): string | null {
  switch ((role ?? '').toLowerCase()) {
    case 'scenario':
      return 'writer'
    case 'director':
      return 'director'
    case 'music':
      return 'composer'
    default:
      return null
  }
}

const LANG_LABEL: Record<string, string> = {
  ja: 'Japanese',
  en: 'English',
  zh: 'Chinese',
  ko: 'Korean'
}

/* ---------------- upsert helpers ---------------- */

// Developer/publisher -> company, deduped by (vndb, producer id).
function upsertCompany(db: any, dev: any): number {
  const ext = String(dev.id)
  const row = db
    .prepare('SELECT id FROM company WHERE external_source=? AND external_id=?')
    .get(SOURCE, ext) as { id: number } | undefined
  if (row) return row.id
  const info = db
    .prepare(
      'INSERT INTO company (name, name_native, type, external_source, external_id) VALUES (?, ?, ?, ?, ?)'
    )
    .run(dev.name ?? 'Unknown', dev.original ?? null, 'developer', SOURCE, ext)
  return Number(info.lastInsertRowid)
}

// VN character, deduped by (vndb, character id). Synchronous on purpose: the
// portrait is pre-downloaded (files.downloadImages) so this can run inside the
// import transaction; `img` is the stored relative path, or null.
function upsertCharacter(db: any, ch: any, img: string | null): number {
  const ext = String(ch.id)
  const row = db
    .prepare('SELECT id, image_path FROM character WHERE external_source=? AND external_id=?')
    .get(VN_CHAR_SOURCE, ext) as { id: number; image_path: string | null } | undefined
  if (row) {
    if (!row.image_path && img) {
      db.prepare('UPDATE character SET image_path=? WHERE id=?').run(img, row.id)
    }
    return row.id
  }
  const info = db
    .prepare(
      'INSERT INTO character (name, name_native, image_path, description, external_source, external_id) VALUES (?, ?, ?, ?, ?, ?)'
    )
    .run(ch.name ?? 'Unknown', ch.original ?? null, img, stripBBCode(ch.description), VN_CHAR_SOURCE, ext)
  return Number(info.lastInsertRowid)
}

// THE VA-SHARING STEP. Reuse an existing person (usually an anime voice actor
// imported from AniList) instead of creating a duplicate, so one seiyuu spans
// anime + VN. VNDB staff ids differ from AniList's, so we match by NAME:
//   1. same VNDB staff already imported            -> reuse
//   2. space-normalized kanji (name_native) match  -> reuse (prefer the anilist
//      row so credits consolidate onto the canonical anime VA)
//   3. exact romaji name                           -> reuse
//   4. otherwise                                   -> create a new vndb person
// A reused row keeps its original external_source; it simply gains VN credits.
// Persons are never pruned, so this stays safe across re-imports.
function upsertSharedPerson(db: any, staff: any): number {
  const ext = String(staff.id)
  const byId = db
    .prepare('SELECT id FROM person WHERE external_source=? AND external_id=?')
    .get(SOURCE, ext) as { id: number } | undefined
  if (byId) return byId.id

  const kanji = stripSpaces(staff.original)
  if (kanji) {
    const byKanji = db
      .prepare(
        `SELECT id FROM person
         WHERE REPLACE(REPLACE(name_native, ' ', ''), char(12288), '') = ?
         ORDER BY (external_source = 'anilist') DESC, id ASC LIMIT 1`
      )
      .get(kanji) as { id: number } | undefined
    if (byKanji) return byKanji.id
  }

  if (staff.name) {
    const byName = db
      .prepare(
        `SELECT id FROM person WHERE name = ? COLLATE NOCASE
         ORDER BY (external_source = 'anilist') DESC, id ASC LIMIT 1`
      )
      .get(staff.name) as { id: number } | undefined
    if (byName) return byName.id
  }

  const info = db
    .prepare('INSERT INTO person (name, name_native, external_source, external_id) VALUES (?, ?, ?, ?)')
    .run(staff.name ?? 'Unknown', staff.original ?? null, SOURCE, ext)
  return Number(info.lastInsertRowid)
}

// Authoritative prune (same shape as anilist.pruneCharacters), scoped to the VN
// character source so re-import drops characters no longer linked and never
// touches anime/manga rows.
function pruneCharacters(db: any, mediaId: number, keptIds: Set<number>): void {
  const linked = db
    .prepare(
      `SELECT mc.character_id AS cid FROM media_character mc
       JOIN character ch ON ch.id = mc.character_id
       WHERE mc.media_id = ? AND ch.external_source = ?`
    )
    .all(mediaId, VN_CHAR_SOURCE) as { cid: number }[]
  for (const { cid } of linked) {
    if (!keptIds.has(cid)) {
      db.prepare('DELETE FROM credit WHERE media_id = ? AND character_id = ?').run(mediaId, cid)
      db.prepare('DELETE FROM media_character WHERE media_id = ? AND character_id = ?').run(mediaId, cid)
    }
  }
  // Characters about to be swept may sit on user lists (list_item has no FK to
  // enforce this — repos clean up on manual delete, so imports must too).
  db.prepare(
    `DELETE FROM list_item
     WHERE list_id IN (SELECT id FROM list WHERE entity_kind = 'character')
     AND entity_id IN (SELECT id FROM character WHERE external_source = ?
                       AND id NOT IN (SELECT character_id FROM media_character))`
  ).run(VN_CHAR_SOURCE)
  db.prepare(
    `DELETE FROM character WHERE external_source = ?
     AND id NOT IN (SELECT character_id FROM media_character)`
  ).run(VN_CHAR_SOURCE)
}

// Merge community score (and any other keys) into metadata without clobbering.
function mergeMetadata(db: any, mediaId: number, patch: Record<string, unknown>): void {
  const metaRow = db.prepare('SELECT metadata FROM media_item WHERE id=?').get(mediaId) as
    | { metadata: string | null }
    | undefined
  let obj: Record<string, unknown> = {}
  if (metaRow?.metadata) {
    try {
      obj = JSON.parse(metaRow.metadata) || {}
    } catch {
      obj = {}
    }
  }
  for (const [k, v] of Object.entries(patch)) if (v !== undefined && v !== null) obj[k] = v
  db.prepare('UPDATE media_item SET metadata=? WHERE id=?').run(
    Object.keys(obj).length ? JSON.stringify(obj) : null,
    mediaId
  )
}

/* ---------------- Search ---------------- */
export async function search(query: string): Promise<ImportSearchResult[]> {
  if (!query.trim()) return []
  const res = await vndbPost('/vn', {
    filters: ['search', '=', query],
    fields: 'id, title, alttitle, released, image.url',
    sort: 'searchrank',
    results: 12
  })
  return (res?.results ?? []).map((m: any) => ({
    id: vidToNum(m.id),
    title: m.title ?? 'Untitled',
    native: m.alttitle ?? null,
    year: yearOf(m.released),
    format: 'Visual Novel',
    episodes: null,
    coverUrl: m.image?.url ?? null
  }))
}

/* ---------------- Top lists (the /bulk page) ---------------- */
// The rated sort takes a votecount floor — VNDB's `rating` field is already
// bayesian-adjusted, but a floor still keeps 12-vote doujin entries out of a
// "top rated" shelf. Year bounds filter on `released`.
const VNDB_SORTS: Record<string, string> = {
  rated: 'rating',
  voted: 'votecount'
}
const RATED_VOTE_FLOOR = 100

// Pure + exported for tests. VNDB filters combine as ['and', f1, f2, ...].
export function buildVndbTopBody(params: BulkListParams, page: number): Record<string, unknown> {
  const sort = VNDB_SORTS[params.sort]
  if (!sort) throw new Error(`Unknown VNDB sort: ${params.sort}`)
  const filters: unknown[] = []
  if (params.sort === 'rated') filters.push(['votecount', '>=', RATED_VOTE_FLOOR])
  if (params.yearFrom) filters.push(['released', '>=', `${params.yearFrom}-01-01`])
  if (params.yearTo) filters.push(['released', '<=', `${params.yearTo}-12-31`])
  const body: Record<string, unknown> = {
    fields: 'id, title, released, rating, image.url',
    sort,
    reverse: true,
    results: 100, // VNDB's page maximum
    page
  }
  if (filters.length === 1) body.filters = filters[0]
  else if (filters.length > 1) body.filters = ['and', ...filters]
  return body
}

// `keep` + page cap: see anilist.topList — dropped rows (already in the
// library) don't count toward `count`, so the list is always topped up.
export async function topList(
  params: BulkListParams,
  pageDelayMs = 600,
  keep: (item: BulkPreviewItem) => boolean = () => true
): Promise<BulkPreviewItem[]> {
  const maxPages = Math.max(10, Math.ceil(params.count / 100) * 5)
  const out: BulkPreviewItem[] = []
  for (let page = 1; page <= maxPages; page++) {
    let res: Awaited<ReturnType<typeof vndbPost>>
    try {
      res = await vndbPost('/vn', buildVndbTopBody(params, page))
    } catch (e) {
      // A page mid-crawl failing must not discard everything already fetched —
      // return the partial list (the anilist.topList posture).
      if (out.length > 0) return out
      throw e
    }
    const results = res?.results ?? []
    for (const m of results) {
      const item: BulkPreviewItem = {
        sourceId: vidToNum(m.id),
        title: m.title ?? 'Untitled',
        year: yearOf(m.released),
        coverUrl: m.image?.url ?? null,
        score: typeof m.rating === 'number' ? m.rating : null
      }
      if (!keep(item)) continue
      out.push(item)
      if (out.length >= params.count) return out
    }
    if (!res?.more || results.length === 0) return out
    if (pageDelayMs > 0) await sleep(pageDelayMs)
  }
  return out
}

/* ---------------- Import ---------------- */
// Imports a VNDB visual novel: metadata, cover, developers, characters + voice
// actors (shared with anime), and creative staff. Re-import is authoritative for
// characters but preserves personal tracking (status/score/progress).
// Two phases like the AniList importer: all network work first (VN detail,
// character pages, every image), then all DB writes in one transaction so a
// failed import can't leave a half-written title.
export async function importVisualNovel(
  id: number,
  opts: { only?: RefreshAspect[] } = {}
): Promise<ImportSummary> {
  // Library Refresh: write only the chosen media_item columns and skip every
  // child block INCLUDING pruneCharacters, whose orphan sweep is scoped to the
  // SOURCE rather than this media id. A partial run executes no DELETE.
  const partial = !!opts.only?.length
  const wants = (a: RefreshAspect): boolean => !partial || !!opts.only?.includes(a)
  const vid = numToVid(id)

  // 1) VN detail — includes developers, creative staff, and the character<->VA
  //    links (VNDB exposes voice acting on the /vn `va` field, not /character).
  const vnRes = await vndbPost('/vn', {
    filters: ['id', '=', vid],
    fields:
      'id, title, alttitle, description, released, rating, votecount, length_minutes, length_votes, image.url, ' +
      'languages, platforms, tags{id,name,rating,spoiler,lie}, relations{id,title,relation}, ' +
      'developers{id, name, original}, staff{id, name, original, role}, ' +
      'va{note, character.id, staff.id, staff.name, staff.original, staff.lang}'
  })
  const m = vnRes?.results?.[0]
  if (!m) throw new Error('Visual novel not found on VNDB')

  // 2) characters (all of them, with images + role), paginated
  const chars: any[] = []
  let page = 1
  for (;;) {
    const cRes = await vndbPost('/character', {
      filters: ['vn', '=', ['id', '=', vid]],
      fields: 'id, name, original, image.url, description, vns.id, vns.role',
      results: 100,
      page
    })
    chars.push(...(cRes?.results ?? []))
    if (!cRes?.more) break
    page++
  }

  // 3) every image up front
  const images = await downloadImages([m.image?.url, ...chars.map((ch) => ch.image?.url)])
  const img = (url: string | null | undefined): string | null =>
    url ? (images.get(url) ?? null) : null

  const db = getSqlite()
  updateActivity({ phase: 'writing' })
  return db.transaction((): ImportSummary => {
    const title = m.title ?? 'Untitled'
    const native = m.alttitle ?? null
    const coverPath = img(m.image?.url)

    // ---- media_item (preserve personal tracking on re-import) ----
    const existing = db
      .prepare('SELECT id FROM media_item WHERE external_source = ? AND external_id = ?')
      .get(SOURCE, String(id)) as { id: number } | undefined

    let mediaId: number
    const created = !existing
    if (existing) {
      mediaId = existing.id
      const sets: string[] = []
      const args: unknown[] = []
      if (wants('text')) {
        sets.push('title=?', 'title_original=?', 'synopsis=?', 'total_units=?', 'release_date=?')
        args.push(title, native, stripBBCode(m.description), m.length_minutes ?? null, fmtReleased(m.released))
      }
      if (wants('cover')) {
        sets.push('cover_path=COALESCE(?, cover_path)')
        args.push(coverPath)
      }
      sets.push("updated_at=datetime('now')")
      db.prepare(`UPDATE media_item SET ${sets.join(', ')} WHERE id=?`).run(...args, mediaId)
    } else {
      if (partial) throw new Error('That title is not in the library — import it first.')
      const info = db
        .prepare(
          `INSERT INTO media_item
           (media_type, title, title_original, synopsis, cover_path, total_units, release_date,
            external_source, external_id)
           VALUES ('visual_novel', ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .run(
          title,
          native,
          stripBBCode(m.description),
          coverPath,
          m.length_minutes ?? null,
          fmtReleased(m.released),
          SOURCE,
          String(id)
        )
      mediaId = Number(info.lastInsertRowid)
    }

    // VNDB rating is 0–100 (e.g. 90.2). Stash it for the detail page (see the
    // VNDB score stat there), alongside any existing metadata keys. The length
    // vote count backs the play-time panel ("Average · N votes"); the average
    // itself lives in total_units above.
    if (wants('text')) {
      mergeMetadata(db, mediaId, {
        vndbRating: typeof m.rating === 'number' && m.rating > 0 ? m.rating : undefined,
        vndbLengthVotes:
          typeof m.length_votes === 'number' && m.length_votes > 0 ? m.length_votes : undefined
      })
    }

    // Child rows + pruneCharacters stop here on a partial refresh.
    if (partial) return { mediaId, title, studios: 0, cast: 0, staff: 0, created }

    mergeMetadata(db, mediaId, { vndbLanguages: m.languages ?? [], vndbPlatforms: m.platforms ?? [] })
    db.prepare('DELETE FROM media_tag WHERE media_id=?').run(mediaId)
    for (const tag of m.tags ?? []) {
      if (tag.lie || !tag.name) continue
      db.prepare("INSERT OR IGNORE INTO tag(name,category) VALUES(?,'VNDB')").run(tag.name)
      db.prepare('INSERT OR IGNORE INTO media_tag(media_id,tag_id) SELECT ?,id FROM tag WHERE name=?').run(mediaId, tag.name)
    }
    db.prepare('DELETE FROM media_relation WHERE media_id=?').run(mediaId)
    const relations: Record<string, string> = { seq: 'SEQUEL', preq: 'PREQUEL', set: 'SAME_SETTING', alt: 'ALTERNATIVE', char: 'SHARES_CHARACTERS', side: 'SIDE_STORY', par: 'PARENT', fan: 'FANDISC', ser: 'SAME_SERIES', orig: 'ORIGINAL_GAME' }
    for (const [index, relation] of (m.relations ?? []).entries()) {
      db.prepare(`INSERT OR IGNORE INTO media_relation(media_id,relation_type,related_source,related_external_id,related_type,related_title,sort_order)
        VALUES(?,?,?,?,?,?,?)`).run(mediaId, relations[relation.relation] ?? 'OTHER', SOURCE, String(vidToNum(relation.id)), 'visual_novel', relation.title, index)
    }

    // ---- developers -> companies ----
    let studios = 0
    for (const dev of m.developers ?? []) {
      const companyId = upsertCompany(db, dev)
      db.prepare(
        'INSERT OR IGNORE INTO media_company (media_id, company_id, role) VALUES (?, ?, ?)'
      ).run(mediaId, companyId, 'developer')
      studios++
    }

    // ---- character <-> VA links from vn.va, grouped by character id ----
    const vaByChar = new Map<string, any[]>()
    for (const e of m.va ?? []) {
      const cid = e?.character?.id
      if (!cid || !e.staff) continue
      if (!vaByChar.has(cid)) vaByChar.set(cid, [])
      vaByChar.get(cid)!.push(e)
    }

    // ---- upsert characters + voice-actor credits ----
    let cast = 0
    let order = 0
    const keptCharacterIds = new Set<number>()
    for (const ch of chars) {
      const characterId = upsertCharacter(db, ch, img(ch.image?.url))
      keptCharacterIds.add(characterId)
      const vnEntry = (ch.vns ?? []).find((v: any) => v.id === vid)
      const importance = rankFromVnRole(vnEntry?.role ?? null)
      db.prepare(
        `INSERT INTO media_character (media_id, character_id, sort_order) VALUES (?, ?, ?)
         ON CONFLICT(media_id, character_id) DO UPDATE SET sort_order = excluded.sort_order`
      ).run(mediaId, characterId, order++)

      for (const e of vaByChar.get(ch.id) ?? []) {
        const personId = upsertSharedPerson(db, e.staff)
        const language = LANG_LABEL[e.staff?.lang] ?? e.staff?.lang ?? null
        const dup = db
          .prepare(
            'SELECT id FROM credit WHERE media_id=? AND person_id=? AND character_id IS ? AND role=?'
          )
          .get(mediaId, personId, characterId, 'voice_actor') as { id: number } | undefined
        if (dup) {
          db.prepare('UPDATE credit SET importance=?, language=? WHERE id=?').run(
            importance,
            language,
            dup.id
          )
        } else {
          db.prepare(
            'INSERT INTO credit (media_id, person_id, character_id, role, language, importance) VALUES (?, ?, ?, ?, ?, ?)'
          ).run(mediaId, personId, characterId, 'voice_actor', language, importance)
          cast++
        }
      }
    }
    pruneCharacters(db, mediaId, keptCharacterIds)

    // ---- creative staff -> crew credits (deduped by person + role) ----
    let staffCount = 0
    const seenStaff = new Set<string>()
    for (const s of m.staff ?? []) {
      const role = mapVnStaffRole(s.role)
      if (!role) continue
      const personId = upsertSharedPerson(db, s)
      const key = `${personId}:${role}`
      if (seenStaff.has(key)) continue
      seenStaff.add(key)
      const dup = db
        .prepare(
          'SELECT id FROM credit WHERE media_id=? AND person_id=? AND role=? AND character_id IS NULL'
        )
        .get(mediaId, personId, role) as { id: number } | undefined
      if (!dup) {
        db.prepare('INSERT INTO credit (media_id, person_id, role) VALUES (?, ?, ?)').run(
          mediaId,
          personId,
          role
        )
      }
      staffCount++
    }

    return { mediaId, title, studios, cast, staff: staffCount, created }
  })()
}
