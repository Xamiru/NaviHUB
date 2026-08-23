import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import type { QuizKind } from '@shared/types'

// One answer slot in a library-MCQ question: a stable numeric key (what the
// page compares against correctKey) plus its visual.
export interface McOption {
  key: number
  node: ReactNode
}

// One question of a library quiz. The prompt and option visuals are built by
// the page; the frame owns the loop around them.
export interface McQuestion {
  key: string // react key
  correctKey: number
  prompt: ReactNode
  options: McOption[]
}

interface Stats {
  score: number
  total: number
  streak: number
  best: number
}

const TIMER_SECONDS = 20
const AUTONEXT_MS = 3500

const EMPTY_STATS: Stats = { score: 0, total: 0, streak: 0, best: 0 }

interface Props {
  kind: QuizKind
  questions: McQuestion[]
  settings: Record<string, unknown> // round-options snapshot for quiz_session
  timed: boolean
  onPlayAgain: () => void // rebuild questions; the page remounts us via key
  backTo: { to: string; label: string }
}

// Shared MCQ round for the library quizzes (character / VA / synopsis): owns
// the index, streak/score, optional countdown, keyboard answering (1-4 +
// Enter), reveal, auto-advance, the one-shot endGame() session log with its
// new-best decision BEFORE invalidation, and the summary screen.
export default function LibMcRound({ kind, questions, settings, timed, onPlayAgain, backTo }: Props) {
  const qc = useQueryClient()
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [stats, setStats] = useState<Stats>(EMPTY_STATS)
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS)
  const [newBest, setNewBest] = useState(false)
  const [done, setDone] = useState(false)

  const { data: history } = useQuery({
    queryKey: qk.quiz.history(kind),
    queryFn: () => api.quiz.history(kind)
  })

  const statsRef = useRef(EMPTY_STATS)
  const answeredRef = useRef(false)
  const autoRef = useRef<number | null>(null)
  const loggedRef = useRef(false)

  const q = questions[idx]

  function clearAuto() {
    if (autoRef.current != null) {
      window.clearTimeout(autoRef.current)
      autoRef.current = null
    }
  }

  useEffect(() => () => clearAuto(), [])

  // Countdown while the current question is live.
  useEffect(() => {
    if (!timed || done || !q || answered) return
    const id = window.setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000)
    return () => window.clearInterval(id)
  }, [timed, done, q, answered])

  // Time's up counts as a miss.
  useEffect(() => {
    if (!done && timed && q && !answeredRef.current && timeLeft <= 0) {
      handleAnswer(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, answered, timed, done, q])

  // Keyboard: 1-4 answers, Enter advances (same scheme as the song quiz).
  useEffect(() => {
    if (done || !q) return
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t.isContentEditable)
        return
      if (!answeredRef.current && e.key >= '1' && e.key <= String(q.options.length)) {
        const opt = q.options[Number(e.key) - 1]
        if (opt) {
          e.preventDefault()
          handleAnswer(opt.key)
        }
      } else if (answeredRef.current && e.key === 'Enter') {
        e.preventDefault()
        advance()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, q, answered])

  function handleAnswer(key: number | null) {
    if (answeredRef.current || !q) return
    answeredRef.current = true
    const correct = key != null && key === q.correctKey
    const s = statsRef.current
    const streak = correct ? s.streak + 1 : 0
    const next: Stats = {
      score: s.score + (correct ? 1 : 0),
      total: s.total + 1,
      streak,
      best: Math.max(s.best, streak)
    }
    statsRef.current = next
    setStats(next)
    setPicked(key)
    setAnswered(true)
    autoRef.current = window.setTimeout(() => advance(), AUTONEXT_MS)
  }

  function advance() {
    clearAuto()
    if (idx + 1 >= questions.length) endGame()
    else {
      answeredRef.current = false
      setIdx(idx + 1)
      setPicked(null)
      setAnswered(false)
      setTimeLeft(TIMER_SECONDS)
    }
  }

  function endGame() {
    clearAuto()
    const s = statsRef.current
    if (!loggedRef.current && s.total > 0) {
      loggedRef.current = true
      // Decide "new personal best" BEFORE invalidating, or the refetched
      // history would already contain this round and the banner would flip.
      const prev = history?.best
      setNewBest(s.total >= 5 && (!prev || s.score / s.total > prev.score / prev.total))
      void api.quiz
        .logSession({ kind, score: s.score, total: s.total, bestStreak: s.best, settings })
        .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history(kind) }))
        .catch(() => {})
    }
    setDone(true)
  }

  if (done) {
    const accuracy = stats.total ? Math.round((stats.score / stats.total) * 100) : 0
    return (
      <div className="p-6 max-w-lg mx-auto">
        <div className="card p-10 text-center">
          <p className="text-sm uppercase tracking-widest text-gray-500">Quiz complete</p>
          <p className="mt-3 text-6xl font-bold">
            {stats.score}
            <span className="text-3xl text-gray-500"> / {stats.total}</span>
          </p>
          <div className="mt-4 flex justify-center gap-6 text-base text-gray-400">
            <span>{accuracy}% correct</span>
            <span>Best streak {stats.best}</span>
          </div>
          {newBest && <p className="mt-3 text-sm font-semibold text-accent">New personal best.</p>}
          <div className="mt-6 flex gap-2">
            <button className="btn-primary flex-1" onClick={onPlayAgain}>
              Play again
            </button>
            <Link to={backTo.to} className="btn-ghost flex-1 text-center">
              Back to {backTo.label}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const timePct = Math.max(0, Math.min(100, (timeLeft / TIMER_SECONDS) * 100))
  const isLast = idx + 1 >= questions.length

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-4 flex items-center justify-between text-base">
        <span className="font-medium">
          Question {idx + 1} of {questions.length}
        </span>
        <div className="flex items-center gap-4 text-gray-400">
          <span>
            Score {stats.score}/{stats.total}
          </span>
          <span>Streak {stats.streak}</span>
          <button className="btn-ghost py-1 px-2 text-sm" onClick={endGame}>
            End quiz
          </button>
        </div>
      </div>

      {timed && !answered && (
        <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-base-700">
          <div
            className={`h-full transition-[width] duration-1000 ease-linear ${
              timeLeft <= 5 ? 'bg-red-500' : 'bg-accent'
            }`}
            style={{ width: `${timePct}%` }}
          />
        </div>
      )}

      <div className="card p-8">{q.prompt}</div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {q.options.map((o, i) => {
          const correct = answered && o.key === q.correctKey
          const wrongPick = answered && picked === o.key && !correct
          return (
            <button
              key={o.key}
              disabled={answered}
              onClick={() => handleAnswer(o.key)}
              className={`flex items-center gap-4 rounded-xl border p-3 text-left transition-colors ${
                correct
                  ? 'border-green-500 bg-green-500/15'
                  : wrongPick
                    ? 'border-red-500 bg-red-500/15'
                    : 'border-base-700 bg-base-800 hover:border-accent hover:bg-base-700'
              } ${answered ? 'cursor-default' : ''}`}
            >
              {o.node}
              <kbd className="kbd ml-auto shrink-0 self-start">{i + 1}</kbd>
            </button>
          )
        })}
      </div>

      <div className="mt-5 flex gap-2">
        {!answered && (
          <button className="btn-ghost px-5 py-2.5 text-base" onClick={() => handleAnswer(null)}>
            Reveal answer
          </button>
        )}
        {answered &&
          (isLast ? (
            <button className="btn-primary px-5 py-2.5 text-base" onClick={endGame}>
              See results (Enter)
            </button>
          ) : (
            <button className="btn-primary px-5 py-2.5 text-base" onClick={advance}>
              Next (Enter)
            </button>
          ))}
      </div>
    </div>
  )
}
