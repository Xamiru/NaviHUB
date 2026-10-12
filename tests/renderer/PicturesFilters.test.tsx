import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, expect, it, vi } from 'vitest'
import PicturesPage from '../../src/renderer/src/pages/PicturesPage'

const { gallery, setSlideshowSource, addFromPaths } = vi.hoisted(() => ({
  gallery: vi.fn(),
  setSlideshowSource: vi.fn(),
  addFromPaths: vi.fn()
}))
vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    pictures: {
      gallery: (...args: unknown[]) => gallery(...args),
      tags: async () => [],
      albums: async () => [{ id: 3, name: 'Desktop rotation' }],
      slideshowSource: async () => 'manual',
      setSlideshowSource: (...args: unknown[]) => setSlideshowSource(...args),
      openSlideshowFolder: vi.fn(),
      pathForFile: (file: File) => `/drop/${file.name}`,
      addFromPaths: (...args: unknown[]) => addFromPaths(...args)
    }
  }
}))
vi.mock('../../src/renderer/src/components/pictures/PictureBrowser', () => ({
  default: ({ images }: { images: unknown[] }) => <p>{images.length} pictures shown</p>
}))
vi.mock('../../src/renderer/src/components/UniversalPicker', () => ({ default: () => null }))

beforeEach(() => {
  vi.clearAllMocks()
  gallery.mockResolvedValue([{ id: 1 }])
  setSlideshowSource.mockResolvedValue({ added: 2, removed: 0, failed: 0 })
  addFromPaths.mockResolvedValue({ added: [{ id: 9 }], skipped: 0 })
})

function renderPage(): void {
  render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <MemoryRouter>
        <PicturesPage />
      </MemoryRouter>
    </QueryClientProvider>
  )
}

it('filters with pills and switches the slideshow mirror from one menu', async () => {
  const user = userEvent.setup()
  render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <MemoryRouter>
        <PicturesPage />
      </MemoryRouter>
    </QueryClientProvider>
  )
  expect(await screen.findByText('1 pictures shown')).toBeInTheDocument()
  await user.click(within(screen.getByRole('group', { name: 'Shape' })).getByRole('button', { name: 'Portrait' }))
  await waitFor(() => expect(gallery).toHaveBeenLastCalledWith(expect.objectContaining({ orientation: 'portrait' })))
  expect(screen.getByRole('button', { name: 'Clear filters' })).toBeInTheDocument()
  // Picking the active shape again clears it.
  await user.click(within(screen.getByRole('group', { name: 'Shape' })).getByRole('button', { name: 'Portrait' }))
  await waitFor(() => expect(gallery).toHaveBeenLastCalledWith(expect.objectContaining({ orientation: null })))

  await user.click(screen.getByRole('button', { name: 'Slideshow' }))
  expect(screen.getByRole('menuitem', { name: '✓ Mirror manual picks' })).toBeInTheDocument()
  await user.click(screen.getByRole('menuitem', { name: 'Mirror album: Desktop rotation' }))
  expect(setSlideshowSource).toHaveBeenCalledWith('album:3')
})

it('filters by resolution and search, and sorts largest first', async () => {
  const user = userEvent.setup()
  renderPage()
  expect(await screen.findByRole('heading', { name: 'Gallery' })).toBeInTheDocument()
  await user.click(within(screen.getByRole('group', { name: 'Resolution' })).getByRole('button', { name: '4K+' }))
  await waitFor(() => expect(gallery).toHaveBeenLastCalledWith(expect.objectContaining({ resolution: 'uhd' })))
  await user.type(screen.getByRole('searchbox', { name: 'Search pictures' }), ' neon city ')
  await waitFor(() =>
    expect(gallery).toHaveBeenLastCalledWith(expect.objectContaining({ search: 'neon city', resolution: 'uhd' }))
  )
  await user.selectOptions(screen.getByRole('combobox', { name: 'Sort' }), 'largest')
  await waitFor(() => expect(gallery).toHaveBeenLastCalledWith(expect.objectContaining({ sort: 'largest' })))
})

it('adds dropped files to Unsorted as wallpapers by default', async () => {
  renderPage()
  expect(await screen.findByText('1 pictures shown')).toBeInTheDocument()
  const file = new File(['x'], 'wall.png', { type: 'image/png' })
  fireEvent.drop(screen.getByRole('heading', { name: 'Gallery' }), {
    dataTransfer: { types: ['Files'], files: [file] }
  })
  await waitFor(() => expect(addFromPaths).toHaveBeenCalledWith(null, 'wallpaper', ['/drop/wall.png']))
})
