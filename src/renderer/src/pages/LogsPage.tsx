import LogViewer from '../components/LogViewer'
import PageHeader from '../components/PageHeader'
import TasksTabs from '../components/TasksTabs'

// Its own route rather than a ?tab= on /tasks, for two reasons: the native
// Tools menu and Ctrl+K can deep-link straight here, and the log poll only
// exists while this page is mounted.
export default function LogsPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Logs"
        subtitle="Task lifecycle, HTTP retries and rate limits, database migrations, and the output of yt-dlp, ffmpeg and mokuro. Also written to userData/logs/."
      />
      <TasksTabs value="logs" />
      <LogViewer />
    </div>
  )
}
