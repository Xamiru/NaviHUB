import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import PageHeader from '../components/PageHeader'
import QuizRecord from '../components/QuizRecord'
import StudySessionFrame, { SessionEvidence } from '../components/StudySessionFrame'
import { Group, Pill } from '../components/PillGroup'
import { EN_SPOT_ERRORS } from '@shared/english/spotErrors'
import { EN_MECHANICS_CATEGORIES, type EnMechanicsCategory, type EnSpotErrorItem } from '@shared/english/types'
import { weightedOrder } from '@shared/english/weightedDeck'
import { shuffle } from '@shared/shuffle'

// Spot-the-error: one sentence, one wrong word (or none) — click it, or press
// 0 for "No error". Weighted toward the categories the writing grader keeps
// flagging when Focus = everything (same weighting as the mechanics test).
// One quiz_session of kind 'englishSpotError' per round.

type Phase = 'setup' | 'play' | 'summary'
type Focus = 'all' | EnMechanicsCategory

const CAT_LABEL: Record<EnMechanicsCategory, string> = {
  articles: 'Articles & agreement',
  punctuation: 'Punctuation',
  boundaries: 'Sentence boundaries',
  confusables: 'Confusables',
  register: 'Register',
  spelling: 'Spelling'
}

export default function EnglishSpotErrorPage() {
  const qc = useQueryClient()
  const [phase, setPhase] = useState<Phase>('setup')
  const [focus, setFocus] = usePersistedState<Focus>('enSpotFocus', 'all')
  const [length, setLength] = usePersistedState<number>('enSpotLength', 10)

  const { data: history } = useQuery({
    queryKey: qk.quiz.history('englishSpotError'),
    queryFn: () => api.quiz.history('englishSpotError')
  })
  const { data: tally } = useQuery({
    queryKey: qk.english.errorTally,
    queryFn: () => api.english.errorTally()
  })

  const pool = useMemo(
    () => (focus === 'all' ? EN_SPOT_ERRORS : EN_SPOT_ERRORS.filter((i) => i.category === focus)),
    [focus]
  )

  const deckRef = useRef<EnSpotErrorItem[]>([])
  const [current, setCurrent] = useState<EnSpotErrorItem | null>(null)
  const [picked, setPicked] = useState<number | null | undefined>(undefined) // undefined = unanswered; null = "no error"
  const [cursor, setCursor] = useState(0)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [newBest, setNewBest] = useState(false)
  const loggedRef = useRef(false)
  const answered = picked !== undefined

  function start(): void {
    const weights = new Map((tally?.byCategory ?? []).map((c) => [c.category, c.count]))
    deckRef.current =
      focus === 'all' && weights.size > 0
        ? weightedOrder(pool, (i) => weights.get(i.category) ?? 0)
        : shuffle(pool)
    setScore(0)
    setTotal(0)
    setStreak(0)
    setBestStreak(0)
    setNewBest(false)
    loggedRef.current = false
    setPhase('play')
    deal()
  }

  function deal(): void {
    if (deckRef.current.length === 0) deckRef.current = shuffle(pool)
    const item = deckRef.current.shift() ?? null
    setCurrent(item)
    setPicked(undefined)
    setCursor(0)
  }

  function answer(index: number | null): void {
    if (answered || !current) return
    const right = index === current.wrongIndex
    setPicked(index)
    setScore((s) => s + (right ? 1 : 0))
    setTotal((t) => t + 1)
    setStreak((st) => {
      const next = right ? st + 1 : 0
      setBestStreak((b) => Math.max(b, next))
      return next
    })
  }

  function endGame(): void {
    if (!loggedRef.current && total > 0) {
      loggedRef.current = true
      const prev = history?.best
      setNewBest(total >= 5 && (!prev || score / total > prev.score / prev.total))
      void api.quiz
        .logSession({
          kind: 'englishSpotError',
          score,
          total,
          bestStreak,
          settings: { focus, length }
        })
        .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history('englishSpotError') }))
        .catch(() => {})
    }
    setPhase('summary')
  }

  function advance(): void {
    if (length > 0 && total >= length) endGame()
    else deal()
  }

  useEffect(() => {
    if (phase !== 'play') return
    function onKey(e: KeyboardEvent): void {
      const t = e.target as HTMLElement
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t.isContentEditable) return
      if (!current) return
      if (answered) {
        if (e.key === 'Enter') {
          e.preventDefault()
          advance()
        }
        return
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setCursor((c) => Math.min(current.tokens.length - 1, c + 1))
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setCursor((c) => Math.max(0, c - 1))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        answer(cursor)
      } else if (e.key === '0' || e.key.toLowerCase() === 'n') {
        e.preventDefault()
        answer(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, current, answered, cursor, total])

  if (phase === 'setup') {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <PageHeader
          back={{ to: '/english', label: 'English' }}
          title="Spot the error"
          subtitle="One word is wrong — or nothing is. Click it, or press 0 for no error."
        />
        <div className="card p-5 space-y-5">
          <Group label="Focus">
            <Pill active={focus === 'all'} onClick={() => setFocus('all')} label="Everything" />
            {EN_MECHANICS_CATEGORIES.map((c) => (
              <Pill key={c} active={focus === c} onClick={() => setFocus(c)} label={CAT_LABEL[c]} />
            ))}
          </Group>
          <Group label="Length">
            <Pill active={length === 10} onClick={() => setLength(10)} label="10" />
            <Pill active={length === 20} onClick={() => setLength(20)} label="20" />
            <Pill active={length === 0} onClick={() => setLength(0)} label="Endless" />
          </Group>
          {focus === 'all' && (tally?.corrections ?? 0) > 0 && (
            <p className="text-xs text-gray-500">
              Weighted toward what the writing grader keeps catching ({tally!.corrections} corrections in
              your last {tally!.submissions} submissions).
            </p>
          )}
          <button className="btn-primary w-full" disabled={pool.length === 0} onClick={start}>
            Start ({pool.length} sentences)
          </button>
        </div>
        <QuizRecord kind="englishSpotError" />
      </div>
    )
  }

  if (phase === 'summary') {
    const acc = total ? Math.round((score / total) * 100) : 0
    return (
      <div className="p-6 max-w-md mx-auto">
        <div className="card p-6 text-center">
          <p className="text-3xl font-bold">
            {score} / {total}
          </p>
          <p className="mt-1 text-sm text-gray-400">
            {acc}% · best streak {bestStreak}
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

  if (!current) return null
  const wasRight = answered && picked === current.wrongIndex

  return (
    <StudySessionFrame
      title="Spot the error"
      subtitle={CAT_LABEL[current.category]}
      progress={length > 0 ? { current: Math.min((answered ? total : total + 1), length), total: length, label: 'Round' } : undefined}
      actions={<button className="btn-ghost px-2 py-0.5 text-xs" onClick={endGame}>End round</button>}
      rail={<SessionEvidence title="Mistake evidence"><p>{score} correct across {total} answers.</p><p className="mt-2">Current streak {streak}; best streak {bestStreak}.</p></SessionEvidence>}
      surface={false}
    >

      <div className="card p-5">
        <p className="mb-3 text-xs uppercase tracking-widest text-gray-500">{CAT_LABEL[current.category]}</p>
        <p className="text-xl leading-loose">
          {current.tokens.map((tok, i) => {
            let cls = 'hover:text-accent'
            if (answered) {
              if (i === current.wrongIndex) cls = 'rounded bg-red-500/15 text-red-300 line-through decoration-red-400'
              else if (i === picked) cls = 'rounded bg-yellow-500/15 text-yellow-200'
              else cls = ''
            } else if (i === cursor) cls = 'rounded bg-accent/25 ring-1 ring-accent'
            return (
              <span key={i}>
                <button
                  type="button"
                  className={`px-0.5 ${cls}`}
                  disabled={answered}
                  onClick={() => answer(i)}
                >
                  {tok}
                </button>
                {answered && i === current.wrongIndex && current.fix && (
                  <span className="ml-1 rounded bg-green-500/15 px-1 text-green-300">{current.fix}</span>
                )}{' '}
              </span>
            )
          })}
        </p>
      </div>

      {answered && (
        <div className={`card mt-3 p-4 text-sm ${wasRight ? 'border-green-500/60' : 'border-red-500/60'}`}>
          <p className={wasRight ? 'text-green-300' : 'text-red-300'}>
            {wasRight
              ? current.wrongIndex === null
                ? 'Right — nothing wrong here.'
                : 'Right.'
              : current.wrongIndex === null
                ? 'There was no error in this one.'
                : picked === null
                  ? `There was: "${current.tokens[current.wrongIndex]}" should be "${current.fix}".`
                  : `Not that one — "${current.tokens[current.wrongIndex]}" should be "${current.fix}".`}
          </p>
          <p className="mt-1 text-gray-400">{current.explain}</p>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {!answered ? (
          <>
            <button className="btn-ghost" onClick={() => answer(null)}>
              No error <kbd className="kbd ml-1">0</kbd>
            </button>
            <span className="text-xs text-gray-500">← → move · Enter picks the highlighted word</span>
          </>
        ) : (
          <>
            <span className="flex-1" />
            <button className="btn-primary" onClick={advance}>
              {length > 0 && total >= length ? 'See results (Enter)' : 'Next (Enter)'}
            </button>
          </>
        )}
      </div>
    </StudySessionFrame>
  )
}
