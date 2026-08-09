import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import PageHeader from '../components/PageHeader'
import QuizRecord from '../components/QuizRecord'
import { Group, Pill } from '../components/PillGroup'
import { EN_MECHANICS } from '@shared/english/mechanics'
import type { EnMechanicsCategory } from '@shared/english/types'

// Mechanics drill over the authored error-spot items (content is code —
// src/shared/english/mechanics.ts): articles, punctuation, sentence
// boundaries, confusables, register, spelling. The ProgrammingQuizPage loop;
// every answer shows the rule.

type Phase = 'setup' | 'play' | 'summary'
type Category = EnMechanicsCategory | 'all'

interface Question {
  key: string
  category: EnMechanicsCategory
  prompt: string
  options: string[]
  correct: number
  explain: string
}

interface Stats {
  score: number
  total: number
  streak: number
  best: number
}
const ZERO: Stats = { score: 0, total: 0, streak: 0, best: 0 }

const CATEGORY_LABEL: Record<Category, string> = {
  all: 'Everything',
  articles: 'Articles',
  punctuation: 'Punctuation',
  boundaries: 'Sentence boundaries',
  confusables: 'Confusables',
  register: 'Register',
  spelling: 'Spelling'
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// A shuffle biased toward what the LLM writing grader keeps catching you doing,
// WITHOUT duplicating entries: an earlier version pushed 2-3 copies of an item
// into the pool, so one 10-question round could ask the same prompt twice (with
// independently shuffled options, so it did not even read as a repeat) while
// the setup screen counted the unweighted pool. Efraimidis-Spirakis weighted
// sampling without replacement — a heavier category drifts earlier in the deck,
// every item still appears exactly once, and the count stays honest.
function orderDeck(pool: Question[], weights?: Map<string, number>): Question[] {
  if (!weights || weights.size === 0) return shuffle(pool)
  return [...pool]
    .map((q) => ({ q, key: Math.random() ** (1 / (1 + (weights.get(q.category) ?? 0))) }))
    .sort((a, b) => b.key - a.key)
    .map((x) => x.q)
}

function buildPool(category: Category): Question[] {
  const items = category === 'all' ? EN_MECHANICS : EN_MECHANICS.filter((m) => m.category === category)
  return items.map((m) => {
    const answer = m.options[m.correct]
    const options = shuffle(m.options)
    return {
      key: m.key,
      category: m.category,
      prompt: m.prompt,
      options,
      correct: options.indexOf(answer),
      explain: m.explain
    }
  })
}

export default function EnglishMechanicsPage() {
  const qc = useQueryClient()
  const [phase, setPhase] = useState<Phase>('setup')
  const [category, setCategory] = usePersistedState<Category>('enMechCategory', 'all')
  // Read once for the round; a tally that arrives mid-round must not reshuffle.
  const { data: tally } = useQuery({
    queryKey: qk.english.errorTally,
    queryFn: () => api.english.errorTally()
  })
  const weights = new Map((tally?.byCategory ?? []).map((c) => [c.category, c.count]))
  const [length, setLength] = usePersistedState<number>('enMechLength', 10)

  const [current, setCurrent] = useState<Question | null>(null)
  const [picked, setPicked] = useState<number | null>(null)
  const [stats, setStats] = useState<Stats>(ZERO)
  const [newBest, setNewBest] = useState(false)

  const deckRef = useRef<Question[]>([])
  const poolRef = useRef<Question[]>([])
  const statsRef = useRef<Stats>(ZERO)
  const lengthRef = useRef(10)
  const loggedRef = useRef(false)

  const { data: history } = useQuery({
    queryKey: qk.quiz.history('englishMechanics'),
    queryFn: () => api.quiz.history('englishMechanics')
  })

  const answered = picked !== null

  function startGame(): void {
    const pool = buildPool(category)
    poolRef.current = pool
    deckRef.current = orderDeck(pool, category === 'all' ? weights : undefined)
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
    setPicked(index ?? -1)
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

  function endGame(): void {
    const s = statsRef.current
    if (!loggedRef.current && s.total > 0) {
      loggedRef.current = true
      const prev = history?.best
      setNewBest(s.total >= 5 && (!prev || s.score / s.total > prev.score / prev.total))
      void api.quiz
        .logSession({
          kind: 'englishMechanics',
          score: s.score,
          total: s.total,
          bestStreak: s.best,
          settings: { category, length: lengthRef.current }
        })
        .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history('englishMechanics') }))
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
    const poolSize = buildPool(category).length
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <PageHeader
          back={{ to: '/english', label: 'English' }}
          title="Mechanics"
          subtitle="Accuracy drills on the details that separate good writing from polished writing."
        />

        <div className="card p-5 space-y-5">
          <Group label="Focus">
            {(Object.keys(CATEGORY_LABEL) as Category[]).map((c) => (
              <Pill
                key={c}
                active={category === c}
                onClick={() => setCategory(c)}
                label={CATEGORY_LABEL[c]}
              />
            ))}
          </Group>

          <Group label="Length">
            <Pill active={length === 10} onClick={() => setLength(10)} label="10 questions" />
            <Pill active={length === 20} onClick={() => setLength(20)} label="20 questions" />
            <Pill active={length === 0} onClick={() => setLength(0)} label="Endless" />
          </Group>

          <button className="btn-primary w-full" onClick={startGame}>
            Start drill ({poolSize} questions available)
          </button>
        </div>

        <QuizRecord kind="englishMechanics" />
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
            <Link to="/english" className="btn-ghost">
              English
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
            End drill
          </button>
        </span>
      </div>

      <div className="card p-5">
        <p className="mb-2 text-xs uppercase tracking-widest text-gray-600">
          {current ? CATEGORY_LABEL[current.category] : ''}
        </p>
        <p className="text-base leading-snug">{current?.prompt}</p>
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
              <span>{opt}</span>
            </button>
          )
        })}
      </div>

      {answered && current && <p className="mt-3 text-sm text-gray-400">{current.explain}</p>}

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
