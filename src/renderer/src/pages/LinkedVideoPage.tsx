import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { configFor, type MediaConfig } from '../lib/mediaConfig'
import { usePersistedState } from '../lib/navState'
import { useDebouncedValue, useIncrementalList } from '../lib/hooks'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import CoverImage from '../components/CoverImage'
import Section from '../components/Section'
import { Field } from '../components/Field'
import { RouteTabs } from '../components/Tabs'
import type { LinkedVideoTitle } from '@shared/types'

type SortMode = 'recent' | 'title' | 'linked' | 'left'
type ShowMode = 'all' | 'unwatched' | 'watched'

const CONTINUE_LIMIT = 6

// Mid-sentence form of a config noun that keeps acronyms: "TV Shows" -> "TV shows".
function lowerNoun(noun: string): string {
  return noun
    .split(' ')
    .map((word) => (/^[A-Z]{2,}$/.test(word) ? word : word.toLowerCase()))
    .join(' ')
}

function finished(t: LinkedVideoTitle): boolean {
  return t.fileCount > 0 && t.watchedCount === t.fileCount
}

function fmtDate(utc: string | null): string | null {
  if (!utc) return null
  const d = new Date(utc.replace(' ', 'T') + 'Z')
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

function playLabel(t: LinkedVideoTitle): string {
  if (finished(t)) return 'Watch again'
  if (t.nextFile?.resumeSeconds) return 'Resume'
  return t.watchedCount > 0 ? 'Play next' : 'Play'
}

function progressText(t: LinkedVideoTitle): string {
  if (t.fileCount === 0) return 'No video files found'
  if (t.fileCount === 1) return t.watchedCount ? 'Watched' : 'Not watched'
  return `${t.watchedCount} / ${t.fileCount} watched`
}

function PlayLink({ t, className }: { t: LinkedVideoTitle; className: string }) {
  if (!t.nextFile) return null
  const label = playLabel(t)
  return (
    <Link
      to={`/watch/file/${t.nextFile.id}`}
      className={className}
      aria-label={t.fileCount > 1 ? `${label} ${t.title}: ${t.nextFile.title}` : `${label} ${t.title}`}
    >
      {label}
    </Link>
  )
}

function ProgressBar({ t }: { t: LinkedVideoTitle }) {
  if (t.fileCount < 2) return null
  return (
    <div className="mt-1.5 h-1 overflow-hidden rounded bg-base-700" aria-hidden="true">
      <div className="h-full bg-accent" style={{ width: `${(t.watchedCount / t.fileCount) * 100}%` }} />
    </div>
  )
}

function TitleCard({ t, cfg }: { t: LinkedVideoTitle; cfg: MediaConfig }) {
  const detail = `${cfg.basePath}/${t.mediaId}`
  return (
    <li className="group min-w-0">
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-base-700">
        <CoverImage
          path={t.coverPath}
          alt={t.title}
          className="absolute inset-0 h-full w-full motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105 motion-safe:group-focus-within:scale-105"
          rounded="rounded-none"
          thumbWidth={320}
        />
        <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/35 group-focus-within:bg-black/35" />
        <Link to={detail} className="absolute inset-0" aria-label={`View ${t.title} details`} />
        {t.nextFile && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 max-lg:opacity-100">
            <PlayLink
              t={t}
              className="btn pointer-events-auto whitespace-nowrap border-accent/70 bg-base-900/95 text-white shadow-xl"
            />
          </div>
        )}
      </div>
      <Link to={detail} className="mt-2 block truncate text-sm font-medium hover:text-accent">
        {t.title}
      </Link>
      <p className="text-xs text-gray-400">{progressText(t)}</p>
      <ProgressBar t={t} />
    </li>
  )
}

function ContinueCard({ t, cfg }: { t: LinkedVideoTitle; cfg: MediaConfig }) {
  const detail = `${cfg.basePath}/${t.mediaId}`
  return (
    <li className="flex min-w-0 gap-3 rounded-lg border border-base-600 bg-base-800 p-3">
      <Link to={detail} className="w-16 shrink-0" aria-label={`View ${t.title} details`}>
        <CoverImage path={t.coverPath} alt={t.title} className="aspect-[2/3] w-16" thumbWidth={160} />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <Link to={detail} className="truncate text-sm font-medium hover:text-accent">
          {t.title}
        </Link>
        {t.fileCount > 1 && t.nextFile && (
          <p className="truncate text-xs text-gray-300" title={t.nextFile.title}>
            Next: {t.nextFile.title}
          </p>
        )}
        <p className="text-xs text-gray-400">{progressText(t)}</p>
        <ProgressBar t={t} />
        <div className="mt-auto pt-2">
          <PlayLink t={t} className="btn-primary px-3 py-1 text-sm" />
        </div>
      </div>
    </li>
  )
}

