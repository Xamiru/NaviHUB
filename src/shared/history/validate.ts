// The History content validator. It runs over the committed catalog in
// tests/historyContent.test.ts (the gate every research session must pass) and
// over each personal entity the in-app editor saves. It enforces the
// section's sourcing rules mechanically: every quote and claim is cited with a
// locator and provenance, references resolve, fringe and revisionist views
// carry their reception, Wikipedia/Wikidata are never cited, and committed
// slugs never silently disappear.

import { decimalYear, parseDate } from './calendars'
import {
  ARCHIVE_KINDS,
  CAUSAL_RELATIONS,
  CITED_NAME_ROLES,
  CONTRIBUTOR_ROLES,
  DISCIPLINES,
  ENTITY_KINDS,
  EVENT_TYPES,
  FIGURE_KEYS,
  HISTORY_SCHEMA_VERSION,
  HOLDER_KINDS,
  INTERPRETATION_TOPICS,
  LICENSES,
  MAX_SLUG,
  MEDIA_LINK_KINDS,
  NAME_ROLES,
  OFFICIAL_HOLDERS,
  PARTICIPANT_ROLES,
  PERIOD_TYPES,
  PERSON_ROLES,
  PLACE_TYPES,
  POSITION_CATEGORIES,
  PROVENANCE_VIA,
  RANGE_QUALIFIERS,
  RECEPTION_REQUIRED,
  REGION_KEYS,
  RELATION_KINDS,
  SECTION_KINDS,
  SLUG_RE,
  SOURCE_TYPES,
  STANDING_LABELS,
  WEB_SOURCE_TYPES,
  mediaFileId,
  parseRef,
  refOf,
  type ArchiveSuggestion,
  type Cite,
  type Claim,
  type EntityKind,
  type HistDate,
  type HistoryEntity,
  type Holder,
  type ImageRef,
  type License,
  type NameVariant,
  type Quote,
  type Section
} from './schema'
import { KIND_DIRS, buildCatalog, lookup, type CatalogEntry, type HistoryCatalog, type IdLock } from './model'
import type { MediaType } from '../types'

export type Severity = 'error' | 'warning'

export interface Issue {
  severity: Severity
  code: string
  /** `kind:slug` of the entity the issue is in. */
  ref?: string
  path?: string
  message: string
}

const MEDIA_TYPES: ReadonlySet<MediaType> = new Set(['anime', 'manga', 'visual_novel', 'game', 'movie', 'tv', 'book'])
const DAY_RE = /^\d{4}-\d{2}-\d{2}$/
/** Never citable: finding aids only. Commons may host image sources. */
const BANNED_HOSTS = /(^|\.)(wikipedia\.org|wikidata\.org|wikiwand\.com)$/i
/** Publishers whose terms forbid ingestion by large language models or generative AI. */
const NO_AI_HOSTS = /(^|\.)openstax\.org$/i

function host(url: string): string | null {
  try {
    const u = new URL(url)
    return u.protocol === 'https:' || u.protocol === 'http:' ? u.hostname : null
  } catch {
    return null
  }
}

function isHttps(url: string): boolean {
  try {
    return new URL(url).protocol === 'https:'
  } catch {
    return false
  }
}

const has = (table: object, key: unknown): boolean =>
  typeof key === 'string' && Object.prototype.hasOwnProperty.call(table, key)

class Checker {
  issues: Issue[] = []
  /** Sources cited anywhere, for the orphan check. */
  cited = new Set<string>()
  private ref = ''
  private path?: string

  constructor(private catalog: HistoryCatalog) {}

  begin(ref: string, path?: string): void {
    this.ref = ref
    this.path = path
  }

  err(code: string, message: string): void {
    this.issues.push({ severity: 'error', code, ref: this.ref, path: this.path, message })
  }

  warn(code: string, message: string): void {
    this.issues.push({ severity: 'warning', code, ref: this.ref, path: this.path, message })
  }

