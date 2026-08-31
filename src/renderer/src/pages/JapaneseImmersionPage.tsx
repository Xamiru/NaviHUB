import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import Section from '../components/Section'
import TutorSessionContinue from '../components/TutorSessionContinue'
import {
  formatVideoStudyCue,
  formatVideoStudyTime,
  parseVideoStudyRange
} from '@shared/videoStudyRange'

type PassId = 'cold' | 'jp-subs' | 'transcript' | 'shadow' | 'retell'

interface ImmersionStage {
  id: string
  title: string
  duration: string
  target: string
}

const STAGES: ImmersionStage[] = [
  { id: 'scene-2', title: 'Known two-minute scene', duration: '2 minutes', target: 'Follow the situation and one character’s intention.' },
  { id: 'sequence-5', title: 'Short sequence', duration: '5 minutes', target: 'Track the event chain without translating every line.' },
  { id: 'sequence-10', title: 'Long scene', duration: '10 minutes', target: 'Hold context across topic changes and selective replay.' },
  { id: 'episode-subs', title: 'Episode with Japanese subtitles', duration: 'Full episode', target: 'Use subtitles to confirm sound, not replace listening.' },
  { id: 'episode-cold', title: 'Episode cold pass', duration: 'Full episode', target: 'Sustain gist without subtitles, then verify only important misses.' }
]

const PASSES: Array<{ id: PassId; title: string; body: string }> = [
  { id: 'cold', title: 'Cold pass', body: 'Listen once without subtitles. Record only the situation, goal, and emotional change.' },
  { id: 'jp-subs', title: 'Japanese-subtitle pass', body: 'Replay with Japanese subtitles. Mark where sound and text did not connect.' },
  { id: 'transcript', title: 'Focused transcript pass', body: 'Inspect only the blocking lines. Mine recurring or scene-critical language.' },
  { id: 'shadow', title: 'Shadow selected lines', body: 'Choose three short lines. Match mora timing and phrasing, then replay your own voice.' },
  { id: 'retell', title: 'Retell from memory', body: 'Close the transcript and summarize what happened, why, and what changed.' }
]

function stageMinutes(id: string): number {
  if (id === 'scene-2') return 2
  if (id === 'sequence-5') return 5
  if (id === 'sequence-10') return 10
  return 24
}

