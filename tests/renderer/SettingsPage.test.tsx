import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ANIME } from '@/lib/mediaConfig'
import { StatusEditor } from '@/pages/settings/LibrarySettings'
import { MusicDownloadSettings } from '@/pages/settings/ToolSettings'
import { TextSetting } from '@/pages/settings/shared'
import { expectNoAxeViolations } from './accessibility'

const mocks = vi.hoisted(() => ({
  listPage: vi.fn(),
  spotifyDetect: vi.fn(),
  spotifyTestYouTubeAccess: vi.fn(),
  testKey: vi.fn(),
  chooseFolder: vi.fn(),
  folderStatus: vi.fn()
}))

vi.mock('@/lib/confirm', () => ({ confirmDialog: async () => true }))

vi.mock('@/lib/api', () => ({
  api: {
    media: { listPage: mocks.listPage },
    settings: { testKey: mocks.testKey },
    files: { chooseFolder: mocks.chooseFolder, folderStatus: mocks.folderStatus },
    music: {
      spotifyDetect: mocks.spotifyDetect,
      spotifyTestYouTubeAccess: mocks.spotifyTestYouTubeAccess
    }
  }
}))

beforeEach(() => {
  vi.clearAllMocks()
  mocks.listPage.mockResolvedValue({ items: [], total: 0, offset: 0, hasMore: false })
  mocks.spotifyDetect.mockResolvedValue({ ok: true, ytdlpVersion: '2026.08.19', ffmpeg: true, jsRuntime: 'Deno', coverArt: true, cookieConfigured: false, cookieValid: true, error: null })
  mocks.spotifyTestYouTubeAccess.mockResolvedValue({ ok: true, state: 'ready' })
})

