import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  formatHistDate,
  formatOldStyle,
  formatSolarHijri,
  isProlepticSolarHijri
} from '@shared/history/calendars'
import { HOLDER_KINDS, type Claim, type HistDate, type Holder } from '@shared/history/schema'
import type { HistoryImage, HistoryRefInfo } from '@shared/types'
import { historyImageSrc, historyPath } from '../../lib/historyUi'
import { Cites } from './Citations'

// Small shared pieces of the History pages: images with credits, dates in
// every calendar a page shows, cited claims, and links to other entities.

export function HistoryImg({
  image,
  alt,
  className = '',
  width
}: {
  image: HistoryImage | null | undefined
  alt: string
  className?: string
  width?: number
}) {
  const src = historyImageSrc(image, width)
  const [failed, setFailed] = useState(false)
  useEffect(() => setFailed(false), [src])
  if (!src || failed) return <div className={`bg-base-700 ${className}`} aria-hidden="true" />
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />
}

export function ImageCredit({ image, className = '' }: { image: HistoryImage | null | undefined; className?: string }) {
  if (!image || (!image.credit && !image.license)) return null
  return (
    <span className={`media-contrast rounded bg-black/70 px-2 py-0.5 text-[10px] text-gray-300 ${className}`}>
      {[image.credit, image.license].filter(Boolean).join(' · ')}
    </span>
  )
}

/** Gregorian first; Solar Hijri and Old Style forms beneath when they apply. */
export function HistDateText({
  date,
  solarHijri,
  short,
  inline
}: {
  date: HistDate
  solarHijri?: boolean
  short?: boolean
  inline?: boolean
}) {
  const sh = solarHijri ? formatSolarHijri(date.d) : null
  const shUpper = solarHijri && date.notAfter ? formatSolarHijri(date.notAfter) : null
  const os = date.julian ? formatOldStyle(date.d) : null
  const extra = [
    sh && `${date.approx ? 'c. ' : ''}${sh}${shUpper ? ` to ${shUpper}` : ''} SH${isProlepticSolarHijri(date.d) ? ' (proleptic)' : ''}`,
    os && `${os} Old Style`
  ].filter(Boolean)
  return (
    <span className={inline ? '' : 'inline-flex flex-col'}>
      <span className="tabular-nums">{formatHistDate(date, { short })}</span>
      {extra.map((t) => (
        <span key={t} className={`tabular-nums text-ink-muted ${inline ? 'ml-2 text-[0.85em]' : 'text-xs'}`}>
          {inline ? `· ${t}` : t}
        </span>
      ))}
    </span>
  )
}

export function HolderNames({ holders }: { holders?: Holder[] }) {
  if (!holders?.length) return null
  return (
    <span className="text-xs text-ink-muted">
      held by{' '}
      {holders.map((h, i) => (
        <span key={i}>
          {i > 0 && ', '}
          {h.ref && historyPath(h.ref) ? (
            <Link to={historyPath(h.ref)!} className="hover:text-ink">
              {h.name}
            </Link>
          ) : (
            h.name
          )}
          {!h.ref && h.kind !== 'scholar' && <span className="text-ink-muted"> ({HOLDER_KINDS[h.kind].toLowerCase()})</span>}
        </span>
      ))}
    </span>
  )
}

/**
 * A cited claim. One value renders inline; when sources disagree every value
 * is listed with who holds it, and the claim is marked disputed.
 */
export function ClaimView<T>({
  claim,
  render
}: {
  claim: Claim<T> | undefined
  render: (value: T) => ReactNode
}) {
  if (!claim?.alts?.length) return null
  if (claim.alts.length === 1) {
    const a = claim.alts[0]
    return (
      <span>
        {render(a.value)}
        <Cites cites={a.cites} />
      </span>
    )
  }
  return (
    <span className="block">
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-signal-caution">
        Disputed · {claim.alts.length} sourced values
      </span>
      <span className="mt-1.5 block space-y-1.5">
        {claim.alts.map((a, i) => (
          <span key={i} className="block rounded-md border border-line-subtle px-2.5 py-1.5">
            <span className="text-ink">{render(a.value)}</span>
            <Cites cites={a.cites} />
            {a.heldBy && (
              <span className="block">
                <HolderNames holders={a.heldBy} />
              </span>
            )}
          </span>
        ))}
      </span>
    </span>
  )
}

export function DateClaim({
  claim,
  solarHijri,
  short
}: {
  claim: Claim<HistDate> | undefined
  solarHijri?: boolean
  short?: boolean
}) {
  return <ClaimView claim={claim} render={(d) => <HistDateText date={d} solarHijri={solarHijri} short={short} />} />
}

export function NativeName({ native, className = '' }: { native: { text: string; lang: string } | null; className?: string }) {
  if (!native) return null
  return (
    <span lang={native.lang} dir="auto" className={className}>
      {native.text}
    </span>
  )
}

/** A compact link to another entity: thumbnail, title, native name, years. */
export function RefRow({ info, extra }: { info: HistoryRefInfo; extra?: ReactNode }) {
  const to = historyPath(info.ref)
  const body = (
    <>
      <HistoryImg image={info.image} alt="" width={160} className="h-10 w-10 shrink-0 rounded-md" />
      <span className="min-w-0 flex-1">
        <span className={`block truncate text-sm font-medium ${info.missing ? 'text-ink-muted' : 'text-ink group-hover:text-accent'}`}>
          {info.title}
        </span>
        <span className="block truncate text-xs text-ink-muted">
          {[info.sub, info.years].filter(Boolean).join(' · ')}
          {info.native && (
            <>
              {' · '}
              <NativeName native={info.native} />
            </>
          )}
        </span>
      </span>
      {info.personal && <PersonalBadge />}
      {extra}
    </>
  )
  if (!to || info.missing) return <span className="flex items-center gap-3">{body}</span>
  return (
    <Link to={to} className="group flex items-center gap-3 rounded-md">
      {body}
    </Link>
  )
}

/** A larger card with the entity's image, for people and lead events. */
export function RefCard({
  info,
  aspect = 'aspect-[3/4]',
  caption
}: {
  info: HistoryRefInfo
  aspect?: string
  caption?: ReactNode
}) {
  const to = historyPath(info.ref)
  const inner = (
    <>
      <div className={`relative ${aspect} overflow-hidden rounded-lg border border-line-subtle bg-base-700`}>
        <HistoryImg image={info.image} alt="" width={320} className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none" />
        {info.personal && <PersonalBadge className="absolute left-1.5 top-1.5" />}
      </div>
      <p className="mt-2 text-sm font-medium leading-snug text-ink group-hover:text-accent">{info.title}</p>
      <NativeName native={info.native} className="block text-xs text-ink-secondary" />
      <p className="text-xs text-ink-muted">{caption ?? [info.sub, info.years].filter(Boolean).join(' · ')}</p>
    </>
  )
  if (!to || info.missing) return <div>{inner}</div>
  return (
    <Link to={to} className="group block">
      {inner}
    </Link>
  )
}

export function PersonalBadge({ className = '' }: { className?: string }) {
  return (
    <span className={`rounded bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent ${className}`}>
      Personal
    </span>
  )
}
