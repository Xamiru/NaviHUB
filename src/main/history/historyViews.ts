// PURE: the History pages' payloads, computed from the index plus whatever
// this machine knows (marks, library matches, archive rows), all passed in.
// historyService.ts wires the real lookups; tests pass fakes.

import { formatHistDate } from '@shared/history/calendars'
import { lookup } from '@shared/history/model'
import {
  REGIONS,
  mediaFileId,
  parseRef,
  primaryName,
  refOf,
  type ArchiveKind,
  type Claim,
  type HistDate,
  type HistoryArticle,
  type HistoryEntity,
  type HistoryInterpretation,
  type HistoryMedia,
  type HistorySource,
  type MediaLink,
  type RegionKey
} from '@shared/history/schema'
import { searchDocs } from '@shared/history/search'
import type {
  HistoryArchiveItem,
  HistoryArticleView,
  HistoryDecade,
  HistoryMark,
  HistoryMediaBacklink,
  HistoryMediaCard,
  HistoryNote,
  HistoryMapPin,
  HistoryOverview,
  HistoryRefInfo,
  HistoryRuler,
  HistoryOnThisDay,
  HistoryThemeRow,
  HistoryMapPolity,
  HistorySearchHit,
  HistorySourceRow,
  HistorySourceView,
  HistoryTimelineItem,
  MediaType
} from '@shared/types'
import {
  firstValue,
  imageOfEntity,
  lifespan,
  overlaps,
  refInfo,
  toImage,
  titleOf,
  type CachedLookup,
  type HistoryIndex,
  type MediaLinkPointer,
  type TimelineEntry
} from './historyIndex'

export interface LibraryItem {
  id: number
  title: string
  mediaType: MediaType
  year: number | null
  cover: string | null
  status: string | null
  source: string | null
  externalId: string | null
}

export interface CastRow {
  characterId: number | null
  characterName: string | null
  personId: number
  personName: string
  photo: string | null
}

export interface LibraryPort {
  byExternal(keys: Array<{ mediaType: MediaType; source: string; externalId: string }>): Map<string, LibraryItem>
  byIds(ids: number[]): Map<number, LibraryItem>
  cast(mediaIds: number[]): Map<number, CastRow[]>
}

export const externalKey = (k: { mediaType: string; source: string; externalId: string }): string =>
  `${k.source}|${k.mediaType}|${k.externalId}`

export interface PersonalLink {
  id: number
  ref: string
  mediaId: number
  kind: string
}

export interface ArchiveFile {
  id: number
  ref: string
  kind: ArchiveKind
  relPath: string
  title: string
  credit: string | null
  license: string | null
  page: string | null
  suggestionKey: string | null
  bytes: number | null
}

export interface ViewContext {
  marks: Map<string, HistoryMark>
  cached: CachedLookup
  library: LibraryPort
  personalLinks: PersonalLink[]
  archive: ArchiveFile[]
  fileExists: (relPath: string) => boolean
}

const isRead = (ctx: Pick<ViewContext, 'marks'>, ref: string): boolean => !!ctx.marks.get(ref)?.read

type TimelineCtx = Pick<ViewContext, 'marks'> & { cached?: CachedLookup }

function timelineItem(index: HistoryIndex, t: TimelineEntry, ctx: TimelineCtx): HistoryTimelineItem {
  const e = lookup(index.catalog, t.ref)
  return { ...t, read: isRead(ctx, t.ref), image: e ? toImage(imageOfEntity(e), ctx.cached ?? (() => null)) : null }
}

// ---- overview ----

export function overview(index: HistoryIndex, ctx: TimelineCtx): HistoryOverview {
  const items = index.events.map((t) => timelineItem(index, t, ctx))
  const periods = index.periods.map((t) => timelineItem(index, t, ctx))
  const decades = new Map<number, { events: number; read: number }>()
  for (const t of items) {
    const d = Math.floor(t.s / 10) * 10
    const row = decades.get(d) ?? { events: 0, read: 0 }
    row.events++
    if (t.read) row.read++
    decades.set(d, row)
  }
  const spans = [...items, ...periods]
  const range = spans.length
    ? { min: Math.min(...spans.map((t) => t.s)), max: Math.max(...spans.map((t) => t.e ?? t.s)) }
    : null
  const c = index.catalog
  const read = [...ctx.marks.entries()].filter(([ref, m]) => m.read && lookup(c, ref)).length
  return {
    items,
    periods,
    decades: [...decades.entries()].sort((a, b) => a[0] - b[0]).map(([start, v]) => ({ start, ...v })),
    counts: {
      events: c.events.size,
      people: c.people.size,
      periods: c.periods.size,
      sources: c.sources.size,
      quotes: index.quoteCount,
      read,
      personal: index.personal.size
    },
    range
  }
}

