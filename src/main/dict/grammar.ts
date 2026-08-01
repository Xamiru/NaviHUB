import { readFile, unlink } from 'fs/promises'
import { setImmediate as yieldToLoop } from 'timers/promises'
import type Database from 'better-sqlite3'
import { getDictDb } from './dictDb'
import { downloadToTemp, runImport, setImportPhase, setImportProgress } from './importer'
import { clozeGrammarExample, grammarPointCandidates } from '@shared/cloze'
import type {
  GrammarBankInfo,
  GrammarExample,
  GrammarImportSummary,
  GrammarPoint,
  GrammarPointSummary
} from '@shared/types'

// N5-N1 grammar library from hanabira.org (MIT): ~900 points with meaning,
// formation and example sentences, five JSON files imported in one run.
// Cloze fields are PRE-COMPUTED here via @shared/cloze so the drill's pool
// filter is a trivial clozeJp != null and coverage is inspectable at import.

const SOURCE = 'hanabira'
const CHUNK = 200

export const GRAMMAR_LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'] as const
export type GrammarLevel = (typeof GRAMMAR_LEVELS)[number]

// Pinned at a commit sha — the repo is an actively developed app.
const HANABIRA_SHA = 'e52ba79d6f5daf96d552024c084a1fa8dfc2a363'
const grammarUrl = (level: GrammarLevel): string =>
  `https://raw.githubusercontent.com/tristcoil/hanabira.org/${HANABIRA_SHA}/backend/express/json_data/grammar_ja_JLPT_${level}_0001.json`

// ---- pure parsing (exported for tests) ----

export interface ParsedGrammarPoint {
  level: GrammarLevel
  title: string
  meaning: string
  explanation: string | null
  formation: string | null
  examples: GrammarExample[]
  sort: number
}

// One level file: an array of {title, short_explanation, long_explanation,
// formation, examples: [{jp, romaji, en, grammar_audio}], p_tag, s_tag}
// (verified live shape). Tolerant of missing fields; entries without a title
// or meaning are skipped. grammar_audio references files that aren't in the
// repo — dropped.
export function parseGrammarEntries(level: GrammarLevel, raw: unknown): ParsedGrammarPoint[] {
  if (!Array.isArray(raw)) throw new Error(`grammar ${level}: expected an array — format drifted?`)
  const out: ParsedGrammarPoint[] = []
  for (let i = 0; i < raw.length; i++) {
    const item = raw[i] as Record<string, unknown>
    const title = typeof item?.title === 'string' ? item.title.trim() : ''
    const meaning =
      typeof item?.short_explanation === 'string' ? item.short_explanation.trim() : ''
    if (!title || !meaning) continue
    const formation =
      typeof item.formation === 'string' && item.formation.trim() ? item.formation.trim() : null
    const explanation =
      typeof item.long_explanation === 'string' && item.long_explanation.trim()
        ? item.long_explanation.trim()
        : null
    const candidates = grammarPointCandidates(title, formation)
    const examples: GrammarExample[] = []
    if (Array.isArray(item.examples)) {
      for (const ex of item.examples as Record<string, unknown>[]) {
        const jp = typeof ex?.jp === 'string' ? ex.jp.trim() : ''
        if (!jp) continue
        const cloze = clozeGrammarExample(candidates, jp)
        examples.push({
          jp,
          romaji: typeof ex.romaji === 'string' && ex.romaji.trim() ? ex.romaji.trim() : null,
          en: typeof ex.en === 'string' ? ex.en.trim() : '',
          clozeJp: cloze?.clozeJp ?? null,
          clozeAnswer: cloze?.answer ?? null
        })
      }
    }
    const sort = Number(item.s_tag)
    out.push({
      level,
      title,
      meaning,
      explanation,
      formation,
      examples,
      sort: Number.isFinite(sort) ? sort : i
    })
  }
  return out
}

// ---- import ----

function deleteBankRows(db: Database.Database, bankId: number): void {
  db.prepare('DELETE FROM grammar_point WHERE bank_id = ?').run(bankId)
}

