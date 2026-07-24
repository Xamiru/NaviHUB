import { pickTextFile } from './files'
import { gachaGame } from '@shared/gacha'
import * as gachaRepo from './repos/gachaRepo'
import type {
  GachaBackupImportResult,
  GachaGameId,
  GachaOwnershipPatch
} from '@shared/types'

// Chaldea app (chaldea.center) backup import. The user exports userdata.json
// from the Chaldea app (Settings → Account → save/share), we parse ownership +
// progression and stamp it onto the already-imported Atlas catalog rows (matched
// by collectionNo). This is the trust boundary for user-supplied JSON, so the
// parser never assumes shape: bad file → clear throw, bad individual entry →
// silent skip. Structure (verified): { users: [...], curUserKey } where a user
// has `servants` and `craftEssences` maps keyed by collectionNo.

/* eslint-disable @typescript-eslint/no-explicit-any */

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n))
}

function isRecord(v: unknown): v is Record<string, any> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

function numArray(v: unknown): number[] | undefined {
  return Array.isArray(v) && v.every((x) => typeof x === 'number' && Number.isFinite(x))
    ? (v as number[])
    : undefined
}

// Copy a field into dataMerge only when it is a finite number.
function num(v: unknown): number | undefined {
  return typeof v === 'number' && Number.isFinite(v) ? v : undefined
}

export function parseChaldeaBackup(content: string): GachaOwnershipPatch[] {
  let root: unknown
  try {
    root = JSON.parse(content)
  } catch {
    throw new Error('Not a JSON file — choose your Chaldea userdata.json backup.')
  }
  if (!isRecord(root) || !Array.isArray(root.users)) {
    throw new Error("This doesn't look like a Chaldea backup (no users found).")
  }
  const idx =
    typeof root.curUserKey === 'number' && root.users[root.curUserKey] ? root.curUserKey : 0
  const user = root.users[idx]
  if (!isRecord(user)) throw new Error('No user data found in this backup.')

  const patches: GachaOwnershipPatch[] = []

  // Servants: cur.favorite marks ownership; _npLv (1-5) → dupes (0-4).
  if (isRecord(user.servants)) {
    for (const [key, raw] of Object.entries(user.servants)) {
      const collectionNo = Number(key)
      if (!Number.isInteger(collectionNo) || collectionNo <= 0) continue
      if (!isRecord(raw) || !isRecord(raw.cur) || raw.cur.favorite !== true) continue
      const npLv = clamp(Number(raw.cur._npLv) || 1, 1, 5)
      const dataMerge: Record<string, unknown> = {}
      const ascension = num(raw.cur.ascension)
      if (ascension !== undefined) dataMerge.ascension = ascension
      const skills = numArray(raw.cur.skills)
      if (skills) dataMerge.skills = skills
      const appendSkills = numArray(raw.cur.appendSkills)
      if (appendSkills) dataMerge.appendSkills = appendSkills
      const grail = num(raw.cur.grail)
      if (grail !== undefined) dataMerge.grail = grail
      const fouHp = num(raw.cur.fouHp)
      if (fouHp !== undefined) dataMerge.fouHp = fouHp
      const fouAtk = num(raw.cur.fouAtk)
      if (fouAtk !== undefined) dataMerge.fouAtk = fouAtk
      const bond = num(raw.bond)
      if (bond !== undefined) dataMerge.bond = bond
      patches.push({
        kind: 'servant',
        externalId: String(collectionNo),
        dupes: npLv - 1,
        dataMerge: Object.keys(dataMerge).length ? dataMerge : undefined
      })
    }
  }

  // Craft essences: status 2 = owned; limitCount (0-4) → dupes; lv → level.
  if (isRecord(user.craftEssences)) {
    for (const [key, raw] of Object.entries(user.craftEssences)) {
      const collectionNo = Number(key)
      if (!Number.isInteger(collectionNo) || collectionNo <= 0) continue
      if (!isRecord(raw) || raw.status !== 2) continue
      patches.push({
        kind: 'craftEssence',
        externalId: String(collectionNo),
        dupes: clamp(Number(raw.limitCount) || 0, 0, 4),
        level: num(raw.lv) ?? null
      })
    }
  }

  return patches
}

// Pick the backup file (in main — the JSON never crosses IPC) and apply it.
// Returns null on cancel. Throws (with a friendly message) if the catalog
// hasn't been imported yet or the file isn't a Chaldea backup.
export async function importBackup(game: GachaGameId): Promise<GachaBackupImportResult | null> {
  if (gachaGame(game)?.catalog?.backup !== 'chaldea') {
    throw new Error(`No Chaldea backup import configured for ${game}`)
  }
  const file = await pickTextFile({
    title: 'Choose your Chaldea userdata.json',
    filterName: 'Chaldea backup',
    extensions: ['json'],
    maxBytes: 64_000_000
  })
  if (!file) return null

  const patches = parseChaldeaBackup(file.content)
  const { unmatched } = gachaRepo.applyOwnership(game, 'atlas', patches)
  const servants = patches.filter((p) => p.kind === 'servant').length
  const craftEssences = patches.filter((p) => p.kind === 'craftEssence').length
  return { servants, craftEssences, unmatched }
}
