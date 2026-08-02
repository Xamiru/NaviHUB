import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import PageHeader from '../components/PageHeader'
import QuizRecord from '../components/QuizRecord'
import Markdown from '../components/Markdown'
import { EN_PASSAGES } from '@shared/english/passages'
import type { EnPassage, EnReadingQuestion } from '@shared/english/types'

// Reading comprehension over the authored C1/C2 passages (content is code —
// src/shared/english/passages.ts). Pick a passage, read it, answer its
// questions in order with the text still on screen; one quiz_session row of
// kind 'englishReading' per finished passage.

type Phase = 'setup' | 'play' | 'summary'

interface Question {
  q: EnReadingQuestion
  options: string[]
  correct: number
}

const KIND_LABEL: Record<EnReadingQuestion['kind'], string> = {
  'main-idea': 'Main idea',
  inference: 'Inference',
  'vocab-in-context': 'Vocabulary in context',
  tone: 'Tone',
  detail: 'Detail'
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const wordCount = (text: string): number => text.split(/\s+/).filter(Boolean).length

export default function EnglishReadingPage() {
  const qc = useQueryClient()
  const [phase, setPhase] = useState<Phase>('setup')
  const [passage, setPassage] = useState<EnPassage | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [newBest, setNewBest] = useState(false)

  const scoreRef = useRef(0)
  const loggedRef = useRef(false)

  const { data: history } = useQuery({
    queryKey: qk.quiz.history('englishReading'),
    queryFn: () => api.quiz.history('englishReading')
  })

  const current = questions[index] ?? null
  const answered = picked !== null

  function start(p: EnPassage): void {
    setPassage(p)
    setQuestions(
      p.questions.map((q) => {
        const answer = q.options[q.correct]
        const options = shuffle(q.options)
        return { q, options, correct: options.indexOf(answer) }
      })
    )
    setIndex(0)
    setPicked(null)
    setScore(0)
    scoreRef.current = 0
    loggedRef.current = false
    setNewBest(false)
    setPhase('play')
  }

  function handleAnswer(i: number | null): void {
    if (picked !== null || !current) return
    setPicked(i ?? -1)
    if (i !== null && i === current.correct) {
      scoreRef.current += 1
      setScore(scoreRef.current)
    }
  }

  function endGame(): void {
    if (!passage) return
    if (!loggedRef.current) {
      loggedRef.current = true
      const total = questions.length
      const prev = history?.best
      setNewBest(total >= 4 && (!prev || scoreRef.current / total > prev.score / prev.total))
      void api.quiz
        .logSession({
          kind: 'englishReading',
          score: scoreRef.current,
          total,
          bestStreak: 0,
          settings: { passageKey: passage.key, level: passage.level }
        })
        .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history('englishReading') }))
        .catch(() => {})
    }
    setPhase('summary')
  }

  function advance(): void {
    if (index + 1 >= questions.length) endGame()
    else {
      setIndex((i) => i + 1)
      setPicked(null)
    }
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
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <PageHeader
          back={{ to: '/english', label: 'English' }}
          title="Reading"
          subtitle="Advanced passages with exam-style questions — read closely, the traps are deliberate."
        />

        <div className="space-y-2">
          {EN_PASSAGES.map((p) => (
            <button
              key={p.key}
              className="card flex w-full items-center justify-between gap-4 p-4 text-left transition-colors hover:border-accent/60"
              onClick={() => start(p)}
            >
              <span>
                <span className="block font-medium">{p.title}</span>
                <span className="mt-0.5 block text-xs text-gray-500">
                  {p.topic} · {wordCount(p.text)} words · {p.questions.length} questions
                </span>
              </span>
              <span
                className={`chip ${p.level === 'C2' ? 'bg-accent/15 text-accent' : 'bg-base-700 text-gray-300'}`}
              >
                {p.level}
              </span>
            </button>
          ))}
        </div>

        <QuizRecord kind="englishReading" />
      </div>
    )
  }

  if (phase === 'summary') {
    const total = questions.length
    const accuracy = total ? Math.round((score / total) * 100) : 0
    return (
      <div className="p-6 max-w-md mx-auto">
        <div className="card p-6 text-center">
          <p className="text-sm text-gray-500">{passage?.title}</p>
          <p className="mt-2 text-3xl font-bold">
            {score} / {total}
          </p>
          <p className="mt-1 text-sm text-gray-400">{accuracy}%</p>
          {newBest && <p className="mt-3 text-sm text-accent">New personal best.</p>}
          <div className="mt-5 flex justify-center gap-2">
            <button className="btn-primary" onClick={() => setPhase('setup')}>
              Another passage
            </button>
            <Link to="/english" className="btn-ghost">
              English
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!passage || !current) return null

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
        <span className="tabular-nums">
          Question {index + 1} / {questions.length} · {score} correct
        </span>
        <button className="btn-ghost px-2 py-0.5 text-xs" onClick={endGame}>
          End test
        </button>
      </div>

      <div className="card max-h-[45vh] overflow-y-auto p-5">
        <p className="mb-2 text-xs uppercase tracking-widest text-gray-600">
          {passage.title} · {passage.level}
        </p>
        <Markdown text={passage.text} />
      </div>

      <div className="card mt-3 p-4">
        <p className="mb-1 text-xs uppercase tracking-widest text-gray-600">
          {KIND_LABEL[current.q.kind]}
        </p>
        <p className="text-base leading-snug">{current.q.prompt}</p>
      </div>

      <div className="mt-3 space-y-1.5">
        {current.options.map((opt, i) => {
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
              <span>{opt}</span>
            </button>
          )
        })}
      </div>

      {answered && <p className="mt-3 text-sm text-gray-400">{current.q.explain}</p>}

      <div className="mt-4 flex justify-end gap-2">
        {!answered ? (
          <button className="btn-ghost" onClick={() => handleAnswer(null)}>
            Reveal answer
          </button>
        ) : (
          <button className="btn-primary" onClick={advance}>
            {index + 1 >= questions.length ? 'See results' : 'Next'} (Enter)
          </button>
        )}
      </div>
    </div>
  )
}
