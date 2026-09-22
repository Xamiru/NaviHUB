import { getSqlite } from './db/connection'
import type { RefreshAspect } from '@shared/refresh'
import { downloadImages } from './files'
import { updateActivity } from './progress'
import { fetchWithRetry, MAX_API_RESPONSE_BYTES } from './http'
import type { ImportSearchResult, ImportSummary } from '@shared/types'

// Open Library (openlibrary.org) — the free open book catalog. No API key;
// the docs ask for a descriptive User-Agent (the AnimeThemes posture). Work
// ids are strings ("OL45883W") — the one importer with non-numeric ids, which
// is why ImportSearchResult.id is number | string. Books have no cast data;
// authors land as 'writer' credits (the crew section, titled "Authors").
const BASE = 'https://openlibrary.org'
const COVERS = 'https://covers.openlibrary.org'
const SOURCE = 'openlibrary'
const OL_UA = 'NaviHUB/0.1 (personal media tracker)'

// Open Library subject lists run to hundreds of noisy entries; keep the head.
const MAX_TAGS = 10
const MAX_AUTHORS = 6

/* eslint-disable @typescript-eslint/no-explicit-any */
async function olGet(path: string, params: Record<string, string> = {}): Promise<any> {
  const url = new URL(`${BASE}${path}`)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  const res = await fetchWithRetry(url.toString(), {
    headers: { Accept: 'application/json', 'User-Agent': OL_UA },
    maxResponseBytes: MAX_API_RESPONSE_BYTES
  })
  if (!res.ok) throw new Error(`Open Library request failed (${res.status})`)
  return res.json()
}

// ---------------- Search ----------------
export async function search(query: string): Promise<ImportSearchResult[]> {
  if (!query.trim()) return []
  const data = await olGet('/search.json', {
    q: query,
    limit: '12',
    fields: 'key,title,author_name,first_publish_year,cover_i,number_of_pages_median'
  })
  return (data?.docs ?? [])
    .filter((d: any) => typeof d?.key === 'string' && d.key.startsWith('/works/'))
    .map((d: any) => ({
      id: d.key.slice('/works/'.length),
      title: d.title ?? 'Untitled',
      // The dialog's subtitle line — the author is the disambiguator for books.
      native:
        Array.isArray(d.author_name) && d.author_name.length ? d.author_name.join(', ') : null,
      year: typeof d.first_publish_year === 'number' ? d.first_publish_year : null,
      format: 'Book',
      episodes: typeof d.number_of_pages_median === 'number' ? d.number_of_pages_median : null,
      coverUrl: d.cover_i ? `${COVERS}/b/id/${d.cover_i}-M.jpg` : null
    }))
}

// Work descriptions are either a plain string or { type, value }.
function textOf(v: any): string | null {
  if (typeof v === 'string') return v.trim() || null
  if (v && typeof v.value === 'string') return v.value.trim() || null
  return null
}

// Works carry no page count — editions do, inconsistently. Median of the
// editions that state one is the most honest single number.
function medianPages(editions: any[]): number | null {
  const pages = editions
    .map((e) => e?.number_of_pages)
    .filter((n): n is number => typeof n === 'number' && n > 0)
    .sort((a, b) => a - b)
  if (!pages.length) return null
  return pages[Math.floor(pages.length / 2)]
}

