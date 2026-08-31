import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database

vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('../src/main/files', () => ({
  footballRootDir: () => '/tmp/navihub-football-test',
  absoluteMediaPath: (value: string) => `/tmp/navihub-football-test/${value.replace(/^football\//, '')}`,
  downloadImage: vi.fn(async () => null)
}))

import * as football from '../src/main/repos/footballRepo'
import { saveWikimediaSnapshot } from '../src/main/football/wikimedia'
import { saveEntityEnrichment } from '../src/main/football/enrichment'
import {
  footballSeasonStatus,
  saveApiFixtureDetails,
  saveApiStandings,
  saveApiTopScorers,
  writeOverlayResultSlice,
  writeSlice
} from '../src/main/football/sync'
import type { SourceMatch, SourceSlice } from '../src/main/football/sources'

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
