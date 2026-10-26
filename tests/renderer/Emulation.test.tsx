import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { ReactElement } from 'react'
import EmulatorsPage from '../../src/renderer/src/pages/EmulatorsPage'
import EmulatorConsolePage from '../../src/renderer/src/pages/EmulatorConsolePage'
import EmulatorToolsPage from '../../src/renderer/src/pages/EmulatorToolsPage'
import WaysToPlay, { defaultChoice } from '../../src/renderer/src/components/WaysToPlay'
import type { EmulatorInfo, GamePlayOptions, InstalledGame } from '../../src/shared/types'
import { expectNoAxeViolations } from './accessibility'

const mocks = vi.hoisted(() => ({
  list: vi.fn(),
  add: vi.fn(),
  update: vi.fn(),
  setDefault: vi.fn(),
  playOptions: vi.fn(),
  launch: vi.fn(),
  setPreferredRom: vi.fn(),
  updateRom: vi.fn(),
  kick: vi.fn(),
  romScanStatus: vi.fn(),
  romScanStart: vi.fn(),
  romScanAccept: vi.fn(),
  emulationStats: vi.fn(),
  mediaList: vi.fn(),
  mediaGet: vi.fn(),
  installed: vi.fn(),
  icon: vi.fn(),
  remove: vi.fn(),
  toast: vi.fn(),
  toastError: vi.fn(),
  openExternal: vi.fn()
}))

vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    emulators: {
      list: () => mocks.list(),
      add: (platform?: string) => mocks.add(platform),
      icon: (id: number) => mocks.icon(id),
      remove: (id: number) => mocks.remove(id),
      update: (id: number, upd: unknown) => mocks.update(id, upd),
      setDefault: (p: string, id: number | null) => mocks.setDefault(p, id)
    },
    games: {
      playOptions: (id: number) => mocks.playOptions(id),
      launch: (id: number, choice: unknown) => mocks.launch(id, choice),
      setPreferredRom: (id: number, romId: number | null) => mocks.setPreferredRom(id, romId),
      updateRom: (id: number, upd: unknown) => mocks.updateRom(id, upd),
      romScanStatus: () => mocks.romScanStatus(),
      romScanStart: (platform?: string) => mocks.romScanStart(platform),
      installed: () => mocks.installed(),
      romScanAccept: (items: unknown) => mocks.romScanAccept(items),
      emulationStats: () => mocks.emulationStats()
    },
    media: { list: (q: unknown) => mocks.mediaList(q), get: (id: number) => mocks.mediaGet(id) },
    mods: { installed: () => Promise.resolve([]) },
    app: { openExternal: (url: string) => mocks.openExternal(url) }
  }
}))

vi.mock('../../src/renderer/src/lib/toast', () => ({ toast: mocks.toast, toastError: mocks.toastError }))
vi.mock('../../src/renderer/src/lib/confirm', () => ({ confirmDialog: async () => true }))

vi.mock('../../src/renderer/src/components/CoverImage', () => ({
  default: ({ alt }: { alt: string }) => (alt ? <div role="img" aria-label={alt} /> : <div aria-hidden="true" />)
}))

vi.mock('../../src/renderer/src/lib/useGameSession', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../src/renderer/src/lib/useGameSession')>()
  return { ...actual, useGameSession: () => ({ running: false, status: null, kick: mocks.kick }) }
})

function renderWith(ui: ReactElement) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>
  )
}

// The hub and console pages at their real routes, so links and navigation work.
// Each render gets its own history key so page state never carries over.
let entry = 0
function renderAt(path: string) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[{ pathname: path, key: `test-${++entry}` }]}>
        <Routes>
          <Route path="/games/emulators" element={<EmulatorsPage />} />
          <Route path="/games/emulators/tools" element={<EmulatorToolsPage />} />
          <Route path="/games/emulators/:platform" element={<EmulatorConsolePage />} />
          <Route path="/games/:id" element={<p>Game page</p>} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
}

const pcsx2: EmulatorInfo = {
  id: 1,
  presetKey: 'pcsx2',
  name: 'PCSX2',
  exePath: 'C:\\Emu\\PCSX2\\pcsx2-qt.exe',
  exeExists: true,
  corePath: null,
  args: ['-batch', '-fullscreen', '--', '{rom}'],
  argsCustom: false,
  dataDir: 'C:\\Users\\me\\Documents\\PCSX2',
  dataDirOverride: null,
  screenshotDir: 'C:\\Users\\me\\Documents\\PCSX2\\snaps',
  screenshotDirOverride: null,
  platforms: ['ps2'],
  defaultFor: ['ps2'],
  verified: true
}

