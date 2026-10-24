import { createPath, NavigationType, type Location, type Navigator, type Path, type To } from 'react-router-dom'

// One browser tab's history stack (lib/browserTabs.ts holds the tabs). Implements
// react-router's Navigator so the single <Router> in components/TabbedRouter.tsx
// can be fed whichever tab is active, while every other tab keeps its stack here
// without anything mounted. Pure: no window, no React.

// Like a browser, very old entries fall off the bottom of a long session.
const MAX_ENTRIES = 100

// Every entry gets its own key, the first included. navState stores persisted
// UI state and scroll under `location.key`, so a shared 'default' key would let
// two fresh tabs read and overwrite each other's filters and scroll.
export function newEntryKey(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4)
}

// Percent-encodes a path the way window.location did under HashRouter, so route
// matching and `location.pathname` comparisons see the same bytes as before.
export function encodePath(to: To): Path {
  const raw = typeof to === 'string' ? to : createPath(to)
  // A trailing space would be trimmed by URL; it can be part of a splat param.
  const href = raw.replace(/ $/, '%20')
  const url = new URL(`http://navihub.invalid${href.startsWith('/') ? href : `/${href}`}`)
  return { pathname: url.pathname, search: url.search, hash: url.hash }
}

function makeEntry(to: To, state: unknown): Location {
  return { ...encodePath(to), state: state ?? null, key: newEntryKey() }
}

export class TabHistory implements Navigator {
  private stack: Location[]
  private idx: number
  private lastAction: NavigationType
  private readonly listeners = new Set<() => void>()

  constructor(initialPath: To = '/') {
    this.stack = [makeEntry(initialPath, null)]
    this.idx = 0
    this.lastAction = NavigationType.Pop
  }

  get location(): Location {
    return this.stack[this.idx]
  }

  get action(): NavigationType {
    return this.lastAction
  }

  get index(): number {
    return this.idx
  }

  get entries(): readonly Location[] {
    return this.stack
  }

  get canGoBack(): boolean {
    return this.idx > 0
  }

  get canGoForward(): boolean {
    return this.idx < this.stack.length - 1
  }

  // Arrow properties, not methods: react-router calls push/replace detached
  // (`(replace ? navigator.replace : navigator.push)(…)`).
  createHref = (to: To): string => `#${typeof to === 'string' ? to : createPath(to)}`

  encodeLocation = (to: To): Path => encodePath(to)

  push = (to: To, state?: unknown): void => {
    this.stack = [...this.stack.slice(0, this.idx + 1), makeEntry(to, state)]
    if (this.stack.length > MAX_ENTRIES) this.stack = this.stack.slice(-MAX_ENTRIES)
    this.idx = this.stack.length - 1
    this.lastAction = NavigationType.Push
    this.emit()
  }

  replace = (to: To, state?: unknown): void => {
    this.stack = this.stack.map((entry, i) => (i === this.idx ? makeEntry(to, state) : entry))
    this.lastAction = NavigationType.Replace
    this.emit()
  }

  // Clamped: navigate(-1) on the first entry is a no-op, never an error.
  go = (delta: number): void => {
    const next = Math.min(Math.max(this.idx + delta, 0), this.stack.length - 1)
    if (next === this.idx) return
    this.idx = next
    this.lastAction = NavigationType.Pop
    this.emit()
  }

  // The current page's subject was deleted. It and every entry `gone` matches
  // leave the stack, behind and ahead, so neither Back nor Forward reaches a
  // dead page. The tab lands on the nearest earlier survivor as a Pop, so its
  // persisted state and scroll restore; with none, `fallback` takes the current
  // entry's place. One emit either way.
  forget(gone: (pathname: string) => boolean, fallback: To): void {
    const keep = (entry: Location, i: number): boolean => i !== this.idx && !gone(entry.pathname)
    let landing: Location | null = null
    for (let i = this.idx - 1; i >= 0 && !landing; i--) {
      if (keep(this.stack[i], i)) landing = this.stack[i]
    }
    if (landing) {
      this.stack = this.stack.filter(keep)
      this.lastAction = NavigationType.Pop
    } else {
      landing = makeEntry(fallback, null)
      const fresh = landing
      this.stack = this.stack
        .map((entry, i) => (i === this.idx ? fresh : entry))
        .filter((entry) => entry === fresh || !gone(entry.pathname))
      this.lastAction = NavigationType.Replace
    }
    this.idx = this.stack.indexOf(landing)
    this.emit()
  }

  // Its tab came back to the front: the page remounts the way a back/forward
  // visit would, so navState restores persisted state and scroll.
  markRestored(): void {
    this.lastAction = NavigationType.Pop
  }

  // Duplicate tab: the same stack and position under fresh keys, so the copy
  // never shares navState entries with this one. `keyMap` maps old key → new
  // for copying that state across.
  clone(): { history: TabHistory; keyMap: Map<string, string> } {
    const copy = new TabHistory('/')
    const keyMap = new Map<string, string>()
    copy.stack = this.stack.map((entry) => {
      const key = newEntryKey()
      keyMap.set(entry.key, key)
      return { ...entry, key }
    })
    copy.idx = this.idx
    return { history: copy, keyMap }
  }

  listen(fn: () => void): () => void {
    this.listeners.add(fn)
    return () => {
      this.listeners.delete(fn)
    }
  }

  private emit(): void {
    for (const fn of this.listeners) fn()
  }
}
