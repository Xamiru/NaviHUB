import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import CoverImage from './CoverImage'

interface Fields {
  name: string
  native: string
  longText: string
  imgPath: string | null
}

interface Props {
  initial: Fields
  longTextLabel: string
  rounded?: string
  onSave: (f: Fields) => Promise<void>
  onDelete: () => Promise<void>
  extra?: React.ReactNode // e.g. company type selector
}

// Editable header (image + name + native + bio/description) shared by the
// person / studio / character detail pages.
export default function EntityHeader({
  initial,
  longTextLabel,
  rounded = 'rounded-xl',
  onSave,
  onDelete,
  extra
}: Props) {
  const navigate = useNavigate()
  const [f, setF] = useState<Fields>(initial)
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setF(initial)
    setDirty(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial.name, initial.native, initial.longText, initial.imgPath])

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    setF((p) => ({ ...p, [k]: v }))
    setDirty(true)
  }

  async function changeImage() {
    const rel = await api.files.pickImage()
    if (rel) {
      setF((p) => ({ ...p, imgPath: rel }))
      setDirty(true)
    }
  }

  async function save() {
    setSaving(true)
    await onSave(f)
    setSaving(false)
    setDirty(false)
  }

  return (
    <div>
      <button
        className="text-sm text-gray-500 hover:text-gray-300 mb-4"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
      <div className="grid grid-cols-[160px_1fr] gap-6 mb-8">
        <div>
          <CoverImage path={f.imgPath} alt={f.name || '?'} rounded={rounded} className="w-40 h-40" />
          <button className="btn-ghost w-full mt-2 text-xs" onClick={changeImage}>
            Change image…
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="label">Name</label>
            <input className="input" value={f.name} onChange={(e) => set('name', e.target.value)} />
          </div>
          <div>
            <label className="label">Native name</label>
            <input
              className="input"
              value={f.native}
              onChange={(e) => set('native', e.target.value)}
            />
          </div>
          {extra}
          <div>
            <label className="label">{longTextLabel}</label>
            <textarea
              className="input min-h-[70px]"
              value={f.longText}
              onChange={(e) => set('longText', e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="btn-primary" disabled={!dirty || saving} onClick={save}>
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button
              className="btn-danger"
              onClick={async () => {
                if (confirm('Delete this entry? Links to it will be removed.')) await onDelete()
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
