import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import { usePersistedState } from '../lib/navState'
import { useIncrementalList } from '../lib/hooks'
import { toastError } from '../lib/toast'
import StatTile from '../components/StatTile'
import Section from '../components/Section'
import MiningPanel from '../components/reader/MiningPanel'
import CoverageBar, {
  knownShare,
  learningShare,
  pct,
  TIER_LABEL,
  TIER_TEXT,
  uniqueKnownShare
} from '../components/japanese/CoverageBar'
import type { JpAnalyzedToken, JpTextAnalysis, JpWordTier } from '@shared/types'
import EditorialDetailFrame from '../components/EditorialDetailFrame'
import ContextPanel, { ContextFact } from '../components/ContextPanel'
import QuietWorkspace from '../components/QuietWorkspace'

// The comprehension score pointed at arbitrary text: paste anything Japanese
// and see which words you know, which you're learning and which are new — then
// mine the new ones without leaving the page.

const TOKEN_CLASS: Record<JpWordTier | 'nonword', string> = {
  known: 'text-signal-affirmative',
  learning: 'text-signal-caution',
  unstarted: 'text-sky-300',
  unknown: 'text-gray-100 underline decoration-gray-600 decoration-dotted underline-offset-4',
  nonword: 'text-gray-500'
}

export default function JapaneseAnalyzePage() {
  const [text, setText] = usePersistedState('jpAnalyzeText', '')
  const [result, setResult] = useState<JpTextAnalysis | null>(null)
  const [busy, setBusy] = useState(false)
  // The paragraph a mined word came from, so the card keeps real context.
  const [mining, setMining] = useState<{ term: string; context: string } | null>(null)

  async function analyze() {
    if (!text.trim()) return
    setBusy(true)
    try {
      setResult(await api.japanese.analyzeText(text))
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
    }
  }

  return (
    <EditorialDetailFrame
      width="wide"
      aside={
        result ? (
          <ContextPanel title="Reading evidence" identity={result.stats.tokenCount}>
            <ContextFact label="Known by usage">{pct(knownShare(result.stats.tiers))}</ContextFact>
            <ContextFact label="Known unique words">
              {pct(uniqueKnownShare(result.stats.tiers))}
            </ContextFact>
            <ContextFact label="Unknown vocabulary">
              {result.stats.tiers.unknown.uniqueCount.toLocaleString()} words
            </ContextFact>
            <ContextFact label="Next action">
              Select a highlighted word in the text to open the mining panel.
            </ContextFact>
          </ContextPanel>
        ) : (
          <ContextPanel title="Analysis flow" identity="empty-analysis">
            <ContextFact label="Input">Paste Japanese text from any local source.</ContextFact>
            <ContextFact label="Evidence">Coverage uses your current offline study state.</ContextFact>
            <ContextFact label="Output">Unknown words can move directly into mining.</ContextFact>
          </ContextPanel>
        )
      }
    >
      <PageHeader
        back={{ to: "/japanese", label: "Japanese" }}
        title="Analyze text"
        subtitle="Paste any Japanese text to see how much of it you can read."
      />

      <QuietWorkspace
        title="Source text"
        description="Tokenization, coverage and dictionary evidence stay on this device."
      >
        <textarea
          aria-label="Japanese source text to analyze"
          className="input min-h-[180px] w-full font-normal leading-7"
          placeholder="Paste Japanese text here…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="mt-3 flex items-center gap-3">
          <button className="btn-primary" disabled={busy || !text.trim()} onClick={() => void analyze()}>
            {busy ? 'Analyzing…' : 'Analyze'}
          </button>
          {text.length > 0 && (
            <span className="text-xs text-gray-500">{text.length.toLocaleString()} characters</span>
          )}
          {result && (
            <button
              className="btn-ghost ml-auto"
              onClick={() => {
                setText('')
                setResult(null)
                setMining(null)
              }}
            >
              Clear
            </button>
          )}
        </div>
      </QuietWorkspace>

      {result && <AnalysisView result={result} onMine={setMining} />}

      {mining && (
        <MiningPanel
          mediaId={null}
          blockText={mining.context}
          initialTerm={mining.term}
          onClose={() => setMining(null)}
        />
      )}
    </EditorialDetailFrame>
  )
}

