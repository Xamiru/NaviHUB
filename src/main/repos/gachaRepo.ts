// Gacha tracker queries (roster / builds / currencies / banners / news).
// Tables are game-agnostic; the game list and per-game vocabulary live in
// src/shared/gacha.ts. All raw prepared SQL, like every repo.

import { getSqlite } from '../db/connection'
import { GACHA_GAMES } from '@shared/gacha'
import type {
  GachaBanner,
  GachaBannerInput,
  GachaBuild,
  GachaBuildInput,
  GachaCurrency,
  GachaGameId,
  GachaGameOverview,
  GachaNewsFetchResult,
  GachaNewsItem,
  GachaNewsPage,
  GachaNewsUpsert,
  GachaOwnershipPatch,
  GachaUnit,
  GachaUnitDetail,
  GachaUnitFilter,
  GachaUnitInput
} from '@shared/types'

function parseJson(value: unknown): Record<string, unknown> | null {
  try {
    return value ? JSON.parse(value as string) : null
  } catch {
    return null
  }
}

function mapUnit(r: Record<string, unknown>): GachaUnit {
  return {
    id: r.id as number,
    game: r.game as GachaGameId,
    kind: r.kind as string,
    name: r.name as string,
    rarity: (r.rarity as number) ?? null,
    element: (r.element as string) ?? null,
    role: (r.role as string) ?? null,
    imagePath: (r.image_path as string) ?? null,
    owned: !!r.owned,
    favorite: !!r.favorite,
    level: (r.level as number) ?? null,
    dupes: r.dupes as number,
    obtainedAt: (r.obtained_at as string) ?? null,
    notes: (r.notes as string) ?? null,
    data: parseJson(r.data),
    externalSource: (r.external_source as string) ?? null,
    externalId: (r.external_id as string) ?? null,
    createdAt: r.created_at as string,
    updatedAt: r.updated_at as string
  }
}

function mapBuild(r: Record<string, unknown>): GachaBuild {
  return {
    id: r.id as number,
    unitId: r.unit_id as number,
    name: r.name as string,
    sortOrder: r.sort_order as number,
    data: parseJson(r.data),
    notes: (r.notes as string) ?? null,
    createdAt: r.created_at as string,
    updatedAt: r.updated_at as string
  }
}

function mapCurrency(r: Record<string, unknown>): GachaCurrency {
  return {
    game: r.game as GachaGameId,
    key: r.key as string,
    amount: r.amount as number,
    updatedAt: r.updated_at as string
  }
}

function mapBanner(r: Record<string, unknown>): GachaBanner {
  return {
    id: r.id as number,
    game: r.game as GachaGameId,
    name: r.name as string,
    kind: (r.kind as string) ?? null,
    featured: (r.featured as string) ?? null,
    startAt: (r.start_at as string) ?? null,
    endAt: (r.end_at as string) ?? null,
    imagePath: (r.image_path as string) ?? null,
    notes: (r.notes as string) ?? null,
    externalSource: (r.external_source as string) ?? null,
    externalId: (r.external_id as string) ?? null,
    createdAt: r.created_at as string,
    updatedAt: r.updated_at as string
  }
}

function mapNews(r: Record<string, unknown>): GachaNewsItem {
  return {
    id: r.id as number,
    game: r.game as GachaGameId,
    title: r.title as string,
    url: (r.url as string) ?? null,
    summary: (r.summary as string) ?? null,
    imageUrl: (r.image_url as string) ?? null,
    publishedAt: (r.published_at as string) ?? null,
    author: (r.author as string) ?? null,
    externalId: r.external_id as string,
    fetchedAt: r.fetched_at as string
  }
}

// ---- units ----

export function listUnits(game: GachaGameId, filter: GachaUnitFilter = {}): GachaUnit[] {
  const where: string[] = ['game = ?']
  const values: unknown[] = [game]
  if (filter.kind) {
    where.push('kind = ?')
    values.push(filter.kind)
  }
  if (filter.search?.trim()) {
    where.push('name LIKE ?')
    values.push(`%${filter.search.trim()}%`)
  }
  if (filter.ownedOnly) where.push('owned = 1')
  const rows = getSqlite()
    .prepare(
      `SELECT * FROM gacha_unit WHERE ${where.join(' AND ')}
       ORDER BY favorite DESC, rarity DESC, name COLLATE NOCASE ASC`
    )
    .all(...values) as Record<string, unknown>[]
  return rows.map(mapUnit)
}

