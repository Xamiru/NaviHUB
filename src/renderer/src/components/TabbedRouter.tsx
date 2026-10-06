import { useCallback, useEffect, useSyncExternalStore, type ReactNode } from 'react'
import { createPath, Router } from 'react-router-dom'
import {
  activeTab,
  closeTab,
  cycleTab,
  jumpToTab,
  openTab,
  reopenClosedTab,
  TabIdContext,
  useBrowserTabs
} from '../lib/browserTabs'

// The app's router: ONE react-router <Router>, fed by the active browser tab's
// own history (lib/tabHistory.ts). Switching tabs swaps the location and
// navigator it renders, so no second router is ever nested and background tabs
// mount nothing. Must not import pages (tests/performanceBoundaries.test.ts).
export default function TabbedRouter({ children }: { children: ReactNode }) {
  const { tabs, activeId } = useBrowserTabs()
  const history = (tabs.find((tab) => tab.id === activeId) ?? tabs[0]).history
  const subscribe = useCallback((fn: () => void) => history.listen(fn), [history])
  const location = useSyncExternalStore(subscribe, () => history.location)

  // Mirror the active page into the window URL, so Ctrl+R and an error-boundary
  // reload come back to it. replaceState fires neither popstate nor hashchange.
  useEffect(() => {
    window.history.replaceState(null, '', `#${createPath(location)}`)
  }, [location])

  return (
    <TabIdContext.Provider value={activeId}>
      <Router location={location} navigationType={history.action} navigator={history}>
        <TabInput />
        {children}
      </Router>
    </TabIdContext.Provider>
  )
}

const DIGIT_CODES = ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5']

// Mounted before the pages so its window-capture listeners run first. Matched
// on e.code so Persian/Japanese layouts still work. Nothing fires while a modal
// is open: its focus trap owns Tab, and a confirm opened in one tab must never
// resolve in another.
function TabInput() {
  useEffect(() => {
    const modalOpen = (): boolean => document.querySelector('[aria-modal="true"]') !== null

    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.isComposing || modalOpen()) return
      const ctrl = e.ctrlKey || e.metaKey
      let run: (() => unknown) | null = null
      if (ctrl && !e.altKey) {
        if (e.code === 'KeyT') run = e.shiftKey ? reopenClosedTab : () => openTab('/')
        else if (e.code === 'KeyW' && !e.shiftKey) run = () => closeTab(activeTab().id)
        else if (e.code === 'Tab') run = () => cycleTab(e.shiftKey ? -1 : 1)
        else if (e.code === 'PageDown' && !e.shiftKey) run = () => cycleTab(1)
        else if (e.code === 'PageUp' && !e.shiftKey) run = () => cycleTab(-1)
        else if (DIGIT_CODES.includes(e.code) && !e.shiftKey) {
          run = () => jumpToTab(DIGIT_CODES.indexOf(e.code) + 1)
        }
      } else if (e.altKey && !ctrl && !e.shiftKey) {
        if (e.code === 'ArrowLeft') run = () => activeTab().history.go(-1)
        else if (e.code === 'ArrowRight') run = () => activeTab().history.go(1)
      }
      if (!run) return
      e.preventDefault()
      e.stopImmediatePropagation()
      void run()
    }

    // Mouse side buttons. Bubble phase, so the Lightbox (which claims Back in
    // the capture phase to close itself) wins while it is open.
    const onMouseUp = (e: MouseEvent): void => {
      if (e.defaultPrevented || modalOpen()) return
      if (e.button === 3) activeTab().history.go(-1)
      else if (e.button === 4) activeTab().history.go(1)
    }

    // Ctrl/Cmd+click and middle-click on an in-app link open it in a new
    // background tab (Ctrl+Shift+click switches to it). react-router's <Link>
    // ignores modified clicks, and the browser default would try to open a
    // window, so every modified click on an in-app link is handled here.
    const internalLink = (e: MouseEvent): string | null => {
      const target = e.target instanceof Element ? e.target : null
      const href = target?.closest('a[href^="#/"]')?.getAttribute('href')
      return href ? href.slice(1) : null
    }
    const onClick = (e: MouseEvent): void => {
      if (e.button !== 0 || !(e.ctrlKey || e.metaKey || e.shiftKey || e.altKey)) return
      const path = internalLink(e)
      if (!path) return
      e.preventDefault()
      if (e.ctrlKey || e.metaKey) void openTab(path, { activate: e.shiftKey })
      else activeTab().history.push(path)
    }
    const onAuxClick = (e: MouseEvent): void => {
      if (e.button !== 1) return
      const path = internalLink(e)
      if (!path) return
      e.preventDefault()
      void openTab(path, { activate: false })
    }

    window.addEventListener('keydown', onKeyDown, true)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('click', onClick, true)
    window.addEventListener('auxclick', onAuxClick, true)
    return () => {
      window.removeEventListener('keydown', onKeyDown, true)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('click', onClick, true)
      window.removeEventListener('auxclick', onAuxClick, true)
    }
  }, [])

  return null
}
