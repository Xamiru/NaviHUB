import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ModsSection from '../../src/renderer/src/components/ModsSection'
import type { GbModDetail, MediaDetail, ModJobStatus, ModTarget } from '../../src/shared/types'
import { expectNoAxeViolations } from './accessibility'

const api = vi.hoisted(() => ({
  link: vi.fn(),
  setLink: vi.fn(),
  searchGames: vi.fn(),
  list: vi.fn(),
  detail: vi.fn(),
  targets: vi.fn(),
  install: vi.fn(),
  status: vi.fn(),
  confirm: vi.fn(),
  cancel: vi.fn(),
  installed: vi.fn(),
  uninstall: vi.fn(),
  setEnabled: vi.fn(),
  checkUpdates: vi.fn()
}))

vi.mock('../../src/renderer/src/lib/api', () => ({
  api: { mods: api, app: { openExternal: vi.fn() } }
}))

const m = { id: 9, title: 'The Legend of Zelda: Tears of the Kingdom', mediaType: 'game' } as MediaDetail

const target: ModTarget = {
  romId: 3,
  romName: 'TotK.nsp',
  platform: 'switch',
  gameCode: '0100F2C0115B6000',
  emulatorId: 1,
  emulatorName: 'Eden',
  presetKey: 'eden',
  dataDir: 'C:\\Users\\me\\AppData\\Roaming\\eden',
  blocked: null
}

const detail: GbModDetail = {
  id: 77,
  name: 'Visual Fixes',
  gameId: 7617,
  submitter: 'someone',
  category: 'Other/Misc',
  version: '2.0',
  likes: 50,
  downloads: 900,
  dateUpdated: 1_790_000_000,
  dateModified: 1_790_000_000,
  summary: 'Fixes the resolution.',
  body: ['Paragraph one.', 'Paragraph two.'],
  license: null,
  images: ['https://images.gamebanana.com/img/ss/mods/a.jpg'],
  files: [{ id: 5, name: 'fixes.zip', size: 2_000_000, md5: null, avClean: true, description: null, version: '2.0', dateAdded: null, downloads: 3, archived: false }],
  profileUrl: 'https://gamebanana.com/mods/77'
}

function renderTab() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <ModsSection m={m} />
      </MemoryRouter>
    </QueryClientProvider>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  api.targets.mockResolvedValue([target])
  api.installed.mockResolvedValue([])
  api.status.mockResolvedValue(null)
})

describe('Mods tab', () => {
  it('searches GameBanana only when asked, then links the chosen game', async () => {
    api.link.mockResolvedValue(null)
    api.searchGames.mockResolvedValue([{ id: 7617, name: 'The Legend of Zelda: Tears of the Kingdom', iconUrl: null }])
    api.setLink.mockResolvedValue({ gameId: 7617, profileUrl: 'https://gamebanana.com/games/7617' })
    const { container } = renderTab()
    const box = await screen.findByRole('textbox', { name: 'Find this game on GameBanana' })
    expect(box).toHaveValue(m.title)
    expect(api.searchGames).not.toHaveBeenCalled()
    await userEvent.click(screen.getByRole('button', { name: 'Search' }))
    expect(api.searchGames).toHaveBeenCalledWith(m.title)
    await userEvent.click(await screen.findByRole('button', { name: 'Use this game' }))
    expect(api.setLink).toHaveBeenCalledWith(9, 7617)
    await expectNoAxeViolations(container)
  })

  it('loads mods on request, opens one and starts an install into the game’s emulator', async () => {
    api.link.mockResolvedValue({ gameId: 7617, profileUrl: 'https://gamebanana.com/games/7617' })
    api.list.mockResolvedValue({
      page: 1,
      gameName: 'The Legend of Zelda: Tears of the Kingdom',
      total: 1,
      complete: true,
      mods: [{ id: 77, name: 'Visual Fixes', submitter: 'someone', category: 'Other/Misc', version: '2.0', likes: 50, views: 1, dateAdded: null, dateUpdated: null, obsolete: false, thumbUrl: null, images: [] }]
    })
    api.detail.mockResolvedValue(detail)
    api.install.mockResolvedValue({ id: 'mod-1' })
    const { container } = renderTab()
    await userEvent.click(await screen.findByRole('button', { name: 'Load mods' }))
    expect(api.list).toHaveBeenCalledWith(7617, 'downloads', 1)
    await userEvent.click(await screen.findByRole('button', { name: 'Open Visual Fixes' }))
    expect(await screen.findByRole('dialog', { name: 'Visual Fixes' })).toBeInTheDocument()
    expect(screen.getByText('Installs into Eden.')).toBeInTheDocument()
    await expectNoAxeViolations(container)
    await userEvent.click(screen.getByRole('button', { name: 'Install' }))
    expect(api.install).toHaveBeenCalledWith({ mediaId: 9, romId: 3, modId: 77, fileId: 5 })
  })

  it('shows the destination and asks before anything is written', async () => {
    api.link.mockResolvedValue({ gameId: 7617, profileUrl: 'x' })
    const job: ModJobStatus = {
      id: 'mod-1',
      state: 'awaiting',
      mediaId: 9,
      modName: 'FPS Mod',
      fileName: 'fps.zip',
      bytes: 10,
      totalBytes: 10,
      message: null,
      plan: {
        destination: 'C:\\Users\\me\\AppData\\Roaming\\eden\\load\\0100F2C0115B6000',
        fileCount: 2,
        variants: [
          { index: 0, label: '30fps' },
          { index: 1, label: '60fps' }
        ]
      },
      installId: null
    }
    api.status.mockResolvedValue(job)
    api.confirm.mockResolvedValue({ installId: 4 })
    renderTab()
    expect(await screen.findByText('C:\\Users\\me\\AppData\\Roaming\\eden\\load\\0100F2C0115B6000')).toBeInTheDocument()
    await userEvent.selectOptions(screen.getByRole('combobox', { name: /several versions/ }), '1')
    await userEvent.click(screen.getByRole('button', { name: 'Install here' }))
    expect(api.confirm).toHaveBeenCalledWith('mod-1', 1)
  })

  it('lists installed mods with disable and a guarded uninstall', async () => {
    api.link.mockResolvedValue({ gameId: 7617, profileUrl: 'x' })
    api.installed.mockResolvedValue([
      {
        id: 4,
        gbModId: 77,
        gbFileId: 5,
        name: 'FPS Mod',
        version: '1.0',
        emulatorName: 'Eden',
        kind: 'folder',
        location: 'C:\\eden\\load\\0100F2C0115B6000\\FPS Mod',
        enabled: true,
        installedAt: '2026-10-16 20:00:00',
        fileCount: 1,
        sourceUpdatedAt: 1
      }
    ])
    api.setEnabled.mockResolvedValue({ removed: 1, kept: [] })
    api.checkUpdates.mockResolvedValue([4])
    renderTab()
    await userEvent.click(await screen.findByRole('button', { name: 'Disable' }))
    expect(api.setEnabled).toHaveBeenCalledWith(4, false)
    await userEvent.click(screen.getByRole('button', { name: 'Check for updates' }))
    await waitFor(() => expect(screen.getByText('Update available')).toBeInTheDocument())
  })
})
