import { existsSync, realpathSync } from 'fs'
import { relative, resolve, sep } from 'path'
import type Database from 'better-sqlite3'
import { getSqlite } from '../db/connection'
import { get as getSetting } from './settingsRepo'
import { absoluteMediaPath, footballRootDir } from '../files'
import {
  FOOTBALL_COMPETITIONS,
  FOOTBALL_ERAS,
  escapeFootballLike,
  normalizeFootballName,
  validateFootballExternalLink,
  validateFootballHttpUrl,
  validateFootballRelativePath
} from '@shared/football'
import type {
  FootballArticle,
  FootballCompetition,
  FootballCompetitionDetail,
  FootballCompetitionKey,
  FootballConflict,
  FootballConflictCandidate,
  FootballConflictResolution,
  FootballCoverage,
  FootballCurrentSnapshot,
  FootballEntityFilter,
  FootballEntityKind,
  FootballExternalLink,
  FootballExternalProvider,
  FootballHeadToHead,
  FootballHonour,
  FootballIdentityRepair,
  FootballJournalInput,
  FootballJournalStats,
  FootballLineupEntry,
  FootballMatchDetail,
  FootballMatchEvent,
  FootballMatchFilter,
  FootballMatchSummary,
  FootballMedia,
  FootballMediaInput,
  FootballOnThisDay,
  FootballOverview,
  FootballPersonDetail,
  FootballPersonSummary,
  FootballQuota,
  FootballSearchResults,
  FootballSeason,
  FootballSeasonDetail,
  FootballSeasonFate,
  FootballSeasonGoals,
  FootballSetupState,
  FootballStanding,
  FootballSyncOverview,
  FootballTeamDetail,
  FootballTeamSummary,
  FootballTenure,
  FootballTopScorer,
  FootballTransfer
} from '@shared/types'

type Row = Record<string, unknown>

const TEAM_SELECT = `
  t.id AS team_id, t.name AS team_name, t.short_name AS team_short_name,
  t.country AS team_country, t.is_national AS team_is_national,
  t.image_path AS team_image_path,
  t.primary_color AS team_primary_color, t.secondary_color AS team_secondary_color,
  EXISTS(SELECT 1 FROM football_favorite f
         WHERE f.entity_kind='team' AND f.entity_id=t.id) AS team_favorite`

const PERSON_SELECT = `
  p.id AS person_id, p.name AS person_name, p.role AS person_role,
  p.nationality AS person_nationality, p.image_path AS person_image_path,
  p.enrichment_state AS person_enrichment_state, p.quiz_pack AS person_quiz_pack,
  EXISTS(SELECT 1 FROM football_favorite f
         WHERE f.entity_kind='person' AND f.entity_id=p.id) AS person_favorite`

const MATCH_SELECT = `
  m.*, s.competition_id, s.label AS season_label,
  c.key AS competition_key, c.name AS competition_name,
  st.name AS stage_name,
  ht.id AS home_id, ht.name AS home_name, ht.short_name AS home_short_name, ht.country AS home_country,
  ht.is_national AS home_is_national, ht.image_path AS home_image_path,
  ht.primary_color AS home_primary_color, ht.secondary_color AS home_secondary_color,
  EXISTS(SELECT 1 FROM football_favorite f
         WHERE f.entity_kind='team' AND f.entity_id=ht.id) AS home_favorite,
  at.id AS away_id, at.name AS away_name, at.short_name AS away_short_name, at.country AS away_country,
  at.is_national AS away_is_national, at.image_path AS away_image_path,
  at.primary_color AS away_primary_color, at.secondary_color AS away_secondary_color,
  EXISTS(SELECT 1 FROM football_favorite f
         WHERE f.entity_kind='team' AND f.entity_id=at.id) AS away_favorite,
  EXISTS(SELECT 1 FROM football_favorite f
         WHERE f.entity_kind='match' AND f.entity_id=m.id) AS favorite,
  j.watched_at, j.rating, j.note AS journal_note`

const MATCH_FROM = `
  FROM football_match m
  JOIN football_season s ON s.id=m.season_id
  JOIN football_competition c ON c.id=s.competition_id
  LEFT JOIN football_stage st ON st.id=m.stage_id
  JOIN football_team ht ON ht.id=m.home_team_id
  JOIN football_team at ON at.id=m.away_team_id
  LEFT JOIN football_match_journal j ON j.match_id=m.id`

function bool(value: unknown): boolean {
  return !!value
}

function asTeam(row: Row, prefix = ''): FootballTeamSummary {
  return {
    id: row[`${prefix}id`] as number,
    name: row[`${prefix}name`] as string,
    shortName: (row[`${prefix}short_name`] as string) ?? null,
    country: (row[`${prefix}country`] as string) ?? null,
    isNational: bool(row[`${prefix}is_national`]),
    imagePath: (row[`${prefix}image_path`] as string) ?? null,
    colors: row[`${prefix}primary_color`]
      ? {
          primary: row[`${prefix}primary_color`] as string,
          secondary: (row[`${prefix}secondary_color`] as string) ?? null
        }
      : null,
    favorite: bool(row[`${prefix}favorite`])
  }
}

function asPerson(row: Row, prefix = ''): FootballPersonSummary {
  return {
    id: row[`${prefix}id`] as number,
    name: row[`${prefix}name`] as string,
    role: row[`${prefix}role`] as FootballPersonSummary['role'],
    nationality: (row[`${prefix}nationality`] as string) ?? null,
    imagePath: (row[`${prefix}image_path`] as string) ?? null,
    favorite: bool(row[`${prefix}favorite`]),
    enrichmentState: row[`${prefix}enrichment_state`] as FootballPersonSummary['enrichmentState'],
    quizPack: bool(row[`${prefix}quiz_pack`])
  }
}

function asMatch(row: Row): FootballMatchSummary {
  return {
    id: row.id as number,
    seasonId: row.season_id as number,
    competitionId: row.competition_id as number,
    competitionKey: row.competition_key as FootballCompetitionKey,
    competitionName: row.competition_name as string,
    seasonLabel: row.season_label as string,
    stageId: (row.stage_id as number) ?? null,
    stageName: (row.stage_name as string) ?? null,
    home: asTeam(row, 'home_'),
    away: asTeam(row, 'away_'),
    kickoffAt: (row.kickoff_at as string) ?? null,
    matchDate: row.match_date as string,
    round: (row.round as string) ?? null,
    status: row.status as FootballMatchSummary['status'],
    homeScore: (row.home_score as number) ?? null,
    awayScore: (row.away_score as number) ?? null,
    homeExtraTime: (row.home_extra_time as number) ?? null,
    awayExtraTime: (row.away_extra_time as number) ?? null,
    homePenalties: (row.home_penalties as number) ?? null,
    awayPenalties: (row.away_penalties as number) ?? null,
    favorite: bool(row.favorite),
    watchedAt: (row.watched_at as string) ?? null,
    rating: (row.rating as number) ?? null,
    eventCoverage: row.event_coverage as FootballMatchSummary['eventCoverage'],
    conflicted: bool(row.conflicted)
  }
}

function teamsById(ids: number[]): FootballTeamSummary[] {
  if (!ids.length) return []
  const rows = getSqlite().prepare(`
    SELECT ${TEAM_SELECT} FROM football_team t WHERE t.id IN (${ids.map(() => '?').join(',')})
  `).all(...ids) as Row[]
  const byId = new Map(rows.map((row) => [row.team_id as number, asTeam(row, 'team_')]))
  return ids.flatMap((id) => byId.get(id) ?? [])
}

function limitOffset(filter: FootballEntityFilter): { limit: number; offset: number } {
  return {
    limit: Math.min(500, Math.max(1, Math.floor(filter.limit ?? 100))),
    offset: Math.max(0, Math.floor(filter.offset ?? 0))
  }
}

export function ensureCompetitionCatalog(): void {
  const db = getSqlite()
  const insert = db.prepare(`
    INSERT INTO football_competition
      (key,name,short_name,country,scope,format,start_year,lineage_note)
    VALUES (@key,@name,@shortName,@country,@scope,@format,@startYear,@lineageNote)
    ON CONFLICT(key) DO UPDATE SET
      name=excluded.name, short_name=excluded.short_name, country=excluded.country,
      scope=excluded.scope, format=excluded.format, start_year=excluded.start_year,
      lineage_note=excluded.lineage_note, updated_at=datetime('now')
  `)
  db.transaction(() => {
    for (const competition of FOOTBALL_COMPETITIONS) insert.run(competition)
    const eraInsert = db.prepare(`
      INSERT INTO football_era
        (competition_id,name,start_season,end_season,points_win,points_draw,rank_rules,narrative,sort_order)
      SELECT c.id,@name,@startSeason,@endSeason,@pointsWin,@pointsDraw,@rankRules,@narrative,@sortOrder
      FROM football_competition c WHERE c.key=@competitionKey
      ON CONFLICT(competition_id,name,start_season) DO UPDATE SET
        end_season=excluded.end_season,points_win=excluded.points_win,
        points_draw=excluded.points_draw,rank_rules=excluded.rank_rules,
        narrative=excluded.narrative,sort_order=excluded.sort_order
    `)
    FOOTBALL_ERAS.forEach((era, sortOrder) => eraInsert.run({ ...era, sortOrder }))
  })()
}

export function listCompetitions(): FootballCompetition[] {
  ensureCompetitionCatalog()
  const rows = getSqlite().prepare(`
    SELECT c.*,
      (SELECT COUNT(*) FROM football_season s WHERE s.competition_id=c.id) AS season_count,
      (SELECT COUNT(*) FROM football_match m JOIN football_season s ON s.id=m.season_id
        WHERE s.competition_id=c.id) AS match_count,
      EXISTS(SELECT 1 FROM football_favorite f
        WHERE f.entity_kind='competition' AND f.entity_id=c.id) AS favorite,
      (SELECT label FROM football_season s WHERE s.competition_id=c.id
        ORDER BY COALESCE(start_date, key) DESC LIMIT 1) AS latest_season,
      (SELECT COALESCE(SUM(m.home_score+m.away_score),0) FROM football_match m
        JOIN football_season s ON s.id=m.season_id WHERE s.competition_id=c.id) AS goal_count,
      (SELECT h.team_id FROM football_honour h JOIN football_season s ON s.id=h.season_id
        WHERE s.competition_id=c.id AND h.placement='winner' AND h.verified=1 AND h.shared=0
          AND h.team_id IS NOT NULL
        ORDER BY COALESCE(s.start_date, s.key) DESC LIMIT 1) AS holder_id
    FROM football_competition c
    ORDER BY c.id
  `).all() as Row[]
  const titles = getSqlite().prepare(`
    SELECT h.team_id AS teamId, COUNT(*) AS titles FROM football_honour h
    WHERE h.competition_id=? AND h.placement='winner' AND h.verified=1 AND h.team_id IS NOT NULL
    GROUP BY h.team_id ORDER BY titles DESC
  `)
  return rows.map((row) => {
    const counts = titles.all(row.id) as Array<{ teamId: number; titles: number }>
    const most = counts[0]?.titles ?? 0
    return {
    id: row.id as number,
    key: row.key as FootballCompetitionKey,
    name: row.name as string,
    shortName: (row.short_name as string) ?? null,
    country: (row.country as string) ?? null,
    scope: row.scope as FootballCompetition['scope'],
    format: row.format as FootballCompetition['format'],
    startYear: (row.start_year as number) ?? null,
    lineageNote: (row.lineage_note as string) ?? null,
    summary: (row.summary as string) ?? null,
    currentSeasonId: (row.current_season_id as number) ?? null,
    seasonCount: row.season_count as number,
    matchCount: row.match_count as number,
    favorite: bool(row.favorite),
    latestSeason: (row.latest_season as string) ?? null,
    goalCount: row.goal_count as number,
    imagePath: (row.image_path as string) ?? null,
    holder: teamsById(row.holder_id == null ? [] : [row.holder_id as number])[0] ?? null,
    titleLeaders: most
      ? {
          teams: teamsById(counts.filter((item) => item.titles === most).map((item) => item.teamId)),
          titles: most
        }
      : null
    }
  })
}

function articleFor(entityKind: string, entityId: number): FootballArticle | null {
  const row = getSqlite().prepare(`
    SELECT * FROM football_article WHERE entity_kind=? AND entity_id=?
    ORDER BY fetched_at DESC, id DESC LIMIT 1
  `).get(entityKind, entityId) as Row | undefined
  if (!row) return null
  return {
    id: row.id as number,
    title: row.title as string,
    body: (row.body as string) ?? null,
    sourceUrl: row.source_url as string,
    revision: (row.revision as string) ?? null,
    license: (row.license as string) ?? null,
    attribution: (row.attribution as string) ?? null,
    state: row.state as FootballArticle['state'],
    fetchedAt: (row.fetched_at as string) ?? null
  }
}

