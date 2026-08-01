import { useEffect, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import Section from '../Section'
import QuizRecord from '../QuizRecord'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { usePersistedState } from '../../lib/navState'
import { generateExercise, type NumberCategory, type NumberExercise } from '@shared/numbers'
import { matchState } from '@shared/typing'

// Numbers & counters tab: an endless per-keystroke typing drill over GENERATED
// exercises (the kana tab's DJT semantics, ported — checked on every keystroke,
// a dead-end shows the answer red in place, Enter empty = reveal, Enter while
// revealed = skip and re-ask a few items later). No data pack needed; all the
// euphonic tables live in @shared/numbers.

const CATEGORIES: { key: NumberCategory; label: string }[] = [
  { key: 'numbers', label: 'Numbers' },
  { key: 'time', label: 'Times' },
  { key: 'date', label: 'Dates' },
  { key: 'price', label: 'Prices' },
  { key: 'counters', label: 'Counters' }
]

export default function NumbersDrillSetup() {
  const [cats, setCats] = usePersistedState<NumberCategory[]>('jpNumbersCats', [
    'numbers',
    'counters'
  ])
  const [running, setRunning] = useState(false)

  const set = new Set(cats)
  function toggle(c: NumberCategory): void {
    setCats(set.has(c) ? cats.filter((x) => x !== c) : [...cats, c])
  }

  if (running && cats.length > 0) {
    return <NumbersDrill categories={cats} onExit={() => setRunning(false)} />
  }

  return (
    <div>
      <p className="mb-3 text-sm text-gray-400">
        Random numbers, times, dates, prices and counter phrases — with the sound changes
        (さんぼん, ろっぴゃく, ついたち) that only stick through reps. Type kana or romaji;
        it checks as you type. Endless — Stop when you&apos;re done.
      </p>
      <Section title="Categories" className="mb-5">
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => toggle(c.key)}
              className={set.has(c.key) ? 'chip-toggle chip-toggle-active' : 'chip-toggle'}
            >
              {c.label}
            </button>
          ))}
        </div>
      </Section>

      <button className="btn-primary" disabled={cats.length === 0} onClick={() => setRunning(true)}>
        Start drill
      </button>
      <p className="mt-2 text-xs text-gray-500">
        Every standard reading is accepted — じゅっぽん and じっぽん both count, 7時 takes
        しちじ or ななじ.
      </p>

      <QuizRecord kind="numbers" />
    </div>
  )
}

function NumbersDrill({
  categories,
  onExit
}: {
  categories: NumberCategory[]
  onExit: () => void
}) {
  const qc = useQueryClient()
  const inputRef = useRef<HTMLInputElement>(null)

  const gen = (): NumberExercise => {
    // generateExercise is total over non-empty categories; the ! is safe.
    return generateExercise(categories, Math.random)!
  }

  const [current, setCurrent] = useState<NumberExercise>(gen)
  // Items re-injected by a skip, waiting their turn (DJT's "comes back soon").
  const upcomingRef = useRef<NumberExercise[]>([])
  const [input, setInput] = useState('')
  const [wrong, setWrong] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [missed, setMissed] = useState<Set<string>>(new Set())
  const [stopped, setStopped] = useState(false)
  const loggedRef = useRef(false)

  useEffect(() => {
    if (!stopped || loggedRef.current || answered === 0) return
    loggedRef.current = true
    void api.quiz
      .logSession({
        kind: 'numbers',
        score: correct,
        total: answered,
        bestStreak,
        settings: { categories }
      })
      .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history('numbers') }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stopped])

  function advance(requeueCurrent: boolean): void {
    const q = upcomingRef.current
    if (requeueCurrent) {
      // Re-ask the skipped item after 3 fresh ones (a single re-ask — the
      // stream is infinite, DJT's second +13 splice adds nothing here).
      while (q.length < 3) q.push(gen())
      q.splice(3, 0, current)
    }
    setCurrent(q.length > 0 ? q.shift()! : gen())
    setInput('')
    setWrong(false)
    inputRef.current?.focus()
  }

  function miss(): void {
    if (wrong) return
    setWrong(true)
    setStreak(0)
    setMissed((m) => new Set(m).add(current.prompt))
  }

  function onType(value: string): void {
    setInput(value)
    const typed = value.trim()
    if (!typed) return
    const state = matchState(typed, current.answers)
    if (state === 'match') {
      setAnswered((n) => n + 1)
      if (!wrong) {
        setCorrect((n) => n + 1)
        const s = streak + 1
        setStreak(s)
        setBestStreak((b) => Math.max(b, s))
      }
      advance(false)
      return
    }
    if (state === 'wrong') miss()
  }

  function onEnter(): void {
    if (!wrong) {
      if (!input.trim()) miss()
      return
    }
    setAnswered((n) => n + 1) // skipped: counted as answered, never as correct
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
          <p className="mt-3 text-lg text-gray-300">
            <span className="mr-2 text-xs uppercase tracking-widest text-gray-500">Missed</span>
            {[...missed].join('　')}
          </p>
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

      <p className="text-center text-6xl leading-none">{current.prompt}</p>

      <div className="mx-auto mt-6 max-w-xs">
        <input
          ref={inputRef}
          className="input w-full text-center text-lg"
          placeholder="type the reading…"
          value={input}
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          onChange={(e) => onType(e.target.value)}
          onKeyDown={(e) => {
            // Space is never part of a reading here either — second Enter.
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onEnter()
            }
          }}
        />
      </div>

      <p className="mt-4 text-center text-sm">
        {wrong ? (
          <span className="text-red-400">
            {current.prompt} = {current.answers[0]}
            <span className="ml-2 text-xs text-gray-500">Enter to skip</span>
          </span>
        ) : (
          <span>&nbsp;</span>
        )}
      </p>
    </div>
  )
}
