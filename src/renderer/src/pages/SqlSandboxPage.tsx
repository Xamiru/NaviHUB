import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import { Group, Pill } from '../components/PillGroup'
import { SQL_DATASET, SQL_EXERCISES, type SqlExercise } from '@shared/programming/sqlExercises'
import type { SqlRunResult, SqlTable } from '@shared/types'

// The SQL sandbox: pick an exercise, type a query, run it against the seeded
// dataset (in a killable utility process — see main/sqlSandbox.ts) and get
// graded against the expected rows. Solved exercises are remembered in
// prog_solve; there is no quiz_session round because a sandbox has no natural
// round. Ctrl+Enter runs. Drafts persist per exercise for the Back stack.

const LEVEL_LABEL: Record<1 | 2 | 3, string> = { 1: 'Basics', 2: 'Joins & groups', 3: 'Advanced' }

function mismatchCopy(r: SqlRunResult): string {
  switch (r.mismatch) {
    case 'columns':
      return `Column set differs — expected exactly: ${r.expectedColumns.join(', ')}.`
    case 'rowCount':
      return r.truncated
        ? 'Too many rows (the result was cut off) — a filter or a join condition is missing.'
        : 'Right columns, wrong number of rows.'
    case 'order':
      return 'Right rows, wrong order — this exercise checks ORDER BY.'
    case 'rows':
      return 'Right shape, but some values differ.'
    default:
      return ''
  }
}

