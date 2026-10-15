import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('../src/main/db/sqliteHandle', () => ({ getSqlite: () => db }))
vi.mock('../src/main/files', () => ({
  mediaRoot: () => '/tmp',
  absoluteMediaPath: (path: string) => path
}))

import * as football from '../src/main/repos/footballRepo'
import * as quizRepo from '../src/main/repos/quizRepo'

const POSITIONS = ['Goalkeeper', 'Right-Back', 'Centre-Back', 'Centre-Back', 'Left-Back', 'Defensive Midfield', 'Central Midfield', 'Attacking Midfield', 'Right Winger', 'Centre-Forward', 'Left Winger']

// Two clubs, 22 players, ten league matches and one Champions League final,
// every lineup complete; plus transfers either side of the €5m floor.
function seedArchive(): void {
  football.ensureCompetitionCatalog()
  const league = db.prepare(`SELECT id FROM football_competition WHERE key='premier-league'`).get() as { id: number }
  const cup = db.prepare(`SELECT id FROM football_competition WHERE key='champions-league'`).get() as { id: number }
  db.prepare(`INSERT INTO football_season (id,competition_id,key,label,status) VALUES (1,?,'2018/19','2018/19','complete')`).run(league.id)
  db.prepare(`INSERT INTO football_season (id,competition_id,key,label,status) VALUES (2,?,'2018/19','2018/19','complete')`).run(cup.id)
  db.exec(`INSERT INTO football_team (id,name,country) VALUES (1,'Red Club','England'),(2,'Blue Club','England')`)
  db.exec(`INSERT INTO football_stage (id,season_id,key,name,kind) VALUES (1,2,'final','Final','final')`)
  const person = db.prepare(`INSERT INTO football_person (id,name,role,nationality,position,birth_date,height_cm) VALUES (?,?,?,?,?,?,?)`)
  for (let i = 0; i < 22; i++) {
    person.run(i + 1, `Player Number${i + 1}`, 'player', i % 2 ? 'Spain' : 'England', POSITIONS[i % 11], `${1985 + (i % 10)}-05-01`, 170 + i)
  }
  const match = db.prepare(`INSERT INTO football_match (id,title,season_id,stage_id,home_team_id,away_team_id,match_date,status,home_score,away_score,lineup_coverage,home_formation,away_formation)
    VALUES (?,?,?,?,1,2,?,'finished',2,0,'complete','4-3-3','4-3-3')`)
  const lineup = db.prepare(`INSERT INTO football_lineup (match_id,team_id,person_id,starter,shirt,position,sort_order) VALUES (?,?,?,1,?,?,?)`)
  for (let m = 1; m <= 11; m++) {
    const final = m === 11
    match.run(m, 'Red Club vs Blue Club', final ? 2 : 1, final ? 1 : null, `2019-0${final ? 6 : 1}-${String(m).padStart(2, '0')}`)
    for (let i = 0; i < 11; i++) {
      lineup.run(m, 1, i + 1, i + 1, POSITIONS[i], i)
      lineup.run(m, 2, i + 12, i + 1, POSITIONS[i], i)
    }
  }
  const transfer = db.prepare(`INSERT INTO football_transfer (person_id,season,from_team,to_team,fee,source,external_id) VALUES (?,?,?,?,?,'transfermarkt',?)`)
  transfer.run(1, '2017/18', 'Old FC', 'Red Club', 40_000_000, 't1')
  transfer.run(2, '2018/19', 'Old FC', 'Blue Club', 15_000_000, 't2')
  transfer.run(3, '2016/17', 'Old FC', 'Red Club', 90_000_000, 't3')
  transfer.run(4, '2015/16', 'Old FC', 'Red Club', 1_000_000, 't4')
}

beforeEach(() => {
  db = createTestDb()
  seedArchive()
})

describe('football game pools', () => {
  it('reports readiness counts', () => {
    const counts = quizRepo.availability({ scope: 'all' }).football
    expect(counts.wordle).toBe(22)
    expect(counts.lineup).toBe(11)
    expect(counts.transfer).toBe(3)
  })

  it('counts only what the pools can deal', () => {
    // Full profile but no appearances; a conflicted player; a match whose
    // sides have no keeper.
    db.prepare(`INSERT INTO football_person (id,name,role,nationality,position,birth_date) VALUES (99,'Bench Warmer','player','France','Centre-Back','1990-01-01')`).run()
    db.prepare(`INSERT INTO football_conflict (entity_kind,entity_id,facet,source_a,source_b) VALUES ('person',5,'birth_date','a','b')`).run()
    db.exec(`UPDATE football_lineup SET position='Centre-Back' WHERE match_id=1 AND position='Goalkeeper'`)
    const counts = quizRepo.availability({ scope: 'all' }).football
    expect(counts.wordle).toBe(21)
    expect(counts.lineup).toBe(10)
    const [wordle] = quizRepo.challengePool({ kind: 'footballWordle', seed: 4, length: 1 })
    if (wordle.kind !== 'footballWordle') throw new Error('wrong kind')
    expect(wordle.players).toHaveLength(21)
    for (let seed = 1; seed <= 20; seed++) {
      const [lineup] = quizRepo.challengePool({ kind: 'footballLineup', seed, length: 1 })
      if (lineup.kind !== 'footballLineup') throw new Error('wrong kind')
      expect(lineup.matchId).not.toBe(1)
    }
    // Transfer player 1 is in conflict; the count matches what the pool keeps.
    db.prepare(`INSERT INTO football_conflict (entity_kind,entity_id,facet,source_a,source_b) VALUES ('person',1,'birth_date','a','b')`).run()
    expect(quizRepo.availability({ scope: 'all' }).football.transfer).toBe(2)
  })

  it('builds Wordle profiles with the latest club, shirt and league', () => {
    const [question] = quizRepo.challengePool({ kind: 'footballWordle', seed: 4, length: 1 })
    expect(question.kind).toBe('footballWordle')
    if (question.kind !== 'footballWordle') return
    expect(question.players).toHaveLength(22)
    const first = question.players.find((player) => player.label === 'Player Number1')!
    expect(first).toMatchObject({ club: 'Red Club', shirt: 1, league: 'Premier League', nationality: 'England', position: 'Goalkeeper', birthYear: 1985, heightCm: 170 })
  })

  it('deals the final first and lays out a full eleven', () => {
    const [question] = quizRepo.challengePool({ kind: 'footballLineup', seed: 2, length: 1 })
    expect(question.kind).toBe('footballLineup')
    if (question.kind !== 'footballLineup') return
    expect(question.matchId).toBe(11)
    expect(question.stage).toBe('Final')
    expect(question.slots).toHaveLength(11)
    expect(question.slots.filter((slot) => slot.line === 0)).toHaveLength(1)
    expect(question.formation).toBe('4-3-3')
  })

  it('chains only transfers of at least five million', () => {
    const chain = quizRepo.challengePool({ kind: 'footballTransfer', seed: 3, length: 10 })
    expect(chain.length).toBeGreaterThan(0)
    for (const question of chain) {
      if (question.kind !== 'footballTransfer') throw new Error('wrong kind')
      expect(question.reference.fee).toBeGreaterThanOrEqual(5_000_000)
      expect(question.challenger.fee).toBeGreaterThanOrEqual(5_000_000)
    }
  })
})
