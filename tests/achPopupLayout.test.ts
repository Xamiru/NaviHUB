import { describe, expect, it } from 'vitest'
import {
  ACH_POPUP_BURST_AT,
  CARD_GAP,
  CARD_HEIGHT,
  MAX_STACK,
  POPUP_SIZE,
  anchorPos,
  cardTop
} from '../src/shared/achievements'

// The overlay's shared geometry: one module feeds both the window position
// (main, achPopup.ts) and the card layout (renderer, AchPopupPage), so the
// arithmetic is pinned here.

describe('anchorPos', () => {
  it('sits at the bottom-right of the work area, off by the screen margin', () => {
    expect(anchorPos({ x: 0, y: 0, width: 1920, height: 1040 })).toEqual({
      x: 1920 - POPUP_SIZE.width - 28,
      y: 1040 - POPUP_SIZE.height - 28
    })
  })

  it('respects a secondary display whose origin is not 0,0', () => {
    const wa = { x: 1920, y: 0, width: 2560, height: 1400 }
    const pos = anchorPos(wa)
    expect(pos.x).toBe(1920 + wa.width - POPUP_SIZE.width - 28)
    expect(pos.y).toBe(wa.height - POPUP_SIZE.height - 28)
  })
})

describe('card slots', () => {
  it('stacks every card slot inside the fixed window height', () => {
    // Slot 0 sits flush against the bottom of the window.
    expect(cardTop(0)).toBe(POPUP_SIZE.height - CARD_HEIGHT)
    // The highest slot plus its own height must clear the top edge.
    const highest = cardTop(MAX_STACK - 1)
    expect(highest).toBeGreaterThanOrEqual(0)
  })

  it('leaves an exact gap between consecutive slots', () => {
    expect(cardTop(1) + CARD_HEIGHT + CARD_GAP).toBe(cardTop(0))
  })
})

describe('burst threshold', () => {
  it('matches the watcher rule: strictly more than the threshold collapses', () => {
    // publish() uses rows.length > ACH_POPUP_BURST_AT; the popup page uses the
    // same comparison over one poll batch. Pin the literal so both sides stay
    // honest about what "a burst" means.
    expect(ACH_POPUP_BURST_AT).toBe(3)
    expect(3 > ACH_POPUP_BURST_AT).toBe(false)
    expect(4 > ACH_POPUP_BURST_AT).toBe(true)
  })
})