function coverageFor(competitionId?: number, seasonId?: number): FootballCoverage[] {
  const where: string[] = []
  const args: unknown[] = []
  if (competitionId != null) {
    where.push('fc.competition_id=?')
    args.push(competitionId)
  }
  if (seasonId != null) {
    where.push('fc.season_id=?')
    args.push(seasonId)
  }
  const rows = getSqlite().prepare(`
    SELECT fc.*,c.key AS competition_key,c.name AS competition_name
    FROM football_coverage fc LEFT JOIN football_competition c ON c.id=fc.competition_id
    ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
    ORDER BY fc.checked_at DESC, fc.facet, fc.source
  `).all(...args) as Row[]
  return rows.map((row) => ({
    id: row.id as number,
    competitionId: (row.competition_id as number) ?? null,
    competitionKey: (row.competition_key as FootballCompetitionKey) ?? null,
    competitionName: (row.competition_name as string) ?? null,
    seasonId: (row.season_id as number) ?? null,
    source: row.source as FootballCoverage['source'],
    facet: row.facet as string,
    state: row.state as FootballCoverage['state'],
    itemCount: (row.item_count as number) ?? null,
    expectedCount: (row.expected_count as number) ?? null,
    note: (row.note as string) ?? null,
    revision: (row.revision as string) ?? null,
    checkedAt: row.checked_at as string
  }))
}

function honoursFor(whereSql: string, value: number): FootballHonour[] {
  const rows = getSqlite().prepare(`
    SELECT h.*, s.label AS season_label, hc.name AS competition_name,
      t.id AS team_id_value, t.name AS team_name, t.short_name AS team_short_name,
      t.country AS team_country, t.is_national AS team_is_national,
      t.image_path AS team_image_path,
  t.primary_color AS team_primary_color, t.secondary_color AS team_secondary_color,
      EXISTS(SELECT 1 FROM football_favorite f WHERE f.entity_kind='team' AND f.entity_id=t.id)
        AS team_favorite,
      p.id AS person_id_value, p.name AS person_name, p.role AS person_role,
      p.nationality AS person_nationality, p.image_path AS person_image_path,
      p.enrichment_state AS person_enrichment_state, p.quiz_pack AS person_quiz_pack,
      EXISTS(SELECT 1 FROM football_favorite f WHERE f.entity_kind='person' AND f.entity_id=p.id)
        AS person_favorite
    FROM football_honour h
    JOIN football_competition hc ON hc.id=h.competition_id
    LEFT JOIN football_season s ON s.id=h.season_id
    LEFT JOIN football_team t ON t.id=h.team_id
    LEFT JOIN football_person p ON p.id=h.person_id
    WHERE ${whereSql}=?
    ORDER BY COALESCE(s.start_date, ''), h.sort_order, h.id
  `).all(value) as Row[]
  return rows.map((row) => ({
    id: row.id as number,
    competitionId: row.competition_id as number,
    competitionName: row.competition_name as string,
    seasonId: (row.season_id as number) ?? null,
    seasonLabel: (row.season_label as string) ?? null,
    team: row.team_id_value == null ? null : asTeam(row, 'team_'),
    person: row.person_id_value == null ? null : asPerson(row, 'person_'),
    title: row.title as string,
    placement: row.placement as FootballHonour['placement'],
    verified: bool(row.verified),
    shared: bool(row.shared)
  }))
}

export function listSeasons(competitionKey?: FootballCompetitionKey | null): FootballSeason[] {
  ensureCompetitionCatalog()
  const rows = getSqlite().prepare(`
    SELECT s.*, c.key AS competition_key, c.name AS competition_name,
      (SELECT COUNT(*) FROM football_match m WHERE m.season_id=s.id) AS match_count,
      wt.id AS winner_id, wt.name AS winner_name, wt.short_name AS winner_short_name,
      wt.country AS winner_country, wt.is_national AS winner_is_national,
      wt.image_path AS winner_image_path,
  wt.primary_color AS winner_primary_color, wt.secondary_color AS winner_secondary_color,
      EXISTS(SELECT 1 FROM football_favorite f WHERE f.entity_kind='team' AND f.entity_id=wt.id)
        AS winner_favorite,
      rt.id AS runner_id, rt.name AS runner_name, rt.short_name AS runner_short_name,
      rt.country AS runner_country, rt.is_national AS runner_is_national,
      rt.image_path AS runner_image_path,
  rt.primary_color AS runner_primary_color, rt.secondary_color AS runner_secondary_color,
      EXISTS(SELECT 1 FROM football_favorite f WHERE f.entity_kind='team' AND f.entity_id=rt.id)
        AS runner_favorite
    FROM football_season s
    JOIN football_competition c ON c.id=s.competition_id
    LEFT JOIN football_honour wh ON wh.id=(
      SELECT id FROM football_honour WHERE season_id=s.id AND placement='winner'
        AND verified=1 AND shared=0 ORDER BY id LIMIT 1)
    LEFT JOIN football_team wt ON wt.id=wh.team_id
    LEFT JOIN football_honour rh ON rh.id=(
      SELECT id FROM football_honour WHERE season_id=s.id AND placement='runner-up'
        AND verified=1 ORDER BY id LIMIT 1)
    LEFT JOIN football_team rt ON rt.id=rh.team_id
    ${competitionKey ? 'WHERE c.key=?' : ''}
    ORDER BY COALESCE(s.start_date, s.key) DESC
  `).all(...(competitionKey ? [competitionKey] : [])) as Row[]
  return rows.map((row) => ({
    id: row.id as number,
    competitionId: row.competition_id as number,
    competitionKey: row.competition_key as FootballCompetitionKey,
    competitionName: row.competition_name as string,
    key: row.key as string,
    label: row.label as string,
    startDate: (row.start_date as string) ?? null,
    endDate: (row.end_date as string) ?? null,
    status: row.status as FootballSeason['status'],
    editionNumber: (row.edition_number as number) ?? null,
    teamCount: (row.team_count as number) ?? null,
    championVerified: bool(row.champion_verified),
    champion: row.winner_id == null ? null : asTeam(row, 'winner_'),
    runnerUp: row.runner_id == null ? null : asTeam(row, 'runner_'),
    narrative: (row.narrative as string) ?? null,
    dataRevision: (row.data_revision as string) ?? null,
    matchCount: row.match_count as number
  }))
}

export function getCompetition(key: FootballCompetitionKey): FootballCompetitionDetail | null {
  const competition = listCompetitions().find((item) => item.key === key)
  if (!competition) return null
  const eras = (getSqlite().prepare(`
    SELECT * FROM football_era WHERE competition_id=? ORDER BY sort_order, id
  `).all(competition.id) as Row[]).map((row) => ({
    id: row.id as number,
    competitionId: row.competition_id as number,
    name: row.name as string,
    startSeason: (row.start_season as string) ?? null,
    endSeason: (row.end_season as string) ?? null,
    pointsWin: (row.points_win as number) ?? null,
    pointsDraw: (row.points_draw as number) ?? null,
    rankRules: (row.rank_rules as string) ?? null,
    narrative: (row.narrative as string) ?? null,
    sortOrder: row.sort_order as number
  }))
  return {
    ...competition,
    eras,
    seasons: listSeasons(key),
    honours: honoursFor('h.competition_id', competition.id),
    media: derivedMediaForEntity('competition', competition.id),
    externalLinks: listExternalLinks('competition', competition.id),
    coverage: coverageFor(competition.id),
    article: articleFor('competition', competition.id)
  }
}

const STANDING_ORDER = `CASE WHEN fs.rank IS NULL THEN 1 ELSE 0 END, fs.rank, fs.points DESC,
  fs.goal_difference DESC, fs.goals_for DESC`

const UEFA_FATES: Array<[FootballCompetitionKey, FootballSeasonFate]> = [
  ['champions-league', 'champions-league'],
  ['europa-league', 'europa-league'],
  ['conference-league', 'conference-league']
]