export function getUnit(id: number): GachaUnitDetail | null {
  const db = getSqlite()
  const row = db.prepare('SELECT * FROM gacha_unit WHERE id = ?').get(id) as
    | Record<string, unknown>
    | undefined
  if (!row) return null
  const builds = (
    db
      .prepare('SELECT * FROM gacha_build WHERE unit_id = ? ORDER BY sort_order ASC, id ASC')
      .all(id) as Record<string, unknown>[]
  ).map(mapBuild)
  return { ...mapUnit(row), builds }
}

export function createUnit(input: GachaUnitInput): number {
  const info = getSqlite()
    .prepare(
      `INSERT INTO gacha_unit
         (game, kind, name, rarity, element, role, image_path, owned, favorite,
          level, dupes, obtained_at, notes, data)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      input.game,
      input.kind,
      input.name,
      input.rarity ?? null,
      input.element ?? null,
      input.role ?? null,
      input.imagePath ?? null,
      input.owned === undefined ? 1 : input.owned ? 1 : 0,
      input.favorite ? 1 : 0,
      input.level ?? null,
      input.dupes ?? 0,
      input.obtainedAt ?? null,
      input.notes ?? null,
      input.data ? JSON.stringify(input.data) : null
    )
  return Number(info.lastInsertRowid)
}

export function updateUnit(id: number, patch: Partial<GachaUnitInput>): void {
  const sets: string[] = []
  const values: unknown[] = []
  const set = (col: string, value: unknown): void => {
    sets.push(`${col} = ?`)
    values.push(value)
  }
  // game is deliberately not updatable — a roster entry never changes games.
  if (patch.kind !== undefined) set('kind', patch.kind)
  if (patch.name !== undefined) set('name', patch.name)
  if (patch.rarity !== undefined) set('rarity', patch.rarity ?? null)
  if (patch.element !== undefined) set('element', patch.element ?? null)
  if (patch.role !== undefined) set('role', patch.role ?? null)
  if (patch.imagePath !== undefined) set('image_path', patch.imagePath ?? null)
  if (patch.owned !== undefined) set('owned', patch.owned ? 1 : 0)
  if (patch.favorite !== undefined) set('favorite', patch.favorite ? 1 : 0)
  if (patch.level !== undefined) set('level', patch.level ?? null)
  if (patch.dupes !== undefined) set('dupes', patch.dupes ?? 0)
  if (patch.obtainedAt !== undefined) set('obtained_at', patch.obtainedAt ?? null)
  if (patch.notes !== undefined) set('notes', patch.notes ?? null)
  if (patch.data !== undefined) set('data', patch.data ? JSON.stringify(patch.data) : null)
  if (!sets.length) return
  sets.push(`updated_at = datetime('now')`)
  getSqlite()
    .prepare(`UPDATE gacha_unit SET ${sets.join(', ')} WHERE id = ?`)
    .run(...values, id)
}

export function removeUnit(id: number): void {
  // Builds die via ON DELETE CASCADE.
  getSqlite().prepare('DELETE FROM gacha_unit WHERE id = ?').run(id)
}

// ---- catalog import (Atlas Academy etc.) ----

// One catalog entry to upsert. Canonical fields only — personal tracking
// (owned/favorite/level/dupes/notes/data) is never touched by a catalog fetch.
export interface GachaCatalogUnitUpsert {
  kind: string
  externalId: string
  name: string
  rarity: number | null
  element: string | null
  imagePath: string | null // pre-downloaded by the importer; null on failure
}

// Seed/refresh catalog rows as owned=0, converging on the unique index
// (game, kind, external_source, external_id). DO UPDATE deliberately omits
// every personal column, so a re-fetch refreshes name/rarity/element/image
// without disturbing the roster. A manual row (NULL externals) with a matching
// name is ADOPTED (gains externals) rather than duplicated. Owns its
// transaction so the importer module stays network-only (replaceNews precedent).
export function upsertCatalogUnits(
  game: GachaGameId,
  source: string,
  units: GachaCatalogUnitUpsert[]
): { created: number; updated: number } {
  const db = getSqlite()
  const tx = db.transaction((): { created: number; updated: number } => {
    const known = new Set(
      (
        db
          .prepare(
            'SELECT kind, external_id FROM gacha_unit WHERE game = ? AND external_source = ?'
          )
          .all(game, source) as { kind: string; external_id: string }[]
      ).map((r) => `${r.kind}\n${r.external_id}`)
    )
    const findManual = db.prepare(
      `SELECT id FROM gacha_unit
       WHERE game = ? AND kind = ? AND external_source IS NULL AND name = ? COLLATE NOCASE
       LIMIT 1`
    )
    const adopt = db.prepare(
      `UPDATE gacha_unit SET external_source = ?, external_id = ?, name = ?, rarity = ?,
         element = ?, image_path = COALESCE(?, image_path), updated_at = datetime('now')
       WHERE id = ?`
    )
    const upsert = db.prepare(
      `INSERT INTO gacha_unit
         (game, kind, name, rarity, element, image_path, owned, external_source, external_id)
       VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?)
       ON CONFLICT(game, kind, external_source, external_id) DO UPDATE SET
         name = excluded.name,
         rarity = excluded.rarity,
         element = excluded.element,
         image_path = COALESCE(excluded.image_path, image_path),
         updated_at = datetime('now')`
    )
    let created = 0
    let updated = 0
    for (const u of units) {
      const key = `${u.kind}\n${u.externalId}`
      if (known.has(key)) {
        upsert.run(game, u.kind, u.name, u.rarity, u.element, u.imagePath, source, u.externalId)
        updated += 1
        continue
      }
      const manual = findManual.get(game, u.kind, u.name) as { id: number } | undefined
      if (manual) {
        adopt.run(source, u.externalId, u.name, u.rarity, u.element, u.imagePath, manual.id)
        updated += 1
      } else {
        upsert.run(game, u.kind, u.name, u.rarity, u.element, u.imagePath, source, u.externalId)
        created += 1
      }
      known.add(key)
    }
    return { created, updated }
  })
  return tx()
}

// Apply ownership from an app backup onto existing catalog rows, matched by
// (game, kind, source, externalId). Requires the catalog to have been imported
// first. Non-destructive: rows absent from the backup are never touched, so a
// unit owned in-app but missing from the backup stays owned.
export function applyOwnership(
  game: GachaGameId,
  source: string,
  patches: GachaOwnershipPatch[]
): { matched: number; unmatched: number } {
  const db = getSqlite()
  const tx = db.transaction((): { matched: number; unmatched: number } => {
    const count = (
      db
        .prepare('SELECT COUNT(*) AS n FROM gacha_unit WHERE game = ? AND external_source = ?')
        .get(game, source) as { n: number }
    ).n
    if (count === 0) {
      throw new Error('No catalog yet — run the catalog fetch first, then retry the backup.')
    }
    const find = db.prepare(
      'SELECT id, data FROM gacha_unit WHERE game = ? AND kind = ? AND external_source = ? AND external_id = ?'
    )
    const apply = db.prepare(
      `UPDATE gacha_unit SET owned = 1, dupes = ?, level = COALESCE(?, level),
         data = ?, updated_at = datetime('now') WHERE id = ?`
    )
    let matched = 0
    let unmatched = 0
    for (const p of patches) {
      const row = find.get(game, p.kind, source, p.externalId) as
        | { id: number; data: string | null }
        | undefined
      if (!row) {
        unmatched += 1
        continue
      }
      const merged = { ...(parseJson(row.data) ?? {}), ...(p.dataMerge ?? {}) }
      apply.run(p.dupes, p.level ?? null, JSON.stringify(merged), row.id)
      matched += 1
    }
    return { matched, unmatched }
  })
  return tx()
}

// ---- builds ----

export function createBuild(unitId: number, input: GachaBuildInput): number {
  const db = getSqlite()
  const tx = db.transaction((): number => {
    const next = (
      db
        .prepare(
          'SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM gacha_build WHERE unit_id = ?'
        )
        .get(unitId) as { next: number }
    ).next
    const info = db
      .prepare('INSERT INTO gacha_build (unit_id, name, sort_order, data, notes) VALUES (?, ?, ?, ?, ?)')
      .run(
        unitId,
        input.name,
        next,
        input.data ? JSON.stringify(input.data) : null,
        input.notes ?? null
      )
    return Number(info.lastInsertRowid)
  })
  return tx()
}

export function updateBuild(id: number, patch: Partial<GachaBuildInput>): void {
  const sets: string[] = []
  const values: unknown[] = []
  if (patch.name !== undefined) {
    sets.push('name = ?')
    values.push(patch.name)
  }
  if (patch.data !== undefined) {
    sets.push('data = ?')
    values.push(patch.data ? JSON.stringify(patch.data) : null)
  }
  if (patch.notes !== undefined) {
    sets.push('notes = ?')
    values.push(patch.notes ?? null)
  }
  if (!sets.length) return
  sets.push(`updated_at = datetime('now')`)
  getSqlite()
    .prepare(`UPDATE gacha_build SET ${sets.join(', ')} WHERE id = ?`)
    .run(...values, id)
}

export function removeBuild(id: number): void {
  getSqlite().prepare('DELETE FROM gacha_build WHERE id = ?').run(id)
}

// ---- currencies ----

export function listCurrencies(game: GachaGameId): GachaCurrency[] {
  const rows = getSqlite()
    .prepare('SELECT * FROM gacha_currency WHERE game = ? ORDER BY key')
    .all(game) as Record<string, unknown>[]
  return rows.map(mapCurrency)
}

export function setCurrency(game: GachaGameId, key: string, amount: number): void {
  getSqlite()
    .prepare(
      `INSERT INTO gacha_currency (game, key, amount) VALUES (?, ?, ?)
       ON CONFLICT(game, key) DO UPDATE SET
         amount = excluded.amount,
         updated_at = datetime('now')`
    )
    .run(game, key, amount)
}

// ---- banners ----

export function listBanners(game: GachaGameId): GachaBanner[] {
  const rows = getSqlite()
    .prepare(
      `SELECT * FROM gacha_banner WHERE game = ?
       ORDER BY start_at IS NULL, start_at DESC, id DESC`
    )
    .all(game) as Record<string, unknown>[]
  return rows.map(mapBanner)
}

export function createBanner(input: GachaBannerInput): number {
  const info = getSqlite()
    .prepare(
      `INSERT INTO gacha_banner (game, name, kind, featured, start_at, end_at, image_path, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      input.game,
      input.name,
      input.kind ?? null,
      input.featured ?? null,
      input.startAt ?? null,
      input.endAt ?? null,
      input.imagePath ?? null,
      input.notes ?? null
    )
  return Number(info.lastInsertRowid)
}

