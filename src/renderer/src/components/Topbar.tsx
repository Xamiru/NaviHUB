import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

// Persistent top bar with a global search box. Submitting navigates to /search.
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
    <header className="h-14 shrink-0 border-b border-base-700 bg-base-800/60 backdrop-blur flex items-center px-5">
      <form onSubmit={submit} className="w-full max-w-xl">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">⌕</span>
          <input
            className="input pl-8"
            placeholder="Search anime, voice actors, studios, characters…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </form>
    </header>
  )
}
