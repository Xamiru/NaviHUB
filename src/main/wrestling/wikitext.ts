// Hand-rolled wikitext parsing for wrestling event articles. PURE — no fetch,
// no fs, no electron — so tests drive it with real fixture slices and no
// network (the epub.ts / @shared/subtitles.ts / dict/wordnet.ts house style).
// There is no wikitext dependency and there deliberately never will be: we need
// six fields out of an article, not a MediaWiki reimplementation.
//
// The shape that makes this tractable was verified against the live API rather
// than assumed: event cards are NOT wikitables, they are template parameters —
//
//   |match1  = [[Chris Jericho]] (c) defeated [[William Regal]]
//   |stip1   = [[Singles match]] for the [[WWF Intercontinental Championship]]
//   |time1   = 7:40
//
// — and that convention holds across WWE (WrestleMania X-Seven), WCW (Starrcade
// 1997) and NJPW (Wrestle Kingdom 17), across 25 years, even though the
// TEMPLATE NAME varies ("Pro Wrestling results table", "Professional wrestling
// results table"). So we key on the parameters, never on the name, and keep a
// raw-wikitable fallback for articles nobody has converted yet.
//
// ---------------------------------------------------------------------------
// NOT_SUPPORTED — deliberate omissions, not bugs. Each is a decision:
//
//  * Per-side grouping beyond winners/losers. "A defeated B and C" in a triple
//    threat records side 0 = {A}, side 1 = {B, C}, even though B and C were not
//    a team. Reconstructing true sides needs the stipulation's semantics, and
//    the display ("A vs. B & C") is unaffected.
//  * Battle-royal / rumble entrant lists. They live in {{efn|Participants were:
//    …}} footnotes of up to 30 names; we record the WINNER and drop the rest.
//    Storing 30 participants per rumble would drown the wrestler match counts
//    in appearances nobody would call a match.
//  * Managers and seconds. "(with [[Miss Elizabeth]])" is removed before
//    participants are read — they were at ringside, not in the match.
//  * Title lineage. We capture the championship NAME on a match; who held it
//    before and after is a different data shape (reigns, not matches) and the
//    user scoped it out.
//  * Match-time footnotes, commentary, `<ref>` citations, image galleries, and
//    every template other than the infobox and the results card.
// ---------------------------------------------------------------------------

import { wikiHref } from '@shared/wikiLinks'
import {
  EVENT_INFOBOXES,
  RESULTS_TEMPLATES,
  SERIES_INFOBOXES
} from '@shared/wrestling'

export interface WikiLink {
  target: string // article title as written, before redirect resolution
  display: string
}

export interface WikiTemplate {
  name: string
  params: Map<string, string>
}

// One row of a card, straight out of the results template — still raw wikitext.
export interface RawMatch {
  index: number // running order across every results table on the page
  card: string | null // the table's |caption ("Night 1") when it had one
  match: string
  stip: string | null
  time: string | null
  note: string | null
}

export interface ParsedParticipant {
  link: WikiLink | null // null = a name with no article (rendered as plain text)
  name: string
  side: number
  won: boolean
  isChampion: boolean
  teamName: string | null
}

export type ParsedOutcome = 'decision' | 'draw' | 'nocontest' | 'unknown'

export interface ParsedMatch {
  participants: ParsedParticipant[]
  outcome: ParsedOutcome
  title: string // "A & B vs. C & D", or the plain result text when unsplittable
}

// ---------------------------------------------------------------------------
// Low-level scanning
// ---------------------------------------------------------------------------

export function normalizeTemplateName(name: string): string {
  return name.trim().replace(/_/g, ' ').replace(/\s+/g, ' ').toLowerCase()
}

// Splits a template body on top-level `|`, respecting nested templates,
// wikilinks and tables. Naive splitting breaks on the very first real article:
// `|date = {{start date|2001|4|1}}` has two pipes that are NOT separators.
function splitTopLevel(body: string): string[] {
  const out: string[] = []
  let brace = 0
  let bracket = 0
  let table = 0
  let cur = ''
  for (let i = 0; i < body.length; i++) {
    const two = body.slice(i, i + 2)
    if (two === '{{') {
      brace++
      cur += two
      i++
      continue
    }
    if (two === '}}') {
      brace--
      cur += two
      i++
      continue
    }
    if (two === '[[') {
      bracket++
      cur += two
      i++
      continue
    }
    if (two === ']]') {
      bracket--
      cur += two
      i++
      continue
    }
    if (two === '{|') {
      table++
      cur += two
      i++
      continue
    }
    // `|}` closes a table — must be tested before the bare-pipe case below.
    if (two === '|}' && table > 0) {
      table--
      cur += two
      i++
      continue
    }
    if (body[i] === '|' && brace === 0 && bracket === 0 && table === 0) {
      out.push(cur)
      cur = ''
      continue
    }
    cur += body[i]
  }
  out.push(cur)
  return out
}

