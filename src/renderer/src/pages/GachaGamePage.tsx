import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useDebouncedValue, useIncrementalList } from '../lib/hooks'
import { toast, toastError } from '../lib/toast'
import { gachaGame, gachaUnitKind, type GachaGameCfg } from '@shared/gacha'
import type { GachaBanner, GachaGameId, GachaUnit } from '@shared/types'
import PageStatus from '../components/PageStatus'
import Section from '../components/Section'
import CoverImage from '../components/CoverImage'
import GachaUnitDialog from '../components/gacha/GachaUnitDialog'
import GachaBannerDialog from '../components/gacha/GachaBannerDialog'
import GachaGameImageDialog from '../components/gacha/GachaGameImageDialog'

type Tab = 'roster' | 'banners' | 'news'

export default function GachaGamePage() {
  const { game } = useParams()
  const cfg = gachaGame(game)
  if (!cfg) return <PageStatus>Unknown game.</PageStatus>
  // Keyed by game so component state never bleeds between the four dashboards.
  return <GameDashboard key={cfg.id} cfg={cfg} />
}

function GameDashboard({ cfg }: { cfg: GachaGameCfg }) {
  const [tab, setTab] = usePersistedState<Tab>('gachaTab', 'roster')
  const [editingImage, setEditingImage] = useState(false)

  // The hub overview also carries each game's hero art — cheap, shared cache.
  const { data: overview } = useQuery({
    queryKey: qk.gacha.overview,
    queryFn: () => api.gacha.overview()
  })
  const imagePath = overview?.find((o) => o.game === cfg.id)?.imagePath ?? null

  const TABS: { key: Tab; label: string }[] = [
    { key: 'roster', label: 'Roster' },
    { key: 'banners', label: 'Banners' },
    { key: 'news', label: 'News' }
  ]

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <Link to="/gacha" className="mb-4 inline-block text-sm text-gray-500 hover:text-gray-300">
        ← Gacha
      </Link>

      <div className="relative mb-6 overflow-hidden rounded-xl border border-base-700">
        {imagePath ? (
          <>
            <CoverImage
              path={imagePath}
              alt={cfg.name}
              rounded="rounded-none"
              className="h-44 w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base-900/90 via-base-900/25 to-transparent" />
          </>
        ) : (
          <div
            className="h-28 w-full"
            style={{ background: `linear-gradient(135deg, ${cfg.color}2e, transparent 70%)` }}
          />
        )}
        <div className="absolute bottom-3 left-4 flex items-center gap-3">
          <span className="text-3xl drop-shadow" style={{ color: cfg.color }}>
            {cfg.glyph}
          </span>
          <h1 className="text-2xl font-bold drop-shadow">{cfg.name}</h1>
        </div>
        <button
          className="absolute right-3 top-3 rounded-md bg-black/40 px-2.5 py-1 text-xs text-gray-300 hover:text-white"
          title="Set this game's artwork"
          onClick={() => setEditingImage(true)}
        >
          ✎ Artwork
        </button>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <CurrencyStrip cfg={cfg} />
      </div>

      <div className="mb-5 flex gap-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`rounded-full px-3 py-1 text-sm ${
              tab === t.key ? 'bg-accent/20 text-white' : 'text-gray-400 hover:bg-base-700'
            }`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'roster' && <RosterTab cfg={cfg} />}
      {tab === 'banners' && <BannersTab cfg={cfg} />}
      {tab === 'news' && <NewsTab cfg={cfg} />}

      {editingImage && (
        <GachaGameImageDialog game={cfg} current={imagePath} onClose={() => setEditingImage(false)} />
      )}
    </div>
  )
}

// ---- currencies ----

function CurrencyStrip({ cfg }: { cfg: GachaGameCfg }) {
  const { data: currencies = [] } = useQuery({
    queryKey: qk.gacha.currencies(cfg.id),
    queryFn: () => api.gacha.currencies(cfg.id)
  })
  const amounts = new Map(currencies.map((c) => [c.key, c.amount]))
  return (
    <>
      {cfg.currencies.map((c) => (
        <CurrencyTile key={c.key} game={cfg.id} curKey={c.key} label={c.label} amount={amounts.get(c.key) ?? 0} />
      ))}
    </>
  )
}

// StatTile shell with a click-to-edit value (the playlist-rename idiom:
// save on blur/Enter, Escape cancels).
function CurrencyTile({
  game,
  curKey,
  label,
  amount
}: {
  game: GachaGameId
  curKey: string
  label: string
  amount: number
}) {
  const qc = useQueryClient()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')

  async function save(): Promise<void> {
    setEditing(false)
    const n = Math.floor(Number(draft))
    if (!Number.isFinite(n) || n < 0 || n === amount) return
    await api.gacha.setCurrency(game, curKey, n)
    await qc.invalidateQueries({ queryKey: qk.gacha.all })
  }

  return (
    <div className="card p-4">
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      {editing ? (
        <input
          className="input mt-1 text-xl font-bold"
          type="number"
          min={0}
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => {
            if (e.key === 'Enter') save()
            else if (e.key === 'Escape') setEditing(false)
          }}
        />
      ) : (
        <button
          className="mt-1 block text-2xl font-bold hover:text-accent"
          title="Click to edit"
          onClick={() => {
            setDraft(String(amount))
            setEditing(true)
          }}
        >
          {amount.toLocaleString()}
        </button>
      )}
    </div>
  )
}

// ---- roster ----

function RosterTab({ cfg }: { cfg: GachaGameCfg }) {
  const [kindKey, setKindKey] = usePersistedState('gachaKind', cfg.unitKinds[0].key)
  const [search, setSearch] = usePersistedState('gachaSearch', '')
  const debouncedSearch = useDebouncedValue(search)
  const [adding, setAdding] = useState(false)

  const kind = gachaUnitKind(cfg, kindKey) ?? cfg.unitKinds[0]
  const filter = { kind: kind.key, search: debouncedSearch }
  const { data: units = [], isLoading } = useQuery({
    queryKey: qk.gacha.units(cfg.id, filter),
    queryFn: () => api.gacha.units(cfg.id, filter)
  })
  const { visible, sentinelRef } = useIncrementalList(units)

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {cfg.unitKinds.map((k) => (
          <button
            key={k.key}
            className={`rounded-full px-3 py-1 text-sm ${
              kind.key === k.key ? 'bg-accent text-white' : 'bg-base-700 text-gray-400 hover:text-white'
            }`}
            onClick={() => setKindKey(k.key)}
          >
            {k.plural}
          </button>
        ))}
        <input
          className="input ml-auto max-w-xs"
          placeholder={`Search ${kind.plural.toLowerCase()}…`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn-primary" onClick={() => setAdding(true)}>
          + Add {kind.label.toLowerCase()}
        </button>
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : units.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-lg font-medium mb-1">No {kind.plural.toLowerCase()} yet</p>
          <p className="text-sm text-gray-500 mb-5">
            Track the ones you own — add them one by one for now.
          </p>
          <button className="btn-primary" onClick={() => setAdding(true)}>
            + Add {kind.label.toLowerCase()}
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
            {visible.map((u) => (
              <UnitCard key={u.id} cfg={cfg} unit={u} />
            ))}
          </div>
          <div ref={sentinelRef} />
        </>
      )}

      {adding && <GachaUnitDialog game={cfg} kind={kind.key} onClose={() => setAdding(false)} />}
    </div>
  )
}

function UnitCard({ cfg, unit }: { cfg: GachaGameCfg; unit: GachaUnit }) {
  const kind = gachaUnitKind(cfg, unit.kind)
  const facets = [unit.element, unit.role].filter(Boolean).join(' · ')
  const dupesText =
    unit.dupes > 0 && kind?.dupesLabel
      ? (kind.formatDupes?.(unit.dupes) ?? `${kind.dupesLabel} ${unit.dupes}`)
      : null
  return (
    <Link to={`/gacha/${unit.game}/unit/${unit.id}`} className="group">
      <div className="relative">
        <CoverImage
          path={unit.imagePath}
          alt={unit.name}
          rounded="rounded-lg"
          className="aspect-[3/4] w-full transition-opacity group-hover:opacity-90"
        />
        {unit.favorite && (
          <span className="absolute right-1.5 top-1.5 text-sm text-amber-400" title="Favorite">
            ★
          </span>
        )}
      </div>
      <p className="mt-1.5 truncate text-sm font-medium">{unit.name}</p>
      <p className="truncate text-xs text-gray-500">
        {unit.rarity ? <span className="text-amber-400">{'★'.repeat(unit.rarity)}</span> : null}
        {unit.rarity && facets ? ' · ' : ''}
        {facets}
      </p>
      {(unit.level != null || dupesText) && (
        <p className="truncate text-xs text-gray-500">
          {unit.level != null ? `Lv ${unit.level}` : ''}
          {unit.level != null && dupesText ? ' · ' : ''}
          {dupesText}
        </p>
      )}
    </Link>
  )
}

// ---- banners ----

function localToday(): string {
  const d = new Date()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mm}-${dd}`
}

