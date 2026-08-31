import type { QuizHistory, QuizKind, QuizSession } from '../types'
import type { TutorPhaseId, TutorSkill, TutorTask } from './tutor'

export interface TutorSessionBaseline {
  due: number
  reviewsToday: number
  introducedToday: number
  chaptersRead: number
}

export interface TutorSessionState {
  version: 1
  day: string
  startedAt: string
  phaseId: TutorPhaseId
  tasks: TutorTask[]
  baseline: TutorSessionBaseline
  manualCompleted: string[]
  dismissedRepairs: string[]
  endedAt: string | null
}

export interface TutorSessionEvidence {
  due: number
  reviewsToday: number
  introducedToday: number
  chaptersRead: number
  latestChapterReadAt: string | null
  histories: Partial<Record<QuizKind, QuizHistory>>
}

export interface TutorRepair {
  key: string
  skill: TutorSkill
  title: string
  detail: string
  route: string
  score: number
  threshold: number
  sourceKind: QuizKind
  sourceSessionId: number
}

export interface TutorTaskProgress {
  key: string
  task: TutorTask
  complete: boolean
  evidence: string
  latestSession: QuizSession | null
  weakness: TutorRepair | null
  repair: TutorRepair | null
}

export interface TutorDebrief {
  completed: number
  total: number
  plannedMinutesCompleted: number
  plannedMinutesTotal: number
  summary: string
  strongest: string | null
  tomorrowFocus: string
}

const THRESHOLDS: Partial<Record<TutorSkill, number>> = {
  sound: 80,
  listening: 75,
  reading: 75,
  output: 70
}

export function tutorTaskKey(task: TutorTask, index: number): string {
  return `${index}:${task.skill}`
}

function stamp(value: string | null | undefined): number {
  if (!value) return 0
  const normalized = value.includes('T') ? value : `${value.replace(' ', 'T')}Z`
  const parsed = Date.parse(normalized)
  return Number.isFinite(parsed) ? parsed : 0
}

function latestAfter(history: QuizHistory | undefined, startedAt: string): QuizSession | null {
  const start = stamp(startedAt)
  return (
    history?.recent
      .filter((session) => stamp(session.playedAt) >= start)
      .sort((a, b) => stamp(b.playedAt) - stamp(a.playedAt))[0] ?? null
  )
}

function historiesFor(task: TutorTask, evidence: TutorSessionEvidence): QuizHistory[] {
  switch (task.skill) {
    case 'sound':
      return [evidence.histories.jpPhonology].filter(Boolean) as QuizHistory[]
    case 'listening':
      return [evidence.histories.jpImmersion, evidence.histories.listening].filter(
        Boolean
      ) as QuizHistory[]
    case 'reading':
      return [evidence.histories.jpReading].filter(Boolean) as QuizHistory[]
    case 'output':
      return [evidence.histories.jpOutput].filter(Boolean) as QuizHistory[]
    default:
      return []
  }
}

function latestTaskSession(
  task: TutorTask,
  evidence: TutorSessionEvidence,
  startedAt: string
): QuizSession | null {
  return (
    historiesFor(task, evidence)
      .map((history) => latestAfter(history, startedAt))
      .filter(Boolean)
      .sort((a, b) => stamp(b!.playedAt) - stamp(a!.playedAt))[0] ?? null
  )
}

function repairFor(
  key: string,
  task: TutorTask,
  session: QuizSession | null
): TutorRepair | null {
  const threshold = THRESHOLDS[task.skill]
  if (!session || threshold == null || session.total <= 0) return null
  const score = Math.round((session.score / session.total) * 100)
  const repairKey = `${key}:${session.kind}:${session.id}`
  if (score >= threshold) return null
  const copy: Record<'sound' | 'listening' | 'reading' | 'output', [string, string]> = {
    sound: [
      'Repair the sound distinction now',
      'Replay the lesson examples with beats, say each contrast twice, then repeat its short check.'
    ],
    listening: [
      'Replay one missed listening segment',
      'Use Japanese subtitles only after a cold replay, then shadow one line that failed to resolve.'
    ],
    reading: [
      'Repair the passage before moving on',
      'Reread the paragraph behind one missed answer and explain the connector or reference that changed its meaning.'
    ],
    output: [
      'Repair one response immediately',
      'Say or write the weakest prompt again from memory, then compare only the structure you missed.'
    ]
  }
  const [title, detail] = copy[task.skill as keyof typeof copy]
  return {
    key: repairKey,
    skill: task.skill,
    title,
    detail,
    route: task.route,
    score,
    threshold,
    sourceKind: session.kind,
    sourceSessionId: session.id
  }
}

