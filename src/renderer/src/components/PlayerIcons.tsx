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
