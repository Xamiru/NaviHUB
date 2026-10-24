import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import StudySessionFrame from '../components/StudySessionFrame'
import CoverImage from '../components/CoverImage'
import QuizRecord from '../components/QuizRecord'
import { FootballTeamMark } from '../components/football/FootballCommon'
import { HeartIcon } from '../components/PlayerIcons'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useTabLeaveGuard } from '../lib/browserTabs'
import { quizScorePolicy, quizSeed } from '@shared/quizCore'
import { formatTransferFee } from '@shared/footballGames'
import type { QuizFootballTransferFact, QuizFootballTransferQuestion } from '@shared/types'
import { footballAvailabilityQuery } from '../lib/quizAvailability'

type Phase = 'setup' | 'play' | 'summary'
const LIVES = 3

function Crest({ name, imagePath }: { name: string; imagePath: string | null }) {
  return <FootballTeamMark team={{ id: 0, name, shortName: null, country: null, isNational: false, imagePath, colors: null, favorite: false }} size="xs" />
}

function TransferCard({ fact, feeShown }: { fact: QuizFootballTransferFact; feeShown: boolean }) {
  return (
    <section className="flex min-w-0 flex-col items-center rounded-lg border border-base-600 bg-base-800 p-4 text-center">
      <CoverImage path={fact.photoPath} alt={fact.personName} rounded="rounded-full" thumbWidth={192} fallback="initial" className="h-28 w-28" />
      <h2 className="mt-3 text-lg font-semibold text-white">{fact.personName}</h2>
      <p className="mt-2 flex flex-wrap items-center justify-center gap-1.5 text-sm text-gray-300">
        <Crest name={fact.fromTeam} imagePath={fact.fromImagePath} />{fact.fromTeam}
        <span className="text-gray-500">to</span>
        <Crest name={fact.toTeam} imagePath={fact.toImagePath} />{fact.toTeam}
      </p>
      {fact.season && <p className="mt-1 text-xs text-gray-500">{fact.season}</p>}
      <p className="mt-3 text-xs font-medium uppercase tracking-wider text-gray-400">Fee</p>
      <p className={`mt-1 text-3xl font-semibold tabular-nums ${feeShown ? 'text-accent' : 'text-gray-500'}`} aria-live="polite">
        {feeShown ? formatTransferFee(fact.fee) : 'Hidden'}
      </p>
    </section>
  )
}

