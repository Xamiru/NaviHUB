import { readdirSync, readFileSync, statSync } from 'fs'
import { join, relative } from 'path'
import { fileURLToPath } from 'url'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const toastMock = vi.hoisted(() => vi.fn())
vi.mock('../src/renderer/src/lib/toast', () => ({ toast: toastMock }))

import {
  activateTab,
  activeTab,
  closeTab,
  cycleTab,
  getTabsSnapshot,
  jumpToTab,
  MAX_TABS,
  openTab,
  reopenClosedTab,
  resetBrowserTabs
} from '../src/renderer/src/lib/browserTabs'
import { encodePath, TabHistory } from '../src/renderer/src/lib/tabHistory'

describe('TabHistory', () => {
  it('gives every entry, the first included, its own key', () => {
    const a = new TabHistory('/')
    const b = new TabHistory('/')
    expect(a.location.key).not.toBe('default')
    expect(a.location.key).not.toBe(b.location.key)
    a.push('/games')
    a.replace('/games?sort=title')
    expect(new Set(a.entries.map((e) => e.key)).size).toBe(a.entries.length)
  })

  it('clamps go() at both ends and truncates forward entries on push', () => {
    const h = new TabHistory('/')
    h.push('/anime')
    h.push('/anime/1')
    h.go(-5)
    expect(h.location.pathname).toBe('/')
    expect(h.canGoBack).toBe(false)
    h.go(1)
    h.push('/manga')
    expect(h.entries.map((e) => e.pathname)).toEqual(['/', '/anime', '/manga'])
    expect(h.canGoForward).toBe(false)
    h.go(3)
    expect(h.index).toBe(2)
  })

  it('reports the navigation type and notifies listeners', () => {
    const h = new TabHistory('/')
    const seen: string[] = []
    const stop = h.listen(() => seen.push(h.action))
    h.push('/a')
    h.replace('/b')
    h.go(-1)
    stop()
    h.push('/c')
    expect(seen).toEqual(['PUSH', 'REPLACE', 'POP'])
    h.markRestored()
    expect(h.action).toBe('POP')
  })

  it('works when react-router calls push/replace detached from the object', () => {
    const h = new TabHistory('/')
    const { push, replace } = h
    push('/a')
    replace('/b')
    expect(h.location.pathname).toBe('/b')
  })

  it('percent-encodes paths the way window.location.hash did', () => {
    expect(encodePath('/tags/slice of life?q=ガンダム')).toEqual({
      pathname: '/tags/slice%20of%20life',
      search: '?q=%E3%82%AC%E3%83%B3%E3%83%80%E3%83%A0',
      hash: ''
    })
    expect(encodePath('/music/albums/2%2F3').pathname).toBe('/music/albums/2%2F3')
    expect(new TabHistory('/').createHref({ pathname: '/games', search: '?x=1' })).toBe('#/games?x=1')
  })
})

describe('browser tab store', () => {
  beforeEach(() => {
    resetBrowserTabs('/')
    toastMock.mockClear()
  })

  const paths = () => getTabsSnapshot().tabs.map((t) => t.history.location.pathname)

  it('opens after the active tab, in the background when asked', async () => {
    await openTab('/games')
    await activateTab(getTabsSnapshot().tabs[0].id)
    await openTab('/music', { activate: false })
    expect(paths()).toEqual(['/', '/music', '/games'])
    expect(activeTab().history.location.pathname).toBe('/')
  })

  it(`stops at ${MAX_TABS} tabs with a toast`, async () => {
    for (let i = 1; i < MAX_TABS; i++) expect(await openTab(`/t${i}`)).toBe(true)
    expect(await openTab('/one-too-many')).toBe(false)
    expect(getTabsSnapshot().tabs).toHaveLength(MAX_TABS)
    expect(toastMock).toHaveBeenCalledWith('5 tabs open. Close one to open another.', 'warning')
  })

  it('closes to the right neighbour, then the left, and never closes the last tab', async () => {
    await openTab('/a')
    await openTab('/b')
    await activateTab(getTabsSnapshot().tabs[1].id)
    await closeTab(activeTab().id)
    expect(activeTab().history.location.pathname).toBe('/b')
    await closeTab(activeTab().id)
    expect(activeTab().history.location.pathname).toBe('/')
    await closeTab(activeTab().id)
    expect(paths()).toEqual(['/'])
  })

  it('reopens a closed tab in place with its whole history', async () => {
    await openTab('/anime')
    activeTab().history.push('/anime/7')
    const keys = activeTab().history.entries.map((e) => e.key)
    await closeTab(activeTab().id)
    await reopenClosedTab()
    expect(paths()).toEqual(['/', '/anime/7'])
    expect(activeTab().history.entries.map((e) => e.key)).toEqual(keys)
    expect(activeTab().history.action).toBe('POP')
  })

  it('cycles and jumps by position', async () => {
    await openTab('/a')
    await openTab('/b')
    await cycleTab(1)
    expect(activeTab().history.location.pathname).toBe('/')
    await cycleTab(-1)
    expect(activeTab().history.location.pathname).toBe('/b')
    await jumpToTab(2)
    expect(activeTab().history.location.pathname).toBe('/a')
    await jumpToTab(5)
    expect(activeTab().history.location.pathname).toBe('/a')
  })

  it('titles a tab by its section until the page heading is read', async () => {
    await openTab('/games/12')
    expect(activeTab().title).toBe('Games')
  })
})

// Navigation must go through the active tab's router: a raw hash write no
// longer navigates (nothing listens for hashchange) and would desync the tab.
describe('renderer never assigns window.location.hash', () => {
  const root = fileURLToPath(new URL('../src/renderer/src', import.meta.url))
  const walk = (dir: string): string[] =>
    readdirSync(dir).flatMap((name) => {
      const p = join(dir, name)
      if (statSync(p).isDirectory()) return walk(p)
      return /\.tsx?$/.test(p) ? [p] : []
    })

  it('has no hash assignments', () => {
    const files = walk(root)
    expect(files.length).toBeGreaterThan(100)
    const offenders = files
      .filter((f) => /location\.hash\s*=(?!=)/.test(readFileSync(f, 'utf8')))
      .map((f) => relative(root, f))
    expect(offenders, 'navigate with useNavigate() instead').toEqual([])
  })
})
