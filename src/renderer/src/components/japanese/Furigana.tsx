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
