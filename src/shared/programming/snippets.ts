// Predict-the-output / spot-the-bug decks: short code snippets with one MC
// question each. Content is code with FROZEN keys (the programming/
// convention); the quiz page serves them as a third mode next to course and
// command questions. Authoring rules (tests/programming.test.ts +
// programmingBias.test.ts): key '<lang>-<slug>', code ≤ 20 lines, exactly 4
// distinct options, `explain` required, no strict-longest tell, and every
// snippet whose language has a runtime on the authoring machine was RUN to
// confirm the answer (go snippets are reasoned and flagged in review).

import { GO_SNIPPETS } from './snippets/go'
import { PYTHON_SNIPPETS } from './snippets/python'
import { SHELL_SNIPPETS } from './snippets/shell'
import { SQL_SNIPPETS } from './snippets/sql'
import { TS_SNIPPETS } from './snippets/ts'

export type SnippetLang = 'go' | 'python' | 'shell' | 'sql' | 'ts'
export type SnippetKind = 'output' | 'bug'

export interface ProgSnippet {
  key: string // FROZEN '<lang>-<slug>'
  lang: SnippetLang
  kind: SnippetKind
  code: string
  prompt: string // 'What does this print?' / 'Which line is wrong, and why?'
  options: string[] // exactly 4
  correct: number
  explain: string
}

export const SNIPPET_LANGS: { key: SnippetLang; label: string }[] = [
  { key: 'go', label: 'Go' },
  { key: 'python', label: 'Python' },
  { key: 'shell', label: 'Shell' },
  { key: 'sql', label: 'SQL' },
  { key: 'ts', label: 'TypeScript' }
]

export const PROG_SNIPPETS: ProgSnippet[] = [
  ...GO_SNIPPETS,
  ...PYTHON_SNIPPETS,
  ...SHELL_SNIPPETS,
  ...SQL_SNIPPETS,
  ...TS_SNIPPETS
]

export function progSnippet(key: string): ProgSnippet | undefined {
  return PROG_SNIPPETS.find((s) => s.key === key)
}
