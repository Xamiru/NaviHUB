import { readFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'

const root = fileURLToPath(new URL('..', import.meta.url))
const read = (path: string): string => readFileSync(join(root, path), 'utf8')

describe('Sonic Archive product surface', () => {
  const library = ['src/renderer/src/pages/MusicLibraryPage.tsx', 'src/renderer/src/components/music/MusicLibraryTabs.tsx',
    'src/renderer/src/components/music/MusicBrowse.tsx', 'src/renderer/src/components/music/SpotifyImportDialog.tsx']
    .map(read).join('\n')
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
    expect(artist).toContain('<TrackList tracks={shown} />')
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
    expect(spotify).toContain('Select all')
    expect(spotify).toContain('Hide complete releases')
    expect(spotify).toContain('Save for later')
    // Starting is the primary action; saving for later is secondary.
    expect(spotify).toMatch(/btn-primary"[\s\S]{0,200}addToQueue\(true\)/)
    expect(playlist).toContain('className="btn-primary"')
    expect(playlist).toContain('Download missing (')
    expect(playlist).toContain('Add missing to Downloads without starting')
    expect(playlist).toContain('Use library copy')
    expect(playlist).toContain('Change library copy')
    expect(playlist).toContain('spotifyMatchPlaylistItem')
    expect(playlist).toContain('Live, remix, acoustic and other')
    expect(library).toContain('saves a snapshot that you can refresh later')
    expect(library).not.toContain('spotDL')
  })

  it('keeps deferred Spotify downloads in a dedicated persistent workspace', () => {
    expect(downloads).toContain('title="Downloads"')
    expect(downloads).toContain('Start all')
    expect(downloads).toContain("'Start'")
    expect(downloads).toContain('already in your library')
    expect(downloads).toContain('Clear completed')
    expect(downloads).toContain('spotifyQueueReorder')
    expect(downloads).toContain('Resume')
    // Manual source choice replaced the separate broader-matching toggles; drag handles cover reordering.
    expect(downloads).toContain('Choose audio')
    expect(downloads).not.toContain('Try broader match')
    expect(downloads).not.toContain("'Move up'")
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
