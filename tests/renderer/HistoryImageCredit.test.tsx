import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ImageCredit } from '@/components/history/HistoryBits'

describe('History image credit', () => {
  it("puts the holder's own title before the credit, so a doubtful likeness says so", () => {
    render(
      <ImageCredit
        image={{ url: 'u', cached: null, credit: 'Sebastiano del Piombo, The Metropolitan Museum of Art', license: 'Public domain', page: null, title: 'Portrait of a Man, Said to be Christopher Columbus' }}
      />
    )
    expect(screen.getByText('Portrait of a Man, Said to be Christopher Columbus')).toBeTruthy()
    expect(screen.getByText(/The Metropolitan Museum of Art · Public domain/)).toBeTruthy()
  })
})
