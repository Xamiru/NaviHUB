import { useNavigate } from 'react-router-dom'

// Consistent "← Back" for sub-pages (album/artist/playlist/liked/stats):
// always history-back, so it returns wherever the user actually came from.
export default function BackButton({ label = 'Back' }: { label?: string }) {
  const navigate = useNavigate()
  return (
    <button
      className="mb-4 text-sm text-gray-500 hover:text-gray-300"
      onClick={() => navigate(-1)}
    >
      ← {label}
    </button>
  )
}
