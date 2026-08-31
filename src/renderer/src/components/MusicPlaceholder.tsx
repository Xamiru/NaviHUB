import musicPlaceholder from '../assets/music-placeholder.png'

export default function MusicPlaceholder({ className = '' }: { className?: string }) {
  return (
    <img
      src={musicPlaceholder}
      alt="No cover art"
      className={`object-cover ${className}`}
      draggable={false}
    />
  )
}
