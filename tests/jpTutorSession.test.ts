import { describe, expect, it } from 'vitest'
import type { QuizHistory, QuizKind } from '../src/shared/types'
import type { TutorTask } from '../src/shared/japanese/tutor'
import {
  tutorSessionDebrief,
  tutorSessionProgress,
  type TutorSessionEvidence,
  type TutorSessionState
} from '../src/shared/japanese/tutorSession'

const tasks: TutorTask[] = [
  { skill: 'recall', title: 'Review', detail: '', minutes: 15, route: '/review', reason: '', priority: 'required' },
  { skill: 'listening', title: 'Listen', detail: '', minutes: 10, route: '/listen', reason: '', priority: 'recommended' },
  { skill: 'reading', title: 'Read', detail: '', minutes: 20, route: '/read', reason: '', priority: 'required' },
  { skill: 'output', title: 'Produce', detail: '', minutes: 10, route: '/output', reason: '', priority: 'recommended' },
  { skill: 'curriculum', title: 'Lesson', detail: '', minutes: 5, route: '/lesson', reason: '', priority: 'recommended' }
]

function state(patch: Partial<TutorSessionState> = {}): TutorSessionState {
  return {
    version: 1,
    day: '2026-08-30',
    startedAt: '2026-08-30T10:00:00.000Z',
    phaseId: 'bridge',
    tasks,
    baseline: { due: 12, reviewsToday: 4, introducedToday: 2, chaptersRead: 3 },
    manualCompleted: [],
    dismissedRepairs: [],
    endedAt: null,
    ...patch
  }
}

function history(kind: QuizKind, score: number, total: number, playedAt: string): QuizHistory {
  return {
    totalSessions: 1,
    bestStreak: 0,
    best: null,
    recent: [{ id: 7, kind, score, total, bestStreak: 0, settings: null, playedAt }]
  }
}

function evidence(patch: Partial<TutorSessionEvidence> = {}): TutorSessionEvidence {
  return {
    due: 12,
    reviewsToday: 4,
    introducedToday: 2,
    chaptersRead: 3,
    latestChapterReadAt: null,
    histories: {},
    ...patch
  }
}

describe('interactive Tutor session', () => {
  it('checks tasks off only from evidence created after the session started', () => {
    const before = tutorSessionProgress(
      state(),
      evidence({ histories: { listening: history('listening', 5, 5, '2026-08-30 09:59:59') } })
    )
    expect(before.every((item) => !item.complete)).toBe(true)

    const after = tutorSessionProgress(
      state(),
      evidence({
        reviewsToday: 14,
        introducedToday: 3,
        histories: {
          listening: history('listening', 4, 5, '2026-08-30 10:02:00'),
          jpOutput: history('jpOutput', 5, 6, '2026-08-30 10:30:00')
        }
      })
    )
    expect(after.map((item) => item.complete)).toEqual([true, true, false, true, true])
  })

  it('waits for introduction evidence when a clear queue prescribes new cards', () => {
    const current = state({
      baseline: { due: 0, reviewsToday: 4, introducedToday: 2, chaptersRead: 3 },
      tasks: [{ ...tasks[0], title: 'Introduce up to 5 new cards' }, ...tasks.slice(1)]
    })
    expect(tutorSessionProgress(current, evidence())[0].complete).toBe(false)
    expect(tutorSessionProgress(current, evidence({ introducedToday: 3 }))[0].complete).toBe(true)
  })

  it('recognizes local reading progress and supports an honest manual override', () => {
    const progress = tutorSessionProgress(
      state({ manualCompleted: ['4:curriculum'] }),
      evidence({ latestChapterReadAt: '2026-08-30 10:20:00' })
    )
    expect(progress[2]).toMatchObject({ complete: true })
    expect(progress[4]).toMatchObject({ complete: true, evidence: 'Marked complete by you.' })
  })

  it('interrupts with immediate remediation after a weak scored result', () => {
    const progress = tutorSessionProgress(
      state(),
      evidence({ histories: { listening: history('listening', 2, 5, '2026-08-30 10:05:00') } })
    )
    expect(progress[1].repair).toMatchObject({ skill: 'listening', score: 40, threshold: 75 })
  })

  it('does not let token evidence or an incomplete immersion log complete a full block', () => {
    const current = tutorSessionProgress(
      state(),
      evidence({
        reviewsToday: 5,
        histories: {
          jpImmersion: {
            totalSessions: 1,
            bestStreak: 0,
            best: null,
            recent: [
              {
                id: 9,
                kind: 'jpImmersion',
                score: 4,
                total: 5,
                bestStreak: 0,
                settings: { passes: ['cold'], retellLength: 12 },
                playedAt: '2026-08-30 10:05:00'
              }
            ]
          }
        }
      })
    )
    expect(current[0].complete).toBe(false)
    expect(current[1].complete).toBe(false)
  })

  it('dismisses a repair by its stable session key without erasing completion', () => {
    const first = tutorSessionProgress(
      state(),
      evidence({ histories: { jpOutput: history('jpOutput', 3, 6, '2026-08-30 10:05:00') } })
    )
    const key = first[3].repair!.key
    const dismissed = tutorSessionProgress(
      state({ dismissedRepairs: [key] }),
      evidence({ histories: { jpOutput: history('jpOutput', 3, 6, '2026-08-30 10:05:00') } })
    )
    expect(dismissed[3]).toMatchObject({ complete: true, repair: null })
  })

  it('builds a daily debrief from completed evidence rather than claimed study time', () => {
    const progress = tutorSessionProgress(
      state({ manualCompleted: ['2:reading'] }),
      evidence({
        reviewsToday: 14,
        introducedToday: 3,
        histories: {
          listening: history('listening', 5, 5, '2026-08-30 10:05:00'),
          jpOutput: history('jpOutput', 5, 6, '2026-08-30 10:30:00')
        }
      })
    )
    expect(tutorSessionDebrief(progress)).toMatchObject({
      completed: 5,
      total: 5,
      plannedMinutesCompleted: 60,
      plannedMinutesTotal: 60,
      strongest: 'Listen: 100%'
    })
  })
})
