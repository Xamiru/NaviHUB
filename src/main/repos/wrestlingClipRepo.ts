import { getSqlite } from '../db/connection'
import { removeEntityFromLists } from './listRepo'
import { removeEntityFromTierLists } from './tierListRepo'
import { WRESTLING_PROMOTIONS, promotionCfg } from '@shared/wrestling'
import type {
  WrestlingClip,
  WrestlingClipEntityKind,
  WrestlingClipFilter,
  WrestlingClipInput,
  WrestlingClipKind,
  WrestlingClipLink,
  WrestlingClipLinkRef,
  WrestlingClipTarget,
  WrestlingPromotionId
} from '@shared/types'

// The wrestling clip shelf: personal footage filed by hand, linked to wiki
// entities through FK-less rows (a re-import that drops an event must never
// delete a clip). File IO — picking, availability, frames — lives in
// wrestling/clips.ts; this module is SQL only.

export const CLIP_KINDS: readonly WrestlingClipKind[] = [
  'highlight',
  'promo',
  'interview',
  'documentary'
]
const MAX_LINKS = 50
const MAX_TAGS = 20

interface Row {
  id: number
  title: string
  kind: WrestlingClipKind
  local_path: string
  note: string
  frame_path: string | null
  favorite: number
  created_at: string
  updated_at: string
}

interface LinkRow {
  clip_id: number
  entity_kind: WrestlingClipEntityKind
  entity_id: number | null
  promotion_id: string | null
  label: string | null
  image: string | null
}

export function normalizeTag(tag: string): string {
  return tag.trim().toLowerCase().replace(/\s+/g, ' ').slice(0, 40)
}

function linkKey(ref: WrestlingClipLinkRef): string {
  return ref.entityKind === 'promotion'
    ? `promotion:${ref.promotionId}`
    : `${ref.entityKind}:${ref.entityId}`
}

function hydrate(rows: Row[], via = new Map<number, string | null>()): Omit<WrestlingClip, 'available'>[] {
  if (rows.length === 0) return []
  const db = getSqlite()
  const ids = rows.map((r) => r.id)
  const marks = ids.map(() => '?').join(',')
  // Page-sized id list (the list caps limit at 200), never library-sized.
  const links = db
    .prepare(
      `SELECT l.clip_id, l.entity_kind, l.entity_id, l.promotion_id,
              CASE l.entity_kind WHEN 'wrestler' THEN w.name WHEN 'event' THEN e.name
                                 WHEN 'match' THEN m.title END AS label,
              CASE l.entity_kind WHEN 'wrestler' THEN w.photo_path WHEN 'event' THEN e.poster_path
                                 WHEN 'match' THEN me.poster_path END AS image
         FROM wrestling_clip_link l
         LEFT JOIN wrestling_wrestler w ON l.entity_kind = 'wrestler' AND w.id = l.entity_id
         LEFT JOIN wrestling_event e ON l.entity_kind = 'event' AND e.id = l.entity_id
         LEFT JOIN wrestling_match m ON l.entity_kind = 'match' AND m.id = l.entity_id
         LEFT JOIN wrestling_event me ON me.id = m.event_id
        WHERE l.clip_id IN (${marks})
        ORDER BY l.rowid`
    )
    .all(...ids) as LinkRow[]
  const tags = db
    .prepare(`SELECT clip_id, tag FROM wrestling_clip_tag WHERE clip_id IN (${marks}) ORDER BY tag`)
    .all(...ids) as { clip_id: number; tag: string }[]
  const linksBy = new Map<number, WrestlingClipLink[]>()
  for (const l of links) {
    const link: WrestlingClipLink =
      l.entity_kind === 'promotion'
        ? {
            entityKind: 'promotion',
            promotionId: l.promotion_id as WrestlingPromotionId,
            label: promotionCfg(l.promotion_id ?? '')?.short ?? null,
            imagePath: null
          }
        : {
            entityKind: l.entity_kind,
            entityId: l.entity_id as number,
            label: l.label,
            imagePath: l.image
          }
    const list = linksBy.get(l.clip_id) ?? []
    list.push(link)
    linksBy.set(l.clip_id, list)
  }
  const tagsBy = new Map<number, string[]>()
  for (const t of tags) tagsBy.set(t.clip_id, [...(tagsBy.get(t.clip_id) ?? []), t.tag])
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    kind: r.kind,
    localPath: r.local_path,
    note: r.note,
    framePath: r.frame_path,
    favorite: r.favorite === 1,
    tags: tagsBy.get(r.id) ?? [],
    links: linksBy.get(r.id) ?? [],
    via: via.get(r.id) ?? null,
    createdAt: r.created_at,
    updatedAt: r.updated_at
  }))
}

