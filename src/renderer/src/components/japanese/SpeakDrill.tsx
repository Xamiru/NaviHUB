import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import EmptyState from '../EmptyState'
import QuizRecord from '../QuizRecord'
import PitchAccent from './PitchAccent'
import PitchContourChart from './PitchContourChart'
import { Group, Pill } from '../PillGroup'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { usePersistedState } from '../../lib/navState'
import { usePlayer } from '../../lib/player'
import { usePitchRecorder, type Take } from '../../lib/usePitchRecorder'
import { splitMora, toHiragana } from '@shared/kana'
import {
  MAX_TAKE_SECONDS,
  compareToTarget,
  extractContour,
  moraSlices,
  normalizeContour,
  type CompareResult,
  type NormalizedContour
} from '@shared/pitchTrack'
import type { PitchPoolItem } from '@shared/types'

// The Speak tab (kind 'speak'): say the word, get shape feedback — your F0
// contour (local YIN, no cloud, no ASR) overlaid on the Kanjium target.
// HONEST framing baked into the copy: this checks pitch MOVEMENT between
// morae, not whether you said the right sounds; odaka in isolation sounds
// like heiban (the drop lands on the particle); devoiced morae can't be
// graded. Endless, log-on-Stop.

type Source = 'cards' | 'frequency' | 'both'

interface TakeResult {
  contour: NormalizedContour | null
  result: CompareResult | null // best across attested positions
  gradedPosition: number
}

