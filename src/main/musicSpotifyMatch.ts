// Pure Spotify-to-local recording matching: title/artist normalization, remaster
// equivalence and duration tolerance. The repo feeds it candidates from the DB.
import { baseRecordingTitle, recordingText, recordingVariantSignature } from '@shared/musicSourceMatch'
import type { LocalMatchCandidate, SpotdlSong } from './repos/musicSpotifyRepo'

export function normalizeSpotifyMatch(value: string): string {
  return value
    .normalize('NFKC')
    .toLocaleLowerCase()
    .replace(/[\p{P}\p{S}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function normalizeSpotifyRecordingTitle(value: string): string {
  return recordingText(value)
}

function isRemastered(value: string): boolean {
  return /\bre ?master(?:ed)?\b/.test(normalizeSpotifyMatch(value))
}

function preferredRemasterMatch(
  song: Pick<SpotdlSong, 'title' | 'albumTitle'>,
  matches: LocalMatchCandidate[]
): number | null {
  if (!matches.length) return null
  // Different live/acoustic/etc. releases still need the album tie-break.
  if (recordingVariantSignature(song.title, song.albumTitle)) return null
  if (!isRemastered(`${song.title} ${song.albumTitle}`) &&
      !matches.some((track) => isRemastered(`${track.title} ${track.albumTitle}`))) return null
  // Identity and duration have already been checked by the caller. Reuse the
  // oldest local copy regardless of which release a playlist happens to name.
  return Math.min(...matches.map((track) => track.id))
}

export function singleRecordingDownloads<T>(
  rows: T[],
  read: (row: T) => Pick<SpotdlSong, 'title' | 'primaryArtist' | 'albumTitle' | 'duration'> & { manual: boolean }
): T[] {
  const groups = new Map<string, { duration: number; remaster: boolean }[]>()
  return rows.filter((row) => {
    const song = read(row)
    if (song.manual || song.duration == null) return true
    const variant = recordingVariantSignature(song.title, song.albumTitle)
    const key = [normalizeSpotifyRecordingTitle(song.title), normalizeSpotifyMatch(song.primaryArtist),
      variant, variant ? normalizeSpotifyRecordingTitle(song.albumTitle) : ''].join('\n')
    const remaster = isRemastered(`${song.title} ${song.albumTitle}`)
    const group = groups.get(key) ?? []
    const existing = group.find((candidate) =>
      (remaster || candidate.remaster) && Math.abs(candidate.duration - song.duration!) <= 3)
    if (existing) {
      existing.remaster ||= remaster
      return false
    }
    group.push({ duration: song.duration, remaster })
    groups.set(key, group)
    return true
  })
}

export function stripAlbumYearPrefix(value: string): string {
  return value
    .replace(/^\s*[([](?:19|20)\d{2}[)\]]\s*(?:[-–—:]\s*)?/, '')
    .replace(/^\s*(?:19|20)\d{2}\s*[-–—:]\s*/, '')
    .trim() || value.trim()
}

export function artistComponents(value: string): string[] {
  return value
    .split(/\s*(?:,|&|\/|;|\bfeat\.?\b|\bft\.?\b|\bwith\b|\bx\b)\s*/i)
    .map(normalizeSpotifyMatch)
    .filter(Boolean)
}

export function matchSpotifySong(
  song: Pick<SpotdlSong, 'title' | 'primaryArtist' | 'albumTitle' | 'duration'>,
  candidates: LocalMatchCandidate[]
): number | null {
  if (song.duration == null) return null
  let matches = candidates.filter((candidate) => {
    if (candidate.duration == null || Math.abs(candidate.duration - song.duration!) > 3) return false
    return samePlaylistRecordingIdentity(song, candidate, true)
  })
  const preferred = preferredRemasterMatch(song, matches)
  if (preferred != null) return preferred
  matches = collapseEquivalentLocalTracks(matches)
  // Within three seconds, same title, artist and version is one recording on
  // several releases or duplicate rips: reuse the best local copy.
  return bestLocalCopy(song, matches)?.id ?? null
}

/** Album match first, then the closest duration, then the oldest library row. */
function bestLocalCopy(
  song: Pick<SpotdlSong, 'albumTitle' | 'duration'>,
  matches: LocalMatchCandidate[]
): LocalMatchCandidate | null {
  const album = sameAlbumKey(song.albumTitle)
  return [...matches].sort((a, b) =>
    Number(sameAlbumKey(b.albumTitle) === album) - Number(sameAlbumKey(a.albumTitle) === album) ||
    Math.abs((a.duration ?? Infinity) - (song.duration ?? 0)) - Math.abs((b.duration ?? Infinity) - (song.duration ?? 0)) ||
    a.id - b.id
  )[0] ?? null
}

function sameAlbumKey(value: string): string {
  return normalizeSpotifyRecordingTitle(stripAlbumYearPrefix(value))
}

function spotifyArtistMatches(primaryArtist: string, candidate: LocalMatchCandidate): boolean {
  const artist = normalizeSpotifyMatch(primaryArtist)
  // Folders can hold a joined credit too ("Philip Bailey, Phil Collins").
  return new Set([
    normalizeSpotifyMatch(candidate.folderArtist),
    ...artistComponents(candidate.folderArtist),
    ...artistComponents(candidate.tagArtist ?? '')
  ]).has(artist)
}

/**
 * Same recording identity. A subtitle present on only one side ("2 + 2 = 5 (The
 * Lukewarm.)") is accepted only with `allowSubtitle`, which callers pair with the
 * same album and the strict three-second duration check.
 */
export function samePlaylistRecordingIdentity(
  song: Pick<SpotdlSong, 'title' | 'primaryArtist' | 'albumTitle'>,
  candidate: LocalMatchCandidate,
  allowSubtitle = false
): boolean {
  const sameTitle = normalizeSpotifyRecordingTitle(candidate.title) === normalizeSpotifyRecordingTitle(song.title) ||
    (allowSubtitle && baseRecordingTitle(candidate.title) === baseRecordingTitle(song.title) &&
      sameAlbumKey(candidate.albumTitle) === sameAlbumKey(song.albumTitle))
  return sameTitle &&
    spotifyArtistMatches(song.primaryArtist, candidate) &&
    recordingVariantSignature(candidate.title, candidate.albumTitle) ===
      recordingVariantSignature(song.title, song.albumTitle)
}

export function compatibleSpotifyDurationTolerance(duration: number): number {
  return Math.max(3, Math.min(8, duration * 0.03))
}

/** Keep one stable representative when the scanner contains byte-distinct files
 * with the same recording metadata. The oldest row wins, which normally keeps
 * the user's original file ahead of later downloader-created copies. */
export function collapseEquivalentLocalTracks(
  candidates: LocalMatchCandidate[]
): LocalMatchCandidate[] {
  const seen = new Set<string>()
  return [...candidates].sort((a, b) => a.id - b.id).filter((candidate) => {
    const artists = [
      normalizeSpotifyMatch(candidate.folderArtist),
      ...artistComponents(candidate.tagArtist ?? '')
    ].sort().join('|')
    const duration = candidate.duration == null ? '?' : String(Math.round(candidate.duration))
    const key = [
      normalizeSpotifyRecordingTitle(candidate.title),
      artists,
      normalizeSpotifyRecordingTitle(candidate.albumTitle),
      recordingVariantSignature(candidate.title, candidate.albumTitle),
      duration
    ].join('\n')
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

/** Shared conservative second tier for the same recording on another release. */
export function matchSpotifyPlaylistSong(
  song: Pick<SpotdlSong, 'title' | 'primaryArtist' | 'albumTitle' | 'duration'>,
  candidates: LocalMatchCandidate[]
): number | null {
  const strict = matchSpotifySong(song, candidates)
  const identityCandidates = candidates.filter((candidate) =>
    samePlaylistRecordingIdentity(song, candidate)
  )
  if (strict != null || song.duration == null) return strict
  const tolerance = compatibleSpotifyDurationTolerance(song.duration)
  let matches = collapseEquivalentLocalTracks(identityCandidates.filter((candidate) =>
    candidate.duration != null &&
    Math.abs(candidate.duration - song.duration!) <= tolerance
  ))
  const preferred = preferredRemasterMatch(song, matches)
  if (preferred != null) return preferred
  if (matches.length === 1) return matches[0].id
  if (matches.length > 1) {
    const album = normalizeSpotifyRecordingTitle(song.albumTitle)
    matches = collapseEquivalentLocalTracks(matches.filter(
      (candidate) => normalizeSpotifyRecordingTitle(candidate.albumTitle) === album
    ))
    if (matches.length === 1) return matches[0].id
  }
  return null
}

/** Conservative choices for the user's explicit "Use local version" action. */
export function spotifyPlaylistMatchAlternatives(
  song: Pick<SpotdlSong, 'title' | 'primaryArtist' | 'albumTitle' | 'duration'>,
  candidates: LocalMatchCandidate[]
): LocalMatchCandidate[] {
  const album = normalizeSpotifyRecordingTitle(song.albumTitle)
  return collapseEquivalentLocalTracks(candidates
    .filter((candidate) => {
      if (!samePlaylistRecordingIdentity(song, candidate, true)) return false
      if (song.duration == null || candidate.duration == null) return true
      return Math.abs(candidate.duration - song.duration) <= 15
    }))
    .sort((a, b) => {
      const aAlbum = normalizeSpotifyRecordingTitle(a.albumTitle) === album ? 0 : 1
      const bAlbum = normalizeSpotifyRecordingTitle(b.albumTitle) === album ? 0 : 1
      if (aAlbum !== bAlbum) return aAlbum - bAlbum
      const aDelta = song.duration == null || a.duration == null
        ? Number.POSITIVE_INFINITY
        : Math.abs(a.duration - song.duration)
      const bDelta = song.duration == null || b.duration == null
        ? Number.POSITIVE_INFINITY
        : Math.abs(b.duration - song.duration)
      return aDelta - bDelta || a.id - b.id
    })
}
