import { downloadImages } from './files'
import { updateActivity } from './progress'
import { fetchWithRetry, MAX_API_RESPONSE_BYTES } from './http'
import { gachaGame } from '@shared/gacha'
import * as gachaRepo from './repos/gachaRepo'
import type { GachaCatalogUnitUpsert } from './repos/gachaRepo'
import type { GachaCatalogImportResult, GachaGameId } from '@shared/types'

// Atlas Academy (atlasacademy.io) — the open FGO database that powers Chaldea
// and most community tools. No API key. We use the pre-built NA exports:
// basic_servant.json / basic_equip.json each give {collectionNo, name,
// className, rarity, face}. Every entry becomes an owned=0 catalog row (with
// its face art) so the roster's Catalog tab is a searchable, pre-filled
// collection instead of manual name entry. Button-only, never automatic.
const BASE = 'https://api.atlasacademy.io/export/NA'
const SOURCE = 'atlas'

// FGO class ids as returned by Atlas are camelCase and occasionally multi-word
// ('moonCancer') or beast variants ('beastEresh', 'beastIV'). Turn them into
// the display strings the app stores in gacha_unit.element (facet-1 = "Class").
const CLASS_LABELS: Record<string, string> = {
  saber: 'Saber',
  archer: 'Archer',
  lancer: 'Lancer',
  rider: 'Rider',
  caster: 'Caster',
  assassin: 'Assassin',
  berserker: 'Berserker',
  ruler: 'Ruler',
  avenger: 'Avenger',
  alterEgo: 'Alter Ego',
  moonCancer: 'Moon Cancer',
  foreigner: 'Foreigner',
  pretender: 'Pretender',
  shielder: 'Shielder'
}

export function prettifyFgoClass(className: string): string {
  if (!className) return ''
  if (CLASS_LABELS[className]) return CLASS_LABELS[className]
  if (className.startsWith('beast')) return 'Beast'
  // Fallback: camelCase -> spaced Title Case.
  const spaced = className.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

/* eslint-disable @typescript-eslint/no-explicit-any */
async function fetchExport(file: string): Promise<any[]> {
  const res = await fetchWithRetry(`${BASE}/${file}`, {
    headers: { Accept: 'application/json' },
    maxResponseBytes: MAX_API_RESPONSE_BYTES
  })
  if (!res.ok) throw new Error(`Atlas Academy request failed (${res.status})`)
  const data = await res.json()
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error(`Atlas Academy returned no data for ${file}`)
  }
  return data
}

function rarityOf(v: unknown): number | null {
  return typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= 5 ? v : null
}

// Two-phase (import conventions): all network first — both JSON exports plus one
// batched face download — then a single repo transaction. Re-import is
// authoritative for canonical fields and preserves all personal tracking.
export async function importCatalog(game: GachaGameId): Promise<GachaCatalogImportResult> {
  if (gachaGame(game)?.catalog?.source !== 'atlas') {
    throw new Error(`No Atlas catalog configured for ${game}`)
  }

  const [servants, equips] = await Promise.all([
    fetchExport('basic_servant.json'),
    fetchExport('basic_equip.json')
  ])

  const staged: (GachaCatalogUnitUpsert & { face: string | null })[] = []
  const add = (kind: string, e: any): void => {
    const externalId = e?.collectionNo
    if (typeof externalId !== 'number' || externalId <= 0) return
    const name = typeof e?.name === 'string' ? e.name.trim() : ''
    if (!name) return
    staged.push({
      kind,
      externalId: String(externalId),
      name,
      rarity: rarityOf(e?.rarity),
      element: kind === 'servant' ? prettifyFgoClass(String(e?.className ?? '')) || null : null,
      face: typeof e?.face === 'string' ? e.face : null,
      imagePath: null
    })
  }
  for (const s of servants) add('servant', s)
  for (const c of equips) add('craftEssence', c)

  // One batched download of every face (5-worker pool → activity pill); the
  // content-addressed cache makes a re-fetch skip already-downloaded art.
  const faces = staged.map((u) => u.face)
  const images = await downloadImages(faces)
  let imagesFailed = 0
  for (const u of staged) {
    u.imagePath = u.face ? (images.get(u.face) ?? null) : null
    if (u.face && !u.imagePath) imagesFailed += 1
  }

  updateActivity({ phase: 'writing' })
  const units: GachaCatalogUnitUpsert[] = staged.map(({ face: _face, ...u }) => u)
  const { created, updated } = gachaRepo.upsertCatalogUnits(game, SOURCE, units)
  return { total: units.length, created, updated, imagesFailed }
}
