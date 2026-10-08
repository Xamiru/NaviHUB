// Pure half of the Bangumi (bgm.tv) client: response parsers and the rules that
// turn Bangumi's Chinese-labelled data into the app's English vocabulary. No IO,
// no electron — tests/bangumiCore.test.ts drives it with fixtures.
//
// Bangumi's summaries, tags and Chinese names are never kept: every parser here
// whitelists names, images, ids and the fixed relation/role maps below.

export const BANGUMI_SOURCE = 'bangumi'
// Bangumi subject type 4 = game.
export const BANGUMI_GAME_TYPE = 4

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface BgmActor {
  id: number
  name: string
  imageUrl: string | null
}

export interface BgmCharacter {
  id: number
  name: string
  imageUrl: string | null
  importance: number // 0 main, 1 supporting, 2 cameo, 3 other — the cast sort rank
  actors: BgmActor[]
}

export interface BgmStaff {
  personId: number
  name: string
  imageUrl: string | null
  role: 'director' | 'writer' | 'composer' | 'staff'
  roleNote: string
}

export interface BgmRelation {
  subjectId: number
  relationType: string
  name: string
}

export interface BgmReading {
  kana: string | null
  romaji: string | null
}

// Bangumi image URLs are https on lain.bgm.tv; an empty string means none.
export function imageOf(images: any, prefer: 'large' | 'medium' = 'large'): string | null {
  const url = images?.[prefer] || images?.large || images?.medium || images?.common || null
  return typeof url === 'string' && /^https:\/\//.test(url) ? url : null
}

function rankFromRelation(relation: unknown): number {
  switch (relation) {
    case '主角':
      return 0
    case '配角':
      return 1
    case '客串':
      return 2
    default:
      return 3
  }
}

// Hiragana and katakana letters only. The middle dot U+30FB and the long mark
// U+30FC are left out: Chinese names use them too ("约翰・史密斯").
const KANA = /[ぁ-ゖゝ-ゟァ-ヺヽ-ヿㇰ-ㇿ]/

export const hasKana = (s: string | null | undefined): boolean => !!s && KANA.test(s)

// Japanese voice actors only (the user's choice). A Japanese name written in
// kanji alone looks exactly like a Chinese dub actor's, so the deciding signal
// is a kana reading: in the name itself, or recorded on the person
// (`reading.kana`, baked into the games catalog or fetched once). English dub
// actors have neither.
export function isJapaneseActor(name: string, reading: BgmReading | null): boolean {
  return hasKana(name) || hasKana(reading?.kana)
}

export function parseCharacters(json: any): BgmCharacter[] {
  if (!Array.isArray(json)) return []
  const out: BgmCharacter[] = []
  for (const c of json) {
    const id = Number(c?.id)
    const name = typeof c?.name === 'string' ? c.name.trim() : ''
    if (!Number.isInteger(id) || id <= 0 || !name) continue
    const actors: BgmActor[] = []
    for (const a of Array.isArray(c.actors) ? c.actors : []) {
      const aid = Number(a?.id)
      const aname = typeof a?.name === 'string' ? a.name.trim() : ''
      // type 1 = an individual; groups and companies are not voice actors.
      if (!Number.isInteger(aid) || aid <= 0 || !aname || (a.type != null && a.type !== 1)) continue
      actors.push({ id: aid, name: aname, imageUrl: imageOf(a.images, 'medium') })
    }
    out.push({ id, name, imageUrl: imageOf(c.images), importance: rankFromRelation(c.relation), actors })
  }
  return out
}

// Bangumi staff relation -> crew role + English note. Anything unmapped (and
// every company: developer, publisher, animation studio) is skipped.
const STAFF_ROLES: Record<string, { role: BgmStaff['role']; note: string }> = {
  导演: { role: 'director', note: 'Director' },
  游戏总监: { role: 'director', note: 'Director' },
  制作人: { role: 'staff', note: 'Producer' },
  执行制作人: { role: 'staff', note: 'Executive Producer' },
  脚本: { role: 'writer', note: 'Scenario' },
  剧本: { role: 'writer', note: 'Scenario' },
  原作: { role: 'writer', note: 'Original Work' },
  音乐: { role: 'composer', note: 'Music' },
  作曲: { role: 'composer', note: 'Music' },
  人物设定: { role: 'staff', note: 'Character Design' },
  原画: { role: 'staff', note: 'Key Art' },
  美术: { role: 'staff', note: 'Art' },
  企画: { role: 'staff', note: 'Planning' },
  游戏设计: { role: 'staff', note: 'Game Design' },
  游戏设计师: { role: 'staff', note: 'Game Design' },
  动画监督: { role: 'staff', note: 'Animation Director' },
  监修: { role: 'staff', note: 'Supervisor' },
  程序: { role: 'staff', note: 'Programming' },
  主题歌演出: { role: 'staff', note: 'Theme Song Performance' }
}