export function updateBanner(id: number, patch: Partial<GachaBannerInput>): void {
  const sets: string[] = []
  const values: unknown[] = []
  const set = (col: string, value: unknown): void => {
    sets.push(`${col} = ?`)
    values.push(value)
  }
  if (patch.name !== undefined) set('name', patch.name)
  if (patch.kind !== undefined) set('kind', patch.kind ?? null)
  if (patch.featured !== undefined) set('featured', patch.featured ?? null)
  if (patch.startAt !== undefined) set('start_at', patch.startAt ?? null)
  if (patch.endAt !== undefined) set('end_at', patch.endAt ?? null)
  if (patch.imagePath !== undefined) set('image_path', patch.imagePath ?? null)
  if (patch.notes !== undefined) set('notes', patch.notes ?? null)
  if (!sets.length) return
  sets.push(`updated_at = datetime('now')`)
  getSqlite()
    .prepare(`UPDATE gacha_banner SET ${sets.join(', ')} WHERE id = ?`)
    .run(...values, id)
}

export function removeBanner(id: number): void {
  getSqlite().prepare('DELETE FROM gacha_banner WHERE id = ?').run(id)
}

// ---- news ----

export function listNews(game: GachaGameId, limit = 50): GachaNewsPage {
  const db = getSqlite()
  const items = (
    db
      .prepare(
        `SELECT * FROM gacha_news WHERE game = ?
         ORDER BY sort_order ASC, id ASC LIMIT ?`
      )
      .all(game, limit) as Record<string, unknown>[]
  ).map(mapNews)
  return { fetchedAt: getMeta(game, 'news.fetchedAt'), items }
}

