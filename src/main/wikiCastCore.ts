// Pure half of the community-wiki cast source (wikiCast.ts): which franchise
// wiki covers a game, which of its categories lists the game's characters,
// and the parsers for a character page. No IO, no electron —
// tests/wikiCastCore.test.ts drives it with fixtures.
//
// Bangumi is the cast source for games, but its volunteers fill in what their
// community plays: the older Yakuza games have one or two characters there,
// while the series' own Fandom wiki lists 60-115 per game with the Japanese
// voice cast. A franchise wiki supplements Bangumi; it never replaces it.

export const WIKI_SOURCE = 'fandom'

export interface FranchiseWiki {
  // Frozen: stored in media_external_link ('<key>:<category stem>') and in
  // character/person external ids.
  key: string
  label: string
  host: string
  // Recognises the franchise's games by title (English or Japanese).
  matches: RegExp
  // Names any of the franchise's games — a voice credit annotated with another
  // game ("(Yakuza 3, Yakuza Kiwami 3)") does not belong to this one.
  gameRef: RegExp
  // The character category is "<game stem> Characters".
  categorySuffix: string
  // Infobox fields.
  fields: { native: string; voice: string }
}

export const FRANCHISE_WIKIS: FranchiseWiki[] = [
  {
    key: 'yakuza',
    label: 'Yakuza Wiki',
    host: 'yakuza.fandom.com',
    matches: /\b(yakuza|like a dragon|ryu ga gotoku|kurohyou)\b|龍が如く/i,
    gameRef: /\b(yakuza|kiwami|like a dragon|ishin|kenzan|dead souls|ryu ga gotoku|kurohyou|judgment|gaiden)\b/i,
    categorySuffix: ' Characters',
    fields: { native: 'jp', voice: 'voiced_by' }
  }
]

export function wikiFor(titles: (string | null | undefined)[]): FranchiseWiki | null {
  for (const w of FRANCHISE_WIKIS) if (titles.some((t) => t && w.matches.test(t))) return w
  return null
}

const EDITION = /\s*[-–:]?\s*(?:remastered|hd remaster|director'?s cut|definitive edition|complete edition)\s*$/i

// Category stems to try, most specific first: the title as it is, without an
// edition suffix ("Yakuza 3 Remastered" -> "Yakuza 3"), without a subtitle
// ("Yakuza 6: The Song of Life" -> "Yakuza 6").
export function categoryStems(titles: (string | null | undefined)[]): string[] {
  const out: string[] = []
  const add = (s: string): void => {
    const t = s.replace(/\s+/g, ' ').trim()
    if (t && !out.includes(t)) out.push(t)
  }
  for (const raw of titles) {
    if (!raw || !/[a-z]/i.test(raw)) continue
    add(raw)
    const bare = raw.replace(EDITION, '')
    add(bare)
    const colon = bare.indexOf(':')
    if (colon > 0) add(bare.slice(0, colon))
  }
  return out
}

export interface WikiVoice {
  name: string
  // The English Wikipedia article the credit links to, when it does — the
  // bridge to the actor's Japanese name.
  enwiki: string | null
}

export interface WikiCharacter {
  page: string
  name: string // the page title without a disambiguator
  native: string | null
  voices: WikiVoice[]
  imageUrl: string | null
  importance: number
}

/* eslint-disable @typescript-eslint/no-explicit-any */

function field(wikitext: string, name: string): string | null {
  // A field runs to the next top-level "| key =" line or the template's end.
  const m = new RegExp(`^\\|\\s*${name}\\s*=([\\s\\S]*?)(?=^\\|\\s*\\w+\\s*=|^\\}\\})`, 'm').exec(wikitext)
  const v = m?.[1].trim()
  return v ? v : null
}

function stripMarkup(s: string): string {
  return s
    .replace(/<ref[^>]*\/>/gi, '')
    .replace(/<ref[\s\S]*?<\/ref>/gi, '')
    .replace(/\{\{ref\|[^}]*\}\}/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim()
}

const gameKey = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]+/g, '')

// A credit note's games ("Yakuza 2, Yakuza 3", "Yakuza 6: The Song of Life")
// against this game's category stem, whole names only: "Yakuza" is not in
// "Yakuza 2".
function noteNamesGame(note: string, stem: string): boolean {
  const want = gameKey(stem)
  return note
    .split(/,|;|&|\/|\band\b/i)
    .map((item) => item.trim())
    .some((item) => gameKey(item) === want || gameKey(item.split(':')[0]) === want)
}

