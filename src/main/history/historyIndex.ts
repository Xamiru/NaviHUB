// PURE: builds the History section's in-memory index from the committed
// catalog plus this machine's personal entities, and resolves references into
// the display records every page uses. No electron, filesystem or database
// imports — historyService.ts supplies those, and tests feed fixtures.

import { decimalYear, formatHistDate } from '@shared/history/calendars'
import { buildCatalog, lookup, type CatalogEntry, type HistoryCatalog } from '@shared/history/model'
import {
  EVENT_TYPES,
  INTERPRETATION_TOPICS,
  PERIOD_TYPES,
  PERSON_ROLES,
  PLACE_TYPES,
  SOURCE_TYPES,
  nativeName,
  parseRef,
  primaryName,
  refOf,
  type Claim,
  type HistDate,
  type HistoryArticle,
  type HistoryEntity,
  type ImageRef,
  type LICENSES,
  type RegionKey
} from '@shared/history/schema'
import { prepareDocs, type PreparedDoc } from '@shared/history/search'
import type { HistoryImage, HistoryParticipation, HistoryRefInfo, HistoryUserEntity } from '@shared/types'

export interface TimelineEntry {
  ref: string
  kind: 'event' | 'period'
  title: string
  native: string | null
  typeLabel: string
  s: number
  e: number | null
  lane: RegionKey
  regions: RegionKey[]
  prominence: 1 | 2 | 3
  personal: boolean
}

export interface MediaLinkPointer {
  mediaId: string
  link: number
}

export interface HistoryIndex {
  catalog: HistoryCatalog
  /** Refs of the user's personal entities. */
  personal: Set<string>
  events: TimelineEntry[]
  periods: TimelineEntry[]
  childrenOf: Map<string, string[]>
  inbound: Map<string, Array<{ ref: string; rel: string }>>
  personEvents: Map<string, HistoryParticipation[]>
  interpretationsAbout: Map<string, string[]>
  mediaByTarget: Map<string, MediaLinkPointer[]>
  mediaByPortrayed: Map<string, MediaLinkPointer[]>
  /** source id -> citing ref -> number of quotes and claims citing it. */
  citedBy: Map<string, Map<string, number>>
  quoteCount: number
  docs: PreparedDoc[]
}

/** First alternative's value: the primary reading of a claim. */
export function firstValue<T>(c: Claim<T> | undefined): T | undefined {
  return c?.alts?.[0]?.value
}

function startYear(c: Claim<HistDate> | undefined): number | null {
  const v = firstValue(c)
  return v ? decimalYear(v.d) : null
}

function endYear(c: Claim<HistDate> | undefined): number | null {
  const v = firstValue(c)
  return v ? decimalYear(v.notAfter ?? v.d, 'end') : null
}

function yearOfDate(h: HistDate | undefined, short = true): string | null {
  if (!h) return null
  const y = h.d.replace(/^(-?\d{4}).*$/, '$1')
  return formatHistDate({ ...h, d: y, notAfter: h.notAfter?.replace(/^(-?\d{4}).*$/, '$1') }, { short })
}

/** "1978 to 1979", "1953", "1902 to 1989", "born 1919". */
export function yearsLabel(e: HistoryEntity): string | null {
  switch (e.kind) {
    case 'event':
    case 'period': {
      const a = yearOfDate(firstValue(e.start))
      const b = yearOfDate(firstValue(e.end))
      if (!a) return null
      return b && b !== a ? `${a} to ${b}` : a
    }
    case 'person': {
      const a = yearOfDate(firstValue(e.born))
      const b = yearOfDate(firstValue(e.died))
      if (a && b) return `${a} to ${b}`
      if (a) return `born ${a}`
      if (b) return `died ${b}`
      return null
    }
    case 'source':
      return e.date.slice(0, 4)
    default:
      return null
  }
}

export function subLabel(e: HistoryEntity): string | null {
  switch (e.kind) {
    case 'event':
      return EVENT_TYPES[e.type] ?? null
    case 'period':
      return PERIOD_TYPES[e.periodType] ?? null
    case 'person':
      return e.roles.map((r) => PERSON_ROLES[r]).filter(Boolean).join(', ') || null
    case 'place':
      return PLACE_TYPES[e.placeType] ?? null
    case 'source':
      return SOURCE_TYPES[e.type] ?? null
    case 'interpretation':
      return INTERPRETATION_TOPICS[e.topic] ?? null
    default:
      return null
  }
}

