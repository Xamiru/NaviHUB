import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useDebouncedValue } from '../lib/hooks'
import PageHeader from '../components/PageHeader'
import StudySessionFrame, { SessionEvidence } from '../components/StudySessionFrame'
import QuizRecord from '../components/QuizRecord'
import { Group, Pill } from '../components/PillGroup'
import {
  gradeRegexGolf,
  REGEX_GOLF_PUZZLES,
  type RegexGolfPuzzle
} from '@shared/programming/regexGolf'
import { shuffle } from '@shared/shuffle'

// Regex golf: match every string on the left, none on the right, in as few
// characters as you can. Graded live in the renderer (pure `gradeRegexGolf`,
// debounced 150 ms — no IPC). A solve records the puzzle + your shortest
// pattern in prog_solve; a round (N puzzles, solved or skipped) logs one
// quiz_session of kind 'regexGolf' through the usual endGame() funnel.

type Phase = 'setup' | 'play' | 'summary'

export default function RegexGolfPage() {
  const qc = useQueryClient()
  const [phase, setPhase] = useState<Phase>('setup')
  const [length, setLength] = usePersistedState<number>('regexGolfLength', 5)
  const [order, setOrder] = usePersistedState<'easy' | 'random'>('regexGolfOrder', 'easy')

  const { data: solves = [] } = useQuery({
    queryKey: qk.programming.solves,
    queryFn: () => api.programming.solves()
  })
  const { data: history } = useQuery({
    queryKey: qk.quiz.history('regexGolf'),
    queryFn: () => api.quiz.history('regexGolf')
  })
  const bestByKey = useMemo(() => {
    const m = new Map<string, number>()
    for (const s of solves) if (s.kind === 'regex' && s.best != null) m.set(s.key, s.best)
    return m
  }, [solves])

  const roundRef = useRef<RegexGolfPuzzle[]>([])
  const [index, setIndex] = useState(0)
  const [solvedCount, setSolvedCount] = useState(0)
  const [underParCount, setUnderParCount] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [newBest, setNewBest] = useState(false)
  const [played, setPlayed] = useState(0)
  const loggedRef = useRef(false)

  function start(): void {
    // Unsolved puzzles first so a round always has something new in it, then
    // the rest; "easy" keeps the authored order, "random" shuffles.
    const unsolved = REGEX_GOLF_PUZZLES.filter((p) => !bestByKey.has(p.key))
    const done = REGEX_GOLF_PUZZLES.filter((p) => bestByKey.has(p.key))
    let pool = [...unsolved, ...done]
    if (order === 'random') pool = [...shuffle(unsolved), ...shuffle(done)]
    roundRef.current = length > 0 ? pool.slice(0, length) : pool
    setIndex(0)
    setSolvedCount(0)
    setUnderParCount(0)
    setStreak(0)
    setBestStreak(0)
    setNewBest(false)
    loggedRef.current = false
    setPhase('play')
  }

  function endGame(finalSolved: number, finalBestStreak: number, played: number): void {
    setPlayed(played)
    if (!loggedRef.current && played > 0) {
      loggedRef.current = true
      const prev = history?.best
      setNewBest(played >= 5 && (!prev || finalSolved / played > prev.score / prev.total))
      void api.quiz
        .logSession({
          kind: 'regexGolf',
          score: finalSolved,
          total: played,
          bestStreak: finalBestStreak,
          settings: {
            length,
            order,
            keys: roundRef.current.slice(0, played).map((p) => p.key)
          }
        })
        .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history('regexGolf') }))
        .catch(() => {})
    }
    setPhase('summary')
  }

  // Called by the puzzle card when the player moves on (solved or skipped).
  function next(result: {
    solved: boolean
    underPar: boolean
    length: number
    pattern: string | null
    puzzle: RegexGolfPuzzle
  }): void {
    const s = result.solved ? solvedCount + 1 : solvedCount
    const u = result.underPar ? underParCount + 1 : underParCount
    const st = result.solved ? streak + 1 : 0
    const bs = Math.max(bestStreak, st)
    setSolvedCount(s)
    setUnderParCount(u)
    setStreak(st)
    setBestStreak(bs)
    if (result.solved) {
      void api.programming
        .recordSolve({ kind: 'regex', key: result.puzzle.key, best: result.length, answer: result.pattern })
        .then(() => qc.invalidateQueries({ queryKey: qk.programming.solves }))
    }
    const played = index + 1
    if (played >= roundRef.current.length) endGame(s, bs, played)
    else setIndex(played)
  }

  if (phase === 'play') {
    const puzzle = roundRef.current[index]
    return (
      <StudySessionFrame
        title="Regex golf"
        subtitle={puzzle.title}
        progress={{ current: index + 1, total: roundRef.current.length, label: 'Puzzles' }}
        actions={<button className="btn-ghost px-2 py-0.5 text-xs" onClick={() => endGame(solvedCount, bestStreak, index)}>End round</button>}
        rail={<SessionEvidence title="Terminal evidence"><p>{solvedCount} solved; {underParCount} under par.</p><p className="mt-2">Current streak {streak}; best streak {bestStreak}.</p></SessionEvidence>}
        surface={false}
      >
        <PuzzleCard
          key={puzzle.key}
          puzzle={puzzle}
          best={bestByKey.get(puzzle.key) ?? null}
          onNext={next}
        />
      </StudySessionFrame>
    )
  }

  if (phase === 'summary') {
    return (
      <div className="p-6 max-w-md mx-auto">
        <div className="card p-6 text-center">
          <p className="text-3xl font-bold">
            {solvedCount} / {played}
          </p>
          <p className="mt-1 text-sm text-gray-400">
            {underParCount} under par · best streak {bestStreak}
          </p>
          {newBest && <p className="mt-3 text-sm text-accent">New personal best.</p>}
          <div className="mt-5 flex justify-center gap-2">
            <button className="btn-primary" onClick={() => setPhase('setup')}>
              Play again
            </button>
            <Link to="/programming" className="btn-ghost">
              Programming
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <PageHeader
        back={{ to: '/programming', label: 'Programming' }}
        title="Regex golf"
        subtitle="Match every string on the left and none on the right — then make the pattern shorter. Graded as you type."
        actions={
          <span className="text-xs text-gray-500">
            {bestByKey.size} / {REGEX_GOLF_PUZZLES.length} solved
          </span>
        }
      />

      <div className="card p-5 space-y-5">
        <Group label="Round">
          <Pill active={length === 5} onClick={() => setLength(5)} label="5 puzzles" />
          <Pill active={length === 10} onClick={() => setLength(10)} label="10 puzzles" />
          <Pill active={length === 0} onClick={() => setLength(0)} label="All" />
        </Group>
        <Group label="Order">
          <Pill active={order === 'easy'} onClick={() => setOrder('easy')} label="Easy first" />
          <Pill active={order === 'random'} onClick={() => setOrder('random')} label="Random" />
        </Group>
        <p className="text-xs text-gray-500">
          Unsolved puzzles come first either way. Puzzles use JavaScript regex syntax; flags are
          only available where a puzzle allows them.
        </p>
        <button className="btn-primary w-full" onClick={start}>
          Start round
        </button>
      </div>

      <div className="card mt-4 divide-y divide-base-700">
        {REGEX_GOLF_PUZZLES.map((p, i) => {
          const best = bestByKey.get(p.key)
          return (
            <div key={p.key} className="flex items-center gap-3 px-3 py-2 text-sm">
              <span className="w-6 shrink-0 text-right tabular-nums text-gray-600">{i + 1}.</span>
              <span className={`min-w-0 flex-1 truncate ${best != null ? 'text-gray-400' : ''}`}>
                {p.title}
              </span>
              <span className="shrink-0 text-xs text-gray-500">par {p.par}</span>
              {best != null && (
                <span
                  className={`chip shrink-0 tabular-nums ${best <= p.par ? 'text-accent' : 'text-gray-400'}`}
                >
                  best {best}
                </span>
              )}
            </div>
          )
        })}
      </div>

      <QuizRecord kind="regexGolf" />
    </div>
  )
}

