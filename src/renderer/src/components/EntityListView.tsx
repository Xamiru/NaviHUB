import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { usePersistedState } from '../lib/navState'
import { useDebouncedValue, useIncrementalList } from '../lib/hooks'
import { qk, type EntityNamespace } from '../lib/queryKeys'
import CoverImage from './CoverImage'
import PageHeader from './PageHeader'
import PageStatus from './PageStatus'
import EmptyState from './EmptyState'
import type { CreditRole, MediaType } from '@shared/types'
import { Field } from './Field'

type Kind = 'person' | 'character'

interface Row {
  id: number
  name: string
  nameNative?: string | null
  imgPath: string | null
}

const SOURCE: Record<
  Kind,
  {
    list: (s?: string, role?: CreditRole, mediaType?: MediaType | MediaType[]) => Promise<Row[]>
    create: (name: string) => Promise<number>
    queryKey: EntityNamespace
  }
> = {
  person: {
    list: (s, role, mediaType) =>
      api.people.list(s, role, mediaType).then((rs) =>
        rs.map((r) => ({ id: r.id, name: r.name, nameNative: r.nameNative, imgPath: r.photoPath }))
      ),
    create: (name) => api.people.upsert({ name }),
    queryKey: 'people'
  },
  character: {
    list: (s) =>
      api.characters
        .list(s)
        .then((rs) =>
          rs.map((r) => ({ id: r.id, name: r.name, nameNative: r.nameNative, imgPath: r.imagePath }))
        ),
    create: (name) => api.characters.upsert({ name }),
    queryKey: 'characters'
  }
}

export default function EntityListView({
  kind,
  title,
  basePath,
  personRole,
  mediaType
}: {
  kind: Kind
  title: string
  basePath: string
  // For kind="person": limits the list to people with this credit role and
  // ranks them by how many they have (Voice Actors / Actors / Directors).
  personRole?: CreditRole
  // Scopes the list to one or more media types — e.g. movie Directors only, or
  // Actors shared across Movies + TV.
  mediaType?: MediaType | MediaType[]
}) {
  const qc = useQueryClient()
  const src = SOURCE[kind]
  const [search, setSearch] = usePersistedState('search', '')
  const [newName, setNewName] = useState('')
  // Debounce so typing doesn't refire the entity list query on every keystroke.
  const debouncedSearch = useDebouncedValue(search, 250)

  const { data: rows = [], isLoading } = useQuery({
    queryKey: qk.entity(src.queryKey).list(debouncedSearch, personRole ?? null, mediaType ?? null),
    queryFn: () => src.list(debouncedSearch.trim() || undefined, personRole, mediaType)
  })
  // A role like voice_actor matches thousands of people; mounting them all at
  // once froze the app. Reveal the grid in batches as the user scrolls instead.
  const { visible, sentinelRef, hasMore } = useIncrementalList(
    rows,
    96,
    `${kind}|${personRole ?? ''}|${mediaType ?? ''}|${debouncedSearch}`
  )

  async function add() {
    const name = newName.trim()
    if (!name) return
    await src.create(name)
    setNewName('')
    qc.invalidateQueries({ queryKey: qk.entity(src.queryKey).all })
  }

  return (
    <div className="mx-auto max-w-[1600px] p-4 sm:p-6">
      <PageHeader title={title} subtitle={`${rows.length} entries`} />

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Field label={`Search ${title.toLowerCase()}`} hiddenLabel className="contents">
          <input
            className="input max-w-xs"
            placeholder={`Search ${title.toLowerCase()}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Field>
        {/* A role-filtered list only shows people credited in that role, so a
            bare new name would never appear here; add people from a title. */}
        {!personRole && (
        <div className="flex gap-2 ml-auto">
          <Field label={`New ${kind} name`} hiddenLabel className="contents">
            <input
              className="input"
              placeholder="New name..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && add()}
            />
          </Field>
          <button className="btn-primary" onClick={add}>
            Add
          </button>
        </div>
        )}
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : rows.length === 0 ? (
        <EmptyState title="Nothing here yet" />
      ) : (
        <>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4">
            {visible.map((r) => (
            // The role rides along so the person page can lead with the section
            // that matches this list (Directors → crew first, Actors → roles).
            <Link
              key={r.id}
              to={personRole ? `${basePath}/${r.id}?role=${personRole}` : `${basePath}/${r.id}`}
              className="group rounded-lg p-2 text-center transition-colors"
            >
              <CoverImage
                path={r.imgPath}
                alt={r.name}
                thumbWidth={160}
                rounded="rounded-full"
                className="w-24 h-24 mx-auto"
              />
              <p className="mt-2 text-sm font-medium group-hover:text-accent line-clamp-2">
                {r.name}
              </p>
              {r.nameNative && (
                <p className="text-xs text-gray-500 line-clamp-1">{r.nameNative}</p>
              )}
            </Link>
            ))}
          </div>
          <div ref={sentinelRef} />
          {hasMore && (
            <p className="mt-4 text-center text-xs text-gray-400">
              Showing {visible.length} of {rows.length} / scroll for more
            </p>
          )}
        </>
      )}
    </div>
  )
}
