import { useEffect, useRef, useState } from 'react'
import PageHeader from '../components/PageHeader'
import StudySessionFrame from '../components/StudySessionFrame'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useStatuses } from '../lib/hooks'
import { usePlayer } from '../lib/player'
import { ANIME, statusesExceptPlanned } from '../lib/mediaConfig'
import CoverImage from '../components/CoverImage'
import QuizRecord from '../components/QuizRecord'
import { Group, Pill } from '../components/PillGroup'
import { ERAS } from '@shared/era'
import type { QuizKind, QuizSong, QuizSongFilter } from '@shared/types'
import { shuffle } from '@shared/shuffle'
import { pickDistractors } from '@shared/quizDistractors'

type Phase = 'setup' | 'play' | 'summary'
type ListSource = 'watched' | 'all'
type Mode = 'classic' | 'arcade' | 'reverse'

interface Stats {
  score: number // correct count — or speed points in arcade mode
  correct: number // raw correct answers (equals score outside arcade)
  total: number
  streak: number
  best: number
}

const TIMER_SECONDS = 20
const AUTONEXT_MS = 3500
const OFFSET_MAX_FRACTION = 0.6 // never start a clip past 60% of the song
const ARCADE_LIVES = 3
const SNIPPET_CHOICES = [0, 10, 15, 20] // seconds; 0 = play the full clip

const EMPTY_STATS: Stats = { score: 0, correct: 0, total: 0, streak: 0, best: 0 }

// Each mode writes its own quiz_session kind so personal bests stay meaningful:
// accuracy for classic/reverse, speed points for arcade (SCORE_RANKED_KINDS).
function kindForMode(mode: Mode): QuizKind {
  if (mode === 'arcade') return 'songArcade'
  if (mode === 'reverse') return 'songReverse'
  return 'song'
}