  target(ref: string | undefined, kinds: EntityKind[], where: string): void {
    if (!ref) return
    const p = parseRef(ref)
    if (!p || !kinds.includes(p.kind)) {
      this.err('bad-ref', `${where}: "${ref}" must reference a ${kinds.join(' or ')}`)
      return
    }
    if (!lookup(this.catalog, ref)) this.err('dangling-ref', `${where}: "${ref}" does not exist`)
  }

  date(d: string | undefined, where: string): number | null {
    if (d === undefined) return null
    if (!parseDate(d)) {
      this.err('bad-date', `${where}: "${d}" is not YYYY, YYYY-MM or YYYY-MM-DD`)
      return null
    }
    return decimalYear(d)
  }

  day(d: string | undefined, where: string): void {
    if (d === undefined) return
    if (!DAY_RE.test(d) || !parseDate(d)) this.err('bad-date', `${where}: "${d}" must be YYYY-MM-DD`)
  }

  histDate(h: HistDate, where: string): void {
    const start = this.date(h.d, where)
    if (h.notAfter !== undefined) {
      const end = this.date(h.notAfter, `${where}.notAfter`)
      if (start !== null && end !== null && end < start) this.err('date-order', `${where}: notAfter precedes d`)
    }
    if (h.julian && start !== null && start >= 1918.12) {
      this.warn('late-julian', `${where}: Old Style dating after February 1918 is unusual; check the source`)
    }
  }

  cite(c: Cite | undefined, where: string): void {
    if (!c || typeof c.source !== 'string') {
      this.err('uncited', `${where}: missing citation`)
      return
    }
    this.cited.add(c.source)
    if (!this.catalog.sources.has(c.source)) this.err('dangling-source', `${where}: source "${c.source}" does not exist`)
    const loc = c.loc ?? {}
    const filled = [loc.page, loc.section, loc.folio, loc.time, loc.para].some((v) => typeof v === 'string' && v.trim())
    if (!filled) this.err('no-locator', `${where}: citation of "${c.source}" needs a page, section, folio, time or paragraph`)
  }

  cites(cs: Cite[] | undefined, where: string, required: boolean): void {
    if (!cs || cs.length === 0) {
      if (required) this.err('uncited', `${where}: at least one citation is required`)
      return
    }
    cs.forEach((c, i) => this.cite(c, `${where}.cites[${i}]`))
  }

  holder(h: Holder, where: string): void {
    if (!has(HOLDER_KINDS, h.kind)) this.err('bad-enum', `${where}: unknown holder kind "${h.kind}"`)
    if (!h.name?.trim()) this.err('empty', `${where}: holder needs a name`)
    if (h.discipline !== undefined && !has(DISCIPLINES, h.discipline)) {
      this.err('bad-enum', `${where}: unknown discipline "${h.discipline}"`)
    }
    if (h.ref) this.target(h.ref, ['person'], where)
  }

  claim<T>(c: Claim<T> | undefined, where: string, check?: (v: T, w: string) => void): void {
    if (!c) return
    if (!Array.isArray(c.alts) || c.alts.length === 0) {
      this.err('empty-claim', `${where}: a claim needs at least one value`)
      return
    }
    c.alts.forEach((a, i) => {
      const w = `${where}.alts[${i}]`
      this.cites(a.cites, w, true)
      a.heldBy?.forEach((h, j) => this.holder(h, `${w}.heldBy[${j}]`))
      check?.(a.value, w)
    })
  }

  dateClaim(c: Claim<HistDate> | undefined, where: string): void {
    this.claim(c, where, (v, w) => this.histDate(v, w))
  }

