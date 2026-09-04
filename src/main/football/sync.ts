import AdmZip from 'adm-zip'
import { createHash } from 'crypto'
import { getSqlite } from '../db/connection'
import { get as getSetting } from '../repos/settingsRepo'
import { fetchWithRetry } from '../http'
import { logError, logInfo, logWarn } from '../logBus'
import * as tasks from '../tasks'
import type { TaskHandle } from '../tasks'
import { cooperativeGate, type PauseGate } from '../taskControls'
import * as repo from '../repos/footballRepo'
import {
  FOOTBALL_COMPETITIONS,
  FOOTBALL_WIKIMEDIA_MANIFEST,
  normalizeFootballName
} from '@shared/football'
import type {
  FootballCompetitionKey,
  FootballEntitlement,
  FootballSeasonStatus,
  FootballSource,
  FootballSyncRequest,
  FootballSyncStatus
} from '@shared/types'
import {
  assertBoundedArchive,
  attachInternationalScorers,
  buildFootballLedger,
  FOOTBALL_DEEP_ARCHIVE_LIMIT,
  footballPointsForWin,
  footballSeasonKey,
  parseApiFootballFixture,
  parseApiFootballEvents,
  parseApiFootballLineups,
  parseEngsoccerCsv,
  parseInternationalResultsCsv,
  parseInternationalScorersCsv,
  parseOpenFootballTxt,
  parseStatsBombCompetitionSeasons,
  parseStatsBombEvents,
  parseStatsBombLineups,
  parseStatsBombMatches,
  parseWyscoutEvents,
  parseWyscoutPack,
  type SourceGoal,
  type SourceMatch,
  type SourceSlice
} from './sources'
import { fetchWikimediaSnapshot, saveWikimediaSnapshot } from './wikimedia'
import {
  fetchEntityEnrichment,
  noteEnrichmentConflict,
  saveEntityEnrichment
} from './enrichment'

const API_BASE = 'https://v3.football.api-sports.io'
const OPENFOOTBALL_ARCHIVE =
  'https://github.com/openfootball/champions-league/archive/refs/heads/master.zip'
const INTERNATIONAL_BASE =
  'https://raw.githubusercontent.com/martj42/international_results/master'
const STATSBOMB_BASE = 'https://raw.githubusercontent.com/statsbomb/open-data/master/data'
const WYSCOUT_BASE = 'https://ndownloader.figshare.com/files'

const WYSCOUT_PACKS: Partial<Record<FootballCompetitionKey, { entry: string; seasonKey: string }>> = {
  'premier-league': { entry: 'England', seasonKey: '2017/18' },
  'la-liga': { entry: 'Spain', seasonKey: '2017/18' },
  'serie-a': { entry: 'Italy', seasonKey: '2017/18' },
  'bundesliga': { entry: 'Germany', seasonKey: '2017/18' },
  'world-cup': { entry: 'World_Cup', seasonKey: '2018' },
  euros: { entry: 'European_Championship', seasonKey: '2016' }
}

const API_LEAGUES: Record<FootballCompetitionKey, number> = {
  'premier-league': 39,
  'la-liga': 140,
  'serie-a': 135,
  'bundesliga': 78,
  'champions-league': 2,
  'europa-league': 3,
  'conference-league': 848,
  'world-cup': 1,
  euros: 4
}

const ENGSOCER_FILES: Array<{
  file: string
  competitionKey: FootballCompetitionKey
  tierOneOnly?: boolean
}> = [
  { file: 'england.csv', competitionKey: 'premier-league', tierOneOnly: true },
  { file: 'spain.csv', competitionKey: 'la-liga' },
  { file: 'italy.csv', competitionKey: 'serie-a' },
  { file: 'germany.csv', competitionKey: 'bundesliga' },
  { file: 'champs.csv', competitionKey: 'champions-league' }
]

let status: FootballSyncStatus = idleStatus(0)
let gate: PauseGate | null = null
let activeHandle: TaskHandle | null = null

function idleStatus(id: number): FootballSyncStatus {
  return {
    id,
    state: 'idle',
    kind: null,
    phase: null,
    source: null,
    competitionKey: null,
    done: 0,
    total: 0,
    requests: 0,
    imported: 0,
    conflicts: 0,
    message: null
  }
}

export function getStatus(): FootballSyncStatus {
  return { ...status }
}

export function getOverview() {
  return repo.syncOverview(getStatus())
}

export function pause(): void {
  if (status.state !== 'running') return
  status = { ...status, state: 'pausing', message: 'Pausing after the current source slice' }
  gate?.controls.pause?.()
}

export function resume(): void {
  if (status.state !== 'paused' && status.state !== 'pausing') return
  gate?.controls.resume?.()
}

export function cancel(): void {
  if (!['running', 'pausing', 'paused'].includes(status.state)) return
  gate?.controls.cancel?.()
}

// Called after task settlement and before database closure. Completed slices
// are already committed; aborting an active fetch cannot leave a partial slice.
export function cancelActiveFootballSync(): void {
  gate?.controls.cancel?.()
  gate = null
  activeHandle = null
}

async function checkpoint(runGate: PauseGate): Promise<void> {
  if (runGate.paused) await runGate.wait()
  if (runGate.cancelled) {
    const error = new tasks.TaskCancelledError('Football sync')
    throw error
  }
}

async function downloadText(url: string, source: FootballSource, signal: AbortSignal): Promise<{
  text: string
  etag: string | null
  checksum: string
}> {
  status = {
    ...status,
    phase: 'downloading',
    source,
    requests: status.requests + 1,
    message: `Downloading ${source}`
  }
  const response = await fetchWithRetry(url, { timeoutMs: 120_000, taskSignal: signal })
  if (!response.ok) throw new Error(`${source} returned HTTP ${response.status}`)
  const declared = Number(response.headers.get('content-length'))
  if (Number.isFinite(declared) && declared > 0) assertBoundedArchive(declared)
  const buffer = Buffer.from(await response.arrayBuffer())
  assertBoundedArchive(buffer.length)
  return {
    text: buffer.toString('utf8'),
    etag: response.headers.get('etag'),
    checksum: createHash('sha256').update(buffer).digest('hex')
  }
}

async function downloadBuffer(
  url: string,
  source: FootballSource,
  signal: AbortSignal,
  limit = 32 * 1024 * 1024
): Promise<{
  buffer: Buffer
  etag: string | null
  checksum: string
}> {
  status = {
    ...status,
    phase: 'downloading',
    source,
    requests: status.requests + 1,
    message: `Downloading ${source}`
  }
  const response = await fetchWithRetry(url, { timeoutMs: 120_000, taskSignal: signal })
  if (!response.ok) throw new Error(`${source} returned HTTP ${response.status}`)
  const declared = Number(response.headers.get('content-length'))
  if (Number.isFinite(declared) && declared > 0) assertBoundedArchive(declared, limit)
  const buffer = Buffer.from(await response.arrayBuffer())
  assertBoundedArchive(buffer.length, limit)
  return {
    buffer,
    etag: response.headers.get('etag'),
    checksum: createHash('sha256').update(buffer).digest('hex')
  }
}

function groupSlices(matches: SourceMatch[]): SourceSlice[] {
  const grouped = new Map<string, SourceMatch[]>()
  for (const match of matches) {
    const key = `${match.source}|${match.competitionKey}|${match.seasonKey}`
    grouped.set(key, [...(grouped.get(key) ?? []), match])
  }
  return [...grouped.values()].map((slice) => {
    const rawFingerprint = createHash('sha256')
      .update(slice.map((match) => match.rawFingerprint).sort().join('\n'))
      .digest('hex')
    return {
      source: slice[0].source,
      competitionKey: slice[0].competitionKey,
      seasonKey: slice[0].seasonKey,
      revision: rawFingerprint,
      rawFingerprint,
      coverage: {
        results: 'complete',
        scorers: slice.every((match) => match.goals != null) ? 'complete' : 'not_supplied',
        lineups: 'not_supplied'
      },
      matches: slice
    }
  })
}

function sourceRefId(kind: string, source: FootballSource, externalId: string): number | null {
  const row = getSqlite().prepare(`
    SELECT entity_id FROM football_source_ref
    WHERE entity_kind=? AND source=? AND external_id=?
  `).get(kind, source, externalId) as { entity_id: number } | undefined
  return row?.entity_id ?? null
}

export function footballSeasonStatus(
  slice: SourceSlice,
  kind: 'history' | 'current',
  now = new Date()
): FootballSeasonStatus {
  if (kind === 'history') return 'complete'
  if (slice.matches.length > 0 && slice.matches.every((match) => match.status === 'abandoned')) {
    return 'void'
  }
  const pending = slice.matches.filter((match) => match.status === 'scheduled')
  if (!pending.length) return 'complete'
  if (slice.matches.some((match) => match.status !== 'scheduled')) return 'current'
  const today = now.toISOString().slice(0, 10)
  return pending.every((match) => match.date > today) ? 'upcoming' : 'current'
}

