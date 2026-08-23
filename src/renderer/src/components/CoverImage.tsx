import { useState, useEffect } from 'react'
import { useImageUrl } from '../lib/hooks'
import { thumbUrl } from '@shared/mediaUrl'
import MusicPlaceholder from './MusicPlaceholder'

interface Props {
  path: string | null | undefined
  alt: string
  className?: string
  rounded?: string
  // 'music' swaps the initial-letter placeholder for the listening-girl
  // artwork — used by every music-section cover slot.
  fallback?: 'initial' | 'music'
  // Ask for a disk-cached downscaled variant (see src/main/thumbs.ts) instead
  // of decoding the full-resolution source. Use for small cover slots in long
  // grids; onError falls back to the original transparently.
  thumbWidth?: number
}

// Shows a stored cover/photo, or a tasteful placeholder with the title initial.
// The navimg URL is built synchronously (no per-image IPC); if the file is
// missing on disk the <img> onError swaps to the placeholder — this replaces
// the old existsSync pre-check that useImageUrl used to perform.
export default function CoverImage({
  path,
  alt,
  className = '',
  rounded = 'rounded-md',
  fallback = 'initial',
  thumbWidth
}: Props) {
  const url = useImageUrl(path)
  const [failed, setFailed] = useState(false)
  const [thumbFailed, setThumbFailed] = useState(false)

  // A new path is a fresh chance to load — clear prior failures.
  useEffect(() => {
    setFailed(false)
    setThumbFailed(false)
  }, [url])

  const thumb = url && !failed && thumbWidth ? thumbUrl(path, thumbWidth) : null
  const src = thumb && !thumbFailed ? thumb : url

  if (url && !failed) {
    return (
      <img
        src={src ?? undefined}
        alt={alt}
        className={`object-cover bg-base-700 ${rounded} ${className}`}
        loading="lazy"
        decoding="async"
        draggable={false}
        onError={() => {
          if (thumb && !thumbFailed) setThumbFailed(true)
          else setFailed(true)
        }}
      />
    )
  }
  if (fallback === 'music') {
    return (
      <div className={`overflow-hidden bg-base-700 ${rounded} ${className}`} title={alt}>
        <MusicPlaceholder className="h-full w-full" />
      </div>
    )
  }
  return (
    <div
      className={`flex items-center justify-center bg-base-700 text-gray-500 ${rounded} ${className}`}
    >
      <span className="text-2xl font-semibold opacity-60">{alt.charAt(0).toUpperCase()}</span>
    </div>
  )
}
