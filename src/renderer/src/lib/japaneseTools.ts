import type { TutorPhaseId } from '@shared/japanese/tutor'

// Every Japanese practice tool, grouped by what the learner wants to get
// better at. Today shows a few suggested ones; /japanese/tools shows them all.
// Nothing is ever locked: `phases` only decides when a tool is suggested.

export type JpToolGoal = 'read' | 'listen' | 'speak' | 'words' | 'grammar' | 'games' | 'lookup'

export interface JpTool {
  key: string
  title: string
  body: string
  goal: JpToolGoal
  /** A route, or the core-deck dialog that Today and Tools open in place. */
  to?: string
  action?: 'core'
  phases: TutorPhaseId[]
}

export const JP_TOOL_GOALS: { key: JpToolGoal; title: string; body: string }[] = [
  { key: 'read', title: 'Read', body: 'From graded passages to your own manga and novels.' },
  { key: 'listen', title: 'Listen', body: 'Hear sentences, then whole scenes.' },
  { key: 'speak', title: 'Speak and write', body: 'Make your own sentences and say them aloud.' },
  { key: 'words', title: 'Words and kanji', body: 'Grow and sharpen your vocabulary.' },
  { key: 'grammar', title: 'Grammar', body: 'Learn and drill sentence patterns.' },
  { key: 'games', title: 'Games', body: 'Quick, repeatable rounds against the clock.' },
  { key: 'lookup', title: 'Look up', body: 'Dictionaries and references, all offline.' }
]

const EARLY: TutorPhaseId[] = ['foundation']
const BRIDGE: TutorPhaseId[] = ['bridge']
const LATE: TutorPhaseId[] = ['immersion', 'independent', 'advanced']

export const JP_TOOLS: JpTool[] = [
  { key: 'reading', to: '/japanese/reading', goal: 'read', title: 'Graded reading', body: 'Short connected passages from N5 to N1, with questions.', phases: [...EARLY, ...BRIDGE] },
  { key: 'feed', to: '/japanese/feed', goal: 'read', title: 'Sentence feed', body: 'Sentences where you know every word but one.', phases: BRIDGE },
  { key: 'mine', to: '/japanese/mine', goal: 'read', title: 'Save words', body: 'Add words from what you read to your reviews.', phases: BRIDGE },
  { key: 'analyze', to: '/japanese/analyze', goal: 'read', title: 'Check a text', body: 'Paste text to see how much of it you already know.', phases: LATE },
  { key: 'coverage', to: '/japanese/coverage', goal: 'read', title: 'Series difficulty', body: 'How many words you know in each of your series.', phases: LATE },

  { key: 'phonology', to: '/japanese/phonology', goal: 'listen', title: 'Sound foundation', body: 'The beat of Japanese, long vowels and small っ.', phases: EARLY },
  { key: 'listen', to: '/japanese/listen', goal: 'listen', title: 'Listening', body: 'Understand a sentence by ear, then repeat it.', phases: [...BRIDGE, 'immersion'] },
  { key: 'immersion', to: '/japanese/immersion', goal: 'listen', title: 'Watch a scene', body: 'Five passes over a scene from your own anime.', phases: LATE },
  { key: 'pitch', to: '/japanese/pitch', goal: 'listen', title: 'Pitch accent', body: 'Hear and say the rise and fall of words.', phases: BRIDGE },

  { key: 'output', to: '/japanese/output', goal: 'speak', title: 'Make sentences', body: 'Answer prompts, compare, then improve your answer.', phases: [...EARLY, ...BRIDGE] },
  { key: 'roleplay', to: '/japanese/roleplay', goal: 'speak', title: 'Role-play', body: 'Carry a conversation through several turns.', phases: LATE },
  { key: 'write', to: '/japanese/write', goal: 'speak', title: 'Kanji writing', body: 'Draw kanji stroke by stroke.', phases: EARLY },

  { key: 'quiz', to: '/japanese/quiz', goal: 'words', title: 'Practice quiz', body: 'Multiple choice over what you have learned.', phases: EARLY },
  { key: 'core', action: 'core', goal: 'words', title: 'Core words', body: 'Add the most common words you do not know yet.', phases: BRIDGE },
  { key: 'confusables', to: '/japanese/confusables', goal: 'words', title: 'Look-alikes', body: 'Kanji that look alike and words that sound alike.', phases: BRIDGE },
  { key: 'loanwords', to: '/japanese/loanwords', goal: 'words', title: 'Loanwords', body: 'Katakana words you may already know.', phases: EARLY },
  { key: 'kanji-quiz', to: '/japanese/kanji/quiz', goal: 'words', title: 'Build a kanji', body: 'Put kanji together from their parts.', phases: BRIDGE },
  { key: 'test', to: '/japanese/test', goal: 'words', title: 'JLPT check', body: 'A short level check from what is installed.', phases: LATE },

  { key: 'grammar', to: '/japanese/grammar', goal: 'grammar', title: 'Grammar library', body: 'Every N5 to N1 grammar point, searchable.', phases: BRIDGE },
  { key: 'grammar-quiz', to: '/japanese/grammar/quiz', goal: 'grammar', title: 'Grammar drill', body: 'Fill the blank in real sentences.', phases: BRIDGE },
  { key: 'sentences', to: '/japanese/sentences', goal: 'grammar', title: 'Sentence games', body: 'Particles, word order and readings in context.', phases: [...EARLY, ...BRIDGE] },
  { key: 'drills', to: '/japanese/kana', goal: 'grammar', title: 'Typing drills', body: 'Kana, readings, verb forms, numbers and polite speech.', phases: EARLY },

  { key: 'arcade', to: '/japanese/arcade', goal: 'games', title: 'Arcade', body: 'Sixty-second kana, reading and verb-form races.', phases: EARLY },
  { key: 'shiritori', to: '/japanese/shiritori', goal: 'games', title: 'Shiritori', body: 'The word-chain game against the dictionary.', phases: BRIDGE },

  { key: 'dictionary', to: '/japanese/dictionary', goal: 'lookup', title: 'Dictionary', body: 'Words, examples, pitch and stroke order.', phases: [] },
  { key: 'kanji', to: '/japanese/kanji', goal: 'lookup', title: 'Kanji by parts', body: 'Find a kanji from the pieces you can see.', phases: [] },
  { key: 'guide', to: '/japanese/guide', goal: 'lookup', title: 'Guide', body: 'What every part of this section is for.', phases: [] }
]

// Kana first-timers get the tools that practise reading kana itself.
const KANA_STARTER = ['drills', 'arcade', 'loanwords', 'phonology']

export function suggestedJpTools(phase: TutorPhaseId, kanaNeeded: boolean, limit = 4): JpTool[] {
  if (kanaNeeded) return KANA_STARTER.map((key) => JP_TOOLS.find((tool) => tool.key === key)!)
  return JP_TOOLS.filter((tool) => tool.phases.includes(phase)).slice(0, limit)
}
