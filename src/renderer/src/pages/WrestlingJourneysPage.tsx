import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type {
  WrestlingJourneyInput,
  WrestlingJourneyStep,
  WrestlingJourneyStepInput
} from '@shared/types'
import { WRESTLING_JOURNEYS } from '@shared/wrestlingJourneys'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useDebouncedValue } from '../lib/hooks'
import { usePersistedState } from '../lib/navState'
import { useHobbyAction, localInputDate } from '../lib/hobbyForms'
import { confirmDialog } from '../lib/confirm'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import Section from '../components/Section'
import { Field } from '../components/Field'
import { SortableList, SortableRow, useOptimisticReorder } from '../components/SortableList'

const blankStep = (): WrestlingJourneyStepInput => ({
  kind: 'segment',
  linkedId: null,
  title: '',
  stepDate: null,
  notes: '',
  sourceUrl: ''
})
export default function WrestlingJourneysPage() {
  const { id } = useParams()
  return id ? <Journey key={id} id={Number(id)} /> : <Journeys />
}
function Journeys() {
  const navigate = useNavigate()
  const query = useQuery({ queryKey: qk.journeys.list, queryFn: () => api.journeys.list() })
  const action = useHobbyAction()
  const [creating, setCreating] = useState(false)
  if (query.isLoading) return <PageStatus>Loading journeys…</PageStatus>
  if (query.isError)
    return (
      <PageStatus>
        Could not load journeys.{' '}
        <button className="btn" onClick={() => void query.refetch()}>
          Retry
        </button>
      </PageStatus>
    )
  return (
    <div className="mx-auto max-w-5xl p-6">
      <PageHeader
        title="Wrestling journeys"
        subtitle="Follow a rivalry, a career or an era through your own archive."
        back={{ to: '/wrestling', label: 'Wrestling' }}
      />
      {creating ? (
        <JourneyEditor
          value={{ title: '', description: '' }}
          onClose={() => setCreating(false)}
          onSave={async (input) => {
            const id = await api.journeys.save(null, input)
            navigate(`/wrestling/journeys/${id}`, { replace: true })
          }}
        />
      ) : (
        <button className="btn-primary mb-6" onClick={() => setCreating(true)}>
          Create journey
        </button>
      )}
      <Section title="Your journeys">
        {!query.data?.length && (
          <p className="text-sm text-ink-muted">
            Start with a curated path below, or make your own sequence of matches and story moments.
          </p>
        )}
        {query.data?.map((j) => (
          <Link
            key={j.id}
            className="block border-b border-line-subtle py-4 hover:text-accent"
            to={`/wrestling/journeys/${j.id}`}
          >
            <h3 className="text-lg font-semibold">{j.title}</h3>
            <p className="mt-1 text-sm text-ink-muted">
              {j.watched} of {j.steps} steps watched
            </p>
            <p className="mt-2 max-w-prose text-sm">{j.description}</p>
          </Link>
        ))}
      </Section>
      <Section
        className="mt-10"
        title="Starter journeys"
        subtitle="Create an editable personal copy. Each step retains its research source."
      >
        {WRESTLING_JOURNEYS.map((t) => (
          <article className="border-b border-line-subtle py-5" key={t.key}>
            <h3 className="text-lg font-semibold">{t.title}</h3>
            <p className="my-2 max-w-prose text-sm text-ink-muted">{t.description}</p>
            <button
              className="btn"
              disabled={action.busy}
              onClick={() =>
                void action.run(async () => {
                  const id = await api.journeys.instantiate(t.key)
                  navigate(`/wrestling/journeys/${id}`)
                })
              }
            >
              Start {t.title}
            </button>
          </article>
        ))}
      </Section>
    </div>
  )
}
function Journey({ id }: { id: number }) {
  const qc = useQueryClient()
  const navigate = useNavigate()
  const query = useQuery({
    queryKey: qk.journeys.detail(id),
    queryFn: () => api.journeys.detail(id)
  })
  const refresh = async () => {
    await qc.invalidateQueries({ queryKey: qk.journeys.all })
  }
  const [editing, setEditing] = useState<WrestlingJourneyStep | 'new' | null>(null)
  const [editingTitle, setEditingTitle] = useState(false)
  const action = useHobbyAction()
  const rows = useMemo(
    () => query.data?.entries.map((s) => ({ ...s, itemId: s.id })),
    [query.data?.entries]
  )
  const order = useOptimisticReorder(
    rows,
    (next) =>
      api.journeys.reorder(
        id,
        next.map((s) => s.id)
      ),
    () => {
      void refresh()
    }
  )
  if (query.isLoading) return <PageStatus>Loading journey…</PageStatus>
  if (query.isError || !query.data)
    return (
      <PageStatus>
        Could not load this journey.{' '}
        <button className="btn" onClick={() => void query.refetch()}>
          Retry
        </button>
      </PageStatus>
    )
  const data = query.data
  const next = data.entries.find((s) => !s.viewings.length)
  return (
    <div className="mx-auto max-w-5xl p-6">
      <PageHeader
        title={data.title}
        subtitle={data.description}
        back={{ to: '/wrestling/journeys', label: 'Journeys' }}
      />
      <div className="mb-6 border-y border-line-subtle py-4">
        <p>
          {data.watched} of {data.steps} steps watched
        </p>
        <p className="mt-1 text-sm text-ink-muted">
          {next
            ? `Next: ${next.title}`
            : data.steps
              ? 'Every step has a viewing recorded.'
              : 'Add your first match or story moment.'}
        </p>
      </div>
      {editingTitle ? (
        <JourneyEditor
          value={data}
          onClose={() => setEditingTitle(false)}
          onSave={async (input) => {
            await api.journeys.save(id, input)
            await refresh()
            setEditingTitle(false)
          }}
        />
      ) : (
        <div className="mb-4 flex gap-3">
          <button className="btn" onClick={() => setEditingTitle(true)}>
            Edit journey
          </button>
          <button
            className="btn-ghost text-signal-anomaly"
            disabled={action.busy}
            onClick={() =>
              void action.run(async () => {
                if (
                  await confirmDialog(
                    'Delete this journey and its viewing history? Local video files stay on disk.'
                  )
                ) {
                  await api.journeys.remove(id)
                  await refresh()
                  navigate('/wrestling/journeys', { replace: true })
                }
              })
            }
          >
            Delete journey
          </button>
        </div>
      )}
      {editing ? (
        <StepEditor
          key={editing === 'new' ? 'new' : editing.id}
          value={editing === 'new' ? blankStep() : editing}
          onClose={() => setEditing(null)}
          onSave={async (input) => {
            await api.journeys.saveStep(id, editing === 'new' ? null : editing.id, input)
            await refresh()
            setEditing(null)
          }}
        />
      ) : (
        <button className="btn-primary mb-6" onClick={() => setEditing('new')}>
          Add step
        </button>
      )}
      <SortableList
        ids={order.items.map((s) => s.id)}
        sensors={order.sensors}
        onDragEnd={order.onDragEnd}
      >
        {order.items.map((step, index) => (
          <SortableRow key={step.id} id={step.id} className="border-b border-line-subtle py-6">
            {(handle) => (
              <div className="flex items-start gap-3">
                {handle}
                <div className="min-w-0 flex-1">
                  <JourneyStep
                    journeyId={id}
                    step={step}
                    index={index}
                    onEdit={() => setEditing(step)}
                    refresh={refresh}
                  />
                </div>
              </div>
            )}
          </SortableRow>
        ))}
      </SortableList>
    </div>
  )
}
function JourneyStep({
  journeyId,
  step,
  index,
  onEdit,
  refresh
}: {
  journeyId: number
  step: WrestlingJourneyStep
  index: number
  onEdit: () => void
  refresh: () => Promise<void>
}) {
  const action = useHobbyAction()
  const [logging, setLogging] = useState(false)
  const [date, setDate] = useState(localInputDate)
  const [note, setNote] = useState('')
  return (
    <article>
      <h2 className="text-lg font-semibold">
        {index + 1}. {step.title}
      </h2>
      <p className="mt-1 text-xs text-ink-muted">
        {step.stepDate ?? 'Date not set'} / {step.kind} /{' '}
        {step.viewings.length
          ? `${step.viewings.length} viewing${step.viewings.length === 1 ? '' : 's'}`
          : 'Not watched'}
      </p>
      <p className="mt-3 max-w-prose whitespace-pre-wrap text-sm leading-relaxed">{step.notes}</p>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
        {step.linkedId ? (
          <Link className="text-signal-link" to={`/wrestling/${step.kind}/${step.linkedId}`}>
            Open linked {step.kind}
          </Link>
        ) : (
          step.kind !== 'segment' && (
            <span className="text-ink-muted">No imported record linked</span>
          )
        )}
        {step.sourceUrl && (
          <button
            className="text-signal-link"
            onClick={() => void action.run(() => api.app.openExternal(step.sourceUrl))}
          >
            Research source
          </button>
        )}
        <button className="btn-ghost" onClick={onEdit}>
          Edit step
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {step.hasLocalFile && (
          <button
            className="btn"
            disabled={action.busy}
            onClick={() => void action.run(() => api.journeys.openFile(journeyId, step.id))}
          >
            Open attached video
          </button>
        )}
        {step.filePath && !step.hasLocalFile && (
          <span className="text-sm text-signal-caution">Attached file unavailable</span>
        )}
        {step.videos.map((v) => (
          <button
            key={v.id}
            className="btn"
            disabled={action.busy}
            onClick={() =>
              void action.run(() => api.video.openExternal({ kind: 'wrestling', fileId: v.id }))
            }
          >
            Open event/match file: {v.title}
          </button>
        ))}
        <button
          className="btn-ghost"
          disabled={action.busy}
          onClick={() =>
            void action.run(async () => {
              await api.journeys.pickFile(journeyId, step.id)
              await refresh()
            })
          }
        >
          {step.filePath ? 'Replace attached video' : 'Attach video'}
        </button>
        {step.filePath && (
          <button
            className="btn-ghost"
            disabled={action.busy}
            onClick={() =>
              void action.run(async () => {
                await api.journeys.detachFile(journeyId, step.id)
                await refresh()
              })
            }
          >
            Detach video
          </button>
        )}
        <button className="btn" onClick={() => setLogging(!logging)}>
          {step.viewings.length ? 'Log another viewing' : 'Mark watched'}
        </button>
      </div>
      {logging && (
        <form
          aria-label={`Viewing of ${step.title}`}
          className="my-4 max-w-xl space-y-3"
          onSubmit={(e) => {
            e.preventDefault()
            void action.run(async () => {
              await api.journeys.logViewing(journeyId, step.id, date, note)
              await refresh()
              setLogging(false)
              setNote('')
            })
          }}
        >
          <Field label="Watched on">
            <input
              className="input"
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Field>
          <Field label="Viewing notes">
            <textarea
              className="input w-full"
              maxLength={10000}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Field>
          <button className="btn" disabled={action.busy}>
            Save viewing
          </button>
        </form>
      )}
      {!!step.viewings.length && (
        <details className="mt-4">
          <summary className="cursor-pointer text-sm text-ink-muted">Viewing history</summary>
          {step.viewings.map((v) => (
            <div className="mt-3 text-sm" key={v.id}>
              <p>{v.watchedOn}</p>
              <p className="whitespace-pre-wrap text-ink-muted">{v.notes}</p>
              <button
                className="btn-ghost text-xs"
                disabled={action.busy}
                onClick={() =>
                  void action.run(async () => {
                    if (await confirmDialog('Remove this viewing record?')) {
                      await api.journeys.removeViewing(journeyId, v.id)
                      await refresh()
                    }
                  })
                }
              >
                Remove viewing
              </button>
            </div>
          ))}
        </details>
      )}
      <button
        className="btn-ghost mt-3 text-signal-anomaly"
        disabled={action.busy}
        onClick={() =>
          void action.run(async () => {
            if (await confirmDialog('Remove this step and its viewing history?')) {
              await api.journeys.removeStep(journeyId, step.id)
              await refresh()
            }
          })
        }
      >
        Remove step
      </button>
    </article>
  )
}
function JourneyEditor({
  value,
  onSave,
  onClose
}: {
  value: WrestlingJourneyInput
  onSave: (v: WrestlingJourneyInput) => Promise<void>
  onClose: () => void
}) {
  const [draft, set] = useState(value)
  const action = useHobbyAction()
  return (
    <form
      aria-label="Journey details"
      className="mb-8 max-w-2xl space-y-3"
      onSubmit={(e) => {
        e.preventDefault()
        void action.run(() => onSave(draft))
      }}
    >
      <Field label="Journey title">
        <input
          className="input w-full"
          required
          maxLength={300}
          value={draft.title}
          onChange={(e) => set({ ...draft, title: e.target.value })}
        />
      </Field>
      <Field label="Journey description">
        <textarea
          className="input w-full"
          maxLength={10000}
          value={draft.description}
          onChange={(e) => set({ ...draft, description: e.target.value })}
        />
      </Field>
      <button className="btn" disabled={action.busy}>
        Save journey
      </button>{' '}
      <button className="btn-ghost" type="button" onClick={onClose}>
        Close editor
      </button>
    </form>
  )
}
function StepEditor({
  value,
  onSave,
  onClose
}: {
  value: WrestlingJourneyStepInput
  onSave: (v: WrestlingJourneyStepInput) => Promise<void>
  onClose: () => void
}) {
  const [draft, set] = useState(value)
  const [search, setSearch] = usePersistedState('journey.targetSearch', '')
  const debounced = useDebouncedValue(search, 200)
  const query = useQuery({
    queryKey: qk.journeys.targets(draft.kind, debounced),
    queryFn: () => api.journeys.targets(draft.kind === 'event' ? 'event' : 'match', debounced),
    enabled: draft.kind !== 'segment' && debounced.trim().length > 1
  })
  const action = useHobbyAction()
  return (
    <form
      aria-label="Journey step"
      className="mb-8 max-w-2xl space-y-3"
      onSubmit={(e) => {
        e.preventDefault()
        void action.run(() => onSave(draft))
      }}
    >
      <Field label="Step title">
        <input
          className="input w-full"
          required
          maxLength={500}
          value={draft.title}
          onChange={(e) => set({ ...draft, title: e.target.value })}
        />
      </Field>
      <Field label="Step kind">
        <select
          className="input"
          value={draft.kind}
          onChange={(e) =>
            set({
              ...draft,
              kind: e.target.value as WrestlingJourneyStepInput['kind'],
              linkedId: null
            })
          }
        >
          {['match', 'event', 'segment'].map((k) => (
            <option key={k}>{k}</option>
          ))}
        </select>
      </Field>
      {draft.kind !== 'segment' && (
        <div>
          <Field label="Find an imported match or event">
            <input
              className="input w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Field>
          {draft.linkedId !== null && (
            <p className="mt-2 text-sm">
              Imported {draft.kind} linked.{' '}
              <button
                className="btn-ghost"
                type="button"
                onClick={() => set({ ...draft, linkedId: null })}
              >
                Clear link
              </button>
            </p>
          )}
          {query.isFetching && <p className="text-sm text-ink-muted">Searching…</p>}
          {query.isError && (
            <p role="alert">
              Search failed.{' '}
              <button type="button" className="btn" onClick={() => void query.refetch()}>
                Retry search
              </button>
            </p>
          )}
          {debounced.trim().length > 1 && query.isSuccess && !query.data.length && (
            <p className="text-sm text-ink-muted">
              No imported matches. Keep this step unlinked or try another search.
            </p>
          )}
          <div className="max-h-52 overflow-y-auto">
            {query.data?.map((t) => (
              <button
                key={t.id}
                type="button"
                className="block w-full border-b border-line-subtle py-2 text-left text-sm hover:text-accent"
                onClick={() =>
                  set({
                    ...draft,
                    linkedId: t.id,
                    title: draft.title || t.title,
                    stepDate: draft.stepDate || t.date
                  })
                }
              >
                {t.title} / {t.date ?? 'Undated'}
              </button>
            ))}
          </div>
        </div>
      )}
      <Field label="Step date">
        <input
          className="input"
          type="date"
          value={draft.stepDate ?? ''}
          onChange={(e) => set({ ...draft, stepDate: e.target.value || null })}
        />
      </Field>
      <Field label="Context and notes">
        <textarea
          className="input w-full"
          rows={4}
          maxLength={10000}
          value={draft.notes}
          onChange={(e) => set({ ...draft, notes: e.target.value })}
        />
      </Field>
      <Field label="Source URL">
        <input
          className="input w-full"
          type="url"
          value={draft.sourceUrl}
          maxLength={2000}
          onChange={(e) => set({ ...draft, sourceUrl: e.target.value })}
        />
      </Field>
      <button className="btn-primary" disabled={action.busy}>
        Save step
      </button>{' '}
      <button className="btn-ghost" type="button" onClick={onClose}>
        Close editor
      </button>
    </form>
  )
}
