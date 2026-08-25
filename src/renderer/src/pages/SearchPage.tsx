import { Link, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import CoverImage from '../components/CoverImage'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import PageStatus from '../components/PageStatus'
import ContextPanel, { ContextFact, ContextTrail } from '../components/ContextPanel'
import { pathForMedia } from '../lib/mediaConfig'
import {
  contextLensRoute,
  reconcileContextLensSelection,
  type ContextLensSelection
} from '../lib/contextLens'
import { mediaProgressDisplay } from '../lib/archiveDisplay'
import type {
  Character,
  Company,
  GlobalSearchResults,
  MediaItem,
  Person
} from '@shared/types'

export default function SearchPage() {
  const [params] = useSearchParams()
  const q = params.get('q') ?? ''
  const [selection, setSelection] = useState<ContextLensSelection | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: qk.search(q),
    queryFn: () => api.search.global(q),
    enabled: q.trim().length > 0
  })

  const selected = reconcileContextLensSelection(data, selection)
  const total = data
    ? data.media.length + data.people.length + data.companies.length + data.characters.length
    : 0

  return (
    <div className="mx-auto max-w-[1600px] p-4 sm:p-6">
      <PageHeader
        title="Search the archive"
        subtitle={
          q ? (
            <>
              {isLoading ? 'Searching…' : `${total} results`} for “{q}”. Focus a result to inspect
              its place in your library.
            </>
          ) : (
            'Titles, people, characters and studios share one relationship-aware index.'
          )
        }
      />

      {!q.trim() && (
        <EmptyState
          title="Search from the top bar"
          body="Look for a title, person, character or studio already in your local archive."
        />
      )}

      {isLoading && <PageStatus>Searching the local archive…</PageStatus>}

      {data && total === 0 && !isLoading && (
        <EmptyState title="No matches" body={<>Nothing in the library matches “{q}”.</>} />
      )}

      {data && total > 0 && (
        <div className="grid min-w-0 gap-7 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="min-w-0 space-y-8">
            <SearchGroup title="Titles" count={data.media.length}>
              {data.media.map((item) => (
                <SearchResultRow
                  key={item.id}
                  to={pathForMedia(item)}
                  title={item.title}
                  subtitle={[item.mediaType.replace('_', ' '), item.status].filter(Boolean).join(' · ')}
                  image={item.coverPath}
                  portrait={false}
                  selected={selected?.kind === 'media' && selected.id === item.id}
                  onSelect={() => setSelection({ kind: 'media', id: item.id })}
                />
              ))}
            </SearchGroup>

            <SearchGroup title="People" count={data.people.length}>
              {data.people.map((item) => (
                <SearchResultRow
                  key={item.id}
                  to={`/people/${item.id}`}
                  title={item.name}
                  subtitle={item.nameNative ?? 'Person'}
                  image={item.photoPath}
                  selected={selected?.kind === 'person' && selected.id === item.id}
                  onSelect={() => setSelection({ kind: 'person', id: item.id })}
                />
              ))}
            </SearchGroup>

            <SearchGroup title="Studios and companies" count={data.companies.length}>
              {data.companies.map((item) => (
                <SearchResultRow
                  key={item.id}
                  to={`/studios/${item.id}`}
                  title={item.name}
                  subtitle={item.type}
                  image={item.logoPath}
                  portrait={false}
                  selected={selected?.kind === 'company' && selected.id === item.id}
                  onSelect={() => setSelection({ kind: 'company', id: item.id })}
                />
              ))}
            </SearchGroup>

            <SearchGroup title="Characters" count={data.characters.length}>
              {data.characters.map((item) => (
                <SearchResultRow
                  key={item.id}
                  to={`/characters/${item.id}`}
                  title={item.name}
                  subtitle={item.nameNative ?? 'Character'}
                  image={item.imagePath}
                  selected={selected?.kind === 'character' && selected.id === item.id}
                  onSelect={() => setSelection({ kind: 'character', id: item.id })}
                />
              ))}
            </SearchGroup>
          </div>

          {selected && <SearchContextLens selection={selected} results={data} />}
        </div>
      )}
    </div>
  )
}

