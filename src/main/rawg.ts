import { getSqlite } from './db/connection'
import { downloadImages } from './files'
import { updateActivity } from './progress'
import { fetchWithRetry } from './http'
import { fetchPlaytimes } from './hltb'
import * as settingsRepo from './repos/settingsRepo'
import type { ImportSearchResult, ImportSummary } from '@shared/types'

// RAWG (rawg.io) — the biggest open video-game database with a free API.
// Requires a personal key (free at rawg.io/apidocs), stored in settings under
// `rawg.api_key`, passed as a query param. RAWG has rich metadata (cover,
// developers/publishers, genres, average playtime, Metacritic) but NO cast
// data — game characters and their voice actors are added by hand on the
// detail page, where the picker resolves seiyuu to the same person rows the
// anime/VN importers created (one VA page across all three).
const BASE = 'https://api.rawg.io/api'
const SOURCE = 'rawg'

function apiKey(): string {
  const key = settingsRepo.get('rawg.api_key')?.trim()
  if (!key) {
    throw new Error('Add your RAWG API key in Settings before importing.')
  }
  return key
}

/* eslint-disable @typescript-eslint/no-explicit-any */
async function rawgGet(path: string, params: Record<string, string> = {}): Promise<any> {
  const url = new URL(`${BASE}${path}`)
  url.searchParams.set('key', apiKey())
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  const res = await fetchWithRetry(url.toString(), { headers: { Accept: 'application/json' } })
  if (res.status === 401) throw new Error('Invalid RAWG API key — check it in Settings.')
  if (!res.ok) throw new Error(`RAWG request failed (${res.status})`)
  return res.json()
}

function yearOf(date: string | null | undefined): number | null {
  if (!date) return null
  const y = Number(date.slice(0, 4))
  return Number.isFinite(y) ? y : null
}

// ---------------- Search ----------------
export async function search(query: string): Promise<ImportSearchResult[]> {
  if (!query.trim()) return []
  const data = await rawgGet('/games', { search: query, page_size: '12' })
  return (data?.results ?? []).map((g: any) => ({
    id: g.id,
    title: g.name ?? 'Untitled',
    native: null,
    year: yearOf(g.released),
    format: 'Game',
    episodes: null,
    coverUrl: g.background_image ?? null
  }))
}

// ---------------- Import ----------------
// Same two-phase shape as the other importers: all network work first (game
// detail + cover), then every DB write inside one transaction. Re-import
// refreshes canonical fields and keeps personal tracking. There is no cast
// prune here — RAWG never writes characters, so hand-added cast is untouched.
export async function importGame(rawgId: number): Promise<ImportSummary> {
  const g = await rawgGet(`/games/${rawgId}`)
  if (!g?.id) throw new Error('Game not found on RAWG')

  const coverUrl: string | null = g.background_image ?? null
  const images = await downloadImages([coverUrl])
  const coverPath = coverUrl ? (images.get(coverUrl) ?? null) : null

  // HowLongToBeat main/extra/completionist times — best-effort; a failed or
  // missing lookup never blocks the import (the panel offers a manual fetch).
  const hltbTimes = await fetchPlaytimes(g.name ?? '', yearOf(g.released))

  const db = getSqlite()
  updateActivity({ phase: 'writing' })
  return db.transaction((): ImportSummary => {
    const title: string = g.name ?? 'Untitled'
    const native =
      g.name_original && g.name_original !== title ? String(g.name_original) : null

    // ---- media (preserve personal tracking on re-import) ----
    const existing = db
      .prepare('SELECT id FROM media_item WHERE external_source = ? AND external_id = ?')
      .get(SOURCE, String(g.id)) as { id: number } | undefined

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
        g.description_raw || null,
        coverPath,
        g.playtime > 0 ? g.playtime : null,
        g.released || null,
        mediaId
      )
    } else {
      const info = db
        .prepare(
          `INSERT INTO media_item
           (media_type, title, title_original, synopsis, cover_path, total_units, release_date,
            external_source, external_id)
           VALUES ('game', ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .run(
          title,
          native,
          g.description_raw || null,
          coverPath,
          g.playtime > 0 ? g.playtime : null,
          g.released || null,
          SOURCE,
          String(g.id)
        )
      mediaId = Number(info.lastInsertRowid)
    }

    // ---- Metacritic + HLTB times -> metadata, merged so other keys survive
    // re-import (a failed HLTB lookup keeps whatever was stored before) ----
    if ((typeof g.metacritic === 'number' && g.metacritic > 0) || hltbTimes) {
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
      if (typeof g.metacritic === 'number' && g.metacritic > 0) metaObj.metacritic = g.metacritic
      if (hltbTimes) metaObj.hltb = hltbTimes
      db.prepare('UPDATE media_item SET metadata=? WHERE id=?').run(
        JSON.stringify(metaObj),
        mediaId
      )
    }

    // ---- developers + publishers -> companies ----
    let studios = 0
    const companyRoles: [any[], string][] = [
      [g.developers ?? [], 'developer'],
      [g.publishers ?? [], 'publisher']
    ]
    for (const [nodes, role] of companyRoles) {
      for (const node of nodes) {
        const companyId = upsertCompany(db, node)
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

    // RAWG has no cast/staff data — those stay hand-curated.
    return { mediaId, title, studios, cast: 0, staff: 0, created }
  })()
}

// Developer/publisher -> company, deduped by (rawg, id). Synchronous so it can
// run inside the import transaction (RAWG company nodes carry no logo to fetch).
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
