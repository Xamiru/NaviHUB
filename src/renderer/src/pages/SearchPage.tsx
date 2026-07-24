import { Link, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import CoverImage from '../components/CoverImage'
import { pathForMedia } from '../lib/mediaConfig'
import type { GlobalSearchResults } from '@shared/types'

export default function SearchPage() {
  const [params] = useSearchParams()
  const q = params.get('q') ?? ''

  const { data, isLoading } = useQuery({
    queryKey: qk.search(q),
    queryFn: () => api.search.global(q),
    enabled: q.trim().length > 0
  })

  const total = data
    ? data.media.length + data.people.length + data.companies.length + data.characters.length
    : 0

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <h1 className="text-2xl font-bold mb-1">Search</h1>
      <p className="text-sm text-gray-500 mb-6">
        {q ? (
          <>
            {isLoading ? 'Searching' : total} {!isLoading && 'results'} for “{q}”
          </>
        ) : (
          'Type in the bar above to search everything.'
        )}
      </p>

      {data && total === 0 && !isLoading && <p className="text-gray-400">No matches.</p>}

      {data && (
        <div className="space-y-8">
          <MediaGroup data={data} />
          <PeopleGroup data={data} />
          <CompanyGroup data={data} />
          <CharacterGroup data={data} />
        </div>
      )}
    </div>
  )
}

function GroupTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
      {children}
    </h2>
  )
}

function MediaGroup({ data }: { data: GlobalSearchResults }) {
  if (!data.media.length) return null
  return (
    <section>
      <GroupTitle>Titles · {data.media.length}</GroupTitle>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4">
        {data.media.map((m) => (
          <Link key={m.id} to={pathForMedia(m)} className="group">
            <div className="aspect-[2/3] rounded-lg overflow-hidden">
              <CoverImage
                path={m.coverPath}
                alt={m.title}
                rounded="rounded-lg"
                className="h-full w-full transition-transform group-hover:scale-105"
              />
            </div>
            <p className="mt-2 text-sm font-medium line-clamp-2 group-hover:text-accent">
              {m.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}

function PeopleGroup({ data }: { data: GlobalSearchResults }) {
  if (!data.people.length) return null
  return (
    <section>
      <GroupTitle>Voice Actors & Staff · {data.people.length}</GroupTitle>
      <Avatars
        items={data.people.map((p) => ({
          id: p.id,
          name: p.name,
          img: p.photoPath,
          to: `/people/${p.id}`
        }))}
      />
    </section>
  )
}

function CharacterGroup({ data }: { data: GlobalSearchResults }) {
  if (!data.characters.length) return null
  return (
    <section>
      <GroupTitle>Characters · {data.characters.length}</GroupTitle>
      <Avatars
        items={data.characters.map((c) => ({
          id: c.id,
          name: c.name,
          img: c.imagePath,
          to: `/characters/${c.id}`
        }))}
      />
    </section>
  )
}

function CompanyGroup({ data }: { data: GlobalSearchResults }) {
  if (!data.companies.length) return null
  return (
    <section>
      <GroupTitle>Studios · {data.companies.length}</GroupTitle>
      <div className="flex flex-wrap gap-2">
        {data.companies.map((c) => (
          <Link key={c.id} to={`/studios/${c.id}`} className="chip hover:text-accent">
            {c.name}
          </Link>
        ))}
      </div>
    </section>
  )
}

function Avatars({
  items
}: {
  items: { id: number; name: string; img: string | null; to: string }[]
}) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4">
      {items.map((it) => (
        <Link key={it.id} to={it.to} className="group text-center">
          <CoverImage
            path={it.img}
            alt={it.name}
            rounded="rounded-full"
            className="w-20 h-20 mx-auto"
          />
          <p className="mt-2 text-sm font-medium group-hover:text-accent line-clamp-2">{it.name}</p>
        </Link>
      ))}
    </div>
  )
}
