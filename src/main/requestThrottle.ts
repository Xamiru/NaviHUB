// Spaces the START of requests to one API across every caller in the process:
// a bulk run, a library refresh and a dialog import all draw from the same
// budget, so running them together can no longer multiply the request rate.
// Reservation-based — each caller books the next free slot before waiting —
// so concurrent callers queue in order instead of all firing when a gap opens.

export interface Throttle {
  take(): Promise<void>
  // Test seam: 0 disables spacing so importer tests stay instant.
  intervalMs: number
}

export function createThrottle(
  intervalMs: number,
  deps: { now?: () => number; wait?: (ms: number) => Promise<void> } = {}
): Throttle {
  const now = deps.now ?? (() => Date.now())
  const wait = deps.wait ?? ((ms: number) => new Promise<void>((r) => setTimeout(r, ms)))
  let next = 0
  const throttle: Throttle = {
    intervalMs,
    async take() {
      if (throttle.intervalMs <= 0) return
      const t = now()
      const at = Math.max(t, next)
      next = at + throttle.intervalMs
      if (at > t) await wait(at - t)
    }
  }
  return throttle
}
