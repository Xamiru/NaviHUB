import { useRef, useSyncExternalStore } from 'react'
import { subscribeConfirm, getConfirm, answerConfirm, type ConfirmRequest } from '../lib/confirm'
import Dialog from './Dialog'

// Renders whatever lib/confirm has parked, one at a time. Mounted beside
// <Toaster /> in both App branches so the readers get it too.
export default function ConfirmHost() {
  const req = useSyncExternalStore(subscribeConfirm, getConfirm)
  if (!req) return null
  // Keyed so each request remounts the panel and re-runs its focus effect.
  return <ConfirmPanel key={req.id} req={req} />
}

function ConfirmPanel({ req }: { req: ConfirmRequest }) {
  const okRef = useRef<HTMLButtonElement>(null)

  return (
    <Dialog
      labelledBy={`confirm-title-${req.id}`}
      describedBy={`confirm-msg-${req.id}`}
      onClose={() => answerConfirm(req.id, false)}
      initialFocus={() => okRef.current}
      overlayClassName="fixed inset-0 z-[60] bg-black/60 p-4"
      panelClassName="card w-full max-w-md p-5"
    >
      <h2 id={`confirm-title-${req.id}`} className="sr-only">
        Confirmation
      </h2>
      {/* Messages carry their own blank lines (they were written for the
          native dialog's plain text), so keep the line breaks. */}
      <p
        id={`confirm-msg-${req.id}`}
        className="whitespace-pre-line text-sm leading-relaxed text-gray-200"
      >
        {req.message}
      </p>
      <div className="mt-5 flex justify-end gap-2">
        <button className="btn-ghost" onClick={() => answerConfirm(req.id, false)}>
          Cancel
        </button>
        <button
          ref={okRef}
          className={req.danger ? 'btn-danger' : 'btn-primary'}
          onClick={() => answerConfirm(req.id, true)}
        >
          {req.confirmLabel}
        </button>
      </div>
    </Dialog>
  )
}