function upsertTeam(match: SourceMatch, side: 'home' | 'away'): number {
  const sourceTeam = match[side]
  const existing = sourceRefId('team', match.source, sourceTeam.sourceId)
  if (existing != null) return existing
  const db = getSqlite()
  const normalized = normalizeFootballName(sourceTeam.name)
  const candidates = db.prepare(`
    SELECT DISTINCT t.id FROM football_team t
    JOIN football_alias a ON a.entity_kind='team' AND a.entity_id=t.id
    WHERE a.normalized=? AND t.is_national=?
  `).all(normalized, sourceTeam.national ? 1 : 0) as { id: number }[]
  let id: number
  if (candidates.length === 1) id = candidates[0].id
  else {
    const result = db.prepare(`
      INSERT INTO football_team (name,country,is_national) VALUES (?,?,?)
    `).run(sourceTeam.name, sourceTeam.country, sourceTeam.national ? 1 : 0)
    id = Number(result.lastInsertRowid)
    if (candidates.length > 1) {
      db.prepare(`
        INSERT INTO football_conflict
          (entity_kind,entity_id,facet,source_a,value_a,source_b,value_b)
        VALUES ('team',?,'identity',?,?,?,?)
      `).run(id, match.source, sourceTeam.name, 'wikidata', `Ambiguous: ${candidates.map((item) => item.id).join(',')}`)
      status = { ...status, conflicts: status.conflicts + 1 }
    }
  }
  db.prepare(`
    INSERT OR IGNORE INTO football_alias
      (entity_kind,entity_id,source,alias,normalized,external_id)
    VALUES ('team',?,?,?,?,?)
  `).run(id, match.source, sourceTeam.name, normalized, sourceTeam.sourceId)
  db.prepare(`
    INSERT INTO football_source_ref
      (entity_kind,entity_id,source,external_id,source_url,raw_fingerprint,fetched_at)
    VALUES ('team',?,?,?,?,?,datetime('now'))
    ON CONFLICT(entity_kind,source,external_id) DO UPDATE SET
      entity_id=excluded.entity_id, source_url=excluded.source_url,
      raw_fingerprint=excluded.raw_fingerprint, fetched_at=excluded.fetched_at
  `).run(id, match.source, sourceTeam.sourceId, match.sourceUrl, match.rawFingerprint)
  return id
}

function upsertPerson(
  match: SourceMatch,
  teamId: number,
  goal: SourceGoal
): number | null {
  if (!goal.playerName) return null
  const externalId = `${match.seasonKey}:${teamId}:${normalizeFootballName(goal.playerName)}`
  const existing = sourceRefId('person', match.source, externalId)
  if (existing != null) return existing
  const db = getSqlite()
  // Never merge people by a normalized name alone. A new source-scoped row is
  // quarantined if an unrelated canonical person already carries the name.
  const sameNames = db.prepare(`
    SELECT DISTINCT p.id FROM football_person p JOIN football_alias a
      ON a.entity_kind='person' AND a.entity_id=p.id WHERE a.normalized=?
  `).all(normalizeFootballName(goal.playerName)) as { id: number }[]
  const result = db.prepare(`INSERT INTO football_person (name,role) VALUES (?,'player')`).run(
    goal.playerName
  )
  const id = Number(result.lastInsertRowid)
  db.prepare(`
    INSERT INTO football_alias (entity_kind,entity_id,source,alias,normalized,external_id)
    VALUES ('person',?,?,?,?,?)
  `).run(id, match.source, goal.playerName, normalizeFootballName(goal.playerName), externalId)
  db.prepare(`
    INSERT INTO football_source_ref
      (entity_kind,entity_id,source,external_id,source_url,raw_fingerprint,fetched_at)
    VALUES ('person',?,?,?,?,?,datetime('now'))
  `).run(id, match.source, externalId, match.sourceUrl, match.rawFingerprint)
  if (sameNames.length) {
    db.prepare(`
      INSERT INTO football_conflict
        (entity_kind,entity_id,facet,source_a,value_a,source_b,value_b)
      VALUES ('person',?,'identity',?,?,?,?)
    `).run(id, match.source, goal.playerName, 'archive', `Possible matches: ${sameNames.map((item) => item.id).join(',')}`)
    status = { ...status, conflicts: status.conflicts + 1 }
  }
  return id
}

