import { getSqlite } from './db/connection'
import { fetchWithRetry, MAX_API_RESPONSE_BYTES } from './http'
import { createThrottle } from './requestThrottle'
import { downloadImages } from './files'
import { findSharedPerson, romajiKey, upsertSharedPerson } from './repos/personMatch'
import { bakedCharacterNames, bakedWikiCast, bakedWikis } from './launchboxCatalog'
import { BANGUMI_SOURCE, characterDisplayName } from './bangumiCore'
import { LAUNCHBOX_SOURCE } from './launchboxCatalogCore'
import * as links from './repos/externalLinkRepo'
import {
  FRANCHISE_WIKIS,
  WIKI_SOURCE,
  categoryStems,
  nativeKey,
  parseCharacter,
  wikiFor,
  type FranchiseWiki,
  type WikiCharacter
} from './wikiCastCore'

// IO half of the franchise-wiki cast source. The games catalog bakes each
// configured wiki (scripts/build-games-catalog2.cjs), so a catalog game reads
// its wiki cast offline; Fandom is DNS-filtered in Iran, where the user lives.
// The live path — Fandom's MediaWiki API for the character category and pages,
// Wikidata for the Japanese name behind a voice credit that links to English
// Wikipedia — serves an older pack or a game with no catalog work.
//
// It supplements Bangumi on the same game. A character Bangumi already lists
// (same Japanese name) is not added twice; it gains the wiki's voice credit
// only when Bangumi gave it none. Re-running replaces only the wiki's own
// rows: characters with external_source 'fandom' and credits with origin
// 'fandom'. The game's link ('fandom' = '<wiki key>:<category stem>') can be
// removed by hand from the Sources panel and is then never re-made.

const USER_AGENT = 'Xamiru/NaviHUB (personal media hub; https://github.com/Xamiru/NaviHUB)'
export const wikiThrottle = createThrottle(500)

/* eslint-disable @typescript-eslint/no-explicit-any */

async function api(wiki: FranchiseWiki, params: Record<string, string>): Promise<any> {
  await wikiThrottle.take()
  const url = `https://${wiki.host}/api.php?${new URLSearchParams({ ...params, format: 'json', formatversion: '2' })}`
  const res = await fetchWithRetry(url, {
    headers: { Accept: 'application/json', 'User-Agent': USER_AGENT },
    maxResponseBytes: MAX_API_RESPONSE_BYTES
  })
  if (!res.ok) throw new Error(`${wiki.label} request failed (${res.status})`)
  return res.json()
}

// The first stem whose "<stem> Characters" category has pages.
async function findStem(wiki: FranchiseWiki, stems: string[]): Promise<string | null> {
  if (!stems.length) return null
  const titles = stems.map((s) => `Category:${s}${wiki.categorySuffix}`)
  const json = await api(wiki, { action: 'query', prop: 'categoryinfo', titles: titles.join('|') })
  const filled = new Set<string>()
  for (const p of json?.query?.pages ?? []) if ((p?.categoryinfo?.pages ?? 0) > 0) filled.add(p.title)
  return stems.find((_, i) => filled.has(titles[i])) ?? null
}

async function members(wiki: FranchiseWiki, stem: string): Promise<string[]> {
  const out: string[] = []
  let cont: Record<string, string> = {}
  for (let guard = 0; guard < 10; guard++) {
    const json = await api(wiki, {
      action: 'query',
      list: 'categorymembers',
      cmtitle: `Category:${stem}${wiki.categorySuffix}`,
      cmnamespace: '0',
      cmlimit: '500',
      ...cont
    })
    for (const m of json?.query?.categorymembers ?? []) if (typeof m?.title === 'string') out.push(m.title)
    if (!json?.continue?.cmcontinue) break
    cont = { cmcontinue: json.continue.cmcontinue }
  }
  return out
}

interface PageData {
  title: string
  wikitext: string
  categories: string[]
  imageUrl: string | null
}

