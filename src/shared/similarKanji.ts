// Visually-similar-kanji scoring, pure so it tests with synthetic feature
// sets. The main process assembles KanjiFeatures from kradfile components +
// KANJIDIC strokes/onyomi (src/main/dict/similarKanji.ts); this module owns
// the formula, thresholds and the override list.
//
// kradfile structurally CANNOT surface primitive-vs-primitive confusions
// (人/入 each decompose to themselves — zero shared components), which is
// exactly the class beginners mix up most. SIMILAR_OVERRIDES hand-lists those
// classic pairs; rankSimilar merges them in at a fixed high score.

export interface KanjiFeatures {
  character: string
  components: Set<string>
  strokes: number | null
  onyomi: Set<string>
}

export const SIMILAR_THRESHOLD = 0.5 // dictionary chips keep score >= this
export const OVERRIDE_SCORE = 0.9

// Classic primitive confusion pairs, both directions implied. Frozen content —
// additions welcome, removals need a reason.
export const SIMILAR_OVERRIDES: [string, string][] = [
  ['人', '入'],
  ['土', '士'],
  ['日', '曰'],
  ['千', '干'],
  ['干', '于'],
  ['刀', '力'],
  ['己', '已'],
  ['已', '巳'],
  ['己', '巳'],
  ['大', '太'],
  ['大', '犬'],
  ['太', '犬'],
  ['木', '本'],
  ['王', '玉'],
  ['石', '右'],
  ['名', '各'],
  ['午', '牛'],
  ['天', '夭'],
  ['末', '未'],
  ['矢', '失'],
  ['夫', '天'],
  ['冶', '治'],
  ['戌', '戍'],
  ['微', '徴']
]

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0
  let inter = 0
  for (const x of a) if (b.has(x)) inter++
  return inter / (a.size + b.size - inter)
}

// 0..1 similarity; 0 when no components are shared (such pairs should not be
// candidates at all — overrides handle the primitive exceptions).
export function scoreSimilarity(a: KanjiFeatures, b: KanjiFeatures): number {
  const j = jaccard(a.components, b.components)
  if (j === 0) return 0
  const strokeProx =
    a.strokes != null && b.strokes != null
      ? 1 - Math.min(Math.abs(a.strokes - b.strokes), 6) / 6
      : 0.5
  let onMatch = 0
  for (const o of a.onyomi) {
    if (b.onyomi.has(o)) {
      onMatch = 1
      break
    }
  }
  return 0.55 * j + 0.3 * strokeProx + 0.15 * onMatch
}

export interface SimilarCandidate {
  character: string
  score: number
  sharedComponents: string[]
  strokes: number | null
}

export interface RankOptions {
  // Keep only score >= threshold (chips mode). Omit for drills, which take
  // the top-N regardless and top up separately.
  threshold?: number
  limit?: number
}

// Ranks candidates against the target. Deterministic: score desc →
// shared-component count desc → |Δstrokes| asc → codepoint asc.
export function rankSimilar(
  target: KanjiFeatures,
  candidates: KanjiFeatures[],
  opts: RankOptions = {}
): SimilarCandidate[] {
  const overrides = new Set<string>()
  for (const [x, y] of SIMILAR_OVERRIDES) {
    if (x === target.character) overrides.add(y)
    if (y === target.character) overrides.add(x)
  }

  const byChar = new Map<string, SimilarCandidate & { shared: number; dStrokes: number }>()
  for (const cand of candidates) {
    if (cand.character === target.character) continue
    const base = scoreSimilarity(target, cand)
    const score = overrides.has(cand.character) ? Math.max(base, OVERRIDE_SCORE) : base
    if (score === 0) continue
    const sharedComponents = [...target.components].filter((c) => cand.components.has(c))
    byChar.set(cand.character, {
      character: cand.character,
      score,
      sharedComponents,
      strokes: cand.strokes,
      shared: sharedComponents.length,
      dStrokes:
        target.strokes != null && cand.strokes != null
          ? Math.abs(target.strokes - cand.strokes)
          : 99
    })
  }
  // Overrides not present in the candidate set still surface (the IO layer
  // passes them in when it can; a bare entry keeps the pair visible even when
  // features are missing).
  for (const ch of overrides) {
    if (!byChar.has(ch)) {
      byChar.set(ch, {
        character: ch,
        score: OVERRIDE_SCORE,
        sharedComponents: [],
        strokes: null,
        shared: 0,
        dStrokes: 99
      })
    }
  }

  const ranked = [...byChar.values()].sort(
    (a, b) =>
      b.score - a.score ||
      b.shared - a.shared ||
      a.dStrokes - b.dStrokes ||
      a.character.codePointAt(0)! - b.character.codePointAt(0)!
  )
  const thresholded =
    opts.threshold != null ? ranked.filter((r) => r.score >= opts.threshold!) : ranked
  const limited = opts.limit != null ? thresholded.slice(0, opts.limit) : thresholded
  return limited.map(({ character, score, sharedComponents, strokes }) => ({
    character,
    score,
    sharedComponents,
    strokes
  }))
}
