import { describe, it, expect } from 'vitest'
import {
  confirmDialog,
  answerConfirm,
  getConfirm,
  subscribeConfirm
} from '../src/renderer/src/lib/confirm'

// The store behind the in-app confirm dialog, which replaced window.confirm
// everywhere (Electron renders that as a native modal that steals keyboard
// focus from the page — see lib/confirm.ts). The contract that matters: the
// promise ALWAYS settles exactly once, or a destructive action's caller would
// hang forever.
describe('confirm store', () => {
  it('resolves true/false with the answer', async () => {
    const yes = confirmDialog('Delete this?')
    answerConfirm(getConfirm()!.id, true)
    expect(await yes).toBe(true)

    const no = confirmDialog('Delete this?')
    answerConfirm(getConfirm()!.id, false)
    expect(await no).toBe(false)
  })

  it('carries the label and danger flag through, with plain defaults', async () => {
    const p = confirmDialog('Download the catalog?')
    expect(getConfirm()).toMatchObject({ confirmLabel: 'OK', danger: false })
    answerConfirm(getConfirm()!.id, true)
    await p

    const q = confirmDialog('Delete it?', { confirmLabel: 'Delete', danger: true })
    expect(getConfirm()).toMatchObject({ confirmLabel: 'Delete', danger: true })
    answerConfirm(getConfirm()!.id, false)
    await q
  })

  it('shows one at a time and lets the next take over', async () => {
    const first = confirmDialog('First?')
    const second = confirmDialog('Second?')
    expect(getConfirm()!.message).toBe('First?')

    answerConfirm(getConfirm()!.id, true)
    expect(await first).toBe(true)
    expect(getConfirm()!.message).toBe('Second?')

    answerConfirm(getConfirm()!.id, false)
    expect(await second).toBe(false)
    expect(getConfirm()).toBeNull()
  })

  // The panel answers on both click and keydown; whichever lands second must
  // not settle the promise again (or re-answer whatever queued up behind it).
  it('ignores a stale id', async () => {
    const p = confirmDialog('Delete?')
    const { id } = getConfirm()!
    answerConfirm(id, true)
    expect(await p).toBe(true)

    const next = confirmDialog('Another?')
    answerConfirm(id, false) // the old dialog's second answer
    expect(getConfirm()!.message).toBe('Another?')
    answerConfirm(getConfirm()!.id, true)
    expect(await next).toBe(true)
  })

  // useSyncExternalStore re-renders on every emit and compares snapshots by
  // identity, so the head must stay the same object while it is on screen.
  it('keeps a stable snapshot and notifies subscribers', async () => {
    let notifications = 0
    const unsubscribe = subscribeConfirm(() => notifications++)

    const p = confirmDialog('Delete?')
    expect(notifications).toBe(1)
    const snapshot = getConfirm()
    expect(getConfirm()).toBe(snapshot)

    answerConfirm(snapshot!.id, false)
    expect(notifications).toBe(2)
    expect(getConfirm()).toBeNull()
    await p
    unsubscribe()
  })
})
