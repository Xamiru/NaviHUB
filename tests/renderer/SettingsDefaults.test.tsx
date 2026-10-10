import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  DEFAULT_SCOPE,
  clearListOverrides,
  loadListLayout,
  loadListSort,
  saveListLayout,
  saveListSort
} from '@/lib/listSortPrefs'
import { QUIZ_DEFAULTS, loadQuizDefaults } from '@/lib/quizPrefs'
import { loadMangaReaderPrefs } from '@/lib/readerPrefs'
import { MangaReaderDefaultsSettings, QuizDefaultsSettings } from '@/pages/settings/DefaultsSettings'

beforeEach(() => localStorage.clear())

describe('library list defaults', () => {
  it('a library without its own choice uses the default, and keeps its own once made', () => {
    saveListSort(DEFAULT_SCOPE, { sort: 'title', dir: 'asc' })
    saveListLayout(DEFAULT_SCOPE, 'list')
    expect(loadListSort('anime')).toEqual({ sort: 'title', dir: 'asc' })
    expect(loadListLayout('anime')).toBe('list')
    saveListSort('anime', { sort: 'score' })
    saveListLayout('anime', 'grid')
    expect(loadListSort('anime').sort).toBe('score')
    expect(loadListLayout('anime')).toBe('grid')
  })

  it('"use for every library" drops per-library choices but keeps the default', () => {
    saveListSort(DEFAULT_SCOPE, { sort: 'added' })
    saveListSort('manga', { sort: 'score' })
    saveListLayout('manga', 'list')
    clearListOverrides()
    expect(loadListSort('manga').sort).toBe('added')
    expect(loadListLayout('manga')).toBe('grid')
  })

  it('a default the page does not offer falls back to the built-in sort', () => {
    saveListSort(DEFAULT_SCOPE, { sort: 'random' })
    expect(loadListSort('anime', ['title', 'score']).sort).toBe('updated')
  })
})

describe('quiz defaults', () => {
  it('ignores malformed stored values', () => {
    localStorage.setItem('quiz.defaults', JSON.stringify({ timer: 'yes', songSnippet: 7, songOffset: false }))
    expect(loadQuizDefaults()).toEqual({ ...QUIZ_DEFAULTS, songOffset: false })
  })

  it('the card saves each change immediately', async () => {
    const user = userEvent.setup()
    render(<QuizDefaultsSettings />)
    await user.click(screen.getByRole('checkbox', { name: /Countdown timer/ }))
    await user.selectOptions(screen.getByRole('combobox', { name: 'Song quiz clip length' }), '15 seconds')
    expect(loadQuizDefaults()).toMatchObject({ timer: false, songSnippet: 15 })
  })
})

it('the manga reader card edits the prefs the reader opens with', async () => {
  const user = userEvent.setup()
  render(<MangaReaderDefaultsSettings />)
  await user.selectOptions(screen.getByRole('combobox', { name: 'Reading direction' }), 'Left to right')
  expect(loadMangaReaderPrefs().direction).toBe('ltr')
})
