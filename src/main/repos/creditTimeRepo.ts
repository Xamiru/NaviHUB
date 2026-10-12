import { getSqlite } from '../db/sqliteHandle'
import {
  STAT_TYPES,
  STAT_ROW_COLUMNS,
  COMPLETED_STATUS_SQL,
  completedLabels,
  isConsumed,
  rowMinutes,
  type StatRow,
  type TimeStatsConfig
} from '@shared/timeStats'
import type {
  CreditRole,
  CreditTimeGroup,
  CreditTimeGroupKey,
  MediaCompanyRole
} from '@shared/types'

// "Who your time went to" on /stats: people and studios ranked by the minutes
// of the consumed titles they are credited on. It reads every credit of every
// consumed title, so it runs in the quiz pool process (quizPoolsCore) with its
// own read-only connection; it must not import electron or db/connection.
// Main reads the settings into the TimeStatsConfig it passes in.

const TOP = 10

const PERSON_GROUPS: { key: CreditTimeGroupKey; label: string; roles: CreditRole[] }[] = [
  { key: 'voice', label: 'Voice actors', roles: ['voice_actor'] },
  { key: 'actor', label: 'Actors', roles: ['actor'] },
  { key: 'director', label: 'Directors', roles: ['director'] },
  { key: 'writer', label: 'Writers and authors', roles: ['writer', 'mangaka'] }
]

const STUDIO_ROLES: MediaCompanyRole[] = ['animation_studio', 'production_studio', 'developer']

interface Tally {
  minutes: number
  titles: Set<number>
  estimated: boolean
}

// The consumed filter, aliased m, shared by the three reads below.
function consumedWhere(cfg: TimeStatsConfig): { sql: string; args: string[] } {
  const labels = completedLabels(cfg)
  return {
    sql: `m.media_type IN (${STAT_TYPES.map(() => '?').join(',')})
      AND (m.progress > 0 OR m.rewatch_count > 0
           OR ${COMPLETED_STATUS_SQL} IN (${labels.map(() => '?').join(',') || 'NULL'}))`,
    args: [...STAT_TYPES, ...labels]
  }
}

function addTo(
  tallies: Map<number, Tally>,
  id: number,
  mediaId: number,
  title: { minutes: number; estimated: boolean }
): void {
  let t = tallies.get(id)
  if (!t) {
    t = { minutes: 0, titles: new Set(), estimated: false }
    tallies.set(id, t)
  }
  // A person voicing three characters in one show counts that show once.
  if (t.titles.has(mediaId)) return
  t.titles.add(mediaId)
  t.minutes += title.minutes
  if (title.estimated) t.estimated = true
}

function topOf(tallies: Map<number, Tally>): [number, Tally][] {
  return [...tallies.entries()]
    .sort(
      (a, b) =>
        b[1].minutes - a[1].minutes || b[1].titles.size - a[1].titles.size || a[0] - b[0]
    )
    .slice(0, TOP)
}

export function creditTime(cfg: TimeStatsConfig): CreditTimeGroup[] {
  const db = getSqlite()
  const where = consumedWhere(cfg)

  const minutesById = new Map<number, { minutes: number; estimated: boolean }>()
  const rows = db
    .prepare(`SELECT ${STAT_ROW_COLUMNS} FROM media_item m WHERE ${where.sql}`)
    .all(...where.args) as StatRow[]
  for (const r of rows) {
    if (!isConsumed(r, cfg)) continue
    const m = rowMinutes(r, cfg)
    if (m.minutes > 0) minutesById.set(r.id, m)
  }
  if (minutesById.size === 0) return []

  // Joining from media_item seeks idx_credit_media / idx_mc_media per title.
  const personRoles = PERSON_GROUPS.flatMap((g) => g.roles)
  const credits = db
    .prepare(
      `SELECT cr.media_id, cr.person_id, cr.role
       FROM media_item m JOIN credit cr ON cr.media_id = m.id
       WHERE ${where.sql} AND cr.role IN (${personRoles.map(() => '?').join(',')})`
    )
    .all(...where.args, ...personRoles) as { media_id: number; person_id: number; role: CreditRole }[]

  const groupOfRole = new Map<CreditRole, CreditTimeGroupKey>()
  for (const g of PERSON_GROUPS) for (const role of g.roles) groupOfRole.set(role, g.key)
  const personTallies = new Map<CreditTimeGroupKey, Map<number, Tally>>(
    PERSON_GROUPS.map((g) => [g.key, new Map()])
  )
  for (const c of credits) {
    const title = minutesById.get(c.media_id)
    const group = groupOfRole.get(c.role)
    if (!title || !group) continue
    addTo(personTallies.get(group)!, c.person_id, c.media_id, title)
  }

  const studioLinks = db
    .prepare(
      `SELECT mc.media_id, mc.company_id
       FROM media_item m JOIN media_company mc ON mc.media_id = m.id
       WHERE ${where.sql} AND mc.role IN (${STUDIO_ROLES.map(() => '?').join(',')})`
    )
    .all(...where.args, ...STUDIO_ROLES) as { media_id: number; company_id: number }[]
  const studioTallies = new Map<number, Tally>()
  for (const l of studioLinks) {
    const title = minutesById.get(l.media_id)
    if (title) addTo(studioTallies, l.company_id, l.media_id, title)
  }

  // Names and images only for the handful that made a top list.
  const personTops = PERSON_GROUPS.map((g) => ({ g, top: topOf(personTallies.get(g.key)!) }))
  const personIds = [...new Set(personTops.flatMap((p) => p.top.map(([id]) => id)))]
  const people = new Map<number, { name: string; image: string | null }>()
  if (personIds.length > 0) {
    const found = db
      .prepare(
        `SELECT id, name, photo_path FROM person WHERE id IN (${personIds.map(() => '?').join(',')})`
      )
      .all(...personIds) as { id: number; name: string; photo_path: string | null }[]
    for (const p of found) people.set(p.id, { name: p.name, image: p.photo_path })
  }
  const studioTop = topOf(studioTallies)
  const companies = new Map<number, { name: string; image: string | null }>()
  if (studioTop.length > 0) {
    const found = db
      .prepare(
        `SELECT id, name, logo_path FROM company WHERE id IN (${studioTop.map(() => '?').join(',')})`
      )
      .all(...studioTop.map(([id]) => id)) as { id: number; name: string; logo_path: string | null }[]
    for (const c of found) companies.set(c.id, { name: c.name, image: c.logo_path })
  }

  const entries = (
    top: [number, Tally][],
    names: Map<number, { name: string; image: string | null }>
  ): CreditTimeGroup['entries'] =>
    top.flatMap(([id, t]) => {
      const n = names.get(id)
      if (!n) return []
      return [
        {
          id,
          name: n.name,
          imagePath: n.image,
          minutes: t.minutes,
          titleCount: t.titles.size,
          estimated: t.estimated
        }
      ]
    })

  const groups: CreditTimeGroup[] = personTops.map(({ g, top }) => ({
    key: g.key,
    label: g.label,
    entries: entries(top, people)
  }))
  groups.push({ key: 'studio', label: 'Studios', entries: entries(studioTop, companies) })
  return groups.filter((g) => g.entries.length > 0)
}
