import { writeFileSync, renameSync, rmSync } from 'fs'
import { gunzipSync } from 'zlib'
import { getSqlite } from './db/connection'
import { getCatalogDb, closeCatalogDb, catalogPath } from './gamesCatalogDb'
import { downloadImages } from './files'
import { updateActivity } from './progress'
import { fetchWithRetry } from './http'
import { fetchPlaytimes, hltbLengthHours } from './hltb'
import { get as getSetting } from './repos/settingsRepo'
import type { GamesCatalogStatus, ImportSearchResult, ImportSummary } from '@shared/types'

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
const GITHUB_OWNER = 'AmirHTaee'
const GITHUB_REPO = 'NaviHUB'
const SOURCE = 'rawg'

function ghHeaders(): Record<string, string> {
  const token = getSetting('github.token')?.trim()
  if (!token) {
    throw new Error(
      'Set github.token in Settings → System first (the same token the updater uses) — the catalog downloads from your GitHub releases.'
    )
  }
  return { authorization: `token ${token}`, 'user-agent': 'NaviHUB' }
}

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
  const headers = ghHeaders()
  const relRes = await fetchWithRetry(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/tags/${CATALOG_TAG}`,
    { headers: { ...headers, accept: 'application/vnd.github+json' }, timeoutMs: 20_000 }
  )
  if (!relRes.ok) {
    throw new Error(`Catalog release not found (${relRes.status}) — has ${CATALOG_TAG} been published?`)
  }
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const rel = (await relRes.json()) as any
  const asset = (rel?.assets ?? []).find((a: any) => a?.name === ASSET_NAME)
  if (!asset?.url) throw new Error(`The ${CATALOG_TAG} release has no ${ASSET_NAME} asset.`)

  updateActivity({ phase: 'fetching' })
  // The asset API URL + octet-stream Accept is the only way to download a
  // PRIVATE repo's asset (browser_download_url 404s without a session).
  const dlRes = await fetchWithRetry(String(asset.url), {
    headers: { ...headers, accept: 'application/octet-stream' },
    timeoutMs: 600_000
  })
  if (!dlRes.ok) throw new Error(`Catalog download failed (${dlRes.status})`)
  const gz = Buffer.from(await dlRes.arrayBuffer())

  updateActivity({ phase: 'writing' })
  const target = catalogPath()
  const tmp = `${target}.part`
  writeFileSync(tmp, gunzipSync(gz))
  closeCatalogDb() // release any handle on the old file before the swap
  renameSync(tmp, target)

  const after = status()
  if (!after.installed || after.gameCount === 0) {
    rmSync(target, { force: true })
    closeCatalogDb()
    throw new Error('Downloaded catalog looks corrupt — try installing again.')
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
    const parse = (json: string | null): { id: number; name: string }[] => {
      try {
        return (JSON.parse(json ?? '[]') as any[]).filter((c) => c?.id && c?.name)
      } catch {
        return []
      }
    }
    const companyRoles: [{ id: number; name: string }[], string][] = [
      [parse(g.developers), 'developer'],
      [parse(g.publishers), 'publisher']
    ]
    for (const [nodes, role] of companyRoles) {
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
    let genres: string[] = []
    try {
      genres = (JSON.parse(g.genres ?? '[]') as string[]).filter(Boolean)
    } catch {
      genres = []
    }
    for (const name of genres) {
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

// Bulk "top games" shelf: the N most-tracked catalog games (RAWG's `added`),
// imported through the normal path minus HLTB (see importGame). Already-
// imported titles are SKIPPED, never overwritten — which doubles as resume:
// an interrupted run picks up where it stopped when re-run. One title's
// failure (usually a cover download) never sinks the batch.
export async function bulkImport(
  count: number
): Promise<{ imported: number; skipped: number; failed: number }> {
  const db = getCatalogDb()
  if (!db) throw new Error('The offline games catalog is not installed yet.')
  const n = Math.max(1, Math.min(10_000, Math.floor(Number(count) || 0)))
  const ids = (
    db.prepare('SELECT id FROM catalog_game ORDER BY added DESC, id LIMIT ?').all(n) as {
      id: number
    }[]
  ).map((r) => r.id)

  const have = new Set(
    (
      getSqlite()
        .prepare(`SELECT external_id FROM media_item WHERE external_source = 'rawg'`)
        .all() as { external_id: string }[]
    ).map((r) => String(r.external_id))
  )

  let imported = 0
  let skipped = 0
  let failed = 0
  for (let i = 0; i < ids.length; i++) {
    updateActivity({ phase: 'images', done: i + 1, total: ids.length })
    if (have.has(String(ids[i]))) {
      skipped++
      continue
    }
    try {
      await importGame(ids[i], { skipHltb: true })
      imported++
    } catch {
      failed++
    }
  }
  return { imported, skipped, failed }
}
