import { describe, expect, it, vi } from 'vitest'

vi.mock('../src/main/repos/settingsRepo', () => ({ get: () => null }))

import { buildModelParams } from '../src/main/llm'

describe('buildModelParams', () => {
  it('adds adaptive thinking for opus/sonnet, omits for haiku, never sampling params', () => {
    expect(buildModelParams('claude-opus-4-8')).toEqual({ thinking: { type: 'adaptive' } })
    expect(buildModelParams('claude-sonnet-5')).toEqual({ thinking: { type: 'adaptive' } })
    expect(buildModelParams('claude-haiku-4-5')).toEqual({})
    for (const m of ['claude-opus-4-8', 'claude-haiku-4-5']) {
      const p = buildModelParams(m)
      expect('temperature' in p).toBe(false)
      expect('top_p' in p).toBe(false)
    }
  })
})
