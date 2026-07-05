import { describe, expect, it } from 'vitest'
import { deinflect } from '../src/main/dict/deinflect'

// Helper: does any candidate reduce to `base` with a rule compatible with the
// given dictionary word-type?
function reachesWith(text: string, base: string, wordType: string): boolean {
  return deinflect(text).some(
    (d) => d.term === base && (d.rules.length === 0 || d.rules.includes(wordType))
  )
}

describe('deinflect', () => {
  it('always includes the input itself as an unconstrained candidate', () => {
    const first = deinflect('猫')[0]
    expect(first).toEqual({ term: '猫', rules: [] })
  })

  it('ichidan (v1) forms → dictionary form', () => {
    expect(reachesWith('食べた', '食べる', 'v1')).toBe(true) // past
    expect(reachesWith('食べて', '食べる', 'v1')).toBe(true) // te-form
    expect(reachesWith('食べない', '食べる', 'v1')).toBe(true) // negative
    expect(reachesWith('食べます', '食べる', 'v1')).toBe(true) // polite
    expect(reachesWith('食べてる', '食べる', 'v1')).toBe(true) // ている contraction
  })

  it('godan (v5) forms → dictionary form', () => {
    expect(reachesWith('飲んだ', '飲む', 'v5')).toBe(true) // euphonic past
    expect(reachesWith('飲んで', '飲む', 'v5')).toBe(true) // te-form
    expect(reachesWith('飲まない', '飲む', 'v5')).toBe(true) // negative
    expect(reachesWith('書いた', '書く', 'v5')).toBe(true) // く euphonic past
    expect(reachesWith('話します', '話す', 'v5')).toBe(true) // polite
    expect(reachesWith('待って', '待つ', 'v5')).toBe(true) // って
  })

  it('i-adjective forms → dictionary form', () => {
    expect(reachesWith('美味しかった', '美味しい', 'adj-i')).toBe(true)
    expect(reachesWith('美味しくない', '美味しい', 'adj-i')).toBe(true)
  })

  it('irregular する / くる', () => {
    expect(reachesWith('した', 'する', 'vs')).toBe(true)
    expect(reachesWith('きた', 'くる', 'vk')).toBe(true)
  })

  it('the rules filter rejects a wrong word-type match', () => {
    // 飲んだ deinflects to 飲む as a v5 candidate — but NOT as a v1 entry.
    const cands = deinflect('飲んだ').filter((d) => d.term === '飲む')
    expect(cands.length).toBeGreaterThan(0)
    expect(cands.every((d) => !d.rules.includes('v1'))).toBe(true)
  })
})
