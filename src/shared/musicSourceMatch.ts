import type { MusicSourceEvidence, SpotifyAudioCandidate } from './types'

/** Featuring credits are artist metadata, not part of the recording's title. */
export function withoutFeaturing(value: string): string {
  return value
    .replace(/\s*[([]\s*(?:feat\.?|ft\.?|featuring|with)\s[^)\]]*[)\]]/giu, ' ')
    .replace(/\s+(?:[-–—]\s+)?(?:feat\.?|ft\.?|featuring)\s.*$/iu, '')
}

export function recordingText(value: string): string {
  const normalized = value.normalize('NFKC').toLowerCase().replace(/[\p{P}\p{S}]+/gu, ' ').replace(/\s+/g, ' ').trim()
  return withoutFeaturing(value.normalize('NFKC')).toLowerCase().replace(/[\p{P}\p{S}]+/gu, ' ')
    .replace(/\b(?:\d+(?:st|nd|rd|th) anniversary )?(?:(?:19|20)\d{2} )?(?:digital(?:ly)? )?re ?master(?:ed)?(?: version)?(?: (?:in )?(?:19|20)\d{2})?(?: version)?\b/g, '')
    // Newer catalogue wording drops the "re": "2017 Master", "2011 Mastered Version".
    .replace(/\b(?:19|20)\d{2} master(?:ed)?(?: version)?\b/g, '')
    // Single and album edits differ in length, which the duration check already enforces.
    .replace(/\b(?:single|album) version\b/g, '')
    // "Original Mix" is the plain track; "Mono Version" and "(Mono)" name one mix.
    .replace(/\boriginal mix\b/g, '')
    .replace(/\b(mono|stereo) (?:version|mix)\b/g, '$1')
    .replace(/\s+/g, ' ').trim() || normalized
}

/** The title without subtitles, version suffixes or featuring credits: the lookup key for local candidates. */
export function baseRecordingTitle(value: string): string {
  const base = withoutFeaturing(value.normalize('NFKC'))
    .replace(/\s*[([{][^)\]}]*[)\]}]/g, ' ')
    .replace(/\s[-–—]\s.*$/, '')
  return recordingText(base) || recordingText(value)
}

/** Version wording lives in brackets or after " - ", never in the main title ("Who Wants to Live Forever"). */
function versionText(title: string): string {
  const brackets = [...title.matchAll(/[([{]([^)\]}]*)[)\]}]/g)].map((match) => match[1])
  return [...brackets, title.match(/\s[-–—]\s(.+)$/)?.[1] ?? ''].join(' ')
}

const RECORDING_VARIANT_MARKERS: [string, RegExp][] = [
  ['live', /\blive\b/],
  ['acoustic', /\b(?:acoustic|unplugged)\b/],
  ['remix', /\b(?:remix|club mix|dance mix)\b/],
  ['instrumental', /\binstrumental\b/],
  ['demo', /\bdemo\b/],
  ['karaoke', /\bkaraoke\b/],
  ['radio-edit', /\bradio edit\b/],
  ['sped-up', /\bsped up\b/],
  ['slowed', /\bslowed\b/],
  ['rerecorded', /\b(?:re recorded|rerecorded|taylor s version)\b/]
]

// Any "live" in the release title marks its tracks: "Live Through This" (studio) cannot be told
// from "Live and Dangerous" (concert), and a studio take must never stand in for a live one.
export function recordingVariantSignature(title: string, albumTitle = ''): string {
  const value = recordingText(`${versionText(title)} ${albumTitle}`)
  return RECORDING_VARIANT_MARKERS
    .filter(([, pattern]) => pattern.test(value))
    .map(([key]) => key)
    .join('|')
}

const NON_LATIN = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}\p{Script=Cyrillic}\p{Script=Arabic}\p{Script=Hebrew}\p{Script=Thai}\p{Script=Greek}\p{Script=Devanagari}]/u
const VERSION_WORDS = /\b(?:ver|version|edit|mix|remix|size|remaster(?:ed)?|live|inst|instrumental|karaoke|english|cover|take|acoustic|demo|off vocal)\b/i

/**
 * Catalogues pair a native title with its romanization or translation: "紅蓮華 - Gurenge",
 * "Through the Night (밤편지)". Either half names the recording, unless the Latin half is
 * version wording ("紅蓮華 - TV Size").
 */
export function titleAliases(title: string): string[] {
  const value = title.normalize('NFKC').trim()
  const pair = value.match(/^(.+?)\s[-–—]\s(.+)$/) ?? value.match(/^(.+?)\s*\(([^()]+)\)$/)
  if (!pair) return [title]
  const [, first, second] = pair
  if (NON_LATIN.test(first) === NON_LATIN.test(second)) return [title]
  const latin = NON_LATIN.test(first) ? second : first
  if (!/\p{Script=Latin}/u.test(latin) || VERSION_WORDS.test(latin)) return [title]
  return [title, first.trim(), second.trim()]
}

