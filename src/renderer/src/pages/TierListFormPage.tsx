import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import { KIND_LABEL } from '../lib/listLinks'
import type { ListKind } from '@shared/types'

const KINDS: ListKind[] = ['media', 'person', 'character', 'company', 'wrestlingEvent', 'wrestlingWrestler', 'wrestlingMatch']

export default function TierListFormPage() {
  const { id } = useParams()
  const editing = !!id
  const navigate = useNavigate()
  const qc = useQueryClient()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [kind, setKind] = useState<ListKind>('media')
  const [saving, setSaving] = useState(false)
  const [loaded, setLoaded] = useState(!editing)

  useEffect(() => {
    if (!editing) return
    api.tierLists.get(Number(id)).then((l) => {
      if (!l) return
      setTitle(l.title)
      setDescription(l.description ?? '')
      setKind(l.kind)
      setLoaded(true)
    })
  }, [editing, id])

  async function save() {
    if (!title.trim()) return
    setSaving(true)
    let targetId: number
    if (editing) {
      await api.tierLists.update(Number(id), {
        title: title.trim(),
        description: description.trim() || null
      })
      targetId = Number(id)
    } else {
      targetId = await api.tierLists.create({
        title: title.trim(),
        description: description.trim() || null,
        kind
      })
    }
    await qc.invalidateQueries({ queryKey: qk.tierLists.all })
    setSaving(false)
    // Drop the form from history whether it was reached from the board or
    // opened directly, so Back cannot return to a stale edit route.
    navigate(`/lists/tier/${targetId}`, { replace: true })
  }

  if (!loaded) return <PageStatus>Loading…</PageStatus>

  return (
    <div className="p-6 max-w-xl mx-auto">
      <PageHeader back="history" title={editing ? 'Edit tier list' : 'New tier list'} />

      <div className="space-y-4">
        <div>
          <label className="label">Title</label>
          <input
            className="input"
            placeholder="e.g. Anime openings S–F"
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            className="input min-h-[80px]"
            placeholder="Optional — what this board ranks"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="label">Kind</label>
          {editing ? (
            <p className="text-sm text-gray-400">{KIND_LABEL[kind]} (can’t be changed)</p>
          ) : (
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
          )}
        </div>

        {!editing && (
          <p className="text-xs text-gray-500">
            The board starts with S–F rows in the classic colors — rename, recolor and
            add or remove rows from the board afterwards.
          </p>
        )}

        <button className="btn-primary w-full" disabled={saving || !title.trim()} onClick={save}>
          {saving ? 'Saving…' : editing ? 'Save changes' : 'Create tier list'}
        </button>
      </div>
    </div>
  )
}
