import { getSqlite } from './db/connection'
import type { RefreshAspect } from '@shared/refresh'
import { downloadScaledImages } from './files'
import { updateActivity } from './progress'
import { fetchWithRetry, MAX_API_RESPONSE_BYTES } from './http'
import { logWarn } from './logBus'
import { createThrottle } from './requestThrottle'
import * as settingsRepo from './repos/settingsRepo'
import * as externalLinkRepo from './repos/externalLinkRepo'
import { adaptationsOf, findBookItem } from './bookAdaptations'
import { adaptationEdge, type Adaptation } from './bookAdaptationsCore'
import {
  authorizationHeader,
  BOOK_QUERY,
  CHARACTERS_QUERY,
  EDITIONS_QUERY,
  errorMessage,
  graphqlErrorMessage,
  HARDCOVER_ENDPOINT,
  HARDCOVER_SOURCE,
  HARDCOVER_TOKEN_KEY,
  MAX_CHARACTERS,
  MAX_SERIES_BOOKS,
  normalizeBook,
  parseCharacters,
  parseEditions,
  parseSearchResults,
  parseSeriesBooks,
  parseTopRows,
  SEARCH_QUERY,
  SERIES_QUERY,
  seriesRelations,
  TOP_QUERY,
  topOrderBy,
  topWhere,
  type HardcoverCharacter,
  type HardcoverEdition,
  type NormalizedBook,
  type SeriesEntry
} from './hardcoverCore'
import type { BulkListParams, BulkPreviewItem, ImportSearchResult, ImportSummary } from '@shared/types'

// Hardcover — the books import source since 2026-10 (Open Library stays as the
// keyless fallback and for its own rows). Parsing and the GraphQL documents
// live in hardcoverCore.ts; this module is the token, the requests and the one
// import transaction. Wikidata supplies the screen adaptations
// (bookAdaptations.ts), best-effort: a Wikimedia failure never fails a book.

// 60 requests a minute on every plan: one process-wide slot, so a dialog import,
// a library refresh and a bulk run share the budget instead of multiplying it.
export const hardcoverThrottle = createThrottle(1050)

const UA = 'NaviHUB (personal media tracker)'
// Covers on Hardcover are often full-size retail scans.
const COVER_EDGE = 1000

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function gql(query: string, variables: Record<string, unknown>): Promise<any> {
  const token = settingsRepo.get(HARDCOVER_TOKEN_KEY)?.trim()
  if (!token) {
    throw new Error('Add a Hardcover API token in Settings → Integrations before importing books.')
  }
  await hardcoverThrottle.take()
  const res = await fetchWithRetry(HARDCOVER_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: authorizationHeader(token),
      'User-Agent': UA
    },
    body: JSON.stringify({ query, variables }),
    timeoutMs: 35_000,
    maxResponseBytes: MAX_API_RESPONSE_BYTES
  })
  let body: any = null
  try {
    body = await res.json()
  } catch {
    body = null
  }
  if (!res.ok) throw new Error(errorMessage(res.status, body))
  const gqlError = graphqlErrorMessage(body?.errors)
  if (gqlError) throw new Error(gqlError)
  return body?.data ?? null
}

// ---------------- Search ----------------
export async function search(query: string): Promise<ImportSearchResult[]> {
  if (!query.trim()) return []
  const data = await gql(SEARCH_QUERY, { query: query.trim().slice(0, 120), perPage: 20 })
  return parseSearchResults(data?.search?.results).map((h) => ({
    id: h.id,
    title: h.title,
    // The dialog's subtitle line — the author is the disambiguator for books.
    native: h.authors,
    year: h.year,
    format: h.series ?? 'Book',
    episodes: h.pages,
    coverUrl: h.coverUrl
  }))
}

export async function editions(bookId: number): Promise<HardcoverEdition[]> {
  if (!Number.isInteger(bookId) || bookId <= 0) throw new Error('Invalid Hardcover book id')
  return parseEditions(await gql(EDITIONS_QUERY, { id: bookId }))
}

