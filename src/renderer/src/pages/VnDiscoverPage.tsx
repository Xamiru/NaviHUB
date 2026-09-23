import { Link, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import type { VnDiscoverFilter, VnDiscoverPage, VnTagResult } from '@shared/types'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useHobbyAction } from '../lib/hobbyForms'
import PageHeader from '../components/PageHeader'
import { Field } from '../components/Field'
const initial: VnDiscoverFilter = {
  query: '',
  language: '',
  platform: '',
  length: null,
  minRating: null,
  tags: [],
  page: 1
}
export default function VnDiscoverPage() {
  const [filter, set] = usePersistedState('vnDiscoverFilter', initial)
  const [submitted, setSubmitted] = usePersistedState<VnDiscoverFilter | null>(
    'vnDiscoverSubmitted',
    null
  )
  const [result, setResult] = usePersistedState<VnDiscoverPage | null>('vnDiscoverResults', null)
  const [tagQuery, setTagQuery] = usePersistedState('vnDiscoverTagQuery', '')
  const [tags, setTags] = usePersistedState<VnTagResult[]>('vnDiscoverTags', [])
  const [selected, setSelected] = usePersistedState<VnTagResult[]>('vnDiscoverSelectedTags', [])
  const [error, setError] = usePersistedState('vnDiscoverError', '')
  const action = useHobbyAction()
  const qc = useQueryClient()
  const navigate = useNavigate()
  async function search(input: VnDiscoverFilter) {
    setError('')
    try {
      const data = await api.vnExplore.discover(input)
      setResult(data)
      setSubmitted(input)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
      throw e
    }
  }
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <PageHeader
        title="Discover visual novels"
        back={{ to: '/visual-novels', label: 'Visual novels' }}
        subtitle="Search VNDB, then add a title to your local library."
      />
      <form
        aria-label="VNDB discovery"
        className="mb-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          void action.run(() => search({ ...filter, tags: selected.map((t) => t.id), page: 1 }))
        }}
      >
        <Field label="Title search">
          <input
            className="input w-full max-w-xl"
            maxLength={200}
            value={filter.query}
            onChange={(e) => set({ ...filter, query: e.target.value })}
          />
        </Field>
        <div className="grid gap-3 sm:grid-cols-4">
          <Field label="Language">
            <select
              className="input"
              value={filter.language}
              onChange={(e) => set({ ...filter, language: e.target.value })}
            >
              <option value="">Any</option>
              <option value="ja">Japanese</option>
              <option value="en">English</option>
              <option value="zh-Hans">Simplified Chinese</option>
              <option value="ko">Korean</option>
            </select>
          </Field>
          <Field label="Platform">
            <select
              className="input"
              value={filter.platform}
              onChange={(e) => set({ ...filter, platform: e.target.value })}
            >
              <option value="">Any</option>
              {[
                ['win', 'Windows'],
                ['lin', 'Linux'],
                ['mac', 'macOS'],
                ['swi', 'Switch'],
                ['ps4', 'PS4'],
                ['ps5', 'PS5'],
                ['and', 'Android']
              ].map(([v, t]) => (
                <option value={v} key={v}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Length">
            <select
              className="input"
              value={filter.length ?? ''}
              onChange={(e) =>
                set({ ...filter, length: e.target.value ? Number(e.target.value) : null })
              }
            >
              <option value="">Any</option>
              {['Under 2 hours', '2–10 hours', '10–30 hours', '30–50 hours', 'Over 50 hours'].map(
                (label, i) => (
                  <option key={label} value={i + 1}>
                    {label}
                  </option>
                )
              )}
            </select>
          </Field>
          <Field label="Minimum rating (10–100)">
            <input
              className="input w-full"
              type="number"
              min={10}
              max={100}
              value={filter.minRating ?? ''}
              onChange={(e) =>
                set({ ...filter, minRating: e.target.value ? Number(e.target.value) : null })
              }
            />
          </Field>
        </div>
        <div>
          <Field label="Find tags">
            <input
              className="input mr-2"
              maxLength={100}
              value={tagQuery}
              onChange={(e) => setTagQuery(e.target.value)}
            />
          </Field>
          <button
            type="button"
            className="btn mt-2"
            disabled={action.busy || !tagQuery.trim()}
            onClick={() => void action.run(async () => setTags(await api.vnExplore.tags(tagQuery)))}
          >
            Search tags
          </button>
          <div className="mt-2 flex flex-wrap gap-2">
            {selected.map((t) => (
              <button
                className="chip-toggle-active"
                type="button"
                key={t.id}
                onClick={() => setSelected(selected.filter((s) => s.id !== t.id))}
              >
                Remove {t.name}
              </button>
            ))}
            {tags
              .filter((t) => !selected.some((s) => s.id === t.id))
              .map((t) => (
                <button
                  type="button"
                  className="chip-toggle"
                  key={t.id}
                  disabled={selected.length >= 10}
                  onClick={() => setSelected([...selected, t])}
                >
                  Add {t.name}
                </button>
              ))}
          </div>
        </div>
        <button className="btn-primary" disabled={action.busy}>
          {action.busy ? 'Working…' : 'Search VNDB'}
        </button>
      </form>
      {error && (
        <p role="alert" className="mb-4 text-signal-anomaly">
          {error} Submit the search again to retry. Earlier results remain below.
        </p>
      )}
      {result && (
        <>
          <p className="mb-4 text-sm text-ink-muted">
            Page {submitted?.page}.{' '}
            {result.results.length === 0
              ? 'No titles match these filters.'
              : 'Select a title to open it or import it.'}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {result.results.map((v) => (
              <article className="flex gap-3 border-b border-line-subtle pb-4" key={v.id}>
                {v.coverUrl && (
                  <img
                    src={v.coverUrl}
                    alt=""
                    loading="lazy"
                    className="h-32 w-20 shrink-0 rounded object-cover"
                  />
                )}
                <div>
                  <h2 className="font-semibold">{v.title}</h2>
                  <p className="mt-1 text-xs text-ink-muted">
                    {v.released ?? 'Date unknown'} /{' '}
                    {v.rating === null ? 'Unrated' : `${v.rating}/100`}
                    {v.minutes !== null && ` / ${Math.round(v.minutes / 60)} hours`}
                  </p>
                  {v.mediaId ? (
                    <Link className="btn-ghost mt-2" to={`/visual-novels/${v.mediaId}`}>
                      Open in library
                    </Link>
                  ) : (
                    <button
                      className="btn mt-2"
                      disabled={action.busy}
                      onClick={() =>
                        void action.run(async () => {
                          const added = await api.vndb.import(v.id)
                          await qc.invalidateQueries({ queryKey: qk.media.all })
                          navigate(`/visual-novels/${added.mediaId}`)
                        })
                      }
                    >
                      Import {v.title}
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3">
            <button
              className="btn"
              disabled={action.busy || !submitted || submitted.page <= 1}
              onClick={() =>
                submitted &&
                void action.run(() => search({ ...submitted, page: submitted.page - 1 }))
              }
            >
              Previous page
            </button>
            <button
              className="btn"
              disabled={action.busy || !result.more || !submitted || submitted.page >= 100}
              onClick={() =>
                submitted &&
                void action.run(() => search({ ...submitted, page: submitted.page + 1 }))
              }
            >
              Next page
            </button>
          </div>
        </>
      )}
    </div>
  )
}
