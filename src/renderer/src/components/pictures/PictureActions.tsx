import { useId, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { toast, toastError } from '../../lib/toast'
import { confirmDialog } from '../../lib/confirm'
import { pathForMedia } from '../../lib/mediaConfig'
import type { ContextMenuItem } from '../ContextMenu'
import Dialog from '../Dialog'
import { Field } from '../Field'
import UniversalPicker, { type PickedEntity } from '../UniversalPicker'
import type { ImageKind, MediaImage } from '@shared/types'

// Every picture action in one place, so the gallery, an album and a title's
// Art tab offer the same menu. Each action takes a list: one right-clicked
// image or the gallery's whole selection.

type DialogState =
  | { kind: 'album'; images: MediaImage[] }
  | { kind: 'tags'; images: MediaImage[] }
  | { kind: 'move'; images: MediaImage[] }
  | null

const plural = (n: number, noun: string): string => `${n} ${noun}${n === 1 ? '' : 's'}`

export function usePictureActions({
  albumId,
  onRemoved
}: {
  // Viewing an album: adds "Remove from album".
  albumId?: number
  onRemoved?: (ids: number[]) => void
} = {}): {
  itemsFor: (images: MediaImage[], opts?: { openTitle?: boolean }) => ContextMenuItem[]
  toggleFavorite: (images: MediaImage[]) => Promise<void>
  remove: (images: MediaImage[]) => Promise<void>
  dialogs: ReactNode
  busy: boolean
} {
  const qc = useQueryClient()
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)
  const [dialog, setDialog] = useState<DialogState>(null)
  const { data: source = 'manual' } = useQuery({
    queryKey: qk.pictures.slideshowSource,
    queryFn: () => api.pictures.slideshowSource()
  })

  async function run(fn: () => Promise<void>): Promise<void> {
    setBusy(true)
    try {
      await fn()
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
      void qc.invalidateQueries({ queryKey: qk.pictures.all })
    }
  }

  const toggleFavorite = (images: MediaImage[]): Promise<void> =>
    run(async () => {
      const on = images.some((i) => !i.isFavorite)
      await api.pictures.setFavorite(
        images.map((i) => i.id),
        on
      )
    })

  const remove = async (images: MediaImage[]): Promise<void> => {
    const what = images.length === 1 ? 'this image' : plural(images.length, 'image')
    const ok = await confirmDialog(`Remove ${what}? The files are deleted from disk too.`, {
      confirmLabel: 'Remove',
      danger: true
    })
    if (!ok) return
    await run(async () => {
      for (const img of images) await api.pictures.remove(img.id)
      onRemoved?.(images.map((i) => i.id))
    })
  }

  function itemsFor(images: MediaImage[], opts: { openTitle?: boolean } = {}): ContextMenuItem[] {
    if (images.length === 0) return []
    const one = images.length === 1 ? images[0] : null
    const allFavorite = images.every((i) => i.isFavorite)
    const items: ContextMenuItem[] = [
      {
        label: allFavorite ? 'Remove from favorites' : 'Add to favorites',
        disabled: busy,
        onSelect: () => toggleFavorite(images)
      },
      { label: 'Add to album…', disabled: busy, onSelect: () => setDialog({ kind: 'album', images }) },
      { label: 'Tags…', disabled: busy, onSelect: () => setDialog({ kind: 'tags', images }) },
      { label: 'Move to…', disabled: busy, onSelect: () => setDialog({ kind: 'move', images }) }
    ]
    if (albumId != null) {
      items.push({
        label: 'Remove from album',
        disabled: busy,
        onSelect: () =>
          run(() =>
            api.pictures.albumRemove(
              albumId,
              images.map((i) => i.id)
            )
          )
      })
    }
    // In mirror mode the folder follows favorites or an album, so hand toggles
    // are hidden rather than offered and refused.
    if (one && source === 'manual') {
      items.push({
        label: one.inSlideshow ? 'Remove from slideshow' : 'Add to slideshow',
        disabled: busy,
        onSelect: () =>
          run(async () => {
            const updated = await api.pictures.toggleSlideshow(one.id)
            toast(updated.inSlideshow ? 'Added to slideshow' : 'Removed from slideshow', 'success')
          })
      })
    }
    if (one && one.mediaId != null) {
      const mediaId = one.mediaId
      items.push(
        {
          label: one.isBackground ? 'Clear background' : 'Set background',
          disabled: busy,
          onSelect: () =>
            run(async () => {
              await api.pictures.setBackground(mediaId, one.isBackground ? null : one.id)
              // The page backdrop is painted from MediaDetail, not from this query.
              await qc.invalidateQueries({ queryKey: qk.media.detail(mediaId) })
              toast(one.isBackground ? 'Background cleared' : 'Background set', 'success')
            })
        },
        {
          label: 'Use as cover',
          disabled: busy,
          onSelect: () =>
            run(async () => {
              await api.images.setManual('media', mediaId, await api.images.fromArt(one.id))
              await qc.invalidateQueries({ queryKey: qk.media.all })
              void qc.invalidateQueries({ queryKey: qk.images.all })
              toast('Cover set', 'success')
            })
        }
      )
      if (opts.openTitle && one.mediaType) {
        const to = pathForMedia({ id: mediaId, mediaType: one.mediaType })
        items.push({ label: `Open ${one.mediaTitle ?? 'title'}`, onSelect: () => navigate(to) })
      }
    }
    items.push({ label: 'Remove', danger: true, disabled: busy, onSelect: () => remove(images) })
    return items
  }

  const close = (): void => setDialog(null)
  const dialogs =
    dialog?.kind === 'album' ? (
      <AlbumPickerDialog images={dialog.images} onClose={close} />
    ) : dialog?.kind === 'tags' ? (
      <TagsDialog images={dialog.images} onClose={close} />
    ) : dialog?.kind === 'move' ? (
      <MoveDialog images={dialog.images} onClose={close} />
    ) : null

  return { itemsFor, toggleFavorite, remove, dialogs, busy }
}