// ---- media cards ----

function mediaCards(
  index: HistoryIndex,
  pointers: MediaLinkPointer[],
  personal: PersonalLink[],
  ctx: ViewContext
): HistoryMediaCard[] {
  const curated: Array<{ media: HistoryMedia; link: MediaLink }> = []
  const seen = new Set<string>()
  for (const p of pointers) {
    const key = `${p.mediaId}#${p.link}`
    if (seen.has(key)) continue
    seen.add(key)
    const media = index.catalog.media.get(p.mediaId)
    if (media?.links[p.link]) curated.push({ media, link: media.links[p.link] })
  }
  const owned = ctx.library.byExternal(curated.map((c) => c.media.title))
  const mine = ctx.library.byIds(personal.map((l) => l.mediaId))
  const libraryIds = [
    ...curated.map((c) => owned.get(externalKey(c.media.title))?.id),
    ...personal.map((l) => l.mediaId)
  ].filter((x): x is number => typeof x === 'number')
  const cast = ctx.library.cast([...new Set(libraryIds)])
  const norm = (s: string): string => s.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim()

  const cards: HistoryMediaCard[] = curated.map(({ media, link }) => {
    const lib = owned.get(externalKey(media.title)) ?? null
    const rows = lib ? cast.get(lib.id) ?? [] : []
    return {
      key: `${media.id}#${link.target}#${link.kind}`,
      origin: 'curated',
      personalLinkId: null,
      mediaType: media.title.mediaType,
      source: media.title.source,
      externalId: media.title.externalId,
      title: media.title.title,
      year: media.title.year ?? null,
      poster: media.title.posterUrl ?? null,
      posterCached: media.title.posterUrl ? ctx.cached(media.title.posterUrl) : null,
      library: lib ? { id: lib.id, cover: lib.cover, status: lib.status } : null,
      kind: link.kind,
      target: refInfo(index, link.target, ctx.cached),
      accuracy: link.accuracy ?? [],
      portrayals: (link.portrayals ?? []).map((p) => ({
        person: refInfo(index, p.person, ctx.cached),
        characterName: p.characterName ?? null,
        actors: p.characterName
          ? rows
              .filter((r) => r.characterName && norm(r.characterName) === norm(p.characterName!))
              .map((r) => ({ personId: r.personId, name: r.personName, characterId: r.characterId, photo: r.photo }))
          : []
      }))
    }
  })
  for (const l of personal) {
    const lib = mine.get(l.mediaId)
    if (!lib) continue
    cards.push({
      key: `mine-${l.id}`,
      origin: 'personal',
      personalLinkId: l.id,
      mediaType: lib.mediaType,
      source: lib.source,
      externalId: lib.externalId,
      title: lib.title,
      year: lib.year,
      poster: null,
      posterCached: null,
      library: { id: lib.id, cover: lib.cover, status: lib.status },
      kind: l.kind as HistoryMediaCard['kind'],
      target: refInfo(index, l.ref, ctx.cached),
      accuracy: [],
      portrayals: []
    })
  }
  return cards
}

// ---- decade ----

function startOf(t: TimelineEntry): number {
  return t.s
}

