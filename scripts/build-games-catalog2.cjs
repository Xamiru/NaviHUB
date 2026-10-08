#!/usr/bin/env node
/*
 * Builds the games catalog pack v2 (games-catalog.db.gz, published as the
 * `games-catalog-2` GitHub PRERELEASE asset — prerelease so electron-updater's
 * /releases/latest ignores it). The app-side reader is
 * src/main/launchboxCatalog.ts; the schema is src/main/launchboxCatalogSchema.ts.
 *
 *   ELECTRON_RUN_AS_NODE=1 npx electron scripts/build-games-catalog2.cjs \
 *     --launchbox <Metadata.zip | Metadata.xml> \
 *     --bangumi <bangumi Archive dump-*.zip> \
 *     [--rawg <rawg-catalog.db>] [--wikidata-cache <wikidata.json>] <out-dir>
 *
 * Inputs, all keyless:
 *  - LaunchBox Games Database: gamesdb.launchbox-app.com/Metadata.zip (daily).
 *    One entry per platform release; real box art per region, English
 *    overviews, companies, genres, alternate names, Steam ids, Wikipedia URLs.
 *  - Bangumi Archive: github.com/bangumi/Archive releases (weekly). Game
 *    subjects (type 4) for the Bangumi link, and the kana reading/romaji of
 *    every person who voices a game character (the app keeps Japanese voice
 *    actors only and needs the kana to tell them from Chinese dubs).
 *  - Wikidata (fetched once, cached): Bangumi subject id (P5732) per item with
 *    its English Wikipedia article and Steam app id (P1733) — the bridge from a
 *    LaunchBox entry to its Bangumi subject.
 *  - The previous RAWG pack (optional): Metacritic, popularity and the RAWG id
 *    cross-reference that lets RAWG-era library rows find their work.
 *
 * Nothing Chinese from Bangumi is stored: only ids, Japanese titles (kana or
 * kanji names) and person readings.
 */
const { createReadStream, existsSync, readFileSync, rmSync, statSync, writeFileSync } = require('node:fs')
const { createInterface } = require('node:readline')
const { gzipSync } = require('node:zlib')
const { join } = require('node:path')

// MUST match LAUNCHBOX_CATALOG_DDL in src/main/launchboxCatalogSchema.ts —
// tests/launchboxCatalog.test.ts diffs the two, so drift fails the suite.
// DDL-START
const LAUNCHBOX_CATALOG_DDL = `
CREATE TABLE IF NOT EXISTS lb_meta (key TEXT PRIMARY KEY, value TEXT);
CREATE TABLE IF NOT EXISTS lb_work (
  id           INTEGER PRIMARY KEY,
  name         TEXT NOT NULL,
  name_ja      TEXT,
  released     TEXT,
  overview     TEXT,
  developers   TEXT,
  publishers   TEXT,
  genres       TEXT,
  platforms    TEXT,
  metacritic   INTEGER,
  popularity   INTEGER NOT NULL DEFAULT 0,
  rating       REAL,
  video_url    TEXT
);
CREATE INDEX IF NOT EXISTS idx_lb_work_popularity ON lb_work(popularity);
CREATE TABLE IF NOT EXISTS lb_member (
  lb_id     INTEGER PRIMARY KEY,
  work_id   INTEGER NOT NULL,
  platform  TEXT
);
CREATE INDEX IF NOT EXISTS idx_lb_member_work ON lb_member(work_id);
CREATE TABLE IF NOT EXISTS lb_image (
  work_id   INTEGER NOT NULL,
  kind      TEXT NOT NULL,
  region    TEXT,
  platform  TEXT,
  file      TEXT NOT NULL,
  rank      INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_lb_image_work ON lb_image(work_id, kind, rank);
CREATE TABLE IF NOT EXISTS lb_xref (
  work_id      INTEGER NOT NULL,
  source       TEXT NOT NULL,
  external_id  TEXT NOT NULL,
  method       TEXT NOT NULL,
  PRIMARY KEY (work_id, source, external_id)
) WITHOUT ROWID;
CREATE INDEX IF NOT EXISTS idx_lb_xref_ext ON lb_xref(source, external_id);
CREATE TABLE IF NOT EXISTS bgm_person (
  id      INTEGER PRIMARY KEY,
  name    TEXT NOT NULL,
  kana    TEXT,
  romaji  TEXT
);
CREATE TABLE IF NOT EXISTS bgm_character (
  id       INTEGER PRIMARY KEY,
  romaji   TEXT,
  english  TEXT
);
CREATE VIRTUAL TABLE IF NOT EXISTS lb_fts USING fts5(name, alt, content='');
`
// DDL-END