const options: GamePlayOptions = {
  supported: true,
  exePath: 'C:\\Emu\\PCSX2\\pcsx2-qt.exe',
  exePreset: 'pcsx2',
  roms: [
    {
      id: 5,
      mediaId: 9,
      romPath: 'D:\\PS2\\Shadow of the Colossus.iso',
      exists: true,
      platform: 'ps2',
      emulatorId: null,
      effectiveEmulatorId: 1,
      effectiveEmulatorName: 'PCSX2',
      gameCode: 'SCUS-97472',
      gameCodeSource: 'file',
      preferred: true
    }
  ]
}

beforeEach(() => {
  vi.clearAllMocks()
  for (const fn of Object.values(mocks)) fn.mockResolvedValue(undefined)
  mocks.romScanStatus.mockResolvedValue(null)
  mocks.emulationStats.mockResolvedValue({ byPlatform: [], byEmulator: [] })
  mocks.mediaList.mockResolvedValue([])
  mocks.installed.mockResolvedValue([])
  mocks.icon.mockResolvedValue(null)
  mocks.mediaGet.mockResolvedValue({ id: 9, backgroundPath: null })
})

const sotc: InstalledGame = {
  mediaId: 9,
  title: 'Shadow of the Colossus',
  mediaType: 'game',
  coverPath: 'media/sotc.jpg',
  exePath: null,
  platform: 'ps2',
  totalSeconds: 7200,
  lastPlayedAt: '2026-10-20 18:00:00',
  lastSessionSeconds: 3600,
  achievements: null
}

describe('Emulators hub', () => {
  it('starts with one filled Add button and every console to set up', async () => {
    mocks.list.mockResolvedValue([])
    const { container } = renderAt('/games/emulators')
    expect(await screen.findByText('No emulators yet')).toBeInTheDocument()
    const buttons = screen.getAllByRole('button', { name: 'Add emulator' })
    expect(buttons).toHaveLength(1)
    expect(screen.getByRole('button', { name: 'PS2: set up PlayStation 2' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /: set up / })).toHaveLength(26)
    await userEvent.click(buttons[0])
    expect(mocks.add).toHaveBeenCalledWith(undefined)
    await expectNoAxeViolations(container)
  })

  it('shows a tile per console with its emulator, games and a link to its page', async () => {
    mocks.list.mockResolvedValue([pcsx2])
    mocks.installed.mockResolvedValue([sotc])
    mocks.emulationStats.mockResolvedValue({
      byPlatform: [{ platform: 'ps2', seconds: 7200, sessions: 3, games: 1 }],
      byEmulator: []
    })
    const { container } = renderAt('/games/emulators')
    const tile = await screen.findByRole('link', { name: /PlayStation 2/ })
    expect(tile).toHaveAttribute('href', '/games/emulators/ps2')
    expect(within(tile).getByText('PCSX2')).toBeInTheDocument()
    expect(within(tile).getByText(/1 game \/ 2 h 0 m played \/ Last played/)).toBeInTheDocument()
    // The emulated game to continue is featured above the tiles.
    expect(screen.getByRole('heading', { name: 'Continue playing' })).toBeInTheDocument()
    // PS2 is set up, so the strip offers the other 25.
    expect(screen.queryByRole('button', { name: 'PS2: set up PlayStation 2' })).not.toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /: set up / })).toHaveLength(25)
    await expectNoAxeViolations(container)
  })

  it('flags a console whose default emulator is missing', async () => {
    mocks.list.mockResolvedValue([{ ...pcsx2, exeExists: false }])
    renderAt('/games/emulators')
    expect(await screen.findByText('PCSX2 is not at its path any more')).toBeInTheDocument()
  })

  it('sets up a console from the strip and opens its page', async () => {
    mocks.list.mockResolvedValue([])
    mocks.add.mockResolvedValue({ ...pcsx2 })
    const { container } = renderAt('/games/emulators')
    await userEvent.click(await screen.findByRole('button', { name: 'PS2: set up PlayStation 2' }))
    const dialog = screen.getByRole('dialog', { name: 'PlayStation 2' })
    expect(within(dialog).getByText('PCSX2')).toBeInTheDocument()
    expect(within(dialog).getByText('RetroArch')).toBeInTheDocument()
    await expectNoAxeViolations(container)
    await userEvent.click(within(dialog).getByRole('button', { name: 'Choose the program…' }))
    expect(mocks.add).toHaveBeenCalledWith('ps2')
    expect(mocks.toast).toHaveBeenCalledWith('Added PCSX2.', 'success')
    expect(await screen.findByRole('heading', { level: 1, name: 'PlayStation 2' })).toBeInTheDocument()
  })

  it('warns when the chosen emulator does not play that console', async () => {
    mocks.list.mockResolvedValue([])
    mocks.add.mockResolvedValue({ ...pcsx2 })
    renderAt('/games/emulators')
    await userEvent.click(await screen.findByRole('button', { name: 'Wii: set up Wii' }))
    await userEvent.click(screen.getByRole('button', { name: 'Choose the program…' }))
    expect(mocks.add).toHaveBeenCalledWith('wii')
    expect(mocks.toast).toHaveBeenCalledWith(
      'PCSX2 plays PlayStation 2, not Wii. Added under PlayStation 2.',
      'warning'
    )
    expect(await screen.findByRole('heading', { level: 1, name: 'PlayStation 2' })).toBeInTheDocument()
  })
})

