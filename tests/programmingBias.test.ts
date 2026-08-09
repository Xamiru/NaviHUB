import { describe, expect, it } from 'vitest'
import { PROG_COURSES } from '../src/shared/programming/courses'

// A multiple-choice question leaks its answer when the correct option is
// visibly the most qualified one. Measured across the whole catalog this was
// once 167/219 (76%) — docker 90%, git 85% — which meant someone who had never
// read the lesson could beat chance by picking the longest option.
//
// tests/programming.test.ts checks that questions are well-FORMED; this checks
// that they are not GUESSABLE, which no structural assertion can catch.
// tests/englishContent.test.ts does the equivalent for authored English items.

const MAX_RATE = 0.5

type Q = { prompt: string; options: string[]; correct: number }

function longestIsCorrect(q: Q): boolean {
  const lens = q.options.map((o) => o.length)
  const max = Math.max(...lens)
  // "Strict" — a tie is not a giveaway, since the reader can't pick on length.
  return lens[q.correct] === max && lens.filter((l) => l === max).length === 1
}

function questionsOf(courseKey: string): Q[] {
  const course = PROG_COURSES.find((c) => c.key === courseKey)
  if (!course) throw new Error(`no course ${courseKey}`)
  return course.lessons.flatMap((l) => l.questions ?? [])
}

describe('programming quiz — answer-length bias', () => {
  it.each(PROG_COURSES.map((c) => c.key))('%s stays under the threshold', (key) => {
    const qs = questionsOf(key)
    expect(qs.length, `${key} has no questions`).toBeGreaterThan(0)
    const hits = qs.filter(longestIsCorrect)
    const rate = hits.length / qs.length
    // The message rides the assertion that can actually fail, so a regression
    // names the offending prompts instead of just printing a ratio. (It used to
    // hang off a toMatchObject that always passed, so it never printed at all.)
    expect(
      rate,
      `${key}: correct answer is the strict longest in ${hits.length}/${qs.length}. First offenders:\n` +
        hits
          .slice(0, 3)
          .map((q) => `  - ${q.prompt}`)
          .join('\n')
    ).toBeLessThanOrEqual(MAX_RATE)
  })

  it('the whole catalog stays well under it', () => {
    const all = PROG_COURSES.flatMap((c) => c.lessons.flatMap((l) => l.questions ?? []))
    const rate = all.filter(longestIsCorrect).length / all.length
    expect(all.length).toBeGreaterThan(200)
    expect(rate).toBeLessThanOrEqual(MAX_RATE)
  })
})
