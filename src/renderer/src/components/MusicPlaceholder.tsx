// Default cover art for music without artwork: a stylized girl — Lain-inspired
// bob with the asymmetric side-lock and X hairclip — lost in her headphones.
// Inline SVG (no asset pipeline, CSP-safe) that scales to any tile size;
// `slice` keeps it cover-cropped in non-square slots like the player bar.
export default function MusicPlaceholder({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="No cover art"
      className={className}
    >
      <rect width="200" height="200" fill="#14171f" />
      {/* faint "wired" traces */}
      <polyline
        points="0,152 34,152 44,142 200,142"
        fill="none"
        stroke="#64748b"
        strokeWidth="1"
        opacity="0.14"
      />
      <polyline
        points="200,26 150,26 142,34 0,34"
        fill="none"
        stroke="#64748b"
        strokeWidth="1"
        opacity="0.1"
      />

      {/* floating notes */}
      <g fill="#93a7cc" opacity="0.75">
        <ellipse cx="156" cy="60" rx="5.5" ry="4.2" transform="rotate(-18 156 60)" />
        <path d="M161,58.5 L161,37 C166,38.5 169,43 165.5,48.5 L163,46 L163,58.5 Z" />
      </g>
      <g fill="#93a7cc" opacity="0.4">
        <ellipse cx="36" cy="56" rx="4.5" ry="3.5" transform="rotate(-18 36 56)" />
        <path d="M40,55 L40,38 L52,35 L52,50 L50,50 L50,39.5 L42,41.5 L42,55 Z" />
        <ellipse cx="48" cy="52" rx="4.5" ry="3.5" transform="rotate(-18 48 52)" />
      </g>

      {/* sweater + neck */}
      <rect x="91" y="116" width="18" height="20" fill="#eed7c2" />
      <path d="M54,182 C57,148 76,134 100,134 C124,134 143,148 146,182 Z" fill="#454f63" />

      {/* back hair (bob) */}
      <path
        d="M61,96 C61,54 82,41 100,41 C118,41 139,54 139,96 C139,114 134,124 129,128 L71,128 C66,124 61,114 61,96 Z"
        fill="#7a5240"
      />
      {/* the long side-lock (viewer's right) */}
      <path
        d="M136,106 C146,128 145,152 138,170 C136,175 129,174 130,168 C135,150 134,130 128,112 Z"
        fill="#7a5240"
      />

      {/* face */}
      <ellipse cx="100" cy="94" rx="30" ry="33" fill="#f0d9c4" />
      {/* closed eyes */}
      <g fill="none" stroke="#5b4233" strokeWidth="2.2" strokeLinecap="round">
        <path d="M80,101 Q86,106 92,101" />
        <path d="M108,101 Q114,106 120,101" />
      </g>
      {/* blush + mouth */}
      <ellipse cx="79" cy="110" rx="4.5" ry="2.5" fill="#e8a898" opacity="0.35" />
      <ellipse cx="121" cy="110" rx="4.5" ry="2.5" fill="#e8a898" opacity="0.35" />
      <path d="M96,116 Q100,119 104,116" fill="none" stroke="#c08a72" strokeWidth="1.8" strokeLinecap="round" />

      {/* bangs with jagged fringe */}
      <path
        d="M69,88 C69,60 83,50 100,50 C117,50 131,60 131,88 L125,80 L118,90 L110,80 L100,90 L90,80 L82,90 L75,80 Z"
        fill="#845944"
      />

      {/* X hairclip on the side-lock */}
      <g stroke="#b9cba6" strokeWidth="2.6" strokeLinecap="round">
        <path d="M131,116 L141,126" />
        <path d="M141,116 L131,126" />
      </g>

      {/* headphones: band, cups, cable */}
      <path d="M58,90 C58,44 142,44 142,90" fill="none" stroke="#3d4450" strokeWidth="8" strokeLinecap="round" />
      <g>
        <rect x="50" y="80" width="17" height="31" rx="8" fill="#3d4450" />
        <rect x="133" y="80" width="17" height="31" rx="8" fill="#3d4450" />
        <rect x="53.5" y="86" width="3" height="19" rx="1.5" fill="#556075" />
        <rect x="143.5" y="86" width="3" height="19" rx="1.5" fill="#556075" />
      </g>
      <path d="M58,110 C52,138 62,152 56,182" fill="none" stroke="#3d4450" strokeWidth="2" />
    </svg>
  )
}
