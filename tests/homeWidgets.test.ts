import { describe, expect, it } from 'vitest'
import {
  HOME_WIDGETS,
  defaultHomeLayout,
  moveHomeWidget,
  parseHomeLayout,
  serializeHomeLayout,
  toggleHomeWidget,
  type HomeLayoutEntry
} from '../src/renderer/src/lib/homeWidgets'

// Home's layout lives in ONE settings row that outlives the code that wrote it,
// and the renderer has no .tsx tests — so the resolution rules are pinned here.
// The failure this prevents is silent: a widget added in a later release that
// never appears for anyone who once opened the Customise dialog.

const keys = (entries: HomeLayoutEntry[]): string[] => entries.map((e) => e.key)

describe('parseHomeLayout', () => {
  it('falls back to every widget, visible, in catalogue order', () => {
    for (const raw of [null, undefined, '', 'not json', '{}', '42']) {
      const layout = parseHomeLayout(raw)
      expect(keys(layout)).toEqual(HOME_WIDGETS.map((w) => w.key))
      expect(layout.every((e) => e.visible)).toBe(true)
    }
  })

  it('keeps the stored order and the stored visibility', () => {
    const raw = JSON.stringify([
      { key: 'music', visible: true },
      { key: 'today', visible: false }
    ])
    const layout = parseHomeLayout(raw)
    expect(keys(layout).slice(0, 2)).toEqual(['music', 'today'])
    expect(layout[1].visible).toBe(false)
  })

  it('appends widgets the stored row has never heard of, visible', () => {
    // The row a past release wrote: only two widgets existed then.
    const raw = JSON.stringify([
      { key: 'today', visible: false },
      { key: 'recent', visible: true }
    ])
    const layout = parseHomeLayout(raw)
    expect(keys(layout).slice(0, 2)).toEqual(['today', 'recent'])
    expect(keys(layout).sort()).toEqual(HOME_WIDGETS.map((w) => w.key).sort())
    // The ones it did not know about arrive switched ON, or they would be
    // invisible forever to anyone with a stored layout.
    for (const e of layout.slice(2)) expect(e.visible).toBe(true)
  })

  it('drops keys this build no longer has, and duplicates', () => {
    const raw = JSON.stringify([
      { key: 'gone-widget', visible: true },
      { key: 'music', visible: false },
      { key: 'music', visible: true }
    ])
    const layout = parseHomeLayout(raw)
    expect(keys(layout)).not.toContain('gone-widget')
    expect(keys(layout).filter((k) => k === 'music')).toHaveLength(1)
    expect(layout.find((e) => e.key === 'music')!.visible).toBe(false) // first wins
  })

  it('treats a missing visible flag as shown', () => {
    const layout = parseHomeLayout(JSON.stringify([{ key: 'music' }]))
    expect(layout[0]).toEqual({ key: 'music', visible: true })
  })

  it('round-trips through serialize', () => {
    const layout = toggleHomeWidget(moveHomeWidget(defaultHomeLayout(), 0, 3), 'music')
    expect(parseHomeLayout(serializeHomeLayout(layout))).toEqual(layout)
  })
})

describe('moveHomeWidget', () => {
  it('moves an entry and shifts the rest', () => {
    const before = defaultHomeLayout()
    const after = moveHomeWidget(before, 0, 2)
    expect(keys(after).slice(0, 3)).toEqual([
      keys(before)[1],
      keys(before)[2],
      keys(before)[0]
    ])
    expect(after).toHaveLength(before.length)
  })

  it('is a no-op at either edge, and never mutates the input', () => {
    const before = defaultHomeLayout()
    const snapshot = keys(before)
    expect(moveHomeWidget(before, 0, -1)).toBe(before)
    expect(moveHomeWidget(before, before.length - 1, 1)).toBe(before)
    expect(moveHomeWidget(before, 99, 1)).toBe(before)
    moveHomeWidget(before, 1, 1)
    expect(keys(before)).toEqual(snapshot)
  })
})

describe('toggleHomeWidget', () => {
  it('flips one widget and leaves the others alone', () => {
    const after = toggleHomeWidget(defaultHomeLayout(), 'music')
    expect(after.find((e) => e.key === 'music')!.visible).toBe(false)
    expect(after.filter((e) => !e.visible)).toHaveLength(1)
  })

  it('can hide everything without losing the order', () => {
    let layout = defaultHomeLayout()
    for (const w of HOME_WIDGETS) layout = toggleHomeWidget(layout, w.key)
    expect(layout.every((e) => !e.visible)).toBe(true)
    expect(keys(layout)).toEqual(HOME_WIDGETS.map((w) => w.key))
  })
})

describe('the catalogue itself', () => {
  it('has unique keys and a span for every widget', () => {
    const ks = HOME_WIDGETS.map((w) => w.key)
    expect(new Set(ks).size).toBe(ks.length)
    for (const w of HOME_WIDGETS) {
      expect(w.label.length).toBeGreaterThan(0)
      expect(['full', 'half']).toContain(w.span)
    }
  })
})
