export function moveChronologyItem(order: string[], from: number, to: number): string[] {
  if (from === to || from < 0 || to < 0 || from >= order.length || to >= order.length) {
    return order
  }
  const next = [...order]
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}

export const CHRONOLOGY_PERFECT_POINTS = 100
export const CHRONOLOGY_ONE_SWAP_POINTS = 50

/**
 * Grades a locked order (2026-10-14 partial scoring, kind `chronologyPoints`):
 * which positions are right, and 100 points for a perfect order, 50 when
 * exactly two titles are misplaced (with four titles that is always one
 * swapped pair), otherwise 0.
 */
export function chronologyPlacement(
  order: readonly string[],
  validKeys: readonly string[]
): { placed: boolean[]; misplaced: number; points: number } {
  const placed = validKeys.map((key, index) => order[index] === key)
  const misplaced = placed.filter((value) => !value).length
  const points =
    misplaced === 0 ? CHRONOLOGY_PERFECT_POINTS : misplaced === 2 ? CHRONOLOGY_ONE_SWAP_POINTS : 0
  return { placed, misplaced, points }
}