export function parseStaff(json: any): BgmStaff[] {
  if (!Array.isArray(json)) return []
  const out: BgmStaff[] = []
  for (const p of json) {
    const mapped = STAFF_ROLES[typeof p?.relation === 'string' ? p.relation.trim() : '']
    const personId = Number(p?.id)
    const name = typeof p?.name === 'string' ? p.name.trim() : ''
    if (!mapped || !Number.isInteger(personId) || personId <= 0 || !name) continue
    if (p.type != null && p.type !== 1) continue
    out.push({ personId, name, imageUrl: imageOf(p.images, 'medium'), role: mapped.role, roleNote: mapped.note })
  }
  return out
}

// Bangumi subject relation -> media_relation.relation_type. Collaborations,
// cameos (角色出演) and "other" carry no story connection and are skipped.
export const RELATION_TYPES: Record<string, string> = {
  续集: 'SEQUEL',
  前传: 'PREQUEL',
  不同版本: 'ALTERNATIVE',
  主线故事: 'PARENT',
  番外篇: 'SIDE_STORY',
  外传: 'SIDE_STORY',
  衍生: 'SPIN_OFF',
  系列: 'SAME_SERIES',
  相同世界观: 'SAME_SETTING',
  资料片: 'EXPANSION',
  合集: 'COMPILATION',
  收录作品: 'COMPILATION'
}

// Only game-to-game relations: the app links them through the games catalog.
export function parseRelations(json: any): BgmRelation[] {
  if (!Array.isArray(json)) return []
  const out: BgmRelation[] = []
  for (const s of json) {
    const relationType = RELATION_TYPES[typeof s?.relation === 'string' ? s.relation.trim() : '']
    const subjectId = Number(s?.id)
    if (!relationType || s?.type !== BANGUMI_GAME_TYPE || !Number.isInteger(subjectId) || subjectId <= 0) continue
    out.push({ subjectId, relationType, name: typeof s.name === 'string' ? s.name.trim() : '' })
  }
  return out
}

export function firstSpelling(value: string): string {
  return value.split(/\s*[=＝/／;；]\s*/)[0].trim()
}

// A person's kana reading and romaji from the API's parsed infobox
// (`[{key, value}]`, value a string or `[{k?, v}]`).
export function parseReading(infobox: any): BgmReading {
  let kana: string | null = null
  let romaji: string | null = null
  const take = (k: string, v: unknown): void => {
    if (typeof v !== 'string' || !v.trim()) return
    const value = v.trim()
    if ((k === '纯假名' || k === '假名' || k === '平假名' || k === '片假名') && !kana && hasKana(value)) kana = value
    // "Yūki Aoi = Yuuki Aoi": alternative spellings of one name — keep the first.
    if ((k === '罗马字' || k === '罗马音') && !romaji && /[a-z]/i.test(value)) romaji = firstSpelling(value)
  }
  for (const item of Array.isArray(infobox) ? infobox : []) {
    const key = typeof item?.key === 'string' ? item.key.trim() : ''
    if (Array.isArray(item?.value)) {
      for (const sub of item.value) take(typeof sub?.k === 'string' ? sub.k.trim() : '', sub?.v)
    } else {
      take(key, item?.value)
    }
  }
  return { kana, romaji }
}

// The same reading from the Archive dump's raw wiki infobox
// ("{{Infobox ... |别名={\n[纯假名|ふくやま じゅん]\n[罗马字|Fukuyama Jun]\n}\n}}").
// Used by the catalog builder, which embeds a copy.
export function parseReadingWiki(wiki: string | null | undefined): BgmReading {
  const items: { key: string; value: unknown }[] = []
  for (const m of (wiki ?? '').matchAll(/\[([^|\]\n]+)\|([^\]\n]*)\]/g)) items.push({ key: m[1], value: m[2] })
  for (const m of (wiki ?? '').matchAll(/^\|\s*([^=\n]+?)\s*=\s*([^{\n][^\n]*)$/gm)) items.push({ key: m[1], value: m[2] })
  return parseReading(items)
}

// Bangumi writes Japanese romaji family name first ("Fukuyama Jun"); the rest
// of the app (AniList) shows given name first. Two-word names flip; anything
// else is left as written.
export function westernOrder(romaji: string | null | undefined): string | null {
  const s = (romaji ?? '').trim()
  if (!s) return null
  const parts = s.split(/\s+/)
  return parts.length === 2 ? `${parts[1]} ${parts[0]}` : s
}

// What a game character is called in the app: the romanized name, else the
// English one, else the Japanese name it is listed under.
export function characterDisplayName(
  japanese: string,
  names: { romaji: string | null; english: string | null } | null
): string {
  return westernOrder(names?.romaji) ?? (names?.english?.trim() || japanese)
}