function bannerState(b: GachaBanner, today: string): 'active' | 'upcoming' | 'ended' {
  if (!b.startAt || b.startAt > today) return 'upcoming'
  if (b.endAt && b.endAt < today) return 'ended'
  return 'active'
}

function BannersTab({ cfg }: { cfg: GachaGameCfg }) {
  const { data: banners = [], isLoading } = useQuery({
    queryKey: qk.gacha.banners(cfg.id),
    queryFn: () => api.gacha.banners(cfg.id)
  })
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState<GachaBanner | null>(null)

  const today = localToday()
  const groups: { title: string; items: GachaBanner[] }[] = [
    { title: 'Active', items: banners.filter((b) => bannerState(b, today) === 'active') },
    { title: 'Upcoming', items: banners.filter((b) => bannerState(b, today) === 'upcoming') },
    { title: 'Ended', items: banners.filter((b) => bannerState(b, today) === 'ended') }
  ]

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <button className="btn-primary" onClick={() => setAdding(true)}>
          + Add banner
        </button>
        <button
          className="btn-ghost"
          disabled
          title={`Banner fetching for ${cfg.name} arrives in a later phase — add banners manually for now`}
        >
          ⇣ Fetch banners
        </button>
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : banners.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-lg font-medium mb-1">No banners yet</p>
          <p className="text-sm text-gray-500 mb-5">
            Keep the schedule here — what's running now and what's been announced.
          </p>
          <button className="btn-primary" onClick={() => setAdding(true)}>
            + Add banner
          </button>
        </div>
      ) : (
        groups.map(
          (g) =>
            g.items.length > 0 && (
              <Section key={g.title} title={g.title}>
                <div className="space-y-2">
                  {g.items.map((b) => (
                    <BannerRow key={b.id} banner={b} onEdit={() => setEditing(b)} />
                  ))}
                </div>
              </Section>
            )
        )
      )}

      {adding && <GachaBannerDialog game={cfg} onClose={() => setAdding(false)} />}
      {editing && <GachaBannerDialog game={cfg} banner={editing} onClose={() => setEditing(null)} />}
    </div>
  )
}

