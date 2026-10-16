import { parseJlptLevel, type JlptLevel } from '../jlptLevels'
import type { TutorPhaseId } from './tutor'

// Which Tutor phase a course belongs to. Built-in courses are mapped by their
// frozen seed key (japaneseSeed.ts ALL_PACKS), so steps can be renumbered or
// new courses slotted in without the phases drifting; a course the user made
// falls back to its JLPT level label.
export const SEED_COURSE_PHASE: Readonly<Record<string, TutorPhaseId>> = {
  n5: 'foundation',
  radicals: 'foundation',
  kanji: 'foundation',
  casual: 'bridge',
  setphrases: 'bridge',
  counters: 'bridge',
  n4: 'bridge',
  n4b: 'bridge',
  n4vocab: 'bridge',
  n4kanji: 'bridge',
  sfx: 'immersion',
  casual2: 'immersion',
  vnslang: 'immersion',
  n3: 'immersion',
  n3b: 'immersion',
  n3c: 'immersion',
  n3vocab: 'immersion',
  n3kanji: 'immersion',
  speech: 'immersion',
  n2a: 'independent',
  n2b: 'independent',
  n2c: 'independent',
  n2d: 'independent',
  n2vocab: 'independent',
  n2kanji: 'independent',
  idioms: 'independent',
  n1a: 'advanced',
  n1b: 'advanced',
  n1c: 'advanced',
  n1d: 'advanced',
  n1vocab: 'advanced',
  n1kanji: 'advanced'
}

const LEVEL_PHASE: Record<JlptLevel, TutorPhaseId> = {
  N5: 'foundation',
  N4: 'bridge',
  N3: 'immersion',
  N2: 'independent',
  N1: 'advanced'
}

// User courses without a level label fall back to their study-order step on
// the original 26-step path (the mapping the Tutor used before seed keys).
function phaseForStep(step: number): TutorPhaseId {
  if (step <= 3) return 'foundation'
  if (step <= 9) return 'bridge'
  if (step <= 17) return 'immersion'
  if (step <= 22) return 'independent'
  return 'advanced'
}

export function coursePhase(course: {
  seedKey: string | null
  level: string | null
  difficulty?: number | null
}): TutorPhaseId | null {
  if (course.seedKey && SEED_COURSE_PHASE[course.seedKey]) return SEED_COURSE_PHASE[course.seedKey]
  const level = parseJlptLevel(course.level)
  if (level) return LEVEL_PHASE[level]
  return course.difficulty != null ? phaseForStep(course.difficulty) : null
}