// Core import, pure of network IO — the unit-test entry point.
export async function importGrammarData(
  entriesByLevel: ParsedGrammarPoint[][]
): Promise<GrammarImportSummary> {
  const db = getDictDb()
  const all = entriesByLevel.flat()
  if (all.length === 0) throw new Error('No grammar points found in the downloaded files')

  const newId = (db.prepare('SELECT COALESCE(MAX(id), 0) + 1 AS n FROM grammar_bank').get() as { n: number }).n

  const ins = db.prepare(
    `INSERT INTO grammar_point (bank_id, level, title, meaning, explanation, formation, examples, sort)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  )
  const insChunk = db.transaction((slice: ParsedGrammarPoint[]) => {
    for (const p of slice) {
      ins.run(newId, p.level, p.title, p.meaning, p.explanation, p.formation, JSON.stringify(p.examples), p.sort)
    }
  })

  let written = 0
  try {
    setImportPhase('grammar', 0, all.length)
    for (let i = 0; i < all.length; i += CHUNK) {
      const slice = all.slice(i, i + CHUNK)
      insChunk(slice)
      written += slice.length
      setImportProgress(written)
      await yieldToLoop()
    }
  } catch (err) {
    deleteBankRows(db, newId)
    throw err
  }

  setImportPhase('finalizing')
  const old = db.prepare('SELECT id FROM grammar_bank WHERE source = ?').get(SOURCE) as
    | { id: number }
    | undefined
  if (old) {
    deleteBankRows(db, old.id)
    db.prepare('DELETE FROM grammar_bank WHERE id = ?').run(old.id)
  }
  db.prepare('INSERT INTO grammar_bank (id, source, point_count) VALUES (?, ?, ?)').run(
    newId,
    SOURCE,
    written
  )
  return { pointCount: written }
}

export function importGrammar(): Promise<GrammarImportSummary> {
  return runImport(async () => {
    // Five sequential small downloads (wordnet's multi-download precedent).
    const parsed: ParsedGrammarPoint[][] = []
    for (const level of GRAMMAR_LEVELS) {
      const tmp = await downloadToTemp(grammarUrl(level), 'json')
      try {
        const raw = JSON.parse(await readFile(tmp, 'utf8'))
        parsed.push(parseGrammarEntries(level, raw))
      } finally {
        await unlink(tmp).catch(() => {})
      }
    }
    return importGrammarData(parsed)
  })
}

// ---- queries (never throw; null/[] when the pack is absent) ----

function activeBankId(db: Database.Database): number | null {
  const row = db.prepare('SELECT id FROM grammar_bank WHERE source = ?').get(SOURCE) as
    | { id: number }
    | undefined
  return row?.id ?? null
}

export function getGrammarBankInfo(): GrammarBankInfo | null {
  try {
    const row = getDictDb()
      .prepare('SELECT point_count, imported_at FROM grammar_bank WHERE source = ?')
      .get(SOURCE) as { point_count: number; imported_at: string } | undefined
    return row ? { pointCount: row.point_count, importedAt: row.imported_at } : null
  } catch {
    return null
  }
}

export function removeGrammarBank(): void {
  const db = getDictDb()
  const id = activeBankId(db)
  if (id === null) return
  deleteBankRows(db, id)
  db.prepare('DELETE FROM grammar_bank WHERE id = ?').run(id)
}

const LEVEL_ORDER = "CASE level WHEN 'N5' THEN 0 WHEN 'N4' THEN 1 WHEN 'N3' THEN 2 WHEN 'N2' THEN 3 ELSE 4 END"

// ALL summaries in one call (~900 rows) — the renderer filters client-side.
export function listGrammar(): GrammarPointSummary[] {
  try {
    const db = getDictDb()
    const id = activeBankId(db)
    if (id === null) return []
    return db
      .prepare(
        `SELECT id, level, title, meaning FROM grammar_point WHERE bank_id = ?
         ORDER BY ${LEVEL_ORDER}, sort ASC, id ASC`
      )
      .all(id) as GrammarPointSummary[]
  } catch {
    return []
  }
}

function rowToPoint(row: {
  id: number
  level: string
  title: string
  meaning: string
  explanation: string | null
  formation: string | null
  examples: string
}): GrammarPoint {
  let examples: GrammarExample[] = []
  try {
    examples = JSON.parse(row.examples)
  } catch {
    /* keep [] */
  }
  return {
    id: row.id,
    level: row.level,
    title: row.title,
    meaning: row.meaning,
    explanation: row.explanation,
    formation: row.formation,
    examples
  }
}

export function getGrammarPoint(id: number): GrammarPoint | null {
  try {
    const row = getDictDb()
      .prepare(
        'SELECT id, level, title, meaning, explanation, formation, examples FROM grammar_point WHERE id = ?'
      )
      .get(id) as Parameters<typeof rowToPoint>[0] | undefined
    return row ? rowToPoint(row) : null
  } catch {
    return null
  }
}

// Random points WITH at least one clozeable example, for the drill pool.
export function randomGrammar(count: number, levels?: string[] | null): GrammarPoint[] {
  try {
    const db = getDictDb()
    const id = activeBankId(db)
    if (id === null) return []
    const wanted = (levels ?? []).filter((l) => (GRAMMAR_LEVELS as readonly string[]).includes(l))
    const levelClause = wanted.length
      ? `AND level IN (${wanted.map(() => '?').join(',')})`
      : ''
    const rows = db
      .prepare(
        `SELECT id, level, title, meaning, explanation, formation, examples
         FROM grammar_point
         WHERE bank_id = ? AND examples LIKE '%"clozeJp":"%' ${levelClause}
         ORDER BY RANDOM() LIMIT ?`
      )
      .all(id, ...wanted, Math.max(1, count)) as Parameters<typeof rowToPoint>[0][]
    return rows.map(rowToPoint).filter((p) => p.examples.some((e) => e.clozeJp))
  } catch {
    return []
  }
}
