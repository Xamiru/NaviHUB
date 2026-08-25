import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import lainAvatar from '../assets/lain.png'
import {
  archiveAreaForPath,
  drawerRouteForPath,
  drawerItemsForArea,
  type ArchiveArea,
  type ArchiveNavItem
} from '../lib/adaptiveNav'
import { useSettings } from '../lib/hooks'
import { SIDEBAR_HIDDEN_SETTING, parseHiddenSections } from '../lib/sidebarSections'

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
      ? 'bg-accent/10 text-accent shadow-[inset_3px_0_0_0_rgb(var(--accent))]'
      : 'text-gray-500 hover:bg-base-700/70 hover:text-white'
  }`
}

function drawerLinkClass(active: boolean): string {
  return `group flex items-center justify-between rounded-md border px-3.5 py-3 text-sm transition-colors ${
    active
      ? 'border-accent/35 bg-accent/10 text-accent'
      : 'border-transparent text-gray-300 hover:border-base-600 hover:bg-base-700/70 hover:text-white'
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
      className="relative z-40 flex w-20 shrink-0 flex-col border-r border-base-700 bg-base-900"
    >
      <NavLink
        to="/"
        className="flex h-[76px] shrink-0 flex-col items-center justify-center gap-1 overflow-hidden border-b border-base-700"
        aria-label="NaviHUB Home"
      >
        <img src={lainAvatar} alt="" className="h-7 w-7" />
        <span className="sidebar-brand lain-crt brand-glitch max-w-full overflow-hidden whitespace-nowrap px-1 text-center !text-[20px] leading-none tracking-[0.08em]">
          NAVI<span className="text-accent">HUB</span>
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

      <div className="border-t border-base-700 py-2">
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
          className="flex items-center justify-center gap-1.5 pb-1 pt-2 text-[8px] uppercase tracking-widest text-gray-600"
          aria-hidden="true"
        >
          <span className="wired-dot h-1.5 w-1.5 rounded-full bg-accent" />
          Wired
        </div>
      </div>

      {openArea && (
        <div
          id="archive-nav-drawer"
          className="absolute inset-y-0 left-full z-50 flex w-80 flex-col border-r border-base-600 bg-base-800/95 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-base-700 px-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                Archive directory
              </p>
              <h2 className="mt-1 text-lg font-semibold text-white">{AREA_LABELS[openArea]}</h2>
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
          <div className="border-t border-base-700 px-5 py-4 text-xs leading-relaxed text-gray-500">
            Every archive stays local to this device. Hidden sections remain reachable through search.
          </div>
        </div>
      )}
    </aside>
  )
}