// Splits one wikitable row on its top-level `||` separators, respecting nested
// templates and links.
function splitCells(line: string): string[] {
  const out: string[] = []
  let brace = 0
  let bracket = 0
  let cur = ''
  for (let i = 0; i < line.length; i++) {
    const two = line.slice(i, i + 2)
    if (two === '{{') { brace++; cur += two; i++; continue }
    if (two === '}}') { brace--; cur += two; i++; continue }
    if (two === '[[') { bracket++; cur += two; i++; continue }
    if (two === ']]') { bracket--; cur += two; i++; continue }
    if (two === '||' && brace === 0 && bracket === 0) {
      out.push(cur)
      cur = ''
      i++
      continue
    }
    cur += line[i]
  }
  out.push(cur)
  return out
}

// Reads the balanced `{{ … }}` starting at `start`. Returns null if unbalanced
// (a truncated article shouldn't throw).
function readTemplateAt(text: string, start: number): { body: string; end: number } | null {
  if (text.slice(start, start + 2) !== '{{') return null
  let depth = 0
  for (let i = start; i < text.length; i++) {
    const two = text.slice(i, i + 2)
    if (two === '{{') {
      depth++
      i++
      continue
    }
    if (two === '}}') {
      depth--
      i++
      if (depth === 0) return { body: text.slice(start + 2, i - 1), end: i + 1 }
      continue
    }
  }
  return null
}

function templateFromBody(body: string): WikiTemplate {
  const parts = splitTopLevel(body)
  const name = (parts.shift() ?? '').trim()
  const params = new Map<string, string>()
  let positional = 0
  for (const part of parts) {
    const eq = part.indexOf('=')
    // A `=` only names a parameter when it sits before any markup; otherwise
    // it's content (a URL, an HTML attribute) and the param is positional.
    if (eq > 0 && !/[[{]/.test(part.slice(0, eq))) {
      params.set(part.slice(0, eq).trim().toLowerCase(), part.slice(eq + 1).trim())
    } else {
      positional++
      params.set(String(positional), part.trim())
    }
  }
  return { name: normalizeTemplateName(name), params }
}

// Finds every template whose normalized name is in `names`, in document order.
// Scans every `{{` (not just top-level ones) because a results card can sit
// inside a section wrapper; articles are small enough that this is free.
export function findTemplates(
  text: string,
  names: string[],
  opts: { nested?: boolean } = {}
): WikiTemplate[] {
  const wanted = new Set(names.map(normalizeTemplateName))
  const out: WikiTemplate[] = []
  for (let i = 0; i < text.length; i++) {
    if (text[i] !== '{' || text[i + 1] !== '{') continue
    const read = readTemplateAt(text, i)
    if (!read) continue
    const tpl = templateFromBody(read.body)
    if (wanted.has(tpl.name)) {
      out.push(tpl)
      // Skip past it — a results table never nests another one, and this keeps
      // the scan linear. `nested` turns that off for wrestler infoboxes, which
      // routinely sit INSIDE an {{Infobox person|module=…}} wrapper: skipping
      // the outer match would hide the inner box that holds every field.
      if (!opts.nested) i = read.end - 1
    }
  }
  return out
}

export function findTemplate(text: string, names: string[]): WikiTemplate | null {
  return findTemplates(text, names)[0] ?? null
}

// Some infoboxes are named by prefix rather than exactly ("Infobox wrestling
// event series" vs "Infobox wrestling event"), so classification tries the
// most specific set first.
export function classifyArticle(text: string): 'event' | 'series' | 'other' {
  if (findTemplate(text, SERIES_INFOBOXES)) return 'series'
  if (findTemplate(text, EVENT_INFOBOXES)) return 'event'
  return 'other'
}

export function findEventInfobox(text: string): WikiTemplate | null {
  return findTemplate(text, EVENT_INFOBOXES)
}

// ---------------------------------------------------------------------------
// Links and markup
// ---------------------------------------------------------------------------

// Namespaced links are never people or events.
const SKIP_NS = /^(file|image|category|media|template|wikipedia|help|portal):/i

export function parseWikiLinks(text: string): WikiLink[] {
  const out: WikiLink[] = []
  const re = /\[\[([^\]|]+)(?:\|([^\]]*))?\]\]/g
  let m: RegExpExecArray | null
  while ((m = re.exec(text))) {
    const target = m[1].trim()
    if (!target || SKIP_NS.test(target)) continue
    // Strip a section anchor: [[Foo#Bar|baz]] still points at Foo.
    const clean = target.split('#')[0].trim()
    if (!clean) continue
    out.push({ target: clean, display: (m[2] ?? '').trim() || clean })
  }
  return out
}

