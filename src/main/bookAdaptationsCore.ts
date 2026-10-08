// Book → screen adaptations through Wikidata — the pure half. A book's item is
// found from its English Wikipedia article (exact) or, failing that, a
// CirrusSearch over written works checked against the title and an author
// (exact title + author name). Its adaptations are the items whose "based on"
// (P144) names it, read for TMDB movie (P4947), TMDB TV (P4983) and AniList
// anime (P8729) ids — the keys the library's own movie, TV and anime rows use.
//
// CirrusSearch (`haswbstatement:`) rather than the SPARQL endpoint: the same
// reverse lookup took about 20 s on WDQS (and often 502'd) against about 1 s here.

/* eslint-disable @typescript-eslint/no-explicit-any */

// Written-work classes a novel's item is commonly an instance of: literary
// work, novel, written work, book, short story, graphic novel, poem, novella.
export const WORK_CLASSES = ['Q7725634', 'Q8261', 'Q47461344', 'Q571', 'Q49084', 'Q725377', 'Q5185279', 'Q149537']

export function workSearchQuery(title: string): string {
  const clean = title.replace(/["\\]/g, ' ').replace(/\s+/g, ' ').trim()
  return `"${clean}" haswbstatement:${WORK_CLASSES.map((q) => `P31=${q}`).join('|')}`
}

export function adaptationSearchQuery(qid: string): string {
  return `haswbstatement:P144=${qid}`
}

export function isQid(v: unknown): v is string {
  return typeof v === 'string' && /^Q[1-9]\d*$/.test(v)
}

// Fold case, accents and punctuation: "J. R. R. Tolkien" and "J.R.R. Tolkien"
// meet, as do "Dune: Messiah" and "Dune Messiah".
export function foldName(s: string): string {
  return s
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^\p{L}\p{N}]+/gu, '')
}

// A book title matches an item label exactly, or with the subtitle after a
// colon dropped on either side ("Dune: Book One" vs "Dune").
export function titleMatches(label: string, title: string): boolean {
  const forms = (s: string): string[] => {
    const whole = foldName(s)
    const head = foldName(s.split(/[:(]/)[0] ?? s)
    return [whole, head].filter(Boolean)
  }
  const a = forms(label)
  const b = forms(title)
  return a.some((x) => b.includes(x))
}

export function searchHitIds(json: any): string[] {
  const hits = Array.isArray(json?.query?.search) ? json.query.search : []
  return hits.map((h: any) => h?.title).filter(isQid)
}

export function wikipediaItemId(json: any): string | null {
  const pages = json?.query?.pages
  if (!pages || typeof pages !== 'object') return null
  for (const page of Object.values(pages) as any[]) {
    const id = page?.pageprops?.wikibase_item
    if (isQid(id)) return id
  }
  return null
}

function claimValues(entity: any, prop: string): any[] {
  const claims = entity?.claims?.[prop]
  if (!Array.isArray(claims)) return []
  return claims
    .filter((c: any) => c?.rank !== 'deprecated')
    .map((c: any) => c?.mainsnak?.datavalue?.value)
    .filter((v: any) => v != null)
}

export function claimItemIds(entity: any, prop: string): string[] {
  return claimValues(entity, prop)
    .map((v: any) => v?.id)
    .filter(isQid)
}

function claimString(entity: any, prop: string): string | null {
  const v = claimValues(entity, prop).find((x: any) => typeof x === 'string' && x.trim())
  return typeof v === 'string' ? v.trim() : null
}

export function englishLabel(entity: any): string | null {
  const v = entity?.labels?.en?.value
  return typeof v === 'string' && v.trim() ? v.trim() : null
}

export function entitiesOf(json: any): Record<string, any> {
  const e = json?.entities
  return e && typeof e === 'object' ? e : {}
}

// The search candidates (in search order) whose label matches the title and
// whose author (P50) is one of the book's authors, by folded name. `authorLabels`
// maps each author item id to its English label.
export function pickWork(
  candidates: string[],
  entities: Record<string, any>,
  authorLabels: Record<string, string>,
  title: string,
  authors: string[]
): string | null {
  const wanted = new Set(authors.map(foldName).filter(Boolean))
  if (wanted.size === 0) return null
  for (const qid of candidates) {
    const e = entities[qid]
    const label = englishLabel(e)
    if (!label || !titleMatches(label, title)) continue
    const ok = claimItemIds(e, 'P50').some((a) => {
      const name = authorLabels[a]
      return !!name && wanted.has(foldName(name))
    })
    if (ok) return qid
  }
  return null
}

// The Wikipedia link can point at the author or the series rather than the
// book. Accept the item only if it is not a person and either names one of the
// authors or carries the book's title.
export function acceptLinkedItem(
  entity: any,
  authorLabels: Record<string, string>,
  title: string,
  authors: string[]
): boolean {
  if (!entity) return false
  if (claimItemIds(entity, 'P31').includes('Q5')) return false
  const label = englishLabel(entity)
  if (label && titleMatches(label, title)) return true
  const wanted = new Set(authors.map(foldName).filter(Boolean))
  return claimItemIds(entity, 'P50').some((a) => {
    const name = authorLabels[a]
    return !!name && wanted.has(foldName(name))
  })
}

export interface Adaptation {
  kind: 'movie' | 'tv' | 'anime'
  // The id in the library's own key space: TMDB for movies and TV, AniList for anime.
  externalId: string
  title: string
}

// Each adapting item contributes the first id it has, in TMDB movie, TMDB TV,
// AniList order; an item with none of them cannot link to a library row.
export function parseAdaptations(entities: Record<string, any>): Adaptation[] {
  const out: Adaptation[] = []
  const seen = new Set<string>()
  for (const [qid, e] of Object.entries(entities)) {
    if (!isQid(qid) || e?.missing !== undefined) continue
    const title = englishLabel(e) ?? qid
    const movie = claimString(e, 'P4947')
    const tv = claimString(e, 'P4983')
    const anime = claimString(e, 'P8729')
    const pick: Adaptation | null =
      movie && /^\d+$/.test(movie)
        ? { kind: 'movie', externalId: movie, title }
        : tv && /^\d+$/.test(tv)
          ? { kind: 'tv', externalId: tv, title }
          : anime && /^\d+$/.test(anime)
            ? { kind: 'anime', externalId: anime, title }
            : null
    if (!pick) continue
    const key = `${pick.kind}:${pick.externalId}`
    if (seen.has(key)) continue
    seen.add(key)
    out.push(pick)
  }
  return out.sort((a, b) => a.kind.localeCompare(b.kind) || a.title.localeCompare(b.title))
}

// How each adaptation is stored as a media_relation edge on the book.
export function adaptationEdge(a: Adaptation): { relatedSource: string; relatedType: string } {
  return a.kind === 'anime'
    ? { relatedSource: 'anilist', relatedType: 'anime' }
    : { relatedSource: 'tmdb', relatedType: a.kind }
}
