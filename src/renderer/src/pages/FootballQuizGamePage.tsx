import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import ChronologyOrder from '../components/quiz/ChronologyOrder'
import { Group, Pill } from '../components/PillGroup'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { answerIsCorrect, quizScorePolicy, quizSeed } from '@shared/quizCore'
import { normalizeFootballName } from '@shared/football'
import type {
  QuizChallengeQuestion,
  QuizFootballPlayerGridQuestion,
  QuizKind
} from '@shared/types'

export type FootballQuizGameKind =
  | 'footballChampion'
  | 'footballScoreline'
  | 'footballCareerPath'
  | 'footballChronology'
  | 'footballPlayerGrid'

const COPY: Record<FootballQuizGameKind, { title: string; body: string }> = {
  footballChampion: { title: 'Champion', body: 'Name the verified champion of each completed edition.' },
  footballScoreline: { title: 'Scoreline', body: 'Recover exact final scores from the match record.' },
  footballCareerPath: { title: 'Career Path', body: 'Identify players from verified senior club spells.' },
  footballChronology: { title: 'Champion Chronology', body: 'Order four champion editions from one competition.' },
  footballPlayerGrid: { title: 'Player Grid', body: 'Fill nine intersections with different verified senior players.' }
}

type Phase = 'setup' | 'play' | 'summary'

