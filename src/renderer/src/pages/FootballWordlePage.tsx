import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import StudySessionFrame, { SessionEvidence } from '../components/StudySessionFrame'
import CoverImage from '../components/CoverImage'
import QuizRecord from '../components/QuizRecord'
import QuizPersonAutocomplete from '../components/quiz/QuizPersonAutocomplete'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { confirmDialog } from '../lib/confirm'
import { useTabLeaveGuard } from '../lib/browserTabs'
import { quizScorePolicy, quizSeed } from '@shared/quizCore'
import {
  footballWordleFeedback,
  footballWordleScore,
  type FootballNumberMatch,
  type FootballWordleFeedback
} from '@shared/footballGames'
import type { FootballWordlePlayer, QuizCareerPerson, QuizFootballWordleQuestion } from '@shared/types'
import { footballAvailabilityQuery } from '../lib/quizAvailability'

type Phase = 'setup' | 'play' | 'summary'
type Outcome = 'playing' | 'solved' | 'failed' | 'gaveUp'
type CellMatch = 'exact' | 'near' | 'none' | 'unknown'

function tone(match: CellMatch): string {
  if (match === 'exact') return 'border-emerald-500/50 bg-emerald-500/10 text-emerald-200'
  if (match === 'near') return 'border-amber-500/50 bg-amber-500/10 text-amber-200'
  return 'border-base-600 bg-base-900 text-gray-400'
}

function Cell({ label, value, match }: { label: string; value: string; match: CellMatch }) {
  return (
    <div className={`rounded-lg border px-3 py-2 ${tone(match)}`}>
      <p className="text-xs font-semibold uppercase tracking-wider">{label}</p>
      <p className="mt-1 text-xs font-medium">{value}</p>
    </div>
  )
}

// "1990 · target is younger": directions read toward the mystery player.
function numberText(value: number | null, feedback: FootballNumberMatch, higher: string, lower: string, suffix = ''): string {
  if (value == null) return 'Unknown'
  if (feedback.match === 'unknown') return `${value}${suffix} · target unknown`
  if (feedback.match === 'exact') return `${value}${suffix} · exact`
  return `${value}${suffix} · target is ${feedback.direction === 'higher' ? higher : lower}`
}

function GuessRow({ guess, feedback, index }: { guess: FootballWordlePlayer; feedback: FootballWordleFeedback; index: number }) {
  return (
    <div className="rounded-xl border border-base-600 bg-base-800 p-3">
      <div className="flex items-center gap-3">
        <CoverImage path={guess.photoPath} alt="" rounded="rounded-full" thumbWidth={96} fallback="initial" className="h-12 w-12 shrink-0" />
        <div className="min-w-0">
          <p className="text-xs text-gray-500">Guess {index + 1}</p>
          <p className="truncate font-semibold text-white">{guess.label}</p>
        </div>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <Cell label="Nation" match={feedback.nationality} value={guess.nationality ?? 'Unknown'} />
        <Cell label="Position" match={feedback.position} value={guess.position ?? 'Unknown'} />
        <Cell label="Club" match={feedback.club} value={guess.club ?? 'Unknown'} />
        <Cell label="League" match={feedback.league} value={guess.league ?? 'Unknown'} />
        <Cell label="Born" match={feedback.birthYear.match} value={numberText(guess.birthYear, feedback.birthYear, 'younger', 'older')} />
        <Cell label="Height" match={feedback.height.match} value={numberText(guess.heightCm, feedback.height, 'taller', 'shorter', ' cm')} />
        <Cell label="Shirt" match={feedback.shirt.match} value={numberText(guess.shirt, feedback.shirt, 'a higher number', 'a lower number')} />
      </div>
    </div>
  )
}

