import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { mediaUrl } from '@shared/mediaUrl'
import ContextMenu from '../ContextMenu'
import Lightbox from '../Lightbox'
import JustifiedGallery from './JustifiedGallery'
import { usePictureActions } from './PictureActions'
import type { MediaImage } from '@shared/types'

// The gallery body shared by /pictures and an album: count and Play, the
// selection bar, the justified grid, the viewer and the right-click menu.
export default function PictureBrowser({
  images,
  albumId,
  toolbar
}: {
  images: MediaImage[]
  albumId?: number
  // Extra controls beside Play (the album's Reorder).
  toolbar?: ReactNode
}): React.JSX.Element {
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [viewer, setViewer] = useState<{ index: number; autoplay: boolean } | null>(null)
  // Held by id: the list refetches after every action, so captured rows would
  // show stale menu labels.
  const [menu, setMenu] = useState<{ x: number; y: number; ids: number[] } | null>(null)
  const actions = usePictureActions({ albumId })

  const byId = useMemo(() => new Map(images.map((i) => [i.id, i])), [images])
  const pick = (ids: number[]): MediaImage[] =>
    ids.map((id) => byId.get(id)).filter((i): i is MediaImage => i != null)
  const selectedImages = pick([...selected])
  const menuImages = menu ? pick(menu.ids) : []

  // A filter change or a removal can drop selected images out of view.
  useEffect(() => {
    setSelected((s) => {
      const kept = [...s].filter((id) => byId.has(id))
      return kept.length === s.size ? s : new Set(kept)
    })
  }, [byId])

  useEffect(() => {
    if (viewer && viewer.index >= images.length) setViewer(null)
  }, [viewer, images.length])

  const count = `${images.length} image${images.length === 1 ? '' : 's'}`

  return (
    <>
      <div className="mb-3 flex min-h-9 flex-wrap items-center gap-2">
        {selected.size > 0 ? (
          <>
            <span className="text-sm text-gray-300">{selected.size} selected</span>
            {actions.itemsFor(selectedImages).map((item) => (
              <button
                key={item.label}
                className={item.danger ? 'btn-danger text-sm' : 'btn-ghost text-sm'}
                disabled={item.disabled}
                onClick={() => void item.onSelect()}
              >
                {item.label}
              </button>
            ))}
            <button className="btn-ghost text-sm" onClick={() => setSelected(new Set())}>
              Clear selection
            </button>
          </>
        ) : (
          <>
            <span className="text-sm text-gray-400">{count}</span>
            <button
              className="btn-ghost text-sm"
              disabled={images.length < 2}
              onClick={() => setViewer({ index: 0, autoplay: true })}
            >
              Play slideshow
            </button>
            {toolbar}
          </>
        )}
      </div>

      <JustifiedGallery
        images={images}
        selected={selected}
        onSelectionChange={setSelected}
        onOpen={(index) => setViewer({ index, autoplay: false })}
        onToggleFavorite={(img) => void actions.toggleFavorite([img])}
        onContextMenu={(img, e) =>
          setMenu({
            x: e.clientX,
            y: e.clientY,
            // Right-clicking inside the selection acts on all of it.
            ids: selected.has(img.id) && selected.size > 1 ? [...selected] : [img.id]
          })
        }
      />

      {viewer && images[viewer.index] && (
        <Lightbox
          images={images.map((img) => ({
            url: mediaUrl(img.filePath) ?? '',
            alt: img.mediaTitle ?? 'Unsorted'
          }))}
          index={viewer.index}
          slideshow
          autoplay={viewer.autoplay}
          onIndexChange={(index) => {
            setViewer((v) => (v ? { ...v, index } : v))
            setMenu(null)
          }}
          onClose={() => {
            setViewer(null)
            setMenu(null)
          }}
          onContextMenu={(index, e) => {
            const img = images[index]
            if (img) setMenu({ x: e.clientX, y: e.clientY, ids: [img.id] })
          }}
        />
      )}

      {/* After the Lightbox so it stacks above it when opened from there. */}
      {menu && menuImages.length > 0 && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          onClose={() => setMenu(null)}
          items={actions.itemsFor(menuImages, { openTitle: true })}
        />
      )}
      {actions.dialogs}
    </>
  )
}