// Page text, categories and lead image, ten pages a request (categories page
// through clcontinue when a batch has more than one page of them).
async function pages(wiki: FranchiseWiki, titles: string[]): Promise<PageData[]> {
  const out = new Map<string, PageData>()
  for (let i = 0; i < titles.length; i += 10) {
    let cont: Record<string, string> = {}
    for (let guard = 0; guard < 10; guard++) {
      const json = await api(wiki, {
        action: 'query',
        prop: 'revisions|categories|pageimages',
        rvprop: 'content',
        rvslots: 'main',
        cllimit: 'max',
        piprop: 'original',
        redirects: '1',
        titles: titles.slice(i, i + 10).join('|'),
        ...cont
      })
      for (const p of json?.query?.pages ?? []) {
        if (typeof p?.title !== 'string' || p.missing) continue
        const entry: PageData = out.get(p.title) ?? { title: p.title, wikitext: '', categories: [], imageUrl: null }
        const text = p.revisions?.[0]?.slots?.main?.content
        if (typeof text === 'string') entry.wikitext = text
        for (const c of p.categories ?? []) if (typeof c?.title === 'string') entry.categories.push(c.title)
        if (typeof p.original?.source === 'string') entry.imageUrl = p.original.source
        out.set(p.title, entry)
      }
      if (!json?.continue) break
      const { continue: _c, ...next } = json.continue
      cont = next
    }
  }
  return [...out.values()]
}

// English Wikipedia article -> the person's Japanese name (Wikidata's ja
// label), fifty a request through the shared Wikimedia budget.
async function japaneseNames(articles: string[]): Promise<Map<string, string>> {
  const out = new Map<string, string>()
  const unique = [...new Set(articles)]
  for (let i = 0; i < unique.length; i += 50) {
    const batch = unique.slice(i, i + 50)
    const url = `https://www.wikidata.org/w/api.php?${new URLSearchParams({
      action: 'wbgetentities',
      sites: 'enwiki',
      titles: batch.join('|'),
      props: 'labels|sitelinks',
      languages: 'ja',
      sitefilter: 'enwiki',
      format: 'json'
    })}`
    const res = await fetchWithRetry(url, { maxResponseBytes: MAX_API_RESPONSE_BYTES })
    // A lost batch would save its actors without kanji and unmatched to
    // their existing person rows; fail so the game is read again later.
    if (!res.ok) throw new Error(`Wikidata request failed (${res.status})`)
    const json = (await res.json()) as any
    for (const e of Object.values(json?.entities ?? {}) as any[]) {
      const article = e?.sitelinks?.enwiki?.title
      const ja = e?.labels?.ja?.value
      if (typeof article === 'string' && typeof ja === 'string' && /[぀-ヿ㐀-鿿]/.test(ja)) {
        out.set(article.replace(/_/g, ' ').toLowerCase(), ja)
      }
    }
  }
  return out
}

export interface WikiCastResult {
  linked: boolean
  cast: number
}

function gameTitles(mediaId: number): (string | null)[] {
  const row = getSqlite()
    .prepare('SELECT title, title_original FROM media_item WHERE id = ?')
    .get(mediaId) as { title: string; title_original: string | null } | undefined
  return row ? [row.title, row.title_original] : []
}

// The wiki and category stem for a game: its recorded link, else found from
// its titles. null = no franchise wiki covers it, or the user unlinked it.
export function wikiLinkFor(mediaId: number): { wiki: FranchiseWiki; stem: string | null } | null {
  const link = links.get(mediaId, WIKI_SOURCE)
  if (link?.method === 'manual' && link.externalId === '') return null
  if (link?.externalId) {
    const [key, ...rest] = link.externalId.split(':')
    const wiki = FRANCHISE_WIKIS.find((w) => w.key === key)
    if (wiki) return { wiki, stem: rest.join(':') }
  }
  const wiki = wikiFor(gameTitles(mediaId))
  return wiki ? { wiki, stem: null } : null
}