export function decade(index: HistoryIndex, start: number, ctx: ViewContext): HistoryDecade {
  const inDecade = index.events.filter((t) => startOf(t) >= start && startOf(t) < start + 10)
  const hasImage = (ref: string): number => {
    const e = lookup(index.catalog, ref)
    return e && imageOfEntity(e) ? 0 : 1
  }
  const ordered = [...inDecade].sort(
    (a, b) => a.prominence - b.prominence || hasImage(a.ref) - hasImage(b.ref) || a.s - b.s
  )
  const lead = ordered.slice(0, 3)
  const rest = ordered.slice(3).sort((a, b) => a.s - b.s)
  const byRegion = REGIONS.map((r) => ({
    region: r.key as RegionKey,
    items: rest.filter((t) => t.lane === r.key).map((t) => refInfo(index, t.ref, ctx.cached))
  })).filter((g) => g.items.length > 0)

  const born: HistoryRefInfo[] = []
  const died: HistoryRefInfo[] = []
  for (const p of index.catalog.people.values()) {
    const ref = refOf('person', p.id)
    const b = firstValue(p.born)?.d
    const d = firstValue(p.died)?.d
    const year = (s?: string): number | null => (s ? Number(s.slice(0, s.startsWith('-') ? 5 : 4)) : null)
    const by = year(b)
    const dy = year(d)
    if (by !== null && by >= start && by < start + 10) born.push(refInfo(index, ref, ctx.cached))
    if (dy !== null && dy >= start && dy < start + 10) died.push(refInfo(index, ref, ctx.cached))
  }
  const continuing = index.events
    .filter((t) => startOf(t) < start && t.e !== null && t.e >= start)
    .sort((a, b) => a.prominence - b.prominence || a.s - b.s)
  const refs = new Set([...inDecade, ...continuing].map((t) => t.ref))
  const pointers = [...refs].flatMap((r) => index.mediaByTarget.get(r) ?? [])
  const personal = ctx.personalLinks.filter((l) => refs.has(l.ref))
  const media = mediaCards(index, pointers, personal, ctx)
  // One card per title on a decade page.
  const uniq = new Map<string, HistoryMediaCard>()
  for (const m of media) {
    const k = m.library ? `lib-${m.library.id}` : `${m.source}|${m.mediaType}|${m.externalId}`
    if (!uniq.has(k)) uniq.set(k, m)
  }
  return {
    start,
    lead: lead.map((t) => refInfo(index, t.ref, ctx.cached)),
    byRegion,
    continuing: continuing.map((t) => refInfo(index, t.ref, ctx.cached)),
    born,
    died,
    media: [...uniq.values()],
    read: inDecade.filter((t) => isRead(ctx, t.ref)).length,
    total: inDecade.length
  }
}

// ---- article ----

const ARTICLE_KINDS: ReadonlySet<string> = new Set(['event', 'person', 'period', 'place', 'polity', 'theme'])

/** Every `ref`/`target`/`about`/`person`/`parent` string the entity mentions. */
function collectRefs(node: unknown, out: Set<string>): void {
  if (!node || typeof node !== 'object') return
  if (Array.isArray(node)) {
    for (const n of node) collectRefs(n, out)
    return
  }
  for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
    if (typeof v === 'string' && ['ref', 'target', 'person', 'parent'].includes(k) && parseRef(v)) out.add(v)
    else if (k === 'about' && Array.isArray(v)) v.forEach((x) => typeof x === 'string' && parseRef(x) && out.add(x))
    else collectRefs(v, out)
  }
}

/** Source ids in order of first citation, walking the page in display order. */
function collectSources(node: unknown, out: string[], seen: Set<string>): void {
  if (!node || typeof node !== 'object') return
  if (Array.isArray(node)) {
    for (const n of node) collectSources(n, out, seen)
    return
  }
  const obj = node as Record<string, unknown>
  if (typeof obj.source === 'string' && obj.loc && typeof obj.loc === 'object') {
    if (!seen.has(obj.source)) {
      seen.add(obj.source)
      out.push(obj.source)
    }
    return
  }
  for (const v of Object.values(obj)) collectSources(v, out, seen)
}

/** Display order of an article's cited fields; anything else follows. */
const ARTICLE_ORDER = [
  'names',
  'start',
  'end',
  'born',
  'died',
  'places',
  'bornIn',
  'diedIn',
  'partOf',
  'sides',
  'participants',
  'figures',
  'offices',
  'coords',
  'sections',
  'course',
  'related'
]

function orderedFields(e: HistoryEntity): unknown[] {
  const obj = e as unknown as Record<string, unknown>
  const rest = Object.keys(obj).filter((k) => !ARTICLE_ORDER.includes(k))
  return [...ARTICLE_ORDER, ...rest].map((k) => obj[k])
}

