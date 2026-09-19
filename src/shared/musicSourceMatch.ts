import type { MusicSourceEvidence, SpotifyAudioCandidate } from './types'

export function recordingText(value: string): string {
  const normalized = value.normalize('NFKC').toLowerCase().replace(/[\p{P}\p{S}]+/gu, ' ').replace(/\s+/g, ' ').trim()
  return value.normalize('NFKC').toLowerCase().replace(/[\p{P}\p{S}]+/gu, ' ')
    .replace(/\b(?:(?:19|20)\d{2} )?(?:digital(?:ly)? )?re ?master(?:ed)?(?: version)?(?: (?:in )?(?:19|20)\d{2})?(?: version)?\b/g, '')
    .replace(/\s+/g, ' ').trim() || normalized
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
  ['rerecorded', /\b(?:re recorded|rerecorded)\b/]
]

export function recordingVariantSignature(title: string, albumTitle = ''): string {
  const value = recordingText(`${title} ${albumTitle}`)
  return RECORDING_VARIANT_MARKERS
    .filter(([, pattern]) => pattern.test(value))
    .map(([key]) => key)
    .join('|')
}


export function assessMusicSource(expected: { title: string; artist: string; duration: number | null; albumTitle?: string }, source: Pick<MusicSourceEvidence, 'title' | 'artist' | 'channel' | 'duration' | 'albumTitle'>): { strong: boolean; reasons: string[]; rank: number } {
  const artist = recordingText(expected.artist)
  const channel = recordingText(source.channel).replace(/\b(topic|official|vevo)\b/g, '').trim()
  const actualArtist = source.artist ? recordingText(source.artist) : channel
  let title = recordingText(source.title).replace(/\b(?:official (?:audio|video|music video)|lyrics video|lyric video|audio only)\b/g, '').trim()
  if (title.startsWith(`${artist} `)) title = title.slice(artist.length).trim()
  const reasons: string[] = []
  if (recordingVariantSignature(expected.title, expected.albumTitle) !== recordingVariantSignature(source.title, source.albumTitle ?? undefined)) reasons.push('Recording variant differs')
  let rank = 0
  if (title === recordingText(expected.title)) rank += 4
  else reasons.push('Title or recording version differs')
  if (artist && actualArtist === artist) rank += 3
  else reasons.push('Artist identity needs checking')
  if (expected.duration != null && source.duration != null && Math.abs(expected.duration - source.duration) <= Math.min(8, Math.max(3, expected.duration * .03))) rank += 2
  else reasons.push('Duration is unknown or differs')
  return { strong: reasons.length === 0, reasons, rank }
}
export function rankMusicSources(expected: { title: string; artist: string; duration: number | null; albumTitle?: string }, sources: SpotifyAudioCandidate[]) {
  return sources.map((source) => ({ ...source, assessment: assessMusicSource(expected, { ...source, artist: null }) }))
    .sort((a, b) => b.assessment.rank - a.assessment.rank)
}
