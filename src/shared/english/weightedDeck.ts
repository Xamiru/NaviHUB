import { shuffle } from '../shuffle'

// A shuffle biased toward what the LLM writing grader keeps catching you doing,
// WITHOUT duplicating entries: an earlier version pushed 2-3 copies of an item
// into the pool, so one 10-question round could ask the same prompt twice while
// the setup screen counted the unweighted pool. Efraimidis-Spirakis weighted
// sampling without replacement — a heavier weight drifts earlier in the deck,
// every item still appears exactly once, and the count stays honest. Shared by
// the mechanics test and the spot-the-error game; rng injectable for tests.
export function weightedOrder<T>(
  items: readonly T[],
  weightOf: (item: T) => number,
  rng: () => number = Math.random
): T[] {
  let anyWeight = false
  const keyed = items.map((item) => {
    const w = Math.max(0, weightOf(item))
    if (w > 0) anyWeight = true
    return { item, key: rng() ** (1 / (1 + w)) }
  })
  if (!anyWeight) return shuffle(items, rng)
  return keyed.sort((a, b) => b.key - a.key).map((x) => x.item)
}
