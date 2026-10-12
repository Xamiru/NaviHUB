import type { QuizHistory } from '../types'

export type TutorPhaseId = 'foundation' | 'bridge' | 'immersion' | 'independent' | 'advanced'
export type TutorSkill =
  | 'recall'
  | 'sound'
  | 'listening'
  | 'reading'
  | 'output'
  | 'curriculum'
  | 'kana'
  | 'lesson'

// The session lengths the learner picks from each day. Sixty is the full
// balanced loop; the shorter ones keep its order and drop the later blocks.
export type TutorBudget = 10 | 20 | 40 | 60
export const TUTOR_BUDGETS: TutorBudget[] = [10, 20, 40, 60]

export const TUTOR_SKILL_LABEL: Record<TutorSkill, string> = {
  recall: 'Review',
  sound: 'Sound',
  listening: 'Listening',
  reading: 'Reading',
  output: 'Speaking and writing',
  curriculum: 'Next lesson',
  kana: 'Kana',
  lesson: 'Lesson'
}

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
  /** Defaults to the full sixty-minute loop. */
  budgetMinutes?: TutorBudget
  /** Kana not yet practised and not marked as already known. */
  kanaNeeded?: boolean
  /** All-time review count; zero means no known words for listening yet. */
  totalReviews?: number
  nextLesson?: { id: number; title: string } | null
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
          ? 'Not enough recent reviews to measure yet.'
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
          ? 'Not tried yet.'
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
          ? 'Not tried yet.'
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
          ? 'Not tried yet.'
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
          ? 'Not tried yet.'
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
  const budget = e.budgetMinutes ?? 60
  const newRemaining = Math.max(0, e.dailyTarget - e.introducedToday)
  // Nothing to review yet: the first job is a lesson, not "keep the queue clear".
  const nothingToReview = e.due === 0 && e.unseen === 0
  const lessonFirst = nothingToReview && !!e.nextLesson
  // Guided listening deals only sentences built from known words, so a learner
  // with no reviewed cards hears the sound-system units instead.
  const knowsWords = (e.totalReviews ?? 1) > 0

  const kana: TutorTask = {
    skill: 'kana',
    title: 'Learn the kana',
    detail: 'Type the reading of each character. Start with a couple of rows and add more once they feel easy.',
    minutes: 10,
    route: '/japanese/kana',
    reason: 'Everything else in Japanese is written with these characters.',
    priority: 'required'
  }
  const sound: TutorTask = {
    skill: 'sound',
    title: 'One sound-system unit',
    detail: 'Hear the beat of each word, say the examples aloud, then answer the short check.',
    minutes: 10,
    route: '/japanese/phonology',
    reason: 'Hearing Japanese timing early makes every later word easier to remember.',
    priority: 'recommended'
  }
  const lesson: TutorTask = {
    skill: 'lesson',
    title: e.nextLesson ? `Learn: ${e.nextLesson.title}` : 'Learn your next lesson',
    detail: 'Read the lesson, try its short check, then mark it as learned so its words join your reviews.',
    minutes: 10,
    route: e.nextLesson ? `/japanese/lessons/${e.nextLesson.id}` : '/japanese/roadmap',
    reason: 'There is nothing to review yet, so the next lesson comes first.',
    priority: 'required'
  }
  const introduce: TutorTask = {
    skill: 'recall',
    title: `Introduce up to ${e.dailyTarget} new cards`,
    detail: 'Open Review after marking the lesson learned and meet its words for the first time.',
    minutes: 5,
    route: '/japanese/review',
    reason: 'New words stick when you see them again soon after reading the lesson.',
    priority: 'recommended'
  }
  const recall: TutorTask = {
    skill: 'recall',
    title:
      e.due > 0
        ? `Clear ${e.due} due card${e.due === 1 ? '' : 's'}`
        : newRemaining > 0 && e.unseen > 0
          ? `Introduce up to ${Math.min(newRemaining, e.unseen)} new cards`
          : 'Keep the review queue clear',
    detail: 'Answer from memory before revealing. Stop adding new cards while unseen ones are waiting.',
    minutes: 15,
    route: '/japanese/review',
    reason: e.due > 0 ? 'Cards that are due are the ones you are about to forget.' : 'A clear queue keeps tomorrow light.',
    priority: 'required'
  }

  const listeningRoute =
    e.hasListeningMedia && e.frontierStep >= 10 ? '/japanese/immersion' : '/japanese/listen'
  const listening: TutorTask = knowsWords
    ? {
        skill: 'listening',
        title:
          listeningRoute === '/japanese/immersion' ? 'Complete one five-pass scene' : 'Guided listening and shadowing',
        detail:
          listeningRoute === '/japanese/immersion'
            ? 'Watch cold, then with Japanese subtitles, then with the transcript; shadow a few lines and retell.'
            : 'Pick the meaning before you see the transcript, then repeat each sentence once out loud.',
        minutes: 10,
        route: listeningRoute,
        reason: e.hasListeningMedia
          ? 'An attached local episode is ready to listen to.'
          : 'Sentences built from words you know are a safe way to start listening.',
        priority: 'recommended'
      }
    : sound
  // Native manga is too hard in the first steps, so the foundation reads the
  // graded passages even when a manga is in progress.
  const realReading = e.hasReadingMedia && phase.id !== 'foundation'
  const reading: TutorTask = {
    skill: 'reading',
    title: realReading ? 'Read one manageable scene' : 'Read one graded passage',
    detail: realReading
      ? 'Read for meaning, look up only what blocks you, and save words that keep coming back.'
      : 'Use furigana when you need it and save only a few useful words.',
    minutes: 20,
    route: realReading ? e.readingRoute : '/japanese/reading',
    reason: realReading ? 'Real reading is what all of this is for.' : 'Connected text is the bridge to real manga and novels.',
    priority: 'required'
  }
  const output: TutorTask = {
    skill: 'output',
    title: e.frontierStep >= 4 ? 'Complete one branching role-play' : 'Write or say a few sentences',
    detail:
      e.frontierStep >= 4
        ? 'Answer before you look at the example replies, carry the conversation on, then fix what was missing.'
        : 'Answer the prompts in Japanese, compare with the example, then improve your answer.',
    minutes: 10,
    route: e.frontierStep >= 4 ? '/japanese/roleplay' : '/japanese/output',
    reason: 'Producing a sentence shows gaps that recognising one can hide.',
    priority: 'recommended'
  }
  // A measured weak result earns a short practice block; a skill that has never
  // been tried is not a weakness yet.
  const repair: TutorTask | null =
    weakness && weakness.score != null && !['recall', 'listening', 'reading', 'output'].includes(weakness.skill)
      ? {
          skill: weakness.skill,
          title: `Practise your weak spot: ${weakness.label}`,
          detail: weakness.evidence,
          minutes: 5,
          route: weakness.route,
          reason: 'This is the weakest measured part of your study.',
          priority: 'recommended'
        }
      : null
  const nextLessonTask: TutorTask = {
    skill: 'curriculum',
    title: lessonHeld ? 'Hold the next lesson' : 'Read the next lesson',
    detail: lessonHeld
      ? `${e.unseen} new card${e.unseen === 1 ? ' is' : 's are'} still waiting. Meet those first; the next lesson stays open.`
      : 'Read for understanding and try its check. Its cards join your reviews on a later day.',
    minutes: 5,
    route: lessonHeld ? '/japanese/review' : e.nextLesson ? `/japanese/lessons/${e.nextLesson.id}` : '/japanese/roadmap',
    reason: lessonHeld ? 'More new material would bury the cards already waiting.' : 'You have room for new material.',
    priority: lessonHeld ? 'optional' : 'recommended'
  }

  const at = (task: TutorTask, minutes: number): TutorTask => ({ ...task, minutes })
  let tasks: TutorTask[]
  if (e.kanaNeeded) {
    tasks =
      budget === 10
        ? [at(kana, 10)]
        : budget === 20
          ? [at(kana, 10), at(sound, 10)]
          : budget === 40
            ? [at(kana, 20), at(sound, 10), ...(e.nextLesson ? [at(lesson, 10)] : [])]
            : [at(kana, 30), at(sound, 15), ...(e.nextLesson ? [at(lesson, 15)] : [])]
  } else {
    const opening = lessonFirst
      ? (minutes: number) => [at(lesson, minutes - 5), introduce]
      : (minutes: number) => [at(recall, minutes)]
    // At twenty minutes the second block is whichever of reading and listening
    // has less recent practice, so the two alternate over the days.
    const listeningPractice =
      listening.skill === 'sound'
        ? e.phonology
        : listening.route === '/japanese/immersion'
          ? e.immersion
          : e.listening
    const second = listeningPractice.sessions < e.reading.sessions ? listening : reading
    tasks =
      budget === 10
        ? opening(10)
        : budget === 20
          ? [...opening(10), at(second, 10)]
          : budget === 40
            ? [...opening(15), at(listening, 10), at(reading, 15)]
            : [
                ...opening(15),
                at(listening, 10),
                at(reading, 20),
                at(output, 10),
                ...(repair ? [repair] : lessonFirst ? [] : [nextLessonTask])
              ]
  }

  return {
    phase,
    tasks,
    weakness,
    totalMinutes: tasks.reduce((sum, task) => sum + task.minutes, 0),
    lessonHeld
  }
}