// ---------------- Bulk ----------------
// Top lists for /bulk, 50 a page, with the same partial-tolerance as the other
// sources: a mid-crawl failure returns what was already fetched.
export async function topList(
  params: BulkListParams,
  keep: (item: BulkPreviewItem) => boolean = () => true
): Promise<BulkPreviewItem[]> {
  const out: BulkPreviewItem[] = []
  const pageSize = 50
  const maxPages = Math.max(10, Math.ceil(params.count / pageSize) * 5)
  const where = topWhere(params)
  const orderBy = topOrderBy(params.sort)
  for (let page = 0; page < maxPages; page++) {
    let rows: ReturnType<typeof parseTopRows>
    try {
      rows = parseTopRows(
        await gql(TOP_QUERY, { where, orderBy, limit: pageSize, offset: page * pageSize })
      )
    } catch (e) {
      if (out.length > 0) return out
      throw e
    }
    for (const r of rows) {
      const item: BulkPreviewItem = {
        sourceId: r.id,
        title: r.title,
        year: r.year,
        coverUrl: r.coverUrl,
        score: r.rating
      }
      if (!keep(item)) continue
      out.push(item)
      if (out.length >= params.count) return out
    }
    if (rows.length < pageSize) return out
  }
  return out
}

// ---------------- Import ----------------

interface Extras {
  seriesEntries: SeriesEntry[] | null
  characters: HardcoverCharacter[] | null
  // null = the Wikidata lookup failed; keep whatever edges the book already has.
  adaptations: { qid: string; method: 'xref' | 'exact'; list: Adaptation[] } | 'none' | null
}

async function fetchExtras(book: NormalizedBook, mediaId: number | null): Promise<Extras> {
  const extras: Extras = { seriesEntries: null, characters: null, adaptations: null }
  const featured = book.series[0]
  if (featured) {
    try {
      extras.seriesEntries = parseSeriesBooks(
        await gql(SERIES_QUERY, { id: featured.id, limit: MAX_SERIES_BOOKS })
      )
    } catch (e) {
      logWarn('http', `hardcover: series ${featured.id} failed: ${(e as Error).message}`)
    }
  } else {
    extras.seriesEntries = []
  }
  try {
    extras.characters = parseCharacters(await gql(CHARACTERS_QUERY, { id: book.id, limit: MAX_CHARACTERS }))
  } catch (e) {
    logWarn('http', `hardcover: characters for ${book.id} failed: ${(e as Error).message}`)
  }
  try {
    // A manual Wikidata link (or manual unlink) on an existing row wins.
    const manual = mediaId != null ? externalLinkRepo.get(mediaId, 'wikidata') : null
    const match =
      manual?.method === 'manual'
        ? manual.externalId
          ? { qid: manual.externalId, method: 'exact' as const }
          : null
        : await findBookItem({
            title: book.title,
            authors: book.credits.filter((c) => c.role === 'writer').map((c) => c.person.name),
            wikipediaTitle: book.wikipediaTitle
          })
    extras.adaptations = match
      ? { qid: match.qid, method: match.method, list: await adaptationsOf(match.qid) }
      : 'none'
  } catch (e) {
    logWarn('http', `hardcover: adaptations for ${book.id} failed: ${(e as Error).message}`)
  }
  return extras
}

// Tag names are unique across categories. A name already held by another
// category (a hand-made tag, another importer's scope) is skipped: the link
// would sit outside this category, so a later re-import could never prune it.
function tagId(db: any, name: string, category: string): number | null {
  const row = db.prepare('SELECT id, category FROM tag WHERE name = ?').get(name) as
    | { id: number; category: string | null }
    | undefined
  if (row) return row.category === category ? row.id : null
  return Number(db.prepare('INSERT INTO tag (name, category) VALUES (?, ?)').run(name, category).lastInsertRowid)
}

// Replaces this title's links to tags of ONE category (the launchboxCatalog
// posture): a user's own uncategorized tags are never touched.
function replaceTags(db: any, mediaId: number, category: string, names: string[]): void {
  db.prepare(
    'DELETE FROM media_tag WHERE media_id = ? AND tag_id IN (SELECT id FROM tag WHERE category = ?)'
  ).run(mediaId, category)
  const ins = db.prepare('INSERT OR IGNORE INTO media_tag (media_id, tag_id) VALUES (?, ?)')
  for (const name of names) {
    const id = tagId(db, name, category)
    if (id != null) ins.run(mediaId, id)
  }
}

