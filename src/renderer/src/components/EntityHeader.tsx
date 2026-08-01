import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import CoverImage from './CoverImage'
import ActionMenu from './ActionMenu'

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
  actions?: React.ReactNode // extra buttons beside Save/Delete (e.g. Add to list)
}

// Editable header (image + name + native + bio/description) shared by the
// person / studio / character detail pages.
export default function EntityHeader({
  initial,
  longTextLabel,
  rounded = 'rounded-xl',
  onSave,
  onDelete,
  extra,
  actions
}: Props) {
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
      {/* BackButton lives in the PAGE root, not here: `sticky` only holds
          within its parent's box, so nesting it in this short header would
          scroll it away. */}
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
            {actions}
            <ActionMenu
              items={[
                {
                  label: 'Delete…',
                  danger: true,
                  onSelect: async () => {
                    if (confirm('Delete this entry? Links to it will be removed.')) await onDelete()
                  }
                }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
