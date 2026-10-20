import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import StudySessionFrame, { SessionEvidence } from '../components/StudySessionFrame'
import CoverImage from '../components/CoverImage'
import QuizRecord from '../components/QuizRecord'
import { Field } from '../components/Field'
import { FootballTeamMark } from '../components/football/FootballCommon'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { confirmDialog } from '../lib/confirm'
import { useTabLeaveGuard } from '../lib/browserTabs'
import { quizScorePolicy, quizSeed } from '@shared/quizCore'
import { FOOTBALL_LINEUP_POINTS_PER_PLAYER, matchFootballLineupName } from '@shared/footballGames'
import type { QuizFootballLineupQuestion, QuizFootballLineupSlot } from '@shared/types'

type Phase = 'setup' | 'play' | 'summary'

function Crest({ name, imagePath }: { name: string; imagePath: string | null }) {
  return <FootballTeamMark team={{ id: 0, name, shortName: null, country: null, isNational: false, imagePath, colors: null, favorite: false }} size="sm" />
}

// Short position labels for the shirt badges ("Centre-Back" -> "CB").
function positionShort(position: string | null): string {
  if (!position) return ''
  const known: Record<string, string> = {
    goalkeeper: 'GK', 'centre-back': 'CB', 'left-back': 'LB', 'right-back': 'RB', 'left wing-back': 'LWB', 'right wing-back': 'RWB',
    'defensive midfield': 'DM', 'central midfield': 'CM', 'left midfield': 'LM', 'right midfield': 'RM', 'attacking midfield': 'AM',
    'left winger': 'LW', 'right winger': 'RW', 'second striker': 'SS', 'centre-forward': 'CF', sweeper: 'SW'
  }
  return known[position.toLowerCase()] ?? position.split(/[\s-]+/).map((word) => word[0]?.toUpperCase() ?? '').join('')
}

function Pitch({ slots, named, revealed }: { slots: QuizFootballLineupSlot[]; named: string[]; revealed: boolean }) {
  const lines = [...new Set(slots.map((slot) => slot.line))].sort((a, b) => b - a)
  return (
    <div className="rounded-xl border border-emerald-700/50 bg-emerald-950/40 p-4" aria-label="Starting XI on the pitch">
      <div className="space-y-5">
        {lines.map((line) => (
          <ul key={line} className="flex flex-wrap justify-around gap-3">
            {slots.filter((slot) => slot.line === line).map((slot) => {
              const found = named.includes(slot.key)
              const show = found || revealed
              return (
                <li key={slot.key} className="flex w-24 flex-col items-center text-center">
                  {show ? (
                    <CoverImage path={slot.photoPath} alt="" rounded="rounded-full" thumbWidth={96} fallback="initial" className={`h-12 w-12 ${found ? 'ring-2 ring-emerald-400' : 'opacity-70'}`} />
                  ) : (
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-base-500 bg-base-900 text-lg font-semibold tabular-nums text-gray-300">
                      {slot.shirt ?? '?'}
                    </span>
                  )}
                  <span className="mt-1 text-xs font-semibold text-gray-400">{positionShort(slot.position)}</span>
                  <span className={`mt-0.5 text-xs ${found ? 'font-semibold text-white' : show ? 'text-gray-400' : 'text-gray-600'}`}>
                    {show ? slot.name : 'Unnamed'}
                  </span>
                </li>
              )
            })}
          </ul>
        ))}
      </div>
    </div>
  )
}

