// Constants + geometry shared between the main-process achievement watcher /
// popup-window owner (achPopup.ts) and the renderer surfaces that display
// unlocks (AchPopupPage). One module because both sides of the overlay need
// the SAME numbers: the window is sized and positioned here, and the cards
// inside it lay out against the same slots.

// Above this many unlocks arriving together, individual popups become a stack
// nobody can read. One summary card (or one fallback notification) instead.
// The first tick of a session ingests the WHOLE save file on purpose, so a
// fortnight of playing outside NaviHUB arrives as one batch.
export const ACH_POPUP_BURST_AT = 3

// ---- Overlay window geometry -------------------------------------------------

export type Rect = { x: number; y: number; width: number; height: number }

// Wide enough for a 64px icon + a two-line title, Xbox-360 style. Tall enough
// for MAX_STACK cards plus their gaps — the window is fixed-size and shows up
// to that many cards at once; more queue behind them.
export const POPUP_SIZE = { width: 384, height: 432 }
export const CARD_HEIGHT = 128
export const CARD_GAP = 10

// How far off the work-area corner the window sits.
export const SCREEN_MARGIN = 28

// The most cards visible at once. Beyond this the page holds a FIFO queue and
// each card dismisses itself after its own lifetime, so the stack drains.
export const MAX_STACK = 3

// Bottom-right of the given work area — where Steam puts its achievement
// toasts, and where thumbs obscure gameplay least.
export function anchorPos(workArea: Rect): { x: number; y: number } {
  return {
    x: workArea.x + workArea.width - POPUP_SIZE.width - SCREEN_MARGIN,
    y: workArea.y + workArea.height - POPUP_SIZE.height - SCREEN_MARGIN
  }
}

// Top of the nth card slot inside the window (0 = bottom slot). New cards
// push older ones upward, like the console dashboards did. The page lays out
// with flexbox rather than these absolutes, but the arithmetic pins the
// window height: MAX_STACK * CARD_HEIGHT + gaps must fit POPUP_SIZE.height.
export function cardTop(index: number): number {
  return POPUP_SIZE.height - (index + 1) * CARD_HEIGHT - index * CARD_GAP
}
