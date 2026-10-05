import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { expect, it, vi } from 'vitest'
import { useLogProgress } from '../../src/renderer/src/lib/logProgress'
import { ANIME } from '../../src/renderer/src/lib/mediaConfig'
import { qk } from '../../src/renderer/src/lib/queryKeys'
import type { MediaSummary } from '@shared/types'

const { logProgress, celebrateProgress, celebrateCompletion } = vi.hoisted(() => ({
  logProgress: vi.fn(),
  celebrateProgress: vi.fn(),
  celebrateCompletion: vi.fn()
}))
vi.mock('../../src/renderer/src/lib/api', () => ({
  api: { settings: { all: async () => ({}) }, media: { logProgress: (...a: unknown[]) => logProgress(...a) } }
}))
vi.mock('../../src/renderer/src/lib/themeFx', () => ({ celebrateProgress, celebrateCompletion }))

it('celebrates the finishing episode and refreshes search wherever a title is logged from', async () => {
  logProgress.mockResolvedValue({ title: 'Lain', status: ANIME.defaultStatuses[1], startedRewatch: false, rewatchCount: 0 })
  const client = new QueryClient()
  const invalidate = vi.spyOn(client, 'invalidateQueries')
  const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>
  const { result } = renderHook(() => useLogProgress(), { wrapper })
  await waitFor(() => expect(client.getQueryData(qk.settings.values)).toBeDefined())
  const lain = { id: 9, mediaType: 'anime', title: 'Lain', status: ANIME.defaultStatuses[0], progress: 12, totalUnits: 13, coverPath: null } as MediaSummary
  await result.current(lain)
  expect(celebrateProgress).toHaveBeenCalledWith(expect.anything(), { count: 13, total: 13 })
  expect(celebrateCompletion).toHaveBeenCalledWith('Lain', expect.objectContaining({ total: '13 / 13 ep' }))
  expect(invalidate).toHaveBeenCalledWith({ queryKey: qk.searchAll })
})