describe('Console page', () => {
  it('lists the console games with Play and its banner stats', async () => {
    mocks.list.mockResolvedValue([pcsx2])
    mocks.installed.mockResolvedValue([sotc])
    const { container } = renderAt('/games/emulators/ps2')
    expect(await screen.findByRole('tab', { name: /Games/, selected: true })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: 'PlayStation 2' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Play Shadow of the Colossus' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Continue Shadow of the Colossus' }))
    expect(mocks.launch).toHaveBeenCalledWith(9, undefined)
    expect(screen.getByRole('link', { name: 'View Shadow of the Colossus details' })).toHaveAttribute('href', '/games/9')
    await userEvent.click(screen.getByRole('button', { name: 'Find game files' }))
    expect(mocks.romScanStart).toHaveBeenCalledWith('ps2')
    await expectNoAxeViolations(container)
  })

  it('says so for an unknown console', async () => {
    renderAt('/games/emulators/amiga')
    expect(await screen.findByRole('heading', { name: 'Not found' })).toBeInTheDocument()
  })

  it('shows folders, toggles consoles and sets the default on Setup', async () => {
    mocks.list.mockResolvedValue([pcsx2])
    const { container } = renderAt('/games/emulators/ps2')
    await userEvent.click(await screen.findByRole('tab', { name: 'Setup' }))
    expect(screen.getByRole('heading', { name: 'PCSX2' })).toBeInTheDocument()
    expect(screen.getByText('C:\\Users\\me\\Documents\\PCSX2\\snaps')).toBeInTheDocument()
    expect(screen.getByText('Default for PlayStation 2')).toBeInTheDocument()

    const ps2 = screen.getByRole('button', { name: 'PS2', pressed: true })
    await userEvent.click(ps2)
    expect(mocks.update).toHaveBeenCalledWith(1, { platforms: [] })

    await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Default emulator for PlayStation 2' }), '')
    expect(mocks.setDefault).toHaveBeenCalledWith('ps2', null)

    await userEvent.click(screen.getByRole('button', { name: 'Add another emulator for PS2' }))
    expect(mocks.add).toHaveBeenCalledWith('ps2')
    await expectNoAxeViolations(container)
  })

  it('notes settings shared with another console', async () => {
    const dolphin: EmulatorInfo = { ...pcsx2, id: 2, presetKey: 'dolphin', name: 'Dolphin', platforms: ['gc', 'wii'], defaultFor: ['gc', 'wii'] }
    mocks.list.mockResolvedValue([dolphin])
    renderAt('/games/emulators/gc')
    await userEvent.click(await screen.findByRole('tab', { name: 'Setup' }))
    expect(screen.getByText('These settings also apply to Wii.')).toBeInTheDocument()
  })

  it('stays on the console when removing its last emulator fails', async () => {
    mocks.list.mockResolvedValue([pcsx2])
    mocks.remove.mockRejectedValue(new Error('Emulator is in use'))
    renderAt('/games/emulators/ps2')
    await userEvent.click(await screen.findByRole('tab', { name: 'Setup' }))
    await userEvent.click(screen.getByRole('button', { name: 'Remove' }))
    await waitFor(() => expect(mocks.toastError).toHaveBeenCalled())
    expect(screen.getByRole('heading', { level: 1, name: 'PlayStation 2' })).toBeInTheDocument()
  })

  it('saves edited launch arguments one per line', async () => {
    mocks.list.mockResolvedValue([pcsx2])
    renderAt('/games/emulators/ps2')
    await userEvent.click(await screen.findByRole('tab', { name: 'Setup' }))
    await userEvent.click(screen.getByText('Launch arguments', { selector: 'summary' }))
    const box = screen.getByRole('textbox', { name: 'Launch arguments' })
    await userEvent.clear(box)
    await userEvent.type(box, '-nogui{enter}{{rom}')
    await userEvent.click(screen.getByRole('button', { name: 'Save arguments' }))
    expect(mocks.update).toHaveBeenCalledWith(1, { args: ['-nogui', '{rom}'] })
  })
})