function archiveItems(entity: HistoryArticle, ref: string, ctx: ViewContext): HistoryArchiveItem[] {
  const rows = ctx.archive.filter((r) => r.ref === ref)
  const bySuggestion = new Map(rows.filter((r) => r.suggestionKey).map((r) => [r.suggestionKey!, r]))
  const out: HistoryArchiveItem[] = []
  const suggestions = entity.kind === 'event' || entity.kind === 'person' ? entity.archive ?? [] : []
  for (const s of suggestions) {
    const key = `${ref}#${s.id}`
    const row = bySuggestion.get(key)
    const local = row && ctx.fileExists(row.relPath)
    out.push({
      key,
      kind: s.mediaKind,
      title: s.title,
      date: s.date ? formatHistDate(s.date) : null,
      credit: [s.credit.creator, s.credit.institution].filter(Boolean).join(', ') || null,
      license: s.license.id,
      page: s.page ?? null,
      origin: 'research',
      state: row ? (local ? 'local' : 'missing') : 'suggested',
      rowId: row?.id ?? null,
      relPath: row?.relPath ?? null,
      url: s.url,
      bytes: row?.bytes ?? s.bytes ?? null,
      durationSec: s.durationSec ?? null
    })
  }
  for (const r of rows) {
    if (r.suggestionKey) continue
    out.push({
      key: `file-${r.id}`,
      kind: r.kind,
      title: r.title,
      date: null,
      credit: r.credit,
      license: r.license,
      page: r.page,
      origin: 'user',
      state: ctx.fileExists(r.relPath) ? 'local' : 'missing',
      rowId: r.id,
      relPath: r.relPath,
      url: null,
      bytes: r.bytes,
      durationSec: null
    })
  }
  return out
}

