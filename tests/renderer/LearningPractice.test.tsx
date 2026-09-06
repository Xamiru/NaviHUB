import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import LearningPractice from '@/components/LearningPractice'
import LearningProject from '@/components/LearningProject'
import { learningSettingKey, type LearningUnit } from '@shared/learningEvidence'
import { expectNoAxeViolations } from './accessibility'

const state = vi.hoisted(() => ({ values: {} as Record<string, string>, fail: false }))
vi.mock('@/lib/api', () => ({ api: { settings: {
  all: vi.fn(async () => ({ ...state.values })),
  set: vi.fn(async (key: string, value: string) => {
    if (state.fail) throw new Error('Disk unavailable')
    state.values[key] = value
  })
} } }))

const key = learningSettingKey('english', 'fixture')
const unit: LearningUnit = {
  id: 'fixture', title: 'A focused rule', body: 'The worked example teaches the rule.',
  practice: [
    { id: 'p1', prompt: 'First practice prompt', answers: ['one'], explanation: 'The first expected result follows this rule.' },
    { id: 'p2', prompt: 'Second practice prompt', answers: ['two'], explanation: 'The second expected result follows the same rule.' }
  ],
  transfer: [{ id: 't1', prompt: 'A different delayed prompt', answers: ['three'], explanation: 'The new scenario requires applying the same rule.' }]
}

function mount(element = <LearningPractice unit={unit} settingKey={key} />) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } })
  return render(<QueryClientProvider client={client}>{element}</QueryClientProvider>)
}

beforeEach(() => { state.values = {}; state.fail = false })

