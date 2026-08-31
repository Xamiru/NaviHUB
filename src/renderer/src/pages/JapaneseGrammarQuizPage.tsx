import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import StudySessionFrame, { SessionEvidence } from '../components/StudySessionFrame'
import QuizRecord from '../components/QuizRecord'
import { Group, Pill } from '../components/PillGroup'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import type { GrammarPoint } from '@shared/types'
import { shuffle } from '@shared/shuffle'

// Grammar cloze drill (kind 'grammar'): a real example sentence with the
// grammar point blanked out (＿＿), the EN translation always visible as the
// hint, four grammar points as options. Quizzes the imported N5-N1 catalog —
// distinct from kind 'japanese', which quizzes the user's own cards.

type Phase = 'setup' | 'play' | 'summary'
const LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'] as const

interface Question {
  point: GrammarPoint
  clozeJp: string
  clozeAnswer: string
  exampleEn: string
  fullJp: string
  options: { id: number; answer: string; title: string }[]
}

interface Stats {
  score: number
  total: number
  streak: number
  best: number
}
const ZERO: Stats = { score: 0, total: 0, streak: 0, best: 0 }

// Build a question from a point + the full fetched pool (for distractors).
function buildQuestion(point: GrammarPoint, pool: GrammarPoint[]): Question | null {
  const clozeable = point.examples.filter((e) => e.clozeJp && e.clozeAnswer)
  if (clozeable.length === 0) return null
  const ex = clozeable[Math.floor(Math.random() * clozeable.length)]
  // Distractors: other points' cloze answers, same level first, deduped by the
  // answer TEXT (two points can share a surface form).
  const taken = new Set([ex.clozeAnswer!])
  const options = [{ id: point.id, answer: ex.clozeAnswer!, title: point.title }]
  const tiers = [
    pool.filter((p) => p.id !== point.id && p.level === point.level),
    pool.filter((p) => p.id !== point.id)
  ]
  for (const tier of tiers) {
    for (const p of shuffle(tier)) {
      if (options.length >= 4) break
      const cand = p.examples.find((e) => e.clozeAnswer)?.clozeAnswer
      if (!cand || taken.has(cand)) continue
      taken.add(cand)
      options.push({ id: p.id, answer: cand, title: p.title })
    }
  }
  if (options.length < 4) return null
  return {
    point,
    clozeJp: ex.clozeJp!,
    clozeAnswer: ex.clozeAnswer!,
    exampleEn: ex.en,
    fullJp: ex.jp,
    options: shuffle(options)
  }
}

