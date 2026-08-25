import Tabs from './Tabs'

// The Tasks / Logs rail, shared by both pages. Tabs carry `to`, so the URL owns
// which one is showing — that is what lets the native Tools menu and Ctrl+K
// deep-link straight to the logs, and it keeps the log poll unmounted while
// you are on the Tasks tab.
export type TaskCanvasTab = 'tasks' | 'logs' | 'imports' | 'torrents' | 'settings'

export default function TasksTabs({ value }: { value: TaskCanvasTab }) {
  return (
    <Tabs
      className="mb-4"
      value={value}
      tabs={[
        { key: 'tasks', label: 'Tasks', to: '/tasks' },
        { key: 'logs', label: 'Logs', to: '/tasks/logs' },
        { key: 'imports', label: 'Imports', to: '/bulk' },
        { key: 'torrents', label: 'Torrents', to: '/torrents' },
        { key: 'settings', label: 'Settings', to: '/settings' }
      ]}
    />
  )
}
