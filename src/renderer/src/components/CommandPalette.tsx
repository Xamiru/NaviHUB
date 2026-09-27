import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useDebouncedValue, useDialog } from '../lib/hooks'
import { MEDIA_CONFIGS, configFor, pathForMedia } from '../lib/mediaConfig'
import { WRESTLING_PROMOTIONS } from '@shared/wrestling'
import { Field } from './Field'
import { FX_ART } from '../lib/themeFxArt'
import { useAppTheme } from '../lib/useAppTheme'

interface PaletteItem {
  key: string
  label: string
  hint: string // right-aligned kind/section hint
  to: string
  icon?: string // Metal Gear item box art
}

// Metal Gear opens on the MGS2 item window: real destinations as item boxes.
const MGS_ITEMS: PaletteItem[] = [
  { key: 'item-home', label: 'Continue', hint: 'Home', to: '/', icon: FX_ART.mgsItems.ration },
  { key: 'item-search', label: 'Search', hint: 'Search', to: '/search', icon: FX_ART.mgsItems.scope },
  { key: 'item-seasonal', label: 'Seasonal', hint: 'Discover', to: '/anime/seasonal', icon: FX_ART.mgsItems.thermal },
  { key: 'item-settings', label: 'Settings', hint: 'System', to: '/settings', icon: FX_ART.mgsItems.card },
  { key: 'item-logs', label: 'Logs', hint: 'Repair', to: '/tasks/logs', icon: FX_ART.mgsItems.bandage },
  { key: 'item-tasks', label: 'Tasks', hint: 'Quiet work', to: '/tasks', icon: FX_ART.mgsItems.suppressor }
]