describe('Ways to play', () => {
  it('lists the game file with its console, emulator and code, and plays it', async () => {
    mocks.playOptions.mockResolvedValue(options)
    mocks.list.mockResolvedValue([pcsx2])
    const { container } = renderWith(<WaysToPlay mediaId={9} title="Shadow of the Colossus" />)
    expect(await screen.findByText('Shadow of the Colossus.iso')).toBeInTheDocument()
    expect(screen.getByText(/Play on PS2 \/ PCSX2/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'PlayStation 2 console page' })).toHaveAttribute('href', '/games/emulators/ps2')
    const optionsBox = screen.getByText('Options', { selector: 'summary' }).closest('details')!
    expect(optionsBox).not.toHaveAttribute('open')
    await userEvent.click(within(optionsBox).getByText('Options'))
    expect(within(optionsBox).getByText('D:\\PS2\\Shadow of the Colossus.iso')).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: 'Console' })).toHaveValue('ps2')
    expect(screen.getByRole('textbox', { name: 'Game code' })).toHaveValue('SCUS-97472')
    expect(screen.getByRole('note')).toHaveTextContent('The linked executable is PCSX2 itself')

    await userEvent.click(screen.getByRole('button', { name: 'Play Shadow of the Colossus.iso' }))
    expect(mocks.launch).toHaveBeenCalledWith(9, { kind: 'rom', romId: 5 })

    const uses = screen.getByRole('combobox', { name: 'Play button uses' })
    expect(within(uses).getAllByRole('option').map((o) => o.textContent)).toEqual([
      'The linked executable',
      'Shadow of the Colossus.iso in PCSX2'
    ])
    await userEvent.selectOptions(uses, 'native')
    expect(mocks.setPreferredRom).toHaveBeenCalledWith(9, null)
    await expectNoAxeViolations(container)
  })

  it('picks the same default way as the main process', () => {
    const rom = options.roms[0]
    expect(defaultChoice(options)).toEqual({ kind: 'rom', romId: 5 })
    expect(defaultChoice({ ...options, roms: [{ ...rom, preferred: false }] })).toEqual({ kind: 'native' })
    expect(defaultChoice({ ...options, exePath: null, roms: [{ ...rom, preferred: false }] })).toEqual({
      kind: 'rom',
      romId: 5
    })
    expect(defaultChoice({ ...options, exePath: null, roms: [] })).toBeNull()
  })
})

