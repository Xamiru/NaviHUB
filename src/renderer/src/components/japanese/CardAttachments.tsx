import { useRef } from 'react'
import { mediaUrl } from '@shared/mediaUrl'
import type { JpCard } from '@shared/types'

// The frame and sentence audio captured when a card was mined off the video
// player. Rendered wherever a card's back is shown — a screenshot and a clip
// nobody ever sees would be worse than not capturing them at all.
//
// Page-local <audio> deliberately, never the global player queue: this is a
// two-second clip, and routing it through the queue would stop the user's music
// and log a play (the /japanese/listen and /japanese/pitch precedent).
export default function CardAttachments({
  card,
  className = 'mt-3'
}: {
  card: Pick<JpCard, 'imagePath' | 'audioPath'>
  className?: string
}): JSX.Element | null {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  if (!card.imagePath && !card.audioPath) return null

  const imgUrl = card.imagePath ? mediaUrl(card.imagePath) : null
  const audioUrl = card.audioPath ? mediaUrl(card.audioPath) : null

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {imgUrl && (
        <img
          src={imgUrl}
          alt=""
          className="max-h-40 rounded border border-base-700 object-contain"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      )}
      {audioUrl && (
        <button
          className="btn-ghost shrink-0 px-3 py-1 text-sm"
          title="Play the line as it was said"
          onClick={() => {
            audioRef.current?.pause()
            const el = new Audio(audioUrl)
            audioRef.current = el
            void el.play().catch(() => undefined)
          }}
        >
          ▶ Sentence audio
        </button>
      )}
    </div>
  )
}
