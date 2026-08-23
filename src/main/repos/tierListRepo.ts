import { getSqlite } from '../db/connection'
import { KIND, MEDIA_LABEL } from './listRepo'
import type {
  ListKind,
  MediaType,
  TierBoard,
  TierEntry,
  TierListInput,
  TierListSummary,
  TierPlacement,
  TierRowData,
  TierRowInput
} from '@shared/types'

// The classic tiermaker ramp a new board seeds with: red → orange → yellow →
// green → blue → purple. Fully editable per board afterwards (setRows).
const SEED_ROWS: { label: string; color: string }[] = [
  { label: 'S', color: '#FF7F7F' },
  { label: 'A', color: '#FFBF7F' },
  { label: 'B', color: '#FFDF7F' },
  { label: 'C', color: '#BFFF7F' },
  { label: 'D', color: '#7FBFFF' },
  { label: 'F', color: '#BF7FFF' }
]

function mapList(r: Record<string, unknown>): {
  id: number
  title: string
  description: string | null
  kind: ListKind
  createdAt: string
  updatedAt: string
} {
  return {
    id: r.id as number,
    title: r.title as string,
    description: (r.description as string) ?? null,
    kind: r.entity_kind as ListKind,
    createdAt: r.created_at as string,
    updatedAt: r.updated_at as string
  }
}

function bump(listId: number): void {
  getSqlite().prepare(`UPDATE tier_list SET updated_at = datetime('now') WHERE id = ?`).run(listId)
}

// Colors arrive from the renderer, but they are stored data — accept only the
// shape we render ('#rrggbb'), with a neutral fallback for anything else.
function safeColor(c: unknown): string {
  const s = typeof c === 'string' ? c.trim() : ''
  return /^#[0-9a-fA-F]{6}$/.test(s) ? s.toUpperCase() : '#7F7F7F'
}

function safeLabel(l: unknown): string {
  return (typeof l === 'string' ? l : '').trim().slice(0, 40)
}

// Normalizes one joined tile row to the shared entry shape (mirrors listRepo).
function mapEntry(
  baseKind: ListKind,
  r: Record<string, unknown>
): { rowId: number | null; sortOrder: number; entry: TierEntry } {
  const isMedia = baseKind === 'media'
  const sub = (r.sub as string) ?? null
  return {
    rowId: (r.row_id as number | null) ?? null,
    sortOrder: r.sort_order as number,
    entry: {
      itemId: r.item_id as number,
      entityId: r.entity_id as number,
      name: (r.name as string) ?? 'Untitled',
      subtitle: isMedia ? (sub ? MEDIA_LABEL[sub] ?? sub : null) : sub,
      imagePath: (r.image as string) ?? null,
      mediaType: isMedia ? ((sub as MediaType) ?? null) : null
    }
  }
}

