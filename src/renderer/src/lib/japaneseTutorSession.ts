import { useEffect, useState } from 'react'
import type { TutorPlan } from '@shared/japanese/tutor'
import type { TutorSessionBaseline, TutorSessionState } from '@shared/japanese/tutorSession'

const STORAGE_KEY = 'japanese.tutorSession.v1'
const CHANGE_EVENT = 'japanese-tutor-session'

function localDay(date = new Date()): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function validState(value: unknown): value is TutorSessionState {
  if (!value || typeof value !== 'object') return false
  const state = value as Partial<TutorSessionState>
  return (
    state.version === 1 &&
    typeof state.day === 'string' &&
    typeof state.startedAt === 'string' &&
    Array.isArray(state.tasks) &&
    !!state.baseline &&
    Array.isArray(state.manualCompleted) &&
    Array.isArray(state.dismissedRepairs)
  )
}

export function loadTutorSession(includeEnded = true): TutorSessionState | null {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null')
    if (!validState(parsed) || parsed.day !== localDay()) return null
    if (!includeEnded && parsed.endedAt) return null
    return parsed
  } catch {
    return null
  }
}

export function saveTutorSession(state: TutorSessionState | null): void {
  if (state) localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  else localStorage.removeItem(STORAGE_KEY)
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export function startTutorSession(
  plan: TutorPlan,
  baseline: TutorSessionBaseline
): TutorSessionState {
  const state: TutorSessionState = {
    version: 1,
    day: localDay(),
    startedAt: new Date().toISOString(),
    phaseId: plan.phase.id,
    tasks: plan.tasks,
    baseline,
    manualCompleted: [],
    dismissedRepairs: [],
    endedAt: null
  }
  saveTutorSession(state)
  return state
}

export function updateTutorSession(
  change: (state: TutorSessionState) => TutorSessionState
): TutorSessionState | null {
  const current = loadTutorSession()
  if (!current) return null
  const next = change(current)
  saveTutorSession(next)
  return next
}

export function useTutorSessionState(includeEnded = true): TutorSessionState | null {
  const [state, setState] = useState<TutorSessionState | null>(() => loadTutorSession(includeEnded))

  useEffect(() => {
    const sync = (): void => setState(loadTutorSession(includeEnded))
    window.addEventListener(CHANGE_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [includeEnded])

  return state
}
