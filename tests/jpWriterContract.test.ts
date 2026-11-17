import { readFileSync, readdirSync, statSync } from 'fs'
import { join, relative } from 'path'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'

// The startup auto-restore of held-back built-in Japanese content
// (japaneseSeedSync.ts autoReattachVerdict) treats `updated_at = created_at` as
// proof that a built-in row has only ever held seed text. That holds only while
// every app writer of jp_course, jp_lesson and jp_card moves `updated_at`. This
// pins it: each UPDATE of those tables under src/main sets updated_at, except
// the listed seed-maintenance writes, which never carry a user's change.

const MAIN = fileURLToPath(new URL('../src/main', import.meta.url))

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return files(path)
    return path.endsWith('.ts') ? [path] : []
  })
}

// Seed-maintenance writes that deliberately leave updated_at alone, by file and
// the start of their SET clause.
const ALLOWED: Record<string, string[]> = {
  'db/japaneseSeedSync.ts': [
    'SET seed_key = ?, seed_hash = ?', // the one-time key backfill stamp
    'SET seed_hash = ?', // hash-only writes (adopt, re-attach)
    'SET sort_order', // insert shifts and the within-course reorder
    'SET course_id = ?, sort_order = ?' // a lesson moved to another built-in course
  ],
  'db/japaneseSeed.ts': [
    'SET level = ?, difficulty = ?', // backfillLevels (seed text onto a pre-level course)
    'SET difficulty = ?' // the legacy step renumbering passes
  ]
}

interface Writer {
  file: string
  statement: string
  ok: boolean
}

const writers: Writer[] = files(MAIN).flatMap((path) => {
  const file = relative(MAIN, path).split('\\').join('/')
  const text = readFileSync(path, 'utf8')
  return [...text.matchAll(/UPDATE\s+jp_(?:course|lesson|card)\b(?!_)/g)].map((m) => {
    const start = m.index ?? 0
    const end = text.indexOf('WHERE', start)
    const statement = text.slice(start, end < 0 ? start + 300 : end).replace(/\s+/g, ' ').trim()
    const set = statement.replace(/^UPDATE jp_\w+ /, '')
    let ok = statement.includes('updated_at')
    // A SET list built at runtime: the function pushes updated_at before it.
    if (!ok && statement.includes('${sets.join')) {
      ok = text.slice(Math.max(0, start - 600), start).includes("sets.push(`updated_at = datetime('now')`)")
    }
    if (!ok) ok = (ALLOWED[file] ?? []).some((prefix) => set.startsWith(prefix))
    return { file, statement, ok }
  })
})

describe('Japanese course/lesson/card writers', () => {
  it('finds the writers at all', () => {
    // Guards the regex: a refactor that changed the statement shape would
    // otherwise leave nothing to check.
    expect(writers.filter((w) => w.file === 'repos/japaneseRepo.ts').length).toBeGreaterThanOrEqual(5)
  })

  it('every writer moves updated_at, apart from the listed seed-maintenance writes', () => {
    expect(writers.filter((w) => !w.ok).map((w) => `${w.file}: ${w.statement}`)).toEqual([])
  })
})
