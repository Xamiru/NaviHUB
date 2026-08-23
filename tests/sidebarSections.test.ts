import { describe, expect, it } from 'vitest'
import {
  SIDEBAR_HIDDEN_SETTING,
  defaultHiddenSections,
  parseHiddenSections,
  serializeHiddenSections,
  sidebarSectionDefs,
  sectionDef,
  toggleSectionHidden
} from '../src/renderer/src/lib/sidebarSections'

// The sidebar's hidden-sections list lives in ONE settings row that outlives
// the code that wrote it, and the renderer has no .tsx tests — so the
// resolution rules are pinned here. The failure this prevents is silent: a
// corrupt row hiding everything, or a renamed section key resurfacing a
// section the user hid.

describe('sidebarSectionDefs', () => {
  it('covers every media type the sidebar shows, keyed by MediaConfig.key', async () => {
    const { MEDIA_CONFIGS } = await import('../src/renderer/src/lib/mediaConfig')
    const mediaKeys = MEDIA_CONFIGS.filter((c) => !c.hideFromSidebar).map((c) => c.key)
    const defKeys = sidebarSectionDefs().map((d) => d.key)
    for (const k of mediaKeys) expect(defKeys).toContain(k)
  })

  it('offers every hardcoded standalone section', () => {
    const keys = new Set(sidebarSectionDefs().map((d) => d.key))
    for (const k of [
      'checklist',
      'stats',
      'music',
      'wrestling',
      'lists',
      'tags',
      'quiz',
      'gacha',
      'japanese',
      'english',
      'programming'
    ]) {
      expect(keys.has(k)).toBe(true)
    }
  })

  it('has no duplicate keys', () => {
    const keys = sidebarSectionDefs().map((d) => d.key)
    expect(new Set(keys).size).toBe(keys.length)
  })

  it('resolves labels from sectionDef', () => {
    expect(sectionDef('gacha')).toMatchObject({ label: 'Gacha', group: 'play' })
    expect(sectionDef('nope')).toBeUndefined()
  })
})

describe('parseHiddenSections', () => {
  it('hides nothing for absent or unparseable rows', () => {
    for (const raw of [null, undefined, '', 'not json', '{}', '42']) {
      expect(parseHiddenSections(raw)).toEqual(defaultHiddenSections())
    }
  })

  it('keeps only known keys', () => {
    const raw = JSON.stringify(['gacha', 'a_section_that_never_existed', 7, null])
    const hidden = parseHiddenSections(raw)
    expect(hidden.size).toBe(1)
    expect(hidden.has('gacha')).toBe(true)
  })

  it('round-trips through serializeHiddenSections', () => {
    const hidden = new Set(['gacha', 'wrestling', 'book'])
    const parsed = parseHiddenSections(serializeHiddenSections(hidden))
    expect(parsed).toEqual(hidden)
  })

  it('drops unknown keys on write too', () => {
    const out = serializeHiddenSections(['gacha', 'stale_key'])
    expect(JSON.parse(out)).toEqual(['gacha'])
  })
})

describe('toggleSectionHidden', () => {
  it('adds and removes without mutating the input set', () => {
    const start = new Set(['gacha'])
    const shown = toggleSectionHidden(start, 'gacha')
    expect(shown.has('gacha')).toBe(false)
    expect(start.has('gacha')).toBe(true)
    const hid = toggleSectionHidden(start, 'music')
    expect(hid.has('music')).toBe(true)
    expect(hid.size).toBe(2)
  })
})

describe('setting key', () => {
  it('is the frozen row name', () => {
    expect(SIDEBAR_HIDDEN_SETTING).toBe('sidebar.hidden')
  })
})
