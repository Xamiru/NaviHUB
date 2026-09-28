import { getSqlite } from '../db/connection'
import { downloadImage } from '../files'
import { fetchWithRetry, MAX_API_RESPONSE_BYTES } from '../http'
import { footballCoreName, normalizeFootballName } from '@shared/football'
import { sameTeamPersonIds } from '../repos/footballRepo'

// Reference data for Football entities. Identity comes from Wikipedia titles confirmed
// on Wikidata as association football; crests, portraits and logos are the infobox
// images whatever their license (personal local archive), with TheSportsDB and
// API-Football as fallbacks for clubs Wikipedia has no crest for.

const HEADERS = { 'User-Agent': 'NaviHUB/FootballArchive (personal local archive)' }
const ASSOCIATION_FOOTBALL = 'Q2736'
const FOOTBALL_OCCUPATIONS = new Set(['Q937857', 'Q628099'])
const CENTIMETRE = 'Q174728'
const METRE = 'Q11573'

interface WikiPage {
  pageid?: number
  title: string
  missing?: boolean
  extract?: string
  fullurl?: string
  pageimage?: string
  pageprops?: { wikibase_item?: string; disambiguation?: string }
  revisions?: Array<{ revid?: number }>
}

interface CareerSpell {
  teamQid: string
  teamName: string
  startDate: string | null
  endDate: string | null
}

export interface EnrichmentPayload {
  qid: string | null
  title: string
  body: string
  sourceUrl: string
  revision: string | null
  imagePath: string | null
  imageLicense: string | null
  birthDate: string | null
  foundedYear: number | null
  career: CareerSpell[]
  deathDate?: string | null
  nationality?: string | null
  position?: string | null
  heightCm?: number | null
  birthPlace?: string | null
  colors?: string[]
  venue?: string | null
  venueCapacity?: number | null
  /** Club head coaches from Wikidata, oldest first. */
  managers?: Array<{ personQid: string; name: string; startDate: string | null; endDate: string | null }>
}

export interface EnrichmentOptions {
  national?: boolean
  personRole?: 'player' | 'manager' | 'both'
  includeCareer?: boolean
  apiFootballTeamId?: string | null
}

type WikidataEntity = {
  claims?: Record<string, Array<{ mainsnak?: { datavalue?: { value?: unknown } } }>>
  labels?: Record<string, { value?: string }>
}

// Wikimedia asks anonymous clients to send requests in series; TheSportsDB's free tier
// allows 30 a minute. Every reference request takes the next slot for its site.
const SITE_SPACING: Record<string, number> = { 'thesportsdb.com': 2100 }
const DEFAULT_SPACING = 350
const nextSlot = new Map<string, number>()

async function spaced(url: string): Promise<void> {
  const site = new URL(url).hostname.split('.').slice(-2).join('.')
  const now = Date.now()
  const at = Math.max(now, nextSlot.get(site) ?? 0)
  nextSlot.set(site, at + (SITE_SPACING[site] ?? DEFAULT_SPACING))
  if (at > now) await new Promise((resolve) => setTimeout(resolve, at - now))
}

async function json(url: string, signal: AbortSignal): Promise<any> {
  await spaced(url)
  const response = await fetchWithRetry(url, {
    headers: HEADERS,
    timeoutMs: 45_000,
    taskSignal: signal,
    maxResponseBytes: MAX_API_RESPONSE_BYTES
  })
  if (!response.ok) throw new Error(`Reference source returned HTTP ${response.status}`)
  return response.json()
}

async function image(url: string): Promise<string | null> {
  await spaced(url)
  return downloadImage(url, undefined, HEADERS)
}

export function footballTitleCandidates(name: string, kind: 'team' | 'person', national = false): string[] {
  if (kind === 'person') return [name, `${name} (footballer)`, `${name} (football manager)`]
  if (national) return [`${name} national football team`]
  return [name, `${name} F.C.`, `${name} FC`, `FC ${name}`, `${name} A.F.C.`, `${name} CF`, `${name} C.F.`]
}

function claimValues(entity: WikidataEntity | undefined, property: string): unknown[] {
  return (entity?.claims?.[property] ?? []).map((claim) => claim.mainsnak?.datavalue?.value).filter((value) => value != null)
}