export function titleOf(e: HistoryEntity): string {
  switch (e.kind) {
    case 'source':
      return e.title
    case 'interpretation':
      return INTERPRETATION_TOPICS[e.topic] ?? e.id
    case 'media':
      return e.title.title
    default:
      return primaryName(e)
  }
}

export function imageOfEntity(e: HistoryEntity): ImageRef | undefined {
  if (e.kind === 'event' || e.kind === 'period') return e.hero
  if (e.kind === 'person') return e.portrait
  return undefined
}

export type CachedLookup = (url: string) => string | null

const LICENSE_LABEL: Record<string, string> = {
  'public-domain': 'Public domain',
  cc0: 'CC0',
  'cc-by': 'CC BY',
  'cc-by-sa': 'CC BY-SA',
  'cc-by-nc': 'CC BY-NC',
  'cc-by-nc-sa': 'CC BY-NC-SA',
  'cc-by-nd': 'CC BY-ND',
  'cc-by-nc-nd': 'CC BY-NC-ND',
  'open-government': 'Open government licence',
  copyrighted: 'All rights reserved'
} satisfies Record<keyof typeof LICENSES, string>

export function licenseLabel(l: { id: string; version?: string } | undefined): string | null {
  if (!l) return null
  const base = LICENSE_LABEL[l.id] ?? l.id
  return l.version ? `${base} ${l.version}` : base
}

export function toImage(img: ImageRef | undefined, cached: CachedLookup): HistoryImage | null {
  if (!img) return null
  const credit = [img.credit.creator, img.credit.institution].filter(Boolean).join(', ') || null
  return {
    url: img.url,
    cached: cached(img.url),
    credit,
    license: licenseLabel(img.license),
    page: img.page ?? null,
    title: img.title ?? null
  }
}

export function refInfo(index: HistoryIndex, ref: string, cached: CachedLookup): HistoryRefInfo {
  const p = parseRef(ref)
  const e = lookup(index.catalog, ref)
  if (!p || !e) {
    return {
      ref,
      kind: p?.kind ?? 'event',
      title: p?.id ?? ref,
      native: null,
      years: null,
      sub: null,
      image: null,
      region: null,
      personal: false,
      missing: true
    }
  }
  const native = 'names' in e ? nativeName(e) : undefined
  const regions = 'regions' in e ? e.regions : undefined
  return {
    ref,
    kind: e.kind,
    title: titleOf(e),
    native: native ? { text: native.text, lang: native.lang } : null,
    years: yearsLabel(e),
    sub: subLabel(e),
    image: toImage(imageOfEntity(e), cached),
    region: regions?.[0] ?? null,
    personal: index.personal.has(ref),
    missing: false
  }
}

function push<K, V>(m: Map<K, V[]>, k: K, v: V): void {
  const list = m.get(k)
  if (list) list.push(v)
  else m.set(k, [v])
}

function timelineEntry(e: HistoryArticle, personal: boolean): TimelineEntry | null {
  if (e.kind !== 'event' && e.kind !== 'period') return null
  const s = startYear(e.start)
  if (s === null) return null
  const endVal = endYear(e.end)
  // A dated event with no end is a point; a year- or month-precision start
  // alone still marks a point at its first day.
  const e2 = endVal !== null && endVal > s ? endVal : null
  return {
    ref: refOf(e.kind, e.id),
    kind: e.kind,
    title: primaryName(e),
    native: nativeName(e)?.text ?? null,
    typeLabel: e.kind === 'event' ? EVENT_TYPES[e.type] : PERIOD_TYPES[e.periodType],
    s,
    e: e2,
    lane: e.regions[0],
    regions: [...e.regions],
    prominence: e.prominence,
    personal
  }
}

function countCites(index: HistoryIndex, ref: string, node: unknown): void {
  if (!node || typeof node !== 'object') return
  if (Array.isArray(node)) {
    for (const n of node) countCites(index, ref, n)
    return
  }
  const obj = node as Record<string, unknown>
  if (typeof obj.source === 'string' && obj.loc && typeof obj.loc === 'object') {
    let m = index.citedBy.get(obj.source)
    if (!m) index.citedBy.set(obj.source, (m = new Map()))
    m.set(ref, (m.get(ref) ?? 0) + 1)
    return
  }
  // A quote has an id; its translation (same shape, no id) is not counted again.
  if (typeof obj.id === 'string' && typeof obj.text === 'string' && obj.cite && obj.provenance) index.quoteCount++
  for (const v of Object.values(obj)) countCites(index, ref, v)
}