export default function FootballLineupPage() {
  const qc = useQueryClient()
  const [phase, setPhase] = useState<Phase>('setup')
  useTabLeaveGuard(phase === 'play', 'run')
  const [question, setQuestion] = useState<QuizFootballLineupQuestion | null>(null)
  const [named, setNamed] = useState<string[]>([])
  const [misses, setMisses] = useState<string[]>([])
  const [text, setText] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [seed, setSeed] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const loggedRef = useRef(false)
  const availability = useQuery({
    queryKey: qk.quiz.availability({ scope: 'all' }),
    queryFn: () => api.quiz.availability({ scope: 'all' })
  })
  const score = named.length * FOOTBALL_LINEUP_POINTS_PER_PLAYER

  async function start() {
    setLoading(true)
    setError(null)
    try {
      const nextSeed = quizSeed(`${Date.now()}-${Math.random()}`)
      const request = { kind: 'footballLineup' as const, seed: nextSeed, length: 1, options: {} }
      const pool = await qc.fetchQuery({ queryKey: qk.quiz.challengePool(request), queryFn: () => api.quiz.challengePool(request) })
      const built = pool[0]
      if (!built || built.kind !== 'footballLineup') {
        setError('No match in the archive has two complete starting elevens yet. Install match detail (Transfermarkt) first.')
        return
      }
      setQuestion(built)
      setNamed([])
      setMisses([])
      setText('')
      setMessage(null)
      setSeed(nextSeed)
      loggedRef.current = false
      setPhase('play')
    } finally {
      setLoading(false)
    }
  }

  async function finish(finalNamed: string[]) {
    if (!question || loggedRef.current) return
    loggedRef.current = true
    // A failed log still shows the summary (the error toasts); the round is over.
    try {
      await api.quiz.logSession({
        kind: 'footballLineup',
        score: finalNamed.length * FOOTBALL_LINEUP_POINTS_PER_PLAYER,
        total: question.slots.length,
        bestStreak: 0,
        settings: {
          correct: finalNamed.length,
          attempted: question.slots.length,
          scorePolicy: quizScorePolicy('footballLineup'),
          playMode: 'solo',
          seed,
          matchId: question.matchId,
          side: question.side,
          misses: misses.length,
          datasetRevision: question.datasetRevision
        }
      })
      await qc.invalidateQueries({ queryKey: qk.quiz.history('footballLineup') })
    } finally {
      setPhase('summary')
    }
  }

  function submit() {
    if (!question || !text.trim()) return
    const slot = matchFootballLineupName(question.slots, text, named)
    if (!slot) {
      setMisses((items) => [...items, text.trim()])
      setMessage(`${text.trim()} is not an unnamed starter here.`)
      setText('')
      return
    }
    const next = [...named, slot.key]
    setNamed(next)
    setMessage(`${slot.name} · ${slot.position ?? 'starter'}${slot.shirt != null ? ` · #${slot.shirt}` : ''}`)
    setText('')
    if (next.length === question.slots.length) void finish(next)
  }

  async function giveUp() {
    if (!(await confirmDialog('Reveal the rest of the eleven and end the round?', { confirmLabel: 'Reveal' }))) return
    void finish(named)
  }

  const matchCard = question ? (
    <div className="rounded-xl border border-base-600 bg-base-800 p-4">
      <p className="text-xs uppercase tracking-wider text-gray-500">{[question.competitionName, question.stage, question.matchDate].filter(Boolean).join(' · ')}</p>
      <p className="mt-2 flex flex-wrap items-center gap-2 text-lg font-semibold text-white">
        <Crest name={question.homeTeam} imagePath={question.homeImagePath} />
        <span className={question.side === 'home' ? 'underline decoration-accent decoration-2 underline-offset-4' : ''}>{question.homeTeam}</span>
        <span className="tabular-nums text-gray-300">{question.scoreLabel}</span>
        <span className={question.side === 'away' ? 'underline decoration-accent decoration-2 underline-offset-4' : ''}>{question.awayTeam}</span>
        <Crest name={question.awayTeam} imagePath={question.awayImagePath} />
      </p>
      {question.formation && <p className="mt-1 text-sm text-gray-400">Formation {question.formation}</p>}
    </div>
  ) : null

  if (phase === 'setup') {
    const count = availability.data?.football.lineup ?? 0
    return (
      <div className="mx-auto max-w-3xl p-6">
        <PageHeader title="Name the XI" subtitle="Type every name you can." back={{ to: '/football/quiz', label: 'Football quiz room' }} />
        <div className="card space-y-4 p-6">
          <p className="text-sm text-gray-400">Finals, knockout ties and tournament matches come first. Full names, aliases and unique surnames all count. Each player named is 100 points.</p>
          <p className="text-sm text-gray-400">{count.toLocaleString()} matches with complete lineups.</p>
          {error && <p className="text-sm text-red-300">{error}</p>}
          <button className="btn-primary" disabled={loading || count < 1} onClick={() => void start()}>{loading ? 'Choosing a match…' : 'Start'}</button>
        </div>
        <QuizRecord kind="footballLineup" />
      </div>
    )
  }

  if (!question) return null

  if (phase === 'summary') {
    return (
      <StudySessionFrame title="Name the XI" subtitle={`${named.length} of ${question.slots.length} named`}>
        {matchCard}
        <p className="my-5 text-center text-4xl font-semibold tabular-nums text-white">{score} points</p>
        <Pitch slots={question.slots} named={named} revealed />
        <div className="mt-6 flex justify-center gap-3">
          <button className="btn-primary" onClick={() => void start()}>Play again</button>
          <Link to="/football/quiz" className="btn-ghost">Quiz room</Link>
        </div>
      </StudySessionFrame>
    )
  }

  return (
    <StudySessionFrame
      title="Name the XI"
      subtitle={`${named.length} of ${question.slots.length} named · ${score} points`}
      progress={{ current: named.length, total: question.slots.length, label: 'Players named' }}
      actions={<button className="btn-ghost" onClick={() => void giveUp()}>Give up</button>}
      rail={<SessionEvidence title="How it works"><p>Type a starter's full name, an alias, or a surname no other unnamed starter shares. Wrong names cost nothing; Give up reveals the rest.</p></SessionEvidence>}
    >
      {matchCard}
      <div className="mt-5"><Pitch slots={question.slots} named={named} revealed={false} /></div>
      <div className="mt-5 flex items-end gap-2">
        <Field label="Starter" className="min-w-0 flex-1">
          <input className="input" autoFocus autoComplete="off" value={text} onChange={(event) => setText(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') submit() }} placeholder="Type a name" />
        </Field>
        <button className="btn-primary" disabled={!text.trim()} onClick={submit}>Submit</button>
      </div>
      {message && <p className="mt-3 text-sm text-gray-300" role="status">{message}</p>}
      {misses.length > 0 && <p className="mt-2 text-xs text-gray-500">Not in this XI: {misses.slice(-6).join(', ')}</p>}
    </StudySessionFrame>
  )
}