export default function FootballQuizGamePage({ kind }: { kind: FootballQuizGameKind }) {
  const qc = useQueryClient()
  const defaults = kind === 'footballCareerPath' ? 5 : kind === 'footballChronology' ? 5 : kind === 'footballPlayerGrid' ? 1 : 10
  const [length, setLength] = useState(defaults)
  const [phase, setPhase] = useState<Phase>('setup')
  const [questions, setQuestions] = useState<QuizChallengeQuestion[]>([])
  const [index, setIndex] = useState(0)
  const [seed, setSeed] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [order, setOrder] = useState<string[]>([])
  const [correct, setCorrect] = useState(0)
  const [attempted, setAttempted] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [gridCell, setGridCell] = useState('0-0')
  const [gridText, setGridText] = useState('')
  const [gridFilled, setGridFilled] = useState<Record<string, { playerKey: string; hinted: boolean }>>({})
  const [gridHints, setGridHints] = useState<string[]>([])
  const [gridInvalid, setGridInvalid] = useState(0)
  const [gridMessage, setGridMessage] = useState<string | null>(null)
  const loggedRef = useRef(false)
  const { data: availability } = useQuery({
    queryKey: qk.quiz.availability({ scope: 'all' }),
    queryFn: () => api.quiz.availability({ scope: 'all' })
  })
  const question = questions[index]
  const grid = question?.kind === 'footballPlayerGrid' ? question : null
  const playerByKey = useMemo(
    () => new Map(grid?.players.map((player) => [player.key, player]) ?? []),
    [grid]
  )
  const gridScore = Math.max(
    0,
    Object.values(gridFilled).reduce((sum, item) => sum + (item.hinted ? 40 : 100), 0) - gridInvalid * 10
  )

  async function start() {
    setLoading(true)
    setError(null)
    try {
      const nextSeed = quizSeed(`${Date.now()}-${Math.random()}`)
      const request = { kind, seed: nextSeed, length, options: {} }
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
      setOrder(pool[0].kind === 'footballChronology' ? pool[0].choices.map((item) => item.key) : [])
      setGridCell('0-0')
      setGridText('')
      setGridFilled({})
      setGridHints([])
      setGridInvalid(0)
      setGridMessage(null)
      loggedRef.current = false
      setPhase('play')
    } finally {
      setLoading(false)
    }
  }

  async function finish(finalCorrect: number, finalAttempted: number, score = finalCorrect) {
    if (loggedRef.current) return
    loggedRef.current = true
    setSaving(true)
    const revision = questions.map((item) => 'datasetRevision' in item ? item.datasetRevision : null).filter(Boolean).sort().at(-1) ?? null
    try {
      await api.quiz.logSession({
        kind: kind as QuizKind,
        score,
        total: Math.max(1, finalAttempted),
        bestStreak: 0,
        settings: {
          correct: finalCorrect,
          attempted: finalAttempted,
          scorePolicy: quizScorePolicy(kind as QuizKind),
          playMode: 'solo',
          seed,
          filters: {},
          datasetRevision: revision,
          length,
          hintsUsed: gridHints.length,
          invalidSubmissions: gridInvalid
        }
      })
      await qc.invalidateQueries({ queryKey: qk.quiz.history(kind as QuizKind) })
      setPhase('summary')
    } catch (caught) {
      loggedRef.current = false
      throw caught
    } finally {
      setSaving(false)
    }
  }

  function advance(nextCorrect: number, nextAttempted: number) {
    const nextIndex = index + 1
    if (nextIndex >= questions.length) {
      void finish(nextCorrect, nextAttempted)
      return
    }
    setIndex(nextIndex)
    setSelected(null)
    setOrder(questions[nextIndex].kind === 'footballChronology' ? questions[nextIndex].choices.map((item) => item.key) : [])
  }

  function submitChoice(key: string) {
    if (!question || selected) return
    setSelected(key)
    const hit = answerIsCorrect(question.validKeys, key)
    const nextCorrect = correct + (hit ? 1 : 0)
    const nextAttempted = attempted + 1
    setCorrect(nextCorrect)
    setAttempted(nextAttempted)
  }

  function submitChronology() {
    if (!question || question.kind !== 'footballChronology' || selected) return
    const positions = order.reduce((sum, key, position) => sum + (question.validKeys[position] === key ? 1 : 0), 0)
    setSelected('submitted')
    setCorrect((value) => value + positions)
    setAttempted((value) => value + 4)
  }

  function next() {
    advance(correct, attempted)
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
      setGridInvalid((value) => value + 1)
      setGridMessage(used ? 'That player is already used. Verified invalid submission: minus 10.' : 'That player does not satisfy both clues. Verified invalid submission: minus 10.')
      return
    }
    const next = { ...gridFilled, [cell.key]: { playerKey: player.key, hinted: gridHints.includes(cell.key) } }
    setGridFilled(next)
    setGridText('')
    setGridMessage(null)
    const open = grid.cells.find((item) => !next[item.key])
    if (open) setGridCell(open.key)
    else void finish(9, 9 + gridInvalid, Math.max(0, Object.values(next).reduce((sum, item) => sum + (item.hinted ? 40 : 100), 0) - gridInvalid * 10))
  }

  if (phase === 'setup') {
    const count = kind === 'footballChampion' ? availability?.football.champion : kind === 'footballScoreline' ? availability?.football.scoreline : kind === 'footballCareerPath' ? availability?.football.careerPath : kind === 'footballChronology' ? availability?.football.chronology : availability?.football.playerGrid
    const lengths = kind === 'footballCareerPath' ? [5, 10] : kind === 'footballPlayerGrid' ? [1] : kind === 'footballChronology' ? [5] : [5, 10, 20]
    const minimumFacts = kind === 'footballChronology' ? 4 : kind === 'footballPlayerGrid' ? 1 : length
    return (
      <div className="mx-auto max-w-3xl p-6">
        <PageHeader title={COPY[kind].title} subtitle={COPY[kind].body} back={{ to: '/football/quiz', label: 'Football quiz room' }} />
        <div className="border-y border-line-subtle py-6">
          <Group label="Round length">{lengths.map((value) => <Pill key={value} active={length === value} onClick={() => setLength(value)} label={kind === 'footballPlayerGrid' ? 'One 3x3 board' : kind === 'footballChronology' ? 'Five boards / 20 positions' : `${value} questions`} />)}</Group>
          <p className="mt-5 text-sm text-ink-muted">{count ?? 0} eligible facts. Conflicted, partial and unsupported records are excluded before the deal.</p>
          {error && <p className="mt-4 text-sm text-signal-anomaly">{error}</p>}
          <button className="btn-primary mt-5" disabled={loading || (count ?? 0) < minimumFacts} onClick={start}>Start round</button>
        </div>
      </div>
    )
  }

  if (phase === 'summary') {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <PageHeader title="Round complete" subtitle={COPY[kind].title} back={{ to: '/football/quiz', label: 'Football quiz room' }} />
        <p className="text-5xl font-semibold tabular-nums text-ink">{kind === 'footballPlayerGrid' ? gridScore : correct}<span className="text-xl text-ink-muted"> / {kind === 'footballPlayerGrid' ? 900 : attempted}</span></p>
        <div className="mt-6 flex gap-2"><button className="btn-primary" onClick={() => setPhase('setup')}>Play again</button><Link to="/football/quiz" className="btn-ghost">Quiz room</Link></div>
      </div>
    )
  }

  if (!question) return null
  if (grid) {
    const active = grid.cells.find((item) => item.key === gridCell)!
    const hintPlayers = active.hintChoices.map((key) => playerByKey.get(key)).filter(Boolean)
    return (
      <div className="mx-auto max-w-5xl p-6">
        <PageHeader title="Player Grid" subtitle={`${Object.keys(gridFilled).length} of 9 cells / ${gridScore} points`} back={{ to: '/football/quiz', label: 'Football quiz room' }} />
        <div className="grid grid-cols-[150px_repeat(3,minmax(0,1fr))] border-l border-t border-line-subtle text-sm">
          <div className="border-b border-r border-line-subtle bg-surface-raised p-3" />
          {grid.columns.map((clue) => <div key={clue.key} className="border-b border-r border-line-subtle bg-surface-raised p-3 font-medium text-ink">{clue.label}</div>)}
          {grid.rows.flatMap((row, rowIndex) => [
            <div key={`row-${row.key}`} className="border-b border-r border-line-subtle bg-surface-raised p-3 font-medium text-ink">{row.label}</div>,
            ...grid.columns.map((_, columnIndex) => {
              const key = `${rowIndex}-${columnIndex}`
              const filled = gridFilled[key]
              return <button key={key} className={`min-h-24 border-b border-r border-line-subtle p-3 text-left ${gridCell === key ? 'bg-accent/10' : 'hover:bg-surface-raised/45'}`} disabled={!!filled} onClick={() => { setGridCell(key); setGridMessage(null) }}>{filled ? <><span className="block font-medium text-ink">{playerByKey.get(filled.playerKey)?.label}</span><span className="mt-1 block text-xs text-ink-muted">{filled.hinted ? '40 points / hinted' : '100 points / unaided'}</span></> : <span className="text-ink-muted">Select cell</span>}</button>
            })
          ])}
        </div>
        <div className="mt-6 border-y border-line-subtle py-5">
          <p className="text-sm font-medium text-ink">{grid.rows[active.row].label} / {grid.columns[active.column].label}</p>
          <div className="mt-3 flex gap-2"><input className="input" value={gridText} onChange={(event) => setGridText(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') gridSubmit() }} placeholder="Type a verified player..." list="football-grid-players" /><datalist id="football-grid-players">{grid.players.map((player) => <option key={player.key} value={player.label} />)}</datalist><button className="btn-primary" disabled={!gridText.trim() || saving} onClick={() => gridSubmit()}>Submit</button></div>
          <button className="btn-ghost mt-3" disabled={gridHints.includes(active.key)} onClick={() => setGridHints((items) => [...items, active.key])}>Show hint choices</button>
          {gridHints.includes(active.key) && <div className="mt-2 flex flex-wrap gap-2">{hintPlayers.map((player) => player && <button key={player.key} className="pill" onClick={() => gridSubmit(player.key)}>{player.label}</button>)}</div>}
          {gridMessage && <p className="mt-3 text-sm text-signal-anomaly">{gridMessage}</p>}
        </div>
      </div>
    )
  }

  const chronology = question.kind === 'footballChronology'
  return (
    <div className="mx-auto max-w-4xl p-6">
      <PageHeader title={COPY[kind].title} subtitle={`Question ${index + 1} of ${questions.length}`} back={{ to: '/football/quiz', label: 'Football quiz room' }} />
      <p className="mb-5 text-xl font-semibold text-ink">{question.prompt}</p>
      {question.kind === 'footballScoreline' && <p className="mb-5 text-sm text-ink-muted">{question.homeTeam} vs {question.awayTeam} / {question.matchDate}{question.stage ? ` / ${question.stage}` : ''}</p>}
      {question.kind === 'footballCareerPath' && <ol className="mb-6 border-y border-line-subtle py-2">{question.spells.map((spell, spellIndex) => <li key={`${spell.team}-${spellIndex}`} className="grid grid-cols-[110px_minmax(0,1fr)_auto] gap-3 border-b border-line-subtle py-2.5 last:border-0"><span className="text-xs text-ink-muted">{spell.ellipsisBefore ? '... ' : ''}{spell.start ?? '?'} to {spell.end ?? '?'}</span><span className="font-medium text-ink">{spell.team}</span><span className="text-xs text-ink-muted">{spell.loan ? 'loan' : 'senior'}</span></li>)}</ol>}
      {chronology ? <ChronologyOrder order={order} choices={question.choices} disabled={selected != null} onChange={setOrder} /> : <div className="grid gap-3 sm:grid-cols-2">{question.choices.map((choice) => <button key={choice.key} className={`card min-h-20 p-4 text-left text-sm ${selected === choice.key ? 'border-accent' : ''}`} disabled={selected != null} onClick={() => submitChoice(choice.key)}>{choice.label}</button>)}</div>}
      {selected == null ? chronology && <button className="btn-primary mt-5" onClick={submitChronology}>Submit order</button> : (
        <div className="mt-6 border-t border-line-subtle pt-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-ink-muted">{chronology ? `${order.filter((key, position) => question.validKeys[position] === key).length} of 4 positions correct.` : answerIsCorrect(question.validKeys, selected) ? 'Correct.' : `Answer: ${question.choices.find((choice) => question.validKeys.includes(choice.key))?.label}`}</p>
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
