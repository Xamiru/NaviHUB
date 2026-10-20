import { useMemo, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { useScoreMax } from '../../lib/hooks'
import { usePersistedState } from '../../lib/navState'
import { configFor } from '../../lib/mediaConfig'
import { MEDIA_TYPE_COLORS } from '../../lib/mediaColors'
import Section from '../Section'
import StatTile from '../StatTile'
import BarChart, { type Bar } from '../BarChart'
import StackedBarChart from '../StackedBarChart'
import CoverImage from '../CoverImage'
import Tabs, { TabPanel } from '../Tabs'
import ThemedFailure from '../theme/ThemedFailure'
import { FilterPills } from '../PillGroup'
import type { CreditTimeGroupKey, LibraryInsights, MediaType } from '@shared/types'

// The /stats sections beyond time: score distribution, finished titles by
// release decade, and the people and studios behind the most titles.

// Stacking order for the decade chart: chosen so neighbouring segments are the
// most distinguishable pairs of the fixed per-type palette (blue never touches
// violet). Color still follows the type; this only decides who sits next to whom.
const STACK_ORDER: MediaType[] = ['anime', 'game', 'movie', 'tv', 'manga', 'visual_novel', 'book']

function useInsights() {
  return useQuery({
    queryKey: qk.media.libraryInsights,
    queryFn: () => api.media.libraryInsights()
  })
}

function SectionFailure({ what, retry }: { what: string; retry: () => void }) {
  return (
    <ThemedFailure
      message={`The ${what} could not be read.`}
      onRetry={retry}
      retryLabel={`Retry ${what}`}
    />
  )
}

// Score buckets on the user's own scale: whole points up to a 10-point scale,
// ten equal bands above it (a 100-point scale reads 1-10, 11-20, …).
function scoreBuckets(rows: LibraryInsights['scores'], scoreMax: number): Bar[] {
  const whole = scoreMax <= 10
  const count = whole ? Math.max(1, Math.round(scoreMax)) : 10
  const width = whole ? 1 : scoreMax / 10
  const values = new Array<number>(count).fill(0)
  for (const r of rows) {
    const s = Math.min(Math.max(r.score, 0), scoreMax)
    const idx = whole
      ? Math.min(count - 1, Math.max(0, Math.round(s) - 1))
      : Math.min(count - 1, Math.max(0, Math.ceil(s / width) - 1))
    values[idx] += r.count
  }
  return values.map((value, i) => {
    const label = whole
      ? String(i + 1)
      : `${Math.round(i * width) + 1}-${Math.round((i + 1) * width)}`
    return { key: label, label, value, title: `Score ${label}: ${value} titles` }
  })
}

function fmtScore(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1)
}

export function ScoresSection() {
  const { data, isPending, isError, refetch } = useInsights()
  const scoreMax = useScoreMax()
  const [scope, setScope] = usePersistedState<string>('statsScoreScope', 'all')

  const perType = useMemo(() => {
    const map = new Map<MediaType, { sum: number; count: number }>()
    for (const r of data?.scores ?? []) {
      const cur = map.get(r.mediaType) ?? { sum: 0, count: 0 }
      cur.sum += r.score * r.count
      cur.count += r.count
      map.set(r.mediaType, cur)
    }
    return STACK_ORDER.filter((t) => map.has(t)).map((t) => ({ mediaType: t, ...map.get(t)! }))
  }, [data])

  if (isPending) return null
  if (isError) {
    return (
      <Section title="Scores">
        <SectionFailure what="scores" retry={() => void refetch()} />
      </Section>
    )
  }
  if (perType.length === 0) return null

  const active = scope !== 'all' && perType.some((t) => t.mediaType === scope) ? scope : 'all'
  const rows = data.scores.filter((r) => active === 'all' || r.mediaType === active)
  const bars = scoreBuckets(rows, scoreMax)
  const scored = rows.reduce((n, r) => n + r.count, 0)
  const mean = scored > 0 ? rows.reduce((n, r) => n + r.score * r.count, 0) / scored : 0
  const commonest = [...bars].sort((a, b) => b.value - a.value)[0]

  return (
    <Section title="Scores" subtitle={`out of ${fmtScore(scoreMax)}`}>
      <FilterPills
        label="Score type"
        className="mb-4"
        value={active}
        onChange={setScope}
        options={[
          { key: 'all', label: 'All' },
          ...perType.map((t) => ({ key: t.mediaType, label: configFor(t.mediaType).plural }))
        ]}
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div className="grid grid-cols-2 content-start gap-3 sm:grid-cols-3">
          <StatTile label="Average" value={fmtScore(Number(mean.toFixed(1)))} accent />
          <StatTile label="Scored titles" value={scored.toLocaleString()} />
          <StatTile
            label="Most given"
            value={commonest?.label ?? '-'}
            sub={`${commonest?.value ?? 0} titles`}
          />
          {active === 'all' &&
            perType.map((t) => (
              <StatTile
                key={t.mediaType}
                label={configFor(t.mediaType).plural}
                value={fmtScore(Number((t.sum / t.count).toFixed(1)))}
                sub={`average of ${t.count}`}
              />
            ))}
        </div>
        <div className="card self-start p-4">
          <BarChart bars={bars} height={200} label="Titles per score" />
        </div>
      </div>
    </Section>
  )
}

