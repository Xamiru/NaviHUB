import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import PageStatus from '../components/PageStatus'
import { Group, Pill } from '../components/PillGroup'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useIncrementalList } from '../lib/hooks'
import { useMiningDraft } from '../lib/useMining'
import { usePlayerControls } from '../lib/player'
import { mediaUrl } from '@shared/mediaUrl'
import type { JpFeedItem } from '@shared/types'
import EditorialDetailFrame from '../components/EditorialDetailFrame'
import ContextPanel, { ContextFact } from '../components/ContextPanel'

// The i+1 sentence feed: sentences where you know every word except exactly
// one — comprehensible input on tap, the unknown one click from your deck.
// The EN hides behind a disclosure on purpose (reading the JP first IS the
// exercise). Feed builds take ~2-3s cold; main caches by knowledge state and
// this page pins staleTime so mining mid-session never triggers a rebuild.

export default function JapaneseFeedPage() {
  const qc = useQueryClient()
  const player = usePlayerControls()
  const [mode, setMode] = usePersistedState<'one' | 'flood'>('jpFeedMode', 'one')
  const [includeLearning, setIncludeLearning] = usePersistedState<boolean>('jpFeedLearning', false)
  const [minedWords, setMinedWords] = useState<Set<string>>(new Set())
  const [openMine, setOpenMine] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const req = { includeLearning, unknowns: (mode === 'one' ? 1 : 0) as 0 | 1 }

  const { data: bank, isLoading: bankLoading } = useQuery({
    queryKey: qk.dict.sentenceBank,
    queryFn: () => api.dict.sentenceBank()
  })
  const { data: feed, isFetching } = useQuery({
    queryKey: qk.japanese.feed(req),
    queryFn: () => api.japanese.feed(req),
    enabled: !!bank,
    staleTime: Infinity
  })

  const { visible, sentinelRef, hasMore } = useIncrementalList(feed?.items ?? [])

  function play(item: JpFeedItem): void {
    if (!item.audioPath) return
    if (player.isPlaying) player.toggle() // one-shot courtesy pause
    audioRef.current?.pause()
    const url = mediaUrl(item.audioPath)
    if (!url) return
    audioRef.current = new Audio(url)
    void audioRef.current.play().catch(() => {})
  }

  if (!bankLoading && !bank) {
    return (
      <EditorialDetailFrame width="wide">
        <PageHeader back={{ to: '/japanese', label: 'Japanese' }} title="Sentence Feed" />
        <EmptyState
          title="Sentence bank not installed"
          body="The feed reads from the offline Tatoeba sentences — install them in Settings → Dictionaries."
          action={
            <Link to="/settings" className="btn-primary">
              Open Settings
            </Link>
          }
        />
      </EditorialDetailFrame>
    )
  }

  return (
    <EditorialDetailFrame
      width="wide"
      aside={
        <ContextPanel title="Feed evidence" identity={`${mode}-${feed?.items.length ?? 0}`}>
          <ContextFact label="Mode">{mode === 'one' ? 'One new word' : 'All words known'}</ContextFact>
          <ContextFact label="Available">{feed?.items.length ?? 0} sentences</ContextFact>
          <ContextFact label="Scanned">{feed?.scanned.toLocaleString() ?? 'Building feed'}</ContextFact>
          <ContextFact label="Source">Offline sentence bank and your current card state</ContextFact>
        </ContextPanel>
      }
    >
      <PageHeader
        back={{ to: '/japanese', label: 'Japanese' }}
        title="Sentence Feed"
        subtitle="Sentences where you know every word but one. Read, tap, mine."
        actions={
          <button
            className="btn-ghost"
            onClick={() => {
              setMinedWords(new Set())
              void qc.invalidateQueries({ queryKey: qk.japanese.feed(req) })
            }}
          >
            Refresh
          </button>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2">
        <Group label="Mode">
          <Pill active={mode === 'one'} onClick={() => setMode('one')} label="One new word" />
          <Pill active={mode === 'flood'} onClick={() => setMode('flood')} label="All known" />
        </Group>
        <label className="flex items-center gap-2 text-sm text-gray-400">
          <input
            aria-label="Count learning cards as known"
            type="checkbox"
            checked={includeLearning}
            onChange={(e) => setIncludeLearning(e.target.checked)}
          />
          Count learning cards as known
        </label>
      </div>

      {isFetching && !feed ? (
        <PageStatus>Building your feed — scanning the sentence bank…</PageStatus>
      ) : !feed || feed.items.length === 0 ? (
        <EmptyState
          title={mode === 'one' ? 'No i+1 sentences right now' : 'No fully-known sentences yet'}
          body={
            feed && feed.scanned > 0
              ? 'Learn a few more lessons (or toggle "count learning cards as known") and sentences will start unlocking.'
              : 'The tokenizer may be unavailable — the feed prefers being empty over being wrong.'
          }
        />
      ) : (
        <>
          <p className="mb-3 text-xs text-gray-500">
            {feed.items.length} sentences
            {feed.fromCache ? ' · cached' : ''} · scanned {feed.scanned.toLocaleString()}
          </p>
          <div className="space-y-2">
            {visible.map((item) => (
              <FeedRow
                key={item.sentenceId}
                item={item}
                mined={item.unknownWord ? minedWords.has(item.unknownWord) : false}
                mineOpen={openMine === item.sentenceId}
                onToggleMine={() =>
                  setOpenMine(openMine === item.sentenceId ? null : item.sentenceId)
                }
                onMined={(word) => {
                  setMinedWords((m) => new Set(m).add(word))
                  setOpenMine(null)
                }}
                onPlay={() => play(item)}
              />
            ))}
          </div>
          {hasMore && <div ref={sentinelRef} />}
        </>
      )}
    </EditorialDetailFrame>
  )
}

function FeedRow({
  item,
  mined,
  mineOpen,
  onToggleMine,
  onMined,
  onPlay
}: {
  item: JpFeedItem
  mined: boolean
  mineOpen: boolean
  onToggleMine: () => void
  onMined: (word: string) => void
  onPlay: () => void
}) {
  const [showEn, setShowEn] = useState(false)

  // Highlight the unknown's surface form inside the sentence.
  const renderJp = (): JSX.Element => {
    const surface = item.unknownSurface
    if (!surface) return <>{item.jp}</>
    const idx = item.jp.indexOf(surface)
    if (idx === -1) return <>{item.jp}</>
    return (
      <>
        {item.jp.slice(0, idx)}
        <span className="font-medium text-accent">{surface}</span>
        {item.jp.slice(idx + surface.length)}
      </>
    )
  }

  const inDeck = mined || item.unknownTier === 'unstarted' || item.unknownTier === 'learning'

  return (
    <div className="card p-3">
      <p className="text-lg leading-relaxed">{renderJp()}</p>
      <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-gray-500">
        <button
          className="hover:text-gray-300"
          aria-expanded={showEn}
          onClick={() => setShowEn(!showEn)}
        >
          {showEn ? '▾' : '▸'} translation
        </button>
        {item.audioPath && (
          <button className="hover:text-gray-300" onClick={onPlay}>
            Play
          </button>
        )}
        {item.unknownWord &&
          (inDeck ? (
            <span className="chip bg-signal-affirmative/20 text-signal-affirmative">
              {item.unknownWord} in your deck
            </span>
          ) : (
            <button className="chip bg-base-700 text-gray-300 hover:text-accent" onClick={onToggleMine}>
              Mine {item.unknownWord}
            </button>
          ))}
        {item.unknownRank != null && <span>rank #{item.unknownRank.toLocaleString()}</span>}
      </div>
      {showEn && <p className="mt-1.5 text-sm text-gray-400">{item.en}</p>}
      {showEn && item.attribution && (
        <p className="mt-0.5 text-xs text-gray-500">{item.attribution}</p>
      )}
      {mineOpen && item.unknownWord && !inDeck && (
        <InlineMine item={item} onMined={onMined} onCancel={onToggleMine} />
      )}
    </div>
  )
}

// Compact inline capture reusing the shared mining draft (a blind quick-add
// would trust the first def; this keeps the edit step).
function InlineMine({
  item,
  onMined,
  onCancel
}: {
  item: JpFeedItem
  onMined: (word: string) => void
  onCancel: () => void
}) {
  const mining = useMiningDraft({
    sourceMediaId: null,
    onSaved: () => onMined(item.unknownWord!)
  })
  const { draft, setDraft, targets, targetLessonId, setLessonId, canSave, saving } = mining

  // Fill once from the offline dictionary; the sentence is the example.
  useEffect(() => {
    void api.dict.lookup(item.unknownWord!).then((entries) => {
      const entry = entries[0]
      if (entry) mining.fillFromEntry(entry, item.jp)
      else setDraft((d) => ({ ...d, front: item.unknownWord!, exampleJp: item.jp }))
      setDraft((d) => ({ ...d, exampleEn: item.en }))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mt-3 space-y-2 border-t border-base-700 pt-3">
      <div className="grid grid-cols-2 gap-2">
        <input
          aria-label="Word to mine"
          className="input"
          placeholder="word"
          value={draft.front}
          onChange={(e) => setDraft({ ...draft, front: e.target.value })}
        />
        <input
          aria-label="Reading of word to mine"
          className="input"
          placeholder="reading"
          value={draft.reading}
          onChange={(e) => setDraft({ ...draft, reading: e.target.value })}
        />
      </div>
      <input
        aria-label="Meaning of word to mine"
        className="input w-full"
        placeholder="meaning"
        value={draft.back}
        onChange={(e) => setDraft({ ...draft, back: e.target.value })}
      />
      <div className="flex items-center gap-2">
        <select
          aria-label="Review deck for mined word"
          className="input flex-1"
          value={targetLessonId ?? ''}
          onChange={(e) => setLessonId(Number(e.target.value))}
        >
          {(targets?.lessons ?? []).map((t) => (
            <option key={t.lessonId} value={t.lessonId}>
              {t.label}
            </option>
          ))}
        </select>
        <button className="btn-primary shrink-0" disabled={!canSave || saving} onClick={() => void mining.save()}>
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button className="btn-ghost shrink-0" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}
