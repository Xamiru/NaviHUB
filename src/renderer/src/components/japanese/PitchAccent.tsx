import { splitMora } from '@shared/kana'

// Renders a kana reading with its pitch-accent contour, Yomitan-style: an
// overline over the high morae and a downstep mark (right border) on the last
// high mora before the pitch drops. `position` is the downstep mora (0 = heiban,
// no drop; 1 = atamadaka; ≥2 = nakadaka/odaka).
export default function PitchAccent({
  reading,
  position
}: {
  reading: string
  position: number
}): JSX.Element | null {
  const morae = splitMora(reading)
  if (morae.length === 0) return null

  const isHigh = (i: number): boolean => {
    if (position === 0) return i !== 0 // heiban: low, then high and stays high
    if (position === 1) return i === 0 // atamadaka: high, then low
    return i !== 0 && i < position // naka/odaka: low, high up to the drop
  }

  return (
    <span className="inline-flex items-end align-middle" title={`pitch [${position}]`}>
      {morae.map((mora, i) => {
        const high = isHigh(i)
        // A drop is drawn when a high mora is followed by a low one (only when
        // the word actually has a downstep — heiban never drops).
        const drop = position !== 0 && high && !isHigh(i + 1)
        const cls = [
          'inline-block px-[1px] leading-none',
          high ? 'border-t border-accent' : '',
          drop ? 'border-r border-accent' : ''
        ]
          .filter(Boolean)
          .join(' ')
        return (
          <span key={i} className={cls}>
            {mora}
          </span>
        )
      })}
      <span className="ml-1 text-[10px] text-gray-500">[{position}]</span>
    </span>
  )
}
