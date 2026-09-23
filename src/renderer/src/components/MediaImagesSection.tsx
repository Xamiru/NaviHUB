import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { toast, toastError } from '../lib/toast'
import { mediaUrl } from '@shared/mediaUrl'
import Section from './Section'
import CoverImage from './CoverImage'
import Lightbox from './Lightbox'
import ImageBrowseDialog from './ImageBrowseDialog'
import ContextMenu from './ContextMenu'
import type { ImageKind, MediaDetail, MediaImage } from '@shared/types'
import { confirmDialog } from '../lib/confirm'
import { Field } from './Field'

// One gallery section powers both "Wallpapers" and "Fan Art" (kind prop).
// Images come from its own query (not MediaDetail) so add/remove only refetch
// this grid. Files live under pictures.dir; tiles click into the Lightbox.
export default function MediaImagesSection({
  m,
  kind
}: {
  m: MediaDetail
  kind: ImageKind
}): React.JSX.Element {
  const qc = useQueryClient()
  const [busy, setBusy] = useState(false)
  const [browsing, setBrowsing] = useState(false)
  const [urlOpen, setUrlOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [lightboxAt, setLightboxAt] = useState<number | null>(null)
  // Right-click target, held by id rather than by object: the list refetches
  // after every toggle, so a captured row would show stale menu labels.
  const [menu, setMenu] = useState<{ x: number; y: number; imageId: number } | null>(null)

  const { data } = useQuery({
    queryKey: qk.pictures.list(m.id, kind),
    queryFn: () => api.pictures.list(m.id, kind)
  })
  const images = data ?? []

  const label = kind === 'wallpaper' ? 'Wallpapers' : 'Fan Art'
  // Both kinds, not just this one: setting a background clears the flag from
  // whatever held it, which may well be a tile in the other section.
  const refresh = () => qc.invalidateQueries({ queryKey: qk.pictures.lists(m.id) })
  const menuImg = menu ? images.find((i) => i.id === menu.imageId) : undefined

  async function run(fn: () => Promise<void>): Promise<void> {
    setBusy(true)
    try {
      await fn()
      refresh()
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
    }
  }

  const addFiles = () =>
    run(async () => {
      const added = await api.pictures.addFromFiles(m.id, kind)
      if (added.length) toast(`Added ${added.length} image${added.length === 1 ? '' : 's'}`, 'success')
    })

  const addUrl = () =>
    run(async () => {
      const trimmed = url.trim()
      if (!trimmed) return
      await api.pictures.addFromUrl(m.id, kind, trimmed)
      setUrl('')
      setUrlOpen(false)
      toast('Image added', 'success')
    })

  const toggleSlideshow = (img: MediaImage): Promise<void> =>
    run(async () => {
      const updated = await api.pictures.toggleSlideshow(img.id)
      toast(updated.inSlideshow ? 'Added to slideshow' : 'Removed from slideshow', 'success')
    })

  const toggleBackground = (img: MediaImage): Promise<void> =>
    run(async () => {
      await api.pictures.setBackground(m.id, img.isBackground ? null : img.id)
      // The page backdrop is painted from MediaDetail, not from this query.
      await qc.invalidateQueries({ queryKey: qk.media.detail(m.id) })
      toast(img.isBackground ? 'Background cleared' : 'Background set', 'success')
    })

  const remove = async (imageId: number): Promise<void> => {
    const ok = await confirmDialog('Remove this image? The file is deleted from disk too.', {
      confirmLabel: 'Remove',
      danger: true
    })
    if (!ok) return
    await run(async () => {
      await api.pictures.remove(imageId)
      setLightboxAt(null)
    })
  }

  return (
    <Section
      className="mb-6"
      title={images.length ? `${label} · ${images.length}` : label}
    >
      {images.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3 mb-3">
          {images.map((img, i) => (
            // Keep the image opener and Remove as sibling controls. A real
            // button gives the tile keyboard semantics without nesting the
            // Remove button inside another interactive element.
            <div
              key={img.id}
              className="group relative aspect-video overflow-hidden rounded-lg cursor-zoom-in"
              onContextMenu={(e) => {
                e.preventDefault()
                setMenu({ x: e.clientX, y: e.clientY, imageId: img.id })
              }}
            >
              <button
                type="button"
                className="absolute inset-0 h-full w-full text-left"
                aria-label={`View ${label.toLowerCase()} ${i + 1}`}
                onClick={() => setLightboxAt(i)}
              >
                <CoverImage
                  path={img.filePath}
                  alt={`${m.title} ${label.toLowerCase()}`}
                  className="h-full w-full transition-transform group-hover:scale-105"
                  rounded="rounded-lg"
                />
                {img.width && img.height && (
                  <span className="media-contrast absolute bottom-1.5 left-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-gray-300">
                    {img.width}×{img.height}
                  </span>
                )}
                {(img.isBackground || img.inSlideshow) && (
                  <span className="absolute bottom-1.5 right-1.5 flex gap-1">
                    {img.isBackground && (
                      <span className="media-contrast rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-accent">
                        Background
                      </span>
                    )}
                    {img.inSlideshow && (
                      <span className="media-contrast rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-gray-300">
                        Slideshow
                      </span>
                    )}
                  </span>
                )}
              </button>
              <button
                className="media-contrast absolute top-1.5 right-1.5 hidden group-hover:block group-focus-within:block rounded bg-black/70 px-1.5 py-0.5 text-sm text-gray-300 hover:text-red-400"
                onClick={(e) => {
                  e.stopPropagation()
                  void remove(img.id)
                }}
                aria-label="Remove image"
                title="Remove image"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <p className="mb-3 text-sm text-gray-500">
          {kind === 'wallpaper'
            ? 'No wallpapers yet — browse online sources or add your own.'
            : 'No fan art yet — add images from your disk or a URL.'}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <button className="btn-ghost" onClick={() => setBrowsing(true)} disabled={busy}>
          Browse…
        </button>
        <button className="btn-ghost" onClick={addFiles} disabled={busy}>
          + Add files
        </button>
        {!urlOpen && (
          <button className="btn-ghost" onClick={() => setUrlOpen(true)} disabled={busy}>
            + From URL
          </button>
        )}
        {urlOpen && (
          <div className="flex items-center gap-2">
            <Field label="Image URL" hiddenLabel className="contents">
              <input
                className="input w-72"
                placeholder="https://… image link"
                value={url}
                autoFocus
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') void addUrl()
                  if (e.key === 'Escape') setUrlOpen(false)
                }}
              />
            </Field>
            <button className="btn-primary" onClick={addUrl} disabled={busy || !url.trim()}>
              Add
            </button>
            <button className="btn-ghost" onClick={() => setUrlOpen(false)} disabled={busy}>
              Cancel
            </button>
          </div>
        )}
      </div>

      {browsing && (
        <ImageBrowseDialog m={m} kind={kind} onClose={() => setBrowsing(false)} />
      )}

      {lightboxAt != null && images[lightboxAt] && (
        <Lightbox
          images={images.map((img) => ({
            url: mediaUrl(img.filePath) ?? '',
            alt: `${m.title} ${label.toLowerCase()}`
          }))}
          index={lightboxAt}
          onIndexChange={(i) => {
            setLightboxAt(i)
            setMenu(null)
          }}
          onClose={() => {
            setLightboxAt(null)
            setMenu(null)
          }}
          onContextMenu={(i, e) => {
            const img = images[i]
            if (img) setMenu({ x: e.clientX, y: e.clientY, imageId: img.id })
          }}
        />
      )}

      {/* After the Lightbox so it stacks above it when opened from there. */}
      {menu && menuImg && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          onClose={() => setMenu(null)}
          items={[
            {
              label: menuImg.inSlideshow ? 'Remove from slideshow' : 'Add to slideshow',
              disabled: busy,
              onSelect: () => toggleSlideshow(menuImg)
            },
            {
              label: menuImg.isBackground ? 'Clear background' : 'Set background',
              disabled: busy,
              onSelect: () => toggleBackground(menuImg)
            }
          ]}
        />
      )}
    </Section>
  )
}
