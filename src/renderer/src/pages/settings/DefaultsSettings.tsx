import { useState, type ReactNode } from 'react'
import { Field } from '../../components/Field'
import { confirmDialog } from '../../lib/confirm'
import { toast } from '../../lib/toast'
import {
  BOOK_DEFAULTS,
  MANGA_READER_DEFAULTS,
  loadBookReaderPrefs,
  loadMangaReaderPrefs,
  saveBookReaderPrefs,
  saveMangaReaderPrefs,
  type BookPrefs,
  type MangaReaderPrefs
} from '../../lib/readerPrefs'
import {
  QUIZ_DEFAULTS,
  SONG_SNIPPET_CHOICES,
  loadQuizDefaults,
  saveQuizDefaults,
  type QuizDefaults
} from '../../lib/quizPrefs'
import {
  DEFAULT_LIST_SORT,
  DEFAULT_SCOPE,
  LIBRARY_SORTS,
  clearListOverrides,
  loadListLayout,
  loadListSort,
  saveListLayout,
  saveListSort,
  type ListLayout
} from '../../lib/listSortPrefs'
import { DEFAULT_JP_DAILY_TARGET, loadJpDailyTarget, saveJpDailyTarget } from '../../lib/japanesePrefs'
import {
  KEYBOARD_DEFAULTS,
  loadJpKeyboardPrefs,
  saveJpKeyboardPrefs,
  type JpKeyboardLayout
} from '../../components/japanese/keyboard/keyboardPrefs'
import { SettingCard } from './shared'

// These settings live in this machine's local preferences (not the library
// database), so they apply here only and save as soon as they change.

