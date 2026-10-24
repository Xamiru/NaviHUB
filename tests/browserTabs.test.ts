import { readdirSync, readFileSync, statSync } from 'fs'
import { join, relative } from 'path'
import { fileURLToPath } from 'url'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const toastMock = vi.hoisted(() => vi.fn())
vi.mock('../src/renderer/src/lib/toast', () => ({ toast: toastMock }))

import {
  activateTab,
  activeTab,
  closeOtherTabs,
  closeTab,
  closeTabsToRight,
  cycleTab,
  duplicateTab,
  getTabsSnapshot,
  hasClosedTabs,
  jumpToLastTab,
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

describe('TabHistory.forget', () => {
  const paths = (h: TabHistory) => h.entries.map((e) => e.pathname)
  const title = (p: string) => p === '/anime/7' || p.startsWith('/anime/7/')

  it('lands on the earlier entry as a Pop, keeping its key, and drops the deleted page', () => {
    const h = new TabHistory('/')
    h.push('/anime')
    const list = h.location.key
    h.push('/anime/7')
    const seen: string[] = []
    h.listen(() => seen.push(h.action))
    h.forget(title, '/anime')
    expect(paths(h)).toEqual(['/', '/anime'])
    expect(h.location.key).toBe(list)
    expect(h.action).toBe('POP')
    expect(h.canGoForward).toBe(false)
    expect(seen).toEqual(['POP'])
  })

  it('removes every matching entry behind and ahead, sub-routes included', () => {
    const h = new TabHistory('/anime')
    h.push('/anime/7')
    h.push('/anime/7/edit')
    h.push('/people/3')
    h.push('/anime/7')
    h.push('/manga/2')
    h.go(-1)
    h.forget(title, '/anime')
    expect(paths(h)).toEqual(['/anime', '/people/3', '/manga/2'])
    expect(h.location.pathname).toBe('/people/3')
    h.go(-1)
    expect(h.location.pathname).toBe('/anime')
  })

  it('drops the current entry even when the predicate misses it', () => {
    const h = new TabHistory('/lists')
    h.push('/lists/4')
    h.forget(() => false, '/lists')
    expect(paths(h)).toEqual(['/lists'])
  })

  it('replaces the current entry with the fallback when nothing earlier survives', () => {
    const h = new TabHistory('/anime/7/edit')
    h.push('/anime/7')
    h.push('/people/3')
    h.go(-1)
    h.forget(title, '/anime')
    expect(paths(h)).toEqual(['/anime', '/people/3'])
    expect(h.index).toBe(0)
    expect(h.action).toBe('REPLACE')
    expect(new Set(h.entries.map((e) => e.key)).size).toBe(2)
  })
})

describe('TabHistory.clone', () => {
  it('copies the stack and position under fresh keys', () => {
    const h = new TabHistory('/')
    h.push('/anime')
    h.push('/anime/7')
    h.go(-1)
    const { history, keyMap } = h.clone()
    expect(history.entries.map((e) => e.pathname)).toEqual(['/', '/anime', '/anime/7'])
    expect(history.index).toBe(1)
    const oldKeys = h.entries.map((e) => e.key)
    const newKeys = history.entries.map((e) => e.key)
    expect(newKeys.some((k) => oldKeys.includes(k))).toBe(false)
    expect(oldKeys.map((k) => keyMap.get(k))).toEqual(newKeys)
    history.push('/games')
    expect(h.entries).toHaveLength(3)
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
    expect(toastMock).toHaveBeenCalledWith(`${MAX_TABS} tabs open. Close one to open another.`, 'warning')
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

  it('duplicates a tab after itself with its history and title, and activates it', async () => {
    await openTab('/anime')
    activeTab().history.push('/anime/7')
    const source = activeTab()
    await activateTab(getTabsSnapshot().tabs[0].id)
    await openTab('/music', { activate: false })
    expect(await duplicateTab(source.id)).toBe(true)
    expect(paths()).toEqual(['/', '/music', '/anime/7', '/anime/7'])
    const copy = activeTab()
    expect(copy.id).not.toBe(source.id)
    expect(getTabsSnapshot().tabs.indexOf(copy)).toBe(3)
    expect(copy.title).toBe(source.title)
    expect(copy.history.entries.map((e) => e.pathname)).toEqual(['/anime', '/anime/7'])
    expect(copy.history.action).toBe('POP')
  })

  it('refuses to duplicate past the tab limit', async () => {
    for (let i = 1; i < MAX_TABS; i++) await openTab(`/t${i}`)
    expect(await duplicateTab()).toBe(false)
    expect(getTabsSnapshot().tabs).toHaveLength(MAX_TABS)
  })

  it('jumps to the last tab whatever the count', async () => {
    await openTab('/a')
    await openTab('/b')
    await jumpToTab(1)
    await jumpToLastTab()
    expect(activeTab().history.location.pathname).toBe('/b')
  })

  it('counts switches that bring a tab to the front, not background opens', async () => {
    const seq = () => getTabsSnapshot().switchSeq
    expect(seq()).toBe(0)
    await openTab('/a', { activate: false })
    expect(seq()).toBe(0)
    await jumpToTab(2)
    expect(seq()).toBe(1)
    await jumpToTab(2)
    expect(seq()).toBe(1)
    await closeTab(activeTab().id)
    expect(seq()).toBe(2)
  })

  it('closes tabs to the right of one, keeping the active tab when it survives', async () => {
    await openTab('/a', { activate: false })
    await openTab('/b', { activate: false })
    await openTab('/c', { activate: false })
    expect(paths()).toEqual(['/', '/c', '/b', '/a'])
    await closeTabsToRight(getTabsSnapshot().tabs[1].id)
    expect(paths()).toEqual(['/', '/c'])
    expect(activeTab().history.location.pathname).toBe('/')
  })

  it('closes the others, bringing the kept tab to the front, and reopens each in place', async () => {
    expect(hasClosedTabs()).toBe(false)
    await openTab('/a', { activate: false })
    await openTab('/b', { activate: false })
    const keep = getTabsSnapshot().tabs[1]
    await closeOtherTabs(keep.id)
    expect(paths()).toEqual(['/b'])
    expect(activeTab().id).toBe(keep.id)
    expect(hasClosedTabs()).toBe(true)
    await reopenClosedTab()
    await reopenClosedTab()
    expect(paths()).toEqual(['/', '/b', '/a'])
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
