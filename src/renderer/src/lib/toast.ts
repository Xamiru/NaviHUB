// Tiny toast store (no context needed): toast() pushes a message, the Toaster
// component subscribes via useSyncExternalStore. Used as the app-wide error
// surface — query failures and unhandled IPC rejections land here (see
// main.tsx) instead of dying silently in the console.

export interface Toast {
  id: number
  message: string
  kind: 'error' | 'warning' | 'success' | 'unlock'
  // 'unlock' only: the achievement's art and the game it belongs to. The OS
  // notification is raised from main (it has to reach a fullscreen game); this
  // is the in-app half, for when NaviHUB is what the user is looking at.
  iconUrl?: string | null
  sub?: string | null
  action?: { label: string; route: string }
}

const DISMISS_MS = 6000

interface ToastTimer {
  handle: ReturnType<typeof setTimeout>
  remaining: number
  startedAt: number
  paused: boolean
}

let nextId = 1
let toasts: Toast[] = []
const listeners = new Set<() => void>()
const timers = new Map<number, ToastTimer>()

function emit(): void {
  for (const l of listeners) l()
}

export function subscribeToasts(fn: () => void): () => void {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function getToasts(): Toast[] {
  return toasts
}

export function dismissToast(id: number): void {
  const timer = timers.get(id)
  if (timer) clearTimeout(timer.handle)
  timers.delete(id)
  toasts = toasts.filter((t) => t.id !== id)
  emit()
}

function scheduleDismiss(id: number, remaining = DISMISS_MS): void {
  const startedAt = Date.now()
  const handle = setTimeout(() => dismissToast(id), remaining)
  timers.set(id, { handle, remaining, startedAt, paused: false })
}

export function pauseToast(id: number): void {
  const timer = timers.get(id)
  if (!timer || timer.paused) return
  clearTimeout(timer.handle)
  timers.set(id, {
    ...timer,
    remaining: Math.max(0, timer.remaining - (Date.now() - timer.startedAt)),
    paused: true
  })
}

export function resumeToast(id: number): void {
  const timer = timers.get(id)
  if (!timer || !timer.paused || !toasts.some((item) => item.id === id)) return
  scheduleDismiss(id, timer.remaining)
}

export function toast(
  message: string,
  kind: Toast['kind'] = 'error',
  action?: Toast['action']
): void {
  // A repeated message refreshes the existing toast instead of stacking dupes
  // (e.g. several queries failing with the same IPC error at once).
  const existing = toasts.find((t) => t.message === message && t.kind === kind)
  if (existing) {
    dismissToast(existing.id)
  }
  const id = nextId++
  toasts = [...toasts, { id, message, kind, action }]
  emit()
  scheduleDismiss(id)
}

// An achievement unlock, shown with its art. Never deduped by message the way
// toast() is — two achievements can legitimately share a name across games.
export function toastUnlock(message: string, sub: string | null, iconUrl: string | null): void {
  const id = nextId++
  toasts = [...toasts, { id, message, kind: 'unlock', sub, iconUrl }]
  emit()
  scheduleDismiss(id)
}

// Electron wraps errors thrown by ipcMain.handle as
// "Error invoking remote method 'media:create': Error: <the real message>" —
// strip that prefix so toasts show the message the main process actually threw.
export function toastError(err: unknown): void {
  const raw = err instanceof Error ? err.message : String(err)
  const message = raw.replace(/^Error invoking remote method '[^']+':\s*(Error:\s*)?/, '').trim()
  toast(message || 'Something went wrong', 'error')
}
