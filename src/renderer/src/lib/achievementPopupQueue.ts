import { ACH_POPUP_LIFE_MS, MAX_STACK } from '@shared/achievements'

export type TimedPopup = { shownAt: number | null }

// Cards wait without ageing until a visible slot opens. This keeps a burst of
// separate poll results FIFO: nothing silently expires behind the three-card
// window before the user has had a chance to see it.
export function advancePopupQueue<T extends TimedPopup>(
  entries: readonly T[],
  now: number
): T[] {
  const retained = entries.filter(
    (entry) => entry.shownAt == null || now - entry.shownAt < ACH_POPUP_LIFE_MS
  )
  let visible = 0
  return retained.map((entry) => {
    if (entry.shownAt != null) {
      visible += 1
      return entry
    }
    if (visible >= MAX_STACK) return entry
    visible += 1
    return { ...entry, shownAt: now }
  })
}

export function visiblePopups<T extends TimedPopup>(entries: readonly T[]): T[] {
  return entries.filter((entry) => entry.shownAt != null).slice(0, MAX_STACK)
}
