import { createGunzip } from 'zlib'
import { getSqlite } from './db/connection'
import {
  getCatalogDb,
  closeCatalogDb,
  catalogPath,
  inspectCatalogFile
} from './gamesCatalogDb'
import { downloadImages } from './files'
import { updateActivity } from './progress'
import { fetchWithRetry, MAX_API_RESPONSE_BYTES } from './http'
import { streamResponseToFile } from './streamDownload'
import { fetchPlaytimes, hltbLengthHours } from './hltb'
import type {
  BulkListParams,
  BulkPreviewItem,
  GamesCatalogStatus,
  ImportSearchResult,
  ImportSummary
} from '@shared/types'

// The OFFLINE games catalog — RAWG's final public dataset (CC0 dump from
// 2026-06, filtered to games at least one RAWG user ever tracked, ~120k rows)
// packed into a prebuilt SQLite and attached to a GitHub PRERELEASE on this
// repo (prerelease so electron-updater's /releases/latest never sees it).
// Console coverage is the point: RAWG had everything, Steam only has PC.
// Search is local FTS ranked by RAWG popularity; import writes media rows
// under external_source 'rawg' with RAWG ids, so titles imported back when
// RAWG's API was alive match and update instead of duplicating. Covers come
// from media.rawg.io, which outlived the API — a cover miss never blocks.
const CATALOG_TAG = 'games-catalog-1'
const ASSET_NAME = 'rawg-catalog.db.gz'
// Same owner/repo the updater pins (updater.ts documents why they're constants).
const GITHUB_OWNER = 'Xamiru'
const GITHUB_REPO = 'NaviHUB'
const SOURCE = 'rawg'
const MAX_CATALOG_ARCHIVE_BYTES = 96 * 1024 * 1024
const MAX_CATALOG_DATABASE_BYTES = 512 * 1024 * 1024

const GH_HEADERS = { 'user-agent': 'NaviHUB' }

export function status(): GamesCatalogStatus {
  const db = getCatalogDb()
  if (!db) return { installed: false, gameCount: 0, snapshot: null }
  try {
    const count = (db.prepare('SELECT COUNT(*) AS n FROM catalog_game').get() as { n: number }).n
    const snap = db.prepare(`SELECT value FROM catalog_meta WHERE key = 'snapshot'`).get() as
      | { value: string }
      | undefined
    return { installed: true, gameCount: count, snapshot: snap?.value ?? null }
  } catch {
    return { installed: false, gameCount: 0, snapshot: null }
  }
}

