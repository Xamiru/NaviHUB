import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { INTERPRETATION_TOPICS, primaryName } from '@shared/history/schema'
import type { HistoryUserEntity } from '@shared/types'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import EmptyState from '../components/EmptyState'
import Section from '../components/Section'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'

// The user's own History entries on this machine, grouped by kind, with the
// way in to write new ones. Researched content is fixed through research
// sessions; these are the user's to edit.

const GROUPS: Array<{ kind: HistoryUserEntity['kind']; title: string; path: (id: string) => string }> = [
  { kind: 'event', title: 'Events', path: (id) => `/history/event/${id}` },
  { kind: 'person', title: 'People', path: (id) => `/history/person/${id}` },
  { kind: 'period', title: 'Periods', path: (id) => `/history/period/${id}` },
  { kind: 'interpretation', title: 'Interpretations', path: () => '/history/my' },
  { kind: 'source', title: 'Sources', path: (id) => `/history/source/${id}` }
]

function titleOf(e: HistoryUserEntity): string {
  if (e.kind === 'source') return e.title || e.id
  if (e.kind === 'interpretation') return `${INTERPRETATION_TOPICS[e.topic]}: ${e.about.join(', ')}`
  return primaryName(e) || e.id
}

export default function HistoryMyPage() {
  const { data, isLoading } = useQuery({ queryKey: qk.history.userEntities, queryFn: () => api.history.userEntities() })
  if (isLoading) return <PageStatus>Loading…</PageStatus>
  const items = data ?? []
  return (
    <div className="mx-auto max-w-5xl p-6">
      <PageHeader
        title="My additions"
        subtitle="Events, people, periods, sources and interpretations you wrote yourself. They stay on this machine and are marked Personal wherever they appear."
        actions={
          <div className="flex flex-wrap gap-2">
            <Link to="/history/new/source" className="btn-ghost">New source</Link>
            <Link to="/history/new/person" className="btn-ghost">New person</Link>
            <Link to="/history/new/period" className="btn-ghost">New period</Link>
            <Link to="/history/new/interpretation" className="btn-ghost">New interpretation</Link>
            <Link to="/history/new/event" className="btn-primary">New event</Link>
          </div>
        }
        className="mb-6"
      />
      {items.length === 0 ? (
        <EmptyState
          title="Nothing of your own yet"
          body="Start with a source you have in hand, then quote it in a new event or person. Every passage must be copied word for word, with its page."
        />
      ) : (
        GROUPS.map((g) => {
          const list = items.filter((e) => e.kind === g.kind)
          if (list.length === 0) return null
          return (
            <Section key={g.kind} title={g.title} subtitle={String(list.length)}>
              <ul className="card divide-y divide-line-subtle p-0">
                {list.map((e) => (
                  <li key={e.id} className="flex items-center gap-3 px-4 py-3">
                    <Link to={g.path(e.id)} className="min-w-0 flex-1 truncate text-sm text-ink hover:text-accent" dir="auto">
                      {titleOf(e)}
                    </Link>
                    <Link to={`/history/my/${e.id}/edit`} className="btn-ghost h-8 text-xs">
                      Edit
                    </Link>
                  </li>
                ))}
              </ul>
            </Section>
          )
        })
      )}
    </div>
  )
}
