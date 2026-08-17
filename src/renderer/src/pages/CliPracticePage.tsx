import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import PageHeader from '../components/PageHeader'
import QuizRecord from '../components/QuizRecord'
import {
  CHEAT_SHEETS,
  normalizeCmd,
  practicePool,
  type CliPracticeItem
} from '@shared/programming/cheatsheets'
import { shuffle } from '@shared/shuffle'

// Typed CLI drill — the kana dojo's loop, pointed at commands: the prompt is a
// task description, you type the command, and the answer is checked on every
// keystroke. A dead-end prefix shows the answer in red and KEEPS it there
// while you backspace-fix; Enter on an empty box reveals, Enter while showing
// skips and re-queues (3 and 13 ahead); endless until Stop, which logs the
// round as quiz kind 'cli'. Unlike kana, Space is typeable — commands have
// spaces — so only Enter drives the control flow. Stop also reports the
// round's missed / first-try keys to prog_cli_miss, which feeds the home
// page's "Weak commands" and the "Weak commands only" pool here (`?weak=1`
// presets it).

export default function CliPracticePage() {
  // Empty selection = every sheet.
  const [selected, setSelected] = usePersistedState<string[]>('cliPracticeSheets', [])
  const [params] = useSearchParams()
  const [weakOnly, setWeakOnly] = usePersistedState<boolean>('cliPracticeWeak', params.get('weak') === '1')
  const [playing, setPlaying] = useState(false)

  const { data: misses = [] } = useQuery({
    queryKey: qk.programming.cliMisses,
    queryFn: () => api.programming.cliMisses()
  })
  const weakKeys = useMemo(() => new Set(misses.map((m) => m.cmdKey)), [misses])

  const pool = useMemo(() => {
    const all = practicePool(selected.length > 0 ? selected : null)
    return weakOnly ? all.filter((i) => weakKeys.has(i.key)) : all
  }, [selected, weakOnly, weakKeys])

  function toggle(key: string): void {
    setSelected((s) => (s.includes(key) ? s.filter((k) => k !== key) : [...s, key]))
  }

  if (playing) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <Drill
          items={pool}
          settings={{ sheets: selected.length > 0 ? selected : 'all', weakOnly }}
          onExit={() => setPlaying(false)}
        />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <PageHeader
        back={{ to: '/programming', label: 'Programming' }}
        title="CLI practice"
        subtitle="Read the task, type the command. Checked as you type; misses come back around until you stop. Flags matter, file names don't."
      />

      <div className="card p-4">
        <p className="label mb-2">Sheets ({selected.length === 0 ? 'all' : selected.length})</p>
        {/* Multi-select toggle grid — empty selection means every sheet, shown
            as all chips unselected (selecting one narrows the pool to it). */}
        <div className="flex flex-wrap gap-1.5">
          {CHEAT_SHEETS.map((s) => (
            <button
              key={s.key}
              className={`chip-toggle ${selected.includes(s.key) ? 'chip-toggle-active' : ''}`}
              onClick={() => toggle(s.key)}
            >
              {s.title}
            </button>
          ))}
        </div>
        {weakKeys.size > 0 && (
          <div className="mt-3">
            <button
              className={`chip-toggle ${weakOnly ? 'chip-toggle-active' : ''}`}
              onClick={() => setWeakOnly((v) => !v)}
              title="Only commands you have missed more often than you have hit them"
            >
              Weak commands only ({weakKeys.size})
            </button>
          </div>
        )}
        <div className="mt-4 flex items-center gap-3">
          <button className="btn-primary" disabled={pool.length === 0} onClick={() => setPlaying(true)}>
            Start ({pool.length} commands)
          </button>
          <Link to="/programming/cheatsheets" className="btn-ghost">
            Cheatsheets
          </Link>
        </div>
      </div>

      <QuizRecord kind="cli" />
    </div>
  )
}