export function writeSlice(slice: SourceSlice, kind: 'history' | 'current' = 'history'): number {
  const db = getSqlite()
  const competition = db.prepare(`SELECT id FROM football_competition WHERE key=?`).get(
    slice.competitionKey
  ) as { id: number } | undefined
  if (!competition) throw new Error(`Unknown Football competition: ${slice.competitionKey}`)
  const startedAt = new Date().toISOString()
  const run = db.prepare(`
    INSERT INTO football_import_run
      (kind,source,competition_key,season_key,state,version,etag,checksum,raw_fingerprint,started_at)
    VALUES (?,?,?,?,?,?,?,?,?,?)
  `).run(
    kind,
    slice.source,
    slice.competitionKey,
    slice.seasonKey,
    'running',
    slice.revision,
    slice.etag ?? null,
    slice.checksum ?? null,
    slice.rawFingerprint ?? null,
    startedAt
  )
  const runId = Number(run.lastInsertRowid)
  const seasonStatus = footballSeasonStatus(slice, kind)
  try {
    const written = db.transaction(() => {
      db.prepare(`
        INSERT INTO football_season
          (competition_id,key,label,status,data_revision,updated_at)
        VALUES (?,?,?,?,?,datetime('now'))
        ON CONFLICT(competition_id,key) DO UPDATE SET
          label=excluded.label, status=excluded.status,
          data_revision=excluded.data_revision, updated_at=excluded.updated_at
      `).run(
        competition.id,
        slice.seasonKey,
        slice.matches[0]?.seasonLabel ?? slice.seasonKey,
        seasonStatus,
        slice.revision
      )
      const season = db.prepare(`
        SELECT id FROM football_season WHERE competition_id=? AND key=?
      `).get(competition.id, slice.seasonKey) as { id: number }
      let count = 0
      const keepMatchIds = new Set<number>()
      for (const match of slice.matches) {
        const homeId = upsertTeam(match, 'home')
        const awayId = upsertTeam(match, 'away')
        let stageId: number | null = null
        if (match.stage) {
          const stageKey = normalizeFootballName(match.stage) || 'stage'
          db.prepare(`
            INSERT INTO football_stage (season_id,key,name,kind)
            VALUES (?,?,?,'knockout') ON CONFLICT(season_id,key) DO UPDATE SET name=excluded.name
          `).run(season.id, stageKey, match.stage)
          stageId = (db.prepare(`
            SELECT id FROM football_stage WHERE season_id=? AND key=?
          `).get(season.id, stageKey) as { id: number }).id
        }
        let matchId = sourceRefId('match', match.source, match.sourceId)
        if (matchId == null) {
          const exact = db.prepare(`
            SELECT id FROM football_match WHERE season_id=? AND match_date=?
              AND home_team_id=? AND away_team_id=?
          `).all(season.id, match.date, homeId, awayId) as { id: number }[]
          if (exact.length === 1) matchId = exact[0].id
        }
        if (matchId == null) {
          const result = db.prepare(`
            INSERT INTO football_match
              (title,season_id,stage_id,home_team_id,away_team_id,match_date,round,status,
               home_score,away_score,home_halftime,away_halftime,home_extra_time,away_extra_time,
               home_penalties,away_penalties,event_coverage)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
          `).run(
            `${match.home.name} vs ${match.away.name}`,
            season.id,
            stageId,
            homeId,
            awayId,
            match.date,
            match.round,
            match.status,
            match.homeScore,
            match.awayScore,
            match.homeHalfTime,
            match.awayHalfTime,
            match.homeExtraTime,
            match.awayExtraTime,
            match.homePenalties,
            match.awayPenalties,
            match.goals == null ? 'not_supplied' : 'complete'
          )
          matchId = Number(result.lastInsertRowid)
        } else {
          db.prepare(`
            UPDATE football_match SET title=?,stage_id=?,home_team_id=?,away_team_id=?,
              match_date=?,round=?,status=?,home_score=?,away_score=?,home_halftime=?,
              away_halftime=?,home_extra_time=?,away_extra_time=?,home_penalties=?,
              away_penalties=?,event_coverage=CASE
                WHEN ?='not_supplied' AND event_coverage='complete' THEN event_coverage ELSE ? END,
              updated_at=datetime('now') WHERE id=?
          `).run(
            `${match.home.name} vs ${match.away.name}`,
            stageId,
            homeId,
            awayId,
            match.date,
            match.round,
            match.status,
            match.homeScore,
            match.awayScore,
            match.homeHalfTime,
            match.awayHalfTime,
            match.homeExtraTime,
            match.awayExtraTime,
            match.homePenalties,
            match.awayPenalties,
            match.goals == null ? 'not_supplied' : 'complete',
            match.goals == null ? 'not_supplied' : 'complete',
            matchId
          )
        }
        db.prepare(`
          INSERT INTO football_source_ref
            (entity_kind,entity_id,source,external_id,source_url,revision,raw_fingerprint,fetched_at)
          VALUES ('match',?,?,?,?,?,?,datetime('now'))
          ON CONFLICT(entity_kind,source,external_id) DO UPDATE SET
            entity_id=excluded.entity_id,source_url=excluded.source_url,
            revision=excluded.revision,raw_fingerprint=excluded.raw_fingerprint,
            fetched_at=excluded.fetched_at
        `).run(
          matchId,
          match.source,
          match.sourceId,
          match.sourceUrl,
          slice.revision,
          match.rawFingerprint
        )
        if (match.goals != null) {
          db.prepare(`DELETE FROM football_event WHERE match_id=? AND type='goal'`).run(matchId)
          const event = db.prepare(`
            INSERT INTO football_event
              (match_id,team_id,person_id,type,minute,extra_minute,own_goal,penalty,sort_order)
            VALUES (?,?,?,'goal',?,?,?,?,?)
          `)
          match.goals.forEach((goal, index) => {
            const teamId = goal.team === 'home' ? homeId : awayId
            event.run(
              matchId,
              teamId,
              upsertPerson(match, teamId, goal),
              goal.minute,
              goal.extraMinute,
              goal.ownGoal ? 1 : 0,
              goal.penalty ? 1 : 0,
              index
            )
          })
        }
        keepMatchIds.add(matchId)
        count++
      }
      if (slice.coverage.results === 'complete') {
        const old = db.prepare(`
          SELECT sr.id AS refId,sr.entity_id AS matchId
          FROM football_source_ref sr JOIN football_match m ON m.id=sr.entity_id
          WHERE sr.entity_kind='match' AND sr.source=? AND m.season_id=?
        `).all(slice.source, season.id) as Array<{ refId: number; matchId: number }>
        for (const item of old) {
          if (keepMatchIds.has(item.matchId)) continue
          db.prepare(`DELETE FROM football_source_ref WHERE id=?`).run(item.refId)
          const retained = db.prepare(`
            SELECT
              EXISTS(SELECT 1 FROM football_source_ref WHERE entity_kind='match' AND entity_id=?) OR
              EXISTS(SELECT 1 FROM football_favorite WHERE entity_kind='match' AND entity_id=?) OR
              EXISTS(SELECT 1 FROM football_match_journal WHERE match_id=?) OR
              EXISTS(SELECT 1 FROM football_media_link WHERE entity_kind='match' AND entity_id=?) OR
              EXISTS(SELECT 1 FROM list_item li JOIN list l ON l.id=li.list_id
                WHERE l.entity_kind='footballMatch' AND li.entity_id=?) AS retained
          `).get(item.matchId, item.matchId, item.matchId, item.matchId, item.matchId) as { retained: number }
          if (!retained.retained) db.prepare(`DELETE FROM football_match WHERE id=?`).run(item.matchId)
        }
      }
      if (['premier-league', 'la-liga', 'serie-a', 'bundesliga'].includes(slice.competitionKey)) {
        const resultRows = db.prepare(`
          SELECT home_team_id AS homeTeamId,away_team_id AS awayTeamId,
            home_score AS homeScore,away_score AS awayScore
          FROM football_match WHERE season_id=? AND status='finished'
            AND home_score IS NOT NULL AND away_score IS NOT NULL
        `).all(season.id) as Array<{
          homeTeamId: number
          awayTeamId: number
          homeScore: number
          awayScore: number
        }>
        const ledger = buildFootballLedger(
          resultRows,
          footballPointsForWin(slice.competitionKey, slice.seasonKey)
        )
        db.prepare(`DELETE FROM football_standing WHERE season_id=? AND rank_official=0`).run(season.id)
        const insertStanding = db.prepare(`
          INSERT INTO football_standing
            (season_id,team_id,rank,rank_official,played,won,drawn,lost,goals_for,
             goals_against,goal_difference,points,deduction,note)
          VALUES (?,?,NULL,0,?,?,?,?,?,?,?,?,0,'Calculated W-D-L ledger; official ordinal rank not assigned')
        `)
        for (const row of ledger) {
          insertStanding.run(
            season.id,
            row.teamId,
            row.played,
            row.won,
            row.drawn,
            row.lost,
            row.goalsFor,
            row.goalsAgainst,
            row.goalDifference,
            row.points
          )
        }
      }
      for (const [facet, state] of Object.entries(slice.coverage)) {
        db.prepare(`
          INSERT INTO football_coverage
            (competition_id,season_id,source,facet,state,item_count,revision,checked_at)
          VALUES (?,?,?,?,?,?,?,datetime('now'))
          ON CONFLICT(competition_id,season_id,source,facet) DO UPDATE SET
            state=excluded.state,item_count=excluded.item_count,revision=excluded.revision,
            checked_at=excluded.checked_at
        `).run(competition.id, season.id, slice.source, facet, state, count, slice.revision)
      }
      return count
    })()
    db.prepare(`
      UPDATE football_import_run SET state='done',item_count=?,finished_at=datetime('now') WHERE id=?
    `).run(written, runId)
    return written
  } catch (error) {
    db.prepare(`
      UPDATE football_import_run SET state='error',message=?,finished_at=datetime('now') WHERE id=?
    `).run(error instanceof Error ? error.message : String(error), runId)
    throw error
  }
}

async function installEngsoccer(runGate: PauseGate): Promise<void> {
  for (const spec of ENGSOCER_FILES) {
    await checkpoint(runGate)
    const url = `https://raw.githubusercontent.com/jalapic/engsoccerdata/master/data-raw/${spec.file}`
    const data = await downloadText(url, 'engsoccerdata', runGate.signal)
    status = { ...status, phase: 'validating', competitionKey: spec.competitionKey }
    const matches = parseEngsoccerCsv({
      text: data.text,
      competitionKey: spec.competitionKey,
      sourceUrl: url,
      fingerprint: data.checksum,
      tierOneOnly: spec.tierOneOnly
    })
    const slices = groupSlices(matches)
    for (const slice of slices) {
      slice.etag = data.etag
      slice.checksum = data.checksum
    }
    status = { ...status, total: status.total + slices.length }
    for (const slice of slices) {
      await checkpoint(runGate)
      status = {
        ...status,
        phase: 'writing',
        competitionKey: slice.competitionKey,
        message: `${slice.competitionKey} ${slice.seasonKey}`
      }
      const imported = writeSlice(slice)
      status = {
        ...status,
        done: status.done + 1,
        imported: status.imported + imported
      }
    }
  }
}

export function uefaCompetitionForPath(path: string): FootballCompetitionKey | null {
  const lower = path.toLocaleLowerCase('en')
  if (/conference|uefa\.3|\/cl3|(^|\/)confq?\.(?:txt|fbtxt)$/.test(lower)) {
    return 'conference-league'
  }
  if (/europa|uefa[-_.]?cup|uefa\.2|(^|\/)elq?\.(?:txt|fbtxt)$/.test(lower)) {
    return 'europa-league'
  }
  if (/champ|uefa\.1|(^|\/)clq?\.(?:txt|fbtxt)$/.test(lower)) {
    return 'champions-league'
  }
  return null
}

async function installOpenFootball(runGate: PauseGate): Promise<void> {
  await checkpoint(runGate)
  const data = await downloadBuffer(OPENFOOTBALL_ARCHIVE, 'openfootball', runGate.signal)
  const zip = new AdmZip(data.buffer)
  const entries = zip.getEntries().filter((entry) =>
    !entry.isDirectory && /\.(txt|fbtxt)$/i.test(entry.entryName) && /\d{4}[-/]\d{2,4}/.test(entry.entryName)
  )
  const all: SourceMatch[] = []
  for (const entry of entries) {
    await checkpoint(runGate)
    const competitionKey = uefaCompetitionForPath(entry.entryName)
    const season = entry.entryName.match(/(\d{4}[-/]\d{2,4})/)?.[1]?.replace('/', '-')
    if (!competitionKey || !season) continue
    const text = entry.getData().toString('utf8')
    all.push(...parseOpenFootballTxt({
      text,
      competitionKey,
      seasonKey: season,
      sourceUrl: `https://github.com/openfootball/champions-league/blob/master/${entry.entryName.replace(/^[^/]+\//, '')}`,
      fingerprint: `${data.checksum}:${entry.header.crc}`
    }))
  }
  const slices = groupSlices(all)
  for (const slice of slices) {
    slice.etag = data.etag
    slice.checksum = data.checksum
  }
  status = { ...status, total: status.total + slices.length }
  for (const slice of slices) {
    await checkpoint(runGate)
    status = {
      ...status,
      phase: 'writing',
      competitionKey: slice.competitionKey,
      message: `${slice.competitionKey} ${slice.seasonKey}`
    }
    const imported = writeSlice(slice)
    status = { ...status, done: status.done + 1, imported: status.imported + imported }
  }
}

