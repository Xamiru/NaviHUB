import { describe, expect, it } from 'vitest'
import {
  WIDGET_SIZE,
  clampWidgetPos,
  defaultWidgetPos,
  formatWidgetPos,
  parseWidgetPos
} from '../src/main/widgetCore'

const SIZE = WIDGET_SIZE
const PRIMARY = { x: 0, y: 0, width: 1920, height: 1040 } // 1080p minus taskbar

describe('parseWidgetPos / formatWidgetPos', () => {
  it('keeps the pop-out wide enough for ordinary song metadata', () => {
    expect(WIDGET_SIZE).toEqual({ width: 520, height: 64 })
  })

  it('round-trips', () => {
    expect(parseWidgetPos(formatWidgetPos({ x: 100, y: 200 }))).toEqual({ x: 100, y: 200 })
  })

  it('accepts negative coordinates (monitor left of / above primary)', () => {
    expect(parseWidgetPos('-1920,-64')).toEqual({ x: -1920, y: -64 })
  })

  it('rejects garbage, empties and null', () => {
    for (const raw of [null, undefined, '', 'abc', '12', '12,', '12,34,56', '1.5,2', 'NaN,3']) {
      expect(parseWidgetPos(raw)).toBeNull()
    }
  })

  it('rounds fractional positions when formatting', () => {
    expect(formatWidgetPos({ x: 10.6, y: -3.4 })).toBe('11,-3')
  })
})

describe('defaultWidgetPos', () => {
  it('sits in the bottom-right corner of the primary work area', () => {
    const pos = defaultWidgetPos(SIZE, PRIMARY)
    expect(pos).toEqual({ x: 1920 - SIZE.width - 16, y: 1040 - SIZE.height - 16 })
  })

  it('respects a work area with an origin offset', () => {
    const pos = defaultWidgetPos(SIZE, { x: 100, y: 50, width: 800, height: 600 })
    expect(pos).toEqual({
      x: 100 + 800 - SIZE.width - 16,
      y: 50 + 600 - SIZE.height - 16
    })
  })
})

describe('clampWidgetPos', () => {
  it('keeps an on-screen position unchanged', () => {
    expect(clampWidgetPos({ x: 500, y: 500 }, SIZE, [PRIMARY])).toEqual({ x: 500, y: 500 })
  })

  it('clamps a partially off-screen position back inside', () => {
    expect(clampWidgetPos({ x: 1800, y: 1020 }, SIZE, [PRIMARY])).toEqual({
      x: 1920 - SIZE.width,
      y: 1040 - SIZE.height
    })
    expect(clampWidgetPos({ x: -100, y: -10 }, SIZE, [PRIMARY])).toEqual({ x: 0, y: 0 })
  })

  it('returns null when the saved display is gone (fully off every area)', () => {
    // Saved on a second monitor at x=2000.. that is no longer connected.
    expect(clampWidgetPos({ x: 2500, y: 100 }, SIZE, [PRIMARY])).toBeNull()
  })

  it('keeps a position on a secondary monitor when it still exists', () => {
    const second = { x: 1920, y: 0, width: 1920, height: 1080 }
    expect(clampWidgetPos({ x: 2500, y: 100 }, SIZE, [PRIMARY, second])).toEqual({
      x: 2500,
      y: 100
    })
  })

  it('clamps into the display with the larger overlap on a straddle', () => {
    const second = { x: 1920, y: 0, width: 1920, height: 1080 }
    // Most of the widget is on the second monitor.
    const pos = clampWidgetPos({ x: 1920 - 80, y: 100 }, SIZE, [PRIMARY, second])
    expect(pos).toEqual({ x: 1920, y: 100 })
  })

  it('returns null for an empty display list', () => {
    expect(clampWidgetPos({ x: 10, y: 10 }, SIZE, [])).toBeNull()
  })
})
