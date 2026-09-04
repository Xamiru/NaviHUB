import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useWikiLinks } from '../lib/wikiLinks'
import { usePersistedState } from '../lib/navState'
import { useIncrementalList } from '../lib/hooks'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import Section from '../components/Section'
import Tabs, { TabPanel } from '../components/Tabs'
import CoverImage from '../components/CoverImage'
import Markdown from '../components/Markdown'
import AddToListMenu from '../components/AddToListMenu'
import WrestlingMatchRow from '../components/wrestling/WrestlingMatchRow'
import { wikipediaUrl } from '@shared/wikiLinks'
import type { WrestlingMatchWithEvent } from '@shared/types'
import EditorialDetailFrame from '../components/EditorialDetailFrame'

// A career runs to thousands of matches; the repo pages and this batches again.
const PAGE = 300

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
  const { visible, sentinelRef } = useIncrementalList(matches)
  // Group by event so a career reads as a run of shows, not a flat wall.
  const groups: [string, WrestlingMatchWithEvent[]][] = []
  for (const m of visible) {
    const key = `${m.eventId}`
    const last = groups[groups.length - 1]
    if (last && last[0] === key) last[1].push(m)
    else groups.push([key, [m]])
  }
  return (
    <>
      <div className="space-y-4">
        {groups.map(([key, rows]) => (
          <div key={key}>
            <Link
              to={`/wrestling/event/${rows[0].eventId}`}
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
      <div ref={sentinelRef} />
    </>
  )
}

export default function WrestlingWrestlerPage(): JSX.Element {
  const { id = '' } = useParams()
  const wrestlerId = Number(id)
  const [tab, setTab] = usePersistedState<Tab>('wrestling.wrestlerTab', 'honours')

  const { data: w, isLoading } = useQuery({
    queryKey: qk.wrestling.wrestler(wrestlerId),
    queryFn: () => api.wrestling.wrestler(wrestlerId),
    enabled: Number.isFinite(wrestlerId)
  })
  const { data: matches } = useQuery({
    queryKey: qk.wrestling.wrestlerMatches(wrestlerId),
    queryFn: () => api.wrestling.wrestlerMatches(wrestlerId, { limit: PAGE }),
    enabled: Number.isFinite(wrestlerId)
  })
  const linkResolver = useWikiLinks(w?.bio)

  if (isLoading) return <PageStatus>Loading…</PageStatus>
  if (!w) return <PageStatus>Wrestler not found.</PageStatus>

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
          <CoverImage path={w.photoPath} alt={w.name} className="w-full max-w-[240px] object-cover" />
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

          <Tabs
            id="wrestler-record"
            label="Wrestler record view"
            className="mb-4"
            value={tab}
            onChange={setTab}
            tabs={[
              { key: 'honours', label: `Honours${honourCount ? ` (${honourCount})` : ''}` },
              { key: 'matches', label: `Matches${matches?.length ? ` (${matches.length})` : ''}` }
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
            ) : !matches?.length ? (
              <p className="text-sm text-gray-500">No matches recorded.</p>
            ) : (
              <MatchList matches={matches} />
            )}
          </TabPanel>
        </div>
      </div>
    </EditorialDetailFrame>
  )
}
