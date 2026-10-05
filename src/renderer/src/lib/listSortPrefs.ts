import type { MediaSort } from '@shared/types'

// The library list's sort choice, remembered per media type across sessions —
// the jp.keyboardPrefs localStorage idiom. usePersistedState is
// per-history-entry, which is right for a search box but wrong here: every
// fresh visit to a library snapped back to 'updated' no matter what the user
// had picked. Whichever sort you leave a library on IS its default now.
//
// One blob keyed by scope (the media type) rather than a row per type, so the
// whole set is one read and a hand-edited or stale entry can only cost a
// fallback to DEFAULT_LIST_SORT.

export interface ListSort {
  sort: MediaSort
  dir: 'asc' | 'desc'
}

export const DEFAULT_LIST_SORT: ListSort = { sort: 'updated', dir: 'desc' }

const KEY = 'library.listSort'

function loadAll(): Record<string, Partial<ListSort> | undefined> {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

// `allowed` is the menu the calling page actually renders: a sort key that has
// since been renamed (or that this page never offered) must not come back as a
// blank <select>, so it falls back rather than being restored.
export function loadListSort(scope: string, allowed?: readonly MediaSort[]): ListSort {
  const saved = loadAll()[scope]
  const sort = saved?.sort
  const dir = saved?.dir
  const ok = typeof sort === 'string' && (!allowed || allowed.includes(sort))
  return {
    sort: ok ? (sort as MediaSort) : DEFAULT_LIST_SORT.sort,
    dir: dir === 'asc' || dir === 'desc' ? dir : DEFAULT_LIST_SORT.dir
  }
}

export function saveListSort(scope: string, patch: Partial<ListSort>): void {
  try {
    const all = loadAll()
    const next = { ...loadListSort(scope), ...patch }
    localStorage.setItem(KEY, JSON.stringify({ ...all, [scope]: next }))
  } catch {
    // A full or disabled localStorage must never break the list.
  }
}

// Grid or list, remembered per media type the same way: a tracker working
// through a long watching list wants the rows back next time, while the
// covers stay the default for browsing.
export type ListLayout = 'grid' | 'list'

const LAYOUT_KEY = 'library.listLayout'

export function loadListLayout(scope: string): ListLayout {
  try {
    const all = JSON.parse(localStorage.getItem(LAYOUT_KEY) ?? '{}')
    return all?.[scope] === 'list' ? 'list' : 'grid'
  } catch {
    return 'grid'
  }
}

export function saveListLayout(scope: string, layout: ListLayout): void {
  try {
    const all = JSON.parse(localStorage.getItem(LAYOUT_KEY) ?? '{}')
    localStorage.setItem(LAYOUT_KEY, JSON.stringify({ ...(all && typeof all === 'object' ? all : {}), [scope]: layout }))
  } catch {
    // A full or disabled localStorage must never break the list.
  }
}
