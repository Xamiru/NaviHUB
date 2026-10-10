// PURE: the History "Quality bar" (SKILL.md; the 2026-10-07 content review) as
// machine checks. Unlike validate.ts these are editorial: a page can be valid and
// still open mid-story or repeat itself. tests/historyContent.test.ts holds the
// committed catalog to lint.baseline.json, so issues that already existed stay
// listed until fixed while new content must arrive clean.

import type { HistoryCatalog } from './model'
import { refOf, type HistoryEntity, type NameVariant, type Quote, type Section } from './schema'
import type { Issue } from './validate'

const ARTICLE_KINDS = new Set(['event', 'person', 'period', 'polity', 'theme'])

/** A first quote that points back at text the reader has not seen. */
const DANGLING = /^(He|She|His|Her|It|Its|They|Their|This|These|Those|However|Nonetheless|But|And|Yet|Also|Thus|Then|Meanwhile|In that|In this|At this|The latter|The former|In the meantime|The following|Not only)\b/
/** "1826 Second war with Russia; ...": a chronology line, not a description. */
const CHRONOLOGY = /^\d{3,4}\s/
/** A quote that ends inside a bibliography parenthesis. */
const CITATION_TAIL = /\([^()]*(\bpp?\.\s*\d|\bop\. cit|\bq\.v\.|\bibid\b)[^()]*\)\s*[.;,]?\s*$/i
/** Scan damage: broken hyphenation, digits for letters, symbols for currency, known glued words. */
const OCR = [
  /\b[a-z]{2,}- (?!(?:and|or|to|nor)\b)[a-z]{2,}\b/,
  /\b[il]\d{3}\b/,
  /\b0(?:ctober|n|f)\b/,
  /β\d/,
  /\b(?:toobtain|hisbeing|asone|onethird|anti-Alliedactivities)\b/,
  /\[\[Page /,
  /\b[a-z]+ C (?:of|Kurdish)\b/
]
/** An English quote cut from inside a sentence; a few names legitimately start lowercase. */
const FRAGMENT = /^(?!al-|el-|ad-|ibn |bin |de |van |von |da |du |la |le |e\.g\.|i\.e\.|c\.|ca\.|(?:eBay|iPhone)\b)[a-z]/
/** A section that opens mid-story: a time step or reaction with nothing before it. */
const MIDSTORY = /^(A (few|couple of) (days|weeks|months|years) later|(Some|Two|Three|Several) (days|weeks|months|years) later|Shortly (after|afterwards|thereafter)|Soon (after|afterwards|thereafter)|Later|Afterwards|After (this|that|which)|Upon (his|her|their|this|that)|Following (this|that)|The next|Next|Again|Once again|Finally|Eventually|Thereafter|Subsequently)\b/
/**
 * Outlets of a government's own propaganda. Their words may appear only as that
 * government's claim inside an interpretation, never as facts or narration.
 */
const STATE_OUTLETS = /(^|\.)(khamenei\.ir|imam-khomeini\.ir|leader\.ir|president\.ir|irna\.ir|presstv\.ir|tasnimnews\.com|farsnews\.ir|mehrnews\.com)$/
const OPENER_LANGS = new Set(['en', 'fa'])
const RESULT_SECTIONS = new Set(['consequences', 'aftermath', 'legacy'])

function norm(s: string): string {
  return s
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function quotesOf(node: unknown, out: Quote[] = []): Quote[] {
  if (!node || typeof node !== 'object') return out
  if (Array.isArray(node)) {
    for (const n of node) quotesOf(n, out)
    return out
  }
  const o = node as Record<string, unknown>
  if (typeof o.text === 'string' && o.cite && typeof o.id === 'string') out.push(o as unknown as Quote)
  for (const v of Object.values(o)) quotesOf(v, out)
  return out
}

function opener(sections: Section[] | undefined): Quote | undefined {
  return sections?.find((s) => s.kind === 'overview')?.quotes[0]
}

const hasLang = (names: NameVariant[], lang: string): boolean => names.some((n) => n.lang === lang)

export function lintCatalog(catalog: HistoryCatalog, entities: HistoryEntity[]): Issue[] {
  const issues: Issue[] = []
  const add = (code: string, ref: string, message: string, path?: string): void => {
    issues.push({ severity: 'warning', code, ref, path, message })
  }

  // Name lookups for participants and sides that could link to a page.
  const personByName = new Map<string, string>()
  for (const p of catalog.people.values()) for (const n of p.names) personByName.set(norm(n.text), refOf('person', p.id))
  const polityByName = new Map<string, string>()
  for (const p of catalog.polities.values()) for (const n of p.names) polityByName.set(norm(n.text), refOf('polity', p.id))

  // Interpretations show on the pages they are about.
  const aboutPage = new Map<string, Quote[]>()
  for (const i of catalog.interpretations.values()) {
    for (const r of i.about) aboutPage.set(r, [...(aboutPage.get(r) ?? []), ...quotesOf(i)])
  }

  const imageUse = new Map<string, string[]>()

  const outlet = (id: string): boolean => {
    const url = catalog.sources.get(id)?.url
    if (!url) return false
    try {
      return STATE_OUTLETS.test(new URL(url).hostname)
    } catch {
      return false
    }
  }
  /** Every source a node cites, quotes and claims alike. */
  const citedIn = (node: unknown, out: string[] = []): string[] => {
    if (!node || typeof node !== 'object') return out
    if (Array.isArray(node)) {
      for (const n of node) citedIn(n, out)
      return out
    }
    const o = node as Record<string, unknown>
    if (typeof o.source === 'string' && o.loc) out.push(o.source)
    for (const v of Object.values(o)) citedIn(v, out)
    return out
  }

  for (const i of catalog.interpretations.values()) {
    const ref = refOf('interpretation', i.id)
    i.positions.forEach((p, n) => {
      if (p.category === 'official' && !p.reception?.length) {
        add('claim-unanswered', ref, `the government claim "${p.id}" has no independent assessment`, `positions[${n}]`)
      }
      // A government outlet speaks only for its government: in its own claim.
      const elsewhere = p.category === 'official' ? citedIn(p.reception) : citedIn(p)
      for (const id of new Set(elsewhere.filter(outlet))) {
        add('state-outlet', ref, `${id} is cited outside its government's claim`, `positions[${n}]`)
      }
    })
    for (const id of new Set(citedIn(i.framing).filter(outlet))) add('state-outlet', ref, `${id} frames the question`, 'framing')
  }

  /** Checks every quote on its own, wherever it sits. */
  const quoteChecks = (ref: string, quotes: Quote[]): void => {
    for (const q of quotes) {
      if (q.lang === 'en' && FRAGMENT.test(q.text)) add('fragment', ref, 'the quote starts inside a sentence', q.id)
      const para = q.cite.loc?.para
      if (para !== undefined && !/^[1-9]\d*$/.test(para)) add('bad-locator', ref, `paragraph "${para}" is not a paragraph number`, q.id)
      if (CITATION_TAIL.test(q.text)) add('citation-tail', ref, 'the quote ends in a citation parenthesis', q.id)
      if (OCR.some((re) => re.test(q.text))) add('ocr', ref, 'the quote carries scan damage', q.id)
    }
  }
  for (const e of entities) if (e.kind === 'interpretation') quoteChecks(refOf('interpretation', e.id), quotesOf(e))

  for (const e of entities) {
    if (!ARTICLE_KINDS.has(e.kind) || !('names' in e)) continue
    const ref = refOf(e.kind, e.id)
    const sections = 'sections' in e ? (e.sections as Section[]) : undefined
    const first = opener(sections)

    if (e.kind !== 'theme' && e.kind !== 'period') {
      if (!first) add('no-overview', ref, 'the page has no overview')
      else {
        if (!OPENER_LANGS.has(first.lang)) add('opener-language', ref, `the opener is in "${first.lang}"`, first.id)
        if (DANGLING.test(first.text)) add('opener-dangling', ref, 'the opener starts mid-story', first.id)
        if (CHRONOLOGY.test(first.text)) add('chronology-opener', ref, 'the opener is a chronology line', first.id)
      }
    }

    for (const id of new Set(citedIn(e).filter(outlet))) add('state-outlet', ref, `${id} is cited as fact or narration`, id)

    sections?.forEach((s, n) => {
      const q = s.quotes[0]
      if (s.kind !== 'overview' && q && (MIDSTORY.test(q.text) || /^[a-z]/.test(q.text) || (e.kind !== 'person' && DANGLING.test(q.text)))) {
        add('section-opener', ref, `the ${s.kind} section opens mid-story`, q.id)
      }
    })

    const own = quotesOf(e)
    quoteChecks(ref, own)

    // The same words twice on one page (the entity plus the interpretations about it).
    const page = [...own, ...(aboutPage.get(ref) ?? [])]
    const seen = new Set<string>()
    for (let a = 0; a < page.length; a++) {
      for (let b = a + 1; b < page.length; b++) {
        const x = page[a].text.trim()
        const y = page[b].text.trim()
        const short = x.length <= y.length ? x : y
        const long = x.length <= y.length ? y : x
        if (short.length >= 40 && long.includes(short) && !seen.has(short)) {
          seen.add(short)
          add('repeat', ref, `"${short.slice(0, 50)}" appears twice on the page`)
        }
      }
    }

    if (e.kind === 'event') {
      e.participants?.forEach((p, i) => {
        const match = !p.ref && p.name ? personByName.get(norm(p.name)) : undefined
        if (match) add('unlinked-participant', ref, `"${p.name}" has a page (${match})`, `participants[${i}]`)
      })
      e.sides?.forEach((s, i) => {
        const match = !s.polity ? polityByName.get(norm(s.name)) : undefined
        if (match) add('state-unlinked', ref, `side "${s.name}" is a state with a page (${match})`, `sides[${i}]`)
      })
      if (e.regions.includes('iran') && !hasLang(e.names, 'fa')) add('missing-native-name', ref, 'an Iran event without a Persian name')
      if (e.prominence <= 2) {
        if (!e.course?.length) add('thin-lead', ref, 'a leading event without a dated course of events')
        if (!sections?.some((s) => RESULT_SECTIONS.has(s.kind))) add('thin-lead', ref, 'a leading event without consequences', 'sections')
      }
    }
    if (e.kind === 'person') {
      if (e.regions[0] === 'iran' && !hasLang(e.names, 'fa')) add('missing-native-name', ref, 'an Iranian without a Persian name')
      if (!e.born || !e.died) add('person-dates', ref, `no ${!e.born ? 'birth' : 'death'} date`)
    }

    const img = e.kind === 'person' ? e.portrait : 'hero' in e ? e.hero : undefined
    if (img) {
      const key = img.page ?? img.url
      imageUse.set(key, [...(imageUse.get(key) ?? []), ref])
    }
  }

  for (const [image, refs] of imageUse) {
    if (refs.length > 3) add('image-reuse', refs[0], `one image on ${refs.length} pages`, image)
  }
  return issues
}

/** A stable key for the baseline: code, page and place, never the message text. */
export function lintKey(i: Issue): string {
  return `${i.code}|${i.ref ?? ''}|${i.path ?? ''}`
}

