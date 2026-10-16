import type { GbFile, GbGame, GbModDetail, GbModPage, GbModSummary, GbSort } from '@shared/types'

// Pure, whitelisting parsers for GameBanana's apiv11 (gamebanana.ts is the IO
// half). Nothing here throws: a malformed response reads as "nothing".
//
// ADULT CONTENT IS NEVER SHOWN — the Art Browse invariant, hard-coded and not
// parameterised. A list row survives only when GameBanana shows it openly
// (_sInitialVisibility 'show') AND it carries no content ratings; a profile is
// re-checked the same way, plus its private/trashed/withheld flags, and the
// install path refuses anything isSafeProfile rejects.

const SORTS: Readonly<Record<GbSort, string>> = {
  downloads: 'Generic_MostDownloaded',
  newest: 'Generic_Newest',
  likes: 'Generic_MostLiked'
}

export const GB_API = 'https://gamebanana.com/apiv11'
export { GB_PAGE_SIZE } from '@shared/gamebanana'

export function sortParam(sort: GbSort): string {
  return SORTS[sort] ?? SORTS.downloads
}

type Obj = Record<string, unknown>

function obj(v: unknown): Obj | null {
  return v && typeof v === 'object' && !Array.isArray(v) ? (v as Obj) : null
}

function str(v: unknown, max = 500): string | null {
  return typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : null
}

function int(v: unknown): number | null {
  return typeof v === 'number' && Number.isFinite(v) ? Math.trunc(v) : null
}

function id(v: unknown): number | null {
  const n = int(v)
  return n != null && n > 0 ? n : null
}

// Images are only ever taken from GameBanana's own image host.
export function safeImageUrl(url: string | null): string | null {
  if (!url) return null
  try {
    const u = new URL(url)
    return u.protocol === 'https:' && u.hostname === 'images.gamebanana.com' ? u.toString() : null
  } catch {
    return null
  }
}

function previewImages(media: unknown, max = 12): { thumb: string | null; images: string[] } {
  const images = (obj(media)?._aImages as unknown[]) ?? []
  const out: string[] = []
  let thumb: string | null = null
  for (const raw of Array.isArray(images) ? images : []) {
    const img = obj(raw)
    const base = str(img?._sBaseUrl)
    const file = str(img?._sFile)
    if (!base || !file || /[/\\]/.test(file)) continue
    const full = safeImageUrl(`${base}/${file}`)
    if (!full) continue
    if (!thumb) {
      const small = str(img?._sFile530) ?? str(img?._sFile220)
      thumb = small && !/[/\\]/.test(small) ? safeImageUrl(`${base}/${small}`) ?? full : full
    }
    out.push(full)
    if (out.length >= max) break
  }
  return { thumb, images: out }
}

function hasRatings(v: unknown): boolean {
  if (v == null) return false
  if (Array.isArray(v)) return v.length > 0
  const o = obj(v)
  return o ? Object.keys(o).length > 0 : true
}

// The list-row gate. _bHasContentRatings must be explicitly false.
export function isSafeRow(row: unknown): boolean {
  const r = obj(row)
  return !!r && r._sInitialVisibility === 'show' && r._bHasContentRatings === false
}

// The profile gate, used again before any download.
export function isSafeProfile(profile: unknown): boolean {
  const p = obj(profile)
  if (!p) return false
  if (p._sInitialVisibility !== 'show') return false
  if (p._bHasContentRatings === true || hasRatings(p._aContentRatings)) return false
  if (p._bIsPrivate === true || p._bIsTrashed === true || p._bIsWithheld === true) return false
  return true
}

export function parseGames(json: unknown): GbGame[] {
  const records = obj(json)?._aRecords
  if (!Array.isArray(records)) return []
  return records.flatMap((raw) => {
    const r = obj(raw)
    const gid = id(r?._idRow)
    const name = str(r?._sName, 200)
    if (!gid || !name) return []
    return [{ id: gid, name, iconUrl: safeImageUrl(str(r?._sIconUrl)) }]
  })
}

function summary(raw: unknown): GbModSummary | null {
  const r = obj(raw)
  const modId = id(r?._idRow)
  const name = str(r?._sName, 200)
  if (!modId || !name || r?._sModelName !== 'Mod') return null
  const { thumb, images } = previewImages(r?._aPreviewMedia, 6)
  return {
    id: modId,
    name,
    submitter: str(obj(r?._aSubmitter)?._sName, 100),
    category: str(obj(r?._aRootCategory)?._sName, 100),
    version: str(r?._sVersion, 60),
    likes: int(r?._nLikeCount) ?? 0,
    views: int(r?._nViewCount) ?? 0,
    dateAdded: int(r?._tsDateAdded),
    dateUpdated: int(r?._tsDateUpdated) ?? int(r?._tsDateModified),
    obsolete: r?._bIsObsolete === true,
    thumbUrl: thumb,
    images
  }
}

