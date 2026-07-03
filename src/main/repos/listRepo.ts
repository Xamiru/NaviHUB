import { getSqlite } from '../db/connection'
import type {
  List,
  ListDetail,
  ListEntry,
  ListInput,
  ListKind,
  ListSummary,
  MediaType
} from '@shared/types'

// Per-kind resolution: which table an item's entity_id points at, and the
// columns to read for its name / thumbnail / subtitle. Table + column names come
// from this fixed map (never user input), so interpolating them is safe.
const KIND: Record<
  ListKind,
  { table: string; nameCol: string; imageCol: string; subCol: string }
> = {
  media: { table: 'media_item', nameCol: 'title', imageCol: 'cover_path', subCol: 'media_type' },
  person: { table: 'person', nameCol: 'name', imageCol: 'photo_path', subCol: 'name_native' },
  character: { table: 'character', nameCol: 'name', imageCol: 'image_path', subCol: 'name_native' },
  company: { table: 'company', nameCol: 'name', imageCol: 'logo_path', subCol: 'type' }
}

const MEDIA_LABEL: Record<string, string> = {
  anime: 'Anime',
  manga: 'Manga',
  visual_novel: 'Visual Novel',
  game: 'Game',
  movie: 'Movie',
  tv: 'TV'
}

function mapList(r: Record<string, unknown>): List {
  return {
    id: r.id as number,
    title: r.title as string,
    description: (r.description as string) ?? null,
    kind: r.entity_kind as ListKind,
    ranked: !!r.ranked,
    createdAt: r.created_at as string,
    updatedAt: r.updated_at as string
  }
}

function bump(listId: number): void {
  getSqlite().prepare(`UPDATE list SET updated_at = datetime('now') WHERE id = ?`).run(listId)
}

