import { Link } from 'react-router-dom'
import ActionMenu from '../components/ActionMenu'
import EmptyState from '../components/EmptyState'
import PageHeader from '../components/PageHeader'
import Section from '../components/Section'
import TaskRow from '../components/TaskRow'
import TasksTabs from '../components/TasksTabs'
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
    <div className="p-6">
      <PageHeader
        title="Tasks"
        eyebrow={
          <>
            <span className="chip">{active.length} running</span>
            <span className="chip">{finished.length} finished</span>
            {failed > 0 && <span className="chip text-red-400">{failed} failed</span>}
          </>
        }
        subtitle="Imports, downloads, scans and conversions running in the background."
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
      <TasksTabs value="tasks" />

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
    </div>
  )
}