export default function SpeakDrill() {
  const qc = useQueryClient()
  const player = usePlayer()
  const recorder = usePitchRecorder()
  const [source, setSource] = usePersistedState<Source>('jpSpeakSource', 'both')
  const [pool, setPool] = useState<PitchPoolItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const [index, setIndex] = useState(0)
  const [take, setTake] = useState<Take | null>(null)
  const [takeResult, setTakeResult] = useState<TakeResult | null>(null)
  const [nailed, setNailed] = useState(0)
  const [graded, setGraded] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [stopped, setStopped] = useState(false)
  const loggedRef = useRef(false)
  const pausedMusicRef = useRef(false)

  const current = pool?.[index % (pool.length || 1)] ?? null
  const morae = current ? splitMora(toHiragana(current.reading)) : []

  async function start(): Promise<void> {
    setError(null)
    setLoading(true)
    try {
      const items = await api.japanese.pitchQuizPool({ source, limit: 200 })
      if (items.length === 0) {
        setError(
          'No pitch data available — install the Kanjium pack in Settings → Dictionaries (and learn some cards for "My cards").'
        )
        return
      }
      // Courtesy-pause background music once.
      if (player.isPlaying && !pausedMusicRef.current) {
        pausedMusicRef.current = true
        player.toggle()
      }
      setPool(items.sort(() => Math.random() - 0.5))
      setIndex(0)
      setNailed(0)
      setGraded(0)
      setStreak(0)
      setBestStreak(0)
      setStopped(false)
      loggedRef.current = false
      setTake(null)
      setTakeResult(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!stopped || loggedRef.current || graded === 0) return
    loggedRef.current = true
    void api.quiz
      .logSession({
        kind: 'speak',
        score: nailed,
        total: graded,
        bestStreak,
        settings: { source }
      })
      .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history('speak') }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stopped])

  function gradeTake(t: Take): void {
    if (!current) return
    const contour = normalizeContour(extractContour(t.samples, t.sampleRate))
    if (!contour) {
      setTakeResult({ contour: null, result: null, gradedPosition: current.positions[0] })
      return
    }
    const slices = moraSlices(contour, morae.length)
    // Grade against EVERY attested position; report the best (the Patterns
    // quiz accepts any attested variant — so does this).
    let best: CompareResult | null = null
    let bestPos = current.positions[0]
    for (const pos of current.positions) {
      const r = compareToTarget(slices, pos)
      if (!best || r.matchPct > best.matchPct) {
        best = r
        bestPos = pos
      }
    }
    setTakeResult({ contour, result: best, gradedPosition: bestPos })
    if (best && best.graded > 0) {
      setGraded((n) => n + 1)
      const isNailed = best.matched === best.graded && !best.spuriousFall
      if (isNailed) {
        setNailed((n) => n + 1)
        const s = streak + 1
        setStreak(s)
        setBestStreak((b) => Math.max(b, s))
      } else {
        setStreak(0)
      }
    }
  }

  function toggleRecord(): void {
    if (recorder.status === 'recording') {
      const t = recorder.stop()
      if (t) {
        setTake(t)
        gradeTake(t)
      }
    } else {
      setTake(null)
      setTakeResult(null)
      void recorder.start()
    }
  }

  // Auto-stop at the cap.
  useEffect(() => {
    if (recorder.status === 'recording' && recorder.seconds >= MAX_TAKE_SECONDS) {
      toggleRecord()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recorder.seconds, recorder.status])

  function next(): void {
    setIndex((i) => i + 1)
    setTake(null)
    setTakeResult(null)
  }

  // R record/stop, Space replay, Enter next — no inputs exist on this screen.
  useEffect(() => {
    if (!pool || stopped) return
    function onKey(e: KeyboardEvent): void {
      const t = e.target as HTMLElement
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t.isContentEditable)
        return
      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault()
        toggleRecord()
      } else if (e.key === ' ' && take) {
        e.preventDefault()
        recorder.replay(take)
      } else if (e.key === 'Enter' && takeResult) {
        e.preventDefault()
        next()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool, stopped, take, takeResult, recorder.status, index])

  if (recorder.status === 'denied') {
    return (
      <EmptyState
        title="Microphone access was blocked"
        body="Allow microphone access for NaviHUB in your system settings, then come back."
      />
    )
  }
  if (recorder.status === 'no-mic') {
    return (
      <EmptyState
        title="No input device found"
        body="Plug in or enable a microphone — the drill records you saying the word."
      />
    )
  }

  if (!pool) {
    return (
      <div>
        <p className="mb-3 text-sm text-gray-400">
          Say the word; your pitch curve lands on top of the target pattern. Shape check only —
          it compares your pitch movement between morae against the accent, it can&apos;t hear
          whether you said the right sounds.
        </p>
        <div className="card p-5 space-y-5">
          <Group label="Words from">
            <Pill active={source === 'cards'} onClick={() => setSource('cards')} label="My cards" />
            <Pill active={source === 'frequency'} onClick={() => setSource('frequency')} label="Common words" />
            <Pill active={source === 'both'} onClick={() => setSource('both')} label="Both" />
          </Group>
          {error && (
            <p className="text-sm text-red-400">
              {error}{' '}
              <Link to="/settings" className="underline hover:text-accent">
                Open Settings
              </Link>
            </p>
          )}
          <button className="btn-primary w-full" disabled={loading} onClick={() => void start()}>
            {loading ? 'Loading…' : 'Start speaking'}
          </button>
        </div>
        <QuizRecord kind="speak" />
      </div>
    )
  }

  if (stopped) {
    const pct = graded ? Math.round((nailed / graded) * 100) : 0
    return (
      <div className="card p-6 text-center">
        <p className="text-3xl font-bold">
          {nailed} / {graded}
        </p>
        <p className="mt-1 text-sm text-gray-400">
          {graded === 0 ? 'Nothing graded.' : `${pct}% nailed · best streak ${bestStreak}`}
        </p>
        <div className="mt-5 flex justify-center gap-2">
          <button className="btn-primary" onClick={() => setPool(null)}>
            Back to setup
          </button>
        </div>
      </div>
    )
  }
  if (!current) return null

  const result = takeResult?.result ?? null

  return (
    <div className="card p-6">
      <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
        <span className="tabular-nums">
          {nailed} / {graded} nailed
        </span>
        <span>
          streak {streak}
          <button className="btn-ghost ml-3 px-2 py-0.5 text-xs" onClick={() => setStopped(true)}>
            Stop
          </button>
        </span>
      </div>

      <div className="text-center">
        <p className="text-4xl leading-tight">{current.term}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-4 text-lg">
          {current.positions.map((pos) => (
            <PitchAccent key={pos} reading={current.reading} position={pos} />
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          className={recorder.status === 'recording' ? 'btn-primary' : 'btn-ghost'}
          onClick={toggleRecord}
        >
          {recorder.status === 'recording'
            ? `Stop (R) · ${recorder.seconds.toFixed(1)}s`
            : 'Record (R)'}
        </button>
        {take && (
          <button className="btn-ghost" onClick={() => recorder.replay(take)}>
            Replay (Space)
          </button>
        )}
        {takeResult && (
          <button className="btn-primary" onClick={next}>
            Next word (Enter)
          </button>
        )}
      </div>
      {recorder.status === 'recording' && (
        <div className="mx-auto mt-3 h-1.5 w-48 overflow-hidden rounded-full bg-base-700">
          <div
            className="h-full bg-accent transition-all"
            style={{ width: `${Math.round(recorder.level * 100)}%` }}
          />
        </div>
      )}

      {takeResult && (
        <div className="mt-5">
          {takeResult.contour === null ? (
            <p className="text-center text-sm text-amber-300">
              Didn&apos;t catch a voice — get closer to the mic and try again.
            </p>
          ) : (
            <>
              <PitchContourChart
                morae={morae}
                position={takeResult.gradedPosition}
                contour={takeResult.contour}
                result={result}
              />
              {result && (
                <div className="mt-2 text-center text-sm">
                  <p
                    className={
                      result.graded > 0 && result.matched === result.graded && !result.spuriousFall
                        ? 'text-green-400'
                        : 'text-gray-300'
                    }
                  >
                    {result.graded === 0
                      ? 'Too little voiced audio to grade — try a steadier take.'
                      : `${result.matched}/${result.graded} pitch movements matched`}
                    {result.spuriousFall && ' · dropped where the pattern stays level'}
                  </p>
                  {result.odakaNote && (
                    <p className="mt-1 text-xs text-gray-500">
                      This is an odaka word — said alone it sounds like heiban; the drop lands on
                      the following particle.
                    </p>
                  )}
                  {takeResult.gradedPosition === 0 && (
                    <p className="mt-1 text-xs text-gray-500">
                      Heiban: no drop expected — level after the small initial rise.
                    </p>
                  )}
                  {result.moraVerdicts.includes('unclear') && (
                    <p className="mt-1 text-xs text-gray-500">
                      Some morae came out voiceless (devoiced) — those can&apos;t be graded.
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
