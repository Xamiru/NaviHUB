import type { ActivityStatus } from '@shared/types'

// One global slot for the current long-running main-process activity (an
// import, a theme-song fetch). The renderer polls `activity:status` — the
// app's convention for progress (no push events). Single-user app: activities
// don't overlap in practice; a second begin simply takes over the slot.
const state: ActivityStatus = { active: false, label: '', phase: 'fetching', done: 0, total: 0 }

export function getActivity(): ActivityStatus {
  return { ...state }
}

export function beginActivity(label: string): void {
  Object.assign(state, { active: true, label, phase: 'fetching', done: 0, total: 0 })
}

export function updateActivity(
  patch: Partial<Pick<ActivityStatus, 'phase' | 'done' | 'total'>>
): void {
  if (state.active) Object.assign(state, patch)
}

// Called by files.downloadImages after every finished image, so every importer
// gets image-download progress for free (it's the long phase of an import).
export function imageProgress(done: number, total: number): void {
  if (state.active) Object.assign(state, { phase: 'images', done, total })
}

export function endActivity(): void {
  Object.assign(state, { active: false, label: '', phase: 'fetching', done: 0, total: 0 })
}

// Wraps a long-running task in begin/end so the ipc.ts handlers stay
// one-liners and the slot can never be left dangling on a throw.
export async function withActivity<T>(label: string, fn: () => Promise<T>): Promise<T> {
  beginActivity(label)
  try {
    return await fn()
  } finally {
    endActivity()
  }
}