// ---------------- Import ----------------
// Two-phase like every importer: all network work (work + authors + editions +
// ratings + one downloadImages batch), then every DB write in one transaction.
// Everything past the work fetch is best-effort — a missing ratings endpoint
// or author 404 never blocks the import.
export async function importBook(
  olId: string,
  opts: { only?: RefreshAspect[] } = {}
): Promise<ImportSummary> {
  // Library Refresh: media_item columns only. Open Library is the most
  // separable of the importers — authors, page count and rating are each their
  // own request — so a partial refresh skips those fetches too.
  const partial = !!opts.only?.length
  const wants = (a: RefreshAspect): boolean => !partial || !!opts.only?.includes(a)
  if (!/^OL\d+W$/.test(olId)) throw new Error('Invalid Open Library work id')
  const w = await olGet(`/works/${olId}.json`)
  if (!w?.key) throw new Error('Book not found on Open Library')

  const coverUrl: string | null =
    Array.isArray(w.covers) && w.covers[0] > 0 ? `${COVERS}/b/id/${w.covers[0]}-L.jpg` : null

  // Authors: the work lists /authors/OL…A refs; each needs its own fetch.
  const authorKeys: string[] = (partial ? [] : (w.authors ?? []))
    .map((a: any) => a?.author?.key ?? a?.key)
    .filter((k: any): k is string => typeof k === 'string' && k.startsWith('/authors/'))
    .slice(0, MAX_AUTHORS)
  const authors: { key: string; name: string; photoUrl: string | null }[] = []
  for (const key of authorKeys) {
    try {
      const a = await olGet(`${key}.json`)
      if (!a?.name) continue
      authors.push({
        key: key.slice('/authors/'.length),
        name: String(a.name),
        photoUrl:
          Array.isArray(a.photos) && a.photos[0] > 0 ? `${COVERS}/a/id/${a.photos[0]}-M.jpg` : null
      })
    } catch {
      /* best-effort */
    }
  }

  // Both of these feed the 'text' aspect only, and each is its own request —
  // a cover-only refresh has no reason to make them.
  let totalPages: number | null = null
  if (wants('text')) {
    try {
      const ed = await olGet(`/works/${olId}/editions.json`, { limit: '50' })
      totalPages = medianPages(ed?.entries ?? [])
    } catch {
      /* best-effort */
    }
  }

  let olRating: number | null = null
  if (wants('text'))
    try {
      const r = await olGet(`/works/${olId}/ratings.json`)
      const avg = r?.summary?.average
      if (typeof avg === 'number' && avg > 0 && (r?.summary?.count ?? 0) > 0) {
        // 1-5 stars → the shared 0-100 community scale (COMMUNITY_SQL reads it raw).
        olRating = Math.round(avg * 20)
      }
    } catch {
      /* best-effort */
    }

  const images = await downloadImages([coverUrl, ...authors.map((a) => a.photoUrl)])
  const coverPath = coverUrl ? (images.get(coverUrl) ?? null) : null

  const db = getSqlite()
  updateActivity({ phase: 'writing' })
  return db.transaction((): ImportSummary => {
    const title: string = w.title ?? 'Untitled'
    const synopsis = textOf(w.description)
    const releaseDate =
      typeof w.first_publish_date === 'string' && /^\d{4}/.test(w.first_publish_date)
        ? `${w.first_publish_date.slice(0, 4)}-01-01`
        : null

    // ---- media (preserve personal tracking on re-import) ----
    const existing = db
      .prepare('SELECT id FROM media_item WHERE external_source = ? AND external_id = ?')
      .get(SOURCE, olId) as { id: number } | undefined

    let mediaId: number
    const created = !existing
    if (existing) {
      mediaId = existing.id
      // total_units also COALESCEs: the editions median can be null and must
      // never wipe a hand-entered page count.
      const sets: string[] = []
      const args: unknown[] = []
      if (wants('text')) {
        sets.push(
          'title=?',
          'synopsis=COALESCE(?, synopsis)',
          'total_units=COALESCE(?, total_units)',
          'release_date=COALESCE(?, release_date)'
        )
        args.push(title, synopsis, totalPages, releaseDate)
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
           (media_type, title, synopsis, cover_path, total_units, release_date,
            external_source, external_id)
           VALUES ('book', ?, ?, ?, ?, ?, ?, ?)`
        )
        .run(title, synopsis, coverPath, totalPages, releaseDate, SOURCE, olId)
      mediaId = Number(info.lastInsertRowid)
    }

    // ---- rating -> metadata, merged so other keys survive re-import ----
    if (olRating != null && wants('text')) {
      const metaRow = db.prepare('SELECT metadata FROM media_item WHERE id=?').get(mediaId) as
        { metadata: string | null } | undefined
      let metaObj: Record<string, unknown> = {}
      if (metaRow?.metadata) {
        try {
          metaObj = JSON.parse(metaRow.metadata) || {}
        } catch {
          metaObj = {}
        }
      }
      metaObj.olRating = olRating
      db.prepare('UPDATE media_item SET metadata=? WHERE id=?').run(
        JSON.stringify(metaObj),
        mediaId
      )
    }

    // Child rows stop here on a partial refresh.
    if (partial) return { mediaId, title, studios: 0, cast: 0, staff: 0, created }

    // ---- authors -> person + writer credits (the "Authors" crew section) ----
    let staff = 0
    for (const a of authors) {
      const photo = a.photoUrl ? (images.get(a.photoUrl) ?? null) : null
      const row = db
        .prepare('SELECT id, photo_path FROM person WHERE external_source=? AND external_id=?')
        .get(SOURCE, a.key) as { id: number; photo_path: string | null } | undefined
      let personId: number
      if (row) {
        personId = row.id
        if (!row.photo_path && photo) {
          db.prepare('UPDATE person SET photo_path=? WHERE id=?').run(photo, personId)
        }
      } else {
        personId = Number(
          db
            .prepare(
              'INSERT INTO person (name, photo_path, external_source, external_id) VALUES (?, ?, ?, ?)'
            )
            .run(a.name, photo, SOURCE, a.key).lastInsertRowid
        )
      }
      const dup = db
        .prepare(
          'SELECT id FROM credit WHERE media_id=? AND person_id=? AND role=? AND character_id IS NULL'
        )
        .get(mediaId, personId, 'writer')
      if (!dup) {
        db.prepare('INSERT INTO credit (media_id, person_id, role) VALUES (?, ?, ?)').run(
          mediaId,
          personId,
          'writer'
        )
      }
      staff++
    }

    // ---- subjects -> tags (capped: OL subject lists are noisy) ----
    const subjects: string[] = (w.subjects ?? [])
      .filter((s: any): s is string => typeof s === 'string' && s.trim().length > 0)
      .slice(0, MAX_TAGS)
    for (const subject of subjects) {
      const existingTag = db.prepare('SELECT id FROM tag WHERE name=?').get(subject) as
        { id: number } | undefined
      const tagId = existingTag
        ? existingTag.id
        : Number(
            db.prepare('INSERT INTO tag (name, category) VALUES (?, ?)').run(subject, 'genre')
              .lastInsertRowid
          )
      db.prepare('INSERT OR IGNORE INTO media_tag (media_id, tag_id) VALUES (?, ?)').run(
        mediaId,
        tagId
      )
    }

    // Publishers live on editions as bare strings (no ids) — hand-curated.
    return { mediaId, title, studios: 0, cast: 0, staff, created }
  })()
}
