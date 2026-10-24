import { extname } from 'path'

// Pulling a season/episode number out of a release filename. Pure and heavily
// fixture-tested, because the NEGATIVE cases are the whole difficulty: a scene
// release name is mostly numbers that are not episode numbers (1080p, x265,
// 10bit, 5.1, a year, an 8-hex CRC), and guessing wrong silently reorders a
// whole season.
//
// Same shape as manga.ts:parseChapterNumber — explicit markers win outright,
// and a bare number is only trusted after the noise has been masked out.

export const VIDEO_EXTS = new Set([
  '.mp4',
  '.m4v',
  '.mov',
  '.webm',
  '.mkv',
  '.avi',
  '.ogv',
  '.ts',
  '.m2ts',
  '.mts',
  '.wmv',
  '.flv',
  '.mpg',
  '.mpeg',
  '.divx'
])

export function isVideoFile(name: string): boolean {
  return !name.startsWith('.') && VIDEO_EXTS.has(extname(name).toLowerCase())
}

// Extras that shouldn't become episodes. Creditless openings (NCOP/NCED) are
// deliberately NOT here — they're watchable content and the user may want them.
export function looksLikeSample(name: string): boolean {
  return /(^|[^a-z])(sample|trailer|preview)([^a-z]|$)/i.test(name)
}

// Everything that looks like a number but isn't an episode. Order matters:
// resolutions go before the bare-year rule so 1920x1080 can't leave a stray
// "1080" behind.
const NOISE: RegExp[] = [
  /\b\d{3,4}\s?[xX×]\s?\d{3,4}\b/g, // 1920x1080
  /\b\d{3,4}[pi]\b/gi, // 1080p, 480i
  /\b[xh]\.?26[45]\b/gi, // x264, h.265
  /\b(hevc|avc|av1|vp9|xvid|divx)\b/gi,
  /\b\d{1,2}\s?bits?\b/gi, // 10bit, 8 bit
  /\b\d\.\d\s?(ch|channels?)\b/gi, // 5.1ch
  /\b(aac|ac3|eac3|dts(?:-hd)?|truehd|flac|opus|mp3|pcm)\s?\d?(\.\d)?\b/gi,
  /\b(19|20)\d{2}\b/g, // a year
  /\b[0-9a-f]{8}\b/gi, // CRC32 stamp
  // v2 re-release marker, in both spellings. The attached form ("03v2") needs
  // its own rule: there is no word boundary between the digit and the v, so a
  // plain \bv\d\b never fires and the episode number ends up unreadable.
  /(?<=\d)v\d{1,2}\b/gi,
  /\bv\d{1,2}\b/gi,
  /\b\d+(?:\.\d+)?\s?(gb|mb|kbps|fps|hz)\b/gi,
  /\b(bd|bdrip|blu-?ray|web-?dl|web-?rip|web|dvd-?rip|dvd|hdtv|remux|uncensored|dual[\s._-]?audio|multi|multiple|subtitle|subs?|raw|repack|batch|complete)\b/gi
]

function maskNoise(stem: string): string {
  let out = stem
  for (const re of NOISE) out = out.replace(re, (m) => ' '.repeat(m.length))
  // Bracket/paren CHARACTERS go, but their contents stay — some groups put the
  // episode number in brackets ("Show [01][1080p]"), so dropping whole groups
  // would lose it.
  return out.replace(/[[\]()]/g, ' ')
}

export interface ParsedEpisode {
  season: number | null
  number: number | null
  // The filename with brackets and technical noise removed — a readable label
  // for files that carry no episode number (films, specials).
  label: string
}

function num(raw: string): number | null {
  const n = parseFloat(raw)
  return Number.isFinite(n) ? n : null
}

// Bare numbers that are usually a resolution tag missing its "p" ("[720]",
// "Show_03_720"). Never masked outright: One Piece and Conan have episodes
// 720 and 1080, so one only loses to an earlier number in the same name.
const BARE_RESOLUTIONS = new Set([360, 480, 540, 576, 720, 1080, 1440, 2160])