// Download the data pack from the games-catalog release. Stage-then-swap: the
// gunzipped file lands beside the target and is renamed into place, so a
// failed download can never leave a truncated catalog behind.
export async function install(): Promise<GamesCatalogStatus> {
  const relRes = await fetchWithRetry(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/tags/${CATALOG_TAG}`,
    {
      headers: { ...GH_HEADERS, accept: 'application/vnd.github+json' },
      timeoutMs: 20_000,
      maxResponseBytes: MAX_API_RESPONSE_BYTES
    }
  )
  if (!relRes.ok) {
    throw new Error(`Catalog release not found (${relRes.status}) — has ${CATALOG_TAG} been published?`)
  }
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const rel = (await relRes.json()) as any
  const asset = (rel?.assets ?? []).find((a: any) => a?.name === ASSET_NAME)
  if (!asset?.browser_download_url) {
    throw new Error(`The ${CATALOG_TAG} release has no ${ASSET_NAME} download.`)
  }

  updateActivity({ phase: 'fetching' })
  const dlRes = await fetchWithRetry(String(asset.browser_download_url), {
    headers: GH_HEADERS,
    timeoutMs: 600_000
  })
  if (!dlRes.ok) throw new Error(`Catalog download failed (${dlRes.status})`)
  const target = catalogPath()
  let progressMark = 0
  await streamResponseToFile(dlRes, target, {
    label: 'Games catalog archive',
    maxInputBytes: MAX_CATALOG_ARCHIVE_BYTES,
    maxOutputBytes: MAX_CATALOG_DATABASE_BYTES,
    transform: createGunzip(),
    replace: true,
    onProgress: (done, total) => {
      // Keep progress responsive without churning the task row for every small
      // network chunk. Completion is surfaced by the writing phase below.
      if (done === 0 || done === total || done - progressMark >= 512 * 1024) {
        progressMark = done
        updateActivity({ phase: 'fetching', done, total })
      }
    },
    validateTemp: (tmp) => {
      inspectCatalogFile(tmp)
    },
    beforeCommit: () => {
      updateActivity({ phase: 'writing' })
      closeCatalogDb() // release any handle on the old file before the swap
    }
  })

  const after = status()
  if (!after.installed || after.gameCount === 0) {
    closeCatalogDb()
    throw new Error('Installed catalog could not be opened — try installing again.')
  }
  return after
}

// User text → FTS5 prefix query: bare quoted tokens ANDed, each with a
// trailing *. Quoting neutralizes FTS operators (NEAR, -, ^) in user input.
export function ftsQueryFor(raw: string): string | null {
  const tokens = raw
    .split(/\s+/)
    .map((t) => t.replace(/"/g, '').trim())
    .filter(Boolean)
  if (!tokens.length) return null
  return tokens.map((t) => `"${t}"*`).join(' ')
}

interface CatalogRow {
  id: number
  name: string
  name_original: string | null
  released: string | null
  image_url: string | null
  rating: number | null
  ratings_count: number | null
  added: number
  metacritic: number | null
  playtime: number | null
  platforms: string | null
  developers: string | null
  publishers: string | null
  genres: string | null
  description: string | null
}

export function search(query: string): ImportSearchResult[] {
  const db = getCatalogDb()
  if (!db) {
    throw new Error('The offline games catalog is not installed yet — use its Install button in this dialog.')
  }
  const fts = ftsQueryFor(query)
  if (!fts) return []
  const rows = db
    .prepare(
      `SELECT g.* FROM catalog_fts f JOIN catalog_game g ON g.id = f.rowid
       WHERE catalog_fts MATCH ? ORDER BY g.added DESC LIMIT 20`
    )
    .all(fts) as CatalogRow[]
  return rows.map((g) => ({
    id: g.id,
    title: g.name,
    native: g.name_original !== g.name ? g.name_original : null,
    year: g.released ? Number(g.released.slice(0, 4)) || null : null,
    // Platform slugs make the picker's subtitle ("playstation-5 · xbox-one"),
    // the disambiguator between same-named entries.
    format: platformLabel(g.platforms),
    episodes: null,
    coverUrl: g.image_url
  }))
}

function platformLabel(platformsJson: string | null): string {
  try {
    const slugs = JSON.parse(platformsJson ?? '[]') as string[]
    return slugs.length ? slugs.slice(0, 4).join(' · ') : 'Game'
  } catch {
    return 'Game'
  }
}

// Two-phase like every importer, sourced from the local row: cover + HLTB
// first, then one transaction. Upserts under ('rawg', id) — authoritative for
// canonical fields, preserves personal tracking, exactly like rawg.ts did.
// opts.skipHltb is the bulk path: 2000 back-to-back HowLongToBeat lookups is
// how an IP gets rate-limited, so bulk imports take the dump's playtime and
// leave HLTB to the detail page's per-title Fetch button.
export async function importGame(
  catalogId: number,
  opts: { skipHltb?: boolean } = {}
): Promise<ImportSummary> {
  const db = getCatalogDb()
  if (!db) throw new Error('The offline games catalog is not installed yet.')
  const g = db.prepare('SELECT * FROM catalog_game WHERE id = ?').get(catalogId) as
    | CatalogRow
    | undefined
  if (!g) throw new Error('Game not found in the catalog')

  const images = await downloadImages([g.image_url])
  const coverPath = g.image_url ? (images.get(g.image_url) ?? null) : null

  const year = g.released ? Number(g.released.slice(0, 4)) || null : null
  const hltbTimes = opts.skipHltb ? null : await fetchPlaytimes(g.name, year)
  const lengthHours =
    (hltbTimes ? hltbLengthHours(hltbTimes) : null) ??
    (g.playtime && g.playtime > 0 ? g.playtime : null)

  const main = getSqlite()
  updateActivity({ phase: 'writing' })
  return main.transaction((): ImportSummary => {
    const native = g.name_original && g.name_original !== g.name ? g.name_original : null
    const existing = main
      .prepare('SELECT id FROM media_item WHERE external_source = ? AND external_id = ?')
      .get(SOURCE, String(g.id)) as { id: number } | undefined

    let mediaId: number
    const created = !existing
    if (existing) {
      mediaId = existing.id
      main
        .prepare(
          `UPDATE media_item SET title=?, title_original=?, synopsis=?, cover_path=COALESCE(?, cover_path),
           total_units=COALESCE(?, total_units), release_date=?, updated_at=datetime('now') WHERE id=?`
        )
        .run(g.name, native, g.description || null, coverPath, lengthHours, g.released, mediaId)
    } else {
      const info = main
        .prepare(
          `INSERT INTO media_item
           (media_type, title, title_original, synopsis, cover_path, total_units, release_date,
            external_source, external_id)
           VALUES ('game', ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .run(g.name, native, g.description || null, coverPath, lengthHours, g.released, SOURCE, String(g.id))
      mediaId = Number(info.lastInsertRowid)
    }

    // ---- Metacritic + HLTB -> metadata, merged ----
    if ((g.metacritic ?? 0) > 0 || hltbTimes) {
      const metaRow = main.prepare('SELECT metadata FROM media_item WHERE id=?').get(mediaId) as
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
      if ((g.metacritic ?? 0) > 0) metaObj.metacritic = g.metacritic
      if (hltbTimes) metaObj.hltb = hltbTimes
      main.prepare('UPDATE media_item SET metadata=? WHERE id=?').run(JSON.stringify(metaObj), mediaId)
    }

    // ---- developers/publishers -> companies, deduped by ('rawg', id) — the
    // same key rawg.ts used, so companies from the API era are reused. ----
    let studios = 0
    const parse = (json: string | null): { id: number; name: string }[] | null => {
      if (json == null) return null
      try {
        const rows = JSON.parse(json)
        return Array.isArray(rows) ? rows.filter((c: any) => c?.id && c?.name) : null
      } catch {
        return null
      }
    }
    const companyRoles: [{ id: number; name: string }[] | null, string][] = [
      [parse(g.developers), 'developer'],
      [parse(g.publishers), 'publisher']
    ]
    for (const [nodes, role] of companyRoles) {
      if (!nodes) continue
      main.prepare('DELETE FROM media_company WHERE media_id=? AND role=?').run(mediaId, role)
      for (const node of nodes) {
        const row = main
          .prepare('SELECT id FROM company WHERE external_source=? AND external_id=?')
          .get(SOURCE, String(node.id)) as { id: number } | undefined
        const companyId = row
          ? row.id
          : Number(
              main
                .prepare(
                  'INSERT INTO company (name, type, external_source, external_id) VALUES (?, ?, ?, ?)'
                )
                .run(node.name, 'developer', SOURCE, String(node.id)).lastInsertRowid
            )
        main
          .prepare('INSERT OR IGNORE INTO media_company (media_id, company_id, role) VALUES (?, ?, ?)')
          .run(mediaId, companyId, role)
        studios++
      }
    }

    // ---- genres -> tags ----
    let genres: string[] | null = null
    try {
      const rows = JSON.parse(g.genres ?? 'null')
      if (Array.isArray(rows)) genres = rows.filter(Boolean)
    } catch {
      genres = null
    }
    if (genres) {
      main.prepare(
        `DELETE FROM media_tag
         WHERE media_id=? AND tag_id IN (SELECT id FROM tag WHERE category='genre')`
      ).run(mediaId)
    }
    for (const name of genres ?? []) {
      const existingTag = main.prepare('SELECT id FROM tag WHERE name=?').get(name) as
        | { id: number }
        | undefined
      const tagId = existingTag
        ? existingTag.id
        : Number(
            main.prepare('INSERT INTO tag (name, category) VALUES (?, ?)').run(name, 'genre')
              .lastInsertRowid
          )
      main
        .prepare('INSERT OR IGNORE INTO media_tag (media_id, tag_id) VALUES (?, ?)')
        .run(mediaId, tagId)
    }

    // The dump has no cast/staff — hand-curated as always for games.
    return { mediaId, title: g.name, studios, cast: 0, staff: 0, created }
  })()
}

