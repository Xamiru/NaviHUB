import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { QuoteOrigin, QuoteSpeakerKind, SavedQuote } from '@shared/types'
import { furiganaMarkup, hasKanji } from '@shared/quotes'
import { stripFurigana } from '@shared/japanese/furigana'
import Dialog from '../Dialog'
import { Field, Fieldset } from '../Field'
import CoverImage from '../CoverImage'
import UniversalPicker from '../UniversalPicker'
import Furigana from '../japanese/Furigana'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { useDebouncedValue } from '../../lib/hooks'
import { toast } from '../../lib/toast'

export interface QuoteLink {
  id: number
  name: string
  imagePath: string | null
}

// What a capture point already knows: the reader knows the book and chapter,
// the player the line, title and timestamp, a character page its character.
export interface QuoteSeed {
  text?: string
  translation?: string | null
  media?: QuoteLink | null
  sourceTitle?: string | null
  speakerKind?: QuoteSpeakerKind
  speaker?: QuoteLink | null
  locator?: string | null
  origin?: QuoteOrigin
}

type SpeakerChoice = QuoteSpeakerKind | 'other'

const SPEAKER_CHOICES: { key: SpeakerChoice; label: string }[] = [
  { key: 'character', label: 'Character' },
  { key: 'person', label: 'Person' },
  { key: 'wrestler', label: 'Wrestler' },
  { key: 'other', label: 'Other' }
]

const PICKER_KIND = {
  character: 'character',
  person: 'person',
  wrestler: 'wrestlingWrestler'
} as const

function seedFromQuote(q: SavedQuote): QuoteSeed {
  return {
    text: q.text,
    translation: q.translation,
    media:
      q.mediaId != null
        ? { id: q.mediaId, name: q.sourceTitle ?? '', imagePath: q.coverPath }
        : null,
    sourceTitle: q.mediaId == null ? q.sourceTitle : null,
    speakerKind: q.speakerKind ?? undefined,
    speaker:
      q.speakerKind && q.speakerId != null
        ? { id: q.speakerId, name: q.speakerName ?? '', imagePath: q.speakerImagePath }
        : null,
    locator: q.locator
  }
}

