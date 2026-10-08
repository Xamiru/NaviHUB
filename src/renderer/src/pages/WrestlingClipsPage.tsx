import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useDebouncedValue } from '../lib/hooks'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import EmptyState from '../components/EmptyState'
import EditorialDetailFrame from '../components/EditorialDetailFrame'
import { Field } from '../components/Field'
import { Group, Pill } from '../components/PillGroup'
import {
  CLIP_KINDS,
  CLIP_KIND_PLURAL,
  ClipCard,
  ClipDialog
} from '../components/wrestling/WrestlingClips'
import type { WrestlingClip, WrestlingClipKind } from '@shared/types'

const PAGE = 96

// The wrestling clip shelf: highlights, promos, interviews and documentaries
// the user keeps under the Wrestling folder, filed by hand.
export default function WrestlingClipsPage(): JSX.Element {
  const [params] = useSearchParams()
  const highlighted = Number(params.get('clip')) || null
  const [kind, setKind] = usePersistedState<WrestlingClipKind | null>('wrestling.clipKind', null)
  const [tag, setTag] = usePersistedState<string | null>('wrestling.clipTag', null)
  const [favorite, setFavorite] = usePersistedState('wrestling.clipFavorite', false)
  const [search, setSearch] = usePersistedState('wrestling.clipSearch', '')
  const debounced = useDebouncedValue(search, 200)
  const [editing, setEditing] = useState<WrestlingClip | null | 'new'>(null)

  // Arriving from a list entry shows every clip, so the highlighted one is on screen.
  const filtered = !highlighted
  const filter = useMemo(
    () =>
      filtered
        ? { kind, tag, favorite, search: debounced.trim() || undefined }
        : {},
    [filtered, kind, tag, favorite, debounced]
  )
  const query = useInfiniteQuery({
    queryKey: qk.wrestling.clips(filter),
    queryFn: ({ pageParam }) => api.wrestling.clips({ ...filter, limit: PAGE, offset: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (last, pages) => (last.length === PAGE ? pages.length * PAGE : undefined)
  })
  const tags = useQuery({ queryKey: qk.wrestling.clipTags, queryFn: () => api.wrestling.clipTags() })
  const clips = query.data?.pages.flat() ?? []
  const anyFilter = filtered && (kind != null || tag != null || favorite || !!debounced.trim())

  // An older clip may sit past the first page: keep loading until it arrives.
  const highlightLoaded = highlighted != null && clips.some((c) => c.id === highlighted)
  const { hasNextPage, isFetchingNextPage, fetchNextPage } = query
  useEffect(() => {
    if (!highlighted || highlightLoaded || !hasNextPage || isFetchingNextPage) return
    void fetchNextPage()
  }, [highlighted, highlightLoaded, hasNextPage, isFetchingNextPage, fetchNextPage])

  useEffect(() => {
    if (!highlightLoaded) return
    document.getElementById(`clip-${highlighted}`)?.scrollIntoView({ block: 'center' })
  }, [highlighted, highlightLoaded])

  return (
    <EditorialDetailFrame width="wide">
      <PageHeader
        back={{ to: '/wrestling', label: 'Wrestling' }}
        title="Clips"
        subtitle="Highlights, promos, interviews and documentaries from your Wrestling folder. Files stay where you put them."
        actions={
          <button className="btn-primary" onClick={() => setEditing('new')}>
            Add clip
          </button>
        }
      />

      {filtered && (
        <div className="mb-6 flex flex-col gap-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Group label="Type">
              <Pill active={kind == null} onClick={() => setKind(null)} label="All" />
              {CLIP_KINDS.map((k) => (
                <Pill key={k} active={kind === k} onClick={() => setKind(k)} label={CLIP_KIND_PLURAL[k]} />
              ))}
              <Pill active={favorite} onClick={() => setFavorite(!favorite)} label="Favorites" />
            </Group>
            <Field label="Search clips" hiddenLabel className="w-full max-w-xs">
              <input
                className="input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search titles, notes and tags"
              />
            </Field>
          </div>
          {(tags.data?.length ?? 0) > 0 && (
            <Group label="Tags">
              <Pill active={tag == null} onClick={() => setTag(null)} label="Any tag" />
              {tags.data!.map((t) => (
                <Pill
                  key={t.tag}
                  active={tag === t.tag}
                  onClick={() => setTag(tag === t.tag ? null : t.tag)}
                  label={`${t.tag} (${t.count})`}
                />
              ))}
            </Group>
          )}
        </div>
      )}

      {query.isError && <PageStatus>Could not load your clips.</PageStatus>}
      {query.isSuccess && clips.length === 0 && (
        anyFilter ? (
          <p className="py-8 text-sm text-gray-400">No clips match these filters.</p>
        ) : (
          <EmptyState
            title="No clips yet"
            body="Add a highlight, promo, interview or documentary from your Wrestling folder and link it to wrestlers, events, matches or promotions."
          />
        )
      )}
      {clips.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
          {clips.map((c) => (
            <ClipCard key={c.id} clip={c} onEdit={setEditing} highlighted={c.id === highlighted} />
          ))}
        </div>
      )}
      {query.hasNextPage && (
        <button
          className="btn-ghost mt-5"
          disabled={query.isFetchingNextPage}
          onClick={() => query.fetchNextPage()}
        >
          {query.isFetchingNextPage ? 'Loading more...' : 'Load more clips'}
        </button>
      )}

      {editing && (
        <ClipDialog clip={editing === 'new' ? null : editing} onClose={() => setEditing(null)} />
      )}
    </EditorialDetailFrame>
  )
}
