// Spaces the START of requests to one API across every caller in the process:
// a bulk run, a library refresh and a dialog import all draw from the same
// budget, so running them together can no longer multiply the request rate.
// Reservation-based — each caller books the next free slot before waiting —
// so concurrent callers queue in order instead of all firing when a gap opens.

export interface Throttle {
  // An aborted signal ends the wait early; the booked slot stays spent.
  take(signal?: AbortSignal): Promise<void>
  // Test seam: 0 disables spacing so importer tests stay instant.
  intervalMs: number
}

export function createThrottle(
  intervalMs: number,
  deps: { now?: () => number; wait?: (ms: number, signal?: AbortSignal) => Promise<void> } = {}
): Throttle {
  const now = deps.now ?? (() => Date.now())
  const wait = deps.wait ?? abortableWait
  let next = 0
  const throttle: Throttle = {
    intervalMs,
    async take(signal) {
      if (throttle.intervalMs <= 0) return
      const t = now()
      const at = Math.max(t, next)
      next = at + throttle.intervalMs
      if (at > t) await wait(at - t, signal)
    }
  }
  return throttle
}

function abortableWait(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise<void>((resolve) => {
    if (signal?.aborted) return resolve()
    const timer = setTimeout(done, ms)
    function done(): void {
      clearTimeout(timer)
      signal?.removeEventListener('abort', done)
      resolve()
    }
    signal?.addEventListener('abort', done, { once: true })
  })
}
