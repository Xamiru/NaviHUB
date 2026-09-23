import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { JpTextAnalysis, VnCaptureInput, VnCapture, VnReadingNode } from '@shared/types'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { localInputDate, useHobbyAction } from '../lib/hobbyForms'
import { confirmDialog } from '../lib/confirm'
import { useIncrementalList, useSettings } from '../lib/hooks'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import { Field } from '../components/Field'
import AnalysisView from '../components/japanese/AnalysisView'
import MiningPanel from '../components/reader/MiningPanel'
import CoverageBar, { knownShare, pct } from '../components/japanese/CoverageBar'

export default function VnStudyPage() {
  const mediaId = Number(useParams().id)
  const qc = useQueryClient()
  const settings = useSettings()
  const navigate = useNavigate()
  const action = useHobbyAction()
  const [editing, setEditing] = useState<VnCapture | 'new' | null>(null)
  const [analysis, setAnalysis] = useState<{ title: string; result: JpTextAnalysis } | null>(null)
  const [mining, setMining] = useState<{ term: string; context: string } | null>(null)
  const [job, setJob] = useState<'scan' | 'deck' | null>(null)
  const overview = useQuery({
    queryKey: qk.vnReading.overview(mediaId),
    queryFn: () => api.vnReading.overview(mediaId)
  })
  const captures = useQuery({
    queryKey: qk.vnCapture.list(mediaId),
    queryFn: () => api.vnCapture.list(mediaId)
  })
  const coverage = useQuery({
    queryKey: qk.japanese.coverage(mediaId),
    queryFn: () => api.japanese.coverage(mediaId)
  })
  const scan = useQuery({
    queryKey: qk.japanese.coverageScanStatus,
    queryFn: () => api.japanese.coverageScanStatus(),
    refetchInterval: (query) => (job === 'scan' || query.state.data?.running ? 400 : false)
  })
  const deck = useQuery({
    queryKey: qk.japanese.prepDeckStatus,
    queryFn: () => api.japanese.prepDeckStatus(),
    refetchInterval: (query) => (job === 'deck' || query.state.data?.running ? 400 : false)
  })
  const { visible, sentinelRef } = useIncrementalList(captures.data ?? [], 30)
  const busy = action.busy || !!scan.data?.running || !!deck.data?.running
  async function refresh() {
    setAnalysis(null)
    await qc.invalidateQueries({ queryKey: qk.vnCapture.all })
    await qc.invalidateQueries({ queryKey: qk.japanese.all })
  }
  if (overview.isLoading || captures.isLoading) return <PageStatus>Loading captures…</PageStatus>
  if (overview.isError || captures.isError)
    return (
      <PageStatus>
        Could not load captures.{' '}
        <button
          className="btn"
          onClick={() => {
            void overview.refetch()
            void captures.refetch()
          }}
        >
          Retry
        </button>
      </PageStatus>
    )
  if (!overview.data || !captures.data) return <PageStatus>Visual novel not found.</PageStatus>
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <PageHeader
        title={`${overview.data.title}: Text and study`}
        back={{ to: `/visual-novels/${mediaId}/reading`, label: 'Reading workspace' }}
        subtitle="Save local Japanese text, look up words and mine sentences for review."
      />
      <p className="mb-4 max-w-prose text-sm text-ink-muted">
        Statistics describe your saved captures only. Offline analysis needs the Japanese tokenizer;
        dictionary definitions need the dictionary packs in{' '}
        <Link className="text-accent" to="/settings">
          Settings
        </Link>
        . Saved text remains readable without them.
      </p>
      <div className="mb-6 flex flex-wrap gap-3">
        <button
          className="btn-primary"
          disabled={busy}
          onClick={() => {
            setEditing('new')
            setAnalysis(null)
          }}
        >
          New capture
        </button>
        <button
          className="btn"
          disabled={busy || !captures.data.length}
          onClick={() =>
            void action.run(async () => {
              setJob('scan')
              try {
                await api.japanese.scanCoverage(mediaId)
                await qc.invalidateQueries({ queryKey: qk.japanese.all })
              } finally {
                setJob(null)
              }
            })
          }
        >
          {job === 'scan'
            ? `Scanning ${scan.data?.done ?? 0}/${scan.data?.total ?? 0}`
            : 'Scan captured vocabulary'}
        </button>
        <button
          className="btn"
          disabled={busy || !captures.data.length}
          onClick={() =>
            void action.run(async () => {
              setJob('deck')
              try {
                const result = await api.japanese.buildPrepDeck(mediaId)
                await qc.invalidateQueries({ queryKey: qk.japanese.all })
                navigate(`/japanese/courses/${result.courseId}`)
              } finally {
                setJob(null)
              }
            })
          }
        >
          {job === 'deck' ? 'Building preparation deck…' : 'Build preparation deck'}
        </button>
      </div>
      {coverage.isError ? (
        <p role="alert">
          Could not load capture coverage.{' '}
          <button className="btn" onClick={() => void coverage.refetch()}>
            Retry coverage
          </button>
        </p>
      ) : (
        coverage.data && (
          <section aria-label="Captured text coverage" className="mb-6 max-w-2xl">
            <p>
              {pct(knownShare(coverage.data.tiers))} known by usage /{' '}
              {coverage.data.tokenCount.toLocaleString()} words in saved captures
            </p>
            <CoverageBar tiers={coverage.data.tiers} />
            <p className="mt-1 text-xs text-ink-muted">
              Scanned {coverage.data.scannedAt.slice(0, 10)}. Knowledge uses your review cards and a
              configured frequency baseline of{' '}
              {Number(settings.data?.['jp.knownBaseline'] ?? 0).toLocaleString()} words.
              {settings.isError && ' Baseline settings could not be loaded.'}
            </p>
          </section>
        )
      )}
      {editing && (
        <CaptureEditor
          key={editing === 'new' ? 'new' : editing.id}
          value={
            editing === 'new'
              ? { title: '', body: '', nodeId: null, capturedOn: localInputDate() }
              : editing
          }
          nodes={overview.data.nodes}
          onClose={() => setEditing(null)}
          onSave={async (value) => {
            await api.vnCapture.save(mediaId, editing === 'new' ? null : editing.id, value)
            await refresh()
            setEditing(null)
          }}
        />
      )}
      <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <section aria-label="Saved captures">
          <h2 className="mb-3 text-lg font-semibold">Saved captures</h2>
          {!captures.data.length && (
            <p className="text-sm text-ink-muted">
              Paste a reading session or import a UTF-8 text log to begin.
            </p>
          )}
          {visible.map((c) => (
            <article key={c.id} className="border-b border-line-subtle py-3">
              <h3>{c.title}</h3>
              <p className="text-xs text-ink-muted">
                {c.capturedOn} / {c.characters.toLocaleString()} characters
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  className="btn-ghost"
                  disabled={busy}
                  onClick={() =>
                    void action.run(async () => {
                      setEditing(await api.vnCapture.get(mediaId, c.id))
                      setAnalysis(null)
                    })
                  }
                >
                  Read / edit <span className="sr-only">{c.title}</span>
                </button>
                <button
                  className="btn-ghost"
                  disabled={busy}
                  onClick={() =>
                    void action.run(async () => {
                      const capture = await api.vnCapture.get(mediaId, c.id)
                      const result = await api.japanese.analyzeText(capture.body)
                      setAnalysis({ title: c.title, result })
                      setEditing(null)
                    })
                  }
                >
                  Analyze <span className="sr-only">{c.title}</span>
                </button>
                <button
                  className="btn-ghost text-signal-anomaly"
                  disabled={busy}
                  onClick={() =>
                    void action.run(async () => {
                      if (
                        await confirmDialog(`Delete capture “${c.title}”? Mined cards will remain.`)
                      ) {
                        await api.vnCapture.remove(mediaId, c.id)
                        setEditing(null)
                        await refresh()
                      }
                    })
                  }
                >
                  Delete <span className="sr-only">{c.title}</span>
                </button>
              </div>
            </article>
          ))}
          <div ref={sentinelRef} />
        </section>
        <section aria-label="Capture analysis">
          {analysis ? (
            <>
              <h2 className="text-lg font-semibold">{analysis.title}</h2>
              <p className="text-sm text-ink-muted">
                Select a word to look it up and save its sentence. Analyze again after changing your
                review cards to update this snapshot.
              </p>
              <AnalysisView result={analysis.result} onMine={setMining} />
            </>
          ) : (
            <p className="text-sm text-ink-muted">
              Choose Analyze on a saved capture to see vocabulary frequency and sentence lookups.
            </p>
          )}
        </section>
      </div>
      {mining && (
        <MiningPanel
          mediaId={mediaId}
          blockText={mining.context}
          initialTerm={mining.term}
          onClose={() => setMining(null)}
        />
      )}
    </div>
  )
}
function CaptureEditor({
  value,
  nodes,
  onSave,
  onClose
}: {
  value: VnCaptureInput
  nodes: VnReadingNode[]
  onSave: (value: VnCaptureInput) => Promise<void>
  onClose: () => void
}) {
  const [draft, set] = useState(value)
  const action = useHobbyAction()
  return (
    <form
      aria-label="Text capture"
      className="mb-8 max-w-3xl space-y-3"
      onSubmit={(e) => {
        e.preventDefault()
        void action.run(() => onSave(draft))
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Capture title">
          <input
            className="input w-full"
            required
            maxLength={300}
            value={draft.title}
            onChange={(e) => set({ ...draft, title: e.target.value })}
          />
        </Field>
        <Field label="Captured on">
          <input
            className="input"
            required
            type="date"
            value={draft.capturedOn}
            onChange={(e) => set({ ...draft, capturedOn: e.target.value })}
          />
        </Field>
      </div>
      <Field label="Reading entry">
        <select
          className="input"
          value={draft.nodeId ?? ''}
          onChange={(e) =>
            set({ ...draft, nodeId: e.target.value ? Number(e.target.value) : null })
          }
        >
          <option value="">None</option>
          {nodes.map((n) => (
            <option key={n.id} value={n.id}>
              {n.title}
            </option>
          ))}
        </select>
      </Field>
      <Field
        label="Import UTF-8 text log"
        description="Up to 800 KB and 200,000 characters. Import replaces the text in this editor."
      >
        <input
          type="file"
          accept=".txt,.log,text/plain"
          disabled={action.busy}
          onChange={(e) => {
            const file = e.target.files?.[0]
            e.target.value = ''
            if (file)
              void action.run(async () => {
                if (file.size > 800000) throw new Error('Text log is too large (800 KB maximum)')
                const body = new TextDecoder('utf-8', { fatal: true }).decode(
                  await file.arrayBuffer()
                )
                if (body.length > 200000) throw new Error('Text log exceeds 200,000 characters')
                set((d) => ({ ...d, body, title: d.title || file.name }))
              })
          }}
        />
      </Field>
      <Field label="Captured text">
        <textarea
          className="input min-h-64 w-full leading-relaxed"
          required
          maxLength={200000}
          value={draft.body}
          onChange={(e) => set({ ...draft, body: e.target.value })}
        />
      </Field>
      <p className="text-xs text-ink-muted">
        {draft.body.length.toLocaleString()} captured characters
      </p>
      <button className="btn-primary" disabled={action.busy}>
        Save capture
      </button>{' '}
      <button className="btn-ghost" type="button" onClick={onClose}>
        Close capture
      </button>
    </form>
  )
}