function Choice<T extends string | number>({
  label,
  value,
  options,
  onChange
}: {
  label: string
  value: T
  options: readonly { value: T; label: string }[]
  onChange: (value: T) => void
}) {
  return (
    <Field label={label}>
      <select
        className="input"
        value={String(value)}
        onChange={(e) => {
          const picked = options.find((o) => String(o.value) === e.target.value)
          if (picked) onChange(picked.value)
        }}
      >
        {options.map((o) => (
          <option key={String(o.value)} value={String(o.value)}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  )
}

function Check({
  label,
  checked,
  onChange
}: {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-ink">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  )
}

function DefaultsBody({ children, onReset }: { children: ReactNode; onReset: () => void }) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
      <div className="mt-5">
        <button type="button" className="btn-ghost" onClick={onReset}>
          Reset to defaults
        </button>
      </div>
    </>
  )
}

async function confirmReset(what: string): Promise<boolean> {
  return confirmDialog(`Reset the ${what} to NaviHUB's defaults?`, { confirmLabel: 'Reset' })
}

// One local-preference group: state seeded from storage, every change saved.
function usePrefs<T>(load: () => T, save: (value: T) => void): [T, (patch: Partial<T>) => void, (value: T) => void] {
  const [value, setValue] = useState(load)
  const replace = (next: T) => {
    save(next)
    setValue(next)
  }
  return [value, (patch) => replace({ ...value, ...patch }), replace]
}

const DIRECTIONS = [
  { value: 'desc' as const, label: 'Descending' },
  { value: 'asc' as const, label: 'Ascending' }
]
const LAYOUTS: { value: ListLayout; label: string }[] = [
  { value: 'grid', label: 'Covers' },
  { value: 'list', label: 'List' }
]

export function ListDefaultsSettings() {
  const [sort, setSort, replaceSort] = usePrefs(
    () => loadListSort(DEFAULT_SCOPE),
    (next) => saveListSort(DEFAULT_SCOPE, next)
  )
  const [layout, setLayoutState] = useState<ListLayout>(() => loadListLayout(DEFAULT_SCOPE))
  const setLayout = (next: ListLayout) => {
    saveListLayout(DEFAULT_SCOPE, next)
    setLayoutState(next)
  }

  return (
    <SettingCard
      title="Library list defaults"
      description="How a library opens until you pick something else on it. Each library still remembers its own choice; use the button below to put every library back on these."
    >
      <DefaultsBody
        onReset={async () => {
          if (!(await confirmReset('library list defaults'))) return
          replaceSort(DEFAULT_LIST_SORT)
          setLayout('grid')
        }}
      >
        <Choice label="Sort by" value={sort.sort} options={LIBRARY_SORTS} onChange={(v) => setSort({ sort: v })} />
        <Choice label="Order" value={sort.dir} options={DIRECTIONS} onChange={(v) => setSort({ dir: v })} />
        <Choice label="Layout" value={layout} options={LAYOUTS} onChange={setLayout} />
      </DefaultsBody>
      <button
        type="button"
        className="btn-ghost mt-2"
        onClick={async () => {
          const ok = await confirmDialog(
            'Make every library use these defaults? Each library forgets the sort and layout it remembered.',
            { confirmLabel: 'Use everywhere' }
          )
          if (!ok) return
          clearListOverrides()
          toast('Every library now uses the defaults', 'success')
        }}
      >
        Use for every library
      </button>
    </SettingCard>
  )
}

const DAILY_TARGETS = [0, 5, 10, 20].map((n) => ({
  value: n,
  label: n === 0 ? 'No new cards' : `${n} new cards a day`
}))
const KEYBOARD_LAYOUTS: { value: JpKeyboardLayout; label: string }[] = [
  { value: 'gojuon', label: 'Gojūon grid' },
  { value: 'flick', label: 'Flick (phone style)' },
  { value: 'qwerty', label: 'Romaji (QWERTY)' }
]

export function JapaneseDefaultsSettings() {
  const [target, setTargetState] = useState(loadJpDailyTarget)
  const setTarget = (next: number) => {
    saveJpDailyTarget(next)
    setTargetState(next)
  }
  const [keyboard, setKeyboard, replaceKeyboard] = usePrefs(loadJpKeyboardPrefs, saveJpKeyboardPrefs)

  return (
    <SettingCard
      title="Japanese study defaults"
      description="The daily new-card target and the on-screen kana keyboard used in drills."
    >
      <DefaultsBody
        onReset={async () => {
          if (!(await confirmReset('Japanese study defaults'))) return
          setTarget(DEFAULT_JP_DAILY_TARGET)
          replaceKeyboard(KEYBOARD_DEFAULTS)
        }}
      >
        <Choice label="Daily new cards" value={target} options={DAILY_TARGETS} onChange={setTarget} />
        <Choice
          label="Kana keyboard"
          value={keyboard.layout}
          options={KEYBOARD_LAYOUTS}
          onChange={(v) => setKeyboard({ layout: v })}
        />
        <Check
          label="Show romaji hints on the keyboard"
          checked={keyboard.romajiHints}
          onChange={(v) => setKeyboard({ romajiHints: v })}
        />
      </DefaultsBody>
    </SettingCard>
  )
}

const MANGA_MODES = [
  { value: 'single' as const, label: 'Single page' },
  { value: 'double' as const, label: 'Double spread' },
  { value: 'vertical' as const, label: 'Vertical scroll' }
]
const MANGA_FITS = [
  { value: 'height' as const, label: 'Fit height' },
  { value: 'width' as const, label: 'Fit width' },
  { value: 'original' as const, label: 'Original size' }
]
const MANGA_DIRECTIONS = [
  { value: 'rtl' as const, label: 'Right to left' },
  { value: 'ltr' as const, label: 'Left to right' }
]

export function MangaReaderDefaultsSettings() {
  const [prefs, setPrefs, replace] = usePrefs<MangaReaderPrefs>(loadMangaReaderPrefs, saveMangaReaderPrefs)
  return (
    <SettingCard
      title="Manga reader defaults"
      description="The manga reader opens with these. Changing them inside the reader changes them here too."
    >
      <DefaultsBody
        onReset={async () => {
          if (await confirmReset('manga reader settings')) replace(MANGA_READER_DEFAULTS)
        }}
      >
        <Choice label="Mode" value={prefs.mode} options={MANGA_MODES} onChange={(v) => setPrefs({ mode: v })} />
        <Choice label="Fit" value={prefs.fit} options={MANGA_FITS} onChange={(v) => setPrefs({ fit: v })} />
        <Choice
          label="Reading direction"
          value={prefs.direction}
          options={MANGA_DIRECTIONS}
          onChange={(v) => setPrefs({ direction: v })}
        />
        <Check
          label="Show the cover alone in double mode"
          checked={prefs.coverOffset}
          onChange={(v) => setPrefs({ coverOffset: v })}
        />
      </DefaultsBody>
    </SettingCard>
  )
}

const FONT_SIZES = Array.from({ length: 17 }, (_, i) => 12 + i).map((n) => ({ value: n, label: `${n}px` }))
const LINE_HEIGHT_CHOICES = [1.6, 1.9, 2.2].map((n) => ({ value: n, label: String(n) }))
const WIDTH_CHOICES = [600, 700, 850, 1100].map((n) => ({ value: n, label: `${n}px` }))
const BOOK_THEMES = [
  { value: 'dark' as const, label: 'Dark' },
  { value: 'black' as const, label: 'Black' },
  { value: 'sepia' as const, label: 'Sepia' },
  { value: 'paper' as const, label: 'Paper' }
]
const BOOK_FONTS = [
  { value: 'sans' as const, label: 'Sans serif' },
  { value: 'serif' as const, label: 'Serif (Mincho)' }
]

export function BookReaderDefaultsSettings() {
  const [prefs, setPrefs, replace] = usePrefs<BookPrefs>(loadBookReaderPrefs, saveBookReaderPrefs)
  return (
    <SettingCard
      title="Book reader defaults"
      description="The book reader opens with these. Changing them inside the reader changes them here too."
    >
      <DefaultsBody
        onReset={async () => {
          if (await confirmReset('book reader settings')) replace(BOOK_DEFAULTS)
        }}
      >
        <Choice label="Text size" value={prefs.fontSize} options={FONT_SIZES} onChange={(v) => setPrefs({ fontSize: v })} />
        <Choice
          label="Line spacing"
          value={prefs.lineHeight}
          options={LINE_HEIGHT_CHOICES}
          onChange={(v) => setPrefs({ lineHeight: v })}
        />
        <Choice label="Text width" value={prefs.maxWidth} options={WIDTH_CHOICES} onChange={(v) => setPrefs({ maxWidth: v })} />
        <Choice label="Page theme" value={prefs.theme} options={BOOK_THEMES} onChange={(v) => setPrefs({ theme: v })} />
        <Choice label="Font" value={prefs.font} options={BOOK_FONTS} onChange={(v) => setPrefs({ font: v })} />
        <Check
          label="Vertical text (tategaki)"
          checked={prefs.vertical}
          onChange={(v) => setPrefs({ vertical: v })}
        />
      </DefaultsBody>
    </SettingCard>
  )
}

const SNIPPETS = SONG_SNIPPET_CHOICES.map((n) => ({
  value: n as number,
  label: n === 0 ? 'Full song' : `${n} seconds`
}))

export function QuizDefaultsSettings() {
  const [prefs, setPrefs, replace] = usePrefs<QuizDefaults>(loadQuizDefaults, saveQuizDefaults)
  return (
    <SettingCard
      title="Quiz defaults"
      description="How quiz options start on a new visit. Changing an option for one round does not change these."
    >
      <DefaultsBody
        onReset={async () => {
          if (await confirmReset('quiz defaults')) replace(QUIZ_DEFAULTS)
        }}
      >
        <Check
          label="Countdown timer (song, synopsis, panel, voice actor and cast quizzes)"
          checked={prefs.timer}
          onChange={(v) => setPrefs({ timer: v })}
        />
        <Check
          label="Song quiz: start clips at a random point"
          checked={prefs.songOffset}
          onChange={(v) => setPrefs({ songOffset: v })}
        />
        <Check
          label="Song quiz: go to the next song automatically"
          checked={prefs.songAutoNext}
          onChange={(v) => setPrefs({ songAutoNext: v })}
        />
        <Choice
          label="Song quiz clip length"
          value={prefs.songSnippet}
          options={SNIPPETS}
          onChange={(v) => setPrefs({ songSnippet: v })}
        />
      </DefaultsBody>
    </SettingCard>
  )
}
