import { useEffect, useState, type ReactNode } from 'react'
import CoverImage from './CoverImage'
import BackButton from './BackButton'
import { useImageUrl } from '../lib/hooks'
import type { MediaConfig } from '../lib/mediaConfig'
import type { MediaDetail } from '@shared/types'

// The art-led detail header, in the two shapes `MediaConfig.detailHero` selects:
//
//   'banner'   — a shallow strip of wide art with the cover hanging off its
//                bottom edge, then the title block beside it (anime, VNs: the
//                cover is the thing you recognise, the banner is atmosphere).
//   'backdrop' — a tall cinematic still with the title and actions sitting on
//                top of it (movies: the still IS the identity, and there is one
//                obvious action).
//
// Types without the flag keep the plain two-column header on MediaDetailPage.
//
// Hero art is `m.heroPath`, resolved by mediaRepo (imported banner → first Art
// tab image → null). When it is null we blur the cover up as the backdrop, so a
// title that has never been re-imported still gets a hero rather than a hole.

export type HeroVariant = 'banner' | 'backdrop'

interface Props {
  cfg: MediaConfig
  m: MediaDetail
  variant: HeroVariant
  // The page's action stack (Play / Log / Edit / lists / torrents / More).
  actions: ReactNode
  // Community + personal stats. Rendered as a strip under the banner variant,
  // and inline in the meta line for backdrop.
  stats: ReactNode
}

// The art itself, or the cover blurred up when there is none.
//
// mediaUrl() is a synchronous string build with no existence check, so a
// heroPath whose file has since been deleted still yields a URL — onError is
// what actually falls through to the blurred cover (the CoverImage convention).
function HeroArt({ m }: { m: MediaDetail }) {
  const heroUrl = useImageUrl(m.heroPath)
  const coverUrl = useImageUrl(m.coverPath)
  const [heroFailed, setHeroFailed] = useState(false)
  // A new path is a fresh chance to load — clear a prior failure.
  useEffect(() => setHeroFailed(false), [heroUrl])

  if (heroUrl && !heroFailed) {
    return (
      <img
        src={heroUrl}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        decoding="async"
        draggable={false}
        onError={() => setHeroFailed(true)}
      />
    )
  }
  if (coverUrl) {
    return (
      <img
        src={coverUrl}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
        decoding="async"
        draggable={false}
      />
    )
  }
  return null
}

function year(date: string | null): string | null {
  return date ? date.slice(0, 4) : null
}

// The chip row both variants share: what it is, when it came out, where you are.
function heroChips(cfg: MediaConfig, m: MediaDetail): string[] {
  return [
    cfg.singular,
    year(m.releaseDate),
    m.status,
    m.totalUnits != null && cfg.unitProgress ? cfg.formatProgressStat(m) : null
  ].filter((s): s is string => !!s)
}

export default function MediaHero({ cfg, m, variant, actions, stats }: Props) {
  const chips = heroChips(cfg, m)
  // Only unit-counted types get a bar — a VN's minutes and a game's hours have
  // no meaningful denominator (playing past the average is normal).
  const pct =
    cfg.unitProgress && m.totalUnits
      ? Math.min(100, Math.round((m.progress / m.totalUnits) * 100))
      : null

  // Is a page background set (Art tab → right-click → Set background)? Then
  // MediaDetailPage is already painting wide art behind this whole page, and a
  // hero that paints its own crop on top of it lands two different framings of
  // one file edge to edge — the seam reported on 2026-08-17. Each variant
  // answers that differently below: 'banner' drops its strip entirely (it was
  // only atmosphere, which the backdrop now provides), 'backdrop' keeps its
  // block but goes art-less (it carries the title, synopsis and actions).
  const onBackground = !!m.backgroundPath

  if (variant === 'backdrop') {
    return (
      <div className={`relative h-[420px] ${onBackground ? '' : 'bg-base-700'}`}>
        {!onBackground && <HeroArt m={m} />}
        {/* Two scrims: vertical so the text block sits on near-black, horizontal
            so the left edge stays readable over a busy still. */}
        <div className="absolute inset-0 bg-gradient-to-t from-base-900 via-base-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-base-900 via-base-900/30 to-transparent" />
        <div className="absolute left-6 top-4 z-10">
          <BackButton overlay />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-8">
          <div className="mx-auto max-w-5xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent">
              {[cfg.singular, year(m.releaseDate)].filter(Boolean).join(' · ')}
            </p>
            <div className="mt-1 flex items-start gap-2">
              <h1 className="max-w-2xl text-4xl font-bold leading-tight">{m.title}</h1>
              {m.favorite && (
                <span className="text-xl text-yellow-400" title="Favorite">
                  ★
                </span>
              )}
            </div>
            {m.titleOriginal && <p className="mt-1 text-sm text-gray-400">{m.titleOriginal}</p>}
            {m.synopsis && (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-300 line-clamp-2">
                {m.synopsis}
              </p>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">{stats}</div>
            <div className="mt-4 flex flex-wrap items-center gap-2">{actions}</div>
            {pct != null && (
              <div className="mt-4 h-1 w-64 max-w-full rounded-full bg-base-700">
                <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* The strip is pure atmosphere, so a page background replaces it outright
          rather than showing through it: the backdrop IS the wide art now, and
          keeping 220px of empty space above the cover just to preserve the
          overhang would be a hole in the page. Back moves inline, since it lived
          on the strip. (The 'backdrop' variant above keeps its block either way —
          the title, synopsis and actions sit on it, so it is not decoration.) */}
      {!onBackground && (
        <div className="relative h-[220px] bg-base-700">
          <HeroArt m={m} />
          <div className="absolute inset-0 bg-gradient-to-t from-base-900 via-base-900/40 to-transparent" />
          <div className="absolute left-6 top-4 z-10">
            <BackButton overlay />
          </div>
        </div>
      )}

      <div className="mx-auto max-w-5xl px-6">
        {onBackground && (
          <div className="pt-4">
            <BackButton overlay />
          </div>
        )}
        {/* Without a background the cover hangs off the banner's bottom edge —
            the overlap is the whole point of this variant, so the negative
            margin is load-bearing. With one there is no edge to hang off. */}
        <div
          className={`flex flex-wrap items-end gap-5 ${onBackground ? 'mt-4' : '-mt-24'}`}
        >
          <CoverImage
            path={m.coverPath}
            alt={m.title}
            rounded="rounded-xl"
            className="h-[240px] w-[160px] shrink-0 ring-1 ring-base-700"
          />
          <div className="min-w-0 flex-1 pb-1">
            <div className="flex flex-wrap items-center gap-1.5">
              {chips.map((c) => (
                <span key={c} className="chip">
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-1.5 flex items-start gap-2">
              <h1 className="text-3xl font-bold">{m.title}</h1>
              {m.favorite && (
                <span className="text-xl text-yellow-400" title="Favorite">
                  ★
                </span>
              )}
            </div>
            {m.titleOriginal && <p className="text-sm text-gray-500">{m.titleOriginal}</p>}
            <div className="mt-3 flex flex-wrap items-center gap-2">{actions}</div>
          </div>
        </div>

        {pct != null && (
          <div className="mt-4 h-1 rounded-full bg-base-700">
            <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
          </div>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">{stats}</div>
      </div>
    </div>
  )
}
