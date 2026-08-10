import { getSqlite } from './db/connection'
import { downloadImages } from './files'
import { updateActivity } from './progress'
import { fetchWithRetry } from './http'
import { fetchPlaytimes, hltbLengthHours } from './hltb'
import * as settingsRepo from './repos/settingsRepo'
import type { ImportSearchResult, ImportSummary } from '@shared/types'

// IGDB (igdb.com, Twitch-owned) — the games import source since 2026-08, when
// RAWG's chronic outages finally forced the switch (rawg.ts stays for the
// existing 'rawg' rows but is no longer reachable from the UI). Better-curated
// data, same coverage gap: NO cast, so game characters/VAs stay hand-added.
//
// Auth is Twitch OAuth client-credentials: settings `igdb.client_id` +
// `igdb.client_secret` (free app at dev.twitch.tv/console/apps, no card) are
// exchanged for a bearer token cached module-level (~60-day validity; a 401
// re-auths once, the hltb.ts creds posture). Queries are APIcalypse text
// POSTed to https://api.igdb.com/v4/<endpoint>.
const API_BASE = 'https://api.igdb.com/v4'
const SOURCE = 'igdb'

function creds(): { id: string; secret: string } {
  const id = settingsRepo.get('igdb.client_id')?.trim()
  const secret = settingsRepo.get('igdb.client_secret')?.trim()
  if (!id || !secret) {
    throw new Error('Add your IGDB (Twitch) Client ID and Secret in Settings before importing.')
  }
  return { id, secret }
}

let token: { value: string; expiresAtMs: number } | null = null

async function bearer(force = false): Promise<string> {
  if (!force && token && Date.now() < token.expiresAtMs - 60_000) return token.value
  const { id, secret } = creds()
  const url =
    'https://id.twitch.tv/oauth2/token' +
    `?client_id=${encodeURIComponent(id)}&client_secret=${encodeURIComponent(secret)}` +
    '&grant_type=client_credentials'
  const res = await fetchWithRetry(url, { method: 'POST', timeoutMs: 15_000 })
  if (!res.ok) {
    throw new Error(`Twitch auth failed (${res.status}) — check the IGDB Client ID/Secret in Settings.`)
  }
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const j = (await res.json()) as any
  if (!j?.access_token) {
    throw new Error('Twitch auth returned no token — check the IGDB credentials in Settings.')
  }
  token = { value: String(j.access_token), expiresAtMs: Date.now() + (Number(j.expires_in) || 3600) * 1000 }
  return token.value
}

