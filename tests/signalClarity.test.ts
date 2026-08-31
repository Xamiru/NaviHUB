import { describe, expect, it } from 'vitest'
import {
  parseSignalClarity,
  SIGNAL_CLARITY_OPTIONS
} from '../src/renderer/src/lib/signalClarity'

describe('signal clarity', () => {
  it.each(['clean', 'broadcast', 'deep'] as const)('accepts %s', (value) => {
    expect(parseSignalClarity(value)).toBe(value)
  })

  it('falls back to the balanced broadcast level', () => {
    expect(parseSignalClarity(undefined)).toBe('broadcast')
    expect(parseSignalClarity('unknown')).toBe('broadcast')
  })

  it('keeps every choice unique', () => {
    const values = SIGNAL_CLARITY_OPTIONS.map((option) => option.value)
    expect(new Set(values).size).toBe(values.length)
  })
})
