const EXCERPT_MAX = 320

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function hasWordEdges(value: string): boolean {
  return /^[\p{Script=Latin}\p{N}]/u.test(value) && /[\p{Script=Latin}\p{N}]$/u.test(value)
}

function redactValues(
  text: string,
  values: readonly (string | null | undefined)[],
  replacement: string
): string {
  let out = text
  const unique = [...new Set(values.map((value) => value?.trim()).filter(Boolean) as string[])]
    .filter((value) => !/^[ai]$/i.test(value))
    .sort((a, b) => b.length - a.length)
  for (const value of unique) {
    const escaped = escapeRegExp(value)
    const pattern = hasWordEdges(value)
      ? `(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`
      : escaped
    out = out.replace(new RegExp(pattern, 'giu'), replacement)
  }
  return out
}

export function redactQuizAliases(text: string, aliases: readonly (string | null | undefined)[]): string {
  return redactValues(text, aliases, '[title omitted]')
}

export function redactQuizNames(text: string, names: readonly (string | null | undefined)[]): string {
  return redactValues(text, names, '[name omitted]')
}

export function synopsisExcerpt(
  text: string,
  aliases: readonly (string | null | undefined)[] = [],
  max = EXCERPT_MAX,
  names: readonly (string | null | undefined)[] = []
): string {
  const flat = redactQuizNames(redactQuizAliases(text, aliases), names).replace(/\s+/g, ' ').trim()
  if (flat.length <= max) return flat
  const candidate = flat.slice(0, max + 1)
  const sentence = Math.max(
    candidate.lastIndexOf('. '),
    candidate.lastIndexOf('! '),
    candidate.lastIndexOf('? '),
    candidate.lastIndexOf('。'),
    candidate.lastIndexOf('！'),
    candidate.lastIndexOf('？')
  )
  if (sentence >= max * 0.55) return candidate.slice(0, sentence + 1)
  const word = candidate.lastIndexOf(' ', max)
  return `${candidate.slice(0, word >= max * 0.6 ? word : max)}...`
}
