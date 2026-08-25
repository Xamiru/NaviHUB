import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useDebouncedValue, useIncrementalList } from '../lib/hooks'
import { toast, toastError } from '../lib/toast'

// The offline grammar library: every N5-N1 point, searchable, with formation
// and real examples. Reference, not SRS — the cloze drill lives at
// /japanese/grammar/quiz.

const LEVELS = ['all', 'N5', 'N4', 'N3', 'N2', 'N1'] as const
type LevelFilter = (typeof LEVELS)[number]

// Lesson-title deep links arrive with ～/〜 decorations — normalize both sides.
const norm = (s: string): string => s.toLowerCase().replace(/[～〜\s]+/g, '')

export default function JapaneseGrammarPage() {
  // Grammar used to be the one thing you could study and then forget on
  // purpose: a library plus a one-shot drill, with nothing scheduling a point
  // for review. These file cards into the SAME queue as everything else.
  const qc = useQueryClient()
  const [addingId, setAddingId] = useState<number | null>(null)
  const [stagedIds, setStagedIds] = useState<Set<number>>(() => new Set())
  const [params, setParams] = useSearchParams()
  const [level, setLevel] = usePersistedState<LevelFilter>('jpGrammarLevel', 'all')
  const [query, setQuery] = usePersistedState<string>('jpGrammarQuery', '')
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const debounced = useDebouncedValue(query, 250)

  // ?q= deep link (from lesson pages) seeds the search once.
  useEffect(() => {
    const q = params.get('q')
    if (q == null) return
    setQuery(q)
    setParams({}, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { data: bank, isLoading } = useQuery({
    queryKey: qk.dict.grammarBank,
    queryFn: () => api.dict.grammarBank()
  })
  const { data: points = [] } = useQuery({
    queryKey: qk.dict.grammarList,
    queryFn: () => api.dict.grammarList(),
    enabled: !!bank
  })

  const filtered = useMemo(() => {
    const q = norm(debounced)
    return points.filter((p) => {
      if (level !== 'all' && p.level !== level) return false
      if (!q) return true
      return norm(p.title).includes(q) || norm(p.meaning).includes(q)
    })
  }, [points, level, debounced])

  const { visible, sentinelRef, hasMore } = useIncrementalList(filtered)

  async function stagePoint(id: number): Promise<void> {
    setAddingId(id)
    try {
      const res = await api.japanese.addGrammarPoints([id])
      await qc.invalidateQueries({ queryKey: qk.japanese.all })
      setStagedIds((prev) => new Set(prev).add(id))
      toast(
        res.added > 0
          ? 'Staged as a lesson. Read it there, then mark it learned to introduce its cards.'
          : 'This point is already staged, or has no clozeable examples.',
        'success'
      )
    } catch (e) {
      toastError(e)
    } finally {
      setAddingId(null)
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <PageHeader
        back={{ to: '/japanese', label: 'Japanese' }}
        title="Grammar"
        subtitle={
          bank
            ? `${bank.pointCount.toLocaleString()} JLPT grammar points, offline.`
            : 'Every JLPT grammar point, offline.'
        }
        actions={
          <Link to="/japanese/grammar/quiz" className="btn-ghost">
            Grammar drill
          </Link>
        }
      />

      {!isLoading && !bank ? (
        <EmptyState
          title="Grammar pack not installed"
          body="Download the N5-N1 grammar library in Settings → Dictionaries (~2 MB)."
          action={
            <Link to="/settings" className="btn-primary">
              Open Settings
            </Link>
          }
        />
      ) : (
        <>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <div className="flex gap-1.5">
              {LEVELS.map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={level === l ? 'pill pill-active' : 'pill'}
                >
                  {l === 'all' ? 'All' : l}
                </button>
              ))}
            </div>
            <input
              className="input ml-auto max-w-xs"
              placeholder="Search points…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {filtered.length === 0 ? (
            <p className="text-sm text-gray-500">No grammar points match.</p>
          ) : (
            <div className="space-y-1.5">
              {visible.map((p) => (
                <GrammarRow
                  key={p.id}
                  id={p.id}
                  level={p.level}
                  title={p.title}
                  meaning={p.meaning}
                  expanded={expandedId === p.id}
                  onToggle={() => setExpandedId(expandedId === p.id ? null : p.id)}
                  staging={addingId === p.id}
                  staged={stagedIds.has(p.id)}
                  onStage={() => void stagePoint(p.id)}
                />
              ))}
              {hasMore && <div ref={sentinelRef} />}
            </div>
          )}
        </>
      )}
    </div>
  )
}

function GrammarRow({
  id,
  level,
  title,
  meaning,
  expanded,
  onToggle,
  staging,
  staged,
  onStage
}: {
  id: number
  level: string
  title: string
  meaning: string
  expanded: boolean
  onToggle: () => void
  staging: boolean
  staged: boolean
  onStage: () => void
}) {
  const { data: point } = useQuery({
    queryKey: qk.dict.grammarPoint(id),
    queryFn: () => api.dict.grammarGet(id),
    enabled: expanded
  })

  return (
    <div className="card">
      <button className="flex w-full items-baseline gap-3 p-3 text-left" onClick={onToggle}>
        <span className="chip shrink-0 bg-base-700 text-gray-400">{level}</span>
        <span className="min-w-0">
          <span className="text-base font-medium">{title}</span>
          <span className="ml-2 text-sm text-gray-500">{meaning}</span>
        </span>
      </button>
      {expanded && point && (
        <div className="border-t border-base-700 p-4 text-sm">
          {point.formation && (
            <p className="mb-3 rounded bg-base-900/60 px-3 py-2 font-medium text-gray-300">
              {point.formation}
            </p>
          )}
          {point.examples.length > 0 && (
            <ul className="mb-3 space-y-2">
              {point.examples.map((ex, i) => (
                <li key={i}>
                  <p className="text-gray-200">{ex.jp}</p>
                  <p className="text-xs text-gray-500">{ex.en}</p>
                </li>
              ))}
            </ul>
          )}
          {point.explanation && (
            <p className="whitespace-pre-wrap leading-relaxed text-gray-400">{point.explanation}</p>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button className="btn-ghost" disabled={staging || staged} onClick={onStage}>
              {staging ? 'Staging…' : staged ? 'Staged' : 'Stage as lesson'}
            </button>
            <Link
              to={`/japanese/dictionary?q=${encodeURIComponent(title.split(/[\s(（]/)[0])}`}
              className="text-xs text-gray-500 hover:text-accent"
            >
              Search in dictionary
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
