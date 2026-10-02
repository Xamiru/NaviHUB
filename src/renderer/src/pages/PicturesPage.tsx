import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { MEDIA_CONFIGS } from '../lib/mediaConfig'
import { toast, toastError } from '../lib/toast'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import EmptyState from '../components/EmptyState'
import ThemedFailure from '../components/theme/ThemedFailure'
import { Field } from '../components/Field'
import UniversalPicker from '../components/UniversalPicker'
import PictureBrowser from '../components/pictures/PictureBrowser'
import PictureAddDialog from '../components/pictures/PictureAddDialog'
import type {
  ImageKind,
  MediaType,
  PictureGalleryFilter,
  PictureOrientation,
  PictureSort,
  SlideshowSource
} from '@shared/types'

// Every wallpaper and fan-art image in one place, across titles and Unsorted.
// Filters live in the history entry; the sort is remembered across visits.

const SORT_KEY = 'pictures.sort'
const SORTS: { value: PictureSort; label: string }[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'title', label: 'By title' }
]

function loadSort(): PictureSort {
  try {
    const saved = localStorage.getItem(SORT_KEY)
    return SORTS.some((s) => s.value === saved) ? (saved as PictureSort) : 'newest'
  } catch {
    return 'newest'
  }
}

function saveSort(sort: PictureSort): void {
  try {
    localStorage.setItem(SORT_KEY, sort)
  } catch {
    // A preference only; the page works without it.
  }
}

interface Filters {
  // 'unsorted' is the title-less bucket; a type narrows to that media type.
  scope: MediaType | 'unsorted' | 'all'
  mediaId: number | null
  mediaTitle: string | null
  kind: ImageKind | null
  favorites: boolean
  inSlideshow: boolean
  orientation: PictureOrientation | null
  tagIds: number[]
}

const NO_FILTERS: Filters = {
  scope: 'all',
  mediaId: null,
  mediaTitle: null,
  kind: null,
  favorites: false,
  inSlideshow: false,
  orientation: null,
  tagIds: []
}

