import { describe, expect, it } from 'vitest'
import {
  UI_SCALE_DEFAULT,
  UI_SCALE_MAX,
  UI_SCALE_MIN,
  UI_SCALE_STEPS,
  clampUiScale,
  formatUiScale,
  parseUiScale
} from '../src/shared/uiScale'

describe('parseUiScale', () => {
  it('reads a stored value', () => {
    expect(parseUiScale('0.8')).toBe(0.8)
    expect(parseUiScale('1')).toBe(1)
    expect(parseUiScale('1.25')).toBe(1.25)
  })

  it('falls back to 100% for missing or malformed values', () => {
    // A bad setting must never leave the window at an unusable size.
    expect(parseUiScale(null)).toBe(UI_SCALE_DEFAULT)
    expect(parseUiScale(undefined)).toBe(UI_SCALE_DEFAULT)
    expect(parseUiScale('')).toBe(UI_SCALE_DEFAULT)
    expect(parseUiScale('not-a-number')).toBe(UI_SCALE_DEFAULT)
    expect(parseUiScale('NaN')).toBe(UI_SCALE_DEFAULT)
  })

  it('clamps out-of-range stored values instead of trusting them', () => {
    expect(parseUiScale('0.01')).toBe(UI_SCALE_MIN)
    expect(parseUiScale('99')).toBe(UI_SCALE_MAX)
    expect(parseUiScale('-2')).toBe(UI_SCALE_MIN)
  })
})

describe('clampUiScale', () => {
  it('bounds values to the supported range', () => {
    expect(clampUiScale(0.5)).toBe(UI_SCALE_MIN)
    expect(clampUiScale(3)).toBe(UI_SCALE_MAX)
    expect(clampUiScale(0.9)).toBe(0.9)
  })

  it('survives non-finite input (Number(undefined) over IPC)', () => {
    expect(clampUiScale(NaN)).toBe(UI_SCALE_DEFAULT)
    expect(clampUiScale(Infinity)).toBe(UI_SCALE_DEFAULT)
  })
})

describe('UI_SCALE_STEPS', () => {
  it('offers only in-range steps, ascending, including the default', () => {
    expect(UI_SCALE_STEPS).toContain(UI_SCALE_DEFAULT)
    for (const s of UI_SCALE_STEPS) {
      expect(s).toBeGreaterThanOrEqual(UI_SCALE_MIN)
      expect(s).toBeLessThanOrEqual(UI_SCALE_MAX)
      // every offered step must round-trip through the stored string form
      expect(parseUiScale(String(s))).toBe(s)
    }
    expect([...UI_SCALE_STEPS]).toEqual([...UI_SCALE_STEPS].sort((a, b) => a - b))
  })
})

describe('formatUiScale', () => {
  it('renders whole percentages', () => {
    expect(formatUiScale(1)).toBe('100%')
    expect(formatUiScale(0.8)).toBe('80%')
    expect(formatUiScale(1.25)).toBe('125%')
  })
})
