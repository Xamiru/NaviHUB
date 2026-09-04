import { useEffect, useRef, useState, type RefObject } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from './api'
import { qk } from './queryKeys'
import { mediaUrl } from '@shared/mediaUrl'
import { MEDIA_CONFIGS, statusesExceptPlanned } from './mediaConfig'
import type { SecretStorageState, SettingsMap } from '@shared/types'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function focusableWithin(root: HTMLElement): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)].filter((element) => {
    for (let current: HTMLElement | null = element; current && current !== root; current = current.parentElement) {
      const style = getComputedStyle(current)
      if (current.hidden || current.getAttribute('aria-hidden') === 'true') return false
      if (style.display === 'none' || style.visibility === 'hidden') return false
    }
    return true
  })
}

export function useSettings() {
  return useQuery<SettingsMap>({
    queryKey: qk.settings.values,
    queryFn: () => api.settings.all(),
    staleTime: 60_000
  })
}

export function useSecretStorage() {
  return useQuery<SecretStorageState>({
    queryKey: qk.settings.secretStorage,
    queryFn: () => api.settings.secretStorage(),
    staleTime: 60_000
  })
}

// Pure form of useStatuses for callers that already hold the settings map and
// need several types' lists in one place (e.g. HomePage derives per-type
// in-progress/completed/planned membership without one hook call per type).
export function statusesFrom(
  settings: SettingsMap | undefined,
  cfg: { statusesKey: string; defaultStatuses: string[] }
): string[] {
  const raw = settings?.[cfg.statusesKey]
  if (!raw) return cfg.defaultStatuses
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.length ? parsed : cfg.defaultStatuses
  } catch {
    return cfg.defaultStatuses
  }
}

// Reads a media type's configurable status list (settings key + fallback come
// from its MediaConfig), e.g. useStatuses(ANIME) or useStatuses(MOVIE).
export function useStatuses(cfg: { statusesKey: string; defaultStatuses: string[] }): string[] {
  const { data } = useSettings()
  return statusesFrom(data, cfg)
}

// Union of every media type's non-planned statuses — the "Watched" scope for
// the library-wide quizzes (character / VA / synopsis), where no single
// MediaConfig applies and each type names its own statuses.
export function useAllWatchedStatuses(): string[] {
  const { data } = useSettings()
  const out = new Set<string>()
  for (const cfg of MEDIA_CONFIGS) {
    for (const s of statusesExceptPlanned(statusesFrom(data, cfg))) out.add(s)
  }
  return [...out]
}

// The second configured status is the completed slot across every MediaConfig.
// Use positional meaning so renamed statuses remain safe for spoiler filters.
export function useAllCompletedStatuses(): string[] {
  const { data } = useSettings()
  const out = new Set<string>()
  for (const cfg of MEDIA_CONFIGS) {
    const completed = statusesFrom(data, cfg)[1]
    if (completed) out.add(completed)
  }
  return [...out]
}

// Modal dialog basics: Escape closes, focus moves into the panel on mount and
// returns to the opener on unmount. Attach the returned ref to the panel and
// give that element role="dialog" aria-modal="true" tabIndex={-1}. An inner
// autoFocus input wins the initial focus (autoFocus applies at commit, before
// effects run, so the contains() check defers to it).
export function useDialog(
  onClose: () => void,
  options: { initialFocus?: () => HTMLElement | null } = {}
) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef(onClose)
  const initialFocusRef = useRef(options.initialFocus)
  closeRef.current = onClose
  initialFocusRef.current = options.initialFocus
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    const panel = panelRef.current
    const initialFocus = initialFocusRef.current?.()
    if (initialFocus && panel?.contains(initialFocus)) initialFocus.focus()
    else if (panel && !panel.contains(document.activeElement)) panel.focus()

    function focusableElements(): HTMLElement[] {
      return panel ? focusableWithin(panel) : []
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopImmediatePropagation()
        closeRef.current()
        return
      }
      if (e.key !== 'Tab' || !panel) return
      const focusable = focusableElements()
      if (focusable.length === 0) {
        e.preventDefault()
        panel.focus()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && (document.activeElement === first || !panel.contains(document.activeElement))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (document.activeElement === last || !panel.contains(document.activeElement))) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => {
      window.removeEventListener('keydown', onKey, true)
      if (opener?.isConnected) opener.focus()
    }
  }, [])
  return panelRef
}

