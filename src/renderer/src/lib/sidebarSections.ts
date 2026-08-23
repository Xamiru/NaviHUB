// Sidebar section catalogue and the stored visibility it renders from.
//
// The mirror of homeWidgets.ts for the nav tree: which entries Settings can
// hide, persisted as ONE settings row (`sidebar.hidden`). Hiding is purely
// presentational — routes stay live so Ctrl+K and old links still land there.
//
// Keeping the pure part here rather than in Sidebar.tsx / SettingsPage.tsx is
// what makes it testable (the renderer has no .tsx tests): the forgiving-parse
// rules below are exactly the kind of thing that silently rots if nothing pins
// them.

import { MEDIA_CONFIGS } from './mediaConfig'

export const SIDEBAR_HIDDEN_SETTING = 'sidebar.hidden'

export type SidebarGroup = 'core' | 'library' | 'play' | 'learn'

export interface SidebarSectionDef {
  key: string
  label: string
  group: SidebarGroup
}

function mediaDefs(): SidebarSectionDef[] {
  return MEDIA_CONFIGS.filter((cfg) => !cfg.hideFromSidebar).map((cfg) => ({
    key: cfg.key,
    label: cfg.sidebarLabel ?? cfg.plural,
    group: 'library' as const
  }))
}

// FROZEN KEY STRINGS: they ride in the `sidebar.hidden` settings row. Media
// keys are the existing MediaConfig keys; standalone sections are listed below.
// Add freely; rename never — a renamed key would resurface a section the user
// hid (and its old hidden entry would linger as an unknown, harmlessly dropped).
export function sidebarSectionDefs(): SidebarSectionDef[] {
  return [
    { key: 'checklist', label: 'Checklist', group: 'core' },
    { key: 'stats', label: 'Stats', group: 'core' },
    ...mediaDefs(),
    { key: 'music', label: 'Music', group: 'library' },
    { key: 'wrestling', label: 'Wrestling', group: 'library' },
    { key: 'lists', label: 'Lists', group: 'library' },
    { key: 'tags', label: 'Tags', group: 'library' },
    { key: 'quiz', label: 'Quiz', group: 'play' },
    { key: 'gacha', label: 'Gacha', group: 'play' },
    { key: 'japanese', label: 'Japanese', group: 'learn' },
    { key: 'english', label: 'English', group: 'learn' },
    { key: 'programming', label: 'Programming', group: 'learn' }
  ]
}

const KNOWN_KEYS = new Set(sidebarSectionDefs().map((s) => s.key))

export function sectionDef(key: string): SidebarSectionDef | undefined {
  return sidebarSectionDefs().find((s) => s.key === key)
}

export function defaultHiddenSections(): Set<string> {
  return new Set()
}

// Stored row → the set of hidden keys the Sidebar filters by.
//
// Deliberately forgiving, because this row outlives the code that wrote it:
// unparseable or absent input hides nothing; an unknown key (a section this
// build no longer offers) is dropped.
export function parseHiddenSections(raw: string | null | undefined): Set<string> {
  let stored: unknown
  try {
    stored = raw ? JSON.parse(raw) : null
  } catch {
    stored = null
  }
  if (!Array.isArray(stored)) return defaultHiddenSections()
  const out = new Set<string>()
  for (const entry of stored) {
    if (typeof entry !== 'string' || !KNOWN_KEYS.has(entry)) continue
    out.add(entry)
  }
  return out
}

export function serializeHiddenSections(hidden: Iterable<string>): string {
  return JSON.stringify([...hidden].filter((k) => KNOWN_KEYS.has(k)))
}

export function toggleSectionHidden(hidden: Set<string>, key: string): Set<string> {
  const next = new Set(hidden)
  if (next.has(key)) next.delete(key)
  else next.add(key)
  return next
}
