import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ComponentProps } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { MusicSpotifyDownloadCandidate, MusicTrack, SpotifyAudioCandidate } from '@shared/types'
import SpotifyTrackRecoveryDialog from '@/components/SpotifyTrackRecoveryDialog'
import { api } from '@/lib/api'

const playQueue = vi.fn()

vi.mock('@/lib/api', () => ({
  api: {
    music: {
      spotifySearchAudio: vi.fn(),
      spotifyPreviewAudio: vi.fn(),
      spotifyPickLocalAudio: vi.fn(),
      spotifySetTrackDownloadOptions: vi.fn(),
      spotifyMatchPlaylistItem: vi.fn(),
      spotifyConfirmDownloadCandidate: vi.fn(),
      spotifyRejectDownloadCandidate: vi.fn(),
      search: vi.fn()
    },
    app: { openExternal: vi.fn() }
  }
}))

vi.mock('@/lib/player', () => ({ usePlayerControls: () => ({ playQueue }) }))
vi.mock('@/lib/musicTracks', () => ({ musicTrackToPlayerTrack: (track: MusicTrack) => ({ id: `music-${track.id}`, title: track.title }) }))
vi.mock('@/components/MusicTrackRow', () => ({ formatDuration: (seconds: number | null) => seconds == null ? 'Unknown' : `${seconds}s` }))

const track: MusicTrack = {
  id: 7, albumId: 2, albumTitle: 'Album', artistId: 3, artistName: 'Artist', tagArtist: null,
  filePath: 'Artist/Album/song.mp3', title: 'Song', trackNo: 1, discNo: 1, duration: 180,
  likedAt: null, playCount: 0, lastPlayedAt: null, coverPath: null
}

function candidate(): MusicSpotifyDownloadCandidate {
  return { localTrack: track, provider: 'youtube', sourceUrl: 'https://youtu.be/source' }
}

function renderDialog(overrides: Partial<ComponentProps<typeof SpotifyTrackRecoveryDialog>> = {}) {
  const onClose = vi.fn()
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  render(<QueryClientProvider client={client}><SpotifyTrackRecoveryDialog
    sourceKind="playlistItem" trackId={42} title="Song" artist="Artist" duration={180}
    onClose={onClose} {...overrides}
  /></QueryClientProvider>)
  return onClose
}

afterEach(() => { vi.clearAllMocks(); vi.restoreAllMocks() })

