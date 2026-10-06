// The History section's content model. Content is curated in research sessions
// and committed under src/shared/history/content/ (one file per entity); the
// user's personal entities reuse these exact shapes from the database.
//
// The section's one content rule is "no AI-written text": every sentence a
// reader sees is a verbatim quote from a cited source. The schema enforces it
// structurally — prose only exists inside Quote.text, and every other visible
// string is a name, bibliographic data, or a value from one of the fixed label
// tables below, which the UI renders. Do not add a free-text prose field.
//
// Every key in the label tables is FROZEN (stored in content files and in the
// personal-state tables); rename a label, never a key.

import type { MediaType } from '../types'

export const HISTORY_SCHEMA_VERSION = 1

// ---- frozen label tables ----

export const ENTITY_KINDS = {
  event: 'Event',
  person: 'Person',
  period: 'Period',
  place: 'Place',
  source: 'Source',
  interpretation: 'Interpretation',
  media: 'Media link'
} as const
export type EntityKind = keyof typeof ENTITY_KINDS

export const EVENT_TYPES = {
  war: 'War',
  battle: 'Battle',
  revolution: 'Revolution',
  coup: 'Coup',
  uprising: 'Uprising',
  protest: 'Protest',
  invasion: 'Invasion',
  occupation: 'Occupation',
  treaty: 'Treaty',
  conference: 'Conference',
  election: 'Election',
  referendum: 'Referendum',
  assassination: 'Assassination',
  genocide: 'Genocide',
  massacre: 'Massacre',
  famine: 'Famine',
  epidemic: 'Epidemic',
  disaster: 'Disaster',
  crisis: 'Crisis',
  independence: 'Independence',
  partition: 'Partition',
  founding: 'Founding',
  dissolution: 'Dissolution',
  reform: 'Reform',
  law: 'Law',
  nationalization: 'Nationalization',
  movement: 'Movement',
  migration: 'Migration',
  expedition: 'Expedition',
  discovery: 'Discovery',
  invention: 'Invention',
  economic: 'Economic event',
  cultural: 'Cultural event',
  religious: 'Religious event',
  sport: 'Sporting event',
  other: 'Event'
} as const
export type EventType = keyof typeof EVENT_TYPES

export const PERIOD_TYPES = {
  era: 'Era',
  dynasty: 'Dynasty',
  reign: 'Reign',
  regime: 'Regime',
  'war-period': 'War period',
  movement: 'Movement',
  cultural: 'Cultural period'
} as const
export type PeriodType = keyof typeof PERIOD_TYPES

export const PLACE_TYPES = {
  city: 'City',
  region: 'Region',
  country: 'Country',
  site: 'Site',
  building: 'Building',
  battlefield: 'Battlefield',
  water: 'Body of water'
} as const
export type PlaceType = keyof typeof PLACE_TYPES

export const SECTION_KINDS = {
  overview: 'Overview',
  background: 'Background',
  causes: 'Causes',
  course: 'Course',
  aftermath: 'Aftermath',
  consequences: 'Consequences',
  casualties: 'Casualties',
  legacy: 'Legacy',
  memory: 'Memory and commemoration',
  'early-life': 'Early life',
  career: 'Career',
  'later-life': 'Later life',
  death: 'Death',
  ideas: 'Ideas',
  works: 'Works',
  'in-their-words': 'In their own words'
} as const
export type SectionKind = keyof typeof SECTION_KINDS

export const RELATION_KINDS = {
  'preceded-by': 'Preceded by',
  'followed-by': 'Followed by',
  'led-to': 'Led to',
  'caused-by': 'Caused by',
  'contributed-to': 'Contributed to',
  'response-to': 'Response to',
  related: 'Related'
} as const
export type RelationKind = keyof typeof RELATION_KINDS
/** Causal relations are claims, so they must carry citations. */
export const CAUSAL_RELATIONS: ReadonlySet<RelationKind> = new Set([
  'led-to',
  'caused-by',
  'contributed-to',
  'response-to'
])

export const PARTICIPANT_ROLES = {
  leader: 'Leader',
  'head-of-state': 'Head of state',
  'head-of-government': 'Head of government',
  commander: 'Commander',
  combatant: 'Combatant',
  organizer: 'Organizer',
  ideologue: 'Ideologue',
  negotiator: 'Negotiator',
  signatory: 'Signatory',
  diplomat: 'Diplomat',
  perpetrator: 'Perpetrator',
  victim: 'Victim',
  witness: 'Witness',
  journalist: 'Journalist',
  participant: 'Participant'
} as const
export type ParticipantRole = keyof typeof PARTICIPANT_ROLES

