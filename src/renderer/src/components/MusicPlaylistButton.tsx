import { useId, useState } from 'react'
import { LinkIcon, PlaylistAddIcon } from './PlayerIcons'
import { usePopover } from '../lib/hooks'
import PlaylistPicker from './music/PlaylistPicker'

export default function MusicPlaylistButton({
  trackId,
  prominent = false
}: {
  trackId: number
  prominent?: boolean
}): React.JSX.Element {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const { panelRef, triggerRef } = usePopover(open, () => setOpen(false), {
    initialFocus: 'first'
  })

  return (
    <div className="relative shrink-0">
      <button
        ref={triggerRef}
        className={`flex items-center justify-center rounded-full ${prominent ? 'pill gap-2' : 'h-8 w-8'} ${
          open
            ? 'bg-accent/15 text-accent'
            : 'text-gray-400 hover:bg-base-700 hover:text-white'
        }`}
        title="Add to playlist"
        aria-label="Add to playlist"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((value) => !value)}
      >
        <PlaylistAddIcon className="h-4 w-4" />
        {prominent && <span>Add to playlist</span>}
      </button>

      {open && (
        <>
          {/* Absorbs the click that closes the popover, so it never also
              presses the transport button underneath. */}
          <div className="fixed inset-0 z-30 cursor-default" aria-hidden="true" />
          <div
            id={panelId}
            ref={panelRef}
            className="absolute bottom-full left-0 z-40 mb-2 w-72 rounded-md border border-base-500 bg-base-800 p-2 shadow-lg"
          >
            <PlaylistPicker trackIds={[trackId]} />
          </div>
        </>
      )}
    </div>
  )
}

// Link the playing song to a library title or a wrestler. The caller owns the
// dialog, so it survives the next song starting.
export function MusicLinkTitleButton({
  prominent = false,
  active,
  onOpen
}: {
  prominent?: boolean
  active: boolean
  onOpen: () => void
}): React.JSX.Element {
  return (
    <button
      className={`flex shrink-0 items-center justify-center rounded-full ${prominent ? 'pill gap-2' : 'h-8 w-8'} ${
        active ? 'bg-accent/15 text-accent' : 'text-gray-400 hover:bg-base-700 hover:text-white'
      }`}
      title="Link to title"
      aria-label="Link to title"
      onClick={onOpen}
    >
      <LinkIcon className="h-4 w-4" />
      {prominent && <span>Link to title</span>}
    </button>
  )
}
