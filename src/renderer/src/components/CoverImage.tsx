import { useImageUrl } from '../lib/hooks'

interface Props {
  path: string | null | undefined
  alt: string
  className?: string
  rounded?: string
}

// Shows a stored cover/photo, or a tasteful placeholder with the title initial.
export default function CoverImage({ path, alt, className = '', rounded = 'rounded-md' }: Props) {
  const url = useImageUrl(path)
  if (url) {
    return (
      <img
        src={url}
        alt={alt}
        className={`object-cover bg-base-700 ${rounded} ${className}`}
        draggable={false}
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
