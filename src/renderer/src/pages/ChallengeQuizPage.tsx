import { useEffect, useRef, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import StudySessionFrame from '../components/StudySessionFrame'
import CoverImage from '../components/CoverImage'
import { Group, Pill } from '../components/PillGroup'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useAllCompletedStatuses } from '../lib/hooks'
import { mediaUrl } from '@shared/mediaUrl'
import { answerIsCorrect, isNewQuizBest, quizSeed, quizScorePolicy } from '@shared/quizCore'
import type {
  QuizChallengeKind,
  QuizChallengeQuestion,
  QuizChallengeRequest,
  QuizConsumptionScope
} from '@shared/types'

type Phase = 'setup' | 'play' | 'summary'

const COPY: Record<QuizChallengeKind, { title: string; subtitle: string }> = {
  imageReveal: { title: 'Image Reveal', subtitle: 'Identify a title as its image resolves in four stages.' },
  silhouette: { title: 'Silhouette', subtitle: 'Recognise a character from their outline.' },
  connections: { title: 'Connections', subtitle: 'Find the real person or studio shared by two titles.' },
  chronology: { title: 'Chronology', subtitle: 'Put four connected titles into release order.' },
  oddOneOut: { title: 'Odd One Out', subtitle: 'Find the title that breaks the stated relationship.' },
  higherLower: { title: 'Higher or Lower', subtitle: 'Keep the run alive by comparing library facts.' }
}

