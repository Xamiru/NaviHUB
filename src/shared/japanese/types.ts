// Graded reading passages (/japanese/reading). Content is code with FROZEN
// keys; the furigana notation and its rules live in ./furigana.ts, and
// tests/jpReadings.test.ts enforces both.

export type JpReadingLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1'
export type JpReadingQuestionKind = 'detail' | 'main-idea' | 'inference' | 'vocab'

export interface JpReadingQuestion {
  prompt: string // English for N5/N4, Japanese (furigana notation) from N3 up
  kind: JpReadingQuestionKind
  options: string[] // exactly 4
  correct: number
  explain: string // always English — this is the teaching moment
}

export interface JpGlossEntry {
  word: string // appears in the passage (after stripFurigana)
  reading: string
  gloss: string
}

export interface JpPassage {
  key: string // FROZEN '<n5|n4|n3|n2|n1>-<nn>-<slug>'
  title: string // furigana notation allowed
  level: JpReadingLevel
  topic: string // short eyebrow label
  text: string // furigana notation; paragraphs separated by \n
  questions: JpReadingQuestion[] // exactly 4
  glossary: JpGlossEntry[] // 3-6
}