describe('LearningPractice', () => {
  it('records a whole practice once and keeps delayed answers hidden', async () => {
    const user = userEvent.setup()
    const { container } = mount()
    await waitFor(() => expect(screen.getByRole('button', { name: 'Start guided practice' })).toBeEnabled(), { timeout: 5000 })
    expect(screen.getByRole('button', { name: 'Start delayed transfer check' })).toBeDisabled()
    expect(screen.queryByText('A different delayed prompt')).not.toBeInTheDocument()
    await expectNoAxeViolations(container)
    await user.click(screen.getByRole('button', { name: 'Start guided practice' }))
    await user.type(await screen.findByRole('textbox', { name: 'Your answer' }), 'one')
    await user.dblClick(screen.getByRole('button', { name: 'Check answer' }))
    await user.click(await screen.findByRole('button', { name: 'Next exercise' }))
    await user.type(screen.getByRole('textbox', { name: 'Your answer' }), 'two')
    await user.click(screen.getByRole('button', { name: 'Check answer' }))
    await screen.findByText(/Saved: 2 of 2/)
    const saved = JSON.parse(state.values[key])
    expect(saved.attempts).toHaveLength(1)
    expect(saved.attempts[0]).toMatchObject({ completed: true, score: 2, total: 2, assisted: true, mode: 'practice' })
    await user.click(screen.getByRole('button', { name: 'Return to practice overview' }))
    expect(screen.getByRole('button', { name: 'Start delayed transfer check' })).toBeDisabled()
  }, 15000)

  it('reserves a cold form before displaying it so leaving cannot make it unseen again', async () => {
    const user = userEvent.setup()
    state.values[key] = JSON.stringify({ attempts: [{
      at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), completed: true,
      mode: 'practice', score: 2, total: 2, assisted: true, exerciseIds: ['p1', 'p2']
    }] })
    const view = mount()
    await waitFor(() => expect(screen.getByRole('button', { name: 'Start delayed transfer check' })).toBeEnabled(), { timeout: 5000 })
    await user.click(screen.getByRole('button', { name: 'Start delayed transfer check' }))
    await screen.findByText('A different delayed prompt')
    expect(JSON.parse(state.values[key]).exposedIds).toContain('t1')
    view.unmount()
    mount()
    await screen.findByText(/All transfer prompts have been exposed/)
    expect(screen.getByRole('button', { name: 'Repeat transfer practice' })).toBeDisabled()
    expect(screen.queryByText('A different delayed prompt')).not.toBeInTheDocument()
  }, 15000)

  it('shows feedback after an answer and never presents a failed answer as a pass', async () => {
    const user = userEvent.setup()
    mount()
    await waitFor(() => expect(screen.getByRole('button', { name: 'Start guided practice' })).toBeEnabled(), { timeout: 5000 })
    await user.click(screen.getByRole('button', { name: 'Start guided practice' }))
    await user.type(await screen.findByRole('textbox', { name: 'Your answer' }), 'wrong')
    await user.click(screen.getByRole('button', { name: 'Check answer' }))
    await screen.findByText('Does not match an accepted answer.')
    expect(screen.getByText('Accepted: one')).toBeInTheDocument()
    expect(JSON.parse(state.values[key]).attempts[0]).toMatchObject({ score: 0, completed: false })
  }, 15000)

  it('marks a delayed check assisted when the teaching note was opened', async () => {
    const user = userEvent.setup()
    state.values[key] = JSON.stringify({ attempts: [{
      at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), completed: true,
      mode: 'practice', score: 2, total: 2, assisted: true, exerciseIds: ['p1', 'p2']
    }] })
    mount()
    await waitFor(() => expect(screen.getByRole('button', { name: 'Start delayed transfer check' })).toBeEnabled(), { timeout: 5000 })
    await user.click(screen.getByText('Review the teaching note'))
    await user.click(screen.getByRole('button', { name: 'Start delayed transfer check' }))
    await screen.findByText('A different delayed prompt')
    expect(JSON.parse(state.values[key]).attempts.at(-1).assisted).toBe(true)
  }, 15000)

  it('withholds delayed feedback until every answer is committed', async () => {
    const user = userEvent.setup()
    state.values[key] = JSON.stringify({ attempts: [{
      at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), completed: true,
      mode: 'practice', score: 2, total: 2, assisted: true, exerciseIds: ['p1', 'p2']
    }] })
    const two = { ...unit, transfer: [...unit.transfer, {
      id: 't2', prompt: 'Another cold prompt', answers: ['four'], explanation: 'The second cold result has separate feedback.'
    }] }
    mount(<LearningPractice unit={two} settingKey={key} />)
    await waitFor(() => expect(screen.getByRole('button', { name: 'Start delayed transfer check' })).toBeEnabled(), { timeout: 5000 })
    await user.click(screen.getByRole('button', { name: 'Start delayed transfer check' }))
    await user.type(await screen.findByRole('textbox', { name: 'Your answer' }), 'three')
    await user.click(screen.getByRole('button', { name: 'Check answer' }))
    await screen.findByText(/Feedback is withheld/)
    expect(screen.queryByText('The new scenario requires applying the same rule.')).not.toBeInTheDocument()
    expect(screen.queryByText('Accepted: three')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Next exercise' }))
    await user.type(screen.getByRole('textbox', { name: 'Your answer' }), 'four')
    await user.click(screen.getByRole('button', { name: 'Check answer' }))
    await screen.findByText(/Saved: 2 of 2/)
    expect(screen.getByText('The new scenario requires applying the same rule.')).toBeInTheDocument()
  }, 15000)
})

describe('LearningProject', () => {
  it('requires explicit evidence and labels saved work as self-assessed', async () => {
    const user = userEvent.setup()
    mount(<LearningProject settingKey={key} task="Write a new explanation." criteria={['I tested an edge case.', 'I named the help I used.']} />)
    const save = screen.getByRole('button', { name: 'Save self-assessed evidence' })
    expect(save).toBeDisabled()
    await user.click(screen.getByRole('checkbox', { name: 'I tested an edge case.' }))
    await user.click(screen.getByRole('checkbox', { name: 'I named the help I used.' }))
    expect(save).toBeDisabled()
    await user.click(screen.getByRole('textbox', { name: 'Your work and evidence' }))
    await user.paste('I changed the input, checked the empty case, and used the worked example to correct my explanation.')
    await waitFor(() => expect(save).toBeEnabled(), { timeout: 5000 })
    await user.click(save)
    await screen.findByText(/Self-assessed work saved/)
    expect(JSON.parse(state.values[key]).project.criteria).toHaveLength(2)
    expect(JSON.parse(state.values[key]).attempts).toEqual([])
  }, 15000)
})