// Wikipedia titles are stored and linked with underscores for spaces. Titles are
// otherwise case- and punctuation-sensitive, so nothing else is normalized.
export function titleToKey(title: string): string {
  return title.trim().replace(/\s+/g, '_')
}

export function keyToTitle(key: string): string {
  return key.replace(/_/g, ' ').trim()
}

function removeBalanced(text: string, open: string, close: string): string {
  let out = ''
  let depth = 0
  for (let i = 0; i < text.length; i++) {
    if (text.slice(i, i + open.length) === open) {
      depth++
      i += open.length - 1
      continue
    }
    if (depth > 0 && text.slice(i, i + close.length) === close) {
      depth--
      i += close.length - 1
      continue
    }
    if (depth === 0) out += text[i]
  }
  return out
}

export interface StripOptions {
  // Emit wikilinks as markdown [label](wiki:Target) instead of bare text.
  // Targets are underscored because shared/markdown.ts's href class is
  // [^)\s]+ — a space there silently degrades the link to plain text.
  markdownLinks?: boolean
}

export function stripMarkup(text: string, opts: StripOptions = {}): string {
  let s = text
  s = s.replace(/<!--[\s\S]*?-->/g, '')
  s = s.replace(/<ref[^>]*\/>/gi, '')
  s = s.replace(/<ref[^>]*>[\s\S]*?<\/ref>/gi, '')
  // Every remaining template goes. Some carry prose ({{nowrap|…}}) and we lose
  // it; keeping a whitelist would be guesswork against thousands of templates.
  s = removeBalanced(s, '{{', '}}')
  s = s.replace(/\[\[([^\]|]+)(?:\|([^\]]*))?\]\]/g, (_all, target: string, label?: string) => {
    const t = String(target).trim()
    const shown = (label ?? '').trim() || t
    if (SKIP_NS.test(t)) return ''
    if (!opts.markdownLinks) return shown
    return `[${shown}](${wikiHref(t.split('#')[0])})`
  })
  // External links: [http://x label] -> label
  s = s.replace(/\[(?:https?:)\/\/[^\s\]]+\s*([^\]]*)\]/g, (_a, label: string) => label.trim())
  s = s.replace(/'''''|'''|''/g, '')
  // A line break carries meaning in infobox fields (several billed hometowns,
  // several ring names); deleting it outright ran the values together into
  // "Atlanta, GeorgiaCharlotte, North Carolina". Keep it as a newline and let
  // callers decide how to join.
  s = s.replace(/<br\s*\/?>/gi, '\n')
  s = s.replace(/<[^>]+>/g, '')
  s = s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&ndash;/g, '–')
  s = s.replace(/[ \t]+/g, ' ')
  return s.trim()
}

// The article's opening prose, as markdown with resolvable wikilinks. Stops at
// the first section heading; templates (infobox, hatnotes, short description)
// are gone by the time paragraphs are counted.
export function extractLead(text: string, maxParagraphs = 2): string {
  const beforeSection = text.split(/\n==[^=]/)[0] ?? ''
  const cleaned = stripMarkup(beforeSection, { markdownLinks: true })
  const paras = cleaned
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\n/g, ' ').trim())
    // Leftover list/table scraps are not prose.
    .filter((p) => p.length > 40 && !/^[|!*#:{]/.test(p))
  return paras.slice(0, maxParagraphs).join('\n\n')
}

// ---------------------------------------------------------------------------
// Scalars
// ---------------------------------------------------------------------------

// "28:08" -> 1688; "1:02:15" -> 3735. Anything else (N/A, dashes, empty) -> null.
export function parseDuration(raw: string | null | undefined): number | null {
  if (!raw) return null
  const s = stripMarkup(String(raw)).trim()
  const m = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(s)
  if (!m) return null
  const a = Number(m[1])
  const b = Number(m[2])
  const c = m[3] != null ? Number(m[3]) : null
  return c == null ? a * 60 + b : a * 3600 + b * 60 + c
}

const MONTHS: Record<string, number> = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12
}

