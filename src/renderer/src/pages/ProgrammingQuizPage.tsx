import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import PageHeader from '../components/PageHeader'
import QuizRecord from '../components/QuizRecord'
import { Group, Pill } from '../components/PillGroup'
import { PROG_COURSES } from '@shared/programming/courses'
import { CHEAT_SHEETS } from '@shared/programming/cheatsheets'
import { SNIPPET_LANGS, type SnippetKind, type SnippetLang } from '@shared/programming/snippets'
import {
  commandQuestions,
  courseQuestions,
  snippetQuestions,
  type ProgQuizQuestion
} from '@shared/programming/quizPools'
import { shuffle } from '@shared/shuffle'

// Multiple-choice quiz over the programming section. Three pools, all built
// entirely in the renderer from the code catalog (@shared/programming/
// quizPools — no IPC): the courses' own check questions, "which command does
// this" over the cheatsheets, and the snippet decks (predict the output /
// spot the bug). Same loop as the Japanese quiz: 1-4 to answer, Enter to
// advance, one endGame() funnel that logs a quiz_session row of kind
// 'programming' (mode in settings). The summary groups misses by where they
// came from and links back to the lesson / sheet.

type Phase = 'setup' | 'play' | 'summary'
type Mode = 'course' | 'command' | 'snippets'
type Question = ProgQuizQuestion

interface Stats {
  score: number
  total: number
  streak: number
  best: number
}
const ZERO: Stats = { score: 0, total: 0, streak: 0, best: 0 }

interface MissGroup {
  label: string
  to: string | null
  n: number
}

