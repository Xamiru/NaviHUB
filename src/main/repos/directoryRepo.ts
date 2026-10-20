import { getSqlite } from '../db/sqliteHandle'
import { mapCompany, mapPerson } from './mappers'
import type {
  CompanyDirectoryEntry,
  CompanyDirectoryQuery,
  PersonDirectoryEntry,
  PersonDirectoryQuery,
  MediaCompanyRole,
  PersonDirectoryWork
} from '@shared/types'

// The creator directories (Mangaka) and the Studios directory. Each reads one
// media type's titles joined to all their credits or companies, so it runs in
// the quiz pool process (quizPoolsCore) with its own read-only connection; it
// must not import electron or db/connection. One indexed pass per directory;
// grouping, counts and the cover pick happen in JS so no per-entity subquery
// runs. Sorted by works; the renderer re-sorts and filters the returned list.

const COVERS = 3

// The roles that make a company a studio. Producers, publishers and the like
// are left out, here and in the stats page's studio ranking (creditTimeRepo).
export const STUDIO_ROLES: MediaCompanyRole[] = ['animation_studio', 'production_studio', 'developer']

interface Work extends PersonDirectoryWork {
  score: number | null
}

interface Tally {
  works: number
  readWorks: number
  meanScore: number | null
  covers: PersonDirectoryWork[]
}

// The title columns both reads select, and whether the title counts as read:
// one of the type's in-progress/completed statuses, any progress, or a re-read.
function titleColumns(readStatuses: string[]): { sql: string; args: string[] } {
  const statuses = readStatuses.length ? readStatuses : ['']
  return {
    sql: `m.id AS media_id, m.title AS media_title, m.cover_path AS media_cover, m.score AS media_score,
          (m.status IN (${statuses.map(() => '?').join(', ')}) OR m.progress > 0 OR m.rewatch_count > 0) AS media_read`,
    args: statuses
  }
}

function workOf(r: Record<string, unknown>): Work {
  return {
    id: r.media_id as number,
    title: r.media_title as string,
    coverPath: (r.media_cover as string | null) ?? null,
    read: !!r.media_read,
    score: (r.media_score as number | null) ?? null
  }
}

// Groups the rows by entity id. `coverless` keeps titles with no cover in the
// cover pick (a creator's card shows placeholders; a studio's skips them).
function tally<E>(
  rows: Record<string, unknown>[],
  idColumn: string,
  mapEntity: (row: Record<string, unknown>) => E,
  coverless: boolean
): { entity: E; tally: Tally }[] {
  const byId = new Map<number, { entity: E; works: Work[] }>()
  for (const r of rows) {
    const id = r[idColumn] as number
    let entry = byId.get(id)
    if (!entry) {
      entry = { entity: mapEntity(r), works: [] }
      byId.set(id, entry)
    }
    entry.works.push(workOf(r))
  }
  return [...byId.values()].map(({ entity, works }) => {
    const scored = works.filter((w) => w.score != null)
    const covers = works
      .filter((w) => coverless || w.coverPath)
      .sort(
        (a, b) =>
          Number(b.read) - Number(a.read) ||
          (b.score ?? -1) - (a.score ?? -1) ||
          a.title.localeCompare(b.title)
      )
      .slice(0, COVERS)
      .map(({ id, title, coverPath, read }) => ({ id, title, coverPath, read }))
    return {
      entity,
      tally: {
        works: works.length,
        readWorks: works.filter((w) => w.read).length,
        meanScore: scored.length
          ? scored.reduce((sum, w) => sum + (w.score as number), 0) / scored.length
          : null,
        covers
      }
    }
  })
}

// A role-scoped creator directory (the Mangaka page). DISTINCT folds a person
// credited twice on one title in the same role.
export function personDirectory(query: PersonDirectoryQuery): PersonDirectoryEntry[] {
  const cols = titleColumns(query.readStatuses)
  const rows = getSqlite()
    .prepare(
      `SELECT DISTINCT cr.person_id AS person_id, ${cols.sql}, p.*
       FROM media_item m
       -- CROSS JOIN pins the order: seek the type's titles, then their credits
       -- by idx_credit_media. Left free, SQLite walks every crew credit in the
       -- library through idx_credit_character instead.
       CROSS JOIN credit cr ON cr.media_id = m.id AND cr.role = ? AND cr.character_id IS NULL
       JOIN person p ON p.id = cr.person_id
       WHERE m.media_type = ?`
    )
    .all(...cols.args, query.role, query.mediaType) as Record<string, unknown>[]
  return tally(rows, 'person_id', mapPerson, true)
    .map(({ entity, tally }) => ({ person: entity, ...tally }))
    .sort((a, b) => b.works - a.works || a.person.name.localeCompare(b.person.name))
}

// The Studios directory, limited to STUDIO_ROLES. DISTINCT folds a company
// holding two studio roles on one title.
export function companyDirectory(query: CompanyDirectoryQuery): CompanyDirectoryEntry[] {
  const cols = titleColumns(query.readStatuses)
  const rows = getSqlite()
    .prepare(
      `SELECT DISTINCT mc.company_id AS company_id, ${cols.sql}, c.*
       FROM media_item m
       CROSS JOIN media_company mc ON mc.media_id = m.id
         AND mc.role IN (${STUDIO_ROLES.map(() => '?').join(',')})
       JOIN company c ON c.id = mc.company_id
       WHERE m.media_type = ?`
    )
    .all(...cols.args, ...STUDIO_ROLES, query.mediaType) as Record<string, unknown>[]
  return tally(rows, 'company_id', mapCompany, false)
    .map(({ entity, tally }) => ({ company: entity, ...tally }))
    .sort((a, b) => b.works - a.works || a.company.name.localeCompare(b.company.name))
}
