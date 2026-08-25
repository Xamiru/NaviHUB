import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import QuietWorkspace from '../components/QuietWorkspace'

export default function JapaneseCourseFormPage() {
  const { id } = useParams()
  const editing = !!id
  const navigate = useNavigate()
  const qc = useQueryClient()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [level, setLevel] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [saving, setSaving] = useState(false)
  const [loaded, setLoaded] = useState(!editing)

  useEffect(() => {
    if (!editing) return
    api.japanese.getCourse(Number(id)).then((c) => {
      if (!c) return
      setTitle(c.title)
      setDescription(c.description ?? '')
      setLevel(c.level ?? '')
      setDifficulty(c.difficulty != null ? String(c.difficulty) : '')
      setLoaded(true)
    })
  }, [editing, id])

  async function save() {
    if (!title.trim()) return
    setSaving(true)
    const parsedDifficulty = difficulty.trim() === '' ? null : Number(difficulty)
    const input = {
      title: title.trim(),
      description: description.trim() || null,
      level: level.trim() || null,
      difficulty: Number.isFinite(parsedDifficulty) ? parsedDifficulty : null
    }
    let targetId: number
    if (editing) {
      await api.japanese.updateCourse(Number(id), input)
      targetId = Number(id)
    } else {
      targetId = await api.japanese.createCourse(input)
    }
    await qc.invalidateQueries({ queryKey: qk.japanese.all })
    setSaving(false)
    // Drop the form from history (see MediaFormPage.save): back to the detail
    // entry beneath when editing, replace with the new detail when creating.
    if (editing) navigate(-1)
    else navigate(`/japanese/courses/${targetId}`, { replace: true })
  }

  if (!loaded) return <PageStatus>Loading…</PageStatus>

  return (
    <div className="p-6 max-w-xl mx-auto">
      <PageHeader back="history" title={editing ? 'Edit course' : 'New course'} />

      <QuietWorkspace
        title="Course structure"
        description="A calm editor for the course name, scope and its place in the knowledge map."
      >
      <div className="space-y-4">
        <div>
          <label className="label">Title</label>
          <input
            className="input"
            placeholder="e.g. JLPT N4 Grammar"
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            className="input min-h-[80px]"
            placeholder="Optional — what this course covers"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Level</label>
            <input
              className="input"
              placeholder="e.g. N4, N4–N3"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Study-order step</label>
            <input
              className="input"
              type="number"
              min={1}
              placeholder="1 = start here"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            />
          </div>
        </div>
        <p className="-mt-2 text-xs text-gray-500">
          Both optional — courses are listed by step (lowest first); courses without one sort last.
        </p>

        <button className="btn-primary w-full" disabled={saving || !title.trim()} onClick={save}>
          {saving ? 'Saving…' : editing ? 'Save changes' : 'Create course'}
        </button>
      </div>
      </QuietWorkspace>
    </div>
  )
}