// One song per anime, so the "need 4 different anime" validation has a shape.
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
  const watchedStatuses = statusesExceptPlanned(statuses)

  // Setup options (persisted so they survive navigation / a new round).
  const [mode, setMode] = usePersistedState<Mode>('quizMode', 'classic')
  const [songType, setSongType] = usePersistedState<'OP' | 'ED' | null>('quizSongType', null)
  const [listSource, setListSource] = usePersistedState<ListSource>('quizList', 'watched')
  // Selected era keys (multi-select); empty = every decade.
  const [eras, setEras] = usePersistedState<string[]>('quizEras', [])
  const [length, setLength] = usePersistedState<number>('quizLength', 10) // 0 = endless
  const [timerEnabled, setTimerEnabled] = usePersistedState('quizTimer', true)
  const [offsetEnabled, setOffsetEnabled] = usePersistedState('quizOffset', true)
  const [snippet, setSnippet] = usePersistedState('quizSnippet', 0) // 0 = full clip
  const [autoNext, setAutoNext] = usePersistedState('quizAutoNext', true)

  const [phase, setPhase] = useState<Phase>('setup')
  const [current, setCurrent] = useState<QuizSong | null>(null)
  const [options, setOptions] = useState<QuizSong[]>([])
  const [picked, setPicked] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [stats, setStats] = useState<Stats>(EMPTY_STATS)
  const [lives, setLives] = useState(ARCADE_LIVES)
  const [auditioned, setAuditioned] = useState<number | null>(null) // reverse: option index playing
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [newBest, setNewBest] = useState(false)

  const roundKind = kindForMode(mode)
  const { data: history } = useQuery({
    queryKey: qk.quiz.history(roundKind),
    queryFn: () => api.quiz.history(roundKind)
  })

  // Refs so timers/timeouts read fresh values without stale closures.
  const poolRef = useRef<QuizSong[]>([])
  const deckRef = useRef<QuizSong[]>([])
  const statsRef = useRef<Stats>(EMPTY_STATS)
  const currentRef = useRef<QuizSong | null>(null)
  const answeredRef = useRef(false)
  const autoTimerRef = useRef<number | null>(null)
  const offsetDoneRef = useRef<number | null>(null)
  const lengthRef = useRef(0)
  const autoNextRef = useRef(true)
  const modeRef = useRef<Mode>('classic')
  const snippetRef = useRef(0)
  const livesRef = useRef(ARCADE_LIVES)
  const timeLeftRef = useRef(TIMER_SECONDS)
  const auditionedRef = useRef<number | null>(null)
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

  // Countdown tick while a question is live. Arcade always runs the clock.
  const timed = mode === 'arcade' || timerEnabled
  useEffect(() => {
    if (phase !== 'play' || !current || answered || !timed) return
    const id = window.setInterval(() => {
      timeLeftRef.current = Math.max(0, timeLeftRef.current - 1)
      setTimeLeft(timeLeftRef.current)
    }, 1000)
    return () => window.clearInterval(id)
  }, [phase, current, answered, timed])

  // Time's up counts as a miss.
  useEffect(() => {
    if (phase === 'play' && timed && !answered && current && timeLeft <= 0) {
      handleAnswer(null, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, answered, timed, phase, current])

  // Snippet mode: pause the clip N seconds into every play (replaying re-arms,
  // so the cap is per-play rather than per-question). The timer keeps running.
  useEffect(() => {
    if (phase !== 'play' || !current || answered || snippetRef.current === 0) return
    if (!player.isPlaying || player.track?.id !== `quiz-${current.themeId}`) return
    const id = window.setTimeout(() => player.toggle(), snippetRef.current * 1000)
    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, current, answered, player.isPlaying, player.track?.id])

  // Keyboard. Classic/arcade: 1-4 answers, Enter advances. Reverse: 1-4
  // auditions a clip and Enter locks the auditioned one in as the answer.
  useEffect(() => {
    if (phase !== 'play') return
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t.isContentEditable)
        return
      if (!answeredRef.current && e.key >= '1' && e.key <= '4') {
        e.preventDefault()
        const idx = Number(e.key) - 1
        const opt = options[idx]
        if (!opt) return
        if (modeRef.current === 'reverse') {
          auditionAt(idx)
        } else {
          handleAnswer(opt.mediaId, opt.mediaId === currentRef.current?.mediaId)
        }
      } else if (!answeredRef.current && e.key === 'Enter' && modeRef.current === 'reverse') {
        e.preventDefault()
        const idx = auditionedRef.current
        const opt = idx != null ? options[idx] : null
        if (opt) handleAnswer(opt.themeId, opt.themeId === currentRef.current?.themeId)
      } else if (answeredRef.current && e.key === 'Enter') {
        e.preventDefault()
        advance()
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

  // Reverse mode: hear a candidate clip without answering yet.
  function auditionAt(idx: number) {
    const opt = options[idx]
    if (!opt) return
    auditionedRef.current = idx
    setAuditioned(idx)
    void playSong(opt)
  }

  function nextQuestion() {
    clearAuto()
    auditionedRef.current = null
    setAuditioned(null)
    if (deckRef.current.length === 0) deckRef.current = shuffle(poolRef.current)
    const song = deckRef.current.pop()
    if (!song) {
      endGame()
      return
    }
    // Distractors share the answer's era/genres when the library allows, and
    // never another song of the SAME anime (pickDistractors dedupes by media).
    const distractors = pickDistractors(poolRef.current, song, 3)
    currentRef.current = song
    answeredRef.current = false
    setCurrent(song)
    setOptions(shuffle([song, ...distractors]))
    setPicked(null)
    setAnswered(false)
    timeLeftRef.current = TIMER_SECONDS
    setTimeLeft(TIMER_SECONDS)
    void playSong(song)
  }

  function handleAnswer(key: number | null, correct: boolean) {
    if (answeredRef.current) return
    answeredRef.current = true
    const s = statsRef.current
    const streak = correct ? s.streak + 1 : 0
    let score = s.score
    let correctCount = s.correct
    let livesLeft = livesRef.current
    if (modeRef.current === 'arcade') {
      if (correct) {
        // Speed points: base 100 + 10 per second left on the clock (max 300).
        score += 100 + 10 * timeLeftRef.current
        correctCount += 1
      } else {
        livesLeft -= 1
      }
    } else if (correct) {
      score += 1
      correctCount += 1
    }
    livesRef.current = livesLeft
    const next: Stats = {
      score,
      correct: correctCount,
      total: s.total + 1,
      streak,
      best: Math.max(s.best, streak)
    }
    statsRef.current = next
    setStats(next)
    setLives(livesLeft)
    setPicked(key)
    setAnswered(true)
    if (autoNextRef.current) autoTimerRef.current = window.setTimeout(() => advance(), AUTONEXT_MS)
  }

  function advance() {
    clearAuto()
    if (modeRef.current === 'arcade') {
      if (livesRef.current <= 0) endGame()
      else nextQuestion()
      return
    }
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
      // Arcade bests rank by points (SCORE_RANKED_KINDS), the rest by accuracy.
      const prev = history?.best
      const better =
        modeRef.current === 'arcade'
          ? prev == null || s.score > prev.score
          : prev == null || s.score / s.total > prev.score / prev.total
      setNewBest(s.total >= 5 && better)
      void api.quiz
        .logSession({
          kind: kindForMode(modeRef.current),
          score: s.score,
          total: s.total,
          bestStreak: s.best,
          settings: {
            mode: modeRef.current,
            songType,
            listSource,
            eras,
            length: modeRef.current === 'arcade' ? 0 : lengthRef.current,
            timerEnabled: modeRef.current === 'arcade' ? true : timerEnabled,
            offsetEnabled,
            snippet: snippetRef.current,
            autoNext
          }
        })
        .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history(kindForMode(modeRef.current)) }))
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
      statsRef.current = EMPTY_STATS
      setStats(EMPTY_STATS)
      modeRef.current = mode
      lengthRef.current = mode === 'arcade' ? 0 : length
      autoNextRef.current = autoNext
      snippetRef.current = snippet
      livesRef.current = ARCADE_LIVES
      setLives(ARCADE_LIVES)
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
          back={{ to: '/quiz', label: 'Quiz' }}
          title="Song Quiz"
          subtitle="Guess the anime from its opening or ending theme."
          className="mb-6"
        />

        <div className="card p-6 space-y-6">
          <Group label="Mode">
            <Pill active={mode === 'classic'} onClick={() => setMode('classic')} label="Classic" />
            <Pill active={mode === 'arcade'} onClick={() => setMode('arcade')} label="Arcade" />
            <Pill active={mode === 'reverse'} onClick={() => setMode('reverse')} label="Reverse" />
          </Group>
          <p className="-mt-4 text-sm text-gray-500">
            {mode === 'classic' && 'A clip plays — which anime is it from?'}
            {mode === 'arcade' &&
              'Endless run, timer always on, 3 misses end it. Faster answers score more points.'}
            {mode === 'reverse' &&
              'The anime is named — audition the four clips and lock in the one that belongs to it.'}
          </p>

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

          {mode !== 'arcade' && (
            <Group label="Length">
              <Pill active={length === 5} onClick={() => setLength(5)} label="5 songs" />
              <Pill active={length === 10} onClick={() => setLength(10)} label="10 songs" />
              <Pill active={length === 0} onClick={() => setLength(0)} label="Endless" />
            </Group>
          )}

          <Group label="Clip length">
            {/* Snippet pills: the clip pauses after N seconds of play; Full
                restores classic whole-song playback. */}
            {SNIPPET_CHOICES.map((secs) => (
              <Pill
                key={secs}
                active={snippet === secs}
                onClick={() => setSnippet(secs)}
                label={secs === 0 ? 'Full song' : `${secs}s`}
              />
            ))}
          </Group>

          <div className="space-y-2 pt-1">
            {mode !== 'arcade' && (
              <Toggle
                checked={timerEnabled}
                onChange={setTimerEnabled}
                label={`Countdown timer (${TIMER_SECONDS}s per song)`}
              />
            )}
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

        <QuizRecord kind={roundKind} />
      </div>
    )
  }

  if (phase === 'summary') {
    const accuracy = stats.total ? Math.round((stats.correct / stats.total) * 100) : 0
    const arcade = modeRef.current === 'arcade'
    return (
      <StudySessionFrame title="Song quiz complete" subtitle={arcade ? 'Arcade broadcast' : 'Challenge broadcast'}>
        <div className="py-3 text-center">
          {arcade ? (
            <>
              <p className="mt-3 text-6xl font-bold">{stats.score}</p>
              <p className="mt-1 text-sm uppercase tracking-wide text-gray-500">points</p>
            </>
          ) : (
            <p className="mt-3 text-6xl font-bold">
              {stats.score}
              <span className="text-3xl text-gray-500"> / {stats.total}</span>
            </p>
          )}
          <div className="mt-4 flex justify-center gap-6 text-base text-gray-400">
            <span>{accuracy}% correct</span>
            <span>
              {stats.correct}/{stats.total} songs
            </span>
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
      </StudySessionFrame>
    )
  }

  // ---- play phase ----
  const arcadeOver = modeRef.current === 'arcade' && livesRef.current <= 0
  const reverse = modeRef.current === 'reverse'
  const qNum = answered ? stats.total : stats.total + 1
  const ourId = current ? `quiz-${current.themeId}` : null
  const isOurs = player.track?.id === ourId
  const playing = isOurs && player.isPlaying
  const isLast =
    modeRef.current !== 'arcade' && lengthRef.current > 0 && stats.total >= lengthRef.current
  const timePct = Math.max(0, Math.min(100, (timeLeft / TIMER_SECONDS) * 100))
  // Reverse mode: which option slot holds the correct clip (for the reveal).
  const correctIdx = current ? options.findIndex((o) => o.themeId === current.themeId) : -1

  return (
    <StudySessionFrame
      title={reverse ? 'Reverse song challenge' : 'Song challenge'}
      subtitle={modeRef.current === 'arcade' ? `Question ${qNum} · arcade run` : 'Identify the archive relationship from sound'}
      progress={
        modeRef.current !== 'arcade' && lengthRef.current > 0
          ? { current: qNum, total: lengthRef.current, label: 'Songs' }
          : undefined
      }
      surface={false}
      actions={
        <>
          {modeRef.current === 'arcade' ? (
            <>
              <span className="font-medium text-gray-200">Points {stats.score}</span>
              <span className="flex items-center gap-1" aria-label={`${lives} lives left`}>
                {Array.from({ length: ARCADE_LIVES }).map((_, i) => (
                  <span key={i} className={i < lives ? 'text-red-400' : 'text-gray-600'}>
                    ♥
                  </span>
                ))}
              </span>
            </>
          ) : (
            <span>
              Score {stats.score}/{stats.total}
            </span>
          )}
          <span>Streak {stats.streak}</span>
          <button className="btn-ghost py-1 px-2 text-sm" onClick={endGame}>
            End quiz
          </button>
        </>
      }
    >

      {timed && !answered && (
        <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-base-700">
          <div
            className={`h-full transition-[width] duration-1000 ease-linear ${
              timeLeft <= 5 ? 'bg-red-500' : 'bg-accent'
            }`}
            style={{ width: `${timePct}%` }}
          />
        </div>
      )}

      {reverse ? (
        <div className="card p-8 text-center">
          <p className="text-sm uppercase tracking-widest text-gray-500">Which clip belongs to</p>
          {current && (
            <div className="mt-3 flex items-center justify-center gap-4">
              <CoverImage path={current.coverPath} alt={current.animeTitle} className="h-28 w-20 shrink-0" />
              <p className="text-3xl font-bold">{current.animeTitle}</p>
            </div>
          )}
          <p className="mt-3 text-sm text-gray-500">
            Audition with the buttons or keys 1-4 — lock your pick with Pick / Enter.
          </p>
        </div>
      ) : (
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
      )}

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((o, i) => {
          const isCorrect = current != null && o.themeId === current.themeId
          if (reverse) {
            const wrongPick = answered && picked === o.themeId && !isCorrect
            const auditioningThis = auditioned === i && isOurs
            return (
              <div
                key={o.themeId}
                className={`flex items-center gap-3 rounded-xl border p-3 transition-colors ${
                  answered
                    ? isCorrect
                      ? 'border-green-500 bg-green-500/15'
                      : wrongPick
                        ? 'border-red-500 bg-red-500/15'
                        : 'border-base-700 bg-base-800 opacity-60'
                    : auditioningThis
                      ? 'border-accent bg-base-700'
                      : 'border-base-700 bg-base-800 hover:border-accent hover:bg-base-700'
                }`}
              >
                <button
                  className="btn-ghost h-9 w-9 shrink-0 rounded-full p-0 text-sm"
                  aria-label={auditioningThis ? `Stop clip ${i + 1}` : `Audition clip ${i + 1}`}
                  title={auditioningThis ? 'Stop' : `Audition clip ${i + 1}`}
                  disabled={answered}
                  onClick={() => (auditioningThis && playing ? player.toggle() : auditionAt(i))}
                >
                  {auditioningThis && playing ? 'II' : '▸'}
                </button>
                <span className="min-w-0 flex-1 truncate text-base font-medium">Clip {i + 1}</span>
                {!answered && (
                  <button
                    className="btn-ghost px-3 py-1.5 text-sm"
                    onClick={() =>
                      handleAnswer(o.themeId, current != null && o.themeId === current.themeId)
                    }
                  >
                    Pick
                  </button>
                )}
                <kbd className="kbd shrink-0">{i + 1}</kbd>
              </div>
            )
          }
          const correct = answered && isCorrect
          const wrongPick = answered && picked === o.mediaId && !correct
          return (
            <button
              key={o.mediaId}
              disabled={answered}
              onClick={() => handleAnswer(o.mediaId, o.mediaId === current?.mediaId)}
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
          {reverse && (
            <CoverImage path={current.coverPath} alt={current.animeTitle} className="h-36 w-24 shrink-0" />
          )}
          <div className="min-w-0 flex-1">
            <p
              className={`text-sm font-semibold uppercase tracking-wide ${
                picked != null && (reverse ? picked === current.themeId : picked === current.mediaId)
                  ? 'text-green-400'
                  : 'text-red-400'
              }`}
            >
              {picked == null
                ? 'Time / skipped'
                : (reverse ? picked === current.themeId : picked === current.mediaId)
                  ? 'Correct'
                  : 'Incorrect'}
            </p>
            <p className="truncate text-2xl font-semibold">{current.animeTitle}</p>
            <p className="text-base text-gray-400">
              {[current.slug, current.title].filter(Boolean).join(' · ') || 'Theme song'}
              {reverse && correctIdx >= 0 ? ` — clip ${correctIdx + 1}` : ''}
            </p>
            {current.artists.length > 0 && (
              <p className="mt-0.5 truncate text-sm text-gray-500">{current.artists.join(', ')}</p>
            )}
          </div>
          <button className="btn-ghost shrink-0 px-4 py-2 text-sm" onClick={() => void playSong(current)}>
            Play clip
          </button>
        </div>
      )}

      <div className="mt-5 flex gap-2">
        {!answered && (
          <button
            className="btn-ghost px-5 py-2.5 text-base"
            onClick={() => handleAnswer(null, false)}
          >
            Reveal answer
          </button>
        )}
        {answered &&
          (isLast || arcadeOver ? (
            <button className="btn-primary px-5 py-2.5 text-base" onClick={endGame}>
              See results (Enter)
            </button>
          ) : (
            <button className="btn-primary px-5 py-2.5 text-base" onClick={advance}>
              Next (Enter)
            </button>
          ))}
      </div>
    </StudySessionFrame>
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
