import { getSqlite } from './db/connection'
import { downloadImages } from './files'
import { updateActivity } from './progress'
import { fetchWithRetry, sleep } from './http'
import { fetchPlaytimes, hltbLengthHours } from './hltb'
import type { ImportSearchResult, ImportSummary } from '@shared/types'

// Steam storefront — the games import source since 2026-08-10. Third source
// this section has had: RAWG died (multi-day outage, semi-maintained for
// years) and IGDB needs Twitch 2FA, whose SMS enrollment doesn't reach the
// user's phone region. Steam's store API needs NO key, NO account and NO
// auth of any kind, and its catalog covers essentially every PC game/VN this
// library imports. rawg.ts and igdb.ts remain (their rows stay re-importable)
// but the UI no longer reaches them.
//
// Endpoints (both keyless, JSON):
//   search:  store.steampowered.com/api/storesearch/?term=…&l=english&cc=US
//   details: store.steampowered.com/api/appdetails?appids=<id>&l=english&cc=US
// Steam has no cast data (characters/VAs stay hand-added) and no length data —
// HowLongToBeat stays the authoritative length, with NO secondary fallback.
const STORE = 'https://store.steampowered.com/api'
const SOURCE = 'steam'

/* eslint-disable @typescript-eslint/no-explicit-any */
async function steamGet(path: string, params: Record<string, string>): Promise<any> {
  const url = new URL(`${STORE}${path}`)
  // English + a fixed storefront country: release_date.date is a LOCALIZED
  // string ("Oct 21, 2022"), so parsing depends on asking consistently.
  url.searchParams.set('l', 'english')
  url.searchParams.set('cc', 'US')
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  const res = await fetchWithRetry(url.toString(), {
    headers: { Accept: 'application/json' },
    timeoutMs: 20_000
  })
  if (!res.ok) throw new Error(`Steam request failed (${res.status})`)
  return res.json()
}

// "Oct 21, 2022" / "21 Oct, 2022" / "2023" → ISO date; null for TBA/invalid.
export function parseSteamDate(raw: string | null | undefined): string | null {
  if (!raw?.trim()) return null
  const ms = Date.parse(raw.trim())
  if (!Number.isFinite(ms)) return null
  return new Date(ms).toISOString().slice(0, 10)
}

function yearOf(date: string | null): number | null {
  if (!date) return null
  const y = Number(date.slice(0, 4))
  return Number.isFinite(y) ? y : null
}

// The store page's portrait capsule — the proper cover-shaped art (the search
// thumb and header_image are landscape). Not every old title has one, so the
// import falls back to header_image when this 404s.
function capsuleUrl(appid: number): string {
  return `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appid}/library_600x900_2x.jpg`
}

// ---------------- Search ----------------
export async function search(query: string): Promise<ImportSearchResult[]> {
  if (!query.trim()) return []
  const data = await steamGet('/storesearch/', { term: query.trim() })
  return (data?.items ?? [])
    .filter((it: any) => it?.type === 'app' && it?.id)
    .map(
      (it: any): ImportSearchResult => ({
        id: Number(it.id),
        title: it.name ?? 'Untitled',
        native: null,
        year: null, // storesearch carries no date; appdetails fills it at import
        format: 'Game',
        episodes: null,
        coverUrl: it.tiny_image ?? null
      })
    )
}

