import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { MediaDetail } from '@shared/types'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import FavoriteButton from './FavoriteButton'
import Section from './Section'

// Cells drawn in the grid. Longer than any real series; a bogus count (a stale
// progress, a mistyped total) must not mount tens of thousands of rows.
const MAX_GRID = 3000

// Toggles still waiting on their IPC call, per anime. Module-level because the
// grid and the file rows each run this hook against the same cache entry.
const pendingToggles = new Map<number, number>()

// Hearted episodes of one anime, shared by this grid and the linked-file rows
// in VideoEpisodesSection (same query key, one fetch). Keyed by number.
export function useEpisodeFavorites(
  mediaId: number,
  enabled = true
): {
  hearted: number[]
  favorites: Set<number>
  toggle: (number: number) => Promise<void>
} {
  const qc = useQueryClient()
  const key = qk.episodeFavorites.forMedia(mediaId)
  const { data } = useQuery({
    queryKey: key,
    queryFn: () => api.episodeFavorites.list(mediaId),
    enabled
  })
  const hearted = data ?? []
  // The new state comes from the live cache, written before the call, so a
  // quick second click (or the same episode's other heart) undoes the first
  // instead of repeating it. IPC calls arrive in order. Each click cancels a
  // refetch still in flight, and the truth is refetched only once the last
  // pending click settles, so an older list never lands on a newer click. A
  // failure rejects into the global error toast.
  const toggle = async (number: number): Promise<void> => {
    pendingToggles.set(mediaId, (pendingToggles.get(mediaId) ?? 0) + 1)
    try {
      await qc.cancelQueries({ queryKey: key })
      const current = qc.getQueryData<number[]>(key) ?? []
      const favorite = !current.includes(number)
      const next = favorite ? [...current, number] : current.filter((n) => n !== number)
      qc.setQueryData<number[]>(key, next.sort((a, b) => a - b))
      await api.episodeFavorites.set(mediaId, number, favorite)
    } finally {
      const left = (pendingToggles.get(mediaId) ?? 1) - 1
      if (left > 0) pendingToggles.set(mediaId, left)
      else {
        pendingToggles.delete(mediaId)
        await qc.invalidateQueries({ queryKey: key })
      }
    }
  }
  return { hearted, favorites: new Set(hearted), toggle }
}

// Bottom of an anime's Episodes tab: one heart per episode, whether or not a
// folder is linked. Nothing else in the app lists these.
export default function FavoriteEpisodesSection({ m }: { m: MediaDetail }): JSX.Element {
  const { hearted, favorites, toggle } = useEpisodeFavorites(m.id)
  // Shares VideoEpisodesSection's cache entry, so it costs no second read.
  const { data: library } = useQuery({
    queryKey: qk.video.library(m.id),
    queryFn: () => api.video.files(m.id)
  })
  const lastFile = Math.max(
    0,
    // Specials (season 0) are numbered apart from the main run.
    ...(library?.files ?? []).map((f) =>
      f.season !== 0 && f.number != null && Number.isInteger(f.number) ? f.number : 0
    )
  )
  // Without a known total (airing, or never imported; some sources store 0),
  // offer what has been logged or linked so far. A favorite past every bound
  // still shows.
  const total = m.totalUnits != null && m.totalUnits > 0 ? m.totalUnits : 0
  const count = Math.max(total, m.progress, lastFile, hearted.at(-1) ?? 0)
  // Past the cap only the hearted episodes still show, so none is unreachable.
  const numbers = [
    ...Array.from({ length: Math.min(count, MAX_GRID) }, (_, i) => i + 1),
    ...hearted.filter((n) => n > MAX_GRID)
  ]

  return (
    <Section
      title={`Favorite episodes${hearted.length ? ` · ${hearted.length}` : ''}`}
      className="mb-6"
    >
      {hearted.length > 0 && (
        <p className="mb-2 text-sm text-gray-300">
          {hearted.length === 1 ? 'Episode' : 'Episodes'} {hearted.join(', ')}
        </p>
      )}
      {count === 0 ? (
        <p className="text-xs text-gray-400">
          The episode count is unknown. Episodes appear here as you log them.
        </p>
      ) : (
        <ul
          aria-label="Episodes"
          className="grid max-h-72 grid-cols-[repeat(auto-fill,minmax(4.5rem,1fr))] gap-1.5 overflow-y-auto pr-1"
        >
          {numbers.map((n) => {
            const active = favorites.has(n)
            return (
              <li
                key={n}
                className={`flex items-center justify-between rounded-md py-0.5 pl-3 pr-0.5 ${
                  active ? 'bg-accent/10' : 'bg-base-800'
                }`}
              >
                <span className={`text-sm tabular-nums ${active ? 'text-white' : 'text-gray-400'}`}>
                  {n}
                </span>
                <FavoriteButton
                  variant="compact"
                  active={active}
                  activeLabel={`Remove episode ${n} from favorites`}
                  inactiveLabel={`Add episode ${n} to favorites`}
                  onClick={() => toggle(n)}
                />
              </li>
            )
          })}
        </ul>
      )}
    </Section>
  )
}
