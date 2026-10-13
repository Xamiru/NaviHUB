import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { VideoSource } from '../../src/shared/types'
import VideoPlayerPage from '../../src/renderer/src/pages/VideoPlayerPage'
import { expectNoAxeViolations } from './accessibility'

const m = vi.hoisted(() => ({
  source: vi.fn(),
  openExternal: vi.fn(),
  markProgress: vi.fn(),
  markWatched: vi.fn(),
  claimMediaSession: vi.fn(),
  toggleMusic: vi.fn(),
  musicPlaying: false,
  jassubOptions: vi.fn(),
  setStyle: vi.fn(),
  destroy: vi.fn()
}))

vi.mock('jassub', () => ({
  default: class {
    ready = Promise.resolve()
    timeOffset = 0
    renderer = {
      getStyles: async () => [
        { Name: 'Default', FontSize: 40, Outline: 2, Shadow: 1, MarginV: 20 },
        { Name: 'Sign', FontSize: 30, Outline: 1, Shadow: 0, MarginV: 10 }
      ],
      setStyle: async (...a: unknown[]) => m.setStyle(...a)
    }
    constructor(options: unknown) {
      m.jassubOptions(options)
    }
    destroy = async () => m.destroy()
  }
}))
vi.mock('../../src/renderer/src/lib/jassubAssets', () => ({
  workerUrl: 'worker.js',
  wasmUrl: 'jassub.wasm',
  modernWasmUrl: 'jassub-modern.wasm'
}))
vi.mock('../../src/renderer/src/lib/subtitleFallbackFont', () => ({
  localCjkFamily: async () => 'yu gothic'
}))

vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    video: {
      source: (...a: unknown[]) => m.source(...a),
      openExternal: (...a: unknown[]) => m.openExternal(...a),
      markProgress: (...a: unknown[]) => m.markProgress(...a),
      markWatched: (...a: unknown[]) => m.markWatched(...a),
      subtitleTrack: vi.fn(async () => null),
      subtitleFonts: vi.fn(async () => ['navimg://videocache/fonts/k/2-Gothic.ttf']),
      clipAudio: vi.fn(async () => null)
    },
    files: { saveBytes: vi.fn() },
    japanese: {
      tokenize: vi.fn(async (text: string) =>
        text === '行こう'
          ? [{ surface: '行こう', base: '行く', reading: 'イコウ', pos: '動詞', wordLike: true }]
          : []
      ),
      minedFronts: vi.fn(async () => [])
    }
  }
}))

vi.mock('../../src/renderer/src/lib/player', () => ({
  usePlayerControls: () => ({
    isPlaying: m.musicPlaying,
    toggle: m.toggleMusic,
    claimMediaSession: m.claimMediaSession
  })
}))

vi.mock('../../src/renderer/src/components/reader/MiningPanel', () => ({
  default: () => <div role="region" aria-label="Mining panel" />
}))

function source(overrides: Partial<VideoSource> = {}): VideoSource {
  return {
    ref: { kind: 'file', fileId: 7 },
    title: 'Episode 3',
    seriesTitle: 'Frieren',
    mediaId: 12,
    mediaType: 'anime',
    backPath: null,
    url: 'navimg://video/Frieren/03.mkv',
    decode: { verdict: 'ok', reason: null },
    hasAudio: true,
    durationSeconds: 1440,
    resumeSeconds: null,
    watchedAt: null,
    audioTracks: [],
    subtitles: [],
    prev: null,
    next: null,
    ...overrides
  }
}

function renderAt(path = '/watch/file/7') {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/watch/:kind/:id" element={<VideoPlayerPage />} />
          <Route path="/anime/:id" element={<p>Anime detail</p>} />
          <Route path="/wrestling/clips" element={<p>Clip shelf</p>} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
}

beforeEach(() => {
  localStorage.clear()
  m.musicPlaying = false
  m.source.mockReset()
  m.openExternal.mockReset().mockResolvedValue(undefined)
  m.markProgress.mockReset().mockResolvedValue(undefined)
  m.markWatched.mockReset().mockResolvedValue(undefined)
  m.claimMediaSession.mockReset()
  m.jassubOptions.mockReset()
  m.setStyle.mockReset()
  m.destroy.mockReset()
  HTMLElement.prototype.requestFullscreen = vi.fn(async () => undefined)
  m.toggleMusic.mockReset()
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(function (this: HTMLMediaElement) {
    this.dispatchEvent(new Event('pause'))
  })
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(function (this: HTMLMediaElement) {
    this.dispatchEvent(new Event('play'))
    return Promise.resolve()
  })
})