function iso(y: number, m: number, d: number): string | null {
  if (!y || m < 1 || m > 12 || d < 1 || d > 31) return null
  return `${String(y).padStart(4, '0')}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

// Handles the three forms live articles use: {{start date|2001|4|1}} (with or
// without |df=y), "April 1, 2001", and "1 April 2001".
export function parseInfoboxDate(raw: string | null | undefined): string | null {
  if (!raw) return null
  const s = String(raw)
  const tpl = /\{\{\s*start[ _]date[^}|]*\|\s*(\d{4})\s*\|\s*(\d{1,2})\s*\|\s*(\d{1,2})/i.exec(s)
  if (tpl) return iso(Number(tpl[1]), Number(tpl[2]), Number(tpl[3]))
  const plain = stripMarkup(s)
  const mdy = /([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})/.exec(plain)
  if (mdy && MONTHS[mdy[1].toLowerCase()]) {
    return iso(Number(mdy[3]), MONTHS[mdy[1].toLowerCase()], Number(mdy[2]))
  }
  const dmy = /(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/.exec(plain)
  if (dmy && MONTHS[dmy[2].toLowerCase()]) {
    return iso(Number(dmy[3]), MONTHS[dmy[2].toLowerCase()], Number(dmy[1]))
  }
  return null
}

// "67,925" -> 67925. Attendance fields also carry refs and notes.
export function parseIntLoose(raw: string | null | undefined): number | null {
  if (!raw) return null
  const m = /(\d[\d,]*)/.exec(stripMarkup(String(raw)))
  if (!m) return null
  const n = Number(m[1].replace(/,/g, ''))
  return Number.isFinite(n) ? n : null
}

// ---------------------------------------------------------------------------
// The card
// ---------------------------------------------------------------------------

// Reads matchN/stipN/timeN/noteN out of EVERY results template on the page,
// flattening them into one ordered card. A multi-night event (WrestleMania 39)
// is two adjacent template calls whose numbering both restart at 1 and which
// are told apart only by `|caption = Night 1` — reading just the first template
// would silently drop an entire night. `card` carries that caption so the UI
// can group them again; `index` is the running order across all of them.
//
// Falls back to a raw wikitable for articles that predate the template.
export function parseResultsCard(text: string): RawMatch[] {
  const templates = findTemplates(text, RESULTS_TEMPLATES)
  const out: RawMatch[] = []
  for (const tpl of templates) {
    const label = tpl.params.get('caption')?.trim() || null
    const rows: RawMatch[] = []
    for (const [key, value] of tpl.params) {
      const m = /^match(\d+)$/.exec(key)
      if (!m) continue
      const n = Number(m[1])
      const match = value.trim()
      if (!match) continue
      rows.push({
        index: n,
        card: label,
        match,
        stip: tpl.params.get(`stip${n}`)?.trim() || null,
        time: tpl.params.get(`time${n}`)?.trim() || null,
        note: tpl.params.get(`note${n}`)?.trim() || null
      })
    }
    rows.sort((a, b) => a.index - b.index)
    // Renumber so the second night continues the card instead of colliding
    // with the first at 1..n.
    for (const r of rows) out.push({ ...r, index: out.length + 1 })
  }
  if (out.length > 0) return out
  return parseResultsWikitable(text)
}

// Fallback: the pre-template format, `{| class="wikitable" … |}` with a header
// row naming the columns. Only tables that actually have a Results column are
// considered, so infobox-adjacent tables can't be mistaken for a card.
export function parseResultsWikitable(text: string): RawMatch[] {
  const start = text.indexOf('{|')
  if (start < 0) return []
  for (let i = 0; i < text.length; i++) {
    if (text.slice(i, i + 2) !== '{|') continue
    const end = text.indexOf('\n|}', i)
    if (end < 0) continue
    const body = text.slice(i + 2, end)
    const rows = body.split(/\n\|-/)
    const header = rows[0] ?? ''
    const cols = header
      .split('\n')
      .filter((l) => l.trim().startsWith('!'))
      .flatMap((l) => l.replace(/^!\s*/, '').split('!!'))
      .map((c) => stripMarkup(c).toLowerCase().trim())
    const resIdx = cols.findIndex((c) => c.startsWith('result'))
    if (resIdx < 0) continue
    const stipIdx = cols.findIndex((c) => c.startsWith('stipulation'))
    const timeIdx = cols.findIndex((c) => c.startsWith('time'))
    const out: RawMatch[] = []
    for (let r = 1; r < rows.length; r++) {
      // Wikitable cells are `|` at line start OR `||` inline. Splitting on the
      // SINGLE pipe (splitTopLevel's job inside templates) shreds an inline row
      // into alternating values and empty strings, which silently emptied every
      // table using the inline form — i.e. the exact articles this fallback
      // exists for.
      const cells = rows[r]
        .split('\n')
        .filter((l) => l.trim().startsWith('|'))
        .flatMap((l) => splitCells(l.trim().replace(/^\|\s*/, '')))
        .map((c) => c.trim())
      const match = cells[resIdx]
      if (!match) continue
      out.push({
        index: out.length + 1,
        card: null,
        match,
        stip: stipIdx >= 0 ? cells[stipIdx] || null : null,
        time: timeIdx >= 0 ? cells[timeIdx] || null : null,
        note: null
      })
    }
    if (out.length > 0) return out
  }
  return []
}

// Separators, most specific first: a "no contest" line also contains no
// "defeated", but "ended in a time limit draw" must beat the bare "draw".
const DRAW_RE =
  /\b(?:ended in|went to|fought to|resulted in|was ruled)\s+a\s+(?:time[- ]limit\s+)?draw\b|\bended in a (?:double (?:count-?out|disqualification))\b|\btime[- ]limit draw\b/i
const NC_RE = /\b(?:ended in|was ruled|was declared)\s+a\s+no[- ]contest\b|\bno[- ]contest\b/i
// Delimited by \s rather than \b on purpose: `\b` after an optional `\.`
// never matches, because a dot and a space are both non-word characters — so
// `def\.\b` and `vs\.?\b` silently never fire. The surrounding \s already
// enforces whole words.
const WIN_RE = /\s(?:defeated|defeats|def\.|beat|beats|pinned|submitted|outlasted|overcame)\s/i
// "won" ends the cell when the entrant list was an {{efn}} footnote that
// preClean just removed, so end-of-string has to count as a delimiter.
const WON_RE = /\swon(?:\s|$)/i
const VS_RE = /\s(?:vs\.?|versus)\s/i

// Removes "(with X)" manager/second groups and rumble entrant footnotes before
// participants are read.
function preClean(cell: string): string {
  let s = cell.replace(/\{\{\s*(?:efn|sfn|refn|cite[^|}]*)[\s\S]*?\}\}/gi, '')
  s = s.replace(/<ref[^>]*\/>/gi, '').replace(/<ref[^>]*>[\s\S]*?<\/ref>/gi, '')
  s = s.replace(/\((?:with|accompanied by)\s[^()]*\)/gi, '')
  return s.trim()
}

type Token =
  | { kind: 'link'; link: WikiLink }
  | { kind: 'group'; inner: string }
  | { kind: 'text'; text: string }

function tokenize(s: string): Token[] {
  const out: Token[] = []
  let buf = ''
  const flush = (): void => {
    if (buf.trim()) out.push({ kind: 'text', text: buf.trim() })
    buf = ''
  }
  for (let i = 0; i < s.length; i++) {
    if (s.slice(i, i + 2) === '[[') {
      const close = s.indexOf(']]', i)
      if (close > 0) {
        flush()
        const [target, label] = s.slice(i + 2, close).split('|')
        const t = target.split('#')[0].trim()
        if (t && !SKIP_NS.test(t)) {
          out.push({ kind: 'link', link: { target: t, display: (label ?? '').trim() || t } })
        }
        i = close + 1
        continue
      }
    }
    if (s[i] === '(') {
      let depth = 0
      let j = i
      for (; j < s.length; j++) {
        if (s[j] === '(') depth++
        else if (s[j] === ')') {
          depth--
          if (depth === 0) break
        }
      }
      if (j < s.length) {
        flush()
        out.push({ kind: 'group', inner: s.slice(i + 1, j) })
        i = j
        continue
      }
    }
    buf += s[i]
  }
  flush()
  return out
}

const CONNECTOR = /^(?:and|,|&|,\s*and|with|the)?[\s,&]*$/i

// Turns one side of a result into participants, resolving the two grouping
// forms live articles use:
//   X-Factor ([[X-Pac]] and [[Justin Credible]])      -> team name is plain text
//   [[The Steiner Brothers]] ([[Rick]] and [[Scott]]) -> team name is itself a link
// In both, the members are the links INSIDE the parens and the outer token is
// the team, not a wrestler.
function participantsOfSide(side: string, sideIndex: number, won: boolean): ParsedParticipant[] {
  const tokens = tokenize(preClean(side))
  const out: ParsedParticipant[] = []
  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i]
    const next = tokens[i + 1]
    if (tok.kind === 'group') continue // handled with its owner, or noise
    if (tok.kind === 'text' && CONNECTOR.test(tok.text)) continue

    const ownerName =
      tok.kind === 'link' ? tok.link.display : tok.kind === 'text' ? tok.text.trim() : ''

    // A following paren group that contains links makes this token a team.
    if (next && next.kind === 'group') {
      const inner = parseWikiLinks(next.inner)
      if (inner.length > 0) {
        const champ = isChampionMarker(tokens[i + 2])
        for (const link of inner) {
          out.push({
            link,
            name: link.display,
            side: sideIndex,
            won,
            isChampion: champ,
            teamName: ownerName || null
          })
        }
        i += champ ? 2 : 1
        continue
      }
    }

    if (tok.kind === 'link') {
      const champ = isChampionMarker(next)
      out.push({
        link: tok.link,
        name: tok.link.display,
        side: sideIndex,
        won,
        isChampion: champ,
        teamName: null
      })
      if (champ) i++
      continue
    }

    // Bare text that isn't a connector: a wrestler with no article. Keep the
    // name so the card reads correctly; it just won't be a link.
    const name = ownerName.replace(/^[,&\s]+|[,&\s]+$/g, '')
    if (name && !CONNECTOR.test(name)) {
      const champ = isChampionMarker(next)
      out.push({ link: null, name, side: sideIndex, won, isChampion: champ, teamName: null })
      if (champ) i++
    }
  }
  return out
}

function isChampionMarker(tok: Token | undefined): boolean {
  return tok?.kind === 'group' && /^\s*c\s*$/i.test(tok.inner)
}

function splitAt(cell: string, re: RegExp): [string, string] | null {
  const m = re.exec(cell)
  if (!m || m.index < 0) return null
  return [cell.slice(0, m.index), cell.slice(m.index + m[0].length)]
}

export function parseResultCell(cell: string): ParsedMatch {
  const raw = preClean(cell)
  const plain = stripMarkup(cell)

  let outcome: ParsedOutcome = 'unknown'
  let sides: string[] = []

  if (NC_RE.test(raw)) {
    outcome = 'nocontest'
    sides = splitSidesNoResult(raw.replace(NC_RE, ''))
  } else if (DRAW_RE.test(raw)) {
    outcome = 'draw'
    sides = splitSidesNoResult(raw.replace(DRAW_RE, ''))
  } else {
    const win = splitAt(raw, WIN_RE)
    if (win) {
      outcome = 'decision'
      sides = [win[0], win[1]]
    } else {
      const won = splitAt(raw, WON_RE)
      if (won) {
        // Rumble/tournament phrasing: only the winner is named on the card.
        outcome = 'decision'
        sides = [won[0]]
      } else {
        sides = splitSidesNoResult(raw)
      }
    }
  }

  const participants: ParsedParticipant[] = []
  sides.forEach((side, i) => {
    participants.push(...participantsOfSide(side, i, outcome === 'decision' && i === 0))
  })

  return { participants, outcome, title: buildTitle(participants, plain) }
}

function splitSidesNoResult(s: string): string[] {
  const vs = splitAt(s, VS_RE)
  return vs ? [vs[0], vs[1]] : [s]
}

function buildTitle(participants: ParsedParticipant[], fallback: string): string {
  const bySide = new Map<number, string[]>()
  for (const p of participants) {
    const arr = bySide.get(p.side) ?? []
    if (!arr.includes(p.name)) arr.push(p.name)
    bySide.set(p.side, arr)
  }
  if (bySide.size >= 2) {
    return [...bySide.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([, names]) => names.join(' & '))
      .join(' vs. ')
  }
  // One side (a rumble) or nothing parsed: the prose reads better than a
  // lone name, so fall back to it, trimmed.
  const t = fallback.trim()
  return t.length > 160 ? `${t.slice(0, 157)}…` : t || 'Match'
}

// "…for the [[WWF Championship]]" -> "WWF Championship". Only kept when the
// phrase actually names a title, so "for the vacant spot" doesn't become one.
export function extractChampionship(stip: string | null | undefined): string | null {
  if (!stip) return null
  const m = /\bfor the\b([\s\S]*)$/i.exec(stip)
  if (!m) return null
  const rest = m[1]

  // The title at stake is virtually always a wikilink, and its DISPLAY text is
  // already exactly the championship name. Taking the raw text instead runs on
  // into whatever the sentence says next — a real AEW card reads "for the
  // inaugural [[AEW Women's World Championship]] on the premiere episode of
  // Dynamite", and the plain-text form swallows the whole tail.
  const link = parseWikiLinks(rest)[0]
  let name = link
    ? link.display
    : // No link: stop at the first clause boundary.
      stripMarkup(rest).split(/[,;.]|\son\s|\sat\s|\sto determine\s/i)[0]

  name = name
    .replace(/[{}[\]]+/g, '') // any stray brace left by an unbalanced template
    .replace(/\s+/g, ' ')
    .trim()
  if (!name) return null
  if (!/\b(championship|title|cup|trophy|belt)\b/i.test(name)) return null
  return name.length > 120 ? name.slice(0, 120).trim() : name
}

// Wrestler infoboxes are frequently NESTED: {{Infobox person | module =
// {{Infobox professional wrestler | ring_names=… | billed=… }} }}, so a
// top-level-only scan would miss every field. findTemplates already walks every
// `{{`, which is what makes this work.
export const WRESTLER_INFOBOXES = [
  'infobox professional wrestler',
  'infobox wrestler',
  'infobox person'
]

export interface ParsedWrestler {
  realName: string | null
  birthDate: string | null
  debutYear: number | null
  billedFrom: string | null
  height: string | null
  bio: string | null
}

export function parseWrestlerArticle(wikitext: string): ParsedWrestler {
  // Params are MERGED across both boxes rather than picking one: the outer
  // {{Infobox person}} holds birth_name while the nested wrestler box holds
  // billed/debut/height, so either box alone loses fields.
  const boxes = findTemplates(wikitext, WRESTLER_INFOBOXES, { nested: true })
  const p = new Map<string, string>()
  for (const b of boxes) {
    if (b.name !== 'infobox person') continue
    for (const [k, v] of b.params) p.set(k, v)
  }
  for (const b of boxes) {
    if (b.name === 'infobox person') continue
    for (const [k, v] of b.params) p.set(k, v) // wrestler box wins
  }

  // Infobox fields are frequently multi-valued (several billed hometowns, one
  // per line). Join the first few rather than concatenating all of them.
  const val = (...keys: string[]): string | null => {
    for (const k of keys) {
      const raw = p.get(k)
      if (!raw) continue
      const parts = stripMarkup(raw)
        .split('\n')
        .map((x) => x.replace(/^[*#:;\s]+/, '').trim())
        .filter(Boolean)
      if (parts.length) return parts.slice(0, 3).join(', ').slice(0, 200)
    }
    return null
  }
  const debutRaw = val('debut')
  const debutYear = debutRaw ? Number(/(\d{4})/.exec(debutRaw)?.[1] ?? '') || null : null
  return {
    realName: val('birth_name', 'birthname', 'real_name'),
    birthDate: parseInfoboxDate(p.get('birth_date') ?? p.get('born') ?? ''),
    debutYear,
    billedFrom: val('billed', 'resides', 'birth_place'),
    height: val('height'),
    bio: extractLead(wikitext) || null
  }
}

// The results template's noteN= marker: 'pre' (pre-show) / 'dark'. Anything
// else ("heat", a footnote letter) is not a card slot.
export function parseCardSlot(note: string | null | undefined): 'pre' | 'dark' | null {
  if (!note) return null
  const n = stripMarkup(note).toLowerCase().trim()
  if (n.startsWith('pre')) return 'pre'
  if (n.startsWith('dark')) return 'dark'
  return null
}
