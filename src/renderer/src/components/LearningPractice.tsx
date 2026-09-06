import { useRef, useState } from 'react'
import {
  hasIndependentTransfer, matchesLearningAnswer, transferDueAt, unusedTransferExercises,
  type LearningAttempt, type LearningExercise, type LearningUnit
} from '@shared/learningEvidence'
import { useLearningEvidence } from '../lib/useLearningEvidence'
import { Field } from './Field'
import Markdown from './Markdown'

// Cold transfer forms are reserved durably BEFORE displaying them. Leaving after
// seeing a solution cannot turn the same item into unseen evidence on a revisit.
export default function LearningPractice({ unit, settingKey }: {
  unit: LearningUnit
  settingKey: string
}) {
  const { record, save, isPending, isError } = useLearningEvidence(settingKey)
  const [session, setSession] = useState<LearningAttempt | null>(null)
  const [exercises, setExercises] = useState<LearningExercise[]>([])
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [responses, setResponses] = useState<boolean[]>([])
  const [busy, setBusy] = useState(false)
  const [finished, setFinished] = useState(false)
  const [reviewedThisVisit, setReviewedThisVisit] = useState(false)
  const lock = useRef(false)
  const due = transferDueAt(record)
  const unseen = unusedTransferExercises(unit, record)
  const current = exercises[index]

  async function start(mode: 'practice' | 'transfer'): Promise<void> {
    if (lock.current) return
    if (mode === 'transfer' && (due == null || Date.now() < due)) return
    lock.current = true
    setBusy(true)
    try {
      const pool = mode === 'practice' ? unit.practice : unseen.length ? unseen : unit.transfer
      if (!pool.length) return
      const attempt: LearningAttempt = {
        at: new Date().toISOString(), mode, completed: false, score: 0, total: pool.length,
        assisted: mode === 'practice' || unseen.length === 0 || reviewedThisVisit,
        exerciseIds: pool.map((exercise) => exercise.id)
      }
      await save((old) => ({ ...old, attempts: [...old.attempts, attempt],
        exposedIds: [...new Set([...(old.exposedIds ?? []), ...attempt.exerciseIds])]
      }))
      setSession(attempt)
      setExercises(pool)
      setIndex(0)
      setAnswer('')
      setResult(null)
      setScore(0)
      setResponses([])
      setFinished(false)
    } finally {
      lock.current = false
      setBusy(false)
    }
  }

  async function check(): Promise<void> {
    if (!session || !current || result !== null || lock.current || !answer.trim()) return
    lock.current = true
    setBusy(true)
    try {
      const correct = matchesLearningAnswer(answer, current.answers)
      const nextScore = score + Number(correct)
      const completed = index === exercises.length - 1
      await save((old) => ({
        ...old,
        attempts: old.attempts.map((a) => a.at === session.at
          ? { ...a, score: nextScore, completed } : a)
      }))
      setScore(nextScore)
      setResponses((old) => [...old, correct])
      setResult(correct)
      setFinished(completed)
    } finally {
      lock.current = false
      setBusy(false)
    }
  }

  return (
    <section className="card mt-6 p-5" aria-label={unit.title}>
      <h2 className="text-lg font-semibold">{unit.title}</h2>
      {!session && <>
        <details className="mt-3" onToggle={(event) => { if (event.currentTarget.open) setReviewedThisVisit(true) }}>
          <summary className="cursor-pointer text-sm text-accent">Review the teaching note</summary>
          <div className="mt-3"><Markdown text={unit.body} /></div>
        </details>
        <p className="mt-4 text-sm text-gray-400">
          Practise with the explanation first. After a successful practice, return at least 24 hours
          later for a different prompt without notes. These checks assess only the stated task.
          Opening the teaching note marks a transfer check as assisted for this visit.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          {hasIndependentTransfer(record) ? 'An unseen delayed check was passed without supplied help.' : 'No unseen delayed check has been passed yet.'}
          {due != null && ` Next delayed check: ${new Date(due).toLocaleString()}.`}
        </p>
        {unseen.length === 0 && <p className="mt-2 text-sm text-gray-400">All transfer prompts have been exposed. Further attempts are labelled repeat practice.</p>}
        {isError && <p role="alert" className="mt-2 text-sm text-signal-anomaly">Learning history could not be loaded. Try reopening this page.</p>}
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="btn-ghost" disabled={busy || isPending || isError} onClick={() => void start('practice')}>Start guided practice</button>
          <button className="btn-ghost" disabled={busy || isPending || isError || due == null || Date.now() < due} onClick={() => void start('transfer')}>
            {unseen.length ? 'Start delayed transfer check' : 'Repeat transfer practice'}
          </button>
        </div>
      </>}
      {session && current && <>
        {session.mode === 'practice' && <div className="mt-3"><Markdown text={unit.body} /></div>}
        <p className="mt-2 text-sm text-gray-400">{session.assisted ? 'Guided or repeated practice' : 'Unseen delayed check: answer without notes'} · {index + 1} of {exercises.length}</p>
        <p className="mt-4 whitespace-pre-wrap text-sm">{current.prompt}</p>
        <Field label="Your answer" className="mt-3" description="Use the requested answer format. The checker accepts only the listed authored answers; free-form work needs self-review.">
          <textarea className="input min-h-24 w-full" value={answer} disabled={result !== null || busy} onChange={(e) => setAnswer(e.target.value)} />
        </Field>
        {result === null ? <button className="btn-ghost mt-3" disabled={busy || !answer.trim()} onClick={() => void check()}>Check answer</button> : <>
          {session.mode === 'transfer' && !finished ? <p role="status" className="mt-4 text-sm text-gray-400">Answer recorded. Feedback is withheld until the whole check is finished.</p> : <div role="status" className="mt-4 text-sm">
            <p className={result ? 'text-signal-affirmative' : 'text-signal-caution'}>{result ? 'Matches the expected answer.' : 'Does not match an accepted answer.'}</p>
            <p className="mt-2">Accepted: {current.answers.join(' / ')}</p>
            <p className="mt-2 text-gray-400">{current.explanation}</p>
          </div>}
          {!finished && <button className="btn-ghost mt-3" onClick={() => { setIndex(index + 1); setAnswer(''); setResult(null) }}>Next exercise</button>}
        </>}
        {finished && <p role="status" className="mt-3 text-sm">Saved: {score} of {exercises.length}. {score < exercises.length ? 'Review the explanation and practise the missed rule again.' : 'Use this skill in a new task before treating it as mastered.'}</p>}
        {finished && session.mode === 'transfer' && exercises.length > 1 && <ol className="mt-4 space-y-3 text-sm" aria-label="Earlier answers in this check">
          {exercises.slice(0, -1).map((exercise, i) => <li key={exercise.id}>
            <p>{exercise.prompt}</p>
            <p className="mt-1">{responses[i] ? 'Matched' : 'Not matched'}. Accepted: {exercise.answers.join(' / ')}</p>
            <p className="mt-1 text-gray-400">{exercise.explanation}</p>
          </li>)}
        </ol>}
        <button className="btn-ghost ml-2 mt-3" disabled={busy} onClick={() => setSession(null)}>{finished ? 'Return to practice overview' : 'Leave practice'}</button>
      </>}
    </section>
  )
}
