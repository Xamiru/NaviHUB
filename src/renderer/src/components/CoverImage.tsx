import { useState, useEffect } from 'react'
import { useImageUrl } from '../lib/hooks'
import MusicPlaceholder from './MusicPlaceholder'

interface Props {
  path: string | null | undefined
  alt: string
  className?: string
  rounded?: string
  // 'music' swaps the initial-letter placeholder for the listening-girl
  // artwork — used by every music-section cover slot.
  fallback?: 'initial' | 'music'
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
  fallback = 'initial'
}: Props) {
  const url = useImageUrl(path)
  const [failed, setFailed] = useState(false)

  // A new path is a fresh chance to load — clear a prior failure.
  useEffect(() => setFailed(false), [url])

  if (url && !failed) {
    return (
      <img
        src={url}
        alt={alt}
        className={`object-cover bg-base-700 ${rounded} ${className}`}
        loading="lazy"
        decoding="async"
        draggable={false}
        onError={() => setFailed(true)}
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
