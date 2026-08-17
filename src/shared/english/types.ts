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

// ---- Use of English (typed) ----
// Cambridge-style formats, one sentence per item so TypedDrill's item loop
// fits. Answers are matched through @shared/english/answers.ts (case,
// spacing, edge punctuation and unambiguous contractions are free), so list
// every DEFENSIBLE fill in `answers` — the first is canonical.

export type EnUseFormat = 'cloze' | 'wordform' | 'transform'

export const EN_CLOZE_FOCUS = [
  'preposition',
  'article',
  'conjunction',
  'relative',
  'auxiliary',
  'quantifier',
  'pronoun',
  'linker',
  'comparative',
  'other'
] as const
export type EnClozeFocus = (typeof EN_CLOZE_FOCUS)[number]

export interface EnClozeItem {
  key: string // FROZEN 'cloze-<nn>'
  context?: string // optional preceding sentence, rendered dim
  text: string // ONE sentence containing exactly one '___'
  answers: string[] // single function words, lowercase; [0] canonical
  focus: EnClozeFocus
  explain: string
}

export const EN_WORDFORM_TARGETS = ['noun', 'adjective', 'adverb', 'verb'] as const
export type EnWordFormTarget = (typeof EN_WORDFORM_TARGETS)[number]

export interface EnWordFormItem {
  key: string // FROZEN 'wf-<nn>'
  text: string // one sentence with exactly one '___'
  stem: string // UPPER CASE base word shown to the learner, e.g. 'RELY'
  answers: string[] // [0] canonical, e.g. ['unreliable']
  target: EnWordFormTarget
  negative?: true // a negative prefix is required
  explain: string
}

export const EN_TRANSFORM_FOCUS = [
  'passive',
  'reported',
  'conditional',
  'inversion',
  'comparison',
  'modal',
  'wish-regret',
  'causative',
  'phrasal',
  'linking',
  'verb-pattern',
  'emphasis'
] as const
export type EnTransformFocus = (typeof EN_TRANSFORM_FOCUS)[number]

export interface EnTransformItem {
  key: string // FROZEN 'tr-<nn>'
  original: string // the sentence to rewrite
  keyword: string // UPPER CASE; must appear unchanged (whole word) in every answer
  gapped: string // the rewrite with exactly one '___'
  answers: string[] // gap fills only; [0] canonical; 3-6 words each
  focus: EnTransformFocus
  explain: string
}

// ---- Mechanics games ----

export const EN_PUNCTUATE_FOCUS = ['splice', 'apostrophe', 'introductory', 'list', 'relative', 'mixed'] as const
export type EnPunctuateFocus = (typeof EN_PUNCTUATE_FOCUS)[number]

export interface EnPunctuateItem {
  key: string // FROZEN 'punct-<nn>'
  // Correctly punctuated, 1-3 sentences, 15-45 words. Internal marks limited
  // to , ; : and a spaced dash (—); terminals . ? !; apostrophes; `[,]` marks an
  // optional (Oxford) comma. No quotes, brackets or abbreviations with dots —
  // see @shared/english/punctuate.ts.
  answer: string
  focus: EnPunctuateFocus
  note: string // the rule(s), 1-2 sentences, shown after grading
}

export interface EnSpotErrorItem {
  key: string // FROZEN 'spot-<nn>'
  tokens: string[] // 6-22 display tokens (word + attached punctuation)
  wrongIndex: number | null // null = no error in this sentence
  fix: string | null // replacement token (same attached punctuation); null iff wrongIndex is null
  explain: string
  category: EnMechanicsCategory // reuses the six keys so errorTally weighting applies
}

export const EN_MATCH_THEMES = ['verb-noun', 'adjective-noun', 'phrasal-verb', 'preposition'] as const
export type EnMatchTheme = (typeof EN_MATCH_THEMES)[number]

export interface EnMatchSet {
  key: string // FROZEN 'match-<nn>'
  theme: EnMatchTheme
  title: string // 'Verb + noun: research'
  pairs: { left: string; right: string }[] // exactly 6; every left pairs with exactly one right IN THIS SET
}

// ---- Idioms & phrasal verbs (a vocab-quiz source) ----

export interface EnIdiom {
  key: string // FROZEN 'idiom-<nnn>' | 'phrasal-<nnn>'
  phrase: string
  meaning: string // one line, distinct across the bank
  example: string
  kind: 'idiom' | 'phrasal'
  register?: 'informal' | 'neutral' | 'formal'
}
