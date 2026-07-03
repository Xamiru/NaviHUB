import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'

export default function JapaneseCourseFormPage() {
  const { id } = useParams()
  const editing = !!id
  const navigate = useNavigate()
  const qc = useQueryClient()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)
  const [loaded, setLoaded] = useState(!editing)

  useEffect(() => {
    if (!editing) return
    api.japanese.getCourse(Number(id)).then((c) => {
      if (!c) return
      setTitle(c.title)
      setDescription(c.description ?? '')
      setLoaded(true)
    })
  }, [editing, id])

  async function save() {
    if (!title.trim()) return
    setSaving(true)
    let targetId: number
    if (editing) {
      await api.japanese.updateCourse(Number(id), {
        title: title.trim(),
        description: description.trim() || null
      })
      targetId = Number(id)
    } else {
      targetId = await api.japanese.createCourse({
        title: title.trim(),
        description: description.trim() || null
      })
    }
    await qc.invalidateQueries({ queryKey: qk.japanese.all })
    setSaving(false)
    navigate(`/japanese/courses/${targetId}`)
  }

  if (!loaded) return <p className="p-6 text-gray-500">Loading…</p>

  return (
    <div className="p-6 max-w-xl mx-auto">
      <button className="text-sm text-gray-500 hover:text-gray-300 mb-4" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h1 className="text-2xl font-bold mb-5">{editing ? 'Edit course' : 'New course'}</h1>

      <div className="space-y-4">
        <div>
          <div className="label mb-1">Title</div>
          <input
            className="input"
            placeholder="e.g. JLPT N4 Grammar"
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <div className="label mb-1">Description</div>
          <textarea
            className="input min-h-[80px]"
            placeholder="Optional — what this course covers"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button className="btn-primary w-full" disabled={saving || !title.trim()} onClick={save}>
          {saving ? 'Saving…' : editing ? 'Save changes' : 'Create course'}
        </button>
      </div>
    </div>
  )
}
