import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type {
  VnNote,
  VnNoteInput,
  VnReadingNode,
  VnReadingNodeInput,
  VnReadingResume
} from '@shared/types'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { localInputDate, readNoteImage, useHobbyAction } from '../lib/hobbyForms'
import { confirmDialog } from '../lib/confirm'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import Section from '../components/Section'
import { Field } from '../components/Field'
import Pager from '../components/Pager'
import { SortableList, SortableRow, useOptimisticReorder } from '../components/SortableList'

const newNode = (): VnReadingNodeInput => ({
  parentId: null,
  kind: 'chapter',
  title: '',
  status: 'planned',
  rating: null,
  notes: '',
  completedOn: null
})
const newNote = (): VnNoteInput => ({
  nodeId: null,
  entryDate: localInputDate(),
  category: 'reaction',
  body: '',
  imageData: null
})

export default function VnReadingPage() {
  const mediaId = Number(useParams().id)
  const qc = useQueryClient()
  const query = useQuery({
    queryKey: qk.vnReading.overview(mediaId),
    queryFn: () => api.vnReading.overview(mediaId)
  })
  const [page, setPage] = usePersistedState('vn.notesPage', 0)
  const notesQuery = useQuery({
    queryKey: qk.vnReading.notes(mediaId, page + 1),
    queryFn: () => api.vnReading.notes(mediaId, page + 1)
  })
  const [editing, setEditing] = useState<VnReadingNode | 'new' | null>(null)
  const [note, setNote] = useState<VnNote | 'new' | null>(null)
  const [resumeEditing, setResumeEditing] = useState(false)
  const action = useHobbyAction()
  const refresh = async () => {
    await qc.invalidateQueries({ queryKey: qk.vnReading.all })
    await qc.invalidateQueries({ queryKey: qk.vnCapture.all })
  }
  const sortableNodes = useMemo(
    () => query.data?.nodes.map((n) => ({ ...n, itemId: n.id })),
    [query.data?.nodes]
  )
  const order = useOptimisticReorder(
    sortableNodes,
    (rows) =>
      api.vnReading.reorder(
        mediaId,
        rows.map((n) => n.id)
      ),
    () => {
      void refresh()
    }
  )
  if (query.isLoading) return <PageStatus>Loading reading workspace…</PageStatus>
  if (query.isError || !query.data)
    return (
      <PageStatus>
        Could not load this reading workspace.{' '}
        <button className="btn" onClick={() => void query.refetch()}>
          Retry
        </button>
      </PageStatus>
    )
  const data = query.data
  const current = data.nodes.find((n) => n.id === data.resume.nodeId)
  return (
    <div className="mx-auto max-w-6xl p-6">
      <PageHeader
        title={data.title}
        subtitle="Reading plan and notebook"
        back={{ to: `/visual-novels/${mediaId}`, label: 'Visual novel' }}
      />
      <div className="mb-8 border-y border-line-subtle py-5">
        <h2 className="text-lg font-semibold">Where you stopped</h2>
        {resumeEditing ? (
          <ResumeEditor
            value={data.resume}
            nodes={data.nodes}
            onClose={() => setResumeEditing(false)}
            onSave={async (v) => {
              await api.vnReading.saveResume(mediaId, v)
              await refresh()
              setResumeEditing(false)
            }}
          />
        ) : (
          <>
            <p className="mt-2 text-ink">{current?.title ?? 'Choose your current reading entry'}</p>
            {data.resume.saveSlot && (
              <p className="text-sm text-ink-muted">Save slot: {data.resume.saveSlot}</p>
            )}
            <p className="mt-2 max-w-prose whitespace-pre-wrap text-sm text-ink-muted">
              {data.resume.recap || 'Leave a short recap for your next session.'}
            </p>
            <button className="btn mt-3" onClick={() => setResumeEditing(true)}>
              Update reading position
            </button>
          </>
        )}
      </div>
      <Link className="btn mb-6" to={`/visual-novels/${mediaId}/study`}>
        Text and study
      </Link>{' '}
      <Link className="btn mb-6" to={`/visual-novels/${mediaId}/editions`}>
        Editions
      </Link>
      <div className="grid gap-10 lg:grid-cols-2">
        <Section
          title="Reading plan"
          subtitle={`${data.nodes.filter((n) => n.status === 'completed').length} of ${data.nodes.length} entries completed. Title status and playtime are tracked separately.`}
        >
          {editing ? (
            <NodeEditor
              key={editing === 'new' ? 'new' : editing.id}
              value={editing === 'new' ? newNode() : editing}
              nodes={data.nodes}
              id={editing === 'new' ? null : editing.id}
              onClose={() => setEditing(null)}
              onSave={async (v) => {
                await api.vnReading.saveNode(mediaId, editing === 'new' ? null : editing.id, v)
                await refresh()
                setEditing(null)
              }}
            />
          ) : (
            <button className="btn-primary mb-4" onClick={() => setEditing('new')}>
              Add reading entry
            </button>
          )}
          {data.nodes.length === 0 && (
            <p className="text-sm text-ink-muted">
              Add a route, chapter or ending to start your reading plan.
            </p>
          )}
          <SortableList
            ids={order.items.map((n) => n.id)}
            sensors={order.sensors}
            onDragEnd={order.onDragEnd}
          >
            {order.items.map((n) => (
              <SortableRow key={n.id} id={n.id} className="border-b border-line-subtle py-4">
                {(handle) => (
                  <div className="flex items-start gap-3">
                    {handle}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold">{n.title}</h3>
                      <p className="text-xs text-ink-muted">
                        {n.kind} / {n.status}
                        {n.parentId &&
                          ` / ${data.nodes.find((p) => p.id === n.parentId)?.title ?? 'Route'}`}
                        {n.rating !== null && ` / ${n.rating}/10`}
                        {n.completedOn && ` / ${n.completedOn}`}
                      </p>
                      {n.notes && (
                        <p className="mt-2 whitespace-pre-wrap text-sm text-ink-muted">{n.notes}</p>
                      )}
                      <div className="mt-2 flex flex-wrap gap-2">
                        <button className="btn-ghost" onClick={() => setEditing(n)}>
                          Edit <span className="sr-only">{n.title}</span>
                        </button>
                        <button
                          className="btn-ghost"
                          disabled={action.busy}
                          onClick={() =>
                            void action.run(async () => {
                              await api.vnReading.saveResume(mediaId, {
                                ...data.resume,
                                nodeId: n.id
                              })
                              await refresh()
                            })
                          }
                        >
                          Read here <span className="sr-only">{n.title}</span>
                        </button>
                        <button
                          className="btn-ghost text-signal-anomaly"
                          disabled={action.busy}
                          onClick={() =>
                            void action.run(async () => {
                              if (
                                await confirmDialog(
                                  `Remove “${n.title}”? Its children and notebook entries will remain.`
                                )
                              ) {
                                await api.vnReading.removeNode(mediaId, n.id)
                                await refresh()
                              }
                            })
                          }
                        >
                          Remove <span className="sr-only">{n.title}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </SortableRow>
            ))}
          </SortableList>
        </Section>
        <Section
          title="Notebook"
          subtitle="Keep your reactions, theories and questions with the reading session."
        >
          {note ? (
            <NoteEditor
              key={note === 'new' ? 'new' : note.id}
              value={note === 'new' ? newNote() : note}
              nodes={data.nodes}
              onClose={() => setNote(null)}
              onSave={async (v) => {
                await api.vnReading.saveNote(mediaId, note === 'new' ? null : note.id, v)
                setPage(0)
                await refresh()
                setNote(null)
              }}
            />
          ) : (
            <button className="btn mb-4" onClick={() => setNote('new')}>
              Write a note
            </button>
          )}
          {notesQuery.isLoading ? (
            <p className="text-sm text-ink-muted">Loading notebook…</p>
          ) : notesQuery.isError ? (
            <p role="alert">
              Could not load notes.{' '}
              <button className="btn" onClick={() => void notesQuery.refetch()}>
                Retry notebook
              </button>
            </p>
          ) : (
            <>
              {notesQuery.data?.notes.length === 0 && (
                <p className="text-sm text-ink-muted">
                  Your first note can be a question you want to revisit later.
                </p>
              )}
              {notesQuery.data?.notes.map((n) => (
                <article key={n.id} className="border-b border-line-subtle py-4">
                  <p className="text-xs text-ink-muted">
                    {n.entryDate} / {n.category}
                    {n.nodeId &&
                      ` / ${data.nodes.find((p) => p.id === n.nodeId)?.title ?? 'Reading entry'}`}
                  </p>
                  <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed">
                    {n.body}
                  </p>
                  {n.imageData && (
                    <img
                      src={n.imageData}
                      alt="Notebook attachment"
                      className="mt-3 max-h-64 max-w-full object-contain"
                    />
                  )}
                  <button className="btn-ghost mt-2" onClick={() => setNote(n)}>
                    Edit note <span className="sr-only">{n.id}</span>
                  </button>
                  <button
                    className="btn-ghost text-signal-anomaly"
                    disabled={action.busy}
                    onClick={() =>
                      void action.run(async () => {
                        if (await confirmDialog('Remove this notebook entry?')) {
                          await api.vnReading.removeNote(mediaId, n.id)
                          if (notesQuery.data?.notes.length === 1 && page > 0) setPage(page - 1)
                          await refresh()
                        }
                      })
                    }
                  >
                    Remove note <span className="sr-only">{n.id}</span>
                  </button>
                </article>
              ))}
              <Pager
                page={page}
                pageCount={Math.ceil((notesQuery.data?.total ?? 0) / 20)}
                onChange={setPage}
              />
            </>
          )}
        </Section>
      </div>
      {data.generalNotes && (
        <Section className="mt-10" title="General notes">
          <p className="max-w-prose whitespace-pre-wrap text-sm">{data.generalNotes}</p>
        </Section>
      )}
    </div>
  )
}

function NodeEditor({
  value,
  nodes,
  id,
  onSave,
  onClose
}: {
  value: VnReadingNodeInput
  nodes: VnReadingNode[]
  id: number | null
  onSave: (v: VnReadingNodeInput) => Promise<void>
  onClose: () => void
}) {
  const [draft, set] = useState(value)
  const action = useHobbyAction()
  return (
    <form
      aria-label="Reading entry"
      className="mb-6 space-y-3"
      onSubmit={(e) => {
        e.preventDefault()
        void action.run(() => onSave(draft))
      }}
    >
      <Field label="Title">
        <input
          className="input w-full"
          value={draft.title}
          required
          maxLength={300}
          onChange={(e) => set({ ...draft, title: e.target.value })}
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Entry kind">
          <select
            className="input w-full"
            value={draft.kind}
            onChange={(e) => set({ ...draft, kind: e.target.value as VnReadingNodeInput['kind'] })}
          >
            {['route', 'chapter', 'ending'].map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
        </Field>
        <Field label="Parent route">
          <select
            className="input w-full"
            value={draft.parentId ?? ''}
            onChange={(e) =>
              set({ ...draft, parentId: e.target.value ? Number(e.target.value) : null })
            }
          >
            <option value="">None</option>
            {nodes
              .filter((n) => n.kind === 'route' && n.id !== id)
              .map((n) => (
                <option key={n.id} value={n.id}>
                  {n.title}
                </option>
              ))}
          </select>
        </Field>
        <Field label="Entry status">
          <select
            className="input w-full"
            value={draft.status}
            onChange={(e) => {
              const status = e.target.value as VnReadingNodeInput['status']
              set({
                ...draft,
                status,
                completedOn: status === 'completed' ? (draft.completedOn ?? localInputDate()) : null
              })
            }}
          >
            {['planned', 'reading', 'completed', 'skipped'].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="Rating (0–10)">
          <input
            type="number"
            className="input w-full"
            min={0}
            max={10}
            step={0.5}
            value={draft.rating ?? ''}
            onChange={(e) =>
              set({ ...draft, rating: e.target.value ? Number(e.target.value) : null })
            }
          />
        </Field>
      </div>
      {draft.status === 'completed' && (
        <Field label="Completed on">
          <input
            className="input"
            type="date"
            required
            value={draft.completedOn ?? ''}
            onChange={(e) => set({ ...draft, completedOn: e.target.value })}
          />
        </Field>
      )}
      <Field label="Entry notes">
        <textarea
          className="input w-full"
          value={draft.notes}
          maxLength={10000}
          rows={3}
          onChange={(e) => set({ ...draft, notes: e.target.value })}
        />
      </Field>
      <button className="btn-primary" disabled={action.busy}>
        Save reading entry
      </button>{' '}
      <button type="button" className="btn-ghost" onClick={onClose}>
        Close editor
      </button>
    </form>
  )
}
function ResumeEditor({
  value,
  nodes,
  onSave,
  onClose
}: {
  value: VnReadingResume
  nodes: VnReadingNode[]
  onSave: (v: VnReadingResume) => Promise<void>
  onClose: () => void
}) {
  const [draft, set] = useState(value)
  const action = useHobbyAction()
  return (
    <form
      aria-label="Reading position"
      className="mt-3 max-w-xl space-y-3"
      onSubmit={(e) => {
        e.preventDefault()
        void action.run(() => onSave(draft))
      }}
    >
      <Field label="Current entry">
        <select
          className="input w-full"
          value={draft.nodeId ?? ''}
          onChange={(e) =>
            set({ ...draft, nodeId: e.target.value ? Number(e.target.value) : null })
          }
        >
          <option value="">No current entry</option>
          {nodes.map((n) => (
            <option value={n.id} key={n.id}>
              {n.title}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Save slot">
        <input
          className="input w-full"
          value={draft.saveSlot}
          maxLength={300}
          onChange={(e) => set({ ...draft, saveSlot: e.target.value })}
        />
      </Field>
      <Field label="Where I stopped">
        <textarea
          className="input w-full"
          rows={3}
          value={draft.recap}
          maxLength={10000}
          onChange={(e) => set({ ...draft, recap: e.target.value })}
        />
      </Field>
      <button className="btn" disabled={action.busy}>
        Save position
      </button>{' '}
      <button className="btn-ghost" type="button" onClick={onClose}>
        Close editor
      </button>
    </form>
  )
}
function NoteEditor({
  value,
  nodes,
  onSave,
  onClose
}: {
  value: VnNoteInput
  nodes: VnReadingNode[]
  onSave: (v: VnNoteInput) => Promise<void>
  onClose: () => void
}) {
  const [draft, set] = useState(value)
  const action = useHobbyAction()
  return (
    <form
      aria-label="Notebook entry"
      className="mb-6 space-y-3"
      onSubmit={(e) => {
        e.preventDefault()
        void action.run(() => onSave(draft))
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        <Field label="Note date">
          <input
            className="input w-full"
            type="date"
            required
            value={draft.entryDate}
            onChange={(e) => set({ ...draft, entryDate: e.target.value })}
          />
        </Field>
        <Field label="Note category">
          <select
            className="input w-full"
            value={draft.category}
            onChange={(e) => set({ ...draft, category: e.target.value as VnNoteInput['category'] })}
          >
            {['reaction', 'theory', 'question', 'quote', 'recap'].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Related reading entry">
        <select
          className="input w-full"
          value={draft.nodeId ?? ''}
          onChange={(e) =>
            set({ ...draft, nodeId: e.target.value ? Number(e.target.value) : null })
          }
        >
          <option value="">Whole visual novel</option>
          {nodes.map((n) => (
            <option key={n.id} value={n.id}>
              {n.title}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Note">
        <textarea
          className="input w-full"
          rows={5}
          required
          maxLength={20000}
          value={draft.body}
          onChange={(e) => set({ ...draft, body: e.target.value })}
        />
      </Field>
      <Field
        label="Attach image"
        description="PNG, JPEG or WebP, up to 2 MB. Kept private with this notebook."
      >
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          disabled={action.busy}
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file)
              void action.run(async () => {
                const imageData = await readNoteImage(file)
                set((d) => ({ ...d, imageData }))
              })
          }}
        />
      </Field>
      {draft.imageData && (
        <>
          <img src={draft.imageData} alt="Attachment preview" className="max-h-40 object-contain" />
          <button
            className="btn-ghost"
            type="button"
            onClick={() => set({ ...draft, imageData: null })}
          >
            Remove image
          </button>
        </>
      )}
      <button className="btn" disabled={action.busy}>
        Save note
      </button>{' '}
      <button type="button" className="btn-ghost" onClick={onClose}>
        Close editor
      </button>
    </form>
  )
}
