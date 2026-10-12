import { useEffect, useRef, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useDebouncedValue } from '../lib/hooks'
import { MEDIA_CONFIGS } from '../lib/mediaConfig'
import { toast, toastError } from '../lib/toast'
import PageHeader from '../components/PageHeader'
import ActionMenu from '../components/ActionMenu'
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
  PictureResolution,
  PictureSort,
  SlideshowSource
} from '@shared/types'

// Every wallpaper and fan-art image in one place, across titles and Unsorted.
// Filters live in the history entry; the sort is remembered across visits.

const SORT_KEY = 'pictures.sort'
const SORTS: { value: PictureSort; label: string }[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'title', label: 'By title' },
  { value: 'largest', label: 'Largest first' }
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
  resolution: PictureResolution | null
  search: string
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
  resolution: null,
  search: '',
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

  const search = useDebouncedValue(filters.search.trim())
  const query: PictureGalleryFilter = {
    unsorted: filters.scope === 'unsorted',
    mediaType: filters.scope !== 'all' && filters.scope !== 'unsorted' ? filters.scope : null,
    mediaId: filters.mediaId,
    kind: filters.kind,
    favorites: filters.favorites,
    inSlideshow: filters.inSlideshow,
    orientation: filters.orientation,
    resolution: filters.resolution,
    search,
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

  const sources: { value: SlideshowSource; label: string }[] = [
    { value: 'manual', label: 'Mirror manual picks' },
    { value: 'favorites', label: 'Mirror favorites' },
    ...albums.map((a) => ({ value: `album:${a.id}` as SlideshowSource, label: `Mirror album: ${a.name}` }))
  ]
  const filtered = JSON.stringify(filters) !== JSON.stringify(NO_FILTERS)
  const images = gallery.data ?? []

  // Files dropped on the page go to the filtered title (Unsorted otherwise),
  // as the filtered kind (wallpapers otherwise).
  const [dragging, setDragging] = useState(false)
  const dragDepth = useRef(0)
  const dropMediaId = filters.scope !== 'unsorted' ? filters.mediaId : null
  const dropTarget = dropMediaId != null ? (filters.mediaTitle ?? 'this title') : 'Unsorted'
  const dropKind: ImageKind = filters.kind ?? 'wallpaper'
  const carriesFiles = (e: React.DragEvent): boolean => Array.from(e.dataTransfer.types).includes('Files')

  async function addDropped(dropped: File[]): Promise<void> {
    const paths = dropped.map((f) => api.pictures.pathForFile(f)).filter(Boolean)
    if (paths.length === 0) return
    try {
      const { added, skipped } = await api.pictures.addFromPaths(dropMediaId, dropKind, paths)
      const notes = [
        added.length > 0 && `Added ${added.length} to ${dropTarget}`,
        skipped + dropped.length - paths.length > 0 &&
          `${skipped + dropped.length - paths.length} skipped (not an image file)`
      ].filter(Boolean)
      toast(notes.join('; ') || 'Nothing was added', added.length > 0 ? 'success' : 'error')
    } catch (e) {
      toastError(e)
    } finally {
      void qc.invalidateQueries({ queryKey: qk.pictures.all })
    }
  }

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
    <div
      className="relative mx-auto max-w-[1760px] p-5 sm:p-6 xl:p-8"
      onDragEnter={(e) => {
        if (!carriesFiles(e)) return
        e.preventDefault()
        dragDepth.current += 1
        setDragging(true)
      }}
      onDragOver={(e) => {
        if (!carriesFiles(e)) return
        // Without this the drop would navigate the window to the file.
        e.preventDefault()
        e.dataTransfer.dropEffect = 'copy'
      }}
      onDragLeave={(e) => {
        if (!carriesFiles(e)) return
        dragDepth.current = Math.max(0, dragDepth.current - 1)
        if (dragDepth.current === 0) setDragging(false)
      }}
      onDrop={(e) => {
        if (!carriesFiles(e)) return
        e.preventDefault()
        dragDepth.current = 0
        setDragging(false)
        void addDropped(Array.from(e.dataTransfer.files))
      }}
    >
      {dragging && (
        <div className="pointer-events-none absolute inset-2 z-40 flex items-center justify-center rounded-xl border-2 border-dashed border-accent bg-base-900/85">
          <p className="text-lg font-medium text-gray-100">
            Drop to add {dropKind === 'wallpaper' ? 'wallpapers' : 'fan art'} to {dropTarget}
          </p>
        </div>
      )}
      <PageHeader
        title="Gallery"
        subtitle="Wallpapers and fan art from every title"
        actions={
          <>
            {/* The desktop slideshow folder: which pictures it mirrors, and a
                way to open it. One menu, so the header keeps a single row. */}
            <ActionMenu
              label="Slideshow"
              items={[
                ...sources.map((option) => ({
                  label: `${option.value === source ? '✓ ' : ''}${option.label}`,
                  title: option.value === source ? 'The slideshow folder mirrors this now' : undefined,
                  onSelect: () => {
                    if (option.value !== source) void changeSource(option.value)
                  }
                })),
                { label: 'Open slideshow folder', onSelect: () => void api.pictures.openSlideshowFolder() }
              ]}
            />
            {/* An empty gallery offers Add in its empty state instead. */}
            {(images.length > 0 || filtered) && (
              <button className="btn-primary" onClick={() => setAdding(true)}>
                Add pictures
              </button>
            )}
          </>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Field label="Search pictures" hiddenLabel className="contents">
          <input
            type="search"
            className="input w-48 py-1.5 text-sm"
            placeholder="Title, tag, file…"
            value={filters.search}
            onChange={(e) => set({ search: e.target.value })}
          />
        </Field>
        {filters.scope !== 'unsorted' &&
          (filters.mediaId != null ? (
            <span className="chip inline-flex items-center gap-1">
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
            <div className="w-44">
              <UniversalPicker
                kind="media"
                placeholder="Filter by title…"
                mediaTypes={filters.scope !== 'all' ? [filters.scope as MediaType] : undefined}
                onPick={(p) => set({ mediaId: p.entityId, mediaTitle: p.name })}
              />
            </div>
          ))}
        <Field label="Section" hiddenLabel className="contents">
          <select
            className="input w-auto py-1.5 text-sm"
            value={filters.scope}
            onChange={(e) =>
              set({ scope: e.target.value as Filters['scope'], mediaId: null, mediaTitle: null })
            }
          >
            <option value="all">Every section</option>
            {MEDIA_CONFIGS.map((cfg) => (
              <option key={cfg.key} value={cfg.key}>
                {cfg.plural}
              </option>
            ))}
            <option value="unsorted">Unsorted</option>
          </select>
        </Field>
        <span className="h-6 w-px bg-base-700" aria-hidden="true" />
        <PillChoice
          label="Kind"
          value={filters.kind}
          options={[
            ['wallpaper', 'Wallpapers'],
            ['fanart', 'Fan art']
          ]}
          onChange={(kind) => set({ kind })}
        />
        <span className="h-6 w-px bg-base-700" aria-hidden="true" />
        <PillChoice
          label="Shape"
          value={filters.orientation}
          options={[
            ['landscape', 'Landscape'],
            ['portrait', 'Portrait'],
            ['square', 'Square']
          ]}
          onChange={(orientation) => set({ orientation })}
        />
        <span className="h-6 w-px bg-base-700" aria-hidden="true" />
        <PillChoice
          label="Resolution"
          value={filters.resolution}
          options={[
            ['fhd', '1080p+'],
            ['qhd', '1440p+'],
            ['uhd', '4K+'],
            ['low', 'Under 1080p']
          ]}
          onChange={(resolution) => set({ resolution })}
        />
        <span className="h-6 w-px bg-base-700" aria-hidden="true" />
        <button
          className={`pill !px-2.5 !py-1 !text-xs ${filters.favorites ? 'pill-active' : ''}`}
          aria-pressed={filters.favorites}
          onClick={() => set({ favorites: !filters.favorites })}
        >
          Favorites
        </button>
        <button
          className={`pill !px-2.5 !py-1 !text-xs ${filters.inSlideshow ? 'pill-active' : ''}`}
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
        <Field label="Sort" hiddenLabel className="contents">
          <select
            className="input ml-auto w-auto py-1.5 text-sm"
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

// A single-select pill row: picking the active pill again clears the filter.
function PillChoice<T extends string>({
  label,
  value,
  options,
  onChange
}: {
  label: string
  value: T | null
  options: [T, string][]
  onChange: (value: T | null) => void
}) {
  return (
    <div className="flex flex-wrap gap-1.5" role="group" aria-label={label}>
      {options.map(([v, text]) => (
        <button
          key={text}
          className={`pill !px-2.5 !py-1 !text-xs ${value === v ? 'pill-active' : ''}`}
          aria-pressed={value === v}
          onClick={() => onChange(value === v ? null : v)}
        >
          {text}
        </button>
      ))}
    </div>
  )
}
