import { useQuery } from '@tanstack/react-query'
import type { SavedQuote } from '@shared/types'
import { furiganaMarkup, hasKanji, isJapanese, quoteScale, type QuoteScale } from '@shared/quotes'
import Furigana from '../japanese/Furigana'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'

const SIZES: Record<'card' | 'focus', Record<QuoteScale, string>> = {
  card: {
    xl: 'text-[1.7rem] leading-snug',
    lg: 'text-[1.35rem] leading-snug',
    md: 'text-lg leading-relaxed',
    sm: 'text-base leading-relaxed'
  },
  focus: {
    xl: 'text-4xl md:text-6xl leading-tight',
    lg: 'text-3xl md:text-4xl leading-snug',
    md: 'text-2xl md:text-3xl leading-snug',
    sm: 'text-lg md:text-xl leading-relaxed'
  }
}

// Readings for Japanese text that was never annotated (a VN notebook quote):
// tokenized once per text and cached; saved quotes carry their own markup.
function useAutoFurigana(text: string, enabled: boolean): string | null {
  const { data } = useQuery({
    queryKey: qk.quoteFurigana(text),
    queryFn: async () => furiganaMarkup(text, await api.japanese.tokenize(text)),
    enabled,
    staleTime: Infinity
  })
  return data ?? null
}

export default function QuoteText({
  quote,
  size,
  className = ''
}: {
  quote: Pick<SavedQuote, 'text' | 'furigana' | 'origin'>
  size: 'card' | 'focus'
  className?: string
}) {
  const japanese = isJapanese(quote.text)
  const auto = useAutoFurigana(
    quote.text,
    quote.origin === 'vnNotebook' && !quote.furigana && hasKanji(quote.text)
  )
  const markup = quote.furigana ?? auto
  const scale = quoteScale(quote.text)
  return (
    <blockquote
      lang={japanese ? 'ja' : undefined}
      className={`quote-serif whitespace-pre-line text-ink ${SIZES[size][scale]} ${
        markup ? 'leading-[1.9]' : ''
      } ${className}`}
    >
      {markup ? <Furigana text={markup} /> : quote.text}
    </blockquote>
  )
}
