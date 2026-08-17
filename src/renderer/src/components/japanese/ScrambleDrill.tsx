import { useEffect, useMemo, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import QuizRecord from '../QuizRecord'
import { Group, Pill } from '../PillGroup'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { usePersistedState } from '../../lib/navState'
import { usePlayer } from '../../lib/player'
import { mediaUrl } from '@shared/mediaUrl'
import { shuffle } from '@shared/shuffle'
import type { ScrambleQuizItem } from '@shared/types'

// Sentence scramble: the bank sentence's bunsetsu-ish chunks arrive shuffled
// in a tray; tap them into order (keys 1-N, Backspace undoes, Enter checks /
// advances). Graded against the ORIGINAL order — Japanese order is flexible,
// and the copy says so: a different order may still be grammatical. Own loop
// (McDrill is single-pick); one quiz_session of kind 'scramble' per round.

export default function ScrambleDrill() {
  const [length, setLength] = usePersistedState<number>('jpScrambleLength', 10)
  const [items, setItems] = useState<ScrambleQuizItem[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function start(): Promise<void> {
    setLoading(true)
    setError(null)
    try {
      const pool = await api.japanese.scramblePool({ limit: Math.max(length, 20) })
      if (pool.length < 3) {
        setError('Not enough sentences came back — is the sentence bank installed?')
        return
      }
      setItems(pool)
    } finally {
      setLoading(false)
    }
  }

  if (items) return <Round items={items} length={length} onExit={() => setItems(null)} />

  return (
    <div className="space-y-4">
      <div className="card p-5 space-y-5">
        <Group label="Length">
          <Pill active={length === 10} onClick={() => setLength(10)} label="10" />
          <Pill active={length === 20} onClick={() => setLength(20)} label="20" />
          <Pill active={length === 0} onClick={() => setLength(0)} label="Endless" />
        </Group>
        <p className="text-xs text-gray-500">
          Rebuild the sentence from its chunks (3-6 per sentence). This checks against the original
          sentence — Japanese word order is flexible, so a different order may still be grammatical.
        </p>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button className="btn-primary w-full" disabled={loading} onClick={() => void start()}>
          {loading ? 'Sampling sentences…' : 'Start'}
        </button>
      </div>
      <QuizRecord kind="scramble" />
    </div>
  )
}

function Round({ items, length, onExit }: { items: ScrambleQuizItem[]; length: number; onExit: () => void }) {
  const qc = useQueryClient()
  const player = usePlayer()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const deckRef = useRef<ScrambleQuizItem[]>(shuffle(items))
  const [current, setCurrent] = useState<ScrambleQuizItem>(() => deckRef.current.shift()!)
  const [tray, setTray] = useState<string[]>([])
  const [placed, setPlaced] = useState<string[]>([])
  const [checked, setChecked] = useState<null | boolean>(null)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [finished, setFinished] = useState(false)
  const loggedRef = useRef(false)

  // Deal: shuffle the chunks so the tray never equals the original order.
  useEffect(() => {
    let t = shuffle(current.chunks)
    for (let i = 0; i < 5 && t.join('') === current.chunks.join(''); i++) t = shuffle(current.chunks)
    setTray(t)
    setPlaced([])
    setChecked(null)
  }, [current])

  useEffect(() => () => audioRef.current?.pause(), [])

  const original = useMemo(() => current.chunks.join(''), [current])

  function pick(i: number): void {
    if (checked !== null) return
    setPlaced((p) => [...p, tray[i]])
    setTray((t) => t.filter((_, idx) => idx !== i))
  }
  function unpick(i: number): void {
    if (checked !== null) return
    setTray((t) => [...t, placed[i]])
    setPlaced((p) => p.filter((_, idx) => idx !== i))
  }
  function undo(): void {
    if (checked !== null || placed.length === 0) return
    unpick(placed.length - 1)
  }
  function check(): void {
    if (checked !== null || placed.length !== current.chunks.length) return
    const ok = placed.join('') === original
    setChecked(ok)
    setScore((s) => s + (ok ? 1 : 0))
    setTotal((t) => t + 1)
    setStreak((s) => {
      const n = ok ? s + 1 : 0
      setBestStreak((b) => Math.max(b, n))
      return n
    })
  }
  function end(): void {
    setFinished(true)
  }
  function advance(): void {
    if (length > 0 && total >= length) {
      end()
      return
    }
    if (deckRef.current.length === 0) deckRef.current = shuffle(items)
    setCurrent(deckRef.current.shift()!)
  }
  function play(): void {
    if (!current.audioPath) return
    if (player.isPlaying) player.toggle()
    audioRef.current?.pause()
    const url = mediaUrl(current.audioPath)
    if (!url) return
    audioRef.current = new Audio(url)
    void audioRef.current.play().catch(() => {})
  }

  useEffect(() => {
    if (!finished || loggedRef.current || total === 0) return
    loggedRef.current = true
    void api.quiz
      .logSession({ kind: 'scramble', score, total, bestStreak, settings: { length } })
      .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history('scramble') }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished])

  useEffect(() => {
    if (finished) return
    function onKey(e: KeyboardEvent): void {
      const t = e.target as HTMLElement
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t.isContentEditable) return
      if (e.key === 'Enter') {
        e.preventDefault()
        if (checked === null) check()
        else advance()
        return
      }
      if (checked !== null) return
      if (e.key === 'Backspace') {
        e.preventDefault()
        undo()
        return
      }
      const n = Number(e.key)
      if (n >= 1 && n <= tray.length) {
        e.preventDefault()
        pick(n - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tray, placed, checked, finished, total])

  if (finished) {
    const acc = total ? Math.round((score / total) * 100) : 0
    return (
      <div className="card p-8 text-center">
        <p className="text-sm uppercase tracking-widest text-gray-500">Round complete</p>
        <p className="mt-3 text-5xl font-bold">
          {score}
          <span className="text-2xl text-gray-500"> / {total}</span>
        </p>
        <div className="mt-4 flex justify-center gap-6 text-sm text-gray-400">
          <span>{acc}% matched the original</span>
          <span>Best streak {bestStreak}</span>
        </div>
        <div className="mt-6 flex justify-center">
          <button className="btn-primary" onClick={onExit}>
            Back to setup
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-sm">
        <span className="font-medium">
          Sentence {checked === null ? total + 1 : total}
          {length > 0 ? ` of ${length}` : ''}
        </span>
        <div className="flex items-center gap-4 text-gray-400">
          <span>
            Score {score}/{total}
          </span>
          <span>Streak {streak}</span>
          <button className="btn-ghost py-1 px-2 text-xs" onClick={end}>
            End round
          </button>
        </div>
      </div>

      <div className="card p-6">
        <p className="text-xs uppercase tracking-widest text-gray-500">Rebuild the sentence</p>
        <p className="mt-1 text-sm text-gray-500">{current.en}</p>
        {/* answer row */}
        <div className="mt-4 flex min-h-[3.5rem] flex-wrap items-center gap-2 rounded-lg border border-base-700 bg-base-900/50 p-3">
          {placed.length === 0 && <span className="text-sm text-gray-600">tap the chunks below in order</span>}
          {placed.map((c, i) => (
            <button
              key={`${c}-${i}`}
              className={`rounded-md border px-3 py-1.5 text-xl ${
                checked === null
                  ? 'border-accent/60 bg-base-800 hover:bg-base-700'
                  : checked
                    ? 'border-green-500/60 bg-green-500/10 text-green-300'
                    : c === current.chunks[i]
                      ? 'border-green-500/60 bg-green-500/10 text-green-300'
                      : 'border-red-500/60 bg-red-500/10 text-red-300'
              }`}
              disabled={checked !== null}
              onClick={() => unpick(i)}
            >
              {c}
            </button>
          ))}
          {placed.length === current.chunks.length && (
            <span className="text-2xl text-gray-500">{current.punct}</span>
          )}
        </div>
        {/* tray */}
        <div className="mt-3 flex flex-wrap gap-2">
          {tray.map((c, i) => (
            <button
              key={`${c}-${i}`}
              className="rounded-md border border-base-700 bg-base-800 px-3 py-1.5 text-xl hover:border-accent hover:bg-base-700"
              disabled={checked !== null}
              onClick={() => pick(i)}
            >
              <kbd className="kbd mr-2">{i + 1}</kbd>
              {c}
            </button>
          ))}
        </div>
      </div>

      {checked !== null && (
        <div className="card mt-4 p-4">
          <p className={`text-xs font-semibold uppercase tracking-wide ${checked ? 'text-green-400' : 'text-red-400'}`}>
            {checked ? 'Matches the original' : 'Not the original order (yours may still be grammatical)'}
          </p>
          <p className="mt-1 text-lg">
            {current.jp}
            {current.audioPath && (
              <button className="btn-ghost ml-2 px-2 py-0.5 text-xs" onClick={play}>
                Play
              </button>
            )}
          </p>
        </div>
      )}

      <div className="mt-4 flex gap-2">
        {checked === null ? (
          <>
            <button className="btn-ghost" onClick={undo} disabled={placed.length === 0}>
              Undo (Backspace)
            </button>
            <span className="flex-1" />
            <button className="btn-primary" onClick={check} disabled={placed.length !== current.chunks.length}>
              Check (Enter)
            </button>
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
    </div>
  )
}
