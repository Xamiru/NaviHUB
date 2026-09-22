import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { toast, toastError } from '../../lib/toast'
import { useSettings } from '../../lib/hooks'
import CoverageBar, { knownShare, learningShare, lookupInterval, pct, uniqueKnownShare } from './CoverageBar'
import Section from '../Section'
import type { MediaDetail } from '@shared/types'

// "How much of this can I read?" on a series' detail page. The scan walks the
// same text the prep deck does; afterwards the score recomputes itself from
// jp_card on every read, so it stays true as the user learns without rescanning.
export default function CoverageSection({ m }: { m: MediaDetail }) {
  const qc = useQueryClient()
  const [scanning, setScanning] = useState(false)
  // Surfaced next to the percentage on purpose: a comprehension figure that
  // silently assumes 2,000 words is a different kind of lie from one that
  // ignores everything you knew before installing the app.
  const { data: settings } = useSettings()
  const baseline = Number(settings?.['jp.knownBaseline'] ?? 0) || 0

  const { data: coverage, isLoading } = useQuery({
    queryKey: qk.japanese.coverage(m.id),
    queryFn: () => api.japanese.coverage(m.id)
  })
  const { data: scanStatus } = useQuery({
    queryKey: qk.japanese.coverageScanStatus,
    queryFn: () => api.japanese.coverageScanStatus(),
    enabled: scanning,
    refetchInterval: scanning ? 400 : false
  })
  // Both scans walk the same disk and the same synchronous tokenizer — don't
  // start one under another. MangaChaptersSection owns the active poll and
  // shares this exact query key, so this observer can stay idle until that
  // sibling publishes a running status into the shared cache.
  const { data: deckStatus } = useQuery({
    queryKey: qk.japanese.prepDeckStatus,
    queryFn: () => api.japanese.prepDeckStatus(),
    refetchInterval: false
  })

  // Files the word as a review-status card so every knowledge-derived number
  // (this bar, the i+1 feed, the coverage list) stops calling it unknown.
  async function markKnown(word: string): Promise<void> {
    try {
      const added = await api.japanese.markWordsKnown([{ front: word }])
      await qc.invalidateQueries({ queryKey: qk.japanese.all })
      toast(added > 0 ? `Marked 「${word}」 as known` : `「${word}」 already has a card`, 'success')
    } catch (e) {
      toastError(e)
    }
  }

  async function scan() {
    setScanning(true)
    try {
      const res = await api.japanese.scanCoverage(m.id)
      await qc.invalidateQueries({ queryKey: qk.japanese.all })
      toast(`You know ${pct(knownShare(res.tiers))} of the words in "${m.title}"`, 'success')
    } catch (e) {
      toastError(e)
    } finally {
      setScanning(false)
    }
  }

  const busy = scanning || !!deckStatus?.running
  const scanLabel = scanning
    ? scanStatus && scanStatus.total > 0
      ? `Scanning ${scanStatus.done}/${scanStatus.total}…`
      : 'Scanning…'
    : coverage
      ? 'Rescan'
      : 'Scan comprehension'

  if (isLoading) return null

  return (
    <Section
      title="Comprehension"
      subtitle={coverage ? `scanned ${coverage.scannedAt.slice(0, 10)}` : undefined}
    >
      {!coverage ? (
        <div className="card p-4">
          <p className="mb-3 text-sm text-gray-400">
            Read this series&apos; own text and work out how much of its vocabulary you already know.
          </p>
          <button className="btn-ghost" disabled={busy} onClick={() => void scan()}>
            {scanLabel}
          </button>
        </div>
      ) : (
        <div className="card p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="text-sm">
              <span className="text-2xl font-semibold text-signal-affirmative">
                {pct(knownShare(coverage.tiers))}
              </span>{' '}
              <span className="text-gray-400">known</span>
              {learningShare(coverage.tiers) > 0 && (
                <span className="text-signal-caution"> +{pct(learningShare(coverage.tiers))} learning</span>
              )}
            </p>
            <p className="text-xs text-gray-500">
              {pct(uniqueKnownShare(coverage.tiers))} of {coverage.uniqueWords.toLocaleString()} unique
              words · {coverage.chaptersScanned} chapters
              {baseline > 0 && ` · assumes top ${baseline.toLocaleString()} known`}
            </p>
          </div>

          <CoverageBar tiers={coverage.tiers} className="mt-3" />
          {lookupInterval(coverage.tiers) != null && (
            <p className="mt-1.5 text-xs text-gray-500">
              about 1 unknown word every{' '}
              <span className="text-gray-300">{lookupInterval(coverage.tiers)}</span> words of text
            </p>
          )}

          {coverage.projection.length > 0 && knownShare(coverage.tiers) < 0.98 && (
            <div className="mt-3">
              <p className="mb-1.5 text-[11px] uppercase tracking-widest text-gray-500">
                What learning buys you
              </p>
              <div className="space-y-0.5 text-sm">
                {coverage.projection
                  .filter(
                    (step, i, arr) =>
                      i === 0 || Math.round(step.share * 100) > Math.round(arr[i - 1].share * 100)
                  )
                  .map((step) => (
                    <p key={step.learnWords} className="text-gray-400">
                      learn the top {step.learnWords} unknown →{' '}
                      <span className="text-signal-affirmative">{pct(step.share)}</span>
                    </p>
                  ))}
              </div>
            </div>
          )}

          {coverage.topUnknown.length > 0 && (
            <div className="mt-3">
              <p className="mb-1.5 text-[11px] uppercase tracking-widest text-gray-500">
                Most frequent unknown words
              </p>
              <div className="flex flex-wrap gap-1">
                {coverage.topUnknown.slice(0, 20).map((w) => (
                  <span key={w.word} className="group inline-flex items-center">
                    <Link
                      to={`/japanese/dictionary?q=${encodeURIComponent(w.word)}`}
                      className="chip bg-base-700 text-gray-300 hover:text-accent"
                    >
                      {w.word} <span className="text-gray-500">×{w.count}</span>
                    </Link>
                    {/* This list is exactly "words this series uses that you do
                        not know", so it is the highest-value place to correct
                        the ones you actually do. */}
                    <button
                      className="ml-0.5 hidden rounded px-1 py-0.5 text-[10px] text-gray-500 hover:text-accent group-hover:block group-focus-within:block"
                      title={`I already know ${w.word}`}
                      aria-label={`I already know ${w.word}`}
                      onClick={() => void markKnown(w.word)}
                    >
                      ✓
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            <button className="btn-ghost" disabled={busy} onClick={() => void scan()}>
              {scanLabel}
            </button>
            <Link to="/japanese/coverage" className="btn-ghost">
              Compare series
            </Link>
          </div>
        </div>
      )}
    </Section>
  )
}