describe('Emulator tools', () => {
  it('reviews scanned files and links only the chosen rows', async () => {
    mocks.romScanStatus.mockResolvedValue({
      id: 'romscan-1',
      state: 'done',
      scanned: 40,
      found: 3,
      message: null,
      platform: null,
      results: [
        {
          id: 1,
          fileName: 'Shadow of the Colossus (USA).iso',
          folder: 'D:\\PS2\\',
          platform: 'ps2',
          gameCode: 'SCUS-97472',
          candidates: [{ mediaId: 9, title: 'Shadow of the Colossus' }],
          suggestedMediaId: 9,
          alreadyLinked: false
        },
        {
          id: 2,
          fileName: 'Ico (USA).iso',
          folder: 'D:\\PS2\\',
          platform: 'ps2',
          gameCode: null,
          candidates: [{ mediaId: 4, title: 'Ico' }],
          suggestedMediaId: 4,
          alreadyLinked: false
        },
        {
          id: 3,
          fileName: 'Unknown.iso',
          folder: 'D:\\PS2\\',
          platform: 'ps2',
          gameCode: null,
          candidates: [],
          suggestedMediaId: null,
          alreadyLinked: false
        }
      ]
    })
    mocks.romScanAccept.mockResolvedValue({ linked: 1, failed: [] })
    const { container } = renderAt('/games/emulators/tools')
    const ico = await screen.findByRole('combobox', { name: 'Game for Ico (USA).iso' })
    await userEvent.selectOptions(ico, '')
    await userEvent.click(screen.getByRole('button', { name: 'Link 1 game file' }))
    expect(mocks.romScanAccept).toHaveBeenCalledWith([{ resultId: 1, mediaId: 9 }])
    expect(screen.getByText('1 files with no matching library game')).toBeInTheDocument()
    await expectNoAxeViolations(container)
  })

  it('drops picks from an earlier scan when the banner starts a new one', async () => {
    const scanRow = (fileName: string, candidates: { mediaId: number; title: string }[]) => ({
      id: 1,
      fileName,
      folder: 'D:\\PS2\\',
      platform: 'ps2' as const,
      gameCode: null,
      candidates,
      suggestedMediaId: candidates[0].mediaId,
      alreadyLinked: false
    })
    const done = { state: 'done' as const, scanned: 1, found: 1, message: null, platform: 'ps2' as const }
    mocks.list.mockResolvedValue([pcsx2])
    mocks.romScanStatus.mockResolvedValue({
      ...done,
      id: 'romscan-1',
      results: [scanRow('Colossus.iso', [{ mediaId: 9, title: 'Shadow of the Colossus' }, { mediaId: 4, title: 'Ico' }])]
    })
    mocks.romScanAccept.mockResolvedValue({ linked: 1, failed: [] })
    renderAt('/games/emulators/ps2')
    await userEvent.selectOptions(await screen.findByRole('combobox', { name: 'Game for Colossus.iso' }), '4')

    mocks.romScanStart.mockResolvedValue({ id: 'romscan-2' })
    mocks.romScanStatus.mockResolvedValue({
      ...done,
      id: 'romscan-2',
      results: [scanRow('Okami.iso', [{ mediaId: 7, title: 'Okami' }])]
    })
    await userEvent.click(screen.getByRole('button', { name: 'Find game files' }))
    expect(await screen.findByRole('combobox', { name: 'Game for Okami.iso' })).toHaveValue('7')
    await userEvent.click(screen.getByRole('button', { name: 'Link 1 game file' }))
    expect(mocks.romScanAccept).toHaveBeenCalledWith([{ resultId: 1, mediaId: 7 }])
  })

  it('shows a running scan for other consoles on a console page, with Stop', async () => {
    mocks.list.mockResolvedValue([pcsx2])
    mocks.romScanStatus.mockResolvedValue({
      id: 'romscan-3', state: 'scanning', scanned: 10, found: 2, message: null, platform: null, results: []
    })
    renderAt('/games/emulators/ps2')
    expect(await screen.findByText('Scanning for every console… 2 game files in 10 files.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Stop' })).toBeInTheDocument()
  })

  it('shows a console scan only on that console page', async () => {
    mocks.list.mockResolvedValue([pcsx2])
    mocks.romScanStatus.mockResolvedValue({
      id: 'romscan-2', state: 'done', scanned: 1, found: 0, message: null, platform: 'gc', results: []
    })
    renderAt('/games/emulators/ps2')
    expect(await screen.findByRole('heading', { name: 'Find PS2 game files' })).toBeInTheDocument()
    expect(screen.queryByText('No new game files match games in your library.')).not.toBeInTheDocument()
  })

  it('shows playtime by console and native ports for library games', async () => {
    mocks.emulationStats.mockResolvedValue({
      byPlatform: [{ platform: 'ps2', seconds: 7200, sessions: 3, games: 2 }],
      byEmulator: [{ presetKey: 'pcsx2', seconds: 7200, sessions: 3 }]
    })
    mocks.mediaList.mockResolvedValue([{ id: 12, title: 'The Legend of Zelda: Ocarina of Time', mediaType: 'game' }])
    renderAt('/games/emulators/tools')
    expect(await screen.findByRole('rowheader', { name: 'PlayStation 2' })).toBeInTheDocument()
    expect(screen.getAllByText('2 h 0 m')).toHaveLength(2)
    expect(await screen.findByText('Ship of Harkinian')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'The Legend of Zelda: Ocarina of Time' })).toHaveAttribute('href', '/games/12')
    expect(mocks.mediaList).toHaveBeenCalledWith({ mediaType: 'game' })
  })
})

describe('Native port note', () => {
  it('suggests the port until its program is linked', async () => {
    mocks.list.mockResolvedValue([])
    mocks.playOptions.mockResolvedValue({ supported: true, exePath: null, exePreset: null, roms: [] })
    const { unmount } = renderWith(<WaysToPlay mediaId={3} title="Legend of Zelda, The: Ocarina of Time" />)
    await userEvent.click(await screen.findByRole('button', { name: 'Ship of Harkinian' }))
    expect(mocks.openExternal).toHaveBeenCalledWith('https://github.com/HarbourMasters/Shipwright')
    unmount()

    mocks.playOptions.mockResolvedValue({ supported: true, exePath: 'C:\\Ports\\soh.exe', exePreset: null, roms: [] })
    renderWith(<WaysToPlay mediaId={3} title="The Legend of Zelda: Ocarina of Time" />)
    await screen.findByText('Game files')
    expect(screen.queryByText('A native PC port exists')).not.toBeInTheDocument()
  })
})