function DialogFrame({
  title,
  onClose,
  children
}: {
  title: string
  onClose: () => void
  children: ReactNode
}): React.JSX.Element {
  const titleId = useId()
  return (
    <Dialog labelledBy={titleId} onClose={onClose} panelClassName="card w-full max-w-md p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 id={titleId} className="text-lg font-bold">
          {title}
        </h2>
        <button className="btn-ghost px-2" onClick={onClose} aria-label="Close" title="Close">
          ✕
        </button>
      </div>
      {children}
    </Dialog>
  )
}

function AlbumPickerDialog({
  images,
  onClose
}: {
  images: MediaImage[]
  onClose: () => void
}): React.JSX.Element {
  const qc = useQueryClient()
  const { data: albums = [] } = useQuery({
    queryKey: qk.pictures.albums,
    queryFn: () => api.pictures.albums()
  })
  const [name, setName] = useState('')
  const [busy, setBusy] = useState(false)
  const ids = images.map((i) => i.id)
  const what = images.length === 1 ? 'image' : plural(images.length, 'image')

  async function done(fn: () => Promise<string>): Promise<void> {
    setBusy(true)
    try {
      toast(await fn(), 'success')
      void qc.invalidateQueries({ queryKey: qk.pictures.all })
      onClose()
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
    }
  }

  return (
    <DialogFrame title={`Add ${what} to an album`} onClose={onClose}>
      {albums.length > 0 && (
        <ul className="mb-4 max-h-72 space-y-1 overflow-y-auto">
          {albums.map((a) => (
            <li key={a.id}>
              <button
                className="flex w-full items-center justify-between rounded px-3 py-2 text-left hover:bg-base-700"
                disabled={busy}
                onClick={() =>
                  done(async () => {
                    await api.pictures.albumAdd(a.id, ids)
                    return `Added to ${a.name}`
                  })
                }
              >
                <span className="truncate">{a.name}</span>
                <span className="text-xs text-gray-500">{plural(a.count, 'image')}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          if (!name.trim()) return
          void done(async () => {
            const album = await api.pictures.albumCreate(name, ids)
            return `Created ${album.name}`
          })
        }}
      >
        <Field label="New album name" hiddenLabel className="contents">
          <input
            className="input flex-1"
            placeholder="New album name"
            value={name}
            autoFocus={albums.length === 0}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>
        <button className="btn-primary" type="submit" disabled={busy || !name.trim()}>
          Create
        </button>
      </form>
    </DialogFrame>
  )
}

function TagsDialog({
  images,
  onClose
}: {
  images: MediaImage[]
  onClose: () => void
}): React.JSX.Element {
  const qc = useQueryClient()
  const listId = useId()
  const { data: tags = [] } = useQuery({
    queryKey: qk.pictures.tags,
    queryFn: () => api.pictures.tags()
  })
  // Local copy: the rows passed in are a snapshot from when the menu opened.
  const [applied, setApplied] = useState<Set<number>>(
    () => new Set(images.flatMap((i) => i.tagIds))
  )
  const [name, setName] = useState('')
  const ids = images.map((i) => i.id)
  const byId = new Map(tags.map((t) => [t.id, t.name]))

  async function change(fn: () => Promise<void>): Promise<void> {
    try {
      await fn()
      void qc.invalidateQueries({ queryKey: qk.pictures.all })
    } catch (e) {
      toastError(e)
    }
  }

  const add = (tagName: string): Promise<void> =>
    change(async () => {
      if (!tagName.trim()) return
      const tag = await api.pictures.tag(ids, tagName)
      setApplied((s) => new Set(s).add(tag.id))
      setName('')
    })

  const drop = (tagId: number): Promise<void> =>
    change(async () => {
      await api.pictures.untag(ids, tagId)
      setApplied((s) => {
        const next = new Set(s)
        next.delete(tagId)
        return next
      })
    })

  return (
    <DialogFrame
      title={images.length === 1 ? 'Tags' : `Tags for ${plural(images.length, 'image')}`}
      onClose={onClose}
    >
      <div className="mb-4 flex min-h-8 flex-wrap gap-1.5">
        {applied.size === 0 && <p className="text-sm text-gray-500">No tags yet.</p>}
        {[...applied].map((id) => (
          <span key={id} className="chip inline-flex items-center gap-1">
            {byId.get(id) ?? '…'}
            <button
              className="text-gray-400 hover:text-red-400"
              onClick={() => void drop(id)}
              aria-label={`Remove tag ${byId.get(id) ?? ''}`}
              title="Remove tag"
            >
              ✕
            </button>
          </span>
        ))}
      </div>
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          void add(name)
        }}
      >
        <Field label="Add a tag" hiddenLabel className="contents">
          <input
            className="input flex-1"
            placeholder="Add a tag"
            list={listId}
            value={name}
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />
        </Field>
        <datalist id={listId}>
          {tags
            .filter((t) => !applied.has(t.id))
            .map((t) => (
              <option key={t.id} value={t.name} />
            ))}
        </datalist>
        <button className="btn-primary" type="submit" disabled={!name.trim()}>
          Add
        </button>
      </form>
      {images.length > 1 && (
        <p className="mt-3 text-xs text-gray-500">
          Adding or removing a tag applies to every selected image.
        </p>
      )}
    </DialogFrame>
  )
}

function MoveDialog({
  images,
  onClose
}: {
  images: MediaImage[]
  onClose: () => void
}): React.JSX.Element {
  const qc = useQueryClient()
  const [target, setTarget] = useState<PickedEntity | 'unsorted' | null>(null)
  const [kind, setKind] = useState<ImageKind | 'keep'>('keep')
  const [busy, setBusy] = useState(false)

  async function move(): Promise<void> {
    if (!target && kind === 'keep') return
    setBusy(true)
    try {
      // No title picked = stay with each image's current owner, which only
      // makes sense when every image shares one.
      const owners = new Set(images.map((i) => i.mediaId))
      const mediaId =
        target === 'unsorted' ? null : target ? target.entityId : (images[0]?.mediaId ?? null)
      if (!target && owners.size > 1) throw new Error('Pick a title or Unsorted for these images')
      await api.pictures.move(
        images.map((i) => i.id),
        mediaId,
        kind === 'keep' ? null : kind
      )
      toast(`Moved ${plural(images.length, 'image')}`, 'success')
      void qc.invalidateQueries({ queryKey: qk.pictures.all })
      onClose()
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
    }
  }

  return (
    <DialogFrame title={`Move ${plural(images.length, 'image')}`} onClose={onClose}>
      <p className="label mb-1">Title</p>
      {target ? (
        <div className="mb-4 flex items-center justify-between rounded bg-base-800 px-3 py-2">
          <span className="truncate">{target === 'unsorted' ? 'Unsorted' : target.name}</span>
          <button className="btn-ghost text-xs" onClick={() => setTarget(null)}>
            Change
          </button>
        </div>
      ) : (
        <div className="mb-4 space-y-2">
          <UniversalPicker kind="media" placeholder="Search a title…" onPick={setTarget} autoFocus />
          <button className="btn-ghost text-sm" onClick={() => setTarget('unsorted')}>
            Unsorted (no title)
          </button>
        </div>
      )}
      <Field label="Kind" className="mb-4 block">
        <select
          className="input mt-1 w-full"
          value={kind}
          onChange={(e) => setKind(e.target.value as ImageKind | 'keep')}
        >
          <option value="keep">Keep current</option>
          <option value="wallpaper">Wallpaper</option>
          <option value="fanart">Fan art</option>
        </select>
      </Field>
      <p className="mb-4 text-xs text-gray-500">
        Files move to the new title's folder. Moving to another title clears the page background.
      </p>
      <div className="flex justify-end gap-2">
        <button className="btn-ghost" onClick={onClose}>
          Cancel
        </button>
        <button
          className="btn-primary"
          onClick={() => void move()}
          disabled={busy || (!target && kind === 'keep')}
        >
          Move
        </button>
      </div>
    </DialogFrame>
  )
}
