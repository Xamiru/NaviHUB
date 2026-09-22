import { createHash } from 'crypto'
import { getSqlite } from '../db/connection'
import { fetchWithRetry, MAX_API_RESPONSE_BYTES } from '../http'
import { FOOTBALL_WIKIMEDIA_MANIFEST, normalizeFootballName } from '@shared/football'
import type { FootballCompetitionKey } from '@shared/types'

export interface WikimediaHonourRow {
  seasonKey: string
  seasonLabel: string
  winners: string[]
  runnersUp: string[]
}

export interface WikimediaPageSnapshot {
  page: string
  sourceUrl: string
  revision: string
  body: string
  honours: WikimediaHonourRow[]
  honoursComplete: boolean
}

export function wikimediaHonoursComplete(
  entry: typeof FOOTBALL_WIKIMEDIA_MANIFEST[number],
  honours: WikimediaHonourRow[]
): boolean {
  const seasons = new Set(honours.map((row) => row.seasonKey))
  return seasons.size >= entry.minimumHonours && seasons.has(entry.firstSeasonKey)
}

function stripCellAttributes(value: string): string {
  const first = value.indexOf('|')
  if (first < 0) return value
  const before = value.slice(0, first)
  return /(?:style|rowspan|colspan|scope|class|align|bgcolor)\s*=/.test(before)
    ? value.slice(first + 1)
    : value
}

function stripWiki(value: string): string {
  let next = value
    .replace(/<ref\b[^>]*\/>/gi, '')
    .replace(/<ref\b[^>]*>[\s\S]*?<\/ref>/gi, '')
    .replace(/<!--[^]*?-->/g, '')
    .replace(/<br\s*\/?>/gi, ' / ')
    .replace(/\{\{(?:flagicon|flag|fb|country data)[^}]*\}\}/gi, '')
    .replace(/\{\{sortname\|([^|}]+)\|([^|}]+)[^}]*\}\}/gi, '$1 $2')
    .replace(/\{\{(?:nowrap|small|nobr)\|([^{}]*)\}\}/gi, '$1')
  for (let i = 0; i < 4; i++) next = next.replace(/\{\{[^{}]*\}\}/g, '')
  return stripCellAttributes(next)
    .replace(/\[\[(?:File|Image):[^\]]+\]\]/gi, '')
    .replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, '$2')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .replace(/\[(?:https?:\/\/[^\s\]]+)\s*([^\]]*)\]/g, '$1')
    .replace(/'{2,5}/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\[[a-z]?\d+\]/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeHeader(value: string): string {
  return stripWiki(value).toLocaleLowerCase('en').replace(/[^a-z0-9-]+/g, ' ').trim()
}

function seasonIdentity(value: string): { key: string; label: string } | null {
  const clean = stripWiki(value).replace(/[–—−]/g, '-').trim()
  const span = clean.match(/\b(18|19|20)(\d{2})\s*[-/]\s*(?:(18|19|20))?(\d{2})\b/)
  if (span) return { key: `${span[1]}${span[2]}/${span[4]}`, label: `${span[1]}${span[2]}/${span[4]}` }
  const year = clean.match(/\b((?:18|19|20)\d{2})\b/)
  return year ? { key: year[1], label: year[1] } : null
}

function linkedLabels(value: string): string[] {
  const links = [...value.matchAll(/\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/g)]
    .filter((match) => !/^(?:File|Image|Flag|Category):/i.test(match[1]))
    .map((match) => stripWiki(match[2] ?? match[1]))
    .filter((label) => label && !/^\d{4}(?:[-/]\d{2,4})?$/.test(label))
  const values = links.length
    ? links
    : stripWiki(value).split(/\s+\/\s+|\s*;\s*/).map((item) => item.trim()).filter(Boolean)
  return [...new Set(values.map((item) => item.replace(/\s*\([^)]*(?:title|win|champion)[^)]*\)\s*$/i, '').trim()).filter(Boolean))]
}

function tableRows(table: string): { headers: string[]; rows: string[][] } {
  const records = table.split(/^\|-.*$/m)
  let headers: string[] = []
  const rows: string[][] = []
  for (const record of records) {
    const lines = record.split(/\r?\n/).filter((line) => !/^\{\||^\|\}/.test(line.trim()))
    const headerCells = lines.filter((line) => line.trim().startsWith('!')).flatMap((line) => line.trim().slice(1).split('!!'))
    if (!headers.length && headerCells.length) {
      headers = headerCells.map(normalizeHeader)
      continue
    }
    const cells: string[] = []
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed.startsWith('|') || trimmed.startsWith('|+')) continue
      cells.push(...trimmed.slice(1).split('||').map((cell) => cell.trim()))
    }
    if (cells.length) rows.push(cells)
  }
  return { headers, rows }
}

