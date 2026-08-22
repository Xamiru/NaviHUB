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
//                top of it when a media type calls for an art-led header.
//
// Types without the flag keep the plain two-column header on MediaDetailPage.
//
// Hero art is `m.heroPath`, resolved by mediaRepo (imported banner → first Art
// tab image → null). With no usable art the 'banner' variant drops its strip
// outright (see useHeroArt); only 'backdrop' blurs the cover as an underlay.

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

// Wide-art availability. mediaUrl() is a synchronous string build with no
// existence check, so a heroPath whose file has since been deleted (or was
// never downloaded) still yields a URL — onError is what actually reports the
// failure (the CoverImage convention). Callers decide their own fallback:
// 'banner' DROPS its strip when there is no real art, because a 220px smear of
// the blurred cover reads as broken (reported 2026-08-22); 'backdrop' keeps
// its block either way — the title and actions sit on it.
function useHeroArt(m: MediaDetail): { url: string | null; ok: boolean; fail: () => void } {
  const url = useImageUrl(m.heroPath)
  const [failed, setFailed] = useState(false)
  // A new path is a fresh chance to load — clear a prior failure.
  useEffect(() => setFailed(false), [url])
  return { url, ok: !!url && !failed, fail: () => setFailed(true) }
}

// The blurred-cover underlay for the backdrop variant's no-art case.
function BlurredCover({ m }: { m: MediaDetail }) {
  const coverUrl = useImageUrl(m.coverPath)
  if (!coverUrl) return null
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

  const art = useHeroArt(m)

  // Is a page background set (Art tab → right-click → Set background)? Then
  // MediaDetailPage is already painting wide art behind this whole page, and a
  // hero that paints its own crop on top of it lands two different framings of
  // one file edge to edge — the seam reported on 2026-08-17. Each variant
  // answers that differently below: 'banner' drops its strip entirely (it was
  // only atmosphere, which the backdrop now provides), 'backdrop' keeps its
  // block but goes art-less (it carries the title, synopsis and actions).
  const onBackground = !!m.backgroundPath
  // The banner strip needs BOTH: no page background above it, and real wide
  // art to paint. (The backdrop variant ignores this — its block carries text.)
  const showStrip = !onBackground && art.ok

  if (variant === 'backdrop') {
    return (
      <div className={`relative h-[420px] ${onBackground ? '' : 'bg-base-700'}`}>
        {!onBackground && (art.ok ? (
          <img
            src={art.url ?? undefined}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            decoding="async"
            draggable={false}
            onError={art.fail}
          />
        ) : (
          <BlurredCover m={m} />
        ))}
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
      {/* The strip renders only when real wide art exists AND no page
          background is set. Either absence drops it outright rather than
          showing through it or smearing the cover up: a 220px strip of blurred
          cover reads as broken (reported 2026-08-22), and keeping empty space
          just to preserve the overhang would be a hole in the page. Back moves
          inline, since it lived on the strip; the cover row swaps `-mt-24` for
          `mt-4` (nothing left to hang off). */}
      {showStrip && (
        <div className="relative h-[220px] bg-base-700">
          <img
            src={art.url ?? undefined}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            decoding="async"
            draggable={false}
            onError={art.fail}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base-900 via-base-900/40 to-transparent" />
          <div className="absolute left-6 top-4 z-10">
            <BackButton overlay />
          </div>
        </div>
      )}

      <div className="mx-auto max-w-5xl px-6">
        {!showStrip && (
          <div className="pt-4">
            <BackButton overlay />
          </div>
        )}
        <div className={`flex flex-wrap items-end gap-5 ${showStrip ? '-mt-24' : 'mt-4'}`}>
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
