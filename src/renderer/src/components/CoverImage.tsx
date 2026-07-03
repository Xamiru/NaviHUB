import { useState, useEffect } from 'react'
import { useImageUrl } from '../lib/hooks'

interface Props {
  path: string | null | undefined
  alt: string
  className?: string
  rounded?: string
}

// Shows a stored cover/photo, or a tasteful placeholder with the title initial.
// The navimg URL is built synchronously (no per-image IPC); if the file is
// missing on disk the <img> onError swaps to the placeholder — this replaces
// the old existsSync pre-check that useImageUrl used to perform.
export default function CoverImage({ path, alt, className = '', rounded = 'rounded-md' }: Props) {
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
  return (
    <div
      className={`flex items-center justify-center bg-base-700 text-gray-500 ${rounded} ${className}`}
    >
      <span className="text-2xl font-semibold opacity-60">{alt.charAt(0).toUpperCase()}</span>
    </div>
  )
}
