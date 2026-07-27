import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

// connection.ts only touches electron inside initDatabase (for the userData
// path); seedChecklist takes its db as a parameter, so a stub is enough.
vi.mock('electron', () => ({ app: { getPath: () => '/nowhere' } }))

import { seedChecklist } from '../src/main/db/connection'
import { CHECKLIST_SEED } from '../src/shared/checklist'

let db: Database.Database

beforeEach(() => {
  db = createTestDb()
})

const board = (): { task_key: string; cadence: string; sort_order: number }[] =>
  db
    .prepare('SELECT task_key, cadence, sort_order FROM checklist_task ORDER BY cadence, sort_order')
    .all() as { task_key: string; cadence: string; sort_order: number }[]

const flag = (): unknown =>
  db.prepare("SELECT value FROM settings WHERE key = 'checklist.seeded'").get()

describe('seedChecklist', () => {
  it('fills an empty board once and records the flag', () => {
    seedChecklist(db)
    expect(board()).toHaveLength(CHECKLIST_SEED.length)
    expect(flag()).toBeTruthy()

    // Idempotent, and a removal sticks.
    db.prepare("DELETE FROM checklist_task WHERE task_key = 'jp-lesson'").run()
    seedChecklist(db)
    expect(board().some((t) => t.task_key === 'jp-lesson')).toBe(false)
  })

  it('adopts an existing board instead of re-seeding it', () => {
    // The checklist shipped before the flag existed: rows, no flag. Seeding
    // here would re-add what the user removed and renumber the rest from 0.
    db.prepare(
      "INSERT INTO checklist_task (task_key, cadence, sort_order) VALUES ('quiz-round', 'weekly', 7)"
    ).run()

    seedChecklist(db)

    expect(board()).toEqual([{ task_key: 'quiz-round', cadence: 'weekly', sort_order: 7 }])
    expect(flag()).toBeTruthy() // adopted, so it never runs again
  })

  it('leaves a deliberately emptied board empty on the next launch', () => {
    seedChecklist(db)
    db.prepare('DELETE FROM checklist_task').run()
    seedChecklist(db)
    expect(board()).toEqual([])
  })

  it('numbers each cadence from zero on a fresh board', () => {
    seedChecklist(db)
    const daily = board().filter((t) => t.cadence === 'daily')
    const weekly = board().filter((t) => t.cadence === 'weekly')
    expect(daily.map((t) => t.sort_order)).toEqual(daily.map((_, i) => i))
    expect(weekly.map((t) => t.sort_order)).toEqual(weekly.map((_, i) => i))
  })
})
