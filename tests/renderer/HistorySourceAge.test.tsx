import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SourceReference } from '@/components/history/Citations'
import type { HistorySource } from '@shared/history/schema'

const source = (date: string, type: HistorySource['type'] = 'encyclopedia'): HistorySource =>
  ({ id: 's', type, date, title: 'Persia', lang: 'en', contributors: [], container: 'Encyclopaedia Britannica, 11th edition' }) as unknown as HistorySource

describe('History source age badge', () => {
  it('marks older scholarship on its citation', () => {
    render(<SourceReference source={source('1911')} />)
    expect(screen.getByText('older scholarship')).toBeTruthy()
  })

  it('leaves recent scholarship and primary texts unmarked', () => {
    render(<SourceReference source={source('2008')} />)
    render(<SourceReference source={source('1514', 'primary')} />)
    expect(screen.queryByText('older scholarship')).toBeNull()
  })
})