export default function JapaneseImmersionPage() {
  const qc = useQueryClient()
  const [busy, setBusy] = useState(false)
  const [mediaId, setMediaId] = usePersistedState('jpImmersionMedia', 0)
  const [fileId, setFileId] = usePersistedState('jpImmersionFile', 0)
  const [stageId, setStageId] = usePersistedState('jpImmersionStage', STAGES[0].id)
  const [passes, setPasses] = usePersistedState<PassId[]>('jpImmersionPasses', [])
  const [retell, setRetell] = usePersistedState('jpImmersionRetell', '')
  const [comprehension, setComprehension] = usePersistedState('jpImmersionComprehension', 3)
  const [active, setActive] = usePersistedState('jpImmersionActive', false)
  const [logged, setLogged] = usePersistedState('jpImmersionLogged', false)
  const [rangeStartMinutes, setRangeStartMinutes] = usePersistedState('jpImmersionRangeMin', 0)
  const [rangeStartSeconds, setRangeStartSeconds] = usePersistedState('jpImmersionRangeSec', 0)
  const [rangeMinutes, setRangeMinutes] = usePersistedState('jpImmersionRangeLength', 2)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')

  const { data: anime = [] } = useQuery({
    queryKey: qk.media.list({ mediaType: 'anime' }),
    queryFn: () => api.media.list({ mediaType: 'anime' })
  })
  useEffect(() => {
    if (!mediaId && anime[0]) setMediaId(anime[0].id)
  }, [anime, mediaId, setMediaId])

  const { data: library } = useQuery({
    queryKey: qk.video.library(mediaId),
    queryFn: () => api.video.files(mediaId),
    enabled: mediaId > 0
  })
  const files = library?.files ?? []
  useEffect(() => {
    if (files.length > 0 && !files.some((file) => file.id === fileId)) setFileId(files[0].id)
  }, [fileId, files, setFileId])

  const media = anime.find((item) => item.id === mediaId) ?? null
  const file = files.find((item) => item.id === fileId) ?? null
  const stage = STAGES.find((item) => item.id === stageId) ?? STAGES[0]
  const completedPasses = useMemo(() => new Set(passes), [passes])
  const rangeStart = Math.max(0, Math.floor(rangeStartMinutes) * 60 + Math.floor(rangeStartSeconds))
  const rangeEnd = rangeStart + Math.max(0.5, rangeMinutes) * 60
  const studyRange = parseVideoStudyRange(rangeStart, rangeEnd)!
  const rangeCue = formatVideoStudyCue(studyRange)
  useEffect(() => setCopyState('idle'), [rangeCue])

  function resetSession(): void {
    setPasses([])
    setRetell('')
    setComprehension(3)
    setLogged(false)
  }

  function selectMedia(nextId: number): void {
    setMediaId(nextId)
    setFileId(0)
    resetSession()
  }

  function togglePass(id: PassId): void {
    setPasses((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    )
  }

  function startSession(): void {
    resetSession()
    setActive(true)
  }

  async function copyRangeCue(): Promise<void> {
    try {
      await navigator.clipboard.writeText(rangeCue)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
  }

  async function finishSession(): Promise<void> {
    if (!file || !media) return
    setBusy(true)
    try {
      await api.quiz.logSession({
        kind: 'jpImmersion',
        score: comprehension,
        total: 5,
        bestStreak: 0,
        settings: {
          mediaId: media.id,
          fileId: file.id,
          stageId: stage.id,
          rangeStart,
          rangeEnd,
          passes,
          retellLength: retell.trim().length
        }
      })
      await qc.invalidateQueries({ queryKey: qk.quiz.history('jpImmersion') })
      setLogged(true)
    } finally {
      setBusy(false)
    }
  }

  if (anime.length === 0) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <PageHeader
          back={{ to: '/japanese', label: 'Japanese' }}
          title="Long-form listening"
          subtitle="Turn locally attached anime into a five-pass listening curriculum."
        />
        <EmptyState
          title="No anime in the library"
          body="Import an anime, attach its local video folder from the title page, then return here. All study happens locally."
          action={<Link to="/anime" className="btn-primary">Open anime library</Link>}
        />
      </div>
    )
  }

  if (active && file && media) {
    return (
      <div className="mx-auto max-w-5xl p-4 sm:p-6">
        <PageHeader
          back={{ to: '/japanese/immersion', label: 'Listening setup' }}
          title={stage.title}
          subtitle={`${media.title} · ${file.title} · ${stage.duration}. ${stage.target}`}
          actions={
            <>
              <button
                type="button"
                className="btn-primary"
                onClick={() => void api.video.openExternal({ kind: 'file', fileId: file.id })}
              >
                Open in system player
              </button>
              <button type="button" className="btn-ghost" onClick={() => void copyRangeCue()}>
                {copyState === 'copied'
                  ? 'Range copied'
                  : copyState === 'failed'
                    ? 'Copy failed'
                    : 'Copy seek range'}
              </button>
              <button className="btn-ghost" onClick={() => setActive(false)}>Change setup</button>
            </>
          }
        />

        <div className="grid min-w-0 gap-7 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">
            <section className="mb-7 border-y border-accent/40 bg-accent/5 px-1 py-5">
              <h2 className="text-lg font-semibold text-white">{rangeCue}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-400">
                Open the file once, seek to the start, and pause at the stop cue after every pass.
                Keep the player unrestricted if you need surrounding context; only this range counts for the drill.
              </p>
            </section>
            <Section title="Five-pass protocol" subtitle={`${passes.length} of ${PASSES.length} marked`}>
              <div className="divide-y divide-base-700 border-y border-base-700">
                {PASSES.map((pass, passIndex) => {
                  const done = completedPasses.has(pass.id)
                  return (
                    <button
                      key={pass.id}
                      className={`grid w-full gap-2 px-1 py-4 text-left sm:grid-cols-[40px_minmax(0,1fr)_90px] sm:items-center ${
                        done ? 'text-gray-400' : 'hover:bg-base-700/30'
                      }`}
                      aria-pressed={done}
                      onClick={() => togglePass(pass.id)}
                    >
                      <span className="text-xs tabular-nums text-gray-500">{String(passIndex + 1).padStart(2, '0')}</span>
                      <span>
                        <span className={`font-medium ${done ? 'text-gray-400' : 'text-white'}`}>{pass.title}</span>
                        <span className="mt-1 block text-sm leading-6 text-gray-500">{pass.body}</span>
                      </span>
                      <span className={`text-right text-xs ${done ? 'text-accent' : 'text-gray-500'}`}>
                        {done ? 'completed' : 'mark complete'}
                      </span>
                    </button>
                  )
                })}
              </div>
            </Section>

            <Section title="Retell evidence" subtitle="Japanese preferred; notes are acceptable">
              <textarea
                aria-label="Retell the listening range from memory"
                className="input min-h-44 w-full resize-y leading-7"
                value={retell}
                onChange={(event) => setRetell(event.target.value)}
                placeholder="From memory: what happened, why did it happen, and what changed?"
              />
            </Section>
          </div>

          <aside className="card self-start p-5 lg:sticky lg:top-6">
            <h2 className="text-sm font-semibold text-white">Session evidence</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-3"><dt className="text-gray-500">Protocol</dt><dd>{passes.length} / 5</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-gray-500">Retell</dt><dd>{retell.trim().length} chars</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-gray-500">Range</dt><dd>{formatVideoStudyTime(studyRange.start)}-{formatVideoStudyTime(studyRange.end)}</dd></div>
            </dl>
            <label className="label mt-6 block" htmlFor="jp-immersion-score">Comprehension after verification</label>
            <select
              id="jp-immersion-score"
              className="input mt-2 w-full"
              value={comprehension}
              onChange={(event) => setComprehension(Number(event.target.value))}
            >
              <option value={1}>1 · fragments only</option>
              <option value={2}>2 · situation, many gaps</option>
              <option value={3}>3 · gist and main change</option>
              <option value={4}>4 · most details</option>
              <option value={5}>5 · accurate without support</option>
            </select>
            <p className="mt-3 text-xs leading-5 text-gray-500">
              You may log an incomplete protocol. The Tutor counts this block only after at least three passes
              and a forty-character retell; the ladder never locks your media.
            </p>
            <button className="btn-primary mt-5 w-full" disabled={logged || busy} onClick={() => void finishSession()}>
              {logged ? 'Session logged' : busy ? 'Logging…' : 'Log listening evidence'}
            </button>
            {logged && (
              <>
                <TutorSessionContinue fallbackTo="/japanese/tutor" fallbackLabel="Return to tutor" className="btn-ghost mt-2 block w-full text-center" />
                <button className="btn-ghost mt-2 w-full" onClick={startSession}>Start another pass</button>
              </>
            )}
          </aside>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6">
      <PageHeader
        back={{ to: '/japanese', label: 'Japanese' }}
        title="Long-form listening"
        subtitle="A staged path from a familiar two-minute scene to full episodes without subtitles. NaviHUB keeps the protocol, boundaries, notes, and evidence together while playback stays in your system player."
        actions={<Link to="/japanese/tutor" className="btn-ghost">Tutor plan</Link>}
      />

      <Section title="Choose local media">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="label">
            Anime
            <select aria-label="Anime for long-form listening" className="input mt-2 w-full" value={mediaId} onChange={(event) => selectMedia(Number(event.target.value))}>
              {anime.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
            </select>
          </label>
          <label className="label">
            Local file
            <select aria-label="Local video file for long-form listening" className="input mt-2 w-full" value={fileId} onChange={(event) => { setFileId(Number(event.target.value)); resetSession() }} disabled={files.length === 0}>
              {files.length === 0 ? <option value={0}>No attached files</option> : files.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
            </select>
          </label>
        </div>
        {!library?.localDir && media && (
          <p className="mt-3 text-sm text-signal-caution">
            This title has no attached video folder. <Link className="underline hover:text-white" to={`/anime/${media.id}`}>Attach one on its title page.</Link>
          </p>
        )}
      </Section>

      <Section title="Listening ladder" subtitle="choose the hardest stage that still preserves gist">
        <div className="divide-y divide-base-700 border-y border-base-700">
          {STAGES.map((item, itemIndex) => (
            <button
              key={item.id}
              className={`grid w-full gap-2 px-1 py-4 text-left sm:grid-cols-[40px_190px_minmax(0,1fr)_110px] sm:items-center ${
                item.id === stage.id ? 'bg-accent/10' : 'hover:bg-base-700/30'
              }`}
              aria-pressed={item.id === stage.id}
              onClick={() => {
                setStageId(item.id)
                setRangeMinutes(stageMinutes(item.id))
              }}
            >
              <span className="text-xs tabular-nums text-gray-500">{String(itemIndex + 1).padStart(2, '0')}</span>
              <span className={item.id === stage.id ? 'font-medium text-accent' : 'font-medium text-white'}>{item.title}</span>
              <span className="text-sm leading-6 text-gray-500">{item.target}</span>
              <span className="text-right text-xs text-gray-400">{item.duration}</span>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Exact study range" subtitle="seek to these boundaries in the system player">
        <div className="grid gap-4 sm:grid-cols-[1fr_1fr_1.2fr]">
          <label className="label">
            Start minute
            <input
              aria-label="Study range start minute"
              type="number"
              className="input mt-2 w-full"
              min={0}
              step={1}
              value={rangeStartMinutes}
              onChange={(event) => setRangeStartMinutes(Math.max(0, Number(event.target.value) || 0))}
            />
          </label>
          <label className="label">
            Start second
            <input
              aria-label="Study range start second"
              type="number"
              className="input mt-2 w-full"
              min={0}
              max={59}
              step={1}
              value={rangeStartSeconds}
              onChange={(event) => setRangeStartSeconds(Math.min(59, Math.max(0, Number(event.target.value) || 0)))}
            />
          </label>
          <label className="label">
            Range length, minutes
            <input
              aria-label="Study range length in minutes"
              type="number"
              className="input mt-2 w-full"
              min={0.5}
              max={240}
              step={0.5}
              value={rangeMinutes}
              onChange={(event) => setRangeMinutes(Math.min(240, Math.max(0.5, Number(event.target.value) || 0.5)))}
            />
          </label>
        </div>
        <p className="mt-3 text-sm text-gray-400">
          Study from {formatVideoStudyTime(studyRange.start)} to {formatVideoStudyTime(studyRange.end)}.
          NaviHUB records the exact boundaries with the session; the system player remains unrestricted
          and must be paused at the end manually.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-base-700 pt-4">
          <p className="text-sm font-medium text-white">{rangeCue}</p>
          <button type="button" className="btn-ghost" onClick={() => void copyRangeCue()}>
            {copyState === 'copied'
              ? 'Range copied'
              : copyState === 'failed'
                ? 'Copy failed; select the cue manually'
                : 'Copy seek range'}
          </button>
        </div>
      </Section>

      <button className="btn-primary" disabled={!file} onClick={startSession}>Begin the five-pass session</button>
    </div>
  )
}
