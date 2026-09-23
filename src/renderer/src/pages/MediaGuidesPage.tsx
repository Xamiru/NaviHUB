import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQueries } from '@tanstack/react-query'
import { MEDIA_GUIDES, matchGuide, type MediaGuide } from '@shared/guides'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { configFor } from '../lib/mediaConfig'
import { useSettings, statusesFrom } from '../lib/hooks'
import { usePersistedState } from '../lib/navState'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import CoverImage from '../components/CoverImage'
import { Field } from '../components/Field'
export default function MediaGuidesPage() {
  const { id } = useParams()
  if (!id)
    return (
      <div className="mx-auto max-w-5xl px-6 py-8">
        <PageHeader
          title="Cross-media guides"
          subtitle="Follow a story across novels and screen adaptations using your own library."
        />
        <div className="space-y-6">
          {MEDIA_GUIDES.map((g) => (
            <article key={g.id} className="border-b border-line-subtle pb-6">
              <h2 className="text-xl font-semibold">
                <Link className="text-accent" to={`/guides/${g.id}`}>
                  {g.title}
                </Link>
              </h2>
              <p className="mt-2 max-w-prose text-sm leading-relaxed text-ink-muted">
                {g.description}
              </p>
              <p className="mt-2 text-xs text-ink-muted">
                {g.entries.length} entries / Suggested and release order
              </p>
            </article>
          ))}
        </div>
      </div>
    )
  const guide = MEDIA_GUIDES.find((g) => g.id === id)
  return guide ? (
    <Guide key={id} guide={guide} />
  ) : (
    <PageStatus>
      Guide not found. <Link to="/guides">All guides</Link>
    </PageStatus>
  )
}
function Guide({ guide }: { guide: MediaGuide }) {
  const [order, setOrder] = usePersistedState<'suggested' | 'release'>(
    `guide.${guide.id}.order`,
    'suggested'
  )
  const types = useMemo(() => [...new Set(guide.entries.map((e) => e.mediaType))], [guide])
  const queries = useQueries({
    queries: types.map((mediaType) => ({
      queryKey: qk.media.home(mediaType),
      queryFn: () => api.media.list({ mediaType })
    }))
  })
  const settings = useSettings()
  const matched = matchGuide(
    guide.entries,
    queries.flatMap((q) => q.data ?? [])
  )
  const finished = (key: string) => {
    const m = matched.get(key)
    return !!m && m.status === statusesFrom(settings.data, configFor(m.mediaType))[1]
  }
  const next = guide.entries.find((e) => !e.optional && !finished(e.id))
  const entries =
    order === 'suggested' ? guide.entries : [...guide.entries].sort((a, b) => a.year - b.year)
  if (queries.some((q) => q.isLoading) || settings.isLoading)
    return <PageStatus>Matching your library…</PageStatus>
  if (queries.some((q) => q.isError) || settings.isError)
    return (
      <PageStatus>
        Could not read library progress.{' '}
        <button
          className="btn"
          onClick={() => {
            queries.forEach((q) => void q.refetch())
            void settings.refetch()
          }}
        >
          Retry
        </button>
      </PageStatus>
    )
  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <PageHeader
        title={guide.title}
        back={{ to: '/guides', label: 'Cross-media guides' }}
        subtitle={guide.description}
      />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm">
          {guide.entries.filter((e) => !e.optional && finished(e.id)).length}/
          {guide.entries.filter((e) => !e.optional).length} core entries completed
          {next ? ` / Next core entry: ${next.title}` : ' / Core route complete'}
        </p>
        <Field label="Guide order">
          <select
            className="input"
            value={order}
            onChange={(e) => setOrder(e.target.value as typeof order)}
          >
            <option value="suggested">Suggested order (editorial)</option>
            <option value="release">Release order by year</option>
          </select>
        </Field>
      </div>
      <ol>
        {entries.map((e, i) => {
          const m = matched.get(e.id)
          const cfg = configFor(e.mediaType)
          return (
            <li key={e.id} className="flex gap-4 border-b border-line-subtle py-5">
              <span className="w-6 shrink-0 text-sm text-ink-muted">{i + 1}</span>
              {m?.coverPath && (
                <CoverImage
                  path={m.coverPath}
                  alt={e.title}
                  thumbWidth={160}
                  className="h-28 w-20 shrink-0 rounded object-cover"
                />
              )}
              <div>
                <h2 className="text-lg font-semibold">
                  {m ? (
                    <Link className="text-accent" to={`${cfg.basePath}/${m.id}`}>
                      {e.title}
                    </Link>
                  ) : (
                    e.title
                  )}
                </h2>
                <p className="text-xs text-ink-muted">
                  {cfg.singular} / {e.year} / {e.relation}
                  {e.optional ? ' / Optional' : ''} /{' '}
                  {m
                    ? finished(e.id)
                      ? 'Completed'
                      : (m.status ?? 'In library')
                    : 'Not matched in library'}
                </p>
                <p className="mt-2 max-w-prose text-sm leading-relaxed">{e.note}</p>
                <div className="mt-2 flex gap-3 text-xs">
                  <button
                    className="text-accent"
                    onClick={() => void api.app.openExternal(e.source)}
                  >
                    Source
                  </button>
                  {!m && (
                    <Link
                      className="text-accent"
                      to={e.mediaType === 'visual_novel' ? '/visual-novels/discover' : cfg.basePath}
                    >
                      Find in {cfg.plural}
                    </Link>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
