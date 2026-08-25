import { Link } from 'react-router-dom'
import ActionMenu from '../components/ActionMenu'
import EmptyState from '../components/EmptyState'
import PageHeader from '../components/PageHeader'
import Section from '../components/Section'
import TaskRow from '../components/TaskRow'
import { api } from '../lib/api'
import { confirmDialog } from '../lib/confirm'
import { useIncrementalList } from '../lib/hooks'
import { useTasks } from '../lib/useTasks'

// Everything the main process is doing or recently did, in one place. The
// Topbar pill is the live glance; this is the full view with history.
//
// Deliberately NOT StatTile-based: this is a dense terminal list, so the counts
// ride as chips in the header eyebrow instead of a dashboard row.
export default function TasksPage() {
  const { active, finished, kick } = useTasks()
  const { visible, sentinelRef, hasMore } = useIncrementalList(finished)

  const failed = finished.filter((t) => t.state === 'error').length

  async function clearFinished(): Promise<void> {
    await api.tasks.clearFinished()
    await kick()
  }

  async function cancelAll(): Promise<void> {
    const stoppable = active.filter((t) => t.canCancel)
    if (stoppable.length === 0) return
    const ok = await confirmDialog(
      `Stop ${stoppable.length} running task${stoppable.length === 1 ? '' : 's'}?`,
      { confirmLabel: 'Stop all', danger: true }
    )
    if (!ok) return
    for (const task of stoppable) await api.tasks.cancel(task.id)
    await kick()
  }

  return (
    <div className="mx-auto max-w-[1600px] p-4 sm:p-6">
      <PageHeader
        title="Work and maintenance"
        subtitle="A list-first task canvas for imports, downloads, scans, conversions and their structured logs."
        actions={
          <ActionMenu
            items={[
              { label: 'Open logs folder', onSelect: () => api.logs.reveal() },
              { label: 'Stop all running', onSelect: cancelAll, disabled: active.length === 0, danger: true },
              { label: 'Clear finished', onSelect: clearFinished, disabled: finished.length === 0, danger: true }
            ]}
          />
        }
      />

      <div className="grid min-w-0 gap-7 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
        <main className="min-w-0">
          <Section title="Active" subtitle={active.length > 0 ? `${active.length}` : undefined}>
            {active.length === 0 ? (
              <EmptyState
                title="Nothing running"
                body="Imports, downloads, scans and conversions show up here while they work — with pause and stop."
                action={
                  <Link className="btn-primary" to="/bulk">
                    Bulk Import
                  </Link>
                }
              />
            ) : (
              <div className="card overflow-hidden p-0">
                {active.map((task) => (
                  <TaskRow key={task.id} task={task} kick={kick} />
                ))}
              </div>
            )}
          </Section>

          {finished.length > 0 && (
            <Section title="Finished" subtitle="kept for 30 minutes">
              <div className="card overflow-hidden p-0">
                {visible.map((task) => (
                  <TaskRow key={task.id} task={task} kick={kick} />
                ))}
              </div>
              {hasMore && <div ref={sentinelRef} className="h-8" />}
            </Section>
          )}
        </main>

        <aside className="hidden space-y-5 lg:block" aria-label="Task context">
          <section className="card p-5">
            <h2 className="text-sm font-semibold text-white">Activity summary</h2>
            <dl className="mt-4 divide-y divide-base-700 text-sm">
              <SummaryRow label="Running" value={active.length} />
              <SummaryRow label="Recently finished" value={finished.length} />
              <SummaryRow label="Failed" value={failed} tone={failed > 0 ? 'error' : 'normal'} />
            </dl>
          </section>

          <section className="card p-5">
            <h2 className="text-sm font-semibold text-white">Operational tools</h2>
            <nav className="mt-3 divide-y divide-base-700" aria-label="Operational tools">
              <ToolLink to="/bulk" label="Bulk Import" detail="Fill or refresh library shelves" />
              <ToolLink to="/torrents" label="Torrents" detail="Search indexers and hand off results" />
              <ToolLink to="/tasks/logs" label="Logs" detail="Inspect task and process output" />
              <ToolLink to="/settings" label="Settings" detail="Configure local tools and folders" />
            </nav>
          </section>
        </aside>
      </div>
    </div>
  )
}

function SummaryRow({
  label,
  value,
  tone = 'normal'
}: {
  label: string
  value: number
  tone?: 'normal' | 'error'
}) {
  return (
    <div className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
      <dt className="text-gray-400">{label}</dt>
      <dd className={`tabular-nums ${tone === 'error' ? 'text-red-400' : 'text-gray-200'}`}>
        {value}
      </dd>
    </div>
  )
}

function ToolLink({ to, label, detail }: { to: string; label: string; detail: string }) {
  return (
    <Link to={to} className="group block py-3 first:pt-0 last:pb-0">
      <span className="block text-sm text-gray-200 group-hover:text-accent">{label}</span>
      <span className="mt-0.5 block text-xs leading-relaxed text-gray-500">{detail}</span>
    </Link>
  )
}