function PuzzleCard({
  puzzle,
  best,
  onNext
}: {
  puzzle: RegexGolfPuzzle
  best: number | null
  onNext: (r: {
    solved: boolean
    underPar: boolean
    length: number
    pattern: string | null
    puzzle: RegexGolfPuzzle
  }) => void
}) {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounced = useDebouncedValue(pattern, 150)
  const grade = useMemo(() => gradeRegexGolf(debounced, flags, puzzle), [debounced, flags, puzzle])
  // The best (shortest) solve reached on THIS puzzle — you may keep shortening
  // after the first solve.
  const [bestHere, setBestHere] = useState<{ length: number; pattern: string } | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!grade.solved) return
    setBestHere((b) =>
      b == null || grade.length < b.length ? { length: grade.length, pattern: debounced } : b
    )
  }, [grade, debounced])

  const solvedHere = bestHere != null
  const flagsAllowed = puzzle.flagsAllowed ?? ''

  function finish(): void {
    onNext({
      solved: solvedHere,
      underPar: solvedHere && bestHere!.length <= puzzle.par,
      length: bestHere?.length ?? 0,
      pattern: bestHere?.pattern ?? null,
      puzzle
    })
  }

  return (
    <div className="space-y-3">
      <div className="card p-4">
        <div className="mb-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <span>par {puzzle.par}</span>
          {best != null && <span>· your best {best}</span>}
          {flagsAllowed && <span>· flags allowed: {flagsAllowed}</span>}
        </div>
        <h2 className="text-lg font-medium">{puzzle.title}</h2>
        {showHint && <p className="mt-2 text-sm text-accent">{puzzle.hint}</p>}
        {revealed && (
          <p className="mt-2 text-sm text-gray-400">
            One solution at par: <code className="rounded bg-base-700 px-1.5 py-0.5 font-mono">{puzzle.solution}</code>
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="font-mono text-lg text-gray-500">/</span>
        <input
          ref={inputRef}
          className={`input flex-1 font-mono text-lg ${
            grade.error ? 'text-red-300' : grade.solved ? 'text-green-300' : ''
          }`}
          placeholder="pattern"
          value={pattern}
          autoComplete="off"
          spellCheck={false}
          onChange={(e) => setPattern(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && solvedHere) {
              e.preventDefault()
              finish()
            }
          }}
        />
        <span className="font-mono text-lg text-gray-500">/</span>
        {flagsAllowed && (
          <input
            className="input w-16 font-mono text-lg"
            placeholder="flags"
            value={flags}
            onChange={(e) => setFlags(e.target.value.replace(/[^ims]/g, ''))}
          />
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className={`tabular-nums ${grade.length > puzzle.par ? 'text-gray-400' : 'text-accent'}`}>
          length {grade.length}
        </span>
        {grade.error && <span className="text-red-400">{grade.error}</span>}
        {grade.solved && (
          <span className="text-green-300">
            Solved{grade.underPar ? ' — under par' : ` — ${grade.length - puzzle.par} over par`}
          </span>
        )}
        {bestHere != null && !grade.solved && (
          <span className="text-gray-500">solved at {bestHere.length}; keep going or move on</span>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <StringList title="Must match" strings={puzzle.mustMatch} results={grade.matchResults} valid={grade.valid} />
        <StringList
          title="Must not match"
          strings={puzzle.mustNotMatch}
          results={grade.notMatchResults}
          valid={grade.valid}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button className="btn-ghost" onClick={() => setShowHint((v) => !v)}>
          {showHint ? 'Hide hint' : 'Hint'}
        </button>
        <button className="btn-ghost" onClick={() => setRevealed(true)} disabled={revealed}>
          Show a solution
        </button>
        <span className="flex-1" />
        {solvedHere ? (
          <button className="btn-primary" onClick={finish}>
            Next (Enter)
          </button>
        ) : (
          <button className="btn-ghost" onClick={finish}>
            Skip
          </button>
        )}
      </div>
    </div>
  )
}

function StringList({
  title,
  strings,
  results,
  valid
}: {
  title: string
  strings: string[]
  results: boolean[]
  valid: boolean
}) {
  return (
    <div className="card p-3">
      <p className="mb-1.5 text-xs uppercase tracking-widest text-gray-500">{title}</p>
      <ul className="space-y-1">
        {strings.map((s, i) => {
          const ok = valid && results[i]
          return (
            <li key={`${s}-${i}`} className="flex items-center gap-2 font-mono text-sm">
              <span className={`w-4 text-center ${!valid ? 'text-gray-600' : ok ? 'text-green-400' : 'text-red-400'}`}>
                {!valid ? '·' : ok ? '✓' : '✕'}
              </span>
              <span className="whitespace-pre">{s === '' ? '(empty string)' : s}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