async function installInternational(runGate: PauseGate): Promise<void> {
  await checkpoint(runGate)
  const resultsUrl = `${INTERNATIONAL_BASE}/results.csv`
  const scorersUrl = `${INTERNATIONAL_BASE}/goalscorers.csv`
  const [resultsData, scorersData] = await Promise.all([
    downloadText(resultsUrl, 'international_results', runGate.signal),
    downloadText(scorersUrl, 'international_results', runGate.signal)
  ])
  const results = parseInternationalResultsCsv(resultsData.text)
  const scorers = parseInternationalScorersCsv(scorersData.text)
  const joined = attachInternationalScorers(results, scorers)
  const matches: SourceMatch[] = []
  results.forEach((match, index) => {
    const competitionKey: FootballCompetitionKey | null =
      match.tournament === 'FIFA World Cup'
        ? 'world-cup'
        : !/qualif/i.test(match.tournament) &&
            /UEFA Euro|UEFA European Championship/i.test(match.tournament)
          ? 'euros'
          : null
    if (!competitionKey) return
    const goals = joined.get(index)
    matches.push({
      sourceId: `${match.date}:${normalizeFootballName(match.home)}:${normalizeFootballName(match.away)}`,
      competitionKey,
      seasonKey: match.date.slice(0, 4),
      seasonLabel: match.date.slice(0, 4),
      date: match.date,
      home: { sourceId: normalizeFootballName(match.home), name: match.home, country: null, national: true },
      away: { sourceId: normalizeFootballName(match.away), name: match.away, country: null, national: true },
      stage: null,
      round: null,
      status: 'finished',
      homeScore: match.homeScore,
      awayScore: match.awayScore,
      homeHalfTime: null,
      awayHalfTime: null,
      homeExtraTime: null,
      awayExtraTime: null,
      homePenalties: null,
      awayPenalties: null,
      goals: goals == null
        ? null
        : goals.map((goal) => ({
            team: normalizeFootballName(goal.team) === normalizeFootballName(match.home) ? 'home' : 'away',
            playerName: goal.scorer,
            minute: goal.minute,
            extraMinute: goal.extraMinute,
            ownGoal: goal.ownGoal,
            penalty: goal.penalty
          })),
      source: 'international_results',
      sourceUrl: resultsUrl,
      rawFingerprint: `${resultsData.checksum}:${index}`
    })
  })
  const slices = groupSlices(matches)
  for (const slice of slices) {
    slice.checksum = `${resultsData.checksum}:${scorersData.checksum}`
    slice.etag = [resultsData.etag, scorersData.etag].filter(Boolean).join(' / ') || null
  }
  status = { ...status, total: status.total + slices.length }
  for (const slice of slices) {
    await checkpoint(runGate)
    status = {
      ...status,
      phase: 'writing',
      competitionKey: slice.competitionKey,
      message: `${slice.competitionKey} ${slice.seasonKey}`
    }
    const imported = writeSlice(slice)
    status = { ...status, done: status.done + 1, imported: status.imported + imported }
  }
}

async function installWikimedia(runGate: PauseGate): Promise<void> {
  status = { ...status, total: status.total + FOOTBALL_WIKIMEDIA_MANIFEST.length }
  for (const entry of FOOTBALL_WIKIMEDIA_MANIFEST) {
    await checkpoint(runGate)
    status = {
      ...status,
      source: 'wikimedia',
      competitionKey: entry.competitionKey,
      phase: 'downloading',
      requests: status.requests + 1,
      message: `Reading ${entry.page}`
    }
    const snapshot = await fetchWikimediaSnapshot(entry, runGate.signal)
    await checkpoint(runGate)
    status = { ...status, phase: 'writing' }
    const checksum = createHash('sha256').update(JSON.stringify(snapshot)).digest('hex')
    const startedAt = new Date().toISOString()
    const run = getSqlite().prepare(`
      INSERT INTO football_import_run
        (kind,source,competition_key,state,version,checksum,raw_fingerprint,started_at)
      VALUES ('history','wikimedia',?,'running',?,?,?,?)
    `).run(entry.competitionKey, snapshot.revision, checksum, checksum, startedAt)
    const runId = Number(run.lastInsertRowid)
    let imported: number
    try {
      imported = saveWikimediaSnapshot(entry.competitionKey, snapshot)
      getSqlite().prepare(`
        UPDATE football_import_run SET state='done',item_count=?,finished_at=datetime('now') WHERE id=?
      `).run(imported, runId)
    } catch (error) {
      getSqlite().prepare(`
        UPDATE football_import_run SET state='error',message=?,finished_at=datetime('now') WHERE id=?
      `).run(error instanceof Error ? error.message : String(error), runId)
      throw error
    }
    status = { ...status, done: status.done + 1, imported: status.imported + imported }
  }
}

async function enrichOne(
  runGate: PauseGate,
  kind: 'team' | 'person',
  entityId: number,
  quizPack: boolean
): Promise<boolean> {
  await checkpoint(runGate)
  const table = kind === 'person' ? 'football_person' : 'football_team'
  const row = getSqlite().prepare(`SELECT name${kind === 'person' ? ', role' : ''} FROM ${table} WHERE id=?`).get(entityId) as {
    name: string
    role?: 'player' | 'manager' | 'both'
  } | undefined
  if (!row) throw new Error(`Football ${kind} not found`)
  status = {
    ...status,
    source: 'wikimedia',
    phase: 'downloading',
    requests: status.requests + 1,
    message: `${quizPack ? 'Player Quiz Pack' : 'Enriching'}: ${row.name}`
  }
  try {
    const payload = await fetchEntityEnrichment(
      kind,
      row.name,
      runGate.signal,
      quizPack,
      row.role
    )
    await checkpoint(runGate)
    status = { ...status, phase: 'writing' }
    const saved = saveEntityEnrichment(kind, entityId, payload, quizPack)
    if (!saved) status = { ...status, conflicts: status.conflicts + 1 }
    return saved
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    noteEnrichmentConflict(kind, entityId, row.name, message)
    status = { ...status, conflicts: status.conflicts + 1 }
    if (!quizPack) return false
    logWarn('football', `player pack skipped ${row.name}: ${message}`)
    return false
  }
}

async function installPlayerQuizPack(runGate: PauseGate): Promise<void> {
  const rows = getSqlite().prepare(`
    SELECT p.id,
      (SELECT COUNT(*) FROM football_event e WHERE e.person_id=p.id) +
      (SELECT COUNT(*) FROM football_lineup l WHERE l.person_id=p.id) AS connectivity
    FROM football_person p
    WHERE p.role IN ('player','both') AND p.quiz_pack=0
      AND NOT EXISTS(SELECT 1 FROM football_conflict c
        WHERE c.entity_kind='person' AND c.entity_id=p.id AND c.status='open')
    ORDER BY connectivity DESC,p.id LIMIT 250
  `).all() as Array<{ id: number; connectivity: number }>
  status = { ...status, total: rows.length }
  for (const row of rows) {
    await checkpoint(runGate)
    const saved = await enrichOne(runGate, 'person', row.id, true)
    status = {
      ...status,
      done: status.done + 1,
      imported: status.imported + (saved ? 1 : 0)
    }
  }
}

function apiKey(): string {
  const key = getSetting('football.api_key')?.trim()
  if (!key) throw new Error('Add an API-Football key in Settings first')
  return key
}

function currentSeasonFor(key: FootballCompetitionKey): number {
  const year = new Date().getUTCFullYear()
  if (key === 'world-cup') return year - ((year - 2022) % 4 + 4) % 4
  if (key === 'euros') return year - ((year - 2024) % 4 + 4) % 4
  return new Date().getUTCMonth() < 6 ? year - 1 : year
}

function readQuota(): { date: string; used: number; backlog: number } {
  const date = new Date().toISOString().slice(0, 10)
  const row = getSqlite().prepare(`SELECT value FROM settings WHERE key='football.api_quota'`).get() as
    | { value: string }
    | undefined
  try {
    const parsed = row ? JSON.parse(row.value) : {}
    return {
      date,
      used: parsed.date === date ? Math.max(0, Number(parsed.used) || 0) : 0,
      backlog: Math.max(0, Number(parsed.backlog) || 0)
    }
  } catch {
    return { date, used: 0, backlog: 0 }
  }
}

function writeQuota(value: { date: string; used: number; backlog: number }): void {
  getSqlite().prepare(`
    INSERT INTO settings (key,value) VALUES ('football.api_quota',?)
    ON CONFLICT(key) DO UPDATE SET value=excluded.value
  `).run(JSON.stringify(value))
}

