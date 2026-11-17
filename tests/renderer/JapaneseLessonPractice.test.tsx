import { readFileSync } from 'node:fs'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import LessonPractice from '../../src/renderer/src/components/japanese/LessonPractice'
import { LESSON_PRACTICE, lessonPractice } from '../../src/shared/japanese/lessonPractice'
import { DOJO_FORMS } from '../../src/shared/dojoWords'
import { expectNoAxeViolations } from './accessibility'

// Tests run from the repo root (the JapaneseHubs.test.tsx idiom).
const read = (rel: string) => readFileSync(rel, 'utf8')

const PAGE_FOR: Record<string, string> = {
  '/japanese/kana': 'src/renderer/src/pages/JapaneseKanaPage.tsx',
  '/japanese/sentences': 'src/renderer/src/pages/JapaneseSentencesPage.tsx',
  '/japanese/confusables': 'src/renderer/src/pages/JapaneseConfusablesPage.tsx'
}

it('keys every practice entry to a locked built-in lesson', () => {
  const lock = JSON.parse(read('src/main/db/japaneseSeedKeys.lock.json')) as { lessons: string[] }
  expect(Object.keys(LESSON_PRACTICE).filter((k) => !lock.lessons.includes(k))).toEqual([])
})

it('points every link at a real route, tab and conjugation form', () => {
  const app = read('src/renderer/src/App.tsx')
  const links = [...Object.values(LESSON_PRACTICE).flat(), ...lessonPractice(null, 'kanji')]
  for (const { route } of links) {
    const url = new URL(route, 'http://x')
    expect(app, route).toContain(`path="${url.pathname}"`)
    const tab = url.searchParams.get('tab')
    if (tab) expect(read(PAGE_FOR[url.pathname]), route).toContain(`'${tab}'`)
    for (const form of url.searchParams.get('form')?.split(',') ?? []) {
      expect(DOJO_FORMS as string[], route).toContain(form)
    }
  }
})

it('shows the drills for a lesson under "Practice this"', async () => {
  const { container } = render(
    <MemoryRouter>
      <LessonPractice seedKey="n5.17" kind="grammar" />
    </MemoryRouter>
  )
  const nav = screen.getByRole('navigation', { name: 'Practice this' })
  expect(within(nav).getByRole('link', { name: 'Conjugation drill' })).toHaveAttribute(
    'href',
    '/japanese/kana?tab=conjugation&form=te'
  )
  await expectNoAxeViolations(container)
})

it('gives any kanji lesson the writing and kanji quiz, and a plain lesson nothing', () => {
  const { container, rerender } = render(
    <MemoryRouter>
      <LessonPractice seedKey={null} kind="kanji" />
    </MemoryRouter>
  )
  expect(screen.getAllByRole('link').map((l) => l.textContent)).toEqual(['Handwriting practice', 'Kanji quiz'])
  rerender(
    <MemoryRouter>
      <LessonPractice seedKey="n5.13" kind="vocab" />
    </MemoryRouter>
  )
  expect(container).toBeEmptyDOMElement()
  expect(lessonPractice('counters.03', 'vocab').map((l) => l.label)).toEqual(['Numbers and counters drill'])
})