function matchingColumn(headers: string[], candidates: string[]): number {
  return headers.findIndex((header) => candidates.some((candidate) => header === candidate || header.startsWith(`${candidate} `)))
}

export function parseWikimediaHonours(
  wikitext: string,
  winnerHeaders: string[],
  runnerUpHeaders: string[]
): WikimediaHonourRow[] {
  const found = new Map<string, WikimediaHonourRow>()
  const tables = wikitext.match(/\{\|[^]*?\n\|\}/g) ?? []
  for (const table of tables) {
    if (!/wikitable/i.test(table.slice(0, 200))) continue
    const { headers, rows } = tableRows(table)
    const seasonCol = matchingColumn(headers, ['season', 'year', 'edition'])
    const winnerCol = matchingColumn(headers, winnerHeaders.map(normalizeHeader))
    const runnerCol = matchingColumn(headers, runnerUpHeaders.map(normalizeHeader))
    if (seasonCol < 0 || winnerCol < 0) continue
    for (const row of rows) {
      const season = seasonIdentity(row[seasonCol] ?? '')
      const winners = linkedLabels(row[winnerCol] ?? '')
      if (!season || !winners.length) continue
      const runnersUp = runnerCol < 0 ? [] : linkedLabels(row[runnerCol] ?? '')
      const existing = found.get(season.key)
      if (!existing || (existing.runnersUp.length === 0 && runnersUp.length > 0)) {
        found.set(season.key, {
          seasonKey: season.key,
          seasonLabel: season.label,
          winners,
          runnersUp
        })
      }
    }
  }
  return [...found.values()].sort((a, b) => a.seasonKey.localeCompare(b.seasonKey))
}

export function wikimediaPlainText(wikitext: string, maxLength = 5000): string {
  const withoutTables = wikitext.replace(/\{\|[^]*?\n\|\}/g, '').replace(/^==+[^=]+==+$/gm, '\n')
  return withoutTables
    .split(/\n\s*\n/)
    .map(stripWiki)
    .filter((paragraph) => paragraph.length >= 60)
    .join('\n\n')
    .slice(0, maxLength)
}

