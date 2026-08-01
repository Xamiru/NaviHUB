import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import { toast } from '../lib/toast'
import type { JpCardInput, JpLessonKind } from '@shared/types'

// One editable card row. Existing cards keep their id so saving can diff
// against the original snapshot (update/remove) instead of recreating them —
// recreating would wipe their SRS scheduling state.
interface CardRow extends JpCardInput {
  id: number | null
  key: string // stable React key for new (id-less) rows
}

function emptyRow(key: string): CardRow {
  return {
    id: null,
    key,
    front: '',
    reading: '',
    back: '',
    pos: '',
    notes: '',
    onyomi: '',
    kunyomi: '',
    exampleJp: '',
    exampleReading: '',
    exampleEn: ''
  }
}

// The text fields a row edits — used to snapshot, diff and normalize rows.
const ROW_FIELDS = [
  'front',
  'reading',
  'back',
  'pos',
  'notes',
  'onyomi',
  'kunyomi',
  'exampleJp',
  'exampleReading',
  'exampleEn'
] as const
type RowField = (typeof ROW_FIELDS)[number]

export default function JapaneseLessonFormPage() {
  const { id } = useParams()
  const editing = !!id
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const qc = useQueryClient()

  const paramKind = params.get('kind')
  const [courseId, setCourseId] = useState<number>(Number(params.get('courseId')) || 0)
  const [kind, setKind] = useState<JpLessonKind>(
    paramKind === 'grammar' || paramKind === 'kanji' ? paramKind : 'vocab'
  )
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [rows, setRows] = useState<CardRow[]>([emptyRow('new-0')])
  const [nextKey, setNextKey] = useState(1)
  const [original, setOriginal] = useState<Map<number, JpCardInput>>(new Map())
  const [saving, setSaving] = useState(false)
  const [loaded, setLoaded] = useState(!editing)

  useEffect(() => {
    if (!editing) return
    api.japanese.getLesson(Number(id)).then((l) => {
      if (!l) return
      setCourseId(l.courseId)
      setKind(l.kind)
      setTitle(l.title)
      setBody(l.body ?? '')
      const snapshot = new Map<number, JpCardInput>()
      const cardRows = l.cards.map((c): CardRow => {
        const input: JpCardInput = { front: c.front, back: c.back }
        const fields = input as Record<RowField, string | null | undefined>
        for (const f of ROW_FIELDS) fields[f] = c[f] ?? ''
        snapshot.set(c.id, input)
        return { ...emptyRow(`card-${c.id}`), ...input, id: c.id, key: `card-${c.id}` }
      })
      setOriginal(snapshot)
      setRows(cardRows.length ? cardRows : [emptyRow('new-0')])
      setLoaded(true)
    })
  }, [editing, id])

  const isGrammar = kind === 'grammar'
  const filledRows = useMemo(
    () => rows.filter((r) => r.front.trim() && r.back.trim()),
    [rows]
  )

  function patchRow(key: string, patch: Partial<CardRow>) {
    setRows((rs) => rs.map((r) => (r.key === key ? { ...r, ...patch } : r)))
  }

  function addRow() {
    setRows((rs) => [...rs, emptyRow(`new-${nextKey}`)])
    setNextKey((k) => k + 1)
  }

  function removeRow(key: string) {
    setRows((rs) => rs.filter((r) => r.key !== key))
  }

  function toInput(r: CardRow): JpCardInput {
    const input: JpCardInput = { front: r.front.trim(), back: r.back.trim() }
    const fields = input as Record<RowField, string | null | undefined>
    for (const f of ROW_FIELDS) {
      if (f === 'front' || f === 'back') continue
      fields[f] = (r[f] ?? '').trim() || null
    }
    return input
  }

  function changed(id: number, input: JpCardInput): boolean {
    const before = original.get(id)
    if (!before) return true
    return ROW_FIELDS.some((f: RowField) => (before[f] || null) !== (input[f] || null))
  }

  async function save() {
    if (!title.trim() || !courseId) return
    setSaving(true)
    try {
      let targetLessonId: number
      if (editing) {
        targetLessonId = Number(id)
        await api.japanese.updateLesson(targetLessonId, {
          title: title.trim(),
          body: isGrammar ? body.trim() || null : null
        })
        const kept = new Set<number>()
        for (const row of filledRows) {
          const input = toInput(row)
          if (row.id == null) {
            await api.japanese.createCard(targetLessonId, input)
          } else {
            kept.add(row.id)
            if (changed(row.id, input)) await api.japanese.updateCard(row.id, input)
          }
        }
        for (const cardId of original.keys()) {
          if (!kept.has(cardId)) await api.japanese.removeCard(cardId)
        }
      } else {
        targetLessonId = await api.japanese.createLesson({
          courseId,
          kind,
          title: title.trim(),
          body: isGrammar ? body.trim() || null : null,
          cards: filledRows.map(toInput)
        })
      }
      await qc.invalidateQueries({ queryKey: qk.japanese.all })
      toast(editing ? 'Lesson saved' : 'Lesson created', 'success')
      // Drop the form from history (see MediaFormPage.save): back to the detail
      // entry beneath when editing, replace with the new detail when creating.
      if (editing) navigate(-1)
      else navigate(`/japanese/lessons/${targetLessonId}`, { replace: true })
    } finally {
      setSaving(false)
    }
  }

  if (!loaded) return <PageStatus>Loading…</PageStatus>

  return (
    <div className="p-6 max-w-[900px] mx-auto">
      <PageHeader
        back="history"
        title={editing ? 'Edit lesson' : `New ${kind} lesson`}
        subtitle={
          isGrammar
            ? 'An explanation plus example sentences (each sentence becomes a reviewable card).'
            : kind === 'kanji'
              ? 'A deck of kanji cards with on/kun readings and an example word.'
              : 'A deck of vocabulary cards.'
        }
      />

      <div className="space-y-4">
        <div>
          <label className="label">Title</label>
          <input
            className="input"
            placeholder={isGrammar ? 'e.g. The particle が' : 'e.g. Weather words'}
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {isGrammar && (
          <div>
            <label className="label">Explanation</label>
            <textarea
              className="input min-h-[180px] leading-relaxed"
              placeholder="Explain the grammar point — patterns, usage, pitfalls…"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
        )}

        <div>
          <div className="label mb-2">
            {isGrammar ? 'Example sentences' : kind === 'kanji' ? 'Kanji' : 'Cards'}{' '}
            <span className="normal-case text-gray-500">
              ({filledRows.length} valid — a card needs at least{' '}
              {isGrammar
                ? 'a sentence and a translation'
                : kind === 'kanji'
                  ? 'a character and a meaning'
                  : 'a word and a meaning'})
            </span>
          </div>
          <div className="space-y-2">
            {rows.map((row) => (
              <div key={row.key} className="card p-3">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_auto]">
                  <input
                    className="input"
                    placeholder={
                      isGrammar ? 'Japanese sentence' : kind === 'kanji' ? 'Kanji character' : 'Word (kanji/kana)'
                    }
                    value={row.front}
                    onChange={(e) => patchRow(row.key, { front: e.target.value })}
                  />
                  <input
                    className="input"
                    placeholder={kind === 'kanji' ? 'Primary reading (kana)' : 'Reading (kana)'}
                    value={row.reading ?? ''}
                    onChange={(e) => patchRow(row.key, { reading: e.target.value })}
                  />
                  <button
                    className="btn-ghost px-3 text-gray-500 hover:text-red-400"
                    title="Remove card"
                    aria-label="Remove card"
                    onClick={() => removeRow(row.key)}
                  >
                    ✕
                  </button>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-[2fr_1fr]">
                  <input
                    className="input"
                    placeholder={isGrammar ? 'Translation' : 'Meaning'}
                    value={row.back}
                    onChange={(e) => patchRow(row.key, { back: e.target.value })}
                  />
                  {isGrammar ? (
                    <input
                      className="input"
                      placeholder="Note (optional)"
                      value={row.notes ?? ''}
                      onChange={(e) => patchRow(row.key, { notes: e.target.value })}
                    />
                  ) : kind === 'kanji' ? (
                    <input
                      className="input"
                      placeholder="Note (optional)"
                      value={row.notes ?? ''}
                      onChange={(e) => patchRow(row.key, { notes: e.target.value })}
                    />
                  ) : (
                    <input
                      className="input"
                      placeholder="Part of speech (optional)"
                      value={row.pos ?? ''}
                      onChange={(e) => patchRow(row.key, { pos: e.target.value })}
                    />
                  )}
                </div>
                {kind === 'kanji' && (
                  <>
                    <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <input
                        className="input"
                        placeholder="On'yomi (音) — e.g. ニチ, ジツ"
                        value={row.onyomi ?? ''}
                        onChange={(e) => patchRow(row.key, { onyomi: e.target.value })}
                      />
                      <input
                        className="input"
                        placeholder="Kun'yomi (訓) — e.g. ひ, か"
                        value={row.kunyomi ?? ''}
                        onChange={(e) => patchRow(row.key, { kunyomi: e.target.value })}
                      />
                    </div>
                    <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                      <input
                        className="input"
                        placeholder="Example word"
                        value={row.exampleJp ?? ''}
                        onChange={(e) => patchRow(row.key, { exampleJp: e.target.value })}
                      />
                      <input
                        className="input"
                        placeholder="Example reading"
                        value={row.exampleReading ?? ''}
                        onChange={(e) => patchRow(row.key, { exampleReading: e.target.value })}
                      />
                      <input
                        className="input"
                        placeholder="Example meaning"
                        value={row.exampleEn ?? ''}
                        onChange={(e) => patchRow(row.key, { exampleEn: e.target.value })}
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          <button className="btn-ghost mt-2 text-sm" onClick={addRow}>
            + Add {isGrammar ? 'sentence' : kind === 'kanji' ? 'kanji' : 'card'}
          </button>
        </div>

        <button
          className="btn-primary w-full"
          disabled={saving || !title.trim() || !courseId}
          onClick={save}
        >
          {saving ? 'Saving…' : editing ? 'Save changes' : 'Create lesson'}
        </button>
      </div>
    </div>
  )
}
