import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useWikiLinks } from '../lib/wikiLinks'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import Section from '../components/Section'
import CoverImage from '../components/CoverImage'
import Markdown from '../components/Markdown'
import WrestlingMatchRow from '../components/wrestling/WrestlingMatchRow'
import WrestlingFilesSection from '../components/wrestling/WrestlingFilesSection'
import WrestlingChronologyNav from '../components/wrestling/WrestlingChronology'
import TorrentSearchDialog from '../components/TorrentSearchDialog'
import AddToListMenu from '../components/AddToListMenu'
import FavoriteButton from '../components/FavoriteButton'
import { WRESTLING_CATEGORIES, wrestlingTorrentQuery } from '@shared/torrents'
import { promotionName } from '@shared/wrestling'
import { wikipediaUrl } from '@shared/wikiLinks'
import type { WrestlingMatch } from '@shared/types'
import EditorialDetailFrame from '../components/EditorialDetailFrame'

// Preserves card order while grouping — a night is a contiguous run.
function groupByCard(matches: WrestlingMatch[]): [string | null, WrestlingMatch[]][] {
  const out: [string | null, WrestlingMatch[]][] = []
  for (const m of matches) {
    const last = out[out.length - 1]
    if (last && last[0] === (m.cardLabel ?? null)) last[1].push(m)
    else out.push([m.cardLabel ?? null, [m]])
  }
  return out
}

function fmtDate(iso: string | null): string | null {
  if (!iso) return null
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  // Formatted from the stored parts, never `new Date(iso)` — that would shift
  // the day across a timezone boundary.
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  })
}

export default function WrestlingEventPage(): JSX.Element {
  const { id = '' } = useParams()
  const qc = useQueryClient()
  const eventId = Number(id)
  const [torrentsOpen, setTorrentsOpen] = useState(false)
  // Set when arriving from a list entry for one match (/wrestling/match/:id).
  const [params] = useSearchParams()
  const highlightId = Number(params.get('match')) || null
  const { data: event, isLoading } = useQuery({
    queryKey: qk.wrestling.event(eventId),
    queryFn: () => api.wrestling.event(eventId),
    enabled: Number.isFinite(eventId)
  })
  const linkResolver = useWikiLinks(event?.lead)
  const { data: chrono } = useQuery({
    queryKey: qk.wrestling.chronology(eventId),
    queryFn: () => api.wrestling.chronology(eventId),
    enabled: Number.isFinite(eventId)
  })

  if (isLoading) return <PageStatus>Loading…</PageStatus>
  if (!event) return <PageStatus>Event not found.</PageStatus>

  const facts = [
    fmtDate(event.eventDate),
    event.venue,
    event.city,
    event.attendance != null ? `${event.attendance.toLocaleString()} in attendance` : null
  ].filter(Boolean)

  return (
    <EditorialDetailFrame width="wide">
      <PageHeader
        back="history"
        eyebrow={
          <>
            <span className="chip">{promotionName(event.promotion)}</span>
            {event.series && event.series !== event.name && (
              <span className="chip">{event.series}</span>
            )}
            {event.eventDate && (
              <Link to={`/wrestling/year/${event.eventDate.slice(0, 4)}`} className="chip hover:text-accent">
                {event.eventDate.slice(0, 4)}
              </Link>
            )}
          </>
        }
        title={event.name}
        subtitle={facts.join(' · ') || undefined}
        actions={
          <>
            <FavoriteButton
              active={event.favorite}
              onClick={async () => {
                await api.wrestling.setFavorite('event', event.id, !event.favorite)
                await qc.invalidateQueries({ queryKey: qk.wrestling.all })
              }}
            />
            <AddToListMenu kind="wrestlingEvent" entityId={event.id} />
            {event.wikiTitle && (
              <button
                className="btn"
                onClick={() => api.app.openExternal(wikipediaUrl(event.wikiTitle!))}
              >
                Wikipedia
              </button>
            )}
            <button className="btn" onClick={() => setTorrentsOpen(true)}>
              Find torrents
            </button>
          </>
        }
      />

      {torrentsOpen && (
        <TorrentSearchDialog
          heading={event.name}
          // The promotion's name AT THE TIME — a 2001 WWE show is filed as WWF.
          query={wrestlingTorrentQuery(promotionName(event.promotion), event.name)}
          categories={WRESTLING_CATEGORIES}
          onClose={() => setTorrentsOpen(false)}
        />
      )}

      <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
        <div>
          <CoverImage
            path={event.posterPath}
            alt={event.name}
            className="w-full max-w-[240px] object-cover"
          />
          {event.tagline && <p className="mt-3 text-sm italic text-gray-500">{event.tagline}</p>}
        </div>

        <div>
          {event.lead && (
            <Section title="About">
              <Markdown text={event.lead} linkResolver={linkResolver} unresolvedTitle="Not in the wiki" />
            </Section>
          )}

          <Section
            title="Card"
            subtitle={event.matches.length ? `${event.matches.length} matches` : undefined}
          >
            {event.matches.length === 0 ? (
              <p className="text-sm text-gray-500">
                No card was found in this event&apos;s article.
              </p>
            ) : (
              // A multi-night event arrives as one flattened card carrying the
              // results tables' own captions; re-group so Night 1 and Night 2
              // read as they do on the article.
              <div className="space-y-4">
                {groupByCard(event.matches).map(([label, rows]) => (
                  <div key={label ?? 'main'}>
                    {label && (
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {label}
                      </p>
                    )}
                    <div className="card px-4 py-1">
                      {rows.map((m) => (
                        <WrestlingMatchRow
                          key={m.id}
                          match={m}
                          highlighted={m.id === highlightId}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>

          <WrestlingFilesSection eventId={event.id} />

          {chrono && <WrestlingChronologyNav {...chrono} />}
        </div>
      </div>
    </EditorialDetailFrame>
  )
}
