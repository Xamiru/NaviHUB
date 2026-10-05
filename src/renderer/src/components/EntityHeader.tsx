import { useId, useState, type ReactNode } from 'react'
import { api } from '../lib/api'
import CoverImage from './CoverImage'
import ActionMenu from './ActionMenu'
import Dialog from './Dialog'
import { Field } from './Field'
import ImagePickerDialog from './ImagePickerDialog'
import { confirmDialog } from '../lib/confirm'
import type { ImageOverrideKind } from '@shared/types'

interface Fields {
  name: string
  native: string
  longText: string
  imgPath: string | null
}

interface Props {
  initial: Fields
  // Omitted when the entity has no long text (companies keep no notes).
  longTextLabel?: string
  // Portraits for people and characters; logos are shown whole.
  imageShape?: 'portrait' | 'logo'
  facts?: { label: string; value: ReactNode }[]
  onSave: (f: Fields) => Promise<void>
  onDelete: () => Promise<void>
  editFields?: ReactNode // extra controls inside the Edit dialog (e.g. company type)
  onEditReset?: () => void // clears any page-held draft for editFields, on open and on close
  actions?: ReactNode // extra buttons beside Edit (e.g. Add to list)
  // Imported people/characters: a changed image is saved as a manual pick that
  // re-imports keep. onReverted refetches the page after "Restore imported image".
  imageOverride?: { kind: ImageOverrideKind; id: number; onReverted: () => void }
  children?: ReactNode // the page's sections, in the main column
}

// A long biography folds after this many characters so the credits below it
// stay in reach.
const FOLD_AT = 600

// The read view shared by the person / studio / character detail pages:
// portrait and facts on the left, name, actions and long text on the right,
// and the page's own sections below them. Editing happens in a dialog, so the
// page reads as a profile rather than a form.
export default function EntityHeader({
  initial,
  longTextLabel,
  imageShape = 'portrait',
  facts = [],
  onSave,
  onDelete,
  editFields,
  onEditReset,
  actions,
  imageOverride,
  children
}: Props) {
  const [editing, setEditing] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const openEdit = (): void => {
    onEditReset?.()
    setEditing(true)
  }
  // A dialog closed without saving must not leave its draft behind for the
  // next save (an image pick saves at once through the same onSave).
  const closeEdit = (): void => {
    onEditReset?.()
    setEditing(false)
  }

  // The image saves the moment it is picked. setManual goes first, so the
  // override row exists when the page's upsert writes the same path and the
  // restore trigger has nothing to undo.
  async function saveImage(path: string | null): Promise<void> {
    if (path === initial.imgPath) return
    if (imageOverride) await api.images.setManual(imageOverride.kind, imageOverride.id, path)
    await onSave({ ...initial, imgPath: path })
  }

  const longText = initial.longText.trim()
  const folded = !expanded && longText.length > FOLD_AT
  return (
    <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
      <aside>
        <CoverImage
          path={initial.imgPath}
          alt={initial.name}
          rounded="rounded-lg"
          className={`mx-auto w-44 lg:w-full ${imageShape === 'logo' ? 'aspect-square' : 'aspect-[3/4]'}`}
        />
        {facts.length > 0 && (
          <dl className="mt-4 space-y-3 text-sm">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500">{f.label}</dt>
                <dd className="mt-0.5 text-white">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </aside>

      <div className="min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-base-700 pb-4">
          <div className="min-w-0">
            <h1 className="text-3xl font-semibold tracking-tight text-white text-balance sm:text-4xl">{initial.name}</h1>
            {initial.native && <p className="mt-1 text-lg text-gray-400">{initial.native}</p>}
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="btn-ghost" onClick={openEdit}>
              Edit
            </button>
            {actions}
            <ActionMenu
              items={[
                { label: 'Change image…', onSelect: () => setPickerOpen(true) },
                {
                  label: 'Delete…',
                  danger: true,
                  onSelect: async () => {
                    const ok = await confirmDialog('Delete this entry? Links to it will be removed.', {
                      confirmLabel: 'Delete',
                      danger: true
                    })
                    if (ok) await onDelete()
                  }
                }
              ]}
            />
          </div>
        </div>

        {longTextLabel &&
          (longText ? (
            <div className="mt-4 max-w-[72ch]">
              <p className={`whitespace-pre-wrap text-sm leading-relaxed text-gray-300 ${folded ? 'line-clamp-6' : ''}`}>
                {longText}
              </p>
              {longText.length > FOLD_AT && (
                <button className="mt-1 text-xs text-gray-400 hover:text-white" onClick={() => setExpanded((v) => !v)}>
                  {expanded ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>
          ) : (
            <p className="mt-4 text-sm text-gray-400">
              No {longTextLabel.toLowerCase()} yet.{' '}
              <button className="text-signal-link hover:underline" onClick={openEdit}>
                Add one
              </button>
            </p>
          ))}

        <div className="mt-8">{children}</div>
      </div>

      {editing && (
        <EditDialog
          initial={initial}
          longTextLabel={longTextLabel}
          editFields={editFields}
          onSave={async (f) => {
            await onSave({ ...f, imgPath: initial.imgPath })
            closeEdit()
          }}
          onClose={closeEdit}
        />
      )}
      {pickerOpen && (
        <ImagePickerDialog
          title="Change image"
          subject={initial.name || '?'}
          currentPath={initial.imgPath}
          override={imageOverride}
          rounded="rounded-lg"
          previewClassName="h-24 w-24"
          onPick={saveImage}
          onReverted={() => imageOverride?.onReverted()}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </div>
  )
}

function EditDialog({
  initial,
  longTextLabel,
  editFields,
  onSave,
  onClose
}: {
  initial: Fields
  longTextLabel?: string
  editFields?: ReactNode
  onSave: (f: Fields) => Promise<void>
  onClose: () => void
}) {
  const id = useId()
  const [f, setF] = useState(initial)
  const [saving, setSaving] = useState(false)
  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => setF((p) => ({ ...p, [k]: v }))
  return (
    <Dialog
      labelledBy={id}
      onClose={onClose}
      panelClassName="w-full max-w-xl rounded-lg border border-line-subtle bg-surface-panel p-6"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <h2 id={id} className="text-lg font-semibold">
          Edit {initial.name}
        </h2>
        <button className="btn-ghost" onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          setSaving(true)
          onSave(f).finally(() => setSaving(false))
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name">
            <input className="input" value={f.name} onChange={(e) => set('name', e.target.value)} />
          </Field>
          <Field label="Native name">
            <input className="input" value={f.native} onChange={(e) => set('native', e.target.value)} />
          </Field>
        </div>
        {editFields}
        {longTextLabel && (
          <Field label={longTextLabel}>
            <textarea
              className="input min-h-[160px] leading-6"
              value={f.longText}
              onChange={(e) => set('longText', e.target.value)}
            />
          </Field>
        )}
        <button type="submit" className="btn-primary w-full" disabled={saving || !f.name.trim()}>
          {saving ? 'Saving…' : 'Save'}
        </button>
      </form>
    </Dialog>
  )
}
