import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import type { SavedQuote } from '@shared/types'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import EmptyState from '../components/EmptyState'
import ThemedFailure from '../components/theme/ThemedFailure'
import { Field } from '../components/Field'
import QuoteCollection from '../components/quotes/QuoteCollection'
import QuoteDialog from '../components/quotes/QuoteDialog'
import QuoteFocus from '../components/quotes/QuoteFocus'
import QuoteOfTheDay from '../components/quotes/QuoteOfTheDay'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useDebouncedValue } from '../lib/hooks'
import { quoteTypeLabel } from '../lib/quoteLinks'

const ALL = '__all'
const FAVORITES = '__favorites'

function matches(q: SavedQuote, needle: string): boolean {
  return [q.text, q.translation, q.speakerName, q.sourceTitle, q.locator, q.note, ...q.themes].some(
    (field) => field != null && field.toLowerCase().includes(needle)
  )
}

export default function QuotesPage() {
  const [params, setParams] = useSearchParams()
  const [search, setSearch] = usePersistedState('quotesSearch', '')
  const [shelf, setShelf] = usePersistedState<string>('quotesShelf', ALL)
  const [theme, setTheme] = usePersistedState<string | null>('quotesTheme', null)
  const [adding, setAdding] = useState(false)
  const [todayFocus, setTodayFocus] = useState<SavedQuote | null>(null)
  const needle = useDebouncedValue(search, 200).trim().toLowerCase()

  const query = useQuery({ queryKey: qk.quotes.list({}), queryFn: () => api.quotes.list({}) })
  const quotes = useMemo(() => query.data ?? [], [query.data])

  // Ctrl+K's "Add quote" lands here with ?add=1; consume it so Back and a
  // reload do not reopen the dialog.
  useEffect(() => {
    if (params.get('add') !== '1') return
    setAdding(true)
    const next = new URLSearchParams(params)
    next.delete('add')
    setParams(next, { replace: true })
  }, [params, setParams])

  const types = useMemo(() => {
    const counts = new Map<string, number>()
    for (const q of quotes) counts.set(quoteTypeLabel(q), (counts.get(quoteTypeLabel(q)) ?? 0) + 1)
    return [...counts.entries()]
  }, [quotes])
  const themes = useMemo(() => {
    const counts = new Map<string, number>()
    for (const q of quotes) for (const t of q.themes) counts.set(t, (counts.get(t) ?? 0) + 1)
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]))
  }, [quotes])
  const favoriteCount = quotes.filter((q) => q.favorite).length

  // A remembered shelf or theme with nothing left in it falls back to All.
  const activeShelf =
    shelf === FAVORITES ? (favoriteCount ? FAVORITES : ALL) : types.some(([t]) => t === shelf) ? shelf : ALL
  const activeTheme = theme && themes.some(([t]) => t === theme) ? theme : null

  const visible = quotes.filter(
    (q) =>
      (activeShelf === ALL ||
        (activeShelf === FAVORITES ? q.favorite : quoteTypeLabel(q) === activeShelf)) &&
      (!activeTheme || q.themes.includes(activeTheme)) &&
      (!needle || matches(q, needle))
  )
  const filtered = activeShelf !== ALL || activeTheme != null || needle !== ''

  return (
    <div className="mx-auto max-w-[1600px] p-6">
      <PageHeader
        title="Quotes"
        subtitle="Lines worth keeping, from everything you read, watch and play."
        actions={
          <button type="button" className="btn-primary" onClick={() => setAdding(true)}>
            Add quote
          </button>
        }
      />

      {query.isError ? (
        <ThemedFailure message="Could not load your quotes." onRetry={() => void query.refetch()} />
      ) : query.isPending ? (
        <PageStatus>Loading quotes…</PageStatus>
      ) : quotes.length === 0 ? (
        <EmptyState
          title="No quotes yet"
          body={
            <p className="mx-auto max-w-lg">
              Add one here or from a title, character or person page. In the book reader, select
              text and press Q; in the video player, press Q to keep the subtitle on screen. VN
              notebook entries filed as quotes appear here too.
            </p>
          }
          action={
            <button type="button" className="btn-primary" onClick={() => setAdding(true)}>
              Add quote
            </button>
          }
        />
      ) : (
        <>
          {!filtered && quotes.length >= 3 && (
            <div className="mb-8">
              <QuoteOfTheDay quotes={quotes} onOpen={setTodayFocus} />
            </div>
          )}

          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Field label="Search quotes" hiddenLabel className="contents">
              <input
                className="input w-64"
                type="search"
                placeholder="Search lines, speakers, titles…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Field>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Show">
              <ShelfPill label="All" count={quotes.length} active={activeShelf === ALL} onClick={() => setShelf(ALL)} />
              {favoriteCount > 0 && (
                <ShelfPill
                  label="Favorites"
                  count={favoriteCount}
                  active={activeShelf === FAVORITES}
                  onClick={() => setShelf(FAVORITES)}
                />
              )}
              {types.length > 1 &&
                types.map(([t, n]) => (
                  <ShelfPill key={t} label={t} count={n} active={activeShelf === t} onClick={() => setShelf(t)} />
                ))}
            </div>
          </div>

          {themes.length > 0 && (
            <div className="mb-6 flex flex-wrap items-center gap-2" role="group" aria-label="Themes">
              <span className="text-xs uppercase tracking-wider text-ink-muted">Themes</span>
              {themes.map(([t, n]) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={activeTheme === t}
                  className={activeTheme === t ? 'chip-toggle chip-toggle-active text-xs' : 'chip-toggle text-xs'}
                  onClick={() => setTheme(activeTheme === t ? null : t)}
                >
                  {t} <span className="text-ink-muted">{n}</span>
                </button>
              ))}
            </div>
          )}

          {visible.length === 0 ? (
            <EmptyState title="Nothing matches" body="Try another search, shelf or theme." />
          ) : (
            <QuoteCollection quotes={visible} />
          )}
        </>
      )}

      {adding && <QuoteDialog onClose={() => setAdding(false)} />}
      {todayFocus && (
        <QuoteFocus quotes={[todayFocus]} index={0} onIndex={() => {}} onClose={() => setTodayFocus(null)} />
      )}
    </div>
  )
}

function ShelfPill({
  label,
  count,
  active,
  onClick
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button type="button" aria-pressed={active} className={active ? 'pill pill-active' : 'pill'} onClick={onClick}>
      {label} <span className={active ? '' : 'text-ink-muted'}>{count}</span>
    </button>
  )
}
