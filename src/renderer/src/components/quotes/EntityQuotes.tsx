import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { QuoteFilter } from '@shared/types'
import Section from '../Section'
import QuoteCollection from './QuoteCollection'
import QuoteDialog, { type QuoteSeed } from './QuoteDialog'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'

// A speaker's quotes on their own page. Renders nothing until one is saved, so
// pages without quotes look exactly as they did.
export function EntityQuotesSection({ filter }: { filter: QuoteFilter }) {
  const { data } = useQuery({
    queryKey: qk.quotes.list(filter),
    queryFn: () => api.quotes.list(filter)
  })
  if (!data?.length) return null
  return (
    <Section title={`Quotes · ${data.length}`}>
      <QuoteCollection quotes={data} columns="columns-1 lg:columns-2" />
    </Section>
  )
}

// A quiet header action that opens the Add quote dialog already pointing at
// this page's character, person or wrestler.
export function AddQuoteButton({ seed, className = 'btn-ghost' }: { seed: QuoteSeed; className?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        Add quote
      </button>
      {open && <QuoteDialog seed={seed} onClose={() => setOpen(false)} />}
    </>
  )
}
