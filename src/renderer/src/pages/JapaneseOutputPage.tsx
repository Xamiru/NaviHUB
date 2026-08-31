import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePitchRecorder, type Take } from '../lib/usePitchRecorder'
import PageHeader from '../components/PageHeader'
import StudySessionFrame, { SessionEvidence } from '../components/StudySessionFrame'
import TutorSessionContinue from '../components/TutorSessionContinue'
import { OUTPUT_UNITS, checkOutput, type OutputUnit } from '@shared/japanese/output'

type Phase = 'setup' | 'play' | 'summary'
type SelfRating = 'needs-work' | 'close' | 'ready'

const RATING_POINTS: Record<SelfRating, number> = {
  'needs-work': 0,
  close: 1,
  ready: 2
}

export default function JapaneseOutputPage() {
  const qc = useQueryClient()
  const recorder = usePitchRecorder()
  const [unitId, setUnitId] = useState(OUTPUT_UNITS[0].id)
  const [phase, setPhase] = useState<Phase>('setup')
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [revealed, setRevealed] = useState(false)
  const [take, setTake] = useState<Take | null>(null)
  const [score, setScore] = useState(0)
  const [ratings, setRatings] = useState<SelfRating[]>([])
  const loggedRef = useRef(false)
  const unit = OUTPUT_UNITS.find((item) => item.id === unitId) ?? OUTPUT_UNITS[0]
  const prompt = unit.prompts[index]
  const check = useMemo(
    () => (revealed ? checkOutput(answer, prompt) : null),
    [answer, prompt, revealed]
  )

  const { data: history } = useQuery({
    queryKey: qk.quiz.historyAll('jpOutput'),
    queryFn: () => api.quiz.history('jpOutput', 200)
  })
  const completed = useMemo(
    () => new Set((history?.recent ?? []).map((session) => String(session.settings?.unitId ?? ''))),
    [history]
  )

  function selectUnit(next: OutputUnit): void {
    recorder.release()
    setUnitId(next.id)
    setPhase('setup')
  }

  function leaveUnit(): void {
    recorder.release()
    setPhase('setup')
  }

  function start(): void {
    setPhase('play')
    setIndex(0)
    setAnswer('')
    setRevealed(false)
    setTake(null)
    setScore(0)
    setRatings([])
    loggedRef.current = false
  }

  function stopRecording(): void {
    const recorded = recorder.stop()
    if (recorded) setTake(recorded)
  }

  function rate(rating: SelfRating): void {
    if (recorder.status === 'recording') recorder.stop()
    const nextScore = score + RATING_POINTS[rating]
    const nextRatings = [...ratings, rating]
    setScore(nextScore)
    setRatings(nextRatings)
    if (index + 1 < unit.prompts.length) {
      setIndex((value) => value + 1)
      setAnswer('')
      setRevealed(false)
      setTake(null)
      return
    }
    if (!loggedRef.current) {
      loggedRef.current = true
      recorder.release()
      void api.quiz
        .logSession({
          kind: 'jpOutput',
          score: nextScore,
          total: unit.prompts.length * 2,
          bestStreak: 0,
          settings: { unitId: unit.id, stage: unit.stage, ratings: nextRatings }
        })
        .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history('jpOutput') }))
    }
    setPhase('summary')
  }

  if (phase === 'play') {
    return (
      <StudySessionFrame
        title="Controlled Japanese output"
        subtitle={`${unit.title} · ${unit.level}`}
        progress={{ current: index + 1, total: unit.prompts.length, label: 'Produce, compare, repair' }}
        actions={
          <button className="btn-ghost" onClick={leaveUnit}>
            Leave unit
          </button>
        }
        rail={
          <>
            <SessionEvidence title="Honest feedback">
              <p>
                The structure check only detects the listed language signals. It cannot prove that every
                sentence is natural or that a different valid answer is wrong.
              </p>
            </SessionEvidence>
            <SessionEvidence title="Unit goal">
              <p>{unit.purpose}</p>
              <p className="mt-3">Rate the repaired answer, not the first draft.</p>
            </SessionEvidence>
          </>
        }
        surface={false}
      >
        <div className="border-b border-base-700 pb-5">
          <p className="text-sm text-gray-400">{prompt.situation}</p>
          <h2 className="mt-3 max-w-3xl text-xl font-medium leading-relaxed text-white">
            {prompt.prompt}
          </h2>
        </div>

        <div className="mt-6">
          <label className="label" htmlFor="jp-output-answer">Your Japanese</label>
          <textarea
            id="jp-output-answer"
            className="input mt-2 min-h-36 w-full resize-y text-lg leading-8"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            placeholder="Write or dictate your response from memory"
            autoFocus
          />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {!revealed ? (
              <button className="btn-primary" disabled={!answer.trim()} onClick={() => setRevealed(true)}>
                Compare with model
              </button>
            ) : <p className="text-sm text-gray-500">Structure check updates as you revise.</p>}
            {recorder.status !== 'recording' ? (
              <button className="btn-ghost" onClick={() => void recorder.start()}>
                Record a spoken take
              </button>
            ) : (
              <button className="btn-ghost" onClick={stopRecording}>
                Stop recording · {recorder.seconds.toFixed(1)}s
              </button>
            )}
            {take && (
              <button className="btn-ghost" onClick={() => recorder.replay(take)}>
                Replay my take
              </button>
            )}
          </div>
          {recorder.status === 'recording' && (
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-base-700" aria-label="Microphone level">
              <div className="h-full bg-accent" style={{ width: `${Math.round(recorder.level * 100)}%` }} />
            </div>
          )}
          {(recorder.status === 'denied' || recorder.status === 'no-mic' || recorder.status === 'error') && (
            <p className="mt-2 text-sm text-signal-caution">
              {recorder.status === 'denied'
                ? 'Microphone permission was denied. You can continue with writing.'
                : recorder.status === 'no-mic'
                  ? 'No microphone was found. You can continue with writing.'
                  : 'The microphone could not start. You can continue with writing.'}
            </p>
          )}
        </div>

        {revealed && check && (
          <div className="mt-7 border-t border-base-700 pt-6" aria-live="polite">
            <h3 className="text-sm font-semibold text-white">Model for comparison</h3>
            <p className="mt-3 text-2xl leading-relaxed text-white">{prompt.model}</p>
            <p className="mt-1 text-sm text-gray-500">{prompt.reading}</p>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-400">{prompt.note}</p>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-white">Required signals detected</span>
                <span className="tabular-nums text-gray-400">{check.score}%</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {prompt.required.map((group, groupIndex) => (
                  <span
                    key={group.label}
                    className={`chip ${check.matched[groupIndex] ? 'text-signal-affirmative' : 'text-signal-caution'}`}
                  >
                    {group.label}: {check.matched[groupIndex] ? 'found' : 'not found'}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-7 border-t border-base-700 pt-5">
              <p className="text-sm font-medium text-white">After revising, how independently could you produce it?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button className="btn-ghost" onClick={() => rate('needs-work')}>Needs work</button>
                <button className="btn-ghost" onClick={() => rate('close')}>Close with repair</button>
                <button className="btn-primary" onClick={() => rate('ready')}>Ready independently</button>
              </div>
            </div>
          </div>
        )}
      </StudySessionFrame>
    )
  }

  if (phase === 'summary') {
    const percent = Math.round((score / (unit.prompts.length * 2)) * 100)
    return (
      <div className="mx-auto max-w-xl p-6">
        <PageHeader
          back={{ to: '/japanese/tutor', label: 'Tutor' }}
          title="Output unit complete"
          subtitle={`${unit.title}: ${percent}% self-rated independence after comparison and repair.`}
        />
        <div className="flex flex-wrap gap-2">
          <button className="btn-primary" onClick={start}>Repeat unit</button>
          <button
            className="btn-ghost"
            onClick={() => {
              const next = OUTPUT_UNITS[(OUTPUT_UNITS.indexOf(unit) + 1) % OUTPUT_UNITS.length]
              selectUnit(next)
            }}
          >
            Next unit
          </button>
          <TutorSessionContinue fallbackTo="/japanese/tutor" fallbackLabel="Return to tutor" />
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1320px] p-4 sm:p-6">
      <PageHeader
        back={{ to: '/japanese', label: 'Japanese' }}
        title="Controlled Japanese output"
        subtitle="Thirty prompts progress from sentence building through role-play, retelling, and reasoned writing. Produce first, compare second, then repair and rate honestly."
        actions={<Link to="/japanese/tutor" className="btn-ghost">Tutor plan</Link>}
      />

      <div className="grid min-w-0 gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
        <nav className="card divide-y divide-base-700 self-start" aria-label="Output units">
          {OUTPUT_UNITS.map((item) => (
            <button
              key={item.id}
              className={`w-full px-4 py-3 text-left first:rounded-t-lg last:rounded-b-lg ${
                item.id === unit.id ? 'bg-accent/10' : 'hover:bg-base-700/50'
              }`}
              aria-current={item.id === unit.id ? 'page' : undefined}
              onClick={() => selectUnit(item)}
            >
              <div className="flex items-center justify-between gap-3">
                <span className={item.id === unit.id ? 'text-accent' : 'text-white'}>{item.title}</span>
                {completed.has(item.id) && <span className="text-xs text-gray-500">done</span>}
              </div>
              <p className="mt-1 text-xs text-gray-500">{item.level} · {item.stage}</p>
            </button>
          ))}
        </nav>

        <div className="min-w-0">
          <div className="border-b border-base-700 pb-6">
            <h2 className="text-2xl font-semibold text-white">{unit.title}</h2>
            <p className="mt-2 max-w-3xl leading-relaxed text-gray-400">{unit.purpose}</p>
          </div>
          <div className="mt-6 divide-y divide-base-700 border-y border-base-700">
            {unit.prompts.map((item, itemIndex) => (
              <div key={item.id} className="grid gap-2 py-4 sm:grid-cols-[110px_minmax(0,1fr)]">
                <p className="text-xs uppercase tracking-wide text-gray-500">Prompt {itemIndex + 1}</p>
                <div>
                  <p className="text-sm text-gray-400">{item.situation}</p>
                  <p className="mt-1 text-white">{item.prompt}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-6 text-gray-400">
            Model answers are examples, not the only valid Japanese. The offline checker reports only whether expected structures appear; your self-rating records independence after repair.
          </p>
          <button className="btn-primary mt-5" onClick={start}>Start this three-prompt unit</button>
        </div>
      </div>
    </div>
  )
}