function mergeMetadata(db: any, mediaId: number, patch: Record<string, unknown>): void {
  const row = db.prepare('SELECT metadata FROM media_item WHERE id = ?').get(mediaId) as
    | { metadata: string | null }
    | undefined
  let meta: Record<string, unknown> = {}
  try {
    meta = row?.metadata ? JSON.parse(row.metadata) || {} : {}
  } catch {
    meta = {}
  }
  for (const [k, v] of Object.entries(patch)) {
    if (v == null) delete meta[k]
    else meta[k] = v
  }
  db.prepare('UPDATE media_item SET metadata = ? WHERE id = ?').run(JSON.stringify(meta), mediaId)
}

function upsertPerson(db: any, p: NormalizedBook['credits'][number]['person'], photo: string | null): number {
  const row = db
    .prepare('SELECT id, photo_path FROM person WHERE external_source = ? AND external_id = ?')
    .get(HARDCOVER_SOURCE, String(p.id)) as { id: number; photo_path: string | null } | undefined
  if (row) {
    // Bios are hand-editable on the person page, so an import only fills gaps.
    db.prepare(
      `UPDATE person SET name = ?, photo_path = COALESCE(photo_path, ?), bio = COALESCE(bio, ?),
         birthday = COALESCE(?, birthday) WHERE id = ?`
    ).run(p.name, photo, p.bio, p.birthday, row.id)
    return row.id
  }
  return Number(
    db
      .prepare(
        `INSERT INTO person (name, photo_path, bio, birthday, external_source, external_id)
         VALUES (?, ?, ?, ?, ?, ?)`
      )
      .run(p.name, photo, p.bio, p.birthday, HARDCOVER_SOURCE, String(p.id)).lastInsertRowid
  )
}

function upsertCharacter(db: any, c: HardcoverCharacter): number {
  const row = db
    .prepare('SELECT id FROM character WHERE external_source = ? AND external_id = ?')
    .get(HARDCOVER_SOURCE, String(c.id)) as { id: number } | undefined
  if (row) {
    db.prepare('UPDATE character SET name = ?, description = COALESCE(?, description) WHERE id = ?').run(
      c.name,
      c.description,
      row.id
    )
    return row.id
  }
  return Number(
    db
      .prepare('INSERT INTO character (name, description, external_source, external_id) VALUES (?, ?, ?, ?)')
      .run(c.name, c.description, HARDCOVER_SOURCE, String(c.id)).lastInsertRowid
  )
}

function upsertPublisher(db: any, p: { id: number; name: string }): number {
  const row = db
    .prepare('SELECT id FROM company WHERE external_source = ? AND external_id = ?')
    .get(HARDCOVER_SOURCE, String(p.id)) as { id: number } | undefined
  if (row) {
    db.prepare('UPDATE company SET name = ? WHERE id = ?').run(p.name, row.id)
    return row.id
  }
  return Number(
    db
      .prepare('INSERT INTO company (name, type, external_source, external_id) VALUES (?, ?, ?, ?)')
      .run(p.name, 'publisher', HARDCOVER_SOURCE, String(p.id)).lastInsertRowid
  )
}

