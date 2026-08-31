import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useJapaneseTutorModel } from '../lib/useJapaneseTutorModel'
import { startTutorSession, useTutorSessionState } from '../lib/japaneseTutorSession'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import Section from '../components/Section'
import { TUTOR_PHASES, historyEvidence, type TutorSkill } from '@shared/japanese/tutor'
import type { JpTutorSkill } from '@shared/types'

const SKILL_LABEL: Record<TutorSkill, string> = {
  recall: 'Recall',
  sound: 'Sound',
  listening: 'Listening',
  reading: 'Reading',
  output: 'Output',
  curriculum: 'Curriculum'
}

export default function JapaneseTutorPage() {
  const navigate = useNavigate()
  const qc = useQueryClient()
  const activeSession = useTutorSessionState(false)
  const model = useJapaneseTutorModel()
  const [errorSkill, setErrorSkill] = useState<JpTutorSkill>('output')
  const [errorLabel, setErrorLabel] = useState('')
  const [errorDetail, setErrorDetail] = useState('')
  const [savingError, setSavingError] = useState(false)
  const [showAllErrors, setShowAllErrors] = useState(false)

  if (!model.ready) {
    return <PageStatus>Preparing your tutor plan…</PageStatus>
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

  function beginSession(): void {
    startTutorSession(plan, {
      due: stats.dueCount,
      reviewsToday: stats.reviewsToday,
      introducedToday: stats.introducedToday,
      chaptersRead: detail.journey.chaptersRead
    })
    navigate('/japanese/tutor/session')
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
        title="Tutor"
        subtitle="Your complete path from kana-complete beginner to independent manga, visual-novel, and anime use. Recommendations respond to your evidence, but every lesson and tool remains open."
        actions={
          <>
            <Link to="/japanese/stats" className="btn-ghost">Evidence</Link>
            {activeSession ? (
              <Link to="/japanese/tutor/session" className="btn-primary">Resume guided session</Link>
            ) : (
              <button type="button" className="btn-primary" onClick={beginSession}>Start guided session</button>
            )}
          </>
        }
      />

      <div className="grid min-w-0 gap-7 lg:grid-cols-[minmax(0,1fr)_330px]">
        <div className="min-w-0">
          <section className="mb-9 border-b border-base-700 pb-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">Today: one balanced hour</h2>
                <p className="mt-2 max-w-3xl leading-relaxed text-gray-400">
                  {plan.phase.title}. Work from recall into comprehension, then finish with production and one carefully chosen lesson or repair.
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-semibold tabular-nums text-white">{plan.totalMinutes} min</p>
                <p className="mt-1 text-xs text-gray-500">recommended, never locked</p>
              </div>
            </div>

            <div className="mt-6 divide-y divide-base-700 border-y border-base-700">
              {plan.tasks.map((task, index) => (
                <div
                  key={`${task.skill}-${task.title}`}
                  className="grid gap-3 py-4 sm:grid-cols-[44px_105px_minmax(0,1fr)_auto] sm:items-center"
                >
                  <span className="text-xs tabular-nums text-gray-500">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="text-sm font-medium text-white">{SKILL_LABEL[task.skill]}</p>
                    <p className="mt-0.5 text-xs text-gray-500">{task.minutes} minutes</p>
                  </div>
                  <div>
                    <p className="font-medium text-white">{task.title}</p>
                    <p className="mt-1 text-sm leading-6 text-gray-400">{task.detail}</p>
                    <p className="mt-1 text-xs text-gray-500">Why now: {task.reason}</p>
                  </div>
                  <Link to={task.route} className="btn-ghost">
                    Open
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <Section title="Weekly operating rhythm" subtitle="for roughly one hour a day">
            <div className="grid gap-x-8 gap-y-5 border-y border-base-700 py-5 sm:grid-cols-2">
              <Rhythm title="Five standard days" body="Complete the sixty-minute plan in order. If review runs long, reduce new cards before cutting reading." />
              <Rhythm title="Two output sessions" body="Complete at least two controlled-output units. Revise after comparison; do not count an unrepaired first draft." />
              <Rhythm title="Four reading contacts" body="Use local manga or visual-novel text on four days. Graded reading fills the gap when native text is too costly." />
              <Rhythm title="Two listening contacts" body="Use guided sentence audio early. From Step 10, replace one or both with a staged local-media session." />
              <Rhythm title="One checkpoint" body="Review the evidence rail, repeat the weakest measured skill, and move forward only when the current material feels manageable." />
              <Rhythm title="One low-pressure day" body="Clear due reviews, then enjoy local media. Mine only language you want to meet again." />
            </div>
          </Section>

          <Section title="Tutor record" subtitle="durable debriefs and recurring problems">
            <div className="grid gap-8 border-y border-base-700 py-5 xl:grid-cols-2">
              <div className="min-w-0">
                <h3 className="font-medium text-white">Recent study days</h3>
                {tutorDays.length === 0 ? (
                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    Close a guided Tutor session to save its first debrief here.
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
                  <h3 className="font-medium text-white">Open error ledger</h3>
                  {openErrors.length > 0 && (
                    <span className="text-xs tabular-nums text-gray-500">
                      {openErrors.length} open
                    </span>
                  )}
                </div>
                {openErrors.length === 0 ? (
                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    Weak measured results and problems you report will stay here until resolved.
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
                                Resolve
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

          <Section title="Full roadmap" subtitle="five phases; exit evidence guides, never gates">
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
                        If this evidence is missing, keep later content open but spend the five-minute repair block here.
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
            <h2 className="text-sm font-semibold text-white">Tutor diagnosis</h2>
            {plan.weakness ? (
              <>
                <p className="mt-3 text-lg font-medium text-signal-caution">{plan.weakness.label}</p>
                <p className="mt-2 text-sm leading-6 text-gray-400">{plan.weakness.evidence}</p>
                <Link to={plan.weakness.route} className="btn-ghost mt-4 w-full text-center">Open repair practice</Link>
              </>
            ) : (
              <p className="mt-3 text-sm leading-6 text-gray-400">No measured skill is below its current target. Keep the balanced loop.</p>
            )}
            {plan.lessonHeld && (
              <p className="mt-4 border-t border-base-700 pt-4 text-sm leading-6 text-signal-caution">
                New lesson recommendation held because {stats.newAvailableCount} unseen cards are already waiting. The roadmap remains open.
              </p>
            )}
          </div>

          <div className="card p-5">
            <h2 className="text-sm font-semibold text-white">Report a recurring problem</h2>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Record something the automatic checks cannot see. The Tutor keeps it until you resolve it.
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
              {savingError ? 'Recording problem…' : 'Add to error ledger'}
            </button>
          </div>

          <div className="card p-5">
            <h2 className="text-sm font-semibold text-white">Current evidence</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <Evidence label="Course frontier" value={`Step ${frontierStep}`} />
              <Evidence label="Due cards" value={String(stats.dueCount)} />
              <Evidence label="Strict retention, 30d" value={detail.retention.strict30 == null ? 'not measured' : `${Math.round(detail.retention.strict30 * 100)}%`} />
              <Evidence label="Sound check" value={formatAccuracy(historyEvidence(history.jpPhonology).accuracy)} />
              <Evidence label="Guided listening" value={formatAccuracy(historyEvidence(history.listening).accuracy)} />
              <Evidence label="Long-form listening" value={formatAccuracy(historyEvidence(history.jpImmersion).accuracy)} />
              <Evidence label="Connected reading" value={formatAccuracy(historyEvidence(history.jpReading).accuracy)} />
              <Evidence label="Controlled output" value={formatAccuracy(historyEvidence(history.jpOutput).accuracy)} />
              <Evidence label="Chapters read" value={String(detail.journey.chaptersRead)} />
            </dl>
            <p className="mt-4 border-t border-base-700 pt-4 text-xs leading-5 text-gray-500">
              Missing evidence becomes a recommendation to sample that skill. It is not treated as failure.
            </p>
          </div>

          <div className="card p-5">
            <h2 className="text-sm font-semibold text-white">Local curriculum</h2>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              {nextChapter && currentManga
                ? `Reading: ${currentManga.title} · ${nextChapter.title}`
                : currentVisualNovel
                  ? `Visual novel: ${currentVisualNovel.title}. Use a bounded scene, then return for output.`
                  : 'Attach a manga or EPUB chapter to turn the local reader into curriculum.'}
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              {(videoLibrary?.files.length ?? 0) > 0 && currentAnime
                ? `Listening: ${currentAnime.title} · ${videoLibrary!.files.length} local file${videoLibrary!.files.length === 1 ? '' : 's'}`
                : 'Attach an anime video folder to unlock staged long-form listening.'}
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Rhythm({ title, body }: { title: string; body: string }) {
  return <div><h3 className="font-medium text-white">{title}</h3><p className="mt-1 text-sm leading-6 text-gray-400">{body}</p></div>
}

function Evidence({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between gap-3"><dt className="text-gray-500">{label}</dt><dd className="text-right text-white">{value}</dd></div>
}

function formatAccuracy(value: number | null): string {
  return value == null ? 'not sampled' : `${value}%`
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
