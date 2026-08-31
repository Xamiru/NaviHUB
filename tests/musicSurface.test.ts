import { readFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'

const root = fileURLToPath(new URL('..', import.meta.url))
const read = (path: string): string => readFileSync(join(root, path), 'utf8')

describe('Sonic Archive product surface', () => {
  const library = read('src/renderer/src/pages/MusicLibraryPage.tsx')
  const artist = read('src/renderer/src/pages/MusicArtistPage.tsx')
  const entityHeader = read('src/renderer/src/components/MusicEntityHeader.tsx')
  const playlist = read('src/renderer/src/pages/MusicPlaylistPage.tsx')
  const downloader = read('src/renderer/src/components/MusicDownloadDialog.tsx')
  const spotify = read('src/renderer/src/components/SpotifyEntityDownloadDialog.tsx')
  const downloads = read('src/renderer/src/pages/MusicDownloadsPage.tsx')
  const queryKeys = read('src/renderer/src/lib/queryKeys.ts')

  it('makes the personal lead and archive browsing actionable', () => {
    expect(library).toContain('Pick up where you left off')
    expect(library).toContain('Start listening')
    expect(library).toContain('Recently played')
    expect(library).toContain('Most played')
    expect(library).toContain('Unplayed')
    expect(library).toContain('Missing covers')
    expect(library).not.toContain('.slice(0, 6)')
  })

  it('shows an artist catalog instead of hiding it behind Play', () => {
    expect(artist).toContain('qk.music.artistTracks(artistId)')
    expect(artist).toContain('title="All tracks"')
    expect(artist).toContain('<TrackList tracks={tracks} />')
  })

  it('separates listening, adding music, and maintenance', () => {
    expect(entityHeader).toContain('label="Add music"')
    expect(entityHeader).toContain('label="Library maintenance"')
    expect(library).toContain("label: 'Save audio from a link…'")
    expect(artist).toContain("label: 'Complete from Spotify…'")
  })

  it('keeps playlist editing and acquisition states discoverable', () => {
    expect(playlist).toContain('Rename')
    expect(playlist).toContain('Searching tracks…')
    expect(playlist).toContain('No available tracks match')
    expect(spotify).toContain('Choose the matching catalogue entry')
    expect(spotify).toContain('Select albums and singles')
    expect(spotify).toContain('reopening is instant')
    expect(spotify).toContain('Missing releases only')
    expect(spotify).toContain('Add to queue')
    expect(playlist).toContain('className="btn-primary"')
    expect(playlist).toContain('Add missing (')
    expect(playlist).toContain('Download missing now')
  })

  it('keeps deferred Spotify downloads in a dedicated persistent workspace', () => {
    expect(downloads).toContain('title="Spotify download queue"')
    expect(downloads).toContain('Start all')
    expect(downloads).toContain('Start this')
    expect(downloads).toContain('Clear completed')
    expect(downloads).toContain('spotifyQueueReorder')
    expect(downloads).toContain('Resume')
  })

  it('uses semantic progress and an SVG download indicator', () => {
    expect(library).toContain('aria-label="Music library scan progress"')
    expect(playlist).toContain('aria-label="Missing-track download progress"')
    expect(downloader).toContain('aria-label="Audio download progress"')
    expect(downloader).toContain('<DownloadIcon')
    expect(downloader).not.toContain('⬇')
  })

  it('keys recent-track caches by their requested limit', () => {
    expect(queryKeys).toContain("recent: (limit: number) => ['music', 'recent', limit] as const")
  })
})
