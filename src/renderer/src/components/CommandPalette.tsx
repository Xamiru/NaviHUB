import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useDebouncedValue, useDialog } from '../lib/hooks'
import { MEDIA_CONFIGS, configFor, pathForMedia } from '../lib/mediaConfig'
import { GACHA_GAMES } from '@shared/gacha'

interface PaletteItem {
  key: string
  label: string
  hint: string // right-aligned kind/section hint
  to: string
}

// Static jump-to-section commands, substring-filtered by the query.
// Text-only rows (no icon column) — same idiom as the sidebar.
const NAV_ITEMS: PaletteItem[] = [
  { key: 'nav-home', label: 'Home', hint: 'Go to', to: '/' },
  { key: 'nav-checklist', label: 'Checklist', hint: 'Go to', to: '/checklist' },
  { key: 'nav-stats', label: 'Stats', hint: 'Go to', to: '/stats' },
  ...MEDIA_CONFIGS.map((cfg) => ({
    key: `nav-${cfg.key}`,
    label: cfg.plural,
    hint: 'Go to',
    to: cfg.basePath
  })),
  { key: 'nav-anime-seasonal', label: 'Seasonal anime', hint: 'Go to', to: '/anime/seasonal' },
  { key: 'nav-anime-songs', label: 'Songs', hint: 'Go to', to: '/anime/songs' },
  { key: 'nav-music', label: 'Music', hint: 'Go to', to: '/music' },
  { key: 'nav-music-liked', label: 'Liked songs', hint: 'Go to', to: '/music/liked' },
  { key: 'nav-music-stats', label: 'Listening stats', hint: 'Go to', to: '/music/stats' },
  { key: 'nav-lists', label: 'Lists', hint: 'Go to', to: '/lists' },
  { key: 'nav-tags', label: 'Tags', hint: 'Go to', to: '/tags' },
  { key: 'nav-watch', label: 'Watch a video file', hint: 'Go to', to: '/watch' },
  { key: 'nav-torrents', label: 'Torrents', hint: 'Go to', to: '/torrents' },
  { key: 'nav-quiz', label: 'Quiz', hint: 'Go to', to: '/quiz' },
  { key: 'nav-gacha', label: 'Gacha', hint: 'Go to', to: '/gacha' },
  ...GACHA_GAMES.map((g) => ({
    key: `nav-gacha-${g.id}`,
    label: g.name,
    hint: 'Gacha',
    to: `/gacha/${g.id}`
  })),
  { key: 'nav-japanese', label: 'Japanese', hint: 'Go to', to: '/japanese' },
  { key: 'nav-jp-review', label: 'Japanese review', hint: 'Go to', to: '/japanese/review' },
  { key: 'nav-jp-roadmap', label: 'Japanese roadmap', hint: 'Go to', to: '/japanese/roadmap' },
  { key: 'nav-jp-guide', label: 'Japanese guide', hint: 'Go to', to: '/japanese/guide' },
  { key: 'nav-jp-analyze', label: 'Analyze Japanese text', hint: 'Go to', to: '/japanese/analyze' },
  { key: 'nav-jp-coverage', label: 'Japanese comprehension', hint: 'Go to', to: '/japanese/coverage' },
  { key: 'nav-jp-write', label: 'Kanji writing drill', hint: 'Go to', to: '/japanese/write' },
  { key: 'nav-jp-stats', label: 'Japanese stats', hint: 'Go to', to: '/japanese/stats' },
  { key: 'nav-jp-grammar', label: 'Japanese grammar library', hint: 'Go to', to: '/japanese/grammar' },
  { key: 'nav-jp-kanji', label: 'Kanji by parts', hint: 'Go to', to: '/japanese/kanji' },
  { key: 'nav-jp-pitch', label: 'Pitch accent drills', hint: 'Go to', to: '/japanese/pitch' },
  { key: 'nav-jp-listen', label: 'Japanese dictation', hint: 'Go to', to: '/japanese/listen' },
  { key: 'nav-jp-shiritori', label: 'Shiritori', hint: 'Go to', to: '/japanese/shiritori' },
  { key: 'nav-jp-feed', label: 'Japanese sentence feed', hint: 'Go to', to: '/japanese/feed' },
  { key: 'nav-jp-confusables', label: 'Japanese confusables', hint: 'Go to', to: '/japanese/confusables' },
  { key: 'nav-english', label: 'English', hint: 'Go to', to: '/english' },
  { key: 'nav-english-dict', label: 'English dictionary', hint: 'Go to', to: '/english/dictionary' },
  { key: 'nav-english-review', label: 'English review', hint: 'Go to', to: '/english/review' },
  { key: 'nav-english-writing', label: 'English writing', hint: 'Go to', to: '/english/writing' },
  { key: 'nav-programming', label: 'Programming', hint: 'Go to', to: '/programming' },
  { key: 'nav-prog-cheatsheets', label: 'Cheatsheets', hint: 'Go to', to: '/programming/cheatsheets' },
  { key: 'nav-prog-practice', label: 'CLI practice', hint: 'Go to', to: '/programming/practice' },
  { key: 'nav-prog-quiz', label: 'Programming quiz', hint: 'Go to', to: '/quiz/programming' },
  { key: 'nav-settings', label: 'Settings', hint: 'Go to', to: '/settings' }
]

