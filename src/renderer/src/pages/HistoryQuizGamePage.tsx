import { useRef, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import CoverImage from '../components/CoverImage'
import ChronologyOrder from '../components/quiz/ChronologyOrder'
import { Group, Pill } from '../components/PillGroup'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useTabLeaveGuard } from '../lib/browserTabs'
import { historyPath } from '../lib/historyUi'
import { historyQuizGame } from '../lib/historyQuiz'
import { answerIsCorrect, quizScorePolicy, quizSeed } from '@shared/quizCore'
import { yearLabel } from '@shared/history/calendars'
import { CHRONOLOGY_SIZE } from '@shared/history/quiz'
import type { HistoryQuizQuestion, HistoryQuizScope } from '@shared/types'

type Phase = 'setup' | 'play' | 'summary'

interface Result {
  title: string
  answer: string
  picked: string | null
  correct: boolean
  detail?: string
  ref: string | null
}

const label = (q: HistoryQuizQuestion, key: string | null): string | null => q.choices.find((c) => c.key === key)?.label ?? null
const answerOf = (q: HistoryQuizQuestion): string => label(q, q.validKeys[0]) ?? ''

function prompt(q: HistoryQuizQuestion): string {
  if (q.kind === 'historyChronology') return 'Put these events in the order they began, earliest first.'
  if (q.kind === 'historyQuote') return 'Who said or wrote this?'
  if (q.kind === 'historyDate') return `In which year did ${q.title} begin?`
  return `Which state held ${q.place} in ${yearLabel(q.year)}?`
}

function resultTitle(q: HistoryQuizQuestion): string {
  if (q.kind === 'historyChronology') return 'Chronology board'
  if (q.kind === 'historyQuote') return q.translation?.text ?? q.text
  if (q.kind === 'historyDate') return q.title
  return `${q.place}, ${yearLabel(q.year)}`
}

