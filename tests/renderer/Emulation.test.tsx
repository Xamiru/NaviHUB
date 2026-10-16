import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { ReactElement } from 'react'
import EmulatorsPage from '../../src/renderer/src/pages/EmulatorsPage'
import WaysToPlay, { defaultChoice } from '../../src/renderer/src/components/WaysToPlay'
import type { EmulatorInfo, GamePlayOptions } from '../../src/shared/types'
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
  openExternal: vi.fn()
}))

vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    emulators: {
      list: () => mocks.list(),
      add: () => mocks.add(),
      update: (id: number, upd: unknown) => mocks.update(id, upd),
      setDefault: (p: string, id: number | null) => mocks.setDefault(p, id)
    },
    games: {
      playOptions: (id: number) => mocks.playOptions(id),
      launch: (id: number, choice: unknown) => mocks.launch(id, choice),
      setPreferredRom: (id: number, romId: number | null) => mocks.setPreferredRom(id, romId),
      updateRom: (id: number, upd: unknown) => mocks.updateRom(id, upd),
      romScanStatus: () => mocks.romScanStatus(),
      romScanStart: () => mocks.romScanStart(),
      romScanAccept: (items: unknown) => mocks.romScanAccept(items),
      emulationStats: () => mocks.emulationStats()
    },
    media: { list: (q: unknown) => mocks.mediaList(q) },
    mods: { installed: () => Promise.resolve([]) },
    app: { openExternal: (url: string) => mocks.openExternal(url) }
  }
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
})

describe('Emulators page', () => {
  it('starts with one filled Add button and no header duplicate', async () => {
    mocks.list.mockResolvedValue([])
    const { container } = renderWith(<EmulatorsPage />)
    expect(await screen.findByText('No emulators yet')).toBeInTheDocument()
    const buttons = screen.getAllByRole('button', { name: 'Add emulator' })
    expect(buttons).toHaveLength(1)
    await userEvent.click(buttons[0])
    expect(mocks.add).toHaveBeenCalled()
    await expectNoAxeViolations(container)
  })

  it('shows folders, toggles consoles and sets the default per console', async () => {
    mocks.list.mockResolvedValue([pcsx2])
    const { container } = renderWith(<EmulatorsPage />)
    expect(await screen.findByRole('heading', { name: 'PCSX2' })).toBeInTheDocument()
    expect(screen.getByText('C:\\Users\\me\\Documents\\PCSX2\\snaps')).toBeInTheDocument()
    expect(screen.getByText('Default for PlayStation 2')).toBeInTheDocument()

    const ps2 = screen.getByRole('button', { name: 'PS2', pressed: true })
    await userEvent.click(ps2)
    expect(mocks.update).toHaveBeenCalledWith(1, { platforms: [] })

    await userEvent.selectOptions(screen.getByRole('combobox', { name: 'PlayStation 2' }), '')
    expect(mocks.setDefault).toHaveBeenCalledWith('ps2', null)
    await expectNoAxeViolations(container)
  })

  it('saves edited launch arguments one per line', async () => {
    mocks.list.mockResolvedValue([pcsx2])
    renderWith(<EmulatorsPage />)
    await userEvent.click(await screen.findByText('Launch arguments', { selector: 'summary' }))
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
    expect(screen.getByRole('combobox', { name: 'Console' })).toHaveValue('ps2')
    expect(screen.getByRole('textbox', { name: 'Game code' })).toHaveValue('SCUS-97472')
    expect(screen.getByRole('note')).toHaveTextContent('The linked executable is PCSX2 itself')

    await userEvent.click(screen.getByRole('button', { name: 'Play this' }))
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

describe('Emulators page extras', () => {
  it('reviews scanned files and links only the chosen rows', async () => {
    mocks.list.mockResolvedValue([pcsx2])
    mocks.romScanStatus.mockResolvedValue({
      id: 'romscan-1',
      state: 'done',
      scanned: 40,
      found: 3,
      message: null,
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
    const { container } = renderWith(<EmulatorsPage />)
    const ico = await screen.findByRole('combobox', { name: 'Game for Ico (USA).iso' })
    await userEvent.selectOptions(ico, '')
    await userEvent.click(screen.getByRole('button', { name: 'Link 1 game file' }))
    expect(mocks.romScanAccept).toHaveBeenCalledWith([{ resultId: 1, mediaId: 9 }])
    expect(screen.getByText('1 files with no matching library game')).toBeInTheDocument()
    await expectNoAxeViolations(container)
  })

  it('shows playtime by console and native ports for library games', async () => {
    mocks.list.mockResolvedValue([pcsx2])
    mocks.emulationStats.mockResolvedValue({
      byPlatform: [{ platform: 'ps2', seconds: 7200, sessions: 3, games: 2 }],
      byEmulator: [{ presetKey: 'pcsx2', seconds: 7200, sessions: 3 }]
    })
    mocks.mediaList.mockResolvedValue([{ id: 12, title: 'The Legend of Zelda: Ocarina of Time', mediaType: 'game' }])
    renderWith(<EmulatorsPage />)
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