export function article(
  index: HistoryIndex,
  ref: string,
  ctx: ViewContext & { note: HistoryNote | null }
): HistoryArticleView | null {
  const entity = lookup(index.catalog, ref)
  if (!entity || !ARTICLE_KINDS.has(entity.kind)) return null
  const e = entity as HistoryArticle

  const interpretations = (index.interpretationsAbout.get(ref) ?? [])
    .map((id) => index.catalog.interpretations.get(id))
    .filter((x): x is HistoryInterpretation => !!x)

  const pointers = [...(index.mediaByTarget.get(ref) ?? []), ...(index.mediaByPortrayed.get(ref) ?? [])]
  const media = mediaCards(
    index,
    pointers,
    ctx.personalLinks.filter((l) => l.ref === ref),
    ctx
  )

  const children = (index.childrenOf.get(ref) ?? []).slice()
  const inbound = index.inbound.get(ref) ?? []
  const appearsIn = e.kind === 'person' ? index.personEvents.get(ref) ?? [] : []
  const rulers: HistoryRuler[] = (index.rulersOf.get(ref) ?? [])
    .flatMap(({ ref: person, office }) => {
      const p = lookup(index.catalog, person)
      const o = p?.kind === 'person' ? p.offices?.[office] : undefined
      return o ? [{ person, title: o.title, start: o.start ?? null, end: o.end ?? null }] : []
    })
    .sort((a, b) => (firstValue(a.start ?? undefined)?.d ?? '9999').localeCompare(firstValue(b.start ?? undefined)?.d ?? '9999'))
  const successors = index.successors.get(ref) ?? []
  const dependencies = index.dependencies.get(ref) ?? []
  const stateEvents = index.polityEvents.get(ref) ?? []
  const themes = index.themesOf.get(ref) ?? []

  const span = lifespan(e)
  let meanwhile: string[] = []
  let contemporaries: string[] = []
  if (span && (e.kind === 'event' || e.kind === 'period')) {
    const lane = e.regions[0]
    const parents = new Set((e.kind === 'event' ? e.partOf ?? [] : []).map((p) => p.ref))
    meanwhile = index.events
      .filter((t) => t.ref !== ref && t.lane !== lane && !parents.has(t.ref) && !children.includes(t.ref))
      .filter((t) => overlaps(span, t))
      .sort((a, b) => a.prominence - b.prominence || a.s - b.s)
      .slice(0, 8)
      .map((t) => t.ref)
  }
  if (span && e.kind === 'person') {
    const score = (r: string): number => (index.personEvents.get(r) ?? []).length
    contemporaries = [...index.catalog.people.values()]
      .map((p) => refOf('person', p.id))
      .filter((r) => r !== ref)
      .filter((r) => {
        const other = lifespan(lookup(index.catalog, r)!)
        return other !== null && overlaps({ s: span.s, e: span.e ?? span.s + 80 }, { s: other.s, e: other.e ?? other.s + 80 })
      })
      .sort((a, b) => score(b) - score(a) || titleOf(lookup(index.catalog, a)!).localeCompare(titleOf(lookup(index.catalog, b)!)))
      .slice(0, 8)
  }

  const refs = new Set<string>()
  collectRefs(e, refs)
  interpretations.forEach((i) => collectRefs(i, refs))
  children.forEach((r) => refs.add(r))
  inbound.forEach((r) => refs.add(r.ref))
  appearsIn.forEach((r) => refs.add(r.ref))
  meanwhile.forEach((r) => refs.add(r))
  contemporaries.forEach((r) => refs.add(r))
  for (const r of [...rulers.map((x) => x.person), ...successors, ...dependencies, ...stateEvents, ...themes]) refs.add(r)
  refs.delete(ref)

  const sourceOrder: string[] = []
  const seen = new Set<string>()
  collectSources(orderedFields(e), sourceOrder, seen)
  collectSources(interpretations, sourceOrder, seen)
  collectSources(
    media.map((m) => m.accuracy),
    sourceOrder,
    seen
  )
  const sources: Record<string, HistorySource> = {}
  for (const id of sourceOrder) {
    const s = index.catalog.sources.get(id)
    if (s) {
      sources[id] = s
      if (s.translationOf) {
        const o = index.catalog.sources.get(s.translationOf)
        if (o) sources[o.id] = o
      }
    }
  }

  // Further reading is bibliography, not citation: resolved for the page but
  // never numbered as a footnote.
  const furtherReading = 'furtherReading' in e ? e.furtherReading ?? [] : []
  for (const r of furtherReading) {
    const s = index.catalog.sources.get(r.source)
    if (s) sources[r.source] = s
  }

  const refInfos: Record<string, HistoryRefInfo> = {}
  for (const r of refs) refInfos[r] = refInfo(index, r, ctx.cached)

  const hero = e.kind === 'person' ? e.portrait : e.kind === 'place' ? undefined : e.hero

  return {
    ref,
    entity: e,
    personal: index.personal.has(ref),
    refs: refInfos,
    sources,
    sourceOrder,
    hero: toImage(hero, ctx.cached),
    interpretations,
    children: children.map((r) => refInfo(index, r, ctx.cached)).sort((a, b) => (a.years ?? '').localeCompare(b.years ?? '')),
    inbound,
    appearsIn,
    meanwhile: meanwhile.map((r) => refInfos[r]),
    contemporaries: contemporaries.map((r) => refInfos[r]),
    media,
    archive: archiveItems(e, ref, ctx),
    mark: ctx.marks.get(ref) ?? { read: null, favorite: false },
    note: ctx.note,
    solarHijri: 'regions' in e && (e.regions as string[]).includes('iran'),
    mapYear: mapYearOf(index, e),
    rulers,
    successors,
    dependencies,
    events: stateEvents,
    themes,
    furtherReading,
    // Filled by the service, which owns the lazily loaded borders.
    territory: []
  }
}

/**
 * The year to open the map at: an event's start when one of its places carries
 * coordinates; a state's first year whose borders the map draws.
 */
function mapYearOf(index: HistoryIndex, e: HistoryArticle): number | null {
  if (e.kind === 'polity') {
    const start = lifespan(e)?.s ?? null
    const years = (e.cshapes ?? []).map((c) => Math.max(c.from ?? (c.set === 'world' ? 1886 : c.set === 'europe' ? 1816 : 1800), start ?? -Infinity))
    return years.length ? Math.ceil(Math.min(...years)) : null
  }
  if (e.kind !== 'event') return null
  const located = (e.places ?? []).some((l) => {
    const p = parseRef(l.ref)
    return p?.kind === 'place' && !!index.catalog.places.get(p.id)?.coords
  })
  const start = index.events.find((t) => t.ref === refOf('event', e.id))
  return located && start ? Math.floor(start.s) : null
}

// ---- sources ----

