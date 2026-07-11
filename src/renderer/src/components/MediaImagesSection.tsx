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
import type { ImageKind, MediaDetail } from '@shared/types'

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

  const { data } = useQuery({
    queryKey: qk.pictures.list(m.id, kind),
    queryFn: () => api.pictures.list(m.id, kind)
  })
  const images = data ?? []

  const label = kind === 'wallpaper' ? 'Wallpapers' : 'Fan Art'
  const refresh = () => qc.invalidateQueries({ queryKey: qk.pictures.list(m.id, kind) })

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

  const remove = (imageId: number) =>
    run(async () => {
      if (!confirm('Remove this image? The file is deleted from disk too.')) return
      await api.pictures.remove(imageId)
      setLightboxAt(null)
    })

  return (
    <Section
      className="mb-6"
      title={images.length ? `${label} · ${images.length}` : label}
    >
      {images.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3 mb-3">
          {images.map((img, i) => (
            <div
              key={img.id}
              className="group relative aspect-video overflow-hidden rounded-lg cursor-zoom-in"
              onClick={() => setLightboxAt(i)}
            >
              <CoverImage
                path={img.filePath}
                alt={`${m.title} ${label.toLowerCase()}`}
                className="h-full w-full transition-transform group-hover:scale-105"
                rounded="rounded-lg"
              />
              {img.width && img.height && (
                <span className="absolute bottom-1.5 left-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-gray-300">
                  {img.width}×{img.height}
                </span>
              )}
              <button
                className="absolute top-1.5 right-1.5 hidden group-hover:block rounded bg-black/70 px-1.5 py-0.5 text-sm text-gray-300 hover:text-red-400"
                onClick={(e) => {
                  e.stopPropagation()
                  void remove(img.id)
                }}
                aria-label="Remove image"
                title="Remove image"
              >
                ×
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
          ⊞ Browse…
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
          onIndexChange={setLightboxAt}
          onClose={() => setLightboxAt(null)}
        />
      )}
    </Section>
  )
}
