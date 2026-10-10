import { useState, type ReactNode } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { type SaveFn, confirmRemove, SettingCard } from './shared'

const BASELINE_STEPS = [0, 500, 1000, 2000, 3000, 5000]

export function KnownBaselineSettings({
  data,
  onSave
}: {
  data?: Record<string, string>
  onSave: SaveFn
}) {
  const current = Number(data?.['jp.knownBaseline'] ?? 0) || 0
  return (
    <SettingCard
      title="Assumed known words"
      description="Counts the most common N Japanese words as already known, on top of your deck. This feeds comprehension percentages, the i+1 feed and the coverage list. Needs a frequency dictionary installed below."
    >
      <div className="flex flex-wrap gap-2">
        {BASELINE_STEPS.map((n) => (
          <button
            key={n}
            onClick={() => void onSave('jp.knownBaseline', String(n))}
            className={current === n ? 'pill pill-active' : 'pill'}
          >
            {n === 0 ? 'Off' : `Top ${n.toLocaleString()}`}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-gray-500">
        {current === 0
          ? 'Off — only cards in your deck count as known.'
          : `Your deck plus the top ${current.toLocaleString()} words. Set it to what you can honestly read, not what you would like to: every comprehension number is built on it.`}
      </p>
    </SettingCard>
  )
}

export function DictionarySettings() {
  const qc = useQueryClient()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Installed-detection for the preset rows: match by title prefix (the zips'
  // index.json titles start with these).
  const hasDict = (prefix: string): boolean =>
    dicts.some((d) => d.title.toLowerCase().startsWith(prefix.toLowerCase()))

  const { data: dicts = [], isPending: dictsPending, isError: dictsError } = useQuery({
    queryKey: qk.dict.list,
    queryFn: () => api.dict.list()
  })
  const { data: status, isPending: statusPending, isError: statusError } = useQuery({
    queryKey: qk.dict.importStatus,
    queryFn: () => api.dict.importStatus(),
    // Self-gating off the polled data as well as local busy: the sentence-audio
    // pack downloads for ~20 minutes, and navigating away+back must resume the
    // progress display (updater.ts idiom).
    refetchInterval: (q) => (busy || q.state.data?.running ? 400 : false)
  })
  const { data: sentenceBank, isPending: sentencesPending, isError: sentencesError } = useQuery({
    queryKey: qk.dict.sentenceBank,
    queryFn: () => api.dict.sentenceBank()
  })
  const { data: strokeSet, isPending: strokesPending, isError: strokesError } = useQuery({
    queryKey: qk.dict.strokeSet,
    queryFn: () => api.dict.strokeSet()
  })
  const { data: kradSet, isPending: kradPending, isError: kradError } = useQuery({
    queryKey: qk.dict.kradSet,
    queryFn: () => api.dict.kradSet()
  })
  const { data: grammarBank, isPending: grammarPending, isError: grammarError } = useQuery({
    queryKey: qk.dict.grammarBank,
    queryFn: () => api.dict.grammarBank()
  })
  const { data: pairSet, isPending: pairsPending, isError: pairsError } = useQuery({
    queryKey: qk.dict.pairSet,
    queryFn: () => api.dict.pairSet()
  })
  const { data: sentenceAudio, isPending: audioPending, isError: audioError } = useQuery({
    queryKey: qk.dict.sentenceAudioBank,
    queryFn: () => api.dict.sentenceAudioBank()
  })

  async function run(fn: () => Promise<unknown>) {
    setError(null)
    setBusy(true)
    try {
      await fn()
      await qc.invalidateQueries({ queryKey: qk.dict.all })
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setBusy(false)
    }
  }

  const running = !!status?.running
  const blocked = busy || running
  const readError = dictsError || statusError || sentencesError || strokesError || kradError ||
    grammarError || pairsError || audioError
  const readPending = dictsPending || statusPending || sentencesPending || strokesPending ||
    kradPending || grammarPending || pairsPending || audioPending

  if (readError || readPending) {
    return (
      <SettingCard title="Japanese dictionaries">
        {readError ? (
          <div role="alert" className="text-sm text-red-400">
            Dictionary state could not be loaded.
            <button className="btn-ghost ml-3" onClick={() => void qc.invalidateQueries({ queryKey: qk.dict.all })}>
              Retry
            </button>
          </div>
        ) : <p className="text-sm text-gray-500">Loading dictionaries…</p>}
      </SettingCard>
    )
  }

  return (
    <SettingCard
      title="Japanese dictionaries"
      description={
        <>
          Offline dictionaries power the Japanese section&apos;s lookup, word mining and the manga
          reader. Install JMdict and KANJIDIC with one click; import pitch-accent, grammar (DOJG) and
          和英 dictionaries as Yomitan <span className="text-gray-400">.zip</span> files exported from
          the extension. Large one-time downloads (JMdict is ~60&nbsp;MB); everything then works with
          no network.
        </>
      }
    >
      <div className="mb-4 space-y-1.5">
          {dicts.map((d) => (
            <PackRow
              key={d.id}
              title={d.title}
              detail={
                <>
                  {d.termCount > 0 && <span>{d.termCount.toLocaleString()} words</span>}
                  {d.termCount > 0 && d.kanjiCount > 0 && ' · '}
                  {d.kanjiCount > 0 && <span>{d.kanjiCount.toLocaleString()} kanji</span>}
                  {d.freqCount > 0 && (d.termCount > 0 || d.kanjiCount > 0) && ' · '}
                  {d.freqCount > 0 && <span>{d.freqCount.toLocaleString()} frequency ranks</span>}
                  {d.pitchCount > 0 && d.termCount === 0 && d.kanjiCount === 0 && (
                    <span>{d.pitchCount.toLocaleString()} pitch accents</span>
                  )}
                  {d.revision && <span className="ml-1 text-gray-600">· {d.revision}</span>}
                </>
              }
              busy={blocked}
              onRemove={async () => {
                if (await confirmRemove(`Remove "${d.title}"?`)) void run(() => api.dict.remove(d.id))
              }}
            />
          ))}
          {sentenceBank && (
            <PackRow
              title="Example sentences (Tatoeba)"
              detail={<span>{sentenceBank.sentenceCount.toLocaleString()} sentence pairs</span>}
              busy={blocked}
              onRemove={async () => {
                if (await confirmRemove('Remove the example-sentence bank?')) {
                  void run(() => api.dict.removeSentences())
                }
              }}
            />
          )}
          {strokeSet && (
            <PackRow
              title="Stroke order (KanjiVG)"
              detail={
                <>
                  <span>{strokeSet.charCount.toLocaleString()} characters</span>
                  {strokeSet.revision && <span className="ml-1 text-gray-600">· {strokeSet.revision}</span>}
                </>
              }
              busy={blocked}
              onRemove={async () => {
                if (await confirmRemove('Remove the stroke-order data?')) {
                  void run(() => api.dict.removeStrokes())
                }
              }}
            />
          )}
          {sentenceAudio && (
            <PackRow
              title="Sentence audio (Tatoeba)"
              detail={<span>{sentenceAudio.clipCount.toLocaleString()} recorded sentences</span>}
              busy={blocked}
              onRemove={async () => {
                if (await confirmRemove('Remove the sentence audio (and its clip files)?')) {
                  void run(() => api.dict.removeSentenceAudio())
                }
              }}
            />
          )}
          {pairSet && (
            <PackRow
              title="Pitch minimal pairs (kotu)"
              detail={
                <>
                  <span>{pairSet.pairCount.toLocaleString()} pairs with audio</span>
                  {pairSet.revision && <span className="ml-1 text-gray-600">· {pairSet.revision}</span>}
                </>
              }
              busy={blocked}
              onRemove={async () => {
                if (await confirmRemove('Remove the minimal-pairs pack (and its audio files)?')) {
                  void run(() => api.dict.removePairs())
                }
              }}
            />
          )}
          {grammarBank && (
            <PackRow
              title="Grammar library (N5–N1)"
              detail={<span>{grammarBank.pointCount.toLocaleString()} grammar points</span>}
              busy={blocked}
              onRemove={async () => {
                if (await confirmRemove('Remove the grammar library?')) {
                  void run(() => api.dict.removeGrammar())
                }
              }}
            />
          )}
          {kradSet && (
            <PackRow
              title="Kanji components (KRADFILE)"
              detail={
                <>
                  <span>
                    {kradSet.kanjiCount.toLocaleString()} kanji ·{' '}
                    {kradSet.componentCount.toLocaleString()} components
                  </span>
                  {kradSet.revision && <span className="ml-1 text-gray-600">· {kradSet.revision}</span>}
                </>
              }
              busy={blocked}
              onRemove={async () => {
                if (await confirmRemove('Remove the kanji-components data?')) {
                  void run(() => api.dict.removeKrad())
                }
              }}
            />
          )}
          {/* Presets not installed yet join the same list as Download rows.
              Dict presets are matched to installed rows by title prefix. */}
          {!hasDict('JMdict') && (
            <PackRow
              title="JMdict (EN)"
              detail="The dictionary itself — lookups, mining, deck generators. ~60 MB."
              busy={blocked}
              onDownload={() => void run(() => api.dict.importPreset('jmdict-en'))}
            />
          )}
          {!hasDict('KANJIDIC') && (
            <PackRow
              title="KANJIDIC (EN)"
              detail="Per-kanji readings and meanings for the kanji breakdown."
              busy={blocked}
              onDownload={() => void run(() => api.dict.importPreset('kanjidic-en'))}
            />
          )}
          {!hasDict('JPDB') && (
            <PackRow
              title="JPDB frequency"
              detail="Word frequency ranks — rank badges, better prep decks, core decks."
              busy={blocked}
              onDownload={() => void run(() => api.dict.importPreset('jpdb-freq'))}
            />
          )}
          {!hasDict('BCCWJ') && (
            <PackRow
              title="BCCWJ frequency"
              detail="Alternative frequency corpus (written Japanese)."
              busy={blocked}
              onDownload={() => void run(() => api.dict.importPreset('bccwj-freq'))}
            />
          )}
          {!hasDict('Kanjium') && (
            <PackRow
              title="Kanjium pitch accents"
              detail="Pitch contours in the dictionary + the pitch-pattern quiz. ~3 MB."
              busy={blocked}
              onDownload={() => void run(() => api.dict.importKanjium())}
            />
          )}
          {!hasDict('JMnedict') && (
            <PackRow
              title="Names (JMnedict)"
              detail="People, places, companies — the #1 lookup miss in manga. ~740k entries, ~11 MB, takes a few minutes."
              busy={blocked}
              onDownload={() => void run(() => api.dict.importPreset('jmnedict'))}
            />
          )}
          {!sentenceBank && (
            <PackRow
              title="Example sentences (Tatoeba)"
              detail="Real usage examples in the dictionary and on mined cards. Takes a minute to index."
              busy={blocked}
              onDownload={() => void run(() => api.dict.importSentences())}
            />
          )}
          {!strokeSet && (
            <PackRow
              title="Stroke order (KanjiVG)"
              detail="Animated stroke diagrams and the writing drill. ~4 MB."
              busy={blocked}
              onDownload={() => void run(() => api.dict.importStrokes())}
            />
          )}
          {!kradSet && (
            <PackRow
              title="Kanji components (KRADFILE)"
              detail="Kanji broken into parts — search by what you can see, build-a-kanji drill. <1 MB."
              busy={blocked}
              onDownload={() => void run(() => api.dict.importKrad())}
            />
          )}
          {!grammarBank && (
            <PackRow
              title="Grammar library (N5–N1)"
              detail="Every JLPT grammar point with formation and examples — the library page + cloze drill. ~2 MB."
              busy={blocked}
              onDownload={() => void run(() => api.dict.importGrammar())}
            />
          )}
          {!pairSet && (
            <PackRow
              title="Pitch minimal pairs (kotu)"
              detail="Native recordings for the pitch perception drill — hear the difference between 箸 and 橋. ~18 MB."
              busy={blocked}
              onDownload={() => void run(() => api.dict.importPairs())}
            />
          )}
          {!sentenceAudio && (
            <PackRow
              title="Sentence audio (Tatoeba)"
              detail={
                sentenceBank
                  ? 'Native recordings for the dictation drill and example playback. Thousands of small downloads — 15-30 min, safe to interrupt (re-running resumes).'
                  : 'Native recordings for the dictation drill. Install the example sentences first — the audio attaches to them.'
              }
              busy={blocked || !sentenceBank}
              onDownload={() => void run(() => api.dict.importSentenceAudio())}
            />
          )}
        </div>

      {running && status && (
        <div className="mb-4">
          <p className="mb-1 text-xs text-gray-400">
            {phaseLabelFor(status.phase)}
            {status.dictTitle ? ` · ${status.dictTitle}` : ''}
            {status.phase === 'downloading' && status.total > 0
              ? ` · ${Math.round((status.done / status.total) * 100)}%`
              : status.done > 0
                ? ` · ${status.done.toLocaleString()}`
                : ''}
          </p>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-base-700">
            <div
              className="h-full bg-accent transition-all"
              style={{
                width:
                  status.phase === 'downloading' && status.total > 0
                    ? `${(status.done / status.total) * 100}%`
                    : '100%',
                opacity: status.phase === 'downloading' ? 1 : 0.5
              }}
            />
          </div>
        </div>
      )}

      <button className="btn-ghost" disabled={blocked} onClick={() => void run(() => api.dict.importZip())}>
        Import Yomitan .zip…
      </button>

      {error && <p className="mt-3 text-sm text-red-400">Import failed: {error}</p>}

      <p className="mt-4 text-xs leading-relaxed text-gray-500">
        Data credits: JMdict, KANJIDIC, JMnedict &amp; KRADFILE © EDRDG (CC BY-SA 4.0) · frequency
        dictionaries from Kuuuube&apos;s yomitan-dictionaries · example sentences © Tatoeba
        contributors (CC BY 2.0 FR, per-sentence attribution kept) · sentence audio © its Tatoeba
        contributors (per-clip licenses kept) · stroke order © KanjiVG, Ulrich Apel (CC BY-SA 3.0)
        · pitch accents © Kanjium (CC BY-SA 4.0) · grammar points © hanabira.org (MIT) · minimal
        pairs from Kuuuube&apos;s kotu.io backup.
      </p>
    </SettingCard>
  )
}

// The offline English dictionary (WordNet + CMUdict). Separate card, same
// download/progress mechanics — it shares the single import gate and the polled
// dict:importStatus, so its progress renders through the same block.
export function EnglishDictionarySettings() {
  const qc = useQueryClient()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { data: info, isPending: infoPending, isError: infoError } = useQuery({
    queryKey: qk.english.dictInfo,
    queryFn: () => api.english.dictInfo()
  })
  const { data: freqInfo, isPending: freqPending, isError: freqError } = useQuery({
    queryKey: qk.english.freqInfo,
    queryFn: () => api.english.freqInfo()
  })
  const { data: status, isPending: statusPending, isError: statusError } = useQuery({
    queryKey: qk.dict.importStatus,
    queryFn: () => api.dict.importStatus(),
    refetchInterval: busy ? 400 : false
  })

  async function run(fn: () => Promise<unknown>) {
    setError(null)
    setBusy(true)
    try {
      await fn()
      await qc.invalidateQueries({ queryKey: qk.english.all })
      await qc.invalidateQueries({ queryKey: qk.dict.all })
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setBusy(false)
    }
  }

  const running = !!status?.running
  const blocked = busy || running

  if (infoError || freqError || statusError || infoPending || freqPending || statusPending) {
    return (
      <SettingCard title="English dictionary">
        {infoError || freqError || statusError ? (
          <div role="alert" className="text-sm text-red-400">
            English dictionary state could not be loaded.
            <button className="btn-ghost ml-3" onClick={() => {
              void qc.invalidateQueries({ queryKey: qk.english.all })
              void qc.invalidateQueries({ queryKey: qk.dict.all })
            }}>
              Retry
            </button>
          </div>
        ) : <p className="text-sm text-gray-500">Loading English dictionary…</p>}
      </SettingCard>
    )
  }

  return (
    <SettingCard
      title="English dictionary"
      description={
        <>
          Offline definitions, examples and synonyms for the English section, from Princeton
          WordNet, plus pronunciations from CMUdict. One ~14&nbsp;MB download; lookups then work with
          no network. Without it the section falls back to the online dictionaryapi.dev. The
          frequency pack ranks 50k words by commonness — it is what the vocab and spelling tests
          build their difficulty bands from.
        </>
      }
    >
      <div className="mb-4 space-y-1.5">
        {info ? (
          <PackRow
            title={`WordNet ${info.version ?? ''}`.trim()}
            detail={`${info.lemmaCount.toLocaleString()} words · ${info.synsetCount.toLocaleString()} senses · ${info.pronCount.toLocaleString()} pronunciations`}
            busy={blocked}
            onRemove={async () => {
              if (await confirmRemove('Remove the offline English dictionary? Lookups will go online.')) {
                void run(() => api.english.removeDict())
              }
            }}
          />
        ) : (
          <PackRow
            title="WordNet 3.0 + pronunciations"
            detail="Definitions, usage examples, synonyms and IPA. ~14 MB, takes a minute to index."
            busy={blocked}
            onDownload={() => void run(() => api.english.importDict())}
          />
        )}
        {freqInfo ? (
          <PackRow
            title="Word frequency (OpenSubtitles)"
            detail={`${freqInfo.wordCount.toLocaleString()} ranked words`}
            busy={blocked}
            onRemove={async () => {
              if (
                await confirmRemove(
                  'Remove the frequency pack? The vocab/spelling band sources will stop working.'
                )
              ) {
                void run(() => api.english.removeFreq())
              }
            }}
          />
        ) : (
          <PackRow
            title="Word frequency (OpenSubtitles)"
            detail="50k ranked words for the vocab and spelling tests' difficulty bands. ~1 MB."
            busy={blocked}
            onDownload={() => void run(() => api.english.importFreq())}
          />
        )}
      </div>

      {running && status && (
        <div className="mb-4">
          <p className="mb-1 text-xs text-gray-400">
            {phaseLabelFor(status.phase)}
            {status.phase === 'downloading' && status.total > 0
              ? ` · ${Math.round((status.done / status.total) * 100)}%`
              : status.done > 0
                ? ` · ${status.done.toLocaleString()}`
                : ''}
          </p>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-base-700">
            <div
              className="h-full bg-accent transition-all"
              style={{
                width:
                  status.phase === 'downloading' && status.total > 0
                    ? `${(status.done / status.total) * 100}%`
                    : '100%',
                opacity: status.phase === 'downloading' ? 1 : 0.5
              }}
            />
          </div>
        </div>
      )}

      {error && <p className="mt-3 text-sm text-red-400">Import failed: {error}</p>}

      <p className="mt-4 text-xs leading-relaxed text-gray-500">
        Data credits: WordNet 3.0 © Princeton University (WordNet License) · CMU Pronouncing
        Dictionary © Carnegie Mellon University (BSD-2-Clause) · word frequency from
        hermitdave/FrequencyWords, OpenSubtitles 2018 (CC BY-SA 4.0).
      </p>
    </SettingCard>
  )
}

// Shared by both dictionary cards — they poll the same import status object.
function phaseLabelFor(phase: string): string {
  const labels: Record<string, string> = {
    downloading: 'Downloading',
    reading: 'Reading',
    terms: 'Importing words',
    kanji: 'Importing kanji',
    pitch: 'Importing pitch accent',
    frequency: 'Importing frequency ranks',
    tags: 'Importing tags',
    sentences: 'Indexing example sentences',
    strokes: 'Importing stroke order',
    english: 'Importing English words',
    pronunciations: 'Importing pronunciations',
    components: 'Importing kanji components',
    grammar: 'Importing grammar points',
    audio: 'Downloading sentence audio',
    pairs: 'Importing minimal pairs',
    finalizing: 'Finalizing'
  }
  return labels[phase] ?? phase
}

// One pack row: an installed dictionary/bank/set (detail + Remove) or an
// available preset (description + Download). One list, per-row state — not a
// wall of download buttons.
export function PackRow({
  title,
  detail,
  busy,
  onRemove,
  onDownload
}: {
  title: string
  detail: ReactNode
  busy: boolean
  onRemove?: () => void
  onDownload?: () => void
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-md border border-base-700 p-2.5 ${
        onDownload ? 'bg-base-900/40' : 'bg-base-800'
      }`}
    >
      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm font-medium ${onDownload ? 'text-gray-400' : ''}`}>
          {title}
        </p>
        <p className="text-xs text-gray-500">{detail}</p>
      </div>
      {onRemove && (
        <button
          className="btn-ghost shrink-0 py-1 px-2 text-xs text-gray-500 hover:text-red-400"
          disabled={busy}
          onClick={onRemove}
        >
          Remove
        </button>
      )}
      {onDownload && (
        <button className="btn-ghost shrink-0 py-1 px-3 text-xs" disabled={busy} onClick={onDownload}>
          Download
        </button>
      )}
    </div>
  )
}

// Reorderable, customizable status list for one media type.
