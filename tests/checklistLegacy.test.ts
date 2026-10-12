// 'localtime' SQL grouping otherwise depends on the machine's timezone.
process.env.TZ = 'UTC'

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it, vi } from 'vitest'
import Database from 'better-sqlite3'

// The checklist revamp (2026-10) added three tables and three columns to two
// tables every existing library already has. This replays a board written by
// the old build, runs startup (init.sql, then migrations) and drives the real
// repo against the result — the db-change skill's "prove it on an old DB".

vi.mock('electron', () => ({ app: { getPath: () => '/tmp' } }))

let db: Database.Database
vi.mock('../src/main/db/connection', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../src/main/db/connection')>()
  return { ...actual, getSqlite: () => db }
})

import { runMigrations } from '../src/main/db/connection'
import * as checklistRepo from '../src/main/repos/checklistRepo'

const initSql = readFileSync(
  fileURLToPath(new URL('../src/main/db/init.sql', import.meta.url)),
  'utf8'
)

const SAT = '2026-07-25'
const FRI = '2026-07-24'

describe('a checklist written before the revamp', () => {
  it('opens, keeps its history and takes the new features', () => {
    db = new Database(':memory:')
    db.pragma('foreign_keys = ON')
    db.exec(initSql)
    db.exec(`
      DROP TABLE checklist_rule;
      DROP TABLE checklist_custom;
      DROP TABLE checklist_skip;
      ALTER TABLE checklist_task DROP COLUMN days;
      ALTER TABLE checklist_task DROP COLUMN removed_at;
      ALTER TABLE checklist_log DROP COLUMN amount;
      INSERT INTO checklist_task (task_key, cadence, target, sort_order, created_at)
        VALUES ('prog-lesson', 'daily', NULL, 0, '2026-07-01 12:00:00'),
               ('quiz-round', 'weekly', 2, 0, '2026-07-01 12:00:00');
      INSERT INTO checklist_log (task_key, cadence, period_key)
        VALUES ('prog-lesson', 'daily', '${FRI}'), ('prog-lesson', 'daily', '${SAT}'),
               ('quiz-round', 'weekly', '${SAT}');`)

    db.exec(initSql)
    runMigrations(db)

    const before = checklistRepo.status(SAT)
    expect(before.daily[0]).toMatchObject({ key: 'prog-lesson', progress: 1, done: true })
    expect(before.weekly[0]).toMatchObject({ key: 'quiz-round', target: 2, progress: 1 })
    expect(before.streak.current).toBe(2)

    // Every new write path works on the migrated tables.
    const prog = before.daily[0].id
    checklistRepo.credit('quiz-round', 'weekly', SAT, 3)
    checklistRepo.setDays(prog, 1 << 1, SAT)
    checklistRepo.skip(null, 'daily', true, SAT, '2026-07-23')
    checklistRepo.createCustom({ label: 'Stretch', unit: 'min', target: 10, note: null }, 'daily', null, SAT)
    checklistRepo.removeTask(prog, SAT)

    const after = checklistRepo.status(SAT)
    expect(after.weekly[0]).toMatchObject({ progress: 4, done: true })
    expect(after.daily.map((t) => t.label)).toEqual(['Stretch'])
    // Friday is still judged by the board it had then.
    expect(after.history.find((h) => h.day === FRI)?.count).toBe(1)

    // A second startup is a no-op.
    db.exec(initSql)
    runMigrations(db)
    expect(db.pragma('integrity_check', { simple: true })).toBe('ok')
    db.close()
  })
})
