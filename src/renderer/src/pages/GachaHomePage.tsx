import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { Link } from 'react-router-dom'
import { GACHA_GAMES, type GachaGameCfg } from '@shared/gacha'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import CoverImage from '../components/CoverImage'
import type { GachaGameOverview } from '@shared/types'

// Gacha hub: one card per configured game (roster size, wallet, live banners).
// Games come straight from GACHA_GAMES — adding one to the config adds a card.
export default function GachaHomePage() {
  const { data: overview, isLoading } = useQuery({
    queryKey: qk.gacha.overview,
    queryFn: () => api.gacha.overview()
  })

  const { data: due } = useQuery({
    queryKey: qk.gacha.dueCounts,
    queryFn: () => api.gacha.dueCounts()
  })

  if (isLoading && !overview) return <PageStatus>Loading…</PageStatus>
  const byGame = new Map((overview ?? []).map((o) => [o.game, o]))

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Gacha"
        subtitle="The live-service games you play: roster, builds, wallet, banners and news per game."
      />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
        {GACHA_GAMES.map((g) => (
          <GameCard key={g.id} cfg={g} overview={byGame.get(g.id)} due={due?.[g.id] ?? 0} />
        ))}
      </div>
    </div>
  )
}

function GameCard({
  cfg,
  overview,
  due
}: {
  cfg: GachaGameCfg
  overview?: GachaGameOverview
  due: number
}) {
  const amounts = new Map((overview?.currencies ?? []).map((c) => [c.key, c.amount]))
  // Not a HubCard: these carry the user's per-game hero art (gacha_meta image),
  // so they keep the image-hero treatment — the media-card exception in the hub
  // family.
  return (
    <Link
      to={`/gacha/${cfg.id}`}
      className="card group block overflow-hidden transition-colors hover:border-accent/60"
    >
      <div className="relative h-36">
        {overview?.imagePath ? (
          <CoverImage
            path={overview.imagePath}
            alt={cfg.name}
            rounded="rounded-none"
            className="h-full w-full transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className="h-full w-full"
            style={{ background: `linear-gradient(135deg, ${cfg.color}2e, transparent 75%)` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-base-800 via-base-800/20 to-transparent" />
        {cfg.coach && due > 0 && (
          <span
            className="absolute right-2 top-2 rounded-full bg-red-600/90 px-2 py-0.5 text-[11px] font-semibold text-white"
            title={`${due} reminder${due === 1 ? '' : 's'} due`}
          >
            {due} due
          </span>
        )}
        <div className="absolute bottom-2 left-4 right-4">
          <p className="truncate text-lg font-semibold drop-shadow">{cfg.name}</p>
        </div>
      </div>
      <div className="p-4 pt-3">
        <p className="mb-2 text-xs text-gray-500">
          {overview?.unitCount ?? 0} in roster
          {overview?.activeBanners
            ? ` · ${overview.activeBanners} live banner${overview.activeBanners === 1 ? '' : 's'}`
            : ''}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {cfg.currencies.map((c) => (
            <span key={c.key} className="chip" title={c.label}>
              {c.label}: {(amounts.get(c.key) ?? 0).toLocaleString()}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
