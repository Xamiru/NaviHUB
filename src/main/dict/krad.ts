import { readFile, unlink } from 'fs/promises'
import { setImmediate as yieldToLoop } from 'timers/promises'
import type Database from 'better-sqlite3'
import { getDictDb } from './dictDb'
import { downloadToTemp, runImport, setImportPhase, setImportProgress } from './importer'
import type {
  KanjiComponents,
  KradComponent,
  KradImportSummary,
  KradSetInfo
} from '@shared/types'

// KRADFILE kanji decompositions (hoffmannjp/krad-unicode — EDRDG data with the
// components already converted to proper Unicode): 6,355 kanji → their visible
// parts, plus the 253-part component list with stroke counts. Powers the
// dictionary page's components row, the search-by-parts page and the
// build-a-kanji drill. The radkfile inversion (component → kanji) is computed
// at import into krad_part so search is one GROUP BY.

const SOURCE = 'kradfile'
const CHUNK = 1000

// Pinned at a commit sha; the repo is dormant (EDRDG's data is static) but
// pinning is the house style.
const KRAD_SHA = 'f4bda343f05291c170450f823ee9b7294531b7f7'
const KRAD_URL = `https://raw.githubusercontent.com/hoffmannjp/krad-unicode/${KRAD_SHA}/krad.json`
const COMPONENTS_URL = `https://raw.githubusercontent.com/hoffmannjp/krad-unicode/${KRAD_SHA}/krad_components.json`

// ---- pure parsing (exported for tests) ----

export interface KradEntry {
  kanji: string
  components: string[]
}

// krad.json: [{literal, components: string[]}, …] (verified live shape).
export function parseKradJson(raw: unknown): KradEntry[] {
  if (!Array.isArray(raw)) throw new Error('krad.json: expected an array — format drifted?')
  const out: KradEntry[] = []
  for (const item of raw) {
    const literal = (item as { literal?: unknown })?.literal
    const components = (item as { components?: unknown })?.components
    if (typeof literal !== 'string' || literal.length === 0) continue
    if (!Array.isArray(components)) continue
    const parts = components.filter((c): c is string => typeof c === 'string' && c.length > 0)
    if (parts.length === 0) continue
    out.push({ kanji: literal, components: parts })
  }
  if (out.length === 0) throw new Error('krad.json: no usable entries — format drifted?')
  return out
}

// krad_components.json: [{component, strokeCount}, …] (verified live shape).
export function parseKradComponentsJson(raw: unknown): { component: string; strokes: number | null }[] {
  if (!Array.isArray(raw)) throw new Error('krad_components.json: expected an array')
  const out: { component: string; strokes: number | null }[] = []
  for (const item of raw) {
    const component = (item as { component?: unknown })?.component
    const strokes = (item as { strokeCount?: unknown })?.strokeCount
    if (typeof component !== 'string' || component.length === 0) continue
    out.push({ component, strokes: typeof strokes === 'number' ? strokes : null })
  }
  return out
}

// ---- import ----

function deleteSetRows(db: Database.Database, setId: number): void {
  db.prepare('DELETE FROM krad WHERE set_id = ?').run(setId)
  db.prepare('DELETE FROM krad_part WHERE set_id = ?').run(setId)
  db.prepare('DELETE FROM krad_component WHERE set_id = ?').run(setId)
}