export async function fetchWikimediaSnapshot(
  entry: typeof FOOTBALL_WIKIMEDIA_MANIFEST[number],
  signal: AbortSignal
): Promise<WikimediaPageSnapshot> {
  const params = new URLSearchParams({
    action: 'query',
    prop: 'revisions',
    rvprop: 'ids|timestamp|content',
    rvslots: 'main',
    format: 'json',
    formatversion: '2',
    titles: entry.page
  })
  const response = await fetchWithRetry(`https://en.wikipedia.org/w/api.php?${params}`, {
    headers: { 'User-Agent': 'NaviHUB/FootballArchive (personal local archive)' },
    timeoutMs: 45_000,
    taskSignal: signal,
    maxResponseBytes: MAX_API_RESPONSE_BYTES
  })
  if (!response.ok) throw new Error(`Wikimedia returned HTTP ${response.status}`)
  const payload = await response.json() as any
  const page = payload.query?.pages?.[0]
  const revision = page?.revisions?.[0]
  const wikitext = String(revision?.slots?.main?.content ?? '')
  if (!wikitext) throw new Error(`Wikimedia supplied no source text for ${entry.page}`)
  const honours = parseWikimediaHonours(wikitext, entry.winnerHeaders, entry.runnerUpHeaders)
  return {
    page: entry.page,
    sourceUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(entry.page.replace(/ /g, '_'))}`,
    revision: String(revision.revid ?? createHash('sha256').update(wikitext).digest('hex')),
    body: wikimediaPlainText(wikitext),
    honours,
    honoursComplete: wikimediaHonoursComplete(entry, honours)
  }
}

function teamForHonour(name: string, sourceUrl: string): number {
  const db = getSqlite()
  const normalized = normalizeFootballName(name)
  const existing = db.prepare(`
    SELECT entity_id AS id FROM football_source_ref
    WHERE entity_kind='team' AND source='wikimedia' AND external_id=?
  `).get(normalized) as { id: number } | undefined
  if (existing) {
    db.prepare(`
      UPDATE football_source_ref SET source_url=?,fetched_at=datetime('now')
      WHERE entity_kind='team' AND source='wikimedia' AND external_id=?
    `).run(sourceUrl, normalized)
    return existing.id
  }
  const refs = db.prepare(`
    SELECT DISTINCT entity_id AS id FROM football_alias
    WHERE entity_kind='team' AND normalized=?
  `).all(normalized) as { id: number }[]
  const id = refs.length === 1
    ? refs[0].id
    : Number(db.prepare(`INSERT INTO football_team (name) VALUES (?)`).run(name).lastInsertRowid)
  db.prepare(`
    INSERT OR IGNORE INTO football_alias
      (entity_kind,entity_id,source,alias,normalized,external_id)
    VALUES ('team',?,'wikimedia',?,?,?)
  `).run(id, name, normalized, normalized)
  db.prepare(`
    INSERT INTO football_source_ref
      (entity_kind,entity_id,source,external_id,source_url,fetched_at)
    VALUES ('team',?,'wikimedia',?,?,datetime('now'))
    ON CONFLICT(entity_kind,source,external_id) DO UPDATE SET
      source_url=excluded.source_url,fetched_at=excluded.fetched_at
  `).run(id, normalized, sourceUrl)
  if (refs.length > 1) {
    db.prepare(`
      INSERT INTO football_conflict
        (entity_kind,entity_id,facet,source_a,value_a,source_b,value_b)
      VALUES ('team',?,'identity','wikimedia',?,'archive',?)
    `).run(id, name, `Possible matches: ${refs.map((item) => item.id).join(',')}`)
  }
  return id
}

export function saveWikimediaSnapshot(
  competitionKey: FootballCompetitionKey,
  snapshot: WikimediaPageSnapshot
): number {
  const db = getSqlite()
  const competition = db.prepare(`SELECT id FROM football_competition WHERE key=?`).get(competitionKey) as { id: number } | undefined
  if (!competition) throw new Error(`Unknown Football competition: ${competitionKey}`)
  return db.transaction(() => {
    db.prepare(`
      INSERT INTO football_article
        (entity_kind,entity_id,title,body,source_url,revision,license,attribution,state,fetched_at)
      VALUES ('competition',?,?,?,?,?,'CC BY-SA 4.0','Wikipedia contributors','ready',datetime('now'))
      ON CONFLICT(entity_kind,entity_id,source_url) DO UPDATE SET
        title=excluded.title,body=excluded.body,revision=excluded.revision,
        license=excluded.license,attribution=excluded.attribution,state='ready',fetched_at=excluded.fetched_at
    `).run(competition.id, snapshot.page, snapshot.body, snapshot.sourceUrl, snapshot.revision)
    const previous = db.prepare(`
      SELECT COUNT(DISTINCT h.season_id) AS seasonCount,
        MAX(CASE WHEN fc.state='complete' THEN 1 ELSE 0 END) AS complete
      FROM football_source_ref sr
      JOIN football_honour h ON h.id=sr.entity_id
      LEFT JOIN football_coverage fc ON fc.competition_id=h.competition_id
        AND fc.season_id IS NULL AND fc.source='wikimedia' AND fc.facet='honours'
      WHERE sr.entity_kind='honour' AND sr.source='wikimedia' AND h.competition_id=?
    `).get(competition.id) as { seasonCount: number; complete: number }
    const incomingSeasonCount = new Set(snapshot.honours.map((row) => row.seasonKey)).size
    const complete =
      snapshot.honoursComplete &&
      (previous.seasonCount === 0 || incomingSeasonCount >= previous.seasonCount)
    if (!complete) {
      const coverage = db.prepare(`
        SELECT id,state FROM football_coverage
        WHERE competition_id=? AND season_id IS NULL
          AND source='wikimedia' AND facet='honours'
        ORDER BY id DESC LIMIT 1
      `).get(competition.id) as { id: number; state: string } | undefined
      const note = `Revision ${snapshot.revision} was incomplete; retained the last complete honours slice`
      if (coverage) {
        db.prepare(`
          UPDATE football_coverage SET
            state=CASE WHEN state='complete' THEN state ELSE 'partial' END,
            item_count=CASE WHEN state='complete' THEN item_count ELSE ? END,
            note=?,revision=CASE WHEN state='complete' THEN revision ELSE ? END,
            checked_at=datetime('now') WHERE id=?
        `).run(incomingSeasonCount, note, snapshot.revision, coverage.id)
      } else {
        db.prepare(`
          INSERT INTO football_coverage
            (competition_id,source,facet,state,item_count,note,revision,checked_at)
          VALUES (?,'wikimedia','honours','partial',?,?,?,datetime('now'))
        `).run(competition.id, incomingSeasonCount, note, snapshot.revision)
      }
      return 0
    }
    const keep = new Set<number>()
    for (const row of snapshot.honours) {
      db.prepare(`
        INSERT INTO football_season (competition_id,key,label,status,data_revision,updated_at)
        VALUES (?,?,?,'complete',?,datetime('now'))
        ON CONFLICT(competition_id,key) DO UPDATE SET
          label=excluded.label,data_revision=COALESCE(football_season.data_revision,excluded.data_revision),updated_at=excluded.updated_at
      `).run(competition.id, row.seasonKey, row.seasonLabel, `wikimedia:${snapshot.revision}`)
      const season = db.prepare(`SELECT id FROM football_season WHERE competition_id=? AND key=?`).get(competition.id, row.seasonKey) as { id: number }
      const placements: Array<{ placement: 'winner' | 'runner-up'; names: string[] }> = [
        { placement: 'winner', names: row.winners },
        { placement: 'runner-up', names: row.runnersUp }
      ]
      for (const group of placements) {
        group.names.forEach((name, index) => {
          const externalId = `${competitionKey}:${row.seasonKey}:${group.placement}:${index}`
          const prior = db.prepare(`
            SELECT entity_id FROM football_source_ref
            WHERE entity_kind='honour' AND source='wikimedia' AND external_id=?
          `).get(externalId) as { entity_id: number } | undefined
          const teamId = teamForHonour(name, snapshot.sourceUrl)
          let honourId = prior?.entity_id
          if (honourId == null) {
            honourId = Number(db.prepare(`
              INSERT INTO football_honour
                (competition_id,season_id,team_id,title,placement,verified,shared,sort_order)
              VALUES (?,?,?,?,?,1,?,?)
            `).run(competition.id, season.id, teamId, row.seasonLabel, group.placement, group.names.length > 1 ? 1 : 0, index).lastInsertRowid)
          } else {
            db.prepare(`
              UPDATE football_honour SET competition_id=?,season_id=?,team_id=?,title=?,
                placement=?,verified=1,shared=?,sort_order=? WHERE id=?
            `).run(competition.id, season.id, teamId, row.seasonLabel, group.placement, group.names.length > 1 ? 1 : 0, index, honourId)
          }
          keep.add(honourId)
          db.prepare(`
            INSERT INTO football_source_ref
              (entity_kind,entity_id,source,external_id,source_url,revision,fetched_at)
            VALUES ('honour',?,'wikimedia',?,?,?,datetime('now'))
            ON CONFLICT(entity_kind,source,external_id) DO UPDATE SET
              entity_id=excluded.entity_id,source_url=excluded.source_url,
              revision=excluded.revision,fetched_at=excluded.fetched_at
          `).run(honourId, externalId, snapshot.sourceUrl, snapshot.revision)
        })
      }
      db.prepare(`UPDATE football_season SET champion_verified=? WHERE id=?`).run(row.winners.length === 1 ? 1 : 0, season.id)
    }
    const old = db.prepare(`
      SELECT sr.id AS refId,sr.entity_id AS honourId FROM football_source_ref sr
      JOIN football_honour h ON h.id=sr.entity_id
      WHERE sr.entity_kind='honour' AND sr.source='wikimedia' AND h.competition_id=?
    `).all(competition.id) as { refId: number; honourId: number }[]
    for (const item of old) {
      if (keep.has(item.honourId)) continue
      db.prepare(`DELETE FROM football_source_ref WHERE id=?`).run(item.refId)
      db.prepare(`DELETE FROM football_honour WHERE id=?`).run(item.honourId)
    }
    db.prepare(`DELETE FROM football_coverage WHERE competition_id=? AND season_id IS NULL AND source='wikimedia' AND facet='honours'`).run(competition.id)
    db.prepare(`
      INSERT INTO football_coverage
        (competition_id,source,facet,state,item_count,note,revision,checked_at)
      VALUES (?,'wikimedia','honours','complete',?,NULL,?,datetime('now'))
    `).run(competition.id, snapshot.honours.length, snapshot.revision)
    return snapshot.honours.length
  })()
}