export default function FootballTransferPage() {
  const qc = useQueryClient()
  const [phase, setPhase] = useState<Phase>('setup')
  useTabLeaveGuard(phase === 'play', 'run')
  const [chain, setChain] = useState<QuizFootballTransferQuestion[]>([])
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [correct, setCorrect] = useState(0)
  const [lives, setLives] = useState(LIVES)
  const [seed, setSeed] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const loggedRef = useRef(false)
  const availability = useQuery(footballAvailabilityQuery())
  const question = chain[index]

  async function start() {
    setLoading(true)
    setError(null)
    try {
      const nextSeed = quizSeed(`${Date.now()}-${Math.random()}`)
      const request = { kind: 'footballTransfer' as const, seed: nextSeed, length: 60, options: {} }
      const pool = await qc.fetchQuery({ queryKey: qk.quiz.challengePool(request), queryFn: () => api.quiz.challengePool(request) })
      const questions = pool.filter((item): item is QuizFootballTransferQuestion => item.kind === 'footballTransfer')
      if (questions.length < 2) {
        setError('The archive needs at least two transfers of five million euros or more. Install match detail (Transfermarkt) first.')
        return
      }
      setChain(questions)
      setIndex(0)
      setPicked(null)
      setCorrect(0)
      setLives(LIVES)
      setSeed(nextSeed)
      loggedRef.current = false
      setPhase('play')
    } finally {
      setLoading(false)
    }
  }

  async function finish(finalCorrect: number, attempted: number) {
    if (loggedRef.current) return
    loggedRef.current = true
    // A failed log still shows the summary (the error toasts); the round is over.
    try {
      await api.quiz.logSession({
        kind: 'footballTransfer',
        score: finalCorrect,
        total: Math.max(1, attempted),
        bestStreak: finalCorrect,
        settings: {
          correct: finalCorrect,
          attempted,
          scorePolicy: quizScorePolicy('footballTransfer'),
          playMode: 'solo',
          seed,
          datasetRevision: chain[0]?.datasetRevision ?? null
        }
      })
      await qc.invalidateQueries({ queryKey: qk.quiz.history('footballTransfer') })
    } finally {
      setPhase('summary')
    }
  }

  function answer(key: string) {
    if (!question || picked) return
    setPicked(key)
    if (question.validKeys.includes(key)) setCorrect((value) => value + 1)
    else setLives((value) => value - 1)
  }

  function next() {
    // `lives` already reflects this answer.
    if (lives <= 0 || index + 1 >= chain.length) {
      void finish(correct, index + 1)
      return
    }
    setIndex((value) => value + 1)
    setPicked(null)
  }

  if (phase === 'setup') {
    const count = availability.data?.transfer ?? 0
    return (
      <div className="mx-auto max-w-3xl p-6">
        <PageHeader title="Transfer Higher or Lower" subtitle="Did this move cost more or less than the last one? Three lives; each right call carries the transfer forward." back={{ to: '/football/quiz', label: 'Football quiz room' }} />
        <div className="card space-y-4 p-6">
          <p className="text-sm text-gray-400">Only priced moves of at least €5m are used.</p>
          <p className="text-sm text-gray-400">{count.toLocaleString()} eligible transfers.</p>
          {error && <p className="text-sm text-red-300">{error}</p>}
          <button className="btn-primary" disabled={loading || count < 2} onClick={() => void start()}>{loading ? 'Dealing transfers…' : 'Start'}</button>
        </div>
        <QuizRecord kind="footballTransfer" />
      </div>
    )
  }

  if (phase === 'summary') {
    return (
      <StudySessionFrame title="Transfer Higher or Lower" subtitle="Run over">
        <div className="text-center">
          <p className="text-5xl font-semibold tabular-nums text-white">{correct}</p>
          <p className="mt-1 text-gray-400">correct calls in a row of transfers</p>
          <div className="mt-6 flex justify-center gap-3">
            <button className="btn-primary" onClick={() => void start()}>Play again</button>
            <Link to="/football/quiz" className="btn-ghost">Quiz room</Link>
          </div>
        </div>
      </StudySessionFrame>
    )
  }

  if (!question) return null
  const answered = picked != null
  return (
    <StudySessionFrame
      title="Transfer Higher or Lower"
      subtitle={`${correct} correct`}
      actions={
        <span className="flex items-center gap-1" aria-label={`${lives} lives left`}>
          {Array.from({ length: LIVES }).map((_, i) => (
            <span key={i} className={i < lives ? 'text-red-400' : 'text-gray-600'}><HeartIcon className="h-3.5 w-3.5" filled={i < lives} /></span>
          ))}
        </span>
      }
    >
      <p className="mb-5 text-center text-xl font-semibold text-gray-100">{question.prompt}</p>
      <div className="grid items-stretch gap-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <TransferCard fact={question.reference} feeShown />
        <div className="flex items-center justify-center text-sm font-semibold uppercase tracking-wider text-gray-500">compared with</div>
        <TransferCard fact={question.challenger} feeShown={answered} />
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {question.choices.map((option, i) => {
          const isRight = answered && question.validKeys.includes(option.key)
          const wrong = answered && picked === option.key && !isRight
          return (
            <button
              key={option.key}
              className={`min-h-14 rounded-md border px-5 py-4 text-left text-base font-semibold ${
                isRight ? 'border-green-500 bg-green-500/10 text-green-100' : wrong ? 'border-red-500 bg-red-500/10 text-red-100' : 'border-base-600 bg-base-800 text-gray-100 hover:border-accent'
              }`}
              disabled={answered}
              onClick={() => answer(option.key)}
            >
              <span className="mr-3 text-sm font-normal text-gray-500">{i + 1}</span>
              {option.label}
            </button>
          )
        })}
      </div>
      {answered && (
        <div className="mt-5 text-center">
          <button className="btn-primary px-8" onClick={next}>{lives <= 0 || index + 1 >= chain.length ? 'See result' : 'Next'}</button>
        </div>
      )}
    </StudySessionFrame>
  )
}