export default function SqlSandboxPage() {
  const qc = useQueryClient()
  const [level, setLevel] = usePersistedState<0 | 1 | 2 | 3>('sqlSandboxLevel', 0)
  const [selectedKey, setSelectedKey] = usePersistedState<string | null>('sqlSandboxKey', null)
  const [schemaOpen, setSchemaOpen] = usePersistedState<boolean>('sqlSandboxSchema', true)

  const { data: solves = [] } = useQuery({
    queryKey: qk.programming.solves,
    queryFn: () => api.programming.solves()
  })
  const solved = useMemo(
    () => new Set(solves.filter((s) => s.kind === 'sql').map((s) => s.key)),
    [solves]
  )

  const list = useMemo(
    () => (level === 0 ? SQL_EXERCISES : SQL_EXERCISES.filter((e) => e.level === level)),
    [level]
  )
  const selected = SQL_EXERCISES.find((e) => e.key === selectedKey) ?? null

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <PageHeader
        back={{ to: '/programming', label: 'Programming' }}
        title="SQL sandbox"
        subtitle="Real queries against a small anime dataset, graded against the expected rows. Column order and case are free; row order only when the exercise says so."
        actions={
          <span className="text-xs text-gray-500">
            {solved.size} / {SQL_EXERCISES.length} solved
          </span>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)_260px]">
        {/* Exercise list */}
        <div className="space-y-3">
          <Group label="Level">
            <Pill active={level === 0} onClick={() => setLevel(0)} label="All" />
            {([1, 2, 3] as const).map((l) => (
              <Pill key={l} active={level === l} onClick={() => setLevel(l)} label={LEVEL_LABEL[l]} />
            ))}
          </Group>
          <ol className="card divide-y divide-base-700">
            {list.map((e) => (
              <li key={e.key}>
                <button
                  className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-base-700/60 ${
                    e.key === selectedKey ? 'bg-base-700/80' : ''
                  }`}
                  onClick={() => setSelectedKey(e.key)}
                >
                  <span
                    className={`w-4 shrink-0 text-center ${solved.has(e.key) ? 'text-accent' : 'text-gray-600'}`}
                    aria-label={solved.has(e.key) ? 'solved' : 'unsolved'}
                  >
                    {solved.has(e.key) ? '✓' : '○'}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{e.title}</span>
                  <span className="chip shrink-0 text-[10px]">{e.concept}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* Workbench */}
        <div className="min-w-0">
          {selected ? (
            <Workbench
              key={selected.key}
              exercise={selected}
              solved={solved.has(selected.key)}
              onSolved={() => qc.invalidateQueries({ queryKey: qk.programming.solves })}
            />
          ) : (
            <EmptyState
              title="Pick an exercise"
              body="Start with the basics on the left; the schema is on the right."
            />
          )}
        </div>

        {/* Schema panel */}
        <div>
          <button
            className="btn-ghost mb-2 w-full justify-between text-left text-xs uppercase tracking-widest"
            onClick={() => setSchemaOpen((v) => !v)}
          >
            Schema {schemaOpen ? '▾' : '▸'}
          </button>
          {schemaOpen && (
            <div className="space-y-2">
              {SQL_DATASET.tables.map((t) => (
                <div key={t.name} className="card p-3">
                  <p className="mb-1 font-mono text-sm text-accent">{t.name}</p>
                  <ul className="space-y-0.5 text-xs">
                    {t.columns.map((c) => (
                      <li key={c.name} className="flex justify-between gap-2">
                        <span className="font-mono">{c.name}</span>
                        <span className="shrink-0 text-gray-500" title={c.note}>
                          {c.type}
                          {c.note ? ' ?' : ''}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <p className="text-[11px] text-gray-600">? = may hold NULLs</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Workbench({
  exercise,
  solved,
  onSolved
}: {
  exercise: SqlExercise
  solved: boolean
  onSolved: () => void
}) {
  const [sql, setSql] = usePersistedState<string>(`sqlDraft:${exercise.key}`, '')
  const [result, setResult] = useState<SqlRunResult | null>(null)
  const [running, setRunning] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showExpected, setShowExpected] = useState(false)
  const textRef = useRef<HTMLTextAreaElement>(null)

  const { data: expected } = useQuery<SqlTable>({
    queryKey: qk.programming.sqlExpected(exercise.key),
    queryFn: () => api.programming.sqlExpected(exercise.key),
    enabled: showExpected
  })

  useEffect(() => {
    textRef.current?.focus()
  }, [])

  async function run(): Promise<void> {
    if (running) return
    setRunning(true)
    try {
      const r = await api.programming.sqlRun({ exerciseKey: exercise.key, sql })
      setResult(r)
      if (r.correct) onSolved()
    } finally {
      setRunning(false)
    }
  }

  return (
    <div className="space-y-3">
      <div className="card p-4">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span className="chip">{LEVEL_LABEL[exercise.level]}</span>
          <span className="chip">{exercise.concept}</span>
          {solved && <span className="chip bg-accent/15 text-accent">solved</span>}
          {exercise.lessonKey && (
            <Link
              to={`/programming/course/${exercise.lessonKey}`}
              className="ml-auto text-xs text-gray-500 hover:text-gray-300"
            >
              Lesson →
            </Link>
          )}
        </div>
        <h2 className="text-lg font-medium">{exercise.title}</h2>
        <p className="mt-1 text-sm text-gray-300">{exercise.prompt}</p>
        {exercise.orderMatters && (
          <p className="mt-1 text-xs text-gray-500">Row order is checked for this one.</p>
        )}
        {showHint && <p className="mt-2 text-sm text-accent">{exercise.hint}</p>}
      </div>

      <textarea
        ref={textRef}
        className="input min-h-[140px] w-full resize-y font-mono text-sm"
        placeholder="SELECT …"
        value={sql}
        spellCheck={false}
        onChange={(e) => setSql(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault()
            void run()
          }
        }}
      />

      <div className="flex flex-wrap items-center gap-2">
        <button className="btn-primary" disabled={running || !sql.trim()} onClick={() => void run()}>
          {running ? 'Running…' : 'Run (Ctrl+Enter)'}
        </button>
        <button className="btn-ghost" onClick={() => setShowHint((v) => !v)}>
          {showHint ? 'Hide hint' : 'Hint'}
        </button>
        <button className="btn-ghost" onClick={() => setShowExpected((v) => !v)}>
          {showExpected ? 'Hide expected' : 'Show expected'}
        </button>
        {result && !result.error && (
          <span className="ml-auto text-xs text-gray-500">
            {result.rows.length}
            {result.truncated ? '+' : ''} rows · {result.ms} ms
          </span>
        )}
      </div>

      {result && (
        <div
          className={`card p-3 text-sm ${
            result.error
              ? 'border-red-500/60 text-red-300'
              : result.correct
                ? 'border-green-500/60 text-green-300'
                : 'border-yellow-500/50 text-yellow-200'
          }`}
        >
          {result.error
            ? result.error
            : result.correct
              ? 'Correct — the rows match.'
              : mismatchCopy(result)}
        </div>
      )}

      {result && !result.error && (
        <ResultTable table={result} title="Your result" />
      )}
      {showExpected && expected && <ResultTable table={expected} title="Expected" />}
    </div>
  )
}

function ResultTable({ table, title }: { table: SqlTable; title: string }) {
  return (
    <div className="card overflow-hidden">
      <p className="border-b border-base-700 px-3 py-1.5 text-xs uppercase tracking-widest text-gray-500">
        {title}
        {table.truncated ? ' (truncated)' : ''}
      </p>
      <div className="max-h-[40vh] overflow-auto">
        <table className="w-full text-left text-xs">
          <thead className="sticky top-0 bg-base-800">
            <tr>
              {table.columns.map((c, i) => (
                <th key={`${c}-${i}`} className="px-3 py-1.5 font-mono font-medium text-gray-300">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.length === 0 && (
              <tr>
                <td className="px-3 py-2 text-gray-500" colSpan={Math.max(1, table.columns.length)}>
                  (no rows)
                </td>
              </tr>
            )}
            {table.rows.map((r, i) => (
              <tr key={i} className="border-t border-base-700/60">
                {r.map((cell, j) => (
                  <td key={j} className="px-3 py-1 font-mono tabular-nums">
                    {cell === null ? <span className="text-gray-600">NULL</span> : String(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
