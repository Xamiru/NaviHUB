import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { MEDIA_CONFIGS, configFor, type MediaConfig } from '../lib/mediaConfig'
import { api } from '../lib/api'
import { usePlayer, quizSongToTrack } from '../lib/player'
import { toast } from '../lib/toast'

// Future media types: visible-but-disabled placeholders.
const COMING_SOON = [{ label: 'Games', icon: '◈' }]

function linkClass(isActive: boolean): string {
  return `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
    isActive ? 'bg-accent/20 text-white' : 'text-gray-300 hover:bg-base-700 hover:text-white'
  }`
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
  // Auto-open when on this section's list, a sibling tab, or a child browse page.
  const onArea = areaPaths.some((p) => location.pathname.startsWith(p))
  const [open, setOpen] = useState(false)
  const expanded = open || onArea

  return (
    <div>
      <div className="flex items-center">
        <NavLink to={cfg.basePath} className={({ isActive }) => `flex-1 ${linkClass(isActive)}`}>
          <span className="w-4 text-center opacity-80">{cfg.icon}</span>
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
        <div className="ml-3 pl-3 border-l border-base-700 space-y-0.5 mb-1">
          {cfg.children.map((c) => (
            <NavLink key={c.to} to={c.to} className={({ isActive }) => linkClass(isActive)}>
              <span className="w-4 text-center opacity-80">{c.icon}</span>
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
      <span className="w-4 text-center opacity-80">🔀</span>
      {busy ? 'Shuffling…' : 'Shuffle Music'}
    </button>
  )
}

export default function Sidebar() {
  return (
    <aside className="w-60 shrink-0 bg-base-800 border-r border-base-700 flex flex-col">
      <NavLink to="/" className="px-4 h-14 flex items-center border-b border-base-700">
        <span className="text-lg font-bold tracking-tight">
          Navi<span className="text-accent">HUB</span>
        </span>
      </NavLink>

      <div className="flex-1 overflow-y-auto py-4 px-2">
        <NavLink to="/" end className={({ isActive }) => `mb-2 ${linkClass(isActive)}`}>
          <span className="w-4 text-center opacity-80">⌂</span> Home
        </NavLink>

        <div className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
          Library
        </div>

        <div className="space-y-1">
          {MEDIA_CONFIGS.filter((cfg) => !cfg.hideFromSidebar).map((cfg) => (
            <MediaSection key={cfg.key} cfg={cfg} />
          ))}
        </div>

        <div className="px-3 mt-4 mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
          Curate
        </div>
        <NavLink to="/lists" className={({ isActive }) => linkClass(isActive)}>
          <span className="w-4 text-center opacity-80">📋</span> Lists
        </NavLink>

        <div className="px-3 mt-4 mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
          Play
        </div>
        <NavLink to="/quiz" className={({ isActive }) => linkClass(isActive)}>
          <span className="w-4 text-center opacity-80">🎵</span> Quiz
        </NavLink>
        <ShuffleMusicButton />

        <div className="px-3 mt-4 mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
          Learn
        </div>
        <NavLink to="/japanese" className={({ isActive }) => linkClass(isActive)}>
          <span className="w-4 text-center opacity-80">🈶</span> Japanese
        </NavLink>

        {/* Future media types (disabled) */}
        <nav className="space-y-0.5 mt-1">
          {COMING_SOON.map((it) => (
            <div
              key={it.label}
              title="Coming soon"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-600 cursor-not-allowed"
            >
              <span className="w-4 text-center opacity-50">{it.icon}</span>
              {it.label}
            </div>
          ))}
        </nav>
      </div>

      <div className="p-2 border-t border-base-700">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
              isActive ? 'bg-accent/20 text-white' : 'text-gray-400 hover:bg-base-700'
            }`
          }
        >
          <span className="w-4 text-center">⚙</span> Settings
        </NavLink>
      </div>
    </aside>
  )
}
