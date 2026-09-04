import { useRef, type KeyboardEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

// THE tab idiom — one look for every tab row in the app (this replaced four
// competing implementations; don't add another). RouteTabs is navigation;
// Tabs and TabPanel are page-local view selection with the ARIA tabs pattern.

interface BaseTabDef<K extends string = string> {
  key: K
  label: string
  count?: number
}

export interface TabDef<K extends string = string> extends BaseTabDef<K> {}

export interface RouteTabDef<K extends string = string> extends BaseTabDef<K> {
  to: string
}

type Orientation = 'horizontal' | 'vertical'

function railClass(orientation: Orientation, className: string): string {
  return orientation === 'horizontal'
    ? `flex items-center gap-1 border-b border-base-700 ${className}`
    : `flex flex-wrap gap-1 md:flex-col ${className}`
}

function localRailClass(orientation: Orientation, className: string): string {
  return orientation === 'horizontal'
    ? railClass(orientation, className)
    : className
}

function tabClass(orientation: Orientation, active: boolean): string {
  return orientation === 'horizontal'
    ? `px-4 py-2 text-sm font-medium -mb-px border-b-2 transition-colors ${
        active ? 'border-accent text-white' : 'border-transparent text-gray-400 hover:text-white'
      }`
    : `rounded-md px-3 py-2 text-left text-sm transition-colors ${
        active
          ? 'bg-accent/10 text-accent md:shadow-[inset_2px_0_0_0_rgb(var(--accent))]'
          : 'text-gray-400 hover:bg-base-800 hover:text-white'
      }`
}

function TabBody({ label, count }: { label: string; count?: number }): JSX.Element {
  return (
    <>
      {label}
      {count != null && <span className="ml-1.5 text-xs opacity-60">{count}</span>}
    </>
  )
}

export default function Tabs<K extends string>({
  id,
  label,
  tabs,
  value,
  onChange,
  orientation = 'horizontal',
  actions,
  className = ''
}: {
  id: string
  label: string
  tabs: TabDef<K>[]
  value: K
  onChange: (key: K) => void
  orientation?: Orientation
  actions?: ReactNode
  className?: string
}): JSX.Element {
  const refs = useRef(new Map<K, HTMLButtonElement>())
  const selectedIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.key === value)
  )

  function selectAt(index: number): void {
    const tab = tabs[index]
    if (!tab) return
    onChange(tab.key)
    refs.current.get(tab.key)?.focus()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number): void {
    const previousKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp'
    const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown'
    let nextIndex: number | null = null

    if (event.key === previousKey) nextIndex = (index - 1 + tabs.length) % tabs.length
    if (event.key === nextKey) nextIndex = (index + 1) % tabs.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = tabs.length - 1
    if (nextIndex == null) return

    event.preventDefault()
    selectAt(nextIndex)
  }

  return (
    <div className={localRailClass(orientation, className)}>
      <div
        role="tablist"
        aria-label={label}
        aria-orientation={orientation}
        className={
          orientation === 'horizontal'
            ? 'flex min-w-0 items-center gap-1'
            : 'flex flex-wrap gap-1 md:flex-col'
        }
      >
        {tabs.map((tab, index) => {
          const active = index === selectedIndex && tab.key === value
          return (
            <button
              key={tab.key}
              ref={(element) => {
                if (element) refs.current.set(tab.key, element)
                else refs.current.delete(tab.key)
              }}
              id={`${id}-tab-${tab.key}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`${id}-panel`}
              tabIndex={index === selectedIndex ? 0 : -1}
              className={tabClass(orientation, active)}
              onClick={() => onChange(tab.key)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <TabBody label={tab.label} count={tab.count} />
            </button>
          )
        })}
      </div>
      {actions && orientation === 'horizontal' && (
        <div className="ml-auto flex items-center gap-2 pb-1">{actions}</div>
      )}
    </div>
  )
}

export function TabPanel<K extends string>({
  tabsId,
  value,
  children,
  className = ''
}: {
  tabsId: string
  value: K
  children: ReactNode
  className?: string
}): JSX.Element {
  return (
    <div
      id={`${tabsId}-panel`}
      role="tabpanel"
      aria-labelledby={`${tabsId}-tab-${value}`}
      tabIndex={0}
      className={className}
    >
      {children}
    </div>
  )
}

export function RouteTabs<K extends string>({
  label,
  tabs,
  value,
  orientation = 'horizontal',
  actions,
  className = ''
}: {
  label: string
  tabs: RouteTabDef<K>[]
  value: K
  orientation?: Orientation
  actions?: ReactNode
  className?: string
}): JSX.Element {
  return (
    <nav aria-label={label} className={railClass(orientation, className)}>
      {tabs.map((tab) => {
        const active = tab.key === value
        return (
          <Link
            key={tab.key}
            to={tab.to}
            aria-current={active ? 'page' : undefined}
            className={tabClass(orientation, active)}
          >
            <TabBody label={tab.label} count={tab.count} />
          </Link>
        )
      })}
      {actions && orientation === 'horizontal' && (
        <div className="ml-auto flex items-center gap-2 pb-1">{actions}</div>
      )}
    </nav>
  )
}
