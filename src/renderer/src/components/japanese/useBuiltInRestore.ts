import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { confirmDialog } from '../../lib/confirm'
import { toast } from '../../lib/toast'

// Built-in course rows the content sync leaves alone (edited or older text)
// and lessons/cards missing since keys were first assigned, plus the one
// confirmed restore. Shared by Settings → Learning → "Built-in course updates"
// and the Today banner so both use the same wording and the same question.

export function builtInSummary(edited: number, missing: number): string {
  return [
    edited ? `${edited} built-in ${edited === 1 ? 'item is' : 'items are'} edited or older text.` : '',
    missing ? `${missing} built-in ${missing === 1 ? 'item is' : 'items are'} missing from your library.` : ''
  ]
    .filter(Boolean)
    .join(' ')
}

export function useBuiltInRestore() {
  const queryClient = useQueryClient()
  const [busy, setBusy] = useState(false)

  async function restore(): Promise<void> {
    // The confirm states everything a restore replaces, deliberate edits
    // included, so it reads the full (hashing) status only now, on the click.
    const { edited, missing } = await queryClient.fetchQuery({
      queryKey: qk.japanese.builtInStatus,
      queryFn: () => api.japanese.builtInStatus()
    })
    if (edited + missing === 0) {
      await queryClient.invalidateQueries({ queryKey: qk.japanese.all })
      return
    }
    const parts = [
      edited ? `replace the text of ${edited} edited or older built-in ${edited === 1 ? 'item' : 'items'}` : null,
      missing ? `add ${missing} built-in ${missing === 1 ? 'item' : 'items'} your library does not have` : null
    ].filter(Boolean)
    const ok = await confirmDialog(
      `Restore the built-in courses? This will ${parts.join(' and ')}. Your edits to built-in lessons and cards are lost; review progress, your own lessons and cards, and anything you delete in the app from now on stay as they are.`,
      { confirmLabel: 'Restore built-in text', danger: true }
    )
    if (!ok) return
    setBusy(true)
    try {
      await api.japanese.restoreBuiltIn()
      toast('Built-in courses restored', 'success')
    } finally {
      await queryClient.invalidateQueries({ queryKey: qk.japanese.all })
      setBusy(false)
    }
  }

  return { busy, restore }
}
