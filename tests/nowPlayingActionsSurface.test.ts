import { readFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'

const root = fileURLToPath(new URL('..', import.meta.url))
const bar = readFileSync(join(root, 'src/renderer/src/components/NowPlayingBar.tsx'), 'utf8')
const playlistButton = readFileSync(
  join(root, 'src/renderer/src/components/MusicPlaylistButton.tsx'),
  'utf8'
)
const page = readFileSync(join(root, 'src/renderer/src/pages/NowPlayingPage.tsx'), 'utf8')

describe('Now Playing source actions', () => {
  it('gives local music like and playlist actions', () => {
    expect(bar).toContain('musicIdOf(track.id)')
    expect(bar).toContain('iconOnly={!prominent}')
    expect(bar).toContain('<MusicPlaylistButton trackId={trackId} prominent={prominent} />')
    expect(page).toContain('<NowPlayingTrackActions track={track} prominent />')
  })

  it('gives anime themes a favorite action without playlist controls', () => {
    expect(bar).toContain('themeIdOf(track.id)')
    expect(bar).toContain('<ThemeLikeButton')
    expect(bar).toContain('api.themes.favorite(themeId)')
    expect(bar).toContain("variant={prominent ? 'pill' : 'default'}")
  })

  it('supports existing playlists and creating a new one from the bar', () => {
    expect(playlistButton).toContain('api.music.playlistsForTrack(trackId)')
    expect(playlistButton).toContain('api.music.addPlaylistTracks(playlistId, [trackId])')
    expect(playlistButton).toContain('api.music.createPlaylist({ title })')
  })
})