  quote(q: Quote, where: string, seen: Set<string>): void {
    if (!q.id?.trim()) this.err('empty', `${where}: quote needs an id`)
    else if (seen.has(q.id)) this.err('duplicate-quote', `${where}: quote id "${q.id}" is used twice`)
    else seen.add(q.id)
    if (!q.text?.trim()) this.err('empty', `${where}: quote text is empty`)
    else if (q.text !== q.text.trim()) this.warn('whitespace', `${where}: quote text has leading or trailing whitespace`)
    if (!q.lang?.trim()) this.err('empty', `${where}: quote needs a language`)
    this.cite(q.cite, `${where}.cite`)
    this.provenance(q.provenance, `${where}.provenance`)
    if (q.translation) {
      const t = q.translation
      const w = `${where}.translation`
      if (!t.text?.trim()) this.err('empty', `${w}: translation text is empty`)
      this.cite(t.cite, `${w}.cite`)
      this.provenance(t.provenance, `${w}.provenance`)
      const src = t.cite ? this.catalog.sources.get(t.cite.source) : undefined
      if (src && src.translationOf !== q.cite?.source) {
        this.err('unpublished-translation', `${w}: "${t.cite.source}" is not a published translation of "${q.cite?.source}"`)
      }
    }
  }

  provenance(p: Quote['provenance'] | undefined, where: string): void {
    if (!p) {
      this.err('no-provenance', `${where}: record how the quote was copied`)
      return
    }
    if (!has(PROVENANCE_VIA, p.via)) this.err('bad-enum', `${where}: unknown provenance "${p.via}"`)
    this.day(p.at, `${where}.at`)
    if (p.via === 'web' && !p.url) this.err('no-provenance', `${where}: web provenance needs the url it was copied from`)
    if (p.url) {
      const h = host(p.url)
      if (!h) this.err('bad-url', `${where}: "${p.url}" is not a web URL`)
      else if (BANNED_HOSTS.test(h)) this.err('finding-aid-cited', `${where}: quotes may not be copied from ${h}`)
      else if (NO_AI_HOSTS.test(h)) this.err('no-ai-source', `${where}: ${h} forbids use by AI research; quote another source`)
    }
  }

  sections(sections: Section[] | undefined, where: string, seen: Set<string>): number {
    let count = 0
    sections?.forEach((s, i) => {
      const w = `${where}[${i}]`
      if (!has(SECTION_KINDS, s.kind)) this.err('bad-enum', `${w}: unknown section kind "${s.kind}"`)
      if (!s.quotes?.length) this.err('empty', `${w}: a section needs at least one quote`)
      s.quotes?.forEach((q, j) => this.quote(q, `${w}.quotes[${j}]`, seen))
      count += s.quotes?.length ?? 0
    })
    return count
  }

  names(names: NameVariant[] | undefined, where: string): void {
    if (!names?.length) {
      this.err('no-name', `${where}: at least one name is required`)
      return
    }
    const primaries = names.filter((n) => n.role === 'primary').length
    if (primaries !== 1) this.err('primary-name', `${where}: exactly one primary name is required (found ${primaries})`)
    names.forEach((n, i) => {
      const w = `${where}[${i}]`
      if (!n.text?.trim()) this.err('empty', `${w}: name text is empty`)
      if (!n.lang?.trim()) this.err('empty', `${w}: name needs a language`)
      if (!has(NAME_ROLES, n.role)) this.err('bad-enum', `${w}: unknown name role "${n.role}"`)
      this.cites(n.cites, w, CITED_NAME_ROLES.has(n.role))
      n.usedBy?.forEach((h, j) => this.holder(h, `${w}.usedBy[${j}]`))
    })
  }

  regions(regions: string[] | undefined, where: string): void {
    if (!regions?.length) this.err('no-region', `${where}: at least one region is required`)
    regions?.forEach((r) => {
      if (!REGION_KEYS.has(r)) this.err('bad-enum', `${where}: unknown region "${r}"`)
    })
  }

