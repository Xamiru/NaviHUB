// Orders a set of kanji so that characters sharing a component are dealt
// consecutively — writing 待 right after 持 is the moment the 寺 half becomes
// a unit rather than a shape. Pure: the caller supplies the components (from
// the KRADFILE pack), and kanji with no component data keep their order at the
// end. Greedy chaining rather than clustering: pick a start, then repeatedly
// take the unused kanji sharing the most components with the last one.
export function orderByComponent(
  chars: readonly string[],
  componentsOf: (char: string) => string[]
): string[] {
  const withComps = chars.filter((c) => componentsOf(c).length > 0)
  const without = chars.filter((c) => componentsOf(c).length === 0)
  const remaining = new Set(withComps)
  const out: string[] = []
  let current: string | null = null
  while (remaining.size > 0) {
    if (current === null) {
      current = [...remaining][0]
    } else {
      const cur = new Set(componentsOf(current))
      let best: string | null = null
      let bestShared = 0
      for (const cand of remaining) {
        const shared = componentsOf(cand).filter((c) => cur.has(c)).length
        if (shared > bestShared) {
          best = cand
          bestShared = shared
        }
      }
      current = best ?? [...remaining][0]
    }
    remaining.delete(current)
    out.push(current)
  }
  return [...out, ...without]
}