export const PERSON_ROLES = {
  monarch: 'Monarch',
  'head-of-state': 'Head of state',
  politician: 'Politician',
  cleric: 'Cleric',
  military: 'Military officer',
  revolutionary: 'Revolutionary',
  diplomat: 'Diplomat',
  scholar: 'Scholar',
  writer: 'Writer',
  artist: 'Artist',
  scientist: 'Scientist',
  activist: 'Activist',
  businessperson: 'Businessperson',
  journalist: 'Journalist',
  athlete: 'Athlete',
  other: 'Person'
} as const
export type PersonRole = keyof typeof PERSON_ROLES

export const FIGURE_KEYS = {
  deaths: 'Deaths',
  'military-deaths': 'Military deaths',
  'civilian-deaths': 'Civilian deaths',
  wounded: 'Wounded',
  casualties: 'Casualties',
  displaced: 'Displaced',
  prisoners: 'Prisoners',
  executed: 'Executed',
  combatants: 'Combatants',
  participants: 'Participants'
} as const
export type FigureKey = keyof typeof FIGURE_KEYS

export const INTERPRETATION_TOPICS = {
  causes: 'Causes',
  nature: 'What it was',
  naming: 'What to call it',
  responsibility: 'Responsibility',
  'foreign-role': 'Role of foreign powers',
  motives: 'Motives',
  casualties: 'Casualties',
  legitimacy: 'Legitimacy',
  outcome: 'Outcome',
  consequences: 'Consequences',
  significance: 'Significance',
  inevitability: 'Inevitability',
  legacy: 'Legacy',
  character: 'Character',
  historiography: 'How historians tell it',
  other: 'Other questions'
} as const
export type InterpretationTopic = keyof typeof INTERPRETATION_TOPICS

export const POSITION_CATEGORIES = {
  /** Held at the time by participants or observers, in their own words. */
  contemporary: 'Contemporary view',
  scholarly: 'Scholarly',
  official: 'Official narrative',
  popular: 'Popular view',
  revisionist: 'Revisionist',
  fringe: 'Fringe'
} as const
export type PositionCategory = keyof typeof POSITION_CATEGORIES
/** These categories must show how scholarship received them. */
export const RECEPTION_REQUIRED: ReadonlySet<PositionCategory> = new Set(['fringe', 'revisionist'])

export const STANDING_LABELS = {
  mainstream: 'Mainstream',
  majority: 'Majority view',
  minority: 'Minority view',
  contested: 'Contested',
  discredited: 'Discredited'
} as const
export type StandingLabel = keyof typeof STANDING_LABELS

export const HOLDER_KINDS = {
  scholar: 'Scholar',
  school: 'School of thought',
  state: 'State',
  party: 'Party',
  organization: 'Organization',
  media: 'Media',
  participant: 'Participant',
  public: 'Public'
} as const
export type HolderKind = keyof typeof HOLDER_KINDS
/** A holder that can voice an official narrative. */
export const OFFICIAL_HOLDERS: ReadonlySet<HolderKind> = new Set(['state', 'party', 'organization'])

export const DISCIPLINES = {
  historian: 'historian',
  sociologist: 'sociologist',
  'political-scientist': 'political scientist',
  economist: 'economist',
  anthropologist: 'anthropologist',
  journalist: 'journalist',
  'area-specialist': 'area specialist',
  philosopher: 'philosopher',
  theologian: 'theologian',
  memoirist: 'memoirist'
} as const
export type Discipline = keyof typeof DISCIPLINES

export const NAME_ROLES = {
  primary: 'Name',
  native: 'Native name',
  official: 'Official name',
  alternative: 'Also called',
  contested: 'Contested name',
  former: 'Former name'
} as const
export type NameRole = keyof typeof NAME_ROLES
/** Names that make a claim about who uses them must be cited. */
export const CITED_NAME_ROLES: ReadonlySet<NameRole> = new Set(['official', 'contested'])

export const SOURCE_TYPES = {
  book: 'Book',
  chapter: 'Chapter',
  article: 'Article',
  primary: 'Primary source',
  archival: 'Archival record',
  government: 'Government publication',
  encyclopedia: 'Encyclopedia',
  newspaper: 'Newspaper',
  web: 'Web page',
  audiovisual: 'Audio or video',
  image: 'Image',
  dataset: 'Dataset'
} as const
export type SourceType = keyof typeof SOURCE_TYPES
/** Source types read online, which must record when they were accessed. */
export const WEB_SOURCE_TYPES: ReadonlySet<SourceType> = new Set(['web', 'encyclopedia', 'dataset'])

