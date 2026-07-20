import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

import * as coachRepo from '../src/main/repos/coachRepo'

beforeEach(() => {
  db = createTestDb()
})

describe('coach threads & messages', () => {
  it('creates one active thread and archives on new', () => {
    const t1 = coachRepo.activeThread('fgo')
    expect(coachRepo.activeThread('fgo').id).toBe(t1.id) // same active thread
    const t2 = coachRepo.newThread('fgo')
    expect(t2.id).not.toBe(t1.id)
    expect(coachRepo.activeThread('fgo').id).toBe(t2.id)
    expect(coachRepo.listThreads('fgo').map((t) => t.id)).toEqual([t1.id]) // archived only
  })

  it('historyWindow returns verbatim blocks and starts on a user row', () => {
    const t = coachRepo.activeThread('fgo')
    // A dangling assistant row first (should be dropped from the window head).
    coachRepo.appendMessage({ threadId: t.id, role: 'assistant', text: 'hi', apiBlocks: [{ type: 'text', text: 'hi' }] })
    coachRepo.appendMessage({ threadId: t.id, role: 'user', text: 'add Mash', apiBlocks: [{ type: 'text', text: 'add Mash' }] })
    coachRepo.appendMessage({
      threadId: t.id,
      role: 'assistant',
      text: 'done',
      apiBlocks: [{ type: 'thinking', thinking: '' }, { type: 'text', text: 'done' }]
    })
    const win = coachRepo.historyWindow(t.id, 30)
    expect(win[0].role).toBe('user')
    expect(win.map((m) => m.role)).toEqual(['user', 'assistant'])
    expect(win[1].content).toEqual([{ type: 'thinking', thinking: '' }, { type: 'text', text: 'done' }])
  })
})

describe('goals, tasks & reminders', () => {
  it('rolls a recurring task forward from today, not the stale due date', () => {
    expect(coachRepo.rollForward('2026-01-01', 'daily', '2026-07-10')).toBe('2026-07-11')
    expect(coachRepo.rollForward('2026-01-01', 'weekly', '2026-07-10')).toBe('2026-07-17')
    expect(coachRepo.rollForward(null, 'daily', '2026-07-10')).toBe('2026-07-11')
  })

  it('completing a recurring task keeps it active and rolls due_at; a one-off closes', () => {
    const recurId = coachRepo.createGoal('fgo', {
      kind: 'task',
      title: 'dailies',
      recur: 'daily',
      dueAt: '2026-07-01'
    })
    coachRepo.completeGoal(recurId, '2026-07-10')
    const [task] = coachRepo.listGoals('fgo')
    expect(task.status).toBe('active')
    expect(task.dueAt).toBe('2026-07-11')

    const oneOff = coachRepo.createGoal('fgo', { kind: 'goal', title: 'save 300 SQ' })
    coachRepo.completeGoal(oneOff, '2026-07-10')
    const settled = coachRepo.listGoals('fgo', true).find((g) => g.id === oneOff)!
    expect(settled.status).toBe('done')
    expect(coachRepo.listGoals('fgo').some((g) => g.id === oneOff)).toBe(false) // hidden by default
  })

  it('dueCounts counts active goals due today or overdue, per game', () => {
    coachRepo.createGoal('fgo', { kind: 'task', title: 'overdue', dueAt: '2026-07-01' })
    coachRepo.createGoal('fgo', { kind: 'task', title: 'today', dueAt: '2026-07-10' })
    coachRepo.createGoal('fgo', { kind: 'task', title: 'future', dueAt: '2026-12-01' })
    coachRepo.createGoal('fgo', { kind: 'goal', title: 'no date' })
    expect(coachRepo.dueCounts('2026-07-10')).toEqual({ fgo: 2 })
  })
})

describe('notes & docs', () => {
  it('CRUDs notes and docs with summary', () => {
    const n = coachRepo.createNote('fgo', 'Plays NA', 'coach')
    expect(coachRepo.listNotes('fgo')[0].content).toBe('Plays NA')
    coachRepo.removeNote(n)
    expect(coachRepo.listNotes('fgo')).toHaveLength(0)

    const d = coachRepo.createDoc('fgo', 'log', 'raw text')
    coachRepo.setDocSummary(d, '- plays NA')
    expect(coachRepo.listDocs('fgo')[0].summary).toBe('- plays NA')
  })
})
