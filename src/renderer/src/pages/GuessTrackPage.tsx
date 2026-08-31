import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type {
  MusicPlaylistItem,
  MusicTrack,
  QuizKind,
  QuizSong,
  QuizSongFilter
} from '@shared/types'
import { ERAS } from '@shared/era'
import {
  GUESS_TRACK_CLIP_SECONDS,
  GUESS_TRACK_ROUND_LENGTH,
  buildGuessTrackQuestions,
  guessTrackArtistInitial,
  guessTrackClipSeconds,
  guessTrackHintVisible,
  guessTrackIdentityCount,
  guessTrackMusicEntry,
  guessTrackThemeEntry,
  initialGuessTrackRound,
  searchGuessTrackChoices,
  skipGuessTrack,
  submitGuessTrack,
  type GuessTrackEntry,
  type GuessTrackQuestion,
  type GuessTrackRoundState,
  type GuessTrackSource
} from '@shared/guessTrack'
import { isNewQuizBest, quizScorePolicy, quizSeed } from '@shared/quizCore'
import { shouldStopQuizTrack } from '@shared/quizAudioCore'
import PageHeader from '../components/PageHeader'
import QuizRecord from '../components/QuizRecord'
import StudySessionFrame, {
  SessionEvidence,
  SessionFeedback
} from '../components/StudySessionFrame'
import CoverImage from '../components/CoverImage'
import { Group, Pill } from '../components/PillGroup'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useAllCompletedStatuses } from '../lib/hooks'
import { usePersistedState } from '../lib/navState'
import { usePlayerControls } from '../lib/player'

type Phase = 'setup' | 'play' | 'summary'
type ThemeScope = 'completed' | 'all'
type MusicScope = 'all' | 'liked' | 'playlist' | 'artist' | 'album'

interface TrackResult {
  recordingKey: string
  title: string
  performer: string
  solved: boolean
  attempts: number
  points: number
}

const MAX_DEAL = 10

function playablePlaylistTracks(items: MusicPlaylistItem[]): MusicTrack[] {
  const tracks = items.flatMap((item) => {
    if (item.kind === 'local') return [item.track]
    return item.matchedTrack ? [item.matchedTrack] : []
  })
  const seen = new Set<number>()
  return tracks.filter((track) => {
    if (seen.has(track.id)) return false
    seen.add(track.id)
    return true
  })
}

function quizKind(source: GuessTrackSource): QuizKind {
  return source === 'theme' ? 'guessTrackTheme' : 'guessTrackMusic'
}

function PlayIcon(): React.JSX.Element {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-current">
      <path d="M8 5.2v13.6L19 12 8 5.2Z" />
    </svg>
  )
}

