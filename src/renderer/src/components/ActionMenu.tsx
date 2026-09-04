import { useId, useState } from 'react'
import { usePopover } from '../lib/hooks'

// Overflow menu for secondary/rare actions: a plain text trigger ("More") and a
// popover list. This is where destructive actions live so they never sit next
// to everyday buttons. Popover convention (AddToListMenu precedent):
// mousedown-outside + Escape via document listeners — not useDialog.

export interface ActionItem {
  label: string
  onSelect: () => void | Promise<void>
  danger?: boolean // red text, grouped last behind a separator
  disabled?: boolean
  title?: string
}

export default function ActionMenu({
  label = 'More',
  items,
  align = 'right',
  buttonClassName = 'btn-ghost'
}: {
  label?: string
  items: ActionItem[]
  align?: 'left' | 'right'
  buttonClassName?: string
}) {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const triggerId = useId()
  const { panelRef, triggerRef } = usePopover(open, () => setOpen(false), {
    initialFocus: 'first',
    navigation: 'menu'
  })

  const plain = items.filter((i) => !i.danger)
  const danger = items.filter((i) => i.danger)

  const renderItem = (item: ActionItem): JSX.Element => (
    <button
      key={item.label}
      role="menuitem"
      aria-disabled={item.disabled || undefined}
      className={`w-full rounded px-2 py-1.5 text-left text-sm transition-colors hover:bg-base-700 disabled:cursor-not-allowed disabled:opacity-50 ${
        item.danger ? 'text-red-400' : 'text-gray-200'
      }`}
      disabled={item.disabled}
      title={item.title}
      onClick={() => {
        setOpen(false)
        void item.onSelect()
      }}
    >
      {item.label}
    </button>
  )

  return (
    <div className="relative">
      <button
        id={triggerId}
        ref={triggerRef}
        className={buttonClassName}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault()
            setOpen(true)
          }
        }}
      >
        {label}
      </button>
      {open && (
        <div
          id={menuId}
          ref={panelRef}
          role="menu"
          aria-labelledby={triggerId}
          className={`absolute z-30 mt-1 w-56 rounded-md border border-base-500 bg-base-800 p-1 shadow-lg ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {plain.map(renderItem)}
          {danger.length > 0 && (
            <div className={plain.length > 0 ? 'mt-1 border-t border-base-700 pt-1' : ''}>
              {danger.map(renderItem)}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
