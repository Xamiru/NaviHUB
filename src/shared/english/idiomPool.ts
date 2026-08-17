import type { EnIdiom } from './types'
import type { EnVocabQuestion } from '../types'
import { shuffle } from '../shuffle'

// Builds vocab-quiz questions from the idiom bank, client-side (content is
// code). Mirrors main/englishDrills.buildVocabPool's output shape so the vocab
// page's play loop and save-misses path need no branch: word = phrase, pos =
// 'idiom' | 'phrasal verb', def = meaning. Distractors are three OTHER
// meanings of the same kind. rng injectable for tests.
export function buildIdiomPool(
  items: EnIdiom[],
  mode: 'word2def' | 'def2word',
  limit: number,
  rng: () => number = Math.random
): EnVocabQuestion[] {
  const out: EnVocabQuestion[] = []
  for (const it of shuffle(items, rng)) {
    if (out.length >= limit) break
    const others = items.filter((o) => o.kind === it.kind && o.key !== it.key)
    if (others.length < 3) continue
    const picked = shuffle(others, rng).slice(0, 3)
    const answer = mode === 'word2def' ? it.meaning : it.phrase
    const distractors = picked.map((o) => (mode === 'word2def' ? o.meaning : o.phrase))
    out.push({
      word: it.phrase,
      pos: it.kind === 'idiom' ? 'idiom' : 'phrasal verb',
      def: it.meaning,
      ipa: null,
      rank: null,
      prompt: mode === 'word2def' ? it.phrase : it.meaning,
      answer,
      distractors
    })
  }
  return out
}
