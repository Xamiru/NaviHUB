// Config for the Wrestling section: which promotions exist and where their
// events live on Wikipedia. Pure data + lookups, importable by both main (the
// importer) and the renderer (pages render entirely from this). Adding a
// promotion = one entry here; the wrestling_* tables are promotion-agnostic.
//
// `id` strings are FROZEN vocabulary — they're stored in
// wrestling_event.promotion. Rename labels freely, never ids.

import type { WrestlingPromotionId } from './types'

export interface WrestlingPromotionCfg {
  id: WrestlingPromotionId
  name: string
  short: string // sidebar / breadcrumb label
  color: string // per-promotion accent (hex), the GACHA_GAMES idiom
  // Wikipedia enumeration roots. `enumerateEvents` walks these recursively
  // (subcategories first, then page members) — which is why a "by year" parent
  // and a flat category can sit side by side here without special-casing.
  //
  // Every name below was verified against the live API: the naming is NOT
  // uniform (ROH says "pay-per-view and livestreaming", ECW says "supercards
  // and pay-per-view", NJPW has no by-year tree at all), so these are checked
  // literals, not a pattern.
  rootCategories: string[]
}

export const WRESTLING_PROMOTIONS: WrestlingPromotionCfg[] = [
  {
    id: 'wwe',
    name: 'World Wrestling Entertainment',
    short: 'WWE',
    color: '#c8102e',
    // The by-year tree starts at 1985 — i.e. exactly WrestleMania I. The flat
    // parent (Category:WWE pay-per-view events) is deliberately NOT used: it
    // holds ~17 leftovers plus list articles, not the actual card of events.
    rootCategories: ['Category:WWE pay-per-view events by year']
  },
  {
    id: 'wcw',
    name: 'World Championship Wrestling',
    short: 'WCW',
    color: '#f2c200',
    rootCategories: ['Category:World Championship Wrestling pay-per-view events by year']
  },
  {
    id: 'ecw',
    name: 'Extreme Championship Wrestling',
    short: 'ECW',
    color: '#8f8f8f',
    // No by-year tree — one flat category.
    rootCategories: ['Category:Extreme Championship Wrestling supercards and pay-per-view events']
  },
  {
    id: 'tna',
    name: 'TNA / Impact Wrestling',
    short: 'TNA',
    color: '#00a3e0',
    // Two roots: the promotion was TNA, then Impact, then TNA again, and the
    // year categories are split across both names.
    rootCategories: [
      'Category:Impact Wrestling pay-per-view events by year',
      'Category:Total Nonstop Action Wrestling pay-per-view events by year'
    ]
  },
  {
    id: 'roh',
    name: 'Ring of Honor',
    short: 'ROH',
    color: '#b31b1b',
    rootCategories: [
      'Category:Ring of Honor pay-per-view and livestreaming events by year',
      'Category:Ring of Honor pay-per-view and livestreaming events'
    ]
  },
  {
    id: 'njpw',
    name: 'New Japan Pro-Wrestling',
    short: 'NJPW',
    color: '#e03c31',
    // No by-year tree — one flat category covering every show.
    rootCategories: ['Category:New Japan Pro-Wrestling shows']
  },
  {
    id: 'aew',
    name: 'All Elite Wrestling',
    short: 'AEW',
    color: '#d4af37',
    rootCategories: ['Category:All Elite Wrestling pay-per-view events by year']
  }
]

export function promotionCfg(id: string): WrestlingPromotionCfg | null {
  return WRESTLING_PROMOTIONS.find((p) => p.id === id) ?? null
}

export function promotionName(id: string): string {
  return promotionCfg(id)?.short ?? id
}

// Infobox template names that mark an article as a single EVENT. Wikipedia is
// inconsistent here (three spellings in live use), so matching is done on the
// normalized name — see wikitext.ts:normalizeTemplateName.
export const EVENT_INFOBOXES = [
  'infobox wrestling event',
  'infobox professional wrestling event'
]

// ...and the ones that mark a SERIES hub (e.g. "AEW All Out" lists All Out
// (2019), All Out (2020), …). A series page has no card of its own; the
// importer follows its wikilinks to the real event articles instead.
export const SERIES_INFOBOXES = [
  'infobox wrestling ppv series',
  'infobox professional wrestling ppv series',
  'infobox wrestling event series'
]

// The results-card template, again in several live spellings. The PARAMETER
// convention inside it (match1=/stip1=/time1=/note1=) is stable across
// promotions and eras — that's what the parser keys on, not the name.
export const RESULTS_TEMPLATES = [
  'pro wrestling results table',
  'professional wrestling results table',
  'wrestling results table'
]
