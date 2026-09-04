import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import QuietWorkspace from '../components/QuietWorkspace'
import { KIND_LABEL } from '../lib/listLinks'
import type { ListKind } from '@shared/types'
import { Field } from '../components/Field'

const KINDS: ListKind[] = [
  'media',
  'person',
  'character',
  'company',
  'wrestlingEvent',
  'wrestlingWrestler',
  'wrestlingMatch',
  'footballCompetition',
  'footballTeam',
  'footballPerson',
  'footballMatch'
]

export default function ListFormPage() {
  const { id } = useParams()
  const editing = !!id
  const navigate = useNavigate()
  const qc = useQueryClient()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [kind, setKind] = useState<ListKind>('media')
  const [ranked, setRanked] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loaded, setLoaded] = useState(!editing)

  useEffect(() => {
    if (!editing) return
    api.lists.get(Number(id)).then((l) => {
      if (!l) return
      setTitle(l.title)
      setDescription(l.description ?? '')
      setKind(l.kind)
      setRanked(l.ranked)
      setLoaded(true)
    })
  }, [editing, id])

  async function save() {
    if (!title.trim()) return
    setSaving(true)
    let targetId: number
    if (editing) {
      await api.lists.update(Number(id), {
        title: title.trim(),
        description: description.trim() || null,
        ranked
      })
      targetId = Number(id)
    } else {
      targetId = await api.lists.create({
        title: title.trim(),
        description: description.trim() || null,
        kind,
        ranked
      })
    }
    await qc.invalidateQueries({ queryKey: qk.lists.all })
    setSaving(false)
    // Drop the form from history (see MediaFormPage.save): back to the detail
    // entry beneath when editing, replace with the new detail when creating.
    if (editing) navigate(-1)
    else navigate(`/lists/${targetId}`, { replace: true })
  }

  if (!loaded) return <PageStatus>Loading…</PageStatus>

  return (
    <div className="p-6 max-w-xl mx-auto">
      <PageHeader back="history" title={editing ? 'Edit list' : 'New list'} />

      <QuietWorkspace
        title="Collection identity"
        description="Name the point of view first; membership and ordering stay on the collection page."
      >
      <div className="space-y-4">
        <Field label="Title">
          <input
            className="input"
            placeholder="e.g. Best anime by opening"
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        </Field>

        <Field label="Description">
          <textarea
            className="input min-h-[80px]"
            placeholder="Optional — what this list is about"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field>

        <div>
          {editing ? (
            <div>
              <p className="label">Kind</p>
              <p className="text-sm text-gray-400">{KIND_LABEL[kind]} (can’t be changed)</p>
            </div>
          ) : (
            <Field label="Kind">
              <select
                className="input"
                value={kind}
                onChange={(e) => setKind(e.target.value as ListKind)}
              >
                {KINDS.map((k) => (
                  <option key={k} value={k}>
                    {KIND_LABEL[k]}
                  </option>
                ))}
              </select>
            </Field>
          )}
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-300">
          <input type="checkbox" checked={ranked} onChange={(e) => setRanked(e.target.checked)} />
          Ranked (number the entries)
        </label>

        <button className="btn-primary w-full" disabled={saving || !title.trim()} onClick={save}>
          {saving ? 'Saving…' : editing ? 'Save changes' : 'Create list'}
        </button>
      </div>
      </QuietWorkspace>
    </div>
  )
}
