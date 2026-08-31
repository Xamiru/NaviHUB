import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import PageHeader from '../components/PageHeader'
import Section from '../components/Section'
import StudySessionFrame, {
  SessionEvidence,
  SessionFeedback
} from '../components/StudySessionFrame'
import TutorSessionContinue from '../components/TutorSessionContinue'
import { PHONOLOGY_UNITS, type PhonologyUnit } from '@shared/japanese/phonology'

type Phase = 'learn' | 'check' | 'summary'

function playMorae(count: number): void {
  const AudioContextClass = window.AudioContext
  const ctx = new AudioContextClass()
  const start = ctx.currentTime + 0.06
  for (let i = 0; i < count; i++) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const at = start + i * 0.42
    osc.frequency.value = i === 0 ? 740 : 620
    gain.gain.setValueAtTime(0, at)
    gain.gain.linearRampToValueAtTime(0.12, at + 0.006)
    gain.gain.exponentialRampToValueAtTime(0.001, at + 0.055)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(at)
    osc.stop(at + 0.06)
  }
  window.setTimeout(() => void ctx.close(), Math.ceil((count * 0.42 + 0.5) * 1000))
}

export default function JapanesePhonologyPage() {
  const qc = useQueryClient()
  const [unitId, setUnitId] = useState(PHONOLOGY_UNITS[0].id)
  const [phase, setPhase] = useState<Phase>('learn')
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const loggedRef = useRef(false)
  const unit = PHONOLOGY_UNITS.find((item) => item.id === unitId) ?? PHONOLOGY_UNITS[0]

  const { data: history } = useQuery({
    queryKey: qk.quiz.historyAll('jpPhonology'),
    queryFn: () => api.quiz.history('jpPhonology', 200)
  })
  const completed = useMemo(
    () => new Set((history?.recent ?? []).map((session) => String(session.settings?.unitId ?? ''))),
    [history]
  )

  function selectUnit(next: PhonologyUnit): void {
    setUnitId(next.id)
    setPhase('learn')
    setIndex(0)
    setPicked(null)
    setScore(0)
  }

  function startCheck(): void {
    setPhase('check')
    setIndex(0)
    setPicked(null)
    setScore(0)
    loggedRef.current = false
  }

  function choose(option: number): void {
    if (picked !== null) return
    setPicked(option)
    if (option === unit.questions[index].correct) setScore((value) => value + 1)
  }

  function advance(): void {
    if (picked === null) return
    if (index + 1 < unit.questions.length) {
      setIndex((value) => value + 1)
      setPicked(null)
      return
    }
    if (!loggedRef.current) {
      loggedRef.current = true
      void api.quiz
        .logSession({
          kind: 'jpPhonology',
          score,
          total: unit.questions.length,
          bestStreak: 0,
          settings: { unitId: unit.id }
        })
        .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history('jpPhonology') }))
    }
    setPhase('summary')
  }

  useEffect(() => {
    if (phase !== 'check') return
    const onKey = (event: KeyboardEvent): void => {
      const target = event.target as HTMLElement
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target.isContentEditable
      )
        return
      const option = Number(event.key)
      if (picked === null && option >= 1 && option <= 4) {
        event.preventDefault()
        choose(option - 1)
      } else if (picked !== null && event.key === 'Enter') {
        event.preventDefault()
        advance()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, picked, index, unit])

  if (phase === 'check') {
    const question = unit.questions[index]
    return (
      <StudySessionFrame
        title="Japanese sound foundation"
        subtitle={unit.title}
        progress={{ current: index + 1, total: unit.questions.length, label: 'Unit check' }}
        actions={
          <button className="btn-ghost" onClick={() => setPhase('learn')}>
            Return to lesson
          </button>
        }
        rail={
          <SessionEvidence title="What this measures">
            <p>{unit.focus}</p>
            <p className="mt-3">
              This checks timing and sound-system decisions. It does not claim to judge your accent.
            </p>
          </SessionEvidence>
        }
        feedback={
          picked !== null ? (
            <SessionFeedback
              tone={picked === question.correct ? 'correct' : 'incorrect'}
              title={picked === question.correct ? 'Correct' : 'Review the distinction'}
            >
              <p>{question.explain}</p>
              <button className="btn-primary mt-4" onClick={advance}>
                {index + 1 === unit.questions.length ? 'Finish check' : 'Next question'}
              </button>
            </SessionFeedback>
          ) : undefined
        }
      >
        <h2 className="max-w-3xl text-xl font-medium leading-relaxed">{question.prompt}</h2>
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          {question.options.map((option, optionIndex) => {
            const answered = picked !== null
            const correct = optionIndex === question.correct
            const selected = optionIndex === picked
            const state = answered
              ? correct
                ? 'border-signal-affirmative/60 bg-signal-affirmative/10 text-signal-affirmative'
                : selected
                  ? 'border-signal-anomaly/60 bg-signal-anomaly/10 text-signal-anomaly'
                  : 'border-base-700 opacity-55'
              : 'border-base-700 hover:border-accent hover:bg-base-700/50'
            return (
              <button
                key={option}
                className={`min-h-14 rounded-md border px-4 py-3 text-left ${state}`}
                disabled={answered}
                onClick={() => choose(optionIndex)}
              >
                <kbd className="kbd mr-3">{optionIndex + 1}</kbd>
                {option}
              </button>
            )
          })}
        </div>
      </StudySessionFrame>
    )
  }

  if (phase === 'summary') {
    const percent = Math.round((score / unit.questions.length) * 100)
    return (
      <div className="mx-auto max-w-xl p-6">
        <PageHeader
          back={{ to: '/japanese/tutor', label: 'Tutor' }}
          title="Unit complete"
          subtitle={`${unit.title}: ${score} of ${unit.questions.length} correct (${percent}%). Aim for 80% before treating this distinction as stable.`}
        />
        <div className="flex flex-wrap gap-2">
          <button className="btn-primary" onClick={() => setPhase('learn')}>
            Review examples
          </button>
          <button
            className="btn-ghost"
            onClick={() => {
              const next = PHONOLOGY_UNITS[(PHONOLOGY_UNITS.indexOf(unit) + 1) % PHONOLOGY_UNITS.length]
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
        title="Japanese sound foundation"
        subtitle="Eight offline units on mora timing, vowel length, consonant closure, devoicing, particles, pitch, and connected speech. Generated beats train timing without pretending to grade your voice."
        actions={<Link to="/japanese/tutor" className="btn-ghost">Tutor plan</Link>}
      />

      <div className="grid min-w-0 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <nav className="card divide-y divide-base-700 self-start" aria-label="Sound units">
          {PHONOLOGY_UNITS.map((item, itemIndex) => (
            <button
              key={item.id}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left first:rounded-t-lg last:rounded-b-lg ${
                item.id === unit.id ? 'bg-accent/10 text-accent' : 'hover:bg-base-700/50'
              }`}
              aria-current={item.id === unit.id ? 'page' : undefined}
              onClick={() => selectUnit(item)}
            >
              <span className="w-6 shrink-0 text-xs tabular-nums text-gray-500">
                {String(itemIndex + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0 flex-1 text-sm">{item.title}</span>
              {completed.has(item.id) && <span className="text-xs text-gray-400">done</span>}
            </button>
          ))}
        </nav>

        <div className="min-w-0">
          <div className="border-b border-base-700 pb-5">
            <h2 className="text-2xl font-semibold text-white">{unit.title}</h2>
            <p className="mt-2 max-w-3xl leading-relaxed text-gray-400">{unit.focus}</p>
          </div>

          <Section title="Lesson" className="mt-6 mb-8">
            <div className="max-w-3xl space-y-3 text-[15px] leading-7 text-gray-300">
              {unit.lesson.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </Section>

          <Section title="Hear the timing" subtitle="generated beat, then your voice" className="mb-8">
            <div className="divide-y divide-base-700 border-y border-base-700">
              {unit.examples.map((example) => (
                <div key={example.jp} className="grid gap-3 py-4 sm:grid-cols-[160px_minmax(0,1fr)_auto] sm:items-center">
                  <div>
                    <p className="text-xl text-white">{example.jp}</p>
                    <p className="mt-1 text-sm text-gray-500">{example.reading}</p>
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-1.5" aria-label={`${example.morae.length} morae`}>
                      {example.morae.map((mora, moraIndex) => (
                        <span key={`${mora}-${moraIndex}`} className="chip min-w-9 justify-center text-center">
                          {mora}
                        </span>
                      ))}
                    </div>
                    <p className="mt-2 text-sm text-gray-400">{example.note}</p>
                  </div>
                  <button className="btn-ghost" onClick={() => playMorae(example.morae.length)}>
                    Play {example.morae.length} beats
                  </button>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Production protocol" className="mb-6">
            <p className="max-w-3xl leading-relaxed text-gray-300">{unit.practice}</p>
          </Section>

          <button className="btn-primary" onClick={startCheck}>Start the three-question check</button>
        </div>
      </div>
    </div>
  )
}
