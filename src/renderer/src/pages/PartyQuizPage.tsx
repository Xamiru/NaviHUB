import { useEffect, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import StudySessionFrame from '../components/StudySessionFrame'
import { Group, Pill } from '../components/PillGroup'
import CoverImage from '../components/CoverImage'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useAllCompletedStatuses, useStatuses } from '../lib/hooks'
import { usePlayer } from '../lib/player'
import { MANGA } from '../lib/mediaConfig'
import { mediaUrl } from '@shared/mediaUrl'
import { balancedDeal, quizSeed, seededRng } from '@shared/quizCore'
import { advanceParty, answerParty, createPartyState, partyResult, type PartyQuizState } from '@shared/partyQuiz'
import { pickDistractors } from '@shared/quizDistractors'
import { synopsisExcerpt } from '@shared/quizText'
import type {
  QuizChallengeKind,
  QuizConsumptionScope,
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
}

type PartyGame = 'songRelay' | 'character' | 'va' | 'synopsis' | 'mangaPanel' | QuizChallengeKind
const GAMES: Array<{ kind: PartyGame; label: string }> = [
  { kind: 'songRelay', label: 'Song Relay' },
  { kind: 'character', label: 'Character' },
  { kind: 'va', label: 'Voice Actor' },
  { kind: 'synopsis', label: 'Synopsis' },
  { kind: 'mangaPanel', label: 'Manga Panels' },
  { kind: 'imageReveal', label: 'Image Reveal' },
  { kind: 'silhouette', label: 'Silhouette' },
  { kind: 'connections', label: 'Connections' },
  { kind: 'chronology', label: 'Chronology' },
  { kind: 'oddOneOut', label: 'Odd One Out' },
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
  const mangaStatuses = useStatuses(MANGA)
  const player = usePlayer()
  const qc = useQueryClient()
  const [participants, setParticipants] = useState<QuizPartyParticipants>(2)
  const [kind, setKind] = useState<PartyGame>('songRelay')
  const [scope, setScope] = useState<QuizConsumptionScope>('consumed')
  const [questions, setQuestions] = useState<PartyQuestion[]>([])
  const [state, setState] = useState<PartyQuizState | null>(null)
  const [picked, setPicked] = useState<string | null>(null)
  const [order, setOrder] = useState<string[]>([])
  const [remaining, setRemaining] = useState(20)
  const [seed, setSeed] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'failed'>('idle')
  const lockRef = useRef(false)
  const loggedRef = useRef(false)
  const audioSeq = useRef(0)

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
    if (kind === 'character') {
      const pool = await api.quiz.characterPool({ statuses })
      return balancedDeal(pool, count, (x) => x.mediaId, rng).map((item, i) => ({
        id: `character-${item.characterId}-${i}`,
        prompt: `Which title features ${item.name}?`,
        imagePath: item.imagePath,
        validKeys: item.validMediaIds.map(String),
        choices: mediaChoices(item, pool, rng, item.validMediaIds)
      }))
    }
    if (kind === 'va') {
      const pool = await api.quiz.vaPool({ statuses })
      return balancedDeal(pool, count, (x) => x.personId, rng).map((item, i) => {
        const valid = new Set(item.validPersonIds)
        const wrong = shuffleWith(pool.filter((x) => !valid.has(x.personId)), rng).filter((x, n, all) => all.findIndex((y) => y.personId === x.personId) === n).slice(0, 3)
        return {
          id: `va-${item.mediaId}-${item.characterId}-${i}`,
          prompt: `Who voices ${item.characterName} in ${item.mediaTitle}?`,
          imagePath: item.characterImagePath,
          validKeys: item.validPersonIds.map(String),
          choices: shuffleWith([{ key: String(item.personId), label: item.personName }, ...wrong.map((x) => ({ key: String(x.personId), label: x.personName }))], rng)
        }
      })
    }
    if (kind === 'synopsis') {
      const pool = await api.quiz.synopsisPool({ statuses })
      return balancedDeal(pool, count, (x) => x.mediaId, rng).map((item, i) => ({
        id: `synopsis-${item.mediaId}-${i}`,
        prompt: synopsisExcerpt(item.synopsis, [item.title, item.titleOriginal], 360),
        validKeys: [String(item.mediaId)],
        choices: mediaChoices(item, pool, rng)
      }))
    }
    if (kind === 'mangaPanel') {
      const pool = await api.quiz.mangaPanelPool({ statuses: scope === 'consumed' ? [mangaStatuses[1]].filter(Boolean) : null, scope }, count)
      return pool.map((item, i) => ({
        id: `panel-${item.mediaId}-${i}`,
        prompt: 'Which manga is this page from?',
        imagePath: item.pageRelPath,
        validKeys: [String(item.mediaId)],
        choices: mediaChoices({ ...item, mediaTitle: item.title }, pool.map((x) => ({ ...x, mediaTitle: x.title })), rng)
      }))
    }
    const request = {
      kind,
      seed: nextSeed,
      scope,
      statuses,
      length: count,
      options: { imageSource: 'covers', silhouetteMode: 'character', connectionMode: 'person', higherLowerMetric: 'releaseDate' }
    } as const
    const pool = await qc.fetchQuery({
      queryKey: qk.quiz.challengePool(request),
      queryFn: () => api.quiz.challengePool(request)
    })
    return pool.map((item) => ({
      id: item.id,
      prompt: item.prompt,
      imagePath: 'imagePath' in item ? item.imagePath : undefined,
      choices: item.choices,
      validKeys: item.validKeys,
      ordered: item.kind === 'chronology',
      reveal: item.kind === 'connections' ? item.reveal : item.kind === 'oddOneOut' ? item.explanation : undefined
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
      setRemaining(kind === 'songRelay' ? 20 : 20)
      lockRef.current = false
      loggedRef.current = false
      setSaveState('idle')
    } finally {
      setLoading(false)
    }
  }

  function answer(key: string, exactOverride?: boolean) {
    if (!state || !question || lockRef.current || (state.phase !== 'owner' && state.phase !== 'steal')) return
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
    setRemaining(kind === 'songRelay' ? 20 : 20)
    lockRef.current = false
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
        settings: { ...result, playMode: 'party', scorePolicy: 'party' }
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
    if (!state || state.phase === 'reveal' || state.phase === 'done') return
    lockRef.current = false
    setRemaining(state.phase === 'steal' ? 5 : 20)
    const id = window.setInterval(() => setRemaining((n) => Math.max(0, n - 1)), 1000)
    return () => window.clearInterval(id)
  }, [state?.question, state?.phase])

  useEffect(() => {
    if (remaining === 0 && state && (state.phase === 'owner' || state.phase === 'steal')) {
      lockRef.current = false
      answer('__timeout__', false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining])

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
      <p className="mb-5 text-center text-xl font-semibold">{question.prompt}</p>
      {question.audio && <button className="btn-ghost mx-auto mb-5 block" onClick={() => void playSong(question.audio!)}>Replay clip</button>}
      {question.imagePath && <img src={mediaUrl(question.imagePath) ?? undefined} alt="Quiz prompt" className="mx-auto mb-6 max-h-[52vh] rounded-md object-contain" />}
      {question.ordered ? <div className="space-y-2">{order.map((key, i) => <div key={key} className="flex items-center gap-2 rounded-md bg-base-800 p-3"><span className="flex-1">{question.choices.find((x) => x.key === key)?.label}</span><button className="btn-ghost" disabled={state.phase === 'reveal' || i === 0} onClick={() => setOrder((o) => { const n=[...o]; [n[i-1],n[i]]=[n[i],n[i-1]]; return n })}>Up</button><button className="btn-ghost" disabled={state.phase === 'reveal' || i === order.length - 1} onClick={() => setOrder((o) => { const n=[...o]; [n[i+1],n[i]]=[n[i],n[i+1]]; return n })}>Down</button></div>)}{state.phase !== 'reveal' && <button className="btn-primary w-full" onClick={() => answer(order[0], order.join('|') === question.validKeys.join('|'))}>Lock order</button>}</div> : <div className="grid gap-3 sm:grid-cols-2">{question.choices.map((choice) => <button key={choice.key} disabled={state.phase === 'reveal'} className={`rounded-md border p-4 text-left ${state.phase === 'reveal' && question.validKeys.includes(choice.key) ? 'border-green-500 bg-green-500/10' : picked === choice.key ? 'border-red-500' : 'border-base-600 bg-base-800 hover:border-accent'}`} onClick={() => answer(choice.key)}>{choice.label}</button>)}</div>}
      {state.phase === 'reveal' && <div className="mt-5 text-center"><p className="text-sm text-gray-400">{question.reveal ?? `Answer: ${question.choices.find((x) => question.validKeys.includes(x.key))?.label}`}</p><button className="btn-primary mt-4 px-8" onClick={next}>Continue</button></div>}
    </div>
  </StudySessionFrame>
}
