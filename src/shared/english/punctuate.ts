// The Punctuate-it game's pure model. An item is a correctly punctuated
// answer; the game shows it stripped of every INTERNAL mark (, ; : —) and
// every apostrophe, and the player puts them back: gaps between words take a
// mark, words cycle through their apostrophe variants. Terminal marks (. ? !)
// stay visible and are never graded — they would leak sentence boundaries
// otherwise, and boundaries are the point of the comma-splice items.
//
// Authoring notation: `[,]` marks an OPTIONAL comma (Oxford comma, a light
// introductory adverbial) — both '' and ',' grade correct there. A dash is
// written spaced ` — ` in the answer and belongs to the token before it.

export type PunctMark = '' | ',' | ';' | ':' | '—'
export const PUNCT_MARKS: readonly PunctMark[] = ['', ',', ';', ':', '—']

export interface PunctToken {
  word: string // the answer's word incl. apostrophes, without marks/terminal
  bare: string // word with apostrophes removed — what the player sees at first
  mark: PunctMark // the internal mark that follows this word in the answer
  optional: boolean // `[,]` — '' and ',' both correct
  terminal: '' | '.' | '?' | '!'
}

export interface PunctState {
  words: string[] // one per token — the player's current apostrophe choice
  marks: PunctMark[] // one per token — the player's current mark after it
}

export interface PunctSlot {
  index: number
  kind: 'mark' | 'apostrophe'
  expected: string
  got: string
  ok: boolean
}

export interface PunctGrade {
  targets: number // graded slots where the answer has something
  hits: number // targets the player got
  extras: number // slots where the player placed something the answer lacks
  pct: number // hits / (targets + extras), 0..1
  allCorrect: boolean
  slots: PunctSlot[] // every graded slot, for the reveal diff
}