// ---------------- Top lists (the /bulk page) ----------------
// Local SQL, so every sort is free. Floors keep each list honest: 'rating'
// needs real votes behind it, and 'newest' needs a popularity floor or the
// dump's daily shovelware tops the shelf (the added>=1 pack filter is no bar
// at all for brand-new junk). Genre matches the JSON array with the quotes
// included so "Card" can't substring-match "Board Games"… or anything else.
export function buildCatalogQuery(params: BulkListParams): { sql: string; args: unknown[] } {
  const where: string[] = []
  const args: unknown[] = []
  let order: string
  switch (params.sort) {
    case 'popular':
      order = 'added DESC, id'
      break
    case 'metacritic':
      where.push('metacritic IS NOT NULL')
      order = 'metacritic DESC, added DESC, id'
      break
    case 'rating':
      where.push('rating IS NOT NULL', 'ratings_count >= 50')
      order = 'rating DESC, ratings_count DESC, id'
      break
    case 'newest':
      where.push('released IS NOT NULL', 'added >= 5')
      order = 'released DESC, added DESC, id'
      break
    default:
      throw new Error(`Unknown catalog sort: ${params.sort}`)
  }
  if (params.yearFrom) {
    where.push('released >= ?')
    args.push(`${params.yearFrom}-01-01`)
  }
  if (params.yearTo) {
    where.push('released <= ?')
    args.push(`${params.yearTo}-12-31`)
  }
  if (params.genre) {
    where.push('genres LIKE ?')
    args.push(`%"${params.genre}"%`)
  }
  const sql = `SELECT * FROM catalog_game${where.length ? ` WHERE ${where.join(' AND ')}` : ''} ORDER BY ${order} LIMIT ? OFFSET ?`
  return { sql, args }
}

