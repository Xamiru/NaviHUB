import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import { Field } from '../components/Field'
import ChronologyOrder from '../components/quiz/ChronologyOrder'
import QuizPersonAutocomplete from '../components/quiz/QuizPersonAutocomplete'
import { FootballTeamMark } from '../components/football/FootballCommon'
import { Group, Pill } from '../components/PillGroup'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { answerIsCorrect, quizScorePolicy, quizSeed } from '@shared/quizCore'
import { normalizeFootballName } from '@shared/football'
import {
  FOOTBALL_CAREER_START_SPELLS,
  footballCareerGuessPoints,
  footballCareerMaxGuesses
} from '@shared/footballQuiz'
import { footballDuelWinner } from '@shared/footballGames'
import type {
  QuizCareerPerson,
  QuizChallengeQuestion,
  QuizFootballPlayerGridQuestion,
  QuizKind
} from '@shared/types'
import { useTabLeaveGuard } from '../lib/browserTabs'
import { footballAvailabilityQuery } from '../lib/quizAvailability'

export type FootballQuizGameKind =
  | 'footballChampion'
  | 'footballScoreline'
  | 'footballCareerPath'
  | 'footballChronology'
  | 'footballPlayerGrid'

const COPY: Record<FootballQuizGameKind, { title: string; body: string }> = {
  footballChampion: { title: 'Champion', body: 'Name the verified champion of each completed edition.' },
  footballScoreline: { title: 'Scoreline', body: 'Recover exact final scores from the match record.' },
  footballCareerPath: { title: 'Career Path', body: 'Type the player as their senior clubs are revealed in career order.' },
  footballChronology: { title: 'Champion Chronology', body: 'Order four different champions from one competition.' },
  footballPlayerGrid: { title: 'Player Grid', body: 'Fill nine intersections with different verified senior players, solo or as a two-player duel.' }
}

type Phase = 'setup' | 'play' | 'summary'

// One answered question, for the round recap.
interface FootballResult {
  title: string
  answer: string
  picked: string | null
  correct: boolean
  detail?: string
}

// The session kind a round logs: Career Path became a typed, points-ranked
// game (2026-10-14) and keeps its own records apart from the old choices.
function sessionKindFor(kind: FootballQuizGameKind): QuizKind {
  return kind === 'footballCareerPath' ? 'footballCareerGuess' : kind
}

/** A crest for a team the quiz names only as text; teams without a picture get the two-colour crest. */
function QuizCrest({ name, imagePath, size = 'xs' }: { name: string; imagePath?: string | null; size?: 'xs' | 'sm' | 'md' }) {
  return <FootballTeamMark team={{ id: 0, name, shortName: null, country: null, isNational: false, imagePath: imagePath ?? null, colors: null, favorite: false }} size={size} />
}

