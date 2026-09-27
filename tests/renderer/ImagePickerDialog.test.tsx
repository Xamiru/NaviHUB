import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ComponentProps } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ImagePickerDialog from '@/components/ImagePickerDialog'
import { api } from '@/lib/api'
import { expectNoAxeViolations } from './accessibility'

vi.mock('@/lib/api', () => ({
  api: {
    images: {
      overrideState: vi.fn(),
      revert: vi.fn(),
      fromUrl: vi.fn(),
      fromArt: vi.fn()
    },
    pictures: { list: vi.fn() },
    files: { pickImage: vi.fn() }
  }
}))

function renderPicker(overrides: Partial<ComponentProps<typeof ImagePickerDialog>> = {}) {
  const props = {
    title: 'Change cover',
    subject: 'Serial Experiments Lain',
    currentPath: 'media/dl-cover.jpg',
    override: { kind: 'media' as const, id: 7 },
    artMediaId: 7,
    onPick: vi.fn(),
    onReverted: vi.fn(),
    onClose: vi.fn(),
    ...overrides
  }
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  const view = render(
    <QueryClientProvider client={client}>
      <ImagePickerDialog {...props} />
    </QueryClientProvider>
  )
  return { ...props, container: view.container }
}

beforeEach(() => {
  vi.mocked(api.images.overrideState).mockResolvedValue({ manual: false, providerPath: null })
  vi.mocked(api.pictures.list).mockResolvedValue([])
})
afterEach(() => vi.clearAllMocks())

describe('ImagePickerDialog', () => {
  it('saves a pasted URL as the new image and closes', async () => {
    const user = userEvent.setup()
    vi.mocked(api.images.fromUrl).mockResolvedValue('media/dl-picked.jpg')
    const { onPick, onClose, container } = renderPicker()

    expect(screen.getByRole('dialog', { name: 'Change cover' })).toBeTruthy()
    await expectNoAxeViolations(container)
    await user.type(screen.getByRole('textbox', { name: 'Image URL' }), 'https://example.com/a.jpg')
    await user.click(screen.getByRole('button', { name: 'Use URL' }))

    await waitFor(() => expect(onPick).toHaveBeenCalledWith('media/dl-picked.jpg'))
    expect(api.images.fromUrl).toHaveBeenCalledWith('https://example.com/a.jpg')
    expect(onClose).toHaveBeenCalled()
  })

  it('does nothing when the file picker is cancelled', async () => {
    const user = userEvent.setup()
    vi.mocked(api.files.pickImage).mockResolvedValue(null)
    const { onPick, onClose } = renderPicker()

    await user.click(screen.getByRole('button', { name: 'Choose file…' }))

    await waitFor(() => expect(api.files.pickImage).toHaveBeenCalled())
    expect(onPick).not.toHaveBeenCalled()
    expect(onClose).not.toHaveBeenCalled()
  })

  it('offers the Art-tab images as sources', async () => {
    const user = userEvent.setup()
    vi.mocked(api.pictures.list).mockImplementation(async (_mediaId, kind) =>
      kind === 'wallpaper'
        ? [
            {
              id: 3,
              mediaId: 7,
              kind: 'wallpaper',
              filePath: 'pictures/Lain (anime)/wallpapers/a.jpg',
              sourceUrl: null,
              source: 'file',
              width: null,
              height: null,
              isBackground: false,
              inSlideshow: false
            }
          ]
        : []
    )
    vi.mocked(api.images.fromArt).mockResolvedValue('media/lc-art.jpg')
    const { onPick } = renderPicker()

    await user.click(await screen.findByRole('button', { name: 'Use Art-tab image 1' }))

    await waitFor(() => expect(onPick).toHaveBeenCalledWith('media/lc-art.jpg'))
    expect(api.images.fromArt).toHaveBeenCalledWith(3)
  })

  it('restores the imported image only when a manual pick is held', async () => {
    const user = userEvent.setup()
    vi.mocked(api.images.overrideState).mockResolvedValue({
      manual: true,
      providerPath: 'media/dl-cover.jpg'
    })
    vi.mocked(api.images.revert).mockResolvedValue('media/dl-cover.jpg')
    const { onReverted } = renderPicker()

    expect(await screen.findByText('Your pick. Re-imports keep it.')).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Restore imported image' }))

    await waitFor(() => expect(onReverted).toHaveBeenCalledWith('media/dl-cover.jpg'))
    expect(api.images.revert).toHaveBeenCalledWith('media', 7)
  })

  it('hides restore for an entity without an override', () => {
    renderPicker({ override: undefined })
    expect(screen.queryByRole('button', { name: 'Restore imported image' })).toBeNull()
    expect(api.images.overrideState).not.toHaveBeenCalled()
  })
})
