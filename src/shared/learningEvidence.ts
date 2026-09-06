// Frozen setting prefix: personal learning evidence is removed from shared exports.
export const LEARNING_EVIDENCE_PREFIX = 'learning.evidence.v1.'
export const TRANSFER_DELAY_MS = 24 * 60 * 60 * 1000

export interface LearningExercise {
  id: string
  prompt: string
  answers: string[]
  explanation: string
}

export interface LearningUnit {
  id: string
  title: string
  body: string
  practice: LearningExercise[]
  transfer: LearningExercise[]
}

export interface LearningAttempt {
  at: string
  completed: boolean
  mode: 'practice' | 'transfer'
  score: number
  total: number
  assisted: boolean
  // Identifies the authored form; a repeat of a revealed form is not unseen evidence.
  exerciseIds: string[]
}

export interface ProjectEvidence {
  at: string
  note: string
  criteria: string[]
}

export interface LearningRecord {
  attempts: LearningAttempt[]
  exposedIds?: string[]
  project?: ProjectEvidence
}

export function learningSettingKey(domain: 'programming' | 'english' | 'japanese', id: string): string {
  return `${LEARNING_EVIDENCE_PREFIX}${domain}.${id}`
}

export function parseLearningRecord(raw: string | undefined): LearningRecord {
  try {
    const value = JSON.parse(raw ?? '{}')
    if (!value || typeof value !== 'object') return { attempts: [] }
    const attempts = (Array.isArray(value.attempts) ? value.attempts : []).filter(
      (a: LearningAttempt) => a && Number.isFinite(Date.parse(a.at)) &&
        (a.mode === 'practice' || a.mode === 'transfer') &&
        Number.isInteger(a.score) && Number.isInteger(a.total) &&
        a.total > 0 && a.score >= 0 && a.score <= a.total &&
        typeof a.assisted === 'boolean' && typeof a.completed === 'boolean' && Array.isArray(a.exerciseIds) &&
        a.exerciseIds.every((id) => typeof id === 'string')
    ).slice(-50)
    const p = value.project
    const project = p && Number.isFinite(Date.parse(p.at)) && typeof p.note === 'string' &&
      Array.isArray(p.criteria) && p.criteria.every((c: unknown) => typeof c === 'string')
      ? { at: p.at, note: p.note.slice(0, 4000), criteria: p.criteria } : undefined
    const exposedIds = Array.isArray(value.exposedIds)
      ? value.exposedIds.filter((id: unknown): id is string => typeof id === 'string') : []
    return { attempts, project, exposedIds }
  } catch {
    return { attempts: [] }
  }
}

// Only typography/whitespace are normalized. Code case and punctuation can carry meaning.
export function matchesLearningAnswer(answer: string, accepted: readonly string[]): boolean {
  const normalize = (value: string) => value.normalize('NFKC').trim().replace(/\s+/g, ' ')
  return accepted.some((value) => normalize(value) === normalize(answer))
}

export function transferDueAt(record: LearningRecord): number | null {
  const practice = record.attempts.filter((a) => a.completed && a.mode === 'practice' && a.score === a.total)
  if (!practice.length) return null
  const lastPractice = Math.max(...practice.map((a) => Date.parse(a.at)))
  const lastTransfer = Math.max(0, ...record.attempts.filter((a) => a.mode === 'transfer').map((a) => Date.parse(a.at)))
  return Math.max(lastPractice, lastTransfer) + TRANSFER_DELAY_MS
}

export function hasIndependentTransfer(record: LearningRecord): boolean {
  return record.attempts.some((a) => a.completed && a.mode === 'transfer' && !a.assisted && a.score === a.total)
}

export function unusedTransferExercises(unit: LearningUnit, record: LearningRecord): LearningExercise[] {
  const seen = new Set([...(record.exposedIds ?? []), ...record.attempts.flatMap((a) => a.exerciseIds)])
  return unit.transfer.filter((exercise) => !seen.has(exercise.id))
}
