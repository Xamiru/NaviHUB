import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { useStatuses, useScoreMax, useImageUrl } from '../lib/hooks'
import { qk } from '../lib/queryKeys'
import { isCompletedStatus, type MediaConfig } from '../lib/mediaConfig'
import type { MediaItemInput, Tag } from '@shared/types'

interface FormState {
  title: string
  titleOriginal: string
  coverPath: string | null
  status: string
  score: string
  progress: string
  totalUnits: string
  startedAt: string
  finishedAt: string
  releaseDate: string
  favorite: boolean
  synopsis: string
  notes: string
}

const EMPTY: FormState = {
  title: '',
  titleOriginal: '',
  coverPath: null,
  status: '',
  score: '',
  progress: '0',
  totalUnits: '',
  startedAt: '',
  finishedAt: '',
  releaseDate: '',
  favorite: false,
  synopsis: '',
  notes: ''
}

export default function MediaFormPage({ cfg }: { cfg: MediaConfig }) {
  const { id } = useParams()
  const editing = !!id
  const navigate = useNavigate()
  const qc = useQueryClient()
  const statuses = useStatuses(cfg)
  const scoreMax = useScoreMax()

  const [form, setForm] = useState<FormState>(EMPTY)
  const [tagIds, setTagIds] = useState<number[]>([])
  const [saving, setSaving] = useState(false)
  const [loaded, setLoaded] = useState(!editing)

  // Default status to the first configured one for new entries.
  useEffect(() => {
    if (!editing && !form.status && statuses.length) {
      setForm((f) => ({ ...f, status: statuses[0] }))
    }
  }, [editing, statuses, form.status])

  // Load existing entry when editing.
  useEffect(() => {
    if (!editing) return
    api.media.get(Number(id)).then((m) => {
      if (!m) return
      setForm({
        title: m.title,
        titleOriginal: m.titleOriginal ?? '',
        coverPath: m.coverPath,
        status: m.status ?? '',
        score: m.score != null ? String(m.score) : '',
        progress: String(m.progress),
        totalUnits: m.totalUnits != null ? String(m.totalUnits) : '',
        startedAt: m.startedAt ?? '',
        finishedAt: m.finishedAt ?? '',
        releaseDate: m.releaseDate ?? '',
        favorite: m.favorite,
        synopsis: m.synopsis ?? '',
        notes: m.notes ?? ''
      })
      setTagIds(m.tags.map((t) => t.id))
      setLoaded(true)
    })
  }, [editing, id])

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  async function pickCover() {
    const rel = await api.files.pickImage()
    if (rel) set('coverPath', rel)
  }

  function toNum(s: string): number | null {
    if (s.trim() === '') return null
    const n = Number(s)
    return Number.isFinite(n) ? n : null
  }

  // Unit-based progress (episodes/chapters) can't exceed the known total.
  const progressCap = cfg.unitProgress ? toNum(form.totalUnits) : null

  function setStatus(status: string) {
    setForm((f) => {
      const next = { ...f, status }
      // Completing a unit-based item fills progress to the total.
      if (cfg.unitProgress && isCompletedStatus(status) && f.totalUnits.trim() !== '') {
        next.progress = f.totalUnits
      }
      return next
    })
  }

  function setProgress(value: string) {
    const n = toNum(value)
    set('progress', progressCap != null && n != null && n > progressCap ? String(progressCap) : value)
  }

  async function save() {
    if (!form.title.trim()) return
    setSaving(true)
    const totalUnits = toNum(form.totalUnits)
    let progress = toNum(form.progress) ?? 0
    // Re-clamp on save in case the total was lowered after progress was set.
    if (cfg.unitProgress && totalUnits != null) progress = Math.min(progress, totalUnits)
    const payload: MediaItemInput = {
      mediaType: cfg.key,
      title: form.title.trim(),
      titleOriginal: form.titleOriginal.trim() || null,
      coverPath: form.coverPath,
      status: form.status || null,
      score: toNum(form.score),
      progress,
      totalUnits,
      startedAt: form.startedAt || null,
      finishedAt: form.finishedAt || null,
      releaseDate: form.releaseDate || null,
      favorite: form.favorite,
      synopsis: form.synopsis.trim() || null,
      notes: form.notes.trim() || null,
      tagIds
    }
    let targetId: number
    if (editing) {
      await api.media.update(Number(id), payload)
      targetId = Number(id)
    } else {
      targetId = await api.media.create(payload)
    }
    await qc.invalidateQueries({ queryKey: qk.media.all })
    await qc.invalidateQueries({ queryKey: qk.mediaCounts.all })
    setSaving(false)
    navigate(`${cfg.basePath}/${targetId}`)
  }

  const coverUrl = useImageUrl(form.coverPath)
  // useImageUrl no longer pre-checks existence, so guard a stale path with onError.
  const [coverFailed, setCoverFailed] = useState(false)
  useEffect(() => setCoverFailed(false), [coverUrl])

  if (!loaded) return <div className="p-6 text-gray-500">Loading…</div>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          {editing ? `Edit ${cfg.singular}` : `Add ${cfg.singular}`}
        </h1>
        <button className="btn-ghost" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </div>

      <div className="grid grid-cols-[180px_1fr] gap-6">
        {/* Cover */}
        <div>
          <div className="aspect-[2/3] rounded-lg overflow-hidden bg-base-700 border border-base-600">
            {coverUrl && !coverFailed ? (
              <img
                src={coverUrl}
                alt="cover"
                className="h-full w-full object-cover"
                onError={() => setCoverFailed(true)}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-gray-600 text-sm">
                No cover
              </div>
            )}
          </div>
          <button className="btn-ghost w-full mt-2" onClick={pickCover}>
            Choose image…
          </button>
          {form.coverPath && (
            <button
              className="w-full mt-1 text-xs text-gray-500 hover:text-red-400"
              onClick={() => set('coverPath', null)}
            >
              Remove cover
            </button>
          )}
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <div>
            <label className="label">Title *</label>
            <input
              className="input"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder={cfg.key === 'movie' ? 'e.g. Inception' : "e.g. Frieren: Beyond Journey's End"}
              autoFocus
            />
          </div>
          <div>
            <label className="label">Original / Native title</label>
            <input
              className="input"
              value={form.titleOriginal}
              onChange={(e) => set('titleOriginal', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Status</label>
              <select
                className="input"
                value={form.status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">—</option>
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Score (0–{scoreMax})</label>
              <input
                className="input"
                type="number"
                min={0}
                max={scoreMax}
                step={0.5}
                value={form.score}
                onChange={(e) => set('score', e.target.value)}
                placeholder="—"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">{cfg.progressFieldLabel}</label>
              <input
                className="input"
                type="number"
                min={0}
                max={progressCap ?? undefined}
                value={form.progress}
                onChange={(e) => setProgress(e.target.value)}
              />
            </div>
            <div>
              <label className="label">{cfg.totalFieldLabel}</label>
              <input
                className="input"
                type="number"
                min={0}
                value={form.totalUnits}
                onChange={(e) => set('totalUnits', e.target.value)}
                placeholder="—"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="label">Started</label>
              <input
                className="input"
                type="date"
                value={form.startedAt}
                onChange={(e) => set('startedAt', e.target.value)}
              />
            </div>
            <div>
              <label className="label">Finished</label>
              <input
                className="input"
                type="date"
                value={form.finishedAt}
                onChange={(e) => set('finishedAt', e.target.value)}
              />
            </div>
            <div>
              <label className="label">Released</label>
              <input
                className="input"
                type="date"
                value={form.releaseDate}
                onChange={(e) => set('releaseDate', e.target.value)}
              />
            </div>
          </div>

          <TagEditor selected={tagIds} onChange={setTagIds} />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.favorite}
              onChange={(e) => set('favorite', e.target.checked)}
              className="accent-[#7c5cff]"
            />
            Mark as favorite
          </label>

          <div>
            <label className="label">Synopsis</label>
            <textarea
              className="input min-h-[80px]"
              value={form.synopsis}
              onChange={(e) => set('synopsis', e.target.value)}
            />
          </div>
          <div>
            <label className="label">Personal notes</label>
            <textarea
              className="input min-h-[60px]"
              value={form.notes}
              onChange={(e) => set('notes', e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button className="btn-primary" disabled={saving || !form.title.trim()} onClick={save}>
              {saving ? 'Saving…' : editing ? 'Save changes' : 'Add to library'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ---- Tag editor: free-text add (upserts a tag), chips with remove ----
function TagEditor({
  selected,
  onChange
}: {
  selected: number[]
  onChange: (ids: number[]) => void
}) {
  const qc = useQueryClient()
  const [all, setAll] = useState<Tag[]>([])
  const [input, setInput] = useState('')

  useEffect(() => {
    api.tags.list().then(setAll)
  }, [])

  const selectedTags = all.filter((t) => selected.includes(t.id))

  async function add() {
    const name = input.trim()
    if (!name) return
    const id = await api.tags.upsert({ name })
    const fresh = await api.tags.list()
    setAll(fresh)
    if (!selected.includes(id)) onChange([...selected, id])
    setInput('')
    qc.invalidateQueries({ queryKey: qk.tags.all })
  }

  return (
    <div>
      <label className="label">Tags / Genres</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedTags.map((t) => (
          <span key={t.id} className="chip">
            {t.name}
            <button
              className="text-gray-500 hover:text-red-400"
              onClick={() => onChange(selected.filter((id) => id !== t.id))}
            >
              ×
            </button>
          </span>
        ))}
        {selectedTags.length === 0 && <span className="text-xs text-gray-600">No tags yet</span>}
      </div>
      <div className="flex gap-2">
        <input
          className="input max-w-xs"
          list="all-tags"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              add()
            }
          }}
          placeholder="Add a tag and press Enter"
        />
        <datalist id="all-tags">
          {all.map((t) => (
            <option key={t.id} value={t.name} />
          ))}
        </datalist>
        <button type="button" className="btn-ghost" onClick={add}>
          Add
        </button>
      </div>
    </div>
  )
}
