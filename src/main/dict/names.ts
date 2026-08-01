import { getDictDb } from './dictDb'
import { isKanaOnly } from '@shared/kana'
import type { NameKind, NameQuizItem } from '@shared/types'

// Name sampling over an installed JMnedict (imported as a regular Yomitan
// dictionary — see PRESET_OPTS in importer.ts). Feeds the name-reading drill.

// yomidevs JMnedict def_tags for person names.
const SURNAME_TAGS = ['surname']
const GIVEN_TAGS = ['given', 'fem', 'masc']

function nameDictId(): number | null {
  try {
    const row = getDictDb()
      .prepare("SELECT id FROM dict WHERE title LIKE 'JMnedict%' ORDER BY id DESC LIMIT 1")
      .get() as { id: number } | undefined
    return row?.id ?? null
  } catch {
    return null
  }
}

export function namesInstalled(): boolean {
  return nameDictId() !== null
}

// Random person names with ALL their attested readings aggregated — 中田 has
// many, and the drill must accept any of them.
export function nameSample(req: { kind: NameKind; limit: number }): NameQuizItem[] {
  const dictId = nameDictId()
  if (dictId === null) return []
  const limit = Math.max(1, Math.min(200, req.limit))
  const db = getDictDb()

  const tagsFor = (kind: 'surname' | 'given'): string[] =>
    kind === 'surname' ? SURNAME_TAGS : GIVEN_TAGS
  const kinds: ('surname' | 'given')[] =
    req.kind === 'both' ? ['surname', 'given'] : [req.kind]

  const out: NameQuizItem[] = []
  try {
    for (const kind of kinds) {
      const per = req.kind === 'both' ? Math.ceil(limit / 2) : limit
      const tagClause = tagsFor(kind)
        .map(() => `def_tags LIKE ?`)
        .join(' OR ')
      const tagParams = tagsFor(kind).map((t) => `%${t}%`)
      // Oversample: kanji-less rows and duplicates shrink the yield.
      const rows = db
        .prepare(
          `SELECT DISTINCT expression FROM term
           WHERE dict_id = ? AND reading != '' AND (${tagClause})
           ORDER BY RANDOM() LIMIT ?`
        )
        .all(dictId, ...tagParams, per * 3) as { expression: string }[]
      const picked: string[] = []
      for (const r of rows) {
        // A kana-only "name" has nothing to quiz — the reading IS the prompt.
        if (isKanaOnly(r.expression)) continue
        picked.push(r.expression)
        if (picked.length >= per) break
      }
      if (picked.length === 0) continue
      const placeholders = picked.map(() => '?').join(',')
      const readingRows = db
        .prepare(
          `SELECT expression, reading FROM term
           WHERE dict_id = ? AND expression IN (${placeholders}) AND reading != ''
             AND (${tagClause})`
        )
        .all(dictId, ...picked, ...tagParams) as { expression: string; reading: string }[]
      const byExpr = new Map<string, string[]>()
      for (const row of readingRows) {
        const list = byExpr.get(row.expression) ?? []
        if (!list.includes(row.reading)) list.push(row.reading)
        byExpr.set(row.expression, list)
      }
      for (const expression of picked) {
        const readings = byExpr.get(expression) ?? []
        if (readings.length === 0) continue
        out.push({ expression, kind, readings })
      }
    }
  } catch {
    return []
  }
  // Interleave surname/given when both were requested.
  return out.sort(() => Math.random() - 0.5).slice(0, limit)
}
