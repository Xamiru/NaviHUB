import { useId, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { toast, toastError } from '../../lib/toast'
import Dialog from '../Dialog'
import { Field } from '../Field'
import ImageBrowseDialog from '../ImageBrowseDialog'
import UniversalPicker, { type PickedEntity } from '../UniversalPicker'
import type { ImageKind } from '@shared/types'

// Adding art from the gallery, without visiting the title first: pick a title
// or Unsorted and a kind, then the same three sources as the Art tab. Browse
// for Unsorted offers only the free-text sources (pictures.listSources).
export default function PictureAddDialog({ onClose }: { onClose: () => void }): React.JSX.Element {
  const qc = useQueryClient()
  const titleId = useId()
  const [target, setTarget] = useState<PickedEntity | 'unsorted' | null>(null)
  const [kind, setKind] = useState<ImageKind>('wallpaper')
  const [url, setUrl] = useState('')
  const [busy, setBusy] = useState(false)
  const [browsing, setBrowsing] = useState(false)
  const mediaId = target && target !== 'unsorted' ? target.entityId : null
  const targetName = target === 'unsorted' ? 'Unsorted' : (target?.name ?? '')

  // Danbooru's character shortcuts come from the title's cast.
  const { data: detail } = useQuery({
    queryKey: qk.media.detail(mediaId ?? 0),
    queryFn: () => api.media.get(mediaId as number),
    enabled: mediaId != null
  })

  async function run(fn: () => Promise<string | null>): Promise<void> {
    setBusy(true)
    try {
      const message = await fn()
      if (message) toast(message, 'success')
      void qc.invalidateQueries({ queryKey: qk.pictures.all })
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
    }
  }

  if (browsing && target) {
    return (
      <ImageBrowseDialog
        m={{ id: mediaId, title: targetName, characters: detail?.characters ?? [] }}
        kind={kind}
        onClose={() => setBrowsing(false)}
      />
    )
  }

  return (
    <Dialog labelledBy={titleId} onClose={onClose} panelClassName="card w-full max-w-lg p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 id={titleId} className="text-lg font-bold">
          Add pictures
        </h2>
        <button className="btn-ghost px-2" onClick={onClose} aria-label="Close" title="Close">
          ✕
        </button>
      </div>

      <p className="label mb-1">Title</p>
      {target ? (
        <div className="mb-4 flex items-center justify-between rounded bg-base-800 px-3 py-2">
          <span className="truncate">{targetName}</span>
          <button className="btn-ghost text-xs" onClick={() => setTarget(null)}>
            Change
          </button>
        </div>
      ) : (
        <div className="mb-4 space-y-2">
          <UniversalPicker kind="media" placeholder="Search a title…" onPick={setTarget} autoFocus />
          <button className="btn-ghost text-sm" onClick={() => setTarget('unsorted')}>
            Unsorted (no title)
          </button>
        </div>
      )}

      <div className="mb-5 flex gap-2" role="group" aria-label="Kind">
        {(['wallpaper', 'fanart'] as const).map((k) => (
          <button
            key={k}
            className={`pill ${kind === k ? 'pill-active' : ''}`}
            aria-pressed={kind === k}
            onClick={() => setKind(k)}
          >
            {k === 'wallpaper' ? 'Wallpaper' : 'Fan art'}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <button className="btn-ghost" disabled={!target || busy} onClick={() => setBrowsing(true)}>
            Browse…
          </button>
          <button
            className="btn-ghost"
            disabled={!target || busy}
            onClick={() =>
              run(async () => {
                const added = await api.pictures.addFromFiles(mediaId, kind)
                return added.length
                  ? `Added ${added.length} image${added.length === 1 ? '' : 's'}`
                  : null
              })
            }
          >
            + Add files
          </button>
        </div>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            if (!target || !url.trim()) return
            void run(async () => {
              await api.pictures.addFromUrl(mediaId, kind, url.trim())
              setUrl('')
              return 'Image added'
            })
          }}
        >
          <Field label="Image URL" hiddenLabel className="contents">
            <input
              className="input flex-1"
              placeholder="https://… image link"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={!target}
            />
          </Field>
          <button className="btn-primary" type="submit" disabled={!target || busy || !url.trim()}>
            Add
          </button>
        </form>
      </div>
    </Dialog>
  )
}
