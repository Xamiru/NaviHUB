import { readdirSync, statSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'
import { buildIndex } from '../src/main/history/historyIndex'
import { article, decade, overview, sourceView, type LibraryPort } from '../src/main/history/historyViews'
import { ID_LOCK, loadCatalogEntries } from '../src/shared/history/catalog'
import { KIND_DIRS } from '../src/shared/history/model'
import { formatIssue, validateCatalog } from '../src/shared/history/validate'

// The gate every History research session must pass: the committed catalog
// validates with zero errors (warnings are printed for the session report),
// and every slug ever committed is still present or redirected.

const CONTENT = fileURLToPath(new URL('../src/shared/history/content', import.meta.url))

describe('committed History content', () => {
  const entries = loadCatalogEntries()
  const issues = validateCatalog(entries, ID_LOCK)

  it('validates with no errors', () => {
    const errors = issues.filter((i) => i.severity === 'error').map(formatIssue)
    expect(errors).toEqual([])
  })

  it('loads every content file and nothing else lives in the content folders', () => {
    const dirs = new Set(Object.values(KIND_DIRS))
    let files = 0
    for (const name of readdirSync(CONTENT)) {
      const full = join(CONTENT, name)
      if (!statSync(full).isDirectory()) {
        expect(name).toBe('ids.lock.json')
        continue
      }
      expect(dirs.has(name as never), `unexpected folder ${name}`).toBe(true)
      for (const file of readdirSync(full)) {
        if (file === '.gitkeep') continue
        expect(file, `${name}/${file}`).toMatch(/^[a-z0-9-]+\.ts$/)
        files++
      }
    }
    expect(entries).toHaveLength(files)
  })

  it('keeps the slug lock free of duplicates', () => {
    expect(new Set(ID_LOCK.ids).size).toBe(ID_LOCK.ids.length)
  })

  it('renders every committed article, source, decade and the overview', () => {
    const index = buildIndex(entries)
    const empty: LibraryPort = { byExternal: () => new Map(), byIds: () => new Map(), cast: () => new Map() }
    const ctx = {
      marks: new Map(),
      cached: () => null,
      library: empty,
      personalLinks: [],
      archive: [],
      fileExists: () => false,
      note: null
    }
    for (const { entity } of entries) {
      const ref = `${entity.kind}:${entity.id}`
      if (entity.kind === 'source') expect(sourceView(index, entity.id, ctx.cached), ref).not.toBeNull()
      else if (['event', 'person', 'period', 'place'].includes(entity.kind)) {
        expect(article(index, ref, ctx), ref).not.toBeNull()
      }
    }
    const { decades } = overview(index, ctx)
    for (const d of decades) expect(decade(index, d.start, ctx).start).toBe(d.start)
  })

  it('reports warnings for the research session summary', () => {
    const warnings = issues.filter((i) => i.severity === 'warning').map(formatIssue)
    // Not a failure: printed so a session can list what is still open.
    if (warnings.length) console.info(`History content warnings:\n${warnings.join('\n')}`)
    expect(Array.isArray(warnings)).toBe(true)
  })
})