// ---------------- Import ----------------
// Two-phase like every importer: appdetails + cover download + HLTB lookup
// first, then all DB writes in one transaction. Dedup key ('steam', appid);
// re-import refreshes canonical fields and keeps personal tracking.
export async function importGame(appId: number): Promise<ImportSummary> {
  const id = Math.floor(Number(appId))
  if (!Number.isFinite(id) || id <= 0) throw new Error('Bad Steam app id')
  const payload = await steamGet('/appdetails', { appids: String(id) })
  const entry = payload?.[String(id)]
  const g = entry?.success ? entry.data : null
  if (!g?.name) throw new Error('Game not found on Steam')
  // DLC/soundtracks/demos share the search surface; only full games import.
  if (g.type && g.type !== 'game') {
    throw new Error(`"${g.name}" is a ${g.type} on Steam, not a full game`)
  }

  const capsule = capsuleUrl(id)
  const header: string | null = g.header_image ?? null
  const images = await downloadImages([capsule, header])
  const coverPath = images.get(capsule) ?? (header ? (images.get(header) ?? null) : null)
  const released = parseSteamDate(g.release_date?.coming_soon ? null : g.release_date?.date)

  // Steam has no length data at all — HLTB or nothing.
  const hltbTimes = await fetchPlaytimes(g.name, yearOf(released))
  const lengthHours = hltbTimes ? hltbLengthHours(hltbTimes) : null

  const db = getSqlite()
  updateActivity({ phase: 'writing' })
  return db.transaction((): ImportSummary => {
    const title: string = g.name

    // ---- media (preserve personal tracking on re-import) ----
    const existing = db
      .prepare('SELECT id FROM media_item WHERE external_source = ? AND external_id = ?')
      .get(SOURCE, String(id)) as { id: number } | undefined

    let mediaId: number
    const created = !existing
    if (existing) {
      mediaId = existing.id
      db.prepare(
        `UPDATE media_item SET title=?, synopsis=?, cover_path=COALESCE(?, cover_path),
         total_units=COALESCE(?, total_units), release_date=?, updated_at=datetime('now') WHERE id=?`
      ).run(title, g.short_description || null, coverPath, lengthHours, released, mediaId)
    } else {
      const info = db
        .prepare(
          `INSERT INTO media_item
           (media_type, title, synopsis, cover_path, total_units, release_date,
            external_source, external_id)
           VALUES ('game', ?, ?, ?, ?, ?, ?, ?)`
        )
        .run(title, g.short_description || null, coverPath, lengthHours, released, SOURCE, String(id))
      mediaId = Number(info.lastInsertRowid)
    }

    // ---- Metacritic + HLTB -> metadata, merged so other keys survive ----
    const metacritic = typeof g.metacritic?.score === 'number' ? g.metacritic.score : 0
    if (metacritic > 0 || hltbTimes) {
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
      if (metacritic > 0) metaObj.metacritic = metacritic // already in COMMUNITY_SQL
      if (hltbTimes) metaObj.hltb = hltbTimes
      db.prepare('UPDATE media_item SET metadata=? WHERE id=?').run(JSON.stringify(metaObj), mediaId)
    }

    // ---- developers + publishers -> companies. Steam gives bare NAME strings
    // (no ids), so companies match by case-insensitive name — an Atlus row
    // created by any source is reused, never duplicated. ----
    let studios = 0
    const companyRoles: [unknown[], string][] = [
      [g.developers ?? [], 'developer'],
      [g.publishers ?? [], 'publisher']
    ]
    for (const [names, role] of companyRoles) {
      for (const name of names) {
        if (typeof name !== 'string' || !name.trim()) continue
        const companyId = upsertCompanyByName(db, name.trim())
        db.prepare(
          'INSERT OR IGNORE INTO media_company (media_id, company_id, role) VALUES (?, ?, ?)'
        ).run(mediaId, companyId, role)
        studios++
      }
    }

    // ---- genres -> tags ----
    for (const genre of g.genres ?? []) {
      const name = genre?.description
      if (!name) continue
      const existingTag = db.prepare('SELECT id FROM tag WHERE name=?').get(name) as
        | { id: number }
        | undefined
      const tagId = existingTag
        ? existingTag.id
        : Number(
            db.prepare('INSERT INTO tag (name, category) VALUES (?, ?)').run(name, 'genre')
              .lastInsertRowid
          )
      db.prepare('INSERT OR IGNORE INTO media_tag (media_id, tag_id) VALUES (?, ?)').run(
        mediaId,
        tagId
      )
    }

    // Steam has no cast/staff data — those stay hand-curated.
    return { mediaId, title, studios, cast: 0, staff: 0, created }
  })()
}

// ---------------- Metacritic backfill ----------------
// RAWG's Metacritic sync went stale in its final years, so catalog imports of
// 2023+ releases often have no score — but Steam's appdetails carries the
// REAL publisher-linked Metacritic. This walks game rows missing one, finds
// each on Steam by EXACT normalized name (a fuzzy match writing a wrong score
// is worse than no score), and merges it into metadata. Definitive misses are
// stamped metacriticChecked so re-runs skip them — which makes an interrupted
// run resumable, exactly the bulk-import contract.

