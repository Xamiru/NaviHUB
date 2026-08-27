import { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { toastError } from '../lib/toast'
import { configFor, pathForMedia, type MediaConfig } from '../lib/mediaConfig'
import CoverImage from './CoverImage'
import FavoriteButton from './FavoriteButton'
import type { MediaItem } from '@shared/types'

// THE media cover card (a second, diverging copy used to live on HomePage —
// don't grow another). Badges:
//   default            — score top-right, status bottom-left, formatCardSub line
//   showTypeBadge      — cross-type strips: type label top-left, status hidden
//   showProgressBar    — thin bottom bar + formatProgressStat line (Continue)
//   showFavorite       — hover/focus heart that writes straight through, so a
//                        grid can be curated without opening anything
//   achievements       — unlocked/total chip for a tracked game (games + VNs)
const MediaCard = memo(function MediaCard({
  item,
  cfg,
  showTypeBadge = false,
  showProgressBar = false,
  showFavorite = false,
  achievements
}: {
  item: MediaItem
  cfg?: MediaConfig
  showTypeBadge?: boolean
  showProgressBar?: boolean
  showFavorite?: boolean
  achievements?: { unlocked: number; total: number }
}) {
  const qc = useQueryClient()
  // Optimistic, re-synced from props — the ThemeRow contract, so an unrelated
  // refetch cannot leave the heart showing the wrong state.
  const [favorite, setFavorite] = useState(item.favorite)
  useEffect(() => setFavorite(item.favorite), [item.favorite])
  async function toggleFavorite(e: React.MouseEvent): Promise<void> {
    // The card IS a link; the heart must not navigate.
    e.preventDefault()
    e.stopPropagation()
    const next = !favorite
    setFavorite(next)
    try {
      await api.media.update(item.id, { favorite: next })
      // Scoped, not the whole ['media'] prefix: on Home that prefix matches
      // seven full-library queries plus timeStats, resumePoints and the
      // activity heatmap — about nine reads for one boolean, on an interaction
      // designed to be rapid. Only this type's lists can show the change.
      await qc.invalidateQueries({ queryKey: qk.media.home(item.mediaType) })
      await qc.invalidateQueries({ queryKey: qk.media.detail(item.id) })
    } catch (err) {
      setFavorite(!next)
      toastError(err)
    }
  }
  const config = cfg ?? configFor(item.mediaType)
  const pct =
    showProgressBar && item.totalUnits != null && item.totalUnits > 0
      ? Math.min(100, Math.round((item.progress / item.totalUnits) * 100))
      : null
  const sub = showProgressBar ? config.formatProgressStat(item) : config.formatCardSub(item)

  return (
    <Link to={pathForMedia(item)} className="group block">
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
        <CoverImage
          path={item.coverPath}
          alt={item.title}
          rounded="rounded-lg"
          className="h-full w-full transition-transform group-hover:scale-105"
        />
        {showTypeBadge && (
          <span className="absolute top-1.5 left-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-gray-200">
            {config.singular}
          </span>
        )}
        {item.score != null && (
          <span className="absolute top-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-xs font-semibold text-yellow-300">
            ★ {item.score}
          </span>
        )}
        {/* Only for tracked games; top-left is free because game lists never
            show the type badge. ✓ is a state mark, not decoration. */}
        {!showTypeBadge && achievements && achievements.total > 0 && (
          <span
            className={`absolute top-1.5 left-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] tabular-nums ${
              achievements.unlocked === achievements.total ? 'text-accent' : 'text-gray-200'
            }`}
            title={`${achievements.unlocked} of ${achievements.total} achievements unlocked`}
          >
            ✓ {achievements.unlocked}/{achievements.total}
          </span>
        )}
        {!showTypeBadge && item.status && (
          <span className="absolute bottom-1.5 left-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-gray-200">
            {item.status}
          </span>
        )}
        {showFavorite && (
          <FavoriteButton
            active={favorite}
            variant="overlay"
            className="absolute bottom-1.5 right-1.5"
            onClick={(e) => void toggleFavorite(e)}
          />
        )}
        {pct != null && (
          <div className="absolute inset-x-0 bottom-0 h-1 bg-black/60">
            <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
          </div>
        )}
      </div>
      <div className="mt-2">
        <p className="text-sm font-medium line-clamp-2 group-hover:text-accent">{item.title}</p>
        {(sub || (!showProgressBar && item.status)) && (
          <p className="text-xs text-gray-500">{sub || item.status}</p>
        )}
      </div>
    </Link>
  )
})

export default MediaCard
