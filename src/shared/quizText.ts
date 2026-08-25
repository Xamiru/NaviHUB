const EXCERPT_MAX = 320

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function redactQuizAliases(text: string, aliases: readonly (string | null | undefined)[]): string {
  let out = text
  for (const alias of aliases) {
    const value = alias?.trim()
    if (!value || value.length < 3) continue
    out = out.replace(new RegExp(escapeRegExp(value), 'gi'), '[title omitted]')
  }
  return out
}

export function synopsisExcerpt(
  text: string,
  aliases: readonly (string | null | undefined)[] = [],
  max = EXCERPT_MAX
): string {
  const flat = redactQuizAliases(text, aliases).replace(/\s+/g, ' ').trim()
  if (flat.length <= max) return flat
  const candidate = flat.slice(0, max + 1)
  const sentence = Math.max(candidate.lastIndexOf('. '), candidate.lastIndexOf('! '), candidate.lastIndexOf('? '))
  if (sentence >= max * 0.55) return candidate.slice(0, sentence + 1)
  const word = candidate.lastIndexOf(' ', max)
  return `${candidate.slice(0, word >= max * 0.6 ? word : max)}...`
}