function AnalysisView({
  result,
  onMine
}: {
  result: JpTextAnalysis
  onMine: (m: { term: string; context: string }) => void
}) {
  // A full-volume paste is tens of thousands of chips — render in batches.
  const { visible, sentinelRef } = useIncrementalList(result.paragraphs, 96)
  // Same for the unknown table: main caps the list, this keeps even that cap
  // off the first paint.
  const { visible: unknownVisible, sentinelRef: unknownSentinel } = useIncrementalList(
    result.unknown,
    96
  )
  const { stats } = result

  if (stats.tokenCount === 0) {
    return <p className="mt-6 text-sm text-gray-500">No Japanese words found in that text.</p>
  }

  return (
    <>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Known (by usage)" value={pct(knownShare(stats.tiers))} />
        <StatTile label="Known (unique words)" value={pct(uniqueKnownShare(stats.tiers))} />
        <StatTile label="Words" value={stats.tokenCount.toLocaleString()} />
        <StatTile label="Unknown words" value={stats.tiers.unknown.uniqueCount.toLocaleString()} />
      </div>

      <CoverageBar tiers={stats.tiers} className="mt-3" />
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
        {(['known', 'learning', 'unstarted', 'unknown'] as JpWordTier[]).map((t) => (
          <span key={t} className={TIER_TEXT[t]}>
            {TIER_LABEL[t]} {stats.tiers[t].uniqueCount.toLocaleString()}
          </span>
        ))}
        {learningShare(stats.tiers) > 0 && (
          <span className="text-gray-500">+{pct(learningShare(stats.tiers))} of usage in learning</span>
        )}
      </div>

      <div className="card mt-4 space-y-3 p-4 leading-loose">
        {visible.map((para, i) => (
          <Paragraph key={i} tokens={para} onMine={onMine} />
        ))}
        <div ref={sentinelRef} />
      </div>

      {result.unknown.length > 0 && (
        <Section
          title="Unknown words"
          className="mt-6"
          subtitle={
            result.unknown.length < stats.tiers.unknown.uniqueCount
              ? `top ${result.unknown.length.toLocaleString()} of ${stats.tiers.unknown.uniqueCount.toLocaleString()}`
              : undefined
          }
        >
          <div className="card divide-y divide-base-700">
            {unknownVisible.map((u) => (
              <div key={u.word} className="flex items-center gap-3 p-2.5 text-sm">
                <span className="w-24 shrink-0 font-medium">{u.word}</span>
                <span className="w-16 shrink-0 text-xs text-gray-500">×{u.count}</span>
                <span className="w-28 shrink-0 truncate text-xs text-gray-400">{u.reading ?? ''}</span>
                <span className="min-w-0 flex-1 truncate text-gray-300">{u.gloss ?? ''}</span>
                <button
                  className="btn-ghost shrink-0 py-1 px-2 text-xs"
                  onClick={() => onMine({ term: u.word, context: '' })}
                >
                  Mine
                </button>
              </div>
            ))}
            <div ref={unknownSentinel} />
          </div>
        </Section>
      )}
    </>
  )
}

function Paragraph({
  tokens,
  onMine
}: {
  tokens: JpAnalyzedToken[]
  onMine: (m: { term: string; context: string }) => void
}) {
  const context = tokens.map((t) => t.surface).join('')
  return (
    <p>
      {tokens.map((t, i) =>
        t.tier === 'nonword' ? (
          <span key={i} className={TOKEN_CLASS.nonword}>
            {t.surface}
          </span>
        ) : (
          <button
            key={i}
            className={`${TOKEN_CLASS[t.tier]} hover:text-accent`}
            title={`${t.base} — ${TIER_LABEL[t.tier]}`}
            onClick={() => onMine({ term: t.base, context })}
          >
            {t.surface}
          </button>
        )
      )}
    </p>
  )
}
