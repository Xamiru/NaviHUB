import { getSqlite } from '../db/connection'
import type { ExternalLink, ExternalLinkMethod, ExternalLinkSource } from '@shared/types'

// media_external_link: identities a title has besides its own key. A row keeps
// its (external_source, external_id) forever; LaunchBox works, Bangumi
// subjects, Wikidata items and Steam apps attach here instead. The one rule:
// an automatic pass never replaces or removes a manual link.

interface LinkRow {
  source: ExternalLinkSource
  external_id: string
  method: ExternalLinkMethod
  linked_at: string
}

const toLink = (r: LinkRow): ExternalLink => ({
  source: r.source,
  externalId: r.external_id,
  method: r.method,
  linkedAt: r.linked_at
})

export function list(mediaId: number): ExternalLink[] {
  return (
    getSqlite()
      .prepare(
        `SELECT source, external_id, method, linked_at FROM media_external_link
         WHERE media_id = ? AND external_id <> '' ORDER BY source`
      )
      .all(mediaId) as LinkRow[]
  ).map(toLink)
}

export function get(mediaId: number, source: ExternalLinkSource): ExternalLink | null {
  const row = getSqlite()
    .prepare(
      'SELECT source, external_id, method, linked_at FROM media_external_link WHERE media_id = ? AND source = ?'
    )
    .get(mediaId, source) as LinkRow | undefined
  return row ? toLink(row) : null
}

// Media rows reachable through a link — the reverse lookup dedup and relation
// resolution need. Seeks idx_media_external_link_ext.
export function mediaIdsFor(source: ExternalLinkSource, externalId: string): number[] {
  return (
    getSqlite()
      .prepare('SELECT media_id FROM media_external_link WHERE source = ? AND external_id = ?')
      .all(source, externalId) as { media_id: number }[]
  ).map((r) => r.media_id)
}

// Returns false when a manual link already holds the slot and this write is
// automatic. Re-linking to the same id keeps the stronger method's timestamp.
export function set(
  mediaId: number,
  source: ExternalLinkSource,
  externalId: string,
  method: ExternalLinkMethod
): boolean {
  const db = getSqlite()
  const existing = get(mediaId, source)
  if (existing?.method === 'manual' && method !== 'manual') return false
  if (existing && existing.externalId === externalId && existing.method === method) return true
  db.prepare(
    `INSERT INTO media_external_link (media_id, source, external_id, method) VALUES (?, ?, ?, ?)
     ON CONFLICT(media_id, source) DO UPDATE SET
       external_id = excluded.external_id, method = excluded.method, linked_at = datetime('now')`
  ).run(mediaId, source, externalId, method)
  return true
}

// The user's "this title has no <source> entry": a manual row with an empty id,
// so the next automatic pass does not link it again. linkedId() reads it as
// no link; list() leaves it out.
export function unlinkManually(mediaId: number, source: ExternalLinkSource): void {
  set(mediaId, source, '', 'manual')
}

// The id to use for a source, or null when there is none or the user unlinked it.
export function linkedId(mediaId: number, source: ExternalLinkSource): string | null {
  const link = get(mediaId, source)
  return link && link.externalId !== '' ? link.externalId : null
}

// Lets the user hand a source back to the automatic passes (removes a manual
// unlink or manual link too).
export function reset(mediaId: number, source: ExternalLinkSource): void {
  getSqlite()
    .prepare('DELETE FROM media_external_link WHERE media_id = ? AND source = ?')
    .run(mediaId, source)
}
