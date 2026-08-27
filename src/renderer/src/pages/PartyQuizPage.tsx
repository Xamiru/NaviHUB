import { useEffect, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import StudySessionFrame from '../components/StudySessionFrame'
import { Group, Pill } from '../components/PillGroup'
import CoverImage from '../components/CoverImage'
import ChronologyOrder from '../components/quiz/ChronologyOrder'
import HigherLowerRound from '../components/quiz/HigherLowerRound'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useAllCompletedStatuses } from '../lib/hooks'
import { usePlayer } from '../lib/player'
import { mediaUrl } from '@shared/mediaUrl'
import { balancedDeal, quizSeed, seededRng } from '@shared/quizCore'
import { advanceParty, answerParty, createPartyState, partyResult, type PartyQuizState } from '@shared/partyQuiz'
import { pickDistractors } from '@shared/quizDistractors'
import { buildCastQuizQuestions } from '@shared/castQuiz'
import { buildVaQuizQuestions, vaAppearanceKey } from '@shared/vaQuiz'
import { buildSynopsisQuizQuestions } from '@shared/synopsisQuiz'
import { buildMangaPanelQuestions } from '@shared/mangaPanelQuiz'
import { IMAGE_REVEAL_STAGE_SECONDS, imageRevealStageStyle } from '@shared/imageRevealQuiz'
import { SILHOUETTE_STYLE } from '@shared/silhouetteQuiz'
import { HIGHER_LOWER_MEDIA_TYPES, higherLowerCopy } from '@shared/higherLowerQuiz'
import type {
  MediaType,
  QuizChallengeKind,
  QuizConsumptionScope,
  QuizHigherLowerMetric,
  QuizHigherLowerQuestion,
  QuizKind,
  QuizPartyParticipants,
  QuizSong
} from '@shared/types'

interface PartyChoice { key: string; label: string; imagePath?: string | null }
interface PartyQuestion {
  id: string
  prompt: string
  choices: PartyChoice[]
  validKeys: string[]
  imagePath?: string | null
  audio?: QuizSong
  ordered?: boolean
  reveal?: string
  titlePair?: PartyChoice[]
  chronologyEntries?: Array<PartyChoice & { releaseDate: string }>
  connectionLabel?: string
  higherLower?: QuizHigherLowerQuestion
}

type PartyGame = 'songRelay' | 'cast' | 'va' | 'synopsis' | 'mangaPanel' | QuizChallengeKind
const GAMES: Array<{ kind: PartyGame; label: string }> = [
  { kind: 'songRelay', label: 'Song Relay' },
  { kind: 'cast', label: 'Cast' },
  { kind: 'va', label: 'Voice Actor' },
  { kind: 'synopsis', label: 'Synopsis' },
  { kind: 'mangaPanel', label: 'Manga Panels' },
  { kind: 'imageReveal', label: 'Image Reveal' },
  { kind: 'silhouette', label: 'Silhouette' },
  { kind: 'connections', label: 'Connections' },
  { kind: 'chronology', label: 'Chronology' },
  { kind: 'higherLower', label: 'Higher / Lower' }
]

