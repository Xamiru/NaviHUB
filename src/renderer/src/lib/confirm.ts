// Promise-based replacement for the browser's native confirm().
//
// In Electron `window.confirm` is not a web dialog — it is a real OS modal
// window. It blocks the renderer's whole JS thread while open, and it takes
// keyboard focus away from the page; on Linux the page routinely does NOT get
// keyboard focus back when the modal closes, so typing goes nowhere until you
// click the window again. Every destructive action in the app went through one,
// which is what "I deleted something and then couldn't type for a while" was:
// it was never about music, it was about the confirm.
//
// This is the same tiny store shape as lib/toast.ts (no context, importable
// from anywhere): confirmDialog() parks a request and returns a promise that
// ConfirmHost resolves. No native window, so nothing ever takes focus off the
// page.

export interface ConfirmRequest {
  id: number
  message: string
  confirmLabel: string
  danger: boolean
}

interface PendingConfirm extends ConfirmRequest {
  resolve: (ok: boolean) => void
}

let nextId = 1
let queue: PendingConfirm[] = []
const listeners = new Set<() => void>()

function emit(): void {
  for (const l of listeners) l()
}

export function subscribeConfirm(fn: () => void): () => void {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

// The head of the queue is what's on screen. Returning the same object while it
// is unchanged keeps useSyncExternalStore happy.
export function getConfirm(): ConfirmRequest | null {
  return queue[0] ?? null
}

export function confirmDialog(
  message: string,
  opts: { confirmLabel?: string; danger?: boolean } = {}
): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    queue = [
      ...queue,
      {
        id: nextId++,
        message,
        confirmLabel: opts.confirmLabel ?? 'OK',
        danger: opts.danger ?? false,
        resolve
      }
    ]
    emit()
  })
}

// Answer the dialog on screen; anything queued behind it takes its place. A
// stale id (double-answered by both the click and the keydown) is a no-op, so
// the promise can never settle twice.
export function answerConfirm(id: number, ok: boolean): void {
  const req = queue.find((r) => r.id === id)
  if (!req) return
  queue = queue.filter((r) => r.id !== id)
  emit()
  req.resolve(ok)
}
