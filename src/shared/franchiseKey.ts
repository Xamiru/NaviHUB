// A title-based franchise key shared by the quizzes that keep sequels from
// crowding a question's options. A heuristic only: a miss just means a sibling
// is treated as unrelated.

const SEQUEL_TAIL = [
  /\b(?:season|part|cour)\s*\d+\b.*$/,
  /\b\d+(?:st|nd|rd|th)\s+(?:season|part|cour)\b.*$/,
  /\b(?:final season|the final|the movie|movie|ova|ona|specials?)\b.*$/,
  // Sequel numbering only: "Saw 2", "Toy Story 3". Larger numbers are part of
  // the title ("Mob Psycho 100", "Blade Runner 2049", "Title 1500").
  /\s(?:ii|iii|iv|v|vi|[2-9]|1\d)$/
]

/**
 * The subtitle, season, part and sequel numbering removed: "Show Season 2",
 * "Show II" and "Show: The Movie" all become "show".
 */
export function titleFranchiseKey(title: string): string {
  let base = title.normalize('NFKC').toLowerCase().trim()
  // A subtitle split needs a real prefix, or "Re:Zero" and "Re:Creators" would merge.
  const subtitle = base.match(/^(.{4,}?)\s*(?:[:：]|\s[-–—]\s)/)
  if (subtitle) base = subtitle[1]
  let previous = ''
  while (previous !== base) {
    previous = base
    for (const pattern of SEQUEL_TAIL) base = base.replace(pattern, '').trim()
  }
  const key = base.replace(/[^\p{L}\p{N}]+/gu, ' ').trim()
  return key || title.normalize('NFKC').toLowerCase().trim()
}

export const FRANCHISE_OPTION_CAP = 2

/**
 * Takes `count` options from a best-first ranking with no franchise filling
 * more than two of the question's options (the answer's franchise counts as
 * one), topping up uncapped only when the ranking has nothing else.
 */
export function takeWithFranchiseCap<T>(
  ranked: readonly T[],
  count: number,
  franchiseOf: (value: T) => string,
  answerFranchise: string
): T[] {
  const used = new Map<string, number>([[answerFranchise, 1]])
  const out: T[] = []
  for (const candidate of ranked) {
    if (out.length >= count) break
    const key = franchiseOf(candidate)
    const n = used.get(key) ?? 0
    if (n >= FRANCHISE_OPTION_CAP) continue
    used.set(key, n + 1)
    out.push(candidate)
  }
  for (const candidate of ranked) {
    if (out.length >= count) break
    if (!out.includes(candidate)) out.push(candidate)
  }
  return out
}