function SearchGroup({ title, count, children }: { title: string; count: number; children: ReactNode }) {
  if (count === 0) return null
  return (
    <section>
      <div className="mb-3 flex items-center gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-300">{title}</h2>
        <span className="h-px flex-1 bg-base-700" />
        <span className="text-xs tabular-nums text-gray-500">{count}</span>
      </div>
      <div className="card overflow-hidden p-0">{children}</div>
    </section>
  )
}

function SearchResultRow({
  to,
  title,
  subtitle,
  image,
  portrait = true,
  selected,
  onSelect
}: {
  to: string
  title: string
  subtitle: string
  image: string | null
  portrait?: boolean
  selected: boolean
  onSelect: () => void
}) {
  return (
    <Link
      to={to}
      onMouseEnter={onSelect}
      onFocus={onSelect}
      aria-current={selected ? 'true' : undefined}
      className={`group flex min-w-0 items-center gap-4 border-t border-base-700 px-4 py-3 first:border-t-0 ${
        selected ? 'bg-accent/10' : 'hover:bg-base-700/50'
      }`}
    >
      <CoverImage
        path={image}
        alt={title}
        rounded={portrait ? 'rounded-full' : 'rounded'}
        className={portrait ? 'h-12 w-12 shrink-0' : 'h-14 w-10 shrink-0'}
        thumbWidth={96}
      />
      <span className="min-w-0 flex-1">
        <span className={`block truncate text-sm font-medium ${selected ? 'text-accent' : ''}`}>
          {title}
        </span>
        <span className="mt-0.5 block truncate text-xs capitalize text-gray-500">{subtitle}</span>
      </span>
      <span className="text-gray-600 group-hover:text-accent" aria-hidden="true">
        ›
      </span>
    </Link>
  )
}

function SearchContextLens({ selection, results }: { selection: ContextLensSelection; results: GlobalSearchResults }) {
  if (selection.kind === 'media') {
    const item = results.media.find((candidate) => candidate.id === selection.id)
    return item ? <MediaLens item={item} /> : null
  }
  if (selection.kind === 'person') {
    const item = results.people.find((candidate) => candidate.id === selection.id)
    return item ? <PersonLens item={item} /> : null
  }
  if (selection.kind === 'company') {
    const item = results.companies.find((candidate) => candidate.id === selection.id)
    return item ? <CompanyLens item={item} /> : null
  }
  const item = results.characters.find((candidate) => candidate.id === selection.id)
  return item ? <CharacterLens item={item} /> : null
}

function MediaLens({ item }: { item: MediaItem }) {
  const { data } = useQuery({
    queryKey: qk.media.detail(item.id),
    queryFn: () => api.media.get(item.id)
  })
  const progress = mediaProgressDisplay(item)
  const selection = { kind: 'media' as const, id: item.id }
  return (
    <ContextPanel
      identity={`media-${item.id}`}
      title={item.title}
      subtitle={<span className="capitalize">{item.mediaType.replace('_', ' ')}</span>}
      image={
        <div className="relative h-48 overflow-hidden bg-base-700">
          <CoverImage path={data?.heroPath ?? item.coverPath} alt="" className="h-full w-full opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-base-800 via-transparent to-transparent" />
        </div>
      }
      footer={
        <Link className="btn-primary block w-full text-center" to={contextLensRoute(selection, item)}>
          Open title
        </Link>
      }
    >
      <ContextFact label="Progress">
        <div className="flex items-center justify-between gap-3">
          <span>{progress.label}</span>
          {progress.percent !== null && <span className="tabular-nums">{progress.percent}%</span>}
        </div>
        {progress.percent !== null && (
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-base-700">
            <div className="h-full bg-accent" style={{ width: `${progress.percent}%` }} />
          </div>
        )}
      </ContextFact>
      <ContextFact label="Relationships">
        {!data ? (
          <span className="text-gray-500">Loading relationships…</span>
        ) : (
          <ContextTrail>
            {data.companies.slice(0, 3).map((link) => (
              <Link key={link.id} to={`/studios/${link.company.id}`} className="hover:text-accent">
                {link.company.name}
              </Link>
            ))}
            {data.companies.length === 0 && data.characters.length === 0 && (
              <span className="text-gray-500">No linked people or companies yet.</span>
            )}
          </ContextTrail>
        )}
      </ContextFact>
      {data && data.characters.length > 0 && (
        <ContextFact label="Characters">
          <ContextTrail>
            {data.characters.slice(0, 4).map((entry) => (
              <Link key={entry.character.id} to={`/characters/${entry.character.id}`} className="hover:text-accent">
                {entry.character.name}
              </Link>
            ))}
          </ContextTrail>
        </ContextFact>
      )}
      {data && data.tags.length > 0 && (
        <ContextFact label="Tags">{data.tags.slice(0, 5).map((tag) => tag.name).join(' · ')}</ContextFact>
      )}
    </ContextPanel>
  )
}

