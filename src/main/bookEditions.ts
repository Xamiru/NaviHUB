import { getSqlite } from './db/connection'
import * as hardcover from './hardcover'
import { HARDCOVER_SOURCE } from './hardcoverCore'
import type { BookEdition, ChosenBookEdition } from '@shared/types'

// The edition of a book the user reads (book_edition, personal). Choosing one
// makes its page count the progress total, which a Hardcover re-import keeps
// (importBook reads book_edition first); clearing it leaves the total as it is
// until the next refresh. Only Hardcover rows have editions to choose from.

function hardcoverBookId(mediaId: number): number {
  const row = getSqlite()
    .prepare('SELECT media_type, external_source, external_id FROM media_item WHERE id = ?')
    .get(mediaId) as { media_type: string; external_source: string | null; external_id: string | null } | undefined
  if (!row || row.media_type !== 'book') throw new Error('Book not found')
  const id = Number(row.external_id)
  if (row.external_source !== HARDCOVER_SOURCE || !Number.isInteger(id) || id <= 0) {
    throw new Error('Editions are available for books imported from Hardcover')
  }
  return id
}

export async function list(mediaId: number): Promise<BookEdition[]> {
  return hardcover.editions(hardcoverBookId(mediaId))
}

export function get(mediaId: number): ChosenBookEdition | null {
  const row = getSqlite()
    .prepare('SELECT snapshot_json, chosen_at FROM book_edition WHERE media_id = ?')
    .get(mediaId) as { snapshot_json: string; chosen_at: string } | undefined
  if (!row) return null
  try {
    return { edition: JSON.parse(row.snapshot_json) as BookEdition, chosenAt: row.chosen_at }
  } catch {
    return null
  }
}

// The renderer names an edition id; the snapshot is re-read from Hardcover so
// what is stored is the source's description, never a renderer-built object.
export async function choose(mediaId: number, editionId: number): Promise<ChosenBookEdition> {
  const bookId = hardcoverBookId(mediaId)
  const edition = (await hardcover.editions(bookId)).find((e) => e.id === editionId)
  if (!edition) throw new Error('That edition is no longer listed for this book')
  const db = getSqlite()
  db.transaction(() => {
    db.prepare(
      `INSERT INTO book_edition (media_id, source, edition_id, pages, snapshot_json, chosen_at)
       VALUES (?, ?, ?, ?, ?, datetime('now'))
       ON CONFLICT(media_id) DO UPDATE SET source = excluded.source, edition_id = excluded.edition_id,
         pages = excluded.pages, snapshot_json = excluded.snapshot_json, chosen_at = excluded.chosen_at`
    ).run(mediaId, HARDCOVER_SOURCE, String(edition.id), edition.pages, JSON.stringify(edition))
    if (edition.pages != null) {
      db.prepare("UPDATE media_item SET total_units = ?, updated_at = datetime('now') WHERE id = ?").run(
        edition.pages,
        mediaId
      )
    }
  })()
  return get(mediaId)!
}

export function clear(mediaId: number): void {
  getSqlite().prepare('DELETE FROM book_edition WHERE media_id = ?').run(mediaId)
}