function nextSeasonKey(key: string): string | null {
  const start = Number(key.match(/^(\d{4})\//)?.[1])
  return start ? `${start + 1}/${String(start + 2).slice(-2)}` : null
}

/**
 * What each team of a domestic league season did next, read from the archive itself:
 * absent from the next stored season of the league means relegated; a match in the
 * following calendar season of a UEFA competition means it went to Europe.
 */
function seasonFates(seasonId: number): Map<number, FootballSeasonFate> {
  const db = getSqlite()
  const fates = new Map<number, FootballSeasonFate>()
  const season = db.prepare(`
    SELECT s.key, s.competition_id AS competitionId, c.scope, c.format
    FROM football_season s JOIN football_competition c ON c.id=s.competition_id WHERE s.id=?
  `).get(seasonId) as { key: string; competitionId: number; scope: string; format: string } | undefined
  if (!season || season.scope !== 'domestic' || season.format !== 'league') return fates
  const teamsIn = (where: string, ...args: unknown[]): Set<number> => new Set((db.prepare(`
    SELECT home_team_id AS id FROM football_match m JOIN football_season s ON s.id=m.season_id WHERE ${where}
    UNION SELECT away_team_id FROM football_match m JOIN football_season s ON s.id=m.season_id WHERE ${where}
  `).all(...args, ...args) as { id: number }[]).map((row) => row.id))
  const current = teamsIn('s.id=?', seasonId)
  const nextKey = nextSeasonKey(season.key)
  if (nextKey) {
    for (const [competitionKey, fate] of [...UEFA_FATES].reverse()) {
      for (const id of teamsIn(
        's.key=? AND s.competition_id=(SELECT id FROM football_competition WHERE key=?)',
        nextKey,
        competitionKey
      )) {
        if (current.has(id)) fates.set(id, fate)
      }
    }
  }
  // Only the directly following season: an archive gap proves nothing about relegation.
  const next = nextKey ? db.prepare(`
    SELECT id FROM football_season WHERE competition_id=? AND key=?
  `).get(season.competitionId, nextKey) as { id: number } | undefined : undefined
  if (next) {
    const stayed = teamsIn('s.id=?', next.id)
    if (stayed.size) for (const id of current) if (!stayed.has(id)) fates.set(id, 'relegated')
  }
  return fates
}

function standingsFor(seasonId: number): FootballStanding[] {
  const rows = getSqlite().prepare(`
    SELECT fs.*, ${TEAM_SELECT}
    FROM football_standing fs JOIN football_team t ON t.id=fs.team_id
    WHERE fs.season_id=?
    ORDER BY ${STANDING_ORDER}, t.name
  `).all(seasonId) as Row[]
  const fates = seasonFates(seasonId)
  return rows.map((row, index) => ({
    team: asTeam(row, 'team_'),
    rank: (row.rank as number) ?? null,
    rankOfficial: bool(row.rank_official),
    played: row.played as number,
    won: row.won as number,
    drawn: row.drawn as number,
    lost: row.lost as number,
    goalsFor: row.goals_for as number,
    goalsAgainst: row.goals_against as number,
    goalDifference: row.goal_difference as number,
    points: row.points as number,
    deduction: row.deduction as number,
    note: (row.note as string) ?? null,
    position: index + 1,
    teamCount: rows.length,
    fate: fates.get(row.team_id as number) ?? null
  }))
}

export function getSeason(id: number): FootballSeasonDetail | null {
  const season = listSeasons().find((item) => item.id === id)
  if (!season) return null
  const competition = getCompetition(season.competitionKey)
  if (!competition) return null
  const stages = (getSqlite().prepare(`
    SELECT id,name,kind,sort_order FROM football_stage WHERE season_id=? ORDER BY sort_order,id
  `).all(id) as Row[]).map((row) => ({
    id: row.id as number,
    name: row.name as string,
    kind: row.kind as string,
    sortOrder: row.sort_order as number
  }))
  return {
    ...season,
    eras: competition.eras.filter((era) => {
      if (!season.startDate) return true
      const label = season.key
      return (!era.startSeason || label >= era.startSeason) && (!era.endSeason || label <= era.endSeason)
    }),
    stages,
    standings: standingsFor(id),
    matches: listMatches({ seasonId: id, limit: 500 }),
    topScorers: topScorersForSeason(id),
    honours: honoursFor('h.season_id', id),
    coverage: coverageFor(season.competitionId, id),
    article: articleFor('season', id)
  }
}

export function listTeams(filter: FootballEntityFilter = {}): FootballTeamSummary[] {
  const where: string[] = []
  const args: unknown[] = []
  if (filter.search?.trim()) {
    where.push(`(t.name LIKE ? ESCAPE '\\' OR t.short_name LIKE ? ESCAPE '\\')`)
    const q = `%${escapeFootballLike(filter.search.trim())}%`
    args.push(q, q)
  }
  if (filter.country) {
    where.push('t.country=?')
    args.push(filter.country)
  }
  if (filter.favoriteOnly) where.push(`EXISTS(SELECT 1 FROM football_favorite f WHERE f.entity_kind='team' AND f.entity_id=t.id)`)
  if (filter.competitionKey) {
    where.push(`EXISTS(
      SELECT 1 FROM football_match m JOIN football_season s ON s.id=m.season_id
      JOIN football_competition c ON c.id=s.competition_id
      WHERE c.key=? AND (m.home_team_id=t.id OR m.away_team_id=t.id))`)
    args.push(filter.competitionKey)
  }
  const { limit, offset } = limitOffset(filter)
  const rows = getSqlite().prepare(`
    SELECT ${TEAM_SELECT} FROM football_team t
    ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
    ORDER BY (t.image_path IS NULL), t.name LIMIT ? OFFSET ?
  `).all(...args, limit, offset) as Row[]
  return rows.map((row) => asTeam(row, 'team_'))
}

function tenuresFor(personId?: number, teamId?: number): FootballTenure[] {
  const where = personId != null ? 'ft.person_id=?' : 'ft.team_id=?'
  const value = personId ?? teamId
  const rows = getSqlite().prepare(`
    SELECT ft.*, ${TEAM_SELECT}, ${PERSON_SELECT}
    FROM football_tenure ft JOIN football_team t ON t.id=ft.team_id
    JOIN football_person p ON p.id=ft.person_id
    WHERE ${where}
    ORDER BY ft.sort_order, COALESCE(ft.start_date,''), ft.id
  `).all(value) as Row[]
  return rows.map((row) => ({
    id: row.id as number,
    personId: row.person_id as number,
    person: asPerson(row, 'person_'),
    team: asTeam(row, 'team_'),
    role: row.role as FootballTenure['role'],
    startDate: (row.start_date as string) ?? null,
    endDate: (row.end_date as string) ?? null,
    loan: bool(row.loan),
    appearances: (row.appearances as number) ?? null,
    goals: (row.goals as number) ?? null,
    verified: bool(row.verified),
    complete: bool(row.complete),
    sortOrder: row.sort_order as number
  }))
}

function teamScorers(teamId: number): FootballTopScorer[] {
  const rows = getSqlite().prepare(`
    SELECT ${PERSON_SELECT}, COUNT(*) AS goals FROM football_event e
    JOIN football_person p ON p.id=e.person_id
    WHERE e.team_id=? AND e.type='goal' AND e.own_goal=0
    GROUP BY p.id ORDER BY goals DESC, p.name LIMIT 10
  `).all(teamId) as Row[]
  return rows.map((row, index) => ({
    rank: rows.findIndex((prior) => prior.goals === row.goals) + 1,
    person: asPerson(row, 'person_'),
    team: null,
    goals: row.goals as number,
    tied: rows.some((other, otherIndex) => otherIndex !== index && other.goals === row.goals)
  }))
}

function headToHeads(teamId: number): FootballHeadToHead[] {
  const rows = getSqlite().prepare(`
    SELECT opponent, COUNT(*) AS played, SUM(gf>ga) AS won, SUM(gf=ga) AS drawn,
      SUM(gf<ga) AS lost, SUM(gf) AS goals_for, SUM(ga) AS goals_against
    FROM (
      SELECT away_team_id AS opponent, home_score AS gf, away_score AS ga FROM football_match
      WHERE home_team_id=? AND home_score IS NOT NULL AND away_score IS NOT NULL
      UNION ALL
      SELECT home_team_id, away_score, home_score FROM football_match
      WHERE away_team_id=? AND home_score IS NOT NULL AND away_score IS NOT NULL
    ) GROUP BY opponent ORDER BY played DESC LIMIT 4
  `).all(teamId, teamId) as Row[]
  const teams = teamsById(rows.map((row) => row.opponent as number))
  return rows.flatMap((row) => {
    const opponent = teams.find((team) => team.id === row.opponent)
    return opponent ? [{
      opponent,
      played: row.played as number,
      won: row.won as number,
      drawn: row.drawn as number,
      lost: row.lost as number,
      goalsFor: row.goals_for as number,
      goalsAgainst: row.goals_against as number
    }] : []
  })
}

export function getTeam(id: number): FootballTeamDetail | null {
  const row = getSqlite().prepare(`
    SELECT t.*, EXISTS(SELECT 1 FROM football_favorite f
      WHERE f.entity_kind='team' AND f.entity_id=t.id) AS favorite
    FROM football_team t WHERE t.id=?
  `).get(id) as Row | undefined
  if (!row) return null
  return {
    ...asTeam(row),
    foundedYear: (row.founded_year as number) ?? null,
    venue: (row.venue as string) ?? null,
    venueCapacity: (row.venue_capacity as number) ?? null,
    bio: (row.bio as string) ?? null,
    enrichmentState: row.enrichment_state as FootballTeamDetail['enrichmentState'],
    tenures: tenuresFor(undefined, id),
    honours: honoursFor('h.team_id', id),
    matches: listMatches({ teamId: id, limit: 200 }),
    seasonRecords: (getSqlite().prepare(`
      SELECT fs.*, s.id AS season_id, s.label AS season_label,
        c.key AS competition_key, c.name AS competition_name, ${TEAM_SELECT}
      FROM (
        SELECT fs.*, ROW_NUMBER() OVER (PARTITION BY fs.season_id ORDER BY ${STANDING_ORDER})
            AS position,
          COUNT(*) OVER (PARTITION BY fs.season_id) AS team_count
        FROM football_standing fs
        WHERE fs.season_id IN (SELECT season_id FROM football_standing WHERE team_id=?)
      ) fs
      JOIN football_season s ON s.id=fs.season_id
      JOIN football_competition c ON c.id=s.competition_id
      JOIN football_team t ON t.id=fs.team_id WHERE fs.team_id=?
      ORDER BY COALESCE(s.start_date, s.key) DESC
    `).all(id, id) as Row[]).map((standing) => ({
      team: asTeam(standing, 'team_'),
      seasonId: standing.season_id as number,
      seasonLabel: standing.season_label as string,
      competitionKey: standing.competition_key as FootballCompetitionKey,
      competitionName: standing.competition_name as string,
      rank: (standing.rank as number) ?? null,
      rankOfficial: bool(standing.rank_official),
      played: standing.played as number,
      won: standing.won as number,
      drawn: standing.drawn as number,
      lost: standing.lost as number,
      goalsFor: standing.goals_for as number,
      goalsAgainst: standing.goals_against as number,
      goalDifference: standing.goal_difference as number,
      points: standing.points as number,
      deduction: standing.deduction as number,
      note: (standing.note as string) ?? null,
      position: standing.position as number,
      teamCount: standing.team_count as number,
      fate: seasonFates(standing.season_id as number).get(id) ?? null
    })),
    scorers: teamScorers(id),
    rivals: headToHeads(id),
    media: derivedMediaForEntity('team', id),
    externalLinks: listExternalLinks('team', id),
    article: articleFor('team', id)
  }
}

export function listPeople(filter: FootballEntityFilter = {}): FootballPersonSummary[] {
  const where: string[] = []
  const args: unknown[] = []
  if (filter.search?.trim()) {
    where.push(`p.name LIKE ? ESCAPE '\\'`)
    args.push(`%${escapeFootballLike(filter.search.trim())}%`)
  }
  if (filter.role) {
    where.push(filter.role === 'both' ? `p.role='both'` : `(p.role=? OR p.role='both')`)
    if (filter.role !== 'both') args.push(filter.role)
  }
  if (filter.country) {
    where.push('p.nationality=?')
    args.push(filter.country)
  }
  if (filter.favoriteOnly) where.push(`EXISTS(SELECT 1 FROM football_favorite f WHERE f.entity_kind='person' AND f.entity_id=p.id)`)
  const { limit, offset } = limitOffset(filter)
  const rows = getSqlite().prepare(`
    SELECT ${PERSON_SELECT} FROM football_person p
    ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
    ORDER BY (p.image_path IS NULL), p.name LIMIT ? OFFSET ?
  `).all(...args, limit, offset) as Row[]
  return rows.map((row) => asPerson(row, 'person_'))
}

function transfersFor(personId: number): FootballTransfer[] {
  const rows = getSqlite().prepare(`SELECT * FROM football_transfer WHERE person_id=?
    ORDER BY transfer_date DESC, id DESC`).all(personId) as Row[]
  const teams = teamsById([...new Set(rows.flatMap((row) => [row.from_team_id, row.to_team_id]).filter((id): id is number => typeof id === 'number'))])
  const team = (id: unknown) => teams.find((item) => item.id === id) ?? null
  return rows.map((row) => ({
    id: row.id as number,
    date: (row.transfer_date as string) ?? null,
    season: (row.season as string) ?? null,
    from: team(row.from_team_id),
    to: team(row.to_team_id),
    fromName: row.from_team as string,
    toName: row.to_team as string,
    fee: (row.fee as number) ?? null,
    marketValue: (row.market_value as number) ?? null
  }))
}

function personGoals(personId: number): Pick<
  FootballPersonDetail,
  'goalsBySeason' | 'goalTotal' | 'matchTotal' | 'scoredIn'
> {
  const db = getSqlite()
  const goalsBySeason = (db.prepare(`
    SELECT s.id AS season_id, s.label AS season_label, c.key AS competition_key, COUNT(*) AS goals
    FROM football_event e
    JOIN football_match m ON m.id=e.match_id
    JOIN football_season s ON s.id=m.season_id
    JOIN football_competition c ON c.id=s.competition_id
    WHERE e.person_id=? AND e.type='goal' AND e.own_goal=0
    GROUP BY s.id ORDER BY COALESCE(s.start_date, s.key), s.id
  `).all(personId) as Row[]).map((row): FootballSeasonGoals => ({
    seasonId: row.season_id as number,
    seasonLabel: row.season_label as string,
    competitionKey: row.competition_key as FootballCompetitionKey,
    goals: row.goals as number
  }))
  const matches = db.prepare(`
    SELECT COUNT(*) AS n FROM (
      SELECT match_id FROM football_lineup WHERE person_id=?
      UNION SELECT match_id FROM football_event WHERE person_id=? AND type='goal'
    )
  `).get(personId, personId) as { n: number }
  const scoredIn = (db.prepare(`
    SELECT ${MATCH_SELECT}, g.goals AS person_goals ${MATCH_FROM}
    JOIN (
      SELECT match_id, COUNT(*) AS goals FROM football_event
      WHERE person_id=? AND type='goal' AND own_goal=0 GROUP BY match_id
    ) g ON g.match_id=m.id
    ORDER BY g.goals DESC, m.match_date DESC LIMIT 12
  `).all(personId) as Row[]).map((row) => ({ match: asMatch(row), goals: row.person_goals as number }))
  return {
    goalsBySeason,
    goalTotal: goalsBySeason.reduce((total, row) => total + row.goals, 0),
    matchTotal: matches.n,
    scoredIn
  }
}

export function getPerson(id: number): FootballPersonDetail | null {
  const row = getSqlite().prepare(`
    SELECT p.*, EXISTS(SELECT 1 FROM football_favorite f
      WHERE f.entity_kind='person' AND f.entity_id=p.id) AS favorite
    FROM football_person p WHERE p.id=?
  `).get(id) as Row | undefined
  if (!row) return null
  const summary = asPerson(row)
  return {
    ...summary,
    birthDate: (row.birth_date as string) ?? null,
    position: (row.position as string) ?? null,
    heightCm: (row.height_cm as number) ?? null,
    birthPlace: (row.birth_place as string) ?? null,
    foot: (row.foot as string) ?? null,
    transfers: transfersFor(id),
    deathDate: (row.death_date as string) ?? null,
    bio: (row.bio as string) ?? null,
    tenures: tenuresFor(id),
    honours: honoursFor('h.person_id', id),
    appearances: (getSqlite().prepare(`
      SELECT DISTINCT ${MATCH_SELECT} ${MATCH_FROM}
      JOIN football_lineup fl ON fl.match_id=m.id
      WHERE fl.person_id=? ORDER BY m.match_date DESC LIMIT 200
    `).all(id) as Row[]).map(asMatch),
    ...personGoals(id),
    media: derivedMediaForEntity('person', id),
    externalLinks: listExternalLinks('person', id),
    article: articleFor('person', id)
  }
}

export function listMatches(filter: FootballMatchFilter = {}): FootballMatchSummary[] {
  const where: string[] = []
  const args: unknown[] = []
  if (filter.search?.trim()) {
    const q = `%${escapeFootballLike(filter.search.trim())}%`
    where.push(`(m.title LIKE ? ESCAPE '\\' OR ht.name LIKE ? ESCAPE '\\' OR at.name LIKE ? ESCAPE '\\')`)
    args.push(q, q, q)
  }
  if (filter.competitionKey) {
    where.push('c.key=?')
    args.push(filter.competitionKey)
  }
  if (filter.seasonId != null) {
    where.push('m.season_id=?')
    args.push(filter.seasonId)
  }
  if (filter.teamId != null) {
    where.push('(m.home_team_id=? OR m.away_team_id=?)')
    args.push(filter.teamId, filter.teamId)
  }
  if (filter.dateFrom) {
    where.push('m.match_date>=?')
    args.push(filter.dateFrom)
  }
  if (filter.dateTo) {
    where.push('m.match_date<=?')
    args.push(filter.dateTo)
  }
  if (filter.status) {
    where.push('m.status=?')
    args.push(filter.status)
  }
  if (filter.favoriteOnly) where.push(`EXISTS(SELECT 1 FROM football_favorite f WHERE f.entity_kind='match' AND f.entity_id=m.id)`)
  if (filter.watchedOnly) where.push('j.watched_at IS NOT NULL')
  const { limit, offset } = limitOffset(filter)
  const rows = getSqlite().prepare(`
    SELECT ${MATCH_SELECT} ${MATCH_FROM}
    ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
    ORDER BY ${filter.watchedOnly ? 'j.watched_at DESC,' : ''} m.match_date DESC,
      COALESCE(m.kickoff_at,''), m.id DESC LIMIT ? OFFSET ?
  `).all(...args, limit, offset) as Row[]
  return rows.map(asMatch)
}

function lineupsFor(matchId: number): FootballLineupEntry[] {
  const rows = getSqlite().prepare(`
    SELECT fl.*, ${PERSON_SELECT}
    FROM football_lineup fl JOIN football_person p ON p.id=fl.person_id
    WHERE fl.match_id=? ORDER BY fl.team_id, fl.starter DESC, fl.sort_order, p.name
  `).all(matchId) as Row[]
  return rows.map((row) => ({
    id: row.id as number,
    teamId: row.team_id as number,
    person: asPerson(row, 'person_'),
    role: row.role as FootballLineupEntry['role'],
    starter: bool(row.starter),
    shirt: (row.shirt as number) ?? null,
    position: (row.position as string) ?? null,
    captain: bool(row.captain),
    sortOrder: row.sort_order as number
  }))
}

function eventsFor(matchId: number): FootballMatchEvent[] {
  const rows = getSqlite().prepare(`
    SELECT e.*,
      p.id AS person_id_value, p.name AS person_name, p.role AS person_role,
      p.nationality AS person_nationality, p.image_path AS person_image_path,
      p.enrichment_state AS person_enrichment_state, p.quiz_pack AS person_quiz_pack,
      EXISTS(SELECT 1 FROM football_favorite f WHERE f.entity_kind='person' AND f.entity_id=p.id)
        AS person_favorite,
      rp.id AS related_id, rp.name AS related_name, rp.role AS related_role,
      rp.nationality AS related_nationality, rp.image_path AS related_image_path,
      rp.enrichment_state AS related_enrichment_state, rp.quiz_pack AS related_quiz_pack,
      EXISTS(SELECT 1 FROM football_favorite f WHERE f.entity_kind='person' AND f.entity_id=rp.id)
        AS related_favorite
    FROM football_event e
    LEFT JOIN football_person p ON p.id=e.person_id
    LEFT JOIN football_person rp ON rp.id=e.related_person_id
    WHERE e.match_id=? ORDER BY e.sort_order, e.minute, e.extra_minute, e.id
  `).all(matchId) as Row[]
  return rows.map((row) => ({
    id: row.id as number,
    teamId: (row.team_id as number) ?? null,
    person: row.person_id_value == null ? null : asPerson(row, 'person_'),
    relatedPerson: row.related_id == null ? null : asPerson(row, 'related_'),
    type: row.type as string,
    detail: (row.detail as string) ?? null,
    minute: (row.minute as number) ?? null,
    extraMinute: (row.extra_minute as number) ?? null,
    ownGoal: bool(row.own_goal),
    penalty: bool(row.penalty),
    scoreHome: (row.score_home as number) ?? null,
    scoreAway: (row.score_away as number) ?? null,
    sortOrder: row.sort_order as number
  }))
}

function sourceRefs(entityKind: string, entityId: number) {
  return (getSqlite().prepare(`
    SELECT id,source,external_id,source_url,revision,checksum,fetched_at
    FROM football_source_ref WHERE entity_kind=? AND entity_id=? ORDER BY source,id
  `).all(entityKind, entityId) as Row[]).map((row) => ({
    id: row.id as number,
    source: row.source as FootballCoverage['source'],
    externalId: row.external_id as string,
    sourceUrl: (row.source_url as string) ?? null,
    revision: (row.revision as string) ?? null,
    checksum: (row.checksum as string) ?? null,
    fetchedAt: (row.fetched_at as string) ?? null
  }))
}

export function getMatch(id: number): FootballMatchDetail | null {
  const row = getSqlite().prepare(`SELECT ${MATCH_SELECT} ${MATCH_FROM} WHERE m.id=?`).get(id) as
    | Row
    | undefined
  if (!row) return null
  return {
    ...asMatch(row),
    homeHalftime: (row.home_halftime as number) ?? null,
    awayHalftime: (row.away_halftime as number) ?? null,
    aggregateHome: (row.aggregate_home as number) ?? null,
    aggregateAway: (row.aggregate_away as number) ?? null,
    awarded: bool(row.awarded),
    venue: (row.venue as string) ?? null,
    city: (row.city as string) ?? null,
    attendance: (row.attendance as number) ?? null,
    referee: (row.referee as string) ?? null,
    homeFormation: (row.home_formation as string) ?? null,
    awayFormation: (row.away_formation as string) ?? null,
    homeManager: (row.home_manager as string) ?? null,
    awayManager: (row.away_manager as string) ?? null,
    lineupCoverage: row.lineup_coverage as FootballMatchDetail['lineupCoverage'],
    lineups: lineupsFor(id),
    events: eventsFor(id),
    note: (row.journal_note as string) ?? null,
    media: derivedMediaForEntity('match', id),
    externalLinks: listExternalLinks('match', id),
    sources: sourceRefs('match', id)
  }
}

function topScorersForSeason(seasonId: number): FootballCurrentSnapshot['topScorers'] {
  const db = getSqlite()
  const assertedRows = db.prepare(`
    SELECT p.*, CAST(json_extract(a.value,'$.goals') AS INTEGER) AS goals,
      CAST(json_extract(a.value,'$.teamId') AS INTEGER) AS scorer_team_id,
      t.name AS scorer_team_name, t.short_name AS scorer_team_short_name,
      t.country AS scorer_team_country, t.is_national AS scorer_team_is_national,
      t.image_path AS scorer_team_image_path,
  t.primary_color AS scorer_team_primary_color, t.secondary_color AS scorer_team_secondary_color,
      EXISTS(SELECT 1 FROM football_favorite f WHERE f.entity_kind='team' AND f.entity_id=t.id)
        AS scorer_team_favorite,
      EXISTS(SELECT 1 FROM football_favorite f WHERE f.entity_kind='person' AND f.entity_id=p.id)
        AS favorite
    FROM football_assertion a JOIN football_person p ON p.id=a.entity_id
    LEFT JOIN football_team t ON t.id=CAST(json_extract(a.value,'$.teamId') AS INTEGER)
    WHERE a.entity_kind='person' AND a.facet=? AND a.source='api-football'
      AND a.status='accepted'
    ORDER BY goals DESC,p.name LIMIT 20
  `).all(`top-scorer:${seasonId}`) as Row[]
  const eventRows = assertedRows.length ? [] : db.prepare(`
    SELECT p.*, COUNT(*) AS goals,
      MIN(e.team_id) AS scorer_team_id,
      t.name AS scorer_team_name, t.short_name AS scorer_team_short_name,
      t.country AS scorer_team_country, t.is_national AS scorer_team_is_national,
      t.image_path AS scorer_team_image_path,
  t.primary_color AS scorer_team_primary_color, t.secondary_color AS scorer_team_secondary_color,
      EXISTS(SELECT 1 FROM football_favorite f WHERE f.entity_kind='team' AND f.entity_id=t.id)
        AS scorer_team_favorite,
      EXISTS(SELECT 1 FROM football_favorite f WHERE f.entity_kind='person' AND f.entity_id=p.id)
        AS favorite
    FROM football_event e
    JOIN football_match m ON m.id=e.match_id
    JOIN football_person p ON p.id=e.person_id
    LEFT JOIN football_team t ON t.id=e.team_id
    WHERE m.season_id=? AND e.type='goal' AND e.own_goal=0
    GROUP BY p.id ORDER BY goals DESC,p.name LIMIT 20
  `).all(seasonId) as Row[]
  const rows = assertedRows.length ? assertedRows : eventRows
  return rows.map((row, index) => ({
    rank: index > 0 && rows[index - 1].goals === row.goals
      ? rows.slice(0, index).findIndex((prior) => prior.goals === row.goals) + 1
      : index + 1,
    person: asPerson(row),
    team: row.scorer_team_id == null ? null : asTeam(row, 'scorer_team_'),
    goals: row.goals as number,
    tied:
      (index > 0 && rows[index - 1].goals === row.goals) ||
      (index + 1 < rows.length && rows[index + 1].goals === row.goals)
  }))
}

function quota(): FootballQuota {
  const today = new Date().toISOString().slice(0, 10)
  const row = getSqlite().prepare(`SELECT value FROM settings WHERE key='football.api_quota'`).get() as
    | { value: string }
    | undefined
  let stored: { date?: string; used?: number; backlog?: number } = {}
  try {
    stored = row ? JSON.parse(row.value) : {}
  } catch {
    stored = {}
  }
  const used = stored.date === today ? Math.max(0, stored.used ?? 0) : 0
  const backlog = Math.max(0, stored.backlog ?? 0)
  return { date: today, limit: 100, used, remaining: Math.max(0, 100 - used), backlog }
}

export function currentSnapshot(
  competitionKey?: FootballCompetitionKey | null,
  dateFrom?: string | null,
  dateTo?: string | null
): FootballCurrentSnapshot {
  const matches = listMatches({
    competitionKey,
    dateFrom: dateFrom ?? undefined,
    dateTo: dateTo ?? undefined,
    limit: 500
  })
  const seasonId = matches[0]?.seasonId ?? (competitionKey
    ? ((getSqlite().prepare(`
        SELECT s.id FROM football_season s JOIN football_competition c ON c.id=s.competition_id
        WHERE c.key=? ORDER BY COALESCE(s.start_date,s.key) DESC LIMIT 1
      `).get(competitionKey) as { id: number } | undefined)?.id)
    : undefined)
  const competitionId = matches[0]?.competitionId ?? (competitionKey
    ? (getSqlite().prepare(`SELECT id FROM football_competition WHERE key=?`).get(competitionKey) as
        | { id: number }
        | undefined)?.id
    : undefined)
  const standings = seasonId == null ? [] : standingsFor(seasonId)
  const topScorers = seasonId == null ? [] : topScorersForSeason(seasonId)
  const entitlement = competitionKey
    ? ((getSqlite().prepare(`
        SELECT value FROM settings WHERE key=?
      `).get(`football.entitlement.${competitionKey}`) as { value: string } | undefined) ?? null)
    : null
  let parsedEntitlement: FootballCurrentSnapshot['entitlement'] = null
  try {
    parsedEntitlement = entitlement ? JSON.parse(entitlement.value) : null
  } catch {
    parsedEntitlement = null
  }
  return {
    matches,
    standings,
    topScorers,
    coverage: seasonId == null || competitionId == null ? [] : coverageFor(competitionId, seasonId),
    entitlement: parsedEntitlement,
    lastRefreshAt: competitionKey
      ? ((getSqlite().prepare(`
          SELECT finished_at FROM football_import_run
          WHERE kind='current' AND state='done' AND competition_key=?
          ORDER BY id DESC LIMIT 1
        `).get(competitionKey) as { finished_at?: string } | undefined)?.finished_at ?? null)
      : ((getSqlite().prepare(`
          SELECT finished_at FROM football_import_run
          WHERE kind='current' AND state='done' ORDER BY id DESC LIMIT 1
        `).get() as { finished_at?: string } | undefined)?.finished_at ?? null),
    quota: quota()
  }
}

/** The most notable finished match played on this month-day in any year. */
export function onThisDay(monthDay: string): FootballOnThisDay | null {
  const row = getSqlite().prepare(`
    SELECT ${MATCH_SELECT} ${MATCH_FROM}
    WHERE substr(m.match_date,6,5)=? AND m.home_score IS NOT NULL AND m.away_score IS NOT NULL
    ORDER BY (j.watched_at IS NOT NULL) + EXISTS(SELECT 1 FROM football_favorite f
        WHERE f.entity_kind='team' AND f.entity_id IN (m.home_team_id,m.away_team_id)) DESC,
      (st.name LIKE '%final%' AND st.name NOT LIKE '%semi%' AND st.name NOT LIKE '%quarter%') DESC,
      m.home_score+m.away_score DESC, m.match_date DESC
    LIMIT 1
  `).get(monthDay) as Row | undefined
  return row ? { match: asMatch(row), events: eventsFor(row.id as number) } : null
}

function journalStats(year: string): FootballJournalStats {
  const db = getSqlite()
  const totals = db.prepare(`
    SELECT COUNT(*) AS logged, COALESCE(SUM(substr(watched_at,1,4)=?),0) AS this_year,
      AVG(rating) AS average
    FROM football_match_journal WHERE watched_at IS NOT NULL
  `).get(year) as { logged: number; this_year: number; average: number | null }
  const top = db.prepare(`
    SELECT team_id AS id FROM (
      SELECT m.home_team_id AS team_id FROM football_match_journal j
      JOIN football_match m ON m.id=j.match_id WHERE j.watched_at IS NOT NULL
      UNION ALL SELECT m.away_team_id FROM football_match_journal j
      JOIN football_match m ON m.id=j.match_id WHERE j.watched_at IS NOT NULL
    ) GROUP BY team_id ORDER BY COUNT(*) DESC LIMIT 1
  `).get() as { id: number } | undefined
  return {
    logged: totals.logged,
    thisYear: totals.this_year,
    averageRating: totals.average == null ? null : Math.round(totals.average * 10) / 10,
    mostWatched: teamsById(top ? [top.id] : [])[0] ?? null
  }
}

/** When each setup step last completed; the settings rows are written by the Football sync. */
/** Archives installed before germany.csv was filtered to tier 1 hold 2. Bundesliga matches too. */
function historyHasLowerTiers(): boolean {
  return !!getSqlite().prepare(`
    SELECT 1 FROM football_season s JOIN football_competition c ON c.id=s.competition_id
    WHERE c.key='bundesliga' AND (SELECT COUNT(*) FROM football_match m WHERE m.season_id=s.id) > 380
    LIMIT 1
  `).get()
}

export function setupState(): FootballSetupState {
  return {
    history: historyHasLowerTiers() ? null : getSetting('football.setup.history') ?? null,
    detail: getSetting('football.setup.detail') ?? null,
    pictures: getSetting('football.setup.pictures') ?? null
  }
}

export function overview(): FootballOverview {
  const competitions = listCompetitions()
  const db = getSqlite()
  const counts = db.prepare(`
    SELECT
      (SELECT COUNT(*) FROM football_season) AS seasons,
      (SELECT COUNT(*) FROM football_match) AS matches,
      (SELECT COUNT(*) FROM football_team) AS teams,
      (SELECT COUNT(*) FROM football_person) AS people
  `).get() as { seasons: number; matches: number; teams: number; people: number }
  const today = new Date().toISOString().slice(0, 10)
  const lastSync = db.prepare(`
    SELECT finished_at FROM football_import_run WHERE state='done'
    ORDER BY finished_at DESC LIMIT 1
  `).get() as { finished_at?: string } | undefined
  return {
    installed: counts.matches > 0,
    setup: setupState(),
    fixtures: {
      updatedAt: getSetting('football.fixtures.updated') ?? null,
      latestResult: getSetting('football.fixtures.latestResult') ?? null
    },
    competitions,
    currentMatches: listMatches({ dateFrom: today, dateTo: today, limit: 100 }),
    recentJournal: listMatches({ watchedOnly: true, limit: 8 }),
    recentMedia: listMedia({ limit: 8 }),
    onThisDay: onThisDay(today.slice(5)),
    journal: journalStats(today.slice(0, 4)),
    totals: counts,
    coverage: coverageFor().slice(0, 30),
    lastSyncAt: lastSync?.finished_at ?? null
  }
}

export function search(query: string): FootballSearchResults {
  const trimmed = query.trim()
  if (!trimmed) return { competitions: [], seasons: [], teams: [], people: [], matches: [] }
  const escaped = `%${escapeFootballLike(trimmed)}%`
  const competitions = listCompetitions().filter((item) =>
    `${item.name} ${item.shortName ?? ''}`.toLocaleLowerCase('en').includes(trimmed.toLocaleLowerCase('en'))
  ).slice(0, 8)
  const seasons = (getSqlite().prepare(`
    SELECT s.id FROM football_season s JOIN football_competition c ON c.id=s.competition_id
    WHERE s.label LIKE ? ESCAPE '\\' OR c.name LIKE ? ESCAPE '\\'
    ORDER BY s.start_date DESC LIMIT 8
  `).all(escaped, escaped) as { id: number }[])
    .map((row) => listSeasons().find((season) => season.id === row.id))
    .filter((season): season is FootballSeason => !!season)
  return {
    competitions,
    seasons,
    teams: listTeams({ search: trimmed, limit: 8 }),
    people: listPeople({ search: trimmed, limit: 8 }),
    matches: listMatches({ search: trimmed, limit: 8 })
  }
}

export function setFavorite(kind: FootballEntityKind, entityId: number, favorite: boolean): void {
  const db = getSqlite()
  if (favorite) {
    if (!footballEntityExists(kind, entityId)) throw new Error('Football entity not found')
    db.prepare(`INSERT OR IGNORE INTO football_favorite (entity_kind,entity_id) VALUES (?,?)`).run(
      kind,
      entityId
    )
  } else {
    db.prepare(`DELETE FROM football_favorite WHERE entity_kind=? AND entity_id=?`).run(kind, entityId)
  }
}

export function saveJournal(matchId: number, input: FootballJournalInput): void {
  const rating = input.rating ?? null
  if (rating != null && (rating < 0 || rating > 5 || Math.round(rating * 2) !== rating * 2)) {
    throw new Error('Match ratings use half-star steps from 0 to 5')
  }
  const watchedAt = input.watchedAt?.trim() || null
  const note = input.note?.trim() || null
  if (watchedAt == null && rating == null && note == null) {
    getSqlite().prepare(`DELETE FROM football_match_journal WHERE match_id=?`).run(matchId)
    return
  }
  getSqlite().prepare(`
    INSERT INTO football_match_journal (match_id,watched_at,rating,note)
    VALUES (?,?,?,?)
    ON CONFLICT(match_id) DO UPDATE SET watched_at=excluded.watched_at,
      rating=excluded.rating, note=excluded.note, updated_at=datetime('now')
  `).run(matchId, watchedAt, rating, note)
}

function mediaLinks(mediaId: number): FootballMedia['links'] {
  return (getSqlite().prepare(`
    SELECT ml.entity_kind, ml.entity_id,
      CASE ml.entity_kind
        WHEN 'competition' THEN (SELECT name FROM football_competition WHERE id=ml.entity_id)
        WHEN 'team' THEN (SELECT name FROM football_team WHERE id=ml.entity_id)
        WHEN 'person' THEN (SELECT name FROM football_person WHERE id=ml.entity_id)
        WHEN 'match' THEN (SELECT title FROM football_match WHERE id=ml.entity_id)
      END AS label
    FROM football_media_link ml WHERE ml.media_id=?
    ORDER BY ml.entity_kind, label
  `).all(mediaId) as Row[]).map((row) => ({
    entityKind: row.entity_kind as FootballEntityKind,
    entityId: row.entity_id as number,
    label: (row.label as string) ?? null
  }))
}

function asMedia(row: Row): FootballMedia {
  return {
    id: row.id as number,
    title: row.title as string,
    kind: row.kind as FootballMedia['kind'],
    localPath: (row.local_path as string) ?? null,
    url: (row.url as string) ?? null,
    note: (row.note as string) ?? null,
    links: mediaLinks(row.id as number),
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string
  }
}

export function listMedia(filter: {
  kind?: FootballMedia['kind'] | null
  search?: string | null
  limit?: number
  offset?: number
} = {}): FootballMedia[] {
  const where: string[] = []
  const args: unknown[] = []
  if (filter.kind) {
    where.push('kind=?')
    args.push(filter.kind)
  }
  if (filter.search?.trim()) {
    where.push(`title LIKE ? ESCAPE '\\'`)
    args.push(`%${escapeFootballLike(filter.search.trim())}%`)
  }
  const limit = Math.min(500, Math.max(1, filter.limit ?? 100))
  const offset = Math.max(0, filter.offset ?? 0)
  return (getSqlite().prepare(`
    SELECT * FROM football_media ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
    ORDER BY created_at DESC,id DESC LIMIT ? OFFSET ?
  `).all(...args, limit, offset) as Row[]).map(asMedia)
}

export function mediaForEntity(kind: FootballEntityKind, entityId: number): FootballMedia[] {
  return (getSqlite().prepare(`
    SELECT DISTINCT fm.* FROM football_media fm
    JOIN football_media_link ml ON ml.media_id=fm.id
    WHERE ml.entity_kind=? AND ml.entity_id=?
    ORDER BY fm.created_at DESC,fm.id DESC
  `).all(kind, entityId) as Row[]).map(asMedia)
}

// Match-linked footage automatically rolls up to both clubs and its competition
// without copying the media row or synthesizing more links.
function derivedMediaForEntity(kind: FootballEntityKind, entityId: number): FootballMedia[] {
  const direct = mediaForEntity(kind, entityId)
  if (kind !== 'team' && kind !== 'competition' && kind !== 'person') return direct
  const derived = getSqlite().prepare(`
    SELECT DISTINCT fm.* FROM football_media fm
    JOIN football_media_link ml ON ml.media_id=fm.id AND ml.entity_kind='match'
    JOIN football_match m ON m.id=ml.entity_id
    JOIN football_season s ON s.id=m.season_id
    LEFT JOIN football_lineup fl ON fl.match_id=m.id
    WHERE (?='team' AND (m.home_team_id=? OR m.away_team_id=?))
       OR (?='competition' AND s.competition_id=?)
       OR (?='person' AND fl.person_id=?)
    ORDER BY fm.created_at DESC,fm.id DESC
  `).all(kind, entityId, entityId, kind, entityId, kind, entityId) as Row[]
  const all = new Map(direct.map((item) => [item.id, item]))
  for (const row of derived) if (!all.has(row.id as number)) all.set(row.id as number, asMedia(row))
  return [...all.values()]
}

function checkedLocalPath(input: string): string {
  const localPath = validateFootballRelativePath(input)
  const root = footballRootDir()
  if (!existsSync(root)) throw new Error('Configure an existing Football folder first')
  const abs = absoluteMediaPath(`football/${localPath}`)
  if (!existsSync(abs)) throw new Error('The selected Football media file is missing')
  const realRoot = realpathSync(root)
  const realFile = realpathSync(abs)
  const rel = relative(realRoot, realFile)
  if (rel === '..' || rel.startsWith(`..${sep}`) || resolve(realRoot, rel) !== realFile) {
    throw new Error('The file must be inside the configured Football folder')
  }
  return localPath
}

function footballEntityExists(kind: FootballEntityKind, id: number): boolean {
  const table = {
    competition: 'football_competition',
    team: 'football_team',
    person: 'football_person',
    match: 'football_match'
  }[kind]
  return !!getSqlite().prepare(`SELECT 1 FROM ${table} WHERE id=?`).get(id)
}

export function saveMedia(input: FootballMediaInput): FootballMedia {
  const title = input.title.trim()
  if (!title) throw new Error('Media title is required')
  if (!input.links.length) throw new Error('Link the attachment to at least one Football entity')
  if (input.links.some((item) => !footballEntityExists(item.entityKind, item.entityId))) {
    throw new Error('A linked Football entity no longer exists')
  }
  const localPath = input.localPath ? checkedLocalPath(input.localPath) : null
  const url = input.url ? validateFootballHttpUrl(input.url) : null
  if ((localPath == null) === (url == null)) throw new Error('Choose one local file or one HTTP(S) link')
  const db = getSqlite()
  let mediaId = input.id ?? 0
  db.transaction(() => {
    if (input.id == null) {
      const result = db.prepare(`
        INSERT INTO football_media (title,kind,local_path,url,note) VALUES (?,?,?,?,?)
      `).run(title, input.kind, localPath, url, input.note?.trim() || null)
      mediaId = Number(result.lastInsertRowid)
    } else {
      const result = db.prepare(`
        UPDATE football_media SET title=?,kind=?,local_path=?,url=?,note=?,updated_at=datetime('now')
        WHERE id=?
      `).run(title, input.kind, localPath, url, input.note?.trim() || null, input.id)
      if (!result.changes) throw new Error('Football media attachment not found')
      db.prepare(`DELETE FROM football_media_link WHERE media_id=?`).run(input.id)
    }
    const link = db.prepare(`
      INSERT OR IGNORE INTO football_media_link (media_id,entity_kind,entity_id) VALUES (?,?,?)
    `)
    for (const item of input.links) link.run(mediaId, item.entityKind, item.entityId)
  })()
  const row = db.prepare(`SELECT * FROM football_media WHERE id=?`).get(mediaId) as Row
  return asMedia(row)
}

export function removeMedia(id: number): void {
  getSqlite().prepare(`DELETE FROM football_media WHERE id=?`).run(id)
}

export function listExternalLinks(
  entityKind: FootballEntityKind,
  entityId: number
): FootballExternalLink[] {
  return (getSqlite().prepare(`
    SELECT * FROM football_external_link WHERE entity_kind=? AND entity_id=?
    ORDER BY provider,label,id
  `).all(entityKind, entityId) as Row[]).map((row) => ({
    id: row.id as number,
    entityKind: row.entity_kind as FootballEntityKind,
    entityId: row.entity_id as number,
    provider: row.provider as FootballExternalProvider,
    label: (row.label as string) ?? null,
    url: row.url as string
  }))
}

export function saveExternalLink(input: {
  id?: number
  entityKind: FootballEntityKind
  entityId: number
  provider: FootballExternalProvider
  label?: string | null
  url: string
}): FootballExternalLink {
  if (!footballEntityExists(input.entityKind, input.entityId)) {
    throw new Error('The linked Football entity no longer exists')
  }
  const url = validateFootballExternalLink(input.provider, input.url)
  const db = getSqlite()
  const existingProvider = input.id == null && input.provider === 'fotmob'
    ? db.prepare(`
        SELECT id FROM football_external_link
        WHERE entity_kind=? AND entity_id=? AND provider='fotmob' ORDER BY id LIMIT 1
      `).get(input.entityKind, input.entityId) as { id: number } | undefined
    : undefined
  let id = input.id ?? existingProvider?.id ?? 0
  if (input.id == null && existingProvider == null) {
    const result = db.prepare(`
      INSERT INTO football_external_link (entity_kind,entity_id,provider,label,url)
      VALUES (?,?,?,?,?)
    `).run(input.entityKind, input.entityId, input.provider, input.label?.trim() || null, url)
    id = Number(result.lastInsertRowid)
  } else {
    const result = db.prepare(`
      UPDATE football_external_link SET provider=?,label=?,url=?
      WHERE id=? AND entity_kind=? AND entity_id=?
    `).run(
      input.provider,
      input.label?.trim() || null,
      url,
      id,
      input.entityKind,
      input.entityId
    )
    if (!result.changes) throw new Error('Football external link not found')
  }
  const row = db.prepare(`SELECT * FROM football_external_link WHERE id=?`).get(id) as Row
  return {
    id: row.id as number,
    entityKind: row.entity_kind as FootballEntityKind,
    entityId: row.entity_id as number,
    provider: row.provider as FootballExternalProvider,
    label: (row.label as string) ?? null,
    url: row.url as string
  }
}

export function removeExternalLink(id: number): void {
  getSqlite().prepare(`DELETE FROM football_external_link WHERE id=?`).run(id)
}

// Same-name appearances for one team this close together are one career.
const SAME_CAREER_DAYS = 365 * 15

const PERSON_APPEARANCES = `
  SELECT person_id,team_id,match_id FROM football_event
  WHERE person_id IS NOT NULL AND team_id IS NOT NULL
  UNION SELECT person_id,team_id,match_id FROM football_lineup`

type Statement = Database.Statement<unknown[]>
const statementCache = new WeakMap<object, Map<string, Statement>>()

/**
 * One prepared statement per SQL text and connection. Import loops call helpers a million
 * times; preparing each time piles up native statements the garbage collector barely sees.
 */
export function cachedStatement(sql: string): Statement {
  const db = getSqlite()
  let statements = statementCache.get(db)
  if (!statements) {
    statements = new Map()
    statementCache.set(db, statements)
  }
  let statement = statements.get(sql)
  if (!statement) {
    statement = db.prepare<unknown[]>(sql)
    statements.set(sql, statement)
  }
  return statement
}

/** People with this normalized name who appeared for the team within one career span of the date. */
export function sameTeamPersonIds(normalized: string, teamId: number, matchDate: string): number[] {
  // Each branch filters by person first so the event and lineup person indexes do the work;
  // a shared appearance union here is materialized in full on every call.
  return (cachedStatement(`
    SELECT DISTINCT a.entity_id AS id FROM football_alias a
    WHERE a.entity_kind='person' AND a.normalized=@name AND (
      EXISTS(SELECT 1 FROM football_event e JOIN football_match m ON m.id=e.match_id
        WHERE e.person_id=a.entity_id AND e.team_id=@team AND abs(julianday(m.match_date)-julianday(@date))<=@days)
      OR EXISTS(SELECT 1 FROM football_lineup l JOIN football_match m ON m.id=l.match_id
        WHERE l.person_id=a.entity_id AND l.team_id=@team AND abs(julianday(m.match_date)-julianday(@date))<=@days)
    ) ORDER BY a.entity_id
  `).all({ team: teamId, date: matchDate, days: SAME_CAREER_DAYS, name: normalized }) as { id: number }[]).map((row) => row.id)
}

function sameNamePeople(personId: number): Array<{ id: number; name: string }> {
  return getSqlite().prepare(`
    SELECT DISTINCT p.id,p.name FROM football_alias mine
    JOIN football_alias other ON other.entity_kind='person' AND other.normalized=mine.normalized
    JOIN football_person p ON p.id=other.entity_id
    WHERE mine.entity_kind='person' AND mine.entity_id=? AND p.id<>?
    ORDER BY p.id
  `).all(personId, personId) as Array<{ id: number; name: string }>
}

function conflictPeople(personId: number): {
  subject: FootballConflictCandidate | null
  candidates: FootballConflictCandidate[]
} {
  const db = getSqlite()
  const describe = (id: number, name: string): FootballConflictCandidate => {
    const spans = db.prepare(`
      SELECT t.name AS team, MIN(m.match_date) AS first, MAX(m.match_date) AS last
      FROM (
        SELECT team_id,match_id FROM football_event WHERE person_id=@person AND team_id IS NOT NULL
        UNION SELECT team_id,match_id FROM football_lineup WHERE person_id=@person
      ) x
      JOIN football_team t ON t.id=x.team_id JOIN football_match m ON m.id=x.match_id
      GROUP BY t.id ORDER BY COUNT(*) DESC
    `).all({ person: id }) as Array<{ team: string; first: string; last: string }>
    const years = spans.flatMap((span) => [Number(span.first.slice(0, 4)), Number(span.last.slice(0, 4))])
    return {
      id,
      name,
      teams: spans.slice(0, 3).map((span) => span.team),
      firstYear: years.length ? Math.min(...years) : null,
      lastYear: years.length ? Math.max(...years) : null
    }
  }
  const subject = db.prepare(`SELECT id,name FROM football_person WHERE id=?`).get(personId) as
    | { id: number; name: string }
    | undefined
  if (!subject) return { subject: null, candidates: [] }
  return {
    subject: describe(subject.id, subject.name),
    candidates: sameNamePeople(personId).slice(0, 8).map((other) => describe(other.id, other.name))
  }
}

// Candidate details cost a few queries per row and the Sync page polls during installs.
const DETAILED_CONFLICTS = 100

export function listConflicts(): FootballConflict[] {
  let detailed = 0
  return (getSqlite().prepare(`
    SELECT fc.*,
      CASE fc.entity_kind
        WHEN 'competition' THEN (SELECT name FROM football_competition WHERE id=fc.entity_id)
        WHEN 'season' THEN (SELECT label FROM football_season WHERE id=fc.entity_id)
        WHEN 'team' THEN (SELECT name FROM football_team WHERE id=fc.entity_id)
        WHEN 'person' THEN (SELECT name FROM football_person WHERE id=fc.entity_id)
        WHEN 'match' THEN (SELECT title FROM football_match WHERE id=fc.entity_id)
      END AS entity_label
    FROM football_conflict fc ORDER BY CASE status WHEN 'open' THEN 0 ELSE 1 END, created_at DESC
  `).all() as Row[]).map((row) => ({
    id: row.id as number,
    entityKind: row.entity_kind as string,
    entityId: (row.entity_id as number) ?? null,
    entityLabel: (row.entity_label as string) ?? null,
    facet: row.facet as string,
    sourceA: row.source_a as FootballConflict['sourceA'],
    valueA: (row.value_a as string) ?? null,
    sourceB: row.source_b as FootballConflict['sourceB'],
    valueB: (row.value_b as string) ?? null,
    status: row.status as FootballConflict['status'],
    resolution: (row.resolution as string) ?? null,
    createdAt: row.created_at as string,
    ...(row.entity_kind === 'person' && row.facet === 'identity' && row.status === 'open' &&
      row.entity_id != null && detailed++ < DETAILED_CONFLICTS
      ? conflictPeople(row.entity_id as number)
      : { subject: null, candidates: [] })
  }))
}

function movePolymorphicFootballRows(
  entityKind: 'team' | 'person',
  sourceId: number,
  targetId: number
): void {
  const db = getSqlite()
  db.prepare(`INSERT OR IGNORE INTO football_favorite (entity_kind,entity_id)
    SELECT entity_kind,? FROM football_favorite WHERE entity_kind=? AND entity_id=?`
  ).run(targetId, entityKind, sourceId)
  db.prepare(`DELETE FROM football_favorite WHERE entity_kind=? AND entity_id=?`).run(
    entityKind,
    sourceId
  )
  for (const table of ['football_media_link', 'football_external_link', 'football_article']) {
    db.prepare(`UPDATE OR IGNORE ${table} SET entity_id=? WHERE entity_kind=? AND entity_id=?`).run(
      targetId,
      entityKind,
      sourceId
    )
    db.prepare(`DELETE FROM ${table} WHERE entity_kind=? AND entity_id=?`).run(entityKind, sourceId)
  }
  const listKind = entityKind === 'team' ? 'footballTeam' : 'footballPerson'
  db.prepare(`UPDATE OR IGNORE list_item SET entity_id=?
    WHERE entity_id=? AND list_id IN (SELECT id FROM list WHERE entity_kind=?)`).run(
    targetId,
    sourceId,
    listKind
  )
  db.prepare(`DELETE FROM list_item
    WHERE entity_id=? AND list_id IN (SELECT id FROM list WHERE entity_kind=?)`).run(
    sourceId,
    listKind
  )
  db.prepare(`UPDATE football_alias SET entity_id=? WHERE entity_kind=? AND entity_id=?`).run(
    targetId,
    entityKind,
    sourceId
  )
  db.prepare(`UPDATE football_source_ref SET entity_id=? WHERE entity_kind=? AND entity_id=?`).run(
    targetId,
    entityKind,
    sourceId
  )
  db.prepare(`UPDATE OR IGNORE football_assertion SET entity_id=?
    WHERE entity_kind=? AND entity_id=?`).run(targetId, entityKind, sourceId)
  db.prepare(`DELETE FROM football_assertion WHERE entity_kind=? AND entity_id=?`).run(
    entityKind,
    sourceId
  )
  db.prepare(`UPDATE football_conflict SET entity_id=? WHERE entity_kind=? AND entity_id=?`).run(
    targetId,
    entityKind,
    sourceId
  )
}

function mergeFootballEntity(
  entityKind: 'team' | 'person',
  sourceId: number,
  targetId: number
): void {
  if (!Number.isInteger(targetId) || targetId <= 0 || targetId === sourceId) {
    throw new Error('Choose a different valid Football entity to merge into')
  }
  const db = getSqlite()
  const table = entityKind === 'team' ? 'football_team' : 'football_person'
  if (!db.prepare(`SELECT 1 FROM ${table} WHERE id=?`).get(targetId)) {
    throw new Error(`Football ${entityKind} ${targetId} was not found`)
  }
  if (entityKind === 'team') {
    const selfMatch = db.prepare(`SELECT 1 FROM football_match WHERE
      (home_team_id=? AND away_team_id=?) OR (home_team_id=? AND away_team_id=?) LIMIT 1`
    ).get(sourceId, targetId, targetId, sourceId)
    if (selfMatch) throw new Error('These teams oppose each other in a stored match and cannot be merged')
    db.prepare(`UPDATE football_team SET
      short_name=COALESCE(short_name,(SELECT short_name FROM football_team WHERE id=?)),
      country=COALESCE(country,(SELECT country FROM football_team WHERE id=?)),
      founded_year=COALESCE(founded_year,(SELECT founded_year FROM football_team WHERE id=?)),
      bio=COALESCE(bio,(SELECT bio FROM football_team WHERE id=?)),
      image_path=COALESCE(image_path,(SELECT image_path FROM football_team WHERE id=?)),
      primary_color=COALESCE(primary_color,(SELECT primary_color FROM football_team WHERE id=?)),
      secondary_color=COALESCE(secondary_color,(SELECT secondary_color FROM football_team WHERE id=?)),
      venue=COALESCE(venue,(SELECT venue FROM football_team WHERE id=?)),
      venue_capacity=COALESCE(venue_capacity,(SELECT venue_capacity FROM football_team WHERE id=?)),
      updated_at=datetime('now') WHERE id=?`
    ).run(...Array<number>(9).fill(sourceId), targetId)
    db.prepare(`UPDATE football_tenure SET team_id=? WHERE team_id=?`).run(targetId, sourceId)
    db.prepare(`UPDATE football_match SET home_team_id=? WHERE home_team_id=?`).run(targetId, sourceId)
    db.prepare(`UPDATE football_match SET away_team_id=? WHERE away_team_id=?`).run(targetId, sourceId)
    db.prepare(`UPDATE OR IGNORE football_lineup SET team_id=? WHERE team_id=?`).run(targetId, sourceId)
    db.prepare(`DELETE FROM football_lineup WHERE team_id=?`).run(sourceId)
    db.prepare(`UPDATE football_event SET team_id=? WHERE team_id=?`).run(targetId, sourceId)
    db.prepare(`UPDATE OR IGNORE football_standing SET team_id=? WHERE team_id=?`).run(targetId, sourceId)
    db.prepare(`DELETE FROM football_standing WHERE team_id=?`).run(sourceId)
    db.prepare(`UPDATE football_honour SET team_id=? WHERE team_id=?`).run(targetId, sourceId)
    db.prepare(`UPDATE football_transfer SET from_team_id=? WHERE from_team_id=?`).run(targetId, sourceId)
    db.prepare(`UPDATE football_transfer SET to_team_id=? WHERE to_team_id=?`).run(targetId, sourceId)
  } else {
    db.prepare(`UPDATE football_person SET
      role=CASE WHEN role=(SELECT role FROM football_person WHERE id=?) THEN role ELSE 'both' END,
      birth_date=COALESCE(birth_date,(SELECT birth_date FROM football_person WHERE id=?)),
      death_date=COALESCE(death_date,(SELECT death_date FROM football_person WHERE id=?)),
      nationality=COALESCE(nationality,(SELECT nationality FROM football_person WHERE id=?)),
      bio=COALESCE(bio,(SELECT bio FROM football_person WHERE id=?)),
      image_path=COALESCE(image_path,(SELECT image_path FROM football_person WHERE id=?)),
      position=COALESCE(position,(SELECT position FROM football_person WHERE id=?)),
      height_cm=COALESCE(height_cm,(SELECT height_cm FROM football_person WHERE id=?)),
      birth_place=COALESCE(birth_place,(SELECT birth_place FROM football_person WHERE id=?)),
      foot=COALESCE(foot,(SELECT foot FROM football_person WHERE id=?)),
      quiz_pack=MAX(quiz_pack,(SELECT quiz_pack FROM football_person WHERE id=?)),
      updated_at=datetime('now') WHERE id=?`
    ).run(...Array<number>(11).fill(sourceId), targetId)
    db.prepare(`UPDATE football_tenure SET person_id=? WHERE person_id=?`).run(targetId, sourceId)
    db.prepare(`UPDATE OR IGNORE football_lineup SET person_id=? WHERE person_id=?`).run(targetId, sourceId)
    db.prepare(`DELETE FROM football_lineup WHERE person_id=?`).run(sourceId)
    db.prepare(`UPDATE football_event SET person_id=? WHERE person_id=?`).run(targetId, sourceId)
    db.prepare(`UPDATE football_event SET related_person_id=? WHERE related_person_id=?`).run(
      targetId,
      sourceId
    )
    db.prepare(`UPDATE football_honour SET person_id=? WHERE person_id=?`).run(targetId, sourceId)
    db.prepare(`UPDATE football_transfer SET person_id=? WHERE person_id=?`).run(targetId, sourceId)
  }
  movePolymorphicFootballRows(entityKind, sourceId, targetId)
  db.prepare(`DELETE FROM ${table} WHERE id=?`).run(sourceId)
}

function acceptedMatchResult(raw: string | null): Record<string, unknown> {
  if (!raw) throw new Error('The selected source has no stored result assertion')
  const parsed = JSON.parse(raw) as Record<string, unknown>
  if (!parsed || typeof parsed !== 'object') throw new Error('The stored result assertion is invalid')
  return parsed
}

export function reconcileMatchResultConflicts(matchId: number, applyConsensus = false): void {
  const db = getSqlite()
  const match = db.prepare(`SELECT season_id AS seasonId FROM football_match WHERE id=?`).get(
    matchId
  ) as { seasonId: number } | undefined
  if (!match) return
  if (applyConsensus) {
    const assertions = db.prepare(`SELECT DISTINCT value FROM football_assertion
      WHERE entity_kind='match' AND entity_id=? AND facet='result' AND value IS NOT NULL
      LIMIT 2`).all(matchId) as Array<{ value: string }>
    if (assertions.length === 1) {
      const selected = acceptedMatchResult(assertions[0].value)
      db.prepare(`UPDATE football_match SET
        status=?,home_score=?,away_score=?,home_halftime=?,away_halftime=?,
        home_extra_time=?,away_extra_time=?,home_penalties=?,away_penalties=?,
        updated_at=datetime('now') WHERE id=?`).run(
        selected.status,
        selected.homeScore ?? null,
        selected.awayScore ?? null,
        selected.homeHalftime ?? null,
        selected.awayHalftime ?? null,
        selected.homeExtraTime ?? null,
        selected.awayExtraTime ?? null,
        selected.homePenalties ?? null,
        selected.awayPenalties ?? null,
        matchId
      )
    }
  }
  db.prepare(`UPDATE football_match SET conflicted=CASE WHEN EXISTS(
    SELECT 1 FROM football_conflict c WHERE c.entity_kind='match'
      AND c.entity_id=football_match.id AND c.facet='result' AND c.status<>'resolved'
    ) THEN 1 ELSE 0 END WHERE id=?`).run(matchId)
  db.prepare(`UPDATE football_coverage SET state='complete',note=NULL
    WHERE season_id=? AND facet='results' AND state='conflicted'
      AND NOT EXISTS(
        SELECT 1 FROM football_conflict c
        JOIN football_match m ON m.id=c.entity_id
        WHERE c.entity_kind='match' AND c.facet='result' AND c.status<>'resolved'
          AND m.season_id=football_coverage.season_id
          AND (c.source_a=football_coverage.source OR c.source_b=football_coverage.source)
      )`).run(match.seasonId)
}

export function resolveConflict(id: number, resolution: FootballConflictResolution): void {
  const db = getSqlite()
  db.transaction(() => {
    const conflict = db.prepare(`SELECT * FROM football_conflict WHERE id=?`).get(id) as Row | undefined
    if (!conflict) throw new Error('Football conflict not found')
    if (conflict.status === 'resolved') return
    if (resolution.action === 'ignore') {
      db.prepare(`UPDATE football_conflict SET status='ignored',resolution='Ignored; remains quarantined',
        resolved_at=datetime('now') WHERE id=?`).run(id)
      return
    }
    if (conflict.facet === 'result' &&
        (resolution.action === 'acceptSourceA' || resolution.action === 'acceptSourceB')) {
      const selected = acceptedMatchResult(
        (resolution.action === 'acceptSourceA' ? conflict.value_a : conflict.value_b) as string | null
      )
      db.prepare(`UPDATE football_match SET
        status=?,home_score=?,away_score=?,home_halftime=?,away_halftime=?,
        home_extra_time=?,away_extra_time=?,home_penalties=?,away_penalties=?,
        updated_at=datetime('now') WHERE id=?`).run(
        selected.status,
        selected.homeScore ?? null,
        selected.awayScore ?? null,
        selected.homeHalftime ?? null,
        selected.awayHalftime ?? null,
        selected.homeExtraTime ?? null,
        selected.awayExtraTime ?? null,
        selected.homePenalties ?? null,
        selected.awayPenalties ?? null,
        conflict.entity_id
      )
      db.prepare(`UPDATE football_conflict SET status='resolved',resolution=?,
        resolved_at=datetime('now') WHERE id=?`).run(
        resolution.action === 'acceptSourceA' ? 'Accepted source A' : 'Accepted source B',
        id
      )
      reconcileMatchResultConflicts(conflict.entity_id as number)
      return
    }
    if (conflict.facet === 'identity' && resolution.action === 'mergeEntity') {
      if (conflict.entity_kind !== 'team' && conflict.entity_kind !== 'person') {
        throw new Error('Only Football teams and people can be merged')
      }
      mergeFootballEntity(
        conflict.entity_kind,
        conflict.entity_id as number,
        resolution.targetEntityId
      )
      db.prepare(`UPDATE football_conflict SET status='resolved',resolution=?,
        resolved_at=datetime('now') WHERE id=?`).run(
        `Merged into ${conflict.entity_kind} ${resolution.targetEntityId}`,
        id
      )
      return
    }
    if (conflict.facet === 'identity' && resolution.action === 'keepSeparate') {
      db.prepare(`UPDATE football_conflict SET status='resolved',resolution='Confirmed separate identities',
        resolved_at=datetime('now') WHERE id=?`).run(id)
      return
    }
    throw new Error('That resolution does not apply to this Football conflict')
  })()
}

/** Moves a duplicate match's personal and source rows onto its twin, then deletes the duplicate. */
function foldMatch(duplicateId: number, twinId: number): void {
  const db = getSqlite()
  db.prepare(`UPDATE OR IGNORE football_match_journal SET match_id=? WHERE match_id=?`).run(twinId, duplicateId)
  for (const table of ['football_favorite', 'football_media_link', 'football_external_link', 'football_article',
    'football_source_ref', 'football_assertion', 'football_conflict']) {
    db.prepare(`UPDATE OR IGNORE ${table} SET entity_id=? WHERE entity_kind='match' AND entity_id=?`).run(twinId, duplicateId)
    db.prepare(`DELETE FROM ${table} WHERE entity_kind='match' AND entity_id=?`).run(duplicateId)
  }
  db.prepare(`UPDATE OR IGNORE list_item SET entity_id=? WHERE entity_id=?
    AND list_id IN (SELECT id FROM list WHERE entity_kind='footballMatch')`).run(twinId, duplicateId)
  for (const table of ['football_event', 'football_lineup']) {
    db.prepare(`UPDATE ${table} SET match_id=? WHERE match_id=?
      AND NOT EXISTS(SELECT 1 FROM ${table} WHERE match_id=?)`).run(twinId, duplicateId, twinId)
  }
  db.prepare(`DELETE FROM list_item WHERE entity_id=?
    AND list_id IN (SELECT id FROM list WHERE entity_kind='footballMatch')`).run(duplicateId)
  db.prepare(`DELETE FROM football_match WHERE id=?`).run(duplicateId)
}

/**
 * Folds seasons keyed `2012-13` (an OpenFootball import before keys were normalised) into
 * their `2012/13` twin: duplicate matches merge into the twin with every personal row, the
 * rest move across, and a season without a twin is renamed. Returns the seasons folded.
 */
export function mergeDuplicateSeasons(): number {
  const db = getSqlite()
  const hyphenated = db.prepare(`SELECT id, competition_id AS competitionId, key FROM football_season
    WHERE key GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]'`).all() as Array<{ id: number; competitionId: number; key: string }>
  for (const season of hyphenated) {
    const key = season.key.replace('-', '/')
    db.transaction(() => {
      const twin = db.prepare(`SELECT id FROM football_season WHERE competition_id=? AND key=?`).get(season.competitionId, key) as
        | { id: number }
        | undefined
      if (!twin) {
        db.prepare(`UPDATE football_season SET key=?,label=?,updated_at=datetime('now') WHERE id=?`).run(key, key, season.id)
        return
      }
      for (const stage of db.prepare(`SELECT id,key FROM football_stage WHERE season_id=?`).all(season.id) as Array<{ id: number; key: string }>) {
        const same = db.prepare(`SELECT id FROM football_stage WHERE season_id=? AND key=?`).get(twin.id, stage.key) as { id: number } | undefined
        if (same) db.prepare(`UPDATE football_match SET stage_id=? WHERE stage_id=?`).run(same.id, stage.id)
        else db.prepare(`UPDATE football_stage SET season_id=? WHERE id=?`).run(twin.id, stage.id)
      }
      const matches = db.prepare(`SELECT id, match_date AS date, home_team_id AS home, away_team_id AS away
        FROM football_match WHERE season_id=?`).all(season.id) as Array<{ id: number; date: string; home: number; away: number }>
      for (const match of matches) {
        const duplicate = db.prepare(`SELECT id FROM football_match WHERE season_id=? AND home_team_id=? AND away_team_id=?
          AND abs(julianday(match_date)-julianday(?))<=1 LIMIT 1`).get(twin.id, match.home, match.away, match.date) as
          | { id: number }
          | undefined
        if (duplicate) foldMatch(match.id, duplicate.id)
        else db.prepare(`UPDATE football_match SET season_id=? WHERE id=?`).run(twin.id, match.id)
      }
      db.prepare(`DELETE FROM football_season WHERE id=?`).run(season.id)
    })()
  }
  return hyphenated.length
}

/**
 * Collapses people split by the old season-scoped scorer identity: same name, same team,
 * appearances within one career span. Removes people nothing refers to any more (a source
 * replaced a match's scorers, leaving the old scorer behind),
 * then closes identity conflicts that no longer have another person with the name.
 */
export function repairPersonIdentities(): FootballIdentityRepair {
  const db = getSqlite()
  const settled = new Set((db.prepare(`
    SELECT DISTINCT entity_id AS id FROM football_conflict
    WHERE entity_kind='person' AND facet='identity' AND entity_id IS NOT NULL
      AND (status='ignored' OR resolution='Confirmed separate identities')
  `).all() as { id: number }[]).map((row) => row.id))
  const spans = new Map<number, Map<number, [number, number]>>()
  for (const row of db.prepare(`
    SELECT x.person_id AS personId,x.team_id AS teamId,
      MIN(julianday(m.match_date)) AS first,MAX(julianday(m.match_date)) AS last
    FROM (${PERSON_APPEARANCES}) x JOIN football_match m ON m.id=x.match_id
    GROUP BY x.person_id,x.team_id
  `).all() as Array<{ personId: number; teamId: number; first: number; last: number }>) {
    const teams = spans.get(row.personId) ?? new Map<number, [number, number]>()
    teams.set(row.teamId, [row.first, row.last])
    spans.set(row.personId, teams)
  }
  const sameCareer = (a: number, b: number): boolean => {
    const teamsA = spans.get(a)
    const teamsB = spans.get(b)
    if (!teamsA || !teamsB) return false
    for (const [teamId, [firstA, lastA]] of teamsA) {
      const span = teamsB.get(teamId)
      if (span && Math.max(0, span[0] - lastA, firstA - span[1]) <= SAME_CAREER_DAYS) return true
    }
    return false
  }
  const births = new Map((db.prepare(`
    SELECT id,birth_date AS birthDate FROM football_person WHERE birth_date GLOB '[12][0-9][0-9][0-9]*'
  `).all() as Array<{ id: number; birthDate: string }>).map((row) => [row.id, row.birthDate]))
  const firstPlayed = (id: number): number | null => {
    const teams = spans.get(id)
    return teams ? Math.min(...[...teams.values()].map(([first]) => first)) : null
  }
  const julian = (birthDate: string): number =>
    Date.parse(`${birthDate.slice(0, 4)}-01-01T00:00:00Z`) / 86_400_000 + 2_440_587.5
  const differentPeople = (a: number, b: number): boolean => {
    const [birthA, birthB] = [births.get(a), births.get(b)]
    if (birthA && birthB) return birthA.length >= 10 && birthB.length >= 10 ? birthA.slice(0, 10) !== birthB.slice(0, 10) : birthA.slice(0, 4) !== birthB.slice(0, 4)
    const [born, other] = birthA ? [birthA, b] : birthB ? [birthB, a] : [null, null]
    const played = other == null ? null : firstPlayed(other)
    return born != null && played != null && played < julian(born) + 15 * 365
  }

  const nationality = new Map((db.prepare(`
    SELECT id,nationality FROM football_person WHERE nationality IS NOT NULL
  `).all() as Array<{ id: number; nationality: string }>).map((row) => [row.id, normalizeFootballName(row.nationality)]))
  const nationalTeams = new Map((db.prepare(`SELECT id,name FROM football_team WHERE is_national=1`)
    .all() as Array<{ id: number; name: string }>).map((row) => [row.id, normalizeFootballName(row.name)]))
  const playsFor = (id: number, nation: string | undefined): boolean =>
    !!nation && [...(spans.get(id)?.keys() ?? [])].some((teamId) => nationalTeams.get(teamId) === nation)
  const sameNation = (a: number, b: number): boolean =>
    playsFor(b, nationality.get(a)) || playsFor(a, nationality.get(b))

  const byName = new Map<string, number[]>()
  for (const row of db.prepare(`
    SELECT DISTINCT a.normalized,a.entity_id AS id FROM football_alias a
    JOIN football_person p ON p.id=a.entity_id WHERE a.entity_kind='person'
  `).all() as Array<{ normalized: string; id: number }>) {
    if (settled.has(row.id)) continue
    byName.set(row.normalized, [...(byName.get(row.normalized) ?? []), row.id])
  }
  const parent = new Map<number, number>()
  const root = (id: number): number => {
    let current = id
    while (parent.has(current)) current = parent.get(current)!
    return current
  }
  // Pairs join whole sets, so a namesake bridging two provably different people must not.
  const members = new Map<number, number[]>()
  const join = (x: number, y: number) => {
    const [a, b] = [root(x), root(y)]
    if (a === b) return
    const [setA, setB] = [members.get(a) ?? [a], members.get(b) ?? [b]]
    if (setA.some((m) => setB.some((n) => differentPeople(m, n)))) return
    const [keep, fold] = [Math.min(a, b), Math.max(a, b)]
    parent.set(fold, keep)
    members.set(keep, [...setA, ...setB])
    members.delete(fold)
  }
  for (const ids of byName.values()) {
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        if (sameCareer(ids[i], ids[j]) && !differentPeople(ids[i], ids[j])) join(ids[i], ids[j])
      }
    }
    // A club player and a namesake who played for their national team are one person
    // when no other namesake fits either way.
    for (const id of ids) {
      const fits = ids.filter((other) => other !== id && sameNation(id, other) && !differentPeople(id, other))
      if (fits.length === 1 && ids.filter((other) => other !== fits[0] && sameNation(fits[0], other)
        && !differentPeople(fits[0], other)).length === 1) join(id, fits[0])
    }
  }
  let merged = 0
  for (const id of [...parent.keys()].sort((a, b) => b - a)) {
    db.transaction(() => mergeFootballEntity('person', id, root(id)))()
    merged++
  }

  const orphans = (db.prepare(`
    SELECT p.id FROM football_person p
    WHERE p.quiz_pack=0 AND p.bio IS NULL AND p.image_path IS NULL
      AND NOT EXISTS(SELECT 1 FROM football_event e WHERE e.person_id=p.id)
      AND NOT EXISTS(SELECT 1 FROM football_event e WHERE e.related_person_id=p.id)
      AND NOT EXISTS(SELECT 1 FROM football_lineup l WHERE l.person_id=p.id)
      AND NOT EXISTS(SELECT 1 FROM football_tenure t WHERE t.person_id=p.id)
      AND NOT EXISTS(SELECT 1 FROM football_honour h WHERE h.person_id=p.id)
      AND NOT EXISTS(SELECT 1 FROM football_assertion a WHERE a.entity_kind='person' AND a.entity_id=p.id)
      ${['football_favorite', 'football_media_link', 'football_external_link', 'football_article']
        .map((table) => `AND NOT EXISTS(SELECT 1 FROM ${table} r
          WHERE r.entity_kind='person' AND r.entity_id=p.id)`).join('\n')}
      AND NOT EXISTS(SELECT 1 FROM list_item li JOIN list l ON l.id=li.list_id
        WHERE l.entity_kind='footballPerson' AND li.entity_id=p.id)
  `).all() as { id: number }[]).filter((row) => !settled.has(row.id))
  db.transaction(() => {
    for (const { id } of orphans) {
      for (const table of ['football_alias', 'football_source_ref', 'football_conflict']) {
        db.prepare(`DELETE FROM ${table} WHERE entity_kind='person' AND entity_id=?`).run(id)
      }
      db.prepare(`DELETE FROM football_person WHERE id=?`).run(id)
    }
  })()

  let resolved = 0
  db.transaction(() => {
    const open = db.prepare(`
      SELECT id,entity_id AS personId FROM football_conflict
      WHERE entity_kind='person' AND facet='identity' AND status='open' ORDER BY id
    `).all() as Array<{ id: number; personId: number | null }>
    const close = db.prepare(`UPDATE football_conflict SET status='resolved',resolution=?,
      resolved_at=datetime('now') WHERE id=?`)
    const seen = new Set<number>()
    for (const conflict of open) {
      const sameName = conflict.personId == null ? [] : sameNamePeople(conflict.personId)
      const others = sameName.filter((other) => !differentPeople(conflict.personId!, other.id))
      const reason = conflict.personId == null || seen.has(conflict.personId)
        ? 'Duplicate identity conflict'
        : sameName.length === 0 ? 'No other person carries this name'
        : others.length === 0 ? 'Same name, different birth years or eras' : null
      if (conflict.personId != null) seen.add(conflict.personId)
      if (reason) {
        close.run(reason, conflict.id)
        resolved++
      } else {
        db.prepare(`UPDATE football_conflict SET value_b=? WHERE id=?`).run(
          `Possible matches: ${others.map((other) => other.id).join(',')}`,
          conflict.id
        )
      }
    }
  })()
  return { merged, removed: orphans.length, resolved }
}

