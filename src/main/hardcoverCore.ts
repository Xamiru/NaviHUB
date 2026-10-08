// Hardcover (hardcover.app) — the pure half of the books importer: GraphQL
// documents, request building and every parser, with no network, database or
// electron import, so tests cover the response shapes exhaustively.
//
// The API is GraphQL behind a personal access token (Settings → Integrations).
// Its docs list the fields but not the JSON inside the `cached_*` and `links`
// columns or the search `results` object, so every parser here is defensive:
// unknown shapes yield nothing rather than throwing. Search results come from
// Typesense as `{ found, hits: [{ document }] }`, sometimes JSON-encoded as a
// string; `cached_tags` is an object keyed by category ("Genre", "Mood",
// "Content Warning", "Tag") whose items carry a `tag` name.
//
// Limits (docs, 2026-10): 60 requests a minute, a burst of 10, 5,000 a day on
// the free plan; each TOP-LEVEL field of a query costs one request, so every
// document below has exactly one.

import type { BookEdition } from '@shared/types'

/* eslint-disable @typescript-eslint/no-explicit-any */

export const HARDCOVER_ENDPOINT = 'https://api.hardcover.app/v1/graphql'
export const HARDCOVER_SOURCE = 'hardcover'
export const HARDCOVER_TOKEN_KEY = 'hardcover.token'

// Documented ids (Books schema). Category 10 = Light Novel: the user chose to
// allow light novels and graphic novels in Books (2026-10-09).
export const BOOK_CATEGORY_LABELS: Record<number, string> = {
  1: 'Book',
  2: 'Novella',
  3: 'Short Story',
  4: 'Graphic Novel',
  5: 'Fan Fiction',
  6: 'Research Paper',
  7: 'Poetry',
  8: 'Collection',
  9: 'Web Novel',
  10: 'Light Novel'
}
export const LITERARY_TYPE_LABELS: Record<number, string> = { 1: 'Fiction', 2: 'Nonfiction' }
// Editions: reading_format_id (1=Physical, 2=Audio, 3=Both, 4=Ebook).
export const READING_FORMAT_LABELS: Record<number, string> = {
  1: 'Physical',
  2: 'Audiobook',
  3: 'Physical and audio',
  4: 'Ebook'
}

// Hardcover's tag categories → the local tag.category each one is stored under.
// Genres join the shared 'genre' scope (the library-wide genre facet); moods and
// content warnings keep their own. Free-form user "Tag"s are too noisy to keep.
export const TAG_CATEGORIES: { key: string; category: string; max: number }[] = [
  { key: 'genre', category: 'genre', max: 8 },
  { key: 'mood', category: 'mood', max: 6 },
  { key: 'content warning', category: 'content warning', max: 6 }
]

export const MAX_CONTRIBUTORS = 12
export const MAX_CHARACTERS = 40
export const MAX_SERIES_BOOKS = 60

// ---------------- GraphQL documents ----------------

export const SEARCH_QUERY = `query Search($query: String!, $perPage: Int!) {
  search(query: $query, query_type: "Book", per_page: $perPage, page: 1) { results }
}`

export const BOOK_QUERY = `query Book($id: Int!) {
  books_by_pk(id: $id) {
    id
    title
    subtitle
    headline
    description
    slug
    release_date
    release_year
    pages
    audio_seconds
    rating
    ratings_count
    users_count
    users_read_count
    book_category_id
    literary_type_id
    compilation
    image { url }
    cached_tags
    links
    default_physical_edition { pages publisher { id name } }
    contributions { contribution author { id name bio born_date born_year image { url } } }
    book_series { position details featured series { id name books_count primary_books_count is_completed } }
  }
}`

// The docs' "books in a series" recipe: canonical, whole books, one per
// position, the most-read edition of a position first.
export const SERIES_QUERY = `query SeriesBooks($id: Int!, $limit: Int!) {
  series(where: { id: { _eq: $id } }) {
    id
    name
    book_series(
      distinct_on: position
      order_by: [{ position: asc }, { book: { users_count: desc } }]
      where: { book: { canonical_id: { _is_null: true }, is_partial_book: { _eq: false } }, compilation: { _eq: false } }
      limit: $limit
    ) {
      position
      details
      book { id title release_year }
    }
  }
}`

// book_characters' own columns are undocumented; this is a separate request so
// a schema mismatch costs the characters, never the book.
export const CHARACTERS_QUERY = `query BookCharacters($id: Int!, $limit: Int!) {
  book_characters(where: { book_id: { _eq: $id } }, limit: $limit) {
    character { id name biography }
  }
}`

