import { describe, expect, it } from 'vitest'
import {
  buildTutorPlan,
  historyEvidence,
  tutorPhase,
  type TutorEvidence
} from '../src/shared/japanese/tutor'
import { coursePhase } from '../src/shared/japanese/coursePhases'

function evidence(patch: Partial<TutorEvidence> = {}): TutorEvidence {
  return {
    due: 12,
    unseen: 0,
    introducedToday: 4,
    dailyTarget: 10,
    frontierPhase: 'bridge',
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
  it('alternates new material between the next lesson and the deck tracks', () => {
    const deckStep = { title: 'Build your next core word deck', detail: 'd', route: '/japanese/roadmap' }
    const nextLesson = { id: 3, title: 'Particles' }
    const last = (patch: Partial<TutorEvidence>) => buildTutorPlan(evidence(patch)).tasks.at(-1)!
    // Weakness-free evidence so the last slot is new material, not a repair block.
    const calm = { phonology: { sessions: 8, accuracy: 95 }, strictRetention30: 95 }
    expect(last({ ...calm, nextLesson, deckStep, deckDay: false }).title).toBe('Read the next lesson')
    expect(last({ ...calm, nextLesson, deckStep, deckDay: true }).title).toBe(deckStep.title)
    // With no course lesson left, the deck step takes every day.
    expect(last({ ...calm, nextLesson: null, deckStep, deckDay: false }).title).toBe(deckStep.title)
    // Unseen cards waiting: no new material of either kind.
    expect(last({ ...calm, unseen: 12, nextLesson, deckStep, deckDay: true }).title).toBe('Hold the next lesson')
  })

  it('maps the stepped curriculum onto five honest phases', () => {
    // Built-in courses map by seed key, so renumbering steps cannot move a phase.
    expect(coursePhase({ seedKey: 'n5', level: 'N5' })).toBe('foundation')
    expect(coursePhase({ seedKey: 'casual', level: 'N5–N4' })).toBe('bridge')
    expect(coursePhase({ seedKey: 'sfx', level: 'N5+' })).toBe('immersion')
    expect(coursePhase({ seedKey: 'idioms', level: 'N3–N2' })).toBe('independent')
    expect(coursePhase({ seedKey: 'n1kanji', level: 'N1' })).toBe('advanced')
    // A user course falls back to its level label, or to nothing.
    expect(coursePhase({ seedKey: null, level: 'N3' })).toBe('immersion')
    expect(coursePhase({ seedKey: null, level: 'my notes', difficulty: 20 })).toBe('independent')
    expect(coursePhase({ seedKey: null, level: null })).toBeNull()
    expect(tutorPhase('bridge').title).toBe('Controlled reading bridge')
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
    const plan = buildTutorPlan(evidence({ frontierPhase: 'immersion' }))
    expect(plan.tasks.find((task) => task.skill === 'listening')?.route).toBe('/japanese/immersion')
  })

  it('holds lessons while unseen cards remain without removing the route', () => {
    const plan = buildTutorPlan(evidence({ unseen: 17, phonology: { sessions: 0, accuracy: null } }))
    expect(plan.lessonHeld).toBe(true)
    // An untried skill is named for the plan page but never becomes a repair block.
    expect(plan.weakness).toMatchObject({ skill: 'sound', score: null })
    expect(plan.tasks.at(-1)).toMatchObject({ skill: 'curriculum', priority: 'optional' })
  })

  it('adds a repair block only for a measured weak result', () => {
    const plan = buildTutorPlan(evidence({ phonology: { sessions: 4, accuracy: 50 } }))
    expect(plan.tasks.at(-1)).toMatchObject({
      skill: 'sound',
      route: '/japanese/phonology',
      minutes: 5
    })
  })

  it('keeps the loop order and drops later blocks for shorter budgets', () => {
    const skills = (budgetMinutes: 10 | 20 | 40 | 60) =>
      buildTutorPlan(evidence({ budgetMinutes })).tasks.map((task) => [task.skill, task.minutes])
    expect(skills(10)).toEqual([['recall', 10]])
    expect(skills(20)).toEqual([['recall', 10], ['reading', 10]])
    expect(skills(40)).toEqual([['recall', 15], ['listening', 10], ['reading', 15]])
    expect(buildTutorPlan(evidence({ budgetMinutes: 60 })).totalMinutes).toBe(60)
    for (const budgetMinutes of [10, 20, 40, 60] as const) {
      expect(buildTutorPlan(evidence({ budgetMinutes })).totalMinutes).toBe(budgetMinutes)
    }
  })

  it('alternates the twenty-minute second block toward the less practised skill', () => {
    const plan = buildTutorPlan(
      evidence({ budgetMinutes: 20, listening: { sessions: 2, accuracy: 82 }, reading: { sessions: 9, accuracy: 80 } })
    )
    expect(plan.tasks.map((task) => task.skill)).toEqual(['recall', 'listening'])
  })

  it('starts a brand-new learner with kana and the sound system', () => {
    const fresh = evidence({
      due: 0,
      unseen: 0,
      frontierPhase: 'foundation',
      totalReviews: 0,
      kanaNeeded: true,
      nextLesson: { id: 5, title: 'Greetings' }
    })
    expect(buildTutorPlan({ ...fresh, budgetMinutes: 10 }).tasks.map((t) => t.route)).toEqual([
      '/japanese/kana'
    ])
    expect(buildTutorPlan({ ...fresh, budgetMinutes: 20 }).tasks.map((t) => t.skill)).toEqual([
      'kana',
      'sound'
    ])
    expect(buildTutorPlan({ ...fresh, budgetMinutes: 40 }).tasks.at(-1)).toMatchObject({
      skill: 'lesson',
      route: '/japanese/lessons/5'
    })
  })

  it('opens with the next lesson when there is nothing to review yet', () => {
    const plan = buildTutorPlan(
      evidence({
        due: 0,
        unseen: 0,
        frontierPhase: 'foundation',
        totalReviews: 0,
        budgetMinutes: 20,
        nextLesson: { id: 9, title: 'Particles' }
      })
    )
    expect(plan.tasks.map((task) => [task.skill, task.title])).toEqual([
      ['lesson', 'Learn: Particles'],
      ['recall', 'Introduce up to 10 new cards'],
      // No known words yet, so the listening slot uses the sound-system units.
      ['sound', 'One sound-system unit']
    ])
    expect(plan.totalMinutes).toBe(20)
  })

  it('reads graded passages instead of native media during the foundation phase', () => {
    const plan = buildTutorPlan(evidence({ frontierPhase: 'foundation' }))
    expect(plan.tasks.find((task) => task.skill === 'reading')?.route).toBe('/japanese/reading')
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
        frontierPhase: 'immersion',
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
