import { PROG_COURSES } from './courses'
import { CHEAT_SHEETS } from './cheatsheets'
import { PROG_SNIPPETS, type SnippetKind, type SnippetLang } from './snippets'
import type { CheatEntry } from './types'
import { shuffle } from '../shuffle'

// The programming quiz's three pools, built entirely from the code catalog
// (no IPC). Pure and rng-injectable so tests can pin option shuffling.

export interface ProgQuizQuestion {
  id: string
  prompt: string
  context: string | null // small line above the prompt (course · lesson / sheet)
  code: string | null // snippets: rendered monospace above the prompt
  options: string[]
  correct: number
  explain: string | null
  mono: boolean // options are commands → monospace
  // Where a miss sends the reviewer: a lesson route, a cheatsheet tab, or nowhere.
  reviewTo: string | null
  reviewLabel: string | null
}

// Course questions already ship four options; only their display order is
// shuffled, so `correct` is re-found by identity.
export function courseQuestions(
  courseKey: string | null,
  rng: () => number = Math.random
): ProgQuizQuestion[] {
  const courses = courseKey ? PROG_COURSES.filter((c) => c.key === courseKey) : PROG_COURSES
  const out: ProgQuizQuestion[] = []
  for (const c of courses) {
    for (const l of c.lessons) {
      l.questions.forEach((q, i) => {
        const answer = q.options[q.correct]
        const options = shuffle(q.options, rng)
        out.push({
          id: `${c.key}/${l.key}/${i}`,
          prompt: q.prompt,
          context: `${c.title} · ${l.title}`,
          code: null,
          options,
          correct: options.indexOf(answer),
          explain: q.explain ?? null,
          mono: false,
          reviewTo: `/programming/course/${c.key}/${l.key}`,
          reviewLabel: `${c.title} · ${l.title}`
        })
      })
    }
  }
  return out
}

// "Which command does X?" — the answer is the entry's command, distractors are
// other commands from the same sheet (falling back to every sheet for the
// short ones), deduped by rendered text.
//
// Distractors are drawn from entries of the SAME KIND as the answer, where the
// presence of `answers` is the signal: entries that carry one are real CLI
// invocations, entries without one are keystrokes (tmux's `prefix d` and
// friends, left answers-less on purpose so they never enter the typing drill).
// Mixing the two made a CLI prompt offer three chord-shaped options that are
// eliminable on sight — and vice versa.
export const isCommand = (e: CheatEntry): boolean => !!e.answers?.length

export function commandQuestions(
  sheetKey: string | null,
  rng: () => number = Math.random
): ProgQuizQuestion[] {
  const sheets = sheetKey ? CHEAT_SHEETS.filter((s) => s.key === sheetKey) : CHEAT_SHEETS
  // Precomputed once per call, not once per entry: rebuilding these inside the
  // loop made the whole pool O(entries²) over ~180 entries.
  const allByKind = {
    true: CHEAT_SHEETS.flatMap((s) => s.entries.filter(isCommand).map((e) => e.cmd)),
    false: CHEAT_SHEETS.flatMap((s) => s.entries.filter((e) => !isCommand(e)).map((e) => e.cmd))
  }
  const out: ProgQuizQuestion[] = []
  for (const sheet of sheets) {
    const sheetByKind = {
      true: sheet.entries.filter(isCommand).map((e) => e.cmd),
      false: sheet.entries.filter((e) => !isCommand(e)).map((e) => e.cmd)
    }
    for (const entry of sheet.entries) {
      const kind = String(isCommand(entry)) as 'true' | 'false'
      const taken = new Set([entry.cmd])
      const distractors: string[] = []
      for (const pool of [sheetByKind[kind], allByKind[kind]]) {
        for (const cmd of shuffle(pool, rng)) {
          if (distractors.length >= 3) break
          if (taken.has(cmd)) continue
          taken.add(cmd)
          distractors.push(cmd)
        }
        if (distractors.length >= 3) break
      }
      if (distractors.length < 3) continue
      const options = shuffle([entry.cmd, ...distractors], rng)
      out.push({
        id: `${sheet.key}/${entry.cmd}`,
        prompt: entry.desc,
        context: sheet.title,
        code: null,
        options,
        correct: options.indexOf(entry.cmd),
        explain: entry.example ? `Example: ${entry.example}` : null,
        mono: true,
        reviewTo: `/programming/cheatsheets?sheet=${encodeURIComponent(sheet.key)}`,
        reviewLabel: sheet.title
      })
    }
  }
  return out
}

// Snippet decks: filter by language and kind (null = any), shuffle options.
export function snippetQuestions(
  lang: SnippetLang | null,
  kind: SnippetKind | null,
  rng: () => number = Math.random
): ProgQuizQuestion[] {
  const out: ProgQuizQuestion[] = []
  for (const s of PROG_SNIPPETS) {
    if (lang && s.lang !== lang) continue
    if (kind && s.kind !== kind) continue
    const answer = s.options[s.correct]
    const options = shuffle(s.options, rng)
    out.push({
      id: `snippet/${s.key}`,
      prompt: s.prompt,
      context: `${s.lang} · ${s.kind === 'output' ? 'predict the output' : 'spot the bug'}`,
      code: s.code,
      options,
      correct: options.indexOf(answer),
      explain: s.explain,
      mono: s.kind === 'output',
      reviewTo: null,
      reviewLabel: null
    })
  }
  return out
}
