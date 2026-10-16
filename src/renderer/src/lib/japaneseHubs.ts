// The Japanese practice tools, consolidated into six hubs. Each hub is a set
// of sibling pages joined by one tab strip (JapaneseHubTabs), the MediaListPage
// sibling-library idiom: every tool keeps its own URL, so links, the command
// palette, the Guide and saved Tutor sessions keep working, while the learner
// sees six destinations instead of nineteen. /japanese/tools leads with these.

export interface JpHubTool {
  key: string
  label: string
  to: string
}

export interface JpHub {
  key: string
  title: string
  body: string
  tools: JpHubTool[]
}

export const JP_HUBS: JpHub[] = [
  {
    key: 'reading',
    title: 'Reading',
    body: 'Graded passages, then sentences built from words you know.',
    tools: [
      { key: 'reading', label: 'Graded reading', to: '/japanese/reading' },
      { key: 'feed', label: 'Sentence feed', to: '/japanese/feed' }
    ]
  },
  {
    key: 'sound',
    title: 'Sound and listening',
    body: 'The sound system, pitch, listening by ear and whole scenes.',
    tools: [
      { key: 'phonology', label: 'Sound foundation', to: '/japanese/phonology' },
      { key: 'pitch', label: 'Pitch accent', to: '/japanese/pitch' },
      { key: 'listen', label: 'Listening', to: '/japanese/listen' },
      { key: 'immersion', label: 'Watch a scene', to: '/japanese/immersion' }
    ]
  },
  {
    key: 'speaking',
    title: 'Speaking and writing',
    body: 'Make your own sentences and carry a conversation.',
    tools: [
      { key: 'output', label: 'Make sentences', to: '/japanese/output' },
      { key: 'roleplay', label: 'Role-play', to: '/japanese/roleplay' }
    ]
  },
  {
    key: 'kanji',
    title: 'Kanji',
    body: 'Find kanji by their parts, write them, and build them.',
    tools: [
      { key: 'kanji', label: 'By parts', to: '/japanese/kanji' },
      { key: 'write', label: 'Writing', to: '/japanese/write' },
      { key: 'kanji-quiz', label: 'Build a kanji', to: '/japanese/kanji/quiz' }
    ]
  },
  {
    key: 'drills',
    title: 'Word and grammar drills',
    body: 'Quick rounds over what you have learned.',
    tools: [
      { key: 'quiz', label: 'Practice quiz', to: '/japanese/quiz' },
      { key: 'grammar-quiz', label: 'Grammar drill', to: '/japanese/grammar/quiz' },
      { key: 'confusables', label: 'Look-alikes', to: '/japanese/confusables' },
      { key: 'loanwords', label: 'Loanwords', to: '/japanese/loanwords' },
      { key: 'leeches', label: 'Hard cards', to: '/japanese/leeches/drill' }
    ]
  },
  {
    key: 'games',
    title: 'Games',
    body: 'Races, word chains and sentence puzzles.',
    tools: [
      { key: 'arcade', label: 'Arcade', to: '/japanese/arcade' },
      { key: 'shiritori', label: 'Shiritori', to: '/japanese/shiritori' },
      { key: 'sentences', label: 'Sentence games', to: '/japanese/sentences' }
    ]
  }
]

// The hub (and the tool inside it) a route belongs to; null off-hub.
export function hubForPath(pathname: string): { hub: JpHub; tool: JpHubTool } | null {
  for (const hub of JP_HUBS) {
    const tool = hub.tools.find((t) => t.to === pathname)
    if (tool) return { hub, tool }
  }
  return null
}

export const JP_HUB_TOOL_KEYS = new Set(JP_HUBS.flatMap((hub) => hub.tools.map((t) => t.key)))
