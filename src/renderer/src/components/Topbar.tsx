import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import GameSessionIndicator from './GameSessionIndicator'
import TasksIndicator from './TasksIndicator'

// Persistent top bar with a global search box (submitting navigates to
// /search), the running-tasks pill, and the tracked-play-session pill.
export default function Topbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [q, setQ] = useState('')

  // Keep the box in sync when on the search page (e.g. back/forward).
  useEffect(() => {
    if (location.pathname === '/search') {
      const params = new URLSearchParams(location.search)
      setQ(params.get('q') ?? '')
    }
  }, [location])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const term = q.trim()
    if (term) navigate(`/search?q=${encodeURIComponent(term)}`)
  }

  return (
    // relative z-30 is LOAD-BEARING, not styling: backdrop-blur creates a
    // stacking context, so with z-index:auto this header paints at its DOM
    // position and <main> — its next sibling — paints over it. The tasks
    // dropdown, absolutely positioned INSIDE that context, would then render
    // behind any card it overlaps.
    <header className="relative z-30 h-14 shrink-0 border-b border-base-700 bg-base-800/60 backdrop-blur flex items-center gap-4 px-5">
      <form onSubmit={submit} role="search" className="w-full max-w-xl">
        <div className="relative">
          <input
            className="input pr-16"
            placeholder="Search titles, people, characters, studios…"
            aria-label="Search library"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <kbd className="kbd pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            Ctrl K
          </kbd>
        </div>
      </form>
      <div className="ml-auto flex items-center gap-2">
        <GameSessionIndicator />
        <TasksIndicator />
      </div>
    </header>
  )
}