/** Accents on Latin letters only: kana voicing marks are part of the word. */
function foldLatin(value: string): string {
  return value.normalize('NFD').replace(/(\p{Script=Latin})\p{M}+/gu, '$1').normalize('NFC')
}

function artistKey(value: string): string {
  return foldLatin(recordingText(value)).replace(/^the /, '').split(' ').filter((word) => word !== 'and').join(' ')
}

/** "Simon & Garfunkel" = "Simon and Garfunkel", "Beyoncé" = "Beyonce", "PornoGraffitti" = "Porno Graffitti", "Sawano Hiroyuki" = "Hiroyuki Sawano". */
export function sameArtist(a: string, b: string): boolean {
  const x = artistKey(a)
  const y = artistKey(b)
  if (!x || !y) return false
  if (x.replace(/ /g, '') === y.replace(/ /g, '')) return true
  const xs = x.split(' ')
  const ys = y.split(' ')
  return xs.length === 2 && ys.length === 2 && xs[0] === ys[1] && xs[1] === ys[0]
}

export function durationFits(expected: number | null, actual: number | null): boolean {
  return expected != null && actual != null && Math.abs(expected - actual) <= Math.min(8, Math.max(3, expected * .03))
}

export function assessMusicSource(expected: { title: string; artist: string; duration: number | null; albumTitle?: string }, source: Pick<MusicSourceEvidence, 'title' | 'artist' | 'channel' | 'duration' | 'albumTitle'>): { strong: boolean; reasons: string[]; rank: number } {
  const artist = recordingText(expected.artist)
  const channel = recordingText(source.channel).replace(/\b(topic|official|vevo)\b/g, '').trim()
  // Artist channels are often one word with a label suffix ("IndilaVEVO", "IndilaMusic").
  const compactChannel = channel.replace(/\s+/g, '')
  // Collaborations arrive as one joined credit ("A, B" or "A & B"); the primary artist must be one member.
  const actualArtists = source.artist
    ? [recordingText(source.artist), ...source.artist.split(/\s*(?:,|&|;|\/|\bfeat\.?|\bft\.?|\bwith\b)\s*/i).map(recordingText)]
    : [channel, ...(compactChannel.replace(/(?:vevo|music|official|officiel|tv)$/, '') === artist.replace(/\s+/g, '') ? [artist] : [])]
  const cleanTitle = (value: string) => {
    let title = recordingText(value)
      .replace(/\b(?:official (?:audio|video|music video|lyric video|visualizer)|lyrics video|lyric video|audio only|clip officiel|(?:vidéo|video|audio) officiel(?:le)?|video oficial|offizielles (?:musikvideo|video))\b/g, '')
      .replace(/\s+/g, ' ').trim()
    if (title.startsWith(`${artist} `)) title = title.slice(artist.length).trim()
    return foldLatin(title)
  }
  const reasons: string[] = []
  // Video titles often lead with the artist ("Queen - Who Wants to Live Forever"); that is not a version suffix.
  const escapedArtist = expected.artist.trim().replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
  const sourceTitle = escapedArtist ? source.title.replace(new RegExp(`^\\s*${escapedArtist}\\s*[-–—:]\\s*`, 'i'), '') : source.title
  if (recordingVariantSignature(expected.title, expected.albumTitle) !== recordingVariantSignature(sourceTitle, source.albumTitle ?? undefined)) reasons.push('Recording variant differs')
  let rank = 0
  const sourceTitles = new Set([source.title, ...titleAliases(sourceTitle)].map(cleanTitle).filter(Boolean))
  if (titleAliases(expected.title).some((value) => sourceTitles.has(foldLatin(recordingText(value))))) rank += 4
  else reasons.push('Title or recording version differs')
  if (artist && actualArtists.some((value) => sameArtist(value, expected.artist))) rank += 3
  else reasons.push('Artist identity needs checking')
  if (durationFits(expected.duration, source.duration)) rank += 2
  else reasons.push('Duration is unknown or differs')
  return { strong: reasons.length === 0, reasons, rank }
}
export function rankMusicSources(expected: { title: string; artist: string; duration: number | null; albumTitle?: string }, sources: SpotifyAudioCandidate[]) {
  return sources.map((source) => ({ ...source, assessment: assessMusicSource(expected, { ...source, artist: source.artist ?? null, albumTitle: source.album ?? null }) }))
    .sort((a, b) => b.assessment.rank - a.assessment.rank)
}
