import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import Tabs, { TabPanel } from '../components/Tabs'
import QuizRecord from '../components/QuizRecord'
import PitchAccent from '../components/japanese/PitchAccent'
import { Group, Pill } from '../components/PillGroup'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { splitMora, toHiragana } from '@shared/kana'
import type { PitchPoolItem } from '@shared/types'
import MinimalPairsDrill from '../components/japanese/MinimalPairsDrill'
import SpeakDrill from '../components/japanese/SpeakDrill'
import { shuffle } from '@shared/shuffle'
import StudySessionFrame, { SessionEvidence, SessionFeedback } from '../components/StudySessionFrame'

// Pitch accent training, TheMoeWay's optional-but-recommended pillar. Two
// halves: the KNOWLEDGE quiz (see a word, pick its contour — Kanjium data) and
// the PERCEPTION drill (hear a word, pick which contour was said — the
// kotu.io minimal-pairs pack).

type Tab = 'patterns' | 'pairs' | 'speak'

export default function JapanesePitchPage() {
  const [params] = useSearchParams()
  const seeded = params.get('tab') as Tab | null
  const [tab, setTab] = usePersistedState<Tab>(
    'jpPitchTab',
    seeded === 'pairs' || seeded === 'speak' ? seeded : 'patterns'
  )

  return (
    <div className="p-6 max-w-[1320px] mx-auto">
      <PageHeader
        back={{ to: '/japanese', label: 'Japanese' }}
        title="Pitch Accent"
        subtitle="Learn the patterns, hear them, then produce them."
      />

      <Tabs
        id="japanese-pitch"
        label="Pitch accent activity"
        className="mb-5"
        value={tab}
        onChange={setTab}
        tabs={[
          { key: 'patterns', label: 'Patterns' },
          { key: 'pairs', label: 'Minimal pairs' },
          { key: 'speak', label: 'Speak' }
        ]}
      />

      <TabPanel tabsId="japanese-pitch" value={tab}>
        {tab === 'patterns' ? (
          <PatternQuizSetup />
        ) : tab === 'pairs' ? (
          <MinimalPairsDrill />
        ) : (
          <SpeakDrill />
        )}
      </TabPanel>
    </div>
  )
}

// ---- pattern quiz (kind 'pitch') ----

// The human name for a downstep position — taught on the option sub-label,
// never tested by name.
function patternName(position: number, moraCount: number): string {
  if (position === 0) return 'heiban'
  if (position === 1) return 'atamadaka'
  if (position >= moraCount) return 'odaka'
  return 'nakadaka'
}

interface PitchQuestion {
  item: PitchPoolItem
  options: number[] // downstep positions offered; correct = any attested
}

function buildQuestion(item: PitchPoolItem): PitchQuestion {
  const moraCount = splitMora(toHiragana(item.reading)).length
  const attested = new Set(item.positions)
  const decoyPool = shuffle(
    Array.from({ length: moraCount + 1 }, (_, p) => p).filter((p) => !attested.has(p))
  )
  const optionCount = Math.min(4, moraCount + 1)
  const options = shuffle([item.positions[0], ...decoyPool.slice(0, optionCount - 1)])
  return { item, options }
}

type Source = 'cards' | 'frequency' | 'both'
type Phase = 'setup' | 'play' | 'summary'

interface Stats {
  score: number
  total: number
  streak: number
  best: number
}
const ZERO: Stats = { score: 0, total: 0, streak: 0, best: 0 }