export function parseModPage(json: unknown, page: number): GbModPage {
  const o = obj(json)
  const meta = obj(o?._aMetadata)
  const records = Array.isArray(o?._aRecords) ? (o?._aRecords as unknown[]) : []
  const mods = records.filter(isSafeRow).map(summary).filter((m): m is GbModSummary => m != null)
  const firstGame = obj(obj(records[0])?._aGame)
  return {
    page,
    gameName: str(firstGame?._sName, 200),
    mods,
    // The raw count includes rows the filter hid; "more" follows the source.
    total: int(meta?._nRecordCount) ?? mods.length,
    complete: meta?._bIsComplete === true || records.length === 0
  }
}

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }

function decodeEntities(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === '#') {
      const code = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)
      return Number.isFinite(code) && code > 0 && code < 0x110000 ? String.fromCodePoint(code) : ''
    }
    return ENTITIES[e.toLowerCase()] ?? m
  })
}

// Mod text is HTML. It becomes plain paragraphs: block tags and <br> break
// lines, list items get a dash, every other tag (scripts and styles with
// their content) is dropped. Nothing of the markup reaches the renderer.
export function htmlToParagraphs(html: string | null, maxChars = 8000): string[] {
  if (!html) return []
  // Whole script/style blocks go first, before any cut, so a block split by
  // the cut can never leave its contents behind as text; an unclosed one is
  // dropped to the end.
  const text = decodeEntities(
    html
      .replace(/<(script|style|iframe|object)\b[\s\S]*?(<\/\1\s*>|$)/gi, '')
      .slice(0, maxChars * 4)
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<li[^>]*>/gi, '\n- ')
      .replace(/<\/(p|div|h[1-6]|li|ul|ol|blockquote|tr)>/gi, '\n')
      .replace(/<[^>]*>/g, '')
  )
  const paragraphs = text
    .split(/\n{1,}/)
    .map((line) => line.replace(/[ \t\f\v]+/g, ' ').trim())
    .filter(Boolean)
  const out: string[] = []
  let used = 0
  for (const p of paragraphs) {
    if (used + p.length > maxChars) break
    out.push(p)
    used += p.length
  }
  return out
}

function parseFile(raw: unknown): GbFile | null {
  const f = obj(raw)
  const fileId = id(f?._idRow)
  const name = str(f?._sFile, 260)
  const size = int(f?._nFilesize)
  if (!fileId || !name || size == null || size < 0) return null
  const md5 = str(f?._sMd5Checksum, 64)
  return {
    id: fileId,
    name,
    size,
    md5: md5 && /^[0-9a-f]{32}$/i.test(md5) ? md5.toLowerCase() : null,
    avClean: f?._sAvResult === 'clean',
    description: str(f?._sDescription, 300),
    version: str(f?._sVersion, 60),
    dateAdded: int(f?._tsDateAdded),
    downloads: int(f?._nDownloadCount) ?? 0,
    archived: f?._bIsArchived === true
  }
}

// Null for anything the adult filter rejects, so a direct link to a hidden
// mod shows nothing.
export function parseModDetail(json: unknown): GbModDetail | null {
  if (!isSafeProfile(json)) return null
  const r = obj(json) as Obj
  const modId = id(r._idRow)
  const name = str(r._sName, 200)
  if (!modId || !name) return null
  const { images } = previewImages(r._aPreviewMedia, 20)
  const files = (Array.isArray(r._aFiles) ? r._aFiles : [])
    .map(parseFile)
    .filter((f): f is GbFile => f != null)
  return {
    id: modId,
    name,
    gameId: id(obj(r._aGame)?._idRow),
    submitter: str(obj(r._aSubmitter)?._sName, 100),
    category: str(obj(r._aCategory)?._sName, 100),
    version: str(r._sVersion, 60),
    likes: int(r._nLikeCount) ?? 0,
    downloads: int(r._nDownloadCount) ?? 0,
    dateUpdated: int(r._tsDateUpdated) ?? int(r._tsDateModified),
    dateModified: int(r._tsDateModified),
    summary: str(r._sDescription, 500),
    body: htmlToParagraphs(str(r._sText, 200_000)),
    license: htmlToParagraphs(str(r._sLicense, 20_000), 1500).join(' ') || null,
    images,
    files,
    profileUrl: `https://gamebanana.com/mods/${modId}`
  }
}

// Download URLs are built from a file id, never taken from a response.
export function downloadUrl(fileId: number): string {
  return `https://gamebanana.com/dl/${fileId}`
}

// Where a download may end up after GameBanana's redirects.
export function isGameBananaHost(url: string): boolean {
  try {
    const u = new URL(url)
    return u.protocol === 'https:' && (u.hostname === 'gamebanana.com' || u.hostname.endsWith('.gamebanana.com'))
  } catch {
    return false
  }
}
