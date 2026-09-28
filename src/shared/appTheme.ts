export const APP_THEME_SETTING = 'ui.theme'

export const APP_THEME_OPTIONS = [
  {
    value: 'lain',
    label: 'Lain',
    subtitle: 'Wired, after dark',
    description: 'Black violet, dusty rose signals and the quiet atmosphere of the Wired.'
  },
  {
    value: 'metal-gear',
    label: 'Metal Gear',
    subtitle: 'Solid / Ink',
    description: 'Codec green, field dossiers and Shadow Moses at night, with Yoji Shinkawa artwork.'
  },
  {
    value: 'miku',
    label: 'Hatsune Miku',
    subtitle: 'Beyond the blue',
    description: 'Crypton teal, open sky or the concert stage, with soft lettering and official art.'
  },
  {
    value: 'twin-peaks',
    label: 'Twin Peaks',
    subtitle: 'The waiting room',
    description: 'The Red Room, the Douglas firs and the Black Lodge, from the series and Fire Walk with Me.'
  },
  {
    value: 'seinfeld',
    label: 'Seinfeld',
    subtitle: 'The show about nothing',
    description: 'A comedy-club stage in the logo red and yellow, with Jerry, George, Elaine, Kramer and Newman.'
  },
  {
    value: 'berserk',
    label: 'Berserk',
    subtitle: 'Struggle',
    description: "The Deluxe Edition's black leather and red foil, with Kentaro Miura's manga art."
  },
  {
    value: 'one-piece',
    label: 'One Piece',
    subtitle: 'The Grand Line',
    description: 'Wanted-poster parchment, the logo blue and hat-band red, from the anime before the timeskip.'
  },
  {
    value: 'jojo',
    label: "JoJo's Bizarre Adventure",
    subtitle: 'Stand proud',
    description: 'Stardust Crusaders, Diamond is Unbreakable or Golden Wind, with their Stand parameter cards.'
  }
] as const

export type AppTheme = (typeof APP_THEME_OPTIONS)[number]['value']

export function parseAppTheme(value: string | null | undefined): AppTheme {
  return APP_THEME_OPTIONS.some((option) => option.value === value)
    ? (value as AppTheme)
    : 'lain'
}

// Each theme offers one to three styles. The values are stored per theme in the
// settings table, so they are frozen keys: renaming one orphans a choice.
export const APP_THEME_VARIANT_OPTIONS = {
  lain: [
    { value: 'present-day', label: 'Present day', description: 'Status readout, rolling scanline and ABe cover art.' },
    { value: 'copland', label: 'Copland OS', description: 'Panels as Copland OS windows with the 1998 boot screen.' },
    { value: 'red-shadows', label: 'Red shadows', description: 'Crimson accents, dotted red shadows and Lain among the wires.' }
  ],
  'metal-gear': [
    { value: 'codec', label: 'Codec', description: 'Paper and ink, with your next session as a codec call.' },
    { value: 'dossier', label: 'Dossier', description: 'Kraft paper, folder tabs, typewriter notes and a file stamp.' },
    { value: 'shadow-moses', label: 'Shadow Moses', description: 'Night green, falling snow and a Soliton radar.' }
  ],
  miku: [
    { value: 'crypton-teal', label: 'Crypton teal', description: "Crypton's official blue-green with RITAO's MIKU EXPO art." },
    { value: 'open-sky', label: 'Open sky', description: 'Sky gradient, frosted white panels and KEI art.' },
    { value: 'concert-night', label: 'Concert night', description: 'Navy stage, teal glow and the Magical Mirai key visual.' }
  ],
  'twin-peaks': [
    { value: 'waiting-room', label: 'Waiting room', description: 'Curtain red, the chevron floor and the Red Room photograph.' },
    { value: 'douglas-firs', label: 'Douglas firs', description: 'Fir green and sawmill brown with the forest key art.' },
    { value: 'black-lodge', label: 'Black Lodge', description: 'Black and ivory press photography with red only for actions.' }
  ],
  seinfeld: [
    { value: 'stand-up', label: 'Stand-up', description: 'Dark brick, the red-and-yellow logo and Jerry mid-routine.' }
  ],
  berserk: [
    { value: 'deluxe-edition', label: 'Deluxe Edition', description: 'Leather grain, the embossed Brand, foil red and Guts in Miura\'s ink.' }
  ],
  'one-piece': [
    { value: 'grand-line', label: 'Grand Line', description: 'Parchment, the crew in the eyecatch spyglass and a Wanted poster for your next session.' }
  ],
  jojo: [
    { value: 'stardust-crusaders', label: 'Stardust Crusaders', description: "The opening's violet desert sky and the Magician's Red card." },
    { value: 'diamond-is-unbreakable', label: 'Diamond is Unbreakable', description: "Morioh's mustard skies, Josuke's purple and the Crazy Diamond card." },
    { value: 'golden-wind', label: 'Golden Wind', description: "Navy and gold filigree and Gold Experience's checkerboard card." }
  ]
} as const satisfies Record<AppTheme, readonly { value: string; label: string; description: string }[]>

export type AppThemeVariant<T extends AppTheme = AppTheme> =
  (typeof APP_THEME_VARIANT_OPTIONS)[T][number]['value']

export function appThemeVariantSetting(theme: AppTheme): string {
  return `ui.themeVariant.${theme}`
}

export function parseAppThemeVariant<T extends AppTheme>(
  theme: T,
  value: string | null | undefined
): AppThemeVariant<T> {
  const options: readonly { value: string }[] = APP_THEME_VARIANT_OPTIONS[theme]
  return (options.some((option) => option.value === value) ? value : options[0].value) as AppThemeVariant<T>
}

// BrowserWindow paints this before the renderer exists. Keep these values in
// sync with styles.css so a launch never flashes another style's canvas.
const BACKGROUNDS: { [T in AppTheme]: Record<AppThemeVariant<T>, string> } = {
  lain: { 'present-day': '#0f0d15', copland: '#0f0d15', 'red-shadows': '#0c090c' },
  'metal-gear': { codec: '#e4e6e0', dossier: '#e2d6b8', 'shadow-moses': '#0d1512' },
  miku: { 'crypton-teal': '#7ed9d3', 'open-sky': '#d6f0f8', 'concert-night': '#091228' },
  'twin-peaks': { 'waiting-room': '#170e0c', 'douglas-firs': '#10140f', 'black-lodge': '#0c0c0c' },
  seinfeld: { 'stand-up': '#1c1818' },
  berserk: { 'deluxe-edition': '#1a181b' },
  'one-piece': { 'grand-line': '#f0e4be' },
  jojo: { 'stardust-crusaders': '#231c1e', 'diamond-is-unbreakable': '#f6f0e2', 'golden-wind': '#141a33' }
}

export function appThemeBackground(theme: AppTheme, variant?: string | null): string {
  const fills: Record<string, string> = BACKGROUNDS[theme]
  return fills[parseAppThemeVariant(theme, variant)]
}
