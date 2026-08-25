import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useDebouncedValue, useIncrementalList } from '../lib/hooks'
import { confirmDialog } from '../lib/confirm'
import { toast } from '../lib/toast'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import StatTile from '../components/StatTile'
import { Group, Pill } from '../components/PillGroup'
import { LEECH_LAPSES, overdueDays } from '@shared/srs'
import type { EnDeckWord } from '@shared/types'
import EditorialDetailFrame from '../components/EditorialDetailFrame'
import ContextPanel, { ContextFact } from '../components/ContextPanel'

// The English deck, laid bare: every saved word with its frequency rank, SRS
// state and lapse count, so the auto-save-misses loop (vocab/spelling misses
// enter the deck) can be pruned by hand — a 40k-rank word does not deserve
// the same schedule as one you need. Deliberately manual: filters + a bulk
// "remove what is shown" behind a confirm, never auto-pruning.

type Filter = 'all' | 'due' | 'leeches' | 'rare' | 'unranked'
type Sort = 'saved' | 'rank' | 'lapses' | 'due'
const RARE_PILLS = [10000, 25000, 40000]

function dueLabel(w: EnDeckWord): string {
  if (w.status === 'new') return 'new'
  if (!w.dueAt) return '—'
  const over = overdueDays(w.dueAt)
  if (over > 0) return `${over}d overdue`
  const ms = Date.parse(w.dueAt.replace(' ', 'T') + 'Z') - Date.now()
  if (ms <= 0) return 'due'
  const days = Math.round(ms / 86_400_000)
  return days === 0 ? 'today' : `in ${days}d`
}

