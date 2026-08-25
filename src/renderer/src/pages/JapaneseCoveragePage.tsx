import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { mediaUrl } from '@shared/mediaUrl'
import { pathForMedia } from '../lib/mediaConfig'
import PageStatus from '../components/PageStatus'
import CoverageBar, { knownShare, learningShare, lookupInterval, pct, uniqueKnownShare } from '../components/japanese/CoverageBar'
import { Group, Pill } from '../components/PillGroup'
import { usePersistedState } from '../lib/navState'

// "What can I read next": every scanned series ranked by how much of its
// vocabulary the user already knows. Scores recompute from jp_card on read, so
// this list reorders itself as study progresses.
export default function JapaneseCoveragePage() {
  // 'known' = the repo's best-understood-first order; 'level' re-sorts by
  // distance from the ~95% assisted-reading target. That is an intensive
  // reading candidate, not a claim that 95% is comfortable unassisted.
  const [sort, setSort] = usePersistedState<'known' | 'level'>('jpCoverageSort', 'known')
  const { data: rows, isLoading } = useQuery({
    queryKey: qk.japanese.coverageList,
    queryFn: () => api.japanese.coverageList()
  })

  if (isLoading) return <PageStatus>Loading…</PageStatus>

  const sorted =
    rows && sort === 'level'
      ? [...rows].sort(
          (a, b) =>
            Math.abs(knownShare(a.tiers) - 0.95) - Math.abs(knownShare(b.tiers) - 0.95) ||
            a.title.localeCompare(b.title)
        )
      : rows

  return (
    <div className="mx-auto max-w-3xl p-6">
      <PageHeader
        back={{ to: "/japanese", label: "Japanese" }}
        title="Comprehension"
        subtitle="How much of each scanned series you know, and what suits assisted reading."
      />

      <div className="mb-4">
        <Group label="Order">
          <Pill active={sort === 'known'} onClick={() => setSort('known')} label="Best known" />
          <Pill
            active={sort === 'level'}
            onClick={() => setSort('level')}
            label="Assisted target (~95%)"
          />
        </Group>
      </div>

      {!sorted || sorted.length === 0 ? (
        <div className="card p-4 text-sm text-gray-400">
          Nothing scanned yet. Open a manga or light novel with chapters attached and use{' '}
          <span className="text-gray-300">Scan comprehension</span> on its page.
        </div>
      ) : (
        <div className="space-y-2">
          {sorted.map((row) => (
            <div key={row.mediaId} className="card flex items-center gap-3 p-3">
              <div className="h-16 w-11 shrink-0 overflow-hidden rounded bg-base-800">
                {row.coverPath && (
                  <img
                    src={mediaUrl(row.coverPath) ?? undefined}
                    alt=""
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  {row.mediaType ? (
                    <Link
                      // Route paths come from MediaConfig.basePath ('/movies',
                      // '/visual-novels'), not the raw media type.
                      to={`${pathForMedia({ id: row.mediaId, mediaType: row.mediaType })}?tab=media`}
                      className="truncate font-medium hover:text-accent"
                    >
                      {row.title}
                    </Link>
                  ) : (
                    <span className="truncate font-medium text-gray-500">{row.title}</span>
                  )}
                  <span className="shrink-0 text-sm">
                    <span className="font-semibold text-green-300">{pct(knownShare(row.tiers))}</span>
                    {learningShare(row.tiers) > 0 && (
                      <span className="text-amber-300"> +{pct(learningShare(row.tiers))}</span>
                    )}
                  </span>
                </div>
                <CoverageBar tiers={row.tiers} className="mt-2" />
                <p className="mt-1 text-xs text-gray-500">
                  {pct(uniqueKnownShare(row.tiers))} of {row.uniqueWords.toLocaleString()} unique words ·{' '}
                  {lookupInterval(row.tiers) != null && (
                    <>1 lookup per {lookupInterval(row.tiers)} words · </>
                  )}
                  {row.tokenCount.toLocaleString()} words of text · scanned {row.scannedAt.slice(0, 10)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
