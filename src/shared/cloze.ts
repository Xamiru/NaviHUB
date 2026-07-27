import { readingMatches } from './romaji'
import type { JpCard, JpLessonKind } from './types'

// Typed answers for reviews (the Bunpro idea): instead of flipping a card and
// self-grading, type the missing piece and be told whether you got it.
//
// Reviews stay SM-2: this only *suggests* a grade, and the four grade buttons
// still decide. Cards that can't produce a good prompt return null and fall
// back to the normal flip — precision over coverage, because a wrong blank is
// worse than no blank.

export const BLANK = '＿＿'

export interface TypedPrompt {
  display: string // the sentence/term with the target blanked out
  hint: string | null // shown under the prompt (translation or meaning)
  reveal: string // the expected answer, shown after checking
  accept(input: string): boolean
}

// Grammar cards store the example sentence in `front`; the grammar POINT lives
// only in the lesson title ("Explanatory ～んです / ～んだ", "Conditionals I:
// ～たら"). Pull the kana-only runs out of the title and use the longest one
// that actually appears in the sentence.
export function grammarCandidates(lessonTitle: string): string[] {
  const out: string[] = []
  // Split on the separators the seed titles use — including ～ itself, so a
  // title like '～ば～ほど' yields two candidates rather than one nonsense run.
  for (const raw of lessonTitle.split(/[～〜・／/:：—–\-,、\s]+/)) {
    const seg = raw.replace(/[(){}（）「」"'.!?？！]/g, '').trim()
    if (seg.length < 2) continue
    // Kana-only: a candidate containing kanji is a vocabulary word, not the
    // grammatical frame we want to blank.
    if (!/^[ぁ-んァ-ヶー]+$/.test(seg)) continue
    out.push(seg)
  }
  // Longest first: 'んです' should beat 'です' when the title offers both.
  return [...new Set(out)].sort((a, b) => b.length - a.length)
}

function clozeOf(sentence: string, target: string): string {
  return sentence.replace(target, BLANK)
}

// Builds the typed prompt for a card, or null when it should just flip.
export function buildTypedPrompt(
  card: Pick<JpCard, 'front' | 'reading' | 'back' | 'exampleJp'>,
  lessonKind: JpLessonKind,
  lessonTitle: string
): TypedPrompt | null {
  if (lessonKind === 'grammar') {
    const target = grammarCandidates(lessonTitle).find((c) => card.front.includes(c))
    if (!target) return null
    return {
      display: clozeOf(card.front, target),
      hint: card.back || null,
      reveal: target,
      accept: (input) => {
        const t = input.trim()
        if (!t) return false
        return t === target || readingMatches(t, [target])
      }
    }
  }

  if (lessonKind === 'vocab') {
    // Prefer a real cloze from the example sentence — same predicate the quiz
    // page uses to decide a card can carry a cloze question.
    const example = card.exampleJp ?? ''
    if (example && example !== card.front && example.includes(card.front)) {
      const answers = [card.front, card.reading].filter((x): x is string => !!x)
      return {
        display: clozeOf(example, card.front),
        hint: card.back || null,
        reveal: card.front,
        accept: (input) => {
          const t = input.trim()
          if (!t) return false
          return answers.includes(t) || readingMatches(t, answers)
        }
      }
    }
    // No usable example: type the reading instead (romaji or kana both count).
    if (card.reading) {
      const reading = card.reading
      return {
        display: card.front,
        hint: card.back || null,
        reveal: reading,
        accept: (input) => {
          const t = input.trim()
          if (!t) return false
          return t === reading || readingMatches(t, [reading])
        }
      }
    }
    return null
  }

  // Kanji cards already have a typed-reading drill of their own on the kana
  // page; duplicating it inside reviews adds nothing.
  return null
}
