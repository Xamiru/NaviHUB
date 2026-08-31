import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import AppMark from './AppMark'
import {
  archiveAreaForPath,
  drawerRouteForPath,
  drawerItemsForArea,
  type ArchiveArea,
  type ArchiveNavItem
} from '../lib/adaptiveNav'
import { useSettings } from '../lib/hooks'
import { SIDEBAR_HIDDEN_SETTING, parseHiddenSections } from '../lib/sidebarSections'
import { APP_THEME_SETTING } from '@shared/appTheme'
import { resolveAppTheme } from '../lib/theme'

const AREA_LABELS: Record<ArchiveArea, string> = {
  home: 'Home',
  library: 'Library',
  play: 'Play',
  learn: 'Learn',
  system: 'System'
}

function railClass(active: boolean): string {
  return `relative flex h-14 w-full items-center justify-center px-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
    active
      ? 'bg-signal-live/10 text-signal-live shadow-[inset_3px_0_0_0_rgb(var(--signal-live))]'
      : 'text-ink-muted hover:bg-surface-raised/70 hover:text-ink'
  }`
}

function drawerLinkClass(active: boolean): string {
  return `group flex items-center justify-between rounded-md border px-3.5 py-3 text-sm transition-colors ${
    active
      ? 'border-signal-live/35 bg-signal-live/10 text-signal-live'
      : 'border-transparent text-ink-secondary hover:border-line-strong hover:bg-surface-raised/70 hover:text-ink'
  }`
}

function DrawerLink({ item, active }: { item: ArchiveNavItem; active: boolean }) {
  return (
    <Link
      to={item.to}
      className={drawerLinkClass(active)}
      aria-current={active ? 'page' : undefined}
    >
      <span>{item.label}</span>
      {active && <span className="text-[10px] uppercase tracking-widest">Current</span>}
    </Link>
  )
}

export default function Sidebar() {
  const location = useLocation()
  const { data: settings } = useSettings()
  const theme = resolveAppTheme(settings?.[APP_THEME_SETTING])
  const hidden = parseHiddenSections(settings?.[SIDEBAR_HIDDEN_SETTING])
  const currentArea = archiveAreaForPath(location.pathname)
  const [openArea, setOpenArea] = useState<ArchiveArea | null>(null)
  const rootRef = useRef<HTMLElement>(null)

  const visibleItems = (area: ArchiveArea) =>
    drawerItemsForArea(area).filter(
      (item) => !item.visibilityKey || !hidden.has(item.visibilityKey)
    )

  useEffect(() => setOpenArea(null), [location.pathname])

  useEffect(() => {
    function onMouseDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpenArea(null)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpenArea(null)
    }
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const drawerItems = openArea ? visibleItems(openArea) : []
  const drawerCurrent = drawerRouteForPath(
    location.pathname,
    drawerItems.map((item) => item.to)
  )

  return (
    <aside
      ref={rootRef}
      className="wired-surface relative z-40 flex w-20 shrink-0 flex-col border-r border-line-subtle bg-surface-canvas"
    >
      <NavLink
        to="/"
        className="flex h-[76px] shrink-0 flex-col items-center justify-center gap-1 overflow-hidden border-b border-line-subtle"
        aria-label="NaviHUB Home"
      >
        <AppMark theme={theme} className="h-7 w-7" />
        <span
          className={`sidebar-brand max-w-full overflow-hidden whitespace-nowrap px-1 text-center !text-[20px] leading-none tracking-[0.08em] ${
            theme === 'lain' ? 'lain-crt brand-glitch' : 'tactical-brand'
          }`}
        >
          NAVI<span className="text-signal-live">HUB</span>
        </span>
      </NavLink>

      <nav className="flex-1 py-3" aria-label="Primary navigation">
        <NavLink to="/" end className={railClass(currentArea === 'home')}>
          Home
        </NavLink>
        {(['library', 'play', 'learn'] as ArchiveArea[]).map((area) => {
          if (visibleItems(area).length === 0) return null
          const open = openArea === area
          return (
            <button
              key={area}
              type="button"
              className={railClass(currentArea === area || open)}
              onClick={() => setOpenArea(open ? null : area)}
              aria-expanded={open}
              aria-controls="archive-nav-drawer"
            >
              {AREA_LABELS[area]}
            </button>
          )
        })}
      </nav>

      <div className="border-t border-line-subtle py-2">
        <button
          type="button"
          className={railClass(currentArea === 'system' || openArea === 'system')}
          onClick={() => setOpenArea(openArea === 'system' ? null : 'system')}
          aria-expanded={openArea === 'system'}
          aria-controls="archive-nav-drawer"
        >
          System
        </button>
        <div
          className="flex items-center justify-center gap-1.5 pb-1 pt-2 text-[8px] uppercase tracking-widest text-ink-decorative"
          aria-hidden="true"
        >
          <span className="wired-dot h-1.5 w-1.5 rounded-full bg-signal-live" />
          {theme === 'metal-gear' ? 'Ops' : 'Wired'}
        </div>
      </div>

      {openArea && (
        <div
          id="archive-nav-drawer"
          className="wired-surface absolute inset-y-0 left-full z-50 flex w-80 flex-col border-r border-line-strong bg-surface-panel/95 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-line-subtle px-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-signal-link">
                {theme === 'metal-gear' ? 'Mission index' : 'Archive directory'}
              </p>
              <h2 className="mt-1 text-lg font-semibold text-ink">{AREA_LABELS[openArea]}</h2>
            </div>
            <button
              type="button"
              className="btn btn-ghost px-2.5"
              onClick={() => setOpenArea(null)}
              aria-label="Close navigation"
            >
              Close
            </button>
          </div>
          <nav
            className="flex-1 space-y-1 overflow-y-auto p-3"
            aria-label={`${AREA_LABELS[openArea]} navigation`}
          >
            {drawerItems.map((item) => (
              <DrawerLink key={item.to} item={item} active={drawerCurrent === item.to} />
            ))}
          </nav>
          <div className="border-t border-line-subtle px-5 py-4 text-xs leading-relaxed text-ink-muted">
            Every archive stays local to this device. Hidden sections remain reachable through search.
          </div>
        </div>
      )}
    </aside>
  )
}