// Core import, pure of network IO — the unit-test entry point.
export async function importKradData(
  kradRaw: unknown,
  componentsRaw: unknown
): Promise<KradImportSummary> {
  const db = getDictDb()
  const entries = parseKradJson(kradRaw)
  const components = parseKradComponentsJson(componentsRaw)

  const newId = (db.prepare('SELECT COALESCE(MAX(id), 0) + 1 AS n FROM krad_set').get() as { n: number }).n

  const insKrad = db.prepare('INSERT INTO krad (set_id, kanji, components) VALUES (?, ?, ?)')
  const insPart = db.prepare('INSERT OR IGNORE INTO krad_part (set_id, component, kanji) VALUES (?, ?, ?)')
  const insComponent = db.prepare(
    'INSERT OR IGNORE INTO krad_component (set_id, component, strokes) VALUES (?, ?, ?)'
  )
  const insChunk = db.transaction((slice: KradEntry[]) => {
    for (const e of slice) {
      insKrad.run(newId, e.kanji, JSON.stringify(e.components))
      for (const part of e.components) insPart.run(newId, part, e.kanji)
    }
  })

  let written = 0
  try {
    setImportPhase('components', 0, entries.length)
    // Duplicate literals exist in the source (JIS variants) — keep the first.
    const seen = new Set<string>()
    const unique = entries.filter((e) => (seen.has(e.kanji) ? false : (seen.add(e.kanji), true)))
    for (let i = 0; i < unique.length; i += CHUNK) {
      const slice = unique.slice(i, i + CHUNK)
      insChunk(slice)
      written += slice.length
      setImportProgress(written)
      await yieldToLoop()
    }
    db.transaction(() => {
      for (const c of components) insComponent.run(newId, c.component, c.strokes)
    })()
  } catch (err) {
    deleteSetRows(db, newId)
    throw err
  }

  setImportPhase('finalizing')
  const old = db.prepare('SELECT id FROM krad_set WHERE source = ?').get(SOURCE) as
    | { id: number }
    | undefined
  if (old) {
    deleteSetRows(db, old.id)
    db.prepare('DELETE FROM krad_set WHERE id = ?').run(old.id)
  }
  db.prepare(
    'INSERT INTO krad_set (id, source, revision, kanji_count, component_count) VALUES (?, ?, ?, ?, ?)'
  ).run(newId, SOURCE, KRAD_SHA.slice(0, 7), written, components.length)
  return { kanjiCount: written, componentCount: components.length }
}

export function importKrad(): Promise<KradImportSummary> {
  return runImport(async () => {
    // Two sequential small downloads (the wordnet two-file precedent).
    const kradTmp = await downloadToTemp(KRAD_URL, 'json')
    let componentsTmp: string | null = null
    try {
      componentsTmp = await downloadToTemp(COMPONENTS_URL, 'json')
      setImportPhase('reading')
      const kradRaw = JSON.parse(await readFile(kradTmp, 'utf8'))
      const componentsRaw = JSON.parse(await readFile(componentsTmp, 'utf8'))
      return await importKradData(kradRaw, componentsRaw)
    } finally {
      await unlink(kradTmp).catch(() => {})
      if (componentsTmp) await unlink(componentsTmp).catch(() => {})
    }
  })
}

// ---- queries (never throw; null/[] when the pack is absent) ----

function activeSetId(db: Database.Database): number | null {
  const row = db.prepare('SELECT id FROM krad_set WHERE source = ?').get(SOURCE) as
    | { id: number }
    | undefined
  return row?.id ?? null
}

export function getKradSetInfo(): KradSetInfo | null {
  try {
    const row = getDictDb()
      .prepare(
        'SELECT revision, kanji_count, component_count, imported_at FROM krad_set WHERE source = ?'
      )
      .get(SOURCE) as
      | { revision: string | null; kanji_count: number; component_count: number; imported_at: string }
      | undefined
    return row
      ? {
          revision: row.revision,
          kanjiCount: row.kanji_count,
          componentCount: row.component_count,
          importedAt: row.imported_at
        }
      : null
  } catch {
    return null
  }
}

export function removeKradSet(): void {
  const db = getDictDb()
  const id = activeSetId(db)
  if (id === null) return
  deleteSetRows(db, id)
  db.prepare('DELETE FROM krad_set WHERE id = ?').run(id)
}

