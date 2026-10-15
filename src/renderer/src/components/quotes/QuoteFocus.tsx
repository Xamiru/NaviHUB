import { useEffect, useId } from 'react'
import type { SavedQuote } from '@shared/types'
import { mediaUrl } from '@shared/mediaUrl'
import Dialog from '../Dialog'
import QuoteText from './QuoteText'
import { QuoteAttribution } from './QuoteCard'

// One quote fills the screen over its title's art. Arrow keys step through the
// collection it was opened from; Escape closes.
export default function QuoteFocus({
  quotes,
  index,
  onIndex,
  onClose,
  onEdit
}: {
  quotes: SavedQuote[]
  index: number
  onIndex: (index: number) => void
  onClose: () => void
  onEdit?: (quote: SavedQuote) => void
}) {
  const titleId = useId()
  const quote = quotes[index]
  const count = quotes.length

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) return
      if (e.key === 'ArrowRight' && count > 1) {
        e.preventDefault()
        onIndex((index + 1) % count)
      } else if (e.key === 'ArrowLeft' && count > 1) {
        e.preventDefault()
        onIndex((index - 1 + count) % count)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, count, onIndex])

  if (!quote) return null
  // A chosen background is wide art and shows sharp; a cover or portrait is
  // blurred into a wash so it never fights the text.
  const sharp = mediaUrl(quote.backgroundPath)
  const wash = sharp ? null : mediaUrl(quote.coverPath ?? quote.speakerImagePath)

  return (
    <Dialog
      labelledBy={titleId}
      onClose={onClose}
      overlayClassName="fixed inset-0 z-50 bg-surface-canvas"
      panelClassName="relative h-full w-full overflow-hidden outline-none"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {sharp && (
          <img key={sharp} src={sharp} alt="" className="quote-enter h-full w-full object-cover" />
        )}
        {wash && (
          <img key={wash} src={wash} alt="" className="quote-art quote-enter h-full w-full object-cover opacity-50" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-surface-canvas/80 via-surface-canvas/70 to-surface-canvas/95" />
      </div>

      <h2 id={titleId} className="sr-only">
        Quote {index + 1} of {count}
      </h2>

      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between gap-3 px-6 py-4">
          <span className="text-sm text-ink-muted" aria-hidden="true">
            {index + 1} / {count}
          </span>
          <div className="flex items-center gap-2">
            {onEdit && quote.id != null && (
              <button type="button" className="btn-ghost" onClick={() => onEdit(quote)}>
                Edit
              </button>
            )}
            <button type="button" className="btn-ghost px-3" aria-label="Close" title="Close" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto px-6 pb-6 md:px-16">
          <figure key={quote.key} className="quote-enter w-full max-w-4xl">
            <div className="border-l-2 border-accent pl-6 md:pl-10">
              <QuoteText quote={quote} size="focus" />
              {quote.translation && (
                <p className="quote-translation mt-6 whitespace-pre-line text-lg italic text-ink-secondary md:text-xl">
                  {quote.translation}
                </p>
              )}
            </div>
            <figcaption className="mt-10 pl-6 md:pl-10">
              <QuoteAttribution quote={quote} large />
              {quote.note && (
                <p className="mt-6 max-w-2xl whitespace-pre-line text-sm text-ink-secondary">{quote.note}</p>
              )}
              {quote.themes.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {quote.themes.map((t) => (
                    <span key={t} className="chip text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </figcaption>
          </figure>
        </div>

        {count > 1 && (
          <div className="flex items-center justify-center gap-3 px-6 pb-6">
            <button
              type="button"
              className="btn-ghost"
              onClick={() => onIndex((index - 1 + count) % count)}
            >
              Previous
            </button>
            <span className="text-xs text-ink-muted">Arrow keys step through</span>
            <button type="button" className="btn-ghost" onClick={() => onIndex((index + 1) % count)}>
              Next
            </button>
          </div>
        )}
      </div>
    </Dialog>
  )
}