export function syncOverview(status: FootballSyncOverview['status']): FootballSyncOverview {
  const db = getSqlite()
  const entitlementRows = db.prepare(`
    SELECT key,value FROM settings WHERE key LIKE 'football.entitlement.%'
  `).all() as { key: string; value: string }[]
  const entitlements = entitlementRows.flatMap((row) => {
    try {
      return [JSON.parse(row.value)]
    } catch {
      return []
    }
  })
  const lastRuns = (db.prepare(`
    SELECT id,kind,source,state,started_at,finished_at,item_count,message
    FROM football_import_run ORDER BY id DESC LIMIT 30
  `).all() as Row[]).map((row) => ({
    id: row.id as number,
    kind: row.kind as FootballSyncOverview['lastRuns'][number]['kind'],
    source: row.source as FootballSyncOverview['lastRuns'][number]['source'],
    state: row.state as string,
    startedAt: row.started_at as string,
    finishedAt: (row.finished_at as string) ?? null,
    itemCount: row.item_count as number,
    message: (row.message as string) ?? null
  }))
  const eligible = db.prepare(`
    SELECT COUNT(*) AS n FROM football_person p WHERE p.quiz_pack=1 AND p.role IN ('player','both')
  `).get() as { n: number }
  const counts = db.prepare(`SELECT COUNT(*) AS n FROM football_match`).get() as { n: number }
  return {
    installed: counts.n > 0,
    status,
    quota: quota(),
    entitlements,
    coverage: coverageFor(),
    conflicts: listConflicts(),
    playerQuizEligible: eligible.n,
    playerQuizTarget: 250,
    setup: setupState(),
    artwork: db.prepare(`
      SELECT
        (SELECT COUNT(*) FROM football_competition WHERE image_path IS NOT NULL) AS competitionsWithLogo,
        (SELECT COUNT(*) FROM football_team) AS teams,
        (SELECT COUNT(*) FROM football_team WHERE image_path IS NOT NULL) AS teamsWithCrest,
        (SELECT COUNT(*) FROM football_team WHERE primary_color IS NOT NULL) AS teamsWithColors,
        (SELECT COUNT(*) FROM football_person WHERE image_path IS NOT NULL) AS peopleWithPortrait
    `).get() as FootballSyncOverview['artwork'],
    lastRuns
  }
}