// Ctrl/Cmd+K (or / outside inputs) overlay: jump-to-section commands + global
// search over media/people/studios/characters, all keyboard-driven. Mounted
// only in App's shell branch — the immersive manga reader never sees it.
export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Global shortcuts live here so the palette works from any page.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
        return
      }
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const t = e.target as HTMLElement
        if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t.isContentEditable)
          return
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Close if the route changes underneath us (back button etc.).
  useEffect(() => setOpen(false), [location.pathname])

  if (!open) return null
  return <PalettePanel onClose={() => setOpen(false)} onGo={(to) => navigate(to)} />
}

function PalettePanel({ onClose, onGo }: { onClose: () => void; onGo: (to: string) => void }) {
  const [query, setQuery] = useState('')
  const [sel, setSel] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)
  const panelRef = useDialog(onClose) // Escape + focus handling

  const debounced = useDebouncedValue(query, 250)
  const term = debounced.trim()
  const { data: results, isFetching } = useQuery({
    queryKey: qk.search(term),
    queryFn: () => api.search.global(term),
    enabled: term.length > 0
  })

  const items = useMemo<PaletteItem[]>(() => {
    const q = query.trim().toLowerCase()
    const nav = q ? NAV_ITEMS.filter((i) => i.label.toLowerCase().includes(q)) : NAV_ITEMS
    if (!q) return nav

    const found: PaletteItem[] = []
    if (results) {
      for (const m of results.media.slice(0, 6)) {
        found.push({
          key: `media-${m.mediaType}-${m.id}`,
          label: m.title,
          hint: configFor(m.mediaType).singular,
          to: pathForMedia(m)
        })
      }
      for (const p of results.people.slice(0, 4)) {
        found.push({ key: `person-${p.id}`, label: p.name, hint: 'Person', to: `/people/${p.id}` })
      }
      for (const c of results.companies.slice(0, 3)) {
        found.push({ key: `company-${c.id}`, label: c.name, hint: 'Studio', to: `/studios/${c.id}` })
      }
      for (const c of results.characters.slice(0, 4)) {
        found.push({ key: `char-${c.id}`, label: c.name, hint: 'Character', to: `/characters/${c.id}` })
      }
    }
    found.push({
      key: 'search-all',
      label: `Search everywhere for “${query.trim()}”`,
      hint: 'Search',
      to: `/search?q=${encodeURIComponent(query.trim())}`
    })
    return [...found, ...nav]
  }, [query, results])

  // Clamp + scroll the selection as the list changes.
  const selIdx = Math.min(sel, Math.max(0, items.length - 1))
  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-idx="${selIdx}"]`)
      ?.scrollIntoView({ block: 'nearest' })
  }, [selIdx, items])

  function go(item: PaletteItem | undefined) {
    if (!item) return
    onClose()
    onGo(item.to)
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSel((s) => (s + 1) % Math.max(1, items.length))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSel((s) => (s - 1 + Math.max(1, items.length)) % Math.max(1, items.length))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      go(items[selIdx])
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        tabIndex={-1}
        className="card mt-24 w-full max-w-xl overflow-hidden p-0"
      >
        <input
          className="input rounded-none border-0 border-b border-base-700 px-4 py-3"
          placeholder="Search your library, or jump to a section…"
          value={query}
          autoFocus
          onChange={(e) => {
            setQuery(e.target.value)
            setSel(0)
          }}
          onKeyDown={onKeyDown}
        />
        <div ref={listRef} className="max-h-80 overflow-y-auto py-1">
          {items.length === 0 ? (
            <p className="px-4 py-3 text-sm text-gray-500">
              {isFetching ? 'Searching…' : 'Nothing matches.'}
            </p>
          ) : (
            items.map((item, i) => (
              <button
                key={item.key}
                data-idx={i}
                className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm ${
                  i === selIdx ? 'bg-accent/20 text-white' : 'text-gray-300'
                }`}
                onMouseMove={() => setSel(i)}
                onClick={() => go(item)}
              >
                <span className="min-w-0 flex-1 truncate">{item.label}</span>
                <span className="shrink-0 text-xs text-gray-500">{item.hint}</span>
              </button>
            ))
          )}
        </div>
        <div className="border-t border-base-700 px-4 py-1.5 text-[10px] text-gray-500">
          ↑↓ navigate · ↵ open · esc close · / also opens
        </div>
      </div>
    </div>
  )
}