function claimIds(entity: WikidataEntity | undefined, property: string): string[] {
  return claimValues(entity, property).flatMap((value) =>
    typeof value === 'object' && value && typeof (value as { id?: unknown }).id === 'string' ? [(value as { id: string }).id] : []
  )
}

function claimTime(entity: WikidataEntity | undefined, property: string): string | null {
  const value = claimValues(entity, property)[0] as { time?: string } | undefined
  if (typeof value?.time !== 'string') return null
  const time = value.time.replace(/^\+/, '').slice(0, 10)
  return time.endsWith('-00-00') ? time.slice(0, 4) : time.replace(/-00$/, '')
}

/** True when Wikidata places the entity in association football. */
export function isFootballEntity(entity: WikidataEntity | undefined, kind: 'team' | 'person'): boolean {
  if (!entity) return false
  const sport = claimIds(entity, 'P641').includes(ASSOCIATION_FOOTBALL)
  if (kind === 'team') return sport
  return sport || claimIds(entity, 'P106').some((id) => FOOTBALL_OCCUPATIONS.has(id))
}

function chunks<T>(items: T[], size: number): T[][] {
  const out: T[][] = []
  for (let index = 0; index < items.length; index += size) out.push(items.slice(index, index + size))
  return out
}

interface PageLookup {
  pages: Map<string, WikiPage>
  /** Requested title to the title of the page it landed on. */
  landed: Map<string, string>
  /** Requested titles that arrived through a redirect. */
  redirected: Set<string>
}

async function wikiPages(params: Record<string, string>, signal: AbortSignal): Promise<{
  pages: WikiPage[]
  normalized: Array<{ from: string; to: string }>
  redirects: Array<{ from: string; to: string }>
}> {
  const query = new URLSearchParams({
    action: 'query',
    redirects: '1',
    prop: 'extracts|info|pageprops|pageimages|revisions',
    explaintext: '1',
    exintro: '1',
    exlimit: 'max',
    inprop: 'url',
    piprop: 'name',
    pilicense: 'any',
    pilimit: 'max',
    ppprop: 'wikibase_item|disambiguation',
    rvprop: 'ids',
    format: 'json',
    formatversion: '2',
    ...params
  })
  const result = (await json(`https://en.wikipedia.org/w/api.php?${query}`, signal)).query ?? {}
  return {
    pages: ((result.pages ?? []) as WikiPage[]).filter(
      (page) => !page.missing && !page.pageprops?.disambiguation && page.pageprops?.wikibase_item
    ),
    normalized: result.normalized ?? [],
    redirects: result.redirects ?? []
  }
}

/** Looks up titles twenty at a time (the intro-extract limit), following redirects. */
async function lookupTitles(titles: string[], signal: AbortSignal): Promise<PageLookup> {
  const lookup: PageLookup = { pages: new Map(), landed: new Map(), redirected: new Set() }
  for (const group of chunks([...new Set(titles)], 20)) {
    const result = await wikiPages({ titles: group.join('|') }, signal)
    const normalized = new Map(result.normalized.map((item) => [item.from, item.to]))
    const redirects = new Map(result.redirects.map((item) => [item.from, item.to]))
    for (const page of result.pages) lookup.pages.set(page.title, page)
    for (const title of group) {
      const clean = normalized.get(title) ?? title
      const target = redirects.get(clean)
      lookup.landed.set(title, target ?? clean)
      if (target) lookup.redirected.add(title)
    }
  }
  return lookup
}

async function wikidataEntities(ids: string[], props: string, signal: AbortSignal): Promise<Record<string, WikidataEntity>> {
  const entities: Record<string, WikidataEntity> = {}
  for (const group of chunks([...new Set(ids.filter((id) => /^Q\d+$/.test(id)))], 50)) {
    const params = new URLSearchParams({ action: 'wbgetentities', ids: group.join('|'), props, languages: 'en', format: 'json' })
    Object.assign(entities, (await json(`https://www.wikidata.org/w/api.php?${params}`, signal)).entities ?? {})
  }
  return entities
}

