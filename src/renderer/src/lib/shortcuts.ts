// Every app-wide keyboard shortcut, in one list Settings → Backup & about shows
// and the readers' "?" help overlays read. The handlers live where they act
// (TabbedRouter, PlayerShortcuts, CommandPalette, the readers);
// tests/renderer/shortcuts.test.ts holds this list against their key codes.

export interface ShortcutRow {
  keys: string[]
  label: string
}

export interface ShortcutGroup {
  title: string
  note?: string
  rows: ShortcutRow[]
}

export const MANGA_READER_SHORTCUTS: ShortcutRow[] = [
  { keys: ['←', '→'], label: 'Turn page (direction-aware)' },
  { keys: ['Space'], label: 'Next page (Shift = previous)' },
  { keys: ['Home', 'End'], label: 'First / last page' },
  { keys: ['S', 'D', 'V'], label: 'Single / double / scroll mode' },
  { keys: ['F'], label: 'Cycle fit: height, width, original' },
  { keys: ['R'], label: 'Reading direction RTL ↔ LTR' },
  { keys: ['C'], label: 'Cover page alone (double mode)' },
  { keys: ['O'], label: 'OCR overlay on/off' },
  { keys: ['M'], label: 'Mine words (tap a speech bubble)' },
  { keys: ['+', '−', '0'], label: 'Zoom in / out / reset' },
  { keys: ['Esc'], label: 'Close panels / back to series' }
]

export const BOOK_READER_SHORTCUTS: ShortcutRow[] = [
  { keys: ['←', '→'], label: 'Previous / next section' },
  { keys: ['Space'], label: 'Scroll a screenful (Shift = back)' },
  { keys: ['↑', '↓'], label: 'Scroll a little' },
  { keys: ['Home', 'End'], label: 'First / last section' },
  { keys: ['T'], label: 'Table of contents' },
  { keys: ['V'], label: 'Vertical ↔ horizontal text' },
  { keys: ['+', '−'], label: 'Text size' },
  { keys: ['M'], label: 'Mine words (then tap a paragraph)' },
  { keys: ['Q'], label: 'Save the selected text as a quote' },
  { keys: ['Esc'], label: 'Close panels / back to series' }
]

export const VIDEO_PLAYER_SHORTCUTS: ShortcutRow[] = [
  { keys: ['Space', 'K'], label: 'Play / pause' },
  { keys: ['←', '→'], label: 'Back / forward 5 s (Shift = 1 s)' },
  { keys: ['J', 'L'], label: 'Back / forward 10 s' },
  { keys: [',', '.'], label: 'Previous / next frame (while paused)' },
  { keys: ['Home', 'End'], label: 'Jump to the start (or range start) / the end' },
  { keys: ['A', 'D', 'Ctrl+←', 'Ctrl+→'], label: 'Previous / next subtitle line' },
  { keys: ['R'], label: 'Replay the current line' },
  { keys: ['Shift+R', 'Shift+L'], label: 'Replay / loop the study range' },
  { keys: ['↑', '↓', 'Shift+M'], label: 'Volume up / down, mute' },
  { keys: ['[', ']', '\\'], label: 'Slower / faster / normal speed' },
  { keys: ['S', 'B'], label: 'Subtitles on/off, second track' },
  { keys: ['Shift+S'], label: 'Next subtitle track' },
  { keys: ['-', '='], label: 'Subtitles earlier / later (remembered per show)' },
  { keys: ['T', 'M', 'C'], label: 'Transcript, mining panel, capture' },
  { keys: ['Q'], label: 'Save the line on screen as a quote' },
  { keys: ['N', 'P'], label: 'Next / previous file' },
  { keys: ['F', 'O'], label: 'Fullscreen, open externally' },
  { keys: ['Double-click'], label: 'Fullscreen (a single click does nothing)' },
  { keys: ['0-9'], label: 'Jump to 0-90 percent' },
  { keys: ['Esc', 'Backspace'], label: 'Close panels / leave the player' }
]

export const SHORTCUT_GROUPS: ShortcutGroup[] = [
  {
    title: 'Navigation',
    rows: [
      { keys: ['Ctrl+K'], label: 'Search everything (command palette)' },
      { keys: ['/'], label: 'Search, when not typing in a field' },
      { keys: ['Alt+←', 'Alt+→'], label: 'Back / forward' },
      { keys: ['Mouse back', 'Mouse forward'], label: 'Back / forward' },
      { keys: ['Ctrl+wheel'], label: 'Interface zoom (outside the readers)' }
    ]
  },
  {
    title: 'Browser tabs',
    note: 'Up to eight tabs. Ctrl+click or middle-click a link to open it in a background tab.',
    rows: [
      { keys: ['Ctrl+T'], label: 'New tab' },
      { keys: ['Ctrl+Shift+T'], label: 'Reopen the last closed tab' },
      { keys: ['Ctrl+W'], label: 'Close the tab' },
      { keys: ['Ctrl+Shift+K'], label: 'Duplicate the tab' },
      { keys: ['Ctrl+Tab', 'Ctrl+Shift+Tab'], label: 'Next / previous tab' },
      { keys: ['Ctrl+PageDown', 'Ctrl+PageUp'], label: 'Next / previous tab' },
      { keys: ['Ctrl+1', 'Ctrl+8'], label: 'Go to tab 1 to 8' },
      { keys: ['Ctrl+9'], label: 'Go to the last tab' }
    ]
  },
  {
    title: 'Music player',
    note: 'Active once something is playing, outside the Japanese, English, Programming and Quiz sections (those pages use the keys themselves).',
    rows: [
      { keys: ['Space'], label: 'Play / pause' },
      { keys: ['PageUp', 'PageDown'], label: 'Previous / next track' },
      { keys: ['←', '→'], label: 'Seek 10 seconds' },
      { keys: ['↑', '↓'], label: 'Volume' }
    ]
  },
  { title: 'Manga reader', note: 'Press ? inside the reader for this list.', rows: MANGA_READER_SHORTCUTS },
  { title: 'Book reader', note: 'Press ? inside the reader for this list.', rows: BOOK_READER_SHORTCUTS },
  { title: 'Video player', note: 'Press ? inside the player for this list.', rows: VIDEO_PLAYER_SHORTCUTS }
]
