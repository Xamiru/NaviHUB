import { describe, expect, it } from 'vitest'
import {
  allowedFlags,
  gradeRegexGolf,
  MAX_PATTERN,
  MAX_STRING,
  REGEX_GOLF_PUZZLES
} from '../src/shared/programming/regexGolf'

// Regex golf content + grader. The content rules keep the renderer-side grader
// safe (short strings bound backtracking) and the puzzles honest (the shipped
// solution must actually solve at par).

describe('regex golf — puzzles', () => {
  it('has at least 24 puzzles with unique kebab-case keys', () => {
    expect(REGEX_GOLF_PUZZLES.length).toBeGreaterThanOrEqual(24)
    const keys = REGEX_GOLF_PUZZLES.map((p) => p.key)
    expect(new Set(keys).size).toBe(keys.length)
    for (const k of keys) expect(k).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  })

  it.each(REGEX_GOLF_PUZZLES.map((p) => p.key))('%s: strings are short, sides are disjoint, solution solves at par', (key) => {
    const p = REGEX_GOLF_PUZZLES.find((x) => x.key === key)!
    expect(p.mustMatch.length).toBeGreaterThanOrEqual(3)
    expect(p.mustNotMatch.length).toBeGreaterThanOrEqual(3)
    for (const s of [...p.mustMatch, ...p.mustNotMatch]) {
      expect(s.length, `"${s}"`).toBeLessThanOrEqual(MAX_STRING)
    }
    const overlap = p.mustMatch.filter((s) => p.mustNotMatch.includes(s))
    expect(overlap, 'a string on both sides').toEqual([])
    expect(new Set(p.mustMatch).size).toBe(p.mustMatch.length)
    expect(new Set(p.mustNotMatch).size).toBe(p.mustNotMatch.length)
    expect(p.hint.length).toBeGreaterThan(8)
    expect(p.title.length).toBeGreaterThan(2)
    if (p.flagsAllowed) expect(p.flagsAllowed).toMatch(/^[ims]+$/)

    const g = gradeRegexGolf(p.solution, p.flagsAllowed ?? '', p)
    expect(g.valid, g.error ?? '').toBe(true)
    expect(g.matchResults.every(Boolean), 'solution misses a mustMatch').toBe(true)
    expect(g.notMatchResults.every(Boolean), 'solution hits a mustNotMatch').toBe(true)
    expect(g.solved).toBe(true)
    expect(g.length, 'solution longer than par').toBeLessThanOrEqual(p.par)
    expect(g.underPar).toBe(true)
  })

  it('a trivial catch-all never solves any puzzle (mustNotMatch is real)', () => {
    for (const p of REGEX_GOLF_PUZZLES) {
      expect(gradeRegexGolf('.*', '', p).solved, p.key).toBe(false)
      expect(gradeRegexGolf('', '', p).solved, p.key).toBe(false)
    }
  })

  it('an anchored solution really needs its anchors — otherwise the puzzle is softer than its par', () => {
    for (const p of REGEX_GOLF_PUZZLES) {
      const loose = p.solution.replace(/^\^/, '').replace(/\$$/, '')
      if (loose === p.solution) continue
      expect(
        gradeRegexGolf(loose, p.flagsAllowed ?? '', p).solved,
        `${p.key}: solves unanchored — add a mustNotMatch string that only ^/$ rejects`
      ).toBe(false)
    }
  })
})

describe('regex golf — grader', () => {
  const p = REGEX_GOLF_PUZZLES[0]

  it('empty pattern is invalid without an error; an invalid pattern reports the message and never throws', () => {
    expect(gradeRegexGolf('', '', p)).toMatchObject({ valid: false, error: null, solved: false })
    const g = gradeRegexGolf('(', '', p)
    expect(g.valid).toBe(false)
    expect(g.error).toBeTruthy()
    expect(g.solved).toBe(false)
  })

  it('caps the pattern length', () => {
    const g = gradeRegexGolf('a'.repeat(MAX_PATTERN + 1), '', p)
    expect(g.valid).toBe(false)
    expect(g.error).toMatch(/too long/i)
  })

  it('ignores flags the puzzle does not allow', () => {
    const puzzle = { ...p, flagsAllowed: 'i' }
    expect(allowedFlags(puzzle, 'gims')).toBe('i')
    expect(allowedFlags(p, 'i')).toBe('')
    const caseful = {
      key: 'x',
      title: 'x',
      mustMatch: ['ABC'],
      mustNotMatch: ['xyz'],
      par: 3,
      hint: 'lowercase only',
      solution: 'ABC'
    }
    expect(gradeRegexGolf('abc', 'i', caseful).solved).toBe(false)
    expect(gradeRegexGolf('abc', 'i', { ...caseful, flagsAllowed: 'i' }).solved).toBe(true)
  })

  it('reports per-string results and underPar honestly', () => {
    const g = gradeRegexGolf('\\d', '', p) // matches digits, but "12a" too
    expect(g.valid).toBe(true)
    expect(g.matchResults.every(Boolean)).toBe(true)
    expect(g.notMatchResults.some((x) => !x)).toBe(true)
    expect(g.solved).toBe(false)
    expect(g.underPar).toBe(false)
  })
})