/** Picks the one football page among candidates; `viaTitles` also trusts redirects from the name's own titles. */
function pickFootballPage(
  name: string,
  kind: 'team' | 'person',
  candidates: Array<{ page: WikiPage; redirected: boolean }>,
  entities: Record<string, WikidataEntity>
): { page: WikiPage; entity: WikidataEntity } | 'ambiguous' | null {
  const core = footballCoreName(name, kind)
  const byQid = new Map<string, WikiPage>()
  for (const { page, redirected } of candidates) {
    const qid = page.pageprops!.wikibase_item!
    if ((footballCoreName(page.title, kind) === core || redirected) && isFootballEntity(entities[qid], kind)) byQid.set(qid, page)
  }
  if (byQid.size !== 1) return byQid.size > 1 ? 'ambiguous' : null
  const [qid, page] = [...byQid][0]
  return { page, entity: entities[qid] }
}

async function searchPage(
  name: string,
  kind: 'team' | 'person',
  options: EnrichmentOptions,
  signal: AbortSignal
): Promise<{ page: WikiPage; entity: WikidataEntity }> {
  const qualifier = kind === 'team'
    ? options.national ? 'national football team' : 'football club'
    : options.personRole === 'manager' ? 'football manager' : 'footballer'
  const { pages } = await wikiPages({
    generator: 'search',
    gsrsearch: `intitle:"${name.replace(/["\\]/g, ' ')}" ${qualifier}`,
    gsrnamespace: '0',
    gsrlimit: '10'
  }, signal)
  const entities = await wikidataEntities(pages.map((page) => page.pageprops!.wikibase_item!), 'claims', signal)
  const picked = pickFootballPage(name, kind, pages.map((page) => ({ page, redirected: false })), entities)
  if (picked && picked !== 'ambiguous') return picked
  throw new Error(picked === 'ambiguous'
    ? `Reference identity is ambiguous for ${name}`
    : `No football reference page found for ${name}`)
}

/** Resolves infobox files to raster URLs fifty at a time (SVG crests come back as PNG thumbnails). */
async function fileUrls(files: string[], width: number, signal: AbortSignal): Promise<Map<string, { url: string; license: string | null }>> {
  const found = new Map<string, { url: string; license: string | null }>()
  for (const group of chunks([...new Set(files)], 50)) {
    const params = new URLSearchParams({
      action: 'query',
      prop: 'imageinfo',
      iiprop: 'url|extmetadata',
      iiurlwidth: String(width),
      format: 'json',
      formatversion: '2',
      titles: group.map((file) => `File:${file}`).join('|')
    })
    const result = (await json(`https://en.wikipedia.org/w/api.php?${params}`, signal)).query ?? {}
    const normalized = new Map(((result.normalized ?? []) as Array<{ from: string; to: string }>).map((item) => [item.to, item.from]))
    for (const page of (result.pages ?? []) as Array<{ title: string; imageinfo?: Array<Record<string, any>> }>) {
      const info = page.imageinfo?.[0]
      const url = info?.thumburl ?? info?.url
      if (!url) continue
      const requested = (normalized.get(page.title) ?? page.title).replace(/^File:/, '')
      const license = String(info?.extmetadata?.LicenseShortName?.value ?? '').trim() || null
      found.set(requested, { url: String(url), license })
      found.set(page.title.replace(/^File:/, ''), { url: String(url), license })
    }
  }
  return found
}

