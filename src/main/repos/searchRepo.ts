import { getSqlite } from '../db/connection'
import { logWarn } from '../logBus'
import { mapMedia, mapPerson, mapCompany, mapCharacter } from './mappers'
import type { GlobalSearchResults } from '@shared/types'

// History's content is a lazily loaded in-memory catalog, not a table, so it
// joins the library results here through a cached dynamic import rather than
// the FTS projection (tests/performanceBoundaries.test.ts).
const loadHistory = (): Promise<typeof import('../history/historyService')> => import('../history/historyService')

export async function globalAll(query: string): Promise<GlobalSearchResults> {
  const library = global(query)
  if (!query.trim()) return library
  try {
    return { ...library, history: (await loadHistory()).search(query) }
  } catch (err) {
    // A broken History catalog must not take the library results down with it.
    logWarn('app', `search: History results unavailable: ${err instanceof Error ? err.message : String(err)}`)
    return library
  }
}

// One query per entity, capped — feeds the global search dropdown / page.
export function global(query: string): GlobalSearchResults {
  const db = getSqlite()
  const empty: GlobalSearchResults = { media: [], people: [], companies: [], characters: [], history: [] }
  const term = query.trim()
  if (!term) return empty

  // FTS5's trigram tokenizer indexes contains-search once the query has three
  // characters. Short queries retain LIKE, escaped so % and _ are literal.
  const useFts = [...term].length >= 3
  const match = `"${term.replaceAll('"', '""')}"`
  const q = `%${term.replace(/[\\%_]/g, '\\$&')}%`
  const mediaSql = useFts
    ? `SELECT m.* FROM global_search_fts
       JOIN media_item m ON m.id = global_search_fts.entity_id
       WHERE global_search_fts MATCH ? AND kind = 'media'
       ORDER BY bm25(global_search_fts), m.title LIMIT 20`
    : `SELECT * FROM media_item
       WHERE title LIKE ? ESCAPE '\\' OR title_original LIKE ? ESCAPE '\\'
       ORDER BY title LIMIT 20`
  const entitySql = (kind: 'person' | 'company' | 'character', table: string): string =>
    useFts
      ? `SELECT e.* FROM global_search_fts
         JOIN ${table} e ON e.id = global_search_fts.entity_id
         WHERE global_search_fts MATCH ? AND kind = '${kind}'
         ORDER BY bm25(global_search_fts), e.name LIMIT 20`
      : `SELECT * FROM ${table}
         WHERE name LIKE ? ESCAPE '\\' OR name_native LIKE ? ESCAPE '\\'
         ORDER BY name LIMIT 20`
  const params = useFts ? [match] : [q, q]

  return {
    media: db
      .prepare(mediaSql)
      .all(...params)
      .map(mapMedia),
    people: db
      .prepare(entitySql('person', 'person'))
      .all(...params)
      .map(mapPerson),
    companies: db
      .prepare(entitySql('company', 'company'))
      .all(...params)
      .map(mapCompany),
    characters: db
      .prepare(entitySql('character', 'character'))
      .all(...params)
      .map(mapCharacter),
    history: []
  }
}
