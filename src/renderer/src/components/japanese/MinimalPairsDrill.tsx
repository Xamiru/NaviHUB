import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import EmptyState from '../EmptyState'
import Section from '../Section'
import QuizRecord from '../QuizRecord'
import PitchAccent from './PitchAccent'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { usePersistedState } from '../../lib/navState'
import { usePlayer } from '../../lib/player'
import { mediaUrl } from '@shared/mediaUrl'
import type { MinimalPair, MinimalPairItem } from '@shared/types'

// The kotu.io minimal-pairs mechanic (kind 'pairs'): a native recording plays,
// you pick which of two pitch contours you heard. Endless with Stop, running
// accuracy in the header. Clips play through a page-local Audio element —
// never the global player queue.

const BUCKET_LABELS: Record<string, string> = {
  pitch0: 'heiban [0]',
  pitch1: 'atamadaka [1]',
  pitch2: 'nakadaka [2]',
  pitch3: 'nakadaka [3]',
  pitch4: 'nakadaka [4]',
  devoiced: 'devoiced'
}

export default function MinimalPairsDrill() {
  const [buckets, setBuckets] = usePersistedState<string[]>('jpPairsBuckets', [])
  const [running, setRunning] = useState(false)

  const { data: pairSet, isLoading } = useQuery({
    queryKey: qk.dict.pairSet,
    queryFn: () => api.dict.pairSet()
  })
  const { data: pairs = [] } = useQuery({
    queryKey: qk.dict.minimalPairs,
    queryFn: () => api.dict.minimalPairs(),
    enabled: !!pairSet
  })

  const available = useMemo(() => {
    const set = new Set<string>()
    for (const p of pairs) for (const b of p.buckets) set.add(b)
    return [...set].sort()
  }, [pairs])

  const active = new Set(buckets)
  const filtered = useMemo(
    () =>
      buckets.length === 0
        ? pairs
        : pairs.filter((p) => p.buckets.some((b) => active.has(b))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pairs, buckets]
  )

  if (!isLoading && !pairSet) {
    return (
      <EmptyState
        title="Minimal pairs pack not installed"
        body="Download the pitch minimal-pairs audio pack in Settings → Dictionaries (~18 MB) to train your ear."
        action={
          <Link to="/settings" className="btn-primary">
            Open Settings
          </Link>
        }
      />
    )
  }

  if (running && filtered.length > 0) {
    return <PairsPlay pairs={filtered} buckets={buckets} onExit={() => setRunning(false)} />
  }

  return (
    <div>
      <p className="mb-3 text-sm text-gray-400">
        A recording plays — was it 箸 or 橋? Pick the contour you heard. The exact drill kotu.io
        runs, offline. Endless; Stop when your ears give out.
      </p>
      <Section
        title="Patterns"
        className="mb-5"
        subtitle={
          buckets.length > 0 && (
            <button
              className="text-xs text-gray-500 hover:text-gray-300"
              onClick={() => setBuckets([])}
            >
              all
            </button>
          )
        }
      >
        <div className="flex flex-wrap gap-1.5">
          {available.map((b) => (
            <button
              key={b}
              onClick={() =>
                setBuckets(active.has(b) ? buckets.filter((x) => x !== b) : [...buckets, b])
              }
              className={active.has(b) ? 'chip-toggle chip-toggle-active' : 'chip-toggle'}
            >
              {BUCKET_LABELS[b] ?? b}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-500">Nothing selected = every pattern.</p>
      </Section>

      <button
        className="btn-primary"
        disabled={filtered.length === 0}
        onClick={() => setRunning(true)}
      >
        Start drill ({filtered.length.toLocaleString()} pairs)
      </button>

      <QuizRecord kind="pairs" />
    </div>
  )
}

interface Round {
  pair: MinimalPair
  options: [MinimalPairItem, MinimalPairItem]
  playedIndex: 0 | 1
}

function makeRound(pairs: MinimalPair[]): Round | null {
  for (let tries = 0; tries < 30; tries++) {
    const pair = pairs[Math.floor(Math.random() * pairs.length)]
    // Two recordings with DISTINCT positions (some pairs carry more than two).
    const byPosition = new Map<number, MinimalPairItem>()
    for (const item of pair.items) {
      if (!byPosition.has(item.position)) byPosition.set(item.position, item)
    }
    const distinct = [...byPosition.values()]
    if (distinct.length < 2) continue
    const shuffled = [...distinct].sort(() => Math.random() - 0.5)
    const options: [MinimalPairItem, MinimalPairItem] = [shuffled[0], shuffled[1]]
    return { pair, options, playedIndex: Math.random() < 0.5 ? 0 : 1 }
  }
  return null
}

function PairsPlay({
  pairs,
  buckets,
  onExit
}: {
  pairs: MinimalPair[]
  buckets: string[]
  onExit: () => void
}) {
  const qc = useQueryClient()
  const player = usePlayer()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [round, setRound] = useState<Round | null>(null)
  const [picked, setPicked] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [total, setTotal] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [stopped, setStopped] = useState(false)
  const loggedRef = useRef(false)

  function playClip(item: MinimalPairItem): void {
    audioRef.current?.pause()
    const url = mediaUrl(item.audioPath)
    if (!url) return
    const audio = new Audio(url)
    audioRef.current = audio
    void audio.play().catch(() => {})
  }

  function next(): void {
    const r = makeRound(pairs)
    setRound(r)
    setPicked(null)
    setAnswered(false)
    if (r) playClip(r.options[r.playedIndex])
  }

  // Courtesy-pause background music ONCE on drill start (never stop(), never
  // touch the queue — resuming is the user's call), then deal the first round.
  useEffect(() => {
    if (player.isPlaying) player.toggle()
    next()
    return () => {
      audioRef.current?.pause()
      audioRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!stopped || loggedRef.current || total === 0) return
    loggedRef.current = true
    void api.quiz
      .logSession({ kind: 'pairs', score: correct, total, bestStreak, settings: { buckets } })
      .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history('pairs') }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stopped])

  function answer(idx: number): void {
    if (answered || !round) return
    const hit = idx === round.playedIndex
    setPicked(idx)
    setAnswered(true)
    setTotal((n) => n + 1)
    if (hit) {
      setCorrect((n) => n + 1)
      const s = streak + 1
      setStreak(s)
      setBestStreak((b) => Math.max(b, s))
    } else {
      setStreak(0)
    }
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent): void {
      const t = e.target as HTMLElement
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t.isContentEditable)
        return
      if (!round) return
      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault()
        playClip(round.options[round.playedIndex])
      } else if (!answered && (e.key === '1' || e.key === '2')) {
        e.preventDefault()
        answer(Number(e.key) - 1)
      } else if (answered && e.key === 'Enter') {
        e.preventDefault()
        next()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, answered, streak])

  if (stopped) {
    const pct = total ? Math.round((correct / total) * 100) : 0
    return (
      <div className="card p-6 text-center">
        <p className="text-3xl font-bold">
          {correct} / {total}
        </p>
        <p className="mt-1 text-sm text-gray-400">
          {total === 0 ? 'Nothing answered.' : `${pct}% heard right · best streak ${bestStreak}`}
        </p>
        <div className="mt-5 flex justify-center gap-2">
          <button className="btn-primary" onClick={onExit}>
            Back to setup
          </button>
        </div>
      </div>
    )
  }
  if (!round) return null

  return (
    <div className="card p-6">
      <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
        <span className="tabular-nums">
          {correct} / {total}
        </span>
        <span>
          streak {streak}
          <button className="btn-ghost ml-3 px-2 py-0.5 text-xs" onClick={() => setStopped(true)}>
            Stop
          </button>
        </span>
      </div>

      <p className="text-center text-xs uppercase tracking-widest text-gray-500">
        Which one did you hear?
      </p>
      <div className="mt-2 text-center">
        <button
          className="btn-ghost"
          onClick={() => playClip(round.options[round.playedIndex])}
        >
          Replay (R)
        </button>
      </div>

      <div className="mx-auto mt-5 grid max-w-md grid-cols-2 gap-2">
        {round.options.map((item, idx) => {
          const isPlayed = answered && idx === round.playedIndex
          const wrongPick = answered && picked === idx && !isPlayed
          return (
            <button
              key={idx}
              disabled={answered}
              onClick={() => answer(idx)}
              className={`rounded-lg border p-4 text-center transition-colors ${
                isPlayed
                  ? 'border-green-500 bg-green-500/15'
                  : wrongPick
                    ? 'border-red-500 bg-red-500/15'
                    : 'border-base-700 bg-base-800 hover:border-accent hover:bg-base-700'
              } ${answered ? 'cursor-default' : ''}`}
            >
              <span className="text-xl">
                <PitchAccent reading={item.pron} position={item.position} />
              </span>
              <kbd className="kbd float-right">{idx + 1}</kbd>
            </button>
          )
        })}
      </div>

      {answered && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            className="btn-ghost text-xs"
            onClick={() => playClip(round.options[round.playedIndex])}
          >
            Hear it again
          </button>
          <button className="btn-primary" onClick={next} autoFocus>
            Next (Enter)
          </button>
        </div>
      )}
    </div>
  )
}