describe('video player', () => {
  it('never mounts a <video> for an undecodable file and offers the system player', async () => {
    m.source.mockResolvedValue(
      source({ decode: { verdict: 'unsupported', reason: 'DTS audio cannot be decoded inside NaviHUB.' } })
    )
    const user = userEvent.setup()
    const { container } = renderAt()
    expect(
      await screen.findByRole('heading', { name: 'This file plays in the system player' })
    ).toBeInTheDocument()
    expect(screen.getByText('DTS audio cannot be decoded inside NaviHUB.')).toBeInTheDocument()
    expect(container.querySelector('video')).toBeNull()
    await user.click(screen.getByRole('button', { name: 'Open externally' }))
    expect(m.openExternal).toHaveBeenCalledWith({ kind: 'file', fileId: 7 })
    await expectNoAxeViolations(container)
  })

  it('plays a decodable file directly with named controls', async () => {
    m.source.mockResolvedValue(source())
    const { container } = renderAt()
    expect(await screen.findByRole('heading', { name: /Frieren · Episode 3/ })).toBeInTheDocument()
    expect(container.querySelector('video')).toHaveAttribute('src', 'navimg://video/Frieren/03.mkv')
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: 'Playback speed' })).toBeInTheDocument()
    expect(screen.getByRole('slider', { name: 'Volume' })).toBeInTheDocument()
    // axe would otherwise wait out a media preload jsdom can never finish.
    await expectNoAxeViolations(container, { preload: false })
  })

  it('toggles playback with Space, pauses music and claims the media keys', async () => {
    m.musicPlaying = true
    m.source.mockResolvedValue(source())
    const user = userEvent.setup()
    renderAt()
    await screen.findByRole('heading', { name: /Episode 3/ })
    await user.keyboard(' ')
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled()
    expect(m.toggleMusic).toHaveBeenCalled()
    expect(m.claimMediaSession).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Episode 3', artist: 'Frieren' })
    )
  })

  it('releases the media keys when the player leaves', async () => {
    m.source.mockResolvedValue(source())
    const { unmount } = renderAt()
    await screen.findByRole('heading', { name: /Episode 3/ })
    unmount()
    expect(m.claimMediaSession).toHaveBeenLastCalledWith(null)
  })

  it('swaps to the system-player panel when the picture never decodes', async () => {
    m.source.mockResolvedValue(source({ decode: { verdict: 'uncertain', reason: null } }))
    const { container } = renderAt()
    await screen.findByRole('heading', { name: /Episode 3/ })
    const video = container.querySelector('video')!
    // jsdom never decodes, so videoWidth stays 0: the HEVC-on-Linux symptom.
    Object.defineProperty(video, 'currentTime', { configurable: true, writable: true, value: 0 })
    act(() => {
      fireEvent(video, new Event('playing'))
    })
    video.currentTime = 2
    act(() => {
      fireEvent.timeUpdate(video)
    })
    expect(
      await screen.findByText('The picture could not be decoded inside NaviHUB.')
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open externally' })).toBeInTheDocument()
  })

  it('swaps to the system-player panel on a media error', async () => {
    m.source.mockResolvedValue(source())
    const { container } = renderAt()
    await screen.findByRole('heading', { name: /Episode 3/ })
    act(() => {
      fireEvent.error(container.querySelector('video')!)
    })
    expect(
      await screen.findByRole('heading', { name: 'This file plays in the system player' })
    ).toBeInTheDocument()
  })

  it('leaves for the owning page on Escape when the tab has no history', async () => {
    m.source.mockResolvedValue(source())
    const user = userEvent.setup()
    renderAt()
    await screen.findByRole('heading', { name: /Episode 3/ })
    await user.keyboard('{Escape}')
    expect(await screen.findByText('Anime detail')).toBeInTheDocument()
  })

  it('opens a wrestling clip and returns to the clip shelf', async () => {
    m.source.mockResolvedValue(
      source({
        ref: { kind: 'clip', clipId: 4 },
        title: 'Promo',
        seriesTitle: 'Wrestling clip',
        mediaId: null,
        mediaType: null,
        backPath: '/wrestling/clips'
      })
    )
    const user = userEvent.setup()
    renderAt('/watch/clip/4')
    await screen.findByRole('heading', { name: /Promo/ })
    expect(m.source).toHaveBeenCalledWith({ kind: 'clip', clipId: 4 })
    // Clips have no subtitles here, so the study controls stay out of the way.
    expect(screen.queryByRole('button', { name: /Transcript/ })).toBeNull()
    await user.click(screen.getByRole('button', { name: '← Back' }))
    expect(await screen.findByText('Clip shelf')).toBeInTheDocument()
  })

  it('shows the study range and its replay control', async () => {
    m.source.mockResolvedValue(source())
    renderAt('/watch/file/7?start=90&end=210')
    expect(await screen.findByText('Start 1:30, stop 3:30')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Replay range' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Loop' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('turns a subtitle word into a mining panel', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('1\n00:00:01,000 --> 00:00:04,000\n行こう\n'))
    )
    m.source.mockResolvedValue(
      source({
        subtitles: [
          {
            id: 'sidecar:abc',
            label: 'Japanese',
            lang: 'ja',
            format: 'srt',
            url: 'navimg://video/Frieren/03.ja.srt',
            signs: false,
            forced: false,
            textual: true
          }
        ]
      })
    )
    const user = userEvent.setup()
    const { container } = renderAt()
    await screen.findByRole('heading', { name: /Episode 3/ })
    const video = container.querySelector('video')!
    Object.defineProperty(video, 'currentTime', { configurable: true, writable: true, value: 2 })
    const word = await screen.findByRole('button', { name: '行こう' }, { timeout: 3000 })
    await user.pointer({ keys: '[MouseLeft]', target: word })
    expect(await screen.findByRole('region', { name: 'Mining panel' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Transcript/ })).toBeInTheDocument()
    vi.unstubAllGlobals()
  })

  it('ignores a single click on the picture and toggles fullscreen on a double-click', async () => {
    m.source.mockResolvedValue(source())
    const user = userEvent.setup()
    const { container } = renderAt()
    await screen.findByRole('heading', { name: /Episode 3/ })
    const picture = container.querySelector('video')!.parentElement!
    const play = vi.mocked(HTMLMediaElement.prototype.play)
    const pause = vi.mocked(HTMLMediaElement.prototype.pause)
    play.mockClear()
    pause.mockClear()
    await user.click(picture)
    expect(play).not.toHaveBeenCalled()
    expect(pause).not.toHaveBeenCalled()
    await user.dblClick(picture)
    expect(HTMLElement.prototype.requestFullscreen).toHaveBeenCalledTimes(1)
    expect(play).not.toHaveBeenCalled()
  })

  it('reveals the bars for keyboard focus only, so a mouse click cannot pin them', async () => {
    m.source.mockResolvedValue(source())
    renderAt()
    await screen.findByRole('heading', { name: /Episode 3/ })
    const bottom = screen.getByRole('button', { name: 'Play' }).closest('.media-contrast')!
    const top = screen.getByRole('heading', { name: /Episode 3/ }).parentElement!
    for (const bar of [bottom, top]) {
      expect(bar.className).not.toMatch(/focus-within:opacity-100/)
      expect(bar.className).toMatch(/has-\[:focus-visible\]:opacity-100/)
    }
  })

  it('lets a click anywhere on the timeline seek, not only a thumb drag', async () => {
    m.source.mockResolvedValue(source())
    renderAt()
    await screen.findByRole('heading', { name: /Episode 3/ })
    // range-thumb alone disables pointer events on the track (the two-thumb
    // RangeSlider needs that); timeline-range turns them back on.
    expect(screen.getByRole('slider', { name: 'Position' })).toHaveClass('range-thumb', 'timeline-range')
  })

  it('edits and saves the subtitle style from the Style panel', async () => {
    m.source.mockResolvedValue(source())
    const user = userEvent.setup()
    const { container } = renderAt()
    await screen.findByRole('heading', { name: /Episode 3/ })
    await user.click(screen.getByRole('button', { name: 'Style' }))
    const panel = screen.getByRole('region', { name: 'Subtitle style' })
    expect(screen.getByRole('slider', { name: /Size: 100%/ })).toBeInTheDocument()
    expect(screen.getByRole('slider', { name: /Height above the bottom: 5%/ })).toBeInTheDocument()
    await user.selectOptions(screen.getByRole('combobox', { name: 'Colour' }), 'yellow')
    await user.selectOptions(screen.getByRole('combobox', { name: 'Background' }), 'box')
    expect(screen.getByRole('slider', { name: /Box opacity/ })).toBeInTheDocument()
    fireEvent.change(screen.getByRole('slider', { name: /Size/ }), { target: { value: '1.4' } })
    const saved = JSON.parse(localStorage.getItem('video.playerPrefs') ?? '{}')
    expect(saved).toMatchObject({ color: 'yellow', background: 'box', scale: 1.4 })
    expect(panel.querySelector('.sub-ink-yellow.sub-box')).not.toBeNull()
    await expectNoAxeViolations(container, { preload: false })
  })

  it('migrates the first player\'s subtitle prefs', async () => {
    localStorage.setItem('video.playerPrefs', JSON.stringify({ subFontScale: 1.3, subBackdrop: true }))
    m.source.mockResolvedValue(source())
    const user = userEvent.setup()
    renderAt()
    await screen.findByRole('heading', { name: /Episode 3/ })
    await user.click(screen.getByRole('button', { name: 'Style' }))
    expect(screen.getByRole('slider', { name: /Size: 130%/ })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: 'Background' })).toHaveValue('box')
  })

  it('draws an ASS track with libass while playing and hands the line back on pause', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(
        async () =>
          new Response(
            '[Script Info]\nScriptType: v4.00+\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\nDialogue: 0,0:00:01.00,0:00:06.00,Default,,0,0,0,,行こう\nDialogue: 0,0:00:01.00,0:00:06.00,Sign,,0,0,0,,CAFE\n'
          )
      )
    )
    m.source.mockResolvedValue(
      source({
        subtitles: [
          {
            id: 'sidecar:ass',
            label: 'Japanese',
            lang: 'ja',
            format: 'ass',
            url: 'navimg://video/Frieren/03.ja.ass',
            signs: false,
            forced: false,
            textual: true
          }
        ]
      })
    )
    renderAt()
    await screen.findByRole('heading', { name: /Episode 3/ })
    const canvas = await screen.findByTestId('styled-subtitles')
    await vi.waitFor(() => expect(m.jassubOptions).toHaveBeenCalled())
    expect(m.jassubOptions).toHaveBeenCalledWith(
      expect.objectContaining({
        // Dialogue-only is on by default, so libass gets the filtered script.
        subContent: expect.stringContaining('Dialogue: 0,0:00:01.00,0:00:06.00,Default,,0,0,0,,行こう'),
        fonts: ['navimg://videocache/fonts/k/2-Gothic.ttf'],
        defaultFont: 'yu gothic',
        queryFonts: 'local',
        workerUrl: 'worker.js'
      })
    )
    expect(m.jassubOptions.mock.calls[0][0].subContent).not.toContain('CAFE')
    const video = document.querySelector('video')!
    Object.defineProperty(video, 'currentTime', { configurable: true, writable: true, value: 2 })
    act(() => {
      fireEvent.play(video)
    })
    // Playing: libass draws, so the clickable primary line is not drawn twice.
    await vi.waitFor(() => expect(canvas).toHaveStyle({ visibility: 'visible' }))
    expect(screen.queryByRole('button', { name: '行こう' })).toBeNull()
    // Paused: the canvas hides and the clickable line returns for mining.
    act(() => {
      fireEvent.pause(video)
    })
    await vi.waitFor(() => expect(canvas).toHaveStyle({ visibility: 'hidden' }))
    expect(await screen.findByRole('button', { name: '行こう' }, { timeout: 3000 })).toBeInTheDocument()
    // Size scales dialogue styles only; the sign keeps its authored size.
    expect(m.setStyle).toHaveBeenCalledWith(expect.objectContaining({ Name: 'Sign', FontSize: 30 }), 1)
    vi.unstubAllGlobals()
  })

  it('never starts libass for an SRT track', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('1\n00:00:01,000 --> 00:00:04,000\nhi\n')))
    m.source.mockResolvedValue(
      source({
        subtitles: [
          {
            id: 'sidecar:srt',
            label: 'English',
            lang: 'en',
            format: 'srt',
            url: 'navimg://video/Frieren/03.en.srt',
            signs: false,
            forced: false,
            textual: true
          }
        ]
      })
    )
    renderAt()
    await screen.findByRole('heading', { name: /Episode 3/ })
    expect(screen.queryByTestId('styled-subtitles')).toBeNull()
    expect(m.jassubOptions).not.toHaveBeenCalled()
    vi.unstubAllGlobals()
  })

  it('rejects a malformed player link without calling main', async () => {
    renderAt('/watch/elsewhere/7')
    expect(await screen.findByText('This player link is not valid.')).toBeInTheDocument()
    expect(m.source).not.toHaveBeenCalled()
  })
})
