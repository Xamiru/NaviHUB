import { getDictDb } from './dictDb'
import { lookupKanji } from './lookup'
import { componentsFor } from './krad'
import {
  SIMILAR_THRESHOLD,
  rankSimilar,
  type KanjiFeatures,
  type SimilarCandidate
} from '@shared/similarKanji'
import type { SimilarKanji } from '@shared/types'

// Visually-similar-kanji lookup — a CROSS-PACK computation (kradfile
// components × KANJIDIC strokes/onyomi), which is why it lives here and not
// in krad.ts (one pack's module must not depend on another pack's presence).
//
// On-demand, never precomputed: candidates for one kanji are one indexed
// krad_part query + a few thousand JS scores — single-digit ms. A precomputed
// table would need invalidation when EITHER pack is reimported/removed and a
// dict-schema change, for no gain at 6,355 kanji.

interface KradRow {
  kanji: string
  components: string
}

function parseComponents(json: string): string[] {
  try {
    return JSON.parse(json) as string[]
  } catch {
    return []
  }
}

// Feature assembly for a set of kanji. Strokes come from KANJIDIC stats
// (parsed defensively — stats is a Record<string,string>), falling back to the
// sum of the parts' stroke counts; onyomi from KANJIDIC. Both degrade to
// null/empty when a pack is absent.
function featuresFor(chars: string[], componentsByChar: Map<string, string[]>): KanjiFeatures[] {
  const infos = new Map(lookupKanji(chars.join('')).map((k) => [k.character, k]))
  const db = getDictDb()
  const componentStrokes = new Map<string, number | null>()
  try {
    for (const row of db
      .prepare('SELECT component, strokes FROM krad_component')
      .all() as { component: string; strokes: number | null }[]) {
      componentStrokes.set(row.component, row.strokes)
    }
  } catch {
    /* pack absent — strokes fall back below */
  }

  return chars.map((character) => {
    const components = componentsByChar.get(character) ?? []
    const info = infos.get(character)
    let strokes: number | null = null
    const parsed = info ? parseInt(info.stats.strokes ?? '', 10) : NaN
    if (!Number.isNaN(parsed)) {
      strokes = parsed
    } else if (components.length > 0) {
      let sum = 0
      let known = true
      for (const c of components) {
        const s = componentStrokes.get(c)
        if (s == null) {
          known = false
          break
        }
        sum += s
      }
      if (known) strokes = sum
    }
    return {
      character,
      components: new Set(components),
      strokes,
      onyomi: new Set(info?.onyomi ?? [])
    }
  })
}

// Ranked candidates for one kanji. `threshold` mode for the dictionary chips;
// the drills call rankFor and slice themselves.
export function rankFor(char: string, opts: { threshold?: number; limit?: number }): SimilarCandidate[] {
  try {
    const db = getDictDb()
    const set = db.prepare('SELECT id FROM krad_set LIMIT 1').get() as { id: number } | undefined
    if (!set) {
      // No components pack: only the hand-picked overrides can surface.
      const [target] = featuresFor([char], new Map())
      return rankSimilar(target, [], opts)
    }
    const targetComponents = componentsFor(char)
    if (targetComponents.length === 0) {
      const [target] = featuresFor([char], new Map([[char, []]]))
      return rankSimilar(target, [], opts)
    }
    // Every kanji sharing at least one component (indexed krad_part scan).
    const placeholders = targetComponents.map(() => '?').join(',')
    const candidates = db
      .prepare(
        `SELECT DISTINCT k.kanji, k.components
         FROM krad_part p JOIN krad k ON k.set_id = p.set_id AND k.kanji = p.kanji
         WHERE p.component IN (${placeholders})`
      )
      .all(...targetComponents) as KradRow[]
    const componentsByChar = new Map<string, string[]>([[char, targetComponents]])
    for (const c of candidates) componentsByChar.set(c.kanji, parseComponents(c.components))
    const chars = [char, ...candidates.map((c) => c.kanji).filter((k) => k !== char)]
    const [target, ...rest] = featuresFor(chars, componentsByChar)
    return rankSimilar(target, rest, opts)
  } catch {
    return []
  }
}

// Dictionary-page chips: score-thresholded look-alikes, max 8.
export function similarKanji(char: string): SimilarKanji[] {
  return rankFor(char, { threshold: SIMILAR_THRESHOLD, limit: 8 }).map((c) => ({
    character: c.character,
    score: c.score,
    sharedComponents: c.sharedComponents,
    strokes: c.strokes
  }))
}