const OVERVIEW_CAP = 2000
const BANGUMI_GAME_TYPE = 4
const UA = 'Xamiru/NaviHUB catalog builder (personal media hub; https://github.com/Xamiru/NaviHUB)'

// ---------------------------------------------------------------------------
// Pure helpers (exported for tests/launchboxCatalog.test.ts)
// ---------------------------------------------------------------------------

// The matching key for titles across LaunchBox, RAWG and Bangumi: NFKC,
// lower case, "&" as "and", everything that is not a letter or digit dropped
// (any script, so Japanese titles keep their kana and kanji). The app's copy
// is titleKey() in src/main/launchboxCatalogCore.ts — the test diffs outputs.
function titleKey(s) {
  return String(s ?? '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^\p{L}\p{N}]+/gu, '')
}

const CJK = /[぀-ヿ㐀-鿿]/
// Hiragana and katakana letters only. The middle dot U+30FB and the long mark
// U+30FC are left out: Chinese names use them too ("约翰・史密斯").
const KANA = /[ぁ-ゖゝ-ゟァ-ヺヽ-ヿㇰ-ㇿ]/

function decodeXml(s) {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, '&')
}

// One flat LaunchBox record ("<Name>…</Name>\n<Genres />…") → { Tag: text }.
function parseRecord(body) {
  const out = {}
  for (const m of body.matchAll(/<(\w+)>([\s\S]*?)<\/\1>/g)) out[m[1]] = decodeXml(m[2]).trim()
  return out
}

const splitList = (s) =>
  String(s ?? '')
    .split(';')
    .map((x) => x.trim())
    .filter(Boolean)

function yearOf(date) {
  const m = /^(\d{4})/.exec(String(date ?? ''))
  return m ? Number(m[1]) : null
}

function entryFrom(rec) {
  const id = Number(rec.DatabaseID)
  if (!Number.isInteger(id) || id <= 0 || !rec.Name) return null
  const date = /^\d{4}-\d{2}-\d{2}/.test(rec.ReleaseDate ?? '')
    ? rec.ReleaseDate.slice(0, 10)
    : /^\d{4}$/.test(rec.ReleaseYear ?? '')
      ? rec.ReleaseYear
      : null
  return {
    id,
    name: rec.Name,
    platform: rec.Platform || null,
    date,
    year: yearOf(date),
    overview: rec.Overview ? rec.Overview.slice(0, OVERVIEW_CAP) : null,
    developers: splitList(rec.Developer),
    publishers: splitList(rec.Publisher),
    genres: splitList(rec.Genres),
    wiki: normWiki(rec.WikipediaURL),
    steam: /^\d+$/.test(rec.SteamAppId ?? '') ? rec.SteamAppId : null,
    ratingCount: Number(rec.CommunityRatingCount) || 0,
    rating: Number(rec.CommunityRating) || null,
    video: /^https:\/\//.test(rec.VideoURL ?? '') ? rec.VideoURL : null
  }
}