function PersonLens({ item }: { item: Person }) {
  const { data: credits = [], isLoading } = useQuery({
    queryKey: qk.people.credits(item.id),
    queryFn: () => api.people.credits(item.id)
  })
  return (
    <ContextPanel
      identity={`person-${item.id}`}
      title={item.name}
      subtitle={item.nameNative ?? 'Person'}
      image={
        <div className="flex justify-center bg-base-900/50 p-6">
          <CoverImage path={item.photoPath} alt={item.name} rounded="rounded-full" className="h-32 w-32" />
        </div>
      }
      footer={
        <Link className="btn-primary block w-full text-center" to={`/people/${item.id}`}>
          Open chronology
        </Link>
      }
    >
      <ContextFact label="Credits">{isLoading ? 'Loading credits…' : `${credits.length} linked roles`}</ContextFact>
      <ContextFact label="Recent archive trail">
        {credits.length === 0 ? (
          <span className="text-gray-500">No linked titles yet.</span>
        ) : (
          <div className="space-y-2">
            {credits.slice(0, 4).map((credit) => (
              <Link key={credit.creditId} to={pathForMedia(credit.media)} className="block truncate hover:text-accent">
                {credit.media.title}
              </Link>
            ))}
          </div>
        )}
      </ContextFact>
    </ContextPanel>
  )
}

function CompanyLens({ item }: { item: Company }) {
  const { data: works = [], isLoading } = useQuery({
    queryKey: qk.companies.media(item.id),
    queryFn: () => api.companies.media(item.id)
  })
  return (
    <ContextPanel
      identity={`company-${item.id}`}
      title={item.name}
      subtitle={<span className="capitalize">{item.type}</span>}
      footer={
        <Link className="btn-primary block w-full text-center" to={`/studios/${item.id}`}>
          Open collection
        </Link>
      }
    >
      <ContextFact label="Works">{isLoading ? 'Loading works…' : `${works.length} linked titles`}</ContextFact>
      <ContextFact label="Archive trail">
        {works.length === 0 ? (
          <span className="text-gray-500">No works linked yet.</span>
        ) : (
          <div className="space-y-2">
            {works.slice(0, 5).map((work) => (
              <Link key={work.id} to={pathForMedia(work)} className="block truncate hover:text-accent">
                {work.title}
              </Link>
            ))}
          </div>
        )}
      </ContextFact>
    </ContextPanel>
  )
}

function CharacterLens({ item }: { item: Character }) {
  const { data: roles = [], isLoading } = useQuery({
    queryKey: qk.characters.roles(item.id),
    queryFn: () => api.characters.roles(item.id)
  })
  return (
    <ContextPanel
      identity={`character-${item.id}`}
      title={item.name}
      subtitle={item.nameNative ?? 'Character'}
      image={
        <div className="flex justify-center bg-base-900/50 p-6">
          <CoverImage path={item.imagePath} alt={item.name} rounded="rounded-full" className="h-32 w-32" />
        </div>
      }
      footer={
        <Link className="btn-primary block w-full text-center" to={`/characters/${item.id}`}>
          Open dossier
        </Link>
      }
    >
      <ContextFact label="Appearances">{isLoading ? 'Loading appearances…' : `${roles.length} linked titles`}</ContextFact>
      <ContextFact label="Relationship trail">
        {roles.length === 0 ? (
          <span className="text-gray-500">No appearances linked yet.</span>
        ) : (
          <div className="space-y-3">
            {roles.slice(0, 4).map((role) => (
              <div key={role.media.id}>
                <Link to={pathForMedia(role.media)} className="block truncate hover:text-accent">
                  {role.media.title}
                </Link>
                {role.voices.length > 0 && (
                  <p className="truncate text-xs text-gray-500">
                    {role.voices.map((voice) => voice.person.name).join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </ContextFact>
    </ContextPanel>
  )
}
