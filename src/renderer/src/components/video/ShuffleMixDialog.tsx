import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import type { LinkedVideoTitle } from '@shared/types'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { toast, toastError } from '../../lib/toast'
import { showFromFiles, videoQueue } from '../../lib/videoQueue'
import Dialog from '../Dialog'
import { Field, Fieldset } from '../Field'

// Shuffle across several linked shows at once (a Seinfeld + Friends mix). It
// reads only the linked lists the Linked pages already cache; each chosen
// title's files are read when the user presses Start.
export default function ShuffleMixDialog({ onClose }: { onClose: () => void }): JSX.Element {
  const navigate = useNavigate()
  const tv = useQuery({ queryKey: qk.video.linked('tv'), queryFn: () => api.video.linked('tv') })
  const anime = useQuery({
    queryKey: qk.video.linked('anime'),
    queryFn: () => api.video.linked('anime')
  })
  const [chosen, setChosen] = useState<Set<number>>(new Set())
  const [filter, setFilter] = useState('')
  const [specials, setSpecials] = useState(false)
  const [busy, setBusy] = useState(false)

  const groups = useMemo(() => {
    const needle = filter.trim().toLocaleLowerCase()
    const pick = (rows: LinkedVideoTitle[] | undefined): LinkedVideoTitle[] =>
      (rows ?? [])
        .filter((t) => t.fileCount > 1 && t.title.toLocaleLowerCase().includes(needle))
        .sort((a, b) => a.title.localeCompare(b.title))
    return [
      { label: 'TV shows', rows: pick(tv.data) },
      { label: 'Anime', rows: pick(anime.data) }
    ]
  }, [anime.data, filter, tv.data])
  const titleOf = useMemo(() => {
    const map = new Map<number, string>()
    for (const t of [...(tv.data ?? []), ...(anime.data ?? [])]) map.set(t.mediaId, t.title)
    return map
  }, [anime.data, tv.data])

  const toggle = (id: number): void =>
    setChosen((cur) => {
      const next = new Set(cur)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const start = async (): Promise<void> => {
    setBusy(true)
    try {
      const ids = [...chosen]
      const libraries = await Promise.all(ids.map((id) => api.video.files(id)))
      // A show left with one playable file (one episode plus a special) would
      // repeat that file back to back, so it stays out of the mix.
      const shows = ids
        .map((id, i) => showFromFiles(id, titleOf.get(id) ?? '', libraries[i].files, specials))
        .filter((s) => s.files.length > 1)
      const item = videoQueue.start(shows)
      if (!item) {
        toast('None of those titles has two or more episodes to shuffle.', 'error')
        return
      }
      onClose()
      navigate(`/watch/file/${item.fileId}`)
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
    }
  }

  const loading = tv.isLoading || anime.isLoading
  const empty = !loading && groups.every((g) => g.rows.length === 0)

  return (
    <Dialog
      labelledBy="shuffle-mix-title"
      describedBy="shuffle-mix-help"
      onClose={onClose}
      panelClassName="flex max-h-[85vh] w-full max-w-lg flex-col rounded-lg bg-base-800 p-5 shadow-xl"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 id="shuffle-mix-title" className="text-lg font-semibold">
            Shuffle mix
          </h2>
          <p id="shuffle-mix-help" className="text-sm text-gray-400">
            Pick the shows to mix. Each one gets an equal share, and no episode repeats until its
            show has played through.
          </p>
        </div>
        <button type="button" className="btn-ghost px-2" aria-label="Close" onClick={onClose}>
          ✕
        </button>
      </div>

      <Field label="Filter shows" hiddenLabel className="mb-3 block">
        <input
          type="search"
          className="input w-full"
          placeholder="Filter shows"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </Field>

      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        {loading && (
          <p className="text-sm text-gray-400" role="status">
            Loading linked shows…
          </p>
        )}
        {empty && (
          <p className="text-sm text-gray-400">
            {filter.trim()
              ? 'No linked show matches that filter.'
              : 'Link a show’s video folder first; titles with two or more files appear here.'}
          </p>
        )}
        {groups.map(
          (g) =>
            g.rows.length > 0 && (
              <Fieldset
                key={g.label}
                legend={g.label}
                className="mb-3"
                legendClassName="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400"
              >
                <ul className="space-y-1">
                  {g.rows.map((t) => (
                    <li key={t.mediaId}>
                      <label className="flex cursor-pointer items-center gap-2 rounded-md bg-base-700/50 px-3 py-1.5 text-sm hover:bg-base-700">
                        <input
                          type="checkbox"
                          checked={chosen.has(t.mediaId)}
                          onChange={() => toggle(t.mediaId)}
                        />
                        <span className="min-w-0 flex-1 truncate">{t.title}</span>
                        <span className="shrink-0 text-xs text-gray-400">{t.fileCount} files</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </Fieldset>
            )
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-base-700 pt-4">
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input type="checkbox" checked={specials} onChange={(e) => setSpecials(e.target.checked)} />
          Include specials
        </label>
        <span className="flex-1" />
        <button type="button" className="btn-ghost" onClick={onClose}>
          Cancel
        </button>
        <button
          type="button"
          className="btn-primary"
          disabled={chosen.size === 0 || busy}
          onClick={() => void start()}
        >
          {chosen.size > 1 ? `Shuffle ${chosen.size} shows` : 'Shuffle'}
        </button>
      </div>
    </Dialog>
  )
}
