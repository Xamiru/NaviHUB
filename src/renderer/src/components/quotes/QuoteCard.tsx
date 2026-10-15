import { Link } from 'react-router-dom'
import type { SavedQuote } from '@shared/types'
import { thumbUrl } from '@shared/mediaUrl'
import CoverImage from '../CoverImage'
import FavoriteButton from '../FavoriteButton'
import QuoteText from './QuoteText'
import { quoteArtPath, sourceHref, speakerHref } from '../../lib/quoteLinks'

// One quote on the wall. The line is the hero; the title's art sits behind it
// as a faint blurred wash so each card takes its mood from where it came from.
export default function QuoteCard({
  quote,
  onOpen,
  onEdit,
  onFavorite,
  onDelete,
  hideSource = false
}: {
  quote: SavedQuote
  onOpen: () => void
  onEdit?: () => void
  onFavorite?: () => void
  onDelete?: () => void
  hideSource?: boolean
}) {
  const art = thumbUrl(quoteArtPath(quote), 320)
  const editable = quote.id != null
  return (
    <article className="group relative mb-4 break-inside-avoid overflow-hidden rounded-xl border border-line-subtle bg-surface-panel">
      {art && (
        <img
          src={art}
          alt=""
          aria-hidden="true"
          className="quote-art pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
        />
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-panel/40 via-surface-panel/70 to-surface-panel/95"
      />
      <div className="relative p-5">
        <button
          type="button"
          onClick={onOpen}
          className="block w-full border-l-2 border-accent/70 pl-4 text-left"
          aria-label={`Open quote: ${quote.text.slice(0, 80)}`}
        >
          <QuoteText quote={quote} size="card" />
          {quote.translation && (
            <p className="quote-translation mt-3 whitespace-pre-line text-sm italic text-ink-secondary">
              {quote.translation}
            </p>
          )}
        </button>

        <div className="mt-4 flex items-end justify-between gap-3">
          <QuoteAttribution quote={quote} hideSource={hideSource} className="min-w-0" />
          {editable && onFavorite && (
            <div
              className={`ml-auto shrink-0 ${
                quote.favorite
                  ? ''
                  : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'
              }`}
            >
              <FavoriteButton
                active={quote.favorite}
                onClick={onFavorite}
                variant="compact"
                activeLabel="Unfavorite quote"
                inactiveLabel="Favorite quote"
              />
            </div>
          )}
        </div>

        {(quote.themes.length > 0 || quote.origin === 'vnNotebook') && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {quote.themes.map((t) => (
              <span key={t} className="chip text-xs">
                {t}
              </span>
            ))}
            {quote.origin === 'vnNotebook' && (
              <span className="chip text-xs text-ink-muted">VN notebook</span>
            )}
          </div>
        )}

        {editable && (
          <div className="absolute right-3 top-3 flex items-center gap-1 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none">
            {onEdit && (
              <button type="button" className="btn-ghost px-2 py-1 text-xs" onClick={onEdit}>
                Edit
              </button>
            )}
            {onDelete && (
              <button type="button" className="btn-ghost px-2 py-1 text-xs" onClick={onDelete}>
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

// Speaker portrait, name and source. Names link while their row still exists.
export function QuoteAttribution({
  quote,
  hideSource = false,
  large = false,
  className = ''
}: {
  quote: SavedQuote
  hideSource?: boolean
  large?: boolean
  className?: string
}) {
  const speakerTo = speakerHref(quote.speakerKind, quote.speakerId)
  const sourceTo = sourceHref(quote.mediaType, quote.mediaId)
  const showSource = !hideSource && quote.sourceTitle
  if (!quote.speakerName && !showSource && !quote.locator) return null
  const avatar = large ? 'h-12 w-12' : 'h-8 w-8'
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {quote.speakerImagePath && (
        <CoverImage
          path={quote.speakerImagePath}
          alt=""
          className={`${avatar} shrink-0 object-cover`}
          rounded="rounded-full"
          thumbWidth={160}
        />
      )}
      <div className={`min-w-0 ${large ? 'text-base' : 'text-sm'}`}>
        {quote.speakerName &&
          (speakerTo ? (
            <Link to={speakerTo} className="block truncate font-medium text-ink hover:text-accent">
              {quote.speakerName}
            </Link>
          ) : (
            <span className="block truncate font-medium text-ink">{quote.speakerName}</span>
          ))}
        <p className={`truncate text-ink-muted ${large ? 'text-sm' : 'text-xs'}`}>
          {showSource &&
            (sourceTo ? (
              <Link to={sourceTo} className="hover:text-accent">
                {quote.sourceTitle}
              </Link>
            ) : (
              <span>{quote.sourceTitle}</span>
            ))}
          {showSource && quote.locator && <span aria-hidden="true"> · </span>}
          {quote.locator && <span>{quote.locator}</span>}
        </p>
      </div>
    </div>
  )
}
