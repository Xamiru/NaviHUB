import { act, fireEvent, render } from '@testing-library/react'
import { beforeEach, expect, it, vi } from 'vitest'
import { AudioPlayerProvider, usePlayerControls, type Track } from '@/lib/player'
import { api } from '@/lib/api'

vi.mock('@/lib/api', () => ({ api: {
  files: { resolveUrl: vi.fn() },
  player: { publishState: vi.fn(), onCommand: () => () => {} }
} }))

let player: ReturnType<typeof usePlayerControls>
function Controls() {
  player = usePlayerControls()
  return null
}
function mount() {
  return render(<AudioPlayerProvider><Controls /></AudioPlayerProvider>).container.querySelector('audio')!
}
const song = (id: string): Track => ({ id, title: id, src: `https://example.com/${id}.mp3` })

beforeEach(() => {
  localStorage.clear()
  vi.mocked(api.files.resolveUrl).mockReset()
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(function (this: HTMLMediaElement) {
    this.dispatchEvent(new Event('pause'))
  })
  vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {})
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(function (this: HTMLMediaElement) {
    this.dispatchEvent(new Event('play'))
    return Promise.resolve()
  })
})

it('stops previous audio while resolving a new track and remains stopped when it is missing', async () => {
  const audio = mount()
  await act(async () => player.playQueue([song('a')], 0))
  expect(player.isPlaying).toBe(true)
  let resolve!: (value: string | null) => void
  vi.mocked(api.files.resolveUrl).mockReturnValue(new Promise((done) => { resolve = done }))
  act(() => player.playQueue([{ id: 'missing', title: 'Missing', audioPath: 'music/missing.mp3' }], 0))
  expect(audio).not.toHaveAttribute('src')
  expect(player.isPlaying).toBe(false)
  expect(player.track?.id).toBe('missing')
  await act(async () => resolve(null))
  expect(audio).not.toHaveAttribute('src')
  expect(player.isPlaying).toBe(false)
})

it('falls forward after a failed source lookup and ignores an older lookup completing late', async () => {
  const audio = mount()
  vi.mocked(api.files.resolveUrl).mockRejectedValueOnce(new Error('drive unavailable'))
  await act(async () => player.playQueue([
    { id: 'missing', title: 'Missing', audioPath: 'music/missing.mp3' }, song('b')
  ], 0))
  expect(player.track?.id).toBe('b')
  expect(audio.src).toContain('/b.mp3')
  let resolve!: (value: string | null) => void
  vi.mocked(api.files.resolveUrl).mockReturnValue(new Promise((done) => { resolve = done }))
  act(() => player.playQueue([{ id: 'slow', title: 'Slow', audioPath: 'music/slow.mp3' }], 0))
  await act(async () => player.playQueue([song('c')], 0))
  await act(async () => resolve('https://example.com/slow.mp3'))
  expect(audio.src).toContain('/c.mp3')
  expect(player.track?.id).toBe('c')
})

it('unshuffles to the same occurrence when a song appears twice', async () => {
  const audio = mount()
  const first = song('duplicate')
  const middle = song('middle')
  const second = song('duplicate')
  const last = song('last')
  await act(async () => player.playQueue([first, middle, second, last], 2))
  act(() => player.toggleShuffle())
  expect(player.queue[0]).toBe(second)
  act(() => player.toggleShuffle())
  expect(player.index).toBe(2)
  expect(player.queue[player.index]).toBe(second)
  await act(async () => fireEvent.ended(audio))
  expect(player.track).toBe(last)
})