function upsertCharacter(db: any, wiki: FranchiseWiki, c: CastCharacter, image: string | null): number {
  const ext = `${wiki.key}:${c.page}`
  const row = db
    .prepare('SELECT id FROM character WHERE external_source = ? AND external_id = ?')
    .get(WIKI_SOURCE, ext) as { id: number } | undefined
  if (row) {
    db.prepare(
      'UPDATE character SET name = ?, name_native = ?, image_path = COALESCE(?, image_path) WHERE id = ?'
    ).run(c.name, c.native, image, row.id)
    return row.id
  }
  return Number(
    db
      .prepare(
        'INSERT INTO character (name, name_native, image_path, external_source, external_id) VALUES (?, ?, ?, ?, ?)'
      )
      .run(c.name, c.native, image, WIKI_SOURCE, ext).lastInsertRowid
  )
}

export function sweepWikiOrphans(db: any): void {
  db.prepare(
    `DELETE FROM list_item
     WHERE list_id IN (SELECT id FROM list WHERE entity_kind = 'character')
       AND entity_id IN (SELECT id FROM character WHERE external_source = ?
                         AND id NOT IN (SELECT character_id FROM media_character))`
  ).run(WIKI_SOURCE)
  db.prepare(
    `DELETE FROM character WHERE external_source = ? AND id NOT IN (SELECT character_id FROM media_character)`
  ).run(WIKI_SOURCE)
}

// Removes what the wiki brought to this game (the Sources panel's "Not this
// game"). Bangumi's and hand-made rows stay.
export function clearWikiCast(mediaId: number): void {
  const db = getSqlite()
  db.transaction(() => {
    db.prepare('DELETE FROM credit WHERE media_id = ? AND origin = ?').run(mediaId, WIKI_SOURCE)
    db.prepare(
      `DELETE FROM media_character WHERE media_id = ?
         AND character_id IN (SELECT id FROM character WHERE external_source = ?)`
    ).run(mediaId, WIKI_SOURCE)
    restoreBangumiNames(db, mediaId)
    sweepWikiOrphans(db)
  })()
}

// The wiki's English names on this game's Bangumi characters go back to
// Bangumi's, unless another game's wiki link still vouches for the character.
function restoreBangumiNames(db: any, mediaId: number): void {
  const rows = db
    .prepare(
      `SELECT ch.id, ch.name, ch.name_native, ch.external_id FROM media_character mc JOIN character ch ON ch.id = mc.character_id
       WHERE mc.media_id = ? AND ch.external_source = ? AND ch.name_native IS NOT NULL
         AND NOT EXISTS (
           SELECT 1 FROM media_character o JOIN media_external_link l ON l.media_id = o.media_id
           WHERE o.character_id = ch.id AND o.media_id <> ? AND l.source = ? AND l.external_id <> '')`
    )
    .all(mediaId, BANGUMI_SOURCE, mediaId, WIKI_SOURCE) as {
    id: number
    name: string
    name_native: string
    external_id: string
  }[]
  const update = db.prepare('UPDATE character SET name = ? WHERE id = ?')
  for (const r of rows) {
    const name = characterDisplayName(r.name_native, bakedCharacterNames(Number(r.external_id)))
    if (name !== r.name) update.run(name, r.id)
  }
}

// One voiced character, from the pack or the live wiki.
interface CastCharacter {
  page: string
  name: string
  native: string | null
  importance: number
  imageUrl: string | null
  voices: { name: string; native: string | null }[]
}

function workIdOf(mediaId: number): number | null {
  const row = getSqlite()
    .prepare('SELECT external_source, external_id FROM media_item WHERE id = ?')
    .get(mediaId) as { external_source: string | null; external_id: string | null } | undefined
  if (row?.external_source === LAUNCHBOX_SOURCE && row.external_id) return Number(row.external_id)
  const linked = links.linkedId(mediaId, 'launchbox')
  return linked ? Number(linked) : null
}

