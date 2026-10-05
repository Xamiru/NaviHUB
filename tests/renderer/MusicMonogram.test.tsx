import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import CoverImage, { monogram } from '../../src/renderer/src/components/CoverImage'

it('builds artist initials from the first two words, ignoring brackets', () => {
  expect(monogram('30 Seconds to Mars')).toBe('3S')
  expect(monogram('[ED] Unity')).toBe('EU')
  expect(monogram('Adele')).toBe('A')
  expect(monogram('宇多田ヒカル')).toBe('宇')
  expect(monogram('...')).toBe('?')
})

it('names a photo-less artist by name rather than as missing art', () => {
  render(<CoverImage path={null} alt="The Eagle Huntress" fallback="monogram" rounded="rounded-full" />)
  expect(screen.getByRole('img', { name: 'The Eagle Huntress' })).toHaveTextContent('TE')
})
