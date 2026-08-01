import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import QuizRecord from '../components/QuizRecord'
import { Group, Pill } from '../components/PillGroup'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { usePlayer } from '../lib/player'
import { mediaUrl } from '@shared/mediaUrl'
import { diffChars, normalizeDictation, readingsKey } from '@shared/dictation'
import type { AudioSentence } from '@shared/types'

// Dictation (kind 'dictation'): a native Tatoeba recording plays, type what
// you heard. Correctness compares kuromoji READINGS, so kanji and kana forms
// both count; the reveal shows a per-character diff against the transcript.
// Framed as listening practice — the diff matters more than the score.

export default function JapaneseListenPage() {
  const [length, setLength] = usePersistedState<number>('jpDictationLength', 5)
  const [items, setItems] = useState<AudioSentence[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const { data: bank, isLoading } = useQuery({
    queryKey: qk.dict.sentenceAudioBank,
    queryFn: () => api.dict.sentenceAudioBank()
  })

  async function start(): Promise<void> {
    setError(null)
    setLoading(true)
    try {
      const sample = await api.dict.audioSample({ limit: length, maxChars: 40 })
      if (sample.length === 0) {
        setError('No recorded sentences available — is the sentence bank still installed?')
        return
      }
      setItems(sample)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <PageHeader
        back={{ to: '/japanese', label: 'Japanese' }}
        title="Dictation"
        subtitle="Listen to a real sentence, type what you heard."
      />

      {!isLoading && !bank ? (
        <EmptyState
          title="Sentence audio not installed"
          body="Download the Tatoeba sentence audio in Settings → Dictionaries (needs the example-sentence bank)."
          action={
            <Link to="/settings" className="btn-primary">
              Open Settings
            </Link>
          }
        />
      ) : items ? (
        <DictationRound items={items} onExit={() => setItems(null)} />
      ) : (
        <div>
          <div className="card p-5 space-y-5">
            <Group label="Sentences">
              <Pill active={length === 5} onClick={() => setLength(5)} label="5" />
              <Pill active={length === 10} onClick={() => setLength(10)} label="10" />
            </Group>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button className="btn-primary w-full" disabled={loading} onClick={() => void start()}>
              {loading ? 'Loading…' : 'Start'}
            </button>
          </div>
          <QuizRecord kind="dictation" />
        </div>
      )}
    </div>
  )
}

function DictationRound({ items, onExit }: { items: AudioSentence[]; onExit: () => void }) {
  const qc = useQueryClient()
  const player = usePlayer()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState('')
  const [answered, setAnswered] = useState(false)
  const [wasCorrect, setWasCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [checking, setChecking] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const loggedRef = useRef(false)

  const current = items[index] ?? null

  function playClip(): void {
    if (!current) return
    audioRef.current?.pause()
    const url = mediaUrl(current.audioPath)
    if (!url) return
    const audio = new Audio(url)
    audioRef.current = audio
    void audio.play().catch(() => {})
  }

  // Courtesy-pause background music once, play the first clip, clean up on exit.
  useEffect(() => {
    if (player.isPlaying) player.toggle()
    playClip()
    return () => {
      audioRef.current?.pause()
      audioRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Auto-play on advance.
  useEffect(() => {
    if (index > 0) {
      playClip()
      inputRef.current?.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  useEffect(() => {
    if (!finished || loggedRef.current || items.length === 0) return
    loggedRef.current = true
    void api.quiz
      .logSession({
        kind: 'dictation',
        score,
        total: items.length,
        bestStreak: 0,
        settings: { length: items.length }
      })
      .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history('dictation') }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished])

  // R replays only after answering — before that, the text input owns the
  // keyboard (the global handler's target guard makes R impossible pre-answer,
  // an accepted compromise; the Replay button always works).
  useEffect(() => {
    function onKey(e: KeyboardEvent): void {
      const t = e.target as HTMLElement
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t.isContentEditable)
        return
      if (answered && (e.key === 'r' || e.key === 'R')) {
        e.preventDefault()
        playClip()
      } else if (answered && e.key === 'Enter') {
        e.preventDefault()
        advance()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answered, index])

  async function submit(): Promise<void> {
    if (!current || answered || checking) return
    const typed = input.trim()
    if (!typed) return
    setChecking(true)
    try {
      // Reading comparison via kuromoji: 食べた and たべた both count. When the
      // tokenizer is unavailable ([]), fall back to normalized text equality.
      const [userTokens, transcriptTokens] = await Promise.all([
        api.japanese.tokenize(typed),
        api.japanese.tokenize(current.jp)
      ])
      const correct =
        userTokens.length > 0 && transcriptTokens.length > 0
          ? readingsKey(userTokens) === readingsKey(transcriptTokens)
          : normalizeDictation(typed) === normalizeDictation(current.jp)
      setWasCorrect(correct)
      if (correct) setScore((n) => n + 1)
      setAnswered(true)
    } finally {
      setChecking(false)
    }
  }

  function advance(): void {
    if (index + 1 >= items.length) {
      setFinished(true)
      return
    }
    setIndex((i) => i + 1)
    setInput('')
    setAnswered(false)
    setShowHint(false)
  }

  if (finished) {
    return (
      <div className="card p-8 text-center">
        <p className="text-sm uppercase tracking-widest text-gray-500">Dictation complete</p>
        <p className="mt-3 text-5xl font-bold">
          {score}
          <span className="text-2xl text-gray-500"> / {items.length}</span>
        </p>
        <div className="mt-6 flex gap-2">
          <button className="btn-primary flex-1" onClick={onExit}>
            Again
          </button>
          <Link to="/japanese" className="btn-ghost flex-1 text-center">
            Back
          </Link>
        </div>
      </div>
    )
  }
  if (!current) return null

  const diff = answered ? diffChars(normalizeDictation(input), normalizeDictation(current.jp)) : []

  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-sm">
        <span className="font-medium">
          Sentence {index + 1} of {items.length}
        </span>
        <div className="flex items-center gap-4 text-gray-400">
          <span>
            Score {score}/{index + (answered ? 1 : 0)}
          </span>
          <button className="btn-ghost py-1 px-2 text-xs" onClick={() => setFinished(true)}>
            End
          </button>
        </div>
      </div>

      <div className="card p-6 text-center">
        <button className="btn-ghost" onClick={playClip}>
          {answered ? 'Replay (R)' : 'Replay'}
        </button>
        {!answered && (
          <div className="mt-2">
            {showHint ? (
              <p className="text-sm text-gray-400">{current.en}</p>
            ) : (
              <button
                className="text-xs text-gray-500 hover:text-gray-300"
                onClick={() => setShowHint(true)}
              >
                Show translation hint
              </button>
            )}
          </div>
        )}
      </div>

      {!answered ? (
        <div className="mt-4">
          <input
            ref={inputRef}
            className="input w-full text-center text-lg"
            placeholder="type what you heard…"
            value={input}
            autoFocus
            autoComplete="off"
            spellCheck={false}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') void submit()
            }}
          />
          <div className="mt-3 flex justify-center">
            <button
              className="btn-primary"
              disabled={!input.trim() || checking}
              onClick={() => void submit()}
            >
              {checking ? 'Checking…' : 'Check (Enter)'}
            </button>
          </div>
        </div>
      ) : (
        <div className="card mt-4 p-4">
          <p
            className={`text-xs font-semibold uppercase tracking-wide ${
              wasCorrect ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {wasCorrect ? 'Heard it right' : 'Not quite'}
          </p>
          <p className="mt-2 text-lg">{current.jp}</p>
          <p className="text-sm text-gray-400">{current.en}</p>
          {!wasCorrect && diff.length > 0 && (
            <p className="mt-2 text-lg leading-relaxed">
              {diff.map((c, i) => (
                <span
                  key={i}
                  className={
                    c.state === 'same'
                      ? 'text-gray-300'
                      : c.state === 'add'
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-red-500/20 text-red-300 line-through'
                  }
                >
                  {c.ch}
                </span>
              ))}
            </p>
          )}
          {current.attribution && (
            <p className="mt-2 text-xs text-gray-600">Recording: {current.attribution}</p>
          )}
          <button className="btn-primary mt-4" onClick={advance} autoFocus>
            {index + 1 >= items.length ? 'Finish (Enter)' : 'Next (Enter)'}
          </button>
        </div>
      )}
    </div>
  )
}
