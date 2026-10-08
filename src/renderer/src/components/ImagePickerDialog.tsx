import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { toastError } from '../lib/toast'
import type { ImageOverrideKind, MediaImage } from '@shared/types'
import CoverImage from './CoverImage'
import Dialog from './Dialog'
import { Field } from './Field'

interface Props {
  title: string
  // Entity name, for image alt text.
  subject: string
  currentPath: string | null
  // An imported entity: shows whether a hand-picked image is held and offers
  // "Restore imported image".
  override?: { kind: ImageOverrideKind; id: number }
  // Offers this media item's Art-tab images as sources.
  artMediaId?: number
  allowRemove?: boolean
  // Ready-made candidates from a source (a game's box art per region).
  suggestions?: { url: string; label: string }[]
  rounded?: string
  previewClassName?: string
  // Receives a stored media/ path (null = remove). The caller saves it, either
  // at once or with its form.
  onPick: (path: string | null) => Promise<void> | void
  onReverted?: (path: string | null) => void
  onClose: () => void
}

// The one way to replace an imported cover, person photo or character image:
// a local file, a pasted URL, a source's suggestion, or an image already in
// the title's Art tab.
export default function ImagePickerDialog({
  title,
  subject,
  currentPath,
  override,
  artMediaId,
  allowRemove = false,
  suggestions = [],
  rounded = 'rounded-lg',
  previewClassName = 'h-28 w-20',
  onPick,
  onReverted,
  onClose
}: Props): React.JSX.Element {
  const qc = useQueryClient()
  const [busy, setBusy] = useState(false)
  const [url, setUrl] = useState('')

  const { data: state } = useQuery({
    queryKey: qk.images.override(override?.kind ?? 'media', override?.id ?? 0),
    queryFn: () => api.images.overrideState(override!.kind, override!.id),
    enabled: !!override,
    // Cheap local read; a pick can change outside this dialog (Clear cover).
    refetchOnMount: 'always'
  })
  const wallpapers = useQuery({
    queryKey: qk.pictures.list(artMediaId ?? 0, 'wallpaper'),
    queryFn: () => api.pictures.list(artMediaId!, 'wallpaper'),
    enabled: artMediaId != null
  })
  const fanart = useQuery({
    queryKey: qk.pictures.list(artMediaId ?? 0, 'fanart'),
    queryFn: () => api.pictures.list(artMediaId!, 'fanart'),
    enabled: artMediaId != null
  })
  const art: MediaImage[] = [...(wallpapers.data ?? []), ...(fanart.data ?? [])]

  async function choose(source: () => Promise<string | null>, removing = false): Promise<void> {
    setBusy(true)
    try {
      const path = await source()
      if (path === null && !removing) return // file picker cancelled
      await onPick(path)
      qc.invalidateQueries({ queryKey: qk.images.all })
      onClose()
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
    }
  }

  async function restore(): Promise<void> {
    if (!override) return
    setBusy(true)
    try {
      const path = await api.images.revert(override.kind, override.id)
      qc.invalidateQueries({ queryKey: qk.images.all })
      onReverted?.(path)
      onClose()
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
    }
  }

  return (
    <Dialog
      labelledBy="image-picker-title"
      describedBy={override ? 'image-picker-note' : undefined}
      onClose={onClose}
      panelClassName="w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-lg bg-base-800 p-5 shadow-xl"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <h2 id="image-picker-title" className="text-lg font-semibold">
          {title}
        </h2>
        <button className="btn-ghost px-2" aria-label="Close" title="Close" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="mb-5 flex items-center gap-4">
        <CoverImage path={currentPath} alt={subject} rounded={rounded} className={`${previewClassName} shrink-0`} />
        <div className="min-w-0 space-y-2 text-sm">
          {override && (
            <p id="image-picker-note" className="text-gray-400">
              {state?.manual
                ? 'Your pick. Re-imports keep it.'
                : 'A picked image stays through re-imports and rescans.'}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {state?.manual && (
              <button className="btn-ghost text-xs" disabled={busy} onClick={restore}>
                Restore imported image
              </button>
            )}
            {allowRemove && currentPath && (
              <button
                className="btn-ghost text-xs"
                disabled={busy}
                onClick={() => choose(async () => null, true)}
              >
                Remove image
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <button className="btn-ghost" disabled={busy} onClick={() => choose(() => api.files.pickImage())}>
          Choose file…
        </button>

        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            const trimmed = url.trim()
            if (trimmed) void choose(() => api.images.fromUrl(trimmed))
          }}
        >
          <Field label="Image URL" hiddenLabel className="contents">
            <input
              className="input flex-1"
              placeholder="https://…"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Field>
          <button type="submit" className="btn-ghost" disabled={busy || !url.trim()}>
            Use URL
          </button>
        </form>

        {suggestions.length > 0 && (
          <section aria-labelledby="image-picker-suggested">
            <h3 id="image-picker-suggested" className="label">
              Box art
            </h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-2">
              {suggestions.map((sug) => (
                <button
                  key={sug.url}
                  type="button"
                  className="overflow-hidden rounded-md text-left disabled:opacity-50"
                  aria-label={`Use box art: ${sug.label}`}
                  title={sug.label}
                  disabled={busy}
                  onClick={() => choose(() => api.images.fromUrl(sug.url))}
                >
                  <img src={sug.url} alt="" loading="lazy" className="aspect-[2/3] w-full rounded-md bg-base-700 object-cover" />
                  <span className="mt-1 block truncate text-xs text-gray-400">{sug.label}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {art.length > 0 && (
          <section aria-labelledby="image-picker-art">
            <h3 id="image-picker-art" className="label">
              From the Art tab
            </h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2">
              {art.map((img, i) => (
                <button
                  key={img.id}
                  type="button"
                  className="aspect-video overflow-hidden rounded-md disabled:opacity-50"
                  aria-label={`Use Art-tab image ${i + 1}`}
                  disabled={busy}
                  onClick={() => choose(() => api.images.fromArt(img.id))}
                >
                  <CoverImage
                    path={img.filePath}
                    alt=""
                    thumbWidth={240}
                    className="h-full w-full"
                    rounded="rounded-md"
                  />
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </Dialog>
  )
}