  license(l: License | undefined, where: string): void {
    if (!l) {
      this.err('no-license', `${where}: a license is required`)
      return
    }
    if (!has(LICENSES, l.id)) this.err('bad-enum', `${where}: unknown license "${l.id}"`)
    if (l.url && !isHttps(l.url)) this.err('bad-url', `${where}: license url must be https`)
  }

  image(img: ImageRef | undefined, where: string): void {
    if (!img) return
    if (!isHttps(img.url)) this.err('bad-url', `${where}: image url must be https`)
    if (img.page && !isHttps(img.page)) this.err('bad-url', `${where}: image page must be https`)
    if (!img.credit?.institution?.trim() && !img.credit?.creator?.trim()) {
      this.err('no-credit', `${where}: credit the holding institution or the creator`)
    }
    this.license(img.license, `${where}.license`)
  }

  archive(items: ArchiveSuggestion[] | undefined, where: string): void {
    const ids = new Set<string>()
    items?.forEach((a, i) => {
      const w = `${where}[${i}]`
      if (!a.id?.trim()) this.err('empty', `${w}: archive item needs an id`)
      else if (ids.has(a.id)) this.err('duplicate-archive', `${w}: archive id "${a.id}" is used twice`)
      else ids.add(a.id)
      if (!has(ARCHIVE_KINDS, a.mediaKind)) this.err('bad-enum', `${w}: unknown archive kind "${a.mediaKind}"`)
      if (!a.title?.trim()) this.err('empty', `${w}: archive item needs its archive's title`)
      if (!isHttps(a.url)) this.err('bad-url', `${w}: archive url must be https`)
      if (a.page && !isHttps(a.page)) this.err('bad-url', `${w}: archive page must be https`)
      if (!a.credit?.institution?.trim()) this.err('no-credit', `${w}: credit the holding institution`)
      this.license(a.license, `${w}.license`)
      if (a.date) this.histDate(a.date, `${w}.date`)
    })
  }

  slug(id: string, kind: EntityKind): void {
    if (kind === 'media') return
    if (typeof id !== 'string' || !SLUG_RE.test(id) || id.length > MAX_SLUG) {
      this.err('bad-slug', `id "${id}" must be lowercase words joined by hyphens, at most ${MAX_SLUG} characters`)
    }
  }

  span(start: Claim<HistDate> | undefined, end: Claim<HistDate> | undefined, where: string): void {
    if (!start?.alts?.length || !end?.alts?.length) return
    const starts = start.alts.map((a) => decimalYear(a.value.d)).filter((x): x is number => x !== null)
    const ends = end.alts.map((a) => decimalYear(a.value.notAfter ?? a.value.d, 'end')).filter((x): x is number => x !== null)
    if (starts.length && ends.length && Math.max(...ends) < Math.min(...starts)) {
      this.err('date-order', `${where}: every end date precedes every start date`)
    }
  }

  // ---- entity checks ----