function BannerRow({ banner, onEdit }: { banner: GachaBanner; onEdit: () => void }) {
  const qc = useQueryClient()

  async function remove(): Promise<void> {
    if (!confirm(`Delete banner "${banner.name}"?`)) return
    await api.gacha.removeBanner(banner.id)
    await qc.invalidateQueries({ queryKey: qk.gacha.all })
  }

  return (
    <div className="card flex items-center gap-4 p-3">
      {banner.imagePath && (
        <CoverImage path={banner.imagePath} alt={banner.name} className="h-16 w-28 shrink-0" />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-medium">{banner.name}</p>
          {banner.kind && <span className="chip shrink-0">{banner.kind}</span>}
        </div>
        {banner.featured && <p className="truncate text-sm text-gray-400">{banner.featured}</p>}
        <p className="text-xs text-gray-500">
          {banner.startAt ?? 'TBA'} → {banner.endAt ?? 'open-ended'}
        </p>
      </div>
      <div className="flex shrink-0 gap-2">
        <button className="btn-ghost" onClick={onEdit}>
          Edit
        </button>
        <button className="btn-danger" onClick={remove}>
          Delete
        </button>
      </div>
    </div>
  )
}

// ---- news (the game's subreddit hot feed, fetched only on click) ----

function timeAgo(iso: string): string {
  const ms = Date.now() - Date.parse(iso)
  if (!Number.isFinite(ms) || ms < 0) return ''
  const mins = Math.floor(ms / 60_000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return iso.slice(0, 10)
}

function NewsTab({ cfg }: { cfg: GachaGameCfg }) {
  const qc = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: qk.gacha.news(cfg.id),
    queryFn: () => api.gacha.news(cfg.id)
  })
  const [busy, setBusy] = useState(false)

  async function fetchNow(): Promise<void> {
    setBusy(true)
    try {
      const res = await api.gacha.fetchNews(cfg.id)
      await qc.invalidateQueries({ queryKey: qk.gacha.news(cfg.id) })
      toast(
        res.added ? `${res.added} new post${res.added === 1 ? '' : 's'}` : 'Nothing new',
        'success'
      )
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
    }
  }

  const items = data?.items ?? []

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <button
          className="btn-primary"
          disabled={busy}
          title={`Pull the hot posts from r/${cfg.subreddit} now`}
          onClick={fetchNow}
        >
          {busy ? 'Fetching…' : '⇣ Fetch posts'}
        </button>
        <button
          className="chip hover:text-white"
          title="Open the subreddit in your browser"
          onClick={() => api.app.openExternal(`https://www.reddit.com/r/${cfg.subreddit}/`)}
        >
          r/{cfg.subreddit} ↗
        </button>
        {data?.fetchedAt && (
          <span className="text-xs text-gray-500">
            Last fetched {new Date(data.fetchedAt).toLocaleString()}
          </span>
        )}
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : items.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-lg font-medium mb-1">No posts yet</p>
          <p className="text-sm text-gray-500">
            Press “Fetch posts” to pull what's hot on r/{cfg.subreddit} — nothing updates on its
            own.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((n) => (
            <div key={n.id} className="card flex items-start gap-4 p-3">
              {n.imageUrl && (
                // Remote https thumbnail — allowed by CSP img-src; hidden on error.
                <img
                  src={n.imageUrl}
                  alt=""
                  loading="lazy"
                  className="h-20 w-28 shrink-0 rounded object-cover bg-base-700"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              )}
              <div className="min-w-0 flex-1">
                <button
                  className="block max-w-full text-left font-medium leading-snug hover:text-accent disabled:hover:text-inherit"
                  disabled={!n.url}
                  title={n.url ? 'Open on Reddit' : undefined}
                  onClick={() => n.url && api.app.openExternal(n.url)}
                >
                  {n.title}
                </button>
                <p className="mt-0.5 text-xs text-gray-500">
                  {n.author ? `u/${n.author}` : ''}
                  {n.author && n.publishedAt ? ' · ' : ''}
                  {n.publishedAt ? timeAgo(n.publishedAt) : ''}
                </p>
                {n.summary && (
                  <p className="mt-1 line-clamp-2 text-sm text-gray-400">{n.summary}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