export default function GuessTrackPage() {
  const player = usePlayerControls()
  const qc = useQueryClient()
  const completedStatuses = useAllCompletedStatuses()

  const [source, setSource] = usePersistedState<GuessTrackSource>('guessTrackSource', 'theme')
  const [themeScope, setThemeScope] = usePersistedState<ThemeScope>(
    'guessTrackThemeScope',
    'completed'
  )
  const [songType, setSongType] = usePersistedState<'OP' | 'ED' | null>(
    'guessTrackSongType',
    null
  )
  const [eras, setEras] = usePersistedState<string[]>('guessTrackEras', [])
  const [musicScope, setMusicScope] = usePersistedState<MusicScope>(
    'guessTrackMusicScope',
    'all'
  )
  const [playlistId, setPlaylistId] = usePersistedState<number | null>(
    'guessTrackPlaylist',
    null
  )
  const [artistId, setArtistId] = usePersistedState<number | null>('guessTrackArtist', null)
  const [albumId, setAlbumId] = usePersistedState<number | null>('guessTrackAlbum', null)

  const [phase, setPhase] = useState<Phase>('setup')
  const [loading, setLoading] = useState(false)
  const [audioLoading, setAudioLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [audioNotice, setAudioNotice] = useState<string | null>(null)
  const [current, setCurrent] = useState<GuessTrackQuestion | null>(null)
  const [round, setRound] = useState<GuessTrackRoundState>(initialGuessTrackRound)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [solved, setSolved] = useState(0)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<GuessTrackEntry | null>(null)
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const [activeSuggestion, setActiveSuggestion] = useState(0)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [results, setResults] = useState<TrackResult[]>([])
  const [newBest, setNewBest] = useState(false)
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'failed'>('idle')
  const [clipRun, setClipRun] = useState(0)

  const questionsRef = useRef<GuessTrackQuestion[]>([])
  const sparesRef = useRef<GuessTrackQuestion[]>([])
  const answerPoolRef = useRef<GuessTrackEntry[]>([])
  const currentRef = useRef<GuessTrackQuestion | null>(null)
  const roundRef = useRef<GuessTrackRoundState>(initialGuessTrackRound())
  const resultsRef = useRef<TrackResult[]>([])
  const activeEntryRef = useRef<GuessTrackEntry | null>(null)
  const srcCacheRef = useRef(new Map<string, string>())
  const audioRequestRef = useRef(0)
  const transitionLockRef = useRef(false)
  const loggedRef = useRef(false)
  const seedRef = useRef(0)
  const playerRef = useRef(player)
  playerRef.current = player

  const kind = quizKind(source)
  const { data: history } = useQuery({
    queryKey: qk.quiz.history(kind),
    queryFn: () => api.quiz.history(kind)
  })
  const availabilityRequest = useMemo(
    () => ({ scope: 'consumed' as const, statuses: completedStatuses }),
    [completedStatuses]
  )
  const { data: availability } = useQuery({
    queryKey: qk.quiz.availability(availabilityRequest),
    queryFn: () => api.quiz.availability(availabilityRequest)
  })
  const { data: playlists = [] } = useQuery({
    queryKey: qk.music.playlists,
    queryFn: () => api.music.playlists(),
    enabled: source === 'music'
  })
  const { data: artists = [] } = useQuery({
    queryKey: qk.music.artists(''),
    queryFn: () => api.music.artists(),
    enabled: source === 'music'
  })
  const { data: albums = [] } = useQuery({
    queryKey: qk.music.albums(''),
    queryFn: () => api.music.albums(),
    enabled: source === 'music'
  })

  const suggestions = useMemo(
    () =>
      searchGuessTrackChoices(
        answerPoolRef.current,
        query,
        round.guessedRecordingKeys,
        8
      ),
    [query, round.guessedRecordingKeys]
  )

  function stopQuizAudio(): void {
    audioRequestRef.current++
    const activePlayer = playerRef.current
    if (shouldStopQuizTrack(activePlayer.track?.id)) activePlayer.stop()
  }

  useEffect(() => {
    return () => stopQuizAudio()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (
      phase !== 'play' ||
      round.status !== 'playing' ||
      !player.isPlaying ||
      !player.track?.id.startsWith('quiz-guess-track-')
    )
      return
    const id = window.setTimeout(() => {
      if (player.isPlaying && player.track?.id.startsWith('quiz-guess-track-')) player.toggle()
    }, guessTrackClipSeconds(round) * 1000)
    return () => window.clearTimeout(id)
    // player methods are stable; depending on the whole context object would
    // restart this cutoff on every current-time update.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, round, player.isPlaying, player.track?.id, clipRun])

  useEffect(() => {
    if (phase !== 'play') return
    function onKey(event: KeyboardEvent): void {
      const target = event.target as HTMLElement
      const inText =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target.isContentEditable
      if (!inText && event.code === 'Space' && currentRef.current) {
        event.preventDefault()
        replayCurrentClip()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, round.status])

  function startResolvedPlayback(entry: GuessTrackEntry, src: string): void {
    activeEntryRef.current = entry
    const trackId = `quiz-guess-track-${entry.key}`
    if (player.track?.id === trackId) {
      player.seek(0)
      if (!player.isPlaying) player.toggle()
    } else {
      player.play({
        id: trackId,
        src,
        title: 'Song Quiz',
        subtitle: null,
        context: '???',
        coverPath: null,
        mediaId: null
      })
    }
    setClipRun((value) => value + 1)
  }

  async function resolveEntry(entry: GuessTrackEntry, request: number): Promise<string | null> {
    const cached = srcCacheRef.current.get(entry.key)
    if (cached) return cached
    let src = entry.audioUrl
    if (entry.audioPath) src = (await api.files.resolveUrl(entry.audioPath)) ?? entry.audioUrl
    if (request !== audioRequestRef.current || !src) return null
    srcCacheRef.current.set(entry.key, src)
    return src
  }

  async function beginQuestion(question: GuessTrackQuestion, index: number): Promise<void> {
    const request = ++audioRequestRef.current
    setAudioLoading(true)
    setAudioNotice(null)
    let candidate: GuessTrackQuestion | undefined = question
    while (candidate && request === audioRequestRef.current) {
      for (const entry of candidate.entries) {
        const src = await resolveEntry(entry, request)
        if (request !== audioRequestRef.current) return
        if (!src) continue
        const resolved = { ...candidate, mystery: entry }
        questionsRef.current[index] = resolved
        currentRef.current = resolved
        activeEntryRef.current = entry
        const freshRound = initialGuessTrackRound()
        roundRef.current = freshRound
        transitionLockRef.current = false
        setCurrent(resolved)
        setRound(freshRound)
        setQuestionIndex(index)
        setQuery('')
        setSelected(null)
        setSuggestionsOpen(false)
        setFeedback(null)
        setAudioLoading(false)
        startResolvedPlayback(entry, src)
        return
      }
      setAudioNotice('A track file was unavailable. Replacing it without using an attempt.')
      candidate = sparesRef.current.shift()
    }
    if (request !== audioRequestRef.current) return
    setAudioLoading(false)
    setError('Not enough playable audio remains for this session. Return to setup and widen the source.')
  }

  function replayCurrentClip(): void {
    const entry = activeEntryRef.current
    if (!entry || audioLoading) return
    const src = srcCacheRef.current.get(entry.key)
    if (src) startResolvedPlayback(entry, src)
  }

  function revealTrack(next: GuessTrackRoundState): void {
    const question = currentRef.current
    const entry = activeEntryRef.current
    if (!question || !entry) return
    const result: TrackResult = {
      recordingKey: question.recordingKey,
      title: entry.title,
      performer: entry.performer,
      solved: next.status === 'correct',
      attempts: next.attempts.length,
      points: next.points
    }
    resultsRef.current = [...resultsRef.current, result]
    setResults(resultsRef.current)
    setScore((value) => value + next.points)
    if (result.solved) setSolved((value) => value + 1)
    const src = srcCacheRef.current.get(entry.key)
    if (src) startResolvedPlayback(entry, src)
  }

  function applyTransition(next: GuessTrackRoundState, outcome: 'wrong' | 'correct' | 'failed'): void {
    roundRef.current = next
    setRound(next)
    setSelected(null)
    setQuery('')
    setSuggestionsOpen(false)
    if (outcome === 'wrong') {
      setFeedback(`Not this track. The ${guessTrackClipSeconds(next)} second intro is now unlocked.`)
      transitionLockRef.current = false
      replayCurrentClip()
      return
    }
    setFeedback(outcome === 'correct' ? `Correct. ${next.points} points.` : 'No attempts left. The track is revealed.')
    revealTrack(next)
  }

  function submitAnswer(): void {
    if (!selected || roundRef.current.status !== 'playing' || transitionLockRef.current) return
    transitionLockRef.current = true
    const transition = submitGuessTrack(
      roundRef.current,
      selected,
      currentRef.current?.validKeys ?? []
    )
    if (transition.outcome === 'repeated') {
      setFeedback('That recording has already been tried. Choose another track.')
      transitionLockRef.current = false
      return
    }
    if (
      transition.outcome === 'wrong' ||
      transition.outcome === 'correct' ||
      transition.outcome === 'failed'
    ) {
      applyTransition(transition.state, transition.outcome)
    }
  }

  function skipAttempt(): void {
    if (roundRef.current.status !== 'playing' || transitionLockRef.current) return
    transitionLockRef.current = true
    const transition = skipGuessTrack(roundRef.current)
    if (transition.outcome !== 'repeated') applyTransition(transition.state, transition.outcome)
  }

  function longestSolvedStreak(items: TrackResult[]): number {
    let currentStreak = 0
    let best = 0
    for (const item of items) {
      currentStreak = item.solved ? currentStreak + 1 : 0
      best = Math.max(best, currentStreak)
    }
    return best
  }

  function finishSession(): void {
    stopQuizAudio()
    const finalResults = resultsRef.current
    const finalScore = finalResults.reduce((sum, item) => sum + item.points, 0)
    const finalSolved = finalResults.filter((item) => item.solved).length
    const finalKind = quizKind(source)
    const policy = quizScorePolicy(finalKind)
    const filters =
      source === 'theme'
        ? { scope: themeScope, songType, eras }
        : { scope: musicScope, playlistId, artistId, albumId }
    const settings = {
      source,
      filters,
      tracks: finalResults,
      correct: finalSolved,
      attempted: GUESS_TRACK_ROUND_LENGTH,
      scorePolicy: policy,
      playMode: 'solo',
      seed: seedRef.current
    }
    setNewBest(
      isNewQuizBest(
        { score: finalScore, total: GUESS_TRACK_ROUND_LENGTH, settings },
        history?.best ?? null,
        policy
      )
    )
    setPhase('summary')
    if (loggedRef.current) return
    loggedRef.current = true
    setSaveState('saving')
    void api.quiz
      .logSession({
        kind: finalKind,
        score: finalScore,
        total: GUESS_TRACK_ROUND_LENGTH,
        bestStreak: longestSolvedStreak(finalResults),
        settings
      })
      .then(() => {
        setSaveState('saved')
        return qc.invalidateQueries({ queryKey: qk.quiz.history(finalKind) })
      })
      .catch((saveError) => {
        setSaveState('failed')
        throw saveError
      })
  }

  function continueAfterReveal(): void {
    if (roundRef.current.status === 'playing' || transitionLockRef.current === false) return
    transitionLockRef.current = false
    const nextIndex = questionIndex + 1
    if (nextIndex >= GUESS_TRACK_ROUND_LENGTH) finishSession()
    else void beginQuestion(questionsRef.current[nextIndex], nextIndex)
  }

  async function loadMusicTracks(): Promise<MusicTrack[]> {
    if (musicScope === 'liked') return api.music.tracks({ likedOnly: true })
    if (musicScope === 'playlist') {
      if (playlistId == null) return []
      const playlist = await api.music.playlist(playlistId)
      return playlist ? playablePlaylistTracks(playlist.items) : []
    }
    if (musicScope === 'artist') {
      return artistId == null ? [] : api.music.artistTracks(artistId)
    }
    if (musicScope === 'album') {
      if (albumId == null) return []
      return (await api.music.album(albumId))?.tracks ?? []
    }
    return api.music.tracks({})
  }

  async function startGame(): Promise<void> {
    setError(null)
    setAudioNotice(null)
    setLoading(true)
    stopQuizAudio()
    try {
      let entries: GuessTrackEntry[]
      if (source === 'theme') {
        const filter: QuizSongFilter = {
          statuses: themeScope === 'completed' ? completedStatuses : null,
          songType,
          eras: eras.length ? eras : null
        }
        const songs: QuizSong[] = await api.quiz.songPool(filter)
        entries = songs.map(guessTrackThemeEntry).filter((entry) => entry != null)
      } else {
        const tracks = await loadMusicTracks()
        entries = tracks.map(guessTrackMusicEntry).filter((entry) => entry != null)
      }
      const identities = guessTrackIdentityCount(entries)
      if (identities < GUESS_TRACK_ROUND_LENGTH) {
        setError(
          `Need 5 distinct playable tracks with title and artist metadata; this source has ${identities}. Widen the filters or scan/import more audio.`
        )
        return
      }
      const seed = quizSeed(`${Date.now()}-${Math.random()}`)
      const dealt = buildGuessTrackQuestions(entries, Math.min(MAX_DEAL, identities), seed)
      questionsRef.current = dealt.slice(0, GUESS_TRACK_ROUND_LENGTH)
      sparesRef.current = dealt.slice(GUESS_TRACK_ROUND_LENGTH)
      answerPoolRef.current = entries
      resultsRef.current = []
      srcCacheRef.current.clear()
      seedRef.current = seed
      loggedRef.current = false
      transitionLockRef.current = false
      setResults([])
      setScore(0)
      setSolved(0)
      setNewBest(false)
      setSaveState('idle')
      setPhase('play')
      await beginQuestion(questionsRef.current[0], 0)
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Could not load this track source.')
    } finally {
      setLoading(false)
    }
  }

  function selectSuggestion(entry: GuessTrackEntry): void {
    setSelected(entry)
    setQuery(entry.answerLabel)
    setSuggestionsOpen(false)
    setActiveSuggestion(0)
  }

  function onAnswerKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'ArrowDown' && suggestions.length) {
      event.preventDefault()
      setSuggestionsOpen(true)
      setActiveSuggestion((index) => Math.min(index + 1, suggestions.length - 1))
    } else if (event.key === 'ArrowUp' && suggestions.length) {
      event.preventDefault()
      setSuggestionsOpen(true)
      setActiveSuggestion((index) => Math.max(index - 1, 0))
    } else if (event.key === 'Escape') {
      event.preventDefault()
      setSuggestionsOpen(false)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      if (suggestionsOpen && suggestions[activeSuggestion]) {
        selectSuggestion(suggestions[activeSuggestion])
      } else if (selected) {
        submitAnswer()
      }
    }
  }

  if (phase === 'setup') {
    const sourceCount =
      source === 'theme'
        ? availability?.guessTrackOptions.themes
        : availability?.guessTrackOptions.music
    return (
      <div className="mx-auto max-w-3xl p-4 sm:p-6">
        <PageHeader
          back={{ to: '/quiz', label: 'Quiz' }}
          title="Guess the Track"
          subtitle="Identify five mystery songs as their opening clips grow from one second to sixteen."
          className="mb-6"
        />
        <div className="card space-y-6 p-5 sm:p-6">
          <Group label="Source">
            <Pill active={source === 'theme'} onClick={() => setSource('theme')} label="Anime Themes" />
            <Pill active={source === 'music'} onClick={() => setSource('music')} label="Music Library" />
          </Group>

          {source === 'theme' ? (
            <>
              <Group label="From">
                <Pill
                  active={themeScope === 'completed'}
                  onClick={() => setThemeScope('completed')}
                  label="Completed"
                />
                <Pill active={themeScope === 'all'} onClick={() => setThemeScope('all')} label="All" />
              </Group>
              {themeScope === 'all' && (
                <p className="-mt-4 text-sm text-amber-300">
                  Includes in-progress or unseen anime and may reveal titles through the answer list.
                </p>
              )}
              <Group label="Theme type">
                <Pill active={songType === null} onClick={() => setSongType(null)} label="Both" />
                <Pill active={songType === 'OP'} onClick={() => setSongType('OP')} label="Openings" />
                <Pill active={songType === 'ED'} onClick={() => setSongType('ED')} label="Endings" />
              </Group>
              <Group label="Era">
                <Pill active={eras.length === 0} onClick={() => setEras([])} label="Any" />
                {ERAS.map((era) => (
                  <Pill
                    key={era.key}
                    active={eras.includes(era.key)}
                    onClick={() =>
                      setEras(
                        eras.includes(era.key)
                          ? eras.filter((key) => key !== era.key)
                          : [...eras, era.key]
                      )
                    }
                    label={era.label}
                  />
                ))}
              </Group>
            </>
          ) : (
            <>
              <Group label="From">
                {(['all', 'liked', 'playlist', 'artist', 'album'] as const).map((scope) => (
                  <Pill
                    key={scope}
                    active={musicScope === scope}
                    onClick={() => setMusicScope(scope)}
                    label={scope === 'all' ? 'All' : scope[0].toUpperCase() + scope.slice(1)}
                  />
                ))}
              </Group>
              {musicScope === 'playlist' && (
                <label className="block">
                  <span className="label mb-2 block">Playlist</span>
                  <select
                    className="input w-full"
                    value={playlistId ?? ''}
                    onChange={(event) => setPlaylistId(Number(event.target.value) || null)}
                  >
                    <option value="">Select a playlist</option>
                    {playlists.map((playlist) => (
                      <option key={playlist.id} value={playlist.id}>
                        {playlist.title} ({playlist.playableCount} playable)
                      </option>
                    ))}
                  </select>
                </label>
              )}
              {musicScope === 'artist' && (
                <label className="block">
                  <span className="label mb-2 block">Artist</span>
                  <select
                    className="input w-full"
                    value={artistId ?? ''}
                    onChange={(event) => setArtistId(Number(event.target.value) || null)}
                  >
                    <option value="">Select an artist</option>
                    {artists.map((artist) => (
                      <option key={artist.id} value={artist.id}>
                        {artist.name} ({artist.trackCount} tracks)
                      </option>
                    ))}
                  </select>
                </label>
              )}
              {musicScope === 'album' && (
                <label className="block">
                  <span className="label mb-2 block">Album</span>
                  <select
                    className="input w-full"
                    value={albumId ?? ''}
                    onChange={(event) => setAlbumId(Number(event.target.value) || null)}
                  >
                    <option value="">Select an album</option>
                    {albums.map((album) => (
                      <option key={album.id} value={album.id}>
                        {album.title} — {album.artistName} ({album.trackCount})
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </>
          )}

          <div className="rounded-md border border-base-600 bg-base-800/60 p-4 text-sm text-gray-300">
            Five tracks, six attempts each. A first-listen solve earns 6 points; each extension costs 1 point.
            {sourceCount != null && (
              <span className="mt-1 block text-gray-500">{sourceCount} eligible track identities in the broad source.</span>
            )}
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button className="btn-primary w-full py-3 text-base" disabled={loading} onClick={startGame}>
            {loading ? 'Loading tracks…' : 'Start broadcast'}
          </button>
        </div>
        <QuizRecord kind={kind} />
      </div>
    )
  }

  if (phase === 'summary') {
    return (
      <StudySessionFrame title="Guess the Track complete" subtitle={`${source === 'theme' ? 'Anime Themes' : 'Music Library'} broadcast`}>
        <div className="text-center">
          <p className="text-6xl font-bold tabular-nums text-white">{score}</p>
          <p className="mt-1 text-sm uppercase tracking-wide text-gray-500">points out of 30</p>
          <p className="mt-4 text-gray-300">Solved {solved} of 5 tracks.</p>
          {newBest && <p className="mt-3 text-sm font-semibold text-accent">New personal best.</p>}
          {saveState === 'saving' && <p className="mt-3 text-sm text-gray-400">Saving session…</p>}
          {saveState === 'failed' && <p className="mt-3 text-sm text-red-400">Session was not saved.</p>}
        </div>
        <div className="mt-7 divide-y divide-base-700 border-y border-base-700 text-left">
          {results.map((result, index) => (
            <div key={`${result.recordingKey}-${index}`} className="flex items-center gap-4 py-3 text-sm">
              <span className="w-6 text-gray-500 tabular-nums">{index + 1}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-white">{result.title}</p>
                <p className="truncate text-gray-500">{result.performer}</p>
              </div>
              <span className="text-gray-400">{result.solved ? `${result.points} pts` : 'Missed'}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex gap-2">
          <button className="btn-primary flex-1" onClick={() => setPhase('setup')}>Play again</button>
          <Link to="/quiz" className="btn-ghost flex-1 text-center">Quiz Home</Link>
        </div>
      </StudySessionFrame>
    )
  }

  const revealed = round.status !== 'playing'
  const entry = activeEntryRef.current
  return (
    <StudySessionFrame
      title="Guess the Track"
      subtitle={`Track ${questionIndex + 1} of 5 · ${score} points`}
      progress={{ current: questionIndex, total: GUESS_TRACK_ROUND_LENGTH, label: 'Mystery tracks' }}
      actions={<span className="pill">Attempt {Math.min(round.attempts.length + 1, 6)} of 6</span>}
      rail={
        <>
          <SessionEvidence title="Attempt history">
            <ol className="space-y-2">
              {GUESS_TRACK_CLIP_SECONDS.map((seconds, index) => {
                const attempt = round.attempts[index]
                return (
                  <li key={seconds} className="flex items-start justify-between gap-3">
                    <span>{seconds}s clip</span>
                    <span className={attempt ? 'text-gray-300' : 'text-gray-600'}>
                      {attempt?.label ??
                        (round.status === 'playing' && index === round.attempts.length
                          ? 'Ready'
                          : 'Locked')}
                    </span>
                  </li>
                )
              })}
            </ol>
          </SessionEvidence>
          <SessionEvidence title="Scoring">
            This track is currently worth {round.status === 'playing' ? 6 - round.attempts.length : round.points} points.
            Replaying the unlocked clip is free.
          </SessionEvidence>
        </>
      }
      feedback={
        feedback ? (
          <SessionFeedback
            tone={round.status === 'correct' ? 'correct' : round.status === 'failed' ? 'incorrect' : 'neutral'}
            title={feedback}
          />
        ) : null
      }
    >
      {audioNotice && <p className="mb-4 text-sm text-amber-300">{audioNotice}</p>}
      {error ? (
        <div className="py-10 text-center">
          <p className="text-red-400">{error}</p>
          <button className="btn-primary mt-5" onClick={() => setPhase('setup')}>Return to setup</button>
        </div>
      ) : audioLoading || !current || !entry ? (
        <div className="py-16 text-center text-gray-400">Resolving playable audio…</div>
      ) : revealed ? (
        <div className="grid gap-7 md:grid-cols-[220px_minmax(0,1fr)] md:items-center">
          <CoverImage
            path={entry.coverPath}
            alt={entry.title}
            fallback={source === 'music' ? 'music' : 'initial'}
            className={`${source === 'music' ? 'aspect-square' : 'aspect-[2/3]'} w-full`}
          />
          <div className="min-w-0">
            <p className={round.status === 'correct' ? 'text-sm font-semibold text-green-400' : 'text-sm font-semibold text-red-400'}>
              {round.status === 'correct' ? 'Track identified' : 'Track missed'}
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white text-balance">{entry.title}</h2>
            <p className="mt-2 text-lg text-gray-300">{entry.performer}</p>
            <p className="mt-1 text-sm text-gray-500">{entry.context}</p>
            {current.entries.length > 1 && source === 'theme' && (
              <p className="mt-3 text-sm text-gray-400">
                Also valid for {current.entries.map((item) => item.context).filter((value, index, all) => all.indexOf(value) === index).join(', ')}.
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-2">
              <button className="btn-ghost" onClick={replayCurrentClip}>Restart full track</button>
              <button className="btn-primary" onClick={continueAfterReveal}>
                {questionIndex + 1 >= GUESS_TRACK_ROUND_LENGTH ? 'See results' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6" aria-label="Clip duration stages">
            {GUESS_TRACK_CLIP_SECONDS.map((seconds, index) => {
              const active = index === round.attempts.length
              const unlocked = index <= round.attempts.length
              return (
                <div
                  key={seconds}
                  className={`rounded-md border px-2 py-3 text-center transition-colors ${
                    active
                      ? 'border-accent bg-accent/10 text-accent'
                      : unlocked
                        ? 'border-base-500 bg-base-700 text-gray-300'
                        : 'border-base-700 bg-base-800 text-gray-600'
                  }`}
                >
                  <span className="block text-lg font-semibold tabular-nums">{seconds}</span>
                  <span className="text-[10px] uppercase tracking-wide">seconds</span>
                </div>
              )
            })}
          </div>

          <button
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-lg border border-accent bg-base-800 px-6 py-7 text-lg font-semibold text-white transition-colors hover:bg-base-700 disabled:opacity-50"
            onClick={replayCurrentClip}
            disabled={audioLoading}
          >
            <PlayIcon />
            Replay {guessTrackClipSeconds(round)} second clip
          </button>

          {guessTrackHintVisible(round) && (
            <div className="mt-5 rounded-md border border-base-600 bg-base-800/60 p-4 text-sm text-gray-300">
              {source === 'theme'
                ? `Performer: ${entry.performer}`
                : `Primary artist starts with “${guessTrackArtistInitial(entry.performer)}”.`}
            </div>
          )}

          <div className="relative mt-6">
            <label htmlFor="guess-track-answer" className="label mb-2 block">Search your answer</label>
            <input
              id="guess-track-answer"
              className="input w-full"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={suggestionsOpen}
              aria-controls="guess-track-suggestions"
              aria-activedescendant={suggestionsOpen && suggestions[activeSuggestion] ? `guess-track-option-${suggestions[activeSuggestion].key}` : undefined}
              autoComplete="off"
              value={query}
              placeholder={source === 'theme' ? 'Song or anime title' : 'Song or artist'}
              onFocus={() => setSuggestionsOpen(true)}
              onChange={(event) => {
                setQuery(event.target.value)
                setSelected(null)
                setSuggestionsOpen(true)
                setActiveSuggestion(0)
              }}
              onKeyDown={onAnswerKeyDown}
            />
            {suggestionsOpen && suggestions.length > 0 && (
              <ul
                id="guess-track-suggestions"
                role="listbox"
                className="absolute z-20 mt-1 max-h-72 w-full overflow-y-auto rounded-md border border-base-600 bg-base-800 py-1 shadow-lg"
              >
                {suggestions.map((suggestion, index) => (
                  <li
                    id={`guess-track-option-${suggestion.key}`}
                    key={suggestion.key}
                    role="option"
                    aria-selected={index === activeSuggestion}
                  >
                    <button
                      type="button"
                      className={`w-full px-4 py-3 text-left text-sm ${index === activeSuggestion ? 'bg-base-600 text-white' : 'text-gray-300 hover:bg-base-700'}`}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => selectSuggestion(suggestion)}
                    >
                      {suggestion.answerLabel}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-5 flex gap-2">
            <button className="btn-ghost flex-1" onClick={skipAttempt}>Skip</button>
            <button className="btn-primary flex-1" disabled={!selected} onClick={submitAnswer}>Submit answer</button>
          </div>
        </>
      )}
    </StudySessionFrame>
  )
}