export function list(kind?: ListKind | null): TierListSummary[] {
  const db = getSqlite()
  const rows = (
    kind
      ? db
          .prepare('SELECT * FROM tier_list WHERE entity_kind = ? ORDER BY updated_at DESC, id DESC')
          .all(kind)
      : db.prepare('SELECT * FROM tier_list ORDER BY updated_at DESC, id DESC').all()
  ) as Record<string, unknown>[]

  const lists = rows.map(mapList)
  if (lists.length === 0) return []

  const ids = lists.map((l) => l.id)
  const idHoles = ids.map(() => '?').join(', ')

  // One grouped COUNT for every board, rather than a COUNT query per board.
  const countMap = new Map<number, number>()
  for (const c of db
    .prepare(
      `SELECT list_id, COUNT(*) AS n FROM tier_item WHERE list_id IN (${idHoles}) GROUP BY list_id`
    )
    .all(...ids) as { list_id: number; n: number }[]) {
    countMap.set(c.list_id, c.n)
  }

  // A few preview thumbnails per board — ranked items first (row order), then
  // the pool. One windowed query per distinct kind, exactly like listRepo.
  const idsByKind = new Map<ListKind, number[]>()
  for (const l of lists) {
    if (!KIND[l.kind]) continue
    const arr = idsByKind.get(l.kind) ?? []
    arr.push(l.id)
    idsByKind.set(l.kind, arr)
  }
  const previewMap = new Map<number, (string | null)[]>()
  for (const [k, kindIds] of idsByKind) {
    const meta = KIND[k]
    const holes = kindIds.map(() => '?').join(', ')
    const previews = db
      .prepare(
        `SELECT list_id, image FROM (
           SELECT ti.list_id AS list_id, ${meta.imageCol} AS image,
                  ROW_NUMBER() OVER (
                    PARTITION BY ti.list_id
                    ORDER BY CASE WHEN ti.row_id IS NULL THEN 1 ELSE 0 END ASC,
                             tr.sort_order ASC,
                             ti.sort_order ASC, ti.id ASC
                  ) AS rn
           FROM tier_item ti
           LEFT JOIN tier_row tr ON tr.id = ti.row_id
           JOIN ${meta.table} e ON e.id = ti.entity_id
           WHERE ti.list_id IN (${holes})
         ) WHERE rn <= 5
         ORDER BY list_id ASC, rn ASC`
      )
      .all(...kindIds) as { list_id: number; image: string | null }[]
    for (const p of previews) {
      const arr = previewMap.get(p.list_id) ?? []
      arr.push(p.image ?? null)
      previewMap.set(p.list_id, arr)
    }
  }

  return lists.map((base) => ({
    ...base,
    itemCount: countMap.get(base.id) ?? 0,
    previewImages: previewMap.get(base.id) ?? []
  }))
}

export function get(id: number): TierBoard | null {
  const db = getSqlite()
  const row = db.prepare('SELECT * FROM tier_list WHERE id = ?').get(id) as
    | Record<string, unknown>
    | undefined
  if (!row) return null

  const base = mapList(row)
  const k = KIND[base.kind]

  const rowRows = db
    .prepare('SELECT * FROM tier_row WHERE list_id = ? ORDER BY sort_order ASC, id ASC')
    .all(id) as Record<string, unknown>[]

  // Items resolve through the kind's table like listRepo.get; missing entities
  // vanish silently (INNER JOIN). Order is flat here; grouping below splits it
  // by container, so this ORDER BY only needs to be stable within a container.
  const itemRows = (
    db
      .prepare(
        `SELECT ti.id AS item_id, ti.row_id, ti.sort_order, ti.entity_id,
                e.${k.nameCol} AS name, ${k.imageCol} AS image, e.${k.subCol} AS sub
         FROM tier_item ti JOIN ${k.table} e ON e.id = ti.entity_id
         WHERE ti.list_id = ?
         ORDER BY ti.sort_order ASC, ti.id ASC`
      )
      .all(id) as Record<string, unknown>[]
  ).map((r) => mapEntry(base.kind, r))

  const groups: { row: TierRowData; items: TierEntry[] }[] = rowRows.map((rr) => ({
    row: {
      id: rr.id as number,
      label: rr.label as string,
      color: rr.color as string
    },
    items: []
  }))
  const byRowId = new Map(groups.map((g, i) => [g.row.id, i]))
  const pool: TierEntry[] = []
  for (const it of itemRows) {
    if (it.rowId === null) pool.push(it.entry)
    else {
      const gi = byRowId.get(it.rowId)
      if (gi !== undefined) groups[gi].items.push(it.entry)
    }
  }

  return { ...base, rows: groups, pool }
}

export function create(input: TierListInput): number {
  const db = getSqlite()
  const tx = db.transaction((inp: TierListInput) => {
    const info = db
      .prepare('INSERT INTO tier_list (title, description, entity_kind) VALUES (?, ?, ?)')
      .run(inp.title, inp.description ?? null, inp.kind)
    const id = Number(info.lastInsertRowid)
    const ins = db.prepare('INSERT INTO tier_row (list_id, label, color, sort_order) VALUES (?, ?, ?, ?)')
    SEED_ROWS.forEach((r, i) => ins.run(id, r.label, r.color, i))
    return id
  })
  return tx(input)
}

