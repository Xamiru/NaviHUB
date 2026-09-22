import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ANIME } from '@/lib/mediaConfig'
import { SpotdlSettings, StatusEditor, TextSetting } from '@/pages/SettingsPage'
import { expectNoAxeViolations } from './accessibility'

const mocks = vi.hoisted(() => ({
  listPage: vi.fn(),
  spotifyDetect: vi.fn(),
  spotifyTestYouTubeAccess: vi.fn()
}))

vi.mock('@/lib/api', () => ({
  api: {
    media: { listPage: mocks.listPage },
    music: {
      spotifyDetect: mocks.spotifyDetect,
      spotifyTestYouTubeAccess: mocks.spotifyTestYouTubeAccess
    }
  }
}))

beforeEach(() => {
  vi.clearAllMocks()
  mocks.listPage.mockResolvedValue({ items: [], total: 0, offset: 0, hasMore: false })
  mocks.spotifyDetect.mockResolvedValue({ ok: true, metadataReady: true, version: '4.5.2' })
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
    render(<SpotdlSettings data={{}} onSave={onSave} />)

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
})
