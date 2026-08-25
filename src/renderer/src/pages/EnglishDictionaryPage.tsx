import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useDebouncedValue } from '../lib/hooks'
import { toast } from '../lib/toast'
import Section from '../components/Section'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import EntryCard, { savedKey } from '../components/english/EnEntryCard'
import type { EnDictEntry, EnDictMeaning, EnWord } from '@shared/types'
import EditorialDetailFrame from '../components/EditorialDetailFrame'
import ContextPanel, { ContextFact } from '../components/ContextPanel'
import QuietWorkspace from '../components/QuietWorkspace'

// English→English dictionary (Learn section): look a word up on
// dictionaryapi.dev (through main — the renderer can't fetch remote hosts) and
// save any definition as a card. Saved words are a flat personal list below,
// deliberately outside the Japanese SRS.

export default function EnglishDictionaryPage() {
  const [query, setQuery] = usePersistedState('enDictQuery', '')
  const debounced = useDebouncedValue(query.trim(), 250)
  const qc = useQueryClient()
  const [saving, setSaving] = useState<Set<string>>(new Set())

  const { data: entries = [], isFetching } = useQuery({
    queryKey: qk.english.lookup(debounced),
    queryFn: () => api.english.lookup(debounced),
    enabled: debounced.length > 0
  })

  // Null = no offline dictionary installed, so lookups go online.
  const { data: dictInfo } = useQuery({
    queryKey: qk.english.dictInfo,
    queryFn: () => api.english.dictInfo()
  })

  // One unfiltered list serves both the saved-state chips on results and the
  // Saved section (which filters client-side — a personal list stays small).
  const { data: words = [] } = useQuery({
    queryKey: qk.english.words(''),
    queryFn: () => api.english.listWords()
  })
  const saved = useMemo(() => new Set(words.map((w) => savedKey(w.word, w.meaning))), [words])

  async function save(entry: EnDictEntry, meaning: EnDictMeaning, definition: string, example: string | null) {
    const key = savedKey(entry.word, definition)
    setSaving((s) => new Set(s).add(key))
    try {
      await api.english.saveWord({
        word: entry.word,
        phonetic: entry.phonetic,
        pos: meaning.partOfSpeech || null,
        meaning: definition,
        example
      })
      await qc.invalidateQueries({ queryKey: qk.english.all })
      toast(`Saved “${entry.word}”`, 'success')
    } finally {
      setSaving((s) => {
        const next = new Set(s)
        next.delete(key)
        return next
      })
    }
  }

  return (
    <EditorialDetailFrame
      width="wide"
      aside={
        <ContextPanel title="Dictionary evidence" identity={debounced || 'dictionary-idle'}>
          <ContextFact label="Lookup source">
            {dictInfo === null ? 'Online fallback' : 'Offline WordNet'}
          </ContextFact>
          <ContextFact label="Current results">
            {debounced ? `${entries.length} entries` : 'Waiting for a search'}
          </ContextFact>
          <ContextFact label="Saved vocabulary">{words.length} definitions</ContextFact>
          <ContextFact label="Review path">
            Every saved definition joins the English review deck.
          </ContextFact>
        </ContextPanel>
      }
    >
      <PageHeader
        back={{ to: '/english', label: 'English' }}
        title="Dictionary"
        subtitle="Look a word up, save the definition that fits — every saved word joins the review deck."
      />

      {dictInfo === null && (
        <div className="card mb-4 p-4 text-sm text-gray-400">
          No offline dictionary installed — searches go to dictionaryapi.dev (online). Install
          WordNet in{' '}
          <Link to="/settings" className="text-accent hover:underline">
            Settings → Dictionaries
          </Link>{' '}
          to look words up with no network.
        </div>
      )}

      <QuietWorkspace
        title="Lookup"
        description="Search, compare definitions and save only the sense that fits."
      >
        <input
          className="input w-full text-lg"
          placeholder="e.g. ephemeral, serendipity, sunset…"
          value={query}
          autoFocus
          onChange={(e) => setQuery(e.target.value)}
        />
      </QuietWorkspace>

      <div className="mt-5 space-y-4">
        {debounced.length === 0 ? null : isFetching && entries.length === 0 ? (
          <p className="text-sm text-gray-500">Searching…</p>
        ) : entries.length === 0 ? (
          <p className="text-sm text-gray-500">No definitions found for “{debounced}”.</p>
        ) : (
          entries.map((entry, i) => (
            <EntryCard
              key={`${entry.word} ${i}`}
              entry={entry}
              saved={saved}
              saving={saving}
              onSave={save}
            />
          ))
        )}
      </div>

      <SavedWords words={words} />
    </EditorialDetailFrame>
  )
}

function SavedWords({ words }: { words: EnWord[] }) {
  const [filter, setFilter] = usePersistedState('enSavedFilter', '')
  const qc = useQueryClient()
  const [removing, setRemoving] = useState<number | null>(null)

  const q = filter.trim().toLowerCase()
  const shown = q
    ? words.filter(
        (w) => w.word.toLowerCase().includes(q) || w.meaning.toLowerCase().includes(q)
      )
    : words

  async function remove(w: EnWord) {
    setRemoving(w.id)
    try {
      await api.english.removeWord(w.id)
      await qc.invalidateQueries({ queryKey: qk.english.all })
    } finally {
      setRemoving(null)
    }
  }

  return (
    <Section
      title="Saved words"
      subtitle={words.length > 0 ? `${words.length} saved` : undefined}
      className="mt-10"
    >
      {words.length === 0 ? (
        <EmptyState
          title="Nothing saved yet"
          body="Look a word up and hit Save on the definition you want to keep."
        />
      ) : (
        <>
          <input
            className="input mb-3 w-full"
            placeholder="Filter saved words…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          {shown.length === 0 ? (
            <p className="text-sm text-gray-500">No saved words match “{filter.trim()}”.</p>
          ) : (
            <ul className="space-y-1.5">
              {shown.map((w) => (
                <li key={w.id} className="card flex items-start gap-3 p-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm">
                      <span className="font-semibold">{w.word}</span>
                      {w.phonetic && <span className="ml-2 text-xs text-gray-500">{w.phonetic}</span>}
                      {w.pos && <span className="ml-2 text-xs text-gray-500">{w.pos}</span>}
                    </p>
                    <p className="mt-0.5 text-sm text-gray-300">{w.meaning}</p>
                    {w.example && (
                      <p className="mt-0.5 text-xs italic text-gray-500">“{w.example}”</p>
                    )}
                  </div>
                  <button
                    className="btn-ghost shrink-0 px-2 py-1 text-xs text-gray-500"
                    aria-label={`Remove ${w.word}`}
                    disabled={removing === w.id}
                    onClick={() => void remove(w)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </Section>
  )
}
