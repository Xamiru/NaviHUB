import { useState } from 'react'
import { useAppTheme } from '../../lib/useAppTheme'

// A title's synopsis. Seinfeld cuts long ones short with "yada yada yada";
// the link reveals the rest. Every other theme shows the full text.
export default function SynopsisText({ text }: { text: string }) {
  const { theme } = useAppTheme()
  const [open, setOpen] = useState(false)
  const cut = theme === 'seinfeld' && !open && text.length > 420 ? text.slice(0, text.lastIndexOf(' ', 320)) : null
  return (
    <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
      {cut ?? text}
      {cut != null && (
        <>
          {' '}
          <button className="yada-link" aria-label="Show the full synopsis" onClick={() => setOpen(true)}>
            yada yada yada
          </button>
        </>
      )}
    </p>
  )
}