export const EDITIONS_QUERY = `query Editions($id: Int!) {
  editions(
    where: { book_id: { _eq: $id }, canonical_id: { _is_null: true } }
    order_by: { users_count: desc }
    limit: 60
  ) {
    id
    title
    edition_format
    pages
    release_date
    isbn_13
    isbn_10
    reading_format_id
    audio_seconds
    publisher { name }
    language { language }
    image { url }
  }
}`

export const TOP_QUERY = `query Top($where: books_bool_exp!, $orderBy: [books_order_by!], $limit: Int!, $offset: Int!) {
  books(where: $where, order_by: $orderBy, limit: $limit, offset: $offset) {
    id
    title
    release_year
    rating
    ratings_count
    users_count
    image { url }
  }
}`

// ---------------- Requests ----------------

// Hardcover's settings page shows the token with or without the "Bearer "
// prefix depending on its age; the header always needs exactly one.
export function authorizationHeader(token: string): string {
  return `Bearer ${token.trim().replace(/^bearer\s+/i, '')}`
}

// GraphQL failures come back with HTTP 200 and an `errors` array; HTTP errors
// carry `{ error, error_description }`. Both become one readable message.
export function errorMessage(status: number, body: any): string {
  const detail =
    (typeof body?.error_description === 'string' && body.error_description) ||
    (typeof body?.message === 'string' && body.message) ||
    (typeof body?.error === 'string' && body.error) ||
    ''
  if (status === 401) {
    return 'Hardcover rejected the API token (expired or revoked). Replace it in Settings → Integrations.'
  }
  if (status === 403) {
    return `Hardcover refused the request${detail ? `: ${detail}` : ''}. Check the token's permissions.`
  }
  if (status === 429) return 'Hardcover rate limit reached. Try again in a minute (or tomorrow if the daily limit is spent).'
  return `Hardcover request failed (${status})${detail ? `: ${detail}` : ''}`
}

export function graphqlErrorMessage(errors: any): string | null {
  if (!Array.isArray(errors) || errors.length === 0) return null
  const first = errors[0]
  const text = typeof first === 'string' ? first : first?.message
  return `Hardcover error: ${typeof text === 'string' && text ? text : 'unknown error'}`
}

// ---------------- Small helpers ----------------

function int(v: unknown): number | null {
  const n = typeof v === 'string' && v.trim() !== '' ? Number(v) : v
  return typeof n === 'number' && Number.isInteger(n) ? n : null
}

function num(v: unknown): number | null {
  const n = typeof v === 'string' && v.trim() !== '' ? Number(v) : v
  return typeof n === 'number' && Number.isFinite(n) ? n : null
}

function str(v: unknown): string | null {
  return typeof v === 'string' && v.trim() ? v.trim() : null
}

function url(v: unknown): string | null {
  const s = str(v)
  return s && /^https:\/\//i.test(s) ? s : null
}

// jsonb columns arrive as objects, but a `json` column (and some proxies) hand
// back the encoded string instead.
export function decodeJson(v: unknown): any {
  if (typeof v !== 'string') return v
  try {
    return JSON.parse(v)
  } catch {
    return null
  }
}

// ---------------- Search ----------------

export interface HardcoverSearchHit {
  id: number
  title: string
  authors: string | null
  year: number | null
  pages: number | null
  series: string | null
  coverUrl: string | null
}

// "Dune #1" from the document's featured series, when it has one.
function seriesLabel(featured: any, position: unknown): string | null {
  const name = str(featured?.series?.name) ?? str(featured?.name)
  if (!name) return null
  const pos = num(featured?.position) ?? num(position)
  return pos != null ? `${name} #${pos}` : name
}

export function parseSearchResults(results: unknown): HardcoverSearchHit[] {
  const decoded = decodeJson(results)
  const hits = Array.isArray(decoded?.hits) ? decoded.hits : []
  const out: HardcoverSearchHit[] = []
  for (const hit of hits) {
    const d = hit?.document
    const id = int(d?.id)
    if (id == null || id <= 0) continue
    const authors = Array.isArray(d?.author_names)
      ? d.author_names.filter((a: unknown): a is string => typeof a === 'string' && !!a.trim())
      : []
    out.push({
      id,
      title: str(d?.title) ?? 'Untitled',
      authors: authors.length ? authors.slice(0, 3).join(', ') : null,
      year: int(d?.release_year),
      pages: int(d?.pages),
      series: seriesLabel(d?.featured_series, d?.featured_series_position),
      coverUrl: url(d?.image?.url)
    })
  }
  return out
}

