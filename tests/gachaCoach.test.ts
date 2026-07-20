import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

// coachTools is pure logic over the repos — no SDK/network. Mock the DB only.
let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

import {
  buildContextBlock,
  buildModelParams,
  dupesToNpLevel,
  executeCoachTool,
  npLevelToDupes,
  persistableAssistantBlocks,
  type CoachContextSnapshot
} from '../src/main/coachTools'
import * as gachaRepo from '../src/main/repos/gachaRepo'
import * as coachRepo from '../src/main/repos/coachRepo'

beforeEach(() => {
  db = createTestDb()
})

describe('buildModelParams', () => {
  it('adds adaptive thinking for opus/sonnet, omits for haiku, never sampling params', () => {
    expect(buildModelParams('claude-opus-4-8')).toEqual({ thinking: { type: 'adaptive' } })
    expect(buildModelParams('claude-sonnet-5')).toEqual({ thinking: { type: 'adaptive' } })
    expect(buildModelParams('claude-haiku-4-5')).toEqual({})
    for (const m of ['claude-opus-4-8', 'claude-haiku-4-5']) {
      const p = buildModelParams(m)
      expect('temperature' in p).toBe(false)
      expect('top_p' in p).toBe(false)
    }
  })
})

describe('NP level ↔ dupes', () => {
  it('round-trips (NP1 = 0 copies consumed)', () => {
    expect(npLevelToDupes(1)).toBe(0)
    expect(npLevelToDupes(5)).toBe(4)
    expect(dupesToNpLevel(2)).toBe(3)
    expect(npLevelToDupes(dupesToNpLevel(2))).toBe(2)
  })
})

describe('persistableAssistantBlocks', () => {
  it('drops a trailing tool_use and keeps thinking+text order', () => {
    const out = persistableAssistantBlocks([
      { type: 'thinking', thinking: '' },
      { type: 'text', text: 'here' },
      { type: 'tool_use', id: 'x', name: 'add_unit', input: {} }
    ])
    expect(out.map((b) => (b as { type: string }).type)).toEqual(['thinking', 'text'])
  })
  it('falls back to a (done) text block when nothing textual remains', () => {
    const out = persistableAssistantBlocks([{ type: 'tool_use', id: 'x', name: 'y', input: {} }])
    expect(out).toEqual([{ type: 'text', text: '(done)' }])
  })
})

describe('buildContextBlock', () => {
  function snap(over: Partial<CoachContextSnapshot> = {}): CoachContextSnapshot {
    return {
      today: '2026-07-10',
      weekday: 'Friday',
      units: [],
      currencies: [{ key: 'quartz', amount: 120 }],
      banners: [],
      goals: [],
      notes: [],
      docs: [],
      news: { title: '', fetchedAt: null },
      ...over
    }
  }

  it('caps servants at 200 and adds an overflow line', () => {
    const units = Array.from({ length: 250 }, (_, i) => ({
      id: i + 1,
      kind: 'servant',
      name: `S${i}`,
      rarity: 5,
      element: 'Saber',
      dupes: 0,
      level: 90,
      favorite: false
    }))
    const block = buildContextBlock(snap({ units }))
    expect(block).toContain('+50 more — use get_roster')
    expect(block.split('\n').filter((l) => l.startsWith('- S')).length).toBe(200)
  })

  it('marks overdue and due-today tasks', () => {
    const block = buildContextBlock(
      snap({
        goals: [
          { kind: 'task', title: 'old', status: 'active', dueAt: '2026-07-01', recur: 'daily' },
          { kind: 'task', title: 'now', status: 'active', dueAt: '2026-07-10', recur: null }
        ]
      })
    )
    expect(block).toContain('[OVERDUE]')
    expect(block).toContain('[DUE TODAY]')
  })

  it('is byte-stable for an identical snapshot', () => {
    expect(buildContextBlock(snap())).toBe(buildContextBlock(snap()))
  })
})

describe('executeCoachTool against the real DB', () => {
  it('add_unit converts NP3 to dupes=2 and dedupes by name on re-add', () => {
    const first = executeCoachTool('fgo', 'add_unit', {
      kind: 'servant',
      name: 'Artoria',
      rarity: 5,
      class: 'Saber',
      np_level: 3
    })
    expect(first.action?.label).toMatch(/^Added Artoria/)
    let unit = gachaRepo.listUnits('fgo')[0]
    expect(unit.dupes).toBe(2)
    expect(unit.element).toBe('Saber')

    // Same name again → update, not a second row.
    const second = executeCoachTool('fgo', 'add_unit', { kind: 'servant', name: 'artoria', np_level: 5 })
    expect(second.action?.label).toMatch(/^Updated artoria/)
    expect(gachaRepo.listUnits('fgo')).toHaveLength(1)
    unit = gachaRepo.listUnits('fgo')[0]
    expect(unit.dupes).toBe(4)
  })

  it('complete_goal rolls a recurring task forward', () => {
    coachRepo.createGoal('fgo', { kind: 'task', title: 'dailies', recur: 'daily', dueAt: '2026-01-01' })
    const id = coachRepo.listGoals('fgo')[0].id
    executeCoachTool('fgo', 'complete_goal', { id })
    const g = coachRepo.listGoals('fgo')[0]
    expect(g.status).toBe('active')
    expect(g.dueAt).not.toBe('2026-01-01')
  })

  it('save_note writes coach memory and get_news reads the cache', () => {
    const note = executeCoachTool('fgo', 'save_note', { content: 'Plays NA' })
    expect(note.action?.label).toContain('Noted')
    expect(coachRepo.listNotes('fgo')[0].content).toBe('Plays NA')

    gachaRepo.replaceNews('fgo', [
      { externalId: 't3_1', title: 'Skadi rerun', url: 'https://x', summary: null, imageUrl: null, publishedAt: null, author: 'a' }
    ])
    const news = executeCoachTool('fgo', 'get_news', {})
    expect(news.result).toContain('Skadi rerun')
  })

  it('returns an error string (not a throw) for an unknown tool', () => {
    const out = executeCoachTool('fgo', 'nope', {})
    expect(out.isError).toBe(true)
    expect(out.result).toContain('Unknown tool')
  })
})
