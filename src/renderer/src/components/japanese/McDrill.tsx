import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import type { QuizKind } from '@shared/types'
import { shuffle } from '@shared/shuffle'
import StudySessionFrame, { SessionEvidence, SessionFeedback } from '../StudySessionFrame'

// The multiple-choice quiz loop shared by the confusables/loanword drills: a
// finite-or-endless deck, 1-N answer keys + Enter advance, loggedRef-guarded
// endGame, prompt/options/reveal delegated to render props. Extracted so the
// four MC drills of this wave don't each re-copy the pitch page's ~180-line
// play loop.

export interface McQuestion<T> {
  item: T
  options: { key: string; label: ReactNode; correct: boolean }[]
}

interface Stats {
  score: number
  total: number
  streak: number
  best: number
}
const ZERO: Stats = { score: 0, total: 0, streak: 0, best: 0 }

export default function McDrill<T>({
  kind,
  items,
  length, // 0 = endless (deck reshuffles)
  settings,
  buildQuestion,
  renderPrompt,
  renderReveal,
  optionClassName,
  onExit,
  title = 'Challenge'
}: {
  kind: QuizKind
  items: T[]
  length: number
  settings: Record<string, unknown>
  buildQuestion: (item: T) => McQuestion<T> | null
  renderPrompt: (q: McQuestion<T>) => ReactNode
  renderReveal: (q: McQuestion<T>, correct: boolean) => ReactNode
  optionClassName?: string
  onExit: () => void
  title?: string
}) {
  const qc = useQueryClient()
  const [question, setQuestion] = useState<McQuestion<T> | null>(null)
  const [picked, setPicked] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [stats, setStats] = useState<Stats>(ZERO)
  const [finished, setFinished] = useState(false)
  const deckRef = useRef<T[]>([])
  const statsRef = useRef<Stats>(ZERO)
  const loggedRef = useRef(false)

  function nextQuestion(): void {
    for (let tries = 0; tries < 50; tries++) {
      if (deckRef.current.length === 0) deckRef.current = shuffle(items)
      const q = buildQuestion(deckRef.current.pop()!)
      if (q) {
        setQuestion(q)
        setPicked(null)
        setAnswered(false)
        return
      }
    }
    end()
  }

  // Deal the first question once.
  useEffect(() => {
    deckRef.current = shuffle(items)
    statsRef.current = ZERO
    nextQuestion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function end(): void {
    const s = statsRef.current
    if (!loggedRef.current && s.total > 0) {
      loggedRef.current = true
      void api.quiz
        .logSession({ kind, score: s.score, total: s.total, bestStreak: s.best, settings })
        .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history(kind) }))
        .catch(() => {})
    }
    setFinished(true)
  }

  function answer(index: number | null): void {
    if (answered || !question) return
    const correct = index !== null && question.options[index]?.correct === true
    const s = statsRef.current
    const streak = correct ? s.streak + 1 : 0
    statsRef.current = {
      score: s.score + (correct ? 1 : 0),
      total: s.total + 1,
      streak,
      best: Math.max(s.best, streak)
    }
    setStats(statsRef.current)
    setPicked(index)
    setAnswered(true)
  }

  function advance(): void {
    if (length > 0 && statsRef.current.total >= length) end()
    else nextQuestion()
  }

  useEffect(() => {
    if (finished) return
    function onKey(e: KeyboardEvent): void {
      const t = e.target as HTMLElement
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t.isContentEditable)
        return
      const n = Number(e.key)
      if (!answered && n >= 1 && n <= (question?.options.length ?? 0)) {
        e.preventDefault()
        answer(n - 1)
      } else if (answered && e.key === 'Enter') {
        e.preventDefault()
        advance()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question, answered, finished])

  if (finished) {
    const accuracy = stats.total ? Math.round((stats.score / stats.total) * 100) : 0
    return (
      <StudySessionFrame title={`${title} results`} subtitle="Round summary" surface={false}>
        <div className="card p-8 text-center">
          <p className="text-sm uppercase tracking-widest text-gray-500">Round complete</p>
          <p className="mt-3 text-5xl font-bold">
            {stats.score}
            <span className="text-2xl text-gray-500"> / {stats.total}</span>
          </p>
          <div className="mt-4 flex justify-center gap-6 text-sm text-gray-400">
            <span>{accuracy}% correct</span>
            <span>Best streak {stats.best}</span>
          </div>
          <div className="mt-6 flex justify-center">
            <button className="btn-primary" onClick={onExit}>
              Back to setup
            </button>
          </div>
        </div>
      </StudySessionFrame>
    )
  }
  if (!question) return null

  const wasCorrect = picked !== null && question.options[picked]?.correct === true
  const qNum = answered ? stats.total : stats.total + 1

  return (
    <StudySessionFrame
      title={title}
      subtitle={length > 0 ? `Question ${qNum} of ${length}` : `Question ${qNum}`}
      progress={length > 0 ? { current: qNum, total: length, label: 'Round' } : undefined}
      actions={<button className="btn-ghost" onClick={end}>End round</button>}
      rail={
        <>
          <SessionEvidence title="Session evidence">
            <p>Score: {stats.score}/{stats.total}</p>
            <p>Current streak: {stats.streak}</p>
            <p>Best streak: {stats.best}</p>
          </SessionEvidence>
          <SessionEvidence title="Keyboard">
            Choose with the numbered keys. Press Enter after feedback to continue.
          </SessionEvidence>
        </>
      }
      feedback={
        answered ? (
          <SessionFeedback
            tone={wasCorrect ? 'correct' : 'incorrect'}
            title={wasCorrect ? 'Correct' : 'Review the evidence'}
          >
            {renderReveal(question, wasCorrect)}
          </SessionFeedback>
        ) : undefined
      }
    >
      {renderPrompt(question)}

      <div className={`mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 ${optionClassName ?? ''}`}>
        {question.options.map((o, i) => {
          const correct = answered && o.correct
          const wrongPick = answered && picked === i && !o.correct
          return (
            <button
              key={o.key}
              disabled={answered}
              onClick={() => answer(i)}
              className={`rounded-lg border p-3 text-left transition-colors ${
                correct
                  ? 'border-green-500 bg-green-500/15'
                  : wrongPick
                    ? 'border-red-500 bg-red-500/15'
                    : 'border-base-700 bg-base-800 hover:border-accent hover:bg-base-700'
              } ${answered ? 'cursor-default' : ''}`}
            >
              {o.label}
              <kbd className="kbd float-right">{i + 1}</kbd>
            </button>
          )
        })}
      </div>

      <div className="mt-4 flex gap-2">
        {!answered && (
          <button className="btn-ghost" onClick={() => answer(null)}>
            Reveal answer
          </button>
        )}
        {answered && (
          <button className="btn-primary" onClick={advance}>
            {length > 0 && stats.total >= length ? 'See results (Enter)' : 'Next (Enter)'}
          </button>
        )}
      </div>
    </StudySessionFrame>
  )
}