export function sourceRows(index: HistoryIndex): HistorySourceRow[] {
  return [...index.catalog.sources.values()]
    .map((s) => ({
      id: s.id,
      title: s.title,
      type: s.type,
      date: s.date,
      contributors: s.contributors.map((c) => c.name).join(', '),
      cited: [...(index.citedBy.get(s.id)?.values() ?? [])].reduce((a, b) => a + b, 0),
      personal: index.personal.has(refOf('source', s.id))
    }))
    .sort((a, b) => a.title.localeCompare(b.title))
}

export function sourceView(index: HistoryIndex, id: string, cached: CachedLookup): HistorySourceView | null {
  const source = index.catalog.sources.get(id)
  if (!source) return null
  const citing = index.citedBy.get(id) ?? new Map<string, number>()
  const citedBy = [...citing.entries()]
    .filter(([ref]) => {
      const kind = parseRef(ref)?.kind
      return kind === 'event' || kind === 'person' || kind === 'period' || kind === 'place'
    })
    .map(([ref, quotes]) => ({ ...refInfo(index, ref, cached), quotes }))
    .sort((a, b) => b.quotes - a.quotes || a.title.localeCompare(b.title))
  // Interpretations and media links count toward the entity they are about.
  for (const [ref, n] of citing) {
    const p = parseRef(ref)
    if (p?.kind !== 'interpretation' && p?.kind !== 'media') continue
    const ent = lookup(index.catalog, ref)
    const abouts =
      ent?.kind === 'interpretation' ? ent.about : ent?.kind === 'media' ? ent.links.map((l) => l.target) : []
    for (const a of abouts) {
      const row = citedBy.find((c) => c.ref === a)
      if (row) row.quotes += n
      else citedBy.push({ ...refInfo(index, a, cached), quotes: n })
    }
  }
  return {
    source,
    personal: index.personal.has(refOf('source', id)),
    translationOf: source.translationOf ? index.catalog.sources.get(source.translationOf) ?? null : null,
    translations: [...index.catalog.sources.values()].filter((s) => s.translationOf === id),
    citedBy
  }
}

// ---- search + backlinks ----

export function search(index: HistoryIndex, q: string, cached: CachedLookup, limit = 12): HistorySearchHit[] {
  return searchDocs(index.docs, q, limit).map((h) => {
    const info = refInfo(index, h.ref, cached)
    return { ref: h.ref, kind: info.kind, title: h.title, subtitle: h.subtitle ?? null, image: info.image }
  })
}

export function backlinks(
  index: HistoryIndex,
  title: { mediaType: MediaType; source: string; externalId: string },
  personal: PersonalLink[],
  cached: CachedLookup
): HistoryMediaBacklink[] {
  const out: HistoryMediaBacklink[] = []
  const curated = index.catalog.media.get(mediaFileId(title))
  for (const l of curated?.links ?? []) {
    if (lookup(index.catalog, l.target)) out.push({ target: refInfo(index, l.target, cached), kind: l.kind, origin: 'curated' })
  }
  for (const l of personal) {
    if (lookup(index.catalog, l.ref)) {
      out.push({ target: refInfo(index, l.ref, cached), kind: l.kind as HistoryMediaBacklink['kind'], origin: 'personal' })
    }
  }
  return out
}

/** Every remote image a set of refs shows, for the art cache. */
export function imageUrls(index: HistoryIndex, refs: string[]): string[] {
  const urls = new Set<string>()
  for (const r of refs) {
    const e = lookup(index.catalog, r)
    if (!e) continue
    if ((e.kind === 'event' || e.kind === 'period') && e.hero) urls.add(e.hero.url)
    if (e.kind === 'person' && e.portrait) urls.add(e.portrait.url)
  }
  return [...urls]
}

export function decadeImageUrls(index: HistoryIndex, start: number): string[] {
  const refs = index.events.filter((t) => t.s >= start && t.s < start + 10).map((t) => t.ref)
  const inDecade = (s?: string): boolean => {
    const y = s ? Number(s.slice(0, s.startsWith('-') ? 5 : 4)) : NaN
    return y >= start && y < start + 10
  }
  const people = [...index.catalog.people.values()]
    .filter((p) => inDecade(firstValue(p.born)?.d) || inDecade(firstValue(p.died)?.d))
    .map((p) => refOf('person', p.id))
  const posters = refs
    .flatMap((r) => index.mediaByTarget.get(r) ?? [])
    .map((p) => index.catalog.media.get(p.mediaId)?.title.posterUrl)
    .filter((u): u is string => !!u)
  return [...imageUrls(index, [...refs, ...people]), ...posters]
}

