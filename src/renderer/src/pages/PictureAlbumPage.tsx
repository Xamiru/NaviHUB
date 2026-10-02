import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useLeaveDeleted } from '../lib/navState'
import { confirmDialog } from '../lib/confirm'
import { toastError } from '../lib/toast'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import EmptyState from '../components/EmptyState'
import ThemedFailure from '../components/theme/ThemedFailure'
import ActionMenu from '../components/ActionMenu'
import CoverImage from '../components/CoverImage'
import { Field } from '../components/Field'
import { SortableList, SortableRow, useOptimisticReorder } from '../components/SortableList'
import PictureBrowser from '../components/pictures/PictureBrowser'

// One picture album: its images in the album's own order, a Reorder mode on
// the shared sortable list, and rename/delete.
export default function PictureAlbumPage(): React.JSX.Element {
  const albumId = Number(useParams().id)
  const qc = useQueryClient()
  const leaveDeleted = useLeaveDeleted()
  const [reordering, setReordering] = useState(false)
  const [renaming, setRenaming] = useState<string | null>(null)

  const album = useQuery({
    queryKey: qk.pictures.album(albumId),
    queryFn: () => api.pictures.album(albumId)
  })
  const filter = { albumId }
  const gallery = useQuery({
    queryKey: qk.pictures.gallery(filter),
    queryFn: () => api.pictures.gallery(filter)
  })
  const images = gallery.data ?? []

  const seed = useMemo(() => gallery.data?.map((img) => ({ itemId: img.id, img })), [gallery.data])
  const { items, sensors, onDragEnd } = useOptimisticReorder(
    seed,
    (next) =>
      api.pictures.albumReorder(
        albumId,
        next.map((i) => i.itemId)
      ),
    () => void qc.invalidateQueries({ queryKey: qk.pictures.all })
  )

  async function rename(): Promise<void> {
    if (!renaming?.trim()) return
    try {
      await api.pictures.albumRename(albumId, renaming)
      setRenaming(null)
      void qc.invalidateQueries({ queryKey: qk.pictures.all })
    } catch (e) {
      toastError(e)
    }
  }

  async function remove(): Promise<void> {
    const ok = await confirmDialog(
      'Delete this album? Its pictures stay in the gallery; only the album goes.',
      { confirmLabel: 'Delete album', danger: true }
    )
    if (!ok) return
    await api.pictures.albumDelete(albumId)
    void qc.invalidateQueries({ queryKey: qk.pictures.all })
    leaveDeleted((path) => path === `/pictures/albums/${albumId}`, '/pictures/albums')
  }

  if (album.isError) {
    return (
      <div className="p-8">
        <ThemedFailure message="Could not load this album." onRetry={() => void album.refetch()} />
      </div>
    )
  }
  if (!album.data) return <PageStatus>Loading album…</PageStatus>

  return (
    <div className="mx-auto max-w-[1760px] p-5 sm:p-6 xl:p-8">
      <PageHeader
        back={{ to: '/pictures/albums', label: 'Albums' }}
        title={
          renaming != null ? (
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault()
                void rename()
              }}
            >
              <Field label="Album name" hiddenLabel className="contents">
                <input
                  className="input text-lg"
                  value={renaming}
                  autoFocus
                  onChange={(e) => setRenaming(e.target.value)}
                  onKeyDown={(e) => e.key === 'Escape' && setRenaming(null)}
                />
              </Field>
              <button className="btn-primary text-sm" type="submit" disabled={!renaming.trim()}>
                Save
              </button>
              <button className="btn-ghost text-sm" type="button" onClick={() => setRenaming(null)}>
                Cancel
              </button>
            </form>
          ) : (
            album.data.name
          )
        }
        actions={
          <ActionMenu
            items={[
              { label: 'Rename', onSelect: () => setRenaming(album.data.name) },
              { label: 'Delete album', danger: true, onSelect: remove }
            ]}
          />
        }
      />

      {gallery.isError ? (
        <ThemedFailure message="Could not load this album." onRetry={() => void gallery.refetch()} />
      ) : gallery.isPending ? (
        <PageStatus>Loading pictures…</PageStatus>
      ) : images.length === 0 ? (
        <EmptyState
          title="This album is empty"
          body="Right-click pictures in the gallery and choose Add to album."
        />
      ) : reordering ? (
        <>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-sm text-gray-400">
              Drag rows, or focus Move item and use Space, the Arrow keys, then Space.
            </span>
            <button className="btn-primary text-sm" onClick={() => setReordering(false)}>
              Done
            </button>
          </div>
          <SortableList
            ids={items.map((i) => i.itemId)}
            sensors={sensors}
            onDragEnd={onDragEnd}
            className="space-y-2"
          >
            {items.map(({ itemId, img }, i) => (
              <SortableRow key={itemId} id={itemId} className="card flex items-center gap-3 p-2">
                {(handle) => (
                  <>
                    {handle}
                    <span className="w-8 text-right text-xs text-gray-500">{i + 1}</span>
                    <CoverImage
                      path={img.filePath}
                      alt={img.mediaTitle ?? 'Unsorted'}
                      thumbWidth={160}
                      className="h-12 w-20 shrink-0"
                    />
                    <span className="min-w-0 flex-1 truncate">{img.mediaTitle ?? 'Unsorted'}</span>
                    <span className="text-xs text-gray-500">
                      {img.kind === 'wallpaper' ? 'Wallpaper' : 'Fan art'}
                    </span>
                  </>
                )}
              </SortableRow>
            ))}
          </SortableList>
        </>
      ) : (
        <PictureBrowser
          images={images}
          albumId={albumId}
          toolbar={
            images.length > 1 && (
              <button className="btn-ghost text-sm" onClick={() => setReordering(true)}>
                Reorder
              </button>
            )
          }
        />
      )}
    </div>
  )
}