async function sportsDbTeam(name: string, signal: AbortSignal): Promise<{ badge: string | null; colors: string[] } | null> {
  const payload = await json(`https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(name)}`, signal)
  const core = footballCoreName(name, 'team')
  const team = ((payload?.teams ?? []) as Array<Record<string, string | null>>).find(
    (item) => item.strSport === 'Soccer' && footballCoreName(String(item.strTeam ?? ''), 'team') === core
  )
  if (!team) return null
  const colors = [team.strColour1, team.strColour2]
    .map((value) => String(value ?? '').trim())
    .filter((value) => /^#?[0-9a-f]{6}$/i.test(value))
    .map((value) => `#${value.replace('#', '').toLowerCase()}`)
  return { badge: team.strBadge ?? null, colors }
}

type Spell = { qid: string; name: string; startDate: string | null; endDate: string | null }

/** Dated memberships (`P54` careers, `P286` head coaches) for many entities in one query each. */
async function datedLinks(qids: string[], property: 'P54' | 'P286', signal: AbortSignal): Promise<Map<string, Spell[]>> {
  const found = new Map<string, Spell[]>()
  for (const group of chunks(qids.filter((qid) => /^Q\d+$/.test(qid)), 30)) {
    const query = `SELECT ?subject ?item ?itemLabel ?start ?end WHERE {
      VALUES ?subject { ${group.map((qid) => `wd:${qid}`).join(' ')} }
      ?subject p:${property} ?statement .
      ?statement ps:${property} ?item .
      OPTIONAL { ?statement pq:P580 ?start . }
      OPTIONAL { ?statement pq:P582 ?end . }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    } ORDER BY ?subject ?start ?end ?itemLabel`
    const payload = await json(`https://query.wikidata.org/sparql?format=json&query=${encodeURIComponent(query)}`, signal)
    for (const row of (payload.results?.bindings ?? []) as any[]) {
      const subject = String(row.subject?.value ?? '').match(/Q\d+$/)?.[0]
      const qid = String(row.item?.value ?? '').match(/Q\d+$/)?.[0]
      const name = String(row.itemLabel?.value ?? '').trim()
      if (!subject || !qid || !name || /^Q\d+$/.test(name)) continue
      found.set(subject, [...(found.get(subject) ?? []), {
        qid,
        name,
        startDate: row.start?.value ? String(row.start.value).slice(0, 10) : null,
        endDate: row.end?.value ? String(row.end.value).slice(0, 10) : null
      }])
    }
  }
  return found
}

function hexColors(values: unknown[]): string[] {
  return values
    .map((value) => String(value).trim())
    .filter((value) => /^[0-9a-f]{6}$/i.test(value))
    .map((value) => `#${value.toLowerCase()}`)
}

/** Facts read from a club or person entity plus the labels and colours it links to. */
export function footballEntityFacts(
  entity: WikidataEntity,
  linked: Record<string, WikidataEntity>
): Pick<EnrichmentPayload, 'birthDate' | 'deathDate' | 'foundedYear' | 'nationality' | 'position' | 'heightCm' | 'birthPlace' | 'colors' | 'venue' | 'venueCapacity'> {
  const label = (id: string | undefined): string | null => (id ? linked[id]?.labels?.en?.value ?? null : null)
  const founded = claimTime(entity, 'P571')
  const height = claimValues(entity, 'P2048')[0] as { amount?: string; unit?: string } | undefined
  const heightValue = Number(height?.amount)
  const heightCm = !Number.isFinite(heightValue)
    ? null
    : height?.unit?.endsWith(METRE) ? Math.round(heightValue * 100) : height?.unit?.endsWith(CENTIMETRE) ? Math.round(heightValue) : null
  const ownColors = hexColors(claimValues(entity, 'P465'))
  const colors = ownColors.length
    ? ownColors
    : claimIds(entity, 'P6364').flatMap((id) => hexColors(claimValues(linked[id], 'P465')).slice(0, 1))
  const venueId = claimIds(entity, 'P115').at(-1)
  const capacity = Number((claimValues(linked[venueId ?? ''], 'P1083')[0] as { amount?: string } | undefined)?.amount)
  return {
    birthDate: claimTime(entity, 'P569'),
    deathDate: claimTime(entity, 'P570'),
    foundedYear: founded ? Number(founded.slice(0, 4)) : null,
    nationality: label(claimIds(entity, 'P1532')[0] ?? claimIds(entity, 'P27')[0]),
    position: label(claimIds(entity, 'P413')[0]),
    heightCm,
    birthPlace: label(claimIds(entity, 'P19')[0]),
    colors: [...new Set(colors)].slice(0, 2),
    venue: label(venueId),
    venueCapacity: Number.isFinite(capacity) && capacity > 0 ? Math.round(capacity) : null
  }
}

export interface EnrichmentItem {
  id: number
  name: string
  options?: EnrichmentOptions
}

/**
 * Reference data for many clubs or people at once: candidate titles, identities, linked
 * facts and image URLs are fetched in batches; only an unresolved name falls back to its
 * own title search. Each item yields its payload or the reason it could not be resolved.
 */
export async function fetchEnrichmentBatch(
  kind: 'team' | 'person',
  items: EnrichmentItem[],
  signal: AbortSignal
): Promise<Map<number, EnrichmentPayload | Error>> {
  const results = new Map<number, EnrichmentPayload | Error>()
  const titlesOf = new Map(items.map((item) => [item.id, footballTitleCandidates(item.name, kind, item.options?.national)]))
  const lookup = await lookupTitles([...titlesOf.values()].flat(), signal)
  const claims = await wikidataEntities([...lookup.pages.values()].map((page) => page.pageprops!.wikibase_item!), 'claims', signal)
  const resolved = new Map<number, { page: WikiPage; entity: WikidataEntity }>()
  for (const item of items) {
    const candidates = (titlesOf.get(item.id) ?? []).flatMap((title) => {
      const page = lookup.pages.get(lookup.landed.get(title) ?? title)
      return page ? [{ page, redirected: lookup.redirected.has(title) }] : []
    })
    const picked = pickFootballPage(item.name, kind, candidates, claims)
    if (picked && picked !== 'ambiguous') {
      resolved.set(item.id, picked)
      continue
    }
    try {
      resolved.set(item.id, await searchPage(item.name, kind, item.options ?? {}, signal))
    } catch (error) {
      if (signal.aborted) throw error
      results.set(item.id, error instanceof Error ? error : new Error(String(error)))
    }
  }

  const entities = [...resolved.values()].map(({ entity }) => entity)
  const linked = await wikidataEntities(entities.flatMap((entity) => [
    ...claimIds(entity, 'P6364'),
    ...claimIds(entity, 'P115').slice(-1),
    ...claimIds(entity, 'P413').slice(0, 1),
    ...claimIds(entity, 'P19').slice(0, 1),
    ...claimIds(entity, 'P1532').slice(0, 1),
    ...claimIds(entity, 'P27').slice(0, 1)
  ]), 'labels|claims', signal)
  const files = [...resolved.values()].flatMap(({ page, entity }) => {
    const logo = claimValues(entity, 'P154')[0]
    return [page.pageimage, kind === 'team' && typeof logo === 'string' ? logo : undefined].filter((file): file is string => !!file)
  })
  const urls = await fileUrls(files, kind === 'person' ? 480 : 320, signal)
  const qids = [...resolved.values()].map(({ page }) => page.pageprops!.wikibase_item!)
  const managedClubs = items.filter((item) => resolved.has(item.id) && !item.options?.national)
    .map((item) => resolved.get(item.id)!.page.pageprops!.wikibase_item!)
  const [careers, managers] = await Promise.all([
    kind === 'person' ? datedLinks(qids, 'P54', signal).catch(() => new Map<string, Spell[]>()) : Promise.resolve(new Map<string, Spell[]>()),
    kind === 'team' ? datedLinks(managedClubs, 'P286', signal).catch(() => new Map<string, Spell[]>()) : Promise.resolve(new Map<string, Spell[]>())
  ])

  for (const item of items) {
    const found = resolved.get(item.id)
    if (!found) continue
    const { page, entity } = found
    const qid = page.pageprops!.wikibase_item!
    const facts = footballEntityFacts(entity, linked)
    const logo = claimValues(entity, 'P154')[0]
    const source = urls.get(page.pageimage ?? '') ?? (kind === 'team' && typeof logo === 'string' ? urls.get(logo) : undefined)
    let imagePath = source ? await image(source.url) : null
    let imageLicense = imagePath ? source?.license ?? null : null
    // TheSportsDB is rate-limited to one call every two seconds, so it is asked only when a
    // club has no crest at all; missing colours alone fall back to the curated palette.
    if (kind === 'team' && !imagePath) {
      const fallback = await sportsDbTeam(item.name, signal).catch(() => null)
      if (fallback?.badge && !imagePath) {
        imagePath = await image(fallback.badge)
        imageLicense = imagePath ? 'TheSportsDB' : null
      }
      if (fallback && !facts.colors?.length) facts.colors = fallback.colors
    }
    if (kind === 'team' && !imagePath && item.options?.apiFootballTeamId) {
      imagePath = await image(`https://media.api-sports.io/football/teams/${encodeURIComponent(item.options.apiFootballTeamId)}.png`)
      imageLicense = imagePath ? 'API-Football' : null
    }
    results.set(item.id, {
      qid,
      title: page.title,
      body: String(page.extract ?? '').trim(),
      sourceUrl: page.fullurl ?? `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title.replace(/ /g, '_'))}`,
      revision: page.revisions?.[0]?.revid == null ? null : String(page.revisions[0].revid),
      imagePath,
      imageLicense,
      career: (careers.get(qid) ?? []).map((spell) => ({ teamQid: spell.qid, teamName: spell.name, startDate: spell.startDate, endDate: spell.endDate })),
      managers: (managers.get(qid) ?? []).map((spell) => ({ personQid: spell.qid, name: spell.name, startDate: spell.startDate, endDate: spell.endDate })),
      ...facts
    })
  }
  return results
}

export async function fetchEntityEnrichment(
  kind: 'team' | 'person',
  name: string,
  signal: AbortSignal,
  options: EnrichmentOptions = {}
): Promise<EnrichmentPayload> {
  const result = (await fetchEnrichmentBatch(kind, [{ id: 0, name, options }], signal)).get(0)
  if (!result) throw new Error(`No football reference page found for ${name}`)
  if (result instanceof Error) throw result
  return result
}

const COMPETITION_ARTICLES: Record<string, string> = {
  'premier-league': 'Premier League',
  'la-liga': 'La Liga',
  'serie-a': 'Serie A',
  bundesliga: 'Bundesliga',
  'champions-league': 'UEFA Champions League',
  'europa-league': 'UEFA Europa League',
  'conference-league': 'UEFA Conference League',
  'world-cup': 'FIFA World Cup',
  euros: 'UEFA European Championship'
}

/** The competition's current logo from its Wikipedia article infobox. */
export async function fetchCompetitionLogo(key: string, signal: AbortSignal): Promise<string | null> {
  const title = COMPETITION_ARTICLES[key]
  if (!title) return null
  const lookup = await lookupTitles([title], signal)
  const file = lookup.pages.get(lookup.landed.get(title) ?? title)?.pageimage
  const source = file ? (await fileUrls([file], 320, signal)).get(file) : undefined
  return source ? image(source.url) : null
}

export function saveCompetitionLogo(key: string, imagePath: string): void {
  getSqlite().prepare(`UPDATE football_competition SET image_path=?,updated_at=datetime('now') WHERE key=?`).run(imagePath, key)
}

function teamForQid(qid: string, name: string): number {
  const db = getSqlite()
  const existing = db.prepare(`
    SELECT entity_id FROM football_source_ref
    WHERE entity_kind='team' AND source='wikidata' AND external_id=?
  `).get(qid) as { entity_id: number } | undefined
  if (existing) return existing.entity_id
  const normalized = normalizeFootballName(name)
  const candidates = db.prepare(`
    SELECT DISTINCT entity_id AS id FROM football_alias WHERE entity_kind='team' AND normalized=?
  `).all(normalized) as { id: number }[]
  const id = candidates.length === 1
    ? candidates[0].id
    : Number(db.prepare(`INSERT INTO football_team (name) VALUES (?)`).run(name).lastInsertRowid)
  db.prepare(`INSERT OR IGNORE INTO football_alias
    (entity_kind,entity_id,source,alias,normalized,external_id)
    VALUES ('team',?,'wikidata',?,?,?)`).run(id, name, normalized, qid)
  db.prepare(`INSERT INTO football_source_ref
    (entity_kind,entity_id,source,external_id,fetched_at)
    VALUES ('team',?,'wikidata',?,datetime('now'))`).run(id, qid)
  return id
}

/**
 * The archive person a Wikidata coach is: by identity, else the one namesake who played
 * for this club within a career span, else a new manager quarantined beside any namesakes.
 */
function personForQid(qid: string, name: string, teamId: number, startDate: string | null): number {
  const db = getSqlite()
  const existing = db.prepare(`SELECT entity_id FROM football_source_ref
    WHERE entity_kind='person' AND source='wikidata' AND external_id=?`).get(qid) as { entity_id: number } | undefined
  if (existing) return existing.entity_id
  const normalized = normalizeFootballName(name)
  const sameTeam = startDate ? sameTeamPersonIds(normalized, teamId, startDate) : []
  let id: number
  if (sameTeam.length === 1) {
    id = sameTeam[0]
    db.prepare(`UPDATE football_person SET role='both' WHERE id=? AND role='player'`).run(id)
  } else {
    const sameNames = db.prepare(`SELECT DISTINCT entity_id AS id FROM football_alias
      WHERE entity_kind='person' AND normalized=?`).all(normalized) as { id: number }[]
    id = Number(db.prepare(`INSERT INTO football_person (name,role) VALUES (?,'manager')`).run(name).lastInsertRowid)
    if (sameNames.length) {
      db.prepare(`INSERT INTO football_conflict (entity_kind,entity_id,facet,source_a,value_a,source_b,value_b)
        VALUES ('person',?,'identity','wikidata',?,'archive',?)`).run(id, name, `Possible matches: ${sameNames.map((row) => row.id).join(',')}`)
    }
  }
  db.prepare(`INSERT OR IGNORE INTO football_alias (entity_kind,entity_id,source,alias,normalized,external_id)
    VALUES ('person',?,'wikidata',?,?,?)`).run(id, name, normalized, qid)
  db.prepare(`INSERT OR IGNORE INTO football_source_ref (entity_kind,entity_id,source,external_id,fetched_at)
    VALUES ('person',?,'wikidata',?,datetime('now'))`).run(id, qid)
  return id
}

export function saveEntityEnrichment(
  kind: 'team' | 'person',
  entityId: number,
  payload: EnrichmentPayload,
  quizPack: boolean
): boolean {
  const db = getSqlite()
  return db.transaction(() => {
    const existingQid = payload.qid
      ? db.prepare(`
          SELECT entity_id FROM football_source_ref
          WHERE entity_kind=? AND source='wikidata' AND external_id=?
        `).get(kind, payload.qid) as { entity_id: number } | undefined
      : undefined
    const identityConflict = existingQid != null && existingQid.entity_id !== entityId
    if (identityConflict) {
      const alreadyOpen = db.prepare(`
        SELECT 1 FROM football_conflict WHERE entity_kind=? AND entity_id=?
          AND facet='identity' AND source_b='wikidata' AND value_b=? AND status='open'
      `).get(kind, entityId, payload.qid) as { 1: number } | undefined
      if (!alreadyOpen) {
        db.prepare(`
          INSERT INTO football_conflict
            (entity_kind,entity_id,facet,source_a,value_a,source_b,value_b)
          VALUES (?,?,'identity','archive',?,'wikidata',?)
        `).run(
          kind,
          entityId,
          payload.title,
          `${payload.qid} already identifies ${kind} ${existingQid.entity_id}`
        )
      }
      db.prepare(`UPDATE ${kind === 'person' ? 'football_person' : 'football_team'}
        SET enrichment_state='error',updated_at=datetime('now') WHERE id=?`).run(entityId)
      if (kind === 'person') {
        db.prepare(`UPDATE football_person SET quiz_pack=0 WHERE id=?`).run(entityId)
      }
      return false
    }
    db.prepare(`
      INSERT INTO football_article
        (entity_kind,entity_id,title,body,source_url,revision,license,attribution,state,fetched_at)
      VALUES (?,?,?,?,?,?,'CC BY-SA 4.0','Wikipedia contributors','ready',datetime('now'))
      ON CONFLICT(entity_kind,entity_id,source_url) DO UPDATE SET
        title=excluded.title,body=excluded.body,revision=excluded.revision,
        license=excluded.license,attribution=excluded.attribution,state='ready',fetched_at=excluded.fetched_at
    `).run(kind, entityId, payload.title, payload.body, payload.sourceUrl, payload.revision)
    if (kind === 'person') {
      db.prepare(`UPDATE football_person SET bio=?,birth_date=COALESCE(?,birth_date),
        death_date=COALESCE(?,death_date),nationality=COALESCE(?,nationality),
        position=COALESCE(?,position),height_cm=COALESCE(?,height_cm),birth_place=COALESCE(?,birth_place),
        image_path=COALESCE(?,image_path),enrichment_state='ready',enriched_at=datetime('now'),
        updated_at=datetime('now') WHERE id=?`).run(
        payload.body,
        payload.birthDate,
        payload.deathDate ?? null,
        payload.nationality ?? null,
        payload.position ?? null,
        payload.heightCm ?? null,
        payload.birthPlace ?? null,
        payload.imagePath,
        entityId
      )
    } else {
      db.prepare(`UPDATE football_team SET bio=?,founded_year=COALESCE(?,founded_year),
        primary_color=COALESCE(?,primary_color),secondary_color=COALESCE(?,secondary_color),
        venue=COALESCE(?,venue),venue_capacity=COALESCE(?,venue_capacity),
        image_path=COALESCE(?,image_path),enrichment_state='ready',enriched_at=datetime('now'),
        updated_at=datetime('now') WHERE id=?`).run(
        payload.body,
        payload.foundedYear,
        payload.colors?.[0] ?? null,
        payload.colors?.[1] ?? null,
        payload.venue ?? null,
        payload.venueCapacity ?? null,
        payload.imagePath,
        entityId
      )
    }
    if (kind === 'team' && payload.managers?.length) {
      db.prepare(`DELETE FROM football_tenure WHERE team_id=? AND role='manager'`).run(entityId)
      const insert = db.prepare(`INSERT INTO football_tenure
        (person_id,team_id,role,start_date,end_date,loan,verified,complete,sort_order)
        VALUES (?,?,'manager',?,?,0,1,0,?)`)
      payload.managers.forEach((manager, index) => insert.run(
        personForQid(manager.personQid, manager.name, entityId, manager.startDate),
        entityId,
        manager.startDate,
        manager.endDate,
        index
      ))
    }
    if (payload.qid) {
      db.prepare(`
        INSERT INTO football_source_ref
          (entity_kind,entity_id,source,external_id,source_url,revision,fetched_at)
        VALUES (?,?,'wikidata',?,?,?,datetime('now'))
        ON CONFLICT(entity_kind,source,external_id) DO UPDATE SET
          entity_id=excluded.entity_id,source_url=excluded.source_url,
          revision=excluded.revision,fetched_at=excluded.fetched_at
      `).run(kind, entityId, payload.qid, payload.sourceUrl, payload.revision)
    }
    // The quiz pack keeps a career only when it is complete; an ordinary reference fetch
    // keeps whatever resolved spells it found, marked incomplete, for the career views.
    const spells = payload.career.filter((spell) => spell.teamQid)
    if (kind === 'person' && (quizPack || spells.length)) {
      db.prepare(`DELETE FROM football_tenure WHERE person_id=? AND role='player'`).run(entityId)
      const complete = payload.career.length >= 4 && payload.career.every((spell) => spell.startDate != null)
      if (quizPack ? complete : spells.length) {
        const insert = db.prepare(`
          INSERT INTO football_tenure
            (person_id,team_id,role,start_date,end_date,loan,verified,complete,sort_order)
          VALUES (?,?,'player',?,?,0,1,?,?)
        `)
        const written = quizPack ? payload.career : spells
        written.forEach((spell, index) => insert.run(
          entityId,
          teamForQid(spell.teamQid, spell.teamName),
          spell.startDate,
          spell.endDate,
          complete ? 1 : 0,
          index
        ))
      }
      if (quizPack) db.prepare(`UPDATE football_person SET quiz_pack=? WHERE id=?`).run(complete ? 1 : 0, entityId)
    }
    return true
  })()
}

export function noteEnrichmentError(kind: 'team' | 'person', entityId: number): void {
  getSqlite().prepare(`UPDATE ${kind === 'person' ? 'football_person' : 'football_team'}
    SET enrichment_state='error',updated_at=datetime('now') WHERE id=?`).run(entityId)
}
