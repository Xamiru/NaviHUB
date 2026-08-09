// Shapes for the English test section's code-defined content (the
// programming/ idiom: pure data importable by main, the renderer and tests).
// All `key` strings are FROZEN vocabulary — quiz_session settings and
// en_writing rows store them. Rename titles freely, never keys.

export type EnReadingQuestionKind = 'main-idea' | 'inference' | 'vocab-in-context' | 'tone' | 'detail'

export interface EnReadingQuestion {
  prompt: string
  kind: EnReadingQuestionKind
  options: string[] // exactly 4
  correct: number // index into options
  explain: string // why the answer is right, 1-2 sentences
}

// Passage `text` is Markdown for components/Markdown.tsx, whose parser
// (@shared/markdown.ts) supports: headings 1-3, paragraphs, FLAT lists,
// bold/italic/inline code/links. No tables, no blockquotes, no nesting.
// Word count is derived at render time — never stored (it would drift).
export interface EnPassage {
  key: string // FROZEN
  title: string
  topic: string // short eyebrow label, e.g. 'Science', 'Essay'
  level: 'C1' | 'C2'
  text: string // ~250-450 words
  questions: EnReadingQuestion[] // 4-6
}

export type EnMechanicsCategory =
  | 'articles'
  | 'punctuation'
  | 'boundaries' // run-ons, comma splices, fragments
  | 'confusables'
  | 'register'
  | 'spelling'

// The category list as a value, so the writing grader can constrain the model
// to it and the mechanics drill can weight itself by it.
export const EN_MECHANICS_CATEGORIES = [
  'articles',
  'punctuation',
  'boundaries',
  'confusables',
  'register',
  'spelling'
] as const satisfies readonly EnMechanicsCategory[]

// Error-spot / correction MCQ. Key convention: '<category>-<nn>'.
export interface EnMechanicsItem {
  key: string // FROZEN
  category: EnMechanicsCategory
  prompt: string // e.g. 'Which sentence is punctuated correctly?'
  options: string[] // exactly 4
  correct: number
  explain: string // the rule, 1-2 sentences
}

export type EnWritingTaskKind = 'opinion' | 'summary' | 'formal-rewrite' | 'email' | 'report'

export interface EnWritingPrompt {
  key: string // FROZEN
  kind: EnWritingTaskKind
  title: string
  instructions: string // the task, register + length expectations, plain text
  passageKey?: string // 'summary' tasks reference an EnPassage by key
  minWords?: number
  maxWords?: number
}
