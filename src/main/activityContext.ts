import { AsyncLocalStorage } from 'node:async_hooks'

// Cancellation context for button-triggered activity work. AsyncLocalStorage
// keeps concurrent imports isolated: an AniList stop must never abort a TMDB
// request that happened to start while the first import was still running.
const activitySignal = new AsyncLocalStorage<AbortSignal>()

export function runWithActivitySignal<T>(signal: AbortSignal, fn: () => Promise<T>): Promise<T> {
  return activitySignal.run(signal, fn)
}

export function currentActivitySignal(): AbortSignal | undefined {
  return activitySignal.getStore()
}