export function list(filter: WrestlingClipFilter = {}): Omit<WrestlingClip, 'available'>[] {
  const where: string[] = []
  const args: unknown[] = []
  if (filter.kind) {
    where.push('c.kind = ?')
    args.push(filter.kind)
  }
  if (filter.favorite) where.push('c.favorite = 1')
  if (filter.tag) {
    where.push('EXISTS (SELECT 1 FROM wrestling_clip_tag t WHERE t.clip_id = c.id AND t.tag = ?)')
    args.push(normalizeTag(filter.tag))
  }
  const q = filter.search?.trim()
  if (q) {
    where.push(
      `(c.title LIKE ? OR c.note LIKE ?
        OR EXISTS (SELECT 1 FROM wrestling_clip_tag t WHERE t.clip_id = c.id AND t.tag LIKE ?))`
    )
    args.push(`%${q}%`, `%${q}%`, `%${q.toLowerCase()}%`)
  }
  const limit = Math.min(Math.max(filter.limit ?? 100, 1), 200)
  const offset = Math.max(filter.offset ?? 0, 0)
  const rows = getSqlite()
    .prepare(
      `SELECT c.* FROM wrestling_clip c
        ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
        ORDER BY c.created_at DESC, c.id DESC
        LIMIT ? OFFSET ?`
    )
    .all(...args, limit, offset) as Row[]
  return hydrate(rows)
}

export function get(id: number): Omit<WrestlingClip, 'available'> | null {
  const row = getSqlite().prepare('SELECT * FROM wrestling_clip WHERE id = ?').get(id) as
    | Row
    | undefined
  return row ? hydrate([row])[0] : null
}

// Clips for an entity page. A clip linked to a match also reaches that match's
// event, its participants and its promotion; a clip linked to an event reaches
// the promotion. A direct link wins over a derived one, and each clip appears once.
export function forEntity(
  kind: WrestlingClipEntityKind,
  id: number | string
): Omit<WrestlingClip, 'available'>[] {
  const db = getSqlite()
  let hits: { clip_id: number; via: string | null }[]
  if (kind === 'promotion') {
    hits = db
      .prepare(
        `SELECT clip_id, NULL AS via FROM wrestling_clip_link
          WHERE entity_kind = 'promotion' AND promotion_id = ?
         UNION ALL
         SELECT l.clip_id, e.name FROM wrestling_clip_link l
           JOIN wrestling_event e ON e.id = l.entity_id
          WHERE l.entity_kind = 'event' AND e.promotion = ?
         UNION ALL
         SELECT l.clip_id, m.title FROM wrestling_clip_link l
           JOIN wrestling_match m ON m.id = l.entity_id
           JOIN wrestling_event e ON e.id = m.event_id
          WHERE l.entity_kind = 'match' AND e.promotion = ?`
      )
      .all(id, id, id) as typeof hits
  } else {
    const direct = db
      .prepare(
        `SELECT clip_id, NULL AS via FROM wrestling_clip_link WHERE entity_kind = ? AND entity_id = ?`
      )
      .all(kind, id) as typeof hits
    const derived =
      kind === 'event'
        ? (db
            .prepare(
              `SELECT l.clip_id, m.title AS via FROM wrestling_match m
                 JOIN wrestling_clip_link l ON l.entity_kind = 'match' AND l.entity_id = m.id
                WHERE m.event_id = ?`
            )
            .all(id) as typeof hits)
        : kind === 'wrestler'
          ? (db
              .prepare(
                `SELECT l.clip_id, m.title AS via FROM wrestling_match_participant p
                   JOIN wrestling_clip_link l ON l.entity_kind = 'match' AND l.entity_id = p.match_id
                   JOIN wrestling_match m ON m.id = p.match_id
                  WHERE p.wrestler_id = ?`
              )
              .all(id) as typeof hits)
          : []
    hits = [...direct, ...derived]
  }
  const via = new Map<number, string | null>()
  for (const h of hits) {
    if (!via.has(h.clip_id) || h.via === null) via.set(h.clip_id, h.via)
  }
  if (via.size === 0) return []
  const ids = [...via.keys()]
  const rows = db
    .prepare(
      `SELECT * FROM wrestling_clip WHERE id IN (${ids.map(() => '?').join(',')})
        ORDER BY created_at DESC, id DESC`
    )
    .all(...ids) as Row[]
  return hydrate(rows, via)
}

