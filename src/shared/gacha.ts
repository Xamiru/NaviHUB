// Config for the Gacha tracker section: which games exist and how each game's
// roster / currencies / labels look. Pure data + lookups, importable by both
// main (fetchers) and the renderer (pages render entirely from this). Adding a
// game = one entry here (+ optional fetchers later); the DB is game-agnostic.
//
// kind/currency `key` strings are FROZEN vocabulary — they're stored in
// gacha_unit.kind / gacha_currency.key and are part of the future catalog
// importers' dedup key. Rename labels freely, never keys.

import type { GachaGameId } from './types'

export interface GachaUnitKindCfg {
  key: string
  label: string
  plural: string
  elementLabel: string | null // facet-1 label; null hides the field
  roleLabel: string | null // facet-2 label; null hides the field
  dupesLabel: string | null // copies-counter label; null hides the field
  // Display-only mapping of the 0-based dupes count (e.g. FGO 0 → "NP1").
  formatDupes?: (n: number) => string
  rarityMax: number
}

export interface GachaCurrencyCfg {
  key: string
  label: string
}

export interface GachaGameCfg {
  id: GachaGameId
  name: string
  short: string // sidebar / breadcrumb label
  glyph: string // single text glyph (not emoji), matches the sidebar style
  buildMode: 'full' | 'levelOnly' // levelOnly (FGO) hides all Builds UI
  subreddit: string // news source: r/<subreddit> hot feed, fetched on button click
  color: string // per-game accent (hex) for glyph tiles / header tint
  coach?: boolean // enables the AI coaching chat for this game (FGO only for now)
  // Catalog importer: seeds every servant/CE as an owned=0 row (with art) from
  // an external source, and optionally accepts an app-backup file to mark
  // ownership. Both key strings are FROZEN vocabulary — `source` is written to
  // gacha_unit.external_source. Gates the Catalog tab + import buttons.
  catalog?: { source: 'atlas'; backup?: 'chaldea' }
  unitKinds: GachaUnitKindCfg[] // [character kind, equipment kind]
  currencies: GachaCurrencyCfg[]
}

export const GACHA_GAMES: GachaGameCfg[] = [
  {
    id: 'hsr',
    name: 'Honkai: Star Rail',
    short: 'Star Rail',
    glyph: '✦',
    buildMode: 'full',
    subreddit: 'HonkaiStarRail',
    color: '#8b7ff0',
    unitKinds: [
      {
        key: 'character',
        label: 'Character',
        plural: 'Characters',
        elementLabel: 'Element',
        roleLabel: 'Path',
        dupesLabel: 'Eidolon',
        formatDupes: (n) => `E${n}`,
        rarityMax: 5
      },
      {
        key: 'lightcone',
        label: 'Light Cone',
        plural: 'Light Cones',
        elementLabel: null,
        roleLabel: 'Path',
        dupesLabel: 'Superimpose',
        formatDupes: (n) => `S${n + 1}`,
        rarityMax: 5
      }
    ],
    currencies: [
      { key: 'jade', label: 'Stellar Jade' },
      { key: 'specialPass', label: 'Special Passes' },
      { key: 'pass', label: 'Star Rail Passes' }
    ]
  },
  {
    id: 'fgo',
    name: 'Fate/Grand Order',
    short: 'FGO',
    glyph: '⚜',
    buildMode: 'levelOnly',
    subreddit: 'grandorder',
    color: '#d9b96a',
    coach: true,
    catalog: { source: 'atlas', backup: 'chaldea' },
    unitKinds: [
      {
        key: 'servant',
        label: 'Servant',
        plural: 'Servants',
        elementLabel: 'Class',
        roleLabel: null,
        dupesLabel: 'NP Level',
        formatDupes: (n) => `NP${n + 1}`,
        rarityMax: 5
      },
      {
        key: 'craftEssence',
        label: 'Craft Essence',
        plural: 'Craft Essences',
        elementLabel: null,
        roleLabel: null,
        dupesLabel: 'Limit Break',
        rarityMax: 5
      }
    ],
    currencies: [
      { key: 'quartz', label: 'Saint Quartz' },
      { key: 'tickets', label: 'Summon Tickets' },
      { key: 'apples', label: 'Golden Apples' }
    ]
  },
  {
    id: 'e7',
    name: 'Epic Seven',
    short: 'Epic Seven',
    glyph: '❖',
    buildMode: 'full',
    subreddit: 'EpicSeven',
    color: '#ef8f4f',
    unitKinds: [
      {
        key: 'hero',
        label: 'Hero',
        plural: 'Heroes',
        elementLabel: 'Element',
        roleLabel: 'Class',
        dupesLabel: 'Imprint',
        rarityMax: 5
      },
      {
        key: 'artifact',
        label: 'Artifact',
        plural: 'Artifacts',
        elementLabel: null,
        roleLabel: 'Class',
        dupesLabel: 'Limit Break',
        rarityMax: 5
      }
    ],
    currencies: [
      { key: 'skystones', label: 'Skystones' },
      { key: 'bookmarks', label: 'Covenant Bookmarks' },
      { key: 'mystics', label: 'Mystic Medals' }
    ]
  },
  {
    id: 'wuwa',
    name: 'Wuthering Waves',
    short: 'WuWa',
    glyph: '∿',
    buildMode: 'full',
    subreddit: 'WutheringWaves',
    color: '#4fd8d0',
    unitKinds: [
      {
        key: 'resonator',
        label: 'Resonator',
        plural: 'Resonators',
        elementLabel: 'Attribute',
        roleLabel: 'Weapon',
        dupesLabel: 'Sequence',
        formatDupes: (n) => `S${n}`,
        rarityMax: 5
      },
      {
        key: 'weapon',
        label: 'Weapon',
        plural: 'Weapons',
        elementLabel: null,
        roleLabel: 'Type',
        dupesLabel: 'Syntonize',
        formatDupes: (n) => `R${n + 1}`,
        rarityMax: 5
      }
    ],
    currencies: [
      { key: 'astrite', label: 'Astrite' },
      { key: 'radiantTide', label: 'Radiant Tides' },
      { key: 'forgingTide', label: 'Forging Tides' }
    ]
  }
]

export function gachaGame(id: string | undefined): GachaGameCfg | undefined {
  return GACHA_GAMES.find((g) => g.id === id)
}

export function gachaUnitKind(
  cfg: GachaGameCfg,
  kind: string
): GachaUnitKindCfg | undefined {
  return cfg.unitKinds.find((k) => k.key === kind)
}