// English Wikipedia article key, so LaunchBox URLs and Wikidata sitelinks
// compare equal: "https://en.wikipedia.org/wiki/Persona_5" → "persona 5".
function normWiki(url) {
  const m = /^https?:\/\/en\.(?:m\.)?wikipedia\.org\/wiki\/([^#?]+)/i.exec(String(url ?? '').trim())
  if (!m) return null
  let title
  try {
    title = decodeURIComponent(m[1])
  } catch {
    title = m[1]
  }
  return title.replace(/_/g, ' ').trim().toLowerCase() || null
}

function yearsClose(a, b, window = 1) {
  return a == null || b == null || Math.abs(a - b) <= window
}

// RAWG names its entries by edition and year ("Dark Souls: Prepare To Die
// Edition", "Resident Evil 4 (2005)"); the bare title is a second key.
const EDITION =
  /\s*[:\-–]?\s*(?:(?:game of the year|goty|complete|definitive|enhanced|remastered|deluxe|gold|ultimate|special|anniversary|prepare to die|legendary|premium|standard)(?: edition)?|director'?s cut)\s*$/i
function bareTitle(name) {
  let s = String(name ?? '')
  for (let i = 0; i < 3; i++) {
    const next = s.replace(/\s*\((?:(?:19|20)\d\d|beta|early access)\)\s*$/i, '').replace(EDITION, '')
    if (next === s) break
    s = next
  }
  return s.trim()
}

// Per-platform entries → works. Same title key, then: a shared Wikipedia
// article always joins; a different article never does; otherwise join when
// the platform is not in the work yet and the years are within one. Remakes
// (own article, or years apart) and same-platform re-releases stay separate.
function collapse(entries) {
  const byKey = new Map()
  for (const e of entries) {
    const k = titleKey(e.name)
    if (!k) continue
    let list = byKey.get(k)
    if (!list) byKey.set(k, (list = []))
    list.push(e)
  }
  const works = []
  for (const list of byKey.values()) {
    // Dated entries first, oldest first, so a cluster's year is its original.
    list.sort((a, b) => (a.year ?? 9999) - (b.year ?? 9999) || a.id - b.id)
    const clusters = []
    for (const e of list) {
      let target = null
      if (e.wiki) target = clusters.find((c) => c.wikis.has(e.wiki)) ?? null
      if (!target) {
        target =
          clusters.find(
            (c) =>
              !(e.wiki && c.wikis.size > 0) &&
              !(e.platform && c.platforms.has(e.platform)) &&
              yearsClose(e.year, c.year)
          ) ?? null
      }
      if (!target) {
        target = { members: [], wikis: new Set(), platforms: new Set(), year: e.year }
        clusters.push(target)
      }
      target.members.push(e)
      if (e.wiki) target.wikis.add(e.wiki)
      if (e.platform) target.platforms.add(e.platform)
      if (target.year == null) target.year = e.year
    }
    for (const c of clusters) works.push(workFrom(c.members))
  }
  return works
}

function uniq(list) {
  return [...new Set(list)]
}

function workFrom(members) {
  // Release order decides the work's name, date and cover tie-breaks.
  const ordered = [...members].sort(
    (a, b) => (a.date ?? '9999').localeCompare(b.date ?? '9999') || a.id - b.id
  )
  const first = ordered[0]
  const overview = ordered.map((m) => m.overview).find(Boolean) ?? null
  const rated = members.filter((m) => m.rating != null && m.ratingCount > 0)
  const ratingCount = members.reduce((n, m) => n + m.ratingCount, 0)
  return {
    id: Math.min(...members.map((m) => m.id)),
    name: first.name,
    released: ordered.map((m) => m.date).find(Boolean) ?? null,
    year: ordered.map((m) => m.year).find((y) => y != null) ?? null,
    overview,
    developers: uniq(ordered.flatMap((m) => m.developers)),
    publishers: uniq(ordered.flatMap((m) => m.publishers)),
    genres: uniq(ordered.flatMap((m) => m.genres)),
    platforms: uniq(ordered.map((m) => m.platform).filter(Boolean)),
    members: ordered,
    wikis: uniq(members.map((m) => m.wiki).filter(Boolean)),
    steam: uniq(members.map((m) => m.steam).filter(Boolean)),
    ratingCount,
    rating: rated.length
      ? rated.reduce((s, m) => s + m.rating * m.ratingCount, 0) / rated.reduce((n, m) => n + m.ratingCount, 0)
      : null,
    video: ordered.map((m) => m.video).find(Boolean) ?? null
  }
}

// Japanese first for every game (the user's choice), then the English boxes.
const REGION_RANK = {
  Japan: 0,
  'North America': 1,
  'United States': 1,
  World: 2,
  Europe: 3,
  'United Kingdom': 3,
  '': 4
}
function regionRank(region) {
  const r = REGION_RANK[region ?? '']
  return r == null ? null : r
}

// Bangumi subject wiki infobox → its aliases (English and Japanese names
// people search by). Chinese-only aliases are dropped by the caller's key use:
// they are kept here but only ever compared, never stored.
function bangumiAliases(infobox) {
  const text = String(infobox ?? '')
  const out = []
  const block = /\|\s*别名\s*=\s*\{([\s\S]*?)\r?\n\}/.exec(text)
  if (block) {
    // "[Metal Slug 7]" or "[英文名|Metal Slug 7]"; "[英文名|]" is an empty slot.
    for (const m of block[1].matchAll(/\[([^\]\n]*)\]/g)) {
      const bar = m[1].indexOf('|')
      out.push((bar >= 0 ? m[1].slice(bar + 1) : m[1]).trim())
    }
  }
  for (const m of text.matchAll(/^\|\s*(?:英文名|日文名|原名)\s*=\s*([^\r\n{]+)\r?$/gm)) out.push(m[1].trim())
  return out.filter(Boolean)
}

// Same reading parser as bangumiCore.parseReadingWiki (tests diff them).
function readingFromWiki(wiki) {
  let kana = null
  let romaji = null
  const items = []
  for (const m of String(wiki ?? '').matchAll(/\[([^|\]\n]+)\|([^\]\n]*)\]/g)) items.push([m[1], m[2]])
  for (const m of String(wiki ?? '').matchAll(/^\|\s*([^=\n]+?)\s*=\s*([^{\n][^\n]*)$/gm)) items.push([m[1], m[2]])
  for (const [rawKey, rawValue] of items) {
    const k = rawKey.trim()
    const v = String(rawValue).trim()
    if (!v) continue
    if (['纯假名', '假名', '平假名', '片假名'].includes(k) && !kana && KANA.test(v)) kana = v
    if (['罗马字', '罗马音'].includes(k) && !romaji && /[a-z]/i.test(v)) romaji = v.split(/\s*[=＝/／;；]\s*/)[0].trim()
  }
  return { kana, romaji }
}

// A character's romanized and English names from its wiki infobox.
function latinNames(wiki) {
  let romaji = null
  let english = null
  for (const m of String(wiki ?? '').matchAll(/\[([^|\]\n]+)\|([^\]\n]*)\]/g)) {
    const k = m[1].trim()
    const v = m[2].trim()
    if (!v || !/^[\x20-\x7e\u00c0-\u024f\u0100-\u017f]+$/.test(v)) continue
    if ((k === '罗马字' || k === '罗马音') && !romaji) romaji = v.split(/\s*[=＝/／;；]\s*/)[0].trim()
    if (k === '英文名' && !english) english = v
  }
  return { romaji, english }
}