// Shared behavior for anchored, non-modal disclosures. Unlike useDialog this
// does not contain Tab focus. It closes on outside press and capture-phase
// Escape, can focus its first control, and optionally supplies menu navigation.
export function usePopover<TTrigger extends HTMLElement = HTMLButtonElement>(
  open: boolean,
  onClose: () => void,
  options: {
    initialFocus?: 'none' | 'first' | 'panel'
    navigation?: 'none' | 'menu'
    triggerRef?: RefObject<TTrigger>
  } = {}
) {
  const ownedTriggerRef = useRef<TTrigger>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = options.triggerRef ?? ownedTriggerRef
  const closeRef = useRef(onClose)
  const initialFocusRef = useRef(options.initialFocus ?? 'none')
  const navigationRef = useRef(options.navigation ?? 'none')
  closeRef.current = onClose
  initialFocusRef.current = options.initialFocus ?? 'none'
  navigationRef.current = options.navigation ?? 'none'

  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    panel?.setAttribute('data-player-shortcuts', 'suspend')
    const initialFocus = initialFocusRef.current
    if (panel && initialFocus === 'panel') panel.focus()
    if (panel && initialFocus === 'first') focusableWithin(panel)[0]?.focus()

    function onMouseDown(event: MouseEvent): void {
      const target = event.target as Node
      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return
      closeRef.current()
    }

    function onKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopImmediatePropagation()
        triggerRef.current?.focus()
        closeRef.current()
        return
      }
      if (navigationRef.current !== 'menu') return
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
      const items = [
        ...(panelRef.current?.querySelectorAll<HTMLElement>(
          '[role="menuitem"]:not([aria-disabled="true"])'
        ) ?? [])
      ]
      if (items.length === 0) return
      event.preventDefault()
      event.stopPropagation()
      const current = items.indexOf(document.activeElement as HTMLElement)
      const next =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? items.length - 1
            : event.key === 'ArrowDown'
              ? (current + 1 + items.length) % items.length
              : (current - 1 + items.length) % items.length
      items[next]?.focus()
    }

    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKeyDown, true)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKeyDown, true)
    }
  }, [open, triggerRef])

  return { panelRef, triggerRef }
}

export function useScoreMax(): number {
  const { data } = useSettings()
  const n = Number(data?.['score.max'])
  return Number.isFinite(n) && n > 0 ? n : 10
}

// Returns a copy of `value` that only updates after it stops changing for
// `delayMs`. Feed a search box's immediate state through this before it drives a
// query/IPC so fast typing collapses to one call instead of one per keystroke.
export function useDebouncedValue<T>(value: T, delayMs = 250): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(t)
  }, [value, delayMs])
  return debounced
}

// Incrementally reveals a large list: only the first `batch` items mount at
// first, and another batch is appended whenever the sentinel element nears the
// viewport (IntersectionObserver, 600px early). This is what keeps the browse
// grids from mounting thousands of image cards in one render — the Voice
// Actors page froze whole machines that way. Render the sentinel right after
// the grid: <div ref={sentinelRef} />. The observer re-arms after every
// append, so a deep restored scroll position keeps pulling batches until the
// content around it exists (navState's multi-frame scroll retry rides on that).
export function useIncrementalList<T>(items: T[], batch = 96) {
  const [count, setCount] = useState(batch)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  // A new result set (search/filter/sort change) starts over at one batch.
  useEffect(() => setCount(batch), [items, batch])

  const hasMore = count < items.length
  useEffect(() => {
    const el = sentinelRef.current
    if (!el || !hasMore) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setCount((c) => Math.min(c + batch, items.length))
        }
      },
      { rootMargin: '600px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [items, count, batch, hasMore])

  return { visible: hasMore ? items.slice(0, count) : items, sentinelRef, hasMore }
}

// Resolves a stored relative image path to a navimg:// URL the renderer can show.
// Synchronous and IPC-free: the navimg URL is a pure function of the path, so a
// grid of covers no longer fires one IPC round-trip (+ a re-render) per image.
// A missing-on-disk file no longer returns null here — callers that render the
// URL in an <img> should handle onError to fall back to a placeholder (see
// CoverImage). For local files where existence must be known up front (e.g.
// choosing local audio vs a remote stream), use useLocalFileUrl instead.
export function useImageUrl(relPath: string | null | undefined): string | null {
  return mediaUrl(relPath)
}

// Async, existence-checked resolution: returns null when the file is absent on
// disk (via the main process's existsSync guard). Use for local-vs-remote
// fallbacks — e.g. preferring a downloaded theme .ogg over streaming it — where
// a wrong local URL would fail to play instead of gracefully falling back.
export function useLocalFileUrl(relPath: string | null | undefined): string | null {
  const [url, setUrl] = useState<string | null>(null)
  useEffect(() => {
    let alive = true
    if (!relPath) {
      setUrl(null)
      return
    }
    api.files.resolveUrl(relPath).then((u) => {
      if (alive) setUrl(u)
    })
    return () => {
      alive = false
    }
  }, [relPath])
  return url
}
