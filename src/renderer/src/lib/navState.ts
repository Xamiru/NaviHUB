import { useCallback, useContext, useEffect, useLayoutEffect, useState, type RefObject } from 'react'
import {
  UNSAFE_NavigationContext,
  useLocation,
  useNavigate,
  useNavigationType,
  type Navigator
} from 'react-router-dom'
import { TabHistory } from './tabHistory'

// In-memory snapshot store, keyed by `${history-entry key}:${name}`. Each entry
// in the browser history has a unique, stable `location.key`, so going back
// restores the exact key the page had when you left it — and with it, its UI
// state. Lives for the session (cleared on full reload), which is all that
// back/forward restoration needs.
const store = new Map<string, unknown>()
const MAX_STORE_ENTRIES = 2000

function storeValue(key: string, value: unknown): void {
  store.delete(key)
  store.set(key, value)
  while (store.size > MAX_STORE_ENTRIES) {
    const oldest = store.keys().next().value
    if (oldest === undefined) break
    store.delete(oldest)
  }
}

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
        storeValue(storeKey, resolved)
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
      storeValue(`${key}:scroll`, el.scrollTop)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [key, ref])

  // On entry change: restore on POP (back/forward, or a browser tab brought back
  // to the front), else jump to top. Content often loads a little later
  // (react-query; a tab idle past gcTime refetches), so retry across frames
  // until the target is reachable — and stop the moment the user scrolls.
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const saved = store.get(`${key}:scroll`)
    if (navType === 'POP' && typeof saved === 'number') {
      let frame = 0
      let handle = 0
      const stop = (): void => {
        cancelAnimationFrame(handle)
        el.removeEventListener('wheel', stop)
        el.removeEventListener('pointerdown', stop)
        el.removeEventListener('keydown', stop)
      }
      const restore = (): void => {
        el.scrollTop = saved
        if (++frame < 150 && Math.abs(el.scrollTop - saved) > 1) handle = requestAnimationFrame(restore)
        else stop()
      }
      el.addEventListener('wheel', stop, { passive: true })
      el.addEventListener('pointerdown', stop)
      el.addEventListener('keydown', stop)
      handle = requestAnimationFrame(restore)
      return stop
    } else {
      el.scrollTop = 0
    }
    // navType intentionally omitted: it can lag the key; key change is the trigger.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
}

// The active browser tab's own history (lib/tabHistory.ts). A page rendered
// under any other router (a test's MemoryRouter) has none.
function tabHistoryOf(navigator: Navigator): TabHistory | null {
  return navigator instanceof TabHistory ? navigator : null
}

// Whether this tab has an earlier entry to go back to. Read at call time, so a
// click handler never acts on a stale position.
export function useCanGoBack(): () => boolean {
  const { navigator } = useContext(UNSAFE_NavigationContext)
  return useCallback(() => tabHistoryOf(navigator)?.canGoBack ?? false, [navigator])
}

// Leaves a page whose subject was just deleted: back to the nearest earlier
// entry that still exists (so Back afterwards never revisits the deleted page
// or lands on a duplicate), or — with no such entry — replace it with `fallback`.
export function useLeaveDeleted(): (gone: (pathname: string) => boolean, fallback: string) => void {
  const navigate = useNavigate()
  const { navigator } = useContext(UNSAFE_NavigationContext)
  return useCallback(
    (gone, fallback) => {
      const tab = tabHistoryOf(navigator)
      if (tab) {
        for (let i = tab.index - 1; i >= 0; i--) {
          if (!gone(tab.entries[i].pathname)) {
            navigate(i - tab.index)
            return
          }
        }
      }
      navigate(fallback, { replace: true })
    },
    [navigate, navigator]
  )
}
