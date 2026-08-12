import { Fragment, MutableRefObject, ReactNode, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../../lib/api'
import { qk } from '../../../lib/queryKeys'
import { useDebouncedValue } from '../../../lib/hooks'
import { toKatakana } from '@shared/kana'
import { kanaToRomaji } from '@shared/romaji'
import {
  FLICK_CYCLE_LABEL,
  FLICK_KEYS,
  GOJUON_ROWS,
  QWERTY_ROWS
} from '@shared/kanaKeyboard'
import {
  ComposeState,
  EMPTY_COMPOSE,
  backspace,
  commitText,
  isEmpty,
  transformLast,
  typeKana,
  typeRomaji
} from '@shared/imeCompose'
import FlickKey from './FlickKey'
import { JpKeyboardLayout, useJpKeyboardPrefs } from './keyboardPrefs'

// The keyboard proper — owns the composition buffer; JpKeyboardInput owns the
// host input and caret. Kept separate so a future practice page can mount the
// panel directly.

// How the host input's PHYSICAL Enter/Escape reach the buffer: each returns
// true when it consumed the key (buffer was non-empty), false to let the host
// proceed (submit / close).
export interface JpKeyboardBridge {
  consumeEnter: () => boolean
  consumeEscape: () => boolean
}

const LAYOUTS: { key: JpKeyboardLayout; label: string }[] = [
  { key: 'gojuon', label: '五十音' },
  { key: 'flick', label: 'フリック' },
  { key: 'qwerty', label: 'ROMAJI' }
]

// Punctuation commits straight to the input when nothing is being composed.
const PUNCT = new Set(['、', '。', '？', '！', '…', '（', '）', '〜'])

// Every panel control preventDefaults pointerdown so the host input never
// blurs — focus retention is the whole ballgame.
function Key({
  onPress,
  className = '',
  ariaLabel,
  disabled,
  active,
  children
}: {
  onPress: () => void
  className?: string
  ariaLabel?: string
  disabled?: boolean
  active?: boolean
  children: ReactNode
}) {
  return (
    <button
      type="button"
      className={`chip-toggle ${active ? 'chip-toggle-active' : ''} disabled:opacity-40 ${className}`}
      onPointerDown={(e) => e.preventDefault()}
      onClick={onPress}
      aria-label={ariaLabel}
      aria-pressed={active}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

function KanaKey({
  kana,
  hint,
  onInput
}: {
  kana: string
  hint: string | null
  onInput: (kana: string) => void
}) {
  return (
    <Key onPress={() => onInput(kana)} className="flex h-11 flex-col items-center justify-center !px-0 leading-none">
      <span className="text-base">{kana}</span>
      {hint && <span className="mt-0.5 text-[9px] text-gray-500">{hint}</span>}
    </Key>
  )
}

export default function JpKeyboardPanel({
  onCommit,
  onEnter,
  onBackspaceEmpty,
  onClose,
  bridge
}: {
  onCommit: (text: string) => void
  onEnter?: () => void
  onBackspaceEmpty: () => void
  onClose: () => void
  bridge?: MutableRefObject<JpKeyboardBridge | null>
}) {
  const [prefs, setPref] = useJpKeyboardPrefs()
  const [state, setState] = useState<ComposeState>(EMPTY_COMPOSE)

  const buffered = commitText(state)
  const debounced = useDebouncedValue(buffered, 150)
  const { data: candidates = [] } = useQuery({
    queryKey: qk.dict.imeCandidates(debounced),
    queryFn: () => api.dict.readingCandidates(debounced),
    enabled: debounced.length > 0,
    placeholderData: (prev) => prev,
    staleTime: Infinity
  })

  const commit = (text: string) => {
    if (!text) return
    onCommit(text)
    setState(EMPTY_COMPOSE)
  }

  const inputKana = (kana: string) => {
    if (PUNCT.has(kana) && isEmpty(state)) {
      onCommit(kana)
      return
    }
    setState((s) => typeKana(s, kana))
  }

  const pressBackspace = () => {
    if (isEmpty(state)) onBackspaceEmpty()
    else setState((s) => backspace(s))
  }

  const pressEnter = () => {
    if (isEmpty(state)) onEnter?.()
    else commit(buffered)
  }

  const hintFor = (kana: string): string | null =>
    prefs.romajiHints ? kanaToRomaji(kana) : null

  const kataForm = toKatakana(buffered)
  const showCandidates = !isEmpty(state)

  // The host input's physical Enter/Escape route here first (see the
  // JpKeyboardBridge contract); re-registered every render so the closures
  // always see the current buffer.
  useEffect(() => {
    if (!bridge) return
    bridge.current = {
      consumeEnter: () => {
        if (isEmpty(state)) return false
        commit(buffered)
        return true
      },
      consumeEscape: () => {
        if (isEmpty(state)) return false
        setState(EMPTY_COMPOSE)
        return true
      }
    }
    return () => {
      bridge.current = null
    }
  })

  return (
    <div className="w-max max-w-[min(34rem,90vw)] space-y-2 rounded-lg border border-base-700 bg-base-900/95 p-3 shadow-xl shadow-black/40 backdrop-blur">
      {/* header: layout picker + hints toggle + close */}
      <div className="flex items-center gap-1">
        {LAYOUTS.map((l) => (
          <Key
            key={l.key}
            active={prefs.layout === l.key}
            onPress={() => setPref('layout', l.key)}
            className="text-xs"
          >
            {l.label}
          </Key>
        ))}
        <div className="flex-1" />
        <Key
          active={prefs.romajiHints}
          onPress={() => setPref('romajiHints', !prefs.romajiHints)}
          className="text-xs"
        >
          abc
        </Key>
        <Key onPress={onClose} ariaLabel="Close keyboard" className="text-xs">
          ✕
        </Key>
      </div>

      {/* composition bar */}
      <div className="flex min-h-[2rem] items-center rounded-md border border-base-700 bg-base-800/60 px-2 text-lg">
        {isEmpty(state) ? (
          <span className="text-xs text-gray-600">
            {prefs.layout === 'qwerty' ? 'Type romaji below' : 'Tap kana below'}
          </span>
        ) : (
          <>
            <span>{state.kana}</span>
            {state.pending && <span className="text-gray-500">{state.pending}</span>}
          </>
        )}
      </div>

      {/* candidate row */}
      {showCandidates && (
        <div className="flex flex-wrap items-center gap-1">
          <Key onPress={() => commit(buffered)} className="text-sm">
            {buffered}
          </Key>
          {kataForm !== buffered && (
            <Key onPress={() => commit(kataForm)} className="text-sm">
              {kataForm}
            </Key>
          )}
          {candidates.map((c, i) => (
            <Fragment key={`${c.kind}-${c.text}`}>
              {/* hairline divider where the exact tier ends */}
              {c.kind === 'prediction' && candidates[i - 1]?.kind === 'exact' && (
                <span className="mx-1 h-5 w-px bg-base-700" />
              )}
              <Key onPress={() => commit(c.text)} className="text-sm">
                <span className="flex items-baseline gap-1.5">
                  {c.text}
                  {c.gloss && (
                    <span className="max-w-32 truncate text-[10px] text-gray-600">{c.gloss}</span>
                  )}
                </span>
              </Key>
            </Fragment>
          ))}
        </div>
      )}

      {/* layout grid */}
      {prefs.layout === 'gojuon' && (
        <div className="grid grid-cols-11 gap-1">
          {[0, 1, 2, 3, 4].map((v) =>
            // Columns right-to-left, あ column rightmost — the real 五十音 chart.
            GOJUON_ROWS.map((_, r) => {
              const col = GOJUON_ROWS.length - 1 - r
              const kana = GOJUON_ROWS[col][v]
              return kana ? (
                <KanaKey key={`${col}-${v}`} kana={kana} hint={hintFor(kana)} onInput={inputKana} />
              ) : (
                <span key={`${col}-${v}`} />
              )
            })
          )}
        </div>
      )}
      {prefs.layout === 'flick' && (
        <div className="mx-auto grid w-64 grid-cols-3 gap-1">
          {FLICK_KEYS.slice(0, 9).map((spec) => (
            <FlickKey key={spec.id} spec={spec} hint={hintFor(spec.center)} onInput={inputKana} />
          ))}
          <Key
            onPress={() => setState((s) => transformLast(s, 'cycle'))}
            className="h-12 text-sm"
            ariaLabel="Dakuten, handakuten, small kana"
            disabled={!state.kana || !!state.pending}
          >
            {FLICK_CYCLE_LABEL}
          </Key>
          {FLICK_KEYS.slice(9).map((spec) => (
            <FlickKey key={spec.id} spec={spec} hint={hintFor(spec.center)} onInput={inputKana} />
          ))}
        </div>
      )}
      {prefs.layout === 'qwerty' && (
        <div className="space-y-1">
          {QWERTY_ROWS.map((row, i) => (
            <div key={row} className="flex justify-center gap-1" style={{ paddingLeft: i * 12 }}>
              {Array.from(row).map((ch) => (
                <Key
                  key={ch}
                  onPress={() => setState((s) => typeRomaji(s, ch))}
                  className="h-10 w-9 !px-0 text-center"
                >
                  {ch}
                </Key>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* chrome row */}
      <div className="flex items-center gap-1">
        {prefs.layout === 'gojuon' && (
          <>
            <Key
              onPress={() => setState((s) => transformLast(s, 'dakuten'))}
              disabled={!state.kana || !!state.pending}
              ariaLabel="Dakuten"
            >
              ゛
            </Key>
            <Key
              onPress={() => setState((s) => transformLast(s, 'handakuten'))}
              disabled={!state.kana || !!state.pending}
              ariaLabel="Handakuten"
            >
              ゜
            </Key>
            <Key
              onPress={() => setState((s) => transformLast(s, 'small'))}
              disabled={!state.kana || !!state.pending}
              ariaLabel="Small kana"
            >
              小
            </Key>
          </>
        )}
        {prefs.layout !== 'qwerty' && <KanaKey kana="ー" hint={null} onInput={inputKana} />}
        <KanaKey kana="、" hint={null} onInput={inputKana} />
        <KanaKey kana="。" hint={null} onInput={inputKana} />
        <div className="flex-1" />
        <Key onPress={pressBackspace} ariaLabel="Backspace">
          ⌫
        </Key>
        <Key onPress={() => commit(buffered)} disabled={isEmpty(state)} className="px-4">
          確定
        </Key>
        <Key onPress={pressEnter} ariaLabel="Enter">
          ↵
        </Key>
      </div>
    </div>
  )
}
