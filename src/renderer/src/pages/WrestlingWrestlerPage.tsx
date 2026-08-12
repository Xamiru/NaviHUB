import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useWikiLinks } from '../lib/wikiLinks'
import { useIncrementalList } from '../lib/hooks'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import Section from '../components/Section'
import CoverImage from '../components/CoverImage'
import Markdown from '../components/Markdown'
import WrestlingMatchRow from '../components/wrestling/WrestlingMatchRow'

// Every match a wrestler worked, newest first. Paginated in the repo (a career
// runs to thousands of rows) and batched again on the way in.
const PAGE = 300

export default function WrestlingWrestlerPage(): JSX.Element {
  const { id = '' } = useParams()
  const wrestlerId = Number(id)

  const { data: wrestler, isLoading } = useQuery({
    queryKey: qk.wrestling.wrestler(wrestlerId),
    queryFn: () => api.wrestling.wrestler(wrestlerId),
    enabled: Number.isFinite(wrestlerId)
  })
  const { data: matches } = useQuery({
    queryKey: qk.wrestling.wrestlerMatches(wrestlerId),
    queryFn: () => api.wrestling.wrestlerMatches(wrestlerId, { limit: PAGE }),
    enabled: Number.isFinite(wrestlerId)
  })
  const linkResolver = useWikiLinks(wrestler?.bio)
  const { visible, sentinelRef } = useIncrementalList(matches ?? [])

  if (isLoading) return <PageStatus>Loading…</PageStatus>
  if (!wrestler) return <PageStatus>Wrestler not found.</PageStatus>

  const wins = (matches ?? []).filter((m) =>
    m.participants.some((p) => p.wrestlerId === wrestlerId && p.won)
  ).length

  const facts = [
    wrestler.billedFrom,
    wrestler.debutYear ? `Debuted ${wrestler.debutYear}` : null,
    `${wrestler.matchCount} match${wrestler.matchCount === 1 ? '' : 'es'}`
  ].filter(Boolean)

  return (
    <div className="p-6">
      <PageHeader back="history" title={wrestler.name} subtitle={facts.join(' · ')} />

      <div className="grid gap-8 lg:grid-cols-[180px_1fr]">
        <div>
          <CoverImage
            path={wrestler.photoPath}
            alt={wrestler.name}
            className="w-full max-w-[180px] object-cover"
          />
          {matches && matches.length > 0 && (
            <p className="mt-3 text-sm text-gray-500">
              {wins} won of {matches.length} shown
            </p>
          )}
        </div>

        <div>
          {wrestler.bio && (
            <Section title="About">
              <Markdown text={wrestler.bio} linkResolver={linkResolver} unresolvedTitle="Not in the wiki" />
            </Section>
          )}

          <Section
            title="Matches"
            subtitle={
              matches && matches.length >= PAGE ? `showing the latest ${PAGE}` : undefined
            }
          >
            {!matches?.length ? (
              <p className="text-sm text-gray-500">No matches recorded.</p>
            ) : (
              <div className="card px-4 py-1">
                {visible.map((m) => (
                  <div key={m.id}>
                    <Link
                      to={`/wrestling/event/${m.eventId}`}
                      className="mt-3 block text-xs uppercase tracking-wider text-gray-500 hover:text-accent"
                    >
                      {m.eventName}
                      {m.eventDate ? ` · ${m.eventDate.slice(0, 4)}` : ''}
                    </Link>
                    <WrestlingMatchRow match={m} />
                  </div>
                ))}
                <div ref={sentinelRef} />
              </div>
            )}
          </Section>
        </div>
      </div>
    </div>
  )
}
