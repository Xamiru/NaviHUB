import { getGrammarPoint, listGrammar } from './dict/grammar'
import * as japaneseRepo from './repos/japaneseRepo'
import type { GrammarDeckResult, GrammarPoint } from '@shared/types'

// Grammar points as SRS cards, in the SAME queue as everything else.
//
// The section already had a levelled grammar library and a one-shot cloze quiz,
// but nothing scheduled a point for review — so grammar was the one thing you
// could study and then forget on purpose. Rather than a second scheduler, this
// generates ordinary jp_cards in a lesson of kind 'grammar', which
// japaneseRepo.submitReview and the whole review page already understand.
//
// Card shape, deliberately: FRONT is a real cloze sentence, BACK is the point
// plus its meaning, and it is SELF-GRADED (buildTypedPrompt only types vocab
// and kanji). A grammar point graded as recall-the-string punishes the learner
// for producing a correct synonym.
const GRAMMAR_COURSE = 'Grammar'

function cardsFor(point: GrammarPoint): { front: string; back: string; notes: string | null }[] {
  // Only clozeable examples: clozeJp is precomputed at import, and a null one is
  // reference material that would make a blank-less card.
  return point.examples
    .filter((ex) => ex.clozeJp && ex.clozeAnswer)
    .slice(0, 2)
    .map((ex) => ({
      front: ex.clozeJp as string,
      back: `${point.title} — ${point.meaning}`,
      notes: [ex.en, point.formation ? `Formation: ${point.formation}` : null]
        .filter(Boolean)
        .join('\n') || null
    }))
}

// Adds the given points to the grammar lesson for their level, creating the
// course/lesson on demand. Idempotent: a point already carrying cards is
// skipped, so "add all N5" can be re-run after the bank grows.
export function addGrammarPoints(ids: number[]): GrammarDeckResult {
  const points = ids.map((id) => getGrammarPoint(id)).filter((p): p is GrammarPoint => !!p)
  if (points.length === 0) return { lessonId: 0, added: 0, skipped: 0 }
  return japaneseRepo.addGrammarCards(
    GRAMMAR_COURSE,
    points.map((p) => ({
      level: p.level,
      title: p.title,
      cards: cardsFor(p)
    }))
  )
}

// The bulk action behind "Add <level> to reviews". Kept here rather than
// composed in ipc.ts so the "a level means every clozeable point in it" rule is
// testable and the handler stays a one-liner. `available` distinguishes "your
// deck already covers this level" from "the grammar bank is not installed" —
// the toast used to claim the former for both.
export function addGrammarLevel(level: string): GrammarDeckResult & { available: number } {
  const ids = listGrammar()
    .filter((p) => p.level === level)
    .map((p) => p.id)
  return { ...addGrammarPoints(ids), available: ids.length }
}