// ---- map ----

/**
 * Events with a located place, pinned at the first one that has coordinates.
 * Events whose places carry no coordinates (or that name no place) stay off
 * the map rather than being guessed at.
 */
export function mapPins(index: HistoryIndex, ctx: TimelineCtx): HistoryMapPin[] {
  const pins: HistoryMapPin[] = []
  for (const t of index.events) {
    const e = lookup(index.catalog, t.ref)
    if (!e || e.kind !== 'event') continue
    for (const link of e.places ?? []) {
      const parsed = parseRef(link.ref)
      const place = parsed?.kind === 'place' ? index.catalog.places.get(parsed.id) : undefined
      if (!place?.coords) continue
      const item = timelineItem(index, t, ctx)
      pins.push({
        ref: t.ref,
        title: t.title,
        native: t.native,
        typeLabel: t.typeLabel,
        s: t.s,
        e: t.e,
        lane: t.lane,
        prominence: t.prominence,
        lat: place.coords.lat,
        lon: place.coords.lon,
        place: primaryName(place),
        image: item.image,
        read: item.read
      })
      break
    }
  }
  return pins
}

/** Every map border unit linked to a state page, for the map's click-through. */
export function mapPolities(index: HistoryIndex): HistoryMapPolity[] {
  const out: HistoryMapPolity[] = []
  for (const p of index.catalog.polities.values()) {
    for (const c of p.cshapes ?? []) {
      out.push({ set: c.set, code: c.code, from: c.from ?? null, to: c.to ?? null, ref: refOf('polity', p.id), title: primaryName(p) })
    }
  }
  return out
}

/** Every theme, with the span and size of its thread, for the themes index. */
export function themeRows(index: HistoryIndex, cached: CachedLookup): HistoryThemeRow[] {
  return [...index.catalog.themes.values()]
    .map((t) => {
      const ref = refOf('theme', t.id)
      const years = t.thread
        .map((x) => lifespan(lookup(index.catalog, x.ref) ?? t)?.s)
        .filter((y): y is number => typeof y === 'number')
      return {
        info: refInfo(index, ref, cached),
        entries: t.thread.length,
        from: years.length ? Math.floor(Math.min(...years)) : null,
        to: years.length ? Math.floor(Math.max(...years)) : null
      }
    })
    .sort((a, b) => a.info.title.localeCompare(b.info.title))
}

/**
 * Events with a day-precise date on this month and day: a start, an end or a
 * dated stage of their course (any sourced alternative; Old Style dates match
 * on their Gregorian day). Lead events first, then by year.
 */
export function onThisDay(index: HistoryIndex, month: number, day: number, cached: CachedLookup, limit = 6): HistoryOnThisDay[] {
  const md = `-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  const hits: Array<HistoryOnThisDay & { prominence: number }> = []
  for (const e of index.catalog.events.values()) {
    const candidates: Array<{ d: string; what: HistoryOnThisDay['what'] }> = []
    const scan = (c: Claim<HistDate> | undefined, what: HistoryOnThisDay['what']): void => {
      c?.alts.forEach((a) => {
        if (a.value.d.length === 10 && a.value.d.endsWith(md) && !a.value.notAfter) candidates.push({ d: a.value.d, what })
      })
    }
    scan(e.start, 'began')
    scan(e.end, 'ended')
    e.course?.forEach((c) => scan(c.date, 'stage'))
    if (!candidates.length) continue
    const best = candidates.sort((a, b) => ['began', 'ended', 'stage'].indexOf(a.what) - ['began', 'ended', 'stage'].indexOf(b.what))[0]
    hits.push({ info: refInfo(index, refOf('event', e.id), cached), year: Number(best.d.slice(0, 4)), what: best.what, prominence: e.prominence })
  }
  return hits
    .sort((a, b) => a.prominence - b.prominence || a.year - b.year)
    .slice(0, limit)
    .map(({ prominence: _p, ...h }) => h)
}