async function apiJson(path: string, key: string, runGate: PauseGate): Promise<any> {
  await checkpoint(runGate)
  const quota = readQuota()
  if (quota.used >= 100) {
    writeQuota({ ...quota, backlog: quota.backlog + 1 })
    status = { ...status, phase: 'quota', message: 'Daily API-Football quota reached; work is queued' }
    throw new Error('API-Football daily quota reached. Refresh again after the quota resets.')
  }
  const response = await fetchWithRetry(`${API_BASE}${path}`, {
    headers: { 'x-apisports-key': key },
    timeoutMs: 45_000,
    taskSignal: runGate.signal,
    rateLimitWaits: 0
  })
  writeQuota({ ...quota, used: quota.used + 1 })
  status = { ...status, requests: status.requests + 1 }
  if (!response.ok) throw new Error(`API-Football returned HTTP ${response.status}`)
  const json = await response.json() as any
  if (json.errors && Object.keys(json.errors).length) {
    throw new Error(`API-Football: ${Object.values(json.errors).join(', ')}`)
  }
  return json
}

function saveEntitlement(entitlement: FootballEntitlement): void {
  getSqlite().prepare(`
    INSERT INTO settings (key,value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value
  `).run(`football.entitlement.${entitlement.competitionKey}`, JSON.stringify(entitlement))
}

async function refreshCurrent(runGate: PauseGate, requested?: FootballCompetitionKey[]): Promise<void> {
  const key = apiKey()
  const keys = requested?.length ? requested : FOOTBALL_COMPETITIONS.map((item) => item.key)
  status = { ...status, total: keys.length }
  let pendingDetails = 0
  for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
    const competitionKey = keys[keyIndex]
    await checkpoint(runGate)
    if (readQuota().used >= 100) {
      pendingDetails += keys.length - keyIndex
      status = { ...status, phase: 'quota', message: 'Daily API-Football quota reached; remaining competitions are queued' }
      break
    }
    const leagueId = API_LEAGUES[competitionKey]
    const season = currentSeasonFor(competitionKey)
    status = {
      ...status,
      competitionKey,
      source: 'api-football',
      phase: 'downloading',
      message: `Checking ${competitionKey} ${season}`
    }
    const league = await apiJson(`/leagues?id=${leagueId}&season=${season}`, key, runGate)
    const coverage = league.response?.[0]?.seasons?.find((item: any) => Number(item.year) === season)?.coverage
    const entitlement: FootballEntitlement = {
      competitionKey,
      season: String(season),
      entitled: Array.isArray(league.response) && league.response.length > 0,
      fixtures: !!coverage?.fixtures?.events || !!coverage?.fixtures?.statistics_fixtures,
      standings: !!coverage?.standings,
      events: !!coverage?.fixtures?.events,
      lineups: !!coverage?.fixtures?.lineups,
      topScorers: !!coverage?.top_scorers,
      message: coverage ? null : 'This season is not available to the configured API plan.',
      checkedAt: new Date().toISOString()
    }
    saveEntitlement(entitlement)
    if (!entitlement.entitled) {
      status = { ...status, done: status.done + 1 }
      continue
    }
    if (readQuota().used >= 100) {
      pendingDetails += keys.length - keyIndex
      status = { ...status, phase: 'quota', message: 'Fixture snapshots are queued for the next quota window' }
      break
    }
    const fixtures = await apiJson(`/fixtures?league=${leagueId}&season=${season}`, key, runGate)
    const matches: SourceMatch[] = (fixtures.response ?? []).map((item: unknown) =>
      parseApiFootballFixture(item, competitionKey)
    )
    const slices = groupSlices(matches)
    for (const slice of slices) {
      slice.coverage.events = entitlement.events ? 'partial' : 'not_supplied'
      slice.coverage.lineups = entitlement.lineups ? 'partial' : 'not_supplied'
      status = { ...status, phase: 'writing' }
      status = { ...status, imported: status.imported + writeSlice(slice, 'current') }
    }
    // Standings and top scorers are fetched once per entitled competition.
    // Their provider payload is retained as source assertions; no facts are
    // inferred from a locally calculated table when official ranks are absent.
    if (entitlement.standings && readQuota().used < 100) {
      const standings = await apiJson(`/standings?league=${leagueId}&season=${season}`, key, runGate)
      saveApiStandings(
        competitionKey,
        footballSeasonKey(String(season), competitionKey),
        standings.response ?? []
      )
    } else if (entitlement.standings) pendingDetails++
    if (entitlement.topScorers && readQuota().used < 100) {
      const scorers = await apiJson(`/players/topscorers?league=${leagueId}&season=${season}`, key, runGate)
      saveApiTopScorers(
        competitionKey,
        footballSeasonKey(String(season), competitionKey),
        scorers.response ?? []
      )
    } else if (entitlement.topScorers) pendingDetails++
    const detailCandidates = matches.filter((match) => match.status === 'finished')
    for (let detailIndex = 0; detailIndex < detailCandidates.length; detailIndex++) {
      const match = detailCandidates[detailIndex]
      const canonicalId = sourceRefId('match', 'api-football', match.sourceId)
      const stored = canonicalId == null
        ? null
        : getSqlite().prepare(`
            SELECT event_coverage,
              EXISTS(SELECT 1 FROM football_lineup WHERE match_id=football_match.id) AS has_lineups
            FROM football_match WHERE id=?
          `).get(canonicalId) as { event_coverage: string; has_lineups: number } | undefined
      const needEvents = entitlement.events && stored?.event_coverage !== 'complete'
      const needLineups = entitlement.lineups && !stored?.has_lineups
      const required = Number(needEvents) + Number(needLineups)
      if (!required) continue
      if (100 - readQuota().used < required) {
        pendingDetails += detailCandidates.length - detailIndex
        status = { ...status, phase: 'quota', message: 'Fixture details are queued for the next quota window' }
        break
      }
      status = { ...status, phase: 'downloading', message: `Fixture detail ${match.sourceId}` }
      const events = needEvents
        ? await apiJson(`/fixtures/events?fixture=${encodeURIComponent(match.sourceId)}`, key, runGate)
        : null
      const lineups = needLineups
        ? await apiJson(`/fixtures/lineups?fixture=${encodeURIComponent(match.sourceId)}`, key, runGate)
        : null
      saveApiFixtureDetails(match, events?.response ?? null, lineups?.response ?? null)
    }
    status = { ...status, done: status.done + 1 }
  }
  const quota = readQuota()
  writeQuota({ ...quota, backlog: pendingDetails })
}

function seasonIdentity(competitionKey: FootballCompetitionKey, seasonKey: string): {
  competitionId: number
  seasonId: number
} | null {
  return (getSqlite().prepare(`
    SELECT c.id AS competitionId,s.id AS seasonId FROM football_competition c
    JOIN football_season s ON s.competition_id=c.id WHERE c.key=? AND s.key=?
  `).get(competitionKey, seasonKey) as { competitionId: number; seasonId: number } | undefined) ?? null
}

function apiTeamId(sourceId: string, name: string): number {
  const existing = sourceRefId('team', 'api-football', sourceId)
  if (existing != null) return existing
  const db = getSqlite()
  const candidates = db.prepare(`
    SELECT DISTINCT entity_id AS id FROM football_alias WHERE entity_kind='team' AND normalized=?
  `).all(normalizeFootballName(name)) as { id: number }[]
  const id = candidates.length === 1
    ? candidates[0].id
    : Number(db.prepare(`INSERT INTO football_team (name) VALUES (?)`).run(name).lastInsertRowid)
  db.prepare(`
    INSERT OR IGNORE INTO football_alias
      (entity_kind,entity_id,source,alias,normalized,external_id)
    VALUES ('team',?,'api-football',?,?,?)
  `).run(id, name, normalizeFootballName(name), sourceId)
  db.prepare(`
    INSERT INTO football_source_ref (entity_kind,entity_id,source,external_id,fetched_at)
    VALUES ('team',?,'api-football',?,datetime('now'))
  `).run(id, sourceId)
  return id
}

function mergePersonRole(personId: number, role: 'player' | 'manager'): void {
  const db = getSqlite()
  const row = db.prepare(`SELECT role FROM football_person WHERE id=?`).get(personId) as {
    role: 'player' | 'manager' | 'both'
  } | undefined
  if (row && row.role !== role && row.role !== 'both') {
    db.prepare(`UPDATE football_person SET role='both',updated_at=datetime('now') WHERE id=?`).run(personId)
  }
}

function apiPersonId(sourceId: string, name: string, role: 'player' | 'manager' = 'player'): number {
  const existing = sourceRefId('person', 'api-football', sourceId)
  if (existing != null) {
    mergePersonRole(existing, role)
    return existing
  }
  const db = getSqlite()
  const id = Number(db.prepare(`INSERT INTO football_person (name,role) VALUES (?,?)`).run(name, role).lastInsertRowid)
  db.prepare(`
    INSERT OR IGNORE INTO football_alias
      (entity_kind,entity_id,source,alias,normalized,external_id)
    VALUES ('person',?,'api-football',?,?,?)
  `).run(id, name, normalizeFootballName(name), sourceId)
  db.prepare(`
    INSERT INTO football_source_ref (entity_kind,entity_id,source,external_id,fetched_at)
    VALUES ('person',?,'api-football',?,datetime('now'))
  `).run(id, sourceId)
  return id
}

