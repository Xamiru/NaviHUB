import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useIncrementalList } from '../../lib/hooks'
import { aspectOf, justifiedRows } from '../../lib/justifiedRows'
import CoverImage from '../CoverImage'
import FavoriteButton from '../FavoriteButton'
import type { MediaImage } from '@shared/types'

const GAP = 8
const TARGET_HEIGHT = 240

// The gallery grid: justified rows over the images, rendered in batches as the
// page scrolls. A click opens the viewer; Ctrl/Cmd-click toggles selection,
// Shift-click extends it, and while anything is selected a plain click selects
// too. Right-click is the owner's menu.
export default function JustifiedGallery({
  images,
  selected,
  onSelectionChange,
  onOpen,
  onContextMenu,
  onToggleFavorite,
  showTitles = true
}: {
  images: MediaImage[]
  selected: Set<number>
  onSelectionChange: (next: Set<number>) => void
  onOpen: (index: number) => void
  onContextMenu: (image: MediaImage, e: React.MouseEvent) => void
  onToggleFavorite: (image: MediaImage) => void
  showTitles?: boolean
}): React.JSX.Element {
  const boxRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const anchorRef = useRef<number | null>(null)
  const { visible, sentinelRef, hasMore } = useIncrementalList(images, 96)

  useLayoutEffect(() => {
    const el = boxRef.current
    if (!el) return
    setWidth(el.clientWidth)
    if (typeof ResizeObserver === 'undefined') return
    const obs = new ResizeObserver(() => setWidth(el.clientWidth))
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const rows = useMemo(
    () =>
      justifiedRows(
        visible.map((img) => aspectOf(img.width, img.height, img.kind)),
        { containerWidth: width, targetHeight: TARGET_HEIGHT, gap: GAP }
      ),
    [visible, width]
  )

  function select(index: number, e: React.MouseEvent): void {
    const id = images[index].id
    const next = new Set(selected)
    // The anchor is an image id: the list can shrink or re-sort between clicks.
    const anchor = e.shiftKey ? images.findIndex((img) => img.id === anchorRef.current) : -1
    if (anchor >= 0) {
      const [from, to] = [anchor, index].sort((a, b) => a - b)
      for (let i = from; i <= to; i++) next.add(images[i].id)
    } else if (e.shiftKey) next.add(id)
    else if (next.has(id)) next.delete(id)
    else next.add(id)
    anchorRef.current = id
    onSelectionChange(next)
  }

  return (
    <div ref={boxRef}>
      {rows.map((row) => (
        <div key={row.items[0]} className="mb-2 flex" style={{ gap: GAP }}>
          {row.items.map((index, j) => {
            const img = images[index]
            const isSelected = selected.has(img.id)
            const name = img.mediaTitle ?? 'Unsorted'
            return (
              <div
                key={img.id}
                className={`group relative shrink-0 overflow-hidden rounded-lg bg-base-800 ${
                  isSelected ? 'ring-2 ring-accent ring-offset-2 ring-offset-base-900' : ''
                }`}
                style={{ width: row.widths[j], height: row.height }}
                onContextMenu={(e) => {
                  e.preventDefault()
                  onContextMenu(img, e)
                }}
              >
                <button
                  type="button"
                  className="absolute inset-0 h-full w-full cursor-zoom-in"
                  aria-label={`View ${img.kind === 'wallpaper' ? 'wallpaper' : 'fan art'} from ${name}`}
                  onClick={(e) => {
                    if (e.ctrlKey || e.metaKey || e.shiftKey || selected.size > 0) select(index, e)
                    else onOpen(index)
                  }}
                >
                  <CoverImage
                    path={img.filePath}
                    alt={name}
                    thumbWidth={480}
                    rounded="rounded-lg"
                    className="h-full w-full transition-transform group-hover:scale-[1.03]"
                  />
                </button>
                <FavoriteButton
                  variant="overlay"
                  active={img.isFavorite}
                  onClick={() => onToggleFavorite(img)}
                  className="absolute left-1.5 top-1.5"
                />
                <button
                  type="button"
                  className={`media-contrast absolute right-1.5 top-1.5 h-6 w-6 rounded border text-xs ${
                    isSelected
                      ? 'inline-flex items-center justify-center border-accent bg-accent text-ink-inverse'
                      : 'hidden items-center justify-center border-gray-300 bg-black/60 text-gray-300 group-hover:inline-flex group-focus-within:inline-flex'
                  }`}
                  aria-pressed={isSelected}
                  aria-label={isSelected ? 'Deselect image' : 'Select image'}
                  title={isSelected ? 'Deselect' : 'Select'}
                  onClick={(e) => select(index, e)}
                >
                  {isSelected ? '✓' : ''}
                </button>
                {(showTitles || img.inSlideshow) && (
                  <div className="pointer-events-none absolute inset-x-1.5 bottom-1.5 flex items-end justify-between gap-1">
                    {showTitles ? (
                      <span className="media-contrast hidden max-w-[75%] truncate rounded bg-black/70 px-1.5 py-0.5 text-xs text-gray-200 group-hover:block group-focus-within:block">
                        {name}
                      </span>
                    ) : (
                      <span />
                    )}
                    {img.inSlideshow && (
                      <span className="media-contrast rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-gray-300">
                        Slideshow
                      </span>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ))}
      {hasMore && <div ref={sentinelRef} className="h-8" />}
    </div>
  )
}
