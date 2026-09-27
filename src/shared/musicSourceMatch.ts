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
    .replace(/\s+/g, ' ').trim() || normalized
}

/** The title without subtitles, version suffixes or featuring credits: the lookup key for local candidates. */
export function baseRecordingTitle(value: string): string {
  const base = withoutFeaturing(value)
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

export function recordingVariantSignature(title: string, albumTitle = ''): string {
  const value = recordingText(`${versionText(title)} ${albumTitle}`)
  return RECORDING_VARIANT_MARKERS
    .filter(([, pattern]) => pattern.test(value))
    .map(([key]) => key)
    .join('|')
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
  let title = recordingText(source.title)
    .replace(/\b(?:official (?:audio|video|music video|lyric video|visualizer)|lyrics video|lyric video|audio only|clip officiel|(?:vidéo|video|audio) officiel(?:le)?|video oficial|offizielles (?:musikvideo|video))\b/g, '')
    .replace(/\s+/g, ' ').trim()
  if (title.startsWith(`${artist} `)) title = title.slice(artist.length).trim()
  const reasons: string[] = []
  // Video titles often lead with the artist ("Queen - Who Wants to Live Forever"); that is not a version suffix.
  const escapedArtist = expected.artist.trim().replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
  const sourceTitle = escapedArtist ? source.title.replace(new RegExp(`^\\s*${escapedArtist}\\s*[-–—:]\\s*`, 'i'), '') : source.title
  if (recordingVariantSignature(expected.title, expected.albumTitle) !== recordingVariantSignature(sourceTitle, source.albumTitle ?? undefined)) reasons.push('Recording variant differs')
  let rank = 0
  if (title === recordingText(expected.title)) rank += 4
  else reasons.push('Title or recording version differs')
  if (artist && actualArtists.includes(artist)) rank += 3
  else reasons.push('Artist identity needs checking')
  if (expected.duration != null && source.duration != null && Math.abs(expected.duration - source.duration) <= Math.min(8, Math.max(3, expected.duration * .03))) rank += 2
  else reasons.push('Duration is unknown or differs')
  return { strong: reasons.length === 0, reasons, rank }
}
export function rankMusicSources(expected: { title: string; artist: string; duration: number | null; albumTitle?: string }, sources: SpotifyAudioCandidate[]) {
  return sources.map((source) => ({ ...source, assessment: assessMusicSource(expected, { ...source, artist: source.artist ?? null, albumTitle: source.album ?? null }) }))
    .sort((a, b) => b.assessment.rank - a.assessment.rank)
}
