import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { formatBytes } from '@shared/torrents'
import { sourcePageUrl } from '@shared/pictures'
import type { MediaImage } from '@shared/types'

const SOURCE_LABELS: Record<string, string> = {
  wallhaven: 'Wallhaven',
  tmdb: 'TMDB',
  fanarttv: 'fanart.tv',
  anilist: 'AniList',
  danbooru: 'Danbooru',
  vndb: 'VNDB',
  steam: 'Steam',
  steamgriddb: 'SteamGridDB',
  url: 'Web link',
  file: 'Local file'
}

// The gallery Lightbox's info strip: title, size, file details and where the
// image came from.
export default function PictureCaption({ image }: { image: MediaImage }): React.JSX.Element {
  const { data: info } = useQuery({
    queryKey: qk.pictures.fileInfo(image.id),
    queryFn: () => api.pictures.fileInfo(image.id)
  })
  const page = sourcePageUrl(image.source, image.sourceUrl)
  const details = [
    image.width && image.height ? `${image.width}×${image.height}` : null,
    info?.bytes != null ? formatBytes(info.bytes) : info ? 'File missing' : null,
    info?.format ?? null,
    image.source ? (SOURCE_LABELS[image.source] ?? image.source) : null
  ].filter(Boolean)
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <span className="truncate font-medium text-gray-100">{image.mediaTitle ?? 'Unsorted'}</span>
      <span className="tabular-nums">{details.join(' · ')}</span>
      {page && (
        <button className="hover:text-accent" onClick={() => void api.app.openExternal(page)}>
          Open original
        </button>
      )}
      <button className="hover:text-accent" onClick={() => void api.pictures.showInFolder(image.id)}>
        Show in folder
      </button>
    </div>
  )
}