// `keep` decides whether a row counts toward `count` (bulkImport.ts passes
// "not already in the library") — the scan walks the sorted list in chunks and
// keeps going until `count` NEW games are found or the catalog runs out, so
// "top 100" always yields a full 100. Local SQL, so over-scanning is free.
export function listTop(
  params: BulkListParams,
  keep: (item: BulkPreviewItem) => boolean = () => true
): BulkPreviewItem[] {
  const db = getCatalogDb()
  if (!db) throw new Error('The offline games catalog is not installed yet.')
  const { sql, args } = buildCatalogQuery(params)
  const stmt = db.prepare(sql)
  const CHUNK = 500
  const out: BulkPreviewItem[] = []
  for (let offset = 0; ; offset += CHUNK) {
    const rows = stmt.all(...args, CHUNK, offset) as CatalogRow[]
    for (const g of rows) {
      const item: BulkPreviewItem = {
        sourceId: g.id,
        title: g.name,
        year: g.released ? Number(g.released.slice(0, 4)) || null : null,
        coverUrl: g.image_url,
        score:
          params.sort === 'metacritic'
            ? g.metacritic
            : params.sort === 'rating'
              ? g.rating
              : (g.metacritic ?? g.rating)
      }
      if (!keep(item)) continue
      out.push(item)
      if (out.length >= params.count) return out
    }
    if (rows.length < CHUNK) return out
  }
}