  entity(e: HistoryEntity): void {
    if (!has(ENTITY_KINDS, e.kind)) {
      this.err('bad-enum', `unknown entity kind "${(e as { kind: string }).kind}"`)
      return
    }
    if (e.v !== HISTORY_SCHEMA_VERSION) this.err('schema-version', `v is ${e.v}, expected ${HISTORY_SCHEMA_VERSION}`)
    this.slug(e.id, e.kind)
    if ('researched' in e) this.day(e.researched, 'researched')
    const quotes = new Set<string>()
    switch (e.kind) {
      case 'event': {
        this.names(e.names, 'names')
        this.regions(e.regions, 'regions')
        if (!has(EVENT_TYPES, e.type)) this.err('bad-enum', `unknown event type "${e.type}"`)
        if (![1, 2, 3].includes(e.prominence)) this.err('bad-enum', 'prominence must be 1, 2 or 3')
        if (!e.start) this.err('no-date', 'an event needs a start date')
        this.dateClaim(e.start, 'start')
        this.dateClaim(e.end, 'end')
        this.span(e.start, e.end, 'end')
        e.places?.forEach((p, i) => {
          this.target(p.ref, ['place'], `places[${i}]`)
          this.cites(p.cites, `places[${i}]`, false)
        })
        e.partOf?.forEach((p, i) => {
          this.target(p.ref, ['event', 'period'], `partOf[${i}]`)
          this.cites(p.cites, `partOf[${i}]`, false)
        })
        this.relations(e.related)
        const sides = new Set<string>()
        e.sides?.forEach((s, i) => {
          if (sides.has(s.key)) this.err('duplicate-side', `sides[${i}]: key "${s.key}" is used twice`)
          sides.add(s.key)
          if (!s.name?.trim()) this.err('empty', `sides[${i}]: side needs a name`)
          this.cites(s.cites, `sides[${i}]`, true)
        })
        e.participants?.forEach((p, i) => {
          const w = `participants[${i}]`
          if (!p.ref && !p.name?.trim()) this.err('empty', `${w}: give a person ref or a name`)
          this.target(p.ref, ['person'], w)
          if (!has(PARTICIPANT_ROLES, p.role)) this.err('bad-enum', `${w}: unknown role "${p.role}"`)
          if (p.side !== undefined && !sides.has(p.side)) this.err('dangling-side', `${w}: side "${p.side}" is not defined`)
          this.cites(p.cites, w, true)
        })
        e.figures?.forEach((f, i) => {
          const w = `figures[${i}]`
          if (!has(FIGURE_KEYS, f.key)) this.err('bad-enum', `${w}: unknown figure "${f.key}"`)
          if (f.side !== undefined && !sides.has(f.side)) this.err('dangling-side', `${w}: side "${f.side}" is not defined`)
          this.claim(f.value, w, (v, vw) => {
            if (!Number.isFinite(v.min) || v.min < 0) this.err('bad-figure', `${vw}: min must be a non-negative number`)
            if (v.max !== undefined && !(v.max >= v.min)) this.err('bad-figure', `${vw}: max must be at least min`)
            if (v.qualifier !== undefined && !has(RANGE_QUALIFIERS, v.qualifier)) {
              this.err('bad-enum', `${vw}: unknown qualifier "${v.qualifier}"`)
            }
          })
        })
        this.image(e.hero, 'hero')
        let n = this.sections(e.sections, 'sections', quotes)
        e.course?.forEach((c, i) => {
          this.dateClaim(c.date, `course[${i}].date`)
          this.quote(c.quote, `course[${i}].quote`, quotes)
          n++
        })
        if (n === 0) this.warn('no-quotes', 'the event has no quotes yet')
        this.archive(e.archive, 'archive')
        break
      }
      case 'person': {
        this.names(e.names, 'names')
        this.regions(e.regions, 'regions')
        if (!e.roles?.length) this.err('empty', 'a person needs at least one role')
        e.roles?.forEach((r) => {
          if (!has(PERSON_ROLES, r)) this.err('bad-enum', `unknown person role "${r}"`)
        })
        this.dateClaim(e.born, 'born')
        this.dateClaim(e.died, 'died')
        this.span(e.born, e.died, 'died')
        if (e.bornIn) this.target(e.bornIn.ref, ['place'], 'bornIn')
        if (e.diedIn) this.target(e.diedIn.ref, ['place'], 'diedIn')
        e.offices?.forEach((o, i) => {
          if (!o.title?.trim()) this.err('empty', `offices[${i}]: office needs a title`)
          this.dateClaim(o.start, `offices[${i}].start`)
          this.dateClaim(o.end, `offices[${i}].end`)
          this.cites(o.cites, `offices[${i}]`, true)
        })
        this.image(e.portrait, 'portrait')
        if (this.sections(e.sections, 'sections', quotes) === 0) this.warn('no-quotes', 'the person has no quotes yet')
        this.archive(e.archive, 'archive')
        break
      }
      case 'period': {
        this.names(e.names, 'names')
        this.regions(e.regions, 'regions')
        if (!has(PERIOD_TYPES, e.periodType)) this.err('bad-enum', `unknown period type "${e.periodType}"`)
        if (![1, 2, 3].includes(e.prominence)) this.err('bad-enum', 'prominence must be 1, 2 or 3')
        if (!e.start) this.err('no-date', 'a period needs a start date')
        this.dateClaim(e.start, 'start')
        this.dateClaim(e.end, 'end')
        this.span(e.start, e.end, 'end')
        this.target(e.parent, ['period'], 'parent')
        this.image(e.hero, 'hero')
        this.sections(e.sections, 'sections', quotes)
        break
      }
      case 'place': {
        this.names(e.names, 'names')
        this.regions(e.regions, 'regions')
        if (!has(PLACE_TYPES, e.placeType)) this.err('bad-enum', `unknown place type "${e.placeType}"`)
        if (e.coords) {
          const { lat, lon } = e.coords
          if (!(lat >= -90 && lat <= 90) || !(lon >= -180 && lon <= 180)) this.err('bad-coords', 'coordinates out of range')
          this.cites(e.coords.cites, 'coords', true)
        }
        if (e.modernCountry !== undefined && !/^[A-Z]{2}$/.test(e.modernCountry)) {
          this.err('bad-country', 'modernCountry must be an ISO 3166-1 alpha-2 code')
        }
        this.sections(e.sections, 'sections', quotes)
        break
      }
      case 'source': {
        if (!has(SOURCE_TYPES, e.type)) this.err('bad-enum', `unknown source type "${e.type}"`)
        if (!e.title?.trim()) this.err('empty', 'a source needs a title')
        if (!e.lang?.trim()) this.err('empty', 'a source needs a language')
        if (!e.contributors?.length && !e.publisher?.trim() && !e.holding?.trim()) {
          this.err('empty', 'name a contributor, publisher or holding institution')
        }
        e.contributors?.forEach((c, i) => {
          if (!c.name?.trim()) this.err('empty', `contributors[${i}]: name is empty`)
          if (!has(CONTRIBUTOR_ROLES, c.role)) this.err('bad-enum', `contributors[${i}]: unknown role "${c.role}"`)
        })
        // Undated web pages carry the bibliographic marker 'n.d.'.
        if (e.date !== 'n.d.') this.date(e.date, 'date')
        for (const [field, url] of [['url', e.url], ['archivedUrl', e.archivedUrl]] as const) {
          if (!url) continue
          const h = host(url)
          if (!h) this.err('bad-url', `${field}: "${url}" is not a web URL`)
          else if (BANNED_HOSTS.test(h)) this.err('finding-aid-cited', `${field}: ${h} is a finding aid and cannot be cited`)
          else if (NO_AI_HOSTS.test(h)) this.err('no-ai-source', `${field}: ${h} forbids use by AI research and cannot be cited`)
          else if (/(^|\.)commons\.wikimedia\.org$/i.test(h) && e.type !== 'image') {
            this.err('finding-aid-cited', `${field}: Wikimedia Commons may only be cited for images`)
          }
        }
        if (WEB_SOURCE_TYPES.has(e.type)) {
          if (!e.url) this.err('no-url', `a ${e.type} source needs its url`)
          if (!e.accessed) this.err('no-accessed', `a ${e.type} source needs an accessed date`)
        }
        this.day(e.accessed, 'accessed')
        if (e.translationOf !== undefined) {
          if (e.translationOf === e.id) this.err('bad-ref', 'a source cannot translate itself')
          else if (!this.catalog.sources.has(e.translationOf)) {
            this.err('dangling-source', `translationOf "${e.translationOf}" does not exist`)
          }
        }
        if (e.license) this.license(e.license, 'license')
        break
      }
      case 'interpretation': {
        if (!has(INTERPRETATION_TOPICS, e.topic)) this.err('bad-enum', `unknown topic "${e.topic}"`)
        if (!e.about?.length) this.err('empty', 'an interpretation must be about at least one entity')
        e.about?.forEach((r, i) => this.target(r, ['event', 'person', 'period', 'place'], `about[${i}]`))
        if (e.framing) this.quote(e.framing, 'framing', quotes)
        if (!e.positions?.length) this.err('empty', 'an interpretation needs at least one position')
        else if (e.positions.length < 2) this.warn('single-position', 'only one position recorded')
        const ids = new Set<string>()
        e.positions?.forEach((p, i) => {
          const w = `positions[${i}]`
          if (!p.id?.trim()) this.err('empty', `${w}: position needs an id`)
          else if (ids.has(p.id)) this.err('duplicate-position', `${w}: position id "${p.id}" is used twice`)
          else ids.add(p.id)
          if (!has(POSITION_CATEGORIES, p.category)) this.err('bad-enum', `${w}: unknown category "${p.category}"`)
          if (!p.holders?.length) this.err('no-holder', `${w}: name who holds this position`)
          p.holders?.forEach((h, j) => this.holder(h, `${w}.holders[${j}]`))
          if (!p.statements?.length) this.err('empty', `${w}: quote the position in its holders' words`)
          p.statements?.forEach((q, j) => this.quote(q, `${w}.statements[${j}]`, quotes))
          if (RECEPTION_REQUIRED.has(p.category) && !p.reception?.length) {
            this.err('no-reception', `${w}: a ${p.category} position must quote how scholars received it`)
          }
          p.reception?.forEach((q, j) => this.quote(q, `${w}.reception[${j}]`, quotes))
          if (p.category === 'official' && !p.holders?.some((h) => OFFICIAL_HOLDERS.has(h.kind))) {
            this.err('official-holder', `${w}: an official narrative needs a state, party or organization holder`)
          }
          if (p.standing) {
            if (!has(STANDING_LABELS, p.standing.label)) this.err('bad-enum', `${w}: unknown standing "${p.standing.label}"`)
            if (!p.standing.quote) this.err('unquoted-standing', `${w}: a standing label needs a supporting quote`)
            else this.quote(p.standing.quote, `${w}.standing.quote`, quotes)
          }
        })
        break
      }
      case 'media': {
        const t = e.title
        if (!t || !MEDIA_TYPES.has(t.mediaType)) this.err('bad-enum', `unknown media type "${t?.mediaType}"`)
        if (!t?.source?.trim() || !t?.externalId?.trim() || !t?.title?.trim()) {
          this.err('empty', 'a media title needs source, externalId and title')
        } else if (e.id !== mediaFileId(t)) {
          this.err('bad-slug', `id must be "${mediaFileId(t)}"`)
        }
        if (t?.posterUrl && !isHttps(t.posterUrl)) this.err('bad-url', 'posterUrl must be https')
        if (!e.links?.length) this.err('empty', 'a media file needs at least one link')
        e.links?.forEach((l, i) => {
          const w = `links[${i}]`
          if (!has(MEDIA_LINK_KINDS, l.kind)) this.err('bad-enum', `${w}: unknown link kind "${l.kind}"`)
          this.target(l.target, l.kind === 'features-person' ? ['person'] : ['event', 'period', 'person'], w)
          l.portrayals?.forEach((p, j) => this.target(p.person, ['person'], `${w}.portrayals[${j}]`))
          l.accuracy?.forEach((q, j) => this.quote(q, `${w}.accuracy[${j}]`, quotes))
          this.cites(l.cites, w, false)
        })
        break
      }
    }
  }

