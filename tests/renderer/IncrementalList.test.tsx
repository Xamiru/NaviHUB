import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { useIncrementalList } from '@/lib/hooks'

const observers = new Set<IntersectionObserverCallback>()

beforeEach(() => {
  observers.clear()
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(private callback: IntersectionObserverCallback) {}
      observe() {
        observers.add(this.callback)
      }
      disconnect() {
        observers.delete(this.callback)
      }
    }
  )
})

afterEach(() => vi.unstubAllGlobals())

const reachBottom = () =>
  act(() => {
    for (const callback of [...observers]) {
      callback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver)
    }
  })

function Rows({ items, scope }: { items: number[]; scope?: unknown }) {
  const { visible, sentinelRef } = useIncrementalList(items, 10, scope)
  return (
    <>
      <p data-testid="count">{visible.length}</p>
      <div ref={sentinelRef} />
    </>
  )
}

const range = (n: number) => Array.from({ length: n }, (_, i) => i)
const count = () => Number(screen.getByTestId('count').textContent)

it('keeps the rows already revealed when a row is deleted or edited in place', () => {
  const { rerender } = render(<Rows items={range(50)} />)
  reachBottom()
  reachBottom()
  expect(count()).toBe(30)
  // A delete deep in the list refetches a new array one row shorter.
  rerender(<Rows items={range(50).filter((i) => i !== 25)} />)
  expect(count()).toBe(30)
  // An edit (a like, a favourite) refetches an equal-length new array.
  rerender(<Rows items={range(49).map((i) => i)} />)
  expect(count()).toBe(30)
})

it('keeps growing when the caller derives a fresh array on every render', () => {
  const { rerender } = render(<Rows items={range(50)} />)
  reachBottom()
  rerender(<Rows items={range(50)} />)
  reachBottom()
  rerender(<Rows items={range(50)} />)
  expect(count()).toBe(30)
})

it('starts over from the first batch when the explicit scope changes', () => {
  const { rerender } = render(<Rows items={range(50)} scope="a" />)
  reachBottom()
  expect(count()).toBe(20)
  rerender(<Rows items={range(50)} scope="a" />)
  expect(count()).toBe(20)
  rerender(<Rows items={range(50)} scope="b" />)
  expect(count()).toBe(10)
})