function PatternQuizSetup() {
  const qc = useQueryClient()
  const [source, setSource] = usePersistedState<Source>('jpPitchSource', 'both')
  const [length, setLength] = usePersistedState<number>('jpPitchLength', 10) // 0 = endless

  const [phase, setPhase] = useState<Phase>('setup')
  const [question, setQuestion] = useState<PitchQuestion | null>(null)
  const [picked, setPicked] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [stats, setStats] = useState<Stats>(ZERO)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const deckRef = useRef<PitchPoolItem[]>([])
  const poolRef = useRef<PitchPoolItem[]>([])
  const statsRef = useRef<Stats>(ZERO)
  const lengthRef = useRef(0)
  const loggedRef = useRef(false)

  async function start(): Promise<void> {
    setError(null)
    setLoading(true)
    try {
      const pool = await api.japanese.pitchQuizPool({ source, limit: 200 })
      if (pool.length < 4) {
        setError(
          pool.length === 0
            ? 'No pitch data available. Install the Kanjium pack in Settings → Dictionaries — and for "My cards", learn some lessons first.'
            : 'Not enough words with pitch data for a round. Try "Common words" as the source, or install a frequency dictionary.'
        )
        return
      }
      poolRef.current = pool
      deckRef.current = [...pool]
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
    if (deckRef.current.length === 0) deckRef.current = shuffle(poolRef.current)
    setQuestion(buildQuestion(deckRef.current.pop()!))
    setPicked(null)
    setAnswered(false)
  }

  function handleAnswer(position: number | null): void {
    if (answered || !question) return
    const correct = position !== null && question.item.positions.includes(position)
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
    setPicked(position)
    setAnswered(true)
  }

  function endGame(): void {
    const s = statsRef.current
    if (!loggedRef.current && s.total > 0) {
      loggedRef.current = true
      void api.quiz
        .logSession({
          kind: 'pitch',
          score: s.score,
          total: s.total,
          bestStreak: s.best,
          settings: { source, length }
        })
        .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history('pitch') }))
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
        if (opt !== undefined) {
          e.preventDefault()
          handleAnswer(opt)
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
      <div>
        <p className="mb-3 text-sm text-gray-400">
          A word appears with its reading — pick the contour it&apos;s said with. The names
          (heiban, atamadaka…) ride along on the options until they stick.
        </p>
        <div className="card p-5 space-y-5">
          <Group label="Words from">
            <Pill active={source === 'cards'} onClick={() => setSource('cards')} label="My cards" />
            <Pill
              active={source === 'frequency'}
              onClick={() => setSource('frequency')}
              label="Common words"
            />
            <Pill active={source === 'both'} onClick={() => setSource('both')} label="Both" />
          </Group>
          <Group label="Length">
            <Pill active={length === 10} onClick={() => setLength(10)} label="10 questions" />
            <Pill active={length === 20} onClick={() => setLength(20)} label="20 questions" />
            <Pill active={length === 0} onClick={() => setLength(0)} label="Endless" />
          </Group>
          {error && <p className="text-sm text-signal-anomaly">{error}</p>}
          <button className="btn-primary w-full" disabled={loading} onClick={() => void start()}>
            {loading ? 'Loading…' : 'Start quiz'}
          </button>
        </div>
        <QuizRecord kind="pitch" />
      </div>
    )
  }

  if (phase === 'summary') {
    const accuracy = stats.total ? Math.round((stats.score / stats.total) * 100) : 0
    return (
      <StudySessionFrame title="Pitch quiz results" subtitle="Contour recognition summary" surface={false}>
      <div className="card p-8 text-center">
        <p className="text-sm uppercase tracking-widest text-gray-500">Quiz complete</p>
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
          <Link to="/japanese" className="btn-ghost flex-1 text-center">
            Back
          </Link>
        </div>
      </div>
      </StudySessionFrame>
    )
  }

  if (!question) return null
  const { item, options } = question
  const moraCount = splitMora(toHiragana(item.reading)).length
  const qNum = answered ? stats.total : stats.total + 1

  return (
    <StudySessionFrame
      title="Pitch quiz"
      subtitle={lengthRef.current > 0 ? `Question ${qNum} of ${lengthRef.current}` : `Question ${qNum}`}
      progress={lengthRef.current > 0 ? { current: qNum, total: lengthRef.current, label: 'Round' } : undefined}
      actions={<button className="btn-ghost" onClick={endGame}>End quiz</button>}
      rail={
        <>
          <SessionEvidence title="Session evidence">
            <p>Score: {stats.score}/{stats.total}</p>
            <p>Current streak: {stats.streak}</p>
            <p>Best streak: {stats.best}</p>
          </SessionEvidence>
          <SessionEvidence title="Keyboard">
            Keys 1-4 choose a contour. Enter advances after the accepted patterns appear.
          </SessionEvidence>
        </>
      }
      feedback={
        answered ? (
          <SessionFeedback
            tone={picked !== null && item.positions.includes(picked) ? 'correct' : 'incorrect'}
            title={picked !== null && item.positions.includes(picked) ? 'Correct' : picked === null ? 'Skipped' : 'Incorrect'}
          >
            Accepted {item.positions.length > 1 ? 'attested variants are shown below.' : 'pattern is shown below.'}
          </SessionFeedback>
        ) : undefined
      }
    >
      <div className="card p-8 text-center">
        <p className="text-xs uppercase tracking-widest text-gray-500">
          How is this word said?
        </p>
        <p className="mt-3 text-4xl leading-relaxed">{item.term}</p>
        {item.reading !== item.term && (
          <p className="mt-1 text-lg text-gray-400">{item.reading}</p>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((pos, i) => {
          const isCorrect = answered && item.positions.includes(pos)
          const wrongPick = answered && picked === pos && !isCorrect
          return (
            <button
              key={pos}
              disabled={answered}
              onClick={() => handleAnswer(pos)}
              className={`rounded-lg border p-3 text-left transition-colors ${
                isCorrect
                  ? 'border-signal-affirmative bg-signal-affirmative/15'
                  : wrongPick
                    ? 'border-signal-anomaly bg-signal-anomaly/15'
                    : 'border-base-700 bg-base-800 hover:border-accent hover:bg-base-700'
              } ${answered ? 'cursor-default' : ''}`}
            >
              <span className="text-xl">
                <PitchAccent reading={item.reading} position={pos} />
              </span>
              <span className="ml-2 text-xs text-gray-500">{patternName(pos, moraCount)}</span>
              <kbd className="kbd float-right">{i + 1}</kbd>
            </button>
          )
        })}
      </div>

      {answered && (
        <div className="card mt-4 p-4">
          <p
            className={`text-xs font-semibold uppercase tracking-wide ${
              picked !== null && item.positions.includes(picked) ? 'text-signal-affirmative' : 'text-signal-anomaly'
            }`}
          >
            {picked !== null && item.positions.includes(picked)
              ? 'Correct'
              : picked === null
                ? 'Skipped'
                : 'Incorrect'}
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Accepted{item.positions.length > 1 ? ' (all attested variants)' : ''}:
          </p>
          <div className="mt-1 flex flex-wrap gap-4 text-lg">
            {item.positions.map((pos) => (
              <PitchAccent key={pos} reading={item.reading} position={pos} />
            ))}
          </div>
          {item.fromCards && (
            <p className="mt-2 text-xs text-gray-500">From your cards.</p>
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