export function saveApiFixtureDetails(
  match: SourceMatch,
  eventPayload: unknown[] | null,
  lineupPayload: unknown[] | null
): void {
  const matchId = sourceRefId('match', 'api-football', match.sourceId)
  if (matchId == null) return
  const homeId = sourceRefId('team', 'api-football', match.home.sourceId)
  const awayId = sourceRefId('team', 'api-football', match.away.sourceId)
  if (homeId == null || awayId == null) return
  const db = getSqlite()
  db.transaction(() => {
    if (eventPayload != null) {
      const goals = parseApiFootballEvents(eventPayload, match.home.sourceId)
      db.prepare(`DELETE FROM football_event WHERE match_id=? AND type='goal'`).run(matchId)
      const insert = db.prepare(`
        INSERT INTO football_event
          (match_id,team_id,person_id,type,detail,minute,extra_minute,own_goal,penalty,sort_order)
        VALUES (?,?,?,'goal',?,?,?,?,?,?)
      `)
      goals.forEach((goal, index) => {
        const personId = goal.playerSourceId && goal.playerName
          ? apiPersonId(goal.playerSourceId, goal.playerName)
          : null
        insert.run(
          matchId,
          goal.team === 'home' ? homeId : awayId,
          personId,
          goal.ownGoal ? 'Own goal' : goal.penalty ? 'Penalty' : null,
          goal.minute,
          goal.extraMinute,
          goal.ownGoal ? 1 : 0,
          goal.penalty ? 1 : 0,
          index
        )
      })
      db.prepare(`UPDATE football_match SET event_coverage='complete',updated_at=datetime('now') WHERE id=?`).run(matchId)
    }
    if (lineupPayload != null) {
      const lineups = parseApiFootballLineups(lineupPayload)
      const suppliedTeams = new Set(lineups.map((item) => item.teamSourceId))
      const complete =
        suppliedTeams.has(match.home.sourceId) &&
        suppliedTeams.has(match.away.sourceId) &&
        lineups.some((item) =>
          item.role === 'player' && item.teamSourceId === match.home.sourceId
        ) &&
        lineups.some((item) =>
          item.role === 'player' && item.teamSourceId === match.away.sourceId
        )
      if (!complete) return
      db.prepare(`DELETE FROM football_lineup WHERE match_id=?`).run(matchId)
      const insert = db.prepare(`
        INSERT INTO football_lineup
          (match_id,team_id,person_id,role,starter,shirt,position,captain,sort_order)
        VALUES (?,?,?,?,?,?,?,?,?)
      `)
      const tenure = db.prepare(`
        INSERT INTO football_tenure (person_id,team_id,role,verified,complete)
        SELECT ?,?,'manager',1,0
        WHERE NOT EXISTS (
          SELECT 1 FROM football_tenure
          WHERE person_id=? AND team_id=? AND role='manager' AND end_date IS NULL
        )
      `)
      for (const item of lineups) {
        const teamId = sourceRefId('team', 'api-football', item.teamSourceId)
        if (teamId == null) continue
        const personId = apiPersonId(item.personSourceId, item.playerName, item.role)
        insert.run(
          matchId,
          teamId,
          personId,
          item.role,
          item.starter ? 1 : 0,
          item.shirt,
          item.position,
          item.captain ? 1 : 0,
          item.sortOrder
        )
        if (item.role === 'manager') tenure.run(personId, teamId, personId, teamId)
      }
      db.prepare(`
        UPDATE football_match SET lineup_coverage='complete',updated_at=datetime('now') WHERE id=?
      `).run(matchId)
    }
  })()
}

function deepPersonId(
  source: 'statsbomb' | 'wyscout',
  sourceId: string,
  name: string,
  role: 'player' | 'manager' = 'player'
): number {
  const existing = sourceRefId('person', source, sourceId)
  if (existing != null) {
    mergePersonRole(existing, role)
    return existing
  }
  const db = getSqlite()
  const normalized = normalizeFootballName(name)
  const possible = db.prepare(`
    SELECT DISTINCT p.id FROM football_person p
    JOIN football_alias a ON a.entity_kind='person' AND a.entity_id=p.id
    WHERE a.normalized=?
  `).all(normalized) as Array<{ id: number }>
  const id = Number(db.prepare(`
    INSERT INTO football_person (name,role) VALUES (?,?)
  `).run(name, role).lastInsertRowid)
  db.prepare(`
    INSERT INTO football_alias (entity_kind,entity_id,source,alias,normalized,external_id)
    VALUES ('person',?,?,?,?,?)
  `).run(id, source, name, normalized, sourceId)
  db.prepare(`
    INSERT INTO football_source_ref (entity_kind,entity_id,source,external_id,fetched_at)
    VALUES ('person',?,?,?,datetime('now'))
  `).run(id, source, sourceId)
  if (possible.length) {
    db.prepare(`
      INSERT INTO football_conflict
        (entity_kind,entity_id,facet,source_a,value_a,source_b,value_b)
      VALUES ('person',?,'identity',?,?,?,?)
    `).run(id, source, name, 'archive', `Possible matches: ${possible.map((item) => item.id).join(',')}`)
    status = { ...status, conflicts: status.conflicts + 1 }
  }
  return id
}

function saveOverlayFixtureDetails(
  source: 'statsbomb' | 'wyscout',
  match: SourceMatch,
  goals: SourceGoal[],
  lineups: ReturnType<typeof parseStatsBombLineups>
): void {
  const matchId = sourceRefId('match', source, match.sourceId)
  const homeId = sourceRefId('team', source, match.home.sourceId)
  const awayId = sourceRefId('team', source, match.away.sourceId)
  if (matchId == null || homeId == null || awayId == null) return
  const db = getSqlite()
  db.transaction(() => {
    db.prepare(`DELETE FROM football_event WHERE match_id=? AND type='goal'`).run(matchId)
    const eventInsert = db.prepare(`
      INSERT INTO football_event
        (match_id,team_id,person_id,type,detail,minute,extra_minute,own_goal,penalty,sort_order)
      VALUES (?,?,?,'goal',?,?,?,?,?,?)
    `)
    goals.forEach((goal, index) => {
      const personId = goal.playerName
        ? deepPersonId(
            source,
            goal.playerSourceId ?? `${match.sourceId}:goal:${normalizeFootballName(goal.playerName)}`,
            goal.playerName
          )
        : null
      eventInsert.run(
        matchId,
        goal.team === 'home' ? homeId : awayId,
        personId,
        goal.ownGoal ? 'Own goal' : goal.penalty ? 'Penalty' : null,
        goal.minute,
        goal.extraMinute,
        goal.ownGoal ? 1 : 0,
        goal.penalty ? 1 : 0,
        index
      )
    })
    db.prepare(`DELETE FROM football_lineup WHERE match_id=?`).run(matchId)
    const lineupInsert = db.prepare(`
      INSERT INTO football_lineup
        (match_id,team_id,person_id,role,starter,shirt,position,captain,sort_order)
      VALUES (?,?,?,?,?,?,?,?,?)
    `)
    for (const item of lineups) {
      const teamId = sourceRefId('team', source, item.teamSourceId)
      if (teamId == null) continue
      lineupInsert.run(
        matchId,
        teamId,
        deepPersonId(source, item.personSourceId, item.playerName, item.role),
        item.role,
        item.starter ? 1 : 0,
        item.shirt,
        item.position,
        item.captain ? 1 : 0,
        item.sortOrder
      )
    }
    db.prepare(`
      UPDATE football_match SET event_coverage='complete',lineup_coverage='complete',
        updated_at=datetime('now') WHERE id=?
    `).run(matchId)
  })()
}

function completeOverlayCoverage(
  source: 'statsbomb' | 'wyscout',
  competitionKey: FootballCompetitionKey,
  seasonKey: string,
  revision: string,
  matchCount: number
): void {
  const identity = seasonIdentity(competitionKey, seasonKey)
  if (!identity) return
  const insert = getSqlite().prepare(`
    INSERT INTO football_coverage
      (competition_id,season_id,source,facet,state,item_count,revision,checked_at)
    VALUES (?,?,?,?, 'complete',?,?,datetime('now'))
    ON CONFLICT(competition_id,season_id,source,facet) DO UPDATE SET
      state='complete',item_count=excluded.item_count,note=NULL,revision=excluded.revision,
      checked_at=excluded.checked_at
  `)
  insert.run(identity.competitionId, identity.seasonId, source, 'scorers', matchCount, revision)
  insert.run(identity.competitionId, identity.seasonId, source, 'lineups', matchCount, revision)
}

