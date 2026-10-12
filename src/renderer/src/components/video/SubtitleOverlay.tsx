import { useQuery } from '@tanstack/react-query'
import { englishLookupTerm, splitEnglishWords, type SubCue, type SubLang } from '@shared/subtitles'
import type { JpToken } from '@shared/types'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'

// Subtitles rendered as OUR DOM in OUR typography, so every word is a click
// target. This is the whole reason the player can't be an mpv window and the
// reason @shared/subtitles drops ASS layout: a clean token flow you can click
// and drag-select is incompatible with reproducing positioned, animated,
// per-syllable-coloured text.
//
// Structurally the OcrOverlay for video: the same click-vs-drag discrimination,
// the same stopPropagation discipline so the click-to-pause zone underneath
// never fires, and the same already-mined ✓ treatment as MiningPanel.

export interface SubtitleWordPick {
  term: string // JP: the token's dictionary form. EN: the normalized word.
  surface: string // what was actually clicked (JP retry-with, EN display)
  cueText: string // the WHOLE cue → MiningPanel's blockText → the card's example
  lang: 'ja' | 'en'
  cue: SubCue
}

export interface SubtitleOverlayProps {
  primary: SubCue[]
  secondary: SubCue[] | null
  primaryLang: SubLang
  secondaryLang: SubLang
  fontScale: number
  backdrop: boolean
  barsVisible: boolean
  onWordPick: (pick: SubtitleWordPick) => void
  onTextSelect: (text: string, cue: SubCue, lang: 'ja' | 'en') => void
  onHoverStart?: () => void
  onHoverEnd?: () => void
}

// White-on-bright-frame is unreadable, and a subtitle you have to squint at is
// worse than none. A layered shadow gives an outline without a plate; the plate
// is a separate preference for people who want maximum contrast.
const CUE_SHADOW = '0 0 3px #000, 0 0 6px #000, 0 2px 2px rgb(0 0 0 / 0.9)'

function CueLine({
  cue,
  lang,
  fontSize,
  backdrop,
  dim,
  onWordPick,
  onTextSelect
}: {
  cue: SubCue
  lang: SubLang
  fontSize: string
  backdrop: boolean
  dim: boolean
  onWordPick: (pick: SubtitleWordPick) => void
  onTextSelect: (text: string, cue: SubCue, lang: 'ja' | 'en') => void
}): JSX.Element {
  // Shares MiningPanel's cache entry for the same text, so opening the panel on
  // a line that's already rendered costs nothing.
  const { data: tokens } = useQuery({
    queryKey: qk.japanese.tokens(cue.text),
    queryFn: () => api.japanese.tokenize(cue.text),
    enabled: lang === 'ja',
    staleTime: Infinity
  })

  const bases = (tokens ?? []).filter((t) => t.wordLike).map((t) => t.base)
  const { data: mined } = useQuery({
    queryKey: qk.japanese.minedFronts(bases),
    queryFn: () => api.japanese.minedFronts(bases),
    enabled: bases.length > 0,
    staleTime: 30_000
  })
  const minedSet = new Set(mined ?? [])

  // Click vs drag, the OcrOverlay discriminator. stopPropagation on
  // mousedown/click keeps the play/pause zone under the overlay from firing.
  function handleMouseUp(e: React.MouseEvent, token?: JpToken, word?: string): void {
    e.stopPropagation()
    const sel = window.getSelection()
    if (sel && !sel.isCollapsed && sel.toString().trim()) {
      onTextSelect(sel.toString().trim(), cue, lang === 'ja' ? 'ja' : 'en')
      return
    }
    if (token) {
      onWordPick({
        term: token.base,
        surface: token.surface,
        cueText: cue.text,
        lang: 'ja',
        cue
      })
    } else if (word) {
      onWordPick({ term: englishLookupTerm(word), surface: word, cueText: cue.text, lang: 'en', cue })
    }
  }

  const wordCls =
    'cursor-pointer rounded px-0.5 hover:bg-accent/25 hover:text-accent transition-colors'

  function renderJa(): JSX.Element[] | string {
    // [] from the tokenizer means "unavailable" (a kuromoji dict/packaging
    // problem), not "no words". Fall back to plain selectable text so the line
    // is still mineable by dragging — the manga reader's contract.
    if (!tokens || tokens.length === 0) return cue.text
    return tokens.map((t, i) =>
      t.wordLike ? (
        <span
          key={i}
          className={`${wordCls} ${
            minedSet.has(t.base) ? 'text-green-300 underline decoration-green-500/50' : ''
          }`}
          role="button"
          tabIndex={-1}
          title={t.base !== t.surface ? t.base : undefined}
          onMouseUp={(e) => handleMouseUp(e, t)}
        >
          {t.surface}
        </span>
      ) : (
        <span key={i} className="text-white/85">
          {t.surface}
        </span>
      )
    )
  }

  function renderEn(): JSX.Element[] {
    return splitEnglishWords(cue.text).map((part, i) =>
      part.word ? (
        <span
          key={i}
          className={wordCls}
          role="button"
          tabIndex={-1}
          onMouseUp={(e) => handleMouseUp(e, undefined, part.text)}
        >
          {part.text}
        </span>
      ) : (
        <span key={i}>{part.text}</span>
      )
    )
  }

  return (
    <div
      className={`pointer-events-auto mx-auto max-w-[92%] select-text whitespace-pre-wrap text-center leading-snug text-white ${
        backdrop ? 'rounded-md bg-black/55 px-3 py-1 backdrop-blur-[2px]' : ''
      } ${dim ? 'opacity-80' : ''}`}
      style={{ fontSize, textShadow: CUE_SHADOW }}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      onMouseUp={(e) => handleMouseUp(e)}
    >
      {lang === 'ja' ? renderJa() : lang === 'en' ? renderEn() : cue.text}
    </div>
  )
}

export default function SubtitleOverlay({
  primary,
  secondary,
  primaryLang,
  secondaryLang,
  fontScale,
  backdrop,
  barsVisible,
  onWordPick,
  onTextSelect,
  onHoverStart,
  onHoverEnd
}: SubtitleOverlayProps): JSX.Element {
  const base = 1.6 * fontScale
  const topCues = primary.filter((c) => c.top)
  const bottomCues = primary.filter((c) => !c.top)

  return (
    <div
      className="pointer-events-none absolute inset-0"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      {topCues.length > 0 && (
        <div className="absolute inset-x-0 top-[6%] flex flex-col items-center gap-1">
          {topCues.map((c) => (
            <CueLine
              key={c.id}
              cue={c}
              lang={primaryLang}
              fontSize={`${base * 0.8}rem`}
              backdrop={backdrop}
              dim
              onWordPick={onWordPick}
              onTextSelect={onTextSelect}
            />
          ))}
        </div>
      )}
      <div
        className={`absolute inset-x-0 flex flex-col items-center gap-1 transition-[bottom] duration-300 ${
          barsVisible ? 'bottom-[18%]' : 'bottom-[10%]'
        }`}
      >
        {bottomCues.map((c) => (
          <CueLine
            key={c.id}
            cue={c}
            lang={primaryLang}
            fontSize={`${base}rem`}
            backdrop={backdrop}
            dim={false}
            onWordPick={onWordPick}
            onTextSelect={onTextSelect}
          />
        ))}
        {secondary?.map((c) => (
          <CueLine
            key={`s${c.id}`}
            cue={c}
            lang={secondaryLang}
            fontSize={`${base * 0.72}rem`}
            backdrop={backdrop}
            dim
            onWordPick={onWordPick}
            onTextSelect={onTextSelect}
          />
        ))}
      </div>
    </div>
  )
}
