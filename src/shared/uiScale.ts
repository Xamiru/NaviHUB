// UI scale (Electron zoom factor) — one control that trades text size for how
// much fits on screen. The win is on small/older panels: at 0.8 a 1366×768
// display reports ~1707×960 CSS pixels, so noticeably less scrolling.
//
// Pure + shared so the main process (applying zoom at startup) and the
// renderer (the Settings control) can't drift on bounds or parsing.

export const UI_SCALE_MIN = 0.7
export const UI_SCALE_MAX = 1.5
export const UI_SCALE_DEFAULT = 1

// The steps offered in Settings. Values are frozen — they're written to the
// `ui.scale` setting row.
export const UI_SCALE_STEPS = [0.7, 0.8, 0.9, 1, 1.1, 1.25, 1.5] as const

// Parses a stored `ui.scale` value into a usable zoom factor. Anything absent,
// malformed or out of range falls back to 1 rather than leaving the window at
// an unusable size — a bad value must never make the app unreadable.
export function parseUiScale(raw: string | null | undefined): number {
  // Empty/whitespace counts as absent, NOT as 0 — Number('') is 0, which would
  // otherwise clamp a cleared setting to the minimum instead of 100%.
  if (raw == null || raw.trim() === '') return UI_SCALE_DEFAULT
  const n = Number(raw)
  if (!Number.isFinite(n)) return UI_SCALE_DEFAULT
  return clampUiScale(n)
}

export function clampUiScale(n: number): number {
  if (!Number.isFinite(n)) return UI_SCALE_DEFAULT
  return Math.min(Math.max(n, UI_SCALE_MIN), UI_SCALE_MAX)
}

export function formatUiScale(n: number): string {
  return `${Math.round(n * 100)}%`
}
