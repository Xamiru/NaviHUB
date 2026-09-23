/** @type {import('tailwindcss').Config} */
// Every themable color routes through CSS variables declared in styles.css.
// Semantic roles are preferred for shared chrome; the base/accent/gray palette
// remains available for content-specific composition and gradual migration.
// Vars hold "R G B" triplets so opacity modifiers keep working.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ['./src/renderer/index.html', './src/renderer/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          900: v('base-900'),
          800: v('base-800'),
          700: v('base-700'),
          600: v('base-600'),
          500: v('base-500')
        },
        accent: {
          DEFAULT: v('accent'),
          hover: v('accent-hover')
        },
        surface: {
          canvas: v('surface-canvas'),
          panel: v('surface-panel'),
          raised: v('surface-raised'),
          active: v('surface-active')
        },
        ink: {
          DEFAULT: v('ink-primary'),
          secondary: v('ink-secondary'),
          muted: v('ink-muted'),
          decorative: v('ink-decorative'),
          inverse: v('ink-inverse')
        },
        line: {
          subtle: v('line-subtle'),
          strong: v('line-strong')
        },
        signal: {
          live: v('signal-live'),
          link: v('signal-link'),
          anomaly: v('signal-anomaly'),
          affirmative: v('signal-affirmative'),
          caution: v('signal-caution')
        },
        gray: {
          50: v('gray-50'),
          100: v('gray-100'),
          200: v('gray-200'),
          300: v('gray-300'),
          400: v('gray-400'),
          500: v('gray-500'),
          600: v('gray-600'),
          700: v('gray-700'),
          800: v('gray-800'),
          900: v('gray-900'),
          950: v('gray-950')
        },
        white: v('white'),
        'paper-white': '#fff'
      },
      // Lain sharpens corners app-wide; normal values = Tailwind defaults.
      // 'full' deliberately NOT remapped (pills/avatars/spinner/progress knobs).
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)'
      }
    }
  },
  plugins: []
}
