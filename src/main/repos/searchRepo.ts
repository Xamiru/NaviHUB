import { getSqlite } from '../db/connection'
import { mapMedia, mapPerson, mapCompany, mapCharacter } from './mappers'
import type { GlobalSearchResults } from '@shared/types'

// One query per entity, capped — feeds the global search dropdown / page.
export function global(query: string): GlobalSearchResults {
  const db = getSqlite()
  const q = `%${query}%`
  const empty: GlobalSearchResults = { media: [], people: [], companies: [], characters: [] }
  if (!query.trim()) return empty

  return {
    media: db
      .prepare(
        `SELECT * FROM media_item
         WHERE title LIKE ? OR title_original LIKE ?
         ORDER BY title LIMIT 20`
      )
      .all(q, q)
      .map(mapMedia),
    people: db
      .prepare(
        `SELECT * FROM person WHERE name LIKE ? OR name_native LIKE ? ORDER BY name LIMIT 20`
      )
      .all(q, q)
      .map(mapPerson),
    companies: db
      .prepare(
        `SELECT * FROM company WHERE name LIKE ? OR name_native LIKE ? ORDER BY name LIMIT 20`
      )
      .all(q, q)
      .map(mapCompany),
    characters: db
      .prepare(
        `SELECT * FROM character WHERE name LIKE ? OR name_native LIKE ? ORDER BY name LIMIT 20`
      )
      .all(q, q)
      .map(mapCharacter)
  }
}
