// The in-app link an event happened on, as the path it points at, or null. In-app
// links are `#/…` hrefs owned by the tab router; this is how TabInput (modified
// clicks) and GlobalContextMenu (right-click) recognise them.
export function internalLinkElement(target: EventTarget | null): HTMLAnchorElement | null {
  const el = target instanceof Element ? target : null
  return el?.closest<HTMLAnchorElement>('a[href^="#/"]') ?? null
}

export function internalLinkPath(target: EventTarget | null): string | null {
  const href = internalLinkElement(target)?.getAttribute('href')
  return href ? href.slice(1) : null
}
