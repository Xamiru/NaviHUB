import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useJapaneseTutorModel } from '../lib/useJapaneseTutorModel'
import { useTutorSessionState } from '../lib/japaneseTutorSession'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import Section from '../components/Section'
import { TUTOR_PHASES, TUTOR_SKILL_LABEL as SKILL_LABEL, historyEvidence } from '@shared/japanese/tutor'
import type { JpTutorSkill } from '@shared/types'

// Explains how Today builds a session, the five phases from kana to native
// media, and the learner's record. Starting a session happens on Today.
export default function JapaneseTutorPage() {
  const qc = useQueryClient()
  const activeSession = useTutorSessionState(false)
  const model = useJapaneseTutorModel()
  const [errorSkill, setErrorSkill] = useState<JpTutorSkill>('output')
  const [errorLabel, setErrorLabel] = useState('')
  const [errorDetail, setErrorDetail] = useState('')
  const [savingError, setSavingError] = useState(false)
  const [showAllErrors, setShowAllErrors] = useState(false)

  if (!model.ready) {
    return <PageStatus>Preparing your plan…</PageStatus>
  }
  const {
    stats,
    detail,
    plan,
    history,
    frontierStep,
    currentManga,
    currentAnime,
    currentVisualNovel,
    nextChapter,
    videoLibrary,
    tutorDays,
    tutorErrors
  } = model
  const openErrors = tutorErrors.filter((item) => !item.resolvedAt)
  const visibleErrors = showAllErrors ? openErrors : openErrors.slice(0, 7)
  const occurrenceCount = new Map<string, number>()
  for (const item of tutorErrors) {
    const key = `${item.skill}:${item.label}`
    occurrenceCount.set(key, (occurrenceCount.get(key) ?? 0) + 1)
  }

  async function recordProblem(): Promise<void> {
    if (!errorLabel.trim() || !errorDetail.trim() || savingError) return
    setSavingError(true)
    try {
      await api.japanese.addTutorError({
        day: localDay(),
        skill: errorSkill,
        label: errorLabel,
        detail: errorDetail,
        sourceKind: 'manual'
      })
      setErrorLabel('')
      setErrorDetail('')
      await qc.invalidateQueries({ queryKey: qk.japanese.tutorErrors })
    } finally {
      setSavingError(false)
    }
  }

  async function resolveProblem(id: number): Promise<void> {
    await api.japanese.resolveTutorError(id, true)
    await qc.invalidateQueries({ queryKey: qk.japanese.tutorErrors })
  }

  return (
    <div className="mx-auto max-w-[1400px] p-4 sm:p-6">
      <PageHeader
        back={{ to: '/japanese', label: 'Japanese' }}
        title="How your plan works"
        subtitle="How Today picks your session, the five phases from your first kana to reading and watching on your own, and the problems you are working on. Nothing here is ever locked."
        actions={
          <>
            <Link to="/japanese/stats" className="btn-ghost">Stats</Link>
            <Link to={activeSession ? '/japanese/tutor/session' : '/japanese'} className="btn-primary">
              {activeSession ? 'Resume session' : 'Go to Today'}
            </Link>
          </>
        }
      />

      <div className="grid min-w-0 gap-7 lg:grid-cols-[minmax(0,1fr)_330px]">
        <div className="min-w-0">
          <Section title="How Today builds a session" subtitle={`${plan.phase.title} right now`}>
            <dl className="grid gap-x-8 gap-y-5 border-y border-base-700 py-5 sm:grid-cols-2">
              <Rhythm title="10 minutes" body="Reviews only. On a day with nothing to review, the next lesson and a first look at its words." />
              <Rhythm title="20 minutes" body="Reviews, then reading or listening, whichever you have done less of lately, so the two take turns." />
              <Rhythm title="40 minutes" body="Reviews, listening and reading." />
              <Rhythm title="60 minutes" body="Adds making your own sentences, and either the next lesson or a few minutes on your weakest measured skill." />
              <Rhythm title="Starting out" body="Kana comes first until you can read it. Listening uses the sound-system units until you know enough words to understand sentences." />
              <Rhythm title="Nothing is forced" body="Every block links to a tool you can also open any time. A skill you have not tried yet is never treated as a weakness." />
            </dl>
          </Section>

          <Section title="A good week" subtitle="if you study most days">
            <dl className="grid gap-x-8 gap-y-5 border-y border-base-700 py-5 sm:grid-cols-2">
              <Rhythm title="Most days" body="Do a session from Today. If reviews run long, add fewer new cards rather than skipping reading." />
              <Rhythm title="Twice a week" body="Make your own sentences: write a first try, compare it with the example, then improve it." />
              <Rhythm title="Four days" body="Read something: graded passages early on, your own manga or novels once they are manageable." />
              <Rhythm title="Twice a week" body="Listen: short sentences early on, scenes from your own anime from Step 10." />
              <Rhythm title="Once a week" body="Look at Stats, practise your weakest skill, and move on when the current material feels manageable." />
              <Rhythm title="One easy day" body="Clear your reviews, then just enjoy something in Japanese. Save only the words you want to see again." />
            </dl>
          </Section>

          <Section title="Your record" subtitle="past sessions and problems you are working on">
            <div className="grid gap-8 border-y border-base-700 py-5 xl:grid-cols-2">
              <div className="min-w-0">
                <h3 className="font-medium text-white">Recent study days</h3>
                {tutorDays.length === 0 ? (
                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    Finish a session from Today to see it here.
                  </p>
                ) : (
                  <div className="mt-3 divide-y divide-base-700">
                    {tutorDays.slice(0, 7).map((day) => (
                      <div key={day.id} className="grid gap-2 py-3 sm:grid-cols-[100px_minmax(0,1fr)_auto] sm:items-center">
                        <time className="text-xs tabular-nums text-gray-500" dateTime={day.day}>
                          {formatDay(day.day)}
                        </time>
                        <div className="min-w-0">
                          <p className="text-sm text-white">{day.completedBlocks} of {day.totalBlocks} blocks</p>
                          <p className="mt-0.5 break-words text-xs text-gray-500">Next: {day.tomorrowFocus}</p>
                        </div>
                        <span className="text-xs tabular-nums text-gray-400">
                          {day.completedMinutes} / {day.plannedMinutes} planned min
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-medium text-white">Problems to work on</h3>
                  {openErrors.length > 0 && (
                    <span className="text-xs tabular-nums text-gray-500">
                      {openErrors.length} open
                    </span>
                  )}
                </div>
                {openErrors.length === 0 ? (
                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    Low scores and problems you add stay here until you mark them solved.
                  </p>
                ) : (
                  <div className="mt-3" aria-live="polite">
                    <div className="divide-y divide-base-700">
                      {visibleErrors.map((item) => {
                        const repeats = occurrenceCount.get(`${item.skill}:${item.label}`) ?? 1
                        return (
                          <div key={item.id} className="py-3">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="break-words text-sm font-medium text-white">{item.label}</p>
                                <p className="mt-1 break-words text-xs leading-5 text-gray-500">{item.detail}</p>
                                <p className="mt-1 text-xs text-gray-500">
                                  {SKILL_LABEL[item.skill]}{repeats > 1 ? ` · ${repeats} occurrences` : ''}
                                  {item.score == null ? '' : ` · ${item.score}% against ${item.threshold}%`}
                                </p>
                              </div>
                              <button type="button" className="btn-ghost shrink-0" onClick={() => void resolveProblem(item.id)}>
                                Solved
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    {openErrors.length > 7 && (
                      <button
                        type="button"
                        className="btn-ghost mt-3 w-full"
                        aria-expanded={showAllErrors}
                        onClick={() => setShowAllErrors((value) => !value)}
                      >
                        {showAllErrors ? 'Show the most recent 7' : `Show all ${openErrors.length} open problems`}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Section>

          <Section title="Five phases" subtitle="move on whenever it feels manageable">
            <div className="relative space-y-3 before:absolute before:bottom-6 before:left-[25px] before:top-6 before:w-px before:bg-accent/20">
              {TUTOR_PHASES.map((phase, phaseIndex) => {
                const current = phase.id === plan.phase.id
                return (
                  <article
                    key={phase.id}
                    className={`relative grid gap-4 rounded-lg border p-5 pl-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] ${
                      current ? 'border-accent/60 bg-accent/5' : 'border-base-700 bg-base-800/50'
                    }`}
                  >
                    <span className={`absolute left-4 top-5 flex h-5 w-5 items-center justify-center rounded-full border text-[10px] tabular-nums ${
                      current ? 'border-accent bg-accent text-base-900' : 'border-base-600 bg-base-800 text-gray-500'
                    }`}>
                      {phaseIndex + 1}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-baseline gap-2">
                        <h3 className="font-semibold text-white">{phase.title}</h3>
                        <span className="text-xs text-gray-500">{phase.stepRange}</span>
                        {current && <span className="chip text-accent">current phase</span>}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-gray-400">{phase.purpose}</p>
                      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gray-500">Every week</p>
                      <ul className="mt-2 space-y-2 text-sm leading-6 text-gray-300">
                        {phase.weeklyProof.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Ready for the next phase when</p>
                      <ul className="mt-2 space-y-2 text-sm leading-6 text-gray-300">
                        {phase.exitEvidence.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                      <p className="mt-4 text-xs leading-5 text-gray-500">
                        Nothing is locked. Until these are true, a full session spends a few minutes on them.
                      </p>
                    </div>
                  </article>
                )
              })}
            </div>
          </Section>
        </div>

        <aside className="min-w-0 space-y-5 lg:sticky lg:top-6 lg:self-start">
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-white">Weakest skill</h2>
            {plan.weakness && plan.weakness.score != null ? (
              <>
                <p className="mt-3 text-lg font-medium text-signal-caution">{plan.weakness.label}</p>
                <p className="mt-2 text-sm leading-6 text-gray-400">{plan.weakness.evidence}</p>
                <Link to={plan.weakness.route} className="btn-ghost mt-4 w-full text-center">Practise it</Link>
              </>
            ) : plan.weakness ? (
              <p className="mt-3 text-sm leading-6 text-gray-400">
                Nothing measured below target yet. {plan.weakness.label} has not been tried; scores appear after your first sessions.
              </p>
            ) : (
              <p className="mt-3 text-sm leading-6 text-gray-400">Every measured skill is on target. Keep going.</p>
            )}
            {plan.lessonHeld && (
              <p className="mt-4 border-t border-base-700 pt-4 text-sm leading-6 text-gray-300">
                New lessons are on hold because {stats.newAvailableCount} new cards are still waiting. Every lesson stays open.
              </p>
            )}
          </div>

          <div className="card p-5">
            <h2 className="text-sm font-semibold text-white">Add a problem</h2>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Something keeps tripping you up? Note it here and it stays until you mark it solved.
            </p>
            <label className="label mt-4" htmlFor="jp-tutor-error-skill">Skill</label>
            <select
              id="jp-tutor-error-skill"
              className="input"
              value={errorSkill}
              onChange={(event) => setErrorSkill(event.target.value as JpTutorSkill)}
            >
              {Object.entries(SKILL_LABEL).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <label className="label mt-3" htmlFor="jp-tutor-error-label">Problem</label>
            <input
              id="jp-tutor-error-label"
              className="input"
              value={errorLabel}
              maxLength={160}
              placeholder="For example, switching は and が"
              onChange={(event) => setErrorLabel(event.target.value)}
            />
            <label className="label mt-3" htmlFor="jp-tutor-error-detail">What keeps happening</label>
            <textarea
              id="jp-tutor-error-detail"
              className="input min-h-24 resize-y"
              value={errorDetail}
              maxLength={1200}
              placeholder="Describe the mistake and the situation where it appears."
              onChange={(event) => setErrorDetail(event.target.value)}
            />
            <button
              type="button"
              className="btn-primary mt-4 w-full"
              disabled={savingError || !errorLabel.trim() || !errorDetail.trim()}
              onClick={() => void recordProblem()}
            >
              {savingError ? 'Adding…' : 'Add problem'}
            </button>
          </div>

          <div className="card p-5">
            <h2 className="text-sm font-semibold text-white">Where you are</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <Evidence label="Course frontier" value={`Step ${frontierStep}`} />
              <Evidence label="Due cards" value={String(stats.dueCount)} />
              <Evidence label="Strict retention, 30d" value={detail.retention.strict30 == null ? 'not enough reviews' : `${Math.round(detail.retention.strict30 * 100)}%`} />
              <Evidence label="Sound check" value={formatAccuracy(historyEvidence(history.jpPhonology).accuracy)} />
              <Evidence label="Guided listening" value={formatAccuracy(historyEvidence(history.listening).accuracy)} />
              <Evidence label="Long-form listening" value={formatAccuracy(historyEvidence(history.jpImmersion).accuracy)} />
              <Evidence label="Connected reading" value={formatAccuracy(historyEvidence(history.jpReading).accuracy)} />
              <Evidence label="Output self-assessment" value={formatAccuracy(historyEvidence(history.jpOutput).accuracy)} />
              <Evidence label="Chapters read" value={String(detail.journey.chaptersRead)} />
            </dl>
            <p className="mt-4 border-t border-base-700 pt-4 text-xs leading-5 text-gray-500">
              A skill you have not tried is never counted as a weakness. Speaking and writing scores are your own ratings, not a fluency test; earlier sessions may rate the improved answer rather than the first draft.
            </p>
          </div>

          <div className="card p-5">
            <h2 className="text-sm font-semibold text-white">Your media</h2>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              {nextChapter && currentManga
                ? `Reading: ${currentManga.title} · ${nextChapter.title}`
                : currentVisualNovel
                  ? `Visual novel: ${currentVisualNovel.title}. Use a bounded scene, then return for output.`
                  : 'Add manga or EPUB chapters to read your own books in sessions.'}
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              {(videoLibrary?.files.length ?? 0) > 0 && currentAnime
                ? `Listening: ${currentAnime.title} · ${videoLibrary!.files.length} local file${videoLibrary!.files.length === 1 ? '' : 's'}`
                : 'Link an anime’s video folder to practise listening with your own episodes.'}
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Rhythm({ title, body }: { title: string; body: string }) {
  return <div><dt className="font-medium text-white">{title}</dt><dd className="mt-1 text-sm leading-6 text-gray-400">{body}</dd></div>
}

function Evidence({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between gap-3"><dt className="text-gray-500">{label}</dt><dd className="text-right text-white">{value}</dd></div>
}

function formatAccuracy(value: number | null): string {
  return value == null ? 'not tried yet' : `${value}%`
}

function localDay(date = new Date()): string {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('-')
}

function formatDay(value: string): string {
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return value
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(
    new Date(year, month - 1, day)
  )
}
