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
import { ANIME } from '../lib/mediaConfig'
import CoverImage from '../components/CoverImage'
import QuizRecord from '../components/QuizRecord'
import { HeartIcon, PauseIcon, PlayIcon } from '../components/PlayerIcons'
import { Group, Pill } from '../components/PillGroup'
import { ERAS } from '@shared/era'
import type { QuizKind, QuizSong, QuizSongFilter } from '@shared/types'
import { shuffle } from '@shared/shuffle'
import { animeFranchiseKey, pickSongDistractors, songRecordingIndex } from '@shared/songQuiz'
import {
  answerIsCorrect,
  balancedDeckAvoiding,
  isNewQuizBest,
  quizScorePolicy,
  quizSeed,
  seededRng
} from '@shared/quizCore'
import {
  initialSongAuditionIndex,
  shouldAcceptAudioRequest,
  shouldAutoplaySongMode,
  shouldRunSongTimer,
  songAnswerKey,
  shouldStopQuizTrack
} from '@shared/quizAudioCore'
import { useTabLeaveGuard } from '../lib/browserTabs'
import { loadQuizDefaults, SONG_SNIPPET_CHOICES } from '../lib/quizPrefs'
import { audioDurationSeconds, audioOnsetSeconds } from '../lib/audioOnset'
import { useQuizClip } from '../lib/quizClip'

type Phase = 'setup' | 'play' | 'summary'
type ListSource = 'consumed' | 'all'
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
// The answer clock starts anyway if a started clip is still silent this long.
const HEARD_FALLBACK_MS = 8000
const OFFSET_MAX_FRACTION = 0.6 // never start a clip past 60% of the song
const ARCADE_LIVES = 3
const SNIPPET_CHOICES = SONG_SNIPPET_CHOICES // seconds; 0 = play the full clip

const EMPTY_STATS: Stats = { score: 0, correct: 0, total: 0, streak: 0, best: 0 }

// A resolved source with where its sound starts and how long it runs, probed
// before playback so a random start point never plays the intro first.
interface SongAudio {
  src: string
  onset: number
  duration: number | null
}

interface RoundResult {
  song: QuizSong
  picked: QuizSong | null
  correct: boolean
}

function quizTrack(song: QuizSong, src: string) {
  // Masked so the now-playing bar, widget and OS overlay never spoil the answer.
  return { id: `quiz-${song.themeId}`, src, title: 'Song Quiz', subtitle: null, context: '???' }
}

