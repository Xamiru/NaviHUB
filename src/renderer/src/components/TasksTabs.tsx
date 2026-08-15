import Tabs from './Tabs'

// The Tasks / Logs rail, shared by both pages. Tabs carry `to`, so the URL owns
// which one is showing — that is what lets the native Tools menu and Ctrl+K
// deep-link straight to the logs, and it keeps the log poll unmounted while
// you are on the Tasks tab.
export default function TasksTabs({ value }: { value: 'tasks' | 'logs' }) {
  return (
    <Tabs
      className="mb-4"
      value={value}
      tabs={[
        { key: 'tasks', label: 'Tasks', to: '/tasks' },
        { key: 'logs', label: 'Logs', to: '/tasks/logs' }
      ]}
    />
  )
}