function validLinks(refs: WrestlingClipLinkRef[]): WrestlingClipLinkRef[] {
  const db = getSqlite()
  const tables = { wrestler: 'wrestling_wrestler', event: 'wrestling_event', match: 'wrestling_match' }
  const seen = new Map<string, WrestlingClipLinkRef>()
  for (const ref of refs) {
    if (ref.entityKind === 'promotion') {
      if (!WRESTLING_PROMOTIONS.some((p) => p.id === ref.promotionId))
        throw new Error(`Unknown promotion: ${ref.promotionId}`)
    } else {
      const table = tables[ref.entityKind]
      if (!table || !Number.isInteger(ref.entityId)) throw new Error('Invalid clip link')
      if (!db.prepare(`SELECT 1 FROM ${table} WHERE id = ?`).get(ref.entityId))
        throw new Error(`That ${ref.entityKind} no longer exists`)
    }
    seen.set(linkKey(ref), ref)
  }
  if (seen.size > MAX_LINKS) throw new Error(`A clip can have at most ${MAX_LINKS} links`)
  return [...seen.values()]
}

function validTags(tags: string[] = []): string[] {
  const out = [...new Set(tags.map(normalizeTag).filter(Boolean))]
  if (out.length > MAX_TAGS) throw new Error(`A clip can have at most ${MAX_TAGS} tags`)
  return out
}

// localPath must already be validated by the caller (wrestling/clips.ts checks
// it is a file under wrestling.dir). Returns the saved id.
export function save(input: WrestlingClipInput): number {
  const title = input.title?.trim()
  if (!title) throw new Error('A clip needs a title')
  if (title.length > 300) throw new Error('Title is too long')
  if (!CLIP_KINDS.includes(input.kind)) throw new Error(`Unknown clip type: ${input.kind}`)
  const note = (input.note ?? '').trim().slice(0, 4000)
  const links = validLinks(input.links ?? [])
  const tags = validTags(input.tags)
  const db = getSqlite()
  return db.transaction(() => {
    let id = input.id
    if (id != null) {
      const res = db
        .prepare(
          `UPDATE wrestling_clip SET title = ?, kind = ?, local_path = ?, note = ?,
                  frame_path = CASE WHEN local_path = ? THEN frame_path ELSE NULL END,
                  updated_at = datetime('now')
            WHERE id = ?`
        )
        .run(title, input.kind, input.localPath, note, input.localPath, id)
      if (res.changes === 0) throw new Error('That clip no longer exists')
    } else {
      id = Number(
        db
          .prepare('INSERT INTO wrestling_clip (title, kind, local_path, note) VALUES (?, ?, ?, ?)')
          .run(title, input.kind, input.localPath, note).lastInsertRowid
      )
    }
    db.prepare('DELETE FROM wrestling_clip_link WHERE clip_id = ?').run(id)
    const insLink = db.prepare(
      'INSERT INTO wrestling_clip_link (clip_id, entity_kind, entity_id, promotion_id) VALUES (?, ?, ?, ?)'
    )
    for (const l of links)
      insLink.run(
        id,
        l.entityKind,
        l.entityKind === 'promotion' ? null : l.entityId,
        l.entityKind === 'promotion' ? l.promotionId : null
      )
    db.prepare('DELETE FROM wrestling_clip_tag WHERE clip_id = ?').run(id)
    const insTag = db.prepare('INSERT INTO wrestling_clip_tag (clip_id, tag) VALUES (?, ?)')
    for (const t of tags) insTag.run(id, t)
    return id
  })()
}

