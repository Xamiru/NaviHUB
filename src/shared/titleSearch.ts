// Autocomplete ranking for typed title answers: exact, then prefix, then word
// prefix, then an alias match, then a substring. Nothing until the player types.

export interface TitleChoice {
  key: string
  label: string
  aliases: string[]
  detail?: string | null
}

export function normalizeTitleText(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLocaleLowerCase()
    .replace(/[’'`]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
}

interface PreparedChoice {
  label: string
  words: string[]
  aliases: string[]
}

// The choices are the whole library and are searched on every keystroke, so
// each choice object is normalised once and reused while the caller keeps it.
const preparedChoices = new WeakMap<TitleChoice, PreparedChoice>()

function prepare(choice: TitleChoice): PreparedChoice {
  let prepared = preparedChoices.get(choice)
  if (!prepared) {
    const label = normalizeTitleText(choice.label)
    prepared = { label, words: label.split(' '), aliases: choice.aliases.map(normalizeTitleText) }
    preparedChoices.set(choice, prepared)
  }
  return prepared
}

function rank(choice: TitleChoice, query: string): number | null {
  const { label, words, aliases } = prepare(choice)
  if (label === query) return 0
  if (label.startsWith(query)) return 1
  if (words.some((word) => word.startsWith(query))) return 2
  if (aliases.some((alias) => alias === query || alias.startsWith(query))) return 3
  if (label.includes(query) || aliases.some((alias) => alias.includes(query))) return 4
  return null
}

export function searchTitleChoices(
  choices: readonly TitleChoice[],
  query: string,
  limit = 8
): TitleChoice[] {
  const normalized = normalizeTitleText(query)
  if (!normalized) return []
  return choices
    .map((choice) => ({ choice, rank: rank(choice, normalized) }))
    .filter((row): row is { choice: TitleChoice; rank: number } => row.rank != null)
    .sort(
      (a, b) =>
        a.rank - b.rank ||
        a.choice.label.length - b.choice.label.length ||
        a.choice.label.localeCompare(b.choice.label, undefined, { sensitivity: 'base' })
    )
    .slice(0, Math.max(0, limit))
    .map((row) => row.choice)
}
