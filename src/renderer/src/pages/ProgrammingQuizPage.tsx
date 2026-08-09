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
import type { CheatEntry } from '@shared/programming/types'

// Multiple-choice quiz over the programming section, in the Quiz hub. Two
// pools, both built entirely in the renderer from the code catalog (no IPC —
// the content is shared/programming): the courses' own check questions, and
// "which command does this" over the cheatsheets. Same loop as the Japanese
// quiz: 1-4 to answer, Enter to advance, one endGame() funnel that logs a
// quiz_session row of kind 'programming'.

type Phase = 'setup' | 'play' | 'summary'
type Mode = 'course' | 'command'

interface Question {
  id: string
  prompt: string
  context: string | null // small line above the prompt (course / sheet)
  options: string[]
  correct: number
  explain: string | null
}

interface Stats {
  score: number
  total: number
  streak: number
  best: number
}
const ZERO: Stats = { score: 0, total: 0, streak: 0, best: 0 }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Course questions already ship four options; only their display order is
// shuffled, so `correct` is re-found by identity.
function courseQuestions(courseKey: string | null): Question[] {
  const courses = courseKey ? PROG_COURSES.filter((c) => c.key === courseKey) : PROG_COURSES
  const out: Question[] = []
  for (const c of courses) {
    for (const l of c.lessons) {
      l.questions.forEach((q, i) => {
        const answer = q.options[q.correct]
        const options = shuffle(q.options)
        out.push({
          id: `${c.key}/${l.key}/${i}`,
          prompt: q.prompt,
          context: `${c.title} · ${l.title}`,
          options,
          correct: options.indexOf(answer),
          explain: q.explain ?? null
        })
      })
    }
  }
  return out
}

// "Which command does X?" — the answer is the entry's command, distractors are
// other commands from the same sheet (falling back to every sheet for the
// short ones), deduped by rendered text.
//
// Distractors are drawn from entries of the SAME KIND as the answer, where the
// presence of `answers` is the signal: entries that carry one are real CLI
// invocations, entries without one are keystrokes (tmux's `prefix d` and
// friends, left answers-less on purpose so they never enter the typing drill).
// Mixing the two made a CLI prompt offer three chord-shaped options that are
// eliminable on sight — and vice versa.
const isCommand = (e: CheatEntry): boolean => !!e.answers?.length

function commandQuestions(sheetKey: string | null): Question[] {
  const sheets = sheetKey ? CHEAT_SHEETS.filter((s) => s.key === sheetKey) : CHEAT_SHEETS
  // Precomputed once per call, not once per entry: rebuilding these inside the
  // loop made the whole pool O(entries²) over ~180 entries.
  const allByKind = {
    true: CHEAT_SHEETS.flatMap((s) => s.entries.filter(isCommand).map((e) => e.cmd)),
    false: CHEAT_SHEETS.flatMap((s) => s.entries.filter((e) => !isCommand(e)).map((e) => e.cmd))
  }
  const out: Question[] = []
  for (const sheet of sheets) {
    const sheetByKind = {
      true: sheet.entries.filter(isCommand).map((e) => e.cmd),
      false: sheet.entries.filter((e) => !isCommand(e)).map((e) => e.cmd)
    }
    for (const entry of sheet.entries) {
      const kind = String(isCommand(entry)) as 'true' | 'false'
      const taken = new Set([entry.cmd])
      const distractors: string[] = []
      for (const pool of [sheetByKind[kind], allByKind[kind]]) {
        for (const cmd of shuffle(pool)) {
          if (distractors.length >= 3) break
          if (taken.has(cmd)) continue
          taken.add(cmd)
          distractors.push(cmd)
        }
        if (distractors.length >= 3) break
      }
      if (distractors.length < 3) continue
      const options = shuffle([entry.cmd, ...distractors])
      out.push({
        id: `${sheet.key}/${entry.cmd}`,
        prompt: entry.desc,
        context: sheet.title,
        options,
        correct: options.indexOf(entry.cmd),
        explain: entry.example ? `Example: ${entry.example}` : null
      })
    }
  }
  return out
}

export default function ProgrammingQuizPage() {
  const qc = useQueryClient()
  const [phase, setPhase] = useState<Phase>('setup')
  const [mode, setMode] = usePersistedState<Mode>('progQuizMode', 'course')
  const [courseKey, setCourseKey] = usePersistedState<string | null>('progQuizCourse', null)
  const [sheetKey, setSheetKey] = usePersistedState<string | null>('progQuizSheet', null)
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

  const { data: history } = useQuery({
    queryKey: qk.quiz.history('programming'),
    queryFn: () => api.quiz.history('programming')
  })

  const answered = picked !== null

  function startGame(): void {
    const pool = mode === 'course' ? courseQuestions(courseKey) : commandQuestions(sheetKey)
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
          settings: { mode, courseKey, sheetKey, length: lengthRef.current }
        })
        .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history('programming') }))
        .catch(() => {})
    }
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
    const poolSize =
      mode === 'course' ? courseQuestions(courseKey).length : commandQuestions(sheetKey).length
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <PageHeader
          back={{ to: '/quiz', label: 'Quiz' }}
          title="Programming Quiz"
          subtitle="Multiple choice over the courses' questions and the command cheatsheets."
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
          </Group>

          {mode === 'course' ? (
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
          ) : (
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
              <span className={mode === 'command' ? 'font-mono' : ''}>{opt}</span>
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

