import type { JpLessonKind } from '../types'

// "Practice this" under a lesson: the drills that already exist for what the
// lesson teaches. Keyed by the built-in lesson's frozen seed key (or a course
// prefix such as `counters.`); kanji lessons of any course get the writing
// and kanji quiz. A conjugation link names its forms (?form=), which the
// conjugation drill reads to preselect them. tests/renderer/LessonPractice.test.tsx
// checks every key against the keys lock and every route against App.tsx.

export interface PracticeLink {
  label: string
  route: string
}

const conj = (forms: string, label = 'Conjugation drill'): PracticeLink => ({
  label,
  route: `/japanese/kana?tab=conjugation&form=${forms}`
})
const NUMBERS: PracticeLink = { label: 'Numbers and counters drill', route: '/japanese/kana?tab=numbers' }
const PARTICLES: PracticeLink = { label: 'Particle fill', route: '/japanese/sentences?tab=particles' }
const PAIRS: PracticeLink = { label: 'Verb pairs drill', route: '/japanese/confusables?tab=pairs' }
const KEIGO: PracticeLink = { label: 'Keigo drill', route: '/japanese/kana?tab=keigo' }
const KANJI: PracticeLink[] = [
  { label: 'Handwriting practice', route: '/japanese/write' },
  { label: 'Kanji quiz', route: '/japanese/kanji/quiz' }
]

export const LESSON_PRACTICE: Record<string, PracticeLink[]> = {
  // N5 Foundations
  'n5.02': [PARTICLES],
  'n5.06': [NUMBERS],
  'n5.numbers': [NUMBERS],
  'n5.07': [conj('masu')],
  'n5.09': [PARTICLES],
  'n5.12': [conj('masu,negative,past')],
  'n5.11': [PARTICLES],
  'n5.kara-made': [PARTICLES],
  'n5.to-de': [PARTICLES],
  'n5.ga': [PARTICLES],
  'n5.hindo': [NUMBERS],
  'n5.tai': [conj('tai')],
  'n5.14': [conj('negative,past', 'Adjective and verb forms drill')],
  'n5.adverb': [conj('adverbial')],
  'n5.17': [conj('te')],
  'n5.21': [conj('past')],
  'n5.nai': [conj('negative')],
  'n5.plain': [conj('negative,past')],
  // N4
  'n4.03': [conj('potential')],
  'n4.07': [conj('ba')],
  'n4.11': [conj('passive')],
  'n4.12': [conj('causative')],
  'n4.16': [conj('volitional')],
  'n4b.jidoushi': [PAIRS],
  'n4b.o-ni-naru': [KEIGO],
  // Keigo in Manga & VN Japanese II
  'casual2.01': [KEIGO],
  'casual2.02': [KEIGO]
}

const BY_PREFIX: [prefix: string, links: PracticeLink[]][] = [['counters.', [NUMBERS]]]

export function lessonPractice(seedKey: string | null, kind: JpLessonKind): PracticeLink[] {
  const links = [
    ...(seedKey ? (LESSON_PRACTICE[seedKey] ?? BY_PREFIX.find(([p]) => seedKey.startsWith(p))?.[1] ?? []) : []),
    ...(kind === 'kanji' ? KANJI : [])
  ]
  return links
}
