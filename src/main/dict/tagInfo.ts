import { getDictDb } from './dictDb'
import type { DictTagInfo } from '@shared/types'

// Every tag description the installed dictionaries ship in their tag banks
// (JMdict's "v1" = "Ichidan verb", "news13k" = a frequency band, …), one row per
// name from the highest-priority dictionary. A few hundred rows; the renderer
// reads it once to turn tag codes into words.
export function listTagInfo(): DictTagInfo[] {
  const rows = getDictDb()
    .prepare(
      `SELECT t.name, t.category, t.notes FROM tag t JOIN dict d ON d.id = t.dict_id
       ORDER BY d.priority DESC, d.id DESC`
    )
    .all() as { name: string; category: string | null; notes: string | null }[]
  const seen = new Set<string>()
  const out: DictTagInfo[] = []
  for (const r of rows) {
    if (seen.has(r.name)) continue
    seen.add(r.name)
    out.push({ name: r.name, category: r.category || null, notes: r.notes || null })
  }
  return out
}
