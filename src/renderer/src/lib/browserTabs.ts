import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type RefObject
} from 'react'
import { useLocation } from 'react-router-dom'
import { archiveContextForPath } from './adaptiveNav'
import { confirmDialog } from './confirm'
import { TabHistory } from './tabHistory'
import { toast } from './toast'

// Browser-style tabs. Only the active tab is mounted (components/TabbedRouter.tsx
// feeds its history to the one <Router>); every other tab is just its history
// stack and title, so an idle tab costs nothing. Its filters and scroll come
// back on return because navState keys them by `location.key`, which the stack
// keeps. Tabs are not saved across launches.

export const MAX_TABS = 5
const MAX_CLOSED = 10

export interface BrowserTab {
  readonly id: string
  readonly history: TabHistory
  readonly title: string
}

export interface BrowserTabsSnapshot {
  readonly tabs: readonly BrowserTab[]
  readonly activeId: string
}

interface ClosedTab {
  readonly tab: BrowserTab
  readonly position: number
}

let nextId = 1
let closed: ClosedTab[] = []
const listeners = new Set<() => void>()

// A tab's title until its page heading is read: the section name.
export function sectionTitle(pathname: string): string {
  return archiveContextForPath(pathname).title
}

function createTab(path: string): BrowserTab {
  const history = new TabHistory(path)
  return { id: `tab-${nextId++}`, history, title: sectionTitle(history.location.pathname) }
}

// The first tab opens where the window was loaded, so a reload keeps the page
// (TabbedRouter mirrors the active location into the URL hash).
function startPath(): string {
  const raw = typeof window === 'undefined' ? '' : window.location.hash.slice(1)
  return raw.startsWith('/') ? raw : '/'
}

const firstTab = createTab(startPath())
let snapshot: BrowserTabsSnapshot = { tabs: [firstTab], activeId: firstTab.id }

function commit(next: BrowserTabsSnapshot): void {
  snapshot = next
  for (const fn of listeners) fn()
}

