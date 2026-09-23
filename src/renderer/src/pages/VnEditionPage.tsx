import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { VnEditionDetail, VnRelease } from '@shared/types'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useHobbyAction } from '../lib/hobbyForms'
import { useIncrementalList } from '../lib/hooks'
import { Field } from '../components/Field'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
export default function VnEditionPage() {
  const id = Number(useParams().id)
  const qc = useQueryClient()
  const query = useQuery({
    queryKey: qk.vnExplore.edition(id),
    queryFn: () => api.vnExplore.edition(id)
  })
  const action = useHobbyAction()
  if (query.isLoading) return <PageStatus>Loading editions…</PageStatus>
  if (query.isError || !query.data)
    return (
      <PageStatus>
        Could not load editions.{' '}
        <button className="btn" onClick={() => void query.refetch()}>
          Retry
        </button>
      </PageStatus>
    )
  const d = query.data
  const refresh = () => qc.invalidateQueries({ queryKey: qk.vnExplore.edition(id) })
  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <PageHeader
        title={`${d.title}: Editions`}
        back={{ to: `/visual-novels/${id}`, label: d.title }}
        subtitle="Keep the release you read and your installation or translation notes."
      />
      <p className="text-sm text-ink-muted">
        Languages: {d.languages.join(', ') || 'Not imported'} / Platforms:{' '}
        {d.platforms.join(', ') || 'Not imported'}
      </p>
      <div className="my-4 flex flex-wrap items-center gap-3">
        <button
          className="btn"
          disabled={action.busy || !d.sourceId}
          onClick={() =>
            void action.run(async () => {
              await api.vnExplore.refreshReleases(id)
              await refresh()
            })
          }
        >
          {action.busy ? 'Fetching releases…' : 'Refresh releases from VNDB'}
        </button>
        <span className="text-xs text-ink-muted">
          {d.fetchedAt ? `Cached ${d.fetchedAt} UTC` : 'No release cache yet'}
        </span>
      </div>
      {!d.sourceId && (
        <p className="text-sm text-ink-muted">
          VNDB releases are available for titles imported from VNDB. You can still save personal
          edition notes.
        </p>
      )}
      <EditionEditor
        key={`${d.selected?.id ?? ''}:${d.notes}`}
        value={d}
        onSave={async (releaseId, notes) => {
          await api.vnExplore.saveEdition(id, releaseId, notes)
          await refresh()
        }}
      />
    </div>
  )
}
function ReleaseDescription({ release: r }: { release: VnRelease }) {
  return (
    <p className="text-xs leading-relaxed text-ink-muted">
      {r.released ?? 'Date unknown'} /{' '}
      {r.languages.map((l) => `${l.lang}${l.mtl ? ' (machine translation)' : ''}`).join(', ') ||
        'Language unspecified'}{' '}
      / {r.platforms.join(', ') || 'Platform unspecified'} /{' '}
      {r.official ? 'Official' : 'Unofficial'}
      {r.patch ? ' patch' : ''} / {r.completeness ?? 'Completeness unspecified'}
      {r.publishers.length > 0 && ` / ${r.publishers.join(', ')}`}
    </p>
  )
}
function EditionEditor({
  value,
  onSave
}: {
  value: VnEditionDetail
  onSave: (id: string | null, notes: string) => Promise<void>
}) {
  const [selected, setSelected] = useState(value.selected?.id ?? null)
  const [notes, setNotes] = useState(value.notes)
  const action = useHobbyAction()
  const { visible, sentinelRef } = useIncrementalList(value.releases, 40)
  return (
    <form
      aria-label="Personal edition"
      onSubmit={(e) => {
        e.preventDefault()
        void action.run(() => onSave(selected, notes))
      }}
    >
      {value.selected && (
        <section className="my-5 border-l-2 border-accent pl-4" aria-label="Saved edition">
          <h2 className="font-semibold">Saved edition: {value.selected.title}</h2>
          <ReleaseDescription release={value.selected} />
          {!value.releases.some((r) => r.id === value.selected?.id) && (
            <p className="text-sm text-ink-muted">
              This saved edition is absent from the latest cache. Its original details remain here.
            </p>
          )}
        </section>
      )}
      <Field label="Installation, translation and patch notes">
        <textarea
          className="input mt-2 w-full"
          rows={4}
          maxLength={10000}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </Field>
      <div className="my-4 flex items-center gap-3">
        <button className="btn-primary" disabled={action.busy}>
          Save edition and notes
        </button>
        <button type="button" className="btn-ghost" onClick={() => setSelected(null)}>
          Clear edition selection
        </button>
        <span className="text-xs text-ink-muted">
          {selected ? `Selected ${selected}` : 'No release selected'}
        </span>
      </div>
      <fieldset>
        <legend className="mb-3 text-lg font-semibold">Cached releases</legend>
        {visible.map((r) => (
          <label key={r.id} className="flex cursor-pointer gap-3 border-b border-line-subtle py-3">
            <input
              type="radio"
              name="release"
              value={r.id}
              checked={selected === r.id}
              onChange={() => setSelected(r.id)}
            />
            <span>
              <span className="font-medium">
                {r.title} ({r.id})
              </span>
              <ReleaseDescription release={r} />
            </span>
          </label>
        ))}
        <div ref={sentinelRef} />
      </fieldset>
    </form>
  )
}
