import { useEffect, useMemo, useRef, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import StudySessionFrame from '../components/StudySessionFrame'
import CoverImage from '../components/CoverImage'
import ChronologyOrder from '../components/quiz/ChronologyOrder'
import HigherLowerRound from '../components/quiz/HigherLowerRound'
import TypedTitleAnswer from '../components/quiz/TypedTitleAnswer'
import { Group, Pill } from '../components/PillGroup'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useAllCompletedStatuses } from '../lib/hooks'
import { mediaUrl } from '@shared/mediaUrl'
import { answerIsCorrect, isNewQuizBest, quizSeed, quizScorePolicy } from '@shared/quizCore'
import {
  IMAGE_REVEAL_STAGES,
  imageRevealStageSeconds,
  imageRevealStageStyle,
  type ImageRevealAnswerMode
} from '@shared/imageRevealQuiz'
import { HIGHER_LOWER_MEDIA_TYPES, higherLowerCopy } from '@shared/higherLowerQuiz'
import { chronologyPlacement } from '@shared/chronologyQuiz'
import type {
  MediaType,
  QuizChallengeKind,
  QuizChallengeQuestion,
  QuizChallengeRequest,
  QuizConsumptionScope,
  QuizHigherLowerMetric,
  QuizKind
} from '@shared/types'
import { useTabLeaveGuard } from '../lib/browserTabs'
import { loadChallengeSetup, saveChallengeSetup, setupOption } from '../lib/challengePrefs'

const LENGTHS = [5, 10, 20] as const
const MEDIA_TYPE_KEYS = HIGHER_LOWER_MEDIA_TYPES.map((option) => option.key)

// One answered question, for the round recap.
interface ChallengeResult {
  question: QuizChallengeQuestion
  pickedLabel: string | null
  correct: boolean
  points: number
  // Chronology: the locked order, for the recap.
  order?: string[]
}

type Phase = 'setup' | 'play' | 'summary'
type StandardChallengeKind = Exclude<
  QuizChallengeKind,
  | 'libraryGrid'
  | 'movieChain'
  | 'libraryle'
  | 'mysteryCareer'
  | 'linkWall'
  | 'footballChampion'
  | 'footballScoreline'
  | 'footballCareerPath'
  | 'footballChronology'
  | 'footballPlayerGrid'
  | 'footballWordle'
  | 'footballLineup'
  | 'footballTransfer'
>

const COPY: Record<StandardChallengeKind, { title: string; subtitle: string }> = {
  imageReveal: { title: 'Image Reveal', subtitle: 'Identify a title as its image resolves in four stages.' },
  connections: { title: 'Connections', subtitle: 'Find the actor or director connecting two movies or TV shows.' },
  chronology: { title: 'Chronology', subtitle: 'Put four connected titles into release order.' },
  higherLower: { title: 'Higher or Lower', subtitle: 'Choose a category and keep a three-life comparison run alive.' }
}

