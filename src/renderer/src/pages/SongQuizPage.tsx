import { useEffect, useRef, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useStatuses } from '../lib/hooks'
import { usePlayer } from '../lib/player'
import { ANIME } from '../lib/mediaConfig'
import CoverImage from '../components/CoverImage'
import QuizRecord from '../components/QuizRecord'
import { Group, Pill } from '../components/PillGroup'
import { ERAS } from '@shared/era'
import type { QuizSong, QuizSongFilter } from '@shared/types'

type Phase = 'setup' | 'play' | 'summary'
type ListSource = 'watched' | 'all'
interface Stats {
  score: number
  total: number
  streak: number
  best: number
}

const TIMER_SECONDS = 20
const AUTONEXT_MS = 3500
const OFFSET_MAX_FRACTION = 0.6 // never start a clip past 60% of the song

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// One song per anime, so distractor options never repeat an anime.
function uniqueByMedia(songs: QuizSong[]): QuizSong[] {
  const seen = new Set<number>()
  const out: QuizSong[] = []
  for (const s of songs) {
    if (!seen.has(s.mediaId)) {
      seen.add(s.mediaId)
      out.push(s)
    }
  }
  return out
}

export default function SongQuizPage() {
  const player = usePlayer()
  const qc = useQueryClient()
  const statuses = useStatuses(ANIME)
  const planStatuses = statuses.filter((s) => /^plan/i.test(s))
  const watchedStatuses = statuses.filter((s) => !planStatuses.includes(s))

  // Setup options (persisted so they survive navigation / a new round).
  const [songType, setSongType] = usePersistedState<'OP' | 'ED' | null>('quizSongType', null)
  const [listSource, setListSource] = usePersistedState<ListSource>('quizList', 'watched')
  // Selected era keys (multi-select); empty = every decade.
  const [eras, setEras] = usePersistedState<string[]>('quizEras', [])
  const [length, setLength] = usePersistedState<number>('quizLength', 10) // 0 = endless
  const [timerEnabled, setTimerEnabled] = usePersistedState('quizTimer', true)
  const [offsetEnabled, setOffsetEnabled] = usePersistedState('quizOffset', true)
  const [autoNext, setAutoNext] = usePersistedState('quizAutoNext', true)

  const [phase, setPhase] = useState<Phase>('setup')
  const [current, setCurrent] = useState<QuizSong | null>(null)
  const [options, setOptions] = useState<QuizSong[]>([])
  const [picked, setPicked] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [stats, setStats] = useState<Stats>({ score: 0, total: 0, streak: 0, best: 0 })
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [newBest, setNewBest] = useState(false)

  const { data: history } = useQuery({
    queryKey: qk.quiz.history('song'),
    queryFn: () => api.quiz.history('song')
  })

  // Refs so timers/timeouts read fresh values without stale closures.
  const poolRef = useRef<QuizSong[]>([])
  const deckRef = useRef<QuizSong[]>([])
  const statsRef = useRef<Stats>({ score: 0, total: 0, streak: 0, best: 0 })
  const currentRef = useRef<QuizSong | null>(null)
  const answeredRef = useRef(false)
  const autoTimerRef = useRef<number | null>(null)
  const offsetDoneRef = useRef<number | null>(null)
  const lengthRef = useRef(0)
  const autoNextRef = useRef(true)
  const loggedRef = useRef(false)

  function clearAuto() {
    if (autoTimerRef.current != null) {
      window.clearTimeout(autoTimerRef.current)
      autoTimerRef.current = null
    }
  }

  // Stop playback + timers when leaving the quiz page.
  useEffect(() => {
    return () => {
      clearAuto()
      player.stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Countdown tick while a question is live.
  useEffect(() => {
    if (phase !== 'play' || !current || answered || !timerEnabled) return
    const id = window.setInterval(() => setTimeLeft((t) => t - 1), 1000)
    return () => window.clearInterval(id)
  }, [phase, current, answered, timerEnabled])

  // Time's up counts as a miss.
  useEffect(() => {
    if (phase === 'play' && timerEnabled && !answered && current && timeLeft <= 0) {
      handleAnswer(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, answered, timerEnabled, phase, current])

  // Keyboard: 1-4 answers, Enter advances (same scheme as the SRS review page).
  useEffect(() => {
    if (phase !== 'play') return
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t.isContentEditable)
        return
      if (!answeredRef.current && e.key >= '1' && e.key <= '4') {
        const opt = options[Number(e.key) - 1]
        if (opt) {
          e.preventDefault()
          handleAnswer(opt.mediaId)
        }
      } else if (answeredRef.current && e.key === 'Enter') {
        e.preventDefault()
        if (lengthRef.current > 0 && statsRef.current.total >= lengthRef.current) endGame()
        else advance()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, options, answered])

  // Once the current song's duration is known, jump to a random start point.
  useEffect(() => {
    if (!offsetEnabled || !current) return
    if (player.track?.id !== `quiz-${current.themeId}`) return
    // A streamed song may report Infinity/NaN duration; skip the offset then
    // rather than seeking to a non-finite time.
    if (!Number.isFinite(player.duration) || player.duration <= 0) return
    if (offsetDoneRef.current === current.themeId) return
    offsetDoneRef.current = current.themeId
    player.seek(Math.random() * player.duration * OFFSET_MAX_FRACTION)
  }, [offsetEnabled, current, player.track?.id, player.duration, player])

  async function playSong(song: QuizSong) {
    offsetDoneRef.current = null
    let src: string | null = null
    if (song.audioPath) src = await api.files.resolveUrl(song.audioPath)
    if (!src) src = song.audioUrl
    // Mask the track so the now-playing bar doesn't spoil the answer.
    if (src) player.play({ id: `quiz-${song.themeId}`, src, title: 'Song Quiz', subtitle: null, context: '???' })
    else player.stop()
  }

  function nextQuestion() {
    clearAuto()
    if (deckRef.current.length === 0) deckRef.current = shuffle(poolRef.current)
    const song = deckRef.current.pop()
    if (!song) {
      endGame()
      return
    }
    const distractors = shuffle(
      uniqueByMedia(poolRef.current).filter((s) => s.mediaId !== song.mediaId)
    ).slice(0, 3)
    currentRef.current = song
    answeredRef.current = false
    setCurrent(song)
    setOptions(shuffle([song, ...distractors]))
    setPicked(null)
    setAnswered(false)
    setTimeLeft(TIMER_SECONDS)
    void playSong(song)
  }

  function handleAnswer(mediaId: number | null) {
    if (answeredRef.current) return
    answeredRef.current = true
    const cur = currentRef.current
    const correct = mediaId != null && cur != null && mediaId === cur.mediaId
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
    setPicked(mediaId)
    setAnswered(true)
    if (autoNextRef.current) autoTimerRef.current = window.setTimeout(() => advance(), AUTONEXT_MS)
  }

  function advance() {
    clearAuto()
    if (lengthRef.current > 0 && statsRef.current.total >= lengthRef.current) endGame()
    else nextQuestion()
  }

  function endGame() {
    clearAuto()
    player.stop()
    const s = statsRef.current
    if (!loggedRef.current && s.total > 0) {
      loggedRef.current = true
      // Decide "new personal best" BEFORE invalidating, or the refetched
      // history would already contain this round and the banner would flip.
      const prev = history?.best
      setNewBest(s.total >= 5 && (!prev || s.score / s.total > prev.score / prev.total))
      void api.quiz
        .logSession({
          kind: 'song',
          score: s.score,
          total: s.total,
          bestStreak: s.best,
          settings: { songType, listSource, length, timerEnabled, offsetEnabled, autoNext }
        })
        .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history('song') }))
        .catch(() => {})
    }
    setPhase('summary')
  }

  async function startGame() {
    setError(null)
    setLoading(true)
    try {
      const statusFilter = listSource === 'all' ? null : watchedStatuses
      const filter: QuizSongFilter = {
        songType,
        statuses: statusFilter,
        eras: eras.length > 0 ? eras : null
      }
      const pool = await api.quiz.songPool(filter)
      const distinct = uniqueByMedia(pool).length
      if (pool.length === 0) {
        setError(
          'No songs match these filters. Import theme songs for your anime (on an anime’s page) or widen the filters.'
        )
        return
      }
      if (distinct < 4) {
        setError(
          `Need at least 4 different anime with songs for 4 options — found ${distinct}. Widen the filters or import more theme songs.`
        )
        return
      }
      poolRef.current = pool
      deckRef.current = shuffle(pool)
      statsRef.current = { score: 0, total: 0, streak: 0, best: 0 }
      setStats(statsRef.current)
      lengthRef.current = length
      autoNextRef.current = autoNext
      loggedRef.current = false
      setNewBest(false)
      setPhase('play')
      nextQuestion()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load songs.')
    } finally {
      setLoading(false)
    }
  }

  if (phase === 'setup') {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <PageHeader
          back={{ to: "/quiz", label: "Quiz" }}
          title="Song Quiz"
          subtitle="Guess the anime from its opening or ending theme."
          className="mb-6"
        />

        <div className="card p-6 space-y-6">
          <Group label="Song type">
            <Pill active={songType === null} onClick={() => setSongType(null)} label="Both" />
            <Pill active={songType === 'OP'} onClick={() => setSongType('OP')} label="Openings" />
            <Pill active={songType === 'ED'} onClick={() => setSongType('ED')} label="Endings" />
          </Group>

          <Group label="From">
            <Pill active={listSource === 'watched'} onClick={() => setListSource('watched')} label="Watched" />
            <Pill active={listSource === 'all'} onClick={() => setListSource('all')} label="All" />
          </Group>

          <Group label="Era">
            {/* Multi-select decades; "Any" clears the set. Unknown-year anime
                are excluded once a specific era is picked. */}
            <Pill active={eras.length === 0} onClick={() => setEras([])} label="Any" />
            {ERAS.map((era) => (
              <Pill
                key={era.key}
                active={eras.includes(era.key)}
                onClick={() =>
                  setEras(
                    eras.includes(era.key)
                      ? eras.filter((k) => k !== era.key)
                      : [...eras, era.key]
                  )
                }
                label={era.label}
              />
            ))}
          </Group>

          <Group label="Length">
            <Pill active={length === 5} onClick={() => setLength(5)} label="5 songs" />
            <Pill active={length === 10} onClick={() => setLength(10)} label="10 songs" />
            <Pill active={length === 0} onClick={() => setLength(0)} label="Endless" />
          </Group>

          <div className="space-y-2 pt-1">
            <Toggle checked={timerEnabled} onChange={setTimerEnabled} label={`Countdown timer (${TIMER_SECONDS}s per song)`} />
            <Toggle checked={offsetEnabled} onChange={setOffsetEnabled} label="Random start point (harder)" />
            <Toggle checked={autoNext} onChange={setAutoNext} label="Autoplay next after answering" />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            className="btn-primary w-full py-3 text-base"
            disabled={loading}
            onClick={startGame}
          >
            {loading ? 'Loading songs…' : 'Start quiz'}
          </button>
        </div>

        <QuizRecord kind="song" />
      </div>
    )
  }

  if (phase === 'summary') {
    const accuracy = stats.total ? Math.round((stats.score / stats.total) * 100) : 0
    return (
      <div className="p-6 max-w-lg mx-auto">
        <div className="card p-10 text-center">
          <p className="text-sm uppercase tracking-widest text-gray-500">Quiz complete</p>
          <p className="mt-3 text-6xl font-bold">
            {stats.score}
            <span className="text-3xl text-gray-500"> / {stats.total}</span>
          </p>
          <div className="mt-4 flex justify-center gap-6 text-base text-gray-400">
            <span>{accuracy}% correct</span>
            <span>Best streak {stats.best}</span>
          </div>
          {newBest && <p className="mt-3 text-sm font-semibold text-accent">New personal best.</p>}
          <div className="mt-6 flex gap-2">
            <button className="btn-primary flex-1" onClick={() => setPhase('setup')}>
              Play again
            </button>
            <Link to="/quiz" className="btn-ghost flex-1 text-center">
              Back to quizzes
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ---- play phase ----
  const qNum = answered ? stats.total : stats.total + 1
  const ourId = current ? `quiz-${current.themeId}` : null
  const isOurs = player.track?.id === ourId
  const playing = isOurs && player.isPlaying
  const isLast = lengthRef.current > 0 && stats.total >= lengthRef.current
  const timePct = Math.max(0, Math.min(100, (timeLeft / TIMER_SECONDS) * 100))

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-4 flex items-center justify-between text-base">
        <span className="font-medium">
          Question {qNum}
          {lengthRef.current > 0 ? ` of ${lengthRef.current}` : ''}
        </span>
        <div className="flex items-center gap-4 text-gray-400">
          <span>
            Score {stats.score}/{stats.total}
          </span>
          <span>Streak {stats.streak}</span>
          <button className="btn-ghost py-1 px-2 text-sm" onClick={endGame}>
            End quiz
          </button>
        </div>
      </div>

      {timerEnabled && !answered && (
        <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-base-700">
          <div
            className={`h-full transition-[width] duration-1000 ease-linear ${
              timeLeft <= 5 ? 'bg-red-500' : 'bg-accent'
            }`}
            style={{ width: `${timePct}%` }}
          />
        </div>
      )}

      <div className="card p-8 text-center">
        <p className="mt-3 text-2xl font-semibold">Which anime is this theme from?</p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            className="btn-ghost px-5 py-2.5 text-base"
            onClick={() => (isOurs ? player.toggle() : current && void playSong(current))}
          >
            {playing ? 'Pause' : 'Play'}
          </button>
          <button
            className="btn-ghost px-5 py-2.5 text-base"
            disabled={!isOurs}
            onClick={() => player.seek(0)}
          >
            Replay
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((o, i) => {
          const correct = answered && o.mediaId === current?.mediaId
          const wrongPick = answered && picked === o.mediaId && !correct
          return (
            <button
              key={o.mediaId}
              disabled={answered}
              onClick={() => handleAnswer(o.mediaId)}
              className={`flex items-center gap-4 rounded-xl border p-3 text-left transition-colors ${
                correct
                  ? 'border-green-500 bg-green-500/15'
                  : wrongPick
                    ? 'border-red-500 bg-red-500/15'
                    : 'border-base-700 bg-base-800 hover:border-accent hover:bg-base-700'
              } ${answered ? 'cursor-default' : ''}`}
            >
              <CoverImage path={o.coverPath} alt={o.animeTitle} className="h-24 w-16 shrink-0" />
              <span className="line-clamp-2 text-base font-medium">{o.animeTitle}</span>
              <kbd className="kbd ml-auto shrink-0">
                {i + 1}
              </kbd>
            </button>
          )
        })}
      </div>

      {answered && current && (
        <div className="card mt-5 flex items-center gap-5 p-5">
          <CoverImage path={current.coverPath} alt={current.animeTitle} className="h-36 w-24 shrink-0" />
          <div className="min-w-0">
            <p
              className={`text-sm font-semibold uppercase tracking-wide ${
                picked === current.mediaId ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {picked === current.mediaId ? 'Correct' : picked === null ? 'Time / skipped' : 'Incorrect'}
            </p>
            <p className="truncate text-2xl font-semibold">{current.animeTitle}</p>
            <p className="text-base text-gray-400">
              {[current.slug, current.title].filter(Boolean).join(' · ') || 'Theme song'}
            </p>
            {current.artists.length > 0 && (
              <p className="mt-0.5 truncate text-sm text-gray-500">{current.artists.join(', ')}</p>
            )}
          </div>
        </div>
      )}

      <div className="mt-5 flex gap-2">
        {!answered && (
          <button className="btn-ghost px-5 py-2.5 text-base" onClick={() => handleAnswer(null)}>
            Reveal answer
          </button>
        )}
        {answered &&
          (isLast ? (
            <button className="btn-primary px-5 py-2.5 text-base" onClick={endGame}>
              See results (Enter)
            </button>
          ) : (
            <button className="btn-primary px-5 py-2.5 text-base" onClick={advance}>
              Next (Enter)
            </button>
          ))}
      </div>
    </div>
  )
}

function Toggle({
  checked,
  onChange,
  label
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-base text-gray-300">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  )
}
