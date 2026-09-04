import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import BarChart from '@/components/BarChart'
import CalendarHeatmap from '@/components/CalendarHeatmap'

describe('data visual accessibility', () => {
  it('exposes exact bar values in a named table', () => {
    render(
      <BarChart
        label="Listening by month"
        bars={[
          { key: 'jan', title: 'January', label: 'Jan', value: 4 },
          { key: 'feb', title: 'February', label: 'Feb', value: 7 }
        ]}
      />
    )

    expect(screen.getByRole('table', { name: 'Listening by month' })).toBeInTheDocument()
    expect(screen.getByRole('row', { name: 'January 4' })).toBeInTheDocument()
    expect(screen.getByRole('row', { name: 'February 7' })).toBeInTheDocument()
  })

  it('summarizes heatmap activity and exposes exact active-day counts', () => {
    render(
      <CalendarHeatmap
        unit="reviews"
        days={[
          { day: '2026-09-01', count: 3 },
          { day: '2026-09-02', count: 0 },
          { day: '2026-09-03', count: 2 }
        ]}
      />
    )

    expect(screen.getByText('5 reviews across 2 active days.')).toHaveClass('sr-only')
    expect(screen.getByRole('table', { name: 'Daily reviews' })).toBeInTheDocument()
    expect(screen.getByRole('row', { name: '2026-09-01 3' })).toBeInTheDocument()
    expect(screen.getByRole('row', { name: '2026-09-03 2' })).toBeInTheDocument()
  })
})
