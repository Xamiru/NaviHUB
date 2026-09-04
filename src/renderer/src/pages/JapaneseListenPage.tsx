import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import QuizRecord from '../components/QuizRecord'
import Tabs, { TabPanel } from '../components/Tabs'
import { Group, Pill } from '../components/PillGroup'
import JpKeyboardInput from '../components/japanese/keyboard/JpKeyboardInput'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { usePlayerControls } from '../lib/player'
import { mediaUrl } from '@shared/mediaUrl'
import { diffChars, normalizeDictation, readingsKey } from '@shared/dictation'
import { shuffle } from '@shared/shuffle'
import { usePitchRecorder, type Take } from '../lib/usePitchRecorder'
import TutorSessionContinue from '../components/TutorSessionContinue'
import type { AudioSentence, JpListeningItem } from '@shared/types'

type ListeningTab = 'guided' | 'dictation'

export default function JapaneseListenPage() {
  const [tab, setTab] = usePersistedState<ListeningTab>('jpListeningTab', 'guided')
  const { data: bank, isLoading } = useQuery({
    queryKey: qk.dict.sentenceAudioBank,
    queryFn: () => api.dict.sentenceAudioBank()
  })

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <PageHeader
        back={{ to: '/japanese', label: 'Japanese' }}
        title="Listening"
        subtitle="Train comprehension first, then compare your own shadowing with a native recording."
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
      ) : (
        <>
          <Tabs
            id="japanese-listening"
            label="Listening activity"
            tabs={[
              { key: 'guided', label: 'Guided listening' },
              { key: 'dictation', label: 'Dictation' }
            ]}
            value={tab}
            onChange={setTab}
            className="mb-5"
          />
          <TabPanel tabsId="japanese-listening" value={tab}>
            {tab === 'guided' ? <GuidedListening /> : <DictationSetup />}
          </TabPanel>
        </>
      )}
    </div>
  )
}

function GuidedListening() {
  const [mode, setMode] = usePersistedState<'known' | 'one'>('jpListeningMode', 'known')
  const [includeLearning, setIncludeLearning] = usePersistedState<boolean>(
    'jpListeningIncludeLearning',
    false
  )
  const [length, setLength] = usePersistedState<number>('jpListeningLength', 5)
  const [items, setItems] = useState<JpListeningItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function start(): Promise<void> {
    setError(null)
    setLoading(true)
    try {
      const sample = await api.japanese.listeningPool({
        mode,
        includeLearning,
        limit: length,
        maxChars: 45
      })
      if (sample.length === 0) {
        setError(
          mode === 'known'
            ? 'No all-known recordings matched yet. Include learning cards or try one-new-word mode.'
            : 'No one-new-word recordings matched yet. Build your known-word base or try all-known mode.'
        )
        return
      }
      setItems(sample)
    } finally {
      setLoading(false)
    }
  }

  if (items) return <GuidedRound items={items} mode={mode} onExit={() => setItems(null)} />

  return (
    <div>
      <div className="card p-5 space-y-5">
        <Group label="Difficulty">
          <Pill active={mode === 'known'} onClick={() => setMode('known')} label="All known" />
          <Pill active={mode === 'one'} onClick={() => setMode('one')} label="One new word" />
        </Group>
        <label className="flex cursor-pointer items-start gap-2.5">
          <input
            aria-label="Count learning cards as known"
            type="checkbox"
            className="mt-0.5"
            checked={includeLearning}
            onChange={(e) => setIncludeLearning(e.target.checked)}
          />
          <span className="text-sm">
            Count learning cards as known
            <span className="block text-xs text-gray-500">
              Off is stricter: only graduated review cards count.
            </span>
          </span>
        </label>
        <Group label="Sentences">
          <Pill active={length === 5} onClick={() => setLength(5)} label="5" />
          <Pill active={length === 10} onClick={() => setLength(10)} label="10" />
        </Group>
        <p className="text-sm text-gray-400">
          Hear the sentence before seeing it, choose its meaning, then reveal the transcript and
          shadow it. Pronunciation is self-compared; the app does not pretend to grade your accent.
        </p>
        {error && <p className="text-sm text-signal-anomaly">{error}</p>}
        <button className="btn-primary w-full" disabled={loading} onClick={() => void start()}>
          {loading ? 'Matching recordings…' : 'Start guided listening'}
        </button>
      </div>
      <QuizRecord kind="listening" />
    </div>
  )
}

