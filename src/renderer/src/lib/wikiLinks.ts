import { useQuery } from '@tanstack/react-query'
import { api } from './api'
import { qk } from './queryKeys'
import { extractWikiTitles, wikiTarget } from '@shared/wikiLinks'
import type { MdLinkResolver } from '../components/Markdown'

// Resolves the `wiki:Article_Title` hrefs in imported prose to in-app routes,
// so a wiki paragraph reads like Wikipedia: names are clickable when we hold
// the entity, quiet text when we don't.
//
// The whole-app wiki would swap this hook's queryFn and nothing else —
// MdLinkResolver and WrestlingLinkTarget are already the generic shapes.
export function useWikiLinks(text: string | null | undefined): MdLinkResolver | undefined {
  const titles = extractWikiTitles(text)
  const { data } = useQuery({
    queryKey: qk.wrestling.links(titles),
    queryFn: () => api.wrestling.resolveLinks(titles),
    enabled: titles.length > 0,
    // Resolution only changes on re-import, which invalidates the whole
    // qk.wrestling prefix anyway.
    staleTime: Infinity
  })
  if (!data) return undefined

  const routes = new Map<string, string>()
  for (const t of data) {
    if (t.kind === 'event' && t.id != null) routes.set(t.title, `/wrestling/event/${t.id}`)
    else if (t.kind === 'wrestler' && t.id != null)
      routes.set(t.title, `/wrestling/wrestler/${t.id}`)
  }
  return (href) => {
    const target = wikiTarget(href)
    return target ? (routes.get(target) ?? null) : null
  }
}