export default function EnglishDeckPage() {
  const qc = useQueryClient()
  const [filter, setFilter] = usePersistedState<Filter>('enDeckFilter', 'all')
  const [rareMin, setRareMin] = usePersistedState<number>('enDeckRareMin', 25000)
  const [sort, setSort] = usePersistedState<Sort>('enDeckSort', 'saved')
  const [search, setSearch] = usePersistedState<string>('enDeckSearch', '')
  const [busy, setBusy] = useState(false)
  const q = useDebouncedValue(search.trim().toLowerCase(), 200)

  const { data: words = [], isLoading } = useQuery({
    queryKey: qk.english.deck,
    queryFn: () => api.english.deck()
  })

  const now = Date.now()
  const stats = useMemo(() => {
    const leeches = words.filter((w) => w.lapses >= LEECH_LAPSES).length
    const unranked = words.filter((w) => w.rank == null).length
    const due = words.filter(
      (w) => w.status !== 'new' && w.dueAt && Date.parse(w.dueAt.replace(' ', 'T') + 'Z') <= now
    ).length
    return { leeches, unranked, due }
  }, [words, now])
  const anyRanked = words.some((w) => w.rank != null)

  const shown = useMemo(() => {
    let list = words
    if (filter === 'due') {
      list = list.filter(
        (w) => w.status !== 'new' && w.dueAt && Date.parse(w.dueAt.replace(' ', 'T') + 'Z') <= now
      )
    } else if (filter === 'leeches') list = list.filter((w) => w.lapses >= LEECH_LAPSES)
    else if (filter === 'rare') list = list.filter((w) => w.rank != null && w.rank > rareMin)
    else if (filter === 'unranked') list = list.filter((w) => w.rank == null)
    if (q) list = list.filter((w) => w.word.toLowerCase().includes(q) || w.meaning.toLowerCase().includes(q))
    const sorted = [...list]
    if (sort === 'rank') sorted.sort((a, b) => (b.rank ?? -1) - (a.rank ?? -1)) // rarest first
    else if (sort === 'lapses') sorted.sort((a, b) => b.lapses - a.lapses || a.ease - b.ease)
    else if (sort === 'due') {
      const t = (w: EnDeckWord): number =>
        w.status === 'new' || !w.dueAt ? Infinity : Date.parse(w.dueAt.replace(' ', 'T') + 'Z')
      sorted.sort((a, b) => t(a) - t(b))
    }
    return sorted
  }, [words, filter, rareMin, q, sort, now])

  const { visible, sentinelRef } = useIncrementalList(shown, 96)

  async function removeOne(w: EnDeckWord): Promise<void> {
    await api.english.removeWord(w.id)
    await qc.invalidateQueries({ queryKey: qk.english.all })
  }

  async function removeShown(): Promise<void> {
    if (shown.length === 0 || busy) return
    const what =
      filter === 'rare'
        ? `the ${shown.length} words rarer than #${rareMin.toLocaleString()}`
        : filter === 'leeches'
          ? `the ${shown.length} leeches shown`
          : `the ${shown.length} words shown`
    const ok = await confirmDialog(`Remove ${what}? Their review history goes with them.`, {
      confirmLabel: 'Remove',
      danger: true
    })
    if (!ok) return
    setBusy(true)
    try {
      const n = await api.english.removeWords(shown.map((w) => w.id))
      await qc.invalidateQueries({ queryKey: qk.english.all })
      toast(`Removed ${n} word${n === 1 ? '' : 's'}`, 'success')
    } finally {
      setBusy(false)
    }
  }

  return (
    <EditorialDetailFrame
      width="wide"
      aside={
        <ContextPanel title="Mistake ledger" identity={`${filter}-${sort}-${shown.length}`}>
          <ContextFact label="Due pressure">{stats.due} words due now</ContextFact>
          <ContextFact label="Persistent misses">{stats.leeches} leeches</ContextFact>
          <ContextFact label="Current view">{shown.length} of {words.length} words</ContextFact>
          <ContextFact label="Frequency evidence">
            {anyRanked ? 'OpenSubtitles ranks installed' : 'Frequency pack not installed'}
          </ContextFact>
        </ContextPanel>
      }
    >
      <PageHeader
        back={{ to: '/english', label: 'English' }}
        title="Deck"
        subtitle="Every saved word with its frequency rank and review state. Prune the tail by hand — nothing here is automatic."
        actions={
          <Link to="/english/review" className="btn-ghost">
            Review
          </Link>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Words" value={words.length} />
        <StatTile label="Due now" value={stats.due} accent={stats.due > 0} />
        <StatTile label="Leeches" value={stats.leeches} sub={`${LEECH_LAPSES}+ lapses`} />
        <StatTile
          label="Unranked"
          value={stats.unranked}
          sub={anyRanked ? 'not in the frequency list' : 'frequency pack not installed'}
        />
      </div>

      {words.length === 0 && !isLoading ? (
        <EmptyState
          title="The deck is empty"
          body="Save words from the dictionary or let vocab and spelling misses fill it."
          action={
            <Link to="/english/dictionary" className="btn-primary">
              Dictionary
            </Link>
          }
        />
      ) : (
        <>
          <div className="card mb-4 space-y-4 p-4">
            <Group label="Show">
              <Pill active={filter === 'all'} onClick={() => setFilter('all')} label="All" />
              <Pill active={filter === 'due'} onClick={() => setFilter('due')} label="Due" />
              <Pill active={filter === 'leeches'} onClick={() => setFilter('leeches')} label="Leeches" />
              <Pill active={filter === 'rare'} onClick={() => setFilter('rare')} label="Rarer than…" />
              <Pill active={filter === 'unranked'} onClick={() => setFilter('unranked')} label="Unranked" />
            </Group>
            {filter === 'rare' && (
              <Group label="Rank">
                {RARE_PILLS.map((n) => (
                  <Pill
                    key={n}
                    active={rareMin === n}
                    onClick={() => setRareMin(n)}
                    label={`> ${n / 1000}k`}
                  />
                ))}
              </Group>
            )}
            <Group label="Sort">
              <Pill active={sort === 'saved'} onClick={() => setSort('saved')} label="Saved" />
              <Pill active={sort === 'rank'} onClick={() => setSort('rank')} label="Rarest first" />
              <Pill active={sort === 'lapses'} onClick={() => setSort('lapses')} label="Lapses" />
              <Pill active={sort === 'due'} onClick={() => setSort('due')} label="Due" />
            </Group>
            <div className="flex flex-wrap items-center gap-3">
              <input
                className="input flex-1"
                placeholder="Filter by word or meaning…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="text-xs text-gray-500">{shown.length} shown</span>
              {filter !== 'all' && shown.length > 0 && (
                <button className="btn-danger" disabled={busy} onClick={() => void removeShown()}>
                  Remove the {shown.length} shown
                </button>
              )}
            </div>
          </div>

          <div className="card divide-y divide-base-700">
            {visible.map((w) => {
              const leech = w.lapses >= LEECH_LAPSES
              return (
                <div key={w.id} className="flex items-center gap-3 px-3 py-2 text-sm">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <span className="font-medium">{w.word}</span>
                      {w.phonetic && <span className="text-xs text-gray-500">{w.phonetic}</span>}
                      {w.pos && <span className="text-xs text-gray-500">{w.pos}</span>}
                    </div>
                    <p className="truncate text-xs text-gray-400" title={w.meaning}>
                      {w.meaning}
                    </p>
                  </div>
                  <span
                    className="chip shrink-0 tabular-nums"
                    title="OpenSubtitles frequency rank (higher = rarer)"
                  >
                    {w.rank != null ? `#${w.rank.toLocaleString()}` : 'unranked'}
                  </span>
                  <span className={`chip shrink-0 ${leech ? 'text-red-300' : 'text-gray-400'}`}>
                    {leech ? 'leech' : w.status}
                  </span>
                  <span className="w-16 shrink-0 text-right text-xs tabular-nums text-gray-500">
                    {w.lapses} laps
                  </span>
                  <span className="w-20 shrink-0 text-right text-xs tabular-nums text-gray-500">
                    {dueLabel(w)}
                  </span>
                  <button
                    className="btn-ghost shrink-0 px-2 py-0.5 text-xs"
                    onClick={() => void removeOne(w)}
                    aria-label={`Remove ${w.word}`}
                  >
                    Remove
                  </button>
                </div>
              )
            })}
            {shown.length === 0 && (
              <p className="px-3 py-6 text-center text-sm text-gray-500">Nothing matches.</p>
            )}
            <div ref={sentinelRef} />
          </div>
        </>
      )}
    </EditorialDetailFrame>
  )
}