function sessionMeetsEvidence(task: TutorTask, session: QuizSession | null): boolean {
  if (!session) return false
  if (task.skill === 'sound') return session.total >= 3
  if (task.skill === 'reading') return session.total >= 4
  if (task.skill === 'output') return session.total >= 6
  if (task.skill !== 'listening') return true
  if (session.kind !== 'jpImmersion') return session.total >= 5
  const passes = session.settings?.passes
  const retellLength = session.settings?.retellLength
  return Array.isArray(passes) && passes.length >= 3 && Number(retellLength) >= 40
}

export function tutorSessionProgress(
  state: TutorSessionState,
  evidence: TutorSessionEvidence
): TutorTaskProgress[] {
  const manual = new Set(state.manualCompleted)
  const dismissed = new Set(state.dismissedRepairs)
  return state.tasks.map((task, index) => {
    const key = tutorTaskKey(task, index)
    const latestSession = latestTaskSession(task, evidence, state.startedAt)
    let complete = manual.has(key)
    let source = complete ? 'Marked complete by you.' : 'Waiting for evidence from this session.'

    if (!complete && task.skill === 'recall') {
      const introducing = task.title.startsWith('Introduce')
      const reviewsAdded = Math.max(0, evidence.reviewsToday - state.baseline.reviewsToday)
      const reviewTarget = Math.min(10, state.baseline.due)
      complete = introducing
        ? evidence.introducedToday > state.baseline.introducedToday
        : state.baseline.due === 0 ||
          reviewsAdded >= reviewTarget ||
          (state.baseline.due > 0 && evidence.due === 0)
      if (complete) {
        source = introducing
          ? 'New cards were introduced after the Tutor session started.'
          : state.baseline.due === 0
            ? 'The review queue was already clear when the session started.'
            : `${reviewsAdded} review${reviewsAdded === 1 ? '' : 's'} completed after the Tutor session started.`
      }
    } else if (!complete && task.skill === 'curriculum') {
      complete = evidence.introducedToday > state.baseline.introducedToday
      if (complete) source = 'New lesson cards entered study after the session started.'
    } else if (!complete && task.skill === 'reading') {
      const chapterAfter = stamp(evidence.latestChapterReadAt) >= stamp(state.startedAt)
      complete =
        sessionMeetsEvidence(task, latestSession) ||
        evidence.chaptersRead > state.baseline.chaptersRead ||
        chapterAfter
      if (complete) {
        source = sessionMeetsEvidence(task, latestSession)
          ? 'A graded-reading result was logged after the session started.'
          : 'Local reading progress changed after the session started.'
      }
    } else if (!complete && sessionMeetsEvidence(task, latestSession)) {
      complete = true
      source = `${latestSession!.kind} evidence was logged after the session started.`
    }

    const weakness = repairFor(key, task, latestSession)

    return {
      key,
      task,
      complete,
      evidence: source,
      latestSession,
      weakness,
      repair: complete && weakness && !dismissed.has(weakness.key) ? weakness : null
    }
  })
}

export function tutorSessionDebrief(progress: TutorTaskProgress[]): TutorDebrief {
  const done = progress.filter((item) => item.complete)
  const scored = done
    .filter((item) => item.latestSession && item.latestSession.total > 0)
    .map((item) => ({
      label: item.task.title,
      score: Math.round((item.latestSession!.score / item.latestSession!.total) * 100)
    }))
    .sort((a, b) => b.score - a.score)
  const pendingRepair = progress.find((item) => item.repair)?.repair ?? null
  const pendingTask = progress.find((item) => !item.complete)?.task ?? null

  return {
    completed: done.length,
    total: progress.length,
    plannedMinutesCompleted: done.reduce((sum, item) => sum + item.task.minutes, 0),
    plannedMinutesTotal: progress.reduce((sum, item) => sum + item.task.minutes, 0),
    summary:
      done.length === progress.length
        ? 'The full study docket is complete. Stop adding material and let today consolidate.'
        : `${done.length} of ${progress.length} study blocks produced evidence. Unfinished blocks remain available without becoming debt.`,
    strongest: scored[0] ? `${scored[0].label}: ${scored[0].score}%` : null,
    tomorrowFocus: pendingRepair
      ? pendingRepair.title
      : pendingTask
        ? `Begin with ${pendingTask.title.toLowerCase()}`
        : 'Repeat the balanced loop and let new evidence choose the next repair.'
  }
}
