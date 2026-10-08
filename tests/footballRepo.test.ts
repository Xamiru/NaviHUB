import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database

vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('../src/main/files', () => ({
  footballRootDir: () => '/tmp/navihub-football-test',
  absoluteMediaPath: (value: string) => `/tmp/navihub-football-test/${value.replace(/^football\//, '')}`,
  downloadImage: vi.fn(async () => null),
  cachedDownload: vi.fn(() => null)
}))

import * as football from '../src/main/repos/footballRepo'
import { saveWikimediaSnapshot } from '../src/main/football/wikimedia'
import { footballCoreName } from '../src/shared/football'
import {
  footballEntityFacts,
  footballTitleCandidates,
  isFootballEntity,
  saveEntityEnrichment
} from '../src/main/football/enrichment'
import {
  artworkPeople,
  footballSeasonStatus,
  saveApiFixtureDetails,
  saveOverlayFixtureDetails,
  saveApiStandings,
  saveApiTopScorers,
  writeLeagueFixtures,
  writeOverlayResultSlice,
  writeSlice
} from '../src/main/football/sync'
import { parseOpenFootballLeagueJson } from '../src/main/football/sources'
import type { SourceMatch, SourceSlice } from '../src/main/football/sources'
import { writeTransfermarktGame, type TmEvent, type TmGame, type TmLineup } from '../src/main/football/transfermarkt'

function seedMatch(): void {
  football.ensureCompetitionCatalog()
  const competition = db.prepare(`SELECT id FROM football_competition WHERE key='premier-league'`).get() as { id: number }
  db.prepare(`INSERT INTO football_season (id,competition_id,key,label,status,champion_verified) VALUES (1,?,'2023/24','2023/24','complete',1)`).run(competition.id)
  db.exec(`
    INSERT INTO football_team (id,name,country) VALUES (1,'Arsenal','England'),(2,'Chelsea','England');
    INSERT INTO football_match
      (id,title,season_id,home_team_id,away_team_id,match_date,status,home_score,away_score,event_coverage)
      VALUES (1,'Arsenal vs Chelsea',1,1,2,'2024-03-01','finished',2,1,'not_supplied');
  `)
}

beforeEach(() => {
  db = createTestDb()
  seedMatch()
})