  relations(rels: { ref: string; rel: string; cites?: Cite[]; disputedIn?: string }[] | undefined): void {
    rels?.forEach((r, i) => {
      const w = `related[${i}]`
      if (!has(RELATION_KINDS, r.rel)) this.err('bad-enum', `${w}: unknown relation "${r.rel}"`)
      this.target(r.ref, ['event', 'period', 'person'], w)
      this.cites(r.cites, w, CAUSAL_RELATIONS.has(r.rel as never))
      if (r.disputedIn !== undefined && !this.catalog.interpretations.has(r.disputedIn)) {
        this.err('dangling-ref', `${w}: interpretation "${r.disputedIn}" does not exist`)
      }
    })
  }
}

/** Validates one entity against a catalog (the editor's save check). */
export function validateEntity(entity: HistoryEntity, catalog: HistoryCatalog): Issue[] {
  const c = new Checker(catalog)
  c.begin(refOf(entity.kind, entity.id))
  c.entity(entity)
  return c.issues
}

const FILE_RE = /^([a-z]+)\/([^/]+)\.(?:ts|js)$/

/**
 * Validates the whole committed catalog: every entity, file names against
 * ids, duplicates, sources nothing cites, and the frozen-slug lock.
 */
export function validateCatalog(entries: CatalogEntry[], lock?: IdLock): Issue[] {
  const catalog = buildCatalog(entries.map((e) => e.entity))
  const c = new Checker(catalog)
  const seen = new Map<string, string | undefined>()
  for (const { path, entity } of entries) {
    const ref = refOf(entity.kind, entity.id)
    c.begin(ref, path)
    if (seen.has(ref)) c.err('duplicate-id', `${ref} is defined twice (also in ${seen.get(ref) ?? 'another file'})`)
    seen.set(ref, path)
    if (path && entity.id.startsWith('my-')) c.err('reserved-slug', 'the `my-` prefix is reserved for personal entities')
    if (path) {
      const m = FILE_RE.exec(path)
      if (!m) c.err('bad-path', `unexpected content path "${path}"`)
      else {
        if (m[1] !== KIND_DIRS[entity.kind]) c.err('bad-path', `a ${entity.kind} belongs in ${KIND_DIRS[entity.kind]}/`)
        if (m[2] !== entity.id) c.err('bad-path', `file name must be "${entity.id}"`)
      }
    }
    c.entity(entity)
  }
  for (const id of catalog.sources.keys()) {
    if (!c.cited.has(id)) {
      c.begin(refOf('source', id))
      c.warn('orphan-source', 'nothing cites this source')
    }
  }
  if (lock) checkLock(c, seen, lock)
  return c.issues
}

