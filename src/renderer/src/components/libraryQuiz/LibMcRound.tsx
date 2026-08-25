import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import type { QuizKind } from '@shared/types'
import { answerIsCorrect, isNewQuizBest, quizScorePolicy, quizSeed } from '@shared/quizCore'
import StudySessionFrame, { SessionFeedback } from '../StudySessionFrame'

// One answer slot in a library-MCQ question: a stable numeric key (what the
// page compares against correctKey) plus its visual.
export interface McOption {
  key: string
  node: ReactNode
}

// One question of a library quiz. The prompt and option visuals are built by
// the page; the frame owns the loop around them.
export interface McQuestion {
  key: string // react key
  validKeys: string[]
  prompt: ReactNode | ((controls: { skip: () => void }) => ReactNode)
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

const QUIZ_TITLE: Partial<Record<QuizKind, string>> = {
  character: 'Character challenge',
  va: 'Voice actor challenge',
  synopsis: 'Synopsis challenge',
  mangaPanel: 'Manga panel challenge'
}

interface Props {
  kind: QuizKind
  questions: McQuestion[]
  settings: Record<string, unknown> // round-options snapshot for quiz_session
  timed: boolean
  targetLength?: number
  onPlayAgain: () => void // rebuild questions; the page remounts us via key
  backTo: { to: string; label: string }
}

// Shared MCQ round for the library quizzes (character / VA / synopsis): owns
// the index, streak/score, optional countdown, keyboard answering (1-4 +
// Enter), reveal, auto-advance, the one-shot endGame() session log with its
// new-best decision BEFORE invalidation, and the summary screen.
export default function LibMcRound({ kind, questions, settings, timed, targetLength = questions.length, onPlayAgain, backTo }: Props) {
  const qc = useQueryClient()
  const seedRef = useRef(
    typeof settings.seed === 'number' ? settings.seed : quizSeed(`${Date.now()}-${Math.random()}`)
  )
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [answered, setAnswered] = useState(false)
  const [stats, setStats] = useState<Stats>(EMPTY_STATS)
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS)
  const [newBest, setNewBest] = useState(false)
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'failed'>('idle')
  const [done, setDone] = useState(false)

  const { data: history } = useQuery({
    queryKey: qk.quiz.history(kind),
    queryFn: () => api.quiz.history(kind)
  })

  const statsRef = useRef(EMPTY_STATS)
  const answeredRef = useRef(false)
  const autoRef = useRef<number | null>(null)
  const loggedRef = useRef(false)
  const invalidRef = useRef(new Set<string>())

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

  function handleAnswer(key: string | null) {
    if (answeredRef.current || !q) return
    answeredRef.current = true
    const correct = answerIsCorrect(q.validKeys, key)
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
    if (statsRef.current.total >= targetLength || idx + 1 >= questions.length) endGame()
    else {
      answeredRef.current = false
      setIdx(idx + 1)
      setPicked(null)
      setAnswered(false)
      setTimeLeft(TIMER_SECONDS)
    }
  }

  function skipInvalidQuestion() {
    if (!q || answeredRef.current || invalidRef.current.has(q.key)) return
    invalidRef.current.add(q.key)
    clearAuto()
    if (idx + 1 >= questions.length) endGame()
    else {
      setIdx((current) => current + 1)
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
      const policy = quizScorePolicy(kind)
      const sessionSettings = {
        ...settings,
        correct: s.score,
        attempted: s.total,
        scorePolicy: policy,
        playMode: 'solo',
        seed: seedRef.current
      }
      setNewBest(
        isNewQuizBest(
          { score: s.score, total: s.total, settings: sessionSettings },
          history?.best ?? null,
          policy
        )
      )
      void api.quiz
        .logSession({
          kind,
          score: s.score,
          total: s.total,
          bestStreak: s.best,
          settings: sessionSettings
        })
        .then(() => {
          setSaveState('saved')
          return qc.invalidateQueries({ queryKey: qk.quiz.history(kind) })
        })
        .catch((error) => {
          setSaveState('failed')
          throw error
        })
      setSaveState('saving')
    }
    setDone(true)
  }

  if (done) {
    const accuracy = stats.total ? Math.round((stats.score / stats.total) * 100) : 0
    return (
      <StudySessionFrame title="Quiz complete" subtitle={QUIZ_TITLE[kind] ?? 'Challenge broadcast'}>
        <div className="py-3 text-center">
          {saveState === 'saving' && <p className="text-sm text-gray-400">Saving session…</p>}
          {saveState === 'failed' && <p className="text-sm text-red-400">Session was not saved.</p>}
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
      </StudySessionFrame>
    )
  }

  const timePct = Math.max(0, Math.min(100, (timeLeft / TIMER_SECONDS) * 100))
  const isLast = stats.total >= targetLength || idx + 1 >= questions.length

  return (
    <StudySessionFrame
      title={QUIZ_TITLE[kind] ?? 'Challenge broadcast'}
      subtitle={timed ? `${TIMER_SECONDS} second timed round` : 'Library relationship challenge'}
      progress={{ current: Math.min(stats.total + 1, targetLength), total: targetLength, label: 'Questions' }}
      actions={
        <>
          <span>
            Score {stats.score}/{stats.total}
          </span>
          <span>Streak {stats.streak}</span>
          <button className="btn-ghost py-1 px-2 text-sm" onClick={endGame}>
            End quiz
          </button>
        </>
      }
      feedback={
        answered ? (
          <SessionFeedback
            tone={answerIsCorrect(q.validKeys, picked) ? 'correct' : 'incorrect'}
            title={answerIsCorrect(q.validKeys, picked) ? 'Correct' : 'Answer revealed'}
          >
            Continue when you are ready. Enter advances without changing the scoring rules.
          </SessionFeedback>
        ) : undefined
      }
    >

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

      <div>{typeof q.prompt === 'function' ? q.prompt({ skip: skipInvalidQuestion }) : q.prompt}</div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {q.options.map((o, i) => {
          const correct = answered && q.validKeys.includes(o.key)
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
    </StudySessionFrame>
  )
}
