import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { useDebouncedValue, useDialog } from '../../lib/hooks'
import { toastError } from '../../lib/toast'
import type { GachaGameCfg } from '@shared/gacha'
import CoverImage from '../CoverImage'
import GachaImageField from './GachaImageField'

// Pick a game's hero art (hub card + dashboard header). Fastest path: reuse a
// cover already imported into the games media section (RAWG art); otherwise
// pick a local file or paste a URL. Applying closes the dialog.
export default function GachaGameImageDialog({
  game,
  current,
  onClose
}: {
  game: GachaGameCfg
  current: string | null
  onClose: () => void
}) {
  const qc = useQueryClient()
  const panelRef = useDialog(onClose)
  const [search, setSearch] = useState(game.name)
  const debouncedSearch = useDebouncedValue(search)

  const filter = { mediaType: 'game' as const, search: debouncedSearch }
  const { data: matches = [] } = useQuery({
    queryKey: qk.media.list(filter),
    queryFn: () => api.media.list(filter)
  })
  const covers = matches.filter((m) => m.coverPath).slice(0, 8)

  async function apply(relPath: string | null): Promise<void> {
    try {
      await api.gacha.setGameImage(game.id, relPath)
      await qc.invalidateQueries({ queryKey: qk.gacha.all })
      onClose()
    } catch (e) {
      toastError(e)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Artwork for ${game.name}`}
        tabIndex={-1}
        className="card max-h-full w-full max-w-lg overflow-y-auto p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Artwork for {game.name}</h2>
          <button className="px-2 text-gray-500 hover:text-white" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="label">From your games library</label>
            <input
              className="input mb-2"
              placeholder="Search your games…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {covers.length === 0 ? (
              <p className="text-xs text-gray-500">
                No matching covers — import the game in the Games section, or use a file/URL below.
              </p>
            ) : (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {covers.map((m) => (
                  <button
                    key={m.id}
                    className="w-20 shrink-0 text-left"
                    title={`Use ${m.title}'s cover`}
                    onClick={() => apply(m.coverPath)}
                  >
                    <CoverImage
                      path={m.coverPath}
                      alt={m.title}
                      className="aspect-[3/4] w-full transition-opacity hover:opacity-80"
                    />
                    <p className="mt-1 truncate text-[11px] text-gray-400">{m.title}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          <GachaImageField value={current} onChange={apply} />
        </div>
      </div>
    </div>
  )
}
