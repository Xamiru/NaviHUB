import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { archiveContextForPath, bestArchiveRoute } from '../lib/adaptiveNav'
import { useSettings } from '../lib/hooks'
import { SIDEBAR_HIDDEN_SETTING, parseHiddenSections } from '../lib/sidebarSections'
import GameSessionIndicator from './GameSessionIndicator'
import TasksIndicator from './TasksIndicator'
import { APP_THEME_SETTING } from '@shared/appTheme'
import { resolveAppTheme, themedDescriptor } from '../lib/theme'

function contextLinkClass(active: boolean): string {
  return `relative flex h-full shrink-0 items-center px-3 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${
    active ? 'text-signal-live' : 'text-ink-muted hover:text-ink'
  } after:absolute after:inset-x-3 after:bottom-0 after:h-px after:bg-signal-live after:transition-opacity ${
    active ? 'after:opacity-100' : 'after:opacity-0'
  }`
}

export default function Topbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { data: settings } = useSettings()
  const theme = resolveAppTheme(settings?.[APP_THEME_SETTING])
  const [q, setQ] = useState('')
  const tabsRef = useRef<HTMLElement>(null)
  const [tabEdges, setTabEdges] = useState({ left: false, right: false })
  const context = archiveContextForPath(location.pathname)
  const hidden = parseHiddenSections(settings?.[SIDEBAR_HIDDEN_SETTING])
  const contextItems = context.items.filter(
    (item) => !item.visibilityKey || !hidden.has(item.visibilityKey)
  )
  const tabRoutes = contextItems.map((item) => item.to).join('|')
  const activeRoute = bestArchiveRoute(
    location.pathname,
    contextItems.map((item) => item.to)
  )

  useEffect(() => {
    if (location.pathname === '/search') {
      const params = new URLSearchParams(location.search)
      setQ(params.get('q') ?? '')
    }
  }, [location])

  useEffect(() => {
    const tabs = tabsRef.current
    if (!tabs) return
    const updateEdges = () => {
      setTabEdges({
        left: tabs.scrollLeft > 1,
        right: tabs.scrollLeft + tabs.clientWidth < tabs.scrollWidth - 1
      })
    }
    const activeTab = tabs.querySelector<HTMLElement>('[aria-current="page"]')
    activeTab?.scrollIntoView?.({ block: 'nearest', inline: 'nearest' })
    updateEdges()
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updateEdges)
    observer?.observe(tabs)
    window.addEventListener('resize', updateEdges)
    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', updateEdges)
    }
  }, [location.pathname, tabRoutes])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const term = q.trim()
    if (term) navigate(`/search?q=${encodeURIComponent(term)}`)
  }

  return (
    <header className="wired-surface relative z-30 h-[76px] shrink-0 border-b border-line-subtle bg-surface-panel/80 backdrop-blur-xl">
      <div className="flex h-11 min-w-0 items-center gap-4 px-5">
        <div className="hidden min-w-0 shrink sm:block">
          <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-signal-link/80">
            {themedDescriptor(theme, context.descriptor)}
          </p>
          <p className="max-w-56 truncate text-sm font-semibold text-ink">{context.title}</p>
        </div>

        <form onSubmit={submit} role="search" className="ml-auto min-w-0 max-w-xl flex-1">
          <div className="relative">
            <input
              className="input h-8 pr-2 text-sm sm:pr-16"
              placeholder={theme === 'metal-gear' ? 'Search intelligence...' : 'Search the archive...'}
              aria-label="Search library"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <kbd className="kbd pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 sm:block">
              Ctrl K
            </kbd>
          </div>
        </form>

        <div className="flex shrink-0 items-center gap-2">
          <GameSessionIndicator />
          <TasksIndicator />
        </div>
      </div>

      <div className="relative h-8 border-t border-line-subtle/70">
        <nav
          ref={tabsRef}
          className="flex h-full min-w-0 items-stretch overflow-x-auto px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label={`${context.title} navigation`}
          onScroll={() => {
            const tabs = tabsRef.current
            if (tabs) {
              setTabEdges({
                left: tabs.scrollLeft > 1,
                right: tabs.scrollLeft + tabs.clientWidth < tabs.scrollWidth - 1
              })
            }
          }}
        >
          {contextItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={contextLinkClass(activeRoute === item.to)}
              aria-current={activeRoute === item.to ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {tabEdges.left && (
          <button
            type="button"
            className="absolute inset-y-0 left-0 bg-surface-panel px-2 text-xs text-ink-secondary hover:text-ink"
            aria-label="Show previous navigation links"
            onClick={() => tabsRef.current?.scrollBy({ left: -240, behavior: 'smooth' })}
          >
            Prev
          </button>
        )}
        {tabEdges.right && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 bg-surface-panel px-2 text-xs text-ink-secondary hover:text-ink"
            aria-label="Show more navigation links"
            onClick={() => tabsRef.current?.scrollBy({ left: 240, behavior: 'smooth' })}
          >
            More
          </button>
        )}
      </div>
    </header>
  )
}