// The games catalog bakes each franchise wiki (the wiki itself is filtered
// where the user lives). For a wiki the pack covers, the pack is the whole
// answer for a catalog game; the live wiki is asked only by an older pack or
// for a game with no catalog work.
async function gather(
  mediaId: number,
  wiki: FranchiseWiki,
  knownStem: string | null,
  workId: number | null
): Promise<{ stem: string; characters: CastCharacter[] } | null> {
  if (workId != null) return bakedWikiCast(workId, wiki.key)

  const stem = knownStem || (await findStem(wiki, categoryStems(gameTitles(mediaId))))
  if (!stem) return null
  const parsed = (await pages(wiki, await members(wiki, stem)))
    .map((p) => parseCharacter(p, stem, wiki))
    .filter((c): c is WikiCharacter => !!c && c.voices.length > 0)
  const kanji = await japaneseNames(parsed.flatMap((c) => c.voices.flatMap((v) => (v.enwiki ? [v.enwiki] : []))))
  return {
    stem,
    characters: parsed.map((c) => ({
      page: c.page,
      name: c.name,
      native: c.native,
      importance: c.importance,
      imageUrl: c.imageUrl,
      voices: c.voices.map((v) => ({ name: v.name, native: v.enwiki ? (kanji.get(v.enwiki.toLowerCase()) ?? null) : null }))
    }))
  }
}