export function list(kind?: ListKind | null): ListSummary[] {
  const db = getSqlite()
  const rows = (
    kind
      ? db.prepare('SELECT * FROM list WHERE entity_kind = ? ORDER BY updated_at DESC, id DESC').all(kind)
      : db.prepare('SELECT * FROM list ORDER BY updated_at DESC, id DESC').all()
  ) as Record<string, unknown>[]

  const lists = rows.map(mapList)
  if (lists.length === 0) return []

  const ids = lists.map((l) => l.id)
  const idHoles = ids.map(() => '?').join(', ')

  // One grouped COUNT for every list, rather than a COUNT query per list.
  const countMap = new Map<number, number>()
  for (const c of db
    .prepare(
      `SELECT list_id, COUNT(*) AS n FROM list_item WHERE list_id IN (${idHoles}) GROUP BY list_id`
    )
    .all(...ids) as { list_id: number; n: number }[]) {
    countMap.set(c.list_id, c.n)
  }

  // A few preview thumbnails per list, in list order. Because the joined entity
  // table differs by kind, batch to one windowed query per distinct kind (≤4)
  // instead of a preview query per list. Table/column names come from the fixed
  // KIND map (never user input), so interpolating them is safe.
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
           SELECT li.list_id AS list_id, e.${meta.imageCol} AS image,
                  ROW_NUMBER() OVER (PARTITION BY li.list_id ORDER BY li.sort_order ASC, li.id ASC) AS rn
           FROM list_item li JOIN ${meta.table} e ON e.id = li.entity_id
           WHERE li.list_id IN (${holes})
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

export function get(id: number): ListDetail | null {
  const db = getSqlite()
  const row = db.prepare('SELECT * FROM list WHERE id = ?').get(id) as
    | Record<string, unknown>
    | undefined
  if (!row) return null
  const base = mapList(row)
  const k = KIND[base.kind]
  const rows = (
    db
      .prepare(
        `SELECT li.id AS item_id, li.sort_order, li.note, li.entity_id,
                e.${k.nameCol} AS name, e.${k.imageCol} AS image, e.${k.subCol} AS sub
         FROM list_item li JOIN ${k.table} e ON e.id = li.entity_id
         WHERE li.list_id = ?
         ORDER BY li.sort_order ASC, li.id ASC`
      )
      .all(id) as Record<string, unknown>[]
  ).map((r): ListEntry => {
    const isMedia = base.kind === 'media'
    const sub = (r.sub as string) ?? null
    return {
      itemId: r.item_id as number,
      sortOrder: r.sort_order as number,
      note: (r.note as string) ?? null,
      entityId: r.entity_id as number,
      name: (r.name as string) ?? 'Untitled',
      subtitle: isMedia ? (sub ? MEDIA_LABEL[sub] ?? sub : null) : sub,
      imagePath: (r.image as string) ?? null,
      mediaType: isMedia ? ((sub as MediaType) ?? null) : null
    }
  })
  return { ...base, items: rows }
}

export function create(input: ListInput): number {
  const info = getSqlite()
    .prepare('INSERT INTO list (title, description, entity_kind, ranked) VALUES (?, ?, ?, ?)')
    .run(input.title, input.description ?? null, input.kind, input.ranked ? 1 : 0)
  return Number(info.lastInsertRowid)
}

export function update(
  id: number,
  input: { title?: string; description?: string | null; ranked?: boolean }
): void {
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
  if (input.ranked !== undefined) {
    sets.push('ranked = ?')
    values.push(input.ranked ? 1 : 0)
  }
  if (!sets.length) return
  sets.push(`updated_at = datetime('now')`)
  getSqlite()
    .prepare(`UPDATE list SET ${sets.join(', ')} WHERE id = ?`)
    .run(...values, id)
}

export function remove(id: number): void {
  getSqlite().prepare('DELETE FROM list WHERE id = ?').run(id)
}

export function addItem(listId: number, entityId: number, note?: string | null): number {
  const db = getSqlite()
  const next = (
    db
      .prepare('SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM list_item WHERE list_id = ?')
      .get(listId) as { next: number }
  ).next
  db.prepare(
    'INSERT OR IGNORE INTO list_item (list_id, entity_id, sort_order, note) VALUES (?, ?, ?, ?)'
  ).run(listId, entityId, next, note ?? null)
  bump(listId)
  return (
    db.prepare('SELECT id FROM list_item WHERE list_id = ? AND entity_id = ?').get(listId, entityId) as {
      id: number
    }
  ).id
}

export function removeItem(itemId: number): void {
  const db = getSqlite()
  const row = db.prepare('SELECT list_id FROM list_item WHERE id = ?').get(itemId) as
    | { list_id: number }
    | undefined
  if (!row) return
  db.prepare('DELETE FROM list_item WHERE id = ?').run(itemId)
  bump(row.list_id)
}

// Remove by (list, entity) rather than list_item id — used by the Add-to-list
// menu on detail pages, which only knows the entity it's toggling.
export function removeItemByEntity(listId: number, entityId: number): void {
  const db = getSqlite()
  db.prepare('DELETE FROM list_item WHERE list_id = ? AND entity_id = ?').run(listId, entityId)
  bump(listId)
}

export function updateItem(itemId: number, patch: { note?: string | null }): void {
  if (patch.note === undefined) return
  const db = getSqlite()
  const row = db.prepare('SELECT list_id FROM list_item WHERE id = ?').get(itemId) as
    | { list_id: number }
    | undefined
  if (!row) return
  db.prepare('UPDATE list_item SET note = ? WHERE id = ?').run(patch.note ?? null, itemId)
  bump(row.list_id)
}

export function reorder(listId: number, orderedItemIds: number[]): void {
  const db = getSqlite()
  const stmt = db.prepare('UPDATE list_item SET sort_order = ? WHERE id = ? AND list_id = ?')
  const tx = db.transaction((ids: number[]) => {
    ids.forEach((itemId, i) => stmt.run(i, itemId, listId))
    bump(listId)
  })
  tx(orderedItemIds)
}

export function forEntity(
  kind: ListKind,
  entityId: number
): { id: number; title: string; contains: boolean }[] {
  return (
    getSqlite()
      .prepare(
        `SELECT l.id, l.title,
                EXISTS(SELECT 1 FROM list_item li WHERE li.list_id = l.id AND li.entity_id = ?) AS contains
         FROM list l WHERE l.entity_kind = ?
         ORDER BY l.updated_at DESC, l.id DESC`
      )
      .all(entityId, kind) as { id: number; title: string; contains: number }[]
  ).map((r) => ({ id: r.id, title: r.title, contains: !!r.contains }))
}

// Called from an entity's remove() so deleting a media/person/character/company
// also drops it from any list of that kind (list_item has no FK to enforce this).
export function removeEntityFromLists(kind: ListKind, entityId: number): void {
  getSqlite()
    .prepare(
      'DELETE FROM list_item WHERE entity_id = ? AND list_id IN (SELECT id FROM list WHERE entity_kind = ?)'
    )
    .run(entityId, kind)
}
