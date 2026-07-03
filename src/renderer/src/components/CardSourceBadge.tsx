import CoverImage from './CoverImage'
import type { JpCard } from '@shared/types'

// Small "from <manga/VN>" attribution for mined vocabulary cards, shown on
// lesson tables and the review/quiz reveal panels. Renders nothing when the
// card has no resolved source (never mined, or the title was deleted).
export default function CardSourceBadge({ card }: { card: Pick<JpCard, 'sourceTitle' | 'sourceCoverPath'> }) {
  if (!card.sourceTitle) return null
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
      <CoverImage path={card.sourceCoverPath} alt={card.sourceTitle} className="h-6 w-6 shrink-0" />
      from {card.sourceTitle}
    </span>
  )
}
