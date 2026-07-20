import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { MEDIA_CONFIGS, configFor, type MediaConfig } from '../lib/mediaConfig'
import { api } from '../lib/api'
import { usePlayer, quizSongToTrack } from '../lib/player'
import { toast } from '../lib/toast'
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

// A media type with its expandable browse children (e.g. Anime → Voice Actors /
// Studios, Movies → Actors / Directors).
function MediaSection({ cfg }: { cfg: MediaConfig }) {
  const location = useLocation()
  // Sibling list routes that belong to this same section (e.g. /tv under Movies).
  const areaPaths = [
    cfg.basePath,
    ...(cfg.listTabs ?? []).map((t) => configFor(t.key).basePath),
    ...cfg.children.map((c) => c.to)
  ]
  // Auto-open when on this section's list, a sibling tab, or a child browse
  // page. '/people' needs an EXACT match: /people/:id is one shared detail
  // page (seiyuu, actors, artists and mangaka all land there), so a prefix
  // match would light up every section with a Voice Actors child on any
  // person's page. Unique children (/studios, …) keep prefix matching so
  // their own detail pages still count as "in this section".
  const onArea = areaPaths.some((p) =>
    p === '/people' ? location.pathname === p : location.pathname.startsWith(p)
  )
  const [open, setOpen] = useState(false)
  const expanded = open || onArea

  return (
    <div>
      <div className="flex items-center">
        <NavLink to={cfg.basePath} className={({ isActive }) => `flex-1 ${linkClass(isActive)}`}>
          {cfg.sidebarLabel ?? cfg.plural}
        </NavLink>
        <button
          className="px-2 py-2 text-gray-500 hover:text-white"
          onClick={() => setOpen((v) => !v)}
          title={expanded ? 'Collapse' : 'Expand'}
        >
          <span className={`inline-block transition-transform ${expanded ? 'rotate-90' : ''}`}>
            ›
          </span>
        </button>
      </div>

      {expanded && (
        <div className="ml-3 pl-3 border-l border-accent/15 space-y-0.5 mb-1">
          {cfg.children.map((c) => (
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

// Kicks off a shuffled queue of every playable theme song in the library —
// the song pool built for the quiz doubles as the "all music" list. Passing
// the ordered pool with {shuffle: true} lets the bar's shuffle toggle restore
// library order when switched off.
function ShuffleMusicButton() {
  const player = usePlayer()
  const [busy, setBusy] = useState(false)

  async function shuffleAll() {
    if (busy) return
    setBusy(true)
    try {
      const pool = await api.quiz.songPool({})
      if (pool.length === 0) {
        toast('No theme songs in the library yet — fetch some from an anime page first.')
        return
      }
      // Random start too — {shuffle: true} keeps the start track first, so a
      // fixed 0 would always open with the same song.
      player.playQueue(pool.map(quizSongToTrack), Math.floor(Math.random() * pool.length), {
        shuffle: true
      })
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Could not load the song library')
    } finally {
      setBusy(false)
    }
  }

  return (
    <button onClick={shuffleAll} disabled={busy} className={`w-full ${linkClass(false)}`}>
      {busy ? 'Shuffling…' : 'Shuffle Themes'}
    </button>
  )
}

export default function Sidebar() {
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

        <SectionLabel>Library</SectionLabel>

        <div className="space-y-0.5">
          {MEDIA_CONFIGS.filter((cfg) => !cfg.hideFromSidebar).map((cfg) => (
            <MediaSection key={cfg.key} cfg={cfg} />
          ))}
          {/* Standalone local-music section (not a MediaConfig — own tables/pages) */}
          <NavLink to="/music" className={({ isActive }) => linkClass(isActive)}>
            Music
          </NavLink>
          {/* Cross-library time-spent stats */}
          <NavLink to="/stats" className={({ isActive }) => linkClass(isActive)}>
            Stats
          </NavLink>
        </div>

        <SectionLabel>Curate</SectionLabel>
        <div className="space-y-0.5">
          <NavLink to="/lists" className={({ isActive }) => linkClass(isActive)}>
            Lists
          </NavLink>
          <NavLink to="/tags" className={({ isActive }) => linkClass(isActive)}>
            Tags
          </NavLink>
        </div>

        <SectionLabel>Acquire</SectionLabel>
        <div className="space-y-0.5">
          <NavLink to="/torrents" className={({ isActive }) => linkClass(isActive)}>
            Torrents
          </NavLink>
        </div>

        <SectionLabel>Play</SectionLabel>
        <div className="space-y-0.5">
          <NavLink to="/quiz" className={({ isActive }) => linkClass(isActive)}>
            Quiz
          </NavLink>
          <ShuffleMusicButton />
        </div>

        <SectionLabel>Learn</SectionLabel>
        <NavLink to="/japanese" className={({ isActive }) => linkClass(isActive)}>
          Japanese
        </NavLink>

        <SectionLabel>Gacha</SectionLabel>
        <NavLink to="/gacha" className={({ isActive }) => linkClass(isActive)}>
          Gacha
        </NavLink>
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
        <NavLink to="/settings" className={({ isActive }) => linkClass(isActive)}>
          Settings
        </NavLink>
      </div>
    </aside>
  )
}
