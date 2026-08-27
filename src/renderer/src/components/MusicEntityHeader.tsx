import type { ReactNode } from 'react'
import CoverImage from './CoverImage'
import ActionMenu, { type ActionItem } from './ActionMenu'

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
  onClearArt,
  onDelete,
  deleteLabel,
  addMusicItems = []
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
  onDelete?: () => void // permanently deletes from disk (gated by a confirm)
  deleteLabel?: string
  addMusicItems?: ActionItem[]
}) {
  const maintenanceItems: ActionItem[] = [
    coverPath
      ? {
          label: `Clear ${artNoun}`,
          title: `Remove the stored ${artNoun}`,
          onSelect: onClearArt
        }
      : {
          label: `Find ${artNoun}`,
          title: `Look the ${artNoun} up online`,
          onSelect: onFindArt
        }
  ]
  if (onDelete) {
    maintenanceItems.push({
      label: deleteLabel ? `${deleteLabel}…` : 'Delete…',
      danger: true,
      title: 'Permanently delete from your computer',
      onSelect: onDelete
    })
  }

  return (
    <div className={`mb-8 grid gap-6 border-b border-base-700 pb-7 sm:grid-cols-[190px_minmax(0,1fr)] ${round ? 'sm:items-center' : 'sm:items-end'}`}>
      <CoverImage
        path={coverPath}
        alt={title}
        rounded={round ? 'rounded-full' : undefined}
        className={`mx-auto shrink-0 sm:mx-0 ${round ? 'h-40 w-40' : 'h-48 w-48'}`}
        fallback="music"
      />
      <div className="min-w-0">
        <h1 className="text-3xl font-semibold text-white sm:text-4xl text-balance">{title}</h1>
        <p className="mt-1 text-sm text-gray-400">{meta}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <button className="btn-primary" onClick={onPlay}>
            Play
          </button>
          <button className="btn-ghost" onClick={onShuffle}>
            Shuffle
          </button>
          {addMusicItems.length > 0 && <ActionMenu label="Add music" items={addMusicItems} />}
          <ActionMenu label="Library maintenance" items={maintenanceItems} />
        </div>
      </div>
    </div>
  )
}
