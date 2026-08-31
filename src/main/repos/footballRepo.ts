import { existsSync, realpathSync } from 'fs'
import { relative, resolve, sep } from 'path'
import { getSqlite } from '../db/connection'
import { absoluteMediaPath, footballRootDir } from '../files'
import {
  FOOTBALL_COMPETITIONS,
  FOOTBALL_ERAS,
  escapeFootballLike,
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
  FootballCoverage,
  FootballCurrentSnapshot,
  FootballEntityFilter,
  FootballEntityKind,
  FootballExternalLink,
  FootballExternalProvider,
  FootballHonour,
  FootballJournalInput,
  FootballLineupEntry,
  FootballMatchDetail,
  FootballMatchEvent,
  FootballMatchFilter,
  FootballMatchSummary,
  FootballMedia,
  FootballMediaInput,
  FootballOverview,
  FootballPersonDetail,
  FootballPersonSummary,
  FootballQuota,
  FootballSearchResults,
  FootballSeason,
  FootballSeasonDetail,
  FootballStanding,
  FootballSyncOverview,
  FootballTeamDetail,
  FootballTeamSummary,
  FootballTenure
} from '@shared/types'

type Row = Record<string, unknown>

const TEAM_SELECT = `
  t.id AS team_id, t.name AS team_name, t.short_name AS team_short_name,
  t.country AS team_country, t.is_national AS team_is_national,
  t.image_path AS team_image_path,
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
  ht.name AS home_name, ht.short_name AS home_short_name, ht.country AS home_country,
  ht.is_national AS home_is_national, ht.image_path AS home_image_path,
  EXISTS(SELECT 1 FROM football_favorite f
         WHERE f.entity_kind='team' AND f.entity_id=ht.id) AS home_favorite,
  at.name AS away_name, at.short_name AS away_short_name, at.country AS away_country,
  at.is_national AS away_is_national, at.image_path AS away_image_path,
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
        ORDER BY COALESCE(start_date, key) DESC LIMIT 1) AS latest_season
    FROM football_competition c
    ORDER BY c.id
  `).all() as Row[]
  return rows.map((row) => ({
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
    latestSeason: (row.latest_season as string) ?? null
  }))
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
    SELECT h.*, s.label AS season_label,
      t.id AS team_id_value, t.name AS team_name, t.short_name AS team_short_name,
      t.country AS team_country, t.is_national AS team_is_national,
      t.image_path AS team_image_path,
      EXISTS(SELECT 1 FROM football_favorite f WHERE f.entity_kind='team' AND f.entity_id=t.id)
        AS team_favorite,
      p.id AS person_id_value, p.name AS person_name, p.role AS person_role,
      p.nationality AS person_nationality, p.image_path AS person_image_path,
      p.enrichment_state AS person_enrichment_state, p.quiz_pack AS person_quiz_pack,
      EXISTS(SELECT 1 FROM football_favorite f WHERE f.entity_kind='person' AND f.entity_id=p.id)
        AS person_favorite
    FROM football_honour h
    LEFT JOIN football_season s ON s.id=h.season_id
    LEFT JOIN football_team t ON t.id=h.team_id
    LEFT JOIN football_person p ON p.id=h.person_id
    WHERE ${whereSql}=?
    ORDER BY COALESCE(s.start_date, ''), h.sort_order, h.id
  `).all(value) as Row[]
  return rows.map((row) => ({
    id: row.id as number,
    competitionId: row.competition_id as number,
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
      EXISTS(SELECT 1 FROM football_favorite f WHERE f.entity_kind='team' AND f.entity_id=wt.id)
        AS winner_favorite,
      rt.id AS runner_id, rt.name AS runner_name, rt.short_name AS runner_short_name,
      rt.country AS runner_country, rt.is_national AS runner_is_national,
      rt.image_path AS runner_image_path,
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
    coverage: coverageFor(competition.id),
    article: articleFor('competition', competition.id)
  }
}

function standingsFor(seasonId: number): FootballStanding[] {
  const rows = getSqlite().prepare(`
    SELECT fs.*, ${TEAM_SELECT}
    FROM football_standing fs JOIN football_team t ON t.id=fs.team_id
    WHERE fs.season_id=?
    ORDER BY CASE WHEN fs.rank IS NULL THEN 1 ELSE 0 END, fs.rank, fs.points DESC,
      fs.goal_difference DESC, t.name
  `).all(seasonId) as Row[]
  return rows.map((row) => ({
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
    note: (row.note as string) ?? null
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
    ORDER BY t.name LIMIT ? OFFSET ?
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
    bio: (row.bio as string) ?? null,
    enrichmentState: row.enrichment_state as FootballTeamDetail['enrichmentState'],
    tenures: tenuresFor(undefined, id),
    honours: honoursFor('h.team_id', id),
    matches: listMatches({ teamId: id, limit: 200 }),
    seasonRecords: (getSqlite().prepare(`
      SELECT fs.*, ${TEAM_SELECT} FROM football_standing fs
      JOIN football_team t ON t.id=fs.team_id WHERE fs.team_id=?
      ORDER BY fs.season_id DESC
    `).all(id) as Row[]).map((standing) => ({
      team: asTeam(standing, 'team_'),
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
      note: (standing.note as string) ?? null
    })),
    media: derivedMediaForEntity('team', id),
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
    ORDER BY p.name LIMIT ? OFFSET ?
  `).all(...args, limit, offset) as Row[]
  return rows.map((row) => asPerson(row, 'person_'))
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
    deathDate: (row.death_date as string) ?? null,
    bio: (row.bio as string) ?? null,
    tenures: tenuresFor(id),
    honours: honoursFor('h.person_id', id),
    appearances: (getSqlite().prepare(`
      SELECT DISTINCT ${MATCH_SELECT} ${MATCH_FROM}
      JOIN football_lineup fl ON fl.match_id=m.id
      WHERE fl.person_id=? ORDER BY m.match_date DESC LIMIT 200
    `).all(id) as Row[]).map(asMatch),
    media: derivedMediaForEntity('person', id),
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
    ORDER BY m.match_date DESC, COALESCE(m.kickoff_at,''), m.id DESC LIMIT ? OFFSET ?
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
    competitions,
    currentMatches: listMatches({ dateFrom: today, dateTo: today, limit: 100 }),
    recentJournal: listMatches({ watchedOnly: true, limit: 8 }),
    recentMedia: listMedia({ limit: 8 }),
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

export function listConflicts(): FootballConflict[] {
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
    createdAt: row.created_at as string
  }))
}

export function resolveConflict(
  id: number,
  status: 'resolved' | 'ignored',
  resolution?: string | null
): void {
  getSqlite().prepare(`
    UPDATE football_conflict SET status=?,resolution=?,resolved_at=datetime('now') WHERE id=?
  `).run(status, resolution?.trim() || null, id)
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
    lastRuns
  }
}
