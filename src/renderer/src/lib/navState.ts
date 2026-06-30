import { useCallback, useEffect, useLayoutEffect, useState, type RefObject } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

// In-memory snapshot store, keyed by `${history-entry key}:${name}`. Each entry
// in the browser history has a unique, stable `location.key`, so going back
// restores the exact key the page had when you left it — and with it, its UI
// state. Lives for the session (cleared on full reload), which is all that
// back/forward restoration needs.
const store = new Map<string, unknown>()

// Drop-in replacement for useState whose value survives back/forward navigation.
// Pass a unique `name` per piece of state on a page (e.g. 'castPage', 'search').
// Returning to a page via the back button restores the value it had on leaving;
// navigating forward to a fresh page starts from `initial` (new history key).
export function usePersistedState<T>(name: string, initial: T) {
  const { key } = useLocation()
  const storeKey = `${key}:${name}`
  const [value, setValue] = useState<T>(() =>
    store.has(storeKey) ? (store.get(storeKey) as T) : initial
  )
  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? (next as (p: T) => T)(prev) : next
        store.set(storeKey, resolved)
        return resolved
      })
    },
    [storeKey]
  )
  return [value, set] as const
}

// Restores the scroll position of a container on back/forward, and resets it to
// the top when navigating forward to a new page. Attach the ref to the app's
// single persistent scroll container.
export function useScrollRestoration(ref: RefObject<HTMLElement | null>): void {
  const { key } = useLocation()
  const navType = useNavigationType()

  // Continuously record the live scroll position under the current entry's key.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = (): void => {
      store.set(`${key}:scroll`, el.scrollTop)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [key, ref])

  // On entry change: restore on POP (back/forward), else jump to top. Content
  // often loads a frame or two later (react-query), so retry across frames
  // until the target is reachable.
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const saved = store.get(`${key}:scroll`)
    if (navType === 'POP' && typeof saved === 'number') {
      let frame = 0
      const restore = (): void => {
        el.scrollTop = saved
        if (++frame < 60 && Math.abs(el.scrollTop - saved) > 1) requestAnimationFrame(restore)
      }
      requestAnimationFrame(restore)
    } else {
      el.scrollTop = 0
    }
    // navType intentionally omitted: it can lag the key; key change is the trigger.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
}
