// Home's widget catalogue and the stored layout it renders from.
//
// The Hero — the wall of your own covers behind the brand — is NOT a widget.
// It is the page's identity and stays pinned above everything, always.
//
// Everything below it is a widget: shown/hidden and reordered from Home's
// Customise dialog, persisted as ONE settings row (`home.widgets`). Keeping the
// pure part here rather than in HomePage.tsx keeps the layout rules easy to
// test; they are exactly the kind of thing that silently rots (a renamed widget
// vanishing, a new one never appearing) if nothing pins them.

export type HomeWidgetKey =
  | 'today'
  | 'resume'
  | 'continue'
  | 'spotlight'
  | 'timeStats'
  | 'music'
  | 'unlocks'
  | 'people'
  | 'recent'
  | 'favorites'

export interface HomeWidgetDef {
  key: HomeWidgetKey
  label: string
  hint: string
  // Column span in Home's 2-column grid. 'full' is a strip or a band that wants
  // the width; 'half' pairs with whatever half sits next to it.
  span: 'full' | 'half'
}

// FROZEN KEY STRINGS: these ride in the `home.widgets` settings row, so
// renaming one orphans that widget in every existing layout (it would be
// dropped as unknown and re-appended under its new name). Add freely; rename
// never.
export const HOME_WIDGETS: HomeWidgetDef[] = [
  { key: 'today', label: 'Today', hint: 'Checklist, Japanese, English and Play', span: 'full' },
  { key: 'resume', label: 'Pick up where you left off', hint: 'Saved positions', span: 'full' },
  { key: 'continue', label: 'Continue', hint: 'Everything in progress', span: 'full' },
  { key: 'spotlight', label: 'Spotlight', hint: 'One title from the backlog, daily', span: 'half' },
  { key: 'timeStats', label: 'Time spent', hint: 'Hours across the library', span: 'half' },
  { key: 'music', label: 'Music', hint: 'Recent listening', span: 'half' },
  { key: 'unlocks', label: 'Recent unlocks', hint: 'Achievements', span: 'full' },
  { key: 'people', label: 'Your people', hint: 'Most-seen voice actors and studios', span: 'full' },
  { key: 'recent', label: 'Recently added', hint: 'Newest in the library', span: 'full' },
  { key: 'favorites', label: 'Favorites', hint: 'Everything you starred', span: 'full' }
]

export const HOME_LAYOUT_SETTING = 'home.widgets'

export interface HomeLayoutEntry {
  key: HomeWidgetKey
  visible: boolean
}

const BY_KEY = new Map(HOME_WIDGETS.map((w) => [w.key, w]))

export function widgetDef(key: HomeWidgetKey): HomeWidgetDef | undefined {
  return BY_KEY.get(key)
}

export function defaultHomeLayout(): HomeLayoutEntry[] {
  return HOME_WIDGETS.map((w) => ({ key: w.key, visible: true }))
}

// Stored layout → the list Home renders.
//
// Deliberately forgiving, because this row outlives the code that wrote it:
// unparseable or absent input falls back to the defaults; a key this build no
// longer knows is dropped; a key the build knows but the row lacks is APPENDED,
// visible — a widget added in a later release has to show up on its own, or it
// would be invisible to everyone who ever opened the Customise dialog.
export function parseHomeLayout(raw: string | null | undefined): HomeLayoutEntry[] {
  let stored: unknown
  try {
    stored = raw ? JSON.parse(raw) : null
  } catch {
    stored = null
  }
  if (!Array.isArray(stored)) return defaultHomeLayout()

  const seen = new Set<HomeWidgetKey>()
  const out: HomeLayoutEntry[] = []
  for (const entry of stored) {
    const key = (entry as { key?: unknown })?.key
    if (typeof key !== 'string' || !BY_KEY.has(key as HomeWidgetKey)) continue
    const k = key as HomeWidgetKey
    if (seen.has(k)) continue
    seen.add(k)
    out.push({ key: k, visible: (entry as { visible?: unknown }).visible !== false })
  }
  for (const w of HOME_WIDGETS) {
    if (!seen.has(w.key)) out.push({ key: w.key, visible: true })
  }
  return out
}

export function serializeHomeLayout(entries: HomeLayoutEntry[]): string {
  return JSON.stringify(entries.map((e) => ({ key: e.key, visible: e.visible })))
}

// Move one entry by `delta` places, clamped. Returns a new array; out-of-range
// moves are a no-op rather than an error, so the Customise dialog's ▲▼ buttons
// need no edge-case handling of their own.
export function moveHomeWidget(
  entries: HomeLayoutEntry[],
  index: number,
  delta: number
): HomeLayoutEntry[] {
  const to = index + delta
  if (index < 0 || index >= entries.length || to < 0 || to >= entries.length) return entries
  const next = [...entries]
  const [moved] = next.splice(index, 1)
  next.splice(to, 0, moved)
  return next
}

export function toggleHomeWidget(entries: HomeLayoutEntry[], key: HomeWidgetKey): HomeLayoutEntry[] {
  return entries.map((e) => (e.key === key ? { ...e, visible: !e.visible } : e))
}
