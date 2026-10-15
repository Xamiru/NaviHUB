import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import type { SavedQuote } from '@shared/types'
import QuoteCard from './QuoteCard'
import QuoteDialog from './QuoteDialog'
import QuoteFocus from './QuoteFocus'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { confirmDialog } from '../../lib/confirm'

// A wall of quote cards with focus mode, edit, favorite and delete — shared by
// /quotes and the Quotes surfaces on title, character and person pages.
export default function QuoteCollection({
  quotes,
  hideSource = false,
  columns = 'columns-1 md:columns-2 2xl:columns-3'
}: {
  quotes: SavedQuote[]
  hideSource?: boolean
  columns?: string
}) {
  const queryClient = useQueryClient()
  const [focus, setFocus] = useState<number | null>(null)
  const [editing, setEditing] = useState<SavedQuote | null>(null)

  const refresh = () => queryClient.invalidateQueries({ queryKey: qk.quotes.all })

  async function toggleFavorite(q: SavedQuote) {
    if (q.id == null) return
    await api.quotes.setFavorite(q.id, !q.favorite)
    await refresh()
  }

  async function remove(q: SavedQuote) {
    if (q.id == null) return
    const ok = await confirmDialog('Delete this quote? This cannot be undone.', {
      confirmLabel: 'Delete',
      danger: true
    })
    if (!ok) return
    await api.quotes.remove(q.id)
    await refresh()
  }

  return (
    <>
      <div className={`${columns} gap-4`}>
        {quotes.map((q, i) => (
          <QuoteCard
            key={q.key}
            quote={q}
            hideSource={hideSource}
            onOpen={() => setFocus(i)}
            onEdit={() => setEditing(q)}
            onFavorite={() => void toggleFavorite(q)}
            onDelete={() => void remove(q)}
          />
        ))}
      </div>
      {focus != null && quotes[focus] && (
        <QuoteFocus
          quotes={quotes}
          index={focus}
          onIndex={setFocus}
          onClose={() => setFocus(null)}
          onEdit={(q) => {
            setFocus(null)
            setEditing(q)
          }}
        />
      )}
      {editing && <QuoteDialog quote={editing} onClose={() => setEditing(null)} />}
    </>
  )
}
