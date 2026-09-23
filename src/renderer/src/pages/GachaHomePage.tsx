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
  const totalDue = Object.values(due ?? {}).reduce((sum, count) => sum + (count ?? 0), 0)
  const games = [...GACHA_GAMES].sort(
    (a, b) => (due?.[b.id] ?? 0) - (due?.[a.id] ?? 0)
  )
  const coach = GACHA_GAMES.find((game) => game.coach)

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Operations board"
        subtitle="Every live-service game reduced to what is due, changing and worth opening."
        actions={
          coach ? (
            <Link to={`/gacha/${coach.id}/coach`} className="btn-primary">
              Open {coach.short} coach
            </Link>
          ) : undefined
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className={`card border-t p-5 ${totalDue > 0 ? 'border-t-accent' : 'border-t-base-600'}`}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">Due now</p>
          <p className={`mt-2 text-3xl font-semibold tabular-nums ${totalDue > 0 ? 'text-accent' : ''}`}>
            {totalDue}
          </p>
          <p className="mt-1 text-xs text-gray-500">Reminders across every game</p>
        </div>
        <div className="card border-t border-t-base-600 p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">Tracked games</p>
          <p className="mt-2 text-3xl font-semibold tabular-nums">{GACHA_GAMES.length}</p>
          <p className="mt-1 text-xs text-gray-500">One local operations surface</p>
        </div>
        <div className="card border-t border-t-base-600 p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">Roster total</p>
          <p className="mt-2 text-3xl font-semibold tabular-nums">
            {(overview ?? []).reduce((sum, game) => sum + game.unitCount, 0)}
          </p>
          <p className="mt-1 text-xs text-gray-500">Owned and catalogued units</p>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
        {games.map((g) => (
          <GameCard key={g.id} cfg={g} overview={byGame.get(g.id)} due={due?.[g.id] ?? 0} />
        ))}
      </div>

      <section className="card mt-6 p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
              Across games
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Operational pressure</h2>
          </div>
          <span className="text-sm text-gray-500">Due work sorts the board automatically</span>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {games.map((game) => {
            const count = due?.[game.id] ?? 0
            return (
              <Link
                key={game.id}
                to={`/gacha/${game.id}`}
                className="rounded-md border border-base-700 p-4 transition-colors hover:border-accent"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium">{game.short}</span>
                  <span className={count > 0 ? 'text-sm text-accent' : 'text-sm text-gray-500'}>
                    {count > 0 ? `${count} due` : 'Clear'}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
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
            className="absolute right-2 top-2 rounded-full media-contrast bg-red-600/90 px-2 py-0.5 text-[11px] font-semibold text-white"
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