describe('Settings editing', () => {
  it('keeps the meaningful status slots fixed and inserts custom statuses before Planned', async () => {
    const user = userEvent.setup()
    const onSave = vi.fn(async () => undefined)
    const { container } = render(<StatusEditor cfg={ANIME} data={{}} onSave={onSave} />)

    expect(await screen.findByText('Watching')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Remove Watching' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Move Completed up' })).not.toBeInTheDocument()

    await user.type(screen.getByRole('textbox', { name: 'New anime status name' }), 'Rewatching')
    await user.click(screen.getByRole('button', { name: 'Add status' }))
    await waitFor(() => expect(onSave).toHaveBeenCalledWith(
      'anime.statuses',
      JSON.stringify(['Watching', 'Completed', 'On Hold', 'Dropped', 'Rewatching', 'Plan to Watch'])
    ))
    await expectNoAxeViolations(container)
  })

  it('blocks removal of a status used by library titles', async () => {
    const user = userEvent.setup()
    const onSave = vi.fn(async () => undefined)
    mocks.listPage.mockResolvedValue({ items: [], total: 2, offset: 0, hasMore: false })
    render(<StatusEditor cfg={ANIME} data={{}} onSave={onSave} />)

    await user.click(await screen.findByRole('button', { name: 'Remove On Hold' }))
    expect(mocks.listPage).toHaveBeenCalledWith({
      filter: { mediaType: 'anime', status: 'On Hold' },
      offset: 0,
      limit: 24
    })
    expect(await screen.findByRole('alert')).toHaveTextContent('used by 2 titles')
    expect(onSave).not.toHaveBeenCalled()
  })

  it('preserves a folder draft when another setting refreshes', async () => {
    const user = userEvent.setup()
    const onSave = vi.fn(async () => undefined)
    const { rerender } = render(
      <TextSetting settingKey="manga.dir" data={{ 'manga.dir': '/old' }} onSave={onSave}
        title="Manga library folder" description="Library root" />
    )
    const input = screen.getByRole('textbox', { name: 'Manga library folder' })
    await user.clear(input)
    await user.type(input, '/draft')

    rerender(
      <TextSetting settingKey="manga.dir" data={{ 'manga.dir': '/old', 'score.max': '100' }}
        onSave={onSave} title="Manga library folder" description="Library root" />
    )
    expect(input).toHaveValue('/draft')
  })

  it('saves the visible cookies path before testing YouTube access', async () => {
    const user = userEvent.setup()
    const onSave = vi.fn(async () => undefined)
    render(<MusicDownloadSettings data={{}} onSave={onSave} />)

    await user.click(screen.getByRole('button', { name: 'Save & test' }))
    await screen.findByRole('button', { name: 'Save cookies & test YouTube access' })
    onSave.mockClear()

    await user.type(screen.getByRole('textbox', { name: 'YouTube cookies.txt (optional)' }), '/cookies.txt')
    await user.click(screen.getByRole('button', { name: 'Save cookies & test YouTube access' }))
    await waitFor(() => expect(mocks.spotifyTestYouTubeAccess).toHaveBeenCalledWith(true))
    expect(onSave).toHaveBeenCalledWith('spotdl.cookieFile', '/cookies.txt')
    expect(onSave.mock.invocationCallOrder[0]).toBeLessThan(
      mocks.spotifyTestYouTubeAccess.mock.invocationCallOrder[0]
    )
  })

  it('tests a saved key and shows the verdict without the key', async () => {
    const user = userEvent.setup()
    mocks.testKey.mockResolvedValue({ ok: false, message: 'TMDB rejected this key.' })
    const state = {
      available: true,
      backend: 'gnome_libsecret',
      protection: 'secure' as const,
      configured: { 'tmdb.api_key': true } as Record<string, boolean>,
      unreadable: []
    }
    render(
      <TextSetting
        settingKey="tmdb.api_key"
        data={{}}
        onSave={vi.fn(async () => undefined)}
        title="TMDB API key"
        type="password"
        secretStorage={state as never}
        description="d"
      />
    )
    await user.click(screen.getByRole('button', { name: 'Test' }))
    expect(mocks.testKey).toHaveBeenCalledWith('tmdb.api_key')
    expect(await screen.findByText('TMDB rejected this key.')).toHaveAttribute('role', 'status')
  })

  it('warns when a saved folder is missing and Browse saves the picked folder', async () => {
    const user = userEvent.setup()
    const onSave = vi.fn(async () => undefined)
    mocks.folderStatus.mockResolvedValue({ exists: false, isDirectory: false, writable: false })
    mocks.chooseFolder.mockResolvedValue('/mnt/new/Manga')
    render(
      <TextSetting folder settingKey="manga.dir" data={{ 'manga.dir': '/mnt/old/Manga' }}
        onSave={onSave} title="Manga library folder" description="d" />
    )
    expect(await screen.findByText(/Folder not found/)).toBeInTheDocument()
    expect(mocks.folderStatus).toHaveBeenCalledWith('/mnt/old/Manga')
    await user.click(screen.getByRole('button', { name: 'Browse…' }))
    expect(mocks.chooseFolder).toHaveBeenCalledWith('Choose the manga library folder', '/mnt/old/Manga')
    expect(onSave).toHaveBeenCalledWith('manga.dir', '/mnt/new/Manga')
  })

  it('resets a customised status list unless a dropped status is still used', async () => {
    const user = userEvent.setup()
    const onSave = vi.fn(async () => undefined)
    const custom = JSON.stringify(['Watching', 'Completed', 'On Hold', 'Dropped', 'Rewatching', 'Plan to Watch'])
    mocks.listPage.mockResolvedValue({ items: [], total: 3, offset: 0, hasMore: false })
    render(<StatusEditor cfg={ANIME} data={{ 'anime.statuses': custom }} onSave={onSave} />)

    await user.click(await screen.findByRole('button', { name: 'Reset to defaults' }))
    expect(await screen.findByRole('alert')).toHaveTextContent('“Rewatching” is used by 3 titles')
    expect(onSave).not.toHaveBeenCalled()

    mocks.listPage.mockResolvedValue({ items: [], total: 0, offset: 0, hasMore: false })
    await user.click(screen.getByRole('button', { name: 'Reset to defaults' }))
    await waitFor(() =>
      expect(onSave).toHaveBeenCalledWith('anime.statuses', JSON.stringify(ANIME.defaultStatuses))
    )
  })
})