export function DecadesSection() {
  const { data, isPending, isError, refetch } = useInsights()
  if (isPending) return null
  if (isError) {
    return (
      <Section title="Release decades">
        <SectionFailure what="release decades" retry={() => void refetch()} />
      </Section>
    )
  }
  if (data.decades.length === 0) return null

  const first = data.decades[0].decade
  const last = data.decades[data.decades.length - 1].decade
  const bars = []
  for (let d = first; d <= last; d += 10) {
    const values: Record<string, number> = {}
    for (const r of data.decades) if (r.decade === d) values[r.mediaType] = r.count
    bars.push({ key: String(d), label: `${d}s`, values })
  }
  const series = STACK_ORDER.map((t) => ({
    key: t,
    label: configFor(t).plural,
    color: MEDIA_TYPE_COLORS[t]
  }))
  return (
    <Section title="Release decades" subtitle="finished titles, by when they came out">
      <div className="card p-4">
        <StackedBarChart
          series={series}
          bars={bars}
          label="Finished titles per release decade"
          unit="titles"
        />
        {data.unknownYear > 0 && (
          <p className="mt-3 text-xs text-gray-400">
            {data.unknownYear} finished {data.unknownYear === 1 ? 'title has' : 'titles have'} no
            release year and {data.unknownYear === 1 ? 'is' : 'are'} not shown.
          </p>
        )}
      </div>
    </Section>
  )
}

export function CreditTimeSection() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: qk.media.creditTime,
    queryFn: () => api.media.creditTime()
  })
  const [picked, setPicked] = usePersistedState<CreditTimeGroupKey>('statsCreditGroup', 'voice')

  if (isPending) {
    return (
      <Section title="Who you kept coming back to">
        <p className="text-sm text-gray-400" role="status">
          Counting credits…
        </p>
      </Section>
    )
  }
  if (isError) {
    return (
      <Section title="Who you kept coming back to">
        <SectionFailure what="people and studios" retry={() => void refetch()} />
      </Section>
    )
  }
  if (data.length === 0) return null

  const group = data.find((g) => g.key === picked) ?? data[0]
  const top = group.entries[0]?.titleCount || 1
  const studios = group.key === 'studio'
  const base = studios ? '/studios' : '/people'
  return (
    <Section
      title="Who you kept coming back to"
      subtitle="by how many of the titles you watched, read or played they are credited on"
    >
      <Tabs
        id="stats-credit-time"
        label="People and studios"
        tabs={data.map((g) => ({ key: g.key, label: g.label }))}
        value={group.key}
        onChange={setPicked}
        className="mb-4"
      />
      <TabPanel tabsId="stats-credit-time" value={group.key}>
        {/* Ranks read down each column: 1-5 left, 6-10 right. */}
        <ol
          className="grid gap-x-6 gap-y-2 md:grid-flow-col md:grid-cols-2 md:[grid-template-rows:repeat(var(--rows),auto)]"
          style={{ '--rows': Math.ceil(group.entries.length / 2) } as CSSProperties}
        >
          {group.entries.map((e, i) => (
            <li key={e.id} className="flex items-center gap-3">
              <span className="w-6 shrink-0 text-right text-sm tabular-nums text-gray-400">
                {i + 1}
              </span>
              <Link to={`${base}/${e.id}`} className="shrink-0" tabIndex={-1} aria-hidden="true">
                {studios && e.coverPaths.length > 0 ? (
                  // A small fan of the studio's covers; logos are rare and crop badly.
                  <span className="flex h-12 w-[4.5rem] items-center">
                    {e.coverPaths.map((p, j) => (
                      <CoverImage
                        // Two titles can share one downloaded cover file.
                        key={`${j}:${p}`}
                        path={p}
                        alt=""
                        thumbWidth={96}
                        className={`h-12 w-8 object-cover ring-2 ring-base-900 ${j > 0 ? '-ml-3' : ''}`}
                        rounded="rounded"
                      />
                    ))}
                  </span>
                ) : (
                  <CoverImage
                    path={e.imagePath}
                    alt={e.name}
                    thumbWidth={96}
                    fallback="monogram"
                    className={`h-12 object-cover ${studios ? 'w-[4.5rem]' : 'w-12'}`}
                    rounded={studios ? 'rounded' : 'rounded-full'}
                  />
                )}
              </Link>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <Link to={`${base}/${e.id}`} className="truncate text-sm hover:text-white">
                    {e.name}
                  </Link>
                  <span className="shrink-0 text-sm tabular-nums text-gray-300">
                    {e.titleCount} {e.titleCount === 1 ? 'title' : 'titles'}
                  </span>
                </div>
                <div className="mt-1.5 h-1 rounded-full bg-base-700">
                  <div
                    className="h-full rounded-full bg-accent/70"
                    style={{ width: `${(e.titleCount / top) * 100}%` }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </TabPanel>
    </Section>
  )
}
