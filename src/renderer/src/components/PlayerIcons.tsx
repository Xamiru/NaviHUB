import type { ReactNode } from 'react'

// Inline SVG transport icons. The unicode glyphs they replace are a Windows
// trap: ⏮/⏭ are emoji-presentation-default codepoints, so Chromium hands them
// to Segoe UI Emoji and they render as blue pictures, and the ❚❚ pause hack
// never aligns with any font. These inherit currentColor and size with the
// button's font (1em), so every platform draws the same mono mark.

interface IconProps {
  className?: string
}

interface HeartIconProps extends IconProps {
  filled?: boolean
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

export function ShuffleIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 4h2.1c3.5 0 4.3 8 7.8 8H14" />
        <path d="m11.8 9.8 2.2 2.2-2.2 2.2" />
        <path d="M2 12h2.1c1.1 0 2-.8 2.8-1.9M9.1 5.9C10 4.8 10.8 4 11.9 4H14" />
        <path d="m11.8 1.8 2.2 2.2-2.2 2.2" />
      </g>
    </Svg>
  )
}

export function RepeatIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 5h8.7L10 3.3M13 11H4.3L6 12.7" />
        <path d="M13 5v2M3 11V9" />
      </g>
    </Svg>
  )
}

export function QueueIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M2.5 4h11M2.5 8h11M2.5 12h7" />
      </g>
      <path d="M11 10.2 14 12l-3 1.8Z" />
    </Svg>
  )
}

export function ExpandIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3H3v3M10 3h3v3M6 13H3v-3M10 13h3v-3" />
      </g>
    </Svg>
  )
}

export function PopOutIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 4H3v9h9V9" />
        <path d="M8 3h5v5M13 3 7 9" />
      </g>
    </Svg>
  )
}

export function HeartIcon({ className, filled = true }: HeartIconProps) {
  return (
    <Svg className={className}>
      <path
        d="M8 13.4 2.8 8.5C-.2 5.7 1.7 1.7 5 2.2c1.2.2 2.2.9 3 1.9 1-1 1.8-1.7 3-1.9 3.3-.5 5.2 3.5 2.2 6.3Z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export function PlaylistAddIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.5 4h7M2.5 8h5M2.5 12h4" />
        <path d="M11.5 7.5v6M8.5 10.5h6" />
      </g>
    </Svg>
  )
}

export function DownloadIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 2.5v7M5.2 7.2 8 10l2.8-2.8" />
        <path d="M3 12.8h10" />
      </g>
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