export function setFrame(id: number, framePath: string | null): void {
  getSqlite().prepare('UPDATE wrestling_clip SET frame_path = ? WHERE id = ?').run(framePath, id)
}

// Deletes the record only; returns the frame path so the caller can remove
// the generated still. The video file itself is never touched.
export function remove(id: number): { framePath: string | null } | null {
  const db = getSqlite()
  const row = db.prepare('SELECT frame_path FROM wrestling_clip WHERE id = ?').get(id) as
    | { frame_path: string | null }
    | undefined
  if (!row) return null
  db.transaction(() => {
    removeEntityFromLists('wrestlingClip', id)
    removeEntityFromTierLists('wrestlingClip', id)
    db.prepare('DELETE FROM wrestling_clip WHERE id = ?').run(id)
  })()
  return { framePath: row.frame_path }
}

export function setFavorite(id: number, favorite: boolean): void {
  getSqlite()
    .prepare('UPDATE wrestling_clip SET favorite = ? WHERE id = ?')
    .run(favorite ? 1 : 0, id)
}

export function allTags(): { tag: string; count: number }[] {
  return getSqlite()
    .prepare(
      `SELECT tag, COUNT(*) AS count FROM wrestling_clip_tag GROUP BY tag ORDER BY count DESC, tag`
    )
    .all() as { tag: string; count: number }[]
}

export function linkTargets(query: string): WrestlingClipTarget[] {
  const q = query.trim()
  if (!q) return []
  const like = `%${q}%`
  const db = getSqlite()
  const lower = q.toLowerCase()
  const promotions: WrestlingClipTarget[] = WRESTLING_PROMOTIONS.filter(
    (p) => p.short.toLowerCase().includes(lower) || p.name.toLowerCase().includes(lower)
  ).map((p) => ({
    entityKind: 'promotion',
    promotionId: p.id as WrestlingPromotionId,
    label: p.short,
    sub: p.name
  }))
  const wrestlers = db
    .prepare(
      `SELECT id, name FROM wrestling_wrestler WHERE name LIKE ?
        ORDER BY name COLLATE NOCASE LIMIT 8`
    )
    .all(like) as { id: number; name: string }[]
  const events = db
    .prepare(
      `SELECT id, name, event_date, promotion FROM wrestling_event WHERE name LIKE ?
        ORDER BY event_date DESC LIMIT 8`
    )
    .all(like) as { id: number; name: string; event_date: string | null; promotion: string }[]
  const matches = db
    .prepare(
      `SELECT m.id, m.title, COALESCE(e.name, m.show_label) AS show, COALESCE(e.event_date, m.match_date) AS date
         FROM wrestling_match m LEFT JOIN wrestling_event e ON e.id = m.event_id
        WHERE m.title LIKE ?
        ORDER BY date DESC LIMIT 8`
    )
    .all(like) as { id: number; title: string; show: string | null; date: string | null }[]
  return [
    ...promotions,
    ...wrestlers.map((w): WrestlingClipTarget => ({
      entityKind: 'wrestler',
      entityId: w.id,
      label: w.name,
      sub: null
    })),
    ...events.map((e): WrestlingClipTarget => ({
      entityKind: 'event',
      entityId: e.id,
      label: e.name,
      sub: [promotionCfg(e.promotion)?.short, e.event_date?.slice(0, 4)].filter(Boolean).join(' · ') || null
    })),
    ...matches.map((m): WrestlingClipTarget => ({
      entityKind: 'match',
      entityId: m.id,
      label: m.title,
      sub: [m.show, m.date?.slice(0, 4)].filter(Boolean).join(' · ') || null
    }))
  ]
}