// A fetch REPLACES the game's feed (subreddit hot lists churn — the tab always
// mirrors the latest fetch); `added` counts posts not present before, so the
// "N new" toast stays honest. sort_order = position in the fetched feed.
export function replaceNews(game: GachaGameId, items: GachaNewsUpsert[]): GachaNewsFetchResult {
  const db = getSqlite()
  const tx = db.transaction((): number => {
    const existing = new Set(
      (
        db.prepare('SELECT external_id FROM gacha_news WHERE game = ?').all(game) as {
          external_id: string
        }[]
      ).map((r) => r.external_id)
    )
    db.prepare('DELETE FROM gacha_news WHERE game = ?').run(game)
    const insert = db.prepare(
      `INSERT OR REPLACE INTO gacha_news
         (game, title, url, summary, image_url, published_at, author, sort_order, external_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    let added = 0
    items.forEach((it, i) => {
      if (!existing.has(it.externalId)) added += 1
      insert.run(
        game,
        it.title,
        it.url ?? null,
        it.summary ?? null,
        it.imageUrl ?? null,
        it.publishedAt ?? null,
        it.author ?? null,
        i,
        it.externalId
      )
    })
    return added
  })
  return { added: tx(), total: items.length }
}

// ---- overview (hub page) ----

function localToday(): string {
  const d = new Date()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mm}-${dd}`
}

export function overview(): GachaGameOverview[] {
  const db = getSqlite()
  const unitCount = db.prepare(
    'SELECT COUNT(*) AS n FROM gacha_unit WHERE game = ? AND owned = 1'
  )
  // Active = started and not ended (NULL start = unannounced/upcoming,
  // NULL end = open-ended). Lexical YYYY-MM-DD compare, local date — matches
  // the game page's banner partitioning.
  const activeBanners = db.prepare(
    `SELECT COUNT(*) AS n FROM gacha_banner
     WHERE game = ? AND start_at IS NOT NULL AND start_at <= ?
       AND (end_at IS NULL OR end_at >= ?)`
  )
  const today = localToday()
  return GACHA_GAMES.map((g) => ({
    game: g.id,
    unitCount: (unitCount.get(g.id) as { n: number }).n,
    currencies: listCurrencies(g.id),
    activeBanners: (activeBanners.get(g.id, today, today) as { n: number }).n,
    imagePath: getMeta(g.id, 'image')
  }))
}

// User-set hero art for a game (hub card + dashboard header). Stored as a
// media/ rel path in gacha_meta 'image'; null clears it.
export function setGameImage(game: GachaGameId, relPath: string | null): void {
  if (relPath) setMeta(game, 'image', relPath)
  else removeMeta(game, 'image')
}

// ---- meta (internal to main — not on NaviApi this phase) ----

export function getMeta(game: GachaGameId, key: string): string | null {
  const row = getSqlite()
    .prepare('SELECT value FROM gacha_meta WHERE game = ? AND key = ?')
    .get(game, key) as { value: string } | undefined
  return row?.value ?? null
}

export function setMeta(game: GachaGameId, key: string, value: string): void {
  getSqlite()
    .prepare(
      `INSERT INTO gacha_meta (game, key, value) VALUES (?, ?, ?)
       ON CONFLICT(game, key) DO UPDATE SET
         value = excluded.value,
         updated_at = datetime('now')`
    )
    .run(game, key, value)
}

export function removeMeta(game: GachaGameId, key: string): void {
  getSqlite().prepare('DELETE FROM gacha_meta WHERE game = ? AND key = ?').run(game, key)
}
