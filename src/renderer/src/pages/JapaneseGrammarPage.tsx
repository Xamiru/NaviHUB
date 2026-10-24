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
import Tabs, { TabPanel } from '../components/Tabs'
import { parseJlptLevel } from '@shared/jlptLevels'
import type { JpGrammarIndexEntry } from '@shared/types'

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
  // "Course lessons" searches the grammar lessons that ship with the app, so the
  // library works with nothing installed; the downloaded pack is the reference.
  const [tab, setTab] = usePersistedState<'lessons' | 'reference'>('jpGrammarTab', 'lessons')
  const debounced = useDebouncedValue(query, 250)

  // ?q= deep link (a lesson's "more examples" link) seeds the search once and
  // opens the reference pack, which is what that link is for.
  useEffect(() => {
    const q = params.get('q')
    if (q == null) return
    setQuery(q)
    setTab('reference')
    setParams({}, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { data: lessons = [] } = useQuery({
    queryKey: qk.japanese.grammarIndex,
    queryFn: () => api.japanese.grammarIndex()
  })
  const lessonHits = useMemo(() => {
    const q = norm(debounced)
    return lessons.filter((l) => {
      if (level !== 'all' && parseJlptLevel(l.level) !== level) return false
      if (!q) return true
      return norm(l.title).includes(q) || norm(l.body).includes(q)
    })
  }, [lessons, level, debounced])

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

  const { visible, sentinelRef, hasMore } = useIncrementalList(filtered, 96, `${level}|${debounced}`)

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

  const filters = (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <div className="flex gap-1.5">
        {LEVELS.map((l) => (
          <button
            key={l}
            aria-pressed={level === l}
            onClick={() => setLevel(l)}
            className={level === l ? 'pill pill-active' : 'pill'}
          >
            {l === 'all' ? 'All' : l}
          </button>
        ))}
      </div>
      <input
        aria-label="Search grammar"
        className="input ml-auto max-w-xs"
        placeholder="Search grammar…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <PageHeader
        back={{ to: '/japanese', label: 'Japanese' }}
        title="Grammar"
        subtitle={`${lessons.length.toLocaleString()} grammar lessons in your courses${
          bank ? `, plus ${bank.pointCount.toLocaleString()} reference points` : ''
        }. All offline.`}
        actions={
          <Link to="/japanese/grammar/quiz" className="btn-ghost">
            Grammar drill
          </Link>
        }
      />

      <Tabs
        id="japanese-grammar"
        label="Grammar library"
        className="mb-4"
        value={tab}
        onChange={setTab}
        tabs={[
          { key: 'lessons', label: 'Course lessons', count: lessons.length },
          { key: 'reference', label: 'Reference pack' }
        ]}
      />
      <TabPanel tabsId="japanese-grammar" value={tab}>
      {filters}
      {tab === 'lessons' ? (
        <LessonList key={`${level}|${debounced}`} entries={lessonHits} />
      ) : !isLoading && !bank ? (
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
      </TabPanel>
    </div>
  )
}

// The grammar lessons of the learner's own courses: each row opens the lesson.
function LessonList({ entries }: { entries: JpGrammarIndexEntry[] }) {
  const { visible, sentinelRef, hasMore } = useIncrementalList(entries)
  if (entries.length === 0) return <p className="text-sm text-gray-500">No grammar lessons match.</p>
  return (
    <div className="space-y-1.5">
      {visible.map((l) => {
        const summary = l.body.split('\n').find((line) => line.trim())?.trim() ?? ''
        return (
          <Link
            key={l.lessonId}
            to={`/japanese/lessons/${l.lessonId}`}
            className="card group flex items-start gap-3 p-3 transition-colors hover:border-accent"
          >
            <span className="chip mt-0.5 shrink-0 bg-base-700 text-gray-400">{parseJlptLevel(l.level) ?? l.level ?? '—'}</span>
            <span className="min-w-0 flex-1">
              <span className="block font-medium group-hover:text-accent">{l.title}</span>
              {summary && <span className="mt-0.5 block truncate text-sm text-gray-400">{summary}</span>}
              <span className="mt-0.5 block text-xs text-gray-500">
                {l.courseTitle}
                {l.step != null && ` · Step ${l.step}`} · {l.cardCount} examples
              </span>
            </span>
            <span
              className={`mt-0.5 w-5 shrink-0 text-center ${l.learned ? 'text-signal-affirmative' : 'text-gray-500'}`}
              title={l.learned ? 'Learned' : 'Not learned yet'}
            >
              {l.learned ? '✓' : '○'}
            </span>
          </Link>
        )
      })}
      {hasMore && <div ref={sentinelRef} />}
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
