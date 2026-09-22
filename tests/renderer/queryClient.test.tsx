import { focusManager, onlineManager, QueryObserver } from '@tanstack/react-query'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createAppQueryClient } from '../../src/renderer/src/lib/queryClient'

describe('application query recovery', () => {
  afterEach(() => {
    onlineManager.setOnline(true)
    focusManager.setFocused(undefined)
  })

  it('reads local IPC data even when Chromium reports the machine offline', async () => {
    onlineManager.setOnline(false)
    const client = createAppQueryClient()
    const queryFn = vi.fn().mockResolvedValue('library data')

    await expect(client.fetchQuery({ queryKey: ['local-library'], queryFn })).resolves.toBe(
      'library data'
    )
    expect(queryFn).toHaveBeenCalledOnce()
  })

  it('refetches a stale mounted query when the Electron window becomes visible again', async () => {
    const client = createAppQueryClient()
    client.mount()
    focusManager.setFocused(false)
    let value = 'before sleep'
    const queryFn = vi.fn(async () => value)
    const observer = new QueryObserver(client, {
      queryKey: ['resume-library'],
      queryFn,
      staleTime: 0
    })
    const unsubscribe = observer.subscribe(() => undefined)

    try {
      await vi.waitFor(() => expect(observer.getCurrentResult().data).toBe('before sleep'))
      value = 'after wake'
      focusManager.setFocused(true)

      await vi.waitFor(() => expect(observer.getCurrentResult().data).toBe('after wake'))
      expect(queryFn).toHaveBeenCalledTimes(2)
    } finally {
      unsubscribe()
      client.unmount()
    }
  })
})
