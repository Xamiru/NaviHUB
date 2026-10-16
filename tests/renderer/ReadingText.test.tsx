import { render } from '@testing-library/react'
import { expect, it } from 'vitest'
import { ReadingText } from '../../src/renderer/src/components/japanese/Furigana'

it('puts the reading over each kanji run when the split is unique', () => {
  const { container } = render(<ReadingText text="日本に来た。" reading="にほんにきた。" />)
  const rubies = [...container.querySelectorAll('ruby')].map((r) => r.textContent)
  expect(rubies).toEqual(['日本にほん', '来き'])
})

it('prints the reading beside the text when the split is ambiguous', () => {
  const { container } = render(
    <ReadingText text="母は料理が上手です。" reading="はははりょうりがじょうずです。" fallback="inline" />
  )
  expect(container.querySelector('ruby')).toBeNull()
  expect(container.textContent).toBe('母は料理が上手です。はははりょうりがじょうずです。')
})

it('hides readings when furigana is off but keeps the ruby line height', () => {
  const { container } = render(<ReadingText text="日本に来た。" reading="にほんにきた。" show={false} />)
  expect([...container.querySelectorAll('rt')].every((rt) => rt.classList.contains('invisible'))).toBe(true)
  const plain = render(<ReadingText text="母は料理が上手です。" reading="はははりょうりがじょうずです。" show={false} />)
  expect(plain.container.textContent).toBe('母は料理が上手です。')
})