function GuidedRound({
  items,
  mode,
  onExit
}: {
  items: JpListeningItem[]
  mode: 'known' | 'one'
  onExit: () => void
}) {
  const qc = useQueryClient()
  const player = usePlayerControls()
  const recorder = usePitchRecorder()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [index, setIndex] = useState(0)
  const [options, setOptions] = useState<string[]>([])
  const [picked, setPicked] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [take, setTake] = useState<Take | null>(null)
  const [shadowed, setShadowed] = useState<Set<number>>(() => new Set())
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

  function choicesFor(item: JpListeningItem): string[] {
    const wrong = shuffle([...new Set(items.map((x) => x.en).filter((x) => x !== item.en))]).slice(
      0,
      3
    )
    return shuffle([item.en, ...wrong])
  }

  useEffect(() => {
    if (player.isPlaying) player.toggle()
    return () => {
      audioRef.current?.pause()
      audioRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!current) return
    setOptions(choicesFor(current))
    playClip()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  useEffect(() => {
    if (recorder.status !== 'recording') return
    const timer = window.setTimeout(() => {
      const nextTake = recorder.stop()
      setTake(nextTake)
      if (nextTake) setShadowed((prev) => new Set(prev).add(index))
    }, 12000)
    return () => window.clearTimeout(timer)
  }, [recorder.status, recorder.stop, index])

  useEffect(() => {
    if (!finished || loggedRef.current) return
    loggedRef.current = true
    void api.quiz
      .logSession({
        kind: 'listening',
        score,
        total: items.length,
        bestStreak: 0,
        settings: { mode, length: items.length, shadowed: shadowed.size }
      })
      .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history('listening') }))
  }, [finished, items.length, mode, qc, score, shadowed.size])

  function choose(i: number): void {
    if (!current || revealed) return
    setPicked(i)
    if (options[i] === current.en) setScore((n) => n + 1)
    setRevealed(true)
  }

  function reveal(): void {
    if (revealed) return
    setPicked(-1)
    setRevealed(true)
  }

  function advance(): void {
    if (recorder.status === 'recording') {
      const nextTake = recorder.stop()
      if (nextTake) setShadowed((prev) => new Set(prev).add(index))
    }
    if (index + 1 >= items.length) {
      setFinished(true)
      return
    }
    setIndex((i) => i + 1)
    setPicked(null)
    setRevealed(false)
    setTake(null)
  }

  function stopRecording(): void {
    const nextTake = recorder.stop()
    setTake(nextTake)
    if (nextTake) setShadowed((prev) => new Set(prev).add(index))
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent): void {
      const target = e.target as HTMLElement
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return
      const n = Number(e.key)
      if (!revealed && n >= 1 && n <= options.length) {
        e.preventDefault()
        choose(n - 1)
      } else if (revealed && e.key === 'Enter') {
        e.preventDefault()
        advance()
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault()
        playClip()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed, options, index, recorder.status])

  if (finished) {
    return (
      <div className="card p-8 text-center">
        <p className="text-sm uppercase tracking-widest text-gray-500">Listening complete</p>
        <p className="mt-3 text-5xl font-bold">
          {score}
          <span className="text-2xl text-gray-500"> / {items.length}</span>
        </p>
        <p className="mt-2 text-sm text-gray-400">Shadowed {shadowed.size} sentences</p>
        <div className="mt-6 flex gap-2">
          <button className="btn-primary flex-1" onClick={onExit}>
            Again
          </button>
          <TutorSessionContinue fallbackTo="/japanese" fallbackLabel="Back" className="btn-ghost flex-1 text-center" />
        </div>
      </div>
    )
  }
  if (!current) return null

  const surface = current.unknownSurface
  const at = surface ? current.jp.indexOf(surface) : -1

  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-sm">
        <span className="font-medium">
          Sentence {index + 1} of {items.length}
        </span>
        <div className="flex items-center gap-4 text-gray-400">
          <span>Score {score}/{index + (revealed ? 1 : 0)}</span>
          <button className="btn-ghost px-2 py-1 text-xs" onClick={() => setFinished(true)}>
            End
          </button>
        </div>
      </div>

      <div className="card p-6 text-center">
        <p className="mb-3 text-sm text-gray-400">Listen before reading</p>
        <button className="btn-ghost" onClick={playClip}>Replay (R)</button>
      </div>

      {!revealed ? (
        <div className="mt-4 space-y-2">
          {options.map((option, i) => (
            <button
              key={option}
              className="card block w-full p-3 text-left hover:border-accent"
              onClick={() => choose(i)}
            >
              <span className="mr-2 text-xs text-gray-500">{i + 1}</span>
              {option}
            </button>
          ))}
          <button className="btn-ghost mt-2" onClick={reveal}>Reveal transcript</button>
        </div>
      ) : (
        <div className="card mt-4 p-5">
          <p className={`text-xs font-semibold uppercase tracking-wide ${picked !== -1 && options[picked ?? -1] === current.en ? 'text-signal-affirmative' : 'text-signal-caution'}`}>
            {picked !== -1 && options[picked ?? -1] === current.en ? 'Meaning understood' : 'Study the transcript'}
          </p>
          <p className="mt-2 text-xl leading-relaxed">
            {at >= 0 && surface ? (
              <>
                {current.jp.slice(0, at)}
                <span className="rounded bg-signal-caution/20 px-0.5 text-signal-caution">{surface}</span>
                {current.jp.slice(at + surface.length)}
              </>
            ) : current.jp}
          </p>
          <p className="mt-1 text-sm text-gray-400">{current.en}</p>
          {current.unknownWord && (
            <p className="mt-2 text-xs text-signal-caution">New word: {current.unknownWord}</p>
          )}
          {current.attribution && (
            <p className="mt-2 text-xs text-gray-500">Recording: {current.attribution}</p>
          )}

          <div className="mt-5 border-t border-base-700 pt-4">
            <p className="text-sm font-medium">Shadow once, then compare</p>
            <p className="mt-1 text-xs text-gray-500">
              Replay the native sentence, imitate its timing and melody, then replay your take.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="btn-ghost" onClick={playClip}>Native</button>
              {recorder.status === 'recording' ? (
                <button className="btn-primary" onClick={stopRecording}>
                  Stop ({recorder.seconds.toFixed(1)}s)
                </button>
              ) : (
                <button className="btn-ghost" onClick={() => void recorder.start()}>Record</button>
              )}
              {take && <button className="btn-ghost" onClick={() => recorder.replay(take)}>My take</button>}
            </div>
            {(recorder.status === 'denied' || recorder.status === 'no-mic' || recorder.status === 'error') && (
              <p className="mt-2 text-xs text-signal-caution">
                Microphone unavailable. Shadow aloud without recording; it is optional.
              </p>
            )}
          </div>
          <button className="btn-primary mt-5" onClick={advance}>
            {index + 1 >= items.length ? 'Finish (Enter)' : 'Next (Enter)'}
          </button>
        </div>
      )}
    </div>
  )
}

