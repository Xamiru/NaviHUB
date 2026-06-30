import { Link } from 'react-router-dom'
import { useQueries } from '@tanstack/react-query'
import { api } from '../lib/api'
import { MEDIA_CONFIGS, configFor, pathForMedia, type MediaConfig } from '../lib/mediaConfig'
import CoverImage from '../components/CoverImage'
import type { MediaItem } from '@shared/types'

// The status that marks an item as in-progress. It's the first default status
// for every media type and the conventional label, so "Continue watching"
// keys off it.
const IN_PROGRESS = 'Watching'

// Landing page: brand + tagline, what you're in the middle of, a glance at the
// library, the latest additions, and your favorites — all shortcuts inward.
export default function HomePage() {
  // One list per media type, fetched once and reused to derive every strip
  // below (recent / in-progress / favorites). It's a local single-user DB, so
  // pulling each type's full list is cheap.
  const lists = useQueries({
    queries: MEDIA_CONFIGS.map((cfg) => ({
      queryKey: ['media', { mediaType: cfg.key, home: true }],
      queryFn: () => api.media.list({ mediaType: cfg.key })
    }))
  })
  const isLoading = lists.some((q) => q.isLoading)
  const all: MediaItem[] = lists.flatMap((q) => q.data ?? [])

  const recent = [...all].sort(byCreatedDesc).slice(0, 5)
  const continuing = all.filter((m) => m.status === IN_PROGRESS).sort(byUpdatedDesc)
  const favorites = all.filter((m) => m.favorite).sort(byUpdatedDesc)

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <Hero />

      {continuing.length > 0 && (
        <Strip title="Continue watching" items={continuing} showProgress />
      )}

      <LibraryGlance />

      <Section title="Recently added">
        {isLoading ? (
          <p className="text-gray-500">Loading…</p>
        ) : recent.length === 0 ? (
          <div className="card p-10 text-center">
            <p className="font-medium mb-1">Nothing here yet</p>
            <p className="text-sm text-gray-500 mb-5">
              Add or import your first title to see it show up here.
            </p>
            <Link to="/anime" className="btn-primary mx-auto">
              Go to your library
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
            {recent.map((m) => (
              <MediaCard key={cardKey(m)} item={m} />
            ))}
          </div>
        )}
      </Section>

      {favorites.length > 0 && <Strip title="★ Favorites" items={favorites} />}
    </div>
  )
}

const byCreatedDesc = (a: MediaItem, b: MediaItem) => b.createdAt.localeCompare(a.createdAt)
const byUpdatedDesc = (a: MediaItem, b: MediaItem) => b.updatedAt.localeCompare(a.updatedAt)
const cardKey = (m: MediaItem) => `${m.mediaType}-${m.id}`

function Hero() {
  return (
    <div className="flex flex-col items-center text-center py-10">
      <Logo className="h-20 w-20 mb-4" />
      <h1 className="text-4xl font-bold tracking-tight">
        Navi<span className="text-accent">HUB</span>
      </h1>
      <p className="mt-2 text-sm uppercase tracking-[0.3em] text-accent/80">good vibrations</p>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-3">{title}</h2>
      {children}
    </section>
  )
}

// A horizontally-scrolling row of covers — used for the secondary strips
// (Continue watching, Favorites) so they read as quick shelves, not full grids.
function Strip({
  title,
  items,
  showProgress = false
}: {
  title: string
  items: MediaItem[]
  showProgress?: boolean
}) {
  return (
    <Section title={title}>
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
        {items.map((m) => (
          <div key={cardKey(m)} className="w-[150px] shrink-0">
            <MediaCard item={m} showProgress={showProgress} />
          </div>
        ))}
      </div>
    </Section>
  )
}

// Per-type total + the section's quick links. Reuses the same status-count
// endpoint the list pages use, so the numbers always agree.
function LibraryGlance() {
  const sections = MEDIA_CONFIGS.filter((c) => !c.hideFromSidebar)
  const counts = useQueries({
    queries: sections.map((cfg) => ({
      queryKey: ['media-counts', cfg.key],
      queryFn: () => api.media.setStatusCounts(cfg.key)
    }))
  })

  return (
    <Section title="Library at a glance">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
        {sections.map((cfg, i) => {
          const total = Object.values(counts[i].data ?? {}).reduce((a, b) => a + b, 0)
          return <GlanceCard key={cfg.key} cfg={cfg} total={total} />
        })}
      </div>
    </Section>
  )
}