// Add or edit a quote. Japanese text gets readings generated offline by the
// local tokenizer; they stay editable (漢字[かんじ]) for names it misreads.
export default function QuoteDialog({
  quote,
  seed,
  onClose,
  onSaved
}: {
  quote?: SavedQuote | null
  seed?: QuoteSeed
  onClose: () => void
  onSaved?: (id: number) => void
}) {
  const titleId = useId()
  const textRef = useRef<HTMLTextAreaElement>(null)
  const queryClient = useQueryClient()
  const initial = useMemo(() => (quote ? seedFromQuote(quote) : (seed ?? {})), [quote, seed])

  const [text, setText] = useState(initial.text ?? '')
  const [readings, setReadings] = useState(quote?.furigana ?? '')
  const [readingsEdited, setReadingsEdited] = useState(Boolean(quote?.furigana))
  const [translation, setTranslation] = useState(initial.translation ?? '')
  const [media, setMedia] = useState<QuoteLink | null>(initial.media ?? null)
  const [sourceTitle, setSourceTitle] = useState(initial.sourceTitle ?? '')
  // A speaker that is free text, or whose linked row is gone (a re-import
  // pruned the character), opens on Other with the saved name, so editing the
  // line never erases who said it.
  const unlinkedSpeaker = Boolean(quote?.speakerName && quote.speakerId == null)
  const [speakerChoice, setSpeakerChoice] = useState<SpeakerChoice>(
    unlinkedSpeaker ? 'other' : (initial.speakerKind ?? 'character')
  )
  const [speaker, setSpeaker] = useState<QuoteLink | null>(initial.speaker ?? null)
  const [speakerText, setSpeakerText] = useState(unlinkedSpeaker ? (quote?.speakerName ?? '') : '')
  const [locator, setLocator] = useState(initial.locator ?? '')
  const [themes, setThemes] = useState<string[]>(quote?.themes ?? [])
  const [themeDraft, setThemeDraft] = useState('')
  const [note, setNote] = useState(quote?.note ?? '')
  const [favorite, setFavorite] = useState(quote?.favorite ?? false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const kanji = hasKanji(text)
  const debouncedText = useDebouncedValue(text, 350)
  useEffect(() => {
    if (readingsEdited) return
    const value = debouncedText.trim()
    if (!hasKanji(value)) {
      setReadings('')
      return
    }
    let alive = true
    api.japanese
      .tokenize(value)
      .then((tokens) => {
        if (alive && tokens.length) setReadings(furiganaMarkup(value, tokens))
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [debouncedText, readingsEdited])

  // The chosen title's cast, offered first: a library often holds several
  // characters with one name (one per source), and the source decides which.
  const castQuery = useQuery({
    queryKey: qk.media.detail(media?.id ?? 0),
    queryFn: () => api.media.get(media!.id),
    enabled: media != null && speakerChoice === 'character' && speaker == null
  })
  const cast = (castQuery.data?.characters ?? []).slice(0, 12).map((c) => c.character)

  // Themes already in use, offered as one-click suggestions.
  const all = useQuery({ queryKey: qk.quotes.list({}), queryFn: () => api.quotes.list({}) })
  const knownThemes = useMemo(() => {
    const counts = new Map<string, number>()
    for (const q of all.data ?? []) for (const t of q.themes) counts.set(t, (counts.get(t) ?? 0) + 1)
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t)
  }, [all.data])
  const has = (name: string) => themes.some((t) => t.toLowerCase() === name.toLowerCase())
  const suggestions = knownThemes.filter((t) => !has(t)).slice(0, 10)

  function addTheme(raw: string) {
    const name = raw.trim().replace(/\s+/g, ' ')
    if (name && !has(name)) setThemes((list) => [...list, name])
    setThemeDraft('')
  }

  async function save() {
    const body = text.trim()
    if (!body) {
      setError('Write the line first.')
      textRef.current?.focus()
      return
    }
    const markup = kanji ? readings.trim() : ''
    if (markup && stripFurigana(markup) !== body) {
      setError('The readings no longer match the quote. Edit them or regenerate them.')
      return
    }
    const pendingTheme = themeDraft.trim()
    const finalThemes = pendingTheme && !has(pendingTheme) ? [...themes, pendingTheme] : themes
    setSaving(true)
    setError(null)
    try {
      const kind = speakerChoice === 'other' ? null : speakerChoice
      const id = await api.quotes.save(
        {
          text: body,
          furigana: markup || null,
          translation,
          mediaId: media?.id ?? null,
          sourceTitle: media ? null : sourceTitle,
          speakerKind: kind,
          speakerId: kind ? (speaker?.id ?? null) : null,
          speakerName: kind ? (speaker?.name ?? null) : speakerText,
          locator,
          note,
          favorite,
          origin: initial.origin ?? 'manual',
          themes: finalThemes
        },
        quote?.id ?? null
      )
      await queryClient.invalidateQueries({ queryKey: qk.quotes.all })
      toast(quote ? 'Quote updated' : 'Quote saved', 'success')
      onSaved?.(id)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog
      labelledBy={titleId}
      onClose={onClose}
      initialFocus={() => textRef.current}
      panelClassName="card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          void save()
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault()
            void save()
          }
        }}
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 id={titleId} className="text-lg font-semibold">
            {quote ? 'Edit quote' : 'Add quote'}
          </h2>
          <button type="button" className="btn-ghost px-2" aria-label="Close" title="Close" onClick={onClose}>
            ✕
          </button>
        </div>

        <Field label="Quote">
          <textarea
            ref={textRef}
            className="input quote-serif min-h-[6rem] text-lg"
            value={text}
            maxLength={4000}
            onChange={(e) => setText(e.target.value)}
          />
        </Field>

        {kanji && (
          <div className="mt-3 rounded-md border border-line-subtle p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="label mb-0">Readings preview</span>
              {readingsEdited && (
                <button
                  type="button"
                  className="btn-ghost px-2 py-0.5 text-xs"
                  onClick={() => setReadingsEdited(false)}
                >
                  Regenerate
                </button>
              )}
            </div>
            <p className="quote-serif text-xl leading-[2]">
              {readings ? <Furigana text={readings} /> : <span lang="ja">{text}</span>}
            </p>
            <Field
              label="Readings"
              description="Kanji followed by its reading in brackets, for example 漢字[かんじ]. Fix a misread name here."
              className="mt-3 block"
            >
              <textarea
                className="input min-h-[3rem] text-sm"
                lang="ja"
                value={readings}
                onChange={(e) => {
                  setReadings(e.target.value)
                  setReadingsEdited(true)
                }}
              />
            </Field>
          </div>
        )}

        <Field label="Translation" description="Optional, shown under the line." className="mt-4 block">
          <textarea
            className="input min-h-[3rem]"
            value={translation}
            maxLength={4000}
            onChange={(e) => setTranslation(e.target.value)}
          />
        </Field>

        <Fieldset legend="Who said it" className="mt-5">
          <div className="mb-2 flex flex-wrap gap-2" role="group" aria-label="Speaker type">
            {SPEAKER_CHOICES.map((c) => (
              <button
                key={c.key}
                type="button"
                aria-pressed={speakerChoice === c.key}
                className={speakerChoice === c.key ? 'pill pill-active' : 'pill'}
                onClick={() => {
                  if (c.key !== speakerChoice) setSpeaker(null)
                  setSpeakerChoice(c.key)
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
          {speakerChoice === 'other' ? (
            <Field label="Speaker name" hiddenLabel className="contents">
              <input
                className="input"
                placeholder="Anyone, or leave empty"
                value={speakerText}
                onChange={(e) => setSpeakerText(e.target.value)}
              />
            </Field>
          ) : speaker ? (
            <PickedChip link={speaker} onClear={() => setSpeaker(null)} round />
          ) : (
            <>
              {cast.length > 0 && speakerChoice === 'character' && (
                <div className="mb-2 flex flex-wrap gap-1.5" role="group" aria-label={`Characters in ${media?.name}`}>
                  {cast.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className="chip inline-flex items-center gap-1.5 py-0.5 pl-0.5 text-xs hover:text-ink"
                      onClick={() => setSpeaker({ id: c.id, name: c.name, imagePath: c.imagePath })}
                    >
                      <CoverImage path={c.imagePath} alt="" className="h-6 w-6 shrink-0" rounded="rounded-full" thumbWidth={160} />
                      {c.name}
                    </button>
                  ))}
                </div>
              )}
              <UniversalPicker
                key={speakerChoice}
                kind={PICKER_KIND[speakerChoice]}
                placeholder={`Search a ${speakerChoice}…`}
                onPick={(e) => setSpeaker({ id: e.entityId, name: e.name, imagePath: e.imagePath })}
              />
            </>
          )}
        </Fieldset>

        <Fieldset legend="Where it is from" className="mt-5">
          {media ? (
            <PickedChip link={media} onClear={() => setMedia(null)} />
          ) : (
            <div className="grid gap-2 sm:grid-cols-2">
              <UniversalPicker
                kind="media"
                placeholder="Search your library…"
                onPick={(e) => setMedia({ id: e.entityId, name: e.name, imagePath: e.imagePath })}
              />
              <Field label="Source not in the library" hiddenLabel className="contents">
                <input
                  className="input"
                  placeholder="Or type a source"
                  value={sourceTitle}
                  onChange={(e) => setSourceTitle(e.target.value)}
                />
              </Field>
            </div>
          )}
          <Field label="Where in it" hiddenLabel className="contents">
            <input
              className="input mt-2"
              placeholder="Chapter, episode, timestamp or route (optional)"
              value={locator}
              onChange={(e) => setLocator(e.target.value)}
            />
          </Field>
        </Fieldset>

        <Fieldset legend="Themes" className="mt-5">
          {themes.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1.5">
              {themes.map((t) => (
                <span key={t} className="chip inline-flex items-center gap-1 text-xs">
                  {t}
                  <button
                    type="button"
                    className="text-ink-muted hover:text-ink"
                    aria-label={`Remove theme ${t}`}
                    title={`Remove theme ${t}`}
                    onClick={() => setThemes((list) => list.filter((x) => x !== t))}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}
          <Field label="Add a theme" hiddenLabel className="contents">
            <input
              className="input"
              placeholder="On loss, Motivation… press Enter to add"
              value={themeDraft}
              onChange={(e) => setThemeDraft(e.target.value)}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' && !e.ctrlKey && !e.metaKey) || e.key === ',') {
                  e.preventDefault()
                  addTheme(themeDraft)
                }
              }}
            />
          </Field>
          {suggestions.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label="Existing themes">
              {suggestions.map((t) => (
                <button key={t} type="button" className="chip text-xs hover:text-ink" onClick={() => addTheme(t)}>
                  {t}
                </button>
              ))}
            </div>
          )}
        </Fieldset>

        <Field label="Note" description="Why it stayed with you. Optional." className="mt-5 block">
          <textarea
            className="input min-h-[3rem]"
            value={note}
            maxLength={4000}
            onChange={(e) => setNote(e.target.value)}
          />
        </Field>

        <label className="mt-4 flex items-center gap-2 text-sm">
          <input type="checkbox" checked={favorite} onChange={(e) => setFavorite(e.target.checked)} />
          Favorite
        </label>

        {error && (
          <p role="alert" className="mt-4 text-sm text-signal-anomaly">
            {error}
          </p>
        )}

        <div className="mt-6 flex items-center justify-end gap-2">
          <span className="mr-auto text-xs text-ink-muted">Ctrl+Enter saves</span>
          <button type="button" className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Saving…' : 'Save quote'}
          </button>
        </div>
      </form>
    </Dialog>
  )
}

function PickedChip({
  link,
  onClear,
  round = false
}: {
  link: QuoteLink
  onClear: () => void
  round?: boolean
}) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-line-subtle bg-surface-raised px-3 py-2">
      <CoverImage
        path={link.imagePath}
        alt=""
        className="h-9 w-9 shrink-0 object-cover"
        rounded={round ? 'rounded-full' : 'rounded'}
        thumbWidth={160}
      />
      <span className="min-w-0 flex-1 truncate text-sm">{link.name}</span>
      <button
        type="button"
        className="btn-ghost px-2 py-1 text-xs"
        title={`Pick something other than ${link.name}`}
        onClick={onClear}
      >
        Change
      </button>
    </div>
  )
}