function markOverlayCoveragePending(
  source: 'statsbomb' | 'wyscout',
  competitionKey: FootballCompetitionKey,
  seasonKey: string,
  revision: string | null,
  matchCount: number
): void {
  const identity = seasonIdentity(competitionKey, seasonKey)
  if (!identity) return
  const insert = getSqlite().prepare(`
    INSERT INTO football_coverage
      (competition_id,season_id,source,facet,state,item_count,note,revision,checked_at)
    VALUES (?,?,?,?,'partial',?,'Deep-pack detail refresh is incomplete',?,datetime('now'))
    ON CONFLICT(competition_id,season_id,source,facet) DO UPDATE SET
      state=CASE WHEN football_coverage.state='complete' THEN 'complete' ELSE 'partial' END,
      item_count=CASE WHEN football_coverage.state='complete'
        THEN football_coverage.item_count ELSE excluded.item_count END,
      note=CASE WHEN football_coverage.state='complete'
        THEN 'Latest deep-pack refresh is incomplete; retained the last complete slice'
        ELSE excluded.note END,
      revision=CASE WHEN football_coverage.state='complete'
        THEN football_coverage.revision ELSE excluded.revision END,
      checked_at=excluded.checked_at
  `)
  insert.run(identity.competitionId, identity.seasonId, source, 'scorers', matchCount, revision)
  insert.run(identity.competitionId, identity.seasonId, source, 'lineups', matchCount, revision)
}

export function writeOverlayResultSlice(slice: SourceSlice): number {
  if (slice.source !== 'statsbomb' && slice.source !== 'wyscout') {
    throw new Error('Overlay result slices must use StatsBomb or Wyscout')
  }
  const imported = writeSlice({
    ...slice,
    coverage: { results: slice.coverage.results ?? 'complete' }
  })
  markOverlayCoveragePending(
    slice.source,
    slice.competitionKey,
    slice.seasonKey,
    slice.revision,
    slice.matches.length
  )
  return imported
}

function archiveSeasonKey(value: string): string {
  const match = value.trim().match(/^(\d{4})(?:[-/](\d{2}|\d{4}))?$/)
  if (!match) return value.trim()
  return match[2] ? `${match[1]}/${match[2].slice(-2)}` : match[1]
}

function statsBombCompetitionKey(name: string): FootballCompetitionKey | null {
  const normalized = name.toLocaleLowerCase('en')
  if (/premier league|england.*first division/.test(normalized)) return 'premier-league'
  if (/la liga|spanish.*first division/.test(normalized)) return 'la-liga'
  if (/serie a|italian.*first division/.test(normalized)) return 'serie-a'
  if (/bundesliga/.test(normalized)) return 'bundesliga'
  if (/champions league|european cup/.test(normalized)) return 'champions-league'
  if (/europa league|uefa cup/.test(normalized)) return 'europa-league'
  if (/conference league/.test(normalized)) return 'conference-league'
  if (/world cup/.test(normalized)) return 'world-cup'
  if (/euro/.test(normalized)) return 'euros'
  return null
}

async function installStatsBomb(
  runGate: PauseGate,
  requested?: FootballCompetitionKey[],
  requestedSeason?: string
): Promise<void> {
  const manifestUrl = `${STATSBOMB_BASE}/competitions.json`
  const manifest = await downloadText(manifestUrl, 'statsbomb', runGate.signal)
  const seasons = parseStatsBombCompetitionSeasons(JSON.parse(manifest.text))
    .filter((item) => !item.gender || item.gender === 'male')
  const keys = requested?.length ? requested : ['premier-league'] as FootballCompetitionKey[]
  const selections = keys.map((competitionKey) => {
    const candidates = seasons
      .filter((item) => statsBombCompetitionKey(item.competitionName) === competitionKey)
      .filter((item) => !requestedSeason || archiveSeasonKey(item.seasonName) === archiveSeasonKey(requestedSeason))
      .sort((a, b) => b.seasonName.localeCompare(a.seasonName, 'en', { numeric: true }))
    if (!candidates.length) {
      throw new Error(`StatsBomb does not supply the selected ${competitionKey}${requestedSeason ? ` ${requestedSeason}` : ''} season.`)
    }
    return { competitionKey, item: candidates[0] }
  })
  for (const selection of selections) {
    await checkpoint(runGate)
    const { competitionKey, item } = selection
    const seasonKey = archiveSeasonKey(item.seasonName)
    const matchesUrl = `${STATSBOMB_BASE}/matches/${item.competitionId}/${item.seasonId}.json`
    const matchData = await downloadText(matchesUrl, 'statsbomb', runGate.signal)
    const matches = parseStatsBombMatches({
      raw: JSON.parse(matchData.text),
      competitionKey,
      seasonKey,
      sourceUrl: matchesUrl,
      fingerprint: matchData.checksum
    })
    const slices = groupSlices(matches)
    status = { ...status, total: status.total + slices.length + matches.length }
    for (const slice of slices) {
      slice.etag = matchData.etag
      slice.checksum = matchData.checksum
      status = { ...status, phase: 'writing', competitionKey, message: `${competitionKey} ${seasonKey} results` }
      const imported = writeOverlayResultSlice(slice)
      status = { ...status, done: status.done + 1, imported: status.imported + imported }
    }
    for (const match of matches) {
      await checkpoint(runGate)
      status = { ...status, phase: 'downloading', competitionKey, message: `StatsBomb match ${match.sourceId}` }
      const [eventsData, lineupsData] = await Promise.all([
        downloadText(`${STATSBOMB_BASE}/events/${match.sourceId}.json`, 'statsbomb', runGate.signal),
        downloadText(`${STATSBOMB_BASE}/lineups/${match.sourceId}.json`, 'statsbomb', runGate.signal)
      ])
      saveOverlayFixtureDetails(
        'statsbomb',
        match,
        parseStatsBombEvents(JSON.parse(eventsData.text), match.home.sourceId),
        parseStatsBombLineups(JSON.parse(lineupsData.text))
      )
      status = { ...status, done: status.done + 1 }
    }
    completeOverlayCoverage('statsbomb', competitionKey, seasonKey, matchData.checksum, matches.length)
  }
}

function zipJson(zip: AdmZip, pattern: RegExp): unknown {
  const entry = zip.getEntries().find((candidate) => !candidate.isDirectory && pattern.test(candidate.entryName))
  if (!entry) throw new Error(`Wyscout archive entry not found: ${pattern.source}`)
  const buffer = entry.getData()
  assertBoundedArchive(buffer.length, FOOTBALL_DEEP_ARCHIVE_LIMIT)
  return JSON.parse(buffer.toString('utf8'))
}

async function installWyscout(
  runGate: PauseGate,
  requested?: FootballCompetitionKey[],
  requestedSeason?: string
): Promise<void> {
  const keys = requested?.length ? requested : ['premier-league'] as FootballCompetitionKey[]
  for (const competitionKey of keys) {
    const spec = WYSCOUT_PACKS[competitionKey]
    if (!spec) throw new Error(`Wyscout does not supply a public ${competitionKey} pack.`)
    if (requestedSeason && archiveSeasonKey(requestedSeason) !== spec.seasonKey) {
      throw new Error(`Wyscout supplies ${competitionKey} only for ${spec.seasonKey}.`)
    }
  }
  await checkpoint(runGate)
  const [matchesData, eventsData, playersData, teamsData] = await Promise.all([
    downloadBuffer(`${WYSCOUT_BASE}/14464622`, 'wyscout', runGate.signal),
    downloadBuffer(`${WYSCOUT_BASE}/14464685`, 'wyscout', runGate.signal, FOOTBALL_DEEP_ARCHIVE_LIMIT),
    downloadText(`${WYSCOUT_BASE}/15073721`, 'wyscout', runGate.signal),
    downloadText(`${WYSCOUT_BASE}/15073697`, 'wyscout', runGate.signal)
  ])
  const matchesZip = new AdmZip(matchesData.buffer)
  const eventsZip = new AdmZip(eventsData.buffer)
  const players = JSON.parse(playersData.text) as unknown[]
  const teams = JSON.parse(teamsData.text) as unknown[]
  const playerNames = new Map(players.map((value) => {
    const row = value as Record<string, any>
    const name = String(row.shortName ?? [row.firstName, row.middleName, row.lastName].filter(Boolean).join(' ')).trim()
    return [String(row.wyId), name] as const
  }))
  for (const competitionKey of keys) {
    await checkpoint(runGate)
    const spec = WYSCOUT_PACKS[competitionKey]!
    const escaped = spec.entry.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const rawMatches = zipJson(matchesZip, new RegExp(`matches_${escaped}\\.json$`, 'i'))
    const rawEvents = zipJson(eventsZip, new RegExp(`events_${escaped}\\.json$`, 'i'))
    const checksum = createHash('sha256')
      .update(`${matchesData.checksum}:${eventsData.checksum}:${playersData.checksum}:${teamsData.checksum}:${spec.entry}`)
      .digest('hex')
    const pack = parseWyscoutPack({
      matches: rawMatches,
      teams,
      players,
      competitionKey,
      seasonKey: spec.seasonKey,
      sourceUrl: 'https://figshare.com/collections/Soccer_match_event_dataset/4415000',
      fingerprint: checksum
    })
    const events = parseWyscoutEvents(
      rawEvents,
      new Map(pack.matches.map((match) => [match.sourceId, match.home.sourceId])),
      playerNames
    )
    const slices = groupSlices(pack.matches)
    status = { ...status, total: status.total + slices.length + pack.matches.length }
    for (const slice of slices) {
      slice.etag = [matchesData.etag, eventsData.etag].filter(Boolean).join(' / ') || null
      slice.checksum = checksum
      status = { ...status, phase: 'writing', competitionKey, message: `${competitionKey} ${spec.seasonKey} results` }
      const imported = writeOverlayResultSlice(slice)
      status = { ...status, done: status.done + 1, imported: status.imported + imported }
    }
    for (const match of pack.matches) {
      await checkpoint(runGate)
      saveOverlayFixtureDetails(
        'wyscout',
        match,
        events.get(match.sourceId) ?? [],
        pack.lineups.get(match.sourceId) ?? []
      )
      status = { ...status, done: status.done + 1 }
    }
    completeOverlayCoverage('wyscout', competitionKey, spec.seasonKey, checksum, pack.matches.length)
  }
}

