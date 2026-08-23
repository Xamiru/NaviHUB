import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { GACHA_GAMES } from '@shared/gacha'
import { WRESTLING_PROMOTIONS } from '@shared/wrestling'
import { MEDIA_CONFIGS, configFor, type MediaConfig } from '../lib/mediaConfig'
import { useSettings } from '../lib/hooks'
import {
  SIDEBAR_HIDDEN_SETTING,
  parseHiddenSections
} from '../lib/sidebarSections'
import lainAvatar from '../assets/lain.png'

// Active = phosphor indicator bar (inset shadow, no layout shift) + accent
// text; inactive stays quiet so the hierarchy reads at a glance.
function linkClass(isActive: boolean): string {
  return `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
    isActive
      ? 'bg-accent/10 text-accent shadow-[inset_2px_0_0_0_rgb(var(--accent))]'
      : 'text-gray-300 hover:bg-base-700/70 hover:text-white'
  }`
}

// Terminal-comment section header: "// LABEL ───"
function SectionLabel({ children }: { children: string }) {
  return (
    <div className="mx-3 mt-5 mb-1.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
      <span className="text-accent/60">{'//'}</span>
      {children}
      <span className="h-px flex-1 bg-base-700" aria-hidden="true" />
    </div>
  )
}

// A top link with an expandable child tree — the one disclosure idiom for
// every sidebar section that has sub-destinations (media types, Music,
// Japanese, Gacha).
function NavGroup({
  to,
  label,
  children,
  areaPaths = []
}: {
  to: string
  label: string
  children: { to: string; label: string }[]
  areaPaths?: string[] // extra routes that count as "inside" (sibling tabs)
}) {
  const location = useLocation()
  const paths = [to, ...areaPaths, ...children.map((c) => c.to)]
  // Auto-open when on the section's list, a sibling tab, or a child browse
  // page. '/people' needs an EXACT match: /people/:id is one shared detail
  // page (seiyuu, actors, artists and mangaka all land there), so a prefix
  // match would light up every section with a Voice Actors child on any
  // person's page. Unique children (/studios, …) keep prefix matching so
  // their own detail pages still count as "in this section".
  const onArea = paths.some((p) =>
    p === '/people' ? location.pathname === p : location.pathname.startsWith(p)
  )
  // `null` = follow the auto behaviour; true/false = the user's explicit choice.
  // It used to be `open || onArea`, which made the chevron a no-op for the one
  // section you were actually inside: onArea pinned it open no matter what the
  // button set. The override is cleared whenever you enter or leave the area,
  // so collapsing a section stays collapsed while you are in it, and coming
  // back later still auto-opens.
  const [override, setOverride] = useState<boolean | null>(null)
  const expanded = override ?? onArea
  useEffect(() => setOverride(null), [onArea])

  return (
    <div>
      <div className="flex items-center">
        <NavLink to={to} className={({ isActive }) => `flex-1 ${linkClass(isActive)}`}>
          {label}
        </NavLink>
        <button
          className="px-2 py-2 text-gray-500 hover:text-white"
          onClick={() => setOverride(!expanded)}
          title={expanded ? 'Collapse' : 'Expand'}
          aria-expanded={expanded}
          aria-label={`${expanded ? 'Collapse' : 'Expand'} ${label}`}
        >
          <span className={`inline-block transition-transform ${expanded ? 'rotate-90' : ''}`}>
            ›
          </span>
        </button>
      </div>

      {expanded && (
        <div className="ml-3 pl-3 border-l border-accent/15 space-y-0.5 mb-1">
          {children.map((c) => (
            <NavLink
              key={c.to}
              to={c.to}
              // Same '/people' caveat as onArea above: without `end`, this link
              // reads as active on every /people/:id person page.
              end={c.to === '/people'}
              className={({ isActive }) => linkClass(isActive)}
            >
              {c.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

function MediaSection({ cfg }: { cfg: MediaConfig }) {
  return (
    <NavGroup
      to={cfg.basePath}
      label={cfg.sidebarLabel ?? cfg.plural}
      children={cfg.children}
      areaPaths={(cfg.listTabs ?? []).map((t) => configFor(t.key).basePath)}
    />
  )
}

export default function Sidebar() {
  const { data: settings } = useSettings()
  // Sections hidden from Settings → General → Sidebar. Presentational only:
  // routes stay live so Ctrl+K and old links still land there.
  const hidden = parseHiddenSections(settings?.[SIDEBAR_HIDDEN_SETTING])
  const visible = (key: string) => !hidden.has(key)
  // A group header renders only while its group has something to show.
  const libraryEmpty =
    MEDIA_CONFIGS.filter((cfg) => !cfg.hideFromSidebar).every((cfg) => hidden.has(cfg.key)) &&
    ['music', 'wrestling', 'lists', 'tags'].every((k) => hidden.has(k))
  const playEmpty = hidden.has('quiz') && hidden.has('gacha')
  const learnEmpty = hidden.has('japanese') && hidden.has('english') && hidden.has('programming')

  return (
    <aside className="w-60 shrink-0 bg-base-800 border-r border-base-700 flex flex-col">
      <NavLink to="/" className="px-4 h-14 flex items-center gap-2.5 border-b border-base-700">
        {/* Lain avatar (same art as the app icon) + pixel-CRT brand with
            chromatic glitch (styles.css Wired chrome). */}
        <img src={lainAvatar} alt="" className="w-6 h-6" />
        <span className="sidebar-brand lain-crt brand-glitch text-lg font-bold tracking-tight">
          Navi<span className="text-accent">HUB</span>
        </span>
      </NavLink>

      <div className="flex-1 overflow-y-auto pt-3 pb-4 px-2">
        <NavLink to="/" end className={({ isActive }) => linkClass(isActive)}>
          Home
        </NavLink>
        {visible('checklist') && (
          <NavLink to="/checklist" className={({ isActive }) => linkClass(isActive)}>
            Checklist
          </NavLink>
        )}
        {/* Cross-library time-spent stats — daily/overview trio with Home + Checklist */}
        {visible('stats') && (
          <NavLink to="/stats" className={({ isActive }) => linkClass(isActive)}>
            Stats
          </NavLink>
        )}

        {!libraryEmpty && <SectionLabel>Library</SectionLabel>}

        <div className="space-y-0.5">
          {MEDIA_CONFIGS.filter((cfg) => !cfg.hideFromSidebar && visible(cfg.key)).map((cfg) => (
            <MediaSection key={cfg.key} cfg={cfg} />
          ))}
          {/* Standalone local-music section (not a MediaConfig — own tables/pages) */}
          {visible('music') && (
            <NavGroup
              to="/music"
              label="Music"
              children={[
                { to: '/music/liked', label: 'Liked' },
                { to: '/music/stats', label: 'Listening stats' }
              ]}
            />
          )}
          {/* Standalone wrestling section (not a MediaConfig — own tables/pages) */}
          {visible('wrestling') && (
            <NavGroup
              to="/wrestling"
              label="Wrestling"
              children={WRESTLING_PROMOTIONS.map((p) => ({
                to: `/wrestling/p/${p.id}`,
                label: p.short
              }))}
            />
          )}
          {visible('lists') && (
            <NavLink to="/lists" className={({ isActive }) => linkClass(isActive)}>
              Lists
            </NavLink>
          )}
          {visible('tags') && (
            <NavLink to="/tags" className={({ isActive }) => linkClass(isActive)}>
              Tags
            </NavLink>
          )}
        </div>

        {!playEmpty && <SectionLabel>Play</SectionLabel>}
        {!playEmpty && (
          <div className="space-y-0.5">
            {visible('quiz') && (
              <NavLink to="/quiz" className={({ isActive }) => linkClass(isActive)}>
                Quiz
              </NavLink>
            )}
            {visible('gacha') && (
              <NavGroup
                to="/gacha"
                label="Gacha"
                children={GACHA_GAMES.map((g) => ({ to: `/gacha/${g.id}`, label: g.short }))}
              />
            )}
          </div>
        )}

        {!learnEmpty && <SectionLabel>Learn</SectionLabel>}
        {!learnEmpty && (
          <div className="space-y-0.5">
            {visible('japanese') && (
              <NavGroup
                to="/japanese"
                label="Japanese"
                children={[
                  { to: '/japanese/roadmap', label: 'Roadmap' },
                  { to: '/japanese/review', label: 'Review' },
                  { to: '/japanese/dictionary', label: 'Dictionary' },
                  { to: '/japanese/kana', label: 'Drills' },
                  { to: '/japanese/guide', label: 'Guide' }
                ]}
              />
            )}
            {visible('english') && (
              <NavGroup
                to="/english"
                label="English"
                children={[
                  { to: '/english/dictionary', label: 'Dictionary' },
                  { to: '/english/review', label: 'Review' },
                  { to: '/english/deck', label: 'Deck' },
                  { to: '/english/writing', label: 'Writing' }
                ]}
              />
            )}
            {visible('programming') && (
              <NavGroup
                to="/programming"
                label="Programming"
                children={[
                  { to: '/programming/cheatsheets', label: 'Cheatsheets' },
                  { to: '/programming/practice', label: 'CLI practice' },
                  { to: '/programming/sql', label: 'SQL sandbox' },
                  { to: '/programming/regex-golf', label: 'Regex golf' }
                ]}
              />
            )}
          </div>
        )}
      </div>

      <div className="p-2 border-t border-base-700">
        {/* Decorative Wired status line (gray-600 = decorative per conventions) */}
        <div
          className="px-3 pt-1 pb-1.5 flex items-center gap-2 text-[10px] tracking-widest text-gray-600 uppercase"
          aria-hidden="true"
        >
          <span className="wired-dot inline-block w-1.5 h-1.5 rounded-full bg-accent" />
          Connected to the Wired
        </div>
        {/* Acquisition + system utilities live in the footer, off the browse tree */}
        <NavLink to="/bulk" className={({ isActive }) => linkClass(isActive)}>
          Bulk Import
        </NavLink>
        <NavLink to="/torrents" className={({ isActive }) => linkClass(isActive)}>
          Torrents
        </NavLink>
        <NavLink to="/tasks" className={({ isActive }) => linkClass(isActive)}>
          Tasks
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => linkClass(isActive)}>
          Settings
        </NavLink>
      </div>
    </aside>
  )
}