// ---------------- Book ----------------

export interface HardcoverPerson {
  id: number
  name: string
  bio: string | null
  birthday: string | null
  photoUrl: string | null
}

export interface HardcoverCredit {
  person: HardcoverPerson
  role: 'writer' | 'artist' | 'staff'
  // Hardcover's own contribution text for anything but a plain author.
  note: string | null
}

export interface HardcoverSeriesRef {
  id: number
  name: string
  position: number | null
  details: string | null
  count: number | null
  completed: boolean | null
}

export interface NormalizedBook {
  id: number
  title: string
  subtitle: string | null
  headline: string | null
  synopsis: string | null
  slug: string | null
  releaseDate: string | null
  pages: number | null
  audioSeconds: number | null
  // 1-5 stars → the shared 0-100 community scale; null without ratings.
  rating: number | null
  ratingsCount: number
  readers: number
  category: string | null
  literaryType: string | null
  coverUrl: string | null
  tags: { category: string; names: string[] }[]
  credits: HardcoverCredit[]
  // The featured series first; the rest after.
  series: HardcoverSeriesRef[]
  publisher: { id: number; name: string } | null
  wikipediaTitle: string | null
}

// born_date is a real date column; born_year alone keeps the year form the
// person page already understands (see the frozen partial-ISO birthday forms).
function birthday(a: any): string | null {
  const d = str(a?.born_date)
  if (d && /^\d{4}-\d{2}-\d{2}$/.test(d)) return d
  const y = int(a?.born_year)
  return y != null && y > 0 ? String(y).padStart(4, '0') : null
}

export function creditRole(contribution: unknown): { role: HardcoverCredit['role']; note: string | null } {
  const c = str(contribution)
  if (!c || /^author$/i.test(c)) return { role: 'writer', note: null }
  if (/illustrat|cover artist|artist/i.test(c)) return { role: 'artist', note: c }
  return { role: 'staff', note: c }
}

export function parseCredits(contributions: unknown): HardcoverCredit[] {
  const out: HardcoverCredit[] = []
  const seen = new Set<string>()
  for (const c of Array.isArray(contributions) ? contributions : []) {
    const a = c?.author
    const id = int(a?.id)
    const name = str(a?.name)
    if (id == null || !name) continue
    const { role, note } = creditRole(c?.contribution)
    const key = `${id}:${role}`
    if (seen.has(key)) continue
    seen.add(key)
    out.push({
      person: { id, name, bio: str(a?.bio), birthday: birthday(a), photoUrl: url(a?.image?.url) },
      role,
      note
    })
    if (out.length >= MAX_CONTRIBUTORS) break
  }
  // Authors lead the list whatever order the API returned.
  const rank = { writer: 0, artist: 1, staff: 2 }
  return out.sort((x, y) => rank[x.role] - rank[y.role])
}

export function parseTags(cachedTags: unknown): { category: string; names: string[] }[] {
  const decoded = decodeJson(cachedTags)
  if (!decoded || typeof decoded !== 'object' || Array.isArray(decoded)) return []
  const byKey = new Map<string, unknown>()
  for (const [k, v] of Object.entries(decoded)) byKey.set(k.toLowerCase().replace(/[_-]+/g, ' ').trim(), v)
  return TAG_CATEGORIES.map(({ key, category, max }) => {
    const items = byKey.get(key)
    const names: string[] = []
    const seen = new Set<string>()
    for (const item of Array.isArray(items) ? items : []) {
      const name = str(typeof item === 'string' ? item : (item as any)?.tag)
      if (!name || seen.has(name.toLowerCase())) continue
      seen.add(name.toLowerCase())
      names.push(name)
      if (names.length >= max) break
    }
    return { category, names }
  })
}