// Exact-title links. Each candidate must match exactly one work (same title
// key, years within one). Several candidates may then claim the same work:
// without `resolve` all of them link (RAWG lists editions twice, and a work
// may carry several RAWG ids); with it, `resolve(work, claimants)` picks one
// or none (a work has one Bangumi subject).
// candidates: [{ id, keys: string[], looseKeys?: string[], year }];
// worksByKey: Map<key, work[]>
function titleMatches(candidates, worksByKey, resolve, window = 1) {
  const forward = new Map()
  for (const c of candidates) {
    const hits = new Set()
    const collect = (keys) => {
      for (const k of keys) for (const w of worksByKey.get(k) ?? []) if (yearsClose(c.year, w.year, window)) hits.add(w)
    }
    collect(c.keys)
    // The bare title only when the full one found nothing.
    if (!hits.size && c.looseKeys) collect(c.looseKeys)
    // An edition that lists the title as an alternate name ("Premium Edition"
    // a.k.a. "Grand Theft Auto V") gives way to the work titled exactly that.
    let pick = hits.size === 1 ? [...hits][0] : null
    if (hits.size > 1) {
      const titled = [...hits].filter((w) => [...c.keys, ...(c.looseKeys ?? [])].includes(titleKey(w.name)))
      if (titled.length === 1) pick = titled[0]
    }
    if (pick) forward.set(c.id, { cand: c, work: pick })
  }
  if (!resolve) return new Map([...forward].map(([id, f]) => [id, f.work]))
  const claims = new Map()
  for (const f of forward.values()) {
    let list = claims.get(f.work.id)
    if (!list) claims.set(f.work.id, (list = { work: f.work, cands: [] }))
    list.cands.push(f.cand)
  }
  const out = new Map()
  for (const { work, cands } of claims.values()) {
    const chosen = cands.length === 1 ? cands[0] : resolve(work, cands)
    if (chosen) out.set(chosen.id, work)
  }
  return out
}

