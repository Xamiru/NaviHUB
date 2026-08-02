import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import EmptyState from '../components/EmptyState'
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
        title="Watch"
        subtitle="Play a video file with clickable subtitles. Episodes attached to a title live on that title's Video tab."
      />
      <EmptyState
        title="Open a video"
        body="Pick any file to play it with the mining panel and dictionary. Nothing is saved for one-off files — attach a folder to an anime, film or TV title if you want resume positions and progress tracking."
        action={
          <button className="btn-primary" onClick={() => void pick()}>
            Choose a video file…
          </button>
        }
      />
    </div>
  )
}