export async function wikiCast(mediaId: number): Promise<WikiCastResult> {
  const found = wikiLinkFor(mediaId)
  if (!found) return { linked: false, cast: 0 }
  const { wiki } = found
  const workId = workIdOf(mediaId)
  const fromPack = workId != null && bakedWikis().includes(wiki.key)
  const got = await gather(mediaId, wiki, found.stem, fromPack ? workId : null)
  if (!got) {
    // The pack is the whole answer for a wiki it bakes: a work it does not
    // list has no wiki cast, so a link and cast read earlier from the live
    // wiki go. A live miss may be an outage and leaves them alone.
    if (fromPack) {
      clearWikiCast(mediaId)
      links.reset(mediaId, WIKI_SOURCE)
    }
    return { linked: false, cast: 0 }
  }
  const { stem } = got
  const characters = [...got.characters].sort((a, b) => a.importance - b.importance || a.name.localeCompare(b.name))
  const images = await downloadImages(characters.map((c) => c.imageUrl))

  // ---- one transaction ----
  const db = getSqlite()
  return db.transaction((): WikiCastResult => {
    links.set(mediaId, WIKI_SOURCE, `${wiki.key}:${stem}`, 'exact')
    db.prepare('DELETE FROM credit WHERE media_id = ? AND origin = ?').run(mediaId, WIKI_SOURCE)

    // Characters this game already has from another source (Bangumi, by hand)
    // and their voice credits. A wiki character is the same person when the
    // Japanese name matches; failing that (Bangumi sometimes writes a name in
    // Chinese forms: 乡田龙司 for 郷田龍司), when the romanized name matches one of
    // them, or when its voice actor voices exactly one of them in this game.
    interface Existing {
      id: number
      voiced: boolean
      bangumi: boolean
    }
    const rows = db
      .prepare(
        `SELECT ch.id, ch.name, ch.name_native, ch.external_source FROM media_character mc JOIN character ch ON ch.id = mc.character_id
         WHERE mc.media_id = ? AND COALESCE(ch.external_source, '') <> ?`
      )
      .all(mediaId, WIKI_SOURCE) as { id: number; name: string; name_native: string | null; external_source: string | null }[]
    const voicedBy = db
      .prepare(
        `SELECT character_id, person_id FROM credit
         WHERE media_id = ? AND role = 'voice_actor' AND character_id IS NOT NULL`
      )
      .all(mediaId) as { character_id: number; person_id: number }[]
    const voicedIds = new Set(voicedBy.map((v) => v.character_id))
    const byNative = new Map<string, Existing>()
    const byRomaji = new Map<string, Existing[]>()
    const byVoice = new Map<number, Existing[]>()
    const all = new Map<number, Existing>()
    for (const r of rows) {
      const e: Existing = { id: r.id, voiced: voicedIds.has(r.id), bangumi: r.external_source === 'bangumi' }
      all.set(r.id, e)
      const key = nativeKey(r.name_native)
      if (key && !byNative.has(key)) byNative.set(key, e)
      const rk = /[a-z]/i.test(r.name) ? romajiKey(r.name) : ''
      if (rk) byRomaji.set(rk, [...(byRomaji.get(rk) ?? []), e])
    }
    for (const v of voicedBy) {
      const e = all.get(v.character_id)
      if (e) byVoice.set(v.person_id, [...(byVoice.get(v.person_id) ?? []), e])
    }
    const personInput = (voice: { name: string; native: string | null }) => ({
      source: WIKI_SOURCE,
      externalId: `${wiki.key}:${voice.name}`,
      name: voice.name,
      nameNative: voice.native
    })
    const matchExisting = (c: CastCharacter): Existing | null => {
      const native = byNative.get(nativeKey(c.native))
      if (native) return native
      const romaji = byRomaji.get(romajiKey(c.name))
      if (romaji?.length === 1) return romaji[0]
      for (const v of c.voices) {
        const pid = findSharedPerson(db, personInput(v))
        const hits = pid != null ? byVoice.get(pid) : undefined
        if (hits?.length === 1) return hits[0]
      }
      return null
    }

    const kept = new Set<number>()
    const claimed = new Set<number>()
    let cast = 0
    let order = 1000
    const credit = (characterId: number, importance: number, voice: { name: string; native: string | null }): void => {
      const personId = upsertSharedPerson(db, personInput(voice))
      db.prepare(
        `INSERT INTO credit (media_id, person_id, character_id, role, language, importance, origin)
         VALUES (?, ?, ?, 'voice_actor', 'Japanese', ?, ?)`
      ).run(mediaId, personId, characterId, importance, WIKI_SOURCE)
      cast++
    }
    for (const c of characters) {
      const image = c.imageUrl ? (images.get(c.imageUrl) ?? null) : null
      const already = matchExisting(c)
      if (already && !claimed.has(already.id)) {
        claimed.add(already.id)
        // The wiki's English name is the franchise's own; Bangumi's may be
        // Chinese forms or lower-case romaji. A hand-made character keeps the
        // user's name, and a Bangumi re-read writes Bangumi's back.
        if (already.bangumi && /[a-z]/i.test(c.name)) {
          db.prepare('UPDATE character SET name = ?, image_path = COALESCE(image_path, ?) WHERE id = ?').run(c.name, image, already.id)
        }
        if (!already.voiced) for (const v of c.voices) credit(already.id, c.importance, v)
        continue
      }
      const characterId = upsertCharacter(db, wiki, c, image)
      kept.add(characterId)
      db.prepare(
        `INSERT INTO media_character (media_id, character_id, sort_order) VALUES (?, ?, ?)
         ON CONFLICT(media_id, character_id) DO UPDATE SET sort_order = excluded.sort_order`
      ).run(mediaId, characterId, order++)
      for (const v of c.voices) credit(characterId, c.importance, v)
    }

    const linked = db
      .prepare(
        `SELECT mc.character_id AS cid FROM media_character mc JOIN character ch ON ch.id = mc.character_id
         WHERE mc.media_id = ? AND ch.external_source = ?`
      )
      .all(mediaId, WIKI_SOURCE) as { cid: number }[]
    for (const { cid } of linked) {
      if (!kept.has(cid)) db.prepare('DELETE FROM media_character WHERE media_id = ? AND character_id = ?').run(mediaId, cid)
    }
    sweepWikiOrphans(db)
    return { linked: true, cast }
  })()
}
