import type { SavedQuote } from '@shared/types'
import { mediaUrl } from '@shared/mediaUrl'
import { quoteOfTheDay } from '@shared/quotes'
import QuoteText from './QuoteText'
import { QuoteAttribution } from './QuoteCard'
import { quoteArtPath } from '../../lib/quoteLinks'
import { localDayString } from '../../lib/archiveDisplay'

// Today's quote: the same one all day, chosen from the whole collection. Used
// above the Quotes wall and as the optional Home widget.
export default function QuoteOfTheDay({
  quotes,
  onOpen,
  heading = 'Quote of the day'
}: {
  quotes: SavedQuote[]
  onOpen?: (quote: SavedQuote) => void
  heading?: string
}) {
  const quote = quoteOfTheDay(quotes, localDayString(new Date()))
  if (!quote) return null
  const art = mediaUrl(quoteArtPath(quote))
  const sharp = Boolean(quote.backgroundPath)
  const body = (
    <>
      <QuoteText quote={quote} size="card" className="md:text-[2rem] md:leading-snug" />
      {quote.translation && (
        <p className="quote-translation mt-3 whitespace-pre-line text-sm italic text-ink-secondary">{quote.translation}</p>
      )}
    </>
  )
  return (
    <section
      aria-label={heading}
      className="relative overflow-hidden rounded-xl border border-line-subtle bg-surface-panel"
    >
      {art && (
        <img
          src={art}
          alt=""
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover ${
            sharp ? 'opacity-40' : 'quote-art opacity-35'
          }`}
        />
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-surface-panel/95 via-surface-panel/80 to-surface-panel/50"
      />
      <div className="relative px-6 py-7 md:px-10 md:py-9">
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-ink-muted">{heading}</p>
        {onOpen ? (
          <button
            type="button"
            className="block max-w-3xl border-l-2 border-accent pl-5 text-left"
            onClick={() => onOpen(quote)}
          >
            {body}
          </button>
        ) : (
          <div className="max-w-3xl border-l-2 border-accent pl-5">{body}</div>
        )}
        <QuoteAttribution quote={quote} className="mt-5 pl-5" />
      </div>
    </section>
  )
}
