import { useLocation } from 'react-router-dom'
import { RouteTabs } from '../Tabs'
import { hubForPath } from '../../lib/japaneseHubs'

// The tab strip joining a hub's sibling pages (lib/japaneseHubs.ts). Renders
// nothing on a page outside the hubs, so a page can include it unconditionally.
export default function JapaneseHubTabs() {
  const { pathname } = useLocation()
  const match = hubForPath(pathname)
  if (!match) return null
  return (
    <RouteTabs
      label={`${match.hub.title} tools`}
      className="mb-5"
      value={match.tool.key}
      tabs={match.hub.tools.map((t) => ({ key: t.key, label: t.label, to: t.to }))}
    />
  )
}
