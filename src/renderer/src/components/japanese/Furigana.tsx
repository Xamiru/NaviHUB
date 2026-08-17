import { parseFurigana } from '@shared/japanese/furigana'

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
  const segments = parseFurigana(text)
  return (
    <span className={className}>
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