export default function HistoryQuizGamePage() {
  const { game: slug } = useParams()
  const game = historyQuizGame(slug)
  const [params] = useSearchParams()
  const qc = useQueryClient()
  const [scope, setScope] = useState<HistoryQuizScope>(params.get('scope') === 'all' ? 'all' : 'read')
  const [length, setLength] = useState(game?.kind === 'historyChronology' ? 3 : 10)
  const [phase, setPhase] = useState<Phase>('setup')
  useTabLeaveGuard(phase === 'play', 'run')
  const [questions, setQuestions] = useState<HistoryQuizQuestion[]>([])
  const [index, setIndex] = useState(0)
  const [seed, setSeed] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [order, setOrder] = useState<string[]>([])
  const [correct, setCorrect] = useState(0)
  const [attempted, setAttempted] = useState(0)
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const loggedRef = useRef(false)
  const counts = useQuery({
    queryKey: qk.history.quizCounts(scope),
    queryFn: () => api.history.quizCounts(scope),
    enabled: !!game
  })

  if (!game) return <PageStatus>There is no such History quiz.</PageStatus>
  const kind = game.kind
  const question = questions[index]
  const chronology = kind === 'historyChronology'
  const back = { to: '/history/quiz', label: 'History quiz' }

  async function start() {
    setLoading(true)
    setError(null)
    try {
      const nextSeed = quizSeed(`${Date.now()}-${Math.random()}`)
      const deal = await api.history.quizDeal({ kind, seed: nextSeed, length, scope })
      if (deal.length < length) {
        setError(
          deal.length === 0
            ? 'Not enough pages to deal this round yet. Read more pages, or deal from every page.'
            : `Only ${deal.length} ${chronology ? 'boards' : 'questions'} can be dealt. Choose a shorter round.`
        )
        return
      }
      setQuestions(deal)
      setIndex(0)
      setSeed(nextSeed)
      setSelected(null)
      setCorrect(0)
      setAttempted(0)
      setResults([])
      setOrder(deal[0].kind === 'historyChronology' ? deal[0].choices.map((c) => c.key) : [])
      loggedRef.current = false
      setPhase('play')
    } finally {
      setLoading(false)
    }
  }

  // The one place a round ends and is logged.
  async function finish(finalCorrect: number, finalAttempted: number) {
    if (loggedRef.current) return
    loggedRef.current = true
    setSaving(true)
    try {
      await api.quiz.logSession({
        kind,
        score: finalCorrect,
        total: Math.max(1, finalAttempted),
        bestStreak: 0,
        settings: {
          correct: finalCorrect,
          attempted: finalAttempted,
          scorePolicy: quizScorePolicy(kind),
          playMode: 'solo',
          seed,
          filters: { scope },
          length
        }
      })
      await qc.invalidateQueries({ queryKey: qk.quiz.history(kind) })
      setPhase('summary')
    } catch (caught) {
      loggedRef.current = false
      throw caught
    } finally {
      setSaving(false)
    }
  }

  function submitChoice(key: string) {
    if (!question || selected) return
    setSelected(key)
    const hit = answerIsCorrect(question.validKeys, key)
    setCorrect((v) => v + (hit ? 1 : 0))
    setAttempted((v) => v + 1)
    setResults((r) => [
      ...r,
      { title: resultTitle(question), answer: answerOf(question), picked: label(question, key), correct: hit, ref: 'ref' in question ? question.ref : null }
    ])
  }

  function submitOrder() {
    if (!question || question.kind !== 'historyChronology' || selected) return
    const placed = order.filter((key, i) => question.validKeys[i] === key).length
    setSelected('submitted')
    setCorrect((v) => v + placed)
    setAttempted((v) => v + CHRONOLOGY_SIZE)
    setResults((r) => [
      ...r,
      {
        title: resultTitle(question),
        answer: question.validKeys.map((k) => `${label(question, k)} (${question.years[k]})`).join(', '),
        picked: null,
        correct: placed === CHRONOLOGY_SIZE,
        detail: `${placed} of ${CHRONOLOGY_SIZE} in place`,
        ref: null
      }
    ])
  }

  function next() {
    const n = index + 1
    if (n >= questions.length) {
      void finish(correct, attempted)
      return
    }
    setIndex(n)
    setSelected(null)
    setOrder(questions[n].kind === 'historyChronology' ? questions[n].choices.map((c) => c.key) : [])
  }

  if (phase === 'setup') {
    const count = counts.data?.[kind] ?? 0
    const lengths = chronology ? [3, 5] : [5, 10, 20]
    return (
      <div className="mx-auto max-w-3xl p-6">
        <PageHeader title={game.title} subtitle={game.body} back={back} />
        <div className="space-y-5 border-y border-line-subtle py-6">
          <Group label="Round length">
            {lengths.map((n) => (
              <Pill key={n} active={length === n} onClick={() => setLength(n)} label={chronology ? `${n} boards` : `${n} questions`} />
            ))}
          </Group>
          <Group label="Deal from">
            <Pill active={scope === 'read'} onClick={() => setScope('read')} label="Pages I have read" />
            <Pill active={scope === 'all'} onClick={() => setScope('all')} label="Every page" />
          </Group>
          {counts.isError ? (
            <p className="text-sm text-signal-anomaly">The question count could not be loaded.</p>
          ) : (
            <p className="text-sm text-ink-muted">
              {counts.isLoading ? 'Counting…' : `${count.toLocaleString()} to deal from.`} Disputed and approximate dates are left out.
            </p>
          )}
          {error && <p className="text-sm text-signal-anomaly">{error}</p>}
          <button type="button" className="btn-primary" disabled={loading || count < game.minimum} onClick={() => void start()}>
            {loading ? 'Dealing…' : 'Start round'}
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'summary') {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <PageHeader title="Round complete" subtitle={game.title} back={back} />
        <p className="text-5xl font-semibold tabular-nums text-ink">
          {correct}
          <span className="text-xl text-ink-muted"> / {attempted}</span>
        </p>
        <div className="mt-6 flex gap-2">
          <button type="button" className="btn-primary" onClick={() => void start()}>
            Play again
          </button>
          <button type="button" className="btn-ghost" onClick={() => setPhase('setup')}>
            Setup
          </button>
          <Link to="/history/quiz" className="btn-ghost">
            Quiz room
          </Link>
        </div>
        <ol className="mt-8 divide-y divide-line-subtle border-y border-line-subtle">
          {results.map((r, i) => {
            const to = r.ref ? historyPath(r.ref) : null
            return (
              <li key={i} className="flex items-start gap-4 py-3 text-sm">
                <span className="w-6 tabular-nums text-ink-muted">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-ink">{to ? <Link to={to} className="hover:text-accent">{r.title}</Link> : r.title}</p>
                  {r.answer !== r.title && <p className="text-ink-secondary">{r.answer}</p>}
                  {!r.correct && r.picked && <p className="text-ink-muted">You picked {r.picked}</p>}
                </div>
                <span className={r.correct ? 'text-signal-affirmative' : 'text-signal-anomaly'}>{r.detail ?? (r.correct ? 'Correct' : 'Missed')}</span>
              </li>
            )
          })}
        </ol>
      </div>
    )
  }

  if (!question) return null
  const placed = question.kind === 'historyChronology' && selected ? order.map((key, i) => question.validKeys[i] === key) : undefined
  const pagePath = 'ref' in question ? historyPath(question.ref) : null
  return (
    <div className="mx-auto max-w-4xl p-6">
      <PageHeader title={game.title} subtitle={`${chronology ? 'Board' : 'Question'} ${index + 1} of ${questions.length}`} back={back} />
      <p className="mb-5 text-xl font-semibold text-ink">{prompt(question)}</p>

      {question.kind === 'historyQuote' && (
        <blockquote className="mb-6 border-l-2 border-accent/60 pl-4">
          <p lang={question.lang} dir="auto" className="text-base leading-7 text-ink">
            {question.text}
          </p>
          {question.translation && (
            <p lang={question.translation.lang} className="mt-2 text-sm leading-6 text-ink-secondary">
              {question.translation.text}
            </p>
          )}
        </blockquote>
      )}
      {question.kind === 'historyDate' && question.image && (
        <CoverImage path={question.image} alt="" thumbWidth={480} className="mb-5 h-48 w-full max-w-md rounded-lg object-cover" />
      )}
      {question.kind === 'historyMapState' && (
        <p className="-mt-3 mb-5 text-sm text-ink-muted">
          Event: {question.event}.{question.approximate && ' Borders before 1886 are an approximate reconstruction.'}
        </p>
      )}

      {question.kind === 'historyChronology' ? (
        <ChronologyOrder
          order={order}
          choices={question.choices.map((c) => ({ key: c.key, label: selected ? `${c.label} (${question.years[c.key]})` : c.label, imagePath: c.image }))}
          disabled={selected != null}
          placed={placed}
          onChange={setOrder}
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {question.choices.map((c) => {
            const isAnswer = selected != null && question.validKeys.includes(c.key)
            return (
              <button
                key={c.key}
                type="button"
                className={`card flex min-h-16 items-center gap-3 p-4 text-left text-sm ${isAnswer ? 'border-signal-affirmative' : selected === c.key ? 'border-signal-anomaly' : ''}`}
                disabled={selected != null}
                onClick={() => submitChoice(c.key)}
              >
                {question.kind === 'historyQuote' && <CoverImage path={c.image} alt="" thumbWidth={160} className="h-10 w-10 shrink-0 rounded-md object-cover" />}
                <span>{c.label}</span>
              </button>
            )
          })}
        </div>
      )}

      {selected == null ? (
        chronology && (
          <button type="button" className="btn-primary mt-5" onClick={submitOrder}>
            Lock in order
          </button>
        )
      ) : (
        <div className="mt-6 border-t border-line-subtle pt-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-ink-muted">
              {question.kind === 'historyChronology'
                ? `${placed?.filter(Boolean).length ?? 0} of ${CHRONOLOGY_SIZE} in place.`
                : answerIsCorrect(question.validKeys, selected)
                  ? 'Correct.'
                  : `Answer: ${answerOf(question)}`}
            </p>
            <button type="button" className="btn-primary" disabled={saving} onClick={next}>
              {index + 1 === questions.length ? 'Finish' : 'Next'}
            </button>
          </div>
          {question.kind === 'historyQuote' && <p className="mt-3 text-xs text-ink-muted">Source: {question.source}</p>}
          {pagePath && (
            <Link to={pagePath} className="mt-2 inline-block text-xs text-ink-muted hover:text-accent">
              Open the page
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