// Components of one kanji, with stroke counts where known.
export function kradFor(kanji: string): KanjiComponents | null {
  try {
    const db = getDictDb()
    const id = activeSetId(db)
    if (id === null) return null
    const row = db
      .prepare('SELECT components FROM krad WHERE set_id = ? AND kanji = ?')
      .get(id, kanji) as { components: string } | undefined
    if (!row) return null
    const parts = JSON.parse(row.components) as string[]
    const strokes = new Map(
      (
        db.prepare('SELECT component, strokes FROM krad_component WHERE set_id = ?').all(id) as {
          component: string
          strokes: number | null
        }[]
      ).map((r) => [r.component, r.strokes])
    )
    return {
      kanji,
      components: parts.map((char) => ({ char, strokes: strokes.get(char) ?? null }))
    }
  } catch {
    return null
  }
}

// Components-only convenience used by the kanji lookup to decorate KanjiInfo.
export function componentsFor(kanji: string): string[] {
  try {
    const db = getDictDb()
    const id = activeSetId(db)
    if (id === null) return []
    const row = db
      .prepare('SELECT components FROM krad WHERE set_id = ? AND kanji = ?')
      .get(id, kanji) as { components: string } | undefined
    return row ? (JSON.parse(row.components) as string[]) : []
  } catch {
    return []
  }
}

// Kanji containing ALL of the given components, ordered by component count
// (simpler kanji first) then codepoint.
export function kradSearch(parts: string[]): { character: string; strokeCount: number | null }[] {
  const unique = [...new Set(parts.filter((p) => p && p.trim()))]
  if (unique.length === 0) return []
  try {
    const db = getDictDb()
    const id = activeSetId(db)
    if (id === null) return []
    const placeholders = unique.map(() => '?').join(',')
    const rows = db
      .prepare(
        `SELECT p.kanji AS character, k.components
         FROM krad_part p JOIN krad k ON k.set_id = p.set_id AND k.kanji = p.kanji
         WHERE p.set_id = ? AND p.component IN (${placeholders})
         GROUP BY p.kanji HAVING COUNT(DISTINCT p.component) = ?`
      )
      .all(id, ...unique, unique.length) as { character: string; components: string }[]
    return rows
      .map((r) => {
        let count: number | null = null
        try {
          count = (JSON.parse(r.components) as string[]).length
        } catch {
          /* ignore */
        }
        return { character: r.character, strokeCount: count }
      })
      .sort(
        (a, b) =>
          (a.strokeCount ?? 99) - (b.strokeCount ?? 99) ||
          a.character.codePointAt(0)! - b.character.codePointAt(0)!
      )
  } catch {
    return []
  }
}

// The full component list for the picker grid, with per-component kanji counts.
export function kradComponents(): KradComponent[] {
  try {
    const db = getDictDb()
    const id = activeSetId(db)
    if (id === null) return []
    return (
      db
        .prepare(
          `SELECT c.component, c.strokes,
                  (SELECT COUNT(*) FROM krad_part p WHERE p.set_id = c.set_id AND p.component = c.component) AS kanji_count
           FROM krad_component c WHERE c.set_id = ?
           ORDER BY c.strokes ASC, c.component ASC`
        )
        .all(id) as { component: string; strokes: number | null; kanji_count: number }[]
    ).map((r) => ({ component: r.component, strokes: r.strokes, kanjiCount: r.kanji_count }))
  } catch {
    return []
  }
}

// Random decomposition rows for the build-a-kanji pool.
export function kradSample(count: number): KradEntry[] {
  try {
    const db = getDictDb()
    const id = activeSetId(db)
    if (id === null) return []
    const rows = db
      .prepare('SELECT kanji, components FROM krad WHERE set_id = ? ORDER BY RANDOM() LIMIT ?')
      .all(id, Math.max(1, count)) as { kanji: string; components: string }[]
    return rows
      .map((r) => {
        try {
          return { kanji: r.kanji, components: JSON.parse(r.components) as string[] }
        } catch {
          return null
        }
      })
      .filter((r): r is KradEntry => r !== null)
  } catch {
    return []
  }
}