interface ParsedVoice extends WikiVoice {
  // 'here' = a note names this game; 'elsewhere' = it names only other
  // games; 'none' = no game named ("(child)" or no note at all).
  scope: 'here' | 'elsewhere' | 'none'
  noted: boolean
}

// One voice credit line: "{{WP|Takaya Kuroda}}", "[[w:c:jpop:Uehara Ai|Ai Uehara]]",
// "Satoshi Tokushige", each optionally followed by "(child)" or "(Yakuza 3, …)".
function parseVoiceEntry(line: string, stem: string, wiki: FranchiseWiki): ParsedVoice | null {
  const text = stripMarkup(line.trim().replace(/^\*+/, '').trim())
  if (!text) return null
  const notes = [...text.matchAll(/\(([^()]*)\)/g)].map((m) => m[1])
  let scope: ParsedVoice['scope'] = 'none'
  for (const note of notes) {
    if (/\benglish\b|\bdub\b|localiz/i.test(note)) return null
    if (wiki.gameRef.test(note)) scope = noteNamesGame(note, stem) ? 'here' : scope === 'here' ? 'here' : 'elsewhere'
  }
  const head = text.replace(/\([^()]*\)/g, '').trim()
  let name: string | null = null
  let enwiki: string | null = null
  const wp = /\{\{\s*WP\s*\|\s*([^}|]+?)\s*(?:\|\s*([^}]+?)\s*)?\}\}/i.exec(head)
  const link = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/.exec(head)
  // MediaWiki titles treat '_' as a space; Wikidata's sitelinks and the
  // Japanese-name lookup key use the spaced form.
  if (wp) {
    enwiki = wp[1].replace(/_/g, ' ').trim()
    name = (wp[2] ?? enwiki).trim()
  } else if (link) {
    name = (link[2] ?? link[1].replace(/^.*:/, '').replace(/_/g, ' ')).trim()
  } else if (!/[{}[\]]/.test(head)) {
    name = head
  }
  if (!name || name.length > 60) return null
  return { name, enwiki, scope, noted: notes.length > 0 }
}

export function parseVoiceLine(line: string, stem: string, wiki: FranchiseWiki): WikiVoice | null {
  const v = parseVoiceEntry(line, stem, wiki)
  return v && v.scope !== 'elsewhere' ? { name: v.name, enwiki: v.enwiki } : null
}

// The wiki's convention: a credit noted with games covers those games, and a
// credit with no note at all covers the rest. So when a note names this game,
// the un-noted credits belong to other games; qualifiers such as "(child)"
// still apply.
export function parseVoices(raw: string | null, stem: string, wiki: FranchiseWiki): WikiVoice[] {
  if (!raw) return []
  const lines = raw.includes('\n') || raw.trim().startsWith('*') ? raw.split('\n') : [raw]
  const parsed = lines.map((l) => parseVoiceEntry(l, stem, wiki)).filter((v): v is ParsedVoice => !!v)
  const namedHere = parsed.some((v) => v.scope === 'here')
  const out: WikiVoice[] = []
  for (const v of parsed) {
    if (v.scope === 'elsewhere') continue
    if (namedHere && v.scope === 'none' && !v.noted) continue
    if (!out.some((o) => o.name === v.name)) out.push({ name: v.name, enwiki: v.enwiki })
  }
  return out
}

// The cast-list rank: the game's supporting characters and antagonists first,
// substory characters last.
export function importanceFrom(categories: string[], stem: string): number {
  const has = (suffix: string): boolean => categories.includes(`Category:${stem} ${suffix}`)
  if (has('Playable Characters') || has('Antagonists') || has('Supporting Characters')) return 1
  if (has('Substory Characters') || has('Minor Characters')) return 3
  return 2
}

export function parseCharacter(
  page: { title: string; wikitext: string; categories: string[]; imageUrl: string | null },
  stem: string,
  wiki: FranchiseWiki
): WikiCharacter | null {
  if (!/\{\{\s*Character Infobox/i.test(page.wikitext)) return null
  const native = field(page.wikitext, wiki.fields.native)
  return {
    page: page.title,
    name: page.title.replace(/\s*\([^)]*\)\s*$/, '').trim(),
    native: native ? stripMarkup(native).split('\n')[0].trim() || null : null,
    voices: parseVoices(field(page.wikitext, wiki.fields.voice), stem, wiki),
    imageUrl: page.imageUrl && /^https:\/\//.test(page.imageUrl) ? page.imageUrl : null,
    importance: importanceFrom(page.categories, stem)
  }
}

export const nativeKey = (s: string | null | undefined): string => (s ?? '').replace(/[\s　・]/g, '')
