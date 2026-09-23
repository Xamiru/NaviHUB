import { useRef, useState } from 'react'
import { toastError } from './toast'

export function localInputDate(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}
// A ref closes the double-click gap before React paints disabled controls.
export function useHobbyAction() {
  const guard = useRef(false)
  const [busy, setBusy] = useState(false)
  async function run(action: () => Promise<unknown>): Promise<void> {
    if (guard.current) return
    guard.current = true
    setBusy(true)
    try {
      await action()
    } catch (error) {
      toastError(error)
    } finally {
      guard.current = false
      setBusy(false)
    }
  }
  return { busy, run }
}
export async function readNoteImage(file: File): Promise<string> {
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type) || file.size > 2 * 1024 * 1024)
    throw new Error('Choose a PNG, JPEG or WebP under 2 MB')
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read this image'))
    reader.onload = () => resolve(String(reader.result))
    reader.readAsDataURL(file)
  })
}