function checkLock(c: Checker, live: Map<string, string | undefined>, lock: IdLock): void {
  const locked = new Set(lock.ids)
  for (const [ref, path] of live) {
    c.begin(ref, path)
    if (!locked.has(ref)) c.err('unlocked-id', `add "${ref}" to content/ids.lock.json`)
    if (lock.redirects[ref] !== undefined) c.err('redirected-live', `"${ref}" is redirected but still exists`)
  }
  for (const ref of lock.ids) {
    if (live.has(ref)) continue
    c.begin(ref)
    const to = lock.redirects[ref]
    if (to === undefined) c.err('removed-id', `"${ref}" was committed before and has no redirect; slugs are frozen`)
    else if (!live.has(to) && lock.redirects[to] === undefined) {
      c.err('dangling-redirect', `"${ref}" redirects to missing "${to}"`)
    }
  }
  for (const [from, to] of Object.entries(lock.redirects)) {
    c.begin(from)
    if (lock.redirects[to] !== undefined) c.err('redirect-chain', `"${from}" -> "${to}" is a chain; point it at the final ref`)
    if (!locked.has(from)) c.err('unlocked-id', `redirected "${from}" must stay listed in ids`)
  }
}

export function errorsOnly(issues: Issue[]): Issue[] {
  return issues.filter((i) => i.severity === 'error')
}

export function formatIssue(i: Issue): string {
  return `${i.severity.toUpperCase()} ${i.code}${i.ref ? ` ${i.ref}` : ''}${i.path ? ` (${i.path})` : ''}: ${i.message}`
}