function shuffleWith<T>(items: T[], rng: () => number): T[] {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export default function PartyQuizPage() {
  const completedStatuses = useAllCompletedStatuses()
  const player = usePlayer()
  const qc = useQueryClient()
  const [participants, setParticipants] = useState<QuizPartyParticipants>(2)
  const [kind, setKind] = useState<PartyGame>('songRelay')
  const [scope, setScope] = useState<QuizConsumptionScope>('consumed')
  const [higherLowerMediaType, setHigherLowerMediaType] = useState<MediaType>('anime')
  const [higherLowerMetric, setHigherLowerMetric] = useState<QuizHigherLowerMetric>('releaseDate')
  const [questions, setQuestions] = useState<PartyQuestion[]>([])
  const [state, setState] = useState<PartyQuizState | null>(null)
  const [picked, setPicked] = useState<string | null>(null)
  const [order, setOrder] = useState<string[]>([])
  const [remaining, setRemaining] = useState(20)
  const [imageReady, setImageReady] = useState(true)
  const [revealStage, setRevealStage] = useState(0)
  const [seed, setSeed] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'failed'>('idle')
  const lockRef = useRef(false)
  const loggedRef = useRef(false)
  const audioSeq = useRef(0)
  const spareIndexRef = useRef(0)

  const question = state ? questions[state.question] : null

  function stopQuizAudio() {
    audioSeq.current += 1
    if (player.track?.id.startsWith('quiz-')) player.stop()
  }

  async function playSong(song: QuizSong) {
    const request = ++audioSeq.current
    const src = song.audioPath ? await api.files.resolveUrl(song.audioPath) : song.audioUrl
    if (request !== audioSeq.current || !src) return
    player.play({ id: `quiz-${song.themeId}`, src, title: 'Song Quiz', subtitle: null, context: '???', coverPath: null, mediaId: null })
  }

  useEffect(() => () => stopQuizAudio(), [])
  useEffect(() => {
    if (!question?.audio || !state || state.phase === 'reveal' || state.phase === 'done') return
    void playSong(question.audio)
    const clip = window.setTimeout(() => {
      if (player.track?.id.startsWith('quiz-') && player.isPlaying) player.toggle()
    }, 10_000)
    return () => window.clearTimeout(clip)
    // One identical ten-second clip for owner and steal attempts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.question, state?.phase])

  function mediaChoices<T extends { mediaId: number; mediaTitle?: string; title?: string | null; coverPath: string | null }>(
    seedItem: T,
    pool: T[],
    rng: () => number,
    forbidden: number[] = []
  ): PartyChoice[] {
    return shuffleWith([seedItem, ...pickDistractors(pool as never[], seedItem as never, 3, forbidden) as T[]], rng).map((x) => ({
      key: String(x.mediaId), label: x.mediaTitle ?? x.title ?? '', imagePath: x.coverPath
    }))
  }

  async function loadQuestions(nextSeed: number, count: number): Promise<PartyQuestion[]> {
    const rng = seededRng(nextSeed)
    const statuses = scope === 'consumed' ? completedStatuses : null
    if (kind === 'songRelay') {
      const pool = await api.quiz.songPool({ statuses })
      const distinct = new Set(pool.map((x) => x.mediaId))
      if (distinct.size < 4) return []
      return balancedDeal(pool, count, (x) => x.mediaId, rng).map((song, i) => ({
        id: `relay-${song.themeId}-${i}`,
        prompt: 'Which title is this theme from?',
        audio: song,
        validKeys: [String(song.mediaId)],
        choices: mediaChoices(
          { ...song, mediaTitle: song.animeTitle },
          shuffleWith(pool, rng).map((item) => ({ ...item, mediaTitle: item.animeTitle })),
          rng,
          [song.mediaId]
        )
      }))
    }
    if (kind === 'cast') {
      const filter = { statuses }
      const pool = await qc.fetchQuery({
        queryKey: qk.quiz.castPool(filter),
        queryFn: () => api.quiz.castPool(filter)
      })
      return buildCastQuizQuestions(pool, count, nextSeed).map((question) => ({
        id: question.key,
        prompt: `Which movie or TV show features ${question.actor.personName}?`,
        imagePath: question.actor.photoPath ?? undefined,
        validKeys: question.validKeys,
        choices: question.options.map((option) => ({
          key: `media-${option.mediaId}`,
          label: option.mediaTitle,
          imagePath: option.coverPath
        }))
      }))
    }
    if (kind === 'va') {
      const filter = { statuses }
      const pool = await qc.fetchQuery({
        queryKey: qk.quiz.vaPool(filter),
        queryFn: () => api.quiz.vaPool(filter)
      })
      return buildVaQuizQuestions(pool, count, nextSeed).map((item) => ({
        id: item.key,
        prompt: `Which character shares a Japanese voice actor with ${item.source.characterName} from ${item.source.mediaTitle}?`,
        imagePath: item.source.characterImagePath,
        validKeys: item.validKeys,
        choices: item.options.map((option) => ({
          key: vaAppearanceKey(option),
          label: `${option.characterName} · ${option.mediaTitle}`,
          imagePath: option.characterImagePath
        })),
        reveal: `${item.source.characterName} and ${item.answer.characterName} are voiced by ${item.sharedPersonNames.join(' and ')}.`
      }))
    }
    if (kind === 'synopsis') {
      const filter = {
        completedStatuses,
        includeSafeUnseen: true,
        mediaTypes: ['anime', 'movie', 'tv'],
        requireCover: true
      }
      const pool = await qc.fetchQuery({
        queryKey: qk.quiz.synopsisPool(filter),
        queryFn: () => api.quiz.synopsisPool(filter)
      })
      return buildSynopsisQuizQuestions(pool, count, nextSeed).map((item) => ({
        id: item.key,
        prompt: item.excerpt,
        validKeys: item.validKeys,
        choices: item.options.map((option) => ({
          key: `media-${option.mediaId}`,
          label: option.title,
          imagePath: option.coverPath
        })),
        reveal: item.answer.title
      }))
    }
    if (kind === 'mangaPanel') {
      const requested = count + 10
      const filter = { scope, seed: nextSeed }
      const pool = await qc.fetchQuery({
        queryKey: qk.quiz.mangaPanelPool(filter, requested),
        queryFn: () => api.quiz.mangaPanelPool(filter, requested)
      })
      return buildMangaPanelQuestions(pool, nextSeed).map((item) => ({
        id: item.key,
        prompt: 'Which manga is this page from?',
        imagePath: item.answer.pageRelPath,
        validKeys: item.validKeys,
        choices: item.options.map((option) => ({
          key: `media-${option.mediaId}`,
          label: option.title,
          imagePath: option.coverPath
        }))
      }))
    }
    const request = {
      kind,
      seed: nextSeed,
      scope,
      statuses,
      length: kind === 'imageReveal' || kind === 'silhouette' ? count + 10 : count,
      options: {
        imageSource: 'covers',
        silhouetteMode: 'character',
        higherLowerMetric,
        higherLowerMediaType,
        higherLowerIndependent: kind === 'higherLower'
      }
    } as const
    const pool = await qc.fetchQuery({
      queryKey: qk.quiz.challengePool(request),
      queryFn: () => api.quiz.challengePool(request)
    })
    return pool.map((item) => ({
      id: item.id,
      prompt: item.prompt,
      imagePath: 'imagePath' in item ? item.imagePath : undefined,
      choices: item.kind === 'imageReveal' || item.kind === 'silhouette'
        ? item.choices.map((choice) => ({ key: choice.key, label: choice.label }))
        : item.choices,
      validKeys: item.validKeys,
      ordered: item.kind === 'chronology',
      titlePair: item.kind === 'connections' ? [item.titleA, item.titleB] : undefined,
      chronologyEntries: item.kind === 'chronology' ? item.entries : undefined,
      connectionLabel: item.kind === 'chronology' ? item.connectionLabel : undefined,
      higherLower: item.kind === 'higherLower' ? item : undefined,
      reveal: item.kind === 'connections' || item.kind === 'silhouette'
        ? item.reveal
        : undefined
    }))
  }

  async function start() {
    setLoading(true)
    setError(null)
    try {
      const nextSeed = quizSeed(`${Date.now()}-${Math.random()}`)
      const initial = createPartyState(participants)
      const loaded = await loadQuestions(nextSeed, initial.questionCount)
      if (loaded.length < initial.questionCount) {
        setError(`This format can deal ${loaded.length} safe questions; ${initial.questionCount} are required for this party size.`)
        return
      }
      setQuestions(loaded)
      setState(initial)
      setSeed(nextSeed)
      setPicked(null)
      setOrder(loaded[0].ordered ? loaded[0].choices.map((c) => c.key) : [])
      setRemaining(kind === 'chronology' ? 30 : 20)
      setImageReady(kind !== 'mangaPanel' && kind !== 'imageReveal' && kind !== 'silhouette')
      setRevealStage(0)
      spareIndexRef.current = initial.questionCount
      lockRef.current = false
      loggedRef.current = false
      setSaveState('idle')
    } finally {
      setLoading(false)
    }
  }

  function answer(key: string, exactOverride?: boolean) {
    if (
      !state ||
      !question ||
      lockRef.current ||
      ((kind === 'mangaPanel' || kind === 'imageReveal' || kind === 'silhouette') && !imageReady) ||
      (state.phase !== 'owner' && state.phase !== 'steal')
    ) return
    lockRef.current = true
    stopQuizAudio()
    const correct = exactOverride ?? question.validKeys.includes(key)
    setPicked(key)
    setState(answerParty(state, correct))
  }

  function next() {
    if (!state) return
    const nextState = advanceParty(state)
    setState(nextState)
    if (nextState.phase === 'done') {
      void save(nextState)
      return
    }
    const nextQuestion = questions[nextState.question]
    setPicked(null)
    setOrder(nextQuestion.ordered ? nextQuestion.choices.map((c) => c.key) : [])
    setRemaining(kind === 'chronology' ? 30 : 20)
    setImageReady(kind !== 'mangaPanel' && kind !== 'imageReveal' && kind !== 'silhouette')
    setRevealStage(0)
    lockRef.current = false
  }

  function replaceBrokenQuizImage() {
    if (!state || (kind !== 'mangaPanel' && kind !== 'imageReveal' && kind !== 'silhouette')) return
    const replacement = questions[spareIndexRef.current]
    spareIndexRef.current += 1
    if (!replacement) {
      setState(null)
      setError('Too many quiz images could not be opened. The party round was cancelled without saving scores.')
      return
    }
    setImageReady(false)
    setRevealStage(0)
    setRemaining(20)
    setQuestions((current) => {
      const nextQuestions = [...current]
      nextQuestions[state.question] = replacement
      return nextQuestions
    })
  }

  async function save(finalState: PartyQuizState) {
    if (loggedRef.current) return
    loggedRef.current = true
    setSaveState('saving')
    const result = partyResult(finalState, kind as QuizKind, scope, seed)
    try {
      await api.quiz.logSession({
        kind: kind as QuizKind,
        score: Math.max(...finalState.scores),
        total: finalState.questionCount,
        bestStreak: 0,
        settings: {
          ...result,
          playMode: 'party',
          scorePolicy: 'party',
          ...(kind === 'higherLower' ? { higherLowerMetric, higherLowerMediaType } : {})
        }
      })
      await qc.invalidateQueries({ queryKey: qk.quiz.history(kind as QuizKind, 'party') })
      setSaveState('saved')
    } catch (error) {
      loggedRef.current = false
      setSaveState('failed')
      throw error
    }
  }

  useEffect(() => {
    if (
      !state ||
      state.phase === 'reveal' ||
      state.phase === 'done' ||
      ((kind === 'mangaPanel' || kind === 'imageReveal' || kind === 'silhouette') && !imageReady)
    ) return
    lockRef.current = false
    setRemaining(state.phase === 'steal' ? 5 : kind === 'chronology' ? 30 : 20)
    const id = window.setInterval(() => setRemaining((n) => Math.max(0, n - 1)), 1000)
    return () => window.clearInterval(id)
  }, [state?.question, state?.phase, kind, imageReady])

  useEffect(() => {
    if (
      remaining === 0 &&
      state &&
      (kind !== 'mangaPanel' && kind !== 'imageReveal' && kind !== 'silhouette' || imageReady) &&
      (state.phase === 'owner' || state.phase === 'steal')
    ) {
      lockRef.current = false
      answer('__timeout__', false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining])

  useEffect(() => {
    if (
      kind !== 'imageReveal' ||
      !state ||
      state.phase === 'reveal' ||
      state.phase === 'done' ||
      !imageReady
    ) return
    const id = window.setInterval(
      () => setRevealStage((current) => Math.min(3, current + 1)),
      IMAGE_REVEAL_STAGE_SECONDS * 1000
    )
    return () => window.clearInterval(id)
  }, [kind, state?.question, state?.phase, imageReady])

  if (!state) return <div className="p-6 max-w-4xl mx-auto">
    <PageHeader back={{ to: '/quiz', label: 'Quiz' }} title="Party" subtitle="Pass the controls: equal owner turns, then one five-second steal." />
    <div className="card space-y-6 p-6">
      <Group label="Sides">
        <Pill active={participants === 2} onClick={() => setParticipants(2)} label="Player 1–2" />
        <Pill active={participants === 3} onClick={() => setParticipants(3)} label="Player 1–3" />
        <Pill active={participants === 4} onClick={() => setParticipants(4)} label="Player 1–4" />
        <Pill active={participants === 'teams'} onClick={() => setParticipants('teams')} label="Team A/B" />
      </Group>
      <Group label="Game">{GAMES.map((game) => <Pill key={game.kind} active={kind === game.kind} onClick={() => setKind(game.kind)} label={game.label} />)}</Group>
      {kind === 'higherLower' && <Group label="Category">{HIGHER_LOWER_MEDIA_TYPES.map((option) => <Pill key={option.key} active={higherLowerMediaType === option.key} onClick={() => setHigherLowerMediaType(option.key)} label={option.label} />)}</Group>}
      {kind === 'higherLower' && <Group label="Question"><Pill active={higherLowerMetric === 'releaseDate'} onClick={() => setHigherLowerMetric('releaseDate')} label={higherLowerCopy(higherLowerMediaType, 'releaseDate').setupLabel} /><Pill active={higherLowerMetric === 'totalUnits'} onClick={() => setHigherLowerMetric('totalUnits')} label={higherLowerCopy(higherLowerMediaType, 'totalUnits').setupLabel} /><Pill active={higherLowerMetric === 'personalScore'} onClick={() => setHigherLowerMetric('personalScore')} label={higherLowerCopy(higherLowerMediaType, 'personalScore').setupLabel} /></Group>}
      <Group label="Library scope"><Pill active={scope === 'consumed'} onClick={() => setScope('consumed')} label="Completed only" /><Pill active={scope === 'all'} onClick={() => setScope('all')} label="All library" /></Group>
      {scope === 'all' && <p className="text-sm text-amber-300">Includes in-progress or unseen content and may contain spoilers.</p>}
      <p className="text-sm text-gray-400">Each side owns five questions. Owner answers are worth 2; the next side can steal a miss for 1.</p>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button className="btn-primary w-full py-3" disabled={loading} onClick={() => void start()}>{loading ? 'Dealing…' : 'Start party'}</button>
    </div>
  </div>

  if (state.phase === 'done') {
    const result = partyResult(state, kind as QuizKind, scope, seed)
    return <StudySessionFrame title="Party complete" subtitle={result.winners.length > 1 ? `Tie: ${result.winners.join(' and ')}` : `${result.winners[0]} wins`} surface={false}>
      <div className="card mx-auto max-w-xl p-7"><div className="space-y-3">{result.scores.map((score) => <div key={score.label} className="flex justify-between rounded-md bg-base-800 p-4"><span>{score.label}</span><span className="font-semibold text-accent">{score.score}</span></div>)}</div>{saveState === 'saving' && <p className="mt-4 text-center text-sm text-gray-400">Saving party summary…</p>}{saveState === 'failed' && <button className="btn-danger mt-4 w-full" onClick={() => void save(state)}>Retry saving summary</button>}<button className="btn-primary mt-6 w-full" onClick={() => setState(null)}>New party</button></div>
    </StudySessionFrame>
  }

  if (!question) return null
  const actor = state.phase === 'steal' ? state.labels[state.stealSide!] : state.labels[state.owner]
  return <StudySessionFrame title={`${actor}'s ${state.phase === 'steal' ? 'steal' : 'question'}`} subtitle={`Question ${state.question + 1}/${state.questionCount} · ${remaining}s`} surface={false}>
    <div className="mb-4 grid gap-2 sm:grid-cols-4">{state.labels.map((label, i) => <div key={label} className={`rounded-md border p-3 ${i === state.owner ? 'border-accent' : 'border-base-700'}`}><p className="text-xs text-gray-500">{label}</p><p className="text-xl font-semibold">{state.scores[i]}</p></div>)}</div>
    <div className="card mx-auto max-w-4xl p-6">
      {!question.higherLower && <p className="mb-5 text-center text-xl font-semibold">{question.prompt}</p>}
      {question.titlePair && <div className="mx-auto mb-6 grid max-w-xl grid-cols-2 gap-4">{question.titlePair.map((title) => <div key={title.key} className="text-center"><CoverImage path={title.imagePath} alt={title.label} className="mx-auto aspect-[2/3] max-h-52" /><p className="mt-2 text-sm font-medium text-gray-300">{title.label}</p></div>)}</div>}
      {question.audio && <button className="btn-ghost mx-auto mb-5 block" onClick={() => void playSong(question.audio!)}>Replay clip</button>}
      {question.imagePath && <div className="mx-auto mb-6 max-h-[52vh] max-w-full overflow-hidden rounded-md"><img key={question.id} src={mediaUrl(question.imagePath) ?? undefined} alt="Quiz prompt" className={`mx-auto max-h-[52vh] max-w-full object-contain ${imageReady ? 'transition-all duration-700' : ''}`} style={state.phase !== 'reveal' ? kind === 'imageReveal' ? imageRevealStageStyle(revealStage) : kind === 'silhouette' ? SILHOUETTE_STYLE : undefined : undefined} onLoad={() => setImageReady(true)} onError={replaceBrokenQuizImage} /></div>}
      {(kind === 'mangaPanel' || kind === 'imageReveal' || kind === 'silhouette') && !imageReady && <p className="mb-5 text-center text-sm text-gray-400">Loading {kind === 'mangaPanel' ? 'panel' : kind === 'silhouette' ? 'portrait' : 'image'}…</p>}
      {kind === 'imageReveal' && imageReady && state.phase !== 'reveal' && <p className="mb-5 text-center text-sm text-gray-400">Stage {revealStage + 1}/4</p>}
      {question.higherLower ? <HigherLowerRound question={question.higherLower} answered={state.phase === 'reveal'} selected={picked} disabled={state.phase === 'reveal'} onAnswer={answer} /> : question.ordered ? <div><ChronologyOrder order={order} choices={question.choices} disabled={state.phase === 'reveal'} onChange={setOrder} />{state.phase !== 'reveal' && <button className="btn-primary mt-4 w-full" onClick={() => answer(order[0], order.join('|') === question.validKeys.join('|'))}>Lock order</button>}</div> : <div className="grid gap-3 sm:grid-cols-2">{question.choices.map((choice) => <button key={choice.key} disabled={state.phase === 'reveal' || ((kind === 'mangaPanel' || kind === 'imageReveal' || kind === 'silhouette') && !imageReady)} className={`flex items-center gap-3 rounded-md border p-4 text-left ${state.phase === 'reveal' && question.validKeys.includes(choice.key) ? 'border-green-500 bg-green-500/10' : picked === choice.key ? 'border-red-500' : 'border-base-600 bg-base-800 hover:border-accent'}`} onClick={() => answer(choice.key)}>{choice.imagePath && <CoverImage path={choice.imagePath} alt={choice.label} className="h-20 w-14 shrink-0" />}<span>{choice.label}</span></button>)}</div>}
      {state.phase === 'reveal' && <div className="mt-5 text-center">{question.chronologyEntries ? <div className="rounded-md border border-base-700 bg-base-900/40 p-4 text-left"><p className="text-sm font-medium text-accent">{question.connectionLabel}</p><p className="mt-1 text-xs text-gray-400">Correct order</p><div className="mt-3 grid gap-2 sm:grid-cols-2">{question.validKeys.map((key, position) => { const entry = question.chronologyEntries!.find((item) => item.key === key)!; return <div key={key} className="flex items-center gap-3 rounded-md bg-base-800 p-2"><span className="w-5 text-center text-sm font-semibold text-accent">{position + 1}</span><CoverImage path={entry.imagePath} alt="" className="h-16 w-11 shrink-0" /><div className="min-w-0"><p className="text-sm font-medium text-gray-200">{entry.label}</p><p className="mt-0.5 text-xs tabular-nums text-gray-400">{entry.releaseDate.slice(0, 4)}</p></div></div> })}</div></div> : !question.higherLower ? <p className="text-sm text-gray-400">{question.reveal ?? `Answer: ${question.choices.find((x) => question.validKeys.includes(x.key))?.label}`}</p> : null}<button className="btn-primary mt-4 px-8" onClick={next}>Continue</button></div>}
    </div>
  </StudySessionFrame>
}