const APOS = /['’]/g

// Splits an answer into tokens. Whitespace-separated words; a standalone `—`
// attaches to the previous token; `[,]` becomes an optional comma; a trailing
// . ? ! becomes the terminal.
export function tokenize(answer: string): PunctToken[] {
  const raw = answer.replace(/\s+/g, ' ').trim().split(' ')
  const out: PunctToken[] = []
  for (let piece of raw) {
    if (!piece) continue
    if (piece === '—' || piece === '[,]') {
      // standalone → belongs to the previous token
      const prev = out[out.length - 1]
      if (prev) {
        if (piece === '—') prev.mark = '—'
        else {
          prev.mark = ','
          prev.optional = true
        }
      }
      continue
    }
    let optional = false
    let mark: PunctMark = ''
    let terminal: PunctToken['terminal'] = ''
    // Peel from the end: [,] / mark / terminal, in the orders they can occur.
    if (piece.endsWith('[,]')) {
      piece = piece.slice(0, -3)
      optional = true
      mark = ','
    }
    const term = piece.match(/[.?!]$/)
    if (term) {
      terminal = term[0] as PunctToken['terminal']
      piece = piece.slice(0, -1)
    }
    if (!optional) {
      const m = piece.match(/[,;:—]$/)
      if (m) {
        mark = m[0] as PunctMark
        piece = piece.slice(0, -1)
      }
    }
    // Any terminal after the mark? ("word,." is not English) — ignore.
    out.push({
      word: piece,
      bare: piece.replace(APOS, ''),
      mark,
      optional,
      terminal
    })
  }
  return out
}

export function strip(tokens: PunctToken[]): PunctState {
  return { words: tokens.map((t) => t.bare), marks: tokens.map(() => '') }
}

// Every apostrophe placement the player can cycle through for a bare word:
// the bare word itself first, then variants. Case is preserved. The rules are
// deliberately narrow so the cycle stays short; the content test asserts every
// apostrophe word in every answer is reachable from here.
const AUX_NT = /^(is|are|was|were|has|have|had|do|does|did|ca|could|would|should|must|might|need|ought|dare|wo|sha|ai)nt$/i
const PRONOUN_CONTRACTIONS: [RegExp, string][] = [
  [/^(i)(m|ll|d|ve)$/i, "$1'$2"],
  [/^(you|we|they)(re|ll|d|ve)$/i, "$1'$2"],
  [/^(he|she|it|who|that|there|what|where|here|how|let)(s|ll|d)$/i, "$1'$2"],
  [/^(could|would|should|might|must)(ve)$/i, "$1'$2"]
]
const SPECIAL: Record<string, string> = { oclock: "o'clock", maam: "ma'am", yall: "y'all" }

export function apostropheVariants(bare: string): string[] {
  const out: string[] = [bare]
  const push = (v: string): void => {
    if (v !== bare && !out.includes(v)) out.push(v)
  }
  const lower = bare.toLowerCase()
  if (SPECIAL[lower]) push(matchCase(bare, SPECIAL[lower]))
  if (AUX_NT.test(bare)) push(bare.slice(0, -1) + "'" + bare.slice(-1)) // dont → don't
  for (const [re, rep] of PRONOUN_CONTRACTIONS) {
    if (re.test(bare)) push(bare.replace(re, rep))
  }
  if (bare.length >= 3 && /s$/i.test(bare)) {
    push(bare.slice(0, -1) + "'" + bare.slice(-1)) // students → student's
    push(bare + "'") // students → students'
  }
  return out
}

function matchCase(source: string, target: string): string {
  if (source[0] && source[0] === source[0].toUpperCase() && source[0] !== source[0].toLowerCase()) {
    return target[0].toUpperCase() + target.slice(1)
  }
  return target
}

export function cycleMark(m: PunctMark): PunctMark {
  const i = PUNCT_MARKS.indexOf(m)
  return PUNCT_MARKS[(i + 1) % PUNCT_MARKS.length]
}

export function cycleApostrophe(bare: string, current: string): string {
  const variants = apostropheVariants(bare)
  const i = variants.indexOf(current)
  return variants[(i + 1) % variants.length]
}

const norm = (w: string): string => w.replace(/’/g, "'")

// Grades a state against the tokens. A slot is graded when the answer has
// something there (a mark / an apostrophe) OR the player put something there.
export function grade(tokens: PunctToken[], state: PunctState): PunctGrade {
  const slots: PunctSlot[] = []
  let targets = 0
  let hits = 0
  let extras = 0
  tokens.forEach((t, i) => {
    // mark slot
    const got = state.marks[i] ?? ''
    if (t.optional) {
      // '' or ',' both fine; anything else is an extra
      if (got !== '' && got !== ',') {
        extras++
        slots.push({ index: i, kind: 'mark', expected: ',', got, ok: false })
      }
    } else if (t.mark) {
      targets++
      const ok = got === t.mark
      if (ok) hits++
      slots.push({ index: i, kind: 'mark', expected: t.mark, got, ok })
    } else if (got) {
      extras++
      slots.push({ index: i, kind: 'mark', expected: '', got, ok: false })
    }
    // apostrophe slot
    const wantWord = norm(t.word)
    const gotWord = norm(state.words[i] ?? t.bare)
    if (wantWord !== t.bare) {
      targets++
      const ok = gotWord === wantWord
      if (ok) hits++
      slots.push({ index: i, kind: 'apostrophe', expected: wantWord, got: gotWord, ok })
    } else if (gotWord !== t.bare) {
      extras++
      slots.push({ index: i, kind: 'apostrophe', expected: t.bare, got: gotWord, ok: false })
    }
  })
  const denom = targets + extras
  return {
    targets,
    hits,
    extras,
    pct: denom === 0 ? 1 : hits / denom,
    allCorrect: hits === targets && extras === 0,
    slots
  }
}

// Renders a state back to text (round-trips the answer with `[,]` resolved to
// a comma). Used by tests and the reveal.
export function render(tokens: PunctToken[], state: PunctState): string {
  return tokens
    .map((t, i) => {
      const w = state.words[i] ?? t.bare
      const m = state.marks[i] ?? ''
      const mark = m === '—' ? ' —' : m
      return `${w}${mark}${t.terminal}`
    })
    .join(' ')
}

// The answer's own state — what a perfect player ends with.
export function answerState(tokens: PunctToken[]): PunctState {
  return { words: tokens.map((t) => t.word), marks: tokens.map((t) => t.mark) }
}