function Drill({
  items,
  settings,
  onExit
}: {
  items: CliPracticeItem[]
  settings: Record<string, unknown>
  onExit: () => void
}) {
  const qc = useQueryClient()
  const inputRef = useRef<HTMLInputElement>(null)
  const [queue, setQueue] = useState<CliPracticeItem[]>(() => shuffle(items))
  const [input, setInput] = useState('')
  const [wrong, setWrong] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [missed, setMissed] = useState<Set<string>>(new Set())
  // Per-command keys for the weak-command memory: missed at least once, or
  // answered right first time (a later miss on the same key wins).
  const missedKeysRef = useRef<Set<string>>(new Set())
  const firstTryKeysRef = useRef<Set<string>>(new Set())
  const [stopped, setStopped] = useState(false)
  const loggedRef = useRef(false)

  const current = queue[0] ?? null

  // Stopping IS the end of the round (endless drill) — log it once, then
  // refresh the record block. Same funnel discipline as every quiz page.
  useEffect(() => {
    if (!stopped || loggedRef.current || answered === 0) return
    loggedRef.current = true
    const missedKeys = [...missedKeysRef.current]
    const correctKeys = [...firstTryKeysRef.current].filter((k) => !missedKeysRef.current.has(k))
    void api.quiz
      .logSession({ kind: 'cli', score: correct, total: answered, bestStreak, settings })
      .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history('cli') }))
    void api.programming
      .recordCliRound({ missed: missedKeys, correct: correctKeys })
      .then(() => qc.invalidateQueries({ queryKey: qk.programming.cliMisses }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stopped])

  function advance(requeue: boolean): void {
    setQueue((q) => {
      const shown = q[0]
      const out = q.slice(1)
      if (requeue && shown) {
        if (out.length > 3) out.splice(3, 0, shown)
        if (out.length > 13) out.splice(13, 0, shown)
      }
      if (out.length > 0) return out
      const next = shuffle(items)
      if (next.length > 1 && shown && next[0].cmd === shown.cmd) {
        return [...next.slice(1), next[0]]
      }
      return next
    })
    setInput('')
    setWrong(false)
    inputRef.current?.focus()
  }

  function miss(): void {
    if (wrong || !current) return
    setWrong(true)
    setStreak(0)
    setMissed((m) => new Set(m).add(current.cmd))
    missedKeysRef.current.add(current.key)
  }

  function onType(value: string): void {
    setInput(value)
    if (!current) return
    const typed = normalizeCmd(value)
    if (!typed) return
    if (current.answers.includes(typed)) {
      setAnswered((n) => n + 1)
      if (!wrong) {
        firstTryKeysRef.current.add(current.key)
        setCorrect((n) => n + 1)
        const s = streak + 1
        setStreak(s)
        setBestStreak((b) => Math.max(b, s))
      }
      advance(false)
      return
    }
    if (!current.answers.some((a) => a.startsWith(typed))) miss()
  }

  function onEnter(): void {
    if (!current) return
    if (!wrong) {
      if (!input.trim()) miss()
      return
    }
    setAnswered((n) => n + 1)
    advance(true)
  }

  if (stopped) {
    const pct = answered ? Math.round((correct / answered) * 100) : 0
    return (
      <div className="card p-6 text-center">
        <p className="text-3xl font-bold">
          {correct} / {answered}
        </p>
        <p className="mt-1 text-sm text-gray-400">
          {answered === 0
            ? 'Nothing answered.'
            : pct === 100
              ? 'Flawless.'
              : `${pct}% on the first try · best streak ${bestStreak}`}
        </p>
        {missed.size > 0 && (
          <div className="mt-3 text-sm text-gray-300">
            <p className="mb-1 text-xs uppercase tracking-widest text-gray-500">Missed</p>
            <p className="flex flex-wrap justify-center gap-2">
              {[...missed].map((c) => (
                <code key={c} className="rounded bg-base-700 px-1.5 py-0.5">
                  {c}
                </code>
              ))}
            </p>
          </div>
        )}
        <div className="mt-5 flex justify-center gap-2">
          <button className="btn-primary" onClick={onExit}>
            Back to setup
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="card p-6">
      <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
        <span className="tabular-nums">
          {correct} / {answered}
        </span>
        <span>
          streak {streak}
          <button className="btn-ghost ml-3 px-2 py-0.5 text-xs" onClick={() => setStopped(true)}>
            Stop
          </button>
        </span>
      </div>

      <p className="text-center text-xs uppercase tracking-widest text-gray-600">
        {current?.sheetTitle}
      </p>
      <p className="mt-2 text-center text-xl leading-snug">{current?.desc}</p>

      <div className="mx-auto mt-6 max-w-lg">
        <input
          ref={inputRef}
          className={`input w-full text-center font-mono text-lg ${wrong ? 'text-red-400' : ''}`}
          placeholder="type the command…"
          value={input}
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          onChange={(e) => onType(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              onEnter()
            }
          }}
        />
      </div>

      {/* Held until answered or skipped, so it stays visible while fixing. */}
      <p className="mt-4 text-center text-sm">
        {wrong && current ? (
          <span className="text-red-400">
            <code className="rounded bg-base-700 px-1.5 py-0.5 text-red-300">
              {current.answers[0]}
            </code>
            <span className="ml-2 text-xs text-gray-500">Enter to skip</span>
          </span>
        ) : (
          <span className="text-xs text-gray-600">Enter reveals the answer</span>
        )}
      </p>
    </div>
  )
}
