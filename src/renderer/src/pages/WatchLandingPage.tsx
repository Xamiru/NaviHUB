import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import PageHeader from '../components/PageHeader'

// The ad-hoc entry point: play a video that isn't attached to any title.
// Deliberately in the normal shell (it's a picker — it wants the sidebar and
// the command palette); only /watch/file/:id and /watch/adhoc/:token are
// chrome-free.
export default function WatchLandingPage(): JSX.Element {
  const navigate = useNavigate()

  async function pick(): Promise<void> {
    const ref = await api.video.pickFile()
    if (ref?.kind === 'adhoc') navigate(`/watch/adhoc/${ref.token}`)
  }

  return (
    <div className="p-6">
      <PageHeader
        title="Transcript-first watch"
        subtitle="Open a local video beside its clickable subtitle timeline, dictionary and mining tools."
        actions={
          <button className="btn-primary" onClick={() => void pick()}>
            Choose video file
          </button>
        }
      />
      <div className="card grid min-h-[420px] overflow-hidden lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <section className="relative flex min-h-72 items-center justify-center bg-black p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(var(--accent)/0.1),transparent_28rem)]" />
          <div className="relative max-w-xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
              Local playback
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">The video stays primary</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Open any supported file here, or attach a folder to a library title for episode navigation, resume positions and progress tracking.
            </p>
            <button className="btn-ghost mt-6" onClick={() => void pick()}>
              Open one-off file
            </button>
          </div>
        </section>
        <aside className="border-l border-base-700 bg-base-800 p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
            Transcript mode
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Read, seek and mine</h2>
          <div className="mt-6 space-y-3">
            {[
              ['Clickable timeline', 'Jump to any subtitle line without scrubbing.'],
              ['Dual subtitles', 'Keep Japanese and English aligned when both tracks exist.'],
              ['Mining context', 'Capture the line, audio and frame into the offline study flow.']
            ].map(([title, body]) => (
              <div key={title} className="rounded-md border border-base-700 p-4">
                <p className="text-sm font-medium text-gray-200">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">{body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-gray-500">
            One-off files are not added to the library. Attach a folder on a title’s Video tab when you want durable history.
          </p>
        </aside>
      </div>
    </div>
  )
}