// Several Bangumi subjects for one work (a game and its updated edition):
// the one released the same year under the work's own title, else the oldest
// subject released that year, else none — the app's review list takes it.
function pickBangumi(work, cands) {
  const sameYear = cands.filter((c) => c.year != null && c.year === work.year)
  const named = sameYear.filter((c) => c.keys.includes(titleKey(work.name)))
  if (named.length === 1) return named[0]
  const pool = named.length ? named : sameYear
  return pool.length ? pool.reduce((a, b) => (a.id < b.id ? a : b)) : null
}

// ---------------------------------------------------------------------------
// Readers
// ---------------------------------------------------------------------------

async function openStream(src, entryName) {
  if (!src.toLowerCase().endsWith('.zip')) return createReadStream(src)
  const yauzl = require('yauzl')
  return new Promise((resolve, reject) => {
    yauzl.open(src, { lazyEntries: true }, (err, zip) => {
      if (err) return reject(err)
      zip.on('entry', (entry) => {
        if (entry.fileName === entryName || entry.fileName.endsWith(`/${entryName}`)) {
          zip.openReadStream(entry, (e, stream) => (e ? reject(e) : resolve(stream)))
        } else {
          zip.readEntry()
        }
      })
      zip.on('end', () => reject(new Error(`${entryName} not found in ${src}`)))
      zip.readEntry()
    })
  })
}

// Streams <Game>, <GameAlternateName> and <GameImage> records.
async function readLaunchBox(src, onRecord) {
  const stream = await openStream(src, 'Metadata.xml')
  stream.setEncoding('utf8')
  let buf = ''
  const open = /<(Game|GameAlternateName|GameImage)>/g
  for await (const chunk of stream) {
    buf += chunk
    let consumed = 0
    for (;;) {
      open.lastIndex = consumed
      const m = open.exec(buf)
      if (!m) break
      const close = `</${m[1]}>`
      const end = buf.indexOf(close, m.index)
      if (end < 0) break
      onRecord(m[1], parseRecord(buf.slice(m.index + m[0].length, end)))
      consumed = end + close.length
    }
    buf = buf.slice(consumed)
  }
}

async function readJsonLines(zipPath, entryName, onRow) {
  const stream = await openStream(zipPath, entryName)
  const rl = createInterface({ input: stream, crlfDelay: Infinity })
  for await (const line of rl) {
    if (!line.trim()) continue
    let row
    try {
      row = JSON.parse(line)
    } catch {
      continue
    }
    onRow(row)
  }
}

