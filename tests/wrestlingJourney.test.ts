import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
// @ts-expect-error plain CJS maintenance module
import { sanitizeDb } from '../scripts/sanitizeSql.cjs'
import { WRESTLING_JOURNEYS } from '../src/shared/wrestlingJourneys'
let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
import * as repo from '../src/main/repos/wrestlingJourneyRepo'
beforeEach(() => {
  db = createTestDb()
})
afterEach(() => db.close())
describe('personal wrestling journeys', () => {
  it('shows zero completed steps for a new empty journey', () => {
    const id = repo.save(null, { title: 'Empty', description: '' })
    expect(repo.detail(id)).toMatchObject({ watched: 0, steps: 0, entries: [] })
  })
  it('makes independent editable copies with ordered sourced steps and repeated viewings', () => {
    const id = repo.instantiate(WRESTLING_JOURNEYS[0].key)
    const other = repo.instantiate(WRESTLING_JOURNEYS[0].key)
    const original = repo.detail(id).entries
    expect(original).toHaveLength(8)
    expect(original.every((s) => s.sourceUrl.startsWith('https://www.wwe.com/'))).toBe(true)
    repo.logViewing(id, original[0].id, '2026-09-22', 'First watch')
    repo.logViewing(id, original[0].id, '2026-09-23', 'A rewatch')
    expect(repo.detail(id)).toMatchObject({
      watched: 1,
      entries: [
        { viewings: [{ notes: 'A rewatch' }, { notes: 'First watch' }] },
        ...original.slice(1)
      ]
    })
    expect(repo.detail(other).watched).toBe(0)
    expect(() => repo.removeStep(other, original[0].id)).toThrow(/belong/)
    expect(() => repo.reorder(id, [original[0].id])).toThrow(/order/)
    repo.reorder(id, original.map((s) => s.id).reverse())
    expect(repo.detail(id).entries[0].id).toBe(original.at(-1)!.id)
  })
  it('retains personal context and viewing history after a canonical card is deleted', () => {
    db.exec(
      "INSERT INTO wrestling_event(id,promotion,name,wiki_title) VALUES(1,'wwe','An event','An_event')"
    )
    db.exec("INSERT INTO wrestling_match(id,event_id,sort_order,title) VALUES(1,1,0,'A vs B')")
    const id = repo.save(null, { title: 'Rivalry', description: '' })
    const step = repo.saveStep(id, null, {
      kind: 'match',
      linkedId: 1,
      title: 'A vs B',
      stepDate: '2026-09-23',
      notes: 'My context',
      sourceUrl: ''
    })
    repo.logViewing(id, step, '2026-09-23', 'My reaction')
    db.prepare('DELETE FROM wrestling_match WHERE id=1').run()
    expect(repo.detail(id).entries[0]).toMatchObject({
      linkedId: null,
      title: 'A vs B',
      notes: 'My context',
      viewings: [{ notes: 'My reaction' }]
    })
    sanitizeDb(db)
    expect(repo.list()).toEqual([])
    expect(db.prepare('SELECT COUNT(*) AS n FROM wrestling_journey_viewing').get()).toEqual({
      n: 0
    })
  })
})