export function update(id: number, input: { title?: string; description?: string | null }): void {
  const sets: string[] = []
  const values: unknown[] = []
  if (input.title !== undefined) {
    sets.push('title = ?')
    values.push(input.title)
  }
  if (input.description !== undefined) {
    sets.push('description = ?')
    values.push(input.description ?? null)
  }
  if (!sets.length) return
  sets.push(`updated_at = datetime('now')`)
  getSqlite()
    .prepare(`UPDATE tier_list SET ${sets.join(', ')} WHERE id = ?`)
    .run(...values, id)
}

export function remove(id: number): void {
  getSqlite().prepare('DELETE FROM tier_list WHERE id = ?').run(id)
}

// Replaces every row of the board in one transaction — the whole "edit tiers"
// dialog commits or nothing does. Deleting a row returns its items to the pool
// via tier_item.row_id's ON DELETE SET NULL; reordering rows never moves an
// item (its placement follows its row).
export function setRows(listId: number, rows: TierRowInput[]): void {
  const db = getSqlite()
  const tx = db.transaction((input: TierRowInput[]) => {
    db.prepare('DELETE FROM tier_row WHERE list_id = ?').run(listId)
    const ins = db.prepare(
      'INSERT INTO tier_row (list_id, label, color, sort_order) VALUES (?, ?, ?, ?)'
    )
    input.forEach((r, i) => ins.run(listId, safeLabel(r.label), safeColor(r.color), i))
    bump(listId)
  })
  tx(rows)
}

// Persists one drag's worth of movement: every container in display order,
// each with its item ids in order. One transaction; stale item ids (removed
// concurrently) no-op via the `AND list_id = ?` guard.
export function persistBoard(listId: number, placements: TierPlacement[]): void {
  const db = getSqlite()
  const upd = db.prepare(
    'UPDATE tier_item SET row_id = ?, sort_order = ? WHERE id = ? AND list_id = ?'
  )
  const tx = db.transaction((groups: TierPlacement[]) => {
    for (const g of groups) g.itemIds.forEach((itemId, i) => upd.run(g.rowId, i, itemId, listId))
    bump(listId)
  })
  tx(placements)
}

// A picked entity lands in the unranked pool at the end. Idempotent per
// (list, entity), mirroring listRepo.addItem.
export function addItem(listId: number, entityId: number): number {
  const db = getSqlite()
  const next = (
    db
      .prepare(
        'SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM tier_item WHERE list_id = ? AND row_id IS NULL'
      )
      .get(listId) as { next: number }
  ).next
  db.prepare('INSERT OR IGNORE INTO tier_item (list_id, entity_id, sort_order) VALUES (?, ?, ?)').run(
    listId,
    entityId,
    next
  )
  bump(listId)
  return (
    db
      .prepare('SELECT id FROM tier_item WHERE list_id = ? AND entity_id = ?')
      .get(listId, entityId) as { id: number }
  ).id
}

export function removeItem(itemId: number): void {
  const db = getSqlite()
  const row = db.prepare('SELECT list_id FROM tier_item WHERE id = ?').get(itemId) as
    | { list_id: number }
    | undefined
  if (!row) return
  db.prepare('DELETE FROM tier_item WHERE id = ?').run(itemId)
  bump(row.list_id)
}

// Called from an entity's remove() so deleting a media/person/character/company
// also drops it from any tier board of that kind (tier_item has no FK to it).
export function removeEntityFromTierLists(kind: ListKind, entityId: number): void {
  getSqlite()
    .prepare(
      'DELETE FROM tier_item WHERE entity_id = ? AND list_id IN (SELECT id FROM tier_list WHERE entity_kind = ?)'
    )
    .run(entityId, kind)
}