export const CONTRIBUTOR_ROLES = {
  author: 'Author',
  editor: 'Editor',
  translator: 'Translator',
  compiler: 'Compiler',
  speaker: 'Speaker',
  director: 'Director',
  photographer: 'Photographer',
  institution: 'Institution'
} as const
export type ContributorRole = keyof typeof CONTRIBUTOR_ROLES

export const LICENSES = {
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
} as const
export type LicenseId = keyof typeof LICENSES

export const MEDIA_LINK_KINDS = {
  'documentary-about': 'Documentary about',
  'dramatisation-of': 'Dramatisation of',
  'set-during': 'Set during',
  'inspired-by': 'Inspired by',
  'features-person': 'Features'
} as const
export type MediaLinkKind = keyof typeof MEDIA_LINK_KINDS

export const ARCHIVE_KINDS = {
  video: 'Video',
  audio: 'Audio',
  image: 'Photo',
  document: 'Document'
} as const
export type ArchiveKind = keyof typeof ARCHIVE_KINDS

export const PROVENANCE_VIA = {
  'local-copy': 'your local copy',
  web: 'the web',
  scan: 'a scan',
  print: 'a printed copy'
} as const
export type ProvenanceVia = keyof typeof PROVENANCE_VIA

// ---- references ----

/** `kind:slug`, e.g. `event:1953-iranian-coup`. */
export type Ref = string
/** `kind:slug#quoteId`, a single quote inside an entity. */
export type QuoteRef = string

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
export const MAX_SLUG = 80

export function refOf(kind: EntityKind, id: string): Ref {
  return `${kind}:${id}`
}