// Snippet cutoff and the moment sound is first heard (the answer clock waits
// for it). Its own component, because it re-renders every frame.
function ClipMeter({
  trackId,
  startOffset,
  seconds,
  onHeard
}: {
  trackId: string | null
  startOffset: number
  seconds: number
  onHeard: () => void
}) {
  const elapsed = useQuizClip(trackId, startOffset, seconds > 0 ? seconds : null, onHeard)
  if (seconds <= 0 || !trackId) return null
  return (
    <div
      className="mx-auto mt-5 h-1.5 w-full max-w-sm overflow-hidden rounded-full bg-base-700"
      role="img"
      aria-label={`${seconds} second clip`}
    >
      <div className="h-full bg-accent" style={{ width: `${Math.min(elapsed / seconds, 1) * 100}%` }} />
    </div>
  )
}

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
  const completedStatuses = statuses[1] ? [statuses[1]] : []

  // Setup options (persisted so they survive navigation / a new round).
  const [mode, setMode] = usePersistedState<Mode>('quizMode', 'classic')
  const [songType, setSongType] = usePersistedState<'OP' | 'ED' | null>('quizSongType', null)
  const [listSource, setListSource] = usePersistedState<ListSource>('quizList', 'consumed')
  // Selected era keys (multi-select); empty = every decade.
  const [eras, setEras] = usePersistedState<string[]>('quizEras', [])
  const [length, setLength] = usePersistedState<number>('quizLength', 10) // 0 = endless
  // Seeds a fresh visit only (Settings → Readers & quizzes).
  const [quizDefaults] = useState(loadQuizDefaults)
  const [timerEnabled, setTimerEnabled] = usePersistedState('quizTimer', quizDefaults.timer)
  const [offsetEnabled, setOffsetEnabled] = usePersistedState('quizOffset', quizDefaults.songOffset)
  const [snippet, setSnippet] = usePersistedState('quizSnippet', quizDefaults.songSnippet) // 0 = full clip
  const [autoNext, setAutoNext] = usePersistedState('quizAutoNext', quizDefaults.songAutoNext)

  const [phase, setPhase] = useState<Phase>('setup')
  useTabLeaveGuard(phase === 'play', 'run')
  const [current, setCurrent] = useState<QuizSong | null>(null)
  const [options, setOptions] = useState<QuizSong[]>([])
  const [picked, setPicked] = useState<string | null>(null)
  const [answered, setAnswered] = useState(false)
  const [stats, setStats] = useState<Stats>(EMPTY_STATS)
  const [lives, setLives] = useState(ARCADE_LIVES)
  const [auditioned, setAuditioned] = useState<number | null>(null) // reverse: option index playing
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [newBest, setNewBest] = useState(false)
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'failed'>('idle')
  // The answer clock starts once the clip is actually audible (classic/arcade).
  const [heard, setHeard] = useState(false)
  const [clipStart, setClipStart] = useState<{ trackId: string; offset: number } | null>(null)
  const [results, setResults] = useState<RoundResult[]>([])
  // Other anime that use this exact recording; all of them are correct.
  const [sharedTitles, setSharedTitles] = useState<string[]>([])

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
  const validKeysRef = useRef<string[]>([])
  const answeredRef = useRef(false)
  const autoTimerRef = useRef<number | null>(null)
  const heardFallbackRef = useRef<number | null>(null)
  const offsetByThemeRef = useRef(new Map<number, number>())
  const audioCacheRef = useRef(new Map<number, Promise<SongAudio | null>>())
  const sameRecordingRef = useRef<(song: QuizSong) => number[]>((song) => [song.mediaId])
  const franchiseRef = useRef(new Map<number, string>())
  const optionsRef = useRef<QuizSong[]>([])
  const resultsRef = useRef<RoundResult[]>([])
  const playerRef = useRef(player)
  playerRef.current = player
  const lengthRef = useRef(0)
  const autoNextRef = useRef(true)
  const modeRef = useRef<Mode>('classic')
  const snippetRef = useRef(0)
  const livesRef = useRef(ARCADE_LIVES)
  const timeLeftRef = useRef(TIMER_SECONDS)
  const auditionedRef = useRef<number | null>(null)
  const loggedRef = useRef(false)
  const playRequestRef = useRef(0)
  const seedRef = useRef(0)
  const rngRef = useRef<() => number>(Math.random)

  function clearHeardFallback() {
    if (heardFallbackRef.current != null) {
      window.clearTimeout(heardFallbackRef.current)
      heardFallbackRef.current = null
    }
  }

  function clearAuto() {
    if (autoTimerRef.current != null) {
      window.clearTimeout(autoTimerRef.current)
      autoTimerRef.current = null
    }
  }

  function stopQuizAudio() {
    playRequestRef.current++
    const activePlayer = playerRef.current
    if (shouldStopQuizTrack(activePlayer.track?.id)) activePlayer.stop()
  }

  // Stop playback + timers when leaving the quiz page.
  useEffect(() => {
    return () => {
      clearAuto()
      clearHeardFallback()
      stopQuizAudio()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Countdown tick while a question is live. Arcade always runs the clock.
  const timed = mode === 'arcade' || timerEnabled
  useEffect(() => {
    if (phase !== 'play' || !current || answered || !timed) return
    const quizAudioPlaying = player.isPlaying && shouldStopQuizTrack(player.track?.id)
    if (!shouldRunSongTimer(modeRef.current, quizAudioPlaying)) return
    // Loading time never costs the player: the clock waits for audible sound.
    if (modeRef.current !== 'reverse' && !heard) return
    const id = window.setInterval(() => {
      timeLeftRef.current = Math.max(0, timeLeftRef.current - 1)
      setTimeLeft(timeLeftRef.current)
    }, 1000)
    return () => window.clearInterval(id)
  }, [phase, current, answered, timed, heard, player.isPlaying, player.track?.id])

  // Time's up counts as a miss.
  useEffect(() => {
    if (phase === 'play' && timed && !answered && current && timeLeft <= 0) {
      handleAnswer(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, answered, timed, phase, current])

  // Keyboard. Classic/arcade: 1-4 answers, Enter advances. Reverse: 1-4
  // auditions a clip and Enter locks the auditioned one in as the answer.
  useEffect(() => {
    if (phase !== 'play') return
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t.isContentEditable)
        return
      if (e.code === 'Space') {
        e.preventDefault()
        toggleCurrentClip()
      } else if (!answeredRef.current && e.key >= '1' && e.key <= '4') {
        e.preventDefault()
        const idx = Number(e.key) - 1
        const opt = options[idx]
        if (!opt) return
        if (modeRef.current === 'reverse') {
          auditionAt(idx)
        } else {
          handleAnswer(songAnswerKey(modeRef.current, opt))
        }
      } else if (!answeredRef.current && e.key === 'Enter' && modeRef.current === 'reverse') {
        e.preventDefault()
        const idx = auditionedRef.current
        const opt = idx != null ? options[idx] : null
        if (opt) handleAnswer(songAnswerKey(modeRef.current, opt))
      } else if (answeredRef.current && e.key === 'Enter') {
        e.preventDefault()
        advance()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, options, answered])

  // Cached per theme for the session: the source, its onset and its duration
  // are probed once, and the next song is prefetched while this one plays.
  function loadSong(song: QuizSong): Promise<SongAudio | null> {
    let pending = audioCacheRef.current.get(song.themeId)
    if (!pending) {
      pending = (async () => {
        let src: string | null = null
        if (song.audioPath) src = await api.files.resolveUrl(song.audioPath)
        if (!src) src = song.audioUrl
        if (!src) return null
        const [onset, duration] = await Promise.all([
          audioOnsetSeconds(src),
          audioDurationSeconds(src)
        ])
        return { src, onset, duration }
      })().catch(() => null)
      audioCacheRef.current.set(song.themeId, pending)
    }
    return pending
  }

  // The random start point is drawn once per theme per question, so a replay
  // returns to the same spot; without it, play starts where sound starts.
  function startOffsetFor(song: QuizSong, audio: SongAudio): number {
    if (!offsetEnabled || audio.duration == null) return audio.onset
    let offset = offsetByThemeRef.current.get(song.themeId)
    if (offset == null) {
      offset = Math.max(audio.onset, rngRef.current() * audio.duration * OFFSET_MAX_FRACTION)
      offsetByThemeRef.current.set(song.themeId, offset)
    }
    return offset
  }

  async function playSong(song: QuizSong) {
    const request = ++playRequestRef.current
    const audio = await loadSong(song)
    if (!shouldAcceptAudioRequest(playRequestRef.current, request)) return
    if (!audio) {
      stopQuizAudio()
      // Nothing will ever play; let the clock run so the question can end.
      setHeard(true)
      return
    }
    const offset = startOffsetFor(song, audio)
    const track = quizTrack(song, audio.src)
    setClipStart({ trackId: track.id, offset })
    // A source that resolves but never plays (a corrupt file, a stalled
    // stream) would otherwise hold a timed question open forever.
    clearHeardFallback()
    heardFallbackRef.current = window.setTimeout(() => {
      if (shouldAcceptAudioRequest(playRequestRef.current, request)) setHeard(true)
    }, HEARD_FALLBACK_MS)
    const activePlayer = playerRef.current
    if (activePlayer.track?.id === track.id) {
      activePlayer.seek(offset)
      if (!activePlayer.isPlaying) activePlayer.toggle()
    } else {
      activePlayer.playQueue([track], 0, { startTime: offset })
    }
  }

  // Summary recap: the whole song from where its sound starts, no cutoff.
  async function previewSong(song: QuizSong) {
    const activePlayer = playerRef.current
    if (activePlayer.track?.id === `quiz-${song.themeId}`) {
      activePlayer.toggle()
      return
    }
    const request = ++playRequestRef.current
    const audio = await loadSong(song)
    if (!audio || !shouldAcceptAudioRequest(playRequestRef.current, request)) return
    playerRef.current.playQueue([quizTrack(song, audio.src)], 0, { startTime: audio.onset })
  }

  // Space: pause or resume the clip in play, or start it again.
  function toggleCurrentClip() {
    const song =
      modeRef.current === 'reverse'
        ? optionsRef.current[auditionedRef.current ?? 0]
        : currentRef.current
    if (!song) return
    const activePlayer = playerRef.current
    if (activePlayer.track?.id === `quiz-${song.themeId}`) activePlayer.toggle()
    else if (modeRef.current === 'reverse') auditionAt(auditionedRef.current ?? 0)
    else void playSong(song)
  }

  // Reverse mode: hear a candidate clip without answering yet.
  function auditionAt(idx: number) {
    const opt = optionsRef.current[idx]
    if (!opt) return
    auditionedRef.current = idx
    setAuditioned(idx)
    void playSong(opt)
  }

  function nextQuestion() {
    clearAuto()
    clearHeardFallback()
    auditionedRef.current = null
    setAuditioned(null)
    offsetByThemeRef.current.clear()
    if (deckRef.current.length === 0) {
      deckRef.current = balancedDeckAvoiding(
        poolRef.current,
        (value) => value.mediaId,
        currentRef.current,
        rngRef.current
      )
    }
    const song = deckRef.current.pop()
    if (!song) {
      endGame()
      return
    }
    // Distractors share the answer's era/genres when the library allows, never
    // another song of the same anime, never an anime using this very recording,
    // and no franchise fills more than two options.
    const sameRecording = sameRecordingRef.current(song)
    const franchises = franchiseRef.current
    const distractors = pickSongDistractors(
      shuffle(poolRef.current, rngRef.current),
      song,
      3,
      sameRecording,
      (value) => franchises.get(value.mediaId) ?? animeFranchiseKey(value.animeTitle),
      rngRef.current
    )
    const nextOptions = shuffle([song, ...distractors], rngRef.current)
    currentRef.current = song
    // Classic/arcade accept every anime that uses the recording; reverse keys
    // clips by theme, and no clip of the same recording is ever offered.
    validKeysRef.current =
      modeRef.current === 'reverse'
        ? [songAnswerKey(modeRef.current, song)]
        : sameRecording.map((mediaId) => songAnswerKey(modeRef.current, { mediaId, themeId: 0 }))
    setSharedTitles(
      sameRecording
        .filter((mediaId) => mediaId !== song.mediaId)
        .map((mediaId) => poolRef.current.find((value) => value.mediaId === mediaId)?.animeTitle)
        .filter((title): title is string => Boolean(title))
    )
    answeredRef.current = false
    optionsRef.current = nextOptions
    setHeard(false)
    setClipStart(null)
    setCurrent(song)
    setOptions(nextOptions)
    setPicked(null)
    setAnswered(false)
    timeLeftRef.current = TIMER_SECONDS
    setTimeLeft(TIMER_SECONDS)
    const initialAudition = initialSongAuditionIndex(modeRef.current, nextOptions.length)
    if (initialAudition != null) {
      auditionedRef.current = initialAudition
      setAuditioned(initialAudition)
      void playSong(nextOptions[initialAudition])
    } else if (shouldAutoplaySongMode(modeRef.current)) {
      void playSong(song)
    } else {
      stopQuizAudio()
    }
    // Prefetch: every clip a reverse question can audition, and the next answer.
    if (modeRef.current === 'reverse') for (const option of nextOptions) void loadSong(option)
    const upcoming = deckRef.current[deckRef.current.length - 1]
    if (upcoming) void loadSong(upcoming)
  }

  function handleAnswer(key: string | null) {
    if (answeredRef.current) return
    answeredRef.current = true
    const correct = answerIsCorrect(validKeysRef.current, key)
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
    const answer = currentRef.current
    if (answer) {
      const picked =
        key == null
          ? null
          : (optionsRef.current.find((option) => songAnswerKey(modeRef.current, option) === key) ?? null)
      resultsRef.current = [...resultsRef.current, { song: answer, picked, correct }]
      setResults(resultsRef.current)
    }
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
    stopQuizAudio()
    const s = statsRef.current
    if (!loggedRef.current && s.total > 0) {
      loggedRef.current = true
      // Decide "new personal best" BEFORE invalidating, or the refetched
      // history would already contain this round and the banner would flip.
      // Arcade bests rank by points (SCORE_RANKED_KINDS), the rest by accuracy.
      const kind = kindForMode(modeRef.current)
      const policy = quizScorePolicy(kind)
      const sessionSettings = {
        mode: modeRef.current,
        songType,
        listSource,
        eras,
        length: modeRef.current === 'arcade' ? 0 : lengthRef.current,
        timerEnabled: modeRef.current === 'arcade' ? true : timerEnabled,
        offsetEnabled,
        snippet: snippetRef.current,
        autoNext,
        correct: s.correct,
        attempted: s.total,
        scorePolicy: policy,
        playMode: 'solo',
        seed: seedRef.current
      }
      setNewBest(
        isNewQuizBest(
          { score: s.score, total: s.total, settings: sessionSettings },
          history?.best ?? null,
          policy
        )
      )
      void api.quiz
        .logSession({
          kind,
          score: s.score,
          total: s.total,
          bestStreak: s.best,
          settings: sessionSettings
        })
        .then(() => {
          setSaveState('saved')
          return qc.invalidateQueries({ queryKey: qk.quiz.history(kind) })
        })
        .catch((error) => {
          setSaveState('failed')
          throw error
        })
      setSaveState('saving')
    }
    setPhase('summary')
  }

  async function startGame() {
    setError(null)
    setLoading(true)
    try {
      const statusFilter = listSource === 'all' ? null : completedStatuses
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
      sameRecordingRef.current = songRecordingIndex(pool)
      franchiseRef.current = new Map(
        pool.map((song): [number, string] => [song.mediaId, animeFranchiseKey(song.animeTitle)])
      )
      audioCacheRef.current.clear()
      resultsRef.current = []
      setResults([])
      seedRef.current = quizSeed(`${Date.now()}-${Math.random()}`)
      rngRef.current = seededRng(seedRef.current)
      deckRef.current = balancedDeckAvoiding(pool, (value) => value.mediaId, null, rngRef.current)
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
      setSaveState('idle')
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
              'The anime is named; clip 1 starts automatically.'}
          </p>

          <Group label="Song type">
            <Pill active={songType === null} onClick={() => setSongType(null)} label="Both" />
            <Pill active={songType === 'OP'} onClick={() => setSongType('OP')} label="Openings" />
            <Pill active={songType === 'ED'} onClick={() => setSongType('ED')} label="Endings" />
          </Group>

          <Group label="From">
            <Pill active={listSource !== 'all'} onClick={() => setListSource('consumed')} label="Completed" />
            <Pill active={listSource === 'all'} onClick={() => setListSource('all')} label="All" />
          </Group>
          {listSource === 'all' && <p className="-mt-4 text-sm text-amber-300">Includes in-progress or unseen content and may contain spoilers.</p>}

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
            <Toggle checked={autoNext} onChange={setAutoNext} label="Advance automatically after answering" />
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
    const reverseRound = modeRef.current === 'reverse'
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
          {saveState === 'saving' && <p className="mt-3 text-sm text-gray-400">Saving session…</p>}
          {saveState === 'failed' && <p className="mt-3 text-sm text-red-400">Session was not saved.</p>}
        </div>
        {results.length > 0 && (
          <ol className="mt-4 divide-y divide-base-700 border-y border-base-700 text-left">
            {results.map((result, index) => {
              const trackId = `quiz-${result.song.themeId}`
              const previewing = player.track?.id === trackId && player.isPlaying
              const missedWith =
                result.picked && !result.correct
                  ? reverseRound
                    ? `You picked the clip from ${result.picked.animeTitle}`
                    : `You picked ${result.picked.animeTitle}`
                  : null
              return (
                <li key={`${result.song.themeId}-${index}`} className="flex items-center gap-4 py-3 text-sm">
                  <span className="w-6 text-gray-500 tabular-nums">{index + 1}</span>
                  <CoverImage
                    path={result.song.coverPath}
                    alt=""
                    thumbWidth={96}
                    className="aspect-[2/3] w-10 shrink-0 rounded"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-white">{result.song.animeTitle}</p>
                    <p className="truncate text-gray-400">
                      {[result.song.slug, result.song.title].filter(Boolean).join(' · ') || 'Theme song'}
                      {result.song.artists.length > 0 ? ` — ${result.song.artists.join(', ')}` : ''}
                    </p>
                    {missedWith && <p className="truncate text-gray-500">{missedWith}</p>}
                  </div>
                  <span className={result.correct ? 'text-green-400' : 'text-red-400'}>
                    {result.correct ? 'Correct' : result.picked ? 'Wrong' : 'Missed'}
                  </span>
                  <button
                    className="btn-ghost h-9 w-9 shrink-0 rounded-full p-0"
                    aria-label={previewing ? `Pause ${result.song.animeTitle} theme` : `Play ${result.song.animeTitle} theme`}
                    title={previewing ? 'Pause' : 'Play'}
                    onClick={() => void previewSong(result.song)}
                  >
                    {previewing ? <PauseIcon className="mx-auto h-4 w-4" /> : <PlayIcon className="mx-auto h-4 w-4" />}
                  </button>
                </li>
              )
            })}
          </ol>
        )}
        <div className="mt-6 flex gap-2">
          <button
            className="btn-primary flex-1"
            onClick={() => {
              // Back on setup first, so a pool that no longer deals shows its error there.
              setPhase('setup')
              void startGame()
            }}
          >
            Play again
          </button>
          <button
            className="btn-ghost flex-1"
            onClick={() => {
              stopQuizAudio()
              setPhase('setup')
            }}
          >
            Change settings
          </button>
          <Link to="/quiz" className="btn-ghost flex-1 text-center">
            Back to quizzes
          </Link>
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
  const pickedCorrect = answerIsCorrect(validKeysRef.current, picked)
  const loadedQuizTrack = shouldStopQuizTrack(player.track?.id) ? (player.track?.id ?? null) : null
  // Only the clip this question started is measured: until playSong has set
  // its start, the loaded track may still be the previous question's song.
  const clipTrack = clipStart && clipStart.trackId === loadedQuizTrack ? clipStart : null
  const clipMeter = !answered && (
    <ClipMeter
      trackId={clipTrack?.trackId ?? null}
      startOffset={clipTrack?.offset ?? 0}
      seconds={snippetRef.current}
      onHeard={() => setHeard(true)}
    />
  )

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
                    <HeartIcon className="h-3.5 w-3.5" filled={i < lives} />
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
          {clipMeter}
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
              onClick={() => current && void playSong(current)}
            >
              Replay
            </button>
          </div>
          {clipMeter}
        </div>
      )}

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((o, i) => {
          const isCorrect = current != null && o.themeId === current.themeId
          const optionKey = songAnswerKey(modeRef.current, o)
          if (reverse) {
            const wrongPick = answered && picked === optionKey && !isCorrect
            const optionIsLoaded = player.track?.id === `quiz-${o.themeId}`
            const auditioningThis = auditioned === i && optionIsLoaded
            const playingThis = auditioningThis && player.isPlaying
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
                  aria-label={playingThis ? `Stop clip ${i + 1}` : `Audition clip ${i + 1}`}
                  title={playingThis ? 'Stop' : `Audition clip ${i + 1}`}
                  disabled={answered}
                  onClick={() => (playingThis ? player.toggle() : auditionAt(i))}
                >
                  {playingThis ? 'II' : '▸'}
                </button>
                <span className="min-w-0 flex-1 truncate text-base font-medium">Clip {i + 1}</span>
                {!answered && (
                  <button
                    className="btn-ghost px-3 py-1.5 text-sm"
                    onClick={() => handleAnswer(optionKey)}
                  >
                    Pick
                  </button>
                )}
                <kbd className="kbd shrink-0">{i + 1}</kbd>
              </div>
            )
          }
          const correct = answered && isCorrect
          const wrongPick = answered && picked === optionKey && !correct
          return (
            <button
              key={o.mediaId}
              disabled={answered}
              onClick={() => handleAnswer(optionKey)}
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
                pickedCorrect ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {picked == null
                ? 'Time / skipped'
                : pickedCorrect
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
            {!reverse && sharedTitles.length > 0 && (
              <p className="mt-1 text-sm text-gray-400">
                Same song in {sharedTitles.join(', ')}; any of them counts.
              </p>
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
            onClick={() => handleAnswer(null)}
          >
            Reveal (counts as a miss)
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