function GlanceCard({ cfg, total }: { cfg: MediaConfig; total: number }) {
  return (
    <div className="card p-4 flex flex-col gap-3">
      <Link to={cfg.basePath} className="flex items-center gap-3 group">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/15 text-lg text-accent">
          {cfg.icon}
        </span>
        <div className="min-w-0">
          <p className="font-medium group-hover:text-accent truncate">
            {cfg.sidebarLabel ?? cfg.plural}
          </p>
          <p className="text-xs text-gray-500">
            {total} {total === 1 ? 'title' : 'titles'}
          </p>
        </div>
      </Link>
      <div className="flex flex-wrap gap-2 text-xs">
        {cfg.importSource && (
          <Link to={cfg.basePath} className="chip hover:bg-base-600">
            ⬇ Import
          </Link>
        )}
        <Link to={`${cfg.basePath}/new`} className="chip hover:bg-base-600">
          + Add {cfg.singular}
        </Link>
        {cfg.children.map((c) => (
          <Link key={c.to} to={c.to} className="chip hover:bg-base-600">
            {c.icon} {c.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

// A cover card linking to the item's detail page, tagged with its media type.
// With showProgress, episode-based items get a thin progress bar (Continue
// watching); the type's own config formats the subtitle either way.
function MediaCard({ item, showProgress = false }: { item: MediaItem; showProgress?: boolean }) {
  const cfg = configFor(item.mediaType)
  const pct =
    showProgress && item.totalUnits != null && item.totalUnits > 0
      ? Math.min(100, Math.round((item.progress / item.totalUnits) * 100))
      : null

  return (
    <Link to={pathForMedia(item)} className="group block">
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
        <CoverImage
          path={item.coverPath}
          alt={item.title}
          rounded="rounded-lg"
          className="h-full w-full transition-transform group-hover:scale-105"
        />
        <span className="absolute top-1.5 left-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-gray-200">
          {cfg.icon} {cfg.singular}
        </span>
        {item.score != null && (
          <span className="absolute top-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-xs font-semibold text-yellow-300">
            ★ {item.score}
          </span>
        )}
        {pct != null && (
          <div className="absolute inset-x-0 bottom-0 h-1 bg-black/60">
            <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
          </div>
        )}
      </div>
      <div className="mt-2">
        <p className="text-sm font-medium line-clamp-2 group-hover:text-accent">{item.title}</p>
        <p className="text-xs text-gray-500">
          {showProgress ? cfg.formatProgressStat(item) : (item.status ?? '')}
        </p>
      </div>
    </Link>
  )
}

// The NaviHUB hub mark (mirrors assets/icon.svg), inlined so it scales crisply.
function Logo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" className={className} role="img" aria-label="NaviHUB logo">
      <defs>
        <linearGradient id="navihub-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7c5cff" />
          <stop offset="1" stopColor="#4a2fd0" />
        </linearGradient>
      </defs>
      <rect width="256" height="256" rx="56" fill="url(#navihub-bg)" />
      <g stroke="#ffffff" strokeWidth="10" strokeLinecap="round" opacity="0.95">
        <line x1="128" y1="128" x2="128" y2="56" />
        <line x1="128" y1="128" x2="190" y2="92" />
        <line x1="128" y1="128" x2="190" y2="164" />
        <line x1="128" y1="128" x2="128" y2="200" />
        <line x1="128" y1="128" x2="66" y2="164" />
        <line x1="128" y1="128" x2="66" y2="92" />
      </g>
      <g fill="#ffffff">
        <circle cx="128" cy="56" r="14" />
        <circle cx="190" cy="92" r="14" />
        <circle cx="190" cy="164" r="14" />
        <circle cx="128" cy="200" r="14" />
        <circle cx="66" cy="164" r="14" />
        <circle cx="66" cy="92" r="14" />
      </g>
      <circle cx="128" cy="128" r="26" fill="#0f1115" />
      <text
        x="128"
        y="138"
        textAnchor="middle"
        fontFamily="Inter, Arial, sans-serif"
        fontSize="34"
        fontWeight="700"
        fill="#ffffff"
      >
        N
      </text>
    </svg>
  )
}