export default function JapaneseGrammarQuizPage() {
  const qc = useQueryClient()
  const [levels, setLevels] = usePersistedState<string[]>('jpGrammarQuizLevels', ['N5', 'N4'])
  const [length, setLength] = usePersistedState<number>('jpGrammarQuizLength', 10) // 0 = endless

  const [phase, setPhase] = useState<Phase>('setup')
  const [question, setQuestion] = useState<Question | null>(null)
  const [picked, setPicked] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [stats, setStats] = useState<Stats>(ZERO)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const poolRef = useRef<GrammarPoint[]>([])
  const deckRef = useRef<GrammarPoint[]>([])
  const statsRef = useRef<Stats>(ZERO)
  const lengthRef = useRef(0)
  const loggedRef = useRef(false)

  function toggleLevel(l: string): void {
    setLevels(levels.includes(l) ? levels.filter((x) => x !== l) : [...levels, l])
  }

  async function start(): Promise<void> {
    setError(null)
    setLoading(true)
    try {
      const pool = await api.dict.grammarRandom(200, levels.length ? levels : null)
      if (pool.length < 4) {
        setError(
          pool.length === 0
            ? 'No grammar points available. Install the grammar pack in Settings → Dictionaries.'
            : 'Not enough clozeable points for 4 options — widen the level selection.'
        )
        return
      }
      poolRef.current = pool
      deckRef.current = shuffle(pool)
      statsRef.current = ZERO
      lengthRef.current = length
      loggedRef.current = false
      setStats(ZERO)
      setPhase('play')
      nextQuestion()
    } finally {
      setLoading(false)
    }
  }

  function nextQuestion(): void {
    // Deck-shuffle with reshuffle-on-empty; skip points that fail to build.
    for (let tries = 0; tries < 50; tries++) {
      if (deckRef.current.length === 0) deckRef.current = shuffle(poolRef.current)
      const q = buildQuestion(deckRef.current.pop()!, poolRef.current)
      if (q) {
        setQuestion(q)
        setPicked(null)
        setAnswered(false)
        setShowExplanation(false)
        return
      }
    }
    endGame()
  }

  function handleAnswer(optionId: number | null): void {
    if (answered || !question) return
    const correct = optionId === question.point.id
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
    setPicked(optionId)
    setAnswered(true)
  }

  function endGame(): void {
    const s = statsRef.current
    if (!loggedRef.current && s.total > 0) {
      loggedRef.current = true
      void api.quiz
        .logSession({
          kind: 'grammar',
          score: s.score,
          total: s.total,
          bestStreak: s.best,
          settings: { levels, length }
        })
        .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history('grammar') }))
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
        const opt = question?.options[Number(e.key) - 1]
        if (opt) {
          e.preventDefault()
          handleAnswer(opt.id)
        }
      } else if (answered && e.key === 'Enter') {
        e.preventDefault()
        advance()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, question, answered])

  if (phase === 'setup') {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <PageHeader
          back={{ to: '/japanese/grammar', label: 'Grammar' }}
          title="Grammar Drill"
          subtitle="Fill the blank in a real sentence with the right grammar point."
        />
        <div className="card p-5 space-y-5">
          <Group label="Levels">
            {LEVELS.map((l) => (
              <button
                key={l}
                aria-pressed={levels.includes(l)}
                onClick={() => toggleLevel(l)}
                className={levels.includes(l) ? 'chip-toggle chip-toggle-active' : 'chip-toggle'}
              >
                {l}
              </button>
            ))}
          </Group>
          <Group label="Length">
            <Pill active={length === 10} onClick={() => setLength(10)} label="10 questions" />
            <Pill active={length === 20} onClick={() => setLength(20)} label="20 questions" />
            <Pill active={length === 0} onClick={() => setLength(0)} label="Endless" />
          </Group>
          {error && <p className="text-sm text-signal-anomaly">{error}</p>}
          <button
            className="btn-primary w-full"
            disabled={loading || levels.length === 0}
            onClick={() => void start()}
          >
            {loading ? 'Loading…' : 'Start drill'}
          </button>
        </div>
        <QuizRecord kind="grammar" />
      </div>
    )
  }

  if (phase === 'summary') {
    const accuracy = stats.total ? Math.round((stats.score / stats.total) * 100) : 0
    return (
      <div className="p-6 max-w-md mx-auto">
        <div className="card p-8 text-center">
          <p className="text-sm uppercase tracking-widest text-gray-500">Drill complete</p>
          <p className="mt-3 text-5xl font-bold">
            {stats.score}
            <span className="text-2xl text-gray-500"> / {stats.total}</span>
          </p>
          <div className="mt-4 flex justify-center gap-6 text-sm text-gray-400">
            <span>{accuracy}% correct</span>
            <span>Best streak {stats.best}</span>
          </div>
          <div className="mt-6 flex gap-2">
            <button className="btn-primary flex-1" onClick={() => setPhase('setup')}>
              Play again
            </button>
            <Link to="/japanese/grammar" className="btn-ghost flex-1 text-center">
              Library
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!question) return null
  const qNum = answered ? stats.total : stats.total + 1

  return (
    <StudySessionFrame
      title="Grammar drill"
      subtitle={`${question.point.level} / ${question.point.title}`}
      progress={
        lengthRef.current > 0
          ? { current: Math.min(qNum, lengthRef.current), total: lengthRef.current, label: 'Drill' }
          : undefined
      }
      actions={
        <button className="btn-ghost py-1 px-2 text-xs" onClick={endGame}>
          End drill
        </button>
      }
      rail={
        <SessionEvidence title="Session evidence">
          <dl className="space-y-3">
            <div className="flex justify-between gap-3">
              <dt>Score</dt>
              <dd className="text-white">{stats.score}/{stats.total}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Current streak</dt>
              <dd className="text-white">{stats.streak}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Best streak</dt>
              <dd className="text-white">{stats.best}</dd>
            </div>
          </dl>
        </SessionEvidence>
      }
      surface={false}
    >

      <div className="card p-8 text-center">
        <p className="text-xs uppercase tracking-widest text-gray-500">What fills the blank?</p>
        <p className="mt-3 text-2xl leading-relaxed">{question.clozeJp}</p>
        <p className="mt-2 text-sm text-gray-500">{question.exampleEn}</p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {question.options.map((o, i) => {
          const correct = answered && o.id === question.point.id
          const wrongPick = answered && picked === o.id && !correct
          return (
            <button
              key={o.id}
              disabled={answered}
              onClick={() => handleAnswer(o.id)}
              className={`rounded-lg border p-3 text-left transition-colors ${
                correct
                  ? 'border-signal-affirmative bg-signal-affirmative/15'
                  : wrongPick
                    ? 'border-signal-anomaly bg-signal-anomaly/15'
                    : 'border-base-700 bg-base-800 hover:border-accent hover:bg-base-700'
              } ${answered ? 'cursor-default' : ''}`}
            >
              <span className="text-lg font-medium">{o.answer}</span>
              <kbd className="kbd float-right">{i + 1}</kbd>
            </button>
          )
        })}
      </div>

      {answered && (
        <div className="card mt-4 p-4">
          <p
            className={`text-xs font-semibold uppercase tracking-wide ${
              picked === question.point.id ? 'text-signal-affirmative' : 'text-signal-anomaly'
            }`}
          >
            {picked === question.point.id ? 'Correct' : picked === null ? 'Skipped' : 'Incorrect'}
          </p>
          <p className="mt-1 text-base font-medium">
            {question.point.title}
            <span className="ml-2 chip bg-base-700 text-gray-400">{question.point.level}</span>
          </p>
          <p className="text-sm text-gray-300">{question.point.meaning}</p>
          {question.point.formation && (
            <p className="mt-2 rounded bg-base-900/60 px-3 py-1.5 text-sm text-gray-300">
              {question.point.formation}
            </p>
          )}
          <p className="mt-2 text-sm text-gray-200">{question.fullJp}</p>
          {question.point.explanation && (
            <div className="mt-2">
              {showExplanation ? (
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-400">
                  {question.point.explanation}
                </p>
              ) : (
                <button
                  className="text-xs text-gray-500 hover:text-gray-300"
                  onClick={() => setShowExplanation(true)}
                >
                  Show explanation
                </button>
              )}
            </div>
          )}
        </div>
      )}

      <div className="mt-4 flex gap-2">
        {!answered && (
          <button className="btn-ghost" onClick={() => handleAnswer(null)}>
            Reveal answer
          </button>
        )}
        {answered && (
          <button className="btn-primary" onClick={advance}>
            {lengthRef.current > 0 && stats.total >= lengthRef.current
              ? 'See results (Enter)'
              : 'Next (Enter)'}
          </button>
        )}
      </div>
    </StudySessionFrame>
  )
}
