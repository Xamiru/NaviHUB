import { useIncrementalList } from '../../lib/hooks'
import StatTile from '../StatTile'
import Section from '../Section'
import CoverageBar, {
  knownShare,
  learningShare,
  pct,
  TIER_LABEL,
  TIER_TEXT,
  uniqueKnownShare
} from './CoverageBar'
import type { JpAnalyzedToken, JpTextAnalysis, JpWordTier } from '@shared/types'

const TOKEN_CLASS: Record<JpWordTier | 'nonword', string> = {
  known: 'text-signal-affirmative',
  learning: 'text-signal-caution',
  unstarted: 'text-sky-300',
  unknown: 'text-gray-100 underline decoration-gray-600 decoration-dotted underline-offset-4',
  nonword: 'text-gray-500'
}

export default function AnalysisView({
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
          <span className="text-gray-500">
            +{pct(learningShare(stats.tiers))} of usage in learning
          </span>
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
                <span className="w-28 shrink-0 truncate text-xs text-gray-400">
                  {u.reading ?? ''}
                </span>
                <span className="min-w-0 flex-1 truncate text-gray-300">{u.gloss ?? ''}</span>
                <button
                  className="btn-ghost shrink-0 py-1 px-2 text-xs"
                  onClick={() =>
                    onMine({
                      term: u.word,
                      context:
                        result.paragraphs
                          .find((p) => p.some((t) => t.base === u.word))
                          ?.map((t) => t.surface)
                          .join('') ?? ''
                    })
                  }
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
