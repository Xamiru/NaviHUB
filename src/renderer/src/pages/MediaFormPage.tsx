import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { useStatuses, useScoreMax, useImageUrl } from '../lib/hooks'
import { qk } from '../lib/queryKeys'
import { toastError } from '../lib/toast'
import { isCompletedStatus, type MediaConfig } from '../lib/mediaConfig'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import Section from '../components/Section'
import type { MediaItemInput } from '@shared/types'

// The full editor for one library entry. Status, score and favorite are also
// editable inline on the detail page now, so this is the place for everything
// that page cannot do — not the only way to touch a title.

interface FormState {
  title: string
  titleOriginal: string
  coverPath: string | null
  status: string
  score: string
  progress: string
  totalUnits: string
  timesConsumed: string
  releaseDate: string
  // metadata.epDuration (anime/TV only) — see EP_DURATION_TYPES below.
  epDuration: string
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
  timesConsumed: '0',
  releaseDate: '',
  epDuration: '',
  favorite: false,
  synopsis: '',
  notes: ''
}

// mediaRepo.timeStats reads metadata.epDuration ONLY in its anime/tv branch,
// falling back to the flat stats.animeEpMinutes / stats.tvEpMinutes settings.
// Nothing could set it, so every OVA, short and hour-long drama silently
// counted as 24 or 40 minutes on /stats.
const EP_DURATION_TYPES = ['anime', 'tv']