export default function ProgrammingQuizPage() {
  const qc = useQueryClient()
  const [phase, setPhase] = useState<Phase>('setup')
  const [mode, setMode] = usePersistedState<Mode>('progQuizMode', 'course')
  const [courseKey, setCourseKey] = usePersistedState<string | null>('progQuizCourse', null)
  const [sheetKey, setSheetKey] = usePersistedState<string | null>('progQuizSheet', null)
  const [snipLang, setSnipLang] = usePersistedState<SnippetLang | null>('progQuizSnipLang', null)
  const [snipKind, setSnipKind] = usePersistedState<SnippetKind | null>('progQuizSnipKind', null)
  const [length, setLength] = usePersistedState<number>('progQuizLength', 10)

  const [current, setCurrent] = useState<Question | null>(null)
  const [picked, setPicked] = useState<number | null>(null)
  const [stats, setStats] = useState<Stats>(ZERO)
  const [newBest, setNewBest] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deckRef = useRef<Question[]>([])
  const poolRef = useRef<Question[]>([])
  const statsRef = useRef<Stats>(ZERO)
  const lengthRef = useRef(10)
  const loggedRef = useRef(false)
  // Misses grouped by source (lesson / sheet / snippet deck) for the summary.
  const missedRef = useRef<Map<string, MissGroup>>(new Map())
  const [missGroups, setMissGroups] = useState<MissGroup[]>([])

  function buildPool(): Question[] {
    if (mode === 'course') return courseQuestions(courseKey)
    if (mode === 'command') return commandQuestions(sheetKey)
    return snippetQuestions(snipLang, snipKind)
  }

  const { data: history } = useQuery({
    queryKey: qk.quiz.history('programming'),
    queryFn: () => api.quiz.history('programming')
  })

  const answered = picked !== null

  function startGame(): void {
    const pool = buildPool()
    if (pool.length < 4) {
      setError('Not enough questions in that selection yet — pick a wider scope.')
      return
    }
    setError(null)
    poolRef.current = pool
    deckRef.current = shuffle(pool)
    statsRef.current = ZERO
    lengthRef.current = length
    loggedRef.current = false
    missedRef.current = new Map()
    setMissGroups([])
    setStats(ZERO)
    setNewBest(false)
    setPhase('play')
    nextQuestion()
  }

  function nextQuestion(): void {
    if (deckRef.current.length === 0) deckRef.current = shuffle(poolRef.current)
    const q = deckRef.current.shift() ?? null
    setCurrent(q)
    setPicked(null)
  }

  function handleAnswer(index: number | null): void {
    if (picked !== null || !current) return
    setPicked(index ?? -1) // -1 = revealed without answering
    const right = index !== null && index === current.correct
    if (!right) {
      const label = current.reviewLabel ?? current.context ?? 'Other'
      const g = missedRef.current.get(label) ?? { label, to: current.reviewTo, n: 0 }
      g.n += 1
      missedRef.current.set(label, g)
    }
    const s = statsRef.current
    const streak = right ? s.streak + 1 : 0
    statsRef.current = {
      score: s.score + (right ? 1 : 0),
      total: s.total + 1,
      streak,
      best: Math.max(s.best, streak)
    }
    setStats(statsRef.current)
  }

  // The one logging funnel: guarded by loggedRef, and "new personal best" is
  // decided BEFORE invalidating (the refetched history would already contain
  // this round).
  function endGame(): void {
    const s = statsRef.current
    if (!loggedRef.current && s.total > 0) {
      loggedRef.current = true
      const prev = history?.best
      setNewBest(s.total >= 5 && (!prev || s.score / s.total > prev.score / prev.total))
      void api.quiz
        .logSession({
          kind: 'programming',
          score: s.score,
          total: s.total,
          bestStreak: s.best,
          settings: { mode, courseKey, sheetKey, snipLang, snipKind, length: lengthRef.current }
        })
        .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history('programming') }))
        .catch(() => {})
    }
    setMissGroups([...missedRef.current.values()].sort((a, b) => b.n - a.n))
    setPhase('summary')
  }

  function advance(): void {
    if (lengthRef.current > 0 && statsRef.current.total >= lengthRef.current) endGame()
    else nextQuestion()
  }

  useEffect(() => {
    if (phase !== 'play') return
    function onKey(e: KeyboardEvent): void {
      const t = e.target as HTMLElement
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t.isContentEditable)
        return
      if (!answered && e.key >= '1' && e.key <= '4') {
        const n = Number(e.key) - 1
        if (current && n < current.options.length) {
          e.preventDefault()
          handleAnswer(n)
        }
      } else if (answered && e.key === 'Enter') {
        e.preventDefault()
        advance()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, current, answered])

  if (phase === 'setup') {
    const poolSize = buildPool().length
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <PageHeader
          back={{ to: '/programming', label: 'Programming' }}
          title="Programming Quiz"
          subtitle="Multiple choice over the courses' questions, the command cheatsheets, and code snippets."
        />

        <div className="card p-5 space-y-5">
          <Group label="Mode">
            <Pill
              active={mode === 'course'}
              onClick={() => setMode('course')}
              label="Course questions"
            />
            <Pill
              active={mode === 'command'}
              onClick={() => setMode('command')}
              label="Which command?"
            />
            <Pill
              active={mode === 'snippets'}
              onClick={() => setMode('snippets')}
              label="Code snippets"
            />
          </Group>

          {mode === 'snippets' && (
            <>
              <Group label="Language">
                <Pill active={snipLang === null} onClick={() => setSnipLang(null)} label="All" />
                {SNIPPET_LANGS.map((l) => (
                  <Pill
                    key={l.key}
                    active={snipLang === l.key}
                    onClick={() => setSnipLang(l.key)}
                    label={l.label}
                  />
                ))}
              </Group>
              <Group label="Kind">
                <Pill active={snipKind === null} onClick={() => setSnipKind(null)} label="Both" />
                <Pill
                  active={snipKind === 'output'}
                  onClick={() => setSnipKind('output')}
                  label="Predict the output"
                />
                <Pill
                  active={snipKind === 'bug'}
                  onClick={() => setSnipKind('bug')}
                  label="Spot the bug"
                />
              </Group>
            </>
          )}
          {mode === 'course' && (
            <Group label="Course">
              <Pill active={courseKey === null} onClick={() => setCourseKey(null)} label="All" />
              {PROG_COURSES.map((c) => (
                <Pill
                  key={c.key}
                  active={courseKey === c.key}
                  onClick={() => setCourseKey(c.key)}
                  label={c.title}
                />
              ))}
            </Group>
          )}
          {mode === 'command' && (
            <Group label="Sheet">
              <Pill active={sheetKey === null} onClick={() => setSheetKey(null)} label="All" />
              {CHEAT_SHEETS.map((s) => (
                <Pill
                  key={s.key}
                  active={sheetKey === s.key}
                  onClick={() => setSheetKey(s.key)}
                  label={s.title}
                />
              ))}
            </Group>
          )}

          <Group label="Length">
            <Pill active={length === 10} onClick={() => setLength(10)} label="10 questions" />
            <Pill active={length === 20} onClick={() => setLength(20)} label="20 questions" />
            <Pill active={length === 0} onClick={() => setLength(0)} label="Endless" />
          </Group>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button className="btn-primary w-full" onClick={startGame}>
            Start quiz ({poolSize} questions available)
          </button>
        </div>

        <QuizRecord kind="programming" />
      </div>
    )
  }

  if (phase === 'summary') {
    const accuracy = stats.total ? Math.round((stats.score / stats.total) * 100) : 0
    return (
      <div className="p-6 max-w-md mx-auto">
        <div className="card p-6 text-center">
          <p className="text-3xl font-bold">
            {stats.score} / {stats.total}
          </p>
          <p className="mt-1 text-sm text-gray-400">
            {accuracy}% · best streak {stats.best}
          </p>
          {newBest && <p className="mt-3 text-sm text-accent">New personal best.</p>}
          {missGroups.length > 0 && (
            <div className="mt-4 text-left">
              <p className="mb-1 text-xs uppercase tracking-widest text-gray-500">Missed</p>
              <ul className="space-y-1 text-sm">
                {missGroups.slice(0, 6).map((g) => (
                  <li key={g.label} className="flex items-center justify-between gap-3">
                    <span className="min-w-0 truncate text-gray-300">
                      {g.n} from {g.label}
                    </span>
                    {g.to && (
                      <Link to={g.to} className="btn-ghost shrink-0 px-2 py-0.5 text-xs">
                        Review
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
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
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
        <span className="tabular-nums">
          {stats.total}
          {lengthRef.current > 0 ? ` / ${lengthRef.current}` : ''} · {stats.score} correct
        </span>
        <span>
          streak {stats.streak}
          <button className="btn-ghost ml-3 px-2 py-0.5 text-xs" onClick={endGame}>
            End quiz
          </button>
        </span>
      </div>

      <div className="card p-5">
        {current?.context && (
          <p className="mb-2 text-xs uppercase tracking-widest text-gray-600">{current.context}</p>
        )}
        {current?.code && (
          <pre className="mb-3 overflow-x-auto rounded-md bg-base-900 p-3 font-mono text-xs leading-relaxed">
            <code>{current.code}</code>
          </pre>
        )}
        <p className="text-lg leading-snug">{current?.prompt}</p>
      </div>

      <div className="mt-3 space-y-1.5">
        {current?.options.map((opt, i) => {
          let cls = 'border-base-700 hover:bg-base-700/60'
          if (answered) {
            if (i === current.correct) cls = 'border-green-500/60 bg-green-500/10 text-green-300'
            else if (i === picked) cls = 'border-red-500/60 bg-red-500/10 text-red-300'
            else cls = 'border-base-700 opacity-60'
          }
          return (
            <button
              key={i}
              className={`flex w-full items-start gap-3 rounded-md border px-3 py-2 text-left text-sm transition-colors ${cls}`}
              disabled={answered}
              onClick={() => handleAnswer(i)}
            >
              <kbd className="kbd mt-0.5 shrink-0">{i + 1}</kbd>
              <span className={current.mono ? 'whitespace-pre-wrap font-mono' : ''}>{opt}</span>
            </button>
          )
        })}
      </div>

      {answered && current?.explain && (
        <p className="mt-3 text-sm text-gray-400">{current.explain}</p>
      )}

      <div className="mt-4 flex justify-end gap-2">
        {!answered ? (
          <button className="btn-ghost" onClick={() => handleAnswer(null)}>
            Reveal answer
          </button>
        ) : (
          <button className="btn-primary" onClick={advance}>
            {lengthRef.current > 0 && stats.total >= lengthRef.current ? 'See results' : 'Next'}{' '}
            (Enter)
          </button>
        )}
      </div>
    </div>
  )
}