export function subscribeTabs(fn: () => void): () => void {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

export function getTabsSnapshot(): BrowserTabsSnapshot {
  return snapshot
}

export function useBrowserTabs(): BrowserTabsSnapshot {
  return useSyncExternalStore(subscribeTabs, getTabsSnapshot)
}

export function activeTab(): BrowserTab {
  return snapshot.tabs.find((tab) => tab.id === snapshot.activeId) ?? snapshot.tabs[0]
}

// ---- leave guard ----------------------------------------------------------

// A page with in-memory progress (a quiz run, an edited form) registers here
// while that progress exists. Leaving its tab unmounts it, so the switch asks
// first. Navigating inside the tab is unaffected.
export type TabLeaveGuardKind = 'run' | 'edit'

const LEAVE_MESSAGES: Record<TabLeaveGuardKind, string> = {
  run: 'Leave this tab? Progress in this round will be lost.',
  edit: 'Leave this tab? Unsaved changes will be lost.'
}

const guards = new Map<string, Set<{ kind: TabLeaveGuardKind }>>()

// The tab the rendering page belongs to; provided by TabbedRouter.
export const TabIdContext = createContext<string | null>(null)

// The key for the routed page subtree. Pages remount per tab, so two tabs on
// one route never share component state, and a returning tab rebuilds its page
// from persisted state instead of whatever the last tab left in memory.
export function usePageKey(): string {
  const tabId = useContext(TabIdContext)
  const { pathname } = useLocation()
  return `${tabId}:${pathname}`
}

export function useTabLeaveGuard(when: boolean, kind: TabLeaveGuardKind): void {
  const tabId = useContext(TabIdContext)
  useEffect(() => {
    if (!when || !tabId) return
    const token = { kind }
    const set = guards.get(tabId) ?? new Set()
    guards.set(tabId, set)
    set.add(token)
    return () => {
      set.delete(token)
    }
  }, [when, kind, tabId])
}

// An edit form's guard: active while `draft` differs from what it was when the
// user first pressed a key or pointer once the form was `ready`. Values a form
// fills in by itself (a loaded row, a first status once settings arrive) never
// count as edits.
export function useEditLeaveGuard(draft: unknown, ready: boolean): void {
  const json = JSON.stringify(draft)
  const latest = useRef(json)
  latest.current = json
  const [baseline, setBaseline] = useState<string | null>(null)
  useEffect(() => {
    if (!ready || baseline !== null) return
    const mark = (): void => setBaseline(latest.current)
    window.addEventListener('pointerdown', mark, true)
    window.addEventListener('keydown', mark, true)
    return () => {
      window.removeEventListener('pointerdown', mark, true)
      window.removeEventListener('keydown', mark, true)
    }
  }, [ready, baseline])
  useTabLeaveGuard(baseline !== null && json !== baseline, 'edit')
}

async function mayLeaveActiveTab(): Promise<boolean> {
  const set = guards.get(snapshot.activeId)
  if (!set || set.size === 0) return true
  const kind = [...set].some((guard) => guard.kind === 'edit') ? 'edit' : 'run'
  return confirmDialog(LEAVE_MESSAGES[kind], { confirmLabel: 'Leave', danger: true })
}

// ---- actions ----------------------------------------------------------------

function limitReached(): boolean {
  if (snapshot.tabs.length < MAX_TABS) return false
  toast(`${MAX_TABS} tabs open. Close one to open another.`, 'warning')
  return true
}

// Brings a tab to the front: its page remounts as a back/forward visit would,
// so persisted state and scroll restore. `build` derives the tab list after the
// leave guard answers, so nothing that changed meanwhile (a title) is lost.
async function bringToFront(
  id: string,
  build: (tabs: readonly BrowserTab[]) => readonly BrowserTab[] = (tabs) => tabs
): Promise<boolean> {
  if (id !== snapshot.activeId && !(await mayLeaveActiveTab())) return false
  const tabs = build(snapshot.tabs)
  tabs.find((tab) => tab.id === id)?.history.markRestored()
  commit({ tabs, activeId: id })
  return true
}

function insertAt(tabs: readonly BrowserTab[], at: number, tab: BrowserTab): BrowserTab[] {
  return [...tabs.slice(0, at), tab, ...tabs.slice(at)]
}

function afterActive(tabs: readonly BrowserTab[]): number {
  return tabs.findIndex((t) => t.id === snapshot.activeId) + 1
}

// New tab after the active one. Background opens (Ctrl/middle-click) leave the
// current page alone, so they never need the leave guard.
export async function openTab(path = '/', opts: { activate?: boolean } = {}): Promise<boolean> {
  if (limitReached()) return false
  const tab = createTab(path)
  if (opts.activate === false) {
    commit({ ...snapshot, tabs: insertAt(snapshot.tabs, afterActive(snapshot.tabs), tab) })
    return true
  }
  return bringToFront(tab.id, (tabs) => insertAt(tabs, afterActive(tabs), tab))
}

// The last tab never closes; Ctrl+W there does nothing rather than close the app.
export async function closeTab(id: string): Promise<void> {
  const position = snapshot.tabs.findIndex((tab) => tab.id === id)
  if (position < 0 || snapshot.tabs.length === 1) return
  const tab = snapshot.tabs[position]
  const without = (tabs: readonly BrowserTab[]) => tabs.filter((t) => t.id !== id)
  if (id === snapshot.activeId) {
    const rest = without(snapshot.tabs)
    if (!(await bringToFront(rest[Math.min(position, rest.length - 1)].id, without))) return
  } else {
    commit({ ...snapshot, tabs: without(snapshot.tabs) })
  }
  guards.delete(id)
  closed = [{ tab, position }, ...closed].slice(0, MAX_CLOSED)
}

// Ctrl+Shift+T: the most recently closed tab, with its whole history.
export async function reopenClosedTab(): Promise<void> {
  const last = closed[0]
  if (!last || limitReached()) return
  closed = closed.slice(1)
  const restore = (tabs: readonly BrowserTab[]) =>
    insertAt(tabs, Math.min(last.position, tabs.length), last.tab)
  // Declined by the leave guard: it still reopens, behind the current tab.
  if (!(await bringToFront(last.tab.id, restore))) commit({ ...snapshot, tabs: restore(snapshot.tabs) })
}

export async function activateTab(id: string): Promise<void> {
  if (id === snapshot.activeId || !snapshot.tabs.some((tab) => tab.id === id)) return
  await bringToFront(id)
}

export async function cycleTab(delta: number): Promise<void> {
  const { tabs, activeId } = snapshot
  const at = tabs.findIndex((tab) => tab.id === activeId)
  await activateTab(tabs[(at + delta + tabs.length) % tabs.length].id)
}

// Ctrl+1..5, 1-based like a browser.
export async function jumpToTab(position: number): Promise<void> {
  const tab = snapshot.tabs[position - 1]
  if (tab) await activateTab(tab.id)
}

export function setTabTitle(id: string, title: string): void {
  if (!snapshot.tabs.some((tab) => tab.id === id && tab.title !== title)) return
  commit({
    ...snapshot,
    tabs: snapshot.tabs.map((tab) => (tab.id === id ? { ...tab, title } : tab))
  })
}

// Keeps the active tab's title in step with its page heading (the first h1 in
// `containerRef`), falling back to `fallback` — always, not only while the strip
// shows, so a tab left behind by Ctrl+T already carries its page's name. Home's
// h1 is the brand, so Home keeps its section name. Mutations are coalesced to
// one read per frame, and an unchanged title commits nothing.
export function useTabTitle(containerRef: RefObject<HTMLElement | null>, fallback: string): void {
  const tabId = useContext(TabIdContext)
  const { key, pathname } = useLocation()
  useEffect(() => {
    if (!tabId) return
    let frame = 0
    const read = (): void => {
      frame = 0
      const heading = pathname === '/' ? null : containerRef.current?.querySelector('h1')?.textContent
      setTabTitle(tabId, heading?.replace(/\s+/g, ' ').trim() || fallback)
    }
    read()
    const el = containerRef.current
    if (!el) return
    const observer = new MutationObserver(() => {
      if (!frame) frame = requestAnimationFrame(read)
    })
    observer.observe(el, { childList: true, subtree: true, characterData: true })
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [tabId, key, pathname, fallback, containerRef])
}

// Tests only: a fresh single tab at `path`.
export function resetBrowserTabs(path = '/'): void {
  const tab = createTab(path)
  closed = []
  guards.clear()
  commit({ tabs: [tab], activeId: tab.id })
}
