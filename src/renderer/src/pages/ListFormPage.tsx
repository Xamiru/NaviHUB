import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { KIND_LABEL } from '../lib/listLinks'
import type { ListKind } from '@shared/types'

const KINDS: ListKind[] = ['media', 'person', 'character', 'company']

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
    navigate(`/lists/${targetId}`)
  }

  if (!loaded) return <p className="p-6 text-gray-500">Loading…</p>

  return (
    <div className="p-6 max-w-xl mx-auto">
      <button className="text-sm text-gray-500 hover:text-gray-300 mb-4" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h1 className="text-2xl font-bold mb-5">{editing ? 'Edit list' : 'New list'}</h1>

      <div className="space-y-4">
        <div>
          <div className="label mb-1">Title</div>
          <input
            className="input"
            placeholder="e.g. Best anime by opening"
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <div className="label mb-1">Description</div>
          <textarea
            className="input min-h-[80px]"
            placeholder="Optional — what this list is about"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <div className="label mb-1">Kind</div>
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

        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-300">
          <input type="checkbox" checked={ranked} onChange={(e) => setRanked(e.target.checked)} />
          Ranked (number the entries)
        </label>

        <button className="btn-primary w-full" disabled={saving || !title.trim()} onClick={save}>
          {saving ? 'Saving…' : editing ? 'Save changes' : 'Create list'}
        </button>
      </div>
    </div>
  )
}
