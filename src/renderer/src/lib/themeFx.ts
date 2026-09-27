// Progress celebrations: a tiny store like lib/toast. Callers report that the
// user logged progress; the theme layer decides whether anything is shown.
export interface ProgressFx {
  id: number
  x: number
  y: number
  combo: number
}

const COMBO_WINDOW_MS = 45_000
let nextId = 1
let combo = 0
let lastAt = 0
let current: ProgressFx | null = null
const listeners = new Set<() => void>()

export function subscribeProgressFx(fn: () => void): () => void {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function getProgressFx(): ProgressFx | null {
  return current
}

export function clearProgressFx(id: number): void {
  if (current?.id !== id) return
  current = null
  for (const l of listeners) l()
}

// Anchors on the element the user pressed, falling back to the focused one.
export function celebrateProgress(anchor: Element | null = document.activeElement): void {
  const now = Date.now()
  combo = now - lastAt <= COMBO_WINDOW_MS ? combo + 1 : 1
  lastAt = now
  const rect = anchor instanceof HTMLElement ? anchor.getBoundingClientRect() : null
  current = {
    id: nextId++,
    x: rect ? rect.left + rect.width / 2 : window.innerWidth - 160,
    y: rect ? rect.top : window.innerHeight - 160,
    combo
  }
  for (const l of listeners) l()
}
