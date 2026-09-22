import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { useReaderSource } from '../../src/renderer/src/lib/readerSource'

const { pages, chapters } = vi.hoisted(() => ({ pages: vi.fn(), chapters: vi.fn() }))

vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    manga: {
      pages: (...args: unknown[]) => pages(...args),
      adhocPages: (...args: unknown[]) => pages(...args),
      chapters: (...args: unknown[]) => chapters(...args)
    }
  }
}))

function wrapper({ children }: { children: ReactNode }): JSX.Element {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return (
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={['/manga/4/read/9']}>
        <Routes>
          <Route path="/manga/:id/read/:chapterId" element={children} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
}

describe('useReaderSource', () => {
  it('keeps a failed page read distinct from a successful missing chapter and retries it', async () => {
    pages.mockRejectedValueOnce(new Error('disk unavailable')).mockResolvedValue({
      chapter: { id: 9 },
      pages: ['navimg://manga/page-1.jpg'],
      toc: null
    })
    chapters.mockResolvedValue({ localDir: 'Series', chapters: [] })
    const { result } = renderHook(() => useReaderSource(), { wrapper })

    await waitFor(() => expect(result.current.error).toBeInstanceOf(Error))
    expect(result.current.missing).toBe(false)

    await act(() => result.current.retry())
    await waitFor(() => expect(result.current.error).toBeNull())
    expect(result.current.doc).toEqual(
      expect.objectContaining({ pages: ['navimg://manga/page-1.jpg'] })
    )
  })
})