describe('Football repository', () => {
  it('seeds exactly nine frozen competitions and their recognized eras', () => {
    expect(football.listCompetitions()).toHaveLength(9)
    expect(football.getCompetition('premier-league')?.eras.map((era) => era.name)).toContain('Football League First Division')
    expect(football.getCompetition('champions-league')?.lineageNote).toMatch(/European Cup/)
  })

  it('upserts explicit Wikimedia honours without inferring a champion from scores', () => {
    saveWikimediaSnapshot('premier-league', {
      page: 'List of English football champions',
      sourceUrl: 'https://en.wikipedia.org/wiki/List_of_English_football_champions',
      revision: '123',
      body: 'Plain sourced narrative.',
      honoursComplete: true,
      honours: [{ seasonKey: '2023/24', seasonLabel: '2023/24', winners: ['Arsenal'], runnersUp: ['Chelsea'] }]
    })
    const season = football.listSeasons('premier-league').find((item) => item.key === '2023/24')
    expect(season).toMatchObject({ championVerified: true })
    expect(season?.champion?.name).toBe('Arsenal')
    expect(season?.runnerUp?.name).toBe('Chelsea')
    expect(db.prepare(`SELECT COUNT(*) AS n FROM football_honour`).get()).toEqual({ n: 2 })
    expect(football.getTeam(season!.champion!.id)?.honours[0]).toMatchObject({ competitionKey: 'premier-league', competitionName: 'Premier League' })
    expect(football.competitionLogos()).toEqual({})
    db.prepare(`UPDATE football_competition SET image_path='media/pl.png' WHERE key='premier-league'`).run()
    expect(football.competitionLogos()).toEqual({ 'premier-league': 'media/pl.png' })
    saveWikimediaSnapshot('premier-league', {
      page: 'List of English football champions', sourceUrl: 'https://en.wikipedia.org/wiki/List_of_English_football_champions', revision: '124', body: 'Updated.',
      honoursComplete: true,
      honours: [{ seasonKey: '2023/24', seasonLabel: '2023/24', winners: ['Chelsea'], runnersUp: ['Arsenal'] }]
    })
    expect(db.prepare(`SELECT COUNT(*) AS n FROM football_honour`).get()).toEqual({ n: 2 })
    expect(football.listSeasons('premier-league').find((item) => item.key === '2023/24')?.champion?.name).toBe('Chelsea')
    expect(saveWikimediaSnapshot('premier-league', {
      page: 'List of English football champions',
      sourceUrl: 'https://en.wikipedia.org/wiki/List_of_English_football_champions',
      revision: '125',
      body: 'Table markup changed.',
      honoursComplete: false,
      honours: []
    })).toBe(0)
    expect(db.prepare(`SELECT COUNT(*) AS n FROM football_honour`).get()).toEqual({ n: 2 })
    expect(football.listSeasons('premier-league').find((item) => item.key === '2023/24')?.champion?.name).toBe('Chelsea')
    expect(db.prepare(`
      SELECT state FROM football_coverage
      WHERE source='wikimedia' AND facet='honours' ORDER BY id DESC LIMIT 1
    `).get()).toEqual({ state: 'complete' })
  })

  it('keeps an ambiguous Wikimedia team identity stable across refreshes', () => {
    db.exec(`
      INSERT INTO football_team (id,name) VALUES (30,'United'),(31,'United');
      INSERT INTO football_alias (entity_kind,entity_id,source,alias,normalized,external_id)
        VALUES ('team',30,'openfootball','United','united','u-30'),
               ('team',31,'engsoccerdata','United','united','u-31');
    `)
    const snapshot = {
      page: 'List of English football champions',
      sourceUrl: 'https://en.wikipedia.org/wiki/List_of_English_football_champions',
      revision: 'ambiguous-1',
      body: 'Ambiguous team fixture.',
      honoursComplete: true,
      honours: [{ seasonKey: '2098/99', seasonLabel: '2098/99', winners: ['United'], runnersUp: [] }]
    }
    saveWikimediaSnapshot('premier-league', snapshot)
    const first = db.prepare(`
      SELECT entity_id FROM football_source_ref
      WHERE entity_kind='team' AND source='wikimedia' AND external_id='united'
    `).get() as { entity_id: number }
    saveWikimediaSnapshot('premier-league', { ...snapshot, revision: 'ambiguous-2' })
    expect(db.prepare(`
      SELECT entity_id FROM football_source_ref
      WHERE entity_kind='team' AND source='wikimedia' AND external_id='united'
    `).get()).toEqual(first)
    expect(db.prepare(`SELECT COUNT(*) AS n FROM football_team WHERE name='United'`).get()).toEqual({ n: 3 })
    expect(db.prepare(`
      SELECT COUNT(*) AS n FROM football_conflict
      WHERE entity_kind='team' AND entity_id=? AND status='open'
    `).get(first.entity_id)).toEqual({ n: 1 })
  })

  it('keeps canonical match ids across providers and prunes only complete unowned rows', () => {
    const sourceMatch = (source: SourceMatch['source'], sourceId: string, date: string, away: string): SourceMatch => ({
      sourceId,
      competitionKey: 'premier-league',
      seasonKey: '2024/25',
      seasonLabel: '2024/25',
      date,
      home: { sourceId: 'alpha', name: 'Alpha', country: 'England', national: false },
      away: { sourceId: away.toLowerCase(), name: away, country: 'England', national: false },
      stage: null,
      round: null,
      status: 'finished',
      homeScore: 2,
      awayScore: 1,
      homeHalfTime: null,
      awayHalfTime: null,
      homeExtraTime: null,
      awayExtraTime: null,
      homePenalties: null,
      awayPenalties: null,
      goals: null,
      source,
      sourceUrl: 'fixture',
      rawFingerprint: `${source}:${sourceId}`
    })
    const slice = (source: SourceMatch['source'], matches: SourceMatch[]): SourceSlice => ({
      source,
      competitionKey: 'premier-league',
      seasonKey: '2024/25',
      revision: `${source}-r1`,
      coverage: { results: 'complete', scorers: 'not_supplied', lineups: 'not_supplied' },
      matches
    })
    const first = sourceMatch('engsoccerdata', 'a', '2024-09-01', 'Beta')
    const owned = sourceMatch('engsoccerdata', 'b', '2024-09-08', 'Gamma')
    writeSlice(slice('engsoccerdata', [first, owned]))
    const firstId = (db.prepare(`SELECT entity_id AS id FROM football_source_ref WHERE entity_kind='match' AND source='engsoccerdata' AND external_id='a'`).get() as { id: number }).id
    writeSlice(slice('openfootball', [{ ...first, source: 'openfootball', sourceId: 'open-a', rawFingerprint: 'open-a' }]))
    expect(db.prepare(`SELECT entity_id AS id FROM football_source_ref WHERE entity_kind='match' AND source='openfootball' AND external_id='open-a'`).get()).toEqual({ id: firstId })
    const ownedId = (db.prepare(`SELECT entity_id AS id FROM football_source_ref WHERE entity_kind='match' AND source='engsoccerdata' AND external_id='b'`).get() as { id: number }).id
    db.prepare(`INSERT INTO football_favorite (entity_kind,entity_id) VALUES ('match',?)`).run(ownedId)
    writeSlice(slice('engsoccerdata', [first]))
    expect(db.prepare(`SELECT id FROM football_match WHERE id=?`).get(ownedId)).toEqual({ id: ownedId })
    expect(db.prepare(`SELECT COUNT(*) AS n FROM football_source_ref WHERE entity_kind='match' AND entity_id=?`).get(ownedId)).toEqual({ n: 0 })
  })

  it('quarantines cross-source result disagreements until one assertion is accepted', () => {
    const match = (source: SourceMatch['source'], sourceId: string, homeScore: number): SourceMatch => ({
      sourceId,
      competitionKey: 'premier-league',
      seasonKey: '2025/26',
      seasonLabel: '2025/26',
      date: '2026-01-01',
      home: { sourceId: 'home', name: 'Home', country: 'England', national: false },
      away: { sourceId: 'away', name: 'Away', country: 'England', national: false },
      stage: null,
      round: null,
      status: 'finished',
      homeScore,
      awayScore: 0,
      homeHalfTime: null,
      awayHalfTime: null,
      homeExtraTime: null,
      awayExtraTime: null,
      homePenalties: null,
      awayPenalties: null,
      goals: null,
      source,
      sourceUrl: 'fixture',
      rawFingerprint: sourceId
    })
    const slice = (source: SourceMatch['source'], item: SourceMatch): SourceSlice => ({
      source,
      competitionKey: 'premier-league',
      seasonKey: '2025/26',
      revision: source,
      coverage: { results: 'complete' },
      matches: [item]
    })
    writeSlice(slice('engsoccerdata', match('engsoccerdata', 'a', 1)))
    writeSlice(slice('openfootball', match('openfootball', 'b', 2)))
    const stored = db.prepare(`SELECT id,home_score AS score,conflicted FROM football_match
      WHERE match_date='2026-01-01'`).get() as { id: number; score: number; conflicted: number }
    expect(stored).toMatchObject({ score: 1, conflicted: 1 })
    const conflict = db.prepare(`SELECT id,status FROM football_conflict
      WHERE entity_kind='match' AND entity_id=?`).get(stored.id) as { id: number; status: string }
    expect(conflict.status).toBe('open')
    expect(db.prepare(`SELECT state FROM football_coverage
      WHERE source='openfootball' AND facet='results'`).get()).toEqual({ state: 'conflicted' })
    const coverageScope = db.prepare(`SELECT c.id AS competitionId,s.id AS seasonId
      FROM football_season s JOIN football_competition c ON c.id=s.competition_id
      WHERE c.key='premier-league' AND s.key='2025/26'`).get() as {
      competitionId: number
      seasonId: number
    }
    db.prepare(`INSERT INTO football_coverage
      (competition_id,season_id,source,facet,state,item_count)
      VALUES (?,?,'api-football','results','partial',0)`
    ).run(coverageScope.competitionId, coverageScope.seasonId)

    football.resolveConflict(conflict.id, { action: 'ignore' })
    expect(db.prepare(`SELECT status FROM football_conflict WHERE id=?`).get(conflict.id)).toEqual({
      status: 'ignored'
    })
    expect(db.prepare(`SELECT conflicted FROM football_match WHERE id=?`).get(stored.id)).toEqual({
      conflicted: 1
    })

    football.resolveConflict(conflict.id, { action: 'acceptSourceB' })
    expect(db.prepare(`SELECT home_score AS score,conflicted FROM football_match WHERE id=?`
    ).get(stored.id)).toEqual({ score: 2, conflicted: 0 })
    expect(db.prepare(`SELECT status,resolution FROM football_conflict WHERE id=?`
    ).get(conflict.id)).toEqual({ status: 'resolved', resolution: 'Accepted source B' })
    expect(db.prepare(`SELECT state FROM football_coverage
      WHERE source='openfootball' AND facet='results'`).get()).toEqual({ state: 'complete' })
    expect(db.prepare(`SELECT state FROM football_coverage
      WHERE source='api-football' AND facet='results'`).get()).toEqual({ state: 'partial' })

    writeSlice(slice('statsbomb', match('statsbomb', 'sb-c', 1)))
    const laterConflict = db.prepare(`SELECT id,source_a AS sourceA,value_a AS valueA,
      source_b AS sourceB,value_b AS valueB FROM football_conflict
      WHERE entity_kind='match' AND entity_id=? AND status='open' ORDER BY id DESC LIMIT 1`
    ).get(stored.id) as {
      id: number
      sourceA: string
      valueA: string
      sourceB: string
      valueB: string
    }
    expect(laterConflict.sourceA).toBe('openfootball')
    expect(JSON.parse(laterConflict.valueA)).toMatchObject({ homeScore: 2 })
    expect(laterConflict.sourceB).toBe('statsbomb')
    expect(JSON.parse(laterConflict.valueB)).toMatchObject({ homeScore: 1 })
    football.resolveConflict(laterConflict.id, { action: 'acceptSourceA' })

    const scheduled = {
      ...match('international-results', 'c', 0),
      status: 'scheduled' as const,
      homeScore: null,
      awayScore: null
    }
    writeSlice(slice('international-results', scheduled))
    expect(db.prepare(`SELECT status,home_score AS score FROM football_match WHERE id=?`
    ).get(stored.id)).toEqual({ status: 'finished', score: 2 })
  })

  it('keeps rejected scorer children quarantined with their conflicting result', () => {
    const match = (
      source: SourceMatch['source'],
      sourceId: string,
      homeScore: number,
      playerName: string
    ): SourceMatch => ({
      sourceId,
      competitionKey: 'premier-league',
      seasonKey: '2025/26',
      seasonLabel: '2025/26',
      date: '2026-02-01',
      home: { sourceId: 'home', name: 'Home', country: 'England', national: false },
      away: { sourceId: 'away', name: 'Away', country: 'England', national: false },
      stage: null,
      round: null,
      status: 'finished',
      homeScore,
      awayScore: 0,
      homeHalfTime: null,
      awayHalfTime: null,
      homeExtraTime: null,
      awayExtraTime: null,
      homePenalties: null,
      awayPenalties: null,
      goals: [{
        team: 'home',
        playerName,
        playerSourceId: `${sourceId}-scorer`,
        minute: 12,
        extraMinute: null,
        ownGoal: false,
        penalty: false
      }],
      source,
      sourceUrl: 'fixture',
      rawFingerprint: sourceId
    })
    const slice = (source: SourceMatch['source'], item: SourceMatch): SourceSlice => ({
      source,
      competitionKey: 'premier-league',
      seasonKey: '2025/26',
      revision: source,
      coverage: { results: 'complete', scorers: 'complete' },
      matches: [item]
    })

    writeSlice(slice('engsoccerdata', match('engsoccerdata', 'scorer-a', 1, 'First Scorer')))
    writeSlice(slice('openfootball', match('openfootball', 'scorer-b', 2, 'Rejected Scorer')))

    expect(db.prepare(`SELECT p.name FROM football_event e
      JOIN football_person p ON p.id=e.person_id WHERE e.type='goal'`).all()).toEqual([
      { name: 'First Scorer' }
    ])
    expect(db.prepare(`SELECT state FROM football_coverage
      WHERE source='openfootball' AND facet='scorers'`).get()).toEqual({ state: 'conflicted' })
  })

  it('marks no relegation across a gap in the stored seasons', () => {
    const pl = db.prepare(`SELECT id FROM football_competition WHERE key='premier-league'`).get() as { id: number }
    db.exec(`
      INSERT INTO football_team (id,name) VALUES (3,'Later Club');
      INSERT INTO football_season (id,competition_id,key,label,status) VALUES (2,${pl.id},'2027/28','2027/28','complete');
      INSERT INTO football_match (id,title,season_id,home_team_id,away_team_id,match_date,status,home_score,away_score,event_coverage)
        VALUES (2,'Arsenal vs Later Club',2,1,3,'2027-08-17','finished',1,0,'complete');
      INSERT INTO football_standing (season_id,team_id,played,won,drawn,lost,goals_for,goals_against,goal_difference,points)
        VALUES (1,1,1,1,0,0,2,1,1,3),(1,2,1,0,0,1,1,2,-1,0);
    `)
    expect(football.getSeason(1)!.standings.map((row) => row.fate)).toEqual([null, null])
  })

  it('gives team season records the same fates as the season tables', () => {
    const pl = db.prepare(`SELECT id FROM football_competition WHERE key='premier-league'`).get() as { id: number }
    const ucl = db.prepare(`SELECT id FROM football_competition WHERE key='champions-league'`).get() as { id: number }
    const uel = db.prepare(`SELECT id FROM football_competition WHERE key='europa-league'`).get() as { id: number }
    db.exec(`
      INSERT INTO football_team (id,name) VALUES (3,'Promoted'),(4,'Stayer');
      INSERT INTO football_season (id,competition_id,key,label,status) VALUES
        (2,${pl.id},'2024/25','2024/25','complete'),(3,${ucl.id},'2024/25','2024/25','complete'),
        (4,${uel.id},'2024/25','2024/25','complete'),(5,${pl.id},'2026/27','2026/27','complete');
      INSERT INTO football_match (id,title,season_id,home_team_id,away_team_id,match_date,status,home_score,away_score,event_coverage)
        VALUES (2,'Stayer vs Arsenal',1,4,1,'2023-10-02','finished',0,0,'complete'),
               (3,'Arsenal vs Promoted',2,1,3,'2024-08-17','finished',3,1,'complete'),
               (4,'Stayer vs Promoted',2,4,3,'2024-08-18','finished',1,1,'complete'),
               (5,'Arsenal vs Stayer',3,1,4,'2024-10-02','finished',1,0,'complete'),
               (6,'Arsenal vs Chelsea',4,1,2,'2024-10-03','finished',1,0,'complete'),
               (7,'Promoted vs Stayer',5,3,4,'2026-08-17','finished',1,0,'complete');
      INSERT INTO football_standing (season_id,team_id,played,won,drawn,lost,goals_for,goals_against,goal_difference,points)
        VALUES (1,1,2,1,1,0,2,1,1,4),(1,2,1,0,0,1,1,2,-1,0),(1,4,1,0,1,0,0,0,0,1),
               (2,1,1,1,0,0,3,1,2,3),(2,3,2,0,1,1,2,4,-2,1),(2,4,1,0,1,0,1,1,0,1);
    `)
    const tableFates = new Map([1, 2].flatMap((seasonId) =>
      football.getSeason(seasonId)!.standings.map((row) => [`${seasonId}:${row.team.id}`, row.fate] as const)
    ))
    expect([...tableFates.values()].sort()).toEqual(['champions-league', 'champions-league', 'relegated', null, null, null].sort())
    for (const teamId of [1, 2, 3, 4]) {
      for (const record of football.getTeam(teamId)!.seasonRecords) {
        expect([record.seasonId, teamId, record.fate]).toEqual([
          record.seasonId, teamId, tableFates.get(`${record.seasonId}:${teamId}`)
        ])
      }
    }
  })

  it('picks pictures-step people by favourite, quiz pack or a footprint in scope', async () => {
    const wc = db.prepare(`SELECT id FROM football_competition WHERE key='world-cup'`).get() as { id: number }
    db.exec(`
      INSERT INTO football_season (id,competition_id,key,label,status) VALUES (9,${wc.id},'2022','2022','complete');
      INSERT INTO football_match (id,title,season_id,home_team_id,away_team_id,match_date,status,home_score,away_score,event_coverage)
        VALUES (2,'A',1,1,2,'2024-03-02','finished',0,0,'complete'),(3,'B',1,1,2,'2024-03-03','finished',0,0,'complete'),
               (4,'C',1,1,2,'2024-03-04','finished',0,0,'complete'),(5,'D',1,1,2,'2024-03-05','finished',0,0,'complete'),
               (6,'E',9,1,2,'2022-12-01','finished',3,0,'complete');
      INSERT INTO football_person (id,name,role,image_path,enrichment_state,quiz_pack) VALUES
        (1,'Three Goals','player',NULL,'not_requested',0),(2,'Two Goals','player',NULL,'not_requested',0),
        (3,'Five Caps','player',NULL,'not_requested',0),(4,'Four Caps','player',NULL,'not_requested',0),
        (5,'Favourite','player',NULL,'not_requested',0),(6,'Quiz','player',NULL,'not_requested',1),
        (7,'Done','player','media/p.png','ready',0),(8,'Conflicted','player',NULL,'not_requested',0),
        (9,'Elsewhere','player',NULL,'not_requested',0);
      INSERT INTO football_event (match_id,team_id,person_id,type,sort_order) VALUES
        (1,1,1,'goal',0),(2,1,1,'goal',0),(3,1,1,'goal',0),(1,1,2,'goal',1),(2,1,2,'goal',1),
        (1,1,7,'goal',2),(2,1,7,'goal',2),(3,1,7,'goal',2),(1,1,8,'goal',3),(2,1,8,'goal',3),(3,1,8,'goal',3),
        (6,1,9,'goal',0),(6,1,9,'goal',1),(6,1,9,'goal',2),(4,1,NULL,'goal',0),(5,1,NULL,'goal',0),(1,1,NULL,'goal',9);
      INSERT INTO football_lineup (match_id,team_id,person_id) VALUES
        (1,1,3),(2,1,3),(3,1,3),(4,1,3),(5,1,3),(1,1,4),(2,1,4),(3,1,4),(4,1,4);
      INSERT INTO football_favorite (entity_kind,entity_id) VALUES ('person',5);
      INSERT INTO football_conflict (entity_kind,entity_id,facet,source_a,source_b,status)
        VALUES ('person',8,'identity','transfermarkt','openfootball','open');
    `)
    let yields = 0
    const ids = async (keys: Parameters<typeof artworkPeople>[0]) =>
      (await artworkPeople(keys, async () => { yields++ })).map((row) => row.id)
    expect(await ids(['premier-league'])).toEqual([1, 3, 5, 6])
    expect(await ids(['premier-league', 'world-cup'])).toEqual([1, 9, 3, 5, 6])
    expect(yields).toBe(6)
  })

  it('refreshes cached competition totals after a write', () => {
    const before = football.listCompetitions().find((item) => item.key === 'premier-league')!
    expect([before.matchCount, before.goalCount]).toEqual([1, 3])
    db.exec(`INSERT INTO football_match (id,title,season_id,home_team_id,away_team_id,match_date,status,home_score,away_score,event_coverage)
      VALUES (2,'Chelsea vs Arsenal',1,2,1,'2024-04-01','finished',4,0,'not_supplied')`)
    expect(football.getCompetition('premier-league')).toMatchObject({ matchCount: 2, goalCount: 7 })
    db.exec(`UPDATE football_match SET home_score=0 WHERE id=2`)
    expect(football.listCompetitions('premier-league')[0]).toMatchObject({ matchCount: 2, goalCount: 3 })
  })

  it('derives archive insights for seasons, teams, people and the home page', () => {
    const pl = db.prepare(`SELECT id FROM football_competition WHERE key='premier-league'`).get() as { id: number }
    const ucl = db.prepare(`SELECT id FROM football_competition WHERE key='champions-league'`).get() as { id: number }
    db.exec(`
      INSERT INTO football_team (id,name) VALUES (3,'Promoted');
      INSERT INTO football_season (id,competition_id,key,label,status) VALUES
        (2,${pl.id},'2024/25','2024/25','complete'),(3,${ucl.id},'2024/25','2024/25','complete');
      INSERT INTO football_match (id,title,season_id,home_team_id,away_team_id,match_date,status,home_score,away_score,event_coverage)
        VALUES (2,'Chelsea vs Arsenal',1,2,1,'2023-10-02','finished',0,0,'complete'),
               (3,'Arsenal vs Promoted',2,1,3,'2024-08-17','finished',3,1,'complete'),
               (4,'Arsenal vs Chelsea',3,1,2,'2024-10-02','finished',1,0,'complete');
      INSERT INTO football_standing (season_id,team_id,played,won,drawn,lost,goals_for,goals_against,goal_difference,points)
        VALUES (1,2,2,0,1,1,1,2,-1,1),(1,1,2,1,1,0,2,1,1,4);
      INSERT INTO football_honour (competition_id,season_id,team_id,title,placement,verified)
        VALUES (${pl.id},1,1,'Champions','winner',1);
      INSERT INTO football_person (id,name,role) VALUES (90,'Striker','player');
      INSERT INTO football_event (match_id,team_id,person_id,type,minute,sort_order) VALUES
        (1,1,90,'goal',10,0),(1,1,90,'goal',20,1),(3,1,90,'goal',5,0),(3,1,90,'goal',9,1),(3,1,NULL,'goal',30,2);
      INSERT INTO football_match_journal (match_id,watched_at,rating) VALUES (4,'2026-01-05',4.5);
    `)

    const match = football.getMatch(2)!
    expect([match.home.id, match.away.id]).toEqual([2, 1])

    const table = football.getSeason(1)!.standings
    expect(table.map((row) => [row.team.name, row.position, row.fate])).toEqual([
      ['Arsenal', 1, 'champions-league'],
      ['Chelsea', 2, 'relegated']
    ])
    expect(football.getTeam(1)!.seasonRecords.find((row) => row.seasonId === 1)).toMatchObject({
      position: 1, teamCount: 2, fate: 'champions-league'
    })

    const team = football.getTeam(1)!
    expect(team.scorers).toMatchObject([{ person: { name: 'Striker' }, goals: 4, rank: 1 }])
    expect(team.rivals[0]).toMatchObject({
      opponent: { name: 'Chelsea' }, played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 3, goalsAgainst: 1
    })

    const person = football.getPerson(90)!
    expect(person.goalsBySeason.map((row) => [row.seasonLabel, row.goals])).toEqual([
      ['2023/24', 2], ['2024/25', 2]
    ])
    expect([person.goalTotal, person.matchTotal, person.scoredIn.length]).toEqual([4, 2, 2])

    const competition = football.listCompetitions().find((item) => item.key === 'premier-league')!
    expect(competition.holder?.name).toBe('Arsenal')
    expect(competition.titleLeaders).toMatchObject({ teams: [{ name: 'Arsenal' }], titles: 1 })
    expect(competition.goalCount).toBe(7)

    expect(football.onThisDay('10-02')?.match.id).toBe(4)
    expect(football.overview().journal).toMatchObject({ logged: 1, averageRating: 4.5 })
  })

  it('keeps one scorer identity per team across seasons and quarantines other teams', () => {
    const match = (
      seasonKey: string,
      date: string,
      home: string,
      playerName: string
    ): SourceMatch => ({
      sourceId: `${seasonKey}-${home}`,
      competitionKey: 'premier-league',
      seasonKey,
      seasonLabel: seasonKey,
      date,
      home: { sourceId: home, name: home, country: 'England', national: false },
      away: { sourceId: 'away', name: 'Away', country: 'England', national: false },
      stage: null,
      round: null,
      status: 'finished',
      homeScore: 1,
      awayScore: 0,
      homeHalfTime: null,
      awayHalfTime: null,
      homeExtraTime: null,
      awayExtraTime: null,
      homePenalties: null,
      awayPenalties: null,
      goals: [{
        team: 'home',
        playerName,
        playerSourceId: null,
        minute: 12,
        extraMinute: null,
        ownGoal: false,
        penalty: false
      }],
      source: 'openfootball',
      sourceUrl: 'fixture',
      rawFingerprint: `${seasonKey}-${home}`
    })
    const slice = (item: SourceMatch): SourceSlice => ({
      source: 'openfootball',
      competitionKey: 'premier-league',
      seasonKey: item.seasonKey,
      revision: item.seasonKey,
      coverage: { results: 'complete', scorers: 'complete' },
      matches: [item]
    })

    writeSlice(slice(match('2010/11', '2011-01-01', 'Home', 'Same Scorer')))
    writeSlice(slice(match('2012/13', '2013-01-01', 'Home', 'Same Scorer')))
    writeSlice(slice(match('2014/15', '2015-01-01', 'Other', 'Same Scorer')))

    expect(db.prepare(`SELECT COUNT(*) AS n FROM football_person`).get()).toEqual({ n: 2 })
    const conflicts = football.listConflicts().filter((item) => item.status === 'open')
    expect(conflicts).toHaveLength(1)
    expect(conflicts[0].subject).toMatchObject({ teams: ['Other'], firstYear: 2015 })
    expect(conflicts[0].candidates).toMatchObject([
      { name: 'Same Scorer', teams: ['Home'], firstYear: 2011, lastYear: 2013 }
    ])
  })

  it('folds hyphen-keyed seasons into their slash twin without losing personal rows', () => {
    const ucl = db.prepare(`SELECT id FROM football_competition WHERE key='champions-league'`).get() as { id: number }
    db.exec(`
      INSERT INTO football_season (id,competition_id,key,label,status) VALUES
        (10,${ucl.id},'2012/13','2012/13','complete'),(11,${ucl.id},'2012-13','2012-13','complete'),
        (12,${ucl.id},'2013-14','2013-14','complete');
      INSERT INTO football_stage (id,season_id,key,name,kind) VALUES (5,11,'group-a','Group A','group');
      INSERT INTO football_match (id,title,season_id,home_team_id,away_team_id,match_date,status,home_score,away_score,event_coverage) VALUES
        (20,'Arsenal vs Chelsea',10,1,2,'2013-05-25','finished',1,0,'not_supplied'),
        (21,'Arsenal vs Chelsea',11,1,2,'2013-05-25','finished',1,0,'complete'),
        (22,'Chelsea vs Arsenal',11,2,1,'2012-10-01','finished',2,2,'not_supplied'),
        (23,'Chelsea vs Arsenal',12,2,1,'2013-10-01','finished',0,0,'not_supplied');
      UPDATE football_match SET stage_id=5 WHERE id=22;
      INSERT INTO football_event (match_id,team_id,type,minute,sort_order) VALUES (21,1,'goal',50,0);
      INSERT INTO football_match_journal (match_id,watched_at,rating) VALUES (21,'2026-01-01',4);
      INSERT INTO football_favorite (entity_kind,entity_id) VALUES ('match',21);
    `)

    expect(football.mergeDuplicateSeasons()).toBe(2)
    expect(db.prepare(`SELECT key FROM football_season WHERE competition_id=? ORDER BY key`).all(ucl.id)).toEqual([
      { key: '2012/13' }, { key: '2013/14' }
    ])
    expect(db.prepare(`SELECT id,season_id AS season FROM football_match WHERE id IN (20,21,22,23) ORDER BY id`).all()).toEqual([
      { id: 20, season: 10 }, { id: 22, season: 10 }, { id: 23, season: 12 }
    ])
    expect(football.getMatch(20)).toMatchObject({ rating: 4, favorite: true })
    expect(football.getMatch(20)!.events).toHaveLength(1)
    expect(football.getMatch(22)!.stageName).toBe('Group A')
    expect(football.mergeDuplicateSeasons()).toBe(0)
  })

  it('adds the current season from OpenFootball league files onto the archive clubs', () => {
    const matches = parseOpenFootballLeagueJson({
      json: { name: 'English Premier League 2026/27', matches: [
        { round: 'Matchday 1', date: '2026-08-21', time: '20:00', team1: 'Arsenal FC', team2: 'Coventry City FC', score: { ht: [2, 0], ft: [3, 0] } },
        { round: 'Matchday 9', date: '2026-10-24', team1: 'Chelsea FC', team2: 'Arsenal FC', score: [] },
        { round: 'Matchday 9', team1: 'No Date FC', team2: 'Arsenal FC' }
      ] },
      competitionKey: 'premier-league',
      seasonKey: '2026/27',
      sourceUrl: 'fixture',
      fingerprint: 'f1'
    })
    expect(matches.map((match) => [match.home.name, match.status, match.homeScore, match.homeHalfTime])).toEqual([
      ['Arsenal FC', 'finished', 3, 2], ['Chelsea FC', 'scheduled', null, null]
    ])
    expect(writeLeagueFixtures('premier-league', '2026/27', matches, true, 'f1')).toBeGreaterThan(0)
    const stored = football.listMatches({ competitionKey: 'premier-league', dateFrom: '2026-08-01' })
    expect(stored.map((match) => [match.home.id, match.away.name, match.status]).sort()).toEqual([
      [1, 'Coventry City FC', 'finished'], [2, 'Arsenal', 'scheduled']
    ])
    expect(football.listMatches({ dateFrom: '2026-08-01', limit: 1, oldestFirst: true }).map((match) => match.matchDate))
      .toEqual(['2026-08-21'])

    const moved = [{ ...matches[1], date: '2026-10-25' }]
    writeLeagueFixtures('premier-league', '2026/27', moved, true, 'f2')
    expect(football.listMatches({ competitionKey: 'premier-league', dateFrom: '2026-10-01' }).map((match) => match.matchDate)).toEqual(['2026-10-25'])
  })

  it('reports when each setup step last finished', () => {
    expect(football.setupState()).toEqual({ history: null, detail: null, pictures: null })
    db.prepare(`INSERT INTO settings (key,value) VALUES ('football.setup.detail','2026-09-28T10:00:00.000Z')`).run()
    expect(football.overview().setup).toEqual({ history: null, detail: '2026-09-28T10:00:00.000Z', pictures: null })
    db.prepare(`INSERT INTO settings (key,value) VALUES ('football.setup.history','2026-09-28T09:00:00.000Z')`).run()
    expect(football.setupState().history).toBe('2026-09-28T09:00:00.000Z')

    const bundesliga = (db.prepare(`SELECT id FROM football_competition WHERE key='bundesliga'`).get() as { id: number }).id
    const season = Number(db.prepare(`INSERT INTO football_season (competition_id,key,label) VALUES (?,'1990/91','1990/91')`).run(bundesliga).lastInsertRowid)
    const insert = db.prepare(`INSERT INTO football_match (title,season_id,home_team_id,away_team_id,match_date,status) VALUES ('x',?,1,2,'1990-08-01','finished')`)
    for (let index = 0; index < 381; index++) insert.run(season)
    expect(football.setupState().history).toBeNull()
  })

  it('repairs people split by the old season-scoped scorer identity', () => {
    db.exec(`
      INSERT INTO football_team (id,name) VALUES (3,'Rival');
      INSERT INTO football_match
        (id,title,season_id,home_team_id,away_team_id,match_date,status,home_score,away_score,event_coverage)
        VALUES (2,'Arsenal vs Chelsea',1,1,2,'2024-04-01','finished',1,0,'complete'),
               (3,'Rival vs Chelsea',1,3,2,'2024-05-01','finished',1,0,'complete');
      INSERT INTO football_person (id,name,role) VALUES
        (80,'Split Player','player'),(81,'Split Player','player'),(82,'Split Player','player'),
        (83,'Split Player','player'),(84,'Split Player','player'),(86,'Replaced Scorer','player');
      INSERT INTO football_person (id,name,role,image_path) VALUES (87,'Pictured Nobody','player','media/p.png');
      INSERT INTO football_alias (entity_kind,entity_id,source,alias,normalized,external_id) VALUES
        ('person',80,'openfootball','Split Player','split player','a'),
        ('person',81,'openfootball','Split Player','split player','b'),
        ('person',82,'international-results','Split Player','split player','c'),
        ('person',83,'openfootball','Split Player','split player','d'),
        ('person',84,'openfootball','Split Player','split player','e');
      INSERT INTO football_event (match_id,team_id,person_id,type,sort_order) VALUES
        (1,1,80,'goal',0),(2,1,81,'goal',0),(3,3,83,'goal',0);
      INSERT INTO football_favorite (entity_kind,entity_id) VALUES ('person',81);
      INSERT INTO football_conflict (entity_kind,entity_id,facet,source_a,value_a,source_b,value_b) VALUES
        ('person',80,'identity','openfootball','Split Player','archive','Possible matches: 81'),
        ('person',81,'identity','openfootball','Split Player','archive','Possible matches: 80'),
        ('person',82,'identity','international-results','Split Player','archive','Possible matches: 80,81'),
        ('person',83,'identity','openfootball','Split Player','archive','Possible matches: 80,81,82'),
        ('person',84,'identity','openfootball','Split Player','archive','Possible matches: 80'),
        ('person',84,'identity','openfootball','Split Player','archive','Possible matches: 83');
      UPDATE football_conflict SET status='resolved',resolution='Confirmed separate identities'
        WHERE entity_id=84 AND value_b='Possible matches: 83';
    `)

    expect(football.repairPersonIdentities()).toEqual({ merged: 1, removed: 2, resolved: 1 })

    expect(db.prepare(`SELECT id FROM football_person WHERE id>=80 ORDER BY id`).all()).toEqual([
      { id: 80 }, { id: 83 }, { id: 84 }, { id: 87 }
    ])
    expect(db.prepare(`SELECT DISTINCT person_id AS id FROM football_event WHERE team_id=1`).all())
      .toEqual([{ id: 80 }])
    expect(db.prepare(`SELECT entity_id AS id FROM football_favorite WHERE entity_kind='person'`).get())
      .toEqual({ id: 80 })
    expect(db.prepare(`SELECT entity_id AS id,value_b AS value FROM football_conflict
      WHERE status='open' ORDER BY entity_id`).all()).toEqual([
      { id: 80, value: 'Possible matches: 83,84' },
      { id: 83, value: 'Possible matches: 80,84' },
      { id: 84, value: 'Possible matches: 80,83' }
    ])
  })

  it('closes identity conflicts between namesakes born apart or playing before birth', () => {
    db.exec(`
      INSERT INTO football_match
        (id,title,season_id,home_team_id,away_team_id,match_date,status,home_score,away_score,event_coverage)
        VALUES (5,'Arsenal vs Chelsea',1,1,2,'2010-05-01','finished',1,0,'complete');
      INSERT INTO football_person (id,name,role,birth_date) VALUES
        (90,'Namesake','player','1998-01-31'),(91,'Namesake','player','1982-05-01'),
        (92,'Era Player','player','2003-01-07'),(93,'Era Player','player',NULL);
      INSERT INTO football_alias (entity_kind,entity_id,source,alias,normalized,external_id) VALUES
        ('person',90,'transfermarkt','Namesake','namesake','1'),('person',91,'openfootball','Namesake','namesake','2'),
        ('person',92,'transfermarkt','Era Player','era player','3'),('person',93,'openfootball','Era Player','era player','4');
      INSERT INTO football_event (match_id,team_id,person_id,type,sort_order) VALUES (5,1,93,'goal',0);
      INSERT INTO football_favorite (entity_kind,entity_id) VALUES ('person',90),('person',91),('person',92);
      INSERT INTO football_conflict (entity_kind,entity_id,facet,source_a,value_a,source_b,value_b) VALUES
        ('person',90,'identity','transfermarkt','Namesake','archive','Possible matches: 91'),
        ('person',92,'identity','transfermarkt','Era Player','archive','Possible matches: 93');
    `)

    expect(football.repairPersonIdentities()).toMatchObject({ merged: 0, resolved: 2 })
    expect(db.prepare(`SELECT resolution FROM football_conflict WHERE entity_id IN (90,92)`).all()).toEqual([
      { resolution: 'Same name, different birth years or eras' },
      { resolution: 'Same name, different birth years or eras' }
    ])
  })

  it('never merges namesakes born apart through an undated third namesake', () => {
    db.exec(`
      INSERT INTO football_match
        (id,title,season_id,home_team_id,away_team_id,match_date,status,home_score,away_score,event_coverage)
        VALUES (7,'Arsenal vs Chelsea',1,1,2,'2004-05-01','finished',1,0,'complete'),
               (8,'Arsenal vs Chelsea',1,1,2,'2006-05-01','finished',1,0,'complete'),
               (9,'Arsenal vs Chelsea',1,1,2,'2008-05-01','finished',1,0,'complete');
      INSERT INTO football_person (id,name,role,birth_date) VALUES
        (100,'Ronaldo','player','1976-09-18'),(101,'Ronaldo','player',NULL),(102,'Ronaldo','player','1985-02-05');
      INSERT INTO football_alias (entity_kind,entity_id,source,alias,normalized,external_id) VALUES
        ('person',100,'transfermarkt','Ronaldo','ronaldo','1'),('person',101,'openfootball','Ronaldo','ronaldo','2'),
        ('person',102,'transfermarkt','Ronaldo','ronaldo','3');
      INSERT INTO football_event (match_id,team_id,person_id,type,sort_order) VALUES
        (7,1,100,'goal',0),(8,1,101,'goal',0),(9,1,102,'goal',0);
    `)

    expect(football.repairPersonIdentities()).toMatchObject({ merged: 1 })
    expect(db.prepare(`SELECT id FROM football_person WHERE id>=100 ORDER BY id`).all())
      .toEqual([{ id: 100 }, { id: 102 }])
  })

  it('joins a club player to the one namesake who played for their national team', () => {
    db.exec(`
      INSERT INTO football_team (id,name,is_national) VALUES (10,'England',1),(11,'Scotland',1);
      INSERT INTO football_match
        (id,title,season_id,home_team_id,away_team_id,match_date,status,home_score,away_score,event_coverage)
        VALUES (6,'England vs Scotland',1,10,11,'2000-06-01','finished',1,1,'complete');
      INSERT INTO football_person (id,name,role,birth_date,nationality) VALUES
        (95,'Club Star','player','1974-11-16','England'),(96,'Club Star','player',NULL,NULL),
        (97,'Club Star','player',NULL,NULL);
      INSERT INTO football_alias (entity_kind,entity_id,source,alias,normalized,external_id) VALUES
        ('person',95,'transfermarkt','Club Star','club star','1'),('person',96,'international-results','Club Star','club star','2'),
        ('person',97,'international-results','Club Star','club star','3');
      INSERT INTO football_event (match_id,team_id,person_id,type,sort_order) VALUES
        (1,1,95,'goal',0),(6,10,96,'goal',0),(6,11,97,'goal',1);
    `)

    expect(football.repairPersonIdentities()).toMatchObject({ merged: 1 })
    expect(db.prepare(`SELECT DISTINCT person_id AS id FROM football_event WHERE match_id=6 ORDER BY sort_order`).all())
      .toEqual([{ id: 95 }, { id: 97 }])
  })

  it('removes clubs nothing refers to any more', () => {
    db.exec(`
      INSERT INTO football_team (id,name) VALUES (20,'Pruned Club'),(21,'Favourite Club'),(22,'Transfer Club');
      INSERT INTO football_alias (entity_kind,entity_id,source,alias,normalized,external_id) VALUES
        ('team',20,'engsoccerdata','Pruned Club','pruned club','Pruned Club');
      INSERT INTO football_favorite (entity_kind,entity_id) VALUES ('team',21);
      INSERT INTO football_person (id,name,role) VALUES (60,'Mover','player');
      INSERT INTO football_transfer (person_id,from_team_id,transfer_date,from_team,to_team,source,external_id)
        VALUES (60,22,'2020-07-01','Transfer Club','Elsewhere','transfermarkt','t1');
      INSERT INTO football_assertion (entity_kind,entity_id,facet,value,source) VALUES ('team',20,'name','Pruned Club','engsoccerdata');
      INSERT INTO football_team (id,name) VALUES (23,'Ranked Club');
      INSERT INTO tier_list (id,title,entity_kind) VALUES (1,'Clubs','footballTeam');
      INSERT INTO tier_item (list_id,entity_id) VALUES (1,23);
    `)
    expect(football.removeOrphanTeams()).toBe(1)
    expect(db.prepare(`SELECT id FROM football_team WHERE id>=20 ORDER BY id`).all()).toEqual([{ id: 21 }, { id: 22 }, { id: 23 }])
    expect(db.prepare(`SELECT COUNT(*) AS n FROM football_alias WHERE entity_kind='team' AND entity_id=20`).get()).toEqual({ n: 0 })
    expect(db.prepare(`SELECT COUNT(*) AS n FROM football_assertion WHERE entity_kind='team' AND entity_id=20`).get()).toEqual({ n: 0 })
  })

  it('reconciles retained matches when a complete refresh prunes one source assertion', () => {
    const match = (
      source: SourceMatch['source'],
      sourceId: string,
      homeScore: number
    ): SourceMatch => ({
      sourceId,
      competitionKey: 'premier-league',
      seasonKey: '2025/26',
      seasonLabel: '2025/26',
      date: '2026-03-01',
      home: { sourceId: 'home', name: 'Home', country: 'England', national: false },
      away: { sourceId: 'away', name: 'Away', country: 'England', national: false },
      stage: null,
      round: null,
      status: 'finished',
      homeScore,
      awayScore: 0,
      homeHalfTime: null,
      awayHalfTime: null,
      homeExtraTime: null,
      awayExtraTime: null,
      homePenalties: null,
      awayPenalties: null,
      goals: null,
      source,
      sourceUrl: 'fixture',
      rawFingerprint: sourceId
    })
    const slice = (source: SourceMatch['source'], matches: SourceMatch[]): SourceSlice => ({
      source,
      competitionKey: 'premier-league',
      seasonKey: '2025/26',
      revision: source,
      coverage: { results: 'complete' },
      matches
    })

    writeSlice(slice('engsoccerdata', [match('engsoccerdata', 'prune-a', 1)]))
    writeSlice(slice('openfootball', [match('openfootball', 'prune-b', 2)]))
    const stored = db.prepare(`SELECT id FROM football_match WHERE match_date='2026-03-01'`
    ).get() as { id: number }
    writeSlice(slice('engsoccerdata', []))

    expect(db.prepare(`SELECT home_score AS score,conflicted FROM football_match WHERE id=?`
    ).get(stored.id)).toEqual({ score: 2, conflicted: 0 })
    expect(db.prepare(`SELECT status,resolution FROM football_conflict
      WHERE entity_kind='match' AND entity_id=?`).get(stored.id)).toEqual({
      status: 'resolved',
      resolution: 'Source assertion removed by complete refresh'
    })
    expect(db.prepare(`SELECT state FROM football_coverage
      WHERE source='openfootball' AND facet='results'`).get()).toEqual({ state: 'complete' })
  })

  it('escapes SQL LIKE wildcards in every section-local entity search', () => {
    db.prepare(`INSERT INTO football_team (name) VALUES ('100 Percent Club')`).run()
    db.prepare(`INSERT INTO football_team (name) VALUES ('100% Club')`).run()
    expect(football.listTeams({ search: '100%' }).map((team) => team.name)).toEqual(['100% Club'])
    expect(football.search('_').teams).toEqual([])
  })

  it('quarantines a duplicate Wikidata identity without reassigning its canonical owner', () => {
    db.exec(`INSERT INTO football_person (id,name,role) VALUES (10,'Player One','player'),(11,'Player One','player')`)
    const payload = {
      qid: 'Q123',
      title: 'Player One',
      body: 'Plain licensed biography.',
      sourceUrl: 'https://en.wikipedia.org/wiki/Player_One',
      revision: '1',
      imagePath: null,
      imageLicense: null,
      birthDate: null,
      foundedYear: null,
      career: []
    }
    expect(saveEntityEnrichment('person', 10, payload, false)).toBe(true)
    expect(saveEntityEnrichment('person', 11, payload, false)).toBe(false)
    expect(db.prepare(`
      SELECT entity_id FROM football_source_ref
      WHERE entity_kind='person' AND source='wikidata' AND external_id='Q123'
    `).get()).toEqual({ entity_id: 10 })
    expect(db.prepare(`
      SELECT status FROM football_conflict WHERE entity_kind='person' AND entity_id=11
    `).get()).toEqual({ status: 'open' })
    expect(db.prepare(`
      SELECT bio,enrichment_state AS state FROM football_person WHERE id=11
    `).get()).toEqual({ bio: null, state: 'error' })
    expect(db.prepare(`
      SELECT COUNT(*) AS n FROM football_article
      WHERE entity_kind='person' AND entity_id=11
    `).get()).toEqual({ n: 0 })
  })

  it('merges a quarantined person only into the explicitly selected target', () => {
    db.exec(`
      INSERT INTO football_person (id,name,role,position) VALUES
        (70,'Source Player','player','Midfielder'),(71,'Canonical Player','manager',NULL);
      INSERT INTO football_tenure (person_id,team_id,role,verified,complete)
        VALUES (70,1,'player',1,1);
      INSERT INTO football_transfer (person_id,to_team_id,from_team,to_team,source,external_id)
        VALUES (70,1,'Youth','Arsenal','transfermarkt','t70');
      INSERT INTO football_favorite (entity_kind,entity_id) VALUES ('person',70);
      INSERT INTO football_external_link (entity_kind,entity_id,provider,url)
        VALUES ('person',70,'website','https://example.com/player');
      INSERT INTO list (id,title,entity_kind) VALUES (70,'Football people','footballPerson');
      INSERT INTO list_item (list_id,entity_id,sort_order) VALUES (70,70,0);
      INSERT INTO football_conflict
        (entity_kind,entity_id,facet,source_a,value_a,source_b,value_b)
        VALUES ('person',70,'identity','statsbomb','Source Player','archive','Possible match: 71');
    `)
    const conflict = db.prepare(`SELECT id FROM football_conflict WHERE entity_id=70`).get() as {
      id: number
    }

    football.resolveConflict(conflict.id, { action: 'mergeEntity', targetEntityId: 71 })

    expect(db.prepare(`SELECT id FROM football_person WHERE id=70`).get()).toBeUndefined()
    expect(db.prepare(`SELECT role,position FROM football_person WHERE id=71`).get())
      .toEqual({ role: 'both', position: 'Midfielder' })
    expect(db.prepare(`SELECT person_id FROM football_transfer WHERE external_id='t70'`).get())
      .toEqual({ person_id: 71 })
    expect(db.prepare(`SELECT person_id FROM football_tenure WHERE team_id=1`).get()).toEqual({
      person_id: 71
    })
    expect(db.prepare(`SELECT entity_id FROM football_favorite WHERE entity_kind='person'`).get()
    ).toEqual({ entity_id: 71 })
    expect(db.prepare(`SELECT entity_id FROM football_external_link WHERE entity_kind='person'`).get()
    ).toEqual({ entity_id: 71 })
    expect(db.prepare(`SELECT entity_id FROM list_item WHERE list_id=70`).get()).toEqual({
      entity_id: 71
    })
    expect(db.prepare(`SELECT entity_id,status,resolution FROM football_conflict WHERE id=?`
    ).get(conflict.id)).toEqual({
      entity_id: 71,
      status: 'resolved',
      resolution: 'Merged into person 71'
    })
  })

  it('matches reference pages by distinctive name and football identity, then reads their facts', () => {
    expect(footballCoreName('Arsenal F.C.', 'team')).toBe(footballCoreName('Arsenal', 'team'))
    expect(footballCoreName('FC Barcelona', 'team')).toBe('barcelona')
    expect(footballCoreName('England national football team', 'team')).toBe('england')
    expect(footballCoreName('Thierry Henry (footballer)', 'person')).toBe('thierry henry')
    expect(footballTitleCandidates('England', 'team', true)).toEqual(['England national football team'])
    const claim = (id: string) => ({ mainsnak: { datavalue: { value: { id } } } })
    const value = (v: unknown) => ({ mainsnak: { datavalue: { value: v } } })
    expect(isFootballEntity({ claims: { P641: [claim('Q2736')] } }, 'team')).toBe(true)
    expect(isFootballEntity({ claims: { P31: [claim('Q5')] } }, 'team')).toBe(false)
    expect(isFootballEntity({ claims: { P106: [claim('Q937857')] } }, 'person')).toBe(true)

    const club = footballEntityFacts({
      claims: {
        P571: [value({ time: '+1886-12-01T00:00:00Z' })],
        P6364: [claim('Q3142'), claim('Q23444')],
        P115: [claim('Q1'), claim('Q2')]
      }
    }, {
      Q3142: { claims: { P465: [value('FF0000')] } },
      Q23444: { claims: { P465: [value('FFFFFF')] } },
      Q2: { labels: { en: { value: 'Emirates Stadium' } }, claims: { P1083: [value({ amount: '+60704' })] } }
    })
    expect(club).toMatchObject({ foundedYear: 1886, colors: ['#ff0000', '#ffffff'], venue: 'Emirates Stadium', venueCapacity: 60704 })
    expect(footballEntityFacts({ claims: { P465: [value('000080'), value('960018')] } }, {}).colors).toEqual(['#000080', '#960018'])

    const person = footballEntityFacts({
      claims: {
        P569: [value({ time: '+1977-08-17T00:00:00Z' })],
        P2048: [value({ amount: '+1.88', unit: 'http://www.wikidata.org/entity/Q11573' })],
        P413: [claim('Q280658')],
        P19: [claim('Q216844')],
        P1532: [claim('Q142')]
      }
    }, {
      Q280658: { labels: { en: { value: 'forward' } } },
      Q216844: { labels: { en: { value: 'Les Ulis' } } },
      Q142: { labels: { en: { value: 'France' } } }
    })
    expect(person).toMatchObject({ birthDate: '1977-08-17', heightCm: 188, position: 'forward', birthPlace: 'Les Ulis', nationality: 'France' })
  })

  it('stores reference colours, venue and player facts without overwriting them with blanks', () => {
    db.exec(`INSERT INTO football_person (id,name,role) VALUES (20,'Reference Player','player')`)
    const base = {
      title: 'Ref', body: 'Body', sourceUrl: 'https://en.wikipedia.org/wiki/Ref', revision: '1',
      imagePath: 'media/crest.png', imageLicense: 'Fair use', birthDate: null, foundedYear: 1886, career: []
    }
    expect(saveEntityEnrichment('team', 1, {
      ...base, qid: 'Q9617', colors: ['#ef0107', '#ffffff'], venue: 'Highbury', venueCapacity: 38419,
      managers: [{ personQid: 'Q48893', name: 'Arsène Wenger', startDate: '1996-10-01', endDate: '2018-05-21' }]
    }, false)).toBe(true)
    expect(football.getTeam(1)!.tenures.filter((tenure) => tenure.role === 'manager').map((tenure) => tenure.person?.name)).toEqual(['Arsène Wenger'])
    expect(saveEntityEnrichment('team', 1, { ...base, qid: 'Q9617', imagePath: null, colors: [] }, false)).toBe(true)
    expect(db.prepare(`SELECT image_path,primary_color,secondary_color,venue,venue_capacity FROM football_team WHERE id=1`).get()).toEqual({
      image_path: 'media/crest.png', primary_color: '#ef0107', secondary_color: '#ffffff', venue: 'Highbury', venue_capacity: 38419
    })
    expect(football.getTeam(1)!.colors).toEqual({ primary: '#ef0107', secondary: '#ffffff' })
    saveEntityEnrichment('person', 20, {
      ...base, qid: 'Q45901', position: 'forward', heightCm: 188, birthPlace: 'Les Ulis',
      career: [{ teamQid: 'Q9617', teamName: 'Arsenal', startDate: '1999-08-01', endDate: '2007-06-30' }]
    }, false)
    expect(football.getPerson(20)).toMatchObject({ position: 'forward', heightCm: 188, birthPlace: 'Les Ulis', quizPack: false })
    expect(football.getPerson(20)!.tenures.map((tenure) => tenure.team.name)).toEqual(['Arsenal'])
  })

  it('joins a Wikidata coach only to a namesake who played for that club', () => {
    db.exec(`
      INSERT INTO football_person (id,name,role) VALUES (30,'Club Legend','player'),(31,'Other Club Man','player');
      INSERT INTO football_alias (entity_kind,entity_id,source,alias,normalized,external_id) VALUES
        ('person',30,'openfootball','Club Legend','club legend','1'),
        ('person',31,'openfootball','Other Club Man','other club man','2');
      INSERT INTO football_event (match_id,team_id,person_id,type,sort_order) VALUES (1,1,30,'goal',0),(1,2,31,'goal',1);
    `)
    const base = {
      title: 'Ref', body: 'Body', sourceUrl: 'https://en.wikipedia.org/wiki/Ref', revision: '1',
      imagePath: null, imageLicense: null, birthDate: null, foundedYear: null, career: [], qid: 'Q9617'
    }
    saveEntityEnrichment('team', 1, { ...base, managers: [
      { personQid: 'Q1', name: 'Club Legend', startDate: '2030-07-01', endDate: null },
      { personQid: 'Q2', name: 'Other Club Man', startDate: '2030-07-01', endDate: null }
    ] }, false)
    const coaches = db.prepare(`SELECT person_id AS id FROM football_tenure WHERE team_id=1 AND role='manager' ORDER BY sort_order`)
      .all() as { id: number }[]
    expect(coaches[0].id).toBe(30)
    expect(db.prepare(`SELECT role FROM football_person WHERE id=30`).get()).toEqual({ role: 'both' })
    expect(coaches[1].id).not.toBe(31)
    expect(db.prepare(`SELECT role FROM football_person WHERE id=31`).get()).toEqual({ role: 'player' })
    expect(db.prepare(`SELECT value_b FROM football_conflict WHERE entity_kind='person' AND entity_id=?`).get(coaches[1].id))
      .toEqual({ value_b: 'Possible matches: 31' })
  })

  it('writes a linked Transfermarkt game: lineups, checked goals with assists, cards, subs and match facts', () => {
    const game: TmGame = {
      gameId: 'tm1', competitionKey: 'premier-league', seasonKey: '2023/24', date: '2024-03-01',
      homeClubId: 'h', awayClubId: 'a', homeName: 'Arsenal FC', awayName: 'Chelsea FC', homeGoals: 2, awayGoals: 1,
      stadium: 'Emirates Stadium', attendance: 60000, referee: 'Michael Oliver',
      homeFormation: '4-3-3', awayFormation: '4-2-3-1', homeManager: 'Mikel Arteta', awayManager: 'Mauricio Pochettino'
    }
    const teams = new Map([['h', 1], ['a', 2]])
    const lineup = (club: string, count: number): TmLineup[] => Array.from({ length: count }, (_, i) => ({
      gameId: 'tm1', playerId: `${club}${i}`, playerName: `${club} Player ${i}`, clubId: club, starter: i < 11,
      position: i === 0 ? 'Goalkeeper' : 'Centre-Back', shirt: i + 1, captain: i === 3
    }))
    const event = (type: TmEvent['type'], club: string, player: string, extra: Partial<TmEvent> = {}): TmEvent => ({
      gameId: 'tm1', minute: 10, type, clubId: club, playerId: player, relatedPlayerId: null, detail: null, ownGoal: false, penalty: false, ...extra
    })
    const players = new Map([['h9', { name: 'h Player 9', birthDate: '1990-01-01', position: 'Centre-Forward', foot: 'right', heightCm: 185, nationality: 'England' }]])
    const events = [
      event('goal', 'h', 'h9', { minute: 12, relatedPlayerId: 'h8' }),
      event('goal', 'h', 'h9', { minute: 60, penalty: true }),
      event('goal', 'a', 'a9', { minute: 70 }),
      event('card', 'a', 'a4', { minute: 30, detail: 'Yellow card' }),
      event('substitution', 'h', 'h10', { minute: 75, relatedPlayerId: 'h12', detail: 'Tactical' })
    ]

    expect(writeTransfermarktGame(game, 1, teams, players, [...lineup('h', 14), ...lineup('a', 13)], events)).toEqual({ lineups: true, goals: true })
    const match = football.getMatch(1)!
    expect(match).toMatchObject({ referee: 'Michael Oliver', homeFormation: '4-3-3', awayManager: 'Mauricio Pochettino', lineupCoverage: 'complete' })
    expect(match.lineups).toHaveLength(27)
    expect(match.events.filter((item) => item.type === 'goal').map((item) => [item.teamId, item.person?.name, item.relatedPerson?.name ?? null, item.penalty]))
      .toEqual([[1, 'h Player 9', 'h Player 8', false], [1, 'h Player 9', null, true], [2, 'a Player 9', null, false]])
    expect(match.events.map((item) => item.type).sort()).toEqual(['card', 'goal', 'goal', 'goal', 'substitution'])
    const scorer = match.events[0].person!
    expect(football.getPerson(scorer.id)).toMatchObject({ heightCm: 185, foot: 'right', position: 'Centre-Forward' })

    const disagreeing = writeTransfermarktGame(game, 1, teams, players, [], [event('goal', 'h', 'h9')])
    expect(disagreeing).toEqual({ lineups: false, goals: false })
    expect(football.getMatch(1)!.events.map((item) => item.type).sort()).toEqual(['card', 'goal', 'goal', 'goal', 'substitution'])
  })

  it('clears stale Player Quiz Pack facts when refreshed career evidence is insufficient', () => {
    db.exec(`
      INSERT INTO football_person (id,name,role,quiz_pack) VALUES (12,'Quiz Player','player',1);
      INSERT INTO football_tenure
        (person_id,team_id,role,start_date,verified,complete,sort_order)
      VALUES (12,1,'player','2020-01-01',1,1,0);
    `)
    expect(saveEntityEnrichment('person', 12, {
      qid: 'Q-short',
      title: 'Quiz Player',
      body: 'Reference.',
      sourceUrl: 'https://example.com/player',
      revision: '1',
      imagePath: null,
      imageLicense: null,
      birthDate: null,
      foundedYear: null,
      career: [{ teamQid: null, teamName: 'Arsenal', startDate: '2020-01-01', endDate: null }]
    }, true)).toBe(true)
    expect(db.prepare(`SELECT quiz_pack FROM football_person WHERE id=12`).get()).toEqual({ quiz_pack: 0 })
    expect(db.prepare(`SELECT COUNT(*) AS n FROM football_tenure WHERE person_id=12`).get()).toEqual({ n: 0 })
  })

  it('derives current, upcoming and completed season states from current fixtures', () => {
    const match = (status: SourceMatch['status'], date: string): SourceMatch => ({
      sourceId: `${status}-${date}`,
      competitionKey: 'premier-league',
      seasonKey: '2026/27',
      seasonLabel: '2026/27',
      date,
      home: { sourceId: 'home', name: 'Home', country: 'England', national: false },
      away: { sourceId: 'away', name: 'Away', country: 'England', national: false },
      stage: null,
      round: null,
      status,
      homeScore: status === 'finished' ? 1 : null,
      awayScore: status === 'finished' ? 0 : null,
      homeHalfTime: null,
      awayHalfTime: null,
      homeExtraTime: null,
      awayExtraTime: null,
      homePenalties: null,
      awayPenalties: null,
      goals: null,
      source: 'api-football',
      sourceUrl: 'fixture',
      rawFingerprint: `${status}-${date}`
    })
    const slice = (matches: SourceMatch[]): SourceSlice => ({
      source: 'api-football',
      competitionKey: 'premier-league',
      seasonKey: '2026/27',
      revision: 'current-state',
      coverage: { results: 'complete' },
      matches
    })
    const now = new Date('2026-09-01T00:00:00Z')
    const active = slice([match('finished', '2026-08-20'), match('scheduled', '2026-09-10')])
    expect(footballSeasonStatus(active, 'current', now)).toBe('current')
    expect(footballSeasonStatus(slice([match('scheduled', '2026-09-10')]), 'current', now)).toBe('upcoming')
    expect(footballSeasonStatus(slice([match('finished', '2026-08-20')]), 'current', now)).toBe('complete')
    writeSlice(active, 'current')
    expect(db.prepare(`
      SELECT status FROM football_season WHERE key='2026/27'
    `).get()).toEqual({ status: 'current' })
  })

  it('marks validated API lineups complete and preserves them on a partial response', () => {
    const match: SourceMatch = {
      sourceId: 'api-match-1',
      competitionKey: 'premier-league',
      seasonKey: '2026/27',
      seasonLabel: '2026/27',
      date: '2026-09-01',
      home: { sourceId: 'api-home', name: 'API Home', country: 'England', national: false },
      away: { sourceId: 'api-away', name: 'API Away', country: 'England', national: false },
      stage: null,
      round: null,
      status: 'finished',
      homeScore: 1,
      awayScore: 0,
      homeHalfTime: null,
      awayHalfTime: null,
      homeExtraTime: null,
      awayExtraTime: null,
      homePenalties: null,
      awayPenalties: null,
      goals: null,
      source: 'api-football',
      sourceUrl: 'fixture',
      rawFingerprint: 'api-match-1'
    }
    writeSlice({
      source: 'api-football',
      competitionKey: 'premier-league',
      seasonKey: '2026/27',
      revision: 'api-r1',
      coverage: { results: 'complete', lineups: 'partial' },
      matches: [match]
    }, 'current')
    const payload = [
      { team: { id: 'api-home' }, startXI: [{ player: { id: 101, name: 'Home Player' } }], substitutes: [] },
      { team: { id: 'api-away' }, startXI: [{ player: { id: 102, name: 'Away Player' } }], substitutes: [] }
    ]
    saveApiFixtureDetails(match, null, payload)
    const matchId = (db.prepare(`
      SELECT entity_id FROM football_source_ref
      WHERE entity_kind='match' AND source='api-football' AND external_id='api-match-1'
    `).get() as { entity_id: number }).entity_id
    expect(db.prepare(`
      SELECT lineup_coverage AS coverage FROM football_match WHERE id=?
    `).get(matchId)).toEqual({ coverage: 'complete' })
    expect(db.prepare(`SELECT COUNT(*) AS n FROM football_lineup WHERE match_id=?`).get(matchId)).toEqual({ n: 2 })
    saveApiFixtureDetails(match, null, [])
    expect(db.prepare(`SELECT COUNT(*) AS n FROM football_lineup WHERE match_id=?`).get(matchId)).toEqual({ n: 2 })
  })

  it('preserves current standings and scorers when replacement payloads are empty', () => {
    db.exec(`
      INSERT INTO football_standing
        (season_id,team_id,rank,rank_official,played,won,drawn,lost,goals_for,goals_against,goal_difference,points)
      VALUES (1,1,1,1,10,8,1,1,20,5,15,25);
      INSERT INTO football_person (id,name,role) VALUES (40,'Existing Scorer','player');
      INSERT INTO football_assertion (entity_kind,entity_id,facet,value,source,status)
      VALUES ('person',40,'top-scorer:1','{"goals":12,"teamId":1}','api-football','accepted');
    `)
    expect(saveApiStandings('premier-league', '2023/24', [])).toBe(false)
    expect(saveApiStandings('premier-league', '2023/24', [{ league: { standings: [[{
      rank: 1,
      team: { id: 501, name: 'Incomplete Team' },
      all: { played: 10, win: null, draw: 1, lose: 1, goals: { for: 20, against: 5 } },
      goalsDiff: 15,
      points: 25
    }]] } }])).toBe(false)
    expect(saveApiTopScorers('premier-league', '2023/24', [])).toBe(false)
    expect(db.prepare(`SELECT COUNT(*) AS n FROM football_standing WHERE season_id=1`).get()).toEqual({ n: 1 })
    expect(db.prepare(`SELECT COUNT(*) AS n FROM football_assertion WHERE facet='top-scorer:1'`).get()).toEqual({ n: 1 })

    expect(saveApiStandings('premier-league', '2023/24', [{ league: { standings: [[{
      rank: 1,
      team: { id: 501, name: 'API Table Team' },
      all: { played: 1, win: 1, draw: 0, lose: 0, goals: { for: 2, against: 0 } },
      goalsDiff: 2,
      points: 3
    }]] } }])).toBe(true)
    expect(saveApiTopScorers('premier-league', '2023/24', [{
      player: { id: 601, name: 'API Scorer' },
      statistics: [{ team: { id: 501, name: 'API Table Team' }, goals: { total: 2 } }]
    }])).toBe(true)
    expect(db.prepare(`
      SELECT facet,state FROM football_coverage
      WHERE source='api-football' AND season_id=1 AND facet IN ('standings','topScorers')
      ORDER BY facet
    `).all()).toEqual([
      { facet: 'standings', state: 'complete' },
      { facet: 'topScorers', state: 'complete' }
    ])
  })

  it('retains complete deep-pack coverage while replacement details are pending', () => {
    const competition = db.prepare(`SELECT id FROM football_competition WHERE key='premier-league'`).get() as { id: number }
    db.prepare(`
      INSERT INTO football_coverage
        (competition_id,season_id,source,facet,state,item_count,revision)
      VALUES (?,1,'statsbomb','scorers','complete',1,'old'),
             (?,1,'statsbomb','lineups','complete',1,'old')
    `).run(competition.id, competition.id)
    const match: SourceMatch = {
      sourceId: 'sb-1',
      competitionKey: 'premier-league',
      seasonKey: '2023/24',
      seasonLabel: '2023/24',
      date: '2024-04-01',
      home: { sourceId: 'sb-home', name: 'SB Home', country: 'England', national: false },
      away: { sourceId: 'sb-away', name: 'SB Away', country: 'England', national: false },
      stage: null,
      round: null,
      status: 'finished',
      homeScore: 1,
      awayScore: 1,
      homeHalfTime: null,
      awayHalfTime: null,
      homeExtraTime: null,
      awayExtraTime: null,
      homePenalties: null,
      awayPenalties: null,
      goals: null,
      source: 'statsbomb',
      sourceUrl: 'fixture',
      rawFingerprint: 'sb-1'
    }
    writeOverlayResultSlice({
      source: 'statsbomb',
      competitionKey: 'premier-league',
      seasonKey: '2023/24',
      revision: 'new',
      coverage: { results: 'complete', scorers: 'not_supplied', lineups: 'not_supplied' },
      matches: [match]
    })
    expect(db.prepare(`
      SELECT facet,state,revision FROM football_coverage
      WHERE source='statsbomb' AND season_id=1 AND facet IN ('scorers','lineups')
      ORDER BY facet
    `).all()).toEqual([
      { facet: 'lineups', state: 'complete', revision: 'old' },
      { facet: 'scorers', state: 'complete', revision: 'old' }
    ])
  })

  it('preserves stored overlay children when a newer pack omits a facet', () => {
    db.exec(`
      INSERT INTO football_person (id,name,role) VALUES (60,'Stored Player','player');
      INSERT INTO football_source_ref (entity_kind,entity_id,source,external_id)
        VALUES ('match',1,'statsbomb','sb-match'),
               ('team',1,'statsbomb','sb-home'),
               ('team',2,'statsbomb','sb-away');
      INSERT INTO football_event (match_id,team_id,person_id,type,minute)
        VALUES (1,1,60,'goal',10);
      INSERT INTO football_lineup (match_id,team_id,person_id,role,starter)
        VALUES (1,1,60,'player',1);
      UPDATE football_match SET event_coverage='complete',lineup_coverage='complete' WHERE id=1;
    `)
    const match: SourceMatch = {
      sourceId: 'sb-match', competitionKey: 'premier-league', seasonKey: '2023/24',
      seasonLabel: '2023/24', date: '2024-03-01',
      home: { sourceId: 'sb-home', name: 'Arsenal', country: 'England', national: false },
      away: { sourceId: 'sb-away', name: 'Chelsea', country: 'England', national: false },
      stage: null, round: null, status: 'finished', homeScore: 2, awayScore: 1,
      homeHalfTime: null, awayHalfTime: null, homeExtraTime: null, awayExtraTime: null,
      homePenalties: null, awayPenalties: null, goals: null, source: 'statsbomb',
      sourceUrl: 'fixture', rawFingerprint: 'sb-match'
    }
    expect(saveOverlayFixtureDetails('statsbomb', match, null, null)).toEqual({
      eventsComplete: false,
      lineupsComplete: false
    })
    expect(db.prepare(`SELECT COUNT(*) AS n FROM football_event WHERE match_id=1`).get()).toEqual({ n: 1 })
    expect(db.prepare(`SELECT COUNT(*) AS n FROM football_lineup WHERE match_id=1`).get()).toEqual({ n: 1 })
    expect(db.prepare(`SELECT event_coverage,lineup_coverage FROM football_match WHERE id=1`).get()
    ).toEqual({ event_coverage: 'complete', lineup_coverage: 'complete' })
  })

  it('reports the last current refresh for the selected competition', () => {
    db.exec(`
      INSERT INTO football_import_run
        (kind,source,competition_key,state,started_at,finished_at)
      VALUES ('current','api-football','premier-league','done','2026-08-01','2026-08-01T10:00:00'),
             ('current','api-football','la-liga','done','2026-08-02','2026-08-02T10:00:00');
    `)
    expect(football.currentSnapshot('premier-league').lastRefreshAt).toBe('2026-08-01T10:00:00')
    expect(football.currentSnapshot('la-liga').lastRefreshAt).toBe('2026-08-02T10:00:00')
    expect(football.currentSnapshot(null).lastRefreshAt).toBe('2026-08-02T10:00:00')
  })

  it('persists half-star journal ratings and removes an empty annotation', () => {
    football.saveJournal(1, { watchedAt: '2024-03-02', rating: 4.5, note: 'A final worth revisiting.' })
    expect(football.getMatch(1)).toMatchObject({ watchedAt: '2024-03-02', rating: 4.5, note: 'A final worth revisiting.' })
    expect(() => football.saveJournal(1, { watchedAt: null, rating: 4.25, note: null })).toThrow(/half-star/i)
    football.saveJournal(1, { watchedAt: null, rating: null, note: null })
    expect(db.prepare(`SELECT COUNT(*) AS n FROM football_match_journal`).get()).toEqual({ n: 0 })
  })

  it('validates and replaces a match FotMob deep link without embedding it', () => {
    const saved = football.saveExternalLink({ entityKind: 'match', entityId: 1, provider: 'fotmob', label: null, url: 'https://www.fotmob.com/matches/arsenal-vs-chelsea/abc#123' })
    expect(saved.url).toContain('fotmob.com/matches')
    expect(football.listExternalLinks('match', 1)).toHaveLength(1)
    const replaced = football.saveExternalLink({ entityKind: 'match', entityId: 1, provider: 'fotmob', label: 'Updated', url: 'https://www.fotmob.com/matches/new-match/xyz#456' })
    expect(replaced.id).toBe(saved.id)
    expect(football.listExternalLinks('match', 1)).toMatchObject([{ label: 'Updated' }])
    expect(() => football.saveExternalLink({ entityKind: 'match', entityId: 1, provider: 'fotmob', url: 'https://fotmob.com/news/1' })).toThrow(/match, team, player, or league/i)
  })

  it('keeps score visibility independent from journal and favorite state', () => {
    football.setFavorite('match', 1, true)
    const match = football.listMatches()[0]
    expect(match).toMatchObject({ homeScore: 2, awayScore: 1, favorite: true })
    football.setFavorite('match', 1, false)
    expect(football.listMatches()[0]).toMatchObject({ homeScore: 2, awayScore: 1, favorite: false })
  })

  it('rejects favorites for nonexistent polymorphic Football entities', () => {
    expect(() => football.setFavorite('person', 9999, true)).toThrow(/not found/i)
    expect(db.prepare(`SELECT COUNT(*) AS n FROM football_favorite`).get()).toEqual({ n: 0 })
  })

  it('labels team season records with their season and competition', () => {
    db.prepare(`
      INSERT INTO football_standing
        (season_id,team_id,rank,rank_official,played,won,drawn,lost,goals_for,goals_against,goal_difference,points)
      VALUES (1,1,1,1,38,28,5,5,91,29,62,89)
    `).run()
    expect(football.getTeam(1)?.seasonRecords).toMatchObject([{
      seasonId: 1,
      seasonLabel: '2023/24',
      competitionKey: 'premier-league',
      competitionName: 'Premier League',
      rank: 1,
      points: 89
    }])
  })

  it('shows tied verified season scorers at the same rank and excludes own goals', () => {
    db.exec(`
      INSERT INTO football_person (id,name,role) VALUES (20,'Scorer A','player'),(21,'Scorer B','player');
      INSERT INTO football_event (match_id,team_id,person_id,type,minute,own_goal,sort_order)
        VALUES (1,1,20,'goal',10,0,0),(1,1,20,'goal',20,0,1),
               (1,2,21,'goal',30,0,2),(1,2,21,'goal',40,0,3),
               (1,2,21,'goal',50,1,4);
    `)
    expect(football.getSeason(1)?.topScorers).toMatchObject([
      { rank: 1, goals: 2, tied: true },
      { rank: 1, goals: 2, tied: true }
    ])
  })

  it('keeps current coverage available when a date filter has no matching fixtures', () => {
    expect(() => football.currentSnapshot('premier-league', '2035-01-01', '2035-01-02')).not.toThrow()
    expect(football.currentSnapshot('premier-league', '2035-01-01', '2035-01-02').matches).toEqual([])
  })

  it('rolls one match attachment up to both teams and the competition without duplication', () => {
    const media = football.saveMedia({
      title: 'Match highlights',
      kind: 'highlight',
      localPath: null,
      url: 'https://example.com/highlight',
      note: null,
      links: [{ entityKind: 'match', entityId: 1 }]
    })
    expect(football.getTeam(1)?.media.map((item) => item.id)).toEqual([media.id])
    expect(football.getTeam(2)?.media.map((item) => item.id)).toEqual([media.id])
    expect(football.getCompetition('premier-league')?.media.map((item) => item.id)).toEqual([media.id])
    football.removeMedia(media.id)
    expect(football.listMedia()).toEqual([])
  })
})

describe('Football schema surface', () => {
  it('creates all archive, source-integrity and personal tables from init.sql', () => {
    const names = new Set((db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name LIKE 'football_%'`).all() as { name: string }[]).map((row) => row.name))
    for (const suffix of [
      'competition','era','season','stage','team','person','tenure','match','lineup','event','standing','honour',
      'alias','source_ref','assertion','coverage','conflict','import_run','article','favorite','match_journal','media','media_link','external_link'
    ]) expect(names.has(`football_${suffix}`), suffix).toBe(true)
  })
})