// `ignore` is a number the folder pass found in every name (scanSeriesDir), so
// it cannot be the episode; it is masked before the bare-number fallback only,
// never against an explicit marker.
export function parseEpisodeName(fileName: string, ignore?: number): ParsedEpisode {
  const stem = fileName.slice(0, fileName.length - extname(fileName).length)
  const label = cleanTitle(fileName)

  // 1. Explicit markers, in descending confidence. These beat everything.
  const se = /\bs(\d{1,3})[\s._-]?e(\d{1,4}(?:\.\d+)?)\b/i.exec(stem)
  if (se) return { season: num(se[1]), number: num(se[2]), label }

  const cross = /\b(\d{1,2})\s?[xX]\s?(\d{2,4}(?:\.\d+)?)\b/.exec(stem)
  if (cross) return { season: num(cross[1]), number: num(cross[2]), label }

  const jp = /第\s*(\d{1,4}(?:\.\d+)?)\s*話/.exec(stem)
  if (jp) return { season: standaloneSeason(stem), number: num(jp[1]), label }

  // "Episode 5", "Ep.05", "E05" — the leading boundary must not be a letter, or
  // the "e" in a title word would anchor a match.
  const ep = /(?:^|[^a-z])e(?:p|pisode)?[\s._-]?(\d{1,4}(?:\.\d+)?)\b/i.exec(stem)
  if (ep) return { season: standaloneSeason(stem), number: num(ep[1]), label }

  // 2. Fallback: a bare number, but only once the noise is masked out.
  let masked = maskNoise(stem)
  if (ignore != null) {
    // Only its last occurrence: "Show 03 [Disc 3]" still keeps episode 3.
    const hits = [...masked.matchAll(/\d+(?:\.\d+)?/g)].filter((h) => num(h[0]) === ignore)
    const last = hits[hits.length - 1]
    if (last?.index != null) {
      masked = masked.slice(0, last.index) + ' '.repeat(last[0].length) + masked.slice(last.index + last[0].length)
    }
  }

  // The dominant fansub convention is "<Title> - 03", so a number that follows
  // a dash separator is far more trustworthy than any other bare number.
  const dashed = /[-–—]\s*(\d{1,4}(?:\.\d+)?)\s*(?=$|[\s([])/.exec(masked)
  if (dashed) return { season: standaloneSeason(stem), number: num(dashed[1]), label }

  // Otherwise the LAST standalone number wins: titles carry leading numbers
  // ("86 - Eighty Six", "5-toubun no Hanayome") but the episode is at the end.
  const all = [...masked.matchAll(/(?:^|[\s._-])(\d{1,4}(?:\.\d+)?)(?=$|[\s._-])/g)]
  if (all.length > 0) {
    let pick = all.length - 1
    if (pick > 0 && BARE_RESOLUTIONS.has(num(all[pick][1]) ?? -1)) pick -= 1
    return { season: standaloneSeason(stem), number: num(all[pick][1]), label }
  }

  return { season: standaloneSeason(stem), number: null, label }
}

// "S2", "Season 2" appearing on its own (an SxxExx name never reaches here).
function standaloneSeason(stem: string): number | null {
  const m = /(?:^|[^a-z])(?:s|season)[\s._-]?(\d{1,2})\b/i.exec(stem)
  if (!m) return null
  // Guard the common false positive: "Subs", "Sample" etc. are already excluded
  // by requiring digits, but "S1080p" style junk is not.
  return num(m[1])
}

// A number in most names of one folder is a tag, not the episode: a release
// that writes its resolution as a bare "720" once numbered a whole season 720.
// Those names are read again without it, and the result is kept only when it
// gives each of them its own number; otherwise the first reading stands.
export function dropSharedNumber(names: string[], parsed: ParsedEpisode[]): ParsedEpisode[] {
  const counts = new Map<number, number>()
  for (const p of parsed) {
    if (p.number != null) counts.set(p.number, (counts.get(p.number) ?? 0) + 1)
  }
  let shared: number | null = null
  let best = 0
  for (const [n, c] of counts) {
    if (c > best) {
      shared = n
      best = c
    }
  }
  if (shared == null || best < 2 || best * 2 < names.length) return parsed
  const again = new Map<number, ParsedEpisode>()
  parsed.forEach((p, i) => {
    if (p.number === shared) again.set(i, parseEpisodeName(names[i], shared))
  })
  const keys = [...again.values()].map((p) => `${p.season}:${p.number}`)
  const valid = [...again.values()].every((p) => p.number != null) && new Set(keys).size === keys.length
  return valid ? parsed.map((p, i) => again.get(i) ?? p) : parsed
}

// The season a FOLDER name stands for: "Season 2", "Series 02", "S02",
// "Show S2 [1080p]", and Specials/OVA folders as season 0 (TMDB's number for
// specials). Null for any other folder, so the file's own name decides.
export function folderSeason(name: string): number | null {
  if (/^(specials?|sps?|ovas?|oads?)$/i.test(name.trim())) return 0
  const m = /(?:^|[^a-z])(?:s|season|series)[\s._-]?(\d{1,3})(?![\d])/i.exec(maskNoise(name))
  return m ? num(m[1]) : null
}

// A readable title: brackets and technical tags gone, separators normalized.
// "[SubsPlease] Frieren - 03 (1080p) [A1B2C3D4].mkv" → "Frieren - 03"
export function cleanTitle(fileName: string): string {
  const stem = fileName.slice(0, fileName.length - extname(fileName).length)
  let out = stem.replace(/\[[^\]]*\]/g, ' ').replace(/\([^)]*\)/g, ' ')
  for (const re of NOISE) out = out.replace(re, ' ')
  out = out
    .replace(/[._]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s*[-–—]\s*$/, '')
    .trim()
  return out || stem
}

// The display title for a scanned row: an episode number when we found one
// (uniform and sortable), otherwise the cleaned filename (films, specials).
export function episodeTitle(parsed: ParsedEpisode): string {
  if (parsed.number == null) return parsed.label
  const n = Number.isInteger(parsed.number)
    ? String(parsed.number).padStart(2, '0')
    : String(parsed.number)
  if (parsed.season === 0) return `Special ${n}`
  return parsed.season != null ? `S${parsed.season} · Episode ${n}` : `Episode ${n}`
}
