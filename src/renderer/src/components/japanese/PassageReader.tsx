import { useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { usePopover } from '../../lib/hooks'
import { flattenGlossary } from '@shared/dictContent'
import { buildReadableUnits, type ReadableToken, type ReadableUnit } from '@shared/japanese/readableUnits'
import { furiganaReading } from '@shared/japanese/furigana'
import Furigana from './Furigana'
import SpeakButton from './SpeakButton'

// Satori Reader-style reading: every word in a passage is a button. Clicking
// one opens a small card with its reading, meaning and deck status, plus
// Listen and Save; words not yet in any deck carry a light dotted underline.
// Each paragraph can be read aloud by the offline voice.

export interface PickedWord {
  base: string
  surface: string
  context: string // the paragraph's plain text, for the save form
  rect: DOMRect
}

export function ReadableParagraph({
  text,
  plain,
  tokens,
  show,
  onWord
}: {
  text: string // furigana notation
  plain: string // the same paragraph without readings
  tokens: ReadableToken[] | undefined
  show: boolean
  onWord: (word: PickedWord) => void
}) {
  const units = tokens ? buildReadableUnits(text, tokens) : null
  return (
    <div className="group mb-3 flex items-start gap-2">
      <p className="min-w-0 flex-1 text-xl leading-loose" lang="ja">
        {units ? (
          units.map((u, i) => <UnitView key={i} unit={u} show={show} context={plain} onWord={onWord} />)
        ) : (
          <Furigana text={text} show={show} />
        )}
      </p>
      <SpeakButton
        className="mt-2 shrink-0 opacity-60 group-hover:opacity-100 group-focus-within:opacity-100"
        text={plain}
        reading={furiganaReading(text)}
        label="Listen to this paragraph"
      />
    </div>
  )
}

function UnitView({
  unit,
  show,
  context,
  onWord
}: {
  unit: ReadableUnit
  show: boolean
  context: string
  onWord: (word: PickedWord) => void
}) {
  const body = unit.segments.map((s, i) =>
    s.ruby ? (
      <ruby key={i}>
        {s.text}
        <rt className={show ? '' : 'invisible'}>{s.ruby}</rt>
      </ruby>
    ) : (
      <span key={i}>{s.text}</span>
    )
  )
  if (!unit.base) return <span>{body}</span>
  const fresh = unit.tier === 'unknown' || unit.tier === 'unstarted'
  return (
    <button
      type="button"
      className={`rounded-sm text-inherit hover:bg-accent/15 ${
        fresh ? 'underline decoration-signal-link/60 decoration-dotted underline-offset-[6px]' : ''
      }`}
      aria-label={`${unit.surface}: look up`}
      onClick={(e) =>
        onWord({ base: unit.base!, surface: unit.surface, context, rect: e.currentTarget.getBoundingClientRect() })
      }
    >
      {body}
    </button>
  )
}

const POPUP_WIDTH = 320

export function WordPopup({
  word,
  onClose,
  onSave
}: {
  word: PickedWord
  onClose: () => void
  onSave: (term: string, context: string) => void
}) {
  const { panelRef } = usePopover(true, onClose, { initialFocus: 'panel' })
  const { data: entries, isLoading } = useQuery({
    queryKey: qk.dict.lookup(word.base),
    queryFn: () => api.dict.lookup(word.base)
  })
  const { data: decks = [] } = useQuery({
    queryKey: qk.japanese.cardsForFronts(word.base),
    queryFn: () => api.japanese.cardsForFronts([word.base])
  })
  const entry = entries?.find((e) => !e.isName) ?? entries?.[0]
  const gloss = entry ? flattenGlossary(entry.defs[0]?.glossary ?? [], 160) : ''
  const deck = decks[0]

  // Below the word, flipped above it near the bottom of the window.
  const [pos, setPos] = useState({ left: 0, top: 0 })
  useLayoutEffect(() => {
    const h = panelRef.current?.offsetHeight ?? 160
    const left = Math.min(Math.max(8, word.rect.left), window.innerWidth - POPUP_WIDTH - 8)
    const below = word.rect.bottom + 6
    const top = below + h > window.innerHeight - 8 ? Math.max(8, word.rect.top - h - 6) : below
    setPos({ left, top })
  }, [word, panelRef, entries])

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label={`${word.base} in the dictionary`}
      tabIndex={-1}
      className="card fixed z-50 p-4 shadow-xl"
      style={{ left: pos.left, top: pos.top, width: POPUP_WIDTH }}
    >
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-semibold" lang="ja">
          {entry?.expression ?? word.base}
        </span>
        {entry?.reading && (
          <span className="text-sm text-gray-400" lang="ja">
            {entry.reading}
          </span>
        )}
        <SpeakButton className="self-center" text={entry?.expression ?? word.base} reading={entry?.reading} />
        <button type="button" className="ml-auto text-gray-500 hover:text-gray-300" aria-label="Close" onClick={onClose}>
          ✕
        </button>
      </div>
      <p className="mt-2 text-sm text-gray-300">
        {isLoading ? 'Looking up…' : gloss || 'Not in your installed dictionaries.'}
      </p>
      <p className="mt-2 text-xs text-gray-500">
        {deck ? (
          <Link to={`/japanese/lessons/${deck.lessonId}`} className="text-signal-link hover:underline">
            In {deck.courseTitle}
          </Link>
        ) : (
          'Not in your decks yet.'
        )}
      </p>
      <div className="mt-3 flex gap-2">
        {!deck && (
          <button type="button" className="btn-primary text-sm" onClick={() => onSave(word.base, word.context)}>
            Save to review
          </button>
        )}
        <Link to={`/japanese/dictionary?q=${encodeURIComponent(word.base)}`} className="btn-ghost text-sm">
          Full entry
        </Link>
      </div>
    </div>
  )
}
