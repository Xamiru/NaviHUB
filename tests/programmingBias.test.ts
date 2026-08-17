import { describe, expect, it } from 'vitest'
import { PROG_COURSES } from '../src/shared/programming/courses'
import { PROG_SNIPPETS, SNIPPET_LANGS } from '../src/shared/programming/snippets'

// A multiple-choice question leaks its answer when the correct option is
// visibly the most qualified one. Measured across the whole catalog this was
// once 167/219 (76%) — docker 90%, git 85% — which meant someone who had never
// read the lesson could beat chance by picking the longest option. A first
// pass brought it to 47%; this file now holds it at ≤ 30% (chance is 25%).
//
// tests/programming.test.ts checks that questions are well-FORMED; this checks
// that they are not GUESSABLE, which no structural assertion can catch.
// tests/englishContent.test.ts does the equivalent for authored English items.

// Share of questions whose correct option is the strict longest / shortest.
const MAX_RATE = 0.3
// When the correct option IS the strict longest, it may not dwarf the runner-up
// — a 4× longer answer is a tell even inside the 30%.
const MAX_SPREAD = 1.5

type Q = { prompt: string; options: string[]; correct: number }

function lens(q: Q): number[] {
  return q.options.map((o) => o.length)
}

// "Strict" — a tie is not a giveaway, since the reader can't pick on length.
function longestIsCorrect(q: Q): boolean {
  const l = lens(q)
  const max = Math.max(...l)
  return l[q.correct] === max && l.filter((x) => x === max).length === 1
}

function shortestIsCorrect(q: Q): boolean {
  const l = lens(q)
  const min = Math.min(...l)
  return l[q.correct] === min && l.filter((x) => x === min).length === 1
}

function spread(q: Q): number {
  const l = lens(q)
  const runnerUp = Math.max(...l.filter((_, i) => i !== q.correct))
  return runnerUp === 0 ? Infinity : l[q.correct] / runnerUp
}

function describeQ(q: Q): string {
  return `  - [${lens(q).join('/')} correct=${q.correct}] ${q.prompt}`
}

function questionsOf(courseKey: string): Q[] {
  const course = PROG_COURSES.find((c) => c.key === courseKey)
  if (!course) throw new Error(`no course ${courseKey}`)
  return course.lessons.flatMap((l) => l.questions ?? [])
}

// One assertion set per group of questions, reused for courses and (later)
// snippet decks. The message lists EVERY offender with option lengths so a
// content author can work down the list without re-measuring.
export function assertNotGuessable(name: string, qs: Q[]): void {
  expect(qs.length, `${name} has no questions`).toBeGreaterThan(0)
  const longest = qs.filter(longestIsCorrect)
  expect(
    longest.length / qs.length,
    `${name}: correct answer is the strict longest in ${longest.length}/${qs.length} (max ${MAX_RATE * 100}%). Offenders:\n` +
      longest.map(describeQ).join('\n')
  ).toBeLessThanOrEqual(MAX_RATE)

  const shortest = qs.filter(shortestIsCorrect)
  expect(
    shortest.length / qs.length,
    `${name}: correct answer is the strict shortest in ${shortest.length}/${qs.length} (max ${MAX_RATE * 100}%). Offenders:\n` +
      shortest.map(describeQ).join('\n')
  ).toBeLessThanOrEqual(MAX_RATE)

  const wide = longest.filter((q) => spread(q) > MAX_SPREAD)
  expect(
    wide.length,
    `${name}: ${wide.length} strict-longest correct options are more than ${MAX_SPREAD}× the runner-up:\n` +
      wide.map((q) => `${describeQ(q)} (×${spread(q).toFixed(2)})`).join('\n')
  ).toBe(0)
}

describe('programming quiz — answer-length bias', () => {
  it.each(PROG_COURSES.map((c) => c.key))('%s is not guessable by option length', (key) => {
    assertNotGuessable(key, questionsOf(key))
  })

  it.each(SNIPPET_LANGS.map((l) => l.key))('snippets:%s are not guessable by option length', (lang) => {
    assertNotGuessable(`snippets:${lang}`, PROG_SNIPPETS.filter((s) => s.lang === lang))
  })

  it('the whole catalog stays under the thresholds', () => {
    const all = PROG_COURSES.flatMap((c) => c.lessons.flatMap((l) => l.questions ?? []))
    expect(all.length).toBeGreaterThan(200)
    assertNotGuessable('catalog', all)
  })
})
