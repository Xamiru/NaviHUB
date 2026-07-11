import type { ReactNode } from 'react'
import CoverImage from './CoverImage'

// Hero header shared by the album and artist pages: art + title + meta line +
// Play/Shuffle + find/clear-art actions. `round` switches to the artist look
// (circular photo, vertically centered).
export default function MusicEntityHeader({
  coverPath,
  title,
  meta,
  round = false,
  onPlay,
  onShuffle,
  artNoun,
  onFindArt,
  onClearArt
}: {
  coverPath: string | null
  title: string
  meta: ReactNode
  round?: boolean
  onPlay: () => void
  onShuffle: () => void
  artNoun: 'cover' | 'photo'
  onFindArt: () => void
  onClearArt: () => void
}) {
  return (
    <div className={`mb-6 flex gap-5 ${round ? 'items-center' : 'items-end'}`}>
      <CoverImage
        path={coverPath}
        alt={title}
        rounded={round ? 'rounded-full' : undefined}
        className={`shrink-0 ${round ? 'h-32 w-32' : 'h-44 w-44'}`}
        fallback="music"
      />
      <div className="min-w-0">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-1 text-sm text-gray-400">{meta}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button className="btn-primary" onClick={onPlay}>
            ▶ Play
          </button>
          <button className="btn-ghost" onClick={onShuffle}>
            ⇄ Shuffle
          </button>
          {coverPath ? (
            <button
              className="btn-ghost"
              onClick={onClearArt}
              title={`Remove the stored ${artNoun}`}
            >
              Clear {artNoun}
            </button>
          ) : (
            <button
              className="btn-ghost"
              onClick={onFindArt}
              title={`Look the ${artNoun} up online`}
            >
              Find {artNoun}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