// `links` is undocumented jsonb; walk it for an English Wikipedia article,
// which is the exact bridge to the book's Wikidata item.
export function findWikipediaTitle(links: unknown): string | null {
  const stack: unknown[] = [decodeJson(links)]
  let guard = 0
  while (stack.length && guard++ < 500) {
    const v = stack.pop()
    if (typeof v === 'string') {
      const m = /^https?:\/\/en\.(?:m\.)?wikipedia\.org\/wiki\/([^?#]+)/i.exec(v.trim())
      if (m) {
        try {
          return decodeURIComponent(m[1]).replace(/_/g, ' ')
        } catch {
          return m[1].replace(/_/g, ' ')
        }
      }
    } else if (Array.isArray(v)) {
      stack.push(...v)
    } else if (v && typeof v === 'object') {
      stack.push(...Object.values(v))
    }
  }
  return null
}

export function parseSeriesRefs(bookSeries: unknown): HardcoverSeriesRef[] {
  const rows = (Array.isArray(bookSeries) ? bookSeries : [])
    .map((bs: any) => {
      const id = int(bs?.series?.id)
      const name = str(bs?.series?.name)
      if (id == null || !name) return null
      return {
        ref: {
          id,
          name,
          position: num(bs?.position),
          details: str(bs?.details),
          count: int(bs?.series?.primary_books_count) ?? int(bs?.series?.books_count),
          completed: typeof bs?.series?.is_completed === 'boolean' ? bs.series.is_completed : null
        },
        featured: bs?.featured === true
      }
    })
    .filter((r): r is { ref: HardcoverSeriesRef; featured: boolean } => r != null)
  const seen = new Set<number>()
  return rows
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .map((r) => r.ref)
    .filter((r) => (seen.has(r.id) ? false : (seen.add(r.id), true)))
}

export function normalizeBook(b: any): NormalizedBook | null {
  const id = int(b?.id)
  if (id == null) return null
  const ratingsCount = int(b?.ratings_count) ?? 0
  const stars = num(b?.rating)
  const releaseDate = str(b?.release_date)
  const year = int(b?.release_year)
  const publisherId = int(b?.default_physical_edition?.publisher?.id)
  const publisherName = str(b?.default_physical_edition?.publisher?.name)
  return {
    id,
    title: str(b?.title) ?? 'Untitled',
    subtitle: str(b?.subtitle),
    headline: str(b?.headline),
    synopsis: str(b?.description),
    slug: str(b?.slug),
    releaseDate:
      releaseDate && /^\d{4}-\d{2}-\d{2}/.test(releaseDate)
        ? releaseDate.slice(0, 10)
        : year != null && year > 0
          ? `${String(year).padStart(4, '0')}-01-01`
          : null,
    pages: positive(int(b?.pages) ?? int(b?.default_physical_edition?.pages)),
    audioSeconds: positive(int(b?.audio_seconds)),
    rating: stars != null && stars > 0 && ratingsCount > 0 ? Math.round(stars * 20) : null,
    ratingsCount,
    readers: int(b?.users_count) ?? 0,
    category: BOOK_CATEGORY_LABELS[int(b?.book_category_id) ?? 0] ?? null,
    literaryType: LITERARY_TYPE_LABELS[int(b?.literary_type_id) ?? 0] ?? null,
    coverUrl: url(b?.image?.url),
    tags: parseTags(b?.cached_tags),
    credits: parseCredits(b?.contributions),
    series: parseSeriesRefs(b?.book_series),
    publisher: publisherId != null && publisherName ? { id: publisherId, name: publisherName } : null,
    wikipediaTitle: findWikipediaTitle(b?.links)
  }
}

function positive(n: number | null): number | null {
  return n != null && n > 0 ? n : null
}

// ---------------- Series ----------------

export interface SeriesEntry {
  bookId: number
  title: string
  position: number | null
  details: string | null
  year: number | null
}

export function parseSeriesBooks(data: unknown): SeriesEntry[] {
  const series = Array.isArray((data as any)?.series) ? (data as any).series[0] : null
  const out: SeriesEntry[] = []
  const seen = new Set<number>()
  for (const bs of Array.isArray(series?.book_series) ? series.book_series : []) {
    const bookId = int(bs?.book?.id)
    if (bookId == null || seen.has(bookId)) continue
    seen.add(bookId)
    out.push({
      bookId,
      title: str(bs?.book?.title) ?? 'Untitled',
      position: num(bs?.position),
      details: str(bs?.details),
      year: int(bs?.book?.release_year)
    })
  }
  return out.sort(
    (a, b) => (a.position ?? Number.MAX_VALUE) - (b.position ?? Number.MAX_VALUE) || a.bookId - b.bookId
  )
}

// Series siblings as relations around this book's own position, so the Related
// section reads in series order (the TMDB collection posture). Unnumbered
// entries, and everything when this book has no position, are SAME_SERIES.
export function seriesRelations(
  selfId: number,
  selfPosition: number | null,
  entries: SeriesEntry[]
): { relationType: 'PREQUEL' | 'SEQUEL' | 'SAME_SERIES'; entry: SeriesEntry }[] {
  return entries
    .filter((e) => e.bookId !== selfId)
    .map((entry) => ({
      relationType:
        selfPosition == null || entry.position == null || entry.position === selfPosition
          ? ('SAME_SERIES' as const)
          : entry.position < selfPosition
            ? ('PREQUEL' as const)
            : ('SEQUEL' as const),
      entry
    }))
}

// ---------------- Characters ----------------

export interface HardcoverCharacter {
  id: number
  name: string
  description: string | null
}

export function parseCharacters(data: unknown): HardcoverCharacter[] {
  const out: HardcoverCharacter[] = []
  const seen = new Set<number>()
  for (const row of Array.isArray((data as any)?.book_characters) ? (data as any).book_characters : []) {
    const c = row?.character
    const id = int(c?.id)
    const name = str(c?.name)
    if (id == null || !name || seen.has(id)) continue
    seen.add(id)
    out.push({ id, name, description: str(c?.biography) })
    if (out.length >= MAX_CHARACTERS) break
  }
  return out
}

// ---------------- Editions ----------------

export type HardcoverEdition = BookEdition

export function parseEditions(data: unknown): HardcoverEdition[] {
  const out: HardcoverEdition[] = []
  for (const e of Array.isArray((data as any)?.editions) ? (data as any).editions : []) {
    const id = int(e?.id)
    if (id == null) continue
    const date = str(e?.release_date)
    out.push({
      id,
      title: str(e?.title),
      format: str(e?.edition_format),
      readingFormat: READING_FORMAT_LABELS[int(e?.reading_format_id) ?? 0] ?? null,
      pages: positive(int(e?.pages)),
      releaseDate: date && /^\d{4}-\d{2}-\d{2}/.test(date) ? date.slice(0, 10) : null,
      isbn13: str(e?.isbn_13),
      isbn10: str(e?.isbn_10),
      audioSeconds: positive(int(e?.audio_seconds)),
      publisher: str(e?.publisher?.name),
      language: str(e?.language?.language),
      coverUrl: url(e?.image?.url)
    })
  }
  return out
}

// ---------------- Bulk lists ----------------

// Book filters for /bulk, keyed by the FROZEN format keys in @shared/bulkImport.
// Every filter uses documented integer columns only.
export function topWhere(params: {
  sort: string
  format?: string | null
  yearFrom?: number | null
  yearTo?: number | null
}): Record<string, unknown> {
  const where: Record<string, unknown> = {
    book_status_id: { _eq: 1 },
    canonical_id: { _is_null: true },
    compilation: { _eq: false },
    users_count: { _gt: 0 }
  }
  switch (params.format) {
    case 'fiction':
      where.literary_type_id = { _eq: 1 }
      where.book_category_id = { _in: [1, 2, 3, 8] }
      break
    case 'nonfiction':
      where.literary_type_id = { _eq: 2 }
      break
    case 'light_novel':
      where.book_category_id = { _eq: 10 }
      break
    case 'graphic_novel':
      where.book_category_id = { _eq: 4 }
      break
    case 'poetry':
      where.book_category_id = { _eq: 7 }
      break
  }
  const year: Record<string, number> = {}
  if (params.yearFrom != null) year._gte = params.yearFrom
  if (params.yearTo != null) year._lte = params.yearTo
  if (Object.keys(year).length) where.release_year = year
  // A handful of votes is not a rating; the floor keeps "top rated" meaningful.
  if (params.sort === 'rated') where.ratings_count = { _gte: 200 }
  return where
}

export function topOrderBy(sort: string): Record<string, string>[] {
  return sort === 'rated'
    ? [{ rating: 'desc_nulls_last' }, { ratings_count: 'desc' }]
    : [{ users_count: 'desc' }]
}

export interface HardcoverTopRow {
  id: number
  title: string
  year: number | null
  coverUrl: string | null
  // 0-5 stars as Hardcover reports it.
  rating: number | null
}

export function parseTopRows(data: unknown): HardcoverTopRow[] {
  const out: HardcoverTopRow[] = []
  for (const b of Array.isArray((data as any)?.books) ? (data as any).books : []) {
    const id = int(b?.id)
    if (id == null) continue
    const stars = num(b?.rating)
    out.push({
      id,
      title: str(b?.title) ?? 'Untitled',
      year: int(b?.release_year),
      coverUrl: url(b?.image?.url),
      rating: stars != null && stars > 0 ? Math.round(stars * 100) / 100 : null
    })
  }
  return out
}