async function wikidataBangumi(cachePath) {
  if (cachePath && existsSync(cachePath)) return JSON.parse(readFileSync(cachePath, 'utf8'))
  const query = `SELECT ?item ?bgm ?steam ?article WHERE {
    ?item wdt:P5732 ?bgm .
    OPTIONAL { ?item wdt:P1733 ?steam }
    OPTIONAL { ?article schema:about ?item ; schema:isPartOf <https://en.wikipedia.org/> }
  }`
  const res = await fetch(`https://query.wikidata.org/sparql?format=json&query=${encodeURIComponent(query)}`, {
    headers: { 'User-Agent': UA, Accept: 'application/sparql-results+json' }
  })
  if (!res.ok) throw new Error(`Wikidata query failed (${res.status})`)
  const json = await res.json()
  const rows = json.results.bindings.map((b) => ({
    qid: b.item.value.split('/').pop(),
    bgm: b.bgm.value,
    steam: b.steam?.value ?? null,
    wiki: b.article ? normWiki(b.article.value) : null
  }))
  if (cachePath) writeFileSync(cachePath, JSON.stringify(rows))
  return rows
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const args = { _: [] }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a.startsWith('--')) args[a.slice(2)] = argv[++i]
    else args._.push(a)
  }
  return args
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const outDir = args._[0]
  if (!args.launchbox || !args.bangumi || !outDir) {
    console.error(
      'usage: build-games-catalog2.cjs --launchbox <Metadata.zip> --bangumi <dump.zip> [--rawg <rawg-catalog.db>] [--wikidata-cache <file>] <out-dir>'
    )
    process.exit(2)
  }
  const Database = require('better-sqlite3')

  // 1. LaunchBox
  console.log('Reading LaunchBox…')
  const entries = []
  const alts = new Map()
  const images = new Map()
  let n = 0
  await readLaunchBox(args.launchbox, (tag, rec) => {
    if (++n % 200000 === 0) console.log(`  ${n} records…`)
    if (tag === 'Game') {
      const e = entryFrom(rec)
      if (e) entries.push(e)
    } else if (tag === 'GameAlternateName') {
      const id = Number(rec.DatabaseID)
      if (!rec.AlternateName || !id) return
      let list = alts.get(id)
      if (!list) alts.set(id, (list = []))
      list.push({ name: rec.AlternateName, region: rec.Region || null })
    } else if (tag === 'GameImage') {
      const id = Number(rec.DatabaseID)
      const kind = rec.Type === 'Box - Front' ? 'box' : rec.Type === 'Clear Logo' ? 'logo' : null
      if (!kind || !id || !/^[\w.-]+\.(jpe?g|png)$/i.test(rec.FileName ?? '')) return
      if (kind === 'box' && regionRank(rec.Region) == null) return
      let list = images.get(id)
      if (!list) images.set(id, (list = []))
      list.push({ kind, region: rec.Region || null, file: rec.FileName })
    }
  })
  console.log(`  ${entries.length} entries`)
  const works = collapse(entries)
  console.log(`  ${works.length} works`)

  const worksByKey = new Map()
  const addKey = (k, w) => {
    if (!k) return
    let list = worksByKey.get(k)
    if (!list) worksByKey.set(k, (list = []))
    if (!list.includes(w)) list.push(w)
  }
  for (const w of works) {
    w.alts = []
    w.nameJa = null
    for (const m of w.members) {
      for (const a of alts.get(m.id) ?? []) {
        w.alts.push(a.name)
        if (!w.nameJa && a.region === 'Japan' && CJK.test(a.name)) w.nameJa = a.name
      }
    }
    w.alts = uniq(w.alts)
    addKey(titleKey(w.name), w)
    for (const a of w.alts) addKey(titleKey(a), w)
    w.xref = []
    for (const s of w.steam) w.xref.push(['steam', s, 'xref'])
  }

  // 2. Bangumi links: Wikidata first, then unique exact titles.
  console.log('Linking Bangumi…')
  const wd = await wikidataBangumi(args['wikidata-cache'])
  const bgmByWiki = new Map()
  const bgmBySteam = new Map()
  for (const r of wd) {
    if (r.wiki) bgmByWiki.set(r.wiki, r)
    if (r.steam) bgmBySteam.set(r.steam, r)
  }
  const gameSubjects = new Map()
  await readJsonLines(args.bangumi, 'subject.jsonlines', (s) => {
    if (s.type !== BANGUMI_GAME_TYPE || s.nsfw) return
    gameSubjects.set(Number(s.id), {
      id: Number(s.id),
      name: String(s.name ?? ''),
      year: yearOf(s.date),
      aliases: bangumiAliases(s.infobox)
    })
  })
  console.log(`  ${gameSubjects.size} Bangumi game subjects`)
  const linkedSubjects = new Map() // subject id -> work
  // Exact titles first: Wikidata ties Steam ids and English articles to the
  // base game, so a re-release (Persona 5 Royal) would land on the original's
  // subject. Wikidata then fills the works titles could not decide.
  const subjectCands = [...gameSubjects.values()].map((s) => ({
    id: s.id,
    year: s.year,
    keys: uniq([s.name, ...s.aliases].map(titleKey).filter(Boolean))
  }))
  for (const [sid, w] of titleMatches(subjectCands, worksByKey, pickBangumi)) {
    w.xref.push(['bangumi', String(sid), 'exact'])
    w.bangumi = gameSubjects.get(sid)
    linkedSubjects.set(sid, w)
  }
  for (const w of works) {
    const hit = w.wikis.map((k) => bgmByWiki.get(k)).find(Boolean) ?? w.steam.map((s) => bgmBySteam.get(s)).find(Boolean)
    if (!hit) continue
    const sid = Number(hit.bgm)
    // The item describes another edition than the subject titles chose.
    if (w.bangumi && w.bangumi.id !== sid) continue
    w.xref.push(['wikidata', hit.qid, 'xref'])
    if (w.bangumi || !gameSubjects.has(sid) || linkedSubjects.has(sid)) continue
    w.xref.push(['bangumi', String(sid), 'wikidata'])
    w.bangumi = gameSubjects.get(sid)
    linkedSubjects.set(sid, w)
  }
  let viaWd = 0
  for (const w of works) if (w.xref.some((x) => x[0] === 'bangumi' && x[2] === 'wikidata')) viaWd++
  console.log(`  ${linkedSubjects.size} works linked to Bangumi (${viaWd} through Wikidata)`)
  for (const w of works) if (!w.nameJa && w.bangumi && CJK.test(w.bangumi.name)) w.nameJa = w.bangumi.name

  // 3. Readings of everyone who voices a character in, or is staff on, a
  // linked game.
  console.log('Reading Bangumi people…')
  const actorIds = new Set()
  await readJsonLines(args.bangumi, 'person-characters.jsonlines', (r) => {
    if (linkedSubjects.has(Number(r.subject_id))) actorIds.add(Number(r.person_id))
  })
  await readJsonLines(args.bangumi, 'subject-persons.jsonlines', (r) => {
    if (linkedSubjects.has(Number(r.subject_id))) actorIds.add(Number(r.person_id))
  })
  const persons = []
  await readJsonLines(args.bangumi, 'person.jsonlines', (p) => {
    if (!actorIds.has(Number(p.id)) || p.type !== 1) return
    const reading = readingFromWiki(p.infobox)
    persons.push({ id: Number(p.id), name: String(p.name ?? ''), kana: reading.kana, romaji: reading.romaji })
  })
  console.log(`  ${persons.length} people`)

  // Latin names of the characters of linked games: Bangumi lists most game
  // characters by their Japanese name only.
  const characterIds = new Set()
  await readJsonLines(args.bangumi, 'subject-characters.jsonlines', (r) => {
    if (linkedSubjects.has(Number(r.subject_id))) characterIds.add(Number(r.character_id))
  })
  const characters = []
  await readJsonLines(args.bangumi, 'character.jsonlines', (c) => {
    if (!characterIds.has(Number(c.id))) return
    const names = latinNames(c.infobox)
    if (names.romaji || names.english) characters.push({ id: Number(c.id), ...names })
  })
  console.log(`  ${characters.length} characters with a Latin name`)

  // 4. RAWG: Metacritic, popularity and the RAWG-id bridge for old rows.
  if (args.rawg) {
    console.log('Joining the RAWG pack…')
    const rawg = new Database(args.rawg, { readonly: true, fileMustExist: true })
    const rows = rawg
      .prepare('SELECT id, name, name_original, released, metacritic, added FROM catalog_game')
      .all()
    rawg.close()
    const candidates = rows.map((r) => ({
      id: r.id,
      year: yearOf(r.released),
      keys: uniq([r.name, r.name_original].map(titleKey).filter(Boolean)),
      looseKeys: [titleKey(bareTitle(r.name))].filter(Boolean),
      row: r
    }))
    const byId = new Map(candidates.map((c) => [c.id, c.row]))
    // RAWG often dates a game by its early-access start, years before the
    // release LaunchBox records: a second, wider pass for what the first left.
    const matched = titleMatches(candidates, worksByKey)
    const rest = candidates.filter((c) => !matched.has(c.id))
    for (const [rid, w] of titleMatches(rest, worksByKey, undefined, 3)) matched.set(rid, w)
    let joined = 0
    for (const [rid, w] of matched) {
      const r = byId.get(rid)
      w.xref.push(['rawg', String(rid), 'exact'])
      if (r.metacritic > 0) w.metacritic = Math.max(w.metacritic ?? 0, r.metacritic)
      w.rawgAdded = (w.rawgAdded ?? 0) + (r.added ?? 0)
      joined++
    }
    console.log(`  ${joined} RAWG games joined`)
  }

  // 5. Write.
  const dbPath = join(outDir, 'games-catalog.db')
  rmSync(dbPath, { force: true })
  const db = new Database(dbPath)
  db.pragma('journal_mode = OFF')
  db.pragma('synchronous = OFF')
  db.exec(LAUNCHBOX_CATALOG_DDL)
  const insWork = db.prepare(
    `INSERT INTO lb_work (id, name, name_ja, released, overview, developers, publishers, genres, platforms,
       metacritic, popularity, rating, video_url)
     VALUES (@id, @name, @nameJa, @released, @overview, @developers, @publishers, @genres, @platforms,
       @metacritic, @popularity, @rating, @video)`
  )
  const insMember = db.prepare('INSERT OR IGNORE INTO lb_member (lb_id, work_id, platform) VALUES (?, ?, ?)')
  const insImage = db.prepare(
    'INSERT INTO lb_image (work_id, kind, region, platform, file, rank) VALUES (?, ?, ?, ?, ?, ?)'
  )
  const insXref = db.prepare(
    'INSERT OR IGNORE INTO lb_xref (work_id, source, external_id, method) VALUES (?, ?, ?, ?)'
  )
  const insFts = db.prepare('INSERT INTO lb_fts (rowid, name, alt) VALUES (?, ?, ?)')
  const insPerson = db.prepare('INSERT OR REPLACE INTO bgm_person (id, name, kana, romaji) VALUES (?, ?, ?, ?)')
  const insCharacter = db.prepare('INSERT OR REPLACE INTO bgm_character (id, romaji, english) VALUES (?, ?, ?)')
  let boxes = 0
  let japanBoxes = 0
  db.transaction(() => {
    for (const w of works) {
      insWork.run({
        id: w.id,
        name: w.name,
        nameJa: w.nameJa,
        released: w.released,
        overview: w.overview,
        developers: JSON.stringify(w.developers),
        publishers: JSON.stringify(w.publishers),
        genres: JSON.stringify(w.genres),
        platforms: JSON.stringify(w.platforms),
        metacritic: w.metacritic ?? null,
        popularity: (w.rawgAdded ?? 0) + w.ratingCount,
        rating: w.rating,
        video: w.video
      })
      let hasJapan = false
      let hasBox = false
      let logo = false
      w.members.forEach((m, order) => {
        insMember.run(m.id, w.id, m.platform)
        const seen = new Set()
        for (const img of images.get(m.id) ?? []) {
          if (img.kind === 'logo') {
            if (logo) continue
            logo = true
            insImage.run(w.id, 'logo', img.region, m.platform, img.file, 0)
            continue
          }
          if (seen.has(img.region ?? '')) continue // one box per region per platform
          seen.add(img.region ?? '')
          insImage.run(w.id, 'box', img.region, m.platform, img.file, regionRank(img.region) * 1000 + order)
          hasBox = true
          if (img.region === 'Japan') hasJapan = true
        }
      })
      if (hasBox) boxes++
      if (hasJapan) japanBoxes++
      for (const [source, id, method] of w.xref) insXref.run(w.id, source, id, method)
      insFts.run(w.id, w.name, [w.nameJa, ...w.alts].filter(Boolean).join(' | '))
    }
    for (const p of persons) insPerson.run(p.id, p.name, p.kana, p.romaji)
    for (const c of characters) insCharacter.run(c.id, c.romaji, c.english)
  })()
  const meta = db.prepare('INSERT OR REPLACE INTO lb_meta (key, value) VALUES (?, ?)')
  meta.run('snapshot', new Date(statSync(args.launchbox).mtimeMs).toISOString().slice(0, 10))
  meta.run('works', String(works.length))
  meta.run('bangumiLinked', String(linkedSubjects.size))
  db.exec('VACUUM')
  db.close()
  console.log(`${works.length} works, ${boxes} with box art (${japanBoxes} Japanese) — gzipping…`)
  writeFileSync(`${dbPath}.gz`, gzipSync(readFileSync(dbPath), { level: 9 }))
  console.log(`done: ${dbPath}.gz`)
}

// Guarded so tests can require the helpers without running a build.
if (require.main === module) {
  main().catch((e) => {
    console.error(e)
    process.exit(1)
  })
}

module.exports = {
  LAUNCHBOX_CATALOG_DDL,
  titleKey,
  parseRecord,
  entryFrom,
  normWiki,
  collapse,
  regionRank,
  bangumiAliases,
  readingFromWiki,
  latinNames,
  titleMatches,
  pickBangumi,
  bareTitle,
  readLaunchBox
}
