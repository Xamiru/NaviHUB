import { useEffect, useRef, useSyncExternalStore } from 'react'
import { subscribeConfirm, getConfirm, answerConfirm, type ConfirmRequest } from '../lib/confirm'

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
  const openerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    openerRef.current = document.activeElement as HTMLElement | null
    // Focus the confirm button: it makes Enter answer the dialog the way the
    // native one did, and Tab-ing to Cancel then keeps Enter meaning Cancel.
    okRef.current?.focus()

    // Capture phase + stopImmediatePropagation: this dialog owns Escape and must
    // not let it also reach whatever is underneath — a confirm opened from
    // inside another dialog or the lightbox would otherwise close both.
    function onKey(e: KeyboardEvent): void {
      if (e.key !== 'Escape') return
      e.preventDefault()
      e.stopImmediatePropagation()
      answerConfirm(req.id, false)
    }
    window.addEventListener('keydown', onKey, true)
    return () => {
      window.removeEventListener('keydown', onKey, true)
      // Put keyboard focus back in the page. This is the whole reason the
      // native dialog had to go — never drop focus on the floor here.
      openerRef.current?.focus?.()
    }
  }, [req.id])

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) answerConfirm(req.id, false)
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`confirm-msg-${req.id}`}
        tabIndex={-1}
        className="card w-full max-w-md p-5"
      >
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
      </div>
    </div>
  )
}
