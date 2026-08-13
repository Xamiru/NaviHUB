// Pure position math for the pop-out player widget: parsing the persisted
// "x,y" setting and keeping a restored position on an existing display (the
// widget must never reappear on a monitor that was unplugged). The IO half —
// the BrowserWindow itself — lives in widget.ts.

export interface WidgetPos {
  x: number
  y: number
}

export interface WidgetSize {
  width: number
  height: number
}

// Matches Electron's Display.workArea shape.
export interface WorkArea {
  x: number
  y: number
  width: number
  height: number
}

// Persisted as settings key 'widget.pos', value "x,y" (integers, may be
// negative on multi-monitor setups).
export function parseWidgetPos(raw: string | null | undefined): WidgetPos | null {
  if (!raw) return null
  const m = /^(-?\d+),(-?\d+)$/.exec(raw.trim())
  if (!m) return null
  return { x: Number(m[1]), y: Number(m[2]) }
}

export function formatWidgetPos(pos: WidgetPos): string {
  return `${Math.round(pos.x)},${Math.round(pos.y)}`
}

const EDGE_MARGIN = 16

// Bottom-right of the primary display's work area — clear of a game's HUD
// corners less often than top edges, and next to the system clock.
export function defaultWidgetPos(size: WidgetSize, primary: WorkArea): WidgetPos {
  return {
    x: primary.x + primary.width - size.width - EDGE_MARGIN,
    y: primary.y + primary.height - size.height - EDGE_MARGIN
  }
}

// Clamps a saved position into the display it overlaps most. Returns null when
// the widget would be entirely off every current display (its monitor is gone)
// so the caller falls back to defaultWidgetPos.
export function clampWidgetPos(
  pos: WidgetPos,
  size: WidgetSize,
  areas: WorkArea[]
): WidgetPos | null {
  let best: WorkArea | null = null
  let bestOverlap = 0
  for (const a of areas) {
    const ox = Math.min(pos.x + size.width, a.x + a.width) - Math.max(pos.x, a.x)
    const oy = Math.min(pos.y + size.height, a.y + a.height) - Math.max(pos.y, a.y)
    const overlap = Math.max(ox, 0) * Math.max(oy, 0)
    if (overlap > bestOverlap) {
      bestOverlap = overlap
      best = a
    }
  }
  if (!best) return null
  return {
    x: Math.min(Math.max(pos.x, best.x), best.x + best.width - size.width),
    y: Math.min(Math.max(pos.y, best.y), best.y + best.height - size.height)
  }
}