// Dictation (kind 'dictation'): a native Tatoeba recording plays, type what
// you heard. Correctness compares kuromoji readings, so kanji and kana forms
// both count; the reveal shows a per-character diff against the transcript.
function DictationSetup() {
  const [length, setLength] = usePersistedState<number>('jpDictationLength', 5)
  const [items, setItems] = useState<AudioSentence[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

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

  return items ? (
        <DictationRound items={items} onExit={() => setItems(null)} />
      ) : (
        <div>
          <div className="card p-5 space-y-5">
            <Group label="Sentences">
              <Pill active={length === 5} onClick={() => setLength(5)} label="5" />
              <Pill active={length === 10} onClick={() => setLength(10)} label="10" />
            </Group>
            {error && <p className="text-sm text-signal-anomaly">{error}</p>}
            <button className="btn-primary w-full" disabled={loading} onClick={() => void start()}>
              {loading ? 'Loading…' : 'Start'}
            </button>
          </div>
          <QuizRecord kind="dictation" />
        </div>
      )
}

function DictationRound({ items, onExit }: { items: AudioSentence[]; onExit: () => void }) {
  const qc = useQueryClient()
  const player = usePlayerControls()
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
          <TutorSessionContinue fallbackTo="/japanese" fallbackLabel="Back" className="btn-ghost flex-1 text-center" />
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
          <JpKeyboardInput
            ariaLabel="Dictation answer"
            inputRef={inputRef}
            className="w-full text-center text-lg"
            placeholder="type what you heard…"
            value={input}
            autoFocus
            onChange={setInput}
            onEnter={() => void submit()}
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
              wasCorrect ? 'text-signal-affirmative' : 'text-signal-anomaly'
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
                        ? 'bg-signal-affirmative/20 text-signal-affirmative'
                        : 'bg-signal-anomaly/20 text-signal-anomaly line-through'
                  }
                >
                  {c.ch}
                </span>
              ))}
            </p>
          )}
          {current.attribution && (
            <p className="mt-2 text-xs text-gray-500">Recording: {current.attribution}</p>
          )}
          <button className="btn-primary mt-4" onClick={advance} autoFocus>
            {index + 1 >= items.length ? 'Finish (Enter)' : 'Next (Enter)'}
          </button>
        </div>
      )}
    </div>
  )
}
