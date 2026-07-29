import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

import * as programmingRepo from '../src/main/repos/programmingRepo'
import { PROG_COURSES, progCourse, progLesson, progLessonKey } from '../src/shared/programming/courses'
import { CHEAT_SHEETS, normalizeCmd, practicePool } from '../src/shared/programming/cheatsheets'
import { parseMarkdown } from '../src/shared/markdown'

const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/

describe('course catalog content', () => {
  it('has unique kebab-case course and lesson keys', () => {
    const courseKeys = PROG_COURSES.map((c) => c.key)
    expect(new Set(courseKeys).size).toBe(courseKeys.length)
    for (const c of PROG_COURSES) {
      expect(c.key, c.key).toMatch(KEBAB)
      expect(c.title.trim()).not.toBe('')
      expect(c.lessons.length).toBeGreaterThan(0)
      const lessonKeys = c.lessons.map((l) => l.key)
      expect(new Set(lessonKeys).size, c.key).toBe(lessonKeys.length)
      for (const k of lessonKeys) expect(k, `${c.key}/${k}`).toMatch(KEBAB)
    }
  })

  it('every lesson has a parseable Markdown body with balanced code fences', () => {
    for (const c of PROG_COURSES) {
      for (const l of c.lessons) {
        const id = `${c.key}/${l.key}`
        expect(l.body.trim(), id).not.toBe('')
        // A dangling ``` would swallow the rest of the lesson into one code block.
        const fenceLines = l.body.split('\n').filter((line) => line.trimStart().startsWith('```'))
        expect(fenceLines.length % 2, `${id}: unbalanced code fences`).toBe(0)
        const blocks = parseMarkdown(l.body)
        expect(blocks.length, id).toBeGreaterThan(0)
      }
    }
  })

  it('every question has 4 options and an in-range correct index', () => {
    for (const c of PROG_COURSES) {
      for (const l of c.lessons) {
        for (const q of l.questions) {
          const id = `${c.key}/${l.key}: ${q.prompt.slice(0, 40)}`
          expect(q.options.length, id).toBe(4)
          expect(q.correct, id).toBeGreaterThanOrEqual(0)
          expect(q.correct, id).toBeLessThan(4)
          expect(new Set(q.options).size, `${id}: duplicate options`).toBe(4)
        }
      }
    }
  })

  it('progLesson resolves full keys and rejects unknown ones', () => {
    const c = PROG_COURSES[0]
    const l = c.lessons[0]
    const hit = progLesson(progLessonKey(c.key, l.key))
    expect(hit?.course.key).toBe(c.key)
    expect(hit?.lesson.key).toBe(l.key)
    expect(hit?.index).toBe(0)
    expect(progLesson('nope/nah')).toBeNull()
    expect(progLesson('nokeyatall')).toBeNull()
    expect(progCourse('go-from-python')?.lessons.length).toBeGreaterThan(10)
  })
})

describe('cheatsheet content', () => {
  it('has unique sheet keys and non-empty entries', () => {
    const keys = CHEAT_SHEETS.map((s) => s.key)
    expect(new Set(keys).size).toBe(keys.length)
    for (const s of CHEAT_SHEETS) {
      expect(s.key).toMatch(KEBAB)
      expect(s.entries.length).toBeGreaterThan(0)
      for (const e of s.entries) {
        expect(e.cmd.trim(), `${s.key}: empty cmd`).not.toBe('')
        expect(e.desc.trim(), `${s.key}/${e.cmd}: empty desc`).not.toBe('')
        if (e.answers) expect(e.answers.length, `${s.key}/${e.cmd}`).toBeGreaterThan(0)
      }
    }
  })

  it('practicePool returns only drillable entries, normalized, and filters by sheet', () => {
    const all = practicePool(null)
    const drillable = CHEAT_SHEETS.flatMap((s) => s.entries).filter(
      (e) => e.answers && e.answers.length > 0
    )
    expect(all.length).toBe(drillable.length)
    for (const item of all) {
      for (const a of item.answers) {
        expect(a, `${item.cmd}: answer not normalized`).toBe(normalizeCmd(a))
        expect(a).not.toBe('')
      }
    }
    const gitOnly = practicePool(['git'])
    expect(gitOnly.length).toBeGreaterThan(0)
    expect(gitOnly.every((i) => i.sheetKey === 'git')).toBe(true)
    expect(practicePool([]).length).toBe(all.length) // empty selection = all
  })

  it('normalizeCmd collapses whitespace and spaces pipes uniformly', () => {
    expect(normalizeCmd('  git   status ')).toBe('git status')
    expect(normalizeCmd('sort|uniq -c |sort -rn')).toBe('sort | uniq -c | sort -rn')
    expect(normalizeCmd('ls')).toBe('ls')
  })
})

describe('programmingRepo', () => {
  beforeEach(() => {
    db = createTestDb()
  })

  const KEY = progLessonKey(PROG_COURSES[0].key, PROG_COURSES[0].lessons[0].key)

  it('completes idempotently, lists, and uncompletes', () => {
    expect(programmingRepo.progress()).toEqual([])
    programmingRepo.complete(KEY)
    programmingRepo.complete(KEY) // INSERT OR IGNORE — no duplicate, no throw
    const rows = programmingRepo.progress()
    expect(rows).toHaveLength(1)
    expect(rows[0].lessonKey).toBe(KEY)
    expect(rows[0].completedAt).toBeTruthy()
    programmingRepo.uncomplete(KEY)
    expect(programmingRepo.progress()).toEqual([])
  })

  it('rejects lesson keys that are not in the catalog', () => {
    expect(() => programmingRepo.complete('go-from-python/definitely-not-a-lesson')).toThrow()
    expect(() => programmingRepo.complete('garbage')).toThrow()
    // uncomplete of an unknown key is a harmless no-op delete
    expect(() => programmingRepo.uncomplete('garbage')).not.toThrow()
  })
})
