import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { toast } from '../lib/toast'
import { confirmDialog } from '../lib/confirm'
import { usePersistedState } from '../lib/navState'
import { useIncrementalList } from '../lib/hooks'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import EmptyState from '../components/EmptyState'
import Tabs from '../components/Tabs'
import CoverImage from '../components/CoverImage'
import WrestlingMatchRow from '../components/wrestling/WrestlingMatchRow'
import LooseMatchDialog from '../components/wrestling/LooseMatchDialog'
import { promotionName } from '@shared/wrestling'
import type { WrestlingMatchWithEvent } from '@shared/types'

type Tab = 'events' | 'loose'

// Everything you actually own, in one place: PPVs with an attached folder, and
// LOOSE matches — standalone rips with no PPV behind them (a Raw main event, a
// one-off). The loose half is stored as a match with no event, so it carries
// ratings, hearts, wrestlers and list membership like any other match.
export default function WrestlingCollectionPage(): JSX.Element {
  const qc = useQueryClient()
  const navigate = useNavigate()
  const [tab, setTab] = usePersistedState<Tab>('wrestling.collectionTab', 'loose')
  const [editing, setEditing] = useState<WrestlingMatchWithEvent | null>(null)
  const [busy, setBusy] = useState(false)

  const { data: owned, isLoading } = useQuery({
    queryKey: qk.wrestling.events({ ownedOnly: true, sort: 'date' }),
    queryFn: () => api.wrestling.events({ ownedOnly: true, sort: 'date' })
  })
  const { data: loose } = useQuery({
    queryKey: qk.wrestling.loose,
    queryFn: () => api.wrestling.looseMatches()
  })
  const { visible, sentinelRef } = useIncrementalList(loose ?? [])

  async function addLoose(): Promise<void> {
    setBusy(true)
    try {
      const res = await api.wrestling.addLooseMatch()
      // ok:false with no error is a cancelled picker, not a failure.
      if (!res.ok && res.error) toast(res.error, 'error')
      else if (res.ok) {
        await qc.invalidateQueries({ queryKey: qk.wrestling.all })
        toast('Match added — give it a title and wrestlers.', 'success')
      }
    } finally {
      setBusy(false)
    }
  }

  if (isLoading) return <PageStatus>Loading…</PageStatus>

  const looseCount = loose?.length ?? 0
  const ownedCount = owned?.length ?? 0

  return (
    <div className="p-6">
      <PageHeader
        back={{ to: '/wrestling', label: 'Wrestling' }}
        title="Collection"
        subtitle={`${ownedCount} owned ${ownedCount === 1 ? 'event' : 'events'} · ${looseCount} loose ${
          looseCount === 1 ? 'match' : 'matches'
        }`}
        actions={
          <button className="btn" disabled={busy} onClick={addLoose}>
            Add loose match
          </button>
        }
      />

      <Tabs
        className="mb-5"
        value={tab}
        onChange={setTab}
        tabs={[
          { key: 'loose', label: `Loose matches${looseCount ? ` (${looseCount})` : ''}` },
          { key: 'events', label: `Owned events${ownedCount ? ` (${ownedCount})` : ''}` }
        ]}
      />

      {tab === 'events' ? (
        !owned?.length ? (
          <EmptyState
            title="No events attached yet"
            body="Open an event and attach the folder holding your rip."
          />
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">
            {owned.map((e) => (
              <Link key={e.id} to={`/wrestling/event/${e.id}`} className="card group overflow-hidden">
                <CoverImage
                  path={e.posterPath}
                  alt={e.name}
                  className="aspect-[2/3] w-full object-cover"
                  rounded=""
                />
                <div className="p-3">
                  <p className="truncate font-medium group-hover:text-accent">{e.name}</p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {promotionName(e.promotion)}
                    {e.eventDate ? ` · ${e.eventDate.slice(0, 4)}` : ''}
                    {` · ${e.videoCount} ${e.videoCount === 1 ? 'file' : 'files'}`}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )
      ) : !looseCount ? (
        <EmptyState
          title="No loose matches"
          body="For the odd match you own that isn't part of a pay-per-view — a weekly-show main event, a one-off. Pick the file and give it a title."
          action={
            <button className="btn-primary" disabled={busy} onClick={addLoose}>
              Add loose match
            </button>
          }
        />
      ) : (
        <>
          <div className="space-y-2">
            {visible.map((m) => (
              <div key={m.id} className="card px-4 py-1">
                <div className="flex items-baseline justify-between gap-3 pt-2 text-xs text-gray-500">
                  <span className="truncate uppercase tracking-wider">
                    {m.showLabel || 'Loose match'}
                    {m.matchDate ? ` · ${m.matchDate}` : ''}
                  </span>
                  <span className="flex shrink-0 gap-2">
                    {m.videoId != null && (
                      <button
                        className="hover:text-accent"
                        onClick={() => navigate(`/watch/wrestling/${m.videoId}`)}
                      >
                        Play
                      </button>
                    )}
                    <button className="hover:text-accent" onClick={() => setEditing(m)}>
                      Edit
                    </button>
                    <button
                      className="hover:text-red-400"
                      onClick={async () => {
                        if (
                          !(await confirmDialog(
                            `Remove "${m.title}" from your collection?\n\nThe video file stays on disk.`,
                            { danger: true }
                          ))
                        )
                          return
                        await api.wrestling.removeLooseMatch(m.id)
                        await qc.invalidateQueries({ queryKey: qk.wrestling.all })
                      }}
                    >
                      Remove
                    </button>
                  </span>
                </div>
                <WrestlingMatchRow match={m} />
              </div>
            ))}
          </div>
          <div ref={sentinelRef} />
        </>
      )}

      {editing && (
        <LooseMatchDialog
          match={editing}
          onClose={() => setEditing(null)}
          onSaved={async () => {
            setEditing(null)
            await qc.invalidateQueries({ queryKey: qk.wrestling.all })
          }}
        />
      )}
    </div>
  )
}
