import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import { usePersistedState } from '../lib/navState'
import { toastError } from '../lib/toast'
import MiningPanel from '../components/reader/MiningPanel'
import { knownShare, pct, uniqueKnownShare } from '../components/japanese/CoverageBar'
import AnalysisView from '../components/japanese/AnalysisView'
import type { JpTextAnalysis } from '@shared/types'
import EditorialDetailFrame from '../components/EditorialDetailFrame'
import ContextPanel, { ContextFact } from '../components/ContextPanel'
import QuietWorkspace from '../components/QuietWorkspace'

// The comprehension score pointed at arbitrary text: paste anything Japanese
// and see which words you know, which you're learning and which are new — then
// mine the new ones without leaving the page.

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
