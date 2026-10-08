import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { api } from '@/lib/api'
import { ClipDialog } from '@/components/wrestling/WrestlingClips'
import { expectNoAxeViolations } from './accessibility'

vi.mock('@/lib/api', () => ({
  api: {
    wrestling: {
      pickClipFile: vi.fn(async () => ({ localPath: 'Clips/pipebomb.mkv', title: 'pipebomb' })),
      clipTargets: vi.fn(async () => [
        { entityKind: 'wrestler', entityId: 4, label: 'CM Punk', sub: null },
        { entityKind: 'promotion', promotionId: 'wwe', label: 'WWE', sub: 'World Wrestling Entertainment' }
      ]),
      clipTags: vi.fn(async () => [{ tag: 'shoot', count: 2 }]),
      saveClip: vi.fn(async (input) => ({ ...input, id: 1 })),
      removeClip: vi.fn()
    }
  }
}))

function renderDialog(onClose = vi.fn()) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  const result = render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <ClipDialog
          initialLinks={[{ entityKind: 'event', entityId: 9, label: 'Raw' }]}
          onClose={onClose}
        />
      </MemoryRouter>
    </QueryClientProvider>
  )
  return { ...result, onClose }
}

describe('wrestling clip dialog', () => {
  it('files a picked clip with type, links and tags', async () => {
    const user = userEvent.setup()
    const { container, onClose } = renderDialog()
    expect(screen.getByRole('dialog', { name: 'Add clip' })).toBeInTheDocument()
    const save = screen.getByRole('button', { name: 'Save clip' })
    expect(save).toBeDisabled()

    await user.click(screen.getByRole('button', { name: 'Choose file' }))
    expect(await screen.findByText('Clips/pipebomb.mkv')).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Title' })).toHaveValue('pipebomb')

    await user.click(screen.getByRole('button', { name: 'Promos and segments' }))
    await user.type(
      screen.getByRole('textbox', { name: 'Search wrestlers, events, matches or promotions' }),
      'pu'
    )
    await user.click(await screen.findByRole('button', { name: /CM Punk/ }))
    await user.type(screen.getByRole('combobox', { name: 'Add a tag' }), 'Shoot{Enter}')
    expect(screen.getByRole('button', { name: 'Remove tag shoot' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Remove link to Raw' }))

    await expectNoAxeViolations(container)
    await user.click(save)
    await waitFor(() => expect(onClose).toHaveBeenCalled())
    expect(api.wrestling.saveClip).toHaveBeenCalledWith({
      id: undefined,
      title: 'pipebomb',
      kind: 'promo',
      localPath: 'Clips/pipebomb.mkv',
      note: '',
      tags: ['shoot'],
      links: [{ entityKind: 'wrestler', entityId: 4 }]
    })
  })
})
