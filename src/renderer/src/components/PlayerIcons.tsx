import type { ReactNode } from 'react'

// Inline SVG transport icons. The unicode glyphs they replace are a Windows
// trap: ⏮/⏭ are emoji-presentation-default codepoints, so Chromium hands them
// to Segoe UI Emoji and they render as blue pictures, and the ❚❚ pause hack
// never aligns with any font. These inherit currentColor and size with the
// button's font (1em), so every platform draws the same mono mark.

interface IconProps {
  className?: string
}

function Svg({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  )
}

// Nudged right of center — a geometrically centered triangle reads
// left-shifted inside a circular button.
export function PlayIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M5.5 3.1 L13.1 8 L5.5 12.9 Z" />
    </Svg>
  )
}

export function PauseIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3.6" y="3" width="3.2" height="10" rx="0.6" />
      <rect x="9.2" y="3" width="3.2" height="10" rx="0.6" />
    </Svg>
  )
}

export function PrevIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="2.8" y="3" width="2.2" height="10" rx="0.5" />
      <path d="M13.2 3 L6.6 8 L13.2 13 Z" />
    </Svg>
  )
}

export function NextIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M2.8 3 L9.4 8 L2.8 13 Z" />
      <rect x="11" y="3" width="2.2" height="10" rx="0.5" />
    </Svg>
  )
}

// Speaker + one arc: labels the widget's volume slider, where a text label
// would not fit. Same currentColor/1em contract as the transport marks.
export function VolumeIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M2 6.2 L4.8 6.2 L8.2 3.2 L8.2 12.8 L4.8 9.8 L2 9.8 Z" />
      <path
        d="M10.4 5.9 A3.4 3.4 0 0 1 10.4 10.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </Svg>
  )
}