export default function MediaFormPage({ cfg }: { cfg: MediaConfig }) {
  const { id } = useParams()
  const editing = !!id
  const navigate = useNavigate()
  const qc = useQueryClient()
  const statuses = useStatuses(cfg)
  const scoreMax = useScoreMax()
  const showEpDuration = EP_DURATION_TYPES.includes(cfg.key)

  const [form, setForm] = useState<FormState>(EMPTY)
  const [tagIds, setTagIds] = useState<number[]>([])
  const [saving, setSaving] = useState(false)
  const [loaded, setLoaded] = useState(!editing)
  // A missing row and a FAILED read are different: the second must not drop
  // the loading gate, or the user edits a blank form over a live title and
  // Save writes those blanks back over the importer's data.
  const [loadError, setLoadError] = useState<string | null>(null)
  const [missing, setMissing] = useState(false)
  // The row's existing metadata, kept verbatim so a save can merge into it.
  // mediaRepo.update REPLACES the whole metadata column, so sending only the
  // field edited here would wipe communityScore / hltb / season / olRating.
  const [meta, setMeta] = useState<Record<string, unknown> | null>(null)

  // Default status to the first configured one for new entries.
  useEffect(() => {
    if (!editing && !form.status && statuses.length) {
      setForm((f) => ({ ...f, status: statuses[0] }))
    }
  }, [editing, statuses, form.status])

  // Load existing entry when editing. `loaded` must be set on EVERY path: a
  // deleted row or a failed read used to leave the page on "Loading…" forever.
  useEffect(() => {
    if (!editing) return
    let cancelled = false
    api.media
      .get(Number(id))
      .then((m) => {
        if (cancelled) return
        if (!m) {
          setMissing(true)
          return
        }
        const metadata = (m.metadata ?? null) as Record<string, unknown> | null
        const ep = Number(metadata?.epDuration)
        setMeta(metadata)
        setForm({
          title: m.title,
          titleOriginal: m.titleOriginal ?? '',
          coverPath: m.coverPath,
          status: m.status ?? '',
          score: m.score != null ? String(m.score) : '',
          progress: String(m.progress),
          totalUnits: m.totalUnits != null ? String(m.totalUnits) : '',
          timesConsumed: String(m.rewatchCount),
          releaseDate: m.releaseDate ?? '',
          epDuration: Number.isFinite(ep) && ep > 0 ? String(ep) : '',
          favorite: m.favorite,
          synopsis: m.synopsis ?? '',
          notes: m.notes ?? ''
        })
        setTagIds(m.tags.map((t) => t.id))
      })
      .catch((e) => {
        if (cancelled) return
        setLoadError(e instanceof Error ? e.message : String(e))
        toastError(e)
      })
      .finally(() => {
        if (!cancelled) setLoaded(true)
      })
    return () => {
      cancelled = true
    }
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

  // Merge, never replace: everything importers stored stays, and clearing the
  // field removes just that key. Returns undefined when there is nothing to
  // write, so `metadata` stays out of the payload and the column is untouched.
  function metadataPayload(): Record<string, unknown> | null | undefined {
    if (!showEpDuration) return undefined
    const ep = toNum(form.epDuration)
    const next = { ...(meta ?? {}) }
    if (ep != null && ep > 0) next.epDuration = ep
    else delete next.epDuration
    if (Object.keys(next).length === 0) return meta == null ? undefined : null
    return next
  }

  async function save() {
    if (!form.title.trim()) return
    setSaving(true)
    try {
      const totalUnits = toNum(form.totalUnits)
      let progress = toNum(form.progress) ?? 0
      // Re-clamp on save in case the total was lowered after progress was set.
      if (cfg.unitProgress && totalUnits != null) progress = Math.min(progress, totalUnits)
      const metadata = metadataPayload()
      const payload: MediaItemInput = {
        mediaType: cfg.key,
        title: form.title.trim(),
        titleOriginal: form.titleOriginal.trim() || null,
        coverPath: form.coverPath,
        status: form.status || null,
        score: toNum(form.score),
        progress,
        totalUnits,
        rewatchCount: Math.max(0, toNum(form.timesConsumed) ?? 0),
        releaseDate: form.releaseDate || null,
        favorite: form.favorite,
        synopsis: form.synopsis.trim() || null,
        notes: form.notes.trim() || null,
        tagIds,
        ...(metadata === undefined ? {} : { metadata })
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
      // The form must drop out of history so Back from the detail page never
      // returns into it. Editing is only entered from the item's own detail
      // page, so go back to that existing entry — replacing the form with the
      // detail URL instead would stack two identical detail entries and make
      // the first Back click a no-op. Creating has no detail entry beneath.
      if (editing) navigate(-1)
      else navigate(`${cfg.basePath}/${targetId}`, { replace: true })
    } catch (e) {
      // Without this the button stayed on "Saving…" until you navigated away.
      toastError(e)
    } finally {
      setSaving(false)
    }
  }

  const coverUrl = useImageUrl(form.coverPath)
  // useImageUrl no longer pre-checks existence, so guard a stale path with onError.
  const [coverFailed, setCoverFailed] = useState(false)
  useEffect(() => setCoverFailed(false), [coverUrl])

  if (missing) return <PageStatus>Not found.</PageStatus>
  if (loadError) return <PageStatus>Could not load this entry — {loadError}</PageStatus>
  if (!loaded) return <PageStatus>Loading…</PageStatus>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Back/Esc is cancel — the forms convention, no Cancel button */}
      <PageHeader
        back="history"
        title={editing ? `Edit ${cfg.singular}` : `Add ${cfg.singular}`}
        className="mb-6"
      />

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
              <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm">
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

        {/* Fields, grouped: what the thing IS, how far you are with it, and
            everything else. */}
        <div>
          <Section title="Identity" className="mb-6">
            <div className="space-y-4">
              <div>
                <label className="label">Title</label>
                <input
                  className="input"
                  value={form.title}
                  onChange={(e) => set('title', e.target.value)}
                  placeholder={
                    cfg.key === 'movie' ? 'e.g. Inception' : "e.g. Frieren: Beyond Journey's End"
                  }
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
              <div>
                <label className="label">Synopsis</label>
                <textarea
                  className="input min-h-[80px]"
                  value={form.synopsis}
                  onChange={(e) => set('synopsis', e.target.value)}
                />
              </div>
            </div>
          </Section>

          <Section title="Tracking" subtitle="also editable on the detail page" className="mb-6">
            <div className="space-y-4">
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
                {!cfg.noProgress && (
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
                )}
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">{cfg.timesConsumedLabel}</label>
                  <input
                    className="input"
                    type="number"
                    min={0}
                    value={form.timesConsumed}
                    onChange={(e) => set('timesConsumed', e.target.value)}
                  />
                </div>
                <label className="flex items-end gap-2 pb-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.favorite}
                    onChange={(e) => set('favorite', e.target.checked)}
                    className="accent-accent"
                  />
                  Mark as favorite
                </label>
              </div>
            </div>
          </Section>

          <Section title="Details" className="mb-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Released</label>
                  <input
                    className="input"
                    type="date"
                    value={form.releaseDate}
                    onChange={(e) => set('releaseDate', e.target.value)}
                  />
                </div>
                {showEpDuration && (
                  <div>
                    <label className="label">Episode length (min)</label>
                    <input
                      className="input"
                      type="number"
                      min={0}
                      value={form.epDuration}
                      onChange={(e) => set('epDuration', e.target.value)}
                      placeholder={cfg.key === 'tv' ? '40' : '24'}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Used by Stats. Leave empty for the default.
                    </p>
                  </div>
                )}
              </div>

              <TagEditor selected={tagIds} onChange={setTagIds} />

              <div>
                <label className="label">Personal notes</label>
                <textarea
                  className="input min-h-[60px]"
                  value={form.notes}
                  onChange={(e) => set('notes', e.target.value)}
                />
              </div>
            </div>
          </Section>

          <button
            className="btn-primary w-full"
            disabled={saving || !form.title.trim()}
            onClick={save}
          >
            {saving ? 'Saving…' : editing ? 'Save changes' : 'Add to library'}
          </button>
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
  const [input, setInput] = useState('')
  // The shared cache entry, not a private useEffect+useState mirror: adding a
  // tag here now shows up anywhere else tags are listed, without a reload.
  const { data: all = [] } = useQuery({ queryKey: qk.tags.all, queryFn: () => api.tags.list() })

  const selectedTags = all.filter((t) => selected.includes(t.id))

  async function add() {
    const name = input.trim()
    if (!name) return
    try {
      const id = await api.tags.upsert({ name })
      await qc.invalidateQueries({ queryKey: qk.tags.all })
      if (!selected.includes(id)) onChange([...selected, id])
      setInput('')
    } catch (e) {
      toastError(e)
    }
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
              title={`Remove ${t.name}`}
              aria-label={`Remove ${t.name}`}
              onClick={() => onChange(selected.filter((id) => id !== t.id))}
            >
              ×
            </button>
          </span>
        ))}
        {selectedTags.length === 0 && <span className="text-xs text-gray-400">No tags yet</span>}
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
              void add()
            }
          }}
          placeholder="Add a tag and press Enter"
        />
        <datalist id="all-tags">
          {all.map((t) => (
            <option key={t.id} value={t.name} />
          ))}
        </datalist>
        <button type="button" className="btn-ghost" onClick={() => void add()}>
          Add
        </button>
      </div>
    </div>
  )
}
