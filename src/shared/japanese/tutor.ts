import type { QuizHistory } from '../types'

export type TutorPhaseId = 'foundation' | 'bridge' | 'immersion' | 'independent' | 'advanced'
export type TutorSkill = 'recall' | 'sound' | 'listening' | 'reading' | 'output' | 'curriculum'

export interface TutorPhase {
  id: TutorPhaseId
  title: string
  stepRange: string
  purpose: string
  weeklyProof: string[]
  exitEvidence: string[]
}

export const TUTOR_PHASES: TutorPhase[] = [
  {
    id: 'foundation',
    title: 'Foundation and sound',
    stepRange: 'Kana and Steps 01–03',
    purpose: 'Make the sound system, core sentence frame and first kanji automatic.',
    weeklyProof: [
      'Complete five review days without adding to a backlog.',
      'Finish two phonology units and shadow at least twenty known-word sentences.',
      'Read two N5 passages and one short scene from the sentence feed.'
    ],
    exitEvidence: [
      'Kana is read without translating through romaji.',
      'The phonology check is at least 80%.',
      'N5 passages are usually understood without opening every glossary item.'
    ]
  },
  {
    id: 'bridge',
    title: 'Controlled reading bridge',
    stepRange: 'Steps 04–09',
    purpose: 'Move from lessons and isolated sentences into manageable manga and VN scenes.',
    weeklyProof: [
      'Read from local media on at least four days and mine only useful recurring words.',
      'Complete two controlled-output units and three guided-listening rounds.',
      'Use a prep deck for the current manga or novel instead of a generic word dump.'
    ],
    exitEvidence: [
      'One easy manga scene can be followed with lookups rather than translation.',
      'N4 reading checks average at least 75%.',
      'Basic requests, descriptions and past events can be produced from a prompt.'
    ]
  },
  {
    id: 'immersion',
    title: 'Immersion bridge',
    stepRange: 'Steps 10–17',
    purpose: 'Connect known grammar to continuous speech, character voice and longer scenes.',
    weeklyProof: [
      'Complete two five-pass listening sessions from an attached anime or video.',
      'Finish one manga chapter or equivalent VN reading block.',
      'Retell one scene and write one short response with a model comparison.'
    ],
    exitEvidence: [
      'The gist of a familiar anime scene survives a first pass without subtitles.',
      'N3 connected readings average at least 75%.',
      'The learner can repair a response after comparing it with the model.'
    ]
  },
  {
    id: 'independent',
    title: 'Independent comprehension',
    stepRange: 'Steps 18–22',
    purpose: 'Sustain chapters and episodes while using lessons only to close observed gaps.',
    weeklyProof: [
      'Read two substantial chapters or equivalent novel sections.',
      'Complete two ten-minute cold-listening scenes and shadow selected lines.',
      'Write two short summaries or opinions and revise each after comparison.'
    ],
    exitEvidence: [
      'Unknown words interrupt comprehension less often than sentence structure does.',
      'N2 readings average at least 75%.',
      'A complete episode can be followed with Japanese subtitles and selective replay.'
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced range',
    stepRange: 'Steps 23–26 and self-directed media',
    purpose: 'Build breadth, precision and register through difficult native material.',
    weeklyProof: [
      'Alternate literary, conversational and formal material instead of staying in one register.',
      'Complete one no-subtitle listening pass and one detailed transcript pass.',
      'Produce one scene retell and one reasoned written response from memory.'
    ],
    exitEvidence: [
      'N1 readings are workable with selective lookup rather than line-by-line translation.',
      'Long scenes can be summarized accurately after listening.',
      'The app has become a media-and-feedback loop rather than the source of every sentence.'
    ]
  }
]

export interface TutorHistoryEvidence {
  sessions: number
  accuracy: number | null
}

export interface TutorEvidence {
  due: number
  unseen: number
  introducedToday: number
  dailyTarget: number
  frontierStep: number
  strictRetention30: number | null
  phonology: TutorHistoryEvidence
  listening: TutorHistoryEvidence
  immersion: TutorHistoryEvidence
  reading: TutorHistoryEvidence
  output: TutorHistoryEvidence
  chaptersRead: number
  hasReadingMedia: boolean
  hasListeningMedia: boolean
  readingRoute: string
}

export interface TutorTask {
  skill: TutorSkill
  title: string
  detail: string
  minutes: number
  route: string
  reason: string
  priority: 'required' | 'recommended' | 'optional'
}

export interface TutorWeakness {
  skill: TutorSkill
  label: string
  score: number | null
  route: string
  evidence: string
}

export interface TutorPlan {
  phase: TutorPhase
  tasks: TutorTask[]
  weakness: TutorWeakness | null
  totalMinutes: number
  lessonHeld: boolean
}

export function historyEvidence(history: QuizHistory | undefined): TutorHistoryEvidence {
  if (!history) return { sessions: 0, accuracy: null }
  const scored = history.recent.filter((session) => session.total > 0).slice(0, 10)
  const total = scored.reduce((sum, session) => sum + session.total, 0)
  const score = scored.reduce((sum, session) => sum + session.score, 0)
  return {
    sessions: history.totalSessions,
    accuracy: total > 0 ? Math.round((score / total) * 100) : null
  }
}

export function tutorPhaseForStep(step: number): TutorPhase {
  if (step <= 3) return TUTOR_PHASES[0]
  if (step <= 9) return TUTOR_PHASES[1]
  if (step <= 17) return TUTOR_PHASES[2]
  if (step <= 22) return TUTOR_PHASES[3]
  return TUTOR_PHASES[4]
}

function weakestSkill(e: TutorEvidence): TutorWeakness | null {
  const useImmersion = e.frontierStep >= 10 && e.hasListeningMedia
  const listeningEvidence = useImmersion ? e.immersion : e.listening
  const candidates: Array<TutorWeakness & { threshold: number; sessions: number }> = [
    {
      skill: 'recall',
      label: 'Retention',
      score: e.strictRetention30,
      route: '/japanese/review',
      evidence:
        e.strictRetention30 == null
          ? 'There are not enough recent reviews to measure strict retention yet.'
          : `Strict 30-day retention is ${e.strictRetention30}%.`,
      threshold: 80,
      // A missing retention sample is already handled by the required review
      // block. Do not let it hide a truly absent sound or comprehension skill.
      sessions: 1
    },
    {
      skill: 'sound',
      label: 'Sound foundation',
      score: e.phonology.accuracy,
      route: '/japanese/phonology',
      evidence:
        e.phonology.accuracy == null
          ? 'The phonology foundation has not produced evidence yet.'
          : `Recent phonology accuracy is ${e.phonology.accuracy}%.`,
      threshold: 80,
      sessions: e.phonology.sessions
    },
    {
      skill: 'listening',
      label: useImmersion ? 'Long-form listening' : 'Listening comprehension',
      score: listeningEvidence.accuracy,
      route: useImmersion ? '/japanese/immersion' : '/japanese/listen',
      evidence:
        listeningEvidence.accuracy == null
          ? useImmersion
            ? 'There are no long-form listening results yet.'
            : 'There are no guided-listening results yet.'
          : `Recent ${useImmersion ? 'long-form' : 'guided'} listening accuracy is ${listeningEvidence.accuracy}%.`,
      threshold: 75,
      sessions: listeningEvidence.sessions
    },
    {
      skill: 'reading',
      label: 'Connected reading',
      score: e.reading.accuracy,
      route: '/japanese/reading',
      evidence:
        e.reading.accuracy == null
          ? 'There are no connected-reading results yet.'
          : `Recent graded-reading accuracy is ${e.reading.accuracy}%.`,
      threshold: 75,
      sessions: e.reading.sessions
    },
    {
      skill: 'output',
      label: 'Controlled output',
      score: e.output.accuracy,
      route: '/japanese/output',
      evidence:
        e.output.accuracy == null
          ? 'No controlled-output unit has been self-checked yet.'
          : `Recent controlled-output confidence is ${e.output.accuracy}%.`,
      threshold: 70,
      sessions: e.output.sessions
    }
  ]

  const weak = candidates
    .map((candidate) => ({
      ...candidate,
      gap:
        candidate.score == null
          ? candidate.sessions === 0
            ? candidate.threshold
            : 0
          : Math.max(0, candidate.threshold - candidate.score)
    }))
    .filter((candidate) => candidate.gap > 0)
    .sort((a, b) => b.gap - a.gap)[0]

  if (!weak) return null
  const { threshold: _threshold, sessions: _sessions, gap: _gap, ...result } = weak
  return result
}

export function buildTutorPlan(e: TutorEvidence): TutorPlan {
  const phase = tutorPhaseForStep(e.frontierStep)
  const weakness = weakestSkill(e)
  const lessonHeld = e.unseen > 0
  const newRemaining = Math.max(0, e.dailyTarget - e.introducedToday)
  const reviewTitle =
    e.due > 0
      ? `Clear ${e.due} due card${e.due === 1 ? '' : 's'}`
      : newRemaining > 0 && e.unseen > 0
        ? `Introduce up to ${Math.min(newRemaining, e.unseen)} new cards`
        : 'Keep the review queue clear'

  const listeningRoute =
    e.hasListeningMedia && e.frontierStep >= 10 ? '/japanese/immersion' : '/japanese/listen'
  const listeningTitle =
    listeningRoute === '/japanese/immersion' ? 'Complete one five-pass scene' : 'Guided listening and shadowing'

  const tasks: TutorTask[] = [
    {
      skill: 'recall',
      title: reviewTitle,
      detail: 'Grade from memory before revealing. Stop adding new cards if the unseen pile remains.',
      minutes: 15,
      route: '/japanese/review',
      reason: e.due > 0 ? 'Due recall has the highest forgetting cost.' : 'A clear queue protects tomorrow.',
      priority: 'required'
    },
    {
      skill: 'listening',
      title: listeningTitle,
      detail:
        listeningRoute === '/japanese/immersion'
          ? 'Cold pass, Japanese-subtitle pass, transcript pass, then shadow and retell.'
          : 'Choose meaning before the transcript, then shadow each revealed sentence once.',
      minutes: 10,
      route: listeningRoute,
      reason: e.hasListeningMedia
        ? 'An attached local episode is ready to become listening curriculum.'
        : 'Known-word audio builds a safe listening base until local video is attached.',
      priority: 'recommended'
    },
    {
      skill: 'reading',
      title: e.hasReadingMedia ? 'Read one manageable scene' : 'Complete one connected graded reading',
      detail: e.hasReadingMedia
        ? 'Read for meaning, look up only blockers, and mine words that recur or matter to the scene.'
        : 'Use furigana only when structure stops being visible; mine no more than a few useful words.',
      minutes: 20,
      route: e.hasReadingMedia ? e.readingRoute : '/japanese/reading',
      reason: e.hasReadingMedia ? 'Real reading is the main transfer target.' : 'Connected text is the bridge to local media.',
      priority: 'required'
    },
    {
      skill: 'output',
      title: e.frontierStep >= 4 ? 'Complete one branching role-play' : 'Produce, compare, and repair',
      detail: e.frontierStep >= 4
        ? 'Respond before revealing the authored paths, carry the exchange forward, then repair missing language functions.'
        : 'Finish one controlled response and revise the answer after comparison.',
      minutes: 10,
      route: e.frontierStep >= 4 ? '/japanese/roleplay' : '/japanese/output',
      reason: 'Retrieval in a sentence exposes gaps that recognition can hide.',
      priority: 'recommended'
    }
  ]

  if (weakness && weakness.skill !== 'recall' && weakness.skill !== 'listening' && weakness.skill !== 'reading' && weakness.skill !== 'output') {
    tasks.push({
      skill: weakness.skill,
      title: `Repair: ${weakness.label}`,
      detail: weakness.evidence,
      minutes: 5,
      route: weakness.route,
      reason: 'This is the weakest measured part of the current loop.',
      priority: 'recommended'
    })
  } else {
    tasks.push({
      skill: 'curriculum',
      title: lessonHeld ? 'Hold the next lesson' : 'Read the next roadmap lesson',
      detail: lessonHeld
        ? `There are ${e.unseen} unseen cards waiting. Use the five minutes on the weakest current skill instead.`
        : 'Read for understanding, complete the production check, then introduce its cards on a later review.',
      minutes: 5,
      route: lessonHeld && weakness ? weakness.route : '/japanese/roadmap',
      reason: lessonHeld ? 'More content would hide the current backlog.' : 'The recall queue has room for new material.',
      priority: lessonHeld ? 'optional' : 'recommended'
    })
  }

  return {
    phase,
    tasks,
    weakness,
    totalMinutes: tasks.reduce((sum, task) => sum + task.minutes, 0),
    lessonHeld
  }
}