export default function ChallengeQuizPage({ kind }: { kind: StandardChallengeKind }) {
  const completedStatuses = useAllCompletedStatuses()
  const qc = useQueryClient()
  const [phase, setPhase] = useState<Phase>('setup')
  useTabLeaveGuard(phase === 'play', 'run')
  // Setup is remembered per kind across visits (lib/challengePrefs.ts).
  const [stored] = useState(() => loadChallengeSetup(kind))
  const [scope, setScope] = useState<QuizConsumptionScope>(() => setupOption(stored.scope, ['consumed', 'all'] as const, 'consumed'))
  const [timer, setTimer] = useState(() => setupOption(stored.timer, [true, false] as const, true))
  const [imageSource, setImageSource] = useState<'covers' | 'art'>(() => setupOption(stored.imageSource, ['covers', 'art'] as const, 'covers'))
  const [imageMediaType, setImageMediaType] = useState<MediaType | null>(() => setupOption<MediaType | null>(stored.imageMediaType, [null, ...MEDIA_TYPE_KEYS], null))
  const [imageAnswerMode, setImageAnswerMode] = useState<ImageRevealAnswerMode>(() => setupOption(stored.imageAnswerMode, ['choices', 'typed'] as const, 'choices'))
  const [connectionsLength, setConnectionsLength] = useState<5 | 10 | 20>(() => setupOption(stored.connectionsLength, LENGTHS, 10))
  const [chronologyLength, setChronologyLength] = useState<5 | 10 | 20>(() => setupOption(stored.chronologyLength, LENGTHS, 5))
  const [metric, setMetric] = useState<QuizHigherLowerMetric>(() => setupOption(stored.metric, ['releaseDate', 'totalUnits', 'personalScore', 'communityScore'] as const, 'releaseDate'))
  const [higherLowerMediaType, setHigherLowerMediaType] = useState<MediaType>(() => setupOption(stored.higherLowerMediaType, MEDIA_TYPE_KEYS, 'anime'))
  const [imageLength, setImageLength] = useState<5 | 10 | 20>(() => setupOption(stored.imageLength, LENGTHS, 10))
  const [questions, setQuestions] = useState<QuizChallengeQuestion[]>([])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [order, setOrder] = useState<string[]>([])
  const [correct, setCorrect] = useState(0)
  const [points, setPoints] = useState(0)
  const [lives, setLives] = useState(3)
  const [stage, setStage] = useState(0)
  const [remaining, setRemaining] = useState(15)
  const [imageReady, setImageReady] = useState(true)
  const [roundTarget, setRoundTarget] = useState(10)
  const [seed, setSeed] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [loadingNext, setLoadingNext] = useState(false)
  const [newBest, setNewBest] = useState(false)
  const [results, setResults] = useState<ChallengeResult[]>([])
  const lockedRef = useRef(false)
  const loggedRef = useRef(false)
  const spareIndexRef = useRef(0)

  const question = questions[index]
  const answered = selected != null
  const typed = kind === 'imageReveal' && imageAnswerMode === 'typed'
  // Typed rounds rank separately: typing is a different game from 1 of 4.
  // Chronology logs partial-credit points under its own kind (2026-10-14).
  const sessionKind: QuizKind = typed
    ? 'imageRevealTyped'
    : kind === 'chronology'
      ? 'chronologyPoints'
      : kind
  const stageSeconds = imageRevealStageSeconds(imageAnswerMode)
  const revealSeconds = stageSeconds * IMAGE_REVEAL_STAGES.length
  const roundLength = kind === 'imageReveal'
    ? imageLength
      : kind === 'connections'
        ? connectionsLength
      : kind === 'chronology'
        ? chronologyLength
        : 10
  const { data: history } = useQuery({
    queryKey: qk.quiz.history(sessionKind),
    queryFn: () => api.quiz.history(sessionKind)
  })
  const availabilityRequest = useMemo(
    () => ({ scope, statuses: scope === 'consumed' ? completedStatuses : null }),
    [scope, completedStatuses]
  )
  const { data: availability } = useQuery({
    queryKey: qk.quiz.availability(availabilityRequest),
    queryFn: () => api.quiz.availability(availabilityRequest),
    enabled: kind === 'higherLower'
  })

  function higherLowerCount(mediaType: MediaType, selectedMetric = metric): number {
    return availability?.higherLowerOptions.find((option) => option.mediaType === mediaType)?.[
      selectedMetric
    ] ?? 0
  }

  function higherLowerAnyCount(mediaType: MediaType): number {
    const option = availability?.higherLowerOptions.find((item) => item.mediaType === mediaType)
    return option
      ? Math.max(option.releaseDate, option.totalUnits, option.personalScore, option.communityScore)
      : 0
  }

  function requestFor(nextSeed: number): QuizChallengeRequest {
    return {
      kind,
      seed: nextSeed,
      scope,
      statuses: scope === 'consumed' ? completedStatuses : null,
      length: kind === 'higherLower'
        ? 1
        : kind === 'imageReveal'
          ? roundLength + 5
          : roundLength,
      options: {
        imageSource,
        imageMediaType,
        higherLowerMetric: metric,
        higherLowerMediaType
      }
    }
  }

  async function start() {
    setError(null)
    saveChallengeSetup(kind, {
      scope,
      timer,
      imageSource,
      imageMediaType,
      imageAnswerMode,
      connectionsLength,
      chronologyLength,
      metric,
      higherLowerMediaType,
      imageLength,
    })
    const nextSeed = quizSeed(`${Date.now()}-${Math.random()}`)
    const request = requestFor(nextSeed)
    const pool = await qc.fetchQuery({
      queryKey: qk.quiz.challengePool(request),
      queryFn: () => api.quiz.challengePool(request)
    })
    const minimum = kind === 'imageReveal'
      ? roundLength
      : kind === 'connections'
        ? roundLength
      : kind === 'chronology'
        ? roundLength
      : 1
    if (pool.length < minimum) {
      setError('There is not enough eligible library data for this setup. Widen the scope or import more linked metadata.')
      return
    }
    setQuestions(pool)
    setRoundTarget(
      kind === 'imageReveal' || kind === 'connections' || kind === 'chronology'
        ? roundLength
        : kind === 'higherLower'
          ? 1
          : pool.length
    )
    setIndex(0)
    setCorrect(0)
    setPoints(0)
    setLives(3)
    setSelected(null)
    setOrder(pool[0].kind === 'chronology' ? pool[0].choices.map((c) => c.key) : [])
    setStage(0)
    setRemaining(
      pool[0].kind === 'chronology'
        ? 30
        : pool[0].kind === 'imageReveal'
          ? revealSeconds
          : 15
    )
    setImageReady(pool[0].kind !== 'imageReveal')
    setResults([])
    setSeed(nextSeed)
    setNewBest(false)
    setLoadingNext(false)
    lockedRef.current = false
    loggedRef.current = false
    spareIndexRef.current = kind === 'imageReveal' ? roundLength : pool.length
    setPhase('play')
  }

  async function endGame(finalCorrect: number, finalPoints: number, attempted: number) {
    if (loggedRef.current) return
    loggedRef.current = true
    setSaving(true)
    const policy = quizScorePolicy(sessionKind)
    const sessionSettings = {
      correct: finalCorrect,
      attempted,
      scorePolicy: policy,
      playMode: 'solo' as const,
      seed,
      scope,
      timer,
      imageSource,
      imageMediaType,
      imageAnswerMode,
      imageLength,
      connectionsLength,
      chronologyLength,
      metric,
      higherLowerMediaType
    }
    setNewBest(
      isNewQuizBest(
        { score: policy === 'points' ? finalPoints : finalCorrect, total: attempted, settings: sessionSettings },
        history?.best ?? null,
        policy
      )
    )
    try {
      await api.quiz.logSession({
        kind: sessionKind,
        score: policy === 'points' ? finalPoints : finalCorrect,
        total: attempted,
        bestStreak: 0,
        settings: sessionSettings
      })
      await qc.invalidateQueries({ queryKey: qk.quiz.history(sessionKind) })
      setPhase('summary')
    } catch (error) {
      loggedRef.current = false
      throw error
    } finally {
      setSaving(false)
    }
  }

  function submit(key: string, correctOverride?: boolean, pickedLabel?: string) {
    if (
      !question ||
      lockedRef.current ||
      (question.kind === 'imageReveal' && !imageReady)
    ) return
    lockedRef.current = true
    const isCorrect = correctOverride ?? answerIsCorrect(question.validKeys, key)
    const nextCorrect = correct + (isCorrect ? 1 : 0)
    const lockedOrder = question.kind === 'chronology' && key !== '__timeout__' ? order : null
    const award = question.kind === 'chronology'
      ? lockedOrder
        ? chronologyPlacement(lockedOrder, question.validKeys).points
        : 0
      : question.kind === 'imageReveal' && isCorrect
        ? IMAGE_REVEAL_STAGES[stage].points
        : isCorrect
          ? 1
          : 0
    const nextPoints = points + award
    const nextLives = question.kind === 'higherLower' && !isCorrect ? lives - 1 : lives
    setResults((items) => [
      ...items,
      {
        question,
        pickedLabel: pickedLabel ?? question.choices.find((choice) => choice.key === key)?.label ?? null,
        correct: isCorrect,
        points: award,
        order: lockedOrder ?? undefined
      }
    ])
    setSelected(key)
    setCorrect(nextCorrect)
    setPoints(nextPoints)
    setLives(nextLives)
    if (question.kind === 'higherLower' && nextLives === 0) void endGame(nextCorrect, nextPoints, index + 1)
  }

  function submitOrder() {
    if (!question || question.kind !== 'chronology') return
    const exact = order.join('|') === question.validKeys.join('|')
    submit(exact ? order[0] : '__wrong__', exact)
  }

  async function advance() {
    if (loadingNext) return
    if (question?.kind === 'higherLower' && lives > 0) {
      const correctAnswer = question.validKeys.includes(selected ?? '')
      const reference = correctAnswer ? question.challenger : question.reference
      const recentIds = questions
        .slice(-4)
        .flatMap((item) => item.kind === 'higherLower' ? [Number(item.challenger.key)] : [])
        .filter((id) => Number.isFinite(id) && id !== Number(reference.key))
      const nextSeed = quizSeed(`${seed}:higher-lower:${index + 1}`)
      const request: QuizChallengeRequest = {
        ...requestFor(nextSeed),
        options: {
          ...requestFor(nextSeed).options,
          higherLowerReferenceId: Number(reference.key),
          higherLowerExcludeIds: recentIds
        }
      }
      setLoadingNext(true)
      try {
        const loaded = await qc.fetchQuery({
          queryKey: qk.quiz.challengePool(request),
          queryFn: () => api.quiz.challengePool(request)
        })
        const next = loaded[0]
        if (!next || next.kind !== 'higherLower') {
          setError('No further non-tied comparison could be dealt from this category.')
          await endGame(correct, points, index + 1)
          return
        }
        setQuestions((items) => [...items, next])
        setIndex((i) => i + 1)
        setSelected(null)
        setRemaining(15)
        lockedRef.current = false
      } finally {
        setLoadingNext(false)
      }
      return
    }
    if (index + 1 >= roundTarget) {
      await endGame(correct, points, index + 1)
      return
    }
    const next = questions[index + 1]
    setIndex((i) => i + 1)
    setSelected(null)
    setOrder(next.kind === 'chronology' ? next.choices.map((c) => c.key) : [])
    setStage(0)
    setRemaining(
      next.kind === 'chronology'
        ? 30
        : next.kind === 'imageReveal'
          ? revealSeconds
          : 15
    )
    setImageReady(next.kind !== 'imageReveal')
    lockedRef.current = false
  }

  function replaceBrokenImage() {
    if (question?.kind !== 'imageReveal') return
    const replacement = questions[spareIndexRef.current]
    spareIndexRef.current += 1
    if (!replacement || replacement.kind !== question.kind) {
      setPhase('setup')
      setError('Too many images could not be opened. The round was cancelled without saving a score.')
      return
    }
    setStage(0)
    setRemaining(question.kind === 'imageReveal' ? revealSeconds : 15)
    setImageReady(false)
    setQuestions((items) => items.map((item, itemIndex) => itemIndex === index ? replacement : item))
  }

  useEffect(() => {
    if (
      phase !== 'play' ||
      !question ||
      answered ||
      !timer ||
      (question.kind === 'imageReveal' && !imageReady)
    ) return
    const id = window.setInterval(() => setRemaining((n) => Math.max(0, n - 1)), 1000)
    return () => window.clearInterval(id)
  }, [phase, question, answered, timer, imageReady])

  useEffect(() => {
    if (
      phase === 'play' &&
      question &&
      remaining === 0 &&
      !answered &&
      (question.kind !== 'imageReveal' || imageReady)
    ) submit('__timeout__')
    // submit is intentionally driven only by the clock edge.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining])

  useEffect(() => {
    if (
      phase !== 'play' ||
      question?.kind !== 'imageReveal' ||
      answered ||
      !timer ||
      !imageReady
    ) return
    const id = window.setInterval(
      () => setStage((s) => Math.min(3, s + 1)),
      stageSeconds * 1000
    )
    return () => window.clearInterval(id)
  }, [phase, question, answered, timer, imageReady, stageSeconds])

  useEffect(() => {
    if (phase !== 'play') return
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target.isContentEditable) return
      if (answered && event.key === 'Enter' && !loadingNext) void advance()
      else if (
        !answered &&
        !typed &&
        (question?.kind !== 'imageReveal' || imageReady) &&
        /^[1-4]$/.test(event.key) &&
        question?.kind !== 'chronology'
      ) {
        submit(question?.choices[Number(event.key) - 1]?.key ?? '__missing__')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [answered, imageReady, loadingNext, question, typed])

  if (phase === 'setup') return (
    <div className="p-6 max-w-3xl mx-auto">
      <PageHeader back={{ to: '/quiz', label: 'Quiz' }} title={COPY[kind].title} subtitle={COPY[kind].subtitle} />
      <div className="card space-y-6 p-6">
        <Group label="Library scope">
          <Pill active={scope === 'consumed'} onClick={() => setScope('consumed')} label="Completed only" />
          <Pill active={scope === 'all'} onClick={() => setScope('all')} label="All library" />
        </Group>
        {scope === 'all' && <p className="text-sm text-amber-300">Includes in-progress or unseen content and may contain spoilers.</p>}
        {kind === 'imageReveal' && <Group label="Images"><Pill active={imageSource === 'covers'} onClick={() => setImageSource('covers')} label="Covers" /><Pill active={imageSource === 'art'} onClick={() => setImageSource('art')} label="Art" /></Group>}
        {kind === 'imageReveal' && <Group label="Media type"><Pill active={imageMediaType == null} onClick={() => setImageMediaType(null)} label="All types" />{HIGHER_LOWER_MEDIA_TYPES.map((option) => <Pill key={option.key} active={imageMediaType === option.key} onClick={() => setImageMediaType(option.key)} label={option.label} />)}</Group>}
        {kind === 'imageReveal' && <Group label="Answer"><Pill active={imageAnswerMode === 'choices'} onClick={() => setImageAnswerMode('choices')} label="Pick from 4" /><Pill active={imageAnswerMode === 'typed'} onClick={() => setImageAnswerMode('typed')} label="Type it" /></Group>}
        {kind === 'imageReveal' && imageAnswerMode === 'typed' && <p className="-mt-4 text-sm text-gray-400">Search any title in your library of that type. Stages last {stageSeconds} seconds, and typed rounds keep their own best score.</p>}
        {kind === 'imageReveal' && <Group label="Length"><Pill active={imageLength === 5} onClick={() => setImageLength(5)} label="5" /><Pill active={imageLength === 10} onClick={() => setImageLength(10)} label="10" /><Pill active={imageLength === 20} onClick={() => setImageLength(20)} label="20" /></Group>}
        {kind === 'connections' && <Group label="Length"><Pill active={connectionsLength === 5} onClick={() => setConnectionsLength(5)} label="5" /><Pill active={connectionsLength === 10} onClick={() => setConnectionsLength(10)} label="10" /><Pill active={connectionsLength === 20} onClick={() => setConnectionsLength(20)} label="20" /></Group>}
        {kind === 'chronology' && <Group label="Length"><Pill active={chronologyLength === 5} onClick={() => setChronologyLength(5)} label="5" /><Pill active={chronologyLength === 10} onClick={() => setChronologyLength(10)} label="10" /><Pill active={chronologyLength === 20} onClick={() => setChronologyLength(20)} label="20" /></Group>}
        {kind === 'higherLower' && <Group label="Category">{HIGHER_LOWER_MEDIA_TYPES.map((option) => <Pill key={option.key} active={higherLowerMediaType === option.key} onClick={() => setHigherLowerMediaType(option.key)} label={option.label} disabled={availability != null && higherLowerAnyCount(option.key) < 2} />)}</Group>}
        {kind === 'higherLower' && <Group label="Question"><Pill active={metric === 'releaseDate'} onClick={() => setMetric('releaseDate')} label={higherLowerCopy(higherLowerMediaType, 'releaseDate').setupLabel} disabled={availability != null && higherLowerCount(higherLowerMediaType, 'releaseDate') < 2} /><Pill active={metric === 'totalUnits'} onClick={() => setMetric('totalUnits')} label={higherLowerCopy(higherLowerMediaType, 'totalUnits').setupLabel} disabled={availability != null && higherLowerCount(higherLowerMediaType, 'totalUnits') < 2} /><Pill active={metric === 'communityScore'} onClick={() => setMetric('communityScore')} label={higherLowerCopy(higherLowerMediaType, 'communityScore').setupLabel} disabled={availability != null && higherLowerCount(higherLowerMediaType, 'communityScore') < 2} /><Pill active={metric === 'personalScore'} onClick={() => setMetric('personalScore')} label={higherLowerCopy(higherLowerMediaType, 'personalScore').setupLabel} disabled={availability != null && higherLowerCount(higherLowerMediaType, 'personalScore') < 2} /></Group>}
        {kind === 'higherLower' && availability != null && higherLowerCount(higherLowerMediaType) < 2 && <p className="text-sm text-amber-300">This category needs at least two covered titles with different values for the selected question.</p>}
        <Group label="Timer"><Pill active={timer} onClick={() => setTimer(true)} label="On" /><Pill active={!timer} onClick={() => setTimer(false)} label="Off" /></Group>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button className="btn-primary w-full py-3" disabled={kind === 'higherLower' && availability != null && higherLowerCount(higherLowerMediaType) < 2} onClick={() => void start()}>Start round</button>
      </div>
    </div>
  )

  if (phase === 'summary') return (
    <StudySessionFrame title="Round complete" subtitle={`${correct}/${Math.min(index + 1, questions.length)} correct`} surface={false}>
      <div className="card mx-auto max-w-lg p-8 text-center">
        {newBest && <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">New personal best</p>}
        <p className="text-4xl font-semibold text-accent">{quizScorePolicy(sessionKind) === 'points' ? `${points} points` : `${correct}/${questions.length}`}</p>
        <div className="mt-6 flex gap-2"><button className="btn-primary flex-1" disabled={saving} onClick={() => void start()}>Play again</button><button className="btn-ghost flex-1" onClick={() => setPhase('setup')}>Setup</button></div>
      </div>
      {(kind === 'imageReveal' || kind === 'connections' || kind === 'chronology') && results.length > 0 && (
        <ol className="card mx-auto mt-4 max-w-lg divide-y divide-base-700 px-4">
          {results.map((result, resultIndex) => {
            if (result.question.kind === 'chronology') {
              const set = result.question
              const entryByKey = new Map(set.entries.map((entry) => [entry.key, entry]))
              return (
                <li key={set.id} className="flex items-start gap-4 py-3 text-sm">
                  <span className="w-6 text-gray-500 tabular-nums">{resultIndex + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-white">{set.connectionLabel}</p>
                    <p className="text-gray-400">
                      {set.validKeys
                        .map((key) => {
                          const entry = entryByKey.get(key)
                          return entry ? `${entry.label} (${entry.releaseDate.slice(0, 4)})` : key
                        })
                        .join(', ')}
                    </p>
                  </div>
                  <span className={result.points === 100 ? 'text-green-400' : result.points > 0 ? 'text-amber-300' : 'text-red-400'}>
                    {result.points === 100 ? 'Perfect' : result.points > 0 ? 'One swap' : result.order ? 'Missed' : 'Time'} · {result.points}
                  </span>
                </li>
              )
            }
            if (result.question.kind === 'connections') {
              const pair = result.question
              const shown = pair.choices.find((choice) => pair.validKeys.includes(choice.key))
              return (
                <li key={pair.id} className="flex items-center gap-4 py-3 text-sm">
                  <span className="w-6 text-gray-500 tabular-nums">{resultIndex + 1}</span>
                  <div className="flex shrink-0 gap-1">
                    <CoverImage path={pair.titleA.imagePath ?? null} alt="" thumbWidth={96} className="aspect-[2/3] w-8 rounded" />
                    <CoverImage path={pair.titleB.imagePath ?? null} alt="" thumbWidth={96} className="aspect-[2/3] w-8 rounded" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-white">{shown?.label ?? 'Unknown'}</p>
                    <p className="truncate text-gray-400" title={pair.reveal}>{pair.reveal}</p>
                    {!result.correct && (
                      <p className="truncate text-gray-500">
                        {result.pickedLabel ? `You picked ${result.pickedLabel}` : 'No answer'}
                      </p>
                    )}
                  </div>
                  <span className={result.correct ? 'text-green-400' : 'text-red-400'}>
                    {result.correct ? 'Correct' : 'Missed'}
                  </span>
                </li>
              )
            }
            if (result.question.kind !== 'imageReveal') return null
            const answer = result.question.choices.find((choice) => result.question.validKeys.includes(choice.key))
            return (
              <li key={result.question.id} className="flex items-center gap-4 py-3 text-sm">
                <span className="w-6 text-gray-500 tabular-nums">{resultIndex + 1}</span>
                <CoverImage
                  path={result.question.imagePath}
                  alt=""
                  thumbWidth={96}
                  className={`${imageSource === 'covers' ? 'aspect-[2/3] w-10' : 'aspect-video w-16'} shrink-0 rounded`}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-white">{answer?.label ?? 'Unknown title'}</p>
                  {!result.correct && (
                    <p className="truncate text-gray-500">
                      {result.pickedLabel ? `You answered ${result.pickedLabel}` : 'No answer'}
                    </p>
                  )}
                </div>
                <span className={result.correct ? 'text-green-400' : 'text-red-400'}>
                  {result.correct ? `${result.points} pts` : 'Missed'}
                </span>
              </li>
            )
          })}
        </ol>
      )}
    </StudySessionFrame>
  )

  if (!question) return null
  const correctAnswer = question.choices.find((c) => question.validKeys.includes(c.key))
  return (
    <StudySessionFrame title={COPY[kind].title} subtitle={`Question ${index + 1}${kind === 'higherLower' ? ` · ${lives} lives` : `/${roundTarget}`}${timer ? ` · ${remaining}s` : ''}`} surface={false}>
      <div className="card mx-auto max-w-4xl p-6">
        {question.kind !== 'higherLower' && <p className="mb-5 text-center text-xl font-semibold">{question.prompt}</p>}
        {question.kind === 'imageReveal' && (
          <div
            className={`mx-auto mb-6 overflow-hidden rounded-md bg-base-900 ${
              imageSource === 'covers' ? 'aspect-[2/3] h-[min(30rem,60vh)]' : 'aspect-video w-full max-w-3xl'
            }`}
          >
            <img
              key={question.id}
              src={mediaUrl(question.imagePath) ?? undefined}
              alt="Quiz prompt"
              className={`h-full w-full object-cover ${imageReady ? 'transition-all duration-700' : ''}`}
              style={!answered ? imageRevealStageStyle(stage, question.focus) : undefined}
              onLoad={() => setImageReady(true)}
              onError={replaceBrokenImage}
            />
          </div>
        )}
        {question.kind === 'imageReveal' && !answered && (
          <div className="mb-5 text-center text-sm text-gray-400">
            {imageReady ? `Stage ${stage + 1}/4 · ${IMAGE_REVEAL_STAGES[stage].points} points` : 'Loading image…'}
          </div>
        )}
        {question.kind === 'connections' && <div className="mb-6 grid grid-cols-2 gap-4">{[question.titleA, question.titleB].map((title) => <div key={title.key} className="text-center"><CoverImage path={title.imagePath} alt={title.label} className="mx-auto aspect-[2/3] max-h-56" /><p className="mt-2 text-sm font-medium text-gray-300">{title.label}</p></div>)}</div>}
        {question.kind === 'higherLower' ? (
          <HigherLowerRound
            question={question}
            answered={answered}
            selected={selected}
            disabled={loadingNext}
            onAnswer={submit}
          />
        ) : question.kind === 'chronology' ? (
          <div>
            <ChronologyOrder
              order={order}
              choices={question.choices}
              disabled={answered}
              placed={answered && selected !== '__timeout__' ? chronologyPlacement(order, question.validKeys).placed : undefined}
              onChange={setOrder}
            />
            {answered ? (
              <p className="mt-4 text-center text-sm font-semibold text-gray-200" role="status">
                {selected === '__timeout__'
                  ? 'Time ran out.'
                  : (() => {
                      const result = chronologyPlacement(order, question.validKeys)
                      return `${question.validKeys.length - result.misplaced} of ${question.validKeys.length} in the right place · ${result.points} points`
                    })()}
              </p>
            ) : (
              <button className="btn-primary mt-4 w-full" onClick={submitOrder}>
                Lock order
              </button>
            )}
          </div>
        ) : question.kind === 'imageReveal' && typed ? (
          <TypedTitleAnswer
            mediaType={question.mediaType}
            resetKey={question.id}
            disabled={answered || !imageReady}
            onSubmit={(choice) => submit(choice.key, undefined, choice.label)}
            onGiveUp={() => submit('__timeout__')}
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {question.choices.map((option, i) => {
              const isAnswer = answered && question.validKeys.includes(option.key)
              return (
                <button
                  key={option.key}
                  className={`rounded-md border p-4 text-left ${
                    isAnswer
                      ? 'border-green-500 bg-green-500/10'
                      : selected === option.key
                        ? 'border-red-500 bg-red-500/10'
                        : 'border-base-600 bg-base-800 hover:border-accent'
                  }`}
                  disabled={answered || (question.kind === 'imageReveal' && !imageReady)}
                  onClick={() => submit(option.key)}
                >
                  <span className={`mr-3 ${isAnswer ? 'text-green-200' : 'text-gray-500'}`}>{i + 1}</span>
                  {option.label}
                </button>
              )
            })}
          </div>
        )}
        {question.kind === 'imageReveal' && !timer && !answered && imageReady && stage < 3 && (
          <button className="btn-ghost mt-4 w-full" onClick={() => setStage((current) => Math.min(3, current + 1))}>
            Reveal more
          </button>
        )}
        {answered && <div className="mt-5 text-center">{question.kind === 'chronology' ? <div className="rounded-md border border-base-700 bg-base-900/40 p-4 text-left"><p className="text-sm font-medium text-accent">{question.connectionLabel}</p><p className="mt-1 text-xs text-gray-400">Correct order</p><div className="mt-3 grid gap-2 sm:grid-cols-2">{question.validKeys.map((key, position) => { const entry = question.entries.find((item) => item.key === key)!; return <div key={key} className="flex items-center gap-3 rounded-md bg-base-800 p-2"><span className="w-5 text-center text-sm font-semibold text-accent">{position + 1}</span><CoverImage path={entry.imagePath} alt="" className="h-16 w-11 shrink-0" /><div className="min-w-0"><p className="text-sm font-medium text-gray-200">{entry.label}</p><p className="mt-0.5 text-xs tabular-nums text-gray-400">{entry.releaseDate.slice(0, 4)}</p></div></div> })}</div></div> : question.kind !== 'higherLower' ? <p className="text-sm text-gray-300">Answer: {correctAnswer?.label}{question.kind === 'connections' ? ` · ${question.reveal}` : ''}</p> : null}{question.kind === 'higherLower' && lives === 0 ? <button className="btn-primary mt-4 px-8" disabled={saving} onClick={() => void endGame(correct, points, index + 1)}>{saving ? 'Saving…' : 'Retry save'}</button> : <button className="btn-primary mt-4 px-8" disabled={saving || loadingNext} onClick={() => void advance()}>{loadingNext ? 'Dealing next comparison…' : saving ? 'Saving…' : 'Continue'}</button>}</div>}
      </div>
    </StudySessionFrame>
  )
}