export function buildIndex(entries: CatalogEntry[], personal: HistoryUserEntity[] = []): HistoryIndex {
  // Personal ids are `my-` prefixed and the validator reserves that prefix, so
  // the two sets never collide.
  const all = [...entries.map((e) => e.entity), ...personal]
  const index: HistoryIndex = {
    catalog: buildCatalog(all),
    personal: new Set(personal.map((e) => refOf(e.kind, e.id))),
    events: [],
    periods: [],
    childrenOf: new Map(),
    inbound: new Map(),
    personEvents: new Map(),
    interpretationsAbout: new Map(),
    mediaByTarget: new Map(),
    mediaByPortrayed: new Map(),
    citedBy: new Map(),
    quoteCount: 0,
    docs: []
  }
  const c = index.catalog
  const docs: Parameters<typeof prepareDocs>[0] = []

  for (const e of [...c.events.values(), ...c.periods.values(), ...c.people.values(), ...c.places.values()]) {
    const ref = refOf(e.kind, e.id)
    const isPersonal = index.personal.has(ref)
    const t = timelineEntry(e, isPersonal)
    if (t) (t.kind === 'event' ? index.events : index.periods).push(t)
    if (e.kind === 'event') {
      e.partOf?.forEach((p) => push(index.childrenOf, p.ref, ref))
      e.related?.forEach((r) => push(index.inbound, r.ref, { ref, rel: r.rel }))
      e.participants?.forEach((p) => {
        if (p.ref) push(index.personEvents, p.ref, { ref, role: p.role, side: p.side ?? null })
      })
    }
    if (e.kind === 'period' && e.parent) push(index.childrenOf, e.parent, ref)
    countCites(index, ref, e)
    docs.push({
      ref,
      kind: e.kind,
      title: primaryName(e),
      subtitle: [subLabel(e), yearsLabel(e)].filter(Boolean).join(' · ') || undefined,
      names: e.names.flatMap((n) => [n.text, n.translit ?? '']).filter(Boolean),
      text: ('sections' in e ? e.sections ?? [] : []).flatMap((s) => s.quotes.map((q) => q.text))
    })
  }
  for (const s of c.sources.values()) {
    docs.push({
      ref: refOf('source', s.id),
      kind: 'source',
      title: s.title,
      subtitle: [s.contributors.map((x) => x.name).join(', '), s.date.slice(0, 4)].filter(Boolean).join(' · ') || undefined,
      names: [s.title, ...s.contributors.flatMap((x) => [x.name, x.nameNative ?? ''])].filter(Boolean)
    })
  }
  for (const i of c.interpretations.values()) {
    const ref = refOf('interpretation', i.id)
    i.about.forEach((a) => push(index.interpretationsAbout, a, i.id))
    countCites(index, ref, i)
  }
  for (const m of c.media.values()) {
    const ref = refOf('media', m.id)
    m.links.forEach((l, link) => {
      push(index.mediaByTarget, l.target, { mediaId: m.id, link })
      l.portrayals?.forEach((p) => push(index.mediaByPortrayed, p.person, { mediaId: m.id, link }))
    })
    countCites(index, ref, m)
  }
  index.events.sort((a, b) => a.s - b.s)
  index.periods.sort((a, b) => a.s - b.s)
  index.docs = prepareDocs(docs)
  return index
}

/** Do two decimal-year spans overlap? A point is a zero-length span. */
export function overlaps(a: { s: number; e: number | null }, b: { s: number; e: number | null }): boolean {
  const ae = a.e ?? a.s
  const be = b.e ?? b.s
  return a.s <= be && b.s <= ae
}

export function lifespan(e: HistoryEntity): { s: number; e: number | null } | null {
  if (e.kind === 'person') {
    const s = startYear(e.born)
    if (s === null) return null
    return { s, e: endYear(e.died) }
  }
  if (e.kind === 'event' || e.kind === 'period') {
    const s = startYear(e.start)
    if (s === null) return null
    return { s, e: endYear(e.end) }
  }
  return null
}