export default function FootballQuizGamePage({ kind }: { kind: FootballQuizGameKind }) {
  const qc = useQueryClient()
  const defaults = kind === 'footballCareerPath' ? 5 : kind === 'footballChronology' ? 5 : kind === 'footballPlayerGrid' ? 1 : 10
  const [length, setLength] = useState(defaults)
  const [matchScope, setMatchScope] = useState<'big' | 'any'>('big')
  const [gridMode, setGridMode] = useState<'solo' | 'duel'>('solo')
  const [phase, setPhase] = useState<Phase>('setup')
  useTabLeaveGuard(phase === 'play', 'run')
  const [questions, setQuestions] = useState<QuizChallengeQuestion[]>([])
  const [index, setIndex] = useState(0)
  const [seed, setSeed] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [order, setOrder] = useState<string[]>([])
  const [correct, setCorrect] = useState(0)
  const [attempted, setAttempted] = useState(0)
  const [points, setPoints] = useState(0)
  const [results, setResults] = useState<FootballResult[]>([])
  const [careerWrong, setCareerWrong] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [gridCell, setGridCell] = useState('0-0')
  const [gridText, setGridText] = useState('')
  const [gridFilled, setGridFilled] = useState<Record<string, { playerKey: string; hinted: boolean }>>({})
  const [gridHints, setGridHints] = useState<string[]>([])
  const [gridInvalid, setGridInvalid] = useState(0)
  const [gridMessage, setGridMessage] = useState<string | null>(null)
  const [duelTurn, setDuelTurn] = useState<1 | 2>(1)
  const [duelOwners, setDuelOwners] = useState<Record<string, 1 | 2>>({})
  const loggedRef = useRef(false)
  const availabilityQuery = useQuery(footballAvailabilityQuery())
  const availability = availabilityQuery.data
  const question = questions[index]
  const grid = question?.kind === 'footballPlayerGrid' ? question : null
  const playerByKey = useMemo(
    () => new Map(grid?.players.map((player) => [player.key, player]) ?? []),
    [grid]
  )
  const careerPeople = useMemo<QuizCareerPerson[]>(
    () => (question?.kind === 'footballCareerPath' ? question.players.map((player) => ({ ...player, roles: [] })) : []),
    [question]
  )
  const gridScore = Math.max(
    0,
    Object.values(gridFilled).reduce((sum, item) => sum + (item.hinted ? 40 : 100), 0) - gridInvalid * 10
  )
  const duel = kind === 'footballPlayerGrid' && gridMode === 'duel'

  async function start() {
    setLoading(true)
    setError(null)
    try {
      const nextSeed = quizSeed(`${Date.now()}-${Math.random()}`)
      const request = { kind, seed: nextSeed, length, options: kind === 'footballScoreline' ? { footballMatchScope: matchScope } : {} }
      const pool = await qc.fetchQuery({
        queryKey: qk.quiz.challengePool(request),
        queryFn: () => api.quiz.challengePool(request)
      })
      if (pool.length < length) {
        setError('The verified archive cannot build this round yet. Install more complete source data or choose a shorter round.')
        return
      }
      setQuestions(pool)
      setIndex(0)
      setSeed(nextSeed)
      setSelected(null)
      setCorrect(0)
      setAttempted(0)
      setPoints(0)
      setResults([])
      setCareerWrong([])
      setOrder(pool[0].kind === 'footballChronology' ? pool[0].choices.map((item) => item.key) : [])
      setGridCell('0-0')
      setGridText('')
      setGridFilled({})
      setGridHints([])
      setGridInvalid(0)
      setGridMessage(null)
      setDuelTurn(1)
      setDuelOwners({})
      loggedRef.current = false
      setPhase('play')
    } finally {
      setLoading(false)
    }
  }

  async function finish(finalCorrect: number, finalAttempted: number, score = finalCorrect) {
    if (loggedRef.current) return
    loggedRef.current = true
    // A duel is a same-screen party game: it never enters solo records.
    if (duel) {
      setPhase('summary')
      return
    }
    setSaving(true)
    const sessionKind = sessionKindFor(kind)
    const revision = questions.map((item) => 'datasetRevision' in item ? item.datasetRevision : null).filter(Boolean).sort().at(-1) ?? null
    try {
      await api.quiz.logSession({
        kind: sessionKind,
        score,
        total: Math.max(1, finalAttempted),
        bestStreak: 0,
        settings: {
          correct: finalCorrect,
          attempted: finalAttempted,
          scorePolicy: quizScorePolicy(sessionKind),
          playMode: 'solo',
          seed,
          filters: kind === 'footballScoreline' ? { matchScope } : {},
          datasetRevision: revision,
          length,
          hintsUsed: gridHints.length,
          invalidSubmissions: gridInvalid
        }
      })
      await qc.invalidateQueries({ queryKey: qk.quiz.history(sessionKind) })
      setPhase('summary')
    } catch (caught) {
      loggedRef.current = false
      throw caught
    } finally {
      setSaving(false)
    }
  }

  function record(result: FootballResult) {
    setResults((items) => [...items, result])
  }

  function advance(nextCorrect: number, nextAttempted: number, nextPoints = points) {
    const nextIndex = index + 1
    if (nextIndex >= questions.length) {
      void finish(nextCorrect, nextAttempted, kind === 'footballCareerPath' ? nextPoints : nextCorrect)
      return
    }
    setIndex(nextIndex)
    setSelected(null)
    setCareerWrong([])
    setOrder(questions[nextIndex].kind === 'footballChronology' ? questions[nextIndex].choices.map((item) => item.key) : [])
  }

  function submitChoice(key: string) {
    if (!question || selected) return
    setSelected(key)
    const hit = answerIsCorrect(question.validKeys, key)
    setCorrect((value) => value + (hit ? 1 : 0))
    setAttempted((value) => value + 1)
    const answer = question.choices.find((item) => question.validKeys.includes(item.key))?.label ?? ''
    const picked = question.choices.find((item) => item.key === key)?.label ?? null
    record({
      title:
        question.kind === 'footballScoreline'
          ? `${question.homeTeam} vs ${question.awayTeam} · ${question.matchDate}`
          : question.prompt,
      answer,
      picked,
      correct: hit
    })
  }

  function submitChronology() {
    if (!question || question.kind !== 'footballChronology' || selected) return
    const positions = order.reduce((sum, key, position) => sum + (question.validKeys[position] === key ? 1 : 0), 0)
    setSelected('submitted')
    setCorrect((value) => value + positions)
    setAttempted((value) => value + 4)
    record({
      title: question.competitionName,
      answer: question.validKeys
        .map((key) => {
          const entry = question.entries.find((item) => item.key === key)!
          return `${entry.label} (${entry.year})`
        })
        .join(', '),
      picked: null,
      correct: positions === 4,
      detail: `${positions} of 4 in place`
    })
  }

  // Career Path: a wrong guess reveals the next club; the last allowed miss ends it.
  function submitCareer(person: QuizCareerPerson) {
    if (!question || question.kind !== 'footballCareerPath' || selected) return
    const hit = person.key === question.answer.key
    if (hit || careerWrong.length + 1 >= footballCareerMaxGuesses(question.spells.length)) {
      const earned = footballCareerGuessPoints(hit, careerWrong.length)
      setSelected(hit ? 'solved' : 'failed')
      if (!hit) setCareerWrong((items) => [...items, person.key])
      setCorrect((value) => value + (hit ? 1 : 0))
      setAttempted((value) => value + 1)
      setPoints((value) => value + earned)
      record({ title: question.answer.label, answer: question.answer.label, picked: hit ? null : person.label, correct: hit, detail: `${earned} points` })
      return
    }
    setCareerWrong((items) => [...items, person.key])
  }

  function giveUpCareer() {
    if (!question || question.kind !== 'footballCareerPath' || selected) return
    setSelected('failed')
    setAttempted((value) => value + 1)
    record({ title: question.answer.label, answer: question.answer.label, picked: null, correct: false, detail: '0 points' })
  }

  function next() {
    advance(correct, attempted, points)
  }

  function gridSubmit(playerKey?: string) {
    if (!grid) return
    const cell = grid.cells.find((item) => item.key === gridCell)
    if (!cell || gridFilled[cell.key]) return
    const normalized = normalizeFootballName(gridText)
    const player = playerKey
      ? playerByKey.get(playerKey)
      : grid.players.find((item) => [item.label, ...item.aliases].some((name) => normalizeFootballName(name) === normalized))
    if (!player) {
      setGridMessage('Choose a player held in the verified quiz pool. Unknown text is not penalized.')
      return
    }
    const used = Object.values(gridFilled).some((item) => item.playerKey === player.key)
    if (used || !cell.validKeys.includes(player.key)) {
      if (duel) {
        // A miss in a duel hands the turn over instead of costing points.
        setGridMessage(`${used ? 'Already used' : 'Does not fit both clues'}. Player ${duelTurn === 1 ? 2 : 1}'s turn.`)
        setDuelTurn((turn) => (turn === 1 ? 2 : 1))
        setGridText('')
        return
      }
      setGridInvalid((value) => value + 1)
      setGridMessage(used ? 'That player is already used. Verified invalid submission: minus 10.' : 'That player does not satisfy both clues. Verified invalid submission: minus 10.')
      return
    }
    const nextFilled = { ...gridFilled, [cell.key]: { playerKey: player.key, hinted: gridHints.includes(cell.key) } }
    setGridFilled(nextFilled)
    setGridText('')
    setGridMessage(null)
    if (duel) {
      const owners = { ...duelOwners, [cell.key]: duelTurn }
      setDuelOwners(owners)
      if (footballDuelWinner(owners, Object.keys(nextFilled).length) != null) {
        void finish(0, 0)
        return
      }
      setDuelTurn((turn) => (turn === 1 ? 2 : 1))
      const open = grid.cells.find((item) => !nextFilled[item.key])
      if (open) setGridCell(open.key)
      return
    }
    const open = grid.cells.find((item) => !nextFilled[item.key])
    if (open) setGridCell(open.key)
    else void finish(9, 9 + gridInvalid, Math.max(0, Object.values(nextFilled).reduce((sum, item) => sum + (item.hinted ? 40 : 100), 0) - gridInvalid * 10))
  }

  if (phase === 'setup') {
    if (availabilityQuery.isLoading) return <PageStatus>Checking Football quiz eligibility...</PageStatus>
    if (availabilityQuery.isError) return <PageStatus>Could not load Football quiz eligibility.</PageStatus>
    const count = kind === 'footballChampion' ? availability?.champion : kind === 'footballScoreline' ? availability?.scoreline : kind === 'footballCareerPath' ? availability?.careerPath : kind === 'footballChronology' ? availability?.chronology : availability?.playerGrid
    const lengths = kind === 'footballCareerPath' ? [5, 10] : kind === 'footballPlayerGrid' ? [1] : kind === 'footballChronology' ? [5] : [5, 10, 20]
    const minimumFacts = kind === 'footballChronology' ? 4 : kind === 'footballPlayerGrid' ? 1 : length
    return (
      <div className="mx-auto max-w-3xl p-6">
        <PageHeader title={COPY[kind].title} subtitle={COPY[kind].body} back={{ to: '/football/quiz', label: 'Football quiz room' }} />
        <div className="space-y-5 border-y border-line-subtle py-6">
          {kind === 'footballPlayerGrid' ? (
            <Group label="Mode">
              <Pill active={gridMode === 'solo'} onClick={() => setGridMode('solo')} label="Solo" />
              <Pill active={gridMode === 'duel'} onClick={() => setGridMode('duel')} label="Duel (two players)" />
            </Group>
          ) : (
            <Group label="Round length">{lengths.map((value) => <Pill key={value} active={length === value} onClick={() => setLength(value)} label={kind === 'footballChronology' ? 'Five boards / 20 positions' : `${value} questions`} />)}</Group>
          )}
          {kind === 'footballScoreline' && (
            <Group label="Matches">
              <Pill active={matchScope === 'big'} onClick={() => setMatchScope('big')} label="Finals and knockouts" />
              <Pill active={matchScope === 'any'} onClick={() => setMatchScope('any')} label="Any match" />
            </Group>
          )}
          {duel && <p className="text-sm text-ink-muted">Players take turns naming a player for any open cell. A miss passes the turn. Three in a row wins; a full board goes to whoever holds more cells.</p>}
          {kind === 'footballCareerPath' && <p className="text-sm text-ink-muted">Two clubs show at the start. Each wrong guess reveals the next one and lowers that player from 100 points by 20.</p>}
          <p className="text-sm text-ink-muted">{count ?? 0} eligible facts. Conflicted, partial and unsupported records are excluded before the deal.</p>
          {error && <p className="text-sm text-signal-anomaly">{error}</p>}
          <button className="btn-primary" disabled={loading || (count ?? 0) < minimumFacts} onClick={start}>Start round</button>
        </div>
      </div>
    )
  }

  if (phase === 'summary') {
    const duelWinner = grid && duel ? footballDuelWinner(duelOwners, Object.keys(gridFilled).length) : null
    return (
      <div className="mx-auto max-w-4xl p-6">
        <PageHeader title={duel ? 'Duel over' : 'Round complete'} subtitle={COPY[kind].title} back={{ to: '/football/quiz', label: 'Football quiz room' }} />
        {duel ? (
          <p className="text-4xl font-semibold text-ink">{duelWinner === 'draw' ? 'A draw' : `Player ${duelWinner} wins`}</p>
        ) : (
          <p className="text-5xl font-semibold tabular-nums text-ink">
            {kind === 'footballPlayerGrid' ? gridScore : kind === 'footballCareerPath' ? points : correct}
            <span className="text-xl text-ink-muted"> / {kind === 'footballPlayerGrid' ? 900 : kind === 'footballCareerPath' ? questions.length * 100 : attempted}</span>
          </p>
        )}
        <div className="mt-6 flex gap-2"><button className="btn-primary" onClick={() => void start()}>Play again</button><button className="btn-ghost" onClick={() => setPhase('setup')}>Setup</button><Link to="/football/quiz" className="btn-ghost">Quiz room</Link></div>
        {grid && (
          <div className="mt-8 grid gap-2 sm:grid-cols-3">
            {grid.cells.map((cell) => {
              const filled = gridFilled[cell.key]
              const shownKey = filled?.playerKey ?? cell.revealKey
              const others = cell.validKeys.filter((key) => key !== shownKey).map((key) => playerByKey.get(key)?.label).filter(Boolean)
              return (
                <div key={cell.key} className="rounded-lg border border-line-subtle p-3 text-sm">
                  <p className="text-xs text-ink-muted">{grid.rows[cell.row].label} / {grid.columns[cell.column].label}</p>
                  <p className="mt-1 font-medium text-ink">
                    {playerByKey.get(shownKey)?.label}
                    {!filled && <span className="ml-2 text-xs font-normal text-ink-muted">revealed</span>}
                    {duel && filled && <span className="ml-2 text-xs font-normal text-ink-muted">Player {duelOwners[cell.key]}</span>}
                  </p>
                  {others.length > 0 && <p className="mt-1 text-xs text-ink-muted">Also valid: {others.slice(0, 5).join(', ')}{others.length > 5 ? ` and ${others.length - 5} more` : ''}</p>}
                </div>
              )
            })}
          </div>
        )}
        {results.length > 0 && (
          <ol className="mt-8 divide-y divide-line-subtle border-y border-line-subtle">
            {results.map((result, resultIndex) => (
              <li key={resultIndex} className="flex items-start gap-4 py-3 text-sm">
                <span className="w-6 tabular-nums text-ink-muted">{resultIndex + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-ink">{result.title}</p>
                  {result.answer !== result.title && <p className="text-ink-secondary">{result.answer}</p>}
                  {!result.correct && result.picked && <p className="text-ink-muted">You picked {result.picked}</p>}
                </div>
                <span className={result.correct ? 'text-signal-affirmative' : 'text-signal-anomaly'}>
                  {result.detail ?? (result.correct ? 'Correct' : 'Missed')}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    )
  }

  if (!question) return null
  if (grid) {
    const active = grid.cells.find((item) => item.key === gridCell)!
    const hintPlayers = active.hintChoices.map((key) => playerByKey.get(key)).filter(Boolean)
    return (
      <div className="mx-auto max-w-5xl p-6">
        <PageHeader
          title={duel ? 'Player Grid duel' : 'Player Grid'}
          subtitle={duel ? `Player ${duelTurn}'s turn` : `${Object.keys(gridFilled).length} of 9 cells / ${gridScore} points`}
          back={{ to: '/football/quiz', label: 'Football quiz room' }}
        />
        <div className="overflow-x-auto" aria-label="Player Grid board">
          <div className="grid min-w-[640px] grid-cols-[150px_repeat(3,minmax(0,1fr))] border-l border-t border-line-subtle text-sm">
          <div className="border-b border-r border-line-subtle bg-surface-raised p-3" />
          {grid.columns.map((clue) => <div key={clue.key} className="border-b border-r border-line-subtle bg-surface-raised p-3 font-medium text-ink">{clue.label}</div>)}
          {grid.rows.flatMap((row, rowIndex) => [
            <div key={`row-${row.key}`} className="border-b border-r border-line-subtle bg-surface-raised p-3 font-medium text-ink">{row.label}</div>,
            ...grid.columns.map((column, columnIndex) => {
              const key = `${rowIndex}-${columnIndex}`
              const filled = gridFilled[key]
              const owner = duelOwners[key]
              const ownerTone = owner === 1 ? 'bg-signal-link/15' : owner === 2 ? 'bg-signal-caution/15' : ''
              return <button key={key} aria-label={`Select ${row.label} / ${column.label}`} className={`min-h-24 border-b border-r border-line-subtle p-3 text-left ${ownerTone} ${gridCell === key && !filled ? 'bg-accent/10' : filled ? '' : 'hover:bg-surface-raised/45'}`} disabled={!!filled} onClick={() => { setGridCell(key); setGridMessage(null) }}>{filled ? <><span className="block font-medium text-ink">{playerByKey.get(filled.playerKey)?.label}</span><span className="mt-1 block text-xs text-ink-muted">{duel ? `Player ${owner}` : filled.hinted ? '40 points / hinted' : '100 points / unaided'}</span></> : <span className="text-ink-muted">Select cell</span>}</button>
            })
          ])}
          </div>
        </div>
        <div className="mt-6 border-y border-line-subtle py-5">
          <p className="text-sm font-medium text-ink">{duel && <span className={`mr-2 rounded px-2 py-0.5 text-xs ${duelTurn === 1 ? 'bg-signal-link/20' : 'bg-signal-caution/20'}`}>Player {duelTurn}</span>}{grid.rows[active.row].label} / {grid.columns[active.column].label}</p>
          <div className="mt-3 flex items-end gap-2"><Field label="Verified player" className="min-w-0 flex-1"><input className="input" value={gridText} onChange={(event) => setGridText(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') gridSubmit() }} placeholder="Type a player" list="football-grid-players" /></Field><datalist id="football-grid-players">{grid.players.map((player) => <option key={player.key} value={player.label} />)}</datalist><button className="btn-primary" disabled={!gridText.trim() || saving} onClick={() => gridSubmit()}>Submit</button></div>
          {!duel && <button className="btn-ghost mt-3" disabled={gridHints.includes(active.key)} onClick={() => setGridHints((items) => [...items, active.key])}>Show hint choices</button>}
          {duel && <button className="btn-ghost mt-3" onClick={() => { setDuelTurn((turn) => (turn === 1 ? 2 : 1)); setGridMessage(`Player ${duelTurn} passed.`) }}>Pass turn</button>}
          {!duel && gridHints.includes(active.key) && <div className="mt-2 flex flex-wrap gap-2">{hintPlayers.map((player) => player && <button key={player.key} className="pill" onClick={() => gridSubmit(player.key)}>{player.label}</button>)}</div>}
          {gridMessage && <p className="mt-3 text-sm text-signal-anomaly">{gridMessage}</p>}
        </div>
      </div>
    )
  }

  const chronology = question.kind === 'footballChronology'
  const career = question.kind === 'footballCareerPath' ? question : null
  const careerVisible = career ? Math.min(career.spells.length, FOOTBALL_CAREER_START_SPELLS + careerWrong.length) : 0
  return (
    <div className="mx-auto max-w-4xl p-6">
      <PageHeader
        title={COPY[kind].title}
        subtitle={`Question ${index + 1} of ${questions.length}${career ? ` · ${points} points` : ''}`}
        back={{ to: '/football/quiz', label: 'Football quiz room' }}
      />
      <p className="mb-5 text-xl font-semibold text-ink">{question.prompt}</p>
      {question.kind === 'footballScoreline' && (
        <div className="mb-5">
          <p className="flex flex-wrap items-center gap-2 text-lg font-semibold text-ink">
            <QuizCrest name={question.homeTeam} imagePath={question.homeImagePath} size="sm" />{question.homeTeam}
            <span className="text-sm font-normal text-ink-muted">vs</span>
            {question.awayTeam}<QuizCrest name={question.awayTeam} imagePath={question.awayImagePath} size="sm" />
          </p>
          <p className="mt-1 text-sm text-ink-muted">{question.matchDate}{question.stage ? ` / ${question.stage}` : ''}</p>
        </div>
      )}
      {career && (
        <>
          <ol className="mb-5 border-y border-line-subtle py-2">
            {career.spells.map((spell, spellIndex) =>
              spellIndex < careerVisible || selected ? (
                <li key={`${spell.team}-${spellIndex}`} className="grid grid-cols-[110px_minmax(0,1fr)_auto] gap-3 border-b border-line-subtle py-2.5 last:border-0">
                  <span className="text-xs text-ink-muted">{spell.ellipsisBefore ? '... ' : ''}{spell.start ?? '?'} to {spell.end ?? '?'}</span>
                  <span className="flex min-w-0 items-center gap-2 font-medium text-ink"><QuizCrest name={spell.team} imagePath={spell.imagePath} /><span className="truncate">{spell.team}</span></span>
                  <span className="text-xs text-ink-muted">{spell.loan ? 'loan' : 'senior'}</span>
                </li>
              ) : (
                <li key={`locked-${spellIndex}`} className="border-b border-dashed border-line-subtle py-2.5 text-xs text-ink-muted last:border-0">
                  Club {spellIndex + 1} · revealed after another wrong guess
                </li>
              )
            )}
          </ol>
          {!selected && (
            <div className="mb-5">
              <p className="mb-2 text-sm text-ink-muted">Worth {footballCareerGuessPoints(true, careerWrong.length)} points now.</p>
              <QuizPersonAutocomplete people={careerPeople} excludedKeys={careerWrong} resetKey={`${index}-${careerWrong.length}`} onSubmit={submitCareer} />
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {careerWrong.map((key) => <span key={key} className="chip text-ink-muted line-through">{careerPeople.find((person) => person.key === key)?.label}</span>)}
                <button className="btn-ghost ml-auto" onClick={giveUpCareer}>Give up</button>
              </div>
            </div>
          )}
        </>
      )}
      {chronology ? <ChronologyOrder order={order} choices={question.choices} disabled={selected != null} onChange={setOrder} /> : !career && <div className="grid gap-3 sm:grid-cols-2">{question.choices.map((choice) => { const isAnswer = selected != null && question.validKeys.includes(choice.key); return <button key={choice.key} className={`card flex min-h-20 items-center gap-3 p-4 text-left text-sm ${isAnswer ? 'border-signal-affirmative' : selected === choice.key ? 'border-signal-anomaly' : ''}`} disabled={selected != null} onClick={() => submitChoice(choice.key)}>{question.kind === 'footballChampion' && <QuizCrest name={choice.label} imagePath={choice.imagePath} size="md" />}<span>{choice.label}</span></button> })}</div>}
      {selected == null ? chronology && <button className="btn-primary mt-5" onClick={submitChronology}>Submit order</button> : (
        <div className="mt-6 border-t border-line-subtle pt-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-ink-muted">
              {chronology
                ? `${order.filter((key, position) => question.validKeys[position] === key).length} of 4 positions correct.`
                : career
                  ? selected === 'solved'
                    ? `Correct: ${career.answer.label}. ${footballCareerGuessPoints(true, careerWrong.length)} points.`
                    : `It was ${career.answer.label}.`
                  : answerIsCorrect(question.validKeys, selected)
                    ? 'Correct.'
                    : `Answer: ${question.choices.find((choice) => question.validKeys.includes(choice.key))?.label}`}
            </p>
            <button className="btn-primary" disabled={saving} onClick={next}>{index + 1 === questions.length ? 'Finish' : 'Next'}</button>
          </div>
          {question.kind === 'footballChronology' && (
            <ol className="mt-4 grid gap-2 sm:grid-cols-2">
              {question.validKeys.map((key) => {
                const entry = question.entries.find((item) => item.key === key)!
                return (
                  <li key={key}>
                    <Link className="block border-l border-signal-link py-1 pl-3 text-sm text-ink hover:text-signal-link" to={`/football/season/${entry.seasonId}`}>
                      <span className="font-medium">{entry.year}</span>
                      <span className="ml-2 text-ink-muted">{entry.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ol>
          )}
        </div>
      )}
    </div>
  )
}