async function igdbQuery(endpoint: string, body: string): Promise<any[]> {
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await fetchWithRetry(`${API_BASE}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Client-ID': creds().id,
        Authorization: `Bearer ${await bearer(attempt > 0)}`,
        Accept: 'application/json'
      },
      body
    })
    if (res.status === 401 && attempt === 0) continue // stale token → re-auth once
    if (!res.ok) throw new Error(`IGDB request failed (${res.status})`)
    const j = await res.json()
    return Array.isArray(j) ? j : []
  }
  return []
}

// images.igdb.com sizes: t_cover_big (264×374) for search thumbs,
// t_cover_big_2x (528×748) for the stored cover.
function coverUrlOf(imageId: string, size: string): string {
  return `https://images.igdb.com/igdb/image/upload/${size}/${imageId}.jpg`
}

function dateOf(unixSec: unknown): string | null {
  if (typeof unixSec !== 'number' || unixSec <= 0) return null
  return new Date(unixSec * 1000).toISOString().slice(0, 10)
}

function yearOf(date: string | null): number | null {
  if (!date) return null
  const y = Number(date.slice(0, 4))
  return Number.isFinite(y) ? y : null
}

// APIcalypse strings are double-quoted; a quote in user input would end the
// string mid-query (there is no escape sequence worth trusting).
function sanitizeQuery(q: string): string {
  return q.replace(/["\\]/g, ' ').trim()
}

// ---------------- Search ----------------
export async function search(query: string): Promise<ImportSearchResult[]> {
  const q = sanitizeQuery(query)
  if (!q) return []
  const rows = await igdbQuery(
    'games',
    `search "${q}"; fields name, first_release_date, cover.image_id; limit 12;`
  )
  return rows.map((g: any): ImportSearchResult => {
    const released = dateOf(g.first_release_date)
    return {
      id: Number(g.id),
      title: g.name ?? 'Untitled',
      native: null,
      year: yearOf(released),
      format: 'Game',
      episodes: null,
      coverUrl: g.cover?.image_id ? coverUrlOf(String(g.cover.image_id), 't_cover_big') : null
    }
  })
}

// ---------------- Import ----------------
// Same two-phase shape as every importer: all network work first (game detail,
// cover download, HLTB lookup, time-to-beat fallback), then every DB write in
// one transaction. Re-import refreshes canonical fields and keeps personal
// tracking; dedup key is ('igdb', id) — rows imported from RAWG stay separate.
export async function importGame(igdbId: number): Promise<ImportSummary> {
  const id = Math.floor(Number(igdbId))
  if (!Number.isFinite(id) || id <= 0) throw new Error('Bad IGDB id')
  const rows = await igdbQuery(
    'games',
    `fields name, summary, first_release_date, cover.image_id, genres.name,
     involved_companies.developer, involved_companies.publisher, involved_companies.company.name,
     total_rating, total_rating_count;
     where id = ${id}; limit 1;`
  )
  const g = rows[0]
  if (!g?.id) throw new Error('Game not found on IGDB')

  const coverUrl: string | null = g.cover?.image_id
    ? coverUrlOf(String(g.cover.image_id), 't_cover_big_2x')
    : null
  const images = await downloadImages([coverUrl])
  const coverPath = coverUrl ? (images.get(coverUrl) ?? null) : null
  const released = dateOf(g.first_release_date)

  // HowLongToBeat is the authoritative length (hours). IGDB's own
  // time-to-beat poll is the fallback — best-effort, never blocks the import.
  const hltbTimes = await fetchPlaytimes(g.name ?? '', yearOf(released))
  let lengthHours = hltbTimes ? hltbLengthHours(hltbTimes) : null
  if (lengthHours == null) {
    try {
      const ttb = await igdbQuery(
        'game_time_to_beats',
        `fields normally, hastily, completely; where game_id = ${id}; limit 1;`
      )
      const sec = Number(ttb[0]?.normally) || Number(ttb[0]?.hastily) || 0
      lengthHours = sec > 0 ? Math.max(1, Math.round(sec / 3600)) : null
    } catch {
      lengthHours = null
    }
  }

  const db = getSqlite()
  updateActivity({ phase: 'writing' })
  return db.transaction((): ImportSummary => {
    const title: string = g.name ?? 'Untitled'

    // ---- media (preserve personal tracking on re-import) ----
    const existing = db
      .prepare('SELECT id FROM media_item WHERE external_source = ? AND external_id = ?')
      .get(SOURCE, String(g.id)) as { id: number } | undefined

    let mediaId: number
    const created = !existing
    if (existing) {
      mediaId = existing.id
      db.prepare(
        `UPDATE media_item SET title=?, synopsis=?, cover_path=COALESCE(?, cover_path),
         total_units=?, release_date=?, updated_at=datetime('now') WHERE id=?`
      ).run(title, g.summary || null, coverPath, lengthHours, released, mediaId)
    } else {
      const info = db
        .prepare(
          `INSERT INTO media_item
           (media_type, title, synopsis, cover_path, total_units, release_date,
            external_source, external_id)
           VALUES ('game', ?, ?, ?, ?, ?, ?, ?)`
        )
        .run(title, g.summary || null, coverPath, lengthHours, released, SOURCE, String(g.id))
      mediaId = Number(info.lastInsertRowid)
    }

    // ---- community rating + HLTB times -> metadata, merged so other keys
    // survive re-import (a failed HLTB lookup keeps what was stored) ----
    const rating = typeof g.total_rating === 'number' ? Math.round(g.total_rating) : 0
    if (rating > 0 || hltbTimes) {
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
      if (rating > 0) metaObj.igdbRating = rating // 0-100, in COMMUNITY_SQL
      if (hltbTimes) metaObj.hltb = hltbTimes
      db.prepare('UPDATE media_item SET metadata=? WHERE id=?').run(JSON.stringify(metaObj), mediaId)
    }

    // ---- involved companies -> developer/publisher roles (one company can
    // legitimately be both) ----
    let studios = 0
    for (const node of g.involved_companies ?? []) {
      if (!node?.company?.name) continue
      const companyId = upsertCompany(db, node.company)
      for (const role of [node.developer && 'developer', node.publisher && 'publisher']) {
        if (!role) continue
        db.prepare(
          'INSERT OR IGNORE INTO media_company (media_id, company_id, role) VALUES (?, ?, ?)'
        ).run(mediaId, companyId, role)
        studios++
      }
    }

    // ---- genres -> tags ----
    for (const genre of g.genres ?? []) {
      if (!genre?.name) continue
      const existingTag = db.prepare('SELECT id FROM tag WHERE name=?').get(genre.name) as
        | { id: number }
        | undefined
      const tagId = existingTag
        ? existingTag.id
        : Number(
            db
              .prepare('INSERT INTO tag (name, category) VALUES (?, ?)')
              .run(genre.name, 'genre').lastInsertRowid
          )
      db.prepare('INSERT OR IGNORE INTO media_tag (media_id, tag_id) VALUES (?, ?)').run(
        mediaId,
        tagId
      )
    }

    // IGDB character data exists but has no VA links — cast stays hand-curated.
    return { mediaId, title, studios, cast: 0, staff: 0, created }
  })()
}

// Company node -> company row, deduped by (igdb, id). Synchronous so it can
// run inside the import transaction (no logo fetch).
function upsertCompany(db: any, node: any): number {
  const ext = String(node.id)
  const row = db
    .prepare('SELECT id FROM company WHERE external_source=? AND external_id=?')
    .get(SOURCE, ext) as { id: number } | undefined
  if (row) return row.id
  const info = db
    .prepare('INSERT INTO company (name, type, external_source, external_id) VALUES (?, ?, ?, ?)')
    .run(node.name ?? 'Unknown', 'developer', SOURCE, ext)
  return Number(info.lastInsertRowid)
}