export default function PicturesPage(): React.JSX.Element {
  const qc = useQueryClient()
  const [filters, setFilters] = usePersistedState<Filters>('pictures.filters', NO_FILTERS)
  const [sort, setSortState] = usePersistedState<PictureSort>('pictures.sort', loadSort())
  const [adding, setAdding] = useState(false)
  const set = (patch: Partial<Filters>): void => setFilters({ ...filters, ...patch })
  const setSort = (next: PictureSort): void => {
    setSortState(next)
    saveSort(next)
  }

  const query: PictureGalleryFilter = {
    unsorted: filters.scope === 'unsorted',
    mediaType: filters.scope !== 'all' && filters.scope !== 'unsorted' ? filters.scope : null,
    mediaId: filters.mediaId,
    kind: filters.kind,
    favorites: filters.favorites,
    inSlideshow: filters.inSlideshow,
    orientation: filters.orientation,
    tagIds: filters.tagIds,
    sort
  }
  const gallery = useQuery({
    queryKey: qk.pictures.gallery(query),
    queryFn: () => api.pictures.gallery(query),
    placeholderData: (previous) => previous
  })
  const tagsQuery = useQuery({
    queryKey: qk.pictures.tags,
    queryFn: () => api.pictures.tags()
  })
  const tags = tagsQuery.data ?? []
  // Untagging an image's last use deletes the tag; its filter would otherwise stay on, unseen.
  useEffect(() => {
    if (!tagsQuery.data) return
    const live = new Set(tagsQuery.data.map((t) => t.id))
    if (filters.tagIds.some((id) => !live.has(id))) {
      setFilters({ ...filters, tagIds: filters.tagIds.filter((id) => live.has(id)) })
    }
  }, [tagsQuery.data, filters, setFilters])
  const { data: albums = [] } = useQuery({
    queryKey: qk.pictures.albums,
    queryFn: () => api.pictures.albums()
  })
  const { data: source = 'manual' } = useQuery({
    queryKey: qk.pictures.slideshowSource,
    queryFn: () => api.pictures.slideshowSource()
  })

  const filtered = JSON.stringify(filters) !== JSON.stringify(NO_FILTERS)
  const images = gallery.data ?? []

  async function changeSource(next: SlideshowSource): Promise<void> {
    try {
      const r = await api.pictures.setSlideshowSource(next)
      const parts = [
        r.added && `${r.added} added`,
        r.removed && `${r.removed} removed`,
        r.failed && `${r.failed} could not be copied`
      ].filter(Boolean)
      toast(
        next === 'manual'
          ? 'The slideshow folder is back to manual picks'
          : `Slideshow folder synced${parts.length ? `: ${parts.join(', ')}` : ''}`,
        r.failed ? 'error' : 'success'
      )
    } catch (e) {
      toastError(e)
    } finally {
      void qc.invalidateQueries({ queryKey: qk.pictures.all })
    }
  }

  return (
    <div className="mx-auto max-w-[1760px] p-5 sm:p-6 xl:p-8">
      <PageHeader
        title="Pictures"
        subtitle="Wallpapers and fan art from every title"
        actions={
          <>
            <Field label="Slideshow folder" className="flex items-center gap-2">
              <select
                className="input w-auto"
                value={source}
                onChange={(e) => void changeSource(e.target.value as SlideshowSource)}
              >
                <option value="manual">Manual picks</option>
                <option value="favorites">Favorites</option>
                {albums.map((a) => (
                  <option key={a.id} value={`album:${a.id}`}>
                    Album: {a.name}
                  </option>
                ))}
              </select>
            </Field>
            <button className="btn-ghost" onClick={() => void api.pictures.openSlideshowFolder()}>
              Open folder
            </button>
            {/* An empty gallery offers Add in its empty state instead. */}
            {(images.length > 0 || filtered) && (
              <button className="btn-primary" onClick={() => setAdding(true)}>
                Add pictures
              </button>
            )}
          </>
        }
      />

      <div className="mb-4 flex flex-wrap items-end gap-3">
        <Field label="Section">
          <select
            className="input mt-1 w-auto"
            value={filters.scope}
            onChange={(e) =>
              set({ scope: e.target.value as Filters['scope'], mediaId: null, mediaTitle: null })
            }
          >
            <option value="all">Everything</option>
            {MEDIA_CONFIGS.map((cfg) => (
              <option key={cfg.key} value={cfg.key}>
                {cfg.plural}
              </option>
            ))}
            <option value="unsorted">Unsorted</option>
          </select>
        </Field>
        {filters.scope !== 'unsorted' && (
          <div>
            <p className="label">Title</p>
            {filters.mediaId != null ? (
              <span className="chip mt-1 inline-flex items-center gap-1">
                {filters.mediaTitle}
                <button
                  className="text-gray-400 hover:text-white"
                  onClick={() => set({ mediaId: null, mediaTitle: null })}
                  aria-label="Clear title filter"
                  title="Clear title filter"
                >
                  ✕
                </button>
              </span>
            ) : (
              <div className="mt-1 w-64">
                <UniversalPicker
                  kind="media"
                  placeholder="Any title"
                  mediaTypes={
                    filters.scope !== 'all' ? [filters.scope as MediaType] : undefined
                  }
                  onPick={(p) => set({ mediaId: p.entityId, mediaTitle: p.name })}
                />
              </div>
            )}
          </div>
        )}
        <Field label="Kind">
          <select
            className="input mt-1 w-auto"
            value={filters.kind ?? ''}
            onChange={(e) => set({ kind: (e.target.value || null) as ImageKind | null })}
          >
            <option value="">Wallpapers and fan art</option>
            <option value="wallpaper">Wallpapers</option>
            <option value="fanart">Fan art</option>
          </select>
        </Field>
        <Field label="Shape">
          <select
            className="input mt-1 w-auto"
            value={filters.orientation ?? ''}
            onChange={(e) =>
              set({ orientation: (e.target.value || null) as PictureOrientation | null })
            }
          >
            <option value="">Any shape</option>
            <option value="landscape">Landscape</option>
            <option value="portrait">Portrait</option>
            <option value="square">Square</option>
          </select>
        </Field>
        <Field label="Sort">
          <select
            className="input mt-1 w-auto"
            value={sort}
            onChange={(e) => setSort(e.target.value as PictureSort)}
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>
        <div className="flex gap-2">
          <button
            className={`pill ${filters.favorites ? 'pill-active' : ''}`}
            aria-pressed={filters.favorites}
            onClick={() => set({ favorites: !filters.favorites })}
          >
            Favorites
          </button>
          <button
            className={`pill ${filters.inSlideshow ? 'pill-active' : ''}`}
            aria-pressed={filters.inSlideshow}
            onClick={() => set({ inSlideshow: !filters.inSlideshow })}
          >
            In slideshow
          </button>
          {filtered && (
            <button className="btn-ghost text-sm" onClick={() => setFilters(NO_FILTERS)}>
              Clear filters
            </button>
          )}
        </div>
      </div>

      {tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5" role="group" aria-label="Tags">
          {tags.map((t) => {
            const on = filters.tagIds.includes(t.id)
            return (
              <button
                key={t.id}
                className={`chip-toggle ${on ? 'chip-toggle-active' : ''}`}
                aria-pressed={on}
                onClick={() =>
                  set({
                    tagIds: on ? filters.tagIds.filter((id) => id !== t.id) : [...filters.tagIds, t.id]
                  })
                }
              >
                {t.name} <span className="text-gray-500">{t.count}</span>
              </button>
            )
          })}
        </div>
      )}

      {gallery.isError ? (
        <ThemedFailure
          message="Could not load your pictures."
          onRetry={() => void gallery.refetch()}
        />
      ) : gallery.isPending ? (
        <PageStatus>Loading pictures…</PageStatus>
      ) : images.length === 0 ? (
        filtered ? (
          <EmptyState
            title="No pictures match these filters"
            action={
              <button className="btn-ghost" onClick={() => setFilters(NO_FILTERS)}>
                Clear filters
              </button>
            }
          />
        ) : (
          <EmptyState
            title="No pictures yet"
            body="Add wallpapers and fan art here, or from a title's Art tab."
            action={
              <button className="btn-primary" onClick={() => setAdding(true)}>
                Add pictures
              </button>
            }
          />
        )
      ) : (
        <PictureBrowser images={images} />
      )}

      {adding && <PictureAddDialog onClose={() => setAdding(false)} />}
    </div>
  )
}