export function parseRef(ref: string): { kind: EntityKind; id: string; anchor?: string } | null {
  const m = /^([a-z]+):([a-z0-9-]+)(?:#([A-Za-z0-9_-]+))?$/.exec(ref)
  if (!m || !(m[1] in ENTITY_KINDS)) return null
  return { kind: m[1] as EntityKind, id: m[2], anchor: m[3] }
}

// ---- building blocks ----

/** Where in the source: at least one field is required. */
export interface Locator {
  page?: string
  section?: string
  folio?: string
  /** Time code for audio or video, e.g. `00:12:40`. */
  time?: string
  para?: string
}

export interface Cite {
  /** Source slug. */
  source: string
  loc: Locator
}

export interface Provenance {
  via: ProvenanceVia
  /** YYYY-MM-DD on which the text was copied. */
  at: string
  url?: string
}

export interface QuoteTranslation {
  text: string
  lang: string
  /** Must cite a source whose `translationOf` is the original's source. */
  cite: Cite
  provenance: Provenance
}

export interface Quote {
  /** Unique within the owning entity, e.g. `q1`. */
  id: string
  /** Verbatim, character for character. Marked omissions use `[…]`. */
  text: string
  lang: string
  cite: Cite
  provenance: Provenance
  translation?: QuoteTranslation
}

/**
 * A proleptic-Gregorian date with its precision: `YYYY`, `YYYY-MM` or
 * `YYYY-MM-DD`; years before 1 CE use astronomical numbering with a sign
 * (`-0479` is 480 BCE). Old Style and Solar Hijri forms are computed for
 * display, never stored.
 */
export interface HistDate {
  d: string
  /** Shown as "c.". */
  approx?: boolean
  /** The true date lies between `d` and this. */
  notAfter?: string
  /** The sources date it in the Julian calendar; `d` is still Gregorian. */
  julian?: boolean
}

export interface Holder {
  kind: HolderKind
  /** Proper name (a person, state, party, school). */
  name: string
  ref?: Ref
  discipline?: Discipline
}

export interface Alt<T> {
  value: T
  cites: Cite[]
  heldBy?: Holder[]
}

/** One value, or several sourced alternatives when sources disagree. */
export interface Claim<T> {
  alts: Alt<T>[]
}

export interface NameVariant {
  text: string
  lang: string
  role: NameRole
  translit?: string
  usedBy?: Holder[]
  cites?: Cite[]
}

export interface License {
  id: LicenseId
  version?: string
  url?: string
}

export interface ImageRef {
  /** Direct https URL of the file (normally Wikimedia Commons). */
  url: string
  /** The file's description page. */
  page?: string
  /** The holder's own title for the item. */
  title?: string
  credit: { institution?: string; creator?: string }
  license: License
}

export interface ArchiveSuggestion {
  /** Unique within the owning entity. */
  id: string
  mediaKind: ArchiveKind
  /** The holding archive's own title. */
  title: string
  date?: HistDate
  /** Direct https URL of the file. */
  url: string
  /** The item's landing page at the archive. */
  page?: string
  credit: { institution: string; creator?: string }
  license: License
  bytes?: number
  durationSec?: number
}

export interface Section {
  kind: SectionKind
  quotes: Quote[]
}

export interface Relation {
  ref: Ref
  rel: RelationKind
  cites?: Cite[]
  /** An interpretation that disputes this relation. */
  disputedIn?: string
}

export interface PlaceLink {
  ref: Ref
  cites?: Cite[]
}

export interface Side {
  key: string
  /** The side's name as the cited source gives it. */
  name: string
  cites: Cite[]
}

export interface Participant {
  ref?: Ref
  /** For someone without an entity of their own. */
  name?: string
  role: ParticipantRole
  side?: string
  cites: Cite[]
}

/** How the source qualifies a single number ("over 4,200", "nearly 30,000"). */
export const RANGE_QUALIFIERS = {
  over: 'over',
  about: 'about',
  nearly: 'nearly',
  'up-to': 'up to'
} as const
export type RangeQualifier = keyof typeof RANGE_QUALIFIERS

export interface Range {
  min: number
  max?: number
  qualifier?: RangeQualifier
}

export interface Figure {
  key: FigureKey
  side?: string
  value: Claim<Range>
}

export interface CourseItem {
  date: Claim<HistDate>
  quote: Quote
}

export interface FindingAids {
  /** Never shown as a citation. */
  wikidata?: string
  urls?: string[]
}

interface Named {
  v: number
  id: string
  names: NameVariant[]
  findingAids?: FindingAids
  /** YYYY-MM-DD of the research session that last wrote this entity. */
  researched: string
}

// ---- entities ----

export interface HistoryEvent extends Named {
  kind: 'event'
  type: EventType
  start: Claim<HistDate>
  end?: Claim<HistDate>
  /** The first region is the event's timeline lane. */
  regions: RegionKey[]
  /** 1 = always labelled on the century view; 3 = only when zoomed in. */
  prominence: 1 | 2 | 3
  places?: PlaceLink[]
  partOf?: PlaceLink[]
  related?: Relation[]
  sides?: Side[]
  participants?: Participant[]
  figures?: Figure[]
  hero?: ImageRef
  sections: Section[]
  course?: CourseItem[]
  archive?: ArchiveSuggestion[]
}

export interface Office {
  title: string
  lang?: string
  start?: Claim<HistDate>
  end?: Claim<HistDate>
  cites: Cite[]
}

export interface HistoryPerson extends Named {
  kind: 'person'
  born?: Claim<HistDate>
  died?: Claim<HistDate>
  bornIn?: PlaceLink
  diedIn?: PlaceLink
  regions: RegionKey[]
  roles: PersonRole[]
  offices?: Office[]
  portrait?: ImageRef
  sections: Section[]
  archive?: ArchiveSuggestion[]
}

export interface HistoryPeriod extends Named {
  kind: 'period'
  periodType: PeriodType
  start: Claim<HistDate>
  end?: Claim<HistDate>
  regions: RegionKey[]
  prominence: 1 | 2 | 3
  parent?: Ref
  hero?: ImageRef
  sections: Section[]
}

export interface HistoryPlace extends Named {
  kind: 'place'
  placeType: PlaceType
  regions: RegionKey[]
  coords?: { lat: number; lon: number; cites: Cite[] }
  /** ISO 3166-1 alpha-2 of the present-day country. */
  modernCountry?: string
  sections?: Section[]
}

export interface Contributor {
  name: string
  nameNative?: string
  role: ContributorRole
}

export interface HistorySource {
  v: number
  kind: 'source'
  id: string
  type: SourceType
  title: string
  lang: string
  contributors: Contributor[]
  /** Book or journal title for chapters and articles. */
  container?: string
  volume?: string
  issue?: string
  pages?: string
  publisher?: string
  place?: string
  /** YYYY, YYYY-MM or YYYY-MM-DD, or 'n.d.' for an undated page. */
  date: string
  edition?: string
  ids?: { isbn?: string; doi?: string; oclc?: string; jstor?: string; archive?: string }
  url?: string
  archivedUrl?: string
  /** YYYY-MM-DD; required for web sources. */
  accessed?: string
  holding?: string
  license?: License
  /** Source slug of the original this translates. */
  translationOf?: string
  /** File name in the user's own books folder (never committed). */
  localCopy?: string
}

export interface Position {
  id: string
  category: PositionCategory
  holders: Holder[]
  statements: Quote[]
  /** How scholarship received the view; required for fringe and revisionist. */
  reception?: Quote[]
  standing?: { label: StandingLabel; quote: Quote }
}

export interface HistoryInterpretation {
  v: number
  kind: 'interpretation'
  id: string
  about: Ref[]
  topic: InterpretationTopic
  framing?: Quote
  positions: Position[]
  researched: string
}

export interface Portrayal {
  person: Ref
  /** The character's name as the title credits it. */
  characterName?: string
}

export interface MediaLink {
  target: Ref
  kind: MediaLinkKind
  portrayals?: Portrayal[]
  accuracy?: Quote[]
  cites?: Cite[]
}

export interface HistoryMediaTitle {
  mediaType: MediaType
  /** The importer's `external_source` value, e.g. `tmdb`. */
  source: string
  externalId: string
  title: string
  year?: number
  posterUrl?: string
}

export interface HistoryMedia {
  v: number
  kind: 'media'
  /** Always `mediaFileId(title)`. */
  id: string
  title: HistoryMediaTitle
  links: MediaLink[]
  researched: string
}

export type HistoryEntity =
  | HistoryEvent
  | HistoryPerson
  | HistoryPeriod
  | HistoryPlace
  | HistorySource
  | HistoryInterpretation
  | HistoryMedia

/** Entities that carry names and render as an article page. */
export type HistoryArticle = HistoryEvent | HistoryPerson | HistoryPeriod | HistoryPlace

export function mediaFileId(t: Pick<HistoryMediaTitle, 'source' | 'mediaType' | 'externalId'>): string {
  return `${t.source}-${t.mediaType}-${t.externalId}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function primaryName(e: { names: NameVariant[] }): string {
  return (e.names.find((n) => n.role === 'primary') ?? e.names[0])?.text ?? ''
}

export function nativeName(e: { names: NameVariant[] }): NameVariant | undefined {
  return e.names.find((n) => n.role === 'native')
}

// ---- regions (frozen keys; order is the timeline lane order) ----

export const REGIONS = [
  { key: 'iran', label: 'Iran', pinned: true },
  { key: 'mena', label: 'Middle East & North Africa' },
  { key: 'europe', label: 'Europe' },
  { key: 'russia-central-asia', label: 'Russia & Central Asia' },
  { key: 'south-asia', label: 'South Asia' },
  { key: 'east-asia', label: 'East Asia' },
  { key: 'southeast-asia', label: 'Southeast Asia' },
  { key: 'subsaharan-africa', label: 'Sub-Saharan Africa' },
  { key: 'north-america', label: 'North America' },
  { key: 'latin-america', label: 'Latin America & Caribbean' },
  { key: 'oceania', label: 'Oceania' },
  { key: 'global', label: 'Global' }
] as const
export type RegionKey = (typeof REGIONS)[number]['key']
export const REGION_KEYS: ReadonlySet<string> = new Set(REGIONS.map((r) => r.key))

export function regionLabel(key: string): string {
  return REGIONS.find((r) => r.key === key)?.label ?? key
}

// ---- authoring helpers (content files: `export default defineEvent({...})`) ----

type Input<T extends { v: number; kind: string }> = Omit<T, 'v' | 'kind'>

export const defineEvent = (e: Input<HistoryEvent>): HistoryEvent => ({ v: 1, kind: 'event', ...e })
export const definePerson = (e: Input<HistoryPerson>): HistoryPerson => ({ v: 1, kind: 'person', ...e })
export const definePeriod = (e: Input<HistoryPeriod>): HistoryPeriod => ({ v: 1, kind: 'period', ...e })
export const definePlace = (e: Input<HistoryPlace>): HistoryPlace => ({ v: 1, kind: 'place', ...e })
export const defineSource = (e: Input<HistorySource>): HistorySource => ({ v: 1, kind: 'source', ...e })
export const defineInterpretation = (e: Input<HistoryInterpretation>): HistoryInterpretation => ({
  v: 1,
  kind: 'interpretation',
  ...e
})
export const defineMedia = (e: Omit<Input<HistoryMedia>, 'id'>): HistoryMedia => ({
  v: 1,
  kind: 'media',
  id: mediaFileId(e.title),
  ...e
})