describe('SpotifyTrackRecoveryDialog', () => {
  it('closes after approval without waiting for background music refetches', async () => {
    const user = userEvent.setup()
    const refresh = vi.spyOn(QueryClient.prototype, 'invalidateQueries').mockImplementationOnce(() => new Promise(() => {}))
    const onClose = renderDialog({ initialUrl: 'https://youtu.be/abcdefghijk' })
    await user.click(screen.getByRole('button', { name: 'Use this version' }))
    expect(refresh).toHaveBeenCalledOnce()
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('immediately shows source checking, prevents repeat approval and keeps failures actionable', async () => {
    const user = userEvent.setup()
    let reject!: (error: Error) => void
    vi.mocked(api.music.spotifySetTrackDownloadOptions).mockImplementationOnce(() => new Promise((_resolve, fail) => { reject = fail }))
    const onClose = renderDialog({ initialUrl: 'https://youtu.be/abcdefghijk' })
    await user.click(screen.getByRole('button', { name: 'Use this version' }))
    expect(screen.getByRole('status')).toHaveTextContent('Checking source')
    expect(screen.getByRole('button', { name: 'Checking source…' })).toBeDisabled()
    expect(onClose).not.toHaveBeenCalled()
    await act(async () => reject(new Error('Selected source is unavailable')))
    expect(await screen.findByRole('alert')).toHaveTextContent('Selected source is unavailable')
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Use this version' })).toBeEnabled()
    expect(onClose).not.toHaveBeenCalled()
  })

  it('lets the user listen to a downloaded candidate before explicit confirmation', async () => {
    const user = userEvent.setup()
    const onClose = renderDialog({ candidate: candidate() })

    await user.click(screen.getByRole('button', { name: 'Listen to local file' }))
    expect(playQueue).toHaveBeenCalledOnce()
    expect(api.music.spotifyConfirmDownloadCandidate).not.toHaveBeenCalled()
    expect(onClose).not.toHaveBeenCalled()

    await user.click(screen.getByRole('button', { name: 'Confirm this recording' }))
    await waitFor(() => expect(api.music.spotifyConfirmDownloadCandidate).toHaveBeenCalledWith({ sourceKind: 'playlistItem', trackId: 42 }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('shows search results, previews one, and saves the selected source', async () => {
    const user = userEvent.setup()
    const result: SpotifyAudioCandidate = { url: 'https://youtube.com/watch?v=one', title: 'Song result', channel: 'Channel', duration: 181 }
    vi.mocked(api.music.spotifySearchAudio).mockResolvedValue([result])
    vi.mocked(api.music.spotifyPreviewAudio).mockResolvedValue('navimg://preview.mp3')
    const onClose = renderDialog()
    const refresh = vi.spyOn(QueryClient.prototype, 'invalidateQueries')

    await user.click(screen.getByRole('button', { name: 'Find audio' }))
    expect(await screen.findByText('Song result')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Listen' }))
    expect(api.music.spotifyPreviewAudio).toHaveBeenCalledWith(result.url)
    expect(playQueue).toHaveBeenCalledOnce()
    expect(onClose).not.toHaveBeenCalled()
    expect(refresh).not.toHaveBeenCalled()

    await user.click(screen.getAllByRole('button', { name: 'Use this version' })[0])
    await waitFor(() => expect(api.music.spotifySetTrackDownloadOptions).toHaveBeenCalledWith({
      sourceKind: 'playlistItem', trackId: 42, audioSourceUrl: result.url, approveSource: true, startNow: false
    }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it.each(['playlistItem', 'entityTrack'] as const)('supports local recording approval for %s', async (sourceKind) => {
    const user = userEvent.setup()
    vi.mocked(api.music.spotifyPickLocalAudio).mockResolvedValue(track)
    const onClose = renderDialog({ sourceKind })

    await user.click(screen.getByRole('button', { name: 'Choose a file to copy into the library' }))
    expect(await screen.findByText('This explicitly overrides automatic matching and is remembered across scans.')).toBeInTheDocument()
    expect(api.music.spotifyMatchPlaylistItem).not.toHaveBeenCalled()
    expect(onClose).not.toHaveBeenCalled()

    await user.click(screen.getByRole('button', { name: 'Confirm this local recording' }))
    await waitFor(() => expect(api.music.spotifyMatchPlaylistItem).toHaveBeenCalledWith({ sourceKind, itemId: 42, trackId: 7, confirm: true }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('collapses duplicate library files in manual search results', async () => {
    const user = userEvent.setup()
    vi.mocked(api.music.search).mockResolvedValue({
      tracks: [track, { ...track, id: 8, filePath: 'Artist/Album/copy.mp3' }],
      artists: [], albums: []
    })
    renderDialog()

    await user.type(screen.getByRole('textbox', { name: 'Search the whole local library' }), 'Song')
    await waitFor(() => expect(api.music.search).toHaveBeenCalled())
    expect(screen.getAllByRole('button', { name: 'Song · Artist · 180s' })).toHaveLength(1)
  })
  it('does not let a delayed remote preview replace a newer local preview', async () => {
    const user = userEvent.setup()
    vi.mocked(api.music.spotifySearchAudio).mockResolvedValue([{ url: 'https://youtu.be/abcdefghijk', title: 'Remote result', channel: 'Artist', duration: 180 }])
    let resolvePreview!: (value: string) => void
    vi.mocked(api.music.spotifyPreviewAudio).mockReturnValue(new Promise((resolve) => { resolvePreview = resolve }))
    renderDialog({ candidate: candidate() })
    await user.click(screen.getByRole('button', { name: 'Find audio' }))
    await screen.findByText('Remote result')
    await user.click(screen.getByRole('button', { name: 'Listen' }))
    await user.click(screen.getByRole('button', { name: 'Listen to local file' }))
    await act(async () => resolvePreview('https://example.com/temporary-audio'))
    expect(playQueue).toHaveBeenCalledTimes(1)
    expect(playQueue.mock.calls[0][0][0].id).toBe('music-7')
  })

})