function dianeStamp(): string {
  return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }).toUpperCase()
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
  { key: 'nav-torrents', label: 'Torrents', hint: 'Go to', to: '/torrents' },
  { key: 'nav-tasks', label: 'Tasks', hint: 'Go to', to: '/tasks' },
  { key: 'nav-logs', label: 'Logs', hint: 'Go to', to: '/tasks/logs' },
  { key: 'nav-quiz', label: 'Quiz', hint: 'Go to', to: '/quiz' },
  { key: 'nav-wrestling', label: 'Wrestling', hint: 'Go to', to: '/wrestling' },
  { key: 'nav-wrestling-rated', label: 'Highest-rated matches', hint: 'Wrestling', to: '/wrestling/rated' },
  { key: 'nav-wrestling-collection', label: 'Wrestling collection', hint: 'Wrestling', to: '/wrestling/collection' },
  ...WRESTLING_PROMOTIONS.map((p) => ({
    key: `nav-wrestling-${p.id}`,
    label: p.name,
    hint: 'Wrestling',
    to: `/wrestling/p/${p.id}`
  })),
  { key: 'nav-football', label: 'Football Archive', hint: 'Go to', to: '/football' },
  { key: 'nav-football-search', label: 'Search Football Archive', hint: 'Football', to: '/football/search' },
  { key: 'nav-football-current', label: 'Current football', hint: 'Football', to: '/football/current' },
  { key: 'nav-football-competitions', label: 'Football competitions', hint: 'Football', to: '/football/competitions' },
  { key: 'nav-football-teams', label: 'Football teams', hint: 'Football', to: '/football/teams' },
  { key: 'nav-football-people', label: 'Football players and managers', hint: 'Football', to: '/football/people' },
  { key: 'nav-football-media', label: 'Football media', hint: 'Football', to: '/football/media' },
  { key: 'nav-football-quiz', label: 'Football quizzes', hint: 'Football', to: '/football/quiz' },
  { key: 'nav-football-sync', label: 'Football sources', hint: 'Football', to: '/football/sync' },
  { key: 'nav-japanese', label: 'Japanese', hint: 'Go to', to: '/japanese' },
  { key: 'nav-jp-tutor', label: 'Japanese tutor plan', hint: 'Go to', to: '/japanese/tutor' },
  { key: 'nav-jp-roleplay', label: 'Japanese branching role-play', hint: 'Go to', to: '/japanese/roleplay' },
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
  { key: 'nav-jp-listen', label: 'Japanese listening', hint: 'Go to', to: '/japanese/listen' },
  { key: 'nav-jp-shiritori', label: 'Shiritori', hint: 'Go to', to: '/japanese/shiritori' },
  { key: 'nav-jp-feed', label: 'Japanese sentence feed', hint: 'Go to', to: '/japanese/feed' },
  { key: 'nav-jp-sentences', label: 'Japanese sentence games', hint: 'Go to', to: '/japanese/sentences' },
  { key: 'nav-jp-arcade', label: 'Japanese arcade races', hint: 'Go to', to: '/japanese/arcade' },
  { key: 'nav-jp-reading', label: 'Japanese graded reading', hint: 'Go to', to: '/japanese/reading' },
  { key: 'nav-jp-phonology', label: 'Japanese sound foundation', hint: 'Go to', to: '/japanese/phonology' },
  { key: 'nav-jp-output', label: 'Controlled Japanese output', hint: 'Go to', to: '/japanese/output' },
  { key: 'nav-jp-immersion', label: 'Japanese long-form listening', hint: 'Go to', to: '/japanese/immersion' },
  { key: 'nav-jp-leech-drill', label: 'Japanese leech drill', hint: 'Go to', to: '/japanese/leeches/drill' },
  { key: 'nav-jp-confusables', label: 'Japanese confusables', hint: 'Go to', to: '/japanese/confusables' },
  { key: 'nav-jp-kana', label: 'Japanese typing drills', hint: 'Go to', to: '/japanese/kana' },
  { key: 'nav-jp-mine', label: 'Mine Japanese words', hint: 'Go to', to: '/japanese/mine' },
  { key: 'nav-jp-quiz', label: 'Japanese practice quiz', hint: 'Go to', to: '/japanese/quiz' },
  { key: 'nav-jp-test', label: 'JLPT test', hint: 'Go to', to: '/japanese/test' },
  { key: 'nav-jp-dictionary', label: 'Japanese dictionary', hint: 'Go to', to: '/japanese/dictionary' },
  { key: 'nav-jp-loanwords', label: 'Japanese loanwords', hint: 'Go to', to: '/japanese/loanwords' },
  { key: 'nav-jp-grammar-quiz', label: 'Japanese grammar drill', hint: 'Go to', to: '/japanese/grammar/quiz' },
  { key: 'nav-jp-kanji-quiz', label: 'Build-a-kanji quiz', hint: 'Go to', to: '/japanese/kanji/quiz' },
  { key: 'nav-english', label: 'English', hint: 'Go to', to: '/english' },
  { key: 'nav-english-dict', label: 'English dictionary', hint: 'Go to', to: '/english/dictionary' },
  { key: 'nav-english-review', label: 'English review', hint: 'Go to', to: '/english/review' },
  { key: 'nav-english-deck', label: 'English deck (ranks, leeches, prune)', hint: 'Go to', to: '/english/deck' },
  { key: 'nav-english-writing', label: 'English writing', hint: 'Go to', to: '/english/writing' },
  { key: 'nav-english-vocab', label: 'English vocabulary test', hint: 'Go to', to: '/english/vocab' },
  { key: 'nav-english-spelling', label: 'English spelling test', hint: 'Go to', to: '/english/spelling' },
  { key: 'nav-english-reading', label: 'English reading test', hint: 'Go to', to: '/english/reading' },
  { key: 'nav-english-mechanics', label: 'English mechanics test', hint: 'Go to', to: '/english/mechanics' },
  { key: 'nav-english-use', label: 'Use of English (cloze, word formation, transformations)', hint: 'Go to', to: '/english/use' },
  { key: 'nav-english-punctuate', label: 'Punctuate it (English game)', hint: 'Go to', to: '/english/games/punctuate' },
  { key: 'nav-english-spot', label: 'Spot the error (English game)', hint: 'Go to', to: '/english/games/spot' },
  { key: 'nav-english-match', label: 'Collocation match (English game)', hint: 'Go to', to: '/english/games/match' },
  { key: 'nav-programming', label: 'Programming', hint: 'Go to', to: '/programming' },
  { key: 'nav-prog-cheatsheets', label: 'Cheatsheets', hint: 'Go to', to: '/programming/cheatsheets' },
  { key: 'nav-prog-practice', label: 'CLI practice', hint: 'Go to', to: '/programming/practice' },
  { key: 'nav-prog-quiz', label: 'Programming quiz', hint: 'Go to', to: '/programming/quiz' },
  { key: 'nav-prog-sql', label: 'SQL sandbox', hint: 'Go to', to: '/programming/sql' },
  { key: 'nav-prog-regex', label: 'Regex golf', hint: 'Go to', to: '/programming/regex-golf' },
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
  const { theme } = useAppTheme()
  const [stamp] = useState(dianeStamp)
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
    if (!q) return theme === 'metal-gear' ? [...MGS_ITEMS, ...nav] : nav

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
  }, [query, results, theme])

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
    } else if (
      (e.key === 'ArrowRight' || e.key === 'ArrowLeft') &&
      theme === 'metal-gear' &&
      !query.trim() &&
      selIdx < MGS_ITEMS.length
    ) {
      e.preventDefault()
      const step = e.key === 'ArrowRight' ? 1 : MGS_ITEMS.length - 1
      setSel((selIdx + step) % MGS_ITEMS.length)
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
        className={`palette palette-${theme} ${theme !== 'miku' ? 'theme-dark' : ''} card mt-24 w-full max-w-xl overflow-hidden p-0`}
        style={theme === 'miku' ? { backgroundImage: `url(${FX_ART.mikuSongSelect})` } : undefined}
      >
        {theme === 'twin-peaks' && (
          <div className="palette-diane" style={{ backgroundImage: `url(${FX_ART.peaksDiane})` }} aria-hidden="true">
            <span>{stamp}, TAPE FOR DIANE</span>
          </div>
        )}
        {theme === 'lain' && (
          <div className="palette-navi" style={{ backgroundImage: `url(${FX_ART.lainNavi})` }} aria-hidden="true" />
        )}
        <div className="palette-input-row flex items-center border-b border-base-700">
        {theme === 'lain' && <span className="palette-prefix pl-4" aria-hidden="true">navi://</span>}
        <Field label="Search commands and library" hiddenLabel className="contents">
          <input
            className="input rounded-none border-0 px-4 py-3"
            placeholder={theme === 'twin-peaks' ? 'Diane, I\'m looking for…' : 'Search your library, or jump to a section…'}
            value={query}
            autoFocus
            onChange={(e) => {
              setQuery(e.target.value)
              setSel(0)
            }}
            onKeyDown={onKeyDown}
          />
        </Field>
        </div>
        <div ref={listRef} className="max-h-80 overflow-y-auto py-1">
          {items.length === 0 ? (
            <p className="px-4 py-3 text-sm text-gray-500">
              {isFetching ? 'Searching…' : 'Nothing matches.'}
            </p>
          ) : (
            <>
            {theme === 'metal-gear' && !query.trim() && (
              <div className="palette-items" role="group" aria-label="Item window">
                {MGS_ITEMS.map((item, i) => (
                  <button
                    key={item.key}
                    data-idx={i}
                    className={`palette-item ${i === selIdx ? 'palette-item-on' : ''}`}
                    onMouseMove={() => setSel(i)}
                    onClick={() => go(item)}
                  >
                    <img src={item.icon} alt="" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
            {items.map((item, i) => item.icon ? null : (
              <button
                key={item.key}
                data-idx={i}
                className={`palette-row flex w-full items-center gap-3 px-4 py-2 text-left text-sm ${
                  i === selIdx ? 'palette-row-on bg-accent/20 text-white' : 'text-gray-300'
                }`}
                onMouseMove={() => setSel(i)}
                onClick={() => go(item)}
              >
                <span className="min-w-0 flex-1 truncate">{item.label}</span>
                <span className="shrink-0 text-xs text-gray-500">{item.hint}</span>
              </button>
            ))}
            </>
          )}
        </div>
        <div className="border-t border-base-700 px-4 py-1.5 text-[10px] text-gray-500">
          ↑↓ navigate · ↵ open · esc close · / also opens
        </div>
      </div>
    </div>
  )
}