function saveSeasonCoverage(
  identity: { competitionId: number; seasonId: number },
  facet: string,
  itemCount: number
): void {
  getSqlite().prepare(`
    INSERT INTO football_coverage
      (competition_id,season_id,source,facet,state,item_count,checked_at)
    VALUES (?,?,'api-football',?,'complete',?,datetime('now'))
    ON CONFLICT(competition_id,season_id,source,facet) DO UPDATE SET
      state='complete',item_count=excluded.item_count,note=NULL,checked_at=excluded.checked_at
  `).run(identity.competitionId, identity.seasonId, facet, itemCount)
}

export function saveApiStandings(
  competitionKey: FootballCompetitionKey,
  seasonKey: string,
  payload: any[]
): boolean {
  const identity = seasonIdentity(competitionKey, seasonKey)
  if (!identity) return false
  const groups = payload.flatMap((item) =>
    Array.isArray(item?.league?.standings) ? item.league.standings : []
  ) as any[][]
  const rows = groups.flat()
  const valid = rows.length > 0 && rows.every((row) =>
    row?.team?.id != null &&
    String(row.team?.name ?? '').trim() &&
    row.rank != null &&
    Number.isFinite(Number(row.rank)) &&
    row.all != null
  )
  if (!valid) return false
  getSqlite().transaction(() => {
    const db = getSqlite()
    db.prepare(`DELETE FROM football_standing WHERE season_id=?`).run(identity.seasonId)
    const insert = db.prepare(`
      INSERT INTO football_standing
        (season_id,team_id,rank,rank_official,played,won,drawn,lost,goals_for,
         goals_against,goal_difference,points,deduction,note)
      VALUES (?,?,?,1,?,?,?,?,?,?,?,?,?,?)
    `)
    for (const row of rows) {
      const teamId = apiTeamId(String(row.team?.id), String(row.team?.name ?? 'Unknown team'))
      insert.run(
        identity.seasonId,
        teamId,
        Number(row.rank) || null,
        Number(row.all?.played) || 0,
        Number(row.all?.win) || 0,
        Number(row.all?.draw) || 0,
        Number(row.all?.lose) || 0,
        Number(row.all?.goals?.for) || 0,
        Number(row.all?.goals?.against) || 0,
        Number(row.goalsDiff) || 0,
        Number(row.points) || 0,
        0,
        String(row.description ?? '').trim() || null
      )
    }
    saveSeasonCoverage(identity, 'standings', rows.length)
  })()
  return true
}

export function saveApiTopScorers(
  competitionKey: FootballCompetitionKey,
  seasonKey: string,
  payload: any[]
): boolean {
  const identity = seasonIdentity(competitionKey, seasonKey)
  if (!identity) return false
  const rows = payload.slice(0, 20)
  const valid = rows.length > 0 && rows.every((item) => {
    const stat = item?.statistics?.[0]
    return item?.player?.id != null &&
      String(item.player?.name ?? '').trim() &&
      stat != null &&
      stat.goals?.total != null &&
      Number.isFinite(Number(stat.goals?.total))
  })
  if (!valid) return false
  const db = getSqlite()
  db.transaction(() => {
    db.prepare(`
      DELETE FROM football_assertion WHERE entity_kind='person' AND facet=? AND source='api-football'
    `).run(`top-scorer:${identity.seasonId}`)
    for (const item of rows) {
      const player = item.player ?? {}
      const stat = item.statistics?.[0] ?? {}
      const sourceId = String(player.id)
      let personId = sourceRefId('person', 'api-football', sourceId)
      if (personId == null) {
        personId = Number(db.prepare(`
          INSERT INTO football_person (name,role) VALUES (?,'player')
        `).run(String(player.name ?? 'Unknown player')).lastInsertRowid)
        db.prepare(`
          INSERT INTO football_source_ref
            (entity_kind,entity_id,source,external_id,fetched_at)
          VALUES ('person',?,'api-football',?,datetime('now'))
        `).run(personId, sourceId)
      }
      const teamId = stat.team?.id
        ? apiTeamId(String(stat.team.id), String(stat.team.name ?? 'Unknown team'))
        : null
      db.prepare(`
        INSERT INTO football_assertion
          (entity_kind,entity_id,facet,value,source,status,observed_at)
        VALUES ('person',?,?,?,'api-football','accepted',datetime('now'))
      `).run(
        personId,
        `top-scorer:${identity.seasonId}`,
        JSON.stringify({ goals: Number(stat.goals?.total) || 0, teamId })
      )
    }
    saveSeasonCoverage(identity, 'topScorers', rows.length)
  })()
  return true
}

async function run(request: FootballSyncRequest, runGate: PauseGate): Promise<void> {
  repo.ensureCompetitionCatalog()
  if (request.kind === 'history') {
    await installEngsoccer(runGate)
    await installOpenFootball(runGate)
    await installInternational(runGate)
    await installWikimedia(runGate)
    return
  }
  if (request.kind === 'current') {
    await refreshCurrent(runGate, request.competitionKeys)
    return
  }
  if (request.kind === 'deepPack') {
    if (request.deepSource === 'statsbomb') {
      await installStatsBomb(runGate, request.competitionKeys, request.seasonKey)
      return
    }
    if (request.deepSource === 'wyscout') {
      await installWyscout(runGate, request.competitionKeys, request.seasonKey)
      return
    }
    throw new Error('Choose StatsBomb or Wyscout for the optional deep pack.')
  }
  if (request.kind === 'playerQuizPack') {
    await installPlayerQuizPack(runGate)
    return
  }
  if (!request.entityKind || request.entityId == null) {
    throw new Error('Entity enrichment requires a team or person selection')
  }
  status = { ...status, total: 1 }
  const saved = await enrichOne(runGate, request.entityKind, request.entityId, false)
  status = { ...status, done: 1, imported: saved ? 1 : 0 }
}

export function start(request: FootballSyncRequest): FootballSyncStatus {
  if (['running', 'pausing', 'paused'].includes(status.state)) {
    throw new Error('A Football sync is already running')
  }
  const id = status.id + 1
  status = {
    ...idleStatus(id),
    state: 'running',
    kind: request.kind,
    phase: 'preparing',
    message: 'Preparing Football sources'
  }
  let handle: TaskHandle
  const runGate = cooperativeGate(
    () => {
      status = { ...status, state: 'paused', message: 'Paused between source slices' }
      handle.progress({ state: 'paused' })
    },
    () => {
      status = { ...status, state: 'running', message: 'Resuming Football sync' }
      handle.progress({ state: 'running' })
    }
  )
  gate = runGate
  handle = tasks.create({
    kind: 'footballSync',
    label: request.kind === 'history'
      ? 'Install Football history'
      : request.kind === 'deepPack'
        ? `Install ${request.deepSource ?? 'Football'} detail pack`
        : 'Refresh Football archive',
    route: '/football/sync',
    controls: runGate.controls,
    project: () =>
      status.id === id
        ? {
            detail: status.message ?? status.phase,
            done: status.done,
            total: status.total,
            error: status.state === 'error' ? status.message : null
          }
        : null
  })
  activeHandle = handle
  void run(request, runGate)
    .then(() => {
      status = { ...status, state: 'done', phase: null, message: 'Football sync complete' }
      handle.settle({ state: 'done' })
      logInfo('football', `sync complete: ${request.kind}, ${status.imported} matches`)
    })
    .catch((error) => {
      if (error instanceof tasks.TaskCancelledError || runGate.cancelled) {
        status = { ...status, state: 'cancelled', phase: null, message: 'Football sync cancelled' }
        handle.settle({ state: 'cancelled' })
        logInfo('football', 'sync cancelled; complete source slices were kept')
      } else {
        const message = error instanceof Error ? error.message : String(error)
        status = { ...status, state: 'error', phase: null, message }
        handle.settle({ state: 'error', error: message })
        logError('football', `sync failed: ${message}`)
      }
    })
    .finally(() => {
      if (status.id === id) {
        gate = null
        activeHandle = null
      }
    })
  return getStatus()
}
