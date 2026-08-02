import type { EnDictEntry, EnDictMeaning } from '@shared/types'

// One dictionary entry with a Save button per definition. Extracted verbatim
// out of EnglishDictionaryPage so the video player's mining panel can render
// English lookups identically — one look, one saved-state convention.

// A saved (word, meaning) pair's identity, for showing per-definition state.
export const savedKey = (word: string, meaning: string): string => `${word}\x00${meaning}`

export default function EntryCard({
  entry,
  saved,
  saving,
  onSave
}: {
  entry: EnDictEntry
  saved: Set<string>
  saving: Set<string>
  onSave: (
    entry: EnDictEntry,
    meaning: EnDictMeaning,
    definition: string,
    example: string | null
  ) => Promise<void>
}) {
  return (
    <div className="card p-4">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-2xl font-semibold">{entry.word}</span>
        {entry.phonetic && <span className="text-base text-gray-400">{entry.phonetic}</span>}
        {entry.source === 'online' && (
          <span className="chip bg-base-700 text-gray-500">via dictionaryapi.dev</span>
        )}
      </div>

      <div className="mt-3 space-y-4">
        {entry.meanings.map((m, mi) => (
          <div key={mi}>
            <div className="mb-1 text-[11px] uppercase tracking-widest text-gray-500">
              {m.partOfSpeech || 'meaning'}
            </div>
            <ol className="space-y-2">
              {m.definitions.map((def, di) => {
                const key = savedKey(entry.word, def.definition)
                const isSaved = saved.has(key)
                return (
                  <li key={di} className="flex items-start gap-3">
                    <div className="min-w-0 flex-1 text-sm">
                      <p className="text-gray-200">
                        <span className="mr-1.5 text-xs text-gray-600">{di + 1}.</span>
                        {def.definition}
                      </p>
                      {def.example && (
                        <p className="mt-0.5 text-xs italic text-gray-500">“{def.example}”</p>
                      )}
                      {def.synonyms.length > 0 && (
                        <p className="mt-0.5 text-xs text-gray-500">
                          syn: {def.synonyms.slice(0, 6).join(', ')}
                        </p>
                      )}
                    </div>
                    <button
                      className="btn-ghost shrink-0 px-2 py-1 text-xs"
                      disabled={isSaved || saving.has(key)}
                      onClick={() => void onSave(entry, m, def.definition, def.example)}
                    >
                      {isSaved ? 'Saved' : saving.has(key) ? 'Saving…' : '+ Save'}
                    </button>
                  </li>
                )
              })}
            </ol>
            {m.synonyms.length > 0 && (
              <p className="mt-1.5 text-xs text-gray-500">
                also: {m.synonyms.slice(0, 8).join(', ')}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
