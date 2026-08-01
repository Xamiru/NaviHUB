import { Link, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import CoverImage from '../components/CoverImage'
import PageHeader from '../components/PageHeader'
import Section from '../components/Section'
import EmptyState from '../components/EmptyState'
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
      <PageHeader
        title="Search"
        subtitle={
          q ? (
            <>
              {isLoading ? 'Searching…' : `${total} results`} for “{q}”
            </>
          ) : (
            'Results from your library: titles, people, characters, studios.'
          )
        }
      />

      {data && total === 0 && !isLoading && (
        <EmptyState title="No matches" body={<>Nothing in the library matches “{q}”.</>} />
      )}

      {data && (
        <div>
          <MediaGroup data={data} />
          <PeopleGroup data={data} />
          <CompanyGroup data={data} />
          <CharacterGroup data={data} />
        </div>
      )}
    </div>
  )
}

function MediaGroup({ data }: { data: GlobalSearchResults }) {
  if (!data.media.length) return null
  return (
    <Section title={`Titles · ${data.media.length}`}>
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
    </Section>
  )
}

function PeopleGroup({ data }: { data: GlobalSearchResults }) {
  if (!data.people.length) return null
  return (
    <Section title={`People · ${data.people.length}`}>
      <Avatars
        items={data.people.map((p) => ({
          id: p.id,
          name: p.name,
          img: p.photoPath,
          to: `/people/${p.id}`
        }))}
      />
    </Section>
  )
}

function CharacterGroup({ data }: { data: GlobalSearchResults }) {
  if (!data.characters.length) return null
  return (
    <Section title={`Characters · ${data.characters.length}`}>
      <Avatars
        items={data.characters.map((c) => ({
          id: c.id,
          name: c.name,
          img: c.imagePath,
          to: `/characters/${c.id}`
        }))}
      />
    </Section>
  )
}

function CompanyGroup({ data }: { data: GlobalSearchResults }) {
  if (!data.companies.length) return null
  return (
    <Section title={`Studios · ${data.companies.length}`}>
      <div className="flex flex-wrap gap-2">
        {data.companies.map((c) => (
          <Link key={c.id} to={`/studios/${c.id}`} className="chip hover:text-accent">
            {c.name}
          </Link>
        ))}
      </div>
    </Section>
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
