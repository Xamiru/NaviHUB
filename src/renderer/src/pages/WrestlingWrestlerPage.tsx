import SoundtrackSection from '../components/SoundtrackSection'
import { useMemo } from 'react'
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useWikiLinks } from '../lib/wikiLinks'
import { usePersistedState } from '../lib/navState'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import Section from '../components/Section'
import Tabs, { TabPanel } from '../components/Tabs'
import CoverImage from '../components/CoverImage'
import Markdown from '../components/Markdown'
import AddToListMenu from '../components/AddToListMenu'
import FavoriteButton from '../components/FavoriteButton'
import WrestlingMatchRow from '../components/wrestling/WrestlingMatchRow'
import { wikipediaUrl } from '@shared/wikiLinks'
import type { WrestlingMatchWithEvent } from '@shared/types'
import EditorialDetailFrame from '../components/EditorialDetailFrame'

// A career runs to thousands of matches; the repo pages and this batches again.
const PAGE = 100

type Tab = 'honours' | 'matches'

function Fact({ label, value }: { label: string; value: string }): JSX.Element {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-gray-500">{label}</div>
      <div className="text-sm text-gray-200">{value}</div>
    </div>
  )
}

function MatchList({ matches }: { matches: WrestlingMatchWithEvent[] }): JSX.Element {
  // Group by event so a career reads as a run of shows, not a flat wall.
  const groups: [string, WrestlingMatchWithEvent[]][] = []
  for (const m of matches) {
    const key = m.eventId == null ? `loose-${m.id}` : `event-${m.eventId}`
    const last = groups[groups.length - 1]
    if (last && last[0] === key) last[1].push(m)
    else groups.push([key, [m]])
  }
  return (
    <div className="space-y-4">
      {groups.map(([key, rows]) => (
        <div key={key}>
          <Link
            to={`/wrestling/match/${rows[0].id}`}
            className="mb-1 block text-xs uppercase tracking-wider text-gray-500 hover:text-accent"
          >
            {rows[0].eventName}
            {rows[0].eventDate ? ` · ${rows[0].eventDate.slice(0, 4)}` : ''}
          </Link>
          <div className="card px-4 py-1">
            {rows.map((m) => (
              <WrestlingMatchRow key={m.id} match={m} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function WrestlingWrestlerPage(): JSX.Element {
  const { id = '' } = useParams()
  const wrestlerId = Number(id)
  const qc = useQueryClient()
  const [tab, setTab] = usePersistedState<Tab>('wrestling.wrestlerTab', 'honours')

  const wrestlerQuery = useQuery({
    queryKey: qk.wrestling.wrestler(wrestlerId),
    queryFn: () => api.wrestling.wrestler(wrestlerId),
    enabled: Number.isFinite(wrestlerId)
  })
  const w = wrestlerQuery.data
  const matchesQuery = useInfiniteQuery({
    queryKey: qk.wrestling.wrestlerMatches(wrestlerId),
    queryFn: ({ pageParam }) =>
      api.wrestling.wrestlerMatches(wrestlerId, { limit: PAGE, offset: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (last, pages) =>
      last.length === PAGE ? pages.length * PAGE : undefined,
    enabled: Number.isFinite(wrestlerId)
  })
  const matches = useMemo(
    () => matchesQuery.data?.pages.flatMap((page) => page) ?? [],
    [matchesQuery.data]
  )
  const linkResolver = useWikiLinks(w?.bio)

  if (wrestlerQuery.isLoading) return <PageStatus>Loading…</PageStatus>
  if (wrestlerQuery.isError) return <PageStatus>Could not load this wrestler.</PageStatus>
  if (!w) return <PageStatus>Wrestler not found.</PageStatus>

  async function toggleFavorite(id: number, favorite: boolean): Promise<void> {
    await api.wrestling.setFavorite('wrestler', id, !favorite)
    await qc.invalidateQueries({ queryKey: qk.wrestling.all })
  }

  const rec = w.record
  const facts = [
    w.realName ? { label: 'Real name', value: w.realName } : null,
    w.billedFrom ? { label: 'Billed from', value: w.billedFrom } : null,
    w.debutYear ? { label: 'Debut', value: String(w.debutYear) } : null,
    w.height ? { label: 'Height', value: w.height } : null
  ].filter(Boolean) as { label: string; value: string }[]

  const honourCount = w.honours.reduce((n, g) => n + g.items.length, 0)

  return (
    <EditorialDetailFrame width="wide">
      <PageHeader
        back="history"
        title={w.name}
        subtitle={
          rec.total > 0
            ? `${rec.wins}–${rec.losses}${rec.draws ? `–${rec.draws}` : ''} over ${rec.total} recorded ${
                rec.total === 1 ? 'match' : 'matches'
              }`
            : 'No recorded matches yet'
        }
        actions={
          <>
            <FavoriteButton
              active={w.favorite}
              variant="pill"
              activeText="Saved"
              inactiveText="Save"
              onClick={() => void toggleFavorite(w.id, w.favorite)}
            />
            <AddToListMenu kind="wrestlingWrestler" entityId={w.id} />
            {w.wikiTitle && (
              <button className="btn" onClick={() => api.app.openExternal(wikipediaUrl(w.wikiTitle!))}>
                Wikipedia
              </button>
            )}
          </>
        }
      />

      <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
        <div className="space-y-4">
          <CoverImage
            path={w.photoPath}
            alt={w.name}
            thumbWidth={320}
            className="w-full max-w-[240px] object-cover"
          />
          {facts.length > 0 && (
            <div className="space-y-3">
              {facts.map((f) => (
                <Fact key={f.label} label={f.label} value={f.value} />
              ))}
            </div>
          )}
          {w.championships.length > 0 && (
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-500">Titles won on a card</div>
              <ul className="mt-1 space-y-0.5 text-sm text-gray-300">
                {w.championships.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          {w.bio && (
            <Section title="About">
              <Markdown text={w.bio} linkResolver={linkResolver} unresolvedTitle="Not in the wiki" />
            </Section>
          )}

          <SoundtrackSection key={w.id} owner={{ kind: 'wrestler', id: w.id }} />
          <Tabs
            id="wrestler-record"
            label="Wrestler record view"
            className="mb-4"
            value={tab}
            onChange={setTab}
            tabs={[
              { key: 'honours', label: `Honours${honourCount ? ` (${honourCount})` : ''}` },
              { key: 'matches', label: `Matches${w.record.total ? ` (${w.record.total})` : ''}` }
            ]}
          />

          <TabPanel tabsId="wrestler-record" value={tab}>
            {tab === 'honours' ? (
              w.honours.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No championships or accomplishments were found on this wrestler&apos;s article.
                </p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {w.honours.map((g) => (
                    <div key={g.org} className="card p-4">
                      <p className="mb-2 text-sm font-semibold">{g.org}</p>
                      <ul className="space-y-1 text-sm text-gray-400">
                        {g.items.map((it, i) => (
                          <li key={i}>{it}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )
            ) : matchesQuery.isError ? (
              <div className="card p-4">
                <p className="text-sm text-gray-400">Could not load this career record.</p>
                <button className="btn-ghost mt-3" onClick={() => void matchesQuery.refetch()}>
                  Try again
                </button>
              </div>
            ) : matchesQuery.isLoading ? (
              <p className="text-sm text-gray-500">Loading matches…</p>
            ) : !matches.length ? (
              <p className="text-sm text-gray-500">No matches recorded.</p>
            ) : (
              <>
                <MatchList matches={matches} />
                {matchesQuery.hasNextPage && (
                  <button
                    className="btn mt-4"
                    disabled={matchesQuery.isFetchingNextPage}
                    onClick={() => void matchesQuery.fetchNextPage()}
                  >
                    {matchesQuery.isFetchingNextPage ? 'Loading…' : 'Load more matches'}
                  </button>
                )}
              </>
            )}
          </TabPanel>
        </div>
      </div>
    </EditorialDetailFrame>
  )
}