export default function FootballWordlePage() {
  const qc = useQueryClient()
  const [phase, setPhase] = useState<Phase>('setup')
  useTabLeaveGuard(phase === 'play', 'run')
  const [question, setQuestion] = useState<QuizFootballWordleQuestion | null>(null)
  const [guessKeys, setGuessKeys] = useState<string[]>([])
  const [outcome, setOutcome] = useState<Outcome>('playing')
  const [seed, setSeed] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const loggedRef = useRef(false)
  const availability = useQuery(footballAvailabilityQuery())
  const playerByKey = useMemo(() => new Map(question?.players.map((player) => [player.key, player]) ?? []), [question])
  const people = useMemo<QuizCareerPerson[]>(
    () => question?.players.map((player) => ({ key: player.key, label: player.label, roles: [], photoPath: player.photoPath })) ?? [],
    [question]
  )
  const target = question ? playerByKey.get(question.targetKey) ?? null : null
  const score = footballWordleScore(outcome === 'solved', guessKeys.length)

  async function start() {
    setLoading(true)
    setError(null)
    try {
      const nextSeed = quizSeed(`${Date.now()}-${Math.random()}`)
      const request = { kind: 'footballWordle' as const, seed: nextSeed, length: 1, options: {} }
      const pool = await qc.fetchQuery({ queryKey: qk.quiz.challengePool(request), queryFn: () => api.quiz.challengePool(request) })
      const built = pool[0]
      if (!built || built.kind !== 'footballWordle') {
        setError('The archive needs players with a nationality, position and birth date, and ten or more lineup appearances. Install match detail (Transfermarkt) first.')
        return
      }
      setQuestion(built)
      setGuessKeys([])
      setOutcome('playing')
      setSeed(nextSeed)
      loggedRef.current = false
      setPhase('play')
    } finally {
      setLoading(false)
    }
  }

  async function finish(finalGuesses: string[], finalOutcome: Exclude<Outcome, 'playing'>) {
    if (!question || loggedRef.current) return
    loggedRef.current = true
    const solved = finalOutcome === 'solved'
    // A failed log still shows the summary (the error toasts); the round is over.
    try {
      await api.quiz.logSession({
        kind: 'footballWordle',
        score: footballWordleScore(solved, finalGuesses.length),
        total: Math.max(1, finalGuesses.length),
        bestStreak: 0,
        settings: {
          correct: solved ? 1 : 0,
          attempted: Math.max(1, finalGuesses.length),
          scorePolicy: quizScorePolicy('footballWordle'),
          playMode: 'solo',
          seed,
          targetKey: question.targetKey,
          guesses: finalGuesses,
          datasetRevision: question.datasetRevision
        }
      })
      await qc.invalidateQueries({ queryKey: qk.quiz.history('footballWordle') })
    } finally {
      setPhase('summary')
    }
  }

  function guess(person: QuizCareerPerson) {
    if (!question || outcome !== 'playing') return
    const next = [...guessKeys, person.key]
    setGuessKeys(next)
    if (person.key === question.targetKey) {
      setOutcome('solved')
      void finish(next, 'solved')
    } else if (next.length >= question.maxGuesses) {
      setOutcome('failed')
      void finish(next, 'failed')
    }
  }

  async function giveUp() {
    if (outcome !== 'playing') return
    if (!(await confirmDialog('Reveal the mystery player and record a score of zero?', { confirmLabel: 'Give up' }))) return
    setOutcome('gaveUp')
    void finish(guessKeys, 'gaveUp')
  }

  const board = target ? (
    <div className="space-y-3">
      {[...guessKeys].reverse().map((key) => {
        const player = playerByKey.get(key)
        return player ? <GuessRow key={key} guess={player} feedback={footballWordleFeedback(target, player)} index={guessKeys.indexOf(key)} /> : null
      })}
    </div>
  ) : null

  if (phase === 'setup') {
    const count = availability.data?.wordle ?? 0
    return (
      <div className="mx-auto max-w-3xl p-6">
        <PageHeader title="Football Wordle" subtitle="Find the mystery player in eight guesses from nation, position, club, league, age, height and shirt feedback." back={{ to: '/football/quiz', label: 'Football quiz room' }} />
        <div className="card space-y-4 p-6">
          <p className="text-sm text-gray-400">The mystery player is one of the 300 most-capped players in your archive. Green is exact; amber is the same line, within two years, three centimetres or two shirt numbers.</p>
          <p className="text-sm text-gray-400">{count.toLocaleString()} players with ten appearances and a known nationality, position and birth date.</p>
          {error && <p className="text-sm text-red-300">{error}</p>}
          <button className="btn-primary" disabled={loading || count < 8} onClick={() => void start()}>{loading ? 'Choosing a player…' : 'Start'}</button>
        </div>
        <QuizRecord kind="footballWordle" />
      </div>
    )
  }

  if (!question || !target) return null

  if (phase === 'summary') {
    return (
      <StudySessionFrame title="Football Wordle" subtitle={outcome === 'solved' ? `Solved in ${guessKeys.length} guesses` : 'Not solved this time'}>
        <div className="flex flex-col items-center text-center">
          <CoverImage path={target.photoPath} alt={target.label} rounded="rounded-full" fallback="initial" className="h-32 w-32" />
          <p className="label mt-4">Mystery player</p>
          <h2 className="mt-1 text-3xl font-semibold text-white">{target.label}</h2>
          <p className="mt-1 text-gray-400">{[target.position, target.nationality, target.club].filter(Boolean).join(' · ')}</p>
          <p className="mt-4 text-4xl font-semibold tabular-nums text-white">{score} points</p>
          <div className="mt-6 flex gap-3">
            <button className="btn-primary" onClick={() => void start()}>Play again</button>
            <Link to="/football/quiz" className="btn-ghost">Quiz room</Link>
          </div>
        </div>
        {guessKeys.length > 0 && <div className="mt-8"><h3 className="label mb-3">Your guesses</h3>{board}</div>}
      </StudySessionFrame>
    )
  }

  return (
    <StudySessionFrame
      title="Football Wordle"
      subtitle={`Guess ${guessKeys.length + 1} of ${question.maxGuesses}`}
      progress={{ current: guessKeys.length, total: question.maxGuesses, label: 'Guesses used' }}
      actions={<button className="btn-ghost" onClick={() => void giveUp()}>Give up</button>}
      rail={<SessionEvidence title="Feedback"><p>Green is exact. Amber: same line (defender, midfielder…), born within two years, within three centimetres, or within two shirt numbers. "Target is younger" points toward the mystery player.</p></SessionEvidence>}
    >
      <QuizPersonAutocomplete people={people} excludedKeys={guessKeys} resetKey={guessKeys.length} onSubmit={guess} />
      <div className="mt-6">
        {guessKeys.length === 0
          ? <div className="rounded-xl border border-dashed border-base-600 py-14 text-center text-sm text-gray-500">Start with any player you can think of.</div>
          : board}
      </div>
    </StudySessionFrame>
  )
}