// Exported for the bulk importer's cross-source games dedup (a Steam-owned
// title has a different id space than a catalog row — the name is the bridge).
export function normTitle(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

export async function lookupMetacritic(title: string): Promise<number | null> {
  const target = normTitle(title)
  // A title with no Latin/digit content (all-CJK, symbols) normalizes to '' —
  // matching on that would let any equally-empty storesearch name through,
  // writing an unrelated game's score. No usable name = a definitive miss.
  if (!target) return null
  const data = await steamGet('/storesearch/', { term: title })
  const match = (data?.items ?? []).find(
    (it: any) => it?.type === 'app' && it?.id && normTitle(String(it.name ?? '')) === target
  )
  if (!match) return null
  const payload = await steamGet('/appdetails', { appids: String(match.id) })
  const entry = payload?.[String(match.id)]
  const score = entry?.success ? entry.data?.metacritic?.score : null
  return typeof score === 'number' && score > 0 ? score : null
}

// appdetails is rate-limited (~200 requests / 5 min / IP) — the delay keeps a
// long run under it; ten consecutive network failures = Steam stopped
// answering, so bail with a resume hint instead of grinding out misses.
// `missed` counts only DEFINITIVE "Steam has no score" titles (stamped, never
// re-asked); transient network failures count as `failed` (unstamped — the
// next run retries them), so the summary can't overstate permanent misses.
export async function backfillMetacritic(
  opts: { delayMs?: number } = {}
): Promise<{ scanned: number; updated: number; missed: number; failed: number }> {
  const delayMs = opts.delayMs ?? 1600
  const db = getSqlite()
  const rows = db
    .prepare(
      `SELECT id, title, metadata FROM media_item
       WHERE media_type = 'game'
         AND (metadata IS NULL OR (json_extract(metadata, '$.metacritic') IS NULL
              AND json_extract(metadata, '$.metacriticChecked') IS NULL))
       ORDER BY id`
    )
    .all() as { id: number; title: string; metadata: string | null }[]

  let updated = 0
  let missed = 0
  let failed = 0
  let consecutiveFailures = 0
  for (let i = 0; i < rows.length; i++) {
    updateActivity({ phase: 'fetching', done: i + 1, total: rows.length })
    const row = rows[i]
    let score: number | null = null
    try {
      score = await lookupMetacritic(row.title)
      consecutiveFailures = 0
    } catch {
      failed++
      consecutiveFailures++
      if (consecutiveFailures >= 10) {
        throw new Error(
          `Steam stopped answering after ${i + 1}/${rows.length} titles (likely rate-limited) — run this again later to continue where it stopped.`
        )
      }
      continue
    }
    let meta: Record<string, unknown> = {}
    try {
      meta = row.metadata ? JSON.parse(row.metadata) || {} : {}
    } catch {
      meta = {}
    }
    if (score != null) {
      meta.metacritic = score
      updated++
    } else {
      // A real "Steam has no score for this exact title" — remember it so the
      // next run doesn't burn its rate budget re-asking.
      meta.metacriticChecked = true
      missed++
    }
    db.prepare(`UPDATE media_item SET metadata = ? WHERE id = ?`).run(JSON.stringify(meta), row.id)
    if (i < rows.length - 1 && delayMs > 0) await sleep(delayMs)
  }
  return { scanned: rows.length, updated, missed, failed }
}

// Steam company entries are bare strings, so the dedup key IS the name
// (case-insensitive). external_id deliberately NULL — there is no stable id
// to store, and the name lookup is what prevents duplicates on re-import.
function upsertCompanyByName(db: any, name: string): number {
  const row = db.prepare('SELECT id FROM company WHERE LOWER(name) = LOWER(?)').get(name) as
    | { id: number }
    | undefined
  if (row) return row.id
  const info = db
    .prepare('INSERT INTO company (name, type, external_source) VALUES (?, ?, ?)')
    .run(name, 'developer', SOURCE)
  return Number(info.lastInsertRowid)
}
