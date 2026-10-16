import { alignFurigana, parseFurigana, type FuriganaSegment } from '@shared/japanese/furigana'

// Renders the graded-reading furigana notation (漢字[かんじ]) as <ruby>. The
// toggle hides the readings with `invisible` rather than by not rendering them,
// so the line height never jumps when the learner turns them off mid-passage.
export default function Furigana({
  text,
  show = true,
  className = ''
}: {
  text: string
  show?: boolean
  className?: string
}) {
  return <RubySegments segments={parseFurigana(text)} show={show} className={className} />
}

// A single word with its dictionary reading, the reading over the kanji only.
// Used where cards store word and reading separately (reviews, quizzes, Today).
export function WordFurigana({
  word,
  reading,
  show = true,
  className = ''
}: {
  word: string
  reading: string | null | undefined
  show?: boolean
  className?: string
}) {
  return <RubySegments segments={alignFurigana(word, reading)} show={show} className={className} />
}

// Text with its full kana reading: the reading over each kanji run when it
// aligns unambiguously, otherwise the reading printed after (inline) or under
// (block) the text. `show` hides both forms, keeping the ruby's line height.
export function ReadingText({
  text,
  reading,
  show = true,
  fallback = 'block',
  className = ''
}: {
  text: string
  reading: string | null | undefined
  show?: boolean
  fallback?: 'inline' | 'block'
  className?: string
}) {
  const segments = alignFurigana(text, reading)
  if (segments.some((seg) => seg.ruby)) {
    return <RubySegments segments={segments} show={show} className={className} />
  }
  const extra = show && reading && reading !== text
  return (
    <>
      <span className={className} lang="ja">
        {text}
      </span>
      {extra &&
        (fallback === 'block' ? (
          <span className="block text-sm text-gray-500" lang="ja">
            {reading}
          </span>
        ) : (
          <span className="ml-1.5 text-xs text-gray-500" lang="ja">
            {reading}
          </span>
        ))}
    </>
  )
}

function RubySegments({
  segments,
  show,
  className
}: {
  segments: FuriganaSegment[]
  show: boolean
  className: string
}) {
  return (
    <span className={className} lang="ja">
      {segments.map((seg, i) =>
        seg.ruby ? (
          <ruby key={i}>
            {seg.text}
            <rt className={show ? '' : 'invisible'}>{seg.ruby}</rt>
          </ruby>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </span>
  )
}