// Titles of one video type with a linked folder or file: the Games > Installed
// page for anime, movies and TV. Continue watching is the quick path; the whole
// collection stays searchable below it.
export default function LinkedVideoPage({ cfg }: { cfg: MediaConfig }) {
  const [search, setSearch] = usePersistedState('linked.search', '')
  const [sort, setSort] = usePersistedState<SortMode>('linked.sort', 'recent')
  const [show, setShow] = usePersistedState<ShowMode>('linked.show', 'all')
  const debouncedSearch = useDebouncedValue(search)
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: qk.video.linked(cfg.key),
    queryFn: () => api.video.linked(cfg.key)
  })

  const titles = useMemo(() => data ?? [], [data])
  const plural = lowerNoun(cfg.plural)
  const byActivity = useMemo(
    () =>
      [...titles].sort(
        (a, b) =>
          (b.lastActivityAt ?? '').localeCompare(a.lastActivityAt ?? '') ||
          a.title.localeCompare(b.title)
      ),
    [titles]
  )
  const continuing = byActivity
    .filter((t) => t.lastActivityAt && t.nextFile && !finished(t))
    .slice(0, CONTINUE_LIMIT)

  const visible = useMemo(() => {
    const needle = debouncedSearch.trim().toLocaleLowerCase()
    const matched = byActivity.filter(
      (t) =>
        t.title.toLocaleLowerCase().includes(needle) &&
        (show === 'all' || (show === 'watched') === finished(t))
    )
    if (sort === 'title') matched.sort((a, b) => a.title.localeCompare(b.title))
    if (sort === 'linked') {
      matched.sort((a, b) => (b.linkedAt ?? '').localeCompare(a.linkedAt ?? '') || a.title.localeCompare(b.title))
    }
    if (sort === 'left') {
      matched.sort(
        (a, b) =>
          b.fileCount - b.watchedCount - (a.fileCount - a.watchedCount) || a.title.localeCompare(b.title)
      )
    }
    return matched
  }, [byActivity, debouncedSearch, show, sort])
  const grid = useIncrementalList(visible, 96, `${cfg.key}|${debouncedSearch}|${show}|${sort}`)

  const tabs = cfg.listTabs && (
    <RouteTabs
      label="Linked libraries"
      className="mb-5"
      value={cfg.key}
      tabs={cfg.listTabs.map((tab) => ({
        key: tab.key,
        label: tab.label,
        to: `${configFor(tab.key).basePath}/linked`
      }))}
    />
  )

  if (isError) {
    return (
      <div className="p-6">
        {tabs}
        <PageHeader title="Linked" />
        <div role="alert" className="text-sm text-gray-400">
          Could not load linked {plural}.
          <button type="button" className="btn ml-3" onClick={() => void refetch()}>Try again</button>
        </div>
      </div>
    )
  }

  if (isLoading || !data) {
    return (
      <div className="p-6">
        {tabs}
        <PageHeader title="Linked" />
        <p className="text-sm text-gray-500" role="status">Loading linked {plural}…</p>
      </div>
    )
  }

  if (titles.length === 0) {
    return (
      <div className="p-6">
        {tabs}
        <PageHeader title="Linked" />
        <EmptyState
          title="Nothing linked yet"
          body={
            <>
              Open a title, go to its {cfg.videoTabLabel ?? 'Video'} tab and link its video folder or
              file. It shows up here, ready to play in the app.
            </>
          }
          action={<Link className="btn-primary" to={cfg.basePath}>Browse {plural}</Link>}
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1500px] p-4 sm:p-6">
      {tabs}
      <PageHeader
        title="Linked"
        eyebrow={<span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">Local video / player</span>}
        subtitle={`Your ${plural} on disk, ready to play from one place.`}
        actions={
          <span className="text-xs text-gray-400">
            {titles.length} linked {titles.length === 1 ? lowerNoun(cfg.singular) : plural}
          </span>
        }
      />

      {continuing.length > 0 && (
        <Section title="Continue watching" className="mb-8">
          <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {continuing.map((t) => (
              <ContinueCard key={t.mediaId} t={t} cfg={cfg} />
            ))}
          </ul>
        </Section>
      )}

      <Section
        title={`All linked ${plural}`}
        subtitle={`${visible.length} ${visible.length === 1 ? 'title' : 'titles'}`}
        className="pb-10"
      >
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Field label={`Search linked ${plural}`} hiddenLabel className="contents">
            <input
              type="search"
              className="input max-w-md min-w-48 flex-1"
              placeholder={`Search linked ${plural}...`}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </Field>
          <Field label={`Sort linked ${plural}`} hiddenLabel className="contents">
            <select
              className="input w-48"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortMode)}
            >
              <option value="recent">Recently watched</option>
              <option value="title">Title</option>
              <option value="linked">Recently linked</option>
              <option value="left">Most left to watch</option>
            </select>
          </Field>
          <Field label={`Show linked ${plural}`} hiddenLabel className="contents">
            <select
              className="input w-44"
              value={show}
              onChange={(event) => setShow(event.target.value as ShowMode)}
            >
              <option value="all">All</option>
              <option value="unwatched">Not finished</option>
              <option value="watched">Finished</option>
            </select>
          </Field>
        </div>
        {visible.length > 0 ? (
          <>
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 sm:gap-5">
              {grid.visible.map((t) => (
                <TitleCard key={t.mediaId} t={t} cfg={cfg} />
              ))}
            </ul>
            {grid.hasMore && <div ref={grid.sentinelRef} className="h-px" />}
          </>
        ) : (
          <p className="mt-8 text-sm text-gray-400">No linked {plural} match.</p>
        )}
      </Section>
    </div>
  )
}