// Two-phase like every importer: the book, its series, characters, the
// Wikidata adaptations and one image batch first, then every write in one
// transaction. A partial refresh (`only`) writes media_item columns and nothing
// else — no child block runs, so nothing is pruned (CLAUDE.md, hard invariants).
export async function importBook(
  bookId: number,
  opts: { only?: RefreshAspect[] } = {}
): Promise<ImportSummary> {
  if (!Number.isInteger(bookId) || bookId <= 0) throw new Error('Invalid Hardcover book id')
  const partial = !!opts.only?.length
  const wants = (a: RefreshAspect): boolean => !partial || !!opts.only?.includes(a)

  const data = await gql(BOOK_QUERY, { id: bookId })
  const book = normalizeBook(data?.books_by_pk)
  if (!book) throw new Error('Book not found on Hardcover')

  const db = getSqlite()
  const existing = db
    .prepare('SELECT id FROM media_item WHERE external_source = ? AND external_id = ?')
    .get(HARDCOVER_SOURCE, String(book.id)) as { id: number } | undefined
  if (!existing && partial) throw new Error('That title is not in the library — import it first.')

  const extras: Extras = partial
    ? { seriesEntries: null, characters: null, adaptations: null }
    : await fetchExtras(book, existing?.id ?? null)

  const people = partial ? [] : book.credits
  const images = await downloadScaledImages(
    [wants('cover') ? book.coverUrl : null, ...people.map((c) => c.person.photoUrl)],
    COVER_EDGE
  )
  const coverPath = book.coverUrl && wants('cover') ? (images.get(book.coverUrl) ?? null) : null

  updateActivity({ phase: 'writing' })
  return db.transaction((): ImportSummary => {
    let mediaId: number
    const created = !existing
    if (existing) {
      mediaId = existing.id
      const sets: string[] = []
      const args: unknown[] = []
      if (wants('text')) {
        // The chosen edition's page count is the user's progress total; then
        // the book's; never wipe a hand-entered count with a missing one.
        sets.push(
          'title = ?',
          'synopsis = COALESCE(?, synopsis)',
          'total_units = COALESCE((SELECT pages FROM book_edition WHERE media_id = media_item.id), ?, total_units)',
          'release_date = COALESCE(?, release_date)'
        )
        args.push(book.title, book.synopsis, book.pages, book.releaseDate)
      }
      if (wants('cover')) {
        sets.push('cover_path = COALESCE(?, cover_path)')
        args.push(coverPath)
      }
      sets.push("updated_at = datetime('now')")
      db.prepare(`UPDATE media_item SET ${sets.join(', ')} WHERE id = ?`).run(...args, mediaId)
    } else {
      mediaId = Number(
        db
          .prepare(
            `INSERT INTO media_item
               (media_type, title, synopsis, cover_path, total_units, release_date, external_source, external_id)
             VALUES ('book', ?, ?, ?, ?, ?, ?, ?)`
          )
          .run(book.title, book.synopsis, coverPath, book.pages, book.releaseDate, HARDCOVER_SOURCE, String(book.id))
          .lastInsertRowid
      )
    }

    if (wants('text')) {
      const series = book.series[0] ?? null
      mergeMetadata(db, mediaId, {
        hcRating: book.rating,
        hcRatings: book.ratingsCount || null,
        hcReaders: book.readers || null,
        hcSlug: book.slug,
        subtitle: book.subtitle,
        headline: book.headline,
        bookCategory: book.category,
        literaryType: book.literaryType,
        audioSeconds: book.audioSeconds,
        series: series
          ? { name: series.name, position: series.position, details: series.details, count: series.count }
          : null
      })
    }

    if (partial) return { mediaId, title: book.title, studios: 0, cast: 0, staff: 0, created }

    // ---- tags: genre (shared facet), mood, content warning ----
    for (const { category, names } of book.tags) replaceTags(db, mediaId, category, names)

    // ---- publisher (the default physical edition's) ----
    let studios = 0
    db.prepare(
      `DELETE FROM media_company WHERE media_id = ? AND company_id IN
         (SELECT id FROM company WHERE external_source = ?)`
    ).run(mediaId, HARDCOVER_SOURCE)
    if (book.publisher) {
      db.prepare('INSERT OR IGNORE INTO media_company (media_id, company_id, role) VALUES (?, ?, ?)').run(
        mediaId,
        upsertPublisher(db, book.publisher),
        'publisher'
      )
      studios = 1
    }

    // ---- contributors: authors as 'writer' (the Authors crew), the rest as
    // artist/staff with Hardcover's own role text. Only rows this importer
    // wrote (origin 'hardcover') are replaced; hand-made credits survive. ----
    db.prepare('DELETE FROM credit WHERE media_id = ? AND origin = ?').run(mediaId, HARDCOVER_SOURCE)
    const insCredit = db.prepare(
      'INSERT INTO credit (media_id, person_id, role, role_note, importance, origin) VALUES (?, ?, ?, ?, ?, ?)'
    )
    book.credits.forEach((c, i) => {
      const photo = c.person.photoUrl ? (images.get(c.person.photoUrl) ?? null) : null
      insCredit.run(mediaId, upsertPerson(db, c.person, photo), c.role, c.note, i, HARDCOVER_SOURCE)
    })

    // ---- characters (character-only cast, as for manga) ----
    let cast = 0
    if (extras.characters) {
      const previous = (
        db
          .prepare(
            `SELECT mc.character_id AS id FROM media_character mc JOIN character c ON c.id = mc.character_id
             WHERE mc.media_id = ? AND c.external_source = ?`
          )
          .all(mediaId, HARDCOVER_SOURCE) as { id: number }[]
      ).map((r) => r.id)
      db.prepare(
        `DELETE FROM media_character WHERE media_id = ? AND character_id IN
           (SELECT id FROM character WHERE external_source = ?)`
      ).run(mediaId, HARDCOVER_SOURCE)
      const insLink = db.prepare(
        'INSERT OR IGNORE INTO media_character (media_id, character_id, sort_order) VALUES (?, ?, ?)'
      )
      extras.characters.forEach((c, i) => insLink.run(mediaId, upsertCharacter(db, c), i))
      cast = extras.characters.length
      // Only the characters this book dropped, and only once nothing links them.
      const orphan = db.prepare(
        `DELETE FROM character WHERE id = ? AND external_source = ?
           AND NOT EXISTS (SELECT 1 FROM media_character WHERE character_id = character.id)
           AND NOT EXISTS (SELECT 1 FROM credit WHERE character_id = character.id)`
      )
      for (const id of previous) orphan.run(id, HARDCOVER_SOURCE)
    }

    // ---- series siblings as relations ----
    if (extras.seriesEntries) {
      db.prepare(`DELETE FROM media_relation WHERE media_id = ? AND related_source = ?`).run(
        mediaId,
        HARDCOVER_SOURCE
      )
      const ins = db.prepare(
        `INSERT OR IGNORE INTO media_relation
           (media_id, relation_type, related_source, related_external_id, related_type, related_title, sort_order)
         VALUES (?, ?, ?, ?, 'book', ?, ?)`
      )
      const selfPosition = book.series[0]?.position ?? null
      seriesRelations(book.id, selfPosition, extras.seriesEntries).forEach(({ relationType, entry }, i) => {
        const label = entry.position != null ? `${entry.title} (#${entry.details ?? entry.position})` : entry.title
        ins.run(mediaId, relationType, HARDCOVER_SOURCE, String(entry.bookId), label, i)
      })
    }

    // ---- screen adaptations (Wikidata) ----
    if (extras.adaptations) {
      db.prepare(
        `DELETE FROM media_relation WHERE media_id = ? AND relation_type = 'ADAPTATION'
           AND related_source IN ('tmdb', 'anilist')`
      ).run(mediaId)
      if (extras.adaptations !== 'none') {
        const ins = db.prepare(
          `INSERT OR IGNORE INTO media_relation
             (media_id, relation_type, related_source, related_external_id, related_type, related_title, sort_order)
           VALUES (?, 'ADAPTATION', ?, ?, ?, ?, ?)`
        )
        extras.adaptations.list.forEach((a, i) => {
          const edge = adaptationEdge(a)
          ins.run(mediaId, edge.relatedSource, a.externalId, edge.relatedType, a.title, 1000 + i)
        })
        externalLinkRepo.set(mediaId, 'wikidata', extras.adaptations.qid, extras.adaptations.method)
      } else if (externalLinkRepo.get(mediaId, 'wikidata')?.method !== 'manual') {
        // The book no longer matches its earlier automatic item; a manual link
        // or unlink stays the user's.
        externalLinkRepo.reset(mediaId, 'wikidata')
      }
    }

    return {
      mediaId,
      title: book.title,
      studios,
      cast,
      staff: book.credits.length,
      created
    }
  })()
}

