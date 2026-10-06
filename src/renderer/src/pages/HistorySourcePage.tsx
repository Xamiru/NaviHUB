import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { CONTRIBUTOR_ROLES, LICENSES, SOURCE_TYPES } from '@shared/history/schema'
import BackButton from '../components/BackButton'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import { PersonalBadge, RefRow } from '../components/history/HistoryBits'
import { SourceReference } from '../components/history/Citations'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'

// One cited work: its full reference, translations, and every History page
// that quotes or cites it.

export default function HistorySourcePage() {
  const { id = '' } = useParams()
  const { data, isLoading } = useQuery({ queryKey: qk.history.source(id), queryFn: () => api.history.source(id) })
  if (isLoading) return <PageStatus>Loading…</PageStatus>
  if (!data) {
    return (
      <div className="p-6">
        <BackButton fallback="/history/sources" />
        <PageStatus>This source does not exist.</PageStatus>
      </div>
    )
  }
  const s = data.source
  const row = (label: string, value: React.ReactNode): React.ReactNode =>
    value ? (
      <div className="grid grid-cols-[9rem_minmax(0,1fr)] gap-3 border-t border-line-subtle py-2.5 first:border-t-0">
        <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-signal-link">{label}</dt>
        <dd className="text-sm text-ink-secondary">{value}</dd>
      </div>
    ) : null
  return (
    <div className="mx-auto max-w-5xl p-6">
      <BackButton fallback="/history/sources" />
      <PageHeader
        eyebrow={
          <>
            <span className="chip">{SOURCE_TYPES[s.type] ?? s.type}</span>
            {data.personal && <PersonalBadge />}
          </>
        }
        title={
          <span lang={s.lang} dir="auto">
            {s.title}
          </span>
        }
        subtitle={<SourceReference source={s} />}
        className="mb-6"
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-secondary">Cited on {data.citedBy.length} {data.citedBy.length === 1 ? 'page' : 'pages'}</p>
          <ul className="space-y-3">
            {data.citedBy.map((c) => (
              <li key={c.ref} className="card p-3">
                <RefRow info={c} extra={<span className="text-xs tabular-nums text-ink-muted">{c.quotes} {c.quotes === 1 ? 'citation' : 'citations'}</span>} />
              </li>
            ))}
          </ul>
        </div>
        <aside className="card self-start p-5">
          <dl>
            {row(
              'Contributors',
              s.contributors.length > 0 &&
                s.contributors.map((c, i) => (
                  <span key={i} className="block">
                    {c.name}
                    {c.nameNative && (
                      <span dir="auto" className="ml-1 text-ink-muted">
                        ({c.nameNative})
                      </span>
                    )}{' '}
                    <span className="text-xs text-ink-muted">{CONTRIBUTOR_ROLES[c.role]}</span>
                  </span>
                ))
            )}
            {row('Published', [s.place, s.publisher, s.date].filter(Boolean).join(', '))}
            {row('Language', s.lang)}
            {row('Holding', s.holding)}
            {row('License', s.license ? LICENSES[s.license.id] : null)}
            {row('Accessed', s.accessed)}
            {row('ISBN', s.ids?.isbn)}
            {row('DOI', s.ids?.doi)}
            {row('Your copy', s.localCopy)}
            {row(
              'Original',
              data.translationOf && (
                <Link to={`/history/source/${data.translationOf.id}`} className="text-signal-link hover:underline" dir="auto">
                  {data.translationOf.title}
                </Link>
              )
            )}
            {row(
              'Translations',
              data.translations.length > 0 &&
                data.translations.map((t) => (
                  <Link key={t.id} to={`/history/source/${t.id}`} className="block text-signal-link hover:underline" dir="auto">
                    {t.title}
                  </Link>
                ))
            )}
          </dl>
          {(s.url || s.archivedUrl) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {s.url && (
                <button type="button" className="btn-ghost" onClick={() => void api.app.openExternal(s.url!)}>
                  Open online
                </button>
              )}
              {s.archivedUrl && (
                <button type="button" className="btn-ghost" onClick={() => void api.app.openExternal(s.archivedUrl!)}>
                  Archived copy
                </button>
              )}
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