export default function ChallengeQuizPage({ kind }: { kind: QuizChallengeKind }) {
  const completedStatuses = useAllCompletedStatuses()
  const qc = useQueryClient()
  const [phase, setPhase] = useState<Phase>('setup')
  const [scope, setScope] = useState<QuizConsumptionScope>('consumed')
  const [timer, setTimer] = useState(true)
  const [imageSource, setImageSource] = useState<'covers' | 'art'>('covers')
  const [silhouetteMode, setSilhouetteMode] = useState<'character' | 'title'>('character')
  const [connectionMode, setConnectionMode] = useState<'person' | 'studio'>('person')
  const [metric, setMetric] = useState<'releaseDate' | 'totalUnits' | 'personalScore'>('releaseDate')
  const [questions, setQuestions] = useState<QuizChallengeQuestion[]>([])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [order, setOrder] = useState<string[]>([])
  const [correct, setCorrect] = useState(0)
  const [points, setPoints] = useState(0)
  const [lives, setLives] = useState(3)
  const [stage, setStage] = useState(0)
  const [remaining, setRemaining] = useState(15)
  const [seed, setSeed] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [newBest, setNewBest] = useState(false)
  const lockedRef = useRef(false)
  const loggedRef = useRef(false)

  const question = questions[index]
  const answered = selected != null
  const roundLength = kind === 'chronology' ? 5 : kind === 'higherLower' ? 100 : 10
  const { data: history } = useQuery({
    queryKey: qk.quiz.history(kind),
    queryFn: () => api.quiz.history(kind)
  })

  function requestFor(nextSeed: number): QuizChallengeRequest {
    return {
      kind,
      seed: nextSeed,
      scope,
      statuses: scope === 'consumed' ? completedStatuses : null,
      length: roundLength,
      options: { imageSource, silhouetteMode, connectionMode, higherLowerMetric: metric }
    }
  }

  async function start() {
    setError(null)
    const nextSeed = quizSeed(`${Date.now()}-${Math.random()}`)
    const request = requestFor(nextSeed)
    const pool = await qc.fetchQuery({
      queryKey: qk.quiz.challengePool(request),
      queryFn: () => api.quiz.challengePool(request)
    })
    const minimum = kind === 'higherLower' ? 2 : 1
    if (pool.length < minimum) {
      setError('There is not enough eligible library data for this setup. Widen the scope or import more linked metadata.')
      return
    }
    setQuestions(pool)
    setIndex(0)
    setCorrect(0)
    setPoints(0)
    setLives(3)
    setSelected(null)
    setOrder(pool[0].kind === 'chronology' ? pool[0].choices.map((c) => c.key) : [])
    setStage(0)
    setRemaining(pool[0].kind === 'chronology' ? 30 : 15)
    setSeed(nextSeed)
    setNewBest(false)
    lockedRef.current = false
    loggedRef.current = false
    setPhase('play')
  }

  async function endGame(finalCorrect: number, finalPoints: number, attempted: number) {
    if (loggedRef.current) return
    loggedRef.current = true
    setSaving(true)
    const policy = quizScorePolicy(kind)
    const sessionSettings = {
      correct: finalCorrect,
      attempted,
      scorePolicy: policy,
      playMode: 'solo' as const,
      seed,
      scope,
      timer,
      imageSource,
      silhouetteMode,
      connectionMode,
      metric
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
        kind,
        score: policy === 'points' ? finalPoints : finalCorrect,
        total: attempted,
        bestStreak: 0,
        settings: sessionSettings
      })
      await qc.invalidateQueries({ queryKey: qk.quiz.history(kind) })
      setPhase('summary')
    } catch (error) {
      loggedRef.current = false
      throw error
    } finally {
      setSaving(false)
    }
  }

  function submit(key: string, correctOverride?: boolean) {
    if (!question || lockedRef.current) return
    lockedRef.current = true
    const isCorrect = correctOverride ?? answerIsCorrect(question.validKeys, key)
    const nextCorrect = correct + (isCorrect ? 1 : 0)
    const award = question.kind === 'imageReveal' && isCorrect ? [400, 300, 200, 100][stage] : isCorrect ? 1 : 0
    const nextPoints = points + award
    const nextLives = question.kind === 'higherLower' && !isCorrect ? lives - 1 : lives
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

  function advance() {
    if (index + 1 >= questions.length) {
      void endGame(correct, points, index + 1)
      return
    }
    let next = questions[index + 1]
    if (
      question?.kind === 'higherLower' &&
      next.kind === 'higherLower' &&
      !question.validKeys.includes(selected ?? '')
    ) {
      const reference = question.reference
      const referenceValue = question.referenceValue
      const valid = next.challengerValue > referenceValue ? 'higher' : 'lower'
      next = {
        ...next,
        prompt: `Is ${next.challenger.label} higher or lower than ${reference.label}?`,
        reference,
        referenceValue,
        validKeys: [valid]
      }
      setQuestions((items) => items.map((item, i) => i === index + 1 ? next : item))
    }
    setIndex((i) => i + 1)
    setSelected(null)
    setOrder(next.kind === 'chronology' ? next.choices.map((c) => c.key) : [])
    setStage(0)
    setRemaining(next.kind === 'chronology' ? 30 : 15)
    lockedRef.current = false
  }

  useEffect(() => {
    if (phase !== 'play' || !question || answered || !timer) return
    const id = window.setInterval(() => setRemaining((n) => Math.max(0, n - 1)), 1000)
    return () => window.clearInterval(id)
  }, [phase, question, answered, timer])

  useEffect(() => {
    if (phase === 'play' && question && remaining === 0 && !answered) submit('__timeout__')
    // submit is intentionally driven only by the clock edge.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining])

  useEffect(() => {
    if (phase !== 'play' || question?.kind !== 'imageReveal' || answered) return
    const id = window.setInterval(() => setStage((s) => Math.min(3, s + 1)), 4000)
    return () => window.clearInterval(id)
  }, [phase, question, answered])

  useEffect(() => {
    if (phase !== 'play') return
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target.isContentEditable) return
      if (answered && event.key === 'Enter') advance()
      else if (!answered && /^[1-4]$/.test(event.key) && question?.kind !== 'chronology') {
        submit(question?.choices[Number(event.key) - 1]?.key ?? '__missing__')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

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
        {kind === 'silhouette' && <Group label="Answer"><Pill active={silhouetteMode === 'character'} onClick={() => setSilhouetteMode('character')} label="Character" /><Pill active={silhouetteMode === 'title'} onClick={() => setSilhouetteMode('title')} label="Title" /></Group>}
        {kind === 'connections' && <Group label="Connection"><Pill active={connectionMode === 'person'} onClick={() => setConnectionMode('person')} label="Person" /><Pill active={connectionMode === 'studio'} onClick={() => setConnectionMode('studio')} label="Studio" /></Group>}
        {kind === 'higherLower' && <Group label="Metric"><Pill active={metric === 'releaseDate'} onClick={() => setMetric('releaseDate')} label="Release date" /><Pill active={metric === 'totalUnits'} onClick={() => setMetric('totalUnits')} label="Total units" /><Pill active={metric === 'personalScore'} onClick={() => setMetric('personalScore')} label="My score" /></Group>}
        <Group label="Timer"><Pill active={timer} onClick={() => setTimer(true)} label="On" /><Pill active={!timer} onClick={() => setTimer(false)} label="Off" /></Group>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button className="btn-primary w-full py-3" onClick={() => void start()}>Start round</button>
      </div>
    </div>
  )

  if (phase === 'summary') return (
    <StudySessionFrame title="Round complete" subtitle={`${correct}/${Math.min(index + 1, questions.length)} correct`} surface={false}>
      <div className="card mx-auto max-w-lg p-8 text-center">
        {newBest && <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">New personal best</p>}
        <p className="text-4xl font-semibold text-accent">{quizScorePolicy(kind) === 'points' ? `${points} points` : `${correct}/${questions.length}`}</p>
        <div className="mt-6 flex gap-2"><button className="btn-primary flex-1" disabled={saving} onClick={() => void start()}>Play again</button><button className="btn-ghost flex-1" onClick={() => setPhase('setup')}>Setup</button></div>
      </div>
    </StudySessionFrame>
  )

  if (!question) return null
  const correctAnswer = question.choices.find((c) => question.validKeys.includes(c.key))
  return (
    <StudySessionFrame title={COPY[kind].title} subtitle={`Question ${index + 1}/${questions.length}${kind === 'higherLower' ? ` · ${lives} lives` : ''}${timer ? ` · ${remaining}s` : ''}`} surface={false}>
      <div className="card mx-auto max-w-4xl p-6">
        <p className="mb-5 text-center text-xl font-semibold">{question.prompt}</p>
        {(question.kind === 'imageReveal' || question.kind === 'silhouette') && <div className="mx-auto mb-6 h-72 max-w-lg overflow-hidden rounded-md bg-base-900"><img src={mediaUrl(question.imagePath) ?? undefined} alt="Quiz prompt" className={`h-full w-full object-contain transition-all duration-700 ${question.kind === 'silhouette' && !answered ? 'brightness-0' : ''}`} style={question.kind === 'imageReveal' && !answered ? { filter: `blur(${[20, 12, 6, 0][stage]}px)`, transform: `scale(${[1.8, 1.5, 1.25, 1][stage]})` } : undefined} /></div>}
        {question.kind === 'connections' && <div className="mb-6 grid grid-cols-2 gap-4"><CoverImage path={question.titleA.imagePath} alt={question.titleA.label} className="mx-auto aspect-[2/3] max-h-56" /><CoverImage path={question.titleB.imagePath} alt={question.titleB.label} className="mx-auto aspect-[2/3] max-h-56" /></div>}
        {question.kind === 'chronology' ? (
          <div className="space-y-2">
            {order.map((key, i) => {
              const item = question.choices.find((choice) => choice.key === key)!
              return (
                <div key={key} className="flex items-center gap-3 rounded-md bg-base-800 p-3">
                  <span className="w-6 text-gray-500">{i + 1}</span>
                  <span className="flex-1">{item.label}</span>
                  <button
                    className="btn-ghost px-3"
                    disabled={answered || i === 0}
                    onClick={() => setOrder((current) => {
                      const next = [...current]
                      ;[next[i - 1], next[i]] = [next[i], next[i - 1]]
                      return next
                    })}
                  >
                    Up
                  </button>
                  <button
                    className="btn-ghost px-3"
                    disabled={answered || i === order.length - 1}
                    onClick={() => setOrder((current) => {
                      const next = [...current]
                      ;[next[i + 1], next[i]] = [next[i], next[i + 1]]
                      return next
                    })}
                  >
                    Down
                  </button>
                </div>
              )
            })}
            <button className="btn-primary mt-4 w-full" disabled={answered} onClick={submitOrder}>
              Lock order
            </button>
          </div>
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
                  disabled={answered}
                  onClick={() => submit(option.key)}
                >
                  <span className={`mr-3 ${isAnswer ? 'text-green-200' : 'text-gray-500'}`}>{i + 1}</span>
                  {option.label}
                </button>
              )
            })}
          </div>
        )}
        {answered && <div className="mt-5 text-center"><p className="text-sm text-gray-300">Answer: {question.kind === 'chronology' ? question.validKeys.map((k) => question.choices.find((c) => c.key === k)?.label).join(' → ') : correctAnswer?.label}{question.kind === 'connections' ? ` · ${question.reveal}` : ''}{question.kind === 'oddOneOut' ? ` · ${question.explanation}` : ''}</p>{question.kind === 'higherLower' && lives === 0 ? <button className="btn-primary mt-4 px-8" disabled={saving} onClick={() => void endGame(correct, points, index + 1)}>{saving ? 'Saving…' : 'Retry save'}</button> : <button className="btn-primary mt-4 px-8" disabled={saving} onClick={advance}>{saving ? 'Saving…' : 'Continue'}</button>}</div>}
      </div>
    </StudySessionFrame>
  )
}
