import { describe, expect, it } from 'vitest'
import {
  buildTutorPlan,
  historyEvidence,
  tutorPhaseForStep,
  type TutorEvidence
} from '../src/shared/japanese/tutor'

function evidence(patch: Partial<TutorEvidence> = {}): TutorEvidence {
  return {
    due: 12,
    unseen: 0,
    introducedToday: 4,
    dailyTarget: 10,
    frontierStep: 8,
    strictRetention30: 87,
    phonology: { sessions: 8, accuracy: 90 },
    listening: { sessions: 12, accuracy: 82 },
    immersion: { sessions: 0, accuracy: null },
    reading: { sessions: 10, accuracy: 80 },
    output: { sessions: 5, accuracy: 75 },
    chaptersRead: 3,
    hasReadingMedia: true,
    hasListeningMedia: true,
    readingRoute: '/manga/42',
    ...patch
  }
}

describe('Japanese Tutor plan', () => {
  it('maps the stepped curriculum onto five honest phases', () => {
    expect(tutorPhaseForStep(1).id).toBe('foundation')
    expect(tutorPhaseForStep(4).id).toBe('bridge')
    expect(tutorPhaseForStep(10).id).toBe('immersion')
    expect(tutorPhaseForStep(18).id).toBe('independent')
    expect(tutorPhaseForStep(26).id).toBe('advanced')
  })

  it('prescribes a balanced sixty-minute loop and local media routes', () => {
    const plan = buildTutorPlan(evidence())
    expect(plan.totalMinutes).toBe(60)
    expect(plan.tasks.map((task) => task.skill)).toEqual([
      'recall',
      'listening',
      'reading',
      'output',
      'curriculum'
    ])
    expect(plan.tasks.find((task) => task.skill === 'listening')?.route).toBe('/japanese/listen')
    expect(plan.tasks.find((task) => task.skill === 'reading')?.route).toBe('/manga/42')
    expect(plan.tasks.find((task) => task.skill === 'output')?.route).toBe('/japanese/roleplay')
  })

  it('moves listening into local-media immersion from step ten', () => {
    const plan = buildTutorPlan(evidence({ frontierStep: 12 }))
    expect(plan.tasks.find((task) => task.skill === 'listening')?.route).toBe('/japanese/immersion')
  })

  it('holds lessons while unseen cards remain without removing the route', () => {
    const plan = buildTutorPlan(evidence({ unseen: 17, phonology: { sessions: 0, accuracy: null } }))
    expect(plan.lessonHeld).toBe(true)
    expect(plan.tasks.at(-1)).toMatchObject({
      skill: 'sound',
      route: '/japanese/phonology'
    })
  })

  it('turns missing or weak evidence into a named remediation target', () => {
    const missing = buildTutorPlan(
      evidence({
        due: 0,
        strictRetention30: 90,
        phonology: { sessions: 5, accuracy: 85 },
        listening: { sessions: 5, accuracy: 80 },
        reading: { sessions: 0, accuracy: null },
        output: { sessions: 5, accuracy: 80 }
      })
    )
    expect(missing.weakness).toMatchObject({ skill: 'reading', route: '/japanese/reading' })

    const weak = buildTutorPlan(evidence({ listening: { sessions: 10, accuracy: 42 } }))
    expect(weak.weakness).toMatchObject({ skill: 'listening', score: 42 })
  })

  it('uses long-form evidence after the immersion bridge and does not mistake unsampled retention for a repair', () => {
    const plan = buildTutorPlan(
      evidence({
        frontierStep: 12,
        strictRetention30: null,
        phonology: { sessions: 5, accuracy: 90 },
        listening: { sessions: 10, accuracy: 90 },
        immersion: { sessions: 3, accuracy: 40 }
      })
    )
    expect(plan.weakness).toMatchObject({
      label: 'Long-form listening',
      score: 40,
      route: '/japanese/immersion'
    })
  })

  it('summarizes recent scored sessions rather than trusting one personal best', () => {
    expect(
      historyEvidence({
        totalSessions: 3,
        bestStreak: 0,
        best: null,
        recent: [
          { id: 1, kind: 'listening', score: 4, total: 5, bestStreak: 0, settings: null, playedAt: '' },
          { id: 2, kind: 'listening', score: 6, total: 10, bestStreak: 0, settings: null, playedAt: '' },
          { id: 3, kind: 'listening', score: 0, total: 0, bestStreak: 0, settings: null, playedAt: '' }
        ]
      }).accuracy
    ).toBe(67)
  })
})
