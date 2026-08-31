import { describe, expect, it } from 'vitest'
import { OUTPUT_UNITS, checkOutput, outputUnit } from '../src/shared/japanese/output'

describe('Japanese controlled output', () => {
  it('moves from construction through interaction to connected writing', () => {
    expect(OUTPUT_UNITS.map((unit) => unit.stage)).toEqual([
      'build',
      'build',
      'transform',
      'respond',
      'respond',
      'roleplay',
      'roleplay',
      'roleplay',
      'write',
      'write'
    ])
    expect(OUTPUT_UNITS.every((unit) => unit.prompts.length === 3)).toBe(true)
  })

  it('checks required language evidence without pretending to grade the whole answer', () => {
    const prompt = outputUnit('respond-needs')!.prompts[0]
    expect(checkOutput('すみません、もう一度言ってください。', prompt)).toEqual({
      matched: [true, true, true],
      score: 100
    })
    expect(checkOutput('もう一度お願いします', prompt)).toEqual({
      matched: [false, true, false],
      score: 33
    })
  })

  it('accepts configured kana alternatives and ignores harmless spacing/punctuation', () => {
    const prompt = outputUnit('build-state')!.prompts[0]
    expect(checkOutput('わたし は がくせい です！', prompt).score).toBe(100)
  })
})
